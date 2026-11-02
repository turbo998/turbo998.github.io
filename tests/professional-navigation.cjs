'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const camera = require('../scripts/integrate-camera4d.cjs');
const {sections} = require('../scripts/professional-navigation.cjs');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797/';
const output = process.env.SITE_ARTIFACT_DIR;
assert(output, 'Set SITE_ARTIFACT_DIR to an external evidence directory');
const routes = [...camera.files, 'animation/index.en.html', 'workshops/webiq-azure/live-demo.en.html', 'workshops/data-lab/live-demo.en.html', 'workshops/benchmarks/ai-infra-architect-workbench.html', 'workshops/agentic-commerce/stripe-collison-7-trends.en.html', 'animation/demos/rocket-launch/index.html'];
const report = {sourcePreservation: [], layouts: [], navigation: [], engines: [], scope:'Perimeter and original engine interaction checks only; no model benchmark re-evaluation.'};
async function navigate(page, url) { const response = await page.goto(new URL(url,base).href,{waitUntil:'load',timeout:60000}); assert.equal(response.status(),200,url); await page.waitForFunction(() => [...document.querySelectorAll('link[rel="stylesheet"]')].every(link => link.sheet)); }
async function clickNative(page, selector) {
  const target = await page.$eval(selector,a=>a.href);
  await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}),page.click(selector)]);
  assert.equal(page.url(),target,selector);
  report.navigation.push({selector,target});
}
async function main() {
  fs.mkdirSync(output,{recursive:true});
  for (const file of camera.files) {
    const source = camera.sourceFor(file), {html,changes} = camera.generate(file,source);
    assert.equal(fs.readFileSync(path.join(camera.root,file),'utf8'),html);
    let restored = html;
    for (const change of changes.toReversed()) restored=restored.replace(change.after,change.before);
    assert.equal(restored,source);
    report.sourcePreservation.push({file,exactSourceRestoration:true});
  }
  const browser = await puppeteer.launch({headless:'shell',pipe:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
  try {
    for(const js of [true,false]) for(const route of routes) {
      const page=await browser.newPage(); await page.setCacheEnabled(false); await page.setJavaScriptEnabled(js);
      const errors=[]; page.on('pageerror',error=>errors.push(error.message));
      for(const width of [390,768,1440]) {
        await page.setViewport({width,height:1000}); await navigate(page,route+'?theme=dark');
        const state=await page.evaluate(()=>{
          const header=document.querySelector('[data-professional-header]'), primary=header.querySelector('.professional-primary');
          const controls=header.querySelector('.professional-controls'), context=header.querySelector('.professional-context')||document.querySelector('.commerce-source-context');
          return {lang:document.documentElement.lang,headers:document.querySelectorAll('[data-professional-header]').length,labels:[...primary.querySelectorAll('a')].map(a=>a.textContent),links:[...primary.querySelectorAll('a')].map(a=>new URL(a.href).pathname),active:primary.querySelectorAll('[aria-current=page]').length,identity:header.querySelector('.professional-identity').textContent,language:controls.textContent,context:!!context,contextTop:context?.getBoundingClientRect().top,primaryBottom:primary.getBoundingClientRect().bottom,documentWidth:document.documentElement.scrollWidth,bodyOverflow:getComputedStyle(document.body).overflow,background:getComputedStyle(header).backgroundColor,scrolling:[header,...header.querySelectorAll('*')].filter(el=>(el.scrollWidth>el.clientWidth+2&&/auto|scroll/.test(getComputedStyle(el).overflowX))||(el.scrollHeight>el.clientHeight+2&&/auto|scroll/.test(getComputedStyle(el).overflowY))).length};
        });
        assert.equal(state.headers,1,route); assert.equal(state.active,1,route); assert.equal(state.identity,'Qi Chen · @turbo998');
        assert.deepEqual(state.labels,sections.map(section=>section[state.lang.startsWith('zh')?4:3]),route);
        assert.deepEqual(state.links,sections.map(section=>'/'+section[state.lang.startsWith('zh')?2:1]),route);
        assert(state.language.includes('EN')&&state.language.includes('中文'),route+': language controls');
        assert(state.context&&state.contextTop>=state.primaryBottom,route+': separate context');
        assert.equal(state.documentWidth,width,route+': document overflow'); assert.equal(state.scrolling,0,route+': header scroll');
        assert.notEqual(state.bodyOverflow,'hidden',route); assert.equal(state.background,'rgb(16, 26, 48)',route);
        report.layouts.push({route,js,width,...state});
        if(route.includes('camera-4d-director')&&width!==768) await page.screenshot({path:path.join(output,route.replaceAll('/','-')+`-${width}-${js?'js':'nojs'}.png`)});
      }
      assert.deepEqual(errors,[],route);
      if(!js && route===routes[0]) {
        for(const selector of ['.professional-primary a[data-section="benchmarks"]','.professional-controls a[hreflang="en"]','.professional-context a']) { await navigate(page,route); await clickNative(page,selector); }
      }
      await page.close();
    }
    for(const route of ['animation/research/controllable-4d-video-camera-study.en.html','animation/demos/camera-4d-director/index.html']) {
      const page=await browser.newPage(); await page.setCacheEnabled(false); await navigate(page,route+'?theme=dark');
      await page.evaluate(()=>{localStorage.setItem('reading-theme','light');localStorage.removeItem('kee-aurora-theme-v1');});
      await navigate(page,route);
      assert.equal(await page.$eval('[data-professional-header]',el=>getComputedStyle(el).backgroundColor),'rgb(16, 26, 48)');
      await clickNative(page,'[data-reading-theme="light"]');
      assert.equal(await page.$eval('[data-professional-header]',el=>getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)');
      await navigate(page,route); assert.equal(await page.evaluate(()=>localStorage.getItem('kee-aurora-theme-v1')),'light');
      await clickNative(page,'[data-reading-theme="dark"]');
      if(route.includes('/research/')) await clickNative(page,'[data-reading-language]');
      await page.close();
    }
    for(const route of camera.files.filter(file=>file.endsWith('camera-4d-director/index.html'))) {
      const page=await browser.newPage(); await page.setCacheEnabled(false); await navigate(page,route);
      await page.waitForSelector('#stage-canvas');
      const before=await page.$eval('#btn-play',el=>el.textContent); await page.click('#btn-play');
      const after=await page.$eval('#btn-play',el=>el.textContent); assert.notEqual(after,before);
      const timeline=await page.$eval('#timeline-range',el=>{el.value=Number(el.max)*.45;el.dispatchEvent(new Event('input',{bubbles:true}));return el.value;});
      assert(Number(timeline)>0);
      await page.click('#btn-bullet'); await page.click('#btn-perturb-paths');
      const engine=await page.evaluate(()=>({time:document.querySelector('#time-readout').textContent,mode:document.querySelector('#hud-mode-id').textContent,canvasWidth:document.querySelector('#stage-canvas').width,canvasHeight:document.querySelector('#stage-canvas').height}));
      assert(engine.canvasWidth>0&&engine.canvasHeight>0); report.engines.push({route,before,after,timeline,...engine}); await page.close();
    }
  } finally {await browser.close(); fs.writeFileSync(path.join(output,'professional-navigation.json'),JSON.stringify(report,null,2));}
  console.log(`PASS: ${report.sourcePreservation.length} exact 4D restorations; ${report.layouts.length} layouts (390/768/1440, JS/no-JS); ${report.navigation.length} native navigations; ${report.engines.length} original 4D engines.`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
