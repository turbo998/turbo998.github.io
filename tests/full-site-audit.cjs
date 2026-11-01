const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const {execFileSync} = require('node:child_process');
const inventory = require('../docs/redesign/route-inventory.json');
const production = require('../docs/redesign/production-routes.json');
const dedicated = require('../docs/redesign/dedicated-integration.json');
const readingSimulatorScroll = {
  'workshops/faf-vs-agent-forge/demo-agent-forge-pelican.html': [{selector:'#doc-box',reason:'Preserved simulator document/code artifact inspector; reading manifest dedicated-design exception.'}],
  'workshops/faf-vs-agent-forge/demo-faf-pelican.html': [{selector:'#doc-box',reason:'Preserved simulator document/code artifact inspector; reading manifest dedicated-design exception.'}],
  'workshops/faf-vs-agent-forge/demo-hve-pelican.html': [{selector:'#artifactContent',reason:'Preserved generated implementation-notes inspector; reading manifest dedicated-design exception.'}]
};
const runtimeFragments = Object.fromEntries(['animation', 'generative-visual-lab'].map(directory => [`${directory}/demos/knowledge-explainer-studio/index.html`, {'tpl-mcp':'xiaozhe-mcp-node-graph','tpl-rag':'xiaozhe-rag-pipeline-flow','tpl-finops':'chimp-deepseek-unit-economics'}]));
const root = path.join(__dirname, '..');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.SITE_ARTIFACT_DIR || path.join(root, 'site-test-artifacts');
const currentHtml = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z', '--', '*.html'], {cwd:root,encoding:'utf8'}).split('\0').filter(f=>f&&!f.startsWith('design-preview/'));
const files = [...new Set([...inventory.content.map(p => p.path), ...production.portalPages, ...currentHtml])];
const report = { result: 'RUNNING', scope: 'Every baseline HTML plus all current production HTML, including new translations; static references and optional real-browser layout audit', pages: [], missingFiles: [], missingFragments: [], layouts: [], runtimeFailures: [], runtimeFragments: [], externalRedirects: [], errors: [] };
async function main() {
  fs.mkdirSync(output, {recursive:true});
  const browser = await puppeteer.launch({ headless:'shell', pipe:true, protocolTimeout:30000 });
  try {
    const parser = await browser.newPage();
    const parsed = new Map();
    for(const file of files) {
      assert.ok(fs.existsSync(path.join(root,file)), 'Removed original: ' + file);
      const html = fs.readFileSync(path.join(root,file),'utf8');
      const record = await parser.evaluate(source => {
        const doc = new DOMParser().parseFromString(source,'text/html');
        const ids = [...doc.querySelectorAll('[id]')].map(e=>e.id);
        return { title:doc.title, lang:doc.documentElement.lang, ids, duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i), frames:[...doc.querySelectorAll('iframe')].map(e=>({src:e.getAttribute('src'),title:e.title})), references:[...doc.querySelectorAll('[href],[src]')].flatMap(e=>['href','src'].filter(a=>e.hasAttribute(a)).map(a=>({tag:e.tagName,attribute:a,value:e.getAttribute(a)}))) };
      },html);
      parsed.set(file,record);
    }
    for (const [file,record] of parsed) {
      for(const ref of record.references) {
        if(!ref.value || /^(?:https?:|\/\/|data:|blob:|javascript:|mailto:|tel:)/i.test(ref.value)) continue;
        const url = new URL(ref.value, `http://local.invalid/${file}`);
        let relative = decodeURIComponent(url.pathname).slice(1);
        if(relative.endsWith('/') || !relative) relative += 'index.html';
        const target = path.join(root,relative);
        if(!fs.existsSync(target)) { report.missingFiles.push({file,...ref,target:relative}); continue; }
        if(url.hash && parsed.has(relative) && relative !== 'frontier-ai-studio.html') {
          const fragment = decodeURIComponent(url.hash.slice(1));
          if(!parsed.get(relative).ids.includes(fragment) && !runtimeFragments[relative]?.[fragment]) report.missingFragments.push({file,...ref,target:relative,fragment});
        }
      }
      report.pages.push({file,title:record.title,lang:record.lang,duplicateIds:record.duplicateIds,frames:record.frames,references:record.references.length});
    }
    await parser.close();
    if(process.env.FULL_BROWSER_AUDIT === '1') {
      for(const file of files) {
        if(file === 'workshops/azure-vm-modernization/index.html') {
          const response = await fetch(`${base}/${file}`, {signal:AbortSignal.timeout(30000)});
          assert.equal(response.status,200,file);
          const page = await browser.newPage();
          await page.setJavaScriptEnabled(false);
          await page.goto(`${base}/${file}`,{waitUntil:'domcontentloaded'});
          const fallback = await page.$$eval('a[href]', links=>links.map(a=>a.href).filter(h=>/^https?:/.test(h)&&new URL(h).origin!==location.origin));
          assert.ok(fallback.length, 'External redirect must retain a native fallback');
          report.externalRedirects.push({file,localStatus:response.status,fallback,limitation:'Existing external destination; remote availability is not local-render acceptance.'});
          await page.close();
          continue;
        }
        const allowedScroll = dedicated.records.find(r=>r.path===file)?.verticalScrollRegions || readingSimulatorScroll[file] || [];
        const page = await browser.newPage();
        await page.setCacheEnabled(false);
        const errors=[];
        page.on('pageerror',err=>errors.push(err.message));
        for(const width of [390,1440]) {
          errors.length = 0;
          await page.setViewport({width,height:900});
          try {
            const response=await page.goto(`${base}/${file}`,{waitUntil:'domcontentloaded',timeout:30000});
            await new Promise(resolve=>setTimeout(resolve,250));
            const state=await page.evaluate(allowed=>({
              documentWidth:document.documentElement.scrollWidth,
              bodyOverflow:getComputedStyle(document.body).overflowY,
              frames:document.querySelectorAll('iframe').length,
              localHtmlFrames:[...document.querySelectorAll('iframe[src]')].filter(e=>{const u=new URL(e.src,location.href);return u.origin===location.origin&&(/\.html?$/.test(u.pathname)||u.pathname.endsWith('/'));}).map(e=>e.getAttribute('src')),
              scrollContainers:[...document.querySelectorAll('body *')].filter(e=>e.checkVisibility({checkVisibilityCSS:true})&&e.scrollHeight>e.clientHeight+3&&/auto|scroll/.test(getComputedStyle(e).overflowY)).map(e=>({tag:e.tagName,id:e.id,className:String(e.className),              height:e.clientHeight,scrollHeight:e.scrollHeight,reviewed:allowed.find(region=>e.matches(region.selector))||null})),
                            shell:!!document.querySelector('.site-header,.reading-header,.kee-dedicated-nav')
                          }),allowedScroll);
            report.layouts.push({file,width,status:response?.status(),...state,errors:[...new Set(errors)]});
          }catch(error){report.layouts.push({file,width,error:error.message});}
        }
        await page.close();
        console.log(`Audited ${file}`);
      }
      for(const [file,aliases] of Object.entries(runtimeFragments)) {
        for(const [fragment,expected] of Object.entries(aliases)) {
          const page=await browser.newPage();
          await page.goto(`${base}/${file}#${fragment}`,{waitUntil:'domcontentloaded',timeout:30000});
          await page.waitForFunction(()=>Boolean(window.explainerStudio));
          const actual=await page.evaluate(()=>({template:window.explainerStudio.snapshot().templateId,activeTab:document.querySelector('.tpl-tab.active')?.dataset.template}));
          report.runtimeFragments.push({file,fragment,expected,...actual});
          assert.equal(actual.template,expected,file+'#'+fragment);
          assert.equal(actual.activeTab,expected,file+'#'+fragment);
          await page.close();
        }
      }
    }
    for(const layout of report.layouts) {
      const failures=[];
      if(layout.error) failures.push(layout.error);
      else {
        if(layout.status!==200) failures.push(`HTTP status ${layout.status}`);
        if(layout.documentWidth>layout.width+2) failures.push(`Document overflow: ${layout.documentWidth} > ${layout.width}`);
        if(layout.errors.length) failures.push(...layout.errors);
        if(layout.localHtmlFrames.length) failures.push(`Nested local HTML: ${layout.localHtmlFrames.join(', ')}`);
        const pageScrollers=layout.scrollContainers.filter(e=>!['PRE','CODE','TEXTAREA'].includes(e.tag)&&!e.reviewed);
        if(pageScrollers.length) failures.push(`Unreviewed scrolling containers: ${pageScrollers.map(e=>`${e.tag}#${e.id}.${e.className}`).join(', ')}`);
      }
      if(failures.length) report.runtimeFailures.push({file:layout.file,width:layout.width,failures});
    }
    assert.deepEqual(report.runtimeFailures,[],'Runtime failures; inspect full-site-audit.json');
    assert.deepEqual(report.missingFiles,[],'Broken local files; inspect full-site-audit.json');
    assert.deepEqual(report.missingFragments,[],'Broken local fragments; inspect full-site-audit.json');
    report.result='PASS';
    console.log(`PASS: ${files.length} HTML pages; ${report.pages.reduce((n,p)=>n+p.references,0)} references; ${report.layouts.length} runtime layouts.`);
  }catch(error){report.result='FAIL';report.errors.push(error.stack);throw error;}
  finally{fs.writeFileSync(path.join(output,'full-site-audit.json'),JSON.stringify(report,null,2));await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
