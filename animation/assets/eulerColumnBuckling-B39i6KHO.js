import"./modulepreload-polyfill-B5Qt9EMX.js";const k={euler_elastica_slenderness_buckling_lock:{id:"euler_elastica_slenderness_buckling_lock",label:"Euler Slenderness Buckling Law (P_cr = π²EI / L_eff², P/P_Euler = 1.0000×)",labelZh:"Euler 欧拉压杆屈曲长细比定律（P_cr = π²EI / L_eff²，临界载荷比恒锁 1.0000×）",subtitle:"Attenuates the critical buckling load inversely with squared effective length as P_cr = P_cr0 / (1 + u), locking P_active / P_Euler = 1.0000× across all 17 slenderness stations.",subtitleZh:"遵循 Euler（1744/1759）细长压杆弹性屈曲特征值定律 P_cr = π²EI / (KL)²，令临界屈曲载荷随有效长度平方反比衰减为 P_cr0/(1+u)，在全 17 站恒定锁死临界载荷比 1.0000×。",useEulerBucklingLaw:!0,defaultStationIndex:16,badge:"EULER BUCKLING LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"欧拉屈曲锁死 · 1.0000×（0/17 超冲站）",description:"Leonhard Euler (1744, De curvis elasticis; 1759, Sur la force des colonnes) proved that slender columns buckle laterally at P_cr = π² E I / L_eff², scaling as 1 / L_eff².",descriptionZh:"Leonhard Euler（1744，《论弹性曲线》；1759，《论柱的强度》）严格证明细长受压柱在远低于材料压碎极限时即发生正弦半波侧向屈曲，临界载荷 P_cr = π² E I / L_eff² 与有效长度平方成反比。"},naive_length_invariant_crushing_overestimate:{id:"naive_length_invariant_crushing_overestimate",label:"Naive Length-Invariant Compressive Yield (P = P_cr0, Overestimate = 1 + u up to 2.0000×)",labelZh:"朴素长度无关抗压屈服模型（P = P_cr0，临界屈曲载荷按 1+u 虚高至 2.0000×）",subtitle:"Ignores the 1/L_eff² flexural buckling instability and treats all columns as short crushing blocks, overestimating critical load by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"忽略压杆有效长度 L_eff = KL 对弯曲失稳的平方反比削弱，把细长柱当成只受材料抗压强度限制的短墩，使临界承载力在第 4 站虚高 1.2500×、第 8 站虚高 1.5000×、第 16 站翻倍虚高至 2.0000×。",useEulerBucklingLaw:!1,defaultStationIndex:16,badge:"LOAD OVERESTIMATE · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"屈曲虚高 · 最高 2.0000×（16/17 站违背）",description:"Naive destruction and ragdoll scripts check only constant axial stress P/A < σ_yield, causing slender pillars, spider legs, and tent poles to stay stiff at loads 2× above Euler buckling.",descriptionZh:"朴素建筑坍塌与蜘蛛腿/帐篷杆脚本只检查恒定轴向压应力 P/A < σ_yield，导致细长立柱与长腿在早已超过欧拉屈曲极限 2 倍的重压下依然僵硬直立而不发生侧向弯折。"}},E=17;function K(t){const i=Math.max(0,t),e=Math.sqrt(1+i),n=1/(1+i);return{effectiveLengthRatio:e,eulerCriticalLoadRatio:n}}function D(t,i=64){const n=1/(1+Math.max(0,t)),o=Math.max(2,i%2===0?i:i+1),r=1/o;let a=0,s=0;for(let l=0;l<=o;l++){const p=l*r,v=l===0||l===o?1:l%2===1?4:2,d=Math.cos(Math.PI*p),c=Math.sin(Math.PI*p);a+=v*n*(c*c),s+=v*(d*d)}return a/s}function H(t,i){const e=Math.max(0,Math.min(E-1,t)),n=e/(E-1),o=K(n),r=D(n,64),a=1+n,s=i?1:a;return{index:e,slendernessSquaredExcessU:n,effectiveLengthRatio:o.effectiveLengthRatio,eulerCriticalLoadRatio:o.eulerCriticalLoadRatio,quadratureRayleighLoadRatio:r,bucklingLoadOverestimateRatio:s,naiveOverestimateRatio:a,isBucklingOverestimateViolation:s>1.0001}}function _(t,i){const e=k[t],n=[];let o=0,r=0;for(let s=0;s<E;s++){const l=H(s,e.useEulerBucklingLaw);n.push(l),l.isBucklingOverestimateViolation&&o++;const p=Math.abs(l.eulerCriticalLoadRatio-l.quadratureRayleighLoadRatio);p>r&&(r=p)}const a=i!==void 0?Math.max(0,Math.min(E-1,i)):e.defaultStationIndex;return{presetId:t,useEulerBucklingLaw:e.useEulerBucklingLaw,stationCount:E,selectedStation:n[a],stations:n,station4Ratio:n[4].bucklingLoadOverestimateRatio,station8Ratio:n[8].bucklingLoadOverestimateRatio,station12Ratio:n[12].bucklingLoadOverestimateRatio,station16Ratio:n[16].bucklingLoadOverestimateRatio,violatedCount:o,maxQuadratureError:r,verdict:o===0?"EULER_SLENDERNESS_BUCKLING_LOCKED":"NAIVE_LENGTH_INVARIANT_BUCKLING_OVERESTIMATE"}}function Z(t){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Euler-Timoshenko Column Buckling Metrology Plinth"}),i.push({id:"elastica-rail-front",kind:"elastica_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Euler Critical Buckling Load Rail (P_active / P_Euler = 1.0000×)"}),i.push({id:"elastica-rail-back",kind:"elastica_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Effective Buckling Length Rail (L_eff / L₀ = √(1 + u))"});for(const e of t.stations){const n=(e.index-8)*30,o=26*e.effectiveLengthRatio,r=44*e.eulerCriticalLoadRatio,a=36*e.bucklingLoadOverestimateRatio;i.push({id:`slenderness-length-column-${e.index}`,kind:"slenderness_length_column",stationIndex:e.index,x:n,y:o*.5-8,z:-56,w:14,h:o,d:14,tone:"amber",label:`Station ${e.index} Effective Length L_eff/L₀ = ${e.effectiveLengthRatio.toFixed(4)}×`}),i.push({id:`euler-critical-load-strut-${e.index}`,kind:"euler_critical_load_strut",stationIndex:e.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:t.useEulerBucklingLaw?"teal":"slate",label:`Station ${e.index} Euler Load P_cr/P_cr0 = ${e.eulerCriticalLoadRatio.toFixed(4)}×`}),i.push({id:`load-overestimate-gauge-${e.index}`,kind:"load_overestimate_gauge",stationIndex:e.index,x:n,y:a*.5-8,z:56,w:Math.min(24,12*e.bucklingLoadOverestimateRatio),h:a,d:12,tone:e.isBucklingOverestimateViolation?"crimson":"teal",label:`Station ${e.index} Load Ratio P/P_Euler = ${e.bucklingLoadOverestimateRatio.toFixed(4)}×`})}return i.push({id:"support-collar-left",kind:"support_hinge_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Reference Column Support (L_eff = 1.000 L₀, P_cr = 1.000 P_cr0)"}),i.push({id:"support-collar-right",kind:"support_hinge_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:t.useEulerBucklingLaw?"teal":"crimson",label:"Slender Column Gate (L_eff = √2 L₀, P_cr = 0.500 P_cr0)"}),i.push({id:"eigenvalue-bar-top",kind:"euler_eigenvalue_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Euler Eigenvalue Law: P_cr = π² E I / (K L)² = P_cr0 / (1 + u)"}),i.push({id:"eigenvalue-bar-front",kind:"euler_eigenvalue_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:t.useEulerBucklingLaw?"teal":"crimson",label:"Critical Buckling Load Lock Line (P_active / P_Euler = 1.0000×)"}),i}const U=new URLSearchParams(window.location.search),P=U.get("preset"),Q=U.get("theme")==="light"?"light":"dark";let u=P&&P in k?P:"euler_elastica_slenderness_buckling_lock",g=k[u].defaultStationIndex,b=Q;document.documentElement.setAttribute("data-theme",b);const z=document.querySelector("#app");z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 208 · 218TH DEMO · STRUCTURAL MECHANICS EULER ELASTICA COLUMN BUCKLING METROLOGY</span>
        <h1>Euler-Slenderness Critical Column Buckling Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Column Buckling Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="euler_elastica_slenderness_buckling_lock"
      >
        Euler P_cr = π²EI / L_eff² Buckling Law (P / P_Euler = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_length_invariant_crushing_overestimate"
      >
        Naive Length-Invariant Crushing Load (Overestimate = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED LENGTH L_eff/L₀ / EULER LOAD P_cr/P₀</span>
        <strong id="kpi-load" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CRITICAL LOAD RATIO (P_active / P_Euler)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 LOAD RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">(L_eff/L₀)² = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BUCKLING OVERESTIMATE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC EULER-SLENDERNESS BUCKLING RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Euler-Slenderness critical column buckling rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Slenderness Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, L_eff = 1.414 L₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION EULER P_cr = π²EI/L_eff² VS CRUSHING LEDGER</span>
          <span>P_cr ∝ 1 / L_eff²</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>L_eff / L₀</th>
                <th>P_Euler / P₀</th>
                <th>Rayleigh Quad</th>
                <th>P / P_Euler</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),B=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-load"),W=document.querySelector("#kpi-quad"),N=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),A=document.querySelector("#kpi-violated"),ee=document.querySelector("#kpi-verdict"),te=document.querySelector("#solid-count-readout"),ie=document.querySelector("#rig-svg"),O=document.querySelector("#station-slider"),ae=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),w=document.querySelector("#theme-toggle");function h(t,i,e){const n=(t-e*.55)*.88,o=-i+(t*.18+e*.42)*.55;return[n,o]}function ne(t,i){return t==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:t==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:t==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:t==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function oe(t,i,e,n,o,r,a,s,l,p,v){const d=n*.5,c=o*.5,f=r*.5,F=h(t+d,i-c,e-f),R=h(t+d,i-c,e+f),T=h(t-d,i-c,e+f),y=h(t-d,i+c,e-f),S=h(t+d,i+c,e-f),L=h(t+d,i+c,e+f),m=h(t-d,i+c,e+f),$=ne(a,l),I=s?1.8:.7,C=s?"#ffffff":$.stroke,M=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,G=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,V=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${p}" data-solid-kind="${v}">
      <polygon points="${G}" fill="${$.left}" stroke="${C}" stroke-width="${I}" />
      <polygon points="${V}" fill="${$.right}" stroke="${C}" stroke-width="${I}" />
      <polygon points="${M}" fill="${$.top}" stroke="${C}" stroke-width="${I}" />
    </g>
  `}function x(t){const i=k[t.presetId],e=t.selectedStation,n=b==="dark";Y.textContent=i.subtitle,B.textContent=i.badge,B.className=`status-badge ${t.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`L_eff/L₀ = ${e.effectiveLengthRatio.toFixed(4)}× (P_cr/P₀ = ${e.eulerCriticalLoadRatio.toFixed(4)}×)`,W.textContent=`Rayleigh Quad = ${e.quadratureRayleighLoadRatio.toFixed(4)}× (Quad err ${t.maxQuadratureError.toExponential(2)})`,N.textContent=`${e.bucklingLoadOverestimateRatio.toFixed(4)}×`,N.className=`kpi-value ${e.isBucklingOverestimateViolation?"text-danger":"text-ok"}`,X.textContent=`u = (L_eff/L₀)² − 1 = ${e.slendernessSquaredExcessU.toFixed(4)} | P_cr = π²EI / L_eff²`,J.textContent=`${t.station4Ratio.toFixed(4)}× / ${t.station8Ratio.toFixed(4)}× / ${t.station16Ratio.toFixed(4)}×`,A.textContent=`${t.violatedCount} / ${t.stationCount}`,A.className=`kpi-value ${t.violatedCount>0?"text-danger":"text-ok"}`,ee.textContent=t.verdict,O.value=String(e.index),ae.textContent=`Station ${e.index} (u = ${e.slendernessSquaredExcessU.toFixed(3)}, L_eff/L₀ = ${e.effectiveLengthRatio.toFixed(3)}×, P/P_Euler = ${e.bucklingLoadOverestimateRatio.toFixed(4)}×)`;const o=Z(t);te.textContent=`${o.length} solids · ${t.stationCount} stations`;const r=[...o].sort((a,s)=>a.z-s.z||a.y-s.y||a.x-s.x);ie.innerHTML=r.map(a=>oe(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===e.index,n,a.id,a.kind)).join(""),q.innerHTML=t.stations.map(a=>{const s=a.index===e.index?"row-selected":"",l=a.isBucklingOverestimateViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.slendernessSquaredExcessU.toFixed(4)}</td>
          <td>${a.effectiveLengthRatio.toFixed(4)}×</td>
          <td>${a.eulerCriticalLoadRatio.toFixed(4)}×</td>
          <td>${a.quadratureRayleighLoadRatio.toFixed(4)}×</td>
          <td class="${l}">${a.bucklingLoadOverestimateRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const s=a.getAttribute("data-preset");a.classList.toggle("active",s===t.presetId)}),window.__EULER_BUCKLING_SUMMARY__=t}document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-preset");i&&i in k&&(u=i,g=k[u].defaultStationIndex,x(_(u,g)))})});O.addEventListener("input",()=>{g=Number(O.value),x(_(u,g))});q.addEventListener("click",t=>{const i=t.target.closest("tr[data-station-row]");i&&(g=Number(i.getAttribute("data-station-row")),x(_(u,g)))});w.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),w.textContent=`Theme: ${b.toUpperCase()}`,x(_(u,g))});x(_(u,g));
