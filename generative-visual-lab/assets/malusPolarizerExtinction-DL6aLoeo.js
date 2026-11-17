import"./modulepreload-polyfill-B5Qt9EMX.js";const k={malus_cosine_squared_polarizer_lock:{id:"malus_cosine_squared_polarizer_lock",label:"Malus Cosine-Squared Polarizer Law (I = I₀ cos²ϕ = I₀/(1+tan²ϕ), I/I_Malus = 1.0000×)",labelZh:"Malus 马吕斯偏振余弦平方消光定律（I = I₀ cos²ϕ = I₀/(1+tan²ϕ)，透射比恒锁 1.0000×）",subtitle:"Projects the electric field vector as E_trans = E₀ cosϕ and squares the amplitude so I(ϕ) = I₀ cos²ϕ = I₀ / (1 + u), locking I_active / I_Malus = 1.0000× across all 17 stations.",subtitleZh:"遵循 Malus（1809）与 Brewster（1815）偏振光电场矢量投影定律 E_trans = E₀ cosϕ，令透射辐照度按 I₀ cos²ϕ = I₀/(1+u) 消光，在全 17 站恒定锁死辐照度比 1.0000×。",useMalusCosineSquaredLaw:!0,defaultStationIndex:16,badge:"MALUS COS²ϕ LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"马吕斯偏振锁死 · 1.0000×（0/17 漏光站）",description:"Étienne-Louis Malus (1809) and Sir David Brewster (1815) proved that linearly polarized glare passing through an analyzer rotated by angle ϕ transmits irradiance I(ϕ) = I₀ cos²ϕ.",descriptionZh:"Étienne-Louis Malus（1809）与 David Brewster（1815）严格证明：布儒斯特角反射产生的线偏振眩光穿过旋转角为 ϕ 的检偏器时，透射光强严格服从余弦平方定律 I(ϕ) = I₀ cos²ϕ。"},naive_scalar_unpolarized_glare_leak:{id:"naive_scalar_unpolarized_glare_leak",label:"Naive Unpolarized Scalar Intensity (I = I₀, Glare Leak = sec²ϕ = 1 + u up to 2.0000×)",labelZh:"朴素无偏振标量光强模型（I = I₀，水面/车窗眩光按 sec²ϕ = 1+u 漏光至 2.0000×）",subtitle:"Treats Fresnel surface reflections as unpolarized scalar RGB brightness I = I₀ that ignores CPL rotation ϕ, leaking 1.2500× glare at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"将水面与挡风玻璃反射当作无偏振标量光强 I = I₀ 而忽略 CPL 偏振滤镜旋转角 ϕ，使透射眩光在第 4 站漏光 1.2500×、第 8 站漏光 1.5000×、第 16 站（ϕ=45°）翻倍漏光至 2.0000×。",useMalusCosineSquaredLaw:!1,defaultStationIndex:16,badge:"GLARE LEAK · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"眩光泄漏 · 最高 2.0000×（16/17 站违背）",description:"Naive camera filter shaders ignore electric-field polarization orientation, leaking 2.0000× excess glare at ϕ = 45° across 16/17 stations.",descriptionZh:"朴素相机滤镜着色器只传递标量 RGB 亮度而不追踪电场偏振方向，在 45° 检偏角处产生 2.0000× 眩光泄漏并污染 16/17 个站点。"}},S=17;function Z(e){const t=1+Math.max(0,e),s=1/t;return{secantSquaredRatio:t,malusTransmittanceRatio:s}}function V(e,a=64){const s=1/(1+Math.max(0,e)),n=Math.max(2,a%2===0?a:a+1),r=1/n;let i=2*s;for(let o=1;o<n;o++){const l=o*r,I=o%2===1?4:2;i+=I*(2*s*l)}return r/3*i}function D(e,a){const t=Math.max(0,Math.min(S-1,e)),s=t/(S-1),n=Z(s),r=V(s,64),i=1+s,o=a?1:i;return{index:t,tangentSquaredU:s,secantSquaredRatio:n.secantSquaredRatio,malusTransmittanceRatio:n.malusTransmittanceRatio,quadratureTransmittanceRatio:r,irradianceLeakRatio:o,naiveLeakRatio:i,isGlareLeakViolation:o>1.0001}}function R(e,a){const t=k[e],s=[];let n=0,r=0;for(let o=0;o<S;o++){const l=D(o,t.useMalusCosineSquaredLaw);s.push(l),l.isGlareLeakViolation&&n++;const I=Math.abs(l.malusTransmittanceRatio-l.quadratureTransmittanceRatio);I>r&&(r=I)}const i=a!==void 0?Math.max(0,Math.min(S-1,a)):t.defaultStationIndex;return{presetId:e,useMalusCosineSquaredLaw:t.useMalusCosineSquaredLaw,stationCount:S,selectedStation:s[i],stations:s,station4Ratio:s[4].irradianceLeakRatio,station8Ratio:s[8].irradianceLeakRatio,station12Ratio:s[12].irradianceLeakRatio,station16Ratio:s[16].irradianceLeakRatio,violatedCount:n,maxQuadratureError:r,verdict:n===0?"MALUS_POLARIZER_EXTINCTION_LOCKED":"NAIVE_SCALAR_GLARE_IRRADIANCE_LEAK"}}function Q(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Malus-Brewster Polarimetry Optical Bench Plinth"}),a.push({id:"brewster-rail-front",kind:"brewster_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Malus Cosine-Squared Lock Rail (I_active / I_Malus = 1.0000×)"}),a.push({id:"brewster-rail-back",kind:"brewster_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Secant-Squared Rotation Rail (sec²ϕ = 1 + tan²ϕ = 1 + u)"});for(const t of e.stations){const s=(t.index-8)*30,n=22*t.secantSquaredRatio,r=44*t.malusTransmittanceRatio,i=36*t.irradianceLeakRatio;a.push({id:`secant-squared-column-${t.index}`,kind:"secant_squared_column",stationIndex:t.index,x:s,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Secant-Squared sec²ϕ = ${t.secantSquaredRatio.toFixed(4)}×`}),a.push({id:`malus-transmittance-crystal-${t.index}`,kind:"malus_transmittance_crystal",stationIndex:t.index,x:s,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useMalusCosineSquaredLaw?"teal":"slate",label:`Station ${t.index} Malus Irradiance I/I₀ = cos²ϕ = ${t.malusTransmittanceRatio.toFixed(4)}×`}),a.push({id:`glare-leak-gauge-${t.index}`,kind:"glare_leak_gauge",stationIndex:t.index,x:s,y:i*.5-8,z:56,w:Math.min(24,12*t.irradianceLeakRatio),h:i,d:12,tone:t.isGlareLeakViolation?"crimson":"teal",label:`Station ${t.index} Glare Ratio I/I_Malus = ${t.irradianceLeakRatio.toFixed(4)}×`})}return a.push({id:"analyzer-collar-left",kind:"analyzer_ring_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Parallel Polarizer Gate (ϕ = 0°, cos²ϕ = 1.000, I = 1.000 I₀)"}),a.push({id:"analyzer-collar-right",kind:"analyzer_ring_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useMalusCosineSquaredLaw?"teal":"crimson",label:"45° Half-Power Analyzer Gate (ϕ = 45°, cos²ϕ = 0.500, I = 0.500 I₀)"}),a.push({id:"poynting-bar-top",kind:"poynting_vector_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Malus Electric-Field Projection: E_trans = E₀ cosϕ ⇒ I = I₀ cos²ϕ"}),a.push({id:"poynting-bar-front",kind:"poynting_vector_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useMalusCosineSquaredLaw?"teal":"crimson",label:"Malus Irradiance Lock Line (I_active / I_Malus = 1.0000×)"}),a}const z=new URLSearchParams(window.location.search),M=z.get("preset"),H=z.get("theme")==="light"?"light":"dark";let d=M&&M in k?M:"malus_cosine_squared_polarizer_lock",c=k[d].defaultStationIndex,g=H;document.documentElement.setAttribute("data-theme",g);const K=document.querySelector("#app");K.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 213 · 223RD DEMO · POLARIZATION OPTICS MALUS-BREWSTER COSINE-SQUARED EXTINCTION METROLOGY</span>
        <h1>Malus-Brewster Polarizer Extinction Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Polarizer Extinction Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="malus_cosine_squared_polarizer_lock"
      >
        Malus I = I₀ cos²ϕ = I₀/(1+tan²ϕ) Law (I / I_Malus = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_scalar_unpolarized_glare_leak"
      >
        Naive Scalar Unpolarized Glare (Leak = sec²ϕ = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED SEC²ϕ / MALUS TRANSMITTANCE cos²ϕ</span>
        <strong id="kpi-malus" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">IRRADIANCE RATIO (I_active / I_Malus)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 GLARE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">sec²ϕ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">GLARE LEAK VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC MALUS-BREWSTER POLARIZER RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Malus-Brewster polarizer extinction rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Analyzer Rotation Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, ϕ = 45.0°, cos²ϕ = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION MALUS I = I₀ cos²ϕ VS SCALAR GLARE LEDGER</span>
          <span>cos²ϕ = 1/(1+tan²ϕ)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u=tan²ϕ</th>
                <th>sec²ϕ</th>
                <th>I_Malus / I₀</th>
                <th>Poynting Quad</th>
                <th>I / I_Malus</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),F=document.querySelector("#preset-badge"),W=document.querySelector("#kpi-malus"),X=document.querySelector("#kpi-quad"),y=document.querySelector("#kpi-ratio"),Y=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),w=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),A=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),O=document.querySelector("#station-tbody"),P=document.querySelector("#theme-toggle");function x(e,a,t){const s=(e-t*.55)*.88,n=-a+(e*.18+t*.42)*.55;return[s,n]}function st(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ot(e,a,t,s,n,r,i,o,l,I,N){const u=s*.5,p=n*.5,b=r*.5,q=x(e+u,a-p,t-b),_=x(e+u,a-p,t+b),C=x(e-u,a-p,t+b),T=x(e-u,a+p,t-b),L=x(e+u,a+p,t-b),h=x(e+u,a+p,t+b),$=x(e-u,a+p,t+b),m=st(i,l),E=o?1.8:.7,v=o?"#ffffff":m.stroke,U=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,G=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,B=`${_[0].toFixed(1)},${_[1].toFixed(1)} ${q[0].toFixed(1)},${q[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${I}" data-solid-kind="${N}">
      <polygon points="${G}" fill="${m.left}" stroke="${v}" stroke-width="${E}" />
      <polygon points="${B}" fill="${m.right}" stroke="${v}" stroke-width="${E}" />
      <polygon points="${U}" fill="${m.top}" stroke="${v}" stroke-width="${E}" />
    </g>
  `}function f(e){const a=k[e.presetId],t=e.selectedStation,s=g==="dark";j.textContent=a.subtitle,F.textContent=a.badge,F.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,W.textContent=`sec²ϕ = ${t.secantSquaredRatio.toFixed(4)}× (I/I₀ = cos²ϕ = ${t.malusTransmittanceRatio.toFixed(4)}×)`,X.textContent=`Poynting Quad = ${t.quadratureTransmittanceRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,y.textContent=`${t.irradianceLeakRatio.toFixed(4)}×`,y.className=`kpi-value ${t.isGlareLeakViolation?"text-danger":"text-ok"}`,Y.textContent=`u = tan²ϕ = ${t.tangentSquaredU.toFixed(4)} | I = I₀ cos²ϕ`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,w.textContent=`${e.violatedCount} / ${e.stationCount}`,w.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,A.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.tangentSquaredU.toFixed(3)}, cos²ϕ = ${t.malusTransmittanceRatio.toFixed(3)}, I/I_Malus = ${t.irradianceLeakRatio.toFixed(4)}×)`;const n=Q(e);et.textContent=`${n.length} solids · ${e.stationCount} stations`;const r=[...n].sort((i,o)=>i.z-o.z||i.y-o.y||i.x-o.x);at.innerHTML=r.map(i=>ot(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,s,i.id,i.kind)).join(""),O.innerHTML=e.stations.map(i=>{const o=i.index===t.index?"row-selected":"",l=i.isGlareLeakViolation?"cell-fail":"cell-pass";return`
        <tr class="${o}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.tangentSquaredU.toFixed(4)}</td>
          <td>${i.secantSquaredRatio.toFixed(4)}×</td>
          <td>${i.malusTransmittanceRatio.toFixed(4)}×</td>
          <td>${i.quadratureTransmittanceRatio.toFixed(4)}×</td>
          <td class="${l}">${i.irradianceLeakRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const o=i.getAttribute("data-preset");i.classList.toggle("active",o===e.presetId)}),window.__MALUS_POLARIZER_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in k&&(d=a,c=k[d].defaultStationIndex,f(R(d,c)))})});A.addEventListener("input",()=>{c=Number(A.value),f(R(d,c))});O.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(c=Number(a.getAttribute("data-station-row")),f(R(d,c)))});P.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),P.textContent=`Theme: ${g.toUpperCase()}`,f(R(d,c))});f(R(d,c));
