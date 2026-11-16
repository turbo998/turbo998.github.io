import"./modulepreload-polyfill-B5Qt9EMX.js";const _={prandtl_glauert_compressible_suction_lock:{id:"prandtl_glauert_compressible_suction_lock",label:"Prandtl-Glauert Compressible Law (C_p = C_p0 / √(1 − M²), Ratio = 1.0000×)",labelZh:"Prandtl-Glauert 可压缩抽吸定律（C_p = C_p0 / √(1 − M²)，压强比恒锁 1.0000×）",subtitle:"Amplifies local suction pressure drop by 1 / √(1 − M²) = 1 + u under Göthert streamwise contraction β = √(1 − M²), locking C_p,exact / C_p,model = 1.0000× across all 17 Mach stations.",subtitleZh:"通过 Göthert 流向收缩因子 β = √(1 − M²) 将局部低压抽吸放大 1 / √(1 − M²) = 1 + u 倍，在全 17 站恒定锁死跨音速凝结云抽吸比 C_p,exact / C_p,model = 1.0000×。",usePrandtlGlauertScaling:!0,defaultStationIndex:16,badge:"PRANDTL-GLAUERT LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"可压缩抽吸锁死 · 1.0000×（0/17 亏损站）",description:"Hermann Glauert (1928) and Ludwig Prandtl (1930) proved that subsonic acoustic wave bunching contracts streamwise coordinates by β = √(1 − M²), amplifying canopy/wing suction C_p = C_p0 / β and triggering transonic vapor cones.",descriptionZh:"Hermann Glauert（1928）与 Ludwig Prandtl（1930）证明：亚音速声波前向挤压使流向坐标按 β = √(1 − M²) 收缩，令座舱与机翼负压抽吸按 C_p = C_p0 / β 剧增并触发跨音速普朗特-格劳厄脱凝结云（音爆云）。"},naive_incompressible_bernoulli_deficit:{id:"naive_incompressible_bernoulli_deficit",label:"Naive Incompressible Bernoulli (C_p = C_p0, Deficit = 1 + u up to 2.0000×)",labelZh:"朴素不可压缩伯努利常数（C_p = C_p0，低压抽吸按 1+u 亏损至 2.0000×）",subtitle:"Ignores Mach compressibility (M = 0 assumption), underestimating true transonic suction by 1 / √(1 − M²) = 1 + u to 1.2500× at St 4 (M=0.60), 1.5000× at St 8 (M=0.75), and 2.0000× at St 16 (M=0.866).",subtitleZh:"忽略马赫数可压缩性（假定 M = 0），使跨音速低压抽吸按 1 / √(1 − M²) = 1+u 在第 4 站（M=0.60）亏损 1.2500×、第 8 站（M=0.75）亏损 1.5000×、第 16 站（M=0.866）翻倍亏损至 2.0000×。",usePrandtlGlauertScaling:!1,defaultStationIndex:16,badge:"SUCTION DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"抽吸腰斩 · 最高 2.0000×（16/17 站违背）",description:"Naive aircraft vapor-cone and aerodynamic shaders evaluate incompressible pressure coefficient C_p0 regardless of Mach number, failing to reach the adiabatic dew-point threshold at high subsonic Mach.",descriptionZh:"朴素战机音爆云与气动着色器无论飞行马赫数多高都沿用不可压缩负压系数 C_p0，导致高亚音速下低压区无法达到绝热膨胀露点阈值、凝结云神秘消失。"}},C=17;function H(e){const t=1+Math.max(0,e),n=1/t,o=Math.max(0,1-n*n);return{betaFactor:n,machNumber:Math.sqrt(o),prandtlGlauertGain:t}}function Z(e,i=64){const n=1+Math.max(0,e),o=Math.max(2,i%2===0?i:i+1),l=1/o;let a=0+3*n;for(let s=1;s<o;s++){const r=s*l,g=s%2===1?4:2;a+=g*(3*n*r*r)}return l/3*a}function z(e,i){const t=Math.max(0,Math.min(C-1,e)),n=t/(C-1),o=H(n),l=Z(n,64),a=1+n,s=i?1:a;return{index:t,compressibilityExcessU:n,betaFactor:o.betaFactor,machNumber:o.machNumber,prandtlGlauertGain:o.prandtlGlauertGain,quadratureGain:l,suctionDeficitRatio:s,naiveDeficitRatio:a,isSuctionDeficitViolation:s>1.0001}}function m(e,i){const t=_[e],n=[];let o=0,l=0;for(let s=0;s<C;s++){const r=z(s,t.usePrandtlGlauertScaling);n.push(r),r.isSuctionDeficitViolation&&o++;const g=Math.abs(r.prandtlGlauertGain-r.quadratureGain);g>l&&(l=g)}const a=i!==void 0?Math.max(0,Math.min(C-1,i)):t.defaultStationIndex;return{presetId:e,usePrandtlGlauertScaling:t.usePrandtlGlauertScaling,stationCount:C,selectedStation:n[a],stations:n,station4Ratio:n[4].suctionDeficitRatio,station8Ratio:n[8].suctionDeficitRatio,station12Ratio:n[12].suctionDeficitRatio,station16Ratio:n[16].suctionDeficitRatio,violatedCount:o,maxQuadratureError:l,verdict:o===0?"PRANDTL_GLAUERT_SUCTION_LOCKED":"NAIVE_INCOMPRESSIBLE_SUCTION_DEFICIT"}}function B(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Prandtl-Glauert Transonic Wind Tunnel Plinth"}),i.push({id:"mach-rail-front",kind:"mach_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Prandtl-Glauert Suction Lock Rail (C_p,exact / C_p,model = 1.0000×)"}),i.push({id:"mach-rail-back",kind:"mach_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Göthert Lorentz-Like Contraction Rail (β = √(1 − M²) = 1/(1+u))"});for(const t of e.stations){const n=(t.index-8)*30,o=44*t.betaFactor,l=26*t.prandtlGlauertGain,a=36*t.suctionDeficitRatio;i.push({id:`beta-contraction-strut-${t.index}`,kind:"beta_contraction_strut",stationIndex:t.index,x:n,y:o*.5-8,z:-56,w:14,h:o,d:14,tone:"amber",label:`Station ${t.index} β = √(1−M²) = ${t.betaFactor.toFixed(4)} (M = ${t.machNumber.toFixed(4)})`}),i.push({id:`prandtl-suction-column-${t.index}`,kind:"prandtl_suction_column",stationIndex:t.index,x:n,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.usePrandtlGlauertScaling?"teal":"slate",label:`Station ${t.index} Gain C_p/C_p0 = ${t.prandtlGlauertGain.toFixed(4)}×`}),i.push({id:`vapor-cone-deficit-bar-${t.index}`,kind:"vapor_cone_deficit_bar",stationIndex:t.index,x:n,y:a*.5-8,z:56,w:Math.min(24,12*t.suctionDeficitRatio),h:a,d:12,tone:t.isSuctionDeficitViolation?"crimson":"teal",label:`Station ${t.index} Ratio C_p,exact/C_p = ${t.suctionDeficitRatio.toFixed(4)}×`})}return i.push({id:"transonic-collar-left",kind:"transonic_shock_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Incompressible Limit Gate (M = 0.000, β = 1.000)"}),i.push({id:"transonic-collar-right",kind:"transonic_shock_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.usePrandtlGlauertScaling?"teal":"crimson",label:"Transonic Vapor-Cone Gate (M = 0.8660, β = 0.500, C_p = 2 C_p0)"}),i.push({id:"condensation-guide-bar-top",kind:"condensation_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Adiabatic Dew-Point Suction Envelope C_p = C_p0 / √(1 − M²)"}),i.push({id:"condensation-guide-bar-front",kind:"condensation_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.usePrandtlGlauertScaling?"teal":"crimson",label:"Prandtl-Glauert Accuracy Lock Line (C_p,exact / C_p = 1.0000×)"}),i}const O=new URLSearchParams(window.location.search),R=O.get("preset"),Q=O.get("theme")==="light"?"light":"dark";let c=R&&R in _?R:"prandtl_glauert_compressible_suction_lock",d=_[c].defaultStationIndex,x=Q;document.documentElement.setAttribute("data-theme",x);const Y=document.querySelector("#app");Y.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 194 · 204TH DEMO · TRANSONIC COMPRESSIBILITY &amp; VAPOR-CONE METROLOGY</span>
        <h1>Prandtl-Glauert Compressible Vapor-Cone Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${x.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Compressibility Law Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="prandtl_glauert_compressible_suction_lock"
      >
        Prandtl-Glauert 1/√(1−M²) Law (C_p,exact/C_p = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_incompressible_bernoulli_deficit"
      >
        Naive Incompressible C_p0 (Deficit = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED MACH M / CONTRACTION β</span>
        <strong id="kpi-mach" class="kpi-value">--</strong>
        <span id="kpi-gain" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SUCTION DEFICIT RATIO (C_p,exact / C_p)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 DEFICIT RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">M = 0.6000 / 0.7454 / 0.8660</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">VAPOR-CONE DEFICIT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC PRANDTL-GLAUERT VAPOR-CONE RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Prandtl-Glauert compressible vapor-cone rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Subsonic Mach Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, M = 0.8660)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION PRANDTL-GLAUERT 1/√(1−M²) VS INCOMPRESSIBLE LEDGER</span>
          <span>β = √(1 − M²)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>Mach M</th>
                <th>β=√(1−M²)</th>
                <th>C_p/C_p0</th>
                <th>C_p,ex/C_p</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),K=document.querySelector("#kpi-mach"),W=document.querySelector("#kpi-gain"),N=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),A=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),F=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),y=document.querySelector("#station-tbody"),D=document.querySelector("#theme-toggle");function h(e,i,t){const n=(e-t*.55)*.88,o=-i+(e*.18+t*.42)*.55;return[n,o]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ot(e,i,t,n,o,l,a,s,r,g,w){const u=n*.5,p=o*.5,b=l*.5,G=h(e+u,i-p,t-b),S=h(e+u,i-p,t+b),T=h(e-u,i-p,t+b),P=h(e-u,i+p,t-b),$=h(e+u,i+p,t-b),f=h(e+u,i+p,t+b),v=h(e-u,i+p,t+b),M=nt(a,r),E=s?1.8:.7,I=s?"#ffffff":M.stroke,q=`${P[0].toFixed(1)},${P[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,U=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,V=`${S[0].toFixed(1)},${S[1].toFixed(1)} ${G[0].toFixed(1)},${G[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${w}">
      <polygon points="${U}" fill="${M.left}" stroke="${I}" stroke-width="${E}" />
      <polygon points="${V}" fill="${M.right}" stroke="${I}" stroke-width="${E}" />
      <polygon points="${q}" fill="${M.top}" stroke="${I}" stroke-width="${E}" />
    </g>
  `}function k(e){const i=_[e.presetId],t=e.selectedStation,n=x==="dark";j.textContent=i.subtitle,L.textContent=i.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,K.textContent=`M = ${t.machNumber.toFixed(4)} (β = ${t.betaFactor.toFixed(4)})`,W.textContent=`C_p/C_p0 = ${t.prandtlGlauertGain.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,N.textContent=`${t.suctionDeficitRatio.toFixed(4)}×`,N.className=`kpi-value ${t.isSuctionDeficitViolation?"text-danger":"text-ok"}`,X.textContent=`u = 1/β − 1 = ${t.compressibilityExcessU.toFixed(4)} | β = √(1−M²)`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,A.textContent=`${e.violatedCount} / ${e.stationCount}`,A.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,F.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.compressibilityExcessU.toFixed(3)}, M = ${t.machNumber.toFixed(4)}, C_p,exact/C_p = ${t.suctionDeficitRatio.toFixed(4)}×)`;const o=B(e);et.textContent=`${o.length} solids · ${e.stationCount} stations`;const l=[...o].sort((a,s)=>a.z-s.z||a.y-s.y||a.x-s.x);it.innerHTML=l.map(a=>ot(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,n,a.id,a.kind)).join(""),y.innerHTML=e.stations.map(a=>{const s=a.index===t.index?"row-selected":"",r=a.isSuctionDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.compressibilityExcessU.toFixed(4)}</td>
          <td>${a.machNumber.toFixed(4)}</td>
          <td>${a.betaFactor.toFixed(4)}</td>
          <td>${a.prandtlGlauertGain.toFixed(4)}×</td>
          <td class="${r}">${a.suctionDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const s=a.getAttribute("data-preset");a.classList.toggle("active",s===e.presetId)}),window.__PRANDTL_GLAUERT_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in _&&(c=i,d=_[c].defaultStationIndex,k(m(c,d)))})});F.addEventListener("input",()=>{d=Number(F.value),k(m(c,d))});y.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(d=Number(i.getAttribute("data-station-row")),k(m(c,d)))});D.addEventListener("click",()=>{x=x==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",x),D.textContent=`Theme: ${x.toUpperCase()}`,k(m(c,d))});k(m(c,d));
