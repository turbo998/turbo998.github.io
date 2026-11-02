'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const api = require('../scripts/integrate-phase179.cjs');
const {root,files,sourceFor,sourceBytes,originalRows,generate,validate,csp,scripts,hash,asset,sourceData}=api;
const numeric = value => value.replace(/^.*?[:：]\s*/,'').match(/-?\d[\d,.]*/g)||[];
function staticChecks() {
 validate();
 const original=sourceFor(files[0]);
 const sourceScript=scripts(original)[0];
 const structure=s=>s.replace(/"(?:\\.|[^"\\])*"/g,'"TEXT"');
 const rows=originalRows();
 assert.equal(rows.length,180,'Retain every actual source row rather than manufacture 547 records');
 const ledger=JSON.parse(fs.readFileSync(path.join(root,sourceData),'utf8'));
 assert.deepEqual(ledger.rows.map(r=>r.originalRowHtml),[...original.matchAll(/<tr data-cat="[^"]+">[\s\S]*?<\/tr>/g)].map(x=>x[0]));
 assert.deepEqual(fs.readFileSync(path.join(root,asset)),sourceBytes(asset),'Original summary SVG is untouched');
 for(const f of files){
  const html=generate(f),isReport=f===files[2]||f===files[3],en=f===files[1]||f===files[2];
  assert.ok(html.includes(`<html lang="${en?'en':'zh-CN'}">`));
  assert.ok(html.includes('viewBox="0 0 680 900"')&&html.includes('aria-labelledby="phase179-atlas-title phase179-atlas-desc"'));
  for(const l of ['L1','L2','L3','L4','L5','L6'])assert.ok(html.includes(`data-layer="${l}"`));
  assert.ok(html.includes('synthetic'));
  const languageLinks=[...html.matchAll(/<a href="([^"]+)" lang="[^"]+" hreflang="([^"]+)"/g)];
  assert.equal(languageLinks.length,2);
  assert.ok(languageLinks.every(x=>!x[1].includes('studio')&&x[1].includes('?lang=')));
  if(!isReport){
   assert.equal(structure(scripts(html).at(-1)),structure(sourceScript),'Calculator expressions, data and control flow unchanged');
   assert.equal((html.match(/class="phase179-takeaway"/g)||[]).length,rows.length);
   assert.ok(!html.includes('All Phases (76)'));
   for(const selector of ['presetSelect','gpuCount','capexPerGpu','itKwPerGpu','pue','ettr','rawEffPflops','tokPerSec','outTco','arScale','outSharpLat','kvCtx','outKvFp4','expTable']) assert.ok(html.includes(`id="${selector}"`),selector);
   assert.ok(en?html.includes('A kernel is bandwidth-bound'):html.includes('内核受显存带宽限制'));
  }else{
   const source=sourceFor(files[2]);
   assert.equal(scripts(html).length,0);
   assert.deepEqual(csp(html),csp(source));
   assert.deepEqual(html.match(/style="width:[^"]+"/g),source.match(/style="width:[^"]+"/g));
   assert.equal((html.match(/<section class="card">/g)||[]).length,7);
   assert.ok(!html.includes('<iframe'));
  }
 }
 assert.equal((1-(56+8*2)/(64*2))*100,43.75);
 assert.equal(11/16*100,68.75);
 assert.equal((1-4/25)*100,84);
 return {sourceRows:rows.length,originalSourceLedger:true,sourceFormulaParity:true,verifiedSourceArithmetic:[43.75,68.75,84]};
}
async function outputState(page) {
 return page.evaluate(()=>Object.fromEntries([...document.querySelectorAll('[id]')].filter(e=>e.id.startsWith('out')||e.id.endsWith('Val')).map(e=>[e.id,e.textContent])));
}
async function compareOutputs(page,baseline,label) {
 const a=await outputState(page),b=await outputState(baseline);
 assert.deepEqual(Object.keys(a),Object.keys(b));
 for(const key of Object.keys(a))assert.deepEqual(numeric(a[key]),numeric(b[key]),`${label}/${key}: numeric parity`);
}
async function interact(page,baseline,en) {
 await compareOutputs(page,baseline,'Initial source display');
 for(const preset of ['gen1','gen2','het','gen3']){
  for(const p of [page,baseline])await p.select('#presetSelect',preset);
  await compareOutputs(page,baseline,preset);
 }
 for(const id of ['gpuCount','capexPerGpu','itKwPerGpu','pue','ettr','rawEffPflops','tokPerSec']){
  for(const p of [page,baseline]){await p.focus('#'+id);await p.keyboard.press('Home');await p.keyboard.press('ArrowRight');}
  await compareOutputs(page,baseline,id);
 }
 for(const id of ['arScale','kvCtx']){
  for(const value of await page.$$eval(`#${id} option`,opts=>opts.map(x=>x.value))){
   for(const p of [page,baseline])await p.select('#'+id,value);
   await compareOutputs(page,baseline,id+'='+value);
  }
 }
 if(!en)for(const id of ['outOpex','outGpuHr','outRingCmp','outKvBf16'])assert.match((await outputState(page))[id],/[\u3400-\u9fff]/,'Localized runtime output');
 for(let i=1;i<=5;i++){
  for(const p of [page,baseline])await p.click(`.filter-btn:nth-child(${i})`);
  const visible=async p=>p.$$eval('#expTable tbody tr',rs=>rs.filter(r=>getComputedStyle(r).display!=='none').map(r=>r.getAttribute('data-cat')));
  assert.deepEqual(await visible(page),await visible(baseline),`Filter ${i} parity`);
 }
}
async function main() {
 const summary=staticChecks();
 if(process.argv.includes('--source-only')){console.log(JSON.stringify({result:'PASS',...summary},null,2));return;}
 const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/__phase179_baseline.html'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(sourceFor(files[0]));return;}
  const filename=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(!filename.startsWith(root+path.sep)||!fs.existsSync(filename)||!fs.statSync(filename).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',filename.endsWith('.json')?'application/json; charset=utf-8':'text/html; charset=utf-8');res.end(fs.readFileSync(filename));
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 let browser;
 const layouts=[],checks=[];
 try{
  browser=await require('puppeteer').launch({headless:'shell',pipe:true});
  const baseline=await browser.newPage();await baseline.goto(base+'/__phase179_baseline.html');
  for(const f of files){
   const page=await browser.newPage(),isReport=f===files[2]||f===files[3],en=f===files[1]||f===files[2];
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.evaluateOnNewDocument(()=>{window.cspErrors=[];document.addEventListener('securitypolicyviolation',e=>window.cspErrors.push(e.violatedDirective));});
   for(const width of [390,768,1440]){
    await page.setViewport({width,height:1000});await page.goto(base+'/'+f,{waitUntil:'load'});
    const state=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,diagram:document.querySelector('.phase179-atlas svg').getBoundingClientRect().toJSON(),background:getComputedStyle(document.body).backgroundColor,csp:window.cspErrors,prose:[...document.querySelectorAll('.phase179-takeaway')].every(e=>e.textContent.length>40)}));
    assert.equal(state.scroll,width,`${f}/${width}: no horizontal overflow`);assert.ok(state.diagram.width<=width&&state.diagram.height>200);assert.equal(state.background,'rgb(8, 13, 27)');assert.deepEqual(state.csp,[]);assert.ok(state.prose);
    const clippedLabels=await page.$$eval('.phase179-atlas svg text',labels=>labels.filter(e=>e.getBBox().x<40||e.getBBox().x+e.getBBox().width>610).map(e=>e.textContent));assert.deepEqual(clippedLabels,[],`${f}/${width}: atlas labels stay within shelves`);
    if(isReport){const dimensions=await page.$$eval('.card',cards=>cards.map(c=>[getComputedStyle(c).width,getComputedStyle(c).height,c.scrollHeight<=c.clientHeight+1]));assert.equal(dimensions.length,7);for(const d of dimensions){assert.deepEqual(d.slice(0,2),['900px','1125px']);assert.ok(d[2],`${f}: card internal overflow`);}}
    layouts.push({file:f,width,diagramWidth:state.diagram.width});
   }
   if(!isReport){await baseline.reload();await interact(page,baseline,en);checks.push(f+': initial, four presets, seven sliders, all network/KV values, five filters');}
   await page.setJavaScriptEnabled(false);await page.goto(base+'/'+f);
   const dest=en?(isReport?files[3]:files[0]):(isReport?files[2]:files[1]);
   await Promise.all([page.waitForNavigation(),page.click(`.phase179-nav a[hreflang="${en?'zh-CN':'en'}"]`)]);
   assert.ok(new URL(page.url()).pathname.endsWith(dest));assert.equal(await page.$eval('html',e=>e.lang),en?'zh-CN':'en');
   checks.push(f+': native no-JS language switch');
   if(!isReport){await page.setJavaScriptEnabled(true);for(const lang of ['en','zh-CN']){await page.goto(base+'/'+f+'?lang='+lang+'#catalog');await page.waitForFunction(l=>document.documentElement.lang===l,{},lang);assert.equal(new URL(page.url()).hash,'#catalog');assert.ok(new URL(page.url()).pathname.endsWith(lang==='en'?files[1]:files[0]));}checks.push(f+': query language bridge both directions preserves hash');}
   else {await page.goto(base+'/'+f+'?lang='+(en?'zh-CN':'en'));assert.equal(await page.$eval('html',e=>e.lang),en?'en':'zh-CN','Strict CSP: filename wins conflicting query');}
   assert.deepEqual(errors,[]);await page.close();
  }
  const enPage=await browser.newPage(),zhPage=await browser.newPage();await enPage.goto(base+'/'+files[2]);await zhPage.goto(base+'/'+files[3]);
  const metrics=async p=>p.$$eval('.card',cards=>cards.map(c=>({numbers:(c.textContent.match(/-?\d+(?:[.,]\d+)*/g)||[]).sort(),styles:[...c.querySelectorAll('[style]')].map(e=>e.getAttribute('style')),code:[...c.querySelectorAll('.code-dark')].map(e=>e.textContent)})));
  const sourcePage=await browser.newPage();await sourcePage.setContent(sourceFor(files[2]));
  assert.deepEqual(await metrics(enPage),await metrics(sourcePage),'English report exact source metrics/code/styles');
  assert.deepEqual(await metrics(zhPage),await metrics(sourcePage),'Chinese report exact source metrics/code/styles');
  const untranslated=await zhPage.$$eval('.card p,.card h1,.card h3,.card li,.card .footer-dark',es=>es.filter(e=>/[A-Za-z]{3}/.test(e.textContent)&&!/[\u3400-\u9fff]/.test(e.textContent)).map(e=>e.textContent));assert.deepEqual(untranslated,[],'Complete Chinese report prose');
  if(process.argv.includes('--screenshots')){
   const out=path.join(root,'.phase179-review');fs.mkdirSync(out,{recursive:true});
   for(const [i,f]of files.entries()){const p=await browser.newPage();await p.setViewport({width:390,height:1100});await p.goto(base+'/'+f);await p.screenshot({path:path.join(out,`page-${i}-390.png`)});await p.setViewport({width:1440,height:1100});await p.screenshot({path:path.join(out,`page-${i}-1440.png`)});await p.close();}
  }
  console.log(JSON.stringify({result:'PASS',...summary,layouts,checks,reportMetricCspCodeAndBarsParity:true,limitation:'A conflicting report ?lang is inert under the unchanged script-free CSP; native counterpart URLs fully localize the report.'},null,2));
 }finally{
  server.closeAllConnections();
  const closedServer=new Promise(resolve=>server.close(resolve));
  if(browser){
   const ownedProcess=browser.process();
   const timeout=setTimeout(()=>{if(ownedProcess&&ownedProcess.exitCode===null)ownedProcess.kill();},10000);
   try{await browser.close();}finally{clearTimeout(timeout);}
  }
  await closedServer;
 }
}
module.exports={main,staticChecks};
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1;});
