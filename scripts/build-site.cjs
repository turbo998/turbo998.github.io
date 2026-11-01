const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const inventory = require('../docs/redesign/route-inventory.json');
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
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const map = { 'index.html': 'index.html', 'zh-index.html': 'zh.html', 'studio.html': 'studio/index.html', 'zh-studio.html': 'studio/zh-index.html', 'infra.html': 'studio/infra.html', 'zh-infra.html': 'studio/zh-infra.html' };
const rel = (from, to) => path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to);
const topics = {
  infra: ['AI Infra', 'AI 基础设施', 'Build on explicit boundaries.', '在清晰边界上构建。', 'Isolation, capacity, orchestration, and recovery. Follow the original architecture and try independent tools.', '从隔离、容量、编排到恢复，阅读原始架构，独立运行工程工具。'],
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
function urlFrom(file, url) { return /^https?:/.test(url) ? url : rel(file, url.replace(/^\//, '')); }
function sourceNote(info, zh) {
  if (!info.contentId) return zh ? '外部站点 · 语言与可用性由来源维护' : 'External site · language and availability managed by source';
  const record = readingByPath.get(new URL(info.url, 'https://site.invalid/').pathname.slice(1));
  if (record?.language.controlledProseTranslationVerified || record?.language.fullTranslationVerified) {
    return zh ? '中英阅读正文 · 保留原始数据与来源说明' : 'English / Chinese reading editions · original evidence preserved';
  }
  const source = String(record?.language.resolved || info.actualDeclaredLanguage || '').startsWith('zh') ? '中文' : 'English';
  return zh ? `原始专用资源：${source} · 保留内部界面与数据` : `Dedicated source: ${source === '中文' ? 'Chinese' : 'English'} · original interface and data retained`;
}
function sceneRow(scene, file, zh) {
  const info = destination(scene, zh); const name = sceneNames[scene.id][zh ? 1 : 0];
  const url = new URL(info.url, 'https://site.invalid/');
  url.searchParams.set('lang', zh ? 'zh-CN' : 'en');
  const target = /^https?:/.test(info.url) ? url.href : url.pathname + url.search + url.hash;
  return `<a class="resource-row" id="module-${scene.id}" data-scene="${scene.sceneId}" href="${escape(urlFrom(file, target))}"><span><strong>${name}</strong><span class="resource-desc">${sourceNote(info, zh)}</span></span><span class="resource-meta">${zh ? '打开原始资源' : 'Open original'} ↗</span></a>`;
}
function transform(source, file) {
  const zh = source.startsWith('zh-');
  let html = read('design-preview/' + source).replace(/<meta name="robots"[^>]*>/, '');
  html = html.replace(/(href|src|data-counterpart)="([^"]+)"/g, (all, attr, value) => {
    if (/^(?:#|https?:|data:|mailto:)/.test(value)) return all;
    const split = value.search(/[?#]/);
    const plain = split < 0 ? value : value.slice(0, split);
    const suffix = split < 0 ? '' : value.slice(split);
    let target;
    if (map[plain]) target = map[plain];
    else if (plain === 'editorial.css') target = 'assets/editorial/site.css';
    else if (plain === 'editorial.js') target = 'assets/editorial/site.js';
    else if (plain === 'theme-init.js') target = 'assets/editorial/theme-init.js';
    else if (plain.startsWith('assets/')) target = 'assets/editorial/' + plain.slice(7);
    else target = path.posix.normalize('design-preview/' + plain);
    target = attr === 'href' ? readingDestination(target + suffix, zh) : target + suffix;
    return `${attr}="${rel(file, target)}"`;
  });
  html = html.replace('An isolated visual preview.', 'A personal engineering collection.').replace('仅供视觉审批的隔离样稿。', 'Qi Chen 的个人工程资料集。');
  html = html.replace('DESIGN PREVIEW · R3 / NOT PUBLISHED', 'QI CHEN / ENGINEERING FIELD NOTES').replace('设计样稿 · R3 / 尚未发布', 'QI CHEN / 工程手记');
  html = html.replace('AI Infra previews the new topic format. The other six entries open existing independent collections; their redesign is not part of this approval round.', 'Choose a track, then move from architecture to evidence and independent demos. Reading editions are available in English and Chinese; dedicated demos and original reports keep their own interfaces.').replace('AI 基础设施展示新主题页样式。其余六项直达现有独立资料集，本轮尚不迁移。', '从主题进入架构、证据与独立演示。阅读正文提供中英版本，专用演示与原始报告保留各自的内部界面。');
  html = html.replaceAll('New topic preview', 'Explore track').replaceAll('新主题样稿', '探索主题').replaceAll('Original collection', 'Explore track').replaceAll('原有资料集', '探索主题');
  html = html.replace('this preview does not recalculate or reproduce results.', 'this directory does not recalculate or reproduce results.').replace('本样稿不重新计算或复现实验结果。', '本目录不重新计算或复现实验结果。');
  html = html.replace('Full demo acceptance remains a later phase.', 'Some features need browser permissions or an external service; see each tool’s requirements.').replace('完整演示验收属于后续阶段。', '部分能力需要浏览器权限或外部服务，请查看各工具的运行说明。');
  html = html.replace('</main>', `<p class="source-note"><a href="${rel(file, 'studio/' + (zh ? 'zh-' : '') + 'archive.html')}">${zh ? '浏览完整资源档案与语言状态' : 'Browse the complete archive and language status'} →</a></p></main>`);
  return html;
}
for (const [source, file] of Object.entries(map)) {
  let html = transform(source, file);
  if (source === 'index.html' || source === 'zh-index.html') {
    const zh = source.startsWith('zh-');
    const radar = `<section class="section" id="github-radar"><p class="eyebrow">NEW / GITHUB AI RADAR</p><h2>${zh ? '从热门信号，走向工程判断。' : 'Turn trending signals into engineering judgment.'}</h2><p>${zh ? '追踪 GitHub AI 项目的工程信号：Hype / Facts / Signal 工作台、来源审计与架构实践。归档结果不是本次重测，也不代表网页后台运行了每日任务。' : 'Inspect engineering signals across GitHub AI projects: Hype / Facts / Signal workbench, source audit and architecture playbooks. Archived results are not a new evaluation or proof of a scheduled backend on this static site.'}</p><a class="resource-row" href="${zh ? 'zh-' : ''}github-radar.html"><strong>${zh ? '打开 GitHub AI 雷达' : 'Open GitHub AI Radar'}</strong><span>→</span></a><a class="resource-row" href="workshops/github-trending-radar/cards${zh ? '' : '.en'}.html"><strong>${zh ? '原始七卡报告' : 'Original seven-card report'}</strong><span>↗</span></a><a class="text-link" href="workshops/github-trending-radar/summary-2026-11-01.svg">${zh ? '原始可视化摘要' : 'Original visual summary'} ↗</a></section>`;
    const recent = `<section class="section"><p class="eyebrow">RECENT / ENGINEERING WORKBENCHES</p><h2>${zh?'从架构走进可操作的工作台。':'Move from architecture into a working model.'}</h2><a class="resource-row" href="voice/index${zh?'':'.en'}.html#duplexGuardSimulatorCard"><strong>Voice · Stage 356 · P705 / P706</strong><span>${zh?'来源夹具沙盒':'Source-fixture sandbox'} ↗</span></a><a class="resource-row" href="workshops/agentic-commerce/live-demo${zh?'':'.en'}.html#stage1752-sandbox"><strong>Commerce · Stage 1752 · Link Wallet / Web IQ</strong><span>${zh?'离线工作台':'Offline workbench'} ↗</span></a><a class="resource-row" href="workshops/data-lab/index.html?lang=${zh?'zh-CN':'en'}"><strong>Data Lab · Fabric IQ / ${zh?'四云共存':'four-cloud coexistence'}</strong><span>${zh?'架构与报告':'Architecture and reports'} ↗</span></a></section>`;
    html = html.replace('<section id="research"', radar + recent + '<section id="research"');
    html = html.replace('</div></div><aside class="hero-index"', `<a class="text-link" href="${zh ? 'zh-' : ''}github-radar.html">${zh ? '新刊 · GitHub AI 雷达' : 'New · GitHub AI Radar'} ↗</a></div></div><aside class="hero-index"`);
    const aliases = { main: ['top'], projects: ['architecture', 'studio-directory', 'workbenches', 'pillars'], research: ['writing', 'stage-2', 'matrix', 'explore'] };
    for (const [id, names] of Object.entries(aliases)) {
      html = html.replace(new RegExp(`(<(?:main|section) id="${id}"[^>]*>)`), '$1' + names.map(name => `<span id="${name}" class="legacy-anchor" aria-hidden="true"></span>`).join(''));
    }
    html = html.replace(/href="voice\/index(?:\.en)?\.html[^\"]*"/, `href="studio/${source.startsWith('zh-') ? 'zh-' : ''}voice.html"`).replace(/href="animation\/index(?:\.en)?\.html[^\"]*"/, `href="studio/${source.startsWith('zh-') ? 'zh-' : ''}animation.html"`);
  }
  if (/studio\.html$/.test(source)) {
    for (const track of Object.keys(topics)) {
      const rx = new RegExp(`(<article class="track-row[^>]*id="${track}"[\\s\\S]*?<h2><a href=")[^"]+`);
      html = html.replace(rx, '$1' + (source.startsWith('zh-') ? 'zh-' : '') + track + '.html');
    }
  }
  if (/infra\.html$/.test(source)) {
    const zh = source.startsWith('zh-');
    const additions = `<section class="section"><p class="eyebrow">LATEST / INFRASTRUCTURE</p><h2>${zh?'最新工作台与原始证据':'Latest workbenches and original evidence'}</h2><a class="resource-row" href="../workshops/azure-agent-infra/workbench-cycle-377.html?lang=${zh?'zh-CN':'en'}"><strong>Cycle #377 · ${zh?'可复现实验工作台':'Reproducible workbench'}</strong><span>↗</span></a><a class="resource-row" href="../workshops/azure-agent-infra/benchmark-cards${zh?'':'.en'}.html"><strong>Cycle #377 · ${zh?'原始七卡报告':'Original seven-card report'}</strong><span>↗</span></a><a class="resource-row" href="../workshops/data-lab/index.html?lang=${zh?'zh-CN':'en'}"><strong>Data Lab · Fabric IQ / ${zh?'四云共存工作台':'four-cloud coexistence workbench'}</strong><span>↗</span></a><a class="resource-row" href="../workshops/data-lab/benchmark-cards${zh?'':'.en'}.html"><strong>Data Lab · ${zh?'原始七卡报告':'Original seven-card report'}</strong><span>↗</span></a><p class="source-note">${zh?'保留来源报告与仿真条件；本次界面迁移没有重新测量性能或厂商价格。':'Source reports and simulation conditions are retained; this interface migration does not remeasure performance or vendor prices.'}</p></section>`;
    const phaseLinks = `<a class="resource-row" href="../workshops/benchmarks/ai-infra-architect-workbench.html?lang=${zh?'zh-CN':'en'}"><strong>Phase 179 · ${zh?'Infra 架构工作台':'Infra architect workbench'}</strong><span>↗</span></a><a class="resource-row" href="../workshops/benchmarks/ai-infra-phase179-benchmark-cards.html"><strong>Phase 179 · ${zh?'原始七卡报告':'Original seven-card report'}</strong><span>↗</span></a>`;
    html = html.replace('<div class="back-row">', additions.replace('<p class="source-note">',phaseLinks+'<p class="source-note">')+'<div class="back-row">');
    const rows = inventory.scenes.filter(s => s.track === 'infra').map(s => sceneRow(s, file, source.startsWith('zh-'))).join('');
    html = html.replace('<div class="back-row">', `<section class="section"><h2>${source.startsWith('zh-') ? '完整场景索引' : 'Complete scenario index'}</h2>${rows}</section><div class="back-row">`);
  }
  write(file, html);
}
const shell = (file, zh, title, content) => {
  let html = transform(zh ? 'zh-studio.html' : 'studio.html', file);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)} — Qi Chen</title>`);
  html = html.replace(/data-counterpart="[^"]+"/, `data-counterpart="${path.posix.basename(file).startsWith('zh-') ? path.posix.basename(file).slice(3) : 'zh-' + path.posix.basename(file)}"`);
  html = html.replace(/(<a class="language-link" href=")[^"]+/, '$1' + (path.posix.basename(file).startsWith('zh-') ? path.posix.basename(file).slice(3) : 'zh-' + path.posix.basename(file)));
  return html.replace(/(<main[^>]*>)[\s\S]*?(<\/main>)/, '$1' + content + '$2');
};
const sections = [['architecture','Architecture','架构'],['evaluation','Evaluation','测评'],['demos','Demos','演示'],['resources','Resources','资料']];
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
const infraPages = ['benchmark-cards.en.html','workbench-cycle-377.html'].map(name=>({path:'workshops/azure-agent-infra/'+name,role:name.startsWith('benchmark')?'report':'demo',title:'AI Infra · Cycle #377 · '+name,tracks:['infra'],language:{declared:name.includes('.en.')?'en':'zh-CN'},supplemental:true}));
const dataLabPages = ['index.html','live-demo.html','live-demo.en.html','benchmark-cards.html','benchmark-cards.en.html'].map(name=>({path:'workshops/data-lab/'+name,role:name.startsWith('benchmark')?'report':'demo',title:'Data Lab · Fabric IQ / four-cloud workbench · '+name,tracks:['infra'],language:{declared:name.includes('.en.')?'en':'zh-CN'},supplemental:true}));
const phase179Pages = ['ai-infra-architect-workbench.html','ai-infra-phase179-benchmark-cards.html'].map(name=>({path:'workshops/benchmarks/'+name,role:name.includes('cards')?'report':'demo',title:'AI Infra · Phase 179 · '+name,tracks:['infra'],language:{declared:'und'},supplemental:true}));
const archivePages = [...inventory.content, ...translations, ...webiqPages, ...radarPages, ...infraPages, ...dataLabPages, ...phase179Pages];
function archiveNote(page, zh) {
  const t = (en, cn) => zh ? cn : en;
  const record = readingByPath.get(page.path);
  const lang = record?.language;
  if (lang?.controlledProseTranslationVerified || lang?.fullTranslationVerified) return `${lang.resolved} · ${t('Verified bilingual reading text','已核验中英阅读正文')}${lang.mediaLanguageLimitations?.length ? t(' · Original-language media noted on page',' · 页面列明原语种媒体限制') : ''}`;
  if (page.supplemental) return `${page.language.declared} · ${t('Later source edition · protected original interface / data','后续来源版本 · 保留原始界面／数据')}`;
  if (record?.disposition === 'dedicated-design-exception' || ['demo','report','auxiliary'].includes(page.role)) return `${lang?.resolved || page.language.declared || 'und'} · ${t('Protected original interface / data','保留专用原始界面／数据')}`;
  return `${lang?.resolved || page.language.declared || 'und'} · ${t('Original source edition','原始来源版本')}`;
}
const architectureScenes = new Set(['c-pill-3','v-pill-2','a-pill-1','g-pill-1']);
function category(s) { if (architectureScenes.has(s.id)) return 'architecture'; if (/cards|benchmark-cards/.test(s.raw)) return 'evaluation'; return 'demos'; }
for (const zh of [false, true]) {
  const t = (en, cn) => zh ? cn : en;
  for (const [track, copy] of Object.entries(topics)) {
    if (track === 'infra') continue;
    const file = `studio/${zh ? 'zh-' : ''}${track}.html`;
    const scenes = inventory.scenes.filter(s => s.track === track);
    const resources = inventory.trackResources.filter(s => s.track === track);
    let body = `<div class="breadcrumb"><a href="${rel(file, zh ? 'zh.html' : 'index.html')}">${t('Home','首页')}</a><span>/</span><a href="${zh ? 'zh-' : ''}index.html">Studio</a><span>/</span><span>${copy[zh ? 1 : 0]}</span></div><section class="page-hero topic-hero"><p class="eyebrow">FRONTIER AI STUDIO / ${track.toUpperCase()}</p><h1>${copy[zh ? 3 : 2]}</h1><p class="lead">${copy[zh ? 5 : 4]}</p><p class="source-note">${t('Bilingual reading editions preserve the original technical findings. Dedicated demos, reports, and recorded media retain their source interface and content.', '中英阅读版本保留原始技术结论。专用演示、报告与录制媒体保留其来源界面和内容。')}</p></section><nav class="section-nav" aria-label="${t('On this page','本页目录')}">${sections.map(([id,en,cn],i)=>`<a href="#${id}"><span>0${i+1}</span> ${t(en,cn)}</a>`).join('')}</nav>`;
    for (const [i, [id,en,cn]] of sections.entries()) {
      const selected = scenes.filter(s => category(s) === id);
      let rows = selected.map(s => sceneRow(s,file,zh)).join('');
      if (id === 'architecture' && !rows) rows = `<p>${t('Start with the source collection for architecture and operating context. The links below retain the original documentation.', '从原始资料集了解架构与运行背景，下方链接保留原始文档。')}</p>`;
      if (id === 'evaluation' && !rows) rows = `<p>${t('No separate evaluation report is listed for this track. The archive is not evidence of a new benchmark run.', '此主题未列出独立评测报告；归档内容不代表本次执行了新的基准测试。')}</p>`;
      if (id === 'resources') rows = resources.map(r=>`<a class="resource-row" href="${escape(urlFrom(file,readingDestination(r.proposedNativeResources[zh?'zhCN':'en'].url,zh)))}"><span><strong>${escape(r.label)}</strong><span class="resource-desc">${t('Original source · external destinations manage their own language and availability.', '原始来源 · 外部站点自行维护语言和可用性。')}</span></span><span>↗</span></a>`).join('') + `<a class="resource-row" href="${zh ? 'zh-' : ''}archive.html#${track}"><strong>${t('All archived resources in this track','此主题的全部归档资源')}</strong><span>→</span></a>`;
      if (track === 'commerce' && ['architecture','demos'].includes(id)) {
        const name = id === 'architecture' ? 'index' : 'live-demo';
        rows += `<a class="resource-row" href="../workshops/webiq-azure/${name}${zh?'':'.en'}.html"><span><strong>${t('Web IQ · Azure-ready commerce', 'Web IQ · Azure 商务集成')}</strong><span class="resource-desc">${t('Bilingual guide and offline sandbox · Azure backend is not connected', '双语指南与离线沙盒 · 尚未连接 Azure 后端')}</span></span><span>↗</span></a>`;
      }
      if (track === 'commerce' && ['evaluation','resources'].includes(id)) rows += `<a class="resource-row" href="../workshops/webiq-azure/compare${zh?'':'.en'}.html"><strong>${t('Web IQ · Scenario comparison / unmeasured vendor claims','Web IQ · 场景比较／未实测厂商声明')}</strong><span>↗</span></a>`;
      if (track === 'voice' && id === 'demos') rows += `<a class="resource-row" href="../voice/index${zh?'':'.en'}.html#duplexGuardSimulatorCard"><strong>Stage 356 · P705 / P706 · ${t('Source-fixture sandbox','来源夹具沙盒')}</strong><span>↗</span></a>`;
      if (track === 'benchmarks' && ['evaluation','demos','resources'].includes(id)) {
        const target = id === 'evaluation' ? `workshops/github-trending-radar/cards${zh?'':'.en'}.html` : `${zh?'zh-':''}github-radar.html`;
        rows += `<a class="resource-row" href="../${target}"><span><strong>${t('GitHub AI Radar · Hype / Facts / Signal','GitHub AI 雷达 · Hype / Facts / Signal')}</strong><span class="resource-desc">${t('Original workbench, source audit and report','原始工作台、来源审计与报告')}</span></span><span>↗</span></a>`;
      }
      body += `<section id="${id}" class="section topic-section"><div class="topic-label"><p class="eyebrow">0${i+1} / ${t(en.toUpperCase(),cn)}</p><h2>${t(en,cn)}</h2></div><div class="topic-body">${rows || `<p>${t('See the original collection in Resources.', '请查看资料区的原始资料集。')}</p>`}</div></section>`;
    }
    body += `<div class="back-row"><a class="text-link" href="${zh ? 'zh-' : ''}index.html">← ${t('All Studio tracks','全部 Studio 主题')}</a><a class="text-link" href="#main">${t('Back to top','回到顶部')} ↑</a></div>`;
    write(file,shell(file,zh,copy[zh ? 1 : 0],body));
  }
  const file = `studio/${zh ? 'zh-' : ''}archive.html`;
  let body = `<div class="breadcrumb"><a href="${zh?'zh-':''}index.html">Studio</a><span>/</span>${t('Archive','完整档案')}</div><section class="page-hero"><p class="eyebrow">SOURCE DIRECTORY</p><h1>${t('Keep the original within reach.','让原始资料，始终可达。')}</h1><p class="lead">${t('All 146 baseline HTML resources remain accessible, alongside 12 new English reading editions and 19 subsequently published Web IQ, GitHub Radar, Infra and Data Lab pages. Source titles and duplicate exports are preserved; current language notes distinguish translated prose from protected media and demo interfaces.', '146 个基线 HTML 资源全部保留，新增 12 个英文阅读版本及随后发布的 19 个 Web IQ、GitHub Radar、Infra 与 Data Lab 页面。标题与重复导出保留来源；当前语言说明区分已翻译正文、原语种媒体和受保护的演示界面。')}</p><p class="source-note">${t('The historical inventory found 59 pages without verified translation counterparts and 16 filename/language conflicts. A filename ending in .en does not establish an English translation.', '历史清单发现 59 页缺少核验过的翻译对应页，16 处文件名与语言冲突。.en 文件名不代表确有英文译文。')}</p></section>`;
  const groups = [...Object.keys(topics), 'general'];
  for (const group of groups) {
    const pages = archivePages.filter(p => (p.tracks[0] || 'general') === group);
    body += `<section id="${group}" class="section"><h2>${group==='general'?t('General & reference','综合与参考'):topics[group][zh?1:0]}</h2>${pages.map(p=>`<a class="resource-row" href="${rel(file,p.path)}"><span><strong>${escape(p.title)}</strong><span class="resource-desc">${escape(p.path)} · ${escape(archiveNote(p,zh))}</span></span><span class="resource-meta">${escape(p.role)} ↗</span></a>`).join('')}</section>`;
  }
  write(file,shell(file,zh,t('Complete archive','完整档案'),body));
}
// Old URLs are compatibility entry points, not embedded applications.
let legacy = read('studio/zh-index.html').replace(/(href|src|data-counterpart)="([^"]+)"/g,(all,attr,value)=> {
  if (/^(?:https?:|data:|#)/.test(value)) return all;
  return `${attr}="${path.posix.normalize('studio/' + value)}"`;
});
legacy = legacy.replace('<script src="assets/editorial/theme-init.js"></script>','<script src="assets/editorial/legacy-routes.js"></script><script src="assets/editorial/theme-init.js"></script>');
legacy = legacy.replace('</main>', `<details class="section"><summary>旧场景直达 / Legacy scenario links</summary>${inventory.scenes.map(s=>sceneRow(s,'frontier-ai-studio.html',true)).join('')}</details></main>`);
write('frontier-ai-studio.html',legacy);
const routeData = Object.fromEntries(inventory.tracks.map(track=>[track.id,Object.fromEntries(inventory.scenes.filter(s=>s.track===track.id).map(s=>[s.id,{en:destination(s,false).url,zh:destination(s,true).url}]))]));
write('assets/editorial/legacy-routes.js', `(() => {\n const routes=${JSON.stringify(routeData)};\n const script=document.currentScript; const base=new URL('../../',script.src); const q=new URLSearchParams(location.search); const zh=q.get('lang')!=='en'; const bits=location.hash.slice(1).split('/'); const track=routes[bits[0]]?bits[0]:(routes[q.get('track')]?q.get('track'):null);\n if(!track) return;\n let target='studio/'+(zh?'zh-':'')+track+'.html'; let hash='';\n if(bits[1]==='module' && routes[track][bits[2]]) target=routes[track][bits[2]][zh?'zh':'en'];\n else { const stage=bits[1]==='stage'?bits[2]:/^stage-[1-4]$/.test(bits[1]||'')?bits[1].slice(-1):null; if(stage) hash='#'+(['architecture','evaluation','demos','resources'][Number(stage)-1]||'architecture'); }\n const next=new URL(target.replace(/^\\//,''),base); if(q.has('theme'))next.searchParams.set('theme',q.get('theme')); if(q.has('lang'))next.searchParams.set('lang',q.get('lang')); if(hash) next.hash=hash; location.replace(next.href);\n})();\n`);
write('assets/editorial/site.css',read('design-preview/editorial.css')+'\n.resource-row{overflow-wrap:anywhere}.resource-row>span:first-child{min-width:0}.section>h2{margin-bottom:24px}.source-note a{text-decoration:underline}details.section>summary{justify-content:flex-start}\n');
write('assets/editorial/site.js',read('design-preview/editorial.js'));
write('assets/editorial/theme-init.js',read('design-preview/theme-init.js'));
fs.copyFileSync(path.join(root,'design-preview/assets/infra-simulator.png'),path.join(root,'assets/editorial/infra-simulator.png'));
write('docs/redesign/production-routes.json',JSON.stringify({baseline:inventory.baseline,portalPages:['index.html','zh.html','frontier-ai-studio.html',...fs.readdirSync(path.join(root,'studio')).filter(f=>f.endsWith('.html')).map(f=>'studio/'+f)],scenes:routeData,languagePolicy:'Source language and translation gaps are explicit; filenames alone are not translation evidence.'},null,2)+'\n');
console.log('Built production home, Studio directory, seven bilingual tracks, full archive and legacy compatibility.');
