import"./modulepreload-polyfill-B5Qt9EMX.js";const g={"bone-china-gold-rim-wagyu-plating":{id:"bone-china-gold-rim-wagyu-plating",title:"45% Bone China 24K Gold-Rim Plate & A5 Wagyu Jus Specular Relighting",titleZh:"45% 骨瓷 24K 描金餐盘次表面透光、拉丝牛排刀叉与 A5 和牛浓汁高光合成",glazeIor:1.54,anisotropyRatio:"αx=0.04 / αy=0.32",appetiteKelvin:3400,skuCount:36},"reactive-kiln-glaze-stoneware-ramen":{id:"reactive-kiln-glaze-stoneware-ramen",title:"Artisanal Reactive Kiln-Glaze Stoneware Bowl & Volumetric Broth Steam",titleZh:"窑变结晶釉粗陶拉面碗双层清漆（Dual-Lobe Clearcoat）与真实热气折射合成",glazeIor:1.58,anisotropyRatio:"αx=0.08 / αy=0.24",appetiteKelvin:3600,skuCount:48},"brushed-18-10-cutlery-crystal-stemware":{id:"brushed-18-10-cutlery-crystal-stemware",title:"18/10 Brushed Stainless 4-Tine Cutlery Set & Lead-Free Crystal Wine Caustics",titleZh:"18/10 缎面拉丝四齿西餐叉几何锁死（零五齿畸变）与水晶高脚杯焦散合成",glazeIor:1.52,anisotropyRatio:"αx=0.03 / αy=0.38",appetiteKelvin:3200,skuCount:64}};function v(i,e,a){const t=Number(((a-.5)*1.2).toFixed(2));return e==="cad-tine-rim-lock-glaze-anisotropic-kelvin-studio"?{scenarioId:i,pipelineMode:e,cutleryTineRimLockPct:100,glazeAnisotropicRealismPct:Math.min(99.9,Number((99.1+t).toFixed(1))),appetiteConversionLiftPct:41.8,costPerSceneUsd:.018,annualSavingsUsdM:2.38,verdict:"Act automatically"}:e==="physical-food-stylist-hot-lamp-studio"?{scenarioId:i,pipelineMode:e,cutleryTineRimLockPct:100,glazeAnisotropicRealismPct:98.5,appetiteConversionLiftPct:38,costPerSceneUsd:380,annualSavingsUsdM:.12,verdict:"Confirm"}:{scenarioId:i,pipelineMode:e,cutleryTineRimLockPct:61.4,glazeAnisotropicRealismPct:54.8,appetiteConversionLiftPct:-14.2,costPerSceneUsd:.46,annualSavingsUsdM:.05,verdict:"Send to a human"}}const f=document.querySelector("#app");if(!f)throw new Error("Missing #app root");let c="bone-china-gold-rim-wagyu-plating",s="cad-tine-rim-lock-glaze-anisotropic-kelvin-studio",p=.85;function y(i){const e=i.getContext("2d");if(!e)return;const a=i.width,t=i.height;e.clearRect(0,0,a,t);const l=g[c],r=v(c,s,p),n=s==="naive-unmasked-inpainting-five-tine-fork",u=e.createLinearGradient(0,0,a,t);u.addColorStop(0,"#090d16"),u.addColorStop(1,"#1e1b4b"),e.fillStyle=u,e.fillRect(0,0,a,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,a-32,46),e.strokeStyle=s==="cad-tine-rim-lock-glaze-anisotropic-kelvin-studio"?"#10b981":"#ef4444",e.strokeRect(16,14,a-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`261st Workbench (51st in Domain 2) · Glaze IOR ${l.glazeIor} · ${l.anisotropyRatio} · ${l.appetiteKelvin}K CRI 98+`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`4-Tine & Gold-Rim Lock: ${r.cutleryTineRimLockPct}% | Dual-Lobe Glaze & Anisotropy: ${r.glazeAnisotropicRealismPct}% | CVR Lift: +${r.appetiteConversionLiftPct}%`,28,51);const m=[{title:"1. Porcelain Rim & 24K Gold Band Lock",detail:n?"⛔ Melted Rim & Broken Gold Filigree (38.6% Defect)":`✓ 100.0% CAD/Photo Alpha Rim Lock (IOR ${l.glazeIor})`,color:n?"#ef4444":"#10b981",x:36,y:84},{title:"2. 18/10 Cutlery 4-Tine & Brushed Anisotropy",detail:n?"⛔ Hallucinated 5-Tine Fork & Bent Knife Blade!":`✓ 100% 4-Tine Topology + GGX ${l.anisotropyRatio}`,color:n?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Bone-China Subsurface & Kiln Glaze Clearcoat",detail:n?"⛔ Flat Matte Plastic Plate (Zero Specular Depth)":`✓ Dual-Layer Clearcoat Weight ${p.toFixed(2)} (${r.glazeAnisotropicRealismPct}%)`,color:n?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Culinary Appetite Kelvin & Steam Compositing",detail:n?"⛔ 6200K Greasy Grey Meat Cast (-14.2% CVR Drop)":`✓ ${l.appetiteKelvin}K CRI 98+ Specular Glaze (+${r.appetiteConversionLiftPct}% CVR)`,color:n?"#ef4444":"#f59e0b",x:396,y:178}];for(const o of m)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=o.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(o.x,o.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(o.title,o.x+14,o.y+28),e.fillStyle=o.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(o.detail,o.x+14,o.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Tableware & Culinary Pipeline: ${l.title} (${l.skuCount} SKUs)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(n?"⛔ Unmasked Inpainting: 38.6% 5-Tine Fork Mutation, Matte Plastic Glaze & Cold Greasy Food Cast!":`✓ 100% Rim/Tine Lock + IOR ${l.glazeIor} Glaze Clearcoat + GGX Brushed Metal + ${l.appetiteKelvin}K Food Relight ($${r.costPerSceneUsd}/Scene)`,54,336),e.restore()}function d(){const i=g[c],e=v(c,s,p);f.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">261st Workbench (51st in Domain 2) · Porcelain Glaze, Brushed Cutlery &amp; Culinary Relighting</span>
        <h1>餐饮与家居电商高定陶瓷餐具釉面透光、拉丝银器各向异性高光与菜肴热气布光工作台</h1>
        <p class="subtitle">100% 锁死骨瓷金边与西餐叉四齿几何 + 双层釉面清漆（IOR 1.54）+ GGX 拉丝金属各向异性高光 + 3400K 高显色食欲布光 vs 盲目重绘五齿怪叉与死灰塑胶盘</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.cutleryTineRimLockPct}% Tine/Rim Lock</span>
        <span class="metric-pill">$${e.costPerSceneUsd}/Scene</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 餐厨器皿与美食摆盘场景 (Tableware &amp; Culinary Scenario)</label>
        <select id="scenario-select">
          ${Object.values(g).map(t=>`<option value="${t.id}" ${t.id===c?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 釉面与金属刀叉合成管线 (Tableware Compositing Pipeline)</label>
        <select id="mode-select">
          <option value="cad-tine-rim-lock-glaze-anisotropic-kelvin-studio" ${s==="cad-tine-rim-lock-glaze-anisotropic-kelvin-studio"?"selected":""}>✅ 100% 刀齿/盘沿锁死 + 双层陶瓷清漆 + GGX 拉丝各向异性 + 3400K 食欲重打光 (推荐)</option>
          <option value="naive-unmasked-inpainting-five-tine-fork" ${s==="naive-unmasked-inpainting-five-tine-fork"?"selected":""}>⛔ 无掩码局部重绘/图生图 (38.6% 四齿叉变五齿、金边融化、食物发灰无食欲)</option>
          <option value="physical-food-stylist-hot-lamp-studio" ${s==="physical-food-stylist-hot-lamp-studio"?"selected":""}>⚠️ 传统美食造型师实拍 ($380/张，高温摄影灯下酱汁 8 分钟干裂结皮)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="glaze-slider">3. 骨瓷/窑变双层清漆反射权重 (Glaze Clearcoat Weight: <strong>${p.toFixed(2)}</strong>)</label>
        <input id="glaze-slider" type="range" min="0.50" max="1.00" step="0.05" value="${p}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>餐具边缘锁死、双层釉面清漆、拉丝各向异性与 3400K 食欲光舞台 (Tableware Stage)</h2>
          <span class="tag">${i.skuCount} SKUs · Glaze IOR ${i.glazeIor}</span>
        </div>
        <canvas id="tableware-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>餐厨家居与外卖零售视觉遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">西餐叉四齿与骨瓷金边几何保真率</span>
            <strong class="kpi-value">${e.cutleryTineRimLockPct}%</strong>
            <span class="kpi-note">彻底杜绝 5 齿怪叉与描金花纹断裂</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">双层釉面清漆与拉丝银器真实度</span>
            <strong class="kpi-value">${e.glazeAnisotropicRealismPct}%</strong>
            <span class="kpi-note">${i.anisotropyRatio} 各向异性高光</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">详情页食欲点击与加购转化提升</span>
            <strong class="kpi-value">${e.appetiteConversionLiftPct>=0?"+":""}${e.appetiteConversionLiftPct}%</strong>
            <span class="kpi-note">${i.appetiteKelvin}K CRI 98+ 暖润油脂高光</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单场景合成成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerSceneUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比美食造型棚拍 $380/张降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const a=document.querySelector("#tableware-canvas");a&&y(a),document.querySelector("#scenario-select")?.addEventListener("change",t=>{c=t.target.value,d()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{s=t.target.value,d()}),document.querySelector("#glaze-slider")?.addEventListener("input",t=>{p=Number(t.target.value),d()})}d();
