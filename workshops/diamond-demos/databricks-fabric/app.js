/* ============================================================================
 * Zava Omnichannel Retail × Azure Databricks & Microsoft Fabric Better-Together
 * Sanitized Bilingual (zh-CN / en) 4-Act Interactive Demo Console & SA Battlecard
 * ============================================================================ */

(function () {
  "use strict";

  const IS_EN = (document.documentElement.lang || "").toLowerCase().startsWith("en");
  const T = (zh, en) => (IS_EN ? en : zh);

  let currentTab = "catalog";
  let showCue = true;
  let maskRole = "ops"; // 'ops' (masked) | 'auditor' (unmasked)
  let currentGenieQ = "q1";
  let dispatchedTransfer = false;

  const ACT_ORDER = ["catalog", "genie", "coexist", "battlecard"];

  const CUES = IS_EN
    ? {
        catalog:
          "Act 1 Pitch (Unity Catalog Foundation): 'Zava operates 50 fresh retail stores across 4 regions and 9 cold-chain DCs. Unity Catalog governs Bronze (24,024 raw rows) → Silver (24 dirty rows auto-quarantined) → Gold (24,000 clean rows + mv_retail_kpi Metric View), enforces dynamic phone masking (135****8240) without table copies, and tracks column lineage automatically.'",
        genie:
          "Act 2 Pitch (AI/BI Genie 3-Minute Root-Cause Drilldown): 'Monday morning, East China fresh net margin drops from 29.0% to 25.9% (-3.1pp). In four natural-language questions, Genie invokes MEASURE(net_margin_rate), isolates Kunshan #2 Cold-Chain DC (16.2% stockout, ¥223K loss), plots the 2.4h → 17.3h dispatch delay spike, and locates 1,460 surplus cases at Jiaxing #1 DC (1.6h delay).'",
        coexist:
          "Act 3 Pitch (Fabric × Databricks Zero-Copy Coexistence): 'Already standardized on Power BI, Microsoft Fabric, and Teams? Zero data migration needed: Mirrored Azure Databricks Catalog mounts zava_retail into Fabric OneLake with 0 ETL copies and 0 DBU Power BI Direct Lake consumption, while Lakebase + Copilot Studio dispatches the 480-case cold-chain transfer inside Teams.'",
        battlecard:
          "Act 4 Pitch (SA Architectural Selection Matrix): 'Azure Databricks (100% MACC-eligible first-party Azure service) excels bottom-up at complex Spark/Photon streaming, MLflow 3.0, and compound AI; Microsoft Fabric excels top-down at Zero-Ops SaaS, Direct Lake BI, Eventhouse KQL, and M365 governance. Together via OneLake Mirroring, enterprises get the best of both worlds.'"
      }
    : {
        catalog:
          "第一幕话术（「数据可信底座」）：「Zava 在全国四大区拥有 50 家门店与 9 座冷链仓。Unity Catalog 按铜（24,024 行）→ 银（自动拦截 24 条脏流水）→ 金（24,000 行净表 + mv_retail_kpi 指标视图）统一治理，同一张会员表按角色动态脱敏手机号（135****8240），无需维护多套物理表。」",
        genie:
          "第二幕话术（「中文连续追问 3 分钟破案」）：「周一早会发现华东生鲜净毛利率从 29.0% 跌至 25.9%（-3.1 个百分点）。运营总监用 4 个自然语言追问，强制调用 MEASURE(net_margin_rate) 锁死财务口径，锁定昆山二号冷链仓（缺货率 16.2%、损失 22.3 万），穿透到出库延迟从 2.4h 飙升至 17.3h，并当场查出隔壁嘉兴一号仓 1,460 箱现成可调拨库存！」",
        coexist:
          "第三幕话术（「Fabric × Databricks 零拷贝共生闭环」）：「企业已有 Power BI 与 Teams 怎么办？零数据搬家！通过 Mirrored Azure Databricks Catalog 零拷贝镜像进 Fabric OneLake，Power BI Direct Lake 0 DBU 消耗亚秒级渲染同一个 25.9% 经营看板，并经由 Lakebase + Copilot Studio 在 Teams 内一键签发嘉兴→昆山 480 箱应急冷链调拨单。」",
        battlecard:
          "第四幕话术（「SA 架构中立选型战卡」）：「Azure Databricks（微软第一方服务，100% 计入 MACC）自下而上赢在重度 Spark/Photon 流批工程、MLflow 与复合 AI；Microsoft Fabric 自上而下赢在免运维 SaaS、Power BI Direct Lake、Eventhouse KQL 与 Purview 办公流闭环。双引擎通过 OneLake 双向零拷贝互通，是大型企业主流标准范式。」"
      };

  const MEMBER_SAMPLE = [
    { id: "MBR-10042", tier: "Gold", city: "Shanghai", rawPhone: "13580918240", maskedPhone: "135****8240", spendCny: 4280 },
    { id: "MBR-10108", tier: "Platinum", city: "Suzhou", rawPhone: "15821049572", maskedPhone: "158****9572", spendCny: 6910 },
    { id: "MBR-10219", tier: "Silver", city: "Hangzhou", rawPhone: "18601736419", maskedPhone: "186****6419", spendCny: 2150 },
    { id: "MBR-10305", tier: "Platinum", city: "Nanjing", rawPhone: "13916284055", maskedPhone: "139****4055", spendCny: 8430 }
  ];

  const GENIE_QUESTIONS = IS_EN
    ? [
        {
          id: "q1",
          step: "Q1 · Regional Scan",
          prompt: "Compare fresh cold-chain net margin rate across all regions over the last 7 days vs the prior 7 days. Which region dropped the most?",
          headline: "East China dropped -3.1 percentage points (29.0% → 25.9%); North, South, and Southwest held steady at 29.0%.",
          saNote:
            "Genie calls `MEASURE(net_margin_rate)` inside Unity Catalog Metric View `zava_retail.gold.mv_retail_kpi` (`SUM(net_margin_cny) / SUM(sales_amount_cny)`), preventing LLM ratio-averaging hallucinations.",
          sql: `SELECT\n  region_name,\n  ROUND(MEASURE(net_margin_rate) FILTER (WHERE window_tag = 'prior_7d') * 100, 1) AS prior_7d_margin_pct,\n  ROUND(MEASURE(net_margin_rate) FILTER (WHERE window_tag = 'last_7d') * 100, 1)  AS last_7d_margin_pct,\n  ROUND((MEASURE(net_margin_rate) FILTER (WHERE window_tag = 'last_7d')\n       - MEASURE(net_margin_rate) FILTER (WHERE window_tag = 'prior_7d')) * 100, 1) AS delta_pp\nFROM zava_retail.gold.mv_retail_kpi\nWHERE category = 'Fresh Cold-Chain'\nGROUP BY region_name\nORDER BY delta_pp ASC;`,
          rows: [
            { Region: "East China (华东)", Prior_7D_Margin: "29.0%", Last_7D_Margin: "25.9%", Delta_PP: "-3.1 pp", Status: "🚨 Anomaly" },
            { Region: "North China (华北)", Prior_7D_Margin: "29.0%", Last_7D_Margin: "29.0%", Delta_PP: "0.0 pp", Status: "✅ Normal" },
            { Region: "South China (华南)", Prior_7D_Margin: "29.0%", Last_7D_Margin: "29.0%", Delta_PP: "0.0 pp", Status: "✅ Normal" },
            { Region: "Southwest (西南)", Prior_7D_Margin: "29.0%", Last_7D_Margin: "29.0%", Delta_PP: "0.0 pp", Status: "✅ Normal" }
          ]
        },
        {
          id: "q2",
          step: "Q2 · Cold-Chain DC Split",
          prompt: "Break down East China fresh cold-chain over the last 7 days by supplying warehouse: compare stockout rate, spoilage rate, and lost sales.",
          headline: "Kunshan #2 Cold-Chain DC (serving 10 stores) hit 16.2% stockout rate, 6.6% spoilage, and ¥223,000 lost sales (~89% of East China loss).",
          saNote:
            "While Jiaxing #1 Cold-Chain DC remained healthy at 3.7% stockout and 29.0% net margin, Kunshan #2's stockout rate quadrupled—pinpointing the exact supply node.",
          sql: `SELECT\n  supply_dc_name,\n  COUNT(DISTINCT store_id) AS stores_served,\n  ROUND(SUM(stockout_orders) * 100.0 / SUM(demand_orders), 1) AS stockout_rate_pct,\n  ROUND(SUM(spoilage_cny) * 100.0 / SUM(sales_amount_cny), 1) AS spoilage_rate_pct,\n  ROUND(SUM(lost_sales_cny), 0) AS lost_sales_cny\nFROM zava_retail.gold.fact_store_sales_daily\nWHERE region_name = 'East China' AND category = 'Fresh Cold-Chain'\n  AND biz_date >= current_date() - INTERVAL 7 DAYS\nGROUP BY supply_dc_name\nORDER BY lost_sales_cny DESC;`,
          rows: [
            { Supply_DC: "Kunshan #2 Cold-Chain DC", Stores: 10, Stockout_Rate: "16.2%", Spoilage_Rate: "6.6%", Lost_Sales_CNY: "¥223,000" },
            { Supply_DC: "Jiaxing #1 Cold-Chain DC", Stores: 6, Stockout_Rate: "3.7%", Spoilage_Rate: "3.0%", Lost_Sales_CNY: "¥27,500" }
          ]
        },
        {
          id: "q3",
          step: "Q3 · Cross-Table Root Cause",
          prompt: "Show Kunshan #2 Cold-Chain DC's daily average outbound dispatch delay over the last 14 days and plot the trend.",
          headline: "7 days ago, Kunshan #2 outbound dispatch delay jumped from a normal 2.4h baseline (1.7–2.9h) to 17.3h average (16.1–18.5h).",
          saNote:
            "Genie automatically traverses from `fact_store_sales_daily` to `gold.fact_dc_operations_daily`: chiller & dock-shift failure held fresh pallets on the dock 15+ extra hours, causing simultaneous morning stockouts and spoilage.",
          sql: `SELECT\n  biz_date,\n  ROUND(AVG(outbound_delay_hours), 1) AS avg_dispatch_delay_h,\n  ROUND(AVG(ontime_dispatch_pct), 1)  AS ontime_rate_pct\nFROM zava_retail.gold.fact_dc_operations_daily\nWHERE dc_name = 'Kunshan #2 Cold-Chain DC'\n  AND biz_date >= current_date() - INTERVAL 14 DAYS\nGROUP BY biz_date\nORDER BY biz_date ASC;`,
          chart: [2.1, 2.5, 1.9, 2.8, 2.3, 2.6, 2.4, 16.4, 17.2, 16.8, 17.9, 18.5, 16.9, 17.4],
          rows: [
            { Window: "Days -14 to -8 (Baseline)", Avg_Delay_Hours: "2.4 h (1.9–2.8h)", OnTime_Rate: "97.6%", Cold_Dock_Status: "Normal" },
            { Window: "Days -7 to -1 (Incident)", Avg_Delay_Hours: "17.3 h (16.4–18.5h)", OnTime_Rate: "60.6%", Cold_Dock_Status: "🚨 Chiller / Shift Bottleneck" }
          ]
        },
        {
          id: "q4",
          step: "Q4 · Actionable Donor Stock",
          prompt: "Which other East China cold-chain warehouse had >1,000 transferable fresh cases yesterday with normal dispatch delay?",
          headline: "Jiaxing #1 Cold-Chain DC holds 1,460 transferable cases with 1.6h average dispatch delay and 98.1% on-time rate.",
          saNote:
            "In under 3 minutes, operations moves from margin anomaly detection to an executable inter-DC emergency rebalance plan.",
          sql: `SELECT\n  dc_name,\n  available_transfer_cases,\n  ROUND(outbound_delay_hours, 1) AS yesterday_delay_h,\n  ROUND(ontime_dispatch_pct, 1)  AS ontime_rate_pct\nFROM zava_retail.gold.fact_dc_operations_daily\nWHERE region_name = 'East China'\n  AND biz_date = current_date() - INTERVAL 1 DAY\n  AND available_transfer_cases > 1000\n  AND outbound_delay_hours < 3.0;`,
          rows: [
            { Donor_DC: "Jiaxing #1 Cold-Chain DC", Transferable_Cases: "1,460 cases", Yesterday_Delay: "1.6 h", OnTime_Rate: "98.1%", Distance_To_Shanghai: "92 km (1.5h Cold Truck)" }
          ]
        },
        {
          id: "q5",
          step: "Q5 · Store Priority Ranking",
          prompt: "Which 5 East China stores suffered the highest fresh cold-chain lost sales over the last 7 days?",
          headline: "All Top 5 impacted stores are supplied by Kunshan #2, led by Shanghai Jing'an Flagship (16.2% stockout, ¥33,000 lost sales).",
          saNote:
            "Gives cold-chain dispatchers exact store-level priority allocation when routing the 480 emergency cases from Jiaxing #1.",
          sql: `SELECT\n  store_name, supply_dc_name,\n  ROUND(stockout_orders * 100.0 / demand_orders, 1) AS stockout_pct,\n  ROUND(SUM(lost_sales_cny), 0) AS lost_sales_cny\nFROM zava_retail.gold.fact_store_sales_daily\nWHERE region_name = 'East China' AND biz_date >= current_date() - INTERVAL 7 DAYS\nGROUP BY store_name, supply_dc_name\nORDER BY lost_sales_cny DESC LIMIT 5;`,
          rows: [
            { Rank: 1, Store: "Shanghai Jing'an Flagship", Supply_DC: "Kunshan #2", Stockout_Rate: "16.2%", Lost_Sales_CNY: "¥33,000" },
            { Rank: 2, Store: "Shanghai Lujiazui Store", Supply_DC: "Kunshan #2", Stockout_Rate: "15.9%", Lost_Sales_CNY: "¥27,000" },
            { Rank: 3, Store: "Shanghai Xuhui Store", Supply_DC: "Kunshan #2", Stockout_Rate: "15.8%", Lost_Sales_CNY: "¥26,000" },
            { Rank: 4, Store: "Suzhou SIP Flagship", Supply_DC: "Kunshan #2", Stockout_Rate: "16.1%", Lost_Sales_CNY: "¥26,000" },
            { Rank: 5, Store: "Shanghai Hongqiao Hub", Supply_DC: "Kunshan #2", Stockout_Rate: "15.4%", Lost_Sales_CNY: "¥22,000" }
          ]
        }
      ]
    : [
        {
          id: "q1",
          step: "第 1 问 · 全局扫描定位异常大区",
          prompt: "最近 7 天和之前 7 天相比，各大区生鲜冷链的净毛利率分别是多少？哪个大区下降最多？",
          headline: "华东净毛利率由 29.0% 降至 25.9%（下降 3.1 个百分点，降幅最大）；华北/华南/西南均稳定在 29.0%。",
          saNote:
            "Genie 并未自行拼凑毛利率公式，而是直接调用 Unity Catalog 指标视图 `zava_retail.gold.mv_retail_kpi` 中锁死的 `MEASURE(net_margin_rate)`（先汇总净毛利再除以总销售额），杜绝财务口径幻觉。",
          sql: `SELECT\n  region_name,\n  ROUND(MEASURE(net_margin_rate) FILTER (WHERE window_tag = 'prior_7d') * 100, 1) AS prior_7d_margin_pct,\n  ROUND(MEASURE(net_margin_rate) FILTER (WHERE window_tag = 'last_7d') * 100, 1)  AS last_7d_margin_pct,\n  ROUND((MEASURE(net_margin_rate) FILTER (WHERE window_tag = 'last_7d')\n       - MEASURE(net_margin_rate) FILTER (WHERE window_tag = 'prior_7d')) * 100, 1) AS delta_pp\nFROM zava_retail.gold.mv_retail_kpi\nWHERE category = 'Fresh Cold-Chain'\nGROUP BY region_name\nORDER BY delta_pp ASC;`,
          rows: [
            { 大区: "华东大区", 前7天净毛利率: "29.0%", 近7天净毛利率: "25.9%", 环比变化: "-3.1 pct", 诊断状态: "🚨 显著下滑" },
            { 大区: "华北大区", 前7天净毛利率: "29.0%", 近7天净毛利率: "29.0%", 环比变化: "0.0 pct", 诊断状态: "✅ 正常" },
            { 大区: "华南大区", 前7天净毛利率: "29.0%", 近7天净毛利率: "29.0%", 环比变化: "0.0 pct", 诊断状态: "✅ 正常" },
            { 大区: "西南大区", 前7天净毛利率: "29.0%", 近7天净毛利率: "29.0%", 环比变化: "0.0 pct", 诊断状态: "✅ 正常" }
          ]
        },
        {
          id: "q2",
          step: "第 2 问 · 下钻华东供货冷链仓对比",
          prompt: "华东最近 7 天的生鲜冷链，按供货仓库对比缺货率、报损率和缺货损失销售额。",
          headline: "昆山二号冷链仓（供 10 店）缺货率高达 16.2%、报损率 6.6%、缺货损失 22.3 万元（占华东总损失近 90%）。",
          saNote:
            "同在华东的嘉兴一号冷链仓（供 6 店）缺货率仅 3.7%、净毛利率保持 29.0%，秒级锁定问题出在昆山二号冷链仓！",
          sql: `SELECT\n  supply_dc_name,\n  COUNT(DISTINCT store_id) AS stores_served,\n  ROUND(SUM(stockout_orders) * 100.0 / SUM(demand_orders), 1) AS stockout_rate_pct,\n  ROUND(SUM(spoilage_cny) * 100.0 / SUM(sales_amount_cny), 1) AS spoilage_rate_pct,\n  ROUND(SUM(lost_sales_cny), 0) AS lost_sales_cny\nFROM zava_retail.gold.fact_store_sales_daily\nWHERE region_name = 'East China' AND category = 'Fresh Cold-Chain'\n  AND biz_date >= current_date() - INTERVAL 7 DAYS\nGROUP BY supply_dc_name\nORDER BY lost_sales_cny DESC;`,
          rows: [
            { 供货冷链仓: "昆山二号冷链仓", 覆盖门店数: "10 店", 缺货率: "16.2%", 报损率: "6.6%", 缺货损失额: "¥223,000" },
            { 供货冷链仓: "嘉兴一号冷链仓", 覆盖门店数: "6 店", 缺货率: "3.7%", 报损率: "3.0%", 缺货损失额: "¥27,500" }
          ]
        },
        {
          id: "q3",
          step: "第 3 问 · 跨表穿透仓配运营查根因",
          prompt: "昆山二号冷链仓最近 14 天每天的平均出库延迟是多少？画成趋势图。",
          headline: "7 天前昆山二号冷链仓平均出库延迟从正常的 2.4 小时（1.9~2.8h）骤升至 17.3 小时（16.4~18.5h）！",
          saNote:
            "Genie 自动从门店销售事实表跨表关联至仓配运营表 `fact_dc_operations_daily`：生鲜在冷链月台积压逾 15 小时，既错过早高峰造成缺货，又导致温控损耗飙升。",
          sql: `SELECT\n  biz_date,\n  ROUND(AVG(outbound_delay_hours), 1) AS avg_dispatch_delay_h,\n  ROUND(AVG(ontime_dispatch_pct), 1)  AS ontime_rate_pct\nFROM zava_retail.gold.fact_dc_operations_daily\nWHERE dc_name = 'Kunshan #2 Cold-Chain DC'\n  AND biz_date >= current_date() - INTERVAL 14 DAYS\nGROUP BY biz_date\nORDER BY biz_date ASC;`,
          chart: [2.1, 2.5, 1.9, 2.8, 2.3, 2.6, 2.4, 16.4, 17.2, 16.8, 17.9, 18.5, 16.9, 17.4],
          rows: [
            { 时间窗口: "前 7 天基线 (D-14 ~ D-8)", 日均出库延迟: "2.4 小时 (1.9~2.8h)", 准时出库率: "97.6%", 月台状态: "✅ 正常" },
            { 时间窗口: "近 7 天异常 (D-7 ~ D-1)", 日均出库延迟: "17.3 小时 (16.4~18.5h)", 准时出库率: "60.6%", 月台状态: "🚨 冷机/排班积压" }
          ]
        },
        {
          id: "q4",
          step: "第 4 问 · 锁定可调拨健康冷链仓",
          prompt: "华东还有哪个冷链仓昨天的生鲜可调拨库存超过 1000 箱，而且出库延迟正常？",
          headline: "嘉兴一号冷链仓昨日可调拨生鲜库存 1,460 箱，平均出库延迟仅 1.6 小时（准时率 98.1%）。",
          saNote:
            "从发现华东毛利下滑到锁定嘉兴一号仓 1,460 箱现成应急货源，4 个中文追问耗时不到 3 分钟！",
          sql: `SELECT\n  dc_name,\n  available_transfer_cases,\n  ROUND(outbound_delay_hours, 1) AS yesterday_delay_h,\n  ROUND(ontime_dispatch_pct, 1)  AS ontime_rate_pct\nFROM zava_retail.gold.fact_dc_operations_daily\nWHERE region_name = 'East China'\n  AND biz_date = current_date() - INTERVAL 1 DAY\n  AND available_transfer_cases > 1000\n  AND outbound_delay_hours < 3.0;`,
          rows: [
            { 候选调出冷链仓: "嘉兴一号冷链仓", 昨日可调拨库存: "1,460 箱", 平均出库延迟: "1.6 小时", 准时出库率: "98.1%", 距上海核心店车程: "92 km (1.5h 冷藏干线)" }
          ]
        },
        {
          id: "q5",
          step: "第 5 问 · 门店优先补货清单",
          prompt: "华东最近 7 天生鲜冷链受影响最大的 5 家门店是哪些？按缺货损失销售额排序。",
          headline: "受损前 5 名全部由昆山二号供货，上海静安旗舰店居首（缺货率 16.2%，损失 3.3 万元）。",
          saNote:
            "直接生成首批 480 箱冷藏车调拨的优先配送门店序列（静安旗舰 → 陆家嘴 → 徐汇 → 苏州园区 → 虹桥）。",
          sql: `SELECT\n  store_name, supply_dc_name,\n  ROUND(stockout_orders * 100.0 / demand_orders, 1) AS stockout_pct,\n  ROUND(SUM(lost_sales_cny), 0) AS lost_sales_cny\nFROM zava_retail.gold.fact_store_sales_daily\nWHERE region_name = 'East China' AND biz_date >= current_date() - INTERVAL 7 DAYS\nGROUP BY store_name, supply_dc_name\nORDER BY lost_sales_cny DESC LIMIT 5;`,
          rows: [
            { 优先级: 1, 门店名称: "上海静安旗舰店", 原供货仓: "昆山二号", 缺货率: "16.2%", 近7天缺货损失: "¥33,000" },
            { 优先级: 2, 门店名称: "上海陆家嘴店", 原供货仓: "昆山二号", 缺货率: "15.9%", 近7天缺货损失: "¥27,000" },
            { 优先级: 3, 门店名称: "上海徐汇店", 原供货仓: "昆山二号", 缺货率: "15.8%", 近7天缺货损失: "¥26,000" },
            { 优先级: 4, 门店名称: "苏州园区旗舰店", 原供货仓: "昆山二号", 缺货率: "16.1%", 近7天缺货损失: "¥26,000" },
            { 优先级: 5, 门店名称: "上海虹桥枢纽店", 原供货仓: "昆山二号", 缺货率: "15.4%", 近7天缺货损失: "¥22,000" }
          ]
        }
      ];

  const MATRIX_ROWS = IS_EN
    ? [
        {
          cat: "arch",
          dim: "1. Architectural DNA & Cloud Posture",
          dbx: "Bottom-up distributed engineering & AI PaaS (1st-party Azure service + multi-cloud AWS/GCP consistency; customer-owned ADLS Gen2)",
          fab: "Top-down Zero-Ops Enterprise Analytics SaaS (single logical OneLake + native M365 / Power BI / Purview tenant plane)",
          win: "Multi-cloud portability & code-first control → Databricks; All-in Microsoft Zero-Ops SaaS → Fabric"
        },
        {
          cat: "gov",
          dim: "2. Open Table Format & Catalog Interop",
          dbx: "Unity Catalog + Delta Lake 4.0 + Managed Iceberg v3 + Delta UniForm + Liquid Clustering",
          fab: "OneLake Parquet (V-Order) + bidirectional Delta/Iceberg metadata + Mirrored Azure Databricks Catalog (GA)",
          win: "Better Together: Mirror UC into OneLake with zero storage copy or ETL lag"
        },
        {
          cat: "ai",
          dim: "3. Business Semantics & Ontology",
          dbx: "UC Metric Views (YAML locked ratios) + Genie Ontology Snippets mined from SQL/Notebooks",
          fab: "Fabric IQ Ontology inheriting 20M+ Power BI DAX/TMDL semantic models + operational digital-twin action rules",
          win: "Data-team SQL/ML semantic mining → Databricks; Complex financial DAX & operational digital twins → Fabric IQ"
        },
        {
          cat: "ai",
          dim: "4. Conversational Data & AI Agents",
          dbx: "AI/BI Genie + Autonomous Genie 2.0 + Mosaic AI Agent Bricks (zero per-seat viewer fee, pay-per-DBU)",
          fab: "Fabric Data Agents (NL2DAX/KQL/SQL) + Copilot Studio + native M365 Copilot inside Teams/Excel/PPT",
          win: "Compound AI engineering & seat-free store ops → Databricks; M365 daily office workflow → Fabric"
        },
        {
          cat: "eng",
          dim: "5. Heavy Distributed ETL & ML Training",
          dbx: "Photon C++ engine + fine-grained PySpark/Scala tuning + 70B+ LLM fine-tuning + MLflow 3.0 standard",
          fab: "Native Execution Engine (Gluten/Velox) + low-code Data Factory + Project Osmos autonomous Spark drift healing",
          win: "Extreme skew tuning, graph/feature engineering & MLOps → Databricks; Low-code agile ELT → Fabric"
        },
        {
          cat: "rt",
          dim: "6. Streaming vs High-Concurrency Telemetry",
          dbx: "Spark Structured Streaming Real-Time Mode + Lakeflow Declarative Pipelines (>14M events/s stateful joins)",
          fab: "Real-Time Intelligence (Eventstream + Eventhouse KQL + Activator) with inverted/time-series indexing",
          win: "Complex stateful stream ETL → Databricks; Sub-second ad-hoc slicing over PB telemetry/logs → Fabric Eventhouse"
        },
        {
          cat: "oltp",
          dim: "7. Operational Write-Back & OLTP",
          dbx: "Lakebase (Serverless Postgres on Neon CoW branching) for sub-second AI agent state sandboxes & microservices",
          fab: "Fabric SQL Database + Cosmos DB in Fabric + native Power BI planning write-back",
          win: "Agent state branching & LTAP apps → Lakebase; BI budget approval write-back → Fabric SQL"
        },
        {
          cat: "bi",
          dim: "8. Enterprise BI & Executive Consumption",
          dbx: "AI/BI Dashboards (lightweight, zero viewer seat license, embedded Genie)",
          fab: "Industry-standard Power BI + Direct Lake (0 DBU overhead on Mirrored UC, rich matrix visuals, Purview DLP to Excel)",
          win: "Agile seat-free internal ops boards → Databricks AI/BI; Group-wide executive reporting → Power BI Direct Lake"
        },
        {
          cat: "gov",
          dim: "9. Security Boundary & Office DLP",
          dbx: "Unity Catalog row/column masks + Unity Gateway token/MCP governance across clouds",
          fab: "OneLake RLS/CLS/OLS + Microsoft Purview sensitivity labels inherited automatically into exported Excel/PPT/Teams",
          win: "Cross-cloud AI/table ACLs → Databricks; Preventing 'export-to-Excel data leakage' → Fabric + Purview"
        },
        {
          cat: "finops",
          dim: "10. Commercial & FinOps Model",
          dbx: "Pay-as-you-go DBU + Azure infra (up to ~37% P3 commit discount, 100% Azure MACC eligible, auto-stop serverless)",
          fab: "Pooled F-SKU Capacity (CU smoothing/bursting, ~41% RI discount, 100% MACC eligible, F64+ includes free Power BI viewers)",
          win: "Spiky heavy compute & ML bursts → Databricks; Predictable org-wide BI + analytics TCO → Fabric F64+"
        }
      ]
    : [
        {
          cat: "arch",
          dim: "1. 架构基因与多云定位",
          dbx: "自下而上（分布式工程与复合 AI 驱动）：微软 Azure 第一方原生服务 + AWS/GCP 多云一致架构，数据落客户自有 ADLS Gen2",
          fab: "自上而下（全员 BI 与办公协同驱动）：纯托管零运维企业级 SaaS，租户单一逻辑湖 OneLake 原生打通 M365 / Teams / Purview",
          win: "多云防锁定与深度代码控制选 Databricks；All-in 微软生态追求极简免运维选 Fabric"
        },
        {
          cat: "gov",
          dim: "2. 开放表格式与跨平台目录互通",
          dbx: "Unity Catalog + Delta Lake 4.0 + 托管 Iceberg v3 + Delta UniForm + Liquid Clustering 动态聚簇",
          fab: "OneLake Parquet (V-Order) + Delta/Iceberg 双向无感转译 + Mirrored Azure Databricks Catalog (GA)",
          win: "黄金共生：Unity Catalog 零拷贝镜像至 OneLake，零数据搬运、零 ETL 延迟直通双生态"
        },
        {
          cat: "ai",
          dim: "3. 业务语义层与企业本体 (Ontology)",
          dbx: "UC Metric Views（YAML 锁死比率口径）+ Genie Ontology 从历史 SQL/Notebook 自动挖掘语义片段",
          fab: "Fabric IQ Ontology 零重写继承存量 Power BI DAX/TMDL 模型，并绑定物理运营数字孪生动作规则",
          win: "研发代码与散落 SQL 知识提炼选 Databricks；复杂财务合并口径与运营规则推演选 Fabric IQ"
        },
        {
          cat: "ai",
          dim: "4. 自助问数与业务智能体",
          dbx: "AI/BI Genie + Autonomous Genie 2.0 + Mosaic AI Agent Bricks（零按人头席位费，按实际查询 DBU 计费）",
          fab: "Fabric Data Agents（NL2DAX/KQL/SQL 三模态）+ Copilot Studio 无缝驻留 Teams / Excel / Outlook",
          win: "复合 AI 工程寻优与百店一线免席位费推广选 Databricks；日常办公流内嵌协同选 Fabric"
        },
        {
          cat: "eng",
          dim: "5. 重度分布式 ETL 与大模型微调",
          dbx: "Photon C++ 向量化引擎 + 超大规模 PySpark/Scala 倾斜调优 + 70B+ 模型训练 + MLflow 3.0 事实标准",
          fab: "Native Execution Engine (Gluten/Velox 免加价) + Data Factory 低代码编排 + Project Osmos 自主修复 Schema 漂移",
          win: "极端复杂数据工程、特征平台与前沿 MLOps 选 Databricks；敏捷低代码集成选 Fabric"
        },
        {
          cat: "rt",
          dim: "6. 实时流计算 vs 高并发时序检索",
          dbx: "Spark Structured Streaming Real-Time Mode + Lakeflow 声明式管道（复杂有状态流批一体连接）",
          fab: "Real-Time Intelligence（Eventstream + Eventhouse KQL + Activator），原生倒排与时序索引亚秒级多维切片",
          win: "复杂有状态流式特征加工选 Databricks；PB 级 IoT/日志高频交互检索与秒级告警选 Fabric Eventhouse"
        },
        {
          cat: "oltp",
          dim: "7. 轻量 OLTP 事务与业务闭环回写",
          dbx: "Lakebase (Serverless Postgres，基于 Neon 写时复制秒级分支克隆)，专为 AI Agent 状态沙盒与微服务回写设计",
          fab: "Fabric SQL Database + Cosmos DB in Fabric + Power BI 看板预算规划原生回写",
          win: "AI 智能体状态分支隔离与行动回写选 Lakebase；经营看板直接审批回写选 Fabric SQL"
        },
        {
          cat: "bi",
          dim: "8. 企业级 BI 报表消费体验",
          dbx: "AI/BI Dashboards（轻量敏捷、免按人头 Viewer 席位费、右下角原生唤起 Genie 追问）",
          fab: "业界标杆 Power BI + Direct Lake（读镜像 UC 表消耗 0 DBU，保留复杂中国式矩阵报表与精细交互）",
          win: "一线运营免席位费敏捷看板可用 Databricks AI/BI；集团核心财务经营报表标准归 Power BI Direct Lake"
        },
        {
          cat: "gov",
          dim: "9. 细粒度安全与出湖办公防泄漏",
          dbx: "Unity Catalog 行过滤/列掩码（一份数据千人千面）+ Unity Gateway 跨云模型与 MCP 工具审计",
          fab: "OneLake RLS/CLS/OLS + Microsoft Purview 敏感度加密标签自动继承至导出的 Excel/PPT/Word",
          win: "跨云异构资产与 AI 网关治理选 Databricks；防止“数据导出 Excel 即失控裸奔”选 Fabric + Purview"
        },
        {
          cat: "finops",
          dim: "10. 商业计费与 FinOps 成本结构",
          dbx: "按量 DBU + 底层云资源（Serverless 秒级休眠，P3 预购最高约 37% 折扣，100% 抵扣 Azure MACC）",
          fab: "统一 F-SKU 容量池（CU 削峰填谷平滑复用，RI 约 41% 折扣抵扣 MACC，F64+ 免除全员 Power BI 看数席位费）",
          win: "波峰波谷剧烈的重度算法与工程选 Databricks；全员高频看数与平滑混合负载 TCO 选 Fabric F64+"
        }
      ];

  const esc = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  window.switchTab = function (tabId) {
    if (!ACT_ORDER.includes(tabId)) return;
    currentTab = tabId;
    document.querySelectorAll(".act-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.id === `pane-${tabId}`);
    });
    updateCue();
  };

  function updateCue() {
    const bar = document.getElementById("presenterCue");
    const txt = document.getElementById("cueText");
    if (!bar || !txt) return;
    bar.classList.toggle("hidden", !showCue);
    txt.textContent = CUES[currentTab] || "";
  }

  function renderKpis() {
    const items = IS_EN
      ? [
          {
            cls: "kpi-red",
            label: "East China Fresh Net Margin",
            val: "25.9% (-3.1pp)",
            meta: "Prior 7d: 29.0% · Other 3 regions steady at 29.0%",
            tag: "Metric View"
          },
          {
            cls: "kpi-amber",
            label: "Kunshan #2 Cold-Chain DC",
            val: "16.2% Stockout · 17.3h",
            meta: "Dispatch delay jumped 2.4h → 17.3h · ¥223K lost sales",
            tag: "Root Cause"
          },
          {
            cls: "kpi-green",
            label: "Jiaxing #1 Transferable Surplus",
            val: "1,460 Cases · 1.6h",
            meta: "98.1% on-time dispatch · 92 km cold-truck corridor",
            tag: "Donor Ready"
          },
          {
            cls: "kpi-purple",
            label: "OneLake Mirror + Direct Lake",
            val: "0 Copy · 0 DBU BI",
            meta: "24,024 → 24,000 clean rows · Lakebase + Teams loop",
            tag: "Better Together"
          }
        ]
      : [
          {
            cls: "kpi-red",
            label: "华东生鲜冷链净毛利率",
            val: "25.9% (-3.1pct)",
            meta: "前 7 天 29.0% · 华北/华南/西南稳定在 29.0%",
            tag: "UC 指标视图"
          },
          {
            cls: "kpi-amber",
            label: "昆山二号冷链仓（异常源头）",
            val: "缺货 16.2% · 17.3h",
            meta: "出库延迟由 2.4h 飙至 17.3h · 周缺货损失 22.3 万",
            tag: "跨表根因"
          },
          {
            cls: "kpi-green",
            label: "嘉兴一号仓可调拨生鲜余量",
            val: "1,460 箱 · 延迟 1.6h",
            meta: "准时出库率 98.1% · 距上海核心店 1.5h 冷藏干线",
            tag: "应急货源"
          },
          {
            cls: "kpi-purple",
            label: "OneLake 镜像 + Direct Lake",
            val: "0 搬运 · 0 DBU 看数",
            meta: "24,024→24,000 行净表 · Lakebase + Teams 闭环",
            tag: "双引擎共生"
          }
        ];

    document.getElementById("kpiStrip").innerHTML = items
      .map(
        (d) => `
      <div class="kpi-card ${d.cls}">
        <div class="kpi-label">
          <span>${esc(d.label)}</span>
          <span class="pill-tag tag-blue">${esc(d.tag)}</span>
        </div>
        <div class="kpi-value mono">${esc(d.val)}</div>
        <div class="kpi-meta">${esc(d.meta)}</div>
      </div>
    `
      )
      .join("");
  }

  function renderCatalogTab() {
    document.getElementById("lineageSvgWrap").innerHTML = `
      <svg viewBox="0 0 1040 250" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrCoral" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#ff614f"/>
          </marker>
          <marker id="arrSky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8"/>
          </marker>
        </defs>
        <rect x="18" y="34" width="210" height="82" rx="11" fill="#1e293b" stroke="#cd7f32" stroke-width="1.8"/>
        <text x="32" y="58" fill="#fcd34d" font-size="11.5" font-weight="800">BRONZE · Raw Landing</text>
        <text x="32" y="79" fill="#f8fafc" font-size="12" font-weight="700" font-family="monospace">bronze.raw_pos_orders</text>
        <text x="32" y="99" fill="#94a3b8" font-size="11">24,024 rows (ADLS Gen2 Delta)</text>

        <rect x="18" y="138" width="210" height="82" rx="11" fill="#1e293b" stroke="#94a3b8" stroke-width="1.6"/>
        <text x="32" y="162" fill="#cbd5e1" font-size="11.5" font-weight="800">SILVER · Dynamic Mask</text>
        <text x="32" y="183" fill="#f8fafc" font-size="12" font-weight="700" font-family="monospace">silver.dim_member</text>
        <text x="32" y="203" fill="#6ee7b7" font-size="11">2,000 members · mask_phone()</text>

        <path d="M 229 75 L 288 75" stroke="#ff614f" stroke-width="2.2" marker-end="url(#arrCoral)"/>
        <rect x="292" y="34" width="228" height="82" rx="11" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.8"/>
        <text x="306" y="58" fill="#e2e8f0" font-size="11.5" font-weight="800">SILVER · Lakeflow Quality Gate</text>
        <text x="306" y="79" fill="#f8fafc" font-size="12" font-weight="700" font-family="monospace">silver.clean_pos_orders</text>
        <text x="306" y="99" fill="#fca5a5" font-size="11">24,000 valid · 24 dirty quarantined</text>

        <path d="M 521 75 L 578 75" stroke="#ff614f" stroke-width="2.2" marker-end="url(#arrCoral)"/>
        <path d="M 229 179 L 550 179 L 550 95 L 578 95" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#arrCoral)"/>

        <rect x="582" y="26" width="220" height="96" rx="11" fill="#172554" stroke="#f59e0b" stroke-width="2"/>
        <text x="596" y="50" fill="#fde68a" font-size="11.5" font-weight="800">GOLD · Semantic &amp; Metric View</text>
        <text x="596" y="71" fill="#f8fafc" font-size="12" font-weight="700" font-family="monospace">gold.fact_store_sales_daily</text>
        <text x="596" y="90" fill="#7dd3fc" font-size="11.5" font-family="monospace">gold.mv_retail_kpi (YAML)</text>
        <text x="596" y="109" fill="#cbd5e1" font-size="10.5">CN/EN comments + locked ratios</text>

        <rect x="582" y="138" width="220" height="82" rx="11" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
        <text x="596" y="162" fill="#7dd3fc" font-size="11.5" font-weight="800">GOLD · Supply Telemetry</text>
        <text x="596" y="183" fill="#f8fafc" font-size="12" font-weight="700" font-family="monospace">gold.fact_dc_operations</text>
        <text x="596" y="203" fill="#94a3b8" font-size="11">9 Cold-Chain DCs · Delay &amp; Cases</text>

        <path d="M 804 64 L 854 64" stroke="#38bdf8" stroke-width="2.2" marker-end="url(#arrSky)"/>
        <path d="M 804 175 L 854 175" stroke="#38bdf8" stroke-width="2.2" marker-end="url(#arrSky)"/>

        <rect x="858" y="26" width="166" height="88" rx="11" fill="#31102f" stroke="#ff614f" stroke-width="1.8"/>
        <text x="870" y="50" fill="#fda4af" font-size="11.5" font-weight="800">AI/BI Genie &amp; Board</text>
        <text x="870" y="70" fill="#f8fafc" font-size="11">Zero Viewer Seat License</text>
        <text x="870" y="88" fill="#6ee7b7" font-size="11">25.9% Unified KPI</text>

        <rect x="858" y="132" width="166" height="88" rx="11" fill="#0c2d48" stroke="#38bdf8" stroke-width="1.8"/>
        <text x="870" y="156" fill="#7dd3fc" font-size="11.5" font-weight="800">Fabric Mirrored UC</text>
        <text x="870" y="176" fill="#f8fafc" font-size="11">OneLake Zero-Copy</text>
        <text x="870" y="194" fill="#fde68a" font-size="11">0 DBU Direct Lake BI</text>
      </svg>
    `;

    renderMaskTable();
  }

  window.setMaskRole = function (role) {
    maskRole = role;
    document.getElementById("btnRoleOps").classList.toggle("btn-dbx", role === "ops");
    document.getElementById("btnRoleAuditor").classList.toggle("btn-fabric", role === "auditor");
    renderMaskTable();
  };

  function renderMaskTable() {
    const isOps = maskRole === "ops";
    document.getElementById("maskStatusBadge").innerHTML = isOps
      ? `<span class="pill-tag tag-green">🔒 ${T("当前视角：门店运营 / AI Genie（列掩码已生效）", "Active Role: Store Ops / AI Genie (Column Mask Active)")}</span>`
      : `<span class="pill-tag tag-amber">🛡️ ${T("当前视角：合规审计专员（受控授权明文）", "Active Role: Compliance Steward (Authorized Unmasked)")}</span>`;

    document.getElementById("memberMaskBody").innerHTML = MEMBER_SAMPLE.map(
      (m) => `
      <tr>
        <td class="mono" style="font-weight:700;">${esc(m.id)}</td>
        <td>${esc(m.tier)}</td>
        <td>${esc(m.city)}</td>
        <td class="mono" style="font-weight:700;color:${isOps ? "var(--status-green)" : "var(--status-amber)"};">
          ${esc(isOps ? m.maskedPhone : m.rawPhone)}
        </td>
        <td class="num mono">¥${m.spendCny.toLocaleString("en-US")}</td>
      </tr>
    `
    ).join("");
  }

  function renderGenieTab() {
    document.getElementById("genieQuestionButtons").innerHTML = GENIE_QUESTIONS.map(
      (q) => `
      <button type="button" class="genie-q-btn ${q.id === currentGenieQ ? "active" : ""}" onclick="selectGenieQuestion('${q.id}')">
        <div style="font-size:11px;font-weight:800;color:var(--dbx-orange);margin-bottom:2px;">${esc(q.step)}</div>
        <div>${esc(q.prompt)}</div>
      </button>
    `
    ).join("");

    const q = GENIE_QUESTIONS.find((x) => x.id === currentGenieQ) || GENIE_QUESTIONS[0];
    const cols = Object.keys(q.rows[0] || {});
    const tableHtml = `
      <div class="table-wrap" style="margin-bottom:12px;">
        <table>
          <thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
          <tbody>
            ${q.rows
              .map((r) => `<tr>${cols.map((c) => `<td class="mono">${esc(r[c])}</td>`).join("")}</tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
    `;

    let chartHtml = "";
    if (q.chart) {
      const vals = q.chart;
      const w = 640;
      const h = 175;
      const padL = 42;
      const padR = 18;
      const padT = 22;
      const padB = 28;
      const maxY = 20;
      const xAt = (i) => padL + (i / (vals.length - 1)) * (w - padL - padR);
      const yAt = (v) => h - padB - (v / maxY) * (h - padT - padB);
      const pts = vals.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(" ");
      chartHtml = `
        <div class="svg-stage" style="margin-bottom:12px;">
          <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
            <line x1="${padL}" y1="${h - padB}" x2="${w - padR}" y2="${h - padB}" stroke="#334155"/>
            <line x1="${padL}" y1="${yAt(3)}" x2="${w - padR}" y2="${yAt(3)}" stroke="#10b981" stroke-dasharray="4 4"/>
            <polyline fill="none" stroke="#ff614f" stroke-width="3" points="${pts}"/>
            ${vals
              .map(
                (v, i) =>
                  `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(v).toFixed(1)}" r="4" fill="${v > 10 ? "#ef4444" : "#38bdf8"}"/>`
              )
              .join("")}
            <text x="${padL + 6}" y="17" fill="#fca5a5" font-size="11.5" font-weight="700">${T("昆山二号冷链仓近 14 天平均出库延迟（小时）：D-7 起由 2.4h 跃升至 17.3h", "Kunshan #2 14-Day Outbound Dispatch Delay (Hours): 2.4h → 17.3h Spike at D-7")}</text>
            <text x="${w - padR}" y="${yAt(3) - 5}" text-anchor="end" fill="#6ee7b7" font-size="10">${T("3.0h 健康上限", "3.0h SLA Ceiling")}</text>
          </svg>
        </div>
      `;
    }

    document.getElementById("genieAnswerPanel").innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
        <span class="pill-tag tag-green">⚡ Serverless SQL Warehouse · 38ms · Governed Metric View</span>
        <span class="mono" style="font-size:11.5px;color:var(--text-muted);">Catalog: zava_retail.gold</span>
      </div>
      <div class="sim-panel" style="border-left:4px solid var(--dbx-orange);margin-bottom:12px;">
        <div style="font-size:14px;font-weight:800;margin-bottom:4px;">${esc(q.headline)}</div>
        <div style="font-size:12.5px;color:var(--text-secondary);">💡 ${esc(q.saNote)}</div>
      </div>
      ${chartHtml}
      ${tableHtml}
      <details open>
        <summary style="cursor:pointer;font-size:12px;font-weight:700;color:var(--fabric-blue);margin-bottom:6px;">
          ${T("🔍 展开核对 Genie 生成的受控 SQL（财务白盒可审计）", "🔍 Inspect Governed SQL Generated by Genie (White-Box Auditable)")}
        </summary>
        <pre class="code-block">${esc(q.sql)}</pre>
      </details>
    `;
  }

  window.selectGenieQuestion = function (id) {
    currentGenieQ = id;
    renderGenieTab();
  };

  function renderCoexistTab() {
    document.getElementById("coexistSvgWrap").innerHTML = `
      <svg viewBox="0 0 1050 265" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrTeal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#2dd4bf"/>
          </marker>
        </defs>
        <rect x="16" y="22" width="320" height="220" rx="14" fill="#1c1917" stroke="#ff614f" stroke-width="1.8"/>
        <text x="32" y="48" fill="#fda4af" font-size="13" font-weight="800">Azure Databricks (Data &amp; AI Engine)</text>
        <rect x="32" y="64" width="288" height="52" rx="8" fill="#0f172a" stroke="#475569"/>
        <text x="44" y="85" fill="#f8fafc" font-size="11.5" font-weight="700">Unity Catalog: zava_retail (ADLS Gen2)</text>
        <text x="44" y="103" fill="#94a3b8" font-size="10.5">Medallion ETL · Metric Views · Genie MCP</text>
        <rect x="32" y="128" width="288" height="52" rx="8" fill="#0f172a" stroke="#2dd4bf"/>
        <text x="44" y="149" fill="#5eead4" font-size="11.5" font-weight="700">Lakebase (Serverless Postgres OLTP)</text>
        <text x="44" y="167" fill="#cbd5e1" font-size="10.5">cold_chain_transfer_orders (Sub-second ACID)</text>
        <text x="32" y="212" fill="#fde68a" font-size="11">✓ 100% Azure MACC Eligible · Zero Viewer Seat Fee</text>

        <path d="M 338 90 L 444 90" stroke="#2dd4bf" stroke-width="2.6" stroke-dasharray="5 3" marker-end="url(#arrTeal)"/>
        <rect x="348" y="54" width="88" height="28" rx="6" fill="#042f2e" stroke="#2dd4bf"/>
        <text x="392" y="72" text-anchor="middle" fill="#99f6e4" font-size="10" font-weight="700">Zero-Copy Mirror</text>

        <rect x="448" y="22" width="325" height="220" rx="14" fill="#0c2d48" stroke="#38bdf8" stroke-width="1.8"/>
        <text x="464" y="48" fill="#7dd3fc" font-size="13" font-weight="800">Microsoft Fabric &amp; Power BI</text>
        <rect x="464" y="64" width="292" height="52" rx="8" fill="#0f172a" stroke="#38bdf8"/>
        <text x="476" y="85" fill="#f8fafc" font-size="11.5" font-weight="700">Mirrored Azure Databricks Catalog (OneLake)</text>
        <text x="476" y="103" fill="#6ee7b7" font-size="10.5">0 Storage Copy · Auto Metadata Sync</text>
        <rect x="464" y="128" width="292" height="52" rx="8" fill="#0f172a" stroke="#8b5cf6"/>
        <text x="476" y="149" fill="#c4b5fd" font-size="11.5" font-weight="700">Power BI Direct Lake Semantic Model</text>
        <text x="476" y="167" fill="#fde68a" font-size="10.5">0 Databricks DBU Consumed · Sub-second BI</text>
        <text x="464" y="212" fill="#cbd5e1" font-size="11">✓ Purview Sensitivity Labels Inherited to Excel/PPT</text>

        <path d="M 775 145 L 826 145" stroke="#2dd4bf" stroke-width="2.4" marker-end="url(#arrTeal)"/>
        <path d="M 920 198 L 920 228 L 176 228 L 176 182" fill="none" stroke="#2dd4bf" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#arrTeal)"/>

        <rect x="830" y="48" width="202" height="150" rx="14" fill="#1e1b4b" stroke="#a78bfa" stroke-width="1.8"/>
        <text x="846" y="74" fill="#ddd6fe" font-size="12.5" font-weight="800">Copilot Studio &amp; Teams</text>
        <text x="846" y="98" fill="#f8fafc" font-size="11">• M365 Copilot Action Card</text>
        <text x="846" y="118" fill="#f8fafc" font-size="11">• Calls Genie MCP + Fabric Agent</text>
        <text x="846" y="138" fill="#6ee7b7" font-size="11">• Writes Transfer to Lakebase</text>
        <text x="846" y="162" fill="#fcd34d" font-size="10.5">Jiaxing #1 → Kunshan #2 (480u)</text>
      </svg>
    `;

    renderTransferBox();
  }

  window.executeColdChainTransfer = function () {
    dispatchedTransfer = true;
    renderTransferBox();
  };

  function renderTransferBox() {
    const el = document.getElementById("coldChainDispatchResult");
    if (!dispatchedTransfer) {
      el.innerHTML = `
        <div class="sim-panel">
          <div style="font-weight:700;margin-bottom:6px;">📋 ${T("待签发应急冷链调拨单（由 Genie 诊断自动生成）", "Staged Cold-Chain Rebalance Order (Generated from Genie Diagnosis)")}</div>
          <div style="font-size:12.5px;color:var(--text-secondary);margin-bottom:10px;">
            ${T(
              "调出仓：嘉兴一号冷链仓（可用 1,460 箱，延迟 1.6h） → 调入重点门店：上海静安旗舰店等 5 家昆山二号供货核心店（首批 480 箱恒温冷链车直发）。",
              "Donor: Jiaxing #1 Cold-Chain DC (1,460 cases available, 1.6h delay) → Priority Receivers: Top 5 Shanghai/Suzhou flagship stores (480 chilled cases via 1.5h express)."
            )}
          </div>
          <button type="button" class="btn btn-dbx" onclick="executeColdChainTransfer()">
            🚀 ${T("在 Teams / Lakebase 中一键签发 480 箱冷链调拨单", "Approve & Write 480-Case Transfer to Lakebase + Teams")}
          </button>
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="sim-panel" style="border-color:rgba(5,150,105,0.55);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
            <strong style="color:var(--status-green);">✅ ${T("已写入 Lakebase 事务表并推送 Microsoft Teams 店长协同卡！", "Committed to Lakebase Serverless Postgres & Notified Store Managers in Teams!")}</strong>
            <span class="pill-tag tag-green">ACID Commit · 41ms</span>
          </div>
          <pre class="code-block">INSERT INTO zava_ops_lakebase.public.cold_chain_transfers
  (transfer_id, donor_dc, target_cluster, cases, temp_zone, expected_margin_recovered_cny, status)
VALUES
  ('ZAVA-CC-20261114-01', 'Jiaxing_DC_01', 'Shanghai_Core_5_Stores', 480, '0-4C_Chilled', 185000, 'DISPATCHED');</pre>
        </div>
      `;
    }
  }

  function renderBattlecardTab() {
    const filter = document.getElementById("matrixFilter").value;
    const rows = MATRIX_ROWS.filter((r) => filter === "ALL" || r.cat === filter);
    document.getElementById("battlecardBody").innerHTML = rows
      .map(
        (r) => `
      <tr>
        <td style="font-weight:700;min-width:160px;">${esc(r.dim)}</td>
        <td>${esc(r.dbx)}</td>
        <td>${esc(r.fab)}</td>
        <td style="font-weight:600;color:var(--fabric-blue);">${esc(r.win)}</td>
      </tr>
    `
      )
      .join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".act-tab").forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });
    document.getElementById("btnNextAct").addEventListener("click", () => {
      const idx = ACT_ORDER.indexOf(currentTab);
      switchTab(ACT_ORDER[(idx + 1) % ACT_ORDER.length]);
    });
    document.getElementById("btnToggleCue").addEventListener("click", (e) => {
      showCue = !showCue;
      e.currentTarget.textContent = IS_EN
        ? showCue
          ? "🎙️ Cue Bar: ON"
          : "🎙️ Cue Bar: OFF"
        : showCue
        ? "🎙️ 提词器: 开"
        : "🎙️ 提词器: 关";
      updateCue();
    });
    document.getElementById("matrixFilter").addEventListener("change", renderBattlecardTab);

    updateCue();
    renderKpis();
    renderCatalogTab();
    renderGenieTab();
    renderCoexistTab();
    renderBattlecardTab();

    const applyHashAct = () => {
      const m = /^#act-([1-4])$/.exec(window.location.hash || "");
      if (m) switchTab(ACT_ORDER[Number(m[1]) - 1]);
    };
    applyHashAct();
    window.addEventListener("hashchange", applyHashAct);
  });
})();
