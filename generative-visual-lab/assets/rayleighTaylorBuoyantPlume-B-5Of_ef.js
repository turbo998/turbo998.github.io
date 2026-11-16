import"./modulepreload-polyfill-B5Qt9EMX.js";const f={rayleigh_taylor_atwood_two_fluid_lock:{id:"rayleigh_taylor_atwood_two_fluid_lock",label:"Rayleigh-Taylor Atwood Two-Fluid Law (a = g(ρ₂−ρ₁)/(ρ₂+ρ₁), a/a_RT = 1.0000×)",labelZh:"Rayleigh-Taylor 瑞利-泰勒阿特伍德双流体惯量定律（A = (ρ₂−ρ₁)/(ρ₂+ρ₁)，加速度比恒锁 1.0000×）",subtitle:"Divides buoyant net force (ρ₂ − ρ₁)g by the coupled two-fluid inertia (ρ₂ + ρ₁) = 2ρ₁(1 + u), locking a_active / a_RT = 1.0000× across all 17 density-ratio stations.",subtitleZh:"遵循 Rayleigh（1883）与 Taylor（1950）双流体耦合惯量定律，将浮力差 (ρ₂ − ρ₁)g 除以上下双流体总惯量 (ρ₂ + ρ₁) = 2ρ₁(1+u)，在全 17 站恒定锁死蘑菇云加速度比 1.0000×。",useAtwoodTwoFluidLaw:!0,defaultStationIndex:16,badge:"ATWOOD INERTIA LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"阿特伍德锁死 · 1.0000×（0/17 超冲站）",description:"Lord Rayleigh (1883) and G. I. Taylor (1950) proved that interfacial instability growth γ² = A g k is governed by the Atwood number A = (ρ₂ − ρ₁)/(ρ₂ + ρ₁), accounting for both fluids’ inertia.",descriptionZh:"Lord Rayleigh（1883）与 G. I. Taylor（1950）严格证明：重流体与轻流体交界面的失稳增长率 γ² = A g k 受阿特伍德数 A = (ρ₂ − ρ₁)/(ρ₂ + ρ₁) 控制，必须同时计入上下两种流体的运动惯量。"},naive_boussinesq_fixed_inertia_overshoot:{id:"naive_boussinesq_fixed_inertia_overshoot",label:"Naive Boussinesq Fixed-Inertia Plume (a = g(ρ₂−ρ₁)/(2ρ₁), Overshoot = 1 + u up to 2.0000×)",labelZh:"朴素布辛涅斯克固定分母浮力模型（分母写死 2ρ₁，浮力加速度按 1+u 超冲至 2.0000×）",subtitle:"Divides buoyancy difference (ρ₂ − ρ₁)g by fixed baseline inertia 2ρ₁ instead of (ρ₂ + ρ₁), overshooting acceleration and γ² growth rate by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"在大密度比流体（如水下墨滴、熔岩灯或高密度火山灰羽流）中滥用微小温差 Boussinesq 固定惯量分母 2ρ₁，使浮力加速度与增长率平方在第 4 站超冲 1.2500×、第 8 站冲至 1.5000×、第 16 站（ρ₂=3ρ₁）翻倍超冲至 2.0000×。",useAtwoodTwoFluidLaw:!1,defaultStationIndex:16,badge:"INERTIA OVERSHOOT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"浮力超冲 · 最高 2.0000×（16/17 站违背）",description:"Naive smoke and ink plume shaders use (ρ₂ − ρ₁)/(2ρ₁) without updating the denominator ρ₂ + ρ₁, doubling the acceleration at ρ₂ = 3ρ₁ across 16/17 stations.",descriptionZh:"朴素烟羽与墨滴着色器只按密度差线性放大浮力而不更新分母总质量 ρ₂ + ρ₁，在 ρ₂ = 3ρ₁ 处将界面加速度与增长率平方翻倍高估至 2.0000×。"}},k=17;function V(e){const t=1+Math.max(0,e),a=1/t;return{twoFluidInertiaRatio:t,atwoodInertiaAttenuation:a}}function G(e,o=64){const a=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),d=1/s;let i=2*a;for(let n=1;n<s;n++){const l=n*d,x=n%2===1?4:2;i+=x*(2*a*l)}return d/3*i}function B(e,o){const t=Math.max(0,Math.min(k-1,e)),a=t/(k-1),s=V(a),d=G(a,64),i=1+a,n=o?1:i;return{index:t,densityExcessU:a,twoFluidInertiaRatio:s.twoFluidInertiaRatio,atwoodInertiaAttenuation:s.atwoodInertiaAttenuation,quadratureAtwoodAttenuation:d,accelerationOvershootRatio:n,naiveOvershootRatio:i,isInertiaOvershootViolation:n>1.0001}}function A(e,o){const t=f[e],a=[];let s=0,d=0;for(let n=0;n<k;n++){const l=B(n,t.useAtwoodTwoFluidLaw);a.push(l),l.isInertiaOvershootViolation&&s++;const x=Math.abs(l.atwoodInertiaAttenuation-l.quadratureAtwoodAttenuation);x>d&&(d=x)}const i=o!==void 0?Math.max(0,Math.min(k-1,o)):t.defaultStationIndex;return{presetId:e,useAtwoodTwoFluidLaw:t.useAtwoodTwoFluidLaw,stationCount:k,selectedStation:a[i],stations:a,station4Ratio:a[4].accelerationOvershootRatio,station8Ratio:a[8].accelerationOvershootRatio,station12Ratio:a[12].accelerationOvershootRatio,station16Ratio:a[16].accelerationOvershootRatio,violatedCount:s,maxQuadratureError:d,verdict:s===0?"RAYLEIGH_TAYLOR_ATWOOD_LOCKED":"NAIVE_BOUSSINESQ_INERTIA_OVERSHOOT"}}function Q(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Rayleigh-Taylor Stratified Two-Fluid Plume Metrology Plinth"}),o.push({id:"atwood-rail-front",kind:"atwood_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Rayleigh-Taylor Atwood Lock Rail (a_active / a_RT = 1.0000×)"}),o.push({id:"atwood-rail-back",kind:"atwood_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Coupled Two-Fluid Inertia Rail ((ρ₂ + ρ₁) / (2ρ₁) = 1 + u)"});for(const t of e.stations){const a=(t.index-8)*30,s=22*t.twoFluidInertiaRatio,d=44*t.atwoodInertiaAttenuation,i=36*t.accelerationOvershootRatio;o.push({id:`two-fluid-inertia-column-${t.index}`,kind:"two_fluid_inertia_column",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Two-Fluid Inertia (ρ₂+ρ₁)/(2ρ₁) = ${t.twoFluidInertiaRatio.toFixed(4)}×`}),o.push({id:`rayleigh-taylor-plume-cap-${t.index}`,kind:"rayleigh_taylor_plume_cap",stationIndex:t.index,x:a,y:d*.5-8,z:0,w:14,h:d,d:14,tone:e.useAtwoodTwoFluidLaw?"teal":"slate",label:`Station ${t.index} Atwood Factor 2ρ₁/(ρ₂+ρ₁) = ${t.atwoodInertiaAttenuation.toFixed(4)}×`}),o.push({id:`acceleration-overshoot-gauge-${t.index}`,kind:"acceleration_overshoot_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.accelerationOvershootRatio),h:i,d:12,tone:t.isInertiaOvershootViolation?"crimson":"teal",label:`Station ${t.index} Acceleration Ratio a/a_RT = ${t.accelerationOvershootRatio.toFixed(4)}×`})}return o.push({id:"tank-collar-left",kind:"stratified_tank_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Boussinesq Limit Gate (ρ₂ → ρ₁, (ρ₂+ρ₁)/(2ρ₁) = 1.000)"}),o.push({id:"tank-collar-right",kind:"stratified_tank_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useAtwoodTwoFluidLaw?"teal":"crimson",label:"High-Atwood Plume Gate (ρ₂ = 3ρ₁, A = 0.500, 2ρ₁/(ρ₂+ρ₁) = 0.500)"}),o.push({id:"growth-bar-top",kind:"dispersion_growth_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Rayleigh-Taylor Dispersion: γ² = A g k = [(ρ₂ − ρ₁)/(ρ₂ + ρ₁)] g k"}),o.push({id:"growth-bar-front",kind:"dispersion_growth_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useAtwoodTwoFluidLaw?"teal":"crimson",label:"Atwood Acceleration Lock Line (a_active / a_RT = 1.0000×)"}),o}const M=new URLSearchParams(window.location.search),F=M.get("preset"),W=M.get("theme")==="light"?"light":"dark";let r=F&&F in f?F:"rayleigh_taylor_atwood_two_fluid_lock",c=f[r].defaultStationIndex,b=W;document.documentElement.setAttribute("data-theme",b);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 214 · 224TH DEMO · STRATIFIED TWO-FLUID RAYLEIGH-TAYLOR ATWOOD INSTABILITY METROLOGY</span>
        <h1>Rayleigh-Taylor Atwood Buoyant Plume Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Rayleigh-Taylor Plume Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="rayleigh_taylor_atwood_two_fluid_lock"
      >
        Rayleigh-Taylor Atwood A = (ρ₂−ρ₁)/(ρ₂+ρ₁) Law (a / a_RT = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_boussinesq_fixed_inertia_overshoot"
      >
        Naive Boussinesq Fixed Inertia 2ρ₁ (Overshoot = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED INERTIA (ρ₂+ρ₁)/2ρ₁ / ATWOOD FACTOR</span>
        <strong id="kpi-atwood" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">ACCELERATION RATIO (a_active / a_RT)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 ACCELERATION RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">(ρ₂+ρ₁)/2ρ₁ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">INERTIA OVERSHOOT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC RAYLEIGH-TAYLOR ATWOOD PLUME RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Rayleigh-Taylor Atwood buoyant plume rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Two-Fluid Density Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, ρ₂ = 3.000 ρ₁)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION ATWOOD A = (ρ₂−ρ₁)/(ρ₂+ρ₁) VS BOUSSINESQ LEDGER</span>
          <span>γ² = A g k</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>(ρ₂+ρ₁)/2ρ₁</th>
                <th>2ρ₁/(ρ₂+ρ₁)</th>
                <th>KE Quad</th>
                <th>a / a_RT</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const z=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),K=document.querySelector("#kpi-atwood"),j=document.querySelector("#kpi-quad"),C=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),q=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),O=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),P=document.querySelector("#station-tbody"),N=document.querySelector("#theme-toggle");function g(e,o,t){const a=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[a,s]}function at(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,o,t,a,s,d,i,n,l,x,D){const u=a*.5,p=s*.5,h=d*.5,E=g(e+u,o-p,t-h),T=g(e+u,o-p,t+h),S=g(e-u,o-p,t+h),m=g(e-u,o+p,t-h),v=g(e+u,o+p,t-h),w=g(e+u,o+p,t+h),I=g(e-u,o+p,t+h),y=at(i,l),_=n?1.8:.7,$=n?"#ffffff":y.stroke,H=`${m[0].toFixed(1)},${m[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)}`,U=`${S[0].toFixed(1)},${S[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)}`,Y=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${x}" data-solid-kind="${D}">
      <polygon points="${U}" fill="${y.left}" stroke="${$}" stroke-width="${_}" />
      <polygon points="${Y}" fill="${y.right}" stroke="${$}" stroke-width="${_}" />
      <polygon points="${H}" fill="${y.top}" stroke="${$}" stroke-width="${_}" />
    </g>
  `}function R(e){const o=f[e.presetId],t=e.selectedStation,a=b==="dark";z.textContent=o.subtitle,L.textContent=o.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,K.textContent=`(ρ₂+ρ₁)/2ρ₁ = ${t.twoFluidInertiaRatio.toFixed(4)}× (Factor = ${t.atwoodInertiaAttenuation.toFixed(4)}×)`,j.textContent=`KE Quad = ${t.quadratureAtwoodAttenuation.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,C.textContent=`${t.accelerationOvershootRatio.toFixed(4)}×`,C.className=`kpi-value ${t.isInertiaOvershootViolation?"text-danger":"text-ok"}`,X.textContent=`u = (ρ₂−ρ₁)/(2ρ₁) = ${t.densityExcessU.toFixed(4)} | A = (ρ₂−ρ₁)/(ρ₂+ρ₁)`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,q.textContent=`${e.violatedCount} / ${e.stationCount}`,q.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,O.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.densityExcessU.toFixed(3)}, ρ₂/ρ₁ = ${(1+2*t.densityExcessU).toFixed(2)}, a/a_RT = ${t.accelerationOvershootRatio.toFixed(4)}×)`;const s=Q(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const d=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);ot.innerHTML=d.map(i=>nt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),P.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",l=i.isInertiaOvershootViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.densityExcessU.toFixed(4)}</td>
          <td>${i.twoFluidInertiaRatio.toFixed(4)}×</td>
          <td>${i.atwoodInertiaAttenuation.toFixed(4)}×</td>
          <td>${i.quadratureAtwoodAttenuation.toFixed(4)}×</td>
          <td class="${l}">${i.accelerationOvershootRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__RAYLEIGH_TAYLOR_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in f&&(r=o,c=f[r].defaultStationIndex,R(A(r,c)))})});O.addEventListener("input",()=>{c=Number(O.value),R(A(r,c))});P.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(c=Number(o.getAttribute("data-station-row")),R(A(r,c)))});N.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),N.textContent=`Theme: ${b.toUpperCase()}`,R(A(r,c))});R(A(r,c));
