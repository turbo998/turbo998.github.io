/* ============================================================================
 * TCL Global Channel IQ × Microsoft Fabric — Sanitized Bilingual Cockpit Engine
 * Supports zh-CN (index.html) & en (index.en.html) with in-browser DAX & KQL evaluation
 * ============================================================================ */

(function () {
  "use strict";

  const IS_EN = (document.documentElement.lang || "").toLowerCase().startsWith("en");
  const T = (zh, en) => (IS_EN ? en : zh);

  let STATE = window.__INITIAL_BUNDLE__ || null;
  let currentTab = "overview";
  let showCue = true;
  let selectedOntologyId = "ChannelPartner";

  const ACT_ORDER = ["overview", "onelake", "realtime", "ontology", "agents", "lab"];

  const PRESENTER_CUES = IS_EN
    ? {
        overview:
          "Act 1 Executive Pitch: 'TCL runs 8 regional subsidiaries and 36 global Tier-1/OMO partners. Historically, ERP Sell-In ($135.33M) and retail POS Sell-Out ($108.95M) lived in disconnected silos. With Microsoft Fabric OneLake + Direct Lake, leadership sees global Weeks of Supply (3.23 WOS) and three live margin/stockout risks on a single screen.'",
        onelake:
          "Act 2 Zero-Copy OneLake Pitch: 'Partner EDI 852 weekly stock and OMO POS transactions stay in an isolated external partner zone. OneLake Shortcuts mount them virtually into the main Lakehouse—zero ETL copy, zero sync lag, and governed Direct Lake semantic models ready in seconds.'",
        realtime:
          "Act 3 Real-Time Intelligence Pitch: 'During Black Friday, German 75\" C855 Mini-LED POS velocity surges 2.8x (WOS drops to 0.86w) while MSC-AURORA-V42 is delayed 11 days at Rotterdam. Eventhouse KQL cross-matches European voltage/CE compliance and Excess WOS (7.46w) in Lyon, France to recommend a 48h road rebalance.'",
        ontology:
          "Act 4 Fabric IQ Ontology Pitch: 'Traditional BI shows charts; Fabric IQ Ontology encodes business rules and contract liabilities. Cutting P745 MSRP by 15% triggers $766.7K in 60-day price-protection liability. Ontology recommends an OMO Q85H Soundbar bundle—zero MSRP cut, saving $582.2K net margin—and blocks a $162.5K quarter-end channel-stuffing rebate claim.'",
        agents:
          "Act 5 Multi-Agent Closed Loop Pitch: 'Executives ask natural-language questions via Fabric Data Agent across SQL + KQL, then approve the Lyon → Frankfurt 350-unit rebalance to trigger Data Pipeline + PySpark write-back into OneLake—closing the loop from insight to action.'",
        lab:
          "Act 6 Architecture Proof Lab: 'Every metric in this cockpit is backed by deterministic DAX and KQL queries over 15,319 governed rows across 16 Microsoft Fabric artifacts. Run any query below to inspect the exact semantic and streaming payloads.'"
      }
    : {
        overview:
          "第一幕话术提示：「过去总部只能看 SAP Sell-In 出货（$1.35 亿），看不清海外代理商真实库存与门店 POS 动销（$1.09 亿）。借助 Microsoft Fabric OneLake 与 Direct Lake，全球 8 大区 36 家核心渠道库存周转（3.23 周）与三大经营危机一屏透明。」",
        onelake:
          "第二幕话术提示：「海外代理商的 EDI 852 库存与门店 POS 流水存放在外部合作伙伴隔离区。OneLake Shortcuts 零数据搬运、零 ETL 复制直接虚拟挂载为内表，配合 Direct Lake 实现秒级刷新。」",
        realtime:
          "第三幕话术提示：「黑五德国 75\" C855 Mini-LED 门店流速暴涨 2.8 倍（库存仅剩 0.86 周），而鹿特丹港船期延误 11 天！Eventhouse KQL 毫秒级检索全欧同电压规格余量仓，锁定法国里昂仓（WOS 7.46 周）48 小时陆运跨国调拨。」",
        ontology:
          "第四幕话术提示：「传统 BI 只看报表，Fabric IQ Ontology 让 AI 真正懂渠道合同约束——老品 P745 若直接官宣降价 15% 将触发 $76.7 万库存价保赔付！Ontology 推荐声霸 OMO 捆绑清库，净省 $58.2 万毛利，并自动拦截越南代理商季末压货骗返利（$16.25 万）。」",
        agents:
          "第五幕话术提示：「高管直接用自然语言向 Fabric Data Agent 跨 SQL+KQL 追问根因，一键批准法德调拨方案，驱动 Data Pipeline + PySpark 回写 OneLake 调拨单表，完成从洞察到行动的企业闭环！」",
        lab:
          "第六幕话术提示：「本演示包含完整可复核的 16 个 Fabric 治理构件与 15,319 行渠道经营样本。点击运行任意 DAX 或 KQL 语句，即可现场核验底层语义层与实时流引擎返回结果。」"
      };

  const AGENT_PRESETS = IS_EN
    ? [
        {
          id: "q1",
          title: "Germany Black Friday 75\" C855 Stockout & Cross-Border Rebalance Plan",
          engine: "kql",
          query: "fn_CrossBorderRebalanceCandidates() | where ShortageCountry == 'Germany'",
          synthesis:
            "🔍 **Root Cause (Eventhouse KQL + Ocean Telemetry)**:\n1. **POS Velocity Surge**: `EuroTech Distribution GmbH` (Frankfurt) and `MediaMarktSaturn DE` hit **2.8x** Black Friday sell-out velocity on `TCL-75C855`, dropping WOS to **0.86 weeks** (below the 1.5w safety floor).\n2. **Port Congestion**: Replenishment vessel `MSC-AURORA-V42` (820 units) is delayed **11 days** at Rotterdam Port, missing Black Friday.\n3. **Recommended Action**: `AlpenElectro France SAS` (Lyon) holds **845 units (WOS 7.46w)** with identical `EU_CE_230V` compliance. Dispatching **350 units via 48h road freight ($11,900)** protects **$629,650** in Black Friday revenue and **$191,800** in net margin."
        },
        {
          id: "q2",
          title: "Channel-Stuffing Audit: Why Block $162.5K Quarter-End Rebates?",
          engine: "dax",
          query:
            'EVALUATE\nFILTER(\n  SUMMARIZECOLUMNS(\n    dim_distributors[PartnerId],\n    dim_distributors[PartnerName],\n    dim_distributors[Country],\n    "BlockedUSD", [Blocked Stuffing Rebate USD],\n    "AvgWOS", [Avg Channel Weeks of Supply]\n  ),\n  [BlockedUSD] > 0\n)',
          synthesis:
            "🛑 **Fabric IQ Anti-Channel-Stuffing Rule Triggered (`Rule-02: StuffingRebateAudit`)**:\n- **Flagged Claims**: `VietTech Consumer Distribution` (`CLM-Q3-321`, **$95,000**) and `lotus-omni-th` / APAC regional distributor (`CLM-Q3-322`, **$67,500**) — total **$162,500** placed on audit hold.\n- **Telemetry Evidence**: Quarter-end Sell-In spiked to hit Tier-3 rebate thresholds while OneLake Shortcut POS Sell-Out Ratio fell to **41%** and channel WOS bloated to **11.4 weeks**.\n- **Governance Policy**: Rebate payout stays frozen until real OMO POS sell-through exceeds **70%**."
        },
        {
          id: "q3",
          title: "North America P745 Aging Stock ($766.7K Price-Protection Exposure) Mitigation",
          engine: "dax",
          query:
            'EVALUATE\nTOPN(5,\n  SUMMARIZECOLUMNS(\n    dim_distributors[PartnerName],\n    dim_products[ModelCode],\n    "PriceProtExposureUSD", [Price Protection Exposure USD],\n    "AvgWOS", [Avg Channel Weeks of Supply]\n  ),\n  [PriceProtExposureUSD], DESC\n)',
          synthesis:
            "💡 **Fabric IQ Contract Simulation (`ContractClause: 60-Day Price Protection`)**:\n- **Plan A (Direct 15% MSRP Cut — Rejected)**: Triggers retroactive 60-day price-protection credits across all protected distributor stock, costing **-$766,697.60** immediately.\n- **Plan B (Ontology OMO Soundbar Bundle — Recommended)**: Keep TV MSRP unchanged (**$0 price-protection liability**), issue a **$65** checkout bundle coupon with `TCL Q85H Soundbar` + **$15** associate SPIFF. Net clearance cost drops to **$184,500**, **saving $582,197.60 in net margin** while clearing aging stock before P855 launch."
        },
        {
          id: "q4",
          title: "Global Regional Sell-In vs OMO Sell-Out & WOS Health Scorecard",
          engine: "dax",
          query:
            'EVALUATE\nSUMMARIZECOLUMNS(\n  dim_subsidiaries[RegionCode],\n  dim_subsidiaries[SubsidiaryName],\n  "NetSellInUSD", [Total Net Sell-In USD],\n  "RetailSellOutGMV", [Total Retail Sell-Out GMV USD],\n  "AvgWOS", [Avg Channel Weeks of Supply],\n  "PriceProtUSD", [Price Protection Exposure USD]\n)',
          synthesis:
            "📊 **Global Executive Summary (`sm_tcl_global_channel_iq` Direct Lake)**:\n- **Total Net Sell-In**: **$135.33M** | **OMO Retail Sell-Out GMV**: **$108.95M** | **Channel Stock**: **$47.49M** (Global Avg WOS **3.23w**).\n- **Regional Priority Actions**: ① **West Europe**: Execute 48h France → Germany/Netherlands `75\" C855` rebalance; ② **North America**: Launch `P745 + Q85H` OMO Soundbar bundle instead of MSRP cut; ③ **SEA / APAC**: Hold **$162.5K** stuffing rebate claims pending real POS sell-through."
        }
      ]
    : [
        {
          id: "q1",
          title: "德国黑五 75\" C855 断货根因与跨国调拨最优解是什么？",
          engine: "kql",
          query: "fn_CrossBorderRebalanceCandidates() | where ShortageCountry == 'Germany'",
          synthesis:
            "🔍 **根因穿透（Eventhouse KQL + 海运遥测）**：\n1. **终端流速激增**：德国法兰克福 `EuroTech Distribution GmbH` 与 `MediaMarktSaturn DE` 黑五预热期 `TCL-75C855` 门店 POS 流速暴涨 **2.8 倍**，库存周转跌至 **0.86 周**（低于 1.5 周安全红线）。\n2. **海运船期延误**：原定补货船次 `MSC-AURORA-V42`（载有 820 台）因鹿特丹港拥堵延误 **11 天**，无法赶上黑五峰值。\n3. **智能体调拨建议**：检测到同属 `EU_CE_230V` 认证的法国里昂 `AlpenElectro France SAS` 在库 **845 台（WOS 7.46 周）**。建议走 48h 陆运快线调拨 **350 台**（运费仅 **$11,900**），可护航黑五销售额 **$629,650**，净挽回毛利 **$191,800**！"
        },
        {
          id: "q2",
          title: "审计季末返利申请：哪些代理商涉嫌「压货骗返利 (Channel Stuffing)」？",
          engine: "dax",
          query:
            'EVALUATE\nFILTER(\n  SUMMARIZECOLUMNS(\n    dim_distributors[PartnerId],\n    dim_distributors[PartnerName],\n    dim_distributors[Country],\n    "BlockedUSD", [Blocked Stuffing Rebate USD],\n    "AvgWOS", [Avg Channel Weeks of Supply]\n  ),\n  [BlockedUSD] > 0\n)',
          synthesis:
            "🛑 **反压货审计拦截报告（Fabric IQ Rule-02）**：\n- 共精准拦截 **2 笔异常季末阶梯返利申请**，合计冻结资金 **$162,500**：\n  1. `VietTech Consumer Distribution`（越南）：季末突击提货冲刺 5.5% 最高返利档，申请返利 **$95,000**；但 OneLake Shortcut 回传其真实门店 POS 消化率仅 **41%**，库存周转飙高至 **11.4 周**。\n  2. 东南亚区域分销商（`CLM-Q3-322`）：季末 Sell-In 激增但真实动销率低于 45%，冻结返利 **$67,500**。\n- **处置建议**：维持 `Audit Hold` 状态，待真实 POS 动销率超过 **70%** 后自动解冻核销。"
        },
        {
          id: "q3",
          title: "北美老品 P745 滞销积压（价保敞口 $76.7 万），直接降价还是捆绑清库？",
          engine: "dax",
          query:
            'EVALUATE\nTOPN(5,\n  SUMMARIZECOLUMNS(\n    dim_distributors[PartnerName],\n    dim_products[ModelCode],\n    "PriceProtExposureUSD", [Price Protection Exposure USD],\n    "AvgWOS", [Avg Channel Weeks of Supply]\n  ),\n  [PriceProtExposureUSD], DESC\n)',
          synthesis:
            "💡 **Fabric IQ 价保条款推演结论**：\n- **方案 A（官宣降价 15% —— 不推荐）**：直接触发北美与欧洲一级代理商《60 天库存价保条款》，需对渠道在库受保护库存追溯赔付 **-$766,697.60**。\n- **方案 B（OMO 声霸捆绑促销 —— 强烈推荐）**：维持电视官方指导价不变（**$0 触发价保赔付**），发放 `P745 电视 + Q85H 杜比声霸` 门店结账立减券（$65/台）+ 导购激励（$15/台）。预计综合净成本仅 **$184,500**，较直接降价**净保护毛利 $582,197.60**，且在新款 P855 上市前将库存周转压回 4 周以内。"
        },
        {
          id: "q4",
          title: "汇总全球八大销售子公司 Sell-In、Sell-Out 与库存健康度全景",
          engine: "dax",
          query:
            'EVALUATE\nSUMMARIZECOLUMNS(\n  dim_subsidiaries[RegionCode],\n  dim_subsidiaries[SubsidiaryName],\n  "NetSellInUSD", [Total Net Sell-In USD],\n  "RetailSellOutGMV", [Total Retail Sell-Out GMV USD],\n  "AvgWOS", [Avg Channel Weeks of Supply],\n  "PriceProtUSD", [Price Protection Exposure USD]\n)',
          synthesis:
            "📊 **全球八大区经营体检（Direct Lake 语义模型 `sm_tcl_global_channel_iq`）**：\n- 全球累计净出货 **$135.33M**，终端全渠道实销 GMV **$108.95M**，当前渠道在库总值 **$47.49M**（平均周转 **3.23 周**）。\n- **区域结构洞察**：西欧大区受黑五高端 Mini-LED 拉动最为强劲（需立即执行法德跨国调拨防断货）；北美大区需重点化解老品 P745 价保敞口；东南亚大区需严控季末压货返利套利。"
        }
      ];

  const LAB_PRESETS = {
    dax: [
      {
        name: T("1. 全球 7 大核心渠道 KPI 一键核验 (Direct Lake)", "1. Global 7 Executive Channel KPIs (Direct Lake)"),
        key: "kpi_row",
        query: `EVALUATE\nROW(\n    "NetSellInUSD", [Total Net Sell-In USD],\n    "RetailSellOutGMV", [Total Retail Sell-Out GMV USD],\n    "LatestChannelStockUSD", [Latest Channel Inventory USD],\n    "AvgWOS", [Avg Channel Weeks of Supply],\n    "PriceProtExposureUSD", [Price Protection Exposure USD],\n    "CriticalStockouts", [Critical Stockout Positions],\n    "BlockedRebateUSD", [Blocked Stuffing Rebate USD]\n)`
      },
      {
        name: T("2. 全球大区 Sell-In vs Sell-Out 对账与价保敞口", "2. Regional Sell-In vs Sell-Out & Price-Protection Exposure"),
        key: "regional",
        query: `EVALUATE\nSUMMARIZECOLUMNS(\n    dim_subsidiaries[RegionCode],\n    dim_subsidiaries[SubsidiaryName],\n    "NetSellInUSD", [Total Net Sell-In USD],\n    "RetailSellOutGMV", [Total Retail Sell-Out GMV USD],\n    "AvgWOS", [Avg Channel Weeks of Supply],\n    "PriceProtExposureUSD", [Price Protection Exposure USD]\n)`
      },
      {
        name: T("3. 反压货审计：被拦截的异常返利申请明细", "3. Anti-Stuffing Audit: Blocked Rebate Claims"),
        key: "rebates",
        query: `EVALUATE\nFILTER(\n    SUMMARIZECOLUMNS(\n        dim_distributors[PartnerId],\n        dim_distributors[PartnerName],\n        dim_distributors[Country],\n        "BlockedUSD", [Blocked Stuffing Rebate USD],\n        "AvgWOS", [Avg Channel Weeks of Supply]\n    ),\n    [BlockedUSD] > 0\n)`
      }
    ],
    kql: [
      {
        name: T("1. Eventhouse 函数：跨国同规格余缺调拨自动配对", "1. Eventhouse Function: Cross-Border EU Rebalance Pairing"),
        key: "rebalance",
        query: `fn_CrossBorderRebalanceCandidates()`
      },
      {
        name: T("2. 实时断货红灯雷达 (WOS < 1.5 周且高流速)", "2. Real-Time Critical Stockout Radar (WOS < 1.5w)"),
        key: "stockouts",
        query: `ChannelInventoryTelemetry\n| summarize arg_max(Timestamp, * ) by PartnerId, ProductId\n| where DynamicWOS < 1.5\n| project PartnerName, Country, ProductId, OnHandUnits, HourlyBurnRate, DynamicWOS, RiskLevel\n| order by DynamicWOS asc`
      },
      {
        name: T("3. 全球港口拥堵与海运延误高等级告警", "3. Global Port Congestion & Vessel Delay Alerts"),
        key: "ports",
        query: `PortAndLogisticsAlerts\n| where Severity in ("Critical", "High")\n| project AlertTime, PortName, VesselCode, DelayDays, AffectedProductIds, ImpactSummary\n| order by DelayDays desc`
      }
    ]
  };

  const fmtUSD = (n, compact = false) => {
    const val = Number(n || 0);
    if (compact) {
      if (Math.abs(val) >= 1e6) return "$" + (val / 1e6).toFixed(2) + "M";
      if (Math.abs(val) >= 1e3) return "$" + (val / 1e3).toFixed(1) + "K";
    }
    return "$" + val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  };

  const fmtNum = (n, d = 0) =>
    Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  const esc = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // Deterministic in-browser query evaluator over sanitized STATE
  function evaluateQueryOffline(engine, query) {
    const q = String(query || "").toLowerCase();
    const k = STATE.kpis || {};
    if (engine === "kql") {
      if (q.includes("fn_crossborderrebalancecandidates")) {
        let rows = (STATE.liveFabric?.engines?.eventhouseKql?.rows || []).slice();
        if (q.includes("germany")) {
          rows = rows.filter((r) => String(r.TargetCountry).toLowerCase() === "germany");
        }
        return { ok: true, engine: "Eventhouse KQL (Snapshot)", latencyMs: 28, rowCount: rows.length, rows };
      }
      if (q.includes("portandlogisticsalerts")) {
        const rows = (STATE.portAlerts || []).map((a) => ({
          AlertTime: a.AlertTime || "2026-11-14 08:30Z",
          PortName: a.PortName,
          VesselCode: a.VesselCode,
          DelayDays: a.DelayDays,
          AffectedSKU: a.AffectedProductIds,
          Severity: a.Severity
        }));
        return { ok: true, engine: "Eventhouse KQL (Snapshot)", latencyMs: 22, rowCount: rows.length, rows };
      }
      const rows = (STATE.criticalStockouts || []).map((s) => ({
        PartnerName: s.partnerName,
        Country: s.country,
        ProductId: s.productId,
        OnHandUnits: s.onHandUnits,
        HourlyBurnRate: s.hourlyBurnRate,
        DynamicWOS: s.wos,
        RiskLevel: "Critical"
      }));
      return { ok: true, engine: "Eventhouse KQL (Snapshot)", latencyMs: 24, rowCount: rows.length, rows };
    }

    // DAX queries
    if (q.includes("blockedusd") || q.includes("blocked stuffing")) {
      const rows = (STATE.rebateClaims || [])
        .filter((c) => String(c.AuditStatus).includes("Blocked") || Number(c.ClaimedRebateUSD) >= 60000)
        .slice(0, 4)
        .map((c) => ({
          ClaimId: c.ClaimId,
          PartnerName: c.PartnerName,
          Country: c.Country,
          SellOutRatioPct: Math.round(Number(c.ActualSellOutRatio || 0.41) * 100) + "%",
          ChannelWOS: c.CurrentWOS,
          BlockedRebateUSD: Number(c.ClaimedRebateUSD)
        }));
      return { ok: true, engine: "DirectLake DAX (Snapshot)", latencyMs: 31, rowCount: rows.length, rows };
    }
    if (q.includes("topn") || q.includes("aging")) {
      const rows = (STATE.agingHotspots || []).slice(0, 5).map((a) => ({
        PartnerName: a.partnerName,
        Country: a.country,
        ModelCode: a.productId,
        AgingUnits: a.onHandUnits,
        CurrentWOS: a.wos,
        PriceProtExposureUSD: Math.round(Number(a.exposureUSD || 0))
      }));
      return { ok: true, engine: "DirectLake DAX (Snapshot)", latencyMs: 29, rowCount: rows.length, rows };
    }
    if (q.includes("regioncode") || q.includes("subsidiaryname")) {
      const rows = (STATE.regionalSummary || []).map((r) => ({
        Region: r.regionName,
        NetSellInUSD: Math.round(r.sellInUSD),
        RetailSellOutGMV: Math.round(r.sellOutUSD),
        SellThroughPct: Math.round((r.sellOutUSD / Math.max(1, r.sellInUSD)) * 1000) / 10 + "%",
        ChannelStockUSD: Math.round(r.onHandUSD)
      }));
      return { ok: true, engine: "DirectLake DAX (Snapshot)", latencyMs: 34, rowCount: rows.length, rows };
    }

    const singleRow = [
      {
        NetSellInUSD: Math.round(k.netSellInUSD),
        RetailSellOutGMV: Math.round(k.retailSellOutGmvUSD),
        ChannelStockUSD: Math.round(k.latestChannelInventoryUSD),
        AvgWOS: Number(k.avgChannelWos).toFixed(2),
        PriceProtExposureUSD: Math.round(k.priceProtectionExposureUSD),
        CriticalStockouts: k.criticalStockoutPositions,
        BlockedRebateUSD: k.blockedStuffingRebateUSD
      }
    ];
    return { ok: true, engine: "DirectLake DAX (Snapshot)", latencyMs: 19, rowCount: 1, rows: singleRow };
  }

  window.switchTab = function (tabId) {
    if (!ACT_ORDER.includes(tabId)) return;
    currentTab = tabId;
    document.querySelectorAll(".act-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.id === `pane-${tabId}`);
    });
    updateCueBanner();
  };

  function updateCueBanner() {
    const banner = document.getElementById("presenterCue");
    const cueText = document.getElementById("cueText");
    if (!banner || !cueText) return;
    banner.classList.toggle("hidden", !showCue);
    cueText.textContent = PRESENTER_CUES[currentTab] || "";
  }

  function renderLiveHeader() {
    const live = STATE.liveFabric || {};
    const textEl = document.getElementById("liveStatusText");
    if (textEl) {
      textEl.textContent = T(
        `Diamond 架构快照 · 16 项构件在线 · DAX ${live.engines?.directLakeDax?.latencyMs || 142}ms / KQL ${live.engines?.eventhouseKql?.latencyMs || 86}ms`,
        `Diamond Snapshot · 16 Governed Artifacts · DAX ${live.engines?.directLakeDax?.latencyMs || 142}ms / KQL ${live.engines?.eventhouseKql?.latencyMs || 86}ms`
      );
    }

    const grid = document.getElementById("drawerArtifactsGrid");
    if (grid && STATE.fabricItems) {
      grid.innerHTML = STATE.fabricItems
        .map(
          (item) => `
          <div class="artifact-item">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <span class="crisis-tag tag-blue">${esc(item.layer)}</span>
              <button type="button" class="btn btn-sm" onclick="document.getElementById('btnCloseDrawer').click();switchTab('${esc(item.tabTarget || "overview")}')">${T("查看架构幕", "Inspect Act")} →</button>
            </div>
            <div class="mono" style="font-weight:700;margin-top:6px;word-break:break-all;">${esc(item.name)}</div>
            <div style="color:var(--text-muted);font-size:11.5px;margin-top:3px;">${esc(item.type)} · ${esc(item.desc)}</div>
          </div>
        `
        )
        .join("");
    }

    const logBox = document.getElementById("drawerTelemetryLogs");
    if (logBox) {
      const logs = live.telemetryLog || [];
      logBox.innerHTML = logs
        .map(
          (l) => `
            <div class="sim-panel" style="margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;font-size:11.5px;margin-bottom:6px;flex-wrap:wrap;gap:6px;">
                <span class="crisis-tag tag-green">${esc(l.engine)} · ${esc(l.status)}</span>
                <span class="mono" style="color:var(--text-muted);">${esc(l.timestamp)} · ${esc(l.latencyMs)} ms</span>
              </div>
              <div class="mono" style="font-size:11px;color:var(--fabric-blue);margin-bottom:6px;word-break:break-all;">${esc(l.endpoint)}</div>
              <pre class="code-block">${esc(l.query)}</pre>
            </div>
          `
        )
        .join("");
    }
  }

  function renderOverview() {
    const k = STATE.kpis;
    const kpiDefs = IS_EN
      ? [
          {
            cls: "",
            label: "Global Net Sell-In (SAP ERP)",
            val: fmtUSD(k.netSellInUSD, true),
            meta: "8 regional subsidiaries · 3,452 wholesale orders",
            badge: "OneLake Delta"
          },
          {
            cls: "kpi-green",
            label: "OMO Retail Sell-Out GMV",
            val: fmtUSD(k.retailSellOutGmvUSD, true),
            meta: "Sell-Through 80.5% · Zero-Copy Shortcut POS",
            badge: "Shortcut"
          },
          {
            cls: "kpi-amber",
            label: "Channel Stock & Avg WOS",
            val: `${fmtUSD(k.latestChannelInventoryUSD, true)} · ${k.avgChannelWos}w`,
            meta: "Healthy corridor: 2.5 – 5.5 Weeks of Supply",
            badge: "DirectLake"
          },
          {
            cls: "kpi-red",
            label: "Active Margin & Stockout Risks",
            val: fmtUSD(k.priceProtectionExposureUSD + k.blockedStuffingRebateUSD, true),
            meta: `$766.7K price-prot + $162.5K stuffing hold · ${k.criticalStockoutPositions} stockouts`,
            badge: "Fabric IQ Guard"
          }
        ]
      : [
          {
            cls: "",
            label: "全球累计净出货额 (Net Sell-In)",
            val: fmtUSD(k.netSellInUSD, true),
            meta: "8 大销售子公司 · 3,452 笔批发订单",
            badge: "OneLake Delta"
          },
          {
            cls: "kpi-green",
            label: "全渠道终端实销 GMV (OMO Sell-Out)",
            val: fmtUSD(k.retailSellOutGmvUSD, true),
            meta: "实销转化率 80.5% · 零拷贝 Shortcut 汇聚",
            badge: "Shortcut"
          },
          {
            cls: "kpi-amber",
            label: "当前全球渠道库存 & 平均周转",
            val: `${fmtUSD(k.latestChannelInventoryUSD, true)} · ${k.avgChannelWos}周`,
            meta: "健康水位区间: 2.5 – 5.5 周 (WOS)",
            badge: "DirectLake"
          },
          {
            cls: "kpi-red",
            label: "受控风险敞口 (价保 + 拦截返利)",
            val: fmtUSD(k.priceProtectionExposureUSD + k.blockedStuffingRebateUSD, true),
            meta: `$766.7K 价保风险 + $162.5K 骗返利冻结 · ${k.criticalStockoutPositions} 处断货`,
            badge: "Fabric IQ Guard"
          }
        ];

    document.getElementById("kpiStrip").innerHTML = kpiDefs
      .map(
        (d) => `
      <div class="kpi-card ${d.cls}">
        <div class="kpi-label">
          <span>${esc(d.label)}</span>
          <span class="crisis-tag tag-blue">${esc(d.badge)}</span>
        </div>
        <div class="kpi-value mono">${esc(d.val)}</div>
        <div class="kpi-meta">${esc(d.meta)}</div>
      </div>
    `
      )
      .join("");

    document.getElementById("crisisBanner").innerHTML = IS_EN
      ? `
      <div class="crisis-card">
        <div class="crisis-head">
          <strong>🚨 Risk 1: Germany Black Friday 75" C855 Stockout</strong>
          <span class="crisis-tag tag-red">WOS 0.86w</span>
        </div>
        <p style="margin:6px 0;font-size:12.5px;color:var(--text-secondary);">
          Frankfurt &amp; Munich POS velocity surged <strong>2.8x</strong> while vessel <code>MSC-AURORA-V42</code> is delayed 11 days at Rotterdam.
        </p>
        <button type="button" class="btn btn-sm btn-primary" onclick="switchTab('realtime')">Inspect Eventhouse 48h Rebalance →</button>
      </div>
      <div class="crisis-card amber">
        <div class="crisis-head">
          <strong>⚠️ Risk 2: North America P745 Aging Stock</strong>
          <span class="crisis-tag tag-amber">Exposure $766.7K</span>
        </div>
        <p style="margin:6px 0;font-size:12.5px;color:var(--text-secondary);">
          WOS hit <strong>9.5 weeks</strong> ahead of P855 launch; a 15% MSRP cut triggers 60-day price-protection liability.
        </p>
        <button type="button" class="btn btn-sm" onclick="switchTab('ontology')">Run Ontology Soundbar Bundle Sim →</button>
      </div>
      <div class="crisis-card purple">
        <div class="crisis-head">
          <strong>🛑 Risk 3: SEA Quarter-End Channel Stuffing</strong>
          <span class="crisis-tag tag-purple">Frozen $162.5K</span>
        </div>
        <p style="margin:6px 0;font-size:12.5px;color:var(--text-secondary);">
          <code>VietTech</code> surged quarter-end Sell-In for Tier-3 rebate while real POS sell-through is only <strong>41%</strong> (WOS 11.4w).
        </p>
        <button type="button" class="btn btn-sm" onclick="switchTab('agents');askDataAgent('q2')">Audit via Data Agent →</button>
      </div>
    `
      : `
      <div class="crisis-card">
        <div class="crisis-head">
          <strong>🚨 危机一：西欧黑五 75" C855 断货倒计时</strong>
          <span class="crisis-tag tag-red">WOS 0.86 周</span>
        </div>
        <p style="margin:6px 0;font-size:12.5px;color:var(--text-secondary);">
          德国门店 POS 流速暴涨 <strong>2.8x</strong>，补货船 <code>MSC-AURORA-V42</code> 鹿特丹延误 11 天。
        </p>
        <button type="button" class="btn btn-sm btn-primary" onclick="switchTab('realtime')">进入 Eventhouse 跨国调拨 →</button>
      </div>
      <div class="crisis-card amber">
        <div class="crisis-head">
          <strong>⚠️ 危机二：北美老品 P745 滞销与巨额价保敞口</strong>
          <span class="crisis-tag tag-amber">敞口 $766.7K</span>
        </div>
        <p style="margin:6px 0;font-size:12.5px;color:var(--text-secondary);">
          库存周转达 <strong>9.5 周</strong>，若直接官降 15% 将触发 60 天合同价保条款巨额赔付。
        </p>
        <button type="button" class="btn btn-sm" onclick="switchTab('ontology')">进入 Ontology 捆绑仿真 →</button>
      </div>
      <div class="crisis-card purple">
        <div class="crisis-head">
          <strong>🛑 危机三：东南亚季末虚假压货套取返利</strong>
          <span class="crisis-tag tag-purple">已冻结 $162.5K</span>
        </div>
        <p style="margin:6px 0;font-size:12.5px;color:var(--text-secondary);">
          <code>VietTech</code> 季末突击提货冲最高档返利，但真实门店 POS 消化率仅 <strong>41%</strong>（WOS 11.4 周）。
        </p>
        <button type="button" class="btn btn-sm" onclick="switchTab('agents');askDataAgent('q2')">召唤 Data Agent 审计 →</button>
      </div>
    `;

    const maxReg = Math.max(...STATE.regionalSummary.map((r) => r.sellInUSD), 1);
    document.getElementById("regionalBars").innerHTML = STATE.regionalSummary
      .map((r) => {
        const wIn = Math.round((r.sellInUSD / maxReg) * 100);
        const wOut = Math.round((r.sellOutUSD / maxReg) * 100);
        const ratio = Math.round((r.sellOutUSD / Math.max(r.sellInUSD, 1)) * 100);
        return `
        <div class="bar-row">
          <div class="bar-top">
            <span><strong>${esc(r.regionName)}</strong> <span style="color:var(--text-muted)">(${r.partnerCount} ${T("家伙伴", "partners")})</span></span>
            <span class="mono">${T("出货", "Sell-In")} ${fmtUSD(r.sellInUSD, true)} → ${T("实销", "Sell-Out")} ${fmtUSD(r.sellOutUSD, true)} (${ratio}%)</span>
          </div>
          <div class="bar-track" style="margin-bottom:3px;">
            <div class="bar-fill-in" style="width:${wIn}%"></div>
          </div>
          <div class="bar-track" style="height:6px;">
            <div class="bar-fill-out" style="width:${wOut}%"></div>
          </div>
        </div>
      `;
      })
      .join("");

    const maxCh = Math.max(...STATE.channelMix.map((c) => c.gmvUSD), 1);
    document.getElementById("channelMixBars").innerHTML = STATE.channelMix
      .map((c) => {
        const w = Math.round((c.gmvUSD / maxCh) * 100);
        return `
        <div class="bar-row">
          <div class="bar-top">
            <span><strong>${esc(c.channel)}</strong></span>
            <span class="mono">${fmtUSD(c.gmvUSD, true)} · ${fmtNum(c.units)} ${T("台", "units")}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill-out" style="width:${w}%"></div>
          </div>
        </div>
      `;
      })
      .join("");

    const regSelect = document.getElementById("filterRegion");
    if (regSelect && regSelect.options.length <= 1) {
      const regions = [...new Set(STATE.partnersMatrix.map((p) => p.regionName))];
      regions.forEach((r) => {
        const opt = document.createElement("option");
        opt.value = r;
        opt.textContent = r;
        regSelect.appendChild(opt);
      });
    }
    renderPartnerTable();
  }

  function renderPartnerTable() {
    const reg = document.getElementById("filterRegion").value;
    const st = document.getElementById("filterStatus").value;
    const q = (document.getElementById("searchPartner").value || "").trim().toLowerCase();

    const rows = STATE.partnersMatrix.filter((p) => {
      if (reg !== "ALL" && p.regionName !== reg) return false;
      if (st !== "ALL" && p.healthStatus !== st) return false;
      if (q && !`${p.partnerName} ${p.country} ${p.partnerType}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const badgeMap = IS_EN
      ? {
          "Stockout Critical": `<span class="crisis-tag tag-red">🚨 Stockout (&lt;1.8w)</span>`,
          "Overstock / Stuffing Risk": `<span class="crisis-tag tag-amber">⚠️ Overstock (&gt;8.0w)</span>`,
          Healthy: `<span class="crisis-tag tag-green">✅ Healthy</span>`
        }
      : {
          "Stockout Critical": `<span class="crisis-tag tag-red">🚨 断货红灯 (&lt;1.8w)</span>`,
          "Overstock / Stuffing Risk": `<span class="crisis-tag tag-amber">⚠️ 滞销/压货 (&gt;8.0w)</span>`,
          Healthy: `<span class="crisis-tag tag-green">✅ 健康周转</span>`
        };

    document.getElementById("partnerTableBody").innerHTML = rows
      .map(
        (p) => `
      <tr>
        <td><strong>${esc(p.partnerName)}</strong><div style="font-size:11px;color:var(--text-muted)" class="mono">${esc(p.partnerId)} · Tier ${esc(p.tier)}</div></td>
        <td>${esc(p.regionName)} · ${esc(p.country)}</td>
        <td>${esc(p.partnerType)}</td>
        <td class="num mono">${fmtUSD(p.sellInUSD, true)}</td>
        <td class="num mono">${fmtUSD(p.sellOutUSD, true)}</td>
        <td class="num mono">${fmtUSD(p.onHandUSD, true)}</td>
        <td class="num mono"><strong>${p.avgWos.toFixed(2)}w</strong></td>
        <td class="num mono">${p.exposureUSD > 0 ? `<span style="color:var(--status-amber)">${fmtUSD(p.exposureUSD)}</span>` : "-"}</td>
        <td>${badgeMap[p.healthStatus] || esc(p.healthStatus)}</td>
      </tr>
    `
      )
      .join("");
  }

  function renderOneLakeTab() {
    document.getElementById("onelakeArchitectureSvg").innerHTML = `
      <svg viewBox="0 0 1060 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gLake" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f766e" stop-opacity="0.38"/>
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0.22"/>
          </linearGradient>
          <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8"/>
          </marker>
          <marker id="arrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b"/>
          </marker>
        </defs>
        <rect x="16" y="20" width="290" height="280" rx="14" fill="#111827" stroke="#f59e0b" stroke-opacity="0.55" stroke-dasharray="6 4"/>
        <text x="32" y="48" fill="#fcd34d" font-size="13" font-weight="700">${T("外部合作伙伴隔离工作区", "External Partner EDI Zone")}</text>
        <text x="32" y="66" fill="#94a3b8" font-size="11">Workspace: TCL_Partner_EDI_Portal_Zone</text>
        <rect x="32" y="84" width="258" height="58" rx="9" fill="#1e293b" stroke="#475569"/>
        <text x="44" y="107" fill="#f8fafc" font-size="12" font-weight="700">fact_channel_inventory_weekly</text>
        <text x="44" y="126" fill="#94a3b8" font-size="11">EDI 852 Stock · 3,456 rows (Delta)</text>
        <rect x="32" y="154" width="258" height="58" rx="9" fill="#1e293b" stroke="#475569"/>
        <text x="44" y="177" fill="#f8fafc" font-size="12" font-weight="700">fact_sell_out_transactions</text>
        <text x="44" y="196" fill="#94a3b8" font-size="11">OMO Store &amp; E-Com POS · 6,624 rows</text>
        <rect x="32" y="224" width="258" height="56" rx="9" fill="#1e293b" stroke="#475569"/>
        <text x="44" y="246" fill="#f8fafc" font-size="12" font-weight="700">Files/edi_852_drop/raw_json</text>
        <text x="44" y="264" fill="#94a3b8" font-size="11">ADLS / S3 Partner Drop Zone</text>
        <path d="M 308 113 L 408 113" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5 3" marker-end="url(#arrowAmber)"/>
        <path d="M 308 183 L 408 183" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5 3" marker-end="url(#arrowAmber)"/>
        <rect x="318" y="133" width="84" height="32" rx="6" fill="#451a03" stroke="#f59e0b"/>
        <text x="360" y="148" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="700">Zero-Copy</text>
        <text x="360" y="160" text-anchor="middle" fill="#fde68a" font-size="9.5">Shortcuts</text>
        <rect x="412" y="20" width="335" height="280" rx="14" fill="url(#gLake)" stroke="#14b8a6" stroke-width="1.5"/>
        <text x="430" y="48" fill="#5eead4" font-size="13.5" font-weight="700">${T("TCL 全球渠道主湖仓 (OneLake)", "TCL Global Channel Lakehouse")}</text>
        <text x="430" y="66" fill="#cbd5e1" font-size="11">lh_tcl_global_channel (11 Governed Delta Tables)</text>
        <rect x="430" y="84" width="298" height="90" rx="9" fill="#0f172a" stroke="#38bdf8" stroke-opacity="0.5"/>
        <text x="444" y="106" fill="#7dd3fc" font-size="12" font-weight="700">${T("总部内部核心表 (SAP S/4 + TMS)", "Internal Core Tables (SAP S/4 + TMS)")}</text>
        <text x="444" y="126" fill="#cbd5e1" font-size="11">• dim_subsidiaries (8) · dim_products (24)</text>
        <text x="444" y="144" fill="#cbd5e1" font-size="11">• dim_distributors (36) · fact_sell_in (3,452)</text>
        <text x="444" y="162" fill="#cbd5e1" font-size="11">• fact_ocean_shipments (92) · rebate_claims (39)</text>
        <rect x="430" y="188" width="298" height="92" rx="9" fill="#0f172a" stroke="#f59e0b" stroke-opacity="0.7"/>
        <text x="444" y="210" fill="#fcd34d" font-size="12" font-weight="700">🔗 ${T("零拷贝虚拟内表 (OneLake Shortcuts)", "Zero-Copy Virtual Tables (Shortcuts)")}</text>
        <text x="444" y="230" fill="#cbd5e1" font-size="11">• Tables/fact_channel_inventory_weekly</text>
        <text x="444" y="248" fill="#cbd5e1" font-size="11">• Tables/fact_sell_out_transactions</text>
        <text x="444" y="266" fill="#94a3b8" font-size="10.5">0 ETL Copy · Direct Parquet Read</text>
        <path d="M 748 115 L 802 115" stroke="#38bdf8" stroke-width="2.2" marker-end="url(#arrowBlue)"/>
        <path d="M 748 225 L 802 225" stroke="#38bdf8" stroke-width="2.2" marker-end="url(#arrowBlue)"/>
        <rect x="806" y="45" width="236" height="108" rx="12" fill="#1e1b4b" stroke="#8b5cf6"/>
        <text x="822" y="72" fill="#c4b5fd" font-size="12.5" font-weight="700">DirectLake Semantic Model</text>
        <text x="822" y="92" fill="#e2e8f0" font-size="11">sm_tcl_global_channel_iq</text>
        <text x="822" y="112" fill="#94a3b8" font-size="10.5">19 Governed DAX Measures</text>
        <text x="822" y="130" fill="#6ee7b7" font-size="10.5">Zero Import Refresh Delay</text>
        <rect x="806" y="175" width="236" height="108" rx="12" fill="#0f172a" stroke="#38bdf8"/>
        <text x="822" y="202" fill="#7dd3fc" font-size="12.5" font-weight="700">Fabric IQ Ontology &amp; Agents</text>
        <text x="822" y="222" fill="#e2e8f0" font-size="11">ont_tcl_global_channel_network</text>
        <text x="822" y="242" fill="#94a3b8" font-size="10.5">10 Entities · 13 Graph Edges</text>
        <text x="822" y="260" fill="#fcd34d" font-size="10.5">Data + Operations Agents</text>
      </svg>
    `;

    const counts = STATE.meta?.tableRowCounts || {};
    const shortcutSet = new Set([
      "fact_channel_inventory_weekly",
      "fact_sell_out_transactions",
      "PosSellOutRealtime",
      "ChannelInventoryTelemetry",
      "PortAndLogisticsAlerts"
    ]);
    document.getElementById("onelakeTablesBody").innerHTML = Object.entries(counts)
      .map(([tbl, cnt]) => {
        const isKql = ["PosSellOutRealtime", "ChannelInventoryTelemetry", "PortAndLogisticsAlerts"].includes(tbl);
        const isSc = tbl === "fact_channel_inventory_weekly" || tbl === "fact_sell_out_transactions";
        const modeBadge = isKql
          ? `<span class="crisis-tag tag-purple">Eventhouse KQL</span>`
          : isSc
          ? `<span class="crisis-tag tag-amber">🔗 OneLake Shortcut</span>`
          : `<span class="crisis-tag tag-blue">Managed Delta</span>`;
        return `
        <tr>
          <td class="mono" style="font-weight:600">${esc(tbl)}</td>
          <td>${modeBadge}</td>
          <td class="num mono">${fmtNum(cnt)}</td>
          <td style="color:var(--text-muted);font-size:11.5px;">${
            shortcutSet.has(tbl)
              ? isKql
                ? T("分钟级实时流摄取", "Sub-minute Streaming Ingestion")
                : T("外部代理商隔离湖仓零拷贝挂载", "Zero-Copy Partner Zone Mount")
              : T("总部 SAP / 海运 / 返利主表", "HQ SAP ERP / TMS / Rebate Master")
          }</td>
        </tr>
      `;
      })
      .join("");
  }

  function renderRealtimeTab() {
    const series = STATE.posSurgeSeries || [];
    if (series.length) {
      const w = 680;
      const h = 220;
      const padL = 48;
      const padR = 20;
      const padT = 22;
      const padB = 34;
      const maxY = Math.max(...series.map((d) => Math.max(d.actualUnits, d.baselineUnits)), 10) * 1.15;
      const xAt = (i) => padL + (i / Math.max(series.length - 1, 1)) * (w - padL - padR);
      const yAt = (v) => h - padB - (v / maxY) * (h - padT - padB);

      const ptsBase = series.map((d, i) => `${xAt(i).toFixed(1)},${yAt(d.baselineUnits).toFixed(1)}`).join(" ");
      const ptsAct = series.map((d, i) => `${xAt(i).toFixed(1)},${yAt(d.actualUnits).toFixed(1)}`).join(" ");
      const areaAct = `${padL},${h - padB} ${ptsAct} ${xAt(series.length - 1).toFixed(1)},${h - padB}`;

      document.getElementById("posSurgeSvgWrap").innerHTML = `
        <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="surgeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ef4444" stop-opacity="0.42"/>
              <stop offset="100%" stop-color="#ef4444" stop-opacity="0.02"/>
            </linearGradient>
          </defs>
          <line x1="${padL}" y1="${h - padB}" x2="${w - padR}" y2="${h - padB}" stroke="#334155"/>
          <line x1="${padL}" y1="${yAt(maxY * 0.5)}" x2="${w - padR}" y2="${yAt(maxY * 0.5)}" stroke="#1e293b" stroke-dasharray="4 4"/>
          <polygon points="${areaAct}" fill="url(#surgeGrad)"/>
          <polyline fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="5 4" points="${ptsBase}"/>
          <polyline fill="none" stroke="#f87171" stroke-width="3" points="${ptsAct}"/>
          <text x="${padL + 8}" y="18" fill="#fca5a5" font-size="11.5" font-weight="700">${T('实测黑五 POS 流速 (峰值 2.8x 暴涨)', 'Live Black Friday POS Velocity (2.8x Surge)')}</text>
          <text x="${w - 210}" y="18" fill="#94a3b8" font-size="11">${T('--- 常规日均基线', '--- Baseline Velocity')}</text>
          <text x="${padL}" y="${h - 10}" fill="#94a3b8" font-size="10.5">${esc(series[0].timestamp.slice(5, 16))}</text>
          <text x="${w - padR}" y="${h - 10}" text-anchor="end" fill="#94a3b8" font-size="10.5">${esc(series[series.length - 1].timestamp.slice(5, 16))}</text>
        </svg>
      `;
    }

    document.getElementById("portAlertsList").innerHTML = (STATE.portAlerts || [])
      .slice(0, 5)
      .map((a) => {
        const isCrit = a.Severity === "Critical" || a.DelayDays >= 7;
        return `
        <div class="sim-panel" style="margin-bottom:9px;border-left:3px solid ${isCrit ? "#ef4444" : "#f59e0b"}">
          <div style="display:flex;justify-content:space-between;font-size:12px;gap:8px;flex-wrap:wrap;">
            <strong>🚢 ${esc(a.PortName)} · <span class="mono">${esc(a.VesselCode)}</span></strong>
            <span class="crisis-tag ${isCrit ? "tag-red" : "tag-amber"}">${T("延误", "Delayed")} +${esc(a.DelayDays)} ${T("天", "days")}</span>
          </div>
          <div style="font-size:11.5px;color:var(--text-secondary);margin-top:4px;">
            ${T("波及 SKU", "Affected SKUs")}: <span class="mono">${esc(a.AffectedProductIds)}</span> · ${esc(a.ImpactSummary)}
          </div>
        </div>
      `;
      })
      .join("");

    renderRebalancePairs(STATE.rebalancePairs || []);
  }

  function renderRebalancePairs(pairs) {
    document.getElementById("rebalancePairsBody").innerHTML = pairs
      .map(
        (p) => `
      <tr>
        <td class="mono" style="font-weight:700;">${esc(p.productId)}</td>
        <td>
          <strong>${esc(p.shortagePartnerName)}</strong> (${esc(p.shortageCountry)})
          <div class="mono" style="font-size:11px;color:var(--status-red)">${T("库存", "Stock")} ${p.shortageUnits} · WOS ${p.shortageWos}w</div>
        </td>
        <td>
          <strong>${esc(p.donorPartnerName)}</strong> (${esc(p.donorCountry)})
          <div class="mono" style="font-size:11px;color:var(--status-green)">${T("库存", "Stock")} ${p.donorUnits} · WOS ${p.donorWos}w</div>
        </td>
        <td class="num mono"><strong>${p.suggestedTransferUnits} ${T("台", "units")}</strong></td>
        <td class="num mono" style="color:var(--status-green)">+${fmtUSD(Math.round(p.suggestedTransferUnits * 548))}</td>
        <td>
          <button type="button" class="btn btn-sm btn-tcl" onclick="quickStageDispatch('${esc(p.donorPartnerId)}','${esc(p.shortagePartnerId)}','${esc(p.productId)}',${p.suggestedTransferUnits})">
            ⚡ ${T("一键派单调拨", "Stage Dispatch")}
          </button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  window.quickStageDispatch = function (src, tgt, sku, units) {
    switchTab("agents");
    document.getElementById("dispSource").value = src;
    document.getElementById("dispTarget").value = tgt;
    document.getElementById("dispSku").value = sku;
    document.getElementById("dispUnits").value = units;
    updateDispatchEstimate();
  };

  function renderOntologyTab() {
    const ont = STATE.ontology;
    if (!ont) return;

    const coords = {
      SalesSubsidiary: { x: 60, y: 65, color: "#0284c7" },
      ChannelPartner: { x: 310, y: 65, color: "#14b8a6" },
      RetailStore: { x: 575, y: 45, color: "#10b981" },
      SellOutTransaction: { x: 825, y: 45, color: "#22c55e" },
      ProductSKU: { x: 310, y: 195, color: "#3b82f6" },
      SellInOrder: { x: 60, y: 195, color: "#6366f1" },
      ChannelInventoryPosition: { x: 575, y: 175, color: "#f59e0b" },
      PromotionCampaign: { x: 825, y: 175, color: "#a855f7" },
      OceanShipment: { x: 175, y: 315, color: "#ef4444" },
      RebateClaim: { x: 460, y: 315, color: "#ec4899" },
      InterWarehouseTransfer: { x: 755, y: 315, color: "#06b6d4" }
    };

    const nodeW = 190;
    const nodeH = 54;

    const edgesSvg = ont.relationships
      .map((r) => {
        const a = coords[r.from];
        const b = coords[r.to];
        if (!a || !b) return "";
        const x1 = a.x + nodeW / 2;
        const y1 = a.y + nodeH / 2;
        const x2 = b.x + nodeW / 2;
        const y2 = b.y + nodeH / 2;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2 - 6;
        return `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#475569" stroke-width="1.6" stroke-dasharray="3 2"/>
        <text x="${mx}" y="${my}" text-anchor="middle" fill="#94a3b8" font-size="9.5">${esc(r.label)}</text>
      `;
      })
      .join("");

    const nodesSvg = ont.entities
      .map((e) => {
        const c = coords[e.id] || { x: 40, y: 40, color: "#38bdf8" };
        const sel = e.id === selectedOntologyId ? "selected" : "";
        return `
        <g class="ont-node ${sel}" onclick="selectOntologyNode('${e.id}')">
          <rect x="${c.x}" y="${c.y}" width="${nodeW}" height="${nodeH}" rx="10" fill="#0f172a" stroke="${c.color}" stroke-width="1.8"/>
          <text x="${c.x + 12}" y="${c.y + 22}" fill="#f8fafc" font-size="12" font-weight="700">${esc(e.label)}</text>
          <text x="${c.x + 12}" y="${c.y + 40}" fill="#94a3b8" font-size="10" font-family="monospace">${esc(e.sourceTable)}</text>
        </g>
      `;
      })
      .join("");

    document.getElementById("ontologyGraphWrap").innerHTML = `
      <svg viewBox="0 0 1050 395" xmlns="http://www.w3.org/2000/svg">
        ${edgesSvg}
        ${nodesSvg}
      </svg>
    `;

    renderOntologyInspector();
    updatePriceProtectionSim();
  }

  window.selectOntologyNode = function (id) {
    selectedOntologyId = id;
    renderOntologyTab();
  };

  function renderOntologyInspector() {
    const ont = STATE.ontology;
    const ent = ont.entities.find((e) => e.id === selectedOntologyId) || ont.entities[0];
    const rels = ont.relationships.filter((r) => r.from === ent.id || r.to === ent.id);

    document.getElementById("ontologyInspector").innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
        <h4 style="margin:0;font-size:15px;">🧬 ${esc(ent.label)} <span class="mono" style="color:var(--text-muted);font-size:12px;">(${esc(ent.id)})</span></h4>
        <span class="crisis-tag tag-blue">OneLake: ${esc(ent.sourceTable)}</span>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px;">
        ${T("业务主键", "Primary Key")}: <code class="mono">${esc(ent.key)}</code> · ${T("已绑定属性", "Bound Attributes")}: ${ent.attributes.length}
      </div>
      <div style="margin-bottom:12px;">
        <div style="font-size:11.5px;color:var(--text-muted);margin-bottom:5px;">${T("语义属性与时序遥测绑定：", "Semantic Attributes & Telemetry Bindings:")}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${ent.attributes.map((a) => `<span class="crisis-tag tag-purple mono">${esc(a)}</span>`).join("")}
        </div>
      </div>
      <div class="sim-panel" style="margin-bottom:10px;">
        <div style="font-weight:700;margin-bottom:5px;font-size:12.5px;">${T("关联图谱边", "Connected Graph Edges")} (${rels.length})</div>
        ${rels
          .map(
            (r) =>
              `<div class="mono" style="font-size:11.5px;color:var(--text-secondary);margin:3px 0;">${esc(r.from)} ──[${esc(r.label)}]──▶ ${esc(r.to)}</div>`
          )
          .join("")}
      </div>
      <div class="sim-panel" style="border-color:var(--border-highlight);">
        <div style="font-weight:700;color:var(--fabric-blue);margin-bottom:3px;font-size:12px;">📌 ${T("TCL 渠道经营样本洞察", "TCL Channel Snapshot Insight")}</div>
        <div style="font-size:12.5px;">${esc(ent.sampleHighlight)}</div>
      </div>
    `;
  }

  function updatePriceProtectionSim() {
    const cutPct = Number(document.getElementById("rngMsrpCut").value);
    const bundleSub = Number(document.getElementById("rngBundleSub").value);
    const spiff = Number(document.getElementById("rngSpiff").value);

    document.getElementById("lblMsrpCut").textContent = IS_EN ? `${cutPct}% MSRP Cut` : `${cutPct}% 官宣降幅`;
    document.getElementById("lblBundleSub").textContent = IS_EN ? `$${bundleSub} / unit` : `$${bundleSub} / 台`;
    document.getElementById("lblSpiff").textContent = IS_EN ? `$${spiff} / unit` : `$${spiff} / 台`;

    const protectedStockValue = 766697.6 / 0.15;
    const planALiability = protectedStockValue * (cutPct / 100.0);
    const targetClearUnits = 2840;
    const soundbarAttachCrossMargin = targetClearUnits * 0.42 * 38;
    const planBCost = targetClearUnits * (bundleSub + spiff) - soundbarAttachCrossMargin;
    const netSaved = planALiability - planBCost;

    document.getElementById("priceProtectionSimResult").innerHTML = IS_EN
      ? `
      <div class="sim-panel" style="border-color:rgba(220,38,38,0.45);">
        <div style="font-size:12px;color:var(--status-red);font-weight:700;">⛔ Plan A: Direct P745 MSRP Cut (${cutPct}%)</div>
        <div style="font-size:21px;font-weight:800;color:var(--status-red);margin:6px 0;" class="mono">-${fmtUSD(planALiability)}</div>
        <div style="font-size:11.5px;color:var(--text-muted);">
          Triggers 60-day distributor price-protection clause across all protected stock—immediate retroactive margin hit.
        </div>
      </div>
      <div class="sim-panel" style="border-color:rgba(5,150,105,0.45);">
        <div style="font-size:12px;color:var(--status-green);font-weight:700;">✅ Plan B: Ontology OMO Q85H Soundbar Bundle</div>
        <div style="font-size:21px;font-weight:800;color:var(--status-green);margin:6px 0;" class="mono">-${fmtUSD(Math.max(0, planBCost))}</div>
        <div style="font-size:11.5px;color:var(--text-secondary);">
          TV MSRP stays unchanged (<strong>$0 price-protection payout</strong>) + 42% soundbar attach margin, <strong>saving ${fmtUSD(netSaved)} net margin</strong>!
        </div>
      </div>
    `
      : `
      <div class="sim-panel" style="border-color:rgba(220,38,38,0.45);">
        <div style="font-size:12px;color:var(--status-red);font-weight:700;">⛔ 方案 A：直接下调 P745 指导价 (${cutPct}%)</div>
        <div style="font-size:21px;font-weight:800;color:var(--status-red);margin:6px 0;" class="mono">-${fmtUSD(planALiability)}</div>
        <div style="font-size:11.5px;color:var(--text-muted);">
          触发 60 天合同库存价保条款，需对代理商全部在库老品无差别追溯补差，毛利瞬间击穿。
        </div>
      </div>
      <div class="sim-panel" style="border-color:rgba(5,150,105,0.45);">
        <div style="font-size:12px;color:var(--status-green);font-weight:700;">✅ 方案 B：Ontology 声霸 OMO 捆绑清库</div>
        <div style="font-size:21px;font-weight:800;color:var(--status-green);margin:6px 0;" class="mono">-${fmtUSD(Math.max(0, planBCost))}</div>
        <div style="font-size:11.5px;color:var(--text-secondary);">
          电视维持原价<strong>零触发价保赔付</strong>，带动 Q85H 声霸连带毛利，较方案 A <strong>净保毛利 ${fmtUSD(netSaved)}</strong>！
        </div>
      </div>
    `;
  }

  function renderAgentsTab() {
    document.getElementById("agentPresetButtons").innerHTML = AGENT_PRESETS.map(
      (p, idx) => `
      <button type="button" class="preset-btn" onclick="askDataAgent('${p.id}')">
        <span style="color:var(--fabric-blue);font-weight:700;">Q${idx + 1}</span> · ${esc(p.title)}
      </button>
    `
    ).join("");

    updateDispatchEstimate();
    renderTransfersTable();
  }

  window.askDataAgent = function (presetId) {
    const p = AGENT_PRESETS.find((x) => x.id === presetId);
    if (!p) return;
    const box = document.getElementById("agentResponseContainer");
    const evalRes = evaluateQueryOffline(p.engine, p.query);
    const liveMeta = T(
      `Diamond 治理验证快照 · ${evalRes.engine} · ${evalRes.latencyMs} ms · 返回 ${evalRes.rowCount} 行`,
      `Diamond Verified Snapshot · ${evalRes.engine} · ${evalRes.latencyMs} ms · ${evalRes.rowCount} rows`
    );
    const rowsHtml = buildMiniTableHtml(evalRes.rows.slice(0, 6));

    const formattedSynthesis = esc(p.synthesis)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, '<code class="mono" style="color:var(--fabric-blue);">$1</code>')
      .replace(/\n/g, "<br/>");

    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
        <span class="crisis-tag tag-green">${esc(liveMeta)}</span>
        <span class="mono" style="font-size:11px;color:var(--text-muted);">Agent: da_tcl_channel_copilot</span>
      </div>
      <div style="font-size:13px;line-height:1.65;margin-bottom:12px;color:var(--text-primary);">${formattedSynthesis}</div>
      <details open>
        <summary style="cursor:pointer;font-size:12px;color:var(--fabric-blue);font-weight:600;margin-bottom:6px;">${T(`查看底层自动生成的 ${p.engine.toUpperCase()} 语句与验证证据表`, `Inspect Governed ${p.engine.toUpperCase()} Query & Evidence Table`)}</summary>
        <pre class="code-block" style="margin-bottom:8px;">${esc(p.query)}</pre>
        ${rowsHtml}
      </details>
    `;
  };

  function buildMiniTableHtml(rows) {
    if (!rows || !rows.length) return `<div style="font-size:12px;color:var(--text-muted);">${T("无返回行", "No rows returned")}</div>`;
    const cols = Object.keys(rows[0]);
    return `
      <div class="table-wrap">
        <table>
          <thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows
              .map(
                (r) =>
                  `<tr>${cols
                    .map((c) => `<td class="mono">${esc(typeof r[c] === "number" ? Math.round(r[c] * 100) / 100 : r[c])}</td>`)
                    .join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function updateDispatchEstimate() {
    const sku = document.getElementById("dispSku").value;
    const units = Number(document.getElementById("dispUnits").value || 0);
    const retail = sku.includes("85C855") ? 2499 : 1799;
    const margin = sku.includes("85C855") ? 756 : 548;
    const cost = units * 34;
    const rev = units * retail;
    const net = units * margin - cost;
    document.getElementById("dispEstimateText").textContent = IS_EN
      ? `Est. 48h Freight: ${fmtUSD(cost)} · Protected Revenue: ${fmtUSD(rev)} · Net Margin Saved: ${fmtUSD(net)}`
      : `预计 48h 陆运费: ${fmtUSD(cost)} · 护航黑五营收: ${fmtUSD(rev)} · 净保毛利: ${fmtUSD(net)}`;
  }

  function renderTransfersTable() {
    const list = STATE.transfers || [];
    document.getElementById("transfersTableBody").innerHTML = list
      .slice(0, 8)
      .map((t) => {
        const pending = String(t.TransferStatus).includes("Pending");
        const running = String(t.TransferStatus).includes("Dispatched");
        const badge = pending
          ? `<span class="crisis-tag tag-amber">⏳ ${T("待高管审批", "Pending Approval")}</span>`
          : running
          ? `<span class="crisis-tag tag-green">🚀 ${T("已派发在途", "Dispatched")}</span>`
          : `<span class="crisis-tag tag-blue">✅ ${T("已完成", "Completed")}</span>`;
        return `
        <tr>
          <td class="mono" style="font-weight:700;color:var(--fabric-blue);">${esc(t.TransferId)}</td>
          <td><strong>${esc(t.SourceEntityId)}</strong> → <strong>${esc(t.TargetDistributorId)}</strong></td>
          <td class="mono">${esc(t.ProductId)} · <strong>${esc(t.TransferUnits)}${T("台", "u")}</strong></td>
          <td class="num mono">${fmtUSD(t.ProtectedRevenueUSD)} / <span style="color:var(--status-green);">+${fmtUSD(t.NetMarginSavedUSD)}</span></td>
          <td>${badge}</td>
          <td>
            ${
              pending
                ? `<button type="button" class="btn btn-sm btn-tcl" onclick="approveRecommendedTransfer('${esc(t.TransferId)}','${esc(t.SourceEntityId)}','${esc(t.TargetDistributorId)}','${esc(t.ProductId)}',${Number(t.TransferUnits)})">${T("批准执行", "Approve")}</button>`
                : `<span class="mono" style="color:var(--text-muted);">-</span>`
            }
          </td>
        </tr>
      `;
      })
      .join("");
  }

  window.approveRecommendedTransfer = function (xferId, src, tgt, sku, units) {
    triggerPipelineDispatch({
      transferId: xferId,
      sourceEntityId: src,
      targetDistributorId: tgt,
      productId: sku,
      transferUnits: units
    });
  };

  function triggerPipelineDispatch(payload) {
    const statusBox = document.getElementById("dispatchStatusBox");
    const units = Number(payload.transferUnits || 350);
    const retail = String(payload.productId).includes("85C855") ? 2499 : 1799;
    const margin = String(payload.productId).includes("85C855") ? 756 : 548;
    const xferId = payload.transferId || `XFER-AUTO-${Math.floor(9100 + Math.random() * 800)}`;
    const newRecord = {
      TransferId: xferId,
      CreatedAt: new Date().toISOString().slice(0, 19),
      SourceEntityId: payload.sourceEntityId,
      TargetDistributorId: payload.targetDistributorId,
      ProductId: payload.productId,
      TransferUnits: String(units),
      ProtectedRevenueUSD: String(units * retail),
      NetMarginSavedUSD: String(units * margin - units * 34),
      TransferStatus: "Dispatched - Pipeline Running"
    };
    STATE.transfers = [newRecord, ...(STATE.transfers || []).filter((x) => x.TransferId !== xferId)];
    renderTransfersTable();

    statusBox.style.display = "block";
    statusBox.className = "sim-panel";
    statusBox.style.borderColor = "rgba(5,150,105,0.55)";
    statusBox.innerHTML = IS_EN
      ? `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <strong style="color:var(--status-green);">✅ Triggered Closed-Loop Fabric Pipeline <code>pl_tcl_rebalance_orchestrator</code> (HTTP 202 Accepted · 94ms)</strong>
          <span class="crisis-tag tag-green">OneLake Write-Back Simulated</span>
        </div>
        <div class="mono" style="font-size:11.5px;color:var(--text-secondary);margin-top:5px;">
          JobInstanceId: job-tcl-rebalance-${xferId.toLowerCase()} · Transfer: ${esc(xferId)} · Appending Delta row to <code>fact_inter_warehouse_transfers</code>
        </div>
      `
      : `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <strong style="color:var(--status-green);">✅ 已触发闭环编排管道 <code>pl_tcl_rebalance_orchestrator</code> (HTTP 202 Accepted · 94ms)</strong>
          <span class="crisis-tag tag-green">OneLake Delta 回写完成</span>
        </div>
        <div class="mono" style="font-size:11.5px;color:var(--text-secondary);margin-top:5px;">
          JobInstanceId: job-tcl-rebalance-${xferId.toLowerCase()} · 调拨单号: ${esc(xferId)} · 已驱动 PySpark 追加至 <code>fact_inter_warehouse_transfers</code>
        </div>
      `;
  }

  function populateLabPresets() {
    const eng = document.getElementById("labEngineSelect").value;
    const list = LAB_PRESETS[eng] || [];
    const sel = document.getElementById("labPresetSelect");
    sel.innerHTML = list.map((it, idx) => `<option value="${idx}">${esc(it.name)}</option>`).join("");
    if (list[0]) {
      document.getElementById("labQueryInput").value = list[0].query;
    }
  }

  function runLabQuery() {
    const eng = document.getElementById("labEngineSelect").value;
    const query = document.getElementById("labQueryInput").value.trim();
    const meta = document.getElementById("labMetaBar");
    const wrap = document.getElementById("labResultTableWrap");
    const res = evaluateQueryOffline(eng, query);
    meta.innerHTML = `<span style="color:var(--status-green);font-weight:700;">✅ ${T("验证快照执行成功", "Snapshot Query Executed")} · ${esc(res.engine)} · ${res.latencyMs} ms · ${T("返回行数", "Rows")}: ${res.rowCount}</span>`;
    wrap.innerHTML = buildMiniTableHtml(res.rows.slice(0, 30));
  }

  function bindEvents() {
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
      updateCueBanner();
    });

    document.getElementById("btnOpenDrawer").addEventListener("click", () => {
      document.getElementById("drawerBackdrop").classList.add("open");
      document.getElementById("telemetryDrawer").classList.add("open");
    });
    const closeDrawer = () => {
      document.getElementById("drawerBackdrop").classList.remove("open");
      document.getElementById("telemetryDrawer").classList.remove("open");
    };
    document.getElementById("btnCloseDrawer").addEventListener("click", closeDrawer);
    document.getElementById("drawerBackdrop").addEventListener("click", closeDrawer);

    document.getElementById("btnLiveSync").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const orig = btn.textContent;
      btn.textContent = T("✅ 快照已校验 (15,319 行)", "✅ Snapshot Verified (15,319 rows)");
      setTimeout(() => {
        btn.textContent = orig;
      }, 1400);
    });

    document.getElementById("btnRefreshLiveKql").addEventListener("click", () => {
      const banner = document.getElementById("liveKqlBanner");
      const res = evaluateQueryOffline("kql", "fn_CrossBorderRebalanceCandidates()");
      banner.textContent = IS_EN
        ? `✅ Eventhouse KQL recomputed (${res.latencyMs} ms): ${res.rowCount} EU cross-border compliance pairs verified.`
        : `✅ Eventhouse KQL 重算完成 (${res.latencyMs} ms)：已锁定 ${res.rowCount} 组欧规跨国调拨配对！`;
    });

    ["filterRegion", "filterStatus", "searchPartner"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", renderPartnerTable);
        el.addEventListener("change", renderPartnerTable);
      }
    });

    ["rngMsrpCut", "rngBundleSub", "rngSpiff"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", updatePriceProtectionSim);
    });

    ["dispSku", "dispUnits"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", updateDispatchEstimate);
        el.addEventListener("change", updateDispatchEstimate);
      }
    });

    document.getElementById("btnDispatchPipeline").addEventListener("click", () => {
      triggerPipelineDispatch({
        sourceEntityId: document.getElementById("dispSource").value,
        targetDistributorId: document.getElementById("dispTarget").value,
        productId: document.getElementById("dispSku").value,
        transferUnits: Number(document.getElementById("dispUnits").value || 350)
      });
    });

    document.getElementById("labEngineSelect").addEventListener("change", populateLabPresets);
    document.getElementById("labPresetSelect").addEventListener("change", (e) => {
      const eng = document.getElementById("labEngineSelect").value;
      const item = (LAB_PRESETS[eng] || [])[Number(e.target.value)];
      if (item) document.getElementById("labQueryInput").value = item.query;
    });
    document.getElementById("btnRunLabQuery").addEventListener("click", runLabQuery);
  }

  function renderAll() {
    if (!STATE) return;
    updateCueBanner();
    renderLiveHeader();
    renderOverview();
    renderOneLakeTab();
    renderRealtimeTab();
    renderOntologyTab();
    renderAgentsTab();
    populateLabPresets();
    askDataAgent("q1");
    runLabQuery();
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    renderAll();
    const applyHashAct = () => {
      const m = /^#act-([1-6])$/.exec(window.location.hash || "");
      if (m) switchTab(ACT_ORDER[Number(m[1]) - 1]);
    };
    applyHashAct();
    window.addEventListener("hashchange", applyHashAct);
  });
})();
