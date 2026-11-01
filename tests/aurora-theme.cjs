const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.SITE_ARTIFACT_DIR || path.join(__dirname, '..', 'site-test-artifacts');
const report = { result: 'RUNNING', layouts: [], contrast: [], behaviors: [], errors: [] };
const routes = ['index.html', 'zh.html', 'studio/index.html', 'studio/zh-index.html', 'studio/infra.html', 'studio/zh-infra.html'];
function luminance(hex) {
  const raw = hex.replace('#', '');
  const values = (raw.length === 3 ? [...raw].map(v => v + v).join('') : raw).match(/../g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
}
async function main() {
  fs.mkdirSync(output, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'shell', pipe: true });
  try {
    const page = await browser.newPage();
    page.on('pageerror', e => report.errors.push(e.message));
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.goto(base);
    await page.evaluate(() => { localStorage.clear(); localStorage.setItem('kee-editorial-theme', 'light'); });
    for (const route of routes) {
      for (const width of [390, 1440]) {
        await page.setViewport({ width, height: 960 });
        await page.goto(`${base}/${route}`, { waitUntil: 'networkidle0' });
        const state = await page.evaluate(() => ({ theme: document.documentElement.dataset.theme, background: getComputedStyle(document.body).backgroundColor, width: document.documentElement.scrollWidth, frames: document.querySelectorAll('iframe').length, internal: [...document.querySelectorAll('body *')].filter(e => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 2).map(e => e.tagName + '.' + e.className) }));
        assert.equal(state.theme, 'dark', 'Old automatic light preference must not override new default');
        assert.equal(state.background, 'rgb(8, 13, 27)');
        assert.equal(state.width, width, route);
        assert.equal(state.frames, 0);
        assert.deepEqual(state.internal, [], route);
        const screenshot = `aurora-${route.replaceAll('/', '-').replace('.html', '')}-${width}.png`;
        await page.screenshot({ path: path.join(output, screenshot), fullPage: true });
        report.layouts.push({ route, width, ...state, screenshot });
      }
    }
    for (const theme of ['dark', 'light']) {
      await page.goto(`${base}/?theme=${theme}`);
      const colors = await page.evaluate(() => Object.fromEntries(['bg', 'surface', 'soft', 'ink', 'muted', 'accent', 'secondary', 'warm', 'button', 'inverse'].map(key => [key, getComputedStyle(document.documentElement).getPropertyValue('--' + key).trim()])));
      const pairs = ['ink', 'muted', 'accent', 'secondary', 'warm'].flatMap(fg => ['bg', 'surface', 'soft'].map(bg => [fg, bg])).concat([['inverse', 'button'], ['inverse', 'secondary']]);
      for (const [fg, bg] of pairs) {
        const l = [luminance(colors[fg]), luminance(colors[bg])].sort((a,b)=>b-a);
        const ratio = (l[0] + .05) / (l[1] + .05);
        report.contrast.push({ theme, foreground: fg, background: bg, ratio });
        assert.ok(ratio >= 4.5, `${theme}: ${fg}/${bg} contrast ${ratio}`);
      }
    }
    await page.goto(`${base}/studio/index.html`);
    assert.equal(await page.$eval('html', e => e.dataset.theme), 'light', 'Explicit new preference persists');
    await page.click('.theme-toggle');
    await page.reload();
    assert.equal(await page.$eval('html', e => e.dataset.theme), 'dark', 'Toggle preference persists');
    await page.setJavaScriptEnabled(false);
    await page.goto(`${base}/studio/infra.html`);
    assert.equal(await page.$eval('html', e => e.dataset.theme), 'dark');
    assert.equal(await page.$eval('body', e => getComputedStyle(e).backgroundColor), 'rgb(8, 13, 27)');
    await page.setJavaScriptEnabled(true);
    await page.goto(`${base}/design-preview/studio.html`);
    assert.equal(await page.$eval('html', e => e.dataset.theme), 'dark', 'Shared prototype shows new design');
    report.behaviors.push('Old auto-light storage ignored', 'Explicit v1 light persists', 'Theme toggle persists', 'No-JS dark default', 'Shared prototype dark default');
    assert.deepEqual(report.errors, []);
    report.result = 'PASS';
    console.log(`PASS: ${report.layouts.length} default-dark layouts, ${report.contrast.length} WCAG AA token pairs, ${report.behaviors.length} preference/preview behaviors. Decorative blends are not a full accessibility audit.`);
  } catch (e) { report.result = 'FAIL'; report.errors.push(e.stack); throw e; }
  finally { fs.writeFileSync(path.join(output, 'aurora-validation.json'), JSON.stringify(report, null, 2)); await browser.close(); }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
