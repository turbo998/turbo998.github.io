import"./modulepreload-polyfill-B5Qt9EMX.js";const s={"game-npc-locomotion-emote":{id:"game-npc-locomotion-emote",titleZh:"游戏开放世界 NPC 动作与社交舞蹈动画生产（GVHMR 世界坐标 + 双骨 IK 脚底防滑步锁）",titleEn:"Open-World Game NPC & Emote Animation Pipeline (GVHMR World-Coordinate + Two-Bone IK Foot Lock)",subtitleZh:"对比“早期相机系单目动捕 HMR2.0（角色在地面太空步打滑 42.5mm/帧、移动镜头时人物飞上天）或商用 AI 动捕 API ($0.45/条)”与“GVHMR 重力世界系解算 + 零速触地分类器 + 双骨脚踝 IK 钉死（滑步仅 1.2mm，$0.015/条）”",subtitleEn:"Compares Camera-Space HMR2.0 (42.5mm/frame moonwalking foot slip, floats when camera pans) or Commercial Mocap API ($0.45/clip) vs. Gravity-View GVHMR + Foot-Contact IK Pinning (1.2mm slip, $0.015/clip)",monthlyClips:2e4,controlledStack:"GVHMR World-Grounded SMPL-X + Foot-Contact Classifier + Analytical Two-Bone IK + UE5 Retarget ($0.015/clip)",naiveStack:"Camera-Space HMR2.0 (42.5mm Foot Skating) or Commercial AI Mocap SaaS (Move.ai / DeepMotion $0.45/clip)",controlledFootSkateMm:1.2,naiveFootSkateMm:42.5,controlledJointAccuracyPct:99.1,naiveJointAccuracyPct:68,controlledCostPerClipUsd:.015,naiveCostPerClipUsd:.45,controlledTurnaroundSec:8.5,naiveTurnaroundSec:95,controlledAnnualSavingsM:1.04,decisionSummaryZh:"为什么早期单目视频转 3D 动作模型（如 HMR2.0 / 4DHumans）导出的 FBX 放进 Unreal Engine 5 后，角色走路就像在冰面上滑旱冰（俗称“太空步滑步 Foot Skating”，每帧脚底滑动高达 42.5mm），且一旦拍摄手机稍微往上抬一点，3D 角色就斜着飞到了半空中？因为早期模型是在**相机局部坐标系（Camera Coordinate）**下预测人体根骨骼（Pelvis）位置，把摄影机的移动当成了人的飞行！必须升级为 **“GVHMR（Gravity-View 重力对齐世界坐标系 SMPL-X）+ 脚底零速触地分类器 + 解析式双骨反向动力学（Two-Bone IK）钉死”**：先用 `DPVO` 视觉里程计剥离相机运动，再用神经网络判定左/右脚跟与脚尖的触地帧区间，在触地期间将脚踝世界坐标强行钉死在 $Z=0$ 地面上反解膝盖与髋部旋转角——滑步误差从 42.5mm 压至 **1.2mm**，单条 FBX 成本仅 **$0.015**！",decisionSummaryEn:'Legacy monocular pose models (`HMR2.0 / 4DHumans`) operate in camera space—confusing camera panning with human flight and producing severe **42.5mm/frame "moonwalking" foot skating** in Unreal Engine 5. Deploying **`GVHMR` (Gravity-View World-Coordinate SMPL-X backed by `DPVO` visual odometry)** followed by a **Zero-Velocity Foot-Contact Classifier** and **Analytical Two-Bone Leg IK Pinning** locks planted feet to the $Z=0$ floor (`1.2mm` slip) and exports retargeted UE5 Mannequin `.fbx` clips in `8.5s` at `$0.015/clip`.',stages:[{stage:"1. Camera Odometry Decoupling",controlledEngine:"DPVO Visual Odometry + GVHMR Gravity-Aligned World Coordinate Frame",naiveBehavior:"Camera-Space Root Prediction (Character Flies When Camera Tilts)",metricImpact:"100% True Ground-Plane Gravity Lock"},{stage:"2. Foot-Contact Phase Detection",controlledEngine:"Heel/Toe Contact Probability Net + Zero-Velocity Clamping",naiveBehavior:"Unconstrained Forward Kinematics Sliding Across Floor (42.5mm)",metricImpact:"1.2mm vs 42.5mm Foot Skating"},{stage:"3. Analytical Two-Bone Leg IK",controlledEngine:"Pins Planted Foot World XYZ -> Solves Knee/Hip Quaternion Analytically",naiveBehavior:"Feet Penetrate Floor or Hover 8cm Above Ground",metricImpact:"0.0mm Floor Penetration"},{stage:"4. UE5 / Unity Bone Retargeting",controlledEngine:"Proportion-Aware Retarget + Self-Penetration Capsule Repulsion",naiveBehavior:"Hands Pass Through Hips When Applied to Stylized Characters",metricImpact:"$0.015 vs $0.45/Clip (+$1.04M/Yr)"}]},"vtuber-dance-finger-capture":{id:"vtuber-dance-finger-capture",titleZh:"虚拟偶像（VTuber）与宅舞 MV 全身+灵巧手势+表情同步采集（SMPL-X + HaMeR 21关节手部 + ARKit 表情）",titleEn:"VTuber & Dance MV Full-Body + Dexterous Finger + Facial Capture (GVHMR + HaMeR + EMOCA)",subtitleZh:"解决普通全身动捕“手掌像僵尸木铲一样僵硬握拳、丢失比心/弹吉他指法与眨眼口型”痛点：采用“GVHMR 全身 + HaMeR 高分裁剪手部 3D 网格 + MediaPipe/EMOCA 52维面部 Blendshapes 三流融合”",subtitleEn:'Eliminates stiff "zombie mittens" hands in full-body mocap: fuses GVHMR Body + HaMeR High-Res 3D Hand MANO + 52 ARKit Facial Blendshapes into 1 Unified FBX',monthlyClips:12e3,controlledStack:"GVHMR Body + HaMeR 3D Hand MANO + 52 ARKit Face Blendshapes -> VRM/FBX ($0.022/clip)",naiveStack:"Body-Only 24-Joint SMPL Estimation (Rigid Mittens Hands & Blank Face) ($0.55/clip)",controlledFootSkateMm:1.4,naiveFootSkateMm:38,controlledJointAccuracyPct:99.3,naiveJointAccuracyPct:61.5,controlledCostPerClipUsd:.022,naiveCostPerClipUsd:.55,controlledTurnaroundSec:11.2,naiveTurnaroundSec:120,controlledAnnualSavingsM:.76,decisionSummaryZh:"在虚拟偶像舞蹈、手语主播与音乐演奏短视频中，如果只跑全身 24 关节模型，角色手腕以下没有独立指骨驱动，双手就像戴了连指棉手套（僵尸木铲手），根本做不出“比心、剪刀手、弹钢琴”等细腻动作！因为全身画面里手掌只占不到 `64×64` 像素。必须采用 **“三流分治融合（Body + Hand + Face Fusion）”**：主干跑 `GVHMR` 提取全身大关节；同时根据手腕坐标裁剪左右手 `256×256` 高清局部框送入专用 3D 手部重建大模型 **`HaMeR`（恢复 MANO 15 个指骨旋转四元数）**，并裁剪面部提取 52 维 ARKit 表情权重，最终在腕关节处经球面线性插值（Slerp）合流导出单文件 `.fbx / .vrm`，手指关节精度跃升至 99.3%！",decisionSummaryEn:'Full-body pose estimators downsample the 1080p video to 256px, reducing hands to `<15px` blobs ("zombie mittens" incapable of finger hearts or guitar chords). Our **3-Stream Holistic Pipeline** runs `GVHMR` for the body trunk while cropping `256×256` wrist ROIs into **`HaMeR` (3D MANO hand transformer)** and the face ROI into a **52-Blendshape ARKit extractor**, fusing all three streams via wrist quaternion Slerp into a single `.fbx / .vrm` at $0.022/clip.',stages:[{stage:"1. Body Trunk World Trajectory",controlledEngine:"GVHMR Recovers 22 Body Joints + Root Pelvis World Trajectory",naiveBehavior:"Single Low-Res Network Trying to Predict Body & Fingers Together",metricImpact:"Stable Full-Body Dance Rhythm"},{stage:"2. High-Res 256px Hand Crop -> HaMeR",controlledEngine:"HaMeR ViT-Huge Reconstructs 3D MANO Finger Rotations per Hand",naiveBehavior:'Hands Frozen in Default Flat/Fist Pose ("Zombie Mittens")',metricImpact:"99.3% vs 61.5% Finger Articulation"},{stage:"3. Wrist Quaternion Slerp Fusion",controlledEngine:"kinematic Twist-Swing Decomposition Blending Forearm & Wrist",naiveBehavior:"Candy-Wrapper Wrist Mesh Twisting Artifact at 180° Pronation",metricImpact:"Zero Forearm Candy-Wrapper Twist"},{stage:"4. One-EURO Temporal Filter",controlledEngine:"Velocity-Adaptive 1€ Filter (Smooth Slow Poses, Snappy Fast Beats)",naiveBehavior:"Fixed Low-Pass Filter Lagging Behind Fast Dance Beats",metricImpact:"11.2s Turnaround · $0.022/Clip"}]},"two-actor-combat-cinematic":{id:"two-actor-combat-cinematic",titleZh:"双人武打/体育对抗与抱摔交互动捕（4台 iPhone 多视角三角化 vs $12,000/天 Vicon 光学棚）",titleEn:"2-Actor Combat & Sports Interaction Mocap (4-iPhone Calibrated Multi-View vs. $12k/Day Vicon Stage)",subtitleZh:"当两名演员发生近身格斗遮挡或搭肩拥抱时：单目视频因深度歧义会发生两人穿模重叠；采用“4台低成本 iPhone 同步录制 + 多视图 3D 关键点三角化 + 物理防穿模约束（成本仅光学棚的 1/500）”",subtitleEn:"When 2 actors grapple or occlude each other: monocular depth ambiguity causes mesh interpenetration; 4 synchronized iPhones + multi-view triangulation + physics contact solver cuts Vicon stage cost by -99.8%",monthlyClips:3e3,controlledStack:"4-Camera Calibrated Video + Multi-View Triangulation + Bullet Physics Contact Solver ($0.085/clip)",naiveStack:"Monocular Video on Heavy 2-Person Occlusion (ID Swap & Torso Interpenetration) or $12k/Day Optical Stage",controlledFootSkateMm:.8,naiveFootSkateMm:35,controlledJointAccuracyPct:99.5,naiveJointAccuracyPct:54,controlledCostPerClipUsd:.085,naiveCostPerClipUsd:4.5,controlledTurnaroundSec:18,naiveTurnaroundSec:1800,controlledAnnualSavingsM:1.48,decisionSummaryZh:"架构师必须诚实界定“单目视频动捕”的物理极限：当两名武打演员发生近身背摔、拥抱或严重肢体相互遮挡时，单机位视频无法精确判断两人的前后相对深度（距离误差可达 `25cm`，导致游戏里两具角色模型肚子穿进肚子里，或身份 ID 互换）！但这也绝不意味着必须去租 `$12,000/天` 的 48 机位 Vicon 红外光学动捕棚——只需在排练室四角摆 **4 台普通 iPhone / 运动相机（通过音频拍手或闪光灯对齐帧时间戳）**，用 `RTMPose` 提取 4 视角 2D 关键点做**多视图几何三角化（Multi-View RANSAC Triangulation）**，再挂载刚体胶囊物理接触求解器，即可在 `0.8mm` 精度下完美解算双人武打格斗，单条成本仅 $0.085！",decisionSummaryEn:"Acknowledge the physical boundary of monocular mocap: during close-quarters 2-person grappling or sword combat, single-camera depth ambiguity (`±25cm` Z-error) causes character torsos to interpenetrate or swap IDs (`54.0%` accuracy). Instead of renting a `$12,000/day` Vicon optical stage, place **4 synchronized iPhones/action cameras** at room corners, run **Multi-View RANSAC 3D Triangulation**, and enforce capsule contact constraints (`99.5%` accuracy, `0.8mm` foot lock at `$0.085/clip`).",stages:[{stage:"1. Occlusion Complexity Router",controlledEngine:"Single Actor -> Monocular GVHMR | 2+ Actors Grappling -> 4-Cam Triangulation",naiveBehavior:"Forces Monocular Estimator on Heavily Occluded Grappling",metricImpact:"99.5% vs 54.0% Multi-Actor Accuracy"},{stage:"2. Audio-Flash Sync & RANSAC 3D",controlledEngine:"Sub-Frame Audio Peak Sync + 4-View Epipolar RANSAC Triangulation",naiveBehavior:"Expensive Hardware Genlock Cables & Reflective Marker Suits",metricImpact:"Zero Marker Suit Setup Time"},{stage:"3. Physics Contact & Anti-Clip",controlledEngine:"Articulated Rigid-Body Capsule Solver Prevents Torso Interpenetration",naiveBehavior:"Actor A Fist Passes Through Actor B Chest by 20cm",metricImpact:"100% Exact Sword/Fist Contact"},{stage:"4. Root-Motion UE5 Export",controlledEngine:"Extracts Clean Root-Motion Capsule Delta + In-Place Animation Pair",naiveBehavior:"Baked World Offset Breaking Unreal Character Controller",metricImpact:"$0.085 vs $4.50/Clip (+$1.48M/Yr)"}]}};function d(n,o="controlled"){const e=s[n],a=o==="controlled",t=Number(((e.naiveFootSkateMm-e.controlledFootSkateMm)/e.naiveFootSkateMm*100).toFixed(1)),i=Number((e.controlledJointAccuracyPct-e.naiveJointAccuracyPct).toFixed(1));return{scenario:e,mode:o,activeFootSkateMm:a?e.controlledFootSkateMm:e.naiveFootSkateMm,activeJointAccuracyPct:a?e.controlledJointAccuracyPct:e.naiveJointAccuracyPct,activeCostPerClipUsd:a?e.controlledCostPerClipUsd:e.naiveCostPerClipUsd,activeTurnaroundSec:a?e.controlledTurnaroundSec:e.naiveTurnaroundSec,skateReductionPct:t,accuracyGainPts:i,annualSavingsM:e.controlledAnnualSavingsM}}let r="game-npc-locomotion-emote",c="controlled";function l(){const n=document.querySelector("#app");if(!n)return;const o=d(r,c),e=o.scenario,a=c==="controlled";n.innerHTML=`
    <main class="workbench-shell" data-mode="${c}" data-scenario="${r}">
      <header class="wb-header">
        <div>
          <span class="wb-eyebrow">218TH WORKBENCH · DOMAIN 4 · VIDEO-TO-3D CHARACTER ANIMATION & MONOCULAR MOCAP STUDIO</span>
          <h1>游戏与影视 3D 角色视频动捕生成（Video-to-3D Motion）选型工作台：GVHMR 世界系 SMPL-X + 双骨 IK 脚底防滑步锁 + HaMeR 灵巧手</h1>
          <p class="wb-lead">${e.subtitleZh} · <span class="en-sub">${e.subtitleEn}</span></p>
        </div>
        <div class="wb-controls">
          <div class="seg-group" role="group" aria-label="Mocap Scenario">
            ${Object.keys(s).map(t=>`
              <button class="seg-btn ${r===t?"active":""}" data-scenario-btn="${t}">
                ${t==="game-npc-locomotion-emote"?"1. 游戏 NPC 与舞蹈动捕 (GVHMR + 双骨 IK 滑步 1.2mm)":t==="vtuber-dance-finger-capture"?"2. 虚拟偶像全身+灵巧手+表情 (GVHMR + HaMeR + ARKit)":"3. 双人武打近身交互 (4台 iPhone 多视图三角化 vs Vicon 棚)"}
              </button>`).join("")}
          </div>
          <div class="seg-group" role="group" aria-label="Pipeline Mode">
            <button class="seg-btn ${a?"active":""}" data-mode-btn="controlled">
              ✅ GVHMR 世界系 + 脚底 IK 锁死 + HaMeR 手部 ($${e.controlledCostPerClipUsd}/条 · 滑步 ${e.controlledFootSkateMm}mm)
            </button>
            <button class="seg-btn ${a?"":"active"}" data-mode-btn="naive">
              ⛔ 早期相机系 HMR / 无 IK 基线 ($${e.naiveCostPerClipUsd}/条 · 太空步打滑 ${e.naiveFootSkateMm}mm)
            </button>
          </div>
        </div>
      </header>

      <section class="kpi-ribbon" aria-label="Key Selection Metrics">
        <article class="kpi-card">
          <span class="kpi-label">脚底太空步滑动误差 (Foot-Skating Slip Error)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${o.activeFootSkateMm} mm/f</strong>
          <span class="kpi-note">滑步削减 -${o.skateReductionPct}% · 零速触地分类 + 双骨解析 IK</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">全身与手指骨骼还原精度 (3D Joint & Finger Accuracy)</span>
          <strong class="kpi-val ${a?"good":"warn"}">${o.activeJointAccuracyPct}%</strong>
          <span class="kpi-note">净增 +${o.accuracyGainPts} pts · HaMeR 消除僵尸连指铲手</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">单条 60fps FBX 动捕成本 (Cost / FBX Clip)</span>
          <strong class="kpi-val ${a?"good":"warn"}">$${o.activeCostPerClipUsd.toFixed(3)}</strong>
          <span class="kpi-note">年省 +$${o.annualSavingsM.toFixed(2)}M · 告别 $12,000/天光学棚租赁</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">端到端解算导出耗时 (FBX Export Latency)</span>
          <strong class="kpi-val good">${o.activeTurnaroundSec} s</strong>
          <span class="kpi-note">自动分离 UE5 Root-Motion 胶囊体位移与原地动作</span>
        </article>
      </section>

      <section class="wb-grid">
        <article class="panel stage-panel">
          <div class="panel-head">
            <h2>1. 为什么早期 AI 视频动捕导进引擎全是“太空步滑冰”？GVHMR 重力世界系 + 双骨脚踝 IK 钉死架构图解</h2>
            <span class="badge">${a?e.controlledStack:e.naiveStack}</span>
          </div>
          <svg class="stage-svg" viewBox="0 0 680 300" role="img" aria-label="GVHMR World Grounding and Foot IK Lock Pipeline">
            <rect width="680" height="300" rx="12" fill="#0b1220" />
            <g transform="translate(20, 20)">
              <rect width="202" height="126" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
              <text x="14" y="24" fill="#6ee7b7" font-size="11.5" font-weight="700">1. GVHMR 重力对齐世界系</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">人镜运动彻底解耦</text>
              <text x="14" y="68" fill="#a7f3d0" font-size="10.5">• DPVO 视觉里程计反解拍摄手机运镜</text>
              <text x="14" y="88" fill="#a7f3d0" font-size="10.5">• 预测重力方向 g 锁死水平地面 Z=0</text>
              <text x="14" y="108" fill="#34d399" font-size="10.5" font-weight="700">• 手机仰拍/移动时角色绝不飞天倾斜</text>
            </g>

            <g transform="translate(239, 20)">
              <rect width="202" height="126" rx="10" fill="#111c33" stroke="#3b82f6" stroke-width="1.5" />
              <text x="14" y="24" fill="#93c5fd" font-size="11.5" font-weight="700">2. 触地检测 + 解析式双骨 IK</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">1.2mm 钉死地面零滑步</text>
              <text x="14" y="68" fill="#cbd5e1" font-size="10.5">• 识别左/右脚跟与脚尖支撑相 (Stance Phase)</text>
              <text x="14" y="88" fill="#cbd5e1" font-size="10.5">• 支撑相期间强行冻结脚掌世界坐标 XYZ</text>
              <text x="14" y="108" fill="#60a5fa" font-size="10.5" font-weight="700">• 余弦定理反解膝关节与髋关节弯曲角</text>
            </g>

            <g transform="translate(458, 20)">
              <rect width="202" height="126" rx="10" fill="#3b0764" stroke="#a855f7" stroke-width="1.5" />
              <text x="14" y="24" fill="#d8b4fe" font-size="11.5" font-weight="700">3. HaMeR 灵巧手 + 4机位路由</text>
              <text x="14" y="46" fill="#f8fafc" font-size="16" font-weight="800">99.3% 十指关节精度</text>
              <text x="14" y="68" fill="#e9d5ff" font-size="10.5">• 裁剪 256px 手腕框跑 HaMeR 15指骨重建</text>
              <text x="14" y="88" fill="#e9d5ff" font-size="10.5">• 腕骨 Twist-Swing 拆分消除前臂麻花扭转</text>
              <text x="14" y="108" fill="#c084fc" font-size="10.5" font-weight="700">• 双人近身抱摔自动升格 4台 iPhone 三角化</text>
            </g>

            <g transform="translate(20, 162)">
              <rect width="640" height="118" rx="10" fill="#0f172a" stroke="#1e293b" />
              <text x="18" y="26" fill="#38bdf8" font-size="13" font-weight="700">游戏与动画工作室 3D 动捕方案三级选型铁律 (Mocap Selection Decision Matrix)</text>
              <text x="18" y="52" fill="#e2e8f0" font-size="11.5">• 单人 NPC 走跑跳 / 社交舞蹈 / VTuber (占资产量 85%) → 单目视频 GVHMR + HaMeR + 脚底 IK 锁 ($0.015/条，8.5秒)</text>
              <text x="18" y="76" fill="#e2e8f0" font-size="11.5">• 双人武打抱摔 / 复杂多人遮挡交互 (占 12%) → 4台普通 iPhone 拍手同步 + 多视图 RANSAC 三角化 + 胶囊防穿模 ($0.085/条)</text>
              <text x="18" y="100" fill="#34d399" font-size="11.5" font-weight="700">• 3A 主角极限体操/特技翻滚 (占 3%) → 租赁 Vicon/OptiTrack 红外光学棚或 Xsens 惯性动捕服</text>
            </g>
          </svg>
          <p class="decision-banner"><strong>架构师选型结论：</strong>${e.decisionSummaryZh}</p>
        </article>

        <article class="panel matrix-panel">
          <div class="panel-head">
            <h2>2. 四阶段视频转引擎就绪 FBX 骨骼动画拆解</h2>
            <span class="badge">Zero Foot Skating</span>
          </div>
          <div class="stage-list">
            ${e.stages.map(t=>`
              <div class="stage-row">
                <div class="stage-title">${t.stage}</div>
                <div class="stage-cols">
                  <div class="col-good">✅ 世界系 + IK 锁定管线：${t.controlledEngine}</div>
                  <div class="col-bad">⛔ 早期相机系/无 IK：${t.naiveBehavior}</div>
                </div>
                <div class="stage-impact">${t.metricImpact}</div>
              </div>`).join("")}
          </div>
        </article>
      </section>
    </main>
  `,n.querySelectorAll("[data-scenario-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.scenarioBtn;i&&(r=i,l())})}),n.querySelectorAll("[data-mode-btn]").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.modeBtn;i&&(c=i,l())})})}l();
