import"./modulepreload-polyfill-B5Qt9EMX.js";const p={"corn-v8-ndre-nitrogen-vra":{id:"corn-v8-ndre-nitrogen-vra",titleZh:"春玉米 V8 大喇叭口期红边 NDRE 变量追氮（5区处方图：低洼减氮防倒伏 + 岗地补氮 · 省肥 24.6%）",titleEn:"Corn V8 Red-Edge NDRE 5-Zone Variable-Rate Nitrogen (220 → 166 kg/ha · -24.6% Urea Saved · +$148/ha)",cropAndStage:"Corn V8 Rapid Growth (320 ha Pivot Field · Sentinel-2 705nm Red-Edge NDRE)",fieldAreaHectares:320,meanNdreIndex:.42,flatRateInputKgPerHa:220,vraWeightedInputKgPerHa:166,inputSavingsPct:24.6,closedGopReusePct:94.5,unitCostPerGrowerUsd:.0022,naiveAdoptionRatePct:12.6,videoAdoptionRatePct:74.8,netProfitGainPerHaUsd:148,annualPlatformNetBenefitUsd:174e5},"winter-wheat-stem-elongation":{id:"winter-wheat-stem-elongation",titleZh:"冬小麦拔节期抗倒伏化控与变量返青肥（高密旺长区 NDVI>0.78 精准喷施缩节胺 · 倒伏率降至 0.8%）",titleEn:"Winter Wheat Stem-Elongation Anti-Lodging PGR & VRA Topdressing (NDVI > 0.78 High-Canopy Lock)",cropAndStage:"Winter Wheat GS31 Stem Elongation (480 ha Contoured Parcel · PlanetScope 3m)",fieldAreaHectares:480,meanNdreIndex:.56,flatRateInputKgPerHa:195,vraWeightedInputKgPerHa:144,inputSavingsPct:26.2,closedGopReusePct:94.8,unitCostPerGrowerUsd:.002,naiveAdoptionRatePct:14.2,videoAdoptionRatePct:76.4,netProfitGainPerHaUsd:162,annualPlatformNetBenefitUsd:192e5},"soybean-weed-spot-spray-dji":{id:"soybean-weed-spot-spray-dji",titleZh:"大豆苗期无人机杂草靶向点喷（DJI Agras / 极飞航线处方包一键下发 · 除草剂减量 68.4% 零药害）",titleEn:"Soybean Post-Emergence Drone Spot-Spray Prescription (1-Click DJI Agras Waypoint · -68.4% Herbicide)",cropAndStage:"Soybean V3 Weed Patch Prescription (210 ha Field · Drone + Satellite Fusion)",fieldAreaHectares:210,meanNdreIndex:.38,flatRateInputKgPerHa:100,vraWeightedInputKgPerHa:31.6,inputSavingsPct:68.4,closedGopReusePct:93.9,unitCostPerGrowerUsd:.0024,naiveAdoptionRatePct:11.8,videoAdoptionRatePct:78.2,netProfitGainPerHaUsd:134,annualPlatformNetBenefitUsd:158e5}};function R(n,t){const e=p[n],o=t==="geojson-ndre-isobus-closed-gop-video";return{scenario:e,mode:t,effectiveInputKgPerHa:o?e.vraWeightedInputKgPerHa:e.flatRateInputKgPerHa,effectivePolygonFidelityPct:o?100:56.2,effectiveGrowerAdoptionPct:o?e.videoAdoptionRatePct:e.naiveAdoptionRatePct,effectiveUnitCostUsd:o?e.unitCostPerGrowerUsd:2.1,isobusPrescriptionPass:o,verdictBadge:o?`NDRE VRA & ISOBUS LOCKED (-${e.inputSavingsPct.toFixed(1)}% Input · $${e.unitCostPerGrowerUsd.toFixed(4)}/farm · ${e.videoAdoptionRatePct.toFixed(1)}% Adoption)`:"FLAT-RATE OVER-FERTILIZATION & GIS BLIND SPOT (12.6% Adoption · 28% Nitrogen Runoff Waste)"}}const $=document.querySelector("#app");let f="corn-v8-ndre-nitrogen-vra",g="geojson-ndre-isobus-closed-gop-video";function u(){const n=R(f,g),t=n.scenario,e=g==="geojson-ndre-isobus-closed-gop-video";$.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 393 · 182nd Curated Workbench · Domain 3 (Precision Agronomy 8M-Grower Satellite NDRE & ISOBUS VRA Prescription Video Studio)</span>
        <h1>智慧农业 800万农户卫星多光谱 (NDVI/NDRE) 与 ISOBUS 变量施肥处方千田千面视频工作台</h1>
        <p class="wb-subtitle">终结 20页晦涩遥感 GIS 报告农户看不懂导致全田一刀切盲目撒肥（浪费 24.6%+ 尿素并引发富集区倒伏）、以及纯 AI 视频扩散篡改农田边界与公斤数的痛点：直连 Sentinel-2 红边 NDRE GeoJSON 驱动 5区变量处方矢量图层 + 94.5% 农艺专家 Closed-GOP 拼接 + 一键下发农机 ISOBUS/植保机航线包（$0.0022/户，采纳率升至 74.8%，年创效 +$17.4M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${n.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Agronomy Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择作物物候期与多光谱遥感处方场景 (Crop Phenology & Satellite VRA Preset):</span>
        <div class="btn-row">
          ${Object.keys(p).map(o=>`
            <button type="button" class="scenario-btn ${f===o?"active":""}" data-scenario="${o}">
              ${p[o].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换农事处方触达与视频合成管线 (Agronomy Advisory & Video Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="flat-rate-sms-or-unverified-diffusion">
            ❌ 传统基线：静态 GIS 报表/短信或纯 AI 视频扩散 (农户采纳率仅 12.6% + 地块剂量幻觉)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="geojson-ndre-isobus-closed-gop-video">
            ✅ 推荐架构：GeoJSON 零幻觉 5区处方矢量层 + 94.5% 农艺师 Closed-GOP + 一键下发农机 ISOBUS
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Precision Agronomy Video KPIs">
      <div class="kpi-card">
        <span class="kpi-title">化肥/农药精准减量比例 (Input Reduction)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-input">${n.effectiveInputKgPerHa} kg/ha (${e?`-${t.inputSavingsPct.toFixed(1)}%`:"0.0%"})</strong>
        <span class="kpi-sub">对比全田一刀切盲撒 ${t.flatRateInputKgPerHa} kg/ha · 面积 ${t.fieldAreaHectares} ha</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">农户变量处方执行采纳率 (Grower Adoption)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-adoption">${n.effectiveGrowerAdoptionPct.toFixed(1)}%</strong>
        <span class="kpi-sub">视频内嵌一键推送到 John Deere / 大疆植保机</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单户个性化农事视频成本 (Unit Video Cost)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cost">$${n.effectiveUnitCostUsd.toFixed(4)} / 户</strong>
        <span class="kpi-sub">${t.closedGopReusePct.toFixed(1)}% Closed-GOP 复用 · 800万户仅 $17.6k</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">每公顷节本增收与平台年净益 (Agronomy ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${t.netProfitGainPerHaUsd}/ha · +$${(t.annualPlatformNetBenefitUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">${t.cropAndStage.split(" (")[0]}</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>Sentinel-2 红边 NDRE 叶绿素氮素图 + 5档变量施肥网格 (VRA Map) + ISOBUS 一键下发画布</h2>
          <span class="tag">${t.cropAndStage}</span>
        </div>
        <canvas id="agro-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>多光谱遥感反演与农机 ISOBUS 审计明细 (Satellite & ISOBUS Audit)</h2>
        <ul class="audit-list">
          <li><span>监测作物与物候期:</span> <strong>${t.cropAndStage}</strong></li>
          <li><span>地块面积与平均红边指数:</span> <strong>${t.fieldAreaHectares} 公顷 (ha) · 平均 NDRE = ${t.meanNdreIndex.toFixed(2)}</strong></li>
          <li><span>一刀切盲撒 vs 5区变量处方:</span> <strong>${t.flatRateInputKgPerHa} kg/ha → ${n.effectiveInputKgPerHa} kg/ha (-${t.inputSavingsPct.toFixed(1)}%)</strong></li>
          <li><span>地块边界与剂量准确率:</span> <strong>${n.effectivePolygonFidelityPct.toFixed(1)}% (GeoJSON 直驱 SVG 矢量网格)</strong></li>
          <li><span>农机终端直连协议:</span> <strong>${e?"ISO 11783 ISOBUS TASKDATA.XML & DJI Agras KML":"无终端直连 (需手工拷 U盘导 Shapefile)"}</strong></li>
          <li><span>农户处方采纳转化率:</span> <strong>${t.naiveAdoptionRatePct.toFixed(1)}% → ${n.effectiveGrowerAdoptionPct.toFixed(1)}% (+62.2 pts)</strong></li>
          <li><span>平台年化农服与增产净益:</span> <strong>+$${t.annualPlatformNetBenefitUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,m(),k(n)}function m(){document.querySelectorAll(".scenario-btn").forEach(n=>{n.addEventListener("click",()=>{f=n.dataset.scenario,u()})}),document.querySelectorAll(".mode-btn").forEach(n=>{n.addEventListener("click",()=>{g=n.dataset.mode,u()})})}function k(n){const t=document.querySelector("#agro-canvas");if(!t)return;const e=t.getContext("2d"),o=t.width,h=t.height,a=n.scenario,i=n.mode==="geojson-ndre-isobus-closed-gop-video";e.fillStyle="#070b14",e.fillRect(0,0,o,h),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Sentinel-2 705nm Red-Edge NDRE & 5-Zone Variable-Rate Map (kg/ha)",22,26),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,42,376,304,10),e.fill(),e.stroke();const y=42,A=62,S=54,P=42,I=[[210,210,175,140,110,110],[210,175,175,140,110,85],[175,175,140,110,85,85],[175,140,140,110,85,85],[140,140,110,110,85,85]];for(let l=0;l<5;l++)for(let d=0;d<6;d++){const c=i?I[l][d]:a.flatRateInputKgPerHa,v=y+d*(S+2),b=A+l*(P+2);let r="rgba(239, 68, 68, 0.45)";i&&(c>=200?r="rgba(245, 158, 11, 0.55)":c>=160?r="rgba(56, 189, 248, 0.48)":c>=120?r="rgba(16, 185, 129, 0.48)":r="rgba(168, 85, 247, 0.45)"),e.fillStyle=r,e.strokeStyle=i?"#38bdf8":"#ef4444",e.lineWidth=1.2,e.beginPath(),e.roundRect(v,b,S,P,4),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(`${c}kg`,v+10,b+25)}e.fillStyle=i?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(i?`✓ 5-Zone VRA Weighted Mean: ${a.vraWeightedInputKgPerHa} kg/ha (-${a.inputSavingsPct.toFixed(1)}% Saved · +$${a.netProfitGainPerHaUsd}/ha)`:`✕ Uniform Flat-Rate ${a.flatRateInputKgPerHa} kg/ha Causes Basin Lodging & Nitrogen Runoff!`,34,308);const s=418;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. 94.5% Closed-GOP Advisory + 1-Click ISOBUS / Drone Dispatch",s,26),e.fillStyle="rgba(15, 23, 42, 0.92)",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(s,42,380,304,10),e.fill(),e.stroke(),e.fillStyle="#162033",e.strokeStyle=i?"#10b981":"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(s+18,60,344,118,8),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(i?`🌾 Personalized Field Brief (${a.fieldAreaHectares} ha Parcel Locked)`:"✕ Generic Text SMS / Hallucinated Diffusion Field Map",s+30,86),e.fillStyle="#cbd5e1",e.font="11.5px Inter, system-ui, sans-serif",e.fillText(i?`• Saves ${Math.round((a.flatRateInputKgPerHa-a.vraWeightedInputKgPerHa)*a.fieldAreaHectares/1e3)} Tons of Fertilizer across ${a.fieldAreaHectares} ha`:"• Farmer cannot load PDF table into tractor terminal (87.4% ignored)",s+30,114),e.fillStyle=i?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(i?`• Net Parcel Profit Gain: +$${(a.netProfitGainPerHaUsd*a.fieldAreaHectares).toLocaleString("en-US")} this season`:"• Pure AI video diffusion costs $2.10/farm ($16.8M per 8M farmers!)",s+30,144),e.fillStyle=i?"rgba(16, 185, 129, 0.16)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=i?"#10b981":"#ef4444",e.beginPath(),e.roundRect(s+18,196,344,128,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("In-Video 1-Click Machinery Prescription Push:",s+30,222),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText("1. ISO 11783 ISOBUS TASKDATA.XML → John Deere / Case IH Cab",s+30,248),e.fillText("2. RTK Waypoint KML → DJI Agras T50 / XAG P100 Spray Drone",s+30,272),e.fillStyle=i?"#6ee7b7":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(i?`✓ 94.5% Closed-GOP ($0.0022/farm) Lifts Adoption 12.6% → ${n.effectiveGrowerAdoptionPct.toFixed(1)}%`:"✕ Manual USB Shapefile Import Barrier Kills VRA Adoption",s+30,302),e.fillStyle=i?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(i?`✓ 100.0% GeoJSON Polygon Lock + $0.0022/farm Synthesis: +$${(a.annualPlatformNetBenefitUsd/1e6).toFixed(2)}M/yr Net Benefit`:"✕ Uncontrolled diffusion warps field boundaries & hallucinates kg/ha fertilizer rates",22,378)}u();
