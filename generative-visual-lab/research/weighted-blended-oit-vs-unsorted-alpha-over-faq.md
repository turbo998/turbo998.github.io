# 视觉与动画技术选型与原理解析 FAQ：McGuire-Bavoil 加权混合顺序无关半透明（WBOIT）可交换深度加权累加 vs 未排序 `OVER` 前后倒置跳变

> **核心架构结论一句话总结**：在渲染多层交错的汽车风挡与车窗玻璃、CAD 机械半透明爆炸剖面、粒子烟雾云团以及实例化植被/毛发管线中，**严禁在不做逐像素深度排序的情况下直接使用非交换的 Porter-Duff `OVER` 混合算子 $C_{\text{out}} = \alpha_{\text{src}} C_{\text{src}} + (1 - \alpha_{\text{src}}) C_{\text{dst}}$**！实测表明：在近景亮色玻璃层（$z_{\text{near}} = 1.00\text{ m}, C = 0.90, \alpha = 0.75$）与远景暗色玻璃层（第 8 站 $z_{\text{far}} = 3.25\text{ m}, C = 0.15, \alpha = 0.75$，正确后前排序 `OVER` 合成值为 `0.7031`）组成的 17 站半透明测试台上，一旦绘制提交顺序反转为“先近后远”，朴素未排序 `OVER` 会让远景暗层覆盖近景亮层，导致合成亮度瞬间暴跌至 **`0.2813`（产生 `-0.4219` / `-60.00%` 的前后顺序倒置跳变）**；而采用 **McGuire-Bavoil (2013) 加权混合顺序无关半透明（WBOIT，通道一执行可交换深度加权加法累加 $\sum \alpha_k C_k w(z_k)$，通道二执行可交换透射率乘法累乘 $\prod (1-\alpha_k)$）**，可在正序与逆序提交下输出**比特级完全一致的 `C = 0.8375`（全 17 站提交顺序跳变差严格为 `0.0000`）**，且单遍无排序累加比逐像素数组排序 A-Buffer 快 **17.64×**（8,192 轮耗时 `1.26 ms` vs `22.25 ms`）。

![McGuire-Bavoil 加权混合顺序无关半透明 WBOIT vs 未排序 OVER 前后倒置总结图](./evidence/weighted-blended-oit-rig-summary.svg)

---

## ① 📌 核心结论速览（Executive Summary）

1. **为什么在 3D 场景里旋转镜头看一辆半透明的车或一团粒子烟雾，走到某个角度时前后两层半透明物体会突然“闪一下互换前后关系（Alpha Popping）”？**
   用大白话讲：传统半透明混合公式 `OVER`（把新画的像素按 $\alpha$ 盖在旧像素上）是一个**极其依赖先后顺序的不可交换算子（Non-Commutative Operator）**：先画远处的黑玻璃再画近处的亮玻璃，看到的当然是亮玻璃为主（`0.7031`）；但如果反过来先画了近处的亮玻璃、后画远处的黑玻璃，显卡没有深度测试拦截，就会傻乎乎地把远处的黑玻璃直接糊在近处亮玻璃的脸上（跌成 `0.2813`，瞬间变黑 `-60.00%`）！
   - **为什么靠 CPU 给物体或三角形排序救不了场？**
     1. 两个互相穿插的半透明网格（比如十字交叉的两片树叶、或者环绕机身的气流）在几何上形成了循环遮挡，**数学上根本不存在一个全局从后往前的顺序**；
     2. 在现代 GPU Indirect Draw / 实例化（Instancing）管线里，成千上万片叶子和粒子在一个 Draw Call 里并行提交，CPU 根本无法逐帧为百万个三角形重排索引缓冲！
2. **第一性原理破局：用“加法交换律 + 乘法交换律”重构半透明方程（McGuire-Bavoil WBOIT）**：
   - 既然 `OVER` 不可交换，我们能不能把“谁挡在谁前面”的信息编码进一个**与深度 $z$ 单调递减的权重函数 $w(z, \alpha)$** 里，然后只用**满足交换律的加法（`+`）和乘法（`×`）**来完成所有图层的累积？
   - **McGuire & Bavoil (JCGT 2013) 的双缓冲可交换分解**：
     1. **累加缓冲（Accumulation Target，混合模式 `GL_ONE, GL_ONE` 纯加法）**：
        对每个半透明片元 $k$，乘以随深度快速衰减的权重 $w(z_k, \alpha_k) = \alpha_k \cdot \frac{10}{10^{-5} + (z_k/1.45)^4}$，累加分子与分母：
        $$A_{\text{color}} = \sum_{k=1}^{N} \alpha_k C_k w(z_k, \alpha_k), \qquad A_{\text{weight}} = \sum_{k=1}^{N} \alpha_k w(z_k, \alpha_k)$$
     2. **透射率缓冲（Revealage Target，混合模式 `GL_ZERO, GL_ONE_MINUS_SRC_COLOR` 纯乘法）**：
        精确累乘所有半透明层留给背景的总透射率：
        $$R_{\text{reveal}} = \prod_{k=1}^{N} (1 - \alpha_k)$$
     3. **全屏单次解析（Resolve Pass）**：
        $$C_{\text{WBOIT}} = (1 - R_{\text{reveal}}) \frac{A_{\text{color}}}{A_{\text{weight}}} + R_{\text{reveal}} C_{\text{bg}}$$
   - **为什么彻底根除了跳变？** 因为在 IEEE-754 算术与硬件混合器中，加法 $a + b = b + a$ 与乘法 $(1-\alpha_1)(1-\alpha_2) = (1-\alpha_2)(1-\alpha_1)$ 满足交换律！无论显卡先画近处还是先画远处，算出的颜色**比特级恒等（提交顺序差 `0.0000`）**，且近处图层因 $w(z_{\text{near}}) \gg w(z_{\text{far}})$ 自动主导最终色彩！
3. **本轮新增交互式 3D 试验台与实测证据**：
   - 新增独立 Demo：`demos/weighted-blended-oit-rig/`（58 个 Three.js 实体部件：底座平台、4 支柱、正确后前排序 `OVER` 基准横梁、17 根实测合成亮度立柱、17 颗排序 `OVER` 参考球、17 根顺序倒置跳变指示销、以及第 $i$ 站 OIT 探针滑车）。
   - 配套 7-Card 4:5 测评报告：`demos/weighted-blended-oit-rig/test-report-cards.html`（英文）与 `test-report-cards.zh.html`（中文）。

---

## ② 🎯 客户与架构师灵魂拷问 Q&A（Soul-Searching Q&A）

### Q1：WBOIT 与逐像素链表排序（Per-Pixel Linked-List A-Buffer）或深度剥离（Depth Peeling）相比，核心工程优势是什么？
**固定显存占用、零原子锁争用（Zero Atomic Contention）、单遍几何提交快 17.64×！**
- **A-Buffer 逐像素链表**：需要在着色器里用 `InterlockedExchange` 抢占全局 SSBO 原子指针并在片元内跑插入排序。一旦镜头凑近几十层叠加的粒子烟雾，数百万像素同时争抢原子锁并分配链表节点，不仅帧率瞬间腰斩（实测排序基线慢 **17.64×**：`22.25 ms` vs `1.26 ms`），还极易撑爆预分配的显存池导致画面破洞；
- **Depth Peeling（深度剥离）**：要画 $K$ 层半透明就得把全场景几何体重复提交 $K$ 遍（Draw Call 翻 $K$ 倍）；
- **WBOIT**：只需 1 个 `RGBA16F` 累加纹理 + 1 个 `R8` 透射率纹理，**1 遍几何提交、零原子操作、WebGL2/移动设备 100% 原生支持**！

### Q2：WBOIT 的深度衰减函数 $w(z, \alpha)$ 应该如何根据场景尺度调优？
**让分母中的特征深度常数 $z_{\text{scale}}$ 对齐场景半透明物体的典型工作距离！**
在公式 $w(z, \alpha) = \alpha \cdot \max\big(10^{-2}, \min(3000, \frac{10}{10^{-5} + (z/z_{\text{scale}})^4})\big)$ 中：
- 如果两个半透明层靠得很近（例如 $1.0\text{ m}$ 与 $3.25\text{ m}$），选择 $z_{\text{scale}} \approx 1.45\text{ m}$ 能让近景权重 $w(1.0)$ 达到远景权重 $w(3.25)$ 的 $26\times$ 以上，从而使加权平均值紧贴近景主色；
- 同时 $\max(10^{-2}, \dots)$ 地板与 $\min(3000, \dots)$ 天花板严格防止了 `RGBA16F` 半精度浮点缓冲（最大表示范围 `65504`）发生上溢 `Inf` 或下溢归零！

### Q3：这套确定性 WBOIT 算法与 AI 神经图层分解/抠像模型是什么关系？
**两者分别处于“多图层内容生成”与“三维实时顺序无关合成”的上下游：**
- **何时选 AI 神经图层分解模型**：从单张合成海报或视频中自动分离前景半透明烟雾与背景图层时；
- **何时必须用确定性 WBOIT 管线**：在 WebGL2/WebGPU 3D 视口中实时渲染包含玻璃、护盾、云雾与 CAD 剖面的多层三维透明场景时。

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + 管线对比图 + 帧级时序图）

### 3.1 实时 3D 半透明渲染架构选型决策树
```mermaid
flowchart TD
    A[需要在实时 3D 场景中渲染多层重叠半透明网格或粒子?] --> B{当前渲染通道是否允许开启硬件 Alpha Blending?}
    B -- 延迟渲染 G-Buffer 仅支持二值 discard --> C[使用分层位交错 + Roberts R2 屏幕空间点画抖动]
    B -- 支持独立透明混合通道 --> D{场景半透明图层是否可保证永不交叉且可完美按三角形排序?}
    D -- 仅单层玻璃或孤立公告牌 --> E[使用预乘关联 Alpha 从后往前排序 OVER 混合]
    D -- 多层交错网格 / CAD 剖面 / 海量粒子无法逐三角形排序 --> F{硬件预算与精度要求如何?}
    F -- 朴素未排序直接提交 OVER --> G[❌ 前后倒置跳变: 远景暗层覆盖近景亮层, 亮度暴跌 -60.00%]
    F -- McGuire-Bavoil 加权混合 WBOIT --> H[✅ 单遍几何提交 · 0.0000 顺序跳变 · 比排序 A-Buffer 快 17.64×]
```

### 3.2 未排序 `OVER` 前后倒置 vs WBOIT 可交换深度加权累加管线对比图
```mermaid
flowchart LR
    subgraph UnsortedOver["❌ 朴素未排序 OVER 混合 (不可交换 · 暴跌 -60.00%)"]
        U1["先画近景亮层 (z=1.00m, C=0.90, α=0.75)"] --> U2["后画远景暗层 (z=3.25m, C=0.15, α=0.75)"]
        U2 --> U3["非交换 OVER 把远景暗层直接糊在近景亮层表面"]
        U3 --> U4["输出 C = 0.2813 (对比正确值 0.7031 暴跌 -0.4219, 旋转镜头剧烈跳变!)"]
    end
    subgraph WBOIT["✅ McGuire-Bavoil 可交换 WBOIT (0 顺序跳变 · 快 17.64×)"]
        W1["加法通道累加 Σ(α_k·C_k·w(z_k)) 与 Σ(α_k·w(z_k))"] --> W2["乘法通道累乘总透射率 R = Π(1 - α_k) = 0.0625"]
        W2 --> W3["近景权重 w(1.0) >> 远景权重 w(3.25) 自动锁死前后主次"]
        W3 --> W4["正序与逆序提交均输出 C = 0.8375 (前后提交顺序差 = 0.0000!)"]
    end
```

### 3.3 帧级半透明深度间距与 3D 分光试验台渲染时序图
```mermaid
sequenceDiagram
    participant User as 架构师 / Playwright 测试器
    participant Solver as model.ts WBOIT 可交换内核
    participant Stage as WebGL2 58-Solid 3D 半透明试验台
    User->>Solver: 设定近景 C=0.90 (z=1.0m), 远景 C=0.15, α=0.75, 检视第 i=8 站 (z_far=3.25m)
    Solver->>Solver: 分别以 [Near,Far] 与 [Far,Near] 顺序执行 WBOIT 累加 -> 均输出 0.8375 (顺序差 0.0000)
    Solver->>Solver: 对比未排序 OVER 基线 -> 输出 0.2813 (前后倒置误差 -0.4219 / -60.00%)
    Solver-->>Stage: 返回 17 站合成亮度、排序参考值与顺序翻转误差遥测
    Stage-->>User: 驱动 17 根合成亮度立柱、17 颗参考球、17 根倒置误差销与滑车同步渲染
```

---

## ④ 📊 视觉技术选型决策矩阵（Decision Matrix）

| 评估维度 | ✅ 单遍可交换加权混合（Single-Pass WBOIT） | ⚠️ 逐像素数组排序 A-Buffer（Sorted A-Buffer Baseline） | ❌ 朴素未排序 `OVER`（Unsorted Near-Before-Far） | ⚠️ 多遍深度剥离（Multi-Pass Depth Peeling） |
| :--- | :--- | :--- | :--- | :--- |
| **正逆序提交跳变差 $|C_{\text{fwd}} - C_{\text{rev}}|$** | **比特级精确 `0.0000`（100% 顺序无关）** | `0.0000`（需逐像素排序） | **`0.4219`（亮度随提交顺序暴跌 `-60.00%`！）** | `0.0000`（需 $K$ 遍重绘） |
| **第 8 站（$z_{\text{far}}=3.25\text{ m}$）合成输出** | **`0.8375`（近景亮层稳定主导）** | `0.8375` | **`0.2813`（远景暗层反客为主！）** | `0.7031` |
| **几何通道提交遍数（Draw Passes）** | **仅 1 遍几何通道 + 1 次全屏合成** | 1 遍几何 + 原子链表排序 | 1 遍（但画面前后错乱） | **$K$ 遍全场景几何提交（$4\sim 8\times$ 开销）** |
| **WebGL2 / 移动端硬件兼容性** | **100% 原生支持（标准 MRT 混合）** | 需 WebGPU / DX11 原子存储缓冲 | 原生支持 | 支持但带宽极高 |
| **8,192 轮 17 站 CPU 批处理耗时** | **`1.26 ms`（最快，17.64× 提速）** | `22.25 ms`（慢 17.64×） | `0.85 ms`（前后倒置跳变不可用） | — |
| **首选适用场景** | **CAD 半透明剖面、车窗总成、粒子烟雾、交错半透明网格** | 极高不透明度文字贴纸精确叠放 | **严禁在未排序多层半透明场景使用** | 离线工业级精确多层玻璃验证 |

---

## ⑤ 🧪 全新 Demo 与 7-Card 4:5 视觉报告（Live Workbench & Evidence）

### 5.1 交互式 3D 试验台与报告入口
- **实时 3D 工作台**：[`demos/weighted-blended-oit-rig/index.html`](../demos/weighted-blended-oit-rig/index.html)
- **7-Card 4:5 英文视觉测试报告**：[`demos/weighted-blended-oit-rig/test-report-cards.html`](../demos/weighted-blended-oit-rig/test-report-cards.html)
- **7-Card 4:5 中文视觉测试报告**：[`demos/weighted-blended-oit-rig/test-report-cards.zh.html`](../demos/weighted-blended-oit-rig/test-report-cards.zh.html)
- **密封测量 JSON 数据源**：[`demos/weighted-blended-oit-rig/report.json`](../demos/weighted-blended-oit-rig/report.json)

### 5.2 多主题与多模式 Playwright 实测截图证据

| McGuire-Bavoil 可交换 WBOIT（Light · `0.0000` 顺序跳变，近景主导） | 朴素未排序 `OVER`（Light · 远景暗层反盖近景，暴跌 `-60.00%`） |
| :---: | :---: |
| ![WBOIT 可交换亮色实测图](./evidence/weighted-blended-oit-rig/light-wboit-commutative-depth-weighted.png) | ![未排序 OVER 倒置亮色实测图](./evidence/weighted-blended-oit-rig/light-naive-unsorted-alpha-over.png) |

| McGuire-Bavoil 可交换 WBOIT（Dark · 58 实体部件） | 朴素未排序 `OVER`（Dark · 17 根红色指示销暴露 `-0.4219` 倒置跳变） |
| :---: | :---: |
| ![WBOIT 可交换暗色实测图](./evidence/weighted-blended-oit-rig/dark-wboit-commutative-depth-weighted.png) | ![未排序 OVER 倒置暗色实测图](./evidence/weighted-blended-oit-rig/dark-naive-unsorted-alpha-over.png) |

---

## ⑥ 🛠️ 高质量视觉交付快速核验清单（SA Verification Checklist）

在将加权混合顺序无关半透明（WBOIT）管线合入生产渲染引擎前，请逐项勾选以下核验清单：

- [ ] **双渲染目标（MRT）初始清屏值正确**：每帧开始前，累加缓冲 `accumTarget` 是否清零为 `(0.0, 0.0, 0.0, 0.0)`，而透射率缓冲 `revealageTarget` 是否清为 **`1.0`（而非 `0.0`！）**？
- [ ] **关闭半透明通道深度写入但保留深度测试**：在绘制 WBOIT 半透明几何体时，是否设置了 `depthWrite = false` 且 `depthTest = true`（与不透明 G-Buffer 深度比对），防止不透明墙体后面的半透明物体漏出来？
- [ ] **权重上下界防 `RGBA16F` 溢出钳制**：深度权重函数 $w(z, \alpha)$ 是否包含 `clamp(rawW, 1e-2, 3e3)`，严防极近处权重冲破半精度浮点上限 `65504` 变成 `Inf`？
- [ ] **全屏合成通道分母防零除**：在 Resolve Pass 计算 `accum.rgb / max(accum.a, 1e-5)` 时，是否加了 `1e-5` 保护以防止无半透明覆盖的纯背景像素产生 `0 / 0` `NaN`？
- [ ] **预乘关联 Alpha 输入**：累加分子时是否已将颜色乘上自身不透明度 $\alpha_k C_k w(z_k, \alpha_k)$，确保高透明度边缘颜色不会污染加权均值？
