# 验证与质量门禁记录 (Validation & Quality Gates)

> 🌐 **Language / 语言**: **中文** | [English (`validation.en.md`)](validation.en.md)

本文件记录 `turbo998/generative-visual-lab` 的自动化构建、Blender 4.5 LTS MCP 资产校验、浏览器端到端（Playwright E2E）视觉门禁与线上 Pages 部署验收标准。仓库已全面清理非 AI 解决方案架构师（SA）范畴的经典力学/机械传感器参数实验台，当前全量验证覆盖 **41 项生成式视觉与多模态架构演示**及配套中英双语研究指南。

---

## 一、 核心验证命令与硬性性能预算

每次架构迭代或文档更新合并至 `main` 分支前，均需通过根仓库与独立子应用全量检查：

```powershell
npm run check
npm --prefix demos\astra-planet run check
```

| 验证套件 | 覆盖范围与核心断言 | 性能 / 包体硬门禁 | 当前验收状态 |
| --- | --- | --- | --- |
| **根仓库类型检查与单元测试** | `tsc --noEmit` + Vitest（`blender-assets.test.ts`、`motion.test.ts`、`flight.test.ts`、`landscape.test.ts`、`frame-budget.test.ts` 及 31 个企业 AIGC 管线基准测试） | Blender MCP 烘焙资产字节长度、PNG 签名头与 JSON 审计记录逐字节一致 | **全部通过** |
| **根仓库生产构建与文档编译** | Vite 多入口打包 + `scripts/assemble.mjs` 组装 41 个交互演示、研究指南与 `scripts/render-faqs.mjs` 渲染 62 篇中英双语选型 FAQ | 零死链、零缺失静态资源、所有 7-Card 评测报告遵循离线自包含 CSP | **全部通过** |
| **根仓库 Playwright E2E 视觉验收** | 门户 `1440px / 900px / 390px` 三视口零横向溢出（`gallery.spec.ts`）、飞天飞行/人物近景/五声音阶/减动效（`visual.spec.ts`）、火箭四阶段升空/双机位/上下文恢复（`rocket.spec.ts`） | **飞天群飞 `p95 <= 33.3ms`（本机） / `50.0ms`（软件 CI）**<br>**火箭升空 `p95 <= 50.0ms`（本机） / `66.7ms`（软件 CI）** | **全部通过（飞天 `p95 ≈ 16.8ms`，火箭 `p95 ≈ 33.4ms`）** |
| **Astra 独立类型检查、单测与 E2E** | `tsc --noEmit` + 13 项 Vitest 单测 + 14 项 Playwright E2E（NASA MOLA 高程一致性、四模式切换、地标取景、米制 GLB 导出重载、SHA-256 篡改拦截） | **首屏离线包体（`?noHd=1`）`< 6.0 MiB`**；科学测高几何与艺术光影严格解耦 | **全部通过（首屏约 `2.63 MiB`）** |

---

## 二、 分层架构验证重点

### 1. 第一阶段：实时程序造景与科学数据可视化（飞天 & Astra）
- **飞天（`demos/feitian/`）**：验证完整飞行轨迹与精准返航、暂停态确定性推进、群飞粒子上限、`prefers-reduced-motion` 原位揭色、`390px` 窄屏适配、键盘可访问性、WebAudio 主动开启/静音以及高分截图下载。将逐笔触阴影重构为图层合成阴影与二倍人物离屏缓存后，`1440×1000` 稳定尾部 120 帧 `p95` 稳定在 `16.8ms`。
- **Astra 火星实验室（`demos/astra-planet/`）**：验证 NASA MOLA `1440×720` 基础包与 `4096×2048` 高清包 CPU/GPU 采样零偏差、非退化球面网格与经度接缝法线连续性、米制 `.glb` 导出后独立加载一致性、WebGL 上下文丢失恢复，以及阻断外部网络请求下的完全离线运行能力。
- **线上 Pages 基准验收**：提交 `3c7a2a5`（Actions `37949540467`）与后续部署均通过生产地址实测，门户页、研究页、飞天与 Astra 返回 `HTTP 200`，无控制台报错或静态资源 `404`（详见 `evidence/online-stage-one.json`）。

### 2. 第二阶段：Blender 4.5 LTS MCP 硬表面套件与火箭发射场（Launch）
- **火箭发射场（`demos/rocket-launch/`）**：验证待命不自动播放、前 4 秒台面点火蓄力、脐带臂分离与离台升空、双机位切换、完成态重放及圆形舷窗安全边界投影断言（箭体头部与发射台均保持在安全取景框内）。
- **静态合批与自适应帧预算**：通过按材质桶合并静态发射台构件，将渲染调用（Draw Calls）由 `142` 压降至 `28–32`；性能测试先预热至少 240 帧再采样尾部 120 帧稳定窗口，支持低帧率环境下自动切换 `DPR 0.65 / 0.4` 节能档位（线上验收记录见 `evidence/online-stage-two.json`）。

### 3. 第三阶段：多模态工作室、3D 世界模型与企业级 AIGC 生产管线（38 套交互工作台）
- **7 套多模态与世界模型导演台**：覆盖 `pelican-bicycle-arena`（三大 AI 工程套件同题对决）、`knowledge-explainer-studio`（3×3 视觉密度门禁）、`camera-4d-director`（4DGS + Plücker 相机矩阵）、`audiovisual-foley-studio`（LTX-2 双流音画与 FramePack O(1) 显存）、`physgaussian-world-studio`（本构 3DGS 与世界模型控频）、`neural-relight-director`（逆向 G-Buffer 视频重打光）与 `worldmem-action-director`（动作条件世界模型与情景记忆）。
- **31 套企业级 AIGC 管线与 FinOps 工作台**：每套工作台均包含可交互参数对比画布、密封评测数据 `report.json`、符合离线 CSP 规范的中英双语 7-Card `4:5` 视觉评测报告（`test-report-cards.html` / `test-report-cards.zh.html`）以及面向架构师选型决策的双语 FAQ 文档。
- **合规与隐私扫描**：全仓公开产物均通过静态扫描，不包含私人本地绝对路径、会话 ID、私有令牌或第三方未授权商业截图；所有数据来源严格标注 `measured`（实测）、`synthetic`（架构仿真）与 `not_measured` 边界。
