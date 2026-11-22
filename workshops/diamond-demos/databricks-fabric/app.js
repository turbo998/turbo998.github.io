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

  const ACT_ORDER = ["catalog", "genie", "coexist", "battlecard", "live"];

  const CUES = IS_EN
    ? {
        catalog:
          "Act 1 Pitch (Unity Catalog Foundation): 'Zava operates 50 fresh retail stores across 4 regions and 9 cold-chain DCs. Unity Catalog governs Bronze (24,024 raw rows) → Silver (24 dirty rows auto-quarantined) → Gold (24,000 clean rows + mv_retail_kpi Metric View), enforces dynamic phone masking (135****8240) without table copies, and tracks column lineage automatically.'",
        genie:
          "Act 2 Pitch (AI/BI Genie 3-Minute Root-Cause Drilldown): 'Monday morning, East China fresh net margin drops from 29.0% to 25.9% (-3.1pp). In four natural-language questions, Genie invokes MEASURE(net_margin_rate), isolates Kunshan #2 Cold-Chain DC (16.2% stockout, ¥223K loss), plots the 2.4h → 17.3h dispatch delay spike, and locates 1,460 surplus cases at Jiaxing #1 DC (1.6h delay).'",
        coexist:
          "Act 3 Pitch (Fabric × Databricks Zero-Copy Coexistence): 'Already standardized on Power BI, Microsoft Fabric, and Teams? Zero data migration needed: Mirrored Azure Databricks Catalog mounts zava_retail into Fabric OneLake with 0 ETL copies and 0 DBU Power BI Direct Lake consumption, while Lakebase + Copilot Studio dispatches the 480-case cold-chain transfer inside Teams.'",
        battlecard:
          "Act 4 Pitch (SA Architectural Selection Matrix): 'Azure Databricks (100% MACC-eligible first-party Azure service) excels bottom-up at complex Spark/Photon streaming, MLflow 3.0, and compound AI; Microsoft Fabric excels top-down at Zero-Ops SaaS, Direct Lake BI, Eventhouse KQL, and M365 governance. Together via OneLake Mirroring, enterprises get the best of both worlds.'",
        live:
          "Act 5 Pitch (Zero-InPrivate Live Gateway & 1080p Fallback): 'No more juggling InPrivate windows or fighting corporate Windows WAM account hijacks: WebCrypto AES-256-GCM unlocks tenant-pinned + login_hint /aad/auth SSO links for 30 days in your normal browser, live probes verify Entra OIDC & Databricks reachability in real time, and 4 subtitled 1080p live recordings stand ready as an instant zero-auth fallback.'"
      }
    : {
        catalog:
          "第一幕话术（「数据可信底座」）：「Zava 在全国四大区拥有 50 家门店与 9 座冷链仓。Unity Catalog 按铜（24,024 行）→ 银（自动拦截 24 条脏流水）→ 金（24,000 行净表 + mv_retail_kpi 指标视图）统一治理，同一张会员表按角色动态脱敏手机号（135****8240），无需维护多套物理表。」",
        genie:
          "第二幕话术（「中文连续追问 3 分钟破案」）：「周一早会发现华东生鲜净毛利率从 29.0% 跌至 25.9%（-3.1 个百分点）。运营总监用 4 个自然语言追问，强制调用 MEASURE(net_margin_rate) 锁死财务口径，锁定昆山二号冷链仓（缺货率 16.2%、损失 22.3 万），穿透到出库延迟从 2.4h 飙升至 17.3h，并当场查出隔壁嘉兴一号仓 1,460 箱现成可调拨库存！」",
        coexist:
          "第三幕话术（「Fabric × Databricks 零拷贝共生闭环」）：「企业已有 Power BI 与 Teams 怎么办？零数据搬家！通过 Mirrored Azure Databricks Catalog 零拷贝镜像进 Fabric OneLake，Power BI Direct Lake 0 DBU 消耗亚秒级渲染同一个 25.9% 经营看板，并经由 Lakebase + Copilot Studio 在 Teams 内一键签发嘉兴→昆山 480 箱应急冷链调拨单。」",
        battlecard:
          "第四幕话术（「SA 架构中立选型战卡」）：「Azure Databricks（微软第一方服务，100% 计入 MACC）自下而上赢在重度 Spark/Photon 流批工程、MLflow 与复合 AI；Microsoft Fabric 自上而下赢在免运维 SaaS、Power BI Direct Lake、Eventhouse KQL 与 Purview 办公流闭环。双引擎通过 OneLake 双向零拷贝互通，是大型企业主流标准范式。」",
        live:
          "第五幕话术（「免无痕实机直连与 1080p 高清兜底」）：「彻底告别每次开无痕窗口输账号密码！通过浏览器原生 WebCrypto AES-256-GCM 零明文口令验证（支持 30 天本机免输），一键生成锁定专属 Entra 租户与演示账号的 /aad/auth 直连票据，在已登录公司 M365 的普通浏览器里和平共存；下方同时内置 4 章 1080p 实机字幕实录，访客或弱网环境零门槛即点即播。」"
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
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
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

  /* ==========================================================================
   * ACT 5: ZERO-INPRIVATE LIVE GATEWAY (WebCrypto PBKDF2-SHA256 + AES-256-GCM)
   *        + LIVE REACHABILITY PROBES + 4-CHAPTER 1080P VIDEO THEATER
   * ========================================================================== */
  const LIVE_GATE_STORAGE_KEY = "zava_diamond_live_gate_v1";
  const LIVE_MODE_STORAGE_KEY = "zava_diamond_routing_mode_v1";
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

  const LIVE_BUNDLE = {
      "kdf": "PBKDF2-SHA256",
      "iter": 210000,
      "cipher": "AES-256-GCM",
      "salt": "yoBsqUeTzNYkeDFomKU7HQ==",
      "iv": "q2S3UF32i8VPZXKi",
      "ct": "w7MpFACaa6bFX/8jPPx1Y7KjXFLGXKrJn6Cd9OVQVcTidQ/TdtJbZqXRZOPWEbKWDpNS7D/ZPqAartekYCaJk8SjHH/soZTbLed/lJZ6Qf6p/g02vwaV0l6674BjPitYaIpF9dpb3P9BompTTLFQ27QcRr7rP7Ivlh9LoMdPFKbxaqwarxfg3aqG5Yf8V1BtzZ0BFDlXFoalrK7gndIjdNxIXSlWoeF28zRbHeZ62ddWxbstpTj+XzQcgusypqdXAbH5huPJc79n+ZRMHKyTPe+nI63Hs7RPk772GeXBJB7XGrIA79kzWiSifFeguJPFBHBBj8MDCbJALzdbizc7HVAzw1BBGTI/Mb/AM31qTH7NB9rYk9hMWLxW7b3btO5kRQpB932hpjGC5wbW/a5JIgL6n+W1z9IvQJJbp+D1WlbTvx3oAYaZ8LXbi0Tq/MTSrSsyZvAT7RUBuQPXhTIA6JwXG3M6cxSe1JzHsNUcO0F1QYrjBIqMw3yxsucgZaEQHm+P2C3j0M2O4KdsKPAhgSj1RrK0AlnPicdfZMcNHcImpw0Idfqr2m+iMwuLZMBoQ7QZgnvsfHhXmXib6TYAPHqF7QVBhLw2sVk0p0PW3lw9FsTZNLY5KbAbGpRVlSI+SsRfyWF5FVVFbVa63jDy44jZx9xozbPfFjSpiggGQxCKo4pdeTKvb1zKPLyoTPG3uTYmlIxfvUm4rthsH9eY2gQIZj+ZJTxLK2KrhocW3rBO+5d1gc3ZTlzgCFNJZQ9DcgwsP5UGA2zSTlubCOGd7i4AYRw8Op4yK2lgYMFhyZCt96RVWo4bOngWLJZ3UB1pvezzt5mbaSeo0oQUYkGz3l2I9ZgAx4HqJE0nb78MQv6cwu4KKQXthBT+uH68iNLKJ3vcrqOUjumQ3f+5pEX8z027TjKp9nLRQ1yia4RHBBzZI7UkrztIHQBh+v6b1ai7ECRmo/cNCRQZ67IBbWUNxGqPKSaQ17+8CVvpe5Hg/5buOYlDlr/kYLk8PDMai9gKEaC5dXhiq5ROi4Unr9P5BjiQOVQRvxuWy40ji07mSvGW4DL3S2UwCptTM7K7/Mean7fUanUjAVtvovFfAzFZi3mOQohQQwQrdWehLkmHf817HTlwaj/B+7RZU/SCswUQgubosi/bCyDsQ+KSrVUYYDc0E8ws+BdiyVdg3ZHdP5O6cWze0NnTZUiL0G4jak6YYTdiQCpOEx/o2u+abeRBQzdUQJyJ99U1shOjWg7TC6mv0CKV8N8zd9cd3x/5e/vJMh9kMOPd7i2N6ufpxij4Vf5/UJG7dXlRH1lF1Jj5sbYcLH8sTy2SjydPJ0llL2uYyaTETW9YAevTYUhF6jlL7xrtEl0z6Dc4x73qCrRrZzgnn5dB9RL80xujl8Qxb9/87liSAe8j1GiO39euc+HKI3tWBy84WlvbLskzPZHxdFA8QanbMmejUF5WMHhoSjF4yLM5s2116kMwAlY3fgBjm5y+NlKhLHj/hujOlbFNvZly3DTTZeVKzqKRmu3tXfBWU39dNrEindb500T9q/uBAALf/JnmoEDTyBjeMVPsnf5dDUR74IEzRCpGAbdQ3O7cSsKyKDxWdeFcNXfTtxjUXZFimOcLNnCFKZCeaSfeYobum3ucML9WrKR97RVy5v3Lfx0tDqM6+rxiNB8V2omWZBKMuS2ctxMYblBSgpuTeo0AwzgBpG3QPjn/XtHGUJSNcprWx4+EJf57c+aoVsw6RrDwqNHjOC4NwQLrZS3JwPq9ZurrQ3z+0faDjVgCKGiaSai/MYIEOxjz6y0JV7S/nzeXx2vj0cHxXWqZHnh6T9RJTZR2FYN3ljrcHY4tAawPpKSg3m0JeR8RjftTRl4bazeKWQDo8QHjESXnnCasNxm+UQq5sBtRR7Musdmt9rGpmER/dn0CgA68nSYe83D/NfBcBlve+QvNTZIIs6xEcOssV623rKAQR/kjRxChOSKEVjtgFfHF1+nY4D9KHRcjppnnBHe/fQGug+Kw11gRc/qIznYVud+oLIfOw5KDseN90g88PBDfQ0CZvGwoBHMtMdV2hjuHPKHU32KHaa+leV0A92j00BRSpDl8V15TciLZwV9w47Q3d+yml5TEK7mzmKHXV1Ao1OU6OU9etTWM1IK+VCwWqCv+0Q2g3i672VaYlELc8LedAsm/NWUnhUnWOzpt9R2hEDbbfgXbvtfQjOXztD/YthcnfuPnz+gMfapTtm75XxmfxzEozg+bA9diit56RaEiFqsbf6XfDXM4hUUyaadbtnO/BXV4NZePSOvh7Ul1xrQcSrPTNZIrSaPkCX6Dr49hyCqjbtHDFWZYQ+DdKGmN1jwWwC3/IX9vEuSHShSMDuk0ICJxLimNmKnjkkv+e+ybeupXMWGaOrTP4Va6zuJ0tFF/XXQoFPM+9ptIDqJ25YLxg1GE/8EtusIg8+P/9usqHHApxACJL2YcvHbLMDXh3fKYxt+Kj+dH3U9oTWJTuW6B/X5uI3JWBr+PJZlMHW46jh3uCDK9gF8ZoIH9lTO177D95p1NVFSMPhU0ClRScdh9pERHAua4HWdBBiehe1Fq76KZhw3dwyv0f+/Fa/0zgy0yQAlXhnCZ8qLT1DukA6miV31JygYAwQQKodZYpQYr3PXit8rmjYvOiHvOjSh2ClPLX9Nr0MhP6VQRl6wSrAhYGpAtv8F6e2WLr6lkLa4kRKQakM1n1erhsLDaeSC0nllHBaYbjGqgAlFue6cfv37lJ2QyRtCwEHdzpDozDhTLRo4eHNSEDBvIPaP6atou7kcqtBvAPfzsK7XmvT6qy6HnSH0kZQF2z1P9hLHDtVYSW/fF5qWJZCkuYLXce3CEp8IE51xp8C9ZnF97+my9tnISMirj56LoJp/H36M8le3ln39uy1Tw5FFHSI4rkYKHvJg0Yk0F0kO3/WtsFqskBBh3AWEtpWnP+C1NGIpDarlHYxLLimuF3J8D+ty6HtsDUzuJIpszR9wkl/qRt8XSMrPaEZMeAaxRpXhZ5G2YotYVqmnQrfDdQw6wrrbv8tEkF3LPFXTmSTFUMROlNBHqISkWVEJKXdLjG9vA1a0khiLxZcyvBjCdUXp+qkzGz+nqebpPtK94JJRNCaIH5OvMijdYuwdkWpDB89fpl2pFRP55aozU1CoRkkWTLEnrfm4ubnjnbUsC5+pulrrDb3piEfYuBFlQtQILsnfNSLNlibUaKIhMk9uPIy/MIXnY6LxX/tGHxwlu2rDITpDbu8VOtO7gS6BUk/KinM38xDn3YWg6QnT72fd8veXHp2G7vkn3EJV8k3AZ6WyaWcSoHSK05qf2S2dwUkBpiPNWI29oJBUB2Zt3GBHmlf0yCkj1nqO2PTgxlJ6gKTTvTnNvFoFaZc5aQwqGGUhi84bSBqztsC7RounxZftwOjdkinoK2WMNbS2bD8WDMlhZqFB6q20D3WpYlZObEQboyj7cqqJcSLaKXG1rxnLN018K6D+Bf6/6QA+67w=="
  };

  const SYNTHETIC_TEST_BUNDLE = {
      "kdf": "PBKDF2-SHA256",
      "iter": 210000,
      "cipher": "AES-256-GCM",
      "salt": "ZlWvPOzQ+DyRXZT/c9Hraw==",
      "iv": "HUst9tilETzHxKOf",
      "ct": "A4SR78jbV+rFR2FGnQ37LrDxaRydzYsO4UF2QWzkO8Q8hsTMBdu/HIooi2Nn95kqVMo/f3ceMKHMSQGZydbueVzagZr5YLea4gc5lwdg3bCy2LPcFK89bRp8i0q2m32Oui57CiAD7oCfKUgrfog7oJ+IPxCJk3yY3R/KviSG6O7YOAlcdl++Qp6EA40ZhUm9tbkkEMBpM2bjgbmlGfYzAPglhTeyfA2btvczFFR0MgG/BfeheiUpl37GqPDDJJ2ky7gdUXKIUxvgtfO1vHCUpE8Ra6tP6tbUJgHCTjASQDC6OU2YlKP5ZdNc2XQs8D2CztvcK/lYzndohiiTtSkl8PejjDo/gx9XCo7sqng8lEz8UvtRFIOXfwNWskZ2xviOrw6pHSaY/+UN6dNCETgwECnYzRPdmuUl9U87z2lnGVC42EJA2r8fLLyVIVCCcFzPK49iep4jjJ4xwO/koxDpismr1xow+0Z2kVu7kIilRuAGwU7r+4mcksbhw3fcFCGnsFv5x2U8f6mWJ4efrQ3wjWq+b8ujVBzJdjsl94HLuusAojjMePX0jhnkPKjaBaZJNGA2mrmtq6J2FIo6uexqW01J6Y4MrUWzpVKxKtTRPl/NQ1kLoHn454u+22S8aGEVJBWRT1vO2Yubi4T/Dl0hMj2VNwjEFeFChdS3yM8hHvoBc4eM2IAp979g0nUp80bxmRdscjkWm9faiXi230sFP6n8aQx3QEQaFfuIFRpMCqF6WDrVc4qS8UkNxYWGPfYdC3Fdb9c3XWfJbGxy9T329b4i5uWRPKm8mvn5FTRCBvNmZyTR0Sy/keHV1MB4XVKHx0v6CLyWUfNUd9rXwpqEpM5LUMi8G30Z2c6HJJfEoAaxSU6B6uZsKadMTdezZOMXrinVF7RcyH+nox9NcLl+Ctkqbuftq3GcKQIYpf9fgaDgviOAb7l+hojVX0mM5ho="
  };

  const VIDEO_CHAPTERS = [
    {
      id: "act1",
      src: "videos/act1-unity-catalog.mp4",
      badge: "CHAPTER 1 / 4 · UNITY CATALOG",
      titleZh: "第一幕 · Unity Catalog 三层奖牌架构与列级血缘实录",
      titleEn: "Act 1 · Unity Catalog Medallion & Column Lineage Walkthrough",
      descZh: "铜银金 24,024→24,000 质检拦截、mask_phone() 动态脱敏与 mv_retail_kpi 指标视图实机巡检",
      descEn: "Live walkthrough of Bronze/Silver/Gold 24,024→24,000 gate, mask_phone() masking, and mv_retail_kpi Metric View"
    },
    {
      id: "act2a",
      src: "videos/act2a-genie-anomaly.mp4",
      badge: "CHAPTER 2 / 4 · GENIE ANOMALY",
      titleZh: "第二幕（上）· AI/BI Genie 华东净毛利异动与指标视图校验",
      titleEn: "Act 2A · AI/BI Genie Margin Drop & Metric View Verification",
      descZh: "自然语言提问自动调用 MEASURE(net_margin_rate)，秒级锁定华东大区 29.0%→25.9%（-3.1pp）异常跌幅",
      descEn: "Natural-language query invoking governed MEASURE(net_margin_rate) to isolate East China's 29.0%→25.9% (-3.1pp) drop"
    },
    {
      id: "act2b",
      src: "videos/act2b-genie-rootcause.mp4",
      badge: "CHAPTER 3 / 4 · GENIE ROOT CAUSE",
      titleZh: "第二幕（下）· 昆山二号仓 17.3h 冷链延迟追因与嘉兴仓调拨",
      titleEn: "Act 2B · 17.3h Cold-Chain Delay Root-Cause & Jiaxing Transfer",
      descZh: "连续追问下钻至昆山二号冷链仓（缺货率 16.2%、延迟飙至 17.3h），并定位嘉兴一号仓 1,460 箱富余库存",
      descEn: "Multi-turn drilldown into Kunshan #2 DC (16.2% stockout, 17.3h dispatch spike) and Jiaxing #1 DC's 1,460 surplus cases"
    },
    {
      id: "act3",
      src: "videos/act3-aibi-dashboard.mp4",
      badge: "CHAPTER 4 / 4 · AI/BI DASHBOARD",
      titleZh: "第三幕 · 已发布 AI/BI 高管经营看板与内嵌 Genie 联动",
      titleEn: "Act 3 · Published AI/BI Executive Dashboard + Embedded Genie",
      descZh: "实机展示已发布的 Zava 全渠道生鲜冷链高管看板、交互式筛选器与右侧内嵌 AI/BI Genie 即席问答",
      descEn: "Live tour of the published Zava omnichannel executive dashboard, cross-filtering, and side-by-side embedded Genie"
    }
  ];

  let liveManifest = null;
  let liveSessionMeta = null;
  let liveGateError = "";
  let liveGateNotice = "";
  let liveRoutingMode = "sso"; // 'sso' | 'direct'
  let liveProbing = false;
  let liveProbes = {
    site: { state: "idle", detail: "" },
    oidc: { state: "idle", detail: "" },
    dbx: { state: "idle", detail: "" }
  };
  let currentVideoIdx = 0;

  function b64ToBytes(b64) {
    const bin = window.atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  async function decryptManifestBundle(passcode, bundle) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("WebCrypto API unavailable in this browser context");
    }
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(String(passcode || "")),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const aesKey = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: b64ToBytes(bundle.salt),
        iterations: Number(bundle.iter) || 210000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuf = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: b64ToBytes(bundle.iv) },
      aesKey,
      b64ToBytes(bundle.ct)
    );
    const parsed = JSON.parse(new TextDecoder().decode(plainBuf));
    if (!parsed || typeof parsed.workspaceOrigin !== "string" || !Array.isArray(parsed.routes)) {
      throw new Error("Invalid decrypted manifest structure");
    }
    return parsed;
  }

  function encodeAadNextUrl(routePath) {
    const raw = String(routePath || "/");
    const normalized = raw.charAt(0) === "/" ? raw : "/" + raw;
    const bytes = new TextEncoder().encode(normalized);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return window.btoa(bin);
  }

  function buildSsoBootstrapUrl(manifest, nextPath) {
    const u = new URL("/aad/auth", manifest.workspaceOrigin);
    u.searchParams.set("hash", "");
    u.searchParams.set("next_url", encodeAadNextUrl(nextPath || "/"));
    if (manifest.orgId) u.searchParams.set("o", manifest.orgId);
    if (manifest.loginHint) u.searchParams.set("login_hint", manifest.loginHint);
    if (manifest.tenantDomain) u.searchParams.set("domain_hint", manifest.tenantDomain);
    return u.toString();
  }

  function buildDirectWorkspaceUrl(manifest, nextPath) {
    return new URL(nextPath || "/", manifest.workspaceOrigin).toString();
  }

  function buildRouteTargetUrl(manifest, route, mode) {
    return mode === "direct"
      ? buildDirectWorkspaceUrl(manifest, route.nextPath)
      : buildSsoBootstrapUrl(manifest, route.nextPath);
  }

  function buildLocalProtocolUrl(manifest, target) {
    const schemeBase = (manifest && manifest.protocolScheme) || "zava-demo://launch";
    const sep = schemeBase.includes("?") ? "&" : "?";
    return `${schemeBase}${sep}target=${encodeURIComponent(target || "all")}`;
  }

  // Deterministic offline verification hook for automated Chromium tests (never mutates live state)
  window.__zavaVerifyFixture = async function (passcode, customBundle) {
    const bundle = customBundle || SYNTHETIC_TEST_BUNDLE;
    const manifest = await decryptManifestBundle(passcode || "unit-test-fixture-only", bundle);
    const firstRoute = manifest.routes[0] || { id: "catalog", nextPath: "/" };
    const sampleSsoUrl = buildSsoBootstrapUrl(manifest, firstRoute.nextPath);
    const nextUrlParam = new URL(sampleSsoUrl).searchParams.get("next_url") || "";
    return {
      ok: true,
      manifest,
      sampleSsoUrl,
      expectedRoutePath: firstRoute.nextPath,
      encodedNextUrl: encodeAadNextUrl(firstRoute.nextPath),
      decodedNextUrl: nextUrlParam ? window.atob(nextUrlParam) : "",
      nextUrlBase64Valid:
        sampleSsoUrl.includes("/aad/auth?hash=&next_url=") &&
        (nextUrlParam ? window.atob(nextUrlParam) === firstRoute.nextPath : false),
      sampleDirectUrl: buildDirectWorkspaceUrl(manifest, firstRoute.nextPath),
      sampleProtocolUrl: buildLocalProtocolUrl(manifest, firstRoute.id)
    };
  };

  function restorePersistedLiveSession() {
    try {
      const savedMode = window.localStorage.getItem(LIVE_MODE_STORAGE_KEY);
      if (savedMode === "sso" || savedMode === "direct") liveRoutingMode = savedMode;
      const raw = window.localStorage.getItem(LIVE_GATE_STORAGE_KEY);
      if (!raw) return;
      const record = JSON.parse(raw);
      if (
        !record ||
        typeof record.expiresAt !== "number" ||
        Date.now() >= record.expiresAt ||
        !record.manifest ||
        typeof record.manifest.workspaceOrigin !== "string"
      ) {
        window.localStorage.removeItem(LIVE_GATE_STORAGE_KEY);
        return;
      }
      liveManifest = record.manifest;
      liveSessionMeta = {
        unlockedAt: record.unlockedAt || Date.now(),
        expiresAt: record.expiresAt,
        persisted: true
      };
    } catch (_err) {
      // Ignore storage access errors in restricted modes
    }
  }

  async function unlockLiveGateway(passcode, remember30d) {
    liveGateError = "";
    liveGateNotice = "";
    const trimmed = String(passcode || "").trim();
    if (!trimmed) {
      liveGateError = T(
        "请输入演示验证口令后再解锁。",
        "Please enter the presenter verification passcode."
      );
      renderLiveGateway();
      return false;
    }
    try {
      const manifest = await decryptManifestBundle(trimmed, LIVE_BUNDLE);
      const now = Date.now();
      const expiresAt = now + THIRTY_DAYS_MS;
      liveManifest = manifest;
      liveSessionMeta = { unlockedAt: now, expiresAt, persisted: Boolean(remember30d) };
      liveProbes = {
        site: { state: "idle", detail: "" },
        oidc: { state: "idle", detail: "" },
        dbx: { state: "idle", detail: "" }
      };
      try {
        if (remember30d) {
          window.localStorage.setItem(
            LIVE_GATE_STORAGE_KEY,
            JSON.stringify({ unlockedAt: now, expiresAt, manifest })
          );
        } else {
          window.localStorage.removeItem(LIVE_GATE_STORAGE_KEY);
        }
      } catch (_storageErr) {
        // Ignore quota/storage restrictions
      }
      renderLiveGateway();
      return true;
    } catch (_err) {
      liveGateError = T(
        "口令校验未通过：PBKDF2-SHA256 (210,000 次迭代) + AES-256-GCM 认证标签不匹配，请核对口令后重试。",
        "Verification failed: PBKDF2-SHA256 (210k iter) + AES-256-GCM authentication tag mismatch. Please double-check your passcode."
      );
      renderLiveGateway();
      return false;
    }
  }

  function lockAndClearLiveGateway() {
    liveManifest = null;
    liveSessionMeta = null;
    liveGateError = "";
    liveGateNotice = T(
      "已清除本机 30 天免输缓存并重新锁定实机网关。",
      "Cleared 30-day browser cache and re-locked the live gateway."
    );
    try {
      window.localStorage.removeItem(LIVE_GATE_STORAGE_KEY);
    } catch (_err) {
      // Ignore
    }
    renderLiveGateway();
  }

  async function runConnectivityProbes() {
    if (!liveManifest || liveProbing) return;
    liveProbing = true;
    liveProbes = {
      site: { state: "running", detail: T("正在探测 HEAD 响应...", "Probing HEAD latency...") },
      oidc: { state: "running", detail: T("正在校验 Entra OIDC 元数据...", "Verifying Entra OIDC discovery...") },
      dbx: { state: "running", detail: T("正在探测 Databricks 控制面...", "Probing Databricks control plane...") }
    };
    renderLiveGateway();

    // Probe 1: Personal Website Gateway
    const probeSite = (async () => {
      const t0 = performance.now();
      try {
        const res = await window.fetch(window.location.href.split("#")[0], {
          method: "HEAD",
          cache: "no-store"
        });
        const ms = Math.max(1, Math.round(performance.now() - t0));
        if (res.ok || res.status === 200 || res.status === 304) {
          liveProbes.site = {
            state: "ok",
            detail: T(`HTTP ${res.status || 200} 正常 · ${ms} ms`, `HTTP ${res.status || 200} OK · ${ms} ms`)
          };
        } else {
          liveProbes.site = { state: "warn", detail: `HTTP ${res.status} · ${ms} ms` };
        }
      } catch (e) {
        liveProbes.site = {
          state: "fail",
          detail: T("静态网关探测异常（请通过 HTTPS/本地 HTTP 访问）", "Gateway probe failed (serve via HTTP/HTTPS)")
        };
      }
    })();

    // Probe 2: Diamond Entra ID Tenant OIDC Discovery
    const probeOidc = (async () => {
      const t0 = performance.now();
      try {
        const res = await window.fetch(liveManifest.oidcDiscoveryUrl, { cache: "no-store" });
        const ms = Math.max(1, Math.round(performance.now() - t0));
        if (!res.ok) {
          liveProbes.oidc = { state: "fail", detail: `HTTP ${res.status} · ${ms} ms` };
          return;
        }
        const json = await res.json();
        const issuerOk =
          json &&
          typeof json.issuer === "string" &&
          (!liveManifest.tenantId || json.issuer.includes(liveManifest.tenantId));
        liveProbes.oidc = issuerOk
          ? {
              state: "ok",
              detail: T(
                `Entra 专属租户 issuer 校验通过 · ${ms} ms`,
                `Tenant OIDC issuer verified · ${ms} ms`
              )
            }
          : {
              state: "warn",
              detail: T(`OIDC 响应返回但 issuer 待核对 · ${ms} ms`, `OIDC responded (issuer mismatch) · ${ms} ms`)
            };
      } catch (_e) {
        liveProbes.oidc = {
          state: "fail",
          detail: T("无法连接 login.microsoftonline.com（请检查外网）", "Cannot reach login.microsoftonline.com")
        };
      }
    })();

    // Probe 3: Azure Databricks Control Plane
    const probeDbx = (async () => {
      const t0 = performance.now();
      try {
        const res = await window.fetch(liveManifest.pingUrl, {
          mode: "no-cors",
          cache: "no-store"
        });
        const ms = Math.max(1, Math.round(performance.now() - t0));
        if (res && (res.type === "opaque" || res.ok || res.status >= 0)) {
          liveProbes.dbx = {
            state: "ok",
            detail: T(
              `HTTPS 控制面握手可达 · ${ms} ms`,
              `HTTPS control plane reachable · ${ms} ms`
            )
          };
        } else {
          liveProbes.dbx = { state: "warn", detail: `${ms} ms` };
        }
      } catch (_e) {
        liveProbes.dbx = {
          state: "fail",
          detail: T("Databricks 控制面网络受阻", "Databricks control plane unreachable")
        };
      }
    })();

    await Promise.all([probeSite, probeOidc, probeDbx]);
    liveProbing = false;
    renderLiveGateway();
  }

  function formatDateShort(ts) {
    try {
      return new Date(ts).toISOString().slice(0, 10);
    } catch (_e) {
      return "";
    }
  }

  function renderProbeBadge(probe) {
    if (probe.state === "ok") return `<span class="pill-tag tag-green">${T("✅ 连通正常", "✅ Reachable")}</span>`;
    if (probe.state === "running") return `<span class="pill-tag tag-blue">${T("⏳ 探测中", "⏳ Probing")}</span>`;
    if (probe.state === "warn") return `<span class="pill-tag tag-amber">${T("⚠️ 需留意", "⚠️ Check")}</span>`;
    if (probe.state === "fail") return `<span class="pill-tag tag-red">${T("✕ 网络受限", "✕ Blocked")}</span>`;
    return `<span class="pill-tag tag-purple">${T("待检测", "Ready")}</span>`;
  }

  function renderArchitectureCardsHtml() {
    return `
      <div class="live-arch-grid">
        <div class="live-arch-card">
          <span class="pill-tag tag-purple">LAYER 1 · ZERO-PLAINTEXT GATE</span>
          <h3>${T(
            "1️⃣ WebCrypto 零明文口令门禁 + 30 天本机免输",
            "1️⃣ WebCrypto Zero-Plaintext Gate + 30-Day Remember-Me"
          )}</h3>
          <p>${T(
            "源码仅存 PBKDF2-SHA256 (210,000 次迭代) + AES-256-GCM 密文，不暴露任何租户 ID、工作区域名或演示账号。勾选记住后在 localStorage 保存 30 天解锁态，日常打开个人网站直接秒进。",
            "Client code stores only PBKDF2-SHA256 (210k iterations) + AES-256-GCM ciphertext—zero tenant IDs, hostnames, or usernames in git. Optional 30-day localStorage persistence skips re-typing."
          )}</p>
        </div>
        <div class="live-arch-card">
          <span class="pill-tag tag-blue">LAYER 2 · TENANT-PINNED /aad/auth SSO</span>
          <h3>${T(
            "2️⃣ 租户 + login_hint 双锁定直连（彻底告别无痕窗口）",
            "2️⃣ Tenant-Pinned + login_hint /aad/auth SSO (No InPrivate Needed)"
          )}</h3>
          <p>${T(
            "普通浏览器直访 /login.html 常被 Windows WAM 默认企业账号劫持或误跳个人账号。本网关动态拼装 /aad/auth?hash=&amp;next_url=&lt;Base64&gt;&amp;o=&lt;orgId&gt;&amp;login_hint=...&amp;domain_hint=...，精准锁定 Diamond 租户与管理员账号，首次勾选「保持登录状态」后即可与公司 M365 账号同浏览器长期共存！",
            "Visiting /login.html directly often triggers corporate Windows WAM account hijacks or consumer MSA redirects. Every button here builds /aad/auth?hash=&amp;next_url=&lt;Base64&gt;&amp;o=&lt;orgId&gt;&amp;login_hint=...&amp;domain_hint=..., pinning the exact Entra tenant &amp; account so normal browsers coexist peacefully with corporate M365 once 'Stay signed in' is accepted."
          )}</p>
        </div>
        <div class="live-arch-card">
          <span class="pill-tag tag-green">LAYER 3 · WAM-ISOLATED PROTOCOL</span>
          <h3>${T(
            "3️⃣ 本机持久化免登专窗协议 (zava-demo://launch)",
            "3️⃣ Local WAM-Isolated Persistent Profile (zava-demo://launch)"
          )}</h3>
          <p>${T(
            "针对开启了强策略条件访问的公司托管电脑，支持一键唤起已注册的 zava-demo://launch?target=all 本地隔离持久化浏览器专窗，完全绕开系统级 WAM 抢占且永久保留登录 Cookie。",
            "On strictly managed corporate Windows PCs with aggressive WAM policies, one click invokes zava-demo://launch?target=all to open a dedicated local persistent browser profile with permanent session cookies."
          )}</p>
        </div>
      </div>
    `;
  }

  function renderLiveGateway() {
    const mount = document.getElementById("liveGatewayMount");
    if (!mount) return;

    if (!liveManifest) {
      mount.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">${T(
                "🔐 Zava 实机环境免无痕直连网关（WebCrypto 零明文验证）",
                "🔐 Zava Live Environment Zero-InPrivate Gateway (WebCrypto Verified)"
              )}</h2>
              <p class="card-subtitle">${T(
                "首次输入演示口令即可在当前普通浏览器解锁直连工作台（支持 30 天免重复验证，或使用 #unlock=口令 书签一键静默解锁）",
                "Enter the presenter passcode once to unlock tenant-pinned SSO launchers in your normal browser (30-day persistence + #unlock= bookmark support)"
              )}</p>
            </div>
            <span class="pill-tag tag-amber">${T("🔒 待验证演示口令", "🔒 Passcode Required")}</span>
          </div>

          ${renderArchitectureCardsHtml()}

          <form class="live-gate-form" id="liveUnlockForm" autocomplete="off">
            <div style="font-size:13px;font-weight:700;color:var(--text-primary);">
              ${T("输入讲师验证口令解锁实机直连票据：", "Enter Presenter Passcode to Decrypt Live SSO Routes:")}
            </div>
            <div class="live-input-row">
              <div class="live-pass-wrap">
                <input
                  type="password"
                  id="livePasscodeInput"
                  placeholder="${T("请输入演示验证口令...", "Enter presenter verification passcode...")}"
                  aria-label="${T("演示验证口令", "Presenter verification passcode")}"
                />
                <button type="button" class="btn btn-sm" id="btnTogglePassVis">
                  ${T("👁️ 显示", "👁️ Show")}
                </button>
              </div>
              <button type="submit" class="btn btn-fabric" id="btnUnlockLive">
                ${T("🔓 解锁免无痕实机直连", "🔓 Unlock Zero-InPrivate Access")}
              </button>
            </div>
            <label class="live-remember-label">
              <input type="checkbox" id="chkRemember30d" checked />
              <span>${T(
                "在此浏览器记住验证状态 (30天免输 · 仅存于本机 localStorage)",
                "Remember in this browser (30 days · stored locally in localStorage)"
              )}</span>
            </label>
            ${
              liveGateError
                ? `<div class="live-alert live-alert-error" id="liveGateErrorBox" role="alert">${esc(liveGateError)}</div>`
                : ""
            }
            ${
              liveGateNotice
                ? `<div class="live-alert live-alert-info" id="liveGateNoticeBox">${esc(liveGateNotice)}</div>`
                : ""
            }
          </form>
        </div>
      `;

      const form = document.getElementById("liveUnlockForm");
      const passInput = document.getElementById("livePasscodeInput");
      const toggleVis = document.getElementById("btnTogglePassVis");
      const rememberChk = document.getElementById("chkRemember30d");

      if (toggleVis && passInput) {
        toggleVis.addEventListener("click", () => {
          const isPwd = passInput.type === "password";
          passInput.type = isPwd ? "text" : "password";
          toggleVis.textContent = isPwd ? T("🙈 隐藏", "🙈 Hide") : T("👁️ 显示", "👁️ Show");
        });
      }
      if (form && passInput) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const btn = document.getElementById("btnUnlockLive");
          if (btn) {
            btn.disabled = true;
            btn.textContent = T("⏳ 正在解密校验...", "⏳ Decrypting (210k PBKDF2)...");
          }
          await unlockLiveGateway(passInput.value, rememberChk ? rememberChk.checked : true);
        });
      }
      return;
    }

    // Unlocked view
    const envLabel = IS_EN
      ? liveManifest.labelEn || liveManifest.labelZh || "Zava Live Workspace"
      : liveManifest.labelZh || liveManifest.labelEn || "Zava 实机工作区";
    const expText =
      liveSessionMeta && liveSessionMeta.persisted
        ? T(
            `本机免输有效期至 ${formatDateShort(liveSessionMeta.expiresAt)}`,
            `Remembered in this browser until ${formatDateShort(liveSessionMeta.expiresAt)}`
          )
        : T("仅本次标签页会话有效", "Active for current session only");

    const routesHtml = (liveManifest.routes || [])
      .map((r) => {
        const href = buildRouteTargetUrl(liveManifest, r, liveRoutingMode);
        const ssoHref = buildSsoBootstrapUrl(liveManifest, r.nextPath);
        const title = IS_EN ? r.titleEn || r.titleZh : r.titleZh || r.titleEn;
        const desc = IS_EN ? r.descEn || r.descZh : r.descZh || r.descEn;
        return `
          <div class="live-route-card">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
                <span class="pill-tag tag-blue">${esc(r.badge || r.id)}</span>
                <span style="font-size:11px;color:var(--text-muted);font-family:Consolas,monospace;">${esc(r.nextPath)}</span>
              </div>
              <h3 style="margin:0 0 5px;font-size:14.5px;font-weight:800;">${esc(title)}</h3>
              <p style="margin:0;font-size:12.5px;color:var(--text-secondary);line-height:1.5;">${esc(desc)}</p>
            </div>
            <div class="live-route-actions">
              <a class="btn btn-sm btn-fabric" href="${esc(href)}" target="_blank" rel="noopener noreferrer">
                ${
                  liveRoutingMode === "sso"
                    ? T("🚀 免无痕 SSO 直达 ↗", "🚀 Launch via Tenant SSO ↗")
                    : T("⚡ 秒开直连页 ↗", "⚡ Open Direct Session ↗")
                }
              </a>
              <button type="button" class="btn btn-sm btn-copy-sso" data-sso-url="${esc(ssoHref)}">
                ${T("📋 复制免无痕链接", "📋 Copy SSO Link")}
              </button>
              <button type="button" class="btn btn-sm btn-proto-route" data-proto-target="${esc(r.id)}">
                ${T("💻 本机专窗", "💻 Local Profile")}
              </button>
            </div>
          </div>
        `;
      })
      .join("");

    mount.innerHTML = `
      <div class="card">
        <div class="live-unlocked-banner">
          <div style="min-width:0;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span class="pill-tag tag-green">${T(
                "✅ 已通过加密验证 · 免无痕直连就绪",
                "✅ Verified · Zero-InPrivate SSO Ready"
              )}</span>
              <strong style="font-size:14px;">${esc(envLabel)}</strong>
            </div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">
              ${esc(expText)} · ${T(
                "首次在普通浏览器登录时勾选「保持登录状态 (Stay signed in)」，后续即可 0 口令秒进实机环境",
                "Accept 'Stay signed in' once in your normal browser for seamless zero-prompt access alongside M365"
              )}
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="btn btn-sm btn-fabric" id="btnRunLiveProbes" ${liveProbing ? "disabled" : ""}>
              ${
                liveProbing
                  ? T("⏳ 正在检测实机连通性...", "⏳ Testing Reachability...")
                  : T("🩺 立即检测实机环境连通性", "🩺 Test Live Environment Reachability")
              }
            </button>
            <button type="button" class="btn btn-sm" id="btnLockGateway">
              ${T("🔒 锁定并清除本机缓存", "🔒 Lock & Clear")}
            </button>
          </div>
        </div>

        <div style="font-size:12.5px;font-weight:800;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.4px;">
          ${T("选择普通浏览器直连路由策略", "Select Normal-Browser Routing Mode")}
        </div>
        <div class="live-mode-grid">
          <button type="button" class="live-mode-option ${liveRoutingMode === "sso" ? "active" : ""}" data-route-mode="sso">
            <strong style="font-size:13px;">${T(
              "🔐 租户+账号双锁定 SSO 模式（普通浏览器免无痕推荐）",
              "🔐 Tenant + Account Pinned SSO Mode (Recommended · Zero-InPrivate)"
            )}</strong>
            <span style="font-size:12px;color:var(--text-secondary);">
              ${T(
                "通过 /aad/auth?hash=&amp;next_url=&lt;Base64&gt;&amp;o=...&amp;login_hint=...&amp;domain_hint=... 精确路由，防止默认企业账号串号",
                "Routes via /aad/auth?hash=&amp;next_url=&lt;Base64&gt;&amp;o=...&amp;login_hint=...&amp;domain_hint=... to prevent corporate WAM account collision"
              )}
            </span>
          </button>
          <button type="button" class="live-mode-option ${liveRoutingMode === "direct" ? "active" : ""}" data-route-mode="direct">
            <strong style="font-size:13px;">${T(
              "⚡ 已登录会话秒开模式（同浏览器已保持登录时 0 跳转）",
              "⚡ Direct Active-Session Mode (0-Redirect When Already Signed In)"
            )}</strong>
            <span style="font-size:12px;color:var(--text-secondary);">
              ${T(
                "跳过 OIDC 引导页直接打开目标工作区深度路径，适合已完成首次免无痕登录后的极速切换",
                "Opens workspace deep-links directly with zero OAuth round-trip once your browser session cookie is active"
              )}
            </span>
          </button>
        </div>

        <div class="live-probe-grid" id="liveProbeGrid">
          <div class="live-probe-card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <strong style="font-size:12.5px;">${T("1. 个人网站静态网关", "1. Personal Site Gateway")}</strong>
              ${renderProbeBadge(liveProbes.site)}
            </div>
            <div style="font-size:12px;color:var(--text-secondary);">
              ${esc(liveProbes.site.detail || T("HEAD 当前站点响应与延迟", "Current page HEAD status & latency"))}
            </div>
          </div>
          <div class="live-probe-card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <strong style="font-size:12.5px;">${T("2. Diamond Entra 租户 OIDC", "2. Diamond Entra Tenant OIDC")}</strong>
              ${renderProbeBadge(liveProbes.oidc)}
            </div>
            <div style="font-size:12px;color:var(--text-secondary);">
              ${esc(liveProbes.oidc.detail || T("校验专属租户 openid-configuration 颁发者", "Verifies tenant openid-configuration issuer"))}
            </div>
          </div>
          <div class="live-probe-card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <strong style="font-size:12.5px;">${T("3. Azure Databricks 控制面", "3. Azure Databricks Control Plane")}</strong>
              ${renderProbeBadge(liveProbes.dbx)}
            </div>
            <div style="font-size:12px;color:var(--text-secondary);">
              ${esc(liveProbes.dbx.detail || T("探测工作区 HTTPS 控制面握手延迟", "Checks workspace HTTPS control-plane reachability"))}
            </div>
          </div>
        </div>

        <div class="live-bulk-bar">
          <button type="button" class="btn btn-dbx" id="btnLaunchCoreThree">
            ${T(
              "🚀 一键连开三幕核心实机页 (Catalog + Genie + AI/BI 看板)",
              "🚀 Launch All 3 Core Live Tabs (Catalog + Genie + AI/BI Dashboard)"
            )}
          </button>
          <button type="button" class="btn" id="btnLaunchProtoAll">
            ${T(
              "💻 唤起本机持久化免登专窗 (zava-demo://launch?target=all)",
              "💻 Open Local Persistent Profile (zava-demo://launch?target=all)"
            )}
          </button>
          ${
            liveGateNotice
              ? `<span style="font-size:12px;color:var(--status-green);font-weight:700;">${esc(liveGateNotice)}</span>`
              : ""
          }
        </div>

        <div class="live-routes-grid">
          ${routesHtml}
        </div>

        <details style="margin-top:16px;">
          <summary style="cursor:pointer;font-size:12.5px;font-weight:700;color:var(--text-secondary);">
            ${T("展开查看三层免无痕登录架构原理说明", "View 3-Layer Non-InPrivate Login Architecture Details")}
          </summary>
          <div style="margin-top:12px;">
            ${renderArchitectureCardsHtml()}
          </div>
        </details>
      </div>
    `;

    document.getElementById("btnLockGateway")?.addEventListener("click", lockAndClearLiveGateway);
    document.getElementById("btnRunLiveProbes")?.addEventListener("click", runConnectivityProbes);

    mount.querySelectorAll("[data-route-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        liveRoutingMode = btn.dataset.routeMode === "direct" ? "direct" : "sso";
        try {
          window.localStorage.setItem(LIVE_MODE_STORAGE_KEY, liveRoutingMode);
        } catch (_e) {
          // Ignore
        }
        renderLiveGateway();
      });
    });

    document.getElementById("btnLaunchCoreThree")?.addEventListener("click", () => {
      const coreIds = ["catalog", "genie", "dashboard"];
      const targets = coreIds
        .map((id) => (liveManifest.routes || []).find((r) => r.id === id))
        .filter(Boolean);
      const list = targets.length ? targets : (liveManifest.routes || []).slice(0, 3);
      let blocked = 0;
      list.forEach((r) => {
        const win = window.open(buildRouteTargetUrl(liveManifest, r, liveRoutingMode), "_blank", "noopener,noreferrer");
        if (!win) blocked++;
      });
      liveGateNotice = blocked
        ? T(
            "部分标签页被浏览器弹窗拦截器折叠，请在地址栏允许本站弹窗或单独点击下方卡片。",
            "Browser blocked multi-tab popups—allow popups for this site or launch each card individually below."
          )
        : T("已在新标签页打开三幕核心实机工作台。", "Opened all 3 core live tabs.");
      renderLiveGateway();
    });

    document.getElementById("btnLaunchProtoAll")?.addEventListener("click", () => {
      const uri = buildLocalProtocolUrl(liveManifest, "all");
      liveGateNotice = T(`已发起本机专窗协议唤起：${uri}`, `Invoked local profile protocol: ${uri}`);
      renderLiveGateway();
      window.location.assign(uri);
    });

    mount.querySelectorAll(".btn-proto-route").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.protoTarget || "all";
        const uri = buildLocalProtocolUrl(liveManifest, target);
        liveGateNotice = T(`已发起本机专窗协议唤起：${uri}`, `Invoked local profile protocol: ${uri}`);
        renderLiveGateway();
        window.location.assign(uri);
      });
    });

    mount.querySelectorAll(".btn-copy-sso").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const url = btn.dataset.ssoUrl || "";
        try {
          await navigator.clipboard.writeText(url);
          btn.textContent = T("✅ 已复制免无痕链接", "✅ Copied SSO Link");
          setTimeout(() => {
            btn.textContent = T("📋 复制免无痕链接", "📋 Copy SSO Link");
          }, 1800);
        } catch (_e) {
          // Clipboard fallback ignored
        }
      });
    });
  }

  function selectVideoChapter(idx, autoPlay) {
    const safeIdx = ((idx % VIDEO_CHAPTERS.length) + VIDEO_CHAPTERS.length) % VIDEO_CHAPTERS.length;
    currentVideoIdx = safeIdx;
    const ch = VIDEO_CHAPTERS[safeIdx];
    const videoEl = document.getElementById("zavaWalkthroughVideo");
    const badgeEl = document.getElementById("videoActiveBadge");
    const titleEl = document.getElementById("videoActiveTitle");
    const descEl = document.getElementById("videoActiveDesc");
    const directEl = document.getElementById("videoDirectLink");

    if (videoEl && videoEl.getAttribute("src") !== ch.src) {
      videoEl.setAttribute("src", ch.src);
      videoEl.load();
      if (autoPlay) {
        videoEl.play().catch(() => {});
      }
    }
    if (badgeEl) badgeEl.textContent = ch.badge;
    if (titleEl) titleEl.textContent = IS_EN ? ch.titleEn : ch.titleZh;
    if (descEl) descEl.textContent = IS_EN ? ch.descEn : ch.descZh;
    if (directEl) directEl.setAttribute("href", ch.src);

    renderVideoChapterList();
  }

  function renderVideoChapterList() {
    const listEl = document.getElementById("videoChapterList");
    if (!listEl) return;
    listEl.innerHTML = VIDEO_CHAPTERS.map((ch, idx) => {
      const active = idx === currentVideoIdx;
      return `
        <button type="button" class="video-chapter-btn ${active ? "active" : ""}" data-video-idx="${idx}">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;">
            <span class="pill-tag ${active ? "tag-red" : "tag-blue"}">${esc(ch.badge)}</span>
            <span style="font-size:11.5px;font-weight:700;color:${active ? "var(--dbx-orange)" : "var(--text-muted)"};">
              ${active ? T("▶ 当前播放", "▶ Active") : T("点击切换", "Select")}
            </span>
          </div>
          <strong style="font-size:13.5px;">${esc(IS_EN ? ch.titleEn : ch.titleZh)}</strong>
          <span style="font-size:12px;color:var(--text-secondary);line-height:1.45;">
            ${esc(IS_EN ? ch.descEn : ch.descZh)}
          </span>
        </button>
      `;
    }).join("");

    listEl.querySelectorAll("[data-video-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectVideoChapter(Number(btn.dataset.videoIdx), true);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".act-tab").forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });
    document.getElementById("btnHeroLiveAccess")?.addEventListener("click", () => {
      switchTab("live");
      document.getElementById("act-live")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
    document.getElementById("btnVideoPrev")?.addEventListener("click", () => {
      selectVideoChapter(currentVideoIdx - 1, true);
    });
    document.getElementById("btnVideoNext")?.addEventListener("click", () => {
      selectVideoChapter(currentVideoIdx + 1, true);
    });

    restorePersistedLiveSession();
    updateCue();
    renderKpis();
    renderCatalogTab();
    renderGenieTab();
    renderCoexistTab();
    renderBattlecardTab();
    renderLiveGateway();
    selectVideoChapter(0, false);

    const applyHashAct = async () => {
      const rawHash = (window.location.hash || "").replace(/^#/, "");
      if (!rawHash) return;

      const unlockMatch = /(?:^|&)unlock=([^&]+)/.exec(rawHash);
      if (unlockMatch) {
        let passcode = "";
        try {
          passcode = decodeURIComponent(unlockMatch[1]);
        } catch (_e) {
          passcode = unlockMatch[1];
        }
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search + "#act-live"
        );
        switchTab("live");
        await unlockLiveGateway(passcode, true);
        return;
      }

      if (rawHash === "act-live" || rawHash === "live" || rawHash === "act-5") {
        switchTab("live");
        return;
      }

      const m = /^act-([1-4])$/.exec(rawHash);
      if (m) switchTab(ACT_ORDER[Number(m[1]) - 1]);
    };
    applyHashAct();
    window.addEventListener("hashchange", applyHashAct);
  });
})();
