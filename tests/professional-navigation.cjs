'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const camera = require('../scripts/integrate-camera4d.cjs');
const {sections} = require('../scripts/professional-navigation.cjs');
const {assertSourcePreservation} = require('./dedicated-smoke.cjs');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797/';
const output = process.env.SITE_ARTIFACT_DIR;
assert(output || process.argv.includes('--source-only'), 'Set SITE_ARTIFACT_DIR to an evidence directory');
const routes = [...camera.files, 'animation/index.en.html', 'workshops/webiq-azure/live-demo.en.html', 'workshops/data-lab/live-demo.en.html', 'workshops/benchmarks/ai-infra-architect-workbench.html', 'workshops/agentic-commerce/stripe-collison-7-trends.en.html', 'animation/demos/rocket-launch/index.html'];
const report = {sourcePreservation: [], layouts: [], navigation: [], engines: [], scope:'Perimeter and original engine interaction checks only; no model benchmark re-evaluation.'};
async function navigate(page, url) { const response = await page.goto(new URL(url,base).href,{waitUntil:'load',timeout:60000}); assert.equal(response.status(),200,url); await page.waitForFunction(() => [...document.querySelectorAll('link[rel="stylesheet"]')].every(link => link.sheet)); }
async function clickNative(page, selector, preserveHash = false) {
  const destination = new URL(await page.$eval(selector,a=>a.href));
  if(preserveHash) destination.hash = new URL(page.url()).hash;
  await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}),page.click(selector)]);
  const actual = new URL(page.url());
  assert.equal(actual.origin + actual.pathname + actual.hash, destination.origin + destination.pathname + destination.hash, selector);
  report.navigation.push({selector,target:page.url()});
}
async function assertHeaderTheme(page, light = false) {
  const state = await page.$eval('[data-professional-header]', header => ({ background:getComputedStyle(header).backgroundColor, glass:CSS.supports('backdrop-filter','blur(16px)')&&!matchMedia('(prefers-reduced-transparency: reduce)').matches }));
  assert.equal(state.background,light?(state.glass?'rgba(255, 255, 255, 0.94)':'rgb(255, 255, 255)'):(state.glass?'rgba(16, 26, 48, 0.9)':'rgb(16, 26, 48)'));
}
async function main() {
  if (output) fs.mkdirSync(output,{recursive:true});
  for (const file of camera.files) {
    const source = camera.sourceFor(file), {html,changes} = camera.generate(file,source);
    const live = fs.readFileSync(path.join(camera.root,file),'utf8');
    const preservation = assertSourcePreservation(file, live, html);
    let restored = html;
    for (const change of changes.toReversed()) restored=restored.replace(change.after,change.before);
    assert.equal(restored,source);
    assert.deepEqual(live.match(/<meta[^>]*Content-Security-Policy[^>]*>/gi), source.match(/<meta[^>]*Content-Security-Policy[^>]*>/gi), `${file}: original CSP changed`);
    report.sourcePreservation.push({file,preservation,preLocalizationSourceRestoration:true});
  }
  if (process.argv.includes('--source-only')) {
    console.log(`PASS: ${report.sourcePreservation.length} protected 4D sources; no browser checks run.`);
    return;
  }
  const locales = require('../scripts/finalize-site.cjs').localeRegistry();
  const browserRoutes = [...new Set(routes.flatMap(route => {
    const pair = locales.get(route);
    assert(pair, `${route}: missing published counterpart mapping`);
    assert.notEqual(pair.en, pair.zh, `${route}: query-only locale fallback is not a counterpart`);
    return [route, pair.en, pair.zh];
  }))];
  const browser = await puppeteer.launch({headless:'shell',pipe:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
  try {
    for(const js of [true,false]) for(const route of browserRoutes) {
      const page=await browser.newPage(); await page.setCacheEnabled(false); await page.setJavaScriptEnabled(js);
      const errors=[]; page.on('pageerror',error=>errors.push(error.message));
      for(const width of [390,768,1440]) {
        await page.setViewport({width,height:1000}); await navigate(page,route+'?theme=dark');
        const state=await page.evaluate(()=>{
          const header=document.querySelector('[data-professional-header]'), primary=header.querySelector(':scope > .professional-primary');
          const controls=header.querySelector('.professional-controls'), context=document.querySelector('.professional-context-bar');
          const style=getComputedStyle(header), mobile=controls.querySelector('details.professional-mobile'), search=header.querySelector('form.site-search');
          return {lang:document.documentElement.lang,headers:document.querySelectorAll('[data-professional-header]').length,labels:[...primary.querySelectorAll('a')].map(a=>a.textContent),links:[...primary.querySelectorAll('a')].map(a=>new URL(a.href).pathname),active:primary.querySelectorAll('[aria-current=page]').length,identity:header.querySelector('.professional-identity').textContent,language:controls.textContent,editions:[...controls.querySelectorAll('a[hreflang]')].map(a=>({lang:a.hreflang,path:new URL(a.href).pathname,query:new URL(a.href).search})),context:!!context,contextOutside:context&&!header.contains(context),contextTop:context?.getBoundingClientRect().top,headerBottom:header.getBoundingClientRect().bottom,visibleInternalContext:[...header.querySelectorAll('.professional-context')].some(el=>el.getClientRects().length>0),documentWidth:document.documentElement.scrollWidth,bodyOverflow:getComputedStyle(document.body).overflow,background:style.backgroundColor,position:style.position,top:style.top,backdrop:style.backdropFilter,glass:CSS.supports('backdrop-filter','blur(16px)')&&!matchMedia('(prefers-reduced-transparency: reduce)').matches,desktopVisible:primary.getClientRects().length>0,mobileVisible:!!mobile&&mobile.getClientRects().length>0,mobileClosed:!!mobile&&!mobile.open,mobileLabels:mobile?[...mobile.querySelectorAll('a')].map(a=>a.textContent):[],search:search?{role:search.getAttribute('role'),action:new URL(search.action).pathname,method:search.method,name:search.querySelector('input[type=search]')?.name,label:!!search.querySelector('label[for="site-search-input"]'),inputs:document.querySelectorAll('#site-search-input').length}:null,scrolling:[header,...header.querySelectorAll('*')].filter(el=>el.getClientRects().length>0&&((el.scrollWidth>el.clientWidth+2&&/auto|scroll/.test(getComputedStyle(el).overflowX))||(el.scrollHeight>el.clientHeight+2&&/auto|scroll/.test(getComputedStyle(el).overflowY)))).length};
        });
        assert.equal(state.headers,1,route); assert.equal(state.active,1,route); assert.equal(state.identity,'Qi Chen · @turbo998');
        assert.deepEqual(state.labels,sections.map(section=>section[state.lang.startsWith('zh')?4:3]),route);
        assert.deepEqual(state.links,sections.map(section=>'/'+section[state.lang.startsWith('zh')?2:1]),route);
        assert(state.language.includes('EN')&&state.language.includes('中文'),route+': language controls');
        const pair=locales.get(route);
        assert.deepEqual(state.editions.sort((a,b)=>a.lang.localeCompare(b.lang)).map(({lang,path})=>({lang,path})), [{lang:'en',path:'/'+pair.en},{lang:'zh-CN',path:'/'+pair.zh}],route+': true counterpart controls');
        assert(state.editions.every(e=>e.query===''||e.query===`?lang=${e.lang}`),route+': counterpart query must be empty or canonical lang');
        assert(state.context&&state.contextOutside&&!state.visibleInternalContext&&state.contextTop>=state.headerBottom-1,route+': context must be outside sticky header');
        assert.equal(state.documentWidth,width,route+': document overflow'); assert.equal(state.scrolling,0,route+': header scroll');
        assert.notEqual(state.bodyOverflow,'hidden',route);
        assert.equal(state.position,'sticky',route); assert.equal(state.top,'0px',route);
        assert.equal(state.background,state.glass?'rgba(16, 26, 48, 0.9)':'rgb(16, 26, 48)',route);
        if(state.glass) assert.equal(state.backdrop,'blur(16px)',route+': glass backdrop');
        assert.equal(state.desktopVisible,width>700,route+': desktop primary breakpoint');
        assert.equal(state.mobileVisible,width<=700,route+': mobile details breakpoint');
        assert(state.mobileClosed,route+': menu should start collapsed');
        assert.deepEqual(state.mobileLabels,state.labels,route+': mobile primary parity');
        assert.deepEqual(state.search,{role:'search',action:`/studio/${state.lang.startsWith('zh')?'zh-':''}archive.html`,method:'get',name:'q',label:true,inputs:1},route+': global search and native fallback');
        if(width<=700) {
          await page.focus('.professional-mobile summary'); await page.keyboard.press('Enter');
          assert(await page.$eval('.professional-mobile',details=>details.open),route+': keyboard must open native mobile menu');
          assert.equal(await page.$$eval('.professional-mobile .professional-primary a',links=>links.filter(a=>a.getClientRects().length>0).length),sections.length);
          await page.focus('.professional-mobile summary'); await page.keyboard.press('Enter');
          assert(await page.$eval('.professional-mobile',details=>!details.open));
        }
        const sticky=await page.evaluate(()=>{window.scrollTo(0,Math.min(300,document.documentElement.scrollHeight-innerHeight));return {scroll:scrollY,top:document.querySelector('[data-professional-header]').getBoundingClientRect().top};});
        if(sticky.scroll>0) assert(Math.abs(sticky.top)<=1,`${route}: header did not remain pinned after scrolling`);
        await page.evaluate(()=>window.scrollTo(0,0));
        report.layouts.push({route,js,width,...state,sticky});
        if(route.includes('camera-4d-director')&&width!==768) await page.screenshot({path:path.join(output,route.replaceAll('/','-')+`-${width}-${js?'js':'nojs'}.png`)});
      }
      assert.deepEqual(errors,[],route);
      if(!js && route===routes[0]) {
        for(const selector of ['[data-professional-header] > .professional-primary a[data-section="benchmarks"]','.professional-controls a[hreflang="en"]','.professional-context-bar a']) { await navigate(page,route); await clickNative(page,selector); }
        await page.setViewport({width:390,height:844}); await navigate(page,route);
        await page.focus('.professional-mobile summary'); await page.keyboard.press('Enter');
        await clickNative(page,'.professional-mobile a[data-section="benchmarks"]');
        await navigate(page,route); await page.type('#site-search-input','Pelican');
        const action=await page.$eval('.site-search',form=>form.action);
        await Promise.all([page.waitForNavigation({waitUntil:'load'}),page.click('.site-search button[type="submit"]')]);
        assert.equal(new URL(page.url()).pathname,new URL(action).pathname);
        assert.equal(new URL(page.url()).searchParams.get('q'),'Pelican');
        report.navigation.push({route,action,query:'Pelican',javaScript:false,nativeSearch:true});
      }
      if(js && route===routes[0]) {
        await navigate(page,route); await page.keyboard.press('/');
        assert(await page.$eval('#site-search-input',input=>input===document.activeElement));
        await page.type('#site-search-input','Pelican');
        await page.waitForFunction(()=>document.querySelectorAll('.search-results a').length>0);
        assert(await page.$eval('.search-results',results=>!results.hidden));
        await page.keyboard.press('Escape');
        assert(await page.$eval('.search-results',results=>results.hidden));
        await navigate(page,route+'#stage-canvas');
        await clickNative(page,'.professional-controls a[hreflang="en"]',true);
        assert.equal(await page.$eval('html',html=>html.lang),'en');
        assert.equal(new URL(page.url()).hash,'#stage-canvas');
      }
      await page.close();
    }
    for(const route of ['animation/research/controllable-4d-video-camera-study.en.html','animation/demos/camera-4d-director/index.html']) {
      const page=await browser.newPage(); await page.setCacheEnabled(false); await navigate(page,route+'?theme=dark');
      await page.evaluate(()=>{localStorage.setItem('reading-theme','light');localStorage.removeItem('kee-aurora-theme-v1');});
      await navigate(page,route);
      await assertHeaderTheme(page);
      await clickNative(page,'[data-reading-theme="light"]');
      await assertHeaderTheme(page,true);
      await navigate(page,route); assert.equal(await page.evaluate(()=>localStorage.getItem('kee-aurora-theme-v1')),'light');
      await clickNative(page,'[data-reading-theme="dark"]');
      if(route.includes('/research/')) await clickNative(page,'.professional-controls a[hreflang="zh-CN"]');
      await page.close();
    }
    for(const route of browserRoutes.filter(file=>/camera-4d-director\/index(?:\.en)?\.html$/.test(file))) {
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
  console.log(`PASS: ${report.sourcePreservation.length} protected 4D sources; ${report.layouts.length} sticky/search/mobile layouts (390/768/1440, JS/no-JS); ${report.navigation.length} native navigations; ${report.engines.length} original 4D engines.`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
