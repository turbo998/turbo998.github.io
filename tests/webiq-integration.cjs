const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.SITE_ARTIFACT_DIR || path.join(__dirname,'..','site-test-artifacts');
const report = {result:'RUNNING',scope:'Concurrent Web IQ bilingual navigation and offline interaction; not an Azure deployment or benchmark rerun',layouts:[],errors:[]};
async function main() {
  fs.mkdirSync(output,{recursive:true});
  const browser=await puppeteer.launch({headless:'shell',pipe:true});
  try {
    for(const name of ['index.html','index.en.html','live-demo.html','live-demo.en.html']) {
      const page=await browser.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.setCacheEnabled(false);
      for(const width of [390,1440]) {
        await page.setViewport({width,height:900});
        const response=await page.goto(`${base}/workshops/webiq-azure/${name}`,{waitUntil:'domcontentloaded'});
        assert.equal(response.status(),200);
        const state=await page.evaluate(()=>({lang:document.documentElement.lang,width:document.documentElement.scrollWidth,frames:document.querySelectorAll('iframe').length,links:[...document.querySelectorAll('.kee-webiq-nav a')].map(a=>a.getAttribute('href'))}));
        assert.equal(state.width,width,name+': overflow');
        assert.equal(state.frames,0,name);
        assert.equal(state.links.length,4,name);
        if(name.startsWith('live-demo')) {
          const before=await page.$eval('.app-shell',e=>e.innerText);
          await page.click('#btn-next');
          const after=await page.$eval('.app-shell',e=>e.innerText);
          assert.notEqual(after,before,name+': offline step did not advance');
        }
        assert.deepEqual(errors,[],name);
        await page.screenshot({path:path.join(output,`webiq-${name.replace('.html','')}-${width}.png`)});
        report.layouts.push({name,width,...state,errors:[...errors]});
      }
      await page.setJavaScriptEnabled(false);
      await page.goto(`${base}/workshops/webiq-azure/${name}`);
      await page.click('.kee-webiq-nav .language');
      assert.equal(await page.$eval('html',e=>e.lang).then(l=>l.startsWith('en')),!name.includes('.en.'),'Native language switch');
      await page.close();
    }
    report.result='PASS';
    console.log('PASS: 4 concurrent Web IQ pages, 8 layouts, offline demo interactions and native language links.');
  } catch(error) {report.result='FAIL';report.errors.push(error.stack);throw error;}
  finally {fs.writeFileSync(path.join(output,'webiq-validation.json'),JSON.stringify(report,null,2));await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
