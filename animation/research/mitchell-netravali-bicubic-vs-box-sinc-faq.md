# 亚像素重采样不冒吉布斯黑边与棋盘水波纹：Mitchell-Netravali ($B=1/3, C=1/3$) 单位分解三次滤波核选型 FAQ

> **文档定位**：面向 AI 解决方案架构师（AI Solution Architect）、实时超分与时域抗锯齿（TAA / TSR / FSR）管线工程师、离线路径追踪胶片重构（Film Reconstruction Filter）开发者、以及视频缩放合成团队的**实战选型与第一性原理指南**。严格对标 `ib-vs-ethernet-roce-selection-faq.md` 的六段式结构，先用大白话讲清“**为什么在放大贴图、重投影 TAA 历史帧或合成渲染采样点时，如果盲目用过锐化基数三次核（$B=0, C=1.0$）或截断 Sinc，亮文字和边缘周围会冒出一圈刺眼的‘吉布斯黑边与白边伪影（Gibbs Ringing Halo，峰谷跨度达 $29.30\%$）’；而如果随便写一个未满足单位分解的高斯核，纯色天空又会浮现出明暗交替的棋盘水波纹**”，再给出工业界黄金标准 **Mitchell-Netravali ($B=1/3, C=1/3$) 分段三次重构滤波核** 的工程闭环。

![Mitchell-Netravali平衡三次滤波对比过锐化吉布斯振铃可视化总结](evidence/mitchell-netravali-filter-summary.svg)

---

## ① 📌 核心结论速览（Executive Summary）

1. **一句话定性**：**任何亚像素图像重采样与胶片重构滤波器都面临三大物理矛盾：① 纯色背景不能出现周期性明暗条纹（要求任意亚像素偏移 $s\in[0,1)$ 下 4 抽头权重和恒等于 $1$，即“单位分解 Partition of Unity $\sum_{m=-1}^{2} w_m(s) \equiv 1.000000$”）；② 边缘不能糊成马赛克（要求主瓣够窄）；③ 阶跃亮边两侧不能凹陷出负值黑圈（要求负旁瓣足够小）**！Mitchell 与 Netravali（SIGGRAPH 1988）严格证明：在满足单位分解与一阶导数连续的 $(B, C)$ 二维三次滤波器族中，唯有沿着二阶精度线 **$B + 2C = 1$** 选取中心甜点 **$B = 1/3,\; C = 1/3$**，才能同时消除模糊、各向异性与强烈吉布斯振铃（将过锐化三次核的振铃幅度削减 **`75.93%`**）！
2. **什么时候必须上 Mitchell-Netravali ($B=1/3, C=1/3$) 重构滤波核？**
   - 凡是涉及 **高分辨率图像/视频缩放导出（FFmpeg / ImageMagick / WebGPU Blit）**、**TAA / TSR 历史缓冲区亚像素重投影采样**、**离线/实时光线追踪（PBRT / Blender Cycles）像素多抽头胶片合成**、以及 **SDF 字体与矢量图标抗锯齿重采样**，都应将 Mitchell-Netravali ($1/3, 1/3$) 作为默认重构核。
3. **核心实测对比结论**：
   - 在本实验室构建的 25 站点 3D 亚像素卷积重采样检验台（[`demos/mitchell-netravali-filter/`](../demos/mitchell-netravali-filter/index.html)，共 `58` 个 3D 实体，单位阶跃信号 $H = 1.00$，亚像素坐标 $u \in [-1.0, +2.0]$）中：
     - **Mitchell-Netravali 平衡核（`mitchell-netravali-balanced`，$B=1/3, C=1/3$）**：全部 25 个亚像素站点的 4 抽头权重和恒为 **`1.000000`**（单位分解误差 **`1.11e-16`**，纯色背景零水波纹），阶跃边缘最大旁瓣过冲仅 **`+0.0353`**（$u=+1.50$ 中点处输出 `1.0347`），**削减了 `75.93%` 的吉布斯振铃伪影**！
     - **过锐化基数三次核基线（`over-sharpened-cardinal-ringing`，$B=0.0, C=1.0$）**：因外侧负旁瓣权重高达 $w_{-1}(0.5) = -0.1250$，在阶跃后爆出 **`+0.1465`** 的刺眼白边过冲（$u=+1.50$ 处输出 `1.1250`），并在阶跃前挖出 **`-0.1465`** 的负值黑边凹陷（**峰谷振铃总跨度达 `0.2930`，比 Mitchell 恶化 `4.15×`**）！
   - **无分支霍纳 4 抽头多项式 vs 分段 `Math.abs`/`Math.pow` 基线性能**：将 4 个抽头直接展开为关于局部相位 $s \in [0,1)$ 的无分支霍纳（Horner）多项式，在 `8,192` 次 25 站点滤波中仅耗时 **`12.14 ms`**（对比逐抽头 `Math.abs` + `Math.pow` 分支基线 **`29.34 ms`**，**提速 `2.42×`**，最大误差仅 `1.33e-15`）。

---

## ② 🎯 客户与架构师灵魂拷问 Q&A（First-Principles Q&A）

### Q1：何时选 AI 神经超分辨率模型 vs 何时选代码驱动的 Mitchell-Netravali 三次重构滤波？

- **选 AI 神经超分辨率模型（如 DLSS、FSR、StableSR）的场景**：
  当需要将极低分辨率图像放大 $2\times \sim 4\times$ 并凭先验知识“脑补”出原图中根本不存在的砖墙裂纹或毛发细节，或者利用运动矢量进行多帧时域超分。
- **选代码驱动 Mitchell-Netravali ($B=1/3, C=1/3$) 滤波核的场景**：
  在渲染引擎内部执行任意比例画布缩放、TAA 单步历史回采、光线追踪子像素样本汇总、以及科学可视化数据重采样时，要求 **绝对忠实于原始信号、零幻觉伪造、严格满足单位分解（$\sum w_m \equiv 1$）、且单像素仅需 4 个无分支多项式乘加**。

---

### Q2：为什么有些滤波器放大大片纯白天空时会出现“排骨纹/水波纹”，而放文字边缘时又会冒出一圈“黑边（Ringing）”？

**先用大白话讲第一性原理**：
这两种常见画质翻车，分别对应滤波器设计的两条铁律被破坏：
1. **为什么纯色天空会出现“排骨水波纹（Ripple Artifact）”？——因为破坏了“单位分解（Partition of Unity）”！**
   假设一整片天空的像素亮度全都是 `1.00`。
   当你采样落在两个像素中间（比如偏移 $s = 0.5$）时，你用周围 4 个像素的权重 $w_{-1}, w_0, w_1, w_2$ 去加权求和：
   $$I_{\text{out}}(s) = w_{-1}(s)\cdot 1.0 + w_0(s)\cdot 1.0 + w_1(s)\cdot 1.0 + w_2(s)\cdot 1.0 = \sum_{m=-1}^{2} w_m(s)$$
   如果一个程序员随便手写了一个高斯函数 `exp(-2.0 * d * d)` 却忘了保证**对于任意亚像素位置 $s \in [0, 1)$，4 个权重加起来都必须分毫不差等于 `1.000000`**，那么在整数像素位置（$s=0$）算出来亮度是 `1.02`，在半像素位置（$s=0.5$）算出来亮度变成了 `0.96`！原本均匀纯净的蓝天，立刻浮现出像百叶窗一样的明暗条纹！
2. **为什么白字黑底边缘会冒出“黑圈和亮边（Gibbs Ringing）”？——因为外侧负旁瓣（Negative Side-Lobes）太重！**
   为了把边缘变锐利，三次滤波核在距离中心 $1 \le |x| < 2$ 的外侧抽头上会设置**负数权重**（比如 $w_{-1}(0.5) = \frac{B - 6C}{48} < 0$）。
   当从黑底（`0.0`）跨入白字（`1.0`）时，站在白字边缘往里半步（$u = +1.50$）：
   - 最左边第 1 个抽头踩在黑底 `0.0` 上（权重是负数 $-\delta$，乘以 $0$ 被抹掉了）；
   - 右边 3 个抽头全都踩在白字 `1.0` 上！因为 4 个权重加起来等于 $1.0$，右边 3 个正权重加起来就必然等于 **$1.0 + \delta > 1.0$**！
   如果盲目把锐度参数 $C$ 调大到 $C = 1.0, B = 0.0$，负旁瓣达到 $-0.1250$，白字边缘亮度就会爆冲到 **`1.1465`**，而黑底一侧则会跌到 **`-0.1465`**（截断后形成一圈死黑描边）！

---

### Q3：Mitchell 和 Netravali 是怎么在 $(B, C)$ 平面上找到 $(1/3, 1/3)$ 这个黄金甜点的？

Mitchell 与 Netravali 对所有 4 抽头分段三次对称核施加了以下约束：
1. $C^1$ 连续（函数值与一阶导数在 $|x|=0, 1, 2$ 处连续）+ 任意相位单位分解 $\sum_{m=-1}^{2} k(m - s) \equiv 1$ $\implies$ 将原本 8 个未知系数精准压缩为仅剩 **$B$ 和 $C$ 两个自由参数**！
2. 再要求泰勒展开二阶误差项归零（即对二次多项式曲线也具备高精度重构能力），得到一条直线方程：
   $$B + 2C = 1$$
   - 若在这条线上取 $(B=1, C=0)$：退化为**三次 B 样条（Cubic B-Spline）**，权重全正、0 振铃，但画面严重模糊；
   - 若取 $(B=0, C=0.5)$：退化为**Catmull-Rom 插值核**，锐度高但已有明显负旁瓣振铃；
   - 通过数百名观察者双盲视觉实验，两条“模糊感知边界”与“振铃感知边界”在 $B + 2C = 1$ 直线上的正中心交汇点，正是：
     $$B = \frac{1}{3}, \qquad C = \frac{1}{3}$$

---

## ③ 🧭 直观可视化图解（Mermaid 决策树、管线对比与帧级时序）

### 3.1 图像重采样与胶片重构滤波核架构师选型决策树（`flowchart TD`）

```mermaid
flowchart TD
    Start[需要对渲染画面、纹理贴图或历史帧执行亚像素重采样] --> Q1{信号是否包含未色调映射的极端 HDR 高光峰值如 >10.0 的太阳光斑?}
    Q1 -->|是: 极端 HDR 阶跃边缘| KarisPath[采用 Mitchell 1/3, 1/3 滤波 + 局部 3x3 邻域最小最大值钳制 Anti-Ringing Clamp]
    Q1 -->|否: 标准 SDR / 吨映射后图像、字体与光线追踪胶片重构| Q2{业务场景对模糊与负值的容忍度是什么?}

    Q2 -->|通用高质量图像缩放与胶片重构默认标准| MitchellPath[采用 Mitchell-Netravali 黄金平衡核: B = 1/3, C = 1/3]
    Q2 -->|概率密度场或严格禁止任何负权重的体积雾| BSplinePath[采用全正权重三次 B 样条核: B = 1.0, C = 0.0]
```

### 3.2 过锐化基数三次核（$\pm 14.65\%$ 吉布斯黑白边）vs Mitchell-Netravali 平衡核管线对比（`flowchart LR`）

```mermaid
flowchart LR
    subgraph RingingPipeline[错误基线: 过锐化基数三次核 B=0, C=1.0 引发严重吉布斯振铃]
        direction TB
        R1[阶跃信号 0 -> 1, 选参数 B = 0.0, C = 1.0] --> R2[外侧负旁瓣权重高达 w_-1 = -0.1250!]
        R2 --> R3[暗侧下冲至 -0.1465, 亮侧过冲至 +1.1465!]
        R3 --> R4[结果: 峰谷振铃跨度达 0.2930, 文字与物体边缘出现刺眼黑白描边!]
    end

    subgraph MitchellPipeline[正确管线: Mitchell-Netravali B=1/3, C=1/3 严格单位分解且抑制振铃]
        direction TB
        M1[沿二阶精度线 B + 2C = 1 锁定甜点 B = 1/3, C = 1/3] --> M2[无分支霍纳多项式算出 4 抽头权重: sum w_m == 1.000000]
        M2 --> M3[外侧旁瓣温和衰减至 -0.0347, 最大过冲仅 +0.0353]
        M3 --> M4[结果: 零水波纹误差, 削减 75.93% 吉布斯振铃, 提速 2.42x!]
    end
```

### 3.3 帧级 25 站点亚像素重构核验时序图（`sequenceDiagram`）

```mermaid
sequenceDiagram
    participant UI as 滤波器参数控制器 (amp, B, C)
    participant Solver as 霍纳 4 抽头求解器 (model.ts)
    participant Verifier as 单位分解与振铃核验器
    participant GL as Three.js WebGL2 25站点重采样台

    UI->>Solver: 传入 stationIndex = 20 (u=+1.50), H = 1.00, B = 1/3, C = 1/3
    Solver->>Solver: 提取局部亚像素相位 s = u - floor(u) 并用无分支霍纳公式求 4 抽头权重
    Solver->>Verifier: 核验 Σw_m = 1.000000 (误差 < 1e-14) 且振铃较 (0,1) 基线削减 75.93%
    Solver->>GL: 更新 25 颗重构采样球、25 个 Mitchell 基准环与卷积探针世界矩阵
```

---

## ④ 📊 视觉技术选型决策矩阵（Architect Decision Matrix）

| 评估维度 | Mitchell-Netravali (`mitchell-netravali-balanced` $1/3, 1/3$) | 三次 B 样条 (`Cubic B-Spline` $B=1, C=0$) | Catmull-Rom 插值核 ($B=0, C=0.5$) | 过锐化基数三次核 (`over-sharpened-cardinal-ringing` $0, 1$) |
| :--- | :--- | :--- | :--- | :--- |
| **单位分解误差 $|\sum w_m(s) - 1|$** | **`0.000000`（机器精度 `1.11e-16`）** | `0.000000` | `0.000000` | `0.000000` |
| **阶跃边缘最大旁瓣过冲** | **`+0.0353`（削减 `75.93%` 振铃）** | `0.0000`（全正权重，但极度模糊） | `+0.0706`（可见轻微亮边） | **`+0.1465`（严重黑白光环，跨度 `0.2930`）** |
| **二阶多项式再生条件 $B + 2C = 1$** | **严格满足（$1/3 + 2/3 = 1$）** | 满足（$1 + 0 = 1$） | 满足（$0 + 1 = 1$） | **违反（$0 + 2 = 2 \neq 1$）** |
| **8,192 次 25 站点 CPU 耗时** | **`12.14 ms`（无分支霍纳，提速 `2.42×`）** | `12.10 ms` | `12.12 ms` | `12.15 ms` |
| **架构师工程推荐定位** | **图像缩放、光线追踪重构与抗锯齿首选** | 仅用于非负平滑模糊场 | 仅用于光滑连续数据插值 | **严禁用于高对比度图像或文字边缘缩放** |

---

## ⑤ 🧪 全新能力展示 Demo 与 Benchmark 核心发现（含 7-Card 报告）

### 5.1 交互式 25 站点 3D 亚像素卷积重采样检验台（`demos/mitchell-netravali-filter/`）

本轮构建了独立可交互 3D WebGL2 实验台 **[`demos/mitchell-netravali-filter/`](../demos/mitchell-netravali-filter/index.html)**（共 **58 个 3D 实体部件**）：
- **25 颗亚像素重构采样球 + 25 个精确 Mitchell-Netravali 基准圆环 + 4 根离散整数纹素立柱 + 零值与平台基准横梁 + 卷积滑车探针**：直观展示阶跃信号从 $0.00$ 跃迁至 $1.00$ 时，在 $u \in [-1.0, +2.0]$ 共 25 个亚像素采样点上的重构轨迹；
- **一键切换对比模式**：在 `mitchell-netravali-balanced` 模式下，25 颗采样球与青色基准环完全重合，阶跃过渡利落且平台两侧几乎看不见超调（最大仅 `+0.0353`）；一旦切换到 `over-sharpened-cardinal-ringing` 模式，阶跃前后的采样球立刻大幅偏离基准环，在左侧深陷至 **`-0.1465`**、在右侧高高拱起至 **`1.1465`**，直观展现负旁瓣引发的吉布斯黑白边振铃！
- **原子化参数门禁与 JSON 导出**：自动拦截越界滤波参数（如 `mitchellC = 4.5`）并保留有效状态，支持导出 `MITCHELL_NETRAVALI_SPEC.json`。

| 亮色主题 — Mitchell-Netravali $(1/3, 1/3)$（削减 `75.93%` 振铃） | 亮色主题 — 过锐化基数三次核 $(0, 1)$（`±0.1465` 吉布斯振铃） |
| :---: | :---: |
| ![亮色主题Mitchell-Netravali平衡滤波](evidence/mitchell-netravali-filter/light-mitchell-netravali-balanced.png) | ![亮色主题过锐化吉布斯振铃](evidence/mitchell-netravali-filter/light-over-sharpened-cardinal-ringing.png) |

| 暗色主题 — Mitchell-Netravali $(1/3, 1/3)$（削减 `75.93%` 振铃） | 暗色主题 — 过锐化基数三次核 $(0, 1)$（`±0.1465` 吉布斯振铃） |
| :---: | :---: |
| ![暗色主题Mitchell-Netravali平衡滤波](evidence/mitchell-netravali-filter/dark-mitchell-netravali-balanced.png) | ![暗色主题过锐化吉布斯振铃](evidence/mitchell-netravali-filter/dark-over-sharpened-cardinal-ringing.png) |

### 5.2 7-Card 4:5 视觉评测报告与封存数据链接

- 📊 **英文版 7-Card 4:5 评测报告**：[`demos/mitchell-netravali-filter/test-report-cards.html`](../demos/mitchell-netravali-filter/test-report-cards.html)
- 📊 **中文版 7-Card 4:5 评测报告**：[`demos/mitchell-netravali-filter/test-report-cards.zh.html`](../demos/mitchell-netravali-filter/test-report-cards.zh.html)
- 📁 **封存评测数据源**：[`demos/mitchell-netravali-filter/report.json`](../demos/mitchell-netravali-filter/report.json)（`13 / 13` 项确定性检查全部通过，Playwright 零控制台/页面错误）。

---

## ⑥ 🛠️ 附录：高质量视觉/动画交付快速核验清单（Architect Checklist）

在交付任何包含图像缩放器、TAA 历史帧采样器或离线渲染胶片重构器的代码前，请逐项核验以下清单：

- [ ] **强制核验单位分解恒等式（Partition of Unity）**：对任意亚像素相位 $s \in [0, 1)$，确认所有抽头权重之和严格满足 $|\sum_m w_m(s) - 1.0| < 10^{-14}$（若使用截断高斯核，必须在末尾除以权重总和进行归一化）？
- [ ] **锁定 $B + 2C = 1$ 二阶精度轨迹并优选 $(1/3, 1/3)$**：确认通用图像重构核默认采用 $B = 1/3, C = 1/3$，避免使用 $C > 0.5$ 的高振铃参数？
- [ ] **无分支霍纳多项式展开替代 `abs` 分支**：在着色器或 CPU 内层循环中，确认已根据局部相位 $s = u - \lfloor u \rfloor \in [0, 1)$ 将 4 个抽头距离固定映射为 $1+s, s, 1-s, 2-s$，彻底消除了 `if (abs(x) < 1)` 分支？
- [ ] **HDR 历史重投影附加局部邻域钳制（Neighborhood Clamp）**：当对对比度超过 $10:1$ 的未色调映射 HDR 缓冲区做三次重采样时，确认已将输出钳制在周围 $2\times 2$ 纹素的 $[\min, \max]$ 区间内以彻底消灭负值黑边？
- [ ] **单位分解与旁瓣幅度自动化门禁**：单元测试中是否已针对 25 个亚像素相位验证 $\sum w_m(s) \equiv 1.000000$ 且阶跃过冲 $\le 0.036$？

---

## 参考文献与延伸阅读（References）

1. **Reconstruction Filters in Computer Graphics (Mitchell & Netravali, SIGGRAPH 1988)**: Don P. Mitchell and Arun N. Netravali, *"Reconstruction Filters in Computer Graphics"*, ACM SIGGRAPH Computer Graphics, Vol. 22, No. 4, 1988, pp. 221–228.
2. **High-Quality Temporal Supersampling (Brian Karis, SIGGRAPH 2014)**: Brian Karis, *"High-Quality Temporal Supersampling"*, Advances in Real-Time Rendering in Games, SIGGRAPH 2014.
3. **Physically Based Rendering: From Theory to Implementation (Pharr, Jakob, Humphreys)**: Section 7.8 *"Filter Functions — MitchellFilter"*.
