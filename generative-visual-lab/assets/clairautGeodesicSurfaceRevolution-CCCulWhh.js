import"./modulepreload-polyfill-B5Qt9EMX.js";const f={clairaut_noether_geodesic_invariant_lock:{id:"clairaut_noether_geodesic_invariant_lock",label:"Clairaut Geodesic Relation (r(s) sinψ(s) = C, Ratio = 1.0000×)",labelZh:"Clairaut 克莱罗回转曲面测地线定律（r(s) sinψ(s) = C，不变量比恒锁 1.0000×）",subtitle:"Conserves geodesic angular momentum C = r(s) sinψ(s) across expanding parallel circles r/r₀ = 1 + u so sinψ ∝ 1/r, locking C_active/C_Clairaut = 1.0000× across all 17 stations.",subtitleZh:"在回转曲面平行圈扩张 r/r₀ = 1 + u 时严格守恒克莱罗测地角动量 C = r(s) sinψ(s)，令经线交角正弦按 1/(1+u) 反比收缩，在全 17 站恒定锁死不变量比 1.0000×。",useClairautGeodesicLaw:!0,defaultStationIndex:16,badge:"CLAIRAUT r·sinψ LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"测地不变量锁死 · 1.0000×（0/17 侧滑站）",description:"Alexis Claude Clairaut (1733) proved that any tensioned geodesic on a surface of revolution conserves r(s) sinψ(s) = const, ensuring zero lateral slippage.",descriptionZh:"Alexis Claude Clairaut（1733）证明：回转曲面上任何零侧滑张紧测地线（缠绕藤蔓、复合材料纤维缠绕、绷紧丝带）严格守恒 r(s) sinψ(s) = const。"},naive_rhumb_loxodrome_constant_angle_drift:{id:"naive_rhumb_loxodrome_constant_angle_drift",label:"Naive Constant-Angle Rhumb Loxodrome (sinψ = sinψ₀, Drift = 1 + u up to 2.0000×)",labelZh:"朴素定常交角等角航线缠绕（sinψ = sinψ₀，克莱罗不变量按 1+u 漂移至 2.0000×）",subtitle:"Wraps ribbons/vines at constant meridian crossing angle ψ = ψ₀ across r = r₀(1+u), inflating r sinψ by 1 + u to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"在回转花瓶与圆锥表面强行保持恒定螺旋交角 ψ = ψ₀，使测地角动量 r sinψ 在第 4 站漂移至 1.2500×、第 8 站 1.5000×、第 16 站（两倍平行圈半径）翻倍漂移至 2.0000×。",useClairautGeodesicLaw:!1,defaultStationIndex:16,badge:"LOXODROME DRIFT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"测地侧滑 · 最高 2.0000×（16/17 站违背）",description:"Naive UV-helix shaders wrap straps and vines with constant slope dφ/dz, creating non-zero geodesic curvature κ_g ≠ 0 so tensioned straps slip off curved vessels.",descriptionZh:"朴素 UV 螺旋缠绕着色器使用固定斜率铺设绑带与藤蔓，产生非零测地曲率 κ_g ≠ 0，导致绷紧的皮带或丝带在花瓶肚与圆锥面上发生横向打滑脱落。"}},v=17;function P(e){const t=1+Math.max(0,e);return{parallelRadiusRatio:t,clairautSineAzimuthFactor:1/t}}function Z(e,a=64){const o=1/(1+Math.max(0,e)),s=Math.max(2,a%2===0?a:a+1),r=1/s;let i=0+2*o;for(let n=1;n<s;n++){const l=n*r,g=n%2===1?4:2;i+=g*(2*l*o)}return r/3*i}function H(e,a){const t=Math.max(0,Math.min(v-1,e)),o=t/(v-1),s=P(o),r=Z(o,64),i=1+o,n=a?1:i;return{index:t,parallelRadiusExcessU:o,parallelRadiusRatio:s.parallelRadiusRatio,clairautSineAzimuthFactor:s.clairautSineAzimuthFactor,quadratureSineFactor:r,clairautInvariantRatio:n,naiveLoxodromeDriftRatio:i,isLoxodromeDriftViolation:n>1.0001}}function R(e,a){const t=f[e],o=[];let s=0,r=0;for(let n=0;n<v;n++){const l=H(n,t.useClairautGeodesicLaw);o.push(l),l.isLoxodromeDriftViolation&&s++;const g=Math.abs(l.clairautSineAzimuthFactor-l.quadratureSineFactor);g>r&&(r=g)}const i=a!==void 0?Math.max(0,Math.min(v-1,a)):t.defaultStationIndex;return{presetId:e,useClairautGeodesicLaw:t.useClairautGeodesicLaw,stationCount:v,selectedStation:o[i],stations:o,station4Ratio:o[4].clairautInvariantRatio,station8Ratio:o[8].clairautInvariantRatio,station12Ratio:o[12].clairautInvariantRatio,station16Ratio:o[16].clairautInvariantRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"CLAIRAUT_GEODESIC_INVARIANT_LOCKED":"NAIVE_LOXODROME_INVARIANT_DRIFT"}}function Q(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Clairaut Surface-of-Revolution Geodesic Plinth"}),a.push({id:"meridian-rail-front",kind:"meridian_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Clairaut Geodesic Invariant Rail (C_active / C_Clairaut = 1.0000×)"}),a.push({id:"meridian-rail-back",kind:"meridian_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Parallel Circle Radius Rail (r / r₀ = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.parallelRadiusRatio,r=44*t.clairautSineAzimuthFactor,i=36*t.clairautInvariantRatio;a.push({id:`parallel-circle-collar-${t.index}`,kind:"parallel_circle_collar",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Parallel Radius r/r₀ = ${t.parallelRadiusRatio.toFixed(4)}×`}),a.push({id:`clairaut-azimuth-vane-${t.index}`,kind:"clairaut_azimuth_vane",stationIndex:t.index,x:o,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useClairautGeodesicLaw?"teal":"slate",label:`Station ${t.index} Azimuth Sine sinψ/sinψ₀ = ${t.clairautSineAzimuthFactor.toFixed(4)}×`}),a.push({id:`invariant-drift-gauge-${t.index}`,kind:"invariant_drift_gauge",stationIndex:t.index,x:o,y:i*.5-8,z:56,w:Math.min(24,12*t.clairautInvariantRatio),h:i,d:12,tone:t.isLoxodromeDriftViolation?"crimson":"teal",label:`Station ${t.index} Invariant Ratio C/C_Clairaut = ${t.clairautInvariantRatio.toFixed(4)}×`})}return a.push({id:"vessel-collar-left",kind:"vessel_neck_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Narrow Neck Parallel Gate (r = 1.000 r₀, C = r₀ sinψ₀)"}),a.push({id:"vessel-collar-right",kind:"vessel_neck_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useClairautGeodesicLaw?"teal":"crimson",label:"Wide Belly Parallel Gate (r = 2.000 r₀, sinψ = 0.500 sinψ₀)"}),a.push({id:"tension-bar-top",kind:"geodesic_tension_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Euler-Lagrange Geodesic Angular Momentum C = r(s) sinψ(s)"}),a.push({id:"tension-bar-front",kind:"geodesic_tension_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useClairautGeodesicLaw?"teal":"crimson",label:"Clairaut Zero-Slip Lock Line (C_active / C_Clairaut = 1.0000×)"}),a}const y=new URLSearchParams(window.location.search),F=y.get("preset"),B=y.get("theme")==="light"?"light":"dark";let d=F&&F in f?F:"clairaut_noether_geodesic_invariant_lock",c=f[d].defaultStationIndex,b=B;document.documentElement.setAttribute("data-theme",b);const W=document.querySelector("#app");W.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 205 · 215TH DEMO MILESTONE · DIFFERENTIAL GEOMETRY GEODESICS &amp; CLAIRAUT INVARIANT METROLOGY</span>
        <h1>Clairaut Geodesic Surface-of-Revolution Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Geodesic Wrapping Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="clairaut_noether_geodesic_invariant_lock"
      >
        Clairaut Geodesic r·sinψ = C Law (C/C_exact = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_rhumb_loxodrome_constant_angle_drift"
      >
        Naive Constant-Angle Rhumb Line (Drift = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED RADIUS r/r₀ / SINE sinψ/sinψ₀</span>
        <strong id="kpi-radius" class="kpi-value">--</strong>
        <span id="kpi-sine" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CLAIRAUT INVARIANT RATIO (C / C_exact)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 INVARIANT RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">r/r₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">GEODESIC SLIP VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC CLAIRAUT GEODESIC RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Clairaut geodesic surface-of-revolution rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Parallel Circle Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, r = 2.000 r₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION CLAIRAUT r·sinψ VS RHUMB LOXODROME LEDGER</span>
          <span>C = r(s) sinψ(s) = const</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>r / r₀</th>
                <th>sinψ_C/sinψ₀</th>
                <th>Quad sinψ</th>
                <th>C / C_Clairaut</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const X=document.querySelector("#preset-subtitle"),w=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-radius"),j=document.querySelector("#kpi-sine"),G=document.querySelector("#kpi-ratio"),K=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),N=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),A=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),M=document.querySelector("#station-tbody"),D=document.querySelector("#theme-toggle");function h(e,a,t){const o=(e-t*.55)*.88,s=-a+(e*.18+t*.42)*.55;return[o,s]}function ot(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,a,t,o,s,r,i,n,l,g,U){const u=o*.5,p=s*.5,x=r*.5,L=h(e+u,a-p,t-x),I=h(e+u,a-p,t+x),T=h(e-u,a-p,t+x),O=h(e-u,a+p,t-x),S=h(e+u,a+p,t-x),C=h(e+u,a+p,t+x),_=h(e-u,a+p,t+x),$=ot(i,l),m=n?1.8:.7,E=n?"#ffffff":$.stroke,q=`${O[0].toFixed(1)},${O[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,z=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,V=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${U}">
      <polygon points="${z}" fill="${$.left}" stroke="${E}" stroke-width="${m}" />
      <polygon points="${V}" fill="${$.right}" stroke="${E}" stroke-width="${m}" />
      <polygon points="${q}" fill="${$.top}" stroke="${E}" stroke-width="${m}" />
    </g>
  `}function k(e){const a=f[e.presetId],t=e.selectedStation,o=b==="dark";X.textContent=a.subtitle,w.textContent=a.badge,w.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`r/r₀ = ${t.parallelRadiusRatio.toFixed(4)}× (sinψ_C/sinψ₀ = ${t.clairautSineAzimuthFactor.toFixed(4)}×)`,j.textContent=`Quad sinψ = ${t.quadratureSineFactor.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,G.textContent=`${t.clairautInvariantRatio.toFixed(4)}×`,G.className=`kpi-value ${t.isLoxodromeDriftViolation?"text-danger":"text-ok"}`,K.textContent=`u = r/r₀ − 1 = ${t.parallelRadiusExcessU.toFixed(4)} | C = r(s) sinψ(s)`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,N.textContent=`${e.violatedCount} / ${e.stationCount}`,N.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,A.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.parallelRadiusExcessU.toFixed(3)}, r/r₀ = ${t.parallelRadiusRatio.toFixed(3)}×, C/C_Clairaut = ${t.clairautInvariantRatio.toFixed(4)}×)`;const s=Q(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);at.innerHTML=r.map(i=>nt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,o,i.id,i.kind)).join(""),M.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",l=i.isLoxodromeDriftViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.parallelRadiusExcessU.toFixed(4)}</td>
          <td>${i.parallelRadiusRatio.toFixed(4)}×</td>
          <td>${i.clairautSineAzimuthFactor.toFixed(4)}×</td>
          <td>${i.quadratureSineFactor.toFixed(4)}×</td>
          <td class="${l}">${i.clairautInvariantRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__CLAIRAUT_GEODESIC_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in f&&(d=a,c=f[d].defaultStationIndex,k(R(d,c)))})});A.addEventListener("input",()=>{c=Number(A.value),k(R(d,c))});M.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(c=Number(a.getAttribute("data-station-row")),k(R(d,c)))});D.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),D.textContent=`Theme: ${b.toUpperCase()}`,k(R(d,c))});k(R(d,c));
