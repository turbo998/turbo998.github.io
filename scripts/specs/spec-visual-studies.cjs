'use strict';
const { stage: s, entry } = require('./policy.cjs');

function study(titleEn, titleZh, stages, takeaways) {
  return entry('animation', titleEn, titleZh, stages, takeaways);
}

const VISUAL_STUDY_SPECS = {
  'asset-taxonomy': study(
    'Generative Visual Asset Taxonomy · Code-Driven SVG/WebGL, 3DGS/Blender & Diffusion Video Placement',
    '生成式视觉技术资产分类学 · 代码程序化渲染、三维几何管线与视频扩散模型选型边界',
    [
      s('REQUIREMENT AXES', '交付物工程约束分级', 'Text Precision · 3D Consistency · Interactivity', '文字数字保真度、跨镜头三维一致性与实时交互需求评估', 'Classifies technical diagrams, interactive twins, stylized hero clips & talking avatars', '按信息准确率底线、运镜自由度与是否需要客户端实时交互对视觉任务做正交分类', 'routes paradigm', '匹配三类核心生成范式'),
      s('PARADIGM MATRIX', '三大视觉技术栈职责定界', 'Programmatic SVG/WebGL vs 3D/MCP vs Video DiT', '代码确定性渲染、三维受控资产管线与潜空间视频生成分工', 'Prevents misusing pixel diffusion on charts or hand-coding organic fluid characters', '杜绝用像素扩散模型硬生密集文字图表，也避免纯手写着色器死磕复杂人物自然表演', 'composes layers', '分层混合合成交付'),
      s('LAYERED COMPOSITE', '生成底板与确定性前景合成', 'Generated Plate + Exact Vector/UI Overlay', '扩散光影底板叠加确定性 SVG 数据层与程序化音画对齐', 'Combines cinematic visual richness with 100% accurate metrics and crisp typography', '底层借力生成模型塑造光影材质氛围，顶层由矢量代码精确绘制架构指标与品牌文字', 'locks provenance', '归档可复现构建谱系'),
      s('ARCHIVE CONTRACT', '双语交付与工程可复现标准', 'Source Code, Seed/Model Spec & Headless QA', '源码参数封存、双语对等发布与浏览器几何无裁剪校验', 'Ensures every visual study ships runnable artifacts alongside architectural trade-offs', '确保每项视觉技术研究同步交付可运行交互样本、选型决策矩阵与自动化质量门禁')
    ],
    [
      ['Match Visual Paradigm to Error Tolerance', '依据字形与几何容错率选择代码渲染或像素扩散底座', 'Zero-tolerance data/diagrams belong in SVG/Remotion; organic textures belong in DiT/3D.', '零容错技术指标坚持走确定性矢量代码，复杂自然光影与角色动态再调用扩散或三维管线。'],
      ['Hybrid Layering Beats Monolithic Single-Model Prompts', '分层合成管线远胜于祈求单条提示词一次性完美出片', 'Separate background plates, character motion, and UI/caption layers for clean iteration.', '将背景环境、主体运动与文字标注拆层独立控制，局部返工无需推翻整段渲染重抽卡。'],
      ['Every Visual Asset Must Carry Explicit Provenance', '所有技术演示资产均须清晰标注生成底座与实测边界', 'Document exact rendering stack, frame rate, and cost envelope for architect reuse.', '透明公开底层技术路线、帧率时延与硬件成本区间，便于解决方案架构师直接评估复用。']
    ]
  ),
  'audiovisual-foley-framepack-study': study(
    'Long-Horizon FramePack Video & Synchronized Foley Architecture · Context Packing & Event-Locked Audio',
    'FramePack 长序列视频生成与同步拟音架构 · 渐进上下文压缩防漂移与事件锁相声学合成',
    [
      s('FRAMEPACK CONTEXT', '非对称金字塔历史帧压缩', '1× Anchor + 2×/4×/8× Geometric Token Packing', '关键首帧全分辨率锚定与远期历史帧指数级压缩打包', 'Bounds transformer context length to O(1) (~1.5K–4K tokens) across 60-second causal generation', '将长视频自回归上下文词元数封顶在常数级预算内，兼顾首尾身份锚定与单卡显存可跑性', 'mitigates drift', '双向锚定抑制累积退化'),
      s('ANTI-DRIFT SCHEDULE', '逆序/双向锚定防色彩崩坏', 'Endpoint Anchoring & Exposure Normalization', '起止关键帧双向约束消除自回归饱和度过曝累积误差', 'Prevents the classic 10-second contrast/color explosion of naive autoregressive rollouts', '阻断单向逐块滚动生成常见的色彩过饱和、边缘模糊与主体缓慢变形累积雪崩', 'extracts impulses', '提取运动接触声学锚点'),
      s('EVENT EXTRACTION', '光流突变与能量包络对齐', 'Optical Flow Peak + Semantic Material Tagging', '从生成序列提取运动加减速拐点与碰撞表面材质标签', 'Separates discrete impact transients from continuous motion velocity envelopes', '精准分离离散撞击瞬态时刻与连续风声/摩擦包络，克服端到端视频配音模型节拍迟滞痛点', 'renders audio', '合成多轨同步拟音母带'),
      s('SYNC AUDIO MIX', '视频条件多声道拟音与响度合规', 'MMAudio/Foley Stem + ±35 ms Phase Alignment', '离散音效对齐微调、环境立体声铺底与母线响度治理', 'Delivers Drift-free minute-scale clips with crisp frame-accurate acoustic feedback', '输出长达分钟级且音画瞬态偏差严格控制在人类感知阈值以内的高沉浸成片')
    ],
    [
      ['Constant-Length Context Packing Unlocks Single-GPU Long Video', '金字塔非对称词元打包让单卡生成分钟级长视频成为现实', 'Recent frames need fine tokens; distant history only needs coarse layout/identity tokens.', '近期邻帧保留高密度时空细节，远期帧做高倍率池化仅留身份构图锚点，彻底打破二次方显存墙。'],
      ['Unidirectional Causal Rollouts Require Anchor Regularization', '纯前向自回归长视频必须配合首尾锚定抑制曝光色彩漂移', 'Anchor keyframes or inverted sampling schedules stop error accumulation over 100+ frames.', '引入终点关键帧逆向生成或周期性色彩直方图校准，是维持数十秒画质不退化的关键工程手段。'],
      ['Decouple Transient Timing From Ambient Texture in Video-to-Audio', '视频自动配音应将瞬态打击时刻校准与环境氛围底噪分层处理', 'Pin crisp contact hits to optical-flow impulses while letting neural audio fill ambience.', '用显式运动极值锁定毫秒级撞击声落点，再由神经音频模型铺陈连续环境纹理，兼顾准度与自然度。']
    ]
  ),
  'blender-mcp-pipeline': study(
    'Agentic 3D Production via Blender MCP · Scene Inspection, Python Geometry Scripts & Multi-Angle Visual Critique',
    'Blender MCP 智能体三维资产构建管线 · 场景树探查、程序化建模脚本与多视角渲染回环质检',
    [
      s('SCENE INSPECTION', '场景层级与包围盒状态探查', 'get_scene_info · World Bounds · Material Slots', '读取对象层级、世界坐标系包围盒、相机参数与材质槽', 'Grounds spatial edits in exact meter-scale coordinates before writing a single bpy line', '每次建模修改前先精确获取现有物体世界坐标区间与尺寸比例，杜绝盲写坐标导致穿模悬空', 'executes bpy code', '执行增量式 Python 脚本'),
      s('INCREMENTAL BPY', '模块化 Geometry/Shader 脚本构建', 'Primitive Blockout → Modifiers → Principled BSDF', '体块比例搭建、非破坏性修改器堆栈与物理材质三照明布光', 'Builds scenes in small verifiable steps rather than monolithic 500-line one-shot scripts', '遵循“大比例灰模—细节倒角布尔—材质三点布光”渐进分步执行，确保每一步几何拓扑干净可控', 'renders orthos', '多机位正交与透视渲染抽检'),
      s('MULTI-VIEW CRITIQUE', '正/侧/顶与主相机视觉核验', 'Front · Right · Top Ortho + Hero Render Loop', '单透视图易掩盖深度错位，强制正交三视图交叉检验接触关系', 'Catches floating props, inverted normals & blown-out highlights via VLM viewport checks', '通过正交视图精准识别单张透视图难以察觉的桌腿悬空、零件穿插与补光死黑缺陷', 'exports glTF/MP4', '烘焙导出标准工业资产'),
      s('ASSET EXPORT', '减面烘焙与跨引擎交付契约', 'glTF 2.0 PBR Bake, Poly Budget & Cycles/EEVEE', '法线粗糙度贴图烘焙、三角面数卡控与 WebGL/视频双出', 'Produces clean real-time glTF assets for Three.js workbenches or turntable renders', '输出面数合规、轴心归零且贴图内嵌的标准三维模型，无缝衔接网页交互工作台或离线精渲')
    ],
    [
      ['Single Perspective Views Hide 3D Depth Collisions', '单张透视渲染图极易掩盖三维深度方向穿模与悬空错误', 'Always verify ground contact and alignment with orthogonal front/side/top camera snapshots.', '必须在闭环质检中强制加入正交侧视与顶视图快照核验，才能彻底消灭物体错位悬空。'],
      ['Block Out Scale & Proportions Before Fine Materials', '严格遵循先锁定灰模体量比例、再细化材质灯光的工序', 'Fixing broken proportions after complex booleans and shaders wastes turns; lock blockout first.', '体块比例失调时过早堆砌复杂节点材质会导致返工成本剧增，先过几何关再过光影关。'],
      ['Combine Procedural Python Math With Curated 3D Assets', '将代码参数化几何布局与高质量预制三维资产库检索结合', 'Use bpy math for architectural symmetry/arrays and asset libraries for organic hero props.', '规则建筑阵列与精密机械走程序化脚本，复杂有机生物与陈设道具优先检索导入成熟三维资产。']
    ]
  ),
  'controllable-4d-video-camera-study': study(
    'Controllable 4D Video & Camera Conditioning Study · Plücker Embeddings, Pose Encoders & Multi-Cam Sync',
    '可控 4D 视频与精准运镜架构研究 · Plücker 光线嵌入、位姿控制适配器与多机位时空同步',
    [
      s('POSE PARAMETERIZATION', '相机内外参统一数学表征', 'SE(3) Extrinsics + K Intrinsics → Plücker 6D', '将焦距视野变化与空间六自由度位移统一编码为像素光线场', 'Preserves spatial pixel-to-ray correspondence across zoom, dolly, orbit & crane shots', '消除不同分辨率与变焦推拉组合下的几何歧义，为每个潜空间网格提供精确空间视线方向', 'injects adapter', '轻量控制分支注入扩散主干'),
      s('CONTROL ARCHITECTURE', '零破坏运镜控制注入机制', 'CameraCtrl / Epipolar Attn / LoRA Adapter', '轻量相机编码分支与对极几何注意力约束对比选型', 'Preserves base DiT motion priors while steering trajectory without full backbone retraining', '冻结百亿参数基础视频生成主干，仅训练轻量级光线注入残差层以避免破坏原生动态自然度', 'preserves 4D world', '同步多机位动态世界状态'),
      s('MULTI-CAM 4D SYNC', '同一动态事件多机位时空锁相', 'Shared World Latent / Cross-View Attention', '跨视角共享四维时空特征实现子弹时间与多机位切镜一致', 'Ensures actor pose, cloth & lighting match identically across simultaneous camera angles', '在多路机位同步生成同一动作瞬间时，通过跨视角极线注意力锁死角色姿态与场景几何一致', 'evaluates fidelity', '量化位姿误差与画质折损'),
      s('TRADE-OFF MATRIX', '运镜服从度与主体动态自由度平衡', 'RotErr / TransErr vs Dynamic Degree & FVD', '轨迹跟随精度、前景动态幅度与单镜头推理显存开销权衡', 'Identifies sweet-spot guidance schedules preventing frozen "statue world" artifacts', '定位避免因过度强加静态三维重建数据而把画面锁死为“凝固雕像馆”的训练混合配比与引导权重')
    ],
    [
      ['Training Solely on Static Scans Freezes Object Motion', '仅用静态三维扫描数据集训练运镜控制会导致前景人物僵化', 'Mix dynamic multi-view/monocular action footage so camera control does not kill scene motion.', '必须在训练与微调中混入动态目标运镜序列，防止模型习得“只要镜头动、万物必静止”的伪关联。'],
      ['Normalize Trajectory Scale to Scene Depth Units', '推理前须将输入相机位移量纲与首帧场景估算景深尺度对齐', 'Unscaled metric camera translations cause wildly exaggerated or imperceptible parallax.', '单目图生视频缺乏绝对米制尺度，必须依据首帧单目深度中位数归一化相机平移步幅。'],
      ['Cross-View Epipolar Constraints Unlock Multi-Cam Editing', '跨机位极线几何约束是生成式多镜头导播切镜的工程底座', 'Shared 4D world latents keep actor continuity intact across wide, medium, and close-up cuts.', '通过共享底层四维时空表征同步多机位输出，克服独立生成各机位时角色衣着动作跳戏顽疾。']
    ]
  ),
  'feitian-reference-study': study(
    'Dunhuang Feitian Stylized Motion Study · Ribbon Fluid Ribbon Dynamics, Palette Discipline & Cultural Fidelity',
    '敦煌飞天风格化视觉工程拆解 · 飘带丝绸流体动力学、矿物岩彩配色规范与构图节奏控制',
    [
      s('VISUAL GRAMMAR', '传统岩彩美学与构图规范', 'Mineral Pigment Palette & S-Curve Composition', '石青、石绿、朱砂、泥金矿物色阶与飞天反弯动态线', 'Locks chromatic harmony and silhouette readability before motion synthesis', '严格约束壁画矿物颜料低饱和高雅色域与核心人体Ｓ形流线剪影，杜绝艳俗霓虹数码感', 'models ribbons', '解算丝绸披帛波动方程'),
      s('RIBBON KINEMATICS', '长披帛行波与阻尼尾迹模型', 'Traveling Sine Harmonics + Air-Drag Verlet Chain', '多频行波叠加与空气阻力约束链仿真丝绸失重飘逸感', 'Produces weightless celestial ribbon trails without rigid-stick or tangled-knot artifacts', '结合低重力阻尼质点链与相位递进行波函数，细腻呈现长绸迎风舒展而不打结穿模的韵律', 'layers parallax', '构建多景深卷轴透视'),
      s('LAYERED PARALLAX', '多平面云纹藻井景深与粒子', 'Cloud-Scroll Foreground · Figure Midplane · Halo Backlight', '前景流云遮挡、中景主体背光轮廓与远景藻井金粉微粒', 'Creates deep atmospheric staging in lightweight 2D/WebGL without heavy volumetric cost', '利用多层视差深度速率差与柔和边缘发光混合，在轻量实时画布上营造深邃石窟空间层次', 'validates frames', '关键帧构图与帧率巡检'),
      s('FRAME QA', '关键姿态剪影与跨分辨率适配', 'Silhouette Contrast, Aspect Framing & 60 FPS', '多时间点关键帧剪影清晰度、竖屏横屏安全框与流畅度校验', 'Verifies graceful motion arcs at t=0s, 3s, 6s without off-screen ribbon clipping', '在多个时间切片采样校验主体与长飘带完整落于安全画幅内，确保全屏展示舒展优雅')
    ],
    [
      ['Weightless Cloth Needs Traveling Waves + Damped Chains', '表现仙袂失重飘逸感需融合受控行波相位与柔性质点链', 'Pure gravity cloth droops limply; guided harmonic wind fields sustain upward S-curves.', '纯真实重力布料会无力下垂，引入沿法向传播的多频行波风场才能复现壁画凌空飞舞神韵。'],
      ['Constrained Historical Palettes Anchor Visual Quality', '严格锁死传统矿物色卡比堆砌复杂纹理更能确立高级审美', 'Five disciplined pigment tones plus warm gold accents outperform unconstrained RGB gradients.', '收敛全画面色相数量并统一暖色暗部衬底，能瞬间消除程序化图形常见的廉价工业塑料感。'],
      ['Multi-Plane Parallax Delivers Depth at Minimal GPU Cost', '多层半透明视差卷轴以极低算力开销塑造立体空间纵深', '3–4 depth-sorted cloud and halo planes achieve rich staging on mobile and laptop GPUs.', '三至四层按深度差速移动的流云与背光光晕即可构建丰富空间感，确保全终端满帧流畅运行。']
    ]
  ),
  'gpt-62-motion-recreations': study(
    'Frontier Model Zero-Shot Motion Synthesis Benchmark · Spatial Math, Physics Intuition & Visual Self-Repair',
    '前沿代码模型程序化动画基准复现 · 空间几何推演、连续物理直觉与无头渲染自修复能力评测',
    [
      s('BENCHMARK TASKS', '多维空间与动态编码试金石', '3D Projection, Articulated IK & Fluid/Particle', '复杂三维透视变换、多关节协调运动与连续粒子场合成', 'Tests whether models truly understand continuous space-time vs memorizing static UI templates', '跳出常规增删改查表单，直测大模型对连续三维旋转、关节相位协调与光影构图的内生理解力', 'runs zero-shot', '零样本生成自包含代码'),
      s('SINGLE-FILE CODEGEN', '单文件零依赖高密图形实现', 'Pure HTML5 Canvas / WebGL / SVG Math', '不依赖庞大外部素材库，纯数学公式构建几何造型与着色', 'Exposes raw spatial reasoning precision, coordinate frame consistency & shader fluency', '在无预制美术贴图遮羞的条件下，直观暴露模型在坐标系正负号、遮挡排序与帧循环上的真实功底', 'audits render', '多时间点截图与边界校验'),
      s('CONTACT-SHEET QA', '时间序列采样与几何异常检测', 't=0..5s Contact Sheet, NaN Check & FPS Probe', '等间隔多帧拼图审阅、画布越界空白检测与控制台零报错', 'Distinguishes lively continuous choreography from static drawings with trivial jitter', '通过连续时间帧拼图核验画面是否具备真实起承转合动态演进，过滤仅做微小抖动的伪动画', 'compares cohorts', '沉淀多代际模型能力演进谱'),
      s('CAPABILITY DELTA', '前沿模型视觉空间编码能力分野', 'Proportion Accuracy, Motion Grace & Edit Stability', '造型结构准确度、运动节奏自然度与多轮微调不崩坏能力对比', 'Guides architects on choosing the right frontier model tier for interactive visual artifacts', '为构建高标准客户交互演示、技术可视化与创意原型提供实测支撑的模型选型参考')
    ],
    [
      ['Motion Codegen Exposes True Spatial World Modeling', '动态图形代码生成是检验模型三维空间心智的最佳显微镜', 'Models cannot fake smooth articulated gait or perspective occlusion via boilerplate snippets.', '脚踏车踩踏连杆闭合与三维透视前后遮挡无法靠背诵模板蒙混过关，直接反映几何推理上限。'],
      ['Static Screenshot Checks Miss Temporal Brokenness', '仅截首帧静态图无法发现物理发散与时间轴卡死缺陷', 'Always sample a multi-timestamp frame strip (0s, 1s, 2s, 4s) to verify sustained motion.', '自动化验收必须在多个时间节点连续采样比对帧间差异，拦截首帧正常但随后飞出屏幕的失控实现。'],
      ['Pair Frontier Codegen With Deterministic Bounding Helpers', '为模型提供画布安全边界与帧率自适应步长辅助契约可显著提稳', 'Normalized viewport units and `dt` clamping prevent high-refresh-rate speedups and clipping.', '统一使用归一化视口比例并对帧间时间差做上限截断，确保在 60Hz 与 120Hz 屏幕下运动速度一致。']
    ]
  ),
  'hve-animation-landscape': study(
    'High-Velocity Animation Engineering Landscape · Declarative Motion Stacks, AI Directors & Verification Gates',
    '高流速（HVE）动画工程技术全景 · 声明式动效引擎、智能体分镜编排与自动化渲染质检体系',
    [
      s('INTENT & STORYBOARD', '结构化分镜与时间轴契约', 'JSON Beat Sheet (Camera · Subject · Caption · Sec)', '将自然语言创意转化为带精确起止秒数与镜头语义的分镜契约', 'Forces explicit timing, visual hierarchy & aspect-ratio planning before rendering', '在动笔写渲染代码或调生成接口前先行锁定三幕时长、视觉主次焦点与字幕节奏表', 'selects engine', '路由最优渲染执行底座'),
      s('RENDERING STACKS', '四大现代动画工程底座选型', 'Remotion/SVG · Canvas/p5 · Three.js/WebGL · DiT', '声明式组件视频、手绘物理画布、实时三维与生成式视频协同', 'Maps data explainers, expressive 2D illustration, 3D product twins & cinematic B-roll cleanly', '让技术图解、艺术水彩绘本、可交互三维沙盘与电影感空镜各自落入最高确定性的工程工具链', 'synthesizes audio', '耦合程序化配乐与旁白'),
      s('AUDIO-VISUAL LOCK', '语音节拍驱动与程序化音景', 'TTS Word Timestamps + Procedural SFX Stems', '逐词语音时间戳反向驱动画面元素入场与转场音效锁相', 'Eliminates manual timeline nudging when script copy or language edition changes', '以语音时间轴或节拍网格作为全局唯一主时钟，中英文双语版本自动伸缩镜头时长保持严密同步', 'verifies output', '通过五重无头质量门禁'),
      s('AUTOMATED QA GATE', '无头抽帧拼图与多维断言门禁', 'Zero Console Error · BBox Fit · Contrast · Audio', '浏览器零报错、文字零裁剪重叠、前景对比度与音轨非静音核验', 'Catches dark-on-dark text, clipped labels & silent exports before human review', '在交付前全自动拦截文字出界、暗色背景低对比度看不清及音轨漏合成等高频工程事故')
    ],
    [
      ['Use Audio/Beat Timestamps as the Master Clock', '以旁白逐句时间戳或音乐节拍网格作为动画全局唯一主时钟', 'Driving visual transitions from semantic timestamps makes bilingual localization effortless.', '用语义时间锚点而非写死帧号驱动画面切换，中英文语速差异即可自动无损适配。'],
      ['Contact-Sheet Inspection Accelerates Iteration 10×', '自动导出九宫格关键帧拼图能十倍加速视觉审阅与缺陷定位', 'Reviewing a 3×4 timestamp grid surfaces layout, pacing, and contrast bugs in one glance.', '单张带时间戳标尺的关键帧总览图即可一眼看穿全片构图空洞、转场穿帮与字幕遮挡问题。'],
      ['Build Reusable Motion Primitives Instead of One-Off Hacks', '沉淀可复用的弹簧过渡、聚光高亮与流向粒子标准组件库', 'Curated camera, callout, and transition primitives raise baseline quality across every run.', '把经过验证的优雅缓动曲线、高亮标注框与具名转场封装为标准原语，持续抬高每次交付审美下限。']
    ]
  ),
  'knowledge-explainer-animation-study': study(
    'Technical Knowledge Explainer Animation Architecture · Cognitive Load Control, Morphing & Dual-Locale Build',
    '技术知识图解动画架构研究 · 认知负荷收敛、渐进式拓扑生长、公式形变与双语同源编译',
    [
      s('COGNITIVE SCOPING', '工作记忆与信息密度预算', '≤4 Active Nodes per Beat & Progressive Reveal', '单镜头同屏新概念不超过四个，随讲解节奏渐进点亮拓扑', 'Prevents dumping a 30-box enterprise architecture diagram onto screen at frame 0', '严禁第零帧直接糊出三十个框的复杂大图，按数据流向逐跳生长并在聚焦局部时柔化背景', 'choreographs morphs', '设计连续空间锚定形变'),
      s('CONTINUOUS MORPH', '空间位置锚定与平滑演进', 'Stable Node IDs Across Baseline → Optimized Diff', '基线痛点态到优化架构态平滑形变，保持组件空间坐标连续', 'Viewers track architectural changes effortlessly when unchanged blocks keep fixed positions', '对比优化前后架构时固定未变模块坐标，仅对新增缓存或拆分节点做原位展开与色彩重映射', 'binds telemetry', '耦合真实量化指标跳变'),
      s('METRIC CALLOUTS', '数据与微图表动态联动', 'Synchronized Latency/Cost Bars & Packet Pulses', '请求脉冲流经关键节点时同步刷新时延与成本对比柱状图', 'Connects structural mechanism directly to measurable P95 latency and TCO impact', '让数据脉冲穿过具体优化环节的瞬间同步触发右侧耗时与成本指标回落，直观闭合因果链条', 'compiles locales', '同源场景双语无损出片'),
      s('BILINGUAL COMPILE', '中英双语排版预算与同源构建', 'CJK/Latin Width-Aware Wrapping & Locale Tokens', '针对英文长单词与中文紧凑字宽自适应计算节点框与换行预算', 'Produces zero-clipping EN and ZH editions from one shared single-source scene definition', '单套拓扑逻辑配合感知字符像素宽度的自动折行引擎，一次构建同时输出零截断中英双版')
    ],
    [
      ['Progressive Topology Growth Beats Static Wall-of-Boxes', '随数据流渐进生长的架构演进远比静态满屏方框易懂', 'Introduce ingress first, expose the bottleneck second, and morph in the fix third.', '先亮出请求入口，再复现瓶颈阻塞变红，最后原位展开解耦组件化解拥塞，三步讲透核心原理。'],
      ['Preserve Spatial Constancy Across Comparison States', '前后方案切换时保持同名组件屏幕坐标不变可大幅降低理解阻力', 'Moving identical services to random coordinates across slides forces viewers to re-parse.', '相同职责模块在演进前后切勿随意跳变位置，保持空间锚定能让观众一眼锁定真正的变化点。'],
      ['Measure Pixel Width Differently for CJK vs Latin Labels', '双语共用图形引擎必须区分全角汉字与半角拉丁字符像素宽度', 'Character-count wrapping clips Chinese or overflows English; budget by visual em-width.', '单纯按字符个数折行必然导致中文过早截断或英文撑破边框，必须按双语实际视觉字宽动态测算。']
    ]
  ),
  'neural-relighting-causal-video-study': study(
    'Causal Video Neural Relighting Architecture · Temporal G-Buffer Consistency, HDRI Conditioning & Flicker Control',
    '因果视频神经重打光架构研究 · 跨帧内蕴分解稳定性、球谐/HDRI 光照注入与长序列抗频闪机制',
    [
      s('TEMPORAL G-BUFFER', '跨帧一致内蕴通道估计', 'Causal Normal/Albedo Extractor + Optical Flow', '因果滑动窗口法线与反照率提取，消除逐帧独立估计跳变', 'Stabilizes surface orientation and base color across moving subjects and camera pans', '在反照率与表面法线提取阶段引入跨帧特征对齐，从源头遏制单图估计器固有的帧间明暗抖动', 'projects irradiance', '计算目标物理着色先验'),
      s('IRRADIANCE HINT', '显式物理漫反射与高光引导图', 'Split-Sum PBR Pre-Shading From Target HDRI', '用目标环境贴图与估算粗糙度先行解算物理一致粗打光特征', 'Bridges exact 3D light direction math with generative shadow/subsurface synthesis', '将目标光源三维方位角与材质粗糙度转化为精确像素级亮暗先验图，消除扩散模型方向乱猜', 'runs causal DiT', '因果潜空间流式去噪'),
      s('CAUSAL VIDEO DIT', '分块因果注意力与 KV 曝光锁', 'Rolling Latent KV Cache + First-Frame Chromatic Pin', '分块流式推理共享参考帧键值缓存，锁死全局色温与服装本色', 'Supports arbitrarily long video streams with bounded VRAM and smooth moving shadows', '支持低延迟流式处理长视频片段，确保旋转光源或人物转身时投射阴影平滑连续不跳帧', 'audits artifacts', '定量检测频闪与身份保真'),
      s('QUALITY METRICS', '时序平滑度与重打光物理一致性', 'Warp-Error Flicker, LPIPS Identity & Light Dir', '光流对齐残差频闪率、人脸商品结构保持度与高光角度误差评估', 'Separates production-ready video relighters from flickering per-frame image wrappers', '建立兼顾空间光影真实感与时间域零呼吸闪烁的双重验收标尺，指导影视电商选型')
    ],
    [
      ['Per-Frame Image Relighting Fails Catastrophically on Video', '将单图重打光模型简单逐帧套用于视频必然产生严重频闪', 'Stochastic diffusion shadows jump every frame without cross-frame KV attention.', '缺乏跨帧潜空间键值共享与光流约束时，每帧随机采样的暗部阴影与高光边缘会剧烈跳动。'],
      ['Coarse PBR Shading Buffers Anchor Exact Light Direction', '前置轻量物理粗渲染引导图能低成本锁死复杂多光源方向', 'Neural refinement adds soft contact shadows and SSS on top of deterministic PBR direction.', '用廉价物理着色锁定主光角度与硬边界，再由神经扩散补全次表面散射与环境互反射，分工最优。'],
      ['Pin Reference Albedo Statistics Over Long Causal Rollouts', '长视频流式重打光须锚定首帧固有色统计量防止色偏累积', 'Without chromatic anchoring, causal chunks gradually drift toward oversaturated tints.', '在分块自回归衔接处对齐非高光区固有色分布，可有效阻断长镜头尾段的色温漂移。']
    ]
  )
};

const FULL_STUDY_MAP = {};
for (const [slug, spec] of Object.entries(VISUAL_STUDY_SPECS)) {
  FULL_STUDY_MAP[`animation/research/${slug}`] = spec;
  FULL_STUDY_MAP[`generative-visual-lab/research/${slug}`] = spec;
}

module.exports = { VISUAL_STUDY_SPECS: FULL_STUDY_MAP };
