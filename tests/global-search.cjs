'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const puppeteer=require('puppeteer');
const root=path.resolve(__dirname,'..');
const output=process.env.SITE_ARTIFACT_DIR||path.resolve('site-test-artifacts');
(async()=>{
 fs.mkdirSync(output,{recursive:true});
 const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
  const ext=path.extname(file);
  const mime=ext==='.html'?'text/html; charset=utf-8':ext==='.css'?'text/css; charset=utf-8':ext==='.js'?'application/javascript; charset=utf-8':ext==='.json'?'application/json; charset=utf-8':ext==='.svg'?'image/svg+xml':'application/octet-stream';
  res.writeHead(200,{'Content-Type':mime,'Connection':'close'});res.end(fs.readFileSync(file));
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=process.env.SITE_TEST_URL||`http://127.0.0.1:${server.address().port}/`;
 const browser=await puppeteer.launch({headless:'shell',pipe:true});const report={layouts:[],search:[],sealed:[]};
 try{
  const page=await browser.newPage();
  for(const route of ['index.html','zh.html','studio/data-infra.html','about.html','workshops/benchmarks/ai-infra-architect-workbench.en.html','animation/demos/camera-4d-director/index.en.html'])for(const width of [390,768,1440]){
   await page.setViewport({width,height:900});await page.goto(new URL(route,base).href,{waitUntil:'load'});await page.evaluate(()=>scrollTo(0,600));
   const state=await page.evaluate(()=>{const h=document.querySelector('.site-header,[data-professional-header]');return {top:h.getBoundingClientRect().top,height:h.getBoundingClientRect().height,width:document.documentElement.scrollWidth,viewport:innerWidth,search:!!h.querySelector('input[type=search]'),padding:parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)};});
   assert.equal(state.top,0,route+' sticky');assert(state.height<180,route+' compact header');assert(state.width<=width+1,route+' overflow');assert(state.search,route+' search');assert(state.padding>=state.height,route+' anchor clearance');report.layouts.push({route,...state});
   if(width===390||width===1440)await page.screenshot({path:path.join(output,'navigation-'+route.replaceAll('/','-')+'-'+width+'.png')});
  }
  for(const route of ['index.html','studio/infra.html','animation/demos/camera-4d-director/index.en.html']){
   await page.goto(new URL(route,base).href,{waitUntil:'load'});await page.keyboard.press('/');assert.equal(await page.evaluate(()=>document.activeElement.id),'site-search-input');await page.keyboard.type('FlashMLA');await page.waitForSelector('.search-results a');
   await page.keyboard.press('ArrowDown');const href=await page.$eval('.search-results a[aria-selected=true]',a=>a.href);await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}),page.keyboard.press('Enter')]);assert.equal(page.url(),href);report.search.push({route,href});
  }
  await page.goto(new URL('zh.html',base).href,{waitUntil:'load'});await page.keyboard.down('Control');await page.keyboard.press('k');await page.keyboard.up('Control');await page.keyboard.type('Fabric');await page.waitForSelector('.search-results a');assert(await page.$$eval('.search-results a',links=>links.every(a=>!/(?:\.en\.html|\/about\.html)/.test(a.href))));await page.keyboard.press('Escape');assert(await page.$eval('.search-results',e=>e.hidden));
  await page.goto(new URL('studio/archive.html?q=FlashMLA',base).href,{waitUntil:'load'});assert((await page.$$eval('#search-matches li',es=>es.length))>0);
  await page.setJavaScriptEnabled(false);
  for(const route of ['animation/demos/camera-4d-director/test-report-cards.en.html','workshops/benchmarks/ai-infra-phase179-benchmark-cards.zh.html']){
   await page.goto(new URL(route,base).href,{waitUntil:'load'});const csp=await page.$eval('meta[http-equiv="Content-Security-Policy"]',e=>e.content);assert(csp.includes("default-src 'none'"));assert(csp.includes("style-src 'unsafe-inline'"));await page.type('.site-search input','Fabric IQ');await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}),page.click('.site-search button')]);assert.equal(new URL(page.url()).searchParams.get('q'),'Fabric IQ');assert(/\/studio\/(?:zh-)?archive\.html$/.test(new URL(page.url()).pathname));report.sealed.push({route,destination:page.url(),csp});
  }
 }finally{fs.writeFileSync(path.join(output,'global-search.json'),JSON.stringify(report,null,2));await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
 console.log(`PASS: ${report.layouts.length} sticky/search layouts, ${report.search.length} keyboard journeys, ${report.sealed.length} sealed native forms`);
})().catch(e=>{console.error(e);process.exitCode=1;});
