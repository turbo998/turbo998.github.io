import"./modulepreload-polyfill-B5Qt9EMX.js";const S={saint_venant_ritter_riemann_celerity_lock:{id:"saint_venant_ritter_riemann_celerity_lock",label:"Saint-Venant & Ritter Dam-Break Law (u_front = 2√(gh), Ratio = 1.0000×)",labelZh:"Saint-Venant & Ritter 圣维南-里特溃坝前锋定律（u_front = 2√(gh)，前锋速度比恒锁 1.0000×）",subtitle:"Accelerates the dry-bed flood wavefront via Riemann invariant u + 2√(gh) = 2√(gh_res) so u_front = 2c₀(1+u), locking u_exact/u_model = 1.0000× across all 17 depth stations.",subtitleZh:"由浅水方程黎曼不变量 u + 2√(gh) = 2√(gh_res) 驱动干河床溃坝水舌前锋按 u_front = 2√(gh) = 2c₀(1+u) 推进，在全 17 站恒定锁死速度比 1.0000×。",useSaintVenantRitterLaw:!0,defaultStationIndex:16,badge:"RITTER 2√(gh) LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"溃坝前锋锁死 · 1.0000×（0/17 亏损站）",description:"Barré de Saint-Venant (1871) and August Ritter (1892) proved that a dam break of depth h onto a dry bed creates a centered rarefaction fan whose leading edge races at 2√(gh).",descriptionZh:"Barré de Saint-Venant（1871）与 August Ritter（1892）严格证明：水深为 h 的水库向干河床决口时形成中心膨胀波扇，其前缘水舌速度达浅水波速的两倍 u_front = 2√(gh)。"},naive_constant_speed_flood_front_deficit:{id:"naive_constant_speed_flood_front_deficit",label:"Naive Depth-Invariant Flood Front (u = u₀, Deficit = 1 + u up to 2.0000×)",labelZh:"朴素无视水深恒速漫滩（u = u₀，溃坝前锋速度按 1+u 亏损至 2.0000×）",subtitle:"Advances flood inundation front at fixed speed u₀ regardless of reservoir depth h = h₀(1+u)², underestimating front velocity by √(h/h₀) = 1 + u to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"无视上游蓄水深度 h = h₀(1+u)² 强行以固定速度 u₀ 推进洪水前锋，使水舌速度在第 4 站亏损 1.2500×、第 8 站亏损 1.5000×、第 16 站（四倍水深）翻倍亏损至 2.0000×（动能亏损 4 倍）。",useSaintVenantRitterLaw:!1,defaultStationIndex:16,badge:"CELERITY DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"波速腰斩 · 最高 2.0000×（16/17 站违背）",description:"Naive flood-spread and spilled-liquid shaders expand wetting boundaries at a hardcoded speed, failing to scale front velocity with √(gh) or the 2× Ritter rarefaction factor.",descriptionZh:"朴素洪水决口与泼水蔓延着色器用写死的常数速度扩大水面边界，既漏掉了 √(gh) 重力波速标度，又丢失了黎曼膨胀扇的 2 倍干河床加速。"}},R=17;function H(e){const t=1+Math.max(0,e);return{reservoirDepthRatio:t*t,waveCelerityRatio:t,ritterFrontSpeedRatio:t}}function Z(e,i=64){const a=1+Math.max(0,e),r=Math.max(2,i%2===0?i:i+1),s=1/r;let n=0+3*a;for(let o=1;o<r;o++){const d=o*s,b=o%2===1?4:2;n+=b*(3*a*d*d)}return s/3*n}function Y(e,i){const t=Math.max(0,Math.min(R-1,e)),a=t/(R-1),r=H(a),s=Z(a,64),n=1+a,o=i?1:n;return{index:t,celerityExcessU:a,reservoirDepthRatio:r.reservoirDepthRatio,waveCelerityRatio:r.waveCelerityRatio,ritterFrontSpeedRatio:r.ritterFrontSpeedRatio,quadratureFrontSpeedRatio:s,frontSpeedDeficitRatio:o,naiveDeficitRatio:n,isFrontSpeedDeficitViolation:o>1.0001}}function v(e,i){const t=S[e],a=[];let r=0,s=0;for(let o=0;o<R;o++){const d=Y(o,t.useSaintVenantRitterLaw);a.push(d),d.isFrontSpeedDeficitViolation&&r++;const b=Math.abs(d.ritterFrontSpeedRatio-d.quadratureFrontSpeedRatio);b>s&&(s=b)}const n=i!==void 0?Math.max(0,Math.min(R-1,i)):t.defaultStationIndex;return{presetId:e,useSaintVenantRitterLaw:t.useSaintVenantRitterLaw,stationCount:R,selectedStation:a[n],stations:a,station4Ratio:a[4].frontSpeedDeficitRatio,station8Ratio:a[8].frontSpeedDeficitRatio,station12Ratio:a[12].frontSpeedDeficitRatio,station16Ratio:a[16].frontSpeedDeficitRatio,violatedCount:r,maxQuadratureError:s,verdict:r===0?"SAINT_VENANT_CELERITY_LOCKED":"NAIVE_CONSTANT_SPEED_FRONT_DEFICIT"}}function z(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Saint-Venant Shallow-Water Flume Plinth"}),i.push({id:"rarefaction-rail-front",kind:"rarefaction_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Ritter Dam-Break Front Speed Rail (u_exact / u_model = 1.0000×)"}),i.push({id:"rarefaction-rail-back",kind:"rarefaction_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Reservoir Water Depth Rail (h / h₀ = (1 + u)²)"});for(const t of e.stations){const a=(t.index-8)*30,r=14+8*t.reservoirDepthRatio,s=26*t.ritterFrontSpeedRatio,n=36*t.frontSpeedDeficitRatio;i.push({id:`reservoir-head-column-${t.index}`,kind:"reservoir_head_column",stationIndex:t.index,x:a,y:r*.5-8,z:-56,w:14,h:r,d:14,tone:"amber",label:`Station ${t.index} Reservoir Depth h/h₀ = ${t.reservoirDepthRatio.toFixed(4)}×`}),i.push({id:`ritter-celerity-vane-${t.index}`,kind:"ritter_celerity_vane",stationIndex:t.index,x:a,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useSaintVenantRitterLaw?"teal":"slate",label:`Station ${t.index} Ritter Front Speed u_f/2c₀ = ${t.ritterFrontSpeedRatio.toFixed(4)}×`}),i.push({id:`front-deficit-gauge-${t.index}`,kind:"front_deficit_gauge",stationIndex:t.index,x:a,y:n*.5-8,z:56,w:Math.min(24,12*t.frontSpeedDeficitRatio),h:n,d:12,tone:t.isFrontSpeedDeficitViolation?"crimson":"teal",label:`Station ${t.index} Deficit Ratio u_exact/u = ${t.frontSpeedDeficitRatio.toFixed(4)}×`})}return i.push({id:"sluice-collar-left",kind:"sluice_gate_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Nominal Sluice Gate (h = 1.000 h₀, u_front = 2.000 c₀)"}),i.push({id:"sluice-collar-right",kind:"sluice_gate_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useSaintVenantRitterLaw?"teal":"crimson",label:"Quadruple-Depth Dam Gate (h = 4.000 h₀, u_front = 4.000 c₀)"}),i.push({id:"riemann-bar-top",kind:"riemann_invariant_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Riemann Rarefaction Invariant R₊ = u + 2√(gh) = 2√(gh_res)"}),i.push({id:"riemann-bar-front",kind:"riemann_invariant_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useSaintVenantRitterLaw?"teal":"crimson",label:"Ritter Flood Front Lock Line (u_exact / u_model = 1.0000×)"}),i}const O=new URLSearchParams(window.location.search),T=O.get("preset"),W=O.get("theme")==="light"?"light":"dark";let l=T&&T in S?T:"saint_venant_ritter_riemann_celerity_lock",c=S[l].defaultStationIndex,x=W;document.documentElement.setAttribute("data-theme",x);const G=document.querySelector("#app");G.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 203 · 213TH DEMO · SHALLOW-WATER RIEMANN INVARIANTS &amp; DAM-BREAK FLOOD METROLOGY</span>
        <h1>Saint-Venant &amp; Ritter Dam-Break Flood Wave Celerity Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${x.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Flood Celerity Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="saint_venant_ritter_riemann_celerity_lock"
      >
        Saint-Venant &amp; Ritter u = 2√(gh) Law (u_ex/u = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_constant_speed_flood_front_deficit"
      >
        Naive Depth-Invariant Speed (Deficit = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED DEPTH h/h₀ / CELERITY c/c₀</span>
        <strong id="kpi-depth" class="kpi-value">--</strong>
        <span id="kpi-front" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FRONT SPEED RATIO (u_exact / u_model)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 SPEED RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">h/h₀ = 1.5625 / 2.2500 / 4.0000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CELERITY DEFICIT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC SAINT-VENANT DAM-BREAK RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Saint-Venant and Ritter dam-break flood wave celerity rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Reservoir Depth Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, h = 4.000 h₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION RITTER 2√(gh) VS CONSTANT-SPEED LEDGER</span>
          <span>R₊ = u + 2√(gh)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>h / h₀</th>
                <th>c / c₀</th>
                <th>u_f / 2c₀</th>
                <th>u_ex / u</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),N=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-depth"),j=document.querySelector("#kpi-front"),w=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),L=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),D=document.querySelector("#station-slider"),nt=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),V=document.querySelector("#theme-toggle");function f(e,i,t){const a=(e-t*.55)*.88,r=-i+(e*.18+t*.42)*.55;return[a,r]}function at(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ot(e,i,t,a,r,s,n,o,d,b,M){const p=a*.5,u=r*.5,h=s*.5,C=f(e+p,i-u,t-h),k=f(e+p,i-u,t+h),y=f(e-p,i-u,t+h),A=f(e-p,i+u,t-h),F=f(e+p,i+u,t-h),g=f(e+p,i+u,t+h),$=f(e-p,i+u,t+h),E=at(n,d),m=o?1.8:.7,I=o?"#ffffff":E.stroke,P=`${A[0].toFixed(1)},${A[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,U=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)}`,B=`${k[0].toFixed(1)},${k[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${g[0].toFixed(1)},${g[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${b}" data-solid-kind="${M}">
      <polygon points="${U}" fill="${E.left}" stroke="${I}" stroke-width="${m}" />
      <polygon points="${B}" fill="${E.right}" stroke="${I}" stroke-width="${m}" />
      <polygon points="${P}" fill="${E.top}" stroke="${I}" stroke-width="${m}" />
    </g>
  `}function _(e){const i=S[e.presetId],t=e.selectedStation,a=x==="dark";K.textContent=i.subtitle,N.textContent=i.badge,N.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`h/h₀ = ${t.reservoirDepthRatio.toFixed(4)}× (c/c₀ = ${t.waveCelerityRatio.toFixed(4)}×)`,j.textContent=`u_front/2c₀ = ${t.ritterFrontSpeedRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,w.textContent=`${t.frontSpeedDeficitRatio.toFixed(4)}×`,w.className=`kpi-value ${t.isFrontSpeedDeficitViolation?"text-danger":"text-ok"}`,X.textContent=`u = √(h/h₀) − 1 = ${t.celerityExcessU.toFixed(4)} | u_front = 2√(gh)`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,L.textContent=`${e.violatedCount} / ${e.stationCount}`,L.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,D.value=String(t.index),nt.textContent=`Station ${t.index} (u = ${t.celerityExcessU.toFixed(3)}, h/h₀ = ${t.reservoirDepthRatio.toFixed(3)}×, u_exact/u = ${t.frontSpeedDeficitRatio.toFixed(4)}×)`;const r=z(e);et.textContent=`${r.length} solids · ${e.stationCount} stations`;const s=[...r].sort((n,o)=>n.z-o.z||n.y-o.y||n.x-o.x);it.innerHTML=s.map(n=>ot(n.x,n.y,n.z,n.w,n.h,n.d,n.tone,n.stationIndex===t.index,a,n.id,n.kind)).join(""),q.innerHTML=e.stations.map(n=>{const o=n.index===t.index?"row-selected":"",d=n.isFrontSpeedDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${o}" data-station-row="${n.index}">
          <td>#${n.index}</td>
          <td>${n.celerityExcessU.toFixed(4)}</td>
          <td>${n.reservoirDepthRatio.toFixed(4)}×</td>
          <td>${n.waveCelerityRatio.toFixed(4)}×</td>
          <td>${n.ritterFrontSpeedRatio.toFixed(4)}×</td>
          <td class="${d}">${n.frontSpeedDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(n=>{const o=n.getAttribute("data-preset");n.classList.toggle("active",o===e.presetId)}),window.__SAINT_VENANT_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in S&&(l=i,c=S[l].defaultStationIndex,_(v(l,c)))})});D.addEventListener("input",()=>{c=Number(D.value),_(v(l,c))});q.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),_(v(l,c)))});V.addEventListener("click",()=>{x=x==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",x),V.textContent=`Theme: ${x.toUpperCase()}`,_(v(l,c))});_(v(l,c));
