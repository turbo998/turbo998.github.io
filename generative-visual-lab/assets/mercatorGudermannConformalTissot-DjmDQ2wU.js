import"./modulepreload-polyfill-B5Qt9EMX.js";const f={mercator_gudermann_conformal_isotropy:{id:"mercator_gudermann_conformal_isotropy",label:"Mercator-Gudermann Conformal Isotropy (k_meridian = sec φ, Aspect = 1.0000×)",labelZh:"Mercator-Gudermann 等角正轴投影（经向拉伸 k_m = sec φ，底索指示圆长宽比 1.0000×）",subtitle:"Matches meridional scale dy/dφ = sec φ = 1+u to parallel scale k_p = sec φ via y = gd⁻¹(φ) = ln(sec φ + tan φ), locking Tissot aspect ratio at 1.0000× across all 17 stations.",subtitleZh:"通过逆古德曼函数 y = gd⁻¹(φ) = ln(sec φ + tan φ) 令经向比例因子 dy/dφ = sec φ = 1+u 精确等于纬向比例因子 k_p = sec φ，在全 17 站锁死底索指示圆长宽比 1.0000×。",conformalGudermannStretch:!0,defaultStationIndex:16,badge:"CONFORMAL · k_p/k_m = 1.0000× (0/17 VIOLATIONS)",badgeZh:"等角保形 · 长宽比 1.0000×（0/17 畸变站）",description:"Gerardus Mercator (1569) & Christoph Gudermann (1830) proved that a sphere-to-cylinder unwrap preserves local angles and circular crater/cloud shapes if and only if meridional stretch equals parallel secant stretch sec φ.",descriptionZh:"Gerardus Mercator（1569）与 Christoph Gudermann（1830）证明：球面到圆柱展开唯有令经向比例因子等于纬向正割拉伸 sec φ，才能严格保持局部夹角与陨石坑/气旋圆形纹理不发生长宽比剪切。"},naive_plate_carree_aspect_shear:{id:"naive_plate_carree_aspect_shear",label:"Naive Equirectangular Plate Carrée (y = φ, Aspect = 1 + u up to 2.0000×)",labelZh:"朴素等距圆柱方格投影（Plate Carrée y = φ，底索椭圆长宽比按 1+u 飙升至 2.0000×）",subtitle:"Maps latitude linearly to vertical UV (k_meridian = 1) while parallel scale stretches as sec φ = 1+u, shearing circular decals horizontally to 1.2500× at station 4, 1.5000× at station 8, and 2.0000× at φ = 60°.",subtitleZh:"将纬度线性映射为纵向 UV（k_meridian = 1），而纬圈周长按 sec φ = 1+u 拉伸，导致圆形贴花在第 4 站被横向拉扁至 1.2500×、第 8 站 1.5000×、第 16 站（φ=60°）达 2.0000×。",conformalGudermannStretch:!1,defaultStationIndex:16,badge:"ANISOTROPIC SHEAR · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"各向异性拉扁 · 最高 2.0000×（16/17 站违背）",description:"Naive equirectangular skyboxes and planetary UV maps use v = φ/π + 0.5 without Gudermannian meridional compensation, stretching every high-latitude feature horizontally by sec φ.",descriptionZh:"朴素全景天空盒与行星 UV 贴图直接使用 v = φ/π + 0.5 而不做古德曼经向补偿，导致高纬度所有云团、陨石坑与噪波核被横向拉长 sec φ 倍。"}},k=17;function D(e){const a=Math.max(0,e),t=1+a,o=Math.sqrt(a*(2+a)),n=Math.acos(1/t),r=Math.log(t+o);return{parallelScaleFactor:t,latitudeRad:n,gudermannianY:r}}function H(e,a=64){const o=1+Math.max(0,e),n=Math.acos(1/o);if(n<=1e-15)return{parallelScaleFactor:o,latitudeRad:0,gudermannianY:0};const r=Math.max(2,a%2===0?a:a+1),i=n/r;let s=1+o;for(let c=1;c<r;c++){const S=c*i,d=c%2===1?4:2;s+=d/Math.cos(S)}const l=i/3*s;return{parallelScaleFactor:o,latitudeRad:n,gudermannianY:l}}function z(e,a){const t=Math.max(0,Math.min(k-1,e)),o=t/(k-1),n=D(o),r=H(o,64),i=n.parallelScaleFactor,s=i,l=a?i:1,c=a?i/l:s,S=c-1;return{index:t,secantExcessU:o,parallelScaleFactor:i,latitudeRad:n.latitudeRad,latitudeDeg:n.latitudeRad*180/Math.PI,gudermannianY:n.gudermannianY,quadratureGudermannianY:r.gudermannianY,activeMeridionalScale:l,activeTissotAspectRatio:c,naiveTissotAspectRatio:s,relativeStretchExcess:S,isAnisotropicViolation:c>1.0001}}function v(e,a){const t=f[e],o=[];let n=0,r=0;for(let s=0;s<k;s++){const l=z(s,t.conformalGudermannStretch);o.push(l),l.isAnisotropicViolation&&n++;const c=Math.abs(l.gudermannianY-l.quadratureGudermannianY);c>r&&(r=c)}const i=a!==void 0?Math.max(0,Math.min(k-1,a)):t.defaultStationIndex;return{presetId:e,conformalGudermannStretch:t.conformalGudermannStretch,stationCount:k,selectedStation:o[i],stations:o,station4AspectRatio:o[4].activeTissotAspectRatio,station8AspectRatio:o[8].activeTissotAspectRatio,station12AspectRatio:o[12].activeTissotAspectRatio,station16AspectRatio:o[16].activeTissotAspectRatio,violatedCount:n,maxQuadratureError:r,verdict:n===0?"CONFORMAL_TISSOT_CIRCULAR_LOCKED":"PLATE_CARREE_ANISOTROPIC_SHEAR_VIOLATION"}}function Z(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Mercator-Gudermann Conformal Tissot Metrology Plinth"}),a.push({id:"equator-rail-front",kind:"equator_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Equatorial Unit Scale Reference Rail (k = 1.0000×)"}),a.push({id:"equator-rail-back",kind:"equator_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Parallel Secant Stretch Rail (k_parallel = sec φ = 1 + u)"});for(const t of e.stations){const o=(t.index-8)*30,n=32*t.parallelScaleFactor,r=32*t.activeMeridionalScale,i=36*t.activeTissotAspectRatio;a.push({id:`globe-parallel-ring-${t.index}`,kind:"globe_parallel_ring",stationIndex:t.index,x:o,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Parallel Scale k_p = ${t.parallelScaleFactor.toFixed(4)}×`}),a.push({id:`meridional-scale-strut-${t.index}`,kind:"meridional_scale_strut",stationIndex:t.index,x:o,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.conformalGudermannStretch?"teal":"slate",label:`Station ${t.index} Meridional Scale k_m = ${t.activeMeridionalScale.toFixed(4)}×`}),a.push({id:`tissot-indicatrix-disc-${t.index}`,kind:"tissot_indicatrix_disc",stationIndex:t.index,x:o,y:i*.5-8,z:56,w:Math.min(24,12*t.activeTissotAspectRatio),h:i,d:12,tone:t.isAnisotropicViolation?"crimson":"teal",label:`Station ${t.index} Tissot Indicatrix Aspect = ${t.activeTissotAspectRatio.toFixed(4)}×`})}return a.push({id:"shear-excess-cap-left",kind:"shear_excess_cap",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Equator Boundary Anchor (φ = 0°, u = 0.000)"}),a.push({id:"shear-excess-cap-right",kind:"shear_excess_cap",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.conformalGudermannStretch?"teal":"crimson",label:"High-Latitude 60° Boundary Gate (sec 60° = 2.0000×)"}),a.push({id:"gudermann-guide-bar-top",kind:"gudermann_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Gudermannian Secant Envelope Guide"}),a.push({id:"gudermann-guide-bar-front",kind:"gudermann_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.conformalGudermannStretch?"teal":"crimson",label:"Conformal Circularity Unity Lock Line (Aspect = 1.0000×)"}),a}const N=new URLSearchParams(window.location.search),C=N.get("preset"),B=N.get("theme")==="light"?"light":"dark";let p=C&&C in f?C:"mercator_gudermann_conformal_isotropy",u=f[p].defaultStationIndex,m=B;document.documentElement.setAttribute("data-theme",m);const j=document.querySelector("#app");j.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 191 · SPHERICAL CONFORMAL UV &amp; TISSOT INDICATRIX METROLOGY</span>
        <h1>Mercator-Gudermann Conformal Tissot Indicatrix Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${m.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Projection Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="mercator_gudermann_conformal_isotropy"
      >
        Mercator-Gudermann Conformal (Aspect = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_plate_carree_aspect_shear"
      >
        Naive Plate Carrée UV (Aspect = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED LATITUDE φ / EXCESS u</span>
        <strong id="kpi-latitude" class="kpi-value">--</strong>
        <span id="kpi-gudermann-y" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">TISSOT ASPECT RATIO (k_p / k_m)</span>
        <strong id="kpi-aspect" class="kpi-value">--</strong>
        <span id="kpi-meridional" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 ASPECT</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">u = 0.250 / 0.500 / 1.000 (φ = 60°)</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">ANISOTROPIC VIOLATED STATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC TISSOT CONFORMAL RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Mercator-Gudermann conformal Tissot indicatrix rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Latitude Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, φ = 60.00°)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION CONFORMAL VS PLATE CARRÉE LEDGER</span>
          <span>gd⁻¹(φ) = ln(sec φ + tan φ)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>φ (deg)</th>
                <th>k_p (sec φ)</th>
                <th>k_m</th>
                <th>Aspect</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),X=document.querySelector("#kpi-latitude"),K=document.querySelector("#kpi-gudermann-y"),q=document.querySelector("#kpi-aspect"),W=document.querySelector("#kpi-meridional"),J=document.querySelector("#kpi-stations-4816"),P=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),at=document.querySelector("#rig-svg"),I=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),w=document.querySelector("#station-tbody"),G=document.querySelector("#theme-toggle");function g(e,a,t){const o=(e-t*.55)*.88,n=-a+(e*.18+t*.42)*.55;return[o,n]}function ot(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,a,t,o,n,r,i,s,l,c,S){const d=o*.5,h=n*.5,x=r*.5,E=g(e+d,a-h,t-x),$=g(e+d,a-h,t+x),y=g(e-d,a-h,t+x),M=g(e-d,a+h,t-x),A=g(e+d,a+h,t-x),b=g(e+d,a+h,t+x),T=g(e-d,a+h,t+x),F=ot(i,l),R=s?1.8:.7,O=s?"#ffffff":F.stroke,U=`${M[0].toFixed(1)},${M[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)}`,V=`${y[0].toFixed(1)},${y[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)}`,Y=`${$[0].toFixed(1)},${$[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${c}" data-solid-kind="${S}">
      <polygon points="${V}" fill="${F.left}" stroke="${O}" stroke-width="${R}" />
      <polygon points="${Y}" fill="${F.right}" stroke="${R}" />
      <polygon points="${U}" fill="${F.top}" stroke="${O}" stroke-width="${R}" />
    </g>
  `}function _(e){const a=f[e.presetId],t=e.selectedStation,o=m==="dark";Q.textContent=a.subtitle,L.textContent=a.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,X.textContent=`φ = ${t.latitudeDeg.toFixed(2)}° (u = ${t.secantExcessU.toFixed(4)})`,K.textContent=`y = gd⁻¹(φ) = ${t.gudermannianY.toFixed(4)} (Quad err ${e.maxQuadratureError.toExponential(2)})`,q.textContent=`${t.activeTissotAspectRatio.toFixed(4)}×`,q.className=`kpi-value ${t.isAnisotropicViolation?"text-danger":"text-ok"}`,W.textContent=`k_p = ${t.parallelScaleFactor.toFixed(4)}× | k_m = ${t.activeMeridionalScale.toFixed(4)}×`,J.textContent=`${e.station4AspectRatio.toFixed(4)}× / ${e.station8AspectRatio.toFixed(4)}× / ${e.station16AspectRatio.toFixed(4)}×`,P.textContent=`${e.violatedCount} / ${e.stationCount}`,P.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,I.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.secantExcessU.toFixed(3)}, φ = ${t.latitudeDeg.toFixed(2)}°, Aspect = ${t.activeTissotAspectRatio.toFixed(4)}×)`;const n=Z(e);et.textContent=`${n.length} solids · ${e.stationCount} stations`;const r=[...n].sort((i,s)=>i.z-s.z||i.y-s.y||i.x-s.x);at.innerHTML=r.map(i=>nt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,o,i.id,i.kind)).join(""),w.innerHTML=e.stations.map(i=>{const s=i.index===t.index?"row-selected":"",l=i.isAnisotropicViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.secantExcessU.toFixed(4)}</td>
          <td>${i.latitudeDeg.toFixed(2)}°</td>
          <td>${i.parallelScaleFactor.toFixed(4)}×</td>
          <td>${i.activeMeridionalScale.toFixed(4)}×</td>
          <td class="${l}">${i.activeTissotAspectRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const s=i.getAttribute("data-preset");i.classList.toggle("active",s===e.presetId)}),window.__CONFORMAL_TISSOT_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in f&&(p=a,u=f[p].defaultStationIndex,_(v(p,u)))})});I.addEventListener("input",()=>{u=Number(I.value),_(v(p,u))});w.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(u=Number(a.getAttribute("data-station-row")),_(v(p,u)))});G.addEventListener("click",()=>{m=m==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",m),G.textContent=`Theme: ${m.toUpperCase()}`,_(v(p,u))});_(v(p,u));
