const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const root = path.resolve(__dirname, '..');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.PREVIEW_ARTIFACT_DIR || path.join(root, 'design-preview-artifacts');
const files = ['index', 'studio', 'infra'].flatMap(name => [name, 'zh-' + name]);
const report = { base, scope: 'R3 preview only; not legacy/demo end-to-end acceptance', states: [], checks: [], errors: [] };
fs.mkdirSync(output, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({ headless: 'shell', pipe: true, protocolTimeout: 30000 });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    const errors = [];
    const requests = new Set();
    page.on('pageerror', err => errors.push(err.message));
    page.on('requestfailed', req => errors.push(`${req.url()}: ${req.failure().errorText}`));
    page.on('request', req => requests.add(req.url()));
    const allLinks = new Set();
    for (const file of files) {
      for (const theme of ['light', 'dark']) {
        for (const width of [390, 768, 1440]) {
          const name = `${file}-${theme}-${width}`;
          await page.setViewport({ width, height: width === 390 ? 844 : 1000 });
          const response = await page.goto(`${base}/design-preview/${file}.html?theme=${theme}`, { waitUntil: 'networkidle0' });
          assert.equal(response.status(), 200, name);
          await page.evaluate(async () => {
            await Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode(); }));
          });
          const state = await page.evaluate(() => {
            const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
            const visible = el => el.checkVisibility({ checkVisibilityCSS: true });
            const scrollContainers = [...document.querySelectorAll('body *')].filter(el => {
              const s = getComputedStyle(el);
              return visible(el) && el.scrollHeight > el.clientHeight + 2 && /auto|scroll/.test(s.overflowY);
            }).map(el => `${el.tagName}.${el.className}`);
            const overflow = [...document.querySelectorAll('body *')].filter(el => {
              if (!visible(el) || el.classList.contains('skip-link')) return false;
              const r = el.getBoundingClientRect();
              return r.right > innerWidth + 1 || r.left < -1;
            }).map(el => `${el.tagName}.${el.className}`);
            return {
              title: document.title, lang: document.documentElement.lang, theme: document.documentElement.dataset.theme,
              width: innerWidth, documentWidth: document.documentElement.scrollWidth,
              documentHeight: document.documentElement.scrollHeight,
              headerHeight: document.querySelector('header').getBoundingClientRect().height,
              duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
              nested: document.querySelectorAll('iframe,object,embed').length,
              scrollContainers, overflow,
              imagesOk: [...document.images].every(img => img.complete && img.naturalWidth > 0),
              h1: document.querySelectorAll('h1').length,
              bodyScroll: getComputedStyle(document.body).overflowY,
              links: [...document.querySelectorAll('a')].map(a => a.href),
              untranslated: document.documentElement.lang === 'en' ? [...document.querySelectorAll('main *')].filter(e => !e.children.length && /[\u4e00-\u9fff]/.test(e.textContent)).map(e => e.textContent) : []
            };
          });
          assert.equal(state.lang, file.startsWith('zh-') ? 'zh-CN' : 'en', name);
          assert.equal(state.theme, theme, name);
          assert.equal(state.h1, 1, name);
          assert.equal(state.nested, 0, name);
          assert.equal(state.documentWidth, width, name);
          assert.ok(state.headerHeight <= (width === 390 ? 65 : 73), name);
          assert.ok(state.imagesOk, `${name}: broken image`);
          assert.ok(!['hidden', 'clip'].includes(state.bodyScroll), `${name}: locked body`);
          for (const key of ['duplicateIds', 'scrollContainers', 'overflow', 'untranslated']) assert.deepEqual(state[key], [], `${name}: ${key}`);
          state.links.forEach(url => allLinks.add(url));
          await page.screenshot({ path: path.join(output, name + '.png'), fullPage: true });
          await page.mouse.move(width / 2, 500);
          await page.mouse.wheel({ deltaY: 550 });
          await new Promise(resolve => setTimeout(resolve, 100));
          assert.ok(await page.evaluate(() => document.scrollingElement.scrollTop > 0), name + ': wheel must scroll document');
          delete state.links;
          report.states.push({ name, screenshot: name + '.png', ...state });
        }
      }
    }
    // Validate native href targets without loading expensive legacy demos or contacting external services.
    for (const href of allLinks) {
      const url = new URL(href);
      if (url.origin !== new URL(base).origin) continue;
      const target = path.join(root, decodeURIComponent(url.pathname));
      assert.ok(fs.existsSync(target), `Missing native link: ${href}`);
      if (url.pathname.includes('/design-preview/') && url.hash) {
        assert.ok(fs.readFileSync(target, 'utf8').includes(`id="${url.hash.slice(1)}"`), `Missing anchor: ${href}`);
      }
    }
    assert.deepEqual([...requests].filter(url => !url.startsWith(base) && !url.startsWith('data:')), [], 'Preview must not request external resources or heavy demo runtimes');
    assert.ok([...requests].every(url => !/\/workshops\/|\/voice\/|\/game\/|\/animation\//.test(url)), 'No demo preloading');
    assert.deepEqual(errors, []);
    report.checks.push('36 complete visual states; native hrefs and anchors; document-only wheel scrolling; no remote assets or demo preloads; no console/network errors');

    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${base}/design-preview/zh-infra.html`, { waitUntil: 'networkidle0' });
    const client = await page.createCDPSession();
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 190, y: 700 }] });
    for (const y of [620, 520, 420, 320, 220]) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 190, y }] });
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    assert.ok(await page.evaluate(() => document.scrollingElement.scrollTop > 0), 'Touch must scroll document');
    report.checks.push('Real touch swipe scrolls the document');

    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${base}/design-preview/zh-infra.html?theme=light#demos`, { waitUntil: 'networkidle0' });
    await page.click('.theme-toggle');
    assert.equal(await page.$eval('html', el => el.dataset.theme), 'dark');
    await page.reload({ waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('html', el => el.dataset.theme), 'dark');
    await Promise.all([page.waitForNavigation(), page.click('.language-link')]);
    assert.ok(page.url().includes('/infra.html?theme=dark#demos'));
    assert.equal(await page.$eval('html', el => el.lang), 'en');
    await page.goBack();
    assert.equal(await page.$eval('html', el => el.lang), 'zh-CN');
    await page.goForward();
    assert.equal(await page.$eval('html', el => el.lang), 'en');
    await page.goto(`${base}/design-preview/infra.html?lang=zh-CN&theme=light#resources`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.documentElement.lang === 'zh-CN');
    assert.equal(new URL(page.url()).hash, '#resources');
    assert.equal(await page.$eval('html', el => el.dataset.theme), 'light');
    report.checks.push('Theme persistence/reload; language preserves resource + anchor + theme; history back/forward; lang query redirect');

    await page.goto(`${base}/design-preview/index.html?style=precision`, { waitUntil: 'networkidle0' });
    assert.equal(await page.$('.style-switcher'), null);
    await page.focus('.mobile-menu summary');
    await page.keyboard.press('Enter');
    assert.ok(await page.$eval('.mobile-menu', el => el.open));
    await page.keyboard.press('Tab');
    assert.ok(await page.evaluate(() => document.activeElement.closest('.mobile-menu nav') !== null));
    await page.keyboard.press('Escape');
    assert.ok(await page.$eval('.mobile-menu', el => !el.open));
    assert.ok(await page.evaluate(() => document.activeElement.matches('summary')));
    await page.focus('.skip-link');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
    const focusOutline = await page.$eval('.language-link', el => { el.focus(); return getComputedStyle(el).outlineStyle; });
    assert.notEqual(focusOutline, 'none');
    report.checks.push('Keyboard menu Enter/Tab/Escape and focus return; skip link; visible focus; obsolete style param ignored');

    const nojs = await browser.newPage();
    await nojs.setJavaScriptEnabled(false);
    await nojs.setViewport({ width: 390, height: 844 });
    for (const file of files) {
      await nojs.goto(`${base}/design-preview/${file}.html`, { waitUntil: 'networkidle0' });
      assert.ok(await nojs.$eval('main', el => el.textContent.trim().length > 200 && el.querySelectorAll('h1').length === 1 && el.querySelectorAll('section').length >= 3), `${file}: static content missing`);
      assert.ok(await nojs.$eval('.theme-toggle', el => getComputedStyle(el).display === 'none'));
      await nojs.click('.mobile-menu summary');
      assert.ok(await nojs.$eval('.mobile-menu', el => el.open));
      const count = await nojs.$$eval('main a[href]', nodes => nodes.length);
      assert.ok(count >= 7, `${file}: missing native links`);
      await nojs.screenshot({ path: path.join(output, `${file}-nojs-390.png`), fullPage: true });
    }
    await nojs.goto(`${base}/design-preview/zh-index.html`);
    await Promise.all([nojs.waitForNavigation(), nojs.click('.home-hero .primary')]);
    assert.ok(nojs.url().endsWith('/zh-studio.html'));
    await Promise.all([nojs.waitForNavigation(), nojs.click('.featured-track h2 a')]);
    assert.ok(nojs.url().endsWith('/zh-infra.html'));
    await Promise.all([nojs.waitForNavigation(), nojs.click('.language-link')]);
    assert.ok(nojs.url().endsWith('/infra.html'));
    report.checks.push('Six pages retain content and mobile navigation without JS; home → Studio → topic → language works without JS');
    await nojs.close();

    const isolated = await browser.createBrowserContext();
    const fresh = await isolated.newPage();
    await fresh.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    await fresh.goto(`${base}/design-preview/index.html`);
    assert.equal(await fresh.$eval('html', el => el.dataset.theme), 'dark', 'First visit must default to Dark Aurora');
    for (const file of files) {
      await fresh.setViewport({ width: 320, height: 800 });
      await fresh.goto(`${base}/design-preview/${file}.html`);
      assert.ok(await fresh.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${file}: 320px reflow`);
    }
    await isolated.close();
    report.checks.push('Fresh visit defaults dark; all six pages reflow at 320 CSS px');
    report.nativeLinkCount = allLinks.size;
    report.result = 'PASS';
    console.log(`PASS: ${report.states.length} screenshot states, ${allLinks.size} unique links, ${report.checks.length} behavioral check groups.`);
  } catch (error) {
    report.result = 'FAIL';
    report.errors.push(error.stack);
    throw error;
  } finally {
    fs.writeFileSync(path.join(output, 'validation.json'), JSON.stringify(report, null, 2));
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
