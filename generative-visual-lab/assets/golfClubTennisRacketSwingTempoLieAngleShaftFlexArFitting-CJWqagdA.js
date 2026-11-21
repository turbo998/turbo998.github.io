import"./modulepreload-polyfill-B5Qt9EMX.js";const f={"aggressive-108mph-tall-iron":{id:"aggressive-108mph-tall-iron",titleZh:"高个爆发型铁杆球手（腕地距 915mm · 7号铁挥速 94mph / 1号木 108mph · +2° Upright 杆底校准）",titleEn:'Tall Aggressive Iron Striker (915mm Wrist-to-Floor · 108mph Driver · +0.5" & +2.0° Upright Lie Lock)',playerProfile:"189cm Golfer · 915mm Wrist-to-Floor · Aggressive 2.6:1 Transition Tempo",wristToFloorMm:915,clubheadSpeedMph:108,naiveDynamicLieErrorDeg:-2.8,fittedDynamicLieErrorDeg:.2,recommendedBuildSpec:'+0.5" Length · +2.0° Upright Lie · X-Stiff 125g Low-Kick Shaft (3.1° Torque)',naiveDispersionYards:22.4,fittedDispersionYards:6.8,carryDistanceGainYards:18.6,naiveReturnRatePct:26.8,fittedReturnRatePct:2.9,annualSavingsPer100kOrdersUsd:214e4},"smooth-88mph-petite-driver":{id:"smooth-88mph-petite-driver",titleZh:"中等挥速平滑节奏球手（腕地距 795mm · 1号木挥速 88mph · -1.5° Flat + 中高弹道降倒旋杆身）",titleEn:"Smooth-Tempo Mid-Speed Golfer (795mm Wrist-to-Floor · 88mph Driver · -1.5° Flat & 2,320rpm Spin Lock)",playerProfile:"166cm Golfer · 795mm Wrist-to-Floor · Smooth 3.2:1 Transition Tempo",wristToFloorMm:795,clubheadSpeedMph:88,naiveDynamicLieErrorDeg:2.4,fittedDynamicLieErrorDeg:-.2,recommendedBuildSpec:'-0.5" Length · -1.5° Flat Lie · R-Flex 55g Mid-Kick Graphite (2,320 rpm Spin)',naiveDispersionYards:19.8,fittedDispersionYards:6.2,carryDistanceGainYards:19.4,naiveReturnRatePct:25.4,fittedReturnRatePct:2.8,annualSavingsPer100kOrdersUsd:198e4},"topspin-tennis-318sw-elbow":{id:"topspin-tennis-318sw-elbow",titleZh:"职业网球单反/双反球拍定制（挥重 318 kg·cm² 匹配 · 6pt 头轻平衡 + 52磅聚酯混穿防网球肘冲击）",titleEn:"Pro Tennis Racket Swingweight & Elbow Shock Fitter (318 kg·cm² Swingweight · 6pt Head-Light · RA 62 Stiffness)",playerProfile:"4.5 NTRP Baseliner · 74mph RHS · History of Lateral Epicondylitis (Tennis Elbow)",wristToFloorMm:840,clubheadSpeedMph:74,naiveDynamicLieErrorDeg:2.1,fittedDynamicLieErrorDeg:.3,recommendedBuildSpec:"98 sq.in · 305g Unstrung · 318 Swingweight · 6pt HL · RA 62 + Gut/Poly 52/49 lbs",naiveDispersionYards:16.5,fittedDispersionYards:4.8,carryDistanceGainYards:14.2,naiveReturnRatePct:24.1,fittedReturnRatePct:3.1,annualSavingsPer100kOrdersUsd:186e4}};function u(i,t){const e=f[i],s=t==="biomech-240fps-lie-shaft-ei-fitter",o=s?e.fittedDynamicLieErrorDeg:e.naiveDynamicLieErrorDeg,r=s?e.fittedDispersionYards:e.naiveDispersionYards,n=s?e.carryDistanceGainYards:0,l=s?e.fittedReturnRatePct:e.naiveReturnRatePct,c=Math.abs(o)<=.5;return{preset:e,mode:t,effectiveLieErrorDeg:o,effectiveDispersionYards:r,effectiveDistanceGainYards:n,effectiveReturnRatePct:l,impactLieSquarePass:c,shaftEiMatchedPass:s,verdictBadge:s?`240FPS LIE & SHAFT EI LOCKED (Lie Error ${o>=0?"+":""}${o.toFixed(1)}° · ±${r.toFixed(1)}yd Dispersion · +${n.toFixed(1)}yd Carry)`:`TOE-DROOP LIE MISMATCH & SPIN BLOW-UP (${e.naiveDynamicLieErrorDeg>=0?"+":""}${e.naiveDynamicLieErrorDeg.toFixed(1)}° Lie Error · ±${e.naiveDispersionYards.toFixed(1)}yd Slice/Hook)`}}const S=document.querySelector("#app");let g="aggressive-108mph-tall-iron",m="biomech-240fps-lie-shaft-ei-fitter";function h(){const i=u(g,m),t=i.preset,e=m==="biomech-240fps-lie-shaft-ei-fitter";S.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 387 · 176th Curated Workbench · Domain 2 (Custom Golf Club & Pro Tennis Racket 240fps Swing Kinematics & Lie/Shaft AR Fitting Studio)</span>
        <h1>高端高尔夫球杆与职业网球拍 240fps 挥杆运动学、动态着地角与杆身 EI 刚度 AR 量身配杆工作台</h1>
        <p class="wb-subtitle">终结纯凭身高盲买标准杆（Stock Rack）忽略腕地距（Wrist-to-Floor 915mm）与下杆离心杆身下垂（Toe Droop）导致触球着地角偏差 ±2.8°（打出 ±22.4码大右曲/左曲且倒旋飙升损失 19码距离）的痛点：手机 240fps 慢动作锁定 ±0.2° 动态着地角与杆身 EI 折点，将退货率从 26.8% 压至 2.9%（每 10万单省 +$2.14M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${i.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Player Preset and Fitting Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择球手生物力学与挥速档位 (Player Biomechanics & Swing Speed Preset):</span>
        <div class="btn-row">
          ${Object.keys(f).map(s=>`
            <button type="button" class="scenario-btn ${g===s?"active":""}" data-scenario="${s}">
              ${f[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换球杆/球拍线上量身定制管线 (Custom Club/Racket Fitting Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-static-height-stock-rack">
            ❌ 传统基线：仅凭静态身高推荐标准现货杆 (忽略腕地距与动态杆身下垂 Toe-Droop)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="biomech-240fps-lie-shaft-ei-fitter">
            ✅ 推荐架构：240fps 慢动作腕地距 + 动态着地角 (±0.2°) + 杆身 EI 刚度曲线定制引擎
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Golf & Tennis Fitting KPIs">
      <div class="kpi-card">
        <span class="kpi-title">击球瞬间动态着地角偏差 (Dynamic Lie Error)</span>
        <strong class="kpi-value ${i.impactLieSquarePass?"good":"bad"}" id="kpi-lie">${i.effectiveLieErrorDeg>=0?"+":""}${i.effectiveLieErrorDeg.toFixed(1)}°</strong>
        <span class="kpi-sub">零偏转允许阈值 ±0.5° · 腕地距 ${t.wristToFloorMm}mm</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">落点横向散布半径 (Lateral Dispersion)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-dispersion">±${i.effectiveDispersionYards.toFixed(1)} yds</strong>
        <span class="kpi-sub">${e?"杆底平齐触地，消除 Toe-Dig 右推与 Heel-Dig 左拉":"趾部/跟部先触草皮导致杆面剧烈翻转"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">最佳倒旋锁死与净增距离 (Carry Gain)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-carry">+${i.effectiveDistanceGainYards.toFixed(1)} yds</strong>
        <span class="kpi-sub">挥速 ${t.clubheadSpeedMph} mph · 定制规格：${t.recommendedBuildSpec.split(" · ")[2]}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">拆封试打退货率与每 10万单净省 (ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">${i.effectiveReturnRatePct.toFixed(1)}% · +$${(t.annualSavingsPer100kOrdersUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">对比传统盲买 ${t.naiveReturnRatePct.toFixed(1)}% 退换折旧率</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>击球瞬间杆底着地角 (Toe-Down vs Square Lie) + 杆身 EI 挠度曲线 + 球道落点椭圆画布</h2>
          <span class="tag">${t.recommendedBuildSpec}</span>
        </div>
        <canvas id="golf-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>挥杆生物力学与工厂定制工单明细 (Custom Build Spec Audit)</h2>
        <ul class="audit-list">
          <li><span>球手体态与发力节奏:</span> <strong>${t.playerProfile}</strong></li>
          <li><span>静态腕地距与实测挥速:</span> <strong>腕地距 ${t.wristToFloorMm} mm · 杆头速度 ${t.clubheadSpeedMph} mph</strong></li>
          <li><span>触球瞬间动态着地角误差:</span> <strong>${t.naiveDynamicLieErrorDeg>=0?"+":""}${t.naiveDynamicLieErrorDeg.toFixed(1)}° → ${i.effectiveLieErrorDeg>=0?"+":""}${i.effectiveLieErrorDeg.toFixed(1)}°</strong></li>
          <li><span>定制装配处方单 (Build Spec):</span> <strong>${t.recommendedBuildSpec}</strong></li>
          <li><span>球道落点横向偏移收敛:</span> <strong>±${t.naiveDispersionYards.toFixed(1)} yds → ±${i.effectiveDispersionYards.toFixed(1)} yds (-69.6%)</strong></li>
          <li><span>空中飞行距离净增益:</span> <strong>+${i.effectiveDistanceGainYards.toFixed(1)} Yards</strong></li>
          <li><span>每 10万单减少拆封退货折损:</span> <strong>+$${t.annualSavingsPer100kOrdersUsd.toLocaleString("en-US")} / 100k Orders</strong></li>
        </ul>
      </div>
    </main>
  `,b(),y(i)}function b(){document.querySelectorAll(".scenario-btn").forEach(i=>{i.addEventListener("click",()=>{g=i.dataset.scenario,h()})}),document.querySelectorAll(".mode-btn").forEach(i=>{i.addEventListener("click",()=>{m=i.dataset.mode,h()})})}function y(i){const t=document.querySelector("#golf-canvas");if(!t)return;const e=t.getContext("2d"),s=t.width,o=t.height,r=i.preset,n=i.mode==="biomech-240fps-lie-shaft-ei-fitter";e.fillStyle="#070b14",e.fillRect(0,0,s,o),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Impact Dynamic Lie Angle (±0.2° Square Sole) & Shaft Toe-Droop",22,26),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,40,376,336,10),e.fill(),e.stroke();const l=304;e.strokeStyle="#10b981",e.lineWidth=3,e.beginPath(),e.moveTo(42,l),e.lineTo(378,l),e.stroke();const c=162,p=l-22;e.strokeStyle=n?"#38bdf8":"#ef4444",e.lineWidth=4,e.beginPath(),e.moveTo(86,68),e.quadraticCurveTo(134,188,c,p),e.stroke(),e.save(),e.translate(c,p);const v=-i.effectiveLieErrorDeg*Math.PI/180*3.8;e.rotate(v),e.fillStyle=n?"rgba(16, 185, 129, 0.35)":"rgba(239, 68, 68, 0.38)",e.strokeStyle=n?"#34d399":"#f87171",e.lineWidth=2.6,e.beginPath(),e.moveTo(0,0),e.lineTo(118,20),e.lineTo(112,-24),e.lineTo(8,-14),e.closePath(),e.fill(),e.stroke(),e.restore(),e.fillStyle="#f8fafc",e.beginPath(),e.arc(c+58,l-14,13,0,Math.PI*2),e.fill(),e.fillStyle=n?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(n?`✓ Fitted Lie (${i.effectiveLieErrorDeg>=0?"+":""}${i.effectiveLieErrorDeg.toFixed(1)}°): Sole contacts turf dead-square`:`✕ Stock Lie (${r.naiveDynamicLieErrorDeg.toFixed(1)}°): Toe/Heel digs turf & twists face open!`,36,350);const d=418;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Fairway Shot Dispersion Ellipse & Ball-Flight Trajectory",d,26),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.lineWidth=1.5,e.beginPath(),e.roundRect(d,40,380,336,10),e.fill(),e.stroke();const a=d+190;e.strokeStyle="rgba(148, 163, 184, 0.35)",e.setLineDash([6,4]),e.beginPath(),e.moveTo(a,58),e.lineTo(a,316),e.stroke(),e.setLineDash([]),e.fillStyle="rgba(239, 68, 68, 0.14)",e.strokeStyle="rgba(239, 68, 68, 0.65)",e.lineWidth=1.8,e.beginPath(),e.ellipse(a+58,178,56,28,.25,0,Math.PI*2),e.fill(),e.stroke(),e.fillStyle="#fca5a5",e.font="11px Inter, system-ui, sans-serif",e.fillText(`Stock Rack Slice (±${r.naiveDispersionYards} yds)`,a+12,224),n?(e.fillStyle="rgba(16, 185, 129, 0.28)",e.strokeStyle="#10b981",e.lineWidth=2.4,e.beginPath(),e.ellipse(a,114,22,16,0,0,Math.PI*2),e.fill(),e.stroke(),e.strokeStyle="#38bdf8",e.lineWidth=2.8,e.beginPath(),e.moveTo(a,310),e.quadraticCurveTo(a-6,210,a,114),e.stroke(),e.fillStyle="#34d399",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✓ Custom Fitted: +${r.carryDistanceGainYards} yds Carry · ±${r.fittedDispersionYards} yds Fairway Lock`,d+18,350)):(e.strokeStyle="#ef4444",e.lineWidth=2.8,e.beginPath(),e.moveTo(a,310),e.quadraticCurveTo(a-24,210,a+64,178),e.stroke(),e.fillStyle="#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✕ Unfitted Lie & Soft Shaft: Misses Fairway by +${r.naiveDispersionYards} yds (${r.naiveReturnRatePct}% Returns)`,d+18,350))}h();
