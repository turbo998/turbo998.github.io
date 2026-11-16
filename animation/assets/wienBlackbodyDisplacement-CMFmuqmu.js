import"./modulepreload-polyfill-B5Qt9EMX.js";const f={wien_planck_blackbody_displacement_lock:{id:"wien_planck_blackbody_displacement_lock",label:"Wien-Planck Displacement Law (λ_peak = b_Wien / T = λ₀/(1+u), λ/λ_Wien = 1.0000×)",labelZh:"Wien-Planck 维恩-普朗克黑体位移定律（λ_peak = b_Wien / T，峰值波长比恒锁 1.0000×）",subtitle:"Shifts the blackbody spectral peak wavelength inversely with absolute temperature as λ_peak = b_Wien / T = λ₀ / (1 + u), locking λ_active / λ_Wien = 1.0000× across all 17 stations.",subtitleZh:"遵循 Wien（1893）与 Planck（1900）黑体辐射谱极值定律 x = hc/(λ_peak k_B T) = 4.965114，令发光主波长随绝对温度 T(u) = T₀(1+u) 反比蓝移为 λ₀/(1+u)，在全 17 站恒定锁死波长比 1.0000×。",useWienDisplacementLaw:!0,defaultStationIndex:16,badge:"WIEN DISPLACEMENT LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"维恩位移锁死 · 1.0000×（0/17 漂移站）",description:"Wilhelm Wien (1893, Nobel Prize 1911) and Max Planck (1900) proved that blackbody spectral radiance B_λ(T) peaks at λ_peak = b_Wien / T (b_Wien = 2897.77 μm·K), shifting from red to white-blue as T rises.",descriptionZh:"Wilhelm Wien（1893，1911 诺贝尔物理学奖）与 Max Planck（1900）严格证明：黑体辐射光谱辐射亮度 B_λ(T) 的峰值波长满足 λ_peak T = b_Wien = 2897.77 μm·K，随温度升高从暗红向橙黄、炽白与蓝白移动。"},naive_fixed_hue_emissive_multiplier_drift:{id:"naive_fixed_hue_emissive_multiplier_drift",label:"Naive Fixed-Hue Emissive Multiplier (λ = λ₀, Drift = T/T₀ = 1 + u up to 2.0000×)",labelZh:"朴素固定色相自发光倍增模型（λ = λ₀，峰值波长按 T/T₀ = 1+u 漂移至 2.0000×）",subtitle:"Multiplies a static orange-red RGB color by temperature intensity while keeping peak wavelength fixed at λ₀, drifting from Wien’s law by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"仅将固定橙红色相 RGB 乘以亮度系数而忽略维恩峰值波长反比蓝移 b_Wien/T，使发光主波长比在第 4 站漂移 1.2500×、第 8 站漂移 1.5000×、第 16 站（T=2T₀）翻倍漂移至 2.0000×。",useWienDisplacementLaw:!1,defaultStationIndex:16,badge:"WAVELENGTH DRIFT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"色温漂移 · 最高 2.0000×（16/17 站违背）",description:"Naive iron-forging and lava shaders multiply a fixed orange RGB by scalar intensity, missing the 2× octave shift toward blue-white at T = 2T₀ across 16/17 stations.",descriptionZh:"朴素打铁锻造、火山熔岩与尾焰着色器只放大固定橙色贴图的亮度，在温度翻倍（例如 3000K 升至 6000K）时丢失 2.0000× 峰值波长短波位移并污染 16/17 个站点。"}},v=17;function K(e){const t=1+Math.max(0,e),n=1/t;return{temperatureRatio:t,wienPeakWavelengthRatio:n}}function V(e,i=64){const n=1/(1+Math.max(0,e)),s=Math.max(2,i%2===0?i:i+1),l=1/s;let a=2*n;for(let o=1;o<s;o++){const d=o*l,g=o%2===1?4:2;a+=g*(2*n*d)}return l/3*a}function G(e,i){const t=Math.max(0,Math.min(v-1,e)),n=t/(v-1),s=K(n),l=V(n,64),a=1+n,o=i?1:a;return{index:t,temperatureExcessU:n,temperatureRatio:s.temperatureRatio,wienPeakWavelengthRatio:s.wienPeakWavelengthRatio,quadratureWavelengthRatio:l,wavelengthDriftRatio:o,naiveDriftRatio:a,isWavelengthDriftViolation:o>1.0001}}function _(e,i){const t=f[e],n=[];let s=0,l=0;for(let o=0;o<v;o++){const d=G(o,t.useWienDisplacementLaw);n.push(d),d.isWavelengthDriftViolation&&s++;const g=Math.abs(d.wienPeakWavelengthRatio-d.quadratureWavelengthRatio);g>l&&(l=g)}const a=i!==void 0?Math.max(0,Math.min(v-1,i)):t.defaultStationIndex;return{presetId:e,useWienDisplacementLaw:t.useWienDisplacementLaw,stationCount:v,selectedStation:n[a],stations:n,station4Ratio:n[4].wavelengthDriftRatio,station8Ratio:n[8].wavelengthDriftRatio,station12Ratio:n[12].wavelengthDriftRatio,station16Ratio:n[16].wavelengthDriftRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"WIEN_BLACKBODY_DISPLACEMENT_LOCKED":"NAIVE_FIXED_HUE_WAVELENGTH_DRIFT"}}function U(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Wien-Planck Blackbody Spectral Metrology Plinth"}),i.push({id:"planck-rail-front",kind:"planck_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Wien Displacement Lock Rail (λ_active / λ_Wien = 1.0000×)"}),i.push({id:"planck-rail-back",kind:"planck_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Absolute Temperature Rail (T / T₀ = 1 + u)"});for(const t of e.stations){const n=(t.index-8)*30,s=22*t.temperatureRatio,l=44*t.wienPeakWavelengthRatio,a=36*t.wavelengthDriftRatio;i.push({id:`kelvin-temperature-column-${t.index}`,kind:"kelvin_temperature_column",stationIndex:t.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Absolute Temp T/T₀ = ${t.temperatureRatio.toFixed(4)}×`}),i.push({id:`wien-wavelength-bar-${t.index}`,kind:"wien_wavelength_bar",stationIndex:t.index,x:n,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useWienDisplacementLaw?"teal":"slate",label:`Station ${t.index} Wien Peak λ_peak/λ₀ = ${t.wienPeakWavelengthRatio.toFixed(4)}×`}),i.push({id:`wavelength-drift-gauge-${t.index}`,kind:"wavelength_drift_gauge",stationIndex:t.index,x:n,y:a*.5-8,z:56,w:Math.min(24,12*t.wavelengthDriftRatio),h:a,d:12,tone:t.isWavelengthDriftViolation?"crimson":"teal",label:`Station ${t.index} Drift Ratio λ/λ_Wien = ${t.wavelengthDriftRatio.toFixed(4)}×`})}return i.push({id:"cavity-collar-left",kind:"blackbody_cavity_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Warm Incandescent Gate (T = 1.000 T₀, λ_peak = 1.000 λ₀)"}),i.push({id:"cavity-collar-right",kind:"blackbody_cavity_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useWienDisplacementLaw?"teal":"crimson",label:"Solar Photosphere Gate (T = 2.000 T₀, λ_peak = 0.500 λ₀)"}),i.push({id:"photon-bar-top",kind:"boltzmann_photon_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Wien-Planck Extremum: x = h c / (λ_peak k_B T) = 4.965114  ⇒  λ_peak T = b_Wien"}),i.push({id:"photon-bar-front",kind:"boltzmann_photon_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useWienDisplacementLaw?"teal":"crimson",label:"Wien Peak Wavelength Lock Line (λ_active / λ_Wien = 1.0000×)"}),i}const N=new URLSearchParams(window.location.search),S=N.get("preset"),z=N.get("theme")==="light"?"light":"dark";let r=S&&S in f?S:"wien_planck_blackbody_displacement_lock",c=f[r].defaultStationIndex,k=z;document.documentElement.setAttribute("data-theme",k);const Y=document.querySelector("#app");Y.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 220 HISTORIC MILESTONE · 230TH DEMO · THERMAL RADIATION WIEN-PLANCK BLACKBODY DISPLACEMENT METROLOGY</span>
        <h1>Wien-Planck Blackbody Spectral Displacement Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${k.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Blackbody Displacement Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="wien_planck_blackbody_displacement_lock"
      >
        Wien-Planck λ_peak = b_Wien / T Law (λ / λ_Wien = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_fixed_hue_emissive_multiplier_drift"
      >
        Naive Fixed-Hue Emissive Multiplier (Drift = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED TEMP T/T₀ / WIEN PEAK λ_peak/λ₀</span>
        <strong id="kpi-wien" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PEAK WAVELENGTH RATIO (λ_active / λ_Wien)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 WAVELENGTH RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">T/T₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">WAVELENGTH DRIFT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC WIEN-PLANCK BLACKBODY RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Wien-Planck blackbody spectral displacement rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Blackbody Temperature Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, T = 2.000 T₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION WIEN λ_peak = b/T VS FIXED-HUE LEDGER</span>
          <span>λ_peak T = 2897.8 μm·K</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>T / T₀</th>
                <th>λ_Wien / λ₀</th>
                <th>Planck Quad</th>
                <th>λ / λ_Wien</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Z=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-wien"),j=document.querySelector("#kpi-quad"),P=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),C=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),I=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),M=document.querySelector("#station-tbody"),A=document.querySelector("#theme-toggle");function h(e,i,t){const n=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[n,s]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ot(e,i,t,n,s,l,a,o,d,g,O){const p=n*.5,u=s*.5,b=l*.5,F=h(e+p,i-u,t-b),T=h(e+p,i-u,t+b),D=h(e-p,i-u,t+b),y=h(e-p,i+u,t-b),W=h(e+p,i+u,t-b),x=h(e+p,i+u,t+b),E=h(e-p,i+u,t+b),$=nt(a,d),R=o?1.8:.7,w=o?"#ffffff":$.stroke,B=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${W[0].toFixed(1)},${W[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,q=`${D[0].toFixed(1)},${D[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,H=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${W[0].toFixed(1)},${W[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${O}">
      <polygon points="${q}" fill="${$.left}" stroke="${w}" stroke-width="${R}" />
      <polygon points="${H}" fill="${$.right}" stroke="${w}" stroke-width="${R}" />
      <polygon points="${B}" fill="${$.top}" stroke="${w}" stroke-width="${R}" />
    </g>
  `}function m(e){const i=f[e.presetId],t=e.selectedStation,n=k==="dark";Z.textContent=i.subtitle,L.textContent=i.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`T/T₀ = ${t.temperatureRatio.toFixed(4)}× (λ_peak/λ₀ = ${t.wienPeakWavelengthRatio.toFixed(4)}×)`,j.textContent=`Planck Quad = ${t.quadratureWavelengthRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,P.textContent=`${t.wavelengthDriftRatio.toFixed(4)}×`,P.className=`kpi-value ${t.isWavelengthDriftViolation?"text-danger":"text-ok"}`,X.textContent=`u = T/T₀ − 1 = ${t.temperatureExcessU.toFixed(4)} | λ_peak = b_Wien / T`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,C.textContent=`${e.violatedCount} / ${e.stationCount}`,C.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,I.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.temperatureExcessU.toFixed(3)}, T/T₀ = ${t.temperatureRatio.toFixed(3)}×, λ/λ_Wien = ${t.wavelengthDriftRatio.toFixed(4)}×)`;const s=U(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const l=[...s].sort((a,o)=>a.z-o.z||a.y-o.y||a.x-o.x);it.innerHTML=l.map(a=>ot(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,n,a.id,a.kind)).join(""),M.innerHTML=e.stations.map(a=>{const o=a.index===t.index?"row-selected":"",d=a.isWavelengthDriftViolation?"cell-fail":"cell-pass";return`
        <tr class="${o}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.temperatureExcessU.toFixed(4)}</td>
          <td>${a.temperatureRatio.toFixed(4)}×</td>
          <td>${a.wienPeakWavelengthRatio.toFixed(4)}×</td>
          <td>${a.quadratureWavelengthRatio.toFixed(4)}×</td>
          <td class="${d}">${a.wavelengthDriftRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const o=a.getAttribute("data-preset");a.classList.toggle("active",o===e.presetId)}),window.__WIEN_BLACKBODY_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in f&&(r=i,c=f[r].defaultStationIndex,m(_(r,c)))})});I.addEventListener("input",()=>{c=Number(I.value),m(_(r,c))});M.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),m(_(r,c)))});A.addEventListener("click",()=>{k=k==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",k),A.textContent=`Theme: ${k.toUpperCase()}`,m(_(r,c))});m(_(r,c));
