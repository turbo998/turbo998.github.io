'use strict';
const { stage: s, entry } = require('./policy.cjs');

const GAME_STUDIO_SPECS = {
  'gpt-6-2-motion-studies/index': entry(
    'visual',
    'GPT-6.2 Sol Procedural Motion Exhibit · Deterministic Canvas Studies, Spring Kinematics & Reduced-Motion Fallbacks',
    'GPT-6.2 Sol 程序化运动视觉展厅 · 确定性画布仿真、弹性逆运动学与无障碍静帧回退',
    [
      s('MOTION STUDIES', '四组独立程序化运动习作', 'Peacock · Crane · Pendulum · Orbital Lattice', '孔雀开屏、鹤翼气动、耦合摆群与轨道晶格四组画布实验', 'Isolates feathered fan spread, wingbeat phase lag & harmonic coupling in pure Canvas2D', '在纯浏览器画布中分别验证扇羽展开弧度、翼尖相位滞后与多摆谐振相位锁定精度', 'solves physics', '驱动确定性时间步积分'),
      s('SPRING KINEMATICS', '二阶弹簧阻尼与逆运动学', 'Critically Damped Springs & Analytic 2-Bone IK', '临界阻尼弹簧模型与解析法双骨骼逆运动学求解', 'Prevents joint flipping and overshoot under variable browser requestAnimationFrame dt', '通过时间步长钳制与解析关节极向量约束，消除跨刷新率浏览器下的肢体翻转与抖动', 'renders layers', '提交分层矢量与光晕绘制'),
      s('LAYERED CANVAS', '低开销分层路径与色散合成', 'Batched Path2D Strokes & Additive Gradients', '批量几何路径提交、径向渐变光晕与零外部纹理依赖', 'Holds 60 FPS across 4 concurrent exhibits via viewport intersection pause gating', '结合视口可见性交叉观察器自动冻结屏外画布，保障多展品同页滚动依然维持满帧流畅', 'honors a11y', '遵循系统减动效无障碍契约'),
      s('REDUCED MOTION', '无障碍静态关键帧与重播控制', 'prefers-reduced-motion Hero Pose & Manual Scrub', '系统减弱动态效果自动定格代表性姿态与手动单作品启停', 'Renders composed equilibrium frames immediately when OS motion reduction is active', '检测到系统开启减弱动态效果时直接渲染平衡态构图关键帧，兼顾视觉审美与阅读舒适度')
    ],
    [
      ['Pause Offscreen Exhibits via IntersectionObserver', '多画布展厅页必须基于视口可见性冻结离屏动画循环', 'Running 4 simultaneous 60 FPS Canvas loops drains laptop GPUs; gate active ticks strictly.', '仅对当前处于视口内的展品执行帧更新，避免后台不可见画布持续空转消耗终端电量。'],
      ['Clamp Delta-Time Before Stepping Spring Integrators', '弹簧与摆群积分器在背景标签页切回时必须钳制最大时间步', 'Cap dt <= 33 ms so tab-switching never explodes spring velocities off-canvas.', '限制单帧最大物理步长不超过 33 毫秒，彻底杜绝切换浏览器标签页引发的弹性发散崩坏。'],
      ['Treat Reduced-Motion Pose Selection as First-Class Design', '将无障碍静态定格帧视作一等公民精心挑选平衡构图相位', 'Pick a golden-ratio phase t0 rather than t=0 collapsed geometry for static viewers.', '为静态模式指定最具张力的展开相位而非零时刻折叠态，确保静态阅读同样具备完整表现力。']
    ]
  ),
  'game/demos/scrap-swarm/design/index': entry(
    'game',
    'Scrap Swarm Systems Design Specification · Frame-Locked Combat Loop, Wave Budget & Procedural Audio',
    '《Scrap Swarm》游戏系统架构设计规范 · 确定性帧循环、波次刷怪预算曲线与程序化音效混合',
    [
      s('GAMEPLAY LOOP', '核心战斗与经济循环', 'Move-AutoFire-Salvage-Upgrade Cycle', '走位规避、自动索敌射击、废料拾取与构筑升级闭环', 'Balances spatial kiting pressure against risk-reward scrap magnet collection windows', '通过拾取半径与波次包围压力耦合，构建高密度走位博弈与局内构筑正反馈循环', 'ticks simulation', '驱动固定步长物理仿真'),
      s('FIXED-STEP ECS', '确定性实体更新与碰撞', '60 Hz Fixed Timestep & Spatial Hash Grid', '固定物理时间步长、对象池复用与空间网格碰撞裁剪', 'Zero GC allocation per frame via typed pools and O(1) cell neighborhood broadphase', '采用预分配定长对象池与均匀网格宽相裁剪，消除百级弹幕同屏时的垃圾回收掉帧毛刺', 'paces difficulty', '受控于波次难度导演'),
      s('DIRECTOR CURVE', '波次威胁点数与掉落配平', 'Piecewise Threat Budget & XP/Scrap Slope', '分段威胁预算增长函数、精英怪节奏与经验阈值曲线', 'Prevents DPS snowballing or unwinnable stat walls across 10-minute survival arcs', '精确配平玩家秒伤成长斜率与敌群血量速度膨胀比，防止后期数值碾压失控或卡关暴毙', 'mixes WebAudio', '触发受控程序化音频'),
      s('AUDIO & TELEMETRY', 'WebAudio 合成与掉帧监控', 'Polyphony Limiter, Ducking & P99 Frame HUD', '并发发声上限裁剪、主重音闪避压缩与帧耗时遥测', 'Caps simultaneous hit synths to prevent clipping while surfacing live P99 frame ms', '限制高频命中音效并发数防止爆音失真，并实时采集渲染与物理分项帧耗时指标')
    ],
    [
      ['Spatial Hashing + Object Pools Prevent GC Stutter', '定长对象池配空间哈希是浏览器高密弹幕流畅底线', 'Eliminate per-bullet object churn to hold 60 FPS under hundreds of active entities.', '彻底避免逐帧新建与销毁子弹对象，将同屏数百实体碰撞检测压入亚毫秒级预算。'],
      ['Design Wave Budgets Around Effective Player DPS', '围绕玩家各阶段期望有效秒伤反推波次生命值总量', 'Tie enemy HP/spawn rates to expected upgrade curves so build choices stay meaningful.', '按构筑分支期望输出能力设定刷怪密度与精英穿插节点，确保策略选择具有真实区分度。'],
      ['Polyphony Stealing Protects Combat Readability', '高密度打击反馈必须内置并发声道抢占与动态压限', '200 simultaneous hit sounds muddy cues; prioritize boss telegraphs and player damage.', '对同类高频受击音效实施冷却合并与声道上限控制，确保首领预警音清晰可辨。']
    ]
  ),
  'game/research/hve-animation-and-game-engineering': entry(
    'game',
    'AI-Assisted Game & Interactive Engineering · Spec-First Decomposition, Asset Contracts & Playtest Gates',
    '高流速（HVE）交互与游戏工程方法论 · 规格先行拆解、资产管线契约与自动化可玩性门禁',
    [
      s('SYSTEM SPEC', '系统数值与状态机规格化', 'State Tables, Hitboxes & Economy Schemas', '显式状态转换表、判定框参数与数值配平数据表', 'Separates declarative balance tables (JSON/TS) from imperative rendering & input code', '将角色状态机、碰撞框尺寸与经济成长曲线抽离为声明式配置表，与底层渲染代码解耦', 'generates modules', '驱动分模块智能体构建'),
      s('MODULAR BUILD', '正交子系统分治实现', 'Input · Physics · AI · VFX · Audio Planes', '输入缓冲、确定性物理、行为树、粒子表现与音效正交拆分', 'Scopes coding agents to isolated subsystems with crisp interface contracts', '按职责边界拆分独立子模块与清晰数据结构契约，避免单文件巨石耦合导致多轮修改回归', 'synthesizes assets', '接入受控视觉与音频管线'),
      s('ASSET PIPELINE', '程序化与生成式资产接入', 'Sprite Atlases, Shaders & Synth Presets', '精灵图集规范、程序化着色器与轻量合成音效资产', 'Enforces palette consistency, pivot alignment & memory budgets before runtime load', '统一约束纹理尺寸、锚点对齐与色板规范，保障单包极速加载与视觉风格高度统一', 'runs headless QA', '执行自动化仿真巡检'),
      s('HEADLESS PLAYTEST', '无头高速仿真与回归门禁', 'Bot Survival Runs, FPS Floor & Deadlock Check', 'AI 策略机器人千局速跑、帧率底线与卡死边界核验', 'Simulates hundreds of accelerated runs to catch softlocks, NaN physics & broken builds', '通过脱屏超倍速自动对局巡检数值崩坏、地形卡死与内存泄漏，实现每次提交可量化验收')
    ],
    [
      ['Data-Driven Balance Tables Unlock Rapid Iteration', '数据驱动的数值配置表是人机协同高频调优的核心', 'Keep weapon/wave numbers out of hardcoded loops so bots and designers tune safely.', '将配平参数与循环逻辑彻底分离，使自动化测试与人工手感微调无需反复改动核心引擎代码。'],
      ['Headless Fast-Forward Bots Catch Softlocks Early', '无头倍速测试机器人能低成本捕获死胡同与数值溢出', 'Run deterministic bot policies for 10,000 ticks in CI before manual playtesting.', '在人工试玩前先用确定性测试脚本跑完极端波次，提前拦截坐标异常与状态机死锁。'],
      ['Enforce Frame-Time & Bundle Budgets Automatically', '在构建门禁中硬性卡控包体体积与单帧脚本耗时上限', 'Web interactive demos lose CTO/partner audiences instantly if initial load or FPS lags.', '网页端交互作品必须严守首屏秒开与稳定满帧底线，防止重资源阻塞冲淡技术演示说服力。']
    ]
  ),
  'game/research/partner-demo-playbook': entry(
    'game',
    'Enterprise Partner Interactive Demo Playbook · 90-Second Arc, Deterministic Presets & Offline Fallbacks',
    '面向合作伙伴与技术高管的交互演示设计手册 · 90 秒价值主线、确定性预设与离线兜底机制',
    [
      s('90-SECOND HOOK', '前 90 秒核心架构锚点', 'Problem Contrast → Live Control → Metric Proof', '基线痛点直观复现、实时参数拨动对比与量化指标定格', 'Opens directly on an interactive A/B comparison rather than static title splash screens', '摒弃冗长欢迎页，首屏即呈现朴素方案失真与目标架构修复的同屏交互对照与实时指标', 'curates presets', '内置典型行业工况预设'),
      s('CURATED PRESETS', '一键复现黄金工况槽位', 'Nominal · Stress Spike · Failure Recovery', '常规稳态、十倍突发洪峰与故障注入恢复三档标准预设', 'Lets presenters trigger exact architectural cliffs reliably with one click during Q&A', '内置经过严格校验的一键工况预设，方便现场随时响应客户高管关于极端边界的追问', 'exposes telemetry', '同步透明化底层证据'),
      s('GLASS-BOX HUD', '白盒化协议与指标监视器', 'Live Payloads, Latency Waterfall & Cost Ledger', '实时协议报文、分阶段耗时瀑布流与成本核算面板', 'Proves authenticity to skeptical engineers by exposing underlying state transitions', '向技术审阅者实时敞开底层状态流转、载荷结构与公式推演过程，建立扎实工程可信度', 'guarantees uptime', '配备断网零依赖兜底'),
      s('ZERO-DEPENDENCY', '展厅与内网离线高可靠交付', 'Recorded Replay + Local Deterministic Engine', '预录真实封存轨迹回放与本地确定性计算引擎双保险', 'Never fails on conference Wi-Fi, API rate limits, or expired cloud tokens', '将封存实测轨迹与本地确定性仿真结合，确保在客户内网或展会弱网环境下百分百稳定运行')
    ],
    [
      ['Show the Baseline Failure Mode Side-by-Side', '同屏展示基线方案失效现场最能直观建立架构共识', 'Architectural value becomes unmistakable when viewers toggle guardrails off and on live.', '支持现场一键关闭或开启核心技术机制，让观众亲眼看见抖动、越权或幻觉如何被精准收敛。'],
      ['Never Depend on Uncached Live LLM Calls on Stage', '重要客户现场演示严禁单点依赖无兜底公网模型调用', 'Pair live optional endpoints with sealed deterministic replay fixtures and clear provenance.', '在线接口必须配置超时秒切封存真实轨迹能力，并诚实标注实时调用与封存回放的数据来源。'],
      ['Respect Executive Cognitive Load on Screen', '单屏信息密度服务于决策结论而非堆砌无关炫技动效', 'Highlight 3–4 decisive KPIs and one crisp architecture flow; tuck raw logs into drawers.', '主视图聚焦核心对比指标与架构主链路，详细调试报文收折于按需展开抽屉中。']
    ]
  ),
  'game/research/scrap-swarm-technical-assets': entry(
    'game',
    'Scrap Swarm Technical Asset & Engine Breakdown · Canvas Batching, Steering Fields & Synth Soundscape',
    '《Scrap Swarm》技术资产与运行时拆解 · 2D 批量渲染管线、群体寻路流场与合成音效工程',
    [
      s('SWARM STEERING', '百级敌群寻路与防重叠', 'Flow Vector Field + Local Separation Force', '目标距离流场寻路叠加局部邻域排斥分离向量', 'Moves hundreds of chasers smoothly around obstacles without per-agent A* spikes', '所有追踪单位共享单张玩家距离流场并叠加网格局部排斥力，彻底免除逐单位寻路开销', 'feeds collision', '进入宽窄两相碰撞检测'),
      s('COLLISION & HIT', '零分配碰撞与伤害结算', 'Uniform Spatial Grid + Piercing Knockback', '均匀空间哈希网格裁剪、穿透衰减与受击硬直位移', 'Resolves thousands of projectile-enemy pairs per second in flat typed arrays', '基于定长数组维护位置、半径与穿透计数，高效完成高射速穿透武器与击退物理反馈', 'renders frames', '提交分层批量绘制管线'),
      s('CANVAS PIPELINE', '分层渲染与受击视觉反馈', 'Ground Decal → Shadow → Sprite → Hit-Flash', '地面残骸缓存层、接触阴影、主体与受击白闪分层绘制', 'Minimizes context state switches and caps particle counts under heavy explosions', '合并同材质绘制状态并将静态碎屑烘焙至离屏缓存层，保障连锁爆炸时帧率平稳', 'triggers synths', '联动程序化音效节点'),
      s('SYNTH ENGINE', '零外部音频文件 WebAudio 管线', 'FM/Noise Oscillators, Envelope & Bus Limiter', '振荡器/噪声包络实时合成与主总线防削波动态限幅', 'Generates crisp weapon, pickup & boss cues in <4 KB of pure code', '纯代码实时生成射击、磁吸拾取与首领警报音效，实现零音频资源下载的瞬时启动体验')
    ],
    [
      ['Shared Flow Fields Scale O(Grid), Not O(Agents)', '共享距离流场将群体寻路开销与敌群数量彻底解耦', 'Doubling enemy density costs zero extra pathfinding when agents sample one flow grid.', '无论同屏刷出五十只还是五百只追踪怪，全局流场每数帧仅需按地图网格更新一次。'],
      ['Hit-Stop, Knockback & Flash Carry Game Feel', '受击白闪、微击退与屏幕震动衰减共同决定打击感', ' Crisp 40ms hit-flash and damped impulse communicate impact without heavy 3D assets.', '精准调校数十毫秒的受击高亮与阻尼击退反馈，用极简几何图形即可塑造扎实的战斗手感。'],
      ['Bake Persistent Debris Into Offscreen Canvas Layers', '将静态战场痕迹烘焙至离屏画布消除历史累加开销', 'Stamping scorch marks/scrap shadows onto a background buffer keeps draw calls bounded.', '把不再移动的爆炸痕迹绘制到背景缓存层，既保留丰富战场演化叙事又维持恒定绘制开销。']
    ]
  ),
  'game/research/wanan-midnight-technical-assets': entry(
    'game',
    'Wangan Midnight Procedural Highway Architecture · Road Curvature Projection, Traffic AI & Night Shaders',
    '《湾岸午夜》程序化高速驾驶技术拆解 · 曲率坡度透视投影、车流变道 AI 与夜景光影合成',
    [
      s('ROAD GEOMETRY', '分段曲率与高程赛道模型', 'Spline Segments, Banking & Horizon Projection', '弯道曲率、坡度起伏分段参数化与透视扫描投射', 'Streams infinite expressway geometry from compact curvature/elevation tuples', '用紧凑的曲率与高程控制段描述整条环状高架，逐帧推演相机前方视距内路面透视梯形', 'simulates vehicle', '耦合车辆轮胎抓地模型'),
      s('VEHICLE PHYSICS', '高速抓地、尾流与碰撞物理', 'Slip Ratio, Draft Boost & Guardrail Friction', '转速扭矩曲线、前车尾流减阻加速与擦碰速度衰减', 'Balances accessible arcade responsiveness with high-speed cornering commitment', '融合档位扭矩输出、紧贴前车尾流增压与过弯离心滑移模型，还原高速穿插紧张感', 'schedules traffic', '调度前向动态社会车流'),
      s('TRAFFIC DIRECTOR', '多车道社会车辆生成与变道', 'Ahead-Window Spawning & Turn-Signal Lane AI', '视距窗口动态刷车、转向灯预判提示与安全间距礼让', 'Guarantees solvable weaving gaps so dense traffic never creates unavoidable walls', '在密集车流生成时强制校验至少一条可通行缝隙并提前闪烁变道转向灯，兼顾刺激度与公平性', 'renders night mood', '渲染都市霓虹与动态模糊'),
      s('NIGHT COMPOSITING', '都市流光、尾灯拖影与引擎声浪', 'Sodium Streetlights, Motion Streaks & RPM Synth', '高架路灯掠影、尾灯流光、速度线与连续转速声浪合成', 'Couples FOV, camera micro-shake & exhaust filter cutoff directly to vehicle km/h', '将视场角张开度、路面高频微震与排气滤波频率同实时车速连续绑定，强化三百公里时速沉浸感')
    ],
    [
      ['Enforce Solvable Gap Invariants in Traffic Spawners', '随机车流生成器必须内置可通行缝隙硬约束', 'Pure random lane placement inevitably spawns 3-abreast roadblocks that feel unfair.', '纯随机刷车必然出现多车道并排堵死绝境，生成算法必须保证反应时间内存在合法超车走廊。'],
      ['Tie Multi-Sensory Cues Continuously to Speed Ratio', '视觉视场角、路灯节拍与引擎谐波必须与车速连续耦合', 'FOV widening, streetlight cadence, and Continuous RPM pitch sell velocity better than blur alone.', '多感官参数随车速归一化比例同步演进，比单纯叠加全屏模糊更能传递凌厉的速度层次感。'],
      ['Recycle Road & Traffic Entities in a Sliding Z-Window', '在固定前向视距滑动窗口内循环复用路网与车流实体', 'Bound memory and draw cost strictly to visible horizon segments.', '驶出车尾视野的路段与社会车辆立即回收入池并在地平线远端重用，实现零内存增长无限巡航。']
    ]
  ),
  'animation/demos/audiovisual-foley-studio/index': entry(
    'animation',
    'Audio-Visual Sync & Procedural Foley Studio · Optical Motion Peaks, Beat Grid & FramePack Envelope Lock',
    '音画同步与程序化拟音工作台 · 运动冲击峰值提取、节拍网格对齐与多声部包络锁相',
    [
      s('MOTION EVENTS', '视觉运动冲击与接触检测', 'Velocity Zero-Crossings & Contact Impulses', '刚体碰撞速度突变、脚步触地与镜头切分事件提取', 'Extracts exact millisecond timestamps + impact energy from scene kinematics', '从骨骼/刚体速度过零点与接触力突变中提取毫秒级碰撞时刻与能量强度包络', 'quantizes timeline', '对齐音画同步时间轴'),
      s('SYNC TIMELINE', '帧级音画相位对齐器', '≤±35 ms ITU Lip/Impact Tolerance Window', '严格收敛于人类音画不同步感知阈值（±35ms）以内', 'Compares drifted unaligned audio against phase-locked event triggers', '直观对比异步拼接声画脱节感与逐帧锁相触发下的严丝合缝视听体验', 'synthesizes stems', '驱动分层拟音合成引擎'),
      s('FOLEY SYNTHESIS', '多声部物理材质拟音合成', 'Impact Transient + Surface Texture + Ambience', '瞬态撞击声、材质摩擦纹理层与空间混响底噪三层合成', 'Parametrically shapes metal, glass, cloth & whoosh transients without static wav bloat', '按碰撞材质阻尼参数实时调制瞬态包络与滤波谐振，避免单调音效样本重复机械感', 'masters loudness', '经母线响度治理输出'),
      s('LOUDNESS MASTER', '多轨动态闪避与响度门禁', 'Dialogue/Lead Priority Ducking & -14 LUFS', '主语音旁链闪避压缩、峰值限幅与响度合规测量', 'Prevents dense SFX bursts from masking narration or clipping browser output', '自动在解说词出现时压低背景环境与音效总线，确保成片响度均衡不爆音')
    ],
    [
      ['Drive Foley Triggers From Kinematic Ground Truth', '从物理碰撞与速度突变直接导出音效触发时间戳', 'Extracting contact events from scene math beats post-hoc video-to-audio guessing.', '在程序化与三维管线中直接导出碰撞时刻与冲量，精度远超成片后再用视觉模型反推音效。'],
      ['Keep Audio-Visual Drift Within ±35 ms', '人类对撞击与口型瞬态偏移的容忍极限约为 ±35 毫秒', 'Late audio up to ~45ms is slightly more tolerable than early audio, which breaks causality.', '声音早于画面发生会瞬间破坏物理因果感，工程校准须优先消灭提前发声与累积帧率漂移。'],
      ['Layer Transient + Body + Tail for Believable Foley', '真实拟音质感源于毫秒瞬态、材质共鸣与空间尾音分层', 'Single oscillator beeps sound robotic; blend filtered noise bursts with resonant decay.', '将高频瞬态冲击、中频腔体共鸣与早期反射尾音独立参数化叠加，显著提升物理可信度。']
    ]
  ),
  'animation/demos/camera-4d-director/index': entry(
    'animation',
    '4D Camera Trajectory & Plücker Ray Director · SE(3) Extrinsics, Intrinsics FOV & Dynamic World Consistency',
    '4D 相机轨迹与 Plücker 光线导演台 · SE(3) 位姿矩阵、焦距畸变与动态场景时空一致性控制',
    [
      s('SE(3) TRAJECTORY', '六自由度相机运动样条', 'Cubic Spline Pose R(t), T(t) & Arc-Length Speed', '平滑旋转四元数插值、弧长匀速化与推拉摇移预设', 'Eliminates Euler gimbal lock and velocity discontinuities across complex camera moves', '采用四元数球面插值与弧长重参数化消除万向节死锁与镜头突兀加减速抖动', 'encodes rays', '编码逐像素 Plücker 光线'),
      s('PLUCKER RAY FIELD', '像素级几何光线条件注入', '6D Plücker Coordinates (d, o × d) + FOV K', '统一融合相机内参焦距与外参位姿的稠密光线张量', 'Gives video diffusion models exact per-pixel 3D ray geometry instead of vague text prompts', '将抽象位姿矩阵转换为空间对齐的六维光线场直注扩散主干，克服纯文本运镜指令失控难题', 'decouples 4D motion', '解耦相机运动与物体运动'),
      s('4D DISENTANGLE', '主体运动与镜头运动正交解耦', 'Dynamic Object Flow vs Static World Parallax', '前景角色独立动作流与背景三维透视视差精准分离', 'Prevents camera pans from freezing subjects or warping background architecture', '确保大幅度环绕运镜时前景主体动作自然演进、背景建筑几何透视严密闭合不扭曲', 'validates pose', '闭环重投影位姿核验'),
      s('POSE VERIFICATION', '重投影误差与轨迹跟随审计', 'ATE / RPE Trajectory Error & Epipolar Check', '生成视频反解相机轨迹误差与对极几何一致性核验', 'Quantifies translation/rotation drift before accepting generated multi-camera shots', '对生成序列反跑位姿估计校核轨迹偏移与几何撕裂，保障多机位剪辑无缝衔接')
    ],
    [
      ['Plücker Rays Outperform Global Matrix Conditioning', '像素级 Plücker 光线编码显著优于全局扁平矩阵拼接', 'Spatially aligned 6D ray maps align cleanly with latent video patch tokens.', '逐像素光线张量与视频潜空间网格天然空间对齐，大幅提升变焦希区柯克镜头等复杂内参控制精度。'],
      ['Quaternion + Arc-Length Splines Prevent Motion Sickness', '四元数球面插值与弧长参数化是平滑运镜的数学基础', 'Raw keyframe linear interpolation introduces jarring angular jerks at control points.', '关键帧之间直接线性插值欧拉角会产生明显折角顿挫，前置几何平滑能显著降低生成画面撕裂。'],
      ['Separate Camera Conditioning Strength Across Denoising Steps', '按去噪阶段动态退火运镜注入强度兼顾精度与动态自然度', 'Strong early ray guidance locks 3D layout; relaxed late steps preserve fine dynamics.', '去噪早期强约束锁定三维大透视轨迹，后期适度退火释放水面衣袂等高频自然动态细节。']
    ]
  )
};

module.exports = { GAME_STUDIO_SPECS };
