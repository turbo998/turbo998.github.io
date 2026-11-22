'use strict';
const { stage: s, entry } = require('./policy.cjs');

const DATA_SPECS = {
  'workshops/data-lab/index': entry(
    'data-infra',
    'Enterprise Lakehouse & AI Platform Workbench · Microsoft Fabric vs Databricks, Snowflake, BigQuery & AWS',
    '企业数据湖仓与 AI 平台选型工作台 · Microsoft Fabric 与 Databricks、Snowflake、GCP、AWS 五方对比',
    [
      s('STORAGE & FORMAT', '开放表格式与零拷贝底座', 'OneLake Delta / Iceberg Interop', 'OneLake 开放表格式与跨引擎互操作', 'Compares shared Delta Parquet, UniForm/XTable metadata translation & cross-cloud egress taxes', '对比开放湖仓单份存储多引擎共享、Delta/Iceberg 元数据互译与跨云数据出网成本', 'federates governance', '统一目录与权限治理'),
      s('CATALOG & SECURITY', '元数据目录与行级安全', 'OneLake Security, Purview & Unity Catalog', '目录镜像同步、行列级权限与血缘审计', 'Evaluates fine-grained RLS/CLS consistency across SQL, Spark, BI & AI retrieval planes', '核验跨 Spark 批流加工、数据仓库、BI 报表与智能体检索的统一行列级权限继承边界', 'powers AI/ontology', '绑定语义本体与智能体'),
      s('SEMANTIC & AGENT', '业务语义层与数据智能体', 'Fabric IQ Ontology vs AI/BI Genie vs Cortex', '业务实体本体建模对比自然语言 SQL 与智能体', 'Tests multi-table join accuracy, business metric lock & write-back operational triggers', '对比语义模型/本体驱动的业务指标一致性、多表归因准确率及向下游系统回写执行能力', 'models TCO', '测算容量与按量成本'),
      s('FINOPS & COEXIST', '容量池化计费与共生模式', 'Pooled F-SKU CU vs DBU / Credits & Zero-Copy', '容量池化对比按计算计费及双平台零拷贝架构', 'Quantifies Fabric-native vs Databricks+Fabric Mirroring+Direct Lake hybrid TCO', '定量推演全栈原生模式与“Databricks 重加工 + Fabric 镜像零拷贝 BI/M365 消费”共生总成本')
    ],
    [
      ['Coexistence Beats Rip-and-Replace Migration', '零拷贝共生往往优于高风险推倒重迁', 'Mirrored Azure Databricks Catalogs + Power BI Direct Lake eliminate duplicate ETL and BI compute.', '通过目录镜像与 Direct Lake 直读共享 Delta 表，无需搬运数据即可打通重度算法加工与商业智能消费。'],
      ['Semantic Layer Governs Text-to-SQL Accuracy', '统一业务语义层是消除智能体口径幻觉的关键', 'Raw table schemas fail on enterprise KPIs; bind agents to Fabric IQ Ontology or curated Genie spaces.', '直接对裸物理表生成 SQL 极易算错毛利与库存口径，必须前置语义指标定义与实体关系约束。'],
      ['Include BI & Egress in 3-Year Lakehouse TCO', '三年平台 TCO 须计入报表消费与跨区流量费', 'Comparing raw Spark compute alone misses downstream BI import refreshes and M365 integration costs.', '仅对比批处理单价会遗漏下游高频看板刷新算力消耗与跨平台数据同步链路维护成本。']
    ]
  ),
  'workshops/data-lab/demos/diamond-hub': entry(
    'data-infra',
    'Diamond Enterprise PoC Suite · Shared Entra SSO, Microsoft Fabric, Azure Databricks & M365 Integration',
    'Diamond 企业级架构演示总台 · 统一 Entra 身份、Fabric、Databricks 与 M365 协同架构',
    [
      s('IDENTITY & TENANT', '统一身份与演示租户层', 'Entra ID OBO / B2B & Row-Level Personas', 'Entra 身份透传、B2B 直连与多角色数据隔离', 'Single tenant hosting HQ executive, regional director & cold-chain ops personas with live RLS', '单套企业级环境支持总部高管、大区负责人与一线运营多角色切换及行级数据脱敏核验', 'routes scenarios', '分发三大行业沙盘'),
      s('SCENARIO 01 · FABRIC', '场景一 · 全栈原生湖仓', 'Consumer Electronics Channel IQ ($135M Sell-In)', '消费电子全球渠道控制塔（OneLake + Eventhouse + IQ）', 'SAP/POS/shipping ingestion, 48h stockout KQL alert, 10-entity Ontology & Operations Agent', '融合进销存与海运遥测、实时断货预警、十实体业务本体推演与双智能体自动调拨回写', 'coexists with', '衔接双平台零拷贝场景'),
      s('SCENARIO 02 · HYBRID', '场景二 · 双平台零拷贝共生', 'Zava Cold-Chain (Databricks × Fabric)', 'Zava 生鲜冷链（Unity Catalog 镜像 + Direct Lake）', 'Databricks Medallion 24,024→24,000 quality gate + Genie root cause + 0-DBU Power BI Direct Lake', 'Databricks 完成冷链清洗与异常追因，经目录镜像直供 Fabric 零计算开销秒级消费', 'extends to AI ops', '拓展至脱敏智能运营'),
      s('SCENARIO 03 · AI OPS', '场景三 · 隐私脱敏与智能体护栏', 'Aether Travel Retail (Genie + Agent Bricks)', '寰宇国际旅购（源端零明文网关 + 促销配额护栏）', 'Edge GTR_OID_* tokenization, NOR margin waterfall, Genie NL2SQL & ¥1.38M promo guardrail', '源端网关完成旅客敏感信息不可逆令牌化，支撑航线净营收分析与促销预算硬护栏审批')
    ],
    [
      ['Architecture-Matched Workload Placement', '按客户既有技术栈选择原生或共生演示路径', 'Demonstrate Fabric-native for M365-centric accounts and zero-copy mirroring for Databricks accounts.', '面向轻中度分析与办公协同客户展示原生一体架构，面向重度 Spark 存量客户展示零拷贝共生架构。'],
      ['End-to-End Read-Reason-Act Loop', '打通“实时感知—归因推演—受控回写”全链路', 'Moves beyond passive dashboards into ontology-grounded simulation and human-approved write-back.', '超越静态历史报表，完整呈现异常实时检测、跨实体毛利影响测算与带护栏的业务动作下发。'],
      ['Production-Grade Identity & PII Hygiene', '在演示阶段即落实生产级身份透传与脱敏规范', 'Uses Entra OBO, dynamic data masking, and gateway tokenization rather than hardcoded admin keys.', '全程展示按用户身份收敛的数据可见范围与跨境/隐私令牌化方案，直接回应安全架构师质询。']
    ]
  ),
  'workshops/diamond-demos/contoso-fabric/index': entry(
    'data-infra',
    'Consumer Electronics Global Operations × Microsoft Fabric · OneLake, Eventhouse KQL, Fabric IQ Ontology & Dual Agents',
    '消费电子全球全渠道经营控制塔 · OneLake 零拷贝、Eventhouse 实时预警、Fabric IQ 本体与双智能体协同',
    [
      s('INGEST & ONELAKE', '全渠道接入与零拷贝存储', 'SAP Sell-In + 36 Partner POS + AIS Telemetry', '全球进销存（$135.33M）与海运流汇聚 OneLake', 'Zero-copy shortcuts unify distributor ERP, OMO retail Sell-Out ($108.95M) & vessel ETA streams', '通过零拷贝快捷方式打通 36 家海外渠道进销存与集装箱船期流，消除多区数据孤岛', 'streams KQL alerts', '触发实时流式预警'),
      s('REAL-TIME IQ', '实时流计算与断货侦测', 'Eventhouse KQL & Activator (48h Rescue)', 'Eventhouse 毫秒级库存消耗监控与黑五断货预警', 'Detects North America Black Friday velocity spike & port delay 48h before shelf stockout', '实时比对门店动销斜率与到港延误，提前 48 小时锁定北美大屏机型黑五断货敞口', 'grounds ontology', '映射业务语义本体'),
      s('FABRIC IQ ONTOLOGY', '十实体业务语义本体', '10-Entity Graph & Rebate/Margin Rules', '渠道伙伴—机型—仓库—返利十实体关系图谱', 'Unifies sell-through KPIs, channel tier rebates & transfer freight cost into one semantic model', '将渠道等级返利、跨仓调拨运费与保价条款固化为统一业务本体，杜绝多部门指标打架', 'orchestrates agents', '驱动双智能体推演回写'),
      s('DUAL AGENTS & BI', '智能体归因与受控调拨回写', 'Data Agent + Operations Agent ($582K Saved)', '数据归因问答、调拨方案寻优与 Teams 审批回写', 'Simulates inter-warehouse reallocation saving $582K gross margin with human-in-the-loop sign-off', '自动比选跨仓紧急调拨与空运补货净毛利收益（挽回 $582K），经业务负责人确认后回写执行')
    ],
    [
      ['Unify Sell-In ERP With Real-Time Sell-Out Velocity', '打通账面出货与终端真实动销的时间差盲区', 'Combining distributor ERP shortcuts with Eventhouse POS/AIS streams exposes hidden stockout risk.', '将静态渠道分销账面库存与终端实时流速、海运延误联动，化解“账面有货、门店断货”困局。'],
      ['Ontology Prevents Hallucinated Rebate Math', '业务本体锁死复杂渠道返利与净毛利计算口径', 'Agents query governed semantic relationships instead of guessing multi-table ERP join keys.', '智能体基于受控实体图谱与度量公式推理，确保毛利测算准确计入阶梯返利与调拨物流损耗。'],
      ['Closed-Loop Action With Explicit Approval Gate', '分析结论直连可审计的业务审批与系统回写', 'Operations Agent drafts executable transfer orders in Teams while preserving human authorization.', '从异常告警直接生成带损益测算的调拨工单草案，兼顾分钟级响应速度与财务授权合规。']
    ]
  ),
  'workshops/data-lab/demos/contoso-fabric/playbook': entry(
    'data-infra',
    'Consumer Electronics × Microsoft Fabric Dual-Screen SA Playbook · Presenter Script, Checkpoints & Q&A',
    '消费电子全球运营 × Microsoft Fabric 双屏演示手册 · 角色切换节奏、架构核验检查点与客户质询应答',
    [
      s('SCREEN A · BUSINESS', '左屏 · 业务高管叙事流', 'HQ Executive → NA Regional GM Journey', '全球经营总览到北美黑五断货救援的业务视角', 'Anchors on $135.33M Sell-In, OMO Sell-Out gap & $582K Black Friday margin rescue story', '从全球渠道库存健康度切入，聚焦北美大促断货风险与跨仓调拨挽回毛利的业务闭环', 'synchronizes with', '双屏同步映射底层机制'),
      s('SCREEN B · PLATFORM', '右屏 · 平台架构核验流', 'OneLake · Eventhouse · Ontology · Direct Lake', '逐幕对照底层存储、KQL 流处理与语义本体实现', 'Shows live Delta tables, KQL query latency, 10-entity graph lineage & RLS persona switching', '实时展示底层零拷贝表结构、流式规则触发、本体关系血缘及不同角色的行级权限过滤效果', 'addresses CTO Q&A', '回应技术负责人深潜'),
      s('OBJECTION MATRIX', '核心技术质询应答策略', 'SAP Integration, Latency, Governance & CU Cost', '异构 ERP 接入、实时性边界、权限与容量测算应答', 'Covers SAP BW/HANA mirroring, Direct Lake fallback guards & pooled F-SKU capacity sizing', '提供针对源系统同步延迟、超大表回退防护、指标口径防幻觉与容量单元定容的标准解答', 'converts to PoC', '收敛为两周验证计划'),
      s('POC SCOPING', '客户落地边界与 PoC 蓝图', '2-Week MVP Data Scope & Success Criteria', '最小可行数据集圈定、安全边界与验收指标', 'Defines 3-source shortcut MVP, 5-entity ontology slice & measurable alert-to-action SLA', '明确三类核心数据源接入、五核心实体最小本体建模与可量化的预警响应验收口径')
    ],
    [
      ['Pair Every Business KPI With Its Platform Primitive', '每一个业务数字变化同步印证底层平台机制', 'Dual-screen delivery proves to both CDOs and architects that agent outputs are grounded in live data.', '左屏讲清业务损益价值，右屏同步亮出零拷贝表、流计算与权限规则，消除“演示即静态假页面”疑虑。'],
      ['Pre-Empt Direct Lake & Governance Questions', '主动阐明性能回退水位与行级安全继承边界', 'Address framing limits, V-Order optimization, and Entra OBO RLS before skeptical engineers ask.', '主动说明文件合并调优、超大表护栏与统一身份透传机制，建立架构师级专业信任度。'],
      ['Land a Bounded 2-Week Customer Pilot', '将全栈演示收敛为低侵入两周概念验证方案', 'Use zero-copy shortcuts on one region/category first so customers validate value without ETL rewrites.', '依托零拷贝快捷方式在不改造客户现有数仓的前提下，快速跑通单区域单品类端到端闭环。']
    ]
  ),
  'workshops/diamond-demos/databricks-fabric/index': entry(
    'data-infra',
    'Zava Omnichannel Cold-Chain Console · Azure Databricks Medallion + Genie × Fabric Zero-Copy Direct Lake',
    'Zava 全渠道生鲜冷链工作台 · Azure Databricks 清洗追因与 Microsoft Fabric 零拷贝协同',
    [
      s('DATABRICKS ETL', '重度数据工程与质量门禁', 'Unity Catalog Medallion (24,024→24,000)', '冷链温控与订单流三层清洗及坏数拦截门禁', 'Quarantines 24 sensor/schema anomalies in Silver→Gold pipeline with dynamic PII masking', '在青铜至黄金层加工中自动隔离 24 条传感器异常脏数据，并基于目录实施动态脱敏', 'drills root cause', '驱动自然语言根因下钻'),
      s('AI/BI GENIE', '自然语言根因归因分析', 'East China Margin Drop → Kunshan #2 (17.3h)', '华东生鲜毛利下滑秒级定位至昆山 2 号仓冷链延误', 'Correlates spoilage write-offs with 17.3-hour reefer dock delay via governed Unity Catalog SQL', '关联网点报损率与冷链车在途温控日志，精准锁定昆山仓月台拥堵超时导致的变质损耗', 'mirrors zero-copy', '零拷贝镜像至 OneLake'),
      s('CATALOG MIRRORING', '跨平台元数据零拷贝镜像', 'Mirrored Azure Databricks Catalog in OneLake', 'Unity Catalog 元数据秒级同步免数据搬运', 'Exposes Gold Delta Parquet tables in Fabric without duplicate storage or Spark export jobs', '在不复制底层文件且不消耗额外导出算力的前提下，将黄金表实时映射至 OneLake', 'serves M365 & BI', '直供零 DBU 报表与协同'),
      s('DIRECT LAKE & M365', '零 DBU 秒级看板与业务协同', '0-DBU Power BI Direct Lake & Teams Loop', '免启动 SQL 仓库的秒级高管看板与生鲜补货联动', 'Serves sub-second executive BI on Fabric F-SKU while preserving Databricks for ML/Spark', '报表刷新零 DBU 计算唤醒开销，实现数据科学家留驻 Databricks、业务团队无缝消费 M365')
    ],
    [
      ['Zero Data Duplication Between Databricks & Fabric', '两套平台共享同一份底层开放 Delta 存储', 'Catalog Mirroring syncs metadata pointers only—eliminating fragile copy pipelines and drift.', '仅同步表目录元数据指针而不复制底层数据文件，彻底消除跨平台定时同步延迟与口径不一致。'],
      ['0-DBU Executive BI Consumption via Direct Lake', '高频管理层看板访问无需唤醒昂贵计算集群', 'Power BI reads Delta Parquet directly from OneLake without spinning up SQL Warehouses.', '高管与门店店长高频筛选钻取直接内存列式读取，避免为轻量报表查询常驻重型计算节点。'],
      ['Clear Division of Responsibilities', '清晰界定重度算法加工与全域办公消费职责边界', 'Keep Spark streaming, MLflow, and Genie in Databricks; land Direct Lake BI and M365 in Fabric.', '尊重客户既有数仓投资，让复杂流批工程与全员商业智能在各自最擅长的平面协同运行。']
    ]
  ),
  'workshops/data-lab/demos/databricks-fabric/battlecard': entry(
    'data-infra',
    'Azure Databricks vs Microsoft Fabric Selection Matrix · 10 Architectural Dimensions & Coexistence Patterns',
    'Azure Databricks 与 Microsoft Fabric 十维架构选型矩阵 · 能力边界、成本口径与协同范式',
    [
      s('WORKLOAD & PERSONA', '核心负载与团队画像评估', 'Code-First Data/ML Eng vs SaaS Analytics/BI', '重代码数据/算法团队对比全栈分析与业务消费团队', 'Evaluates Spark/Python/MLflow depth against unified SaaS onboarding, Eventhouse & M365 reach', '评估客户团队是以深度自定义分布式代码为主，还是追求开箱即用的流批一体与办公协同', 'compares 10 axes', '展开十维技术对标'),
      s('10-AXIS MATRIX', '十维架构能力客观对标', 'Storage · Catalog · Streaming · AI · Governance', '存储开放性、目录权限、实时流、智能体与安全细则', 'Side-by-side trade-offs on Unity Catalog vs OneLake/Purview, Structured Streaming vs Eventhouse', '逐项对比开放表互操作、行列级权限跨引擎传递、复杂流状态管理与语义本体成熟度', 'checks FinOps', '校核计费模式差异'),
      s('BILLING MECHANICS', '计费模型与突发治理对比', 'Pay-per-DBU + Azure Infra vs Pooled Fabric CU', '按作业 DBU 加底层云资源对比统一容量池（CU）平滑削峰', 'Analyzes burst smoothing, idle auto-termination, reserved discounts & BI refresh economics', '拆解作业型弹性计费与容量池突发平滑机制在不同并发波峰与报表消费密度下的真实成本', 'selects topology', '匹配三类标准参考架构'),
      s('3 REFERENCE PATTERNS', '三类企业落地参考架构', 'Fabric-First · Databricks-First · Zero-Copy Hybrid', '原生全栈、Databricks 主底座与零拷贝双剑合璧', 'Provides explicit decision rules and anti-patterns (no dual-ETL, no JDBC import bottlenecks)', '给出清晰的适用场景判定准则与架构禁区清单（严禁双写同步、规避传统导入拉取瓶颈）')
    ],
    [
      ['Frame Selection Around Team DNA & Downstream Reach', '围绕研发团队基因与下游消费半径做客观选型', 'Avoid religious platform debates; match engine strengths to engineering skillsets and consumers.', '摒弃非此即彼的对立话术，依据客户数据工程深度与业务部门自助分析覆盖面客观定界。'],
      ['Guard Against Permission Translation Gaps', '重点核查跨平台镜像时的细粒度权限映射边界', 'Verify how Unity Catalog row/column masks map to OneLake/Direct Lake SSO access policies.', '双平台共存架构设计必须前置验证行列级脱敏策略在镜像链路中的权限继承与兜底方式。'],
      ['Eliminate JDBC/Import Taxes Between Platforms', '用开放表直读取代跨平台 JDBC 抽数刷新', 'Never pull millions of rows over JDBC into Power BI Import when Direct Lake mirroring applies.', '具备目录镜像条件时切勿走传统连接器定时全量抽数，大幅降低计算账单与数据滞后。']
    ]
  ),
  'workshops/diamond-demos/travel-retail-ops/index': entry(
    'data-infra',
    'Aether Global Travel & Retail × Azure Databricks · Zero-PII Edge Tokenization, Genie NL2SQL & Agent Bricks',
    '寰宇国际旅行零售运营工作台 · 源端零明文脱敏网关、Genie 净营收归因与 Agent Bricks 促销护栏',
    [
      s('PRIVACY GATEWAY', '跨境源端零明文隐私网关', 'Edge HMAC Tokenization (GTR_OID_*)', '护照与实名标识在源端网关不可逆令牌化后再入湖', 'Strips raw passport/PII prior to cloud ingestion while preserving cross-port repeat-buyer joins', '个人身份明文不出源端合规域，仅以一致性哈希令牌入湖，兼顾跨境隐私合规与复购归因', 'loads lakehouse', '汇入旅行零售湖仓'),
      s('NOR LAKEHOUSE', '免税航线净营收（NOR）湖仓', 'travel_retail_ops (93.3% Quota / 66.53% Margin)', '八大奢旅免税套包去化率、返佣退税与净毛利瀑布账本', 'Reconciles gross duty-free GMV into Net Operating Revenue across rebates, FX & port fees', '打通离岛/口岸免税毛销额、供应商返利、退税损耗与汇率折算，实时呈现真实净利率水位', 'queries via Genie', '驱动自然语言追因与质检'),
      s('GENIE + QA CRITIC', '自然语言追因与服务质检', 'Databricks AI/BI Genie + Agent Bricks Critic', '口岸客单与高退货航线秒级归因及贵宾导购质检', 'Audits VIP concierge transcripts for duty-free allowance compliance and margin leakage causes', '支持业务负责人自然语言下钻异常口岸损耗，并利用智能体自动核查导购免税额度告知合规率', 'enforces guardrail', '执行促销预算硬护栏'),
      s('PROMO GUARDRAIL', '配额促收推演与预算硬护栏', '¥1.38M Incremental NOR & Margin Floor Gate', '剩余免税配额精准促收模拟与最低净利率熔断门禁', 'Blocks coupon campaigns violating brand floor margins; embeds cleanly via Entra B2B SSO', '自动拦截击穿品牌底线毛利率的补贴方案，支持普通浏览器免隐身 B2B 单点登录嵌入访问')
    ],
    [
      ['Tokenize Cross-Border PII Before Cloud Landing', '跨境旅购架构必须在入湖前完成确定性去标识化', 'Keyed HMAC tokenization at regional gateways satisfies strict passport privacy laws cleanly.', '在区域口岸边缘网关先行剥离证件明文，避免中央数据湖承担高昂的跨境个人敏感信息合规风险。'],
      ['Govern Decisions on Net Operating Revenue, Not GMV', '旅行零售经营决策必须锚定扣除返佣后的净营收', 'Duty-free rebates and port concessions distort gross sales; Genie spaces must lock NOR formulas.', '免税渠道高返佣与口岸扣点会使毛销售额严重失真，智能体语义空间必须固化净毛利瀑布公式。'],
      ['Deterministic Floor-Margin Gate Around Promo Agents', '营销促收智能体必须外挂确定性毛利红线校验', 'Never allow generative agents to issue VIP discounts without a hard programmatic margin check.', '优惠券与配额促收建议在触达客户前，必须经过确定性财务规则引擎校验单品底线净利率。']
    ]
  ),
  'workshops/diamond-demos/contoso-fabric/fabric-studio': entry(
    'data-infra',
    'Contoso Global Channel IQ · Offline Desensitized Microsoft Fabric Platform Studio',
    'Contoso 全球渠道智能 · 脱敏离线版 Microsoft Fabric 平台架构工作台',
    [
      s('ONELAKE SHORTCUTS', '脱敏多源零拷贝底座', 'Synthetic ERP, POS & Logistics Delta Tables', '全量脱敏渠道进销存与物流模拟表结构', 'Reproduces enterprise medallion schemas offline without live tenant credentials', '离线完整复现企业级多源零拷贝表结构与分区组织，无需联网租户凭据即可演示', 'processes KQL', '驱动实时流监控视图'),
      s('EVENTHOUSE KQL', '实时库存流速与预警引擎', 'Simulated Streaming Velocity & Stockout Rules', '高并发门店动销流速与安全库存水位规则演示', 'Inspects KQL window aggregations and Activator threshold alert payloads interactively', '直观拆解滑动时间窗动销速率计算与断货预警事件触发机制', 'maps ontology', '关联语义实体图谱'),
      s('SEMANTIC ONTOLOGY', '通用零售渠道语义模型', 'Partner-SKU-Warehouse-Rebate Entity Graph', '脱敏通用版十实体关系与净毛利计算契约', 'Demonstrates reusable channel ontology adaptable across consumer electronics & CPG', '展示可跨消费电子与快消行业复用的标准渠道实体关系及返利核算模型', 'executes write-back', '闭环智能体审批调拨'),
      s('AGENT WORKFLOW', '双智能体推演与回写沙盘', 'Root-Cause Attribution & Transfer Order Draft', '归因问答、跨仓调拨损益对比与审批单生成', 'Walks through end-to-end read-reason-approve flow in air-gapped customer workshops', '支持在内网隔离或离线客户工作坊中稳定演示从数据追因到业务调拨审批的完整闭环')
    ],
    [
      ['Customer-Safe Desensitized Reference Twin', '零敏感品牌数据的通用可交付参考副本', 'Replaces customer-specific names with Contoso fixtures for external partner enablement.', '采用标准脱敏企业命名与合成业务数据，便于合作伙伴技术对齐与离线客户内网研讨。'],
      ['Identical Control/Data Plane Topology', '完整保留生产级湖仓与智能体分层拓扑', 'Preserves exact OneLake → Eventhouse → Ontology → Agent architectural boundaries.', '与在线真实租户保持一致的四层数据流与控制面边界，确保架构评审结论可直接迁移。'],
      ['Air-Gapped Workshop Reliability', '消除现场网络抖动与跨租户登录阻塞风险', 'Runs deterministically without external cloud dependencies during live executive briefings.', '摆脱现场网络受限与多因素认证超时干扰，作为在线租户演示的高可靠离线备份底座。']
    ]
  ),
  'workshops/diamond-demos/contoso-fabric/playbook': entry(
    'data-infra',
    'Contoso × Microsoft Fabric Offline SA Playbook · Dual-Persona Walkthrough & PoC Scoping Guide',
    'Contoso × Microsoft Fabric 脱敏通用版演示手册 · 双视角讲解路径与客户 PoC 定界指南',
    [
      s('BUSINESS ARC', '业务决策者沟通主线', 'Omnichannel Visibility → 48h Rescue → ROI', '从渠道账实割裂痛点到分钟级调拨止损闭环', 'Frames executive value around inventory turnover, stockout avoidance & rebate accuracy', '聚焦库存周转天数、大促断货损失规避与渠道返利透明化三大高管关切指标', 'flips to platform', '切换至技术平台验证'),
      s('ARCHITECT PROOF', '技术负责人核验清单', 'Zero-Copy Shortcuts, KQL & Direct Lake Mechanics', '免搬运接入、流式检测与列式直读底层验证', 'Demonstrates how Fabric eliminates glue-ETL sprawl across batch, real-time & BI', '逐层验证如何消除批处理、实时流计算与商业智能之间的冗余胶水同步任务', 'resolves security', '解答权限与治理疑问'),
      s('GOVERNANCE Q&A', '安全权限与容量定容问答', 'RLS Inheritance, Ontology Guardrails & CU Sizing', '行级权限穿透、指标防幻觉与容量单元估算口径', 'Provides concrete sizing heuristics from pilot F64 capacity to multi-region rollout', '给出从概念验证容量起步到多区域推广的分阶段定容测算方法与治理边界说明', 'lands pilot', '输出标准化落地方案'),
      s('PILOT BLUEPRINT', '两周客户共创实施路径', 'Source Mapping, KPI Lock & Acceptance Metrics', '客户源表映射、核心指标锁定与联合验收标准', 'Structured template for turning workshop consensus into a scoped customer pilot', '提供标准化工作坊需求采集与最小可行验证范围模板，加速架构共识转化为实施项目')
    ],
    [
      ['Reusable Across Retail, CPG & Manufacturing', '一套渠道本体方法论适配多行业分销网络', 'Channel sell-in/sell-out + rebate + transit ETA patterns generalize across B2B2C industries.', '进销存对账、在途船期联动与阶梯返利核算模型可直接迁移至家电、快消与工业品分销场景。'],
      ['Bridge Business Pain Directly to Technical Boundaries', '确保业务痛点与平台技术选型一一闭环对应', 'Every architectural layer justifies its existence via a concrete operational bottleneck.', '拒绝堆砌组件名词，每一层平台能力均紧扣具体的数据滞后、口径冲突或运维割裂痛点。'],
      ['Actionable Post-Workshop Handoff', '演示结束即可直接衔接客户数据盘点与定容', 'Equips partner engineers with concrete source-table and SKU-sizing checklists.', '为合作伙伴工程师提供现成的数据源盘点清单与容量评估工具，缩短售前转交付周期。']
    ]
  )
};

DATA_SPECS['workshops/data-lab/live-demo'] = DATA_SPECS['workshops/data-lab/index'];
DATA_SPECS['workshops/data-lab/demos/contoso-fabric/index'] = DATA_SPECS['workshops/diamond-demos/contoso-fabric/index'];
DATA_SPECS['workshops/data-lab/demos/contoso-fabric/fabric-studio'] = DATA_SPECS['workshops/diamond-demos/contoso-fabric/fabric-studio'];
DATA_SPECS['workshops/data-lab/demos/databricks-fabric/index'] = DATA_SPECS['workshops/diamond-demos/databricks-fabric/index'];

module.exports = { DATA_SPECS };
