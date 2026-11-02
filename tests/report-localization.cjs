'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { root, baseline, manifest, sourcePaths, readSource, mapText, textSegments, cleanPerimeter, normalized, render, loadDictionaries, buildReports } = require('../scripts/localize-reports.cjs');
const dictionaries = loadDictionaries();
const numbers = s => (s.match(/\d+(?:[.,]\d+)*/g) || []);
const styles = s => [...cleanPerimeter(s).matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi)].map(m => m[0]);
const scripts = s => [...s.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi)].map(m => m[0]);
const csp = s => s.match(/<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/i)?.[0];
const geometry = s => [...s.matchAll(/\b(?:style|viewBox|width|height|x|y|x1|x2|y1|y2|cx|cy|r|rx|ry|d|points|transform|stroke-width|offset)=("[^"]*"|'[^']*')/g)].map(m => m[0]);
const body = s => cleanPerimeter(s).replace(/<button\b[^>]*\bdata-lang=["'][^"']*["'][^>]*>[\s\S]*?<\/button>/gi, '');
function staticChecks() {
  let checkedMappings = 0, localizedPages = 0;
  const gaps = [];
  for (const [locale, dictionary] of Object.entries(dictionaries)) for (const [source, translated] of Object.entries(dictionary)) {
    assert.deepEqual(numbers(translated), numbers(source), `${locale} numeric text differs: ${source} -> ${translated}`);
    assert(!/<\/?(?:script|style|iframe|img)\b/i.test(translated), 'Translation cannot inject markup');
    checkedMappings++;
  }
  for (const record of manifest) {
    assert.equal(record.kind, 'report');
    assert(!record.source.includes('ai-infra-phase179'), 'Phase179 is separately owned');
    for (const locale of ['en', 'zh-CN']) {
      const file = record[locale === 'en' ? 'en' : 'zh'];
      const originalFile = locale === 'en' && sourcePaths.includes(record.en) ? record.en : record.source;
      const source = readSource(originalFile), output = render(record, locale, dictionaries);
      assert.equal(csp(output), csp(source), `${file}: CSP changed`);
      assert.deepEqual(styles(output), styles(source), `${file}: report CSS changed`);
      assert.deepEqual(scripts(output), scripts(source), `${file}: scripts changed`);
      assert.deepEqual(geometry(body(output)), geometry(body(source)), `${file}: chart/style geometry changed`);
      assert(output.includes(`hreflang="en"`) && output.includes(`hreflang="zh-CN"`), `${file}: missing exact counterpart links`);
      assert(output.includes('independently_reproduced=false'), `${file}: missing translation provenance`);
      assert(output.includes(`<html lang="${locale}"`) || new RegExp(`<html[^>]*lang="${locale}"`).test(output));
      for (const text of textSegments(source)) {
        const needs = locale === 'en' ? /[\u3400-\u9fff]/.test(text) : /[A-Za-z]/.test(text) && !/[\u3400-\u9fff]/.test(text);
        if (needs && dictionaries[locale][text] === undefined) gaps.push({ file, text });
      }
      assert.equal(fs.readFileSync(path.join(root, file), 'utf8'), output, `${file}: regeneration drift`);
      localizedPages++;
    }
  }
  assert.deepEqual(gaps, [], 'Missing explicit text mappings');
  const before = buildReports({ write: false }).outputs;
  const after = buildReports({ write: false }).outputs;
  assert.deepEqual(before, after, 'Replay must be deterministic');
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'docs', 'redesign', 'report-localization.json'), 'utf8')), manifest);
  console.log(JSON.stringify({ baseline, reportFamilies: manifest.length, localizedPages, checkedMappings, missingMappings: gaps.length, geometry: 'identical', csp: 'identical', scripts: 'identical' }, null, 2));
}
async function browserChecks() {
  const http = require('node:http');
  const puppeteer = require('puppeteer');
  const server = http.createServer((req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { const content = fs.readFileSync(file); res.setHeader('Content-Type', file.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream'); res.end(content); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await puppeteer.launch({ headless: true });
  const results = [];
  try {
    const samples = ['animation/demos/camera-4d-director/test-report-cards.html', 'animation/demos/knowledge-explainer-studio/test-report-cards.html', 'voice/benchmark-cards.html', 'voice/diarization-benchmark-cards.html', 'workshops/ai-security/cards.html', 'workshops/azure-agent-infra/benchmark-cards.html', 'workshops/benchmarks/decision-1-cards.html', 'workshops/deepinfer-v41-economics/cards.html', 'workshops/faf-vs-agent-forge/test-report-cards.html'];
    for (const source of samples) for (const locale of ['en', 'zh-CN']) {
      const record = manifest.find(r => r.source === source), file = record[locale === 'en' ? 'en' : 'zh'];
      const page = await browser.newPage();
      await page.setJavaScriptEnabled(false);
      await page.setViewport({ width: 1440, height: 1000 });
      const response = await page.goto(`http://127.0.0.1:${server.address().port}/${file}`, { waitUntil: 'load' });
      assert.equal(response.status(), 200);
      const summary = await page.evaluate(() => ({ locale: document.documentElement.lang, title: document.title, textLength: document.body.innerText.length, svgCount: document.querySelectorAll('svg').length, headings: [...document.querySelectorAll('h1,h2')].slice(0, 3).map(h => h.innerText), links: [...document.querySelectorAll('nav[aria-label="Report language"] a,nav[aria-label="报告语言"] a')].map(a => a.getAttribute('href')) }));
      assert.equal(summary.locale, locale);
      assert(summary.textLength > 1000);
      assert.equal(summary.links.length, 2);
      const target = locale === 'en' ? record.zh : record.en;
      const href = await page.$eval(`nav a[hreflang="${locale === 'en' ? 'zh-CN' : 'en'}"]`, a => a.href);
      assert(href.endsWith('/' + target));
      await page.goto(href, { waitUntil: 'load' });
      assert.equal(await page.$eval('html', el => el.lang), locale === 'en' ? 'zh-CN' : 'en');
      await page.setViewport({ width: 390, height: 844 });
      await page.reload({ waitUntil: 'load' });
      results.push({ file, ...summary, javascript: false, narrowViewport: 'rendered' });
      await page.close();
    }
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
  console.log(JSON.stringify({ browserRenders: results }, null, 2));
}
staticChecks();
if (process.argv.includes('--browser')) browserChecks().catch(error => { console.error(error); process.exitCode = 1; });
