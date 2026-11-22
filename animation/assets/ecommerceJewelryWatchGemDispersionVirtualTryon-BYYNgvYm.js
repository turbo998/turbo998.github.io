import"./modulepreload-polyfill-B5Qt9EMX.js";const y={"solitaire-diamond-ring-6prong-hand":{id:"solitaire-diamond-ring-6prong-hand",title:"2.0ct 6-Prong Solitaire Diamond Ring on Finger (Cauchy n=2.417 Spectral Fire + 0.4mm Skin Crease)",titleZh:"2克拉六爪钻戒上手试戴（n=2.417 柯西色散火彩 + 6爪/57切面 100% 几何锁 + 0.4mm 指腹微压痕）",refractiveIndexLabel:"Diamond n=2.417 (Abbe V=55.3)",settingSpecLabel:"6-Prong Platinum + 57 Brilliant Facets",skinIndentationMm:.4},"chronograph-tourbillon-watch-wrist":{id:"chronograph-tourbillon-watch-wrist",title:"Swiss Tourbillon Chronograph Watch on Wrist (Sapphire AR Crystal + Roman Dial Lock + 0.5mm Strap Crease)",titleZh:"瑞士陀飞轮机械腕表上手试戴（蓝宝石防眩表镜 + 罗马数字/三眼表盘 100% 锁死 + 表带腕部遮挡压痕）",refractiveIndexLabel:"Sapphire Crystal n=1.77 + 18K Rose Gold",settingSpecLabel:"3 Sub-Dials + Tourbillon Cage + Guilloché",skinIndentationMm:.5},"emerald-drop-earring-neck-relight":{id:"emerald-drop-earring-neck-relight",title:"High-Jewelry Colombian Emerald Drop Earrings (Hair Strand Front-Occlusion + Ear-Lobe SSS Bounce)",titleZh:"高珠哥伦比亚祖母绿耳坠试戴（发丝前置自然遮挡 + 耳垂次表面散射 SSS 暖光互反射）",refractiveIndexLabel:"Beryl Emerald n=1.58 + 18K Yellow Gold",settingSpecLabel:"Pear-Cut Cabochon + Pavé Halo",skinIndentationMm:.25}};function D(i,e,n){const t=Math.min(.4,(n-4)*.05);return e==="cad-6dof-cauchy-dispersion-skin-sss"?{scenarioId:i,pipelineMode:e,prongDialGeometryLockPct:100,spectralFireDispersionPct:Number(Math.min(99.7,99.1+t).toFixed(1)),skinContactSssRealismPct:99.4,costPerShotUsd:.011,annualSavingsUsdM:3.12,verdict:"Act automatically"}:e==="flat-2d-cutout-paste-on-skin"?{scenarioId:i,pipelineMode:e,prongDialGeometryLockPct:100,spectralFireDispersionPct:58.4,skinContactSssRealismPct:42.6,costPerShotUsd:.003,annualSavingsUsdM:.45,verdict:"Confirm"}:{scenarioId:i,pipelineMode:e,prongDialGeometryLockPct:53.6,spectralFireDispersionPct:68.2,skinContactSssRealismPct:79.4,costPerShotUsd:.22,annualSavingsUsdM:.12,verdict:"Send to a human"}}const C=document.querySelector("#app");if(!C)throw new Error("Missing #app root");let r="solitaire-diamond-ring-6prong-hand",s="cad-6dof-cauchy-dispersion-skin-sss",c=8;function $(i){const e=i.getContext("2d");if(!e)return;const n=i.width,t=i.height;e.clearRect(0,0,n,t);const g=y[r],f=D(r,s,c),l=s==="naive-2d-inpaint-jewelry-lora",m=e.createLinearGradient(0,0,n,t);m.addColorStop(0,"#070b14"),m.addColorStop(1,"#1e1b4b"),e.fillStyle=m,e.fillRect(0,0,n,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,n-32,46),e.strokeStyle=s==="cad-6dof-cauchy-dispersion-skin-sss"?"#10b981":"#ef4444",e.strokeRect(16,14,n-32,46),e.fillStyle="#fbbf24",e.font="bold 13px Inter, sans-serif",e.fillText(`256th Workbench (🏆 50th Studio in Domain 2!) · ${g.refractiveIndexLabel} · ${c}-Point Light Stage`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Prong/Dial Geometry Lock: ${f.prongDialGeometryLockPct}% | Spectral Fire Dispersion: ${f.spectralFireDispersionPct}% | Skin SSS Contact: ${f.skinContactSssRealismPct}%`,28,51);const b=28,a=82;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle="#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(b,a,326,286,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("1. Spectral Cauchy Dispersion & Prong/Dial Lock",b+16,a+26);const h=b+163,k=a+148;e.strokeStyle=l?"#ef4444":"#38bdf8",e.fillStyle=l?"rgba(239, 68, 68, 0.2)":"rgba(56, 189, 248, 0.18)",e.lineWidth=2.5,e.beginPath(),e.arc(h,k,64,0,Math.PI*2),e.fill(),e.stroke();const v=l?5:6;for(let o=0;o<v;o++){const u=o/v*Math.PI*2,p=h+Math.cos(u)*64,L=k+Math.sin(u)*64;e.fillStyle=l?"#ef4444":"#fbbf24",e.beginPath(),e.arc(p,L,7,0,Math.PI*2),e.fill()}e.fillStyle="#f8fafc",e.font="bold 11px JetBrains Mono, monospace",e.textAlign="center",e.fillText(l?"⛔ 6 Prongs Mutated to 5 & Dial Melted!":`✓ 100% Locked (${g.settingSpecLabel})`,h,a+242),e.fillStyle="#6ee7b7",e.fillText(l?"✕ Flat Gray Plastic Gem":"✓ RGB Wavelength Cauchy Dispersion",h,a+264),e.restore();const d=376,P=358;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=l?"#ef4444":"#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(d,a,P,286,12),e.fill(),e.stroke(),e.fillStyle="#34d399",e.font="bold 12px Inter, sans-serif",e.fillText(`2. 6-DoF Skin-Cylinder Wrap & ${g.skinIndentationMm}mm Crease AO`,d+16,a+26),[{title:"HaMeR 3D Wrist / Finger Cylinder Fit",detail:"Rear Band Occluded Behind Finger/Wrist Cylinder"},{title:`${g.skinIndentationMm}mm Skin-Compression Normal Map`,detail:"Eliminates Floating Paper-Sticker Cutout Look"},{title:"Warm Skin Subsurface Scattering (SSS) Bounce",detail:"Projects 590nm Skin Warmth onto 18K Gold Bevels ($0.011/Shot)"}].forEach((o,u)=>{const p=a+52+u*74;e.fillStyle="#090d16",e.strokeStyle="#1e293b",e.beginPath(),e.roundRect(d+16,p,P-32,60,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.fillText(o.title,d+28,p+24),e.fillStyle="#94a3b8",e.font="10px JetBrains Mono, monospace",e.fillText(o.detail,d+28,p+44)}),e.restore()}function S(){const i=y[r],e=D(r,s,c);C.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">256th Workbench (🏆 50th Studio in Domain 2!) · Luxury Jewelry, Watch & Eyewear Virtual Try-On</span>
        <h1>高奢珠宝、名表与眼镜虚拟试戴（6-DoF 腕指贴合）、钻石柯西色散火彩与皮肤压痕工作台</h1>
        <p class="subtitle">3D CAD 100% 锁戒爪/表盘 + 钻石 n=2.417 柯西光谱色散火彩 + HaMeR 腕指圆柱体后环遮挡 + 0.4mm 皮肤微压痕与次表面散射 (SSS) vs 2D 重绘六爪变五爪</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.prongDialGeometryLockPct}% CAD Lock</span>
        <span class="metric-pill">${e.spectralFireDispersionPct}% Fire Sparkle</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 高奢珠宝/腕表品类 (Luxury Category)</label>
        <select id="scenario-select">
          ${Object.values(y).map(t=>`<option value="${t.id}" ${t.id===r?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 虚拟试戴与火彩渲染管线 (Try-On & Dispersion Pipeline)</label>
        <select id="mode-select">
          <option value="cad-6dof-cauchy-dispersion-skin-sss" ${s==="cad-6dof-cauchy-dispersion-skin-sss"?"selected":""}>✅ 3D CAD 6-DoF 贴合 + 柯西色散火彩 + 0.4mm 皮肤压痕与 SSS 互反射 (推荐)</option>
          <option value="naive-2d-inpaint-jewelry-lora" ${s==="naive-2d-inpaint-jewelry-lora"?"selected":""}>⛔ 2D 扩散 Inpainting + 珠宝 LoRA (46.4% 六爪变五爪、表盘罗马数字融化)</option>
          <option value="flat-2d-cutout-paste-on-skin" ${s==="flat-2d-cutout-paste-on-skin"?"selected":""}>⚠️ 传统 2D 抠图平贴手腕 (无表带背面环绕遮挡、无皮肤压痕与钻石火彩)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="light-slider">3. 影棚星芒点光源阵列数 (Jewelry Point Lights: <strong>${c} Lights</strong>)</label>
        <input id="light-slider" type="range" min="4" max="12" step="2" value="${c}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>57 切面钻石柯西色散（Cauchy Fire）与 6-DoF 腕部/手指压痕遮挡舞台 (Jewelry Try-On Stage)</h2>
          <span class="tag">Domain 2 Reaches 50 Studios! · ${i.settingSpecLabel}</span>
        </div>
        <canvas id="jewelry-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>高奢工艺锁死与光影真实度遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">戒爪数量/57切面/陀飞轮表盘准确率</span>
            <strong class="kpi-value">${e.prongDialGeometryLockPct}%</strong>
            <span class="kpi-note">100% 绑定珠宝厂 CAD 网格 vs LoRA 画错爪数</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">钻石虹彩火彩与蓝宝石防眩还原度</span>
            <strong class="kpi-value">${e.spectralFireDispersionPct}%</strong>
            <span class="kpi-note">分波长折射率 (n_R=2.407..n_B=2.451) 追迹</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">表带/戒圈皮肤微压痕与 SSS 真实感</span>
            <strong class="kpi-value">${e.skinContactSssRealismPct}%</strong>
            <span class="kpi-note">${i.skinIndentationMm}mm 肉感微凹陷 + 18K金映出肤色暖光</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单张成本 / 高安保棚拍年省</span>
            <strong class="kpi-value">$${e.costPerShotUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">免除百万级真钻武装押运与手模棚拍保险费</span>
          </div>
        </div>
      </aside>
    </main>
  `;const n=document.querySelector("#jewelry-canvas");n&&$(n),document.querySelector("#scenario-select")?.addEventListener("change",t=>{r=t.target.value,S()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{s=t.target.value,S()}),document.querySelector("#light-slider")?.addEventListener("input",t=>{c=Number(t.target.value),S()})}S();
