import"./modulepreload-polyfill-B5Qt9EMX.js";const g={"alpine-geodesic-tent-2700k-lantern-dusk":{id:"alpine-geodesic-tent-2700k-lantern-dusk",title:"4-Season Alpine Geodesic Dome Tent: 20D Ripstop 2700K Lantern Glow & Snow-Skirt Seal",titleZh:"四季高山球形帐篷蓝调时刻：20D 涂硅格子布 2700K 营灯薄壁透光与雪裙压地阴影",fabricSpec:"20D 400T Double-Silicone Ripstop + DAC Featherlite Poles",lightingContrast:"2700K Warm Interior Lantern vs 5400K Alpine Blue Hour",skuCount:38},"hexagonal-silnylon-tarp-catenary-guyline":{id:"hexagonal-silnylon-tarp-catenary-guyline",title:"Hexagonal Glamping Tarp: 1.8mm Dyneema Catenary Guylines & Aluminum Stake Grass AO",titleZh:"黑胶六角天幕：1.8mm 反光大力马风绳悬链线100%防擦除与草甸地钉接触遮蔽（AO）",fabricSpec:"150D Black-Vinyl UPF50+ Oxford + 8-Point Guyline Tension",lightingContrast:"4200K Golden-Hour Rim Light + Zero-Transmission Blackout Under-Canopy",skuCount:46},"patio-pergola-louver-solar-awning-shadow":{id:"patio-pergola-louver-solar-awning-shadow",title:"Motorized Aluminum Patio Pergola & RV Awning: Louver Slats Ray-Traced Sun Stripes",titleZh:"庭院电动百叶凉亭与房车遮阳棚：百叶倾角平行阳光条纹投影与防水压胶条高光",fabricSpec:"6063-T5 Powder-Coated Louvers + Solution-Dyed Acrylic",lightingContrast:"4800K Directional Sun Louver Cast Shadows",skuCount:52}};function m(t,e,a){const n=Number(((a-.5)*1).toFixed(1));return e==="guyline-pole-shield-thinwall-ripstop-stake-ao"?{scenarioId:t,pipelineMode:e,guylinePoleStructuralLockPct:100,ripstopLanternTranslucencyPct:Math.min(99.9,Number((99.1+n).toFixed(1))),seasonalConversionLiftPct:43.5,costPerSceneUsd:.017,annualSavingsUsdM:2.64,verdict:"Act automatically"}:e==="remote-alpine-helicopter-location-shoot"?{scenarioId:t,pipelineMode:e,guylinePoleStructuralLockPct:100,ripstopLanternTranslucencyPct:98.6,seasonalConversionLiftPct:39,costPerSceneUsd:1600,annualSavingsUsdM:.12,verdict:"Confirm"}:{scenarioId:t,pipelineMode:e,guylinePoleStructuralLockPct:52.8,ripstopLanternTranslucencyPct:58.4,seasonalConversionLiftPct:-11.4,costPerSceneUsd:.49,annualSavingsUsdM:.03,verdict:"Send to a human"}}const v=document.querySelector("#app");if(!v)throw new Error("Missing #app root");let r="alpine-geodesic-tent-2700k-lantern-dusk",s="guyline-pole-shield-thinwall-ripstop-stake-ao",c=.8;function S(t){const e=t.getContext("2d");if(!e)return;const a=t.width,n=t.height;e.clearRect(0,0,a,n);const p=g[r],o=m(r,s,c),i=s==="naive-unmasked-inpainting-severed-guylines",u=e.createLinearGradient(0,0,a,n);u.addColorStop(0,"#070b14"),u.addColorStop(1,"#1e1b4b"),e.fillStyle=u,e.fillRect(0,0,a,n),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,a-32,46),e.strokeStyle=s==="guyline-pole-shield-thinwall-ripstop-stake-ao"?"#10b981":"#ef4444",e.strokeRect(16,14,a-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`271st Workbench (53rd in Domain 2) · ${p.fabricSpec} · Lantern Weight ${c.toFixed(2)}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Guyline & Pole Lock: ${o.guylinePoleStructuralLockPct}% | Ripstop Translucency: ${o.ripstopLanternTranslucencyPct}% | CVR Lift: +${o.seasonalConversionLiftPct}%`,28,51);const y=[{title:"1. 1.8mm Guyline & Geodesic Pole Alpha Shield",detail:i?"⛔ 47.2% Severed Guylines & Bent Spaghetti Poles!":"✓ 100.0% Sub-Pixel Dyneema Cord & DAC Pole Lock",color:i?"#ef4444":"#10b981",x:36,y:84},{title:"2. 20D Ripstop Thin-Walled Lantern Translucency",detail:i?"⛔ Flat Opaque Cardboard Tent or Erased Ripstop Grid":`✓ ${p.lightingContrast} (${o.ripstopLanternTranslucencyPct}%)`,color:i?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Terrain Stake-Point & Snow-Skirt Grounding AO",detail:i?"⛔ Tent Floats 12cm Above Uneven Alpine Rocks!":"✓ Heightmap Stake Contact + Grass Blade Occlusion",color:i?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Seasonal Outdoor Campaign Economics",detail:i?"⛔ -11.4% CVR Drop from Collapsed Canopy Tension":`✓ +${o.seasonalConversionLiftPct}% CVR Lift ($${o.costPerSceneUsd}/Scene · +$${o.annualSavingsUsdM}M/yr)`,color:i?"#ef4444":"#f59e0b",x:396,y:178}];for(const l of y)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=l.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(l.x,l.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(l.title,l.x+14,l.y+28),e.fillStyle=l.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(l.detail,l.x+14,l.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Outdoor & Glamping Visual Pipeline: ${p.title} (${p.skuCount} SKUs)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(i?"⛔ Unmasked Background Inpainting: Erases 1.8mm Guylines, Bends Tent Poles & Floats Above Terrain!":`✓ 1.8mm Guyline Alpha Shield + 20D Ripstop Thin-Wall Translucency + Terrain Stake AO ($${o.costPerSceneUsd}/Scene)`,54,336),e.restore()}function d(){const t=g[r],e=m(r,s,c);v.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">271st Workbench (53rd in Domain 2) · Outdoor Tent Guyline Lock, Ripstop Translucency &amp; Stake AO</span>
        <h1>户外露营帐篷、天幕与庭院装备电商视觉工作台：风绳/铝杆锁死、20D 尼龙内帐营灯透光与山地地钉锚定</h1>
        <p class="subtitle">1.8mm 反光风绳与交叉铝杆亚像素护盾（100% 零断裂）+ 20D 防撕裂涂硅格子布 2700K 营灯薄壁透射 + 山地草甸地钉与雪裙接触阴影 vs 盲目扩图擦断风绳</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.guylinePoleStructuralLockPct}% Guyline Lock</span>
        <span class="metric-pill">$${e.costPerSceneUsd}/Scene</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 户外露营与庭院装备场景 (Outdoor &amp; Patio Scenario)</label>
        <select id="scenario-select">
          ${Object.values(g).map(n=>`<option value="${n.id}" ${n.id===r?"selected":""}>${n.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 风绳保护与帐布透光合成管线 (Outdoor Gear Compositing Mode)</label>
        <select id="mode-select">
          <option value="guyline-pole-shield-thinwall-ripstop-stake-ao" ${s==="guyline-pole-shield-thinwall-ripstop-stake-ao"?"selected":""}>✅ 1.8mm 风绳/铝杆护盾 + 20D 格子布薄壁营灯透射 + 地钉地形锚定 (推荐)</option>
          <option value="naive-unmasked-inpainting-severed-guylines" ${s==="naive-unmasked-inpainting-severed-guylines"?"selected":""}>⛔ 普通抠图换背景 (47.2% 细风绳被背景吞噬断裂、铝杆弯曲、帐篷悬空飘在草地上)</option>
          <option value="remote-alpine-helicopter-location-shoot" ${s==="remote-alpine-helicopter-location-shoot"?"selected":""}>⚠️ 远赴雪山/营地外景实拍 ($1,600/款，受天气制约且无法批量换四季地形)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="lantern-slider">3. 内帐 2700K 营灯薄壁透射强度 (Interior Lantern Translucency: <strong>${c.toFixed(2)}</strong>)</label>
        <input id="lantern-slider" type="range" min="0.50" max="1.00" step="0.05" value="${c}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>1.8mm 风绳护盾、20D 格子布内帐透光与地钉地形贴合舞台 (Outdoor Glamping Stage)</h2>
          <span class="tag">${t.skuCount} SKUs · ${t.fabricSpec}</span>
        </div>
        <canvas id="camping-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>户外露营与跨境庭院电商遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">1.8mm 风绳与交叉铝杆结构完整率</span>
            <strong class="kpi-value">${e.guylinePoleStructuralLockPct}%</strong>
            <span class="kpi-note">亚像素悬链线掩码杜绝风绳半截消失</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">20D 涂硅格子布与营灯透光真实度</span>
            <strong class="kpi-value">${e.ripstopLanternTranslucencyPct}%</strong>
            <span class="kpi-note">保留微米级防撕裂方格与防水压胶条反光</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">露营旺季详情页加购转化提升</span>
            <strong class="kpi-value">${e.seasonalConversionLiftPct>=0?"+":""}${e.seasonalConversionLiftPct}%</strong>
            <span class="kpi-note">5400K 蓝调时刻外景与 2700K 暖光内帐对比</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单场景合成成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerSceneUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比雪山/草甸外景实拍 $1,600/款降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const a=document.querySelector("#camping-canvas");a&&S(a),document.querySelector("#scenario-select")?.addEventListener("change",n=>{r=n.target.value,d()}),document.querySelector("#mode-select")?.addEventListener("change",n=>{s=n.target.value,d()}),document.querySelector("#lantern-slider")?.addEventListener("input",n=>{c=Number(n.target.value),d()})}d();
