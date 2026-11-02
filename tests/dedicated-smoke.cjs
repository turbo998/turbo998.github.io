'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { root, owned, originalOwned, supplementalOwned, sourceOverrides, baseline, transform, sha } = require('../scripts/integrate-dedicated.cjs');
const { isArena, allowedFrames } = require('../scripts/pelican-policy.cjs');
const { execFileSync } = require('node:child_process');
const localizationChecks = new Set();
function localizationProtection(file) {
  for (const kind of ['demo', 'report']) {
    const manifest = path.join(root, `docs/redesign/${kind}-localization.json`);
    if (!fs.existsSync(manifest)) continue;
    const records = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    const rows = Array.isArray(records) ? records : records.records || records.pairs;
    assert(Array.isArray(rows), `${kind} localization manifest must enumerate protected pairs`);
    if (!rows.some(row => [row.source, row.en, row.zh].includes(file))) continue;
    const test = `tests/${kind}-localization.cjs`;
    assert(fs.existsSync(path.join(root, test)), `Missing preservation test: ${test}`);
    if (!localizationChecks.has(test)) {
      // Localization is not a waiver: its complete source/metric/script protection suite must pass.
      execFileSync(process.execPath, [path.join(root, test)], { cwd: root, env: process.env, stdio: 'inherit' });
      localizationChecks.add(test);
    }
    return test;
  }
  return null;
}
function normalizeReleaseShell(html) {
  return html.replace(/(<html\b[^>]*\blang=)["']zh["']/i, '$1"zh-CN"')
    .replace(/<(header|nav)\b[^>]*data-professional-header[^>]*>[\s\S]*?<\/\1>/g, '<!-- professional-header -->')
    .replace(/<div class="professional-context-bar">[\s\S]*?<\/div>\s*/g, '')
    .replace(/<style id="site-remediation-style">[\s\S]*?<\/style>\s*/g, '')
    .replace(/<!-- site-remediation-knowledge:start -->[\s\S]*?<!-- site-remediation-knowledge:end -->\s*/g, '')
    .replace(/<!-- professional-header -->\s*<!-- kee-dedicated-navigation:end -->/g, '<!-- professional-header -->\n<!-- kee-dedicated-navigation:end -->')
    .replace(/<script src="(?:\.\.\/)*assets\/editorial\/(?:search-index|search)\.js" defer><\/script>/g, '');
}
function finalizedLinks(file, html) {
  const pairs = require('../scripts/finalize-site.cjs').localeRegistry();
  if (!pairs.has(file)) return html;
  const en = !/<html\b[^>]*lang=["']zh/i.test(html);
  return html.split(/(<script\b[^>]*>[\s\S]*?<\/script>)/gi).map(part => /^<script\b/i.test(part) ? part : part.replace(/<a\b[^>]*>/gi, tag => {
    if (/hreflang=|data-nav-en-href=/.test(tag)) return tag;
    return tag.replace(/href="([^"]+)"/, (attribute, target) => {
      if (/^(?:[a-z]+:|#|\/\/)/i.test(target)) return attribute;
      const url = new URL(target, `https://site.invalid/${file}`), pair = pairs.get(url.pathname.slice(1));
      if (!pair) return attribute;
      const destination = pair[en ? 'en' : 'zh'];
      return `href="${path.posix.relative(path.posix.dirname(file), destination) || path.posix.basename(destination)}${url.search}${url.hash}"`;
    });
  })).join('');
}
function assertSourcePreservation(file, live, expected) {
  const protection = localizationProtection(file);
  if (file === 'workshops/azure-vm-modernization/index.html') {
    assert(fs.existsSync(path.join(root, 'workshops/azure-vm-modernization/index.zh.html')), 'Missing localized VM redirect counterpart');
    return 'localized VM compatibility entry pair';
  }
  if (!protection) {
    const normLive = normalizeReleaseShell(live);
    assert.ok(normLive === normalizeReleaseShell(expected) || normLive === normalizeReleaseShell(finalizedLinks(file, expected)), `Protected source changed outside known release shell/link additions: ${file}`);
  }
  return protection || 'exact generated source with known release shell and counterpart links';
}
const arenaRoutes = ['animation/demos/pelican-bicycle-arena', 'generative-visual-lab/demos/pelican-bicycle-arena', 'workshops/faf-vs-agent-forge'].flatMap(directory => ['index', 'pelican-arena'].flatMap(name => ['', '.en'].map(locale => `${directory}/${name}${locale}.html`)));
function assertArenaFrames(file, html) {
  const frames = [...html.matchAll(/<iframe\b([^>]*)>/gi)].map(([, attributes]) => Object.fromEntries([...attributes.matchAll(/([\w-]+)=["']([^"']*)["']/g)].map(([, key, value]) => [key, value])));
  if (!isArena(file)) { assert.equal(frames.length, 0, `Unapproved full-document preview: ${file}`); return; }
  assert(allowedFrames(file, frames), `Arena must retain exactly three distinct allowlisted engines: ${file}`);
  assert.deepEqual(frames.map(frame => frame.id).sort(), ['frameFaf', 'frameForge', 'frameHve']);
  const engines = { frameFaf: 'faf', frameForge: 'agent-forge', frameHve: 'hve' };
  for (const frame of frames) {
    assert(frame.class?.split(/\s+/).includes('demo-frame'), `${file}: ${frame.id} is not a live demo panel`);
    const target = frame.src.split(/[?#]/)[0];
    assert(!/^(?:[a-z]+:|\/)/i.test(target), `${file}: engine must be a local relative URL`);
    assert.equal(path.posix.basename(target), `demo-${engines[frame.id]}-pelican${file.endsWith('.en.html') ? '.en' : ''}.html`, `${file}: wrong engine/edition`);
    assert(fs.existsSync(path.resolve(root, path.dirname(file), target)), `${file}: missing engine ${frame.src}`);
  }
}
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
    const glass = CSS.supports('backdrop-filter', 'blur(16px)') && !matchMedia('(prefers-reduced-transparency: reduce)').matches;
    return { background: style.backgroundColor, text: style.color, border: style.borderTopColor, scheme: style.colorScheme, identity: color('.kee-dedicated-identity'), link: color('.professional-primary a:not([aria-current])'), position: style.position, top: style.top, glass };
  });
  assert.deepEqual(palette, { background: palette.glass ? 'rgba(16, 26, 48, 0.9)' : 'rgb(16, 26, 48)', text: 'rgb(238, 243, 255)', border: 'rgb(49, 67, 97)', scheme: 'dark', identity: 'rgb(238, 243, 255)', link: 'rgb(154, 171, 255)', position: 'sticky', top: '0px', glass: palette.glass }, 'Sticky Dark Aurora glass perimeter mismatch');
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
        await page.evaluate(() => toggleLang());
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
        await page.evaluate(() => toggleLang());
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
      await noJs.setCacheEnabled(false); await noJs.setJavaScriptEnabled(false); await noJs.setViewport({ width: 390, height: 844 });
      assert.equal((await noJs.goto(new URL(route, base).href)).status(), 200);
      await assertPerimeter(noJs);
      await noJs.focus('.kee-dedicated-nav a');
      const focus = await noJs.$eval('.kee-dedicated-nav a', anchor => ({ focused: document.activeElement === anchor, visible: anchor.matches(':focus-visible'), color: getComputedStyle(anchor).outlineColor, width: getComputedStyle(anchor).outlineWidth }));
      assert.deepEqual(focus, { focused: true, visible: true, color: 'rgb(86, 221, 205)', width: '3px' });
      const target = path.posix.basename(route).replace(route.endsWith('.en.html') ? '.en.html' : '.html', route.endsWith('.en.html') ? '.html' : '.en.html');
      const targetZhCn = target.replace(/\.html$/, '.zh-CN.html');
      const languageSelector = `.professional-controls a[hreflang="${route.endsWith('.en.html') ? 'zh-CN' : 'en'}"]`;
      const counterpart = new URL(await noJs.$eval(languageSelector, anchor => anchor.href));
      assert([`/workshops/azure-agent-infra/${target}`, `/workshops/azure-agent-infra/${targetZhCn}`].includes(counterpart.pathname));
      assert.equal(counterpart.search, '', 'Language navigation must open a true counterpart, not query-only chrome');
      if (route.endsWith('/workbench-cycle-377.html')) assert.equal((await fetch(new URL('workshops/azure-agent-infra/evidence/cycle-377-benchmark.json', base))).status, 200);
      await Promise.all([noJs.waitForNavigation({waitUntil:'load'}), noJs.click(languageSelector)]);
      assert.equal(new URL(noJs.url()).pathname, counterpart.pathname);
      assert.equal(await noJs.$eval('html', html => html.lang), route.endsWith('.en.html') ? 'zh-CN' : 'en');
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
    const preservation = assertSourcePreservation(r.path, live, expected.html);
    // Verify the reversible pre-localization transform as well as the live-output protection above.
    if (r.sourceOverride) {
      assert.equal(r.sourceOverride.commit, cycle377Paths.includes(r.path) ? cycle377Commit : r.path.startsWith('workshops/agentic-commerce/') ? '209aea9a1db92c816927df71a9242526b44925c1' : concurrentCommit, `Unpinned concurrent source: ${r.path}`);
      if (/\/(demo|selector)\.html$/.test(r.path)) {
        const sourceLink = source.split('\n').find(line => line.includes('href="workbench-cycle-377.html"')) + '\n';
        assert(sourceLink.startsWith('    <a class="nav-link"'), 'Published workbench link missing');
        assert.equal(source.replace(sourceLink, ''), baseline(originalOwned.find(o => o.path === r.path)), `Source changes beyond native Cycle #377 link: ${r.path}`);
        if (perimeterBaseline) assert.equal(normalizeReleaseShell(expected.html.replace(perimeterCss, previousPerimeterCss).replace(sourceLink, '')), normalizeReleaseShell(gitSource(r.path)), `Unexpected changes beyond source link and perimeter: ${r.path}`);
      } else {
        assert.equal(restoreConcurrentSource(r, expected.html), source, `New source not reversibly preserved before localization: ${r.path}`);
      }
    } else if (perimeterBaseline) assert.equal(normalizeReleaseShell(expected.html.replace(perimeterCss, previousPerimeterCss)), normalizeReleaseShell(gitSource(r.path)), `Non-perimeter source bytes changed since ${perimeterBaseline}: ${r.path}`);
    const csp = html => html.match(/<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi) || [];
    assert.deepEqual(csp(live), csp(source), `Original CSP changed: ${r.path}`);
    assert.equal((live.match(/class="kee-dedicated-nav"/g) || []).length, 1, r.path);
    assertArenaFrames(r.path, live);
    if (r.role === 'report') assert.equal(strip(expected.html), source, `Protected pre-localization report content changed: ${r.path}`);
    for (const script of live.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!/type=["'](?:module|application\/)/i.test(script[1])) new (require('node:vm').Script)(script[2], { filename: r.path });
    }
    const nav = live.match(/<nav class="kee-dedicated-nav"[\s\S]*?<\/nav>/)[0];
    for (const m of nav.matchAll(/href="([^"]+)"/g)) {
      assert(!m[1].startsWith('/'), `Nonrelative navigation: ${r.path}`);
      if (m[1][0] !== '#') assert(fs.existsSync(path.resolve(root, path.dirname(r.path), m[1].split(/[?#]/)[0] || path.basename(r.path))), `Missing navigation: ${r.path} -> ${m[1]}`);
    }
    result.static.push({ path: r.path, role: r.role, pass: true, preservation, originalReportTransformReversible: r.role === 'report', cspPreserved: true, perimeterOnlyComparedTo: r.sourceOverride ? null : perimeterBaseline || null, sourceOverrideComparedTo: r.sourceOverride?.commit || null, linkOnlySourceDelta: Boolean(r.sourceOverride && /\/(demo|selector)\.html$/.test(r.path)), sha256: sha(live) });
  }
  result.arenas = arenaRoutes.map(route => {
    assertArenaFrames(route, fs.readFileSync(path.join(root, route), 'utf8'));
    return { route, frames: 3, pass: true };
  });
  if (process.argv.includes('--static')) {
    fs.writeFileSync(path.join(output, 'static.json'), JSON.stringify(result, null, 2));
    console.log(`Static: ${result.static.length} protected routes; original source/CSP and localization checks passed; ${result.arenas.length} three-engine arenas.`); return;
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
      ...arenaRoutes.map((route, index) => [`arena-${index + 1}`, route])
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
        assert(isArena(route), `Unclassified native scenario: ${route}`);
        assert.equal(info.frames, 3);
        const panels = await page.$$eval('iframe.demo-frame', frames => frames.map(frame => ({ id: frame.id, src: frame.getAttribute('src') })));
        assert(allowedFrames(route, panels), `${route}: unapproved engine panel`);
        action = { scenario: 'Three live Pelican engines: rendered animation and native controls', engines: [] };
        for (const [id, canvas, control] of [['frameFaf', '#stage', '#btn-xray'], ['frameForge', '#stage', '#m-day'], ['frameHve', '#windCanvas', '#btnPostureUpright']]) {
          const element = await page.$(`#${id}`), frame = await element.contentFrame();
          assert(frame, `${route}: ${id} did not load`);
          await frame.waitForSelector(canvas, { timeout: 30000 });
          const before = await frame.$eval(control, button => button.className);
          const imageBefore = await frame.$eval(canvas, stage => stage.toDataURL());
          await frame.click(control);
          const after = await frame.$eval(control, button => button.className);
          assert.notEqual(after, before, `${route}: ${id} native control did not change state`);
          await frame.waitForFunction((selector, previous) => document.querySelector(selector).toDataURL() !== previous, { timeout: 10000 }, canvas, imageBefore);
          const dimensions = await frame.$eval(canvas, stage => ({ width: stage.width, height: stage.height }));
          assert(dimensions.width > 0 && dimensions.height > 0, `${route}: ${id} canvas collapsed`);
          action.engines.push({ id, control, before, after, renderedFrameChanged: true, ...dimensions });
        }
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
    const home = await page.$eval('.kee-dedicated-identity', anchor => anchor.href);
    assert(['/index.html', '/zh.html'].includes(new URL(home).pathname));
    await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('.kee-dedicated-identity')]);
    assert.equal(page.url(), home);
    result.noJavaScriptNativeNavigation = true;
    await page.close();
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(output, 'smoke.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ coverage: result.static.length, scenarios: result.scenarios.map(s => ({ name: s.name, pass: s.pass, errors: s.errors, mobileWidth: s.mobile.documentWidth })), templateHashes: result.templateHashes.length, noJavaScriptNativeNavigation: result.noJavaScriptNativeNavigation }, null, 2));
  assert(result.scenarios.every(s=>s.pass), 'One or more runtime scenarios had errors; see smoke.json');
}
module.exports = { assertSourcePreservation, normalizeReleaseShell, finalizedLinks, assertArenaFrames };
if (require.main === module) main().catch(e=>{console.error(e);process.exitCode=1;});
