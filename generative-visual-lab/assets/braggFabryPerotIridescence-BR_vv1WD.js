import"./modulepreload-polyfill-B5Qt9EMX.js";const x={bragg_fabry_perot_cosine_blueshift_lock:{id:"bragg_fabry_perot_cosine_blueshift_lock",label:"Bragg-Fabry-Pérot Cosine Blue-Shift Law (Δ = 2n_fd cosθ_t, λ/λ_Bragg = 1.0000×)",labelZh:"Bragg-Fabry-Pérot 布拉格-法布里-珀罗薄膜余弦蓝移定律（Δ = 2n_fd cosθ_t，波长比恒锁 1.0000×）",subtitle:"Shifts the constructive interference peak wavelength toward shorter wavelengths as λ_peak = λ₀ cosθ_t = λ₀ / (1 + u), locking λ_active / λ_Bragg = 1.0000× across all 17 stations.",subtitleZh:"遵循 Fabry-Pérot（1899）与 Bragg（1913）薄膜光程差定律 Δ_OPD = 2 n_f d cosθ_t，令相干加强峰值波长随倾斜角余弦按 λ₀/(1+u) 向短波蓝移，在全 17 站恒定锁死波长比 1.0000×。",useBraggCosineLaw:!0,defaultStationIndex:16,badge:"BRAGG BLUE-SHIFT LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"布拉格蓝移锁死 · 1.0000×（0/17 漂移站）",description:"Thomas Young (1801), Charles Fabry & Alfred Pérot (1899), and W. L. Bragg (1913) proved that thin-film optical path difference is Δ = 2 n_f d cosθ_t, blue-shifting constructive peaks as cosθ_t.",descriptionZh:"Young（1801）、Fabry & Pérot（1899）与 Bragg（1913）严格证明：薄膜双光束与多光束干涉的垂直波矢相位光程差为 Δ = 2 n_f d cosθ_t，倾斜观察时相干主峰必然按 cosθ_t 发生短波蓝移。"},naive_angle_invariant_tint_redshift_error:{id:"naive_angle_invariant_tint_redshift_error",label:"Naive Angle-Invariant Metallic Tint (λ = λ₀, Drift = secθ_t = 1 + u up to 2.0000×)",labelZh:"朴素视角无关固定金属染色（λ = λ₀，峰值波长按 secθ_t = 1+u 漂移至 2.0000×）",subtitle:"Fixes the iridescent peak wavelength at normal-incidence λ₀ regardless of internal angle θ_t, overestimating peak wavelength by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"忽略薄膜内部折射角余弦因子 cosθ_t 对垂直波矢 k_z 的缩减，将虹彩波长写死在法向 λ₀，使峰值波长比在第 4 站漂移 1.2500×、第 8 站漂移 1.5000×、第 16 站（θ_t=60°）翻倍漂移至 2.0000×。",useBraggCosineLaw:!1,defaultStationIndex:16,badge:"WAVELENGTH DRIFT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"波长漂移 · 最高 2.0000×（16/17 站违背）",description:"Naive RGB tint shaders apply a static color ramp or wrongly divide by cosθ_t, missing the 2× octave blue-shift at θ_t = 60° across 16/17 stations.",descriptionZh:"朴素金属贴图染色着色器使用固定颜色或错误地除以 cosθ_t（把几何斜边当成相位光程差），彻底丢失 θ_t = 60° 时的八度倍频蓝移并污染 16/17 个站点。"}},f=17;function V(e){const t=1+Math.max(0,e),o=1/t;return{secantRatio:t,braggWavelengthRatio:o}}function H(e,a=64){const o=1/(1+Math.max(0,e)),s=Math.max(2,a%2===0?a:a+1),r=1/s;let i=2*o;for(let n=1;n<s;n++){const l=n*r,_=n%2===1?4:2;i+=_*(2*o*l)}return r/3*i}function U(e,a){const t=Math.max(0,Math.min(f-1,e)),o=t/(f-1),s=V(o),r=H(o,64),i=1+o,n=a?1:i;return{index:t,secantObliquityExcessU:o,secantRatio:s.secantRatio,braggWavelengthRatio:s.braggWavelengthRatio,quadratureWavelengthRatio:r,wavelengthOverestimateRatio:n,naiveOverestimateRatio:i,isWavelengthDriftViolation:n>1.0001}}function k(e,a){const t=x[e],o=[];let s=0,r=0;for(let n=0;n<f;n++){const l=U(n,t.useBraggCosineLaw);o.push(l),l.isWavelengthDriftViolation&&s++;const _=Math.abs(l.braggWavelengthRatio-l.quadratureWavelengthRatio);_>r&&(r=_)}const i=a!==void 0?Math.max(0,Math.min(f-1,a)):t.defaultStationIndex;return{presetId:e,useBraggCosineLaw:t.useBraggCosineLaw,stationCount:f,selectedStation:o[i],stations:o,station4Ratio:o[4].wavelengthOverestimateRatio,station8Ratio:o[8].wavelengthOverestimateRatio,station12Ratio:o[12].wavelengthOverestimateRatio,station16Ratio:o[16].wavelengthOverestimateRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"BRAGG_FABRY_PEROT_BLUESHIFT_LOCKED":"NAIVE_ANGLE_INVARIANT_WAVELENGTH_DRIFT"}}function Y(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Bragg-Fabry-Pérot Thin-Film Etalon Metrology Plinth"}),a.push({id:"etalon-rail-front",kind:"etalon_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Bragg Cosine Blue-Shift Lock Rail (λ_active / λ_Bragg = 1.0000×)"}),a.push({id:"etalon-rail-back",kind:"etalon_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Secant Obliquity Rail (secθ_t = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.secantRatio,r=44*t.braggWavelengthRatio,i=36*t.wavelengthOverestimateRatio;a.push({id:`secant-obliquity-column-${t.index}`,kind:"secant_obliquity_column",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Secant secθ_t = ${t.secantRatio.toFixed(4)}×`}),a.push({id:`bragg-wavelength-prism-${t.index}`,kind:"bragg_wavelength_prism",stationIndex:t.index,x:o,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useBraggCosineLaw?"teal":"slate",label:`Station ${t.index} Bragg Peak λ_peak/λ₀ = ${t.braggWavelengthRatio.toFixed(4)}×`}),a.push({id:`wavelength-error-gauge-${t.index}`,kind:"wavelength_error_gauge",stationIndex:t.index,x:o,y:i*.5-8,z:56,w:Math.min(24,12*t.wavelengthOverestimateRatio),h:i,d:12,tone:t.isWavelengthDriftViolation?"crimson":"teal",label:`Station ${t.index} Wavelength Ratio λ/λ_Bragg = ${t.wavelengthOverestimateRatio.toFixed(4)}×`})}return a.push({id:"mirror-collar-left",kind:"dichroic_mirror_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Normal Incidence Cavity Gate (θ_t = 0°, cosθ_t = 1.000, λ = 1.000 λ₀)"}),a.push({id:"mirror-collar-right",kind:"dichroic_mirror_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useBraggCosineLaw?"teal":"crimson",label:"Oblique 60° Cavity Gate (θ_t = 60°, cosθ_t = 0.500, λ = 0.500 λ₀)"}),a.push({id:"phase-bar-top",kind:"fabry_perot_phase_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Fabry-Pérot Normal Wavevector Phase: Δ_OPD = 2 n_f d cosθ_t = m λ_peak"}),a.push({id:"phase-bar-front",kind:"fabry_perot_phase_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useBraggCosineLaw?"teal":"crimson",label:"Bragg Cosine Blue-Shift Lock Line (λ_active / λ_Bragg = 1.0000×)"}),a}const q=new URLSearchParams(window.location.search),T=q.get("preset"),z=q.get("theme")==="light"?"light":"dark";let d=T&&T in x?T:"bragg_fabry_perot_cosine_blueshift_lock",c=x[d].defaultStationIndex,b=z;document.documentElement.setAttribute("data-theme",b);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 210 HISTORIC MILESTONE · 220TH DEMO · THIN-FILM OPTICS BRAGG-FABRY-PÉROT COSINE BLUE-SHIFT METROLOGY</span>
        <h1>Bragg-Fabry-Pérot Thin-Film Iridescence Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Thin-Film Iridescence Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="bragg_fabry_perot_cosine_blueshift_lock"
      >
        Bragg-Fabry-Pérot Δ = 2n_fd cosθ_t Law (λ / λ_Bragg = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_angle_invariant_tint_redshift_error"
      >
        Naive Angle-Invariant Tint (Drift = secθ_t = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED SECANT secθ_t / BRAGG PEAK λ/λ₀</span>
        <strong id="kpi-peak" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">WAVELENGTH RATIO (λ_active / λ_Bragg)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 WAVELENGTH RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">secθ_t = 1.250 / 1.500 / 2.000</span>
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
          <span>58-SOLID 17-STATION ISOMETRIC BRAGG-FABRY-PÉROT IRIDESCENCE RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Bragg-Fabry-Perot thin-film iridescence rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Secant Obliquity Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, cosθ_t = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION BRAGG Δ = 2n_fd cosθ_t VS STATIC TINT LEDGER</span>
          <span>λ_peak = λ₀ cosθ_t</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>secθ_t</th>
                <th>λ_Bragg / λ₀</th>
                <th>k_z Quad</th>
                <th>λ / λ_Bragg</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),O=document.querySelector("#preset-badge"),K=document.querySelector("#kpi-peak"),j=document.querySelector("#kpi-quad"),A=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),L=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),B=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),N=document.querySelector("#station-tbody"),P=document.querySelector("#theme-toggle");function h(e,a,t){const o=(e-t*.55)*.88,s=-a+(e*.18+t*.42)*.55;return[o,s]}function ot(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,a,t,o,s,r,i,n,l,_,G){const g=o*.5,u=s*.5,p=r*.5,y=h(e+g,a-u,t-p),F=h(e+g,a-u,t+p),w=h(e-g,a-u,t+p),C=h(e-g,a+u,t-p),$=h(e+g,a+u,t-p),v=h(e+g,a+u,t+p),m=h(e-g,a+u,t+p),E=ot(i,l),S=n?1.8:.7,I=n?"#ffffff":E.stroke,W=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,M=`${w[0].toFixed(1)},${w[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,D=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${_}" data-solid-kind="${G}">
      <polygon points="${M}" fill="${E.left}" stroke="${I}" stroke-width="${S}" />
      <polygon points="${D}" fill="${E.right}" stroke="${I}" stroke-width="${S}" />
      <polygon points="${W}" fill="${E.top}" stroke="${I}" stroke-width="${S}" />
    </g>
  `}function R(e){const a=x[e.presetId],t=e.selectedStation,o=b==="dark";Q.textContent=a.subtitle,O.textContent=a.badge,O.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,K.textContent=`secθ_t = ${t.secantRatio.toFixed(4)}× (λ_peak/λ₀ = ${t.braggWavelengthRatio.toFixed(4)}×)`,j.textContent=`k_z Quad = ${t.quadratureWavelengthRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,A.textContent=`${t.wavelengthOverestimateRatio.toFixed(4)}×`,A.className=`kpi-value ${t.isWavelengthDriftViolation?"text-danger":"text-ok"}`,X.textContent=`u = secθ_t − 1 = ${t.secantObliquityExcessU.toFixed(4)} | Δ = 2n_fd cosθ_t`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,L.textContent=`${e.violatedCount} / ${e.stationCount}`,L.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,B.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.secantObliquityExcessU.toFixed(3)}, cosθ_t = ${t.braggWavelengthRatio.toFixed(3)}, λ/λ_Bragg = ${t.wavelengthOverestimateRatio.toFixed(4)}×)`;const s=Y(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);at.innerHTML=r.map(i=>nt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,o,i.id,i.kind)).join(""),N.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",l=i.isWavelengthDriftViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.secantObliquityExcessU.toFixed(4)}</td>
          <td>${i.secantRatio.toFixed(4)}×</td>
          <td>${i.braggWavelengthRatio.toFixed(4)}×</td>
          <td>${i.quadratureWavelengthRatio.toFixed(4)}×</td>
          <td class="${l}">${i.wavelengthOverestimateRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__BRAGG_FABRY_PEROT_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in x&&(d=a,c=x[d].defaultStationIndex,R(k(d,c)))})});B.addEventListener("input",()=>{c=Number(B.value),R(k(d,c))});N.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(c=Number(a.getAttribute("data-station-row")),R(k(d,c)))});P.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),P.textContent=`Theme: ${b.toUpperCase()}`,R(k(d,c))});R(k(d,c));
