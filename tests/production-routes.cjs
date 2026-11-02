const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const puppeteer = require('puppeteer');
const root = path.join(__dirname, '..');
const manifest = require('../docs/redesign/production-routes.json');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.SITE_ARTIFACT_DIR || path.join(root, 'site-test-artifacts');
const script = fs.readFileSync(path.join(root, 'assets/editorial/legacy-routes.js'), 'utf8');
const report = { result: 'RUNNING', redirects: [], pages: [], errors: [] };
function redirect(prefix, search, hash) {
  let result;
  vm.runInNewContext(script, { URL, URLSearchParams, document: { currentScript: { src: prefix + 'assets/editorial/legacy-routes.js' } }, location: { search, hash, replace: url => { result = url; } } });
  return result;
}
async function main() {
  fs.mkdirSync(output, { recursive: true });
  let browser;
  try {
    for (const prefix of ['https://example.test/', 'https://example.test/project/']) {
      for (const lang of ['en', 'zh-CN']) {
        const zh = lang === 'zh-CN';
        for (const [track, scenes] of Object.entries(manifest.scenes)) {
          for (const [id, destinations] of Object.entries(scenes)) {
            const hash = `#${track}/module/${id}`;
            const actual = new URL(redirect(prefix, `?lang=${lang}&theme=dark`, hash));
            const expected = new URL(destinations[zh ? 'zh' : 'en'].replace(/^\//, ''), prefix);
            assert.equal(actual.origin + actual.pathname, expected.origin + expected.pathname, hash);
            assert.equal(actual.hash, expected.hash, hash + ': preserve resource fragment');
            assert.equal(actual.searchParams.get('lang'), lang);
            assert.equal(actual.searchParams.get('theme'), 'dark');
            report.redirects.push({ prefix, lang, hash, target: actual.href });
          }
          for (const suffix of ['', '/module/unknown', ...[1,2,3,4].flatMap(n => [`/stage-${n}`, `/stage/${n}`])]) {
            const actual = new URL(redirect(prefix, `?lang=${lang}`, `#${track}${suffix}`));
            const canonicalTrack = track === 'infra-lab' ? 'data-infra' : track;
            assert.equal(actual.pathname, new URL(`studio/${zh ? 'zh-' : ''}${canonicalTrack}.html`, prefix).pathname);
            const stage = suffix.match(/stage[-/](\d)/)?.[1];
            assert.equal(actual.hash, stage ? '#' + ['architecture','evaluation','demos','resources'][Number(stage)-1] : '');
            report.redirects.push({ prefix, lang, hash: `#${track}${suffix}`, target: actual.href });
          }
          const canonicalTrack = track === 'infra-lab' ? 'data-infra' : track;
          assert.equal(new URL(redirect(prefix, `?track=${track}&lang=${lang}`, '')).pathname, new URL(`studio/${zh ? 'zh-' : ''}${canonicalTrack}.html`, prefix).pathname);
        }
        assert.equal(redirect(prefix, `?lang=${lang}`, '#unknown/stage-2'), undefined);
      }
    }
    browser = await puppeteer.launch({ headless: 'shell', pipe: true, protocolTimeout: 30000 });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    page.on('pageerror', error => report.errors.push(error.message));
    for (const file of manifest.portalPages) {
      for (const width of [390, 1440]) {
        await page.setViewport({ width, height: 900 });
        const response = await page.goto(`${base}/${file}`, { waitUntil: 'networkidle0' });
        assert.equal(response.status(), 200);
        const state = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          h1: document.querySelectorAll('h1').length,
          width: document.documentElement.scrollWidth,
          frames: document.querySelectorAll('iframe,object,embed').length,
          internalScroll: [...document.querySelectorAll('main *')].filter(e => e.checkVisibility({checkVisibilityCSS:true}) && e.scrollHeight > e.clientHeight + 2 && /auto|scroll/.test(getComputedStyle(e).overflowY)).map(e => e.tagName + '.' + e.className),
          links: [...document.querySelectorAll('a[href]')].map(e => e.href),
          sections: [...document.querySelectorAll('main section[id]')].map(e => e.id),
          scenes: [...document.querySelectorAll('[data-scene]')].map(e => e.dataset.scene),
          primaryCount: document.querySelectorAll('.desktop-nav > a').length,
          contextCount: document.querySelectorAll('.context-nav > a').length,
          oldRows: document.querySelectorAll('.track-row,.resource-row').length,
          cjk: [...document.querySelectorAll('main *')].filter(e=>!e.children.length && /[\u3400-\u9fff]/.test(e.textContent)).map(e=>e.textContent.trim()),
          stageCards: Object.fromEntries(['architecture','evaluation','demos','resources'].map(id=>[id,document.querySelectorAll(`section#${id} > .card-grid > .wb-card`).length]))
        }));
        assert.equal(state.width, width, file + ': overflow');
        assert.equal(state.h1, 1, file);
        assert.equal(state.frames, 0, file);
        assert.deepEqual(state.internalScroll, [], file);
        assert.equal(state.primaryCount,5,file+': primary navigation');
        assert.equal(state.contextCount,9,file+': contextual navigation');
        assert.equal(state.oldRows,0,file+': card layout replaces legacy rows');
        if(state.lang==='en' && !file.endsWith('archive.html')) assert.deepEqual(state.cjk,[],file+': English portal prose');
        for (const href of state.links) {
          if (typeof href !== 'string') continue;
          const url = new URL(href);
          if (url.origin !== new URL(base).origin) continue;
          const target = path.join(root, decodeURIComponent(url.pathname));
          assert.ok(fs.existsSync(target), `${file}: missing ${href}`);
          if (url.hash && /\.html$/.test(target) && !url.pathname.endsWith('/frontier-ai-studio.html')) {
            const fragment = decodeURIComponent(url.hash.slice(1));
            assert.ok(new RegExp(`\\bid=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}["']`).test(fs.readFileSync(target, 'utf8')), `${file}: missing fragment ${href}`);
          }
        }
        if (file.endsWith('archive.html')) {
          const inventory = require('../docs/redesign/route-inventory.json');
          const reading = require('../docs/redesign/reading-migration.json');
          const expectedPaths = [...inventory.content.map(p=>p.path), ...reading.records.map(r=>r.path), ...['index.html','index.en.html','live-demo.html','live-demo.en.html','compare.html','compare.en.html'].map(f=>'workshops/webiq-azure/'+f),...['workbench-cycle-377.html','benchmark-cards.en.html'].map(f=>'workshops/azure-agent-infra/'+f),...['index.html','live-demo.html','live-demo.en.html','benchmark-cards.html','benchmark-cards.en.html'].map(f=>'workshops/data-lab/'+f), 'github-radar.html','zh-github-radar.html','workshops/github-trending-radar/cards.html','workshops/github-trending-radar/cards.en.html'];
          expectedPaths.push('workshops/benchmarks/ai-infra-architect-workbench.html','workshops/benchmarks/ai-infra-phase179-benchmark-cards.html');
          expectedPaths.push('workshops/agentic-commerce/stripe-collison-7-trends.html','workshops/agentic-commerce/stripe-collison-7-trends.en.html');
          expectedPaths.push(...['animation','generative-visual-lab'].flatMap(d=>[`${d}/demos/camera-4d-director/index.html`,`${d}/demos/camera-4d-director/test-report-cards.html`,`${d}/research/controllable-4d-video-camera-study.html`,`${d}/research/controllable-4d-video-camera-study.en.html`]));
          const linkedPaths = new Set(state.links.filter(href=>typeof href==='string').map(href=>new URL(href).pathname));
          const registry=require('../scripts/finalize-site.cjs').localeRegistry();
          expectedPaths.push(...require('../docs/redesign/site-localization.json').records.map(row=>row.path));
          for (const original of expectedPaths) {const pair=registry.get(original);const target=pair?(state.lang==='en'?pair.en:pair.zh):original;assert.ok(linkedPaths.has('/'+target), `${file}: archive omits ${target}`);}
        }
        if (['index.html','zh.html','studio/benchmarks.html','studio/zh-benchmarks.html'].includes(file)) {
          const zh = file === 'zh.html' || file.includes('/zh-');
          assert.ok(state.links.includes(`${base}/${zh?'zh-':''}github-radar.html`), `${file}: concurrent Radar workbench must remain discoverable`);
          assert.ok(state.links.some(link => link === `${base}/workshops/github-trending-radar/cards${zh?'':'.en'}.html` || link === `${base}/workshops/github-trending-radar/cards.zh-CN.html`), `${file}: concurrent Radar report must remain discoverable`);
        }
        const track = path.basename(file, '.html').replace(/^zh-/, '');
        const zh = file.includes('/zh-');
        if (track === 'data-infra') for (const target of [`workshops/azure-agent-infra/workbench-cycle-377${zh?'':'.en'}.html`,`workshops/azure-agent-infra/benchmark-cards${zh?'.zh-CN':'.en'}.html`,`workshops/data-lab/index${zh?'':'.en'}.html`,`workshops/data-lab/benchmark-cards${zh?'.zh-CN':'.en'}.html`]) assert.ok(state.links.some(link=>new URL(link).pathname==='/'+target),file+': latest Infra/DataLab discovery '+target);
        if (track === 'commerce') assert.ok(state.links.includes(`${base}/workshops/webiq-azure/compare${zh?'':'.en'}.html`),file+': comparison discovery');
        if (track === 'voice') assert.ok(state.links.includes(`${base}/voice/index${zh?'':'.en'}.html#duplexGuardSimulatorCard`),file+': Stage 356 discovery');
        if (track === 'infra') for (const target of [`workshops/benchmarks/ai-infra-architect-workbench${zh?'':'.en'}.html`,`workshops/benchmarks/ai-infra-phase179-benchmark-cards${zh?'.zh':''}.html`]) assert.ok(state.links.some(link=>new URL(link).pathname==='/'+target),file+': Phase179 discovery '+target);
        if (track === 'commerce') assert.ok(state.links.includes(`${base}/workshops/agentic-commerce/stripe-collison-7-trends${zh?'':'.en'}.html`),file+': latest Commerce article discovery');
        if (manifest.scenes[track]) {
          assert.ok(['architecture','evaluation','demos','resources'].every(id => state.sections.includes(id)), file);
          const expectedScenes = Object.entries(manifest.scenes[track]).filter(([, entry]) => entry.track === track);
          assert.equal(state.scenes.length, expectedScenes.length, file);
          assert.ok(Object.values(state.stageCards).every(count=>count>0),file+': four populated card-grid stages');
          await page.screenshot({path:path.join(output,`${path.basename(file,'.html')}-topic-${width}.png`),fullPage:true});
        }
        delete state.links;
        report.pages.push({file, width, ...state});
      }
    }
    for (const [hash, expected] of [['#infra/stage/3','studio/infra.html#demos'],['#commerce/stage-2','studio/commerce.html#evaluation'],['#security','studio/security.html']]) {
      await page.goto(`${base}/frontier-ai-studio.html?lang=en${hash}`, {waitUntil:'networkidle0'});
      await page.waitForFunction(() => !location.pathname.endsWith('/frontier-ai-studio.html'));
      assert.equal(new URL(page.url()).pathname + new URL(page.url()).hash, '/' + expected);
    }
    await page.setJavaScriptEnabled(false);
    for (const file of manifest.portalPages) {
      await page.goto(`${base}/${file}`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.$$eval('main h1', els => els.length), 1, `${file}: no-JS heading`);
      assert.ok(await page.$$eval('main a[href]', els => els.length) >= 7, `${file}: no-JS native links`);
    }
    assert.deepEqual(report.errors, []);
    report.result = 'PASS';
    console.log(`PASS: ${report.redirects.length} route cases, ${report.pages.length} portal layout states, all portal no-JS checks.`);
  } catch (error) { report.result='FAIL'; report.errors.push(error.stack); throw error; }
  finally { fs.writeFileSync(path.join(output,'routes-validation.json'), JSON.stringify(report,null,2)); if(browser) await browser.close(); }
}
main().catch(error => {console.error(error);process.exitCode=1;});
