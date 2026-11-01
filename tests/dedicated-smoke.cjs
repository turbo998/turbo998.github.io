'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { root, owned, originalOwned, supplementalOwned, sourceOverrides, baseline, transform, sha } = require('../scripts/integrate-dedicated.cjs');
const cycle377Paths = ['benchmark-cards.html', 'benchmark-cards.en.html', 'demo.html', 'selector.html', 'workbench-cycle-377.html'].map(name => `workshops/azure-agent-infra/${name}`);
const cycle377Commit = '8c84971c7e952a5fb6f254ee8fcfef5678d9941d';
const concurrentCommit = '3bdac3d4db9a0cec264ee42b59bbef8a7f87364b';
const concurrentPaths = ['voice/deck.html','voice/benchmark-cards.html','workshops/agentic-commerce/live-demo.html','workshops/agentic-commerce/live-demo.en.html','workshops/agentic-commerce/benchmark-cards.html','workshops/agentic-commerce/benchmark-cards.en.html','workshops/ai-security/benchmark-cards.html','workshops/ai-security/benchmark-cards.en.html'];
function restoreConcurrentSource(r, html) {
  let restored = strip(html);
  if (r.path === 'voice/deck.html') restored = restored.replace('<body class="kee-dedicated-deck-root"><div class="kee-dedicated-deck-stage">','<body>').replace('</div></body>','</body>');
  if (/agentic-commerce\/live-demo(?:\.en)?\.html$/.test(r.path)) restored = restored.replaceAll(String.raw`null / \"\" / []`, 'null / "" / []').replaceAll(String.raw`null/\"\"/[]`, 'null/""/[]');
  return restored;
}
const output = process.env.DEDICATED_ARTIFACTS || path.join(root, 'tests', 'dedicated-artifacts');
const base = process.env.DEDICATED_BASE_URL || 'http://127.0.0.1:8797/';
const perimeterBaseline = process.env.DEDICATED_PERIMETER_BASELINE;
const gitSource = file => require('node:child_process').execFileSync('git', ['show', `${perimeterBaseline}:${file}`], { cwd: root, maxBuffer: 20 * 1024 * 1024 }).toString('utf8');
const perimeterCss = fs.readFileSync(path.join(root, 'assets/dedicated-navigation.css'), 'utf8').replace(/\r\n/g, '\n');
const previousPerimeterCss = perimeterBaseline ? gitSource('assets/dedicated-navigation.css').replace(/\r\n/g, '\n') : null;
async function assertPerimeter(page) {
  const palette = await page.evaluate(() => {
    const nav = document.querySelector('.kee-dedicated-nav'), style = getComputedStyle(nav);
    const color = selector => getComputedStyle(nav.querySelector(selector)).color;
    return { background: style.backgroundColor, text: style.color, border: style.borderTopColor, scheme: style.colorScheme, identity: color('.kee-dedicated-identity'), link: color('a:not(.kee-dedicated-identity)'), muted: color('.kee-dedicated-language') };
  });
  assert.deepEqual(palette, { background: 'rgb(16, 26, 48)', text: 'rgb(238, 243, 255)', border: 'rgb(49, 67, 97)', scheme: 'dark', identity: 'rgb(238, 243, 255)', link: 'rgb(154, 171, 255)', muted: 'rgb(173, 187, 209)' }, 'Dark Aurora perimeter palette mismatch');
  return palette;
}
const strip = s => s.replace(/<!-- kee-dedicated-style:start -->[\s\S]*?<!-- kee-dedicated-style:end -->\n/g, '').replace(/\n<!-- kee-dedicated-navigation:start -->[\s\S]*?<!-- kee-dedicated-navigation:end -->\n/g, '').replace(/<!-- kee-dedicated-report-(open|close):start -->[\s\S]*?<!-- kee-dedicated-report-\1:end -->/g, '').replace(/<body class="kee-dedicated-(?:report-(?:root|text)|cycle377)">/, '<body>').replace('<button id="kee-resource-language"', '<button');
async function checkCycle377(browser, result) {
  result.cycle377 = { sourceCommit: cycle377Commit, layouts: [], interactions: [], noJavaScript: [], network: [] };
  const evidence = JSON.parse(fs.readFileSync(path.join(root, 'workshops/azure-agent-infra/evidence/cycle-377-benchmark.json'), 'utf8'));
  for (const route of cycle377Paths) {
    const page = await browser.newPage(), errors = [], consoleErrors = [], failedRequests = [], requests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('request', request => requests.push(request.url()));
    page.on('requestfailed', request => failedRequests.push({ url: request.url(), reason: request.failure()?.errorText }));
    try {
      await page.setViewport({ width: 1440, height: 1000 });
      const response = await page.goto(new URL(route, base).href, { waitUntil: 'networkidle0', timeout: 45000 });
      assert.equal(response.status(), 200, route);
      let interaction;
      if (route.endsWith('/workbench-cycle-377.html')) {
        const counts = await page.evaluate(() => Object.fromEntries(['lat', 'thr', 'pol', 'cost'].map(id => [id, document.querySelectorAll(`#${id} tr`).length])));
        assert.deepEqual(counts, { lat: 4, thr: 4, pol: 3, cost: 4 });
        const before = await page.$$eval('#cost tr td:nth-child(2)', cells => cells.map(cell => cell.textContent));
        await page.click('#mins'); await page.keyboard.down('Control'); await page.keyboard.press('a'); await page.keyboard.up('Control'); await page.keyboard.type('40');
        const after = await page.$$eval('#cost tr td:nth-child(2)', cells => cells.map(cell => cell.textContent));
        const costs = minutes => evidence.single_session_cost.map(row => '$' + ((row.vm_hourly_usd / row.sessions_per_host) * (minutes / 60) + row.overhead_usd).toFixed(5));
        assert.deepEqual(before, costs(20)); assert.deepEqual(after, costs(40)); assert.notDeepEqual(before, after);
        interaction = { action: 'Native number input: 20 to 40 minutes; all four session costs match the original deterministic formula', counts, before, after, noCloudExecution: true };
        await page.click('#mins'); await page.keyboard.down('Control'); await page.keyboard.press('a'); await page.keyboard.up('Control'); await page.keyboard.type('20');
      } else if (route.endsWith('/demo.html')) {
        await page.click('#tpl_ci'); await new Promise(resolve => setTimeout(resolve, 2500));
        assert(await page.$eval('#tpl_ci', button => button.classList.contains('active')));
        const before = await page.$eval('.topbar', nav => nav.innerText);
        await page.click('#langToggle');
        const after = await page.$eval('.topbar', nav => nav.innerText);
        assert.notEqual(before, after, 'Original demo language toggle did not change text');
        assert(await page.$('.topbar a[href="workbench-cycle-377.html"]'));
        interaction = { action: 'Native Code Interpreter template and original language toggle', active: true, languageChanged: true, workbenchLinkRetained: true };
      } else if (route.endsWith('/selector.html')) {
        const controls = [];
        for (const id of ['sel_observatory_mode', 'sel_smr_reforming_mode', 'sel_lng_membrane_mode', 'sel_sic_gan_mode', 'sel_lh2_zbo_mode']) {
          const value = await page.$eval(`#${id}`, select => select.options[1].value);
          await page.select(`#${id}`, value);
          assert.equal(await page.$eval(`#${id}`, select => select.value), value);
          controls.push({ id, value });
        }
        assert((await page.$eval('#observatoryOut', element => element.textContent)).length > 0);
        const before = await page.$eval('.topbar', nav => nav.innerText);
        await page.click('#langToggle');
        assert.notEqual(await page.$eval('.topbar', nav => nav.innerText), before);
        assert(await page.$('.topbar a[href="workbench-cycle-377.html"]'));
        interaction = { action: 'All five preserved selector controls and original language toggle', controls, languageChanged: true, workbenchLinkRetained: true };
      } else {
        interaction = await page.evaluate(() => ({ action: 'Read all seven source report cards under unchanged CSP', cards: document.querySelectorAll('.deck>.card').length, widths: [...document.querySelectorAll('.deck>.card')].map(card => card.getBoundingClientRect().width), csp: document.querySelector('meta[http-equiv="Content-Security-Policy"]').content, lang: document.documentElement.lang }));
        assert.equal(interaction.cards, 7); assert(interaction.widths.every(width => width === 900));
        assert.equal(interaction.csp, "default-src 'none'; style-src 'unsafe-inline'");
        assert.equal(interaction.lang, route.endsWith('.en.html') ? 'en' : 'zh-CN');
        assert.equal(requests.filter(url => url !== page.url() && !url.startsWith('data:')).length, 0, 'Sealed report initiated runtime requests');
      }
      result.cycle377.interactions.push({ route, ...interaction });
      for (const width of [390, 768, 1440]) {
        await page.setViewport({ width, height: 900 }); await new Promise(resolve => setTimeout(resolve, 150));
        await page.evaluate(() => window.scrollTo(0, 0));
        const layout = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, documentHeight: document.documentElement.scrollHeight, bodyOverflow: getComputedStyle(document.body).overflow, duplicateIds: [...new Set([...document.querySelectorAll('[id]')].map(element => element.id).filter((id, index, all) => all.indexOf(id) !== index))], verticalContainers: [...document.querySelectorAll('body *')].filter(element => !['PRE', 'CODE', 'TEXTAREA'].includes(element.tagName) && element.clientHeight > 0 && element.scrollHeight > element.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(element).overflowY)).map(element => ({ tag: element.tagName, id: element.id, className: typeof element.className === 'string' ? element.className : '' })) }));
        assert.equal(layout.documentWidth, width, `Horizontal document overflow: ${route} at ${width}`);
        assert.notEqual(layout.bodyOverflow, 'hidden'); assert.deepEqual(layout.duplicateIds, []); assert.deepEqual(layout.verticalContainers, [], `Nested vertical scrolling: ${route}`);
        layout.perimeterPalette = await assertPerimeter(page);
        const viewport = await page.$('.kee-dedicated-report-viewport');
        if (viewport && width < 900) {
          await page.focus('.kee-dedicated-report-viewport'); await page.keyboard.press('ArrowRight'); await new Promise(resolve => setTimeout(resolve, 250));
          layout.reportKeyboardScroll = await page.$eval('.kee-dedicated-report-viewport', element => element.scrollLeft);
          assert(layout.reportKeyboardScroll > 0, 'Protected report horizontal viewport must remain keyboard-scrollable');
          await page.$eval('.kee-dedicated-report-viewport', element => { element.scrollLeft = 0; });
        }
        layout.documentScroll = await page.evaluate(() => { window.scrollTo(0, document.documentElement.scrollHeight); return document.scrollingElement.scrollTop; });
        if (layout.documentHeight > 902) assert(layout.documentScroll > 0, 'Document cannot scroll');
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: path.join(output, `cycle377-${path.basename(route, '.html')}-${width}.png`) });
        result.cycle377.layouts.push({ route, ...layout, pass: true });
      }
      assert.deepEqual(errors, [], `Runtime errors: ${route}`); assert.deepEqual(consoleErrors, [], `Console errors: ${route}`); assert.deepEqual(failedRequests, [], `Failed runtime dependencies: ${route}`);
      result.cycle377.network.push({ route, requests, errors, consoleErrors, failedRequests, interception: false });
    } finally { await page.close(); }
    const noJs = await browser.newPage();
    try {
      await noJs.setJavaScriptEnabled(false); await noJs.setViewport({ width: 390, height: 844 });
      assert.equal((await noJs.goto(new URL(route, base).href)).status(), 200);
      await assertPerimeter(noJs);
      await noJs.focus('.kee-dedicated-nav a');
      const focus = await noJs.$eval('.kee-dedicated-nav a', anchor => ({ focused: document.activeElement === anchor, visible: anchor.matches(':focus-visible'), color: getComputedStyle(anchor).outlineColor, width: getComputedStyle(anchor).outlineWidth }));
      assert.deepEqual(focus, { focused: true, visible: true, color: 'rgb(86, 221, 205)', width: '3px' });
      const target = route.endsWith('/workbench-cycle-377.html') || route.endsWith('/benchmark-cards.html') ? 'benchmark-cards.en.html' : route.endsWith('/benchmark-cards.en.html') ? 'benchmark-cards.html' : 'workbench-cycle-377.html';
      if (route.endsWith('/workbench-cycle-377.html')) {
        assert((await noJs.$eval('.kee-dedicated-language', span => span.textContent)).includes('require JavaScript'));
        const evidenceHref = await noJs.$eval('.kee-dedicated-nav a[href="evidence/cycle-377-benchmark.json"]', anchor => anchor.href);
        assert.equal((await fetch(evidenceHref)).status, 200);
      }
      await noJs.click(`a[href="${target}"]`);
      assert.equal(new URL(noJs.url()).pathname, `/workshops/azure-agent-infra/${target}`);
      result.cycle377.noJavaScript.push({ route, target, focus, pass: true });
    } finally { await noJs.close(); }
  }
}
async function main() {
  fs.mkdirSync(output, { recursive: true });
  const result = { scope: 'Dedicated native-surface integration; not a benchmark rerun or backend E2E. External requests are observed, never blanket-blocked.', static: [], scenarios: [] };
  assert.deepEqual(Object.keys(sourceOverrides).sort(), [...cycle377Paths, ...concurrentPaths].sort(), 'Source override scope widened');
  assert.equal(originalOwned.length, 63, 'Original inventory ownership changed');
  assert.deepEqual(supplementalOwned.map(r => r.path).sort(), ['workshops/azure-agent-infra/benchmark-cards.en.html', 'workshops/azure-agent-infra/workbench-cycle-377.html']);
  assert.equal(owned.length, 65);
  if (perimeterBaseline) assert.equal(fs.readFileSync(path.join(root, 'docs/redesign/route-inventory.json'), 'utf8').replace(/\r\n/g, '\n'), gitSource('docs/redesign/route-inventory.json').replace(/\r\n/g, '\n'), 'Original inventory must remain immutable');
  for (const r of owned) {
    const source = baseline(r), live = fs.readFileSync(path.join(root, r.path), 'utf8'), expected = transform(r, source);
    assert.equal(live, expected.html, r.path);
    if (r.sourceOverride) {
      assert.equal(r.sourceOverride.commit, cycle377Paths.includes(r.path) ? cycle377Commit : concurrentCommit, `Unpinned concurrent source: ${r.path}`);
      if (/\/(demo|selector)\.html$/.test(r.path)) {
        const sourceLink = source.split('\n').find(line => line.includes('href="workbench-cycle-377.html"')) + '\n';
        assert(sourceLink.startsWith('    <a class="nav-link"'), 'Published workbench link missing');
        assert.equal(source.replace(sourceLink, ''), baseline(originalOwned.find(o => o.path === r.path)), `Source changes beyond native Cycle #377 link: ${r.path}`);
        if (perimeterBaseline) assert.equal(live.replace(perimeterCss, previousPerimeterCss).replace(sourceLink, ''), gitSource(r.path), `Unexpected changes beyond source link and perimeter: ${r.path}`);
      } else {
        assert.equal(restoreConcurrentSource(r, live), source, `New source not reversibly preserved: ${r.path}`);
      }
    } else if (perimeterBaseline) assert.equal(live.replace(perimeterCss, previousPerimeterCss), gitSource(r.path), `Non-perimeter bytes changed since ${perimeterBaseline}: ${r.path}`);
    const csp = html => html.match(/<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi) || [];
    assert.deepEqual(csp(live), csp(source), `Original CSP changed: ${r.path}`);
    assert.equal((live.match(/class="kee-dedicated-nav"/g) || []).length, 1, r.path);
    assert(!/<iframe\b/i.test(live), `Full-document preview remains: ${r.path}`);
    if (r.role === 'report') assert.equal(strip(live), source, `Protected report content changed: ${r.path}`);
    for (const script of live.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!/type=["'](?:module|application\/)/i.test(script[1])) new (require('node:vm').Script)(script[2], { filename: r.path });
    }
    const nav = live.match(/<nav class="kee-dedicated-nav"[\s\S]*?<\/nav>/)[0];
    for (const m of nav.matchAll(/href="([^"]+)"/g)) {
      assert(!m[1].startsWith('/'), `Nonrelative navigation: ${r.path}`);
      if (m[1][0] !== '#') assert(fs.existsSync(path.resolve(root, path.dirname(r.path), m[1])), `Missing navigation: ${r.path} -> ${m[1]}`);
    }
    result.static.push({ path: r.path, role: r.role, pass: true, reportBytesPreserved: r.role === 'report', cspPreserved: true, perimeterOnlyComparedTo: r.sourceOverride ? null : perimeterBaseline || null, sourceOverrideComparedTo: r.sourceOverride?.commit || null, linkOnlySourceDelta: Boolean(r.sourceOverride && /\/(demo|selector)\.html$/.test(r.path)), sha256: sha(live) });
  }
  if (process.argv.includes('--static')) {
    fs.writeFileSync(path.join(output, 'static.json'), JSON.stringify(result, null, 2));
    console.log(`Static: ${result.static.length} routes; every report source preserved.`); return;
  }
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'shell', pipe: true, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
  try {
    if (!process.argv.includes('--layout')) {
      try { await checkCycle377(browser, result); }
      finally { fs.writeFileSync(path.join(output, 'cycle377.json'), JSON.stringify(result, null, 2)); }
      if (process.argv.includes('--cycle377')) {
        console.log(`Cycle #377: ${result.static.length} static routes, ${result.cycle377.layouts.length} layout states, ${result.cycle377.interactions.length} native scenarios, ${result.cycle377.noJavaScript.length} no-JavaScript navigation checks; no network interception.`);
        return;
      }
    }
    if (process.argv.includes('--layout')) {
      result.layouts = [];
      for (const r of owned) {
        if (r.path === 'workshops/azure-vm-modernization/index.html') {
          result.layouts.push({ route: r.path, classification: 'Preserved external redirect; remote deployment is not a local-layout result', localStatus: (await fetch(new URL(r.path, base))).status });
          continue;
        }
        const page = await browser.newPage(), errors = [];
        page.on('pageerror', e => errors.push(e.message));
        try {
          await page.setViewport({ width: 390, height: 844 });
          await page.goto(new URL(r.path, base).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
          for (const width of r.sourceOverride ? [390, 768, 1440] : [390, 1440]) {
            await page.setViewport({ width, height: 844 });
            await new Promise(resolve => setTimeout(resolve, 150));
            const layout = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, bodyOverflow: getComputedStyle(document.body).overflow, duplicateIds: [...new Set([...document.querySelectorAll('[id]')].map(e => e.id).filter((id, i, all) => all.indexOf(id) !== i))], overflowing: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1 && e.clientWidth > 0 && !e.closest('.kee-dedicated-report-viewport,.kee-dedicated-table-scroll,pre,.code-block,.table-wrap')).slice(0, 8).map(e => ({ tag: e.tagName, id: e.id, className: typeof e.className === 'string' ? e.className : '', right: e.getBoundingClientRect().right })) }));
            const scrollContainers = await page.evaluate(allowed => [...document.querySelectorAll('body *')].filter(e => !['PRE', 'CODE', 'TEXTAREA'].includes(e.tagName) && e.clientHeight > 0 && e.scrollHeight > e.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(e).overflowY)).map(e => ({ tag: e.tagName, id: e.id, className: typeof e.className === 'string' ? e.className : '', height: e.clientHeight, scrollHeight: e.scrollHeight, reviewed: allowed.some(selector => e.matches(selector)) })), transform(r, baseline(r)).record.verticalScrollRegions.map(region => region.selector));
            result.layouts.push({ route: r.path, ...layout, scrollContainers, errors: [...errors], pass: layout.documentWidth <= width && layout.bodyOverflow !== 'hidden' && layout.duplicateIds.length === 0 && errors.length === 0 && scrollContainers.every(s => s.reviewed) });
          }
        } catch (error) { result.layouts.push({ route: r.path, error: error.message, pass: false }); }
        finally { await page.close(); }
      }
      fs.writeFileSync(path.join(output, 'owned-layouts.json'), JSON.stringify(result, null, 2));
      const failures = result.layouts.filter(l => l.pass === false);
      console.log(JSON.stringify({ states: result.layouts.length, failures }, null, 2));
      assert.equal(failures.length, 0, 'Owned layout failures; see owned-layouts.json');
      return;
    }
    const cases = [
      ['infra', 'workshops/azure-agent-infra/demo.html'],
      ['selector', 'workshops/azure-agent-infra/selector.html'],
      ['commerce', 'workshops/agentic-commerce/live-demo.html'],
      ['commerce-en', 'workshops/agentic-commerce/live-demo.en.html'],
      ['canvas', 'animation/demos/rocket-launch/index.html'],
      ['game', 'game/demos/scrap-swarm/index.html'],
      ['report', 'workshops/benchmarks/decision-1-cards.html'],
      ['report-security', 'workshops/ai-security/benchmark-cards.en.html'],
      ['report-maf', 'workshops/maf-multi-agent-benchmark/cards.html'],
      ['astra', 'animation/demos/astra-planet/index.html'],
      ['voice-report', 'voice/benchmark-cards.html'],
      ['voice', 'voice/deck.html'],
      ['arena', 'animation/demos/pelican-bicycle-arena/index.html']
    ];
    for (const [name, route] of cases) {
      const page = await browser.newPage(), errors = [], failedRequests = [], consoleErrors = [], requests = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
      page.on('request', r => requests.push(r.url()));
      page.on('requestfailed', r => failedRequests.push({ url: r.url(), reason: r.failure()?.errorText }));
      await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
      console.log(`Checking dedicated surface: ${name}`);
      const response = await page.goto(new URL(route, base).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
      assert.equal(response.status(), 200, route);
      await new Promise(r => setTimeout(r, 1000));
      const info = await page.evaluate(() => ({ title: document.title, buttons: [...document.querySelectorAll('button')].slice(0,24).map(b => ({ id: b.id, text: b.textContent.trim(), onclick: b.getAttribute('onclick') })), canvas: [...document.querySelectorAll('canvas')].map(c=>({width:c.width,height:c.height})), bodyOverflow: getComputedStyle(document.body).overflow, nav: document.querySelector('.kee-dedicated-nav').getBoundingClientRect().toJSON(), frames: document.querySelectorAll('iframe').length }));
      info.perimeterPalette = await assertPerimeter(page);
      let action;
      if (name === 'infra') {
        await page.click('#tpl_ci'); await new Promise(r=>setTimeout(r,2500));
        action = await page.evaluate(() => ({ scenario: 'Code-Interpreter sandbox simulation', active: document.querySelector('#tpl_ci').classList.contains('active'), text: document.body.innerText.slice(-3000) }));
        assert(action.active, 'Infra template interaction did not activate');
      } else if (name === 'selector') {
        action = { scenario: 'Exercise all five disambiguated native selector controls', controls: [] };
        for (const id of ['sel_observatory_mode', 'sel_smr_reforming_mode', 'sel_lng_membrane_mode', 'sel_sic_gan_mode', 'sel_lh2_zbo_mode']) {
          const value = await page.$eval(`#${id}`, e => e.options[1].value);
          await page.select(`#${id}`, value);
          const observed = await page.$eval(`#${id}`, e => ({ id: e.id, value: e.value, outputPresent: e.closest('section')?.innerText.length > 0 }));
          assert.equal(observed.value, value, id);
          action.controls.push(observed);
        }
        assert((await page.$eval('#observatoryOut', e => e.textContent)).length > 0, 'Repaired observatory output missing');
      } else if (name.startsWith('commerce')) {
        await page.waitForSelector('#scenario-tabs button');
        const before = await page.$eval('.app-shell', e => e.textContent);
        await page.click('#btn-next');
        const after = await page.$eval('.app-shell', e => e.textContent);
        action = { scenario: 'Advance Commerce scenario using native Next Step control', changed: before !== after, scenarioButtons: await page.$$eval('#scenario-tabs button', es => es.length) };
        assert(action.changed, 'Commerce native step control did not advance');
        await page.select('#s1752-cred-select', 'sk_leak');
        assert.match(await page.$eval('#s1752-live-readout', e=>e.textContent), /invalid_link_access_token_plane/, 'Stage1752 credential boundary');
        await page.select('#s1752-cred-select', 'spt_valid');
        await page.select('#s1752-retry-select', '524_ts');
        assert.match(await page.$eval('#s1752-live-readout', e=>e.textContent), /120s wait/, 'Stage1752 source retry fixture');
        action.stage1752 = { credentialBoundary: true, retryTimestamp: true, sourceFixtureOnly: true };
      } else if (name === 'canvas') {
        await page.click('#launch'); await new Promise(r=>setTimeout(r,2500));
        action = await page.evaluate(() => ({ scenario: 'Launch rocket', phase: document.querySelector('#phase').textContent, time: document.querySelector('#time').textContent, status: document.querySelector('#rocket-status').textContent }));
        assert.notEqual(action.time, 'T —', 'Canvas launch did not start');
        await page.click('#pause-launch');
      } else if (name === 'game') {
        const buttons = await page.$$('#panel button');
        assert(buttons.length > 0, 'Game did not initialize its menu');
        action = { scenario: 'Start game using native primary button, move right and pause' };
        const primary = await page.$('#panel button.primary');
        await (primary || buttons[0]).click();
        await new Promise(r=>setTimeout(r,500));
        await page.keyboard.down('d'); await new Promise(r=>setTimeout(r,700)); await page.keyboard.up('d');
        await page.keyboard.press('p'); await new Promise(r=>setTimeout(r,300));
        action.after = await page.evaluate(() => ({ hud: document.querySelector('#hud').innerText, panel: document.querySelector('#panel').innerText, canvas: document.querySelectorAll('canvas').length }));
        assert(action.after.hud.length > 0, 'Game HUD missing after start');
      } else if (name === 'voice') {
        const before = await page.$eval('.slide.active', e=>e.textContent.slice(0,200));
        await page.click('#nextBtn'); await new Promise(r=>setTimeout(r,600));
        action = { scenario: 'Next slide control', before, after: await page.$eval('.slide.active',e=>e.textContent.slice(0,200)) };
        assert.notEqual(action.before, action.after, 'Voice slide did not advance');
      } else if (name.startsWith('report')) {
        action = await page.evaluate(() => ({ scenario: 'Read original cards with unmodified CSP', cards: document.querySelectorAll('.report-card,.card').length, csp: document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content }));
        assert(action.cards >= 7, 'Report cards missing');
        const originalCsp = baseline(owned.find(r => r.path === route)).match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
        assert.equal(action.csp, originalCsp, 'Sealed CSP changed');
        assert(action.csp.includes("default-src 'none'; style-src 'unsafe-inline'"), 'Sealed CSP contract missing');
        assert.equal(requests.filter(url => url !== page.url() && !url.startsWith('data:')).length, 0, 'Sealed report has runtime dependencies');
        assert.equal(consoleErrors.length, 0, 'Sealed report CSP/console error');
      } else if (name === 'astra') {
        action = await page.evaluate(() => ({ scenario: 'Native WebGL stage and scrollable settings inspector', canvas: document.querySelector('#planet-canvas')?.getBoundingClientRect().toJSON(), controlsOverflow: getComputedStyle(document.querySelector('#controls')).overflow, loading: document.querySelector('#loading')?.textContent, fatal: document.querySelector('#fatal')?.textContent }));
        assert(action.canvas.width > 0 && action.canvas.height > 0, 'Astra viewport collapsed');
        assert.notEqual(info.bodyOverflow, 'hidden', 'Astra document remains scroll locked');
      } else if (name === 'voice-report') {
        const before = await page.$eval('main', e => e.textContent);
        await page.click('button[data-lang="en"]');
        const after = await page.$eval('main', e => e.textContent);
        action = { scenario: 'Existing Voice report English language control', contentChanged: before !== after, htmlLang: await page.$eval('html', e => e.lang) };
        assert(action.contentChanged, 'Voice report language control did not change content');
      } else {
        action = await page.evaluate(() => ({ scenario: 'Native simulator links replace embedded documents', nativeLinks: [...document.querySelectorAll('.kee-dedicated-native-link a')].map(a=>a.href) }));
        assert.equal(action.nativeLinks.length, 3);
      }
      await page.evaluate(() => window.scrollTo(0,0));
      await page.screenshot({ path: path.join(output, `${name}-1440.png`) });
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
      await new Promise(r=>setTimeout(r,500));
      const mobile = await page.evaluate(() => { const nav = document.querySelector('.kee-dedicated-nav'); return { navWidth: nav.getBoundingClientRect().width, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth, documentHeight: document.documentElement.scrollHeight, bodyOverflow: getComputedStyle(document.body).overflow, navLinks: [...nav.querySelectorAll('a')].map(a=>({ text:a.textContent, width:a.getBoundingClientRect().width })) }; });
      mobile.perimeterPalette = await assertPerimeter(page);
      const reportViewport = await page.$('.kee-dedicated-report-viewport');
      if (reportViewport) {
        await page.focus('.kee-dedicated-report-viewport');
        await page.keyboard.press('ArrowRight');
        await new Promise(resolve => setTimeout(resolve, 250));
        action.keyboardHorizontalScroll = await page.$eval('.kee-dedicated-report-viewport', e => e.scrollLeft);
        assert(action.keyboardHorizontalScroll > 0, 'Original report viewport cannot be scrolled with the keyboard');
        await page.$eval('.kee-dedicated-report-viewport', e => { e.scrollLeft = 0; });
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      await page.screenshot({ path: path.join(output, `${name}-390.png`) });
      assert.equal(mobile.documentWidth, mobile.viewport, 'Document overflows mobile viewport');
      assert(mobile.navWidth <= mobile.viewport, 'Perimeter navigation overflows mobile viewport');
      assert.notEqual(mobile.bodyOverflow, 'hidden', 'Document scrolling is locked');
      result.scenarios.push({ name, route, info, action, mobile, errors, consoleErrors, failedRequests, requests, pass: errors.length === 0 });
      await page.close();
    }
    result.templateHashes = [];
    const aliases = { 'tpl-mcp': 'xiaozhe-mcp-node-graph', 'tpl-rag': 'xiaozhe-rag-pipeline-flow', 'tpl-finops': 'chimp-deepseek-unit-economics' };
    for (const directory of ['animation', 'generative-visual-lab']) {
      for (const [hash, expected] of Object.entries(aliases)) {
        const target = `${directory}/demos/knowledge-explainer-studio/index.html#${hash}`;
        const templatePage = await browser.newPage(), errors = [];
        templatePage.on('pageerror', e => errors.push(e.message));
        await templatePage.goto(new URL(target, base).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await templatePage.waitForFunction(() => Boolean(window.explainerStudio));
        const actual = await templatePage.evaluate(() => ({ template: window.explainerStudio.snapshot().templateId, activeTab: document.querySelector('.tpl-tab.active')?.getAttribute('data-template') }));
        assert.equal(actual.template, expected, target);
        assert.equal(actual.activeTab, expected, target);
        assert.equal(errors.length, 0, target);
        result.templateHashes.push({ target, expected, ...actual, errors, pass: true });
        await templatePage.close();
      }
    }
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(new URL('workshops/benchmarks/decision-1-cards.html', base).href);
    await page.focus('.kee-dedicated-nav a');
    assert(await page.$eval('.kee-dedicated-nav a', a=>a===document.activeElement), 'Native link not focusable without JS');
    result.noJavaScriptPerimeterPalette = await assertPerimeter(page);
    result.noJavaScriptFocus = await page.$eval('.kee-dedicated-nav a', a => ({ visible: a.matches(':focus-visible'), color: getComputedStyle(a).outlineColor, width: getComputedStyle(a).outlineWidth }));
    assert.deepEqual(result.noJavaScriptFocus, { visible: true, color: 'rgb(86, 221, 205)', width: '3px' }, 'Native Dark Aurora keyboard focus missing');
    await page.click('.kee-dedicated-nav a[href="../../index.html"]');
    assert.equal(new URL(page.url()).pathname, '/index.html');
    result.noJavaScriptNativeNavigation = true;
    await page.close();
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(output, 'smoke.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ coverage: result.static.length, scenarios: result.scenarios.map(s => ({ name: s.name, pass: s.pass, errors: s.errors, mobileWidth: s.mobile.documentWidth })), templateHashes: result.templateHashes.length, noJavaScriptNativeNavigation: result.noJavaScriptNativeNavigation }, null, 2));
  assert(result.scenarios.every(s=>s.pass), 'One or more runtime scenarios had errors; see smoke.json');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
