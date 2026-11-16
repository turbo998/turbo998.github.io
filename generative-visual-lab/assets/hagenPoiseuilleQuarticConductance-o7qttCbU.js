import"./modulepreload-polyfill-B5Qt9EMX.js";const g={hagen_poiseuille_quartic_r4_conductance_lock:{id:"hagen_poiseuille_quartic_r4_conductance_lock",label:"Hagen-Poiseuille Quartic R⁴ Law (Q = πΔp R⁴ / (8μL), Q_ex/Q = 1.0000×)",labelZh:"Hagen-Poiseuille 哈根-泊肃叶四次方流导定律（Q = πΔp R⁴/(8μL)，流量比恒锁 1.0000×）",subtitle:"Scales mean parabolic speed as v̄ ∝ R² and area as A ∝ R² so total volumetric conductance grows as Q ∝ R⁴ = (1 + u)², locking Q_exact / Q_model = 1.0000× across all 17 stations.",subtitleZh:"同时计入管腔横截面积 A ∝ R² 与抛物线层流平均流速 v̄ = Δp R²/(8μL) ∝ R²，令体积流量按四次方 Q ∝ R⁴ = (1+u)² 放大，在全 17 站恒定锁死流量比 1.0000×。",useQuarticPoiseuilleLaw:!0,defaultStationIndex:16,badge:"POISEUILLE R⁴ LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"泊肃叶四次方锁死 · 1.0000×（0/17 亏损站）",description:"Gotthilf Hagen (1839) and Jean Léonard Marie Poiseuille (1840) proved that laminar viscous pipe flow integrates the parabolic profile v(r) = (Δp/4μL)(R² − r²) to Q = (πΔp/8μL) R⁴.",descriptionZh:"Gotthilf Hagen（1839）与 Jean Poiseuille（1840）严格证明：圆管粘性层流抛物线速度剖面 v(r) = (Δp/4μL)(R² − r²) 沿截面环带积分后，体积流量严格正比于管径的四次方 R⁴。"},naive_area_proportional_plug_flow_deficit:{id:"naive_area_proportional_plug_flow_deficit",label:"Naive Area-Proportional R² Plug Flow (Q ∝ R², Deficit = (R/R₀)² = 1 + u up to 2.0000×)",labelZh:"朴素仅按截面积 R² 缩放的活塞流模型（Q ∝ R²，流量按 (R/R₀)² = 1+u 亏损至 2.0000×）",subtitle:"Scales pipe flux only with cross-sectional area A ∝ R² while keeping mean velocity v̄ constant, underestimating true R⁴ Poiseuille flow by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"只按管道截面积 A = πR² 缩放流量而忽略管径扩张带来的粘滞剪切阻力下降（v̄ ∝ R²），使真实四次方流量在第 4 站亏损 1.2500×、第 8 站亏损 1.5000×、第 16 站（R=√2 R₀, Q=4Q₀）腰斩亏损至 2.0000×。",useQuarticPoiseuilleLaw:!1,defaultStationIndex:16,badge:"FLOW DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"流导腰斩 · 最高 2.0000×（16/17 站违背）",description:"Naive vascular and microfluidic shaders scale particle spawn rate with πR² instead of R⁴, missing 50% of the flow at R = √2 R₀ across 16/17 stations.",descriptionZh:"朴素血管舒张与微流控芯片着色器仅按截面积 πR² 生成示踪粒子，在管径扩张 √2 倍（截面积翻倍、真实泊肃叶流量翻 4 倍）处丢失整整一半流量并污染 16/17 个站点。"}},_=17;function V(e){const t=1+Math.max(0,e),o=t*t;return{areaAndMeanSpeedRatio:t,quarticFlowRatio:o}}function G(e,i=64){const t=Math.max(0,e),o=(1+t)*(1+t),s=Math.max(2,i%2===0?i:i+1),l=1/s;let a=0;for(let n=1;n<s;n++){const c=n*l,f=n%2===1?4:2;a+=f*(4*o*c*(1-c*c))}return l/3*a}function Z(e,i){const t=Math.max(0,Math.min(_-1,e)),o=t/(_-1),s=V(o),l=G(o,64),a=1+o,n=i?1:a;return{index:t,areaExpansionExcessU:o,areaAndMeanSpeedRatio:s.areaAndMeanSpeedRatio,quarticFlowRatio:s.quarticFlowRatio,quadratureFlowRatio:l,conductanceDeficitRatio:n,naiveDeficitRatio:a,isConductanceDeficitViolation:n>1.0001}}function k(e,i){const t=g[e],o=[];let s=0,l=0;for(let n=0;n<_;n++){const c=Z(n,t.useQuarticPoiseuilleLaw);o.push(c),c.isConductanceDeficitViolation&&s++;const f=Math.abs(c.quarticFlowRatio-c.quadratureFlowRatio);f>l&&(l=f)}const a=i!==void 0?Math.max(0,Math.min(_-1,i)):t.defaultStationIndex;return{presetId:e,useQuarticPoiseuilleLaw:t.useQuarticPoiseuilleLaw,stationCount:_,selectedStation:o[a],stations:o,station4Ratio:o[4].conductanceDeficitRatio,station8Ratio:o[8].conductanceDeficitRatio,station12Ratio:o[12].conductanceDeficitRatio,station16Ratio:o[16].conductanceDeficitRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"HAGEN_POISEUILLE_QUARTIC_LOCKED":"NAIVE_PLUG_FLOW_CONDUCTANCE_DEFICIT"}}function W(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Hagen-Poiseuille Microvascular & Pipe Conductance Plinth"}),i.push({id:"poiseuille-rail-front",kind:"poiseuille_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Hagen-Poiseuille R⁴ Lock Rail (Q_exact / Q_model = 1.0000×)"}),i.push({id:"poiseuille-rail-back",kind:"poiseuille_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Vessel Area & Mean Speed Rail ((R/R₀)² = A/A₀ = v̄/v̄₀ = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.areaAndMeanSpeedRatio,l=16*t.quarticFlowRatio,a=36*t.conductanceDeficitRatio;i.push({id:`vessel-area-column-${t.index}`,kind:"vessel_area_column",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Area & Speed Ratio (R/R₀)² = ${t.areaAndMeanSpeedRatio.toFixed(4)}×`}),i.push({id:`quartic-conductance-tube-${t.index}`,kind:"quartic_conductance_tube",stationIndex:t.index,x:o,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useQuarticPoiseuilleLaw?"teal":"slate",label:`Station ${t.index} Quartic Flow Q_HP/Q₀ = ${t.quarticFlowRatio.toFixed(4)}×`}),i.push({id:`flow-deficit-gauge-${t.index}`,kind:"flow_deficit_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.conductanceDeficitRatio),h:a,d:12,tone:t.isConductanceDeficitViolation?"crimson":"teal",label:`Station ${t.index} Deficit Ratio Q_exact/Q = ${t.conductanceDeficitRatio.toFixed(4)}×`})}return i.push({id:"valve-collar-left",kind:"arteriole_valve_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Baseline Lumen Gate (R = 1.000 R₀, A = 1.000 A₀, Q = 1.000 Q₀)"}),i.push({id:"valve-collar-right",kind:"arteriole_valve_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useQuarticPoiseuilleLaw?"teal":"crimson",label:"Dilated Vessel Gate (R = √2 R₀, A = 2.000 A₀, Q_HP = 4.000 Q₀)"}),i.push({id:"shear-bar-top",kind:"parabolic_shear_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Hagen-Poiseuille Parabolic Integration: Q = (π Δp / 8μL) R⁴"}),i.push({id:"shear-bar-front",kind:"parabolic_shear_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useQuarticPoiseuilleLaw?"teal":"crimson",label:"Quartic Conductance Lock Line (Q_exact / Q_model = 1.0000×)"}),i}const D=new URLSearchParams(window.location.search),L=D.get("preset"),z=D.get("theme")==="light"?"light":"dark";let d=L&&L in g?L:"hagen_poiseuille_quartic_r4_conductance_lock",r=g[d].defaultStationIndex,b=z;document.documentElement.setAttribute("data-theme",b);const B=document.querySelector("#app");B.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 215 MILESTONE · 225TH DEMO · VISCOUS LAMINAR PIPE FLOW HAGEN-POISEUILLE QUARTIC R⁴ METROLOGY</span>
        <h1>Hagen-Poiseuille Quartic Vessel Conductance Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Pipe Conductance Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="hagen_poiseuille_quartic_r4_conductance_lock"
      >
        Hagen-Poiseuille Q = πΔpR⁴/(8μL) Law (Q_ex / Q = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_area_proportional_plug_flow_deficit"
      >
        Naive Area-Only R² Plug Flow (Deficit = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED AREA (R/R₀)² / QUARTIC FLOW Q_HP/Q₀</span>
        <strong id="kpi-flow" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FLOW DEFICIT RATIO (Q_exact / Q_model)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 DEFICIT RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">(R/R₀)² = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CONDUCTANCE DEFICIT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC HAGEN-POISEUILLE QUARTIC CONDUCTANCE RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Hagen-Poiseuille quartic vessel conductance rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Vessel Dilation Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, R = √2 R₀, Q_HP = 4.000 Q₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION POISEUILLE Q ∝ R⁴ VS PLUG-FLOW R² LEDGER</span>
          <span>Q = πΔp R⁴ / (8μL)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>(R/R₀)²</th>
                <th>Q_HP / Q₀</th>
                <th>Ring Quad</th>
                <th>Q_ex / Q</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),m=document.querySelector("#preset-badge"),K=document.querySelector("#kpi-flow"),Y=document.querySelector("#kpi-quad"),q=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),X=document.querySelector("#kpi-stations-4816"),O=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),w=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),H=document.querySelector("#station-tbody"),T=document.querySelector("#theme-toggle");function R(e,i,t){const o=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[o,s]}function ot(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,o,s,l,a,n,c,f,N){const u=o*.5,p=s*.5,x=l*.5,P=R(e+u,i-p,t-x),E=R(e+u,i-p,t+x),C=R(e-u,i-p,t+x),A=R(e-u,i+p,t-x),$=R(e+u,i+p,t-x),h=R(e+u,i+p,t+x),F=R(e-u,i+p,t+x),S=ot(a,c),I=n?1.8:.7,Q=n?"#ffffff":S.stroke,M=`${A[0].toFixed(1)},${A[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)}`,U=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)}`,y=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${f}" data-solid-kind="${N}">
      <polygon points="${U}" fill="${S.left}" stroke="${Q}" stroke-width="${I}" />
      <polygon points="${y}" fill="${S.right}" stroke="${Q}" stroke-width="${I}" />
      <polygon points="${M}" fill="${S.top}" stroke="${Q}" stroke-width="${I}" />
    </g>
  `}function v(e){const i=g[e.presetId],t=e.selectedStation,o=b==="dark";j.textContent=i.subtitle,m.textContent=i.badge,m.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,K.textContent=`(R/R₀)² = ${t.areaAndMeanSpeedRatio.toFixed(4)}× (Q_HP/Q₀ = ${t.quarticFlowRatio.toFixed(4)}×)`,Y.textContent=`Ring Quad = ${t.quadratureFlowRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,q.textContent=`${t.conductanceDeficitRatio.toFixed(4)}×`,q.className=`kpi-value ${t.isConductanceDeficitViolation?"text-danger":"text-ok"}`,J.textContent=`u = (R/R₀)² − 1 = ${t.areaExpansionExcessU.toFixed(4)} | Q ∝ R⁴`,X.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,O.textContent=`${e.violatedCount} / ${e.stationCount}`,O.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,w.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.areaExpansionExcessU.toFixed(3)}, Q_HP/Q₀ = ${t.quarticFlowRatio.toFixed(2)}×, Q_ex/Q = ${t.conductanceDeficitRatio.toFixed(4)}×)`;const s=W(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const l=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);it.innerHTML=l.map(a=>nt(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),H.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",c=a.isConductanceDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.areaExpansionExcessU.toFixed(4)}</td>
          <td>${a.areaAndMeanSpeedRatio.toFixed(4)}×</td>
          <td>${a.quarticFlowRatio.toFixed(4)}×</td>
          <td>${a.quadratureFlowRatio.toFixed(4)}×</td>
          <td class="${c}">${a.conductanceDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__HAGEN_POISEUILLE_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in g&&(d=i,r=g[d].defaultStationIndex,v(k(d,r)))})});w.addEventListener("input",()=>{r=Number(w.value),v(k(d,r))});H.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(r=Number(i.getAttribute("data-station-row")),v(k(d,r)))});T.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),T.textContent=`Theme: ${b.toUpperCase()}`,v(k(d,r))});v(k(d,r));
