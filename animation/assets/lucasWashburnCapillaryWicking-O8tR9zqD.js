import"./modulepreload-polyfill-B5Qt9EMX.js";const k={lucas_washburn_sqrt_time_wicking_lock:{id:"lucas_washburn_sqrt_time_wicking_lock",label:"Lucas-Washburn √t Capillary Wicking Law (L = √(r_p σ cosθ t / 2μ), Ratio = 1.0000×)",labelZh:"Lucas-Washburn 毛细吸湿 √t 定律（L = √(r_p σ cosθ t / 2μ)，浸润比恒锁 1.0000×）",subtitle:"Advances porous wetting front as L_LW(t) = L₀ √(t/t₀) = L₀(1+u) while wicking speed slows as 1/L, locking L_active/L_LW = 1.0000× across all 17 time stations.",subtitleZh:"计入已浸润孔道长度 L 的哈根-泊肃叶粘滞阻力，令吸湿前锋按 L_LW(t) = L₀ √(t/t₀) = L₀(1+u) 随时间平方根推进，在全 17 站恒定锁死浸润前锋比 L_active/L_LW = 1.0000×。",useLucasWashburnLaw:!0,defaultStationIndex:16,badge:"LUCAS-WASHBURN √t LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"毛细吸湿锁死 · 1.0000×（0/17 超冲站）",description:"Richard Lucas (1918) and Edward W. Washburn (1921) proved that capillary Laplace suction ΔP = 2σ cosθ / r_p balanced against viscous drag 8μL/r_p² yields L(t) ∝ √t.",descriptionZh:"Richard Lucas（1918）与 Edward W. Washburn（1921）证明：恒定毛细拉普拉斯吸力 ΔP = 2σ cosθ / r_p 与正比于液柱长度 L 的粘滞阻力配平，使布料与多孔介质浸润前锋满足 L(t) ∝ √t。"},naive_linear_time_wetting_overshoot:{id:"naive_linear_time_wetting_overshoot",label:"Naive Linear-Time Wetting Front (L ∝ t, Overshoot = 1 + u up to 2.0000×)",labelZh:"朴素匀速线性吸湿蔓延（L ∝ t，浸润高度按 1+u 超冲至 2.0000×）",subtitle:"Advances cloth/sand wetting front linearly with time L = L₀(t/t₀) = L₀(1+u)², overshooting true Lucas-Washburn height by √(t/t₀) = 1 + u to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"忽略已吸入水柱的粘滞阻力而令浸润前锋随时间线性爬升 L = L₀(t/t₀) = L₀(1+u)²，使浸润高度在第 4 站超冲至 1.2500×、第 8 站 1.5000×、第 16 站（t=4t₀）翻倍超冲至 2.0000×。",useLucasWashburnLaw:!1,defaultStationIndex:16,badge:"WETTING OVERSHOOT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"吸湿超冲 · 最高 2.0000×（16/17 站违背）",description:"Naive wet-cloth and watercolor shaders scroll the wetting mask at constant speed v₀, failing to capture the rapid initial soak followed by gradual √t capillary deceleration.",descriptionZh:"朴素淋湿布料与水彩纸晕染着色器以恒定速度 v₀ 平移湿润遮罩，丢失了毛细渗透“初段瞬吸、后段渐缓（v ∝ 1/√t）”的标志性物理节奏。"}},_=17;function G(e){const t=1+Math.max(0,e);return{elapsedTimeRatio:t*t,lucasWashburnLengthRatio:t,wickingSpeedRatio:1/t}}function B(e,i=64){const o=1+Math.max(0,e),n=Math.max(2,i%2===0?i:i+1),l=1/n;let a=0+3*o;for(let s=1;s<n;s++){const r=s*l,L=s%2===1?4:2;a+=L*(3*o*r*r)}return l/3*a}function D(e,i){const t=Math.max(0,Math.min(_-1,e)),o=t/(_-1),n=G(o),l=B(o,64),a=1+o,s=i?1:a;return{index:t,sqrtTimeExcessU:o,elapsedTimeRatio:n.elapsedTimeRatio,lucasWashburnLengthRatio:n.lucasWashburnLengthRatio,wickingSpeedRatio:n.wickingSpeedRatio,quadratureLengthRatio:l,wettingFrontRatio:s,naiveOvershootRatio:a,isWettingOvershootViolation:s>1.0001}}function f(e,i){const t=k[e],o=[];let n=0,l=0;for(let s=0;s<_;s++){const r=D(s,t.useLucasWashburnLaw);o.push(r),r.isWettingOvershootViolation&&n++;const L=Math.abs(r.lucasWashburnLengthRatio-r.quadratureLengthRatio);L>l&&(l=L)}const a=i!==void 0?Math.max(0,Math.min(_-1,i)):t.defaultStationIndex;return{presetId:e,useLucasWashburnLaw:t.useLucasWashburnLaw,stationCount:_,selectedStation:o[a],stations:o,station4Ratio:o[4].wettingFrontRatio,station8Ratio:o[8].wettingFrontRatio,station12Ratio:o[12].wettingFrontRatio,station16Ratio:o[16].wettingFrontRatio,violatedCount:n,maxQuadratureError:l,verdict:n===0?"LUCAS_WASHBURN_WICKING_LOCKED":"NAIVE_LINEAR_WETTING_OVERSHOOT"}}function Z(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Lucas-Washburn Porous Capillary Reservoir Plinth"}),i.push({id:"capillary-rail-front",kind:"capillary_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Lucas-Washburn √t Wetting Front Rail (L/L_LW = 1.0000×)"}),i.push({id:"capillary-rail-back",kind:"capillary_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Elapsed Wicking Time Rail (t/t₀ = (1 + u)²)"});for(const t of e.stations){const o=(t.index-8)*30,n=14+8*t.elapsedTimeRatio,l=26*t.lucasWashburnLengthRatio,a=36*t.wettingFrontRatio;i.push({id:`elapsed-time-pillar-${t.index}`,kind:"elapsed_time_pillar",stationIndex:t.index,x:o,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Elapsed Time t/t₀ = ${t.elapsedTimeRatio.toFixed(4)}×`}),i.push({id:`lucas-washburn-wick-column-${t.index}`,kind:"lucas_washburn_wick_column",stationIndex:t.index,x:o,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useLucasWashburnLaw?"teal":"slate",label:`Station ${t.index} Wetting Front L_LW/L₀ = ${t.lucasWashburnLengthRatio.toFixed(4)}×`}),i.push({id:`wetting-front-gauge-${t.index}`,kind:"wetting_front_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.wettingFrontRatio),h:a,d:12,tone:t.isWettingOvershootViolation?"crimson":"teal",label:`Station ${t.index} Ratio L/L_LW = ${t.wettingFrontRatio.toFixed(4)}×`})}return i.push({id:"porous-collar-left",kind:"porous_fabric_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Initial Contact Gate (t = 1.000 t₀, L = 1.000 L₀)"}),i.push({id:"porous-collar-right",kind:"porous_fabric_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useLucasWashburnLaw?"teal":"crimson",label:"Quadruple-Time Soak Gate (t = 4.000 t₀, L_LW = 2.000 L₀)"}),i.push({id:"meniscus-bar-top",kind:"meniscus_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Laplace-Poiseuille Diffusion Envelope L²(t) = (r_p σ cosθ / 2μ) t"}),i.push({id:"meniscus-bar-front",kind:"meniscus_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useLucasWashburnLaw?"teal":"crimson",label:"Lucas-Washburn Wetting Lock Line (L_active / L_LW = 1.0000×)"}),i}const q=new URLSearchParams(window.location.search),F=q.get("preset"),K=q.get("theme")==="light"?"light":"dark";let d=F&&F in k?F:"lucas_washburn_sqrt_time_wicking_lock",c=k[d].defaultStationIndex,g=K;document.documentElement.setAttribute("data-theme",g);const z=document.querySelector("#app");z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 199 · 209TH DEMO · POROUS CAPILLARY WICKING &amp; CLOTH WETTING FRONT METROLOGY</span>
        <h1>Lucas-Washburn Capillary Porous Wicking Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Capillary Wicking Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="lucas_washburn_sqrt_time_wicking_lock"
      >
        Lucas-Washburn L ∝ √t Law (L/L_LW = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_linear_time_wetting_overshoot"
      >
        Naive Linear-Time Wicking (L/L_LW = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED TIME t/t₀ / FRONT L_LW/L₀</span>
        <strong id="kpi-time" class="kpi-value">--</strong>
        <span id="kpi-speed" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">WETTING FRONT RATIO (L / L_LW)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 FRONT RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">t/t₀ = 1.5625 / 2.2500 / 4.0000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">WICKING OVERSHOOT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC LUCAS-WASHBURN WICKING RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Lucas-Washburn capillary porous wicking rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Elapsed Wicking Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, t = 4.000 t₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION LUCAS-WASHBURN √t VS LINEAR-TIME LEDGER</span>
          <span>L² = (r_p σ cosθ / 2μ) t</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>t / t₀</th>
                <th>L_LW / L₀</th>
                <th>v(t) / v₀</th>
                <th>L / L_LW</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),O=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-time"),j=document.querySelector("#kpi-speed"),y=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),A=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),T=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),U=document.querySelector("#station-tbody"),N=document.querySelector("#theme-toggle");function b(e,i,t){const o=(e-t*.55)*.88,n=-i+(e*.18+t*.42)*.55;return[o,n]}function ot(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,i,t,o,n,l,a,s,r,L,M){const u=o*.5,p=n*.5,h=l*.5,E=b(e+u,i-p,t-h),R=b(e+u,i-p,t+h),I=b(e-u,i-p,t+h),C=b(e-u,i+p,t-h),W=b(e+u,i+p,t-h),x=b(e+u,i+p,t+h),w=b(e-u,i+p,t+h),S=ot(a,r),m=s?1.8:.7,$=s?"#ffffff":S.stroke,P=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${W[0].toFixed(1)},${W[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)}`,H=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)}`,V=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${W[0].toFixed(1)},${W[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${L}" data-solid-kind="${M}">
      <polygon points="${H}" fill="${S.left}" stroke="${$}" stroke-width="${m}" />
      <polygon points="${V}" fill="${S.right}" stroke="${$}" stroke-width="${m}" />
      <polygon points="${P}" fill="${S.top}" stroke="${$}" stroke-width="${m}" />
    </g>
  `}function v(e){const i=k[e.presetId],t=e.selectedStation,o=g==="dark";Q.textContent=i.subtitle,O.textContent=i.badge,O.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`t/t₀ = ${t.elapsedTimeRatio.toFixed(4)}× (L_LW/L₀ = ${t.lucasWashburnLengthRatio.toFixed(4)}×)`,j.textContent=`v(t)/v₀ = ${t.wickingSpeedRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,y.textContent=`${t.wettingFrontRatio.toFixed(4)}×`,y.className=`kpi-value ${t.isWettingOvershootViolation?"text-danger":"text-ok"}`,X.textContent=`u = √(t/t₀) − 1 = ${t.sqrtTimeExcessU.toFixed(4)} | L dL/dt = D_w/2`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,A.textContent=`${e.violatedCount} / ${e.stationCount}`,A.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,T.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.sqrtTimeExcessU.toFixed(3)}, t/t₀ = ${t.elapsedTimeRatio.toFixed(3)}×, L/L_LW = ${t.wettingFrontRatio.toFixed(4)}×)`;const n=Z(e);et.textContent=`${n.length} solids · ${e.stationCount} stations`;const l=[...n].sort((a,s)=>a.z-s.z||a.y-s.y||a.x-s.x);it.innerHTML=l.map(a=>st(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),U.innerHTML=e.stations.map(a=>{const s=a.index===t.index?"row-selected":"",r=a.isWettingOvershootViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.sqrtTimeExcessU.toFixed(4)}</td>
          <td>${a.elapsedTimeRatio.toFixed(4)}×</td>
          <td>${a.lucasWashburnLengthRatio.toFixed(4)}×</td>
          <td>${a.wickingSpeedRatio.toFixed(4)}×</td>
          <td class="${r}">${a.wettingFrontRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const s=a.getAttribute("data-preset");a.classList.toggle("active",s===e.presetId)}),window.__LUCAS_WASHBURN_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in k&&(d=i,c=k[d].defaultStationIndex,v(f(d,c)))})});T.addEventListener("input",()=>{c=Number(T.value),v(f(d,c))});U.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),v(f(d,c)))});N.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),N.textContent=`Theme: ${g.toUpperCase()}`,v(f(d,c))});v(f(d,c));
