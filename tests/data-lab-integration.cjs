'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const integration = require('../scripts/integrate-data-lab.cjs');
const { root, baseline, directory, files, source, strip, transform } = integration;
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.DATALAB_ARTIFACT_DIR || 'C:\\Users\\qichen2\\.copilot\\session-state\\d4e2b4e8-91dc-4f4c-b368-6f587f5db788\\files\\aurora-review\\data-lab';
const report = {
  result: 'RUNNING', baseline,
  scope: 'Perimeter integration only; no report regeneration, benchmark rerun or new measurements.',
  languageLimitation: 'Source workbench translates dynamic body regions but retains Chinese KPI captions, input labels and gallery prose; no full bilingual-interface claim.',
  sourceLinkReplacement: integration.sourceLinkChange,
  preservation: [], localLinks: [], layouts: [], interactions: [], noJavaScript: [], requestsFailed: [], errors: []
};
const git = args => execFileSync('git', args, { cwd: root, maxBuffer: 20 * 1024 * 1024 }).toString('utf8').trim();
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const csp = html => html.match(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>/gi) || [];

const checkedLocalUrls = new Set();
function verifyLocalLinks(links, pageUrl, label) {
  for (const href of links) {
    const url = new URL(href.replace(/&amp;/g, '&'), pageUrl);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== new URL(base).origin) continue;
    const target = path.resolve(root, ...decodeURIComponent(url.pathname).split(/[\\/]+/).filter(Boolean));
    const relative = path.relative(root, target);
    assert.ok(!relative.startsWith('..') && !path.isAbsolute(relative), `${label}: local link escapes repository: ${href}`);
    assert.ok(fs.existsSync(target), `${label}: missing local target: ${href}`);
    if (fs.statSync(target).isDirectory()) assert.ok(fs.existsSync(path.join(target, 'index.html')), `${label}: missing directory index: ${href}`);
    const key = url.pathname + url.search;
    if (!checkedLocalUrls.has(key)) {
      checkedLocalUrls.add(key);
      report.localLinks.push({ firstCheckedIn: label, href, target: relative, url: key });
    }
  }
}

function verifyPreservation() {
  for (const name of files) {
    const original = source(name);
    const html = fs.readFileSync(path.join(root, 'workshops', 'data-lab', name), 'utf8');
    assert.equal(html, transform(name, original), `${name}: deterministic output`);
    assert.equal(strip(html), original, `${name}: every source byte must survive reversal`);
    assert.equal(transform(name, strip(html)), html, `${name}: idempotent regeneration`);
    assert.deepEqual(csp(html), csp(original), `${name}: exact original CSP`);
    assert.equal((html.match(/<html\b/gi) || []).length, 1, `${name}: one native document`);
    assert.equal((html.match(/<body\b/gi) || []).length, 1, `${name}: one body`);
    assert.equal(/<iframe\b/i.test(html), false, `${name}: no embedded full documents`);
    assert.equal((html.match(/class="kee-data-lab-nav"/g) || []).length, 1, `${name}: one perimeter`);
    if (name.startsWith('live-demo')) {
      assert.deepEqual(html.match(/<meta http-equiv="refresh"[^>]*>/g), original.match(/<meta http-equiv="refresh"[^>]*>/g), `${name}: original redirect contract`);
    }
    const links = [...html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)].map(match => match[1]);
    verifyLocalLinks(links, `${base}/${directory}/${name}`, `${name}: generated source`);
    if (name === 'index.html') {
      assert.ok(!links.includes(integration.sourceLinkChange.from), 'Source-derived broken FabCon link must not remain live');
      assert.equal((html.match(/<!-- kee-data-lab:source-link:start -->/g) || []).length, 1, 'Exactly one reversible source-link replacement');
    }
    report.preservation.push({ name, originalSha256: hash(original), reversedSha256: hash(strip(html)), csp: csp(original) });
  }
  // Include every sealed report, SVG, Python, research and data file without regenerating any of them.
  const tree = git(['ls-tree', '-r', baseline, '--', directory]).split('\n');
  let protectedFiles = 0;
  for (const entry of tree) {
    const match = entry.match(/^\d+ blob ([a-f0-9]+)\t(.+)$/);
    if (!match) continue;
    const [, object, relative] = match;
    if (files.some(name => relative === `${directory}/${name}`)) continue;
    const target = path.join(root, ...relative.split('/'));
    assert.ok(fs.existsSync(target), `${relative}: protected source must exist`);
    assert.equal(git(['hash-object', `--path=${relative}`, target]), object, `${relative}: source content changed`);
    protectedFiles++;
  }
  assert.ok(protectedFiles > 0, 'Protected source tree must not be empty');
  report.protectedFiles = protectedFiles;
}

async function settle(page, name) {
  if (name.startsWith('benchmark-cards')) await page.waitForSelector('#card-7');
  else {
    await page.waitForSelector('#ui-title');
    assert.equal(new URL(page.url()).pathname, `/${directory}/index.html`);
  }
}

async function geometry(page, label, width) {
  const result = await page.evaluate(() => {
    const nav = document.querySelector('.kee-data-lab-nav');
    const r = nav.getBoundingClientRect();
    const scrolling = [...document.body.querySelectorAll('*')].filter(el => {
      const css = getComputedStyle(el);
      return ['auto', 'scroll'].includes(css.overflowY) && el.clientHeight > 0 && el.scrollHeight > el.clientHeight + 2;
    }).map(el => ({ id: el.id, tag: el.tagName, className: el.className }));
    const language = nav.querySelector('.kee-data-lab-language').getBoundingClientRect();
    return {
      documentWidth: document.documentElement.scrollWidth,
      viewport: innerWidth,
      background: getComputedStyle(document.body).backgroundColor,
      frames: document.querySelectorAll('iframe').length,
      nav: { left: r.left, right: r.right, height: r.height },
      language: { left: language.left, right: language.right, top: language.top },
      scrollContainers: scrolling,
      links: [...nav.querySelectorAll('a')].map(a => a.getAttribute('href')),
      allLocalCandidates: [...document.querySelectorAll('[href],[src]')].flatMap(el => ['href', 'src'].filter(attribute => el.hasAttribute(attribute)).map(attribute => el.getAttribute(attribute))),
      cardWidths: [...document.querySelectorAll('body>.card')].map(el => el.getBoundingClientRect().width)
    };
  });
  verifyLocalLinks(result.allLocalCandidates, page.url(), label);
  assert.ok(result.documentWidth <= width + 1, `${label}: document overflow ${result.documentWidth}/${width}`);
  assert.equal(result.background, 'rgb(7, 17, 31)', `${label}: default deep-navy perimeter`);
  assert.equal(result.frames, 0, `${label}: no iframe`);
  assert.ok(result.nav.left >= 0 && result.nav.right <= width + 1, `${label}: navigation contained`);
  assert.ok(result.language.right <= result.nav.right + 1, `${label}: top-right language control contained`);
  assert.ok(result.links.includes('../../studio/infra.html') && result.links.includes('../../studio/zh-infra.html'), `${label}: existing Infra data architecture grouping`);
  assert.ok(result.links.every(href => href && !href.startsWith('javascript:') && href !== '#'), `${label}: native links`);
  assert.deepEqual(result.scrollContainers.filter(el => el.id !== 'sim-console'), [], `${label}: only original inspector may scroll vertically`);
  for (const cardWidth of result.cardWidths) {
    assert.ok(cardWidth <= width - 31, `${label}: scaled original card fits viewport`);
    if (width === 1440) assert.equal(cardWidth, 900, `${label}: original desktop card size`);
  }
  return result;
}

async function workbenchInteraction(page, name, width) {
  const expectedEnglish = name.includes('.en.');
  assert.equal(await page.$eval('html', el => el.lang), expectedEnglish ? 'en' : 'zh-CN');
  assert.equal(await page.$eval('#lang-btn', el => el.hidden), true, 'Duplicate source language control hidden only after runtime bridge');
  assert.equal(await page.$eval('#kee-data-lab-source-infra', el => el.getAttribute('href')), integration.sourceLinkChange.to[expectedEnglish ? 'en' : 'zh'], 'Repaired source link follows initial resource language');
  const beforeLanguage = await page.$eval('#battlecard-content', el => el.innerText);
  const targetLanguage = expectedEnglish ? 'zh' : 'en';
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click(`.kee-data-lab-language a[data-resource-language="${targetLanguage}"]`)
  ]);
  await page.waitForFunction(() => Boolean(document.querySelector('.kee-data-lab-nav').dataset.runtimeLanguage));
  assert.equal(await page.$eval('html', el => el.lang), targetLanguage === 'en' ? 'en' : 'zh-CN');
  assert.equal(await page.$eval('#kee-data-lab-source-infra', el => el.getAttribute('href')), integration.sourceLinkChange.to[targetLanguage], 'Repaired source link follows actual language change');
  const afterLanguage = await page.$eval('#battlecard-content', el => el.innerText);
  assert.notEqual(afterLanguage, beforeLanguage, 'Language changes actual competitive body, not just navigation');
  assert.match(afterLanguage, targetLanguage === 'en' ? /Where Microsoft Fabric Wins/ : /Microsoft Fabric 必赢差异化优势/);
  assert.match(await page.$eval('.kee-data-lab-note', el => el.textContent), /Not a fully translated interface/);
  assert.match(await page.$eval('#lbl-users', el => el.textContent), /活跃用户数/, 'Untranslated source input label preserved and limitation disclosed');
  await page.click('#pill-snowflake');
  assert.match(await page.$eval('#comp-chart-title', el => el.textContent), /Snowflake/);
  await geometry(page, `${name}: compass after language switch`, width);
  await page.click('#tab-tco');
  const beforeTco = await page.$eval('#tco-table-wrap', el => el.innerText);
  await page.$eval('#inp-users', el => { el.value = '1000'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  assert.equal(await page.$eval('#val-users', el => el.textContent), '1,000');
  assert.notEqual(await page.$eval('#tco-table-wrap', el => el.innerText), beforeTco, 'Native TCO interaction recalculates');
  assert.match(await page.$eval('#tco-table-wrap', el => el.innerText), targetLanguage === 'en' ? /Monthly Total/ : /月度总计/);
  await geometry(page, `${name}: TCO`, width);
  await page.screenshot({ path: path.join(output, `${name.replace('.html', '')}-tco-${width}.png`) });
  await page.click('#tab-ontology');
  await page.click('#btn-run-adv');
  assert.ok(await page.$('.step-item.blocked'), 'Original simulated guardrail interaction still renders blocked step');
  assert.match(await page.$eval('#sim-console', el => el.innerText), /SOP-DC-COOL-04/);
  await geometry(page, `${name}: ontology`, width);
  await page.click('#tab-visuals');
  await geometry(page, `${name}: gallery`, width);
  report.interactions.push({ name, width, actualBodyLanguageChanged: true, partialTranslationDisclosed: true, tcoRecalculated: true, simulatedGuardrailRendered: true });
}

async function noJavaScript(browser, name, width) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width, height: 900 });
    await page.setJavaScriptEnabled(false);
    await page.goto(`${base}/${directory}/${name}`, { waitUntil: 'domcontentloaded' });
    await settle(page, name);
    await geometry(page, `${name}: noJS`, width);
    assert.match(await page.$eval('.kee-data-lab-identity', el => el.textContent), /Qi Chen/);
    const isReport = name.startsWith('benchmark-cards');
    if (isReport) {
      const heading = await page.$eval('#card-1 h1', el => el.textContent);
      const targetLanguage = name.includes('.en.') ? 'zh' : 'en';
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        page.click(`.kee-data-lab-language a[data-resource-language="${targetLanguage}"]`)
      ]);
      assert.notEqual(await page.$eval('#card-1 h1', el => el.textContent), heading, 'NoJS report link changes real report body');
      assert.equal(await page.$eval('html', el => el.lang), targetLanguage === 'en' ? 'en' : 'zh-CN');
    } else {
      assert.match(await page.$eval('.kee-data-lab-nav noscript', el => el.innerText), /Chinese static source/);
      assert.equal(await page.$eval('html', el => el.lang), 'zh-CN', 'NoJS must not claim translated workbench body');
      assert.equal(await page.$eval('#kee-data-lab-source-infra', el => el.getAttribute('href')), integration.sourceLinkChange.to.zh, 'NoJS source navigation remains native and localized');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        page.click('.kee-data-lab-language a[data-resource-language="en"]')
      ]);
      assert.equal(new URL(page.url()).searchParams.get('lang'), 'en');
      assert.equal(await page.$eval('html', el => el.lang), 'zh-CN', 'NoJS English request remains honestly labeled source language');
      assert.match(await page.$eval('.kee-data-lab-nav noscript', el => el.innerText), /translated body output require JavaScript/);
    }
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('.kee-data-lab-context a[href="../../studio/infra.html"]')
    ]);
    assert.equal(new URL(page.url()).pathname, '/studio/infra.html', 'NoJS native Infra navigation');
    report.noJavaScript.push({ name, width, nativeContextNavigation: true, reportLanguageWorksWithoutJavaScript: isReport });
  } finally { await page.close(); }
}

async function main() {
  verifyPreservation();
  const puppeteer = require('puppeteer');
  fs.mkdirSync(output, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'shell', pipe: true });
  try {
    const reference = await browser.newPage();
    await reference.setJavaScriptEnabled(false);
    const expectedCards = {};
    for (const name of files.filter(name => name.startsWith('benchmark-cards'))) {
      await reference.setContent(source(name), { waitUntil: 'domcontentloaded' });
      expectedCards[name] = await reference.$$eval('body>.card', nodes => nodes.map(el => el.outerHTML));
      assert.equal(expectedCards[name].length, 7);
    }
    await reference.close();
    for (const name of files) {
      for (const width of [390, 768, 1440]) {
        const page = await browser.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        // Observe real requests; do not blanket-block network traffic to make the checks pass.
        page.on('requestfailed', request => report.requestsFailed.push({ name, url: request.url(), failure: request.failure()?.errorText }));
        page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(base + '/')) errors.push(`HTTP ${response.status()}: ${response.url()}`); });
        try {
          await page.setViewport({ width, height: 900 });
          await page.setCacheEnabled(false);
          const response = await page.goto(`${base}/${directory}/${name}`, { waitUntil: 'domcontentloaded' });
          assert.equal(response.status(), 200, name);
          await settle(page, name);
          report.layouts.push({ name, width, ...await geometry(page, name, width) });
          if (expectedCards[name]) {
            assert.deepEqual(await page.$$eval('body>.card', nodes => nodes.map(el => el.outerHTML)), expectedCards[name], 'Every original report card, value and coordinate remains unchanged');
            assert.equal(await page.$$eval('script', nodes => nodes.length), 0, 'Report remains script-free under original CSP');
          }
          await page.screenshot({ path: path.join(output, `${name.replace('.html', '')}-${width}.png`), fullPage: name.startsWith('benchmark-cards') });
          if (!expectedCards[name]) await workbenchInteraction(page, name, width);
          assert.deepEqual(errors, [], `${name}: runtime/resource errors`);
        } finally { await page.close(); }
        await noJavaScript(browser, name, width);
      }
    }
    for (const { url: target } of report.localLinks) {
      const response = await fetch(new URL(target, base));
      assert.equal(response.status, 200, `Local linked target: ${target}`);
    }
    report.localLinkTargetsPassed = report.localLinks.length;
    report.result = 'PASS';
    console.log('PASS: five DataLab sources preserved; 15 navy layouts; native/noJS navigation, real partial-language behavior and source demo interactions.');
  } catch (error) {
    report.result = 'FAIL'; report.errors.push(error.stack); throw error;
  } finally {
    fs.writeFileSync(path.join(output, 'data-lab-validation.json'), JSON.stringify(report, null, 2));
    await browser.close();
  }
}

if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { verifyPreservation };
