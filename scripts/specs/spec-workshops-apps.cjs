'use strict';
const { stage: s, entry } = require('./policy.cjs');

const APPS_SPECS = {
  'workshops/agentic-commerce/index': entry(
    'agentic',
    'Agentic Commerce Protocol Workbench · UCP Discovery, MCP Catalog Tools, AP2 Mandates & Stripe ACP SPT',
    '智能体商务四层协议工作台 · UCP 能力发现、MCP 商品工具、AP2 签名授权与 Stripe ACP 支付令牌',
    [
      s('DISCOVERY · UCP', '发现层 · 商户能力声明', '/.well-known/ucp Manifest & Policies', '标准化商户端点、退换货条款与支持协议声明', 'Exposes machine-readable catalog, fulfillment & payment protocol capabilities to buyer agents', '向买方智能体暴露结构化商品查询、履约时效与受支持的结算协议端点', 'exposes tools', '挂载标准化业务工具'),
      s('EXECUTION · MCP', '交互层 · 商品与履约工具', 'Typed Search, Inventory Lock & Quote', '结构化商品检索、库存预占与税费试算契约', 'Replaces brittle DOM scraping with schema-validated SKU, tax, shipping & cart mutations', '以强类型工具调用替代脆弱的网页爬虫解析，精准完成库存锁定与税费试算', 'requests mandate', '签发加密用户授权'),
      s('TRUST · AP2 MANDATE', '信任层 · 加密意图与购物车授权', 'Intent Mandate + Cart Mandate (VC)', '预算上限委托凭证与最终购物车防篡改签名', 'Cryptographically binds user-approved spend ceiling, merchant ID & SKU line items', '通过可验证加密凭证绑定用户授权预算上限、指定商户标识与购物车明细哈希', 'settles via SPT', '铸造单次范围支付令牌'),
      s('SETTLEMENT · ACP', '清算层 · 零卡号暴露结算', 'Stripe ACP Shared Payment Token (SPT)', '单商户、限额、短时效一次性支付令牌交割', 'Agent passes scoped SPT without ever seeing raw PAN/CVV; merchant PSP settles cleanly', '智能体全程不接触原始卡号，仅传递限额限时令牌由商户原有收单通道完成扣款')
    ],
    [
      ['Four Orthogonal Protocol Responsibilities', '发现、工具、授权与支付四层职责正交解耦', 'UCP, MCP, AP2, and Stripe ACP solve distinct layers rather than competing head-to-head.', '四大开放协议分别解决服务发现、目录交互、责任归属与资金清算，生产落地需分层组合。'],
      ['Cryptographic Mandates Resolve Dispute Liability', '加密双授权凭证划清智能体越权交易责任边界', 'Signed Intent + Cart Mandates prove whether an autonomous purchase stayed within user bounds.', '意图凭证与购物车签名凭证共同构成银行拒付争议时的可审计加密证据链。'],
      ['Keep Agents Out of PCI-DSS Cardholder Scope', '利用范围支付令牌将智能体排除在卡组织合规域外', 'Scoped SPTs prevent prompt injection from exfiltrating reusable payment credentials.', '一次性限额令牌即便在提示注入下泄露也无法跨商户或超额盗刷，大幅收敛安全风险。']
    ]
  ),
  'workshops/agentic-commerce/stripe-collison-7-trends': entry(
    'agentic',
    'Stripe 2025 Annual Letter · 7 Architectural Shifts in Agentic Commerce, Stablecoin Settlement & Tempo L1',
    'Stripe 年度信七大工程趋势解析 · 智能体商务五层栈、稳定币全球清结算与 Tempo 支付链',
    [
      s('DEMAND SHIFT', '流量入口代际迁移', 'Human Checkout UI → Delegated Buyer Agents', '从人类点击收银台转向智能体代理寻源与比价', 'Conversion hinges on machine-readable latency, structured stock truth & API ergonomics', '商业转化率不再仅取决于页面视觉设计，而取决于接口响应确定性与结构化履约质量', 'standardizes stack', '催生五层商务协议栈'),
      s('5-LAYER ACP STACK', '智能体商务五层协议栈', 'Catalog · Discovery · Quote · SPT · Order Sync', '商品暴露、商户发现、税运计价、令牌支付与履约同步', 'Decouples agent orchestration from existing merchant ERP/OMS and PSP acquiring rails', '在不推翻商户既有订单系统与收单清分底座的前提下接入智能体代理交易流量', 'bridges rails', '衔接可编程跨境资金轨'),
      s('STABLECOIN RAILS', '企业级稳定币全球资金轨', 'Bridge Orchestration & Treasury Settlement', '7×24 跨境准实时清结算与多币种资金池调拨', 'Cuts cross-border FX/correspondent latency for global AI SaaS and marketplace payouts', '为全球化 AI 原生企业与跨境平台压缩多级代理行高昂汇损与数日结算在途周期', 'scales throughput', '下沉至专用支付区块链'),
      s('PAYMENT-NATIVE L1', '专用高吞吐支付底座', 'Tempo High-TPS Deterministic Finality', '面向高频微支付与机器间按次计费的确定性结算层', 'Supports sub-cent API/token metering where card interchange fixed fees break unit economics', '支撑传统信用卡固定手续费无法承载的智能体间高频微额 API 与算力按次即时分账')
    ],
    [
      ['Machine Readability Becomes Distribution Moat', '机器可读性与履约接口质量成为新流量入口壁垒', 'Merchants without structured inventory, tax, and return schemas become invisible to agents.', '缺乏实时库存、退货规则与结构化计价接口的商户将在智能体导购筛选阶段被直接过滤。'],
      ['Card Rails + Stablecoin Rails Coexist by Ticket Size', '传统卡组网络与稳定币轨道按客单与跨境属性互补', 'Consumer dispute-protected retail stays on card SPTs; B2B treasury & micro-metering shift to stablecoins.', '需拒付保护的零售消费继续依托卡网令牌，高频机器微支付与跨境企业结算加速转向稳定币。'],
      ['Upgrade Merchant APIs Before Rebuilding Frontends', '企业就绪优先级在于幂等订单接口而非重写前端', 'Idempotent checkout endpoints and scoped token handlers deliver immediate agent readiness.', '优先建设幂等计价下单接口与范围支付令牌处理能力，是最低成本接入智能体商务的路径。']
    ]
  ),
  'workshops/webiq-azure/compare': entry(
    'agentic',
    'Web-Grounded Agent Stack Selection Matrix · WebIQ / Firecrawl / Browser Use / Tavily on Azure',
    '企业网页感知与浏览器智能体选型矩阵 · WebIQ、结构化抓取与云端隔离浏览器对比',
    [
      s('ACQUISITION MODE', '外部网页信息获取范式', 'Search Index API vs Clean Markdown vs GUI', '实时搜索索引、反爬清洗抽取与真实浏览器交互对比', 'Splits read-only knowledge grounding from authenticated multi-step DOM form transactions', '区分公开网页知识检索抽取与需要登录态、复杂动态交互的网页事务执行两类场景', 'evaluates metrics', '四维工程指标对标'),
      s('BENCHMARK AXES', '准确率与成本时延权衡', 'Token Noise, P95 Latency, Anti-Bot & Cost', '上下文信噪比、P95 时延、动态渲染穿透与单页成本', 'Raw HTML wastes 5×–10× context tokens; headless browser pools trade latency for JS fidelity', '原始网页标签严重污染上下文预算，无头浏览器集群以更高算力时延换取复杂脚本渲染能力', 'secures boundary', '接入企业零信任安全网关'),
      s('SECURITY GUARD', '防间接提示注入与出口审计', 'Untrusted DOM Sanitization & Egress Proxy', '外部网页不可信内容隔离、指令剥离与代理审计', 'Treats every fetched webpage as untrusted data to block hidden prompt-injection payloads', '将一切外部抓取内容标记为低信任数据平面，拦截隐藏文本指令劫持内部高权限工具', 'deploys on Azure', '映射 Azure 托管架构'),
      s('AZURE LANDING', 'Azure 生产落地拓扑', 'ACA Browser Pool + Foundry + AI Search Cache', '弹性容器浏览器池、智能体编排与热点网页向量缓存', 'Caches high-frequency domain extractions in Azure AI Search with TTL freshness metadata', '对高频访问外部知识源建立带时效签名的结构化缓存层，压降重复抓取时延与外部调用费')
    ],
    [
      ['Use APIs & Clean Markdown Before Full Browser GUI', '优先调用结构化检索清洗接口而非一律启动浏览器', 'Reserve heavy Playwright/CDP sessions strictly for JS-gated or interactive stateful workflows.', '超过八成公开信息获取可通过轻量搜索与清洗接口完成，仅在动态交互闭环时拉起远程浏览器。'],
      ['Isolate Browser Sessions From Corporate Intranet', '远程浏览器执行池必须与企业内网严格物理/网络隔离', 'Run headless browsers in dedicated egress-only subnets with zero corporate VNet route access.', '承载外部网页渲染的容器池必须置于独立公网出口子网，严禁挂载企业内网路由与托管身份。'],
      ['Strip Hidden DOM Nodes Prior to Context Injection', '注入模型上下文前先行清洗不可见节点与异常指令', 'Remove zero-opacity text, comments, and script attributes toshrink tokens and injection surface.', '先剥离隐藏样式文本与脚本属性再送入模型阅读，同步压降词元消耗与间接注入攻击面。']
    ]
  ),
  'workshops/ai-security/index': entry(
    'ai-security',
    'Enterprise AI Security Interactive Lab · OWASP LLM/Agentic Attack Replay & Defense-in-Depth Controls',
    '企业 AI 安全攻防演练台 · 提示注入、工具越权、记忆投毒攻击复现与纵深防御验证',
    [
      s('ATTACK VECTORS', '六大高频企业攻击面', 'Direct/Indirect Injection, SSRF & Memory Poison', '直接/间接提示注入、工具越权、检索投毒与凭据窃取', 'Replays realistic adversarial payloads across RAG documents, MCP tools & multi-turn state', '真实复现恶意简历文档注入、跨租户检索越权、外部插件参数篡改与跨会话记忆污染链路', 'traces blast radius', '观测无防护失陷路径'),
      s('UNPROTECTED PATH', '无护栏裸奔失陷链路', 'Context Hijack → Confused Deputy Tool Call', '不可信数据篡改系统意图并诱骗高权限身份越权执行', 'Shows why system-prompt warnings alone fail when agents hold broad service-principal keys', '直观揭示仅靠系统提示词软约束而共享高权限服务主体密钥时为何必然发生越权失陷', 'enforces controls', '启用四道硬性安全门禁'),
      s('HARD GUARDRAILS', '确定性四层安全门禁', 'Prompt Shields + Entra OBO + RLS + Policy Gate', '输入内容护盾、用户身份透传、行级过滤与动作策略拦截', 'Combines classifier shields with cryptographic user-scoped permissions and schema validators', '将分类器检测与调用方真实身份权限继承、工具参数白名单校验及高危写操作审批结合', 'audits telemetry', '沉淀红蓝对抗合规证据'),
      s('RED-TEAM VERIFY', '持续红队回归与审计闭环', 'ASR Reduction, False-Positive Rate & Audit Log', '攻击成功率压降验证、误拦率平衡与全链路取证日志', 'Quantifies block rates and latency overhead (<45ms) before production promotion', '定量评估防护开启前后的攻击拦截率、正常业务误伤率与毫秒级附加安全检测时延')
    ],
    [
      ['System Prompts Are Not Security Boundaries', '系统提示词绝不能替代确定性访问控制边界', 'Enforce authorization in the identity, database RLS, and tool-gateway layers outside the LLM.', '权限裁决必须下沉至身份令牌、数据库行级安全与工具网关代码层，绝不依赖模型自觉遵守。'],
      ['Eliminate Shared Admin Keys With Entra OBO', '以调用方身份透传彻底淘汰共享全局管理员密钥', 'An agent cannot leak cross-tenant records that the signed-in user token cannot read.', '当下游检索与业务接口严格校验当前登录用户自身权限时，提示注入无法跨越用户权限天花板。'],
      ['Gate High-Impact Mutations Deterministicly', '资金划拨、外发邮件与权限变更必须强制人工或规则复核', 'Separate read-only exploration tools from state-mutating actions requiring explicit confirmation.', '严格拆分只读查询工具与写操作工具，对外部通信与核心账务变更实施确定性二次确认门禁。']
    ]
  ),
  'workshops/agent-harness-coevolution/index': entry(
    'agentic',
    'Agent Harness Co-Evolution · Model Capability Shifts, Thin vs Thick Scaffolding & Verification Loops',
    '智能体运行框架（Harness）与大模型协同演进 · 脚手架做薄原则、验证闭环与上下文经济学',
    [
      s('CO-EVOLUTION LAW', '模型与框架协同演进规律', 'Frontier RL Internalizes Rigid Workflows', '前沿推理模型内化规划能力后淘汰僵化手写状态机', 'Hardcoded multi-node prompt chains become brittle ceilings as native tool-use & reasoning improve', '早期为弥补弱模型而堆砌的繁琐固定有向图节点，在强推理模型时代反而成为准确率上限枷锁', 'strips scaffolding', '精简控制面脚手架'),
      s('THIN HARNESS CORE', '极简高杠杆运行底座', 'Bash/FS Primitives + Clean Tool Contracts', '通用文件与命令行原语配合高内聚原子工具契约', 'Gives capable models direct environment observation while enforcing strict sandbox safety bounds', '赋予模型直接探查环境的精简原子工具，减少中间层有损摘要截断，同时守住沙箱隔离底线', 'closes loop', '注入高信噪比验证信号'),
      s('VERIFIER LOOP', '客观编译器与测试验证闭环', 'Tests, Linters, Typecheck & Runtime Traces', '以确定性测试、类型检查与执行退出码替代主观自评', 'Grounds iterative self-correction in reproducible environment feedback rather than LLM-as-judge', '用真实的编译报错、断言结果与契约校验驱动多轮自我修复，避免模型同温层幻觉互夸', 'manages context', '治理长程上下文腐化'),
      s('CONTEXT HYGIENE', '长周期上下文分层与卸载', 'Subagent Isolation, Scratchpads & Compaction', '只读探索子智能体上下文隔离、文件落盘与结构化压缩', 'Prevents 100K+ tool-output pollution via scoped subagent delegation and durable artifacts', '将海量检索日志隔离在子任务窗口内仅返回精炼证据，把关键状态持久化至工作区文件')
    ],
    [
      ['Delete Scaffolding That Fights Newer Models', '随基座模型升级定期删减冗余提示词拐杖', 'Re-benchmark thin loops whenever upgrading model generations; simpler harnesses often win.', '每次模型大版本迭代都应做减法回归测试，移除过时的分步拆解模板往往能同步提升效果与速度。'],
      ['Invest Engineering Effort in Verifiers & Environments', '把架构重心从编排流程图转向高质量验证环境建设', 'Deterministic test suites, fast sandboxes, and crisp error messages compound across every model upgrade.', '高覆盖度自动化测试、清晰的报错契约与秒级沙箱是跨模型代际持续增值的核心工程资产。'],
      ['Treat Context Window as Scarce Working RAM', '将活跃上下文视作昂贵高速缓存而非无限倾倒池', 'Offload verbose logs to filesystem/SQLite and delegate broad searches to isolated subagents.', '原始长日志落盘按需读取、宽泛代码搜索委派独立子会话，保持主控推理窗口高信噪比。']
    ]
  ),
  'workshops/google-self-improving-harnesses/index': entry(
    'agentic',
    'Self-Improving Agent Harnesses · Evolutionary Search, Execution Evaluators & Automated Topology Tuning',
    '自进化智能体运行框架 · 基于客观评估器的提示词、工具契约与控制流自动寻优架构',
    [
      s('MUTATION SPACE', '可搜索进化配置空间', 'Prompts, Tool Schemas, Routing & Retry Rules', '系统指令、工具参数定义、子任务切分与重试策略参数化', 'Treats harness code and configuration as explicit mutable artifacts under version control', '将运行框架中的指令模板、工具描述与验证分支视作可结构化变异与版本回溯的工程代码', 'executes candidate', '在封存基准集运行候选体'),
      s('SEALED BENCHMARK', '防过拟合分层评测沙箱', 'Train / Validation / Held-Out Task Splits', '训练集寻优、验证集筛选与盲测集防作弊隔离', 'Runs candidate harnesses inside reproducible containerized tasks with strict cost/time budgets', '在隔离容器环境执行真实编码与推理任务，严防针对单一测试题目的硬编码作弊与过拟合', 'scores fitness', '多目标帕累托适应度评分'),
      s('PARETO EVALUATOR', '准确率—成本—时延联合目标', 'Pass Rate × Token Cost × P95 Wall-Clock', '任务通过率、词元开销与端到端耗时的帕累托前沿筛选', 'Rejects bloated harness mutations that gain +1% accuracy at 4× token cost and latency', '自动淘汰靠堆砌冗余重试换取微弱提分的高成本变体，保留高性价比帕累托最优解', 'distillstraces', '诊断失败轨迹驱动下一代'),
      s('TRACE REFLECTION', '失败执行轨迹归因与迭代', 'Failure Taxonomy → Targeted Harness Patch', '从真实报错轨迹提取结构性缺陷并生成针对性改进补丁', 'Feeds concrete tool-misuse and timeout traces into meta-agent proposer for next iteration', '聚焦工具误用、死循环与验证遗漏等共性轨迹生成精准代码补丁，沉淀人类可读的确定性规则')
    ],
    [
      ['Self-Improvement Requires Non-Gameable Verifiers', '自进化成立的前提是不可投机欺骗的客观验证器', 'Without held-out deterministic tests, evolutionary loops rapidly reward reward-hacking shortcuts.', '缺乏留出集与确定性测试门禁时，自动优化极易退化为针对评分漏洞的投机取巧。'],
      ['Optimize the Accuracy–Cost Pareto Frontier', '必须同时把词元成本与时延纳入进化目标函数', 'Unconstrained prompt/retry evolution bloats production inference bills exponentially.', '不设成本与步数惩罚的自进化会堆叠多轮投票重试，导致线上推理账单与响应耗时失控。'],
      ['Export Human-Auditable Code, Not Opaque Weights', '产出可代码审查的显式策略而非黑盒隐式状态', 'Harness evolution updates readable code/prompts that security and SRE teams can audit.', '框架层进化直接生成清晰的源码与配置变更，便于企业安全团队与运维团队审查上线。']
    ]
  ),
  'workshops/harness-engineering-frameworks/index': entry(
    'agentic',
    'Production Agent Harness Engineering · 7 Architectural Pillars Across Claude Code, Codex, LangGraph & MAF',
    '生产级智能体运行框架工程对标 · 动作空间、状态持久化、上下文压缩、子代理与安全门禁',
    [
      s('ACTION & TOOLS', '动作空间与工具契约层', 'Atomic Tools vs Code-Mode / Bash Execution', '精简强类型工具集对比代码执行模式与命令原语', 'Balances structured JSON tool schemas with composable script/CLI execution efficiency', '权衡高确定性结构化接口与脚本批处理能力，避免数百个碎粒度工具淹没模型注意力', 'persists state', '绑定长周期状态检查点'),
      s('DURABLE STATE', '有状态检查点与断点续跑', 'Event Log, Checkpoints & Idempotent Replay', '事件溯源日志、状态快照持久化与幂等故障恢复', 'Survives process crashes, rate-limit backoffs & multi-day human approval pauses cleanly', '支持长任务跨进程重启、限流退避与跨天人工审批挂起后精确恢复现场并避免重复扣费写库', 'compacts memory', '治理长会话记忆层级'),
      s('MEMORY & SUBAGENTS', '上下文压缩与子代理编排', 'Rolling Compaction + Scoped Worker Trees', '结构化滑动摘要压缩与独立上下文子任务分治', 'Preserves architectural invariants across compaction boundaries while parallelizing read-only work', '在多轮压缩中锁死核心目标与已验证事实，并通过并行只读子代理加速大规模代码与文档探查', 'enforces safety', '挂载权限沙箱与审计钩子'),
      s('POLICY & TELEMETRY', '细粒度权限钩子与全链路追踪', 'Pre-Tool Hooks, Sandbox Policy & OpenTelemetry', '工具调用前置拦截钩子、目录/网络白名单与成本追踪', 'Intercepts destructive commands deterministically and emits per-turn token/latency spans', '在危险命令执行前通过确定性策略钩子拦截或升级审批，并输出标准分布式追踪遥测')
    ],
    [
      ['Keep Tool Count Focused and Error Messages Actionable', '收敛主控工具数量并设计自解释的报错返回格式', '20 crisp tools with recovery hints outperform 200 overlapping MCP wrappers.', '精炼正交的工具集配合带修复指引的结构化报错，远胜于盲目挂载数百个语义重叠的接口包装。'],
      ['Separate Durable Workflow State From LLM Prompt History', '将业务事务状态机与模型对话消息列表解耦存储', 'Store task DAGs, approvals, and idempotency keys in SQL/durable state outside compacted text.', '关键任务依赖、审批状态与幂等键必须落入关系库或持久化状态存储，不可仅存于易被压缩的对话文本。'],
      ['Instrument Pre/Post-Tool Policy Hooks Uniformly', '在框架底座统一收口工具前置鉴权与输出脱敏钩子', 'Deterministic middleware hooks enforce security invariants regardless of model temperature.', '通过中间件钩子强制执行路径限制、密钥擦除与预算熔断，确保安全合规不随模型随机性波动。']
    ]
  ),
  'workshops/scientific-and-industry-harness-engineering/index': entry(
    'agentic',
    'Scientific & Industrial Agent Harnesses · Domain Simulators, Formal Verifiers & Regulated Audit Trails',
    '科学与工业领域智能体工程架构 · 物理/编译器仿真器耦合、形式化校验与受监管行业审计',
    [
      s('HYPOTHESIS & PLAN', '领域假设与受控实验规划', 'Literature / Telemetry Grounding & Spec', '领域知识库检索、工况遥测约束与结构化实验方案', 'Constrains candidate designs within physical conservation laws, safety SOPs & cost budgets', '在立项规划阶段即引入物理守恒边界、工业安全作业规程与物料实验预算约束', 'invokes simulators', '驱动高保真领域求解器'),
      s('DOMAIN VERIFIERS', '确定性科学计算与工业求解器', 'Lean4 / EDA / FEM / Molecular & SQL Engines', '定理证明器、芯片/有限元仿真与领域精确计算引擎', 'Replaces probabilistic text guessing with exact numerical solvers and formal proof checkers', '将精确数值计算、定理证明与电路时序验证交由专业求解器执行，模型专注高层搜索与归因', 'gates physical ops', '通过安全联锁门禁'),
      s('SAFETY INTERLOCK', '工业级双模安全联锁护栏', 'PLC/SCADA Read-Only Default & Hard Bounds', '工业控制默认只读隔离、参数物理包络线与双人复核', 'Prevents out-of-envelope setpoints from reaching physical actuators or regulated ledgers', '严禁模型直连底层控制总线，一切参数下发须经独立确定性物理安全包络校验与人工签批', 'records provenance', '固化全链路可复现谱系'),
      s('PROVENANCE LEDGER', '实验可复现谱系与合规存证', 'Seed, Tool Version, Dataset Hash & Sign-Off', '随机种子、求解器版本、输入快照哈希与电子签章留痕', 'Satisfies GxP, financial & engineering auditability across every autonomous iteration', '完整记录每轮推演的数据快照、仿真器版本与人类放行记录，满足医药金融与高端制造合规审计')
    ],
    [
      ['Delegate Math & Physics to Deterministic Solvers', '严禁让语言模型口算物理方程与精确工程指标', 'LLMs orchestrate hypotheses and code; domain compilers and simulators compute ground truth.', '语言模型负责提出结构假设与编写调用脚本，精确数值解与合规判定必须由专业求解器给出。'],
      ['Hardware/Physical Actuation Demands Independent Interlocks', '涉及物理设备与生产变更必须设置独立于 AI 的硬联锁', 'Deterministic safety controllers must clamp parameters even if the entire AI stack hallucinates.', '底层确定性安全控制器必须具备独立物理阈值熔断能力，确保上层智能体异常时系统绝对安全。'],
      ['Version-Lock Data, Prompts & Simulator Binaries Together', '将数据集哈希、模型配置与仿真器版本联合封存', 'Reproducible R&D requires immutable artifact lineage across thousands of automated trials.', '高通量自动科研与工程寻优必须固化完整实验谱系，确保任何高价值发现均可精确复现。']
    ]
  )
};

APPS_SPECS['workshops/agentic-commerce/live-demo'] = APPS_SPECS['workshops/agentic-commerce/index'];
APPS_SPECS['workshops/webiq-azure/live-demo'] = APPS_SPECS['workshops/webiq-azure/compare'];
APPS_SPECS['articles/agent-harness-coevolution'] = APPS_SPECS['workshops/agent-harness-coevolution/index'];
APPS_SPECS['articles/google-self-improving-harnesses'] = APPS_SPECS['workshops/google-self-improving-harnesses/index'];

module.exports = { APPS_SPECS };
