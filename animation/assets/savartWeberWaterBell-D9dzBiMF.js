import"./modulepreload-polyfill-B5Qt9EMX.js";const S={savart_taylor_weber_sheet_radius_lock:{id:"savart_taylor_weber_sheet_radius_lock",label:"Savart-Taylor Weber Water-Bell Law (R_bell = ρQv₀ / (4πσ), R/R_Savart = 1.0000×)",labelZh:"Savart-Taylor 萨瓦尔-泰勒水钟薄片扩张定律（R_bell = ρQv₀ / (4πσ)，半径比恒锁 1.0000×）",subtitle:"Contracts the maximum liquid-sheet umbrella radius inversely with surface tension as R_bell = R₀ / (1 + u), locking R_active / R_Savart = 1.0000× across all 17 stations.",subtitleZh:"平衡射流径向动量通量 ρQv₀ 与双面液膜毛细环向拉力 4πσR_bell，令水钟最大扩张半径按 R₀/(1+u) 随表面张力反比收缩，在全 17 站恒定锁死半径比 1.0000×。",useSavartWeberLaw:!0,defaultStationIndex:16,badge:"SAVART WATER BELL LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"萨瓦尔水钟锁死 · 1.0000×（0/17 超冲站）",description:"Félix Savart (1833) and G. I. Taylor (1959) proved that an impinging jet expands into a liquid sheet whose rim stops where h(R) reaches the Taylor-Culick sonic thickness, R_bell = ρ Q v₀ / (4πσ).",descriptionZh:"Félix Savart（1833）与 G. I. Taylor（1959）严格证明：撞击圆盘的液流展开为薄片水钟，其外缘在液膜减薄至 Taylor-Culick 声速极限处终止，最大半径 R_bell = ρ Q v₀ / (4πσ)。"},naive_unscaled_capillary_sheet_overshoot:{id:"naive_unscaled_capillary_sheet_overshoot",label:"Naive Unscaled Capillary Sheet (R = R₀, Overshoot = 1 + u up to 2.0000×)",labelZh:"朴素忽略毛细拉力定常水伞（R = R₀，水钟半径按 1+u 超冲至 2.0000×）",subtitle:"Fixes the liquid-sheet umbrella radius at R₀ regardless of two-sided surface tension 2σ(u), overshooting the Savart-Taylor rim by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"忽略双面表面张力 2σ 对径向动量的毛细勒束，将水伞半径写死为 R₀，使扩张半径在第 4 站超冲至 1.2500×、第 8 站冲至 1.5000×、第 16 站翻倍超冲至 2.0000×（面积膨胀 4 倍）。",useSavartWeberLaw:!1,defaultStationIndex:16,badge:"RADIUS OVERSHOOT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"水钟超冲 · 最高 2.0000×（16/17 站违背）",description:"Naive splash shaders emit radial water sheets with fixed radius regardless of fluid surface tension or Weber number, inflating sheet area 4× at 2× surface tension.",descriptionZh:"朴素水花着色器按固定半径向外发射水伞贴图而忽略液体表面张力与韦伯数 We，导致在两倍表面张力下水伞半径超冲 2.0000×、液膜面积虚胖 4.0000×。"}},f=17;function D(e){const t=1+Math.max(0,e),o=1/t;return{surfaceTensionRatio:t,savartBellRadiusRatio:o}}function z(e,a=64){const o=1/(1+Math.max(0,e)),l=Math.max(2,a%2===0?a:a+1),n=1/l;let i=2*o;for(let s=1;s<l;s++){const r=s*n,v=s%2===1?4:2;i+=v*(2*o*r)}return n/3*i}function P(e,a){const t=Math.max(0,Math.min(f-1,e)),o=t/(f-1),l=D(o),n=z(o,64),i=1+o,s=a?1:i;return{index:t,capillaryExcessU:o,surfaceTensionRatio:l.surfaceTensionRatio,savartBellRadiusRatio:l.savartBellRadiusRatio,quadratureBellRadiusRatio:n,bellRadiusOvershootRatio:s,naiveOvershootRatio:i,isRadiusOvershootViolation:s>1.0001}}function g(e,a){const t=S[e],o=[];let l=0,n=0;for(let s=0;s<f;s++){const r=P(s,t.useSavartWeberLaw);o.push(r),r.isRadiusOvershootViolation&&l++;const v=Math.abs(r.savartBellRadiusRatio-r.quadratureBellRadiusRatio);v>n&&(n=v)}const i=a!==void 0?Math.max(0,Math.min(f-1,a)):t.defaultStationIndex;return{presetId:e,useSavartWeberLaw:t.useSavartWeberLaw,stationCount:f,selectedStation:o[i],stations:o,station4Ratio:o[4].bellRadiusOvershootRatio,station8Ratio:o[8].bellRadiusOvershootRatio,station12Ratio:o[12].bellRadiusOvershootRatio,station16Ratio:o[16].bellRadiusOvershootRatio,violatedCount:l,maxQuadratureError:n,verdict:l===0?"SAVART_WEBER_WATER_BELL_LOCKED":"NAIVE_UNSCALED_SHEET_RADIUS_OVERSHOOT"}}function H(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Savart-Taylor Impinging Jet Water-Bell Plinth"}),a.push({id:"weber-rail-front",kind:"weber_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Savart-Taylor Sheet Rim Lock Rail (R_active / R_Savart = 1.0000×)"}),a.push({id:"weber-rail-back",kind:"weber_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Two-Sided Capillary Tension Rail (2σ / 2σ₀ = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,l=22*t.surfaceTensionRatio,n=44*t.savartBellRadiusRatio,i=36*t.bellRadiusOvershootRatio;a.push({id:`surface-tension-column-${t.index}`,kind:"surface_tension_column",stationIndex:t.index,x:o,y:l*.5-8,z:-56,w:14,h:l,d:14,tone:"amber",label:`Station ${t.index} Capillary Tension σ/σ₀ = ${t.surfaceTensionRatio.toFixed(4)}×`}),a.push({id:`savart-bell-radius-disc-${t.index}`,kind:"savart_bell_radius_disc",stationIndex:t.index,x:o,y:n*.5-8,z:0,w:14,h:n,d:14,tone:e.useSavartWeberLaw?"teal":"slate",label:`Station ${t.index} Savart Radius R_bell/R₀ = ${t.savartBellRadiusRatio.toFixed(4)}×`}),a.push({id:`radius-overshoot-gauge-${t.index}`,kind:"radius_overshoot_gauge",stationIndex:t.index,x:o,y:i*.5-8,z:56,w:Math.min(24,12*t.bellRadiusOvershootRatio),h:i,d:12,tone:t.isRadiusOvershootViolation?"crimson":"teal",label:`Station ${t.index} Overshoot Ratio R/R_Savart = ${t.bellRadiusOvershootRatio.toFixed(4)}×`})}return a.push({id:"nozzle-collar-left",kind:"deflector_nozzle_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Baseline Deflector Disk (σ = 1.000 σ₀, R_bell = 1.000 R₀)"}),a.push({id:"nozzle-collar-right",kind:"deflector_nozzle_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useSavartWeberLaw?"teal":"crimson",label:"High-Capillary Rim Gate (σ = 2.000 σ₀, R_bell = 0.500 R₀)"}),a.push({id:"taylor-rim-bar-top",kind:"taylor_rim_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Savart-Taylor Momentum-Capillary Balance: ρ Q v₀ = 4π σ R_bell"}),a.push({id:"taylor-rim-bar-front",kind:"taylor_rim_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useSavartWeberLaw?"teal":"crimson",label:"Water-Bell Sheet Radius Lock Line (R_active / R_Savart = 1.0000×)"}),a}const q=new URLSearchParams(window.location.search),I=q.get("preset"),G=q.get("theme")==="light"?"light":"dark";let d=I&&I in S?I:"savart_taylor_weber_sheet_radius_lock",c=S[d].defaultStationIndex,h=G;document.documentElement.setAttribute("data-theme",h);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 209 · 219TH DEMO · IMPINGING LIQUID JET SAVART-TAYLOR WATER BELL METROLOGY</span>
        <h1>Savart-Weber Liquid Bell Sheet Radial Expansion Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${h.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Water-Bell Sheet Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="savart_taylor_weber_sheet_radius_lock"
      >
        Savart-Taylor R_bell = ρQv₀/(4πσ) Law (R / R_Savart = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_unscaled_capillary_sheet_overshoot"
      >
        Naive Unscaled Capillary Sheet (Overshoot = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED TENSION σ/σ₀ / BELL RADIUS R/R₀</span>
        <strong id="kpi-bell" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BELL RADIUS RATIO (R_active / R_Savart)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 RADIUS RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">σ/σ₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">RIM OVERSHOOT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC SAVART-WEBER WATER-BELL RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Savart-Weber liquid bell sheet radial expansion rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Capillary Tension Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, σ = 2.000 σ₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION SAVART R_bell = ρQv₀/(4πσ) VS UNSCALED LEDGER</span>
          <span>ρQv₀ = 4πσ R_bell</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>σ / σ₀</th>
                <th>R_Savart / R₀</th>
                <th>Rim Quad</th>
                <th>R / R_Savart</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),A=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-bell"),K=document.querySelector("#kpi-quad"),C=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),X=document.querySelector("#kpi-stations-4816"),B=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),O=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),N=document.querySelector("#station-tbody"),W=document.querySelector("#theme-toggle");function R(e,a,t){const o=(e-t*.55)*.88,l=-a+(e*.18+t*.42)*.55;return[o,l]}function ot(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,a,t,o,l,n,i,s,r,v,V){const u=o*.5,p=l*.5,b=n*.5,F=R(e+u,a-p,t-b),k=R(e+u,a-p,t+b),L=R(e-u,a-p,t+b),w=R(e-u,a+p,t-b),$=R(e+u,a+p,t-b),x=R(e+u,a+p,t+b),E=R(e-u,a+p,t+b),T=ot(i,r),m=s?1.8:.7,y=s?"#ffffff":T.stroke,M=`${w[0].toFixed(1)},${w[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,U=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,Q=`${k[0].toFixed(1)},${k[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${v}" data-solid-kind="${V}">
      <polygon points="${U}" fill="${T.left}" stroke="${y}" stroke-width="${m}" />
      <polygon points="${Q}" fill="${T.right}" stroke="${y}" stroke-width="${m}" />
      <polygon points="${M}" fill="${T.top}" stroke="${y}" stroke-width="${m}" />
    </g>
  `}function _(e){const a=S[e.presetId],t=e.selectedStation,o=h==="dark";j.textContent=a.subtitle,A.textContent=a.badge,A.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`σ/σ₀ = ${t.surfaceTensionRatio.toFixed(4)}× (R_bell/R₀ = ${t.savartBellRadiusRatio.toFixed(4)}×)`,K.textContent=`Rim Quad = ${t.quadratureBellRadiusRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,C.textContent=`${t.bellRadiusOvershootRatio.toFixed(4)}×`,C.className=`kpi-value ${t.isRadiusOvershootViolation?"text-danger":"text-ok"}`,J.textContent=`u = σ/σ₀ − 1 = ${t.capillaryExcessU.toFixed(4)} | R_bell = ρQv₀ / (4πσ)`,X.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,B.textContent=`${e.violatedCount} / ${e.stationCount}`,B.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,O.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.capillaryExcessU.toFixed(3)}, σ/σ₀ = ${t.surfaceTensionRatio.toFixed(3)}×, R/R_Savart = ${t.bellRadiusOvershootRatio.toFixed(4)}×)`;const l=H(e);et.textContent=`${l.length} solids · ${e.stationCount} stations`;const n=[...l].sort((i,s)=>i.z-s.z||i.y-s.y||i.x-s.x);at.innerHTML=n.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,o,i.id,i.kind)).join(""),N.innerHTML=e.stations.map(i=>{const s=i.index===t.index?"row-selected":"",r=i.isRadiusOvershootViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.capillaryExcessU.toFixed(4)}</td>
          <td>${i.surfaceTensionRatio.toFixed(4)}×</td>
          <td>${i.savartBellRadiusRatio.toFixed(4)}×</td>
          <td>${i.quadratureBellRadiusRatio.toFixed(4)}×</td>
          <td class="${r}">${i.bellRadiusOvershootRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const s=i.getAttribute("data-preset");i.classList.toggle("active",s===e.presetId)}),window.__SAVART_WEBER_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in S&&(d=a,c=S[d].defaultStationIndex,_(g(d,c)))})});O.addEventListener("input",()=>{c=Number(O.value),_(g(d,c))});N.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(c=Number(a.getAttribute("data-station-row")),_(g(d,c)))});W.addEventListener("click",()=>{h=h==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",h),W.textContent=`Theme: ${h.toUpperCase()}`,_(g(d,c))});_(g(d,c));
