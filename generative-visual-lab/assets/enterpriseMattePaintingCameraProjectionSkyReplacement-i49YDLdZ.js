import"./modulepreload-polyfill-B5Qt9EMX.js";const g={"corporate-hq-campus-set-extension":{id:"corporate-hq-campus-set-extension",title:"Keynote & Brand Film Set Extension: 1-Story Rooftop Extended to 4-Plane Glass Campus",titleZh:"品牌大片实景扩建（Set Extension）：单层天台扩建为 4层景深科技园区与玻璃幕墙反光联动",planeDistancesLabel:"Z1=8m Set | Z2=85m Tower | Z3=900m Skyline | Z4=∞ Sky",reflectiveSurfaceLabel:"Curtain-Wall Glass Facade (Fresnel R=0.38)",maxCameraParallaxDeg:22},"automotive-golden-hour-sky-puddle":{id:"automotive-golden-hour-sky-puddle",title:"Automotive Commercial Sky & Horizon Replacement: Overcast -> Golden Sunset + Wet Asphalt Reflection",titleZh:"汽车 TVC 天空与天际线置换：阴天灰底换晚霞落日 + 车窗及积水路面倒影自动重投射",planeDistancesLabel:"Z1=6m Car | Z2=60m Bridge | Z3=1.4km Peaks | Z4=∞ Sunset",reflectiveSurfaceLabel:"Car Windshield + Wet Asphalt Puddle Normals",maxCameraParallaxDeg:28},"historical-drama-street-rooftop-dmp":{id:"historical-drama-street-rooftop-dmp",title:"Film & Short-Drama Period Street Extension: 15m Physical Set + 4-Layer 2.5D Matte Projection",titleZh:"影视与短剧古装/年代街景延伸：15米实景搭景 + 4层 2.5D 数字绘景相机投射（Nuke/Blender）",planeDistancesLabel:"Z1=12m Street | Z2=95m Pagoda | Z3=800m Hills | Z4=∞ Clouds",reflectiveSurfaceLabel:"Rain-Soaked Flagstone & River Canal",maxCameraParallaxDeg:18}};function S(s,e,l){const t=Math.max(0,(l-18)*.04);return e==="four-plane-rgba-48px-inpaint-fresnel-reflect"?{scenarioId:s,projectionMode:e,parallaxRealismPct:Number(Math.max(96,99.5-t).toFixed(1)),disocclusionEdgeStretchPct:0,reflectionHarmonyDeltaE:.36,costPerShotUsd:.028,annualSavingsUsdM:2.44,verdict:"Act automatically"}:e==="single-continuous-depth-mesh-rubber-stretch"?{scenarioId:s,projectionMode:e,parallaxRealismPct:86.4,disocclusionEdgeStretchPct:Number((24.6+l*.35).toFixed(1)),reflectionHarmonyDeltaE:4.82,costPerShotUsd:.022,annualSavingsUsdM:.72,verdict:"Confirm"}:{scenarioId:s,projectionMode:e,parallaxRealismPct:55.8,disocclusionEdgeStretchPct:0,reflectionHarmonyDeltaE:7.95,costPerShotUsd:.015,annualSavingsUsdM:.18,verdict:"Send to a human"}}const b=document.querySelector("#app");if(!b)throw new Error("Missing #app root");let o="corporate-hq-campus-set-extension",n="four-plane-rgba-48px-inpaint-fresnel-reflect",r=18;function y(s){const e=s.getContext("2d");if(!e)return;const l=s.width,t=s.height;e.clearRect(0,0,l,t);const v=g[o],i=S(o,n,r),d=n==="single-continuous-depth-mesh-rubber-stretch",h=n==="flat-2d-corner-pin-homography-paste",p=e.createLinearGradient(0,0,0,t);p.addColorStop(0,"#1e1b4b"),p.addColorStop(.55,"#311042"),p.addColorStop(1,"#090d16"),e.fillStyle=p,e.fillRect(0,0,l,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,l-32,46),e.strokeStyle=n==="four-plane-rgba-48px-inpaint-fresnel-reflect"?"#10b981":"#ef4444",e.strokeRect(16,14,l-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`248th Workbench · 4-Plane RGBA Camera Projection (${v.planeDistancesLabel}) · Dolly=${r}°`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`1/Z Parallax Realism: ${i.parallaxRealismPct}% | Edge Rubber Stretch: ${i.disocclusionEdgeStretchPct}% | Glass/Puddle Reflection ΔE: ${i.reflectionHarmonyDeltaE}`,28,51),[{name:"Plane Z4 (∞ Sky Dome)",zFactor:.08,y:80,h:72,w:640,color:"#f59e0b"},{name:"Plane Z3 (900m Distant Skyline + 48px Back-Inpaint)",zFactor:.35,y:142,h:78,w:540,color:"#a855f7"},{name:"Plane Z2 (85m Midground Campus Tower + Glass Fresnel)",zFactor:.85,y:208,h:86,w:430,color:"#38bdf8"},{name:"Plane Z1 (8m Physical Foreground Set + Wet Reflection)",zFactor:1.65,y:282,h:88,w:340,color:"#10b981"}].forEach((a,u)=>{const m=h?0:Math.round((r-15)*a.zFactor*2.6),c=Math.round((l-a.w)/2+m);e.save(),e.fillStyle="rgba(15, 23, 42, 0.86)",e.strokeStyle=d&&u===2?"#ef4444":a.color,e.lineWidth=2,e.beginPath(),e.roundRect(c,a.y,a.w,a.h,10),e.fill(),e.stroke(),(u===1||u===2)&&(e.fillStyle=d?"rgba(239, 68, 68, 0.42)":"rgba(16, 185, 129, 0.26)",e.fillRect(c+a.w-54,a.y+4,50,a.h-8),e.fillStyle="#ffffff",e.font="bold 9px JetBrains Mono, monospace",e.fillText(d?"TEAR!":"+48px",c+a.w-46,a.y+a.h/2+3)),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(a.name,c+16,a.y+26),e.fillStyle=h?"#fca5a5":"#94a3b8",e.font="11px JetBrains Mono, monospace",e.fillText(h?"⛔ Locked to 0px Parallax Shift (Flat Cardboard Look)":d&&u===2?`⛔ ${i.disocclusionEdgeStretchPct}% Rubber-Sheet Edge Stretching!`:`✓ 1/Z Parallax Shift: ${m>=0?"+":""}${m}px | Reflection ΔE ${i.reflectionHarmonyDeltaE}`,c+16,a.y+52),e.restore()})}function f(){const s=g[o],e=S(o,n,r);b.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">248th Interactive Architecture Workbench · Domain 4 (2.5D Matte Painting & Sky Replacement)</span>
        <h1>影视与商业实景数字绘景扩建（2.5D Matte Painting）、相机投射与天际线倒影联动工作台</h1>
        <p class="subtitle">4层 Z-Depth RGBA 分层卡 + 遮挡边缘后方 48px 预扩图 (0.0% 橡皮膜拉伸) + 玻璃幕墙/积水路面 Fresnel 倒影重投射 vs 单层深度网格边缘拉丝</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.parallaxRealismPct}% 1/Z Parallax</span>
        <span class="metric-pill">${e.disocclusionEdgeStretchPct}% Edge Stretch</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 实景扩建与换天场景 (DMP Set Extension Scenario)</label>
        <select id="scenario-select">
          ${Object.values(g).map(t=>`<option value="${t.id}" ${t.id===o?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 相机投射与视差架构 (Camera Projection Architecture)</label>
        <select id="mode-select">
          <option value="four-plane-rgba-48px-inpaint-fresnel-reflect" ${n==="four-plane-rgba-48px-inpaint-fresnel-reflect"?"selected":""}>✅ 4层 RGBA 景深卡 + 边缘后 48px 预内绘 + 玻璃/积水倒影联动 (推荐)</option>
          <option value="single-continuous-depth-mesh-rubber-stretch" ${n==="single-continuous-depth-mesh-rubber-stretch"?"selected":""}>⚠️ 单张连续深度网格投射 (Depth-to-Mesh：镜头横移时建筑边缘 31% 橡皮膜拉丝)</option>
          <option value="flat-2d-corner-pin-homography-paste" ${n==="flat-2d-corner-pin-homography-paste"?"selected":""}>⛔ 传统 2D 四角跟踪平贴换天 (中景大楼与远山零 1/Z 视差 & 玻璃反光仍是旧阴天)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="dolly-slider">3. 摄影机横向移动视差角 (Camera Dolly Parallax: <strong>${r}°</strong>)</label>
        <input id="dolly-slider" type="range" min="6" max="30" step="2" value="${r}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>4 层景深投射卡（Z1..Z4）1/Z 视差位移与 48px 遮挡补洞画布 (Multi-Plane Camera Projection)</h2>
          <span class="tag">${s.reflectiveSurfaceLabel}</span>
        </div>
        <canvas id="matte-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>数字绘景视差与反射和谐度遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">多平面 1/Z 运动视差真实感</span>
            <strong class="kpi-value">${e.parallaxRealismPct}%</strong>
            <span class="kpi-note">近中远四层按真实物理深度独立位移</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">遮挡揭露区像素拉丝率 (Edge Stretch)</span>
            <strong class="kpi-value">${e.disocclusionEdgeStretchPct}%</strong>
            <span class="kpi-note">建筑背后预扩 48px 背景 vs 单网格橡皮拉伸</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">幕墙/车窗/水洼倒影色差 (Reflect ΔE)</span>
            <strong class="kpi-value">ΔE ${e.reflectionHarmonyDeltaE}</strong>
            <span class="kpi-note">新天空同步重投射至 SAM-2 玻璃与积水掩码</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单镜头扩景成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerShotUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">一键导出 Nuke (.nk) 与 Blender 四层投射卡工程</span>
          </div>
        </div>
      </aside>
    </main>
  `;const l=document.querySelector("#matte-canvas");l&&y(l),document.querySelector("#scenario-select")?.addEventListener("change",t=>{o=t.target.value,f()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{n=t.target.value,f()}),document.querySelector("#dolly-slider")?.addEventListener("input",t=>{r=Number(t.target.value),f()})}f();
