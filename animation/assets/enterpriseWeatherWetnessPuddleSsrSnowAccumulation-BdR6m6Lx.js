import"./modulepreload-polyfill-B5Qt9EMX.js";const h={"automotive-neon-wet-asphalt-puddle-ssr":{id:"automotive-neon-wet-asphalt-puddle-ssr",title:"Automotive Night Commercial: Porous Asphalt Darkening & Puddle Planar SSR",titleZh:"汽车夜景TVC雨后湿滑路面：多孔沥青吸水变暗（Albedo×0.42）与积水坑车灯镜面反射",roughnessShift:"Roughness 0.78 (Dry) → 0.06 (Water Film IOR 1.33)",normalSnowRule:"Height-Field Puddle Mask + 4-Octave Ripple Normals",shotCount:36},"alpine-suv-upward-normal-snow-accumulation":{id:"alpine-suv-upward-normal-snow-accumulation",title:"Winter SUV Campaign: World-Up Normal (N·Up > cos 38°) & Roof-Shadow Snow Shield",titleZh:"冬季 SUV 冰雪大片：世界系朝上法线（N·Up > cos 38°）积雪生长与车底/屋檐防穿模遮蔽",roughnessShift:"Subsurface Snow Sparkle BRDF + Tire-Track Displacement",normalSnowRule:"N·Up > 0.788 & Sky-Shadow Occlusion = 0 (Zero Under-Bumper Snow)",shotCount:42},"icvfx-city-monsoon-ripple-splash-transition":{id:"icvfx-city-monsoon-ripple-splash-transition",title:"ICVFX LED Stage Dynamic Dry-to-Monsoon Continuous Weather Scrubbing",titleZh:"虚拟制片 LED 棚晴雨雪连续滑块切换（涟漪碰撞水花 + 竖直墙面雨水流痕 Streak Map）",roughnessShift:"Continuous Wetness 0%→100% + Vertical Wall Drip UV Advection",normalSnowRule:"60fps Real-Time Weather Scrubbing on Single Dry 3DGS/USD Asset",shotCount:48}};function S(n,e,a){const t=Number(((a-.5)*.6).toFixed(2));return e==="porous-wetness-brdf-puddle-ssr-upward-snow-shader"?{scenarioId:n,pipelineMode:e,physicalWeatherRealismPct:Math.min(99.9,Number((99.4+t).toFixed(1))),puddleReflectionParityPct:99.6,realtimeFrameRateFps:60,costPerShotUsd:.019,annualSavingsUsdM:2.92,verdict:"Act automatically"}:e==="manual-vfx-wetdown-matte-painting-reshoot"?{scenarioId:n,pipelineMode:e,physicalWeatherRealismPct:98.2,puddleReflectionParityPct:97.5,realtimeFrameRateFps:1,costPerShotUsd:1450,annualSavingsUsdM:.16,verdict:"Confirm"}:{scenarioId:n,pipelineMode:e,physicalWeatherRealismPct:52.6,puddleReflectionParityPct:44.8,realtimeFrameRateFps:24,costPerShotUsd:.42,annualSavingsUsdM:.05,verdict:"Send to a human"}}const m=document.querySelector("#app");if(!m)throw new Error("Missing #app root");let r="automotive-neon-wet-asphalt-puddle-ssr",l="porous-wetness-brdf-puddle-ssr-upward-snow-shader",c=.8;function v(n){const e=n.getContext("2d");if(!e)return;const a=n.width,t=n.height;e.clearRect(0,0,a,t);const d=h[r],i=S(r,l,c),o=l==="naive-2d-rain-snow-screen-overlay-filter",u=e.createLinearGradient(0,0,a,t);u.addColorStop(0,"#070b14"),u.addColorStop(1,"#0f172a"),e.fillStyle=u,e.fillRect(0,0,a,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,a-32,46),e.strokeStyle=l==="porous-wetness-brdf-puddle-ssr-upward-snow-shader"?"#10b981":"#ef4444",e.strokeRect(16,14,a-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`268th Workbench (52nd in Domain 4) · Precipitation ${(c*100).toFixed(0)}% · ${d.roughnessShift}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Physical Weather Realism: ${i.physicalWeatherRealismPct}% | Puddle/Snow Gravity Lock: ${i.puddleReflectionParityPct}% | Frame Rate: ${i.realtimeFrameRateFps.toFixed(0)} fps`,28,51);const f=[{title:"1. Porous Asphalt & Brick Wetness Darkening",detail:o?"⛔ Dry Chalky Grey Road Under 2D Rain Overlay!":"✓ Albedo × 0.42 Internal Scattering + Roughness 0.78 → 0.06",color:o?"#ef4444":"#10b981",x:36,y:84},{title:"2. Height-Field Puddle Mask & Planar SSR",detail:o?"⛔ Zero Taillight / Neon Reflections in Puddles (44.8%)":`✓ IOR 1.33 Water Film + Ripple Normals (${i.puddleReflectionParityPct}% Lock)`,color:o?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. World-Up Normal (N·Up) & Roof-Shadow Snow Gate",detail:o?"⛔ 2D V2V Paints Snow Under Car Bumpers & Ceilings!":`✓ ${d.normalSnowRule}`,color:o?"#ef4444":"#a855f7",x:36,y:178},{title:"4. 60fps Single-Asset Weather Scrubbing",detail:o?"⛔ Flickering 2D Rain Streaks & Melted Car Logos":`✓ ${i.realtimeFrameRateFps.toFixed(0)} fps Real-Time ($${i.costPerShotUsd}/Shot · +$${i.annualSavingsUsdM}M/yr)`,color:o?"#ef4444":"#f59e0b",x:396,y:178}];for(const s of f)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=s.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(s.x,s.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(s.title,s.x+14,s.y+28),e.fillStyle=s.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(s.detail,s.x+14,s.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Physical Weather Conversion Pipeline: ${d.title} (${d.shotCount} Shots)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(o?"⛔ 2D Screen-Space Rain/Snow Filter: Dry Road Under Rain, Missing Puddle SSR & Upside-Down Snow!":`✓ Porous BRDF Darkening + Height Puddle Planar SSR + N·Up > cos(38°) Snow Shader ($${i.costPerShotUsd}/Shot)`,54,336),e.restore()}function p(){const n=h[r],e=S(r,l,c);m.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">268th Workbench (52nd in Domain 4) · Porous Wetness BRDF, Puddle SSR &amp; Upward-Normal Snow</span>
        <h1>影视广告、汽车宣传片与数字孪生动态晴转雨雪天气：多孔吸水变暗、水坑反射与朝上法线积雪工作台</h1>
        <p class="subtitle">多孔材质内散射吸水变暗（Albedo×0.42）+ 高度场积水坑平面反射（Planar SSR + 涟漪法线）+ 朝上法线（N·Up &gt; cos 38°）防车底穿模积雪 vs 2D 雨雪贴片滤镜</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.physicalWeatherRealismPct}% Weather Realism</span>
        <span class="metric-pill">${e.realtimeFrameRateFps.toFixed(0)} FPS Real-Time</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 影视与汽车广告全天候场景 (Weather Conversion Scenario)</label>
        <select id="scenario-select">
          ${Object.values(h).map(t=>`<option value="${t.id}" ${t.id===r?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 晴转雨雪物理材质与反射管线 (Weather Synthesis Pipeline)</label>
        <select id="mode-select">
          <option value="porous-wetness-brdf-puddle-ssr-upward-snow-shader" ${l==="porous-wetness-brdf-puddle-ssr-upward-snow-shader"?"selected":""}>✅ 多孔吸水 BRDF + 高度场水坑平面 SSR + 朝上法线 (N·Up) 积雪遮蔽 (推荐)</option>
          <option value="naive-2d-rain-snow-screen-overlay-filter" ${l==="naive-2d-rain-snow-screen-overlay-filter"?"selected":""}>⛔ 2D 雨雪屏幕贴片 / V2V 滤镜 (路面依然干白无车灯倒影，车底与屋檐下长出反重力白雪)</option>
          <option value="manual-vfx-wetdown-matte-painting-reshoot" ${l==="manual-vfx-wetdown-matte-painting-reshoot"?"selected":""}>⚠️ 洒水车实拍重拍或人工逐帧绘景 ($1,450/镜，无法在 LED 棚实时拖动天气滑块)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="precip-slider">3. 降水/降雪水膜覆盖强度 (Precipitation &amp; Wetness Intensity: <strong>${(c*100).toFixed(0)}%</strong>)</label>
        <input id="precip-slider" type="range" min="0.40" max="1.00" step="0.10" value="${c}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>多孔材质吸水变暗、水坑车灯 SSR 倒影与朝上法线积雪舞台 (Weather Stage)</h2>
          <span class="tag">${n.shotCount} Shots · ${e.realtimeFrameRateFps.toFixed(0)} FPS</span>
        </div>
        <canvas id="weather-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>全天候汽车广告与虚拟制片遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">雨后湿滑材质与积雪重力物理真实度</span>
            <strong class="kpi-value">${e.physicalWeatherRealismPct}%</strong>
            <span class="kpi-note">告别“下大雨路面却干白”的假贴片感</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">水坑霓虹倒影与屋檐遮蔽准确率</span>
            <strong class="kpi-value">${e.puddleReflectionParityPct}%</strong>
            <span class="kpi-note">IOR 1.33 水膜镜面反射 + 顶向阴影遮雪掩码</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">LED 虚拟制片棚天气滑块实时帧率</span>
            <strong class="kpi-value">${e.realtimeFrameRateFps.toFixed(1)} FPS</strong>
            <span class="kpi-note">单套晴天资产秒级派生晴/雨/暴雨/雪四版本</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单镜头制作成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerShotUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比洒水车外景重拍/VFX $1,450/镜降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const a=document.querySelector("#weather-canvas");a&&v(a),document.querySelector("#scenario-select")?.addEventListener("change",t=>{r=t.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{l=t.target.value,p()}),document.querySelector("#precip-slider")?.addEventListener("input",t=>{c=Number(t.target.value),p()})}p();
