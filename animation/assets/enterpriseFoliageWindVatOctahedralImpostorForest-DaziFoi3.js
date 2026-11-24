import"./modulepreload-polyfill-B5Qt9EMX.js";const f={"icvfx-bamboo-rainforest-typhoon-wind":{id:"icvfx-bamboo-rainforest-typhoon-wind",title:"ICVFX LED Stage Tropical Bamboo & Fern Rainforest under Gusting Wind Field",titleZh:"虚拟制片 LED 棚热带竹林与蕨类雨林（树干/主枝/小枝/叶片四级相位风场 VAT + 双面透光）",instanceCountK:180,windHierarchyTiers:"4-Tier (Trunk / Branch / Twig / Leaf Flutter)",impostorGrid:"8×8 Hemi-Octahedral Depth+Normal Atlas (>80m)"},"open-world-alpine-pine-250k-forest":{id:"open-world-alpine-pine-250k-forest",title:"250,000-Instance Alpine Conifer Valley with 8x8 Octahedral Parallax Impostors",titleZh:"25 万棵高山针叶林大世界数字孪生（80米内四级 VAT 网格 + 80米外 8×8 八面体视差替身）",instanceCountK:250,windHierarchyTiers:"4-Tier Pivot-Painter FP16 Texture (0 Bones)",impostorGrid:"8×8 Octahedral Ray-Marched Depth Atlas"},"architectural-campus-cherry-blossom-sss":{id:"architectural-campus-cherry-blossom-sss",title:"Architectural Campus Cherry-Blossom Canopy with Two-Sided Subsurface Back-Lighting",titleZh:"企业园区与文旅景观樱花步道（叶片双面次表面逆光透射 SSS + 零西蓝花粘连面片）",instanceCountK:120,windHierarchyTiers:"4-Tier Harmonic Sway + Petal Vortex Particle VAT",impostorGrid:"8×8 Octahedral Albedo/Normal/Translucency Atlas"}};function v(a,e,s){const t=Number(((120-s)*.03).toFixed(2));return e==="pivot-painter-4tier-vat-octahedral-impostor-sss"?{scenarioId:a,pipelineMode:e,botanicalSilhouetteWindRealismPct:Number((99.4+Math.min(.4,t*.2)).toFixed(1)),forestFrameRateFps:60,overdrawReductionPct:94.8,costPerSpeciesUsd:.022,annualSavingsUsdM:2.86,verdict:"Act automatically"}:e==="heavy-skeletal-rigged-speedtree-no-impostor"?{scenarioId:a,pipelineMode:e,botanicalSilhouetteWindRealismPct:96.5,forestFrameRateFps:14.2,overdrawReductionPct:28,costPerSpeciesUsd:420,annualSavingsUsdM:.18,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,botanicalSilhouetteWindRealismPct:53.2,forestFrameRateFps:8.4,overdrawReductionPct:12.5,costPerSpeciesUsd:.65,annualSavingsUsdM:.04,verdict:"Send to a human"}}const m=document.querySelector("#app");if(!m)throw new Error("Missing #app root");let d="open-world-alpine-pine-250k-forest",l="pivot-painter-4tier-vat-octahedral-impostor-sss",c=80;function S(a){const e=a.getContext("2d");if(!e)return;const s=a.width,t=a.height;e.clearRect(0,0,s,t);const n=f[d],o=v(d,l,c),r=l==="naive-image-to-3d-sdf-broccoli-blob-mesh",u=e.createLinearGradient(0,0,s,t);u.addColorStop(0,"#06100e"),u.addColorStop(1,"#0f172a"),e.fillStyle=u,e.fillRect(0,0,s,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,s-32,46),e.strokeStyle=l==="pivot-painter-4tier-vat-octahedral-impostor-sss"?"#10b981":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#34d399",e.font="bold 13px Inter, sans-serif",e.fillText(`263rd Workbench (51st in Domain 4) · ${n.instanceCountK}K Trees · ${n.windHierarchyTiers} · Cutover ${c}m`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Botanical & Wind Realism: ${o.botanicalSilhouetteWindRealismPct}% | Forest Frame Rate: ${o.forestFrameRateFps.toFixed(1)} fps | Overdraw Cut: -${o.overdrawReductionPct}%`,28,51);const h=[{title:"1. Canopy Topology & Two-Sided Leaf SSS",detail:r?'⛔ Fused SDF "Green Broccoli Blob" (46.8% Defect)':"✓ Alpha-Clipped Leaf Cards + Two-Sided SSS Translucency",color:r?"#ef4444":"#10b981",x:36,y:84},{title:"2. 4-Tier Pivot-Painter Wind VAT (0 Bones)",detail:r?"⛔ Rigid Statue or Jelly Warp under Wind!":`✓ FP16 Pivot+Axis UV2/UV3 (${n.windHierarchyTiers})`,color:r?"#ef4444":"#38bdf8",x:396,y:84},{title:`3. 8×8 Octahedral Parallax Impostors (>${c}m)`,detail:r?`⛔ ${o.forestFrameRateFps.toFixed(1)} fps Quad-Overdraw Collapse at ${n.instanceCountK}K Trees`:`✓ 2-Tri Ray-Marched Depth Billboards (-${o.overdrawReductionPct}% Overdraw)`,color:r?"#ef4444":"#a855f7",x:36,y:178},{title:"4. GPU Instanced Forest Telemetry & FinOps",detail:r?"⛔ Unusable in UE5 ICVFX or WebGPU Digital Twins":`✓ ${o.forestFrameRateFps.toFixed(0)} fps Locked ($${o.costPerSpeciesUsd}/Species · +$${o.annualSavingsUsdM}M/yr)`,color:r?"#ef4444":"#f59e0b",x:396,y:178}];for(const i of h)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=i.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(i.x,i.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(i.title,i.x+14,i.y+28),e.fillStyle=i.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(i.detail,i.x+14,i.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Botanical & Forest LOD Pipeline: ${n.title} (${n.instanceCountK},000 Instances)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(r?"⛔ Direct Image-to-3D Marching-Cubes: Melted Broccoli Canopy, Zero Leaf Flutter & 8.4 fps Stall!":`✓ L-System + Two-Sided Leaf SSS + 4-Tier Pivot VAT + ${n.impostorGrid} (60.0 fps · $${o.costPerSpeciesUsd}/Tree)`,54,336),e.restore()}function p(){const a=f[d],e=v(d,l,c);m.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">263rd Workbench (51st in Domain 4) · 4-Tier Wind VAT, Leaf SSS &amp; Octahedral Impostor Forest</span>
        <h1>游戏、虚拟制片与数字孪生百万级植被森林、四级风场顶点动画纹理（VAT）与八面体视差替身工作台</h1>
        <p class="subtitle">树干/主枝/小枝/叶片四级枢轴风场 VAT（零骨骼开销）+ 叶片双面次表面透光（SSS）+ 8×8 半八面体深度视差替身（25万棵树满帧 60fps）vs 图生 3D 西蓝花粘连白模</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.forestFrameRateFps.toFixed(0)} FPS @ ${a.instanceCountK}K Trees</span>
        <span class="metric-pill">-${e.overdrawReductionPct}% Overdraw</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 森林植被与虚拟制片场景 (Botanical &amp; Forest Scenario)</label>
        <select id="scenario-select">
          ${Object.values(f).map(t=>`<option value="${t.id}" ${t.id===d?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 植被生成、风场动画与远景 LOD 管线 (Foliage &amp; Wind Architecture)</label>
        <select id="mode-select">
          <option value="pivot-painter-4tier-vat-octahedral-impostor-sss" ${l==="pivot-painter-4tier-vat-octahedral-impostor-sss"?"selected":""}>✅ 四级枢轴风场 VAT (0骨骼) + 双面叶片 SSS + 8×8 八面体视差替身 (推荐)</option>
          <option value="naive-image-to-3d-sdf-broccoli-blob-mesh" ${l==="naive-image-to-3d-sdf-broccoli-blob-mesh"?"selected":""}>⛔ 直接把树木照片丢进 Image-to-3D SDF 网格生成 (树冠粘连成绿西蓝花，无法随风摇曳，8.4fps)</option>
          <option value="heavy-skeletal-rigged-speedtree-no-impostor" ${l==="heavy-skeletal-rigged-speedtree-no-impostor"?"selected":""}>⚠️ 全骨骼蒙皮树 + 无八面体替身 (远景 Alpha 过度绘制爆炸，25万棵树跌至 14.2fps)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="cutover-slider">3. 八面体视差替身切换距离 (Octahedral Impostor Cutover: <strong>${c}m</strong>)</label>
        <input id="cutover-slider" type="range" min="50" max="120" step="10" value="${c}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>四级枢轴风场 VAT、叶片双面透光与 8×8 八面体视差替身舞台 (Forest Stage)</h2>
          <span class="tag">${a.instanceCountK},000 Trees · ${e.forestFrameRateFps.toFixed(0)} FPS</span>
        </div>
        <canvas id="foliage-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>虚拟制片 LED 棚与大世界森林遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">树冠镂空与四级风场摇曳真实度</span>
            <strong class="kpi-value">${e.botanicalSilhouetteWindRealismPct}%</strong>
            <span class="kpi-note">告别 SDF 西蓝花粘连块与果冻扭曲</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${a.instanceCountK}K 棵动态树木实时帧率</span>
            <strong class="kpi-value">${e.forestFrameRateFps.toFixed(1)} FPS</strong>
            <span class="kpi-note">零骨骼顶点着色器 + 远景 2 三角面替身</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">远景叶片 Alpha 过度绘制削减率</span>
            <strong class="kpi-value">-${e.overdrawReductionPct}%</strong>
            <span class="kpi-note">8×8 半八面体法线/深度光线步进插值</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单树种资产成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerSpeciesUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比手工绑定植被资产 $420/棵降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#foliage-canvas");s&&S(s),document.querySelector("#scenario-select")?.addEventListener("change",t=>{d=t.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{l=t.target.value,p()}),document.querySelector("#cutover-slider")?.addEventListener("input",t=>{c=Number(t.target.value),p()})}p();
