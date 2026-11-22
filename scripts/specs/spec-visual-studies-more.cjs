'use strict';
const { stage: s, entry } = require('./policy.cjs');

function study(titleEn, titleZh, stages, takeaways) {
  return entry('animation', titleEn, titleZh, stages, takeaways);
}

const RAW_STUDIES = {
  'opus-animation-landscape': study(
    'Declarative & Agentic Animation Landscape · SVG/Canvas/WebGL Expressiveness vs Production Reliability',
    '前沿模型声明式与程序化动画全景评估 · SVG/Canvas/WebGL 表现力、物理连贯性与工程交付率',
    [
      s('PROMPT BENCHMARK', '分层难度视觉基准集', 'Icon Micro-Motion → Articulated Scene → 3D', '从微交互图标、多关节生物运动到三维空间叙事逐级加压', 'Evaluates spatial composition, color restraint & continuous motion across complexity tiers', '系统评测前沿大模型在不同几何复杂度与时间跨度下的构图审美、色彩克制力与连续运动表现', 'measures codegen', '对比渲染技术栈适配度'),
      s('STACK FIT', '技术底座与模型强项对齐', 'Inline SVG/CSS · HTML5 2D · Three.js Shaders', '矢量路径变形、2D 粒子物理循环与三维着色器适配边界', 'Identifies where models produce crisp single-pass assets vs requiring iterative critique', '定位大模型在何种图形接口下具备高一次成片率，以及何处易发生矩阵顺序与坐标翻转错误', 'applies repair', '引入视觉诊断自修复'),
      s('CRITIQUE LOOP', '多帧采样审阅与几何修正', 'Frame Strip VLM Audit + BBox Sanity Check', '等间隔序列帧视觉诊断配合 DOM/Canvas 非空像素率检测', 'Repairs off-center framing, frozen loops & low-contrast labels in 1–2 targeted passes', '针对画面偏心、动画静止卡死与字色对比度不足生成精确坐标修正补丁，快速收敛成片质量', 'distills playbook', '沉淀高确定性工程模式'),
      s('REUSABLE PATTERNS', '生产级动画代码工程范式', 'Normalized Coords, Phase Clocks & Palette Tokens', '归一化视口坐标、显式周期相位时钟与受控设计色板变量', 'Standardizes scaffolding that lifts visual output consistency across frontier models', '提炼标准视口缩放、相位状态机与受控色阶脚手架，显著降低跨模型调用的质量方差')
    ],
    [
      ['Normalized [0,1] Viewport Coordinates Eliminate Clipping', '强制使用归一化视口比例坐标可根除跨分辨率裁切事故', 'Hardcoded pixel constants break on resize; normalized math scales cleanly across screens.', '摒弃写死像素常数，基于画布宽高比例计算几何位置，确保在桌面横屏与移动竖屏下均居中完整。'],
      ['Explicit Phase Clocks Beat Ad-Hoc Frame Counters', '采用归一化周期相位替代散乱的逐帧累加计数器', 'Parameterizing motion over `phase ∈ [0, 1)` guarantees seamless loops and easy scrubbing.', '将所有往复与过场运动表示为归一化相位函数，天然支持无缝循环播放与任意时间点拖拽预览。'],
      ['Constrain Color Tokens Upfront in the Spec', '在生成规格头部显式锁死不超过五色的语义色板', 'Unconstrained models default to garish rainbow palettes; curated tokens enforce polish.', '放任模型自由选色极易退化为刺眼高饱和彩虹色，前置定义背景、主色、辅色与强调色能确保专业质感。']
    ]
  ),
  'pelican-bicycle-study': study(
    'Articulated 2D Kinematics Case Study (Pelican on Bicycle) · Closed-Chain Crank IK & Anatomical Proportions',
    '多关节闭链运动学案例拆解（鹈鹕骑行）· 曲柄踏板逆运动学（IK）闭合与生物解剖比例约束',
    [
      s('CLOSED-CHAIN IK', '曲柄—脚掌—膝髋二连杆闭合', 'Crank Angle θ(t) → Two-Bone Analytical IK', '由牙盘旋转角精确反解膝关节位置，杜绝脚掌脱离踏板空蹬', 'Solves exact law-of-cosines knee bend every frame so feet stay locked to rotating pedals', '逐帧运用余弦定理精确解算大腿与小腿夹角，彻底解决大模型手写正弦近似导致的脚蹬脱节顽疾', 'anchors chassis', '锁定车架几何三角标准'),
      s('BICYCLE GEOMETRY', '钻石双三角车架与轮径比', 'Bottom Bracket · Seat Tube · Head Tube Truss', '五通、立管、头管双三角刚性连接与轮距地面切线对齐', 'Enforces real mechanical truss connectivity so wheels, fork & handlebars form a valid bike', '严格约束前后轮轴心、五通轴承与车把叉管的拓扑连接关系，消除悬空断管等结构畸变', 'shapes character', '构建可辨识角色轮廓剪影'),
      s('SILHOUETTE ANATOMY', '标志性喉囊喙部与重心起伏', 'Gular Pouch Silhouette, Wing Grip & CoM Bob', '下颌大喉囊特征曲线、双翼握把弧线与随踩踏节拍微幅起伏', 'Couples subtle torso/head secondary motion with each 180° pedal power stroke', '在踩踏发力相位联动躯干微倾、尾羽轻摆与喉囊弹性次级动态，赋予几何图形鲜活生命力', 'loops world', '叠加地面速度同步视差'),
      s('GROUND & WHEEL LOCK', '无滑移滚动约束与景深视差', 'v_ground = ω_wheel · R & Parallax Layers', '车轮角速度与地面后移线速度严格满足无滑移物理方程', 'Eliminates ice-skating wheels by coupling spoke rotation directly to ground scroll speed', '强制辐条旋转角速度乘以轮半径等于地面刻度平移速度，消除车轮原地打滑的虚假感')
    ],
    [
      ['Analytical Two-Bone IK Solves Closed Mechanical Loops', '涉及脚踩踏板、手握操纵杆必须使用解析二连杆逆运动学', 'Independent sine waves on hip and knee never stay attached to a circular crank.', '分别给髋部和膝部硬凑独立正弦函数绝无可能贴合圆周踏板，二十行余弦定理逆解即可百分百锁死。'],
      ['Enforce `v = ωR` No-Slip Rolling Invariant', '滚动车辆与步行角色必须严守线速度与角速度无滑移守恒', 'Mismatched wheel spin vs ground scroll immediately breaks physical believability.', '车轮转动快慢若与地面参照物后退速度脱节会瞬间产生溜冰假象，须共享单一里程位移变量。'],
      ['Secondary Follow-Through Separates Life From CAD', '与主发力相位错开微角度的次级跟随动态是灵动感来源', 'Phase-lagged head, pouch, and feather motion turn rigid linkage math into character animation.', '在刚性机械连杆之上叠加滞后约 30° 相位的头部与羽毛柔性摆动，让精准几何兼具艺术感染力。']
    ]
  ),
  'physgaussian-world-mpm-study': study(
    'PhysGaussian Continuum Simulation Study · 3DGS-MPM Coupling, Constitutive Models & Real-Time Splatting',
    'PhysGaussian 物理驱动三维高斯研究 · 连续介质物质点法耦合、多材质本构方程与实时渲染边界',
    [
      s('UNIFIED PRIMITIVE', '渲染核与物理粒子一体化', '3D Gaussian Kernels = Lagrangian Particles', '同一组高斯核既承载辐射外观又承载质量、速度与应力张量', 'Eliminates brittle marching-cubes mesh extraction and UV re-texturing loss', '绕开有损网格重建与纹理重映射中间环节，实现“所见即所仿”的端到端物理交互底座', 'solves mechanics', '进入粒子—网格混合步进'),
      s('CONSTITUTIVE LAWS', '多材质弹塑性本构方程库', 'Fixed Corotated · Drucker-Prager · von Mises', '超弹性橡胶、沙雪摩擦屈服准则与金属塑性永久形变模型', 'Simulates diverse physical behaviors by swapping stress-strain return-mapping kernels', '通过切换弹性势能函数与塑性屈服面返回映射算子，精确刻画回弹、塌落、堆积与弯折现象', 'updates splats', '局部形变梯度修正椭球'),
      s('DEFORMATION & SH', '一阶泰勒局部线性协方差更新', 'Σ_t = F_t Σ_0 F_t^T & Polar Rotation R_t', '由形变梯度更新高斯椭球形状并用极分解旋转分量修正高光', 'Keeps view-dependent specular highlights physically aligned as objects twist and tumble', '利用极分解提取局部纯旋转矩阵同步旋转球谐系数坐标系，确保物体翻滚时表面高光反射自然贴合', 'evaluates limits', '评估体填充与步长算力开销'),
      s('COMPUTE ENVELOPE', '亚毫秒子步稳定性与显存定容', 'CFL Timestep Δt, Grid Resolution & Infill Count', '显式积分刚度步长约束、背景欧拉网格粒度与内部粒子开销', 'Quantifies stiff-material substep cost vs interactive 30–60 FPS GPU budgets', '拆解高杨氏模量硬质材料所需的微小积分步长开销，给出交互帧率下的网格分辨率与粒子数上限')
    ],
    [
      ['Explicit MPM Stiffness Caps Real-Time Timestep Size', '显式物质点法中材料越刚硬所需的物理子步数越多', 'High Young’s modulus requires tiny CFL substeps (`1e-4s`), trading stiffness for FPS.', '过高刚度会触发显式积分数值爆炸，实时交互场景需合理折中杨氏模量或采用隐式/准静态近似。'],
      ['Internal Particle Infill Governs Solid Volume Conservation', '实心几何抗压保体积能力取决于内部隐藏支撑粒子的均匀填充', 'Surface-only splats crumple like paper bags under gravity without interior MPM particles.', '仅靠表面薄壳高斯核受力会像空纸袋一样瘪塌，必须基于体素占用在内部注入不参与表面着色的支撑粒子。'],
      ['Polar Decomposition Preserves Specular Realism Under Rotation', '大角度旋转形变必须同步更新球谐系数局部参考系', 'Skipping SH rotation freezes highlights in world space even after an object flips upside down.', '若仅移动高斯核位置而不旋转球谐方向，物体翻转后高光仍停留在旧朝向，产生严重光影违和。']
    ]
  ),
  'publication-and-provenance': study(
    'Visual Research Publication & Provenance Architecture · Dual-Locale Parity, C2PA Metadata & CI Gates',
    '生成式视觉研究发布与溯源治理架构 · 双语对等构建、生成谱系元数据封存与自动化门禁',
    [
      s('ARTIFACT BUNDLE', '标准化研究资产交付包', 'Interactive Demo + Bilingual FAQ + Spec JSON', '可运行交互样本、中英双语选型指南与结构化实验元数据三位一体', 'Pairs every visual showcase with explicit architectural trade-offs and cost envelopes', '杜绝只放炫目视频而无工程复盘，强制每项成果同步沉淀架构权衡矩阵与落地核对清单', 'tags provenance', '标记真实测量与合成溯源'),
      s('PROVENANCE TAGS', '真实性分级与模型参数留痕', 'Measured · Synthetic · Anonymized Reported', '严格区分实机压测、受控教学仿真与公开论文脱敏引述口径', 'Strips private credentials/PII while preserving model IDs, seeds & hardware SKU notes', '入库前自动剥离内网敏感地址与个人凭据，完整保留模型版本、硬件规格与可复现边界说明', 'syncs locales', '执行中英双语链接与术语对齐'),
      s('LOCALE PARITY', '中英双语路由与零混排门禁', 'Paired `.html` / `.en.html` & Zero-CJK Audit', '双语页面一比一镜像对等、语言切换互链与英文版零汉字污染检查', 'Guarantees global CTOs and partner engineers read clean native-grade English pages', '通过构建期字符集扫描与路由互链重写，确保英文版界面、图表与架构图不残留任何未译中文', 'publishes main', '合并主干并校验线上版本'),
      s('MAIN-FIRST DEPLOY', '主分支集成与线上版本一致性核验', '19-Suite Verification → origin/main & Pages SHA', '跑通全站十九项导航、断链与视觉门禁后同步推送主干与静态站', 'Verifies deployed commit SHA matches verified local build—zero stranded worktree branches', '杜绝研究成果滞留孤立分支，发布后核验远端生产站点实际生效哈希与本地验证提交严格一致')
    ],
    [
      ['Separate Measured Telemetry From Analytical Simulators', '工程诚信底线是清晰区分实测封存数据与参数化推演模型', 'Explicit provenance labels build immediate credibility with enterprise architecture peers.', '如实标注实机基准压测与理论公式推演边界，是赢得客户技术决策者信任的核心前提。'],
      ['Automate Zero-CJK & Broken-Link Gates in CI', '双语大站必须靠自动化门禁消灭未译漏网字符与跨目录断链', 'Manual spot-checking cannot scale across 2,000+ localized pages and assets.', '超两千页规模的技术门户无法靠人工肉眼巡检，必须将死链、脚本完整性与双语纯净度固化为测试套件。'],
      ['Enforce Main-Branch Landing for Every Completed Study', '一切验证通过的研究资产默认闭环合入主干并同步线上门户', 'Unmerged feature branches rot silently; atomic main integration keeps the hub authoritative.', '避免分支碎片化导致知识资产流失，保持代码仓主线与公开技术门户实时同源同步。']
    ]
  ),
  'rocket-method': study(
    'Multi-Stage Rocket Launch Visualization Methodology · Telemetry Kinematics, Exhaust Plume & Camera Staging',
    '多级火箭发射可视化工程方法论 · 弹道运动学曲线、尾焰粒子膨胀流体与多机位导播调度',
    [
      s('TRAJECTORY PHYSICS', '推重比与重力转弯运动学', 'Liftoff TWR → Pitchover → Max-Q → Staging', '点火蓄力、离塔加速、程序转弯、最大动压与一二级分离包络', 'Drives altitude, velocity & pitch angle from continuous piecewise kinematic equations', '用分段连续推力加速度与空气密度衰减方程驱动全程高度速度仪表，消除匀速直线上升的玩具感', 'drives plume', '随大气压强演化尾焰形态'),
      s('ALTITUDE PLUME', '随高度气压膨胀的尾焰与烟云', 'Sea-Level Mach Diamonds → High-Alt Plume Bloom', '地面导流槽浓烟翻滚与高空低气压下尾焰伞状剧烈膨胀过渡', 'Couples exhaust cone spread angle and opacity inversely to ambient atmospheric pressure', '将尾焰张角同外部大气压强挂钩，细腻还原低空紧束马赫环到临近空间宽大羽流的物理演变', 'cuts cameras', '触发多机位张力切镜'),
      s('CAMERA DIRECTOR', '发射台仰拍—箭体伴飞—星箭分离机位', 'Pad Shake Telephoto → Umbilical Cam → Orbit Wide', '长焦热浪震动仰拍、箭身俯视地球弧线与太空静谧广角切换', 'Matches camera shake frequency and lens focal length to each flight regime', '地面段叠加低频声压震动与长焦压缩感，入轨段瞬间抽离震动切换深空广角，张弛对比强烈', 'audits timeline', '核验全程关键里程碑帧'),
      s('MILESTONE VERIFY', '关键飞行时序节点抽帧验收', 'Ignition · Tower Clear · Stage Sep · Fairing', '点火浓烟、拔地离塔、级间热分离与整流罩抛离多帧精确校验', 'Confirms non-overlapping HUD telemetry and crisp staging separation choreography', '逐一抽检各关键飞行事件节点的箭体连接状态与遥测读数逻辑自洽性')
    ],
    [
      ['Slow Heavy Liftoff Sells Megastructure Scale', '庞然大物拔地而起前两秒的迟滞沉重加速度是体量感灵魂', 'Instant fast upward velocity makes a 100-meter rocket look like a tiny bottle firework.', '点火后先蓄满导流槽浓烟再以缓慢加速度沉稳离塔，才能传递数千吨推力对抗重力的震撼体量感。'],
      ['couple Exhaust Geometry to Atmospheric Density', '尾焰形态随海拔高度连续张开能赋予长镜头真实空间跨度感', 'Transitioning from tight bright core to wide translucent vacuum plume marks ascent visually.', '无需文字提示，单凭天空由蔚蓝渐入深黑与尾焰由紧束转为扇形羽流即可直观传达冲出大气层进程。'],
      ['Contrast Violent Pad Shake With Silent Orbital Smoothness', '以发射段的剧烈声学震动反衬入轨段的绝对平稳寂静', 'Dropping camera shake to zero right at MECO/separation creates an unmistakable dramatic beat.', '主机关机与级间分离瞬间归零镜头抖动切换丝滑漂移视角，形成极具冲击力的工程叙事转折。']
    ]
  ),
  'technique-comparison': study(
    'Generative & Programmatic Visual Technique Matrix · SVG/Remotion, Canvas/WebGL, 3DGS & Video DiT Trade-Offs',
    '程序化与生成式视觉技术路线选型矩阵 · 矢量代码、实时三维、3DGS 与视频扩散八维对标',
    [
      s('8 EVALUATION AXES', '八维工程选型评估标尺', 'Glyph Accuracy · 3D Lock · FPS · Editability · $', '文字保真度、三维几何一致性、交互性、局部可改性与单分钟成本', 'Evaluates techniques as engineering systems with hard SLAs rather than isolated demos', '跳出单张样片滤镜，从企业规模化生产所需的修改返工成本、确定性与算力账单八个维度客观打分', 'maps 4 stacks', '横向对标四大主流技术栈'),
      s('DETERMINISTIC CODE', '确定性代码渲染栈（SVG / Remotion）', '100% Text/Data Fidelity & Git Diffability', '毫秒级局部修改、4K 锐利文字图表与双语参数化批量出片', 'Unbeatable for architecture explainers, KPI reports & UI walkthroughs; weak on organic humans', '在技术架构演进、财报数据叙事与产品界面演示上具备绝对统治力，但不适合写实人物实拍质感', 'bridges 3D/splats', '对比实时三维与高斯泼溅'),
      s('3D & 3DGS TWINS', '显式网格与三维高斯（Three.js / 3DGS）', '60 FPS Client Orbit, PBR Relighting & Reality Scan', '客户端自由拖拽旋转、精确CAD爆炸拆解与实景亚毫米级数字孪生', 'Delivers true spatial interactivity and exact SKU geometry; requires upfront asset prep', '完美胜任电商商品 360° 定制器与工业园区实景巡检，前期需投入三维重建或拓扑烘焙管线', 'integrates DiT', '协同视频扩散大模型'),
      s('VIDEO DIFFUSION', '潜空间视频生成栈（Wan / Veo / Sora）', 'Photoreal B-Roll, Fluids & Expressive Avatars', '高表现力写实空镜、复杂光影流体氛围与口型驱动数字人播报', 'Best used as controllable background plates or avatar clips inside a deterministic compositor', '最宜作为受控镜头片段与数字人图层嵌入确定性合成时间轴，规避单模型包办字幕与精确商标')
    ],
    [
      ['No Single Visual Stack Wins Across All 8 Dimensions', '没有任何单一视觉技术路线能同时在文字精度与写实感上通吃', 'Architect production pipelines as composable layers matching each stack’s strength.', '成熟的企业视觉架构必然是多栈分层组合：扩散模型出氛围底图、三维锁商品几何、矢量绘精准图文。'],
      ['Factor Iteration & Revision Cost Into TCO', '核算视觉管线总成本必须计入业务方反复改字改数的返工代价', 'Regenerating a 4K diffusion video to fix one typo costs 100× updating a Remotion prop.', '因改一个指标数字而重抽十次视频大模型的隐性算力与工期损耗，远高于代码化模板的参数重编译。'],
      ['Client-Side WebGL/Rive Crushes Cloud Streaming TCO', '高并发交互展示优先下沉终端浏览器 WebGL/Rive 渲染', 'Reserve cloud GPU pixel streaming strictly for massive multi-GB CAD/twin scenes.', '除百吉字节级超重工业母机外，轻量化客户端渲染可节省九成以上云端常驻显卡推流费用。']
    ]
  ),
  'validation': study(
    'Visual & Interactive Asset Verification Pipeline · Headless Chromium BBox, Temporal Diff & Contrast Gates',
    '可视化与交互资产自动化验收管线 · 无头浏览器几何防裁剪、时序活性检测与无障碍对比度门禁',
    [
      s('RUNTIME BOOT', '无头沙箱加载与零异常门禁', 'Playwright Load · Console/PageError = 0 · CSP', '真实浏览器沙箱冷启动、零脚本未捕获异常与零外部死链请求断言', 'Catches missing imports, CSP hash mismatches & WebGL context crashes immediately', '第一时间拦截模块引用缺失、严格安全策略阻断与空指针崩溃导致的白屏事故', 'checks geometry', '扫描全视口几何边界框'),
      s('GEOMETRY & CLIP', '多分辨率边界框防溢出与防重叠', '390px Mobile & 1440px Desktop `getBBox()` Audit', '窄屏手机与宽屏桌面双视口逐元素检测文字截断与横向滚动溢出', 'Verifies `scrollWidth <= innerWidth`, readable font sizes (`>=10px`) & SVG viewBox fit', '精确测量每个矢量文本与卡片实际渲染像素框，根除长英文单词或未折行标题撑破容器边缘', 'verifies motion', '多时间切片核验动态演进'),
      s('TEMPORAL LIVENESS', '多时间戳帧间差分与帧率探针', 'Pixel Diff Across t=0s, 1.5s, 3s & RAF Cadence', '多时间点像素哈希差分对比与动画循环帧率连续性采样', 'Detects frozen animations, diverged NaN coordinates & runaway memory growth', '自动揪出看似加载成功实则画面静止不动、或运行两秒后物体飞出画布消失的时序缺陷', 'checks contrast', '校验前景可读性与双语纯净度'),
      s('CONTRAST & LOCALE', 'WCAG 前景对比度与双语隔离核验', 'Luminance Contrast Ratio & Zero-Untranslated CJK', '正文与标注框明度对比度核查及英文页面零残留中文字符扫描', 'Ensures crisp readability on projectors and strict bilingual edition integrity', '保障会议室投影仪弱对比环境下图表依然清晰易读，并严守中英文分版零语言混杂底线')
    ],
    [
      ['HTTP 200 Does Not Mean Visually Intact', '静态文件返回 200 绝不等同于浏览器渲染画面正常可读', 'Only real DOM/SVG layout measurement at mobile and desktop widths catches text clipping.', '唯有在真实渲染引擎中计算移动端与桌面端元素的几何包围盒，才能捕获隐蔽的折行截断与重叠。'],
      ['Multi-Timestamp Sampling Catches NaN Physics Explosions', '动态交互页面必须跨时间点多次采样以捕获延迟触发的数值崩溃', 'Many simulation bugs appear only after 60+ ticks when velocities divide by zero.', '大量物理与粒子除零错误在首帧完全隐身，运行百帧后才会导致全屏空白或坐标变为空值。'],
      ['Deterministic Verification Enables Safe Autonomous Builds', '硬核客观的视觉验收门禁是支撑无人值守高频交付的安全网', 'Automated geometry, link, and locale checks keep 2,000+ pages regression-free.', '将排版不溢出、脚本零报错与双语零混排转化为确定性退出码，保障全站大规模重构零回归。']
    ]
  ),
  'worldmem-action-world-study': study(
    'Interactive Action World Models & Spatial Memory · Causal Diffusion, Pose-Indexed KV & 3D Consistency',
    '交互式动作世界模型与空间记忆架构 · 因果分块扩散、三维位姿索引记忆库与长时程空间闭合',
    [
      s('CAUSAL ROLLOUT', '动作条件因果自回归视频流', 'Chunked Diffusion Forcing + Action Embeddings', '分块噪声调度（Diffusion Forcing）融合逐帧键鼠运动向量', 'Generates low-latency interactive frames conditioned on user navigation inputs', '通过不等噪分块自回归架构结合实时动作条件嵌入，实现低延迟流式第一人称环境交互', 'exposes cliff', '突破局部窗口空间遗忘墙'),
      s('FORGETTING CLIFF', '有限时间上下文的几何失忆瓶颈', '16–32 Frame Context Drops Revisited Landmarks', '短时间滑动窗口滑出后原地转圈或退回门口必然重绘陌生房间', 'Full attention over thousands of historical video frames is O(T²) infeasible in VRAM', '若保留全部数千帧历史潜变量做全局注意力，二次方计算与显存开销将在数秒内击穿单机上限', 'indexes 3D memory', '构建稀疏三维位姿记忆槽'),
      s('POSE-FOV MEMORY', '视锥重合度驱动的稀疏记忆读写', 'Write Distinct Views → Retrieve Top-K Frustum', '仅在视角/位移跨过阈值时写入关键帧，按三维视锥重叠检索注入', 'Retrieves the 4–8 most geometrically relevant past frames in O(1) active attention budget', '以常数级注意力预算精准捞回历史上看同一面墙的关键帧特征，兼顾恒定帧率与数分钟长程记忆', 'benchmarks loop', '评测闭环重访几何保真度'),
      s('CONSISTENCY EVAL', '多房间折返与原地 360° 闭环基准', 'Loop-Closure PSNR, Pose Accuracy & State Persist', '原地旋转一周像素重合误差、多房间往返结构保持率与时间态演进', 'Validates whether world models serve as reliable spatial simulators vs dreamlike video generators', '区分“转头就忘的梦境视频生成器”与真正具备持久空间状态一致性的世界仿真底座')
    ],
    [
      ['World Models Need Spatial Indexing, Not Just Longer Context', '解决长程场景一致性靠三维空间索引检索而非盲目堆长序列窗口', 'Geometry-aware retrieval of 6 relevant keyframes beats attending to 200 irrelevant recent frames.', '精准召回六张同视角历史关键帧的几何锚定效果，远超硬读两百帧背对当前视角的近期冗余帧。'],
      ['Gate Memory Writes by Novelty to Prevent Redundant Eviction', '记忆库写入必须按空间新颖度门控以防原地驻足挤占历史地标', 'Standing still for 10 seconds must not overwrite landmarks from earlier rooms.', '玩家在同一角落停留徘徊时不应持续写入重复帧冲刷掉早期房间的关键锚点快照。'],
      ['Encode Relative Pose Transform Between Query & Memory Frames', '交叉注意力注入记忆帧时须显式编码相对位姿变换矩阵', 'Relative SE(3) embeddings tell the model exactly how to warp retrieved features to the new angle.', '向模型提供当前相机与历史记忆帧之间的精确相对旋转平移量，才能准确实现跨角度透视重投影。']
    ]
  )
};

const VISUAL_STUDY_MORE = {};
for (const [slug, spec] of Object.entries(RAW_STUDIES)) {
  VISUAL_STUDY_MORE[`animation/research/${slug}`] = spec;
  VISUAL_STUDY_MORE[`generative-visual-lab/research/${slug}`] = spec;
}

module.exports = { VISUAL_STUDY_MORE };
