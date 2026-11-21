import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"keynote-hq-atrium":{id:"keynote-hq-atrium",titleZh:"企业年度科技峰会 CEO 虚拟演讲厅（真实总部大楼中庭 3DGS 采集 + 地面隐形阴影网格）",titleEn:"Enterprise Keynote CEO Virtual Stage (Corporate HQ Atrium 3DGS + Shadow-Catcher Mesh)",subtitleZh:"对比“纯 2D 绿幕贴死背景视频（摇臂运镜时背景无视差滑动穿帮）或 Unreal 人工建模 3 周（$48,000/场）”与“45分钟无人机/单反采集 + gsplat 3DGS 重建 + 隐形地面 Shadow-Catcher 网格（1.2小时交付，$420/场）”",subtitleEn:"Compares 2D Green-Screen Plate (zero parallax on crane shots) or 3-Week Manual Unreal Modeling ($48,000/scene) vs. 45-Min Capture + gsplat 3DGS + Invisible Shadow-Catcher Mesh (1.2h, $420/scene)",scenesPerYear:40,controlledStack:"45-Min Multi-View Capture + GLOMAP/gsplat 3DGS + UE5 Shadow-Catcher Proxy + 360° HDRI ($420/scene)",naiveStack:"Manual Full-CG Unreal 3D Modeling ($48,000 · 336 Hrs) or 2D Green-Screen Plate (Zero Parallax)",controlledParallaxAccuracyPct:99.4,naiveParallaxAccuracyPct:42,controlledProductionHours:1.2,naiveProductionHours:336,controlledCostPerSceneUsd:420,naiveCostPerSceneUsd:48e3,controlledRealtimeFps:120,naiveRealtimeFps:45,controlledAnnualSavingsM:1.9,decisionSummaryZh:"企业举办线上新品发布会（如 Apple Park 风格高管跨场景转场演讲）时，如果用传统 2D 绿幕背景视频，摄影机只要一上摇臂推拉，人物背后的建筑立柱没有近大远小的三维视差（Parallax），一眼假；如果请 3D 美术外包在 Unreal Engine 里手工把真实园区大楼一砖一瓦建模贴材质，单个场景就要 3 周时间、耗资 $48,000！通过 **“3D Gaussian Splatting (3DGS) 实景背景 + 前景隐形粗模阴影接收器（Shadow-Catcher Mesh）+ 360° HDRI 球谐光照同步”** 混合架构：用单反/无人机环绕实景拍摄 45 分钟，经 `GLOMAP + gsplat` 在 25 分钟内训练出毫发毕现的 3DGS 实景场（玻璃幕墙反光、绿植树叶 100% 照片级还原），再仅对脚下 4×4 米地板铺设一层隐形多边形网格承接演讲者脚底接触阴影——造景周期从 336 小时压缩至 **1.2 小时（快 280 倍）**，单场成本从 $48,000 暴降至 **$420（降幅 -99.1%）**！",decisionSummaryEn:"For Apple-style executive keynote videos, 2D green-screen background plates fail on crane/dolly shots due to zero 3D parallax (42% realism), while manually modeling a real corporate campus in Unreal Engine 5 takes 336 hours and $48,000/scene. Capturing the real atrium in 45 minutes, training a `GLOMAP + gsplat` 3D Gaussian Splatting scene in 25 minutes, placing an invisible polygon **Shadow-Catcher Plane** under the speaker feet, and lighting the foreground with a matched `360° HDRI Dome` delivers 99.4% 6-DoF parallax in **1.2 hours at $420/scene (-99.1% cost)**.",stages:[{stage:"1. Rapid Real-World Scene Capture",controlledEngine:"45-Min Mirrorless/Drone Video + 360° Chrome Ball HDRI Probe",naiveBehavior:"3 Weeks of Manual Maya/Blender Polygonal Modeling & UV Unwrap",metricImpact:"1.2h vs 336.0h Turnaround (280x)"},{stage:"2. Pose & 3DGS Reconstruction",controlledEngine:"GLOMAP Global SfM + gsplat SH-Degree-3 Training (25 Mins)",naiveBehavior:"Manual PBR Shader Authoring Struggling with Foliage & Glass",metricImpact:"100% Photorealistic Foliage/Reflections"},{stage:"3. Hybrid Mesh Shadow Catcher",controlledEngine:"Invisible LiDAR/DUSt3R Floor Mesh Catches Ray-Traced Foot Shadows",naiveBehavior:"Pure 3DGS Cannot Receive Dynamic Cast Shadows from Actor",metricImpact:"99.4% Grounding & Parallax Lock"},{stage:"4. 120fps Frustum Rasterization",controlledEngine:"UE5 Luma/3DGS Tile Rasterizer Synced to Camera Tracking (120fps)",naiveBehavior:"Heavy Path-Traced Polygon Scene Dropping Below 45fps on LED Wall",metricImpact:"$420 vs $48,000/Scene (+$1.90M/Yr)"}]},"automotive-city-street":{id:"automotive-city-street",titleZh:"汽车棚拍虚拟制片（LED 环幕 / 后期合成）：3DGS 城市街道背景 + 车身 PBR 光线追踪车漆反射",titleEn:"Automotive Virtual Production: 3DGS City Street Background + Ray-Traced Car Paint Reflection",subtitleZh:"解决“3DGS 背景很逼真但无法直接对前景 3D 跑车金属车漆产生精确镜面反射”的痛点：采用“远景 3DGS 120fps 视差渲染 + 球面高斯烘出动态 CubeMap 驱动前景跑车光线追踪车漆”",subtitleEn:"Bridges 3DGS backgrounds with ray-traced car paint: 3DGS 120fps Parallax Background + Real-Time Spherical-Harmonic CubeMap Probe Driving Foreground UE5 Car Ray-Tracing",scenesPerYear:60,controlledStack:"3DGS Street Plate + Real-Time SH CubeMap Reflection Probe + Foreground Ray-Traced Car ($580/scene)",naiveStack:"Full-City Manual 3D Polygon Modeling ($65,000/scene) or Flat 2D Driving Plate (Wrong Parallax)",controlledParallaxAccuracyPct:99.2,naiveParallaxAccuracyPct:48.5,controlledProductionHours:1.8,naiveProductionHours:420,controlledCostPerSceneUsd:580,naiveCostPerSceneUsd:65e3,controlledRealtimeFps:90,naiveRealtimeFps:36,controlledAnnualSavingsM:3.86,decisionSummaryZh:"汽车广告虚拟制片的核心难点在于 **“背景街道要 100% 真实且具备三维视差，同时前景跑车的高亮清漆（Clearcoat）必须精确反射出街道两旁的霓虹灯与树影流动”**。纯 3DGS 是光栅化泼溅，不直接参与传统多边形光线追踪反射。我们的混合管线以跑车車身中心为原点，每帧从周围 3DGS 场景中以 `0.8ms` 极速渲染一张 `512×512` 动态六面体环境反射贴图（Dynamic Reflection CubeMap），直接喂给前景跑车的多边形 PBR 清漆材质，并在车轮下方垫一层带法线贴图的柏油路多边形窄带承接车底暗影与积水倒影——单条街道资产成本从 $65,000 降至 $580，年省 +$3.86M！",decisionSummaryEn:"Automotive commercials require both 6-DoF street parallax and moving neon/tree reflections across the car clearcoat paint. Because rasterized 3DGS does not natively bounce hardware ray-traced rays onto polygon meshes, our hybrid pipeline renders a `0.8ms` dynamic **3DGS Reflection CubeMap Probe** at the vehicle centroid to drive the foreground car ray-traced clearcoat while placing a textured polygon road ribbon underneath the tires ($580 vs. $65,000/scene).",stages:[{stage:"1. Multi-Camera Rig Street Scan",controlledEngine:"Roof-Mounted 6-Cam Array Captures 2km Street in 15 Minutes",naiveBehavior:"2.5 Months of Manual City Block 3D Asset Modeling",metricImpact:"1.8h vs 420.0h Asset Creation"},{stage:"2. Dynamic CubeMap Bridge",controlledEngine:"0.8ms 3DGS-to-CubeMap Probe Feeds Car Clearcoat Specular",naiveBehavior:"Static Studio HDRI Unmatched to Passing Street Neon",metricImpact:"99.2% Car Paint Reflection Match"},{stage:"3. Hybrid Road Contact Ribbon",controlledEngine:"4m-Wide Polygon Asphalt Strip Under Tires for Puddle & AO",naiveBehavior:"Car Tires Float Slightly Over Fuzzy Gaussian Ground Splats",metricImpact:"Razor-Sharp Tire Contact & Skid Marks"},{stage:"4. Relighting & Time-of-Day Shift",controlledEngine:"Intrinsic Albedo/SH Separation + AI Sky Replacement",naiveBehavior:"Locked to Single Weather Condition",metricImpact:"$580 vs $65,000/Scene (+$3.86M/Yr)"}]},"industrial-factory-twin":{id:"industrial-factory-twin",titleZh:"智能制造工厂与数据中心 CTO 汇报漫游沙盘（3DGS 全景底图 + 关键机柜 CAD GLB 交互热区）",titleEn:"Smart Factory & Datacenter Executive Digital Twin (3DGS Context Shell + Interactive CAD GLB Hotspots)",subtitleZh:"对比“把整座工厂上万根管道螺丝全部人工转成 CAD 网格（耗资 $85k 且网页端卡死）”与“3DGS 极速重建全厂照片级外壳 + 仅对 20 台核心设备挂载轻量可点击 GLB 网格”",subtitleEn:"Compares Full-Factory Manual CAD-to-Mesh Conversion ($85k, crashes WebGL) vs. 3DGS Photoreal Context Shell + 20 Interactive Low-Poly GLB Equipment Twins",scenesPerYear:25,controlledStack:"WebGPU SOGS 3DGS Factory Shell (14MB) + 20 Interactive Draco GLB Machine Twins ($650/site)",naiveStack:"Full-Plant Manual BIM/CAD Polygon Retopology & PBR Texturing ($85,000/site · 480 Hrs)",controlledParallaxAccuracyPct:99.6,naiveParallaxAccuracyPct:64,controlledProductionHours:2.5,naiveProductionHours:480,controlledCostPerSceneUsd:650,naiveCostPerSceneUsd:85e3,controlledRealtimeFps:90,naiveRealtimeFps:22,controlledAnnualSavingsM:2.11,decisionSummaryZh:"很多工业与数据中心“数字孪生”项目之所以烂尾，是因为外包团队试图把整座工厂里成千上万根消防管道、桥架、水泥柱全部用人工建模成多边形网格——不仅耗资 $85,000、耗时两个月，而且做出来的假贴图一看就像十年前的廉价游戏，塞进浏览器还只有 22fps！架构师应当采用 **“外壳 3DGS 照片级重建 + 核心设备 GLB 语义挂载”** 的二八法则：95% 不需要单独拆解点击的厂房背景、管廊与光照直接用激光雷达/全景相机花 2.5 小时生成 `14 MB` 的 `WebGPU SOGS 3DGS` 实景底图；仅对需要点击查看遥测数据或做开盖动画的 20 台核心机柜/机械臂挂载精确 `Draco GLB` 模型，成本直降 -99.2% 且画面逼真度拉满！",decisionSummaryEn:"Industrial digital twin projects fail when teams spend $85,000 and 480 hours manually modeling every ceiling pipe and cable tray into polygon meshes that still look artificial and run at 22fps. Apply the **80/20 Hybrid Twin Rule**: capture the surrounding 95% factory shell as a photorealistic `14 MB` `WebGPU SOGS 3DGS` background in 2.5 hours, and mount interactive `Draco GLB` meshes strictly on the 20 key machines that require clickable telemetry or articulated animation ($650 vs. $85,000/site).",stages:[{stage:"1. 80/20 Context vs. Hero Split",controlledEngine:"95% Factory Shell via 3DGS + 5% Key Machines via Interactive GLB",naiveBehavior:"Manually Modeling 10,000 Non-Interactive Ceiling Pipes",metricImpact:"2.5h vs 480.0h Delivery (-99.5% Time)"},{stage:"2. Coordinate Frame Registration",controlledEngine:"AprilTag / LiDAR Control Points Align 3DGS to CAD Millimeter Grid",naiveBehavior:"Floating Uncalibrated Point Cloud",metricImpact:"Sub-Centimeter CAD Overlay Alignment"},{stage:"3. Shared Depth Buffer Occlusion",controlledEngine:"3DGS Writes Median Depth to Z-Buffer -> Proper GLB Machine Occlusion",naiveBehavior:"2D Billboards Rendering on Top of Foreground Pillars",metricImpact:"99.6% Depth & Parallax Accuracy"},{stage:"4. WebGPU SOGS Streaming",controlledEngine:"14 MB Morton-Sorted WebP Gaussian Atlas at 90fps in Browser",naiveBehavior:"1.2 GB Raw BIM Export Crashing Browser Tab",metricImpact:"$650 vs $85,000/Site (+$2.11M/Yr)"}]}};function d(o,a="controlled"){const e=c[o],n=a==="controlled",t=Number((e.naiveProductionHours/e.controlledProductionHours).toFixed(0)),i=Number(((e.naiveCostPerSceneUsd-e.controlledCostPerSceneUsd)/e.naiveCostPerSceneUsd*100).toFixed(1));return{scenario:e,mode:a,activeParallaxAccuracyPct:n?e.controlledParallaxAccuracyPct:e.naiveParallaxAccuracyPct,activeProductionHours:n?e.controlledProductionHours:e.naiveProductionHours,activeCostPerSceneUsd:n?e.controlledCostPerSceneUsd:e.naiveCostPerSceneUsd,activeRealtimeFps:n?e.controlledRealtimeFps:e.naiveRealtimeFps,timeSpeedupFactor:t,costReductionPct:i,annualSavingsM:e.controlledAnnualSavingsM}}let r="keynote-hq-atrium",l="controlled";function s(){const o=document.querySelector("#app");if(!o)return;const a=d(r,l),e=a.scenario,n=l==="controlled";o.innerHTML=`
    <main class="workbench-shell" data-mode="${l}" data-scene="${r}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">213TH WORKBENCH · DOMAIN 4 · VIRTUAL PRODUCTION & DIGITAL TWIN BACKGROUND PLATE SELECTION STUDIO</span>
          <h1>企业发布会、汽车广告与数字孪生实景背景选型工作台：3DGS 实景重建 + 隐形阴影网格 vs Unreal 人工建模 vs 2D 绿幕</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="VP Scene Scenario">
            ${Object.keys(c).map(t=>`
              <button class="seg-btn ${r===t?"active":""}" data-scene-btn="${t}">
                ${t==="keynote-hq-atrium"?"1. 企业峰会 CEO 实景中庭 (3DGS + 地面阴影网 $420)":t==="automotive-city-street"?"2. 汽车广告街景 (3DGS + 动态 CubeMap 车漆反射)":"3. 工厂/机房数字孪生 (3DGS 外壳 + 20台交互 GLB)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Architecture Mode">
            <button class="seg-btn ${n?"active":""}" data-mode-btn="controlled">
              ✅ 3DGS 实景场 + 局部 Mesh 阴影/反射桥接 (${e.controlledProductionHours}h · $${e.controlledCostPerSceneUsd}/场)
            </button>
            <button class="seg-btn ${n?"":"active"}" data-mode-btn="naive">
              ⛔ 传统全量手工建模 / 2D 绿幕贴片 (${e.naiveProductionHours}h · $${e.naiveCostPerSceneUsd.toLocaleString()}/场)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">6-DoF 摇臂运镜三维视差准度 (Parallax Lock)</span>
          <strong class="kpi-val ${n?"good":"warn"}">${a.activeParallaxAccuracyPct}%</strong>
          <span class="kpi-note">真实三维体积光场 vs 2D 绿幕无视差平面贴纸</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单场景资产制作周期 (Scene Turnaround)</span>
          <strong class="kpi-val ${n?"good":"warn"}">${a.activeProductionHours} hrs</strong>
          <span class="kpi-note">提速 ${a.timeSpeedupFactor}x · 45分钟实拍 + 25分钟 gsplat 训练</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单场景建造成本与降幅 (Cost / Scene)</span>
          <strong class="kpi-val ${n?"good":"warn"}">$${a.activeCostPerSceneUsd.toLocaleString()}</strong>
          <span class="kpi-note">降本 -${a.costReductionPct}% · 年省 +$${a.annualSavingsM.toFixed(2)}M</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">LED 环幕 / 网页实时渲染帧率 (Real-Time FPS)</span>
          <strong class="kpi-val good">${a.activeRealtimeFps} fps</strong>
          <span class="kpi-note">支持前景脚底接触阴影与跑车动态清漆反射</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 2D 绿幕视频 vs 全手工 Unreal 建模 vs “3DGS 实景底图 + 局部多边形代理”混合架构对比</h2>
            <span class="badge">${n?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="3DGS vs Unreal Mesh vs 2D Green Screen Comparison">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="125" rx="10" fill="#1f121c" stroke="#ef4444" stroke-width="1.5" />
              <text x="14" y="24" fill="#fca5a5" font-size="11.5" font-weight="700">1. 2D 绿幕背景视频 ($800)</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">0% 运镜三维视差</text>
              <text x="14" y="70" fill="#fecaca" font-size="10.5">• 相机一旦推拉摇移，背景像扁平墙纸</text>
              <text x="14" y="90" fill="#fecaca" font-size="10.5">• 前景与背景透视焦段无法动态联动</text>
              <text x="14" y="110" fill="#f87171" font-size="10.5" font-weight="700">• 仅适合固定三脚架死机位口播</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="125" rx="10" fill="#111c33" stroke="#f59e0b" stroke-width="1.5" />
              <text x="14" y="24" fill="#fcd34d" font-size="11.5" font-weight="700">2. 全手工 UE5 三维建模 ($48k)</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">耗时 3–5 周 / 场景</text>
              <text x="14" y="70" fill="#cbd5e1" font-size="10.5">• 支持完整物理碰撞与全局光线追踪</text>
              <text x="14" y="90" fill="#cbd5e1" font-size="10.5">• 复杂绿植/真实总部大楼还原成本极高</text>
              <text x="14" y="110" fill="#fbbf24" font-size="10.5" font-weight="700">• 仅适合科幻/不存在的纯虚构世界</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="125" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">3. 3DGS + 局部 Mesh 混合 ($420)</text>
              <text x="14" y="48" fill="#f8fafc" font-size="17" font-weight="800">1.2 小时照片级交付</text>
              <text x="14" y="70" fill="#a7f3d0" font-size="10.5">• 95% 远景与建筑走 3DGS (120fps 视差)</text>
              <text x="14" y="90" fill="#a7f3d0" font-size="10.5">• 脚下隐形 Mesh 接阴影 + 动态 CubeMap</text>
              <text x="14" y="110" fill="#34d399" font-size="10.5" font-weight="700">• 降本 -99.1%，实景还原度 100%</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">如何补齐纯 3DGS “不接阴影、不反光、不能点击”的三大工程短板？(Hybrid 3DGS-Mesh Bridge)</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">1. 解决脚底悬空 (Shadow Catcher): 提取地面/桌面稀疏点云拟合成隐形多边形平面，专司接收前景真人/跑车的光追接触阴影</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">2. 解决车漆反射 (SH CubeMap Probe): 在前景跑车中心实时将周围 3DGS 渲染为 0.8ms 动态六面体贴图，驱动跑车 PBR 镜面反射</text>
              <text x="18" y="100" fill="#34d399" font-size="11.5" font-weight="700">3. 解决设备交互 (80/20 Digital Twin): 厂房背景用 14MB 3DGS，仅对需点击开盖的 20 台核心机柜挂载 Draco GLB 网格并共享 Z-Buffer</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段 3DGS + 多边形代理混合虚拟制片拆解</h2>
            <span class="badge">280x Faster Capture</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 3DGS+Mesh 混合：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 手工建模/2D贴片：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,o.querySelectorAll("[data-scene-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.sceneBtn;i&&(r=i,s())})}),o.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(l=i,s())})})}s();
