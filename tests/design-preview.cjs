const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const root = path.resolve(__dirname, '..');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.PREVIEW_ARTIFACT_DIR || path.join(root, 'design-preview-artifacts');
const pairs = [['index','index.html'],['zh-index','zh.html'],['studio','studio/index.html'],['zh-studio','studio/zh-index.html'],['infra','studio/infra.html'],['zh-infra','studio/zh-infra.html']];
const report = {result:'RUNNING',scope:'Generated preview parity and layouts; production-site.cjs verifies shared interaction behavior',states:[],nojs:[],errors:[]};
fs.mkdirSync(output,{recursive:true});
async function snapshot(page) {
  return page.evaluate(()=>({title:document.title,lang:document.documentElement.lang,theme:document.documentElement.dataset.theme,width:document.documentElement.scrollWidth,text:document.querySelector('main').innerText,primary:[...document.querySelectorAll('.desktop-nav>a')].map(a=>a.textContent),cards:document.querySelectorAll('.wb-card').length,columns:getComputedStyle(document.querySelector('.card-grid')).gridTemplateColumns.split(' ').length,frames:document.querySelectorAll('iframe,object,embed').length,inner:[...document.querySelectorAll('main *')].filter(e=>e.checkVisibility({checkVisibilityCSS:true})&&e.scrollHeight>e.clientHeight+2&&/auto|scroll/.test(getComputedStyle(e).overflowY)).map(e=>e.tagName),links:[...document.querySelectorAll('a[href]')].map(a=>a.href)}));
}
async function main() {
  const browser=await puppeteer.launch({headless:'shell',pipe:true});
  try {
    for(const [source,target] of [['editorial.css','site.css'],['editorial.js','site.js'],['theme-init.js','theme-init.js']]) assert.equal(fs.readFileSync(path.join(root,'design-preview',source),'utf8'),fs.readFileSync(path.join(root,'assets/editorial',target),'utf8'));
    const page=await browser.newPage();
    page.on('pageerror',e=>report.errors.push(e.message));
    for(const [file,production] of pairs) {
      for(const theme of ['dark','light']) for(const width of [390,768,1440]) {
        await page.setViewport({width,height:900});
        await page.goto(`${base}/${production}?theme=${theme}`,{waitUntil:'networkidle0'});
        const expected=await snapshot(page);
        const response=await page.goto(`${base}/design-preview/${file}.html?theme=${theme}`,{waitUntil:'networkidle0'});
        assert.equal(response.status(),200);
        const actual=await snapshot(page);
        for(const key of ['title','lang','theme','text','primary','cards','columns']) assert.deepEqual(actual[key],expected[key],`${file}: ${key} parity`);
        assert.equal(actual.width,width); assert.equal(actual.frames,0); assert.deepEqual(actual.inner,[]);
        for(const href of actual.links) {if(typeof href!=='string')continue;const url=new URL(href);if(url.origin===new URL(base).origin)assert.ok(fs.existsSync(path.join(root,decodeURIComponent(url.pathname))),href);}
        const screenshot=`${file}-${theme}-${width}.png`;
        await page.screenshot({path:path.join(output,screenshot),fullPage:true});
        delete actual.text; delete actual.links;
        report.states.push({file,width,theme,...actual,screenshot});
      }
      await page.setViewport({width:390,height:844});
      await page.setJavaScriptEnabled(false);
      await page.goto(`${base}/design-preview/${file}.html`,{waitUntil:'domcontentloaded'});
      const state=await snapshot(page);
      assert.equal(state.theme,'dark'); assert.equal(state.width,390); assert.ok(state.cards>0);
      await page.click('.mobile-menu summary');
      assert.equal(await page.$eval('.mobile-menu',e=>e.open),true);
      report.nojs.push({file,cards:state.cards,defaultTheme:state.theme});
      await page.setJavaScriptEnabled(true);
    }
    await page.goto(`${base}/design-preview/infra.html?theme=light#demos`,{waitUntil:'networkidle0'});
    await Promise.all([page.waitForNavigation(),page.click('.language-link')]);
    const url=new URL(page.url()); assert.equal(url.pathname,'/design-preview/zh-infra.html'); assert.equal(url.hash,'#demos'); assert.equal(url.searchParams.get('theme'),'light');
    assert.deepEqual(report.errors,[]);report.result='PASS';
    console.log(`PASS: ${report.states.length} production-parity preview states, ${report.nojs.length} no-JS previews and language/hash/theme navigation.`);
  }catch(error){report.result='FAIL';report.errors.push(error.stack);throw error;}
  finally{fs.writeFileSync(path.join(output,'validation.json'),JSON.stringify(report,null,2));await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
