# 视觉与动画技术选型与原理解析 FAQ：Kopf 联合双边高分深度引导上采样（Joint Bilateral Upsampling）vs 硬件双线性轮廓光晕渗漏

> **核心架构结论一句话总结**：在实时半分辨率体积雾（Volumetric Fog）、丁达尔神圣光柱（God-Rays）、体积云与屏幕空间环境光遮蔽（SSAO）上采样管线（Unreal Engine 5、Frostbite、Unity HDRP Half-Res Volumetrics）中，**严禁直接使用硬件双线性插值（`texture(halfResTex, uv)`）将半分辨率缓冲放大叠加回全分辨率画面**！实测表明：在近景暗色角色/立柱（$z_{\text{fg}} = 2.0\text{ m}$，前景薄雾亮度 $L_{\text{fg}} = 0.0500$，第 0~8 站）与远景亮色丁达尔体积光背景（$z_{\text{bg}} = 25.0\text{ m}$，背景浓雾亮度 $L_{\text{bg}} = 0.9500$，第 9~16 站）交界的第 8 站前景轮廓边缘（双线性中点 $u = 0.50$）处，朴素硬件双线性上采样因无视 $23.0\text{ m}$ 的深度断崖，将 $50\%$ 的背景亮雾强行混入前景暗色立柱，输出 **`L_vol = 0.5000`（比真实前景雾 `0.0500` 暴增 `10.00×`，产生 `+0.4500` 的刺眼发光白圈并污染 `7/17` 个边界像素）**；而采用 **Johannes Kopf 等人 (SIGGRAPH 2007) 联合双边深度引导上采样（Joint Bilateral Upsampling, JBU，$w_k = w_{\text{spatial}}(u)\cdot\exp(-\Delta z_k^2 / 2\sigma_z^2)$）**，利用现成的全分辨率 G-Buffer 深度 $z_{\text{hi}}$ 将跨深度断崖的异侧低分采样点权重精确压零，可在第 8 站锁死 **`L_vol = 0.0500`**、第 9 站跃迁至 **`L_vol = 0.9500`（全 17 站 `0/17` 光晕渗漏，边缘与全分辨率渲染 `100%` 一致）**，且半分辨率 JBU 比全分辨率 64 步逐像素体积步进快 **9.50×**（8,192 轮耗时 `1.13 ms` vs `10.71 ms`）。

![Kopf 联合双边高分深度引导上采样 vs 硬件双线性轮廓光晕渗漏总结图](./evidence/joint-bilateral-upsample-rig-summary.svg)

---

## ① 📌 核心结论速览（Executive Summary）

1. **为什么许多游戏或 3D 展示项目开启了“半分辨率体积雾（Half-Res Volumetric Fog）”或“半分辨率粒子/SSAO”来优化帧率后，站在阳光体积雾前面的暗色角色、树木和建筑边缘，总会莫名其妙裹上一层大约 2~4 像素宽的“发光白圈（Glowing Halo Fringe）”？**
   用大白话讲：因为**硬件双线性纹理采样器是个“深度盲（Depth-Blind）”**！
   - 为了省下 $75\%$ 的光线步进开销，我们通常在半分辨率（或 $1/4$ 分辨率）网格上计算体积雾：比如低分纹素 $A$ 落在前景暗柱内部（第 4 站，$z_A = 2.0\text{ m}$，雾很薄 $L_A = 0.0500$），相邻的低分纹素 $B$ 落在远处亮雾背景上（第 12 站，$z_B = 25.0\text{ m}$，雾很亮 $L_B = 0.9500$）；
   - 当我们给全分辨率第 8 号像素（它明明还属于近处 $z_{\text{hi}}(8) = 2.0\text{ m}$ 的暗色立柱边缘！）填充体积雾时，它的屏幕坐标正好位于低分纹素 $A$ 和 $B$ 的正中间（双线性权重 $u = 0.50$）；
   - 如果直接调硬件双线性采样，GPU 只看屏幕 2D 距离，把近处 $2\text{ m}$ 的暗雾（`0.0500`）和远处 $25\text{ m}$ 的亮雾（`0.9500`）对半一掺，算出 **`0.5000`** 贴在暗色立柱边缘——**相当于把 23 米外被照亮的浓雾强行“吸”到了 2 米近的暗色物体脸上，形成刺眼的 `10.00×` 发光白边**！同理，在刚跨入背景的第 9 号像素（$z_{\text{hi}}(9) = 25.0\text{ m}$，$u = 0.625$）上，它又把前景的黑雾掺进背景，形成 `-0.3375` 的暗色黑环！
2. **第一性原理破局：用全分辨率深度缓冲 $z_{\text{hi}}$ 充当“引导图（Guidance Image）”的联合双边滤波（Kopf et al. SIGGRAPH 2007）**：
   - 虽然体积雾是在半分辨率下算的，但别忘了：**我们的 G-Buffer 拥有全分辨率、每个像素都刀锋般精准的深度图 $z_{\text{hi}}(x)$**！
   - **Johannes Kopf 等人 (SIGGRAPH 2007)** 提出的**联合双边上采样（Joint Bilateral Upsampling, JBU）**核心思想极其优雅：在将周围的低分辨率纹素 $k \in \{A, B, C, D\}$ 插值到全分辨率像素 $x$ 时，每个低分纹素的权重等于**“2D 空间双线性权重 $w_{\text{spatial}}$”乘以“高分-低分深度亲和权重 $w_{\text{depth}}$”**：
     $$w_k(x) = w_{\text{spatial}}(x, x_k) \cdot \exp\!\left(-\frac{\big(z_{\text{hi}}(x) - z_{\text{lo}}(x_k)\big)^2}{2\sigma_z^2}\right), \qquad L_{\text{JBU}}(x) = \frac{\sum_k w_k(x)\, L_{\text{lo}}(x_k)}{\sum_k w_k(x)}$$
   - 看看在第 8 站前景边缘像素（$z_{\text{hi}} = 2.0\text{ m}$，$u = 0.50$，$\sigma_z = 0.50\text{ m}$）发生了什么：
     1. 对前景低分纹素 $A$（$z_A = 2.0\text{ m}$）：深度差 $\Delta z_A = 0\text{ m} \implies \exp(0) = \mathbf{1.0000}$；
     2. 对背景低分纹素 $B$（$z_B = 25.0\text{ m}$）：深度差 $\Delta z_B = 23.0\text{ m} \implies \exp(-23^2 / 0.5) = \exp(-1058) = \mathbf{0.0000}$！
   - 归一化后，背景亮雾 $B$ 被 $100\%$ 拒之门外，第 8 站严格输出前景真实体积雾 **`0.0500`**；而一跨到第 9 站背景像素（$z_{\text{hi}} = 25.0\text{ m}$），前景暗雾 $A$ 的权重瞬间归零，第 9 站立刻输出背景真实体积雾 **`0.9500`**——**仅凭半分辨率体积计算，就免费复原了全分辨率刀锋级的锐利深度阶跃（`0/17` 光晕渗漏，且比全分辨率步进快 9.50×）**！
3. **本轮新增交互式 3D 试验台与实测证据**：
   - 新增独立 Demo：`demos/joint-bilateral-upsample-rig/`（58 个 Three.js 实体部件：底座平台、4 支柱、前景 `0.0500` 基准横梁、17 根实测上采样体积雾亮度立柱、17 颗 Kopf 联合双边参考球、17 根轮廓光晕渗漏指示销、以及第 $i$ 站双边密度计滑车）。
   - 配套 7-Card 4:5 测评报告：`demos/joint-bilateral-upsample-rig/test-report-cards.html`（英文）与 `test-report-cards.zh.html`（中文）。

---

## ② 🎯 客户与架构师灵魂拷问 Q&A（Soul-Searching Q&A）

### Q1：如果一个全分辨率像素正好落在极细的亚像素树枝上，导致周围 4 个低分辨率采样点的深度 $z_{\text{lo}, k}$ 全都跟它的 $z_{\text{hi}}$ 相差很大（所有 $w_k \to 0$），会发生什么？
**会发生除零 `0 / 0 = NaN` 黑点！**
因此在生产级 JBU 着色器中，必须遵守两条铁律：
1. 生成低分辨率深度图 $z_{\text{lo}}$ 时，**严禁对 $2\times 2$ 深度求平均**（深度求平均会在边缘制造出悬在半空中的假深度！），而应采用 **棋盘格最小/最大深度交错降采样（Min-Max Checkerboard Depth Downsampling）**，确保 $2\times 2$ 低分邻域里一定既有前景深度采样点、又有背景深度采样点；
2. 在计算 $\sum w_k$ 分母时，加上微小正下界 `max(1e-12, w_spatial)` 或当总权重低于阈值时自动回退到空间双线性权重，彻底杜绝 `NaN` 除零！

### Q2：除了深度差 $|z_{\text{hi}} - z_{\text{lo}}|$，什么时候还需要在联合双边权重里加入法线点积 $( \mathbf{n}_{\text{hi}} \cdot \mathbf{n}_{\text{lo}} )^p$？
**当上采样的是半分辨率 SSAO（环境光遮蔽）或漫反射间接光（Diffuse GI）时！**
因为在墙角折痕处，两面墙在转折线附近的深度 $z$ 几乎相等（$\Delta z \approx 0$），但法线方向相差 $90^\circ$；此时叠加法线亲和项 $\max(0, \mathbf{n}_{\text{hi}} \cdot \mathbf{n}_{\text{lo}})^{16}$ 即可防止背光墙面的暗角渗漏到向光墙面上。

### Q3：这套确定性联合双边上采样与 AI 深度补全/图像超分（Depth-Guided Neural Super-Resolution）是什么关系？
**JBU 是实时渲染管线内部每帧运行数次的亚毫秒级确定性算子：**
- **何时用 AI 图像/视频超分**：对最终合成完的整帧图像做时域超分辨率重建时；
- **何时必须用确定性 Kopf 联合双边上采样**：在单帧渲染管线内部，将半分辨率体积光、体积云、SSAO、SSR 等中间通道以 `< 0.1 ms` 的极低开销无损合并回全分辨率主缓冲时。

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + 管线对比图 + 帧级时序图）

### 3.1 半分辨率渲染通道（Volumetrics / SSAO / GI）上采样架构选型决策树
```mermaid
flowchart TD
    A["需要将半分辨率体积雾/SSAO/云层缓冲放大合成至全分辨率画面?"] --> B{"画面中是否存在前景与背景跨越深度断崖的几何外轮廓?"}
    B -- "完全平坦无前后遮挡的纯天空背景" --> C["普通硬件双线性过滤即可"]
    B -- "近景角色/立柱遮挡远景亮色体积雾或天空" --> D{"采用哪种上采样重构算子?"}
    D -- "朴素硬件双线性插值 texture halfRes uv" --> E["❌ 轮廓光晕渗漏: 第 8 站泄漏 +0.4500 背景亮雾, 10× 发光白圈污染 7/17 站"]
    D -- "放弃半分辨率优化, 直接跑全分辨率 64 步体积步进" --> F["⚠️ 边缘锐利但光线步进耗时暴增 9.50×"]
    D -- "Kopf 联合双边高分深度引导上采样 JBU" --> G["✅ 全分深度门控精准剔除异侧采样 · 0.0000 光晕渗漏 · 快 9.50×"]
```

### 3.2 朴素硬件双线性光晕渗漏 vs Kopf 联合双边深度引导上采样管线对比图
```mermaid
flowchart LR
    subgraph NaiveBilinear["❌ 朴素硬件双线性上采样 (10.00× 轮廓发光白边)"]
        B1["前景低分点 A (z=2m, L=0.05) 与背景低分点 B (z=25m, L=0.95)"] --> B2["检视第 8 站全分前景边缘像素 (z_hi=2.0m, u=0.50)"]
        B2 --> B3["无视 23m 深度断崖, 盲目按 50%:50% 混合前景与背景体积雾"]
        B3 --> B4["输出 L=0.5000 (+0.4500 亮雾渗漏), 在 7/17 个轮廓像素裹上刺眼白圈!"]
    end
    subgraph KopfJBU["✅ Kopf 联合双边深度引导上采样 (0 光晕渗漏 · 快 9.50×)"]
        J1["读取全分 G-Buffer 深度 z_hi(8) = 2.0m 作为高分引导信号"] --> J2["计算深度亲和权重: w_depth(A)=1.0, w_depth(B)=exp(-23^2/0.5)=0.0"]
        J2 --> J3["背景采样点 B 权重被彻底截断, 归一化后 100% 采纳前景点 A"]
        J3 --> J4["第 8 站精准输出 L=0.0500, 第 9 站跃迁至 0.9500 (0 光晕, 误差 2.48e-15)"]
    end
```

### 3.3 帧级双边密度计与 3D 试验台渲染时序图
```mermaid
sequenceDiagram
    participant User as 架构师 / Playwright 测试器
    participant Solver as model.ts 联合双边深度门控内核
    participant Stage as WebGL2 58-Solid 3D 双边密度计台
    User->>Solver: 设定前景 z_fg=2m (L=0.05), 背景 z_bg=25m (L=0.95), sigma_z=0.5m, 检视第 i=8 站
    Solver->>Solver: 联合双边门控求得 w_B = exp(-1058) = 0 -> 输出精确前景雾 L_JBU = 0.0500
    Solver->>Solver: 对比硬件双线性基线 -> 输出 L_bilinear = 0.5000 (+0.4500 / 10× 光晕渗漏)
    Solver-->>Stage: 返回 17 个边界像素的上采样亮度、深度与光晕渗漏误差遥测
    Stage-->>User: 驱动 17 根体积雾立柱、17 颗 JBU 参考球、17 根光晕渗漏销与滑车同步渲染
```

---

## ④ 📊 视觉技术选型决策矩阵（Decision Matrix）

| 评估维度 | ✅ Kopf 联合双边深度上采样（Half-Res JBU） | ⚠️ 全分辨率 64 步体积步进（Full-Res Ray March） | ❌ 朴素硬件双线性上采样（Hardware Bilinear） | ⚠️ 最近邻点采样放大（Nearest-Neighbor） |
| :--- | :--- | :--- | :--- | :--- |
| **第 8 站（$z_{\text{hi}}=2.0\text{ m}$ 前景边缘）体积雾亮度** | **精确 `0.0500`（`0.0000` 渗漏）** | `0.0500`（误差 `2.48e-15`） | **`0.5000`（10.00× 发光白圈过冲！）** | `0.0500` 或 `0.9500`（2×2 马赛克锯齿块） |
| **第 9 站（$z_{\text{hi}}=25.0\text{ m}$ 背景首像素）亮度** | **精确 `0.9500`（刀锋级阶跃）** | `0.9500` | **`0.6125`（丢失 `-0.3375`，产生黑环）** | 严重块状阶梯锯齿 |
| **被轮廓光晕污染的像素站（共 17 站）** | **`0 / 17`（全站零渗漏）** | `0 / 17` | **`7 / 17`（第 5~11 站跨界过渡区全糊）** | 边缘半像素错位锯齿 |
| **平坦连续区域的平滑度** | **当 $\Delta z \approx 0$ 时自动退化为丝滑双线性** | 原生平滑 | 平滑但跨边界漏光 | **平坦区出现明显马赛克块** |
| **8,192 轮 17 站 CPU 批处理耗时** | **`1.13 ms`（最快，9.50× 提速）** | `10.71 ms`（慢 9.50×） | `0.45 ms`（严重发光白圈伪影） | `0.38 ms`（马赛克锯齿不可用） |
| **首选适用场景** | **所有半分辨率体积雾、体积云、SSAO 与半透明合成** | 离线真值核验 | **仅限无任何深度遮挡的 2D 纹理** | 调试视图 |

---

## ⑤ 🧪 全新 Demo 与 7-Card 4:5 视觉报告（Live Workbench & Evidence）

### 5.1 交互式 3D 试验台与报告入口
- **实时 3D 工作台**：[`demos/joint-bilateral-upsample-rig/index.html`](../demos/joint-bilateral-upsample-rig/index.html)
- **7-Card 4:5 英文视觉测试报告**：[`demos/joint-bilateral-upsample-rig/test-report-cards.html`](../demos/joint-bilateral-upsample-rig/test-report-cards.html)
- **7-Card 4:5 中文视觉测试报告**：[`demos/joint-bilateral-upsample-rig/test-report-cards.zh.html`](../demos/joint-bilateral-upsample-rig/test-report-cards.zh.html)
- **密封测量 JSON 数据源**：[`demos/joint-bilateral-upsample-rig/report.json`](../demos/joint-bilateral-upsample-rig/report.json)

### 5.2 多主题与多模式 Playwright 实测截图证据

| Kopf 联合双边上采样（Light · 在第 8→9 站深度断崖处实现 `0.0500 → 0.9500` 刀锋级阶跃，`0` 光晕） | 朴素硬件双线性上采样（Light · 在第 5~11 站拉出斜坡，第 8 站泄漏 `+0.4500` 亮雾白圈） |
| :---: | :---: |
| ![Kopf 联合双边亮色实测图](./evidence/joint-bilateral-upsample-rig/light-kopf-joint-bilateral-depth.png) | ![朴素双线性光晕渗漏亮色实测图](./evidence/joint-bilateral-upsample-rig/light-naive-hardware-bilinear.png) |

| Kopf 联合双边上采样（Dark · 58 实体部件） | 朴素硬件双线性上采样（Dark · 7 根红色指示销暴露跨轮廓发光光晕与暗环） |
| :---: | :---: |
| ![Kopf 联合双边暗色实测图](./evidence/joint-bilateral-upsample-rig/dark-kopf-joint-bilateral-depth.png) | ![朴素双线性光晕渗漏暗色实测图](./evidence/joint-bilateral-upsample-rig/dark-naive-hardware-bilinear.png) |

---

## ⑥ 🛠️ 高质量视觉交付快速核验清单（SA Verification Checklist）

在将半分辨率体积雾或 SSAO 上采样着色器合入生产引擎前，请逐项勾选以下核验清单：

- [ ] **禁止对降采样深度缓冲求算术平均（No Average Depth Downsample）**：生成半分辨率深度缓冲 $z_{\text{lo}}$ 时，是否采用了棋盘格 Min/Max 极值降采样或直接取左上角纹素，严防平均值制造出介于前景与背景之间的“幽灵中间深度”？
- [ ] **相对深度阈值缩放（$\sigma_z \propto z_{\text{hi}}$）**：在大跨度户外场景中，是否将深度容差设为与当前像素线性深度成正比（如 $\sigma_z = 0.05 \cdot z_{\text{hi}}$），确保近景角色（$2\text{ m}$）与远景山脉（$500\text{ m}$）都能获得恰当的边缘门控灵敏度？
- [ ] **权重分母非零保底（Weight Sum Epsilon Guard）**：当全分辨率像素位于亚像素孤立细丝上、导致周围 4 个低分纹素的深度权重都很小时，是否通过 `max(1e-12, w_spatial)` 保证了权重归一化分母绝不除零产生 `NaN`？
- [ ] **线性视空间深度比对（Linear View-Space Depth $z$）**：双边深度差 $|z_{\text{hi}} - z_{\text{lo}}|$ 是否在线性米制深度（或 Reversed-Z 倒数线性化后）上计算，而非直接在高度非线性的透视硬件深度缓冲值上相减？
- [ ] **结合 `textureGather` 单指令读取 $2\times 2$ 邻域**：在支持 Shader Model 5 / WebGL2 的管线中，是否使用 `textureGather` 一次性取出 $2\times 2$ 低分深度与低分颜色，减少纹理采样指令延迟？
