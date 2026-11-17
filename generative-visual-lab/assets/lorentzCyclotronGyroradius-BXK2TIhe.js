import"./modulepreload-polyfill-B5Qt9EMX.js";const b={lorentz_larmor_inverse_b_gyroradius_lock:{id:"lorentz_larmor_inverse_b_gyroradius_lock",label:"Lorentz-Larmor Gyroradius Law (r_L = mv_⊥ / (|q|B), r/r_L = 1.0000×)",labelZh:"Lorentz-Larmor 洛伦兹-拉莫尔回旋半径定律（r_L = mv_⊥/(|q|B)，回旋比恒锁 1.0000×）",subtitle:"Contracts the magnetic helix radius inversely with flux density as r_L = r_L0 / (1 + u) while spinning up ω_c = ω_c0(1 + u), locking r_active / r_L = 1.0000× across all 17 stations.",subtitleZh:"平衡洛伦兹磁力 |q|v_⊥B 与向心力 mv_⊥²/r_L，令带电粒子螺旋回旋半径随磁感应强度 B(u) = B₀(1+u) 反比收缩为 r_L0/(1+u)，在全 17 站恒定锁死回旋半径比 1.0000×。",useLorentzLarmorLaw:!0,defaultStationIndex:16,badge:"LARMOR GYRORADIUS LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"拉莫尔回旋锁死 · 1.0000×（0/17 超冲站）",description:"Hendrik Lorentz (1895), Joseph Larmor (1897), and Ernest Lawrence (1930) proved that a charged particle in a magnetic field B gyrates at ω_c = |q|B/m with gyroradius r_L = mv_⊥ / (|q|B).",descriptionZh:"Hendrik Lorentz（1895）、Joseph Larmor（1897）与 Ernest Lawrence（1930）严格证明：磁场 B 中的带电粒子以回旋频率 ω_c = |q|B/m 绕磁力线作螺旋运动，回旋半径 r_L = mv_⊥/(|q|B) 与磁场强度成反比。"},naive_fixed_radius_helix_overshoot:{id:"naive_fixed_radius_helix_overshoot",label:"Naive Fixed-Radius Helix (r = r_L0, Overshoot = B/B₀ = 1 + u up to 2.0000×)",labelZh:"朴素固定半径螺旋粒子束（r = r_L0，拉莫尔半径按 B/B₀ = 1+u 超冲至 2.0000×）",subtitle:"Spirals particles along converging magnetic field lines with a constant helix radius r_L0 regardless of B(u), overshooting true Larmor radius by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"将极光或托卡马克等离子体粒子的螺旋半径写死为常数 r_L0 而无视磁场汇聚增强 B(u) = B₀(1+u)，使回旋半径在第 4 站超冲至 1.2500×、第 8 站冲至 1.5000×、第 16 站（B=2B₀）翻倍超冲至 2.0000×（磁通量膨胀 4 倍）。",useLorentzLarmorLaw:!1,defaultStationIndex:16,badge:"GYRORADIUS OVERSHOOT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"回旋超冲 · 最高 2.0000×（16/17 站违背）",description:"Naive aurora and plasma beam shaders hardcode a constant helix radius sin(ωt), violating Lorentz force balance and inflating magnetic flux Φ = π r_L² B by 2× to 4× across 16/17 stations.",descriptionZh:"朴素极光与磁约束粒子束着色器写死固定振幅的正余弦螺旋半径，违背洛伦兹力平衡并在 2 倍强场处产生 2.0000× 回旋半径超冲（破坏阿尔文磁矩守恒并污染 16/17 站）。"}},v=17;function Y(e){const t=1+Math.max(0,e),a=1/t;return{magneticFieldRatio:t,larmorGyroradiusRatio:a}}function H(e,o=64){const a=1/(1+Math.max(0,e)),n=Math.max(2,o%2===0?o:o+1),s=1/n;let i=2*a;for(let r=1;r<n;r++){const d=r*s,L=r%2===1?4:2;i+=L*(2*a*d)}return s/3*i}function V(e,o){const t=Math.max(0,Math.min(v-1,e)),a=t/(v-1),n=Y(a),s=H(a,64),i=1+a,r=o?1:i;return{index:t,magneticExcessU:a,magneticFieldRatio:n.magneticFieldRatio,larmorGyroradiusRatio:n.larmorGyroradiusRatio,quadratureGyroradiusRatio:s,gyroradiusOvershootRatio:r,naiveOvershootRatio:i,isGyroradiusOvershootViolation:r>1.0001}}function m(e,o){const t=b[e],a=[];let n=0,s=0;for(let r=0;r<v;r++){const d=V(r,t.useLorentzLarmorLaw);a.push(d),d.isGyroradiusOvershootViolation&&n++;const L=Math.abs(d.larmorGyroradiusRatio-d.quadratureGyroradiusRatio);L>s&&(s=L)}const i=o!==void 0?Math.max(0,Math.min(v-1,o)):t.defaultStationIndex;return{presetId:e,useLorentzLarmorLaw:t.useLorentzLarmorLaw,stationCount:v,selectedStation:a[i],stations:a,station4Ratio:a[4].gyroradiusOvershootRatio,station8Ratio:a[8].gyroradiusOvershootRatio,station12Ratio:a[12].gyroradiusOvershootRatio,station16Ratio:a[16].gyroradiusOvershootRatio,violatedCount:n,maxQuadratureError:s,verdict:n===0?"LORENTZ_CYCLOTRON_GYRORADIUS_LOCKED":"NAIVE_FIXED_HELIX_GYRORADIUS_OVERSHOOT"}}function Z(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Lorentz-Larmor Cyclotron Magnetic Mirror Plinth"}),o.push({id:"cyclotron-rail-front",kind:"cyclotron_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Lorentz-Larmor Gyroradius Lock Rail (r_active / r_L = 1.0000×)"}),o.push({id:"cyclotron-rail-back",kind:"cyclotron_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Magnetic Flux Density & Cyclotron Frequency Rail (B / B₀ = ω_c / ω_c0 = 1 + u)"});for(const t of e.stations){const a=(t.index-8)*30,n=22*t.magneticFieldRatio,s=44*t.larmorGyroradiusRatio,i=36*t.gyroradiusOvershootRatio;o.push({id:`magnetic-flux-column-${t.index}`,kind:"magnetic_flux_column",stationIndex:t.index,x:a,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Magnetic Field B/B₀ = ${t.magneticFieldRatio.toFixed(4)}×`}),o.push({id:`larmor-gyroradius-ring-${t.index}`,kind:"larmor_gyroradius_ring",stationIndex:t.index,x:a,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useLorentzLarmorLaw?"teal":"slate",label:`Station ${t.index} Larmor Radius r_L/r_L0 = ${t.larmorGyroradiusRatio.toFixed(4)}×`}),o.push({id:`gyroradius-overshoot-gauge-${t.index}`,kind:"gyroradius_overshoot_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.gyroradiusOvershootRatio),h:i,d:12,tone:t.isGyroradiusOvershootViolation?"crimson":"teal",label:`Station ${t.index} Overshoot Ratio r/r_L = ${t.gyroradiusOvershootRatio.toFixed(4)}×`})}return o.push({id:"mirror-collar-left",kind:"tokamak_mirror_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Baseline Magnetic Field Gate (B = 1.000 B₀, r_L = 1.000 r_L0)"}),o.push({id:"mirror-collar-right",kind:"tokamak_mirror_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useLorentzLarmorLaw?"teal":"crimson",label:"Converging Magnetic Throat Gate (B = 2.000 B₀, r_L = 0.500 r_L0)"}),o.push({id:"alfven-bar-top",kind:"alfven_invariant_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Lorentz Centripetal Balance: |q| v_⊥ B = m v_⊥² / r_L  ⇒  r_L = m v_⊥ / (|q| B)"}),o.push({id:"alfven-bar-front",kind:"alfven_invariant_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useLorentzLarmorLaw?"teal":"crimson",label:"Larmor Gyroradius Lock Line (r_active / r_Lorentz = 1.0000×)"}),o}const A=new URLSearchParams(window.location.search),F=A.get("preset"),P=A.get("theme")==="light"?"light":"dark";let l=F&&F in b?F:"lorentz_larmor_inverse_b_gyroradius_lock",c=b[l].defaultStationIndex,x=P;document.documentElement.setAttribute("data-theme",x);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 216 · 226TH DEMO · PLASMA &amp; AURORAL PARTICLE LORENTZ-CYCLOTRON LARMOR GYRORADIUS METROLOGY</span>
        <h1>Lorentz-Cyclotron Magnetic Helix Gyroradius Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${x.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Magnetic Gyroradius Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="lorentz_larmor_inverse_b_gyroradius_lock"
      >
        Lorentz-Larmor r_L = mv_⊥/(|q|B) Law (r / r_L = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_fixed_radius_helix_overshoot"
      >
        Naive Fixed-Radius Helix r = r_L0 (Overshoot = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED FIELD B/B₀ / LARMOR RADIUS r_L/r_L0</span>
        <strong id="kpi-larmor" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">GYRORADIUS RATIO (r_active / r_Lorentz)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 GYRORADIUS RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">B/B₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">GYRORADIUS OVERSHOOT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC LORENTZ-CYCLOTRON GYRORADIUS RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Lorentz-Cyclotron magnetic helix gyroradius rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Magnetic Field Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, B = 2.000 B₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION LORENTZ r_L = mv_⊥/(|q|B) VS FIXED HELIX LEDGER</span>
          <span>ω_c = |q|B / m</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>B / B₀</th>
                <th>r_L / r_L0</th>
                <th>Orbit Quad</th>
                <th>r / r_L</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const X=document.querySelector("#preset-subtitle"),T=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-larmor"),K=document.querySelector("#kpi-quad"),q=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),W=document.querySelector("#kpi-stations-4816"),w=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),E=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),z=document.querySelector("#station-tbody"),G=document.querySelector("#theme-toggle");function h(e,o,t){const a=(e-t*.55)*.88,n=-o+(e*.18+t*.42)*.55;return[a,n]}function at(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function rt(e,o,t,a,n,s,i,r,d,L,M){const u=a*.5,p=n*.5,g=s*.5,C=h(e+u,o-p,t-g),f=h(e+u,o-p,t+g),I=h(e-u,o-p,t+g),B=h(e-u,o+p,t-g),k=h(e+u,o+p,t-g),_=h(e+u,o+p,t+g),y=h(e-u,o+p,t+g),O=at(i,d),$=r?1.8:.7,S=r?"#ffffff":O.stroke,N=`${B[0].toFixed(1)},${B[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)}`,U=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)}`,D=`${f[0].toFixed(1)},${f[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${L}" data-solid-kind="${M}">
      <polygon points="${U}" fill="${O.left}" stroke="${S}" stroke-width="${$}" />
      <polygon points="${D}" fill="${O.right}" stroke="${S}" stroke-width="${$}" />
      <polygon points="${N}" fill="${O.top}" stroke="${S}" stroke-width="${$}" />
    </g>
  `}function R(e){const o=b[e.presetId],t=e.selectedStation,a=x==="dark";X.textContent=o.subtitle,T.textContent=o.badge,T.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`B/B₀ = ${t.magneticFieldRatio.toFixed(4)}× (r_L/r_L0 = ${t.larmorGyroradiusRatio.toFixed(4)}×)`,K.textContent=`Orbit Quad = ${t.quadratureGyroradiusRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,q.textContent=`${t.gyroradiusOvershootRatio.toFixed(4)}×`,q.className=`kpi-value ${t.isGyroradiusOvershootViolation?"text-danger":"text-ok"}`,J.textContent=`u = B/B₀ − 1 = ${t.magneticExcessU.toFixed(4)} | r_L = mv_⊥/(|q|B)`,W.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,w.textContent=`${e.violatedCount} / ${e.stationCount}`,w.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,E.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.magneticExcessU.toFixed(3)}, B/B₀ = ${t.magneticFieldRatio.toFixed(3)}×, r/r_L = ${t.gyroradiusOvershootRatio.toFixed(4)}×)`;const n=Z(e);et.textContent=`${n.length} solids · ${e.stationCount} stations`;const s=[...n].sort((i,r)=>i.z-r.z||i.y-r.y||i.x-r.x);ot.innerHTML=s.map(i=>rt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),z.innerHTML=e.stations.map(i=>{const r=i.index===t.index?"row-selected":"",d=i.isGyroradiusOvershootViolation?"cell-fail":"cell-pass";return`
        <tr class="${r}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.magneticExcessU.toFixed(4)}</td>
          <td>${i.magneticFieldRatio.toFixed(4)}×</td>
          <td>${i.larmorGyroradiusRatio.toFixed(4)}×</td>
          <td>${i.quadratureGyroradiusRatio.toFixed(4)}×</td>
          <td class="${d}">${i.gyroradiusOvershootRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const r=i.getAttribute("data-preset");i.classList.toggle("active",r===e.presetId)}),window.__LORENTZ_CYCLOTRON_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in b&&(l=o,c=b[l].defaultStationIndex,R(m(l,c)))})});E.addEventListener("input",()=>{c=Number(E.value),R(m(l,c))});z.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(c=Number(o.getAttribute("data-station-row")),R(m(l,c)))});G.addEventListener("click",()=>{x=x==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",x),G.textContent=`Theme: ${x.toUpperCase()}`,R(m(l,c))});R(m(l,c));
