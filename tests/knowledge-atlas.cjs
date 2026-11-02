const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {tracks, contextTracks, classifyPath, classifyScene, classifyResource, classifyPage} = require('../scripts/engineering-tracks.cjs');
const {knowledgeFigure, systemFigure, graphSvg, buildKnowledgeAtlas, blueprints} = require('../scripts/knowledge-atlas.cjs');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const expected = ['data-infra','infra','commerce','voice','benchmarks','animation','game','security'];
assert.deepEqual(tracks.map(([id])=>id),expected);
assert.equal(contextTracks.length,9);
assert.equal(contextTracks[8][0],'sa-skills');
const cases = [
  ['workshops/data-lab/index.en.html?lang=en','data-infra'],
  ['workshops/azure-agent-infra/demo.html','data-infra'],
  ['workshops/azure-agent-infra/selector.en.html','data-infra'],
  ['workshops/azure-agent-infra/workbench-cycle-377.html','data-infra'],
  ['workshops/azure-agent-infra/benchmark-cards.en.html','data-infra'],
  ['workshops/azure-vm-modernization/index.html','data-infra'],
  ['https://github.com/turbo998/Azure-Infra-Lab/blob/main/workshops/fabcon-sqlcon-2026/README.md','data-infra'],
  ['workshops/azure-agent-infra/index.html','infra'],
  ['workshops/azure-agent-infra/index.en.html','infra'],
  ['workshops/benchmarks/ai-infra-architect-workbench.en.html','infra'],
  ['workshops/benchmarks/ai-infra-phase179-benchmark-cards.html','infra'],
  ['workshops/deepinfer-v41-economics/index.html','infra'],
  ['workshops/benchmarks/e2b-nomad-cards.en.html','infra'],
  ['https://github.com/turbo998/ai-infra-lab/blob/main/docs/alibaba-cloud-ai-infra/README.md','infra'],
  ['studio/zh-data-infra.html#architecture','data-infra'],
  ['studio/infra.html','infra'],
  ['workshops\\data-lab\\index.html','data-infra'],
  ['workshops/agentic-commerce/live-demo.en.html','commerce'],
  ['voice/index.html','voice'],
  ['animation/demos/camera-4d-director/index.html','animation'],
  ['game/index.html','game'],
  ['workshops/ai-security/index.html','security'],
  ['workshops/benchmarks/maf-cards.html','benchmarks']
];
for(const [file,track] of cases) assert.equal(classifyPath(file),track,file);
assert.equal(classifyPath('unlisted.html','voice'),'voice');
assert.equal(classifyResource({track:'infra',proposedNativeResources:{en:{url:'/workshops/data-lab/index.html'}}}),'data-infra');
assert.equal(classifyPage({path:'translated.html',translation:{sourcePath:'workshops/data-lab/index.html'},tracks:['infra']}),'data-infra');
const frozen = read('docs/redesign/route-inventory.json');
const inventory = JSON.parse(frozen);
const sceneTracks = Object.fromEntries(inventory.scenes.map(scene=>[scene.id,classifyScene(scene)]));
assert.equal(sceneTracks['i-pill-2'],'data-infra');
assert.equal(sceneTracks['i-pill-6'],'infra');
assert.equal(sceneTracks['b-pill-4'],'infra');
assert.equal(read('docs/redesign/route-inventory.json'),frozen,'classification must not mutate the frozen inventory');
const catalog = require('../scripts/hub-resource-catalog.json');
assert.deepEqual(catalog.extensions.map(item=>item.id),['sa-skills']);
const verified = new Set(catalog.evidence.map(item=>item.url));
for(const item of catalog.trackResources) for(const link of item.links) assert.ok(verified.has(link.url),link.url);
const emitted = new Map();
assert.equal(buildKnowledgeAtlas({write:(file,content)=>emitted.set(file,content)}).length,20);
for(const [file,content] of emitted) {
  assert.equal(read(file),content,`${file}: deterministic asset`);
  assert.equal(/[\u4e00-\u9fff]/.test(content),file.endsWith('.zh.svg'),`${file}: localized labels`);
  assert.ok(!/<(?:script|image|foreignObject|iframe)|@import|on(?:click|load)=/.test(content),`${file}: static CSP-safe SVG`);
  for(const [,href] of content.matchAll(/href="([^"]+)"/g)) {
    assert.ok(!/^(?:https?:|\/\/)/.test(href),`${file}: local diagram destination`);
    assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),href.split('#')[0])),`${file}: real linked destination ${href}`);
  }
}
for(const [topic] of tracks) {
  assert.ok(blueprints[topic].length >= 5,topic);
  for(const zh of [false,true]) {
    const file = `studio/${zh?'zh-':''}${topic}.html`;
    const html = read(file);
    for(const stage of ['architecture','evaluation','demos','resources']) assert.ok(html.includes(`<section id="${stage}"`),`${file}: ${stage}`);
    const architecture = html.split('<section id="architecture"')[1].split('<section id="evaluation"')[0];
    assert.ok(architecture.includes(`data-knowledge-atlas="${topic}"`),`${file}: overall architecture graph`);
    assert.ok(architecture.includes('class="card-grid '),`${file}: architecture card grid`);
    const svg = graphSvg(file,zh,{topic});
    assert.ok(svg.includes('role="img"') && svg.includes('<title ') && svg.includes('<desc '),`${file}: accessible SVG`);
    assert.ok(svg.includes('data-relationship='),`${file}: labeled relationships`);
    assert.equal(/[\u4e00-\u9fff]/.test(svg),zh,`${file}: graph language`);
    assert.ok(!/<(?:script|image|foreignObject|iframe)|@import|on(?:click|load)=/.test(svg),`${file}: static CSP-safe SVG`);
  }
}
for(const file of ['index.html','zh.html','studio/index.html','studio/zh-index.html']) {
  const html=read(file);
  const grid=html.split('class="card-grid hub-grid"')[1].split('<section id="workbenches"')[0];
  const cards=[...grid.matchAll(/<article class="wb-card(?: wb-featured)?" id="([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(cards,[...expected,'sa-skills'],`${file}: eight core cards and one extension`);
  assert.ok(html.includes('data-knowledge-atlas="system"'),`${file}: overall system map`);
  assert.ok(html.includes('id="infra-lab"'),`${file}: historical extension anchor`);
}
const routes = JSON.parse(read('docs/redesign/production-routes.json')).scenes;
for(const scene of inventory.scenes) {
  assert.ok(routes[scene.track][scene.id],scene.oldHash+': preserved legacy alias');
  assert.ok(routes[classifyScene(scene)][scene.id],scene.id+': source-classified route');
}
const custom = knowledgeFigure('workshops/data-lab/custom.html',true,{title:['Specific page','专页图谱'],concepts:[{title:['Input','输入'],detail:['A & B','甲与乙'],relation:['informs','关联']},['Output','输出']]});
assert.ok(custom.includes('专页图谱') && custom.includes('输入') && custom.includes('输出'));
assert.ok(!custom.includes('Cross-cloud decision'),'custom page concepts replace broad topic defaults');
assert.ok(knowledgeFigure('x.html',false,{title:'<script>"',concepts:['<img onload=bad>','Output']}).includes('&lt;script&gt;&quot;'));
console.log('PASS: 8 tracks, 9 context entries/cards, source overrides, legacy aliases, 20 localized assets and 16 topic graphs.');

async function browserChecks() {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({headless:'shell',pipe:true,protocolTimeout:30000,args:['--disable-gpu']});
  try {
    const page=await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request=>/^https?:/.test(request.url())?request.abort():request.continue());
    const checks=[];
    for(const width of [390,1440]) {
      await page.setViewport({width,height:900});
      for(const file of ['index.html','zh.html',...tracks.flatMap(([topic])=>[`studio/${topic}.html`,`studio/zh-${topic}.html`])]) {
        await page.goto(pathToFileURL(path.join(root,file)).href,{waitUntil:'load'});
        const result=await page.evaluate(()=> {
          const figures=[...document.querySelectorAll('[data-knowledge-atlas]')];
          const visible=element=>getComputedStyle(element).display!=='none' && element.getBoundingClientRect().width>0;
          const svgs=figures.flatMap(figure=>[...figure.querySelectorAll('svg')]).filter(visible);
          const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
          const clipped=svgs.flatMap(svg=>[...svg.querySelectorAll('text')].map(text=>({text:text.textContent,box:text.getBBox(),view:svg.viewBox.baseVal})).filter(({box,view})=>box.x<0 || box.x+box.width>view.width+1 || box.y<0 || box.y+box.height>view.height+1).map(({text})=>text));
          return {graphs:svgs.length,clipped,duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),overflow:figures.some(figure=>figure.getBoundingClientRect().right>innerWidth+1), minFont:Math.min(...svgs.flatMap(svg=>[...svg.querySelectorAll('text')].map(text=>parseFloat(getComputedStyle(text).fontSize)*svg.getBoundingClientRect().width/svg.viewBox.baseVal.width)))};
        });
        assert.equal(result.graphs,1,`${file}/${width}: one visible overall graph`);
        assert.deepEqual(result.clipped,[],`${file}/${width}: text fits the SVG`);
        assert.deepEqual(result.duplicateIds,[],`${file}/${width}: unique IDs`);
        assert.equal(result.overflow,false,`${file}/${width}: figure fits viewport`);
        assert.ok(result.minFont>=10,`${file}/${width}: readable diagram type (${result.minFont})`);
        checks.push(`${file}/${width}`);
        if(process.argv.includes('--screenshots') && ['index.html','studio/data-infra.html','studio/zh-infra.html'].includes(file)) {
          const output=path.join(root,'site-test-artifacts','knowledge-atlas'); fs.mkdirSync(output,{recursive:true});
          const figure = await page.$('[data-knowledge-atlas]');
          await figure.screenshot({path:path.join(output,file.replaceAll('/','-')+`-${width}.png`)});
        }
      }
    }
    await page.setViewport({width:390,height:900});
    await page.setContent(`<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><style>body{margin:16px}</style>${custom}${systemFigure('index.html',true)}`);
    assert.equal(await page.$eval('figure svg',svg=>svg.getBoundingClientRect().width>0),true,'strict-CSP graph renders without runtime code');
    console.log(`PASS: ${checks.length} mobile/desktop graph layouts, localized labels, no clipped text, strict-CSP standalone rendering.`);
  } finally {await browser.close();}
}
if(process.argv.includes('--browser') || process.argv.includes('--screenshots')) browserChecks().catch(error=>{console.error(error);process.exitCode=1;});
