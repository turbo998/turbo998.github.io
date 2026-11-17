import"./modulepreload-polyfill-B5Qt9EMX.js";const k={vis_viva_orbital_energy_conservation_lock:{id:"vis_viva_orbital_energy_conservation_lock",label:"Vis-Viva Orbital Energy Law (v² = μ(2/r − 1/a) = v_circ²(1+e), Ratio = 1.0000×)",labelZh:"Vis-Viva 活力轨道能量定律（v² = μ(2/r − 1/a) = v_circ²(1+e)，能量比恒锁 1.0000×）",subtitle:"Boosts periapsis kinetic energy by 2 − r_p/a = 1 + e over local circular orbit speed v_circ² = μ/r_p, locking Ek_exact/Ek_model = 1.0000× across all 17 eccentricity stations.",subtitleZh:"根据轨道总机械能守恒 E = −μ/(2a) 将近日点动能相对于局部圆轨道动能放大 2 − r_p/a = 1 + e 倍，在全 17 站恒定锁死动能比 Ek_exact/Ek_model = 1.0000×。",useVisVivaEnergyLaw:!0,defaultStationIndex:16,badge:"VIS-VIVA LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"活力方程锁死 · 1.0000×（0/17 亏损站）",description:"Leibniz (1686), Johann Bernoulli (1710), and Euler proved that on an orbit of semi-major axis a, v² = μ(2/r − 1/a), so periapsis kinetic energy scales as (1+e) v_circ², reaching 2 v_circ² at parabolic escape.",descriptionZh:"Leibniz（1686）、Johann Bernoulli（1710）与 Euler 证明：半长轴为 a 的开普勒轨道满足活力公式 v² = μ(2/r − 1/a)，使近日点动能按 (1+e) v_circ² 增长，在抛物线逃逸极限 e=1 处精确翻倍为 2 v_circ²。"},naive_circular_speed_periapsis_deficit:{id:"naive_circular_speed_periapsis_deficit",label:"Naive Local Circular Velocity (v² = μ/r, Deficit = 1 + e up to 2.0000×)",labelZh:"朴素局部圆轨道速度公式（v² = μ/r，近日点动能按 1+e 亏损至 2.0000×）",subtitle:"Evaluates v = √(μ/r) by ignoring semi-major axis term −1/a, underestimating periapsis kinetic energy by 1 + e to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16 (e=1.0).",subtitleZh:"误将局部圆轨道速度 v = √(μ/r) 套用于大偏心率椭圆与彗星轨道，使近日点动能按 1+e 在第 4 站亏损 1.2500×、第 8 站亏损 1.5000×、第 16 站（抛物线彗星 e=1）翻倍亏损至 2.0000×。",useVisVivaEnergyLaw:!1,defaultStationIndex:16,badge:"ENERGY DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"动能腰斩 · 最高 2.0000×（16/17 站违背）",description:"Naive space-game trajectory shaders set spacecraft and comet velocity to √(μ/r), robbing elliptical flybys and Hohmann transfer burns of their 1+e periapsis kinetic energy.",descriptionZh:"朴素太空天体与霍曼转移轨道动画直接按 √(μ/r) 计算天体速度，导致掠日彗星与高椭圆探测器在近日点失去 1+e 倍真实动能与 √2 倍逃逸弹弓加速感。"}},h=17;function Y(e){const i=Math.max(0,Math.min(1,e)),t=1-i,o=2-t;return{eccentricityE:i,periapsisToSemiMajorRatio:t,visVivaEnergyFactor:o,visVivaSpeedRatio:Math.sqrt(o)}}function U(e,i=64){const o=1+Math.max(0,Math.min(1,e)),s=Math.max(2,i%2===0?i:i+1),r=1/s;let a=0+3*o;for(let n=1;n<s;n++){const c=n*r,E=n%2===1?4:2;a+=E*(3*o*c*c)}return r/3*a}function B(e,i){const t=Math.max(0,Math.min(h-1,e)),o=t/(h-1),s=Y(o),r=U(o,64),a=1+o,n=i?1:a;return{index:t,eccentricityE:o,periapsisToSemiMajorRatio:s.periapsisToSemiMajorRatio,visVivaEnergyFactor:s.visVivaEnergyFactor,visVivaSpeedRatio:s.visVivaSpeedRatio,quadratureEnergyFactor:r,kineticEnergyDeficitRatio:n,naiveCircularDeficitRatio:a,isEnergyDeficitViolation:n>1.0001}}function _(e,i){const t=k[e],o=[];let s=0,r=0;for(let n=0;n<h;n++){const c=B(n,t.useVisVivaEnergyLaw);o.push(c),c.isEnergyDeficitViolation&&s++;const E=Math.abs(c.visVivaEnergyFactor-c.quadratureEnergyFactor);E>r&&(r=E)}const a=i!==void 0?Math.max(0,Math.min(h-1,i)):t.defaultStationIndex;return{presetId:e,useVisVivaEnergyLaw:t.useVisVivaEnergyLaw,stationCount:h,selectedStation:o[a],stations:o,station4Ratio:o[4].kineticEnergyDeficitRatio,station8Ratio:o[8].kineticEnergyDeficitRatio,station12Ratio:o[12].kineticEnergyDeficitRatio,station16Ratio:o[16].kineticEnergyDeficitRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"VIS_VIVA_ORBITAL_ENERGY_LOCKED":"NAIVE_CIRCULAR_SPEED_ENERGY_DEFICIT"}}function H(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Vis-Viva Astrodynamics Trajectory Plinth"}),i.push({id:"orbital-rail-front",kind:"orbital_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Vis-Viva Kinetic Energy Lock Rail (Ek_exact / Ek_model = 1.0000×)"}),i.push({id:"orbital-rail-back",kind:"orbital_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Periapsis-to-Semi-Major Ratio Rail (r_p / a = 1 − e)"});for(const t of e.stations){const o=(t.index-8)*30,s=20+28*t.eccentricityE,r=26*t.visVivaEnergyFactor,a=36*t.kineticEnergyDeficitRatio;i.push({id:`eccentricity-focus-pillar-${t.index}`,kind:"eccentricity_focus_pillar",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Eccentricity e = ${t.eccentricityE.toFixed(4)} (r_p/a = ${t.periapsisToSemiMajorRatio.toFixed(4)})`}),i.push({id:`vis-viva-energy-column-${t.index}`,kind:"vis_viva_energy_column",stationIndex:t.index,x:o,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useVisVivaEnergyLaw?"teal":"slate",label:`Station ${t.index} Vis-Viva v²/v_circ² = ${t.visVivaEnergyFactor.toFixed(4)}×`}),i.push({id:`periapsis-deficit-gauge-${t.index}`,kind:"periapsis_deficit_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.kineticEnergyDeficitRatio),h:a,d:12,tone:t.isEnergyDeficitViolation?"crimson":"teal",label:`Station ${t.index} Ratio Ek_exact/Ek = ${t.kineticEnergyDeficitRatio.toFixed(4)}×`})}return i.push({id:"kepler-collar-left",kind:"kepler_orbit_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Circular Orbit Gate (e = 0.000, r_p = a, v² = v_circ²)"}),i.push({id:"kepler-collar-right",kind:"kepler_orbit_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useVisVivaEnergyLaw?"teal":"crimson",label:"Parabolic Escape Gate (e = 1.000, a → ∞, v_esc² = 2 v_circ²)"}),i.push({id:"escape-bar-top",kind:"escape_threshold_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Vis-Viva Specific Mechanical Energy Envelope v² = μ(2/r − 1/a)"}),i.push({id:"escape-bar-front",kind:"escape_threshold_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useVisVivaEnergyLaw?"teal":"crimson",label:"Vis-Viva Kinetic Energy Lock Line (Ek_exact / Ek_model = 1.0000×)"}),i}const M=new URLSearchParams(window.location.search),m=M.get("preset"),z=M.get("theme")==="light"?"light":"dark";let l=m&&m in k?m:"vis_viva_orbital_energy_conservation_lock",d=k[l].defaultStationIndex,b=z;document.documentElement.setAttribute("data-theme",b);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 198 · 208TH DEMO · ASTRODYNAMICS VIS-VIVA EQUATION &amp; PERIAPSIS SLINGSHOT METROLOGY</span>
        <h1>Vis-Viva Elliptical Orbital Speed Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Orbital Velocity Law Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="vis_viva_orbital_energy_conservation_lock"
      >
        Vis-Viva v² = μ(2/r − 1/a) Law (Ek_exact/Ek = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_circular_speed_periapsis_deficit"
      >
        Naive Circular Speed v² = μ/r (Deficit = 1+e up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED ECCENTRICITY e / SPEED v/v_circ</span>
        <strong id="kpi-eccentricity" class="kpi-value">--</strong>
        <span id="kpi-energy-factor" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">ENERGY DEFICIT RATIO (Ek_exact / Ek)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-rpa" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 ENERGY RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">e = 0.250 / 0.500 / 1.000 (Escape)</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">ORBITAL ENERGY VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC VIS-VIVA ORBITAL ENERGY RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Vis-Viva elliptical orbital speed rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Orbital Eccentricity Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (e = 1.000, Parabolic Escape)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION VIS-VIVA μ(2/r−1/a) VS CIRCULAR μ/r LEDGER</span>
          <span>v_p² = v_circ²(1 + e)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>Ecc e</th>
                <th>r_p / a</th>
                <th>v_p / v_circ</th>
                <th>v_p²/v_circ²</th>
                <th>Ek_ex / Ek</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),A=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-eccentricity"),J=document.querySelector("#kpi-energy-factor"),O=document.querySelector("#kpi-ratio"),W=document.querySelector("#kpi-rpa"),X=document.querySelector("#kpi-stations-4816"),w=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),F=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),N=document.querySelector("#station-tbody"),D=document.querySelector("#theme-toggle");function g(e,i,t){const o=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[o,s]}function ot(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,o,s,r,a,n,c,E,q){const p=o*.5,v=s*.5,u=r*.5,C=g(e+p,i-v,t-u),y=g(e+p,i-v,t+u),T=g(e-p,i-v,t+u),L=g(e-p,i+v,t-u),V=g(e+p,i+v,t-u),x=g(e+p,i+v,t+u),S=g(e-p,i+v,t+u),$=ot(a,c),I=n?1.8:.7,R=n?"#ffffff":$.stroke,P=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${V[0].toFixed(1)},${V[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`,j=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`,G=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${V[0].toFixed(1)},${V[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${E}" data-solid-kind="${q}">
      <polygon points="${j}" fill="${$.left}" stroke="${R}" stroke-width="${I}" />
      <polygon points="${G}" fill="${$.right}" stroke="${R}" stroke-width="${I}" />
      <polygon points="${P}" fill="${$.top}" stroke="${R}" stroke-width="${I}" />
    </g>
  `}function f(e){const i=k[e.presetId],t=e.selectedStation,o=b==="dark";K.textContent=i.subtitle,A.textContent=i.badge,A.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`e = ${t.eccentricityE.toFixed(4)} (v_p/v_circ = ${t.visVivaSpeedRatio.toFixed(4)}×)`,J.textContent=`v_p²/v_circ² = ${t.visVivaEnergyFactor.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,O.textContent=`${t.kineticEnergyDeficitRatio.toFixed(4)}×`,O.className=`kpi-value ${t.isEnergyDeficitViolation?"text-danger":"text-ok"}`,W.textContent=`r_p / a = 1 − e = ${t.periapsisToSemiMajorRatio.toFixed(4)} | 2 − r_p/a = 1 + e`,X.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,w.textContent=`${e.violatedCount} / ${e.stationCount}`,w.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,F.value=String(t.index),at.textContent=`Station ${t.index} (e = ${t.eccentricityE.toFixed(3)}, v_p/v_circ = ${t.visVivaSpeedRatio.toFixed(4)}×, Ek_exact/Ek = ${t.kineticEnergyDeficitRatio.toFixed(4)}×)`;const s=H(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);it.innerHTML=r.map(a=>nt(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),N.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",c=a.isEnergyDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.eccentricityE.toFixed(4)}</td>
          <td>${a.periapsisToSemiMajorRatio.toFixed(4)}</td>
          <td>${a.visVivaSpeedRatio.toFixed(4)}×</td>
          <td>${a.visVivaEnergyFactor.toFixed(4)}×</td>
          <td class="${c}">${a.kineticEnergyDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__VIS_VIVA_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in k&&(l=i,d=k[l].defaultStationIndex,f(_(l,d)))})});F.addEventListener("input",()=>{d=Number(F.value),f(_(l,d))});N.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(d=Number(i.getAttribute("data-station-row")),f(_(l,d)))});D.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),D.textContent=`Theme: ${b.toUpperCase()}`,f(_(l,d))});f(_(l,d));
