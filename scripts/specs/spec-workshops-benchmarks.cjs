'use strict';
const { stage: s, entry } = require('./policy.cjs');

const BENCH_GAME_SPECS = {
  'workshops/maf-multi-agent-benchmark/index': entry(
    'benchmarks',
    'Microsoft Agent Framework (MAF v1.0) vs LangGraph · 5 Topology Patterns, Latency Overhead & Migration Matrix',
    'Microsoft Agent Framework（MAF v1.0）与 LangGraph 架构评测工作台 · 五大编排拓扑、框架开销与选型矩阵',
    [
      s('UNIFIED SDK BASE', '微软双栈融合底座', 'Semantic Kernel + AutoGen → MAF v1.0 GA', '企业级类型安全插件治理与多智能体事件驱动编排合一', 'Unifies .NET/Python typed agent contracts, durable threads, MCP tools & OpenTelemetry spans', '整合企业强类型安全治理与多智能体协作原语，原生支持 .NET 与 Python 双生态生产交付', 'benchmarks 5 graphs', '同题评测五类经典拓扑'),
      s('5 TOPOLOGIES', '五类多智能体编排模式', 'Sequential · Concurrent · Handoff · GroupChat · Magentic', '顺序流水线、并行扇出、专员交接、群聊评审与动态规划', 'Tests identical model endpoints & prompts across MAF Workflows and LangGraph StateGraph', '锁定同一模型端点、温度与工具契约，严格对齐评测五种生产高频多智能体协作拓扑', 'measures overhead', '剥离模型时延测算净开销'),
      s('FRAMEWORK OVERHEAD', '编排净开销与并发压测', 'Serialization, Checkpoint I/O & Fan-Out Memory', '状态序列化、断点持久化耗时与高并发内存占用对比', 'Isolates pure orchestration millisecond tax, token amplification ratio & recovery reliability', '剥离远端大模型推理耗时波动，精确量化框架自身调度延迟、额外词元倍率与断点续跑可靠性', 'guides selection', '输出企业技术栈选型矩阵'),
      s('STACK SELECTION', '双生态选型与平滑迁移', '.NET/Azure Entra Native vs Python Graph Ecosystem', '.NET/Entra 深度集成优势对比 Python 复杂自定义图生态', 'Clear decision matrix for Semantic Kernel/AutoGen upgrades and hybrid A2A interoperability', '给出存量框架平滑升级路径，以及跨 .NET 核心业务服务与 Python 算法服务的协议互通方案')
    ],
    [
      ['Compare Topologies First, Frameworks Second', '编排拓扑选型对成本时延的影响远大于框架差异', 'GroupChat/Magentic multiply token spend 3×–6× over deterministic Sequential/Concurrent graphs.', '多轮自由群聊与动态重规划会成倍放大词元与时延开销，能用确定性有向图解决的切勿泛化为自由博弈。'],
      ['MAF v1.0 Closes the Enterprise .NET + Azure Governance Gap', 'MAF v1.0 补齐 .NET 主力企业的原生智能体治理底座', 'First-class C#/Python parity, Entra identity propagation, and Foundry tracing cut enterprise glue code.', '提供一等公民级的双语言对等能力、企业身份透传与全链路追踪，大幅减少自研安全胶水层。'],
      ['Interoperate Across Frameworks via MCP & A2A Boundaries', '跨团队异构技术栈通过标准工具与智能体协议解耦互通', 'Expose Python LangGraph specialists and .NET MAF workflows over typed HTTP/A2A contracts.', '无需强求全公司单一开发语言，通过标准化远程契约实现异构子智能体安全协同。']
    ]
  ),
  'workshops/maf-multi-agent-benchmark/monograph': entry(
    'benchmarks',
    'MAF v1.0 Architecture Monograph · Execution Engine, Typed Workflow Graphs, Checkpointing & Foundry Integration',
    'MAF v1.0 深度架构白皮书 · 强类型工作流引擎、消息路由、状态检查点与可观测性内幕',
    [
      s('AGENT ABSTRACTION', '统一智能体与会话契约', 'ChatClientAgent, Threads & Middleware Pipeline', '标准智能体接口、会话线程生命周期与拦截器管线', 'Decouples model providers from cross-cutting auth, logging, rate-limit & guardrail middleware', '将底层模型适配器与鉴权、限流、审计日志及安全内容过滤中间件彻底解耦', 'wires workflow DAG', '编排强类型工作流图'),
      s('WORKFLOW ENGINE', '有向图与事件驱动执行内核', 'Typed Executors, Fan-Out/In & Conditional Edges', '强类型执行节点、并行聚合屏障与条件分支路由', 'Combines deterministic workflow steps with dynamic LLM handoffs inside one execution runtime', '在同一运行时内无缝融合确定性业务代码节点与大模型动态路由交接节点', 'persists checkpoints', '落盘超级步状态快照'),
      s('SUPERSTEP STATE', '超级步检查点与人机协同', 'Checkpoint Store, RequestPort & Resume Replay', '边界状态持久化、外部人工审批挂起端口与精确恢复', 'Serializes graph state at superstep boundaries for zero-loss human-in-the-loop pause/resume', '在每个执行超步边界持久化上下文快照，优雅支撑跨小时人工审批挂起与故障无损续跑', 'emits OTel traces', '输出标准分布式遥测'),
      s('OBSERVABILITY', 'OpenTelemetry 语义追踪与评估', 'GenAI Semantic Conventions & Azure Monitor', '标准化调用链跨度、词元归因账本与线上质量监控', 'Emits vendor-neutral GenAI OTel spans across nested agents, tools, and checkpoint restores', '遵循开放语义规范输出跨层级智能体与工具调用耗时及词元消耗，直连企业监控大盘')
    ],
    [
      ['Hybrid Deterministic + Agentic Graphs Beat Pure Autonomy', '确定性主干流程嵌套局部智能体节点是最佳生产形态', 'Keep schema validation, routing gates, and DB writes in typed code executors.', '将参数校验、分支门禁与核心落库固化在强类型代码节点，仅在非结构化推理环节调用模型。'],
      ['RequestPort Solves Long-Running Approval Blocking', '使用异步挂起端口替代长连接阻塞等待人工审批', 'Dehydrate workflow state to durable storage while waiting hours for human sign-off.', '审批等待期间释放计算工作线程并将状态脱水落盘，回调到达后再按检查点精确唤醒。'],
      ['Adopt GenAI OpenTelemetry Conventions From Day One', '立项首日即接入标准化多智能体全链路追踪', 'Multi-agent debugging is impossible without correlated trace IDs per turn and tool invocation.', '多智能体死循环与耗时毛刺极难肉眼排查，必须强制透传关联追踪标识与单节点词元账本。']
    ]
  ),
  'workshops/maf-multi-agent-benchmark/test-report': entry(
    'benchmarks',
    'MAF v1.0 Controlled Benchmark Test Report · Reproducible Harness, Latency Distributions & Failure Taxonomy',
    'MAF v1.0 对照基准评测报告 · 测试床方法论、端到端时延分位数、词元倍率与失败模式拆解',
    [
      s('CONTROLLED RIG', '受控同源评测测试床', 'Locked Model, Temperature=0 & Mock/Live Tools', '固定底层模型版本、零随机温度与受控确定性工具桩', 'Eliminates network/endpoint variance to measure true orchestration behavior across N repeats', '控制模型侧变量并通过确定性工具桩与真实接口双轨重复实验，剥离外部网络抖动干扰', 'runs task suite', '执行多复杂度任务集'),
      s('WORKLOAD MATRIX', '五类复杂度任务评测矩阵', 'Triage · Parallel RAG · Handoff · Code Review · Plan', '意图分流、并行检索合成、多专员交接与动态重规划', 'Evaluates schema compliance, tool-call precision, turn count & completion accuracy', '全面采集各拓扑在结构化输出合规率、工具调用精确率、交互轮次与最终任务达成率上的表现', 'profiles latency', '拆解分位数时延与成本'),
      s('LATENCY & TOKENS', 'P50/P95 时延与词元放大系数', 'Wall-Clock ms, Prompt Re-Read Tax & Memory MB', '端到端耗时、历史上下文重复重读税与常驻内存开销', 'Quantifies how shared-history chat topologies inflate prompt input tokens quadratically', '定量揭示全量共享对话历史如何随轮次平方级推高输入词元账单与首字排队时延', 'hardens production', '提炼生产加固准则'),
      s('FAILURE & TUNING', '典型失效模式与调优处方', 'Handoff Ping-Pong, Max-Turn Caps & Context Pruning', '交接乒乓死循环拦截、最大轮次熔断与上下文裁剪策略', 'Actionable guardrails for bounding autonomous loops and right-sizing checkpoint intervals', '针对专员推诿循环、并行最慢节点拖尾与检查点频繁序列化提供可直接落地的调优参数')
    ],
    [
      ['Shared Chat History Inflates Input Tokens Quadratically', '多专员共享全量历史会导致输入词元呈平方级膨胀', 'Pass concise structured handoff summaries between specialists instead of full raw transcripts.', '跨专员交接应传递结构化任务摘要契约而非拼接完整原始对话流，可削减逾六成冗余输入词元。'],
      ['Enforce Hard Turn & Cost Circuit Breakers on Dynamic Loops', '一切动态路由与重规划拓扑必须配置硬性轮次与预算熔断', 'Unbounded Handoff or GroupChat graphs risk runaway loops on ambiguous edge-case inputs.', '面对模糊输入时动态交接极易陷入往复推诿，生产环境必须设置最大跳数上限与降级兜底路径。'],
      ['Concurrent Fan-Out Tail Latency Tracks the Slowest Branch', '并行扇出拓扑的端到端耗时取决于最慢分支尾延迟', 'Pair parallel sub-agents with per-branch timeouts and partial-result graceful degradation.', '并行调用多路专家智能体时必须为单路分支设置独立超时与局部降级合成策略，防止单点拖垮全局。']
    ]
  ),
  'workshops/faf-vs-agent-forge/index': entry(
    'benchmarks',
    'FAF vs Agent-Forge Multi-Agent Architecture Evaluation · Orchestration Ergonomics, Verification & Asset Generation',
    'FAF 与 Agent-Forge 多智能体工程对比评测 · 编排原语、确定性校验闭环与复杂视觉代码生成实测',
    [
      s('TASK CHALLENGE', '复杂多步工程评测标的', 'SVG/Canvas Motion Synthesis & Multi-File Codegen', '高精度几何动画合成与多模块代码协同生成任务', 'Tests spatial layout math, iterative visual critique & syntax/runtime self-repair', '选取对空间坐标精度、多轮审美自检与运行零报错要求极高的程序化视觉生成任务作为试金石', 'compares harnesses', '双运行框架同题对决'),
      s('ORCHESTRATION DIFF', '双框架控制流机制对标', 'Lightweight Pipeline (FAF) vs Multi-Role Forge', '轻量显式阶段流水线对比多角色分工审议锻造架构', 'Compares prompt-routing simplicity against planner-coder-critic iterative refinement loops', '对比极简确定性阶段编排与“规划师—编码员—质检员”多角色多轮博弈修正的架构差异', 'verifies artifacts', '通过无头渲染断言核验'),
      s('HEADLESS CRITIQUE', '无头浏览器渲染与确定性门禁', 'DOM BBox Audit, Console Zero-Error & Frame Check', '真实浏览器边界框裁剪检测、零异常断言与关键帧抽检', 'Catches off-canvas clipping, NaN transforms & blank frames that code-only review misses', '通过真实浏览器执行并采集几何边界与控制台报错，精准捕获纯代码静态审阅无法发现的画面崩坏', 'distills trade-off', '总结复杂度与收益边界'),
      s('ROI TRADE-OFF', '质量增益与词元耗时性价比', 'Single-Pass Fast Track vs Multi-Turn Forge Gate', '简单任务单通直出、高价值复杂交付物启用多轮审校', 'Establishes complexity threshold justifying 2.5×–4× multi-agent review latency and cost', '明确何种任务复杂度值得付出数倍词元与时延代价开启多角色视觉回环精修')
    ],
    [
      ['Visual & UI Codegen Requires Rendered DOM/Pixel Feedback', '前端与可视化代码生成必须引入真实渲染执行反馈', 'Text-only critic agents hallucinate geometry; headless bounding-box checks provide ground truth.', '纯文本代码审阅智能体极难心算复杂坐标重叠，结合浏览器几何检测才能实现有效自修复。'],
      ['Right-Size Multi-Agent Ceremony to Deliverable Stakes', '按交付物容错等级动态匹配单通流水线或多轮锻造', 'Avoid heavy multi-critic loops on routine CRUD; reserve them for customer-facing hero assets.', '常规脚手架生成采用轻量单通模式保时延，高管演示与核心交互资产再启用多轮质检闭环。'],
      ['Structured Critique Rubrics Beat Vague "Make It Better" Loops', '结构化量化缺陷清单远优于模糊的主观打磨指令', 'Critics must emit exact coordinate/selector defects so coder turns converge in ≤2 retries.', '质检角色必须输出具体越界元素选择器与数值偏差，确保修复轮次快速收敛而不发散。']
    ]
  ),
  'workshops/terminal-bench/index': entry(
    'benchmarks',
    'Terminal-Bench 2.0 (89 Tasks) · gpt-5.3-codex vs Gemini 4 Carbon & Hydrogen on Copilot CLI v1.0.21',
    'Terminal-Bench 2.0（89 题全量盲测）· Copilot CLI 三大模型终端系统工程与排障基准对比',
    [
      s('SEALED HARNESS', '89 题容器化终端盲测床', 'Docker Isolated Linux/C/Git/SysAdmin Suite', '真实容器环境编译构建、系统排障、网络与内核修复全集', 'Zero test-file visibility; scored strictly by post-run pytest verification scripts inside container', '智能体不可见评分测试脚本，完全依据规定时限后容器真实文件状态与服务探针通过率硬核判分', 'benchmarks 3 models', '同运行框架横向对比三模型'),
      s('COHORT RESULTS', '同 CLI 底座三模型实测分野', 'gpt-5.3-codex vs Gemini 4 Carbon & Hydrogen', '锁定 Copilot CLI v1.0.21 评测准确率、步数与超时率', 'Compares shell command precision, long-horizon debugging persistence & recovery from bad edits', '定量对比各前沿模型在原生命令行探查、复杂编译错误逆向定位及误操作回滚上的真实胜率', 'diagnoses failures', '拆解失分根因分类谱'),
      s('FAILURE TAXONOMY', '终端智能体典型失分归因', 'Premature Exit, Interactive Hang & Dirty State', '未验证提前交卷、交互式命令挂死与环境残留污染', 'Highlights why missing final verification checks and interactive pagers sink autonomous runs', '揭示未跑端到端自检即宣告完成、误触发阻塞式交互命令与超时耗尽是三大核心失分主因', 'informs routing', '指导研发智能体模型选型'),
      s('ARCHITECT ROUTING', '软件工程智能体分层选型策略', 'Interactive Dev Speed vs Deep Autonomous Repair', '日常低延迟交互编码与高难度无人值守系统修复分工', 'Pairs fast low-latency models for interactive CLI turns with high-compute codex tiers for hard bugs', '日常高频问答与小步编辑优先高响应速度模型，跨层构建排障与遗留系统迁移调度深度编码模型')
    ],
    [
      ['End-to-End Verification Before Exit Separates Top Models', '退出前主动执行真实端到端核验是拉开胜率的分水岭', 'Models that test actual service ports, binaries, and edge inputs avoid silent partial-fix failures.', '高分模型在修改配置或源码后均会主动拉起服务并构造边界输入实测，杜绝“看似改完实则未通”。'],
      ['Non-Interactive CLI Flags Are Mandatory Harness Hygiene', '运行框架必须默认注入非交互防挂起环境变量与参数', 'Disable pagers/prompts (`--no-pager`, `DEBIAN_FRONTEND=noninteractive`) to prevent timeout hangs.', '统一注入免分页与非交互安装标志，可消除大量非能力问题导致的容器挂死超时。'],
      ['Identical CLI Harness Isolates True Model Execution Grit', '锁定同一 CLI 工具集才能测出模型真实工程韧性', 'Holding Copilot CLI v1.0.21 constant exposes genuine differences in multi-step shell planning.', '剥离外围脚手架差异后，模型在数十步受挫回溯中的假设收敛效率得以客观量化呈现。']
    ]
  ),
  'workshops/github-trending-radar/r500-enterprise-agent-finops-workbench': entry(
    'radar',
    'Enterprise Agent FinOps & Token Governance Workbench · Prompt Caching, Tiered Routing & Chargeback',
    '企业级智能体 FinOps 与词元成本治理工作台 · 前缀缓存、多模型分级路由与部门分摊门禁',
    [
      s('COST DRIVERS', '智能体词元膨胀根因剖析', 'Multi-Turn Re-Read, Tool Schemas & Retry Loops', '多轮历史重读、庞大工具定义与异常重试导致的账单激增', 'Shows how 20-turn agent sessions spend 85%+ of budget re-reading static prefixes and tool logs', '拆解长周期智能体会话中超八成费用消耗于重复读取静态系统指令、工具模式与冗长检索原文', 'applies 3 levers', '实施三层技术降本杠杆'),
      s('OPTIMIZATION LEVERS', '三大工程降本增效机制', 'Prompt Cache (50–90% Off) + Tiered Router + Trim', '确定性前缀缓存对齐、难易分级模型路由与工具结果瘦身', 'Stabilizes prompt prefixes for cache hits, routes routine turns to SLMs/mini tiers & prunes payloads', '固定静态前缀顺序以吃满缓存折扣，将分类提取分流至轻量模型，并截断超长工具返回体', 'enforces quotas', '建立多租户配额与熔断'),
      s('QUOTA & CIRCUIT', '多租户预算配额与死循环熔断', 'Gateway TPM/USD Caps & Per-Session Spend Ceiling', '网关级部门月度配额、单会话金额上限与异常循环秒级熔断', 'Prevents a single runaway autonomous loop from exhausting shared enterprise PTU/pay-go quota', '在统一模型网关层实施租户级并发配额与单次任务最大消费硬顶，阻断死循环打爆企业共享额度', 'attributes ROI', '闭环业务价值财务对账'),
      s('UNIT ECONOMICS', '单笔成功业务动作成本账本', '$/Resolved Ticket vs $/1M Raw Tokens', '从裸词元单价转向“单次成功完结工单综合成本”核算', 'Tracks cost-per-successful-outcome alongside latency SLA and fallback escalation rates', '以单笔成功业务闭环成本为核心北极星指标，防止过度压缩模型档位反而因重试失败推高总成本')
    ],
    [
      ['Keep Static Tools & Instructions Prefix-Byte-Identical', '严禁在系统前缀头部拼入动态时间戳破坏前缀缓存', 'Injecting dynamic timestamps at index 0 invalidates prompt caching across every agent turn.', '将动态时间与用户态变量统一后置到消息尾部，确保静态指令与工具列表持续稳定命中前缀缓存。'],
      ['Optimize Cost per Successful Task, Not Cost per Token', '切勿为省单价盲目降级模型导致多轮重试总价倒挂', 'A cheap model failing 3 times with huge context costs more than 1 clean pass on a capable tier.', '弱模型反复报错重试引发的上下文累加开销往往高于强模型一次通过，需按任务成功率综合算账。'],
      ['Enforce Per-Run Token Ceilings at the AI Gateway', '生产网关必须同时卡控全局速率与单会话累计金额上限', 'Global TPM limits do not stop slow multi-hour loops; cap cumulative spend per correlation ID.', '单纯全局速率限制防不住慢速持续空转，必须按任务追踪号强制设置累计词元与金额熔断线。']
    ]
  ),
  'articles/harness-engineering': entry(
    'agentic',
    'Harness Engineering Field Guide · Environment Design, Deterministic Guardrails & Context Economics',
    '智能体运行框架（Harness Engineering）实战指南 · 环境感知原语、确定性护栏与上下文经济学',
    [
      s('INTERFACE DESIGN', '面向智能体的环境接口设计', 'Ergonomic CLI/File Tools & Actionable Errors', '高内聚文件命令原语与自带修复线索的结构化报错契约', 'Designs workspace layout, search tools & linter messages specifically for LLM comprehension', '从模型读写习惯出发设计目录索引、分页输出与精准行列报错，大幅减少无效盲目探测步数', 'bounds context', '精细化管理上下文窗口'),
      s('CONTEXT BUDGET', '工作记忆预算与渐进式披露', 'Progressive Skill Loading & Artifact Offload', '按需渐进加载技能文档与中间长产物文件系统落盘', 'Loads domain playbooks just-in-time rather than stuffing 50KB of rules into every turn', '采用薄路由索引配合按需加载专精技能，避免全量规范长驻系统提示词稀释当前任务注意力', 'wires verification', '构建多层自动化校验闭环'),
      s('FAST FEEDBACK', '毫秒至秒级分层验证闭环', 'Syntax/Type Gate → Scoped Unit Test → E2E Smoke', '静态语法类型秒级拦截、增量单测与端到端冒烟递进验证', 'Gives agents fast local truth within seconds instead of waiting 20 minutes for CI failure', '提供数秒内即可返回结果的局部增量验证命令，使智能体在本地闭环修复绝大多数逻辑缺陷', 'governs safety', '施加最小权限与审批边界'),
      s('TRUST BOUNDARY', '最小权限沙箱与不可逆操作门禁', 'Scoped Credentials, Diff Review & Git Hygiene', '隔离工作树、受限凭据注入与外部高危变更显式授权', 'Allows high-velocity local iteration inside isolated worktrees while gating shared pushes/APIs', '在独立工作树与受控容器内放开高频读写自测，对远端推送、生产写库与外发动作严格设卡')
    ],
    [
      ['Good Harnesses Look Like Great Developer Tooling', '优秀的智能体底座本质上是极致清晰的软件工程基础设施', 'Fast incremental tests, clean repo maps, and deterministic linters lift both humans and agents.', '秒级增量测试、清晰的模块化边界与严格的静态检查，对人类工程师与智能体具备完全同构的提效价值。'],
      ['Progressive Disclosure Beats Monolithic System Prompts', '按需渐进式技能注入远胜于塞满万字大一统提示词', 'Keep always-on instructions concise; load specialized domain schemas only when triggered.', '常驻指令只保留全局红线与目录地图，具体领域规程通过技能工具在命中任务时动态按需挂载。'],
      ['Isolate Blast Radius via Git Worktrees & Ephemeral Sandboxes', '用独立工作树与临时沙箱换取无人值守执行自由度', 'Isolation lets autopilot loops run boldly without risking shared branches or host state.', '物理或版本树隔离消除了误改主干顾虑，让智能体得以在不频繁打断人类的前提下完成完整闭环。']
    ]
  )
};

module.exports = { BENCH_GAME_SPECS };
