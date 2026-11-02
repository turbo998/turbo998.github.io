const fs = require('node:fs');
const path = require('node:path');
const ui = require('./hub-layout.cjs');
module.exports = function build({root, inventory, readingRecords, archivePages, archiveNote, topics, sceneNames, destination, readingDestination, sourceNote, write}) {
  const catalog = require('./hub-resource-catalog.json');
  const t = (zh,en,cn) => zh ? cn : en;
  const native = (url,zh) => readingDestination(url,zh);
  const link = (label,url) => ({label,url});
  const stageLinks = (track,zh) => ui.sections.map(([id,en,cn])=>link([en,cn],`studio/${zh?'zh-':''}${track}.html#${id}`));
  const architectureScenes = new Set(['i-pill-1','c-pill-3','v-pill-2','a-pill-1','g-pill-1']);
  const category = scene => architectureScenes.has(scene.id) ? 'architecture' : /cards|benchmark-cards/.test(scene.raw) ? 'evaluation' : 'demos';
  const sceneCard = (scene,file,zh) => {
    const info = destination(scene,zh);
    const url = new URL(info.url,'https://site.invalid/');
    url.searchParams.set('lang',zh?'zh-CN':'en');
    const target = /^https?:/.test(info.url)?url.href:url.pathname+url.search+url.hash;
    return ui.card(file,zh,{id:`module-${scene.id}`,scene:scene.sceneId,number:scene.id.toUpperCase(),badge:category(scene).toUpperCase(),title:sceneNames[scene.id],finding:['Independent source · native page','独立来源 · 原生页面'],description:sourceNote(info,zh),url:target,links:[link(['Open original resource','打开原始资源'],target)]});
  };
  function extensions(file,zh) {
    return catalog.extensions.map((item,i)=>ui.card(file,zh,{...item,number:`0${8+i}`,url:item.links[0].url}));
  }
  function trackCards(file,zh) {
    return ui.tracks.map(([track,en,cn],i)=> {
      const count = inventory.scenes.filter(scene=>scene.track===track).length;
      return ui.card(file,zh,{id:track,number:`0${i+1}`,badge:['CORE TRACK','核心赛道'],title:[en,cn],url:`studio/${zh?'zh-':''}${track}.html`,finding:[`${count} indexed scenarios · 4 engineering stages`,`${count} 个索引场景 · 4 个工程阶段`],description:topics[track][zh?5:4],featured:track==='infra',links:stageLinks(track,zh)});
    }).concat(extensions(file,zh));
  }
  function latest(zh) {
    const suffix = zh?'':'.en';
    const lang = `?lang=${zh?'zh-CN':'en'}`;
    return [
      {id:'radar',track:'benchmarks',stages:['evaluation','demos','resources'],badge:'SIGNAL / SOURCE AUDIT',title:['GitHub AI Signal Radar','GitHub AI 信号雷达'],finding:['Hype / Facts / Signal · source-audited snapshot','Hype / Facts / Signal · 来源审计快照'],description:['Inspect repository activity and the underlying report. A published snapshot, not a guaranteed live feed.','查看仓库动态与原始报告；已发布快照不等于持续实时数据。'],links:[link(['Signal workbench','信号工作台'],`${zh?'zh-':''}github-radar.html`),link(['7-Card report','7-Card 报告'],`workshops/github-trending-radar/cards${suffix}.html`)]},
      {id:'security-lab',track:'security',stages:['architecture'],badge:'TRUST / DEFENSE',title:['AI Security · Binance exercise','AI 安全 · 币安演练'],finding:['$6B source scenario · 5 pillars / 20 scenarios','来源 $6B 场景 · 5 支柱 / 20 场景'],description:['A source-reported security case and offline defensive exercises; not a newly verified loss estimate or a live attack.','来源报告的安全案例与离线防御演练；并非本次重新核验的损失金额或实时攻击。'],links:[link(['Defensive playground','防御演练台'],`workshops/ai-security/index${suffix}.html`),link(['Evidence deck','证据卡组'],`workshops/ai-security/benchmark-cards${suffix}.html`)]},
      {id:'infra-cycle377',track:'infra',stages:['evaluation','demos'],badge:'INFRA / CAPACITY',title:['Azure Agent Infra · Cycle #377','Azure 智能体基础设施 · Cycle #377'],finding:['Cycle #377 · isolation, capacity, recovery','Cycle #377 · 隔离、容量、恢复'],description:['Open the original workbench and sealed report; source fixtures and language limitations remain visible.','打开原始工作台与封存报告，保留来源夹具及语种限制说明。'],links:[link(['Cycle workbench','周期工作台'],'workshops/azure-agent-infra/workbench-cycle-377.html'+lang),link(['7-Card report','7-Card 报告'],`workshops/azure-agent-infra/benchmark-cards${suffix}.html`)]},
      {id:'infra-phase179',track:'infra',stages:['architecture','evaluation','demos'],badge:'INFRA / ARCHITECTURE',title:['Azure Infra · Phase 180','Azure 基础设施 · Phase 180'],finding:['Phase 180 · 555 Qs · 550 suites · architectural workbench','Phase 180 · 555 题 · 550 套实验 · 架构决策工作台'],description:['Original source interface and report. Language links provide translated context, not a claim of full demo translation.','保留来源界面与报告；语言链接提供译文上下文，不宣称演示内部已经完整翻译。'],links:[link(['Architect workbench','架构师工作台'],'workshops/benchmarks/ai-infra-architect-workbench.html'+lang),link(['Phase 180 report','Phase 180 报告'],'workshops/benchmarks/ai-infra-phase180-benchmark-cards.html'),link(['Phase 179 report','Phase 179 报告'],'workshops/benchmarks/ai-infra-phase179-benchmark-cards.html')]},
      {id:'data-lab',track:'infra',stages:['architecture','evaluation','demos','resources'],badge:'DATA / FABRIC IQ',title:['Data Lab · Fabric IQ','Data Lab · Fabric IQ'],finding:['Four-cloud comparison · source fixtures','四云对比 · 来源夹具'],description:['Explore the Fabric IQ architecture, scenario sandbox and comparison report. No live cloud deployment is implied.','探索 Fabric IQ 架构、场景沙盒与对比报告，不代表已连接实时云部署。'],links:[link(['Data workbench','数据工作台'],'workshops/data-lab/index.html'+lang),link(['Scenario demo','场景演示'],`workshops/data-lab/live-demo${suffix}.html`),link(['7-Card report','7-Card 报告'],`workshops/data-lab/benchmark-cards${suffix}.html`)]},
      {id:'commerce1752',track:'commerce',stages:['demos'],badge:'COMMERCE / CHECKOUT',title:['Agentic Commerce · Stage 1753','智能体商务 · Stage 1753'],finding:['Stage 1753 · OCA / SFTP / UCP / Hook checkout','Stage 1753 · OCA / SFTP / UCP / Hook 结账守卫'],description:['Trace the boundaries from grounded discovery to trusted payment. Original results remain in their own report.','追踪从可信发现到可信支付的边界，原始结果保留在独立报告中。'],links:[link(['Commerce sandbox','商务沙盒'],`workshops/agentic-commerce/live-demo${suffix}.html`),link(['7-Card report','7-Card 报告'],`workshops/agentic-commerce/benchmark-cards${suffix}.html`)]},
      {id:'webiq',track:'commerce',stages:['architecture','evaluation','demos','resources'],badge:'COMMERCE / GROUNDING',title:['WebIQ · Azure integration','WebIQ · Azure 集成'],finding:['Offline sandbox · Azure backend not connected','离线沙盒 · 尚未连接 Azure 后端'],description:['Bilingual integration guidance and scenario comparisons. Vendor pricing and claims retain their unverified labels.','双语集成指南与场景对比，保留厂商价格及声明的未核验标记。'],links:[link(['Integration guide','集成指南'],`workshops/webiq-azure/index${suffix}.html`),link(['Sandbox','沙盒'],`workshops/webiq-azure/live-demo${suffix}.html`),link(['Comparison & caveats','对比与限制'],`workshops/webiq-azure/compare${suffix}.html`)]},
      {id:'stripe-trends',track:'commerce',stages:['architecture','resources'],badge:'COMMERCE / RESEARCH',title:['Stripe / Collison · Agentic Commerce','Stripe / Collison · 智能体商业'],finding:['7 source-reported commerce trends','7 项来源报告的商业趋势'],description:['A bilingual research article, not a new transaction benchmark. Follow its references and qualifications.','双语研究文章，不是新的交易基准；请结合原始引用与限定条件阅读。'],links:[link(['Read the seven trends','阅读七大趋势'],`workshops/agentic-commerce/stripe-collison-7-trends${suffix}.html`)]},
      {id:'voice356',track:'voice',stages:['demos'],badge:'VOICE / REALTIME',title:['Voice Agent · Stage 357','语音智能体 · Stage 357'],finding:['P705–P708 · Remote MCP & Hibiki S2S sandbox','P705–P708 · Remote MCP 与 Hibiki 同传沙盒'],description:['Inspect the newest interaction cases alongside the preserved voice deck and evaluation evidence.','结合保留的语音演示文稿与评测证据，检查最新交互案例。'],links:[link(['Duplex guard sandbox','双工守护沙盒'],`voice/index${suffix}.html#duplexGuardSimulatorCard`),link(['Architecture deck','架构演示文稿'],native('voice/deck.html',zh)),link(['Evaluation','测评'],native('voice/benchmark-cards.html',zh))]},
      {id:'camera4d',track:'animation',stages:['architecture','evaluation','demos','resources'],badge:'VISUAL / 4D CAMERA',title:['4D Gaussian & Plücker Camera Director','4D 高斯与 Plücker 相机导演'],finding:['6DoF camera rays · motion-brush controls','6DoF 相机射线 · 运动画笔控制'],description:['Explore controllable camera geometry and its research. The dedicated workbench and report retain their Chinese source interface.','探索可控相机几何及研究；专用工作台与报告保留原始中文界面。'],links:[link(['Camera director','相机导演台'],'animation/demos/camera-4d-director/index.html'),link(['7-Card report','7-Card 报告'],'animation/demos/camera-4d-director/test-report-cards.html'),link(['Architecture study','架构专著'],`animation/research/controllable-4d-video-camera-study${suffix}.html`)]},
      {id:'knowledge-explainer',track:'animation',stages:['resources'],badge:'VISUAL / EXPLAINER',title:['Knowledge Explainer Studio','知识讲解动画工作台'],finding:['Narrative → scene → explanatory animation','叙事 → 场景 → 知识动画'],description:['Inspect the original animation mechanisms and dedicated evaluation deck without embedding an entire page.','独立检查原始动画机制与专用评测卡组，不嵌入完整网页。'],links:[link(['Animation workbench','动画工作台'],'animation/demos/knowledge-explainer-studio/index.html'),link(['7-Card report','7-Card 报告'],'animation/demos/knowledge-explainer-studio/test-report-cards.html')]},
      {id:'maf',track:'benchmarks',stages:['architecture'],badge:'BENCHMARK / MULTI-AGENT',title:['MAF v1.0 · Framework workbench','MAF v1.0 · 框架工作台'],finding:['6-framework source comparison','6 框架来源对比'],description:['Read the protocol before the score. The source workbench and report preserve their original conditions.','先看协议，再看分数；来源工作台与报告保留原始测试条件。'],links:[link(['Framework workbench','框架工作台'],'workshops/maf-multi-agent-benchmark/index.html'),link(['7-Card report','7-Card 报告'],'workshops/benchmarks/maf-cards.html'),link(['Monograph','专著'],native('workshops/maf-multi-agent-benchmark/monograph.en.html',zh))]},
      {id:'coding-supplements',track:'benchmarks',stages:['evaluation','resources'],badge:'BENCHMARK / CODING',title:['20-model coding archive · Supplements 4–6','20 模型编码档案 · 增补 4–6'],finding:['Historical cohorts · inspect each denominator','历史模型批次 · 分别核对分母'],description:['The supplements are different source cohorts, not one normalized leaderboard or a fresh combined test.','各增补属于不同来源批次，不是统一归一化榜单，也不是本次重新合并测试。'],links:[link(['Supplement 4','增补 4'],'workshops/benchmarks/coding-17-sonnet55-sol-cards.html'),link(['Supplement 5','增补 5'],'workshops/benchmarks/sky-001-cards.html'),link(['Supplement 6','增补 6'],'workshops/benchmarks/gemini-4-carbon-cards.html')]},
      {id:'openrouter',track:'benchmarks',stages:['resources'],badge:'ROUTING / TELEMETRY',title:['OpenRouter · Model Routing & Telemetry','OpenRouter · 模型路由与遥测'],finding:['Ranking snapshot · refresh in the source','榜单快照 · 以来源刷新状态为准'],description:['Inspect model routing signals and their timestamps. Availability depends on the original data provider.','检查模型路由信号及其时间戳，可用性取决于原始数据提供方。'],links:[link(['Model telemetry','模型遥测'],`${zh?'zh-':''}openrouter.html`)]}
    ];
  }
  const uniquePages = [...new Map(archivePages.map(page=>[page.path,page])).values()];
  const labs = uniquePages.filter(page=>page.role==='demo').map(page=>page.path);
  const decks = uniquePages.filter(page=>page.role==='report' && [...fs.readFileSync(path.join(root,page.path),'utf8').matchAll(/class=["']([^"']*)["']/g)].filter(match=>match[1].split(/\s+/).includes('card')).length===7).map(page=>page.path);
  const pairs = [...new Set(readingRecords.filter(record=>record.language?.counterpart && (record.language.controlledProseTranslationVerified || record.language.fullTranslationVerified)).map(record=>[record.path,record.language.counterpart].sort().join('|')))];
  const skillLinks = catalog.extensions.find(item=>item.id==='sa-skills').links;
  const telemetry = [
    {value:catalog.repositories.length,label:['Repos','开源仓库'],scope:['Curated verified repositories','精选已核验仓库'],paths:catalog.repositories.map(repo=>repo.url)},
    {value:labs.length,label:['Live Labs','交互实验'],scope:['Indexed demo HTML editions; not live service checks','索引中的 Demo HTML 版本；非在线服务实测'],paths:labs},
    {value:decks.length,label:['7-Card Decks','7-Card 卡组'],scope:['Report editions with exactly seven .card panels','恰含七个 .card 面板的报告版本'],paths:decks},
    {value:pairs.length,label:['Bilingual Monographs & IaC','双语专著与 IaC'],scope:['Verified reading pairs; IaC is linked in Infra Lab','已核验阅读页对；IaC 见 Infra Lab 链接'],paths:pairs},
    {value:skillLinks.length,label:['SA Skills & Works','SA 技能与作品'],scope:['Curated skill entry points, not the whole library','精选技能入口，并非技能库总量'],paths:skillLinks.map(item=>item.url)}
  ];
  write('docs/redesign/hub-telemetry.json',JSON.stringify({sourceBaseline:catalog.sourceBaseline,definitions:'Static inventory counts; bilingual and mirrored demo/report editions count separately. No new model measurements or live-service availability assertions.',metrics:telemetry},null,2)+'\n');
  function hero(file,zh,home) {
    return `<section class="${home?'home-hero':'page-hero'}"><div><p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>QI CHEN / @TURBO998 · ${t(zh,'ENGINEERING IN PUBLIC','公开工程实践')}</p><h1>${home?t(zh,'Frontier systems.<br><em>Built to be explored.</em>','前沿系统，<br><em>从架构到可运行实践。</em>'):ui.BRAND}</h1><p class="lead">${home?t(zh,'Architecture, evidence and working software. My connected field notes across infrastructure, agents, evaluations and creative systems.','架构、证据与可运行的软件。Qi Chen 的工程现场笔记，连接基础设施、智能体、测评与创意系统。'):t(zh,'Frontier AI Studio, expanded: seven core tracks, Infra Lab deep dives and reusable SA Skill & HVE engineering accelerators.','由 Frontier AI Studio 扩展：七大技术主线、Infra Lab 深度专题，以及可复用的 SA Skill 与 HVE 工程加速器。')}</p><div class="actions"><a class="button primary" href="${home?ui.href(file,`studio/${zh?'zh-':''}index.html`):'#hub'}">${t(zh,'Explore Engineering Hub','探索工程枢纽')} ↗</a><a class="button" href="${home?'#workbenches':ui.href(file,`studio/${zh?'zh-':''}archive.html`)}">${home?t(zh,'Open a workbench','打开交互工作台'):t(zh,'Browse the source archive','浏览原始资源档案')} ↗</a></div></div><aside class="hero-callout"><p class="eyebrow">${t(zh,'THE ENGINEERING LOOP','工程路径')}</p><strong>${t(zh,'Understand.<br> Inspect.<br> Run. Build.','理解架构。<br>检查证据。<br>运行，构建。')}</strong><p>${t(zh,'One document. Native resource links. Dedicated workbenches with room to work.','一个文档滚动，原生资源直达。专用工作台在独立页面完整运行。')}</p><a class="text-link" href="${ui.href(file,`studio/${zh?'zh-':''}infra.html`)}">01 AI InfraLab ↗</a></aside></section>`;
  }
  function renderOverview(file,zh,home) {
    let body = home?'':ui.crumb(file,zh,t(zh,'Overview','总览'));
    body += hero(file,zh,home);
    if(home) body += `<section class="telemetry-strip" aria-label="${t(zh,'Catalog telemetry','目录遥测')}">${telemetry.map(metric=>`<div class="telemetry-cell"><strong>${metric.value}</strong><span>${ui.esc(ui.text(metric.label,zh))}</span><small>${ui.esc(ui.text(metric.scope,zh))}</small></div>`).join('')}</section>`;
    body += ui.section('hub','01 / ENGINEERING HUB',ui.BRAND,t(zh,'Seven disciplines + two engineering accelerators. Open a topic or go directly to its architecture, evaluation, demo and source.','七大主线 + 两大工程加速器。进入专题，或直达架构、测评、演示与来源。'),ui.grid(trackCards(file,zh),'hub-grid'));
    const featured = latest(zh).map((item,i)=>ui.card(file,zh,{...item,id:`featured-${item.id}`,number:`WB-${String(i+1).padStart(2,'0')}`,url:item.links[0].url}));
    body += ui.section('workbenches','02 / FLAGSHIP WORKBENCHES',t(zh,'Flagship Interactive Workbenches & 7-Card Decks','旗舰交互工作台与 7-Card 评测'),t(zh,'Curated source editions, with protocols and limitations one click away. No embedded full-page applications.','精选来源版本，一步抵达协议与适用局限；不嵌入完整应用页面。'),ui.grid(featured));
    body += ui.section('repositories','03 / REUSABLE ENGINEERING',t(zh,'Technical Asset & Repository Matrix','核心开源仓库与工程资产矩阵'),t(zh,'Verified source repositories and reusable modules. External destinations maintain their own availability and language.','已核验源码仓库与可复用模块。外部站点自行维护可用性及语种。'),ui.grid(catalog.repositories.map((repo,i)=>ui.card(file,zh,{...repo,id:`repo-${repo.id}`,number:`SRC-${String(i+1).padStart(2,'0')}`,badge:['SOURCE REPOSITORY','源码仓库'],links:[link(['Source repository','源码仓库'],repo.url),...repo.links]}))));
    const aliases = home?{hub:['architecture','studio-directory','pillars','explore'],workbenches:['writing','stage-2','research'],repositories:['matrix','projects']}:{hub:['directory']};
    for(const [target,ids] of Object.entries(aliases)) body=body.replace(`<section id="${target}"`,ids.map(id=>`<span class="legacy-anchor" id="${id}"></span>`).join('')+`<section id="${target}"`);
    if(home)body='<span id="top"></span>'+body;
    write(file,ui.shell(file,zh,home?t(zh,'Qi Chen · Architecture & Engineering','Qi Chen · 架构与工程'):ui.BRAND,body));
  }
  for(const zh of [false,true]) {
    renderOverview(zh?'zh.html':'index.html',zh,true);
    renderOverview(`studio/${zh?'zh-':''}index.html`,zh,false);
    for(const [track,copy] of Object.entries(topics)) {
      const file = `studio/${zh?'zh-':''}${track}.html`;
      const scenes = inventory.scenes.filter(scene=>scene.track===track);
      const collection = inventory.trackResources.filter(resource=>resource.track===track);
      let body = ui.crumb(file,zh,copy[zh?1:0])+`<section class="page-hero topic-hero"><p class="eyebrow">ENGINEERING HUB / ${track.toUpperCase()}</p><h1>${ui.esc(copy[zh?3:2])}</h1><p class="lead">${ui.esc(copy[zh?5:4])}</p><p class="source-note">${t(zh,'Translated reading editions preserve source findings. Dedicated demos and media keep their original interface and data; language limitations are disclosed at the destination.','阅读译文保留来源结论。专用演示与媒体保留原始界面和数据，目标页明确说明语种限制。')}</p></section><nav class="section-nav" aria-label="${t(zh,'On this page','本页目录')}">${ui.sections.map(([id,en,cn],i)=>`<a href="#${id}"><span>0${i+1}</span>${zh?cn:en}</a>`).join('')}</nav>`;
      for(const [i,[stage,en,cn]] of ui.sections.entries()) {
        let cards = scenes.filter(scene=>category(scene)===stage).map(scene=>sceneCard(scene,file,zh));
        cards.push(...latest(zh).filter(item=>item.track===track && item.stages.includes(stage)).map(item=>ui.card(file,zh,{...item,id:`${stage}-${item.id}`,number:stage.toUpperCase(),url:item.links[0].url})));
        if(stage==='resources') {
          const seen = new Set();
          cards.push(...collection.filter(resource=>{const url=resource.proposedNativeResources[zh?'zhCN':'en'].url;if(seen.has(url))return false;seen.add(url);return true;}).map((resource,n)=> {
            const target = native(resource.proposedNativeResources[zh?'zhCN':'en'].url.replace(/^\.\//,''),zh);
            const parsed = new URL(target,'https://site.invalid/');
            const name = parsed.pathname.split('/').filter(Boolean).slice(-2).join(' / ').replace(/\.html$/,'').replaceAll('-',' ');
            return ui.card(file,zh,{number:`REF-${n+1}`,badge:['SOURCE / REFERENCE','来源 / 资料'],title:zh?resource.label:name,finding:['Original technical source','原始技术来源'],description:['Follow the source for implementation, evidence and source-language details. External service access is not validated by this directory.','通过来源查看实现、证据与语种详情。本目录不代表已验证外部服务访问。'],url:target,links:[link(['Open resource','打开资料'],target)]});
          }));
          cards.push(ui.card(file,zh,{title:['Complete track archive','完整主题档案'],badge:'ARCHIVE',finding:[`${scenes.length} baseline indexed scenarios`,`${scenes.length} 个基线索引场景`],description:['All source editions and later additions remain discoverable.','所有来源版本与后续新增内容均保持可达。'],links:[link(['Browse all source editions','浏览全部来源版本'],`studio/${zh?'zh-':''}archive.html#${track}`)]}));
        }
        if(track==='infra' && ['architecture','resources'].includes(stage)) cards.push(...catalog.extensions.map(item=>ui.card(file,zh,{...item,id:`${stage}-${item.id}`,number:'LAB / SKILL',url:item.links[0].url})));
        if(!cards.length) cards=[ui.card(file,zh,{title:stage==='evaluation'?['Evaluation coverage','评测覆盖']:['Architecture & source context','架构与来源上下文'],badge:['COVERAGE NOTE','覆盖说明'],finding:stage==='evaluation'?['No separate report indexed','未索引独立报告']:['Start from the source collection','从来源资料集开始'],description:['The archive is not evidence of a new benchmark run. Follow the original documentation and stated limitations.','归档不代表执行了新的基准测试。请阅读原始文档及其中的适用局限。'],links:[link(['Open source directory','打开来源目录'],`studio/${zh?'zh-':''}archive.html#${track}`)]})];
        body += ui.section(stage,`0${i+1} / ${en.toUpperCase()}`,zh?cn:en,'',ui.grid(cards));
      }
      write(file,ui.shell(file,zh,copy[zh?1:0],body,{track}));
    }
    const file = `studio/${zh?'zh-':''}archive.html`;
    let body = ui.crumb(file,zh,t(zh,'Complete archive','完整档案'))+`<section class="page-hero"><p class="eyebrow">SOURCE DIRECTORY</p><h1>${t(zh,'Keep the original within reach.','让原始资料，始终可达。')}</h1><p class="lead">${t(zh,`${inventory.content.length} baseline HTML resources remain accessible, alongside verified reading editions and later publications. Duplicate exports and original source titles are preserved.`,`${inventory.content.length} 个基线 HTML 资源全部保留，另含已核验阅读版本与后续发布内容。保留重复导出与原始来源标题。`)}</p><p class="source-note">${t(zh,'A filename ending in .en does not establish an English translation. Read the language and provenance note on each source.','文件名以 .en 结尾并不代表已核验英文翻译，请结合各来源的语种及溯源说明。')}</p></section>`;
    for(const group of [...Object.keys(topics),'general']) {
      const pages=uniquePages.filter(page=>(page.tracks[0]||'general')===group);
      body+=ui.section(group,'ARCHIVE',group==='general'?t(zh,'General & reference','综合与参考'):topics[group][zh?1:0],'',ui.grid(pages.map((page,i)=>ui.card(file,zh,{title:page.title,number:`${i+1}`,badge:page.role.toUpperCase(),finding:archiveNote(page,zh),description:page.path,url:page.path,links:[link(['Open source edition','打开来源版本'],page.path)]}))));
    }
    write(file,ui.shell(file,zh,t(zh,'Complete archive','完整档案'),body));
  }
  let legacy = fs.readFileSync(path.join(root,'studio/zh-index.html'),'utf8').replace(/(href|src|data-counterpart)="([^"]+)"/g,(all,attr,value)=>/^(?:https?:|data:|#)/.test(value)?all:`${attr}="${path.posix.normalize('studio/'+value)}"`);
  legacy=legacy.replace('<script src="assets/editorial/theme-init.js"></script>','<script src="assets/editorial/legacy-routes.js"></script><script src="assets/editorial/theme-init.js"></script>');
  legacy=legacy.replace('</main>',`<details class="section legacy-scenes"><summary>旧场景直达 / Legacy scenario links</summary>${ui.grid(inventory.scenes.map(scene=>sceneCard(scene,'frontier-ai-studio.html',true)))}</details></main>`);
  write('frontier-ai-studio.html',legacy);
  const previews={'index.html':'index.html','zh.html':'zh-index.html','studio/index.html':'studio.html','studio/zh-index.html':'zh-studio.html','studio/infra.html':'infra.html','studio/zh-infra.html':'zh-infra.html'};
  for(const [source,target] of Object.entries(previews)) {
    let html=fs.readFileSync(path.join(root,source),'utf8').replace(/(href|src|data-counterpart)="([^"]+)"/g,(all,attr,value)=> {
      if(/^(?:https?:|data:|#|mailto:)/.test(value))return all;
      const url=new URL(value,'https://site.invalid/'+source);
      const file=url.pathname.slice(1);
      const dest=previews[file] || (file==='assets/editorial/site.css'?'editorial.css':file==='assets/editorial/site.js'?'editorial.js':file==='assets/editorial/theme-init.js'?'theme-init.js':'../'+file);
      return `${attr}="${dest}${url.search}${url.hash}"`;
    });
    html=html.replace('<meta charset="utf-8">','<meta charset="utf-8"><meta name="robots" content="noindex,nofollow">');
    write('design-preview/'+target,html);
  }
};
