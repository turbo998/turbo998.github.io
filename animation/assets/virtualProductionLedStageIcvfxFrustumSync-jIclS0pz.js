import"./modulepreload-polyfill-B5Qt9EMX.js";const k={icvfx_inner_frustum_genlock_3dgs_lock:{id:"icvfx_inner_frustum_genlock_3dgs_lock",label:"ICVFX Tracked Inner-Frustum 3DGS/UE5 + Outer 360° AIGC HDRI Dome + PTP Genlock (c_icvfx = c_0/(1+u), Lock = 1.0000×)",labelZh:"ICVFX 追踪内视锥（3DGS/UE5 实时透视）+ 外视锥 360° AIGC HDRI 照明 + PTP 帧同步锁相（单镜成本 c_0/(1+u)，恒锁 1.0000×）",subtitle:"Couples 6DoF camera tracking with real-time off-axis Inner-Frustum 3DGS/UE5 projection, Outer-Dome 360° HDRI car/skin reflections, and PTP/Genlock shutter sync across all 17 stages.",subtitleZh:"通过 6DoF 摄影机光学追踪驱动内视锥（Inner Frustum）3D 高斯泼溅/UE5 离轴透视实时解算，外视锥与天幕播放 360° AIGC HDRI 提供真实车身/肤色环境光反射，配合 PTP/Genlock 锁相消除扫描黑带，全 17 阶段恒锁 1.0000×。",useIcvfxFrustumGenlock:!0,defaultStationIndex:16,badge:"ICVFX FINAL-PIXEL LOCKED · 1.0000× (0/17 ROTO)",badgeZh:"ICVFX 机内直出锁死 · 1.0000×（0/17 站穿帮）",description:"Enterprise xR keynotes and automotive LED-volume commercials achieve in-camera final pixels without green-screen spill or flat-wall parallax collapse.",descriptionZh:"企业高管 xR 发布会与汽车 LED 虚拟影棚通过“内视锥 3DGS 实时视差 + 外视锥 AIGC 全景天幕反射 + Genlock 锁相”实现机内直出（Final Pixel）。"},naive_static_2d_led_greenscreen_spill:{id:"naive_static_2d_led_greenscreen_spill",label:"Naive Untracked 2D AIGC Video on LED Wall / Green-Screen Spill Rotoscoping (Parallax & Roto Overrun = 1 + u up to 2.0000×)",labelZh:"朴素 LED 巨幕直放 2D AIGC 视频或传统绿幕拍摄（机位移动透视扁平穿帮、快门扫描黑带与绿幕溢色抠像，返工超支达 2.0000×）",subtitle:"Plays a flat 2D AI video on the LED wall without camera-tracked off-axis projection or Genlock sync (or shoots on green screen), causing flat-poster parallax collapse, rolling-shutter black bars, and 2.0000× post-roto overrun at Stage 16.",subtitleZh:"直接把一张平面 2D AI 视频投在弧形 LED 屏上并用移动机位拍摄（或使用传统绿幕），导致摄像机一横移背景就像贴纸一样失去三维透视关系、未锁相引发满屏黑色扫描横条、或绿幕反光污染车漆发丝，第 16 阶段后期逐帧擦除成本翻倍至 2.0000×。",useIcvfxFrustumGenlock:!1,defaultStationIndex:16,badge:"PARALLAX COLLAPSE & GREEN SPILL · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"透视穿帮与扫描黑带 · 最高 2.0000×（16/17 站违背）",description:"Playing untracked 2D video on an LED wall breaks 3D motion parallax the instant the camera moves, forcing 2.0000× frame-by-frame post-production replacement across 16/17 stages.",descriptionZh:"在弧形 LED 屏上播放无相机追踪的 2D 视频会在机位移动瞬间暴露壁纸感透视错误，迫使后期团队把整面屏幕抠掉重做。"}},I=17,T=["Stage 0: Locked Tripod Nodal Pan / Static Talk-Show Backdrop (Baseline)","Stage 1: AIGC 360° 16-Bit Equirectangular EXR HDRI Sky Dome Gen","Stage 2: Multi-View Diffusion -> SPZ 3D Gaussian Splatting Stage Scene","Stage 3: 6DoF Optical Camera Tracker (Mo-Sys / Stype FreeD Protocol)","Stage 4: Off-Axis Asymmetric Frustum Projection Matrix Solve","Stage 5: Inner-Frustum 90fps 3DGS + UE5 Hybrid Render Node","Stage 6: Outer-Frustum & Ceiling LED Low-Res IBL Specular Reflection","Stage 7: PTPv2 IEEE-1588 + Tri-Level Genlock Shutter Phase Lock","Stage 8: 2-Frame Tracker-to-Photon Motion Prediction Kalman Filter","Stage 9: Camera-to-LED Color Space Calibration (ACEScg / Brompton 3D LUT)","Stage 10: Lens Distortion & Vignette Real-Time ST-Map Inverse Warp","Stage 11: Shallow Depth-of-Field Physical Lens Bokeh Anti-Moire Guard","Stage 12: Multi-Camera Dual-Frustum Time-Division Multiplexing","Stage 13: Set-Extension Virtual Set Seam Blending Beyond LED Bezel","Stage 14: Automotive Clearcoat Specular Horizon Continuity Lock","Stage 15: Zero Green-Spill Hair & Transparent Glass In-Camera Capture","Stage 16: 24-Location Global Commercial Shot in 1 LED Day (0.50 c_0)"];function q(e){const t=1+Math.max(0,e),a=1/t;return{rotoPerspectiveAmplification:t,icvfxSyncAmortizedUnitCost:a}}function z(e,o=64){const a=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),r=1/s;let i=2*a;for(let n=1;n<s;n++){const l=n*r,m=n%2===1?4:2;i+=m*(2*a*l)}return r/3*i}function H(e,o){const t=Math.max(0,Math.min(I-1,e)),a=t/(I-1),s=q(a),r=z(a,64),i=1+a,n=o?1:i;return{index:t,cameraParallaxU:a,rotoPerspectiveAmplification:s.rotoPerspectiveAmplification,icvfxSyncAmortizedUnitCost:s.icvfxSyncAmortizedUnitCost,quadratureFrustumSyncCost:r,finalPixelBudgetRatio:n,naiveStaticLedOverrunRatio:i,icvfxStageLabel:T[t]??T[0],isFrustumOrGenlockViolation:n>1.0001}}function b(e,o){const t=k[e],a=[];let s=0,r=0;for(let n=0;n<I;n++){const l=H(n,t.useIcvfxFrustumGenlock);a.push(l),l.isFrustumOrGenlockViolation&&s++;const m=Math.abs(l.icvfxSyncAmortizedUnitCost-l.quadratureFrustumSyncCost);m>r&&(r=m)}const i=o!==void 0?Math.max(0,Math.min(I-1,o)):t.defaultStationIndex;return{presetId:e,useIcvfxFrustumGenlock:t.useIcvfxFrustumGenlock,stationCount:I,selectedStation:a[i],stations:a,station4Ratio:a[4].finalPixelBudgetRatio,station8Ratio:a[8].finalPixelBudgetRatio,station12Ratio:a[12].finalPixelBudgetRatio,station16Ratio:a[16].finalPixelBudgetRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"ICVFX_FRUSTUM_GENLOCK_LOCKED":"NAIVE_STATIC_LED_PERSPECTIVE_COLLAPSE"}}function Z(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise LED-Volume Virtual Production (ICVFX) Inner-Frustum & Genlock Plinth"}),o.push({id:"genlock-rail-front",kind:"ptp_genlock_shutter_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"PTPv2 Genlock Shutter Sync + ACEScg Camera-to-LED 3D LUT Bus (1.0000×)"}),o.push({id:"genlock-rail-back",kind:"ptp_genlock_shutter_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"6DoF FreeD Tracker -> Off-Axis Inner-Frustum 3DGS + Outer HDRI Dome Bus"});for(const t of e.stations){const a=(t.index-8)*30,s=22*t.rotoPerspectiveAmplification,r=44*t.icvfxSyncAmortizedUnitCost,i=36*t.finalPixelBudgetRatio;o.push({id:`camera-dolly-demand-column-${t.index}`,kind:"camera_dolly_demand_column",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Stage ${t.index} Amplification L(u) = ${t.rotoPerspectiveAmplification.toFixed(4)}× (${t.icvfxStageLabel})`}),o.push({id:`inner-frustum-3dgs-node-${t.index}`,kind:"inner_frustum_3dgs_node",stationIndex:t.index,x:a,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useIcvfxFrustumGenlock?"teal":"slate",label:`Stage ${t.index} Amortized ICVFX Cost c_icvfx = ${t.icvfxSyncAmortizedUnitCost.toFixed(4)}×`}),o.push({id:`final-pixel-budget-gauge-${t.index}`,kind:"final_pixel_budget_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.finalPixelBudgetRatio),h:i,d:12,tone:t.isFrustumOrGenlockViolation?"crimson":"teal",label:`Stage ${t.index} In-Camera Final-Pixel Budget Ratio = ${t.finalPixelBudgetRatio.toFixed(4)}×`})}return o.push({id:"dome-gate-left",kind:"outer_dome_hdri_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"AIGC 360° 16-Bit HDRI Dome & SPZ 3DGS Scene Ingress Gate"}),o.push({id:"dome-gate-right",kind:"outer_dome_hdri_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useIcvfxFrustumGenlock?"teal":"crimson",label:"In-Camera Final-Pixel (0 Green-Screen Roto) Egress Gate"}),o.push({id:"roto-bar-top",kind:"zero_roto_finalpixel_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"ICVFX Law: c_icvfx(u) = c_0 / (1 + u) via Off-Axis Inner Frustum + Genlock"}),o.push({id:"roto-bar-front",kind:"zero_roto_finalpixel_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useIcvfxFrustumGenlock?"teal":"crimson",label:"0 Scanline Banding, 0 Green Spill & True 3D Parallax Lock Line (1.0000×)"}),o}const U=new URLSearchParams(window.location.search),L=U.get("preset"),Q=U.get("theme")==="light"?"light":"dark";let c=L&&L in k?L:"icvfx_inner_frustum_genlock_3dgs_lock",d=k[c].defaultStationIndex,f=Q;document.documentElement.setAttribute("data-theme",f);const j=document.querySelector("#app");j.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · ENTERPRISE LED-VOLUME VIRTUAL PRODUCTION (ICVFX) FRUSTUM SYNC STUDIO</span>
        <h1>Enterprise LED-Volume Virtual Production (ICVFX) Inner-Frustum &amp; Genlock Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${f.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Virtual Production ICVFX Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="icvfx_inner_frustum_genlock_3dgs_lock"
      >
        ICVFX Tracked Inner-Frustum 3DGS/UE5 + Outer 360° AIGC HDRI + PTP Genlock (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_static_2d_led_greenscreen_spill"
      >
        Naive Static 2D Video on LED Wall / Green-Screen Spill (Roto &amp; Parallax Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="ICVFX Virtual Production Readouts">
      <article class="kpi-card">
        <span class="kpi-label">ROTO FACTOR L(u) / ICVFX COST c_icvfx</span>
        <strong id="kpi-icvfx" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">IN-CAMERA FINAL-PIXEL BUDGET RATIO (C_active / C_icvfx)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STAGES 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">L(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PARALLAX COLLAPSE &amp; SCANLINE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE ICVFX OFF-AXIS INNER FRUSTUM, AIGC HDRI DOME &amp; PTP GENLOCK STAGE</span>
          <span id="solid-count-readout">58 solids · 17 ICVFX stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise LED-Volume Virtual Production ICVFX Inner-Frustum and Genlock Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect LED-Volume ICVFX &amp; Frustum Sync Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_icvfx = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE ICVFX INNER-FRUSTUM VS NAIVE STATIC LED / GREEN-SCREEN LEDGER</span>
          <span>c_icvfx = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>u</th>
                <th>L(u) = 1+u</th>
                <th>c_icvfx</th>
                <th>Frustum Quad</th>
                <th>C / C_icvfx</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),G=document.querySelector("#preset-badge"),W=document.querySelector("#kpi-icvfx"),Y=document.querySelector("#kpi-quad"),V=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),O=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),ot=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),A=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),N=document.querySelector("#station-tbody"),y=document.querySelector("#theme-toggle");function g(e,o,t){const a=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[a,s]}function nt(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,o,t,a,s,r,i,n,l,m,w){const u=a*.5,p=s*.5,x=r*.5,$=g(e+u,o-p,t-x),v=g(e+u,o-p,t+x),R=g(e-u,o-p,t+x),D=g(e-u,o+p,t-x),F=g(e+u,o+p,t-x),S=g(e+u,o+p,t+x),C=g(e-u,o+p,t+x),E=nt(i,l),_=n?1.8:.7,P=n?"#ffffff":E.stroke,B=`${D[0].toFixed(1)},${D[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)}`,X=`${R[0].toFixed(1)},${R[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)}`,M=`${v[0].toFixed(1)},${v[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${m}" data-solid-kind="${w}">
      <polygon points="${X}" fill="${E.left}" stroke="${P}" stroke-width="${_}" />
      <polygon points="${M}" fill="${E.right}" stroke="${P}" stroke-width="${_}" />
      <polygon points="${B}" fill="${E.top}" stroke="${P}" stroke-width="${_}" />
    </g>
  `}function h(e){const o=k[e.presetId],t=e.selectedStation,a=f==="dark";K.textContent=o.subtitle,G.textContent=o.badge,G.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,W.textContent=`L(u) = ${t.rotoPerspectiveAmplification.toFixed(4)}× (c_icvfx = ${t.icvfxSyncAmortizedUnitCost.toFixed(4)}×)`,Y.textContent=`Frustum Quad = ${t.quadratureFrustumSyncCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,V.textContent=`${t.finalPixelBudgetRatio.toFixed(4)}×`,V.className=`kpi-value ${t.isFrustumOrGenlockViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.cameraParallaxU.toFixed(4)} | ${t.icvfxStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,O.textContent=`${e.violatedCount} / ${e.stationCount}`,O.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,A.value=String(t.index),at.textContent=`Stage ${t.index} (u = ${t.cameraParallaxU.toFixed(3)}, c_icvfx = ${t.icvfxSyncAmortizedUnitCost.toFixed(3)}, Ratio = ${t.finalPixelBudgetRatio.toFixed(4)}×)`;const s=Z(e);ot.textContent=`${s.length} solids · ${e.stationCount} ICVFX stages`;const r=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);it.innerHTML=r.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),N.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",l=i.isFrustumOrGenlockViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.cameraParallaxU.toFixed(4)}</td>
          <td>${i.rotoPerspectiveAmplification.toFixed(4)}×</td>
          <td>${i.icvfxSyncAmortizedUnitCost.toFixed(4)}×</td>
          <td>${i.quadratureFrustumSyncCost.toFixed(4)}×</td>
          <td class="${l}">${i.finalPixelBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__VIRTUAL_PRODUCTION_ICVFX_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in k&&(c=o,d=k[c].defaultStationIndex,h(b(c,d)))})});A.addEventListener("input",()=>{d=Number(A.value),h(b(c,d))});N.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(d=Number(o.getAttribute("data-station-row")),h(b(c,d)))});y.addEventListener("click",()=>{f=f==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",f),y.textContent=`Theme: ${f.toUpperCase()}`,h(b(c,d))});h(b(c,d));
