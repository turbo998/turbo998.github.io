import"./modulepreload-polyfill-B5Qt9EMX.js";const F={foucault_coriolis_latitude_sine_lock:{id:"foucault_coriolis_latitude_sine_lock",label:"Foucault-Coriolis Latitude Sine Law (ω = Ω sinϕ = Ω/(1+u), ω/ω_F = 1.0000×)",labelZh:"Foucault-Coriolis 傅科-科里奥利纬度正弦进动定律（ω = Ω sinϕ，进动比恒锁 1.0000×）",subtitle:"Projects planetary rotation Ω onto the local vertical normal as Ω_z = Ω sinϕ = Ω / (1 + u), locking ω_active / ω_Foucault = 1.0000× across all 17 latitude stations.",subtitleZh:"遵循 Coriolis（1835）与 Foucault（1851，巴黎先贤祠大摆）局部天顶角速度投影与高斯-博内平行移动和乐（Holonomy）定理，令水平进动角速度按 Ω sinϕ = Ω/(1+u) 随纬度衰减，在全 17 站恒定锁死进动比 1.0000×。",useFoucaultSineLaw:!0,defaultStationIndex:16,badge:"FOUCAULT SINE LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"傅科正弦锁死 · 1.0000×（0/17 超冲站）",description:"Gaspard-Gustave de Coriolis (1835) and Léon Foucault (1851) proved that a pendulum plane at latitude ϕ precesses at ω = Ω sinϕ (Coriolis parameter f = 2Ω sinϕ), taking 24h / sinϕ per full turn.",descriptionZh:"Coriolis（1835）与 Foucault（1851）严格证明：纬度 ϕ 处的傅科摆平面以角速度 ω = Ω sinϕ 进动（大气科氏参数 f = 2Ω sinϕ），旋转一整圈所需时间为 T = 24h / sinϕ。"},naive_polar_24h_precession_overestimate:{id:"naive_polar_24h_precession_overestimate",label:"Naive Latitude-Invariant 24h Polar Rate (ω = Ω, Overestimate = cscϕ = 1 + u up to 2.0000×)",labelZh:"朴素忽略纬度的 24 小时极点进动率（ω = Ω，进动速度按 cscϕ = 1+u 超冲至 2.0000×）",subtitle:"Rotates the Foucault pendulum plane or cyclone Coriolis deflection at the full polar rate Ω regardless of latitude ϕ, overestimating precession by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"无论地球仪处于哪个纬度都死按极点 24 小时转一圈（ω = Ω）来旋转傅科摆或气旋科氏力，使进动角速度在第 4 站超冲 1.2500×、第 8 站冲至 1.5000×、第 16 站（北纬 30°）翻倍超冲至 2.0000×。",useFoucaultSineLaw:!1,defaultStationIndex:16,badge:"RATE OVERESTIMATE · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"进动超冲 · 最高 2.0000×（16/17 站违背）",description:"Naive museum pendulum and planetary weather shaders hardcode a 15°/hour (24h) rotation at all latitudes, doubling the true rate at ϕ = 30° across 16/17 stations.",descriptionZh:"朴素科技馆傅科摆与行星气旋着色器在全球所有纬度写死每小时 15°（24 小时一圈）的进动率，在北纬 30°（真实周期 48 小时）处将进动率与科氏偏转力翻倍高估至 2.0000×。"}},v=17;function Z(e){const t=1+Math.max(0,e),a=1/t;return{cosecantLatitudeRatio:t,foucaultPrecessionRatio:a}}function z(e,o=64){const a=1/(1+Math.max(0,e)),n=Math.max(2,o%2===0?o:o+1),l=1/n;let i=2*a;for(let s=1;s<n;s++){const c=s*l,f=s%2===1?4:2;i+=f*(2*a*c)}return l/3*i}function Q(e,o){const t=Math.max(0,Math.min(v-1,e)),a=t/(v-1),n=Z(a),l=z(a,64),i=1+a,s=o?1:i;return{index:t,cosecantLatitudeExcessU:a,cosecantLatitudeRatio:n.cosecantLatitudeRatio,foucaultPrecessionRatio:n.foucaultPrecessionRatio,quadratureHolonomyRatio:l,precessionOverestimateRatio:s,naiveOverestimateRatio:i,isPrecessionOverestimateViolation:s>1.0001}}function S(e,o){const t=F[e],a=[];let n=0,l=0;for(let s=0;s<v;s++){const c=Q(s,t.useFoucaultSineLaw);a.push(c),c.isPrecessionOverestimateViolation&&n++;const f=Math.abs(c.foucaultPrecessionRatio-c.quadratureHolonomyRatio);f>l&&(l=f)}const i=o!==void 0?Math.max(0,Math.min(v-1,o)):t.defaultStationIndex;return{presetId:e,useFoucaultSineLaw:t.useFoucaultSineLaw,stationCount:v,selectedStation:a[i],stations:a,station4Ratio:a[4].precessionOverestimateRatio,station8Ratio:a[8].precessionOverestimateRatio,station12Ratio:a[12].precessionOverestimateRatio,station16Ratio:a[16].precessionOverestimateRatio,violatedCount:n,maxQuadratureError:l,verdict:n===0?"FOUCAULT_CORIOLIS_PRECESSION_LOCKED":"NAIVE_POLAR_PRECESSION_OVERESTIMATE"}}function D(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Foucault Panthéon & Coriolis Geostrophic Metrology Plinth"}),o.push({id:"pantheon-rail-front",kind:"pantheon_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Foucault-Coriolis Sine Lock Rail (ω_active / ω_Foucault = 1.0000×)"}),o.push({id:"pantheon-rail-back",kind:"pantheon_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Cosecant Precession Period Rail (cscϕ = T / 24h = 1 + u)"});for(const t of e.stations){const a=(t.index-8)*30,n=22*t.cosecantLatitudeRatio,l=44*t.foucaultPrecessionRatio,i=36*t.precessionOverestimateRatio;o.push({id:`cosecant-period-column-${t.index}`,kind:"cosecant_period_column",stationIndex:t.index,x:a,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Cosecant Period cscϕ = ${t.cosecantLatitudeRatio.toFixed(4)}×`}),o.push({id:`foucault-sine-dial-${t.index}`,kind:"foucault_sine_dial",stationIndex:t.index,x:a,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useFoucaultSineLaw?"teal":"slate",label:`Station ${t.index} Foucault Rate ω/Ω = sinϕ = ${t.foucaultPrecessionRatio.toFixed(4)}×`}),o.push({id:`precession-overestimate-gauge-${t.index}`,kind:"precession_overestimate_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.precessionOverestimateRatio),h:i,d:12,tone:t.isPrecessionOverestimateViolation?"crimson":"teal",label:`Station ${t.index} Rate Ratio ω/ω_Foucault = ${t.precessionOverestimateRatio.toFixed(4)}×`})}return o.push({id:"latitude-collar-left",kind:"latitude_parallel_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"North Pole Gate (ϕ = 90°, sinϕ = 1.000, T = 24.0 h)"}),o.push({id:"latitude-collar-right",kind:"latitude_parallel_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useFoucaultSineLaw?"teal":"crimson",label:"30° Latitude Gate (ϕ = 30°, sinϕ = 0.500, T = 48.0 h)"}),o.push({id:"holonomy-bar-top",kind:"gauss_bonnet_holonomy_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Foucault & Gauss-Bonnet Holonomy: ω = Ω sinϕ,  Δα = 2π sinϕ"}),o.push({id:"holonomy-bar-front",kind:"gauss_bonnet_holonomy_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useFoucaultSineLaw?"teal":"crimson",label:"Foucault Precession Lock Line (ω_active / ω_Foucault = 1.0000×)"}),o}const N=new URLSearchParams(window.location.search),C=N.get("preset"),B=N.get("theme")==="light"?"light":"dark";let r=C&&C in F?C:"foucault_coriolis_latitude_sine_lock",d=F[r].defaultStationIndex,x=B;document.documentElement.setAttribute("data-theme",x);const j=document.querySelector("#app");j.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 218 · 228TH DEMO · ROTATING SPHERE FOUCAULT PENDULUM &amp; CORIOLIS PARAMETER METROLOGY</span>
        <h1>Foucault-Coriolis Latitude Sine Precession Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${x.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Foucault Precession Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="foucault_coriolis_latitude_sine_lock"
      >
        Foucault-Coriolis ω = Ω sinϕ Law (ω / ω_F = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_polar_24h_precession_overestimate"
      >
        Naive Polar 24h Rate ω = Ω (Overestimate = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED COSECANT cscϕ / FOUCAULT RATE sinϕ</span>
        <strong id="kpi-foucault" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PRECESSION RATIO (ω_active / ω_Foucault)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 PRECESSION RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">cscϕ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PRECESSION OVERESTIMATE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC FOUCAULT-CORIOLIS PRECESSION RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Foucault-Coriolis latitude sine precession rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Cosecant Latitude Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, ϕ = 30.0°, sinϕ = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION FOUCAULT ω = Ω sinϕ VS POLAR 24H LEDGER</span>
          <span>f = 2Ω sinϕ</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>cscϕ</th>
                <th>ω_F / Ω</th>
                <th>Holonomy Quad</th>
                <th>ω / ω_F</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),y=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-foucault"),W=document.querySelector("#kpi-quad"),A=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),w=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),L=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),U=document.querySelector("#theme-toggle");function b(e,o,t){const a=(e-t*.55)*.88,n=-o+(e*.18+t*.42)*.55;return[a,n]}function at(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,o,t,a,n,l,i,s,c,f,M){const u=a*.5,p=n*.5,h=l*.5,I=b(e+u,o-p,t-h),R=b(e+u,o-p,t+h),T=b(e-u,o-p,t+h),P=b(e-u,o+p,t-h),m=b(e+u,o+p,t-h),g=b(e+u,o+p,t+h),_=b(e-u,o+p,t+h),$=at(i,c),E=s?1.8:.7,O=s?"#ffffff":$.stroke,H=`${P[0].toFixed(1)},${P[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,V=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,G=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${f}" data-solid-kind="${M}">
      <polygon points="${V}" fill="${$.left}" stroke="${O}" stroke-width="${E}" />
      <polygon points="${G}" fill="${$.right}" stroke="${O}" stroke-width="${E}" />
      <polygon points="${H}" fill="${$.top}" stroke="${O}" stroke-width="${E}" />
    </g>
  `}function k(e){const o=F[e.presetId],t=e.selectedStation,a=x==="dark";K.textContent=o.subtitle,y.textContent=o.badge,y.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`cscϕ = ${t.cosecantLatitudeRatio.toFixed(4)}× (ω/Ω = sinϕ = ${t.foucaultPrecessionRatio.toFixed(4)}×)`,W.textContent=`Holonomy Quad = ${t.quadratureHolonomyRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,A.textContent=`${t.precessionOverestimateRatio.toFixed(4)}×`,A.className=`kpi-value ${t.isPrecessionOverestimateViolation?"text-danger":"text-ok"}`,X.textContent=`u = cscϕ − 1 = ${t.cosecantLatitudeExcessU.toFixed(4)} | ω = Ω sinϕ`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,w.textContent=`${e.violatedCount} / ${e.stationCount}`,w.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,L.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.cosecantLatitudeExcessU.toFixed(3)}, sinϕ = ${t.foucaultPrecessionRatio.toFixed(3)}, ω/ω_F = ${t.precessionOverestimateRatio.toFixed(4)}×)`;const n=D(e);et.textContent=`${n.length} solids · ${e.stationCount} stations`;const l=[...n].sort((i,s)=>i.z-s.z||i.y-s.y||i.x-s.x);ot.innerHTML=l.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),q.innerHTML=e.stations.map(i=>{const s=i.index===t.index?"row-selected":"",c=i.isPrecessionOverestimateViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.cosecantLatitudeExcessU.toFixed(4)}</td>
          <td>${i.cosecantLatitudeRatio.toFixed(4)}×</td>
          <td>${i.foucaultPrecessionRatio.toFixed(4)}×</td>
          <td>${i.quadratureHolonomyRatio.toFixed(4)}×</td>
          <td class="${c}">${i.precessionOverestimateRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const s=i.getAttribute("data-preset");i.classList.toggle("active",s===e.presetId)}),window.__FOUCAULT_CORIOLIS_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in F&&(r=o,d=F[r].defaultStationIndex,k(S(r,d)))})});L.addEventListener("input",()=>{d=Number(L.value),k(S(r,d))});q.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(d=Number(o.getAttribute("data-station-row")),k(S(r,d)))});U.addEventListener("click",()=>{x=x==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",x),U.textContent=`Theme: ${x.toUpperCase()}`,k(S(r,d))});k(S(r,d));
