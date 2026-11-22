'use strict';
const { stage: s, entry } = require('./policy.cjs');

const PORTAL_TAIL = {
  'ai-security': entry(
    'security',
    'AI Security & Agent Defense Center · Threat Taxonomy, Policy Guardrails & Kill-Chain Containment',
    'AI 安全与智能体纵深防御中心 · 威胁建模、运行时策略门禁与攻击链熔断',
    [
      s('THREAT SURFACE', '智能体攻击面', 'Indirect Injection & Tool Abuse', '间接提示注入与工具越权调用', 'Untrusted RAG/web payloads, MCP server poisoning & cross-tenant token leakage', '不可信网页/文档注入、MCP 工具投毒与跨租户凭据泄露路径', 'enforced by', '进入输入与身份门禁'),
      s('POLICY GATES', '输入护栏与最小权限', 'Prompt Shields, Purview & OBO', '提示词护栏、Purview 与 OBO 身份', 'Content Safety shields, sensitivity-label DLP & Entra scoped On-Behalf-Of tokens', '内容安全注入检测、敏感度标签防泄漏与按工具收敛的 OBO 令牌', 'isolates runtime', '进入强隔离运行时'),
      s('SANDBOX & HITL', '沙箱隔离与高危审批', 'Egress Firewall & Human Approval', '网络出口白名单与高危动作审批', 'MicroVM sandbox isolation, dollar/record blast-radius caps & out-of-band confirmation', '微虚机执行隔离、金额/行数爆炸半径上限与带外人工确认机制', 'streams telemetry', '输出安全审计流'),
      s('SOC & RECOVERY', '检测响应与韧性回滚', 'Defender XDR, Sentinel & Circuit Break', 'Defender XDR、Sentinel 与自动熔断', '6-track posture scoring, anomaly kill-switch & immutable audit replay', '六赛道安全态势评估、异常行为秒级熔断与不可篡改审计回放')
    ],
    [
      ['Identity Is the Primary Perimeter', '身份与权限即核心边界', 'Never share service-principal super-tokens across agents; bind Entra OBO scopes per tool.', '严禁智能体共用高权限服务主体密钥，按单次工具调用绑定最小权限令牌。'],
      ['Deterministic Blast-Radius Caps', '确定性爆炸半径硬限额', 'Enforce deterministic policy limits on spend, egress domains, and destructive writes.', '在模型推理层之外实施金额上限、出口域名白名单与写操作审批硬门禁。'],
      ['Defense-in-Depth Verification', '攻防演练闭环核验', 'Pairs architecture playbooks with kill-chain simulations and Purview/Sentinel controls.', '将 DEFEND 治理框架与真实金融/供应链攻击链推演及 SOC 联动规则对齐。']
    ]
  ),
  'security-ai-landing-zone': entry(
    'security',
    'Security AI Landing Zone & Frontier SOC · Zero-Trust Network, Purview Governance & Sentinel Automation',
    '安全 AI 着陆区与 Frontier SOC · 零信任网络隔离、Purview 数据治理与 Sentinel 自动化响应',
    [
      s('LANDING ZONE', '网络与身份基线', 'Private Link, Hub-Spoke & Entra ID', 'Private Link 专网与 Entra 身份治理', 'VNet injection, Private Endpoints for Foundry/Storage/KeyVault & Conditional Access', 'Hub-Spoke 专网注入、Foundry/存储私有终结点与条件访问基线', 'governs data', '绑定数据合规平面'),
      s('DATA GOVERNANCE', '数据分类与防泄漏', 'Microsoft Purview for AI & DSPM', 'Purview AI 数据态势与敏感标签', 'Sensitivity label inheritance across OneLake/RAG indexes & inline DLP policy enforcement', 'OneLake 与向量索引敏感标签继承、训练/推理内联防泄漏拦截', 'protects runtime', '接入威胁防护层'),
      s('RUNTIME SHIELD', '模型与工作负载防护', 'Defender for Cloud AI Threat Protection', 'Defender 云原生 AI 实时威胁检测', 'Jailbreak/UPIA telemetry, container CVE posture & credential exposure alerts', '越狱与间接注入实时告警、容器镜像漏洞扫描与凭据暴露阻断', 'orchestrates SOC', '汇聚至智能体 SOC'),
      s('FRONTIER SOC', '安全运营与自动遏制', 'Microsoft Sentinel & Security Copilot', 'Sentinel 关联分析与自动化剧本', 'Cross-signal KQL correlation, automated token revocation & quarantine runbooks', '跨身份/网络/模型信号 KQL 关联分析、自动吊销令牌与隔离剧本')
    ],
    [
      ['Zero Public Data-Plane Exposure', '数据面零公网暴露', 'All model endpoints, vector stores, and key vaults communicate strictly over Private Link.', '模型终结点、向量库与密钥保管库全程通过私有链路通信，关闭公网直连。'],
      ['Label-Aware RAG & Egress', '敏感标签贯穿检索链路', 'Purview sensitivity labels propagate from source documents into retrieval ACL enforcement.', 'Purview 敏感度标签从源文档同步至检索访问控制，防止越权召回机密数据。'],
      ['Sub-Minute SOC Containment', '分钟级自动化隔离响应', 'Sentinel playbooks correlate Defender AI alerts with Entra sign-ins to revoke compromised sessions.', 'Sentinel 自动关联模型层异常告警与身份登录日志，秒级阻断受控会话。']
    ]
  ),
  'animation/index': entry(
    'animation',
    'Generative Visual & Multimodal Lab · Hybrid Pipelines, 4D/3DGS Physics & Enterprise AIGC Governance',
    '生成式视觉与多模态架构实验室 · 混合渲染管线、4D/3DGS 物理仿真与企业 AIGC 治理',
    [
      s('SCENE & BRAND SPEC', '场景契约与品牌约束', 'Design Tokens, CAD/3D & Storyboard', '设计令牌、几何真值与分镜契约', 'Figma tokens, Plücker camera rays, PBR/GLB proxies & SKU compliance rules', 'Figma 品牌规范、Plücker 相机射线、3D 几何代理与商品合规约束', 'routes to synthesis', '路由至混合生成层'),
      s('HYBRID SYNTHESIS', '生成与确定性合成', 'Diffusion + Remotion / Three.js / MPM', '扩散模型与可编程渲染协同', 'Wan/Flux/Veo clean-plates + Remotion vector overlays, IC-Light PBR & 3DGS/MPM physics', '视频/图像生成底板叠加 Remotion 矢量排版、神经重打光与高斯物理仿真', 'audits via critic', '执行多模态质检'),
      s('QA & PROVENANCE', '自动质检与溯源门禁', 'VLM/OCR/ArcFace Critic & C2PA Seal', '多模态质检网关与抗压缩水印', 'Zero glyph hallucination gate, identity lock, VideoSeal 128-bit & C2PA 2.1 soft-binding', '零错字 OCR 校验、人脸/商品一致性锁死、VideoSeal 盲水印与 C2PA 溯源', 'delivers at scale', '规模化交付与核算'),
      s('FINOPS & RUNTIME', '弹性算力与交互交付', 'Semantic Cache, AKS Warm Pool & WebGPU', '语义缓存、GPU 温池与端侧交付', 'Clean-plate amortization c₀/(1+u), KEDA/Dragonfly scaling & 60fps reduced-motion WebGL', '底板摊销降本、容器镜像秒级拉起与支持无障碍降级的 60fps 交互交付')
    ],
    [
      ['Hybrid Code + AI Beats Pure Pixel Regen', 'AI 底板 + 代码合成替代纯端到端重绘', 'Cache generative B-roll/clean-plates once and compose text, prices, and charts deterministically.', '生成式模型仅负责视觉底板，文字、价格与精确运动由确定性代码合成锁死。'],
      ['Physical & Camera Grounding', '三维几何与物理规律锚定', 'Uses Plücker ray conditioning, PBR relighting, and MPM/3DGS to eliminate multi-view drift.', '引入相机射线编码、PBR 材质解耦与连续介质物理约束消除多视角几何崩坏。'],
      ['Automated Critic & C2PA Compliance', '自动化质检门禁与双层合规水印', 'Enforces OCR/VLM/biometric gates plus compression-resilient watermarking before release.', '出库前强制执行视觉质检闭环与抗社媒重压缩盲水印及 C2PA 软绑定。']
    ]
  ),
  'voice/index': entry(
    'voice',
    'Enterprise AI Voice Architecture Guide · Cascaded vs Realtime Native Selection, Duplex UX & PoC Sizers',
    '企业级 AI 语音架构与选型指南 · 级联与端到端原生模型对比、全双工交互与场景定容',
    [
      s('AUDIO INGRESS', '音频采集与前端处理', 'WebRTC/SIP, VAD & Diarization', 'WebRTC/SIP 接入、VAD 与说话人分离', 'Acoustic echo cancellation, semantic turn detection, barge-in & multi-speaker diarization', '回声消除、语义断句检测、毫秒级打断响应与多说话人角色分离', 'routes by SLA', '按时延与合规路由'),
      s('ARCHITECTURE CHOICE', '双模语音推理架构', 'Cascaded ASR-LLM-TTS vs Native Speech', '级联流水线对比端到端实时语音模型', 'Azure Speech + LLM + HD TTS (auditability & lexicon lock) vs GPT-Realtime (<350ms emotion)', '级联架构（热词可控、文本合规留痕）对比原生语音（超低时延与副语言感知）', 'executes tools', '调用受控业务工具'),
      s('ENTERPRISE GROUNDING', '知识检索与业务动作', 'RAG, CRM/Order Tools & Guardrails', '低延迟检索、工单接口与安全护栏', 'Streaming chunked RAG, deterministic PII redaction, order/RMA APIs & human warm-transfer', '流式分块检索、通话敏感信息脱敏、订单接口调用与带上下文转人工坐席', 'benchmarks SLOs', '闭环评测时延与质量'),
      s('VOICE BENCHMARK', '端到端语音质量评测', 'TTFA, WER, Barge-In & Cost/Min', '首音时延、字错率、打断率与分钟成本', 'P50/P95 time-to-first-audio, multilingual pronunciation accuracy & per-minute TCO', '首包音频时延（TTFA）、多语种专有名词准确率与单分钟综合通话成本')
    ],
    [
      ['Cascaded vs Native Decision Boundary', '级联与端到端架构选型边界', 'Choose cascaded ASR→LLM→TTS for strict compliance/lexicons; choose native S2S for <400ms natural duplex.', '强合规审计与专有词典优先选流式级联；超低时延高拟真陪练优先选端到端语音。'],
      ['Sub-800ms Streaming Pipeline Design', '全链路流式重叠消减首音时延', 'Overlap partial ASR, sentence-boundary LLM streaming, and chunked WebSocket TTS synthesis.', '通过流式识别、首句切分生成与分块语音合成重叠管线将首音控制在 800ms 内。'],
      ['Graceful Human Escalation', '带状态无感转接人工坐席', 'Detects sentiment/confidence drops and hands off structured call summaries to human agents.', '实时监测情绪升级与低置信度意图，携带结构化摘要平滑移交人工客服。']
    ]
  ),
  'voice/case-study': entry(
    'voice',
    'Global Smart-Hardware 6-Locale Voice CS Case Study · 250K→750K Devices, Streaming Pipeline & ROI',
    '智能硬件出海 6 语种语音客服案例 · 25 万→75 万台设备扩容、流式级联架构与成本核算',
    [
      s('GLOBAL INGRESS', '多语种全渠道接入', 'PSTN/SIP & In-App WebRTC (6 Locales)', '跨国语音专线与应用内通话（6 语种）', 'EN · DE · FR · ES · JA · AR automatic language ID, custom BLE/firmware phrase lists', '英/德/法/西/日/阿自动语种识别与固件/蓝牙配对专有词表增强', 'streams to agent', '流式进入客服编排'),
      s('TRIAGE & RAG', '故障诊断与知识库', 'Device Telemetry + Firmware RAG', '设备诊断遥测联动多语种知识库', 'Correlates ring battery/sync logs with RMA warranty policy & troubleshooting decision trees', '联合指环电量/同步日志与多国退换货保修策略执行结构化排障问答', 'executes actions', '触发工单或转人工'),
      s('CRM & ESCALATION', '工单回写与人工协同', 'Zendesk/CRM RMA & Warm Transfer', '自动创建售后工单与无感人工移交', '70%+ L1 autonomous resolution; complex hardware faults transfer with translated transcript', '70%+ 一线常见咨询自动闭环，复杂硬件故障附双语工单摘要直转二线专家', 'delivers scale', '支撑三倍出货增长'),
      s('UNIT ECONOMICS', '规模化服务与成本收益', '3× Device Scale Without Linear Headcount', '出货量翻三倍下客服边际成本受控', '<800ms P90 voice response, 24/7 timezone coverage & predictable per-minute Azure Speech cost', 'P90 首音响应 <800ms，覆盖跨时区全天候响应并显著降低多语种坐席扩编成本')
    ],
    [
      ['Domain Phrase-List Calibration', '硬件专有术语声学增强', 'Custom speech phrase lists prevent ASR misrecognition on SKU codes, BLE states, and app terms.', '定制短语列表解决跨口音场景下型号编码、固件版本与蓝牙状态识别错误。'],
      ['Telemetry-Grounded Troubleshooting', '设备状态前置注入对话上下文', 'Injecting device sync/battery state before the first turn eliminates repetitive diagnostic questions.', '首轮对话前预载设备健康快照，大幅缩短用户口述故障与排障轮次。'],
      ['Non-Linear Global Support Scaling', '打破多语种人力线性扩张瓶颈', 'Supports 250K→750K shipped units across 6 languages while reserving humans for high-empathy cases.', '以统一云原生语音底座支撑多国出货量三倍增长，人工团队聚焦高价值疑难工单。']
    ]
  ),
  'game/index': entry(
    'game',
    'AI Gaming & Procedural Animation Lab · Fixed-Step 60Hz Simulation, Parametric Rigs & Deterministic Harness',
    'AI 游戏与程序化动画实验室 · 60Hz 固定步长物理循环、参数化骨骼曲面与确定性验证',
    [
      s('PROCEDURAL RIGS', '参数化几何与骨骼层', 'Parametric Surfaces & Articulated IK', '参数化车体曲面与多关节机甲状态机', '44 parametric vehicle bodies, 4-bar pop-up headlights & articulated mech recoil joints', '44 款参数化跑车曲面、四连杆跳灯机构与多关节机甲受击后坐力骨骼', 'steps physics', '进入固定步长物理'),
      s('60HZ SIMULATION', '确定性物理与状态循环', 'Fixed-Timestep dt=1/60s Arena Loop', 'dt=1/60s 固定步长物理与博弈循环', 'Zero-GC preallocated buffers, seeded RNG, collision/drift coupling & boss state machines', '零动态内存分配池、固定随机种子、制动俯仰/过弯侧倾与 Boss 行为树', 'renders AV', '驱动视听反馈层'),
      s('AV & ACCESSIBILITY', '实时渲染与合成音效', 'Canvas/WebGL + WebAudio Synthesis', '程序化视觉演出与纯代码合成音效', 'Anime impact frames, HUD telemetry, procedural engine/synth audio & reduced-motion mode', '冲击帧镜头演出、实时仪表盘、零外部音频合成音效与减弱动画无障碍降级', 'verifies probes', '输出自动化回归探针'),
      s('HARNESS PROBES', '自动化可验证探针', 'Headless Stepping & Invariant Checks', '无头确定性步进与状态不变量断言', 'Automated completion probes, frame-budget guards & zero-runtime-error CI verification', '自动化通关状态断言、帧耗时与分配护栏及无头浏览器零报错巡检')
    ],
    [
      ['Physics-Coupled Procedural Motion', '物理受力直接驱动骨骼姿态', 'Replaces static keyframe tweens with force-coupled suspension dive, body roll, and recoil.', '以真实加减速、转向离心力与碰撞冲量实时计算车体俯仰与机甲关节位移。'],
      ['Zero-Asset Self-Contained Engines', '零外部媒体依赖纯代码构建', 'Geometry, shaders, narrative scripts, and WebAudio soundtracks compile without external blobs.', '几何网格、材质、剧情脚本与引擎/合成器音轨全部由确定性代码生成。'],
      ['Deterministic Headless Regression', '60Hz 确定性步进可自动回归', 'Fixed-step simulation enables automated headless gameplay assertions beyond manual visual checks.', '固定时间步长与状态探针让复杂交互原型具备与后端服务同等的自动化回归能力。']
    ]
  ),
  'bilibili-explainers/index': entry(
    'animation',
    'Watercolor Technical Explainer Studio · Script Decomposition, p5.brush Ink-Wash Canvas & FFmpeg Mastering',
    '水彩手绘技术科普短片工作台 · 技术脚本拆解、p5.brush 水彩笔触渲染与音画母版合成',
    [
      s('SCRIPT & STORYBOARD', '概念拆解与分镜脚本', 'Three-Act Technical Storyboard', '三幕式技术叙事与分镜时间轴', 'Deconstructs Harness Engineering, LLM internals & systems concepts into timed visual metaphors', '将智能体工程、大模型机制等复杂系统拆解为具象视觉分镜与旁白节拍', 'drives brush engine', '驱动水彩笔触引擎'),
      s('INK & WATERCOLOR', '程序化手绘渲染层', 'p5.js + p5.brush Bleed & Hatching', 'p5.brush 水彩晕染与钢笔排线层', 'Seeded pigment bleed, textured cold-press paper grain, ink outlines & Clawd character rig', '固定随机种子的水彩颜料扩散、冷压纸纹理、钢笔勾线与角色动作绑定', 'captures frames', '执行确定性逐帧采集'),
      s('CONTACT SHEET QA', '分镜联版视觉质检', 'Headless Chrome Frame & Layout Audit', '无头浏览器分镜抽帧与字幕安全区校验', 'Verifies bilingual typography contrast, zero overlap & visual pacing on 16:9 contact sheets', '通过多帧联版检查双语字幕对比度、画面留白与视觉切换节奏', 'masters video', '封装高清音画成片'),
      s('AV MASTERING', '配音对齐与视频编码', 'SSML Voiceover Sync & FFmpeg 16:9 MP4', 'SSML 语音合成对齐与双语视频交付', 'Azure Speech TTS word-boundary sync, two-pass H.264/WebP encoding & inline chapter playback', '词级时间戳音画同步、高画质压缩编码与网页内联多剧集按需播放')
    ],
    [
      ['Deterministic Hand-Painted Aesthetics', '代码可控的手绘水彩质感', 'Uses seeded procedural brush strokes and paper shaders so visual edits remain git-diffable.', '通过固定种子控制水彩晕染与墨线抖动，兼顾手绘亲和力与代码级版本可复现性。'],
      ['Contact-Sheet First QA Loop', '抽帧联版前置消除排版瑕疵', 'Renders multi-scene contact sheets before full video encode to catch text clipping early.', '全量编码前先生成关键帧联版图，快速修正字幕越界、撞色与构图失衡。'],
      ['Audio-Driven Timeline Locking', '旁白词级时间戳驱动动画节拍', 'Locks visual reveals directly to synthesized narration boundaries rather than guessed delays.', '动画元素出现时机严格绑定配音时间戳，确保中英文解说与视觉焦点精准同步。']
    ]
  )
};

module.exports = { PORTAL_TAIL };
