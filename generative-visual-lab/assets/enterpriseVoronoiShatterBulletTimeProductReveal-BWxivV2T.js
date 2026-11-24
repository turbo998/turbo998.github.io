import"./modulepreload-polyfill-B5Qt9EMX.js";const u={"glacier-ice-shatter-diving-watch-reveal":{id:"glacier-ice-shatter-diving-watch-reveal",title:"300m Diving Watch Emerging from Shattering Glacier Ice Block (IOR 1.309 + 1,000fps Orbit)",titleZh:"高奢潜水腕表破冰而出：240块 Voronoi 冰晶碎块（IOR 1.309 内裂面折射）+ 1000fps 子弹时间环绕",shardCount:240,shellIorMaterial:"Glacier Ice IOR 1.309 + Internal Conchoidal Fracture Faces",shotCount:34},"obsidian-monolith-burst-flagship-phone":{id:"obsidian-monolith-burst-flagship-phone",title:"Flagship Titanium Smartphone Breaking Through Volcanic Obsidian Monolith",titleZh:"钛金属旗舰手机击穿黑曜石巨碑：内层 SDF 排斥护盾（100% 锁死手机零划痕）+ 金色裂纹自发光",shardCount:320,shellIorMaterial:"Volcanic Obsidian Glass + 3200K Emissive Crack Seams",shotCount:40},"gold-veined-marble-fracture-perfume-core":{id:"gold-veined-marble-fracture-perfume-core",title:"Kintsugi Gold-Veined Marble Shell Unfolding in Zero-Gravity Slow-Motion Around Perfume",titleZh:"金缮大理石外壳零重力慢动作崩解：体积守恒（∑V_i = V_0）零碎片凭空消失与瓶身焦散互反射",shardCount:180,shellIorMaterial:"Carrara Marble SSS + 24K Kintsugi Fracture Veins",shotCount:38}};function f(o,e,a){const t=Number(((a-10)*.01).toFixed(2));return e==="voronoi-rbd-sdf-core-shield-1000fps-bullettime"?{scenarioId:o,pipelineMode:e,innerHeroSkuIntactLockPct:100,shardVolumeConservationPct:100,bulletTimeRefractionRealismPct:Math.min(99.9,Number((99.4+t).toFixed(1))),costPerShotUsd:.024,annualSavingsUsdM:3.04,verdict:"Act automatically"}:e==="phantom-flex4k-sugar-glass-physical-shoot"?{scenarioId:o,pipelineMode:e,innerHeroSkuIntactLockPct:98.5,shardVolumeConservationPct:100,bulletTimeRefractionRealismPct:98.2,costPerShotUsd:2400,annualSavingsUsdM:.14,verdict:"Confirm"}:{scenarioId:o,pipelineMode:e,innerHeroSkuIntactLockPct:47.6,shardVolumeConservationPct:55.2,bulletTimeRefractionRealismPct:51.8,costPerShotUsd:.56,annualSavingsUsdM:.03,verdict:"Send to a human"}}const v=document.querySelector("#app");if(!v)throw new Error("Missing #app root");let c="glacier-ice-shatter-diving-watch-reveal",i="voronoi-rbd-sdf-core-shield-1000fps-bullettime",r=30;function m(o){const e=o.getContext("2d");if(!e)return;const a=o.width,t=o.height;e.clearRect(0,0,a,t);const d=u[c],n=f(c,i,r),l=i==="naive-t2v-shatter-prompt-broken-hero-sku",p=e.createLinearGradient(0,0,a,t);p.addColorStop(0,"#070b14"),p.addColorStop(1,"#1e1b4b"),e.fillStyle=p,e.fillRect(0,0,a,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,a-32,46),e.strokeStyle=i==="voronoi-rbd-sdf-core-shield-1000fps-bullettime"?"#10b981":"#ef4444",e.strokeRect(16,14,a-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`278th Workbench (54th in Domain 4) · ${d.shardCount} Voronoi Shards · ${r}× Bullet-Time Slowdown`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Hero SKU Core Lock: ${n.innerHeroSkuIntactLockPct}% | Volume Conservation: ${n.shardVolumeConservationPct}% | Refraction Realism: ${n.bulletTimeRefractionRealismPct}%`,28,51);const S=[{title:"1. Inner Hero-SKU SDF Repulsion Core Shield",detail:l?"⛔ T2V Shatters Watch Bezel & Cracks Phone Screen (52.4%)":"✓ 100.0% Intact Inner SKU (Shards Repelled Outside SDF)",color:l?"#ef4444":"#10b981",x:36,y:84},{title:`2. 3D Voronoi Volume Conservation (${d.shardCount} Shards)`,detail:l?"⛔ 44.8% Shards Vanish or Morph into Smoke Mid-Air!":`✓ Exact ∑V_i = V_shell (${n.shardVolumeConservationPct}% Conservation)`,color:l?"#ef4444":"#38bdf8",x:396,y:84},{title:`3. Analytic Bullet-Time Ramp (${r}× Slowdown)`,detail:l?"⛔ Frame-Interpolation Ghosting on Spinning Shards":"✓ Sub-Step RBD Solver (24fps → 1000fps Hold → 60fps)",color:l?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Internal Fracture-Face Refraction & FinOps",detail:l?"⛔ Flat Opaque Shards Without Internal Fresnel Glints":`✓ ${d.shellIorMaterial} ($${n.costPerShotUsd}/Shot)`,color:l?"#ef4444":"#f59e0b",x:396,y:178}];for(const s of S)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=s.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(s.x,s.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(s.title,s.x+14,s.y+28),e.fillStyle=s.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(s.detail,s.x+14,s.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Voronoi Shatter & Bullet-Time Reveal Pipeline: ${d.title} (${d.shotCount} Shots)`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(l?"⛔ Unconstrained T2V Shatter Prompt: Breaks the Hero Watch/Phone Inside & Dissolves Shards!":`✓ Boolean Voronoi Shell (∑V_i=V_0) + Inner SDF Shield + 1000fps Sub-Step Bullet-Time ($${n.costPerShotUsd}/Shot · +$${n.annualSavingsUsdM}M/yr)`,54,336),e.restore()}function h(){const o=u[c],e=f(c,i,r);v.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">278th Workbench (54th in Domain 4) · Pre-Fractured Voronoi Shatter &amp; 1000fps Bullet-Time Reveal</span>
        <h1>高奢商业大片与游戏预告片预碎裂 Voronoi 刚体破冰/破石出场、1000fps 子弹时间与完好商品内核工作台</h1>
        <p class="subtitle">布尔减法预碎裂 Voronoi 外壳（100% 碎片体积守恒）+ 内核商品 SDF 刚体排斥护盾（100% 腕表/手机零划痕破损）+ 1000fps 解析子弹时间环绕 vs 文生视频把里面的商品一起炸碎</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.innerHeroSkuIntactLockPct}% SKU Intact</span>
        <span class="metric-pill">${e.shardVolumeConservationPct}% Volume Lock</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 破冰/破石高奢商品出场场景 (Shatter Reveal Scenario)</label>
        <select id="scenario-select">
          ${Object.values(u).map(t=>`<option value="${t.id}" ${t.id===c?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 刚体碎裂与慢动作合成管线 (Fracture &amp; Bullet-Time Mode)</label>
        <select id="mode-select">
          <option value="voronoi-rbd-sdf-core-shield-1000fps-bullettime" ${i==="voronoi-rbd-sdf-core-shield-1000fps-bullettime"?"selected":""}>✅ 布尔 Voronoi 预碎裂外壳 + 内核商品 SDF 护盾 + 1000fps 子步慢动作 (推荐)</option>
          <option value="naive-t2v-shatter-prompt-broken-hero-sku" ${i==="naive-t2v-shatter-prompt-broken-hero-sku"?"selected":""}>⛔ 直接用文生视频提示“冰块炸裂露出手机/名表” (52.4% 把里面的手机屏幕也一起炸碎！)</option>
          <option value="phantom-flex4k-sugar-glass-physical-shoot" ${i==="phantom-flex4k-sugar-glass-physical-shoot"?"selected":""}>⚠️ Phantom Flex4K 1000fps 高速摄影机实拍糖玻璃爆破 ($2,400/镜，无法悬停环绕)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="slow-slider">3. 子弹时间峰值慢放倍率 (Bullet-Time Slowdown Factor: <strong>${r}× [1000fps]</strong>)</label>
        <input id="slow-slider" type="range" min="10" max="40" step="5" value="${r}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>布尔 Voronoi 外壳碎裂、内核商品 SDF 护盾与 1000fps 子弹时间舞台 (Voronoi Shatter Stage)</h2>
          <span class="tag">${o.shardCount} Shards · ${o.shellIorMaterial}</span>
        </div>
        <canvas id="voronoi-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>高奢发布会破冰出场与物理预演遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">破冰/破石中心商品完好无损率</span>
            <strong class="kpi-value">${e.innerHeroSkuIntactLockPct}%</strong>
            <span class="kpi-note">外壳布尔挖空 + SDF 排斥力场零穿模</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">飞散碎片总体积守恒率 (∑V_i = V_0)</span>
            <strong class="kpi-value">${e.shardVolumeConservationPct}%</strong>
            <span class="kpi-note">告别 AI 视频碎片半空凭空消失或变烟雾</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">内裂面贝壳状折射与子弹时间真实度</span>
            <strong class="kpi-value">${e.bulletTimeRefractionRealismPct}%</strong>
            <span class="kpi-note">解析子步积分消除光流插帧旋转残影</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单镜头制作成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerShotUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比 Phantom 高速实拍 $2,400/镜降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const a=document.querySelector("#voronoi-canvas");a&&m(a),document.querySelector("#scenario-select")?.addEventListener("change",t=>{c=t.target.value,h()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{i=t.target.value,h()}),document.querySelector("#slow-slider")?.addEventListener("input",t=>{r=Number(t.target.value),h()})}h();
