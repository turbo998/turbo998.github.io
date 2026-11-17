import"./modulepreload-polyfill-B5Qt9EMX.js";const _={borda_kirchhoff_vena_contracta_lock:{id:"borda_kirchhoff_vena_contracta_lock",label:"Borda-Kirchhoff Vena Contracta Law (A_jet = C_c A₀ = A₀/(1+u), Q/Q_Borda = 1.0000×)",labelZh:"Borda-Kirchhoff 博达-基尔霍夫缩脉孔流定律（A_jet = C_c A₀ = A₀/(1+u)，流量比恒锁 1.0000×）",subtitle:"Contracts the emerging free-streamline jet cross-section by C_c = 1 / (1 + u) (reaching C_c = 0.5000 for Borda’s re-entrant mouthpiece), locking Q_active / Q_Borda = 1.0000× across all 17 stations.",subtitleZh:"平衡水箱壁静水压强缺口 ρgh A₀ 与射流动量通量 ρ A_jet v_T² = 2ρgh A_jet，令出孔自由射流截面积按缩脉系数 C_c = 1/(1+u) 收缩（博达内伸管口 C_c = 0.50），在全 17 站恒定锁死流量比 1.0000×。",useBordaContractionLaw:!0,defaultStationIndex:16,badge:"VENA CONTRACTA LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"博达缩脉锁死 · 1.0000×（0/17 超冲站）",description:"Jean-Charles de Borda (1766) and Gustav Kirchhoff (1869) proved that converging streamlines contract an orifice jet to A_jet = C_c A_orifice (C_c = 0.50 for Borda re-entrant tube, π/(π+2) ≈ 0.611 for sharp slit).",descriptionZh:"Jean-Charles de Borda（1766）与 Gustav Kirchhoff（1869）严格证明：从水箱内壁向孔口汇聚的流线具有横向惯性，迫使出孔射流收缩形成“缩脉（Vena Contracta）”，内伸博达管口的射流面积精确减半为 0.50 A₀。"},naive_full_orifice_plug_discharge_overestimate:{id:"naive_full_orifice_plug_discharge_overestimate",label:"Naive Full-Orifice Plug Discharge (C_c = 1.0000, Overestimate = 1 + u up to 2.0000×)",labelZh:"朴素满孔活塞出流模型（C_c = 1.0000，忽略流线缩脉使孔口流量按 1+u 超冲至 2.0000×）",subtitle:"Assumes the emerging jet fills 100% of the geometric hole area A₀ at Torricelli speed √(2gh), overestimating jet cross-section and discharge flux by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"假设液体以托里拆利全速 √(2gh) 100% 填满孔口几何面积 A₀ 而忽略流线向内收拢的缩脉效应，使射流截面积与流量在第 4 站超冲 1.2500×、第 8 站冲至 1.5000×、第 16 站（博达管口）翻倍超冲至 2.0000×。",useBordaContractionLaw:!1,defaultStationIndex:16,badge:"DISCHARGE OVERESTIMATE · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"孔流超冲 · 最高 2.0000×（16/17 站违背）",description:"Naive tank-leak and sluice-gate shaders spawn a jet equal to the full hole diameter at v = √(2gh), violating momentum conservation and doubling the discharge rate at C_c = 0.50 across 16/17 stations.",descriptionZh:"朴素水箱破洞与水闸泄洪着色器直接按孔洞全直径生成 v = √(2gh) 的满孔水柱，违背动量定理并在博达内伸孔口处将出流流量与反推力翻倍高估至 2.0000×。"}},x=17;function H(e){const t=1+Math.max(0,e),i=1/t;return{inverseContractionRatio:t,bordaContractionCoeff:i}}function P(e,o=64){const i=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),r=1/s;let a=2*i;for(let n=1;n<s;n++){const c=n*r,g=n%2===1?4:2;a+=g*(2*i*c)}return r/3*a}function G(e,o){const t=Math.max(0,Math.min(x-1,e)),i=t/(x-1),s=H(i),r=P(i,64),a=1+i,n=o?1:a;return{index:t,convergenceExcessU:i,inverseContractionRatio:s.inverseContractionRatio,bordaContractionCoeff:s.bordaContractionCoeff,quadratureContractionCoeff:r,dischargeOverestimateRatio:n,naiveOverestimateRatio:a,isDischargeOverestimateViolation:n>1.0001}}function v(e,o){const t=_[e],i=[];let s=0,r=0;for(let n=0;n<x;n++){const c=G(n,t.useBordaContractionLaw);i.push(c),c.isDischargeOverestimateViolation&&s++;const g=Math.abs(c.bordaContractionCoeff-c.quadratureContractionCoeff);g>r&&(r=g)}const a=o!==void 0?Math.max(0,Math.min(x-1,o)):t.defaultStationIndex;return{presetId:e,useBordaContractionLaw:t.useBordaContractionLaw,stationCount:x,selectedStation:i[a],stations:i,station4Ratio:i[4].dischargeOverestimateRatio,station8Ratio:i[8].dischargeOverestimateRatio,station12Ratio:i[12].dischargeOverestimateRatio,station16Ratio:i[16].dischargeOverestimateRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"BORDA_VENA_CONTRACTA_LOCKED":"NAIVE_FULL_ORIFICE_DISCHARGE_OVERESTIMATE"}}function K(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Borda-Kirchhoff Vena Contracta Free-Streamline Plinth"}),o.push({id:"streamline-rail-front",kind:"kirchhoff_streamline_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Borda Vena Contracta Lock Rail (Q_active / Q_Borda = 1.0000×)"}),o.push({id:"streamline-rail-back",kind:"kirchhoff_streamline_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Inverse Contraction Ratio Rail (A_orifice / A_jet = 1 / C_c = 1 + u)"});for(const t of e.stations){const i=(t.index-8)*30,s=22*t.inverseContractionRatio,r=44*t.bordaContractionCoeff,a=36*t.dischargeOverestimateRatio;o.push({id:`orifice-throat-column-${t.index}`,kind:"orifice_throat_column",stationIndex:t.index,x:i,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Inverse Contraction 1/C_c = ${t.inverseContractionRatio.toFixed(4)}×`}),o.push({id:`borda-vena-contracta-jet-${t.index}`,kind:"borda_vena_contracta_jet",stationIndex:t.index,x:i,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useBordaContractionLaw?"teal":"slate",label:`Station ${t.index} Contraction Coeff C_c = ${t.bordaContractionCoeff.toFixed(4)}×`}),o.push({id:`discharge-overestimate-gauge-${t.index}`,kind:"discharge_overestimate_gauge",stationIndex:t.index,x:i,y:a*.5-8,z:56,w:Math.min(24,12*t.dischargeOverestimateRatio),h:a,d:12,tone:t.isDischargeOverestimateViolation?"crimson":"teal",label:`Station ${t.index} Discharge Ratio Q/Q_Borda = ${t.dischargeOverestimateRatio.toFixed(4)}×`})}return o.push({id:"bulkhead-collar-left",kind:"sluice_bulkhead_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Rounded Bellmouth Gate (u = 0, C_c = 1.000, A_jet = 1.000 A₀)"}),o.push({id:"bulkhead-collar-right",kind:"sluice_bulkhead_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useBordaContractionLaw?"teal":"crimson",label:"Borda Re-Entrant Mouthpiece Gate (u = 1, C_c = 0.500, A_jet = 0.500 A₀)"}),o.push({id:"momentum-bar-top",kind:"momentum_thrust_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Borda Momentum Theorem: ρ g h A_orifice = ρ A_jet (2gh)  ⇒  C_c = 1 / 2"}),o.push({id:"momentum-bar-front",kind:"momentum_thrust_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useBordaContractionLaw?"teal":"crimson",label:"Vena Contracta Discharge Lock Line (Q_active / Q_Borda = 1.0000×)"}),o}const Q=new URLSearchParams(window.location.search),S=Q.get("preset"),U=Q.get("theme")==="light"?"light":"dark";let d=S&&S in _?S:"borda_kirchhoff_vena_contracta_lock",l=_[d].defaultStationIndex,C=U;document.documentElement.setAttribute("data-theme",C);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 222 · 232ND DEMO · FREE-STREAMLINE ORIFICE JET BORDA-KIRCHHOFF VENA CONTRACTA METROLOGY</span>
        <h1>Borda-Kirchhoff Vena Contracta Orifice Jet Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${C.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Vena Contracta Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="borda_kirchhoff_vena_contracta_lock"
      >
        Borda-Kirchhoff C_c = A_jet/A₀ = 1/(1+u) Law (Q / Q_Borda = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_full_orifice_plug_discharge_overestimate"
      >
        Naive Full-Orifice C_c = 1.0000 (Overestimate = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED 1/C_c / CONTRACTION COEFF C_c</span>
        <strong id="kpi-borda" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">DISCHARGE RATIO (Q_active / Q_Borda)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 DISCHARGE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">1/C_c = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">DISCHARGE OVERESTIMATE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC BORDA-KIRCHHOFF VENA CONTRACTA RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Borda-Kirchhoff vena contracta orifice jet rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Orifice Convergence Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, C_c = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION BORDA C_c = A_jet/A₀ VS PLUG-ORIFICE LEDGER</span>
          <span>Q = C_c A₀ √(2gh)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>1 / C_c</th>
                <th>C_c = A_jet/A₀</th>
                <th>Hodograph Quad</th>
                <th>Q / Q_Borda</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const z=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),J=document.querySelector("#kpi-borda"),Y=document.querySelector("#kpi-quad"),N=document.querySelector("#kpi-ratio"),W=document.querySelector("#kpi-excess"),X=document.querySelector("#kpi-stations-4816"),V=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),F=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),w=document.querySelector("#theme-toggle");function f(e,o,t){const i=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[i,s]}function it(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,o,t,i,s,r,a,n,c,g,D){const u=i*.5,h=s*.5,p=r*.5,I=f(e+u,o-h,t-p),m=f(e+u,o-h,t+p),T=f(e-u,o-h,t+p),B=f(e-u,o+h,t-p),A=f(e+u,o+h,t-p),b=f(e+u,o+h,t+p),R=f(e-u,o+h,t+p),$=it(a,c),E=n?1.8:.7,O=n?"#ffffff":$.stroke,y=`${B[0].toFixed(1)},${B[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)}`,M=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)}`,j=`${m[0].toFixed(1)},${m[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${D}">
      <polygon points="${M}" fill="${$.left}" stroke="${O}" stroke-width="${E}" />
      <polygon points="${j}" fill="${$.right}" stroke="${O}" stroke-width="${E}" />
      <polygon points="${y}" fill="${$.top}" stroke="${O}" stroke-width="${E}" />
    </g>
  `}function k(e){const o=_[e.presetId],t=e.selectedStation,i=C==="dark";z.textContent=o.subtitle,L.textContent=o.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,J.textContent=`1/C_c = ${t.inverseContractionRatio.toFixed(4)}× (C_c = ${t.bordaContractionCoeff.toFixed(4)}×)`,Y.textContent=`Hodograph Quad = ${t.quadratureContractionCoeff.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,N.textContent=`${t.dischargeOverestimateRatio.toFixed(4)}×`,N.className=`kpi-value ${t.isDischargeOverestimateViolation?"text-danger":"text-ok"}`,W.textContent=`u = 1/C_c − 1 = ${t.convergenceExcessU.toFixed(4)} | Q = C_c A₀ √(2gh)`,X.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,V.textContent=`${e.violatedCount} / ${e.stationCount}`,V.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,F.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.convergenceExcessU.toFixed(3)}, C_c = ${t.bordaContractionCoeff.toFixed(3)}, Q/Q_Borda = ${t.dischargeOverestimateRatio.toFixed(4)}×)`;const s=K(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);ot.innerHTML=r.map(a=>nt(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,i,a.id,a.kind)).join(""),q.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",c=a.isDischargeOverestimateViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.convergenceExcessU.toFixed(4)}</td>
          <td>${a.inverseContractionRatio.toFixed(4)}×</td>
          <td>${a.bordaContractionCoeff.toFixed(4)}×</td>
          <td>${a.quadratureContractionCoeff.toFixed(4)}×</td>
          <td class="${c}">${a.dischargeOverestimateRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__BORDA_VENA_CONTRACTA_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in _&&(d=o,l=_[d].defaultStationIndex,k(v(d,l)))})});F.addEventListener("input",()=>{l=Number(F.value),k(v(d,l))});q.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(l=Number(o.getAttribute("data-station-row")),k(v(d,l)))});w.addEventListener("click",()=>{C=C==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",C),w.textContent=`Theme: ${C.toUpperCase()}`,k(v(d,l))});k(v(d,l));
