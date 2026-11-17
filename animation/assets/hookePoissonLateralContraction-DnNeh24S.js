import"./modulepreload-polyfill-B5Qt9EMX.js";const _={hooke_poisson_hencky_lateral_necking_lock:{id:"hooke_poisson_hencky_lateral_necking_lock",label:"Hooke-Poisson Hencky Contraction Law (ν = 0.5, R_⊥ = R₀ λ_z^(-1/2), V/V₀ = 1.0000×)",labelZh:"Hooke-Poisson 胡克-泊松横向缩颈定律（ν = 0.5, R_⊥ = R₀ λ_z^(-1/2)，体积比恒锁 1.0000×）",subtitle:"Contracts transverse radius as λ_z^(-ν) = (1+u)^(-1/2) and area as A₀/(1+u) under axial stretch λ_z = 1+u, locking V/V₀ = 1.0000× across all 17 stretch stations.",subtitleZh:"在轴向拉伸 λ_z = 1+u 时按亨基对数泊松比 ν = 0.5 令横向半径按 (1+u)^(-1/2)、截面积按 1/(1+u) 缩颈，在全 17 站恒定锁死总体积比 V/V₀ = 1.0000×。",useHookePoissonNecking:!0,defaultStationIndex:16,badge:"POISSON ν=0.5 LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"泊松缩颈锁死 · 1.0000×（0/17 膨胀站）",description:"Siméon Denis Poisson (1811) and Heinrich Hencky (1928) proved that incompressible elastomers and muscle fibers with Poisson ratio ν = 0.5 thin laterally as R_⊥ = R₀ / √λ_z.",descriptionZh:"Siméon Denis Poisson（1811）与 Heinrich Hencky（1928）证明：泊松比 ν = 0.5 的不可压缩橡胶与生物肌腱在轴向拉长 λ_z 倍时，横向半径必须按 R_⊥ = R₀ / √λ_z 变细。"},naive_zero_poisson_unnecked_axial_bloat:{id:"naive_zero_poisson_unnecked_axial_bloat",label:"Naive Zero-Poisson Axial Stretch (ν = 0, R_⊥ = R₀, Volume Bloat = 1 + u up to 2.0000×)",labelZh:"朴素零泊松单轴硬拉（ν = 0, R_⊥ = R₀，截面与体积按 1+u 虚胖至 2.0000×）",subtitle:"Scales axial length L = L₀(1+u) while keeping transverse radius R = R₀ fixed (ν = 0), bloating cylinder volume to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"仅拉长轴向坐标 L = L₀(1+u) 而保持横向粗细 R = R₀ 不变（相当于软木塞 ν = 0），使橡皮筋与肌腱体积在第 4 站虚胖至 1.2500×、第 8 站 1.5000×、第 16 站（拉长两倍）翻倍膨胀至 2.0000×。",useHookePoissonNecking:!1,defaultStationIndex:16,badge:"VOLUME BLOAT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"无缩颈膨胀 · 最高 2.0000×（16/17 站违背）",description:"Naive rubber-hose, tongue, and cable vertex shaders scale only the bone axis without lateral Poisson thinning, making stretched tentacles and rubber bands gain 2× mass.",descriptionZh:"朴素橡胶软管、舌头与电缆顶点着色器只沿骨骼轴向缩放而不做横向泊松变细，导致拉长的触手与橡皮筋越拉越粗壮、体积凭空暴涨 2 倍。"}},S=17;function B(e){const t=1+Math.max(0,e),a=1/t;return{axialStretchRatio:t,poissonRadiusFactor:Math.sqrt(a),poissonAreaFactor:a}}function Z(e,o=64){const a=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),l=1/s;let i=0+2*a;for(let n=1;n<s;n++){const r=n*l,b=n%2===1?4:2;i+=b*(2*r*a)}return l/3*i}function K(e,o){const t=Math.max(0,Math.min(S-1,e)),a=t/(S-1),s=B(a),l=Z(a,64),i=1+a,n=o?1:i;return{index:t,axialStretchExcessU:a,axialStretchRatio:s.axialStretchRatio,poissonRadiusFactor:s.poissonRadiusFactor,poissonAreaFactor:s.poissonAreaFactor,quadratureAreaFactor:l,volumeConservationRatio:n,naiveBloatRatio:i,isVolumeBloatViolation:n>1.0001}}function v(e,o){const t=_[e],a=[];let s=0,l=0;for(let n=0;n<S;n++){const r=K(n,t.useHookePoissonNecking);a.push(r),r.isVolumeBloatViolation&&s++;const b=Math.abs(r.poissonAreaFactor-r.quadratureAreaFactor);b>l&&(l=b)}const i=o!==void 0?Math.max(0,Math.min(S-1,o)):t.defaultStationIndex;return{presetId:e,useHookePoissonNecking:t.useHookePoissonNecking,stationCount:S,selectedStation:a[i],stations:a,station4Ratio:a[4].volumeConservationRatio,station8Ratio:a[8].volumeConservationRatio,station12Ratio:a[12].volumeConservationRatio,station16Ratio:a[16].volumeConservationRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"HOOKE_POISSON_VOLUME_LOCKED":"NAIVE_ZERO_POISSON_VOLUME_BLOAT"}}function D(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Hooke-Poisson Elastomer Tensile Testbed Plinth"}),o.push({id:"hencky-rail-front",kind:"hencky_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Hooke-Poisson Isochoric Volume Rail (V_active / V₀ = 1.0000×)"}),o.push({id:"hencky-rail-back",kind:"hencky_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Axial Tensile Stretch Rail (λ_z = L / L₀ = 1 + u)"});for(const t of e.stations){const a=(t.index-8)*30,s=22*t.axialStretchRatio,l=44*t.poissonAreaFactor,i=36*t.volumeConservationRatio;o.push({id:`axial-tension-rod-${t.index}`,kind:"axial_tension_rod",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Axial Stretch λ_z = ${t.axialStretchRatio.toFixed(4)}×`}),o.push({id:`poisson-necking-collar-${t.index}`,kind:"poisson_necking_collar",stationIndex:t.index,x:a,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useHookePoissonNecking?"teal":"slate",label:`Station ${t.index} Poisson Area A/A₀ = ${t.poissonAreaFactor.toFixed(4)}×`}),o.push({id:`volume-bloat-gauge-${t.index}`,kind:"volume_bloat_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.volumeConservationRatio),h:i,d:12,tone:t.isVolumeBloatViolation?"crimson":"teal",label:`Station ${t.index} Volume Ratio V/V₀ = ${t.volumeConservationRatio.toFixed(4)}×`})}return o.push({id:"clamp-gate-left",kind:"elastomer_clamp_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Unstretched Reference Gate (λ_z = 1.000, R_⊥ = 1.000 R₀)"}),o.push({id:"clamp-gate-right",kind:"elastomer_clamp_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useHookePoissonNecking?"teal":"crimson",label:"Double-Stretch Tensile Gate (λ_z = 2.000, R_⊥ = 0.7071 R₀)"}),o.push({id:"incompressible-bar-top",kind:"incompressible_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Hencky Logarithmic Poisson Law ε_⊥ = −ν ε_z (ν = 0.5)"}),o.push({id:"incompressible-bar-front",kind:"incompressible_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useHookePoissonNecking?"teal":"crimson",label:"Hooke-Poisson Volume Lock Line (V_active / V₀ = 1.0000×)"}),o}const y=new URLSearchParams(window.location.search),I=y.get("preset"),G=y.get("theme")==="light"?"light":"dark";let c=I&&I in _?I:"hooke_poisson_hencky_lateral_necking_lock",d=_[c].defaultStationIndex,k=G;document.documentElement.setAttribute("data-theme",k);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 206 · 216TH DEMO · POISSON LATERAL CONTRACTION &amp; ELASTOMER NECKING METROLOGY</span>
        <h1>Hooke-Poisson Lateral Contraction &amp; Elastomer Necking Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${k.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Poisson Contraction Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="hooke_poisson_hencky_lateral_necking_lock"
      >
        Hooke-Poisson ν=0.5 Necking (V/V₀ = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_zero_poisson_unnecked_axial_bloat"
      >
        Naive Zero-Poisson Stretch (V/V₀ = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED STRETCH λ_z / RADIUS R_⊥/R₀</span>
        <strong id="kpi-stretch" class="kpi-value">--</strong>
        <span id="kpi-area" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">VOLUME CONSERVATION RATIO (V / V₀)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 VOLUME RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">λ_z = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">UNNECKED BLOAT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC HOOKE-POISSON NECKING RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Hooke-Poisson lateral contraction and elastomer necking rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Axial Stretch Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, λ_z = 2.000×)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION POISSON ν=0.5 NECKING VS ZERO-POISSON LEDGER</span>
          <span>R_⊥ = R₀ / √λ_z</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>λ_z = L/L₀</th>
                <th>R_⊥ / R₀</th>
                <th>A_⊥ / A₀</th>
                <th>V / V₀</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),V=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-stretch"),W=document.querySelector("#kpi-area"),L=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),T=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),C=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),z=document.querySelector("#station-tbody"),H=document.querySelector("#theme-toggle");function x(e,o,t){const a=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[a,s]}function at(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,o,t,a,s,l,i,n,r,b,w){const u=a*.5,p=s*.5,h=l*.5,A=x(e+u,o-p,t-h),m=x(e+u,o-p,t+h),P=x(e-u,o-p,t+h),N=x(e-u,o+p,t-h),f=x(e+u,o+p,t-h),g=x(e+u,o+p,t+h),$=x(e-u,o+p,t+h),E=at(i,r),O=n?1.8:.7,F=n?"#ffffff":E.stroke,M=`${N[0].toFixed(1)},${N[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,q=`${P[0].toFixed(1)},${P[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,U=`${m[0].toFixed(1)},${m[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${b}" data-solid-kind="${w}">
      <polygon points="${q}" fill="${E.left}" stroke="${F}" stroke-width="${O}" />
      <polygon points="${U}" fill="${E.right}" stroke="${F}" stroke-width="${O}" />
      <polygon points="${M}" fill="${E.top}" stroke="${F}" stroke-width="${O}" />
    </g>
  `}function R(e){const o=_[e.presetId],t=e.selectedStation,a=k==="dark";j.textContent=o.subtitle,V.textContent=o.badge,V.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`λ_z = ${t.axialStretchRatio.toFixed(4)}× (R_⊥/R₀ = ${t.poissonRadiusFactor.toFixed(4)}×)`,W.textContent=`A_⊥/A₀ = ${t.poissonAreaFactor.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,L.textContent=`${t.volumeConservationRatio.toFixed(4)}×`,L.className=`kpi-value ${t.isVolumeBloatViolation?"text-danger":"text-ok"}`,X.textContent=`u = λ_z − 1 = ${t.axialStretchExcessU.toFixed(4)} | ν = 0.5 Hencky`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,T.textContent=`${e.violatedCount} / ${e.stationCount}`,T.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,C.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.axialStretchExcessU.toFixed(3)}, λ_z = ${t.axialStretchRatio.toFixed(3)}×, V/V₀ = ${t.volumeConservationRatio.toFixed(4)}×)`;const s=D(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const l=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);ot.innerHTML=l.map(i=>nt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),z.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",r=i.isVolumeBloatViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.axialStretchExcessU.toFixed(4)}</td>
          <td>${i.axialStretchRatio.toFixed(4)}×</td>
          <td>${i.poissonRadiusFactor.toFixed(4)}×</td>
          <td>${i.poissonAreaFactor.toFixed(4)}×</td>
          <td class="${r}">${i.volumeConservationRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__HOOKE_POISSON_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in _&&(c=o,d=_[c].defaultStationIndex,R(v(c,d)))})});C.addEventListener("input",()=>{d=Number(C.value),R(v(c,d))});z.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(d=Number(o.getAttribute("data-station-row")),R(v(c,d)))});H.addEventListener("click",()=>{k=k==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",k),H.textContent=`Theme: ${k.toUpperCase()}`,R(v(c,d))});R(v(c,d));
