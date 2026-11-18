'use strict';
const ui = require('./hub-layout.cjs');

const t = (zh, en, cn) => (zh ? cn : en);
const link = (label, url) => ({ label, url });

function diamondResources(zh) {
  const tclUrl = `workshops/diamond-demos/tcl-fabric/index${zh ? '' : '.en'}.html`;
  const dbxUrl = `workshops/diamond-demos/databricks-fabric/index${zh ? '' : '.en'}.html`;
  const hubUrl = zh ? 'zh-diamond.html' : 'diamond.html';
  return [
    {
      id: 'diamond-demo-center',
      track: 'data-infra',
      featured: true,
      stages: ['architecture', 'evaluation', 'demos', 'resources'],
      badge: ['DIAMOND LIVE DEMO CENTER', 'DIAMOND 企业级实战演示中心'],
      title: [
        'Diamond Enterprise Live Demos · TCL · Microsoft Fabric · Azure Databricks',
        'Diamond 企业级全真演示中心 · TCL 演示环境 · Microsoft Fabric · Azure Databricks'
      ],
      finding: [
        'Pre-integrated Entra ID OBO + M365 E5 + Fabric + Databricks · Zero-Copy OneLake Coexistence',
        '预集成 Entra ID OBO + M365 E5 + Fabric + Databricks · OneLake 零拷贝双湖仓协同'
      ],
      description: [
        'Solution Architect showcase combining the pre-provisioned Diamond enterprise tenant pattern with two end-to-end customer PoC cockpits (TCL Global Channel IQ on Fabric and Zava Cold-Chain on Databricks × Fabric) plus a 10-dimension platform selection matrix.',
        '面向解决方案架构师（SA）的企业级实战演示专区：深度解析预集成的 Diamond 演示环境架构（单租户身份透传 + 协同办公 + 双湖仓底座），提供 TCL × Fabric 与 Zava × Databricks × Fabric 两大端到端交互驾驶舱及双平台选型矩阵。'
      ],
      links: [
        link(['Open Diamond Demo Center', '进入 Diamond 演示中心'], hubUrl),
        link(['TCL × Microsoft Fabric Demo', 'TCL × Fabric 六幕驾驶舱'], tclUrl),
        link(['Databricks × Fabric Demo', 'Databricks × Fabric 四幕控制台'], dbxUrl)
      ]
    },
    {
      id: 'diamond-tcl-fabric',
      track: 'data-infra',
      featured: true,
      stages: ['architecture', 'demos', 'resources'],
      badge: ['DIAMOND DEMO 01 / FABRIC IQ & ONELAKE', 'DIAMOND 实战演示 01 / FABRIC IQ 与 ONELAKE'],
      title: [
        'TCL Global Channel IQ × Microsoft Fabric · 6-Act Enterprise Cockpit',
        'TCL 全球智慧渠道 × Microsoft Fabric · 六幕企业级实战驾驶舱'
      ],
      finding: [
        '$135.33M Sell-In · $108.95M OMO Sell-Out · $582K Margin Protected · 15,319 Live Rows',
        '$135.33M Sell-In · $108.95M 全渠道动销 · 守护 $582K 渠道毛利 · 15,319 行实时验算'
      ],
      description: [
        'Global manufacturing & omnichannel scenarios across 36 channel partners: OneLake Zero-Copy Shortcuts across SAP/POS/DTC, Eventhouse KQL Black Friday 2.8x surge & Rotterdam 11-day vessel delay 48h rebalance, Fabric IQ 10-entity Ontology, OMO Soundbar bundle vs price-protection simulator, Vietnam $162.5K channel-stuffing rebate block, Data/Operations Agent write-back, and in-browser DAX/KQL proof console.',
        '还原跨国制造与全球全渠道真实业务闭环（36 家核心渠道商）：OneLake 零拷贝跨域挂载 SAP/POS/DTC、Eventhouse KQL 秒级捕捉黑五 2.8x 脉冲与鹿特丹港 11 天延误并触发法德 48h 调拨、Fabric IQ 十实体业务本体、OMO 回音壁捆绑对比直接价保挽回 $582K 毛利、拦截越南 $162.5K 压货骗补、Data/Ops Agent 审批回写，以及 15,319 行浏览器端 DAX/KQL 实时核验台。'
      ],
      links: [
        link(['Launch 6-Act Fabric Cockpit', '启动 TCL × Fabric 六幕驾驶舱'], tclUrl),
        link(['Ontology & Margin Simulator', '业务本体与价保推演'], `${tclUrl}#act-4`),
        link(['Live DAX / KQL Proof Lab', 'DAX / KQL 实时证明台'], `${tclUrl}#act-6`)
      ]
    },
    {
      id: 'diamond-databricks-fabric',
      track: 'data-infra',
      featured: true,
      stages: ['architecture', 'evaluation', 'demos', 'resources'],
      badge: ['DIAMOND DEMO 02 / DATABRICKS × FABRIC', 'DIAMOND 实战演示 02 / DATABRICKS × FABRIC 协同'],
      title: [
        'Zava Cold-Chain Retail × Azure Databricks & Microsoft Fabric · Zero-Copy Coexistence',
        'Zava 全渠道生鲜冷链 × Azure Databricks & Microsoft Fabric · 零拷贝双平台协同台'
      ],
      finding: [
        'Unity Catalog 24,024→24,000 Gate · Genie 29.0%→25.9% Root Cause · 0 DBU Direct Lake',
        'Unity Catalog 24,024→24,000 质检 · Genie 追因毛利 29.0%→25.9% · 0 DBU Direct Lake 秒级看数'
      ],
      description: [
        'End-to-end Lakehouse + SaaS BI coexistence: Unity Catalog Bronze/Silver/Gold quality gate, column lineage & 135****8240 dynamic PII masking, AI/BI Genie root-cause drilldown on Kunshan #2 17.3h cold-chain delay vs Jiaxing #1 1,460 donor cases, Mirrored Azure Databricks Catalog in OneLake with 0 DBU Power BI Direct Lake, Lakebase + Teams closed-loop dispatch, and a 10-dimension Fabric vs Databricks SA battlecard.',
        '完整演示“Databricks 重度数据工程 + Fabric 全员 BI 与协同闭环”共生范式：Unity Catalog 三层奖牌质检、字段级血缘与 135****8240 动态脱敏、AI/BI Genie 五步追因华东生鲜净利率下滑（定位昆山 2 号仓 17.3h 延误与嘉兴 1 号仓 1,460 箱可调拨库存）、OneLake 零拷贝镜像目录支撑 0 DBU Power BI Direct Lake 秒级看数、Lakebase + Teams 闭环调拨，以及 10 维度双平台选型对战卡。'
      ],
      links: [
        link(['Launch 4-Act Coexistence Console', '启动 Databricks × Fabric 四幕控制台'], dbxUrl),
        link(['AI/BI Genie Root-Cause Drilldown', 'AI/BI Genie 五步追因'], `${dbxUrl}#act-2`),
        link(['10-Dimension SA Battlecard', '10 维度双平台选型对战卡'], `${dbxUrl}#act-4`)
      ]
    }
  ];
}

function diamondArchitectureSvg(zh, idPrefix = 'diamond-arch') {
  const titleId = `${idPrefix}-title`;
  const descId = `${idPrefix}-desc`;
  return `<svg xmlns="http://www.w3.org/2000/svg" data-knowledge-atlas="data-infra" lang="${zh ? 'zh-CN' : 'en'}" role="img" aria-labelledby="${titleId} ${descId}" viewBox="0 0 1080 356" width="1080" style="width:100%;height:auto;font-family:system-ui,-apple-system,sans-serif">
  <title id="${titleId}">${t(zh, 'Diamond Enterprise Demo Reference Architecture: Entra ID, M365, Microsoft Fabric, and Azure Databricks', 'Diamond 企业级实战演示环境参考架构：Entra ID、M365、Microsoft Fabric 与 Azure Databricks 协同')}</title>
  <desc id="${descId}">${t(zh, 'Single-tenant Entra ID OBO identity plane governing Microsoft Fabric OneLake, Azure Databricks Unity Catalog, Zero-Copy Catalog Mirroring, Power BI Direct Lake, and Copilot Studio / Teams operational write-back.', '单租户 Entra ID OBO 统一身份治理平面，贯通 Microsoft Fabric OneLake、Azure Databricks Unity Catalog、零拷贝元数据镜像、Power BI Direct Lake 与 Copilot Studio / Teams 业务闭环回写。')}</desc>
  <rect width="1080" height="356" rx="16" fill="#091426" stroke="#2a476e"/>
  <rect x="24" y="18" width="1032" height="52" rx="10" fill="#102542" stroke="#366296"/>
  <text x="42" y="40" fill="#56ddcd" font-size="12" font-weight="700">${t(zh, '01 · UNIFIED IDENTITY & GOVERNANCE PLANE (DIAMOND SINGLE-TENANT · SANITIZED SNAPSHOT)', '01 · 统一身份与安全治理底座（DIAMOND 预集成单租户 · 已脱敏公开架构快照）')}</text>
  <text x="42" y="59" fill="#eef5ff" font-size="13.5" font-weight="600">${t(zh, 'Microsoft Entra ID Single-Tenant OBO Passthrough  ·  Unity Catalog Dynamic RLS/CLS Masking  ·  Microsoft Purview Lineage', 'Microsoft Entra ID 单租户 OBO 令牌透传  ·  Unity Catalog 行列级动态脱敏 (RLS/CLS)  ·  Microsoft Purview 跨域审计血缘')}</text>

  <rect x="24" y="88" width="328" height="178" rx="12" fill="#0e2038" stroke="#2f5685"/>
  <rect x="24" y="88" width="328" height="5" rx="2.5" fill="#38bdf8"/>
  <text x="40" y="114" fill="#38bdf8" font-size="11.5" font-weight="700">${t(zh, '02A · AZURE DATABRICKS LAKEHOUSE', '02A · AZURE DATABRICKS 湖仓与 AI 引擎')}</text>
  <text x="40" y="138" fill="#f4f8ff" font-size="15" font-weight="700">${t(zh, 'Medallion Engineering & AI/BI Genie', '重度数据工程 · 质检与对话追因')}</text>
  <text x="40" y="162" fill="#c6d7eb" font-size="12.5">${t(zh, '• Unity Catalog (zava_retail) Bronze/Silver/Gold', '• Unity Catalog (zava_retail) 三层奖牌架构')}</text>
  <text x="40" y="184" fill="#c6d7eb" font-size="12.5">${t(zh, '• Automated DLT/Spark quality gate & lineage', '• 自动化 DLT/Spark 质检拦截异常脏记录')}</text>
  <text x="40" y="206" fill="#c6d7eb" font-size="12.5">${t(zh, '• AI/BI Genie root-cause NL2SQL with proof', '• AI/BI Genie 业务语义追因与 SQL 可审计证明')}</text>
  <text x="40" y="228" fill="#c6d7eb" font-size="12.5">${t(zh, '• Serverless Lakebase low-latency state store', '• Serverless Lakebase 毫秒级事务状态回写')}</text>

  <rect x="376" y="88" width="328" height="178" rx="12" fill="#122844" stroke="#4778b0"/>
  <rect x="376" y="88" width="328" height="5" rx="2.5" fill="#56ddcd"/>
  <text x="392" y="114" fill="#56ddcd" font-size="11.5" font-weight="700">${t(zh, '02B · ZERO-COPY COEXISTENCE BRIDGE', '02B · ONELAKE 零拷贝共生桥接层')}</text>
  <text x="392" y="138" fill="#f4f8ff" font-size="15" font-weight="700">${t(zh, 'Zero-ETL Copy · Native Interoperability', '零 ETL 复制 · 双平台原生互操作')}</text>
  <text x="392" y="162" fill="#c6d7eb" font-size="12.5">${t(zh, '• Mirrored Azure Databricks Catalog in OneLake', '• Mirrored Azure Databricks Catalog 元数据同步')}</text>
  <text x="392" y="184" fill="#c6d7eb" font-size="12.5">${t(zh, '• OneLake Shortcuts across ADLS / S3 / GCS', '• OneLake Shortcuts 跨域挂载 ADLS / S3 / GCS')}</text>
  <text x="392" y="206" fill="#c6d7eb" font-size="12.5">${t(zh, '• Shared open Delta Parquet single source', '• 开放 Delta Parquet 单一事实底座免搬运')}</text>
  <text x="392" y="228" fill="#8eeadf" font-size="12.5" font-weight="700">${t(zh, '• Power BI Direct Lake reads consume 0 DBU', '• Power BI Direct Lake 看数消耗 0 DBU')}</text>

  <rect x="728" y="88" width="328" height="178" rx="12" fill="#0e2038" stroke="#2f5685"/>
  <rect x="728" y="88" width="328" height="5" rx="2.5" fill="#a78bfa"/>
  <text x="744" y="114" fill="#c4b5fd" font-size="11.5" font-weight="700">${t(zh, '02C · MICROSOFT FABRIC UNIFIED SAAS', '02C · MICROSOFT FABRIC 一体化智能平台')}</text>
  <text x="744" y="138" fill="#f4f8ff" font-size="15" font-weight="700">${t(zh, 'Real-Time KQL · Fabric IQ & Direct Lake', '实时智能 · 业务本体与全员经营驾驶舱')}</text>
  <text x="744" y="162" fill="#c6d7eb" font-size="12.5">${t(zh, '• Workspace TCL_Global_Channel_IQ unified F-SKU', '• 工作区 TCL_Global_Channel_IQ 统一容量池')}</text>
  <text x="744" y="184" fill="#c6d7eb" font-size="12.5">${t(zh, '• Eventhouse KQL sub-second surge & port alerts', '• Eventhouse KQL 毫秒级捕捉港口延误与黑五脉冲')}</text>
  <text x="744" y="206" fill="#c6d7eb" font-size="12.5">${t(zh, '• Fabric IQ Ontology binding margin & rebate rules', '• Fabric IQ 业务本体绑定毛利与防压货规则')}</text>
  <text x="744" y="228" fill="#c6d7eb" font-size="12.5">${t(zh, '• Data Agent + Operations Agent closed loop', '• Data Agent + Operations Agent 推演与执行')}</text>

  <path d="M352 177 H376" stroke="#56ddcd" stroke-width="2.5"/>
  <path d="M704 177 H728" stroke="#56ddcd" stroke-width="2.5"/>

  <rect x="24" y="284" width="1032" height="54" rx="10" fill="#13233f" stroke="#3c5a88"/>
  <text x="42" y="306" fill="#f59e0b" font-size="12" font-weight="700">${t(zh, '03 · COLLABORATION & ACTION CLOSED LOOP (M365 E5 + COPILOT STUDIO + AZURE AI FOUNDRY)', '03 · 业务协同触点与行动闭环（M365 E5 + COPILOT STUDIO + AZURE AI FOUNDRY）')}</text>
  <text x="42" y="325" fill="#eef5ff" font-size="13">${t(zh, 'Executives and regional ops approve price-protection or cold-chain transfers directly in Teams / Power BI and write back to ERP / WMS pipelines.', '高管与区域经营团队在 Teams / Power BI 内完成自然语言追因、价保/调拨方案审批，并自动回写 ERP / WMS 履约单据，告别只看不动的静态报表。')}</text>
</svg>`;
}

function diamondMatrixHtml(zh) {
  const rows = [
    [
      t(zh, 'Core Positioning', '核心平台定位'),
      t(zh, 'End-to-end SaaS data, real-time analytics, business ontology & M365 BI platform', '端到端 SaaS 一体化数据、实时智能、业务本体（Fabric IQ）与 M365 全员分析平台'),
      t(zh, 'Code-first Spark/Photon lakehouse, complex ETL, ML/AI engineering & Unity Catalog', '代码优先（Spark/Python/SQL）大规模数据工程、复杂特征管线与 AI 研发湖仓底座'),
      t(zh, 'Databricks transforms & governs Bronze/Silver/Gold; Fabric serves 0-DBU Direct Lake BI & Teams actions', 'Databricks 负责重度清洗与 AI 建模；通过 OneLake 零拷贝镜像交由 Fabric 承载全员秒级 BI 与协同行动')
    ],
    [
      t(zh, 'Storage & Format', '存储与开放格式'),
      t(zh, 'OneLake open Delta Parquet + Zero-Copy Shortcuts across ADLS / S3 / GCS', 'OneLake 开放 Delta Parquet + 跨云零拷贝 Shortcuts（ADLS / S3 / GCS）'),
      t(zh, 'ADLS Gen2 open Delta Lake + Liquid Clustering + Predictive Optimization', 'ADLS Gen2 开放 Delta Lake + Liquid Clustering 物理聚簇与预测性自动优化'),
      t(zh, 'Single Delta Parquet copy on Azure; Mirrored Azure Databricks Catalog eliminates scheduled copy pipelines', '底层共享同一份 Delta Parquet，通过 Mirrored Catalog 秒级同步元数据，彻底消灭定时搬运 ETL')
    ],
    [
      t(zh, 'Semantic & AI Layer', '业务语义与智能体'),
      t(zh, 'Fabric IQ Ontology + Data Agent + Operations Agent + Copilot in Power BI', 'Fabric IQ 业务本体 + Data Agent 问数 + Operations Agent 业务规则回写'),
      t(zh, 'Unity Catalog Metric Views + AI/BI Genie conversational SQL + Mosaic AI Agents', 'Unity Catalog 指标视图 + AI/BI Genie 自然语言追因 + Mosaic AI 智能体'),
      t(zh, 'Genie empowers data/ops analysts on Gold tables while Fabric IQ & Copilot Studio drive M365 workflows', '数据团队用 Genie 深度追因，业务高管在 Power BI / Teams 用 Fabric IQ 与 Copilot 审批执行')
    ],
    [
      t(zh, 'Real-Time & Operational State', '实时流与事务闭环'),
      t(zh, 'Real-Time Intelligence (Eventstreams + Eventhouse KQL + Activator alerts)', 'Real-Time Intelligence（Eventstreams + Eventhouse KQL 毫秒级时序分析 + Activator）'),
      t(zh, 'Structured Streaming + Delta Live Tables (DLT) + Serverless Lakebase (Postgres)', 'Structured Streaming 流式管线 + DLT 声明式质检 + Serverless Lakebase 事务库'),
      t(zh, 'Eventhouse handles sub-second IoT/logistics telemetry; Lakebase/Pipelines persist approved dispatch orders', 'Eventhouse 捕捉毫秒级航运/门店脉冲，Lakebase 与 Data Pipeline 持久化审批调拨回写')
    ],
    [
      t(zh, 'BI & Executive Consumption', '高管看数与消费成本'),
      t(zh, 'Native Power BI Direct Lake over OneLake (sub-second, zero import refresh)', '原生 Power BI Direct Lake 直连 OneLake（亚秒级响应，免定时全量导入刷新）'),
      t(zh, 'AI/BI Dashboards + Serverless SQL Warehouse (billed per DBU query workload)', 'AI/BI 原生看板 + Serverless SQL Warehouse（按查询负载消耗 DBU 计费）'),
      t(zh, 'Direct Lake reads mirrored Gold tables directly from OneLake with 0 SQL Warehouse DBU cost', 'Power BI Direct Lake 直接读取镜像黄金表，高并发高管看数实现 0 SQL Warehouse DBU 消耗')
    ],
    [
      t(zh, 'Commercial & FinOps Model', '计费与 FinOps 模型'),
      t(zh, 'Unified Capacity Units (F-SKU pool shared across Data Factory, KQL, Spark & BI)', '单一统一容量池（F-SKU 跨数据集成、KQL、Spark 与 Power BI 削峰填谷共享）'),
      t(zh, 'Workload-isolated DBU + Azure VM/Serverless compute with granular cluster policies', '按作业类型计量 DBU + 弹性 Serverless 算力，支持细粒度集群配额与自动休眠'),
      t(zh, 'Right-size Databricks DBU strictly for heavy ETL/ML while pooling org-wide BI on existing Fabric/P-SKU', '将 Databricks DBU 聚焦于高价值 ETL/ML 算力，全员报表复用企业既有 Fabric 容量与 M365 许可')
    ]
  ];
  return `<div class="diamond-matrix-wrap">
    <p class="eyebrow">${t(zh, 'SA WORKLOAD SELECTION MATRIX · FABRIC VS DATABRICKS VS BETTER TOGETHER', '解决方案架构师选型矩阵 · FABRIC 原生 vs DATABRICKS 原生 vs 双平台零拷贝协同')}</p>
    <h3>${t(zh, 'When to choose Microsoft Fabric, Azure Databricks, or Zero-Copy Coexistence', '何时选择 Microsoft Fabric 原生、Azure Databricks 原生，或双平台零拷贝共生架构？')}</h3>
    <table class="diamond-matrix">
      <thead>
        <tr>
          <th>${t(zh, 'Architecture Dimension', '架构评估维度')}</th>
          <th>${t(zh, 'Microsoft Fabric Native (TCL Demo)', 'Microsoft Fabric 原生闭环（如 TCL 演示）')}</th>
          <th>${t(zh, 'Azure Databricks Native', 'Azure Databricks 原生重度工程')}</th>
          <th>${t(zh, 'Fabric × Databricks Better Together (Zava Demo)', 'Fabric × Databricks 零拷贝共生（如 Zava 演示）')}</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(cols => `<tr>${cols.map((c, idx) => idx === 0 ? `<td><strong>${ui.esc(c)}</strong></td>` : `<td>${ui.esc(c)}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderDataPageDiamondShowcase(file, zh) {
  const cards = diamondResources(zh).map((item, i) =>
    ui.card(file, zh, {
      ...item,
      id: `diamond-showcase-${item.id}`,
      number: `DIAMOND-0${i + 1}`,
      url: item.links[0].url
    })
  );
  return `<section id="diamond-showcase" class="diamond-showcase">
    <div class="section-heading">
      <div>
        <p class="eyebrow">${t(zh, '05 / DIAMOND ENTERPRISE LIVE DEMO SHOWCASE', '05 / DIAMOND 企业级全真演示专区')}</p>
        <h2>${t(zh, 'Diamond Enterprise Live Demo Showcase (TCL Environment · Microsoft Fabric · Azure Databricks)', 'Diamond 企业级全真演示专区（TCL 演示环境 · Microsoft Fabric · Azure Databricks）')}</h2>
        <p class="section-intro">${t(zh, 'Built for Cloud & AI Solution Architects: see how a pre-integrated enterprise tenant (Entra ID single-tenant OBO + M365 E5 + Microsoft Fabric + Azure Databricks + Copilot Studio) turns complex cross-cloud architecture into interactive, quantified customer PoCs.', '专为云与 AI 解决方案架构师（SA）打造：展示如何利用预集成的 Diamond 企业级演示环境（Entra ID 单租户身份透传 + M365 E5 + Microsoft Fabric + Azure Databricks + Copilot Studio），将复杂的湖仓协同与实时智能转化为客户一眼看懂的量化业务闭环。')}</p>
      </div>
    </div>
    <div class="diamond-arch-box">
      <p class="eyebrow">${t(zh, 'PRE-INTEGRATED ENTERPRISE DEMO TOPOLOGY · SANITIZED PUBLIC ARCHITECTURE', '预集成企业级全真演示拓扑 · 已脱敏公开参考架构')}</p>
      <h3>${t(zh, 'Why Solution Architects use the Diamond Environment for Customer PoCs', '为什么架构师使用 Diamond 预集成环境交付客户高管演示？')}</h3>
      <p class="wb-desc">${t(zh, 'Traditional PoCs stall on cross-service authentication, empty synthetic tables, and disconnected BI slides. The Diamond pattern unifies Entra ID OBO identity, M365 Teams collaboration, Microsoft Fabric (OneLake, Eventhouse KQL, Fabric IQ), and Azure Databricks (Unity Catalog, AI/BI Genie, Lakebase) over real-scale industry datasets.', '传统客户 PoC 往往卡在跨服务鉴权打通难、测试表缺乏真实业务逻辑，以及只展示静态 PPT 截图。Diamond 企业级演示环境预先打通单租户 Entra ID 身份边界、M365 Teams 办公流、Microsoft Fabric 与 Azure Databricks 双底座，让客户在一个连贯故事中亲手验证从源端质检、实时脉冲预警到智能体回写的完整闭环。')}</p>
      <div class="diamond-pill-row">
        <span class="diamond-pill">${t(zh, 'Tenant: Diamond Enterprise (Sanitized Snapshot)', '租户边界：Diamond 企业级单租户（已脱敏快照）')}</span>
        <span class="diamond-pill">Workspace: TCL_Global_Channel_IQ</span>
        <span class="diamond-pill">Catalog: zava_retail</span>
        <span class="diamond-pill">${t(zh, 'Zero-Copy OneLake Shortcuts & Mirroring', 'OneLake 零拷贝挂载与目录镜像')}</span>
      </div>
      ${diamondArchitectureSvg(zh, 'data-page-diamond-arch')}
    </div>
    <div style="margin-top:22px">${ui.grid(cards)}</div>
    ${diamondMatrixHtml(zh)}
  </section>`;
}

function renderDiamondPage(file, zh) {
  const tclUrl = `workshops/diamond-demos/tcl-fabric/index${zh ? '' : '.en'}.html`;
  const dbxUrl = `workshops/diamond-demos/databricks-fabric/index${zh ? '' : '.en'}.html`;
  const dataInfraUrl = `studio/${zh ? 'zh-' : ''}data-infra.html#diamond-showcase`;
  const dataLabUrl = `workshops/data-lab/index${zh ? '' : '.en'}.html?lang=${zh ? 'zh-CN' : 'en'}`;

  let body = ui.crumb(file, zh, t(zh, 'Diamond Live Demos', 'Diamond 实战演示'));
  body += `<section class="page-hero">
    <div>
      <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${t(zh, 'DIAMOND ENTERPRISE DEMO ENVIRONMENT · TCL · FABRIC · DATABRICKS', 'DIAMOND 企业级实战演示环境 · TCL 演示环境 · FABRIC · DATABRICKS')}</p>
      <h1>${t(zh, 'Diamond Enterprise Live Demo Center', 'Diamond 企业级实战演示中心')}</h1>
      <p class="lead">${t(zh, 'Interactive, strictly sanitized Solution Architect PoC cockpits built on the Diamond enterprise blueprint: explore TCL Global Channel IQ on Microsoft Fabric and Zava Omnichannel Cold-Chain across Azure Databricks + Microsoft Fabric OneLake Mirroring.', '面向云与 AI 解决方案架构师（SA）的企业级实战演示中心：基于严格脱敏的 Diamond 预集成企业环境蓝图，提供 TCL 全球智慧渠道（Microsoft Fabric 六幕驾驶舱）与 Zava 全渠道生鲜冷链（Azure Databricks × Fabric 零拷贝四幕控制台）两大端到端交互沙盘及双平台选型矩阵。')}</p>
      <div class="actions">
        <a class="button primary" href="${ui.href(file, tclUrl)}">${t(zh, 'Launch Demo 1 · TCL × Microsoft Fabric', '启动演示 1 · TCL × Microsoft Fabric 六幕驾驶舱')} ↗</a>
        <a class="button diamond-cta" href="${ui.href(file, dbxUrl)}">${t(zh, 'Launch Demo 2 · Databricks × Fabric', '启动演示 2 · Databricks × Fabric 四幕控制台')} ↗</a>
        <a class="button" href="${ui.href(file, dataInfraUrl)}">${t(zh, 'Data & Infra Lab Track', '数据与云底座实验室专区')} ↗</a>
      </div>
    </div>
    <aside class="hero-callout">
      <p class="eyebrow">${t(zh, 'ARCHITECT VALUE PROPOSITION', 'SA 核心交付价值')}</p>
      <strong>${t(zh, 'One Tenant.<br>Dual Lakehouse.<br>Closed-Loop Action.', '统一租户。<br>双湖仓零拷贝。<br>业务决策闭环。')}</strong>
      <p>${t(zh, 'Sanitized public snapshot of the Diamond demo architecture—zero tenant credentials or internal IDs, 100% browser-verifiable DAX, KQL, SQL, and FinOps trade-offs.', '公开脱敏版架构快照：彻底剥离租户敏感凭据与内部 ID，100% 在浏览器端还原真实行业数据分布、DAX/KQL/SQL 口径验算与架构选型权衡。')}</p>
      <a class="text-link" href="#selection-matrix">${t(zh, 'Jump to Fabric vs Databricks Matrix', '查看 Fabric vs Databricks 选型矩阵')} ↓</a>
    </aside>
  </section>`;

  body += `<section id="environment" class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">01 / DIAMOND ENVIRONMENT BLUEPRINT</p>
        <h2>${t(zh, 'How the Diamond Enterprise Demo Environment Works', 'Diamond 企业级预集成演示环境：架构原理与 SA 实战方法')}</h2>
        <p class="section-intro">${t(zh, 'In enterprise architecture engagements, customers rarely run a greenfield single-vendor stack. The Diamond blueprint pre-wires identity (Entra ID OBO), collaboration (M365 E5 Teams/SharePoint), unified SaaS analytics (Microsoft Fabric), and code-first lakehouse engineering (Azure Databricks) so Solution Architects can demonstrate both native depth and zero-copy coexistence.', '在大型政企与跨国制造/零售客户的架构选型中，客户往往同时拥有 SAP/ERP 核心系统、ADLS/S3 多云数据湖以及 Databricks 与 Power BI 混合资产。Diamond 演示环境预先拉通单租户身份传递（Entra ID OBO）、M365 协同触点、Microsoft Fabric 与 Azure Databricks，帮助 SA 在 15 分钟内完成从“底层数据治理”到“一线业务止损回写”的全链路演示。')}</p>
      </div>
    </div>
    <div class="diamond-arch-box">
      <div class="diamond-pill-row">
        <span class="diamond-pill">${t(zh, 'Identity: Entra ID Single-Tenant OBO + Dynamic RLS/CLS', '身份治理：Entra ID 单租户 OBO + 行列级动态脱敏')}</span>
        <span class="diamond-pill">Fabric Workspace: TCL_Global_Channel_IQ</span>
        <span class="diamond-pill">Unity Catalog: zava_retail</span>
        <span class="diamond-pill">${t(zh, 'Action Loop: Copilot Studio + Teams + Pipeline Write-Back', '业务闭环：Copilot Studio + Teams + 管线回写')}</span>
      </div>
      ${diamondArchitectureSvg(zh, 'diamond-center-arch')}
    </div>
  </section>`;

  const demoCards = diamondResources(zh).slice(1).map((item, i) =>
    ui.card(file, zh, {
      ...item,
      id: `center-${item.id}`,
      number: `DEMO-0${i + 1}`,
      url: item.links[0].url
    })
  );
  demoCards.push(
    ui.card(file, zh, {
      id: 'center-data-lab-workbench',
      number: 'WORKBENCH-03',
      badge: ['CROSS-CLOUD DATA BENCHMARK', '跨云数据平台对比沙盘'],
      title: [
        'Enterprise Data Lab · Fabric IQ vs Databricks / Snowflake / BigQuery / Redshift',
        '企业级数据实验室 · Fabric IQ 对比 Databricks / Snowflake / BigQuery / Redshift'
      ],
      finding: [
        'OneLake Storage Economics · Direct Lake Latency · Governance & BCDR Trade-offs',
        'OneLake 存储经济学 · Direct Lake 时延 · 跨云治理与容灾选型'
      ],
      description: [
        'Complement the two live industry PoCs with interactive TCO & latency modeling across five cloud data platforms in the Data Lab workbench.',
        '配合两大行业全真驾驶舱，在 Data Lab 工作台中交互推演五大云数据平台的存储成本、查询时延、流批一体与跨云容灾边界。'
      ],
      url: dataLabUrl,
      links: [
        link(['Open Data Lab Workbench', '打开 Data Lab 对比工作台'], dataLabUrl),
        link(['Data & Infra Track Hub', '返回数据与云底座主页'], dataInfraUrl)
      ]
    })
  );

  body += ui.section(
    'live-cockpits',
    '02 / INTERACTIVE POC COCKPITS',
    t(zh, 'Flagship Customer PoC Cockpits (TCL · Fabric · Databricks)', '两大企业级全真交互驾驶舱（TCL 全球渠道 · Zava 生鲜冷链）'),
    t(zh, 'Click into either standalone cockpit to run step-by-step presenter cues, inspect live DAX / KQL / SQL queries, and simulate executive operational decisions.', '点击进入任一独立全真驾驶舱，支持双屏演讲提词器（Presenter Cue）、浏览器内真实数据行级 DAX/KQL/SQL 验算，以及高管审批回写推演。'),
    ui.grid(demoCards)
  );

  body += `<section id="selection-matrix" class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">03 / ARCHITECT DECISION GUIDE</p>
        <h2>${t(zh, 'Microsoft Fabric vs Azure Databricks vs Better-Together Selection Guide', 'Microsoft Fabric vs Azure Databricks vs 零拷贝共生架构选型指南')}</h2>
        <p class="section-intro">${t(zh, 'Avoid binary "rip-and-replace" pitches: match each customer team and workload to the platform boundary where it delivers the lowest TCO and fastest time-to-action.', '拒绝非黑即白的“推倒重来式”选型：根据客户现有数据团队技能栈、实时流处理需求与全员 BI 覆盖规模，选择最优的原生或零拷贝共生边界。')}</p>
      </div>
    </div>
    ${diamondMatrixHtml(zh)}
  </section>`;

  return ui.shell(file, zh, t(zh, 'Diamond Live Demos · TCL · Fabric · Databricks', 'Diamond 企业级实战演示中心 · TCL · Fabric · Databricks'), body, {
    active: 1,
    track: 'diamond',
    counterpart: zh ? 'diamond.html' : 'zh-diamond.html'
  });
}

module.exports = {
  diamondResources,
  diamondArchitectureSvg,
  diamondMatrixHtml,
  renderDataPageDiamondShowcase,
  renderDiamondPage
};
