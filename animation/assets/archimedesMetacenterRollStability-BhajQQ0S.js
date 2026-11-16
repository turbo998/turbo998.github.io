import"./modulepreload-polyfill-B5Qt9EMX.js";const m={archimedes_bouguer_metacentric_gm_lock:{id:"archimedes_bouguer_metacentric_gm_lock",label:"Archimedes-Bouguer Metacentric Law (GM = KB + I_wp/∇ − KG, Ratio = 1.0000×)",labelZh:"Archimedes-Bouguer 阿基米德-布格稳心扶正定律（GM = KB + I_wp/∇ − KG，扶正比恒锁 1.0000×）",subtitle:"Shifts the center of buoyancy B laterally by BM·sinθ = (I_wp/∇)sinθ as the hull heels, locking righting torque ratio τ_exact/τ_model = 1.0000× across all 17 stations.",subtitleZh:"计入船体横倾时入水/出水楔形水线面惯性矩带来的浮心外移 BM = I_wp/∇，令稳心高按 GM(u) = GM₀(1+u) 放大扶正力矩，在全 17 站恒定锁死扶正力矩比 1.0000×。",useBouguerMetacenterLaw:!0,defaultStationIndex:16,badge:"METACENTER GM LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"稳心扶正锁死 · 1.0000×（0/17 亏损站）",description:"Archimedes (c. 250 BC) and Pierre Bouguer (1746) proved that a heeling ship shifts its center of buoyancy outward by BM = I_wp / ∇, creating righting arm GZ = GM sinθ.",descriptionZh:"Archimedes（约前 250 年）与 Pierre Bouguer（1746，《船舶论》）证明：横倾船体的入水楔形使浮心向外侧移动 BM = I_wp / ∇，产生正比于稳心高 GM 的扶正力臂 GZ = GM sinθ。"},naive_fixed_buoyancy_center_capsizing_deficit:{id:"naive_fixed_buoyancy_center_capsizing_deficit",label:"Naive Fixed Buoyancy Center B₀ (ΔBM = 0, Deficit = 1 + u up to 2.0000×)",labelZh:"朴素固定浮心点模型（ΔBM = 0，横摇扶正力矩按 1+u 亏损至 2.0000×）",subtitle:"Pins the center of buoyancy B₀ rigidly to the hull mesh without waterplane wedge shift I_wp/∇, underestimating righting torque by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"将浮心 B₀ 死绑在船体网格局部坐标上而忽略水线面楔形转移项 I_wp/∇，使宽体船扶正力矩在第 4 站亏损 1.2500×、第 8 站亏损 1.5000×、第 16 站翻倍亏损至 2.0000×。",useBouguerMetacenterLaw:!1,defaultStationIndex:16,badge:"RIGHTING DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"扶正腰斩 · 最高 2.0000×（16/17 站违背）",description:"Naive game-boat buoyancy scripts apply upward force at a single fixed socket B₀, causing wide-beam ships with重心 G above B₀ to capsize instantly.",descriptionZh:"朴素游戏船只浮力脚本在单一固定骨骼点 B₀ 施加向上浮力，导致重心 G 高于浮心 B₀ 的现代宽体船失去水线面稳心半径 BM = B²/(12d) 的保护而瞬间翻船。"}},R=17;function Z(e){const t=1+Math.max(0,e);return{metacentricHeightRatio:t,rightingArmRatio:t}}function P(e,i=64){const o=1+Math.max(0,e),s=Math.max(2,i%2===0?i:i+1),r=1/s;let a=0+3*o;for(let n=1;n<s;n++){const c=n*r,x=n%2===1?4:2;a+=x*(3*o*c*c)}return r/3*a}function V(e,i){const t=Math.max(0,Math.min(R-1,e)),o=t/(R-1),s=Z(o),r=P(o,64),a=1+o,n=i?1:a;return{index:t,metacentricExcessU:o,metacentricHeightRatio:s.metacentricHeightRatio,rightingArmRatio:s.rightingArmRatio,quadratureRightingRatio:r,rightingTorqueDeficitRatio:n,naiveDeficitRatio:a,isRightingDeficitViolation:n>1.0001}}function M(e,i){const t=m[e],o=[];let s=0,r=0;for(let n=0;n<R;n++){const c=V(n,t.useBouguerMetacenterLaw);o.push(c),c.isRightingDeficitViolation&&s++;const x=Math.abs(c.metacentricHeightRatio-c.quadratureRightingRatio);x>r&&(r=x)}const a=i!==void 0?Math.max(0,Math.min(R-1,i)):t.defaultStationIndex;return{presetId:e,useBouguerMetacenterLaw:t.useBouguerMetacenterLaw,stationCount:R,selectedStation:o[a],stations:o,station4Ratio:o[4].rightingTorqueDeficitRatio,station8Ratio:o[8].rightingTorqueDeficitRatio,station12Ratio:o[12].rightingTorqueDeficitRatio,station16Ratio:o[16].rightingTorqueDeficitRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"ARCHIMEDES_METACENTER_RIGHTING_LOCKED":"NAIVE_FIXED_BUOYANCY_RIGHTING_DEFICIT"}}function K(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Archimedes-Bouguer Naval Hydrostatics Plinth"}),i.push({id:"waterplane-rail-front",kind:"waterplane_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Bouguer Metacentric Righting Torque Rail (τ_exact / τ_model = 1.0000×)"}),i.push({id:"waterplane-rail-back",kind:"waterplane_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Waterplane Inertia Metacentric Height Rail (GM / GM₀ = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,s=22*t.metacentricHeightRatio,r=26*t.rightingArmRatio,a=36*t.rightingTorqueDeficitRatio;i.push({id:`metacentric-radius-column-${t.index}`,kind:"metacentric_radius_column",stationIndex:t.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Metacentric Height GM/GM₀ = ${t.metacentricHeightRatio.toFixed(4)}×`}),i.push({id:`bouguer-righting-arm-vane-${t.index}`,kind:"bouguer_righting_arm_vane",stationIndex:t.index,x:o,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useBouguerMetacenterLaw?"teal":"slate",label:`Station ${t.index} Righting Arm GZ/GZ₀ = ${t.rightingArmRatio.toFixed(4)}×`}),i.push({id:`torque-deficit-gauge-${t.index}`,kind:"torque_deficit_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.rightingTorqueDeficitRatio),h:a,d:12,tone:t.isRightingDeficitViolation?"crimson":"teal",label:`Station ${t.index} Deficit Ratio τ_exact/τ = ${t.rightingTorqueDeficitRatio.toFixed(4)}×`})}return i.push({id:"gunwale-collar-left",kind:"hull_gunwale_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Baseline Hull Beam Gate (GM = 1.000 GM₀, τ = 1.000 τ₀)"}),i.push({id:"gunwale-collar-right",kind:"hull_gunwale_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useBouguerMetacenterLaw?"teal":"crimson",label:"Wide-Beam Catamaran/Barge Gate (GM = 2.000 GM₀, τ = 2.000 τ₀)"}),i.push({id:"buoyancy-bar-top",kind:"archimedes_buoyancy_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Bouguer Waterplane Wedge Shift BM = I_wp / ∇ = B² / (12 d)"}),i.push({id:"buoyancy-bar-front",kind:"archimedes_buoyancy_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useBouguerMetacenterLaw?"teal":"crimson",label:"Archimedes-Bouguer Righting Lock Line (τ_exact / τ_model = 1.0000×)"}),i}const D=new URLSearchParams(window.location.search),S=D.get("preset"),z=D.get("theme")==="light"?"light":"dark";let d=S&&S in m?S:"archimedes_bouguer_metacentric_gm_lock",l=m[d].defaultStationIndex,b=z;document.documentElement.setAttribute("data-theme",b);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 207 · 217TH DEMO · NAVAL HYDROSTATICS METACENTRIC HEIGHT &amp; ROLL STABILITY METROLOGY</span>
        <h1>Archimedes-Bouguer Metacentric Hull Roll Stability Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Hull Stability Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="archimedes_bouguer_metacentric_gm_lock"
      >
        Archimedes-Bouguer GM = KB+I_wp/∇−KG Law (τ_ex/τ = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_fixed_buoyancy_center_capsizing_deficit"
      >
        Naive Fixed Buoyancy Center B₀ (Deficit = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED METACENTRIC GM/GM₀ / ARM GZ/GZ₀</span>
        <strong id="kpi-gm" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">RIGHTING TORQUE RATIO (τ_exact / τ_model)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 TORQUE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">GM/GM₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">RIGHTING DEFICIT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC ARCHIMEDES-BOUGUER METACENTER RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Archimedes-Bouguer metacentric hull roll stability rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Metacentric Stability Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, GM = 2.000 GM₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION BOUGUER GM = KB+BM−KG VS FIXED B₀ LEDGER</span>
          <span>BM = I_wp / ∇</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>GM / GM₀</th>
                <th>GZ / GZ₀</th>
                <th>Wedge Quad</th>
                <th>τ_ex / τ</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const W=document.querySelector("#preset-subtitle"),A=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-gm"),j=document.querySelector("#kpi-quad"),C=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),F=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),v=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),H=document.querySelector("#station-tbody"),q=document.querySelector("#theme-toggle");function h(e,i,t){const o=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[o,s]}function ot(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,o,s,r,a,n,c,x,L){const u=o*.5,g=s*.5,p=r*.5,y=h(e+u,i-g,t-p),k=h(e+u,i-g,t+p),B=h(e-u,i-g,t+p),w=h(e-u,i+g,t-p),E=h(e+u,i+g,t-p),f=h(e+u,i+g,t+p),I=h(e-u,i+g,t+p),$=ot(a,c),T=n?1.8:.7,G=n?"#ffffff":$.stroke,N=`${w[0].toFixed(1)},${w[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)}`,O=`${B[0].toFixed(1)},${B[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)}`,U=`${k[0].toFixed(1)},${k[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${x}" data-solid-kind="${L}">
      <polygon points="${O}" fill="${$.left}" stroke="${G}" stroke-width="${T}" />
      <polygon points="${U}" fill="${$.right}" stroke="${G}" stroke-width="${T}" />
      <polygon points="${N}" fill="${$.top}" stroke="${G}" stroke-width="${T}" />
    </g>
  `}function _(e){const i=m[e.presetId],t=e.selectedStation,o=b==="dark";W.textContent=i.subtitle,A.textContent=i.badge,A.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`GM/GM₀ = ${t.metacentricHeightRatio.toFixed(4)}× (GZ/GZ₀ = ${t.rightingArmRatio.toFixed(4)}×)`,j.textContent=`Wedge Quad = ${t.quadratureRightingRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,C.textContent=`${t.rightingTorqueDeficitRatio.toFixed(4)}×`,C.className=`kpi-value ${t.isRightingDeficitViolation?"text-danger":"text-ok"}`,X.textContent=`u = GM/GM₀ − 1 = ${t.metacentricExcessU.toFixed(4)} | BM = I_wp / ∇`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,F.textContent=`${e.violatedCount} / ${e.stationCount}`,F.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,v.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.metacentricExcessU.toFixed(3)}, GM/GM₀ = ${t.metacentricHeightRatio.toFixed(3)}×, τ_exact/τ = ${t.rightingTorqueDeficitRatio.toFixed(4)}×)`;const s=K(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);it.innerHTML=r.map(a=>nt(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),H.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",c=a.isRightingDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.metacentricExcessU.toFixed(4)}</td>
          <td>${a.metacentricHeightRatio.toFixed(4)}×</td>
          <td>${a.rightingArmRatio.toFixed(4)}×</td>
          <td>${a.quadratureRightingRatio.toFixed(4)}×</td>
          <td class="${c}">${a.rightingTorqueDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__ARCHIMEDES_METACENTER_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in m&&(d=i,l=m[d].defaultStationIndex,_(M(d,l)))})});v.addEventListener("input",()=>{l=Number(v.value),_(M(d,l))});H.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(l=Number(i.getAttribute("data-station-row")),_(M(d,l)))});q.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),q.textContent=`Theme: ${b.toUpperCase()}`,_(M(d,l))});_(M(d,l));
