'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {root, records, original, buildDemos} = require('../scripts/localize-demos.cjs');
const scripts = html => [...html.replace(/<!-- demo-localization:start -->[\s\S]*?<!-- demo-localization:end -->/g, '').matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)].map(m => m[0]);
const controls = html => [...html.replace(/<(header|nav)\b[^>]*data-professional-header[^>]*>[\s\S]*?<\/\1>/gi, '').matchAll(/<(?:input|select|option|canvas)\b[^>]*>/g)].map(m => m[0].replace(/\b(?:title|aria-label|alt|placeholder)="[^"]*"/g, ''));
async function harness(run) {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    if (!relative || relative.endsWith('/')) relative += 'index.html';
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep)) {response.writeHead(403).end(); return;}
    try {
      const content = fs.readFileSync(file);
      const type = ({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.glb':'model/gltf-binary','.bin':'application/octet-stream'})[path.extname(file)] || 'application/octet-stream';
      response.writeHead(200, {'Content-Type': type}); response.end(content);
    } catch {response.writeHead(404).end('Not found');}
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await require('puppeteer').launch({headless: 'shell', pipe: true, args: ['--no-sandbox','--enable-unsafe-swiftshader'], timeout: 60000});
    await run(browser, `http://127.0.0.1:${server.address().port}/`);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
async function main() {
  const generated = await buildDemos({write: false});
  const replay = await buildDemos({write: false});
  assert.deepEqual(generated.output, replay.output, 'generator must be deterministic');
  for (const record of records) {
    const source = original(record.source);
    for (const file of [record.en, record.zh]) {
      const html = fs.readFileSync(path.join(root, file), 'utf8');
      for (const script of scripts(source)) assert(scripts(html).includes(script), `${file}: original scripts must remain byte-identical`);
      assert.deepEqual(controls(html), controls(source), `${file}: control IDs/options/numeric limits must not change`);
    }
  }
  const results = [];
  await harness(async (browser, base) => {
    const targets = records.filter(r => !r.source.startsWith('generative-visual-lab/') && !/pelican-arena\.html$|faf-vs-agent-forge\/(?:index|demo-)/.test(r.source));
    for (const record of targets) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      try {
        await page.goto(base + record.en, {waitUntil: 'domcontentloaded', timeout: 90000});
        await page.waitForFunction(() => window.DemoLocalization?.ready, {timeout: 60000});
        await new Promise(resolve => setTimeout(resolve, 600));
        if (record.en.includes('wanan-midnight') || record.en.includes('scrap-swarm')) {
          await page.evaluate(() => { window.requestAnimationFrame = () => 0; });
        }
        const before = await page.evaluate(() => {
          const root = document.body.cloneNode(true);
          root.querySelectorAll('script,style,[data-professional-header],.kee-dedicated-nav,.reading-header,.demo-language-navigation').forEach(node => node.remove());
          return {language: document.documentElement.lang, untranslated: [...new Set(root.textContent.match(/[\p{Script=Han}]+/gu) || [])], inputs: document.querySelectorAll('input,select,button').length};
        });
        assert.equal(before.language, 'en', record.en);
        assert.deepEqual(before.untranslated, [], `${record.en}: untranslated runtime text`);
        assert.deepEqual(errors, [], `${record.en}: JavaScript errors`);
        await page.evaluate(() => {
          const probe = document.createElement('div');
          probe.id = 'demo-translation-probe';
          probe.textContent = '暂停'; probe.title = '继续播放'; document.body.append(probe);
        });
        await page.waitForFunction(() => document.getElementById('demo-translation-probe')?.textContent === 'Pause');
        await page.evaluate(() => document.getElementById('demo-translation-probe').remove());
        results.push({file: record.en, ...before, errors});
      } finally {await page.close();}
    }
    const cycle = await browser.newPage();
    try {
      await cycle.goto(base + 'workshops/azure-agent-infra/workbench-cycle-377.en.html', {waitUntil: 'domcontentloaded'});
      const evidence = JSON.parse(fs.readFileSync(path.join(root, 'workshops/azure-agent-infra/evidence/cycle-377-benchmark.json')));
      for (const minutes of [20,40]) {
        await cycle.$eval('#mins', (input, value) => {input.value = value; input.dispatchEvent(new Event('input', {bubbles:true}));}, minutes);
        const actual = await cycle.$$eval('#cost tr td:nth-child(2)', cells => cells.map(cell => cell.textContent));
        assert.deepEqual(actual, evidence.single_session_cost.map(row => '$' + ((row.vm_hourly_usd / row.sessions_per_host) * (minutes / 60) + row.overhead_usd).toFixed(5)));
      }
      await cycle.goto(base + 'workshops/azure-agent-infra/workbench-cycle-377.html?lang=en&theme=dark#cost', {waitUntil: 'domcontentloaded'});
      await cycle.waitForFunction(() => location.pathname.endsWith('.en.html'));
      assert(cycle.url().endsWith('workbench-cycle-377.en.html?lang=en&theme=dark#cost'));
    } finally {await cycle.close();}
  });
  console.log(JSON.stringify({pairs: records.length, engineParity: true, deterministicReplay: true, browser: results}, null, 2));
}
module.exports = {harness, scripts, controls};
if (require.main === module) main().catch(error => {console.error(error); process.exitCode = 1;});
