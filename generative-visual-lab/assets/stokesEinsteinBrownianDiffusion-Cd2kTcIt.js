import"./modulepreload-polyfill-B5Qt9EMX.js";const h={stokes_einstein_fluctuation_dissipation_lock:{id:"stokes_einstein_fluctuation_dissipation_lock",label:"Stokes-Einstein Diffusivity Law (D = k_B T / (6πμa), D/D_SE = 1.0000×)",labelZh:"Stokes-Einstein 斯托克斯-爱因斯坦布朗扩散定律（D = k_B T/(6πμa)，均方位移比恒锁 1.0000×）",subtitle:"Divides thermal energy k_B T by Stokes drag ζ = 6πμa so diffusivity D = D₀ / (1 + u) and random-walk step σ = √(2DΔt) scale inversely with viscosity × radius, locking D_active / D_SE = 1.0000× across all 17 stations.",subtitleZh:"遵循 Einstein（1905）与 Smoluchowski（1906）涨落耗散定理，将热动能 k_B T 除以斯托克斯粘滞阻力 ζ = 6πμa，令扩散系数与均方位移按 D₀/(1+u) 衰减，在全 17 站恒定锁死扩散比 1.0000×。",useStokesEinsteinLaw:!0,defaultStationIndex:16,badge:"STOKES-EINSTEIN LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"爱因斯坦扩散锁死 · 1.0000×（0/17 超冲站）",description:"Albert Einstein (1905), William Sutherland (1905), and Marian Smoluchowski (1906) proved that Brownian mean-squared displacement is ⟨|Δr|²⟩ = 6 D t with D = k_B T / (6πμa).",descriptionZh:"Albert Einstein（1905）、William Sutherland（1905）与 Marian Smoluchowski（1906）严格证明：布朗运动三维均方位移为 ⟨|Δr|²⟩ = 6 D t，其中扩散系数 D = k_B T / (6πμa) 与粘度及粒径成反比。"},naive_viscosity_invariant_white_noise_jitter:{id:"naive_viscosity_invariant_white_noise_jitter",label:"Naive Viscosity-Invariant White-Noise Jitter (D = D₀, Overestimate = 1 + u up to 2.0000×)",labelZh:"朴素忽略粘度的白噪声随机抖动（D = D₀，均方位移按 μa/(μ₀a₀) = 1+u 超冲至 2.0000×）",subtitle:"Applies fixed Gaussian/Perlin random-walk variance D₀ regardless of fluid viscosity μ or particle radius a, overestimating MSD by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"无视流体粘度 μ 与颗粒半径 a 带来的斯托克斯阻尼 6πμa，对所有微粒统一施加恒定方差白噪声抖动，使均方位移在第 4 站超冲 1.2500×、第 8 站冲至 1.5000×、第 16 站（μa=2μ₀a₀）翻倍超冲至 2.0000×。",useStokesEinsteinLaw:!1,defaultStationIndex:16,badge:"MSD OVERESTIMATE · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"扩散超冲 · 最高 2.0000×（16/17 站违背）",description:"Naive dust-mote and colloid shaders add constant-amplitude random jitter sin/rand without 1/(6πμa) damping, doubling the mean-squared displacement at 2× Stokes drag across 16/17 stations.",descriptionZh:"朴素丁达尔尘埃与细胞质纳米颗粒着色器直接叠加固定振幅的随机数抖动，忽略 1/(6πμa) 斯托克斯阻尼，在 2 倍粘滞阻力处将均方位移翻倍高估至 2.0000×。"}},x=17;function K(e){const t=1+Math.max(0,e),o=1/t;return{stokesFrictionRatio:t,einsteinDiffusivityRatio:o}}function H(e,i=64){const o=1/(1+Math.max(0,e)),n=Math.max(2,i%2===0?i:i+1),d=1/n;let s=2*o;for(let a=1;a<n;a++){const l=a*d,S=a%2===1?4:2;s+=S*(2*o*l)}return d/3*s}function W(e,i){const t=Math.max(0,Math.min(x-1,e)),o=t/(x-1),n=K(o),d=H(o,64),s=1+o,a=i?1:s;return{index:t,stokesDragExcessU:o,stokesFrictionRatio:n.stokesFrictionRatio,einsteinDiffusivityRatio:n.einsteinDiffusivityRatio,quadratureDiffusivityRatio:d,diffusivityOverestimateRatio:a,naiveOverestimateRatio:s,isDiffusivityOverestimateViolation:a>1.0001}}function E(e,i){const t=h[e],o=[];let n=0,d=0;for(let a=0;a<x;a++){const l=W(a,t.useStokesEinsteinLaw);o.push(l),l.isDiffusivityOverestimateViolation&&n++;const S=Math.abs(l.einsteinDiffusivityRatio-l.quadratureDiffusivityRatio);S>d&&(d=S)}const s=i!==void 0?Math.max(0,Math.min(x-1,i)):t.defaultStationIndex;return{presetId:e,useStokesEinsteinLaw:t.useStokesEinsteinLaw,stationCount:x,selectedStation:o[s],stations:o,station4Ratio:o[4].diffusivityOverestimateRatio,station8Ratio:o[8].diffusivityOverestimateRatio,station12Ratio:o[12].diffusivityOverestimateRatio,station16Ratio:o[16].diffusivityOverestimateRatio,violatedCount:n,maxQuadratureError:d,verdict:n===0?"STOKES_EINSTEIN_DIFFUSIVITY_LOCKED":"NAIVE_WHITE_NOISE_MSD_OVERESTIMATE"}}function G(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Stokes-Einstein Colloid & Brownian Motion Plinth"}),i.push({id:"smoluchowski-rail-front",kind:"smoluchowski_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Stokes-Einstein Diffusivity Lock Rail (D_active / D_Einstein = 1.0000×)"}),i.push({id:"smoluchowski-rail-back",kind:"smoluchowski_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Stokes Viscous Drag Rail (ζ / ζ₀ = 6πμa / 6πμ₀a₀ = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,n=22*t.stokesFrictionRatio,d=44*t.einsteinDiffusivityRatio,s=36*t.diffusivityOverestimateRatio;i.push({id:`stokes-friction-column-${t.index}`,kind:"stokes_friction_column",stationIndex:t.index,x:o,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Stokes Friction ζ/ζ₀ = ${t.stokesFrictionRatio.toFixed(4)}×`}),i.push({id:`einstein-diffusivity-cloud-${t.index}`,kind:"einstein_diffusivity_cloud",stationIndex:t.index,x:o,y:d*.5-8,z:0,w:14,h:d,d:14,tone:e.useStokesEinsteinLaw?"teal":"slate",label:`Station ${t.index} Einstein Diffusivity D/D₀ = ${t.einsteinDiffusivityRatio.toFixed(4)}×`}),i.push({id:`msd-overestimate-gauge-${t.index}`,kind:"msd_overestimate_gauge",stationIndex:t.index,x:o,y:s*.5-8,z:56,w:Math.min(24,12*t.diffusivityOverestimateRatio),h:s,d:12,tone:t.isDiffusivityOverestimateViolation?"crimson":"teal",label:`Station ${t.index} MSD Ratio D/D_Einstein = ${t.diffusivityOverestimateRatio.toFixed(4)}×`})}return i.push({id:"cuvette-collar-left",kind:"cuvette_cell_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Low-Viscosity Cuvette Gate (ζ = 1.000 ζ₀, D = 1.000 D₀)"}),i.push({id:"cuvette-collar-right",kind:"cuvette_cell_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useStokesEinsteinLaw?"teal":"crimson",label:"High-Viscosity Cytoplasm Gate (ζ = 2.000 ζ₀, D = 0.500 D₀)"}),i.push({id:"fdt-bar-top",kind:"fluctuation_dissipation_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Einstein Fluctuation-Dissipation: D = k_B T / (6π μ a),  ⟨|Δr|²⟩ = 6 D t"}),i.push({id:"fdt-bar-front",kind:"fluctuation_dissipation_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useStokesEinsteinLaw?"teal":"crimson",label:"Diffusivity Lock Line (D_active / D_Einstein = 1.0000×)"}),i}const A=new URLSearchParams(window.location.search),T=A.get("preset"),Z=A.get("theme")==="light"?"light":"dark";let r=T&&T in h?T:"stokes_einstein_fluctuation_dissipation_lock",c=h[r].defaultStationIndex,v=Z;document.documentElement.setAttribute("data-theme",v);const j=document.querySelector("#app");j.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 219 · 229TH DEMO · BROWNIAN MOTION STOKES-EINSTEIN FLUCTUATION-DISSIPATION METROLOGY</span>
        <h1>Stokes-Einstein Brownian Diffusivity Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${v.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Brownian Diffusivity Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="stokes_einstein_fluctuation_dissipation_lock"
      >
        Stokes-Einstein D = k_B T/(6πμa) Law (D / D_SE = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_viscosity_invariant_white_noise_jitter"
      >
        Naive Viscosity-Invariant White Noise (Overestimate = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED DRAG ζ/ζ₀ / EINSTEIN DIFFUSIVITY D/D₀</span>
        <strong id="kpi-diff" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MSD DIFFUSIVITY RATIO (D_active / D_Einstein)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 MSD RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">ζ/ζ₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MSD OVERESTIMATE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC STOKES-EINSTEIN BROWNIAN RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Stokes-Einstein Brownian diffusivity rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Stokes Drag Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, ζ = 2.000 ζ₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION EINSTEIN D = k_B T/(6πμa) VS WHITE-NOISE LEDGER</span>
          <span>⟨|Δr|²⟩ = 6 D t</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>ζ / ζ₀</th>
                <th>D_SE / D₀</th>
                <th>Kubo Quad</th>
                <th>D / D_SE</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const z=document.querySelector("#preset-subtitle"),N=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-diff"),Y=document.querySelector("#kpi-quad"),C=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),X=document.querySelector("#kpi-stations-4816"),L=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),R=document.querySelector("#station-slider"),st=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),M=document.querySelector("#theme-toggle");function k(e,i,t){const o=(e-t*.55)*.88,n=-i+(e*.18+t*.42)*.55;return[o,n]}function ot(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function at(e,i,t,o,n,d,s,a,l,S,V){const u=o*.5,p=n*.5,f=d*.5,F=k(e+u,i-p,t-f),D=k(e+u,i-p,t+f),O=k(e-u,i-p,t+f),w=k(e-u,i+p,t-f),_=k(e+u,i+p,t-f),b=k(e+u,i+p,t+f),m=k(e-u,i+p,t+f),I=ot(s,l),$=a?1.8:.7,y=a?"#ffffff":I.stroke,B=`${w[0].toFixed(1)},${w[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,U=`${O[0].toFixed(1)},${O[1].toFixed(1)} ${D[0].toFixed(1)},${D[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,P=`${D[0].toFixed(1)},${D[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${S}" data-solid-kind="${V}">
      <polygon points="${U}" fill="${I.left}" stroke="${y}" stroke-width="${$}" />
      <polygon points="${P}" fill="${I.right}" stroke="${y}" stroke-width="${$}" />
      <polygon points="${B}" fill="${I.top}" stroke="${y}" stroke-width="${$}" />
    </g>
  `}function g(e){const i=h[e.presetId],t=e.selectedStation,o=v==="dark";z.textContent=i.subtitle,N.textContent=i.badge,N.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`ζ/ζ₀ = ${t.stokesFrictionRatio.toFixed(4)}× (D/D₀ = ${t.einsteinDiffusivityRatio.toFixed(4)}×)`,Y.textContent=`Kubo Quad = ${t.quadratureDiffusivityRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,C.textContent=`${t.diffusivityOverestimateRatio.toFixed(4)}×`,C.className=`kpi-value ${t.isDiffusivityOverestimateViolation?"text-danger":"text-ok"}`,J.textContent=`u = μa/(μ₀a₀) − 1 = ${t.stokesDragExcessU.toFixed(4)} | D = k_B T / (6πμa)`,X.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,L.textContent=`${e.violatedCount} / ${e.stationCount}`,L.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,R.value=String(t.index),st.textContent=`Station ${t.index} (u = ${t.stokesDragExcessU.toFixed(3)}, ζ/ζ₀ = ${t.stokesFrictionRatio.toFixed(3)}×, D/D_SE = ${t.diffusivityOverestimateRatio.toFixed(4)}×)`;const n=G(e);et.textContent=`${n.length} solids · ${e.stationCount} stations`;const d=[...n].sort((s,a)=>s.z-a.z||s.y-a.y||s.x-a.x);it.innerHTML=d.map(s=>at(s.x,s.y,s.z,s.w,s.h,s.d,s.tone,s.stationIndex===t.index,o,s.id,s.kind)).join(""),q.innerHTML=e.stations.map(s=>{const a=s.index===t.index?"row-selected":"",l=s.isDiffusivityOverestimateViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${s.index}">
          <td>#${s.index}</td>
          <td>${s.stokesDragExcessU.toFixed(4)}</td>
          <td>${s.stokesFrictionRatio.toFixed(4)}×</td>
          <td>${s.einsteinDiffusivityRatio.toFixed(4)}×</td>
          <td>${s.quadratureDiffusivityRatio.toFixed(4)}×</td>
          <td class="${l}">${s.diffusivityOverestimateRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(s=>{const a=s.getAttribute("data-preset");s.classList.toggle("active",a===e.presetId)}),window.__STOKES_EINSTEIN_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in h&&(r=i,c=h[r].defaultStationIndex,g(E(r,c)))})});R.addEventListener("input",()=>{c=Number(R.value),g(E(r,c))});q.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),g(E(r,c)))});M.addEventListener("click",()=>{v=v==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",v),M.textContent=`Theme: ${v.toUpperCase()}`,g(E(r,c))});g(E(r,c));
