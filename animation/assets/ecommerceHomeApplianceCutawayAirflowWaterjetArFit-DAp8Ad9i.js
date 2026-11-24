import"./modulepreload-polyfill-B5Qt9EMX.js";const f={"builtin-dishwasher-720deg-waterjet-cutaway":{id:"builtin-dishwasher-720deg-waterjet-cutaway",title:"Built-In Dishwasher X-Ray Cutaway: Triple-Arm 45kPa Water-Jet & 600mm Niche Fit",titleZh:"嵌入式洗碗机 X-Ray 半剖透视：三层旋翼 45kPa 高压水幕流线与 600mm 橱柜散热公差校验",flowMetric:"45kPa Triple-Spray + 72°C Steam Ribbon",cabinetToleranceMm:"±1.5mm Niche + 90° Door Drop Arc",skuCount:28},"zero-clearance-fridge-dual-evaporator-airflow":{id:"zero-clearance-fridge-dual-evaporator-airflow",title:"Zero-Clearance French-Door Refrigerator: Dual-System Cold Airflow & 4mm Hinge Arc",titleZh:"零嵌法式冰箱内部风道透视：双循环独立冷气粒子流场与 4mm 微缝双轴铰链开门轨迹",flowMetric:"Dual-Evaporator -24°C / +4°C Laminar Stream",cabinetToleranceMm:"4.0mm Side Gap + 115° Zero-Intrusion Hinge",skuCount:34},"cyclonic-vacuum-hepa-vortex-particle-cutaway":{id:"cyclonic-vacuum-hepa-vortex-particle-cutaway",title:"14-Cone Cyclonic Cordless Vacuum: 120,000 RPM Vortex Separation & HEPA 13 Seal",titleZh:"14锥旋风吸尘器内部剖面：12万转气旋尘气分离粒子轨迹与五重 HEPA 滤网精准高亮",flowMetric:"120k RPM Helical Vortex + 0.3μm Dust Split",cabinetToleranceMm:"Wall-Dock Stud & Plinth Clearance Lock",skuCount:42}};function m(a,e,i){const t=Number(((.85-i)*2).toFixed(1));return e==="cad-stencil-cutaway-gpu-streamline-hinge-ar"?{scenarioId:a,pipelineMode:e,internalBomGeometryFidelityPct:100,returnRateReductionPct:76.4,pdpConversionLiftPct:Number((39.2+Math.max(0,t)).toFixed(1)),costPerSkuUsd:.024,annualSavingsUsdM:3.18,verdict:"Act automatically"}:e==="offline-houdini-fluid-cg-agency-render"?{scenarioId:a,pipelineMode:e,internalBomGeometryFidelityPct:99.2,returnRateReductionPct:32,pdpConversionLiftPct:34.5,costPerSkuUsd:1800,annualSavingsUsdM:.14,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,internalBomGeometryFidelityPct:48.2,returnRateReductionPct:4.5,pdpConversionLiftPct:-8.6,costPerSkuUsd:.58,annualSavingsUsdM:.03,verdict:"Send to a human"}}const v=document.querySelector("#app");if(!v)throw new Error("Missing #app root");let s="zero-clearance-fridge-dual-evaporator-airflow",o="cad-stencil-cutaway-gpu-streamline-hinge-ar",c=.25;function g(a){const e=a.getContext("2d");if(!e)return;const i=a.width,t=a.height;e.clearRect(0,0,i,t);const d=f[s],r=m(s,o,c),l=o==="naive-t2v-hallucinated-scifi-turbine",p=e.createLinearGradient(0,0,i,t);p.addColorStop(0,"#070b14"),p.addColorStop(1,"#0f172a"),e.fillStyle=p,e.fillRect(0,0,i,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,i-32,46),e.strokeStyle=o==="cad-stencil-cutaway-gpu-streamline-hinge-ar"?"#10b981":"#ef4444",e.strokeRect(16,14,i-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`266th Workbench (52nd in Domain 2) · Shell Alpha ${c.toFixed(2)} · ${d.flowMetric}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Internal BOM Fidelity: ${r.internalBomGeometryFidelityPct}% | Return Rate Cut: -${r.returnRateReductionPct}% | PDP CVR Lift: +${r.pdpConversionLiftPct}%`,28,51);const y=[{title:"1. CAD Sub-Assembly Stencil X-Ray Cutaway",detail:l?"⛔ Hallucinated Fake Sci-Fi Gears (51.8% Spec Error)":`✓ 100.0% BOM Motor/Evaporator/Filter Lock (α=${c.toFixed(2)})`,color:l?"#ef4444":"#10b981",x:36,y:84},{title:"2. GPU Streamline Airflow & Water-Jet Particles",detail:l?"⛔ Physically Impossible Smoke Bleeding Through Walls":`✓ ${d.flowMetric}`,color:l?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Built-In Cabinet & Hinge-Arc Clearance AR",detail:l?"⛔ No Millimeter Niche Check (18.4% Return Rate)":`✓ ${d.cabinetToleranceMm} (-${r.returnRateReductionPct}% Returns)`,color:l?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Interactive 60fps WebGPU & Remotion PDP Card",detail:l?"⛔ False-Advertising Compliance Rejection":`✓ +${r.pdpConversionLiftPct}% CVR Lift ($${r.costPerSkuUsd}/SKU · +$${r.annualSavingsUsdM}M/yr)`,color:l?"#ef4444":"#f59e0b",x:396,y:178}];for(const n of y)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=n.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(n.x,n.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(n.title,n.x+14,n.y+28),e.fillStyle=n.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(n.detail,n.x+14,n.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Home Appliance Cutaway & AR Fit Pipeline: ${d.title} (${d.skuCount} SKUs)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(l?"⛔ Unconstrained Text-to-Video Cutaway: Invents Fake Turbines & Triggers False-Advertising Fines!":`✓ STEP/CAD Stencil Plane (100% BOM Lock) + GPU Airflow/Water Ribbons + ±1.5mm Hinge-Arc AR ($${r.costPerSkuUsd}/SKU)`,54,336),e.restore()}function u(){const a=f[s],e=m(s,o,c);v.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">266th Workbench (52nd in Domain 2) · Appliance X-Ray Cutaway, Airflow/Water-Jet &amp; Cabinet AR</span>
        <h1>大家电与智能厨卫电商内部透视剖面（X-Ray Cutaway）、旋风流场动效与嵌入式橱柜公差 AR 工作台</h1>
        <p class="subtitle">原厂 CAD 蒙版截面透视（100% 锁死电机/蒸发器/滤网结构）+ GPU 气旋/高压水幕流线着色器 + ±1.5mm 零嵌铰链开门弧线 AR 校验 vs 文生视频捏造科幻假齿轮</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.internalBomGeometryFidelityPct}% BOM Lock</span>
        <span class="metric-pill">-${e.returnRateReductionPct}% Returns</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 智能大家电与厨卫透视场景 (Appliance Cutaway Scenario)</label>
        <select id="scenario-select">
          ${Object.values(f).map(t=>`<option value="${t.id}" ${t.id===s?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 内部结构透视与安装校验管线 (Cutaway &amp; AR Fit Pipeline)</label>
        <select id="mode-select">
          <option value="cad-stencil-cutaway-gpu-streamline-hinge-ar" ${o==="cad-stencil-cutaway-gpu-streamline-hinge-ar"?"selected":""}>✅ 原厂 CAD 蒙版剖面 + GPU 气旋/水幕流线 + ±1.5mm 零嵌开门弧线 AR (推荐)</option>
          <option value="naive-t2v-hallucinated-scifi-turbine" ${o==="naive-t2v-hallucinated-scifi-turbine"?"selected":""}>⛔ 直接用文生视频提示“家电内部透视” (51.8% 捏造虚假涡轮结构，触发广告法合规下架)</option>
          <option value="offline-houdini-fluid-cg-agency-render" ${o==="offline-houdini-fluid-cg-agency-render"?"selected":""}>⚠️ 传统外包 Houdini 离线流体 CG 渲染 ($1,800/支，不可交互且无用户厨房 AR 量尺)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="alpha-slider">3. 外壳 X-Ray 透视不透明度 (Outer Shell Opacity α: <strong>${c.toFixed(2)}</strong>)</label>
        <input id="alpha-slider" type="range" min="0.15" max="0.65" step="0.05" value="${c}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>CAD 蒙版透视剖面、GPU 气旋/水幕流线与零嵌铰链公差舞台 (Appliance Cutaway Stage)</h2>
          <span class="tag">${a.skuCount} SKUs · ${a.cabinetToleranceMm}</span>
        </div>
        <canvas id="appliance-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>大家电详情页转化与防退货遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">内部电机/风道/滤网 BOM 结构保真率</span>
            <strong class="kpi-value">${e.internalBomGeometryFidelityPct}%</strong>
            <span class="kpi-note">零虚假宣传风险，100% 匹配工程 CAD</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">橱柜尺寸不符与卡门退货率削减</span>
            <strong class="kpi-value">-${e.returnRateReductionPct}%</strong>
            <span class="kpi-note">实时校验 4mm 微缝双轴铰链 115° 开门包络面</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">高客单大家电详情页加购转化提升</span>
            <strong class="kpi-value">${e.pdpConversionLiftPct>=0?"+":""}${e.pdpConversionLiftPct}%</strong>
            <span class="kpi-note">直观展示双循环冷风与 45kPa 三层水幕</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单 SKU 制作成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerSkuUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比外包流体 CG 动画 $1,800/支降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const i=document.querySelector("#appliance-canvas");i&&g(i),document.querySelector("#scenario-select")?.addEventListener("change",t=>{s=t.target.value,u()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{o=t.target.value,u()}),document.querySelector("#alpha-slider")?.addEventListener("input",t=>{c=Number(t.target.value),u()})}u();
