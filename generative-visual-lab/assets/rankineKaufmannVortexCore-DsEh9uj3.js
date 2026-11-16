import"./modulepreload-polyfill-B5Qt9EMX.js";const h={rankine_kaufmann_algebraic_core_lock:{id:"rankine_kaufmann_algebraic_core_lock",label:"Rankine-Kaufmann Algebraic Vortex Core (v_θ = (Γ/2π) r/(r²+r_c²), Ratio = 1.0000×)",labelZh:"Rankine-Kaufmann 代数涡核正则化（v_θ = (Γ/2π) r/(r²+r_c²)，速度比恒锁 1.0000×）",subtitle:"Attenuates enclosed circulation inside finite core radius r_c as Γ(r) = Γ_∞ r²/(r²+r_c²), locking tangential velocity ratio v/v_exact = 1.0000× across all 17 radial stations.",subtitleZh:"通过有限涡核半径 r_c 内的斯托克斯环量衰减 Γ(r) = Γ_∞ r²/(r²+r_c²) 平滑消除奇点，在全 17 站恒定锁死切向速度比 v/v_exact = 1.0000×。",useKaufmannCoreRegularization:!0,defaultStationIndex:16,badge:"KAUFMANN CORE LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"涡核平滑锁死 · 1.0000×（0/17 弹弓飞散站）",description:"William J. M. Rankine (1858) and Walter Kaufmann (1962) / Scully (1975) proved that real vortices transition from outer 1/r irrotational decay to inner solid-body rotation via v_θ = (Γ/2π) r/(r²+r_c²), preventing core particle slingshot.",descriptionZh:"William J. M. Rankine（1858）与 Walter Kaufmann（1962）/ Scully（1975）证明：真实粘性涡旋由外围 1/r 无旋衰减平滑过渡到涡核刚体旋转 v_θ = (Γ/2π) r/(r²+r_c²)，彻底根除中心粒子弹弓炸飞。"},naive_singular_point_vortex_slingshot:{id:"naive_singular_point_vortex_slingshot",label:"Naive Singular 1/r Point Vortex (v_θ = Γ/(2πr), Slingshot = 1 + u up to 2.0000×)",labelZh:"朴素奇异 1/r 点涡模型（v_θ = Γ/(2πr)，切向速度按 1+u 弹弓暴冲至 2.0000×）",subtitle:"Applies unregularized Biot-Savart 1/r velocity into the vortex core u = (r_c/r)², overshooting tangential speed to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× (4× centrifugal force) at St 16.",subtitleZh:"将无核 1/r 毕奥-萨伐尔公式直接套入涡核区 u = (r_c/r)²，使切向速度在第 4 站暴冲至 1.2500×、第 8 站 1.5000×、第 16 站（r=r_c）翻倍至 2.0000×（离心力暴涨 4 倍）。",useKaufmannCoreRegularization:!1,defaultStationIndex:16,badge:"CORE SLINGSHOT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"弹弓炸飞 · 最高 2.0000×（16/17 站违背）",description:"Naive tornado and smoke-vortex particle shaders divide directly by radial distance r without core regularization r²+r_c², flinging near-core debris outward like railgun shrapnel.",descriptionZh:"朴素龙卷风与烟雾涡流粒子着色器直接除以径向距离 r 而未加 r²+r_c² 涡核正则项，导致靠近风眼的碎片像电磁炮一样被弹弓炸飞。"}},_=17;function G(e){const o=Math.max(0,e),t=1/(1+o);return{coreToRadiusRatio:Math.sqrt(o),kaufmannVelocityFactor:t,enclosedCirculationFraction:t}}function H(e,o=64){const a=1/(1+Math.max(0,e)),n=Math.max(2,o%2===0?o:o+1),r=1/n;let l=0+2*a;for(let i=1;i<n;i++){const s=i*r,c=i%2===1?4:2;l+=c*(2*s*a)}return r/3*l}function Z(e,o){const t=Math.max(0,Math.min(_-1,e)),a=t/(_-1),n=G(a),r=H(a,64),l=1+a,i=o?1:l;return{index:t,coreRatioSquaredU:a,coreToRadiusRatio:n.coreToRadiusRatio,kaufmannVelocityFactor:n.kaufmannVelocityFactor,enclosedCirculationFraction:n.enclosedCirculationFraction,quadratureVelocityFactor:r,activeToExactVelocityRatio:i,naiveSlingshotRatio:l,isCoreSlingshotViolation:i>1.0001}}function k(e,o){const t=h[e],a=[];let n=0,r=0;for(let i=0;i<_;i++){const s=Z(i,t.useKaufmannCoreRegularization);a.push(s),s.isCoreSlingshotViolation&&n++;const c=Math.abs(s.kaufmannVelocityFactor-s.quadratureVelocityFactor);c>r&&(r=c)}const l=o!==void 0?Math.max(0,Math.min(_-1,o)):t.defaultStationIndex;return{presetId:e,useKaufmannCoreRegularization:t.useKaufmannCoreRegularization,stationCount:_,selectedStation:a[l],stations:a,station4Ratio:a[4].activeToExactVelocityRatio,station8Ratio:a[8].activeToExactVelocityRatio,station12Ratio:a[12].activeToExactVelocityRatio,station16Ratio:a[16].activeToExactVelocityRatio,violatedCount:n,maxQuadratureError:r,verdict:n===0?"RANKINE_KAUFMANN_CORE_LOCKED":"NAIVE_POINT_VORTEX_SLINGSHOT_VIOLATION"}}function D(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Rankine-Kaufmann Vortex Circulation Testbed Plinth"}),o.push({id:"circulation-rail-front",kind:"circulation_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Kaufmann-Scully Regularized Velocity Rail (v/v_exact = 1.0000×)"}),o.push({id:"circulation-rail-back",kind:"circulation_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Stokes Enclosed Circulation Rail (Γ(r)/Γ_∞ = 1/(1+u))"});for(const t of e.stations){const a=(t.index-8)*30,n=20+28*t.coreRatioSquaredU,r=44*t.kaufmannVelocityFactor,l=36*t.activeToExactVelocityRatio;o.push({id:`vorticity-core-column-${t.index}`,kind:"vorticity_core_column",stationIndex:t.index,x:a,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Core Ratio u = (r_c/r)² = ${t.coreRatioSquaredU.toFixed(4)}`}),o.push({id:`kaufmann-velocity-vane-${t.index}`,kind:"kaufmann_velocity_vane",stationIndex:t.index,x:a,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useKaufmannCoreRegularization?"teal":"slate",label:`Station ${t.index} Circulation Γ(r)/Γ_∞ = ${t.enclosedCirculationFraction.toFixed(4)}×`}),o.push({id:`tangential-speed-gauge-${t.index}`,kind:"tangential_speed_gauge",stationIndex:t.index,x:a,y:l*.5-8,z:56,w:Math.min(24,12*t.activeToExactVelocityRatio),h:l,d:12,tone:t.isCoreSlingshotViolation?"crimson":"teal",label:`Station ${t.index} Velocity Ratio v/v_K = ${t.activeToExactVelocityRatio.toFixed(4)}×`})}return o.push({id:"vortex-collar-left",kind:"vortex_funnel_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Irrotational Outer Rim Gate (u = 0.000, Γ(r)/Γ_∞ = 1.000)"}),o.push({id:"vortex-collar-right",kind:"vortex_funnel_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useKaufmannCoreRegularization?"teal":"crimson",label:"Vortex Core Boundary Gate (r = r_c, u = 1.000, Γ = 0.500 Γ_∞)"}),o.push({id:"centrifugal-guide-bar-top",kind:"centrifugal_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Stokes Distributed Vorticity Envelope ω(r) ∝ r_c²/(r²+r_c²)²"}),o.push({id:"centrifugal-guide-bar-front",kind:"centrifugal_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useKaufmannCoreRegularization?"teal":"crimson",label:"Kaufmann Tangential Velocity Lock Line (v/v_exact = 1.0000×)"}),o}const q=new URLSearchParams(window.location.search),T=q.get("preset"),X=q.get("theme")==="light"?"light":"dark";let d=T&&T in h?T:"rankine_kaufmann_algebraic_core_lock",u=h[d].defaultStationIndex,f=X;document.documentElement.setAttribute("data-theme",f);const B=document.querySelector("#app");B.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 193 · 203RD DEMO · VORTEX CORE REGULARIZATION &amp; PARTICLE ADVECTION METROLOGY</span>
        <h1>Rankine-Kaufmann Finite-Core Vortex Regularization Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${f.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Vortex Core Law Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="rankine_kaufmann_algebraic_core_lock"
      >
        Rankine-Kaufmann Core Regularization (v/v_exact = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_singular_point_vortex_slingshot"
      >
        Naive Singular 1/r Point Vortex (v/v_exact = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED CORE RATIO u = (r_c/r)²</span>
        <strong id="kpi-core-u" class="kpi-value">--</strong>
        <span id="kpi-circulation" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">VELOCITY RATIO (v / v_Kaufmann)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-centrifugal" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 VELOCITY RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">u = 0.250 / 0.500 / 1.000 (r = r_c)</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SLINGSHOT BLOWUP VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC RANKINE-KAUFMANN VORTEX RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Rankine-Kaufmann finite-core vortex regularization rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Radial Core Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, r = r_c)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION KAUFMANN r/(r²+r_c²) VS SINGULAR 1/r LEDGER</span>
          <span>Γ(r)/Γ_∞ = 1/(1+u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u=(r_c/r)²</th>
                <th>r_c / r</th>
                <th>Γ(r)/Γ_∞</th>
                <th>v_K/v_irrot</th>
                <th>v / v_exact</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const W=document.querySelector("#preset-subtitle"),A=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-core-u"),Q=document.querySelector("#kpi-circulation"),N=document.querySelector("#kpi-ratio"),j=document.querySelector("#kpi-centrifugal"),J=document.querySelector("#kpi-stations-4816"),K=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),y=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),M=document.querySelector("#station-tbody"),L=document.querySelector("#theme-toggle");function v(e,o,t){const a=(e-t*.55)*.88,n=-o+(e*.18+t*.42)*.55;return[a,n]}function at(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,o,t,a,n,r,l,i,s,c,w){const p=a*.5,x=n*.5,g=r*.5,V=v(e+p,o-x,t-g),S=v(e+p,o-x,t+g),I=v(e-p,o-x,t+g),O=v(e-p,o+x,t-g),C=v(e+p,o+x,t-g),b=v(e+p,o+x,t+g),m=v(e-p,o+x,t+g),$=at(l,s),E=i?1.8:.7,F=i?"#ffffff":$.stroke,U=`${O[0].toFixed(1)},${O[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,z=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,P=`${S[0].toFixed(1)},${S[1].toFixed(1)} ${V[0].toFixed(1)},${V[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${c}" data-solid-kind="${w}">
      <polygon points="${z}" fill="${$.left}" stroke="${F}" stroke-width="${E}" />
      <polygon points="${P}" fill="${$.right}" stroke="${F}" stroke-width="${E}" />
      <polygon points="${U}" fill="${$.top}" stroke="${F}" stroke-width="${E}" />
    </g>
  `}function R(e){const o=h[e.presetId],t=e.selectedStation,a=f==="dark";W.textContent=o.subtitle,A.textContent=o.badge,A.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`u = ${t.coreRatioSquaredU.toFixed(4)} (r_c/r = ${t.coreToRadiusRatio.toFixed(4)})`,Q.textContent=`Γ(r)/Γ_∞ = ${t.enclosedCirculationFraction.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,N.textContent=`${t.activeToExactVelocityRatio.toFixed(4)}×`,N.className=`kpi-value ${t.isCoreSlingshotViolation?"text-danger":"text-ok"}`;const n=t.activeToExactVelocityRatio*t.activeToExactVelocityRatio;j.textContent=`Centrifugal a_c/a_exact = ${n.toFixed(4)}× | v_K/v_irrot = ${t.kaufmannVelocityFactor.toFixed(4)}×`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,K.textContent=`${e.violatedCount} / ${e.stationCount}`,K.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,y.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.coreRatioSquaredU.toFixed(3)}, Γ(r)/Γ_∞ = ${t.enclosedCirculationFraction.toFixed(3)}×, v/v_exact = ${t.activeToExactVelocityRatio.toFixed(4)}×)`;const r=D(e);et.textContent=`${r.length} solids · ${e.stationCount} stations`;const l=[...r].sort((i,s)=>i.z-s.z||i.y-s.y||i.x-s.x);ot.innerHTML=l.map(i=>nt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),M.innerHTML=e.stations.map(i=>{const s=i.index===t.index?"row-selected":"",c=i.isCoreSlingshotViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.coreRatioSquaredU.toFixed(4)}</td>
          <td>${i.coreToRadiusRatio.toFixed(4)}</td>
          <td>${i.enclosedCirculationFraction.toFixed(4)}×</td>
          <td>${i.kaufmannVelocityFactor.toFixed(4)}×</td>
          <td class="${c}">${i.activeToExactVelocityRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const s=i.getAttribute("data-preset");i.classList.toggle("active",s===e.presetId)}),window.__VORTEX_CORE_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in h&&(d=o,u=h[d].defaultStationIndex,R(k(d,u)))})});y.addEventListener("input",()=>{u=Number(y.value),R(k(d,u))});M.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(u=Number(o.getAttribute("data-station-row")),R(k(d,u)))});L.addEventListener("click",()=>{f=f==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",f),L.textContent=`Theme: ${f.toUpperCase()}`,R(k(d,u))});R(k(d,u));
