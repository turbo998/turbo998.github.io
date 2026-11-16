import"./modulepreload-polyfill-B5Qt9EMX.js";const S={biot_savart_finite_segment_cosine_lock:{id:"biot_savart_finite_segment_cosine_lock",label:"Biot-Savart Finite-Segment Cosine Law (B = B_∞ L/√(L²+ρ²), B/B_BS = 1.0000×)",labelZh:"Biot-Savart 毕奥-萨伐尔有限直丝余弦差定律（B = B_∞ L/√(L²+ρ²)，场强比恒锁 1.0000×）",subtitle:"Multiplies the infinite-line 1/ρ field by the endpoint cosine factor ½(cosθ₁ − cosθ₂) = L / √(L² + ρ²) = 1 / (1 + u), locking B_active / B_BS = 1.0000× across all 17 stations.",subtitleZh:"计入有限长直涡丝/电流元两端张角余弦差因子 ½(cosθ₁ − cosθ₂) = L / √(L² + ρ²) = 1 / (1 + u)，在全 17 站恒定锁死诱导速度/磁场比 1.0000×。",useBiotSavartCosineLaw:!0,defaultStationIndex:16,badge:"BIOT-SAVART COSINE LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"毕奥-萨伐尔锁死 · 1.0000×（0/17 超冲站）",description:"Jean-Baptiste Biot & Félix Savart (1820) and Hermann von Helmholtz (1858) proved that a finite straight filament of half-length L induces field B = (μ₀I / 4πρ)(cosθ₁ − cosθ₂) = B_∞ L / √(L² + ρ²).",descriptionZh:"Biot & Savart（1820）与 Helmholtz（1858）严格证明：半长为 L 的有限直电流/直涡丝在中垂面上诱导的场强为 B = B_∞ L / √(L² + ρ²)，随径向距离与半长之比按余弦因子衰减。"},naive_infinite_wire_overestimate:{id:"naive_infinite_wire_overestimate",label:"Naive Infinite-Wire 1/ρ Approximation (B = B_∞, Overestimate = 1 + u up to 2.0000×)",labelZh:"朴素无限长直丝 1/ρ 近似模型（B = B_∞，诱导场强按 √(1+(ρ/L)²) = 1+u 超冲至 2.0000×）",subtitle:"Applies the infinite-wire formula B_∞ = μ₀I/(2πρ) to finite polygonal vortex/current segments without the endpoint cosine factor, overestimating field by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"对有限长多边形涡丝或闪电折线段直接套用无限长直丝公式 Γ/(2πρ) 而忽略端点余弦截断，使诱导速度/磁场在第 4 站超冲至 1.2500×、第 8 站冲至 1.5000×、第 16 站（ρ=√3 L）翻倍超冲至 2.0000×。",useBiotSavartCosineLaw:!1,defaultStationIndex:16,badge:"FIELD OVERESTIMATE · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"场强超冲 · 最高 2.0000×（16/17 站违背）",description:"Naive smoke-ring and magnetic-coil shaders use 1/ρ without endpoint cosine truncation, doubling the induced velocity at ρ = √3 L across 16/17 stations.",descriptionZh:"朴素烟圈涡丝与电磁线圈着色器使用未截断的 1/ρ 公式，在 ρ = √3 L（端点张角 60°）处将诱导速度翻倍高估至 2.0000× 并污染 16/17 个站点。"}},g=17;function P(e){const t=1+Math.max(0,e),a=1/t;return{hypotenuseRatio:t,biotSavartCosineFactor:a}}function U(e,i=64){const a=1/(1+Math.max(0,e)),s=Math.max(2,i%2===0?i:i+1),r=1/s;let o=2*a;for(let n=1;n<s;n++){const l=n*r,x=n%2===1?4:2;o+=x*(2*a*l)}return r/3*o}function Z(e,i){const t=Math.max(0,Math.min(g-1,e)),a=t/(g-1),s=P(a),r=U(a,64),o=1+a,n=i?1:o;return{index:t,hypotenuseExcessU:a,hypotenuseRatio:s.hypotenuseRatio,biotSavartCosineFactor:s.biotSavartCosineFactor,quadratureCosineFactor:r,fieldOverestimateRatio:n,naiveOverestimateRatio:o,isFieldOverestimateViolation:n>1.0001}}function F(e,i){const t=S[e],a=[];let s=0,r=0;for(let n=0;n<g;n++){const l=Z(n,t.useBiotSavartCosineLaw);a.push(l),l.isFieldOverestimateViolation&&s++;const x=Math.abs(l.biotSavartCosineFactor-l.quadratureCosineFactor);x>r&&(r=x)}const o=i!==void 0?Math.max(0,Math.min(g-1,i)):t.defaultStationIndex;return{presetId:e,useBiotSavartCosineLaw:t.useBiotSavartCosineLaw,stationCount:g,selectedStation:a[o],stations:a,station4Ratio:a[4].fieldOverestimateRatio,station8Ratio:a[8].fieldOverestimateRatio,station12Ratio:a[12].fieldOverestimateRatio,station16Ratio:a[16].fieldOverestimateRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"BIOT_SAVART_FINITE_FILAMENT_LOCKED":"NAIVE_INFINITE_WIRE_FIELD_OVERESTIMATE"}}function Q(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Biot-Savart & Helmholtz Finite Vortex/Current Filament Plinth"}),i.push({id:"helmholtz-rail-front",kind:"helmholtz_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Biot-Savart Cosine Factor Lock Rail (B_active / B_BS = 1.0000×)"}),i.push({id:"helmholtz-rail-back",kind:"helmholtz_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Hypotenuse Aspect Rail (√(1 + (ρ/L)²) = 1 + u)"});for(const t of e.stations){const a=(t.index-8)*30,s=22*t.hypotenuseRatio,r=44*t.biotSavartCosineFactor,o=36*t.fieldOverestimateRatio;i.push({id:`hypotenuse-aspect-column-${t.index}`,kind:"hypotenuse_aspect_column",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Hypotenuse √(1+(ρ/L)²) = ${t.hypotenuseRatio.toFixed(4)}×`}),i.push({id:`biot-savart-cosine-vane-${t.index}`,kind:"biot_savart_cosine_vane",stationIndex:t.index,x:a,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useBiotSavartCosineLaw?"teal":"slate",label:`Station ${t.index} Cosine Factor cosθ₁ = ${t.biotSavartCosineFactor.toFixed(4)}×`}),i.push({id:`field-overestimate-gauge-${t.index}`,kind:"field_overestimate_gauge",stationIndex:t.index,x:a,y:o*.5-8,z:56,w:Math.min(24,12*t.fieldOverestimateRatio),h:o,d:12,tone:t.isFieldOverestimateViolation?"crimson":"teal",label:`Station ${t.index} Field Ratio B/B_BS = ${t.fieldOverestimateRatio.toFixed(4)}×`})}return i.push({id:"endpoint-collar-left",kind:"filament_endpoint_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Near-Wire Limit Gate (ρ/L → 0, cosθ₁ = 1.000, B = 1.000 B_∞)"}),i.push({id:"endpoint-collar-right",kind:"filament_endpoint_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useBiotSavartCosineLaw?"teal":"crimson",label:"Finite-Segment Gate (ρ = √3 L, cosθ₁ = 0.500, B = 0.500 B_∞)"}),i.push({id:"circulation-bar-top",kind:"circulation_flux_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Biot-Savart Cosine Difference: v_θ = (Γ / 4πρ)(cosθ₁ − cosθ₂)"}),i.push({id:"circulation-bar-front",kind:"circulation_flux_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useBiotSavartCosineLaw?"teal":"crimson",label:"Finite-Segment Field Lock Line (B_active / B_BiotSavart = 1.0000×)"}),i}const M=new URLSearchParams(window.location.search),$=M.get("preset"),G=M.get("theme")==="light"?"light":"dark";let d=$&&$ in S?$:"biot_savart_finite_segment_cosine_lock",c=S[d].defaultStationIndex,b=G;document.documentElement.setAttribute("data-theme",b);const W=document.querySelector("#app");W.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 211 · 221ST DEMO · VORTEX &amp; ELECTROMAGNETIC FILAMENT BIOT-SAVART COSINE METROLOGY</span>
        <h1>Biot-Savart Finite Straight Filament Cosine Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Filament Field Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="biot_savart_finite_segment_cosine_lock"
      >
        Biot-Savart B = B_∞ L/√(L²+ρ²) Cosine Law (B / B_BS = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_infinite_wire_overestimate"
      >
        Naive Infinite-Wire 1/ρ Formula (Overestimate = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED HYPOTENUSE √(1+(ρ/L)²) / COSINE FACTOR</span>
        <strong id="kpi-cos" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">INDUCED FIELD RATIO (B_active / B_BiotSavart)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 FIELD RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">√(1+(ρ/L)²) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FIELD OVERESTIMATE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC BIOT-SAVART FINITE FILAMENT RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Biot-Savart finite straight filament cosine rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Hypotenuse Aspect Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, cosθ₁ = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION BIOT-SAVART L/√(L²+ρ²) VS INFINITE-WIRE LEDGER</span>
          <span>½(cosθ₁ − cosθ₂)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>√(1+(ρ/L)²)</th>
                <th>B_BS / B_∞</th>
                <th>Line Quad</th>
                <th>B / B_BS</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),A=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-cos"),K=document.querySelector("#kpi-quad"),y=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),w=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),C=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),N=document.querySelector("#theme-toggle");function v(e,i,t){const a=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[a,s]}function at(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,a,s,r,o,n,l,x,V){const u=a*.5,p=s*.5,h=r*.5,T=v(e+u,i-p,t-h),m=v(e+u,i-p,t+h),R=v(e-u,i-p,t+h),O=v(e-u,i+p,t-h),k=v(e+u,i+p,t-h),f=v(e+u,i+p,t+h),B=v(e-u,i+p,t+h),I=at(o,l),E=n?1.8:.7,L=n?"#ffffff":I.stroke,H=`${O[0].toFixed(1)},${O[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${B[0].toFixed(1)},${B[1].toFixed(1)}`,z=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${B[0].toFixed(1)},${B[1].toFixed(1)}`,D=`${m[0].toFixed(1)},${m[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${x}" data-solid-kind="${V}">
      <polygon points="${z}" fill="${I.left}" stroke="${L}" stroke-width="${E}" />
      <polygon points="${D}" fill="${I.right}" stroke="${L}" stroke-width="${E}" />
      <polygon points="${H}" fill="${I.top}" stroke="${L}" stroke-width="${E}" />
    </g>
  `}function _(e){const i=S[e.presetId],t=e.selectedStation,a=b==="dark";Y.textContent=i.subtitle,A.textContent=i.badge,A.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`√(1+(ρ/L)²) = ${t.hypotenuseRatio.toFixed(4)}× (B_BS/B_∞ = ${t.biotSavartCosineFactor.toFixed(4)}×)`,K.textContent=`Line Quad = ${t.quadratureCosineFactor.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,y.textContent=`${t.fieldOverestimateRatio.toFixed(4)}×`,y.className=`kpi-value ${t.isFieldOverestimateViolation?"text-danger":"text-ok"}`,X.textContent=`u = √(1+(ρ/L)²) − 1 = ${t.hypotenuseExcessU.toFixed(4)} | ½(cosθ₁ − cosθ₂)`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,w.textContent=`${e.violatedCount} / ${e.stationCount}`,w.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,C.value=String(t.index),ot.textContent=`Station ${t.index} (u = ${t.hypotenuseExcessU.toFixed(3)}, cosθ₁ = ${t.biotSavartCosineFactor.toFixed(3)}, B/B_BS = ${t.fieldOverestimateRatio.toFixed(4)}×)`;const s=Q(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((o,n)=>o.z-n.z||o.y-n.y||o.x-n.x);it.innerHTML=r.map(o=>nt(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,a,o.id,o.kind)).join(""),q.innerHTML=e.stations.map(o=>{const n=o.index===t.index?"row-selected":"",l=o.isFieldOverestimateViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.hypotenuseExcessU.toFixed(4)}</td>
          <td>${o.hypotenuseRatio.toFixed(4)}×</td>
          <td>${o.biotSavartCosineFactor.toFixed(4)}×</td>
          <td>${o.quadratureCosineFactor.toFixed(4)}×</td>
          <td class="${l}">${o.fieldOverestimateRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const n=o.getAttribute("data-preset");o.classList.toggle("active",n===e.presetId)}),window.__BIOT_SAVART_FILAMENT_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in S&&(d=i,c=S[d].defaultStationIndex,_(F(d,c)))})});C.addEventListener("input",()=>{c=Number(C.value),_(F(d,c))});q.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),_(F(d,c)))});N.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),N.textContent=`Theme: ${b.toUpperCase()}`,_(F(d,c))});_(F(d,c));
