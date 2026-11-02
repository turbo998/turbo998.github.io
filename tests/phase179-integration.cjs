/* --source-only does not write files or launch a browser.
 * Run the full test only after the parent's merge and explicit HTML generation.
 * SITE_TEST_URL defaults to the parent's preview; SITE_ARTIFACT_DIR may override
 * the supplied persistent review directory. Screenshots are presentation evidence,
 * not new benchmark measurements or a re-evaluation of upstream claims.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {baseline, files, asset, sourceBytes, sourceFor, hash, strip, csp, scripts, generate, validate, languageLimitations} = require('../scripts/integrate-phase179.cjs');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.SITE_ARTIFACT_DIR || 'C:\\Users\\qichen2\\.copilot\\session-state\\d4e2b4e8-91dc-4f4c-b368-6f587f5db788\\files\\aurora-review\\phase179';
const report = {result: 'RUNNING', baseline, scope: 'Presentation, preservation, navigation and original workbench behavior only; no research re-evaluation.', languageLimitations, preservation: [], layouts: [], navigation: [], interactions: [], errors: []};
function sourceOnly() {
  return files.map(file => {
    const bytes = sourceBytes(file);
    const source = bytes.toString('utf8');
    assert.deepEqual(Buffer.from(source), bytes, 'UTF-8 round trip');
    const html = generate(file, source);
    assert.deepEqual(Buffer.from(strip(html)), bytes, `${file}: original bytes recovered`);
    assert.deepEqual(csp(html), csp(source), `${file}: exact original CSP`);
    assert.deepEqual(scripts(html), scripts(source), `${file}: exact runtime preserved`);
    assert.ok(!/<iframe\b|<script\b[^>]*\bsrc=/i.test(html));
    assert.ok(html.includes('href="../../studio/infra.html"'));
    assert.ok(html.includes('href="../../studio/zh-infra.html"'));
    assert.ok(html.includes('Qi Chen · @turbo998'));
    assert.ok(html.includes('Site language'));
    assert.ok(html.includes('not a translated'));
    assert.ok(!/on(?:click|change)\s*=/.test(html.match(/<!-- phase179-nav:start -->([\s\S]*?)<!-- phase179-nav:end -->/)[1]), 'Navigation is native, not JS interception');
    assert.equal(generate(file, source), html, 'Deterministic in-memory generation');
    assert.throws(() => generate(file, html), /clean pinned source/, 'Reject double integration');
    if (file === files[1]) {
      assert.equal((html.match(/<section class="card">/g) || []).length, 7);
      assert.equal(scripts(html).length, 0, 'Sealed script-free report');
      assert.deepEqual(html.match(/style="width:[^"]+"/g), source.match(/style="width:[^"]+"/g), 'All chart coordinate attributes preserved');
    } else {
      assert.equal(scripts(source).length, 1);
      assert.ok(!/setLanguage|setLang\b|localStorage|i18n|translations\s*=/.test(scripts(source)[0]), 'Pinned source has no language bridge to reuse');
      assert.ok(html.includes('legacy phase/catalog counts'));
    }
    return {file, sourceSha256: hash(bytes), preparedSha256: hash(html)};
  });
}
async function layoutState(page, isReport) {
  return page.evaluate(isReport => {
    const nav = document.querySelector('.phase179-nav');
    const style = getComputedStyle(nav);
    const languages = nav.querySelector('.professional-controls').getBoundingClientRect();
    const identity = nav.querySelector('.professional-identity').getBoundingClientRect();
    const nested = [...document.body.querySelectorAll('*')].filter(el => {
      const css = getComputedStyle(el);
      return ['auto', 'scroll'].includes(css.overflowY) && el.scrollHeight > el.clientHeight + 2;
    }).map(el => `${el.tagName}.${el.className}`);
    return {
      lang: document.documentElement.lang,
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
      background: getComputedStyle(document.body).backgroundColor,
      navBackground: style.backgroundColor,
      navColor: style.color,
      linkColor: getComputedStyle(nav.querySelector('.phase179-parent')).color,
      languageTopRight: languages.left >= identity.right - 1 && Math.abs(languages.top - identity.top) < 35,
      frames: document.querySelectorAll('iframe').length,
      nested,
      cards: document.querySelectorAll('.phase179-report-source>.card').length,
      rows: document.querySelectorAll('#expTable tbody tr').length,
      sourceText: document.querySelector(isReport ? '.phase179-report-source' : '.container').textContent.replace(/\s+/g, ' ').trim(),
      cspViolations: window.phase179CspViolations || [],
      hasNoScriptNotice: [...document.querySelectorAll('.phase179-note noscript')].some(el => el.textContent.includes('JavaScript')),
      languages: [...nav.querySelectorAll('[hreflang]')].map(a => ({text: a.textContent, lang: a.hreflang, href: a.getAttribute('href')})),
    };
  }, isReport);
}
async function cardSnapshot(page) {
  return page.$$eval('.card', cards => cards.map(card => {
    const css = getComputedStyle(card);
    return {text: card.textContent.replace(/\s+/g, ' ').trim(), width: css.width, height: css.height, padding: css.padding, font: css.font, background: css.backgroundColor, color: css.color, border: css.border,
      bars: [...card.querySelectorAll('[style*="width:"]')].map(el => ({style: el.getAttribute('style'), width: getComputedStyle(el).width}))};
  }));
}
async function workbenchSnapshot(page) {
  return page.evaluate(() => ({
    controls: [...document.querySelectorAll('.container input,.container select')].map(el => [el.id, el.value]),
    outputs: [...document.querySelectorAll('.container [id]')].filter(el => el.id.startsWith('out') || el.id.endsWith('Val')).map(el => [el.id, el.textContent]),
    visibleRows: [...document.querySelectorAll('#expTable tbody tr')].filter(el => getComputedStyle(el).display !== 'none').map(el => el.textContent),
    activeFilters: [...document.querySelectorAll('.filter-btn.active')].map(el => el.textContent),
  }));
}
async function interactions(page, original) {
  const compare = async action => {
    assert.deepEqual(await workbenchSnapshot(page), await workbenchSnapshot(original), `${action}: original runtime parity`);
    report.interactions.push({action, width: page.viewport().width, originalRuntimeParity: true});
  };
  await compare('Initial static values, including original input-range sanitization');
  for (const value of ['gen1', 'gen2', 'het', 'gen3']) {
    const before = await page.$eval('#outTco', el => el.textContent);
    for (const p of [page, original]) await p.select('#presetSelect', value);
    assert.notEqual(await page.$eval('#outTco', el => el.textContent), before, `Preset ${value} changes TCO`);
    await compare(`Preset ${value}`);
  }
  for (const id of ['gpuCount', 'capexPerGpu', 'itKwPerGpu', 'pue', 'ettr', 'rawEffPflops', 'tokPerSec']) {
    const before = await page.$eval(`#${id}`, el => el.value);
    for (const p of [page, original]) {
      await p.focus(`#${id}`);
      await p.keyboard.press('Home');
      await p.keyboard.press('ArrowRight');
    }
    assert.notEqual(await page.$eval(`#${id}`, el => el.value), before, `${id}: keyboard range interaction`);
    await compare(`Keyboard slider ${id}`);
  }
  for (const [id, value, outputId, expected] of [
    ['arScale', '64', 'outSharpLat', '4.066 ms'],
    ['arScale', '4096', 'outSharpLat', '4.092 ms'],
    ['kvCtx', '4096', 'outKvFp4', '1.66 ms'],
    ['kvCtx', '65536', 'outKvFp4', '26.50 ms'],
  ]) {
    for (const p of [page, original]) await p.select(`#${id}`, value);
    assert.equal(await page.$eval(`#${outputId}`, el => el.textContent), expected);
    await compare(`${id}=${value}`);
  }
  const allRows = await page.$$eval('#expTable tbody tr', rows => rows.length);
  for (const index of [2, 3, 4, 5, 1]) {
    for (const p of [page, original]) await p.click(`.filter-btn:nth-child(${index})`);
    const state = await workbenchSnapshot(page);
    assert.ok(state.visibleRows.length > 0);
    assert.equal(index === 1 ? state.visibleRows.length === allRows : state.visibleRows.length < allRows, true);
    await compare(`Catalog filter ${index}`);
  }
}
async function nativeNavigation(page, file) {
  await page.setJavaScriptEnabled(false);
  await page.setViewport({width: 390, height: 900});
  await page.goto(`${base}/${file}`, {waitUntil: 'networkidle0'});
  const links = await page.$$eval('.phase179-nav a', anchors => anchors.map(a => ({href: a.href, lang: a.hreflang, text: a.textContent})));
  for (let i = 0; i < links.length; i++) {
    await page.goto(`${base}/${file}`, {waitUntil: 'networkidle0'});
    const handles = await page.$$('.phase179-nav a');
    const [response] = await Promise.all([page.waitForNavigation({waitUntil: 'networkidle0'}), handles[i].click()]);
    assert.equal(response.status(), 200, `No-JS native link ${links[i].href}`);
    assert.equal(page.url(), links[i].href);
    if (links[i].lang) {
      const lang = await page.$eval('html', el => el.lang);
      assert.ok(lang.toLowerCase().startsWith(links[i].lang === 'en' ? 'en' : 'zh'));
      assert.ok(page.url().endsWith(links[i].lang === 'en' ? '/studio/infra.html' : '/studio/zh-infra.html'), 'Language links honestly select the parent topic');
    }
    report.navigation.push({file, ...links[i], javascript: false, status: response.status()});
  }
}
async function main() {
  const prepared = sourceOnly();
  if (process.argv.includes('--source-only')) {
    console.log(JSON.stringify({result: 'PASS', mode: 'source-only; no HTML, SVG or browser artifacts written', baseline, prepared, asset: {file: asset, sha256: hash(sourceBytes(asset))}, languageLimitations}, null, 2));
    return;
  }
  report.preservation = validate();
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({headless: 'shell', pipe: true});
  try {
    fs.mkdirSync(output, {recursive: true});
    for (const file of files) {
      const isReport = file === files[1];
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      await page.setCacheEnabled(false);
      const errors = [], failed = [], badResponses = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('requestfailed', req => failed.push({url: req.url(), reason: req.failure()?.errorText}));
      page.on('response', res => {if (res.status() >= 400) badResponses.push({url: res.url(), status: res.status()});});
      await page.evaluateOnNewDocument(() => {
        window.phase179CspViolations = [];
        document.addEventListener('securitypolicyviolation', e => window.phase179CspViolations.push({directive: e.violatedDirective, uri: e.blockedURI}));
      });
      await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: 'light'}]);
      let canonical;
      for (const javascript of [true, false]) {
        await page.setJavaScriptEnabled(javascript);
        for (const width of [390, 768, 1440]) {
          await page.setViewport({width, height: 900});
          const response = await page.goto(`${base}/${file}`, {waitUntil: 'networkidle0'});
          assert.equal(response.status(), 200);
          const state = await layoutState(page, isReport);
          assert.equal(state.width, width, `${file}/${width}: document horizontal overflow`);
          assert.equal(state.frames, 0);
          assert.deepEqual(state.nested, [], `${file}/${width}: no nested page scrolling`);
          assert.equal(state.background, 'rgb(8, 13, 27)', 'Default deep navy regardless of OS theme');
          assert.equal(state.navBackground, 'rgb(16, 26, 48)');
          assert.equal(state.navColor, 'rgb(238, 243, 255)');
          assert.equal(state.linkColor, 'rgb(154, 171, 255)');
          assert.ok(state.languageTopRight, 'Native top-right site-language links');
          assert.deepEqual(state.languages.map(a => a.text), ['EN', '中文']);
          assert.deepEqual(state.cspViolations, []);
          if (isReport) assert.equal(state.cards, 7);
          else {
            assert.equal(state.rows, (sourceFor(file).match(/<tr data-cat=/g) || []).length);
            if (!javascript) assert.ok(state.hasNoScriptNotice);
          }
          if (canonical === undefined) canonical = state.sourceText;
          else assert.equal(state.sourceText, canonical, 'Content invariant across widths and no-JS');
          await page.evaluate(() => scrollTo({top: document.documentElement.scrollHeight, behavior: 'instant'}));
          assert.ok(await page.evaluate(() => scrollY > 100), 'The document itself scrolls');
          await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
          if (javascript) await page.screenshot({path: path.join(output, `${path.basename(file, '.html')}-${width}.png`)});
          const {sourceText, ...summary} = state;
          report.layouts.push({file, javascript, width, ...summary, sourceTextSha256: hash(sourceText)});
        }
      }
      const original = await browser.newPage();
      await original.setViewport({width: 1440, height: 900});
      await original.setContent(sourceFor(file), {waitUntil: 'load'});
      await page.setJavaScriptEnabled(true);
      await page.setViewport({width: 1440, height: 900});
      await page.goto(`${base}/${file}`, {waitUntil: 'networkidle0'});
      if (isReport) {
        assert.deepEqual(await cardSnapshot(page), await cardSnapshot(original), 'Original report text, cards, colors and chart geometry');
      } else {
        assert.equal(canonical, await original.$eval('.container', el => el.textContent.replace(/\s+/g, ' ').trim()), 'Original substantive workbench content');
        for (const width of [390, 768, 1440]) {
          await page.setViewport({width, height: 900});
          await page.goto(`${base}/${file}`, {waitUntil: 'networkidle0'});
          await original.goto('about:blank');
          await original.setContent(sourceFor(file), {waitUntil: 'load'});
          await interactions(page, original);
          for (const [section, selector] of [['controls', '#presetSelect'], ['catalog', '#expTable']]) {
            await page.$eval(selector, el => el.scrollIntoView({block: 'start'}));
            await page.screenshot({path: path.join(output, `ai-infra-architect-workbench-${section}-${width}.png`)});
          }
        }
      }
      await original.close();
      assert.deepEqual(errors, [], `${file}: runtime errors`);
      assert.deepEqual(failed, [], `${file}: failed resources`);
      assert.deepEqual(badResponses, [], `${file}: bad HTTP responses`);
      await nativeNavigation(page, file);
      await page.close();
    }
    const response = await fetch(`${base}/${asset}`);
    assert.equal(response.status, 200);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), sourceBytes(asset), 'Served SVG bytes');
    report.result = 'PASS';
    console.log('PASS: pinned bytes/CSP/runtime/SVG, 12 JS/no-JS layouts, native links, unchanged report geometry and live workbench controls.');
  } catch (error) {
    report.result = 'FAIL';
    report.errors.push(error.stack);
    throw error;
  } finally {
    fs.writeFileSync(path.join(output, 'phase179-validation.json'), JSON.stringify(report, null, 2));
    await browser.close();
  }
}
if (require.main === module) main().catch(error => {console.error(error); process.exitCode = 1;});
module.exports = {sourceOnly};
