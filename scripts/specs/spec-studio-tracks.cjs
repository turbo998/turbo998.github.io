'use strict';
const { stage: s, entry } = require('./policy.cjs');

const STUDIO_TRACK_SPECS = {
  'studio/index': entry(
    'infra',
    'Frontier Transformation Engineering Hub · 9-Track Architecture Index, Diamond PoCs & Evaluation Harness',
    '前沿转型工程枢纽 · 九大架构赛道索引、Diamond 标杆工作台与确定性评测底座',
    [
      s('DOMAIN TRACKS', '九大工程赛道', 'Data · Infra · Agents · Security · Media', '湖仓 · 算力 · 商务 · 语音 · 评测 · 视觉 · 安全', 'Curated architecture guides, sizing calculators & bilingual playbooks by domain', '按解决方案领域组织的双语选型指南、容量推演沙盘与架构手册', 'validates via', '经标杆沙盘验证'),
      s('DIAMOND POCS', '行业标杆沙盘', 'Retail · Cold-Chain · Travel · Voice · Silicon', '渠道全域 · 冷链湖仓 · 旅购 · 语音 · 智算选型', 'Runnable enterprise PoC workbenches with Entra OBO, Fabric IQ & Foundry workflows', '融合身份透传、零拷贝湖仓与多智能体编排的端到端行业验证台', 'measures with', '进入基准评测层'),
      s('EVAL HARNESS', '确定性评测体系', '7-Card Decks, Radar & Telemetry', '7-Card 报告、开源评估与路由遥测', '21-model coding/routing evaluations, Hype/Facts/Signal radar & OpenRouter FinOps', '多模型编码与路由实测卡组、开源仓库信号降噪与词元成本遥测', 'enforces quality', '通过自动化门禁'),
      s('CI GOVERNANCE', '静态质量门禁', '19-Suite Bilingual & Layout Audit', '19 项双语配对与多视口布局巡检', '1:1 EN/ZH static parity, zero broken fragments & 390/768/1440px browser verification', '中英文页面 1:1 映射、零断链锚点与三档视口无头浏览器实测')
    ],
    [
      ['Solution-Architect Navigation', '面向架构选型的分类检索', 'Routes CTOs and partner engineers directly from business constraints to runnable assets.', '支持客户技术负责人与合作伙伴工程师按业务瓶颈直达可复用资产。'],
      ['Evidence Over Slogans', '量化指标与可复算模型', 'Pairs architectural boundaries with P99 latency, GPU/CU sizing, and sealed test cohorts.', '所有赛道统一提供协议边界、P99 时延预算、容量公式与密封评测分母。'],
      ['Offline-Ready Static Delivery', '零后端依赖双语交付', 'Delivers interactive calculators, SVG diagrams, and search via pure static assets.', '计算器、矢量架构图与全文检索均采用纯静态编译，支持离线评审。']
    ]
  ),
  'studio/data-infra': entry(
    'data-infra',
    'Enterprise Data & Lakehouse Track · Fabric × Databricks Interop, OneLake Zero-Copy & Ontology Governance',
    '企业数据底座与湖仓一体赛道 · Fabric × Databricks 协同、OneLake 零拷贝与业务本体治理',
    [
      s('INGEST & MIRROR', '实时采集与镜像', 'CDC, Eventstreams & Open Mirroring', 'CDC 变更流、事件流与开放镜像', 'Sub-minute operational DB mirroring & IoT telemetry into Delta Parquet', '业务库分钟级零 ETL 镜像与冷链/门店事件流统一落盘开放表格式', 'unifies storage', '汇聚至统一存储'),
      s('UNIFIED LAKEHOUSE', '开放湖仓与计算协同', 'OneLake Shortcuts × Databricks Spark', 'OneLake 快捷方式与 Databricks 算力协同', 'Zero-copy Delta/Iceberg sharing across Spark ETL, Direct Lake BI & ML pipelines', '免重复搬迁共享同一份开放表，按负载分配重度特征工程与秒级报表', 'models semantics', '构建业务语义层'),
      s('SEMANTIC ONTOLOGY', '业务语义与血缘', 'Fabric IQ, Unity Catalog & Purview', 'Fabric IQ 本体、Unity Catalog 与血缘治理', 'Shared KPI definitions, row/column ACLs & Purview sensitivity-label inheritance', '统一业务实体关系与指标口径，跨引擎贯通行级权限与敏感标签', 'serves agents', '驱动数据智能体'),
      s('DATA AGENTS & WRITEBACK', '对话分析与业务回写', 'Data Agent + Translytical Actions', '受控自然语言问数与业务系统回写', 'Grounded NL2SQL/DAX queries with transactional replenishment & operational writeback', '基于语义层的零幻觉问数，联动审批护栏完成补货与调度指令回写')
    ],
    [
      ['Coexistence Over Rip-and-Replace', '双平台互补替代推倒重建', 'Combines Databricks heavy Spark/ML pipelines with Fabric Direct Lake and M365 reach.', '保留既有 Databricks 资产，通过零拷贝快捷方式叠加语义建模与全员消费。'],
      ['Semantic Layer Prevents Metric Drift', '语义本体消除多口径幻觉', 'Binds AI queries to governed measures and entity graphs rather than raw table schemas.', '将智能体查询收敛于受治理的度量值与实体关系，避免裸表 SQL 口径偏差。'],
      ['CU vs DBU Capacity FinOps', '容量单元与作业算力联动核算', 'Balances reserved Fabric CUs against ephemeral job clusters and autoscale Spark pools.', '统筹规划预留容量水位、无服务器批处理峰值与跨云出网流量成本。']
    ]
  ),
  'studio/infra': entry(
    'infra',
    'AI Infrastructure & Cluster Serving Track · GPU Roofline Sizing, PD Disaggregation & Lossless RDMA',
    'AI 算力底座与推理集群赛道 · GPU 显存/算力水位定容、PD 分离调度与无损智算网络',
    [
      s('SLO & TRAFFIC', '服务等级与并发建模', 'TTFT, TPOT/ITL & Goodput Bounds', '首字时延、解码步时与达标吞吐边界', 'P95/P99 latency gates, Little’s Law active concurrency & reasoning KV growth', '以达标 Goodput 替代裸峰值吞吐，显式计入长思维链与突发排队水位', 'sizes memory/compute', '核算显存与并行'),
      s('PARALLELISM & HBM', '分布式并行与量化', 'TP · PP · DP · EP & FP8/MXFP4', '张量/流水/专家并行与低比特量化', 'H200/GB200 NVL72/MI300X HBM stacks, GQA/MLA KV cache & MoE all-to-all bounds', '区分总参数存储水位与激活参数计算瓶颈，校核 HBM 带宽与通信开销', 'schedules serving', '进入推理调度层'),
      s('SERVING ENGINE', '推理引擎与 PD 解耦', 'vLLM / SGLang / Dynamo PD Split', '连续批处理、前缀缓存与 PD 分离', 'Separates compute-bound prefill from bandwidth-bound decode via RDMA KV transfer', '解耦算力密集型预填充与访存密集型解码，通过零拷贝传输交接 KV 缓存', 'transports over', '承载于无损网络'),
      s('AI FABRIC & FINOPS', '智算网络与弹性成本', 'NVLink, InfiniBand/RoCEv2 & PTU/AKS', '机内 NVLink、跨机无损网络与容量采购', 'Rail-optimized PFC/ECN congestion control, optical transceivers & PTU+PAYGO blending', '多轨拓扑拥塞控制、光模块功耗可靠性权衡及预留吞吐与弹性算力组合')
    ],
    [
      ['Three Distinct Sizing Ceilings', '存储、首字与解码三道水位独立校核', 'Fitting weights in HBM never guarantees meeting P99 TTFT or decode ITL under concurrency.', '显存装得下模型不代表高并发下首字与流式解码能同时满足 SLA。'],
      ['Quantify KV Handoff Before Splitting P/D', '先算清 KV 传输账再拆分 PD', 'PD disaggregation pays off only when inter-node RDMA bandwidth absorbs KV payload cleanly.', '仅当长输入干扰显著且跨机 RDMA 带宽足以消化 KV 交接开销时才拆 PD。'],
      ['Normalize Bit/Byte & Collective Scopes', '严格统一网络带宽与集合通信口径', 'Aligns GB/s vs Gb/s, unidirectional vs bidirectional, and NCCL busbw formulas.', '在对比机内互连与网卡速率前先统一字节/比特、单双向与集合通信有效带宽。']
    ]
  ),
  'studio/commerce': entry(
    'commerce',
    'Agentic Commerce & Retail AI Track · Intent Discovery, MCP/ACP/AP2 Protocols & Payment Guardrails',
    '智能体商务与零售渠道赛道 · 意图导购、MCP/ACP/AP2 协议栈与支付风控护栏',
    [
      s('INTENT & CATALOG', '多模态选品与商品库', 'Hybrid Search, SKU Graph & Pricing', '多模态检索、商品图谱与实时库存价格', 'Vector + lexical SKU recall, channel inventory sync & personalized bundle constraints', '融合视觉/语义召回与实时渠道库存价格校验，杜绝过期促销幻觉', 'negotiates via', '经商务协议交互'),
      s('COMMERCE PROTOCOLS', '开放智能体商务协议', 'MCP Tools · ACP Checkout · AP2 Mandates', 'MCP 工具契约 · ACP 结账 · AP2 授权令', 'Standardized catalog/cart state transitions & cryptographic spend-mandate verification', '标准化购物车状态机流转与带额度/商户约束的加密支付授权凭证', 'enforces risk gates', '进入风控与合规门禁'),
      s('RISK & HITL GATE', '交易风控与人工确认', 'Spend Caps, Fraud Scoring & Step-Up Auth', '额度硬上限、实时反欺诈与二次确认', '3-tier hot/warm/cold risk checks, step-up user consent & idempotent payment tokens', '毫秒级交易风控拦截、超额订单强制人工确认与幂等扣款令牌', 'writes back ERP', '闭环履约与退换货'),
      s('FULFILLMENT & CRM', '全渠道履约与企微导购', 'OMS/ERP Writeback, Split-Order & Loyalty', '拆单履约、门店导购协同与复购运营', 'Duty/tax compliance, duty-free airport pickup or omnichannel store associate assist', '跨境税费额度核验、机场提货/门店调拨拆单及导购端实时话术辅助')
    ],
    [
      ['Cryptographic Payment Boundaries', '确定性支付授权与幂等结算', 'Agents prepare carts and mandates; actual settlement enforces deterministic spend caps.', '智能体仅组装订单与授权请求，资金扣划由确定性网关校验额度与幂等键。'],
      ['Real-Time Inventory & Policy Grounding', '实时库存与税费规则硬校验', 'Grounds recommendations in live OMS stock, cold-chain shelf life, and duty-free quotas.', '选品推荐实时绑定库存水位、效期与免税限额，消除不可履约承诺。'],
      ['Associate + Consumer Dual Loop', '消费者自服务与导购助手双闭环', 'Connects consumer shopping agents with store/WeCom associate copilot workflows.', '打通消费者端导购结账与线下门店/企微导购端客户洞察协同。']
    ]
  ),
  'studio/voice': entry(
    'voice',
    'Realtime Multimodal & Voice AI Track · Duplex Speech Pipelines, Lexicon Governance & Global CS Scale',
    '实时语音与多模态交互赛道 · 低延迟级联与原生语音选型、专有词表与全球客服定容',
    [
      s('STREAMING INGRESS', '通话接入与声学前端', 'SIP/WebRTC, Neural VAD & Barge-In', '专线/WebRTC 接入、语义断句与打断', 'Echo cancellation, noise suppression, sub-200ms barge-in & multilingual language ID', '回声消除、背景降噪、200ms 内流式打断停播与多语种自动识别', 'routes to engine', '进入双模语音引擎'),
      s('SPEECH RUNTIME', '级联与原生双模架构', 'Streaming ASR-LLM-TTS vs Native S2S', '流式级联管线对比端到端实时语音', 'Balances custom phrase-list accuracy & text DLP against sub-400ms affective speech', '权衡专有名词识别/文本合规审计与超低延迟情感副语言交互体验', 'grounds on CRM', '联动知识库与工单'),
      s('TOOL & ESCALATION', '业务检索与人机协同', 'Chunked RAG, Device State & Warm Handoff', '流式知识召回、设备遥测与无感转人工', 'Preloads IoT/order context, masks PCI/PII audio & transfers structured call summaries', '预载设备状态减少追问，实时脱敏敏感语音并带摘要平滑移交人工坐席', 'audits SLOs', '监控端到端指标'),
      s('VOICE FINOPS', '首音时延与分钟成本', 'P90 TTFA <800ms, WER & $/Min TCO', 'P90 首音时延、字错率与单分钟成本', 'Concurrency sizing across timezones, codec bandwidth & tiered model routing', '跨时区并发线路定容、编解码带宽核算与高低阶语音模型混布降本')
    ],
    [
      ['Architecture Fit by Compliance Tier', '按合规与时延诉求切分语音栈', 'Use cascaded pipelines for auditable transcripts/lexicons and native S2S for rapid coaching.', '强监管留痕与硬件术语场景选流式级联，高自然度实时陪练选原生端到端。'],
      ['Pipeline Overlap Cuts TTFA', '分段流式重叠压缩首包等待', 'Streams partial ASR into clause-level LLM generation and WebSocket chunked TTS.', '识别、生成与合成按短句流式流水线重叠，避免整句串行累加延迟。'],
      ['Context-Rich Human Handoff', '情绪感知与带上下文人工兜底', 'Triggers escalation on repeated intent failure or frustration without making users repeat.', '识别重复失败或焦躁信号后携双语结构化摘要转接专家，免除用户重复陈述。']
    ]
  ),
  'studio/benchmarks': entry(
    'benchmarks',
    'Benchmarks & Evaluation Track · Reproducible Harnesses, 7-Card Visual Decks & Perturbation Audits',
    '基准评测与选型验证赛道 · 可复现评测框架、7-Card 标准报告与抗扰动一致性检验',
    [
      s('TASK & COHORT', '任务集与模型队列', 'Coding · Routing · Multi-Agent · Infra', '编码修复 · 路由决策 · 多智能体 · 推理底座', 'Terminal-Bench 4.1, 21-model coding cohorts, MAF v1.0 & MoE/NPU hardware tracks', '覆盖仓库级缺陷修复、置信度门控路由、多智能体框架与软硬件定容评测', 'runs sealed harness', '执行统一沙箱契约'),
      s('SEALED HARNESS', '隔离执行与确定性评分', 'Sandboxed Runs & Deterministic Verifiers', '容器隔离运行与非主观校验器', 'Unit-test Pass@1, schema parsers, ECE calibration & explicit unreviewed-cell tracking', '采用测试集通过率、结构化契约与校准误差评分，严禁缺失值归零伪造', 'tests robustness', '施加扰动压力测试'),
      s('ROBUSTNESS AUDIT', '稳健性与延迟分布', 'Option Reversal & Batch Latency Bars', '选项顺序反转与并发分位时延测试', 'Measures prompt/order sensitivity (pts shift), P50/P99 latency & token efficiency', '量化选项反转漂移幅度、批处理与单并发延迟曲线及单题词元开销', 'distills decisions', '输出选型结论卡'),
      s('7-CARD DECKS', '标准化选型交付物', '4:5 Visual Cards & Interactive Sizers', '7-Card 决策卡组与帕累托工作台', 'Good-fit vs Not-for boundaries, provenance labels (measured vs synthetic) & TCO fit', '明确适用场景与禁用边界，严格标注实测、转述或教学推演数据来源')
    ],
    [
      ['Headline-as-Quantitative-Finding', '以量化发现替代泛化口号', 'Every benchmark report states exact pass rates, latency deltas, and cohort denominators.', '每份报告直接呈现通过率、时延差值与完整样本分母，拒绝模糊定性。'],
      ['Robustness Beyond Single-Run Accuracy', '超越单次跑分的抗扰动检验', 'Tests option-order reversal, retry loops, and confidence thresholds before production sign-off.', '上线前同步验证选项顺序翻转、多轮重试收敛与人工升级阈值稳定性。'],
      ['Strict Provenance Transparency', '数据来源与复现状态全透明', 'Separates measured runs, anonymized reported data, and formula-driven sizing models.', '清晰区分独立实测、脱敏报告数据与确定性公式推演，杜绝坐标杜撰。']
    ]
  ),
  'studio/animation': entry(
    'animation',
    'Generative Visual & Multimodal Track · Programmable Synthesis, 4D/PBR Grounding & C2PA Provenance',
    '生成式视觉与多模态赛道 · 可编程混合渲染、三维物理锚定与企业内容合规管线',
    [
      s('CREATIVE CONTRACT', '结构化视觉契约', 'Brand Tokens, Camera Rays & 3D Proxies', '品牌规范令牌、相机轨迹与三维几何代理', 'JSON storyboards, Plücker ray paths, CAD/GLB meshes & regulatory copy locks', '以结构化分镜、精确相机位姿与商品几何模型约束生成边界', 'synthesizes frames', '进入混合合成管线'),
      s('HYBRID PIPELINE', '扩散底板与代码合成', 'Video/Image Models + Remotion / WebGL', '生成式底板叠加确定性矢量与物理引擎', 'Flux/Wan/Veo clean-plates + Remotion typography, IC-Light PBR & 3DGS/MPM simulation', '分离感性背景生成与理性文字/价格/图表代码合成，结合重打光与物理仿真', 'validates quality', '执行多模态质检'),
      s('CRITIC & WATERMARK', '视觉质检与内容溯源', 'VLM/OCR Critic, VideoSeal & C2PA 2.1', '零错字质检门禁、盲水印与软绑定溯源', 'Automated OCR/biometric/physics checks, 128-bit watermark & C2PA manifest signing', '自动拦截文字乱码与几何穿模，嵌入抗二次压缩盲水印与数字内容凭证', 'optimizes delivery', '规模化算力交付'),
      s('RENDER FINOPS', '底板摊销与边缘交付', 'Clean-Plate Cache, GPU Pool & 60fps Web', '语义缓存摊销、弹性 GPU 池与交互渲染', 'Amortizes base generation across locales & ships accessible 60fps WebGL/MP4 assets', '一次底板生成多语种复用摊销成本，输出支持减弱动画模式的交互页面与成片')
    ],
    [
      ['Decouple Pixels From Precision Copy', '像素生成与精确排版分层解耦', 'Never rely on diffusion pixels for SKU prices, legal disclaimers, or data charts.', '价格、合规免责声明与数据图表一律走确定性代码图层，彻底消除错字幻觉。'],
      ['3D & Physics Conditioning', '几何先验与物理仿真抑制闪烁', 'Uses camera-pose conditioning, relighting, and continuum mechanics for multi-shot consistency.', '借力相机射线控制、法线重打光与物理连续介质约束保障跨镜头一致性。'],
      ['Enterprise Provenance & Cost Control', '自动化合规签章与单元成本治理', 'Combines C2PA/VideoSeal provenance with clean-plate caching for predictable $/asset.', '将内容真实性溯源与高频多语言底板复用纳入企业级批量生产流水线。']
    ]
  ),
  'studio/game': entry(
    'game',
    'Interactive Simulation & Game Engineering Track · 60Hz Deterministic Loops, Procedural Rigs & CI Probes',
    '交互仿真与游戏工程赛道 · 60Hz 固定步长循环、参数化骨骼曲面与无头自动化验证',
    [
      s('PARAMETRIC ASSETS', '纯代码几何与状态机', 'Procedural Meshes, IK Rigs & Scripts', '参数化车体机甲网格与分支叙事脚本', '44 procedural sports-car bodies, articulated mech joints & bilingual branching dialogue', '零外部大体积模型依赖，以参数方程构建车体曲面、骨骼约束与双语剧情树', 'drives fixed loop', '输入固定步长循环'),
      s('DETERMINISTIC CORE', '固定步长物理与博弈', 'Fixed dt=1/60s Physics & Arena AI', 'dt=1/60s 确定性物理步进与对手策略', 'Preallocated typed arrays (zero GC spikes), seeded RNG & force-coupled suspension/recoil', '预分配内存池消除垃圾回收卡顿，固定随机种子支撑可复现受力与碰撞响应', 'renders viewport', '驱动实时视听管线'),
      s('VIEWPORT & AUDIO', '实时渲染与合成音轨', 'WebGL/Canvas Shaders + WebAudio DSP', '多视角镜头演出与程序化合成音效', 'Impact frames, telemetry HUD, procedural engine/FM synth audio & reduced-motion support', '实时渲染尾迹与仪表遥测，纯代码合成引擎声浪与配乐并兼容减弱动态设置', 'asserts via harness', '接入无头回归探针'),
      s('HEADLESS VERIFY', '可观测状态与回归门禁', 'Deterministic Step Probes & Layout Audit', '无头状态机步进断言与多视口巡检', 'Exposes snapshot APIs for automated Playwright/Puppeteer verification across viewports', '暴露确定性状态快照接口，支持无头浏览器自动断言帧预算、状态流转与零报错')
    ],
    [
      ['Deterministic Simulation Discipline', '确定性循环保障可复现调试', 'Decouples fixed 60Hz simulation ticks from variable display refresh rates.', '将固定频率物理逻辑步进与显示器刷新率解耦，确保任意机器行为一致。'],
      ['Zero-GC Hot-Loop Engineering', '热路径零动态内存分配设计', 'Reuses typed buffers in per-frame update loops to prevent frame-time jitter.', '帧循环内复用预分配数组与对象池，规避垃圾回收引发的微卡顿。'],
      ['Testable Interactive Systems', '复杂视觉交互纳入自动化测试', 'Treats WebGL/Canvas applications as verifiable state machines under CI.', '通过脚本化步进与状态探针验证交互原型，告别纯人工肉眼点测。']
    ]
  ),
  'studio/security': entry(
    'security',
    'AI Security, Governance & Landing Zone Track · Threat Modeling, Runtime Guardrails & Agentic SOC',
    'AI 安全治理与企业着陆区赛道 · 智能体威胁建模、运行时策略门禁与自动化安全运营',
    [
      s('THREAT TAXONOMY', '攻击面与链路拆解', 'Indirect Injection, Tool & Memory Risks', '间接提示注入、工具投毒与记忆污染', 'OWASP Agentic Top 10 vectors across RAG documents, MCP servers & cross-agent delegation', '系统识别非授信文档注入、外部工具越权、跨智能体信任传递与凭据窃取风险', 'hardens landing zone', '加固云原生着陆区'),
      s('ZERO-TRUST BASE', '专网隔离与最小权限', 'Private Link, Entra Agent ID & Purview', '专网终结点、独立智能体身份与数据防泄漏', 'VNet-injected Foundry/AKS, per-tool Entra OBO scopes & sensitivity-label ACL inheritance', '全链路私有网络接入、按工具收敛的委托令牌与检索阶段敏感度标签强过滤', 'gates execution', '实施运行时门禁'),
      s('RUNTIME GUARDRAILS', '内容护栏与高危熔断', 'Prompt Shields, Sandboxes & HITL Caps', '注入检测护栏、沙箱隔离与外发审批', 'Inline UPIA/jailbreak blocking, egress-locked MicroVMs & deterministic spend/write approval', '内联拦截越狱与间接注入，网络白名单微虚机隔离代码执行并强制高危写操作审批', 'correlates in SOC', '联动安全运营中心'),
      s('AGENTIC SOC', '威胁狩猎与自动响应', 'Defender AI, Sentinel & Kill-Switch', 'Defender 威胁告警、Sentinel 与秒级吊销', 'Cross-plane KQL correlation, automated token revocation & forensic trajectory replay', '跨身份、数据与模型调用链关联检测，异常时自动吊销令牌并留存完整取证轨迹')
    ],
    [
      ['Prompts Are Never Security Boundaries', '系统提示词绝非安全边界', 'Enforce authorization, egress allowlists, and spend limits in deterministic code outside LLMs.', '权限校验、网络出口控制与交易限额必须在模型外的确定性策略引擎中强制执行。'],
      ['Scoped Ephemeral Identity Per Action', '单次动作级最小权限身份', 'Replaces static API keys with short-lived Entra ID / OBO tokens auditable per tool call.', '以短生命周期最小范围身份替代共享静态密钥，实现工具级细粒度审计。'],
      ['Closed-Loop Detection & Containment', '预防—检测—熔断闭环演练', 'Validates controls against multi-stage financial and enterprise kill-chain scenarios.', '结合真实攻击链沙盘检验各层护栏拦截率、爆炸半径收敛与 SOC 剧本联动。']
    ]
  ),
  'studio/sa-skills': entry(
    'sa-skills',
    'Frontier Transformation & SA Methodology Track · Architecture Trade-Offs, Reusable Skills & Executive Alignment',
    '前沿转型与架构师方法论赛道 · 架构权衡决策、可复用技能资产与高管价值对齐',
    [
      s('PROBLEM FRAMING', '业务约束与指标转化', 'CTO / Partner Discovery & SLO Contracts', '高管诉求拆解与量化架构契约', 'Translates business KPIs, compliance mandates & TCO ceilings into P99/RPO/accuracy targets', '将模糊业务目标、监管红线与预算上限转化为可核验的延迟、吞吐与准确率契约', 'designs architecture', '输出分层参考架构'),
      s('REFERENCE DESIGN', '控制面与数据面设计', 'Explicit Planes, Failure Modes & Matrix', '控制/数据面解耦、失效边界与选型矩阵', 'Documents Option A/B/C trade-offs, fallback paths & non-fit anti-patterns clearly', '明确界定身份策略控制面与高吞吐数据面，给出多方案权衡矩阵与不适用反模式', 'proves via PoC', '构建可运行验证台'),
      s('EXECUTABLE PROOF', '原型实证与基准复核', 'Runnable Workbenches & Sealed Harnesses', '可交互架构工作台与密封基准评测', 'Validates critical bottlenecks within days using deterministic sizers and live sandboxes', '聚焦核心风险点快速交付可复算定容沙盘、端到端演示与确定性基准测试报告', 'scales via skills', '沉淀标准化技能包'),
      s('REUSABLE SKILLS', '工程资产化与规模复制', 'Modular IaC, Eval Suites & Agent Skills', '模块化部署模板、评测套件与技能治理', 'Packages verified patterns into versioned repositories, Bicep modules & progressive skills', '将验证通过的架构模式固化为版本化代码库、自动化脚本与渐进加载技能包')
    ],
    [
      ['Trade-Off Rigor Over Vendor Hype', '客观权衡取代单向产品宣讲', 'Earns CTO trust by stating both where an architecture excels and where simpler options win.', '同时讲清技术方案的优势区间、失效悬崖与更简替代方案，建立架构公信力。'],
      ['Working Code Accelerates Decisions', '可运行实证缩短架构评审周期', 'Replaces static slideware debates with interactive sizing models and runnable reference PoCs.', '用可调参容量模型与真实协议联调原型替代纯胶片争论，加速立项共识。'],
      ['Compound Engineering Leverage', '每次攻关沉淀可复用工程复利', 'Turns one-off customer PoCs into reusable harnesses, checklists, and automation assets.', '把单次客户攻关转化为跨行业可复用的评测底座、核对清单与自动化资产。']
    ]
  ),
  'workshops/diamond-demos/contoso-fabric/fabric-studio': entry(
    'data-infra',
    'Contoso Retail × Microsoft Fabric Lakehouse Studio · OneLake Medallion, Direct Lake & Copilot Analytics',
    'Contoso 零售 × Microsoft Fabric 湖仓工作台 · OneLake 奖牌分层、Direct Lake 与智能问数',
    [
      s('BRONZE / SILVER', '多源入湖与清洗层', 'POS, E-Commerce & Inventory Ingestion', '门店 POS、电商订单与库存入湖清洗', 'Dataflows Gen2 & Spark notebooks standardizing raw retail transactions into OneLake Delta', '统一采集门店与线上交易流水，经增量去重与维度对齐写入开放 Delta 表', 'models Gold layer', '构建黄金语义层'),
      s('GOLD & DIRECT LAKE', '黄金模型与零导入分析', 'Star Schema & Direct Lake Semantic Model', '星型模型与 Direct Lake 零拷贝语义层', 'Reads OneLake Parquet directly into memory without scheduled import refresh lag', '内存直读湖仓开放文件，省去传统定时导入刷新延迟与双份存储开销', 'grounds Copilot', '支撑自然语言洞察'),
      s('FABRIC DATA AGENT', '受控问数与归因诊断', 'Governed DAX/SQL Copilot & Anomaly Drill', '基于度量值的自然语言问数与异动归因', 'Queries verified margin, stockout & regional promo metrics under row-level security', '严格遵循行级安全权限与受治理度量值解答毛利、缺货率与区域促销表现', 'triggers action', '触发补货业务动作'),
      s('OPERATIONAL LOOP', '业务预警与调拨协同', 'Data Activator Alerts & Store Action', '阈值实时预警与门店补货调拨闭环', 'Detects regional stockout risk and routes replenishment tasks to merchandising teams', '实时捕获安全库存跌穿信号并推送门店调拨与采购补货执行建议')
    ],
    [
      ['Single OneLake Copy Across Engines', '一份开放存储贯通批流与报表', 'Spark engineering, SQL analytics, and Power BI share identical Delta tables in OneLake.', '数据工程、SQL 分析与商业智能共享同一份底层数据，消除孤岛复制。'],
      ['Direct Lake Speed Without Import Tax', '兼顾导入级交互速度与实时性', 'Delivers interactive BI slicing immediately after lakehouse commits complete.', '湖仓增量提交后即可秒级交互切片分析，免除全量刷新窗口等待。'],
      ['RLS-Enforced Conversational BI', '权限穿透的自然语言分析', 'Preserves regional manager row-level security boundaries across all AI-generated queries.', '所有自然语言生成查询自动继承既有区域经理行级权限控制。']
    ]
  ),
  'workshops/diamond-demos/contoso-fabric/playbook': entry(
    'data-infra',
    'Contoso × Microsoft Fabric Architecture Walkthrough · Dual IT/Business Persona Flow & PoC Acceptance',
    'Contoso × Microsoft Fabric 架构演示手册 · 数据平台与业务决策双视角推演及 PoC 验收标准',
    [
      s('DISCOVERY CONTEXT', '现状痛点与目标对齐', 'Siloed Marts & Refresh Lag Assessment', '多烟囱数据集市与T+1报表延迟诊断', 'Maps ETL duplication, metric inconsistency & BI refresh bottlenecks across retail channels', '梳理零售多渠道数据重复搬运、指标口径冲突与报表刷新滞后瓶颈', 'demonstrates platform', '切入平台技术验证'),
      s('DATA ARCHITECT VIEW', '数据架构师验证路径', 'OneLake Shortcuts, Spark & Lineage', '零拷贝快捷方式、Spark 作业与血缘治理', 'Walks through cross-cloud shortcuts, medallion notebooks, Git CI/CD & Purview governance', '验证跨云零拷贝挂载、奖牌层代码开发、Git 版本发布与敏感数据血缘追踪', 'aligns business view', '衔接业务负责人视角'),
      s('BUSINESS LEADER VIEW', '业务决策者验证路径', 'Direct Lake KPIs & Governed Data Agent', '实时经营看板与受控对话式经营诊断', 'Validates self-service margin drill-down, promo elasticity check & stockout alerting', '验证区域毛利下钻、促销弹性复盘与缺货实时预警的端到端响应闭环', 'defines PoC gate', '锁定 PoC 验收门禁'),
      s('POC EXIT CRITERIA', '容量核算与上线准入', 'Fabric CU Sizing, RLS Test & Cutover Plan', 'Fabric 容量定容、权限核验与割接路线', 'Defines 2-week PoC scope, concurrency CU budget, security sign-off & phased migration', '明确两周最小可行验证范围、并发容量预算、行级权限压测与分批演进计划')
    ],
    [
      ['Dual-Persona Architecture Alignment', '技术底座与业务收益同屏印证', 'Connects IT governance/TCO concerns directly to merchandising decision velocity.', '将底层零拷贝存储治理与业务端实时补货决策效率在同一链路中闭环验证。'],
      ['De-identified Offline Reproducibility', '全脱敏离线可复现实验包', 'Runs deterministically with synthetic retail datasets and zero live tenant credentials.', '内置合成零售经营数据集，无需连接生产租户凭据即可完整复演各环节。'],
      ['Actionable 2-Week PoC Scoping', '量化两周概念验证准出标准', 'Provides concrete table counts, query latency targets, and security test cases.', '给出明确的数据表范围、查询响应目标与权限测试用例，便于客户快速立项。']
    ]
  )
};

module.exports = { STUDIO_TRACK_SPECS };
