const assert = require('node:assert/strict');
const crypto = require('node:crypto');
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
    // 2026-11-12 Round 27 (R126: artemnovitckii/claude-animation-skills + nishant-Tiwari24/cracked) closed-form FinOps verification
    const r126PathA=2120.00+46.0*95.00;
    assert.equal(r126PathA.toFixed(2),'6490.00','11-12 R27 Path A total');
    const r126PathC=220.00+4.0*95.00;
    assert.equal(r126PathC.toFixed(2),'600.00','11-12 R27 Path C total');
    assert.equal((r126PathA-r126PathC).toFixed(2),'5890.00','11-12 R27 savings vs Path A');
    assert.equal(((r126PathA-r126PathC)/r126PathA*100).toFixed(2),'90.76','11-12 R27 pct savings vs Path A');
    for(const r126File of ['workshops/github-trending-radar/docs/claude-animation-skills-cracked-safezone-code-reels-executed-oracle-interview-skills-selection-faq.md','workshops/github-trending-radar/docs/claude-animation-skills-cracked-safezone-code-reels-executed-oracle-interview-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r27-animskills-cracked.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r126File),'utf8');
      assert.ok(txt.includes('2,120.00')&&txt.includes('4,370.00')&&txt.includes('6,490.00')&&txt.includes('220.00')&&txt.includes('380.00')&&txt.includes('600.00')&&txt.includes('5,890.00')&&txt.includes('90.76%')&&txt.includes('not_measured'),r126File+': contains exact 11-12 R27 claude-animation-skills+cracked closed-form parameters');
    }
    // 2026-11-12 Round 28 (R127: wendersoon/radar-cnpj-mcp + shany9200/Three) closed-form FinOps verification
    const r127PathA=2010.00+44.0*95.00;
    assert.equal(r127PathA.toFixed(2),'6190.00','11-12 R28 Path A total');
    const r127PathC=205.00+4.0*95.00;
    assert.equal(r127PathC.toFixed(2),'585.00','11-12 R28 Path C total');
    assert.equal((r127PathA-r127PathC).toFixed(2),'5605.00','11-12 R28 savings vs Path A');
    assert.equal(((r127PathA-r127PathC)/r127PathA*100).toFixed(2),'90.55','11-12 R28 pct savings vs Path A');
    for(const r127File of ['workshops/github-trending-radar/docs/radar-cnpj-mcp-three-70m-local-opendata-mcp-antipoisoning-dual-memory-agent-selection-faq.md','workshops/github-trending-radar/docs/radar-cnpj-mcp-three-70m-local-opendata-mcp-antipoisoning-dual-memory-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r28-radarcnpj-three.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r127File),'utf8');
      assert.ok(txt.includes('2,010.00')&&txt.includes('4,180.00')&&txt.includes('6,190.00')&&txt.includes('205.00')&&txt.includes('380.00')&&txt.includes('585.00')&&txt.includes('5,605.00')&&txt.includes('90.55%')&&txt.includes('not_measured'),r127File+': contains exact 11-12 R28 radar-cnpj-mcp+Three closed-form parameters');
    }
    // 2026-11-12 Round 29 (R128: mhfed/vn-law-check + yucezerey/turkish-anti-ai-skill) closed-form FinOps verification
    const r128PathA=1950.00+44.0*95.00;
    assert.equal(r128PathA.toFixed(2),'6130.00','11-12 R29 Path A total');
    const r128PathC=200.00+4.0*95.00;
    assert.equal(r128PathC.toFixed(2),'580.00','11-12 R29 Path C total');
    assert.equal((r128PathA-r128PathC).toFixed(2),'5550.00','11-12 R29 savings vs Path A');
    assert.equal(((r128PathA-r128PathC)/r128PathA*100).toFixed(2),'90.54','11-12 R29 pct savings vs Path A');
    for(const r128File of ['workshops/github-trending-radar/docs/vn-law-check-turkish-anti-ai-skill-statutory-code-compliance-morphosyntactic-antislop-selection-faq.md','workshops/github-trending-radar/docs/vn-law-check-turkish-anti-ai-skill-statutory-code-compliance-morphosyntactic-antislop-selection-faq.en.md','assets/github-ai-radar-2026-11-12-r29-vnlaw-turkishantiai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-12-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r128File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('4,180.00')&&txt.includes('6,130.00')&&txt.includes('200.00')&&txt.includes('380.00')&&txt.includes('580.00')&&txt.includes('5,550.00')&&txt.includes('90.54%')&&txt.includes('not_measured'),r128File+': contains exact 11-12 R29 vn-law-check+turkish-anti-ai-skill closed-form parameters');
    }
    // 2026-11-13 Sweep & Round 1 (R129: alibaba/open-code-review + ChromeDevTools/chrome-devtools-mcp) verification
    const rawHtml1113=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-13-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawHtml1113),'f2a5fbb0b5b3be87a72db74df96e397b0c6dec971ac609be34f3ccade2ca7983','2026-11-13 raw HTML LF sha256');
    const rawSearch1113Str=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-13-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(hash(rawSearch1113Str),'cd8ebef12d9fa9f5d266b82743f7210c33267171a298caef4f55b9ec95b285dc','2026-11-13 raw Search API JSON LF sha256');
    const rawSearch1113=JSON.parse(rawSearch1113Str);
    const rawSearch1113Map=new Map(rawSearch1113.items.map(it=>[it.full_name,it]));
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_13.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': 11-13 Track A provenance');
      assert.ok(rawHtml1113.includes(`href="/${item.full_name}"`),item.full_name+': present in 11-13 raw HTML');
      assert.ok(rawHtml1113.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in 11-13 raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_13.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': 11-13 Track B stars_today must be not_measured');
      assert.ok(rawSearch1113Map.has(item.full_name),item.full_name+': present in 11-13 archived Search API JSON');
      const rawEntry=rawSearch1113Map.get(item.full_name);
      assert.equal(item.stars_total_search_api,rawEntry.stargazers_count,item.full_name+': 11-13 stars_total_search_api matches Search API JSON');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': 11-13 stars_per_day closed-form');
    }
    const r129PathA=1620.00+52.0*90.00;
    assert.equal(r129PathA.toFixed(2),'6300.00','11-13 R1 Path A total');
    const r129PathC=180.00+6.0*90.00;
    assert.equal(r129PathC.toFixed(2),'720.00','11-13 R1 Path C total');
    assert.equal((r129PathA-r129PathC).toFixed(2),'5580.00','11-13 R1 savings vs Path A');
    assert.equal(((r129PathA-r129PathC)/r129PathA*100).toFixed(2),'88.57','11-13 R1 pct savings vs Path A');
    for(const r129File of ['workshops/github-trending-radar/docs/open-code-review-chrome-devtools-mcp-deterministic-review-runtime-debug-selection-faq.md','workshops/github-trending-radar/docs/open-code-review-chrome-devtools-mcp-deterministic-review-runtime-debug-selection-faq.en.md','assets/github-ai-radar-2026-11-13.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r129File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('4,680.00')&&txt.includes('6,300.00')&&txt.includes('180.00')&&txt.includes('540.00')&&txt.includes('720.00')&&txt.includes('5,580.00')&&txt.includes('88.57%')&&txt.includes('not_measured'),r129File+': contains exact 11-13 R1 open-code-review+chrome-devtools-mcp closed-form parameters');
    }
    // 2026-11-13 Round 2 (R130: block/buzz + rivet-dev/open-orange) closed-form FinOps verification
    const r130PathA=2480.00+44.0*95.00;
    assert.equal(r130PathA.toFixed(2),'6660.00','11-13 R2 Path A total');
    const r130PathC=420.00+4.0*95.00;
    assert.equal(r130PathC.toFixed(2),'800.00','11-13 R2 Path C total');
    assert.equal((r130PathA-r130PathC).toFixed(2),'5860.00','11-13 R2 savings vs Path A');
    assert.equal(((r130PathA-r130PathC)/r130PathA*100).toFixed(2),'87.99','11-13 R2 pct savings vs Path A');
    for(const r130File of ['workshops/github-trending-radar/docs/buzz-open-orange-sovereign-signed-event-workspace-multicloud-workers-selection-faq.md','workshops/github-trending-radar/docs/buzz-open-orange-sovereign-signed-event-workspace-multicloud-workers-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r2-buzz-openorange.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r130File),'utf8');
      assert.ok(txt.includes('2,480.00')&&txt.includes('4,180.00')&&txt.includes('6,660.00')&&txt.includes('420.00')&&txt.includes('380.00')&&txt.includes('800.00')&&txt.includes('5,860.00')&&txt.includes('87.99%')&&txt.includes('not_measured'),r130File+': contains exact 11-13 R2 buzz+open-orange closed-form parameters');
    }
    // 2026-11-13 Round 3 (R131: deepseek-ai/chat-demo + higurashi-ai/Haru) closed-form FinOps verification
    const r131PathA=2350.00+42.0*90.00;
    assert.equal(r131PathA.toFixed(2),'6130.00','11-13 R3 Path A total');
    const r131PathC=310.00+4.0*90.00;
    assert.equal(r131PathC.toFixed(2),'670.00','11-13 R3 Path C total');
    assert.equal((r131PathA-r131PathC).toFixed(2),'5460.00','11-13 R3 savings vs Path A');
    assert.equal(((r131PathA-r131PathC)/r131PathA*100).toFixed(2),'89.07','11-13 R3 pct savings vs Path A');
    for(const r131File of ['workshops/github-trending-radar/docs/deepseek-chat-demo-haru-4b-zero-backend-chat-full-duplex-meanflow-speech-selection-faq.md','workshops/github-trending-radar/docs/deepseek-chat-demo-haru-4b-zero-backend-chat-full-duplex-meanflow-speech-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r3-deepseek-haru.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r131File),'utf8');
      assert.ok(txt.includes('2,350.00')&&txt.includes('3,780.00')&&txt.includes('6,130.00')&&txt.includes('310.00')&&txt.includes('360.00')&&txt.includes('670.00')&&txt.includes('5,460.00')&&txt.includes('89.07%')&&txt.includes('not_measured'),r131File+': contains exact 11-13 R3 deepseek-chat-demo+haru-4b closed-form parameters');
    }
    // 2026-11-13 Round 4 (R132: tradermonty/claude-trading-skills + Likely7/Veyra-NRVideo) closed-form FinOps verification
    const r132PathA=1890.00+40.0*90.00;
    assert.equal(r132PathA.toFixed(2),'5490.00','11-13 R4 Path A total');
    const r132PathC=210.00+4.0*90.00;
    assert.equal(r132PathC.toFixed(2),'570.00','11-13 R4 Path C total');
    assert.equal((r132PathA-r132PathC).toFixed(2),'4920.00','11-13 R4 savings vs Path A');
    assert.equal(((r132PathA-r132PathC)/r132PathA*100).toFixed(2),'89.62','11-13 R4 pct savings vs Path A');
    for(const r132File of ['workshops/github-trending-radar/docs/claude-trading-skills-veyra-nrvideo-risk-gated-workflows-dx12-neural-video-selection-faq.md','workshops/github-trending-radar/docs/claude-trading-skills-veyra-nrvideo-risk-gated-workflows-dx12-neural-video-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r4-trading-veyra.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r132File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,600.00')&&txt.includes('5,490.00')&&txt.includes('210.00')&&txt.includes('360.00')&&txt.includes('570.00')&&txt.includes('4,920.00')&&txt.includes('89.62%')&&txt.includes('not_measured'),r132File+': contains exact 11-13 R4 claude-trading-skills+veyra-nrvideo closed-form parameters');
    }
    // 2026-11-13 Round 5 (R133: AFangTeam/PrintLab + kociden/sakurai-skill) closed-form FinOps verification
    const r133PathA=1580.00+44.0*85.00;
    assert.equal(r133PathA.toFixed(2),'5320.00','11-13 R5 Path A total');
    const r133PathC=195.00+5.0*85.00;
    assert.equal(r133PathC.toFixed(2),'620.00','11-13 R5 Path C total');
    assert.equal((r133PathA-r133PathC).toFixed(2),'4700.00','11-13 R5 savings vs Path A');
    assert.equal(((r133PathA-r133PathC)/r133PathA*100).toFixed(2),'88.35','11-13 R5 pct savings vs Path A');
    for(const r133File of ['workshops/github-trending-radar/docs/printlab-sakurai-skill-3d-printing-workbench-257-video-game-feel-skill-selection-faq.md','workshops/github-trending-radar/docs/printlab-sakurai-skill-3d-printing-workbench-257-video-game-feel-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r5-printlab-sakurai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r133File),'utf8');
      assert.ok(txt.includes('1,580.00')&&txt.includes('3,740.00')&&txt.includes('5,320.00')&&txt.includes('195.00')&&txt.includes('425.00')&&txt.includes('620.00')&&txt.includes('4,700.00')&&txt.includes('88.35%')&&txt.includes('not_measured'),r133File+': contains exact 11-13 R5 printlab+sakurai-skill closed-form parameters');
    }
    // 2026-11-13 Round 6 (R134: IluvatarLabs/sitrep + ELU-Labs/elu) closed-form FinOps verification
    const r134PathA=1750.00+42.0*90.00;
    assert.equal(r134PathA.toFixed(2),'5530.00','11-13 R6 Path A total');
    const r134PathC=230.00+4.5*90.00;
    assert.equal(r134PathC.toFixed(2),'635.00','11-13 R6 Path C total');
    assert.equal((r134PathA-r134PathC).toFixed(2),'4895.00','11-13 R6 savings vs Path A');
    assert.equal(((r134PathA-r134PathC)/r134PathA*100).toFixed(2),'88.52','11-13 R6 pct savings vs Path A');
    for(const r134File of ['workshops/github-trending-radar/docs/sitrep-elu-cross-machine-agent-fleet-console-worktree-tui-selection-faq.md','workshops/github-trending-radar/docs/sitrep-elu-cross-machine-agent-fleet-console-worktree-tui-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r6-sitrep-elu.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r134File),'utf8');
      assert.ok(txt.includes('1,750.00')&&txt.includes('3,780.00')&&txt.includes('5,530.00')&&txt.includes('230.00')&&txt.includes('405.00')&&txt.includes('635.00')&&txt.includes('4,895.00')&&txt.includes('88.52%')&&txt.includes('not_measured'),r134File+': contains exact 11-13 R6 sitrep+elu closed-form parameters');
    }
    // 2026-11-13 Round 7 (R135: mintlify/agent-traffic + varops/actp) closed-form FinOps verification
    const r135PathA=1820.00+38.0*95.00;
    assert.equal(r135PathA.toFixed(2),'5430.00','11-13 R7 Path A total');
    const r135PathC=210.00+4.0*95.00;
    assert.equal(r135PathC.toFixed(2),'590.00','11-13 R7 Path C total');
    assert.equal((r135PathA-r135PathC).toFixed(2),'4840.00','11-13 R7 savings vs Path A');
    assert.equal(((r135PathA-r135PathC)/r135PathA*100).toFixed(2),'89.13','11-13 R7 pct savings vs Path A');
    for(const r135File of ['workshops/github-trending-radar/docs/agent-traffic-actp-ip-verified-agent-classifier-acp-over-http-selection-faq.md','workshops/github-trending-radar/docs/agent-traffic-actp-ip-verified-agent-classifier-acp-over-http-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r7-agenttraffic-actp.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r135File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,610.00')&&txt.includes('5,430.00')&&txt.includes('210.00')&&txt.includes('380.00')&&txt.includes('590.00')&&txt.includes('4,840.00')&&txt.includes('89.13%')&&txt.includes('not_measured'),r135File+': contains exact 11-13 R7 agent-traffic+actp closed-form parameters');
    }
    // 2026-11-13 Round 8 (R136: agentic-learning-ai-lab/deleting-weights + jushengzhang/robot-weight-debugging) closed-form FinOps verification
    const r136PathA=3120.00+46.0*105.00;
    assert.equal(r136PathA.toFixed(2),'7950.00','11-13 R8 Path A total');
    const r136PathC=390.00+5.0*105.00;
    assert.equal(r136PathC.toFixed(2),'915.00','11-13 R8 Path C total');
    assert.equal((r136PathA-r136PathC).toFixed(2),'7035.00','11-13 R8 savings vs Path A');
    assert.equal(((r136PathA-r136PathC)/r136PathA*100).toFixed(2),'88.49','11-13 R8 pct savings vs Path A');
    for(const r136File of ['workshops/github-trending-radar/docs/deleting-weights-robot-weight-debugging-posttraining-vla-weight-surgery-selection-faq.md','workshops/github-trending-radar/docs/deleting-weights-robot-weight-debugging-posttraining-vla-weight-surgery-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r8-deletingweights-robotweight.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r136File),'utf8');
      assert.ok(txt.includes('3,120.00')&&txt.includes('4,830.00')&&txt.includes('7,950.00')&&txt.includes('390.00')&&txt.includes('525.00')&&txt.includes('915.00')&&txt.includes('7,035.00')&&txt.includes('88.49%')&&txt.includes('not_measured'),r136File+': contains exact 11-13 R8 deleting-weights+robot-weight-debugging closed-form parameters');
    }
    // 2026-11-13 Round 9 (R137: jackson-cmd/risk-aware-trading-agents + bis-med-it/marco-BIS) closed-form FinOps verification
    const r137PathA=2040.00+45.0*100.00;
    assert.equal(r137PathA.toFixed(2),'6540.00','11-13 R9 Path A total');
    const r137PathC=240.00+5.0*100.00;
    assert.equal(r137PathC.toFixed(2),'740.00','11-13 R9 Path C total');
    assert.equal((r137PathA-r137PathC).toFixed(2),'5800.00','11-13 R9 savings vs Path A');
    assert.equal(((r137PathA-r137PathC)/r137PathA*100).toFixed(2),'88.69','11-13 R9 pct savings vs Path A');
    for(const r137File of ['workshops/github-trending-radar/docs/risk-aware-trading-agents-marco-bis-point-in-time-backtest-central-bank-econometrics-selection-faq.md','workshops/github-trending-radar/docs/risk-aware-trading-agents-marco-bis-point-in-time-backtest-central-bank-econometrics-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r9-riskaware-marcobis.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r137File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,500.00')&&txt.includes('6,540.00')&&txt.includes('240.00')&&txt.includes('500.00')&&txt.includes('740.00')&&txt.includes('5,800.00')&&txt.includes('88.69%')&&txt.includes('not_measured'),r137File+': contains exact 11-13 R9 riskaware+marco-BIS closed-form parameters');
    }
    // 2026-11-13 Round 10 (R138: siwen-121/agent-shared-facts + claynicholson/copper-kicad-mcp) closed-form FinOps verification
    const r138PathA=1680.00+42.0*95.00;
    assert.equal(r138PathA.toFixed(2),'5670.00','11-13 R10 Path A total');
    const r138PathC=190.00+4.0*95.00;
    assert.equal(r138PathC.toFixed(2),'570.00','11-13 R10 Path C total');
    assert.equal((r138PathA-r138PathC).toFixed(2),'5100.00','11-13 R10 savings vs Path A');
    assert.equal(((r138PathA-r138PathC)/r138PathA*100).toFixed(2),'89.95','11-13 R10 pct savings vs Path A');
    for(const r138File of ['workshops/github-trending-radar/docs/agent-shared-facts-copper-kicad-mcp-cross-device-ssot-orderable-pcb-selection-faq.md','workshops/github-trending-radar/docs/agent-shared-facts-copper-kicad-mcp-cross-device-ssot-orderable-pcb-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r10-sharedfacts-copperkicad.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r138File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,990.00')&&txt.includes('5,670.00')&&txt.includes('190.00')&&txt.includes('380.00')&&txt.includes('570.00')&&txt.includes('5,100.00')&&txt.includes('89.95%')&&txt.includes('not_measured'),r138File+': contains exact 11-13 R10 agent-shared-facts+copper-kicad-mcp closed-form parameters');
    }
    // 2026-11-13 Round 11 (R139: geniusjia666/agent-system-design-cn + ferhatcore/claude-codex-project-os) closed-form FinOps verification
    const r139PathA=1920.00+43.0*100.00;
    assert.equal(r139PathA.toFixed(2),'6220.00','11-13 R11 Path A total');
    const r139PathC=220.00+4.5*100.00;
    assert.equal(r139PathC.toFixed(2),'670.00','11-13 R11 Path C total');
    assert.equal((r139PathA-r139PathC).toFixed(2),'5550.00','11-13 R11 savings vs Path A');
    assert.equal(((r139PathA-r139PathC)/r139PathA*100).toFixed(2),'89.23','11-13 R11 pct savings vs Path A');
    for(const r139File of ['workshops/github-trending-radar/docs/agent-system-design-cn-claude-codex-project-os-architecture-gate-pm-dev-qa-selection-faq.md','workshops/github-trending-radar/docs/agent-system-design-cn-claude-codex-project-os-architecture-gate-pm-dev-qa-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r11-agentsysdesign-projectos.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r139File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('4,300.00')&&txt.includes('6,220.00')&&txt.includes('220.00')&&txt.includes('450.00')&&txt.includes('670.00')&&txt.includes('5,550.00')&&txt.includes('89.23%')&&txt.includes('not_measured'),r139File+': contains exact 11-13 R11 agent-system-design-cn+project-os closed-form parameters');
    }
    // 2026-11-13 Round 12 (R140: molly554/whiteboard-ai-tutor + enoch3712/spine-hero-skill) closed-form FinOps verification
    const r140PathA=1860.00+44.0*85.00;
    assert.equal(r140PathA.toFixed(2),'5600.00','11-13 R12 Path A total');
    const r140PathC=185.00+4.0*85.00;
    assert.equal(r140PathC.toFixed(2),'525.00','11-13 R12 Path C total');
    assert.equal((r140PathA-r140PathC).toFixed(2),'5075.00','11-13 R12 savings vs Path A');
    assert.equal(((r140PathA-r140PathC)/r140PathA*100).toFixed(2),'90.63','11-13 R12 pct savings vs Path A');
    for(const r140File of ['workshops/github-trending-radar/docs/whiteboard-ai-tutor-spine-hero-skill-json-stroke-protocol-2d-rig-animation-selection-faq.md','workshops/github-trending-radar/docs/whiteboard-ai-tutor-spine-hero-skill-json-stroke-protocol-2d-rig-animation-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r12-whiteboard-spinehero.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r140File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,740.00')&&txt.includes('5,600.00')&&txt.includes('185.00')&&txt.includes('340.00')&&txt.includes('525.00')&&txt.includes('5,075.00')&&txt.includes('90.63%')&&txt.includes('not_measured'),r140File+': contains exact 11-13 R12 whiteboard-ai-tutor+spine-hero-skill closed-form parameters');
    }
    // 2026-11-13 Round 13 (R141: 8hjkkwikl8/ai-portfolio + kanaworksai-hue/sozai-search-mcp) closed-form FinOps verification
    const r141PathA=1650.00+40.0*90.00;
    assert.equal(r141PathA.toFixed(2),'5250.00','11-13 R13 Path A total');
    const r141PathC=165.00+4.0*90.00;
    assert.equal(r141PathC.toFixed(2),'525.00','11-13 R13 Path C total');
    assert.equal((r141PathA-r141PathC).toFixed(2),'4725.00','11-13 R13 savings vs Path A');
    assert.equal(((r141PathA-r141PathC)/r141PathA*100).toFixed(2),'90.00','11-13 R13 pct savings vs Path A');
    for(const r141File of ['workshops/github-trending-radar/docs/ai-portfolio-sozai-search-mcp-traceable-rag-nl2sql-39k-3d-assets-selection-faq.md','workshops/github-trending-radar/docs/ai-portfolio-sozai-search-mcp-traceable-rag-nl2sql-39k-3d-assets-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r13-aiportfolio-sozai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r141File),'utf8');
      assert.ok(txt.includes('1,650.00')&&txt.includes('3,600.00')&&txt.includes('5,250.00')&&txt.includes('165.00')&&txt.includes('360.00')&&txt.includes('525.00')&&txt.includes('4,725.00')&&txt.includes('90.00%')&&txt.includes('not_measured'),r141File+': contains exact 11-13 R13 ai-portfolio+sozai-search-mcp closed-form parameters');
    }
    // 2026-11-13 Round 14 (R142: assassin808/learn-from-lessons + AbdoSarmini/claude-usage-widget-for-windows-taskbar) closed-form FinOps verification
    const r142PathA=1520.00+38.0*90.00;
    assert.equal(r142PathA.toFixed(2),'4940.00','11-13 R14 Path A total');
    const r142PathC=140.00+3.5*90.00;
    assert.equal(r142PathC.toFixed(2),'455.00','11-13 R14 Path C total');
    assert.equal((r142PathA-r142PathC).toFixed(2),'4485.00','11-13 R14 savings vs Path A');
    assert.equal(((r142PathA-r142PathC)/r142PathA*100).toFixed(2),'90.79','11-13 R14 pct savings vs Path A');
    for(const r142File of ['workshops/github-trending-radar/docs/learn-from-lessons-claude-usage-widget-transcript-correction-graph-rust-taskbar-selection-faq.md','workshops/github-trending-radar/docs/learn-from-lessons-claude-usage-widget-transcript-correction-graph-rust-taskbar-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r14-learnfrom-taskbarwidget.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r142File),'utf8');
      assert.ok(txt.includes('1,520.00')&&txt.includes('3,420.00')&&txt.includes('4,940.00')&&txt.includes('140.00')&&txt.includes('315.00')&&txt.includes('455.00')&&txt.includes('4,485.00')&&txt.includes('90.79%')&&txt.includes('not_measured'),r142File+': contains exact 11-13 R14 learn-from-lessons+claude-usage-widget closed-form parameters');
    }
    // 2026-11-13 Round 15 (R143: fendouai/ViralForge + wquguru/fable52-fps-repro) closed-form FinOps verification
    const r143PathA=1940.00+44.0*85.00;
    assert.equal(r143PathA.toFixed(2),'5680.00','11-13 R15 Path A total');
    const r143PathC=215.00+4.0*85.00;
    assert.equal(r143PathC.toFixed(2),'555.00','11-13 R15 Path C total');
    assert.equal((r143PathA-r143PathC).toFixed(2),'5125.00','11-13 R15 savings vs Path A');
    assert.equal(((r143PathA-r143PathC)/r143PathA*100).toFixed(2),'90.23','11-13 R15 pct savings vs Path A');
    for(const r143File of ['workshops/github-trending-radar/docs/viralforge-fable52-fps-repro-vfml-video-studio-budget-capped-3d-fps-selection-faq.md','workshops/github-trending-radar/docs/viralforge-fable52-fps-repro-vfml-video-studio-budget-capped-3d-fps-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r15-viralforge-fable52fps.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r143File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('3,740.00')&&txt.includes('5,680.00')&&txt.includes('215.00')&&txt.includes('340.00')&&txt.includes('555.00')&&txt.includes('5,125.00')&&txt.includes('90.23%')&&txt.includes('not_measured'),r143File+': contains exact 11-13 R15 viralforge+fable52-fps-repro closed-form parameters');
    }
    // 2026-11-13 Round 16 (R144: gitcommit90/1Helm + nevertoday/xxd-pstack) closed-form FinOps verification
    const r144PathA=1760.00+42.0*90.00;
    assert.equal(r144PathA.toFixed(2),'5540.00','11-13 R16 Path A total');
    const r144PathC=190.00+4.0*90.00;
    assert.equal(r144PathC.toFixed(2),'550.00','11-13 R16 Path C total');
    assert.equal((r144PathA-r144PathC).toFixed(2),'4990.00','11-13 R16 savings vs Path A');
    assert.equal(((r144PathA-r144PathC)/r144PathA*100).toFixed(2),'90.07','11-13 R16 pct savings vs Path A');
    for(const r144File of ['workshops/github-trending-radar/docs/1helm-xxd-pstack-cloudflare-channel-computer-self-verifying-agent-skills-selection-faq.md','workshops/github-trending-radar/docs/1helm-xxd-pstack-cloudflare-channel-computer-self-verifying-agent-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r16-1helm-xxdpstack.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r144File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,780.00')&&txt.includes('5,540.00')&&txt.includes('190.00')&&txt.includes('360.00')&&txt.includes('550.00')&&txt.includes('4,990.00')&&txt.includes('90.07%')&&txt.includes('not_measured'),r144File+': contains exact 11-13 R16 1helm+xxd-pstack closed-form parameters');
    }
    // 2026-11-13 Round 17 (R145: abhigyan6/tri-agent-orchestrator + QQTangBa/cangshu-koubo-video-skills) closed-form FinOps verification
    const r145PathA=1720.00+42.0*90.00;
    assert.equal(r145PathA.toFixed(2),'5500.00','11-13 R17 Path A total');
    const r145PathC=185.00+3.5*90.00;
    assert.equal(r145PathC.toFixed(2),'500.00','11-13 R17 Path C total');
    assert.equal((r145PathA-r145PathC).toFixed(2),'5000.00','11-13 R17 savings vs Path A');
    assert.equal(((r145PathA-r145PathC)/r145PathA*100).toFixed(2),'90.91','11-13 R17 pct savings vs Path A');
    for(const r145File of ['workshops/github-trending-radar/docs/tri-agent-orchestrator-cangshu-koubo-video-skills-agy-claude-codex-local-nle-selection-faq.md','workshops/github-trending-radar/docs/tri-agent-orchestrator-cangshu-koubo-video-skills-agy-claude-codex-local-nle-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r17-triagent-cangshukoubo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r145File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,780.00')&&txt.includes('5,500.00')&&txt.includes('185.00')&&txt.includes('315.00')&&txt.includes('500.00')&&txt.includes('5,000.00')&&txt.includes('90.91%')&&txt.includes('not_measured'),r145File+': contains exact 11-13 R17 tri-agent-orchestrator+cangshu-koubo closed-form parameters');
    }
    // 2026-11-13 Round 18 (R146: mit-han-lab/EvolvingInfra + sii-nex/Nex-N2.6) closed-form FinOps verification
    const r146PathA=4600.00+40.0*110.00;
    assert.equal(r146PathA.toFixed(2),'9000.00','11-13 R18 Path A total');
    const r146PathC=620.00+4.0*110.00;
    assert.equal(r146PathC.toFixed(2),'1060.00','11-13 R18 Path C total');
    assert.equal((r146PathA-r146PathC).toFixed(2),'7940.00','11-13 R18 savings vs Path A');
    assert.equal(((r146PathA-r146PathC)/r146PathA*100).toFixed(2),'88.22','11-13 R18 pct savings vs Path A');
    for(const r146File of ['workshops/github-trending-radar/docs/evolving-infra-nex-n2-6-agent-adaptive-serving-321b-fp8-cua-model-selection-faq.md','workshops/github-trending-radar/docs/evolving-infra-nex-n2-6-agent-adaptive-serving-321b-fp8-cua-model-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r18-evolvinginfra-nexn26.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r146File),'utf8');
      assert.ok(txt.includes('4,600.00')&&txt.includes('4,400.00')&&txt.includes('9,000.00')&&txt.includes('620.00')&&txt.includes('440.00')&&txt.includes('1,060.00')&&txt.includes('7,940.00')&&txt.includes('88.22%')&&txt.includes('not_measured'),r146File+': contains exact 11-13 R18 EvolvingInfra+Nex-N2.6 closed-form parameters');
    }
    // 2026-11-13 Round 19 (R147: spacesky-cell/TwinFix + relai-ai/agent-eval-loop) closed-form FinOps verification
    const r147PathA=1950.00+42.0*100.00;
    assert.equal(r147PathA.toFixed(2),'6150.00','11-13 R19 Path A total');
    const r147PathC=210.00+4.0*100.00;
    assert.equal(r147PathC.toFixed(2),'610.00','11-13 R19 Path C total');
    assert.equal((r147PathA-r147PathC).toFixed(2),'5540.00','11-13 R19 savings vs Path A');
    assert.equal(((r147PathA-r147PathC)/r147PathA*100).toFixed(2),'90.08','11-13 R19 pct savings vs Path A');
    for(const r147File of ['workshops/github-trending-radar/docs/twinfix-agent-eval-loop-disposable-twin-incident-remediation-harbor-eval-driven-agents-selection-faq.md','workshops/github-trending-radar/docs/twinfix-agent-eval-loop-disposable-twin-incident-remediation-harbor-eval-driven-agents-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r19-twinfix-agenteval.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r147File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('4,200.00')&&txt.includes('6,150.00')&&txt.includes('210.00')&&txt.includes('400.00')&&txt.includes('610.00')&&txt.includes('5,540.00')&&txt.includes('90.08%')&&txt.includes('not_measured'),r147File+': contains exact 11-13 R19 TwinFix+agent-eval-loop closed-form parameters');
    }
    // 2026-11-13 Round 20 (R148: EliYuan30/Reframe + Liuzedooong/SparseReading) closed-form FinOps verification
    const r148PathA=2850.00+40.0*95.00;
    assert.equal(r148PathA.toFixed(2),'6650.00','11-13 R20 Path A total');
    const r148PathC=285.00+3.5*95.00;
    assert.equal(r148PathC.toFixed(2),'617.50','11-13 R20 Path C total');
    assert.equal((r148PathA-r148PathC).toFixed(2),'6032.50','11-13 R20 savings vs Path A');
    assert.equal(((r148PathA-r148PathC)/r148PathA*100).toFixed(2),'90.71','11-13 R20 pct savings vs Path A');
    for(const r148File of ['workshops/github-trending-radar/docs/reframe-sparsereading-observation-aligned-visual-rl-sparse-evidence-reading-layer-selection-faq.md','workshops/github-trending-radar/docs/reframe-sparsereading-observation-aligned-visual-rl-sparse-evidence-reading-layer-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r20-reframe-sparsereading.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r148File),'utf8');
      assert.ok(txt.includes('2,850.00')&&txt.includes('3,800.00')&&txt.includes('6,650.00')&&txt.includes('285.00')&&txt.includes('332.50')&&txt.includes('617.50')&&txt.includes('6,032.50')&&txt.includes('90.71%')&&txt.includes('not_measured'),r148File+': contains exact 11-13 R20 Reframe+SparseReading closed-form parameters');
    }
    // 2026-11-13 Round 21 (R149: aryehlev/PeerHarness + anyu0804/antigravity-agent-rules) closed-form FinOps verification
    const r149PathA=1620.00+38.0*95.00;
    assert.equal(r149PathA.toFixed(2),'5230.00','11-13 R21 Path A total');
    const r149PathC=165.00+3.5*95.00;
    assert.equal(r149PathC.toFixed(2),'497.50','11-13 R21 Path C total');
    assert.equal((r149PathA-r149PathC).toFixed(2),'4732.50','11-13 R21 savings vs Path A');
    assert.equal(((r149PathA-r149PathC)/r149PathA*100).toFixed(2),'90.49','11-13 R21 pct savings vs Path A');
    for(const r149File of ['workshops/github-trending-radar/docs/peerharness-antigravity-agent-rules-team-voted-agent-governance-process-hook-guardrails-selection-faq.md','workshops/github-trending-radar/docs/peerharness-antigravity-agent-rules-team-voted-agent-governance-process-hook-guardrails-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r21-peerharness-antigravity.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r149File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('3,610.00')&&txt.includes('5,230.00')&&txt.includes('165.00')&&txt.includes('332.50')&&txt.includes('497.50')&&txt.includes('4,732.50')&&txt.includes('90.49%')&&txt.includes('not_measured'),r149File+': contains exact 11-13 R21 PeerHarness+antigravity-agent-rules closed-form parameters');
    }
    // 2026-11-13 Round 22 (R150: makoshan/vibehw-stack + gokayfem/blockout-to-real) closed-form FinOps verification
    const r150PathA=1880.00+44.0*90.00;
    assert.equal(r150PathA.toFixed(2),'5840.00','11-13 R22 Path A total');
    const r150PathC=210.00+4.0*90.00;
    assert.equal(r150PathC.toFixed(2),'570.00','11-13 R22 Path C total');
    assert.equal((r150PathA-r150PathC).toFixed(2),'5270.00','11-13 R22 savings vs Path A');
    assert.equal(((r150PathA-r150PathC)/r150PathA*100).toFixed(2),'90.24','11-13 R22 pct savings vs Path A');
    for(const r150File of ['workshops/github-trending-radar/docs/vibehw-stack-blockout-to-real-7stage-hardware-fab-gates-cycles-solved-pbr-scene-skill-selection-faq.md','workshops/github-trending-radar/docs/vibehw-stack-blockout-to-real-7stage-hardware-fab-gates-cycles-solved-pbr-scene-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r22-vibehw-blockouttoreal.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r150File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,960.00')&&txt.includes('5,840.00')&&txt.includes('210.00')&&txt.includes('360.00')&&txt.includes('570.00')&&txt.includes('5,270.00')&&txt.includes('90.24%')&&txt.includes('not_measured'),r150File+': contains exact 11-13 R22 vibehw-stack+blockout-to-real closed-form parameters');
    }
    // 2026-11-13 Round 23 (R151: fivetaku/whosup + gettogo/togo) closed-form FinOps verification
    const r151PathA=1580.00+38.0*95.00;
    assert.equal(r151PathA.toFixed(2),'5190.00','11-13 R23 Path A total');
    const r151PathC=160.00+3.5*95.00;
    assert.equal(r151PathC.toFixed(2),'492.50','11-13 R23 Path C total');
    assert.equal((r151PathA-r151PathC).toFixed(2),'4697.50','11-13 R23 savings vs Path A');
    assert.equal(((r151PathA-r151PathC)/r151PathA*100).toFixed(2),'90.51','11-13 R23 pct savings vs Path A');
    for(const r151File of ['workshops/github-trending-radar/docs/whosup-togo-herdr-multipane-attention-board-16-harness-ios-watch-tmux-remote-selection-faq.md','workshops/github-trending-radar/docs/whosup-togo-herdr-multipane-attention-board-16-harness-ios-watch-tmux-remote-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r23-whosup-togo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r151File),'utf8');
      assert.ok(txt.includes('1,580.00')&&txt.includes('3,610.00')&&txt.includes('5,190.00')&&txt.includes('160.00')&&txt.includes('332.50')&&txt.includes('492.50')&&txt.includes('4,697.50')&&txt.includes('90.51%')&&txt.includes('not_measured'),r151File+': contains exact 11-13 R23 whosup+togo closed-form parameters');
    }
    // 2026-11-13 Round 24 (R152: memcpython/deobf + RouteInferno/shamus-osint-ai-agent) closed-form FinOps verification
    const r152PathA=1680.00+38.0*105.00;
    assert.equal(r152PathA.toFixed(2),'5670.00','11-13 R24 Path A total');
    const r152PathC=175.00+3.5*105.00;
    assert.equal(r152PathC.toFixed(2),'542.50','11-13 R24 Path C total');
    assert.equal((r152PathA-r152PathC).toFixed(2),'5127.50','11-13 R24 savings vs Path A');
    assert.equal(((r152PathA-r152PathC)/r152PathA*100).toFixed(2),'90.43','11-13 R24 pct savings vs Path A');
    for(const r152File of ['workshops/github-trending-radar/docs/deobf-shamus-osint-behavior-verified-deobfuscation-terminal-osint-agent-selection-faq.md','workshops/github-trending-radar/docs/deobf-shamus-osint-behavior-verified-deobfuscation-terminal-osint-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r24-deobf-shamus.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r152File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,990.00')&&txt.includes('5,670.00')&&txt.includes('175.00')&&txt.includes('367.50')&&txt.includes('542.50')&&txt.includes('5,127.50')&&txt.includes('90.43%')&&txt.includes('not_measured'),r152File+': contains exact 11-13 R24 deobf+shamus closed-form parameters');
    }
    // 2026-11-13 Round 25 (R153: punit2911/Hirepanel + maniculehq/margin) closed-form FinOps verification
    const r153PathA=1540.00+40.0*85.00;
    assert.equal(r153PathA.toFixed(2),'4940.00','11-13 R25 Path A total');
    const r153PathC=170.00+3.5*85.00;
    assert.equal(r153PathC.toFixed(2),'467.50','11-13 R25 Path C total');
    assert.equal((r153PathA-r153PathC).toFixed(2),'4472.50','11-13 R25 savings vs Path A');
    assert.equal(((r153PathA-r153PathC)/r153PathA*100).toFixed(2),'90.54','11-13 R25 pct savings vs Path A');
    for(const r153File of ['workshops/github-trending-radar/docs/hirepanel-margin-quote-verified-multiagent-recruiting-postgres-isolate-agent-docs-selection-faq.md','workshops/github-trending-radar/docs/hirepanel-margin-quote-verified-multiagent-recruiting-postgres-isolate-agent-docs-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r25-hirepanel-margin.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r153File),'utf8');
      assert.ok(txt.includes('1,540.00')&&txt.includes('3,400.00')&&txt.includes('4,940.00')&&txt.includes('170.00')&&txt.includes('297.50')&&txt.includes('467.50')&&txt.includes('4,472.50')&&txt.includes('90.54%')&&txt.includes('not_measured'),r153File+': contains exact 11-13 R25 Hirepanel+margin closed-form parameters');
    }
    // 2026-11-13 Round 26 (R154: localixai/flowdown + erkamyaman/unslopovich) closed-form FinOps verification
    const r154PathA=1480.00+40.0*90.00;
    assert.equal(r154PathA.toFixed(2),'5080.00','11-13 R26 Path A total');
    const r154PathC=155.00+3.5*90.00;
    assert.equal(r154PathC.toFixed(2),'470.00','11-13 R26 Path C total');
    assert.equal((r154PathA-r154PathC).toFixed(2),'4610.00','11-13 R26 savings vs Path A');
    assert.equal(((r154PathA-r154PathC)/r154PathA*100).toFixed(2),'90.75','11-13 R26 pct savings vs Path A');
    for(const r154File of ['workshops/github-trending-radar/docs/flowdown-unslopovich-17x-streaming-markdown-engine-105k-review-mobile-ux-audit-selection-faq.md','workshops/github-trending-radar/docs/flowdown-unslopovich-17x-streaming-markdown-engine-105k-review-mobile-ux-audit-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r26-flowdown-unslopovich.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r154File),'utf8');
      assert.ok(txt.includes('1,480.00')&&txt.includes('3,600.00')&&txt.includes('5,080.00')&&txt.includes('155.00')&&txt.includes('315.00')&&txt.includes('470.00')&&txt.includes('4,610.00')&&txt.includes('90.75%')&&txt.includes('not_measured'),r154File+': contains exact 11-13 R26 flowdown+unslopovich closed-form parameters');
    }
    // 2026-11-13 Round 27 (R155: zqkra/ademark + AgriciDaniel/obsidian-herdr) closed-form FinOps verification
    const r155PathA=1780.00+38.0*95.00;
    assert.equal(r155PathA.toFixed(2),'5390.00','11-13 R27 Path A total');
    const r155PathC=170.00+3.5*95.00;
    assert.equal(r155PathC.toFixed(2),'502.50','11-13 R27 Path C total');
    assert.equal((r155PathA-r155PathC).toFixed(2),'4887.50','11-13 R27 savings vs Path A');
    assert.equal(((r155PathA-r155PathC)/r155PathA*100).toFixed(2),'90.68','11-13 R27 pct savings vs Path A');
    for(const r155File of ['workshops/github-trending-radar/docs/ademark-obsidian-herdr-15-ade-benchmark-persistent-undoable-obsidian-agent-terminals-selection-faq.md','workshops/github-trending-radar/docs/ademark-obsidian-herdr-15-ade-benchmark-persistent-undoable-obsidian-agent-terminals-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r27-ademark-obsidianherdr.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r155File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,610.00')&&txt.includes('5,390.00')&&txt.includes('170.00')&&txt.includes('332.50')&&txt.includes('502.50')&&txt.includes('4,887.50')&&txt.includes('90.68%')&&txt.includes('not_measured'),r155File+': contains exact 11-13 R27 ademark+obsidian-herdr closed-form parameters');
    }
    // 2026-11-13 Round 28 (R156: QiYueran-source/weave-your-work + Pyruslili/tmux-shared-session-notes) closed-form FinOps verification
    const r156PathA=1520.00+38.0*95.00;
    assert.equal(r156PathA.toFixed(2),'5130.00','11-13 R28 Path A total');
    const r156PathC=160.00+3.5*95.00;
    assert.equal(r156PathC.toFixed(2),'492.50','11-13 R28 Path C total');
    assert.equal((r156PathA-r156PathC).toFixed(2),'4637.50','11-13 R28 savings vs Path A');
    assert.equal(((r156PathA-r156PathC)/r156PathA*100).toFixed(2),'90.40','11-13 R28 pct savings vs Path A');
    for(const r156File of ['workshops/github-trending-radar/docs/weave-your-work-tmux-shared-session-target-tree-team-skills-acp-shared-tui-selection-faq.md','workshops/github-trending-radar/docs/weave-your-work-tmux-shared-session-target-tree-team-skills-acp-shared-tui-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r28-weaveyourwork-tmuxshared.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r156File),'utf8');
      assert.ok(txt.includes('1,520.00')&&txt.includes('3,610.00')&&txt.includes('5,130.00')&&txt.includes('160.00')&&txt.includes('332.50')&&txt.includes('492.50')&&txt.includes('4,637.50')&&txt.includes('90.40%')&&txt.includes('not_measured'),r156File+': contains exact 11-13 R28 weave-your-work+tmux-shared-session closed-form parameters');
    }
    // 2026-11-13 Round 29 (R157: joebentham/desk-buddy + yolilin642-byte/screen-handoff) closed-form FinOps verification
    const r157PathA=1420.00+36.0*95.00;
    assert.equal(r157PathA.toFixed(2),'4840.00','11-13 R29 Path A total');
    const r157PathC=145.00+3.5*95.00;
    assert.equal(r157PathC.toFixed(2),'477.50','11-13 R29 Path C total');
    assert.equal((r157PathA-r157PathC).toFixed(2),'4362.50','11-13 R29 savings vs Path A');
    assert.equal(((r157PathA-r157PathC)/r157PathA*100).toFixed(2),'90.13','11-13 R29 pct savings vs Path A');
    for(const r157File of ['workshops/github-trending-radar/docs/desk-buddy-screen-handoff-esp32-prism-companion-webrtc-cua-human-takeover-selection-faq.md','workshops/github-trending-radar/docs/desk-buddy-screen-handoff-esp32-prism-companion-webrtc-cua-human-takeover-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r29-deskbuddy-screenhandoff.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r157File),'utf8');
      assert.ok(txt.includes('1,420.00')&&txt.includes('3,420.00')&&txt.includes('4,840.00')&&txt.includes('145.00')&&txt.includes('332.50')&&txt.includes('477.50')&&txt.includes('4,362.50')&&txt.includes('90.13%')&&txt.includes('not_measured'),r157File+': contains exact 11-13 R29 desk-buddy+screen-handoff closed-form parameters');
    }
    // 2026-11-13 Round 30 (R158: thuann-vn/claude-3d-animated-shorts + huypham85/app-3d-video-skill) closed-form FinOps verification
    const r158PathA=1640.00+42.0*85.00;
    assert.equal(r158PathA.toFixed(2),'5210.00','11-13 R30 Path A total');
    const r158PathC=160.00+4.0*85.00;
    assert.equal(r158PathC.toFixed(2),'500.00','11-13 R30 Path C total');
    assert.equal((r158PathA-r158PathC).toFixed(2),'4710.00','11-13 R30 savings vs Path A');
    assert.equal(((r158PathA-r158PathC)/r158PathA*100).toFixed(2),'90.40','11-13 R30 pct savings vs Path A');
    for(const r158File of ['workshops/github-trending-radar/docs/claude-3d-animated-shorts-app-3d-video-skill-threejs-rig-swift-scenekit-promo-selection-faq.md','workshops/github-trending-radar/docs/claude-3d-animated-shorts-app-3d-video-skill-threejs-rig-swift-scenekit-promo-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r30-3dshorts-app3dvideo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r158File),'utf8');
      assert.ok(txt.includes('1,640.00')&&txt.includes('3,570.00')&&txt.includes('5,210.00')&&txt.includes('160.00')&&txt.includes('340.00')&&txt.includes('500.00')&&txt.includes('4,710.00')&&txt.includes('90.40%')&&txt.includes('not_measured'),r158File+': contains exact 11-13 R30 3d-shorts+app-3d-video closed-form parameters');
    }
    // 2026-11-13 Round 31 (R159: hao-ai-lab/vstack + Neal006/deja) closed-form FinOps verification
    const r159PathA=2450.00+40.0*110.00;
    assert.equal(r159PathA.toFixed(2),'6850.00','11-13 R31 Path A total');
    const r159PathC=380.00+4.0*110.00;
    assert.equal(r159PathC.toFixed(2),'820.00','11-13 R31 Path C total');
    assert.equal((r159PathA-r159PathC).toFixed(2),'6030.00','11-13 R31 savings vs Path A');
    assert.equal(((r159PathA-r159PathC)/r159PathA*100).toFixed(2),'88.03','11-13 R31 pct savings vs Path A');
    for(const r159File of ['workshops/github-trending-radar/docs/vstack-deja-anticheat-formal-verification-stack-cache-safe-context-dedup-selection-faq.md','workshops/github-trending-radar/docs/vstack-deja-anticheat-formal-verification-stack-cache-safe-context-dedup-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r31-vstack-deja.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r159File),'utf8');
      assert.ok(txt.includes('2,450.00')&&txt.includes('4,400.00')&&txt.includes('6,850.00')&&txt.includes('380.00')&&txt.includes('440.00')&&txt.includes('820.00')&&txt.includes('6,030.00')&&txt.includes('88.03%')&&txt.includes('not_measured'),r159File+': contains exact 11-13 R31 vstack+deja closed-form parameters');
    }
    // 2026-11-13 Round 32 (R160: Faixiang/UI-Kit-Aggregator-MCP + tmdaidevs/fabric-planning-skill) closed-form FinOps verification
    const r160PathA=1650.00+38.0*100.00;
    assert.equal(r160PathA.toFixed(2),'5450.00','11-13 R32 Path A total');
    const r160PathC=170.00+3.5*100.00;
    assert.equal(r160PathC.toFixed(2),'520.00','11-13 R32 Path C total');
    assert.equal((r160PathA-r160PathC).toFixed(2),'4930.00','11-13 R32 savings vs Path A');
    assert.equal(((r160PathA-r160PathC)/r160PathA*100).toFixed(2),'90.46','11-13 R32 pct savings vs Path A');
    for(const r160File of ['workshops/github-trending-radar/docs/ui-kit-aggregator-mcp-fabric-planning-skill-9catalog-license-gate-fabric-planv1-selection-faq.md','workshops/github-trending-radar/docs/ui-kit-aggregator-mcp-fabric-planning-skill-9catalog-license-gate-fabric-planv1-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r32-uikitmcp-fabricplan.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r160File),'utf8');
      assert.ok(txt.includes('1,650.00')&&txt.includes('3,800.00')&&txt.includes('5,450.00')&&txt.includes('170.00')&&txt.includes('350.00')&&txt.includes('520.00')&&txt.includes('4,930.00')&&txt.includes('90.46%')&&txt.includes('not_measured'),r160File+': contains exact 11-13 R32 ui-kit-mcp+fabric-planning closed-form parameters');
    }
    // 2026-11-13 Round 33 (R161: latent-spaces/codesk + syydaniel/kaikou) closed-form FinOps verification
    const r161PathA=1460.00+38.0*90.00;
    assert.equal(r161PathA.toFixed(2),'4880.00','11-13 R33 Path A total');
    const r161PathC=150.00+3.5*90.00;
    assert.equal(r161PathC.toFixed(2),'465.00','11-13 R33 Path C total');
    assert.equal((r161PathA-r161PathC).toFixed(2),'4415.00','11-13 R33 savings vs Path A');
    assert.equal(((r161PathA-r161PathC)/r161PathA*100).toFixed(2),'90.47','11-13 R33 pct savings vs Path A');
    for(const r161File of ['workshops/github-trending-radar/docs/codesk-kaikou-self-reshaping-acp-browser-desktop-7stage-local-voice-cloning-selection-faq.md','workshops/github-trending-radar/docs/codesk-kaikou-self-reshaping-acp-browser-desktop-7stage-local-voice-cloning-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r33-codesk-kaikou.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r161File),'utf8');
      assert.ok(txt.includes('1,460.00')&&txt.includes('3,420.00')&&txt.includes('4,880.00')&&txt.includes('150.00')&&txt.includes('315.00')&&txt.includes('465.00')&&txt.includes('4,415.00')&&txt.includes('90.47%')&&txt.includes('not_measured'),r161File+': contains exact 11-13 R33 codesk+kaikou closed-form parameters');
    }
    // 2026-11-13 Round 34 (R162: hol-light-family/Poincare + graiz/kittybrowser) closed-form FinOps verification
    const r162PathA=1725.00+38.0*115.00;
    assert.equal(r162PathA.toFixed(2),'6095.00','11-13 R34 Path A total');
    const r162PathC=175.00+3.5*115.00;
    assert.equal(r162PathC.toFixed(2),'577.50','11-13 R34 Path C total');
    assert.equal((r162PathA-r162PathC).toFixed(2),'5517.50','11-13 R34 savings vs Path A');
    assert.equal(((r162PathA-r162PathC)/r162PathA*100).toFixed(2),'90.53','11-13 R34 pct savings vs Path A');
    for(const r162File of ['workshops/github-trending-radar/docs/poincare-kittybrowser-hol-light-perelman-formalization-terminal-pane-chrome-browser-selection-faq.md','workshops/github-trending-radar/docs/poincare-kittybrowser-hol-light-perelman-formalization-terminal-pane-chrome-browser-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r34-poincare-kittybrowser.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r162File),'utf8');
      assert.ok(txt.includes('1,725.00')&&txt.includes('4,370.00')&&txt.includes('6,095.00')&&txt.includes('175.00')&&txt.includes('402.50')&&txt.includes('577.50')&&txt.includes('5,517.50')&&txt.includes('90.52%')&&txt.includes('not_measured'),r162File+': contains exact 11-13 R34 poincare+kittybrowser closed-form parameters');
    }
    // 2026-11-13 Round 35 (R163: Krixx1337/ReAgentLive + SternI/FortniteMCP) closed-form FinOps verification
    const r163PathA=1580.00+38.0*100.00;
    assert.equal(r163PathA.toFixed(2),'5380.00','11-13 R35 Path A total');
    const r163PathC=165.00+3.5*100.00;
    assert.equal(r163PathC.toFixed(2),'515.00','11-13 R35 Path C total');
    assert.equal((r163PathA-r163PathC).toFixed(2),'4865.00','11-13 R35 savings vs Path A');
    assert.equal(((r163PathA-r163PathC)/r163PathA*100).toFixed(2),'90.43','11-13 R35 pct savings vs Path A');
    for(const r163File of ['workshops/github-trending-radar/docs/reagentlive-fortnitemcp-inprocess-game-runtime-inspection-ue-testing-mcp-selection-faq.md','workshops/github-trending-radar/docs/reagentlive-fortnitemcp-inprocess-game-runtime-inspection-ue-testing-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r35-reagentlive-fortnitemcp.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r163File),'utf8');
      assert.ok(txt.includes('1,580.00')&&txt.includes('3,800.00')&&txt.includes('5,380.00')&&txt.includes('165.00')&&txt.includes('350.00')&&txt.includes('515.00')&&txt.includes('4,865.00')&&txt.includes('90.43%')&&txt.includes('not_measured'),r163File+': contains exact 11-13 R35 reagentlive+fortnitemcp closed-form parameters');
    }
    // 2026-11-13 Round 36 (R164: disinfeqt/rulebook + gopkg-dev/damail) closed-form FinOps verification
    const r164PathA=1520.00+38.0*95.00;
    assert.equal(r164PathA.toFixed(2),'5130.00','11-13 R36 Path A total');
    const r164PathC=160.00+3.5*95.00;
    assert.equal(r164PathC.toFixed(2),'492.50','11-13 R36 Path C total');
    assert.equal((r164PathA-r164PathC).toFixed(2),'4637.50','11-13 R36 savings vs Path A');
    assert.equal(((r164PathA-r164PathC)/r164PathA*100).toFixed(2),'90.40','11-13 R36 pct savings vs Path A');
    for(const r164File of ['workshops/github-trending-radar/docs/rulebook-damail-claude-agents-md-auditor-selfhosted-scoped-mail-mcp-selection-faq.md','workshops/github-trending-radar/docs/rulebook-damail-claude-agents-md-auditor-selfhosted-scoped-mail-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r36-rulebook-damail.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r164File),'utf8');
      assert.ok(txt.includes('1,520.00')&&txt.includes('3,610.00')&&txt.includes('5,130.00')&&txt.includes('160.00')&&txt.includes('332.50')&&txt.includes('492.50')&&txt.includes('4,637.50')&&txt.includes('90.40%')&&txt.includes('not_measured'),r164File+': contains exact 11-13 R36 rulebook+damail closed-form parameters');
    }
    // 2026-11-13 Round 37 (R165: rjcuff/Woolly + gokayfem/image-to-lowpoly) closed-form FinOps verification
    const r165PathA=1590.00+38.0*95.00;
    assert.equal(r165PathA.toFixed(2),'5200.00','11-13 R37 Path A total');
    const r165PathC=160.00+3.5*95.00;
    assert.equal(r165PathC.toFixed(2),'492.50','11-13 R37 Path C total');
    assert.equal((r165PathA-r165PathC).toFixed(2),'4707.50','11-13 R37 savings vs Path A');
    assert.equal(((r165PathA-r165PathC)/r165PathA*100).toFixed(2),'90.53','11-13 R37 pct savings vs Path A');
    for(const r165File of ['workshops/github-trending-radar/docs/woolly-image-to-lowpoly-local-cross-tool-memory-exact-triangle-budget-3d-skill-selection-faq.md','workshops/github-trending-radar/docs/woolly-image-to-lowpoly-local-cross-tool-memory-exact-triangle-budget-3d-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r37-woolly-imagetolowpoly.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r165File),'utf8');
      assert.ok(txt.includes('1,590.00')&&txt.includes('3,610.00')&&txt.includes('5,200.00')&&txt.includes('160.00')&&txt.includes('332.50')&&txt.includes('492.50')&&txt.includes('4,707.50')&&txt.includes('90.53%')&&txt.includes('not_measured'),r165File+': contains exact 11-13 R37 woolly+image-to-lowpoly closed-form parameters');
    }
    // 2026-11-13 Round 38 (R166: videomd/videomd + nodo-labs-uk/attention-queue) closed-form FinOps verification
    const r166PathA=1640.00+38.0*95.00;
    assert.equal(r166PathA.toFixed(2),'5250.00','11-13 R38 Path A total');
    const r166PathC=165.00+3.5*95.00;
    assert.equal(r166PathC.toFixed(2),'497.50','11-13 R38 Path C total');
    assert.equal((r166PathA-r166PathC).toFixed(2),'4752.50','11-13 R38 savings vs Path A');
    assert.equal(((r166PathA-r166PathC)/r166PathA*100).toFixed(2),'90.52','11-13 R38 pct savings vs Path A');
    for(const r166File of ['workshops/github-trending-radar/docs/videomd-attention-queue-5level-progressive-video-spec-rust-tmux-attention-queue-selection-faq.md','workshops/github-trending-radar/docs/videomd-attention-queue-5level-progressive-video-spec-rust-tmux-attention-queue-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r38-videomd-attentionqueue.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r166File),'utf8');
      assert.ok(txt.includes('1,640.00')&&txt.includes('3,610.00')&&txt.includes('5,250.00')&&txt.includes('165.00')&&txt.includes('332.50')&&txt.includes('497.50')&&txt.includes('4,752.50')&&txt.includes('90.52%')&&txt.includes('not_measured'),r166File+': contains exact 11-13 R38 videomd+attention-queue closed-form parameters');
    }
    // 2026-11-13 Round 39 (R167: githubnext/quadknob-skill + Askrike/desprawl) closed-form FinOps verification
    const r167PathA=1620.00+38.0*100.00;
    assert.equal(r167PathA.toFixed(2),'5420.00','11-13 R39 Path A total');
    const r167PathC=160.00+3.5*100.00;
    assert.equal(r167PathC.toFixed(2),'510.00','11-13 R39 Path C total');
    assert.equal((r167PathA-r167PathC).toFixed(2),'4910.00','11-13 R39 savings vs Path A');
    assert.equal(((r167PathA-r167PathC)/r167PathA*100).toFixed(2),'90.59','11-13 R39 pct savings vs Path A');
    for(const r167File of ['workshops/github-trending-radar/docs/quadknob-skill-desprawl-op1-visual-parameter-knobs-live-cloud-to-terraform-map-selection-faq.md','workshops/github-trending-radar/docs/quadknob-skill-desprawl-op1-visual-parameter-knobs-live-cloud-to-terraform-map-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r39-quadknob-desprawl.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r167File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('3,800.00')&&txt.includes('5,420.00')&&txt.includes('160.00')&&txt.includes('350.00')&&txt.includes('510.00')&&txt.includes('4,910.00')&&txt.includes('90.59%')&&txt.includes('not_measured'),r167File+': contains exact 11-13 R39 quadknob+desprawl closed-form parameters');
    }
    // 2026-11-13 Round 40 (R168: DhanushNehru/GhostWalk + qianshuixia/Shoal) closed-form FinOps verification
    const r168PathA=1620.00+38.0*95.00;
    assert.equal(r168PathA.toFixed(2),'5230.00','11-13 R40 Path A total');
    const r168PathC=160.00+3.5*95.00;
    assert.equal(r168PathC.toFixed(2),'492.50','11-13 R40 Path C total');
    assert.equal((r168PathA-r168PathC).toFixed(2),'4737.50','11-13 R40 savings vs Path A');
    assert.equal(((r168PathA-r168PathC)/r168PathA*100).toFixed(2),'90.58','11-13 R40 pct savings vs Path A');
    for(const r168File of ['workshops/github-trending-radar/docs/ghostwalk-shoal-rust-arena-dom-web-engine-windows-conpty-multi-cli-workbench-selection-faq.md','workshops/github-trending-radar/docs/ghostwalk-shoal-rust-arena-dom-web-engine-windows-conpty-multi-cli-workbench-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r40-ghostwalk-shoal.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r168File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('3,610.00')&&txt.includes('5,230.00')&&txt.includes('160.00')&&txt.includes('332.50')&&txt.includes('492.50')&&txt.includes('4,737.50')&&txt.includes('90.58%')&&txt.includes('not_measured'),r168File+': contains exact 11-13 R40 ghostwalk+shoal closed-form parameters');
    }
    // 2026-11-13 Round 41 (R169: bitsinfra/gnomon + lifeiteng/fitskills) closed-form FinOps verification
    const r169PathA=2150.00+40.0*110.00;
    assert.equal(r169PathA.toFixed(2),'6550.00','11-13 R41 Path A total');
    const r169PathC=230.00+4.0*110.00;
    assert.equal(r169PathC.toFixed(2),'670.00','11-13 R41 Path C total');
    assert.equal((r169PathA-r169PathC).toFixed(2),'5880.00','11-13 R41 savings vs Path A');
    assert.equal(((r169PathA-r169PathC)/r169PathA*100).toFixed(2),'89.77','11-13 R41 pct savings vs Path A');
    for(const r169File of ['workshops/github-trending-radar/docs/gnomon-fitskills-postgres-data-git-branching-bitexact-cross-gpu-llm-alignment-selection-faq.md','workshops/github-trending-radar/docs/gnomon-fitskills-postgres-data-git-branching-bitexact-cross-gpu-llm-alignment-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r41-gnomon-fitskills.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r169File),'utf8');
      assert.ok(txt.includes('2,150.00')&&txt.includes('4,400.00')&&txt.includes('6,550.00')&&txt.includes('230.00')&&txt.includes('440.00')&&txt.includes('670.00')&&txt.includes('5,880.00')&&txt.includes('89.77%')&&txt.includes('not_measured'),r169File+': contains exact 11-13 R41 gnomon+fitskills closed-form parameters');
    }
    // 2026-11-13 Round 42 (R170: HyunSeob/iphone-cli + ItsShreyamHere/warrant) closed-form FinOps verification
    const r170PathA=960.00+44.0*100.00;
    assert.equal(r170PathA.toFixed(2),'5360.00','11-13 R42 Path A total');
    const r170PathC=135.00+3.5*100.00;
    assert.equal(r170PathC.toFixed(2),'485.00','11-13 R42 Path C total');
    assert.equal((r170PathA-r170PathC).toFixed(2),'4875.00','11-13 R42 savings vs Path A');
    assert.equal(((r170PathA-r170PathC)/r170PathA*100).toFixed(2),'90.95','11-13 R42 pct savings vs Path A');
    for(const r170File of ['workshops/github-trending-radar/docs/iphone-cli-warrant-zero-wda-real-iphone-mcp-statcheck-research-claim-verifier-selection-faq.md','workshops/github-trending-radar/docs/iphone-cli-warrant-zero-wda-real-iphone-mcp-statcheck-research-claim-verifier-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r42-iphone-cli-warrant.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r170File),'utf8');
      assert.ok(txt.includes('960.00')&&txt.includes('4,400.00')&&txt.includes('5,360.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('4,875.00')&&txt.includes('90.95%')&&txt.includes('not_measured'),r170File+': contains exact 11-13 R42 iphone-cli+warrant closed-form parameters');
    }
    // 2026-11-13 Round 43 (R171: oshinop/claudette + dungnguyenv/pinwall) closed-form FinOps verification
    const r171PathA=1380.00+40.0*95.00;
    assert.equal(r171PathA.toFixed(2),'5180.00','11-13 R43 Path A total');
    const r171PathC=150.00+3.5*95.00;
    assert.equal(r171PathC.toFixed(2),'482.50','11-13 R43 Path C total');
    assert.equal((r171PathA-r171PathC).toFixed(2),'4697.50','11-13 R43 savings vs Path A');
    assert.equal(((r171PathA-r171PathC)/r171PathA*100).toFixed(2),'90.69','11-13 R43 pct savings vs Path A');
    for(const r171File of ['workshops/github-trending-radar/docs/claudette-pinwall-remote-ssh-local-tool-claude-proxy-element-pinned-mcp-review-wall-selection-faq.md','workshops/github-trending-radar/docs/claudette-pinwall-remote-ssh-local-tool-claude-proxy-element-pinned-mcp-review-wall-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r43-claudette-pinwall.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r171File),'utf8');
      assert.ok(txt.includes('1,380.00')&&txt.includes('3,800.00')&&txt.includes('5,180.00')&&txt.includes('150.00')&&txt.includes('332.50')&&txt.includes('482.50')&&txt.includes('4,697.50')&&txt.includes('90.69%')&&txt.includes('not_measured'),r171File+': contains exact 11-13 R43 claudette+pinwall closed-form parameters');
    }
    // 2026-11-13 Round 44 (R172: kbdevs/query-tune + delef/ClamDown) closed-form FinOps verification
    const r172PathA=1540.00+38.0*100.00;
    assert.equal(r172PathA.toFixed(2),'5340.00','11-13 R44 Path A total');
    const r172PathC=145.00+3.5*100.00;
    assert.equal(r172PathC.toFixed(2),'495.00','11-13 R44 Path C total');
    assert.equal((r172PathA-r172PathC).toFixed(2),'4845.00','11-13 R44 savings vs Path A');
    assert.equal(((r172PathA-r172PathC)/r172PathA*100).toFixed(2),'90.73','11-13 R44 pct savings vs Path A');
    for(const r172File of ['workshops/github-trending-radar/docs/query-tune-clamdown-readonly-sql-caller-audit-skill-closed-lid-macbook-fan-watchdog-selection-faq.md','workshops/github-trending-radar/docs/query-tune-clamdown-readonly-sql-caller-audit-skill-closed-lid-macbook-fan-watchdog-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r44-query-tune-clamdown.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r172File),'utf8');
      assert.ok(txt.includes('1,540.00')&&txt.includes('3,800.00')&&txt.includes('5,340.00')&&txt.includes('145.00')&&txt.includes('350.00')&&txt.includes('495.00')&&txt.includes('4,845.00')&&txt.includes('90.73%')&&txt.includes('not_measured'),r172File+': contains exact 11-13 R44 query-tune+clamdown closed-form parameters');
    }
    // 2026-11-13 Round 45 (R173: jeremiebergel/context-manager-intelligence + in-devp/MySafeAI) closed-form FinOps verification
    const r173PathA=2450.00+32.0*95.00;
    assert.equal(r173PathA.toFixed(2),'5490.00','11-13 R45 Path A total');
    const r173PathC=240.00+3.0*95.00;
    assert.equal(r173PathC.toFixed(2),'525.00','11-13 R45 Path C total');
    assert.equal((r173PathA-r173PathC).toFixed(2),'4965.00','11-13 R45 savings vs Path A');
    assert.equal(((r173PathA-r173PathC)/r173PathA*100).toFixed(2),'90.44','11-13 R45 pct savings vs Path A');
    for(const r173File of ['workshops/github-trending-radar/docs/cmi-mysafeai-cache-priced-reversible-context-folding-per-process-ai-egress-guard-selection-faq.md','workshops/github-trending-radar/docs/cmi-mysafeai-cache-priced-reversible-context-folding-per-process-ai-egress-guard-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r45-cmi-mysafeai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r173File),'utf8');
      assert.ok(txt.includes('2,450.00')&&txt.includes('3,040.00')&&txt.includes('5,490.00')&&txt.includes('240.00')&&txt.includes('285.00')&&txt.includes('525.00')&&txt.includes('4,965.00')&&txt.includes('90.44%')&&txt.includes('not_measured'),r173File+': contains exact 11-13 R45 cmi+mysafeai closed-form parameters');
    }
    // 2026-11-13 Round 46 (R174: ShawTim/gemini-app2api + ApostPap/yardmaster) closed-form FinOps verification
    const r174PathA=1820.00+36.0*95.00;
    assert.equal(r174PathA.toFixed(2),'5240.00','11-13 R46 Path A total');
    const r174PathC=155.00+3.5*95.00;
    assert.equal(r174PathC.toFixed(2),'487.50','11-13 R46 Path C total');
    assert.equal((r174PathA-r174PathC).toFixed(2),'4752.50','11-13 R46 savings vs Path A');
    assert.equal(((r174PathA-r174PathC)/r174PathA*100).toFixed(2),'90.70','11-13 R46 pct savings vs Path A');
    for(const r174File of ['workshops/github-trending-radar/docs/gemini-app2api-yardmaster-zero-dep-http2-gemini-gateway-t3code-worktree-kanban-selection-faq.md','workshops/github-trending-radar/docs/gemini-app2api-yardmaster-zero-dep-http2-gemini-gateway-t3code-worktree-kanban-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r46-gemini-app2api-yardmaster.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r174File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,420.00')&&txt.includes('5,240.00')&&txt.includes('155.00')&&txt.includes('332.50')&&txt.includes('487.50')&&txt.includes('4,752.50')&&txt.includes('90.70%')&&txt.includes('not_measured'),r174File+': contains exact 11-13 R46 gemini-app2api+yardmaster closed-form parameters');
    }
    // 2026-11-13 Round 47 (R175: azerturk/kodyurd + Heretikio/herdr-wake) closed-form FinOps verification
    const r175PathA=1280.00+40.0*95.00;
    assert.equal(r175PathA.toFixed(2),'5080.00','11-13 R47 Path A total');
    const r175PathC=145.00+3.5*95.00;
    assert.equal(r175PathC.toFixed(2),'477.50','11-13 R47 Path C total');
    assert.equal((r175PathA-r175PathC).toFixed(2),'4602.50','11-13 R47 savings vs Path A');
    assert.equal(((r175PathA-r175PathC)/r175PathA*100).toFixed(2),'90.60','11-13 R47 pct savings vs Path A');
    for(const r175File of ['workshops/github-trending-radar/docs/kodyurd-herdr-wake-evidenced-3d-code-city-drawio-safe-flag-reboot-agent-resumer-selection-faq.md','workshops/github-trending-radar/docs/kodyurd-herdr-wake-evidenced-3d-code-city-drawio-safe-flag-reboot-agent-resumer-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r47-kodyurd-herdr-wake.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r175File),'utf8');
      assert.ok(txt.includes('1,280.00')&&txt.includes('3,800.00')&&txt.includes('5,080.00')&&txt.includes('145.00')&&txt.includes('332.50')&&txt.includes('477.50')&&txt.includes('4,602.50')&&txt.includes('90.60%')&&txt.includes('not_measured'),r175File+': contains exact 11-13 R47 kodyurd+herdr-wake closed-form parameters');
    }
    // 2026-11-13 Round 48 (R176: WeiBeta/skill-forge-public + IsValorum/V-Agent) closed-form FinOps verification
    const r176PathA=1680.00+38.0*95.00;
    assert.equal(r176PathA.toFixed(2),'5290.00','11-13 R48 Path A total');
    const r176PathC=150.00+3.5*95.00;
    assert.equal(r176PathC.toFixed(2),'482.50','11-13 R48 Path C total');
    assert.equal((r176PathA-r176PathC).toFixed(2),'4807.50','11-13 R48 savings vs Path A');
    assert.equal(((r176PathA-r176PathC)/r176PathA*100).toFixed(2),'90.88','11-13 R48 pct savings vs Path A');
    for(const r176File of ['workshops/github-trending-radar/docs/skill-forge-public-v-agent-8skill-codex-governance-dynamic-moe-vram-windows-agent-selection-faq.md','workshops/github-trending-radar/docs/skill-forge-public-v-agent-8skill-codex-governance-dynamic-moe-vram-windows-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r48-skill-forge-v-agent.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r176File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,610.00')&&txt.includes('5,290.00')&&txt.includes('150.00')&&txt.includes('332.50')&&txt.includes('482.50')&&txt.includes('4,807.50')&&txt.includes('90.88%')&&txt.includes('not_measured'),r176File+': contains exact 11-13 R48 skill-forge+v-agent closed-form parameters');
    }
    // 2026-11-13 Round 49 (R177: DylanCosto/ggv + ckaico/patty) closed-form FinOps verification
    const r177PathA=1420.00+42.0*110.00;
    assert.equal(r177PathA.toFixed(2),'6040.00','11-13 R49 Path A total');
    const r177PathC=155.00+3.5*110.00;
    assert.equal(r177PathC.toFixed(2),'540.00','11-13 R49 Path C total');
    assert.equal((r177PathA-r177PathC).toFixed(2),'5500.00','11-13 R49 savings vs Path A');
    assert.equal(((r177PathA-r177PathC)/r177PathA*100).toFixed(2),'91.06','11-13 R49 pct savings vs Path A');
    for(const r177File of ['workshops/github-trending-radar/docs/ggv-patty-1ms-rust-genome-viewer-mcp-file-line-verified-patent-clearance-mcp-selection-faq.md','workshops/github-trending-radar/docs/ggv-patty-1ms-rust-genome-viewer-mcp-file-line-verified-patent-clearance-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r49-ggv-patty.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r177File),'utf8');
      assert.ok(txt.includes('1,420.00')&&txt.includes('4,620.00')&&txt.includes('6,040.00')&&txt.includes('155.00')&&txt.includes('385.00')&&txt.includes('540.00')&&txt.includes('5,500.00')&&txt.includes('91.06%')&&txt.includes('not_measured'),r177File+': contains exact 11-13 R49 ggv+patty closed-form parameters');
    }
    // 2026-11-13 Round 50 (R178: IanuaIDP/ianua + october-dev/car-use) closed-form FinOps verification
    const r178PathA=2350.00+38.0*95.00;
    assert.equal(r178PathA.toFixed(2),'5960.00','11-13 R50 Path A total');
    const r178PathC=175.00+3.5*95.00;
    assert.equal(r178PathC.toFixed(2),'507.50','11-13 R50 Path C total');
    assert.equal((r178PathA-r178PathC).toFixed(2),'5452.50','11-13 R50 savings vs Path A');
    assert.equal(((r178PathA-r178PathC)/r178PathA*100).toFixed(2),'91.48','11-13 R50 pct savings vs Path A');
    for(const r178File of ['workshops/github-trending-radar/docs/ianua-car-use-rust-zero-trust-agent-idp-gateway-obd2-virtual-car-diagnostic-skill-selection-faq.md','workshops/github-trending-radar/docs/ianua-car-use-rust-zero-trust-agent-idp-gateway-obd2-virtual-car-diagnostic-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r50-ianua-car-use.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r178File),'utf8');
      assert.ok(txt.includes('2,350.00')&&txt.includes('3,610.00')&&txt.includes('5,960.00')&&txt.includes('175.00')&&txt.includes('332.50')&&txt.includes('507.50')&&txt.includes('5,452.50')&&txt.includes('91.48%')&&txt.includes('not_measured'),r178File+': contains exact 11-13 R50 ianua+car-use closed-form parameters');
    }
    // 2026-11-13 Round 51 (R179: huawei-csl/MACaQ + bookleme/bookleme) closed-form FinOps verification
    const r179PathA=2420.00+38.0*100.00;
    assert.equal(r179PathA.toFixed(2),'6220.00','11-13 R51 Path A total');
    const r179PathC=185.00+3.5*100.00;
    assert.equal(r179PathC.toFixed(2),'535.00','11-13 R51 Path C total');
    assert.equal((r179PathA-r179PathC).toFixed(2),'5685.00','11-13 R51 savings vs Path A');
    assert.equal(((r179PathA-r179PathC)/r179PathA*100).toFixed(2),'91.40','11-13 R51 pct savings vs Path A');
    for(const r179File of ['workshops/github-trending-radar/docs/macaq-bookleme-32gb-122b-multimodal-gguf-quantization-zero-dep-book-to-skill-compiler-selection-faq.md','workshops/github-trending-radar/docs/macaq-bookleme-32gb-122b-multimodal-gguf-quantization-zero-dep-book-to-skill-compiler-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r51-macaq-bookleme.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r179File),'utf8');
      assert.ok(txt.includes('2,420.00')&&txt.includes('3,800.00')&&txt.includes('6,220.00')&&txt.includes('185.00')&&txt.includes('350.00')&&txt.includes('535.00')&&txt.includes('5,685.00')&&txt.includes('91.40%')&&txt.includes('not_measured'),r179File+': contains exact 11-13 R51 macaq+bookleme closed-form parameters');
    }
    // 2026-11-13 Round 52 (R180: skild-ai/steel + pmndrs/pine) closed-form FinOps verification
    const r180PathA=2640.00+38.0*105.00;
    assert.equal(r180PathA.toFixed(2),'6630.00','11-13 R52 Path A total');
    const r180PathC=195.00+3.5*105.00;
    assert.equal(r180PathC.toFixed(2),'562.50','11-13 R52 Path C total');
    assert.equal((r180PathA-r180PathC).toFixed(2),'6067.50','11-13 R52 savings vs Path A');
    assert.equal(((r180PathA-r180PathC)/r180PathA*100).toFixed(2),'91.52','11-13 R52 pct savings vs Path A');
    for(const r180File of ['workshops/github-trending-radar/docs/steel-pine-13x-heterogeneous-robot-physics-solver-reactive-event-driven-agent-harness-selection-faq.md','workshops/github-trending-radar/docs/steel-pine-13x-heterogeneous-robot-physics-solver-reactive-event-driven-agent-harness-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r52-steel-pine.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r180File),'utf8');
      assert.ok(txt.includes('2,640.00')&&txt.includes('3,990.00')&&txt.includes('6,630.00')&&txt.includes('195.00')&&txt.includes('367.50')&&txt.includes('562.50')&&txt.includes('6,067.50')&&txt.includes('91.52%')&&txt.includes('not_measured'),r180File+': contains exact 11-13 R52 steel+pine closed-form parameters');
    }
    // 2026-11-13 Round 53 (R181: simplexai-labs/linger + nickvasilescu/bot-hq) closed-form FinOps verification
    const r181PathA=2760.00+36.0*95.00;
    assert.equal(r181PathA.toFixed(2),'6180.00','11-13 R53 Path A total');
    const r181PathC=180.00+3.5*95.00;
    assert.equal(r181PathC.toFixed(2),'512.50','11-13 R53 Path C total');
    assert.equal((r181PathA-r181PathC).toFixed(2),'5667.50','11-13 R53 savings vs Path A');
    assert.equal(((r181PathA-r181PathC)/r181PathA*100).toFixed(2),'91.71','11-13 R53 pct savings vs Path A');
    for(const r181File of ['workshops/github-trending-radar/docs/linger-bot-hq-125b-moe-on-12gb-gpu-personal-agent-4screen-orgo-hermes-bot-hq-selection-faq.md','workshops/github-trending-radar/docs/linger-bot-hq-125b-moe-on-12gb-gpu-personal-agent-4screen-orgo-hermes-bot-hq-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r53-linger-bot-hq.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r181File),'utf8');
      assert.ok(txt.includes('2,760.00')&&txt.includes('3,420.00')&&txt.includes('6,180.00')&&txt.includes('180.00')&&txt.includes('332.50')&&txt.includes('512.50')&&txt.includes('5,667.50')&&txt.includes('91.71%')&&txt.includes('not_measured'),r181File+': contains exact 11-13 R53 linger+bot-hq closed-form parameters');
    }
    // 2026-11-13 Round 54 (R182: ValidatorStack/solana-vigil + MZULALI/xj-scanner) closed-form FinOps verification
    const r182PathA=2480.00+36.0*105.00;
    assert.equal(r182PathA.toFixed(2),'6260.00','11-13 R54 Path A total');
    const r182PathC=160.00+3.5*105.00;
    assert.equal(r182PathC.toFixed(2),'527.50','11-13 R54 Path C total');
    assert.equal((r182PathA-r182PathC).toFixed(2),'5732.50','11-13 R54 savings vs Path A');
    assert.equal(((r182PathA-r182PathC)/r182PathA*100).toFixed(2),'91.57','11-13 R54 pct savings vs Path A');
    for(const r182File of ['workshops/github-trending-radar/docs/solana-vigil-xj-scanner-readonly-alpenglow-validator-ops-3dollar-arduino-obd1-agent-skill-selection-faq.md','workshops/github-trending-radar/docs/solana-vigil-xj-scanner-readonly-alpenglow-validator-ops-3dollar-arduino-obd1-agent-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r54-solana-vigil-xj-scanner.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r182File),'utf8');
      assert.ok(txt.includes('2,480.00')&&txt.includes('3,780.00')&&txt.includes('6,260.00')&&txt.includes('160.00')&&txt.includes('367.50')&&txt.includes('527.50')&&txt.includes('5,732.50')&&txt.includes('91.57%')&&txt.includes('not_measured'),r182File+': contains exact 11-13 R54 solana-vigil+xj-scanner closed-form parameters');
    }
    // 2026-11-13 Round 55 (R183: zadescoxp/calibrain-harness + fengyiqicoder/awesome-fable-5.2) closed-form FinOps verification
    const r183PathA=1520.00+36.0*100.00;
    assert.equal(r183PathA.toFixed(2),'5120.00','11-13 R55 Path A total');
    const r183PathC=140.00+3.5*100.00;
    assert.equal(r183PathC.toFixed(2),'490.00','11-13 R55 Path C total');
    assert.equal((r183PathA-r183PathC).toFixed(2),'4630.00','11-13 R55 savings vs Path A');
    assert.equal(((r183PathA-r183PathC)/r183PathA*100).toFixed(2),'90.43','11-13 R55 pct savings vs Path A');
    for(const r183File of ['workshops/github-trending-radar/docs/calibrain-harness-awesome-fable-5-2-systemone-forward-testing-143-verified-live-artifacts-selection-faq.md','workshops/github-trending-radar/docs/calibrain-harness-awesome-fable-5-2-systemone-forward-testing-143-verified-live-artifacts-selection-faq.en.md','assets/github-ai-radar-2026-11-13-r55-calibrain-fable52.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-13-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r183File),'utf8');
      assert.ok(txt.includes('1,520.00')&&txt.includes('3,600.00')&&txt.includes('5,120.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('4,630.00')&&txt.includes('90.43%')&&txt.includes('not_measured'),r183File+': contains exact 11-13 R55 calibrain+awesome-fable-5.2 closed-form parameters');
    }
    // 2026-11-14 Raw Evidence SHA-256 & Daytime Round 1 (R184: relatedb/relate + berkantay/gpucanvas) verification
    const rawHtml1114=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-14-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(crypto.createHash('sha256').update(rawHtml1114).digest('hex'),'46ea932ff0f84c1970372b2e829adea752d5a43f686eb7ba05aa85560c8c4a77','2026-11-14 raw HTML LF sha256');
    const rawSearch1114=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-14-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(crypto.createHash('sha256').update(rawSearch1114).digest('hex'),'a4edf557e91854831dc80d3670e3e7a1b49c7e9ca14e2e4dd7913489bd7cc2b2','2026-11-14 raw Search JSON LF sha256');
    const r184PathA=1850.00+38.0*100.00;
    assert.equal(r184PathA.toFixed(2),'5650.00','11-14 R1 Path A total');
    const r184PathC=150.00+3.5*100.00;
    assert.equal(r184PathC.toFixed(2),'500.00','11-14 R1 Path C total');
    assert.equal((r184PathA-r184PathC).toFixed(2),'5150.00','11-14 R1 savings vs Path A');
    assert.equal(((r184PathA-r184PathC)/r184PathA*100).toFixed(2),'91.15','11-14 R1 pct savings vs Path A');
    for(const r184File of ['workshops/github-trending-radar/docs/relate-gpucanvas-embedded-cypher25-graph-db-webgpu-5000-live-dom-canvas-selection-faq.md','workshops/github-trending-radar/docs/relate-gpucanvas-embedded-cypher25-graph-db-webgpu-5000-live-dom-canvas-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r1-relate-gpucanvas.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r184File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,800.00')&&txt.includes('5,650.00')&&txt.includes('150.00')&&txt.includes('350.00')&&txt.includes('500.00')&&txt.includes('5,150.00')&&txt.includes('91.15%')&&txt.includes('not_measured'),r184File+': contains exact 11-14 R1 relate+gpucanvas closed-form parameters');
    }
    // 2026-11-14 Daytime Round 2 (R185: Open-RUA/uni-robot-agent + apple-aiml-research/ml-halo) verification
    const r185PathA=2350.00+42.0*110.00;
    assert.equal(r185PathA.toFixed(2),'6970.00','11-14 R2 Path A total');
    const r185PathC=195.00+3.5*110.00;
    assert.equal(r185PathC.toFixed(2),'580.00','11-14 R2 Path C total');
    assert.equal((r185PathA-r185PathC).toFixed(2),'6390.00','11-14 R2 savings vs Path A');
    assert.equal(((r185PathA-r185PathC)/r185PathA*100).toFixed(2),'91.68','11-14 R2 pct savings vs Path A');
    for(const r185File of ['workshops/github-trending-radar/docs/uni-robot-agent-ml-halo-unified-robot-use-harness-perceptive-humanoid-motion-selection-faq.md','workshops/github-trending-radar/docs/uni-robot-agent-ml-halo-unified-robot-use-harness-perceptive-humanoid-motion-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r2-uni-robot-halo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r185File),'utf8');
      assert.ok(txt.includes('2,350.00')&&txt.includes('4,620.00')&&txt.includes('6,970.00')&&txt.includes('195.00')&&txt.includes('385.00')&&txt.includes('580.00')&&txt.includes('6,390.00')&&txt.includes('91.68%')&&txt.includes('not_measured'),r185File+': contains exact 11-14 R2 uni-robot-agent+ml-halo closed-form parameters');
    }
    // 2026-11-14 Daytime Round 3 (R186: dreamers-laboratory/good-door + TngSHoO/agentcase-lab) verification
    const r186PathA=1580.00+38.0*95.00;
    assert.equal(r186PathA.toFixed(2),'5190.00','11-14 R3 Path A total');
    const r186PathC=140.00+3.5*95.00;
    assert.equal(r186PathC.toFixed(2),'472.50','11-14 R3 Path C total');
    assert.equal((r186PathA-r186PathC).toFixed(2),'4717.50','11-14 R3 savings vs Path A');
    assert.equal(((r186PathA-r186PathC)/r186PathA*100).toFixed(2),'90.90','11-14 R3 pct savings vs Path A');
    for(const r186File of ['workshops/github-trending-radar/docs/good-door-agentcase-lab-hardware-vault-agent-secrets-failure-replay-rca-selection-faq.md','workshops/github-trending-radar/docs/good-door-agentcase-lab-hardware-vault-agent-secrets-failure-replay-rca-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r3-good-door-agentcase.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r186File),'utf8');
      assert.ok(txt.includes('1,580.00')&&txt.includes('3,610.00')&&txt.includes('5,190.00')&&txt.includes('140.00')&&txt.includes('332.50')&&txt.includes('472.50')&&txt.includes('4,717.50')&&txt.includes('90.90%')&&txt.includes('not_measured'),r186File+': contains exact 11-14 R3 good-door+agentcase-lab closed-form parameters');
    }
    // 2026-11-14 Daytime Round 4 (R187: DEEIX-AI/Winc + ubc-vision/solv3r) verification
    const r187PathA=1960.00+38.0*105.00;
    assert.equal(r187PathA.toFixed(2),'5950.00','11-14 R4 Path A total');
    const r187PathC=165.00+3.5*105.00;
    assert.equal(r187PathC.toFixed(2),'532.50','11-14 R4 Path C total');
    assert.equal((r187PathA-r187PathC).toFixed(2),'5417.50','11-14 R4 savings vs Path A');
    assert.equal(((r187PathA-r187PathC)/r187PathA*100).toFixed(2),'91.05','11-14 R4 pct savings vs Path A');
    for(const r187File of ['workshops/github-trending-radar/docs/winc-solv3r-119ms-52mb-rust-1gb-editor-3d-looped-transformer-multiview-solver-selection-faq.md','workshops/github-trending-radar/docs/winc-solv3r-119ms-52mb-rust-1gb-editor-3d-looped-transformer-multiview-solver-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r4-winc-solv3r.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r187File),'utf8');
      assert.ok(txt.includes('1,960.00')&&txt.includes('3,990.00')&&txt.includes('5,950.00')&&txt.includes('165.00')&&txt.includes('367.50')&&txt.includes('532.50')&&txt.includes('5,417.50')&&txt.includes('91.05%')&&txt.includes('not_measured'),r187File+': contains exact 11-14 R4 winc+solv3r closed-form parameters');
    }
    // 2026-11-14 Daytime Round 5 (R188: hyperionaidev/smolmaxxing + fuyichen0725/blinkmimic) verification
    const r188PathA=2180.00+36.0*105.00;
    assert.equal(r188PathA.toFixed(2),'5960.00','11-14 R5 Path A total');
    const r188PathC=145.00+3.5*105.00;
    assert.equal(r188PathC.toFixed(2),'512.50','11-14 R5 Path C total');
    assert.equal((r188PathA-r188PathC).toFixed(2),'5447.50','11-14 R5 savings vs Path A');
    assert.equal(((r188PathA-r188PathC)/r188PathA*100).toFixed(2),'91.40','11-14 R5 pct savings vs Path A');
    for(const r188File of ['workshops/github-trending-radar/docs/smolmaxxing-blinkmimic-1gb-ram-16b-phone-80b-flash-llm-3min-g1-motion-tracking-selection-faq.md','workshops/github-trending-radar/docs/smolmaxxing-blinkmimic-1gb-ram-16b-phone-80b-flash-llm-3min-g1-motion-tracking-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r5-smolmaxxing-blinkmimic.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r188File),'utf8');
      assert.ok(txt.includes('2,180.00')&&txt.includes('3,780.00')&&txt.includes('5,960.00')&&txt.includes('145.00')&&txt.includes('367.50')&&txt.includes('512.50')&&txt.includes('5,447.50')&&txt.includes('91.40%')&&txt.includes('not_measured'),r188File+': contains exact 11-14 R5 smolmaxxing+blinkmimic closed-form parameters');
    }
    // 2026-11-14 Daytime Round 6 (R189: owoevan-dev/music-skill + klad-app/klad) verification
    const r189PathA=1460.00+40.0*95.00;
    assert.equal(r189PathA.toFixed(2),'5260.00','11-14 R6 Path A total');
    const r189PathC=135.00+3.5*95.00;
    assert.equal(r189PathC.toFixed(2),'467.50','11-14 R6 Path C total');
    assert.equal((r189PathA-r189PathC).toFixed(2),'4792.50','11-14 R6 savings vs Path A');
    assert.equal(((r189PathA-r189PathC)/r189PathA*100).toFixed(2),'91.11','11-14 R6 pct savings vs Path A');
    for(const r189File of ['workshops/github-trending-radar/docs/music-skill-klad-symbolic-note-composer-skill-stroke-editable-agent-painting-studio-selection-faq.md','workshops/github-trending-radar/docs/music-skill-klad-symbolic-note-composer-skill-stroke-editable-agent-painting-studio-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r6-music-skill-klad.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r189File),'utf8');
      assert.ok(txt.includes('1,460.00')&&txt.includes('3,800.00')&&txt.includes('5,260.00')&&txt.includes('135.00')&&txt.includes('332.50')&&txt.includes('467.50')&&txt.includes('4,792.50')&&txt.includes('91.11%')&&txt.includes('not_measured'),r189File+': contains exact 11-14 R6 music-skill+klad closed-form parameters');
    }
    // 2026-11-14 Daytime Round 7 (R190: Leonxlnx/escapement + bea4dev/AntiWebUI) verification
    const r190PathA=1750.00+38.0*100.00;
    assert.equal(r190PathA.toFixed(2),'5550.00','11-14 R7 Path A total');
    const r190PathC=140.00+3.5*100.00;
    assert.equal(r190PathC.toFixed(2),'490.00','11-14 R7 Path C total');
    assert.equal((r190PathA-r190PathC).toFixed(2),'5060.00','11-14 R7 savings vs Path A');
    assert.equal(((r190PathA-r190PathC)/r190PathA*100).toFixed(2),'91.17','11-14 R7 pct savings vs Path A');
    for(const r190File of ['workshops/github-trending-radar/docs/escapement-antiwebui-5agent-headless-blender-film-pipeline-zero-webview-rust-wgpu-ui-selection-faq.md','workshops/github-trending-radar/docs/escapement-antiwebui-5agent-headless-blender-film-pipeline-zero-webview-rust-wgpu-ui-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r7-escapement-antiwebui.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r190File),'utf8');
      assert.ok(txt.includes('1,750.00')&&txt.includes('3,800.00')&&txt.includes('5,550.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('5,060.00')&&txt.includes('91.17%')&&txt.includes('not_measured'),r190File+': contains exact 11-14 R7 escapement+AntiWebUI closed-form parameters');
    }
    // 2026-11-14 Daytime Round 8 (R191: supercli-site/awesome-coding-plan + lijiaqi-AI-Product-Manager/dsh-agent-compare) verification
    const r191PathA=2450.00+36.0*95.00;
    assert.equal(r191PathA.toFixed(2),'5870.00','11-14 R8 Path A total');
    const r191PathC=185.00+3.5*95.00;
    assert.equal(r191PathC.toFixed(2),'517.50','11-14 R8 Path C total');
    assert.equal((r191PathA-r191PathC).toFixed(2),'5352.50','11-14 R8 savings vs Path A');
    assert.equal(((r191PathA-r191PathC)/r191PathA*100).toFixed(2),'91.18','11-14 R8 pct savings vs Path A');
    for(const r191File of ['workshops/github-trending-radar/docs/awesome-coding-plan-dsh-agent-compare-ai-coding-subscription-finops-2to4-agent-real-run-arena-selection-faq.md','workshops/github-trending-radar/docs/awesome-coding-plan-dsh-agent-compare-ai-coding-subscription-finops-2to4-agent-real-run-arena-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r8-coding-plan-agent-compare.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r191File),'utf8');
      assert.ok(txt.includes('2,450.00')&&txt.includes('3,420.00')&&txt.includes('5,870.00')&&txt.includes('185.00')&&txt.includes('332.50')&&txt.includes('517.50')&&txt.includes('5,352.50')&&txt.includes('91.18%')&&txt.includes('not_measured'),r191File+': contains exact 11-14 R8 awesome-coding-plan+dsh-agent-compare closed-form parameters');
    }
    // 2026-11-14 Daytime Round 9 (R192: Goblinmine/homelab-diagram + Renly1994/xiaotang-daozai) verification
    const r192PathA=1540.00+38.0*95.00;
    assert.equal(r192PathA.toFixed(2),'5150.00','11-14 R9 Path A total');
    const r192PathC=125.00+3.5*95.00;
    assert.equal(r192PathC.toFixed(2),'457.50','11-14 R9 Path C total');
    assert.equal((r192PathA-r192PathC).toFixed(2),'4692.50','11-14 R9 savings vs Path A');
    assert.equal(((r192PathA-r192PathC)/r192PathA*100).toFixed(2),'91.12','11-14 R9 pct savings vs Path A');
    for(const r192File of ['workshops/github-trending-radar/docs/homelab-diagram-xiaotang-daozai-agentic-yaml-network-svg-rust-windows-9ai-quota-island-selection-faq.md','workshops/github-trending-radar/docs/homelab-diagram-xiaotang-daozai-agentic-yaml-network-svg-rust-windows-9ai-quota-island-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r9-homelab-diagram-daozai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r192File),'utf8');
      assert.ok(txt.includes('1,540.00')&&txt.includes('3,610.00')&&txt.includes('5,150.00')&&txt.includes('125.00')&&txt.includes('332.50')&&txt.includes('457.50')&&txt.includes('4,692.50')&&txt.includes('91.12%')&&txt.includes('not_measured'),r192File+': contains exact 11-14 R9 homelab-diagram+daozai closed-form parameters');
    }
    // 2026-11-14 Daytime Round 10 (R193: Gloridust/WowType + YusufCeng1z/ding) verification
    const r193PathA=1380.00+36.0*95.00;
    assert.equal(r193PathA.toFixed(2),'4800.00','11-14 R10 Path A total');
    const r193PathC=95.00+3.5*95.00;
    assert.equal(r193PathC.toFixed(2),'427.50','11-14 R10 Path C total');
    assert.equal((r193PathA-r193PathC).toFixed(2),'4372.50','11-14 R10 savings vs Path A');
    assert.equal(((r193PathA-r193PathC)/r193PathA*100).toFixed(2),'91.09','11-14 R10 pct savings vs Path A');
    for(const r193File of ['workshops/github-trending-radar/docs/wowtype-ding-linux-macos-offline-voice-hymt-ime-zero-dep-spring-morphing-toast-selection-faq.md','workshops/github-trending-radar/docs/wowtype-ding-linux-macos-offline-voice-hymt-ime-zero-dep-spring-morphing-toast-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r10-wowtype-ding.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r193File),'utf8');
      assert.ok(txt.includes('1,380.00')&&txt.includes('3,420.00')&&txt.includes('4,800.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,372.50')&&txt.includes('91.09%')&&txt.includes('not_measured'),r193File+': contains exact 11-14 R10 WowType+ding closed-form parameters');
    }
    // 2026-11-14 Daytime Round 11 (R194: zeekk0/OpenAmika + ZSeven-W/dsh-game-studio) verification
    const r194PathA=1840.00+38.0*100.00;
    assert.equal(r194PathA.toFixed(2),'5640.00','11-14 R11 Path A total');
    const r194PathC=145.00+3.5*100.00;
    assert.equal(r194PathC.toFixed(2),'495.00','11-14 R11 Path C total');
    assert.equal((r194PathA-r194PathC).toFixed(2),'5145.00','11-14 R11 savings vs Path A');
    assert.equal(((r194PathA-r194PathC)/r194PathA*100).toFixed(2),'91.22','11-14 R11 pct savings vs Path A');
    for(const r194File of ['workshops/github-trending-radar/docs/openamika-dsh-game-studio-5gb-vram-semilocal-live2d-companion-10tool-autoplay-game-studio-selection-faq.md','workshops/github-trending-radar/docs/openamika-dsh-game-studio-5gb-vram-semilocal-live2d-companion-10tool-autoplay-game-studio-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r11-openamika-game-studio.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r194File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,800.00')&&txt.includes('5,640.00')&&txt.includes('145.00')&&txt.includes('350.00')&&txt.includes('495.00')&&txt.includes('5,145.00')&&txt.includes('91.22%')&&txt.includes('not_measured'),r194File+': contains exact 11-14 R11 OpenAmika+dsh-game-studio closed-form parameters');
    }
    // 2026-11-14 Daytime Round 12 (R195: imraywang/ray-sticker-shop + starman-tech/mousepods) verification
    const r195PathA=1620.00+36.0*95.00;
    assert.equal(r195PathA.toFixed(2),'5040.00','11-14 R12 Path A total');
    const r195PathC=95.00+3.5*95.00;
    assert.equal(r195PathC.toFixed(2),'427.50','11-14 R12 Path C total');
    assert.equal((r195PathA-r195PathC).toFixed(2),'4612.50','11-14 R12 savings vs Path A');
    assert.equal(((r195PathA-r195PathC)/r195PathA*100).toFixed(2),'91.52','11-14 R12 pct savings vs Path A');
    for(const r195File of ['workshops/github-trending-radar/docs/ray-sticker-shop-mousepods-70cent-wechat-sticker-pack-skill-airpods3-remotehid-linux-head-tracker-selection-faq.md','workshops/github-trending-radar/docs/ray-sticker-shop-mousepods-70cent-wechat-sticker-pack-skill-airpods3-remotehid-linux-head-tracker-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r12-sticker-shop-mousepods.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r195File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('3,420.00')&&txt.includes('5,040.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,612.50')&&txt.includes('91.52%')&&txt.includes('not_measured'),r195File+': contains exact 11-14 R12 ray-sticker-shop+mousepods closed-form parameters');
    }
    // 2026-11-14 Daytime Round 13 (R196: dhruvthakur11/youtube-ai-video-editing-system + dotslashsimran/simcraft) verification
    const r196PathA=1680.00+38.0*100.00;
    assert.equal(r196PathA.toFixed(2),'5480.00','11-14 R13 Path A total');
    const r196PathC=135.00+3.5*100.00;
    assert.equal(r196PathC.toFixed(2),'485.00','11-14 R13 Path C total');
    assert.equal((r196PathA-r196PathC).toFixed(2),'4995.00','11-14 R13 savings vs Path A');
    assert.equal(((r196PathA-r196PathC)/r196PathA*100).toFixed(2),'91.15','11-14 R13 pct savings vs Path A');
    for(const r196File of ['workshops/github-trending-radar/docs/youtube-ai-video-editing-system-simcraft-5stage-eyeline-json-video-pipeline-24-claude-skills-selection-faq.md','workshops/github-trending-radar/docs/youtube-ai-video-editing-system-simcraft-5stage-eyeline-json-video-pipeline-24-claude-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r13-youtube-video-simcraft.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r196File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,800.00')&&txt.includes('5,480.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('4,995.00')&&txt.includes('91.15%')&&txt.includes('not_measured'),r196File+': contains exact 11-14 R13 youtube-ai-video+simcraft closed-form parameters');
    }
    // 2026-11-14 Daytime Round 14 (R197: lizTheDeveloper/flyover-scrub + arnold117/iOS-NOIR) verification
    const r197PathA=1920.00+38.0*110.00;
    assert.equal(r197PathA.toFixed(2),'6100.00','11-14 R14 Path A total');
    const r197PathC=140.00+3.5*110.00;
    assert.equal(r197PathC.toFixed(2),'525.00','11-14 R14 Path C total');
    assert.equal((r197PathA-r197PathC).toFixed(2),'5575.00','11-14 R14 savings vs Path A');
    assert.equal(((r197PathA-r197PathC)/r197PathA*100).toFixed(2),'91.39','11-14 R14 pct savings vs Path A');
    for(const r197File of ['workshops/github-trending-radar/docs/flyover-scrub-ios-noir-aircraft-doppler-enf-audio-scrubber-unjailbroken-ios-forensic-auditor-selection-faq.md','workshops/github-trending-radar/docs/flyover-scrub-ios-noir-aircraft-doppler-enf-audio-scrubber-unjailbroken-ios-forensic-auditor-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r14-flyover-scrub-ios-noir.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r197File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('4,180.00')&&txt.includes('6,100.00')&&txt.includes('140.00')&&txt.includes('385.00')&&txt.includes('525.00')&&txt.includes('5,575.00')&&txt.includes('91.39%')&&txt.includes('not_measured'),r197File+': contains exact 11-14 R14 flyover-scrub+iOS-NOIR closed-form parameters');
    }
    // 2026-11-14 Daytime Round 15 (R198: neondeex/atlas-filemanager + Future-Proof-DS/interactive-ai-ml-tools) verification
    const r198PathA=1480.00+36.0*95.00;
    assert.equal(r198PathA.toFixed(2),'4900.00','11-14 R15 Path A total');
    const r198PathC=105.00+3.5*95.00;
    assert.equal(r198PathC.toFixed(2),'437.50','11-14 R15 Path C total');
    assert.equal((r198PathA-r198PathC).toFixed(2),'4462.50','11-14 R15 savings vs Path A');
    assert.equal(((r198PathA-r198PathC)/r198PathA*100).toFixed(2),'91.07','11-14 R15 pct savings vs Path A');
    for(const r198File of ['workshops/github-trending-radar/docs/atlas-filemanager-interactive-ai-ml-tools-rust-gpui-filemanager-mlops-agentic-eval-simulators-selection-faq.md','workshops/github-trending-radar/docs/atlas-filemanager-interactive-ai-ml-tools-rust-gpui-filemanager-mlops-agentic-eval-simulators-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r15-atlas-interactive-ml-tools.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r198File),'utf8');
      assert.ok(txt.includes('1,480.00')&&txt.includes('3,420.00')&&txt.includes('4,900.00')&&txt.includes('105.00')&&txt.includes('332.50')&&txt.includes('437.50')&&txt.includes('4,462.50')&&txt.includes('91.07%')&&txt.includes('not_measured'),r198File+': contains exact 11-14 R15 Atlas+interactive-ai-ml-tools closed-form parameters');
    }
    // 2026-11-14 Daytime Round 16 (R199: anomalyco/textjs + smokeeaasd/flawless-ui-ux) verification
    const r199PathA=1560.00+36.0*95.00;
    assert.equal(r199PathA.toFixed(2),'4980.00','11-14 R16 Path A total');
    const r199PathC=110.00+3.5*95.00;
    assert.equal(r199PathC.toFixed(2),'442.50','11-14 R16 Path C total');
    assert.equal((r199PathA-r199PathC).toFixed(2),'4537.50','11-14 R16 savings vs Path A');
    assert.equal(((r199PathA-r199PathC)/r199PathA*100).toFixed(2),'91.11','11-14 R16 pct savings vs Path A');
    for(const r199File of ['workshops/github-trending-radar/docs/textjs-flawless-ui-ux-browser-console-react-framework-12agent-ui-ux-inspection-cli-selection-faq.md','workshops/github-trending-radar/docs/textjs-flawless-ui-ux-browser-console-react-framework-12agent-ui-ux-inspection-cli-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r16-textjs-flawless-ui-ux.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r199File),'utf8');
      assert.ok(txt.includes('1,560.00')&&txt.includes('3,420.00')&&txt.includes('4,980.00')&&txt.includes('110.00')&&txt.includes('332.50')&&txt.includes('442.50')&&txt.includes('4,537.50')&&txt.includes('91.11%')&&txt.includes('not_measured'),r199File+': contains exact 11-14 R16 Text.js+flawless-ui-ux closed-form parameters');
    }
    // 2026-11-14 Daytime Round 17 (R200: aa1143/NamiDSH + liguozheng-ac/Lingbo-Desk) verification
    const r200PathA=1650.00+38.0*100.00;
    assert.equal(r200PathA.toFixed(2),'5450.00','11-14 R17 Path A total');
    const r200PathC=130.00+3.5*100.00;
    assert.equal(r200PathC.toFixed(2),'480.00','11-14 R17 Path C total');
    assert.equal((r200PathA-r200PathC).toFixed(2),'4970.00','11-14 R17 savings vs Path A');
    assert.equal(((r200PathA-r200PathC)/r200PathA*100).toFixed(2),'91.19','11-14 R17 pct savings vs Path A');
    for(const r200File of ['workshops/github-trending-radar/docs/namidsh-lingbo-desk-1000line-cordis-plugin-agent-kernel-receipt-hardened-live2d-voice-worker-selection-faq.md','workshops/github-trending-radar/docs/namidsh-lingbo-desk-1000line-cordis-plugin-agent-kernel-receipt-hardened-live2d-voice-worker-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r17-namidsh-lingbo-desk.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r200File),'utf8');
      assert.ok(txt.includes('1,650.00')&&txt.includes('3,800.00')&&txt.includes('5,450.00')&&txt.includes('130.00')&&txt.includes('350.00')&&txt.includes('480.00')&&txt.includes('4,970.00')&&txt.includes('91.19%')&&txt.includes('not_measured'),r200File+': contains exact 11-14 R17 NamiDSH+Lingbo-Desk closed-form parameters');
    }
    // 2026-11-14 Daytime Round 18 (R201: TizenryA/colab-gpu-studio + zainudinnoori/gitmanual) verification
    const r201PathA=1720.00+36.0*95.00;
    assert.equal(r201PathA.toFixed(2),'5140.00','11-14 R18 Path A total');
    const r201PathC=115.00+3.5*95.00;
    assert.equal(r201PathC.toFixed(2),'447.50','11-14 R18 Path C total');
    assert.equal((r201PathA-r201PathC).toFixed(2),'4692.50','11-14 R18 savings vs Path A');
    assert.equal(((r201PathA-r201PathC)/r201PathA*100).toFixed(2),'91.29','11-14 R18 pct savings vs Path A');
    for(const r201File of ['workshops/github-trending-radar/docs/colab-gpu-studio-gitmanual-ephemeral-colab-comfyui-workbench-zero-clone-repo-setup-mcp-selection-faq.md','workshops/github-trending-radar/docs/colab-gpu-studio-gitmanual-ephemeral-colab-comfyui-workbench-zero-clone-repo-setup-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r18-colab-gpu-studio-gitmanual.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r201File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,420.00')&&txt.includes('5,140.00')&&txt.includes('115.00')&&txt.includes('332.50')&&txt.includes('447.50')&&txt.includes('4,692.50')&&txt.includes('91.29%')&&txt.includes('not_measured'),r201File+': contains exact 11-14 R18 colab-gpu-studio+gitmanual closed-form parameters');
    }
    // 2026-11-14 Daytime Round 19 (R202: fltman/idea-generator-2 + joeseesun/capwise) verification
    const r202PathA=1580.00+38.0*100.00;
    assert.equal(r202PathA.toFixed(2),'5380.00','11-14 R19 Path A total');
    const r202PathC=125.00+3.5*100.00;
    assert.equal(r202PathC.toFixed(2),'475.00','11-14 R19 Path C total');
    assert.equal((r202PathA-r202PathC).toFixed(2),'4905.00','11-14 R19 savings vs Path A');
    assert.equal(((r202PathA-r202PathC)/r202PathA*100).toFixed(2),'91.17','11-14 R19 pct savings vs Path A');
    for(const r202File of ['workshops/github-trending-radar/docs/idea-generator-2-capwise-calibrated-jury-evolution-board-macos-gpui-bilingual-screen-studio-selection-faq.md','workshops/github-trending-radar/docs/idea-generator-2-capwise-calibrated-jury-evolution-board-macos-gpui-bilingual-screen-studio-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r19-idea-generator-capwise.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r202File),'utf8');
      assert.ok(txt.includes('1,580.00')&&txt.includes('3,800.00')&&txt.includes('5,380.00')&&txt.includes('125.00')&&txt.includes('350.00')&&txt.includes('475.00')&&txt.includes('4,905.00')&&txt.includes('91.17%')&&txt.includes('not_measured'),r202File+': contains exact 11-14 R19 idea-generator-2+capwise closed-form parameters');
    }
    // 2026-11-14 Daytime Round 20 (R203: howznguyen/shorts-kit + s1dashu/quiet-md) verification
    const r203PathA=1760.00+38.0*95.00;
    assert.equal(r203PathA.toFixed(2),'5370.00','11-14 R20 Path A total');
    const r203PathC=120.00+3.5*95.00;
    assert.equal(r203PathC.toFixed(2),'452.50','11-14 R20 Path C total');
    assert.equal((r203PathA-r203PathC).toFixed(2),'4917.50','11-14 R20 savings vs Path A');
    assert.equal(((r203PathA-r203PathC)/r203PathA*100).toFixed(2),'91.57','11-14 R20 pct savings vs Path A');
    for(const r203File of ['workshops/github-trending-radar/docs/shorts-kit-quiet-md-fact-gated-160shot-remotion-agent-kit-5ms-rust-gpui-feishu-docxxml-editor-selection-faq.md','workshops/github-trending-radar/docs/shorts-kit-quiet-md-fact-gated-160shot-remotion-agent-kit-5ms-rust-gpui-feishu-docxxml-editor-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r20-shorts-kit-quiet-md.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r203File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,610.00')&&txt.includes('5,370.00')&&txt.includes('120.00')&&txt.includes('332.50')&&txt.includes('452.50')&&txt.includes('4,917.50')&&txt.includes('91.57%')&&txt.includes('not_measured'),r203File+': contains exact 11-14 R20 shorts-kit+quiet-md closed-form parameters');
    }
    // 2026-11-14 Daytime Round 21 (R204: serveroshq/panel + opencoredev/islandcn) verification
    const r204PathA=1820.00+38.0*100.00;
    assert.equal(r204PathA.toFixed(2),'5620.00','11-14 R21 Path A total');
    const r204PathC=135.00+3.5*100.00;
    assert.equal(r204PathC.toFixed(2),'485.00','11-14 R21 Path C total');
    assert.equal((r204PathA-r204PathC).toFixed(2),'5135.00','11-14 R21 savings vs Path A');
    assert.equal(((r204PathA-r204PathC)/r204PathA*100).toFixed(2),'91.37','11-14 R21 pct savings vs Path A');
    for(const r204File of ['workshops/github-trending-radar/docs/serveros-panel-islandcn-selfhosted-multiserver-mcp-control-plane-4state-react-dynamic-island-selection-faq.md','workshops/github-trending-radar/docs/serveros-panel-islandcn-selfhosted-multiserver-mcp-control-plane-4state-react-dynamic-island-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r21-serveros-panel-islandcn.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r204File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,800.00')&&txt.includes('5,620.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,135.00')&&txt.includes('91.37%')&&txt.includes('not_measured'),r204File+': contains exact 11-14 R21 serveros-panel+islandcn closed-form parameters');
    }
    // 2026-11-14 Daytime Round 22 (R205: egoist/tinytraffic + Ciao1019/ArcMD) verification
    const r205PathA=1420.00+36.0*95.00;
    assert.equal(r205PathA.toFixed(2),'4840.00','11-14 R22 Path A total');
    const r205PathC=90.00+3.5*95.00;
    assert.equal(r205PathC.toFixed(2),'422.50','11-14 R22 Path C total');
    assert.equal((r205PathA-r205PathC).toFixed(2),'4417.50','11-14 R22 savings vs Path A');
    assert.equal(((r205PathA-r205PathC)/r205PathA*100).toFixed(2),'91.27','11-14 R22 pct savings vs Path A');
    for(const r205File of ['workshops/github-trending-radar/docs/tinytraffic-arcmd-single-binary-duckdb-web-analytics-pure-go-mygo-native-gpu-markdown-editor-selection-faq.md','workshops/github-trending-radar/docs/tinytraffic-arcmd-single-binary-duckdb-web-analytics-pure-go-mygo-native-gpu-markdown-editor-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r22-tinytraffic-arcmd.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r205File),'utf8');
      assert.ok(txt.includes('1,420.00')&&txt.includes('3,420.00')&&txt.includes('4,840.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('4,417.50')&&txt.includes('91.27%')&&txt.includes('not_measured'),r205File+': contains exact 11-14 R22 tinytraffic+arcmd closed-form parameters');
    }
    // 2026-11-14 Daytime Round 23 (R206: nickvasilescu/grokbot-clone + linknimiball1974/ai-texture-forge) verification
    const r206PathA=1790.00+38.0*100.00;
    assert.equal(r206PathA.toFixed(2),'5590.00','11-14 R23 Path A total');
    const r206PathC=140.00+3.5*100.00;
    assert.equal(r206PathC.toFixed(2),'490.00','11-14 R23 Path C total');
    assert.equal((r206PathA-r206PathC).toFixed(2),'5100.00','11-14 R23 savings vs Path A');
    assert.equal(((r206PathA-r206PathC)/r206PathA*100).toFixed(2),'91.23','11-14 R23 pct savings vs Path A');
    for(const r206File of ['workshops/github-trending-radar/docs/grokbot-clone-ai-texture-forge-4desktop-orgo-composio-grok-team-blender-seamless-pbr-projection-selection-faq.md','workshops/github-trending-radar/docs/grokbot-clone-ai-texture-forge-4desktop-orgo-composio-grok-team-blender-seamless-pbr-projection-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r23-grokbot-clone-texture-forge.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r206File),'utf8');
      assert.ok(txt.includes('1,790.00')&&txt.includes('3,800.00')&&txt.includes('5,590.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('5,100.00')&&txt.includes('91.23%')&&txt.includes('not_measured'),r206File+': contains exact 11-14 R23 grokbot-clone+ai-texture-forge closed-form parameters');
    }
    // 2026-11-14 Daytime Round 24 (R207: anefzaoui/misterdownloadmanager + paipiange/nvzhuang) verification
    const r207PathA=1520.00+36.0*95.00;
    assert.equal(r207PathA.toFixed(2),'4940.00','11-14 R24 Path A total');
    const r207PathC=115.00+3.5*95.00;
    assert.equal(r207PathC.toFixed(2),'447.50','11-14 R24 Path C total');
    assert.equal((r207PathA-r207PathC).toFixed(2),'4492.50','11-14 R24 savings vs Path A');
    assert.equal(((r207PathA-r207PathC)/r207PathA*100).toFixed(2),'90.94','11-14 R24 pct savings vs Path A');
    for(const r207File of ['workshops/github-trending-radar/docs/misterdownloadmanager-nvzhuang-5x-faster-rust-download-manager-2727-ai-garment-tryon-corpus-selection-faq.md','workshops/github-trending-radar/docs/misterdownloadmanager-nvzhuang-5x-faster-rust-download-manager-2727-ai-garment-tryon-corpus-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r24-misterdownloadmanager-nvzhuang.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r207File),'utf8');
      assert.ok(txt.includes('1,520.00')&&txt.includes('3,420.00')&&txt.includes('4,940.00')&&txt.includes('115.00')&&txt.includes('332.50')&&txt.includes('447.50')&&txt.includes('4,492.50')&&txt.includes('90.94%')&&txt.includes('not_measured'),r207File+': contains exact 11-14 R24 misterdownloadmanager+nvzhuang closed-form parameters');
    }
    // 2026-11-14 Daytime Round 25 (R208: yetone/rewind-for-x + Xin-YuXiao/Awesome-AI-for-Astronomy) verification
    const r208PathA=1360.00+36.0*95.00;
    assert.equal(r208PathA.toFixed(2),'4780.00','11-14 R25 Path A total');
    const r208PathC=85.00+3.5*95.00;
    assert.equal(r208PathC.toFixed(2),'417.50','11-14 R25 Path C total');
    assert.equal((r208PathA-r208PathC).toFixed(2),'4362.50','11-14 R25 savings vs Path A');
    assert.equal(((r208PathA-r208PathC)/r208PathA*100).toFixed(2),'91.27','11-14 R25 pct savings vs Path A');
    for(const r208File of ['workshops/github-trending-radar/docs/rewind-for-x-awesome-ai-astronomy-local-ocr-x-timeline-rewind-421paper-astroai-skill-selection-faq.md','workshops/github-trending-radar/docs/rewind-for-x-awesome-ai-astronomy-local-ocr-x-timeline-rewind-421paper-astroai-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r25-rewind-for-x-astro-ai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r208File),'utf8');
      assert.ok(txt.includes('1,360.00')&&txt.includes('3,420.00')&&txt.includes('4,780.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,362.50')&&txt.includes('91.27%')&&txt.includes('not_measured'),r208File+': contains exact 11-14 R25 rewind-for-x+Awesome-AI-for-Astronomy closed-form parameters');
    }
    // 2026-11-14 Daytime Round 26 (R209: GiroCrab/GiroCrab + DevedevT/FFmpeg-GUI-Editor-Windows) verification
    const r209PathA=1440.00+36.0*95.00;
    assert.equal(r209PathA.toFixed(2),'4860.00','11-14 R26 Path A total');
    const r209PathC=95.00+3.5*95.00;
    assert.equal(r209PathC.toFixed(2),'427.50','11-14 R26 Path C total');
    assert.equal((r209PathA-r209PathC).toFixed(2),'4432.50','11-14 R26 savings vs Path A');
    assert.equal(((r209PathA-r209PathC)/r209PathA*100).toFixed(2),'91.20','11-14 R26 pct savings vs Path A');
    for(const r209File of ['workshops/github-trending-radar/docs/girocrab-ffmpeg-gui-editor-windows-rust-swiftui-sqlcipher-fints-vault-portable-lossless-video-trimmer-selection-faq.md','workshops/github-trending-radar/docs/girocrab-ffmpeg-gui-editor-windows-rust-swiftui-sqlcipher-fints-vault-portable-lossless-video-trimmer-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r26-girocrab-ffmpeg-gui.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r209File),'utf8');
      assert.ok(txt.includes('1,440.00')&&txt.includes('3,420.00')&&txt.includes('4,860.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,432.50')&&txt.includes('91.20%')&&txt.includes('not_measured'),r209File+': contains exact 11-14 R26 GiroCrab+FFmpeg-GUI-Editor closed-form parameters');
    }
    // 2026-11-14 Daytime Round 27 (R210: faizfahmi77/ScanDot + precygtrucqui1981/blender-ai-copilot-lab) verification
    const r210PathA=1710.00+38.0*100.00;
    assert.equal(r210PathA.toFixed(2),'5510.00','11-14 R27 Path A total');
    const r210PathC=135.00+3.5*100.00;
    assert.equal(r210PathC.toFixed(2),'485.00','11-14 R27 Path C total');
    assert.equal((r210PathA-r210PathC).toFixed(2),'5025.00','11-14 R27 savings vs Path A');
    assert.equal(((r210PathA-r210PathC)/r210PathA*100).toFixed(2),'91.20','11-14 R27 pct savings vs Path A');
    for(const r210File of ['workshops/github-trending-radar/docs/scandot-blender-ai-copilot-lab-arcore-colmap-3d-scanner-supervised-manager-worker-reviewer-blender-mcp-selection-faq.md','workshops/github-trending-radar/docs/scandot-blender-ai-copilot-lab-arcore-colmap-3d-scanner-supervised-manager-worker-reviewer-blender-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r27-scandot-blender-copilot-lab.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r210File),'utf8');
      assert.ok(txt.includes('1,710.00')&&txt.includes('3,800.00')&&txt.includes('5,510.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,025.00')&&txt.includes('91.20%')&&txt.includes('not_measured'),r210File+': contains exact 11-14 R27 ScanDot+blender-ai-copilot-lab closed-form parameters');
    }
    // 2026-11-14 Daytime Round 28 (R211: anhao/ai-pose-gallery-zh + realcodebear/saltline-fable-5.2) verification
    const r211PathA=1950.00+38.0*100.00;
    assert.equal(r211PathA.toFixed(2),'5750.00','11-14 R28 Path A total');
    const r211PathC=145.00+3.5*100.00;
    assert.equal(r211PathC.toFixed(2),'495.00','11-14 R28 Path C total');
    assert.equal((r211PathA-r211PathC).toFixed(2),'5255.00','11-14 R28 savings vs Path A');
    assert.equal(((r211PathA-r211PathC)/r211PathA*100).toFixed(2),'91.39','11-14 R28 pct savings vs Path A');
    for(const r211File of ['workshops/github-trending-radar/docs/ai-pose-gallery-zh-saltline-fable-5-2-12022image-comfyui-character-studio-8hr-1prompt-3d-fps-selection-faq.md','workshops/github-trending-radar/docs/ai-pose-gallery-zh-saltline-fable-5-2-12022image-comfyui-character-studio-8hr-1prompt-3d-fps-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r28-pose-gallery-saltline.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r211File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('3,800.00')&&txt.includes('5,750.00')&&txt.includes('145.00')&&txt.includes('350.00')&&txt.includes('495.00')&&txt.includes('5,255.00')&&txt.includes('91.39%')&&txt.includes('not_measured'),r211File+': contains exact 11-14 R28 ai-pose-gallery-zh+saltline-fable-5.2 closed-form parameters');
    }
    // 2026-11-14 Daytime Round 29 (R212: HolyArrs/HolyArrs + TomyJan/SnowLuma) verification
    const r212PathA=1480.00+36.0*95.00;
    assert.equal(r212PathA.toFixed(2),'4900.00','11-14 R29 Path A total');
    const r212PathC=95.00+3.5*95.00;
    assert.equal(r212PathC.toFixed(2),'427.50','11-14 R29 Path C total');
    assert.equal((r212PathA-r212PathC).toFixed(2),'4472.50','11-14 R29 savings vs Path A');
    assert.equal(((r212PathA-r212PathC)/r212PathA*100).toFixed(2),'91.28','11-14 R29 pct savings vs Path A');
    for(const r212File of ['workshops/github-trending-radar/docs/holyarrs-snowluma-single-container-16mb-arr-media-stack-qq-onebot11-mcp-runtime-selection-faq.md','workshops/github-trending-radar/docs/holyarrs-snowluma-single-container-16mb-arr-media-stack-qq-onebot11-mcp-runtime-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r29-holyarrs-snowluma.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r212File),'utf8');
      assert.ok(txt.includes('1,480.00')&&txt.includes('3,420.00')&&txt.includes('4,900.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,472.50')&&txt.includes('91.28%')&&txt.includes('not_measured'),r212File+': contains exact 11-14 R29 HolyArrs+SnowLuma closed-form parameters');
    }
    // 2026-11-14 Daytime Round 30 (R213: bea4dev/shoji-bar-4 + bvvst/intern) verification
    const r213PathA=1560.00+36.0*95.00;
    assert.equal(r213PathA.toFixed(2),'4980.00','11-14 R30 Path A total');
    const r213PathC=90.00+3.5*95.00;
    assert.equal(r213PathC.toFixed(2),'422.50','11-14 R30 Path C total');
    assert.equal((r213PathA-r213PathC).toFixed(2),'4557.50','11-14 R30 savings vs Path A');
    assert.equal(((r213PathA-r213PathC)/r213PathA*100).toFixed(2),'91.52','11-14 R30 pct savings vs Path A');
    for(const r213File of ['workshops/github-trending-radar/docs/shoji-bar-4-intern-zero-idle-cpu-rust-wayland-shell-optical-size-variable-rounded-inter-font-selection-faq.md','workshops/github-trending-radar/docs/shoji-bar-4-intern-zero-idle-cpu-rust-wayland-shell-optical-size-variable-rounded-inter-font-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r30-shoji-bar-4-intern.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r213File),'utf8');
      assert.ok(txt.includes('1,560.00')&&txt.includes('3,420.00')&&txt.includes('4,980.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('4,557.50')&&txt.includes('91.52%')&&txt.includes('not_measured'),r213File+': contains exact 11-14 R30 shoji-bar-4+intern closed-form parameters');
    }
    // 2026-11-14 Daytime Round 31 (R214: DandanLLab/SnowCatQQ + claudememory/claude-memory) verification
    const r214PathA=1820.00+38.0*100.00;
    assert.equal(r214PathA.toFixed(2),'5620.00','11-14 R31 Path A total');
    const r214PathC=135.00+3.5*100.00;
    assert.equal(r214PathC.toFixed(2),'485.00','11-14 R31 Path C total');
    assert.equal((r214PathA-r214PathC).toFixed(2),'5135.00','11-14 R31 savings vs Path A');
    assert.equal(((r214PathA-r214PathC)/r214PathA*100).toFixed(2),'91.37','11-14 R31 pct savings vs Path A');
    for(const r214File of ['workshops/github-trending-radar/docs/snowcatqq-claude-memory-v8-onebot12-milky-mcp-qq-client-10way-persistent-memory-architecture-selection-faq.md','workshops/github-trending-radar/docs/snowcatqq-claude-memory-v8-onebot12-milky-mcp-qq-client-10way-persistent-memory-architecture-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r31-snowcatqq-claude-memory.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r214File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,800.00')&&txt.includes('5,620.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,135.00')&&txt.includes('91.37%')&&txt.includes('not_measured'),r214File+': contains exact 11-14 R31 SnowCatQQ+claude-memory closed-form parameters');
    }
    // 2026-11-14 Daytime Round 32 (R215: rauchg/vinyl + zhangkunlv-ship-it/xuehui-shortvideo-skill) verification
    const r215PathA=1590.00+36.0*95.00;
    assert.equal(r215PathA.toFixed(2),'5010.00','11-14 R32 Path A total');
    const r215PathC=105.00+3.5*95.00;
    assert.equal(r215PathC.toFixed(2),'437.50','11-14 R32 Path C total');
    assert.equal((r215PathA-r215PathC).toFixed(2),'4572.50','11-14 R32 savings vs Path A');
    assert.equal(((r215PathA-r215PathC)/r215PathA*100).toFixed(2),'91.27','11-14 R32 pct savings vs Path A');
    for(const r215File of ['workshops/github-trending-radar/docs/vinyl-xuehui-shortvideo-skill-zero-dep-hertzian-audioworklet-turntable-318hr-distilled-agent-skill-selection-faq.md','workshops/github-trending-radar/docs/vinyl-xuehui-shortvideo-skill-zero-dep-hertzian-audioworklet-turntable-318hr-distilled-agent-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r32-vinyl-xuehui-skill.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r215File),'utf8');
      assert.ok(txt.includes('1,590.00')&&txt.includes('3,420.00')&&txt.includes('5,010.00')&&txt.includes('105.00')&&txt.includes('332.50')&&txt.includes('437.50')&&txt.includes('4,572.50')&&txt.includes('91.27%')&&txt.includes('not_measured'),r215File+': contains exact 11-14 R32 vinyl+xuehui-shortvideo-skill closed-form parameters');
    }
    // 2026-11-14 Daytime Round 33 (R216: magnuslab-sudo/Orwell + gabrielbuzziv/emissor-nfse-nacional) verification
    const r216PathA=1640.00+36.0*95.00;
    assert.equal(r216PathA.toFixed(2),'5060.00','11-14 R33 Path A total');
    const r216PathC=85.00+3.5*95.00;
    assert.equal(r216PathC.toFixed(2),'417.50','11-14 R33 Path C total');
    assert.equal((r216PathA-r216PathC).toFixed(2),'4642.50','11-14 R33 savings vs Path A');
    assert.equal(((r216PathA-r216PathC)/r216PathA*100).toFixed(2),'91.75','11-14 R33 pct savings vs Path A');
    for(const r216File of ['workshops/github-trending-radar/docs/orwell-emissor-nfse-nacional-zero-metadata-e2ee-community-webrtc-cloudflare-idempotent-tax-issuer-selection-faq.md','workshops/github-trending-radar/docs/orwell-emissor-nfse-nacional-zero-metadata-e2ee-community-webrtc-cloudflare-idempotent-tax-issuer-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r33-orwell-nfse.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r216File),'utf8');
      assert.ok(txt.includes('1,640.00')&&txt.includes('3,420.00')&&txt.includes('5,060.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,642.50')&&txt.includes('91.75%')&&txt.includes('not_measured'),r216File+': contains exact 11-14 R33 Orwell+emissor-nfse-nacional closed-form parameters');
    }
    // 2026-11-14 Daytime Round 34 (R217: tommy0103/blackhole + shi3z/mightyCode) verification
    const r217PathA=1880.00+38.0*100.00;
    assert.equal(r217PathA.toFixed(2),'5680.00','11-14 R34 Path A total');
    const r217PathC=140.00+3.5*100.00;
    assert.equal(r217PathC.toFixed(2),'490.00','11-14 R34 Path C total');
    assert.equal((r217PathA-r217PathC).toFixed(2),'5190.00','11-14 R34 savings vs Path A');
    assert.equal(((r217PathA-r217PathC)/r217PathA*100).toFixed(2),'91.37','11-14 R34 pct savings vs Path A');
    for(const r217File of ['workshops/github-trending-radar/docs/blackhole-mightycode-colima-failclose-claude-code-sandbox-local-mlx-4bit-anthropic-proxy-guard-selection-faq.md','workshops/github-trending-radar/docs/blackhole-mightycode-colima-failclose-claude-code-sandbox-local-mlx-4bit-anthropic-proxy-guard-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r34-blackhole-mightycode.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r217File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,800.00')&&txt.includes('5,680.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('5,190.00')&&txt.includes('91.37%')&&txt.includes('not_measured'),r217File+': contains exact 11-14 R34 blackhole+mightyCode closed-form parameters');
    }
    // 2026-11-14 Daytime Round 35 (R218: ChetasLua/crimson-loong + av/safe-sand) verification
    const r218PathA=1540.00+36.0*95.00;
    assert.equal(r218PathA.toFixed(2),'4960.00','11-14 R35 Path A total');
    const r218PathC=75.00+3.5*95.00;
    assert.equal(r218PathC.toFixed(2),'407.50','11-14 R35 Path C total');
    assert.equal((r218PathA-r218PathC).toFixed(2),'4552.50','11-14 R35 savings vs Path A');
    assert.equal(((r218PathA-r218PathC)/r218PathA*100).toFixed(2),'91.78','11-14 R35 pct savings vs Path A');
    for(const r218File of ['workshops/github-trending-radar/docs/crimson-loong-safe-sand-zero-asset-single-html-threejs-film-460k-grain-webgl2-sand-physics-selection-faq.md','workshops/github-trending-radar/docs/crimson-loong-safe-sand-zero-asset-single-html-threejs-film-460k-grain-webgl2-sand-physics-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r35-crimson-loong-safe-sand.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r218File),'utf8');
      assert.ok(txt.includes('1,540.00')&&txt.includes('3,420.00')&&txt.includes('4,960.00')&&txt.includes('75.00')&&txt.includes('332.50')&&txt.includes('407.50')&&txt.includes('4,552.50')&&txt.includes('91.78%')&&txt.includes('not_measured'),r218File+': contains exact 11-14 R35 crimson-loong+safe-sand closed-form parameters');
    }
    // 2026-11-14 Daytime Round 36 (R219: MiaAI-Lab/Claude-Fable-5.2-HTML-Files + omacom/folio) verification
    const r219PathA=1460.00+36.0*95.00;
    assert.equal(r219PathA.toFixed(2),'4880.00','11-14 R36 Path A total');
    const r219PathC=85.00+3.5*95.00;
    assert.equal(r219PathC.toFixed(2),'417.50','11-14 R36 Path C total');
    assert.equal((r219PathA-r219PathC).toFixed(2),'4462.50','11-14 R36 savings vs Path A');
    assert.equal(((r219PathA-r219PathC)/r219PathA*100).toFixed(2),'91.44','11-14 R36 pct savings vs Path A');
    for(const r219File of ['workshops/github-trending-radar/docs/claude-fable-5-2-html-files-omacom-folio-76study-sha256-playwright-gallery-zero-crawl-qtquick-tailnet-filemanager-selection-faq.md','workshops/github-trending-radar/docs/claude-fable-5-2-html-files-omacom-folio-76study-sha256-playwright-gallery-zero-crawl-qtquick-tailnet-filemanager-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r36-fable52-html-folio.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r219File),'utf8');
      assert.ok(txt.includes('1,460.00')&&txt.includes('3,420.00')&&txt.includes('4,880.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,462.50')&&txt.includes('91.44%')&&txt.includes('not_measured'),r219File+': contains exact 11-14 R36 Claude-Fable-5.2-HTML-Files+omacom/folio closed-form parameters');
    }
    // 2026-11-14 Daytime Round 37 (R220: sunososobro-hub/tinglongwu + lihailong00/tomorrow-ai) verification
    const r220PathA=1680.00+36.0*95.00;
    assert.equal(r220PathA.toFixed(2),'5100.00','11-14 R37 Path A total');
    const r220PathC=110.00+3.5*95.00;
    assert.equal(r220PathC.toFixed(2),'442.50','11-14 R37 Path C total');
    assert.equal((r220PathA-r220PathC).toFixed(2),'4657.50','11-14 R37 savings vs Path A');
    assert.equal(((r220PathA-r220PathC)/r220PathA*100).toFixed(2),'91.32','11-14 R37 pct savings vs Path A');
    for(const r220File of ['workshops/github-trending-radar/docs/tinglongwu-tomorrow-ai-offline-5lang-meeting-speech-translator-rust-axum-pi-selfhosted-ai-companion-selection-faq.md','workshops/github-trending-radar/docs/tinglongwu-tomorrow-ai-offline-5lang-meeting-speech-translator-rust-axum-pi-selfhosted-ai-companion-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r37-tinglongwu-tomorrow-ai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r220File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,420.00')&&txt.includes('5,100.00')&&txt.includes('110.00')&&txt.includes('332.50')&&txt.includes('442.50')&&txt.includes('4,657.50')&&txt.includes('91.32%')&&txt.includes('not_measured'),r220File+': contains exact 11-14 R37 tinglongwu+tomorrow-ai closed-form parameters');
    }
    // 2026-11-14 Daytime Round 38 (R221: croma-labs/paradero + mrjoechen/luci-theme-carbon) verification
    const r221PathA=1490.00+36.0*95.00;
    assert.equal(r221PathA.toFixed(2),'4910.00','11-14 R38 Path A total');
    const r221PathC=80.00+3.5*95.00;
    assert.equal(r221PathC.toFixed(2),'412.50','11-14 R38 Path C total');
    assert.equal((r221PathA-r221PathC).toFixed(2),'4497.50','11-14 R38 savings vs Path A');
    assert.equal(((r221PathA-r221PathC)/r221PathA*100).toFixed(2),'91.60','11-14 R38 pct savings vs Path A');
    for(const r221File of ['workshops/github-trending-radar/docs/paradero-luci-theme-carbon-wcag22-civic-transit-telemetry-mac-merged-9200oui-openwrt-dashboard-selection-faq.md','workshops/github-trending-radar/docs/paradero-luci-theme-carbon-wcag22-civic-transit-telemetry-mac-merged-9200oui-openwrt-dashboard-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r38-paradero-luci-carbon.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r221File),'utf8');
      assert.ok(txt.includes('1,490.00')&&txt.includes('3,420.00')&&txt.includes('4,910.00')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,497.50')&&txt.includes('91.60%')&&txt.includes('not_measured'),r221File+': contains exact 11-14 R38 paradero+luci-theme-carbon closed-form parameters');
    }
    // 2026-11-14 Daytime Round 39 (R222: oil-oil/agy-fast-io + NorthGateChat/dsh-think-game) verification
    const r222PathA=1740.00+38.0*100.00;
    assert.equal(r222PathA.toFixed(2),'5540.00','11-14 R39 Path A total');
    const r222PathC=130.00+3.5*100.00;
    assert.equal(r222PathC.toFixed(2),'480.00','11-14 R39 Path C total');
    assert.equal((r222PathA-r222PathC).toFixed(2),'5060.00','11-14 R39 savings vs Path A');
    assert.equal(((r222PathA-r222PathC)/r222PathA*100).toFixed(2),'91.34','11-14 R39 pct savings vs Path A');
    for(const r222File of ['workshops/github-trending-radar/docs/agy-fast-io-dsh-think-game-50pct-fewer-agent-turns-allowlist-io-rules-inline-reasoning-arcade-selection-faq.md','workshops/github-trending-radar/docs/agy-fast-io-dsh-think-game-50pct-fewer-agent-turns-allowlist-io-rules-inline-reasoning-arcade-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r39-agy-fast-io-dsh-think-game.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r222File),'utf8');
      assert.ok(txt.includes('1,740.00')&&txt.includes('3,800.00')&&txt.includes('5,540.00')&&txt.includes('130.00')&&txt.includes('350.00')&&txt.includes('480.00')&&txt.includes('5,060.00')&&txt.includes('91.34%')&&txt.includes('not_measured'),r222File+': contains exact 11-14 R39 agy-fast-io+dsh-think-game closed-form parameters');
    }
    // 2026-11-14 Daytime Round 40 (R223: DeskLabs-OpenSource/DeskVoice + MatiSolina/busy) verification
    const r223PathA=1920.00+38.0*100.00;
    assert.equal(r223PathA.toFixed(2),'5720.00','11-14 R40 Path A total');
    const r223PathC=145.00+3.5*100.00;
    assert.equal(r223PathC.toFixed(2),'495.00','11-14 R40 Path C total');
    assert.equal((r223PathA-r223PathC).toFixed(2),'5225.00','11-14 R40 savings vs Path A');
    assert.equal(((r223PathA-r223PathC)/r223PathA*100).toFixed(2),'91.35','11-14 R40 pct savings vs Path A');
    for(const r223File of ['workshops/github-trending-radar/docs/deskvoice-busy-selfhosted-sip-realtime-agent-pbx-per-bot-linux-sandbox-drive-platform-selection-faq.md','workshops/github-trending-radar/docs/deskvoice-busy-selfhosted-sip-realtime-agent-pbx-per-bot-linux-sandbox-drive-platform-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r40-deskvoice-busy.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r223File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,800.00')&&txt.includes('5,720.00')&&txt.includes('145.00')&&txt.includes('350.00')&&txt.includes('495.00')&&txt.includes('5,225.00')&&txt.includes('91.35%')&&txt.includes('not_measured'),r223File+': contains exact 11-14 R40 DeskVoice+busy closed-form parameters');
    }
    // 2026-11-14 Daytime Round 41 (R224: CapriChooms/CapriCore + herrbimmer/IDEmu) verification
    const r224PathA=1860.00+38.0*100.00;
    assert.equal(r224PathA.toFixed(2),'5660.00','11-14 R41 Path A total');
    const r224PathC=135.00+3.5*100.00;
    assert.equal(r224PathC.toFixed(2),'485.00','11-14 R41 Path C total');
    assert.equal((r224PathA-r224PathC).toFixed(2),'5175.00','11-14 R41 savings vs Path A');
    assert.equal(((r224PathA-r224PathC)/r224PathA*100).toFixed(2),'91.43','11-14 R41 pct savings vs Path A');
    for(const r224File of ['workshops/github-trending-radar/docs/capricore-idemu-openclaw-windows-desktop-companion-qemu-idrive-qnx-linux-emulator-selection-faq.md','workshops/github-trending-radar/docs/capricore-idemu-openclaw-windows-desktop-companion-qemu-idrive-qnx-linux-emulator-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r41-capricore-idemu.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r224File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,800.00')&&txt.includes('5,660.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,175.00')&&txt.includes('91.43%')&&txt.includes('not_measured'),r224File+': contains exact 11-14 R41 CapriCore+IDEmu closed-form parameters');
    }
    // 2026-11-14 Daytime Round 42 (R225: RapidSailorFreeze/studsmith + rippelz/rustudio) verification
    const r225PathA=1520.00+36.0*95.00;
    assert.equal(r225PathA.toFixed(2),'4940.00','11-14 R42 Path A total');
    const r225PathC=95.00+3.5*95.00;
    assert.equal(r225PathC.toFixed(2),'427.50','11-14 R42 Path C total');
    assert.equal((r225PathA-r225PathC).toFixed(2),'4512.50','11-14 R42 savings vs Path A');
    assert.equal(((r225PathA-r225PathC)/r225PathA*100).toFixed(2),'91.35','11-14 R42 pct savings vs Path A');
    for(const r225File of ['workshops/github-trending-radar/docs/studsmith-rustudio-luau-playtest-loop-agent-native-rust-wgpu-rapier3d-roblox-studio-selection-faq.md','workshops/github-trending-radar/docs/studsmith-rustudio-luau-playtest-loop-agent-native-rust-wgpu-rapier3d-roblox-studio-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r42-studsmith-rustudio.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r225File),'utf8');
      assert.ok(txt.includes('1,520.00')&&txt.includes('3,420.00')&&txt.includes('4,940.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,512.50')&&txt.includes('91.35%')&&txt.includes('not_measured'),r225File+': contains exact 11-14 R42 studsmith+rustudio closed-form parameters');
    }
    // 2026-11-14 Daytime Round 43 (R226: Avalanchevonproxy69/fanatic-laptop-control + GitMag/AnyAuto) verification
    const r226PathA=1450.00+36.0*95.00;
    assert.equal(r226PathA.toFixed(2),'4870.00','11-14 R43 Path A total');
    const r226PathC=75.00+3.5*95.00;
    assert.equal(r226PathC.toFixed(2),'407.50','11-14 R43 Path C total');
    assert.equal((r226PathA-r226PathC).toFixed(2),'4462.50','11-14 R43 savings vs Path A');
    assert.equal(((r226PathA-r226PathC)/r226PathA*100).toFixed(2),'91.63','11-14 R43 pct savings vs Path A');
    for(const r226File of ['workshops/github-trending-radar/docs/fanatic-laptop-control-anyauto-5mb-8oem-ec-wmi-controller-shizuku-android-auto-virtualdisplay-selection-faq.md','workshops/github-trending-radar/docs/fanatic-laptop-control-anyauto-5mb-8oem-ec-wmi-controller-shizuku-android-auto-virtualdisplay-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r43-fanatic-anyauto.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r226File),'utf8');
      assert.ok(txt.includes('1,450.00')&&txt.includes('3,420.00')&&txt.includes('4,870.00')&&txt.includes('75.00')&&txt.includes('332.50')&&txt.includes('407.50')&&txt.includes('4,462.50')&&txt.includes('91.63%')&&txt.includes('not_measured'),r226File+': contains exact 11-14 R43 fanatic-laptop-control+AnyAuto closed-form parameters');
    }
    // 2026-11-14 Daytime Round 44 (R227: erenariel/konaklamaflow + bohuis686-creator/AstralCodex) verification
    const r227PathA=1420.00+36.0*95.00;
    assert.equal(r227PathA.toFixed(2),'4840.00','11-14 R44 Path A total');
    const r227PathC=75.00+3.5*95.00;
    assert.equal(r227PathC.toFixed(2),'407.50','11-14 R44 Path C total');
    assert.equal((r227PathA-r227PathC).toFixed(2),'4432.50','11-14 R44 savings vs Path A');
    assert.equal(((r227PathA-r227PathC)/r227PathA*100).toFixed(2),'91.58','11-14 R44 pct savings vs Path A');
    for(const r227File of ['workshops/github-trending-radar/docs/konaklamaflow-astralcodex-canonical-projection-reviewer-wpf-msix-window-handoff-launcher-selection-faq.md','workshops/github-trending-radar/docs/konaklamaflow-astralcodex-canonical-projection-reviewer-wpf-msix-window-handoff-launcher-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r44-konaklamaflow-astralcodex.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r227File),'utf8');
      assert.ok(txt.includes('1,420.00')&&txt.includes('3,420.00')&&txt.includes('4,840.00')&&txt.includes('75.00')&&txt.includes('332.50')&&txt.includes('407.50')&&txt.includes('4,432.50')&&txt.includes('91.58%')&&txt.includes('not_measured'),r227File+': contains exact 11-14 R44 konaklamaflow+AstralCodex closed-form parameters');
    }
    // 2026-11-14 Daytime Round 45 (R228: mit-han-lab/pear + TokenRhythm/InfraRSI) verification
    const r228PathA=2150.00+38.0*100.00;
    assert.equal(r228PathA.toFixed(2),'5950.00','11-14 R45 Path A total');
    const r228PathC=165.00+3.5*100.00;
    assert.equal(r228PathC.toFixed(2),'515.00','11-14 R45 Path C total');
    assert.equal((r228PathA-r228PathC).toFixed(2),'5435.00','11-14 R45 savings vs Path A');
    assert.equal(((r228PathA-r228PathC)/r228PathA*100).toFixed(2),'91.34','11-14 R45 pct savings vs Path A');
    for(const r228File of ['workshops/github-trending-radar/docs/mit-han-lab-pear-infrarsi-zero-demo-sim-robotic-rl-183x-mfu-recursive-training-infra-selection-faq.md','workshops/github-trending-radar/docs/mit-han-lab-pear-infrarsi-zero-demo-sim-robotic-rl-183x-mfu-recursive-training-infra-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r45-pear-infrarsi.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r228File),'utf8');
      assert.ok(txt.includes('2,150.00')&&txt.includes('3,800.00')&&txt.includes('5,950.00')&&txt.includes('165.00')&&txt.includes('350.00')&&txt.includes('515.00')&&txt.includes('5,435.00')&&txt.includes('91.34%')&&txt.includes('not_measured'),r228File+': contains exact 11-14 R45 mit-han-lab/pear+InfraRSI closed-form parameters');
    }
    // 2026-11-14 Daytime Round 46 (R229: Veloresearch/kinetic + nicobailon/pi-better) verification
    const r229PathA=1840.00+38.0*100.00;
    assert.equal(r229PathA.toFixed(2),'5640.00','11-14 R46 Path A total');
    const r229PathC=135.00+3.5*100.00;
    assert.equal(r229PathC.toFixed(2),'485.00','11-14 R46 Path C total');
    assert.equal((r229PathA-r229PathC).toFixed(2),'5155.00','11-14 R46 savings vs Path A');
    assert.equal(((r229PathA-r229PathC)/r229PathA*100).toFixed(2),'91.40','11-14 R46 pct savings vs Path A');
    for(const r229File of ['workshops/github-trending-radar/docs/kinetic-pi-better-exact-multivendor-rust-gguf-engine-repo-grounded-depth-prompt-rewriter-selection-faq.md','workshops/github-trending-radar/docs/kinetic-pi-better-exact-multivendor-rust-gguf-engine-repo-grounded-depth-prompt-rewriter-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r46-kinetic-pi-better.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r229File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,800.00')&&txt.includes('5,640.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,155.00')&&txt.includes('91.40%')&&txt.includes('not_measured'),r229File+': contains exact 11-14 R46 kinetic+pi-better closed-form parameters');
    }
    // 2026-11-14 Daytime Round 47 (R230: Adolanium/hermes-whiteboard + Statecraft-Labs/isometric-cities) verification
    const r230PathA=1890.00+38.0*100.00;
    assert.equal(r230PathA.toFixed(2),'5690.00','11-14 R47 Path A total');
    const r230PathC=140.00+3.5*100.00;
    assert.equal(r230PathC.toFixed(2),'490.00','11-14 R47 Path C total');
    assert.equal((r230PathA-r230PathC).toFixed(2),'5200.00','11-14 R47 savings vs Path A');
    assert.equal(((r230PathA-r230PathC)/r230PathA*100).toFixed(2),'91.39','11-14 R47 pct savings vs Path A');
    for(const r230File of ['workshops/github-trending-radar/docs/hermes-whiteboard-isometric-cities-route-executing-agent-board-apple-silicon-isometric-city-builder-selection-faq.md','workshops/github-trending-radar/docs/hermes-whiteboard-isometric-cities-route-executing-agent-board-apple-silicon-isometric-city-builder-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r47-hermes-whiteboard-isometric-cities.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r230File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,800.00')&&txt.includes('5,690.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('5,200.00')&&txt.includes('91.39%')&&txt.includes('not_measured'),r230File+': contains exact 11-14 R47 hermes-whiteboard+isometric-cities closed-form parameters');
    }
    // 2026-11-14 Daytime Round 48 (R231: mileson/chaojifeng-video-content-creator + ZiChuanLan/freebie-radar) verification
    const r231PathA=1580.00+36.0*95.00;
    assert.equal(r231PathA.toFixed(2),'5000.00','11-14 R48 Path A total');
    const r231PathC=95.00+3.5*95.00;
    assert.equal(r231PathC.toFixed(2),'427.50','11-14 R48 Path C total');
    assert.equal((r231PathA-r231PathC).toFixed(2),'4572.50','11-14 R48 savings vs Path A');
    assert.equal(((r231PathA-r231PathC)/r231PathA*100).toFixed(2),'91.45','11-14 R48 pct savings vs Path A');
    for(const r231File of ['workshops/github-trending-radar/docs/chaojifeng-video-creator-freebie-radar-148gsap-video-skill-57source-ai-triage-radar-selection-faq.md','workshops/github-trending-radar/docs/chaojifeng-video-creator-freebie-radar-148gsap-video-skill-57source-ai-triage-radar-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r48-chaojifeng-freebie-radar.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r231File),'utf8');
      assert.ok(txt.includes('1,580.00')&&txt.includes('3,420.00')&&txt.includes('5,000.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,572.50')&&txt.includes('91.45%')&&txt.includes('not_measured'),r231File+': contains exact 11-14 R48 chaojifeng+freebie-radar closed-form parameters');
    }
    // 2026-11-14 Daytime Round 49 (R232: chopinregis/CreaBIM + nestho/impacket-rs) verification
    const r232PathA=1620.00+36.0*95.00;
    assert.equal(r232PathA.toFixed(2),'5040.00','11-14 R49 Path A total');
    const r232PathC=85.00+3.5*95.00;
    assert.equal(r232PathC.toFixed(2),'417.50','11-14 R49 Path C total');
    assert.equal((r232PathA-r232PathC).toFixed(2),'4622.50','11-14 R49 savings vs Path A');
    assert.equal(((r232PathA-r232PathC)/r232PathA*100).toFixed(2),'91.72','11-14 R49 pct savings vs Path A');
    for(const r232File of ['workshops/github-trending-radar/docs/creabim-impacket-rs-blender-style-rust-ifc4-bim-585m-roundtrip-74tool-ad-protocol-suite-selection-faq.md','workshops/github-trending-radar/docs/creabim-impacket-rs-blender-style-rust-ifc4-bim-585m-roundtrip-74tool-ad-protocol-suite-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r49-creabim-impacket-rs.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r232File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('3,420.00')&&txt.includes('5,040.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,622.50')&&txt.includes('91.72%')&&txt.includes('not_measured'),r232File+': contains exact 11-14 R49 CreaBIM+impacket-rs closed-form parameters');
    }
    // 2026-11-14 Daytime Round 50 (R233: professorsolderin/project-lighthouse + sirioberati/gradient-descent-for-a-face) verification
    const r233PathA=1850.00+38.0*100.00;
    assert.equal(r233PathA.toFixed(2),'5650.00','11-14 R50 Path A total');
    const r233PathC=135.00+3.5*100.00;
    assert.equal(r233PathC.toFixed(2),'485.00','11-14 R50 Path C total');
    assert.equal((r233PathA-r233PathC).toFixed(2),'5165.00','11-14 R50 savings vs Path A');
    assert.equal(((r233PathA-r233PathC)/r233PathA*100).toFixed(2),'91.42','11-14 R50 pct savings vs Path A');
    for(const r233File of ['workshops/github-trending-radar/docs/project-lighthouse-gradient-descent-face-12000page-adversarial-manuscript-ai-50400blob-differentiable-renderer-selection-faq.md','workshops/github-trending-radar/docs/project-lighthouse-gradient-descent-face-12000page-adversarial-manuscript-ai-50400blob-differentiable-renderer-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r50-lighthouse-gradient-face.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r233File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,800.00')&&txt.includes('5,650.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,165.00')&&txt.includes('91.42%')&&txt.includes('not_measured'),r233File+': contains exact 11-14 R50 project-lighthouse+gradient-descent-for-a-face closed-form parameters');
    }
    // 2026-11-14 Daytime Round 51 (R234: bjarneo/quire + doublesq97-ui/su-zine) verification
    const r234PathA=1480.00+36.0*95.00;
    assert.equal(r234PathA.toFixed(2),'4900.00','11-14 R51 Path A total');
    const r234PathC=85.00+3.5*95.00;
    assert.equal(r234PathC.toFixed(2),'417.50','11-14 R51 Path C total');
    assert.equal((r234PathA-r234PathC).toFixed(2),'4482.50','11-14 R51 savings vs Path A');
    assert.equal(((r234PathA-r234PathC)/r234PathA*100).toFixed(2),'91.48','11-14 R51 pct savings vs Path A');
    for(const r234File of ['workshops/github-trending-radar/docs/quire-su-zine-rust-rune-mcp-markdown-editor-source-verified-html-magazine-card-skill-selection-faq.md','workshops/github-trending-radar/docs/quire-su-zine-rust-rune-mcp-markdown-editor-source-verified-html-magazine-card-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r51-quire-su-zine.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r234File),'utf8');
      assert.ok(txt.includes('1,480.00')&&txt.includes('3,420.00')&&txt.includes('4,900.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,482.50')&&txt.includes('91.48%')&&txt.includes('not_measured'),r234File+': contains exact 11-14 R51 quire+su-zine closed-form parameters');
    }
    // 2026-11-14 Daytime Round 52 (R235: Kianuni/WQGuard + Flaim92/astra-ds) verification
    const r235PathA=1800.00+38.0*100.00;
    assert.equal(r235PathA.toFixed(2),'5600.00','11-14 R52 Path A total');
    const r235PathC=130.00+3.5*100.00;
    assert.equal(r235PathC.toFixed(2),'480.00','11-14 R52 Path C total');
    assert.equal((r235PathA-r235PathC).toFixed(2),'5120.00','11-14 R52 savings vs Path A');
    assert.equal(((r235PathA-r235PathC)/r235PathA*100).toFixed(2),'91.43','11-14 R52 pct savings vs Path A');
    for(const r235File of ['workshops/github-trending-radar/docs/wqguard-astra-ds-readonly-ios-macho-sandbox-auditor-29mb-c11-zero-gpu-discord-client-selection-faq.md','workshops/github-trending-radar/docs/wqguard-astra-ds-readonly-ios-macho-sandbox-auditor-29mb-c11-zero-gpu-discord-client-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r52-wqguard-astra-ds.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r235File),'utf8');
      assert.ok(txt.includes('1,800.00')&&txt.includes('3,800.00')&&txt.includes('5,600.00')&&txt.includes('130.00')&&txt.includes('350.00')&&txt.includes('480.00')&&txt.includes('5,120.00')&&txt.includes('91.43%')&&txt.includes('not_measured'),r235File+': contains exact 11-14 R52 WQGuard+astra-ds closed-form parameters');
    }
    // 2026-11-14 Daytime Round 53 (R236: localtonet/elio + dopeytree/birdsong) verification
    const r236PathA=1510.00+36.0*95.00;
    assert.equal(r236PathA.toFixed(2),'4930.00','11-14 R53 Path A total');
    const r236PathC=80.00+3.5*95.00;
    assert.equal(r236PathC.toFixed(2),'412.50','11-14 R53 Path C total');
    assert.equal((r236PathA-r236PathC).toFixed(2),'4517.50','11-14 R53 savings vs Path A');
    assert.equal(((r236PathA-r236PathC)/r236PathA*100).toFixed(2),'91.63','11-14 R53 pct savings vs Path A');
    for(const r236File of ['workshops/github-trending-radar/docs/elio-birdsong-libghostty-skia-5os-e2ee-ssh-terminal-birdnet-go-1800s-plate-visualizer-selection-faq.md','workshops/github-trending-radar/docs/elio-birdsong-libghostty-skia-5os-e2ee-ssh-terminal-birdnet-go-1800s-plate-visualizer-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r53-elio-birdsong.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r236File),'utf8');
      assert.ok(txt.includes('1,510.00')&&txt.includes('3,420.00')&&txt.includes('4,930.00')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,517.50')&&txt.includes('91.63%')&&txt.includes('not_measured'),r236File+': contains exact 11-14 R53 elio+birdsong closed-form parameters');
    }
    // 2026-11-14 Track A/B Leaderboard & Night Round 54 (R237: huggingface/safeagents + garrytan/g-harness-evals) verification
    const rawSearch1114Obj=JSON.parse(rawSearch1114);
    const rawSearch1114Map=new Map(rawSearch1114Obj.items.map(it=>[it.full_name,it]));
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_14.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': 11-14 Track A provenance');
      assert.ok(rawHtml1114.includes(`href="/${item.full_name}"`),item.full_name+': present in 11-14 raw HTML');
      assert.ok(rawHtml1114.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in 11-14 raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_14.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': 11-14 Track B stars_today must be not_measured');
      assert.ok(rawSearch1114Map.has(item.full_name),item.full_name+': present in 11-14 archived Search API JSON');
      const rawEntry=rawSearch1114Map.get(item.full_name);
      assert.equal(item.stars_total_search_api,rawEntry.stargazers_count,item.full_name+': 11-14 stars_total_search_api matches Search API JSON');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': 11-14 stars_per_day closed-form');
    }
    const r237PathA=1820.00+38.0*100.00;
    assert.equal(r237PathA.toFixed(2),'5620.00','11-14 R54 Path A total');
    const r237PathC=135.00+3.5*100.00;
    assert.equal(r237PathC.toFixed(2),'485.00','11-14 R54 Path C total');
    assert.equal((r237PathA-r237PathC).toFixed(2),'5135.00','11-14 R54 savings vs Path A');
    assert.equal(((r237PathA-r237PathC)/r237PathA*100).toFixed(2),'91.37','11-14 R54 pct savings vs Path A');
    for(const r237File of ['workshops/github-trending-radar/docs/safeagents-g-harness-evals-preharness-atif-tool-proxy-cost-per-solved-task-benchmark-selection-faq.md','workshops/github-trending-radar/docs/safeagents-g-harness-evals-preharness-atif-tool-proxy-cost-per-solved-task-benchmark-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r54-safeagents-gharnessevals.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r237File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,800.00')&&txt.includes('5,620.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,135.00')&&txt.includes('91.37%')&&txt.includes('not_measured'),r237File+': contains exact 11-14 R54 safeagents+g-harness-evals closed-form parameters');
    }
    // 2026-11-14 Night Round 55 (R238: RUC-NLPIR/CoworkOS + Luminousyyh/skill-wb-exec) verification
    const r238PathA=1940.00+38.0*100.00;
    assert.equal(r238PathA.toFixed(2),'5740.00','11-14 R55 Path A total');
    const r238PathC=145.00+3.5*100.00;
    assert.equal(r238PathC.toFixed(2),'495.00','11-14 R55 Path C total');
    assert.equal((r238PathA-r238PathC).toFixed(2),'5245.00','11-14 R55 savings vs Path A');
    assert.equal(((r238PathA-r238PathC)/r238PathA*100).toFixed(2),'91.38','11-14 R55 pct savings vs Path A');
    for(const r238File of ['workshops/github-trending-radar/docs/coworkos-skill-wb-exec-3layer-hitl-cowork-runtime-pid-locked-worktree-delegation-selection-faq.md','workshops/github-trending-radar/docs/coworkos-skill-wb-exec-3layer-hitl-cowork-runtime-pid-locked-worktree-delegation-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r55-coworkos-wbexec.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r238File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('3,800.00')&&txt.includes('5,740.00')&&txt.includes('145.00')&&txt.includes('350.00')&&txt.includes('495.00')&&txt.includes('5,245.00')&&txt.includes('91.38%')&&txt.includes('not_measured'),r238File+': contains exact 11-14 R55 CoworkOS+wb-exec closed-form parameters');
    }
    // 2026-11-14 Night Round 56 (R239: AkaraChen/cc-remote + Bil0000/Hill-Climb) verification
    const r239PathA=1650.00+36.0*95.00;
    assert.equal(r239PathA.toFixed(2),'5070.00','11-14 R56 Path A total');
    const r239PathC=90.00+3.5*95.00;
    assert.equal(r239PathC.toFixed(2),'422.50','11-14 R56 Path C total');
    assert.equal((r239PathA-r239PathC).toFixed(2),'4647.50','11-14 R56 savings vs Path A');
    assert.equal(((r239PathA-r239PathC)/r239PathA*100).toFixed(2),'91.67','11-14 R56 pct savings vs Path A');
    for(const r239File of ['workshops/github-trending-radar/docs/cc-remote-hill-climb-remote-ssh-local-tool-acp-locked-benchmark-atomic-climb-selection-faq.md','workshops/github-trending-radar/docs/cc-remote-hill-climb-remote-ssh-local-tool-acp-locked-benchmark-atomic-climb-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r56-ccremote-hillclimb.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r239File),'utf8');
      assert.ok(txt.includes('1,650.00')&&txt.includes('3,420.00')&&txt.includes('5,070.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('4,647.50')&&txt.includes('91.67%')&&txt.includes('not_measured'),r239File+': contains exact 11-14 R56 cc-remote+Hill-Climb closed-form parameters');
    }
    // 2026-11-14 Night Round 57 (R240: albertirgi/replica + gmpetrov/agent-screenplay) verification
    const r240PathA=1560.00+36.0*95.00;
    assert.equal(r240PathA.toFixed(2),'4980.00','11-14 R57 Path A total');
    const r240PathC=85.00+3.5*95.00;
    assert.equal(r240PathC.toFixed(2),'417.50','11-14 R57 Path C total');
    assert.equal((r240PathA-r240PathC).toFixed(2),'4562.50','11-14 R57 savings vs Path A');
    assert.equal(((r240PathA-r240PathC)/r240PathA*100).toFixed(2),'91.62','11-14 R57 pct savings vs Path A');
    for(const r240File of ['workshops/github-trending-radar/docs/replica-agent-screenplay-4axis-virtual-clock-ui-clone-scorer-screen-studio-mcp-selection-faq.md','workshops/github-trending-radar/docs/replica-agent-screenplay-4axis-virtual-clock-ui-clone-scorer-screen-studio-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r57-replica-screenplay.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r240File),'utf8');
      assert.ok(txt.includes('1,560.00')&&txt.includes('3,420.00')&&txt.includes('4,980.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,562.50')&&txt.includes('91.62%')&&txt.includes('not_measured'),r240File+': contains exact 11-14 R57 replica+agent-screenplay closed-form parameters');
    }
    // 2026-11-14 Night Round 58 (R241: QiYueran-source/waymark + sshah03/recalc) verification
    const r241PathA=1540.00+36.0*95.00;
    assert.equal(r241PathA.toFixed(2),'4960.00','11-14 R58 Path A total');
    const r241PathC=80.00+3.5*95.00;
    assert.equal(r241PathC.toFixed(2),'412.50','11-14 R58 Path C total');
    assert.equal((r241PathA-r241PathC).toFixed(2),'4547.50','11-14 R58 savings vs Path A');
    assert.equal(((r241PathA-r241PathC)/r241PathA*100).toFixed(2),'91.68','11-14 R58 pct savings vs Path A');
    for(const r241File of ['workshops/github-trending-radar/docs/waymark-recalc-git-markdown-work-tracker-mcp-reactive-agent-terminal-spreadsheet-selection-faq.md','workshops/github-trending-radar/docs/waymark-recalc-git-markdown-work-tracker-mcp-reactive-agent-terminal-spreadsheet-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r58-waymark-recalc.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r241File),'utf8');
      assert.ok(txt.includes('1,540.00')&&txt.includes('3,420.00')&&txt.includes('4,960.00')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,547.50')&&txt.includes('91.68%')&&txt.includes('not_measured'),r241File+': contains exact 11-14 R58 waymark+recalc closed-form parameters');
    }
    // 2026-11-14 Night Round 59 (R242: beipo-ai/NorthCUA + Kemerd/claude-hardware-in-the-loop) verification
    const r242PathA=2240.00+38.0*105.00;
    assert.equal(r242PathA.toFixed(2),'6230.00','11-14 R59 Path A total');
    const r242PathC=165.00+3.5*105.00;
    assert.equal(r242PathC.toFixed(2),'532.50','11-14 R59 Path C total');
    assert.equal((r242PathA-r242PathC).toFixed(2),'5697.50','11-14 R59 savings vs Path A');
    assert.equal(((r242PathA-r242PathC)/r242PathA*100).toFixed(2),'91.45','11-14 R59 pct savings vs Path A');
    for(const r242File of ['workshops/github-trending-radar/docs/northcua-claude-hardware-in-the-loop-sota-desktop-web-cua-harness-12step-kicad-cadquery-hil-selection-faq.md','workshops/github-trending-radar/docs/northcua-claude-hardware-in-the-loop-sota-desktop-web-cua-harness-12step-kicad-cadquery-hil-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r59-northcua-claudehil.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r242File),'utf8');
      assert.ok(txt.includes('2,240.00')&&txt.includes('3,990.00')&&txt.includes('6,230.00')&&txt.includes('165.00')&&txt.includes('367.50')&&txt.includes('532.50')&&txt.includes('5,697.50')&&txt.includes('91.45%')&&txt.includes('not_measured'),r242File+': contains exact 11-14 R59 NorthCUA+claude-hardware-in-the-loop closed-form parameters');
    }
    // 2026-11-14 Night Round 60 (R243: sinabs/spring-agent-scope + alpcanaydin/rexmod) verification
    const r243PathA=1780.00+38.0*100.00;
    assert.equal(r243PathA.toFixed(2),'5580.00','11-14 R60 Path A total');
    const r243PathC=130.00+3.5*100.00;
    assert.equal(r243PathC.toFixed(2),'480.00','11-14 R60 Path C total');
    assert.equal((r243PathA-r243PathC).toFixed(2),'5100.00','11-14 R60 savings vs Path A');
    assert.equal(((r243PathA-r243PathC)/r243PathA*100).toFixed(2),'91.40','11-14 R60 pct savings vs Path A');
    for(const r243File of ['workshops/github-trending-radar/docs/spring-agent-scope-rexmod-jdk25-ephemeral-agent-harness-5cli-neovim-review-loop-selection-faq.md','workshops/github-trending-radar/docs/spring-agent-scope-rexmod-jdk25-ephemeral-agent-harness-5cli-neovim-review-loop-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r60-springagentscope-rexmod.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r243File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,800.00')&&txt.includes('5,580.00')&&txt.includes('130.00')&&txt.includes('350.00')&&txt.includes('480.00')&&txt.includes('5,100.00')&&txt.includes('91.40%')&&txt.includes('not_measured'),r243File+': contains exact 11-14 R60 spring-agent-scope+rexmod closed-form parameters');
    }
    // 2026-11-14 Night Round 61 (R244: Burns1028/moa-plus + HuangShengZeBlueSky/dsh-harness-evolution) verification
    const r244PathA=2120.00+38.0*100.00;
    assert.equal(r244PathA.toFixed(2),'5920.00','11-14 R61 Path A total');
    const r244PathC=155.00+3.5*100.00;
    assert.equal(r244PathC.toFixed(2),'505.00','11-14 R61 Path C total');
    assert.equal((r244PathA-r244PathC).toFixed(2),'5415.00','11-14 R61 savings vs Path A');
    assert.equal(((r244PathA-r244PathC)/r244PathA*100).toFixed(2),'91.47','11-14 R61 pct savings vs Path A');
    for(const r244File of ['workshops/github-trending-radar/docs/moa-plus-dsh-harness-evolution-persistent-peer-workers-frozen-4b-scope-c-harness-evolution-selection-faq.md','workshops/github-trending-radar/docs/moa-plus-dsh-harness-evolution-persistent-peer-workers-frozen-4b-scope-c-harness-evolution-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r61-moaplus-dshevolution.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r244File),'utf8');
      assert.ok(txt.includes('2,120.00')&&txt.includes('3,800.00')&&txt.includes('5,920.00')&&txt.includes('155.00')&&txt.includes('350.00')&&txt.includes('505.00')&&txt.includes('5,415.00')&&txt.includes('91.47%')&&txt.includes('not_measured'),r244File+': contains exact 11-14 R61 moa-plus+dsh-harness-evolution closed-form parameters');
    }
    // 2026-11-14 Night Round 62 (R245: LemonFace0309/charles-skills + JDhruv14/ascii-diorama) verification
    const r245PathA=1590.00+36.0*95.00;
    assert.equal(r245PathA.toFixed(2),'5010.00','11-14 R62 Path A total');
    const r245PathC=85.00+3.5*95.00;
    assert.equal(r245PathC.toFixed(2),'417.50','11-14 R62 Path C total');
    assert.equal((r245PathA-r245PathC).toFixed(2),'4592.50','11-14 R62 savings vs Path A');
    assert.equal(((r245PathA-r245PathC)/r245PathA*100).toFixed(2),'91.67','11-14 R62 pct savings vs Path A');
    for(const r245File of ['workshops/github-trending-radar/docs/charles-skills-ascii-diorama-20law-ux-motion-polish-halffloat-3d-tiltshift-ascii-shader-selection-faq.md','workshops/github-trending-radar/docs/charles-skills-ascii-diorama-20law-ux-motion-polish-halffloat-3d-tiltshift-ascii-shader-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r62-charlesskills-asciidiorama.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r245File),'utf8');
      assert.ok(txt.includes('1,590.00')&&txt.includes('3,420.00')&&txt.includes('5,010.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,592.50')&&txt.includes('91.67%')&&txt.includes('not_measured'),r245File+': contains exact 11-14 R62 charles-skills+ascii-diorama closed-form parameters');
    }
    // 2026-11-14 Night Round 63 (R246: justrach/nanolight + gakonst/tatami) verification
    const r246PathA=1490.00+36.0*95.00;
    assert.equal(r246PathA.toFixed(2),'4910.00','11-14 R63 Path A total');
    const r246PathC=75.00+3.5*95.00;
    assert.equal(r246PathC.toFixed(2),'407.50','11-14 R63 Path C total');
    assert.equal((r246PathA-r246PathC).toFixed(2),'4502.50','11-14 R63 savings vs Path A');
    assert.equal(((r246PathA-r246PathC)/r246PathA*100).toFixed(2),'91.70','11-14 R63 pct savings vs Path A');
    for(const r246File of ['workshops/github-trending-radar/docs/nanolight-tatami-2mb-zig-cross-os-raycast-launcher-pure-state-machine-macos-tiling-wm-selection-faq.md','workshops/github-trending-radar/docs/nanolight-tatami-2mb-zig-cross-os-raycast-launcher-pure-state-machine-macos-tiling-wm-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r63-nanolight-tatami.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r246File),'utf8');
      assert.ok(txt.includes('1,490.00')&&txt.includes('3,420.00')&&txt.includes('4,910.00')&&txt.includes('75.00')&&txt.includes('332.50')&&txt.includes('407.50')&&txt.includes('4,502.50')&&txt.includes('91.70%')&&txt.includes('not_measured'),r246File+': contains exact 11-14 R63 nanolight+tatami closed-form parameters');
    }
    // 2026-11-14 Night Round 64 (R247: globalmpc/backendskills + globalmpc/vibe-preflight) verification
    const r247PathA=1920.00+38.0*100.00;
    assert.equal(r247PathA.toFixed(2),'5720.00','11-14 R64 Path A total');
    const r247PathC=140.00+3.5*100.00;
    assert.equal(r247PathC.toFixed(2),'490.00','11-14 R64 Path C total');
    assert.equal((r247PathA-r247PathC).toFixed(2),'5230.00','11-14 R64 savings vs Path A');
    assert.equal(((r247PathA-r247PathC)/r247PathA*100).toFixed(2),'91.43','11-14 R64 pct savings vs Path A');
    for(const r247File of ['workshops/github-trending-radar/docs/backendskills-vibe-preflight-production-backend-guardrails-9area-launch-readiness-audit-selection-faq.md','workshops/github-trending-radar/docs/backendskills-vibe-preflight-production-backend-guardrails-9area-launch-readiness-audit-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r64-backendskills-vibepreflight.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r247File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,800.00')&&txt.includes('5,720.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('5,230.00')&&txt.includes('91.43%')&&txt.includes('not_measured'),r247File+': contains exact 11-14 R64 backendskills+vibe-preflight closed-form parameters');
    }
    // 2026-11-14 Night Round 65 (R248: michaelmagan/spared + ATLURI0001/target-reconciliation-service) verification
    const r248PathA=1880.00+38.0*100.00;
    assert.equal(r248PathA.toFixed(2),'5680.00','11-14 R65 Path A total');
    const r248PathC=140.00+3.5*100.00;
    assert.equal(r248PathC.toFixed(2),'490.00','11-14 R65 Path C total');
    assert.equal((r248PathA-r248PathC).toFixed(2),'5190.00','11-14 R65 savings vs Path A');
    assert.equal(((r248PathA-r248PathC)/r248PathA*100).toFixed(2),'91.37','11-14 R65 pct savings vs Path A');
    for(const r248File of ['workshops/github-trending-radar/docs/spared-target-reconciliation-service-wasm-in-sandbox-sqlite-host-atomic-k8s-crd-rollback-selection-faq.md','workshops/github-trending-radar/docs/spared-target-reconciliation-service-wasm-in-sandbox-sqlite-host-atomic-k8s-crd-rollback-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r65-spared-targetreconciliation.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r248File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,800.00')&&txt.includes('5,680.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('5,190.00')&&txt.includes('91.37%')&&txt.includes('not_measured'),r248File+': contains exact 11-14 R65 spared+target-reconciliation-service closed-form parameters');
    }
    // 2026-11-14 Night Round 66 (R249: nocodehack/make-short + brewed-ops/talking-explainer) verification
    const r249PathA=1640.00+36.0*95.00;
    assert.equal(r249PathA.toFixed(2),'5060.00','11-14 R66 Path A total');
    const r249PathC=90.00+3.5*95.00;
    assert.equal(r249PathC.toFixed(2),'422.50','11-14 R66 Path C total');
    assert.equal((r249PathA-r249PathC).toFixed(2),'4637.50','11-14 R66 savings vs Path A');
    assert.equal(((r249PathA-r249PathC)/r249PathA*100).toFixed(2),'91.65','11-14 R66 pct savings vs Path A');
    for(const r249File of ['workshops/github-trending-radar/docs/make-short-talking-explainer-fresh-critic-blender-shorts-6mouth-word-timed-explainer-selection-faq.md','workshops/github-trending-radar/docs/make-short-talking-explainer-fresh-critic-blender-shorts-6mouth-word-timed-explainer-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r66-makeshort-talkingexplainer.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r249File),'utf8');
      assert.ok(txt.includes('1,640.00')&&txt.includes('3,420.00')&&txt.includes('5,060.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('4,637.50')&&txt.includes('91.65%')&&txt.includes('not_measured'),r249File+': contains exact 11-14 R66 make-short+talking-explainer closed-form parameters');
    }
    // 2026-11-14 Night Round 67 (R250: HalfVulpes/sts2ai + rjmahesh/ui-redline-walkthrough) verification
    const r250PathA=1950.00+38.0*100.00;
    assert.equal(r250PathA.toFixed(2),'5750.00','11-14 R67 Path A total');
    const r250PathC=145.00+3.5*100.00;
    assert.equal(r250PathC.toFixed(2),'495.00','11-14 R67 Path C total');
    assert.equal((r250PathA-r250PathC).toFixed(2),'5255.00','11-14 R67 savings vs Path A');
    assert.equal(((r250PathA-r250PathC)/r250PathA*100).toFixed(2),'91.39','11-14 R67 pct savings vs Path A');
    for(const r250File of ['workshops/github-trending-radar/docs/sts2ai-ui-redline-walkthrough-6m-zero-search-failure-restart-rl-3200p60-redline-morph-skill-selection-faq.md','workshops/github-trending-radar/docs/sts2ai-ui-redline-walkthrough-6m-zero-search-failure-restart-rl-3200p60-redline-morph-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r67-sts2ai-uiredline.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r250File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('3,800.00')&&txt.includes('5,750.00')&&txt.includes('145.00')&&txt.includes('350.00')&&txt.includes('495.00')&&txt.includes('5,255.00')&&txt.includes('91.39%')&&txt.includes('not_measured'),r250File+': contains exact 11-14 R67 sts2ai+ui-redline-walkthrough closed-form parameters');
    }
    // 2026-11-14 Night Round 68 (R251: FuzzyKuji/OpenProgram + DAgogo04/gogo-agent) verification
    const r251PathA=1860.00+38.0*100.00;
    assert.equal(r251PathA.toFixed(2),'5660.00','11-14 R68 Path A total');
    const r251PathC=135.00+3.5*100.00;
    assert.equal(r251PathC.toFixed(2),'485.00','11-14 R68 Path C total');
    assert.equal((r251PathA-r251PathC).toFixed(2),'5175.00','11-14 R68 savings vs Path A');
    assert.equal(((r251PathA-r251PathC)/r251PathA*100).toFixed(2),'91.43','11-14 R68 pct savings vs Path A');
    for(const r251File of ['workshops/github-trending-radar/docs/openprogram-gogo-agent-self-programming-dag-classes-95line-glassbox-gated-memory-harness-selection-faq.md','workshops/github-trending-radar/docs/openprogram-gogo-agent-self-programming-dag-classes-95line-glassbox-gated-memory-harness-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r68-openprogram-gogoagent.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r251File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,800.00')&&txt.includes('5,660.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,175.00')&&txt.includes('91.43%')&&txt.includes('not_measured'),r251File+': contains exact 11-14 R68 OpenProgram+gogo-agent closed-form parameters');
    }
    // 2026-11-14 Night Round 69 (R252: PansaLegrand/dojo-video-harness + ebetica/recurse) verification
    const r252PathA=1580.00+36.0*95.00;
    assert.equal(r252PathA.toFixed(2),'5000.00','11-14 R69 Path A total');
    const r252PathC=85.00+3.5*95.00;
    assert.equal(r252PathC.toFixed(2),'417.50','11-14 R69 Path C total');
    assert.equal((r252PathA-r252PathC).toFixed(2),'4582.50','11-14 R69 savings vs Path A');
    assert.equal(((r252PathA-r252PathC)/r252PathA*100).toFixed(2),'91.65','11-14 R69 pct savings vs Path A');
    for(const r252File of ['workshops/github-trending-radar/docs/dojo-video-harness-recurse-local-webcodecs-nle-command-kernel-pi-durable-monitor-primitives-selection-faq.md','workshops/github-trending-radar/docs/dojo-video-harness-recurse-local-webcodecs-nle-command-kernel-pi-durable-monitor-primitives-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r69-dojovideo-recurse.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r252File),'utf8');
      assert.ok(txt.includes('1,580.00')&&txt.includes('3,420.00')&&txt.includes('5,000.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,582.50')&&txt.includes('91.65%')&&txt.includes('not_measured'),r252File+': contains exact 11-14 R69 dojo-video-harness+recurse closed-form parameters');
    }
    // 2026-11-14 Night Round 70 (R253: dseditor/h3-colab-skill + fantuan-lab/animated-sticker-studio) verification
    const r253PathA=1680.00+36.0*95.00;
    assert.equal(r253PathA.toFixed(2),'5100.00','11-14 R70 Path A total');
    const r253PathC=95.00+3.5*95.00;
    assert.equal(r253PathC.toFixed(2),'427.50','11-14 R70 Path C total');
    assert.equal((r253PathA-r253PathC).toFixed(2),'4672.50','11-14 R70 savings vs Path A');
    assert.equal(((r253PathA-r253PathC)/r253PathA*100).toFixed(2),'91.62','11-14 R70 pct savings vs Path A');
    for(const r253File of ['workshops/github-trending-radar/docs/h3-colab-skill-animated-sticker-studio-quota-guarded-colab-h3-4sheet-6platform-sticker-pack-selection-faq.md','workshops/github-trending-radar/docs/h3-colab-skill-animated-sticker-studio-quota-guarded-colab-h3-4sheet-6platform-sticker-pack-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r70-h3colab-stickerstudio.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r253File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,420.00')&&txt.includes('5,100.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,672.50')&&txt.includes('91.62%')&&txt.includes('not_measured'),r253File+': contains exact 11-14 R70 h3-colab-skill+animated-sticker-studio closed-form parameters');
    }
    // 2026-11-14 Night Round 71 (R254: Aeternitasoo/Aeternitas + TubeLabHQ/youtube-research-skills) verification
    const r254PathA=1820.00+40.0*95.00;
    assert.equal(r254PathA.toFixed(2),'5620.00','11-14 R71 Path A total');
    const r254PathC=110.00+4.0*95.00;
    assert.equal(r254PathC.toFixed(2),'490.00','11-14 R71 Path C total');
    assert.equal((r254PathA-r254PathC).toFixed(2),'5130.00','11-14 R71 savings vs Path A');
    assert.equal(((r254PathA-r254PathC)/r254PathA*100).toFixed(2),'91.28','11-14 R71 pct savings vs Path A');
    for(const r254File of ['workshops/github-trending-radar/docs/aeternitas-youtube-research-skills-epistemic-supply-chain-harness-tubelab-mcp-video-intelligence-selection-faq.md','workshops/github-trending-radar/docs/aeternitas-youtube-research-skills-epistemic-supply-chain-harness-tubelab-mcp-video-intelligence-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r71-aeternitas-tubelabskills.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r254File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,800.00')&&txt.includes('5,620.00')&&txt.includes('110.00')&&txt.includes('380.00')&&txt.includes('490.00')&&txt.includes('5,130.00')&&txt.includes('91.28%')&&txt.includes('not_measured'),r254File+': contains exact 11-14 R71 Aeternitas+youtube-research-skills closed-form parameters');
    }
    // 2026-11-14 Night Round 72 (R255: vercel-labs/ui + vercel-labs/durable-harness) verification
    const r255PathA=1740.00+38.0*95.00;
    assert.equal(r255PathA.toFixed(2),'5350.00','11-14 R72 Path A total');
    const r255PathC=95.00+3.5*95.00;
    assert.equal(r255PathC.toFixed(2),'427.50','11-14 R72 Path C total');
    assert.equal((r255PathA-r255PathC).toFixed(2),'4922.50','11-14 R72 savings vs Path A');
    assert.equal(((r255PathA-r255PathC)/r255PathA*100).toFixed(2),'92.01','11-14 R72 pct savings vs Path A');
    for(const r255File of ['workshops/github-trending-radar/docs/vercel-ui-durable-harness-agent-behavior-primitives-workflow-sdk-durable-coding-agents-selection-faq.md','workshops/github-trending-radar/docs/vercel-ui-durable-harness-agent-behavior-primitives-workflow-sdk-durable-coding-agents-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r72-vercelui-durableharness.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r255File),'utf8');
      assert.ok(txt.includes('1,740.00')&&txt.includes('3,610.00')&&txt.includes('5,350.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,922.50')&&txt.includes('92.01%')&&txt.includes('not_measured'),r255File+': contains exact 11-14 R72 vercel-labs/ui+durable-harness closed-form parameters');
    }
    // 2026-11-14 Night Round 73 (R256: aicodeking/leanrea + reacher-z/Awesome-REA) verification
    const r256PathA=1860.00+39.0*95.00;
    assert.equal(r256PathA.toFixed(2),'5565.00','11-14 R73 Path A total');
    const r256PathC=95.00+3.5*95.00;
    assert.equal(r256PathC.toFixed(2),'427.50','11-14 R73 Path C total');
    assert.equal((r256PathA-r256PathC).toFixed(2),'5137.50','11-14 R73 savings vs Path A');
    assert.equal(((r256PathA-r256PathC)/r256PathA*100).toFixed(2),'92.32','11-14 R73 pct savings vs Path A');
    for(const r256File of ['workshops/github-trending-radar/docs/leanrea-awesome-rea-8kb-zero-mcp-reverse-engineering-skill-5191-resource-corpus-selection-faq.md','workshops/github-trending-radar/docs/leanrea-awesome-rea-8kb-zero-mcp-reverse-engineering-skill-5191-resource-corpus-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r73-leanrea-awesomerea.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r256File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,705.00')&&txt.includes('5,565.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,137.50')&&txt.includes('92.32%')&&txt.includes('not_measured'),r256File+': contains exact 11-14 R73 leanrea+Awesome-REA closed-form parameters');
    }
    // 2026-11-14 Night Round 74 (R257: amosblomqvist/learnharness + ywEdAi/teachable-figures) verification
    const r257PathA=1620.00+37.0*95.00;
    assert.equal(r257PathA.toFixed(2),'5135.00','11-14 R74 Path A total');
    const r257PathC=90.00+3.5*95.00;
    assert.equal(r257PathC.toFixed(2),'422.50','11-14 R74 Path C total');
    assert.equal((r257PathA-r257PathC).toFixed(2),'4712.50','11-14 R74 savings vs Path A');
    assert.equal(((r257PathA-r257PathC)/r257PathA*100).toFixed(2),'91.77','11-14 R74 pct savings vs Path A');
    for(const r257File of ['workshops/github-trending-radar/docs/learnharness-teachable-figures-cognitive-knowledge-graph-harness-causal-predict-try-explain-skill-selection-faq.md','workshops/github-trending-radar/docs/learnharness-teachable-figures-cognitive-knowledge-graph-harness-causal-predict-try-explain-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r74-learnharness-teachablefigures.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r257File),'utf8');
      assert.ok(txt.includes('1,620.00')&&txt.includes('3,515.00')&&txt.includes('5,135.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('4,712.50')&&txt.includes('91.77%')&&txt.includes('not_measured'),r257File+': contains exact 11-14 R74 learnharness+teachable-figures closed-form parameters');
    }
    // 2026-11-14 Night Round 75 (R258: reason-machines/reason-network + Bearisbug/imbo) verification
    const r258PathA=1680.00+38.0*95.00;
    assert.equal(r258PathA.toFixed(2),'5290.00','11-14 R75 Path A total');
    const r258PathC=90.00+3.5*95.00;
    assert.equal(r258PathC.toFixed(2),'422.50','11-14 R75 Path C total');
    assert.equal((r258PathA-r258PathC).toFixed(2),'4867.50','11-14 R75 savings vs Path A');
    assert.equal(((r258PathA-r258PathC)/r258PathA*100).toFixed(2),'92.01','11-14 R75 pct savings vs Path A');
    for(const r258File of ['workshops/github-trending-radar/docs/reason-network-imbo-e2ee-p2p-team-agent-mesh-mid-turn-wake-instant-messaging-selection-faq.md','workshops/github-trending-radar/docs/reason-network-imbo-e2ee-p2p-team-agent-mesh-mid-turn-wake-instant-messaging-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r75-reasonnetwork-imbo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r258File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,610.00')&&txt.includes('5,290.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('4,867.50')&&txt.includes('92.01%')&&txt.includes('not_measured'),r258File+': contains exact 11-14 R75 reason-network+imbo closed-form parameters');
    }
    // 2026-11-14 Night Round 76 (R259: sahenjp/RustXNG + fatsearch/fatsearch) verification
    const r259PathA=1940.00+38.0*95.00;
    assert.equal(r259PathA.toFixed(2),'5550.00','11-14 R76 Path A total');
    const r259PathC=85.00+3.5*95.00;
    assert.equal(r259PathC.toFixed(2),'417.50','11-14 R76 Path C total');
    assert.equal((r259PathA-r259PathC).toFixed(2),'5132.50','11-14 R76 savings vs Path A');
    assert.equal(((r259PathA-r259PathC)/r259PathA*100).toFixed(2),'92.48','11-14 R76 pct savings vs Path A');
    for(const r259File of ['workshops/github-trending-radar/docs/rustxng-fatsearch-self-hosted-rust-metasearch-mcp-918-token-outline-loss-guard-web-reader-selection-faq.md','workshops/github-trending-radar/docs/rustxng-fatsearch-self-hosted-rust-metasearch-mcp-918-token-outline-loss-guard-web-reader-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r76-rustxng-fatsearch.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r259File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('3,610.00')&&txt.includes('5,550.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,132.50')&&txt.includes('92.48%')&&txt.includes('not_measured'),r259File+': contains exact 11-14 R76 RustXNG+fatsearch closed-form parameters');
    }
    // 2026-11-14 Night Round 77 (R260 Milestone: strands-agents/box + joydle/borg) verification
    const r260PathA=1780.00+39.0*95.00;
    assert.equal(r260PathA.toFixed(2),'5485.00','11-14 R77 Path A total');
    const r260PathC=95.00+3.5*95.00;
    assert.equal(r260PathC.toFixed(2),'427.50','11-14 R77 Path C total');
    assert.equal((r260PathA-r260PathC).toFixed(2),'5057.50','11-14 R77 savings vs Path A');
    assert.equal(((r260PathA-r260PathC)/r260PathA*100).toFixed(2),'92.21','11-14 R77 pct savings vs Path A');
    for(const r260File of ['workshops/github-trending-radar/docs/strands-box-borg-dogwood-temporal-os-sandbox-supervised-rust-agent-pipeline-runtime-selection-faq.md','workshops/github-trending-radar/docs/strands-box-borg-dogwood-temporal-os-sandbox-supervised-rust-agent-pipeline-runtime-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r77-strandsbox-borg.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r260File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,705.00')&&txt.includes('5,485.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,057.50')&&txt.includes('92.21%')&&txt.includes('not_measured'),r260File+': contains exact 11-14 R77 strands-box+borg closed-form parameters');
    }
    // 2026-11-14 Night Round 78 (R261: Graphicle-AI/graphicle + pi-infected/tokenade) verification
    const r261PathA=1920.00+39.0*95.00;
    assert.equal(r261PathA.toFixed(2),'5625.00','11-14 R78 Path A total');
    const r261PathC=95.00+3.5*95.00;
    assert.equal(r261PathC.toFixed(2),'427.50','11-14 R78 Path C total');
    assert.equal((r261PathA-r261PathC).toFixed(2),'5197.50','11-14 R78 savings vs Path A');
    assert.equal(((r261PathA-r261PathC)/r261PathA*100).toFixed(2),'92.40','11-14 R78 pct savings vs Path A');
    for(const r261File of ['workshops/github-trending-radar/docs/graphicle-tokenade-rust-incremental-code-graph-thol-top1-token-compaction-proxy-selection-faq.md','workshops/github-trending-radar/docs/graphicle-tokenade-rust-incremental-code-graph-thol-top1-token-compaction-proxy-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r78-graphicle-tokenade.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r261File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,705.00')&&txt.includes('5,625.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,197.50')&&txt.includes('92.40%')&&txt.includes('not_measured'),r261File+': contains exact 11-14 R78 graphicle+tokenade closed-form parameters');
    }
    // 2026-11-14 Night Round 79 (R262: Sheernox/cedr + jazzenchen/agent-hud-open) verification
    const r262PathA=1640.00+37.0*95.00;
    assert.equal(r262PathA.toFixed(2),'5155.00','11-14 R79 Path A total');
    const r262PathC=85.00+3.5*95.00;
    assert.equal(r262PathC.toFixed(2),'417.50','11-14 R79 Path C total');
    assert.equal((r262PathA-r262PathC).toFixed(2),'4737.50','11-14 R79 savings vs Path A');
    assert.equal(((r262PathA-r262PathC)/r262PathA*100).toFixed(2),'91.90','11-14 R79 pct savings vs Path A');
    for(const r262File of ['workshops/github-trending-radar/docs/cedr-agent-hud-open-quota-aware-multi-agent-router-council-notch-watch-approval-hud-selection-faq.md','workshops/github-trending-radar/docs/cedr-agent-hud-open-quota-aware-multi-agent-router-council-notch-watch-approval-hud-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r79-cedr-agenthud.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r262File),'utf8');
      assert.ok(txt.includes('1,640.00')&&txt.includes('3,515.00')&&txt.includes('5,155.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,737.50')&&txt.includes('91.90%')&&txt.includes('not_measured'),r262File+': contains exact 11-14 R79 cedr+agent-hud-open closed-form parameters');
    }
    // 2026-11-14 Night Round 80 (R263: lemonadesaltbagel/sill + YOLOW92/pagesift) verification
    const r263PathA=1760.00+38.0*95.00;
    assert.equal(r263PathA.toFixed(2),'5370.00','11-14 R80 Path A total');
    const r263PathC=85.00+3.5*95.00;
    assert.equal(r263PathC.toFixed(2),'417.50','11-14 R80 Path C total');
    assert.equal((r263PathA-r263PathC).toFixed(2),'4952.50','11-14 R80 savings vs Path A');
    assert.equal(((r263PathA-r263PathC)/r263PathA*100).toFixed(2),'92.23','11-14 R80 pct savings vs Path A');
    for(const r263File of ['workshops/github-trending-radar/docs/sill-pagesift-native-windows-rust-agent-bash-20x-pdf-office-web-markdown-engine-selection-faq.md','workshops/github-trending-radar/docs/sill-pagesift-native-windows-rust-agent-bash-20x-pdf-office-web-markdown-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r80-sill-pagesift.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r263File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,610.00')&&txt.includes('5,370.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,952.50')&&txt.includes('92.23%')&&txt.includes('not_measured'),r263File+': contains exact 11-14 R80 sill+pagesift closed-form parameters');
    }
    // 2026-11-14 Night Round 81 (R264: ctoldigital/axuse + wiva-hq/CodeRail) verification
    const r264PathA=1840.00+38.0*95.00;
    assert.equal(r264PathA.toFixed(2),'5450.00','11-14 R81 Path A total');
    const r264PathC=90.00+3.5*95.00;
    assert.equal(r264PathC.toFixed(2),'422.50','11-14 R81 Path C total');
    assert.equal((r264PathA-r264PathC).toFixed(2),'5027.50','11-14 R81 savings vs Path A');
    assert.equal(((r264PathA-r264PathC)/r264PathA*100).toFixed(2),'92.25','11-14 R81 pct savings vs Path A');
    for(const r264File of ['workshops/github-trending-radar/docs/axuse-coderail-accessibility-first-browser-computer-use-mcp-self-hosted-rbac-agent-remote-selection-faq.md','workshops/github-trending-radar/docs/axuse-coderail-accessibility-first-browser-computer-use-mcp-self-hosted-rbac-agent-remote-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r81-axuse-coderail.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r264File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,610.00')&&txt.includes('5,450.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('5,027.50')&&txt.includes('92.25%')&&txt.includes('not_measured'),r264File+': contains exact 11-14 R81 axuse+CodeRail closed-form parameters');
    }
    // 2026-11-14 Night Round 82 (R265: kanaworksai-hue/audio-studio-mcp + 0xS4N4TG/kinetograph) verification
    const r265PathA=1720.00+37.0*95.00;
    assert.equal(r265PathA.toFixed(2),'5235.00','11-14 R82 Path A total');
    const r265PathC=85.00+3.5*95.00;
    assert.equal(r265PathC.toFixed(2),'417.50','11-14 R82 Path C total');
    assert.equal((r265PathA-r265PathC).toFixed(2),'4817.50','11-14 R82 savings vs Path A');
    assert.equal(((r265PathA-r265PathC)/r265PathA*100).toFixed(2),'92.02','11-14 R82 pct savings vs Path A');
    for(const r265File of ['workshops/github-trending-radar/docs/audio-studio-mcp-kinetograph-local-stable-audio-3-mcp-browserless-rust-gpu-video-engine-selection-faq.md','workshops/github-trending-radar/docs/audio-studio-mcp-kinetograph-local-stable-audio-3-mcp-browserless-rust-gpu-video-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r82-audiostudiomcp-kinetograph.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r265File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,515.00')&&txt.includes('5,235.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,817.50')&&txt.includes('92.02%')&&txt.includes('not_measured'),r265File+': contains exact 11-14 R82 audio-studio-mcp+kinetograph closed-form parameters');
    }
    // 2026-11-14 Night Round 83 (R266: dansugc/reverse-engineer-marketing + alextnetto/res) verification
    const r266PathA=1790.00+39.0*95.00;
    assert.equal(r266PathA.toFixed(2),'5495.00','11-14 R83 Path A total');
    const r266PathC=95.00+3.5*95.00;
    assert.equal(r266PathC.toFixed(2),'427.50','11-14 R83 Path C total');
    assert.equal((r266PathA-r266PathC).toFixed(2),'5067.50','11-14 R83 savings vs Path A');
    assert.equal(((r266PathA-r266PathC)/r266PathA*100).toFixed(2),'92.22','11-14 R83 pct savings vs Path A');
    for(const r266File of ['workshops/github-trending-radar/docs/reverse-engineer-marketing-res-evidence-cited-gtm-teardown-130-token-saas-build-kit-selection-faq.md','workshops/github-trending-radar/docs/reverse-engineer-marketing-res-evidence-cited-gtm-teardown-130-token-saas-build-kit-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r83-rem-res.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r266File),'utf8');
      assert.ok(txt.includes('1,790.00')&&txt.includes('3,705.00')&&txt.includes('5,495.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,067.50')&&txt.includes('92.22%')&&txt.includes('not_measured'),r266File+': contains exact 11-14 R83 REM+RES closed-form parameters');
    }
    // 2026-11-14 Night Round 84 (R267: scphq/scp + Xpropel/Pi-Remote) verification
    const r267PathA=1710.00+37.0*95.00;
    assert.equal(r267PathA.toFixed(2),'5225.00','11-14 R84 Path A total');
    const r267PathC=85.00+3.5*95.00;
    assert.equal(r267PathC.toFixed(2),'417.50','11-14 R84 Path C total');
    assert.equal((r267PathA-r267PathC).toFixed(2),'4807.50','11-14 R84 savings vs Path A');
    assert.equal(((r267PathA-r267PathC)/r267PathA*100).toFixed(2),'92.01','11-14 R84 pct savings vs Path A');
    for(const r267File of ['workshops/github-trending-radar/docs/scp-pi-remote-turn-level-swarm-communication-protocol-extension-api-pi-session-mirror-selection-faq.md','workshops/github-trending-radar/docs/scp-pi-remote-turn-level-swarm-communication-protocol-extension-api-pi-session-mirror-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r84-scp-piremote.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r267File),'utf8');
      assert.ok(txt.includes('1,710.00')&&txt.includes('3,515.00')&&txt.includes('5,225.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,807.50')&&txt.includes('92.01%')&&txt.includes('not_measured'),r267File+': contains exact 11-14 R84 scp+Pi-Remote closed-form parameters');
    }
    // 2026-11-14 Night Round 85 (R268: ARSI-LAB/ARSI-Evaluator + ASLP-lab/DRAMA-Eval) verification
    const r268PathA=1880.00+39.0*95.00;
    assert.equal(r268PathA.toFixed(2),'5585.00','11-14 R85 Path A total');
    const r268PathC=95.00+3.5*95.00;
    assert.equal(r268PathC.toFixed(2),'427.50','11-14 R85 Path C total');
    assert.equal((r268PathA-r268PathC).toFixed(2),'5157.50','11-14 R85 savings vs Path A');
    assert.equal(((r268PathA-r268PathC)/r268PathA*100).toFixed(2),'92.35','11-14 R85 pct savings vs Path A');
    for(const r268File of ['workshops/github-trending-radar/docs/arsi-evaluator-drama-eval-unified-harness-inference-kernel-eval-bilingual-multi-speaker-speech-benchmark-selection-faq.md','workshops/github-trending-radar/docs/arsi-evaluator-drama-eval-unified-harness-inference-kernel-eval-bilingual-multi-speaker-speech-benchmark-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r85-arsievaluator-dramaeval.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r268File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,705.00')&&txt.includes('5,585.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,157.50')&&txt.includes('92.35%')&&txt.includes('not_measured'),r268File+': contains exact 11-14 R85 ARSI-Evaluator+DRAMA-Eval closed-form parameters');
    }
    // 2026-11-14 Night Round 86 (R269: tencentmusic/modus + knowflow-ai/KnowWork) verification
    const r269PathA=1810.00+39.0*95.00;
    assert.equal(r269PathA.toFixed(2),'5515.00','11-14 R86 Path A total');
    const r269PathC=95.00+3.5*95.00;
    assert.equal(r269PathC.toFixed(2),'427.50','11-14 R86 Path C total');
    assert.equal((r269PathA-r269PathC).toFixed(2),'5087.50','11-14 R86 savings vs Path A');
    assert.equal(((r269PathA-r269PathC)/r269PathA*100).toFixed(2),'92.25','11-14 R86 pct savings vs Path A');
    for(const r269File of ['workshops/github-trending-radar/docs/modus-knowwork-polyglot-compiler-semantic-harness-enterprise-deepseek-harness-rbac-platform-selection-faq.md','workshops/github-trending-radar/docs/modus-knowwork-polyglot-compiler-semantic-harness-enterprise-deepseek-harness-rbac-platform-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r86-modus-knowwork.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r269File),'utf8');
      assert.ok(txt.includes('1,810.00')&&txt.includes('3,705.00')&&txt.includes('5,515.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,087.50')&&txt.includes('92.25%')&&txt.includes('not_measured'),r269File+': contains exact 11-14 R86 modus+KnowWork closed-form parameters');
    }
    // 2026-11-14 Night Round 87 (R270 Milestone: LumaryLabsLLC/muxin + julianosig/easi.run) verification
    const r270PathA=1820.00+38.0*95.00;
    assert.equal(r270PathA.toFixed(2),'5430.00','11-14 R87 Path A total');
    const r270PathC=90.00+3.5*95.00;
    assert.equal(r270PathC.toFixed(2),'422.50','11-14 R87 Path C total');
    assert.equal((r270PathA-r270PathC).toFixed(2),'5007.50','11-14 R87 savings vs Path A');
    assert.equal(((r270PathA-r270PathC)/r270PathA*100).toFixed(2),'92.22','11-14 R87 pct savings vs Path A');
    for(const r270File of ['workshops/github-trending-radar/docs/muxin-easi-run-multi-machine-agent-workspace-hub-self-hosted-chrome-human-takeover-mcp-selection-faq.md','workshops/github-trending-radar/docs/muxin-easi-run-multi-machine-agent-workspace-hub-self-hosted-chrome-human-takeover-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r87-muxin-easirun.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r270File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,610.00')&&txt.includes('5,430.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('5,007.50')&&txt.includes('92.22%')&&txt.includes('not_measured'),r270File+': contains exact 11-14 R87 muxin+easi.run closed-form parameters');
    }
    // 2026-11-14 Night Round 88 (R271: hridaya423/phonedriver + kakao/prevue) verification
    const r271PathA=1750.00+38.0*95.00;
    assert.equal(r271PathA.toFixed(2),'5360.00','11-14 R88 Path A total');
    const r271PathC=85.00+3.5*95.00;
    assert.equal(r271PathC.toFixed(2),'417.50','11-14 R88 Path C total');
    assert.equal((r271PathA-r271PathC).toFixed(2),'4942.50','11-14 R88 savings vs Path A');
    assert.equal(((r271PathA-r271PathC)/r271PathA*100).toFixed(2),'92.21','11-14 R88 pct savings vs Path A');
    for(const r271File of ['workshops/github-trending-radar/docs/phonedriver-prevue-6-9x-leaner-payment-gated-phone-mcp-1s-studio-free-compose-preview-selection-faq.md','workshops/github-trending-radar/docs/phonedriver-prevue-6-9x-leaner-payment-gated-phone-mcp-1s-studio-free-compose-preview-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r88-phonedriver-prevue.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r271File),'utf8');
      assert.ok(txt.includes('1,750.00')&&txt.includes('3,610.00')&&txt.includes('5,360.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,942.50')&&txt.includes('92.21%')&&txt.includes('not_measured'),r271File+': contains exact 11-14 R88 phonedriver+prevue closed-form parameters');
    }
    // 2026-11-14 Night Round 89 (R272: timwuhaotian/killi + browser-use/rl-env-use) verification
    const r272PathA=1890.00+39.0*95.00;
    assert.equal(r272PathA.toFixed(2),'5595.00','11-14 R89 Path A total');
    const r272PathC=95.00+3.5*95.00;
    assert.equal(r272PathC.toFixed(2),'427.50','11-14 R89 Path C total');
    assert.equal((r272PathA-r272PathC).toFixed(2),'5167.50','11-14 R89 savings vs Path A');
    assert.equal(((r272PathA-r272PathC)/r272PathA*100).toFixed(2),'92.36','11-14 R89 pct savings vs Path A');
    for(const r272File of ['workshops/github-trending-radar/docs/killi-rl-env-use-18mb-rust-prompt-cache-coding-agent-automated-post-cutoff-rl-environment-builder-selection-faq.md','workshops/github-trending-radar/docs/killi-rl-env-use-18mb-rust-prompt-cache-coding-agent-automated-post-cutoff-rl-environment-builder-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r89-killi-rlenvuse.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r272File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,705.00')&&txt.includes('5,595.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,167.50')&&txt.includes('92.36%')&&txt.includes('not_measured'),r272File+': contains exact 11-14 R89 killi+rl-env-use closed-form parameters');
    }
    // 2026-11-14 Night Round 90 (R273: ComputerUseAgent/AutoCua + alibaba/qz-browser-agent) verification
    const r273PathA=1780.00+38.0*95.00;
    assert.equal(r273PathA.toFixed(2),'5390.00','11-14 R90 Path A total');
    const r273PathC=90.00+3.5*95.00;
    assert.equal(r273PathC.toFixed(2),'422.50','11-14 R90 Path C total');
    assert.equal((r273PathA-r273PathC).toFixed(2),'4967.50','11-14 R90 savings vs Path A');
    assert.equal(((r273PathA-r273PathC)/r273PathA*100).toFixed(2),'92.16','11-14 R90 pct savings vs Path A');
    for(const r273File of ['workshops/github-trending-radar/docs/autocua-qz-browser-agent-6-os-hardware-event-cua-team-alibaba-local-first-signed-in-chrome-mcp-selection-faq.md','workshops/github-trending-radar/docs/autocua-qz-browser-agent-6-os-hardware-event-cua-team-alibaba-local-first-signed-in-chrome-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r90-autocua-qzbrowser.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r273File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,610.00')&&txt.includes('5,390.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('4,967.50')&&txt.includes('92.16%')&&txt.includes('not_measured'),r273File+': contains exact 11-14 R90 AutoCua+qz-browser-agent closed-form parameters');
    }
    // 2026-11-14 Night Round 91 (R274: miuuyy/Octopus-SI-OS + tangency-labs/fieldcraft) verification
    const r274PathA=1950.00+39.0*95.00;
    assert.equal(r274PathA.toFixed(2),'5655.00','11-14 R91 Path A total');
    const r274PathC=95.00+3.5*95.00;
    assert.equal(r274PathC.toFixed(2),'427.50','11-14 R91 Path C total');
    assert.equal((r274PathA-r274PathC).toFixed(2),'5227.50','11-14 R91 savings vs Path A');
    assert.equal(((r274PathA-r274PathC)/r274PathA*100).toFixed(2),'92.44','11-14 R91 pct savings vs Path A');
    for(const r274File of ['workshops/github-trending-radar/docs/octopus-si-os-fieldcraft-45k-loc-rust-self-evolving-agent-os-pure-rust-cae-fea-mcp-selection-faq.md','workshops/github-trending-radar/docs/octopus-si-os-fieldcraft-45k-loc-rust-self-evolving-agent-os-pure-rust-cae-fea-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r91-octopusos-fieldcraft.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r274File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('3,705.00')&&txt.includes('5,655.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,227.50')&&txt.includes('92.44%')&&txt.includes('not_measured'),r274File+': contains exact 11-14 R91 Octopus-SI-OS+FieldCraft closed-form parameters');
    }
    // 2026-11-14 Night Round 92 (R275: Fazmin/cve-intel + kkjiangk/agent-py) verification
    const r275PathA=1830.00+38.0*95.00;
    assert.equal(r275PathA.toFixed(2),'5440.00','11-14 R92 Path A total');
    const r275PathC=90.00+3.5*95.00;
    assert.equal(r275PathC.toFixed(2),'422.50','11-14 R92 Path C total');
    assert.equal((r275PathA-r275PathC).toFixed(2),'5017.50','11-14 R92 savings vs Path A');
    assert.equal(((r275PathA-r275PathC)/r275PathA*100).toFixed(2),'92.23','11-14 R92 pct savings vs Path A');
    for(const r275File of ['workshops/github-trending-radar/docs/cve-intel-agent-py-46-source-ssvc-remediation-lab-mcp-durable-kafka-outbox-aiops-selection-faq.md','workshops/github-trending-radar/docs/cve-intel-agent-py-46-source-ssvc-remediation-lab-mcp-durable-kafka-outbox-aiops-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r92-cveintel-agentpy.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r275File),'utf8');
      assert.ok(txt.includes('1,830.00')&&txt.includes('3,610.00')&&txt.includes('5,440.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('5,017.50')&&txt.includes('92.23%')&&txt.includes('not_measured'),r275File+': contains exact 11-14 R92 cve-intel+agent-py closed-form parameters');
    }
    // 2026-11-14 Night Round 93 (R276: openai/MultiLangBench + allenai/novelty-eval) verification
    const r276PathA=1910.00+39.0*95.00;
    assert.equal(r276PathA.toFixed(2),'5615.00','11-14 R93 Path A total');
    const r276PathC=95.00+3.5*95.00;
    assert.equal(r276PathC.toFixed(2),'427.50','11-14 R93 Path C total');
    assert.equal((r276PathA-r276PathC).toFixed(2),'5187.50','11-14 R93 savings vs Path A');
    assert.equal(((r276PathA-r276PathC)/r276PathA*100).toFixed(2),'92.39','11-14 R93 pct savings vs Path A');
    for(const r276File of ['workshops/github-trending-radar/docs/multilangbench-novelty-eval-openai-clean-room-sqlite-benchmark-ai2-llm-novelty-judge-instability-selection-faq.md','workshops/github-trending-radar/docs/multilangbench-novelty-eval-openai-clean-room-sqlite-benchmark-ai2-llm-novelty-judge-instability-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r93-multilangbench-noveltyeval.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r276File),'utf8');
      assert.ok(txt.includes('1,910.00')&&txt.includes('3,705.00')&&txt.includes('5,615.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('5,187.50')&&txt.includes('92.39%')&&txt.includes('not_measured'),r276File+': contains exact 11-14 R93 MultiLangBench+novelty-eval closed-form parameters');
    }
    // 2026-11-14 Night Round 94 (R277: shinyobjectz/raea + lovisdotio/motion2code) verification
    const r277PathA=1760.00+38.0*95.00;
    assert.equal(r277PathA.toFixed(2),'5370.00','11-14 R94 Path A total');
    const r277PathC=85.00+3.5*95.00;
    assert.equal(r277PathC.toFixed(2),'417.50','11-14 R94 Path C total');
    assert.equal((r277PathA-r277PathC).toFixed(2),'4952.50','11-14 R94 savings vs Path A');
    assert.equal(((r277PathA-r277PathC)/r277PathA*100).toFixed(2),'92.23','11-14 R94 pct savings vs Path A');
    for(const r277File of ['workshops/github-trending-radar/docs/raea-motion2code-react-gpu-render-anything-engine-frame-synced-svg-gsap-motion-rebuild-selection-faq.md','workshops/github-trending-radar/docs/raea-motion2code-react-gpu-render-anything-engine-frame-synced-svg-gsap-motion-rebuild-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r94-raea-motion2code.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r277File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,610.00')&&txt.includes('5,370.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,952.50')&&txt.includes('92.23%')&&txt.includes('not_measured'),r277File+': contains exact 11-14 R94 raea+motion2code closed-form parameters');
    }
    // 2026-11-14 Night Round 95 (R278: Moessif/code-video-showcase + Moh4696/open-3d-skills) verification
    const r278PathA=1740.00+37.0*95.00;
    assert.equal(r278PathA.toFixed(2),'5255.00','11-14 R95 Path A total');
    const r278PathC=85.00+3.5*95.00;
    assert.equal(r278PathC.toFixed(2),'417.50','11-14 R95 Path C total');
    assert.equal((r278PathA-r278PathC).toFixed(2),'4837.50','11-14 R95 savings vs Path A');
    assert.equal(((r278PathA-r278PathC)/r278PathA*100).toFixed(2),'92.06','11-14 R95 pct savings vs Path A');
    for(const r278File of ['workshops/github-trending-radar/docs/code-video-showcase-open-3d-skills-zero-model-beat-synced-film-pipeline-8-skill-3d-web-suite-selection-faq.md','workshops/github-trending-radar/docs/code-video-showcase-open-3d-skills-zero-model-beat-synced-film-pipeline-8-skill-3d-web-suite-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r95-codevideoshowcase-open3dskills.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r278File),'utf8');
      assert.ok(txt.includes('1,740.00')&&txt.includes('3,515.00')&&txt.includes('5,255.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,837.50')&&txt.includes('92.06%')&&txt.includes('not_measured'),r278File+': contains exact 11-14 R95 code-video-showcase+open-3d-skills closed-form parameters');
    }
    // 2026-11-14 Night Round 96 (R279: Leonxlnx/cook + Lanqiao-Luca/ai-java-workflow) verification
    const r279PathA=1790.00+38.0*95.00;
    assert.equal(r279PathA.toFixed(2),'5400.00','11-14 R96 Path A total');
    const r279PathC=90.00+3.5*95.00;
    assert.equal(r279PathC.toFixed(2),'422.50','11-14 R96 Path C total');
    assert.equal((r279PathA-r279PathC).toFixed(2),'4977.50','11-14 R96 savings vs Path A');
    assert.equal(((r279PathA-r279PathC)/r279PathA*100).toFixed(2),'92.18','11-14 R96 pct savings vs Path A');
    for(const r279File of ['workshops/github-trending-radar/docs/cook-ai-java-workflow-7-stage-zero-context-critic-loop-20-role-brain-routed-spring-boot-workflow-selection-faq.md','workshops/github-trending-radar/docs/cook-ai-java-workflow-7-stage-zero-context-critic-loop-20-role-brain-routed-spring-boot-workflow-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r96-cook-aijavaworkflow.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r279File),'utf8');
      assert.ok(txt.includes('1,790.00')&&txt.includes('3,610.00')&&txt.includes('5,400.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('4,977.50')&&txt.includes('92.18%')&&txt.includes('not_measured'),r279File+': contains exact 11-14 R96 cook+ai-java-workflow closed-form parameters');
    }
    // 2026-11-14 Night Round 97 (R280 Milestone: lucianodiisouza/flecha-browser + tony3liu/eido) verification
    const r280PathA=1730.00+37.0*95.00;
    assert.equal(r280PathA.toFixed(2),'5245.00','11-14 R97 Path A total');
    const r280PathC=85.00+3.5*95.00;
    assert.equal(r280PathC.toFixed(2),'417.50','11-14 R97 Path C total');
    assert.equal((r280PathA-r280PathC).toFixed(2),'4827.50','11-14 R97 savings vs Path A');
    assert.equal(((r280PathA-r280PathC)/r280PathA*100).toFixed(2),'92.04','11-14 R97 pct savings vs Path A');
    for(const r280File of ['workshops/github-trending-radar/docs/flecha-browser-eido-chromium-158-dev-browser-mcp-zed-pi-ultrafast-agent-workspace-selection-faq.md','workshops/github-trending-radar/docs/flecha-browser-eido-chromium-158-dev-browser-mcp-zed-pi-ultrafast-agent-workspace-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r97-flechabrowser-eido.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r280File),'utf8');
      assert.ok(txt.includes('1,730.00')&&txt.includes('3,515.00')&&txt.includes('5,245.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,827.50')&&txt.includes('92.04%')&&txt.includes('not_measured'),r280File+': contains exact 11-14 R97 flecha-browser+eido closed-form parameters');
    }
    // 2026-11-14 Night Round 98 (R281: alchaincyf/huashu-motion + Vibha-Ramprakash/claude-video-effects) verification
    const r281PathA=1850.00+39.0*95.00;
    assert.equal(r281PathA.toFixed(2),'5555.00','11-14 R98 Path A total');
    const r281PathC=90.00+3.5*95.00;
    assert.equal(r281PathC.toFixed(2),'422.50','11-14 R98 Path C total');
    assert.equal((r281PathA-r281PathC).toFixed(2),'5132.50','11-14 R98 savings vs Path A');
    assert.equal(((r281PathA-r281PathC)/r281PathA*100).toFixed(2),'92.39','11-14 R98 pct savings vs Path A');
    for(const r281File of ['workshops/github-trending-radar/docs/huashu-motion-claude-video-effects-abc-score-point-to-edit-launch-films-51-face-tracked-reels-selection-faq.md','workshops/github-trending-radar/docs/huashu-motion-claude-video-effects-abc-score-point-to-edit-launch-films-51-face-tracked-reels-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r98-huashumotion-claudevideoeffects.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r281File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,705.00')&&txt.includes('5,555.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('5,132.50')&&txt.includes('92.39%')&&txt.includes('not_measured'),r281File+': contains exact 11-14 R98 huashu-motion+claude-video-effects closed-form parameters');
    }
    // 2026-11-14 Night Round 99 (R282: outcrawlai/scout + jackwener/Kaze) verification
    const r282PathA=1780.00+38.0*95.00;
    assert.equal(r282PathA.toFixed(2),'5390.00','11-14 R99 Path A total');
    const r282PathC=85.00+3.5*95.00;
    assert.equal(r282PathC.toFixed(2),'417.50','11-14 R99 Path C total');
    assert.equal((r282PathA-r282PathC).toFixed(2),'4972.50','11-14 R99 savings vs Path A');
    assert.equal(((r282PathA-r282PathC)/r282PathA*100).toFixed(2),'92.25','11-14 R99 pct savings vs Path A');
    for(const r282File of ['workshops/github-trending-radar/docs/outcrawl-scout-kaze-cloud-replay-browser-agent-signed-in-tab-group-mcp-browser-selection-faq.md','workshops/github-trending-radar/docs/outcrawl-scout-kaze-cloud-replay-browser-agent-signed-in-tab-group-mcp-browser-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r99-outcrawlscout-kaze.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r282File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,610.00')&&txt.includes('5,390.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,972.50')&&txt.includes('92.25%')&&txt.includes('not_measured'),r282File+': contains exact 11-14 R99 outcrawl-scout+kaze closed-form parameters');
    }
    // 2026-11-14 Night Round 100 Milestone (R283: amurgola/LumaBrowser + moonoops/Droy) verification
    const r283PathA=1750.00+38.0*95.00;
    assert.equal(r283PathA.toFixed(2),'5360.00','11-14 R100 Path A total');
    const r283PathC=80.00+3.5*95.00;
    assert.equal(r283PathC.toFixed(2),'412.50','11-14 R100 Path C total');
    assert.equal((r283PathA-r283PathC).toFixed(2),'4947.50','11-14 R100 savings vs Path A');
    assert.equal(((r283PathA-r283PathC)/r283PathA*100).toFixed(2),'92.30','11-14 R100 pct savings vs Path A');
    for(const r283File of ['workshops/github-trending-radar/docs/lumabrowser-droy-gpu-aware-local-ai-browser-mcp-phone-resident-android-deepseek-harness-selection-faq.md','workshops/github-trending-radar/docs/lumabrowser-droy-gpu-aware-local-ai-browser-mcp-phone-resident-android-deepseek-harness-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r100-lumabrowser-droy.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r283File),'utf8');
      assert.ok(txt.includes('1,750.00')&&txt.includes('3,610.00')&&txt.includes('5,360.00')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,947.50')&&txt.includes('92.30%')&&txt.includes('not_measured'),r283File+': contains exact 11-14 R100 lumabrowser+droy closed-form parameters');
    }
    // 2026-11-14 Night Round 101 (R284: cranebeaker/coop-anything + genex-games/genex-desktop) verification
    const r284PathA=1820.00+39.0*95.00;
    assert.equal(r284PathA.toFixed(2),'5525.00','11-14 R101 Path A total');
    const r284PathC=90.00+3.5*95.00;
    assert.equal(r284PathC.toFixed(2),'422.50','11-14 R101 Path C total');
    assert.equal((r284PathA-r284PathC).toFixed(2),'5102.50','11-14 R101 savings vs Path A');
    assert.equal(((r284PathA-r284PathC)/r284PathA*100).toFixed(2),'92.35','11-14 R101 pct savings vs Path A');
    for(const r284File of ['workshops/github-trending-radar/docs/coop-anything-genex-desktop-singleplayer-to-coop-mcp-multi-agent-game-engine-playtest-selection-faq.md','workshops/github-trending-radar/docs/coop-anything-genex-desktop-singleplayer-to-coop-mcp-multi-agent-game-engine-playtest-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r101-coopanything-genexdesktop.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r284File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,705.00')&&txt.includes('5,525.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('5,102.50')&&txt.includes('92.35%')&&txt.includes('not_measured'),r284File+': contains exact 11-14 R101 coop-anything+genex-desktop closed-form parameters');
    }
    // 2026-11-14 Night Round 102 (R285: konlu/story-studio + mileson/chaojifeng-video-design) verification
    const r285PathA=1760.00+38.0*95.00;
    assert.equal(r285PathA.toFixed(2),'5370.00','11-14 R102 Path A total');
    const r285PathC=85.00+3.5*95.00;
    assert.equal(r285PathC.toFixed(2),'417.50','11-14 R102 Path C total');
    assert.equal((r285PathA-r285PathC).toFixed(2),'4952.50','11-14 R102 savings vs Path A');
    assert.equal(((r285PathA-r285PathC)/r285PathA*100).toFixed(2),'92.23','11-14 R102 pct savings vs Path A');
    for(const r285File of ['workshops/github-trending-radar/docs/story-studio-chaojifeng-video-design-jianying-draft-sherpa-onnx-59-film-styles-selection-faq.md','workshops/github-trending-radar/docs/story-studio-chaojifeng-video-design-jianying-draft-sherpa-onnx-59-film-styles-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r102-storystudio-chaojifengvideo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r285File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,610.00')&&txt.includes('5,370.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,952.50')&&txt.includes('92.23%')&&txt.includes('not_measured'),r285File+': contains exact 11-14 R102 story-studio+chaojifeng-video-design closed-form parameters');
    }
    // 2026-11-14 Night Round 103 (R286: huaxialucaicaizi/ai-startup-skills + robonuggets/be-ambitious) verification
    const r286PathA=1740.00+37.5*95.00;
    assert.equal(r286PathA.toFixed(2),'5302.50','11-14 R103 Path A total');
    const r286PathC=85.00+3.5*95.00;
    assert.equal(r286PathC.toFixed(2),'417.50','11-14 R103 Path C total');
    assert.equal((r286PathA-r286PathC).toFixed(2),'4885.00','11-14 R103 savings vs Path A');
    assert.equal(((r286PathA-r286PathC)/r286PathA*100).toFixed(2),'92.13','11-14 R103 pct savings vs Path A');
    for(const r286File of ['workshops/github-trending-radar/docs/ai-startup-skills-be-ambitious-7-step-opc-router-altitude-depth-range-verification-selection-faq.md','workshops/github-trending-radar/docs/ai-startup-skills-be-ambitious-7-step-opc-router-altitude-depth-range-verification-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r103-aistartupskills-beambitious.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r286File),'utf8');
      assert.ok(txt.includes('1,740.00')&&txt.includes('3,562.50')&&txt.includes('5,302.50')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,885.00')&&txt.includes('92.13%')&&txt.includes('not_measured'),r286File+': contains exact 11-14 R103 ai-startup-skills+be-ambitious closed-form parameters');
    }
    // 2026-11-14 Night Round 104 (R287: rudy-io/moli-os + fzn0x/idx) verification
    const r287PathA=1720.00+37.0*95.00;
    assert.equal(r287PathA.toFixed(2),'5235.00','11-14 R104 Path A total');
    const r287PathC=80.00+3.5*95.00;
    assert.equal(r287PathC.toFixed(2),'412.50','11-14 R104 Path C total');
    assert.equal((r287PathA-r287PathC).toFixed(2),'4822.50','11-14 R104 savings vs Path A');
    assert.equal(((r287PathA-r287PathC)/r287PathA*100).toFixed(2),'92.12','11-14 R104 pct savings vs Path A');
    for(const r287File of ['workshops/github-trending-radar/docs/moli-os-idx-rust-6mib-agent-home-automation-mcp-keyless-stock-market-cli-mcp-selection-faq.md','workshops/github-trending-radar/docs/moli-os-idx-rust-6mib-agent-home-automation-mcp-keyless-stock-market-cli-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r104-molios-idx.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r287File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,515.00')&&txt.includes('5,235.00')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,822.50')&&txt.includes('92.12%')&&txt.includes('not_measured'),r287File+': contains exact 11-14 R104 moli-os+idx closed-form parameters');
    }
    // 2026-11-14 Night Round 105 (R288: jangtrinh/design-os-studio + Noniv/web-ocean) verification
    const r288PathA=1790.00+38.0*95.00;
    assert.equal(r288PathA.toFixed(2),'5400.00','11-14 R105 Path A total');
    const r288PathC=85.00+3.5*95.00;
    assert.equal(r288PathC.toFixed(2),'417.50','11-14 R105 Path C total');
    assert.equal((r288PathA-r288PathC).toFixed(2),'4982.50','11-14 R105 savings vs Path A');
    assert.equal(((r288PathA-r288PathC)/r288PathA*100).toFixed(2),'92.27','11-14 R105 pct savings vs Path A');
    for(const r288File of ['workshops/github-trending-radar/docs/design-os-studio-web-ocean-rust-wgpu-fig-mcp-61kb-webgpu-fft-cdlod-ocean-selection-faq.md','workshops/github-trending-radar/docs/design-os-studio-web-ocean-rust-wgpu-fig-mcp-61kb-webgpu-fft-cdlod-ocean-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r105-designos-webocean.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r288File),'utf8');
      assert.ok(txt.includes('1,790.00')&&txt.includes('3,610.00')&&txt.includes('5,400.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('4,982.50')&&txt.includes('92.27%')&&txt.includes('not_measured'),r288File+': contains exact 11-14 R105 design-os-studio+web-ocean closed-form parameters');
    }
    // 2026-11-14 Night Round 106 (R289: onehumanbeing/esp32-iphone-agent + Leonxlnx/earshot) verification
    const r289PathA=1860.00+39.5*95.00;
    assert.equal(r289PathA.toFixed(2),'5612.50','11-14 R106 Path A total');
    const r289PathC=85.00+3.5*95.00;
    assert.equal(r289PathC.toFixed(2),'417.50','11-14 R106 Path C total');
    assert.equal((r289PathA-r289PathC).toFixed(2),'5195.00','11-14 R106 savings vs Path A');
    assert.equal(((r289PathA-r289PathC)/r289PathA*100).toFixed(2),'92.56','11-14 R106 pct savings vs Path A');
    for(const r289File of ['workshops/github-trending-radar/docs/esp32-iphone-agent-earshot-7usd-airplay-hid-ios-agent-cpu-audio-critic-forge-mcp-selection-faq.md','workshops/github-trending-radar/docs/esp32-iphone-agent-earshot-7usd-airplay-hid-ios-agent-cpu-audio-critic-forge-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r106-esp32iphone-earshot.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r289File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,752.50')&&txt.includes('5,612.50')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,195.00')&&txt.includes('92.56%')&&txt.includes('not_measured'),r289File+': contains exact 11-14 R106 esp32-iphone-agent+earshot closed-form parameters');
    }
    // 2026-11-14 Night Round 107 (R290 Milestone: vAPI-Network/vapi-network + zhuyansen/new-term-radar) verification
    const r290PathA=1840.00+38.5*95.00;
    assert.equal(r290PathA.toFixed(2),'5497.50','11-14 R107 Path A total');
    const r290PathC=85.00+3.5*95.00;
    assert.equal(r290PathC.toFixed(2),'417.50','11-14 R107 Path C total');
    assert.equal((r290PathA-r290PathC).toFixed(2),'5080.00','11-14 R107 savings vs Path A');
    assert.equal(((r290PathA-r290PathC)/r290PathA*100).toFixed(2),'92.41','11-14 R107 pct savings vs Path A');
    for(const r290File of ['workshops/github-trending-radar/docs/vapi-network-new-term-radar-x402-usdc-base-buyer-vault-day1-ai-term-mcp-radar-selection-faq.md','workshops/github-trending-radar/docs/vapi-network-new-term-radar-x402-usdc-base-buyer-vault-day1-ai-term-mcp-radar-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r107-vapinetwork-newtermradar.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r290File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,657.50')&&txt.includes('5,497.50')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,080.00')&&txt.includes('92.41%')&&txt.includes('not_measured'),r290File+': contains exact 11-14 R107 vapi-network+new-term-radar closed-form parameters');
    }
    // 2026-11-14 Night Round 108 (R291: chienbm98/foxprofile + weidu12123/vps-switch) verification
    const r291PathA=1750.00+37.5*95.00;
    assert.equal(r291PathA.toFixed(2),'5312.50','11-14 R108 Path A total');
    const r291PathC=80.00+3.5*95.00;
    assert.equal(r291PathC.toFixed(2),'412.50','11-14 R108 Path C total');
    assert.equal((r291PathA-r291PathC).toFixed(2),'4900.00','11-14 R108 savings vs Path A');
    assert.equal(((r291PathA-r291PathC)/r291PathA*100).toFixed(2),'92.24','11-14 R108 pct savings vs Path A');
    for(const r291File of ['workshops/github-trending-radar/docs/foxprofile-vps-switch-camoufox-antidetect-browser-mcp-rust-gpui-vps-ssh-sftp-mcp-selection-faq.md','workshops/github-trending-radar/docs/foxprofile-vps-switch-camoufox-antidetect-browser-mcp-rust-gpui-vps-ssh-sftp-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r108-foxprofile-vpsswitch.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r291File),'utf8');
      assert.ok(txt.includes('1,750.00')&&txt.includes('3,562.50')&&txt.includes('5,312.50')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,900.00')&&txt.includes('92.24%')&&txt.includes('not_measured'),r291File+': contains exact 11-14 R108 foxprofile+vps-switch closed-form parameters');
    }
    // 2026-11-14 Night Round 109 (R292: 1bye/rake + LumioGames/LGUI) verification
    const r292PathA=1730.00+37.0*95.00;
    assert.equal(r292PathA.toFixed(2),'5245.00','11-14 R109 Path A total');
    const r292PathC=80.00+3.5*95.00;
    assert.equal(r292PathC.toFixed(2),'412.50','11-14 R109 Path C total');
    assert.equal((r292PathA-r292PathC).toFixed(2),'4832.50','11-14 R109 savings vs Path A');
    assert.equal(((r292PathA-r292PathC)/r292PathA*100).toFixed(2),'92.14','11-14 R109 pct savings vs Path A');
    for(const r292File of ['workshops/github-trending-radar/docs/rake-lgui-rust-gpui-native-wasm-agent-framework-engine-free-browser-unity-game-ui-selection-faq.md','workshops/github-trending-radar/docs/rake-lgui-rust-gpui-native-wasm-agent-framework-engine-free-browser-unity-game-ui-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r109-rake-lgui.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r292File),'utf8');
      assert.ok(txt.includes('1,730.00')&&txt.includes('3,515.00')&&txt.includes('5,245.00')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,832.50')&&txt.includes('92.14%')&&txt.includes('not_measured'),r292File+': contains exact 11-14 R109 rake+lgui closed-form parameters');
    }
    // 2026-11-14 Night Round 110 Milestone (R293: rul-lang/rul + midasmatterhorn/artcraft-skills) verification
    const r293PathA=1760.00+38.0*95.00;
    assert.equal(r293PathA.toFixed(2),'5370.00','11-14 R110 Path A total');
    const r293PathC=80.00+3.5*95.00;
    assert.equal(r293PathC.toFixed(2),'412.50','11-14 R110 Path C total');
    assert.equal((r293PathA-r293PathC).toFixed(2),'4957.50','11-14 R110 savings vs Path A');
    assert.equal(((r293PathA-r293PathC)/r293PathA*100).toFixed(2),'92.32','11-14 R110 pct savings vs Path A');
    for(const r293File of ['workshops/github-trending-radar/docs/rul-artcraft-skills-128bit-binary-agent-language-20-rust-creative-cad-suite-mcp-skills-selection-faq.md','workshops/github-trending-radar/docs/rul-artcraft-skills-128bit-binary-agent-language-20-rust-creative-cad-suite-mcp-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r110-rul-artcraftskills.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r293File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,610.00')&&txt.includes('5,370.00')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,957.50')&&txt.includes('92.32%')&&txt.includes('not_measured'),r293File+': contains exact 11-14 R110 rul+artcraft-skills closed-form parameters');
    }
    // 2026-11-14 Night Round 111 (R294: microsoft/TokenEconomizer + Folkbench/folkbench) verification
    const r294PathA=1890.00+39.0*95.00;
    assert.equal(r294PathA.toFixed(2),'5595.00','11-14 R111 Path A total');
    const r294PathC=85.00+3.5*95.00;
    assert.equal(r294PathC.toFixed(2),'417.50','11-14 R111 Path C total');
    assert.equal((r294PathA-r294PathC).toFixed(2),'5177.50','11-14 R111 savings vs Path A');
    assert.equal(((r294PathA-r294PathC)/r294PathA*100).toFixed(2),'92.54','11-14 R111 pct savings vs Path A');
    for(const r294File of ['workshops/github-trending-radar/docs/tokeneconomizer-folkbench-experience-driven-agent-cost-control-api-relay-fingerprint-switch-selection-faq.md','workshops/github-trending-radar/docs/tokeneconomizer-folkbench-experience-driven-agent-cost-control-api-relay-fingerprint-switch-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r111-tokeneconomizer-folkbench.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r294File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,705.00')&&txt.includes('5,595.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,177.50')&&txt.includes('92.54%')&&txt.includes('not_measured'),r294File+': contains exact 11-14 R111 tokeneconomizer+folkbench closed-form parameters');
    }
    // 2026-11-14 Night Round 112 (R295: wheresryan22/anatomy + tangency-labs/solidcraft) verification
    const r295PathA=1880.00+39.5*95.00;
    assert.equal(r295PathA.toFixed(2),'5632.50','11-14 R112 Path A total');
    const r295PathC=85.00+3.5*95.00;
    assert.equal(r295PathC.toFixed(2),'417.50','11-14 R112 Path C total');
    assert.equal((r295PathA-r295PathC).toFixed(2),'5215.00','11-14 R112 savings vs Path A');
    assert.equal(((r295PathA-r295PathC)/r295PathA*100).toFixed(2),'92.59','11-14 R112 pct savings vs Path A');
    for(const r295File of ['workshops/github-trending-radar/docs/anatomy-solidcraft-isometric-svg-webgl-physical-explainer-rust-parametric-3d-cad-mcp-selection-faq.md','workshops/github-trending-radar/docs/anatomy-solidcraft-isometric-svg-webgl-physical-explainer-rust-parametric-3d-cad-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r112-anatomy-solidcraft.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r295File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,752.50')&&txt.includes('5,632.50')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,215.00')&&txt.includes('92.59%')&&txt.includes('not_measured'),r295File+': contains exact 11-14 R112 anatomy+solidcraft closed-form parameters');
    }
    // 2026-11-14 Night Round 113 (R296: openfilm/openfilm + academa-labs/manimgx) verification
    const r296PathA=1830.00+38.5*95.00;
    assert.equal(r296PathA.toFixed(2),'5487.50','11-14 R113 Path A total');
    const r296PathC=85.00+3.5*95.00;
    assert.equal(r296PathC.toFixed(2),'417.50','11-14 R113 Path C total');
    assert.equal((r296PathA-r296PathC).toFixed(2),'5070.00','11-14 R113 savings vs Path A');
    assert.equal(((r296PathA-r296PathC)/r296PathA*100).toFixed(2),'92.39','11-14 R113 pct savings vs Path A');
    for(const r296File of ['workshops/github-trending-radar/docs/openfilm-manimgx-frame-t-studio-nle-timeline-90x-rust-wgpu-manim-engine-selection-faq.md','workshops/github-trending-radar/docs/openfilm-manimgx-frame-t-studio-nle-timeline-90x-rust-wgpu-manim-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r113-openfilm-manimgx.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r296File),'utf8');
      assert.ok(txt.includes('1,830.00')&&txt.includes('3,657.50')&&txt.includes('5,487.50')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,070.00')&&txt.includes('92.39%')&&txt.includes('not_measured'),r296File+': contains exact 11-14 R113 openfilm+manimgx closed-form parameters');
    }
    // 2026-11-14 Night Round 114 (R297: Jakeschincariol/replica-skill + Jakeschincariol/founder-skill) verification
    const r297PathA=1850.00+39.0*95.00;
    assert.equal(r297PathA.toFixed(2),'5555.00','11-14 R114 Path A total');
    const r297PathC=85.00+3.5*95.00;
    assert.equal(r297PathC.toFixed(2),'417.50','11-14 R114 Path C total');
    assert.equal((r297PathA-r297PathC).toFixed(2),'5137.50','11-14 R114 savings vs Path A');
    assert.equal(((r297PathA-r297PathC)/r297PathA*100).toFixed(2),'92.48','11-14 R114 pct savings vs Path A');
    for(const r297File of ['workshops/github-trending-radar/docs/replica-skill-founder-skill-11-stage-clean-room-app-clone-100-buyer-agent-board-selection-faq.md','workshops/github-trending-radar/docs/replica-skill-founder-skill-11-stage-clean-room-app-clone-100-buyer-agent-board-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r114-replicaskill-founderskill.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r297File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,705.00')&&txt.includes('5,555.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,137.50')&&txt.includes('92.48%')&&txt.includes('not_measured'),r297File+': contains exact 11-14 R114 replica-skill+founder-skill closed-form parameters');
    }
    // 2026-11-14 Night Round 115 (R298: alchaincyf/huashu-art-motion + QingYunA/answer-me-with-html) verification
    const r298PathA=1820.00+38.5*95.00;
    assert.equal(r298PathA.toFixed(2),'5477.50','11-14 R115 Path A total');
    const r298PathC=80.00+3.5*95.00;
    assert.equal(r298PathC.toFixed(2),'412.50','11-14 R115 Path C total');
    assert.equal((r298PathA-r298PathC).toFixed(2),'5065.00','11-14 R115 savings vs Path A');
    assert.equal(((r298PathA-r298PathC)/r298PathA*100).toFixed(2),'92.47','11-14 R115 pct savings vs Path A');
    for(const r298File of ['workshops/github-trending-radar/docs/huashu-art-motion-answer-me-with-html-35-art-styles-9-explainer-grammars-8x-fewer-tokens-html-cli-selection-faq.md','workshops/github-trending-radar/docs/huashu-art-motion-answer-me-with-html-35-art-styles-9-explainer-grammars-8x-fewer-tokens-html-cli-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r115-huashuartmotion-answerhtml.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r298File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,657.50')&&txt.includes('5,477.50')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('5,065.00')&&txt.includes('92.47%')&&txt.includes('not_measured'),r298File+': contains exact 11-14 R115 huashu-art-motion+answer-me-with-html closed-form parameters');
    }
    // 2026-11-14 Night Round 116 (R299: shinshin86/mesh-avatar-studio + UnderleveledBuilder/awesome-short-drama-skills) verification
    const r299PathA=1810.00+38.0*95.00;
    assert.equal(r299PathA.toFixed(2),'5420.00','11-14 R116 Path A total');
    const r299PathC=85.00+3.5*95.00;
    assert.equal(r299PathC.toFixed(2),'417.50','11-14 R116 Path C total');
    assert.equal((r299PathA-r299PathC).toFixed(2),'5002.50','11-14 R116 savings vs Path A');
    assert.equal(((r299PathA-r299PathC)/r299PathA*100).toFixed(2),'92.30','11-14 R116 pct savings vs Path A');
    for(const r299File of ['workshops/github-trending-radar/docs/mesh-avatar-studio-awesome-short-drama-skills-2d-mesh-rigging-agent-86-benchmarked-drama-skills-selection-faq.md','workshops/github-trending-radar/docs/mesh-avatar-studio-awesome-short-drama-skills-2d-mesh-rigging-agent-86-benchmarked-drama-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r116-meshavatar-shortdramaskills.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r299File),'utf8');
      assert.ok(txt.includes('1,810.00')&&txt.includes('3,610.00')&&txt.includes('5,420.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,002.50')&&txt.includes('92.30%')&&txt.includes('not_measured'),r299File+': contains exact 11-14 R116 mesh-avatar-studio+awesome-short-drama-skills closed-form parameters');
    }
    // 2026-11-14 Night Round 117 (R300 Milestone: jiwoochris/artex-global + DUNHKpcc/Claude-Guardian) verification
    const r300PathA=1850.00+39.0*95.00;
    assert.equal(r300PathA.toFixed(2),'5555.00','11-14 R117 Path A total');
    const r300PathC=85.00+3.5*95.00;
    assert.equal(r300PathC.toFixed(2),'417.50','11-14 R117 Path C total');
    assert.equal((r300PathA-r300PathC).toFixed(2),'5137.50','11-14 R117 savings vs Path A');
    assert.equal(((r300PathA-r300PathC)/r300PathA*100).toFixed(2),'92.48','11-14 R117 pct savings vs Path A');
    for(const r300File of ['workshops/github-trending-radar/docs/artex-global-claude-guardian-multi-agent-defensive-security-graph-fail-closed-egress-verifier-selection-faq.md','workshops/github-trending-radar/docs/artex-global-claude-guardian-multi-agent-defensive-security-graph-fail-closed-egress-verifier-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r117-artexglobal-claudeguardian.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r300File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,705.00')&&txt.includes('5,555.00')&&txt.includes('85.00')&&txt.includes('332.50')&&txt.includes('417.50')&&txt.includes('5,137.50')&&txt.includes('92.48%')&&txt.includes('not_measured'),r300File+': contains exact 11-14 R117 artex-global+claude-guardian closed-form parameters');
    }
    // 2026-11-14 Night Round 118 (R301: DenisSergeevitch/ex-ussr-kinship-research + morluto/awesome-reverse-engineering) verification
    const r301PathA=1760.00+37.5*95.00;
    assert.equal(r301PathA.toFixed(2),'5322.50','11-14 R118 Path A total');
    const r301PathC=80.00+3.5*95.00;
    assert.equal(r301PathC.toFixed(2),'412.50','11-14 R118 Path C total');
    assert.equal((r301PathA-r301PathC).toFixed(2),'4910.00','11-14 R118 savings vs Path A');
    assert.equal(((r301PathA-r301PathC)/r301PathA*100).toFixed(2),'92.25','11-14 R118 pct savings vs Path A');
    for(const r301File of ['workshops/github-trending-radar/docs/ex-ussr-kinship-research-awesome-reverse-engineering-evidence-csv-registers-task-routed-re-matrix-selection-faq.md','workshops/github-trending-radar/docs/ex-ussr-kinship-research-awesome-reverse-engineering-evidence-csv-registers-task-routed-re-matrix-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r118-kinshipresearch-awesomere.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r301File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,562.50')&&txt.includes('5,322.50')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,910.00')&&txt.includes('92.25%')&&txt.includes('not_measured'),r301File+': contains exact 11-14 R118 kinship-research+awesome-re closed-form parameters');
    }
    // 2026-11-14 Night Round 119 (R302: benjitaylor/skills + herdodp/snapgent-connector) verification
    const r302PathA=1750.00+37.5*95.00;
    assert.equal(r302PathA.toFixed(2),'5312.50','11-14 R119 Path A total');
    const r302PathC=80.00+3.5*95.00;
    assert.equal(r302PathC.toFixed(2),'412.50','11-14 R119 Path C total');
    assert.equal((r302PathA-r302PathC).toFixed(2),'4900.00','11-14 R119 savings vs Path A');
    assert.equal(((r302PathA-r302PathC)/r302PathA*100).toFixed(2),'92.24','11-14 R119 pct savings vs Path A');
    for(const r302File of ['workshops/github-trending-radar/docs/benjitaylor-skills-snapgent-connector-stageshow-react-product-ui-film-verifier-mv3-vscode-mcp-bridge-selection-faq.md','workshops/github-trending-radar/docs/benjitaylor-skills-snapgent-connector-stageshow-react-product-ui-film-verifier-mv3-vscode-mcp-bridge-selection-faq.en.md','assets/github-ai-radar-2026-11-14-r119-benjitaylorskills-snapgent.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-14-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r302File),'utf8');
      assert.ok(txt.includes('1,750.00')&&txt.includes('3,562.50')&&txt.includes('5,312.50')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,900.00')&&txt.includes('92.24%')&&txt.includes('not_measured'),r302File+': contains exact 11-14 R119 benjitaylor-skills+snapgent-connector closed-form parameters');
    }
    // 2026-11-15 Raw Evidence SHA-256, Track A/B & Night Round 1 (R303: Tencent/LoopForge + NVIDIA/SkillEvaluator) verification
    const rawHtml1115=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-15-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(crypto.createHash('sha256').update(rawHtml1115).digest('hex'),'0307dc2ec8ad9e299810571ee903633f701ea55e9eec2a4235faf871940df463','2026-11-15 raw HTML LF sha256');
    const rawSearch1115Str=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-15-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(crypto.createHash('sha256').update(rawSearch1115Str).digest('hex'),'93010521222c56c591bcae9a80f7f4b395724b9c14b70bec86e5bf2e0f1306cc','2026-11-15 raw Search JSON LF sha256');
    const rawSearch1115=JSON.parse(rawSearch1115Str);
    const rawSearch1115Map=new Map(rawSearch1115.items.map(it=>[it.full_name,it]));
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_15.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': 11-15 Track A provenance');
      assert.ok(rawHtml1115.includes(`href="/${item.full_name}"`),item.full_name+': present in 11-15 raw HTML');
      assert.ok(rawHtml1115.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in 11-15 raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_15.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': 11-15 Track B stars_today must be not_measured');
      assert.ok(rawSearch1115Map.has(item.full_name),item.full_name+': present in 11-15 archived Search API JSON');
      const rawEntry=rawSearch1115Map.get(item.full_name);
      assert.equal(item.stars_total_search_api,rawEntry.stargazers_count,item.full_name+': 11-15 stars_total_search_api matches Search API JSON');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': 11-15 stars_per_day closed-form');
    }
    const r303PathA=1920.00+41.0*100.00;
    assert.equal(r303PathA.toFixed(2),'6020.00','11-15 R1 Path A total');
    const r303PathC=140.00+3.5*100.00;
    assert.equal(r303PathC.toFixed(2),'490.00','11-15 R1 Path C total');
    assert.equal((r303PathA-r303PathC).toFixed(2),'5530.00','11-15 R1 savings vs Path A');
    assert.equal(((r303PathA-r303PathC)/r303PathA*100).toFixed(2),'91.86','11-15 R1 pct savings vs Path A');
    for(const r303File of ['workshops/github-trending-radar/docs/loopforge-skillevaluator-multi-cli-sop-delivery-3tier-harbor-skill-eval-selection-faq.md','workshops/github-trending-radar/docs/loopforge-skillevaluator-multi-cli-sop-delivery-3tier-harbor-skill-eval-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r1-loopforge-skillevaluator.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r303File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('4,100.00')&&txt.includes('6,020.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('5,530.00')&&txt.includes('91.86%')&&txt.includes('not_measured'),r303File+': contains exact 11-15 R1 loopforge+skillevaluator closed-form parameters');
    }
    // 2026-11-15 Night Round 2 (R304: ag-ui-protocol/ag-ui + google-labs-code/stitch-skills) verification
    const r304PathA=1840.00+39.0*100.00;
    assert.equal(r304PathA.toFixed(2),'5740.00','11-15 R2 Path A total');
    const r304PathC=130.00+3.5*100.00;
    assert.equal(r304PathC.toFixed(2),'480.00','11-15 R2 Path C total');
    assert.equal((r304PathA-r304PathC).toFixed(2),'5260.00','11-15 R2 savings vs Path A');
    assert.equal(((r304PathA-r304PathC)/r304PathA*100).toFixed(2),'91.64','11-15 R2 pct savings vs Path A');
    for(const r304File of ['workshops/github-trending-radar/docs/ag-ui-stitch-skills-agent-user-interaction-protocol-bidirectional-design-build-skills-selection-faq.md','workshops/github-trending-radar/docs/ag-ui-stitch-skills-agent-user-interaction-protocol-bidirectional-design-build-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r2-agui-stitchskills.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r304File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,900.00')&&txt.includes('5,740.00')&&txt.includes('130.00')&&txt.includes('350.00')&&txt.includes('480.00')&&txt.includes('5,260.00')&&txt.includes('91.64%')&&txt.includes('not_measured'),r304File+': contains exact 11-15 R2 ag-ui+stitch-skills closed-form parameters');
    }
    // 2026-11-15 Night Round 3 (R305 Milestone: dream-num/univer + elementalsouls/Claude-BugHunter) verification
    const r305PathA=1880.00+40.0*100.00;
    assert.equal(r305PathA.toFixed(2),'5880.00','11-15 R3 Path A total');
    const r305PathC=135.00+3.5*100.00;
    assert.equal(r305PathC.toFixed(2),'485.00','11-15 R3 Path C total');
    assert.equal((r305PathA-r305PathC).toFixed(2),'5395.00','11-15 R3 savings vs Path A');
    assert.equal(((r305PathA-r305PathC)/r305PathA*100).toFixed(2),'91.75','11-15 R3 pct savings vs Path A');
    for(const r305File of ['workshops/github-trending-radar/docs/univer-claude-bughunter-programmable-ai-office-sdk-681-pattern-redteam-skill-bundle-selection-faq.md','workshops/github-trending-radar/docs/univer-claude-bughunter-programmable-ai-office-sdk-681-pattern-redteam-skill-bundle-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r3-univer-bughunter.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r305File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('4,000.00')&&txt.includes('5,880.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,395.00')&&txt.includes('91.75%')&&txt.includes('not_measured'),r305File+': contains exact 11-15 R3 univer+claude-bughunter closed-form parameters');
    }
    // 2026-11-15 Night Round 4 (R306: meshy-dev/ThreeRT + hikaku-io/hikaku-extension) verification
    const r306PathA=1780.00+38.0*100.00;
    assert.equal(r306PathA.toFixed(2),'5580.00','11-15 R4 Path A total');
    const r306PathC=110.00+3.5*100.00;
    assert.equal(r306PathC.toFixed(2),'460.00','11-15 R4 Path C total');
    assert.equal((r306PathA-r306PathC).toFixed(2),'5120.00','11-15 R4 savings vs Path A');
    assert.equal(((r306PathA-r306PathC)/r306PathA*100).toFixed(2),'91.76','11-15 R4 pct savings vs Path A');
    for(const r306File of ['workshops/github-trending-radar/docs/threert-hikaku-extension-hardware-raytraced-threejs-ondevice-ai-media-provenance-selection-faq.md','workshops/github-trending-radar/docs/threert-hikaku-extension-hardware-raytraced-threejs-ondevice-ai-media-provenance-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r4-threert-hikaku.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r306File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,800.00')&&txt.includes('5,580.00')&&txt.includes('110.00')&&txt.includes('350.00')&&txt.includes('460.00')&&txt.includes('5,120.00')&&txt.includes('91.76%')&&txt.includes('not_measured'),r306File+': contains exact 11-15 R4 threert+hikaku-extension closed-form parameters');
    }
    // 2026-11-15 Night Round 5 (R307: haziqahmedqasmi/PeakCut + JuneYaooo/rea-toon) verification
    const r307PathA=1740.00+38.0*95.00;
    assert.equal(r307PathA.toFixed(2),'5350.00','11-15 R5 Path A total');
    const r307PathC=95.00+3.5*95.00;
    assert.equal(r307PathC.toFixed(2),'427.50','11-15 R5 Path C total');
    assert.equal((r307PathA-r307PathC).toFixed(2),'4922.50','11-15 R5 savings vs Path A');
    assert.equal(((r307PathA-r307PathC)/r307PathA*100).toFixed(2),'92.01','11-15 R5 pct savings vs Path A');
    for(const r307File of ['workshops/github-trending-radar/docs/peakcut-rea-toon-selfhosted-live-stream-clipper-short-drama-videomd-forensics-selection-faq.md','workshops/github-trending-radar/docs/peakcut-rea-toon-selfhosted-live-stream-clipper-short-drama-videomd-forensics-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r5-peakcut-reatoon.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r307File),'utf8');
      assert.ok(txt.includes('1,740.00')&&txt.includes('3,610.00')&&txt.includes('5,350.00')&&txt.includes('95.00')&&txt.includes('332.50')&&txt.includes('427.50')&&txt.includes('4,922.50')&&txt.includes('92.01%')&&txt.includes('not_measured'),r307File+': contains exact 11-15 R5 peakcut+rea-toon closed-form parameters');
    }
    // 2026-11-15 Night Round 6 (R308: Vaibhaav-Tiwari/deepseek-v3-jax + yasakani-dev/yasakani) verification
    const r308PathA=2140.00+38.0*105.00;
    assert.equal(r308PathA.toFixed(2),'6130.00','11-15 R6 Path A total');
    const r308PathC=115.00+3.5*105.00;
    assert.equal(r308PathC.toFixed(2),'482.50','11-15 R6 Path C total');
    assert.equal((r308PathA-r308PathC).toFixed(2),'5647.50','11-15 R6 savings vs Path A');
    assert.equal(((r308PathA-r308PathC)/r308PathA*100).toFixed(2),'92.13','11-15 R6 pct savings vs Path A');
    for(const r308File of ['workshops/github-trending-radar/docs/deepseek-v3-jax-yasakani-190line-pure-jax-mla-moe-rtx5090-qwen38-27b-engine-selection-faq.md','workshops/github-trending-radar/docs/deepseek-v3-jax-yasakani-190line-pure-jax-mla-moe-rtx5090-qwen38-27b-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r6-deepseekjax-yasakani.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r308File),'utf8');
      assert.ok(txt.includes('2,140.00')&&txt.includes('3,990.00')&&txt.includes('6,130.00')&&txt.includes('115.00')&&txt.includes('367.50')&&txt.includes('482.50')&&txt.includes('5,647.50')&&txt.includes('92.13%')&&txt.includes('not_measured'),r308File+': contains exact 11-15 R6 deepseek-v3-jax+yasakani closed-form parameters');
    }
    // 2026-11-15 Night Round 7 (R309: n4ze3m/tiny-voca + loanhviet/kokoro-vietnamese-distill) verification
    const r309PathA=1720.00+37.0*95.00;
    assert.equal(r309PathA.toFixed(2),'5235.00','11-15 R7 Path A total');
    const r309PathC=80.00+3.5*95.00;
    assert.equal(r309PathC.toFixed(2),'412.50','11-15 R7 Path C total');
    assert.equal((r309PathA-r309PathC).toFixed(2),'4822.50','11-15 R7 savings vs Path A');
    assert.equal(((r309PathA-r309PathC)/r309PathA*100).toFixed(2),'92.12','11-15 R7 pct savings vs Path A');
    for(const r309File of ['workshops/github-trending-radar/docs/tiny-voca-kokoro-vietnamese-distill-4m-9dollar-tts-9mb-20x-wasm-browser-distillation-selection-faq.md','workshops/github-trending-radar/docs/tiny-voca-kokoro-vietnamese-distill-4m-9dollar-tts-9mb-20x-wasm-browser-distillation-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r7-tinyvoca-kokorodistill.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r309File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,515.00')&&txt.includes('5,235.00')&&txt.includes('80.00')&&txt.includes('332.50')&&txt.includes('412.50')&&txt.includes('4,822.50')&&txt.includes('92.12%')&&txt.includes('not_measured'),r309File+': contains exact 11-15 R7 tiny-voca+kokoro-distill closed-form parameters');
    }
    // 2026-11-15 Night Round 8 (R310 Milestone: Forward-Future/scarlet + nickvasilescu/parallax) verification
    const r310PathA=1820.00+38.0*95.00;
    assert.equal(r310PathA.toFixed(2),'5430.00','11-15 R8 Path A total');
    const r310PathC=90.00+3.5*95.00;
    assert.equal(r310PathC.toFixed(2),'422.50','11-15 R8 Path C total');
    assert.equal((r310PathA-r310PathC).toFixed(2),'5007.50','11-15 R8 savings vs Path A');
    assert.equal(((r310PathA-r310PathC)/r310PathA*100).toFixed(2),'92.22','11-15 R8 pct savings vs Path A');
    for(const r310File of ['workshops/github-trending-radar/docs/scarlet-parallax-nondestructive-ai-video-editor-hermes-budget-gated-multimodal-studio-selection-faq.md','workshops/github-trending-radar/docs/scarlet-parallax-nondestructive-ai-video-editor-hermes-budget-gated-multimodal-studio-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r8-scarlet-parallax.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r310File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,610.00')&&txt.includes('5,430.00')&&txt.includes('90.00')&&txt.includes('332.50')&&txt.includes('422.50')&&txt.includes('5,007.50')&&txt.includes('92.22%')&&txt.includes('not_measured'),r310File+': contains exact 11-15 R8 scarlet+parallax closed-form parameters');
    }
    // 2026-11-15 Night Round 9 (R311: vaibhav-space/my-ai-coding-workflow + OnlyTerp/turnpack) verification
    const r311PathA=1860.00+39.0*100.00;
    assert.equal(r311PathA.toFixed(2),'5760.00','11-15 R9 Path A total');
    const r311PathC=125.00+3.5*100.00;
    assert.equal(r311PathC.toFixed(2),'475.00','11-15 R9 Path C total');
    assert.equal((r311PathA-r311PathC).toFixed(2),'5285.00','11-15 R9 savings vs Path A');
    assert.equal(((r311PathA-r311PathC)/r311PathA*100).toFixed(2),'91.75','11-15 R9 pct savings vs Path A');
    for(const r311File of ['workshops/github-trending-radar/docs/my-ai-coding-workflow-turnpack-3stage-critic-pipeline-test-gated-atomic-rollback-mcp-selection-faq.md','workshops/github-trending-radar/docs/my-ai-coding-workflow-turnpack-3stage-critic-pipeline-test-gated-atomic-rollback-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r9-codingworkflow-turnpack.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r311File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,900.00')&&txt.includes('5,760.00')&&txt.includes('125.00')&&txt.includes('350.00')&&txt.includes('475.00')&&txt.includes('5,285.00')&&txt.includes('91.75%')&&txt.includes('not_measured'),r311File+': contains exact 11-15 R9 codingworkflow+turnpack closed-form parameters');
    }
    // 2026-11-15 Night Round 10 (R312: Tthanh2k6/turbo-browser-mcp + 214140846/browser-hands) verification
    const r312PathA=1940.00+38.0*100.00;
    assert.equal(r312PathA.toFixed(2),'5740.00','11-15 R10 Path A total');
    const r312PathC=115.00+3.5*100.00;
    assert.equal(r312PathC.toFixed(2),'465.00','11-15 R10 Path C total');
    assert.equal((r312PathA-r312PathC).toFixed(2),'5275.00','11-15 R10 savings vs Path A');
    assert.equal(((r312PathA-r312PathC)/r312PathA*100).toFixed(2),'91.90','11-15 R10 pct savings vs Path A');
    for(const r312File of ['workshops/github-trending-radar/docs/turbo-browser-mcp-browser-hands-delta-dom-batching-multi-profile-tabgroup-chrome-mcp-selection-faq.md','workshops/github-trending-radar/docs/turbo-browser-mcp-browser-hands-delta-dom-batching-multi-profile-tabgroup-chrome-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r10-turbobrowser-browserhands.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r312File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('3,800.00')&&txt.includes('5,740.00')&&txt.includes('115.00')&&txt.includes('350.00')&&txt.includes('465.00')&&txt.includes('5,275.00')&&txt.includes('91.90%')&&txt.includes('not_measured'),r312File+': contains exact 11-15 R10 turbo-browser-mcp+browser-hands closed-form parameters');
    }
    // 2026-11-15 Night Round 11 (R313: rainyZhou2/PatchProof + brunnojob/devrescue) verification
    const r313PathA=1790.00+38.0*100.00;
    assert.equal(r313PathA.toFixed(2),'5590.00','11-15 R11 Path A total');
    const r313PathC=110.00+3.5*100.00;
    assert.equal(r313PathC.toFixed(2),'460.00','11-15 R11 Path C total');
    assert.equal((r313PathA-r313PathC).toFixed(2),'5130.00','11-15 R11 savings vs Path A');
    assert.equal(((r313PathA-r313PathC)/r313PathA*100).toFixed(2),'91.77','11-15 R11 pct savings vs Path A');
    for(const r313File of ['workshops/github-trending-radar/docs/patchproof-devrescue-counterexample-go-patch-verifier-zero-dep-ci-log-triage-selection-faq.md','workshops/github-trending-radar/docs/patchproof-devrescue-counterexample-go-patch-verifier-zero-dep-ci-log-triage-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r11-patchproof-devrescue.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r313File),'utf8');
      assert.ok(txt.includes('1,790.00')&&txt.includes('3,800.00')&&txt.includes('5,590.00')&&txt.includes('110.00')&&txt.includes('350.00')&&txt.includes('460.00')&&txt.includes('5,130.00')&&txt.includes('91.77%')&&txt.includes('not_measured'),r313File+': contains exact 11-15 R11 patchproof+devrescue closed-form parameters');
    }
    // 2026-11-15 Night Round 12 (R314: AgenticOrgLab/ExecOrchestra + petekp/coordinator) verification
    const r314PathA=1890.00+39.0*100.00;
    assert.equal(r314PathA.toFixed(2),'5790.00','11-15 R12 Path A total');
    const r314PathC=120.00+3.5*100.00;
    assert.equal(r314PathC.toFixed(2),'470.00','11-15 R12 Path C total');
    assert.equal((r314PathA-r314PathC).toFixed(2),'5320.00','11-15 R12 savings vs Path A');
    assert.equal(((r314PathA-r314PathC)/r314PathA*100).toFixed(2),'91.88','11-15 R12 pct savings vs Path A');
    for(const r314File of ['workshops/github-trending-radar/docs/execorchestra-coordinator-3mode-heterogeneous-routing-herdr-worktree-fleet-manager-selection-faq.md','workshops/github-trending-radar/docs/execorchestra-coordinator-3mode-heterogeneous-routing-herdr-worktree-fleet-manager-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r12-execorchestra-coordinator.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r314File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,900.00')&&txt.includes('5,790.00')&&txt.includes('120.00')&&txt.includes('350.00')&&txt.includes('470.00')&&txt.includes('5,320.00')&&txt.includes('91.88%')&&txt.includes('not_measured'),r314File+': contains exact 11-15 R12 execorchestra+coordinator closed-form parameters');
    }
    // 2026-11-15 Night Round 13 (R315: ineedfoundmyway/planrelay + allen-hsu/claude-code-sketch) verification
    const r315PathA=1690.00+38.0*100.00;
    assert.equal(r315PathA.toFixed(2),'5490.00','11-15 R13 Path A total');
    const r315PathC=95.00+3.5*100.00;
    assert.equal(r315PathC.toFixed(2),'445.00','11-15 R13 Path C total');
    assert.equal((r315PathA-r315PathC).toFixed(2),'5045.00','11-15 R13 savings vs Path A');
    assert.equal(((r315PathA-r315PathC)/r315PathA*100).toFixed(2),'91.89','11-15 R13 pct savings vs Path A');
    for(const r315File of ['workshops/github-trending-radar/docs/planrelay-claude-code-sketch-sha256-plan-diff-review-companion-17tool-terminal-diagram-selection-faq.md','workshops/github-trending-radar/docs/planrelay-claude-code-sketch-sha256-plan-diff-review-companion-17tool-terminal-diagram-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r13-planrelay-claudecodesketch.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r315File),'utf8');
      assert.ok(txt.includes('1,690.00')&&txt.includes('3,800.00')&&txt.includes('5,490.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,045.00')&&txt.includes('91.89%')&&txt.includes('not_measured'),r315File+': contains exact 11-15 R13 planrelay+claudecodesketch closed-form parameters');
    }
    // 2026-11-15 Night Round 14 (R316: mankidev/antialgorithm + Cheiineeey/api-where-it-breaks) verification
    const r316PathA=1940.00+40.0*100.00;
    assert.equal(r316PathA.toFixed(2),'5940.00','11-15 R14 Path A total');
    const r316PathC=130.00+3.5*100.00;
    assert.equal(r316PathC.toFixed(2),'480.00','11-15 R14 Path C total');
    assert.equal((r316PathA-r316PathC).toFixed(2),'5460.00','11-15 R14 savings vs Path A');
    assert.equal(((r316PathA-r316PathC)/r316PathA*100).toFixed(2),'91.92','11-15 R14 pct savings vs Path A');
    for(const r316File of ['workshops/github-trending-radar/docs/antialgorithm-api-where-it-breaks-anti-mode-collapse-skill-claude-api-relay-diagnostic-selection-faq.md','workshops/github-trending-radar/docs/antialgorithm-api-where-it-breaks-anti-mode-collapse-skill-claude-api-relay-diagnostic-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r14-antialgorithm-apiwhereitbreaks.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r316File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('4,000.00')&&txt.includes('5,940.00')&&txt.includes('130.00')&&txt.includes('350.00')&&txt.includes('480.00')&&txt.includes('5,460.00')&&txt.includes('91.92%')&&txt.includes('not_measured'),r316File+': contains exact 11-15 R14 antialgorithm+apiwhereitbreaks closed-form parameters');
    }
    // 2026-11-15 Night Round 15 (R317: darkfibr/artex-forensics + BenTheCyberOne/Copperhound) verification
    const r317PathA=1860.00+41.0*100.00;
    assert.equal(r317PathA.toFixed(2),'5960.00','11-15 R15 Path A total');
    const r317PathC=110.00+3.5*100.00;
    assert.equal(r317PathC.toFixed(2),'460.00','11-15 R15 Path C total');
    assert.equal((r317PathA-r317PathC).toFixed(2),'5500.00','11-15 R15 savings vs Path A');
    assert.equal(((r317PathA-r317PathC)/r317PathA*100).toFixed(2),'92.28','11-15 R15 pct savings vs Path A');
    for(const r317File of ['workshops/github-trending-radar/docs/artex-forensics-copperhound-ai-container-backdoor-disassembly-rust-ad-ot-attack-graph-selection-faq.md','workshops/github-trending-radar/docs/artex-forensics-copperhound-ai-container-backdoor-disassembly-rust-ad-ot-attack-graph-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r15-artexforensics-copperhound.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r317File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('4,100.00')&&txt.includes('5,960.00')&&txt.includes('110.00')&&txt.includes('350.00')&&txt.includes('460.00')&&txt.includes('5,500.00')&&txt.includes('92.28%')&&txt.includes('not_measured'),r317File+': contains exact 11-15 R15 artexforensics+copperhound closed-form parameters');
    }
    // 2026-11-15 Night Round 16 (R318: macrogrants/checkpoint-forensics + Inferact/amd-kernels) verification
    const r318PathA=2080.00+42.0*100.00;
    assert.equal(r318PathA.toFixed(2),'6280.00','11-15 R16 Path A total');
    const r318PathC=140.00+3.5*100.00;
    assert.equal(r318PathC.toFixed(2),'490.00','11-15 R16 Path C total');
    assert.equal((r318PathA-r318PathC).toFixed(2),'5790.00','11-15 R16 savings vs Path A');
    assert.equal(((r318PathA-r318PathC)/r318PathA*100).toFixed(2),'92.20','11-15 R16 pct savings vs Path A');
    for(const r318File of ['workshops/github-trending-radar/docs/checkpoint-forensics-amd-kernels-philox-sm-gpu-fingerprint-mi355x-flydsl-vllm-selection-faq.md','workshops/github-trending-radar/docs/checkpoint-forensics-amd-kernels-philox-sm-gpu-fingerprint-mi355x-flydsl-vllm-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r16-checkpointforensics-amdkernels.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r318File),'utf8');
      assert.ok(txt.includes('2,080.00')&&txt.includes('4,200.00')&&txt.includes('6,280.00')&&txt.includes('140.00')&&txt.includes('350.00')&&txt.includes('490.00')&&txt.includes('5,790.00')&&txt.includes('92.20%')&&txt.includes('not_measured'),r318File+': contains exact 11-15 R16 checkpointforensics+amdkernels closed-form parameters');
    }
    // 2026-11-15 Night Round 17 (R319: areu01or00/qwen-tts-neuron-mapping + PedroMarinhoDev/ComfyUI-ReCaVSR) verification
    const r319PathA=1980.00+39.0*100.00;
    assert.equal(r319PathA.toFixed(2),'5880.00','11-15 R17 Path A total');
    const r319PathC=115.00+3.5*100.00;
    assert.equal(r319PathC.toFixed(2),'465.00','11-15 R17 Path C total');
    assert.equal((r319PathA-r319PathC).toFixed(2),'5415.00','11-15 R17 savings vs Path A');
    assert.equal(((r319PathA-r319PathC)/r319PathA*100).toFixed(2),'92.09','11-15 R17 pct savings vs Path A');
    for(const r319File of ['workshops/github-trending-radar/docs/qwen-tts-neuron-mapping-comfyui-recavsr-417-speech-neuron-steering-1step-streaming-vsr-selection-faq.md','workshops/github-trending-radar/docs/qwen-tts-neuron-mapping-comfyui-recavsr-417-speech-neuron-steering-1step-streaming-vsr-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r17-qwenttsneurons-recavsr.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r319File),'utf8');
      assert.ok(txt.includes('1,980.00')&&txt.includes('3,900.00')&&txt.includes('5,880.00')&&txt.includes('115.00')&&txt.includes('350.00')&&txt.includes('465.00')&&txt.includes('5,415.00')&&txt.includes('92.09%')&&txt.includes('not_measured'),r319File+': contains exact 11-15 R17 qwenttsneurons+recavsr closed-form parameters');
    }
    // 2026-11-15 Night Round 18 (R320: alexturkey/z-image-turbo-pascal-4gb + mdhabibi/one-graph-two-worlds) verification
    const r320PathA=1920.00+40.0*100.00;
    assert.equal(r320PathA.toFixed(2),'5920.00','11-15 R18 Path A total');
    const r320PathC=105.00+3.5*100.00;
    assert.equal(r320PathC.toFixed(2),'455.00','11-15 R18 Path C total');
    assert.equal((r320PathA-r320PathC).toFixed(2),'5465.00','11-15 R18 savings vs Path A');
    assert.equal(((r320PathA-r320PathC)/r320PathA*100).toFixed(2),'92.31','11-15 R18 pct savings vs Path A');
    for(const r320File of ['workshops/github-trending-radar/docs/z-image-turbo-pascal-4gb-one-graph-two-worlds-sm61-gguf-diffusion-rdf-shacl-neo4j-graphrag-selection-faq.md','workshops/github-trending-radar/docs/z-image-turbo-pascal-4gb-one-graph-two-worlds-sm61-gguf-diffusion-rdf-shacl-neo4j-graphrag-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r18-zimageturbo4gb-onegraphtwoworlds.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r320File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('4,000.00')&&txt.includes('5,920.00')&&txt.includes('105.00')&&txt.includes('350.00')&&txt.includes('455.00')&&txt.includes('5,465.00')&&txt.includes('92.31%')&&txt.includes('not_measured'),r320File+': contains exact 11-15 R18 zimageturbo4gb+onegraphtwoworlds closed-form parameters');
    }
    // 2026-11-15 Night Round 19 (R321: msveshnikov/claude-game-pipeline + amirmushichge/shred-kit) verification
    const r321PathA=1840.00+41.0*100.00;
    assert.equal(r321PathA.toFixed(2),'5940.00','11-15 R19 Path A total');
    const r321PathC=110.00+3.5*100.00;
    assert.equal(r321PathC.toFixed(2),'460.00','11-15 R19 Path C total');
    assert.equal((r321PathA-r321PathC).toFixed(2),'5480.00','11-15 R19 savings vs Path A');
    assert.equal(((r321PathA-r321PathC)/r321PathA*100).toFixed(2),'92.26','11-15 R19 pct savings vs Path A');
    for(const r321File of ['workshops/github-trending-radar/docs/claude-game-pipeline-shred-kit-headless-blender-godot-3d-game-agent-video-template-selection-faq.md','workshops/github-trending-radar/docs/claude-game-pipeline-shred-kit-headless-blender-godot-3d-game-agent-video-template-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r19-gamepipeline-shredkit.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r321File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('4,100.00')&&txt.includes('5,940.00')&&txt.includes('110.00')&&txt.includes('350.00')&&txt.includes('460.00')&&txt.includes('5,480.00')&&txt.includes('92.26%')&&txt.includes('not_measured'),r321File+': contains exact 11-15 R19 gamepipeline+shredkit closed-form parameters');
    }
    // 2026-11-15 Night Round 20 (R322: Kianuni/AppleFlow + lowdevco/Clip-Forge) verification
    const r322PathA=1720.00+38.0*100.00;
    assert.equal(r322PathA.toFixed(2),'5520.00','11-15 R20 Path A total');
    const r322PathC=95.00+3.5*100.00;
    assert.equal(r322PathC.toFixed(2),'445.00','11-15 R20 Path C total');
    assert.equal((r322PathA-r322PathC).toFixed(2),'5075.00','11-15 R20 savings vs Path A');
    assert.equal(((r322PathA-r322PathC)/r322PathA*100).toFixed(2),'91.94','11-15 R20 pct savings vs Path A');
    for(const r322File of ['workshops/github-trending-radar/docs/appleflow-clip-forge-zero-mitm-pcc-ohttp-routing-scored-shortlist-vertical-shorts-selection-faq.md','workshops/github-trending-radar/docs/appleflow-clip-forge-zero-mitm-pcc-ohttp-routing-scored-shortlist-vertical-shorts-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r20-appleflow-clipforge.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r322File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,800.00')&&txt.includes('5,520.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,075.00')&&txt.includes('91.94%')&&txt.includes('not_measured'),r322File+': contains exact 11-15 R20 appleflow+clipforge closed-form parameters');
    }
    // 2026-11-15 Night Round 21 (R323: RoboticsResearchHubVN/InstantAMP + PranaLabs/3DSceneBench) verification
    const r323PathA=2120.00+42.0*100.00;
    assert.equal(r323PathA.toFixed(2),'6320.00','11-15 R21 Path A total');
    const r323PathC=135.00+3.5*100.00;
    assert.equal(r323PathC.toFixed(2),'485.00','11-15 R21 Path C total');
    assert.equal((r323PathA-r323PathC).toFixed(2),'5835.00','11-15 R21 savings vs Path A');
    assert.equal(((r323PathA-r323PathC)/r323PathA*100).toFixed(2),'92.33','11-15 R21 pct savings vs Path A');
    for(const r323File of ['workshops/github-trending-radar/docs/instantamp-3dscenebench-30min-rtx5090-world-model-amp-mujoco-functional-scene-benchmark-selection-faq.md','workshops/github-trending-radar/docs/instantamp-3dscenebench-30min-rtx5090-world-model-amp-mujoco-functional-scene-benchmark-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r21-instantamp-3dscenebench.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r323File),'utf8');
      assert.ok(txt.includes('2,120.00')&&txt.includes('4,200.00')&&txt.includes('6,320.00')&&txt.includes('135.00')&&txt.includes('350.00')&&txt.includes('485.00')&&txt.includes('5,835.00')&&txt.includes('92.33%')&&txt.includes('not_measured'),r323File+': contains exact 11-15 R21 instantamp+3dscenebench closed-form parameters');
    }
    // 2026-11-15 Night Round 22 (R324: Edwardssss/ncnn.rust + voyager-so/vauss) verification
    const r324PathA=1950.00+40.0*100.00;
    assert.equal(r324PathA.toFixed(2),'5950.00','11-15 R22 Path A total');
    const r324PathC=110.00+3.5*100.00;
    assert.equal(r324PathC.toFixed(2),'460.00','11-15 R22 Path C total');
    assert.equal((r324PathA-r324PathC).toFixed(2),'5490.00','11-15 R22 savings vs Path A');
    assert.equal(((r324PathA-r324PathC)/r324PathA*100).toFixed(2),'92.27','11-15 R22 pct savings vs Path A');
    for(const r324File of ['workshops/github-trending-radar/docs/ncnn-rust-vauss-zero-copy-vulkan-inference-bindings-5x-gaussian-splat-trainer-selection-faq.md','workshops/github-trending-radar/docs/ncnn-rust-vauss-zero-copy-vulkan-inference-bindings-5x-gaussian-splat-trainer-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r22-ncnnrust-vauss.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r324File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('4,000.00')&&txt.includes('5,950.00')&&txt.includes('110.00')&&txt.includes('350.00')&&txt.includes('460.00')&&txt.includes('5,490.00')&&txt.includes('92.27%')&&txt.includes('not_measured'),r324File+': contains exact 11-15 R22 ncnnrust+vauss closed-form parameters');
    }
    // 2026-11-15 Night Round 23 (R325: nuskey8/lazydsh + fazxes/rex-durable) verification
    const r325PathA=1780.00+39.0*100.00;
    assert.equal(r325PathA.toFixed(2),'5680.00','11-15 R23 Path A total');
    const r325PathC=95.00+3.5*100.00;
    assert.equal(r325PathC.toFixed(2),'445.00','11-15 R23 Path C total');
    assert.equal((r325PathA-r325PathC).toFixed(2),'5235.00','11-15 R23 savings vs Path A');
    assert.equal(((r325PathA-r325PathC)/r325PathA*100).toFixed(2),'92.17','11-15 R23 pct savings vs Path A');
    for(const r325File of ['workshops/github-trending-radar/docs/lazydsh-rex-durable-43provider-deepseek-harness-tui-reboot-resilient-session-restorer-selection-faq.md','workshops/github-trending-radar/docs/lazydsh-rex-durable-43provider-deepseek-harness-tui-reboot-resilient-session-restorer-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r23-lazydsh-rexdurable.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r325File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,900.00')&&txt.includes('5,680.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,235.00')&&txt.includes('92.17%')&&txt.includes('not_measured'),r325File+': contains exact 11-15 R23 lazydsh+rexdurable closed-form parameters');
    }
    // 2026-11-15 Night Round 24 (R326: rauchg/winamp-ui-sdk + folsomintel/defect) verification
    const r326PathA=1820.00+39.0*100.00;
    assert.equal(r326PathA.toFixed(2),'5720.00','11-15 R24 Path A total');
    const r326PathC=100.00+3.5*100.00;
    assert.equal(r326PathC.toFixed(2),'450.00','11-15 R24 Path C total');
    assert.equal((r326PathA-r326PathC).toFixed(2),'5270.00','11-15 R24 savings vs Path A');
    assert.equal(((r326PathA-r326PathC)/r326PathA*100).toFixed(2),'92.13','11-15 R24 pct savings vs Path A');
    for(const r326File of ['workshops/github-trending-radar/docs/winamp-ui-sdk-defect-webmcp-light-dom-primitives-parameter-default-typed-effects-selection-faq.md','workshops/github-trending-radar/docs/winamp-ui-sdk-defect-webmcp-light-dom-primitives-parameter-default-typed-effects-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r24-winampuisdk-defect.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r326File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,900.00')&&txt.includes('5,720.00')&&txt.includes('100.00')&&txt.includes('350.00')&&txt.includes('450.00')&&txt.includes('5,270.00')&&txt.includes('92.13%')&&txt.includes('not_measured'),r326File+': contains exact 11-15 R24 winampuisdk+defect closed-form parameters');
    }
    // 2026-11-15 Night Round 25 (R327: markrussinovich/venn-vdm + continuousintelligence/ci) verification
    const r327PathA=2060.00+41.0*100.00;
    assert.equal(r327PathA.toFixed(2),'6160.00','11-15 R25 Path A total');
    const r327PathC=120.00+3.5*100.00;
    assert.equal(r327PathC.toFixed(2),'470.00','11-15 R25 Path C total');
    assert.equal((r327PathA-r327PathC).toFixed(2),'5690.00','11-15 R25 savings vs Path A');
    assert.equal(((r327PathA-r327PathC)/r327PathA*100).toFixed(2),'92.37','11-15 R25 pct savings vs Path A');
    for(const r327File of ['workshops/github-trending-radar/docs/venn-vdm-ci-proto-3mb-vector-decision-model-2m-context-timeseries-foundation-selection-faq.md','workshops/github-trending-radar/docs/venn-vdm-ci-proto-3mb-vector-decision-model-2m-context-timeseries-foundation-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r25-vennvdm-ciproto.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r327File),'utf8');
      assert.ok(txt.includes('2,060.00')&&txt.includes('4,100.00')&&txt.includes('6,160.00')&&txt.includes('120.00')&&txt.includes('350.00')&&txt.includes('470.00')&&txt.includes('5,690.00')&&txt.includes('92.37%')&&txt.includes('not_measured'),r327File+': contains exact 11-15 R25 vennvdm+ciproto closed-form parameters');
    }
    // 2026-11-15 Night Round 26 (R328: Noniv/abyssal-garden + Leonxlnx/room-at-dawn) verification
    const r328PathA=2040.00+40.0*100.00;
    assert.equal(r328PathA.toFixed(2),'6040.00','11-15 R26 Path A total');
    const r328PathC=110.00+3.5*100.00;
    assert.equal(r328PathC.toFixed(2),'460.00','11-15 R26 Path C total');
    assert.equal((r328PathA-r328PathC).toFixed(2),'5580.00','11-15 R26 savings vs Path A');
    assert.equal(((r328PathA-r328PathC)/r328PathA*100).toFixed(2),'92.38','11-15 R26 pct savings vs Path A');
    for(const r328File of ['workshops/github-trending-radar/docs/abyssal-garden-room-at-dawn-96kb-webgpu-procedural-world-bvh-pathtraced-4k-hdr10-selection-faq.md','workshops/github-trending-radar/docs/abyssal-garden-room-at-dawn-96kb-webgpu-procedural-world-bvh-pathtraced-4k-hdr10-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r26-abyssalgarden-roomatdawn.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r328File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,000.00')&&txt.includes('6,040.00')&&txt.includes('110.00')&&txt.includes('350.00')&&txt.includes('460.00')&&txt.includes('5,580.00')&&txt.includes('92.38%')&&txt.includes('not_measured'),r328File+': contains exact 11-15 R26 abyssalgarden+roomatdawn closed-form parameters');
    }
    // 2026-11-15 Night Round 27 (R329: joe2643/qwen3-asr-cantonese-hk + imraywang/openbean) verification
    const r329PathA=2020.00+40.0*100.00;
    assert.equal(r329PathA.toFixed(2),'6020.00','11-15 R27 Path A total');
    const r329PathC=105.00+3.5*100.00;
    assert.equal(r329PathC.toFixed(2),'455.00','11-15 R27 Path C total');
    assert.equal((r329PathA-r329PathC).toFixed(2),'5565.00','11-15 R27 savings vs Path A');
    assert.equal(((r329PathA-r329PathC)/r329PathA*100).toFixed(2),'92.44','11-15 R27 pct savings vs Path A');
    for(const r329File of ['workshops/github-trending-radar/docs/qwen3-asr-cantonese-hk-openbean-nvfp4-gguf-codeswitch-asr-local-recorder-mcp-selection-faq.md','workshops/github-trending-radar/docs/qwen3-asr-cantonese-hk-openbean-nvfp4-gguf-codeswitch-asr-local-recorder-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r27-qwen3cantonese-openbean.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r329File),'utf8');
      assert.ok(txt.includes('2,020.00')&&txt.includes('4,000.00')&&txt.includes('6,020.00')&&txt.includes('105.00')&&txt.includes('350.00')&&txt.includes('455.00')&&txt.includes('5,565.00')&&txt.includes('92.44%')&&txt.includes('not_measured'),r329File+': contains exact 11-15 R27 qwen3cantonese+openbean closed-form parameters');
    }
    // 2026-11-15 Night Round 28 (R330: alinuo666/ComfyUI-Banzhang-All + tarpetos/mimvox) verification
    const r330PathA=2050.00+41.0*100.00;
    assert.equal(r330PathA.toFixed(2),'6150.00','11-15 R28 Path A total');
    const r330PathC=115.00+3.5*100.00;
    assert.equal(r330PathC.toFixed(2),'465.00','11-15 R28 Path C total');
    assert.equal((r330PathA-r330PathC).toFixed(2),'5685.00','11-15 R28 savings vs Path A');
    assert.equal(((r330PathA-r330PathC)/r330PathA*100).toFixed(2),'92.44','11-15 R28 pct savings vs Path A');
    for(const r330File of ['workshops/github-trending-radar/docs/comfyui-banzhang-all-mimvox-6gb-minimax-h3-three-pass-director-60lang-phoneme-voice-cloning-selection-faq.md','workshops/github-trending-radar/docs/comfyui-banzhang-all-mimvox-6gb-minimax-h3-three-pass-director-60lang-phoneme-voice-cloning-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r28-banzhangh3-mimvox.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r330File),'utf8');
      assert.ok(txt.includes('2,050.00')&&txt.includes('4,100.00')&&txt.includes('6,150.00')&&txt.includes('115.00')&&txt.includes('350.00')&&txt.includes('465.00')&&txt.includes('5,685.00')&&txt.includes('92.44%')&&txt.includes('not_measured'),r330File+': contains exact 11-15 R28 banzhangh3+mimvox closed-form parameters');
    }
    // 2026-11-15 Night Round 29 (R331: lizi600jin/dsh-ensp + WforEvery/dsh-runtime-log) verification
    const r331PathA=1760.00+39.0*100.00;
    assert.equal(r331PathA.toFixed(2),'5660.00','11-15 R29 Path A total');
    const r331PathC=95.00+3.5*100.00;
    assert.equal(r331PathC.toFixed(2),'445.00','11-15 R29 Path C total');
    assert.equal((r331PathA-r331PathC).toFixed(2),'5215.00','11-15 R29 savings vs Path A');
    assert.equal(((r331PathA-r331PathC)/r331PathA*100).toFixed(2),'92.14','11-15 R29 pct savings vs Path A');
    for(const r331File of ['workshops/github-trending-radar/docs/dsh-ensp-dsh-runtime-log-huawei-ensp-17tool-mcp-automation-cordis-rotating-jsonl-logger-selection-faq.md','workshops/github-trending-radar/docs/dsh-ensp-dsh-runtime-log-huawei-ensp-17tool-mcp-automation-cordis-rotating-jsonl-logger-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r29-dshensp-dshruntimelog.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r331File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,900.00')&&txt.includes('5,660.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,215.00')&&txt.includes('92.14%')&&txt.includes('not_measured'),r331File+': contains exact 11-15 R29 dshensp+dshruntimelog closed-form parameters');
    }
    // 2026-11-15 Night Round 30 (R332: beiwocaishijia/gezhi-sheets + Muanyan-mjq/zotero-interlinear) verification
    const r332PathA=1850.00+39.0*100.00;
    assert.equal(r332PathA.toFixed(2),'5750.00','11-15 R30 Path A total');
    const r332PathC=95.00+3.5*100.00;
    assert.equal(r332PathC.toFixed(2),'445.00','11-15 R30 Path C total');
    assert.equal((r332PathA-r332PathC).toFixed(2),'5305.00','11-15 R30 savings vs Path A');
    assert.equal(((r332PathA-r332PathC)/r332PathA*100).toFixed(2),'92.26','11-15 R30 pct savings vs Path A');
    for(const r332File of ['workshops/github-trending-radar/docs/gezhi-sheets-zotero-interlinear-dpapi-transactional-ai-spreadsheet-5pool-bilingual-pdf-selection-faq.md','workshops/github-trending-radar/docs/gezhi-sheets-zotero-interlinear-dpapi-transactional-ai-spreadsheet-5pool-bilingual-pdf-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r30-gezhisheets-zoterointerlinear.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r332File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,900.00')&&txt.includes('5,750.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,305.00')&&txt.includes('92.26%')&&txt.includes('not_measured'),r332File+': contains exact 11-15 R30 gezhisheets+zoterointerlinear closed-form parameters');
    }
    // 2026-11-15 Night Round 31 (R333: samertall/pulseguard-rt + cloudriverwedge/loupe-osint-image-verification) verification
    const r333PathA=1880.00+40.0*100.00;
    assert.equal(r333PathA.toFixed(2),'5880.00','11-15 R31 Path A total');
    const r333PathC=100.00+3.5*100.00;
    assert.equal(r333PathC.toFixed(2),'450.00','11-15 R31 Path C total');
    assert.equal((r333PathA-r333PathC).toFixed(2),'5430.00','11-15 R31 savings vs Path A');
    assert.equal(((r333PathA-r333PathC)/r333PathA*100).toFixed(2),'92.35','11-15 R31 pct savings vs Path A');
    for(const r333File of ['workshops/github-trending-radar/docs/pulseguard-rt-loupe-osint-qnx8-dispatch-latency-analyzer-4test-copy-move-image-forensics-selection-faq.md','workshops/github-trending-radar/docs/pulseguard-rt-loupe-osint-qnx8-dispatch-latency-analyzer-4test-copy-move-image-forensics-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r31-pulseguardrt-loupeosint.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r333File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('4,000.00')&&txt.includes('5,880.00')&&txt.includes('100.00')&&txt.includes('350.00')&&txt.includes('450.00')&&txt.includes('5,430.00')&&txt.includes('92.35%')&&txt.includes('not_measured'),r333File+': contains exact 11-15 R31 pulseguardrt+loupeosint closed-form parameters');
    }
    // 2026-11-15 Night Round 32 (R334: leapquant/LeapQuant + Anionex/h3-image-mlx) verification
    const r334PathA=2140.00+41.0*100.00;
    assert.equal(r334PathA.toFixed(2),'6240.00','11-15 R32 Path A total');
    const r334PathC=125.00+3.5*100.00;
    assert.equal(r334PathC.toFixed(2),'475.00','11-15 R32 Path C total');
    assert.equal((r334PathA-r334PathC).toFixed(2),'5765.00','11-15 R32 savings vs Path A');
    assert.equal(((r334PathA-r334PathC)/r334PathA*100).toFixed(2),'92.39','11-15 R32 pct savings vs Path A');
    for(const r334File of ['workshops/github-trending-radar/docs/leapquant-h3-image-mlx-linear-attention-recurrent-state-quantization-apple-silicon-3gb-stream-selection-faq.md','workshops/github-trending-radar/docs/leapquant-h3-image-mlx-linear-attention-recurrent-state-quantization-apple-silicon-3gb-stream-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r32-leapquant-h3imagemlx.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r334File),'utf8');
      assert.ok(txt.includes('2,140.00')&&txt.includes('4,100.00')&&txt.includes('6,240.00')&&txt.includes('125.00')&&txt.includes('350.00')&&txt.includes('475.00')&&txt.includes('5,765.00')&&txt.includes('92.39%')&&txt.includes('not_measured'),r334File+': contains exact 11-15 R32 leapquant+h3imagemlx closed-form parameters');
    }
    // 2026-11-15 Night Round 33 (R335: Omodaka9375/browserr + thisuxhq/dukoi) verification
    const r335PathA=1920.00+40.0*100.00;
    assert.equal(r335PathA.toFixed(2),'5920.00','11-15 R33 Path A total');
    const r335PathC=95.00+3.5*100.00;
    assert.equal(r335PathC.toFixed(2),'445.00','11-15 R33 Path C total');
    assert.equal((r335PathA-r335PathC).toFixed(2),'5475.00','11-15 R33 savings vs Path A');
    assert.equal(((r335PathA-r335PathC)/r335PathA*100).toFixed(2),'92.48','11-15 R33 pct savings vs Path A');
    for(const r335File of ['workshops/github-trending-radar/docs/browserr-dukoi-servo-agent-browser-mcp-fail-closed-intercept-android-edge-server-selection-faq.md','workshops/github-trending-radar/docs/browserr-dukoi-servo-agent-browser-mcp-fail-closed-intercept-android-edge-server-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r33-browserr-dukoi.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r335File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('4,000.00')&&txt.includes('5,920.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,475.00')&&txt.includes('92.48%')&&txt.includes('not_measured'),r335File+': contains exact 11-15 R33 browserr+dukoi closed-form parameters');
    }
    // 2026-11-15 Night Round 34 (R336: leonardo-alegria/garlic-llm + c6lang/c6) verification
    const r336PathA=1980.00+40.0*100.00;
    assert.equal(r336PathA.toFixed(2),'5980.00','11-15 R34 Path A total');
    const r336PathC=100.00+3.5*100.00;
    assert.equal(r336PathC.toFixed(2),'450.00','11-15 R34 Path C total');
    assert.equal((r336PathA-r336PathC).toFixed(2),'5530.00','11-15 R34 savings vs Path A');
    assert.equal(((r336PathA-r336PathC)/r336PathA*100).toFixed(2),'92.47','11-15 R34 pct savings vs Path A');
    for(const r336File of ['workshops/github-trending-radar/docs/garlic-llm-c6lang-ps4-pm4-qwen35-9b-mtp-tinycc-defer-errdefer-systems-c-selection-faq.md','workshops/github-trending-radar/docs/garlic-llm-c6lang-ps4-pm4-qwen35-9b-mtp-tinycc-defer-errdefer-systems-c-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r34-garlicllm-c6lang.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r336File),'utf8');
      assert.ok(txt.includes('1,980.00')&&txt.includes('4,000.00')&&txt.includes('5,980.00')&&txt.includes('100.00')&&txt.includes('350.00')&&txt.includes('450.00')&&txt.includes('5,530.00')&&txt.includes('92.47%')&&txt.includes('not_measured'),r336File+': contains exact 11-15 R34 garlicllm+c6lang closed-form parameters');
    }
    // 2026-11-15 Night Round 35 (R337: jacobvm04/slam-dunk + BottingRocks/Shape) verification
    const r337PathA=2060.00+41.0*100.00;
    assert.equal(r337PathA.toFixed(2),'6160.00','11-15 R35 Path A total');
    const r337PathC=110.00+3.5*100.00;
    assert.equal(r337PathC.toFixed(2),'460.00','11-15 R35 Path C total');
    assert.equal((r337PathA-r337PathC).toFixed(2),'5700.00','11-15 R35 savings vs Path A');
    assert.equal(((r337PathA-r337PathC)/r337PathA*100).toFixed(2),'92.53','11-15 R35 pct savings vs Path A');
    for(const r337File of ['workshops/github-trending-radar/docs/slam-dunk-shape-egocentric-slam-camera-gyro-calibration-vm-deobfuscation-signal-codec-selection-faq.md','workshops/github-trending-radar/docs/slam-dunk-shape-egocentric-slam-camera-gyro-calibration-vm-deobfuscation-signal-codec-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r35-slamdunk-shape.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r337File),'utf8');
      assert.ok(txt.includes('2,060.00')&&txt.includes('4,100.00')&&txt.includes('6,160.00')&&txt.includes('110.00')&&txt.includes('350.00')&&txt.includes('460.00')&&txt.includes('5,700.00')&&txt.includes('92.53%')&&txt.includes('not_measured'),r337File+': contains exact 11-15 R35 slamdunk+shape closed-form parameters');
    }
    // 2026-11-15 Night Round 36 (R338: jackson-cmd/zeus-options-terminal + KaelLee335/enterprise-support-agent) verification
    const r338PathA=1860.00+39.0*100.00;
    assert.equal(r338PathA.toFixed(2),'5760.00','11-15 R36 Path A total');
    const r338PathC=95.00+3.5*100.00;
    assert.equal(r338PathC.toFixed(2),'445.00','11-15 R36 Path C total');
    assert.equal((r338PathA-r338PathC).toFixed(2),'5315.00','11-15 R36 savings vs Path A');
    assert.equal(((r338PathA-r338PathC)/r338PathA*100).toFixed(2),'92.27','11-15 R36 pct savings vs Path A');
    for(const r338File of ['workshops/github-trending-radar/docs/zeus-options-terminal-enterprise-support-agent-18tool-mcp-greeks-checkup-dify-45case-eval-selection-faq.md','workshops/github-trending-radar/docs/zeus-options-terminal-enterprise-support-agent-18tool-mcp-greeks-checkup-dify-45case-eval-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r36-zeus-supportagent.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r338File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,900.00')&&txt.includes('5,760.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,315.00')&&txt.includes('92.27%')&&txt.includes('not_measured'),r338File+': contains exact 11-15 R36 zeus+supportagent closed-form parameters');
    }
    // 2026-11-15 Night Round 37 (R339: shuding/spec-01 + lishuangqiang/mixbar) verification
    const r339PathA=1780.00+38.0*100.00;
    assert.equal(r339PathA.toFixed(2),'5580.00','11-15 R37 Path A total');
    const r339PathC=90.00+3.5*100.00;
    assert.equal(r339PathC.toFixed(2),'440.00','11-15 R37 Path C total');
    assert.equal((r339PathA-r339PathC).toFixed(2),'5140.00','11-15 R37 savings vs Path A');
    assert.equal(((r339PathA-r339PathC)/r339PathA*100).toFixed(2),'92.11','11-15 R37 pct savings vs Path A');
    for(const r339File of ['workshops/github-trending-radar/docs/spec-01-mixbar-vercel-ui-sdk-hardware-registry-macos-coreaudio-process-tap-mixer-selection-faq.md','workshops/github-trending-radar/docs/spec-01-mixbar-vercel-ui-sdk-hardware-registry-macos-coreaudio-process-tap-mixer-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r37-spec01-mixbar.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r339File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,800.00')&&txt.includes('5,580.00')&&txt.includes('90.00')&&txt.includes('350.00')&&txt.includes('440.00')&&txt.includes('5,140.00')&&txt.includes('92.11%')&&txt.includes('not_measured'),r339File+': contains exact 11-15 R37 spec01+mixbar closed-form parameters');
    }
    // 2026-11-15 Night Round 38 (R340: mizorewww/colab-qwen38-g4 + CrommaAI/crommacode) verification
    const r340PathA=2180.00+41.0*100.00;
    assert.equal(r340PathA.toFixed(2),'6280.00','11-15 R38 Path A total');
    const r340PathC=120.00+3.5*100.00;
    assert.equal(r340PathC.toFixed(2),'470.00','11-15 R38 Path C total');
    assert.equal((r340PathA-r340PathC).toFixed(2),'5810.00','11-15 R38 savings vs Path A');
    assert.equal(((r340PathA-r340PathC)/r340PathA*100).toFixed(2),'92.52','11-15 R38 pct savings vs Path A');
    for(const r340File of ['workshops/github-trending-radar/docs/colab-qwen38-g4-crommacode-blackwell-96gb-262k-mtp-gpui-gamified-agent-swarm-ide-selection-faq.md','workshops/github-trending-radar/docs/colab-qwen38-g4-crommacode-blackwell-96gb-262k-mtp-gpui-gamified-agent-swarm-ide-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r38-colabqwen38g4-crommacode.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r340File),'utf8');
      assert.ok(txt.includes('2,180.00')&&txt.includes('4,100.00')&&txt.includes('6,280.00')&&txt.includes('120.00')&&txt.includes('350.00')&&txt.includes('470.00')&&txt.includes('5,810.00')&&txt.includes('92.52%')&&txt.includes('not_measured'),r340File+': contains exact 11-15 R38 colabqwen38g4+crommacode closed-form parameters');
    }
    // 2026-11-15 Night Round 39 (R341: andrisgauracs/bevel-os + oneamendez/crate) verification
    const r341PathA=1940.00+40.0*100.00;
    assert.equal(r341PathA.toFixed(2),'5940.00','11-15 R39 Path A total');
    const r341PathC=95.00+3.5*100.00;
    assert.equal(r341PathC.toFixed(2),'445.00','11-15 R39 Path C total');
    assert.equal((r341PathA-r341PathC).toFixed(2),'5495.00','11-15 R39 savings vs Path A');
    assert.equal(((r341PathA-r341PathC)/r341PathA*100).toFixed(2),'92.51','11-15 R39 pct savings vs Path A');
    for(const r341File of ['workshops/github-trending-radar/docs/bevel-os-crate-esp32s3-vga-elf-desktop-os-arm64-to-arm64-jit-vm-engine-selection-faq.md','workshops/github-trending-radar/docs/bevel-os-crate-esp32s3-vga-elf-desktop-os-arm64-to-arm64-jit-vm-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r39-bevelos-crate.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r341File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('4,000.00')&&txt.includes('5,940.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,495.00')&&txt.includes('92.51%')&&txt.includes('not_measured'),r341File+': contains exact 11-15 R39 bevelos+crate closed-form parameters');
    }
    // 2026-11-15 Night Round 40 (R342: IoET-y/robot-skill-factory + slmonker/ComfyUI-OpenH3Regenerate2KIC) verification
    const r342PathA=2120.00+41.0*100.00;
    assert.equal(r342PathA.toFixed(2),'6220.00','11-15 R40 Path A total');
    const r342PathC=115.00+3.5*100.00;
    assert.equal(r342PathC.toFixed(2),'465.00','11-15 R40 Path C total');
    assert.equal((r342PathA-r342PathC).toFixed(2),'5755.00','11-15 R40 savings vs Path A');
    assert.equal(((r342PathA-r342PathC)/r342PathA*100).toFixed(2),'92.52','11-15 R40 pct savings vs Path A');
    for(const r342File of ['workshops/github-trending-radar/docs/robot-skill-factory-openh3-regenerate-2k-ic-humanoid-orchestra-comfyui-2k-refinement-selection-faq.md','workshops/github-trending-radar/docs/robot-skill-factory-openh3-regenerate-2k-ic-humanoid-orchestra-comfyui-2k-refinement-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r40-robotskillfactory-openh3regen2k.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r342File),'utf8');
      assert.ok(txt.includes('2,120.00')&&txt.includes('4,100.00')&&txt.includes('6,220.00')&&txt.includes('115.00')&&txt.includes('350.00')&&txt.includes('465.00')&&txt.includes('5,755.00')&&txt.includes('92.52%')&&txt.includes('not_measured'),r342File+': contains exact 11-15 R40 robotskillfactory+openh3regen2k closed-form parameters');
    }
    // 2026-11-15 Night Round 41 (R343: adamholter/aa-plus + dminghao12-dotcom/bluewhite-ppt-skills) verification
    const r343PathA=1820.00+39.0*100.00;
    assert.equal(r343PathA.toFixed(2),'5720.00','11-15 R41 Path A total');
    const r343PathC=85.00+3.5*100.00;
    assert.equal(r343PathC.toFixed(2),'435.00','11-15 R41 Path C total');
    assert.equal((r343PathA-r343PathC).toFixed(2),'5285.00','11-15 R41 savings vs Path A');
    assert.equal(((r343PathA-r343PathC)/r343PathA*100).toFixed(2),'92.40','11-15 R41 pct savings vs Path A');
    for(const r343File of ['workshops/github-trending-radar/docs/aa-plus-bluewhite-ppt-skills-artificial-analysis-pareto-effort-radar-native-18pt-pptx-lint-selection-faq.md','workshops/github-trending-radar/docs/aa-plus-bluewhite-ppt-skills-artificial-analysis-pareto-effort-radar-native-18pt-pptx-lint-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r41-aaplus-bluewhiteppt.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r343File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,900.00')&&txt.includes('5,720.00')&&txt.includes('85.00')&&txt.includes('350.00')&&txt.includes('435.00')&&txt.includes('5,285.00')&&txt.includes('92.40%')&&txt.includes('not_measured'),r343File+': contains exact 11-15 R41 aaplus+bluewhiteppt closed-form parameters');
    }
    // 2026-11-15 Night Round 42 (R344: Team-intN18-SoybeanSeclab/prtseek + simonw/beep-locator) verification
    const r344PathA=1900.00+39.5*100.00;
    assert.equal(r344PathA.toFixed(2),'5850.00','11-15 R42 Path A total');
    const r344PathC=90.00+3.5*100.00;
    assert.equal(r344PathC.toFixed(2),'440.00','11-15 R42 Path C total');
    assert.equal((r344PathA-r344PathC).toFixed(2),'5410.00','11-15 R42 savings vs Path A');
    assert.equal(((r344PathA-r344PathC)/r344PathA*100).toFixed(2),'92.48','11-15 R42 pct savings vs Path A');
    for(const r344File of ['workshops/github-trending-radar/docs/prtseek-beep-locator-4role-ctf-agent-shared-budget-beepbeep-tdoa-acoustic-array-selection-faq.md','workshops/github-trending-radar/docs/prtseek-beep-locator-4role-ctf-agent-shared-budget-beepbeep-tdoa-acoustic-array-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r42-prtseek-beeplocator.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r344File),'utf8');
      assert.ok(txt.includes('1,900.00')&&txt.includes('3,950.00')&&txt.includes('5,850.00')&&txt.includes('90.00')&&txt.includes('350.00')&&txt.includes('440.00')&&txt.includes('5,410.00')&&txt.includes('92.48%')&&txt.includes('not_measured'),r344File+': contains exact 11-15 R42 prtseek+beeplocator closed-form parameters');
    }
    // 2026-11-15 Night Round 43 (R345: Eynnzerr/TelemetryCleaner + adriancmurray/symcache-prune) verification
    const r345PathA=1880.00+39.0*100.00;
    assert.equal(r345PathA.toFixed(2),'5780.00','11-15 R43 Path A total');
    const r345PathC=85.00+3.5*100.00;
    assert.equal(r345PathC.toFixed(2),'435.00','11-15 R43 Path C total');
    assert.equal((r345PathA-r345PathC).toFixed(2),'5345.00','11-15 R43 savings vs Path A');
    assert.equal(((r345PathA-r345PathC)/r345PathA*100).toFixed(2),'92.47','11-15 R43 pct savings vs Path A');
    for(const r345File of ['workshops/github-trending-radar/docs/telemetrycleaner-symcache-prune-shizuku-binder-android-debloat-macos-coresymbolicationd-launchd-selection-faq.md','workshops/github-trending-radar/docs/telemetrycleaner-symcache-prune-shizuku-binder-android-debloat-macos-coresymbolicationd-launchd-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r43-telemetrycleaner-symcacheprune.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r345File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,900.00')&&txt.includes('5,780.00')&&txt.includes('85.00')&&txt.includes('350.00')&&txt.includes('435.00')&&txt.includes('5,345.00')&&txt.includes('92.47%')&&txt.includes('not_measured'),r345File+': contains exact 11-15 R43 telemetrycleaner+symcacheprune closed-form parameters');
    }
    // 2026-11-15 Night Round 44 (R346: DEGger21/numpilot + argonrobotics-ai/alloy) verification
    const r346PathA=2150.00+41.0*100.00;
    assert.equal(r346PathA.toFixed(2),'6250.00','11-15 R44 Path A total');
    const r346PathC=115.00+3.5*100.00;
    assert.equal(r346PathC.toFixed(2),'465.00','11-15 R44 Path C total');
    assert.equal((r346PathA-r346PathC).toFixed(2),'5785.00','11-15 R44 savings vs Path A');
    assert.equal(((r346PathA-r346PathC)/r346PathA*100).toFixed(2),'92.56','11-15 R44 pct savings vs Path A');
    for(const r346File of ['workshops/github-trending-radar/docs/numpilot-alloy-ascend-npu-asnumpy-migration-agent-multimaterial-gpu-robot-physics-mcp-selection-faq.md','workshops/github-trending-radar/docs/numpilot-alloy-ascend-npu-asnumpy-migration-agent-multimaterial-gpu-robot-physics-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r44-numpilot-alloy.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r346File),'utf8');
      assert.ok(txt.includes('2,150.00')&&txt.includes('4,100.00')&&txt.includes('6,250.00')&&txt.includes('115.00')&&txt.includes('350.00')&&txt.includes('465.00')&&txt.includes('5,785.00')&&txt.includes('92.56%')&&txt.includes('not_measured'),r346File+': contains exact 11-15 R44 numpilot+alloy closed-form parameters');
    }
    // 2026-11-15 Night Round 45 (R347: VoxDance-Lab/VoxMel + native-bond-lab/Jev-Interaction) verification
    const r347PathA=2080.00+40.0*100.00;
    assert.equal(r347PathA.toFixed(2),'6080.00','11-15 R45 Path A total');
    const r347PathC=105.00+3.5*100.00;
    assert.equal(r347PathC.toFixed(2),'455.00','11-15 R45 Path C total');
    assert.equal((r347PathA-r347PathC).toFixed(2),'5625.00','11-15 R45 savings vs Path A');
    assert.equal(((r347PathA-r347PathC)/r347PathA*100).toFixed(2),'92.52','11-15 R45 pct savings vs Path A');
    for(const r347File of ['workshops/github-trending-radar/docs/voxmel-jev-interaction-wavelet-ar-tts-grpo-system1-full-duplex-turn-taking-selection-faq.md','workshops/github-trending-radar/docs/voxmel-jev-interaction-wavelet-ar-tts-grpo-system1-full-duplex-turn-taking-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r45-voxmel-jevinteraction.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r347File),'utf8');
      assert.ok(txt.includes('2,080.00')&&txt.includes('4,000.00')&&txt.includes('6,080.00')&&txt.includes('105.00')&&txt.includes('350.00')&&txt.includes('455.00')&&txt.includes('5,625.00')&&txt.includes('92.52%')&&txt.includes('not_measured'),r347File+': contains exact 11-15 R45 voxmel+jevinteraction closed-form parameters');
    }
    // 2026-11-15 Night Round 46 (R348: BudgetAny/Budget3D + OpenDriveLab/Compass) verification
    const r348PathA=2040.00+40.0*100.00;
    assert.equal(r348PathA.toFixed(2),'6040.00','11-15 R46 Path A total');
    const r348PathC=105.00+3.5*100.00;
    assert.equal(r348PathC.toFixed(2),'455.00','11-15 R46 Path C total');
    assert.equal((r348PathA-r348PathC).toFixed(2),'5585.00','11-15 R46 savings vs Path A');
    assert.equal(((r348PathA-r348PathC)/r348PathA*100).toFixed(2),'92.47','11-15 R46 pct savings vs Path A');
    for(const r348File of ['workshops/github-trending-radar/docs/budget3d-compass-compute-adaptive-3dgs-tokenization-monocular-2min-history-vln-selection-faq.md','workshops/github-trending-radar/docs/budget3d-compass-compute-adaptive-3dgs-tokenization-monocular-2min-history-vln-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r46-budget3d-compass.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r348File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,000.00')&&txt.includes('6,040.00')&&txt.includes('105.00')&&txt.includes('350.00')&&txt.includes('455.00')&&txt.includes('5,585.00')&&txt.includes('92.47%')&&txt.includes('not_measured'),r348File+': contains exact 11-15 R46 budget3d+compass closed-form parameters');
    }
    // 2026-11-15 Night Round 47 (R349: linggan121/visual-fidelity + minchenlee/loadsketch) verification
    const r349PathA=1960.00+40.0*100.00;
    assert.equal(r349PathA.toFixed(2),'5960.00','11-15 R47 Path A total');
    const r349PathC=95.00+3.5*100.00;
    assert.equal(r349PathC.toFixed(2),'445.00','11-15 R47 Path C total');
    assert.equal((r349PathA-r349PathC).toFixed(2),'5515.00','11-15 R47 savings vs Path A');
    assert.equal(((r349PathA-r349PathC)/r349PathA*100).toFixed(2),'92.53','11-15 R47 pct savings vs Path A');
    for(const r349File of ['workshops/github-trending-radar/docs/visual-fidelity-loadsketch-numeric-ui-reconstruction-1px-audit-discrete-event-system-simulator-selection-faq.md','workshops/github-trending-radar/docs/visual-fidelity-loadsketch-numeric-ui-reconstruction-1px-audit-discrete-event-system-simulator-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r47-visualfidelity-loadsketch.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r349File),'utf8');
      assert.ok(txt.includes('1,960.00')&&txt.includes('4,000.00')&&txt.includes('5,960.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,515.00')&&txt.includes('92.53%')&&txt.includes('not_measured'),r349File+': contains exact 11-15 R47 visualfidelity+loadsketch closed-form parameters');
    }
    // 2026-11-15 Night Round 48 (R350: phpstan/tally + matheuzgomes/gawain) verification
    const r350PathA=1850.00+39.0*100.00;
    assert.equal(r350PathA.toFixed(2),'5750.00','11-15 R48 Path A total');
    const r350PathC=85.00+3.5*100.00;
    assert.equal(r350PathC.toFixed(2),'435.00','11-15 R48 Path C total');
    assert.equal((r350PathA-r350PathC).toFixed(2),'5315.00','11-15 R48 savings vs Path A');
    assert.equal(((r350PathA-r350PathC)/r350PathA*100).toFixed(2),'92.43','11-15 R48 pct savings vs Path A');
    for(const r350File of ['workshops/github-trending-radar/docs/tally-gawain-cpu-independent-valgrind-instruction-benchmark-rust-python-type-covenant-selection-faq.md','workshops/github-trending-radar/docs/tally-gawain-cpu-independent-valgrind-instruction-benchmark-rust-python-type-covenant-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r48-tally-gawain.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r350File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,900.00')&&txt.includes('5,750.00')&&txt.includes('85.00')&&txt.includes('350.00')&&txt.includes('435.00')&&txt.includes('5,315.00')&&txt.includes('92.43%')&&txt.includes('not_measured'),r350File+': contains exact 11-15 R48 tally+gawain closed-form parameters');
    }
    // 2026-11-15 Night Round 49 (R351: martian56/tessery + Elisekaiu/Cross-entry-continuity) verification
    const r351PathA=1920.00+39.5*100.00;
    assert.equal(r351PathA.toFixed(2),'5870.00','11-15 R49 Path A total');
    const r351PathC=90.00+3.5*100.00;
    assert.equal(r351PathC.toFixed(2),'440.00','11-15 R49 Path C total');
    assert.equal((r351PathA-r351PathC).toFixed(2),'5430.00','11-15 R49 savings vs Path A');
    assert.equal(((r351PathA-r351PathC)/r351PathA*100).toFixed(2),'92.50','11-15 R49 pct savings vs Path A');
    for(const r351File of ['workshops/github-trending-radar/docs/tessery-cross-entry-continuity-14lang-git-system-codegen-mcp-5layer-chat-continuity-selection-faq.md','workshops/github-trending-radar/docs/tessery-cross-entry-continuity-14lang-git-system-codegen-mcp-5layer-chat-continuity-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r49-tessery-crossentry.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r351File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,950.00')&&txt.includes('5,870.00')&&txt.includes('90.00')&&txt.includes('350.00')&&txt.includes('440.00')&&txt.includes('5,430.00')&&txt.includes('92.50%')&&txt.includes('not_measured'),r351File+': contains exact 11-15 R49 tessery+crossentry closed-form parameters');
    }
    // 2026-11-15 Night Round 50 (R352: shadowDragons/vsux + candygoogy/atieclxx-fix) verification
    const r352PathA=1780.00+38.5*100.00;
    assert.equal(r352PathA.toFixed(2),'5630.00','11-15 R50 Path A total');
    const r352PathC=80.00+3.5*100.00;
    assert.equal(r352PathC.toFixed(2),'430.00','11-15 R50 Path C total');
    assert.equal((r352PathA-r352PathC).toFixed(2),'5200.00','11-15 R50 savings vs Path A');
    assert.equal(((r352PathA-r352PathC)/r352PathA*100).toFixed(2),'92.36','11-15 R50 pct savings vs Path A');
    for(const r352File of ['workshops/github-trending-radar/docs/vsux-atieclxx-fix-ghostty-swiftui-macos-workspace-amd-ssd-write-acl-fix-selection-faq.md','workshops/github-trending-radar/docs/vsux-atieclxx-fix-ghostty-swiftui-macos-workspace-amd-ssd-write-acl-fix-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r50-vsux-atieclxxfix.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r352File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,850.00')&&txt.includes('5,630.00')&&txt.includes('80.00')&&txt.includes('350.00')&&txt.includes('430.00')&&txt.includes('5,200.00')&&txt.includes('92.36%')&&txt.includes('not_measured'),r352File+': contains exact 11-15 R50 vsux+atieclxxfix closed-form parameters');
    }
    // 2026-11-15 Night Round 51 (R353: nankhor/kite-pack + duwqijlk/muse-protocol) verification
    const r353PathA=1940.00+40.0*100.00;
    assert.equal(r353PathA.toFixed(2),'5940.00','11-15 R51 Path A total');
    const r353PathC=95.00+3.5*100.00;
    assert.equal(r353PathC.toFixed(2),'445.00','11-15 R51 Path C total');
    assert.equal((r353PathA-r353PathC).toFixed(2),'5495.00','11-15 R51 savings vs Path A');
    assert.equal(((r353PathA-r353PathC)/r353PathA*100).toFixed(2),'92.51','11-15 R51 pct savings vs Path A');
    for(const r353File of ['workshops/github-trending-radar/docs/kite-pack-muse-protocol-zstd-cow-ava1-pipeline-stateful-http-protocol-audit-selection-faq.md','workshops/github-trending-radar/docs/kite-pack-muse-protocol-zstd-cow-ava1-pipeline-stateful-http-protocol-audit-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r51-kitepack-museprotocol.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r353File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('4,000.00')&&txt.includes('5,940.00')&&txt.includes('95.00')&&txt.includes('350.00')&&txt.includes('445.00')&&txt.includes('5,495.00')&&txt.includes('92.51%')&&txt.includes('not_measured'),r353File+': contains exact 11-15 R51 kitepack+museprotocol closed-form parameters');
    }
    // 2026-11-15 Night Round 52 (R354: adriadam10/mkw-recomp + MSNightmare/SignDrop) verification
    const r354PathA=2020.00+41.5*100.00;
    assert.equal(r354PathA.toFixed(2),'6170.00','11-15 R52 Path A total');
    const r354PathC=95.00+3.6*100.00;
    assert.equal(r354PathC.toFixed(2),'455.00','11-15 R52 Path C total');
    assert.equal((r354PathA-r354PathC).toFixed(2),'5715.00','11-15 R52 savings vs Path A');
    assert.equal(((r354PathA-r354PathC)/r354PathA*100).toFixed(2),'92.63','11-15 R52 pct savings vs Path A');
    for(const r354File of ['workshops/github-trending-radar/docs/mkw-recomp-signdrop-aarch64-c-static-recompiler-sm86-spirv-windows-clfs-cnpf-audit-selection-faq.md','workshops/github-trending-radar/docs/mkw-recomp-signdrop-aarch64-c-static-recompiler-sm86-spirv-windows-clfs-cnpf-audit-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r52-mkwrecomp-signdrop.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r354File),'utf8');
      assert.ok(txt.includes('2,020.00')&&txt.includes('4,150.00')&&txt.includes('6,170.00')&&txt.includes('95.00')&&txt.includes('360.00')&&txt.includes('455.00')&&txt.includes('5,715.00')&&txt.includes('92.63%')&&txt.includes('not_measured'),r354File+': contains exact 11-15 R52 mkwrecomp+signdrop closed-form parameters');
    }
    // 2026-11-15 Night Round 53 (R355 Milestone: huamidev/GestaltX + Kianuni/Erosion-CN + kolbicz/WQFiles) verification
    const r355PathA=1860.00+39.0*100.00;
    assert.equal(r355PathA.toFixed(2),'5760.00','11-15 R53 Path A total');
    const r355PathC=85.00+3.5*100.00;
    assert.equal(r355PathC.toFixed(2),'435.00','11-15 R53 Path C total');
    assert.equal((r355PathA-r355PathC).toFixed(2),'5325.00','11-15 R53 savings vs Path A');
    assert.equal(((r355PathA-r355PathC)/r355PathA*100).toFixed(2),'92.45','11-15 R53 pct savings vs Path A');
    for(const r355File of ['workshops/github-trending-radar/docs/gestaltx-erosion-cn-wqfiles-ios27-worse-query-mobilegestalt-pwrite-vault-selection-faq.md','workshops/github-trending-radar/docs/gestaltx-erosion-cn-wqfiles-ios27-worse-query-mobilegestalt-pwrite-vault-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r53-gestaltx-erosioncn.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r355File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,900.00')&&txt.includes('5,760.00')&&txt.includes('85.00')&&txt.includes('350.00')&&txt.includes('435.00')&&txt.includes('5,325.00')&&txt.includes('92.45%')&&txt.includes('not_measured'),r355File+': contains exact 11-15 R53 gestaltx+erosioncn closed-form parameters');
    }
    // 2026-11-15 Night Round 54 (R356: EpicMorg/Hammer-MCP + antirez/YouRecApp + allthemalware/vhs-phys) verification
    const r356PathA=1960.00+40.5*100.00;
    assert.equal(r356PathA.toFixed(2),'6010.00','11-15 R54 Path A total');
    const r356PathC=90.00+3.5*100.00;
    assert.equal(r356PathC.toFixed(2),'440.00','11-15 R54 Path C total');
    assert.equal((r356PathA-r356PathC).toFixed(2),'5570.00','11-15 R54 savings vs Path A');
    assert.equal(((r356PathA-r356PathC)/r356PathA*100).toFixed(2),'92.68','11-15 R54 pct savings vs Path A');
    for(const r356File of ['workshops/github-trending-radar/docs/hammer-mcp-yourec-vhs-phys-wm-copydata-mcp-qwen3-asr-voicefixer-karlqvist-fm-selection-faq.md','workshops/github-trending-radar/docs/hammer-mcp-yourec-vhs-phys-wm-copydata-mcp-qwen3-asr-voicefixer-karlqvist-fm-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r54-hammermcp-yourec-vhsphys.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r356File),'utf8');
      assert.ok(txt.includes('1,960.00')&&txt.includes('4,050.00')&&txt.includes('6,010.00')&&txt.includes('90.00')&&txt.includes('350.00')&&txt.includes('440.00')&&txt.includes('5,570.00')&&txt.includes('92.68%')&&txt.includes('not_measured'),r356File+': contains exact 11-15 R54 hammermcp+yourec+vhsphys closed-form parameters');
    }
    // 2026-11-15 Night Round 55 (R357: nwdxlgzs/HttpLocalServer + jessekhach/QuickPass) verification
    const r357PathA=1820.00+38.0*100.00;
    assert.equal(r357PathA.toFixed(2),'5620.00','11-15 R55 Path A total');
    const r357PathC=80.00+3.4*100.00;
    assert.equal(r357PathC.toFixed(2),'420.00','11-15 R55 Path C total');
    assert.equal((r357PathA-r357PathC).toFixed(2),'5200.00','11-15 R55 savings vs Path A');
    assert.equal(((r357PathA-r357PathC)/r357PathA*100).toFixed(2),'92.53','11-15 R55 pct savings vs Path A');
    for(const r357File of ['workshops/github-trending-radar/docs/httplocalserver-quickpass-cpp17-wamr-quickjs-mcp-lan-server-macos-accessibility-passwords-selection-faq.md','workshops/github-trending-radar/docs/httplocalserver-quickpass-cpp17-wamr-quickjs-mcp-lan-server-macos-accessibility-passwords-selection-faq.en.md','assets/github-ai-radar-2026-11-15-r55-httplocalserver-quickpass.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-15-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r357File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,800.00')&&txt.includes('5,620.00')&&txt.includes('80.00')&&txt.includes('340.00')&&txt.includes('420.00')&&txt.includes('5,200.00')&&txt.includes('92.53%')&&txt.includes('not_measured'),r357File+': contains exact 11-15 R55 httplocalserver+quickpass closed-form parameters');
    }
    // 2026-11-16 Raw Evidence SHA-256, Track A/B & Night Round 1 (R358: google-research/paper-orchestra + kajisho5/ffmpeg-skill) verification
    const rawHtml1116=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-16-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(crypto.createHash('sha256').update(rawHtml1116).digest('hex'),'d7a6393c3bd87b405df931f6830f66ee4058f5637035556c179bed85f967280d','2026-11-16 raw HTML LF sha256');
    const rawSearch1116Str=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-16-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(crypto.createHash('sha256').update(rawSearch1116Str).digest('hex'),'46d666fc910e846ffb0646ea5f192c7525917c95eb467dbc96f0a00db373c776','2026-11-16 raw Search JSON LF sha256');
    const rawSearch1116=JSON.parse(rawSearch1116Str);
    const rawSearch1116Map=new Map(rawSearch1116.items.map(it=>[it.full_name,it]));
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_16.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': 11-16 Track A provenance');
      assert.ok(rawHtml1116.includes(`href="/${item.full_name}"`),item.full_name+': present in 11-16 raw HTML');
      assert.ok(rawHtml1116.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in 11-16 raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_16.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': 11-16 Track B stars_today must be not_measured');
      assert.ok(rawSearch1116Map.has(item.full_name),item.full_name+': present in 11-16 archived Search API JSON');
      const rawEntry=rawSearch1116Map.get(item.full_name);
      assert.equal(item.stars_total_search_api,rawEntry.stargazers_count,item.full_name+': 11-16 stars_total_search_api matches Search API JSON');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': 11-16 stars_per_day closed-form');
    }
    const r358PathA=1940.00+40.0*100.00;
    assert.equal(r358PathA.toFixed(2),'5940.00','11-16 R1 Path A total');
    const r358PathC=120.00+3.4*100.00;
    assert.equal(r358PathC.toFixed(2),'460.00','11-16 R1 Path C total');
    assert.equal((r358PathA-r358PathC).toFixed(2),'5480.00','11-16 R1 savings vs Path A');
    assert.equal(((r358PathA-r358PathC)/r358PathA*100).toFixed(2),'92.26','11-16 R1 pct savings vs Path A');
    for(const r358File of ['workshops/github-trending-radar/docs/paper-orchestra-ffmpeg-skill-5agent-latex-research-writer-42tool-spec-verified-video-mcp-selection-faq.md','workshops/github-trending-radar/docs/paper-orchestra-ffmpeg-skill-5agent-latex-research-writer-42tool-spec-verified-video-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r1-paperorchestra-ffmpegskill.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r358File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('4,000.00')&&txt.includes('5,940.00')&&txt.includes('120.00')&&txt.includes('340.00')&&txt.includes('460.00')&&txt.includes('5,480.00')&&txt.includes('92.26%')&&txt.includes('not_measured'),r358File+': contains exact 11-16 R1 paper-orchestra+ffmpeg-skill closed-form parameters');
    }
    // 2026-11-16 Night Round 2 (R359: mvanhorn/last30days-skill + DeanChensj/jiangshan-map) verification
    const r359PathA=1780.00+38.0*100.00;
    assert.equal(r359PathA.toFixed(2),'5580.00','11-16 R2 Path A total');
    const r359PathC=95.00+3.3*100.00;
    assert.equal(r359PathC.toFixed(2),'425.00','11-16 R2 Path C total');
    assert.equal((r359PathA-r359PathC).toFixed(2),'5155.00','11-16 R2 savings vs Path A');
    assert.equal(((r359PathA-r359PathC)/r359PathA*100).toFixed(2),'92.38','11-16 R2 pct savings vs Path A');
    for(const r359File of ['workshops/github-trending-radar/docs/last30days-skill-jiangshan-map-22source-social-prediction-research-4d-spatiotemporal-atlas-mcp-selection-faq.md','workshops/github-trending-radar/docs/last30days-skill-jiangshan-map-22source-social-prediction-research-4d-spatiotemporal-atlas-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r2-last30days-jiangshanmap.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r359File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,800.00')&&txt.includes('5,580.00')&&txt.includes('95.00')&&txt.includes('330.00')&&txt.includes('425.00')&&txt.includes('5,155.00')&&txt.includes('92.38%')&&txt.includes('not_measured'),r359File+': contains exact 11-16 R2 last30days+jiangshan-map closed-form parameters');
    }
    // 2026-11-16 Night Round 3 (R360 Milestone: getarcaneapp/arcane + davidondrej/superbot) verification
    const r360PathA=1860.00+39.0*100.00;
    assert.equal(r360PathA.toFixed(2),'5760.00','11-16 R3 Path A total');
    const r360PathC=110.00+3.4*100.00;
    assert.equal(r360PathC.toFixed(2),'450.00','11-16 R3 Path C total');
    assert.equal((r360PathA-r360PathC).toFixed(2),'5310.00','11-16 R3 savings vs Path A');
    assert.equal(((r360PathA-r360PathC)/r360PathA*100).toFixed(2),'92.19','11-16 R3 pct savings vs Path A');
    for(const r360File of ['workshops/github-trending-radar/docs/arcane-superbot-huma-v2-docker-control-plane-rust-multi-harness-grok-bot-team-selection-faq.md','workshops/github-trending-radar/docs/arcane-superbot-huma-v2-docker-control-plane-rust-multi-harness-grok-bot-team-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r3-arcane-superbot.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r360File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,900.00')&&txt.includes('5,760.00')&&txt.includes('110.00')&&txt.includes('340.00')&&txt.includes('450.00')&&txt.includes('5,310.00')&&txt.includes('92.19%')&&txt.includes('not_measured'),r360File+': contains exact 11-16 R3 arcane+superbot closed-form parameters');
    }
    // 2026-11-16 Night Round 4 (R361: yetanotherbrowser/yab + manuelgscom/inside-llm) verification
    const r361PathA=1720.00+37.0*100.00;
    assert.equal(r361PathA.toFixed(2),'5420.00','11-16 R4 Path A total');
    const r361PathC=90.00+3.2*100.00;
    assert.equal(r361PathC.toFixed(2),'410.00','11-16 R4 Path C total');
    assert.equal((r361PathA-r361PathC).toFixed(2),'5010.00','11-16 R4 savings vs Path A');
    assert.equal(((r361PathA-r361PathC)/r361PathA*100).toFixed(2),'92.44','11-16 R4 pct savings vs Path A');
    for(const r361File of ['workshops/github-trending-radar/docs/yab-inside-llm-webkit-chromium-agent-browser-gguf-quantization-divergence-sampler-xray-selection-faq.md','workshops/github-trending-radar/docs/yab-inside-llm-webkit-chromium-agent-browser-gguf-quantization-divergence-sampler-xray-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r4-yab-insidellm.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r361File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,700.00')&&txt.includes('5,420.00')&&txt.includes('90.00')&&txt.includes('320.00')&&txt.includes('410.00')&&txt.includes('5,010.00')&&txt.includes('92.44%')&&txt.includes('not_measured'),r361File+': contains exact 11-16 R4 yab+inside-llm closed-form parameters');
    }
    // 2026-11-16 Night Round 5 (R362: brianbell-x/codehygiene + brianbell-x/ssd-ransomware-guard + Eppy-EpHard/AHA) verification
    const r362PathA=2120.00+41.0*100.00;
    assert.equal(r362PathA.toFixed(2),'6220.00','11-16 R5 Path A total');
    const r362PathC=75.00+3.2*100.00;
    assert.equal(r362PathC.toFixed(2),'395.00','11-16 R5 Path C total');
    assert.equal((r362PathA-r362PathC).toFixed(2),'5825.00','11-16 R5 savings vs Path A');
    assert.equal(((r362PathA-r362PathC)/r362PathA*100).toFixed(2),'93.65','11-16 R5 pct savings vs Path A');
    for(const r362File of ['workshops/github-trending-radar/docs/codehygiene-ssd-ransomware-guard-aha-ternary-weight-space-programming-without-llms-selection-faq.md','workshops/github-trending-radar/docs/codehygiene-ssd-ransomware-guard-aha-ternary-weight-space-programming-without-llms-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r5-weightspace-trio.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r362File),'utf8');
      assert.ok(txt.includes('2,120.00')&&txt.includes('4,100.00')&&txt.includes('6,220.00')&&txt.includes('75.00')&&txt.includes('320.00')&&txt.includes('395.00')&&txt.includes('5,825.00')&&txt.includes('93.65%')&&txt.includes('not_measured'),r362File+': contains exact 11-16 R5 codehygiene+ssd-guard+aha closed-form parameters');
    }
    // 2026-11-16 Night Round 6 (R363: apekshik/three-nanite + siliconjungle/shapeshift-labs-ink-studio + iamvillain/SyntaxSplat) verification
    const r363PathA=1880.00+39.0*100.00;
    assert.equal(r363PathA.toFixed(2),'5780.00','11-16 R6 Path A total');
    const r363PathC=85.00+3.3*100.00;
    assert.equal(r363PathC.toFixed(2),'415.00','11-16 R6 Path C total');
    assert.equal((r363PathA-r363PathC).toFixed(2),'5365.00','11-16 R6 savings vs Path A');
    assert.equal(((r363PathA-r363PathC)/r363PathA*100).toFixed(2),'92.82','11-16 R6 pct savings vs Path A');
    for(const r363File of ['workshops/github-trending-radar/docs/three-nanite-ink-studio-syntaxsplat-cluster-lod-virtual-geometry-sdf-pixelart-gaussian-splats-selection-faq.md','workshops/github-trending-radar/docs/three-nanite-ink-studio-syntaxsplat-cluster-lod-virtual-geometry-sdf-pixelart-gaussian-splats-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r6-threenanite-inkstudio.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r363File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,900.00')&&txt.includes('5,780.00')&&txt.includes('85.00')&&txt.includes('330.00')&&txt.includes('415.00')&&txt.includes('5,365.00')&&txt.includes('92.82%')&&txt.includes('not_measured'),r363File+': contains exact 11-16 R6 three-nanite+ink-studio+syntaxsplat closed-form parameters');
    }
    // 2026-11-16 Night Round 7 (R364: agenticode/my + morajabi/poo) verification
    const r364PathA=1950.00+40.0*100.00;
    assert.equal(r364PathA.toFixed(2),'5950.00','11-16 R7 Path A total');
    const r364PathC=80.00+3.1*100.00;
    assert.equal(r364PathC.toFixed(2),'390.00','11-16 R7 Path C total');
    assert.equal((r364PathA-r364PathC).toFixed(2),'5560.00','11-16 R7 savings vs Path A');
    assert.equal(((r364PathA-r364PathC)/r364PathA*100).toFixed(2),'93.45','11-16 R7 pct savings vs Path A');
    for(const r364File of ['workshops/github-trending-radar/docs/agenticode-my-morajabi-poo-dimm-serial-ras-memory-forensics-worktree-safe-disk-cleaner-mcp-selection-faq.md','workshops/github-trending-radar/docs/agenticode-my-morajabi-poo-dimm-serial-ras-memory-forensics-worktree-safe-disk-cleaner-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r7-memory-poo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r364File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('4,000.00')&&txt.includes('5,950.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,560.00')&&txt.includes('93.45%')&&txt.includes('not_measured'),r364File+': contains exact 11-16 R7 agenticode-my+morajabi-poo closed-form parameters');
    }
    // 2026-11-16 Night Round 8 (R365 Milestone: mdexa-ai/mdexa-ai-native-database + martin-steinegger/molart) verification
    const r365PathA=1840.00+39.0*100.00;
    assert.equal(r365PathA.toFixed(2),'5740.00','11-16 R8 Path A total');
    const r365PathC=70.00+3.1*100.00;
    assert.equal(r365PathC.toFixed(2),'380.00','11-16 R8 Path C total');
    assert.equal((r365PathA-r365PathC).toFixed(2),'5360.00','11-16 R8 savings vs Path A');
    assert.equal(((r365PathA-r365PathC)/r365PathA*100).toFixed(2),'93.38','11-16 R8 pct savings vs Path A');
    for(const r365File of ['workshops/github-trending-radar/docs/mdexa-ai-native-database-molart-sha256-medical-dataset-license-mcp-21style-protein-renderer-selection-faq.md','workshops/github-trending-radar/docs/mdexa-ai-native-database-molart-sha256-medical-dataset-license-mcp-21style-protein-renderer-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r8-mdexa-molart.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r365File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,900.00')&&txt.includes('5,740.00')&&txt.includes('70.00')&&txt.includes('310.00')&&txt.includes('380.00')&&txt.includes('5,360.00')&&txt.includes('93.38%')&&txt.includes('not_measured'),r365File+': contains exact 11-16 R8 mdexa+molart closed-form parameters');
    }
    // 2026-11-16 Night Round 9 (R366: diego3g/craft + finktheartist/sakuga-vfx + rauchg/xeet) verification
    const r366PathA=2050.00+40.0*100.00;
    assert.equal(r366PathA.toFixed(2),'6050.00','11-16 R9 Path A total');
    const r366PathC=85.00+3.2*100.00;
    assert.equal(r366PathC.toFixed(2),'405.00','11-16 R9 Path C total');
    assert.equal((r366PathA-r366PathC).toFixed(2),'5645.00','11-16 R9 savings vs Path A');
    assert.equal(((r366PathA-r366PathC)/r366PathA*100).toFixed(2),'93.31','11-16 R9 pct savings vs Path A');
    for(const r366File of ['workshops/github-trending-radar/docs/diego3g-craft-sakuga-vfx-rauchg-xeet-7skill-ui-states-anime-webcomponents-2ms-rust-wasm-tweet-renderer-selection-faq.md','workshops/github-trending-radar/docs/diego3g-craft-sakuga-vfx-rauchg-xeet-7skill-ui-states-anime-webcomponents-2ms-rust-wasm-tweet-renderer-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r9-craft-sakuga-xeet.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r366File),'utf8');
      assert.ok(txt.includes('2,050.00')&&txt.includes('4,000.00')&&txt.includes('6,050.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,645.00')&&txt.includes('93.31%')&&txt.includes('not_measured'),r366File+': contains exact 11-16 R9 craft+sakuga+xeet closed-form parameters');
    }
    // 2026-11-16 Night Round 10 (R367: AI4XE/Parallax + WollyMonjac/Tiny-2.1) verification
    const r367PathA=1820.00+38.0*100.00;
    assert.equal(r367PathA.toFixed(2),'5620.00','11-16 R10 Path A total');
    const r367PathC=85.00+3.2*100.00;
    assert.equal(r367PathC.toFixed(2),'405.00','11-16 R10 Path C total');
    assert.equal((r367PathA-r367PathC).toFixed(2),'5215.00','11-16 R10 savings vs Path A');
    assert.equal(((r367PathA-r367PathC)/r367PathA*100).toFixed(2),'92.79','11-16 R10 pct savings vs Path A');
    for(const r367File of ['workshops/github-trending-radar/docs/ai4xe-parallax-tiny21-60pct-context-handoff-team-harness-380kb-dos-floppy-transformer-selection-faq.md','workshops/github-trending-radar/docs/ai4xe-parallax-tiny21-60pct-context-handoff-team-harness-380kb-dos-floppy-transformer-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r10-parallax-tiny21.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r367File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,800.00')&&txt.includes('5,620.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,215.00')&&txt.includes('92.79%')&&txt.includes('not_measured'),r367File+': contains exact 11-16 R10 parallax+tiny21 closed-form parameters');
    }
    // 2026-11-16 Night Round 11 (R368: huangserva/h3-fight + liangdabiao/seedance-storyboard-generator-realman + ramazansubasi/davar) verification
    const r368PathA=1980.00+40.0*100.00;
    assert.equal(r368PathA.toFixed(2),'5980.00','11-16 R11 Path A total');
    const r368PathC=95.00+3.3*100.00;
    assert.equal(r368PathC.toFixed(2),'425.00','11-16 R11 Path C total');
    assert.equal((r368PathA-r368PathC).toFixed(2),'5555.00','11-16 R11 savings vs Path A');
    assert.equal(((r368PathA-r368PathC)/r368PathA*100).toFixed(2),'92.89','11-16 R11 pct savings vs Path A');
    for(const r368File of ['workshops/github-trending-radar/docs/h3-fight-seedance-realman-davar-188block-action-prompts-6pillar-liveaction-resolve-fcpxml-selection-faq.md','workshops/github-trending-radar/docs/h3-fight-seedance-realman-davar-188block-action-prompts-6pillar-liveaction-resolve-fcpxml-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r11-h3fight-seedance-davar.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r368File),'utf8');
      assert.ok(txt.includes('1,980.00')&&txt.includes('4,000.00')&&txt.includes('5,980.00')&&txt.includes('95.00')&&txt.includes('330.00')&&txt.includes('425.00')&&txt.includes('5,555.00')&&txt.includes('92.89%')&&txt.includes('not_measured'),r368File+': contains exact 11-16 R11 h3-fight+seedance+davar closed-form parameters');
    }
    // 2026-11-16 Night Round 12 (R369: nadim-sheikh/AccountDeck + andyhuo520/beanpod) verification
    const r369PathA=1760.00+38.0*100.00;
    assert.equal(r369PathA.toFixed(2),'5560.00','11-16 R12 Path A total');
    const r369PathC=75.00+3.1*100.00;
    assert.equal(r369PathC.toFixed(2),'385.00','11-16 R12 Path C total');
    assert.equal((r369PathA-r369PathC).toFixed(2),'5175.00','11-16 R12 savings vs Path A');
    assert.equal(((r369PathA-r369PathC)/r369PathA*100).toFixed(2),'93.08','11-16 R12 pct savings vs Path A');
    for(const r369File of ['workshops/github-trending-radar/docs/accountdeck-beanpod-multi-account-claude-codex-quota-switcher-d3200-local-qwen3-asr-mcp-selection-faq.md','workshops/github-trending-radar/docs/accountdeck-beanpod-multi-account-claude-codex-quota-switcher-d3200-local-qwen3-asr-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r12-accountdeck-beanpod.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r369File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,800.00')&&txt.includes('5,560.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,175.00')&&txt.includes('93.08%')&&txt.includes('not_measured'),r369File+': contains exact 11-16 R12 accountdeck+beanpod closed-form parameters');
    }
    // 2026-11-16 Night Round 13 (R370 Milestone: marbas207/Pathwarden + Aabyss-Team/Threat-Broadcast-Plus + IsaacJoel06/qr-snip) verification
    const r370PathA=2080.00+41.0*100.00;
    assert.equal(r370PathA.toFixed(2),'6180.00','11-16 R13 Path A total');
    const r370PathC=85.00+3.2*100.00;
    assert.equal(r370PathC.toFixed(2),'405.00','11-16 R13 Path C total');
    assert.equal((r370PathA-r370PathC).toFixed(2),'5775.00','11-16 R13 savings vs Path A');
    assert.equal(((r370PathA-r370PathC)/r370PathA*100).toFixed(2),'93.45','11-16 R13 pct savings vs Path A');
    for(const r370File of ['workshops/github-trending-radar/docs/pathwarden-threat-broadcast-plus-qr-snip-2m-object-ad-entra-mincut-7feed-cve-radar-mv3-quishing-guard-selection-faq.md','workshops/github-trending-radar/docs/pathwarden-threat-broadcast-plus-qr-snip-2m-object-ad-entra-mincut-7feed-cve-radar-mv3-quishing-guard-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r13-pathwarden-threat-qrsnip.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r370File),'utf8');
      assert.ok(txt.includes('2,080.00')&&txt.includes('4,100.00')&&txt.includes('6,180.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,775.00')&&txt.includes('93.45%')&&txt.includes('not_measured'),r370File+': contains exact 11-16 R13 pathwarden+threat-plus+qr-snip closed-form parameters');
    }
    // 2026-11-16 Night Round 14 (R371: lizhenjie137/intelligent-organization + nagavineerpasam/systems-to-ai-reading-map) verification
    const r371PathA=1680.00+37.0*100.00;
    assert.equal(r371PathA.toFixed(2),'5380.00','11-16 R14 Path A total');
    const r371PathC=65.00+3.0*100.00;
    assert.equal(r371PathC.toFixed(2),'365.00','11-16 R14 Path C total');
    assert.equal((r371PathA-r371PathC).toFixed(2),'5015.00','11-16 R14 savings vs Path A');
    assert.equal(((r371PathA-r371PathC)/r371PathA*100).toFixed(2),'93.22','11-16 R14 pct savings vs Path A');
    for(const r371File of ['workshops/github-trending-radar/docs/intelligent-organization-systems-to-ai-reading-map-6step-atomic-skill-handoff-112topic-8book-curriculum-selection-faq.md','workshops/github-trending-radar/docs/intelligent-organization-systems-to-ai-reading-map-6step-atomic-skill-handoff-112topic-8book-curriculum-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r14-intellorg-readingmap.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r371File),'utf8');
      assert.ok(txt.includes('1,680.00')&&txt.includes('3,700.00')&&txt.includes('5,380.00')&&txt.includes('65.00')&&txt.includes('300.00')&&txt.includes('365.00')&&txt.includes('5,015.00')&&txt.includes('93.22%')&&txt.includes('not_measured'),r371File+': contains exact 11-16 R14 intelligent-organization+systems-reading-map closed-form parameters');
    }
    // 2026-11-16 Night Round 15 (R372 Milestone: ZhouTimeMachine/JVT + remorses/castle-valley + stvlynn/spines) verification
    const r372PathA=1920.00+39.0*100.00;
    assert.equal(r372PathA.toFixed(2),'5820.00','11-16 R15 Path A total');
    const r372PathC=85.00+3.2*100.00;
    assert.equal(r372PathC.toFixed(2),'405.00','11-16 R15 Path C total');
    assert.equal((r372PathA-r372PathC).toFixed(2),'5415.00','11-16 R15 savings vs Path A');
    assert.equal(((r372PathA-r372PathC)/r372PathA*100).toFixed(2),'93.04','11-16 R15 pct savings vs Path A');
    for(const r372File of ['workshops/github-trending-radar/docs/jvt-castle-valley-spines-pixel-space-video-dit-2m-world-pinned-oil-dabs-cd-spine-art-skill-selection-faq.md','workshops/github-trending-radar/docs/jvt-castle-valley-spines-pixel-space-video-dit-2m-world-pinned-oil-dabs-cd-spine-art-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r15-jvt-castlevalley-spines.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r372File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,900.00')&&txt.includes('5,820.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,415.00')&&txt.includes('93.04%')&&txt.includes('not_measured'),r372File+': contains exact 11-16 R15 jvt+castle-valley+spines closed-form parameters');
    }
    // 2026-11-16 Night Round 16 (R373: ratman-bit/Rewind-IL2CPP-Decompiler + W4L33Dx/Cyber-Monster) verification
    const r373PathA=1890.00+39.5*100.00;
    assert.equal(r373PathA.toFixed(2),'5840.00','11-16 R16 Path A total');
    const r373PathC=80.00+3.1*100.00;
    assert.equal(r373PathC.toFixed(2),'390.00','11-16 R16 Path C total');
    assert.equal((r373PathA-r373PathC).toFixed(2),'5450.00','11-16 R16 savings vs Path A');
    assert.equal(((r373PathA-r373PathC)/r373PathA*100).toFixed(2),'93.32','11-16 R16 pct savings vs Path A');
    for(const r373File of ['workshops/github-trending-radar/docs/rewind-il2cpp-decompiler-cyber-monster-net10-unity-method-recovery-785-red-blue-security-skills-selection-faq.md','workshops/github-trending-radar/docs/rewind-il2cpp-decompiler-cyber-monster-net10-unity-method-recovery-785-red-blue-security-skills-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r16-rewind-cybermonster.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r373File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,950.00')&&txt.includes('5,840.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,450.00')&&txt.includes('93.32%')&&txt.includes('not_measured'),r373File+': contains exact 11-16 R16 rewind+cyber-monster closed-form parameters');
    }
    // 2026-11-16 Night Round 17 (R374: Dart-veider01/TradingAgents-crypto + AlphaCoreICT/Fractal-ultra-pro-) verification
    const r374PathA=1940.00+40.0*100.00;
    assert.equal(r374PathA.toFixed(2),'5940.00','11-16 R17 Path A total');
    const r374PathC=85.00+3.2*100.00;
    assert.equal(r374PathC.toFixed(2),'405.00','11-16 R17 Path C total');
    assert.equal((r374PathA-r374PathC).toFixed(2),'5535.00','11-16 R17 savings vs Path A');
    assert.equal(((r374PathA-r374PathC)/r374PathA*100).toFixed(2),'93.18','11-16 R17 pct savings vs Path A');
    for(const r374File of ['workshops/github-trending-radar/docs/tradingagents-crypto-fractal-ultra-pro-multi-agent-bytx-execution-34k-ast-ict-engine-selection-faq.md','workshops/github-trending-radar/docs/tradingagents-crypto-fractal-ultra-pro-multi-agent-bytx-execution-34k-ast-ict-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r17-tradingagentscrypto-fractal.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r374File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('4,000.00')&&txt.includes('5,940.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,535.00')&&txt.includes('93.18%')&&txt.includes('not_measured'),r374File+': contains exact 11-16 R17 tradingagents-crypto+fractal closed-form parameters');
    }
    // 2026-11-16 Night Round 18 (R375 Milestone: CzzzzzzJ/mdldm-maitian + zarockfat/zgg-find-ecommerce-skills) verification
    const r375PathA=1780.00+38.0*100.00;
    assert.equal(r375PathA.toFixed(2),'5580.00','11-16 R18 Path A total');
    const r375PathC=70.00+3.0*100.00;
    assert.equal(r375PathC.toFixed(2),'370.00','11-16 R18 Path C total');
    assert.equal((r375PathA-r375PathC).toFixed(2),'5210.00','11-16 R18 savings vs Path A');
    assert.equal(((r375PathA-r375PathC)/r375PathA*100).toFixed(2),'93.37','11-16 R18 pct savings vs Path A');
    for(const r375File of ['workshops/github-trending-radar/docs/mdldm-maitian-zgg-ecommerce-skills-7platform-hitl-creator-workbench-161-ecommerce-skill-router-selection-faq.md','workshops/github-trending-radar/docs/mdldm-maitian-zgg-ecommerce-skills-7platform-hitl-creator-workbench-161-ecommerce-skill-router-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r18-maitian-ecommerceskills.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r375File),'utf8');
      assert.ok(txt.includes('1,780.00')&&txt.includes('3,800.00')&&txt.includes('5,580.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,210.00')&&txt.includes('93.37%')&&txt.includes('not_measured'),r375File+': contains exact 11-16 R18 maitian+ecommerce-skills closed-form parameters');
    }
    // 2026-11-16 Night Round 19 (R376: homielab/noteflare + AdamJBurns/workflows + DesignerStephen1/ascii-animals) verification
    const r376PathA=1850.00+38.5*100.00;
    assert.equal(r376PathA.toFixed(2),'5700.00','11-16 R19 Path A total');
    const r376PathC=75.00+3.1*100.00;
    assert.equal(r376PathC.toFixed(2),'385.00','11-16 R19 Path C total');
    assert.equal((r376PathA-r376PathC).toFixed(2),'5315.00','11-16 R19 savings vs Path A');
    assert.equal(((r376PathA-r376PathC)/r376PathA*100).toFixed(2),'93.25','11-16 R19 pct savings vs Path A');
    for(const r376File of ['workshops/github-trending-radar/docs/noteflare-workflows-ascii-animals-e2ee-cloudflare-d1-notes-safe-automation-canvas-glass-ascii-ui-selection-faq.md','workshops/github-trending-radar/docs/noteflare-workflows-ascii-animals-e2ee-cloudflare-d1-notes-safe-automation-canvas-glass-ascii-ui-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r19-noteflare-workflows-asciianimals.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r376File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,850.00')&&txt.includes('5,700.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,315.00')&&txt.includes('93.25%')&&txt.includes('not_measured'),r376File+': contains exact 11-16 R19 noteflare+workflows+ascii-animals closed-form parameters');
    }
    // 2026-11-16 Night Round 20 (R377: Danuzco/bayesian-modelling-notes + ethangao907/stow-p1) verification
    const r377PathA=1720.00+37.0*100.00;
    assert.equal(r377PathA.toFixed(2),'5420.00','11-16 R20 Path A total');
    const r377PathC=70.00+3.0*100.00;
    assert.equal(r377PathC.toFixed(2),'370.00','11-16 R20 Path C total');
    assert.equal((r377PathA-r377PathC).toFixed(2),'5050.00','11-16 R20 savings vs Path A');
    assert.equal(((r377PathA-r377PathC)/r377PathA*100).toFixed(2),'93.17','11-16 R20 pct savings vs Path A');
    for(const r377File of ['workshops/github-trending-radar/docs/bayesian-modelling-notes-stow-p1-280page-jax-pymc6-probabilistic-ai-scissor-lift-portable-klipper-printer-selection-faq.md','workshops/github-trending-radar/docs/bayesian-modelling-notes-stow-p1-280page-jax-pymc6-probabilistic-ai-scissor-lift-portable-klipper-printer-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r20-bayesiannotes-stowp1.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r377File),'utf8');
      assert.ok(txt.includes('1,720.00')&&txt.includes('3,700.00')&&txt.includes('5,420.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,050.00')&&txt.includes('93.17%')&&txt.includes('not_measured'),r377File+': contains exact 11-16 R20 bayesian-notes+stow-p1 closed-form parameters');
    }
    // 2026-11-16 Night Round 21 (R378: linggan121/lingling-desktop-pet + rolazd/xiaoai-doubao) verification
    const r378PathA=1650.00+36.5*100.00;
    assert.equal(r378PathA.toFixed(2),'5300.00','11-16 R21 Path A total');
    const r378PathC=65.00+2.9*100.00;
    assert.equal(r378PathC.toFixed(2),'355.00','11-16 R21 Path C total');
    assert.equal((r378PathA-r378PathC).toFixed(2),'4945.00','11-16 R21 savings vs Path A');
    assert.equal(((r378PathA-r378PathC)/r378PathA*100).toFixed(2),'93.30','11-16 R21 pct savings vs Path A');
    for(const r378File of ['workshops/github-trending-radar/docs/lingling-desktop-pet-xiaoai-doubao-offline-content-aware-file-agent-dual-wakeword-speaker-mod-selection-faq.md','workshops/github-trending-radar/docs/lingling-desktop-pet-xiaoai-doubao-offline-content-aware-file-agent-dual-wakeword-speaker-mod-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r21-lingling-xiaoidoubao.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r378File),'utf8');
      assert.ok(txt.includes('1,650.00')&&txt.includes('3,650.00')&&txt.includes('5,300.00')&&txt.includes('65.00')&&txt.includes('290.00')&&txt.includes('355.00')&&txt.includes('4,945.00')&&txt.includes('93.30%')&&txt.includes('not_measured'),r378File+': contains exact 11-16 R21 lingling+xiaoai-doubao closed-form parameters');
    }
    // 2026-11-16 Night Round 22 (R379: neutron42-jp/github-mobile-maxxing + crafter-station/Muelle + alztrk/opentaskbar + SpolzerMod/yamusic-rs) verification
    const r379PathA=1860.00+39.0*100.00;
    assert.equal(r379PathA.toFixed(2),'5760.00','11-16 R22 Path A total');
    const r379PathC=75.00+3.1*100.00;
    assert.equal(r379PathC.toFixed(2),'385.00','11-16 R22 Path C total');
    assert.equal((r379PathA-r379PathC).toFixed(2),'5375.00','11-16 R22 savings vs Path A');
    assert.equal(((r379PathA-r379PathC)/r379PathA*100).toFixed(2),'93.32','11-16 R22 pct savings vs Path A');
    for(const r379File of ['workshops/github-trending-radar/docs/github-mobile-maxxing-muelle-opentaskbar-yamusic-rs-kmp-graphql-client-rust-native-desktop-13x-ram-selection-faq.md','workshops/github-trending-radar/docs/github-mobile-maxxing-muelle-opentaskbar-yamusic-rs-kmp-graphql-client-rust-native-desktop-13x-ram-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r22-githubmaxxing-muelle-yamusicrs.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r379File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,900.00')&&txt.includes('5,760.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,375.00')&&txt.includes('93.32%')&&txt.includes('not_measured'),r379File+': contains exact 11-16 R22 github-mobile-maxxing+muelle+yamusic-rs closed-form parameters');
    }
    // 2026-11-16 Night Round 23 (R380 Milestone: petritavd/airoom + oil-oil/oil-dev-skills + globalmpc/vibe-bill) verification
    const r380PathA=2040.00+40.5*100.00;
    assert.equal(r380PathA.toFixed(2),'6090.00','11-16 R23 Path A total');
    const r380PathC=85.00+3.2*100.00;
    assert.equal(r380PathC.toFixed(2),'405.00','11-16 R23 Path C total');
    assert.equal((r380PathA-r380PathC).toFixed(2),'5685.00','11-16 R23 savings vs Path A');
    assert.equal(((r380PathA-r380PathC)/r380PathA*100).toFixed(2),'93.35','11-16 R23 pct savings vs Path A');
    for(const r380File of ['workshops/github-trending-radar/docs/airoom-oil-dev-skills-vibe-bill-claude-control-room-6skill-scope-gate-finops-receipt-selection-faq.md','workshops/github-trending-radar/docs/airoom-oil-dev-skills-vibe-bill-claude-control-room-6skill-scope-gate-finops-receipt-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r23-airoom-oildev-vibebill.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r380File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,050.00')&&txt.includes('6,090.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,685.00')&&txt.includes('93.35%')&&txt.includes('not_measured'),r380File+': contains exact 11-16 R23 airoom+oil-dev-skills+vibe-bill closed-form parameters');
    }
    // 2026-11-16 Night Round 24 (R381: jasonsutter87/sketchcraft + GigLaboCom/gpui-kit-grid + maximilianfeix/plinkfx) verification
    const r381PathA=1820.00+38.0*100.00;
    assert.equal(r381PathA.toFixed(2),'5620.00','11-16 R24 Path A total');
    const r381PathC=75.00+3.0*100.00;
    assert.equal(r381PathC.toFixed(2),'375.00','11-16 R24 Path C total');
    assert.equal((r381PathA-r381PathC).toFixed(2),'5245.00','11-16 R24 savings vs Path A');
    assert.equal(((r381PathA-r381PathC)/r381PathA*100).toFixed(2),'93.33','11-16 R24 pct savings vs Path A');
    for(const r381File of ['workshops/github-trending-radar/docs/sketchcraft-gpui-kit-grid-plinkfx-rust-pushpull-cad-mcp-1ms-gpui-datagrid-3kb-code-sfx-selection-faq.md','workshops/github-trending-radar/docs/sketchcraft-gpui-kit-grid-plinkfx-rust-pushpull-cad-mcp-1ms-gpui-datagrid-3kb-code-sfx-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r24-sketchcraft-gpuigrid-plinkfx.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r381File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,800.00')&&txt.includes('5,620.00')&&txt.includes('75.00')&&txt.includes('300.00')&&txt.includes('375.00')&&txt.includes('5,245.00')&&txt.includes('93.33%')&&txt.includes('not_measured'),r381File+': contains exact 11-16 R24 sketchcraft+gpui-kit-grid+plinkfx closed-form parameters');
    }
    // 2026-11-16 Night Round 25 (R382: spearsheep/anima-brain + walkskysu/digital-human-koubo-comfyui + h4lo-void/bageo-call + HuskerMinion/AmberSight) verification
    const r382PathA=1960.00+39.5*100.00;
    assert.equal(r382PathA.toFixed(2),'5910.00','11-16 R25 Path A total');
    const r382PathC=85.00+3.1*100.00;
    assert.equal(r382PathC.toFixed(2),'395.00','11-16 R25 Path C total');
    assert.equal((r382PathA-r382PathC).toFixed(2),'5515.00','11-16 R25 savings vs Path A');
    assert.equal(((r382PathA-r382PathC)/r382PathA*100).toFixed(2),'93.32','11-16 R25 pct savings vs Path A');
    for(const r382File of ['workshops/github-trending-radar/docs/anima-brain-koubo-comfyui-bageo-call-ambersight-sqlite-fts5-companion-memory-local-talking-head-rust-sim-nvr-selection-faq.md','workshops/github-trending-radar/docs/anima-brain-koubo-comfyui-bageo-call-ambersight-sqlite-fts5-companion-memory-local-talking-head-rust-sim-nvr-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r25-animabrain-koubo-bageocall.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r382File),'utf8');
      assert.ok(txt.includes('1,960.00')&&txt.includes('3,950.00')&&txt.includes('5,910.00')&&txt.includes('85.00')&&txt.includes('310.00')&&txt.includes('395.00')&&txt.includes('5,515.00')&&txt.includes('93.32%')&&txt.includes('not_measured'),r382File+': contains exact 11-16 R25 anima-brain+koubo+bageo-call closed-form parameters');
    }
    // 2026-11-16 Night Round 26 (R383: paul-nameless/agweb + tammo1007/alyn + next-token-tv/next-token-skill) verification
    const r383PathA=1920.00+39.0*100.00;
    assert.equal(r383PathA.toFixed(2),'5820.00','11-16 R26 Path A total');
    const r383PathC=80.00+3.1*100.00;
    assert.equal(r383PathC.toFixed(2),'390.00','11-16 R26 Path C total');
    assert.equal((r383PathA-r383PathC).toFixed(2),'5430.00','11-16 R26 savings vs Path A');
    assert.equal(((r383PathA-r383PathC)/r383PathA*100).toFixed(2),'93.30','11-16 R26 pct savings vs Path A');
    for(const r383File of ['workshops/github-trending-radar/docs/agweb-alyn-next-token-skill-zero-focus-webkit-agent-browser-6165-skill-mcp-timestamped-podcast-rag-selection-faq.md','workshops/github-trending-radar/docs/agweb-alyn-next-token-skill-zero-focus-webkit-agent-browser-6165-skill-mcp-timestamped-podcast-rag-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r26-agweb-alyn-nexttoken.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r383File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,900.00')&&txt.includes('5,820.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,430.00')&&txt.includes('93.30%')&&txt.includes('not_measured'),r383File+': contains exact 11-16 R26 agweb+alyn+next-token closed-form parameters');
    }
    // 2026-11-16 Night Round 27 (R384: roan-maverick/tradingview-indicator-for-ai-agents + filippkowalski/apple-ads-playbook-skill) verification
    const r384PathA=1880.00+38.5*100.00;
    assert.equal(r384PathA.toFixed(2),'5730.00','11-16 R27 Path A total');
    const r384PathC=75.00+3.0*100.00;
    assert.equal(r384PathC.toFixed(2),'375.00','11-16 R27 Path C total');
    assert.equal((r384PathA-r384PathC).toFixed(2),'5355.00','11-16 R27 savings vs Path A');
    assert.equal(((r384PathA-r384PathC)/r384PathA*100).toFixed(2),'93.46','11-16 R27 pct savings vs Path A');
    for(const r384File of ['workshops/github-trending-radar/docs/ai-agent-lens-apple-ads-playbook-skill-structured-json-candle-telemetry-asa-breakeven-audit-selection-faq.md','workshops/github-trending-radar/docs/ai-agent-lens-apple-ads-playbook-skill-structured-json-candle-telemetry-asa-breakeven-audit-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r27-agentlens-appleads.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r384File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,850.00')&&txt.includes('5,730.00')&&txt.includes('75.00')&&txt.includes('300.00')&&txt.includes('375.00')&&txt.includes('5,355.00')&&txt.includes('93.46%')&&txt.includes('not_measured'),r384File+': contains exact 11-16 R27 ai-agent-lens+apple-ads closed-form parameters');
    }
    // 2026-11-16 Night Round 28 (R385 Milestone: AaBb-coder/LumenAct + nocodehack/nocodehack-roblox-engine + cobanov/pixelart-gaussiansplat) verification
    const r385PathA=1840.00+39.0*100.00;
    assert.equal(r385PathA.toFixed(2),'5740.00','11-16 R28 Path A total');
    const r385PathC=80.00+3.1*100.00;
    assert.equal(r385PathC.toFixed(2),'390.00','11-16 R28 Path C total');
    assert.equal((r385PathA-r385PathC).toFixed(2),'5350.00','11-16 R28 savings vs Path A');
    assert.equal(((r385PathA-r385PathC)/r385PathA*100).toFixed(2),'93.21','11-16 R28 pct savings vs Path A');
    for(const r385File of ['workshops/github-trending-radar/docs/lumenact-nocodehack-roblox-pixelart-gaussiansplat-118key-facial-mcp-blender-shorts-spark-3dgs-selection-faq.md','workshops/github-trending-radar/docs/lumenact-nocodehack-roblox-pixelart-gaussiansplat-118key-facial-mcp-blender-shorts-spark-3dgs-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r28-lumenact-robloxshorts-pixelsplat.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r385File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,900.00')&&txt.includes('5,740.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,350.00')&&txt.includes('93.21%')&&txt.includes('not_measured'),r385File+': contains exact 11-16 R28 lumenact+roblox+pixelsplat closed-form parameters');
    }
    // 2026-11-16 Night Round 29 (R386: leostera/git-twig + sinhong2011/mypack) verification
    const r386PathA=1760.00+37.5*100.00;
    assert.equal(r386PathA.toFixed(2),'5510.00','11-16 R29 Path A total');
    const r386PathC=70.00+3.0*100.00;
    assert.equal(r386PathC.toFixed(2),'370.00','11-16 R29 Path C total');
    assert.equal((r386PathA-r386PathC).toFixed(2),'5140.00','11-16 R29 savings vs Path A');
    assert.equal(((r386PathA-r386PathC)/r386PathA*100).toFixed(2),'93.28','11-16 R29 pct savings vs Path A');
    for(const r386File of ['workshops/github-trending-radar/docs/git-twig-mypack-34x-smaller-cow-git-worktrees-zero-toolchain-webview-desktop-builder-mcp-selection-faq.md','workshops/github-trending-radar/docs/git-twig-mypack-34x-smaller-cow-git-worktrees-zero-toolchain-webview-desktop-builder-mcp-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r29-gittwig-mypack.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r386File),'utf8');
      assert.ok(txt.includes('1,760.00')&&txt.includes('3,750.00')&&txt.includes('5,510.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,140.00')&&txt.includes('93.28%')&&txt.includes('not_measured'),r386File+': contains exact 11-16 R29 git-twig+mypack closed-form parameters');
    }
    // 2026-11-16 Night Round 30 (R387: STARKTANG108/ai-cinema-studio-kit + AnniCodex/ComfyUI-H3-FaceRefine-Plus + nomadoor/ComfyUI-Smart-Guides) verification
    const r387PathA=1950.00+39.5*100.00;
    assert.equal(r387PathA.toFixed(2),'5900.00','11-16 R30 Path A total');
    const r387PathC=85.00+3.1*100.00;
    assert.equal(r387PathC.toFixed(2),'395.00','11-16 R30 Path C total');
    assert.equal((r387PathA-r387PathC).toFixed(2),'5505.00','11-16 R30 savings vs Path A');
    assert.equal(((r387PathA-r387PathC)/r387PathA*100).toFixed(2),'93.31','11-16 R30 pct savings vs Path A');
    for(const r387File of ['workshops/github-trending-radar/docs/ai-cinema-studio-kit-h3-facerefine-plus-smart-guides-dual-g4-1x-avlock-optical-flow-face-stitch-selection-faq.md','workshops/github-trending-radar/docs/ai-cinema-studio-kit-h3-facerefine-plus-smart-guides-dual-g4-1x-avlock-optical-flow-face-stitch-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r30-cinemakit-facerefine-smartguides.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r387File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('3,950.00')&&txt.includes('5,900.00')&&txt.includes('85.00')&&txt.includes('310.00')&&txt.includes('395.00')&&txt.includes('5,505.00')&&txt.includes('93.31%')&&txt.includes('not_measured'),r387File+': contains exact 11-16 R30 ai-cinema-studio-kit+h3-facerefine+smart-guides closed-form parameters');
    }
    // 2026-11-16 Night Round 31 (R388: Hitheshkaranth/Skanda-0 + zenteiq-research/scirex + abrantess/vps-cybersec-orchestrator + VisionXLab/RSLiveBench-UAV) verification
    const r388PathA=1980.00+40.0*100.00;
    assert.equal(r388PathA.toFixed(2),'5980.00','11-16 R31 Path A total');
    const r388PathC=85.00+3.2*100.00;
    assert.equal(r388PathC.toFixed(2),'405.00','11-16 R31 Path C total');
    assert.equal((r388PathA-r388PathC).toFixed(2),'5575.00','11-16 R31 savings vs Path A');
    assert.equal(((r388PathA-r388PathC)/r388PathA*100).toFixed(2),'93.23','11-16 R31 pct savings vs Path A');
    for(const r388File of ['workshops/github-trending-radar/docs/skanda-0-scirex-vps-cybersec-orchestrator-rslivebench-qwen3vl-sam2-radiology-jax-neural-operators-anti-lockout-cis-selection-faq.md','workshops/github-trending-radar/docs/skanda-0-scirex-vps-cybersec-orchestrator-rslivebench-qwen3vl-sam2-radiology-jax-neural-operators-anti-lockout-cis-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r31-skanda0-scirex-vpsorchestrator.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r388File),'utf8');
      assert.ok(txt.includes('1,980.00')&&txt.includes('4,000.00')&&txt.includes('5,980.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,575.00')&&txt.includes('93.23%')&&txt.includes('not_measured'),r388File+': contains exact 11-16 R31 skanda-0+scirex+vps-orchestrator closed-form parameters');
    }
    // 2026-11-16 Night Round 32 (R389: QwenLM/Qwen-Live-Delivery-Plugin + nanocodexyz/harnesslang) verification
    const r389PathA=2020.00+40.0*100.00;
    assert.equal(r389PathA.toFixed(2),'6020.00','11-16 R32 Path A total');
    const r389PathC=85.00+3.2*100.00;
    assert.equal(r389PathC.toFixed(2),'405.00','11-16 R32 Path C total');
    assert.equal((r389PathA-r389PathC).toFixed(2),'5615.00','11-16 R32 savings vs Path A');
    assert.equal(((r389PathA-r389PathC)/r389PathA*100).toFixed(2),'93.27','11-16 R32 pct savings vs Path A');
    for(const r389File of ['workshops/github-trending-radar/docs/qwen-live-delivery-plugin-harnesslang-iterative-codex-version-snapshots-provably-durable-agent-compiler-selection-faq.md','workshops/github-trending-radar/docs/qwen-live-delivery-plugin-harnesslang-iterative-codex-version-snapshots-provably-durable-agent-compiler-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r32-qwenlivedelivery-harnesslang.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r389File),'utf8');
      assert.ok(txt.includes('2,020.00')&&txt.includes('4,000.00')&&txt.includes('6,020.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,615.00')&&txt.includes('93.27%')&&txt.includes('not_measured'),r389File+': contains exact 11-16 R32 qwen-live-delivery+harnesslang closed-form parameters');
    }
    // 2026-11-16 Night Round 33 (R390 Milestone: punit2911/meridian-multimodal-rag + Vecshield/VecShield + Domush/antigravity-plugin-context-mode + STARKTANG108/antigravity-token-monitor) verification
    const r390PathA=2060.00+40.5*100.00;
    assert.equal(r390PathA.toFixed(2),'6110.00','11-16 R33 Path A total');
    const r390PathC=85.00+3.2*100.00;
    assert.equal(r390PathC.toFixed(2),'405.00','11-16 R33 Path C total');
    assert.equal((r390PathA-r390PathC).toFixed(2),'5705.00','11-16 R33 savings vs Path A');
    assert.equal(((r390PathA-r390PathC)/r390PathA*100).toFixed(2),'93.37','11-16 R33 pct savings vs Path A');
    for(const r390File of ['workshops/github-trending-radar/docs/meridian-multimodal-rag-vecshield-antigravity-context-mode-8channel-chart-rag-5engine-vector-audit-90pct-context-trim-selection-faq.md','workshops/github-trending-radar/docs/meridian-multimodal-rag-vecshield-antigravity-context-mode-8channel-chart-rag-5engine-vector-audit-90pct-context-trim-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r33-meridianrag-vecshield-contextmode.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r390File),'utf8');
      assert.ok(txt.includes('2,060.00')&&txt.includes('4,050.00')&&txt.includes('6,110.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,705.00')&&txt.includes('93.37%')&&txt.includes('not_measured'),r390File+': contains exact 11-16 R33 meridian+vecshield+context-mode closed-form parameters');
    }
    // 2026-11-16 Night Round 34 (R391: Picom-code/pico-dgx-qwen38 + jayleaton/qwen4-tensorfold-spark + VittorioPastore/m1mic-mlx + ivanfioravanti/mlx-d1-gestures) verification
    const r391PathA=1940.00+39.0*100.00;
    assert.equal(r391PathA.toFixed(2),'5840.00','11-16 R34 Path A total');
    const r391PathC=80.00+3.1*100.00;
    assert.equal(r391PathC.toFixed(2),'390.00','11-16 R34 Path C total');
    assert.equal((r391PathA-r391PathC).toFixed(2),'5450.00','11-16 R34 savings vs Path A');
    assert.equal(((r391PathA-r391PathC)/r391PathA*100).toFixed(2),'93.32','11-16 R34 pct savings vs Path A');
    for(const r391File of ['workshops/github-trending-radar/docs/pico-dgx-qwen38-tensorfold-m1mic-mlx-d1-gestures-dgx-spark-296toks-79min-macbook-g1-tracker-zero-token-vlm-selection-faq.md','workshops/github-trending-radar/docs/pico-dgx-qwen38-tensorfold-m1mic-mlx-d1-gestures-dgx-spark-296toks-79min-macbook-g1-tracker-zero-token-vlm-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r34-picodgx-m1micmlx-d1gestures.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r391File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('3,900.00')&&txt.includes('5,840.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,450.00')&&txt.includes('93.32%')&&txt.includes('not_measured'),r391File+': contains exact 11-16 R34 pico-dgx-qwen38+m1mic-mlx+d1-gestures closed-form parameters');
    }
    // 2026-11-16 Night Round 35 (R392: owlinthebarnai/video-studio-kit + DuongVuIT/video-short-animation) verification
    const r392PathA=1920.00+39.0*100.00;
    assert.equal(r392PathA.toFixed(2),'5820.00','11-16 R35 Path A total');
    const r392PathC=80.00+3.1*100.00;
    assert.equal(r392PathC.toFixed(2),'390.00','11-16 R35 Path C total');
    assert.equal((r392PathA-r392PathC).toFixed(2),'5430.00','11-16 R35 savings vs Path A');
    assert.equal(((r392PathA-r392PathC)/r392PathA*100).toFixed(2),'93.30','11-16 R35 pct savings vs Path A');
    for(const r392File of ['workshops/github-trending-radar/docs/video-studio-kit-video-short-animation-109style-claude-video-skills-remotion-threejs-2d3d-modal-qa-selection-faq.md','workshops/github-trending-radar/docs/video-studio-kit-video-short-animation-109style-claude-video-skills-remotion-threejs-2d3d-modal-qa-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r35-videostudiokit-videoshortanim.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r392File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,900.00')&&txt.includes('5,820.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,430.00')&&txt.includes('93.30%')&&txt.includes('not_measured'),r392File+': contains exact 11-16 R35 video-studio-kit+video-short-animation closed-form parameters');
    }
    // 2026-11-16 Night Round 36 (R393: toyxyz/toyxyz-blender-retargeter + toyxyz/toyxyz-motion-ai-tool + KoshiroRobot/KRC-Actuator) verification
    const r393PathA=1860.00+38.5*100.00;
    assert.equal(r393PathA.toFixed(2),'5710.00','11-16 R36 Path A total');
    const r393PathC=75.00+3.0*100.00;
    assert.equal(r393PathC.toFixed(2),'375.00','11-16 R36 Path C total');
    assert.equal((r393PathA-r393PathC).toFixed(2),'5335.00','11-16 R36 savings vs Path A');
    assert.equal(((r393PathA-r393PathC)/r393PathA*100).toFixed(2),'93.43','11-16 R36 pct savings vs Path A');
    for(const r393File of ['workshops/github-trending-radar/docs/toyxyz-blender-retargeter-motion-ai-tool-krc-actuator-proportion-aware-ik-soma-motion-foc-cycloidal-actuator-selection-faq.md','workshops/github-trending-radar/docs/toyxyz-blender-retargeter-motion-ai-tool-krc-actuator-proportion-aware-ik-soma-motion-foc-cycloidal-actuator-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r36-toyxyzretarget-motionai-krcactuator.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r393File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,850.00')&&txt.includes('5,710.00')&&txt.includes('75.00')&&txt.includes('300.00')&&txt.includes('375.00')&&txt.includes('5,335.00')&&txt.includes('93.43%')&&txt.includes('not_measured'),r393File+': contains exact 11-16 R36 toyxyz+krc-actuator closed-form parameters');
    }
    // 2026-11-16 Night Round 37 (R394: ShutongLiang/Neural-State-OS + LNYmachines/pictochat-host + joshpuckett/allo + cnrad/interspace) verification
    const r394PathA=1750.00+37.0*100.00;
    assert.equal(r394PathA.toFixed(2),'5450.00','11-16 R37 Path A total');
    const r394PathC=70.00+3.0*100.00;
    assert.equal(r394PathC.toFixed(2),'370.00','11-16 R37 Path C total');
    assert.equal((r394PathA-r394PathC).toFixed(2),'5080.00','11-16 R37 savings vs Path A');
    assert.equal(((r394PathA-r394PathC)/r394PathA*100).toFixed(2),'93.21','11-16 R37 pct savings vs Path A');
    for(const r394File of ['workshops/github-trending-radar/docs/neural-state-os-pictochat-host-allo-interspace-residual-stream-steering-esp32c3-80211b-variable-ui-font-selection-faq.md','workshops/github-trending-radar/docs/neural-state-os-pictochat-host-allo-interspace-residual-stream-steering-esp32c3-80211b-variable-ui-font-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r37-neuralstateos-pictochat-allo-interspace.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r394File),'utf8');
      assert.ok(txt.includes('1,750.00')&&txt.includes('3,700.00')&&txt.includes('5,450.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,080.00')&&txt.includes('93.21%')&&txt.includes('not_measured'),r394File+': contains exact 11-16 R37 neural-state-os+pictochat+allo closed-form parameters');
    }
    // 2026-11-16 Night Round 38 (R395: c410979729-bit/scope-recall-hermes + d6u/story-timeline + Timaga/noda-local-ai-notes) verification
    const r395PathA=1840.00+38.5*100.00;
    assert.equal(r395PathA.toFixed(2),'5690.00','11-16 R38 Path A total');
    const r395PathC=75.00+3.1*100.00;
    assert.equal(r395PathC.toFixed(2),'385.00','11-16 R38 Path C total');
    assert.equal((r395PathA-r395PathC).toFixed(2),'5305.00','11-16 R38 savings vs Path A');
    assert.equal(((r395PathA-r395PathC)/r395PathA*100).toFixed(2),'93.23','11-16 R38 pct savings vs Path A');
    for(const r395File of ['workshops/github-trending-radar/docs/scope-recall-hermes-story-timeline-noda-cross-harness-sqlite-memory-epistemic-graphql-timeline-local-notes-selection-faq.md','workshops/github-trending-radar/docs/scope-recall-hermes-story-timeline-noda-cross-harness-sqlite-memory-epistemic-graphql-timeline-local-notes-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r38-scoperecall-storytimeline-noda.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r395File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,850.00')&&txt.includes('5,690.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,305.00')&&txt.includes('93.23%')&&txt.includes('not_measured'),r395File+': contains exact 11-16 R38 scope-recall+story-timeline+noda closed-form parameters');
    }
    // 2026-11-16 Night Round 39 (R396: bherbruck/solidcraft-gears + bloomway-ai/bloomway-world-director + willeastcott/splat-fashion + sparklecatta-lang/XSXB-Slash) verification
    const r396PathA=1890.00+39.0*100.00;
    assert.equal(r396PathA.toFixed(2),'5790.00','11-16 R39 Path A total');
    const r396PathC=80.00+3.1*100.00;
    assert.equal(r396PathC.toFixed(2),'390.00','11-16 R39 Path C total');
    assert.equal((r396PathA-r396PathC).toFixed(2),'5400.00','11-16 R39 savings vs Path A');
    assert.equal(((r396PathA-r396PathC)/r396PathA*100).toFixed(2),'93.26','11-16 R39 pct savings vs Path A');
    for(const r396File of ['workshops/github-trending-radar/docs/solidcraft-gears-bloomway-world-director-splat-fashion-xsxb-slash-wasm-cad-features-3d-previs-rigged-3dgs-vfx-selection-faq.md','workshops/github-trending-radar/docs/solidcraft-gears-bloomway-world-director-splat-fashion-xsxb-slash-wasm-cad-features-3d-previs-rigged-3dgs-vfx-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r39-solidcraftgears-bloomway-splatfashion-slash.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r396File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,900.00')&&txt.includes('5,790.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,400.00')&&txt.includes('93.26%')&&txt.includes('not_measured'),r396File+': contains exact 11-16 R39 solidcraft-gears+bloomway+splat-fashion closed-form parameters');
    }
    // 2026-11-16 Night Round 40 (R397: AIwithhassan/likhari-ai + Prahaladha-Reddy/hima-finetune + RealAdii/clipper-skill + sinhs0301-prog/kimbiseo) verification
    const r397PathA=1820.00+38.0*100.00;
    assert.equal(r397PathA.toFixed(2),'5620.00','11-16 R40 Path A total');
    const r397PathC=70.00+3.0*100.00;
    assert.equal(r397PathC.toFixed(2),'370.00','11-16 R40 Path C total');
    assert.equal((r397PathA-r397PathC).toFixed(2),'5250.00','11-16 R40 savings vs Path A');
    assert.equal(((r397PathA-r397PathC)/r397PathA*100).toFixed(2),'93.42','11-16 R40 pct savings vs Path A');
    for(const r397File of ['workshops/github-trending-radar/docs/likhari-ai-hima-finetune-clipper-skill-kimbiseo-nonactivating-ptt-whisper-62m-cpu-tts-word-boundary-clipper-selection-faq.md','workshops/github-trending-radar/docs/likhari-ai-hima-finetune-clipper-skill-kimbiseo-nonactivating-ptt-whisper-62m-cpu-tts-word-boundary-clipper-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r40-likhari-himafinetune-clipperskill-kimbiseo.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r397File),'utf8');
      assert.ok(txt.includes('1,820.00')&&txt.includes('3,800.00')&&txt.includes('5,620.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,250.00')&&txt.includes('93.42%')&&txt.includes('not_measured'),r397File+': contains exact 11-16 R40 likhari+hima-finetune+clipper-skill closed-form parameters');
    }
    // 2026-11-16 Night Round 41 (R398: acking-you/liftgate + MolMind/SteerTrace + makors/agency + wycocoyu/agy-context-dashboard) verification
    const r398PathA=1880.00+39.0*100.00;
    assert.equal(r398PathA.toFixed(2),'5780.00','11-16 R41 Path A total');
    const r398PathC=75.00+3.1*100.00;
    assert.equal(r398PathC.toFixed(2),'385.00','11-16 R41 Path C total');
    assert.equal((r398PathA-r398PathC).toFixed(2),'5395.00','11-16 R41 savings vs Path A');
    assert.equal(((r398PathA-r398PathC)/r398PathA*100).toFixed(2),'93.34','11-16 R41 pct savings vs Path A');
    for(const r398File of ['workshops/github-trending-radar/docs/liftgate-steertrace-agency-agy-context-dashboard-official-acp-gateway-judgment-audit-nixos-agent-appliance-selection-faq.md','workshops/github-trending-radar/docs/liftgate-steertrace-agency-agy-context-dashboard-official-acp-gateway-judgment-audit-nixos-agent-appliance-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r41-liftgate-steertrace-agency-agydashboard.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r398File),'utf8');
      assert.ok(txt.includes('1,880.00')&&txt.includes('3,900.00')&&txt.includes('5,780.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,395.00')&&txt.includes('93.34%')&&txt.includes('not_measured'),r398File+': contains exact 11-16 R41 liftgate+steertrace+agency closed-form parameters');
    }
    // 2026-11-16 Night Round 42 (R399: DasCondor/kubefactory + influxnetwork/meshwork + lij768423-svg/meshatlas + Ctuna89/ha-connection-map-card) verification
    const r399PathA=1810.00+38.0*100.00;
    assert.equal(r399PathA.toFixed(2),'5610.00','11-16 R42 Path A total');
    const r399PathC=65.00+3.0*100.00;
    assert.equal(r399PathC.toFixed(2),'365.00','11-16 R42 Path C total');
    assert.equal((r399PathA-r399PathC).toFixed(2),'5245.00','11-16 R42 savings vs Path A');
    assert.equal(((r399PathA-r399PathC)/r399PathA*100).toFixed(2),'93.49','11-16 R42 pct savings vs Path A');
    for(const r399File of ['workshops/github-trending-radar/docs/kubefactory-meshwork-meshatlas-ha-connection-map-3d-k8s-factory-onsite-network-audit-tailscale-derp-map-selection-faq.md','workshops/github-trending-radar/docs/kubefactory-meshwork-meshatlas-ha-connection-map-3d-k8s-factory-onsite-network-audit-tailscale-derp-map-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r42-kubefactory-meshwork-meshatlas-hamap.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r399File),'utf8');
      assert.ok(txt.includes('1,810.00')&&txt.includes('3,800.00')&&txt.includes('5,610.00')&&txt.includes('65.00')&&txt.includes('300.00')&&txt.includes('365.00')&&txt.includes('5,245.00')&&txt.includes('93.49%')&&txt.includes('not_measured'),r399File+': contains exact 11-16 R42 kubefactory+meshwork+meshatlas closed-form parameters');
    }
    // 2026-11-16 Night Round 43 (R400 Milestone: hajimehoshi/ekuma + mireklzicar/synfactor + vishalbg02/global-fire-harmonization + vi-is-ramen/genum) verification
    const r400PathA=2150.00+41.0*100.00;
    assert.equal(r400PathA.toFixed(2),'6250.00','11-16 R43 Path A total');
    const r400PathC=85.00+3.2*100.00;
    assert.equal(r400PathC.toFixed(2),'405.00','11-16 R43 Path C total');
    assert.equal((r400PathA-r400PathC).toFixed(2),'5845.00','11-16 R43 savings vs Path A');
    assert.equal(((r400PathA-r400PathC)/r400PathA*100).toFixed(2),'93.52','11-16 R43 pct savings vs Path A');
    for(const r400File of ['workshops/github-trending-radar/docs/ekuma-synfactor-global-fire-harmonization-genum-pure-go-es2026-vm-296b-synthon-cp16-nasa-modis-viirs-selection-faq.md','workshops/github-trending-radar/docs/ekuma-synfactor-global-fire-harmonization-genum-pure-go-es2026-vm-296b-synthon-cp16-nasa-modis-viirs-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r43-ekuma-synfactor-fireharmonization-genum.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r400File),'utf8');
      assert.ok(txt.includes('2,150.00')&&txt.includes('4,100.00')&&txt.includes('6,250.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,845.00')&&txt.includes('93.52%')&&txt.includes('not_measured'),r400File+': contains exact 11-16 R43 ekuma+synfactor+fireharmonization closed-form parameters');
    }
    // 2026-11-16 Night Round 44 (R401: PineComputer/pine-drama-studio + hajdu-patrik/clippy + 10291124jcjc-dotcom/guiji-cutting-video + asimawdah/material-expressive-skill) verification
    const r401PathA=1940.00+39.5*100.00;
    assert.equal(r401PathA.toFixed(2),'5890.00','11-16 R44 Path A total');
    const r401PathC=80.00+3.1*100.00;
    assert.equal(r401PathC.toFixed(2),'390.00','11-16 R44 Path C total');
    assert.equal((r401PathA-r401PathC).toFixed(2),'5500.00','11-16 R44 savings vs Path A');
    assert.equal(((r401PathA-r401PathC)/r401PathA*100).toFixed(2),'93.38','11-16 R44 pct savings vs Path A');
    for(const r401File of ['workshops/github-trending-radar/docs/pine-drama-studio-clippy-guiji-cutting-material-expressive-git-drama-ide-local-qwen-clipper-m3-skill-selection-faq.md','workshops/github-trending-radar/docs/pine-drama-studio-clippy-guiji-cutting-material-expressive-git-drama-ide-local-qwen-clipper-m3-skill-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r44-pinedrama-clippy-guijicutting-materialexpressive.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r401File),'utf8');
      assert.ok(txt.includes('1,940.00')&&txt.includes('3,950.00')&&txt.includes('5,890.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,500.00')&&txt.includes('93.38%')&&txt.includes('not_measured'),r401File+': contains exact 11-16 R44 pine-drama+clippy+m3-expressive closed-form parameters');
    }
    // 2026-11-16 Night Round 45 (R402: Timon2306/oxigram + lxyeternal/Trace + AdminZachary/WatchBridge + ursishant/airbridge) verification
    const r402PathA=1790.00+37.5*100.00;
    assert.equal(r402PathA.toFixed(2),'5540.00','11-16 R45 Path A total');
    const r402PathC=65.00+3.0*100.00;
    assert.equal(r402PathC.toFixed(2),'365.00','11-16 R45 Path C total');
    assert.equal((r402PathA-r402PathC).toFixed(2),'5175.00','11-16 R45 savings vs Path A');
    assert.equal(((r402PathA-r402PathC)/r402PathA*100).toFixed(2),'93.41','11-16 R45 pct savings vs Path A');
    for(const r402File of ['workshops/github-trending-radar/docs/oxigram-trace-watchbridge-airbridge-5mb-tray-rust-telegram-macos-time-tracker-xcode-free-watch-sideloader-selection-faq.md','workshops/github-trending-radar/docs/oxigram-trace-watchbridge-airbridge-5mb-tray-rust-telegram-macos-time-tracker-xcode-free-watch-sideloader-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r45-oxigram-trace-watchbridge-airbridge.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r402File),'utf8');
      assert.ok(txt.includes('1,790.00')&&txt.includes('3,750.00')&&txt.includes('5,540.00')&&txt.includes('65.00')&&txt.includes('300.00')&&txt.includes('365.00')&&txt.includes('5,175.00')&&txt.includes('93.41%')&&txt.includes('not_measured'),r402File+': contains exact 11-16 R45 oxigram+trace+watchbridge closed-form parameters');
    }
    // 2026-11-16 Night Round 46 (R403: joeseesun/qiaomu-deepseek-api + BlackBuddle/hwpx-docs + S12cybersecurity/HeapExplorer + krishkhinchi/leaked-key-playbooks) verification
    const r403PathA=1850.00+38.5*100.00;
    assert.equal(r403PathA.toFixed(2),'5700.00','11-16 R46 Path A total');
    const r403PathC=70.00+3.0*100.00;
    assert.equal(r403PathC.toFixed(2),'370.00','11-16 R46 Path C total');
    assert.equal((r403PathA-r403PathC).toFixed(2),'5330.00','11-16 R46 savings vs Path A');
    assert.equal(((r403PathA-r403PathC)/r403PathA*100).toFixed(2),'93.51','11-16 R46 pct savings vs Path A');
    for(const r403File of ['workshops/github-trending-radar/docs/qiaomu-deepseek-api-hwpx-docs-heapexplorer-leaked-key-playbooks-zero-dep-multimodal-skill-ksx6101-hwpx-heap-forensics-selection-faq.md','workshops/github-trending-radar/docs/qiaomu-deepseek-api-hwpx-docs-heapexplorer-leaked-key-playbooks-zero-dep-multimodal-skill-ksx6101-hwpx-heap-forensics-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r46-qiaomudeepseek-hwpxdocs-heapexplorer-leakedkeys.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r403File),'utf8');
      assert.ok(txt.includes('1,850.00')&&txt.includes('3,850.00')&&txt.includes('5,700.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,330.00')&&txt.includes('93.51%')&&txt.includes('not_measured'),r403File+': contains exact 11-16 R46 qiaomu-deepseek+hwpx-docs+heapexplorer closed-form parameters');
    }
    // 2026-11-16 Night Round 47 (R404: zeative/motion-educator + staryone/motlab + CocoSgt/dsh-game-tidemark) verification
    const r404PathA=2020.00+40.0*100.00;
    assert.equal(r404PathA.toFixed(2),'6020.00','11-16 R47 Path A total');
    const r404PathC=80.00+3.1*100.00;
    assert.equal(r404PathC.toFixed(2),'390.00','11-16 R47 Path C total');
    assert.equal((r404PathA-r404PathC).toFixed(2),'5630.00','11-16 R47 savings vs Path A');
    assert.equal(((r404PathA-r404PathC)/r404PathA*100).toFixed(2),'93.52','11-16 R47 pct savings vs Path A');
    for(const r404File of ['workshops/github-trending-radar/docs/motion-educator-motlab-tidemark-storyboard-gated-1080p60-3d-teardown-films-webcodecs-4k-video-engine-selection-faq.md','workshops/github-trending-radar/docs/motion-educator-motlab-tidemark-storyboard-gated-1080p60-3d-teardown-films-webcodecs-4k-video-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r47-motioneducator-motlab-tidemark.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r404File),'utf8');
      assert.ok(txt.includes('2,020.00')&&txt.includes('4,000.00')&&txt.includes('6,020.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,630.00')&&txt.includes('93.52%')&&txt.includes('not_measured'),r404File+': contains exact 11-16 R47 motion-educator+motlab+tidemark closed-form parameters');
    }
    // 2026-11-16 Night Round 48 (R405 Milestone: Lumidarin/agy-capsule + szmichalczyk/focus-app + raminturne/peeky) verification
    const r405PathA=1870.00+38.5*100.00;
    assert.equal(r405PathA.toFixed(2),'5720.00','11-16 R48 Path A total');
    const r405PathC=70.00+3.0*100.00;
    assert.equal(r405PathC.toFixed(2),'370.00','11-16 R48 Path C total');
    assert.equal((r405PathA-r405PathC).toFixed(2),'5350.00','11-16 R48 savings vs Path A');
    assert.equal(((r405PathA-r405PathC)/r405PathA*100).toFixed(2),'93.53','11-16 R48 pct savings vs Path A');
    for(const r405File of ['workshops/github-trending-radar/docs/agy-capsule-focus-app-peeky-3min-cache-expiry-capsule-claude-codex-session-calendar-3mb-windows-island-selection-faq.md','workshops/github-trending-radar/docs/agy-capsule-focus-app-peeky-3min-cache-expiry-capsule-claude-codex-session-calendar-3mb-windows-island-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r48-agycapsule-focusapp-peeky.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r405File),'utf8');
      assert.ok(txt.includes('1,870.00')&&txt.includes('3,850.00')&&txt.includes('5,720.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,350.00')&&txt.includes('93.53%')&&txt.includes('not_measured'),r405File+': contains exact 11-16 R48 agy-capsule+focus-app+peeky closed-form parameters');
    }
    // 2026-11-16 Night Round 49 (R406: lynote-ai/ai-tutor + tipsai/product-seo + omidz4t/sigma) verification
    const r406PathA=1910.00+39.0*100.00;
    assert.equal(r406PathA.toFixed(2),'5810.00','11-16 R49 Path A total');
    const r406PathC=75.00+3.1*100.00;
    assert.equal(r406PathC.toFixed(2),'385.00','11-16 R49 Path C total');
    assert.equal((r406PathA-r406PathC).toFixed(2),'5425.00','11-16 R49 savings vs Path A');
    assert.equal(((r406PathA-r406PathC)/r406PathA*100).toFixed(2),'93.37','11-16 R49 pct savings vs Path A');
    for(const r406File of ['workshops/github-trending-radar/docs/lynote-ai-tutor-product-seo-sigma-quote-gated-jev-verified-courses-30pct-rollback-seo-chatmail-agent-selection-faq.md','workshops/github-trending-radar/docs/lynote-ai-tutor-product-seo-sigma-quote-gated-jev-verified-courses-30pct-rollback-seo-chatmail-agent-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r49-lynote-productseo-sigma.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r406File),'utf8');
      assert.ok(txt.includes('1,910.00')&&txt.includes('3,900.00')&&txt.includes('5,810.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,425.00')&&txt.includes('93.37%')&&txt.includes('not_measured'),r406File+': contains exact 11-16 R49 lynote+product-seo+sigma closed-form parameters');
    }
    // 2026-11-16 Night Round 50 (R407: inclusionAI/Duo + Maverick720/Focus-KV + Roboparty/PartyMimic) verification
    const r407PathA=2240.00+42.0*100.00;
    assert.equal(r407PathA.toFixed(2),'6440.00','11-16 R50 Path A total');
    const r407PathC=90.00+3.2*100.00;
    assert.equal(r407PathC.toFixed(2),'410.00','11-16 R50 Path C total');
    assert.equal((r407PathA-r407PathC).toFixed(2),'6030.00','11-16 R50 savings vs Path A');
    assert.equal(((r407PathA-r407PathC)/r407PathA*100).toFixed(2),'93.63','11-16 R50 pct savings vs Path A');
    for(const r407File of ['workshops/github-trending-radar/docs/duo-focus-kv-partymimic-full-duplex-reciprocal-world-model-reasoning-head-kv-compression-26min-humanoid-tracker-selection-faq.md','workshops/github-trending-radar/docs/duo-focus-kv-partymimic-full-duplex-reciprocal-world-model-reasoning-head-kv-compression-26min-humanoid-tracker-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r50-duo-focuskv-partymimic.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r407File),'utf8');
      assert.ok(txt.includes('2,240.00')&&txt.includes('4,200.00')&&txt.includes('6,440.00')&&txt.includes('90.00')&&txt.includes('320.00')&&txt.includes('410.00')&&txt.includes('6,030.00')&&txt.includes('93.63%')&&txt.includes('not_measured'),r407File+': contains exact 11-16 R50 duo+focus-kv+partymimic closed-form parameters');
    }
    // 2026-11-16 Night Round 51 (R408: chip-ai-agent/PCBRouteAgent + popvax/yash + xia1314tong/quantum-circuit-studio + utai-utai/Qutai) verification
    const r408PathA=2080.00+40.5*100.00;
    assert.equal(r408PathA.toFixed(2),'6130.00','11-16 R51 Path A total');
    const r408PathC=80.00+3.1*100.00;
    assert.equal(r408PathC.toFixed(2),'390.00','11-16 R51 Path C total');
    assert.equal((r408PathA-r408PathC).toFixed(2),'5740.00','11-16 R51 savings vs Path A');
    assert.equal(((r408PathA-r408PathC)/r408PathA*100).toFixed(2),'93.64','11-16 R51 pct savings vs Path A');
    for(const r408File of ['workshops/github-trending-radar/docs/pcbrouteagent-popvax-yash-quantum-circuit-studio-qutai-kicad-pns-routing-agent-open-mrna-vaccine-quantum-sdk-selection-faq.md','workshops/github-trending-radar/docs/pcbrouteagent-popvax-yash-quantum-circuit-studio-qutai-kicad-pns-routing-agent-open-mrna-vaccine-quantum-sdk-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r51-pcbrouteagent-popvaxyash-quantumstudio-qutai.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r408File),'utf8');
      assert.ok(txt.includes('2,080.00')&&txt.includes('4,050.00')&&txt.includes('6,130.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,740.00')&&txt.includes('93.64%')&&txt.includes('not_measured'),r408File+': contains exact 11-16 R51 pcbrouteagent+popvax-yash+qutai closed-form parameters');
    }
    // 2026-11-16 Night Round 52 (R409: wajahatkarim3/play-data-safety-skill + starriv/privacy-probe + ox0pine/mojian + 10k11/flux) verification
    const r409PathA=1830.00+38.0*100.00;
    assert.equal(r409PathA.toFixed(2),'5630.00','11-16 R52 Path A total');
    const r409PathC=65.00+3.0*100.00;
    assert.equal(r409PathC.toFixed(2),'365.00','11-16 R52 Path C total');
    assert.equal((r409PathA-r409PathC).toFixed(2),'5265.00','11-16 R52 savings vs Path A');
    assert.equal(((r409PathA-r409PathC)/r409PathA*100).toFixed(2),'93.52','11-16 R52 pct savings vs Path A');
    for(const r409File of ['workshops/github-trending-radar/docs/play-data-safety-skill-privacy-probe-mojian-flux-780row-play-csv-kernel-privacy-audit-mygo-editor-selection-faq.md','workshops/github-trending-radar/docs/play-data-safety-skill-privacy-probe-mojian-flux-780row-play-csv-kernel-privacy-audit-mygo-editor-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r52-playdatasafety-privacyprobe-mojian-flux.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r409File),'utf8');
      assert.ok(txt.includes('1,830.00')&&txt.includes('3,800.00')&&txt.includes('5,630.00')&&txt.includes('65.00')&&txt.includes('300.00')&&txt.includes('365.00')&&txt.includes('5,265.00')&&txt.includes('93.52%')&&txt.includes('not_measured'),r409File+': contains exact 11-16 R52 play-data-safety+privacy-probe+mojian closed-form parameters');
    }
    // 2026-11-16 Night Round 53 (R410 Milestone: standardnormal-ai/nudi + GAIR-NLP/Benchleaking + jackulau/coding.sh) verification
    const r410PathA=2180.00+41.5*100.00;
    assert.equal(r410PathA.toFixed(2),'6330.00','11-16 R53 Path A total');
    const r410PathC=85.00+3.2*100.00;
    assert.equal(r410PathC.toFixed(2),'405.00','11-16 R53 Path C total');
    assert.equal((r410PathA-r410PathC).toFixed(2),'5925.00','11-16 R53 savings vs Path A');
    assert.equal(((r410PathA-r410PathC)/r410PathA*100).toFixed(2),'93.60','11-16 R53 pct savings vs Path A');
    for(const r410File of ['workshops/github-trending-radar/docs/nudi-benchleaking-coding-sh-rl-reward-hack-swarms-20benchmark-antihack-audit-local-agent-evals-selection-faq.md','workshops/github-trending-radar/docs/nudi-benchleaking-coding-sh-rl-reward-hack-swarms-20benchmark-antihack-audit-local-agent-evals-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r53-nudi-benchleaking-codingsh.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r410File),'utf8');
      assert.ok(txt.includes('2,180.00')&&txt.includes('4,150.00')&&txt.includes('6,330.00')&&txt.includes('85.00')&&txt.includes('320.00')&&txt.includes('405.00')&&txt.includes('5,925.00')&&txt.includes('93.60%')&&txt.includes('not_measured'),r410File+': contains exact 11-16 R53 nudi+benchleaking+coding-sh closed-form parameters');
    }
    // 2026-11-16 Night Round 54 (R411: joaquimmj/deskstack + plannotator/sem-jiff + amalucelli/dffy + vellwarren/the-conversation-is-yours + samo33ddd/winmux) verification
    const r411PathA=1960.00+39.5*100.00;
    assert.equal(r411PathA.toFixed(2),'5910.00','11-16 R54 Path A total');
    const r411PathC=75.00+3.1*100.00;
    assert.equal(r411PathC.toFixed(2),'385.00','11-16 R54 Path C total');
    assert.equal((r411PathA-r411PathC).toFixed(2),'5525.00','11-16 R54 savings vs Path A');
    assert.equal(((r411PathA-r411PathC)/r411PathA*100).toFixed(2),'93.49','11-16 R54 pct savings vs Path A');
    for(const r411File of ['workshops/github-trending-radar/docs/deskstack-sem-jiff-dffy-conversation-is-yours-winmux-zero-error-xbrl-dcf-treesitter-semantic-diff-dual-runtime-selection-faq.md','workshops/github-trending-radar/docs/deskstack-sem-jiff-dffy-conversation-is-yours-winmux-zero-error-xbrl-dcf-treesitter-semantic-diff-dual-runtime-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r54-deskstack-semjiff-dffy-dualruntime-winmux.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r411File),'utf8');
      assert.ok(txt.includes('1,960.00')&&txt.includes('3,950.00')&&txt.includes('5,910.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,525.00')&&txt.includes('93.49%')&&txt.includes('not_measured'),r411File+': contains exact 11-16 R54 deskstack+sem-jiff+dffy closed-form parameters');
    }
    // 2026-11-16 Night Round 55 (R412: GGZ14/saber-engine + KhushiJ2911/microVLA + blixvip/BlendClone + kimikr/peek + react-native-feel/react-native-deploy) verification
    const r412PathA=2120.00+40.5*100.00;
    assert.equal(r412PathA.toFixed(2),'6170.00','11-16 R55 Path A total');
    const r412PathC=80.00+3.1*100.00;
    assert.equal(r412PathC.toFixed(2),'390.00','11-16 R55 Path C total');
    assert.equal((r412PathA-r412PathC).toFixed(2),'5780.00','11-16 R55 savings vs Path A');
    assert.equal(((r412PathA-r412PathC)/r412PathA*100).toFixed(2),'93.68','11-16 R55 pct savings vs Path A');
    for(const r412File of ['workshops/github-trending-radar/docs/saber-engine-microvla-blendclone-peek-react-native-deploy-rdna4-618toks-4gb-pi05-vla-video-to-blend-macfree-ios-selection-faq.md','workshops/github-trending-radar/docs/saber-engine-microvla-blendclone-peek-react-native-deploy-rdna4-618toks-4gb-pi05-vla-video-to-blend-macfree-ios-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r55-saberengine-microvla-blendclone-peek-rndeploy.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r412File),'utf8');
      assert.ok(txt.includes('2,120.00')&&txt.includes('4,050.00')&&txt.includes('6,170.00')&&txt.includes('80.00')&&txt.includes('310.00')&&txt.includes('390.00')&&txt.includes('5,780.00')&&txt.includes('93.68%')&&txt.includes('not_measured'),r412File+': contains exact 11-16 R55 saber-engine+microvla+blendclone closed-form parameters');
    }
    // 2026-11-16 Night Round 56 (R413: Lentlily22/rolling-summary-tutorial + Fedeparg/talk-like-me + zhukunpenglinyutong/dsh-ccgui + liujiangnanchenjbguo/dsh-gufa-code) verification
    const r413PathA=1930.00+39.0*100.00;
    assert.equal(r413PathA.toFixed(2),'5830.00','11-16 R56 Path A total');
    const r413PathC=75.00+3.1*100.00;
    assert.equal(r413PathC.toFixed(2),'385.00','11-16 R56 Path C total');
    assert.equal((r413PathA-r413PathC).toFixed(2),'5445.00','11-16 R56 savings vs Path A');
    assert.equal(((r413PathA-r413PathC)/r413PathA*100).toFixed(2),'93.40','11-16 R56 pct savings vs Path A');
    for(const r413File of ['workshops/github-trending-radar/docs/rolling-summary-tutorial-talk-like-me-dsh-ccgui-gufa-code-hysteresis-cache-alignment-05b-lora-dsh-monaco-ide-selection-faq.md','workshops/github-trending-radar/docs/rolling-summary-tutorial-talk-like-me-dsh-ccgui-gufa-code-hysteresis-cache-alignment-05b-lora-dsh-monaco-ide-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r56-rollingsummary-talklikeme-dshccgui-gufacode.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r413File),'utf8');
      assert.ok(txt.includes('1,930.00')&&txt.includes('3,900.00')&&txt.includes('5,830.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,445.00')&&txt.includes('93.40%')&&txt.includes('not_measured'),r413File+': contains exact 11-16 R56 rolling-summary+talk-like-me+dsh-ccgui closed-form parameters');
    }
    // 2026-11-16 Night Round 57 (R414: useFluid/fluidui + gustavo-henriq/antislop-ui-ux-skill + kasperzackgames/chatgpt-pixel-effects + winchxyz/afterglyph) verification
    const r414PathA=1860.00+38.5*100.00;
    assert.equal(r414PathA.toFixed(2),'5710.00','11-16 R57 Path A total');
    const r414PathC=70.00+3.0*100.00;
    assert.equal(r414PathC.toFixed(2),'370.00','11-16 R57 Path C total');
    assert.equal((r414PathA-r414PathC).toFixed(2),'5340.00','11-16 R57 savings vs Path A');
    assert.equal(((r414PathA-r414PathC)/r414PathA*100).toFixed(2),'93.52','11-16 R57 pct savings vs Path A');
    for(const r414File of ['workshops/github-trending-radar/docs/fluidui-antislop-ui-ux-chatgpt-pixel-effects-afterglyph-spring-contour-morph-gray-wireframe-godot-vfx-selection-faq.md','workshops/github-trending-radar/docs/fluidui-antislop-ui-ux-chatgpt-pixel-effects-afterglyph-spring-contour-morph-gray-wireframe-godot-vfx-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r57-fluidui-antislop-pixeleffects-afterglyph.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r414File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,850.00')&&txt.includes('5,710.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,340.00')&&txt.includes('93.52%')&&txt.includes('not_measured'),r414File+': contains exact 11-16 R57 fluidui+antislop+afterglyph closed-form parameters');
    }
    // 2026-11-16 Night Round 58 (R415 Milestone: avivgerz-hue/vibe-shield + highants/PLaMo_Translate_EX + sp-yduck/overlaysubs + withcoresystem/v-EMU) verification
    const r415PathA=1980.00+40.0*100.00;
    assert.equal(r415PathA.toFixed(2),'5980.00','11-16 R58 Path A total');
    const r415PathC=75.00+3.1*100.00;
    assert.equal(r415PathC.toFixed(2),'385.00','11-16 R58 Path C total');
    assert.equal((r415PathA-r415PathC).toFixed(2),'5595.00','11-16 R58 savings vs Path A');
    assert.equal(((r415PathA-r415PathC)/r415PathA*100).toFixed(2),'93.56','11-16 R58 pct savings vs Path A');
    for(const r415File of ['workshops/github-trending-radar/docs/vibe-shield-plamo-translate-ex-overlaysubs-v-emu-92rule-ai-security-gate-local-plamo3-ocr-subtitles-kvm-lab-selection-faq.md','workshops/github-trending-radar/docs/vibe-shield-plamo-translate-ex-overlaysubs-v-emu-92rule-ai-security-gate-local-plamo3-ocr-subtitles-kvm-lab-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r58-vibeshield-plamotranslate-overlaysubs-vemu.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r415File),'utf8');
      assert.ok(txt.includes('1,980.00')&&txt.includes('4,000.00')&&txt.includes('5,980.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,595.00')&&txt.includes('93.56%')&&txt.includes('not_measured'),r415File+': contains exact 11-16 R58 vibe-shield+plamo-translate+v-emu closed-form parameters');
    }
    // 2026-11-16 Night Round 59 (R416: physical-superintelligence/aaronson-ambainis + hevangel/computer_architecture_a_quantitative_approach + bgbg108555/NeuralSpecOcean) verification
    const r416PathA=2040.00+40.0*100.00;
    assert.equal(r416PathA.toFixed(2),'6040.00','11-16 R59 Path A total');
    const r416PathC=75.00+3.1*100.00;
    assert.equal(r416PathC.toFixed(2),'385.00','11-16 R59 Path C total');
    assert.equal((r416PathA-r416PathC).toFixed(2),'5655.00','11-16 R59 savings vs Path A');
    assert.equal(((r416PathA-r416PathC)/r416PathA*100).toFixed(2),'93.63','11-16 R59 pct savings vs Path A');
    for(const r416File of ['workshops/github-trending-radar/docs/aaronson-ambainis-hennessy-patterson-hdl-neuralspecocean-lean4-proof-dual-sv-vhdl-webgl2-ocean-selection-faq.md','workshops/github-trending-radar/docs/aaronson-ambainis-hennessy-patterson-hdl-neuralspecocean-lean4-proof-dual-sv-vhdl-webgl2-ocean-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r59-aaronsonambainis-comparch-neuralspecocean.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r416File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,000.00')&&txt.includes('6,040.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,655.00')&&txt.includes('93.63%')&&txt.includes('not_measured'),r416File+': contains exact 11-16 R59 aaronson-ambainis+comparch+neuralspecocean closed-form parameters');
    }
    // 2026-11-16 Night Round 60 (R417: riel-gab/hairmesh + willeastcott/splat-walk + TomasDJo/solidcraft-woodwork + Hairline-UI/inrond) verification
    const r417PathA=1890.00+39.0*100.00;
    assert.equal(r417PathA.toFixed(2),'5790.00','11-16 R60 Path A total');
    const r417PathC=75.00+3.1*100.00;
    assert.equal(r417PathC.toFixed(2),'385.00','11-16 R60 Path C total');
    assert.equal((r417PathA-r417PathC).toFixed(2),'5405.00','11-16 R60 savings vs Path A');
    assert.equal(((r417PathA-r417PathC)/r417PathA*100).toFixed(2),'93.35','11-16 R60 pct savings vs Path A');
    for(const r417File of ['workshops/github-trending-radar/docs/hairmesh-splat-walk-solidcraft-woodwork-inrond-live-baked-quad-hair-webgpu-3dgs-burn-zero-reflow-inter-selection-faq.md','workshops/github-trending-radar/docs/hairmesh-splat-walk-solidcraft-woodwork-inrond-live-baked-quad-hair-webgpu-3dgs-burn-zero-reflow-inter-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r60-hairmesh-splatwalk-woodwork-inrond.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r417File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,900.00')&&txt.includes('5,790.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,405.00')&&txt.includes('93.35%')&&txt.includes('not_measured'),r417File+': contains exact 11-16 R60 hairmesh+splat-walk+woodwork+inrond closed-form parameters');
    }
    // 2026-11-16 Night Round 61 (R418: humanglitch191/ownsync + wm-1688/dsh-workbench + liangdabiao/dsh-amazon-image-studio + onkeloki/point-remote-card + PrivyXe/PocketHost) verification
    const r418PathA=1840.00+38.0*100.00;
    assert.equal(r418PathA.toFixed(2),'5640.00','11-16 R61 Path A total');
    const r418PathC=70.00+3.0*100.00;
    assert.equal(r418PathC.toFixed(2),'370.00','11-16 R61 Path C total');
    assert.equal((r418PathA-r418PathC).toFixed(2),'5270.00','11-16 R61 savings vs Path A');
    assert.equal(((r418PathA-r418PathC)/r418PathA*100).toFixed(2),'93.44','11-16 R61 pct savings vs Path A');
    for(const r418File of ['workshops/github-trending-radar/docs/ownsync-dsh-workbench-amazon-image-studio-point-remote-pockethost-500k-crash-e2ee-sync-sqlite-panels-selection-faq.md','workshops/github-trending-radar/docs/ownsync-dsh-workbench-amazon-image-studio-point-remote-pockethost-500k-crash-e2ee-sync-sqlite-panels-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r61-ownsync-dshworkbench-amazonstudio-pointremote-pockethost.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r418File),'utf8');
      assert.ok(txt.includes('1,840.00')&&txt.includes('3,800.00')&&txt.includes('5,640.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,270.00')&&txt.includes('93.44%')&&txt.includes('not_measured'),r418File+': contains exact 11-16 R61 ownsync+dsh-workbench+pointremote+pockethost closed-form parameters');
    }
    // 2026-11-16 Night Round 62 (R419: amazon-far/Unified-Inertial-Encoder + doubleZ-dev/TASK-TARS-Embodied-Robotics + DAGroup-PKU/PhysLoop) verification
    const r419PathA=2050.00+41.0*100.00;
    assert.equal(r419PathA.toFixed(2),'6150.00','11-16 R62 Path A total');
    const r419PathC=75.00+3.1*100.00;
    assert.equal(r419PathC.toFixed(2),'385.00','11-16 R62 Path C total');
    assert.equal((r419PathA-r419PathC).toFixed(2),'5765.00','11-16 R62 savings vs Path A');
    assert.equal(((r419PathA-r419PathC)/r419PathA*100).toFixed(2),'93.74','11-16 R62 pct savings vs Path A');
    for(const r419File of ['workshops/github-trending-radar/docs/unified-inertial-encoder-task-tars-physloop-0099ms-zeroshot-g1-imu-152rmb-tars-robot-selection-faq.md','workshops/github-trending-radar/docs/unified-inertial-encoder-task-tars-physloop-0099ms-zeroshot-g1-imu-152rmb-tars-robot-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r62-unifiedinertial-tasktars-physloop.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r419File),'utf8');
      assert.ok(txt.includes('2,050.00')&&txt.includes('4,100.00')&&txt.includes('6,150.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,765.00')&&txt.includes('93.74%')&&txt.includes('not_measured'),r419File+': contains exact 11-16 R62 unified-inertial+task-tars+physloop closed-form parameters');
    }
    // 2026-11-16 Night Round 63 (R420 Milestone: suayptalha/wsr + KKarsyline/wake_UP + hsuehly/xiaoyu) verification
    const r420PathA=1980.00+40.0*100.00;
    assert.equal(r420PathA.toFixed(2),'5980.00','11-16 R63 Path A total');
    const r420PathC=75.00+3.1*100.00;
    assert.equal(r420PathC.toFixed(2),'385.00','11-16 R63 Path C total');
    assert.equal((r420PathA-r420PathC).toFixed(2),'5595.00','11-16 R63 savings vs Path A');
    assert.equal(((r420PathA-r420PathC)/r420PathA*100).toFixed(2),'93.56','11-16 R63 pct savings vs Path A');
    for(const r420File of ['workshops/github-trending-radar/docs/wsr-wake-up-xiaoyu-weight-space-reading-10scene-proactive-wake-vidu-agora-avatar-selection-faq.md','workshops/github-trending-radar/docs/wsr-wake-up-xiaoyu-weight-space-reading-10scene-proactive-wake-vidu-agora-avatar-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r63-wsr-wakeup-xiaoyu.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r420File),'utf8');
      assert.ok(txt.includes('1,980.00')&&txt.includes('4,000.00')&&txt.includes('5,980.00')&&txt.includes('75.00')&&txt.includes('310.00')&&txt.includes('385.00')&&txt.includes('5,595.00')&&txt.includes('93.56%')&&txt.includes('not_measured'),r420File+': contains exact 11-16 R63 wsr+wake_up+xiaoyu closed-form parameters');
    }
    // 2026-11-16 Night Round 64 (R421: orbitoo/pelican-test + AlFontal/strava-home-runs + kstost/script-to-motion + Shougo/ng + jorjanion/BatteryDock + circularsquare/trainsworld) verification
    const r421PathA=1860.00+38.5*100.00;
    assert.equal(r421PathA.toFixed(2),'5710.00','11-16 R64 Path A total');
    const r421PathC=70.00+3.0*100.00;
    assert.equal(r421PathC.toFixed(2),'370.00','11-16 R64 Path C total');
    assert.equal((r421PathA-r421PathC).toFixed(2),'5340.00','11-16 R64 savings vs Path A');
    assert.equal(((r421PathA-r421PathC)/r421PathA*100).toFixed(2),'93.52','11-16 R64 pct savings vs Path A');
    for(const r421File of ['workshops/github-trending-radar/docs/pelican-test-strava-home-runs-script-to-motion-shougo-ng-trainsworld-20era-procedural-film-selection-faq.md','workshops/github-trending-radar/docs/pelican-test-strava-home-runs-script-to-motion-shougo-ng-trainsworld-20era-procedural-film-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r64-pelicantest-strava-scripttomotion-ng-trainsworld.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r421File),'utf8');
      assert.ok(txt.includes('1,860.00')&&txt.includes('3,850.00')&&txt.includes('5,710.00')&&txt.includes('70.00')&&txt.includes('300.00')&&txt.includes('370.00')&&txt.includes('5,340.00')&&txt.includes('93.52%')&&txt.includes('not_measured'),r421File+': contains exact 11-16 R64 pelican-test+strava+shougo-ng+trainsworld closed-form parameters');
    }
    // 2026-11-16 Night Round 65 (R422: oujingzhou/agent-interview-questions + brunnojob/revscope + Adolanium/hermes-borealis + DMS-Menula/WebMuseum) verification
    const r422PathA=1830.00+37.5*100.00;
    assert.equal(r422PathA.toFixed(2),'5580.00','11-16 R65 Path A total');
    const r422PathC=65.00+3.0*100.00;
    assert.equal(r422PathC.toFixed(2),'365.00','11-16 R65 Path C total');
    assert.equal((r422PathA-r422PathC).toFixed(2),'5215.00','11-16 R65 savings vs Path A');
    assert.equal(((r422PathA-r422PathC)/r422PathA*100).toFixed(2),'93.46','11-16 R65 pct savings vs Path A');
    for(const r422File of ['workshops/github-trending-radar/docs/agent-interview-questions-revscope-hermes-borealis-webmuseum-266q-agent-rubric-re-guide-selection-faq.md','workshops/github-trending-radar/docs/agent-interview-questions-revscope-hermes-borealis-webmuseum-266q-agent-rubric-re-guide-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r65-agentinterview-revscope-borealis-webmuseum.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r422File),'utf8');
      assert.ok(txt.includes('1,830.00')&&txt.includes('3,750.00')&&txt.includes('5,580.00')&&txt.includes('65.00')&&txt.includes('300.00')&&txt.includes('365.00')&&txt.includes('5,215.00')&&txt.includes('93.46%')&&txt.includes('not_measured'),r422File+': contains exact 11-16 R65 agent-interview+revscope+borealis+webmuseum closed-form parameters');
    }
    // 2026-11-16 Night Round 66 (R423: cavaleiro-ai/projetor-hy320-mini-otimizador + ClaudeZaks/MaoDie-Cat-Clean + senihdal34/DeusNotebook + xnoviiq/MacOS-26-Gnome) verification
    const r423PathA=1805.00+36.5*100.00;
    assert.equal(r423PathA.toFixed(2),'5455.00','11-16 R66 Path A total');
    const r423PathC=60.00+3.0*100.00;
    assert.equal(r423PathC.toFixed(2),'360.00','11-16 R66 Path C total');
    assert.equal((r423PathA-r423PathC).toFixed(2),'5095.00','11-16 R66 savings vs Path A');
    assert.equal(((r423PathA-r423PathC)/r423PathA*100).toFixed(2),'93.40','11-16 R66 pct savings vs Path A');
    for(const r423File of ['workshops/github-trending-radar/docs/hy320-mini-otimizador-maodie-cat-clean-deusnotebook-macos26-gnome-235pct-adb-eink-obsidian-selection-faq.md','workshops/github-trending-radar/docs/hy320-mini-otimizador-maodie-cat-clean-deusnotebook-macos26-gnome-235pct-adb-eink-obsidian-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r66-hy320mini-maodiecat-deusnotebook-macos26gnome.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r423File),'utf8');
      assert.ok(txt.includes('1,805.00')&&txt.includes('3,650.00')&&txt.includes('5,455.00')&&txt.includes('60.00')&&txt.includes('300.00')&&txt.includes('360.00')&&txt.includes('5,095.00')&&txt.includes('93.40%')&&txt.includes('not_measured'),r423File+': contains exact 11-16 R66 hy320+maodie+deusnotebook+macos26gnome closed-form parameters');
    }
    // 2026-11-16 Night Round 67 (R424: raphaelDkhn/miroir + Cheiineeey/keepsake + tangyx527/tyx-signature + atunfrito/tuna-fonts) verification
    const r424PathA=1915.00+39.5*100.00;
    assert.equal(r424PathA.toFixed(2),'5865.00','11-16 R67 Path A total');
    const r424PathC=70.00+3.1*100.00;
    assert.equal(r424PathC.toFixed(2),'380.00','11-16 R67 Path C total');
    assert.equal((r424PathA-r424PathC).toFixed(2),'5485.00','11-16 R67 savings vs Path A');
    assert.equal(((r424PathA-r424PathC)/r424PathA*100).toFixed(2),'93.52','11-16 R67 pct savings vs Path A');
    for(const r424File of ['workshops/github-trending-radar/docs/miroir-keepsake-tyx-signature-tuna-fonts-product-rl-env-memory-bubbles-selection-faq.md','workshops/github-trending-radar/docs/miroir-keepsake-tyx-signature-tuna-fonts-product-rl-env-memory-bubbles-selection-faq.en.md','assets/github-ai-radar-2026-11-16-r67-miroir-keepsake-tyxsignature-tunafonts.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-16-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r424File),'utf8');
      assert.ok(txt.includes('1,915.00')&&txt.includes('3,950.00')&&txt.includes('5,865.00')&&txt.includes('70.00')&&txt.includes('310.00')&&txt.includes('380.00')&&txt.includes('5,485.00')&&txt.includes('93.52%')&&txt.includes('not_measured'),r424File+': contains exact 11-16 R67 miroir+keepsake+tyx-signature+tuna-fonts closed-form parameters');
    }
    // 2026-11-17 Raw Evidence SHA-256, Track A/B & Night Round 1 (R425: cursor/plugins + sybil-solutions/inference-optimisation-skill) verification
    const rawHtml1117=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','trending-daily-2026-11-17-raw.html'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(crypto.createHash('sha256').update(rawHtml1117).digest('hex'),'975ae3c4bbec531e7c1c6a722ba14e463d9798212c29d24b49df8e7a8bb2bd51','2026-11-17 raw HTML LF sha256');
    const rawSearch1117Str=fs.readFileSync(path.join(__dirname,'..','workshops','github-trending-radar','evidence','search-new-repos-2026-11-17-raw.json'),'utf8').replace(/\r\n/g,'\n');
    assert.equal(crypto.createHash('sha256').update(rawSearch1117Str).digest('hex'),'56ea621365827534ce665c4a2729ced5223772ed2d90bd0c68d97328f69b378e','2026-11-17 raw Search JSON LF sha256');
    const rawSearch1117=JSON.parse(rawSearch1117Str);
    const rawSearch1117Map=new Map(rawSearch1117.items.map(it=>[it.full_name,it]));
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_17.track_a_24h_star_surge){
      assert.equal(item.provenance,'measured',item.full_name+': 11-17 Track A provenance');
      assert.ok(rawHtml1117.includes(`href="/${item.full_name}"`),item.full_name+': present in 11-17 raw HTML');
      assert.ok(rawHtml1117.includes(`${item.stars_today.toLocaleString('en-US')} stars today`),item.full_name+': exact stars_today in 11-17 raw HTML');
    }
    for(const item of reportJson.fastest_rising_leaderboard_2026_11_17.track_b_new_repo_breakout_slope){
      assert.equal(item.stars_today,'not_measured',item.full_name+': 11-17 Track B stars_today must be not_measured');
      assert.ok(rawSearch1117Map.has(item.full_name),item.full_name+': present in 11-17 archived Search API JSON');
      const rawEntry=rawSearch1117Map.get(item.full_name);
      assert.equal(item.stars_total_search_api,rawEntry.stargazers_count,item.full_name+': 11-17 stars_total_search_api matches Search API JSON');
      assert.equal(item.stars_per_day,Math.round(item.stars_total/item.age_days),item.full_name+': 11-17 stars_per_day closed-form');
    }
    const r425PathA=2040.00+42.0*100.00;
    assert.equal(r425PathA.toFixed(2),'6240.00','11-17 R1 Path A total');
    const r425PathC=120.00+3.4*100.00;
    assert.equal(r425PathC.toFixed(2),'460.00','11-17 R1 Path C total');
    assert.equal((r425PathA-r425PathC).toFixed(2),'5780.00','11-17 R1 savings vs Path A');
    assert.equal(((r425PathA-r425PathC)/r425PathA*100).toFixed(2),'92.63','11-17 R1 pct savings vs Path A');
    for(const r425File of ['workshops/github-trending-radar/docs/cursor-plugins-inference-optimisation-skill-enterprise-agent-plugin-marketplace-roofline-ab-llm-serving-selection-faq.md','workshops/github-trending-radar/docs/cursor-plugins-inference-optimisation-skill-enterprise-agent-plugin-marketplace-roofline-ab-llm-serving-selection-faq.en.md','assets/github-ai-radar-2026-11-17-r1-cursor-plugins-inference-optimisation.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-17-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r425File),'utf8');
      assert.ok(txt.includes('2,040.00')&&txt.includes('4,200.00')&&txt.includes('6,240.00')&&txt.includes('120.00')&&txt.includes('340.00')&&txt.includes('460.00')&&txt.includes('5,780.00')&&txt.includes('92.63%')&&txt.includes('not_measured'),r425File+': contains exact 11-17 R1 cursor-plugins+inference-optimisation closed-form parameters');
    }
    // 2026-11-17 Night Round 2 (R426: erkamyaman/rust-anything + chuanqisun/spaceship) verification
    const r426PathA=1980.00+41.0*100.00;
    assert.equal(r426PathA.toFixed(2),'6080.00','11-17 R2 Path A total');
    const r426PathC=110.00+3.3*100.00;
    assert.equal(r426PathC.toFixed(2),'440.00','11-17 R2 Path C total');
    assert.equal((r426PathA-r426PathC).toFixed(2),'5640.00','11-17 R2 savings vs Path A');
    assert.equal(((r426PathA-r426PathC)/r426PathA*100).toFixed(2),'92.76','11-17 R2 pct savings vs Path A');
    for(const r426File of ['workshops/github-trending-radar/docs/rust-anything-spaceship-boundary-recorded-shadow-rust-migration-60fps-latent-steering-ide-selection-faq.md','workshops/github-trending-radar/docs/rust-anything-spaceship-boundary-recorded-shadow-rust-migration-60fps-latent-steering-ide-selection-faq.en.md','assets/github-ai-radar-2026-11-17-r2-rust-anything-spaceship.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-17-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r426File),'utf8');
      assert.ok(txt.includes('1,980.00')&&txt.includes('4,100.00')&&txt.includes('6,080.00')&&txt.includes('110.00')&&txt.includes('330.00')&&txt.includes('440.00')&&txt.includes('5,640.00')&&txt.includes('92.76%')&&txt.includes('not_measured'),r426File+': contains exact 11-17 R2 rust-anything+spaceship closed-form parameters');
    }
    // 2026-11-17 Night Round 3 (R427: ysunyang4/Nexus + boringmarketer/boring-marketing-skills) verification
    const r427PathA=1890.00+38.0*95.00;
    assert.equal(r427PathA.toFixed(2),'5500.00','11-17 R3 Path A total');
    const r427PathC=95.00+3.2*95.00;
    assert.equal(r427PathC.toFixed(2),'399.00','11-17 R3 Path C total');
    assert.equal((r427PathA-r427PathC).toFixed(2),'5101.00','11-17 R3 savings vs Path A');
    assert.equal(((r427PathA-r427PathC)/r427PathA*100).toFixed(2),'92.75','11-17 R3 pct savings vs Path A');
    for(const r427File of ['workshops/github-trending-radar/docs/nexus-boring-marketing-skills-332tool-wal-local-mcp-control-plane-32skill-geo-growth-engine-selection-faq.md','workshops/github-trending-radar/docs/nexus-boring-marketing-skills-332tool-wal-local-mcp-control-plane-32skill-geo-growth-engine-selection-faq.en.md','assets/github-ai-radar-2026-11-17-r3-nexus-boring-marketing.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-17-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r427File),'utf8');
      assert.ok(txt.includes('1,890.00')&&txt.includes('3,610.00')&&txt.includes('5,500.00')&&txt.includes('95.00')&&txt.includes('304.00')&&txt.includes('399.00')&&txt.includes('5,101.00')&&txt.includes('92.75%')&&txt.includes('not_measured'),r427File+': contains exact 11-17 R3 nexus+boring-marketing-skills closed-form parameters');
    }
    // 2026-11-17 Night Round 4 (R428: huggingface/pybot + Immortal-Protocols/lastbook) verification
    const r428PathA=1920.00+39.0*95.00;
    assert.equal(r428PathA.toFixed(2),'5625.00','11-17 R4 Path A total');
    const r428PathC=85.00+3.2*95.00;
    assert.equal(r428PathC.toFixed(2),'389.00','11-17 R4 Path C total');
    assert.equal((r428PathA-r428PathC).toFixed(2),'5236.00','11-17 R4 savings vs Path A');
    assert.equal(((r428PathA-r428PathC)/r428PathA*100).toFixed(2),'93.08','11-17 R4 pct savings vs Path A');
    for(const r428File of ['workshops/github-trending-radar/docs/pybot-lastbook-swarm-synthesized-640k-line-zero-weight-chatbot-zero-port-airgapped-citation-rag-selection-faq.md','workshops/github-trending-radar/docs/pybot-lastbook-swarm-synthesized-640k-line-zero-weight-chatbot-zero-port-airgapped-citation-rag-selection-faq.en.md','assets/github-ai-radar-2026-11-17-r4-pybot-lastbook.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-17-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r428File),'utf8');
      assert.ok(txt.includes('1,920.00')&&txt.includes('3,705.00')&&txt.includes('5,625.00')&&txt.includes('85.00')&&txt.includes('304.00')&&txt.includes('389.00')&&txt.includes('5,236.00')&&txt.includes('93.08%')&&txt.includes('not_measured'),r428File+': contains exact 11-17 R4 pybot+lastbook closed-form parameters');
    }
    // 2026-11-17 Night Round 5 (R429: Andsu-dev/runelay + yocontra/pulsar + afurmanov/harness-profiler + inevolin/claude-code-usage-analysis) verification
    const r429PathA=2160.00+40.0*100.00;
    assert.equal(r429PathA.toFixed(2),'6160.00','11-17 R5 Path A total');
    const r429PathC=115.00+3.2*100.00;
    assert.equal(r429PathC.toFixed(2),'435.00','11-17 R5 Path C total');
    assert.equal((r429PathA-r429PathC).toFixed(2),'5725.00','11-17 R5 savings vs Path A');
    assert.equal(((r429PathA-r429PathC)/r429PathA*100).toFixed(2),'92.94','11-17 R5 pct savings vs Path A');
    for(const r429File of ['workshops/github-trending-radar/docs/runelay-pulsar-harness-profiler-claude-usage-selfhosted-mcp-gateway-inter-agent-bus-cache-ttl-finops-selection-faq.md','workshops/github-trending-radar/docs/runelay-pulsar-harness-profiler-claude-usage-selfhosted-mcp-gateway-inter-agent-bus-cache-ttl-finops-selection-faq.en.md','assets/github-ai-radar-2026-11-17-r5-runelay-pulsar-cache-finops.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-17-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r429File),'utf8');
      assert.ok(txt.includes('2,160.00')&&txt.includes('4,000.00')&&txt.includes('6,160.00')&&txt.includes('115.00')&&txt.includes('320.00')&&txt.includes('435.00')&&txt.includes('5,725.00')&&txt.includes('92.94%')&&txt.includes('not_measured'),r429File+': contains exact 11-17 R5 runelay+pulsar+cache-finops closed-form parameters');
    }
    // 2026-11-17 Night Round 6 (R430 Milestone: GenesisAgentInfra/genesis + thesysdev/opendashboards) verification
    const r430PathA=1950.00+39.0*100.00;
    assert.equal(r430PathA.toFixed(2),'5850.00','11-17 R6 Path A total');
    const r430PathC=105.00+3.1*100.00;
    assert.equal(r430PathC.toFixed(2),'415.00','11-17 R6 Path C total');
    assert.equal((r430PathA-r430PathC).toFixed(2),'5435.00','11-17 R6 savings vs Path A');
    assert.equal(((r430PathA-r430PathC)/r430PathA*100).toFixed(2),'92.91','11-17 R6 pct savings vs Path A');
    for(const r430File of ['workshops/github-trending-radar/docs/genesis-opendashboards-quote-verified-business-flow-pr-risk-map-selfhosted-multi-source-bi-dashboard-selection-faq.md','workshops/github-trending-radar/docs/genesis-opendashboards-quote-verified-business-flow-pr-risk-map-selfhosted-multi-source-bi-dashboard-selection-faq.en.md','assets/github-ai-radar-2026-11-17-r6-genesis-opendashboards.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-17-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r430File),'utf8');
      assert.ok(txt.includes('1,950.00')&&txt.includes('3,900.00')&&txt.includes('5,850.00')&&txt.includes('105.00')&&txt.includes('310.00')&&txt.includes('415.00')&&txt.includes('5,435.00')&&txt.includes('92.91%')&&txt.includes('not_measured'),r430File+': contains exact 11-17 R6 genesis+opendashboards closed-form parameters');
    }
    // 2026-11-17 Night Round 7 (R431: aryamandarda/tamserve + teydra/OpenAutark) verification
    const r431PathA=2250.00+41.0*100.00;
    assert.equal(r431PathA.toFixed(2),'6350.00','11-17 R7 Path A total');
    const r431PathC=135.00+3.3*100.00;
    assert.equal(r431PathC.toFixed(2),'465.00','11-17 R7 Path C total');
    assert.equal((r431PathA-r431PathC).toFixed(2),'5885.00','11-17 R7 savings vs Path A');
    assert.equal(((r431PathA-r431PathC)/r431PathA*100).toFixed(2),'92.68','11-17 R7 pct savings vs Path A');
    for(const r431File of ['workshops/github-trending-radar/docs/tamserve-openautark-64camera-57gb-vram-sam2-edgetam-serving-engine-local-multi-device-agent-company-selection-faq.md','workshops/github-trending-radar/docs/tamserve-openautark-64camera-57gb-vram-sam2-edgetam-serving-engine-local-multi-device-agent-company-selection-faq.en.md','assets/github-ai-radar-2026-11-17-r7-tamserve-openautark.svg','workshops/github-trending-radar/evidence/trending-daily-2026-11-17-audit.json']){
      const txt=fs.readFileSync(path.join(__dirname,'..',r431File),'utf8');
      assert.ok(txt.includes('2,250.00')&&txt.includes('4,100.00')&&txt.includes('6,350.00')&&txt.includes('135.00')&&txt.includes('330.00')&&txt.includes('465.00')&&txt.includes('5,885.00')&&txt.includes('92.68%')&&txt.includes('not_measured'),r431File+': contains exact 11-17 R7 tamserve+openautark closed-form parameters');
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
