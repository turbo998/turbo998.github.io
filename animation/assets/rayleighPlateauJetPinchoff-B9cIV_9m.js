import"./modulepreload-polyfill-B5Qt9EMX.js";const T=.697,x={rayleigh_plateau_bessel_dispersion_lock:{id:"rayleigh_plateau_bessel_dispersion_lock",label:"Rayleigh-Plateau Dispersion Law (λ* = 9.015 R, k*R = 0.6970, Ratio = 1.0000×)",labelZh:"Rayleigh-Plateau 瑞利-普拉托毛细掐断定律（λ* = 9.015 R, k*R = 0.6970，波长比恒锁 1.0000×）",subtitle:"Scales droplet pinch-off wavelength linearly with liquid jet radius R(u) = R₀(1+u) to maintain fastest-growing mode k*R = 0.6970 < 1, locking λ_RP/λ_model = 1.0000× across all 17 stations.",subtitleZh:"令水柱掐断波长随液流半径 R(u) = R₀(1+u) 按 λ* = 9.015 R 线性放大以恒定维持最快增长模态 k*R = 0.6970 < 1，在全 17 站恒定锁死波长比 λ_RP/λ_model = 1.0000×。",useRayleighPlateauScaling:!0,defaultStationIndex:16,badge:"RAYLEIGH k*R=0.697 LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"瑞利掐断锁死 · 1.0000×（0/17 违背站）",description:"Joseph Plateau (1873) and Lord Rayleigh (1878) proved via modified Bessel dispersion I₁(kR)/I₀(kR) that cylindrical jets pinch into droplets only for kR < 1, peaking at k*R = 0.6970 (λ* ≈ 9.015 R).",descriptionZh:"Joseph Plateau（1873）与 Lord Rayleigh（1878）通过修正贝塞尔色散方程证明：圆柱水柱仅在长波区 kR < 1（λ > 2πR）才能释放表面能掐断成水滴，最快增长波长为 λ* ≈ 9.015 R（k*R = 0.6970）。"},naive_fixed_wavelength_shortwave_pinch:{id:"naive_fixed_wavelength_shortwave_pinch",label:"Naive Fixed-Wavelength Sine Pinch (λ = λ₀, Deficit = 1 + u up to 2.0000×)",labelZh:"朴素固定波长正弦捏缩（λ = λ₀，粗水柱水滴间距按 1+u 亏损至 2.0000×）",subtitle:"Applies hardcoded spatial wave sin(k₀ z) regardless of jet radius R = R₀(1+u), underestimating droplet spacing by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× (kR=1.394 > 1 forbidden!) at St 16.",subtitleZh:"无视水柱粗细 R = R₀(1+u) 强行套用固定空间频率 sin(k₀ z)，使水滴掐断波长在第 4 站亏损 1.2500×、第 8 站亏损 1.5000×、第 16 站（两倍水柱半径，kR=1.394 > 1 进入物理禁区）翻倍亏损至 2.0000×。",useRayleighPlateauScaling:!1,defaultStationIndex:16,badge:"SHORTWAVE VIOLATION · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"短波禁区 · 最高 2.0000×（16/17 站违背）",description:"Naive water-stream and faucet shaders pinch cylinders with a fixed world-space sine frequency k₀, turning thick jets into unnatural accordion beads in the kR > 1 capillary-stable regime.",descriptionZh:"朴素水流与水龙头着色器用固定世界坐标正弦频率 k₀ 捏缩水柱，导致粗水柱落入 kR > 1 的表面面积反增禁区，变成像手风琴或糖葫芦一样的假密珠串。"}},k=17;function j(e){const t=1+Math.max(0,e);return{jetRadiusRatio:t,rayleighWavelengthRatio:t}}function G(e,i=64){const o=1+Math.max(0,e),s=Math.max(2,i%2===0?i:i+1),l=1/s;let a=0+3*o;for(let n=1;n<s;n++){const d=n*l,b=n%2===1?4:2;a+=b*(3*o*d*d)}return l/3*a}function z(e,i){const t=Math.max(0,Math.min(k-1,e)),o=t/(k-1),s=j(o),l=G(o,64),a=1+o,n=i?1:a,d=i?T:T*(1+o);return{index:t,radiusExcessU:o,jetRadiusRatio:s.jetRadiusRatio,rayleighWavelengthRatio:s.rayleighWavelengthRatio,activeDimensionlessWavenumber:d,quadratureWavelengthRatio:l,wavelengthDeficitRatio:n,naiveDeficitRatio:a,isWavelengthDeficitViolation:n>1.0001}}function v(e,i){const t=x[e],o=[];let s=0,l=0;for(let n=0;n<k;n++){const d=z(n,t.useRayleighPlateauScaling);o.push(d),d.isWavelengthDeficitViolation&&s++;const b=Math.abs(d.rayleighWavelengthRatio-d.quadratureWavelengthRatio);b>l&&(l=b)}const a=i!==void 0?Math.max(0,Math.min(k-1,i)):t.defaultStationIndex;return{presetId:e,useRayleighPlateauScaling:t.useRayleighPlateauScaling,stationCount:k,selectedStation:o[a],stations:o,station4Ratio:o[4].wavelengthDeficitRatio,station8Ratio:o[8].wavelengthDeficitRatio,station12Ratio:o[12].wavelengthDeficitRatio,station16Ratio:o[16].wavelengthDeficitRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"RAYLEIGH_PLATEAU_PINCHOFF_LOCKED":"NAIVE_FIXED_WAVELENGTH_PINCH_DEFICIT"}}function J(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Rayleigh-Plateau Capillary Jet Plinth"}),i.push({id:"capillary-rail-front",kind:"capillary_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Rayleigh Fastest-Growing Mode Rail (λ_RP / λ_model = 1.0000×)"}),i.push({id:"capillary-rail-back",kind:"capillary_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Cylindrical Jet Radius Rail (R / R₀ = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.jetRadiusRatio,l=26*t.rayleighWavelengthRatio,a=36*t.wavelengthDeficitRatio;i.push({id:`jet-column-cylinder-${t.index}`,kind:"jet_column_cylinder",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Jet Radius R/R₀ = ${t.jetRadiusRatio.toFixed(4)}×`}),i.push({id:`rayleigh-droplet-lobe-${t.index}`,kind:"rayleigh_droplet_lobe",stationIndex:t.index,x:o,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useRayleighPlateauScaling?"teal":"slate",label:`Station ${t.index} Optimal Wavelength λ*/λ₀ = ${t.rayleighWavelengthRatio.toFixed(4)}×`}),i.push({id:`wavelength-deficit-gauge-${t.index}`,kind:"wavelength_deficit_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.wavelengthDeficitRatio),h:a,d:12,tone:t.isWavelengthDeficitViolation?"crimson":"teal",label:`Station ${t.index} Deficit Ratio λ_RP/λ = ${t.wavelengthDeficitRatio.toFixed(4)}×`})}return i.push({id:"nozzle-collar-left",kind:"nozzle_orifice_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Fine Jet Gate (R = 1.000 R₀, k*R = 0.6970)"}),i.push({id:"nozzle-collar-right",kind:"nozzle_orifice_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useRayleighPlateauScaling?"teal":"crimson",label:"Thick Jet Gate (R = 2.000 R₀, λ* = 2.000 λ₀)"}),i.push({id:"plateau-bar-top",kind:"plateau_cutoff_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Plateau Stability Cutoff kR < 1.0 (λ > 2πR ≈ 6.283R)"}),i.push({id:"plateau-bar-front",kind:"plateau_cutoff_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useRayleighPlateauScaling?"teal":"crimson",label:"Rayleigh Optimal Pinch Lock Line (λ_RP / λ_model = 1.0000×)"}),i}const N=new URLSearchParams(window.location.search),P=N.get("preset"),Y=N.get("theme")==="light"?"light":"dark";let r=P&&P in x?P:"rayleigh_plateau_bessel_dispersion_lock",c=x[r].defaultStationIndex,R=Y;document.documentElement.setAttribute("data-theme",R);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 201 · 211TH DEMO · CAPILLARY LIQUID JET BREAKUP &amp; DROPLET PINCH-OFF METROLOGY</span>
        <h1>Rayleigh-Plateau Cylindrical Liquid Jet Pinch-Off Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${R.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Jet Pinch-Off Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="rayleigh_plateau_bessel_dispersion_lock"
      >
        Rayleigh-Plateau λ* = 9.015R Law (λ_RP/λ = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_fixed_wavelength_shortwave_pinch"
      >
        Naive Fixed-Wavelength Pinch (Deficit = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED JET RADIUS R/R₀ / WAVENUMBER kR</span>
        <strong id="kpi-radius" class="kpi-value">--</strong>
        <span id="kpi-wavelength" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">WAVELENGTH RATIO (λ_RP / λ_model)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 WAVELENGTH RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">R/R₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PINCH-OFF DEFICIT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC RAYLEIGH-PLATEAU JET PINCH-OFF RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Rayleigh-Plateau cylindrical liquid jet pinch-off rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Jet Radius Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, R = 2.000 R₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION RAYLEIGH λ* = 9.015R VS FIXED-WAVELENGTH LEDGER</span>
          <span>k*R = 0.6970 &lt; 1</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>R / R₀</th>
                <th>λ_RP / λ₀</th>
                <th>Active kR</th>
                <th>λ_RP / λ</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const B=document.querySelector("#preset-subtitle"),C=document.querySelector("#preset-badge"),K=document.querySelector("#kpi-radius"),Q=document.querySelector("#kpi-wavelength"),D=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),O=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),m=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),W=document.querySelector("#theme-toggle");function g(e,i,t){const o=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[o,s]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,i,t,o,s,l,a,n,d,b,H){const u=o*.5,p=s*.5,h=l*.5,w=g(e+u,i-p,t-h),E=g(e+u,i-p,t+h),A=g(e-u,i-p,t+h),L=g(e-u,i+p,t-h),$=g(e+u,i+p,t-h),f=g(e+u,i+p,t+h),y=g(e-u,i+p,t+h),S=nt(a,d),I=n?1.8:.7,F=n?"#ffffff":S.stroke,M=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)}`,U=`${A[0].toFixed(1)},${A[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)}`,V=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${b}" data-solid-kind="${H}">
      <polygon points="${U}" fill="${S.left}" stroke="${F}" stroke-width="${I}" />
      <polygon points="${V}" fill="${S.right}" stroke="${F}" stroke-width="${I}" />
      <polygon points="${M}" fill="${S.top}" stroke="${F}" stroke-width="${I}" />
    </g>
  `}function _(e){const i=x[e.presetId],t=e.selectedStation,o=R==="dark";B.textContent=i.subtitle,C.textContent=i.badge,C.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,K.textContent=`R/R₀ = ${t.jetRadiusRatio.toFixed(4)}× (kR = ${t.activeDimensionlessWavenumber.toFixed(4)})`,Q.textContent=`λ_RP/λ₀ = ${t.rayleighWavelengthRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,D.textContent=`${t.wavelengthDeficitRatio.toFixed(4)}×`,D.className=`kpi-value ${t.isWavelengthDeficitViolation?"text-danger":"text-ok"}`,X.textContent=`u = R/R₀ − 1 = ${t.radiusExcessU.toFixed(4)} | λ* = 9.015 R`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,O.textContent=`${e.violatedCount} / ${e.stationCount}`,O.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,m.value=String(t.index),ot.textContent=`Station ${t.index} (u = ${t.radiusExcessU.toFixed(3)}, R/R₀ = ${t.jetRadiusRatio.toFixed(3)}×, λ_RP/λ = ${t.wavelengthDeficitRatio.toFixed(4)}×)`;const s=J(e);it.textContent=`${s.length} solids · ${e.stationCount} stations`;const l=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);at.innerHTML=l.map(a=>st(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),q.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",d=a.isWavelengthDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.radiusExcessU.toFixed(4)}</td>
          <td>${a.jetRadiusRatio.toFixed(4)}×</td>
          <td>${a.rayleighWavelengthRatio.toFixed(4)}×</td>
          <td>${a.activeDimensionlessWavenumber.toFixed(4)}</td>
          <td class="${d}">${a.wavelengthDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__RAYLEIGH_PLATEAU_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in x&&(r=i,c=x[r].defaultStationIndex,_(v(r,c)))})});m.addEventListener("input",()=>{c=Number(m.value),_(v(r,c))});q.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),_(v(r,c)))});W.addEventListener("click",()=>{R=R==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",R),W.textContent=`Theme: ${R.toUpperCase()}`,_(v(r,c))});_(v(r,c));
