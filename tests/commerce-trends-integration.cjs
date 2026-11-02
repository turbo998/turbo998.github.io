const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const {baseline,files,svg,sourceFor,hash,prepare,validate,originalPolicy} = require('../scripts/integrate-commerce-trends.cjs');
const base=process.env.SITE_TEST_URL||'http://127.0.0.1:8797';
const output=process.env.SITE_ARTIFACT_DIR||path.join(__dirname,'..','site-test-artifacts','commerce-trends');
const report={result:'RUNNING',baseline,scope:'Presentation and navigation validation only. Existing published claims are preserved, not measured or independently reproduced.',preservation:[],layouts:[],navigation:[],themes:[],errors:[]};
const normalizedText=el=>el.textContent.replace(/\s+/g,' ').trim();
async function main() {
  if(process.argv.includes('--prepare')){console.log(JSON.stringify({baseline,preservation:prepare(),mode:'No HTML, asset, browser, or evidence writes'},null,2));return;}
  report.preservation=validate();
  fs.mkdirSync(output,{recursive:true});
  const browser=await puppeteer.launch({headless:'shell',pipe:true});
  try {
    const response=await fetch(`${base}/${svg}`);
    assert.equal(response.status,200);
    const image=await response.text();
    assert.equal(image.replace(/\r\n/g,'\n'),sourceFor(svg),'Served original SVG is unchanged');
    report.svg={file:svg,sha256:hash(image)};
    for(const file of files) {
      const en=file.includes('.en.'),other=files.find(item=>item!==file);
      const context=await browser.createBrowserContext();
      const page=await context.newPage();
      page.setDefaultNavigationTimeout(60000);
      await page.setCacheEnabled(false);
      const errors=[],failed=[],bad=[],consoleErrors=[];
      page.on('pageerror',error=>errors.push(error.message));
      page.on('console',message=>{if(message.type()==='error')consoleErrors.push(message.text());});
      page.on('requestfailed',request=>failed.push({url:request.url(),error:request.failure()?.errorText}));
      page.on('response',res=>{if(res.status()>=400)bad.push({url:res.url(),status:res.status()});});
      await page.evaluateOnNewDocument(()=>{window.cspViolations=[];document.addEventListener('securitypolicyviolation',e=>window.cspViolations.push({directive:e.violatedDirective,uri:e.blockedURI}));});
      await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:'light'}]);
      const original=await context.newPage();
      await original.setContent(sourceFor(file),{waitUntil:'domcontentloaded'});
      const sourceText=await original.$eval('main',normalizedText);
      const sourceLinks=await original.$$eval('main a',els=>els.map(el=>el.getAttribute('href')));
      await original.close();
      for(const javascript of [true,false]) {
        await page.setJavaScriptEnabled(javascript);
        for(const width of [390,768,1440]) {
          await page.setViewport({width,height:900});
          const res=await page.goto(`${base}/${file}`,{waitUntil:'networkidle0'});
          assert.equal(res.status(),200);
          const state=await page.evaluate(()=>{
            const main=document.querySelector('main'),html=document.documentElement;
            const rect=el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width,height:r.height};};
            const nested=[...document.body.querySelectorAll('*')].filter(el=>{const css=getComputedStyle(el);return ['auto','scroll'].includes(css.overflowY)&&el.scrollHeight>el.clientHeight+2;}).map(el=>el.className);
            const clipped=[...main.querySelectorAll('h1,h2,p,li,td,th,code,.kpi-box,.stack-item,.trend-card')].filter(el=>{const r=el.getBoundingClientRect();return r.left< -1||r.right>innerWidth+1;}).map(el=>el.className||el.tagName);
            return {lang:html.lang,theme:html.dataset.theme,background:getComputedStyle(document.body).backgroundColor,viewport:innerWidth,width:html.scrollWidth,text:main.textContent.replace(/\s+/g,' ').trim(),links:[...main.querySelectorAll('a')].map(a=>a.getAttribute('href')),trends:main.querySelectorAll('.trend-card').length,kpis:main.querySelectorAll('.kpi-box').length,rows:main.querySelectorAll('tbody tr').length,frames:document.querySelectorAll('iframe,frame').length,oldHeaders:document.querySelectorAll('.topbar').length,nested,clipped,main:rect(main),header:rect(document.querySelector('.reading-header')),languages:[...document.querySelectorAll('.reading-header [hreflang]')].map(a=>({text:a.textContent,href:a.getAttribute('href'),language:a.hreflang,current:a.getAttribute('aria-current')})),images:[...main.querySelectorAll('img')].map(img=>({loaded:img.complete&&img.naturalWidth>0,src:img.getAttribute('src')})),csp:document.querySelector('meta[http-equiv="Content-Security-Policy"]').content,cspViolations:window.cspViolations||[]};
          });
          assert.equal(state.text,sourceText,file+': DOM text identity');
          assert.deepEqual(state.links,sourceLinks,file+': original article links');
          assert.equal(state.lang,en?'en':'zh-CN');assert.equal(state.theme,'dark');
          assert.equal(state.background,'rgb(8, 13, 27)');assert.equal(state.width,width);
          assert.equal(state.trends,7);assert.equal(state.kpis,4);assert.equal(state.rows,7);
          assert.equal(state.frames,0);assert.equal(state.oldHeaders,0);
          assert.deepEqual(state.nested,[]);assert.deepEqual(state.clipped,[]);
          assert.deepEqual(state.languages.map(a=>a.text),['EN','中文']);
          assert.equal(await page.$$eval('.professional-primary [aria-current=page]',links=>links.length),1);
          assert.ok(state.images.length===1&&state.images.every(img=>img.loaded));
          assert.ok(state.csp.startsWith(originalPolicy));assert.match(state.csp,/script-src 'sha256-[A-Za-z0-9+/=]+';/);
          assert.deepEqual(state.cspViolations,[]);
          await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
          assert.ok(await page.evaluate(()=>scrollY>100),'Native document scroll');
          await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
          await page.screenshot({path:path.join(output,`${en?'en':'zh'}-${width}-${javascript?'js':'nojs'}.png`)});
          const {text,links,...summary}=state;
          report.layouts.push({file,javascript,width,...summary,mainTextSha256:hash(text),nativeDocumentScroll:true});
          await page.click('.commerce-source-context summary');
          const expanded=await page.evaluate(()=>({width:document.documentElement.scrollWidth,nested:[...document.querySelectorAll('.commerce-source-context *')].some(el=>{const s=getComputedStyle(el);return ['auto','scroll'].includes(s.overflowY)&&el.scrollHeight>el.clientHeight+2;})}));
          assert.equal(expanded.width,width,'Expanded source context overflow');assert.equal(expanded.nested,false);
          await page.click('.commerce-source-context summary');
        }
      }
      await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click(`.reading-header [hreflang="${en?'zh-CN':'en'}"]`)]);
      assert.equal(new URL(page.url()).pathname,`/${other}`);
      assert.equal(await page.$eval('html',el=>el.lang),en?'zh-CN':'en');
      report.navigation.push({file,action:'native no-JS edition switch',url:page.url()});
      await page.goto(`${base}/${file}`,{waitUntil:'networkidle0'});
      const contextHref=await page.$eval('.reading-context',el=>el.href);
      assert.equal(new URL(contextHref).pathname,`/studio/${en?'':'zh-'}commerce.html`);
      const contextResponse=await fetch(contextHref);assert.equal(contextResponse.status,200);
      report.navigation.push({file,action:'direct Commerce topic',url:contextHref,status:contextResponse.status});
      await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('.reading-context')]);
      assert.equal(new URL(page.url()).pathname,new URL(contextHref).pathname,'Native no-JS topic return');
      await page.setJavaScriptEnabled(true);
      await page.goto(`${base}/${file}`,{waitUntil:'networkidle0'});
      await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('[data-reading-theme="light"]')]);
      assert.equal(await page.$eval('html',el=>el.dataset.theme),'light');
      assert.equal(await page.evaluate(()=>localStorage.getItem('kee-aurora-theme-v1')),'light');
      assert.equal(await page.$eval('body',el=>getComputedStyle(el).backgroundColor),'rgb(247, 249, 255)');
      await page.screenshot({path:path.join(output,`${en?'en':'zh'}-light-1440.png`)});
      await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click(`.reading-header [hreflang="${en?'zh-CN':'en'}"]`)]);
      assert.equal(await page.$eval('html',el=>el.dataset.theme),'light');
      await page.goto(`${base}/${file}`,{waitUntil:'networkidle0'});
      assert.equal(await page.$eval('html',el=>el.dataset.theme),'light','Shared stored preference');
      await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('[data-reading-theme="dark"]')]);
      assert.equal(await page.evaluate(()=>localStorage.getItem('kee-aurora-theme-v1')),'dark');
      report.themes.push({file,explicitLight:true,nativeEditionCarriesPreference:true,sharedVersionedStorage:true,explicitDark:true});
      assert.deepEqual(errors,[],file+': script errors');assert.deepEqual(consoleErrors,[],file+': console errors');assert.deepEqual(failed,[],file+': failed requests');assert.deepEqual(bad,[],file+': failed responses');
      await context.close();
    }
    report.result='PASS';
    console.log(`PASS: 2 native editions, ${report.layouts.length} JS/no-JS responsive layouts, source text/markup identity, unchanged SVG, CSP, themes, and navigation.`);
  } catch(error){report.result='FAIL';report.errors.push(error.stack);throw error;}
  finally{fs.writeFileSync(path.join(output,'commerce-trends-validation.json'),JSON.stringify(report,null,2));await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
