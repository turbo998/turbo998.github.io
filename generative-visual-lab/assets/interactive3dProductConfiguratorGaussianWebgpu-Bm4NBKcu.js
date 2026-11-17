import"./modulepreload-polyfill-B5Qt9EMX.js";const S={hybrid_3dgs_draco_pbr_configurator_lock:{id:"hybrid_3dgs_draco_pbr_configurator_lock",label:"Hybrid Quantized 3DGS Showroom + Draco/KTX2 GLTF PBR CAD Hero (b_vram = b_0/(1+u), Lock = 1.0000×)",labelZh:"混合 3D Gaussian Splatting 实景展厅 + Draco/KTX2 压缩 PBR CAD 商品主体（显存带宽 b_0/(1+u)，恒锁 1.0000×）",subtitle:"Pairs a quantized 3D Gaussian Splatting (SPZ) photorealistic environment backdrop with a Draco/KTX2-compressed GLTF PBR CAD product mesh via shared WebGPU/WebGL Z-depth compositing, locking VRAM & 60fps ratio at 1.0000× across all 17 configurator tiers.",subtitleZh:"将“SPZ 量化压缩 3D Gaussian Splatting 实景捕捉展厅背景”与“Draco 几何压缩 + KTX2 BasisU 纹理压缩的可交互 GLTF PBR 工业 CAD 主体”通过共享 Z-Buffer 深度测试融合，在全 17 个选配与 LOD 档位恒定锁死显存带宽与帧率比 1.0000×。",useHybrid3dgsPbrPipeline:!0,defaultStationIndex:16,badge:"HYBRID 3DGS + PBR LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"3DGS+PBR 混合展厅锁死 · 1.0000×（0/17 站显存超支）",description:"Enterprise automotive, luxury, and industrial digital-twin configurators use 3DGS for instant photorealistic environment capture and Draco/KTX2 GLTF PBR meshes for articulated doors, paint swaps, and CAD dimensions.",descriptionZh:"汽车在线选配器、奢品展厅与工业数字孪生采用“实景环境归 3DGS 神经辐射场、可开关车门与换材质的商品主体归 Draco/KTX2 PBR 网格”的混合架构，兼得照片级环境光与 100% 工业 CAD 交互精度。"},naive_uncompressed_full_mesh_vram_overrun:{id:"naive_uncompressed_full_mesh_vram_overrun",label:"Naive Uncompressed Full-Scene GLTF/PLY Reloading (VRAM & Bandwidth Overrun = 1 + u up to 2.0000×)",labelZh:"朴素未压缩全场景网格/原始 PLY 点云重复加载（显存爆炸与首屏加载耗时超支达 2.0000×）",subtitle:"Loads uncompressed 200MB PLY splats or unoptimized PNG-textured full-scene meshes for every material trim swap, inflating GPU VRAM and loading latency by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"直接向浏览器传输未压缩的数百兆原始 PLY 高斯点云或未经过 Draco/KTX2 压缩的全场景 PNG 贴图网格，且每次切换车漆/内饰都重复加载整包资产，导致第 16 档显存与带宽超支翻倍至 2.0000× 并引发移动端浏览器闪退。",useHybrid3dgsPbrPipeline:!1,defaultStationIndex:16,badge:"VRAM & FCP OVERRUN · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"显存爆炸与加载超支 · 最高 2.0000×（16/17 站违背）",description:"Serving raw uncompressed 3D assets or attempting to rig articulated CAD parts inside pure unstructured Gaussian Splats fails enterprise Web/Mobile SLA requirements across 16/17 configurator tiers.",descriptionZh:"在 Web 端裸传未压缩 3D 资产，或试图用纯无结构高斯点云去做精密机械开关门与 PBR 换色，会导致严重的显存溢出与几何边缘发毛。"}},x=17,y=["Tier 0: SPZ Quantized 3DGS Showroom Environment (12MB)","Tier 1: Draco Mesh Compression (10:1 CAD Triangle Reduction)","Tier 2: KTX2 BasisU UASTC GPU Texture Streaming","Tier 3: Shared Z-Depth Occlusion (PBR Mesh Inside 3DGS)","Tier 4: Clearcoat Metallic Car Paint Shader Variant Swap","Tier 5: Articulated Door / Hood Hinge Kinematic Rigging","Tier 6: Anisotropic Alloy Wheel Rim InstancedMesh Swap","Tier 7: Nappa Leather Stitching Normal-Map Variant Slot","Tier 8: Spherical Harmonics (SH) 3DGS-to-PBR IBL Probe","Tier 9: Screen-Space Contact Shadow on 3DGS Ground Plane","Tier 10: Frustum & Octree Splat LOD Culling (60fps Lock)","Tier 11: Interactive CAD Dimension & Hotspot Raycasting","Tier 12: Headlight Emissive Bloom & Volumetric Flare Layer","Tier 13: Multi-Camera Showroom Orbit & Interior Cockpit Cut","Tier 14: WebXR / AR QuickLook USDZ/GLB Export Bridge","Tier 15: Progressive Mipmap & Splat Chunk CDN Streaming","Tier 16: Full 100-Trim Enterprise 3D Configurator (0.50 b_0)"];function q(e){const t=1+Math.max(0,e),a=1/t;return{uncompressedVramAmplification:t,hybridNormalizedVramCost:a}}function Z(e,i=64){const a=1/(1+Math.max(0,e)),n=Math.max(2,i%2===0?i:i+1),s=1/n;let o=2*a;for(let r=1;r<n;r++){const d=r*s,m=r%2===1?4:2;o+=m*(2*a*d)}return s/3*o}function z(e,i){const t=Math.max(0,Math.min(x-1,e)),a=t/(x-1),n=q(a),s=Z(a,64),o=1+a,r=i?1:o;return{index:t,configuratorScaleU:a,uncompressedVramAmplification:n.uncompressedVramAmplification,hybridNormalizedVramCost:n.hybridNormalizedVramCost,quadratureSplatBvhCost:s,vramBandwidthOverrunRatio:r,naiveUncompressedOverrunRatio:o,configuratorStageLabel:y[t]??y[0],isVramBudgetViolation:r>1.0001}}function v(e,i){const t=S[e],a=[];let n=0,s=0;for(let r=0;r<x;r++){const d=z(r,t.useHybrid3dgsPbrPipeline);a.push(d),d.isVramBudgetViolation&&n++;const m=Math.abs(d.hybridNormalizedVramCost-d.quadratureSplatBvhCost);m>s&&(s=m)}const o=i!==void 0?Math.max(0,Math.min(x-1,i)):t.defaultStationIndex;return{presetId:e,useHybrid3dgsPbrPipeline:t.useHybrid3dgsPbrPipeline,stationCount:x,selectedStation:a[o],stations:a,station4Ratio:a[4].vramBandwidthOverrunRatio,station8Ratio:a[8].vramBandwidthOverrunRatio,station12Ratio:a[12].vramBandwidthOverrunRatio,station16Ratio:a[16].vramBandwidthOverrunRatio,violatedCount:n,maxQuadratureError:s,verdict:n===0?"HYBRID_3DGS_DRACO_PBR_LOCKED":"NAIVE_UNCOMPRESSED_VRAM_OVERRUN"}}function K(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Hybrid 3D Gaussian Splatting + Draco GLTF PBR Configurator Plinth"}),i.push({id:"compositor-rail-front",kind:"webgpu_depth_compositor_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Draco + KTX2 BasisU PBR CAD Hero Mesh & Shared Z-Depth Bus (1.0000×)"}),i.push({id:"compositor-rail-back",kind:"webgpu_depth_compositor_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"SPZ Quantized 3D Gaussian Splatting Showroom Environment & SH IBL Bus"});for(const t of e.stations){const a=(t.index-8)*30,n=22*t.uncompressedVramAmplification,s=44*t.hybridNormalizedVramCost,o=36*t.vramBandwidthOverrunRatio;i.push({id:`vram-demand-column-${t.index}`,kind:"vram_demand_column",stationIndex:t.index,x:a,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Tier ${t.index} Amplification V(u) = ${t.uncompressedVramAmplification.toFixed(4)}× (${t.configuratorStageLabel})`}),i.push({id:`hybrid-3dgs-pbr-node-${t.index}`,kind:"hybrid_3dgs_pbr_node",stationIndex:t.index,x:a,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useHybrid3dgsPbrPipeline?"teal":"slate",label:`Tier ${t.index} Hybrid VRAM Cost b_hybrid = ${t.hybridNormalizedVramCost.toFixed(4)}×`}),i.push({id:`bandwidth-budget-gauge-${t.index}`,kind:"bandwidth_budget_gauge",stationIndex:t.index,x:a,y:o*.5-8,z:56,w:Math.min(24,12*t.vramBandwidthOverrunRatio),h:o,d:12,tone:t.isVramBudgetViolation?"crimson":"teal",label:`Tier ${t.index} VRAM & Bandwidth Ratio = ${t.vramBandwidthOverrunRatio.toFixed(4)}×`})}return i.push({id:"codec-gate-left",kind:"draco_ktx2_codec_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"SPZ Splat Quantizer + Draco Mesh + KTX2 UASTC GPU Texture Ingest Gate"}),i.push({id:"codec-gate-right",kind:"draco_ktx2_codec_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useHybrid3dgsPbrPipeline?"teal":"crimson",label:"Shared Z-Buffer 3DGS+PBR Compositor & 60fps Mobile WebGPU Delivery Gate"}),i.push({id:"occlusion-bar-top",kind:"depth_buffer_occlusion_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Hybrid 3D Law: b_vram(u) = b_0 / (1 + u) via SPZ 3DGS Backdrop + Draco/KTX2 PBR"}),i.push({id:"occlusion-bar-front",kind:"depth_buffer_occlusion_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useHybrid3dgsPbrPipeline?"teal":"crimson",label:"Zero Mobile WebGL OOM Crash & Exact CAD Kinematics Lock Line (1.0000×)"}),i}const G=new URLSearchParams(window.location.search),B=G.get("preset"),X=G.get("theme")==="light"?"light":"dark";let l=B&&B in S?B:"hybrid_3dgs_draco_pbr_configurator_lock",c=S[l].defaultStationIndex,g=X;document.documentElement.setAttribute("data-theme",g);const Y=document.querySelector("#app");Y.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 231 · 241ST DEMO · ENTERPRISE 3D PRODUCT CONFIGURATOR: HYBRID 3DGS + DRACO GLTF PBR ARCHITECTURE</span>
        <h1>Enterprise 3D Product Configurator: Hybrid 3DGS + Draco PBR Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="3D Configurator Stack Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="hybrid_3dgs_draco_pbr_configurator_lock"
      >
        Hybrid SPZ 3DGS Showroom + Draco/KTX2 GLTF PBR CAD Hero (VRAM Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_uncompressed_full_mesh_vram_overrun"
      >
        Naive Uncompressed Full-Scene Mesh/PLY Reloading (VRAM Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="3D Configurator Telemetry Readouts">
      <article class="kpi-card">
        <span class="kpi-label">AMPLIFICATION V(u) / HYBRID VRAM COST b_hybrid</span>
        <strong id="kpi-config" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">VRAM BANDWIDTH & 60FPS RATIO (B_active / B_hybrid)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CONFIGURATOR TIERS 4 / 8 / 16 VRAM RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">V(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MOBILE WEBGL OOM & BANDWIDTH VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-TIER HYBRID 3DGS ENVIRONMENT + DRACO PBR CAD CONFIGURATOR</span>
          <span id="solid-count-readout">58 solids · 17 configurator tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise 3D Product Configurator Hybrid 3DGS and Draco PBR Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect 3D Configurator Subsystem & Trim Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Tier 16 (u = 1.000, b_hybrid = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER HYBRID 3DGS+PBR VS UNCOMPRESSED MESH/PLY LEDGER</span>
          <span>b_hybrid = b_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>V(u) = 1+u</th>
                <th>b_hybrid</th>
                <th>BVH Quad</th>
                <th>B / B_hybrid</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),F=document.querySelector("#preset-badge"),W=document.querySelector("#kpi-config"),j=document.querySelector("#kpi-quad"),O=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),V=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),$=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),w=document.querySelector("#station-tbody"),L=document.querySelector("#theme-toggle");function h(e,i,t){const a=(e-t*.55)*.88,n=-i+(e*.18+t*.42)*.55;return[a,n]}function rt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,a,n,s,o,r,d,m,M){const u=a*.5,p=n*.5,b=s*.5,A=h(e+u,i-p,t-b),C=h(e+u,i-p,t+b),I=h(e-u,i-p,t+b),E=h(e-u,i+p,t-b),_=h(e+u,i+p,t-b),f=h(e+u,i+p,t+b),k=h(e-u,i+p,t+b),T=rt(o,d),D=r?1.8:.7,P=r?"#ffffff":T.stroke,N=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)}`,H=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)}`,U=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${m}" data-solid-kind="${M}">
      <polygon points="${H}" fill="${T.left}" stroke="${P}" stroke-width="${D}" />
      <polygon points="${U}" fill="${T.right}" stroke="${P}" stroke-width="${D}" />
      <polygon points="${N}" fill="${T.top}" stroke="${P}" stroke-width="${D}" />
    </g>
  `}function R(e){const i=S[e.presetId],t=e.selectedStation,a=g==="dark";Q.textContent=i.subtitle,F.textContent=i.badge,F.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,W.textContent=`V(u) = ${t.uncompressedVramAmplification.toFixed(4)}× (b_hybrid = ${t.hybridNormalizedVramCost.toFixed(4)}×)`,j.textContent=`BVH Quad = ${t.quadratureSplatBvhCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,O.textContent=`${t.vramBandwidthOverrunRatio.toFixed(4)}×`,O.className=`kpi-value ${t.isVramBudgetViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.configuratorScaleU.toFixed(4)} | ${t.configuratorStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,V.textContent=`${e.violatedCount} / ${e.stationCount}`,V.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,$.value=String(t.index),at.textContent=`Tier ${t.index} (u = ${t.configuratorScaleU.toFixed(3)}, b_hybrid = ${t.hybridNormalizedVramCost.toFixed(3)}, Ratio = ${t.vramBandwidthOverrunRatio.toFixed(4)}×)`;const n=K(e);it.textContent=`${n.length} solids · ${e.stationCount} configurator tiers`;const s=[...n].sort((o,r)=>o.z-r.z||o.y-r.y||o.x-r.x);ot.innerHTML=s.map(o=>nt(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,a,o.id,o.kind)).join(""),w.innerHTML=e.stations.map(o=>{const r=o.index===t.index?"row-selected":"",d=o.isVramBudgetViolation?"cell-fail":"cell-pass";return`
        <tr class="${r}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.configuratorScaleU.toFixed(4)}</td>
          <td>${o.uncompressedVramAmplification.toFixed(4)}×</td>
          <td>${o.hybridNormalizedVramCost.toFixed(4)}×</td>
          <td>${o.quadratureSplatBvhCost.toFixed(4)}×</td>
          <td class="${d}">${o.vramBandwidthOverrunRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const r=o.getAttribute("data-preset");o.classList.toggle("active",r===e.presetId)}),window.__INTERACTIVE_3D_CONFIGURATOR_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in S&&(l=i,c=S[l].defaultStationIndex,R(v(l,c)))})});$.addEventListener("input",()=>{c=Number($.value),R(v(l,c))});w.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),R(v(l,c)))});L.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),L.textContent=`Theme: ${g.toUpperCase()}`,R(v(l,c))});R(v(l,c));
