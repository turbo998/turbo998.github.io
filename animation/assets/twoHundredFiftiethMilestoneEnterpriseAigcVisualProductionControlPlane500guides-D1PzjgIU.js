import"./modulepreload-polyfill-B5Qt9EMX.js";const f=[{domainId:"Domain 1 · AI Gateway & FinOps",nameZh:"领域一：算力网关、蒸馏加速与合规防火墙",studioCount:48,bilingualDocsCount:96,flagshipPattern:"4-Step DMD2 + 3-Way Omni/DAG + 3-Stage Trademark/C2PA Firewall",annualSavingsUsdM:3.56},{domainId:"Domain 2 · E-Commerce & Packaging",nameZh:"领域二：电商主图、2D刀模转3D样机与60fps直播间",studioCount:48,bilingualDocsCount:96,flagshipPattern:"PIM mm Scale Lock + CAD Dieline 3D PBR + RVM+SH9 Live Stage",annualSavingsUsdM:2.94},{domainId:"Domain 3 · Video Localization & Post",nameZh:"领域三：多人抢话分轨译制、180°快门母带与6轨粗剪",studioCount:48,bilingualDocsCount:96,flagshipPattern:"TalkNet+SepFormer N-Stem + 8x 180° Shutter + 6-Track FCPXML/OTIO",annualSavingsUsdM:2.92},{domainId:"Domain 4 · Previs, ICVFX & Spatial",nameZh:"领域四：共享3D白模预演、52通道面捕与4层绘景投射",studioCount:48,bilingualDocsCount:96,flagshipPattern:"Shared USD 180°-Axis Previs + Split-Band 52-ARKit + 4-Plane DMP",annualSavingsUsdM:2.76},{domainId:"Domain 5 · CTO Decks & Motion UI",nameZh:"领域五：RFP交互讲标微站、FOCUS对账瀑布与Figma发布片",studioCount:48,bilingualDocsCount:96,flagshipPattern:"Immutable RFP AST Microsite + DuckDB Exact-Cent Bridge + Figma Springs",annualSavingsUsdM:2.62}];function m(t,e,a){const i=Math.max(0,(a-60)*.01);return e==="unified-control-plane-68code-24aks-8api"?{scenarioId:t,architectureMode:e,totalStudiosCount:250,totalBilingualGuidesCount:500,pixelAndSlaCompliancePct:Number(Math.min(99.96,99.91+i).toFixed(2)),blendedAssetCostUsd:.018,tcoReductionPct:82.6,enterpriseAnnualSavingsUsdM:14.8,verdict:"Act automatically"}:e==="fragmented-15saas-departmental-silos"?{scenarioId:t,architectureMode:e,totalStudiosCount:250,totalBilingualGuidesCount:500,pixelAndSlaCompliancePct:74.2,blendedAssetCostUsd:.145,tcoReductionPct:18.4,enterpriseAnnualSavingsUsdM:1.85,verdict:"Confirm"}:{scenarioId:t,architectureMode:e,totalStudiosCount:250,totalBilingualGuidesCount:500,pixelAndSlaCompliancePct:61.8,blendedAssetCostUsd:.32,tcoReductionPct:0,enterpriseAnnualSavingsUsdM:.25,verdict:"Send to a human"}}const g=document.querySelector("#app");if(!g)throw new Error("Missing #app root");let s="all-5domains-enterprise-federation",n="unified-control-plane-68code-24aks-8api",l=68;function v(t){const e=t.getContext("2d");if(!e)return;const a=t.width,i=t.height;e.clearRect(0,0,a,i);const d=m(s,n,l),u=n==="unified-control-plane-68code-24aks-8api",r=e.createLinearGradient(0,0,a,i);r.addColorStop(0,"#070b14"),r.addColorStop(.5,"#111827"),r.addColorStop(1,"#1e1b4b"),e.fillStyle=r,e.fillRect(0,0,a,i),e.fillStyle="rgba(15, 23, 42, 0.94)",e.fillRect(16,12,a-32,50),e.strokeStyle=u?"#fbbf24":"#ef4444",e.lineWidth=2.5,e.strokeRect(16,12,a-32,50),e.fillStyle="#fbbf24",e.font="bold 13px Inter, sans-serif",e.fillText("🏆 HISTORIC QUARTER-MILLENNIUM 250TH WORKBENCH & 500TH BILINGUAL GUIDE MILESTONE (3 + 7 + 48×5 = 250)!",28,33),e.fillStyle="#e2e8f0",e.font="11px Inter, sans-serif",e.fillText(`Compliance & Invariance Lock: ${d.pixelAndSlaCompliancePct}% | Blended Cost: $${d.blendedAssetCostUsd.toFixed(3)}/Asset (-${d.tcoReductionPct}% TCO) | Total Saved: +$${d.enterpriseAnnualSavingsUsdM.toFixed(2)}M/Yr`,28,51),f.forEach((o,S)=>{const c=74+S*58;e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=u?"#10b981":"#ef4444",e.lineWidth=1.8,e.beginPath(),e.roundRect(24,c,a-48,50,9),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 11px Inter, sans-serif",e.fillText(`${o.nameZh} (${o.studioCount} Studios / ${o.bilingualDocsCount} Docs)`,36,c+20),e.fillStyle="#cbd5e1",e.font="10px JetBrains Mono, monospace",e.fillText(o.flagshipPattern,36,c+39),e.fillStyle="#34d399",e.font="bold 11px JetBrains Mono, monospace",e.textAlign="right",e.fillText(`+$${o.annualSavingsUsdM.toFixed(2)}M/yr`,a-38,c+29),e.textAlign="left"})}function p(){const t=m(s,n,l);g.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">🏆 HISTORIC 250TH WORKBENCH & 500TH BILINGUAL GUIDE MILESTONE (3 + 7 + 48×5 = 250 Studios!)</span>
        <h1>🏆 历史性第 250 项工作台暨 500 篇双语文档大满贯：企业级 AIGC 视觉与视频生产控制平面总台</h1>
        <p class="subtitle">全仓达成 250 座交互式架构工作台（3+7+48×5 五大业务域各 48 座完美均衡对齐）与 500 篇中英双语选型指南：68% 代码/3D/矢量确定性编译 + 24% 自建 4步蒸馏集群 + 8% 商用旗舰 API（年省 +$14.80M）</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${t.verdict}</span>
        <span class="metric-pill">250 Studios · 500 Guides</span>
        <span class="metric-pill">+$${t.enterpriseAnnualSavingsUsdM.toFixed(2)}M / Yr</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 企业全域联合调度范围 (Control-Plane Scope)</label>
        <select id="scenario-select">
          <option value="all-5domains-enterprise-federation" ${s==="all-5domains-enterprise-federation"?"selected":""}>全域五大业务域联合中台 (3+7+48×5 = 250 座工作台 · 500 万件/月)</option>
          <option value="commerce-and-global-localization-mesh" ${s==="commerce-and-global-localization-mesh"?"selected":""}>跨境电商包装 + 16语种抢话分轨译制联邦 (领域二 × 领域三)</option>
          <option value="previs-spatial-and-cto-narrative-mesh" ${s==="previs-spatial-and-cto-narrative-mesh"?"selected":""}>3D 动态分镜预演 + CTO 招投标微站编译联邦 (领域四 × 领域五)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 企业级控制平面架构 (Enterprise Control-Plane Architecture)</label>
        <select id="mode-select">
          <option value="unified-control-plane-68code-24aks-8api" ${n==="unified-control-plane-68code-24aks-8api"?"selected":""}>✅ 统一控制平面：68% 代码/3D 确定性层 + 24% 4步蒸馏 AKS + 8% 旗舰 API (推荐)</option>
          <option value="fragmented-15saas-departmental-silos" ${n==="fragmented-15saas-departmental-silos"?"selected":""}>⚠️ 15+ 部门各自采购孤岛 SaaS 订阅 (零算力复用、零统一商标/C2PA 门禁)</option>
          <option value="unrouted-100pct-frontier-diffusion-api" ${n==="unrouted-100pct-frontier-diffusion-api"?"selected":""}>⛔ 100% 盲目全调昂贵端到端像素大模型 API ($0.32/件 & 38.2% 文字/条码/SLA 篡改)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="code-slider">3. 代码/3D/矢量确定性合成占比 (Deterministic Layer Share: <strong>${l}%</strong>)</label>
        <input id="code-slider" type="range" min="50" max="80" step="2" value="${l}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>🏆 第 250 座工作台暨 500 篇双语专著全景矩阵（3 层 + 5 域 × 48 座均衡大满贯）</h2>
          <span class="tag">250 Workbenches · 500 Bilingual Docs</span>
        </div>
        <canvas id="controlplane-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>第 250 项历史性里程碑：全域 FinOps 与治理总账</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">全仓交互工作台 / 双语指南规模</span>
            <strong class="kpi-value">${t.totalStudiosCount} 座 / ${t.totalBilingualGuidesCount} 篇</strong>
            <span class="kpi-note">Layer1(3) + Layer2(7) + Layer3(48×5) 完美对齐</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">商品像素锁 / 财务分仙 / SLA 合规率</span>
            <strong class="kpi-value">${t.pixelAndSlaCompliancePct}%</strong>
            <span class="kpi-note">确定性 AST/UV/掩码护栏 + 3阶商标与 C2PA 门禁</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">全域加权单件资产成本 / TCO 降幅</span>
            <strong class="kpi-value">$${t.blendedAssetCostUsd.toFixed(3)} · -${t.tcoReductionPct}%</strong>
            <span class="kpi-note">68% 代码矢量确定性合成 + 24% 4步蒸馏自托管</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">五大业务域合计年化净节省</span>
            <strong class="kpi-value">+$${t.enterpriseAnnualSavingsUsdM.toFixed(2)}M / yr</strong>
            <span class="kpi-note">对比孤岛 SaaS 与全量商用像素 API 实测审计</span>
          </div>
        </div>
      </aside>
    </main>
  `;const e=document.querySelector("#controlplane-canvas");e&&v(e),document.querySelector("#scenario-select")?.addEventListener("change",a=>{s=a.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",a=>{n=a.target.value,p()}),document.querySelector("#code-slider")?.addEventListener("input",a=>{l=Number(a.target.value),p()})}p();
