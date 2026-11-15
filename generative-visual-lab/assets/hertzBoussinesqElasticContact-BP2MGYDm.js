import"./modulepreload-polyfill-B5Qt9EMX.js";const g={hertz_boussinesq_two_thirds_contact_area:{id:"hertz_boussinesq_two_thirds_contact_area",label:"Hertz-Boussinesq Elastic Contact Law (A ∝ F^(2/3), Ratio = 1.0000×)",labelZh:"Hertz-Boussinesq 赫兹弹性接触定律（接触面积 A ∝ F^(2/3)，面积比恒锁 1.0000×）",subtitle:"Scales contact radius as a ∝ F^(1/3) and contact area as A ∝ F^(2/3) while mean pressure rises as p ∝ F^(1/3), locking A/A_Hertz = 1.0000× across all 17 load stations.",subtitleZh:"令接触半径按 a ∝ F^(1/3)、接触面积按 A ∝ F^(2/3) 次线性增长，平均接触压强按 p ∝ F^(1/3) 递增，在全 17 站恒定锁死面积比 A/A_Hertz = 1.0000×。",useHertzTwoThirdsLaw:!0,defaultStationIndex:16,badge:"HERTZ F^(2/3) LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"赫兹弹性锁死 · 1.0000×（0/17 膨胀站）",description:"Heinrich Hertz (1882) & Joseph Boussinesq (1885) proved that pressing an elastic sphere against a plane yields a hemispherical pressure distribution p(r) = p_max √(1 − r²/a²), so contact area grows as F^(2/3) rather than linearly with F.",descriptionZh:"Heinrich Hertz（1882）与 Joseph Boussinesq（1885）证明：弹性球体压入平面时产生半球面压强分布 p(r) = p_max √(1 − r²/a²)，因此接触印记面积按 F^(2/3) 次线性增长，而非随法向压力线性暴涨。"},naive_linear_force_contact_bloat:{id:"naive_linear_force_contact_bloat",label:"Naive Constant-Pressure Linear Area (A ∝ F, Bloat = 1 + u up to 2.0000×)",labelZh:"朴素恒压线性弹簧接触面积（A ∝ F，接触印记按 1+u 虚胖至 2.0000×）",subtitle:"Assumes constant contact pressure p = p₀ so area scales linearly with load F = F₀(1+u)³, bloating contact patches to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× pancake squash at St 16.",subtitleZh:"误把平均接触压强当作常数 p = p₀，使接触面积随法向载荷 F = F₀(1+u)³ 线性膨胀，在第 4 站虚胖至 1.2500×、第 8 站 1.5000×、第 16 站（8 倍载荷）翻倍摊饼至 2.0000×。",useHertzTwoThirdsLaw:!1,defaultStationIndex:16,badge:"PANCAKE BLOAT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"摊饼虚胖 · 最高 2.0000×（16/17 站违背）",description:"Naive character foot-plant and bouncing-ball rigs scale contact decal area linearly with impact force F, causing grotesque 2× pancake footprints under heavy landings.",descriptionZh:"朴素角色落脚与弹跳球动画将接触贴花面积与冲击力 F 设为线性正比，导致重落地时脚底与球底像摊大饼一样虚胖 2 倍。"}},f=17;function Z(e){const t=1+Math.max(0,e),i=t*t,s=i*t;return{contactRadiusRatio:t,normalLoadRatio:s,hertzAreaRatio:i,meanPressureRatio:t}}function V(e,a=64){const t=Math.max(0,e),i=(1+t)*(1+t),s=Math.max(2,a%2===0?a:a+1),r=1/s;let o=3;for(let d=1;d<s;d++){const p=d*r,m=d%2===1?4:2;o+=m*(3*p*p)}const n=r/3*o;return i*n}function Q(e,a){const t=Math.max(0,Math.min(f-1,e)),i=t/(f-1),s=Z(i),r=V(i,64),o=1+i,n=a?1:o;return{index:t,radiusExcessU:i,contactRadiusRatio:s.contactRadiusRatio,normalLoadRatio:s.normalLoadRatio,hertzAreaRatio:s.hertzAreaRatio,meanPressureRatio:s.meanPressureRatio,quadratureAreaRatio:r,activeToHertzAreaRatio:n,naiveToHertzAreaRatio:o,isFootprintBloatViolation:n>1.0001}}function R(e,a){const t=g[e],i=[];let s=0,r=0;for(let n=0;n<f;n++){const d=Q(n,t.useHertzTwoThirdsLaw);i.push(d),d.isFootprintBloatViolation&&s++;const p=Math.abs(d.hertzAreaRatio-d.quadratureAreaRatio);p>r&&(r=p)}const o=a!==void 0?Math.max(0,Math.min(f-1,a)):t.defaultStationIndex;return{presetId:e,useHertzTwoThirdsLaw:t.useHertzTwoThirdsLaw,stationCount:f,selectedStation:i[o],stations:i,station4Ratio:i[4].activeToHertzAreaRatio,station8Ratio:i[8].activeToHertzAreaRatio,station12Ratio:i[12].activeToHertzAreaRatio,station16Ratio:i[16].activeToHertzAreaRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"HERTZ_BOUSSINESQ_CONTACT_LOCKED":"NAIVE_LINEAR_PANCAKE_BLOAT_VIOLATION"}}function D(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Hertz-Boussinesq Elastic Half-Space Anvil Plinth"}),a.push({id:"anvil-rail-front",kind:"anvil_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Hertzian F^(2/3) Footprint Reference Rail (A/A_Hertz = 1.0000×)"}),a.push({id:"anvil-rail-back",kind:"anvil_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Normal Load Cube-Root Rail (a/a₀ = (F/F₀)^(1/3) = 1 + u)"});for(const t of e.stations){const i=(t.index-8)*30,s=24+10*t.contactRadiusRatio,r=28*t.contactRadiusRatio,o=36*t.activeToHertzAreaRatio;a.push({id:`normal-load-piston-${t.index}`,kind:"normal_load_piston",stationIndex:t.index,x:i,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Load F/F₀ = ${t.normalLoadRatio.toFixed(4)}×`}),a.push({id:`hertz-hemisphere-dome-${t.index}`,kind:"hertz_hemisphere_dome",stationIndex:t.index,x:i,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useHertzTwoThirdsLaw?"teal":"slate",label:`Station ${t.index} Mean Pressure p/p₀ = ${t.meanPressureRatio.toFixed(4)}×`}),a.push({id:`contact-footprint-pad-${t.index}`,kind:"contact_footprint_pad",stationIndex:t.index,x:i,y:o*.5-8,z:56,w:Math.min(24,12*t.activeToHertzAreaRatio),h:o,d:12,tone:t.isFootprintBloatViolation?"crimson":"teal",label:`Station ${t.index} Area Ratio A/A_Hertz = ${t.activeToHertzAreaRatio.toFixed(4)}×`})}return a.push({id:"boussinesq-collar-left",kind:"boussinesq_stress_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Nominal Preload Gate (F = 1.000 F₀, u = 0.000)"}),a.push({id:"boussinesq-collar-right",kind:"boussinesq_stress_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useHertzTwoThirdsLaw?"teal":"crimson",label:"Heavy Impact 8× Load Gate (F = 8.000 F₀, A_Hertz = 4.000 A₀)"}),a.push({id:"pressure-guide-bar-top",kind:"pressure_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Boussinesq Peak Stress Envelope (p_max = 1.5 p_mean)"}),a.push({id:"pressure-guide-bar-front",kind:"pressure_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useHertzTwoThirdsLaw?"teal":"crimson",label:"Hertzian F^(2/3) Footprint Lock Line (A/A_Hertz = 1.0000×)"}),a}const y=new URLSearchParams(window.location.search),H=y.get("preset"),K=y.get("theme")==="light"?"light":"dark";let l=H&&H in g?H:"hertz_boussinesq_two_thirds_contact_area",c=g[l].defaultStationIndex,F=K;document.documentElement.setAttribute("data-theme",F);const G=document.querySelector("#app");G.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 192 · ELASTIC CONTACT MECHANICS &amp; FOOT-PLANT SQUASH METROLOGY</span>
        <h1>Hertz-Boussinesq Elastic Contact Footprint Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${F.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Contact Law Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="hertz_boussinesq_two_thirds_contact_area"
      >
        Hertz-Boussinesq F^(2/3) Law (A/A_Hertz = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_linear_force_contact_bloat"
      >
        Naive Linear-Force Area (A/A_Hertz = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED LOAD F/F₀ / RADIUS a/a₀</span>
        <strong id="kpi-load" class="kpi-value">--</strong>
        <span id="kpi-hertz-area" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FOOTPRINT RATIO (A / A_Hertz)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-pressure" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 FOOTPRINT</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">u = 0.250 / 0.500 / 1.000 (F = 8 F₀)</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PANCAKE BLOAT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC HERTZ-BOUSSINESQ CONTACT RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Hertz-Boussinesq elastic contact footprint rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Load Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, F = 8.000 F₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION HERTZ F^(2/3) VS LINEAR AREA LEDGER</span>
          <span>a = (3FR / 4E*)^(1/3)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>F / F₀</th>
                <th>A_Hertz/A₀</th>
                <th>p_mean/p₀</th>
                <th>A / A_Hertz</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),w=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-load"),J=document.querySelector("#kpi-hertz-area"),q=document.querySelector("#kpi-ratio"),W=document.querySelector("#kpi-pressure"),X=document.querySelector("#kpi-stations-4816"),O=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),E=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),P=document.querySelector("#station-tbody"),N=document.querySelector("#theme-toggle");function x(e,a,t){const i=(e-t*.55)*.88,s=-a+(e*.18+t*.42)*.55;return[i,s]}function it(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,a,t,i,s,r,o,n,d,p,m){const u=i*.5,h=s*.5,b=r*.5,C=x(e+u,a-h,t-b),k=x(e+u,a-h,t+b),L=x(e-u,a-h,t+b),I=x(e-u,a+h,t-b),T=x(e+u,a+h,t-b),A=x(e+u,a+h,t+b),v=x(e-u,a+h,t+b),$=it(o,d),z=n?1.8:.7,S=n?"#ffffff":$.stroke,B=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,M=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,U=`${k[0].toFixed(1)},${k[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${p}" data-solid-kind="${m}">
      <polygon points="${M}" fill="${$.left}" stroke="${S}" stroke-width="${z}" />
      <polygon points="${U}" fill="${$.right}" stroke="${S}" stroke-width="${z}" />
      <polygon points="${B}" fill="${$.top}" stroke="${S}" stroke-width="${z}" />
    </g>
  `}function _(e){const a=g[e.presetId],t=e.selectedStation,i=F==="dark";j.textContent=a.subtitle,w.textContent=a.badge,w.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`F/F₀ = ${t.normalLoadRatio.toFixed(4)}× (a/a₀ = ${t.contactRadiusRatio.toFixed(4)}×)`,J.textContent=`A_Hertz/A₀ = ${t.hertzAreaRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,q.textContent=`${t.activeToHertzAreaRatio.toFixed(4)}×`,q.className=`kpi-value ${t.isFootprintBloatViolation?"text-danger":"text-ok"}`,W.textContent=`p_mean/p₀ = ${t.meanPressureRatio.toFixed(4)}× | u = ${t.radiusExcessU.toFixed(4)}`,X.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,O.textContent=`${e.violatedCount} / ${e.stationCount}`,O.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,E.value=String(t.index),ot.textContent=`Station ${t.index} (u = ${t.radiusExcessU.toFixed(3)}, F/F₀ = ${t.normalLoadRatio.toFixed(3)}×, A/A_Hertz = ${t.activeToHertzAreaRatio.toFixed(4)}×)`;const s=D(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((o,n)=>o.z-n.z||o.y-n.y||o.x-n.x);at.innerHTML=r.map(o=>st(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,i,o.id,o.kind)).join(""),P.innerHTML=e.stations.map(o=>{const n=o.index===t.index?"row-selected":"",d=o.isFootprintBloatViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.radiusExcessU.toFixed(4)}</td>
          <td>${o.normalLoadRatio.toFixed(4)}×</td>
          <td>${o.hertzAreaRatio.toFixed(4)}×</td>
          <td>${o.meanPressureRatio.toFixed(4)}×</td>
          <td class="${d}">${o.activeToHertzAreaRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const n=o.getAttribute("data-preset");o.classList.toggle("active",n===e.presetId)}),window.__HERTZ_CONTACT_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in g&&(l=a,c=g[l].defaultStationIndex,_(R(l,c)))})});E.addEventListener("input",()=>{c=Number(E.value),_(R(l,c))});P.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(c=Number(a.getAttribute("data-station-row")),_(R(l,c)))});N.addEventListener("click",()=>{F=F==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",F),N.textContent=`Theme: ${F.toUpperCase()}`,_(R(l,c))});_(R(l,c));
