import"./modulepreload-polyfill-B5Qt9EMX.js";const g={boussinesq_cerruti_inverse_r_green_lock:{id:"boussinesq_cerruti_inverse_r_green_lock",label:"Boussinesq-Cerruti 1/r Green Function (w(r) = (1−ν)F/(2πGr), Ratio = 1.0000×)",labelZh:"Boussinesq-Cerruti 弹性半空间 1/r 格林核（w(r) = (1−ν)F/(2πGr)，沉降比恒锁 1.0000×）",subtitle:"Attenuates vertical surface subsidence inversely with radial distance r(u) = r₀(1+u) via w_B = w₀/(1+u), locking w_active/w_Boussinesq = 1.0000× across all 17 collar stations.",subtitleZh:"通过弹性半空间格林函数 w(r) = (1−ν)F/(2πGr) 令地表垂向凹陷随径向距离 r(u) = r₀(1+u) 按 1/(1+u) 反比衰减，在全 17 站恒定锁死沉降比 w_active/w_B = 1.0000×。",useBoussinesqGreenKernel:!0,defaultStationIndex:16,badge:"BOUSSINESQ 1/r LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"格林沉降锁死 · 1.0000×（0/17 塌陷超冲站）",description:"Joseph Boussinesq (1885) and Valentino Cerruti (1882) solved the 3D Navier-Cauchy elastic half-space equations, proving that surface subsidence decays as 1/r so stress spreads over hemisphere 2πr².",descriptionZh:"Joseph Boussinesq（1885）与 Valentino Cerruti（1882）求解三维 Navier-Cauchy 弹性半空间方程证明：集中载荷引起的地表凹陷按 1/r 反比衰减，自然形成平滑连续的弹性凹陷漏斗。"},naive_unattenuated_winkler_plateau_sink:{id:"naive_unattenuated_winkler_plateau_sink",label:"Naive Unattenuated Winkler Box Sink (w = w₀, Excess = 1 + u up to 2.0000×)",labelZh:"朴素无衰减温克勒平底塌陷（w = w₀，外围沉降比按 1+u 超冲至 2.0000×）",subtitle:"Applies uniform piston depression w = w₀ across the radial collar r = r₀(1+u) without 1/r Green decay, over-sinking the ground to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"在载荷外围 r = r₀(1+u) 直接套用无衰减平底压陷 w = w₀，使地表下沉量相对真实 Boussinesq 解在第 4 站超冲至 1.2500×、第 8 站 1.5000×、第 16 站（r=2r₀）翻倍塌陷至 2.0000×。",useBoussinesqGreenKernel:!1,defaultStationIndex:16,badge:"PLATEAU SINK EXCESS · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"断崖塌陷 · 最高 2.0000×（16/17 站违背）",description:"Naive terrain-stamp and mattress vertex shaders depress vertices uniformly inside a bounding radius without 1/r elastic coupling, creating cookie-cutter step cliffs.",descriptionZh:"朴素地形踩踏与软垫顶点着色器在包围半径内直接做均匀平底压陷而忽略 1/r 弹性半空间耦合，导致脚印外圈像饼干模具切出一样出现生硬断崖与 2 倍过度下沉。"}},k=17;function K(t){const e=1+Math.max(0,t),n=1/e;return{radialDistanceRatio:e,boussinesqDeflectionFactor:n,circumferentialFluxInvariant:e*n}}function V(t,i=64){const n=1/(1+Math.max(0,t)),o=Math.max(2,i%2===0?i:i+1),r=1/o;let s=0+2*n;for(let a=1;a<o;a++){const l=a*r,S=a%2===1?4:2;s+=S*(2*l*n)}return r/3*s}function H(t,i){const e=Math.max(0,Math.min(k-1,t)),n=e/(k-1),o=K(n),r=V(n,64),s=1+n,a=i?1:s;return{index:e,radialExcessU:n,radialDistanceRatio:o.radialDistanceRatio,boussinesqDeflectionFactor:o.boussinesqDeflectionFactor,circumferentialFluxInvariant:o.circumferentialFluxInvariant,quadratureDeflectionFactor:r,subsidenceRatio:a,naivePlateauRatio:s,isSubsidenceExcessViolation:a>1.0001}}function E(t,i){const e=g[t],n=[];let o=0,r=0;for(let a=0;a<k;a++){const l=H(a,e.useBoussinesqGreenKernel);n.push(l),l.isSubsidenceExcessViolation&&o++;const S=Math.abs(l.boussinesqDeflectionFactor-l.quadratureDeflectionFactor);S>r&&(r=S)}const s=i!==void 0?Math.max(0,Math.min(k-1,i)):e.defaultStationIndex;return{presetId:t,useBoussinesqGreenKernel:e.useBoussinesqGreenKernel,stationCount:k,selectedStation:n[s],stations:n,station4Ratio:n[4].subsidenceRatio,station8Ratio:n[8].subsidenceRatio,station12Ratio:n[12].subsidenceRatio,station16Ratio:n[16].subsidenceRatio,violatedCount:o,maxQuadratureError:r,verdict:o===0?"BOUSSINESQ_GREEN_SUBSIDENCE_LOCKED":"NAIVE_PLATEAU_SUBSIDENCE_EXCESS"}}function Q(t){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Boussinesq-Cerruti Elastic Half-Space Plinth"}),i.push({id:"halfspace-rail-front",kind:"halfspace_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Boussinesq 1/r Green Deflection Rail (w_active/w_B = 1.0000×)"}),i.push({id:"halfspace-rail-back",kind:"halfspace_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Radial Collar Distance Rail (r/r₀ = 1 + u)"});for(const e of t.stations){const n=(e.index-8)*30,o=22*e.radialDistanceRatio,r=44*e.boussinesqDeflectionFactor,s=36*e.subsidenceRatio;i.push({id:`radial-collar-ring-${e.index}`,kind:"radial_collar_ring",stationIndex:e.index,x:n,y:o*.5-8,z:-56,w:14,h:o,d:14,tone:"amber",label:`Station ${e.index} Radial Distance r/r₀ = ${e.radialDistanceRatio.toFixed(4)}×`}),i.push({id:`boussinesq-green-plunger-${e.index}`,kind:"boussinesq_green_plunger",stationIndex:e.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:t.useBoussinesqGreenKernel?"teal":"slate",label:`Station ${e.index} Boussinesq Deflection w_B/w₀ = ${e.boussinesqDeflectionFactor.toFixed(4)}×`}),i.push({id:`subsidence-ratio-gauge-${e.index}`,kind:"subsidence_ratio_gauge",stationIndex:e.index,x:n,y:s*.5-8,z:56,w:Math.min(24,12*e.subsidenceRatio),h:s,d:12,tone:e.isSubsidenceExcessViolation?"crimson":"teal",label:`Station ${e.index} Subsidence Ratio w/w_B = ${e.subsidenceRatio.toFixed(4)}×`})}return i.push({id:"mech-collar-left",kind:"mech_stomp_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Inner Load Rim Gate (r = 1.000 r₀, w_B = 1.000 w₀)"}),i.push({id:"mech-collar-right",kind:"mech_stomp_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:t.useBoussinesqGreenKernel?"teal":"crimson",label:"Outer Collar Rim Gate (r = 2.000 r₀, w_B = 0.500 w₀)"}),i.push({id:"navier-cauchy-bar-top",kind:"navier_cauchy_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Navier-Cauchy Half-Space Green Kernel w(r) = (1−ν)F/(2πGr)"}),i.push({id:"navier-cauchy-bar-front",kind:"navier_cauchy_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:t.useBoussinesqGreenKernel?"teal":"crimson",label:"Boussinesq Subsidence Lock Line (w_active / w_B = 1.0000×)"}),i}const y=new URLSearchParams(window.location.search),B=y.get("preset"),Z=y.get("theme")==="light"?"light":"dark";let d=B&&B in g?B:"boussinesq_cerruti_inverse_r_green_lock",c=g[d].defaultStationIndex,h=Z;document.documentElement.setAttribute("data-theme",h);const z=document.querySelector("#app");z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 197 · 207TH DEMO · ELASTIC HALF-SPACE GREEN FUNCTION &amp; TERRAIN SUBSIDENCE METROLOGY</span>
        <h1>Boussinesq-Cerruti Elastic Half-Space Radial Subsidence Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${h.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Elastic Half-Space Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="boussinesq_cerruti_inverse_r_green_lock"
      >
        Boussinesq 1/r Green Kernel (w/w_B = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_unattenuated_winkler_plateau_sink"
      >
        Naive Unattenuated Plateau Sink (w/w_B = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED RADIUS r/r₀ / DEFLECTION w_B/w₀</span>
        <strong id="kpi-radius" class="kpi-value">--</strong>
        <span id="kpi-flux" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SUBSIDENCE RATIO (w / w_Boussinesq)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 SUBSIDENCE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">r/r₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PLATEAU SINK VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC BOUSSINESQ-CERRUTI SUBSIDENCE RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Boussinesq-Cerruti elastic half-space radial subsidence rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Radial Collar Station (0..16):</label>
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
          <span>17-STATION BOUSSINESQ 1/r VS PLATEAU SINK LEDGER</span>
          <span>w(r) = (1−ν)F/(2πGr)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>r / r₀</th>
                <th>w_B / w₀</th>
                <th>r·w_B/r₀w₀</th>
                <th>w / w_B</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),D=document.querySelector("#preset-badge"),X=document.querySelector("#kpi-radius"),Y=document.querySelector("#kpi-flux"),T=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),W=document.querySelector("#kpi-stations-4816"),U=document.querySelector("#kpi-violated"),ee=document.querySelector("#kpi-verdict"),te=document.querySelector("#solid-count-readout"),ie=document.querySelector("#rig-svg"),q=document.querySelector("#station-slider"),se=document.querySelector("#station-slider-label"),O=document.querySelector("#station-tbody"),A=document.querySelector("#theme-toggle");function x(t,i,e){const n=(t-e*.55)*.88,o=-i+(t*.18+e*.42)*.55;return[n,o]}function ne(t,i){return t==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:t==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:t==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:t==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ae(t,i,e,n,o,r,s,a,l,S,L){const u=n*.5,p=o*.5,b=r*.5,C=x(t+u,i-p,e-b),v=x(t+u,i-p,e+b),m=x(t-u,i-p,e+b),N=x(t-u,i+p,e-b),w=x(t+u,i+p,e-b),f=x(t+u,i+p,e+b),$=x(t-u,i+p,e+b),F=ne(s,l),I=a?1.8:.7,R=a?"#ffffff":F.stroke,G=`${N[0].toFixed(1)},${N[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,P=`${m[0].toFixed(1)},${m[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,M=`${v[0].toFixed(1)},${v[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${S}" data-solid-kind="${L}">
      <polygon points="${P}" fill="${F.left}" stroke="${R}" stroke-width="${I}" />
      <polygon points="${M}" fill="${F.right}" stroke="${R}" stroke-width="${I}" />
      <polygon points="${G}" fill="${F.top}" stroke="${R}" stroke-width="${I}" />
    </g>
  `}function _(t){const i=g[t.presetId],e=t.selectedStation,n=h==="dark";j.textContent=i.subtitle,D.textContent=i.badge,D.className=`status-badge ${t.violatedCount===0?"badge-pass":"badge-fail"}`,X.textContent=`r/r₀ = ${e.radialDistanceRatio.toFixed(4)}× (w_B/w₀ = ${e.boussinesqDeflectionFactor.toFixed(4)}×)`,Y.textContent=`r·w_B / r₀w₀ = ${e.circumferentialFluxInvariant.toFixed(4)}× (Quad err ${t.maxQuadratureError.toExponential(2)})`,T.textContent=`${e.subsidenceRatio.toFixed(4)}×`,T.className=`kpi-value ${e.isSubsidenceExcessViolation?"text-danger":"text-ok"}`,J.textContent=`u = r/r₀ − 1 = ${e.radialExcessU.toFixed(4)} | 1/r Green kernel`,W.textContent=`${t.station4Ratio.toFixed(4)}× / ${t.station8Ratio.toFixed(4)}× / ${t.station16Ratio.toFixed(4)}×`,U.textContent=`${t.violatedCount} / ${t.stationCount}`,U.className=`kpi-value ${t.violatedCount>0?"text-danger":"text-ok"}`,ee.textContent=t.verdict,q.value=String(e.index),se.textContent=`Station ${e.index} (u = ${e.radialExcessU.toFixed(3)}, r/r₀ = ${e.radialDistanceRatio.toFixed(3)}×, w/w_B = ${e.subsidenceRatio.toFixed(4)}×)`;const o=Q(t);te.textContent=`${o.length} solids · ${t.stationCount} stations`;const r=[...o].sort((s,a)=>s.z-a.z||s.y-a.y||s.x-a.x);ie.innerHTML=r.map(s=>ae(s.x,s.y,s.z,s.w,s.h,s.d,s.tone,s.stationIndex===e.index,n,s.id,s.kind)).join(""),O.innerHTML=t.stations.map(s=>{const a=s.index===e.index?"row-selected":"",l=s.isSubsidenceExcessViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${s.index}">
          <td>#${s.index}</td>
          <td>${s.radialExcessU.toFixed(4)}</td>
          <td>${s.radialDistanceRatio.toFixed(4)}×</td>
          <td>${s.boussinesqDeflectionFactor.toFixed(4)}×</td>
          <td>${s.circumferentialFluxInvariant.toFixed(4)}×</td>
          <td class="${l}">${s.subsidenceRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(s=>{const a=s.getAttribute("data-preset");s.classList.toggle("active",a===t.presetId)}),window.__BOUSSINESQ_SUBSIDENCE_SUMMARY__=t}document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-preset");i&&i in g&&(d=i,c=g[d].defaultStationIndex,_(E(d,c)))})});q.addEventListener("input",()=>{c=Number(q.value),_(E(d,c))});O.addEventListener("click",t=>{const i=t.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),_(E(d,c)))});A.addEventListener("click",()=>{h=h==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",h),A.textContent=`Theme: ${h.toUpperCase()}`,_(E(d,c))});_(E(d,c));
