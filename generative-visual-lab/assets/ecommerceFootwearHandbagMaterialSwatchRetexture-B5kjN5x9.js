import"./modulepreload-polyfill-B5Qt9EMX.js";const w={"runner-sneaker-suede-mesh-32sku":{id:"runner-sneaker-suede-mesh-32sku",title:"Performance Sneaker 32-Colorway Matrix (Brushed Suede Toe-Box + Breathable Knit + 0.8mm Stitch Lock)",titleZh:"运动潮鞋 32 配色矩阵（翻毛麂皮鞋头 + 飞织网面 + 0.8mm 车缝线与金属鞋眼 100% 锁定）",panelCount:9,swatchVariants:32,targetSwatchName:"Crimson Brushed Suede (Rough 0.88)",roughnessVal:.88},"luxury-handbag-pebbled-calfskin-hardware":{id:"luxury-handbag-pebbled-calfskin-hardware",title:"Luxury Tote Handbag Material Swap (Pebbled Calfskin -> Gloss Crocodile Emboss + 18K Brass Buckle Lock)",titleZh:"高奢托特手袋材质换肤（荔枝纹小牛皮转亮面鳄鱼压纹 + 18K 金锁扣与油边车线保护）",panelCount:6,swatchVariants:18,targetSwatchName:"Emerald Gloss Croc (Rough 0.14)",roughnessVal:.14},"ergonomic-chair-boucle-fabric-aluminum":{id:"ergonomic-chair-boucle-fabric-aluminum",title:"Contract Furniture & Sofa Swatch Configurator (24 Bouclé & Velvet Fabrics + Brushed Aluminum Frame)",titleZh:"家居沙发与人体工学椅面料选配（24款粗花呢/丝绒真实色卡映射 + 拉丝铝合金骨架硬锁）",panelCount:7,swatchVariants:24,targetSwatchName:"Nordic Oat Bouclé Weave (Rough 0.92)",roughnessVal:.92}};function y(a,e,s){const t=Math.max(0,(10-Math.abs(s-12))*.02);return e==="sam2-part-intrinsic-brdf-stitch-shield"?{scenarioId:a,pipelineMode:e,stitchHardwarePreservationPct:100,swatchColorDeltaE:.32,curvatureNormalRealismPct:Number(Math.min(99.6,99.2+t).toFixed(1)),costPerVariantUsd:.006,annualSavingsUsdM:2.78,verdict:"Act automatically"}:e==="flat-2d-multiply-blend-swatch"?{scenarioId:a,pipelineMode:e,stitchHardwarePreservationPct:94.2,swatchColorDeltaE:2.85,curvatureNormalRealismPct:60.6,costPerVariantUsd:.002,annualSavingsUsdM:.52,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,stitchHardwarePreservationPct:57.2,swatchColorDeltaE:5.94,curvatureNormalRealismPct:81.4,costPerVariantUsd:.14,annualSavingsUsdM:.14,verdict:"Send to a human"}}const x=document.querySelector("#app");if(!x)throw new Error("Missing #app root");let i="runner-sneaker-suede-mesh-32sku",r="sam2-part-intrinsic-brdf-stitch-shield",o=12;function P(a){const e=a.getContext("2d");if(!e)return;const s=a.width,t=a.height;e.clearRect(0,0,s,t);const c=w[i],d=y(i,r,o),n=r==="naive-text-inpaint-over-panels",S=e.createLinearGradient(0,0,s,t);S.addColorStop(0,"#070b14"),S.addColorStop(1,"#111827"),e.fillStyle=S,e.fillRect(0,0,s,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,s-32,46),e.strokeStyle=r==="sam2-part-intrinsic-brdf-stitch-shield"?"#10b981":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`251st Workbench · SAM-2 ${c.panelCount}-Panel Atlas + Intrinsic BRDF Swatch Warp + 0.8mm Stitch Shield`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Stitch & Hardware Lock: ${d.stitchHardwarePreservationPct}% | Swatch ΔE: ${d.swatchColorDeltaE} | Curvature Realism: ${d.curvatureNormalRealismPct}%`,28,51);const h=26,l=80;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle="#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(h,l,326,288,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("1. Intrinsic Unmixing & 0.8mm Stitch Shield",h+16,l+26),[{name:"Layer A: SAM-2 9-Panel Semantic Atlas",note:"Toe-Box / Quarter / Tongue / Midsole Isolated",color:"#38bdf8"},{name:"Layer B: Surface Normal & BRDF Roughness",note:`${c.targetSwatchName}`,color:"#a855f7"},{name:"Layer C: 0.8mm High-Pass Stitch & Eyelet Shield",note:n?"⛔ Erased by Inpainting!":"✓ 100.0% Thread & Brass Lock",color:"#10b981"}].forEach((g,b)=>{const v=l+46+b*76;e.fillStyle="#090d16",e.strokeStyle=n&&b===2?"#ef4444":g.color,e.beginPath(),e.roundRect(h+14,v,298,64,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.fillText(g.name,h+24,v+24),e.fillStyle=n&&b===2?"#fca5a5":"#94a3b8",e.font="10px JetBrains Mono, monospace",e.fillText(g.note,h+24,v+46)}),e.restore();const u=374,k=360;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=n?"#ef4444":"#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(u,l,k,288,12),e.fill(),e.stroke(),e.fillStyle=n?"#f87171":"#34d399",e.font="bold 12px Inter, sans-serif",e.fillText(n?"⛔ Text Inpainting: Melted Stitching & Warped Eyelets!":`✅ 32-SKU Swatch Compiler (Grain Scale: ${o}mm · ΔE 0.32)`,u+16,l+26);const p=u+42,m=l+64;e.fillStyle="#31102f",e.strokeStyle=n?"#ef4444":"#f59e0b",e.lineWidth=2.5,e.beginPath(),e.roundRect(p,m,276,126,22),e.fill(),e.stroke(),n||(e.strokeStyle="#fbbf24",e.lineWidth=1.6,e.setLineDash([5,4]),e.strokeRect(p+12,m+12,252,102),e.setLineDash([])),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.textAlign="center",e.fillText(n?"42.8% Seam & Hardware Overpainted!":c.targetSwatchName,p+138,m+54),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(n?"✕ Brand Tongue Logo Garbled":"✓ 100% High-Pass Stitch & Buckle Shield",p+138,m+82),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Compiles ${c.swatchVariants} SKU Variants in ${(c.swatchVariants*1.9).toFixed(0)}s ($${d.costPerVariantUsd.toFixed(3)}/SKU · +$${d.annualSavingsUsdM.toFixed(2)}M/yr)`,u+k/2,l+248),e.restore()}function f(){const a=w[i],e=y(i,r,o);x.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">251st Interactive Architecture Workbench · Domain 2 (Footwear, Handbag & Furniture Swatch Retexturing)</span>
        <h1>鞋靴、箱包与家居多部件真实面料色卡换肤（Material Swatch Retexturing）与车缝线锁定工作台</h1>
        <p class="subtitle">SAM-2 部件级掩码 + 本征光照分解 (Intrinsic Albedo/Normal/BRDF) + 0.8mm 高通车缝线/五金件护盾 (100% 保留) vs 局部重绘把缝线与锁扣全涂没</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.stitchHardwarePreservationPct}% Stitch Lock</span>
        <span class="metric-pill">ΔE ${e.swatchColorDeltaE} Swatch</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 鞋包/家居换肤场景 (Product Category)</label>
        <select id="scenario-select">
          ${Object.values(w).map(t=>`<option value="${t.id}" ${t.id===i?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 面料换肤管线架构 (Retexturing Pipeline)</label>
        <select id="mode-select">
          <option value="sam2-part-intrinsic-brdf-stitch-shield" ${r==="sam2-part-intrinsic-brdf-stitch-shield"?"selected":""}>✅ SAM-2 部件分割 + 本征法线 BRDF 映射 + 0.8mm 车缝线护盾 (推荐)</option>
          <option value="naive-text-inpaint-over-panels" ${r==="naive-text-inpaint-over-panels"?"selected":""}>⛔ 选区直接跑文本 Inpainting (42.8% 车缝线、透气孔与金属扣被抹平)</option>
          <option value="flat-2d-multiply-blend-swatch" ${r==="flat-2d-multiply-blend-swatch"?"selected":""}>⚠️ 传统 2D 正片叠底平铺色卡 (无鞋头曲面微法线畸变与绒面/漆皮光泽差异)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="scale-slider">3. 面料纹理物理粒径 (Swatch Grain Pitch: <strong>${o} mm</strong>)</label>
        <input id="scale-slider" type="range" min="6" max="20" step="2" value="${o}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>本征光照拆分（Albedo/Normal/BRDF）与 0.8mm 车缝线护盾合成台 (Intrinsic Swatch Stage)</h2>
          <span class="tag">${a.panelCount} Panels · ${a.swatchVariants} SKU Variants</span>
        </div>
        <canvas id="swatch-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>面料工艺还原度与多色量产遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">0.8mm 车缝线与金属五金保留率</span>
            <strong class="kpi-value">${e.stitchHardwarePreservationPct}%</strong>
            <span class="kpi-note">高频车线与鞋眼独立分离回叠 vs Inpaint 涂抹</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">实物面料色卡还原色差 (Swatch ΔE)</span>
            <strong class="kpi-value">ΔE ${e.swatchColorDeltaE}</strong>
            <span class="kpi-note">剥离原图漫反射阴影后再注入新色卡 BRDF</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">曲面纹理透视与粗糙度光泽真实感</span>
            <strong class="kpi-value">${e.curvatureNormalRealismPct}%</strong>
            <span class="kpi-note">区分翻毛皮 (Rough 0.88) 与鳄鱼漆皮 (Rough 0.14)</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单配色成本 / 年化打样节省</span>
            <strong class="kpi-value">$${e.costPerVariantUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">拍 1 双白胚鞋自动编译全季 32 款新面料主图</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#swatch-canvas");s&&P(s),document.querySelector("#scenario-select")?.addEventListener("change",t=>{i=t.target.value,f()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{r=t.target.value,f()}),document.querySelector("#scale-slider")?.addEventListener("input",t=>{o=Number(t.target.value),f()})}f();
