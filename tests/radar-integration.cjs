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
    // Round 10 closed-form mathematical assertion (CLAIM-R10-02: 25 videos = 500 shots/mo [300 deterministic + 200 generative -> 100 shared sets], $3/1M VLM in, $15/1M VLM out counted once, $0.50/diffusion call, API-only)
    const r10Shots=25*20;
    assert.equal(r10Shots,500,'R10 total shots/mo');
    const r10PathAVlmIn=500*(0.040*3.00);
    const r10PathAVlmOut=500*(0.002*15.00);
    const r10PathADiff=(500*3)*0.50;
    assert.equal(r10PathAVlmIn.toFixed(2),'60.00','R10 Path A VLM input cost');
    assert.equal(r10PathAVlmOut.toFixed(2),'15.00','R10 Path A VLM output cost (counted once)');
    assert.equal((r10PathAVlmIn+r10PathAVlmOut).toFixed(2),'75.00','R10 Path A VLM subtotal');
    assert.equal(r10PathADiff.toFixed(2),'750.00','R10 Path A diffusion cost');
    assert.equal((r10PathAVlmIn+r10PathAVlmOut+r10PathADiff).toFixed(2),'825.00','R10 Path A monthly API total');
    const r10PathBVlmIn=500*(0.020*3.00);
    const r10PathBVlmOut=500*(0.001*15.00);
    const r10PathBDiff=(350*2)*0.50;
    assert.equal(r10PathBVlmIn.toFixed(2),'30.00','R10 Path B VLM input cost');
    assert.equal(r10PathBVlmOut.toFixed(2),'7.50','R10 Path B VLM output cost (counted once)');
    assert.equal((r10PathBVlmIn+r10PathBVlmOut).toFixed(2),'37.50','R10 Path B VLM subtotal');
    assert.equal(r10PathBDiff.toFixed(2),'350.00','R10 Path B diffusion cost');
    assert.equal((r10PathBVlmIn+r10PathBVlmOut+r10PathBDiff).toFixed(2),'387.50','R10 Path B monthly API total');
    const r10PathCVlmIn=150*(0.015*3.00);
    const r10PathCVlmOut=150*(0.001*15.00);
    const r10PathCDiff=(100*1.5)*0.50;
    assert.equal(r10PathCVlmIn.toFixed(2),'6.75','R10 Path C VLM input cost');
    assert.equal(r10PathCVlmOut.toFixed(2),'2.25','R10 Path C VLM output cost (counted once)');
    assert.equal((r10PathCVlmIn+r10PathCVlmOut).toFixed(2),'9.00','R10 Path C VLM subtotal');
    assert.equal(r10PathCDiff.toFixed(2),'75.00','R10 Path C diffusion cost');
    assert.equal((r10PathCVlmIn+r10PathCVlmOut+r10PathCDiff).toFixed(2),'84.00','R10 Path C monthly API total');
    assert.equal((825.00-84.00).toFixed(2),'741.00','R10 monthly API savings vs Path A');
    assert.equal(((825.00-84.00)*12).toFixed(2),'8892.00','R10 annual API savings vs Path A');
    assert.equal(((825.00-84.00)/825.00*100).toFixed(2),'89.82','R10 pct API savings vs Path A');
    assert.equal((60.0-10.0).toFixed(1),'50.0','R10 triage hours saved vs Path A');
    assert.equal(((60.0-10.0)/60.0*100).toFixed(2),'83.33','R10 pct triage hours saved vs Path A');
    for(const r10File of ['workshops/github-trending-radar/docs/rea-video-shot-forensics-vs-diffusion-remake-selection-faq.md','workshops/github-trending-radar/docs/rea-video-shot-forensics-vs-diffusion-remake-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r10-rea-video-forensics.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-08-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r10File),'utf8');
      assert.ok(txt.includes('825.00')&&txt.includes('387.50')&&txt.includes('84.00')&&txt.includes('741.00')&&txt.includes('89.82%')&&txt.includes('not_measured'),r10File+': contains exact R10 closed-form parameters and API-only scope');
    }
    // Round 11 closed-form mathematical assertion (CLAIM-R11-02: 30 tasks/mo, $3/1M in, $15/1M out counted once, API-only + 512-env mjbatch.h RAM on 32 threads)
    const r11PathAIn=240*(0.060*3.00);
    const r11PathAOut=240*(0.005*15.00);
    assert.equal(r11PathAIn.toFixed(2),'43.20','R11 Path A input cost');
    assert.equal(r11PathAOut.toFixed(2),'18.00','R11 Path A output cost (counted once)');
    assert.equal((r11PathAIn+r11PathAOut).toFixed(2),'61.20','R11 Path A monthly API total');
    const r11PathBIn=150*(0.040*3.00);
    const r11PathBOut=150*(0.004*15.00);
    assert.equal(r11PathBIn.toFixed(2),'18.00','R11 Path B input cost');
    assert.equal(r11PathBOut.toFixed(2),'9.00','R11 Path B output cost (counted once)');
    assert.equal((r11PathBIn+r11PathBOut).toFixed(2),'27.00','R11 Path B monthly API total');
    const r11PathCIn=60*(0.012*3.00);
    const r11PathCOut=60*(0.002*15.00);
    assert.equal(r11PathCIn.toFixed(2),'2.16','R11 Path C input cost');
    assert.equal(r11PathCOut.toFixed(2),'1.80','R11 Path C output cost (counted once)');
    assert.equal((r11PathCIn+r11PathCOut).toFixed(2),'3.96','R11 Path C monthly API total');
    assert.equal((61.20-3.96).toFixed(2),'57.24','R11 monthly API savings vs Path A');
    assert.equal(((61.20-3.96)*12).toFixed(2),'686.88','R11 annual API savings vs Path A');
    assert.equal(((61.20-3.96)/61.20*100).toFixed(2),'93.53','R11 pct API savings vs Path A');
    assert.equal((90.0-15.0).toFixed(1),'75.0','R11 debugging hours saved vs Path A');
    assert.equal(((90.0-15.0)/90.0*100).toFixed(2),'83.33','R11 pct debugging hours saved vs Path A');
    const r11MemA=512*4.0;
    const r11MemC=32*4.0+512*0.015625;
    assert.equal(r11MemA.toFixed(2),'2048.00','R11 Path A full mjData RAM MB');
    assert.equal(r11MemC.toFixed(2),'136.00','R11 Path C mjbatch.h persistent=0 RAM MB');
    assert.equal(((r11MemA-r11MemC)/r11MemA*100).toFixed(2),'93.36','R11 mjbatch.h RAM reduction pct');
    for(const r11File of ['workshops/github-trending-radar/docs/mujoco-4-hybrid-sim-agent-skills-selection-faq.md','workshops/github-trending-radar/docs/mujoco-4-hybrid-sim-agent-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r11-mujoco4-sim-skills.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-08-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r11File),'utf8');
      assert.ok(txt.includes('61.20')&&txt.includes('27.00')&&txt.includes('3.96')&&txt.includes('57.24')&&txt.includes('93.53%')&&txt.includes('136.00 MB')&&txt.includes('not_measured'),r11File+': contains exact R11 closed-form parameters and API-only scope');
    }
    // Round 12 closed-form mathematical assertion (CLAIM-R12-02: 40 diagrams/mo, $3/1M in, $15/1M out counted once, API-only)
    const r12PathAIn=240*(0.025*3.00);
    const r12PathAOut=240*(0.008*15.00);
    assert.equal(r12PathAIn.toFixed(2),'18.00','R12 Path A input cost');
    assert.equal(r12PathAOut.toFixed(2),'28.80','R12 Path A output cost (counted once)');
    assert.equal((r12PathAIn+r12PathAOut).toFixed(2),'46.80','R12 Path A monthly API total');
    const r12PathBIn=120*(0.015*3.00);
    const r12PathBOut=120*(0.004*15.00);
    assert.equal(r12PathBIn.toFixed(2),'5.40','R12 Path B input cost');
    assert.equal(r12PathBOut.toFixed(2),'7.20','R12 Path B output cost (counted once)');
    assert.equal((r12PathBIn+r12PathBOut).toFixed(2),'12.60','R12 Path B monthly API total');
    const r12PathCIn=60*(0.010*3.00);
    const r12PathCOut=60*(0.002*15.00);
    assert.equal(r12PathCIn.toFixed(2),'1.80','R12 Path C input cost');
    assert.equal(r12PathCOut.toFixed(2),'1.80','R12 Path C output cost (counted once)');
    assert.equal((r12PathCIn+r12PathCOut).toFixed(2),'3.60','R12 Path C monthly API total');
    assert.equal((46.80-3.60).toFixed(2),'43.20','R12 monthly API savings vs Path A');
    assert.equal(((46.80-3.60)*12).toFixed(2),'518.40','R12 annual API savings vs Path A');
    assert.equal(((46.80-3.60)/46.80*100).toFixed(2),'92.31','R12 pct API savings vs Path A');
    assert.equal((60.0-8.0).toFixed(1),'52.0','R12 SA formatting hours saved vs Path A');
    assert.equal(((60.0-8.0)/60.0*100).toFixed(2),'86.67','R12 pct SA formatting hours saved vs Path A');
    for(const r12File of ['workshops/github-trending-radar/docs/stack-diagram-official-icons-vs-mermaid-svg-selection-faq.md','workshops/github-trending-radar/docs/stack-diagram-official-icons-vs-mermaid-svg-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r12-stack-diagram-icons.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-08-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r12File),'utf8');
      assert.ok(txt.includes('46.80')&&txt.includes('12.60')&&txt.includes('3.60')&&txt.includes('43.20')&&txt.includes('92.31%')&&(txt.includes('132×100')||txt.includes('132w x 100h')||txt.includes('132w × 100h')),r12File+': contains exact R12 closed-form parameters');
      assert.ok(txt.includes('not_measured'),r12File+': contains not_measured scope marker');
    }
    // Round 13 (elvarofficial/teardown v1.0.0) closed-form FinOps & SA hours assertions
    const r13PathAIn=120*(0.045*3.00);
    const r13PathAOut=120*(0.012*15.00);
    assert.equal(r13PathAIn.toFixed(2),'16.20','R13 Path A input cost');
    assert.equal(r13PathAOut.toFixed(2),'21.60','R13 Path A output cost (counted once)');
    assert.equal((r13PathAIn+r13PathAOut).toFixed(2),'37.80','R13 Path A monthly API total');
    const r13PathBIn=48*(0.025*3.00);
    const r13PathBOut=48*(0.006*15.00);
    assert.equal(r13PathBIn.toFixed(2),'3.60','R13 Path B input cost');
    assert.equal(r13PathBOut.toFixed(2),'4.32','R13 Path B output cost (counted once)');
    assert.equal((r13PathBIn+r13PathBOut).toFixed(2),'7.92','R13 Path B monthly API total');
    const r13PathCIn=24*(0.020*3.00);
    const r13PathCOut=24*(0.004*15.00);
    assert.equal(r13PathCIn.toFixed(2),'1.44','R13 Path C input cost');
    assert.equal(r13PathCOut.toFixed(2),'1.44','R13 Path C output cost (counted once)');
    assert.equal((r13PathCIn+r13PathCOut).toFixed(2),'2.88','R13 Path C monthly API total');
    assert.equal((37.80-2.88).toFixed(2),'34.92','R13 monthly API savings vs Path A');
    assert.equal(((37.80-2.88)*12).toFixed(2),'419.04','R13 annual API savings vs Path A');
    assert.equal(((37.80-2.88)/37.80*100).toFixed(2),'92.38','R13 pct API savings vs Path A');
    assert.equal((72.0-12.0).toFixed(1),'60.0','R13 SA 3D debugging hours saved vs Path A');
    assert.equal(((72.0-12.0)/72.0*100).toFixed(2),'83.33','R13 pct SA 3D debugging hours saved vs Path A');
    for(const r13File of ['workshops/github-trending-radar/docs/teardown-3d-machine-simulator-vs-freehand-threejs-selection-faq.md','workshops/github-trending-radar/docs/teardown-3d-machine-simulator-vs-freehand-threejs-selection-faq.en.md','assets/github-ai-radar-2026-11-08-r13-teardown-3d-sim.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-08-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r13File),'utf8');
      assert.ok(txt.includes('37.80')&&txt.includes('7.92')&&txt.includes('2.88')&&txt.includes('34.92')&&txt.includes('92.38%')&&txt.includes('-14 LUFS'),r13File+': contains exact R13 closed-form parameters');
      assert.ok(txt.includes('not_measured'),r13File+': contains not_measured scope marker');
    }
    // 2026-11-09 Sweep & Round 1 (garrytan/gbrain v0.60.623.0) verification
    const rawHtml1109=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-09-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawHtml1109),'fb22bae9432a6108065aabd68b480fe1d8db159a7ce5dbd89e95a332e9285b61','2026-11-09 raw HTML LF sha256');
    const rawSearch1109Str=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-09-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawSearch1109Str),'2daee4405350717685dd14d5a19186f1b6821216642daab97e6d6605723783e5','2026-11-09 raw Search API JSON LF sha256');
    const rawSearch1109=JSON.parse(rawSearch1109Str);
    const rawSearch1109Map=new Map(rawSearch1109.items.map(it=>[it.full_name,it]));
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_09.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': 11-09 Track A provenance');
      assert.ok(rawHtml1109.includes(`href="/${item.full_name}"`),item.full_name+': present in 11-09 raw HTML');
      assert.ok(rawHtml1109.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in 11-09 raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_09.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': 11-09 Track B stars_today must be not_measured');
      assert.ok(rawSearch1109Map.has(item.full_name),item.full_name+': present in 11-09 Search API JSON');
      assert.equal(item.stars_total_search_api,rawSearch1109Map.get(item.full_name).stargazers_count,item.full_name+': matches 11-09 Search API stargazers_count');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': 11-09 stars_per_day closed-form');
    }
    const r14PathAIn=4500*(0.040*3.00);
    const r14PathAOut=4500*(0.002*15.00);
    assert.equal(r14PathAIn.toFixed(2),'540.00','11-09 R1 gbrain Path A input');
    assert.equal(r14PathAOut.toFixed(2),'135.00','11-09 R1 gbrain Path A output');
    assert.equal((r14PathAIn+r14PathAOut).toFixed(2),'675.00','11-09 R1 gbrain Path A total');
    const r14PathBWrite=1500*(0.010*3.00+0.002*15.00);
    const r14PathBQuery=3600*(0.020*3.00+0.0015*15.00);
    assert.equal(r14PathBWrite.toFixed(2),'90.00','11-09 R1 gbrain Path B write');
    assert.equal(r14PathBQuery.toFixed(2),'297.00','11-09 R1 gbrain Path B query');
    assert.equal((r14PathBWrite+r14PathBQuery).toFixed(2),'387.00','11-09 R1 gbrain Path B total');
    const r14PathCDream=30*0.50;
    const r14PathCQuery=3000*(0.006*3.00+0.001*15.00);
    assert.equal(r14PathCDream.toFixed(2),'15.00','11-09 R1 gbrain Path C dream');
    assert.equal(r14PathCQuery.toFixed(2),'99.00','11-09 R1 gbrain Path C query');
    assert.equal((r14PathCDream+r14PathCQuery).toFixed(2),'114.00','11-09 R1 gbrain Path C total');
    assert.equal((675.00-114.00).toFixed(2),'561.00','11-09 R1 gbrain monthly savings');
    assert.equal(((675.00-114.00)/675.00*100).toFixed(2),'83.11','11-09 R1 gbrain pct savings');
    assert.equal((45.0-6.0).toFixed(1),'39.0','11-09 R1 gbrain hours saved');
    assert.equal(((45.0-6.0)/45.0*100).toFixed(2),'86.67','11-09 R1 gbrain pct hours saved');
    for(const r14File of ['workshops/github-trending-radar/docs/gbrain-hybrid-graph-memory-vs-vector-rag-selection-faq.md','workshops/github-trending-radar/docs/gbrain-hybrid-graph-memory-vs-vector-rag-selection-faq.en.md','assets/github-ai-radar-2026-11-09.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r14File),'utf8');
      assert.ok(txt.includes('675.00')&&txt.includes('387.00')&&txt.includes('114.00')&&txt.includes('561.00')&&txt.includes('83.11%')&&txt.includes('0.6626')&&txt.includes('0.7241')&&txt.includes('not_measured'),r14File+': contains exact 11-09 R1 gbrain closed-form parameters');
    }
    // 2026-11-09 Round 2 (NVIDIA/auto-ontology) closed-form FinOps verification
    const r15PathAIn=10000*(0.050*3.00);
    const r15PathAOut=10000*(0.002*15.00);
    assert.equal(r15PathAIn.toFixed(2),'1500.00','11-09 R2 auto-ontology Path A input');
    assert.equal(r15PathAOut.toFixed(2),'300.00','11-09 R2 auto-ontology Path A output');
    assert.equal((r15PathAIn+r15PathAOut).toFixed(2),'1800.00','11-09 R2 auto-ontology Path A total');
    const r15PathBIn=6400*(0.020*3.00);
    const r15PathBOut=6400*(0.0015*15.00);
    assert.equal(r15PathBIn.toFixed(2),'384.00','11-09 R2 auto-ontology Path B input');
    assert.equal(r15PathBOut.toFixed(2),'144.00','11-09 R2 auto-ontology Path B output');
    assert.equal((r15PathBIn+r15PathBOut).toFixed(2),'528.00','11-09 R2 auto-ontology Path B total');
    const r15PathCCompile=4*6.00;
    const r15PathCQuery=4200*(0.005*3.00+0.001*15.00);
    assert.equal(r15PathCCompile.toFixed(2),'24.00','11-09 R2 auto-ontology Path C compile');
    assert.equal(r15PathCQuery.toFixed(2),'126.00','11-09 R2 auto-ontology Path C query');
    assert.equal((r15PathCCompile+r15PathCQuery).toFixed(2),'150.00','11-09 R2 auto-ontology Path C total');
    assert.equal((1800.00-150.00).toFixed(2),'1650.00','11-09 R2 auto-ontology monthly savings');
    assert.equal(((1800.00-150.00)/1800.00*100).toFixed(2),'91.67','11-09 R2 auto-ontology pct savings');
    assert.equal((80.0-12.0).toFixed(1),'68.0','11-09 R2 auto-ontology hours saved');
    assert.equal(((80.0-12.0)/80.0*100).toFixed(2),'85.00','11-09 R2 auto-ontology pct hours saved');
    for(const r15File of ['workshops/github-trending-radar/docs/auto-ontology-semantic-sql-vs-raw-text2sql-selection-faq.md','workshops/github-trending-radar/docs/auto-ontology-semantic-sql-vs-raw-text2sql-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r2-auto-ontology.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r15File),'utf8');
      assert.ok(txt.includes('1,800.00')&&txt.includes('528.00')&&txt.includes('150.00')&&txt.includes('1,650.00')&&txt.includes('91.67%')&&txt.includes('588.80')&&txt.includes('not_measured'),r15File+': contains exact 11-09 R2 auto-ontology closed-form parameters');
    }
    // 2026-11-09 Round 3 (cloudflare/security-audit-skill) closed-form FinOps verification
    const r16PathAIn=300*(0.060*3.00);
    const r16PathAOut=300*(0.004*15.00);
    assert.equal(r16PathAIn.toFixed(2),'54.00','11-09 R3 security-audit-skill Path A input');
    assert.equal(r16PathAOut.toFixed(2),'18.00','11-09 R3 security-audit-skill Path A output');
    assert.equal((r16PathAIn+r16PathAOut).toFixed(2),'72.00','11-09 R3 security-audit-skill Path A total');
    const r16PathBIn=200*(0.040*3.00);
    const r16PathBOut=200*(0.003*15.00);
    assert.equal(r16PathBIn.toFixed(2),'24.00','11-09 R3 security-audit-skill Path B input');
    assert.equal(r16PathBOut.toFixed(2),'9.00','11-09 R3 security-audit-skill Path B output');
    assert.equal((r16PathBIn+r16PathBOut).toFixed(2),'33.00','11-09 R3 security-audit-skill Path B total');
    const r16PathCIn=80*(0.025*3.00);
    const r16PathCOut=80*(0.002*15.00);
    assert.equal(r16PathCIn.toFixed(2),'6.00','11-09 R3 security-audit-skill Path C input');
    assert.equal(r16PathCOut.toFixed(2),'2.40','11-09 R3 security-audit-skill Path C output');
    assert.equal((r16PathCIn+r16PathCOut).toFixed(2),'8.40','11-09 R3 security-audit-skill Path C total');
    assert.equal((72.00-8.40).toFixed(2),'63.60','11-09 R3 security-audit-skill monthly savings');
    assert.equal(((72.00-8.40)/72.00*100).toFixed(2),'88.33','11-09 R3 security-audit-skill pct savings');
    assert.equal((80.0-12.0).toFixed(1),'68.0','11-09 R3 security-audit-skill hours saved');
    assert.equal(((80.0-12.0)/80.0*100).toFixed(2),'85.00','11-09 R3 security-audit-skill pct hours saved');
    for(const r16File of ['workshops/github-trending-radar/docs/security-audit-skill-ledger-vs-sast-prompt-selection-faq.md','workshops/github-trending-radar/docs/security-audit-skill-ledger-vs-sast-prompt-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r3-security-audit-skill.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r16File),'utf8');
      assert.ok(txt.includes('72.00')&&txt.includes('33.00')&&txt.includes('8.40')&&txt.includes('63.60')&&txt.includes('88.33%')&&txt.includes('validate-coverage-ledger.cjs')&&txt.includes('validate-findings.cjs')&&txt.includes('not_measured'),r16File+': contains exact 11-09 R3 security-audit-skill closed-form parameters');
    }
    // 2026-11-09 Round 4 (max-sixty/worktrunk + backnotprop/plannotator) closed-form FinOps & Disk verification
    const r17DiskA=8*3.50;
    const r17DiskC=3.50+7*0.15;
    assert.equal(r17DiskA.toFixed(2),'28.00','11-09 R4 worktrunk raw disk GB');
    assert.equal(r17DiskC.toFixed(2),'4.55','11-09 R4 worktrunk CoW disk GB');
    assert.equal(((r17DiskA-r17DiskC)/r17DiskA*100).toFixed(2),'83.75','11-09 R4 worktrunk CoW disk reduction pct');
    const r17PathAIn=2400*(0.030*3.00);
    const r17PathAOut=2400*(0.003*15.00);
    assert.equal((r17PathAIn+r17PathAOut).toFixed(2),'324.00','11-09 R4 Path A rework API total');
    const r17PathBIn=1600*(0.025*3.00);
    const r17PathBOut=1600*(0.0025*15.00);
    assert.equal((r17PathBIn+r17PathBOut).toFixed(2),'180.00','11-09 R4 Path B rework API total');
    const r17PathCIn=880*(0.015*3.00);
    const r17PathCOut=880*(0.0015*15.00);
    assert.equal((r17PathCIn+r17PathCOut).toFixed(2),'59.40','11-09 R4 Path C rework API total');
    assert.equal((324.00-59.40).toFixed(2),'264.60','11-09 R4 monthly API savings');
    assert.equal(((324.00-59.40)/324.00*100).toFixed(2),'81.67','11-09 R4 pct API savings');
    assert.equal((64.0-12.0).toFixed(1),'52.0','11-09 R4 hours saved');
    assert.equal(((64.0-12.0)/64.0*100).toFixed(2),'81.25','11-09 R4 pct hours saved');
    for(const r17File of ['workshops/github-trending-radar/docs/worktrunk-plannotator-hitl-vs-raw-git-worktree-selection-faq.md','workshops/github-trending-radar/docs/worktrunk-plannotator-hitl-vs-raw-git-worktree-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r4-worktrunk-plannotator.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r17File),'utf8');
      assert.ok(txt.includes('324.00')&&txt.includes('180.00')&&txt.includes('59.40')&&txt.includes('264.60')&&txt.includes('81.67%')&&txt.includes('28.00')&&txt.includes('4.55')&&txt.includes('83.75%')&&txt.includes('not_measured'),r17File+': contains exact 11-09 R4 worktrunk+plannotator closed-form parameters');
    }
    // 2026-11-09 Round 5 (OpenBMB/VoxCPM2 v2.0.3) closed-form FinOps verification
    const r18PathA=50*180.00;
    const r18PathB=1000*0.36*2.50*0.80;
    const r18PathC=1000*0.13*1.25*0.80;
    assert.equal(r18PathA.toFixed(2),'9000.00','11-09 R5 VoxCPM2 Path A total');
    assert.equal(r18PathB.toFixed(2),'720.00','11-09 R5 VoxCPM2 Path B total');
    assert.equal(r18PathC.toFixed(2),'130.00','11-09 R5 VoxCPM2 Path C total');
    assert.equal((r18PathA-r18PathC).toFixed(2),'8870.00','11-09 R5 VoxCPM2 savings vs Path A');
    assert.equal(((r18PathA-r18PathC)/r18PathA*100).toFixed(2),'98.56','11-09 R5 VoxCPM2 pct savings vs Path A');
    assert.equal((r18PathB-r18PathC).toFixed(2),'590.00','11-09 R5 VoxCPM2 savings vs Path B');
    assert.equal(((r18PathB-r18PathC)/r18PathB*100).toFixed(2),'81.94','11-09 R5 VoxCPM2 pct savings vs Path B');
    for(const r18File of ['workshops/github-trending-radar/docs/voxcpm2-tokenizer-free-tts-vs-discrete-codec-selection-faq.md','workshops/github-trending-radar/docs/voxcpm2-tokenizer-free-tts-vs-discrete-codec-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r5-voxcpm2-tts.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r18File),'utf8');
      assert.ok(txt.includes('9,000.00')&&txt.includes('720.00')&&txt.includes('130.00')&&txt.includes('8,870.00')&&txt.includes('98.56%')&&txt.includes('81.94%')&&txt.includes('not_measured'),r18File+': contains exact 11-09 R5 VoxCPM2 closed-form parameters');
    }
    // 2026-11-09 Round 6 (ruvnet/RuView + homeassistant-ai/ha-mcp) closed-form FinOps verification
    const r19PathAIn=12000*(0.025*3.00);
    const r19PathAOut=12000*(0.001*15.00);
    assert.equal((r19PathAIn+r19PathAOut).toFixed(2),'1080.00','11-09 R6 RuView+ha-mcp Path A total');
    const r19PathBIn=9000*(0.015*3.00);
    const r19PathBOut=9000*(0.001*15.00);
    assert.equal((r19PathBIn+r19PathBOut).toFixed(2),'540.00','11-09 R6 RuView+ha-mcp Path B total');
    const r19PathCIn=1500*(0.004*3.00);
    const r19PathCOut=1500*(0.0006*15.00);
    assert.equal((r19PathCIn+r19PathCOut).toFixed(2),'31.50','11-09 R6 RuView+ha-mcp Path C total');
    assert.equal((1080.00-31.50).toFixed(2),'1048.50','11-09 R6 RuView+ha-mcp savings vs Path A');
    assert.equal(((1080.00-31.50)/1080.00*100).toFixed(2),'97.08','11-09 R6 RuView+ha-mcp pct savings vs Path A');
    assert.equal((60.0-9.0).toFixed(1),'51.0','11-09 R6 RuView+ha-mcp hours saved');
    assert.equal(((60.0-9.0)/60.0*100).toFixed(2),'85.00','11-09 R6 RuView+ha-mcp pct hours saved');
    for(const r19File of ['workshops/github-trending-radar/docs/ruview-wifi-csi-ha-mcp-vs-camera-iot-selection-faq.md','workshops/github-trending-radar/docs/ruview-wifi-csi-ha-mcp-vs-camera-iot-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r6-ruview-ha-mcp.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r19File),'utf8');
      assert.ok(txt.includes('1,080.00')&&txt.includes('540.00')&&txt.includes('31.50')&&txt.includes('1,048.50')&&txt.includes('97.08%')&&txt.includes('21')&&txt.includes('not_measured'),r19File+': contains exact 11-09 R6 RuView+ha-mcp closed-form parameters');
    }
    // 2026-11-09 Round 7 (haydenschmitty/floorplan + heydamir/unslop) closed-form FinOps verification
    const r20PathAIn=192*(0.045*3.00);
    const r20PathAOut=192*(0.008*15.00);
    assert.equal(r20PathAIn.toFixed(2),'25.92','11-09 R7 floorplan+unslop Path A input');
    assert.equal(r20PathAOut.toFixed(2),'23.04','11-09 R7 floorplan+unslop Path A output');
    assert.equal((r20PathAIn+r20PathAOut).toFixed(2),'48.96','11-09 R7 floorplan+unslop Path A total');
    const r20PathBIn=96*(0.030*3.00);
    const r20PathBOut=96*(0.005*15.00);
    assert.equal((r20PathBIn+r20PathBOut).toFixed(2),'15.84','11-09 R7 floorplan+unslop Path B total');
    const r20PathCIn=48*(0.020*3.00);
    const r20PathCOut=48*(0.003*15.00);
    assert.equal((r20PathCIn+r20PathCOut).toFixed(2),'5.04','11-09 R7 floorplan+unslop Path C total');
    assert.equal((48.96-5.04).toFixed(2),'43.92','11-09 R7 floorplan+unslop savings vs Path A');
    assert.equal(((48.96-5.04)/48.96*100).toFixed(2),'89.71','11-09 R7 floorplan+unslop pct savings vs Path A');
    assert.equal((96.0-16.0).toFixed(1),'80.0','11-09 R7 floorplan+unslop hours saved');
    assert.equal(((96.0-16.0)/96.0*100).toFixed(2),'83.33','11-09 R7 floorplan+unslop pct hours saved');
    for(const r20File of ['workshops/github-trending-radar/docs/floorplan-unslop-codebase-map-vs-static-uml-selection-faq.md','workshops/github-trending-radar/docs/floorplan-unslop-codebase-map-vs-static-uml-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r7-floorplan-unslop.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r20File),'utf8');
      assert.ok(txt.includes('48.96')&&txt.includes('15.84')&&txt.includes('5.04')&&txt.includes('43.92')&&txt.includes('89.71%')&&txt.includes('not_measured'),r20File+': contains exact 11-09 R7 floorplan+unslop closed-form parameters');
    }
    // 2026-11-09 Round 8 (HKUDS/DeepTutor + Verlintas/NOIR) closed-form FinOps verification
    const r21PathAIn=9000*(0.030*3.00);
    const r21PathAOut=9000*(0.002*15.00);
    assert.equal((r21PathAIn+r21PathAOut).toFixed(2),'1080.00','11-09 R8 DeepTutor+NOIR Path A total');
    const r21PathBIn=4500*(0.020*3.00);
    const r21PathBOut=4500*(0.0015*15.00);
    assert.equal((r21PathBIn+r21PathBOut).toFixed(2),'371.25','11-09 R8 DeepTutor+NOIR Path B total');
    const r21PathCIn=2500*(0.010*3.00);
    const r21PathCOut=2500*(0.001*15.00);
    assert.equal((r21PathCIn+r21PathCOut).toFixed(2),'112.50','11-09 R8 DeepTutor+NOIR Path C total');
    assert.equal((1080.00-112.50).toFixed(2),'967.50','11-09 R8 DeepTutor+NOIR savings vs Path A');
    assert.equal(((1080.00-112.50)/1080.00*100).toFixed(2),'89.58','11-09 R8 DeepTutor+NOIR pct savings vs Path A');
    assert.equal((75.0-15.0).toFixed(1),'60.0','11-09 R8 DeepTutor+NOIR hours saved');
    assert.equal(((75.0-15.0)/75.0*100).toFixed(2),'80.00','11-09 R8 DeepTutor+NOIR pct hours saved');
    for(const r21File of ['workshops/github-trending-radar/docs/deeptutor-noir-adaptive-agent-selection-faq.md','workshops/github-trending-radar/docs/deeptutor-noir-adaptive-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r8-deeptutor-noir.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r21File),'utf8');
      assert.ok(txt.includes('1,080.00')&&txt.includes('371.25')&&txt.includes('112.50')&&txt.includes('967.50')&&txt.includes('89.58%')&&txt.includes('not_measured'),r21File+': contains exact 11-09 R8 DeepTutor+NOIR closed-form parameters');
    }
    // 2026-11-09 Round 9 (kortix-ai/CompanyOS + pingdotgg/t3code) closed-form FinOps verification
    const r22VmA=50*720*0.10;
    const r22ApiA=10000*0.0900;
    assert.equal((r22VmA+r22ApiA).toFixed(2),'4500.00','11-09 R9 CompanyOS+t3code Path A total');
    const r22ApiB=5000*0.0900;
    assert.equal((r22VmA+r22ApiB).toFixed(2),'4050.00','11-09 R9 CompanyOS+t3code Path B total');
    const r22VmC=50*120*0.10;
    const r22ApiC=2500*0.0900;
    assert.equal((r22VmC+r22ApiC).toFixed(2),'825.00','11-09 R9 CompanyOS+t3code Path C total');
    assert.equal((4500.00-825.00).toFixed(2),'3675.00','11-09 R9 CompanyOS+t3code savings vs Path A');
    assert.equal(((4500.00-825.00)/4500.00*100).toFixed(2),'81.67','11-09 R9 CompanyOS+t3code pct savings vs Path A');
    assert.equal((60.0-12.0).toFixed(1),'48.0','11-09 R9 CompanyOS+t3code hours saved');
    assert.equal(((60.0-12.0)/60.0*100).toFixed(2),'80.00','11-09 R9 CompanyOS+t3code pct hours saved');
    for(const r22File of ['workshops/github-trending-radar/docs/companyos-t3code-control-surface-vs-local-cli-selection-faq.md','workshops/github-trending-radar/docs/companyos-t3code-control-surface-vs-local-cli-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r9-companyos-t3code.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r22File),'utf8');
      assert.ok(txt.includes('4,500.00')&&txt.includes('4,050.00')&&txt.includes('825.00')&&txt.includes('3,675.00')&&txt.includes('81.67%')&&txt.includes('not_measured'),r22File+': contains exact 11-09 R9 CompanyOS+t3code closed-form parameters');
    }
    // 2026-11-09 Round 10 (anthropics/claude-plugins-official + patch-gg/pixelfx) closed-form FinOps verification
    const r23PathALlm=480*(0.030*3.00+0.006*15.00);
    const r23PathADiff=300*0.12;
    assert.equal(r23PathALlm.toFixed(2),'86.40','11-09 R10 Path A LLM');
    assert.equal(r23PathADiff.toFixed(2),'36.00','11-09 R10 Path A diff');
    assert.equal((r23PathALlm+r23PathADiff).toFixed(2),'122.40','11-09 R10 Path A total');
    const r23PathB=300*(0.025*3.00+0.005*15.00);
    assert.equal(r23PathB.toFixed(2),'45.00','11-09 R10 Path B total');
    const r23PathC=120*(0.015*3.00+0.002*15.00);
    assert.equal(r23PathC.toFixed(2),'9.00','11-09 R10 Path C total');
    assert.equal((122.40-9.00).toFixed(2),'113.40','11-09 R10 savings vs Path A');
    assert.equal(((122.40-9.00)/122.40*100).toFixed(2),'92.65','11-09 R10 pct savings vs Path A');
    assert.equal((72.0-12.0).toFixed(1),'60.0','11-09 R10 hours saved');
    assert.equal(((72.0-12.0)/72.0*100).toFixed(2),'83.33','11-09 R10 pct hours saved');
    for(const r23File of ['workshops/github-trending-radar/docs/claude-plugins-pixelfx-skill-bundle-selection-faq.md','workshops/github-trending-radar/docs/claude-plugins-pixelfx-skill-bundle-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r10-claude-plugins-pixelfx.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r23File),'utf8');
      assert.ok(txt.includes('122.40')&&txt.includes('45.00')&&txt.includes('9.00')&&txt.includes('113.40')&&txt.includes('92.65%')&&txt.includes('244')&&txt.includes('not_measured'),r23File+': contains exact 11-09 R10 claude-plugins+pixelfx closed-form parameters');
    }
    // 2026-11-09 Round 11 (D4Vinci/Scrapling + The-PR-Agent/pr-agent) closed-form FinOps verification
    const r24WebA=5000*(0.040*3.00+0.001*15.00);
    const r24PrA=5000*(0.030*3.00+0.002*15.00);
    assert.equal((r24WebA+r24PrA).toFixed(2),'1275.00','11-09 R11 Scrapling+pr-agent Path A total');
    const r24WebB=1000*(0.040*3.00+0.001*15.00);
    const r24PrB=1000*(0.060*3.00+0.003*15.00);
    assert.equal((r24WebB+r24PrB).toFixed(2),'360.00','11-09 R11 Scrapling+pr-agent Path B total');
    const r24WebC=500*(0.004*3.00+0.0005*15.00);
    const r24PrC=1000*(0.008*3.00+0.0012*15.00);
    assert.equal((r24WebC+r24PrC).toFixed(2),'51.75','11-09 R11 Scrapling+pr-agent Path C total');
    assert.equal((1275.00-51.75).toFixed(2),'1223.25','11-09 R11 savings vs Path A');
    assert.equal(((1275.00-51.75)/1275.00*100).toFixed(2),'95.94','11-09 R11 pct savings vs Path A');
    assert.equal((60.0-9.0).toFixed(1),'51.0','11-09 R11 hours saved');
    assert.equal(((60.0-9.0)/60.0*100).toFixed(2),'85.00','11-09 R11 pct hours saved');
    for(const r24File of ['workshops/github-trending-radar/docs/scrapling-pr-agent-adaptive-extraction-selection-faq.md','workshops/github-trending-radar/docs/scrapling-pr-agent-adaptive-extraction-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r11-scrapling-pr-agent.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r24File),'utf8');
      assert.ok(txt.includes('1,275.00')&&txt.includes('360.00')&&txt.includes('51.75')&&txt.includes('1,223.25')&&txt.includes('95.94%')&&txt.includes('not_measured'),r24File+': contains exact 11-09 R11 Scrapling+pr-agent closed-form parameters');
    }
    // 2026-11-09 Round 12 (longbridge/gpui-kit + ooolabdev/ooosplat) closed-form FinOps & RAM verification
    const r25RamA=6*240.00;
    const r25RamC=180.00;
    assert.equal(r25RamA.toFixed(2),'1440.00','11-09 R12 Electron RAM MB');
    assert.equal(((r25RamA-r25RamC)/r25RamA*100).toFixed(2),'87.50','11-09 R12 RAM reduction pct');
    const r25PathA=80*12.00+120*0.1950;
    const r25PathB=240*0.1950;
    const r25PathC=40*0.1050;
    assert.equal(r25PathA.toFixed(2),'983.40','11-09 R12 Path A total');
    assert.equal(r25PathB.toFixed(2),'46.80','11-09 R12 Path B total');
    assert.equal(r25PathC.toFixed(2),'4.20','11-09 R12 Path C total');
    assert.equal((r25PathA-r25PathC).toFixed(2),'979.20','11-09 R12 savings vs Path A');
    assert.equal(((r25PathA-r25PathC)/r25PathA*100).toFixed(2),'99.57','11-09 R12 pct savings vs Path A');
    for(const r25File of ['workshops/github-trending-radar/docs/gpui-kit-ooosplat-rust-native-3dgs-selection-faq.md','workshops/github-trending-radar/docs/gpui-kit-ooosplat-rust-native-3dgs-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r12-gpui-kit-ooosplat.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r25File),'utf8');
      assert.ok(txt.includes('983.40')&&txt.includes('46.80')&&txt.includes('4.20')&&txt.includes('979.20')&&txt.includes('99.57%')&&txt.includes('1,440.00')&&txt.includes('180.00')&&txt.includes('87.50%')&&txt.includes('not_measured'),r25File+': contains exact 11-09 R12 gpui-kit+ooosplat closed-form parameters');
    }
    // 2026-11-09 Round 13 (virattt/dexter v1.0.6 + ZhuLinsen/daily_stock_analysis) closed-form FinOps verification
    const r26DeepA=1000*(0.95*2.50+0.012*10.00);
    const r26RetryA=220*(0.38*2.50);
    const r26TriageA=290*4.00;
    const r26PathA=r26DeepA+r26RetryA+r26TriageA;
    assert.equal(r26DeepA.toFixed(2),'2495.00','11-09 R13 Path A deep research tokens');
    assert.equal(r26RetryA.toFixed(2),'209.00','11-09 R13 Path A retry loop waste');
    assert.equal(r26TriageA.toFixed(2),'1160.00','11-09 R13 Path A false alert triage');
    assert.equal(r26PathA.toFixed(2),'3864.00','11-09 R13 Path A total');
    const r26DeepB=1000*(0.34*2.50+0.012*10.00);
    const r26RetryB=15*(0.38*2.50);
    const r26TriageB=24*4.00;
    const r26PathB=r26DeepB+r26RetryB+r26TriageB;
    assert.equal(r26DeepB.toFixed(2),'970.00','11-09 R13 Path B deep research tokens');
    assert.equal(r26RetryB.toFixed(2),'14.25','11-09 R13 Path B retry loop waste');
    assert.equal(r26TriageB.toFixed(2),'96.00','11-09 R13 Path B false alert triage');
    assert.equal(r26PathB.toFixed(2),'1080.25','11-09 R13 Path B total');
    assert.equal((r26PathA-r26PathB).toFixed(2),'2783.75','11-09 R13 savings vs Path A');
    assert.equal(((r26PathA-r26PathB)/r26PathA*100).toFixed(2),'72.04','11-09 R13 pct savings vs Path A');
    for(const r26File of ['workshops/github-trending-radar/docs/dexter-daily-stock-finagent-guardrail-selection-faq.md','workshops/github-trending-radar/docs/dexter-daily-stock-finagent-guardrail-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r13-dexter-daily-stock.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r26File),'utf8');
      assert.ok(txt.includes('2,495.00')&&txt.includes('209.00')&&txt.includes('1,160.00')&&txt.includes('3,864.00')&&txt.includes('970.00')&&txt.includes('14.25')&&txt.includes('96.00')&&txt.includes('1,080.25')&&txt.includes('2,783.75')&&txt.includes('72.04%')&&txt.includes('not_measured'),r26File+': contains exact 11-09 R13 dexter+daily_stock_analysis closed-form parameters');
    }
    // 2026-11-09 Round 14 (basketikun/infinite-canvas v0.20.0 + OpenCut-app/OpenCut) closed-form FinOps verification
    const r27TokA=2520*(0.028*2.50+0.002*10.00);
    const r27WasteA=288*0.25;
    const r27NleA=8*24.00+60*3.50;
    const r27LabA=30.0*60.00;
    const r27PathA=r27TokA+r27WasteA+r27NleA+r27LabA;
    assert.equal(r27TokA.toFixed(2),'226.80','11-09 R14 Path A orchestration tokens');
    assert.equal(r27WasteA.toFixed(2),'72.00','11-09 R14 Path A wasted regenerations');
    assert.equal(r27NleA.toFixed(2),'402.00','11-09 R14 Path A cloud NLE seats & export');
    assert.equal(r27LabA.toFixed(2),'1800.00','11-09 R14 Path A manual labor');
    assert.equal(r27PathA.toFixed(2),'2500.80','11-09 R14 Path A total');
    const r27TokB=720*(0.008*2.50+0.001*10.00);
    const r27WasteB=58*0.25;
    const r27NleB=0.00;
    const r27LabB=6.0*60.00;
    const r27PathB=r27TokB+r27WasteB+r27NleB+r27LabB;
    assert.equal(r27TokB.toFixed(2),'21.60','11-09 R14 Path B orchestration tokens');
    assert.equal(r27WasteB.toFixed(2),'14.50','11-09 R14 Path B wasted regenerations');
    assert.equal(r27LabB.toFixed(2),'360.00','11-09 R14 Path B labor');
    assert.equal(r27PathB.toFixed(2),'396.10','11-09 R14 Path B total');
    assert.equal((r27PathA-r27PathB).toFixed(2),'2104.70','11-09 R14 savings vs Path A');
    assert.equal(((r27PathA-r27PathB)/r27PathA*100).toFixed(2),'84.16','11-09 R14 pct savings vs Path A');
    for(const r27File of ['workshops/github-trending-radar/docs/opencut-infinite-canvas-video-spatial-selection-faq.md','workshops/github-trending-radar/docs/opencut-infinite-canvas-video-spatial-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r14-opencut-infinite-canvas.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r27File),'utf8');
      assert.ok(txt.includes('226.80')&&txt.includes('72.00')&&txt.includes('402.00')&&txt.includes('1,800.00')&&txt.includes('2,500.80')&&txt.includes('21.60')&&txt.includes('14.50')&&txt.includes('360.00')&&txt.includes('396.10')&&txt.includes('2,104.70')&&txt.includes('84.16%')&&txt.includes('127.0.0.1:17371')&&txt.includes('not_measured'),r27File+': contains exact 11-09 R14 OpenCut+infinite-canvas closed-form parameters');
    }
    // 2026-11-09 Round 15 (vercel-labs/agent-browser v0.41.2 + wangzan101/Mika) closed-form FinOps verification
    const r28TokA=24000*(0.018*2.50+0.0005*10.00);
    const r28RetA=6000*(0.018*2.50+0.0005*10.00);
    const r28LabA=50.0*40.00;
    const r28PathA=r28TokA+r28RetA+r28LabA;
    assert.equal(r28TokA.toFixed(2),'1200.00','11-09 R15 Path A step tokens');
    assert.equal(r28RetA.toFixed(2),'300.00','11-09 R15 Path A occlusion retries');
    assert.equal(r28LabA.toFixed(2),'2000.00','11-09 R15 Path A foreground lock');
    assert.equal(r28PathA.toFixed(2),'3500.00','11-09 R15 Path A total');
    const r28TokB=24000*(0.0024*2.50+0.0002*10.00);
    const r28RetB=720*(0.0024*2.50+0.0002*10.00);
    const r28LabB=1.0*40.00;
    const r28PathB=r28TokB+r28RetB+r28LabB;
    assert.equal(r28TokB.toFixed(2),'192.00','11-09 R15 Path B step tokens');
    assert.equal(r28RetB.toFixed(2),'5.76','11-09 R15 Path B occlusion retries');
    assert.equal(r28LabB.toFixed(2),'40.00','11-09 R15 Path B HITL handoff');
    assert.equal(r28PathB.toFixed(2),'237.76','11-09 R15 Path B total');
    assert.equal((r28PathA-r28PathB).toFixed(2),'3262.24','11-09 R15 savings vs Path A');
    assert.equal(((r28PathA-r28PathB)/r28PathA*100).toFixed(2),'93.21','11-09 R15 pct savings vs Path A');
    for(const r28File of ['workshops/github-trending-radar/docs/mika-agent-browser-gui-automation-selection-faq.md','workshops/github-trending-radar/docs/mika-agent-browser-gui-automation-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r15-mika-agent-browser.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r28File),'utf8');
      assert.ok(txt.includes('1,200.00')&&txt.includes('300.00')&&txt.includes('2,000.00')&&txt.includes('3,500.00')&&txt.includes('192.00')&&txt.includes('5.76')&&txt.includes('40.00')&&txt.includes('237.76')&&txt.includes('3,262.24')&&txt.includes('93.21%')&&txt.includes('not_measured'),r28File+': contains exact 11-09 R15 Mika+agent-browser closed-form parameters');
    }
    // 2026-11-09 Round 16 (JuneYaooo/rea-video v0.1.0 + google-deepmind/mujoco v4.0.1) closed-form FinOps verification
    const r29VlmA=200*(0.120*2.50+0.004*10.00);
    const r29StemA=200*0.50;
    const r29DiffA=40*15*1.20;
    const r29LabA=60.0*50.00;
    const r29PathA=r29VlmA+r29StemA+r29DiffA+r29LabA;
    assert.equal(r29VlmA.toFixed(2),'68.00','11-09 R16 Path A VLM tokens');
    assert.equal(r29StemA.toFixed(2),'100.00','11-09 R16 Path A cloud stem API');
    assert.equal(r29DiffA.toFixed(2),'720.00','11-09 R16 Path A blind diffusion');
    assert.equal(r29LabA.toFixed(2),'3000.00','11-09 R16 Path A manual labor');
    assert.equal(r29PathA.toFixed(2),'3888.00','11-09 R16 Path A total');
    const r29VlmB=200*(0.018*2.50+0.002*10.00);
    const r29StemB=0.00;
    const r29DiffB=40*2*1.20;
    const r29LabB=10.0*50.00;
    const r29PathB=r29VlmB+r29StemB+r29DiffB+r29LabB;
    assert.equal(r29VlmB.toFixed(2),'13.00','11-09 R16 Path B VLM tokens');
    assert.equal(r29DiffB.toFixed(2),'96.00','11-09 R16 Path B MuJoCo-conditioned gen');
    assert.equal(r29LabB.toFixed(2),'500.00','11-09 R16 Path B labor');
    assert.equal(r29PathB.toFixed(2),'609.00','11-09 R16 Path B total');
    assert.equal((r29PathA-r29PathB).toFixed(2),'3279.00','11-09 R16 savings vs Path A');
    assert.equal(((r29PathA-r29PathB)/r29PathA*100).toFixed(2),'84.34','11-09 R16 pct savings vs Path A');
    for(const r29File of ['workshops/github-trending-radar/docs/mujoco-rea-video-physics-video-forensics-selection-faq.md','workshops/github-trending-radar/docs/mujoco-rea-video-physics-video-forensics-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r16-mujoco-rea-video.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r29File),'utf8');
      assert.ok(txt.includes('68.00')&&txt.includes('100.00')&&txt.includes('720.00')&&txt.includes('3,000.00')&&txt.includes('3,888.00')&&txt.includes('13.00')&&txt.includes('96.00')&&txt.includes('500.00')&&txt.includes('609.00')&&txt.includes('3,279.00')&&txt.includes('84.34%')&&txt.includes('not_measured'),r29File+': contains exact 11-09 R16 MuJoCo+rea-video closed-form parameters');
    }
    // 2026-11-09 Round 17 (anthropics/claude-quickstarts + modelflare-ai/AnyModelBot v0.1.30) closed-form FinOps verification
    const r30QaA=1500*(0.060*3.00+0.0015*15.00);
    const r30SenA=170*1.50+30*8.50;
    const r30SeatA=15*60.00;
    const r30PathA=r30QaA+r30SenA+r30SeatA;
    assert.equal(r30QaA.toFixed(2),'303.75','11-09 R17 Path A deal-room Q&A');
    assert.equal(r30SenA.toFixed(2),'510.00','11-09 R17 Path A Sentry autofix');
    assert.equal(r30SeatA.toFixed(2),'900.00','11-09 R17 Path A multi-vendor seats');
    assert.equal(r30PathA.toFixed(2),'1713.75','11-09 R17 Path A total');
    const r30QaB=12.00+1500*(0.008*3.00+0.001*15.00);
    const r30SenB=170*1.50+30*2.00;
    const r30SeatB=15*12.00;
    const r30PathB=r30QaB+r30SenB+r30SeatB;
    assert.equal(r30QaB.toFixed(2),'70.50','11-09 R17 Path B knowledge-wiki Q&A');
    assert.equal(r30SenB.toFixed(2),'315.00','11-09 R17 Path B capped Sentry autofix');
    assert.equal(r30SeatB.toFixed(2),'180.00','11-09 R17 Path B AnyModelBot pay-per-use');
    assert.equal(r30PathB.toFixed(2),'565.50','11-09 R17 Path B total');
    assert.equal((r30PathA-r30PathB).toFixed(2),'1148.25','11-09 R17 savings vs Path A');
    assert.equal(((r30PathA-r30PathB)/r30PathA*100).toFixed(2),'67.00','11-09 R17 pct savings vs Path A');
    for(const r30File of ['workshops/github-trending-radar/docs/claude-quickstarts-anymodelbot-managed-harness-selection-faq.md','workshops/github-trending-radar/docs/claude-quickstarts-anymodelbot-managed-harness-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r17-claude-quickstarts-anymodelbot.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r30File),'utf8');
      assert.ok(txt.includes('303.75')&&txt.includes('510.00')&&txt.includes('900.00')&&txt.includes('1,713.75')&&txt.includes('70.50')&&txt.includes('315.00')&&txt.includes('180.00')&&txt.includes('565.50')&&txt.includes('1,148.25')&&txt.includes('67.00%')&&txt.includes('not_measured'),r30File+': contains exact 11-09 R17 claude-quickstarts+AnyModelBot closed-form parameters');
    }
    // 2026-11-09 Round 18 (mromidev/claude-animated-shorts + sarpstar/cinecode) closed-form FinOps verification
    const r31GenA=6240*4.0*0.15;
    const r31RewA=32.0*55.00;
    const r31AudA=32.0*55.00;
    const r31PathA=r31GenA+r31RewA+r31AudA;
    assert.equal(r31GenA.toFixed(2),'3744.00','11-09 R18 Path A diffusion gen');
    assert.equal(r31RewA.toFixed(2),'1760.00','11-09 R18 Path A style rework');
    assert.equal(r31AudA.toFixed(2),'1760.00','11-09 R18 Path A manual audio');
    assert.equal(r31PathA.toFixed(2),'7264.00','11-09 R18 Path A total');
    const r31GenB=32*4.50;
    const r31RewB=4.0*55.00;
    const r31AudB=4.0*55.00;
    const r31PathB=r31GenB+r31RewB+r31AudB;
    assert.equal(r31GenB.toFixed(2),'144.00','11-09 R18 Path B code LLM');
    assert.equal(r31RewB.toFixed(2),'220.00','11-09 R18 Path B 2-scene gate QA');
    assert.equal(r31AudB.toFixed(2),'220.00','11-09 R18 Path B auto words/LUFS');
    assert.equal(r31PathB.toFixed(2),'584.00','11-09 R18 Path B total');
    assert.equal((r31PathA-r31PathB).toFixed(2),'6680.00','11-09 R18 savings vs Path A');
    assert.equal(((r31PathA-r31PathB)/r31PathA*100).toFixed(2),'91.96','11-09 R18 pct savings vs Path A');
    for(const r31File of ['workshops/github-trending-radar/docs/animated-shorts-cinecode-programmatic-video-selection-faq.md','workshops/github-trending-radar/docs/animated-shorts-cinecode-programmatic-video-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r18-animated-shorts-cinecode.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r31File),'utf8');
      assert.ok(txt.includes('3,744.00')&&txt.includes('1,760.00')&&txt.includes('7,264.00')&&txt.includes('144.00')&&txt.includes('220.00')&&txt.includes('584.00')&&txt.includes('6,680.00')&&txt.includes('91.96%')&&txt.includes('not_measured'),r31File+': contains exact 11-09 R18 animated-shorts+cinecode closed-form parameters');
    }
    // 2026-11-09 Round 19 (wquguru/cicada v1.7.0 + lexifina/global-law) closed-form FinOps verification
    const r32MeetA=20*30.00+400*1.80;
    const r32RagA=600*(0.045*3.00+0.002*15.00);
    const r32RewA=30.0*90.00;
    const r32PathA=r32MeetA+r32RagA+r32RewA;
    assert.equal(r32MeetA.toFixed(2),'1320.00','11-09 R19 Path A meeting seats & interp');
    assert.equal(r32RagA.toFixed(2),'99.00','11-09 R19 Path A legal RAG tokens');
    assert.equal(r32RewA.toFixed(2),'2700.00','11-09 R19 Path A anachronism rework');
    assert.equal(r32PathA.toFixed(2),'4119.00','11-09 R19 Path A total');
    const r32MeetB=400*0.25;
    const r32RagB=600*(0.006*3.00+0.001*15.00);
    const r32RewB=2.0*90.00;
    const r32PathB=r32MeetB+r32RagB+r32RewB;
    assert.equal(r32MeetB.toFixed(2),'100.00','11-09 R19 Path B Cicada LLM notes');
    assert.equal(r32RagB.toFixed(2),'19.80','11-09 R19 Path B global-law MCP tokens');
    assert.equal(r32RewB.toFixed(2),'180.00','11-09 R19 Path B legal review');
    assert.equal(r32PathB.toFixed(2),'299.80','11-09 R19 Path B total');
    assert.equal((r32PathA-r32PathB).toFixed(2),'3819.20','11-09 R19 savings vs Path A');
    assert.equal(((r32PathA-r32PathB)/r32PathA*100).toFixed(2),'92.72','11-09 R19 pct savings vs Path A');
    for(const r32File of ['workshops/github-trending-radar/docs/cicada-global-law-interpreting-git-law-selection-faq.md','workshops/github-trending-radar/docs/cicada-global-law-interpreting-git-law-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r19-cicada-global-law.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r32File),'utf8');
      assert.ok(txt.includes('1,320.00')&&txt.includes('99.00')&&txt.includes('2,700.00')&&txt.includes('4,119.00')&&txt.includes('100.00')&&txt.includes('19.80')&&txt.includes('180.00')&&txt.includes('299.80')&&txt.includes('3,819.20')&&txt.includes('92.72%')&&txt.includes('not_measured'),r32File+': contains exact 11-09 R19 Cicada+global-law closed-form parameters');
    }
    // 2026-11-09 Round 20 (N1nEmAn/sapper-v2 + sherlock-project/sherlock v0.16.2) closed-form FinOps verification
    const r33SwmA=40*(90*1.00+3*4.00);
    const r33OsiA=1000*0.65;
    const r33TriA=60.0*75.00;
    const r33PathA=r33SwmA+r33OsiA+r33TriA;
    assert.equal(r33SwmA.toFixed(2),'4080.00','11-09 R20 Path A flat swarm tokens');
    assert.equal(r33OsiA.toFixed(2),'650.00','11-09 R20 Path A LLM OSINT');
    assert.equal(r33TriA.toFixed(2),'4500.00','11-09 R20 Path A poisoned graph triage');
    assert.equal(r33PathA.toFixed(2),'9230.00','11-09 R20 Path A total');
    const r33SwmB=40*(20*1.00+0.75*4.00);
    const r33OsiB=1000*0.02;
    const r33TriB=6.0*75.00;
    const r33PathB=r33SwmB+r33OsiB+r33TriB;
    assert.equal(r33SwmB.toFixed(2),'920.00','11-09 R20 Path B 3-layer swarm tokens');
    assert.equal(r33OsiB.toFixed(2),'20.00','11-09 R20 Path B sherlock OSINT ingest');
    assert.equal(r33TriB.toFixed(2),'450.00','11-09 R20 Path B watchdog supervision');
    assert.equal(r33PathB.toFixed(2),'1390.00','11-09 R20 Path B total');
    assert.equal((r33PathA-r33PathB).toFixed(2),'7840.00','11-09 R20 savings vs Path A');
    assert.equal(((r33PathA-r33PathB)/r33PathA*100).toFixed(2),'84.94','11-09 R20 pct savings vs Path A');
    for(const r33File of ['workshops/github-trending-radar/docs/sapper-v2-sherlock-fact-intent-swarm-selection-faq.md','workshops/github-trending-radar/docs/sapper-v2-sherlock-fact-intent-swarm-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r20-sapper-v2-sherlock.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r33File),'utf8');
      assert.ok(txt.includes('4,080.00')&&txt.includes('650.00')&&txt.includes('4,500.00')&&txt.includes('9,230.00')&&txt.includes('920.00')&&txt.includes('20.00')&&txt.includes('450.00')&&txt.includes('1,390.00')&&txt.includes('7,840.00')&&txt.includes('84.94%')&&txt.includes('not_measured'),r33File+': contains exact 11-09 R20 sapper-v2+sherlock closed-form parameters');
    }
    // 2026-11-09 Round 21 (KKKKhazix/agent-autoloop + janestreet/agent_skills) closed-form FinOps verification
    const r34TokA=648.00;
    const r34BabA=100.0*60.00;
    const r34ErrA=40.0*60.00;
    const r34PathA=r34TokA+r34BabA+r34ErrA;
    assert.equal(r34BabA.toFixed(2),'6000.00','11-09 R21 Path A terminal babysitting');
    assert.equal(r34ErrA.toFixed(2),'2400.00','11-09 R21 Path A config errors');
    assert.equal(r34PathA.toFixed(2),'9048.00','11-09 R21 Path A total');
    const r34TokB=144.00;
    const r34BabB=6.0*60.00;
    const r34ErrB=5.0*60.00;
    const r34PathB=r34TokB+r34BabB+r34ErrB;
    assert.equal(r34BabB.toFixed(2),'360.00','11-09 R21 Path B card replies');
    assert.equal(r34ErrB.toFixed(2),'300.00','11-09 R21 Path B verified drills');
    assert.equal(r34PathB.toFixed(2),'804.00','11-09 R21 Path B total');
    assert.equal((r34PathA-r34PathB).toFixed(2),'8244.00','11-09 R21 savings vs Path A');
    assert.equal(((r34PathA-r34PathB)/r34PathA*100).toFixed(2),'91.11','11-09 R21 pct savings vs Path A');
    for(const r34File of ['workshops/github-trending-radar/docs/agent-autoloop-janestreet-skills-selection-faq.md','workshops/github-trending-radar/docs/agent-autoloop-janestreet-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r21-autoloop-janestreet.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r34File),'utf8');
      assert.ok(txt.includes('648.00')&&txt.includes('6,000.00')&&txt.includes('2,400.00')&&txt.includes('9,048.00')&&txt.includes('144.00')&&txt.includes('360.00')&&txt.includes('300.00')&&txt.includes('804.00')&&txt.includes('8,244.00')&&txt.includes('91.11%')&&txt.includes('not_measured'),r34File+': contains exact 11-09 R21 agent-autoloop+janestreet closed-form parameters');
    }
    // 2026-11-09 Round 22 (shanselman/gputaskman v0.3.4 + libracoder/kiri v0.2.0) closed-form FinOps verification
    const r35SeatA=25*24.00;
    const r35VmA=12.5*65.00;
    const r35VramA=50.0*65.00;
    const r35PathA=r35SeatA+r35VmA+r35VramA;
    assert.equal(r35SeatA.toFixed(2),'600.00','11-09 R22 Path A Docker Desktop seats');
    assert.equal(r35VmA.toFixed(2),'812.50','11-09 R22 Path A VM thrash');
    assert.equal(r35VramA.toFixed(2),'3250.00','11-09 R22 Path A blind VRAM triage');
    assert.equal(r35PathA.toFixed(2),'4662.50','11-09 R22 Path A total');
    const r35SeatB=0.00;
    const r35VmB=1.5*65.00;
    const r35VramB=5.0*65.00;
    const r35PathB=r35SeatB+r35VmB+r35VramB;
    assert.equal(r35VmB.toFixed(2),'97.50','11-09 R22 Path B Kiri clone3');
    assert.equal(r35VramB.toFixed(2),'325.00','11-09 R22 Path B gputaskman triage');
    assert.equal(r35PathB.toFixed(2),'422.50','11-09 R22 Path B total');
    assert.equal((r35PathA-r35PathB).toFixed(2),'4240.00','11-09 R22 savings vs Path A');
    assert.equal(((r35PathA-r35PathB)/r35PathA*100).toFixed(2),'90.94','11-09 R22 pct savings vs Path A');
    for(const r35File of ['workshops/github-trending-radar/docs/gputaskman-kiri-vram-container-runtime-selection-faq.md','workshops/github-trending-radar/docs/gputaskman-kiri-vram-container-runtime-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r22-gputaskman-kiri.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r35File),'utf8');
      assert.ok(txt.includes('600.00')&&txt.includes('812.50')&&txt.includes('3,250.00')&&txt.includes('4,662.50')&&txt.includes('97.50')&&txt.includes('325.00')&&txt.includes('422.50')&&txt.includes('4,240.00')&&txt.includes('90.94%')&&txt.includes('2.55')&&txt.includes('not_measured'),r35File+': contains exact 11-09 R22 gputaskman+kiri closed-form parameters');
    }
    // 2026-11-09 Round 23 (Sandflow-ai/sand3d + voyager-so/vork v0.3.0) closed-form FinOps verification
    const r36TokA=300*(0.120*2.50+0.016*10.00);
    const r36GpuA=120*1.50;
    const r36LabA=60.0*60.00;
    const r36PathA=r36TokA+r36GpuA+r36LabA;
    assert.equal(r36TokA.toFixed(2),'138.00','11-09 R23 Path A raw bpy tokens');
    assert.equal(r36GpuA.toFixed(2),'180.00','11-09 R23 Path A EEVEE GPU');
    assert.equal(r36LabA.toFixed(2),'3600.00','11-09 R23 Path A manual TA labor');
    assert.equal(r36PathA.toFixed(2),'3918.00','11-09 R23 Path A total');
    const r36TokB=300*(0.020*2.50+0.003*10.00);
    const r36GpuB=120*0.20;
    const r36LabB=6.0*60.00;
    const r36PathB=r36TokB+r36GpuB+r36LabB;
    assert.equal(r36TokB.toFixed(2),'24.00','11-09 R23 Path B sand3d tokens');
    assert.equal(r36GpuB.toFixed(2),'24.00','11-09 R23 Path B vork GPU');
    assert.equal(r36LabB.toFixed(2),'360.00','11-09 R23 Path B draft-final labor');
    assert.equal(r36PathB.toFixed(2),'408.00','11-09 R23 Path B total');
    assert.equal((r36PathA-r36PathB).toFixed(2),'3510.00','11-09 R23 savings vs Path A');
    assert.equal(((r36PathA-r36PathB)/r36PathA*100).toFixed(2),'89.59','11-09 R23 pct savings vs Path A');
    for(const r36File of ['workshops/github-trending-radar/docs/sand3d-vork-agent-3d-vfx-engine-selection-faq.md','workshops/github-trending-radar/docs/sand3d-vork-agent-3d-vfx-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r23-sand3d-vork.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r36File),'utf8');
      assert.ok(txt.includes('138.00')&&txt.includes('180.00')&&txt.includes('3,600.00')&&txt.includes('3,918.00')&&txt.includes('24.00')&&txt.includes('360.00')&&txt.includes('408.00')&&txt.includes('3,510.00')&&txt.includes('89.59%')&&txt.includes('not_measured'),r36File+': contains exact 11-09 R23 sand3d+vork closed-form parameters');
    }
    // 2026-11-09 Round 24 (NiazMorshed2007/reanimate + Pika-Labs/Pika-H3-Flex v0.1.0) closed-form FinOps verification
    const r37UiA=20.00+90.0*65.00;
    const r37VidA=150*3.5*1.20;
    const r37AudA=25.0*65.00;
    const r37PathA=r37UiA+r37VidA+r37AudA;
    assert.equal(r37UiA.toFixed(2),'5870.00','11-09 R24 Path A UI tokens & manual tuning');
    assert.equal(r37VidA.toFixed(2),'630.00','11-09 R24 Path A 50-step video retries');
    assert.equal(r37AudA.toFixed(2),'1625.00','11-09 R24 Path A manual Foley sync');
    assert.equal(r37PathA.toFixed(2),'8125.00','11-09 R24 Path A total');
    const r37UiB=70.00+10.0*65.00;
    const r37VidB=150*0.30;
    const r37AudB=2.0*65.00;
    const r37PathB=r37UiB+r37VidB+r37AudB;
    assert.equal(r37UiB.toFixed(2),'720.00','11-09 R24 Path B reanimate loop & review');
    assert.equal(r37VidB.toFixed(2),'45.00','11-09 R24 Path B 6-step local GPU');
    assert.equal(r37AudB.toFixed(2),'130.00','11-09 R24 Path B synced stereo QA');
    assert.equal(r37PathB.toFixed(2),'895.00','11-09 R24 Path B total');
    assert.equal((r37PathA-r37PathB).toFixed(2),'7230.00','11-09 R24 savings vs Path A');
    assert.equal(((r37PathA-r37PathB)/r37PathA*100).toFixed(2),'88.98','11-09 R24 pct savings vs Path A');
    for(const r37File of ['workshops/github-trending-radar/docs/reanimate-pika-h3-flex-motion-video-selection-faq.md','workshops/github-trending-radar/docs/reanimate-pika-h3-flex-motion-video-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r24-reanimate-pika-h3.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r37File),'utf8');
      assert.ok(txt.includes('5,870.00')&&txt.includes('630.00')&&txt.includes('1,625.00')&&txt.includes('8,125.00')&&txt.includes('720.00')&&txt.includes('45.00')&&txt.includes('130.00')&&txt.includes('895.00')&&txt.includes('7,230.00')&&txt.includes('88.98%')&&txt.includes('not_measured'),r37File+': contains exact 11-09 R24 reanimate+Pika-H3-Flex closed-form parameters');
    }
    // 2026-11-09 Round 25 (anthropics/FlashProve v0.16.0 + OpenBMB/MiniCPM-OCR 1.0 + Jev) closed-form FinOps verification
    const r38OcrA=600.00;
    const r38QaA=250.0*40.00;
    const r38AudA=10000*0.08;
    const r38PathA=r38OcrA+r38QaA+r38AudA;
    assert.equal(r38QaA.toFixed(2),'10000.00','11-09 R25 Path A blind 10% QA labor');
    assert.equal(r38AudA.toFixed(2),'800.00','11-09 R25 Path A redundant H100 audit');
    assert.equal(r38PathA.toFixed(2),'11400.00','11-09 R25 Path A total');
    const r38OcrB=120.00;
    const r38QaB=15.0*40.00;
    const r38AudB=15.00;
    const r38PathB=r38OcrB+r38QaB+r38AudB;
    assert.equal(r38QaB.toFixed(2),'600.00','11-09 R25 Path B Jev region QA labor');
    assert.equal(r38PathB.toFixed(2),'735.00','11-09 R25 Path B total');
    assert.equal((r38PathA-r38PathB).toFixed(2),'10665.00','11-09 R25 savings vs Path A');
    assert.equal(((r38PathA-r38PathB)/r38PathA*100).toFixed(2),'93.55','11-09 R25 pct savings vs Path A');
    for(const r38File of ['workshops/github-trending-radar/docs/flashprove-minicpm-ocr-verifiable-ai-selection-faq.md','workshops/github-trending-radar/docs/flashprove-minicpm-ocr-verifiable-ai-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r25-flashprove-minicpm-ocr.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r38File),'utf8');
      assert.ok(txt.includes('600.00')&&txt.includes('10,000.00')&&txt.includes('800.00')&&txt.includes('11,400.00')&&txt.includes('120.00')&&txt.includes('15.00')&&txt.includes('735.00')&&txt.includes('10,665')&&txt.includes('93.55%')&&txt.includes('not_measured'),r38File+': contains exact 11-09 R25 FlashProve+MiniCPM-OCR closed-form parameters');
    }
    // 2026-11-09 Round 26 (synchopate/llama-modchip v2.4.0 + Th0rgal/satmux) closed-form FinOps verification
    const r39NodeA=8*1200.00;
    const r39PreA=8*85.00;
    const r39SatA=50.0*65.00;
    const r39PathA=r39NodeA+r39PreA+r39SatA;
    assert.equal(r39NodeA.toFixed(2),'9600.00','11-09 R26 Path A cloud GPU nodes');
    assert.equal(r39PreA.toFixed(2),'680.00','11-09 R26 Path A re-prefill waste');
    assert.equal(r39SatA.toFixed(2),'3250.00','11-09 R26 Path A PEP retry wait');
    assert.equal(r39PathA.toFixed(2),'13530.00','11-09 R26 Path A total');
    const r39NodeB=8*140.00;
    const r39PreB=40.00;
    const r39SatB=10.00+3.0*65.00;
    const r39PathB=r39NodeB+r39PreB+r39SatB;
    assert.equal(r39NodeB.toFixed(2),'1120.00','11-09 R26 Path B 64GB CPU nodes');
    assert.equal(r39SatB.toFixed(2),'205.00','11-09 R26 Path B satmux VM & wait');
    assert.equal(r39PathB.toFixed(2),'1365.00','11-09 R26 Path B total');
    assert.equal((r39PathA-r39PathB).toFixed(2),'12165.00','11-09 R26 savings vs Path A');
    assert.equal(((r39PathA-r39PathB)/r39PathA*100).toFixed(2),'89.91','11-09 R26 pct savings vs Path A');
    for(const r39File of ['workshops/github-trending-radar/docs/llama-modchip-satmux-cpu-moe-satellite-selection-faq.md','workshops/github-trending-radar/docs/llama-modchip-satmux-cpu-moe-satellite-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r26-llama-modchip-satmux.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r39File),'utf8');
      assert.ok(txt.includes('9,600.00')&&txt.includes('680.00')&&txt.includes('3,250.00')&&txt.includes('13,530.00')&&txt.includes('1,120.00')&&txt.includes('40.00')&&txt.includes('205.00')&&txt.includes('1,365.00')&&txt.includes('12,165')&&txt.includes('89.91%')&&txt.includes('not_measured'),r39File+': contains exact 11-09 R26 llama-modchip+satmux closed-form parameters');
    }
    // 2026-11-09 Round 27 (DIYgod/pinky + JosssphZhou/poki v0.1.1) closed-form FinOps verification
    const r40FarmA=200.0*6.00;
    const r40RollA=30.0*60.00;
    const r40WdaA=30.0*60.00;
    const r40PathA=r40FarmA+r40RollA+r40WdaA;
    assert.equal(r40FarmA.toFixed(2),'1200.00','11-09 R27 Path A cloud device farm');
    assert.equal(r40RollA.toFixed(2),'1800.00','11-09 R27 Path A rollback labor');
    assert.equal(r40WdaA.toFixed(2),'1800.00','11-09 R27 Path A WDA maintenance');
    assert.equal(r40PathA.toFixed(2),'4800.00','11-09 R27 Path A total');
    const r40FarmB=0.00;
    const r40RollB=0.75*60.00;
    const r40WdaB=4.0*60.00;
    const r40PathB=r40FarmB+r40RollB+r40WdaB;
    assert.equal(r40RollB.toFixed(2),'45.00','11-09 R27 Path B gateway incident labor');
    assert.equal(r40WdaB.toFixed(2),'240.00','11-09 R27 Path B automated setup labor');
    assert.equal(r40PathB.toFixed(2),'285.00','11-09 R27 Path B total');
    assert.equal((r40PathA-r40PathB).toFixed(2),'4515.00','11-09 R27 savings vs Path A');
    assert.equal(((r40PathA-r40PathB)/r40PathA*100).toFixed(2),'94.06','11-09 R27 pct savings vs Path A');
    for(const r40File of ['workshops/github-trending-radar/docs/pinky-poki-mobile-hitl-mcp-selection-faq.md','workshops/github-trending-radar/docs/pinky-poki-mobile-hitl-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r27-pinky-poki.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r40File),'utf8');
      assert.ok(txt.includes('1,200.00')&&txt.includes('1,800.00')&&txt.includes('4,800.00')&&txt.includes('45.00')&&txt.includes('240.00')&&txt.includes('285.00')&&txt.includes('4,515.00')&&txt.includes('94.06%')&&txt.includes('10.7.0.1')&&txt.includes('not_measured'),r40File+': contains exact 11-09 R27 pinky+poki closed-form parameters');
    }
    // 2026-11-09 Round 28 (livliv-dev/player v0.3.0 + jacke-pp/open-yoki v150) closed-form FinOps verification
    const r41WebA=750000*0.004;
    const r41ObsA=2*450.00;
    const r41ModA=60.0*45.00;
    const r41PathA=r41WebA+r41ObsA+r41ModA;
    assert.equal(r41WebA.toFixed(2),'3000.00','11-09 R28 Path A cloud WebRTC avatar');
    assert.equal(r41ObsA.toFixed(2),'900.00','11-09 R28 Path A OBS GPU VMs');
    assert.equal(r41ModA.toFixed(2),'2700.00','11-09 R28 Path A stream moderation');
    assert.equal(r41PathA.toFixed(2),'6600.00','11-09 R28 Path A total');
    const r41WebB=15.00;
    const r41ObsB=2*160.00;
    const r41ModB=6.0*45.00;
    const r41PathB=r41WebB+r41ObsB+r41ModB;
    assert.equal(r41ObsB.toFixed(2),'320.00','11-09 R28 Path B 1-server hosts');
    assert.equal(r41ModB.toFixed(2),'270.00','11-09 R28 Path B heart oversight');
    assert.equal(r41PathB.toFixed(2),'605.00','11-09 R28 Path B total');
    assert.equal((r41PathA-r41PathB).toFixed(2),'5995.00','11-09 R28 savings vs Path A');
    assert.equal(((r41PathA-r41PathB)/r41PathA*100).toFixed(2),'90.83','11-09 R28 pct savings vs Path A');
    for(const r41File of ['workshops/github-trending-radar/docs/livliv-player-open-yoki-avatar-livestream-selection-faq.md','workshops/github-trending-radar/docs/livliv-player-open-yoki-avatar-livestream-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r28-livliv-open-yoki.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r41File),'utf8');
      assert.ok(txt.includes('3,000.00')&&txt.includes('900.00')&&txt.includes('2,700.00')&&txt.includes('6,600.00')&&txt.includes('15.00')&&txt.includes('320.00')&&txt.includes('270.00')&&txt.includes('605.00')&&txt.includes('5,995.00')&&txt.includes('90.83%')&&txt.includes('not_measured'),r41File+': contains exact 11-09 R28 livliv+open-yoki closed-form parameters');
    }
    // 2026-11-09 Round 29 (speridlabs/idol-sdk + hyz317/HairDeck) closed-form FinOps verification
    const r42PropA=500*6.00;
    const r42HairA=280.0*55.00;
    const r42PathA=r42PropA+r42HairA;
    assert.equal(r42PropA.toFixed(2),'3000.00','11-09 R29 Path A cloud 3D prop API');
    assert.equal(r42HairA.toFixed(2),'15400.00','11-09 R29 Path A manual hair rigging');
    assert.equal(r42PathA.toFixed(2),'18400.00','11-09 R29 Path A total');
    const r42PropB=15.00;
    const r42HairB=10.00+20.0*55.00;
    const r42PathB=r42PropB+r42HairB;
    assert.equal(r42HairB.toFixed(2),'1110.00','11-09 R29 Path B HairDeck VRM');
    assert.equal(r42PathB.toFixed(2),'1125.00','11-09 R29 Path B total');
    assert.equal((r42PathA-r42PathB).toFixed(2),'17275.00','11-09 R29 savings vs Path A');
    assert.equal(((r42PathA-r42PathB)/r42PathA*100).toFixed(2),'93.89','11-09 R29 pct savings vs Path A');
    for(const r42File of ['workshops/github-trending-radar/docs/idol-sdk-hairdeck-single-image-3d-vrm-selection-faq.md','workshops/github-trending-radar/docs/idol-sdk-hairdeck-single-image-3d-vrm-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r29-idol-hairdeck.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r42File),'utf8');
      assert.ok(txt.includes('3,000.00')&&txt.includes('15,400.00')&&txt.includes('18,400.00')&&txt.includes('15.00')&&txt.includes('10.00')&&txt.includes('1,125.00')&&txt.includes('17,275')&&txt.includes('93.89%')&&txt.includes('1,048,576')&&txt.includes('not_measured'),r42File+': contains exact 11-09 R29 idol-sdk+HairDeck closed-form parameters');
    }
    // 2026-11-09 Round 30 (cutetailbud/ff-ruyijs v0.3.6 + sqlpxc/airhand v0.2.2) closed-form FinOps verification
    const r43VmA=8*180.00;
    const r43RmmA=30*25.00;
    const r43LabA=45.0*60.00;
    const r43PathA=r43VmA+r43RmmA+r43LabA;
    assert.equal(r43VmA.toFixed(2),'1440.00','11-09 R30 Path A Chromium VM nodes');
    assert.equal(r43RmmA.toFixed(2),'750.00','11-09 R30 Path A commercial RMM');
    assert.equal(r43LabA.toFixed(2),'2700.00','11-09 R30 Path A triage labor');
    assert.equal(r43PathA.toFixed(2),'4890.00','11-09 R30 Path A total');
    const r43VmB=2*180.00;
    const r43RmmB=12.00;
    const r43LabB=4.5*60.00;
    const r43PathB=r43VmB+r43RmmB+r43LabB;
    assert.equal(r43VmB.toFixed(2),'360.00','11-09 R30 Path B ruyiJS VM nodes');
    assert.equal(r43LabB.toFixed(2),'270.00','11-09 R30 Path B maintenance labor');
    assert.equal(r43PathB.toFixed(2),'642.00','11-09 R30 Path B total');
    assert.equal((r43PathA-r43PathB).toFixed(2),'4248.00','11-09 R30 savings vs Path A');
    assert.equal(((r43PathA-r43PathB)/r43PathA*100).toFixed(2),'86.87','11-09 R30 pct savings vs Path A');
    for(const r43File of ['workshops/github-trending-radar/docs/ruyijs-airhand-rendererless-browser-quic-desktop-selection-faq.md','workshops/github-trending-radar/docs/ruyijs-airhand-rendererless-browser-quic-desktop-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r30-ruyijs-airhand.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r43File),'utf8');
      assert.ok(txt.includes('1,440.00')&&txt.includes('750.00')&&txt.includes('2,700.00')&&txt.includes('4,890.00')&&txt.includes('360.00')&&txt.includes('12.00')&&txt.includes('270.00')&&txt.includes('642.00')&&txt.includes('4,248.00')&&txt.includes('86.87%')&&txt.includes('not_measured'),r43File+': contains exact 11-09 R30 ruyiJS+Airhand closed-form parameters');
    }
    // 2026-11-09 Round 31 (jamesondh/chimera-vocal-synth + XiaoyeCodes/code-animation-prompts) closed-form FinOps verification
    const r44ApiA=100000*0.015;
    const r44AnimA=60.0*65.00;
    const r44SyncA=20.0*65.00;
    const r44PathA=r44ApiA+r44AnimA+r44SyncA;
    assert.equal(r44ApiA.toFixed(2),'1500.00','11-09 R31 Path A cloud voice/SFX API');
    assert.equal(r44AnimA.toFixed(2),'3900.00','11-09 R31 Path A style/rAF rework');
    assert.equal(r44SyncA.toFixed(2),'1300.00','11-09 R31 Path A manual sync');
    assert.equal(r44PathA.toFixed(2),'6700.00','11-09 R31 Path A total');
    const r44CiB=20.00;
    const r44AnimB=8.0*65.00;
    const r44SyncB=2.0*65.00;
    const r44PathB=r44CiB+r44AnimB+r44SyncB;
    assert.equal(r44AnimB.toFixed(2),'520.00','11-09 R31 Path B deterministic t-clock QA');
    assert.equal(r44SyncB.toFixed(2),'130.00','11-09 R31 Path B 60Hz formant binding QA');
    assert.equal(r44PathB.toFixed(2),'670.00','11-09 R31 Path B total');
    assert.equal((r44PathA-r44PathB).toFixed(2),'6030.00','11-09 R31 savings vs Path A');
    assert.equal(((r44PathA-r44PathB)/r44PathA*100).toFixed(2),'90.00','11-09 R31 pct savings vs Path A');
    for(const r44File of ['workshops/github-trending-radar/docs/chimera-code-animation-vocal-synth-deterministic-video-selection-faq.md','workshops/github-trending-radar/docs/chimera-code-animation-vocal-synth-deterministic-video-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r31-chimera-code-anim.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r44File),'utf8');
      assert.ok(txt.includes('1,500.00')&&txt.includes('3,900.00')&&txt.includes('1,300.00')&&txt.includes('6,700.00')&&txt.includes('20.00')&&txt.includes('520.00')&&txt.includes('130.00')&&txt.includes('670.00')&&txt.includes('6,030.00')&&txt.includes('90.00%')&&txt.includes('not_measured'),r44File+': contains exact 11-09 R31 chimera+code-animation-prompts closed-form parameters');
    }
    // 2026-11-09 Round 32 (rerun-build/rerun + WoYun520/gif-factory) closed-form FinOps verification
    const r45SaasA=6*250.00;
    const r45RollA=25.0*60.00;
    const r45GifA=55.0*60.00;
    const r45PathA=r45SaasA+r45RollA+r45GifA;
    assert.equal(r45SaasA.toFixed(2),'1500.00','11-09 R32 Path A 6 vertical SaaS seats');
    assert.equal(r45RollA.toFixed(2),'1500.00','11-09 R32 Path A rollback labor');
    assert.equal(r45GifA.toFixed(2),'3300.00','11-09 R32 Path A GIF rework labor');
    assert.equal(r45PathA.toFixed(2),'6300.00','11-09 R32 Path A total');
    const r45HostB=45.00+120.00;
    const r45GateB=5.0*60.00;
    const r45GifB=8.5*60.00;
    const r45PathB=r45HostB+r45GateB+r45GifB;
    assert.equal(r45HostB.toFixed(2),'165.00','11-09 R32 Path B self-hosted rerun + BYO LLM');
    assert.equal(r45GateB.toFixed(2),'300.00','11-09 R32 Path B Foreman approval queue');
    assert.equal(r45GifB.toFixed(2),'510.00','11-09 R32 Path B 3-axis exporter QA');
    assert.equal(r45PathB.toFixed(2),'975.00','11-09 R32 Path B total');
    assert.equal((r45PathA-r45PathB).toFixed(2),'5325.00','11-09 R32 savings vs Path A');
    assert.equal(((r45PathA-r45PathB)/r45PathA*100).toFixed(2),'84.52','11-09 R32 pct savings vs Path A');
    for(const r45File of ['workshops/github-trending-radar/docs/rerun-gif-factory-coworker-board-three-axis-gif-selection-faq.md','workshops/github-trending-radar/docs/rerun-gif-factory-coworker-board-three-axis-gif-selection-faq.en.md','assets/github-ai-radar-2026-11-09-r32-rerun-giffactory.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-09-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r45File),'utf8');
      assert.ok(txt.includes('1,500.00')&&txt.includes('3,300.00')&&txt.includes('6,300.00')&&txt.includes('165.00')&&txt.includes('300.00')&&txt.includes('510.00')&&txt.includes('975.00')&&txt.includes('5,325.00')&&txt.includes('84.52%')&&txt.includes('not_measured'),r45File+': contains exact 11-09 R32 rerun+gif-factory closed-form parameters');
    }
    // 2026-11-11 Sweep & Round 1 (shadcn/improve + addyosmani/agent-skills v0.6.15) verification
    const rawHtml1111=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-11-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawHtml1111),'bacf15c20a7aca6007beeb3a6f284b0549a441a05dafa25b17a097dc8f4f1d8f','2026-11-11 raw HTML LF sha256');
    const rawSearch1111Str=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-11-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawSearch1111Str),'8f108b907ea08522d04355d854f2ddbfd4a7f1d2cc92dbcb50d39107786a1eeb','2026-11-11 raw Search API JSON LF sha256');
    const rawSearch1111=JSON.parse(rawSearch1111Str);
    const rawSearch1111Map=new Map(rawSearch1111.items.map(it=>[it.full_name,it]));
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_11.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': 11-11 Track A provenance');
      assert.ok(rawHtml1111.includes(`href="/${item.full_name}"`),item.full_name+': present in 11-11 raw HTML');
      assert.ok(rawHtml1111.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in 11-11 raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_11.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': 11-11 Track B stars_today must be not_measured');
      assert.ok(rawSearch1111Map.has(item.full_name),item.full_name+': present in 11-11 archived Search API JSON');
      const rawEntry=rawSearch1111Map.get(item.full_name);
      assert.equal(item.stars_total_search_api,rawEntry.stargazers_count,item.full_name+': 11-11 stars_total_search_api matches Search API JSON');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': 11-11 stars_per_day closed-form');
    }
    const r46PathAIn=960*(0.080*3.00);
    const r46PathAOut=960*(0.008*15.00);
    assert.equal(r46PathAIn.toFixed(2),'230.40','11-11 R1 Path A input');
    assert.equal(r46PathAOut.toFixed(2),'115.20','11-11 R1 Path A output');
    assert.equal((r46PathAIn+r46PathAOut).toFixed(2),'345.60','11-11 R1 Path A total');
    const r46Adv=240*(0.040*3.00+0.004*15.00);
    const r46Exec=360*(0.030*0.50+0.006*2.50);
    assert.equal(r46Adv.toFixed(2),'43.20','11-11 R1 Path C Advisor');
    assert.equal(r46Exec.toFixed(2),'10.80','11-11 R1 Path C Executor');
    assert.equal((r46Adv+r46Exec).toFixed(2),'54.00','11-11 R1 Path C total');
    assert.equal((345.60-54.00).toFixed(2),'291.60','11-11 R1 savings vs Path A');
    assert.equal(((345.60-54.00)/345.60*100).toFixed(2),'84.38','11-11 R1 pct savings vs Path A');
    for(const r46File of ['workshops/github-trending-radar/docs/shadcn-improve-addyosmani-agent-skills-sdlc-selection-faq.md','workshops/github-trending-radar/docs/shadcn-improve-addyosmani-agent-skills-sdlc-selection-faq.en.md','assets/github-ai-radar-2026-11-11.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r46File),'utf8');
      assert.ok(txt.includes('345.60')&&txt.includes('162.00')&&txt.includes('43.20')&&txt.includes('10.80')&&txt.includes('54.00')&&txt.includes('291.60')&&txt.includes('84.38%')&&txt.includes('not_measured'),r46File+': contains exact 11-11 R1 closed-form parameters');
    }
    // 2026-11-11 Round 2 (openai/codex-security npm-v0.9.1) closed-form FinOps verification
    const r47PathA=60.0*75.00+30.0*75.00;
    assert.equal(r47PathA.toFixed(2),'6750.00','11-11 R2 Path A total');
    const r47ApiC=400*0.18+20*4.50+300*0.12;
    const r47LabC=10.0*75.00;
    const r47PathC=r47ApiC+r47LabC;
    assert.equal(r47ApiC.toFixed(2),'198.00','11-11 R2 Path C API');
    assert.equal(r47LabC.toFixed(2),'750.00','11-11 R2 Path C labor');
    assert.equal(r47PathC.toFixed(2),'948.00','11-11 R2 Path C total');
    assert.equal((r47PathA-r47PathC).toFixed(2),'5802.00','11-11 R2 savings vs Path A');
    assert.equal(((r47PathA-r47PathC)/r47PathA*100).toFixed(2),'85.96','11-11 R2 pct savings vs Path A');
    for(const r47File of ['workshops/github-trending-radar/docs/codex-security-vs-audit-skill-sast-selection-faq.md','workshops/github-trending-radar/docs/codex-security-vs-audit-skill-sast-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r2-codex-security.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r47File),'utf8');
      assert.ok(txt.includes('6,750.00')&&txt.includes('3,480.00')&&txt.includes('198.00')&&txt.includes('750.00')&&txt.includes('948.00')&&txt.includes('5,802.00')&&txt.includes('85.96%')&&txt.includes('not_measured'),r47File+': contains exact 11-11 R2 codex-security closed-form parameters');
    }
    // 2026-11-11 Round 3 (GoogleChrome/modern-web-guidance-src WebMCP + Built-in AI) closed-form FinOps verification
    const r48PathA=48.0*70.00+50000*0.018+50000*0.004;
    assert.equal(r48PathA.toFixed(2),'4460.00','11-11 R3 Path A total');
    const r48PathC=8.0*70.00+50000*0.002+0.00;
    assert.equal(r48PathC.toFixed(2),'660.00','11-11 R3 Path C total');
    assert.equal((r48PathA-r48PathC).toFixed(2),'3800.00','11-11 R3 savings vs Path A');
    assert.equal(((r48PathA-r48PathC)/r48PathA*100).toFixed(2),'85.20','11-11 R3 pct savings vs Path A');
    for(const r48File of ['workshops/github-trending-radar/docs/modern-web-guidance-webmcp-vs-legacy-polyfills-selection-faq.md','workshops/github-trending-radar/docs/modern-web-guidance-webmcp-vs-legacy-polyfills-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r3-modern-web-guidance.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r48File),'utf8');
      assert.ok(txt.includes('3,360.00')&&txt.includes('4,460.00')&&txt.includes('3,060.00')&&txt.includes('560.00')&&txt.includes('660.00')&&txt.includes('3,800.00')&&txt.includes('85.20%')&&txt.includes('not_measured'),r48File+': contains exact 11-11 R3 modern-web-guidance closed-form parameters');
    }
    // 2026-11-11 Round 4 (expo/exact + RunanywhereAI/trnrt) closed-form FinOps verification
    const r49PathA=1500*1.20+64.0*75.00;
    assert.equal(r49PathA.toFixed(2),'6600.00','11-11 R4 Path A total');
    const r49PathC=1500*0.167+12.0*75.00;
    assert.equal(r49PathC.toFixed(2),'1150.50','11-11 R4 Path C total');
    assert.equal((r49PathA-r49PathC).toFixed(2),'5449.50','11-11 R4 savings vs Path A');
    assert.equal(((r49PathA-r49PathC)/r49PathA*100).toFixed(2),'82.57','11-11 R4 pct savings vs Path A');
    for(const r49File of ['workshops/github-trending-radar/docs/expo-exact-trnrt-agent-ui-trainium-inference-selection-faq.md','workshops/github-trending-radar/docs/expo-exact-trnrt-agent-ui-trainium-inference-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r4-expo-exact-trnrt.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r49File),'utf8');
      assert.ok(txt.includes('1,800.00')&&txt.includes('4,800.00')&&txt.includes('6,600.00')&&txt.includes('250.50')&&txt.includes('900.00')&&txt.includes('1,150.50')&&txt.includes('5,449.50')&&txt.includes('82.57%')&&txt.includes('not_measured'),r49File+': contains exact 11-11 R4 expo/exact+trnrt closed-form parameters');
    }
    // 2026-11-11 Round 5 (HybridRobotics/supermimic + alexeyw/lot-map + vzroslieigry/maxagent) closed-form FinOps verification
    const r50PathA=600*2.50+3000*0.16+50.0*70.00;
    assert.equal(r50PathA.toFixed(2),'5480.00','11-11 R5 Path A total');
    const r50PathC=100*2.50+3000*0.02+10.0*70.00;
    assert.equal(r50PathC.toFixed(2),'1010.00','11-11 R5 Path C total');
    assert.equal((r50PathA-r50PathC).toFixed(2),'4470.00','11-11 R5 savings vs Path A');
    assert.equal(((r50PathA-r50PathC)/r50PathA*100).toFixed(2),'81.57','11-11 R5 pct savings vs Path A');
    for(const r50File of ['workshops/github-trending-radar/docs/supermimic-lotmap-maxagent-world-model-observability-selection-faq.md','workshops/github-trending-radar/docs/supermimic-lotmap-maxagent-world-model-observability-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r5-supermimic-lotmap.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r50File),'utf8');
      assert.ok(txt.includes('1,500.00')&&txt.includes('3,500.00')&&txt.includes('5,480.00')&&txt.includes('250.00')&&txt.includes('700.00')&&txt.includes('1,010.00')&&txt.includes('4,470.00')&&txt.includes('81.57%')&&txt.includes('not_measured'),r50File+': contains exact 11-11 R5 supermimic+lot-map closed-form parameters');
    }
    // 2026-11-11 Round 6 (ScottDuncanAI/PID-to-Knowledge-Graph + Dodaios/ste80-humanizer) closed-form FinOps verification
    const r51PathA=240.00+45.0*80.00+35.0*80.00;
    assert.equal(r51PathA.toFixed(2),'6640.00','11-11 R6 Path A total');
    const r51PathC=160.00+8.0*80.00+6.0*80.00;
    assert.equal(r51PathC.toFixed(2),'1280.00','11-11 R6 Path C total');
    assert.equal((r51PathA-r51PathC).toFixed(2),'5360.00','11-11 R6 savings vs Path A');
    assert.equal(((r51PathA-r51PathC)/r51PathA*100).toFixed(2),'80.72','11-11 R6 pct savings vs Path A');
    for(const r51File of ['workshops/github-trending-radar/docs/pid-knowledge-graph-ste80-humanizer-selection-faq.md','workshops/github-trending-radar/docs/pid-knowledge-graph-ste80-humanizer-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r6-pid-kg-ste80.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r51File),'utf8');
      assert.ok(txt.includes('3,600.00')&&txt.includes('2,800.00')&&txt.includes('6,640.00')&&txt.includes('640.00')&&txt.includes('480.00')&&txt.includes('1,280.00')&&txt.includes('5,360.00')&&txt.includes('80.72%')&&txt.includes('not_measured'),r51File+': contains exact 11-11 R6 pid-to-kg+ste80 closed-form parameters');
    }
    // 2026-11-11 Round 7 (paulirish/chrome-capture + JDhruv14/line-art-animation) closed-form FinOps verification
    const r52PathA=15000*(21/60)*0.008+15.0*75.00+44.0*75.00;
    assert.equal(r52PathA.toFixed(2),'4467.00','11-11 R7 Path A total');
    const r52PathC=15000*(11/60)*0.008+2.0*75.00+8.0*75.00;
    assert.equal(r52PathC.toFixed(2),'772.00','11-11 R7 Path C total');
    assert.equal((r52PathA-r52PathC).toFixed(2),'3695.00','11-11 R7 savings vs Path A');
    assert.equal(((r52PathA-r52PathC)/r52PathA*100).toFixed(2),'82.72','11-11 R7 pct savings vs Path A');
    for(const r52File of ['workshops/github-trending-radar/docs/chrome-capture-line-art-animation-selection-faq.md','workshops/github-trending-radar/docs/chrome-capture-line-art-animation-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r7-chrome-capture-lineart.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r52File),'utf8');
      assert.ok(txt.includes('1,125.00')&&txt.includes('3,300.00')&&txt.includes('4,467.00')&&txt.includes('150.00')&&txt.includes('600.00')&&txt.includes('772.00')&&txt.includes('3,695.00')&&txt.includes('82.72%')&&txt.includes('not_measured'),r52File+': contains exact 11-11 R7 chrome-capture+line-art closed-form parameters');
    }
    // 2026-11-11 Round 8 (shanselman/sandbox-mcp v1.2.0 + stencil-hq/ovnfs v0.2.3) closed-form FinOps verification
    const r53PathA=640.00+32.0*75.00+24.0*75.00;
    assert.equal(r53PathA.toFixed(2),'4840.00','11-11 R8 Path A total');
    const r53PathC=40.00+6.0*75.00+4.0*75.00;
    assert.equal(r53PathC.toFixed(2),'790.00','11-11 R8 Path C total');
    assert.equal((r53PathA-r53PathC).toFixed(2),'4050.00','11-11 R8 savings vs Path A');
    assert.equal(((r53PathA-r53PathC)/r53PathA*100).toFixed(2),'83.68','11-11 R8 pct savings vs Path A');
    for(const r53File of ['workshops/github-trending-radar/docs/sandbox-mcp-ovnfs-cow-checkout-selection-faq.md','workshops/github-trending-radar/docs/sandbox-mcp-ovnfs-cow-checkout-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r8-sandbox-ovnfs.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r53File),'utf8');
      assert.ok(txt.includes('2,400.00')&&txt.includes('1,800.00')&&txt.includes('4,840.00')&&txt.includes('450.00')&&txt.includes('300.00')&&txt.includes('790.00')&&txt.includes('4,050.00')&&txt.includes('83.68%')&&txt.includes('not_measured'),r53File+': contains exact 11-11 R8 sandbox-mcp+ovnfs closed-form parameters');
    }
    // 2026-11-11 Round 9 (gokayfem/image-to-sculpt + kubai087/kubai-icons + DominikScholz/open-bot-avatar) closed-form FinOps verification
    const r54PathA=360.00+45.0*70.00+40.0*70.00;
    assert.equal(r54PathA.toFixed(2),'6310.00','11-11 R9 Path A total');
    const r54PathC=90.00+9.0*70.00+6.0*70.00;
    assert.equal(r54PathC.toFixed(2),'1140.00','11-11 R9 Path C total');
    assert.equal((r54PathA-r54PathC).toFixed(2),'5170.00','11-11 R9 savings vs Path A');
    assert.equal(((r54PathA-r54PathC)/r54PathA*100).toFixed(2),'81.93','11-11 R9 pct savings vs Path A');
    for(const r54File of ['workshops/github-trending-radar/docs/image-to-sculpt-kubai-icons-avatar-selection-faq.md','workshops/github-trending-radar/docs/image-to-sculpt-kubai-icons-avatar-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r9-image-sculpt-kubai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r54File),'utf8');
      assert.ok(txt.includes('3,150.00')&&txt.includes('2,800.00')&&txt.includes('6,310.00')&&txt.includes('630.00')&&txt.includes('420.00')&&txt.includes('1,140.00')&&txt.includes('5,170.00')&&txt.includes('81.93%')&&txt.includes('not_measured'),r54File+': contains exact 11-11 R9 image-to-sculpt+kubai closed-form parameters');
    }
    // 2026-11-11 Round 10 (lobehub/lobe-mygo + imsai-sh/fish-pocket) closed-form FinOps verification
    const r55PathA=50*42.00+44.0*75.00;
    assert.equal(r55PathA.toFixed(2),'5400.00','11-11 R10 Path A total');
    const r55PathC=0.00+8.0*75.00;
    assert.equal(r55PathC.toFixed(2),'600.00','11-11 R10 Path C total');
    assert.equal((r55PathA-r55PathC).toFixed(2),'4800.00','11-11 R10 savings vs Path A');
    assert.equal(((r55PathA-r55PathC)/r55PathA*100).toFixed(2),'88.89','11-11 R10 pct savings vs Path A');
    for(const r55File of ['workshops/github-trending-radar/docs/lobe-mygo-fish-pocket-native-go-ios-agent-selection-faq.md','workshops/github-trending-radar/docs/lobe-mygo-fish-pocket-native-go-ios-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r10-lobe-mygo-fish-pocket.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r55File),'utf8');
      assert.ok(txt.includes('2,100.00')&&txt.includes('3,300.00')&&txt.includes('5,400.00')&&txt.includes('3,000.00')&&txt.includes('600.00')&&txt.includes('4,800.00')&&txt.includes('88.89%')&&txt.includes('not_measured'),r55File+': contains exact 11-11 R10 lobe-mygo+fish-pocket closed-form parameters');
    }
    // 2026-11-11 Round 11 (gogoymh/auto-ontology-mcp + nengong/download-anything) closed-form FinOps verification
    const r56PathA=680.00+30.0*75.00+22.0*75.00;
    assert.equal(r56PathA.toFixed(2),'4580.00','11-11 R11 Path A total');
    const r56PathC=45.00+5.0*75.00+3.0*75.00;
    assert.equal(r56PathC.toFixed(2),'645.00','11-11 R11 Path C total');
    assert.equal((r56PathA-r56PathC).toFixed(2),'3935.00','11-11 R11 savings vs Path A');
    assert.equal(((r56PathA-r56PathC)/r56PathA*100).toFixed(2),'85.92','11-11 R11 pct savings vs Path A');
    for(const r56File of ['workshops/github-trending-radar/docs/auto-ontology-mcp-download-anything-selection-faq.md','workshops/github-trending-radar/docs/auto-ontology-mcp-download-anything-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r11-auto-ontology-mcp-da.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r56File),'utf8');
      assert.ok(txt.includes('2,250.00')&&txt.includes('1,650.00')&&txt.includes('4,580.00')&&txt.includes('375.00')&&txt.includes('225.00')&&txt.includes('645.00')&&txt.includes('3,935.00')&&txt.includes('85.92%')&&txt.includes('not_measured'),r56File+': contains exact 11-11 R11 auto-ontology-mcp+download-anything closed-form parameters');
    }
    // 2026-11-11 Round 12 (designfuchen/worldforge + CXP-2024/gpt-anime-denoise) closed-form FinOps verification
    const r57PathA=520.00+36.0*70.00+30.0*70.00;
    assert.equal(r57PathA.toFixed(2),'5140.00','11-11 R12 Path A total');
    const r57PathC=80.00+6.0*70.00+4.0*70.00;
    assert.equal(r57PathC.toFixed(2),'780.00','11-11 R12 Path C total');
    assert.equal((r57PathA-r57PathC).toFixed(2),'4360.00','11-11 R12 savings vs Path A');
    assert.equal(((r57PathA-r57PathC)/r57PathA*100).toFixed(2),'84.82','11-11 R12 pct savings vs Path A');
    for(const r57File of ['workshops/github-trending-radar/docs/worldforge-gpt-anime-denoise-selection-faq.md','workshops/github-trending-radar/docs/worldforge-gpt-anime-denoise-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r12-worldforge-denoise.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r57File),'utf8');
      assert.ok(txt.includes('2,520.00')&&txt.includes('2,100.00')&&txt.includes('5,140.00')&&txt.includes('420.00')&&txt.includes('280.00')&&txt.includes('780.00')&&txt.includes('4,360.00')&&txt.includes('84.82%')&&txt.includes('not_measured'),r57File+': contains exact 11-11 R12 worldforge+gpt-anime-denoise closed-form parameters');
    }
    // 2026-11-11 Round 13 (jammaru/sakutto + zandy700/Ultimate-Tracker scsm) closed-form FinOps verification
    const r58PathA=720.00+18.0*80.00+34.0*80.00;
    assert.equal(r58PathA.toFixed(2),'4880.00','11-11 R13 Path A total');
    const r58PathC=40.00+3.0*80.00+6.0*80.00;
    assert.equal(r58PathC.toFixed(2),'760.00','11-11 R13 Path C total');
    assert.equal((r58PathA-r58PathC).toFixed(2),'4120.00','11-11 R13 savings vs Path A');
    assert.equal(((r58PathA-r58PathC)/r58PathA*100).toFixed(2),'84.43','11-11 R13 pct savings vs Path A');
    for(const r58File of ['workshops/github-trending-radar/docs/sakutto-wllama-plamo-supply-chain-shock-selection-faq.md','workshops/github-trending-radar/docs/sakutto-wllama-plamo-supply-chain-shock-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r13-sakutto-shockmap.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r58File),'utf8');
      assert.ok(txt.includes('1,440.00')&&txt.includes('2,720.00')&&txt.includes('4,880.00')&&txt.includes('240.00')&&txt.includes('480.00')&&txt.includes('760.00')&&txt.includes('4,120.00')&&txt.includes('84.43%')&&txt.includes('not_measured'),r58File+': contains exact 11-11 R13 sakutto+scsm closed-form parameters');
    }
    // 2026-11-11 Round 14 (chutingyean/Agent-Cockpit + StargazerX0/SpecPilot) closed-form FinOps verification
    const r59PathA=8*450.00+35.0*80.00;
    assert.equal(r59PathA.toFixed(2),'6400.00','11-11 R14 Path A total');
    const r59PathC=2*450.00+4.0*80.00;
    assert.equal(r59PathC.toFixed(2),'1220.00','11-11 R14 Path C total');
    assert.equal((r59PathA-r59PathC).toFixed(2),'5180.00','11-11 R14 savings vs Path A');
    assert.equal(((r59PathA-r59PathC)/r59PathA*100).toFixed(2),'80.94','11-11 R14 pct savings vs Path A');
    for(const r59File of ['workshops/github-trending-radar/docs/agent-cockpit-specpilot-evidence-speculative-decoding-selection-faq.md','workshops/github-trending-radar/docs/agent-cockpit-specpilot-evidence-speculative-decoding-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r14-cockpit-specpilot.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r59File),'utf8');
      assert.ok(txt.includes('3,600.00')&&txt.includes('2,800.00')&&txt.includes('6,400.00')&&txt.includes('900.00')&&txt.includes('320.00')&&txt.includes('1,220.00')&&txt.includes('5,180.00')&&txt.includes('80.94%')&&txt.includes('not_measured'),r59File+': contains exact 11-11 R14 agent-cockpit+specpilot closed-form parameters');
    }
    // 2026-11-11 Round 15 (Robbyant/lingbot-touch + zju3dv/SplatAnything) closed-form FinOps verification
    const r60PathA=650*3.50+42.0*80.00;
    assert.equal(r60PathA.toFixed(2),'5635.00','11-11 R15 Path A total');
    const r60PathC=80*3.50+6.5*80.00;
    assert.equal(r60PathC.toFixed(2),'800.00','11-11 R15 Path C total');
    assert.equal((r60PathA-r60PathC).toFixed(2),'4835.00','11-11 R15 savings vs Path A');
    assert.equal(((r60PathA-r60PathC)/r60PathA*100).toFixed(2),'85.80','11-11 R15 pct savings vs Path A');
    for(const r60File of ['workshops/github-trending-radar/docs/lingbot-touch-splatanything-tactile-jepa-3dgs-selection-faq.md','workshops/github-trending-radar/docs/lingbot-touch-splatanything-tactile-jepa-3dgs-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r15-lingbot-splatanything.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r60File),'utf8');
      assert.ok(txt.includes('2,275.00')&&txt.includes('3,360.00')&&txt.includes('5,635.00')&&txt.includes('280.00')&&txt.includes('520.00')&&txt.includes('800.00')&&txt.includes('4,835.00')&&txt.includes('85.80%')&&txt.includes('not_measured'),r60File+': contains exact 11-11 R15 lingbot-touch+splatanything closed-form parameters');
    }
    // 2026-11-11 Round 16 (Video-Rebirth/hyperflow-h3-flash + KadoBOT/ComfyUI-H3-Continuity-Studio) closed-form FinOps verification
    const r61PathA=750*3.20+44.0*75.00;
    assert.equal(r61PathA.toFixed(2),'5700.00','11-11 R16 Path A total');
    const r61PathC=120*2.20+7.0*75.00;
    assert.equal(r61PathC.toFixed(2),'789.00','11-11 R16 Path C total');
    assert.equal((r61PathA-r61PathC).toFixed(2),'4911.00','11-11 R16 savings vs Path A');
    assert.equal(((r61PathA-r61PathC)/r61PathA*100).toFixed(2),'86.16','11-11 R16 pct savings vs Path A');
    for(const r61File of ['workshops/github-trending-radar/docs/hyperflow-h3-flash-continuity-studio-video-audio-selection-faq.md','workshops/github-trending-radar/docs/hyperflow-h3-flash-continuity-studio-video-audio-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r16-hyperflow-continuity.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r61File),'utf8');
      assert.ok(txt.includes('2,400.00')&&txt.includes('3,300.00')&&txt.includes('5,700.00')&&txt.includes('264.00')&&txt.includes('525.00')&&txt.includes('789.00')&&txt.includes('4,911.00')&&txt.includes('86.16%')&&txt.includes('not_measured'),r61File+': contains exact 11-11 R16 hyperflow+continuity-studio closed-form parameters');
    }
    // 2026-11-11 Round 17 (Moh4696/cinematic-skill + abouchedidxcode/open-source-hands) closed-form FinOps verification
    const r62PathA=320*2.50+62.0*80.00;
    assert.equal(r62PathA.toFixed(2),'5760.00','11-11 R17 Path A total');
    const r62PathC=24*2.50+9.5*80.00;
    assert.equal(r62PathC.toFixed(2),'820.00','11-11 R17 Path C total');
    assert.equal((r62PathA-r62PathC).toFixed(2),'4940.00','11-11 R17 savings vs Path A');
    assert.equal(((r62PathA-r62PathC)/r62PathA*100).toFixed(2),'85.76','11-11 R17 pct savings vs Path A');
    for(const r62File of ['workshops/github-trending-radar/docs/cinematic-skill-open-source-hands-code-film-gesture-selection-faq.md','workshops/github-trending-radar/docs/cinematic-skill-open-source-hands-code-film-gesture-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r17-cinematic-hands.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r62File),'utf8');
      assert.ok(txt.includes('800.00')&&txt.includes('4,960.00')&&txt.includes('5,760.00')&&txt.includes('60.00')&&txt.includes('760.00')&&txt.includes('820.00')&&txt.includes('4,940.00')&&txt.includes('85.76%')&&txt.includes('not_measured'),r62File+': contains exact 11-11 R17 cinematic-skill+open-source-hands closed-form parameters');
    }
    // 2026-11-11 Round 18 (eduwxyz/tucano + mdiri-ai/SoduWork) closed-form FinOps verification
    const r63PathA=1200*1.45+52.0*85.00;
    assert.equal(r63PathA.toFixed(2),'6160.00','11-11 R18 Path A total');
    const r63PathC=360.00+8.0*85.00;
    assert.equal(r63PathC.toFixed(2),'1040.00','11-11 R18 Path C total');
    assert.equal((r63PathA-r63PathC).toFixed(2),'5120.00','11-11 R18 savings vs Path A');
    assert.equal(((r63PathA-r63PathC)/r63PathA*100).toFixed(2),'83.12','11-11 R18 pct savings vs Path A');
    for(const r63File of ['workshops/github-trending-radar/docs/tucano-soduwork-multi-harness-team-governance-selection-faq.md','workshops/github-trending-radar/docs/tucano-soduwork-multi-harness-team-governance-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r18-tucano-soduwork.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r63File),'utf8');
      assert.ok(txt.includes('1,740.00')&&txt.includes('4,420.00')&&txt.includes('6,160.00')&&txt.includes('360.00')&&txt.includes('680.00')&&txt.includes('1,040.00')&&txt.includes('5,120.00')&&txt.includes('83.12%')&&txt.includes('not_measured'),r63File+': contains exact 11-11 R18 tucano+soduwork closed-form parameters');
    }
    // 2026-11-11 Round 19 (muaaz9329/cheap-ag + danyuchn/claude-work-mode) closed-form FinOps verification
    const r64PathA=2000*1.15+48.0*85.00;
    assert.equal(r64PathA.toFixed(2),'6380.00','11-11 R19 Path A total');
    const r64PathC=690.00+6.0*85.00;
    assert.equal(r64PathC.toFixed(2),'1200.00','11-11 R19 Path C total');
    assert.equal((r64PathA-r64PathC).toFixed(2),'5180.00','11-11 R19 savings vs Path A');
    assert.equal(((r64PathA-r64PathC)/r64PathA*100).toFixed(2),'81.19','11-11 R19 pct savings vs Path A');
    for(const r64File of ['workshops/github-trending-radar/docs/cheap-ag-claude-work-mode-quota-routing-selection-faq.md','workshops/github-trending-radar/docs/cheap-ag-claude-work-mode-quota-routing-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r19-cheapag-workmode.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r64File),'utf8');
      assert.ok(txt.includes('2,300.00')&&txt.includes('4,080.00')&&txt.includes('6,380.00')&&txt.includes('690.00')&&txt.includes('510.00')&&txt.includes('1,200.00')&&txt.includes('5,180.00')&&txt.includes('81.19%')&&txt.includes('not_measured'),r64File+': contains exact 11-11 R19 cheap-ag+claude-work-mode closed-form parameters');
    }
    // 2026-11-11 Round 20 (Balanov/shim + sksarvesh007/antiglaude) closed-form FinOps verification
    const r65PathA=3000*0.52+44.0*85.00;
    assert.equal(r65PathA.toFixed(2),'5300.00','11-11 R20 Path A total');
    const r65PathC=3000*0.14+5.0*85.00;
    assert.equal(r65PathC.toFixed(2),'845.00','11-11 R20 Path C total');
    assert.equal((r65PathA-r65PathC).toFixed(2),'4455.00','11-11 R20 savings vs Path A');
    assert.equal(((r65PathA-r65PathC)/r65PathA*100).toFixed(2),'84.06','11-11 R20 pct savings vs Path A');
    for(const r65File of ['workshops/github-trending-radar/docs/shim-antiglaude-zero-dep-harness-protocol-gateway-selection-faq.md','workshops/github-trending-radar/docs/shim-antiglaude-zero-dep-harness-protocol-gateway-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r20-shim-antiglaude.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r65File),'utf8');
      assert.ok(txt.includes('1,560.00')&&txt.includes('3,740.00')&&txt.includes('5,300.00')&&txt.includes('420.00')&&txt.includes('425.00')&&txt.includes('845.00')&&txt.includes('4,455.00')&&txt.includes('84.06%')&&txt.includes('not_measured'),r65File+': contains exact 11-11 R20 shim+antiglaude closed-form parameters');
    }
    // 2026-11-11 Round 21 (phuryn/mini-harness + aa1143/NamiAgent) closed-form FinOps verification
    const r66PathA=1741.50+558.50+46.0*85.00;
    assert.equal(r66PathA.toFixed(2),'6210.00','11-11 R21 Path A total');
    const r66PathC=150*2.25+22.50+6.0*85.00;
    assert.equal(r66PathC.toFixed(2),'870.00','11-11 R21 Path C total');
    assert.equal((r66PathA-r66PathC).toFixed(2),'5340.00','11-11 R21 savings vs Path A');
    assert.equal(((r66PathA-r66PathC)/r66PathA*100).toFixed(2),'85.99','11-11 R21 pct savings vs Path A');
    for(const r66File of ['workshops/github-trending-radar/docs/namiagent-mini-harness-glassbox-agent-engineering-selection-faq.md','workshops/github-trending-radar/docs/namiagent-mini-harness-glassbox-agent-engineering-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r21-nami-miniharness.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r66File),'utf8');
      assert.ok(txt.includes('2,300.00')&&txt.includes('3,910.00')&&txt.includes('6,210.00')&&txt.includes('360.00')&&txt.includes('510.00')&&txt.includes('870.00')&&txt.includes('5,340.00')&&txt.includes('85.99%')&&txt.includes('not_measured'),r66File+': contains exact 11-11 R21 mini-harness+namiagent closed-form parameters');
    }
    // 2026-11-11 Round 22 (govijr/terminal-mac + Lee-xeo/Claude-Cage) closed-form FinOps verification
    const r67PathA=8*180.00+48.0*85.00;
    assert.equal(r67PathA.toFixed(2),'5520.00','11-11 R22 Path A total');
    const r67PathC=800*0.25+6.5*85.00;
    assert.equal(r67PathC.toFixed(2),'752.50','11-11 R22 Path C total');
    assert.equal((r67PathA-r67PathC).toFixed(2),'4767.50','11-11 R22 savings vs Path A');
    assert.equal(((r67PathA-r67PathC)/r67PathA*100).toFixed(2),'86.37','11-11 R22 pct savings vs Path A');
    for(const r67File of ['workshops/github-trending-radar/docs/terminal-mac-claude-cage-computer-use-vm-isolation-selection-faq.md','workshops/github-trending-radar/docs/terminal-mac-claude-cage-computer-use-vm-isolation-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r22-claudecage-terminalmac.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r67File),'utf8');
      assert.ok(txt.includes('1,440.00')&&txt.includes('4,080.00')&&txt.includes('5,520.00')&&txt.includes('200.00')&&txt.includes('552.50')&&txt.includes('752.50')&&txt.includes('4,767.50')&&txt.includes('86.37%')&&txt.includes('not_measured'),r67File+': contains exact 11-11 R22 terminal-mac+claude-cage closed-form parameters');
    }
    // 2026-11-11 Round 23 (qybaihe/bla + hevnsnt/CVEngine) closed-form FinOps verification
    const r68PathA=2500*0.85+1200.00+45.0*90.00;
    assert.equal(r68PathA.toFixed(2),'7375.00','11-11 R23 Path A total');
    const r68PathC=310.00+7.0*90.00;
    assert.equal(r68PathC.toFixed(2),'940.00','11-11 R23 Path C total');
    assert.equal((r68PathA-r68PathC).toFixed(2),'6435.00','11-11 R23 savings vs Path A');
    assert.equal(((r68PathA-r68PathC)/r68PathA*100).toFixed(2),'87.25','11-11 R23 pct savings vs Path A');
    for(const r68File of ['workshops/github-trending-radar/docs/bla-cvengine-counter-rea-shield-attack-surface-mcp-selection-faq.md','workshops/github-trending-radar/docs/bla-cvengine-counter-rea-shield-attack-surface-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r23-bla-cvengine.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r68File),'utf8');
      assert.ok(txt.includes('3,325.00')&&txt.includes('4,050.00')&&txt.includes('7,375.00')&&txt.includes('310.00')&&txt.includes('630.00')&&txt.includes('940.00')&&txt.includes('6,435.00')&&txt.includes('87.25%')&&txt.includes('not_measured'),r68File+': contains exact 11-11 R23 bla+cvengine closed-form parameters');
    }
    // 2026-11-11 Round 24 (emanuele-em/kanzo + yjid/kensaku) closed-form FinOps verification
    const r69PathA=4000*0.36+240.00+42.0*85.00;
    assert.equal(r69PathA.toFixed(2),'5250.00','11-11 R24 Path A total');
    const r69PathC=4000*0.035+5.0*85.00;
    assert.equal(r69PathC.toFixed(2),'565.00','11-11 R24 Path C total');
    assert.equal((r69PathA-r69PathC).toFixed(2),'4685.00','11-11 R24 savings vs Path A');
    assert.equal(((r69PathA-r69PathC)/r69PathA*100).toFixed(2),'89.24','11-11 R24 pct savings vs Path A');
    for(const r69File of ['workshops/github-trending-radar/docs/kanzo-kensaku-rust-agent-kanban-local-ocr-search-mcp-selection-faq.md','workshops/github-trending-radar/docs/kanzo-kensaku-rust-agent-kanban-local-ocr-search-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r24-kanzo-kensaku.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r69File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,570.00')&&txt.includes('5,250.00')&&txt.includes('140.00')&&txt.includes('425.00')&&txt.includes('565.00')&&txt.includes('4,685.00')&&txt.includes('89.24%')&&txt.includes('not_measured'),r69File+': contains exact 11-11 R24 kanzo+kensaku closed-form parameters');
    }
    // 2026-11-11 Round 25 (t8y2/motty + phone-harness/mcp) closed-form FinOps verification
    const r70PathA=1650.00+510.00+44.0*85.00;
    assert.equal(r70PathA.toFixed(2),'5900.00','11-11 R25 Path A total');
    const r70PathC=2*80.00+4000*0.05+120.00+6.0*85.00;
    assert.equal(r70PathC.toFixed(2),'990.00','11-11 R25 Path C total');
    assert.equal((r70PathA-r70PathC).toFixed(2),'4910.00','11-11 R25 savings vs Path A');
    assert.equal(((r70PathA-r70PathC)/r70PathA*100).toFixed(2),'83.22','11-11 R25 pct savings vs Path A');
    for(const r70File of ['workshops/github-trending-radar/docs/motty-phone-harness-native-ssh-mobile-mcp-selection-faq.md','workshops/github-trending-radar/docs/motty-phone-harness-native-ssh-mobile-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r25-motty-phoneharness.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r70File),'utf8');
      assert.ok(txt.includes('2,160.00')&&txt.includes('3,740.00')&&txt.includes('5,900.00')&&txt.includes('480.00')&&txt.includes('510.00')&&txt.includes('990.00')&&txt.includes('4,910.00')&&txt.includes('83.22%')&&txt.includes('not_measured'),r70File+': contains exact 11-11 R25 motty+phone-harness closed-form parameters');
    }
    // 2026-11-11 Round 26 (zaxiu88888/issue-rag + Dongbumlee/ontosmith) closed-form FinOps verification
    const r71PathA=1920.00+46.0*85.00;
    assert.equal(r71PathA.toFixed(2),'5830.00','11-11 R26 Path A total');
    const r71PathC=340.00+6.0*85.00;
    assert.equal(r71PathC.toFixed(2),'850.00','11-11 R26 Path C total');
    assert.equal((r71PathA-r71PathC).toFixed(2),'4980.00','11-11 R26 savings vs Path A');
    assert.equal(((r71PathA-r71PathC)/r71PathA*100).toFixed(2),'85.42','11-11 R26 pct savings vs Path A');
    for(const r71File of ['workshops/github-trending-radar/docs/issue-rag-ontosmith-judge-audited-rag-governed-kg-selection-faq.md','workshops/github-trending-radar/docs/issue-rag-ontosmith-judge-audited-rag-governed-kg-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r26-issuerag-ontosmith.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r71File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,910.00')&&txt.includes('5,830.00')&&txt.includes('340.00')&&txt.includes('510.00')&&txt.includes('850.00')&&txt.includes('4,980.00')&&txt.includes('85.42%')&&txt.includes('not_measured'),r71File+': contains exact 11-11 R26 issue-rag+ontosmith closed-form parameters');
    }
    // 2026-11-11 Round 27 (SAOS-3624/dsh-see-now + anomalyco/browse) closed-form FinOps verification
    const r72PathA=2450.00+46.0*85.00;
    assert.equal(r72PathA.toFixed(2),'6360.00','11-11 R27 Path A total');
    const r72PathC=290.00+6.0*85.00;
    assert.equal(r72PathC.toFixed(2),'800.00','11-11 R27 Path C total');
    assert.equal((r72PathA-r72PathC).toFixed(2),'5560.00','11-11 R27 savings vs Path A');
    assert.equal(((r72PathA-r72PathC)/r72PathA*100).toFixed(2),'87.42','11-11 R27 pct savings vs Path A');
    for(const r72File of ['workshops/github-trending-radar/docs/dsh-see-now-anomaly-browse-screen-vision-browser-mcp-selection-faq.md','workshops/github-trending-radar/docs/dsh-see-now-anomaly-browse-screen-vision-browser-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r27-dshseenow-browse.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r72File),'utf8');
      assert.ok(txt.includes('2,450.00')&&txt.includes('3,910.00')&&txt.includes('6,360.00')&&txt.includes('290.00')&&txt.includes('510.00')&&txt.includes('800.00')&&txt.includes('5,560.00')&&txt.includes('87.42%')&&txt.includes('not_measured'),r72File+': contains exact 11-11 R27 dsh-see-now+anomaly-browse closed-form parameters');
    }
    // 2026-11-11 Round 28 (CopilotKit/OpenDuet + andyhuo520/digital-human-koubo) closed-form FinOps verification
    const r73PathA=2200.00+52.0*85.00;
    assert.equal(r73PathA.toFixed(2),'6620.00','11-11 R28 Path A total');
    const r73PathC=270.00+190.00+6.0*85.00;
    assert.equal(r73PathC.toFixed(2),'970.00','11-11 R28 Path C total');
    assert.equal((r73PathA-r73PathC).toFixed(2),'5650.00','11-11 R28 savings vs Path A');
    assert.equal(((r73PathA-r73PathC)/r73PathA*100).toFixed(2),'85.35','11-11 R28 pct savings vs Path A');
    for(const r73File of ['workshops/github-trending-radar/docs/openduet-digital-human-koubo-proactive-agent-video-mcp-selection-faq.md','workshops/github-trending-radar/docs/openduet-digital-human-koubo-proactive-agent-video-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r28-openduet-koubo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r73File),'utf8');
      assert.ok(txt.includes('2,200.00')&&txt.includes('4,420.00')&&txt.includes('6,620.00')&&txt.includes('460.00')&&txt.includes('510.00')&&txt.includes('970.00')&&txt.includes('5,650.00')&&txt.includes('85.35%')&&txt.includes('not_measured'),r73File+': contains exact 11-11 R28 openduet+digital-human-koubo closed-form parameters');
    }
    // 2026-11-11 Round 29 (yzlin286-wq/Deepscient + islandmed/SculptForge) closed-form FinOps verification
    const r74PathA=18*45.00+1390.00+48.0*85.00;
    assert.equal(r74PathA.toFixed(2),'6280.00','11-11 R29 Path A total');
    const r74PathC=340.00+6.0*85.00;
    assert.equal(r74PathC.toFixed(2),'850.00','11-11 R29 Path C total');
    assert.equal((r74PathA-r74PathC).toFixed(2),'5430.00','11-11 R29 savings vs Path A');
    assert.equal(((r74PathA-r74PathC)/r74PathA*100).toFixed(2),'86.46','11-11 R29 pct savings vs Path A');
    for(const r74File of ['workshops/github-trending-radar/docs/deepscient-sculptforge-scientific-workbench-3d-sculpt-mcp-selection-faq.md','workshops/github-trending-radar/docs/deepscient-sculptforge-scientific-workbench-3d-sculpt-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r29-deepscient-sculptforge.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r74File),'utf8');
      assert.ok(txt.includes('2,200.00')&&txt.includes('4,080.00')&&txt.includes('6,280.00')&&txt.includes('340.00')&&txt.includes('510.00')&&txt.includes('850.00')&&txt.includes('5,430.00')&&txt.includes('86.46%')&&txt.includes('not_measured'),r74File+': contains exact 11-11 R29 deepscient+sculptforge closed-form parameters');
    }
    // 2026-11-11 Round 30 (jackwener/DSH-Android + anonnerdfrenzy/survival-llm) closed-form FinOps verification
    const r75PathA=1620.00+48.0*85.00;
    assert.equal(r75PathA.toFixed(2),'5700.00','11-11 R30 Path A total');
    const r75PathC=5000*0.048+5.0*85.00;
    assert.equal(r75PathC.toFixed(2),'665.00','11-11 R30 Path C total');
    assert.equal((r75PathA-r75PathC).toFixed(2),'5035.00','11-11 R30 savings vs Path A');
    assert.equal(((r75PathA-r75PathC)/r75PathA*100).toFixed(2),'88.33','11-11 R30 pct savings vs Path A');
    for(const r75File of ['workshops/github-trending-radar/docs/dsh-android-survival-llm-on-device-agent-offline-rag-selection-faq.md','workshops/github-trending-radar/docs/dsh-android-survival-llm-on-device-agent-offline-rag-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r30-dshandroid-survivalllm.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r75File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('4,080.00')&&txt.includes('5,700.00')&&txt.includes('240.00')&&txt.includes('425.00')&&txt.includes('665.00')&&txt.includes('5,035.00')&&txt.includes('88.33%')&&txt.includes('not_measured'),r75File+': contains exact 11-11 R30 dsh-android+survival-llm closed-form parameters');
    }
    // 2026-11-11 Round 31 (actionow-ai/vvv + andrew-babo/muse4ai) closed-form FinOps verification
    const r76PathA=1640.00+48.0*80.00;
    assert.equal(r76PathA.toFixed(2),'5480.00','11-11 R31 Path A total');
    const r76PathC=260.00+6.0*80.00;
    assert.equal(r76PathC.toFixed(2),'740.00','11-11 R31 Path C total');
    assert.equal((r76PathA-r76PathC).toFixed(2),'4740.00','11-11 R31 savings vs Path A');
    assert.equal(((r76PathA-r76PathC)/r76PathA*100).toFixed(2),'86.50','11-11 R31 pct savings vs Path A');
    for(const r76File of ['workshops/github-trending-radar/docs/vvv-muse4ai-reusable-video-template-local-media-mcp-selection-faq.md','workshops/github-trending-radar/docs/vvv-muse4ai-reusable-video-template-local-media-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r31-muse4ai-vvv.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r76File),'utf8');
      assert.ok(txt.includes('1,640.00')&&txt.includes('3,840.00')&&txt.includes('5,480.00')&&txt.includes('260.00')&&txt.includes('480.00')&&txt.includes('740.00')&&txt.includes('4,740.00')&&txt.includes('86.50%')&&txt.includes('not_measured'),r76File+': contains exact 11-11 R31 vvv+muse4ai closed-form parameters');
    }
    // 2026-11-11 Round 32 (Luciferutts/partspilot + dodo-labs-ai/mem-forge) closed-form FinOps verification
    const r77PathA=1840.00+48.0*85.00;
    assert.equal(r77PathA.toFixed(2),'5920.00','11-11 R32 Path A total');
    const r77PathC=270.00+6.0*85.00;
    assert.equal(r77PathC.toFixed(2),'780.00','11-11 R32 Path C total');
    assert.equal((r77PathA-r77PathC).toFixed(2),'5140.00','11-11 R32 savings vs Path A');
    assert.equal(((r77PathA-r77PathC)/r77PathA*100).toFixed(2),'86.82','11-11 R32 pct savings vs Path A');
    for(const r77File of ['workshops/github-trending-radar/docs/partspilot-mem-forge-b2b-evidence-workbench-team-memory-selection-faq.md','workshops/github-trending-radar/docs/partspilot-mem-forge-b2b-evidence-workbench-team-memory-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r32-partspilot-memforge.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r77File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('4,080.00')&&txt.includes('5,920.00')&&txt.includes('270.00')&&txt.includes('510.00')&&txt.includes('780.00')&&txt.includes('5,140.00')&&txt.includes('86.82%')&&txt.includes('not_measured'),r77File+': contains exact 11-11 R32 partspilot+mem-forge closed-form parameters');
    }
    // 2026-11-11 Round 33 (saksham10arora-dotcom/everything-claude-codex + liangjianshu/multimodal-image-retrieval) closed-form FinOps verification
    const r78PathA=1720.00+46.0*85.00;
    assert.equal(r78PathA.toFixed(2),'5630.00','11-11 R33 Path A total');
    const r78PathC=250.00+5.0*85.00;
    assert.equal(r78PathC.toFixed(2),'675.00','11-11 R33 Path C total');
    assert.equal((r78PathA-r78PathC).toFixed(2),'4955.00','11-11 R33 savings vs Path A');
    assert.equal(((r78PathA-r78PathC)/r78PathA*100).toFixed(2),'88.01','11-11 R33 pct savings vs Path A');
    for(const r78File of ['workshops/github-trending-radar/docs/everything-claude-codex-multimodal-retrieval-infonce-selection-faq.md','workshops/github-trending-radar/docs/everything-claude-codex-multimodal-retrieval-infonce-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r33-ecx-multimodal.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r78File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,910.00')&&txt.includes('5,630.00')&&txt.includes('250.00')&&txt.includes('425.00')&&txt.includes('675.00')&&txt.includes('4,955.00')&&txt.includes('88.01%')&&txt.includes('not_measured'),r78File+': contains exact 11-11 R33 ecx+multimodal closed-form parameters');
    }
    // 2026-11-11 Round 34 (t3dotgg/tstack + morganlinton/BeautifulRust) closed-form FinOps verification
    const r79PathA=1650.00+48.0*90.00;
    assert.equal(r79PathA.toFixed(2),'5970.00','11-11 R34 Path A total');
    const r79PathC=310.00+6.0*90.00;
    assert.equal(r79PathC.toFixed(2),'850.00','11-11 R34 Path C total');
    assert.equal((r79PathA-r79PathC).toFixed(2),'5120.00','11-11 R34 savings vs Path A');
    assert.equal(((r79PathA-r79PathC)/r79PathA*100).toFixed(2),'85.76','11-11 R34 pct savings vs Path A');
    for(const r79File of ['workshops/github-trending-radar/docs/tstack-beautifulrust-pr-lifecycle-idiomatic-rust-skills-selection-faq.md','workshops/github-trending-radar/docs/tstack-beautifulrust-pr-lifecycle-idiomatic-rust-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r34-tstack-beautifulrust.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r79File),'utf8');
      assert.ok(txt.includes('1,650.00')&&txt.includes('4,320.00')&&txt.includes('5,970.00')&&txt.includes('310.00')&&txt.includes('540.00')&&txt.includes('850.00')&&txt.includes('5,120.00')&&txt.includes('85.76%')&&txt.includes('not_measured'),r79File+': contains exact 11-11 R34 tstack+beautifulrust closed-form parameters');
    }
    // 2026-11-11 Round 35 (Motionsites-AI/claude-skill + daveebbelaar/bama) closed-form FinOps verification
    const r80PathA=1680.00+48.0*90.00;
    assert.equal(r80PathA.toFixed(2),'6000.00','11-11 R35 Path A total');
    const r80PathC=280.00+6.0*90.00;
    assert.equal(r80PathC.toFixed(2),'820.00','11-11 R35 Path C total');
    assert.equal((r80PathA-r80PathC).toFixed(2),'5180.00','11-11 R35 savings vs Path A');
    assert.equal(((r80PathA-r80PathC)/r80PathA*100).toFixed(2),'86.33','11-11 R35 pct savings vs Path A');
    for(const r80File of ['workshops/github-trending-radar/docs/motionsites-bama-cinematic-web-native-mac-app-skills-selection-faq.md','workshops/github-trending-radar/docs/motionsites-bama-cinematic-web-native-mac-app-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r35-motionsites-bama.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r80File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('4,320.00')&&txt.includes('6,000.00')&&txt.includes('280.00')&&txt.includes('540.00')&&txt.includes('820.00')&&txt.includes('5,180.00')&&txt.includes('86.33%')&&txt.includes('not_measured'),r80File+': contains exact 11-11 R35 motionsites+bama closed-form parameters');
    }
    // 2026-11-11 Round 36 (Interactive-Active-AI/NextTransformer + zzp1221/Research-Assistant-Agent) closed-form FinOps verification
    const r81PathA=2350.00+52.0*90.00;
    assert.equal(r81PathA.toFixed(2),'7030.00','11-11 R36 Path A total');
    const r81PathC=380.00+6.0*90.00;
    assert.equal(r81PathC.toFixed(2),'920.00','11-11 R36 Path C total');
    assert.equal((r81PathA-r81PathC).toFixed(2),'6110.00','11-11 R36 savings vs Path A');
    assert.equal(((r81PathA-r81PathC)/r81PathA*100).toFixed(2),'86.91','11-11 R36 pct savings vs Path A');
    for(const r81File of ['workshops/github-trending-radar/docs/nexttransformer-research-assistant-agent-compute-matched-autoresearch-selection-faq.md','workshops/github-trending-radar/docs/nexttransformer-research-assistant-agent-compute-matched-autoresearch-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r36-nexttransformer-research-agent.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r81File),'utf8');
      assert.ok(txt.includes('2,350.00')&&txt.includes('4,680.00')&&txt.includes('7,030.00')&&txt.includes('380.00')&&txt.includes('540.00')&&txt.includes('920.00')&&txt.includes('6,110.00')&&txt.includes('86.91%')&&txt.includes('not_measured'),r81File+': contains exact 11-11 R36 nexttransformer+researchagent closed-form parameters');
    }
    // 2026-11-11 Round 37 (TIGER-AI-Lab/WebsiteBench + antins-labs/VisSearch-Bench-v1) closed-form FinOps verification
    const r82PathA=1540.00+46.0*90.00;
    assert.equal(r82PathA.toFixed(2),'5680.00','11-11 R37 Path A total');
    const r82PathC=250.00+5.0*90.00;
    assert.equal(r82PathC.toFixed(2),'700.00','11-11 R37 Path C total');
    assert.equal((r82PathA-r82PathC).toFixed(2),'4980.00','11-11 R37 savings vs Path A');
    assert.equal(((r82PathA-r82PathC)/r82PathA*100).toFixed(2),'87.68','11-11 R37 pct savings vs Path A');
    for(const r82File of ['workshops/github-trending-radar/docs/websitebench-vissearch-bench-browser-exploration-visual-search-selection-faq.md','workshops/github-trending-radar/docs/websitebench-vissearch-bench-browser-exploration-visual-search-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r37-websitebench-vissearch.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r82File),'utf8');
      assert.ok(txt.includes('1,540.00')&&txt.includes('4,140.00')&&txt.includes('5,680.00')&&txt.includes('250.00')&&txt.includes('450.00')&&txt.includes('700.00')&&txt.includes('4,980.00')&&txt.includes('87.68%')&&txt.includes('not_measured'),r82File+': contains exact 11-11 R37 websitebench+vissearch closed-form parameters');
    }
    // 2026-11-11 Round 38 (adventists-ai/sophon-realtime + mutonby/agentring) closed-form FinOps verification
    const r83PathA=2060.00+44.0*90.00;
    assert.equal(r83PathA.toFixed(2),'6020.00','11-11 R38 Path A total');
    const r83PathC=410.00+5.0*90.00;
    assert.equal(r83PathC.toFixed(2),'860.00','11-11 R38 Path C total');
    assert.equal((r83PathA-r83PathC).toFixed(2),'5160.00','11-11 R38 savings vs Path A');
    assert.equal(((r83PathA-r83PathC)/r83PathA*100).toFixed(2),'85.71','11-11 R38 pct savings vs Path A');
    for(const r83File of ['workshops/github-trending-radar/docs/sophon-realtime-agentring-full-duplex-voice-voip-mcp-selection-faq.md','workshops/github-trending-radar/docs/sophon-realtime-agentring-full-duplex-voice-voip-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r38-sophon-agentring.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r83File),'utf8');
      assert.ok(txt.includes('2,060.00')&&txt.includes('3,960.00')&&txt.includes('6,020.00')&&txt.includes('410.00')&&txt.includes('450.00')&&txt.includes('860.00')&&txt.includes('5,160.00')&&txt.includes('85.71%')&&txt.includes('not_measured'),r83File+': contains exact 11-11 R38 sophon+agentring closed-form parameters');
    }
    // 2026-11-11 Round 39 (AetherLabsAI/RobotAgentBench + tuotuoLyu/ForesightSafety-VLA) closed-form FinOps verification
    const r84PathA=1920.00+48.0*90.00;
    assert.equal(r84PathA.toFixed(2),'6240.00','11-11 R39 Path A total');
    const r84PathC=320.00+5.0*90.00;
    assert.equal(r84PathC.toFixed(2),'770.00','11-11 R39 Path C total');
    assert.equal((r84PathA-r84PathC).toFixed(2),'5470.00','11-11 R39 savings vs Path A');
    assert.equal(((r84PathA-r84PathC)/r84PathA*100).toFixed(2),'87.66','11-11 R39 pct savings vs Path A');
    for(const r84File of ['workshops/github-trending-radar/docs/robotagentbench-foresightsafety-vla-household-autonomy-safety-selection-faq.md','workshops/github-trending-radar/docs/robotagentbench-foresightsafety-vla-household-autonomy-safety-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r39-robotagentbench-foresightsafety.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r84File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('4,320.00')&&txt.includes('6,240.00')&&txt.includes('320.00')&&txt.includes('450.00')&&txt.includes('770.00')&&txt.includes('5,470.00')&&txt.includes('87.66%')&&txt.includes('not_measured'),r84File+': contains exact 11-11 R39 robotagent+foresightvla closed-form parameters');
    }
    // 2026-11-11 Round 40 (ZiChuanLan/agent-purge + makushingu/harness-maxxing) closed-form FinOps verification
    const r85PathA=1620.00+45.0*90.00;
    assert.equal(r85PathA.toFixed(2),'5670.00','11-11 R40 Path A total');
    const r85PathC=240.00+5.0*90.00;
    assert.equal(r85PathC.toFixed(2),'690.00','11-11 R40 Path C total');
    assert.equal((r85PathA-r85PathC).toFixed(2),'4980.00','11-11 R40 savings vs Path A');
    assert.equal(((r85PathA-r85PathC)/r85PathA*100).toFixed(2),'87.83','11-11 R40 pct savings vs Path A');
    for(const r85File of ['workshops/github-trending-radar/docs/agent-purge-harness-maxxing-persona-governance-control-room-selection-faq.md','workshops/github-trending-radar/docs/agent-purge-harness-maxxing-persona-governance-control-room-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r40-agentpurge-harnessmaxxing.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r85File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('4,050.00')&&txt.includes('5,670.00')&&txt.includes('240.00')&&txt.includes('450.00')&&txt.includes('690.00')&&txt.includes('4,980.00')&&txt.includes('87.83%')&&txt.includes('not_measured'),r85File+': contains exact 11-11 R40 agentpurge+harnessmaxxing closed-form parameters');
    }
    // 2026-11-11 Round 41 (MCG-NJU/AutoTavern + sirioberati/YouTube-AI-Motion-Graphics) closed-form FinOps verification
    const r86PathA=1840.00+50.0*90.00;
    assert.equal(r86PathA.toFixed(2),'6340.00','11-11 R41 Path A total');
    const r86PathC=270.00+5.0*90.00;
    assert.equal(r86PathC.toFixed(2),'720.00','11-11 R41 Path C total');
    assert.equal((r86PathA-r86PathC).toFixed(2),'5620.00','11-11 R41 savings vs Path A');
    assert.equal(((r86PathA-r86PathC)/r86PathA*100).toFixed(2),'88.64','11-11 R41 pct savings vs Path A');
    for(const r86File of ['workshops/github-trending-radar/docs/autotavern-youtube-ai-motion-graphics-strategy-gym-gsap-skills-selection-faq.md','workshops/github-trending-radar/docs/autotavern-youtube-ai-motion-graphics-strategy-gym-gsap-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r41-autotavern-ytmotion.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r86File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('4,500.00')&&txt.includes('6,340.00')&&txt.includes('270.00')&&txt.includes('450.00')&&txt.includes('720.00')&&txt.includes('5,620.00')&&txt.includes('88.64%')&&txt.includes('not_measured'),r86File+': contains exact 11-11 R41 autotavern+ytmotion closed-form parameters');
    }
    // 2026-11-11 Round 42 (lxe/phoneuse + swipt-automation/swipt) closed-form FinOps verification
    const r87PathA=1540.00+44.0*90.00;
    assert.equal(r87PathA.toFixed(2),'5500.00','11-11 R42 Path A total');
    const r87PathC=220.00+5.0*90.00;
    assert.equal(r87PathC.toFixed(2),'670.00','11-11 R42 Path C total');
    assert.equal((r87PathA-r87PathC).toFixed(2),'4830.00','11-11 R42 savings vs Path A');
    assert.equal(((r87PathA-r87PathC)/r87PathA*100).toFixed(2),'87.82','11-11 R42 pct savings vs Path A');
    for(const r87File of ['workshops/github-trending-radar/docs/phoneuse-swipt-airplay-bluetooth-hid-coredevice-ios-agent-selection-faq.md','workshops/github-trending-radar/docs/phoneuse-swipt-airplay-bluetooth-hid-coredevice-ios-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r42-phoneuse-swipt.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r87File),'utf8');
      assert.ok(txt.includes('1,540.00')&&txt.includes('3,960.00')&&txt.includes('5,500.00')&&txt.includes('220.00')&&txt.includes('450.00')&&txt.includes('670.00')&&txt.includes('4,830.00')&&txt.includes('87.82%')&&txt.includes('not_measured'),r87File+': contains exact 11-11 R42 phoneuse+swipt closed-form parameters');
    }
    // 2026-11-11 Round 43 (devvmhq/devvm + tobi/wrapvm) closed-form FinOps verification
    const r88PathA=1680.00+45.0*90.00;
    assert.equal(r88PathA.toFixed(2),'5730.00','11-11 R43 Path A total');
    const r88PathC=250.00+5.0*90.00;
    assert.equal(r88PathC.toFixed(2),'700.00','11-11 R43 Path C total');
    assert.equal((r88PathA-r88PathC).toFixed(2),'5030.00','11-11 R43 savings vs Path A');
    assert.equal(((r88PathA-r88PathC)/r88PathA*100).toFixed(2),'87.78','11-11 R43 pct savings vs Path A');
    for(const r88File of ['workshops/github-trending-radar/docs/devvm-wrapvm-per-project-vm-xfce-agent-desktop-selection-faq.md','workshops/github-trending-radar/docs/devvm-wrapvm-per-project-vm-xfce-agent-desktop-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r43-devvm-wrapvm.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r88File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('4,050.00')&&txt.includes('5,730.00')&&txt.includes('250.00')&&txt.includes('450.00')&&txt.includes('700.00')&&txt.includes('5,030.00')&&txt.includes('87.78%')&&txt.includes('not_measured'),r88File+': contains exact 11-11 R43 devvm+wrapvm closed-form parameters');
    }
    // 2026-11-11 Round 44 (phuryn/product-engineering + Juneo-Lab/decision-forge) closed-form FinOps verification
    const r89PathA=1760.00+48.0*90.00;
    assert.equal(r89PathA.toFixed(2),'6080.00','11-11 R44 Path A total');
    const r89PathC=260.00+5.0*90.00;
    assert.equal(r89PathC.toFixed(2),'710.00','11-11 R44 Path C total');
    assert.equal((r89PathA-r89PathC).toFixed(2),'5370.00','11-11 R44 savings vs Path A');
    assert.equal(((r89PathA-r89PathC)/r89PathA*100).toFixed(2),'88.32','11-11 R44 pct savings vs Path A');
    for(const r89File of ['workshops/github-trending-radar/docs/product-engineering-decision-forge-44-skills-policy-compiler-selection-faq.md','workshops/github-trending-radar/docs/product-engineering-decision-forge-44-skills-policy-compiler-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r44-producteng-decisionforge.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r89File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('4,320.00')&&txt.includes('6,080.00')&&txt.includes('260.00')&&txt.includes('450.00')&&txt.includes('710.00')&&txt.includes('5,370.00')&&txt.includes('88.32%')&&txt.includes('not_measured'),r89File+': contains exact 11-11 R44 producteng+decisionforge closed-form parameters');
    }
    // 2026-11-11 Round 45 (Balanov/uncut + anomalyco/strobe) closed-form FinOps verification
    const r90PathA=1580.00+44.0*90.00;
    assert.equal(r90PathA.toFixed(2),'5540.00','11-11 R45 Path A total');
    const r90PathC=230.00+5.0*90.00;
    assert.equal(r90PathC.toFixed(2),'680.00','11-11 R45 Path C total');
    assert.equal((r90PathA-r90PathC).toFixed(2),'4860.00','11-11 R45 savings vs Path A');
    assert.equal(((r90PathA-r90PathC)/r90PathA*100).toFixed(2),'87.73','11-11 R45 pct savings vs Path A');
    for(const r90File of ['workshops/github-trending-radar/docs/uncut-strobe-lossless-headless-harness-agent-profiler-selection-faq.md','workshops/github-trending-radar/docs/uncut-strobe-lossless-headless-harness-agent-profiler-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r45-uncut-strobe.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r90File),'utf8');
      assert.ok(txt.includes('1,580.00')&&txt.includes('3,960.00')&&txt.includes('5,540.00')&&txt.includes('230.00')&&txt.includes('450.00')&&txt.includes('680.00')&&txt.includes('4,860.00')&&txt.includes('87.73%')&&txt.includes('not_measured'),r90File+': contains exact 11-11 R45 uncut+strobe closed-form parameters');
    }
    // 2026-11-11 Round 46 (gh9ko8y/graphmemory + Junhan2/ztd-charts) closed-form FinOps verification
    const r91PathA=1640.00+45.0*90.00;
    assert.equal(r91PathA.toFixed(2),'5690.00','11-11 R46 Path A total');
    const r91PathC=240.00+5.0*90.00;
    assert.equal(r91PathC.toFixed(2),'690.00','11-11 R46 Path C total');
    assert.equal((r91PathA-r91PathC).toFixed(2),'5000.00','11-11 R46 savings vs Path A');
    assert.equal(((r91PathA-r91PathC)/r91PathA*100).toFixed(2),'87.87','11-11 R46 pct savings vs Path A');
    for(const r91File of ['workshops/github-trending-radar/docs/graphmemory-ztd-charts-bitemporal-decay-memory-svg-mcp-selection-faq.md','workshops/github-trending-radar/docs/graphmemory-ztd-charts-bitemporal-decay-memory-svg-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r46-graphmemory-ztdcharts.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r91File),'utf8');
      assert.ok(txt.includes('1,640.00')&&txt.includes('4,050.00')&&txt.includes('5,690.00')&&txt.includes('240.00')&&txt.includes('450.00')&&txt.includes('690.00')&&txt.includes('5,000.00')&&txt.includes('87.87%')&&txt.includes('not_measured'),r91File+': contains exact 11-11 R46 graphmemory+ztdcharts closed-form parameters');
    }
    // 2026-11-11 Round 47 (apekshik/anyscene + majorminorlabs/hermes-voice) closed-form FinOps verification
    const r92PathA=1740.00+48.0*90.00;
    assert.equal(r92PathA.toFixed(2),'6060.00','11-11 R47 Path A total');
    const r92PathC=340.00+5.0*90.00;
    assert.equal(r92PathC.toFixed(2),'790.00','11-11 R47 Path C total');
    assert.equal((r92PathA-r92PathC).toFixed(2),'5270.00','11-11 R47 savings vs Path A');
    assert.equal(((r92PathA-r92PathC)/r92PathA*100).toFixed(2),'86.96','11-11 R47 pct savings vs Path A');
    for(const r92File of ['workshops/github-trending-radar/docs/anyscene-hermes-voice-blender-3d-scene-echo-show-agent-selection-faq.md','workshops/github-trending-radar/docs/anyscene-hermes-voice-blender-3d-scene-echo-show-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r47-anyscene-hermesvoice.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r92File),'utf8');
      assert.ok(txt.includes('1,740.00')&&txt.includes('4,320.00')&&txt.includes('6,060.00')&&txt.includes('340.00')&&txt.includes('450.00')&&txt.includes('790.00')&&txt.includes('5,270.00')&&txt.includes('86.96%')&&txt.includes('not_measured'),r92File+': contains exact 11-11 R47 anyscene+hermesvoice closed-form parameters');
    }
    // 2026-11-11 Round 48 (duyunzhoudyz/dyz-med-paper-skills + poco-ai/agentero-dsh-plugin) closed-form FinOps verification
    const r93PathA=1480.00+44.0*90.00;
    assert.equal(r93PathA.toFixed(2),'5440.00','11-11 R48 Path A total');
    const r93PathC=210.00+5.0*90.00;
    assert.equal(r93PathC.toFixed(2),'660.00','11-11 R48 Path C total');
    assert.equal((r93PathA-r93PathC).toFixed(2),'4780.00','11-11 R48 savings vs Path A');
    assert.equal(((r93PathA-r93PathC)/r93PathA*100).toFixed(2),'87.87','11-11 R48 pct savings vs Path A');
    for(const r93File of ['workshops/github-trending-radar/docs/dyz-med-paper-skills-agentero-dsh-clinical-research-vault-selection-faq.md','workshops/github-trending-radar/docs/dyz-med-paper-skills-agentero-dsh-clinical-research-vault-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r48-medpaper-agentero.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r93File),'utf8');
      assert.ok(txt.includes('1,480.00')&&txt.includes('3,960.00')&&txt.includes('5,440.00')&&txt.includes('210.00')&&txt.includes('450.00')&&txt.includes('660.00')&&txt.includes('4,780.00')&&txt.includes('87.87%')&&txt.includes('not_measured'),r93File+': contains exact 11-11 R48 medpaper+agenterodsh closed-form parameters');
    }
    // 2026-11-11 Round 49 (RikiyaT/lm_understand-logs + divagr18/QwenPU) closed-form FinOps verification
    const r94PathA=1960.00+46.0*90.00;
    assert.equal(r94PathA.toFixed(2),'6100.00','11-11 R49 Path A total');
    const r94PathC=290.00+5.0*90.00;
    assert.equal(r94PathC.toFixed(2),'740.00','11-11 R49 Path C total');
    assert.equal((r94PathA-r94PathC).toFixed(2),'5360.00','11-11 R49 savings vs Path A');
    assert.equal(((r94PathA-r94PathC)/r94PathA*100).toFixed(2),'87.87','11-11 R49 pct savings vs Path A');
    for(const r94File of ['workshops/github-trending-radar/docs/lm-understand-logs-qwenpu-weight-space-programming-in-weights-npu-selection-faq.md','workshops/github-trending-radar/docs/lm-understand-logs-qwenpu-weight-space-programming-in-weights-npu-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r49-weightspace-qwenpu.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r94File),'utf8');
      assert.ok(txt.includes('1,960.00')&&txt.includes('4,140.00')&&txt.includes('6,100.00')&&txt.includes('290.00')&&txt.includes('450.00')&&txt.includes('740.00')&&txt.includes('5,360.00')&&txt.includes('87.87%')&&txt.includes('not_measured'),r94File+': contains exact 11-11 R49 weightspace+qwenpu closed-form parameters');
    }
    // 2026-11-11 Round 50 (Fanqi89/dsh-craft-anything + tavern-labs-ai/persona-ai-sdk) closed-form FinOps verification
    const r95PathA=1620.00+45.0*90.00;
    assert.equal(r95PathA.toFixed(2),'5670.00','11-11 R50 Path A total');
    const r95PathC=240.00+5.0*90.00;
    assert.equal(r95PathC.toFixed(2),'690.00','11-11 R50 Path C total');
    assert.equal((r95PathA-r95PathC).toFixed(2),'4980.00','11-11 R50 savings vs Path A');
    assert.equal(((r95PathA-r95PathC)/r95PathA*100).toFixed(2),'87.83','11-11 R50 pct savings vs Path A');
    for(const r95File of ['workshops/github-trending-radar/docs/dsh-craft-anything-persona-ai-sdk-cleanroom-reverse-persona-runtime-selection-faq.md','workshops/github-trending-radar/docs/dsh-craft-anything-persona-ai-sdk-cleanroom-reverse-persona-runtime-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r50-dshcraft-personasdk.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r95File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('4,050.00')&&txt.includes('5,670.00')&&txt.includes('240.00')&&txt.includes('450.00')&&txt.includes('690.00')&&txt.includes('4,980.00')&&txt.includes('87.83%')&&txt.includes('not_measured'),r95File+': contains exact 11-11 R50 dshcraft+personasdk closed-form parameters');
    }
    // 2026-11-11 Round 51 (Pluviobyte/saas-growth-agents + yc-software/minecraft-agent-harness) closed-form FinOps verification
    const r96PathA=1680.00+45.0*90.00;
    assert.equal(r96PathA.toFixed(2),'5730.00','11-11 R51 Path A total');
    const r96PathC=250.00+5.0*90.00;
    assert.equal(r96PathC.toFixed(2),'700.00','11-11 R51 Path C total');
    assert.equal((r96PathA-r96PathC).toFixed(2),'5030.00','11-11 R51 savings vs Path A');
    assert.equal(((r96PathA-r96PathC)/r96PathA*100).toFixed(2),'87.78','11-11 R51 pct savings vs Path A');
    for(const r96File of ['workshops/github-trending-radar/docs/saas-growth-agents-minecraft-agent-harness-deterministic-sop-50-agent-teams-selection-faq.md','workshops/github-trending-radar/docs/saas-growth-agents-minecraft-agent-harness-deterministic-sop-50-agent-teams-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r51-saasgrowth-minecraft.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r96File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('4,050.00')&&txt.includes('5,730.00')&&txt.includes('250.00')&&txt.includes('450.00')&&txt.includes('700.00')&&txt.includes('5,030.00')&&txt.includes('87.78%')&&txt.includes('not_measured'),r96File+': contains exact 11-11 R51 saasgrowth+minecraft closed-form parameters');
    }
    // 2026-11-11 Round 52 (SparkofSpike/Brain4Agent + Glen-Web-App/best-agent-memory-mcp) closed-form FinOps verification
    const r97PathA=1720.00+44.0*90.00;
    assert.equal(r97PathA.toFixed(2),'5680.00','11-11 R52 Path A total');
    const r97PathC=190.00+5.0*90.00;
    assert.equal(r97PathC.toFixed(2),'640.00','11-11 R52 Path C total');
    assert.equal((r97PathA-r97PathC).toFixed(2),'5040.00','11-11 R52 savings vs Path A');
    assert.equal(((r97PathA-r97PathC)/r97PathA*100).toFixed(2),'88.73','11-11 R52 pct savings vs Path A');
    for(const r97File of ['workshops/github-trending-radar/docs/brain4agent-best-agent-memory-mcp-cjk-bm25-precisionmembench-selection-faq.md','workshops/github-trending-radar/docs/brain4agent-best-agent-memory-mcp-cjk-bm25-precisionmembench-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r52-brain4agent-memorymcp.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r97File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,960.00')&&txt.includes('5,680.00')&&txt.includes('190.00')&&txt.includes('450.00')&&txt.includes('640.00')&&txt.includes('5,040.00')&&txt.includes('88.73%')&&txt.includes('not_measured'),r97File+': contains exact 11-11 R52 brain4agent+memorymcp closed-form parameters');
    }
    // 2026-11-11 Round 53 (mylea1/phongent + Aevonix/FlashAlign) closed-form FinOps verification
    const r98PathA=1780.00+45.0*90.00;
    assert.equal(r98PathA.toFixed(2),'5830.00','11-11 R53 Path A total');
    const r98PathC=260.00+5.0*90.00;
    assert.equal(r98PathC.toFixed(2),'710.00','11-11 R53 Path C total');
    assert.equal((r98PathA-r98PathC).toFixed(2),'5120.00','11-11 R53 savings vs Path A');
    assert.equal(((r98PathA-r98PathC)/r98PathA*100).toFixed(2),'87.82','11-11 R53 pct savings vs Path A');
    for(const r98File of ['workshops/github-trending-radar/docs/phongent-flashalign-multi-phone-fleet-per-request-alignment-selection-faq.md','workshops/github-trending-radar/docs/phongent-flashalign-multi-phone-fleet-per-request-alignment-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r53-phongent-flashalign.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r98File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('4,050.00')&&txt.includes('5,830.00')&&txt.includes('260.00')&&txt.includes('450.00')&&txt.includes('710.00')&&txt.includes('5,120.00')&&txt.includes('87.82%')&&txt.includes('not_measured'),r98File+': contains exact 11-11 R53 phongent+flashalign closed-form parameters');
    }
    // 2026-11-11 Round 54 (yorkeccak/globalhackmap + tequed232/DSH-L2D) closed-form FinOps verification
    const r99PathA=1520.00+44.0*90.00;
    assert.equal(r99PathA.toFixed(2),'5480.00','11-11 R54 Path A total');
    const r99PathC=220.00+5.0*90.00;
    assert.equal(r99PathC.toFixed(2),'670.00','11-11 R54 Path C total');
    assert.equal((r99PathA-r99PathC).toFixed(2),'4810.00','11-11 R54 savings vs Path A');
    assert.equal(((r99PathA-r99PathC)/r99PathA*100).toFixed(2),'87.77','11-11 R54 pct savings vs Path A');
    for(const r99File of ['workshops/github-trending-radar/docs/globalhackmap-dsh-l2d-cve-fix-runbooks-live2d-arbitration-selection-faq.md','workshops/github-trending-radar/docs/globalhackmap-dsh-l2d-cve-fix-runbooks-live2d-arbitration-selection-faq.en.md','assets/github-ai-radar-2026-11-11-r54-globalhackmap-dshl2d.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-11-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r99File),'utf8');
      assert.ok(txt.includes('1,520.00')&&txt.includes('3,960.00')&&txt.includes('5,480.00')&&txt.includes('220.00')&&txt.includes('450.00')&&txt.includes('670.00')&&txt.includes('4,810.00')&&txt.includes('87.77%')&&txt.includes('not_measured'),r99File+': contains exact 11-11 R54 globalhackmap+dshl2d closed-form parameters');
    }
    // 2026-11-12 Sweep & Round 1 (R100: QwenLM/qwen-code + Alishahryar1/free-claude-code) verification
    const rawHtml1112=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-12-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawHtml1112),'5ff5c7d9572539c7dc8b0fdb2921f18c27f6ee874f5077956171bf007eba2980','2026-11-12 raw HTML LF sha256');
    const rawSearch1112Str=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-12-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawSearch1112Str),'583a62e35e5cb99f8edfd0669a7d720ad29019d3963a18d214b69022869c5e6b','2026-11-12 raw Search API JSON LF sha256');
    const rawSearch1112=JSON.parse(rawSearch1112Str);
    const rawSearch1112Map=new Map(rawSearch1112.items.map(it=>[it.full_name,it]));
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_12.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': 11-12 Track A provenance');
      assert.ok(rawHtml1112.includes(`href="/${item.full_name}"`),item.full_name+': present in 11-12 raw HTML');
      assert.ok(rawHtml1112.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in 11-12 raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_12.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': 11-12 Track B stars_today must be not_measured');
      assert.ok(rawSearch1112Map.has(item.full_name),item.full_name+': present in 11-12 archived Search API JSON');
      const rawEntry=rawSearch1112Map.get(item.full_name);
      assert.equal(item.stars_total_search_api,rawEntry.stargazers_count,item.full_name+': 11-12 stars_total_search_api matches Search API JSON');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': 11-12 stars_per_day closed-form');
    }
    const r100PathA=2400.00+46.0*90.00;
    assert.equal(r100PathA.toFixed(2),'6540.00','11-12 R1 Path A total');
    const r100PathC=320.00+5.0*90.00;
    assert.equal(r100PathC.toFixed(2),'770.00','11-12 R1 Path C total');
    assert.equal((r100PathA-r100PathC).toFixed(2),'5770.00','11-12 R1 savings vs Path A');
    assert.equal(((r100PathA-r100PathC)/r100PathA*100).toFixed(2),'88.23','11-12 R1 pct savings vs Path A');
    for(const r100File of ['workshops/github-trending-radar/docs/qwen-code-free-claude-code-multi-harness-coding-agent-selection-faq.md','workshops/github-trending-radar/docs/qwen-code-free-claude-code-multi-harness-coding-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-12.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r100File),'utf8');
      assert.ok(txt.includes('2,400.00')&&txt.includes('4,140.00')&&txt.includes('6,540.00')&&txt.includes('320.00')&&txt.includes('450.00')&&txt.includes('770.00')&&txt.includes('5,770.00')&&txt.includes('88.23%')&&txt.includes('not_measured'),r100File+': contains exact 11-12 R1 qwen-code+fcc closed-form parameters');
    }
    // 2026-11-12 Round 2 (R101: ashhart/TensorFold + huawei-csl/MACaQ) closed-form FinOps verification
    const r101PathA=2160.00+44.0*90.00;
    assert.equal(r101PathA.toFixed(2),'6120.00','11-12 R2 Path A total');
    const r101PathC=280.00+5.0*90.00;
    assert.equal(r101PathC.toFixed(2),'730.00','11-12 R2 Path C total');
    assert.equal((r101PathA-r101PathC).toFixed(2),'5390.00','11-12 R2 savings vs Path A');
    assert.equal(((r101PathA-r101PathC)/r101PathA*100).toFixed(2),'88.07','11-12 R2 pct savings vs Path A');
    for(const r101File of ['workshops/github-trending-radar/docs/tensorfold-macaq-zig-cross-gpu-inference-calibrated-gguf-quantization-selection-faq.md','workshops/github-trending-radar/docs/tensorfold-macaq-zig-cross-gpu-inference-calibrated-gguf-quantization-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r2-tensorfold-macaq.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r101File),'utf8');
      assert.ok(txt.includes('2,160.00')&&txt.includes('3,960.00')&&txt.includes('6,120.00')&&txt.includes('280.00')&&txt.includes('450.00')&&txt.includes('730.00')&&txt.includes('5,390.00')&&txt.includes('88.07%')&&txt.includes('not_measured'),r101File+': contains exact 11-12 R2 tensorfold+macaq closed-form parameters');
    }
    // 2026-11-12 Round 3 (R102: agentes-chat/agentes-chat + CopilotKit/OpenBot v1.0.2) closed-form FinOps verification
    const r102PathA=2180.00+46.0*90.00;
    assert.equal(r102PathA.toFixed(2),'6320.00','11-12 R3 Path A total');
    const r102PathC=290.00+5.0*90.00;
    assert.equal(r102PathC.toFixed(2),'740.00','11-12 R3 Path C total');
    assert.equal((r102PathA-r102PathC).toFixed(2),'5580.00','11-12 R3 savings vs Path A');
    assert.equal(((r102PathA-r102PathC)/r102PathA*100).toFixed(2),'88.29','11-12 R3 pct savings vs Path A');
    for(const r102File of ['workshops/github-trending-radar/docs/agentes-chat-openbot-multiplayer-agent-slack-coworker-workspace-selection-faq.md','workshops/github-trending-radar/docs/agentes-chat-openbot-multiplayer-agent-slack-coworker-workspace-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r3-agentes-openbot.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r102File),'utf8');
      assert.ok(txt.includes('2,180.00')&&txt.includes('4,140.00')&&txt.includes('6,320.00')&&txt.includes('290.00')&&txt.includes('450.00')&&txt.includes('740.00')&&txt.includes('5,580.00')&&txt.includes('88.29%')&&txt.includes('not_measured'),r102File+': contains exact 11-12 R3 agentes-chat+openbot closed-form parameters');
    }
    // 2026-11-12 Round 4 (R103: pmndrs/pine + dabingfy-dot/solo-to-team-skills) closed-form FinOps verification
    const r103PathA=1760.00+44.0*90.00;
    assert.equal(r103PathA.toFixed(2),'5720.00','11-12 R4 Path A total');
    const r103PathC=240.00+5.0*90.00;
    assert.equal(r103PathC.toFixed(2),'690.00','11-12 R4 Path C total');
    assert.equal((r103PathA-r103PathC).toFixed(2),'5030.00','11-12 R4 savings vs Path A');
    assert.equal(((r103PathA-r103PathC)/r103PathA*100).toFixed(2),'87.94','11-12 R4 pct savings vs Path A');
    for(const r103File of ['workshops/github-trending-radar/docs/pine-solo-to-team-skills-reactive-event-harness-human-led-ai-teams-selection-faq.md','workshops/github-trending-radar/docs/pine-solo-to-team-skills-reactive-event-harness-human-led-ai-teams-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r4-pine-solototeam.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r103File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,960.00')&&txt.includes('5,720.00')&&txt.includes('240.00')&&txt.includes('450.00')&&txt.includes('690.00')&&txt.includes('5,030.00')&&txt.includes('87.94%')&&txt.includes('not_measured'),r103File+': contains exact 11-12 R4 pine+solototeam closed-form parameters');
    }
    // 2026-11-12 Round 5 (R104: drost-ai/tinker-ai-skill + simplexai-labs/linger) closed-form FinOps verification
    const r104PathA=2320.00+46.0*90.00;
    assert.equal(r104PathA.toFixed(2),'6460.00','11-12 R5 Path A total');
    const r104PathC=260.00+5.0*90.00;
    assert.equal(r104PathC.toFixed(2),'710.00','11-12 R5 Path C total');
    assert.equal((r104PathA-r104PathC).toFixed(2),'5750.00','11-12 R5 savings vs Path A');
    assert.equal(((r104PathA-r104PathC)/r104PathA*100).toFixed(2),'89.01','11-12 R5 pct savings vs Path A');
    for(const r104File of ['workshops/github-trending-radar/docs/tinker-ai-skill-linger-polystrata-session-distillation-local-125b-agent-selection-faq.md','workshops/github-trending-radar/docs/tinker-ai-skill-linger-polystrata-session-distillation-local-125b-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r5-tinker-linger.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r104File),'utf8');
      assert.ok(txt.includes('2,320.00')&&txt.includes('4,140.00')&&txt.includes('6,460.00')&&txt.includes('260.00')&&txt.includes('450.00')&&txt.includes('710.00')&&txt.includes('5,750.00')&&txt.includes('89.01%')&&txt.includes('not_measured'),r104File+': contains exact 11-12 R5 tinker+linger closed-form parameters');
    }
    // 2026-11-12 Round 6 (R105: FrigadeHQ/yogurt + threerocks/article2media v2.3.1) closed-form FinOps verification
    const r105PathA=1500.00+46.0*90.00;
    assert.equal(r105PathA.toFixed(2),'5640.00','11-12 R6 Path A total');
    const r105PathC=210.00+5.0*90.00;
    assert.equal(r105PathC.toFixed(2),'660.00','11-12 R6 Path C total');
    assert.equal((r105PathA-r105PathC).toFixed(2),'4980.00','11-12 R6 savings vs Path A');
    assert.equal(((r105PathA-r105PathC)/r105PathA*100).toFixed(2),'88.30','11-12 R6 pct savings vs Path A');
    for(const r105File of ['workshops/github-trending-radar/docs/yogurt-article2media-botfree-private-meeting-notes-zero-dep-media-skills-selection-faq.md','workshops/github-trending-radar/docs/yogurt-article2media-botfree-private-meeting-notes-zero-dep-media-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r6-yogurt-article2media.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r105File),'utf8');
      assert.ok(txt.includes('1,500.00')&&txt.includes('4,140.00')&&txt.includes('5,640.00')&&txt.includes('210.00')&&txt.includes('450.00')&&txt.includes('660.00')&&txt.includes('4,980.00')&&txt.includes('88.30%')&&txt.includes('not_measured'),r105File+': contains exact 11-12 R6 yogurt+article2media closed-form parameters');
    }
    // 2026-11-12 Round 7 (R106: MiniMax-AI/MiniMax-H3-Image + op7418/guizang-game-skill + apex-compute/ANR) closed-form FinOps verification
    const r106PathA=2040.00+46.0*90.00;
    assert.equal(r106PathA.toFixed(2),'6180.00','11-12 R7 Path A total');
    const r106PathC=270.00+5.0*90.00;
    assert.equal(r106PathC.toFixed(2),'720.00','11-12 R7 Path C total');
    assert.equal((r106PathA-r106PathC).toFixed(2),'5460.00','11-12 R7 savings vs Path A');
    assert.equal(((r106PathA-r106PathC)/r106PathA*100).toFixed(2),'88.35','11-12 R7 pct savings vs Path A');
    for(const r106File of ['workshops/github-trending-radar/docs/minimax-h3-image-guizang-game-skill-anr-16mp-3d-action-neural-rendering-selection-faq.md','workshops/github-trending-radar/docs/minimax-h3-image-guizang-game-skill-anr-16mp-3d-action-neural-rendering-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r7-h3image-guizang-anr.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r106File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,140.00')&&txt.includes('6,180.00')&&txt.includes('270.00')&&txt.includes('450.00')&&txt.includes('720.00')&&txt.includes('5,460.00')&&txt.includes('88.35%')&&txt.includes('not_measured'),r106File+': contains exact 11-12 R7 h3image+guizang+anr closed-form parameters');
    }
    // 2026-11-12 Round 8 (R107: aronhy/pibrowse v0.5.5 + nickvasilescu/bot-hq) closed-form FinOps verification
    const r107PathA=1900.00+44.0*90.00;
    assert.equal(r107PathA.toFixed(2),'5860.00','11-12 R8 Path A total');
    const r107PathC=230.00+5.0*90.00;
    assert.equal(r107PathC.toFixed(2),'680.00','11-12 R8 Path C total');
    assert.equal((r107PathA-r107PathC).toFixed(2),'5180.00','11-12 R8 savings vs Path A');
    assert.equal(((r107PathA-r107PathC)/r107PathA*100).toFixed(2),'88.40','11-12 R8 pct savings vs Path A');
    for(const r107File of ['workshops/github-trending-radar/docs/pibrowse-bot-hq-chromium157-fingerprint-workspaces-multi-screen-hermes-selection-faq.md','workshops/github-trending-radar/docs/pibrowse-bot-hq-chromium157-fingerprint-workspaces-multi-screen-hermes-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r8-pibrowse-bothq.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r107File),'utf8');
      assert.ok(txt.includes('1,900.00')&&txt.includes('3,960.00')&&txt.includes('5,860.00')&&txt.includes('230.00')&&txt.includes('450.00')&&txt.includes('680.00')&&txt.includes('5,180.00')&&txt.includes('88.40%')&&txt.includes('not_measured'),r107File+': contains exact 11-12 R8 pibrowse+bothq closed-form parameters');
    }
    // 2026-11-12 Round 9 (R108: makepad/relax + 2SinceJuly/SkyDot) closed-form FinOps verification
    const r108PathA=1720.00+48.0*90.00;
    assert.equal(r108PathA.toFixed(2),'6040.00','11-12 R9 Path A total');
    const r108PathC=250.00+5.0*90.00;
    assert.equal(r108PathC.toFixed(2),'700.00','11-12 R9 Path C total');
    assert.equal((r108PathA-r108PathC).toFixed(2),'5340.00','11-12 R9 savings vs Path A');
    assert.equal(((r108PathA-r108PathC)/r108PathA*100).toFixed(2),'88.41','11-12 R9 pct savings vs Path A');
    for(const r108File of ['workshops/github-trending-radar/docs/makepad-relax-skydot-rust-live-jit-multi-dot-pi-agent-workbench-selection-faq.md','workshops/github-trending-radar/docs/makepad-relax-skydot-rust-live-jit-multi-dot-pi-agent-workbench-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r9-relax-skydot.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r108File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('4,320.00')&&txt.includes('6,040.00')&&txt.includes('250.00')&&txt.includes('450.00')&&txt.includes('700.00')&&txt.includes('5,340.00')&&txt.includes('88.41%')&&txt.includes('not_measured'),r108File+': contains exact 11-12 R9 relax+skydot closed-form parameters');
    }
    // 2026-11-12 Round 10 (R109: zadescoxp/calibrain-harness + tigerogijzooav/Hyperliquid-Trade-Bot) closed-form FinOps verification
    const r109PathA=1900.00+48.0*90.00;
    assert.equal(r109PathA.toFixed(2),'6220.00','11-12 R10 Path A total');
    const r109PathC=240.00+5.0*90.00;
    assert.equal(r109PathC.toFixed(2),'690.00','11-12 R10 Path C total');
    assert.equal((r109PathA-r109PathC).toFixed(2),'5530.00','11-12 R10 savings vs Path A');
    assert.equal(((r109PathA-r109PathC)/r109PathA*100).toFixed(2),'88.91','11-12 R10 pct savings vs Path A');
    for(const r109File of ['workshops/github-trending-radar/docs/calibrain-harness-hyperliquid-trade-bot-fast-classifier-forward-test-risk-audit-selection-faq.md','workshops/github-trending-radar/docs/calibrain-harness-hyperliquid-trade-bot-fast-classifier-forward-test-risk-audit-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r10-calibrain-hyperliquid.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r109File),'utf8');
      assert.ok(txt.includes('1,900.00')&&txt.includes('4,320.00')&&txt.includes('6,220.00')&&txt.includes('240.00')&&txt.includes('450.00')&&txt.includes('690.00')&&txt.includes('5,530.00')&&txt.includes('88.91%')&&txt.includes('not_measured'),r109File+': contains exact 11-12 R10 calibrain+hyperliquid closed-form parameters');
    }
    // 2026-11-12 Round 11 (R110: bookleme/bookleme + pktq/lasik) closed-form FinOps verification
    const r110PathA=2440.00+46.0*90.00;
    assert.equal(r110PathA.toFixed(2),'6580.00','11-12 R11 Path A total');
    const r110PathC=230.00+5.0*90.00;
    assert.equal(r110PathC.toFixed(2),'680.00','11-12 R11 Path C total');
    assert.equal((r110PathA-r110PathC).toFixed(2),'5900.00','11-12 R11 savings vs Path A');
    assert.equal(((r110PathA-r110PathC)/r110PathA*100).toFixed(2),'89.67','11-12 R11 pct savings vs Path A');
    for(const r110File of ['workshops/github-trending-radar/docs/bookleme-lasik-book-to-skill-compiler-static-deblinding-mcp-selection-faq.md','workshops/github-trending-radar/docs/bookleme-lasik-book-to-skill-compiler-static-deblinding-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r11-bookleme-lasik.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r110File),'utf8');
      assert.ok(txt.includes('2,440.00')&&txt.includes('4,140.00')&&txt.includes('6,580.00')&&txt.includes('230.00')&&txt.includes('450.00')&&txt.includes('680.00')&&txt.includes('5,900.00')&&txt.includes('89.67%')&&txt.includes('not_measured'),r110File+': contains exact 11-12 R11 bookleme+lasik closed-form parameters');
    }
    // 2026-11-12 Round 12 (R111: rainyZhou2/SreAgentHarness + kunchenguid/headless) closed-form FinOps verification
    const r111PathA=1960.00+48.0*90.00;
    assert.equal(r111PathA.toFixed(2),'6280.00','11-12 R12 Path A total');
    const r111PathC=240.00+5.0*90.00;
    assert.equal(r111PathC.toFixed(2),'690.00','11-12 R12 Path C total');
    assert.equal((r111PathA-r111PathC).toFixed(2),'5590.00','11-12 R12 savings vs Path A');
    assert.equal(((r111PathA-r111PathC)/r111PathA*100).toFixed(2),'89.01','11-12 R12 pct savings vs Path A');
    for(const r111File of ['workshops/github-trending-radar/docs/sre-agent-harness-headless-recoverable-sre-transactions-zero-password-ssh-selection-faq.md','workshops/github-trending-radar/docs/sre-agent-harness-headless-recoverable-sre-transactions-zero-password-ssh-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r12-sreharness-headless.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r111File),'utf8');
      assert.ok(txt.includes('1,960.00')&&txt.includes('4,320.00')&&txt.includes('6,280.00')&&txt.includes('240.00')&&txt.includes('450.00')&&txt.includes('690.00')&&txt.includes('5,590.00')&&txt.includes('89.01%')&&txt.includes('not_measured'),r111File+': contains exact 11-12 R12 sreharness+headless closed-form parameters');
    }
    // 2026-11-12 Round 13 (R112: stevenmichaelthomas/numbrone + permitzip/mutinybim) closed-form FinOps verification
    const r112PathA=1800.00+48.0*90.00;
    assert.equal(r112PathA.toFixed(2),'6120.00','11-12 R13 Path A total');
    const r112PathC=240.00+5.0*90.00;
    assert.equal(r112PathC.toFixed(2),'690.00','11-12 R13 Path C total');
    assert.equal((r112PathA-r112PathC).toFixed(2),'5430.00','11-12 R13 savings vs Path A');
    assert.equal(((r112PathA-r112PathC)/r112PathA*100).toFixed(2),'88.73','11-12 R13 pct savings vs Path A');
    for(const r112File of ['workshops/github-trending-radar/docs/numbrone-mutinybim-chief-manager-worktree-hierarchy-multiplayer-bim-mcp-selection-faq.md','workshops/github-trending-radar/docs/numbrone-mutinybim-chief-manager-worktree-hierarchy-multiplayer-bim-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r13-numbrone-mutinybim.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r112File),'utf8');
      assert.ok(txt.includes('1,800.00')&&txt.includes('4,320.00')&&txt.includes('6,120.00')&&txt.includes('240.00')&&txt.includes('450.00')&&txt.includes('690.00')&&txt.includes('5,430.00')&&txt.includes('88.73%')&&txt.includes('not_measured'),r112File+': contains exact 11-12 R13 numbrone+mutinybim closed-form parameters');
    }
    // 2026-11-12 Round 14 (R113: Nyxera0x/cutaway + link-ding/image-to-psd) closed-form FinOps verification
    const r113PathA=1620.00+48.0*90.00;
    assert.equal(r113PathA.toFixed(2),'5940.00','11-12 R14 Path A total');
    const r113PathC=220.00+5.0*90.00;
    assert.equal(r113PathC.toFixed(2),'670.00','11-12 R14 Path C total');
    assert.equal((r113PathA-r113PathC).toFixed(2),'5270.00','11-12 R14 savings vs Path A');
    assert.equal(((r113PathA-r113PathC)/r113PathA*100).toFixed(2),'88.72','11-12 R14 pct savings vs Path A');
    for(const r113File of ['workshops/github-trending-radar/docs/cutaway-image-to-psd-code-built-3d-exploding-sim-19-layer-psd-skill-selection-faq.md','workshops/github-trending-radar/docs/cutaway-image-to-psd-code-built-3d-exploding-sim-19-layer-psd-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r14-cutaway-imagetopsd.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r113File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('4,320.00')&&txt.includes('5,940.00')&&txt.includes('220.00')&&txt.includes('450.00')&&txt.includes('670.00')&&txt.includes('5,270.00')&&txt.includes('88.72%')&&txt.includes('not_measured'),r113File+': contains exact 11-12 R14 cutaway+imagetopsd closed-form parameters');
    }
    // 2026-11-12 Round 15 (R114: skild-ai/steel + xiaoerofficial021-collab/FlowHMR-Windows) closed-form FinOps verification
    const r114PathA=2040.00+48.0*90.00;
    assert.equal(r114PathA.toFixed(2),'6360.00','11-12 R15 Path A total');
    const r114PathC=260.00+5.0*90.00;
    assert.equal(r114PathC.toFixed(2),'710.00','11-12 R15 Path C total');
    assert.equal((r114PathA-r114PathC).toFixed(2),'5650.00','11-12 R15 savings vs Path A');
    assert.equal(((r114PathA-r114PathC)/r114PathA*100).toFixed(2),'88.84','11-12 R15 pct savings vs Path A');
    for(const r114File of ['workshops/github-trending-radar/docs/skild-steel-flowhmr-windows-heterogeneous-robot-physics-multiperson-mocap-selection-faq.md','workshops/github-trending-radar/docs/skild-steel-flowhmr-windows-heterogeneous-robot-physics-multiperson-mocap-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r15-steel-flowhmr.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r114File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,320.00')&&txt.includes('6,360.00')&&txt.includes('260.00')&&txt.includes('450.00')&&txt.includes('710.00')&&txt.includes('5,650.00')&&txt.includes('88.84%')&&txt.includes('not_measured'),r114File+': contains exact 11-12 R15 steel+flowhmr closed-form parameters');
    }
    // 2026-11-12 Round 16 (R115: ValidatorStack/solana-vigil + MZULALI/xj-scanner) closed-form FinOps verification
    const r115PathA=1500.00+48.0*90.00;
    assert.equal(r115PathA.toFixed(2),'5820.00','11-12 R16 Path A total');
    const r115PathC=200.00+5.0*90.00;
    assert.equal(r115PathC.toFixed(2),'650.00','11-12 R16 Path C total');
    assert.equal((r115PathA-r115PathC).toFixed(2),'5170.00','11-12 R16 savings vs Path A');
    assert.equal(((r115PathA-r115PathC)/r115PathA*100).toFixed(2),'88.83','11-12 R16 pct savings vs Path A');
    for(const r115File of ['workshops/github-trending-radar/docs/solana-vigil-xj-scanner-zero-dep-readonly-node-health-arduino-ecu-agent-selection-faq.md','workshops/github-trending-radar/docs/solana-vigil-xj-scanner-zero-dep-readonly-node-health-arduino-ecu-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r16-vigil-xjscanner.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r115File),'utf8');
      assert.ok(txt.includes('1,500.00')&&txt.includes('4,320.00')&&txt.includes('5,820.00')&&txt.includes('200.00')&&txt.includes('450.00')&&txt.includes('650.00')&&txt.includes('5,170.00')&&txt.includes('88.83%')&&txt.includes('not_measured'),r115File+': contains exact 11-12 R16 vigil+xjscanner closed-form parameters');
    }
    // 2026-11-12 Round 17 (R116: FutureMLS-Lab/FlashStates + yanstd888/9routerx) closed-form FinOps verification
    const r116PathA=2320.00+48.0*90.00;
    assert.equal(r116PathA.toFixed(2),'6640.00','11-12 R17 Path A total');
    const r116PathC=260.00+5.0*90.00;
    assert.equal(r116PathC.toFixed(2),'710.00','11-12 R17 Path C total');
    assert.equal((r116PathA-r116PathC).toFixed(2),'5930.00','11-12 R17 savings vs Path A');
    assert.equal(((r116PathA-r116PathC)/r116PathA*100).toFixed(2),'89.31','11-12 R17 pct savings vs Path A');
    for(const r116File of ['workshops/github-trending-radar/docs/flashstates-9routerx-hybrid-state-agentic-inference-go-ai-router-selection-faq.md','workshops/github-trending-radar/docs/flashstates-9routerx-hybrid-state-agentic-inference-go-ai-router-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r17-flashstates-9routerx.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r116File),'utf8');
      assert.ok(txt.includes('2,320.00')&&txt.includes('4,320.00')&&txt.includes('6,640.00')&&txt.includes('260.00')&&txt.includes('450.00')&&txt.includes('710.00')&&txt.includes('5,930.00')&&txt.includes('89.31%')&&txt.includes('not_measured'),r116File+': contains exact 11-12 R17 flashstates+9routerx closed-form parameters');
    }
    // 2026-11-12 Round 18 (R117: failsafe-security/artex + DevCrabs-Inc/yandex-metrika-mcp) closed-form FinOps verification
    const r117PathA=1840.00+48.0*90.00;
    assert.equal(r117PathA.toFixed(2),'6160.00','11-12 R18 Path A total');
    const r117PathC=230.00+5.0*90.00;
    assert.equal(r117PathC.toFixed(2),'680.00','11-12 R18 Path C total');
    assert.equal((r117PathA-r117PathC).toFixed(2),'5480.00','11-12 R18 savings vs Path A');
    assert.equal(((r117PathA-r117PathC)/r117PathA*100).toFixed(2),'88.96','11-12 R18 pct savings vs Path A');
    for(const r117File of ['workshops/github-trending-radar/docs/failsafe-artex-yandex-metrika-mcp-supply-chain-hardened-secagent-verified-analytics-selection-faq.md','workshops/github-trending-radar/docs/failsafe-artex-yandex-metrika-mcp-supply-chain-hardened-secagent-verified-analytics-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r18-artex-metrikamcp.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r117File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('4,320.00')&&txt.includes('6,160.00')&&txt.includes('230.00')&&txt.includes('450.00')&&txt.includes('680.00')&&txt.includes('5,480.00')&&txt.includes('88.96%')&&txt.includes('not_measured'),r117File+': contains exact 11-12 R18 artex+metrikamcp closed-form parameters');
    }
    // 2026-11-12 Round 19 (R118: emollick/ai-portals + codepawl/creator-generalist) closed-form FinOps verification
    const r118PathA=1920.00+48.0*95.00;
    assert.equal(r118PathA.toFixed(2),'6480.00','11-12 R19 Path A total');
    const r118PathC=245.00+5.0*95.00;
    assert.equal(r118PathC.toFixed(2),'720.00','11-12 R19 Path C total');
    assert.equal((r118PathA-r118PathC).toFixed(2),'5760.00','11-12 R19 savings vs Path A');
    assert.equal(((r118PathA-r118PathC)/r118PathA*100).toFixed(2),'88.89','11-12 R19 pct savings vs Path A');
    for(const r118File of ['workshops/github-trending-radar/docs/ai-portals-creator-generalist-zero-asset-procedural-3d-worlds-greybox-verified-creative-skills-selection-faq.md','workshops/github-trending-radar/docs/ai-portals-creator-generalist-zero-asset-procedural-3d-worlds-greybox-verified-creative-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r19-aiportals-creatorgen.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r118File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('4,560.00')&&txt.includes('6,480.00')&&txt.includes('245.00')&&txt.includes('475.00')&&txt.includes('720.00')&&txt.includes('5,760.00')&&txt.includes('88.89%')&&txt.includes('not_measured'),r118File+': contains exact 11-12 R19 ai-portals+creator-generalist closed-form parameters');
    }
    // 2026-11-12 Round 20 (R119: Saekisui/claude-p-pipeline + yusuke-114/claude-xcode-agent) closed-form FinOps verification
    const r119PathA=2040.00+44.0*95.00;
    assert.equal(r119PathA.toFixed(2),'6220.00','11-12 R20 Path A total');
    const r119PathC=210.00+4.0*95.00;
    assert.equal(r119PathC.toFixed(2),'590.00','11-12 R20 Path C total');
    assert.equal((r119PathA-r119PathC).toFixed(2),'5630.00','11-12 R20 savings vs Path A');
    assert.equal(((r119PathA-r119PathC)/r119PathA*100).toFixed(2),'90.51','11-12 R20 pct savings vs Path A');
    for(const r119File of ['workshops/github-trending-radar/docs/claude-p-pipeline-claude-xcode-agent-resident-stream-json-dual-exec-acp-selection-faq.md','workshops/github-trending-radar/docs/claude-p-pipeline-claude-xcode-agent-resident-stream-json-dual-exec-acp-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r20-claudep-xcodeacp.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r119File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,180.00')&&txt.includes('6,220.00')&&txt.includes('210.00')&&txt.includes('380.00')&&txt.includes('590.00')&&txt.includes('5,630.00')&&txt.includes('90.51%')&&txt.includes('not_measured'),r119File+': contains exact 11-12 R20 claude-p-pipeline+claude-xcode-agent closed-form parameters');
    }
    // 2026-11-12 Round 21 (R120: kilolonion/agent-vscreen + funnest-xyz/funnest-charts) closed-form FinOps verification
    const r120PathA=2150.00+46.0*95.00;
    assert.equal(r120PathA.toFixed(2),'6520.00','11-12 R21 Path A total');
    const r120PathC=235.00+4.0*95.00;
    assert.equal(r120PathC.toFixed(2),'615.00','11-12 R21 Path C total');
    assert.equal((r120PathA-r120PathC).toFixed(2),'5905.00','11-12 R21 savings vs Path A');
    assert.equal(((r120PathA-r120PathC)/r120PathA*100).toFixed(2),'90.57','11-12 R21 pct savings vs Path A');
    for(const r120File of ['workshops/github-trending-radar/docs/agent-vscreen-funnest-charts-android-virtual-display-financial-charts-mcp-selection-faq.md','workshops/github-trending-radar/docs/agent-vscreen-funnest-charts-android-virtual-display-financial-charts-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r21-vscreen-funnestcharts.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r120File),'utf8');
      assert.ok(txt.includes('2,150.00')&&txt.includes('4,370.00')&&txt.includes('6,520.00')&&txt.includes('235.00')&&txt.includes('380.00')&&txt.includes('615.00')&&txt.includes('5,905.00')&&txt.includes('90.57%')&&txt.includes('not_measured'),r120File+': contains exact 11-12 R21 agent-vscreen+funnest-charts closed-form parameters');
    }
    // 2026-11-12 Round 22 (R121: wanshuiyin/SuperARIS + lawandrorder/mate) closed-form FinOps verification
    const r121PathA=2090.00+44.0*95.00;
    assert.equal(r121PathA.toFixed(2),'6270.00','11-12 R22 Path A total');
    const r121PathC=225.00+4.0*95.00;
    assert.equal(r121PathC.toFixed(2),'605.00','11-12 R22 Path C total');
    assert.equal((r121PathA-r121PathC).toFixed(2),'5665.00','11-12 R22 savings vs Path A');
    assert.equal(((r121PathA-r121PathC)/r121PathA*100).toFixed(2),'90.35','11-12 R22 pct savings vs Path A');
    for(const r121File of ['workshops/github-trending-radar/docs/superaris-mate-persistent-3role-research-team-deterministic-intent-shopping-agent-selection-faq.md','workshops/github-trending-radar/docs/superaris-mate-persistent-3role-research-team-deterministic-intent-shopping-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r22-superaris-mate.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r121File),'utf8');
      assert.ok(txt.includes('2,090.00')&&txt.includes('4,180.00')&&txt.includes('6,270.00')&&txt.includes('225.00')&&txt.includes('380.00')&&txt.includes('605.00')&&txt.includes('5,665.00')&&txt.includes('90.35%')&&txt.includes('not_measured'),r121File+': contains exact 11-12 R22 superaris+mate closed-form parameters');
    }
    // 2026-11-12 Round 23 (R122: reason-machines/aspen + TechTideOhio/binnacle) closed-form FinOps verification
    const r122PathA=2450.00+48.0*100.00;
    assert.equal(r122PathA.toFixed(2),'7250.00','11-12 R23 Path A total');
    const r122PathC=275.00+5.0*100.00;
    assert.equal(r122PathC.toFixed(2),'775.00','11-12 R23 Path C total');
    assert.equal((r122PathA-r122PathC).toFixed(2),'6475.00','11-12 R23 savings vs Path A');
    assert.equal(((r122PathA-r122PathC)/r122PathA*100).toFixed(2),'89.31','11-12 R23 pct savings vs Path A');
    for(const r122File of ['workshops/github-trending-radar/docs/aspen-binnacle-agent-scale-git-server-pure-rust-15tool-eval-orchestrator-selection-faq.md','workshops/github-trending-radar/docs/aspen-binnacle-agent-scale-git-server-pure-rust-15tool-eval-orchestrator-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r23-aspen-binnacle.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r122File),'utf8');
      assert.ok(txt.includes('2,450.00')&&txt.includes('4,800.00')&&txt.includes('7,250.00')&&txt.includes('275.00')&&txt.includes('500.00')&&txt.includes('775.00')&&txt.includes('6,475.00')&&txt.includes('89.31%')&&txt.includes('not_measured'),r122File+': contains exact 11-12 R23 aspen+binnacle closed-form parameters');
    }
    // 2026-11-12 Round 24 (R123: chenhg5/myco + symansun/doops) closed-form FinOps verification
    const r123PathA=2060.00+46.0*95.00;
    assert.equal(r123PathA.toFixed(2),'6430.00','11-12 R24 Path A total');
    const r123PathC=230.00+4.0*95.00;
    assert.equal(r123PathC.toFixed(2),'610.00','11-12 R24 Path C total');
    assert.equal((r123PathA-r123PathC).toFixed(2),'5820.00','11-12 R24 savings vs Path A');
    assert.equal(((r123PathA-r123PathC)/r123PathA*100).toFixed(2),'90.51','11-12 R24 pct savings vs Path A');
    for(const r123File of ['workshops/github-trending-radar/docs/myco-doops-cross-machine-agent-mycelium-hub-sshless-reverse-ops-gateway-selection-faq.md','workshops/github-trending-radar/docs/myco-doops-cross-machine-agent-mycelium-hub-sshless-reverse-ops-gateway-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r24-myco-doops.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r123File),'utf8');
      assert.ok(txt.includes('2,060.00')&&txt.includes('4,370.00')&&txt.includes('6,430.00')&&txt.includes('230.00')&&txt.includes('380.00')&&txt.includes('610.00')&&txt.includes('5,820.00')&&txt.includes('90.51%')&&txt.includes('not_measured'),r123File+': contains exact 11-12 R24 myco+doops closed-form parameters');
    }
    // 2026-11-12 Round 25 (R124: YT-Proteus-bot/MineAgent + ArcheOne-AI/RoboScript) closed-form FinOps verification
    const r124PathA=2600.00+50.0*100.00;
    assert.equal(r124PathA.toFixed(2),'7600.00','11-12 R25 Path A total');
    const r124PathC=280.00+5.0*100.00;
    assert.equal(r124PathC.toFixed(2),'780.00','11-12 R25 Path C total');
    assert.equal((r124PathA-r124PathC).toFixed(2),'6820.00','11-12 R25 savings vs Path A');
    assert.equal(((r124PathA-r124PathC)/r124PathA*100).toFixed(2),'89.74','11-12 R25 pct savings vs Path A');
    for(const r124File of ['workshops/github-trending-radar/docs/mineagent-roboscript-canvas-to-python-agent-compiler-world-in-context-robot-learning-selection-faq.md','workshops/github-trending-radar/docs/mineagent-roboscript-canvas-to-python-agent-compiler-world-in-context-robot-learning-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r25-mineagent-roboscript.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r124File),'utf8');
      assert.ok(txt.includes('2,600.00')&&txt.includes('5,000.00')&&txt.includes('7,600.00')&&txt.includes('280.00')&&txt.includes('500.00')&&txt.includes('780.00')&&txt.includes('6,820.00')&&txt.includes('89.74%')&&txt.includes('not_measured'),r124File+': contains exact 11-12 R25 mineagent+roboscript closed-form parameters');
    }
    // 2026-11-12 Round 26 (R125: ersinkoc/phonebox + NJohansen/handle-mcp) closed-form FinOps verification
    const r125PathA=1980.00+44.0*95.00;
    assert.equal(r125PathA.toFixed(2),'6160.00','11-12 R26 Path A total');
    const r125PathC=215.00+4.0*95.00;
    assert.equal(r125PathC.toFixed(2),'595.00','11-12 R26 Path C total');
    assert.equal((r125PathA-r125PathC).toFixed(2),'5565.00','11-12 R26 savings vs Path A');
    assert.equal(((r125PathA-r125PathC)/r125PathA*100).toFixed(2),'90.34','11-12 R26 pct savings vs Path A');
    for(const r125File of ['workshops/github-trending-radar/docs/phonebox-handle-mcp-physical-ai-quota-permission-panel-human-always-pays-mcp-selection-faq.md','workshops/github-trending-radar/docs/phonebox-handle-mcp-physical-ai-quota-permission-panel-human-always-pays-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r26-phonebox-handlemcp.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r125File),'utf8');
      assert.ok(txt.includes('1,980.00')&&txt.includes('4,180.00')&&txt.includes('6,160.00')&&txt.includes('215.00')&&txt.includes('380.00')&&txt.includes('595.00')&&txt.includes('5,565.00')&&txt.includes('90.34%')&&txt.includes('not_measured'),r125File+': contains exact 11-12 R26 phonebox+handle-mcp closed-form parameters');
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
