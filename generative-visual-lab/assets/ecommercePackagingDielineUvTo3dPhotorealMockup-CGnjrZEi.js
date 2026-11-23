import"./modulepreload-polyfill-B5Qt9EMX.js";const v={"specialty-coffee-gusset-pouch":{id:"specialty-coffee-gusset-pouch",title:"Stand-Up Gusseted Coffee Pouch (Kraft Matte Albedo + Spot-UV Crest + Pouch Crease Displacement)",titleZh:"自立拉链精品咖啡袋（哑光牛皮纸底 + 局部 UV 亮油 + 袋体折痕微法线映射）",meshTopology:"Gusseted Doypack Mesh (12 Crease Seams)",spotFinishLabel:"Matte Kraft (Rough 0.85) + Spot-UV (Rough 0.08)",creaseCount:12},"craft-soda-cylindrical-can":{id:"craft-soda-cylindrical-can",title:"330ml Cylindrical Aluminum Beverage Can (360° Cylindrical UV + Anisotropic Brushed Rim + Condensation)",titleZh:"330ml 圆柱铝制饮品罐（360° 柱面余弦透视 UV + 拉丝金属各向异性高光 + 冰水珠合成）",meshTopology:"360° Cylindrical Can Mesh (R=33mm)",spotFinishLabel:"Brushed Aluminum (Metallic 0.96) + Water Droplets",creaseCount:4},"luxury-cosmetic-goldfoil-carton":{id:"luxury-cosmetic-goldfoil-carton",title:"Luxury Skincare Folding Carton (0.25mm Embossed 24K Hot-Stamped Gold Foil + GS1 Barcode Lock)",titleZh:"高奢护肤品折叠礼盒刀模（0.25mm 击凸 24K 烫金专色通道 + GS1 条形码 100% 扫码锁）",meshTopology:"6-Face Tuck-End Folding Carton (18 Fold Lines)",spotFinishLabel:"24K Hot Foil (Metallic 1.0) + 0.25mm Emboss Normal",creaseCount:18}};function k(i,e,l){const t=Math.max(0,(35-Math.abs(l-42))*.01);return e==="cad-uv-fold-pbr-spotfoil-fluxfill"?{scenarioId:i,pipelineMode:e,barcodeNutritionLegibilityPct:100,spotFoilSpecularRealismPct:Number(Math.min(99.6,99.1+t).toFixed(1)),renderLatencySec:2.8,costPerMockupUsd:.009,annualSavingsUsdM:2.94,verdict:"Act automatically"}:e==="unlit-2d-perspective-warp-only"?{scenarioId:i,pipelineMode:e,barcodeNutritionLegibilityPct:96.5,spotFoilSpecularRealismPct:39.4,renderLatencySec:.6,costPerMockupUsd:.002,annualSavingsUsdM:.48,verdict:"Confirm"}:{scenarioId:i,pipelineMode:e,barcodeNutritionLegibilityPct:51.4,spotFoilSpecularRealismPct:74.2,renderLatencySec:16.4,costPerMockupUsd:.19,annualSavingsUsdM:.11,verdict:"Send to a human"}}const x=document.querySelector("#app");if(!x)throw new Error("Missing #app root");let r="luxury-cosmetic-goldfoil-carton",n="cad-uv-fold-pbr-spotfoil-fluxfill",c=42;function P(i){const e=i.getContext("2d");if(!e)return;const l=i.width,t=i.height;e.clearRect(0,0,l,t);const S=v[r],u=k(r,n,c),s=n==="flat-dieline-to-i2i-diffusion",h=e.createLinearGradient(0,0,l,t);h.addColorStop(0,"#070b14"),h.addColorStop(1,"#111827"),e.fillStyle=h,e.fillRect(0,0,l,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,l-32,46),e.strokeStyle=n==="cad-uv-fold-pbr-spotfoil-fluxfill"?"#10b981":"#ef4444",e.strokeRect(16,14,l-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`246th Workbench · 2D Vector Dieline -> 3D Folded PBR Mockup (${S.meshTopology})`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`GS1 Barcode & Nutrition Lock: ${u.barcodeNutritionLegibilityPct}% | Spot-Foil Realism: ${u.spotFoilSpecularRealismPct}% | Cost: $${u.costPerMockupUsd.toFixed(3)}/Shot`,28,51);const g=28,m=82;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle="#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(g,m,315,286,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText(`1. Flat 2D Packaging Dieline (${S.creaseCount} Crease Lines)`,g+16,m+26);const o=g+156,a=m+158;e.strokeStyle="#34d399",e.lineWidth=1.8,e.strokeRect(o-42,a-55,84,110),e.strokeRect(o-110,a-55,68,110),e.strokeRect(o+42,a-55,68,110),e.strokeRect(o-42,a-105,84,50),e.strokeRect(o-42,a+55,84,46),e.strokeStyle="#f59e0b",e.setLineDash([4,3]),e.strokeRect(o-42,a-55,84,110),e.setLineDash([]),e.fillStyle="#fbbf24",e.font="bold 10px JetBrains Mono, monospace",e.textAlign="center",e.fillText("SPOT-GOLD FOIL LAYER",o,a-12),e.fillStyle="#e2e8f0",e.fillText("GS1-128 BARCODE LOCK",o,a+24),e.restore();const f=368,y=366;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=s?"#ef4444":"#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(f,82,y,286,12),e.fill(),e.stroke(),e.fillStyle=s?"#f87171":"#34d399",e.font="bold 12px Inter, sans-serif",e.fillText(s?"⛔ Direct I2I Diffusion: 48.6% Melted Nutrition Table & Flaps!":`✅ 3D CAD Fold + PBR Spot-Foil (${c}° Specular) + Flux.1-Fill`,f+16,106);const d=f+118,p=140;e.fillStyle="#1e1b4b",e.strokeStyle=s?"#ef4444":"#fbbf24",e.lineWidth=2.5,e.beginPath(),e.roundRect(d,p,132,168,8),e.fill(),e.stroke();const F=Math.round((c-42)/45*32);e.fillStyle=s?"rgba(239, 68, 68, 0.35)":"rgba(251, 191, 36, 0.32)",e.fillRect(d+14+F,p+26,86,44),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.textAlign="center",e.fillText(s?"??UNFOLDED_FLAP??":"24K HOT-FOIL CREST",d+66,p+52),e.fillStyle=s?"#fca5a5":"#6ee7b7",e.font="10px JetBrains Mono, monospace",e.fillText(s?"✕ Barcode Unscannable":"✓ 100% Cylindrical/Fold UV",d+66,p+104),e.fillText(s?"✕ Nutrition Text Melted":"✓ 0.25mm Emboss Normal",d+66,p+124),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`2.8s Render · $0.009/Packshot · Saves +$${u.annualSavingsUsdM.toFixed(2)}M/yr vs Physical Proofing`,f+y/2,346),e.restore()}function b(){const i=v[r],e=k(r,n,c);x.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">246th Interactive Architecture Workbench · Domain 2 (Packaging Dieline-to-3D Photoreal Mockup)</span>
        <h1>快消与美妆包装平面刀模图（2D Dieline PDF/SVG）转 3D 烫金浮雕与场景样机编译工作台</h1>
        <p class="subtitle">CAD 折痕参数化折盒/柱面 UV 映射 (100% 条形码/配料表零畸变) + 专色烫金/局部 UV 双 PBR 材质分离 + Flux.1-Fill 场景合成 vs 平面刀模直丢图生图</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.barcodeNutritionLegibilityPct}% UV Lock</span>
        <span class="metric-pill">$${e.costPerMockupUsd.toFixed(3)} / Shot</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 包装容器与工艺场景 (Packaging Container)</label>
        <select id="scenario-select">
          ${Object.values(v).map(t=>`<option value="${t.id}" ${t.id===r?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="pipeline-select">2. 刀模转 3D 样机管线 (Dieline-to-Mockup Pipeline)</label>
        <select id="pipeline-select">
          <option value="cad-uv-fold-pbr-spotfoil-fluxfill" ${n==="cad-uv-fold-pbr-spotfoil-fluxfill"?"selected":""}>✅ CAD 折痕 3D UV 映射 + 烫金/亮油 PBR 通道分离 + Flux.1-Fill (推荐)</option>
          <option value="flat-dieline-to-i2i-diffusion" ${n==="flat-dieline-to-i2i-diffusion"?"selected":""}>⛔ 把展开平面刀模图直接喂给 I2I 扩散大模型 (48.6% 盒盖未折叠 & 配料表乱码)</option>
          <option value="unlit-2d-perspective-warp-only" ${n==="unlit-2d-perspective-warp-only"?"selected":""}>⚠️ 传统 Photoshop 2D 透视贴图 (无 24K 烫金金属高光与袋体折痕凹凸)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="azimuth-slider">3. 烫金专色高光掠射角 (Foil Specular Azimuth: <strong>${c}°</strong>)</label>
        <input id="azimuth-slider" type="range" min="15" max="75" step="3" value="${c}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>2D 展开刀模图（折线/切线/专色层）→ 3D 折叠 PBR 包装样机实时预览 (Dieline-to-3D Stage)</h2>
          <span class="tag">${i.spotFinishLabel}</span>
        </div>
        <canvas id="dieline-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>包装印前还原度与打样 FinOps 遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">GS1 条码与配料表曲率保真率</span>
            <strong class="kpi-value">${e.barcodeNutritionLegibilityPct}%</strong>
            <span class="kpi-note">精确柱面/折盒 4K UV 映射 vs 扩散直出乱码</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">烫金/击凸/局部 UV 光泽真实度</span>
            <strong class="kpi-value">${e.spotFoilSpecularRealismPct}%</strong>
            <span class="kpi-note">分离 Metallic/Roughness/Normal 专色层</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单张 4K 商业样机渲染耗时</span>
            <strong class="kpi-value">${e.renderLatencySec}s</strong>
            <span class="kpi-note">改完 AI 刀模稿 2.8 秒直出电商详情页主图</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单张成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerMockupUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">免除印前实体打样寄送与影棚静物实拍周期</span>
          </div>
        </div>
      </aside>
    </main>
  `;const l=document.querySelector("#dieline-canvas");l&&P(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{r=t.target.value,b()}),document.querySelector("#pipeline-select")?.addEventListener("change",t=>{n=t.target.value,b()}),document.querySelector("#azimuth-slider")?.addEventListener("input",t=>{c=Number(t.target.value),b()})}b();
