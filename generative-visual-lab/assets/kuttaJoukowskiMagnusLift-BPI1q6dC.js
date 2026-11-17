import"./modulepreload-polyfill-B5Qt9EMX.js";const h={kutta_joukowski_circulation_lift_lock:{id:"kutta_joukowski_circulation_lift_lock",label:"Kutta-Joukowski & Magnus Lift Law (F_L = ρ U × Γ, Ratio = 1.0000×)",labelZh:"Kutta-Joukowski 库塔-茹科夫斯基与马格努斯环量升力定律（F_L = ρ U × Γ，升力比恒锁 1.0000×）",subtitle:"Couples freestream velocity U with bound spin circulation Γ(u) = Γ₀(1+u) via F_L = ρ U Γ, locking FL_exact/FL_model = 1.0000× across all 17 circulation stations.",subtitleZh:"通过伯努利上下表面流速差耦合来流速度 U 与旋转环量 Γ(u) = Γ₀(1+u)，令横向马格努斯/机翼升力按 F_L = ρ U Γ 线性放大，在全 17 站恒定锁死升力比 1.0000×。",useKuttaJoukowskiLift:!0,defaultStationIndex:16,badge:"KUTTA-JOUKOWSKI LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"环量升力锁死 · 1.0000×（0/17 亏损站）",description:"Heinrich Gustav Magnus (1853), Martin Wilhelm Kutta (1902), and Nikolay Joukowski (1906) proved that superposing circulation Γ onto stream U creates transverse lift F_L = ρ U Γ.",descriptionZh:"Heinrich Gustav Magnus（1853）、Martin Wilhelm Kutta（1902）与 Nikolay Joukowski（1906）证明：在均匀来流 U 上叠加附着涡环量 Γ 会产生正交横向升力 F_L = ρ U Γ。"},naive_uncoupled_ballistic_spin_deficit:{id:"naive_uncoupled_ballistic_spin_deficit",label:"Naive Uncoupled Spin Trajectory (F_L = F_L0, Deficit = 1 + u up to 2.0000×)",labelZh:"朴素未耦合自旋弹道（F_L = F_L0，横向弧线升力按 1+u 亏损至 2.0000×）",subtitle:"Keeps lateral deflection fixed at baseline F_L0 regardless of spin circulation boost Γ = Γ₀(1+u), underestimating banana-kick and curveball lift by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"视觉上加速球体自旋却未按环量 Γ = Γ₀(1+u) 同步放大横向马格努斯力，导致香蕉球与曲球横向偏转力在第 4 站亏损 1.2500×、第 8 站亏损 1.5000×、第 16 站（两倍环量）翻倍亏损至 2.0000×。",useKuttaJoukowskiLift:!1,defaultStationIndex:16,badge:"LIFT DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"升力腰斩 · 最高 2.0000×（16/17 站违背）",description:"Naive sports-ball and wing shaders animate spin rotation visually without coupling angular velocity ω into the ρ U × Γ aerodynamic force integrator.",descriptionZh:"朴素体育球类与机翼动画仅在渲染层旋转球体贴图，却未将自旋环量 Γ 耦合进 ρ U × Γ 气动积分器，导致高转速香蕉球飞出毫无弧度的死板抛物线。"}},g=17;function V(i){const t=1+Math.max(0,i);return{circulationRatio:t,kuttaJoukowskiLiftRatio:t,bernoulliPressureDiffRatio:t}}function j(i,e=64){const a=1+Math.max(0,i),s=Math.max(2,e%2===0?e:e+1),l=1/s;let o=0+3*a;for(let n=1;n<s;n++){const c=n*l,x=n%2===1?4:2;o+=x*(3*a*c*c)}return l/3*o}function B(i,e){const t=Math.max(0,Math.min(g-1,i)),a=t/(g-1),s=V(a),l=j(a,64),o=1+a,n=e?1:o;return{index:t,circulationExcessU:a,circulationRatio:s.circulationRatio,kuttaJoukowskiLiftRatio:s.kuttaJoukowskiLiftRatio,bernoulliPressureDiffRatio:s.bernoulliPressureDiffRatio,quadratureLiftRatio:l,liftDeficitRatio:n,naiveDeficitRatio:o,isLiftDeficitViolation:n>1.0001}}function _(i,e){const t=h[i],a=[];let s=0,l=0;for(let n=0;n<g;n++){const c=B(n,t.useKuttaJoukowskiLift);a.push(c),c.isLiftDeficitViolation&&s++;const x=Math.abs(c.kuttaJoukowskiLiftRatio-c.quadratureLiftRatio);x>l&&(l=x)}const o=e!==void 0?Math.max(0,Math.min(g-1,e)):t.defaultStationIndex;return{presetId:i,useKuttaJoukowskiLift:t.useKuttaJoukowskiLift,stationCount:g,selectedStation:a[o],stations:a,station4Ratio:a[4].liftDeficitRatio,station8Ratio:a[8].liftDeficitRatio,station12Ratio:a[12].liftDeficitRatio,station16Ratio:a[16].liftDeficitRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"KUTTA_JOUKOWSKI_LIFT_LOCKED":"NAIVE_UNCOUPLED_SPIN_LIFT_DEFICIT"}}function G(i){const e=[];e.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Kutta-Joukowski Aerodynamic Circulation Plinth"}),e.push({id:"circulation-rail-front",kind:"circulation_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Kutta-Joukowski Lift Lock Rail (FL_exact / FL_model = 1.0000×)"}),e.push({id:"circulation-rail-back",kind:"circulation_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Bound Vortex Circulation Rail (Γ / Γ₀ = 1 + u)"});for(const t of i.stations){const a=(t.index-8)*30,s=22*t.circulationRatio,l=26*t.kuttaJoukowskiLiftRatio,o=36*t.liftDeficitRatio;e.push({id:`spin-vortex-cylinder-${t.index}`,kind:"spin_vortex_cylinder",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Circulation Γ/Γ₀ = ${t.circulationRatio.toFixed(4)}×`}),e.push({id:`kutta-joukowski-lift-vane-${t.index}`,kind:"kutta_joukowski_lift_vane",stationIndex:t.index,x:a,y:l*.5-8,z:0,w:14,h:l,d:14,tone:i.useKuttaJoukowskiLift?"teal":"slate",label:`Station ${t.index} Lift F_L/F_L0 = ${t.kuttaJoukowskiLiftRatio.toFixed(4)}×`}),e.push({id:`magnus-deficit-gauge-${t.index}`,kind:"magnus_deficit_gauge",stationIndex:t.index,x:a,y:o*.5-8,z:56,w:Math.min(24,12*t.liftDeficitRatio),h:o,d:12,tone:t.isLiftDeficitViolation?"crimson":"teal",label:`Station ${t.index} Deficit Ratio FL_exact/FL = ${t.liftDeficitRatio.toFixed(4)}×`})}return e.push({id:"airfoil-collar-left",kind:"airfoil_wake_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Baseline Spin Gate (Γ = 1.000 Γ₀, F_L = 1.000 F_L0)"}),e.push({id:"airfoil-collar-right",kind:"airfoil_wake_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:i.useKuttaJoukowskiLift?"teal":"crimson",label:"Double-Spin Curveball Gate (Γ = 2.000 Γ₀, F_L = 2.000 F_L0)"}),e.push({id:"bernoulli-bar-top",kind:"bernoulli_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Blasius-Bernoulli Circulation Lift Envelope F_L = ρ U Γ"}),e.push({id:"bernoulli-bar-front",kind:"bernoulli_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:i.useKuttaJoukowskiLift?"teal":"crimson",label:"Kutta-Joukowski Lift Lock Line (FL_exact / FL_model = 1.0000×)"}),e}const y=new URLSearchParams(window.location.search),T=y.get("preset"),H=y.get("theme")==="light"?"light":"dark";let r=T&&T in h?T:"kutta_joukowski_circulation_lift_lock",d=h[r].defaultStationIndex,b=H;document.documentElement.setAttribute("data-theme",b);const W=document.querySelector("#app");W.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 200 · 210TH DEMO HISTORIC MILESTONE · AERODYNAMIC CIRCULATION LIFT &amp; MAGNUS CURVEBALL METROLOGY</span>
        <h1>Kutta-Joukowski &amp; Magnus Circulation Lift Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Circulation Lift Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="kutta_joukowski_circulation_lift_lock"
      >
        Kutta-Joukowski F_L = ρUΓ Law (FL_exact/FL = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_uncoupled_ballistic_spin_deficit"
      >
        Naive Uncoupled Spin (Deficit = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED CIRCULATION Γ/Γ₀ / LIFT F_L/F_L0</span>
        <strong id="kpi-circulation" class="kpi-value">--</strong>
        <span id="kpi-bernoulli" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">LIFT DEFICIT RATIO (FL_exact / FL)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 DEFICIT RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">Γ/Γ₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MAGNUS LIFT DEFICIT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC KUTTA-JOUKOWSKI MAGNUS LIFT RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Kutta-Joukowski and Magnus circulation lift rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Spin Circulation Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, Γ = 2.000 Γ₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION KUTTA-JOUKOWSKI ρUΓ VS UNCOUPLED SPIN LEDGER</span>
          <span>F_L = ρ U Γ</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>Γ / Γ₀</th>
                <th>F_L / F_L0</th>
                <th>Δp / Δp₀</th>
                <th>FL_ex / FL</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Z=document.querySelector("#preset-subtitle"),K=document.querySelector("#preset-badge"),z=document.querySelector("#kpi-circulation"),Q=document.querySelector("#kpi-bernoulli"),O=document.querySelector("#kpi-ratio"),Y=document.querySelector("#kpi-excess"),X=document.querySelector("#kpi-stations-4816"),D=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),et=document.querySelector("#rig-svg"),C=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),A=document.querySelector("#station-tbody"),J=document.querySelector("#theme-toggle");function f(i,e,t){const a=(i-t*.55)*.88,s=-e+(i*.18+t*.42)*.55;return[a,s]}function at(i,e){return i==="teal"?e?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:i==="amber"?e?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:i==="crimson"?e?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:i==="violet"?e?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:e?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(i,e,t,a,s,l,o,n,c,x,M){const u=a*.5,p=s*.5,k=l*.5,E=f(i+u,e-p,t-k),$=f(i+u,e-p,t+k),U=f(i-u,e-p,t+k),m=f(i-u,e+p,t-k),v=f(i+u,e+p,t-k),L=f(i+u,e+p,t+k),I=f(i-u,e+p,t+k),S=at(o,c),R=n?1.8:.7,w=n?"#ffffff":S.stroke,N=`${m[0].toFixed(1)},${m[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)}`,q=`${U[0].toFixed(1)},${U[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)}`,P=`${$[0].toFixed(1)},${$[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${x}" data-solid-kind="${M}">
      <polygon points="${q}" fill="${S.left}" stroke="${w}" stroke-width="${R}" />
      <polygon points="${P}" fill="${S.right}" stroke="${w}" stroke-width="${R}" />
      <polygon points="${N}" fill="${S.top}" stroke="${w}" stroke-width="${R}" />
    </g>
  `}function F(i){const e=h[i.presetId],t=i.selectedStation,a=b==="dark";Z.textContent=e.subtitle,K.textContent=e.badge,K.className=`status-badge ${i.violatedCount===0?"badge-pass":"badge-fail"}`,z.textContent=`Γ/Γ₀ = ${t.circulationRatio.toFixed(4)}× (F_L/F_L0 = ${t.kuttaJoukowskiLiftRatio.toFixed(4)}×)`,Q.textContent=`Δp/Δp₀ = ${t.bernoulliPressureDiffRatio.toFixed(4)}× (Quad err ${i.maxQuadratureError.toExponential(2)})`,O.textContent=`${t.liftDeficitRatio.toFixed(4)}×`,O.className=`kpi-value ${t.isLiftDeficitViolation?"text-danger":"text-ok"}`,Y.textContent=`u = Γ/Γ₀ − 1 = ${t.circulationExcessU.toFixed(4)} | F_L = ρ U × Γ`,X.textContent=`${i.station4Ratio.toFixed(4)}× / ${i.station8Ratio.toFixed(4)}× / ${i.station16Ratio.toFixed(4)}×`,D.textContent=`${i.violatedCount} / ${i.stationCount}`,D.className=`kpi-value ${i.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=i.verdict,C.value=String(t.index),ot.textContent=`Station ${t.index} (u = ${t.circulationExcessU.toFixed(3)}, Γ/Γ₀ = ${t.circulationRatio.toFixed(3)}×, FL_exact/FL = ${t.liftDeficitRatio.toFixed(4)}×)`;const s=G(i);it.textContent=`${s.length} solids · ${i.stationCount} stations`;const l=[...s].sort((o,n)=>o.z-n.z||o.y-n.y||o.x-n.x);et.innerHTML=l.map(o=>nt(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,a,o.id,o.kind)).join(""),A.innerHTML=i.stations.map(o=>{const n=o.index===t.index?"row-selected":"",c=o.isLiftDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.circulationExcessU.toFixed(4)}</td>
          <td>${o.circulationRatio.toFixed(4)}×</td>
          <td>${o.kuttaJoukowskiLiftRatio.toFixed(4)}×</td>
          <td>${o.bernoulliPressureDiffRatio.toFixed(4)}×</td>
          <td class="${c}">${o.liftDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const n=o.getAttribute("data-preset");o.classList.toggle("active",n===i.presetId)}),window.__KUTTA_JOUKOWSKI_SUMMARY__=i}document.querySelectorAll(".preset-btn").forEach(i=>{i.addEventListener("click",()=>{const e=i.getAttribute("data-preset");e&&e in h&&(r=e,d=h[r].defaultStationIndex,F(_(r,d)))})});C.addEventListener("input",()=>{d=Number(C.value),F(_(r,d))});A.addEventListener("click",i=>{const e=i.target.closest("tr[data-station-row]");e&&(d=Number(e.getAttribute("data-station-row")),F(_(r,d)))});J.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),J.textContent=`Theme: ${b.toUpperCase()}`,F(_(r,d))});F(_(r,d));
