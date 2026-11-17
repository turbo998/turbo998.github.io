import"./modulepreload-polyfill-B5Qt9EMX.js";const v={bouguer_snell_spherical_invariant_lock:{id:"bouguer_snell_spherical_invariant_lock",label:"Bouguer-Snell Spherical Law (n(r) r sinθ = const, Ratio = 1.0000×)",labelZh:"Bouguer-Snell 布格-斯涅尔球面折射定律（n(r) r sinθ = const，不变量比恒锁 1.0000×）",subtitle:"Conserves optical angular momentum p = n(r) r sinθ across concentric planetary shells (n r)/(n₀ r₀) = 1 + u so sinθ ∝ 1/(n r), locking p_active/p_Bouguer = 1.0000× across all 17 stations.",subtitleZh:"在同心球壳行星大气 (n r)/(n₀ r₀) = 1 + u 中严格守恒光学角动量（撞击参数）p = n(r) r sinθ，令天顶角正弦按 1/(1+u) 收缩，在全 17 站恒定锁死不变量比 1.0000×。",useBouguerSphericalLaw:!0,defaultStationIndex:16,badge:"BOUGUER n·r·sinθ LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"球面不变量锁死 · 1.0000×（0/17 漂移站）",description:"Pierre Bouguer (1729) proved from Fermat rotational symmetry that rays in a spherically stratified atmosphere conserve p = n(r) r sinθ rather than planar n(z) sinθ.",descriptionZh:"Pierre Bouguer（1729）由费马原理旋转对称性证明：球面对称行星大气与梯度折射透镜中的光线严格守恒布格撞击参数 p = n(r) r sinθ，而非平面平行板 n(z) sinθ。"},naive_planar_slab_snell_horizon_drift:{id:"naive_planar_slab_snell_horizon_drift",label:"Naive Flat-Earth Planar Snell (n sinθ = const, Drift = 1 + u up to 2.0000×)",labelZh:"朴素平地球平行板斯涅尔（n sinθ = const，光学角动量按 1+u 漂移至 2.0000×）",subtitle:"Drops radial lever arm r/r₀ in concentric shells, inflating optical impact parameter p = n r sinθ by 1 + u to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"在球面行星大气与球形力场透镜中忽略径向力臂因子 r/r₀，使光学撞击参数 p = n r sinθ 在第 4 站漂移至 1.2500×、第 8 站 1.5000×、第 16 站翻倍漂移至 2.0000×。",useBouguerSphericalLaw:!1,defaultStationIndex:16,badge:"HORIZON DRIFT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"地平线漂移 · 最高 2.0000×（16/17 站违背）",description:"Naive planetary sunset and gravitational-lens shaders apply flat-slab Snell law n sinθ = const, causing grazing horizon rays to miss the planet limb or trigger false total internal reflection.",descriptionZh:"朴素行星日落大气与球对称折射着色器直接套用平面平行板公式 n sinθ = const，导致掠射地平线光线偏折角严重失真、日盘扁平率错误或触发虚假全反射。"}},f=17;function D(e){const t=1+Math.max(0,e);return{opticalShellRadiusRatio:t,bouguerSineZenithFactor:1/t}}function G(e,i=64){const a=1/(1+Math.max(0,e)),r=Math.max(2,i%2===0?i:i+1),s=1/r;let n=0+2*a;for(let o=1;o<r;o++){const l=o*s,x=o%2===1?4:2;n+=x*(2*l*a)}return s/3*n}function z(e,i){const t=Math.max(0,Math.min(f-1,e)),a=t/(f-1),r=D(a),s=G(a,64),n=1+a,o=i?1:n;return{index:t,radialLeverExcessU:a,opticalShellRadiusRatio:r.opticalShellRadiusRatio,bouguerSineZenithFactor:r.bouguerSineZenithFactor,quadratureSineFactor:s,bouguerInvariantRatio:o,naivePlanarDriftRatio:n,isInvariantDriftViolation:o>1.0001}}function R(e,i){const t=v[e],a=[];let r=0,s=0;for(let o=0;o<f;o++){const l=z(o,t.useBouguerSphericalLaw);a.push(l),l.isInvariantDriftViolation&&r++;const x=Math.abs(l.bouguerSineZenithFactor-l.quadratureSineFactor);x>s&&(s=x)}const n=i!==void 0?Math.max(0,Math.min(f-1,i)):t.defaultStationIndex;return{presetId:e,useBouguerSphericalLaw:t.useBouguerSphericalLaw,stationCount:f,selectedStation:a[n],stations:a,station4Ratio:a[4].bouguerInvariantRatio,station8Ratio:a[8].bouguerInvariantRatio,station12Ratio:a[12].bouguerInvariantRatio,station16Ratio:a[16].bouguerInvariantRatio,violatedCount:r,maxQuadratureError:s,verdict:r===0?"BOUGUER_SNELL_INVARIANT_LOCKED":"NAIVE_PLANAR_SNELL_INVARIANT_DRIFT"}}function H(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Bouguer-Snell Planetary Limb Optical Bench Plinth"}),i.push({id:"limb-rail-front",kind:"limb_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Bouguer Optical Impact Parameter Rail (p_active/p_B = 1.0000×)"}),i.push({id:"limb-rail-back",kind:"limb_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Concentric Optical Shell Lever Rail ((n·r)/(n₀·r₀) = 1 + u)"});for(const t of e.stations){const a=(t.index-8)*30,r=22*t.opticalShellRadiusRatio,s=44*t.bouguerSineZenithFactor,n=36*t.bouguerInvariantRatio;i.push({id:`spherical-shell-pillar-${t.index}`,kind:"spherical_shell_pillar",stationIndex:t.index,x:a,y:r*.5-8,z:-56,w:14,h:r,d:14,tone:"amber",label:`Station ${t.index} Optical Lever (nr)/(n₀r₀) = ${t.opticalShellRadiusRatio.toFixed(4)}×`}),i.push({id:`bouguer-sine-prism-${t.index}`,kind:"bouguer_sine_prism",stationIndex:t.index,x:a,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useBouguerSphericalLaw?"teal":"slate",label:`Station ${t.index} Zenith Sine sinθ/sinθ₀ = ${t.bouguerSineZenithFactor.toFixed(4)}×`}),i.push({id:`impact-invariant-gauge-${t.index}`,kind:"impact_invariant_gauge",stationIndex:t.index,x:a,y:n*.5-8,z:56,w:Math.min(24,12*t.bouguerInvariantRatio),h:n,d:12,tone:t.isInvariantDriftViolation?"crimson":"teal",label:`Station ${t.index} Invariant Ratio p/p_B = ${t.bouguerInvariantRatio.toFixed(4)}×`})}return i.push({id:"limb-collar-left",kind:"atmospheric_limb_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Inner Surface Tangent Gate (r = 1.000 r₀, p = n₀ r₀ sinθ₀)"}),i.push({id:"limb-collar-right",kind:"atmospheric_limb_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useBouguerSphericalLaw?"teal":"crimson",label:"Outer Exosphere Shell Gate (n·r = 2.000 n₀r₀, sinθ = 0.5 sinθ₀)"}),i.push({id:"noether-bar-top",kind:"noether_ray_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Fermat-Noether Spherical Optical Angular Momentum p = n(r) r sinθ"}),i.push({id:"noether-bar-front",kind:"noether_ray_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useBouguerSphericalLaw?"teal":"crimson",label:"Bouguer Invariant Lock Line (p_active / p_Bouguer = 1.0000×)"}),i}const U=new URLSearchParams(window.location.search),L=U.get("preset"),Q=U.get("theme")==="light"?"light":"dark";let d=L&&L in v?L:"bouguer_snell_spherical_invariant_lock",c=v[d].defaultStationIndex,g=Q;document.documentElement.setAttribute("data-theme",g);const j=document.querySelector("#app");j.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 202 · 212TH DEMO · SPHERICAL ATMOSPHERIC REFRACTION &amp; BOUGUER INVARIANT METROLOGY</span>
        <h1>Bouguer-Snell Spherical Atmospheric Refraction Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Atmospheric Refraction Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="bouguer_snell_spherical_invariant_lock"
      >
        Bouguer-Snell n(r)r·sinθ Law (p/p_B = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_planar_slab_snell_horizon_drift"
      >
        Naive Planar Snell n·sinθ (Drift = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED LEVER (nr)/(n₀r₀) / SINE sinθ/sinθ₀</span>
        <strong id="kpi-lever" class="kpi-value">--</strong>
        <span id="kpi-sine" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BOUGUER INVARIANT RATIO (p / p_Bouguer)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 INVARIANT RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">(nr)/(n₀r₀) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">HORIZON DRIFT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC BOUGUER-SNELL REFRACTION RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Bouguer-Snell spherical atmospheric refraction rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Concentric Shell Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, nr = 2.000 n₀r₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION BOUGUER n·r·sinθ VS PLANAR n·sinθ LEDGER</span>
          <span>p = n(r) r sinθ = const</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>nr / n₀r₀</th>
                <th>sinθ_B/sinθ₀</th>
                <th>Quad sinθ</th>
                <th>p / p_Bouguer</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),A=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-lever"),W=document.querySelector("#kpi-sine"),C=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),y=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),B=document.querySelector("#station-slider"),nt=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),w=document.querySelector("#theme-toggle");function b(e,i,t){const a=(e-t*.55)*.88,r=-i+(e*.18+t*.42)*.55;return[a,r]}function at(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ot(e,i,t,a,r,s,n,o,l,x,P){const u=a*.5,p=r*.5,h=s*.5,O=b(e+u,i-p,t-h),_=b(e+u,i-p,t+h),N=b(e-u,i-p,t+h),T=b(e-u,i+p,t-h),I=b(e+u,i+p,t-h),S=b(e+u,i+p,t+h),$=b(e-u,i+p,t+h),m=at(n,l),E=o?1.8:.7,F=o?"#ffffff":m.stroke,M=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,Z=`${N[0].toFixed(1)},${N[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,V=`${_[0].toFixed(1)},${_[1].toFixed(1)} ${O[0].toFixed(1)},${O[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${x}" data-solid-kind="${P}">
      <polygon points="${Z}" fill="${m.left}" stroke="${F}" stroke-width="${E}" />
      <polygon points="${V}" fill="${m.right}" stroke="${F}" stroke-width="${E}" />
      <polygon points="${M}" fill="${m.top}" stroke="${F}" stroke-width="${E}" />
    </g>
  `}function k(e){const i=v[e.presetId],t=e.selectedStation,a=g==="dark";K.textContent=i.subtitle,A.textContent=i.badge,A.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`nr/n₀r₀ = ${t.opticalShellRadiusRatio.toFixed(4)}× (sinθ_B/sinθ₀ = ${t.bouguerSineZenithFactor.toFixed(4)}×)`,W.textContent=`Quad sinθ = ${t.quadratureSineFactor.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,C.textContent=`${t.bouguerInvariantRatio.toFixed(4)}×`,C.className=`kpi-value ${t.isInvariantDriftViolation?"text-danger":"text-ok"}`,X.textContent=`u = nr/n₀r₀ − 1 = ${t.radialLeverExcessU.toFixed(4)} | p = n(r) r sinθ`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,y.textContent=`${e.violatedCount} / ${e.stationCount}`,y.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,B.value=String(t.index),nt.textContent=`Station ${t.index} (u = ${t.radialLeverExcessU.toFixed(3)}, nr/n₀r₀ = ${t.opticalShellRadiusRatio.toFixed(3)}×, p/p_B = ${t.bouguerInvariantRatio.toFixed(4)}×)`;const r=H(e);et.textContent=`${r.length} solids · ${e.stationCount} stations`;const s=[...r].sort((n,o)=>n.z-o.z||n.y-o.y||n.x-o.x);it.innerHTML=s.map(n=>ot(n.x,n.y,n.z,n.w,n.h,n.d,n.tone,n.stationIndex===t.index,a,n.id,n.kind)).join(""),q.innerHTML=e.stations.map(n=>{const o=n.index===t.index?"row-selected":"",l=n.isInvariantDriftViolation?"cell-fail":"cell-pass";return`
        <tr class="${o}" data-station-row="${n.index}">
          <td>#${n.index}</td>
          <td>${n.radialLeverExcessU.toFixed(4)}</td>
          <td>${n.opticalShellRadiusRatio.toFixed(4)}×</td>
          <td>${n.bouguerSineZenithFactor.toFixed(4)}×</td>
          <td>${n.quadratureSineFactor.toFixed(4)}×</td>
          <td class="${l}">${n.bouguerInvariantRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(n=>{const o=n.getAttribute("data-preset");n.classList.toggle("active",o===e.presetId)}),window.__BOUGUER_SNELL_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in v&&(d=i,c=v[d].defaultStationIndex,k(R(d,c)))})});B.addEventListener("input",()=>{c=Number(B.value),k(R(d,c))});q.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),k(R(d,c)))});w.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),w.textContent=`Theme: ${g.toUpperCase()}`,k(R(d,c))});k(R(d,c));
