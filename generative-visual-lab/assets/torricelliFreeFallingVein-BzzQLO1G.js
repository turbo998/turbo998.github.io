import"./modulepreload-polyfill-B5Qt9EMX.js";const f={torricelli_castelli_quarter_power_vein_lock:{id:"torricelli_castelli_quarter_power_vein_lock",label:"Torricelli-Castelli Tapering Vein Law (R(z) = R₀(1+2gz/v₀²)^(−1/4), Q/Q₀ = 1.0000×)",labelZh:"Torricelli-Castelli 托里拆利-卡斯泰利落水束缩颈定律（R(z) = R₀/√(v/v₀)，流量比恒锁 1.0000×）",subtitle:"Tapers the free-falling liquid vein radius as R(z) = R₀ / √(1 + u) so cross-sectional area A(z) = A₀ / (1 + u) exactly cancels gravity acceleration v(z) = v₀(1 + u), locking Q(z)/Q₀ = 1.0000× across all 17 stations.",subtitleZh:"结合托里拆利重力加速 v(z) = √(v₀² + 2gz) 与卡斯泰利连续性方程 A(z)v(z) = Q₀，令落水束半径按 R₀/√(1+u) 收缩，在全 17 站恒定锁死体积流量比 Q(z)/Q₀ = 1.0000×。",useTorricelliVeinLaw:!0,defaultStationIndex:16,badge:"TORRICELLI VEIN LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"落水缩颈锁死 · 1.0000×（0/17 虚胖站）",description:"Benedetto Castelli (1628) and Evangelista Torricelli (1644) proved that a falling liquid vein accelerates as v(z) = √(v₀² + 2gz), tapering its radius as R(z) = R₀ (1 + 2gz/v₀²)^(−1/4).",descriptionZh:"Castelli（1628，《论流水之度量》）与 Torricelli（1644）严格证明：自由下落液流在下落高度 z 处加速至 v(z) = √(v₀² + 2gz)，为保持流量 Q 守恒，水柱半径必须按 −1/4 次幂平滑收腰变细。"},naive_constant_radius_cylinder_flux_bloat:{id:"naive_constant_radius_cylinder_flux_bloat",label:"Naive Constant-Radius Cylinder Stream (R(z) = R₀, Flux Bloat = 1 + u up to 2.0000×)",labelZh:"朴素等粗圆柱落水模型（R(z) = R₀，体积流量与截面按 v/v₀ = 1+u 虚胖至 2.0000×）",subtitle:"Extrudes a uniform-radius cylinder R(z) = R₀ downward while gravity accelerates the liquid speed to v₀(1+u), bloating volumetric flux by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"用上下一样粗的圆柱网格渲染水龙头或茶壶落水柱，无视重力加速带来的 −1/4 次幂缩颈，使表观体积流量与截面面积在第 4 站虚胖至 1.2500×、第 8 站冲至 1.5000×、第 16 站翻倍膨胀至 2.0000×。",useTorricelliVeinLaw:!1,defaultStationIndex:16,badge:"FLUX BLOAT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"流量虚胖 · 最高 2.0000×（16/17 站违背）",description:"Naive pouring shaders use a static cylindrical tube of constant radius R₀, looking like a solid glass rod and violating continuity by 2.0000× at 2× falling speed.",descriptionZh:"朴素倒水/水龙头着色器直接放置一根上下等粗的圆柱体贴图，既像僵硬的玻璃棒，又在两倍下落速度处凭空多造出 2.0000× 的液体流量。"}},h=17;function P(e){const t=1+Math.max(0,e),o=1/t,n=Math.sqrt(o);return{fallingSpeedRatio:t,veinRadiusRatio:n,veinCrossSectionAreaRatio:o}}function D(e,i=64){const o=1/(1+Math.max(0,e)),n=Math.max(2,i%2===0?i:i+1),s=1/n;let a=2*o;for(let l=1;l<n;l++){const r=l*s,g=l%2===1?4:2;a+=g*(2*o*r)}return s/3*a}function G(e,i){const t=Math.max(0,Math.min(h-1,e)),o=t/(h-1),n=P(o),s=D(o,64),a=1+o,l=i?1:a;return{index:t,gravitySpeedExcessU:o,fallingSpeedRatio:n.fallingSpeedRatio,veinRadiusRatio:n.veinRadiusRatio,veinCrossSectionAreaRatio:n.veinCrossSectionAreaRatio,quadratureAreaRatio:s,volumetricFluxRatio:l,naiveFluxBloatRatio:a,isFluxBloatViolation:l>1.0001}}function k(e,i){const t=f[e],o=[];let n=0,s=0;for(let l=0;l<h;l++){const r=G(l,t.useTorricelliVeinLaw);o.push(r),r.isFluxBloatViolation&&n++;const g=Math.abs(r.veinCrossSectionAreaRatio-r.quadratureAreaRatio);g>s&&(s=g)}const a=i!==void 0?Math.max(0,Math.min(h-1,i)):t.defaultStationIndex;return{presetId:e,useTorricelliVeinLaw:t.useTorricelliVeinLaw,stationCount:h,selectedStation:o[a],stations:o,station4Ratio:o[4].volumetricFluxRatio,station8Ratio:o[8].volumetricFluxRatio,station12Ratio:o[12].volumetricFluxRatio,station16Ratio:o[16].volumetricFluxRatio,violatedCount:n,maxQuadratureError:s,verdict:n===0?"TORRICELLI_CASTELLI_CONTINUITY_LOCKED":"NAIVE_CONSTANT_RADIUS_FLUX_BLOAT"}}function Z(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Torricelli-Castelli Free-Falling Liquid Vein Metrology Plinth"}),i.push({id:"castelli-rail-front",kind:"castelli_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Castelli Continuity Lock Rail (Q(z) / Q₀ = A(z)v(z) / Q₀ = 1.0000×)"}),i.push({id:"castelli-rail-back",kind:"castelli_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Torricelli Gravity Speed Rail (v(z) / v₀ = √(1 + 2gz/v₀²) = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,n=22*t.fallingSpeedRatio,s=44*t.veinCrossSectionAreaRatio,a=36*t.volumetricFluxRatio;i.push({id:`falling-velocity-column-${t.index}`,kind:"falling_velocity_column",stationIndex:t.index,x:o,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Gravity Speed v(z)/v₀ = ${t.fallingSpeedRatio.toFixed(4)}×`}),i.push({id:`torricelli-tapering-vein-${t.index}`,kind:"torricelli_tapering_vein",stationIndex:t.index,x:o,y:s*.5-8,z:0,w:16*t.veinRadiusRatio,h:s,d:16*t.veinRadiusRatio,tone:e.useTorricelliVeinLaw?"teal":"slate",label:`Station ${t.index} Vein Area A(z)/A₀ = ${t.veinCrossSectionAreaRatio.toFixed(4)}× (R/R₀ = ${t.veinRadiusRatio.toFixed(4)}×)`}),i.push({id:`flux-bloat-gauge-${t.index}`,kind:"flux_bloat_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.volumetricFluxRatio),h:a,d:12,tone:t.isFluxBloatViolation?"crimson":"teal",label:`Station ${t.index} Flux Ratio Q(z)/Q₀ = ${t.volumetricFluxRatio.toFixed(4)}×`})}return i.push({id:"orifice-collar-left",kind:"faucet_orifice_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Nozzle Exit Orifice Gate (z = 0, v = 1.000 v₀, R = 1.000 R₀)"}),i.push({id:"orifice-collar-right",kind:"faucet_orifice_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useTorricelliVeinLaw?"teal":"crimson",label:"Gravity Drop Gate (2gz = 3v₀², v = 2.000 v₀, R = 0.7071 R₀, A = 0.500 A₀)"}),i.push({id:"waist-bar-top",kind:"quarter_power_waist_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Torricelli-Castelli Quarter-Power Law: R(z) = R₀ (1 + 2gz/v₀²)^(−1/4)"}),i.push({id:"waist-bar-front",kind:"quarter_power_waist_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useTorricelliVeinLaw?"teal":"crimson",label:"Volumetric Flux Conservation Line (Q(z) / Q₀ = 1.0000×)"}),i}const V=new URLSearchParams(window.location.search),L=V.get("preset"),Y=V.get("theme")==="light"?"light":"dark";let d=L&&L in f?L:"torricelli_castelli_quarter_power_vein_lock",c=f[d].defaultStationIndex,R=Y;document.documentElement.setAttribute("data-theme",R);const H=document.querySelector("#app");H.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 212 · 222ND DEMO · FREE-FALLING LIQUID STREAM TORRICELLI-CASTELLI CONTINUITY METROLOGY</span>
        <h1>Torricelli-Castelli Free-Falling Liquid Vein Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${R.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Falling Liquid Vein Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="torricelli_castelli_quarter_power_vein_lock"
      >
        Torricelli-Castelli R(z) = R₀(1+2gz/v₀²)^(−1/4) Law (Q/Q₀ = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_constant_radius_cylinder_flux_bloat"
      >
        Naive Constant-Radius Cylinder R = R₀ (Flux Bloat = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED RADIUS R(z)/R₀ / AREA A(z)/A₀</span>
        <strong id="kpi-vein" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">VOLUMETRIC FLUX RATIO (Q(z) / Q₀)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 FLUX RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">v(z)/v₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CONTINUITY BLOAT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC TORRICELLI-CASTELLI FALLING VEIN RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Torricelli-Castelli free-falling liquid vein rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Gravity Speed Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, v = 2.000 v₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION TORRICELLI R = R₀/√(v/v₀) VS CYLINDER LEDGER</span>
          <span>A(z)v(z) = Q₀</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>v(z)/v₀</th>
                <th>R(z)/R₀</th>
                <th>A(z)/A₀</th>
                <th>Q(z)/Q₀</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const X=document.querySelector("#preset-subtitle"),y=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-vein"),K=document.querySelector("#kpi-quad"),w=document.querySelector("#kpi-ratio"),W=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),q=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),E=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),N=document.querySelector("#station-tbody"),O=document.querySelector("#theme-toggle");function x(e,i,t){const o=(e-t*.55)*.88,n=-i+(e*.18+t*.42)*.55;return[o,n]}function ot(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,o,n,s,a,l,r,g,Q){const u=o*.5,p=n*.5,v=s*.5,A=x(e+u,i-p,t-v),F=x(e+u,i-p,t+v),z=x(e-u,i-p,t+v),m=x(e-u,i+p,t-v),$=x(e+u,i+p,t-v),b=x(e+u,i+p,t+v),I=x(e-u,i+p,t+v),T=ot(a,r),_=l?1.8:.7,C=l?"#ffffff":T.stroke,M=`${m[0].toFixed(1)},${m[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)}`,U=`${z[0].toFixed(1)},${z[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)}`,B=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${Q}">
      <polygon points="${U}" fill="${T.left}" stroke="${C}" stroke-width="${_}" />
      <polygon points="${B}" fill="${T.right}" stroke="${C}" stroke-width="${_}" />
      <polygon points="${M}" fill="${T.top}" stroke="${C}" stroke-width="${_}" />
    </g>
  `}function S(e){const i=f[e.presetId],t=e.selectedStation,o=R==="dark";X.textContent=i.subtitle,y.textContent=i.badge,y.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`R/R₀ = ${t.veinRadiusRatio.toFixed(4)}× (A/A₀ = ${t.veinCrossSectionAreaRatio.toFixed(4)}×)`,K.textContent=`Bernoulli Quad = ${t.quadratureAreaRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,w.textContent=`${t.volumetricFluxRatio.toFixed(4)}×`,w.className=`kpi-value ${t.isFluxBloatViolation?"text-danger":"text-ok"}`,W.textContent=`u = v(z)/v₀ − 1 = ${t.gravitySpeedExcessU.toFixed(4)} | R = R₀(1+2gz/v₀²)^(−1/4)`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,q.textContent=`${e.violatedCount} / ${e.stationCount}`,q.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,E.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.gravitySpeedExcessU.toFixed(3)}, v/v₀ = ${t.fallingSpeedRatio.toFixed(3)}×, Q/Q₀ = ${t.volumetricFluxRatio.toFixed(4)}×)`;const n=Z(e);et.textContent=`${n.length} solids · ${e.stationCount} stations`;const s=[...n].sort((a,l)=>a.z-l.z||a.y-l.y||a.x-l.x);it.innerHTML=s.map(a=>nt(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),N.innerHTML=e.stations.map(a=>{const l=a.index===t.index?"row-selected":"",r=a.isFluxBloatViolation?"cell-fail":"cell-pass";return`
        <tr class="${l}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.gravitySpeedExcessU.toFixed(4)}</td>
          <td>${a.fallingSpeedRatio.toFixed(4)}×</td>
          <td>${a.veinRadiusRatio.toFixed(4)}×</td>
          <td>${a.veinCrossSectionAreaRatio.toFixed(4)}×</td>
          <td class="${r}">${a.volumetricFluxRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const l=a.getAttribute("data-preset");a.classList.toggle("active",l===e.presetId)}),window.__TORRICELLI_VEIN_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in f&&(d=i,c=f[d].defaultStationIndex,S(k(d,c)))})});E.addEventListener("input",()=>{c=Number(E.value),S(k(d,c))});N.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),S(k(d,c)))});O.addEventListener("click",()=>{R=R==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",R),O.textContent=`Theme: ${R.toUpperCase()}`,S(k(d,c))});S(k(d,c));
