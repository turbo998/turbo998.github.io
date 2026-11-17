import"./modulepreload-polyfill-B5Qt9EMX.js";const S={taylor_culick_capillary_retraction_lock:{id:"taylor_culick_capillary_retraction_lock",label:"Taylor-Culick Capillary Retraction Law (v_TC = √(2σ / ρh), Ratio = 1.0000×)",labelZh:"Taylor-Culick 毛细液膜回缩定律（v_TC = √(2σ / ρh)，动量通量比恒锁 1.0000×）",subtitle:"Balances雙面表面张力牵引 2σ against swept rim mass flux dm/dt = ρh v_TC so v_TC ∝ h^(-1/2), locking momentum-flux ratio (ρhv²)/(2σ) = 1.0000× across all 17 thickness stations.",subtitleZh:"将双面表面张力牵引 2σ 与液膜边缘卷吸质量流率 dm/dt = ρh v_TC 动量守恒配平（v_TC ∝ h^(-1/2)），在全 17 站恒定锁死毛细动量通量比 (ρhv²)/(2σ) = 1.0000×。",useTaylorCulickScaling:!0,defaultStationIndex:16,badge:"TAYLOR-CULICK LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"毛细回缩锁死 · 1.0000×（0/17 动量超冲站）",description:"G. I. Taylor (1959) and F. E. C. Culick (1960) proved that a puncturing liquid sheet or soap film retracts at v_TC = √(2σ / (ρh)), slowing down as 1/√(1+u) in thicker regions to conserve momentum.",descriptionZh:"G. I. Taylor（1959）与 F. E. C. Culick（1960）严格证明：破裂肥皂泡与水花液膜的自由边缘回缩速度为 v_TC = √(2σ / (ρh))，随膜厚 h = h₀(1+u) 按 1/√(1+u) 减速以严格满足动量守恒。"},naive_constant_speed_hole_rupture:{id:"naive_constant_speed_hole_rupture",label:"Naive Constant-Speed Hole Rupture (v = v₀, Momentum Excess = 1 + u up to 2.0000×)",labelZh:"朴素恒速破洞扩张（v = v₀，动量通量按 1+u 超冲至 2.0000×）",subtitle:"Drives hole radius expansion at fixed speed v = v₀ regardless of film thickness h = h₀(1+u), inflating momentum flux by 1 + u to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"无视液膜厚度梯度 h = h₀(1+u) 强行以恒定速度 v = v₀ 扩大破洞半径，使边缘动量通量在第 4 站超冲至 1.2500×、第 8 站 1.5000×、第 16 站（两倍膜厚）翻倍至 2.0000×。",useTaylorCulickScaling:!1,defaultStationIndex:16,badge:"MOMENTUM EXCESS · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"动量违背 · 最高 2.0000×（16/17 站违背）",description:"Naive bubble-pop and splash-sheet shaders expand alpha-clip holes at constant speed v₀, making thick viscous liquid sheets tear open just as fast as nanometer-thin soap films.",descriptionZh:"朴素肥皂泡破裂与水幕穿孔着色器用固定速度 v₀ 驱动 Alpha 裁切圆孔扩张，导致厚重水帘底部与纳米级薄顶膜以相同速度机械撕裂，彻底丧失流体厚重感。"}},v=17;function D(e){const t=1+Math.max(0,e),o=1/t;return{sheetThicknessRatio:t,retractionSpeedRatio:Math.sqrt(o),retractionSpeedSqRatio:o}}function K(e,i=64){const o=1/(1+Math.max(0,e)),s=Math.max(2,i%2===0?i:i+1),l=1/s;let a=0+2*o;for(let n=1;n<s;n++){const r=n*l,b=n%2===1?4:2;a+=b*(2*r*o)}return l/3*a}function Y(e,i){const t=Math.max(0,Math.min(v-1,e)),o=t/(v-1),s=D(o),l=K(o,64),a=1+o,n=i?1:a;return{index:t,thicknessExcessU:o,sheetThicknessRatio:s.sheetThicknessRatio,retractionSpeedRatio:s.retractionSpeedRatio,retractionSpeedSqRatio:s.retractionSpeedSqRatio,quadratureSpeedSqRatio:l,momentumBalanceRatio:n,naiveMomentumExcessRatio:a,isMomentumBalanceViolation:n>1.0001}}function g(e,i){const t=S[e],o=[];let s=0,l=0;for(let n=0;n<v;n++){const r=Y(n,t.useTaylorCulickScaling);o.push(r),r.isMomentumBalanceViolation&&s++;const b=Math.abs(r.retractionSpeedSqRatio-r.quadratureSpeedSqRatio);b>l&&(l=b)}const a=i!==void 0?Math.max(0,Math.min(v-1,i)):t.defaultStationIndex;return{presetId:e,useTaylorCulickScaling:t.useTaylorCulickScaling,stationCount:v,selectedStation:o[a],stations:o,station4Ratio:o[4].momentumBalanceRatio,station8Ratio:o[8].momentumBalanceRatio,station12Ratio:o[12].momentumBalanceRatio,station16Ratio:o[16].momentumBalanceRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"TAYLOR_CULICK_MOMENTUM_LOCKED":"NAIVE_CONSTANT_SPEED_MOMENTUM_EXCESS"}}function G(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Taylor-Culick Liquid Sheet Capillary Testbed Plinth"}),i.push({id:"capillary-rail-front",kind:"capillary_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Taylor-Culick Momentum-Flux Balance Rail (ρhv²/2σ = 1.0000×)"}),i.push({id:"capillary-rail-back",kind:"capillary_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Gravity-Drained Sheet Thickness Gradient Rail (h/h₀ = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.sheetThicknessRatio,l=44*t.retractionSpeedRatio,a=36*t.momentumBalanceRatio;i.push({id:`sheet-thickness-slab-${t.index}`,kind:"sheet_thickness_slab",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Sheet Thickness h/h₀ = ${t.sheetThicknessRatio.toFixed(4)}×`}),i.push({id:`taylor-culick-rim-roller-${t.index}`,kind:"taylor_culick_rim_roller",stationIndex:t.index,x:o,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useTaylorCulickScaling?"teal":"slate",label:`Station ${t.index} Retraction Speed v_TC/v₀ = ${t.retractionSpeedRatio.toFixed(4)}×`}),i.push({id:`momentum-flux-gauge-${t.index}`,kind:"momentum_flux_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.momentumBalanceRatio),h:a,d:12,tone:t.isMomentumBalanceViolation?"crimson":"teal",label:`Station ${t.index} Momentum Balance ρhv²/2σ = ${t.momentumBalanceRatio.toFixed(4)}×`})}return i.push({id:"rupture-collar-left",kind:"rupture_collar_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Thin Crest Film Gate (h = 1.000 h₀, v = 1.000 v₀)"}),i.push({id:"rupture-collar-right",kind:"rupture_collar_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useTaylorCulickScaling?"teal":"crimson",label:"Thick Base Sheet Gate (h = 2.000 h₀, v_TC = 0.7071 v₀)"}),i.push({id:"surface-tension-bar-top",kind:"surface_tension_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Double-Interface Capillary Pull Envelope F_cap = 2σ"}),i.push({id:"surface-tension-bar-front",kind:"surface_tension_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useTaylorCulickScaling?"teal":"crimson",label:"Taylor-Culick Momentum Conservation Line (ρhv²/2σ = 1.0000×)"}),i}const w=new URLSearchParams(window.location.search),y=w.get("preset"),Z=w.get("theme")==="light"?"light":"dark";let c=y&&y in S?y:"taylor_culick_capillary_retraction_lock",d=S[c].defaultStationIndex,x=Z;document.documentElement.setAttribute("data-theme",x);const z=document.querySelector("#app");z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 195 · 205TH DEMO MILESTONE · CAPILLARY SHEET RUPTURE &amp; RIM RETRACTION METROLOGY</span>
        <h1>Taylor-Culick Liquid Sheet Rim Retraction Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${x.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Sheet Retraction Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="taylor_culick_capillary_retraction_lock"
      >
        Taylor-Culick v = √(2σ/ρh) Law (ρhv²/2σ = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_constant_speed_hole_rupture"
      >
        Naive Constant-Speed Rupture (ρhv₀²/2σ = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED THICKNESS h/h₀ / SPEED v_TC/v₀</span>
        <strong id="kpi-thickness" class="kpi-value">--</strong>
        <span id="kpi-speed-sq" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MOMENTUM BALANCE (ρhv² / 2σ)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 MOMENTUM RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">h/h₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MOMENTUM EXCESS VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC TAYLOR-CULICK SHEET RETRACTION RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Taylor-Culick liquid sheet rim retraction rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Sheet Thickness Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, h = 2.000 h₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION TAYLOR-CULICK √(2σ/ρh) VS CONSTANT-SPEED LEDGER</span>
          <span>v_TC ∝ h^(-1/2)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>h / h₀</th>
                <th>v_TC / v₀</th>
                <th>(v_TC/v₀)²</th>
                <th>ρhv² / 2σ</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),q=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-thickness"),X=document.querySelector("#kpi-speed-sq"),O=document.querySelector("#kpi-ratio"),W=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),A=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),I=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),U=document.querySelector("#station-tbody"),N=document.querySelector("#theme-toggle");function k(e,i,t){const o=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[o,s]}function ot(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,o,s,l,a,n,r,b,B){const u=o*.5,p=s*.5,h=l*.5,F=k(e+u,i-p,t-h),C=k(e+u,i-p,t+h),M=k(e-u,i-p,t+h),L=k(e-u,i+p,t-h),f=k(e+u,i+p,t-h),m=k(e+u,i+p,t+h),R=k(e-u,i+p,t+h),_=ot(a,r),E=n?1.8:.7,$=n?"#ffffff":_.stroke,P=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)}`,H=`${M[0].toFixed(1)},${M[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)}`,V=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${b}" data-solid-kind="${B}">
      <polygon points="${H}" fill="${_.left}" stroke="${$}" stroke-width="${E}" />
      <polygon points="${V}" fill="${_.right}" stroke="${$}" stroke-width="${E}" />
      <polygon points="${P}" fill="${_.top}" stroke="${$}" stroke-width="${E}" />
    </g>
  `}function T(e){const i=S[e.presetId],t=e.selectedStation,o=x==="dark";j.textContent=i.subtitle,q.textContent=i.badge,q.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`h/h₀ = ${t.sheetThicknessRatio.toFixed(4)}× (v_TC/v₀ = ${t.retractionSpeedRatio.toFixed(4)}×)`,X.textContent=`(v_TC/v₀)² = ${t.retractionSpeedSqRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,O.textContent=`${t.momentumBalanceRatio.toFixed(4)}×`,O.className=`kpi-value ${t.isMomentumBalanceViolation?"text-danger":"text-ok"}`,W.textContent=`u = h/h₀ − 1 = ${t.thicknessExcessU.toFixed(4)} | Culick 50% rim dissipation`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,A.textContent=`${e.violatedCount} / ${e.stationCount}`,A.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,I.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.thicknessExcessU.toFixed(3)}, h/h₀ = ${t.sheetThicknessRatio.toFixed(3)}×, ρhv²/2σ = ${t.momentumBalanceRatio.toFixed(4)}×)`;const s=G(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const l=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);it.innerHTML=l.map(a=>nt(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),U.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",r=a.isMomentumBalanceViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.thicknessExcessU.toFixed(4)}</td>
          <td>${a.sheetThicknessRatio.toFixed(4)}×</td>
          <td>${a.retractionSpeedRatio.toFixed(4)}×</td>
          <td>${a.retractionSpeedSqRatio.toFixed(4)}×</td>
          <td class="${r}">${a.momentumBalanceRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__TAYLOR_CULICK_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in S&&(c=i,d=S[c].defaultStationIndex,T(g(c,d)))})});I.addEventListener("input",()=>{d=Number(I.value),T(g(c,d))});U.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(d=Number(i.getAttribute("data-station-row")),T(g(c,d)))});N.addEventListener("click",()=>{x=x==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",x),N.textContent=`Theme: ${x.toUpperCase()}`,T(g(c,d))});T(g(c,d));
