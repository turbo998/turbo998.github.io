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
