'use strict';
const { stage: s, entry } = require('./policy.cjs');

const VISUAL_STUDIO_MORE = {
  'animation/demos/commercial-image-edit-benchmark-studio/index': entry(
    'benchmarks',
    'Commercial Image Edit Benchmark Studio · SKU Identity Lock, Typography Glyph Audit & Relighting Inspector',
    '商业图像编辑评测检视台 · 商品像素锁死差分热力图、多语种字形保真与光影物理一致性对比',
    [
      s('TASK TAXONOMY', '四大高价值商业修图场景', 'BG Swap · Poster Text · Multi-Turn · Relight', '商品换景合成、中英促销排版、多轮局部指令与重打光', 'Mirrors real e-commerce SKU production where brand geometry cannot drift', '对标电商主图与品牌投放刚需场景，严苛检验局部精准修改与主体零畸变底线', 'inspects pixel diff', '叠加非编辑区差分热力图'),
      s('DIFF HEATMAP', '非编辑区像素漂移检测', 'Masked L1/LPIPS Drift & Logo Edge Integrity', '商品本体差分热力高亮、包装文字与轮廓边缘锐度核查', 'Exposes subtle hallucinated texture rewrites that casual visual glances miss', '通过像素级差分放大镜直观暴露模型重绘商品本体导致的色差、标识模糊与材质塑料化', 'compares model tiers', '双档模型同框对比'),
      s('QUALITY VS LATENCY', '标准版与极速版帕累托对比', 'MAI-Image-2.7 vs 2.7-Flash (121 Sealed Runs)', '成片一次可用率、端到端生成秒数与单张调用成本权衡', 'Quantifies exact latency savings vs fine-detail fidelity across task categories', '基于 121 轮实测分布展示不同任务难度下两档模型的可用率差距与时延加速倍率', 'exports workflow', '输出人机协同生产规范'),
      s('HYBRID PIPELINE', '电商视觉工业化落地管线', 'Flash Exploration → 2.7 Render → Vector Overlay', '极速版探构图、旗舰版出底图与确定性矢量文字合成', 'Combines generative lighting/scene synthesis with pixel-exact SKU & font compositing', '将生成式环境光影融合能力与确定性商品抠图回贴、矢量价格排版结合，实现百分百商业合规')
    ],
    [
      ['Audit Non-Target Regions With Pixel Difference Maps', '评估商业修图模型必须用差分图核查非目标区域零篡改', 'A model that beautifies background while subtly altering the product SKU fails production.', '任何擅自重绘商品微距结构或改变品牌标准色的“全图好看”生成结果在商业投放中均属不合格。'],
      ['Multi-Turn Edits Suffer Cumulative Re-Encoding Drift', '连续多轮自回归修图易引发画质衰减与色彩漂移', 'Consolidate validated edits back onto the clean source plate after 2–3 exploratory turns.', '超过三轮连续局部修改后应基于原始高清底图一次性合并重出，防止多次编解码累积糊化。'],
      ['Composite Exact SKU & Legal Copy Deterministically', '高敏包装标识与促销价格坚持采用确定性图层回贴', 'Use generative models for environment and shadow integration, not regulated barcode/price pixels.', '让大模型专注光影反射与场景融合，核心商品像素与法规字样由合成管线精确锁定。']
    ]
  ),
  'animation/demos/knowledge-explainer-studio/index': entry(
    'animation',
    'Programmatic Technical Explainer Studio · Manim / Remotion Scene Graph, Spring Timing & Narration Sync',
    '程序化技术讲解动画工作台 · 声明式场景图、物理弹簧时序编排与逐句旁白对齐管线',
    [
      s('SCRIPT & BEATS', '技术叙事分镜与语义锚点', 'Concept Claim → Visual State Transition Beat', '核心论点拆解、公式演进节拍与时间戳语义锚点提取', 'Binds every diagram mutation to a specific spoken technical clause', '将抽象技术概念拆解为逐句旁白驱动的视觉状态跃迁序列，杜绝无意义装饰性动效', 'builds scene AST', '编译声明式几何场景图'),
      s('SCENE GRAPH', '精确坐标与无碰撞布局引擎', 'Vector Nodes, LaTeX/Code Blocks & Auto-Routing', '矢量架构框、代码公式排布与正交防穿模连线计算', 'Guarantees crisp 4K vector legibility and zero overlapping text labels', '基于精确数学坐标与边界框避让规则排布节点连线，彻底消除像素视频模型的文字乱码顽疾', 'animates springs', '驱动物理阻尼过渡动画'),
      s('MOTION CHOREO', '注意力引导与弹簧缓动曲线', 'Critically Damped Springs, Spotlight & Morph', '临界阻尼弹簧曲线、局部聚光降噪与公式平滑形变', 'Dims inactive subsystems to guide viewer eye movement across complex topologies', '在讲解复杂系统局部细节时自动压暗外围模块透明度，通过平滑形变保持空间记忆连贯', 'renders deterministic', '确定性无头合成成片'),
      s('HEADLESS RENDER', '逐帧确定性渲染与多规格导出', '60 FPS Chromium/FFmpeg + Bilingual Subtitles', '帧级确定性光栅化、中英双语字幕轨与 16:9/9:16 双出', 'Version-controlled code regenerates updated benchmarks in minutes when numbers change', '评测数据更新时仅需修改结构化数据文件即可全自动重出双语高清视频，实现视频资产代码化维护')
    ],
    [
      ['Never Use Pixel Diffusion for Text-Heavy Architecture Diagrams', '含密集指标与架构图的讲解视频严禁直接用文生视频硬出', 'Programmatic SVG/Remotion/Manim guarantees 100% legible typography and exact numbers.', '技术图解的核心价值是字符与数字绝对准确，程序化矢量渲染在清晰度与可维护性上具备压倒性优势。'],
      ['One Visual Focus per Narration Sentence', '每个旁白句子周期内只允许一处核心视觉焦点发生跃迁', 'Simultaneous multi-corner animations split visual attention and destroy comprehension.', '多处元素同时闪烁位移会击穿观众工作记忆上限，必须严格遵循单焦点聚光递进原则。'],
      ['Code-Driven Video Enables Diffable Technical Updates', '代码化视频让架构演进像更新文档一样支持差异对比与重编译', 'Store explainer scenes in Git so new model scores rebuild clean MP4s automatically.', '将分镜逻辑纳入版本库管理，新模型基准数据出炉后分钟级自动重渲染中英双语成片。']
    ]
  ),
  'animation/demos/neural-relight-director/index': entry(
    'animation',
    'Intrinsic Decomposition & Neural Relighting Director · Albedo/Normal/Roughness G-Buffer & HDRI Transport',
    '神经逆渲染与动态重打光导演台 · 反照率/法线/粗糙度内蕴分解与环境贴图物理光传输',
    [
      s('INTRINSIC G-BUFFER', '单目视频物理内蕴属性分解', 'Albedo + Surface Normals + Roughness + Depth', '剥离固有反照率、几何法线、材质粗糙度与景深通道', 'Removes baked original lighting shadows from albedo while stabilizing temporal normals', '从输入画面中干净剥离原有烘焙阴影提取纯材质本色，并保持跨帧表面法线几何稳定无闪烁', 'injects target light', '注入目标环境光与主光源'),
      s('LIGHT CONDITIONING', '球谐环境光与三维点聚光源', 'Rotating HDRI Lat-Long + Key/Rim Light Rig', '全景环境贴图旋转、主辅轮廓光色温与阴影软硬度控制', 'Computes physically plausible diffuse irradiance and specular prefiltered maps', '依据物理微表面反射方程实时预计算漫反射辐照度与镜面高光反射分布作为控制引导', 'synthesizes transport', '生成次表面与软阴影细节'),
      s('CAUSAL DIFFUSION', '时序一致神经光传输合成', 'IC-Light / Causal Video Relighter + Shadow Cast', '补全高阶互反射、软接触阴影与皮肤次表面散射质感', 'Synthesizes realistic cast shadows and specular roll-off without altering subject identity', '在保持人物五官与商品几何丝毫不走形的前提下，自然合成复杂投射阴影与高光流动', 'verifies conservation', '校验色彩能量守恒与抗频闪'),
      s('TEMPORAL AUDIT', '跨帧亮度抗频闪与本色保真核验', 'Albedo Chromatic Lock & Flicker PSD Gate', '非受光本色偏移监控与跨帧亮度功率谱抗闪烁校验', 'Flags baked-highlight ghosts and frame-to-frame exposure pumping before export', '自动检测原图残留高光鬼影与长序列曝光呼吸闪烁，确保影视广告级成片稳定度')
    ],
    [
      ['De-Lighting Clean Albedo Is Half the Relighting Battle', '干净剥离原画面残留高光与死黑阴影是重打光成败关键', 'Residual baked shadows in estimated albedo create unnatural double-shadow artifacts.', '若反照率通道未能彻底抹除原始阴影，叠加新方向光源后必然出现违背物理常识的双重假阴影。'],
      ['Feed Explicit Shading Hints Instead of Text Light Prompts', '用物理粗渲染着色图作为引导远准于文字描述光源方向', 'Coarse PBR shading buffers give diffusion models exact shadow and highlight placement.', '先用估算的法线粗糙度算出物理粗打光图再交由神经模型精修细节，可控性远超自然语言描述。'],
      ['Lock Temporal Attention Across Lighting Sweeps', '动态扫光序列必须引入跨帧注意力与曝光平滑约束', 'Frame-independent image relighters flicker violently on video; enforce causal KV sharing.', '逐帧独立调用单图重打光模型会产生剧烈频闪，视频重打光必须跨帧共享特征并锁定全局曝光基准。']
    ]
  ),
  'animation/demos/physgaussian-world-studio/index': entry(
    'animation',
    'PhysGaussian Continuum Mechanics & 3DGS Studio · MPM Deformation Gradient, Material Laws & Real-Time Splatting',
    'PhysGaussian 连续介质物理与三维高斯工作台 · 物质点法（MPM）形变梯度与多材质实时交互',
    [
      s('3DGS SCENE KERNELS', '三维高斯辐射场体素化锚定', 'Gaussian Mean μ, Covariance Σ & Opacity/SH', '静态重建高斯椭球中心、协方差矩阵与球谐外观属性', 'Treats reconstructed 3D Gaussians directly as Lagrangian continuum particles—zero mesh conversion', '无需经历易破损的三维网格转换，直接将三维高斯核本身视作承载质量与动量的连续介质粒子', 'steps MPM solver', '执行粒子—网格混合步进'),
      s('MPM CONTINUUM', '物质点法（MPM）本构求解', 'P2G Momentum → Grid Forces → G2P Advection', '粒子到背景网格动量映射、内力边界解算与形变梯度更新', 'Supports elastic jelly, elastoplastic snow/mud, granular sand & rigid metal in one framework', '通过切换超弹性、弹塑性屈服与颗粒摩擦本构方程，在同一求解器内仿真果冻、积雪、沙土与金属', 'warps covariances', '协变更新高斯椭球形态'),
      s('COVARIANCE WARP', '形变梯度驱动高斯核几何形变', 'Σ_t = F_t · Σ_0 · F_t^T + Anisotropy Clamp', '利用局部形变梯度张量同步拉伸旋转高斯椭球协方差', 'Clamps extreme stretching ratios or splits kernels to prevent needle-shaped rendering artifacts', '限制剧烈撕裂下的极端奇异值比例或动态分裂粒子，消除过度拉伸造成的针状视觉伪影', 'rasterizes 60fps', '可微光栅化实时成片'),
      s('SPLATTING RENDER', '视角相关球谐旋转与实时光栅化', 'SH Frame Rotation & Sub-16ms Tile Splatting', '随局部刚体旋转分量同步修正球谐高光方向并极速光栅化', 'Renders interactive force pokes, wind fields & fractures without per-frame NeRF retraining', '随表面法向旋转同步更新视角高光朝向，免重新训练即可实时交互施力并渲染高保真形变动画')
    ],
    [
      ['Bypassing Triangle Meshing Unlocks Fracture & Granular Flow', '免网格转换使三维高斯天然胜任碎裂、沙雪与大形变仿真', 'Traditional FEM meshes tangle under topological tearing; MPM particle-grid handles splits natively.', '传统有限元四面体网格在撕裂与流散时极易反转崩溃，物质点法天然支持任意拓扑分离与碰撞融合。'],
      ['Fill Interior Volume Before Simulating Hollow Surface Splats', '仿真前必须对仅覆于物体表皮的空心高斯核做内部体积填充', 'Photometric 3DGS only coats outer shells; hollow shells collapse unrealistically without infill.', '多视角重建高斯核往往只分布在物体外表面，实心物体受力仿真前须向内部补充支撑体积粒子。'],
      ['Clamp Singular Values of F_t to Prevent Needle Artifacts', '必须截断形变梯度极端奇异值以消除针状拉丝伪影', 'Large plastic shear stretches Gaussians into razor spikes unless principal stretches are bounded.', '剧烈剪切大形变会将高斯椭球拉成刺眼细长针刺，渲染管线须对协方差主轴拉伸比实施硬截断。']
    ]
  ),
  'animation/demos/worldmem-action-director/index': entry(
    'animation',
    'WorldMem Long-Horizon Action World Studio · WASD Action Conditioning, Spatial Memory Bank & Loop-Closure Audit',
    'WorldMem 长时程交互世界模型工作台 · 键鼠动作控制注入、空间外挂记忆库与闭环一致性检验',
    [
      s('ACTION STREAM', '实时离散/连续交互控制输入', 'WASD Translation + Yaw/Pitch Camera Deltas', '逐帧移动方向按键与视角偏航俯仰增量动作编码', 'Conditions causal autoregressive diffusion chunks at interactive frame cadence', '以因果自回归分块流式接收玩家动作输入，实时生成对应的第一人称世界探索画面', 'writes memory bank', '写入三维位姿索引记忆库'),
      s('POSE MEMORY BANK', '位姿与视锥体索引外挂记忆', 'Keyframe Latent Cache Indexed by (x, y, z, θ)', '脱离有限滑动窗口、按空间坐标与视线方向持久化关键帧', 'Evicts redundant frames while pinning distinct spatial landmarks across minutes of exploration', '突破十几帧局部滑动窗口遗忘瓶颈，按空间覆盖度稀疏保留关键地标潜变量快照', 'retrieves overlap', '按视锥交并比召回旧场景'),
      s('FOV RETRIEVAL', '视锥体重合检索与交叉注意力', '3D Frustum Overlap Top-K → Cross-Attention', '计算当前相机视锥与历史记忆帧几何交集并精确注入', 'Restores exact room wall paintings, props & edits when turning 360° or revisiting rooms', '当玩家原地转一圈或数分钟后重返初始房间时，精准召回历史对应视角潜特征恢复原有陈设与改动', 'benchmarks drift', '量化重访PSNR与回环一致率'),
      s('LOOP-CLOSURE QA', '原地 360° 回环与长程折返评测', 'Revisit PSNR/LPIPS vs Sliding-Window Hallucination', '对比无记忆基线重访幻觉变天与外挂记忆几何纹理解锁', 'Demonstrates dramatic reduction in scene forgetting across 500+ interactive steps', '定量验证在数百步跨区域折返测试中，空间记忆机制对场景结构保持率与时间演进连贯性的跃升')
    ],
    [
      ['Sliding Temporal Windows Always Forget Revisited Places', '纯时间滑动窗口必然在原地转身或离开数秒后遗忘原场景', 'Once earlier frames drop out of context, causal video models hallucinate brand-new rooms.', '一旦初始视角滑出短窗口上下文，无空间记忆的自回归视频模型转头回来就会凭空捏造全新背景。'],
      ['Index World Memory by 3D Frustum Overlap, Not Frame Recency', '外挂记忆检索必须依据三维视锥重合度而非时间远近', 'A frame from 3 minutes ago facing the same doorway beats a frame from 1 second ago facing away.', '三分钟前正对同一扇门的关键帧价值远高于一秒前背对它的画面，几何视锥匹配能极大提纯注意力信噪比。'],
      ['Pair Pose-Tagged Memory With Timestamp Deltas for Dynamic Worlds', '同时编码空间位姿与时间差以兼容静态几何与合理环境演化', 'Timestamps let revisited scenes keep structural layout while allowing lighting/smoke to progress.', '兼顾空间锚定与时间增量编码，既锁死建筑格局不突变，又允许火焰光影等时间态自然演进。']
    ]
  )
};

for (const key of Object.keys(VISUAL_STUDIO_MORE)) {
  const gvl = key.replace(/^animation\//, 'generative-visual-lab/');
  VISUAL_STUDIO_MORE[gvl] = VISUAL_STUDIO_MORE[key];
}

module.exports = { VISUAL_STUDIO_MORE };
