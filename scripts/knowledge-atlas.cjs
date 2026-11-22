const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {tracks, contextTracks, classifyPath} = require('./engineering-tracks.cjs');
const esc = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const local = (value, zh) => Array.isArray(value) ? value[zh ? 1 : 0] : typeof value === 'object' && value ? value[zh ? 'zh' : 'en'] : value;
const node = (role, title, detail, relation) => ({role, title, detail, relation});
// Topology and box dimensions are conceptual layout, never performance coordinates.
const blueprints = {
  'data-infra': [
    node(['STREAM INGEST', '实时流式摄取'], ['Enterprise sources & ingestion','企业源系统与实时摄取'], ['ERP / POS / IoT · Eventhouse KQL · Change feeds','ERP / POS / 航运流 · Eventhouse KQL · 变更捕获'], ['grounds open lakehouse','汇入开放湖仓底座']),
    node(['OPEN LAKEHOUSE', '开放湖仓底座'], ['OneLake & Databricks Mirroring','OneLake 与 Databricks 零拷贝互通'], ['Shared Delta Parquet · Unity Catalog · 0-DBU Direct Lake','共享 Delta Parquet · Unity Catalog · 0 DBU Direct Lake'], ['binds business ontology','绑定业务语义本体']),
    node(['SEMANTIC ONTOLOGY', '业务语义本体'], ['Fabric IQ & Cross-Cloud Selection','Fabric IQ 与跨云平台选型'], ['Consumer Electronics & Zava reference architectures · vs Snowflake / BigQuery','消费电子全球运营与 Zava 参考架构 · 对比 Snowflake / BigQuery'], ['isolates agent execution','进入隔离执行沙箱']),
    node(['ISOLATED SANDBOX', '隔离执行沙箱'], ['Isolated agent sandboxes','企业级智能体隔离沙箱'], ['ACA Dynamic Sessions · AKS Kata · E2B VMSS','ACA 动态会话 · AKS Kata · E2B 弹性沙箱'], ['governs unit economics','量化容量与成本治理']),
    node(['CAPACITY FINOPS', '容量与成本治理'], ['Cloud & Session FinOps','云基础设施与单会话 FinOps'], ['F-SKU capacity pooling · VM modernization · TCO audit','F-SKU 容量池化 · VM 跨代升级 · TCO 定量核验'], null)
  ],
  infra: [
    node(['WORKLOAD SLA', '负载契约与分级'], ['Workload SLA & architecture tiers','业务 SLA 与六层架构选型'], ['TTFT · TPOT · compliance · state isolation boundaries','首字时延 · 解码吞吐 · 合规隔离 · 状态边界'], ['maps to hosting runtime','映射托管运行时']),
    node(['HOSTING RUNTIME', '托管计算底座'], ['Azure agent hosting spectrum','Azure 智能体六类托管底座'], ['Foundry · ACA · AKS · Functions · Sandboxes','Foundry · ACA · AKS · Functions · 隔离沙箱'], ['schedules GPU & KV','调度算力与显存层']),
    node(['SERVING & KV TIER', '推理并行与缓存'], ['LLM serving, MoE & KV storage','推理引擎、MoE 并行与 KV 分层'], ['Prefill-Decode split · FP8/NVFP4 · tiered KV cache','PD 分离 · FP8/NVFP4 量化 · 长上下文 KV 卸载'], ['governs token economics','决定百万 Token 成本']),
    node(['TOKEN FINOPS', '单元经济模型'], ['Serving unit economics','推理吞吐与单元经济模型'], ['Batch utilization · prefix-cache hit · $/1M-token TCO','批处理利用率 · 前缀缓存命中 · 百万 Token 成本'], ['enforces failover SLA','配置故障自愈机制']),
    node(['HA & FAILOVER', '高可用与故障恢复'], ['Control-plane resilience','控制面租约与故障恢复'], ['Lease fencing · split-brain guard · async checkpointing','租约隔离防脑裂 · 异步 Checkpoint · 秒级恢复'], null)
  ],
  commerce: [
    node(['CATALOG DISCOVERY', '目录与库存核验'], ['Buyer intent & grounded discovery','采购意图与实时商品发现'], ['WebIQ freshness · SKU schema · live inventory state','WebIQ 时效核验 · SKU 契约 · 实时库存状态'], ['quotes merchant offer','生成商户确定性报价']),
    node(['MERCHANT QUOTE', '报价与履约约束'], ['Offer & merchant constraints','商户报价与履约规则校验'], ['Price lock · tax/duty · SLA · provenance signature','价格锁定 · 税费关税 · 履约时效 · 来源签名'], ['enforces mandate gate','触发授权额度门禁']),
    node(['MANDATE POLICY', '授权委托门禁'], ['Agent authorization boundary','智能体委托授权与额度门禁'], ['Spending cap · human confirmation · scoped tool token','消费上限 · 超限人工审批 · 最小权限令牌'], ['executes SPT checkout','签发受限支付令牌']),
    node(['SCOPED PAYMENT', '受限支付结算'], ['Trusted checkout & payment','可信结账与幂等支付执行'], ['Stripe SPT / AP2 · merchant lock · idempotency key','Stripe SPT / AP2 · 商户绑定 · 幂等防重键'], ['emits signed receipt','沉淀不可篡改回执']),
    node(['RECEIPT & AUDIT', '回执对账与评测'], ['Receipt, dispute & evaluation','交易回执、争议取证与评测'], ['Signed audit ledger · offline fixtures != live settlement','签名审计账本 · 离线评测夹具不混同真实清算'], null)
  ],
  voice: [
    node(['DUPLEX CAPTURE', '全双工音频采集'], ['Audio input & speaker context','音频流采集与说话人分离'], ['24kHz PCM · neural VAD · overlap diarization','24kHz PCM · 神经端点检测 · 重叠说话人分离'], ['streams audio frames','流式输入语音模型']),
    node(['SPEECH REASONING', '低延迟语音理解'], ['Realtime speech understanding','实时语音理解与对话状态机'], ['Audio-native / cascaded ASR · turn state tracking','原生语音模型 / 级联 ASR · 多轮状态追踪'], ['invokes grounded tools','异步调用受控工具']),
    node(['GROUNDED TOOLS', '企业知识与工具'], ['Agent, tools & enterprise data','智能体工具调用与企业检索'], ['Hybrid RAG · schema-validated actions · RBAC','混合检索 · Schema 受控工具调用 · 权限隔离'], ['synthesizes duplex TTS','流式合成低抖动语音']),
    node(['BARGE-IN CONTROL', '打断取消与播报'], ['Speech output & duplex control','流式语音播报与毫秒级打断'], ['Chunked TTS · instant barge-in cancel · jitter buffer','分块 TTS · 语音打断即时清空队列 · 抖动缓冲'], ['records latency trace','采集端到端延迟轨迹']),
    node(['LATENCY TELEMETRY', '声学与延迟核验'], ['Conversation quality & evidence','端到端时延分位数与质量核验'], ['P50/P95 turn latency · WER · interruption recovery','P50/P95 轮次延迟 · 词错率 · 打断恢复准确率'], null)
  ],
  benchmarks: [
    node(['SEALED WORKLOAD', '封存评测集定义'], ['Question & sealed workload','评测目标与封存基准数据集'], ['Cohort · exact denominator · task stratification','参评模型批次 · 精确分母 · 任务难度分层'], ['locks harness contract','锁定执行容器契约']),
    node(['HARNESS CONTRACT', '确定性执行容器'], ['Harness & execution contract','评测容器与受控执行契约'], ['Pinned prompt · tool sandbox · timeout · N repeats','固定提示词 · 隔离工具沙箱 · 超时与重复次数'], ['runs deterministic check','输出轨迹与自动判分']),
    node(['VERIFIER LEDGER', '校验器与证据账本'], ['Raw outputs & deterministic checks','原始轨迹采集与确定性校验器'], ['Exit-code / AST / schema verifier · missing-value log','退出码 / AST / Schema 校验 · 缺失值显式台账'], ['computes perturbation','汇总精度稳健性与延迟']),
    node(['ROBUSTNESS & SLA', '扰动稳健性与时延'], ['Scores, robustness & latency','准确率、顺序扰动与延迟分位数'], ['Option-order swap delta · P50/P95 latency · unit cost','选项反转波动 · P50/P95 时延 · 单任务成本'], ['publishes 7-card deck','生成可溯源评测报告']),
    node(['PROVENANCE GATE', '来源标注与复现'], ['Report & reproducibility','7-Card 报告与数据来源标注'], ['Measured vs reported provenance · reproduction script','实测/引用来源区分 · 独立复现脚本与边界说明'], null)
  ],
  animation: [
    node(['SCENE SPECIFICATION', '场景几何与相机契约'], ['Scene & constraint specification','场景约束与物理/几何输入契约'], ['CAD / DensePose / Plücker camera rays · mask lock','CAD / DensePose / Plücker 相机射线 · 掩码锁定'], ['builds spatial state','构建三维与时序表征']),
    node(['SPATIAL SOLVER', '三维表征与物理求解'], ['Geometry & physical solver','三维表征、物理与光照求解层'], ['3DGS / MPM continuum / Snell optics · identity lock','3DGS / MPM 连续介质 / 斯涅尔光学 · 身份保持'], ['schedules keyframes','驱动受控时序生成']),
    node(['TEMPORAL SYNTHESIS', '时序控制与局部修复'], ['Temporal synthesis & VLM gate','受控时序生成与局部校验门禁'], ['Causal KV / Closed-GOP cache · surgical VLM critic','因果 KV / Closed-GOP 复用 · 局部 VLM 质检修复'], ['renders WebGL/Canvas','输出实时交互帧']),
    node(['REALTIME RUNTIME', '浏览器实时渲染'], ['WebGL2 / Canvas playback','浏览器端实时渲染与降级回退'], ['60fps WebGL2 / SVG · prefers-reduced-motion fallback','60fps WebGL2 / SVG · 减弱动画无障碍回退'], ['audits quality & TCO','核验几何精度与成本']),
    node(['FIDELITY & FINOPS', '精度与单资产成本'], ['Fidelity & unit-cost verification','几何/光学保真度与单资产成本核验'], ['Sub-millimeter / SSIM checks · GPU $/asset TCO','亚毫米几何 / 色差校验 · 单资产算力成本核算'], null)
  ],
  game: [
    node(['INPUT & INTENT', '输入采样与意图映射'], ['Player input & intent mapping','玩家输入采样与指令映射'], ['Keyboard / pointer · deterministic frame input queue','键盘 / 指针事件 · 确定性帧输入队列'], ['steps fixed-dt sim','推进固定步长仿真']),
    node(['FIXED-STEP ECS', '确定性物理与状态'], ['Fixed-step world simulation','固定步长物理与世界状态仿真'], ['60Hz fixed dt · spatial hash collision · rigid/swarm','60Hz 固定步长 · 空间哈希碰撞 · 刚体与群体运动'], ['evaluates combat/AI','解算规则与智能体博弈']),
    node(['RULES & AI DIRECTOR', '规则判定与对手策略'], ['Encounter rules & utility AI','遭遇战规则、状态机与效用 AI'], ['Hitbox frame windows · difficulty pacing · FSM','判定框帧窗口 · 难度节奏调控 · 有限状态机'], ['renders audiovisual HUD','驱动画面与程序化音效']),
    node(['WEBGL & WEB AUDIO', '渲染与程序化混音'], ['Rendering, HUD & procedural audio','实时渲染、HUD 与 Web Audio 混音'], ['Canvas/WebGL2 · procedural synth · reduced motion','Canvas/WebGL2 · 程序化音效合成 · 无障碍降级'], ['captures frame telemetry','记录帧耗时与状态回放']),
    node(['PLAYABLE TELEMETRY', '帧率预算与可玩核验'], ['Frame-budget & loop verification','帧预算监控与可玩闭环核验'], ['<= 16.6ms frame time · deterministic seed replay','<= 16.6ms 帧预算 · 确定性随机种子回放验证'], null)
  ],
  security: [
    node(['TRUST BOUNDARY', '资产与信任边界'], ['Assets & trust boundaries','核心资产盘点与信任边界划分'], ['Entra Agent ID · data classification · network perimeter','Entra Agent ID · 数据密级分类 · 网络隔离边界'], ['maps threat vectors','枚举不可信攻击面']),
    node(['THREAT SURFACE', '攻击面与注入路径'], ['Untrusted input & attack paths','不可信输入与跨工具攻击路径'], ['Indirect prompt injection · MCP poisoning · exfiltration','间接提示注入 · MCP 工具投毒 · 敏感数据外泄'], ['enforces policy gate','实施最小权限拦截']),
    node(['POLICY & SANDBOX', '策略门禁与微隔离'], ['Least privilege & explicit approval','最小权限沙箱与高危操作审批'], ['Content Safety Shields · Kata sandbox · HITL approval','提示盾过滤 · Kata 微隔离沙箱 · 高危人工审批'], ['emits SIEM audit log','输出可审计遥测事件']),
    node(['DETECTION & CONTAIN', '异常检测与自动熔断'], ['Detection, containment & recovery','实时异常检测、会话熔断与回滚'], ['Defender / Sentinel SIEM · token revocation · kill-switch','Defender / Sentinel 联动 · 令牌吊销 · 自动熔断'], ['validates red-team','闭环红队攻防演练']),
    node(['RED-TEAM EVIDENCE', '攻防演练与合规核验'], ['Adversarial exercise & evidence','离线红队演练与 OWASP 合规核验'], ['OWASP Agentic Top 10 coverage · ASR regression gate','OWASP Agentic Top 10 映射 · 攻击成功率门禁'], null)
  ]
};
const trackTakeaways = {
  'data-infra': [
    [['Zero-Copy Open Format', '零拷贝开放湖仓格式'], ['Standardize on Delta Parquet across OneLake and Databricks Mirroring to eliminate duplicate ETL pipelines.', '基于 Delta Parquet 打通 OneLake 与 Databricks 零拷贝互通，消除跨平台重复 ETL 搬运。']],
    [['Ontology-Grounded Agents', '语义本体约束智能体'], ['Bind Copilot and data agents to Fabric IQ / Unity Catalog governed metrics instead of raw ad-hoc SQL.', '将智能体绑定至 Fabric IQ 与 Unity Catalog 认证度量，杜绝裸表自由生成 SQL 口径漂移。']],
    [['Pooled Capacity FinOps', '容量池化与沙箱治理'], ['Combine F-SKU smoothing, Direct Lake 0-DBU BI, and isolated sandboxes to cap burst TCO.', '结合 F-SKU 削峰池化、Direct Lake 零计算成本报表与隔离执行沙箱控制总体 TCO。']]
  ],
  infra: [
    [['Workload-Matched Hosting', '按负载契约匹配底座'], ['Select Foundry, ACA, AKS, or microVM sandboxes by statefulness, cold-start SLA, and tenant isolation.', '依据状态持久性、冷启动时延与多租户隔离等级在 Foundry、ACA、AKS 与沙箱间选型。']],
    [['Disaggregated PD & KV Tiering', 'PD 分离与分层 KV 缓存'], ['Separate compute-bound Prefill from bandwidth-bound Decode and offload cold prefix KV to NVMe.', '解耦算力密集型 Prefill 与显存带宽受限型 Decode，并将长上下文前缀 KV 卸载至高速存储。']],
    [['Fenced Stateful Failover', '租约防脑裂与秒级自愈'], ['Enforce monotonic lease fencing and async state checkpoints so worker crashes recover without split-brain.', '通过单调递增租约令牌与异步状态快照，确保节点故障切换零脑裂、零重复执行。']]
  ],
  commerce: [
    [['Catalog & Price Grounding', '实时商品与价格验真'], ['Verify live merchant inventory, tax/shipping rules, and SKU identity before presenting any agentic offer.', '在生成导购报价前强制校验实时库存、税费履约条件与标准商品编码。']],
    [['Cryptographic Mandate Caps', '加密委托额度硬门禁'], ['Bind buyer intent to merchant-, SKU-, and amount-scoped tokens with explicit human step-up above limits.', '将采购授权绑定至指定商户、SKU 与金额上限，超限交易强制触发人工二次确认。']],
    [['Idempotent Audit Ledger', '幂等清算与可追溯回执'], ['Enforce idempotency keys and signed receipts across checkout, fulfillment, and dispute workflows.', '全链路执行支付幂等键与签名电子回执，确保扣款、履约与争议核查一账对齐。']]
  ],
  voice: [
    [['Sub-300ms Duplex Turn Control', '亚 300ms 双工轮次控制'], ['Combine streaming neural VAD with instant TTS queue cancellation for natural barge-in conversations.', '结合流式神经端点检测与 TTS 播放队列即时清空，实现自然无抢话的毫秒级语音打断。']],
    [['Decoupled Async Tool Calls', '异步工具调用防阻塞'], ['Run enterprise retrieval and CRM writes off the audio loop while keeping conversational state synchronized.', '将企业检索与业务系统回写同实时音频帧循环解耦，避免慢查询卡死语音对话流。']],
    [['Percentile Latency Telemetry', '分位数时延与声学观测'], ['Gate releases on P50/P95 turn-around latency, diarization accuracy, and interruption recovery rates.', '以 P50/P95 端到端轮次时延、多说话人分离精度与打断恢复率作为上线验收标准。']]
  ],
  benchmarks: [
    [['Sealed Harness & Denominators', '封存负载与精确分母'], ['Pin prompts, tool schemas, timeouts, and exact task denominators so cross-model comparisons remain fair.', '锁定提示词、工具契约、超时阈值与精确评测分母，杜绝选择性抽样偏差。']],
    [['Deterministic Code Verifiers', '确定性校验器替代主观打分'], ['Prefer AST, schema, exit-code, and unit-test verifiers over uncalibrated single-LLM judge scores.', '优先采用退出码、Schema、单元测试等确定性校验器，避免单一裁判模型主观偏置。']],
    [['Explicit Provenance Separation', '实测与外部引用分层标注'], ['Clearly separate independently measured runs from reported external benchmarks and option-swap deltas.', '严格区分本地独立实测数据与外部公开引用基准，并附带选项反转稳健性检验。']]
  ],
  animation: [
    [['Explicit 3D/Optical Priors', '显式三维与物理光学约束'], ['Anchor CAD, DensePose UV, Snell refraction, or camera rays explicitly instead of unmasked 2D diffusion.', '使用 CAD 网格、DensePose UV、斯涅尔折射或相机射线显式约束几何，替代盲目全图重绘。']],
    [['Localized VLM Repair & Caching', '局部校验修复与缓存复用'], ['Combine Merkle / Closed-GOP reuse with localized mask repair to cut GPU spend by an order of magnitude.', '通过上游张量/视频段缓存复用与局部掩码精修，将单资产返工算力开销降低一个数量级。']],
    [['Accessible Browser Verification', '浏览器端实时对照与无障碍'], ['Deliver 60fps WebGL2/SVG interactive A/B workbenches with deterministic reduced-motion fallbacks.', '提供 60fps 浏览器端基线与推荐架构实时对照工作台，并内置减弱动画无障碍回退。']]
  ],
  game: [
    [['Fixed-Timestep Determinism', '固定步长确定性物理循环'], ['Decouple 60Hz simulation ticks from variable monitor refresh rates to prevent collision tunneling.', '将 60Hz 物理逻辑更新同可变显示器刷新率解耦，消除掉帧穿模与手感漂移。']],
    [['Data-Driven Combat & AI', '数据驱动状态机与效用博弈'], ['Externalize hitboxes, spawn curves, and AI utility weights into inspectable tables for rapid balancing.', '将判定帧窗口、刷怪曲线与 AI 效用权重配置化，支持快速数值平衡与回放验证。']],
    [['Zero-Asset Procedural Polish', '轻量程序化视听反馈闭环'], ['Synthesize hit-stop, camera trauma, and Web Audio SFX procedurally within a strict 16.6ms frame budget.', '在 16.6ms 帧预算内程序化合成顿帧、镜头震动与多层动态音效，确保轻量高响应体验。']]
  ],
  security: [
    [['Identity & Network Zero Trust', '智能体独立身份与零信任网络'], ['Assign distinct Entra Agent IDs, RBAC scopes, and private VNet egress controls to every agent workload.', '为每个智能体分配独立身份标识、最小 RBAC 权限与私有网络出站白名单边界。']],
    [['Defense-in-Depth Execution Gate', '输入过滤与微隔离纵深防御'], ['Layer prompt shields, schema validators, microVM sandboxes, and human step-up gates on mutating tools.', '叠加提示注入过滤、参数 Schema 校验、微隔离沙箱与写操作人工审批构建纵深防线。']],
    [['Continuous OWASP Red-Teaming', '持续攻防演练与审计闭环'], ['Continuously test against OWASP Agentic Top 10 scenarios and stream full tool traces to Sentinel SIEM.', '基于 OWASP Agentic Top 10 持续开展自动化红队回归，并将工具调用链全量接入 SIEM 审计。']]
  ]
};
const topicLabel = (topic, zh) => local(tracks.find(([id]) => id === topic)?.slice(1) || ['Engineering knowledge map','工程知识图谱'], zh);
function wrap(value, budget = 34) {
  const lines = []; let line = ''; let units = 0;
  for (const token of String(value || '').match(/[\u2e80-\uffff]|[^\s\u2e80-\uffff]+|\s+/g) || []) {
    const width = [...token].reduce((sum, char) => sum + (/[^\x00-\xff]/.test(char) ? 2 : 1), 0);
    if (units + width > budget && line.trim()) { lines.push(line.trim()); line = ''; units = 0; }
    if (width > budget) {
      for (const char of token) { if (units >= budget) { lines.push(line.trim()); line = ''; units = 0; } line += char; units++; }
    } else { line += token; units += width; }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}
function textLines(lines, x, y, size, color, weight = 400) {
  return `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? size * 1.4 : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}
function graphSvg(file, zh, options = {}) {
  const topic = options.topic || classifyPath(file);
  const title = local(options.title, zh) || topicLabel(topic, zh);
  const rawConcepts = options.concepts?.length ? options.concepts : blueprints[topic];
  if (!rawConcepts?.length) throw new Error(`Missing explicit architecture spec for ${file} (topic=${topic})`);
  const concepts = rawConcepts.map((item, idx) => (
    typeof item === 'object' && !Array.isArray(item)
      ? item
      : node([`STAGE 0${idx + 1}`, `架构模块 0${idx + 1}`], item, '', ['handoff', '调用传递'])
  ));
  const compact = Boolean(options.compact);
  const rawTakeaways = options.takeaways?.length ? options.takeaways : (!options.concepts?.length ? trackTakeaways[topic] : null);
  const baseHash = crypto.createHash('sha256').update(`${file}|${zh}|${topic}|${title}|${JSON.stringify(concepts)}|${JSON.stringify(rawTakeaways || '')}`).digest('hex').slice(0, 12);
  const id = `knowledge-${baseHash}${compact ? '-compact' : ''}`;
  const accents = ['#38bdf8', '#34d399', '#a78bfa', '#f59e0b', '#56ddcd'];
  const description = [];
  if (compact) {
    const heading = wrap(title, 26);
    const subLines = wrap(zh ? '模块拓扑与协议契约摘要 · 详见正文指标与代码' : 'Component, protocol & SLA summary', 40);
    let body = `<rect x="16" y="14" width="256" height="22" rx="11" fill="#112844" stroke="#2d5a88"/>` + textLines([zh ? '参考架构与控制数据面 · 竖屏' : 'REFERENCE ARCHITECTURE'], 28, 29, 11.5, '#56ddcd', 700);
    body += textLines(heading, 20, 58, 17, '#eef5ff', 700);
    let y = 60 + heading.length * 24;
    body += textLines(subLines, 20, y, 12, '#a9b8ce');
    y += 8 + subLines.length * 17;
    concepts.forEach((item, i) => {
      const label = local(item.title, zh) || '';
      const detail = local(item.detail, zh) || '';
      const accent = accents[i % accents.length];
      const roleRaw = local(item.role, zh) || (zh ? `架构模块 0${i + 1}` : `STAGE 0${i + 1}`);
      const roleLine = wrap(`0${i + 1} · ${roleRaw}`, 32)[0] || `0${i + 1}`;
      const labels = wrap(label, 26);
      const details = detail ? wrap(detail, 32) : [];
      const height = 50 + labels.length * 23 + details.length * 19;
      body += `<g data-concept="${i + 1}"><rect x="16" y="${y}" width="328" height="${height}" rx="12" fill="${i % 2 ? '#122842' : '#0e2036'}" stroke="#38597d"/><rect x="16" y="${y}" width="328" height="4" rx="2" fill="${accent}"/>${textLines([roleLine], 30, y + 23, 11.5, accent, 700)}${textLines(labels, 30, y + 46, 16, '#f0f6ff', 700)}${details.length ? textLines(details, 30, y + 50 + labels.length * 23, 12.5, '#c4d5e8') : ''}</g>`;
      description.push(label + (detail ? ': ' + detail : ''));
      y += height;
      if (i < concepts.length - 1) {
        const relation = local(item.relation, zh) || (zh ? '协议传递' : 'protocol handoff');
        const edgeLines = wrap(`0${i + 1}→0${i + 2} ${relation}`, 33);
        const gap = Math.max(46, edgeLines.length * 18 + 20);
        body += `<g data-relationship="${esc(relation)}"><path d="M34 ${y + 2} V${y + gap - 6}" fill="none" stroke="#56ddcd" stroke-width="2.2"/><path d="M29 ${y + gap - 12} L34 ${y + gap - 5} L39 ${y + gap - 12}" fill="none" stroke="#56ddcd" stroke-width="2.2"/>${textLines(edgeLines, 50, y + 24, 12, '#8eeadf', 600)}</g>`;
        description.push(relation);
        y += gap;
      }
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" lang="${zh ? 'zh-CN' : 'en'}" class="knowledge-graph-compact" role="img" aria-labelledby="${id}-title ${id}-desc" viewBox="0 0 360 ${y + 18}" width="360" style="width:100%;height:auto;max-width:560px;margin:0 auto;font-family:system-ui,sans-serif"><title id="${id}-title">${esc(title)}</title><desc id="${id}-desc">${esc(description.join(' → '))}</desc><rect width="360" height="${y + 18}" rx="16" fill="#081525" stroke="#284566"/>${body}</svg>`;
  }
  const heading = wrap(title, 84);
  let body = `<rect x="24" y="16" width="308" height="24" rx="12" fill="#102742" stroke="#2d5a88"/>` + textLines([zh ? '参考架构与关键指标摘要 · 解决方案架构视图' : 'REFERENCE ARCHITECTURE & ENGINEERING SUMMARY'], 38, 32, 11.5, '#56ddcd', 700);
  body += `<rect x="926" y="16" width="196" height="24" rx="12" fill="#0d2238" stroke="#254b6e"/>` + textLines([zh ? '──▶ 数据面与协议契约' : '──▶ Data & Protocol Plane'], 940, 32, 11.5, '#7ce8d8', 600);
  body += `<rect x="1132" y="16" width="204" height="24" rx="12" fill="#15203c" stroke="#3b4278"/>` + textLines([zh ? '◆ 架构决策与验收基准' : '◆ Design Decisions & SLAs'], 1146, 32, 11.5, '#c4b5fd', 600);
  body += textLines(heading, 24, 62, 18, '#f2f7ff', 700);
  const stageTop = 56 + heading.length * 25;
  const count = concepts.length;
  const gap = 24;
  const totalW = 1312;
  const cardW = Math.floor((totalW - (count - 1) * gap) / count);
  const roleBudget = Math.max(18, Math.floor((cardW - 32) / 7.2));
  const titleBudget = Math.max(19, Math.floor((cardW - 26) / 7.6));
  const detailBudget = Math.max(21, Math.floor((cardW - 24) / 6.7));
  const staged = concepts.map((item, i) => {
    const label = local(item.title, zh) || '';
    const detail = local(item.detail, zh) || '';
    const roleRaw = local(item.role, zh) || (zh ? `架构模块 0${i + 1}` : `STAGE 0${i + 1}`);
    const roleLine = wrap(`0${i + 1} · ${roleRaw}`, roleBudget)[0] || `0${i + 1}`;
    const relation = i < count - 1 ? (local(item.relation, zh) || (zh ? '协议传递' : 'protocol handoff')) : '';
    const labels = wrap(label, titleBudget);
    const details = detail ? wrap(detail, detailBudget) : [];
    const relLines = i < count - 1 ? wrap(`0${i + 1}→0${i + 2} ${relation}`, detailBudget) : wrap(zh ? `0${count} 输出 · 验收指标与审计闭环` : `0${count} Output · Verified SLA & Audit`, detailBudget);
    return {label, detail, roleLine, relation, labels, details, relLines};
  });
  const cardH = Math.max(182, ...staged.map(s => 64 + s.labels.length * 19 + s.details.length * 17));
  const relY = stageTop + cardH + 8;
  const relH = Math.max(30, ...staged.map(s => 12 + s.relLines.length * 16));
  staged.forEach((s, i) => {
    const x = 24 + i * (cardW + gap);
    const accent = accents[i % accents.length];
    const sepY = stageTop + 50 + s.labels.length * 19;
    body += `<g data-concept="${i + 1}"><rect x="${x}" y="${stageTop}" width="${cardW}" height="${cardH}" rx="12" fill="${i % 2 ? '#112640' : '#0d1e34'}" stroke="#335277" stroke-width="1.2"/><rect x="${x}" y="${stageTop}" width="${cardW}" height="5" rx="2.5" fill="${accent}"/><rect x="${x + 10}" y="${stageTop + 13}" width="${cardW - 20}" height="22" rx="6" fill="#081424" stroke="#223b59"/>${textLines([s.roleLine], x + 16, stageTop + 28, 11.5, accent, 700)}${textLines(s.labels, x + 12, stageTop + 54, 13.5, '#f4f8ff', 700)}<path d="M${x + 12} ${sepY} H${x + cardW - 12}" stroke="#233b57" stroke-width="1"/>${s.details.length ? textLines(s.details, x + 12, sepY + 18, 12, '#c5d6e8') : ''}</g>`;
    description.push(s.label + (s.detail ? ': ' + s.detail : ''));
    if (i < count - 1) {
      const arrowY = stageTop + Math.floor(cardH / 2);
      body += `<g data-relationship="${esc(s.relation)}"><path d="M${x + cardW + 2} ${arrowY} H${x + cardW + gap - 4}" fill="none" stroke="#56ddcd" stroke-width="2.4"/><path d="M${x + cardW + gap - 10} ${arrowY - 5} L${x + cardW + gap - 3} ${arrowY} L${x + cardW + gap - 10} ${arrowY + 5}" fill="none" stroke="#56ddcd" stroke-width="2.4"/><rect x="${x}" y="${relY}" width="${cardW}" height="${relH}" rx="8" fill="#0b2239" stroke="#2b5b6c"/>${textLines(s.relLines, x + 10, relY + 19, 11.5, '#7ce8d8', 600)}</g>`;
      description.push(s.relation);
    } else {
      body += `<rect x="${x}" y="${relY}" width="${cardW}" height="${relH}" rx="8" fill="#0e2538" stroke="#2e5470"/>` + textLines(s.relLines, x + 10, relY + 19, 11.5, '#93c5fd', 600);
    }
  });
  const takeawayTop = relY + relH + 14;
  const takeawayAccents = ['#38bdf8', '#a78bfa', '#34d399'];
  let takeaways;
  if (rawTakeaways?.length) {
    takeaways = rawTakeaways.slice(0, 3).map((item, idx) => {
      const headStr = Array.isArray(item) ? local(item[0], zh) : local(item.head, zh);
      const bodyStr = Array.isArray(item) ? local(item[1], zh) : local(item.body, zh);
      return {
        accent: takeawayAccents[idx % 3],
        headLines: wrap(`0${idx + 1} · ${headStr}`, 48).slice(0, 2),
        lines: wrap(bodyStr, 52)
      };
    });
  } else {
    const first = concepts[0];
    const mid = concepts[Math.floor((concepts.length - 1) / 2)] || first;
    const last = concepts[concepts.length - 1] || first;
    takeaways = [first, mid, last].map((c, idx) => ({
      accent: takeawayAccents[idx % 3],
      headLines: wrap(`0${idx + 1} · ${local(c.title, zh) || (zh ? '核心模块' : 'Core Module')}`, 48).slice(0, 2),
      lines: wrap(local(c.detail, zh) || local(c.title, zh) || '', 52)
    }));
  }
  const takeawayH = Math.max(88, ...takeaways.map(t => 22 + t.headLines.length * 16 + t.lines.length * 17));
  takeaways.forEach((card, idx) => {
    const cx = 24 + idx * 443;
    const bodyY = takeawayTop + 26 + card.headLines.length * 16;
    body += `<g data-takeaway="${idx + 1}"><rect x="${cx}" y="${takeawayTop}" width="426" height="${takeawayH}" rx="10" fill="#0b1a2e" stroke="#284466"/><rect x="${cx}" y="${takeawayTop + 12}" width="4" height="${takeawayH - 24}" rx="2" fill="${card.accent}"/>${textLines(card.headLines, cx + 14, takeawayTop + 24, 11.5, card.accent, 700)}${card.lines.length ? textLines(card.lines, cx + 14, bodyY, 12, '#d5e4f5') : ''}</g>`;
  });
  const totalH = takeawayTop + takeawayH + 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" lang="${zh ? 'zh-CN' : 'en'}" class="knowledge-graph-wide" role="img" aria-labelledby="${id}-title ${id}-desc" viewBox="0 0 1360 ${totalH}" width="1360" style="width:100%;height:auto;margin:0 auto;font-family:system-ui,sans-serif"><title id="${id}-title">${esc(title)}</title><desc id="${id}-desc">${esc(description.join(' → '))}</desc><rect width="1360" height="${totalH}" rx="16" fill="#081525" stroke="#284566"/>${body}</svg>`;
}
function knowledgeFigure(file, zh, options = {}) {
  const topic = options.topic || classifyPath(file);
  return `<figure class="knowledge-figure" data-knowledge-atlas="${esc(topic)}" style="margin:20px auto;width:100%;max-width:min(2880px,100%);padding:0 clamp(0px,1.2vw,20px);box-sizing:border-box"><style>.knowledge-graph-wide{display:block!important}.knowledge-graph-compact{display:none!important}@media(max-width:600px){.knowledge-graph-wide{display:none!important}.knowledge-graph-compact{display:block!important}}</style>${graphSvg(file, zh, {...options, compact: true})}${graphSvg(file, zh, {...options, compact: false})}<figcaption style="font:13px/1.6 system-ui,sans-serif;margin:10px auto 0;max-width:100%;color:#9fb2ca;overflow-wrap:anywhere">${zh ? '本页参考架构摘要：展示核心组件边界、阶段间协议契约与底部三项工程选型结论。' : 'Page architecture summary: component boundaries, stage protocol contracts, and three engineering selection takeaways.'}</figcaption></figure>`;
}
const mapSummaries = {
  'data-infra': [['OneLake · Fabric IQ · Mirroring','AKSClaw · E2B · VM FinOps'],['OneLake · Fabric IQ · 数据镜像','AKSClaw · E2B · VM 成本治理']],
  infra: [['Runtime · GPU · interconnect','Phase 179 · inference · resilience'],['运行时 · GPU · 互连','Phase 179 · 推理 · 韧性']],
  commerce: [['Grounding → offer → consent','Checkout · receipt · audit'],['可信发现 → 报价 → 授权','结账 · 回执 · 审计']],
  voice: [['Audio → agent → speech','Duplex · speakers · interruption'],['音频 → 智能体 → 语音','双工 · 说话人 · 打断']],
  benchmarks: [['Contract → verifier → evidence','Robustness · latency · provenance'],['契约 → 校验器 → 证据','稳健性 · 延迟 · 来源']],
  animation: [['Geometry → motion → frame','4D camera · explanatory scenes'],['几何 → 运动 → 画面','4D 相机 · 知识讲解']],
  game: [['Input → simulation → feedback','World state · rules · interaction'],['输入 → 仿真 → 反馈','世界状态 · 规则 · 交互']],
  security: [['Threat → control → recovery','Identity · policy · audit'],['威胁 → 控制 → 恢复','身份 · 策略 · 审计']],
  'sa-skills': [['Reusable contracts & runbooks','HVE · skills · human approval'],['可复用契约与操作手册','HVE · 技能 · 人工批准']]
};
function systemSvg(file, zh, compact = false) {
  const ultra = compact === 'ultrawide';
  const mode = ultra ? 'ultrawide' : (compact ? 'compact' : 'wide');
  const id = `system-${crypto.createHash('sha256').update(`${file}|${zh}|${mode}`).digest('hex').slice(0, 10)}`;
  const width = ultra ? 1880 : (compact ? 360 : 1320);
  const step = ultra ? 156 : (compact ? 154 : 156);
  const rows = compact === true ? contextTracks.length : (ultra ? 2 : 3);
  const height = ultra ? 444 : (148 + rows * step);
  let body = textLines([zh ? '八大工程赛道 + SA 技能扩展' : '8 engineering tracks + SA extension'], 24, 34, compact === true ? 17 : 25, '#eef5ff', 700);
  body += textLines(zh ? ['架构理解 → 证据检查 → 演示运行 → 来源复用','共享：数据基础 · 运行时 · 测评契约 · 信任边界'] : ['Architecture → evaluation → demos → resources', 'Shared: data · runtime · test contracts · trust'], 24, 66, compact === true ? 13 : 17, '#bed0e4');
  if (ultra) {
    body += `<rect x="1312" y="20" width="544" height="58" rx="12" fill="#102742" stroke="#355b84"/>` + textLines([zh ? '系统架构拓扑 · 点击任一赛道卡片直达架构与工作台' : 'SYSTEM ARCHITECTURE TOPOLOGY · SELECT ANY TRACK CARD'], 1330, 44, 12.5, '#56ddcd', 700) + textLines([zh ? '第一排 01–05 核心技术底座 · 第二排 06–08 应用赛道 + 09 SA 共享扩展' : 'Row 1: 01–05 Core Systems · Row 2: 06–08 Interactive Tracks + 09 SA Extension'], 1330, 65, 12.5, '#c5d4e7', 500);
  }
  const railY = 108;
  body += `<path d="M24 ${railY} H${width - 24}" stroke="#63dbca" stroke-width="2"/>`;
  if (ultra) {
    body += `<path d="M24 274 H${width - 24}" stroke="#527793" stroke-width="2"/>`;
  }
  contextTracks.forEach(([track,en,cn], index) => {
    let col, row, x, y, w;
    if (compact === true) {
      col = 0; row = index; x = 16; y = 136 + row * step; w = 328;
    } else if (ultra) {
      row = index < 5 ? 0 : 1;
      col = row === 0 ? index : index - 5;
      w = row === 0 ? 354 : 446;
      x = 24 + col * (row === 0 ? 370.5 : 462);
      y = row === 0 ? 128 : 290;
    } else {
      col = index % 3; row = Math.floor(index / 3); x = 24 + col * 428; y = 132 + row * step; w = 416;
    }
    const target = track === 'sa-skills' ? `studio/${zh ? 'zh-' : ''}index.html#sa-skills` : `studio/${zh ? 'zh-' : ''}${track}.html`;
    const href = path.posix.relative(path.posix.dirname(file.replaceAll('\\','/')), target) || path.posix.basename(target);
    const title = zh ? cn : en; const lines = wrap(title, ultra ? 31 : (compact === true ? 31 : 36));
    const stemTop = ultra ? (row === 0 ? railY : 274) : (row ? y - step + 130 : railY);
    if (ultra && row === 0 && (col === 1 || col === 3)) {
      body += `<path d="M${x + w / 2} ${y + 130} V274" fill="none" stroke="#527793" stroke-width="2"/>`;
    }
    body += `<path d="M${x + w / 2} ${stemTop} V${y}" fill="none" stroke="#527793" stroke-width="2"/><a href="${esc(href)}" aria-label="${esc(title)}"><g data-track="${track}"><rect x="${x}" y="${y}" width="${w}" height="130" rx="12" fill="${track === 'sa-skills' ? '#203044' : '#10253a'}" stroke="#527793"/>${textLines([`${String(index + 1).padStart(2,'0')} / ${zh ? (track === 'sa-skills' ? '共享扩展' : '核心赛道') : (track === 'sa-skills' ? 'SHARED EXTENSION' : 'CORE TRACK')}`], x + 16, y + 23, 12, '#89dfd0', 650)}${textLines(lines, x + 16, y + 48, 18, '#eef5ff', 650)}${textLines(mapSummaries[track][zh ? 1 : 0], x + 16, y + 57 + lines.length * 23, 13, '#c5d4e7')}</g></a>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" lang="${zh ? 'zh-CN' : 'en'}" class="knowledge-system-${mode}" role="img" aria-labelledby="${id}-title ${id}-desc" viewBox="0 0 ${width} ${height}" width="${width}" style="width:100%;height:auto;font-family:system-ui,sans-serif"><title id="${id}-title">${zh ? '工程枢纽整体知识图谱' : 'Engineering Hub overall knowledge map'}</title><desc id="${id}-desc">${zh ? '八大赛道共享架构、测评、演示与资料四阶段。SA 技能与 HVE 为所有赛道提供可复用契约；连线表示共享工程路径，不表示运行时数据流。' : 'Eight tracks share architecture, evaluation, demos and resources. SA skills and HVE supply reusable contracts across tracks; connecting lines show a shared engineering path, not runtime data flow.'}</desc><rect width="${width}" height="${height}" rx="16" fill="#091827"/>${body}</svg>`;
}
function systemFigure(file, zh) {
  return `<figure class="knowledge-figure knowledge-system" data-knowledge-atlas="system" style="margin:24px 0;width:100%;max-width:100%"><style>.knowledge-system-wide{display:block}.knowledge-system-ultrawide,.knowledge-system-compact{display:none}@media(min-width:1520px){.knowledge-system-wide{display:none}.knowledge-system-ultrawide{display:block}}@media(max-width:600px){.knowledge-system-wide,.knowledge-system-ultrawide{display:none}.knowledge-system-compact{display:block}}</style>${systemSvg(file,zh,'ultrawide')}${systemSvg(file,zh)}${systemSvg(file,zh,true)}<figcaption style="font:14px/1.6 system-ui,sans-serif;margin:12px 0">${zh ? '知识图谱：连线表示共享工程路径；八大核心赛道与 SA 技能扩展各有真实入口。非性能或成熟度排名。' : 'Knowledge map: connectors represent a shared engineering path. Eight core tracks and the SA extension each link to their real entry point; this is not a performance or maturity ranking.'}</figcaption></figure>`;
}
function buildKnowledgeAtlas({root = path.join(__dirname, '..'), write} = {}) {
  const emit = write || ((file, text) => {const absolute = path.join(root, file); fs.mkdirSync(path.dirname(absolute), {recursive:true}); fs.writeFileSync(absolute,text);});
  const files = [];
  for (const zh of [false,true]) {
    for (const [topic] of tracks) {
      const file = `assets/knowledge/${topic}.${zh ? 'zh' : 'en'}.svg`;
      emit(file, graphSvg(file,zh,{topic}) + '\n'); files.push(file);
    }
    for (const compact of [false,true]) {
      const file = `assets/knowledge/system-${compact ? 'compact' : 'wide'}.${zh ? 'zh' : 'en'}.svg`;
      emit(file,systemSvg(file,zh,compact) + '\n'); files.push(file);
    }
  }
  return files;
}
module.exports = {knowledgeFigure, systemFigure, graphSvg, buildKnowledgeAtlas, blueprints};
if (require.main === module) console.log(`Built ${buildKnowledgeAtlas().length} localized knowledge SVG assets.`);
