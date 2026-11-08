const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const {baseline,files,validate,sourceFor,hash} = require('../scripts/integrate-radar.cjs');
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:8797';
const output = process.env.SITE_ARTIFACT_DIR || path.join(__dirname,'..','site-test-artifacts','radar');
const report = {result:'RUNNING',baseline,scope:'Presentation and native navigation only; upstream research claims preserved, not independently reproduced. Document scrolling is native; the source detail dialog retains its own modal scrolling.',preservation:[],assets:[],layouts:[],drawers:[],navigation:[],interactions:[],errors:[]};
async function checkDrawer(page,file,width,stage='canonical') {
  const expected=await page.$eval('#repo-cards-container .repo-card',card=>({url:card.querySelector('.repo-name-link').href,attention:card.querySelector('.att-num').textContent.trim(),claims:[...card.querySelectorAll('.claim-item')].map(el=>el.textContent.trim()),pillars:[...card.querySelectorAll('.sa-dim-card')].map(el=>el.lastElementChild.textContent.replace(/\s+/g,' ').trim())}));
  await page.click('#repo-cards-container .open-drawer-btn');
  await page.waitForSelector('#repo-detail-drawer.open',{visible:true});
  const actual=await page.$eval('#repo-detail-drawer',drawer=>{
    const panel=drawer.querySelector('.drawer-panel'),rect=panel.getBoundingClientRect(),style=getComputedStyle(panel);
    return {title:drawer.querySelector('#drawer-repo-title').textContent,url:drawer.querySelector('.bh-btn.primary').href,claims:[...drawer.querySelectorAll('.claim-item')].map(el=>el.textContent.trim()),pillars:[...drawer.querySelectorAll('.sa-dim-card')].map(el=>el.lastElementChild.textContent.replace(/\s+/g,' ').trim()),background:style.backgroundColor,text:style.color,width:document.documentElement.scrollWidth,panelInsideViewport:rect.left>=0&&rect.right<=innerWidth+1&&rect.top>=0&&rect.bottom<=innerHeight+1,aboveHeader:Number(getComputedStyle(drawer).zIndex)>Number(getComputedStyle(document.querySelector('.reading-header')).zIndex)};
  });
  assert.equal(actual.url,expected.url,file+': drawer repository');
  assert.ok(actual.title.endsWith('Attention '+expected.attention),file+': live drawer score');
  assert.deepEqual(actual.claims,expected.claims,file+': drawer claim preservation');
  assert.deepEqual(actual.pillars,expected.pillars,file+': drawer SA pillars');
  assert.equal(actual.claims.length,4);
  assert.equal(actual.pillars.length,4);
  assert.equal(actual.background,'rgb(16, 26, 48)');
  assert.equal(actual.text,'rgb(238, 243, 255)');
  assert.equal(actual.width,width,file+': open drawer overflow');
  assert.ok(actual.panelInsideViewport&&actual.aboveHeader,file+': drawer perimeter');
  await page.screenshot({path:path.join(output,`${file.replace('.html','')}-drawer-${stage}-${width}.png`)});
  await page.keyboard.press('Escape');
  assert.equal(await page.$eval('#repo-detail-drawer',el=>el.classList.contains('open')),false);
  await page.click('#repo-cards-container .open-drawer-btn');
  await page.click('#close-drawer-btn');
  assert.equal(await page.$eval('#repo-detail-drawer',el=>el.classList.contains('open')),false);
  await page.click('#repo-cards-container .open-drawer-btn');
  await page.mouse.click(1,450);
  assert.equal(await page.$eval('#repo-detail-drawer',el=>el.classList.contains('open')),false);
  report.drawers.push({file,width,stage,...actual,escape:true,closeButton:true,backdrop:true});
}
async function main() {
  fs.mkdirSync(output,{recursive:true});
  report.preservation=validate();
  const browser=await puppeteer.launch({headless:'shell',pipe:true});
  try {
    for(const file of ['workshops/github-trending-radar/report.json','workshops/github-trending-radar/evidence/trending-daily-2026-11-08-audit.json','workshops/github-trending-radar/evidence/search-new-repos-2026-11-08-raw.json','workshops/github-trending-radar/daily/2026-11-08.en.md','workshops/github-trending-radar/daily/2026-11-08.md','assets/github-ai-radar-2026-11-08.svg','assets/github-ai-radar-2026-11-08-r2-context-folding.svg','assets/github-ai-radar-2026-11-08-r3-agent-ui-harness.svg','assets/github-ai-radar-2026-11-08-r4-sandbox-autoloop.svg','assets/github-ai-radar-2026-11-08-r5-browser-desktop-a11y.svg','workshops/github-trending-radar/docs/nvke-vs-aks-gpu-cluster-selection-faq.en.md','workshops/github-trending-radar/docs/nvke-vs-aks-gpu-cluster-selection-faq.md','workshops/github-trending-radar/docs/context-folding-vs-compact-rag-selection-faq.en.md','workshops/github-trending-radar/docs/context-folding-vs-compact-rag-selection-faq.md','workshops/github-trending-radar/docs/agent-ui-design-system-vs-raw-tailwind-selection-faq.en.md','workshops/github-trending-radar/docs/agent-ui-design-system-vs-raw-tailwind-selection-faq.md','workshops/github-trending-radar/docs/multi-agent-sandbox-workbench-vs-cli-selection-faq.en.md','workshops/github-trending-radar/docs/multi-agent-sandbox-workbench-vs-cli-selection-faq.md','workshops/github-trending-radar/docs/agent-browser-desktop-a11y-vs-playwright-vision-selection-faq.en.md','workshops/github-trending-radar/docs/agent-browser-desktop-a11y-vs-playwright-vision-selection-faq.md','workshops/github-trending-radar/daily/2026-11-05.en.md','workshops/github-trending-radar/daily/2026-11-05.md','assets/github-ai-radar-2026-11-05.svg','workshops/github-trending-radar/daily/2026-11-04.en.md','workshops/github-trending-radar/daily/2026-11-04.md','assets/github-ai-radar-2026-11-04.svg','workshops/github-trending-radar/daily/2026-11-03.en.md','workshops/github-trending-radar/daily/2026-11-03.md','assets/github-ai-radar-2026-11-03.svg','workshops/github-trending-radar/daily/2026-11-02.en.md','workshops/github-trending-radar/daily/2026-11-02.md','assets/github-ai-radar-2026-11-02.svg','workshops/github-trending-radar/daily/2026-11-01.en.md','workshops/github-trending-radar/daily/2026-11-01.md','assets/github-ai-radar-2026-11-01.svg']) {
      const response=await fetch(`${base}/${file}`);
      assert.equal(response.status,200,file+': merged artifact');
      const actual=await response.text(),source=sourceFor(file);
      assert.equal(actual.replace(/\r\n/g,'\n'),source.replace(/\r\n/g,'\n'),file+': exact upstream artifact');
      if(file.endsWith('.json'))assert.deepEqual(JSON.parse(actual),JSON.parse(source));
      report.assets.push({file,status:response.status,sourceSha256:hash(source),servedSha256:hash(actual)});
    }
    // Verify Track A 24h star velocity items against archived raw HTML snapshot (sha256: 353914ef... LF)
    const rawHtml=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-08-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawHtml),'353914ef985b6a4f269094bea6a075a391f5e5da0e85145e54f704909dbf11d0','raw HTML LF sha256');
    const rawSearchJsonStr=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-08-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawSearchJsonStr),'b63e154723524af044eca6d701fd910d2b13ed732d3ad8ae2fd3f0b5584b7ba1','raw Search API JSON LF sha256');
    const rawSearchJson=JSON.parse(rawSearchJsonStr);
    const rawSearchMap=new Map(rawSearchJson.items.map(it=>[it.full_name,it]));
    const reportJson=JSON.parse(fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','report.json'),'utf8'));
    for(const item of reportJson.fastest_rising_leaderboard.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': Track A provenance');
      assert.ok(rawHtml.includes(`href="/${item.full_name}"`),item.full_name+': present in raw HTML');
      assert.ok(rawHtml.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': Track B stars_today must be not_measured');
      assert.ok(rawSearchMap.has(item.full_name),item.full_name+': present in archived Search API JSON');
      const rawEntry=rawSearchMap.get(item.full_name);
      assert.equal(item.stars_total_search_api,rawEntry.stargazers_count,item.full_name+': stars_total_search_api matches Search API JSON');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': stars_per_day closed-form');
    }
    // Closed-form FinOps mathematical verification across Rounds 1-5
    assert.equal((64*8*2.20).toFixed(2),'1126.40','R1 cluster hourly rate');
    assert.equal((69*1126.40).toFixed(2),'77721.60','R1 maintenance savings');
    assert.equal((78*(1.58-0.025)*(128*2.20)).toFixed(2),'34155.26','R1 MTTR savings');
    assert.equal((77721.60+78*(1.58-0.025)*(128*2.20)).toFixed(2),'111876.86','R1 total annual savings');
    assert.equal(20*4*22,1760,'R2 monthly sessions');
    assert.equal((4.5*(0.62*3.00+0.38*0.30)).toFixed(4),'8.8830','R2 Path A input-only per session');
    assert.equal((8.8830*1760).toFixed(2),'15634.08','R2 Path A input-only monthly');
    assert.equal((4.5*(0.04*3.00+0.96*0.30)).toFixed(4),'1.8360','R2 Path C input-only per session');
    assert.equal((1.8360*1760).toFixed(2),'3231.36','R2 Path C input-only monthly');
    assert.equal((15634.08-3231.36).toFixed(2),'12402.72','R2 input-only monthly delta');
    assert.equal(((15634.08-3231.36)*12).toFixed(2),'148832.64','R2 input-only annual delta');
    for(const r2File of ['workshops/github-trending-radar/docs/context-folding-vs-compact-rag-selection-faq.md','workshops/github-trending-radar/docs/context-folding-vs-compact-rag-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r2-context-folding.svg']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r2File),'utf8');
      assert.ok(txt.includes('15,634.08')&&txt.includes('3,231.36')&&txt.includes('12,402.72')&&txt.includes('not_measured'),r2File+': contains closed-form R2 input-only figures and not_measured');
    }
    assert.equal(12*6,72,'R3 turns per app');
    assert.equal(6400*72,460800,'R3 Path A tokens');
    assert.equal(1450*72,104400,'R3 Path B tokens');
    assert.equal(1850*72,133200,'R3 Path C tokens');
    assert.equal(18*250,4500,'R4 resident CLI RAM MB');
    assert.equal((40*22*0.15*3.18).toFixed(2),'419.76','R4 dropped approval rerun cost');
    assert.equal(25*20*22,11000,'R5 monthly CUA runs');
    assert.equal((0.5*0.30+0.5*3.00).toFixed(2),'1.65','R5 blended input rate per 1M');
    assert.equal((0.75*1.65*11000).toFixed(2),'13612.50','R5 Path A monthly input cost');
    assert.equal((0.2142*1.65*11000).toFixed(2),'3887.73','R5 Path B monthly input cost');
    assert.equal((0.02325*1.65*11000).toFixed(2),'421.99','R5 Path C monthly input cost');
    assert.equal((13612.50-0.02325*1.65*11000).toFixed(2),'13190.51','R5 monthly input savings');
    assert.equal(400*22,8800,'R6 monthly total events');
    assert.equal(100*22,2200,'R6 monthly executed tickets');
    const r6PathAIn=8800*(0.020*3.00)+2200*(0.120*3.00);
    const r6PathAOut=8800*(0.001*15.00)+2200*(0.004*15.00);
    assert.equal(r6PathAIn.toFixed(2),'1320.00','R6 Path A input-only cost');
    assert.equal(r6PathAOut.toFixed(2),'264.00','R6 Path A output-only cost (counted once)');
    assert.equal((r6PathAIn+r6PathAOut).toFixed(2),'1584.00','R6 Path A monthly API total');
    const r6PathBIn=4400*(0.020*3.00)+2200*(0.040*3.00);
    const r6PathBOut=4400*(0.001*15.00)+2200*(0.002*15.00);
    assert.equal(r6PathBIn.toFixed(2),'528.00','R6 Path B input-only cost');
    assert.equal(r6PathBOut.toFixed(2),'132.00','R6 Path B output-only cost (counted once)');
    assert.equal((r6PathBIn+r6PathBOut).toFixed(2),'660.00','R6 Path B monthly API total');
    const r6PathCIn=2200*(0.008*3.00)+2200*(0.010*3.00);
    const r6PathCOut=2200*(0.0004*15.00)+2200*(0.0008*15.00);
    assert.equal(r6PathCIn.toFixed(2),'118.80','R6 Path C input-only cost');
    assert.equal(r6PathCOut.toFixed(2),'39.60','R6 Path C output-only cost (counted once)');
    assert.equal((r6PathCIn+r6PathCOut).toFixed(2),'158.40','R6 Path C monthly API total');
    assert.equal((1584.00-158.40).toFixed(2),'1425.60','R6 monthly API savings');
    assert.equal(((1584.00-158.40)*12).toFixed(2),'17107.20','R6 annual API savings');
    assert.equal((2200*0.05).toFixed(1),'110.0','R6 Path A attention hours');
    assert.equal((2200*0.01).toFixed(1),'22.0','R6 Path C attention hours');
    assert.equal((110.0-22.0).toFixed(1),'88.0','R6 attention hours saved');
    for(const r6File of ['workshops/github-trending-radar/docs/superagent-microkernel-memory-vs-langgraph-selection-faq.md','workshops/github-trending-radar/docs/superagent-microkernel-memory-vs-langgraph-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r6-superagent-memory.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-08-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r6File),'utf8');
      assert.ok(txt.includes('0.020')&&txt.includes('0.120')&&txt.includes('0.008')&&txt.includes('0.0004')&&txt.includes('0.010')&&txt.includes('0.0008')&&txt.includes('1,584.00')&&txt.includes('158.40')&&txt.includes('not_measured'),r6File+': contains exact R6 input/output parameters and API-only scope');
    }
    assert.equal(50*8*22,8800,'R7 monthly queries');
    const r7PathAIn=8800*(0.040*1.25*1.65);
    const r7PathAOut=8800*(0.0032*1.25*15.00);
    assert.equal(r7PathAIn.toFixed(2),'726.00','R7 Path A input cost');
    assert.equal(r7PathAOut.toFixed(2),'528.00','R7 Path A output cost');
    assert.equal((r7PathAIn+r7PathAOut).toFixed(2),'1254.00','R7 Path A monthly total');
    const r7PathBIn=8800*(0.032*1.05*1.65);
    const r7PathBOut=8800*(0.0012*1.05*15.00);
    assert.equal((r7PathBIn+r7PathBOut).toFixed(2),'654.19','R7 Path B monthly total');
    const r7PathCIn=8800*(0.0040*1.00*1.65);
    const r7PathCOut=8800*(0.00045*1.00*15.00);
    const r7WikiBuild=2*16.00;
    assert.equal(r7PathCIn.toFixed(2),'58.08','R7 Path C input cost');
    assert.equal(r7PathCOut.toFixed(2),'59.40','R7 Path C output cost');
    assert.equal((r7PathCIn+r7PathCOut).toFixed(2),'117.48','R7 Path C query API cost');
    assert.equal((r7PathCIn+r7PathCOut+r7WikiBuild).toFixed(2),'149.48','R7 Path C total monthly cost');
    assert.equal((1254.00-149.48).toFixed(2),'1104.52','R7 monthly savings');
    assert.equal(((1254.00-149.48)/1254.00*100).toFixed(2),'88.08','R7 pct savings');
    assert.equal(((4000-450)/4000*100).toFixed(2),'88.75','R7 output token reduction pct');
    for(const r7File of ['workshops/github-trending-radar/docs/generative-ui-catalog-vs-raw-code-streaming-selection-faq.md','workshops/github-trending-radar/docs/generative-ui-catalog-vs-raw-code-streaming-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r7-generative-ui-catalog.svg']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r7File),'utf8');
      assert.ok(txt.includes('1,254.00')&&txt.includes('654.19')&&txt.includes('149.48')&&txt.includes('1,104.52')&&txt.includes('88.08%')&&txt.includes('88.75%'),r7File+': contains closed-form R7 figures');
    }
    const r8Modules=40;
    const r8PathARounds=r8Modules*6;
    const r8PathAIn=r8PathARounds*(0.050*3.00);
    const r8PathAOut=r8PathARounds*(0.012*15.00);
    assert.equal(r8PathARounds,240,'R8 Path A monthly rounds');
    assert.equal(r8PathAIn.toFixed(2),'36.00','R8 Path A input-only cost');
    assert.equal(r8PathAOut.toFixed(2),'43.20','R8 Path A output-only cost (counted once)');
    assert.equal((r8PathAIn+r8PathAOut).toFixed(2),'79.20','R8 Path A monthly API total');
    const r8PathBRounds=r8Modules*4;
    const r8PathBIn=r8PathBRounds*(0.150*3.00);
    const r8PathBOut=r8PathBRounds*(0.010*15.00);
    assert.equal(r8PathBRounds,160,'R8 Path B monthly rounds');
    assert.equal(r8PathBIn.toFixed(2),'72.00','R8 Path B input-only cost');
    assert.equal(r8PathBOut.toFixed(2),'24.00','R8 Path B output-only cost (counted once)');
    assert.equal((r8PathBIn+r8PathBOut).toFixed(2),'96.00','R8 Path B monthly API total');
    const r8PathCRounds=r8Modules*2;
    const r8PathCIn=r8PathCRounds*(0.015*3.00);
    const r8PathCOut=r8PathCRounds*(0.008*15.00);
    assert.equal(r8PathCRounds,80,'R8 Path C monthly rounds');
    assert.equal(r8PathCIn.toFixed(2),'3.60','R8 Path C input-only cost');
    assert.equal(r8PathCOut.toFixed(2),'9.60','R8 Path C output-only cost (counted once)');
    assert.equal((r8PathCIn+r8PathCOut).toFixed(2),'13.20','R8 Path C monthly API total');
    assert.equal((79.20-13.20).toFixed(2),'66.00','R8 monthly API savings vs Path A');
    assert.equal(((79.20-13.20)/79.20*100).toFixed(2),'83.33','R8 pct API savings vs Path A');
    assert.equal((96.00-13.20).toFixed(2),'82.80','R8 monthly API savings vs Path B');
    assert.equal(((96.00-13.20)/96.00*100).toFixed(2),'86.25','R8 pct API savings vs Path B');
    assert.equal((40*2.5).toFixed(1),'100.0','R8 Path A QA hours');
    assert.equal((40*0.5).toFixed(1),'20.0','R8 Path C QA hours');
    assert.equal((100.0-20.0).toFixed(1),'80.0','R8 QA hours saved vs Path A');
    for(const r8File of ['workshops/github-trending-radar/docs/craft-anything-rust-probe-vs-decompile-selection-faq.md','workshops/github-trending-radar/docs/craft-anything-rust-probe-vs-decompile-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r8-craft-anything-probe.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-08-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r8File),'utf8');
      assert.ok(txt.includes('0.050')&&txt.includes('0.012')&&txt.includes('0.150')&&txt.includes('0.015')&&txt.includes('0.008')&&txt.includes('79.20')&&txt.includes('13.20')&&txt.includes('66.00')&&txt.includes('not_measured'),r8File+': contains exact R8 input/output parameters and API-only scope');
    }
    const r9Runs=100*22;
    assert.equal(r9Runs,2200,'R9 monthly runs');
    const r9PathASteps=r9Runs*18;
    const r9PathAIn=r9PathASteps*(0.025*3.00);
    const r9PathAOut=r9PathASteps*(0.0005*15.00);
    assert.equal(r9PathASteps,39600,'R9 Path A monthly steps');
    assert.equal(r9PathAIn.toFixed(2),'2970.00','R9 Path A input-only cost');
    assert.equal(r9PathAOut.toFixed(2),'297.00','R9 Path A output-only cost (counted once)');
    assert.equal((r9PathAIn+r9PathAOut).toFixed(2),'3267.00','R9 Path A monthly API total');
    const r9PathBSteps=r9Runs*14;
    const r9PathBIn=r9PathBSteps*(0.012*3.00);
    const r9PathBOut=r9PathBSteps*(0.0004*15.00);
    assert.equal(r9PathBSteps,30800,'R9 Path B monthly steps');
    assert.equal(r9PathBIn.toFixed(2),'1108.80','R9 Path B input-only cost');
    assert.equal(r9PathBOut.toFixed(2),'184.80','R9 Path B output-only cost (counted once)');
    assert.equal((r9PathBIn+r9PathBOut).toFixed(2),'1293.60','R9 Path B monthly API total');
    const r9PathCSteps=r9Runs*8;
    const r9PathCIn=r9PathCSteps*(0.003*3.00);
    const r9PathCOut=r9PathCSteps*(0.0003*15.00);
    assert.equal(r9PathCSteps,17600,'R9 Path C monthly steps');
    assert.equal(r9PathCIn.toFixed(2),'158.40','R9 Path C input-only cost');
    assert.equal(r9PathCOut.toFixed(2),'79.20','R9 Path C output-only cost (counted once)');
    assert.equal((r9PathCIn+r9PathCOut).toFixed(2),'237.60','R9 Path C monthly API total');
    assert.equal((3267.00-237.60).toFixed(2),'3029.40','R9 monthly API savings vs Path A');
    assert.equal(((3267.00-237.60)*12).toFixed(2),'36352.80','R9 annual API savings vs Path A');
    assert.equal(((3267.00-237.60)/3267.00*100).toFixed(2),'92.73','R9 pct API savings vs Path A');
    assert.equal((1293.60-237.60).toFixed(2),'1056.00','R9 monthly API savings vs Path B');
    assert.equal(((1293.60-237.60)/1293.60*100).toFixed(2),'81.63','R9 pct API savings vs Path B');
    assert.equal((30.0-6.0).toFixed(1),'24.0','R9 human overhead hours saved vs Path A');
    for(const r9File of ['workshops/github-trending-radar/docs/mika-android-virtual-display-agent-vs-adb-selection-faq.md','workshops/github-trending-radar/docs/mika-android-virtual-display-agent-vs-adb-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r9-mika-android-agent.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-08-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r9File),'utf8');
      assert.ok(txt.includes('0.025')&&txt.includes('0.0005')&&txt.includes('0.012')&&txt.includes('0.003')&&txt.includes('0.0003')&&txt.includes('3,267.00')&&txt.includes('237.60')&&txt.includes('3,029.40')&&txt.includes('not_measured'),r9File+': contains exact R9 input/output parameters and API-only scope');
    }
    for(const file of files) {
      const dedicated=file.startsWith('workshops/');
      const en=dedicated?file.includes('.en.'):!file.startsWith('zh-');
      const page=await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      const errors=[],failedRequests=[],badResponses=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('requestfailed',req=>failedRequests.push({url:req.url(),error:req.failure()?.errorText}));
      page.on('response',response=>{if(response.status()>=400)badResponses.push({url:response.url(),status:response.status()});});
      await page.evaluateOnNewDocument(()=>{window.cspViolations=[];document.addEventListener('securitypolicyviolation',event=>window.cspViolations.push({directive:event.violatedDirective,blockedURI:event.blockedURI}));});
      await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:'light'}]);
      await page.setCacheEnabled(false);
      let canonical,canonicalWeekly;
      for(const javascript of [true,false]) {
        await page.setJavaScriptEnabled(javascript);
        for(const width of [390,768,1440]) {
          await page.setViewport({width,height:900});
          const response=await page.goto(`${base}/${file}`,{waitUntil:'networkidle0'});
          assert.equal(response.status(),200,file);
          const state=await page.evaluate(dedicated=>{
            const style=getComputedStyle(document.body);
            const header=document.querySelector(dedicated?'.radar-report-nav':'.reading-header');
            const selector=dedicated?'.radar-report-source .card':'#repo-cards-container .repo-card';
            const cards=[...document.querySelectorAll(selector)];
            const weekly=[...document.querySelectorAll('#weekly-surging-section .weekly-grid article')];
            const weeklyState={weeklyCount:weekly.length,weeklyText:weekly.map(el=>el.textContent.replace(/\s+/g,' ').trim()).join('\n'),weeklyRepos:weekly.map(el=>el.querySelector('h3 a').getAttribute('href')),drawerTriggers:document.querySelectorAll('#repo-cards-container .open-drawer-btn').length,drawerClosed:!document.querySelector('#repo-detail-drawer')?.classList.contains('open')};
            const nested=[...document.body.querySelectorAll('*')].filter(el=>{const css=getComputedStyle(el);return ['auto','scroll'].includes(css.overflowY)&&el.scrollHeight>el.clientHeight+2;}).map(el=>el.className);
            return {...weeklyState,lang:document.documentElement.lang,theme:document.documentElement.dataset.theme,background:style.backgroundColor,text:style.color,width:document.documentElement.scrollWidth,viewport:innerWidth,frames:document.querySelectorAll('iframe').length,cards:cards.length,cardText:cards.map(el=>el.textContent.replace(/\s+/g,' ').trim()).join('\n'),cardStyles:cards.map(el=>{const css=getComputedStyle(el);return {width:css.width,minHeight:css.minHeight,background:css.backgroundColor,color:css.color,padding:css.padding,font:css.font,border:css.border};}),languages:[...header.querySelectorAll('[hreflang]')].map(a=>({text:a.textContent,href:a.getAttribute('href'),lang:a.hreflang})),nested,cspViolations:window.cspViolations||[],obsolete:document.querySelectorAll('.nav-style-pill,.site-breadcrumb-bar,[data-builder-style]').length};
          },dedicated);
          assert.equal(state.width,width,`${file} ${width} overflow`);
          assert.equal(state.frames,0,file);
          assert.equal(state.cards,dedicated?7:15,file);
          assert.equal(state.obsolete,0,file);
          assert.deepEqual(state.nested,[],file+': nested scroll');
          assert.deepEqual(state.languages.map(a=>a.text),['EN','中文']);
          assert.deepEqual(state.cspViolations,[],file+': CSP violation');
          if(!dedicated){
            assert.equal(state.theme,'dark');assert.equal(state.background,'rgb(8, 13, 27)');assert.equal(state.text,'rgb(238, 243, 255)');
            assert.equal(state.weeklyCount,3,file+': weekly entries');
            assert.deepEqual(state.weeklyRepos,['https://github.com/thedotmack/claude-mem','https://github.com/pbakaus/impeccable','https://github.com/deepseek-ai/dsh-superagent-prototype']);
            assert.equal(state.drawerTriggers,15,file+': detail triggers');
            assert.equal(state.drawerClosed,true,file+': closed drawer default');
            if(canonicalWeekly)assert.equal(state.weeklyText,canonicalWeekly,file+': weekly JS/no-JS parity');
            else canonicalWeekly=state.weeklyText;
          }
          if(canonical)assert.equal(state.cardText,canonical,file+': canonical text must match JavaScript/no-JS and all widths');
          else canonical=state.cardText;
          await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
          assert.ok(await page.evaluate(()=>scrollY>100),file+': document scroll');
          await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
          if(javascript)await page.screenshot({path:path.join(output,`${file.replaceAll('/','-').replace('.html','')}-${width}.png`)});
          const {cardText,weeklyText,...summary}=state;
          report.layouts.push({file,javascript,width,...summary,cardTextSha256:hash(cardText),weeklyTextSha256:hash(weeklyText)});
          if(javascript&&!dedicated)await checkDrawer(page,file,width);
        }
      }
      const navSelector=dedicated?'.radar-report-nav':'.reading-header';
      const languageSelector=`${navSelector} a[hreflang="${en?'zh-CN':'en'}"]`;
      await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click(languageSelector)]);
      assert.equal(await page.$eval('html',el=>el.lang),en?'zh-CN':'en');
      report.navigation.push({file,action:'native no-JS language switch',url:page.url()});
      await page.goto(`${base}/${file}`,{waitUntil:'networkidle0'});
      const hrefs=await page.$$eval(dedicated?'.radar-report-nav a':'.reading-header a,.reading-context',links=>links.map(a=>a.href));
      for(const href of new Set(hrefs)) {
        const response=await fetch(href);
        assert.equal(response.status,200,file+': navigation '+href);
        report.navigation.push({file,url:href,status:response.status});
      }
      if(!dedicated) {
        await page.setJavaScriptEnabled(true);
        await page.goto(`${base}/${file}`,{waitUntil:'networkidle0'});
        await page.type('#repo-search','pi-durable');
        assert.equal(await page.$$eval('#repo-cards-container .repo-card',els=>els.length),1);
        await page.$eval('#repo-search',el=>{el.value='';el.dispatchEvent(new Event('input',{bubbles:true}));});
        assert.equal(await page.$$eval('#repo-cards-container .repo-card',els=>els.length),15);
        const initial=await page.$eval('#pipe-inspector',el=>el.textContent);
        await page.click('.pipe-step:nth-child(2)');
        assert.notEqual(await page.$eval('#pipe-inspector',el=>el.textContent),initial);
        await page.$eval('#slider-signal',el=>{el.value='0.70';el.dispatchEvent(new Event('input',{bubbles:true}));});
        assert.equal(await page.$eval('#lbl-w-signal',el=>el.textContent),'0.70');
        await checkDrawer(page,file,1440,'reranked');
        await page.click('#reset-weights-btn');
        assert.equal(await page.$eval('#lbl-w-signal',el=>el.textContent),'0.50');
        await page.click('#verdict-filters .chip-btn:nth-child(3)');
        assert.ok(await page.$$eval('#repo-cards-container .repo-card',els=>els.length)<15);
        await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('[data-reading-theme="light"]')]);
        assert.equal(await page.evaluate(()=>localStorage.getItem('kee-aurora-theme-v1')),'light');
        await page.goto(`${base}/${en?'zh-github-radar.html':'github-radar.html'}`,{waitUntil:'networkidle0'});
        assert.equal(await page.$eval('html',el=>el.dataset.theme),'light');
        await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('[data-reading-theme="dark"]')]);
        assert.equal(await page.evaluate(()=>localStorage.getItem('kee-aurora-theme-v1')),'dark');
        report.interactions.push({file,search:true,pipeline:true,weights:true,reset:true,filter:true,sharedVersionedPreference:true});
      } else {
        const original=await browser.newPage();
        await original.setViewport({width:1440,height:900});
        await original.setContent(sourceFor(file),{waitUntil:'load'});
        const originalText=await original.$$eval('.card',cards=>cards.map(el=>el.textContent.replace(/\s+/g,' ').trim()).join('\n'));
        assert.equal(canonical,originalText,file+': report rendered content unchanged');
        const styles=await original.$$eval('.card',cards=>cards.map(el=>{const css=getComputedStyle(el);return {width:css.width,minHeight:css.minHeight,background:css.backgroundColor,color:css.color,padding:css.padding,font:css.font,border:css.border};}));
        assert.deepEqual(report.layouts.find(item=>item.file===file&&item.width===1440).cardStyles,styles,file+': original card design');
        await original.close();
      }
      assert.deepEqual(errors,[],file+': page errors');
      assert.deepEqual(failedRequests,[],file+': failed unblocked requests');
      assert.deepEqual(badResponses,[],file+': resource responses');
      await page.close();
    }
    report.result='PASS';
    console.log(`PASS: ${files.length} pages, ${report.layouts.length} layouts including no-JS, preserved reports/CSP, native navigation and live Radar controls.`);
  } catch(error){report.result='FAIL';report.errors.push(error.stack);throw error;}
  finally{fs.writeFileSync(path.join(output,'radar-validation.json'),JSON.stringify(report,null,2));await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
