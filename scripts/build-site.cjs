const fs = require('node:fs');
const path = require('node:path');
const {tracks, classifyScene, classifyPage} = require('./engineering-tracks.cjs');
const {buildKnowledgeAtlas} = require('./knowledge-atlas.cjs');
function buildSite({root = path.join(__dirname, '..')} = {}) {
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'docs/redesign/route-inventory.json'), 'utf8'));
const readingPath = path.join(root, 'docs/redesign/reading-migration.json');
const readingRecords = fs.existsSync(readingPath) ? JSON.parse(fs.readFileSync(readingPath, 'utf8')).records : [];
const readingByPath = new Map(readingRecords.map(record => [record.path, record]));
function readingDestination(value, zh) {
  if (/^https?:/.test(value)) return value;
  const url = new URL(value, 'https://site.invalid/');
  const record = readingByPath.get(url.pathname.slice(1));
  if (!record) return value;
  const language = record.language;
  const isChinese = /^zh/i.test(language.resolved);
  if ((language.controlledProseTranslationVerified || language.fullTranslationVerified) && language.counterpart && isChinese !== zh && /^(en|zh)/i.test(language.resolved)) {
    url.pathname = '/' + language.counterpart;
  }
  url.searchParams.set('lang', zh ? 'zh-CN' : 'en');
  return url.pathname.slice(1) + url.search + url.hash;
}
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => { fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true }); fs.writeFileSync(path.join(root, file), text); };
const topics = {
  'data-infra': ['Data & Infra Lab', '数据与基础设施实验室', 'Connect data. Isolate execution. Inspect cost.', '连接数据，隔离执行，审视成本。', 'Fabric IQ and cross-cloud data platforms, OneLake and Mirroring, AKSClaw / E2B capacity, Cycle #377 and VM modernization with FinOps.', '从 Fabric IQ 与跨云数据平台、OneLake 与 Mirroring，到 AKSClaw / E2B 容量、Cycle #377 和 VM 现代化与 FinOps。'],
  infra: ['AI Infra', 'AI 基础设施', 'Trace the AI stack and its boundaries.', '读懂 AI 全栈与工程边界。', 'Phase 179 six-layer decisions, Azure runtimes, Tong–Yun–Ge supernodes, DeepInfer inference economics and E2B / Nomad heartbeat resilience.', 'Phase 179 六层决策、Azure 运行时、通–云–哥超节点、DeepInfer 推理经济性，以及 E2B / Nomad 心跳韧性。'],
  commerce: ['Agentic Commerce', '智能体商务', 'Ground the purchase. Verify the handoff.', '让交易接地，让交接可信。', 'Explore grounded product discovery, payment boundaries, and the checkout workflow.', '探索实时商品发现、支付边界与可信结账流程。'],
  voice: ['Voice', '语音', 'Listen to the whole pipeline.', '理解完整的语音管线。', 'Realtime conversation, enterprise scenarios, speaker separation, and original evaluation evidence.', '实时对话、企业场景、说话人分离，以及原始评测证据。'],
  benchmarks: ['Benchmarks & Harness', '测评与 Harness', 'Inspect the method before the score.', '先看方法，再看分数。', 'Original evaluation protocols and archived reports. Each source retains its conditions, provenance, and limitations.', '阅读原始评测协议与归档报告。每份来源保留测试条件、溯源和适用局限。'],
  animation: ['Animation', '动画', 'Make the mechanism visible.', '让运行机制可见。', 'Procedural scenes, explanatory animation, and independent experiments built with code.', '用代码构建程序化场景、知识讲解动画与独立实验。'],
  game: ['Gaming', '游戏', 'Play the system you are studying.', '亲手体验正在研究的系统。', 'Playable prototypes, simulation loops, and the engineering decisions behind interactive worlds.', '可玩的原型、仿真循环，以及交互世界背后的工程决策。'],
  security: ['AI Security', 'AI 安全', 'Make trust boundaries explicit.', '明确每一道信任边界。', 'Architecture, defensive exercises, and original security evaluation reports.', '架构、攻防演练，以及原始安全评测报告。']
};
const sceneNames = {
 'i-pill-1':['Agent infrastructure playbook','智能体基础设施 Playbook'], 'i-pill-2':['AKSClaw × E2B sandbox simulator','AKSClaw × E2B 沙箱仿真台'], 'i-pill-3':['Capacity and recovery selector','容量与恢复选型工具'], 'i-pill-4':['Agent infrastructure report','智能体基础设施报告'], 'i-pill-6':['E2B / Nomad resilience report','E2B / Nomad 韧性报告'], 'i-pill-5':['Azure VM FinOps calculator','Azure VM FinOps 计算器'],
 'c-pill-1':['Web IQ commerce sandbox','Web IQ 商务沙盒'], 'c-pill-2':['Commerce evaluation report','商务评测报告'], 'c-pill-3':['Commerce architecture guide','商务架构指南'],
 'v-pill-1':['Voice scenarios and sandbox','语音场景与沙盒'], 'v-pill-2':['Voice architecture deck','语音架构演示文稿'], 'v-pill-3':['Voice agent evaluation report','语音智能体评测报告'], 'v-pill-4':['Diarization proof-of-concept report','说话人分离概念验证报告'],
 'b-pill-maf':['Multi-agent framework workbench','多智能体框架工作台'], 'b-pill-maf-cards':['MAF framework comparison report','MAF 框架对比报告'], 'b-pill-0':['Gemini 4 Carbon evaluation archive','Gemini 4 Carbon 评测归档'], 'b-pill-1':['FAF / Agent Forge comparison arena','FAF / Agent Forge 对比竞技场'], 'b-pill-2':['SKY-001 evaluation archive','SKY-001 评测归档'], 'b-pill-6':['Coding model evaluation archive','编码模型评测归档'], 'b-pill-3':['Decision-1 routing evaluation','Decision-1 路由评测'], 'b-pill-4':['E2B / Nomad resilience audit','E2B / Nomad 韧性审计'], 'b-pill-5':['Omarchy workflow report','Omarchy 工作流报告'],
 'a-pill-1':['Procedural animation collection','程序化动画资料集'], 'a-pill-2':['Dunhuang Feitian animation','敦煌飞天动画'], 'a-pill-3':['Astra terrain scene','Astra 地形场景'], 'a-pill-4':['Rocket launch simulation','火箭发射仿真'], 'a-pill-5':['Pelican bicycle comparison arena','鹈鹕骑车对比竞技场'], 'a-pill-8':['Knowledge animation workbench','知识动画工作台'], 'a-pill-9':['Knowledge animation report','知识动画报告'], 'a-pill-6':['HVE pelican bicycle demo','HVE 鹈鹕骑车演示'], 'a-pill-7':['Pelican bicycle report','鹈鹕骑车报告'],
 'g-pill-1':['Interactive engineering collection','交互工程资料集'], 'g-pill-2':['Wanan Midnight racing prototype','湾岸 Midnight 竞速原型'], 'g-pill-3':['Scrap Swarm action prototype','废土斗机祭动作原型'], 'g-pill-4':['Mech and boss design study','机甲与 Boss 设计研究'],
 's-pill-1':['AI security playground','AI 安全演练台'], 's-pill-2':['AI security evaluation report','AI 安全评测报告']
};
function destination(scene, zh) {
  const info = scene.plannedNativeResources[zh ? 'zhCN' : 'en'];
  return {...info, url:readingDestination(info.url, zh)};
}
function sourceNote(info, zh) {
  if (!info.contentId) return zh ? '外部站点 · 语言与可用性由来源维护' : 'External site · language and availability managed by source';
  const record = readingByPath.get(new URL(info.url, 'https://site.invalid/').pathname.slice(1));
  if (record?.language.controlledProseTranslationVerified || record?.language.fullTranslationVerified) {
    return zh ? '中英阅读正文 · 保留原始数据与来源说明' : 'English / Chinese reading editions · original evidence preserved';
  }
  const source = String(record?.language.resolved || info.actualDeclaredLanguage || '').startsWith('zh') ? '中文' : 'English';
  return zh ? `原始专用资源：${source} · 保留内部界面与数据` : `Dedicated source: ${source === '中文' ? 'Chinese' : 'English'} · original interface and data retained`;
}
const baselinePaths = new Set(inventory.content.map(p => p.path));
const translations = readingRecords.filter(r => !baselinePaths.has(r.path)).map(r => ({
  path:r.path, role:r.role, title:(read(r.path).match(/<title>([\s\S]*?)<\/title>/i)?.[1] || r.path).replaceAll('&amp;','&'), language:{declared:r.language.resolved},
  tracks:inventory.content.find(p => p.path === r.translation?.sourcePath)?.tracks || []
}));
const webiqPages = ['index.html','index.en.html','live-demo.html','live-demo.en.html','compare.html','compare.en.html'].map(name => ({
  path:'workshops/webiq-azure/'+name, role:name.startsWith('live')?'demo':'article',
  title:name.startsWith('live')?'Web IQ · Azure-ready commerce sandbox':name.startsWith('compare')?'Web IQ · Scenario comparison (not measured)':'Web IQ · Azure integration guide',
  tracks:['commerce'], language:{declared:name.includes('.en.')?'en':'zh-CN'}, supplemental:true
}));
const radarPages = ['github-radar.html','zh-github-radar.html','workshops/github-trending-radar/cards.en.html','workshops/github-trending-radar/cards.html'].map(file => ({
  path:file, role:file.includes('/cards')?'report':'article', title:file.includes('/cards')?'GitHub AI Radar · Original report':'GitHub AI Radar · Hype / Facts / Signal',
  tracks:['benchmarks'], language:{declared:file.startsWith('zh-')||file.endsWith('/cards.html')?'zh-CN':'en'}, supplemental:true
}));
const infraPages = ['benchmark-cards.en.html','workbench-cycle-377.html','workbench-cycle-378.html','workbench-cycle-379.html','workbench-cycle-380.html'].map(name=>({path:'workshops/azure-agent-infra/'+name,role:name.startsWith('benchmark')?'report':'demo',title:'AI Infra · '+(name.includes('380')?'Cycle #380':name.includes('379')?'Cycle #379':name.includes('378')?'Cycle #378':'Cycle #377')+' · '+name,tracks:['infra'],language:{declared:name.includes('.en.')||name.includes('378')||name.includes('379')||name.includes('380')?'en':'zh-CN'},supplemental:true}));
const dataLabPages = ['index.html','live-demo.html','live-demo.en.html','benchmark-cards.html','benchmark-cards.en.html'].map(name=>({path:'workshops/data-lab/'+name,role:name.startsWith('benchmark')?'report':'demo',title:'Data Lab · Fabric IQ / four-cloud workbench · '+name,tracks:['data-infra'],language:{declared:name.includes('.en.')?'en':'zh-CN'},supplemental:true}));
const phase179Pages = ['ai-infra-architect-workbench.html','ai-infra-phase179-benchmark-cards.html','ai-infra-phase180-benchmark-cards.html','ai-infra-phase181-benchmark-cards.html'].map(name=>({path:'workshops/benchmarks/'+name,role:name.includes('cards')?'report':'demo',title:'AI Infra · '+(name.includes('phase181')?'Phase 181':name.includes('phase180')?'Phase 180':'Phase 179')+' · '+name,tracks:['infra'],language:{declared:'und'},supplemental:true}));
const commerceTrendsPages = ['stripe-collison-7-trends.html','stripe-collison-7-trends.en.html'].map(name=>({path:'workshops/agentic-commerce/'+name,role:'article',title:'Stripe / Collison · Seven Agentic Commerce Trends',tracks:['commerce'],language:{declared:name.includes('.en.')?'en':'zh-CN'},supplemental:true}));
const camera4dPages = ['animation','generative-visual-lab'].flatMap(dir=>[
  {path:`${dir}/demos/camera-4d-director/index.html`,role:'demo',title:'4D Gaussian & Plücker Camera Director Studio',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/demos/camera-4d-director/test-report-cards.html`,role:'report',title:'4D Gaussian & Plücker Camera Control · 7-Card Report',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/controllable-4d-video-camera-study.html`,role:'article',title:'可控 4D 高斯溅射与 Plücker 相机控制视频导演架构研究',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/controllable-4d-video-camera-study.en.html`,role:'article',title:'Controllable 4D Gaussian Splatting & Plücker Camera-Control Video Architecture Study',tracks:['animation'],language:{declared:'en'},supplemental:true}
]);
const audiovisualFoleyPages = ['animation','generative-visual-lab'].flatMap(dir=>[
  {path:`${dir}/demos/audiovisual-foley-studio/index.html`,role:'demo',title:'Native Audio-Visual Joint DiT & FramePack Foley Studio',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/demos/audiovisual-foley-studio/test-report-cards.html`,role:'report',title:'Native Audio-Visual Joint DiT & FramePack Foley · 7-Card Report',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/audiovisual-foley-framepack-study.html`,role:'article',title:'原生音画联合扩散与 FramePack 恒定上下文长时序物理拟音架构研究',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/audiovisual-foley-framepack-study.en.html`,role:'article',title:'Native Audio-Visual Joint Diffusion & FramePack Constant-Context Foley Studio Architecture Study',tracks:['animation'],language:{declared:'en'},supplemental:true}
]);
const physGaussianPages = ['animation','generative-visual-lab'].flatMap(dir=>[
  {path:`${dir}/demos/physgaussian-world-studio/index.html`,role:'demo',title:'Constitutive 3D Gaussian MPM & Physics World Model Studio',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/demos/physgaussian-world-studio/test-report-cards.html`,role:'report',title:'Constitutive 3D Gaussian MPM & Physics World Model · 7-Card Report',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/physgaussian-world-mpm-study.html`,role:'article',title:'本构 3D 高斯物质点法与物理底座世界模型架构研究',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/physgaussian-world-mpm-study.en.html`,role:'article',title:'Constitutive 3D Gaussian MPM & Physics-Grounded World Model Architecture Study',tracks:['animation'],language:{declared:'en'},supplemental:true}
]);
const neuralRelightPages = ['animation','generative-visual-lab'].flatMap(dir=>[
  {path:`${dir}/demos/neural-relight-director/index.html`,role:'demo',title:'Neural Inverse/Forward G-Buffer Video Relighting & Multi-Subject Director',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/demos/neural-relight-director/test-report-cards.html`,role:'report',title:'Neural Inverse/Forward G-Buffer Video Relighting & Multi-Subject ID · 7-Card Report',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/neural-relighting-causal-video-study.html`,role:'article',title:'神经逆向/正向 G-Buffer 视频重打光与多主体身份锁定关键帧导演架构研究',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/neural-relighting-causal-video-study.en.html`,role:'article',title:'Neural Inverse/Forward G-Buffer Video Relighting & Multi-Subject Identity-Preserving Director Architecture Study',tracks:['animation'],language:{declared:'en'},supplemental:true}
]);
const archivePages = [...inventory.content, ...translations, ...webiqPages, ...radarPages, ...infraPages, ...dataLabPages, ...phase179Pages, ...commerceTrendsPages, ...camera4dPages, ...audiovisualFoleyPages, ...physGaussianPages, ...neuralRelightPages].map(page => ({...page, tracks:[classifyPage(page), ...(page.tracks || []).filter(track => track !== classifyPage(page) && track !== 'infra')]}));
function archiveNote(page, zh) {
  const t = (en, cn) => zh ? cn : en;
  const record = readingByPath.get(page.path);
  const lang = record?.language;
  if (lang?.controlledProseTranslationVerified || lang?.fullTranslationVerified) return `${lang.resolved} · ${t('Verified bilingual reading text','已核验中英阅读正文')}${lang.mediaLanguageLimitations?.length ? t(' · Original-language media noted on page',' · 页面列明原语种媒体限制') : ''}`;
  if (page.supplemental) return `${page.language.declared} · ${t('Later source edition · protected original interface / data','后续来源版本 · 保留原始界面／数据')}`;
  if (record?.disposition === 'dedicated-design-exception' || ['demo','report','auxiliary'].includes(page.role)) return `${lang?.resolved || page.language.declared || 'und'} · ${t('Protected original interface / data','保留专用原始界面／数据')}`;
  return `${lang?.resolved || page.language.declared || 'und'} · ${t('Original source edition','原始来源版本')}`;
}
buildKnowledgeAtlas({root,write});
require('./hub-pages.cjs')({root,inventory,readingRecords,archivePages,archiveNote,topics,sceneNames,destination,readingDestination,sourceNote,write});
// Keep historical module hashes as aliases while adding the new source-derived track routes.
const routeData = Object.fromEntries(tracks.map(([track])=>[track,Object.fromEntries(inventory.scenes.filter(s=>classifyScene(s)===track || s.track===track).map(s=>[s.id,{en:destination(s,false).url,zh:destination(s,true).url,track:classifyScene(s)}]))]));
routeData['infra-lab'] = routeData['data-infra'];
write('assets/editorial/legacy-routes.js', `(() => {\n const routes=${JSON.stringify(routeData)};\n const script=document.currentScript; const base=new URL('../../',script.src); const q=new URLSearchParams(location.search); const zh=q.get('lang')!=='en'; const bits=location.hash.slice(1).split('/'); const track=routes[bits[0]]?bits[0]:(routes[q.get('track')]?q.get('track'):null);\n if(!track) return;\n let target='studio/'+(zh?'zh-':'')+(track==='infra-lab'?'data-infra':track)+'.html'; let hash='';\n if(bits[1]==='module' && routes[track][bits[2]]) target=routes[track][bits[2]][zh?'zh':'en'];\n else { const stage=bits[1]==='stage'?bits[2]:/^stage-[1-4]$/.test(bits[1]||'')?bits[1].slice(-1):null; if(stage) hash='#'+(['architecture','evaluation','demos','resources'][Number(stage)-1]||'architecture'); }\n const next=new URL(target.replace(/^\\//,''),base); if(q.has('theme'))next.searchParams.set('theme',q.get('theme')); if(q.has('lang'))next.searchParams.set('lang',q.get('lang')); if(hash) next.hash=hash; location.replace(next.href);\n})();\n`);
for (const [source,target] of [['site.css','editorial.css'],['site.js','editorial.js'],['theme-init.js','theme-init.js']]) write('design-preview/'+target,read('assets/editorial/'+source));
write('docs/redesign/production-routes.json',JSON.stringify({baseline:inventory.baseline,portalPages:['index.html','zh.html','frontier-ai-studio.html',...fs.readdirSync(path.join(root,'studio')).filter(f=>f.endsWith('.html')).map(f=>'studio/'+f)],scenes:routeData,languagePolicy:'Source language and translation gaps are explicit; filenames alone are not translation evidence.'},null,2)+'\n');
console.log('Built production home, Hub directory, eight bilingual tracks, knowledge atlas, full archive and legacy compatibility.');
return {tracks, archivePages, routeData};
}
module.exports = buildSite;
module.exports.buildSite = buildSite;
if (require.main === module) buildSite();
