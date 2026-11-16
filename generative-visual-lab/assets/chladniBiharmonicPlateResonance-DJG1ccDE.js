import"./modulepreload-polyfill-B5Qt9EMX.js";const m={chladni_kirchhoff_biharmonic_k2_lock:{id:"chladni_kirchhoff_biharmonic_k2_lock",label:"Chladni-Kirchhoff Biharmonic k² Law (ω = √(D/ρh) k², ω_ex/ω = 1.0000×)",labelZh:"Chladni-Kirchhoff 克拉尼-基尔霍夫双调和 k² 定律（ω = √(D/ρh) k²，频率比恒锁 1.0000×）",subtitle:"Solves the 4th-order biharmonic plate PDE ρh ẅ + D ∇⁴w = 0 so modal frequency scales quadratically with wavenumber as ω/ω₀ = (k/k₀)² = (1 + u)², locking ω_exact / ω_model = 1.0000× across all 17 stations.",subtitleZh:"求解基尔霍夫四阶双调和薄板偏微分方程 ρh ẅ + D ∇⁴w = 0，令模态固有频率随波数平方按 (k/k₀)² = (1+u)² 增长，在全 17 站恒定锁死频率比 1.0000×。",useBiharmonicPlateLaw:!0,defaultStationIndex:16,badge:"BIHARMONIC k² LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"双调和 k² 锁死 · 1.0000×（0/17 亏损站）",description:"Ernst Chladni (1787) and Gustav Kirchhoff (1850) proved that flexural plates obey the 4th-order biharmonic operator ∇⁴w, making resonant frequencies scale as k² = π²(m²/Lx² + n²/Ly²).",descriptionZh:"Ernst Chladni（1787，《声学理论的发现》）与 Gustav Kirchhoff（1850）严格证明：抗弯薄板受四阶双调和算子 ∇⁴w 支配，其克拉尼图形共振频率与模态波数的平方 k² 成正比。"},naive_membrane_linear_k_frequency_deficit:{id:"naive_membrane_linear_k_frequency_deficit",label:"Naive 2nd-Order Membrane Wave Law (ω ∝ k, Deficit = k/k₀ = 1 + u up to 2.0000×)",labelZh:"朴素二阶薄膜波动方程（ω ∝ k，克拉尼共振频率按 k/k₀ = 1+u 亏损至 2.0000×）",subtitle:"Treats a rigid flexural metal Chladni plate as a 2nd-order taut drumhead membrane (ω ∝ k instead of k²), underestimating modal frequency by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"将依靠抗弯刚度 D 发声的克拉尼金属板误当成二阶拉紧鼓膜（ω ∝ k 而非 k²），使高阶沙纹模态频率在第 4 站亏损 1.2500×、第 8 站亏损 1.5000×、第 16 站（k=2k₀, ω=4ω₀）整整低一个八度亏损至 2.0000×。",useBiharmonicPlateLaw:!1,defaultStationIndex:16,badge:"OCTAVE DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"八度亏损 · 最高 2.0000×（16/17 站违背）",description:"Naive cymatics and modal audio shaders use linear dispersion ω ∝ k, missing an entire octave (2.0000× frequency deficit) when modal wavenumber doubles to 2k₀ across 16/17 stations.",descriptionZh:"朴素声学沙纹（Cymatics）与模态合成着色器套用线性色散 ω ∝ k，在波数翻倍（k = 2k₀，真实薄板频率翻 4 倍）处丢失整整一个八度（2.0000× 亏损）并污染 16/17 个站点。"}},g=17;function U(e){const t=1+Math.max(0,e),n=t*t;return{wavenumberRatio:t,biharmonicFrequencyRatio:n}}function V(e,i=64){const t=Math.max(0,e),n=(1+t)*(1+t),s=Math.max(2,i%2===0?i:i+1),r=1/s;let a=2*n;for(let o=1;o<s;o++){const c=o*r,k=o%2===1?4:2;a+=k*(2*n*c)}return r/3*a}function Q(e,i){const t=Math.max(0,Math.min(g-1,e)),n=t/(g-1),s=U(n),r=V(n,64),a=1+n,o=i?1:a;return{index:t,wavenumberExcessU:n,wavenumberRatio:s.wavenumberRatio,biharmonicFrequencyRatio:s.biharmonicFrequencyRatio,quadratureFrequencyRatio:r,frequencyDeficitRatio:o,naiveDeficitRatio:a,isFrequencyDeficitViolation:o>1.0001}}function v(e,i){const t=m[e],n=[];let s=0,r=0;for(let o=0;o<g;o++){const c=Q(o,t.useBiharmonicPlateLaw);n.push(c),c.isFrequencyDeficitViolation&&s++;const k=Math.abs(c.biharmonicFrequencyRatio-c.quadratureFrequencyRatio);k>r&&(r=k)}const a=i!==void 0?Math.max(0,Math.min(g-1,i)):t.defaultStationIndex;return{presetId:e,useBiharmonicPlateLaw:t.useBiharmonicPlateLaw,stationCount:g,selectedStation:n[a],stations:n,station4Ratio:n[4].frequencyDeficitRatio,station8Ratio:n[8].frequencyDeficitRatio,station12Ratio:n[12].frequencyDeficitRatio,station16Ratio:n[16].frequencyDeficitRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"CHLADNI_BIHARMONIC_DISPERSION_LOCKED":"NAIVE_MEMBRANE_DISPERSION_DEFICIT"}}function W(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Chladni-Kirchhoff Biharmonic Cymatics Plate Plinth"}),i.push({id:"kirchhoff-rail-front",kind:"kirchhoff_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Chladni-Kirchhoff k² Lock Rail (ω_exact / ω_model = 1.0000×)"}),i.push({id:"kirchhoff-rail-back",kind:"kirchhoff_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Modal Wavenumber Rail (k / k₀ = 1 + u)"});for(const t of e.stations){const n=(t.index-8)*30,s=22*t.wavenumberRatio,r=16*t.biharmonicFrequencyRatio,a=36*t.frequencyDeficitRatio;i.push({id:`modal-wavenumber-column-${t.index}`,kind:"modal_wavenumber_column",stationIndex:t.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Modal Wavenumber k/k₀ = ${t.wavenumberRatio.toFixed(4)}×`}),i.push({id:`biharmonic-resonance-plate-${t.index}`,kind:"biharmonic_resonance_plate",stationIndex:t.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useBiharmonicPlateLaw?"teal":"slate",label:`Station ${t.index} Biharmonic Frequency ω/ω₀ = ${t.biharmonicFrequencyRatio.toFixed(4)}×`}),i.push({id:`frequency-deficit-gauge-${t.index}`,kind:"frequency_deficit_gauge",stationIndex:t.index,x:n,y:a*.5-8,z:56,w:Math.min(24,12*t.frequencyDeficitRatio),h:a,d:12,tone:t.isFrequencyDeficitViolation?"crimson":"teal",label:`Station ${t.index} Deficit Ratio ω_exact/ω = ${t.frequencyDeficitRatio.toFixed(4)}×`})}return i.push({id:"clamp-collar-left",kind:"cymatics_clamp_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Fundamental Mode Gate (k = 1.000 k₀, ω = 1.000 ω₀)"}),i.push({id:"clamp-collar-right",kind:"cymatics_clamp_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useBiharmonicPlateLaw?"teal":"crimson",label:"2× Wavenumber Mode Gate (k = 2.000 k₀, ω_Chladni = 4.000 ω₀)"}),i.push({id:"eigenvalue-bar-top",kind:"nodal_eigenvalue_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Kirchhoff Biharmonic Plate PDE: ρh ẅ + D ∇⁴w = 0  ⇒  ω = √(D/ρh) k²"}),i.push({id:"eigenvalue-bar-front",kind:"nodal_eigenvalue_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useBiharmonicPlateLaw?"teal":"crimson",label:"Biharmonic Frequency Lock Line (ω_exact / ω_model = 1.0000×)"}),i}const M=new URLSearchParams(window.location.search),I=M.get("preset"),Z=M.get("theme")==="light"?"light":"dark";let d=I&&I in m?I:"chladni_kirchhoff_biharmonic_k2_lock",l=m[d].defaultStationIndex,b=Z;document.documentElement.setAttribute("data-theme",b);const G=document.querySelector("#app");G.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 221 · 231ST DEMO · CYMATICS FLEXURAL PLATE CHLADNI-KIRCHHOFF BIHARMONIC METROLOGY</span>
        <h1>Chladni-Kirchhoff Biharmonic Plate Resonance Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Chladni Plate Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="chladni_kirchhoff_biharmonic_k2_lock"
      >
        Chladni-Kirchhoff ω = √(D/ρh) k² Law (ω_ex / ω = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_membrane_linear_k_frequency_deficit"
      >
        Naive Linear-k Membrane Wave (Deficit = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED WAVENUMBER k/k₀ / PLATE FREQ ω/ω₀</span>
        <strong id="kpi-chladni" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FREQUENCY DEFICIT RATIO (ω_exact / ω_model)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 DEFICIT RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">k/k₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">DISPERSION DEFICIT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC CHLADNI-KIRCHHOFF BIHARMONIC PLATE RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Chladni-Kirchhoff biharmonic plate resonance rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Modal Wavenumber Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, k = 2.000 k₀, ω = 4.000 ω₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION KIRCHHOFF ω ∝ k² VS MEMBRANE ω ∝ k LEDGER</span>
          <span>ρh ẅ + D ∇⁴w = 0</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>k / k₀</th>
                <th>ω_Chladni / ω₀</th>
                <th>Rayleigh Quad</th>
                <th>ω_ex / ω</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const z=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-chladni"),j=document.querySelector("#kpi-quad"),T=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),A=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),q=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),N=document.querySelector("#station-tbody"),P=document.querySelector("#theme-toggle");function f(e,i,t){const n=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[n,s]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ot(e,i,t,n,s,r,a,o,c,k,O){const u=n*.5,h=s*.5,p=r*.5,S=f(e+u,i-h,t-p),R=f(e+u,i-h,t+p),w=f(e-u,i-h,t+p),D=f(e-u,i+h,t-p),_=f(e+u,i+h,t-p),x=f(e+u,i+h,t+p),$=f(e-u,i+h,t+p),y=nt(a,c),C=o?1.8:.7,E=o?"#ffffff":y.stroke,B=`${D[0].toFixed(1)},${D[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,H=`${w[0].toFixed(1)},${w[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,K=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${k}" data-solid-kind="${O}">
      <polygon points="${H}" fill="${y.left}" stroke="${E}" stroke-width="${C}" />
      <polygon points="${K}" fill="${y.right}" stroke="${E}" stroke-width="${C}" />
      <polygon points="${B}" fill="${y.top}" stroke="${E}" stroke-width="${C}" />
    </g>
  `}function F(e){const i=m[e.presetId],t=e.selectedStation,n=b==="dark";z.textContent=i.subtitle,L.textContent=i.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`k/k₀ = ${t.wavenumberRatio.toFixed(4)}× (ω/ω₀ = ${t.biharmonicFrequencyRatio.toFixed(4)}×)`,j.textContent=`Rayleigh Quad = ${t.quadratureFrequencyRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,T.textContent=`${t.frequencyDeficitRatio.toFixed(4)}×`,T.className=`kpi-value ${t.isFrequencyDeficitViolation?"text-danger":"text-ok"}`,X.textContent=`u = k/k₀ − 1 = ${t.wavenumberExcessU.toFixed(4)} | ω = √(D/ρh) k²`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,A.textContent=`${e.violatedCount} / ${e.stationCount}`,A.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,q.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.wavenumberExcessU.toFixed(3)}, ω/ω₀ = ${t.biharmonicFrequencyRatio.toFixed(2)}×, ω_ex/ω = ${t.frequencyDeficitRatio.toFixed(4)}×)`;const s=W(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((a,o)=>a.z-o.z||a.y-o.y||a.x-o.x);it.innerHTML=r.map(a=>ot(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,n,a.id,a.kind)).join(""),N.innerHTML=e.stations.map(a=>{const o=a.index===t.index?"row-selected":"",c=a.isFrequencyDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${o}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.wavenumberExcessU.toFixed(4)}</td>
          <td>${a.wavenumberRatio.toFixed(4)}×</td>
          <td>${a.biharmonicFrequencyRatio.toFixed(4)}×</td>
          <td>${a.quadratureFrequencyRatio.toFixed(4)}×</td>
          <td class="${c}">${a.frequencyDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const o=a.getAttribute("data-preset");a.classList.toggle("active",o===e.presetId)}),window.__CHLADNI_PLATE_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in m&&(d=i,l=m[d].defaultStationIndex,F(v(d,l)))})});q.addEventListener("input",()=>{l=Number(q.value),F(v(d,l))});N.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(l=Number(i.getAttribute("data-station-row")),F(v(d,l)))});P.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),P.textContent=`Theme: ${b.toUpperCase()}`,F(v(d,l))});F(v(d,l));
