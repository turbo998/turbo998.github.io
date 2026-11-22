const fs = require('node:fs');
const path = require('node:path');
const {tracks, classifyScene, classifyPage} = require('./engineering-tracks.cjs');
const {buildKnowledgeAtlas} = require('./knowledge-atlas.cjs');
const {hasMotionDemo, motionDemoRoutes} = require('./motion-studies.cjs');
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
  'data-infra': ['Data & Infra Lab', '数据与基础设施实验室', 'Unify lakehouse data. Isolate execution. Optimize FinOps.', '贯通湖仓底座，隔离智能体执行，精算云成本。', 'Diamond Enterprise PoCs (TCL × Microsoft Fabric, Zava × Databricks × Fabric, and Aether Global Travel & Retail × Azure Databricks AI), OneLake Zero-Copy Mirroring, Fabric IQ vs Snowflake/BigQuery/Redshift, Agent Sandbox capacity, and Azure VM FinOps.', '涵盖 Diamond 三大企业级实战演示（TCL × Microsoft Fabric、Zava × Databricks × Fabric 与寰宇旅购国际旅行零售 × Databricks AI 智能运营闭环）、OneLake 与 Fabric IQ 跨云对比、智能体沙箱隔离容量及 Azure VM 成本治理。'],
  infra: ['AI Infra', 'AI 基础设施', 'Architect LLM serving, GPU clusters, and agent runtimes.', '构建高吞吐大模型推理、超节点互连与智能体托管底座。', 'Azure six-runtime hosting playbook, LLM engine & Prefill-Decode disaggregation sizers, FP8/NVFP4 MoE parallelism, KV cache tiering, token unit economics, and stateful failover.', '覆盖 Azure 六大智能体托管底座选型、推理引擎与 PD 分离定容、MoE 量化并行、长上下文 KV 分层卸载、单 Token 经济模型及控制面高可用容灾。'],
  commerce: ['Agentic Commerce', '智能体商务', 'Ground product discovery. Scope payment authority.', '让商品检索可信接地，让支付授权受控可审计。', 'Real-time WebIQ passage grounding, delegated payment credentials (Stripe SPT, Visa VIC, x402), step-up authentication, and enterprise checkout orchestration.', '围绕 WebIQ 实时商品接地、受限委托支付凭证（Stripe SPT、Visa VIC、x402）、阶梯强鉴权与可审计结账履约展开架构实践。'],
  voice: ['Voice', '语音', 'Design low-latency, auditable enterprise voice pipelines.', '设计低延迟、可打断、可合规留痕的企业语音智能体。', 'Cascaded ASR-LLM-TTS vs native speech-to-speech trade-offs, full-duplex barge-in, speaker diarization, and WebRTC / WebSocket / SIP contact-center ingress.', '系统拆解级联管线与原生端到端语音模型的选型边界、全双工语义判停、说话人分离，以及 WebRTC / WebSocket / SIP 呼叫中心接入网架构。'],
  benchmarks: ['Benchmarks & Harness', '测评与 Harness', 'Verify the harness and task contract before reading scores.', '先审视任务契约与评测协议，再解读模型与框架得分。', '21-model coding & calibrated routing archive (including Supplement 9 GPT-6.2 Sol 27-run live CAPI sweep), Production Agent Harness architectures (DSH × Claude Code × HVE, Discovery & CLIO, Co-Evolution), and sealed 7-Card 4:5 decks.', '涵盖 21 模型编码与校准路由评测（含增补报告 9 GPT-6.2 Sol 27 轮实时 CAPI 五档扫掠）、生产级 Agent Harness 架构深潜（DSH × Claude Code × HVE、Discovery & CLIO、模型协同演进）与标准化 7-Card 报告。'],
  animation: ['Animation', '动画', 'Controllable AI video, 3D worlds, and visual pipelines.', '构建结构受控的企业级 AI 视频、三维世界与视觉生产管线。', '6DoF camera control, neural video relighting, playable 3D world memory, joint audio-visual diffusion, C2PA brand guardrails, and CAD/BIM-to-photoreal workflows.', '聚焦 6DoF 精准运镜、神经视频重打光、三维空间记忆世界模型、音画同步生成、品牌合规 C2PA 网关与 CAD/BIM 建筑效果图受控管线。'],
  game: ['Gaming', '游戏', 'Interactive simulation loops and real-time systems.', '在实时交互仿真闭环中检验状态同步与系统工程。', 'Playable browser prototypes exploring fixed-timestep simulation, vehicle dynamics, swarm encounters, and responsive telemetry.', '通过可交互原型探索固定时间步长仿真、竞速物理控制、大规模群体行为编排与低延迟渲染反馈。'],
  security: ['AI Security', 'AI 安全', 'Enforce deterministic trust boundaries around every agent.', '为每一次智能体调用建立确定性的零信任安全边界。', 'Zero-trust capability brokers vs prompt guardrails, MCP supply-chain governance, Entra Agent ID OBO scoping, MicroVM isolation, RAG vector ACLs, and red-team evaluations.', '以确定性零信任能力网关替代脆弱的纯提示词护栏，覆盖 MCP 供应链钉扎、Entra Agent ID 最小权限委派、沙箱隔离、RAG 权限裁切与攻防演练。']
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
const diamondPages = [
  {path:'diamond.html',role:'article',title:'Diamond Enterprise Live Demo Center · TCL · Microsoft Fabric · Azure Databricks',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'zh-diamond.html',role:'article',title:'Diamond 企业级实战演示中心 · TCL 演示环境 · Microsoft Fabric · Azure Databricks',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/diamond-demos/tcl-fabric/index.en.html',role:'demo',title:'TCL Global Channel IQ × Microsoft Fabric · 6-Act Enterprise Cockpit',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'workshops/diamond-demos/tcl-fabric/index.html',role:'demo',title:'TCL 全球智慧渠道 × Microsoft Fabric · 六幕企业级实战驾驶舱',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/diamond-demos/databricks-fabric/index.en.html',role:'demo',title:'Zava Cold-Chain Retail × Azure Databricks & Microsoft Fabric · Zero-Copy Coexistence & Live Gateway Console',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'workshops/diamond-demos/databricks-fabric/index.html',role:'demo',title:'Zava 全渠道生鲜冷链 × Azure Databricks & Microsoft Fabric · 零拷贝双平台协同与实机免无痕直连台',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/diamond-demos/travel-retail-ops/index.en.html',role:'demo',title:'Aether Global Travel & Retail × Azure Databricks · AI Operations Closed-Loop Cockpit',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'workshops/diamond-demos/travel-retail-ops/index.html',role:'demo',title:'寰宇旅购 (Aether Global Travel & Retail) × Azure Databricks · 国际旅行零售 AI 运营闭环驾驶舱',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true}
];
const infraPages = ['benchmark-cards.en.html'].map(name=>({path:'workshops/azure-agent-infra/'+name,role:'report',title:'Azure Agent Sandbox & Runtime FinOps · '+name,tracks:['infra'],language:{declared:'en'},supplemental:true}));
const dataLabPages = ['index.html','live-demo.html','live-demo.en.html','benchmark-cards.html','benchmark-cards.en.html','demos/diamond-hub.html','demos/diamond-hub.en.html','demos/tcl-fabric/index.html','demos/tcl-fabric/index.en.html','demos/tcl-fabric/playbook.html','demos/tcl-fabric/playbook.en.html','demos/databricks-fabric/index.html','demos/databricks-fabric/index.en.html','demos/databricks-fabric/battlecard.html','demos/databricks-fabric/battlecard.en.html'].map(name=>({path:'workshops/data-lab/'+name,role:name.startsWith('benchmark')?'report':'demo',title:'Enterprise Data Lab · Microsoft Fabric IQ & Cross-Cloud Workbench · '+name,tracks:['data-infra'],language:{declared:name.includes('.en.')?'en':'zh-CN'},supplemental:true}));
const phase179Pages = ['llm-inference-engine-pd-sizer.html','llm-inference-engine-pd-sizer.en.html','llm-inference-engine-pd-selection-cards.html','llm-inference-engine-pd-selection-cards.zh.html','moe-quantization-parallelism-selection-cards.html','moe-quantization-parallelism-selection-cards.zh.html','ai-storage-checkpoint-kv-offload-selection-cards.html','ai-storage-checkpoint-kv-offload-selection-cards.zh.html','ai-infra-architect-workbench.html','aipc-kev-sft-q8-gguf-cards.html','mi300x-large-moe-bf16-mxfp4-cards.html','clio-industry-harness-cards.html'].map(name=>({path:'workshops/benchmarks/'+name,role:name.includes('cards')?'report':'demo',title:name.includes('moe-quantization-parallelism')?'AI Infra · Large Model & MoE Quantization (FP8/NVFP4) & Parallelism Selection · '+name:name.includes('llm-inference-engine-pd')?'AI Infra · LLM Inference Engine & PD Disaggregation Selection · '+name:name.includes('clio-industry-harness')?'Microsoft Discovery & CLIO · Enterprise R&D Harness 7-Card Report · '+name:name.includes('aipc-kev')?'Edge Routing SLM · Calibrated SFT & Q8_0 GGUF Evaluation · '+name:name.includes('mi300x')?'Azure AMD MI300X · Large Open-Weight MoE BF16 & MXFP4 Benchmark · '+name:'AI Infra · Enterprise Stack & Sandbox Architecture Deck · '+name,tracks:name.includes('aipc-kev')||name.includes('clio-industry-harness')?['benchmarks']:['infra'],language:{declared:name.endsWith('.en.html')||name==='llm-inference-engine-pd-selection-cards.html'||name==='moe-quantization-parallelism-selection-cards.html'||name==='ai-storage-checkpoint-kv-offload-selection-cards.html'?'en':name.endsWith('.zh.html')||name==='llm-inference-engine-pd-sizer.html'?'zh-CN':'und'},supplemental:true}));
const clioHarnessPages = [
  {path:'workshops/scientific-and-industry-harness-engineering/index.html',role:'demo',title:'Microsoft Discovery & CLIO · Industry Scenario Harness Engineering Workbench',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/scientific-and-industry-harness-engineering/index.en.html',role:'demo',title:'Microsoft Discovery & CLIO · Scientific & Industry Harness Engineering Workbench (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/scientific-and-industry-harness-engineering/cards.html',role:'report',title:'Microsoft Discovery & CLIO · Scientific & Industry Harness 7-Card Report (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/scientific-and-industry-harness-engineering/cards.zh.html',role:'report',title:'Microsoft Discovery 与 CLIO · 科学发现与行业 Harness 7-Card 报告 (中文)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true}
];
const harnessFrameworksPages = [
  {path:'workshops/harness-engineering-frameworks/index.html',role:'demo',title:'Mainstream Agent Harness Engineering Frameworks · DeepSeek DSH × Claude Code × Microsoft HVE Core Interactive Playground',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/harness-engineering-frameworks/index.en.html',role:'demo',title:'Mainstream Agent Harness Engineering Frameworks · DeepSeek DSH × Claude Code × Microsoft HVE Core Workbench (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/harness-engineering-frameworks/cards.html',role:'report',title:'Mainstream Agent Harness Engineering Frameworks · DSH × Claude Code × HVE Core 7-Card Report (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/harness-engineering-frameworks/cards.zh.html',role:'report',title:'主流 Agent Harness Engineering 框架与实现机制深度研究 · DSH × Claude Code × HVE Core 7-Card 报告 (中文)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true}
];
const harnessCoevolutionPages = [
  {path:'articles/agent-harness-coevolution.html',role:'article',title:'随模型升级持续演进 Agent Harness：120 个 Skills 审计、上下文悬崖修复与模型协同实战报告',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'articles/agent-harness-coevolution.en.html',role:'article',title:'Agent Harness x Frontier Model Co-Evolution: 120-Skill Audit, 12 KB Context Cliff Fix & Multi-Model Routing Report',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/agent-harness-coevolution/index.html',role:'demo',title:'Agent Harness × 前沿模型协同演进交互演示工作台 (Gemini 4 Carbon · GPT-6.2 Sol · Grok 4.7)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/agent-harness-coevolution/index.en.html',role:'demo',title:'Agent Harness x Frontier Model Co-Evolution Interactive Presenter Workbench (Gemini 4 Carbon · GPT-6.2 Sol · Grok 4.7)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/agent-harness-coevolution/cards.zh.html',role:'report',title:'Agent Harness × 前沿模型协同演进 · 120 个 Skills 审计 7-Card 视觉报告 (中文)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/agent-harness-coevolution/cards.html',role:'report',title:'Agent Harness x Frontier Model Co-Evolution · 120-Skill Audit 7-Card Report (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'articles/google-self-improving-harnesses.html',role:'article',title:'Google《Harnesses That Improve Themselves》深度研究：双环门控自进化 Agent Harness 统一架构与 SA 决策指南 (arXiv:2611.22299v1)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'articles/google-self-improving-harnesses.en.html',role:'article',title:'Google Harnesses That Improve Themselves: Dual-Loop Architecture, Gated Modular Evolution & SA Playbook (arXiv:2611.22299v1)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/google-self-improving-harnesses/index.html',role:'demo',title:'Google《Harnesses That Improve Themselves》4-Tab 自进化交互模拟工作台',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/google-self-improving-harnesses/index.en.html',role:'demo',title:'Google Harnesses That Improve Themselves · 4-Tab Self-Improving Harness Simulator',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/google-self-improving-harnesses/cards.zh.html',role:'report',title:'Google《Harnesses That Improve Themselves》SWE-bench Lite 7-Card 基准视觉报告 (中文)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/google-self-improving-harnesses/cards.html',role:'report',title:'Google Harnesses That Improve Themselves · SWE-bench Lite 7-Card Benchmark Deck (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true}
];
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
const worldMemPages = ['animation','generative-visual-lab'].flatMap(dir=>[
  {path:`${dir}/demos/worldmem-action-director/index.html`,role:'demo',title:'Action-Conditioned Playable World Model & Episodic Memory Director',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/demos/worldmem-action-director/test-report-cards.html`,role:'report',title:'Action-Conditioned Playable World Model & Episodic Memory · 7-Card Report',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/worldmem-action-world-study.html`,role:'article',title:'动作条件可玩世界模型与长时序三维情景记忆架构深度研究',tracks:['animation'],language:{declared:'zh-CN'},supplemental:true},
  {path:`${dir}/research/worldmem-action-world-study.en.html`,role:'article',title:'Action-Conditioned Playable World Models & Stateful 3D Episodic Memory Architecture Study',tracks:['animation'],language:{declared:'en'},supplemental:true}
]);
const nightlyVisualRegistry = path.join(root, 'animation/nightly-resources.json');
const nightlyVisualPages = fs.existsSync(nightlyVisualRegistry) ? JSON.parse(fs.readFileSync(nightlyVisualRegistry, 'utf8')) : [];
const gpt62SolPages = [
  {path:'workshops/benchmarks/gpt-6-2-sol-cards.html',role:'report',title:'Supplement 9: GPT-6.2 Sol Live Effort-Sweep, Calibrated Routing & 21-Model Frontier Benchmark (7-Card Deck)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/gpt-6-2-sol-cards.en.html',role:'report',title:'Supplement 9: GPT-6.2 Sol Live Effort-Sweep, Calibrated Routing & 21-Model Frontier Benchmark (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/gpt-6-2-sol-cards.zh-CN.html',role:'report',title:'增补报告 9：GPT-6.2 Sol 全档推理强度实测、校准路由与二十一模型前沿基准报告 (中文)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true}
];
const recentSupplementPages = [
  {path:'voice/voxcpm2-vs-azure-speech.html',role:'demo',title:'VoxCPM2 与企业语音模型对比：FSQ 声学架构与选型基准',tracks:['voice'],language:{declared:'zh-CN'},supplemental:true},
  {path:'voice/voxcpm2-vs-azure-speech.en.html',role:'demo',title:'VoxCPM2 vs. Azure Speech: Acoustic Architecture & TTS Benchmark',tracks:['voice'],language:{declared:'en'},supplemental:true},
  {path:'voice/voxcpm2-benchmark-cards.html',role:'report',title:'VoxCPM2 vs. Azure Speech: Acoustic Architecture & TTS Benchmark (7-Card Deck)',tracks:['voice','benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'voice/voxcpm2-benchmark-cards.en.html',role:'report',title:'VoxCPM2 vs. Azure Speech: Acoustic Architecture & TTS Benchmark (EN Deck)',tracks:['voice','benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'voice/voxcpm2-benchmark-cards.zh-CN.html',role:'report',title:'VoxCPM2 与企业语音模型对比：FSQ 声学架构与选型基准（7 卡报告）',tracks:['voice','benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/benchmarks/voxcpm2-vs-azure-speech-cards.html',role:'report',title:'VoxCPM2 vs. Azure Speech: Acoustic Architecture & TTS Benchmark (7-Card Deck)',tracks:['benchmarks','voice'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/voxcpm2-vs-azure-speech-cards.en.html',role:'report',title:'VoxCPM2 vs. Azure Speech: Acoustic Architecture & TTS Benchmark (EN Deck)',tracks:['benchmarks','voice'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/voxcpm2-vs-azure-speech-cards.zh-CN.html',role:'report',title:'VoxCPM2 与企业语音模型对比：FSQ 声学架构与选型基准（7 卡报告）',tracks:['benchmarks','voice'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/benchmarks/mai-image-2-7-cards.html',role:'report',title:'MAI-Image-2.7 Live Multimodal Generation & Commercial Image Editing Benchmark (7-Card Deck)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/mai-image-2-7-cards.en.html',role:'report',title:'MAI-Image-2.7 Live Multimodal Generation & Commercial Image Editing Benchmark (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/mai-image-2-7-cards.zh-CN.html',role:'report',title:'MAI-Image-2.7 实时多模态文生图与商业图像编辑基准评测报告 (中文)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/benchmarks/mai-image-2-7-commercial-edit-bench.html',role:'demo',title:'MAI-Image-2.7 商业图像编辑与双盲对比实验台 (中文)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/benchmarks/mai-image-2-7-commercial-edit-bench.en.html',role:'demo',title:'MAI-Image-2.7 Commercial Image Editing & Blind A/B Workbench (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/terminal-bench-4-1-cards.html',role:'report',title:'Terminal-Bench 4.1 Hardcore Agentic CLI & Systems Engineering Benchmark (7-Card Deck)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/terminal-bench-4-1-cards.en.html',role:'report',title:'Terminal-Bench 4.1 Hardcore Agentic CLI & Systems Engineering Benchmark (EN)',tracks:['benchmarks'],language:{declared:'en'},supplemental:true},
  {path:'workshops/benchmarks/terminal-bench-4-1-cards.zh-CN.html',role:'report',title:'Terminal-Bench 4.1 硬核终端智能体基准深度拆解与 15 模全景榜单 (中文)',tracks:['benchmarks'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/foundry-local/index.html',role:'demo',title:'Microsoft Foundry Local 端侧 AI 运行时架构与交互式选型工作台 (中文)',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'workshops/foundry-local/index.en.html',role:'demo',title:'Microsoft Foundry Local Edge AI Runtime Architecture & Interactive Sizer (EN)',tracks:['infra'],language:{declared:'en'},supplemental:true},
  {path:'docs/h5-academy/index.html',role:'demo',title:'AI Infra 推理与智算网络 H5 可视化精学馆 · 6 册双语交互工作台 (TTFT/TPOT/Goodput · GPU 三水位定容 · PD 分离 · TP/PP/DP/EP · RDMA/RoCEv2/IB/NVLink)',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5-academy/01-metrics.html',role:'demo',title:'AI Infra H5 精学馆 第 1 册：TTFT / TPOT / Goodput 推理指标与 SLA 权衡实验台',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5-academy/02-tpm-tps-capacity.html',role:'demo',title:'AI Infra H5 精学馆 第 2 册：TPM / TPS 容量漏斗与并发换算实验台',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5-academy/03-gpu-sizing.html',role:'demo',title:'AI Infra H5 精学馆 第 3 册：GPU 显存 / 带宽 / 算力三水位定容计算器',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5-academy/04-pd-disaggregation.html',role:'demo',title:'AI Infra H5 精学馆 第 4 册：Prefill-Decode (PD) 分离架构与 KV 传输仿真台',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5-academy/05-parallelism-acceleration.html',role:'demo',title:'AI Infra H5 精学馆 第 5 册：TP / PP / DP / EP 分布式并行与量化加速推演台',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5-academy/06-rdma-roce-nvlink.html',role:'demo',title:'AI Infra H5 精学馆 第 6 册：RDMA / RoCEv2 / InfiniBand / NVLink 智算网络选型台',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5/index.html',role:'demo',title:'AI Infra 交互式 H5 全景精学馆 · 56 套交互沙盘与 445 篇 SA 架构指南 (#001–#443)',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5/ai-infra-learning-hub.html',role:'demo',title:'AI Infra 全景 H5 学习中心 (中文)',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'docs/h5/ai-infra-learning-hub.en.html',role:'demo',title:'AI Infra Interactive H5 Learning Hub (EN)',tracks:['infra'],language:{declared:'en'},supplemental:true}
];
const motionPages = hasMotionDemo(root) ? [
  {path:motionDemoRoutes.en,role:'demo',title:'GPT-6.2 Motion Studies',tracks:['animation'],language:{declared:'en'}},
  {path:motionDemoRoutes['zh-CN'],role:'demo',title:'GPT-6.2 动势图鉴',tracks:['animation'],language:{declared:'zh-CN'}}
] : [];
const ftePages = [
  {path:'fte.html',role:'article',title:'Frontier Transformation Engineer (FTE) · Panorama, ~86-Hour Learning Path & Registration Hub',tracks:['general'],language:{declared:'en'},supplemental:true},
  {path:'zh-fte.html',role:'article',title:'Frontier Transformation Engineer (FTE) 全景介绍 · 86 小时学习路径、6 周 Sprint 与注册入口',tracks:['general'],language:{declared:'zh-CN'},supplemental:true}
];
const ignite2026Pages = [
  {path:'ignite-2026/index.html',role:'demo',title:'Microsoft Ignite 2026 解决方案架构师专栏 · 企业智能体全栈全景蓝图（00–06）',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'ignite-2026/index.en.html',role:'demo',title:'Microsoft Ignite 2026 Solution Architect Column · Enterprise Agentic AI Blueprint (00–06)',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'ignite-2026/01-copilot-entry.html',role:'demo',title:'01 统一智能体入口（M365 Copilot · Copilot Studio · Work IQ）| Ignite 2026 专栏',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'ignite-2026/01-copilot-entry.en.html',role:'demo',title:'01 Unified Agent Entry (M365 Copilot · Copilot Studio · Work IQ) | Ignite 2026 Column',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'ignite-2026/02-web-iq-context.html',role:'demo',title:'02 外部实时世界连接（Web Grounding · Web IQ · MCP 治理）| Ignite 2026 专栏',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'ignite-2026/02-web-iq-context.en.html',role:'demo',title:'02 Live World Context (Web Grounding · Web IQ · MCP Governance) | Ignite 2026 Column',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'ignite-2026/03-fabric-ontology.html',role:'demo',title:'03 企业数据与业务语义（Microsoft Fabric · OneLake · Fabric IQ 本体）| Ignite 2026 专栏',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'ignite-2026/03-fabric-ontology.en.html',role:'demo',title:'03 Enterprise Data Ontology (Microsoft Fabric · OneLake · Fabric IQ) | Ignite 2026 Column',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'ignite-2026/04-foundry-engineering.html',role:'demo',title:'04 智能体工程化运行时（Microsoft Foundry · Model Router · Agent Service）| Ignite 2026 专栏',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'ignite-2026/04-foundry-engineering.en.html',role:'demo',title:'04 Agent Runtime Engineering (Microsoft Foundry · Model Router · Agent Service) | Ignite 2026 Column',tracks:['data-infra'],language:{declared:'en'},supplemental:true},
  {path:'ignite-2026/05-ai-infra-optimization.html',role:'demo',title:'05 推理算力底座优化（PD 分离 · KV Cache · Maia 300 · RoCEv2/IB）| Ignite 2026 专栏',tracks:['infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'ignite-2026/05-ai-infra-optimization.en.html',role:'demo',title:'05 Inference Infra Optimization (PD Disaggregation · KV Cache · Maia 300) | Ignite 2026 Column',tracks:['infra'],language:{declared:'en'},supplemental:true},
  {path:'ignite-2026/06-agent-governance.html',role:'demo',title:'06 企业级安全与治理（Microsoft Agent 365 · Entra Agent ID · Purview）| Ignite 2026 专栏',tracks:['data-infra'],language:{declared:'zh-CN'},supplemental:true},
  {path:'ignite-2026/06-agent-governance.en.html',role:'demo',title:'06 Enterprise Agent Governance (Microsoft Agent 365 · Entra Agent ID · Purview) | Ignite 2026 Column',tracks:['data-infra'],language:{declared:'en'},supplemental:true}
];
const archivePages = [...inventory.content, ...translations, ...ftePages, ...ignite2026Pages, ...diamondPages, ...webiqPages, ...radarPages, ...infraPages, ...dataLabPages, ...phase179Pages, ...clioHarnessPages, ...harnessFrameworksPages, ...harnessCoevolutionPages, ...gpt62SolPages, ...recentSupplementPages, ...commerceTrendsPages, ...camera4dPages, ...audiovisualFoleyPages, ...physGaussianPages, ...neuralRelightPages, ...worldMemPages, ...nightlyVisualPages, ...motionPages].map(page => ({...page, tracks:[classifyPage(page), ...(page.tracks || []).filter(track => track !== classifyPage(page) && track !== 'infra')]}));
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
require('./build-profile-pages.cjs')({root,write});
require('./hub-pages.cjs')({root,inventory,readingRecords,archivePages,archiveNote,motionPages,topics,sceneNames,destination,readingDestination,sourceNote,write});
// Keep historical module hashes as aliases while adding the new source-derived track routes.
const routeData = Object.fromEntries(tracks.map(([track])=>[track,Object.fromEntries(inventory.scenes.filter(s=>classifyScene(s)===track || s.track===track).map(s=>[s.id,{en:destination(s,false).url,zh:destination(s,true).url,track:classifyScene(s)}]))]));
routeData['infra-lab'] = routeData['data-infra'];
write('assets/editorial/legacy-routes.js', `(() => {\n const routes=${JSON.stringify(routeData)};\n const script=document.currentScript; const base=new URL('../../',script.src); const q=new URLSearchParams(location.search); const zh=q.get('lang')!=='en'; const bits=location.hash.slice(1).split('/'); const track=routes[bits[0]]?bits[0]:(routes[q.get('track')]?q.get('track'):null);\n if(!track) return;\n let target='studio/'+(zh?'zh-':'')+(track==='infra-lab'?'data-infra':track)+'.html'; let hash='';\n if(bits[1]==='module' && routes[track][bits[2]]) target=routes[track][bits[2]][zh?'zh':'en'];\n else { const stage=bits[1]==='stage'?bits[2]:/^stage-[1-4]$/.test(bits[1]||'')?bits[1].slice(-1):null; if(stage) hash='#'+(['architecture','evaluation','demos','resources'][Number(stage)-1]||'architecture'); }\n const next=new URL(target.replace(/^\\//,''),base); if(q.has('theme'))next.searchParams.set('theme',q.get('theme')); if(q.has('lang'))next.searchParams.set('lang',q.get('lang')); if(hash) next.hash=hash; location.replace(next.href);\n})();\n`);
for (const [source,target] of [['site.css','editorial.css'],['site.js','editorial.js'],['theme-init.js','theme-init.js']]) write('design-preview/'+target,read('assets/editorial/'+source));
write('docs/redesign/production-routes.json',JSON.stringify({baseline:inventory.baseline,portalPages:['index.html','zh.html','diamond.html','zh-diamond.html','frontier-ai-studio.html',...fs.readdirSync(path.join(root,'studio')).filter(f=>f.endsWith('.html')).map(f=>'studio/'+f)],scenes:routeData,languagePolicy:'Source language and translation gaps are explicit; filenames alone are not translation evidence.'},null,2)+'\n');
console.log('Built production home, Hub directory, eight bilingual tracks, knowledge atlas, full archive and legacy compatibility.');
return {tracks, archivePages, routeData};
}
module.exports = buildSite;
module.exports.buildSite = buildSite;
if (require.main === module) buildSite();
