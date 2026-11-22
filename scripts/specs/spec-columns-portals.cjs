'use strict';
const { stage: s, entry } = require('./policy.cjs');

const SPECS = {
  'studio/archive': entry(
    'benchmarks',
    'Bilingual Engineering Asset Index · Track Routing & Provenance Ledger',
    '双语工程资产总目录 · 八大赛道索引与版本溯源台账',
    [
      s('ASSET REGISTRY', '资产注册表', 'Locale Pair Registry', '双语版本映射注册表', 'site-localization.json · 1:1 EN/ZH static counterparts', 'site-localization.json · 中英文静态页面一一映射', 'classifies into', '归类至'),
      s('8 CORE TRACKS', '八大工程赛道', 'Domain Track Routing', '领域赛道分类路由', 'Data · AI Infra · Commerce · Voice · Benchmarks · Visual · Game · Security', '数据湖仓 · AI 算力 · 商务 · 语音 · 基准评测 · 视觉 · 游戏 · 安全', 'indexes metadata', '构建检索索引'),
      s('CLIENT SEARCH', '离线全文检索', 'Static Search & Tag Filter', '静态检索索引与标签过滤', 'search-index.js · zero-backend client lookup across all pages', 'search-index.js · 零后端纯客户端跨赛道检索', 'verifies links', '核验路由可达性'),
      s('PROVENANCE GATE', '证据与溯源核验', 'Sealed Reports & Live Labs', '封存评测与交互工作台分发', 'Separates measured benchmarks, translated editions & synthetic PoCs', '区分实测基准卡组、译本归档与确定性架构沙盘')
    ],
    [
      ['1:1 Locale Parity', '中英双语全量对齐', 'Every indexed route resolves to an explicit English and Chinese static HTML edition.', '目录内全部路由均具备显式中英文静态页面映射，避免半翻译页面。'],
      ['Artifact Type Separation', '资产形态分层标注', 'Distinguishes architecture guides, interactive sizing sandboxes, and 7-card benchmark decks.', '明确区分架构选型指南、交互定容工作台与 7-Card 基准测试报告。'],
      ['Zero-Backend Portability', '零后端静态可移植', 'Search index and navigation metadata compile statically with deterministic link checks.', '检索索引与导航元数据全静态编译，通过确定性断链与主题巡检。']
    ]
  ),
  'benchmarks': entry(
    'benchmarks',
    'Model & Agent Benchmark Center · Sealed Harness, Verifiers & 7-Card Reports',
    '模型与智能体基准评测中心 · 封存负载、确定性校验器与 7-Card 报告矩阵',
    [
      s('WORKLOAD COHORT', '评测负载与队列', '21-Model & Infra Suites', '21 模型与基础设施评测集', 'Routing · Coding Agents · MAF v1.0 · Terminal-Bench 4.1 · LLM PD Serving', '路由决策 · 编码智能体 · MAF v1.0 · Terminal-Bench 4.1 · PD 分离推理', 'executes under', '注入统一契约'),
      s('HARNESS CONTRACT', '执行契约层', 'Fixed Prompt & Tool Sandbox', '固定提示词与隔离工具沙箱', 'Identical token budgets, Docker/E2B isolation & temperature controls', '统一上下文预算、容器/沙箱隔离边界与采样温度参数', 'validates via', '经校验器核验'),
      s('VERIFIER ENGINE', '确定性校验层', 'AST / Test / Schema Verifiers', '单元测试与结构化契约校验', 'Pass@1 test suites, calibration ECE, P50/P99 latency & missing-value ledger', 'Pass@1 测试集、ECE 校准误差、P50/P99 时延与缺失值台账', 'renders into', '汇总输出为'),
      s('DECISION ARTIFACTS', '选型决策产物', '7-Card Decks & Pareto Sizers', '7-Card 报告与帕累托选型台', 'Cost-vs-accuracy frontier, option-reversal robustness & deployment fit', '成本—准确率帕累托前沿、选项反转稳健性与适用场景边界')
    ],
    [
      ['Denominator Integrity', '分母与缺失值透明', 'All pass rates, token counts, and latency bars preserve exact cohort denominators.', '所有通过率、词元消耗与延迟对比均保留完整样本分母与未复测标注。'],
      ['Perturbation & Calibration', '抗扰动与校准检验', 'Evaluates option-order reversal, prompt perturbation, and confidence threshold gating.', '同步检验选项顺序反转、提示词扰动与置信度门控下的稳定性。'],
      ['SA Selection Mapping', '架构选型直接落地', 'Maps benchmark trade-offs to routing tiers, GPU SKUs, and human-escalation thresholds.', '将评测指标直接映射至模型分层路由、GPU 卡型定容与人工兜底阈值。']
    ]
  ),
  'github-radar': entry(
    'benchmarks',
    'GitHub AI Open-Source Radar · Daily Velocity Ingestion, Hype/Facts/Signal Triage & SA Actions',
    'GitHub AI 开源评估面板 · 每日增速采集、Hype/Facts/Signal 过滤与架构师行动项',
    [
      s('DAILY INGESTION', '多源趋势采集', 'GitHub Trending & Velocity Feed', 'GitHub 热榜与星标增速流', 'Daily top AI repos + fastest-rising star-velocity leaderboard', '每日热门 AI 仓库与单日星标增速最快榜单双轨采集', 'extracts evidence', '提取技术事实'),
      s('EVIDENCE PARSER', '仓库结构解析', 'License, Stack & Runtime Audit', '许可证、依赖栈与运行时审计', 'Inspects README claims vs actual code, kernels, licenses & cloud dependencies', '核对仓库宣称能力与实际代码、算子实现、开源协议及云依赖', 'scores via HFS', '执行三段降噪'),
      s('HFS TRIAGE', 'HFS 信号评分', 'Hype / Facts / Signal Filter', 'Hype / Facts / Signal 评分矩阵', 'Interactive weight sliders separating marketing noise from reusable primitives', '可调权重滑块剥离宣传噪音，量化工程成熟度与复用信号', 'routes to P0/P1', '输出优先级建议'),
      s('SA ACTIONING', '架构落地评估', 'P0/P1 PoC & Enterprise Fit', 'P0/P1 验证清单与企业适配', 'Maps high-signal repos to Azure/Foundry integration, security review & PoCs', '输出值得深潜复现的 P0/P1 仓库、企业合规边界与集成路径')
    ],
    [
      ['Dual-Track Discovery', '总量与增速双榜单', 'Tracks both overall trending repositories and highest daily star-velocity breakouts.', '同时覆盖总榜高热项目与单日增速最快的新兴基础设施仓库。'],
      ['Hype-to-Signal Deconstruction', 'Hype/Facts/Signal 降噪', 'Evaluates factual architecture mechanics before recommending SA study time.', '先拆解工程事实与许可证约束，再判定是否值得投入 PoC 验证。'],
      ['Enterprise Readiness Lens', '企业生产准入视角', 'Flags auth, multi-tenancy, observability, and license blockers prior to adoption.', '前置识别身份认证、多租户隔离、可观测性与开源协议风险。']
    ]
  ),
  'openrouter': entry(
    'infra',
    'OpenRouter Model Routing & Token Telemetry · Usage Share, Pricing Tiers & Failover Policy',
    'OpenRouter 模型路由与词元遥测 · 调用份额、价格分层与多提供商容灾策略',
    [
      s('TELEMETRY STREAM', '聚合遥测输入', 'Global Token & App Share', '全网词元消耗与应用调用分布', 'Weekly token volume, coding vs agentic workload share & context length buckets', '周度词元吞吐、编码与智能体负载占比及上下文长度分布', 'normalizes tiers', '归一化成本与延迟'),
      s('MODEL TIERING', '模型能力与成本分层', 'Frontier vs Efficient Cohort', '前沿推理层与高性价比执行层', 'Input/output $/1M tokens, prompt caching discount & TTFT/TPOT envelopes', '百万词元输入输出单价、前缀缓存折扣与首字/解码时延区间', 'drives router', '驱动分层路由'),
      s('ROUTING POLICY', '网关路由与回退', 'Cascade & Provider Failover', '复杂度分级路由与多活回退', 'Confidence-gated escalation, schema adherence check & multi-endpoint retry', '按任务复杂度与置信度升档，跨推理提供商健康探测与自动切换', 'optimizes FinOps', '输出成本治理结论'),
      s('SA FINOPS', '单元经济治理', 'Blended $/Task Optimization', '单任务综合词元成本优化', 'Balances frontier reasoning pass rate against high-throughput worker cost', '在复杂规划通过率与高频工具调用成本之间建立最优配比')
    ],
    [
      ['Demand Signal vs Benchmark Score', '真实调用量对照跑分', 'Cross-checks synthetic leaderboard ranks against sustained production token share.', '用生产环境持续词元留存率交叉检验静态基准榜单排名。'],
      ['Two-Tier Cascade Economics', '规划/执行双层路由', 'Pairs frontier planners with quantized/flash workers plus prefix-cache reuse.', '以旗舰模型承担规划与审查、轻量模型承担高频子任务并叠加前缀缓存。'],
      ['Multi-Provider Resilience', '跨推理商容灾解耦', 'Mitigates regional rate-limit spikes via unified OpenAI-compatible gateway routing.', '通过统一协议网关规避单一提供商限流（429）与区域可用性抖动。']
    ]
  ),
  'opensource': entry(
    'benchmarks',
    'Open-Source Engineering Repositories · Benchmark Harnesses, Infra Playbooks & Skill Packs',
    '开源工程仓库矩阵 · 基准评测框架、云基础设施手册与可复用技能包',
    [
      s('INFRA & DATA', '算力与数据底座仓库', 'ai-infra-research & Data Labs', 'AI 基础设施与数据湖仓研究库', 'PD disaggregation sizers, RDMA/RoCEv2 FAQs, Fabric × Databricks PoC kits', 'PD 分离定容计算器、RDMA/RoCEv2 选型指南与湖仓协同沙盘', 'standardizes evals', '沉淀评测工具链'),
      s('EVAL HARNESS', '基准评测工程库', 'benchmark-harness-engineering', '模型与智能体基准评测工程库', 'Sealed summary.json schemas, deterministic verifiers & 7-card HTML generator', '密封 summary.json 规范、确定性校验器与 7-Card 报告生成器', 'packages skills', '封装可复用契约'),
      s('AGENT HARNESS', '智能体工程与技能包', 'Skills, MAF & Guardrail Kits', '架构师技能包与安全护栏组件', '120-skill progressive loading audit, Azure deployment IaC & MCP tool contracts', 'Skills 渐进加载治理、Azure Bicep/Terraform 模板与 MCP 契约', 'publishes to', '同步发布至'),
      s('LIVE PORTAL', '双语在线验证门户', 'Kee-Tech-Assets Static Hub', '双语静态技术资产门户', 'Main-branch bilingual docs, runnable H5 workbenches & automated CI checks', '主分支中英双语文档、离线可交互工作台与 19 项自动化质量门禁')
    ],
    [
      ['Code-Backed Research', '研究结论附带可运行代码', 'Every published architecture guide maps to an open GitHub repository with scripts or IaC.', '每份架构研究均对应公开代码库、定容脚本或基础设施即代码模板。'],
      ['Reproducible Schemas', '统一评测与构建规范', 'Shared JSON schemas enforce zero fabricated metrics across benchmark decks.', '统一数据契约确保所有可视化图表坐标源自密封实测或显式公式。'],
      ['MIT Reusable Primitives', '模块化组件可直接复用', 'Architects can fork standalone sizers, Bicep modules, and evaluation runners directly.', '合作伙伴与客户工程团队可直接独立复用计算器、部署模板与评测脚本。']
    ]
  ),
  'projects': entry(
    'infra',
    'Solution Architecture Project Portfolio · Cloud AI Landing Zones, Lakehouse & Agent Systems',
    '解决方案架构项目集 · 企业级 AI 着陆区、湖仓一体与多智能体生产系统',
    [
      s('DATA & ONTOLOGY', '数据底座与业务本体', 'Fabric × Databricks Lakehouse', 'Fabric 与 Databricks 零拷贝湖仓', 'OneLake shortcuts/mirroring, Unity Catalog governance & Fabric IQ ontology', 'OneLake 零拷贝镜像、Unity Catalog 治理与业务实体本体建模', 'powers runtime', '支撑智能体运行时'),
      s('AGENT RUNTIME', '智能体编排与沙箱', 'Foundry, MAF & E2B/AKS Sandboxes', 'Foundry 编排与强隔离执行沙箱', 'Multi-agent workflows, MCP/A2A tool protocols & Kata/MicroVM code isolation', '多智能体状态编排、MCP/A2A 协议集成与微虚机沙箱隔离', 'optimizes serving', '协同算力与边缘端'),
      s('SERVING & EDGE', '云边推理与语音链路', 'PD Serving, Duplex Voice & NPU', 'PD 分离推理、实时语音与端侧 NPU', 'vLLM/SGLang sizing, 6-locale voice CS (<800ms) & Foundry Local ONNX/GGUF', '推理集群定容、6 语种低延迟语音客服与 Copilot+ PC 端侧推理', 'enforces security', '落实安全与成本治理'),
      s('GOVERNANCE', '安全防线与 FinOps', 'Entra OBO, Purview & Token ROI', '统一身份透传、数据防泄漏与成本治理', 'Scoped OBO tokens, prompt-shield policy gates, C2PA provenance & GPU FinOps', 'Entra 最小权限令牌、提示注入拦截、内容溯源与百万词元成本核算')
    ],
    [
      ['Control Plane vs Data Plane Clarity', '控制面与数据面解耦', 'Separates identity/policy orchestration from high-throughput lakehouse and GPU planes.', '清晰划分身份策略控制面与高吞吐湖仓存储、GPU 推理数据面边界。'],
      ['Runnable Customer PoCs', '面向客户的端到端验证', 'Validates reference architectures through Consumer Electronics, Zava, Travel Retail, and Voice PoCs.', '通过消费电子渠道、冷链生鲜、国际旅购与出海硬件语音等真实场景验证。'],
      ['Quantified SLA & TCO Trade-offs', '量化延迟与成本权衡', 'Documents P99 latency bounds, sandbox density, and DBU/CU/GPU unit economics.', '提供明确的 P99 时延边界、并发沙箱密度及算力/容量单元成本账本。']
    ]
  ),
  'writing': entry(
    'benchmarks',
    'Technical Monographs & Architecture Guides · Agent Harness, AI Infra & Enterprise Patterns',
    '技术专著与架构选型指南 · Agent Harness 工程化、AI 算力底座与企业落地模式',
    [
      s('HARNESS DESIGN', 'Harness 工程理论与演进', 'Context Budget & Dual-Loop Gates', '上下文预算治理与双环自进化门控', '120-skill progressive loading, 12 KB cliff remediation & regression-gated evolution', '120 Skills 渐进披露、12 KB 截断修复与防退化基准门控', 'extends to frameworks', '扩展至编排框架'),
      s('MULTI-AGENT', '多智能体框架选型', 'MAF v1.0 & Coding Suites', 'MAF v1.0 与六大框架横向对比', 'Middleware pipelines, checkpointing, MCP/A2A interop & 17–21 model coding audits', '中间件管线、状态持久化、MCP/A2A 互操作与编码智能体实测', 'grounds on infra', '下沉至算力与网络'),
      s('INFRA & NETWORK', '推理引擎与智算网络', 'PD Disaggregation & RoCEv2/IB', 'PD 分离推理、MoE 量化与无损网络', 'Dynamo/Mooncake KV transfer, FP8/MXFP4 MoE & optical/RoCEv2 selection FAQs', '跨机 KV 传输带宽、FP8/MXFP4 量化精度与光互连/RoCEv2 选型指南', 'applies to domains', '映射至行业场景'),
      s('DOMAIN PLAYBOOKS', '垂直领域落地方案', 'Security, Commerce, Voice & Visual', '安全着陆区、智能体商务与多模态管线', 'Kill-chain containment, ACP/AP2 payment rails, duplex voice & deterministic AIGC', '攻击链熔断、受控支付护栏、双工语音架构与可编程视觉合成管线')
    ],
    [
      ['Decision-First Structure', '面向选型决策的写作结构', 'Organizes articles around failure cliffs, protocol trade-offs, and selection matrices.', '围绕朴素方案失效悬崖、协议边界对比与选型决策矩阵组织正文。'],
      ['Paired With Interactive Labs', '长文与交互沙盘联动', 'Core monographs link directly to runnable H5 calculators and 7-card evidence decks.', '核心技术长文均配套可交互参数推演工作台与 7-Card 数据卡组。'],
      ['Bilingual Main-Branch Sync', '中英双语主干同步维护', 'Maintains full technical fidelity across both Chinese and English editions.', '中英文版本保持一致的工程术语、公式推导与量化指标口径。']
    ]
  )
};

module.exports = { SPECS };
