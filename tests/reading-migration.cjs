const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const assert=require('node:assert/strict');
const puppeteer=require('puppeteer');
const root=path.resolve(__dirname,'..');
const inventory=require('../docs/redesign/route-inventory.json');
const manifest=require('../docs/redesign/reading-migration.json');
const artifacts=process.env.READING_ARTIFACTS;
const base=process.env.READING_BASE_URL||'http://127.0.0.1:8797/';
if(artifacts)fs.mkdirSync(artifacts,{recursive:true});
(async()=>{
 const owned=inventory.content.filter(p=>['portal','topic','article'].includes(p.role)&&!['index.html','zh.html','frontier-ai-studio.html'].includes(p.path)).map(p=>p.path).sort();
 assert.deepEqual(manifest.records.filter(r=>!r.translation).map(r=>r.path).sort(),owned);
 assert.equal(manifest.records.filter(r=>r.translation).length,12);
 const browser=await puppeteer.launch({headless:'shell',pipe:true});
 const results=[],broken=[],errors=[],svgChecks=[];
 try{
 const page=await browser.newPage();
 await page.setRequestInterception(true);
 page.on('request',r=>{const u=new URL(r.url());if(u.origin===new URL(base).origin||['data:','blob:'].includes(u.protocol))r.continue();else r.abort();});
 assert.equal(manifest.translatedAssets.length,8);
 const infraEnglish=fs.readFileSync(path.join(root,'workshops/azure-agent-infra/index.en.html'),'utf8');
 const infraChinese=fs.readFileSync(path.join(root,'workshops/azure-agent-infra/index.html'),'utf8');
 assert(infraEnglish.includes('Open the reproducible Cycle #377 workbench'),'English Cycle #377 CTA retained and translated');
 assert(infraChinese.includes('打开 Cycle #377 可复现实验工作台'),'Chinese Cycle #377 CTA retained');
 for(const edition of [infraEnglish,infraChinese]) assert(edition.includes('workbench-cycle-377.html'),'latest workbench remains reachable');
 for(const asset of manifest.translatedAssets){
  const source=cp.execFileSync('git',['show',`${manifest.baseline}:${asset.source}`],{cwd:root}).toString('utf8');
  const output=fs.readFileSync(path.join(root,asset.path),'utf8');
  assert.equal(fs.readFileSync(path.join(root,asset.source),'utf8'),source,asset.source+' original immutable');
  const nontext=s=>s.replace(/(<text\b[^>]*>)[^<]*(<\/text>)/g,'$1$2');
  assert.equal(nontext(output),nontext(source),asset.path+' non-text bytes/geometry/style/data unchanged');
  assert(infraEnglish.includes(path.posix.basename(asset.path)),asset.path+' English reference');
  assert(!infraEnglish.includes(path.posix.basename(asset.source)),asset.source+' absent from English page');
  assert(infraChinese.includes(path.posix.basename(asset.source)),asset.source+' Chinese reference');
  assert(!infraChinese.includes(path.posix.basename(asset.path)),asset.path+' absent from Chinese page');
  const check=await page.evaluate(({source,output})=>{
   const parse=s=>new DOMParser().parseFromString(s,'image/svg+xml');const before=parse(source),after=parse(output);
   const old=[...before.querySelectorAll('text')],next=[...after.querySelectorAll('text')];
   const nums=s=>(s.match(/\d+(?:[.,]\d+)*(?:万|亿)?/g)||[]).map(n=>{const scale=n.endsWith('万')?10000:n.endsWith('亿')?100000000:1;const v=n.replace(/[,万亿]/g,'');return Number.isFinite(Number(v))?String(Number(v)*scale):v;});
   const missing=old.flatMap((n,i)=>{const available=nums(next[i]?.textContent||'');return nums(n.textContent).filter(v=>{const pos=available.indexOf(v);if(pos<0)return true;available.splice(pos,1);return false;}).map(v=>({label:i,value:v,source:n.textContent,translated:next[i]?.textContent}));});
   return{parseErrors:after.querySelectorAll('parsererror').length,labels:next.length,sourceLabels:old.length,remaining:[...after.querySelectorAll('text,title,desc')].filter(n=>/[\u4e00-\u9fff]/.test(n.textContent)).map(n=>n.textContent),missing};
  },{source,output});
  assert.equal(check.parseErrors,0,asset.path+' XML');assert.equal(check.labels,check.sourceLabels,asset.path+' label count');assert.deepEqual(check.remaining,[],asset.path+' all labels translated');assert.deepEqual(check.missing,[],asset.path+' numerical claims retained');
  await page.setViewport({width:1080,height:800});
  await page.goto(base+asset.path,{waitUntil:'load'});
  const geometry=await page.evaluate(source=>{
   const original=[...new DOMParser().parseFromString(source,'image/svg+xml').querySelectorAll('text')];
   const svg=document.querySelector('svg'),width=svg.viewBox.baseVal.width;
   const overflow=[...svg.querySelectorAll('text')].map((n,i)=>{const b=n.getBBox();return{label:i,text:n.textContent,left:b.x,right:b.x+b.width,unchanged:n.textContent===original[i].textContent};}).filter(b=>b.left<0||b.right>width+1);
   return{newOverflow:overflow.filter(b=>!b.unchanged),unchangedSourceOverflow:overflow.filter(b=>b.unchanged)};
  },source);
  assert.deepEqual(geometry.newOverflow,[],asset.path+' translated labels fit unchanged artboard');
  if(artifacts)await (await page.$('svg')).screenshot({path:path.join(artifacts,path.posix.basename(asset.path)+'.png')});
  svgChecks.push({path:asset.path,...check,...geometry});
 }
 for(const r of manifest.records){
  const source=cp.execFileSync('git',['show',`${r.sourceBaseline||manifest.baseline}:${r.translation?.sourcePath||r.path}`],{cwd:root,maxBuffer:20*1024*1024}).toString('utf8');
  const output=fs.readFileSync(path.join(root,r.path),'utf8');
  const check=await page.evaluate(({source,output})=>{
   const parse=s=>new DOMParser().parseFromString(s,'text/html');const old=parse(source),next=parse(output);
   old.querySelectorAll('script,style,.nav,.site-breadcrumb-bar,.style-link-pill,.lang-switch-group,.style-switcher,link').forEach(n=>n.remove());
   const norm=s=>s.replace(/\s+/g,' ').trim();
   const raw=old.querySelector('main>pre');
   const text=norm(next.querySelector('#reading-main').textContent);
   const missing=[...old.querySelectorAll('p,li,h1,h2,h3,h4,td,th,pre')].filter(n=>!n.closest('nav')&&norm(n.textContent).length>15&&!text.includes(norm(n.textContent))).map(n=>norm(n.textContent).slice(0,140));
   const nums=t=>[...new Set(t.match(/\d+(?:[.,]\d+)*/g)||[])];
   const sourceNumbers=nums(old.querySelector('main')?.textContent||'');const translatedNumbers=nums(next.querySelector('#reading-main').textContent+' '+[...next.querySelectorAll('#reading-main a[href]')].map(a=>a.getAttribute('href')).join(' '));
   return{headerLinks:[...next.querySelectorAll('.reading-header a[href]')].map(a=>a.getAttribute('href')),missing,numbersMissing:sourceNumbers.filter(n=>!translatedNumbers.includes(n)),sourceRetained:!raw||next.querySelector('.reading-source pre')?.textContent===raw.textContent,iframes:next.querySelectorAll('iframe').length,main:next.querySelectorAll('main').length,lang:next.documentElement.lang,links:[...next.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),scripts:[...next.querySelectorAll('script:not([src])')].filter(s=>!s.type||/javascript|module/.test(s.type)).map(s=>s.textContent)};
  },{source,output});
  assert.equal(check.main,1,r.path+' main landmark');assert.equal(check.iframes,0,r.path+' iframe');  assert(r.translation||check.sourceRetained,r.path+' original Markdown');assert.equal(check.lang,r.language.resolved);
    if(!r.translation&&check.missing.length)errors.push({path:r.path,type:'content-loss',missing:check.missing});
  if(r.translation?.method==='authored-complete-prose-translation'&&check.numbersMissing.length)errors.push({path:r.path,type:'translated-numeric-claim-loss',missing:check.numbersMissing});
  if(/^(?:zh-)?(?:ai-security|benchmarks|security-ai-landing-zone|writing)\.html$/.test(r.path)) assert.ok(check.headerLinks.includes(r.path.startsWith('zh-')?'zh-github-radar.html':'github-radar.html'),r.path+' retains concurrent Radar navigation');
  for(const js of check.scripts){try{new Function(js)}catch(e){errors.push({path:r.path,type:'syntax',error:e.message})}}
  for(const href of check.links){if(!href||/^(#|https?:|mailto:|tel:|data:|javascript:)/.test(href))continue;const u=new URL(href,'http://local/'+r.path);const file=path.join(root,decodeURIComponent(u.pathname));if(!fs.existsSync(file))broken.push({path:r.path,href});}
 }
 const sample=new Set(['about.html','articles/harness-engineering.en.html','animation/research/asset-taxonomy.en.html','voice/case-study.html','workshops/azure-agent-infra/index.html','workshops/azure-agent-infra/index.en.html','bilibili-explainers/index.en.html','workshops/ai-security/index.html']);
 for(const r of manifest.records){
  for(const width of [390,1440]){
   const runtimeErrors=[];const listener=e=>runtimeErrors.push(e.message);page.on('pageerror',listener);
   await page.setViewport({width,height:900});
   console.log(`Reading ${r.path} at ${width}px`);
   await page.goto(base+r.path+(width===390?'?theme=dark':'?theme=light'),{waitUntil:'load',timeout:30000});
   await new Promise(resolve=>setTimeout(resolve,100));
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+2,scrollWidth:document.documentElement.scrollWidth,width:innerWidth,theme:document.documentElement.dataset.theme,headerHeight:document.querySelector('.reading-header').getBoundingClientRect().height,text:document.querySelector('#reading-main').innerText.length,iframes:document.querySelectorAll('iframe').length,overflowNodes:[...document.querySelectorAll('#reading-main *')].filter(n=>{const r=n.getBoundingClientRect();return r.width>innerWidth&&r.right>innerWidth+2}).slice(0,5).map(n=>({tag:n.tagName,cls:n.className,id:n.id,width:n.getBoundingClientRect().width}))}));
   results.push({path:r.path,width,...state,runtimeErrors});
   page.off('pageerror',listener);
   if(artifacts&&sample.has(r.path))await page.screenshot({path:path.join(artifacts,r.path.replace(/[\/]/g,'-')+`-${width}.png`),fullPage:false});
  }
 }
 const remainingChinese=()=>page.evaluate(()=>{const w=document.createTreeWalker(document.querySelector('#reading-main'),NodeFilter.SHOW_TEXT),found=[];while(w.nextNode()){const n=w.currentNode;if(/[\u4e00-\u9fff]/.test(n.textContent)&&!n.parentElement.closest('script,style,.reading-source')&&n.parentElement.checkVisibility())found.push(n.textContent.trim());}return [...new Set(found)];});
 const languageResults=[];
 for(const r of manifest.records.filter(r=>r.translation)){
  await page.goto(base+r.path+'?theme=dark',{waitUntil:'load'});
  await new Promise(resolve=>setTimeout(resolve,50));
  const states=[{state:'initial',remaining:await remainingChinese()}];
  if(r.path==='bilibili-explainers/index.en.html')for(let i=0;i<6;i++){await page.evaluate(i=>selectEp(i),i);await new Promise(resolve=>setTimeout(resolve,20));states.push({state:'episode-'+i,remaining:await remainingChinese()});}
  if(r.path==='workshops/azure-agent-infra/index.en.html'){
   for(let i=0;i<4;i++){await page.evaluate(i=>selectLayer(i),i);await new Promise(resolve=>setTimeout(resolve,20));states.push({state:'layer-'+i,remaining:await remainingChinese()});}
   for(let i=0;i<8;i++){
    await page.evaluate(i=>showSvg(i),i);
    await page.waitForFunction(()=>{const img=document.getElementById('atlasImg');return img.complete&&img.naturalWidth>0;});
    const asset=manifest.translatedAssets[i];
    assert((await page.$eval('#atlasImg',n=>n.src)).endsWith(asset.path),'English runtime SVG '+i);
    states.push({state:'diagram-'+i,asset:asset.path,loaded:true,remaining:await remainingChinese()});
   }
   for(let i=0;i<128;i++){await page.evaluate(i=>{document.querySelectorAll('input[type="checkbox"]').forEach((n,j)=>n.checked=!!(i&(1<<j)));evalPropensity();},i);await new Promise(resolve=>setTimeout(resolve,5));const remaining=await remainingChinese();if(remaining.length)states.push({state:'assessment-'+i,remaining});}
  }
  if(r.path==='voice/index.en.html'){
   assert.match(await page.$eval('#duplexGuardSimulatorCard',n=>n.innerText),/Stage 356/,'latest Voice sandbox retained');
   for(const id of ['p705_epoch_abort','p705_backchannel_keep','p706_vadfree_hold','p706_persona_watermark']){
    await page.click(`[data-duplex-sim="${id}"]`);await new Promise(resolve=>setTimeout(resolve,20));
    assert.match(await page.$eval('#duplexSimOutput',n=>n.innerText),/remediation/,'Voice source-fixture verdict '+id);
    states.push({state:'voice-'+id,remaining:await remainingChinese()});
   }
  }
  if(r.path==='workshops/deepinfer-v41-economics/index.en.html'){
   await page.evaluate(()=>{setTier(2.0);document.querySelectorAll('input[type="range"]').forEach(n=>{n.value=n.max;n.dispatchEvent(new Event('input'));});});await new Promise(resolve=>setTimeout(resolve,30));states.push({state:'peak-slider-max',remaining:await remainingChinese()});
   await page.evaluate(()=>resetCalc());await new Promise(resolve=>setTimeout(resolve,30));states.push({state:'reset',remaining:await remainingChinese()});
  }
  languageResults.push({path:r.path,states});
  for(const s of states)if(s.remaining.length)errors.push({path:r.path,type:'untranslated-controlled-prose',...s});
 }
 const infra='workshops/azure-agent-infra/';
 await page.goto(base+infra+'index.html?theme=dark#layerList',{waitUntil:'load'});
 assert((await page.$eval('#reading-main',n=>n.innerText)).includes('计算与状态解耦'));
 assert.equal(await page.$eval('#langToggle',n=>n.checkVisibility()),false);
 await Promise.all([page.waitForNavigation({waitUntil:'load'}),page.click('.reading-header [data-reading-language]')]);
 assert.equal(new URL(page.url()).pathname,'/'+infra+'index.en.html');assert.equal(new URL(page.url()).hash,'#layerList');assert.equal(new URL(page.url()).searchParams.get('theme'),'dark');
 assert((await page.$eval('#reading-main',n=>n.innerText)).includes('Decoupled compute/state'));
 assert.equal(await page.$eval('html',n=>n.dataset.theme),'dark');assert.equal(await page.$eval('#langToggle',n=>n.checkVisibility()),false);
 assert((await page.$eval('.reading-context',n=>n.href)).includes('/studio/infra.html?theme=dark'));
 await page.goBack({waitUntil:'load'});assert((await page.$eval('#reading-main',n=>n.innerText)).includes('计算与状态解耦'));assert.equal(new URL(page.url()).hash,'#layerList');
 await page.goForward({waitUntil:'load'});assert((await page.$eval('#reading-main',n=>n.innerText)).includes('Decoupled compute/state'));
 await Promise.all([page.waitForNavigation({waitUntil:'load'}),page.click('.reading-header [data-reading-language]')]);assert((await page.$eval('.reading-context',n=>n.href)).includes('/studio/zh-infra.html?theme=dark'));assert.equal(new URL(page.url()).hash,'#layerList');
 const themeFile='workshops/azure-agent-infra/index.en.html';
 await page.evaluate(()=>{localStorage.removeItem('kee-aurora-theme-v1');localStorage.setItem('kee-editorial-theme','light');});
 await page.goto(base+themeFile,{waitUntil:'load'});
 assert.equal(await page.$eval('html',n=>n.dataset.theme),'dark','new default ignores legacy light preference');
 assert.equal(await page.$eval('body',n=>getComputedStyle(n).backgroundColor),'rgb(8, 13, 27)','Dark Aurora background');
 const contrast=await page.$eval('.reading-header [data-reading-language]',n=>({fg:getComputedStyle(n).color,bg:getComputedStyle(n).backgroundColor}));
 assert.deepEqual(contrast,{fg:'rgb(8, 13, 27)',bg:'rgb(86, 221, 205)'},'dark ink on light-accent header button');
 if(artifacts)await page.screenshot({path:path.join(artifacts,'infra-aurora-default-desktop.png'),fullPage:false});
 await page.goto(base+themeFile+'?theme=light#layerList',{waitUntil:'load'});
 assert.equal(await page.$eval('html',n=>n.dataset.theme),'light','explicit light URL');
 assert.equal(await page.evaluate(()=>localStorage.getItem('kee-aurora-theme-v1')),'light');
 await page.goto(base+themeFile,{waitUntil:'load'});assert.equal(await page.$eval('html',n=>n.dataset.theme),'light','new light preference persists');
 await page.goto(base+themeFile+'?theme=dark',{waitUntil:'load'});assert.equal(await page.$eval('html',n=>n.dataset.theme),'dark','URL overrides stored light');
 await page.setJavaScriptEnabled(false);
 for(const file of ['voice/case-study.html','voice/case-study.en.html','voice/index.en.html','workshops/azure-agent-infra/index.en.html']){await page.goto(base+file,{waitUntil:'load'});if((await page.$eval('#reading-main',n=>n.innerText.length))<5000)errors.push({path:file,type:'missing-static-body'});if(file.endsWith('.en.html')){const remaining=await remainingChinese();if(remaining.length)errors.push({path:file,type:'untranslated-static-body',remaining});}}
 assert.equal(await page.$eval('html',n=>n.dataset.theme),'dark','no-JavaScript dark default');
 assert.equal(await page.$eval('body',n=>getComputedStyle(n).backgroundColor),'rgb(8, 13, 27)','no-JavaScript Dark Aurora background');
 if(artifacts)fs.writeFileSync(path.join(artifacts,'language-checks.json'),JSON.stringify({languageResults,svgChecks,infraNavigation:'native EN/CN; body/theme/hash/back/forward/context verified',theme:'Dark Aurora default including no JS; versioned storage, legacy preference ignored, explicit light retained',errors},null,2));
 const coverage={baseline:owned.length,newTranslations:manifest.records.filter(r=>r.translation).length,total:manifest.records.length,layouts:results.length};
 if(artifacts)fs.writeFileSync(path.join(artifacts,'checks.json'),JSON.stringify({coverage,broken,errors,results},null,2));
 console.log(JSON.stringify({coverage,broken,errors,runtime:results.filter(r=>r.overflow||r.runtimeErrors.length||r.iframes||r.headerHeight>(r.width===390?64:72))},null,2));
 if(broken.length||errors.length||results.some(r=>r.overflow||r.runtimeErrors.length||r.iframes||r.headerHeight>(r.width===390?64:72)))process.exitCode=1;
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
