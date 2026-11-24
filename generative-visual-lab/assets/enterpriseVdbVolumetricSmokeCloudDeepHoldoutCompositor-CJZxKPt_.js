import"./modulepreload-polyfill-B5Qt9EMX.js";const h={"luxury-perfume-dry-ice-vortex-holdout":{id:"luxury-perfume-dry-ice-vortex-holdout",title:"Luxury Fragrance & Watch Reveal: Swirling Dry-Ice Mist with Deep-Z Bottle Holdout",titleZh:"高奢香水与腕表干冰云雾破雾而出：NanoVDB 深度穿插包裹瓶身（100% 锁金标零雾化侵蚀）",vdbFootprintMb:14,phaseAnisotropyG:.65,shotCount:38},"automotive-wind-tunnel-aerodynamic-smoke":{id:"automotive-wind-tunnel-aerodynamic-smoke",title:"EV Aerodynamic Wind-Tunnel Streamline Smoke Wrapping Around Wheel Arches & Spoiler",titleZh:"新能源轿跑风洞流线烟雾：沿车身 SDF 无穿透绕流与轮毂前后景真实深度遮挡",vdbFootprintMb:18,phaseAnisotropyG:.72,shotCount:32},"cinema-cloud-sea-crepuscular-godrays":{id:"cinema-cloud-sea-crepuscular-godrays",title:"Aerial Cloud-Sea Flythrough with Dual-Lobe Henyey-Greenstein Silver-Lining God-Rays",titleZh:"影视云海穿云镜头：双瓣 Henyey-Greenstein 银边前向散射与丁达尔体积光束（60fps）",vdbFootprintMb:22,phaseAnisotropyG:.78,shotCount:44}};function m(r,e,o){const t=Number(((o-.5)*1.2).toFixed(1));return e==="nanovdb-deep-z-holdout-henyey-greenstein-raymarch"?{scenarioId:r,pipelineMode:e,skuLogoHoldoutLockPct:100,volumetricWrapRealismPct:Math.min(99.9,Number((99.2+t).toFixed(1))),raymarchFrameRateFps:60,costPerShotUsd:.021,annualSavingsUsdM:2.78,verdict:"Act automatically"}:e==="offline-cpu-deep-exr-render-farm"?{scenarioId:r,pipelineMode:e,skuLogoHoldoutLockPct:100,volumetricWrapRealismPct:98.8,raymarchFrameRateFps:.5,costPerShotUsd:1650,annualSavingsUsdM:.15,verdict:"Confirm"}:{scenarioId:r,pipelineMode:e,skuLogoHoldoutLockPct:57.6,volumetricWrapRealismPct:50.4,raymarchFrameRateFps:24,costPerShotUsd:.45,annualSavingsUsdM:.04,verdict:"Send to a human"}}const y=document.querySelector("#app");if(!y)throw new Error("Missing #app root");let c="luxury-perfume-dry-ice-vortex-holdout",l="nanovdb-deep-z-holdout-henyey-greenstein-raymarch",i=.65;function f(r){const e=r.getContext("2d");if(!e)return;const o=r.width,t=r.height;e.clearRect(0,0,o,t);const d=h[c],s=m(c,l,i),n=l==="naive-2d-alpha-smoke-flat-sandwich-card",u=e.createLinearGradient(0,0,o,t);u.addColorStop(0,"#070b14"),u.addColorStop(1,"#1e1b4b"),e.fillStyle=u,e.fillRect(0,0,o,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,o-32,46),e.strokeStyle=l==="nanovdb-deep-z-holdout-henyey-greenstein-raymarch"?"#10b981":"#ef4444",e.strokeRect(16,14,o-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`273rd Workbench (53rd in Domain 4) · NanoVDB ${d.vdbFootprintMb}MB · Henyey-Greenstein g = ${i.toFixed(2)}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`SKU Holdout Lock: ${s.skuLogoHoldoutLockPct}% | 3D Volumetric Wrap: ${s.volumetricWrapRealismPct}% | Ray-March FPS: ${s.raymarchFrameRateFps.toFixed(0)} fps`,28,51);const v=[{title:`1. GPU Sparse NanoVDB Tree (${d.vdbFootprintMb}MB vs 1.2GB)`,detail:n?"⛔ Flat 2D Video Card (Zero 3D Camera Parallax)":`✓ Sparse Block-Allocated VDB (${s.raymarchFrameRateFps.toFixed(0)} fps Ray-March)`,color:n?"#ef4444":"#10b981",x:36,y:84},{title:"2. Deep-Z Holdout & SDF Collision Wrapping",detail:n?"⛔ Smoke Cuts Product in Half or Melts Gold Logo (42.4%)":"✓ 0→Z_obj Front Integration + SDF No-Penetration (100% Lock)",color:n?"#ef4444":"#38bdf8",x:396,y:84},{title:`3. Dual-Lobe Henyey-Greenstein (g = ${i.toFixed(2)})`,detail:n?"⛔ Flat Grey Smoke Without Silver-Lining Rim Glow":`✓ Forward Silver-Lining + 2-Bounce Multi-Scatter (${s.volumetricWrapRealismPct}%)`,color:n?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Volumetric Shadow & God-Ray FinOps",detail:n?"⛔ No Volumetric Light Shafts Cast by Hero Product":`✓ $${s.costPerShotUsd}/Shot vs $1,650 Deep-EXR Farm (+$${s.annualSavingsUsdM}M/yr)`,color:n?"#ef4444":"#f59e0b",x:396,y:178}];for(const a of v)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=a.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(a.x,a.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(a.title,a.x+14,a.y+28),e.fillStyle=a.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(a.detail,a.x+14,a.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Volumetric VDB & Deep-Holdout Pipeline: ${d.title} (${d.shotCount} Shots)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(n?"⛔ 2D Smoke Overlay / Unmasked Diffusion: Flat Layering Cannot Wrap Around 3D Bottle or Wheels!":`✓ Sparse NanoVDB + Ray-Marched Deep-Z Holdout + Henyey-Greenstein Silver-Lining (60.0 fps · $${s.costPerShotUsd}/Shot)`,54,336),e.restore()}function p(){const r=h[c],e=m(c,l,i);y.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">273rd Workbench (53rd in Domain 4) · Sparse NanoVDB, Deep-Z Holdout &amp; God-Ray Compositor</span>
        <h1>影视特效、游戏预告片与高奢广告体积云雾（NanoVDB 稀疏体素）、Deep-Z 穿插包裹与丁达尔光束工作台</h1>
        <p class="subtitle">14MB 稀疏 NanoVDB 体素树 + 射线步进 Deep-Z 深度截断（云雾真实缠绕瓶身/轮毂且 100% 锁死商标）+ Henyey-Greenstein 银边透光 vs 2D 假烟雾贴片</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.skuLogoHoldoutLockPct}% Holdout Lock</span>
        <span class="metric-pill">${e.raymarchFrameRateFps.toFixed(0)} FPS NanoVDB</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 体积云雾与风洞流场广告场景 (Volumetric VDB Scenario)</label>
        <select id="scenario-select">
          ${Object.values(h).map(t=>`<option value="${t.id}" ${t.id===c?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 体积烟雾穿插与散射合成管线 (Volumetric Compositing Mode)</label>
        <select id="mode-select">
          <option value="nanovdb-deep-z-holdout-henyey-greenstein-raymarch" ${l==="nanovdb-deep-z-holdout-henyey-greenstein-raymarch"?"selected":""}>✅ 稀疏 NanoVDB + 射线步进 Deep-Z 穿插包裹 + HG 银边前向散射 (推荐)</option>
          <option value="naive-2d-alpha-smoke-flat-sandwich-card" ${l==="naive-2d-alpha-smoke-flat-sandwich-card"?"selected":""}>⛔ 2D 透明烟雾视频贴片 / 文生视频混生 (49.6% 无法环绕瓶身或融化金标文字)</option>
          <option value="offline-cpu-deep-exr-render-farm" ${l==="offline-cpu-deep-exr-render-farm"?"selected":""}>⚠️ 传统离线 CPU 渲染农场输出 40GB Deep-EXR 序列 ($1,650/镜，0.5fps 无法实时预演)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="phase-slider">3. Henyey-Greenstein 前向散射银边系数 (Phase Anisotropy g: <strong>${i.toFixed(2)}</strong>)</label>
        <input id="phase-slider" type="range" min="0.50" max="0.85" step="0.05" value="${i}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>稀疏 NanoVDB 射线步进、Deep-Z 商品穿插包裹与丁达尔光束舞台 (Volumetric VDB Stage)</h2>
          <span class="tag">${r.vdbFootprintMb}MB NanoVDB · ${e.raymarchFrameRateFps.toFixed(0)} FPS</span>
        </div>
        <canvas id="vdb-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>高奢广告与虚拟制片体积特效遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">云雾包裹中商品金标与边缘锁真率</span>
            <strong class="kpi-value">${e.skuLogoHoldoutLockPct}%</strong>
            <span class="kpi-note">射线在 t = Z_sku 处精确截断，零像素污染</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">三维云雾前后穿插与丁达尔银边真实度</span>
            <strong class="kpi-value">${e.volumetricWrapRealismPct}%</strong>
            <span class="kpi-note">SDF 无穿透绕流 + HG 双瓣多重散射</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">GPU 稀疏体素光线步进实时帧率</span>
            <strong class="kpi-value">${e.raymarchFrameRateFps.toFixed(1)} FPS</strong>
            <span class="kpi-note">NanoVDB 压缩 98.8% 空白体素显存占用</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单镜头制作成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerShotUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比离线 Deep-EXR 农场 $1,650/镜降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const o=document.querySelector("#vdb-canvas");o&&f(o),document.querySelector("#scenario-select")?.addEventListener("change",t=>{c=t.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{l=t.target.value,p()}),document.querySelector("#phase-slider")?.addEventListener("input",t=>{i=Number(t.target.value),p()})}p();
