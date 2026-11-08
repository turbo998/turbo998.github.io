# AI Security Lab (`turbo998/ai-security-lab`)

**AI 安全研究、重磅安全事件深度复盘、智能体红蓝攻防演练与交互式可视化工作台**  
*(Consolidating and expanding the original Multi-Agent Red Team Lab / 原 `turbo998/agentic-red-team-lab` 全面升级整合版)*

[English Version (`README.en.md`)](README.en.md) · [⭐ 架构选型 FAQ 专题 1：模型护栏 vs 零信任能力网关 (`guardrails-vs-zero-trust-broker-selection-faq.md`)](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.md) · [⭐ 架构选型 FAQ 专题 2：MCP 工具投毒与动态 Rug-Pull 钉扎 (`mcp-tool-poisoning-and-pinning-selection-faq.md`)](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.md) · [⭐ 架构选型 FAQ 专题 3：跨智能体 A2A 身份伪造与 OBO 逐跳降权 (`a2a-obo-token-downscoping-vs-shared-credentials-faq.md`)](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.md) · [⭐ 架构选型 FAQ 专题 4：Coding Agent 沙盒隔离 Docker vs gVisor vs MicroVM (`agent-sandbox-docker-gvisor-microvm-selection-faq.md`)](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.md) · [⭐ 架构选型 FAQ 专题 5：企业 RAG/GraphRAG 间接注入与向量 Pre-Filter ACL (`rag-indirect-injection-and-vector-acl-selection-faq.md`)](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.md) · [交互式演练场 (`playground/index.html`)](playground/index.html) · [7 卡 4:5 基准评测卡片 (`playground/benchmark-cards.html`)](playground/benchmark-cards.html) · [业务场景落地 Playbook (`research/offensive-defensive/business-scenario-playbook.md`)](research/offensive-defensive/business-scenario-playbook.md) · [在线体验站 (`turbo998.github.io/workshops/ai-security/`)](https://turbo998.github.io/workshops/ai-security/)

---

## 高清可视化架构与评测一图总结 (Executive Visual Summary · 2026-11-08)

![AI 解决方案架构师 · 2026-11-08 模型级内容护栏 vs 零信任能力网关选型与攻防原理解析一图总结](docs/screenshots/executive-summary-2026-11-08.svg)

![AI 解决方案架构师 · 2026-11-08 Round 2 MCP 工具投毒、动态 Rug-Pull 与签名钉扎 vs 运行时能力沙盒选型一图流](docs/screenshots/mcp-tool-poisoning-pinning-faq-2026-11-08.svg)

![AI 解决方案架构师 · 2026-11-08 Round 3 跨智能体 A2A 身份伪造与 OBO 令牌逐跳交集降权 vs 共享凭据选型一图流](docs/screenshots/a2a-obo-token-downscoping-faq-2026-11-08.svg)

![AI 解决方案架构师 · 2026-11-08 Round 4 Coding Agent 沙盒隔离：Docker vs gVisor vs Firecracker MicroVM vs 硬件 TEE 选型一图流](docs/screenshots/agent-sandbox-isolation-faq-2026-11-08.svg)

![AI 解决方案架构师 · 2026-11-08 Round 5 企业 RAG/GraphRAG 间接注入与向量数据库 Pre-Filter 安全修剪选型一图流](docs/screenshots/rag-vector-acl-isolation-faq-2026-11-08.svg)

<details>
<summary>查看历史可视化一图总结 (2026-11-05, 2026-11-04, 2026-11-03, 2026-11-02 &amp; 2026-11-01 Executive Visual Summaries)</summary>

![AI 解决方案架构师 · 2026-11-05 OWASP AgBOM 钉扎与 RIFT-Bench 演化红队零信任一图总结](docs/screenshots/executive-summary-2026-11-05.svg)

![AI 解决方案架构师 · 2026-11-04 MCPSHIELD 幻觉包防御与多智能体合谋零信任一图总结](docs/screenshots/executive-summary-2026-11-04.svg)

![AI 解决方案架构师 · 2026-11-03 DeepMind CaMeL 与跨租户 MCP 零信任一图总结](docs/screenshots/executive-summary-2026-11-03.svg)

![AI 解决方案架构师 · 2026-11-02 ATTESTMCP 与 VPI-Bench 零信任攻防一图总结](docs/screenshots/executive-summary-2026-11-02.svg)

![AI 解决方案架构师 · 零信任与智能体攻防一图总结 (2026-11-01)](docs/screenshots/executive-summary-2026-11-01.svg)

</details>

---

## 核心定位与五大 AI 解决方案架构师支柱 (Five Core AI Solution Architect Pillars)

**AI Security Lab** 将原有的**多 Agent 协同红队安全演练工作台 (`apps/`, `packages/`)** 与前沿 AI 安全热点突破追踪、重大安全事件攻击链推演、自动化渗透攻防实验与行业解决方案 Playbook 整合为统一的工程与研究仓库：

| 支柱 | 目录与入口 | 核心研究与工程内容 |
|---|---|---|
| **0. 每日最热领域能力突破追踪 (Daily Hottest Domain Breakthroughs)** | [`research/daily/`](research/daily/) · [`research/trends/`](research/trends/) | [2026-11-08 每日双语研究报告](research/daily/2026-11-08.md) · [2026-11-05 报告](research/daily/2026-11-05.md) · [2026-11-04 报告](research/daily/2026-11-04.md) · [2026-11-03 报告](research/daily/2026-11-03.md) · [2026-11-02 报告](research/daily/2026-11-02.md) · [2026-11-01 报告](research/daily/2026-11-01.md) & [2026 AI 安全全景趋势 (中文)](research/trends/2026-ai-security-landscape.md) / [English](research/trends/2026-ai-security-landscape.en.md)：通俗拆解 **影子智能体 (Shadow Agent) 共享 API Key 混淆代理人风暴**、**五元组 Action-Hash 人工审批防重放**、**OWASP 2026 Agent Control Standard (`ACS`) 与 `AgBOM`**、**CSA/CISA 2026 MCP 密文注入与 STDIO RCE (`CVE-2025-6514`)**、**`RIFT-Bench` 演化红队**、**`MCPSHIELD` 幻觉包抢注防御**与 **Google DeepMind CaMeL**。 |
| **1. 架构选型与攻防原理解析 FAQ 专题 & 重大事件复盘 (Architecture Selection FAQ & Incident Deep Dives)** | [`research/offensive-defensive/`](research/offensive-defensive/) · [`research/incidents/`](research/incidents/) | ⭐ **Round 1 专题**：[《模型级内容安全护栏 vs. 确定性零信任能力网关选型与攻防原理解析 FAQ》(中文)](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.md) / [English](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.en.md)；⭐ **Round 2 专题**：[《MCP Server 工具投毒、动态 Rug-Pull 与签名钉扎 vs. 运行时能力沙盒选型 FAQ》(中文)](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.md) / [English](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.en.md)；⭐ **Round 3 专题**：[《跨智能体 A2A 身份伪造与 OBO 令牌逐跳交集降权 vs. 共享静态凭据选型 FAQ》(中文)](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.md) / [English](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.en.md)；⭐ **Round 4 专题**：[《Coding Agent 沙盒隔离：Docker vs. gVisor vs. Firecracker MicroVM vs. 硬件 TEE 选型 FAQ》(中文)](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.md) / [English](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.en.md)；⭐ **Round 5 专题**：[《企业 RAG / GraphRAG 间接提示词注入与跨租户向量权限安全修剪（Vector ACL Pre-Filter）选型 FAQ》(中文)](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.md) / [English](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.en.md)（均严格对标 `ib-vs-ethernet-roce-selection-faq.md` 六段式标杆），以及 [币安 60 亿美金级安全事件深度复盘 (中文)](research/incidents/binance-6b-incident-deep-dive.md) / [English](research/incidents/binance-6b-incident-deep-dive.en.md)。 |
| **2. 交互式攻防演练台开发 (Interactive Demo & Workbench)** | [`playground/`](playground/) · [`apps/web/`](apps/web/) | 零外部依赖、严格 CSP 合规的四合一交互式 H5 演练舱 ([中文](playground/index.html) / [EN](playground/index.en.html))：覆盖币安 $6B 杀伤链模拟器、**24 大 AI 渗透向量红蓝对抗舱**（新增影子智能体共享凭据混淆代理、五元组 HITL Epoch 防重放、MCP 跨服同名劫持、动态 Rug-Pull 签名钉扎、A2A OBO 逐跳交集降权、Agent Card JWS 签名防伪、Coding Agent `.git/hooks` 越界覆写隔离、`169.254.169.254` 云元数据 SSRF 阻断、企业 RAG 向量 Pre-Filter 安全修剪与 GraphRAG 社区摘要最高水位污点阻断）、四层防御成熟度自检与 8 大业务场景 ROI 计算器。 |
| **3. 可复现基准测试与 7 卡报告 (Reproducible Benchmark & 7-Card Deck)** | [`tests/`](tests/) · [`research/evidence.json`](research/evidence.json) | **38 个确定性红蓝合成夹具场景**（35 个高危攻击 + 3 个良性对照，**141 项 Pytest 断言 100% 通过**），将合成夹具下攻击成功率从 **75.0% 压降至 0.0%**（由 `scripts/measure_broker_latencies.py` 生成封存样本 `research/latency-samples-2026-11-08.json`：`Windows 11 ARM64 / Python 3.12.10` `measured` 纯内存 `digest+Broker.evaluate` `n=200` P50=`0.0199ms`，单步含 SQLite WAL 收据落盘 `n=50` P50=`7.21ms`），并生成 **7 卡 4:5 纵向基准评测报告** ([中文](playground/benchmark-cards.html) / [EN](playground/benchmark-cards.en.html))。 |
| **4. 技术适用业务场景方案开发 (Business Scenario & Solution Playbook)** | [`research/offensive-defensive/`](research/offensive-defensive/) | [AI 安全业务场景方案与选型决策树 Playbook (中文)](research/offensive-defensive/business-scenario-playbook.md) / [English](research/offensive-defensive/business-scenario-playbook.en.md) & [AI 驱动渗透测试与护栏 (中文)](research/offensive-defensive/agentic-pentesting-and-guardrails.md) / [EN](research/offensive-defensive/agentic-pentesting-and-guardrails.en.md)：针对金融金库 (213.6x ROI)、受监管金融/工业 OWASP AgBOM 合规网关 (190.8x ROI)、Coding Agent 幻觉包防投毒与合谋隔离 (178.5x ROI)、浏览器 RPA 与多 MCP 财务协同 (164.2x ROI)、多租户 SaaS MCP 联邦网关 (153.4x ROI)、企业多租户知识库 (23.9x ROI)、自主研发 Agent (23.7x ROI) 与跨境采购 (15.1x ROI) 提供五步决策树、合规映射与 Good Fit / Not For 边界。 |

---

## 仓库目录结构 (Repository Architecture)

```text
ai-security-lab/
├── research/                              # 四大支柱深度研究与结构化基准证据库
│   ├── incidents/                         # 重大安全事件复盘 (币安 60B 级安全事件中英双语深度报告)
│   ├── trends/                            # 行业趋势追踪 (OWASP Agentic Top 10 / MITRE ATLAS / NIST)
│   ├── offensive-defensive/               # AI 驱动渗透测试、MCP/A2A 攻防与确定性护栏研究
│   ├── daily/                             # 每日双语研究日志 (2026-11-01.md)
│   ├── evidence.json                      # 密封基准评测真值数据 (支撑 7 卡报告与演练场坐标)
│   ├── sources.json                       # 权威标准、链上取证与研究来源索引
│   ├── queue.json                         # 研究课题队列与交付物追踪
│   └── progress.json                      # 里程碑与双语覆盖率状态
├── playground/                            # 独立零依赖交互式 H5 演练场与 7 卡 4:5 视觉报告
│   ├── index.html / index.en.html         # 三合一交互演练台 (币安60B攻击链推演 / AI渗透攻防舱 / 四层防御矩阵)
│   └── benchmark-cards.html / .en.html    # 7-Card 4:5 Portrait 视觉基准报告 (严格 CSP & 零伪造坐标)
├── apps/web/                              # 多 Agent 红队安全演练 React + Vite 全功能前端工作台
├── packages/server/                       # FastAPI + SQLite + 确定性策略引擎与服务端收据审计后端
├── docs/                                  # 架构说明、代码走读、客户演示指南、实操录像与截图
├── scripts/                               # Windows 一键启动、构建与验证脚本
└── tests/                                 # Pytest 后端/回归测试套件与 Playwright 端到端测试
```

---

## 多 Agent 红队安全演练工作台 (Multi-Agent Red Team Workbench)

研究重点不仅在于“单个模型能否拒绝恶意提问”，更在于**多个代表不同主体的 Agent 与高价值金库/业务系统协作时，能否在提示词注入、工具投毒、跨链/多签盲签诱导下守住身份边界、信息边界与资金授权边界**。

> **本地优先，合成数据与架构推演透明分层。** Fixture 是明确标注的流程与工具沙箱演示，不是真实模型评估。Live 需要单独配置 Azure 模型并批准调用；本仓库不表示已部署 Azure 在线服务。重大事件推演明确区分公开链上取证事实与 $6B 级压力测试模拟。

## 两套多 Agent 场景 + 重大金库攻防演练，一套确定性证据链

| 场景 | 业务与工具 |
|---|---|
| **A 企业协作 (`enterprise-*`)** | 日程、行政、采购、财务、知识与供应商助手，分别持有独立的合成资产 |
| **B 研究网络 (`network-*`)** | 不同 principal 的 Agent 使用目录、私信、论坛、模拟钱包、市场与日程 |
| **C 金库与 MCP 攻防 (`playground/`)** | 币安 60B 级攻击链 6 阶段复盘与零信任熔断模拟、MCP 工具投毒与 A2A 越权护栏对比 |

每套覆盖 **传播、错误信息放大、伪共识/信任劫持、代理链**。H5 工作台包含场景中心、实验编排、演练舱、证据与代码、防护对比、报告与回放。

**演示主线：**正常协作 → 风险试探 → 消息与工具证据 → 代码定位 → 防护干预 → 干净快照配对 → 报告。

## 快速开始：Windows

需要 **Node.js 22+、Python 3.12、uv**。不要求 Docker。首次安装依赖需要网络，完成安装后 Fixture 与 `playground/` 不需要云服务或外部网页资源。

```powershell
git clone https://github.com/turbo998/ai-security-lab.git
Set-Location ai-security-lab
.\scripts\bootstrap.ps1
.\scripts\start-demo.ps1
```

打开 **http://127.0.0.1:8000**。脚本在前台运行，`Ctrl+C` 停止，只监听本机。端口占用时使用 `-Port 8001`，不停止其他应用。

PowerShell 执行策略受组织管理时，遵循组织批准的脚本运行方式；本项目不会修改机器级执行策略。

如果从 Release ZIP 开始，解压后执行相同脚本。ZIP 包含构建后的前端，但不是内置 Python/Node 的独立 EXE。

**依赖来源：**本版本的 Python 锁文件使用 [清华 PyPI 镜像](https://pypi.tuna.tsinghua.edu.cn/simple)，下载按锁文件中的哈希校验。开发环境访问官方包文件服务遇到 TLS 错误，未关闭证书校验。客户环境需允许该镜像；如组织要求其他包源，应重新解析并验证锁文件，不能直接替换下载 URL。npm 使用其锁文件记录的 registry。

## 运行模式

| 模式 | 执行来源 | 费用与解释 |
|---|---|---|
| **Fixture** | 合成决策驱动实际后端状态机、策略和模拟工具 | 不调用模型；指标仅用于演示，Live ASR 为 N/A |
| **Live** | 配置好的 Azure 模型产生实际 Agent 决策 | 可能计费；无配置不可用；失败不会暗中切换成 Fixture |
| **Replay** | 播放已记录事件，不重新执行工具 | 保留原始 Fixture/Live 来源；播放次数不是新评估样本 |

通过 `.env.example` 了解配置。只在本机创建 `.env`，使用 `.\scripts\start-demo.ps1 -LoadEnv` 显式加载。不要提交密钥、Azure 真实资源标识、客户数据或原始执行记录。

## 页面截图

截图由实际运行页面生成，发布版截图使用 **Fixture 合成演示**，不作为 Azure Live 运行证据。截图图集及来源信息在 [`docs/screenshots/`](docs/screenshots/)。

![企业协作：实际沙箱执行、Agent 拓扑与工具事件](docs/screenshots/03-enterprise-lab.png)

![相同快照下的 Baseline / Hardened 合成实验对比](docs/screenshots/07-comparison.png)

## 三分钟实操录像

[观看或下载录像](docs/videos/local-fixture-walkthrough.webm) · [章节、字幕与复录说明](docs/videos/README.md)

**3 分 03.56 秒**，连续录制真实 H5 操作：计划审批、暂停/单步、策略源码、防护配对和报告回放。静音，附中文画面讲解与独立字幕。此片为 **本地 Fixture**，不是 Azure 部署或真实模型评估证据；云部署仍待目标订阅确认及访问、持久化实现。

[![本地 Fixture 实操录像](docs/videos/poster.png)](docs/videos/local-fixture-walkthrough.webm)

## 客户演示与工程说明

- [客户演示指南](docs/demo-guide.zh-CN.md)
- [代码级讲解路线](docs/code-walkthrough.md)
- [架构与可信边界](docs/architecture.md)
- [Azure 部署准备与限制](docs/azure-deployment.md)
- [本地与 Azure 能力边界](docs/azure-capabilities.md)
- [API 与事件契约](docs/implementation-contract.md)
- [English overview](README.en.md)

## 安全与真实性

仅操作沙箱中的虚构对象与合成数据。工具没有任意 shell、任意网络请求、真实邮箱或真实付款能力。Baseline 仅放松模拟业务策略，**不关闭外层安全约束**。

本机身份和审批角色是演示模拟，不等同于 Entra 身份认证。不要把本地服务直接暴露到公网；云身份、网络、持久化及配额需在上线前单独完成。

评估依据是服务端工具收据、canary 流向和业务真值，不是前端动画或模型自称“成功”。正常业务完成情况、误阻断、失败和证据不足均需保留。

原始研究幻灯片不包含在仓库中。研究背景来自 [Microsoft Research 的公开文章](https://www.microsoft.com/en-us/research/blog/red-teaming-a-network-of-agents-understanding-what-breaks-when-ai-agents-interact-at-scale/)，本项目不是 Agora 的复制品，也不代表微软官方产品或安全认证。

## 私有仓库与交付

仓库和 Release 只对已授权的 GitHub 账号可见，链接不是公开客户站点。可在本机展示，或由拥有者按其组织规则交付脱敏 Demo 包。创建在线 Azure Demo 不属于本版本的默认安装动作。

[下载 v0.1.0-demo 发布包与 SHA-256 校验文件](https://github.com/turbo998/agentic-red-team-lab/releases/tag/v0.1.0-demo)。

## 开发与回归

```powershell
npm run dev
npm run build
npm test
uv run --no-sync pytest tests -q
npm run test:e2e
```

开发模式使用 Vite 的 API 代理；另在终端启动 Python API。Windows 浏览器回归默认使用已安装的 Microsoft Edge，Linux CI 安装 Chromium。首次安装采用项目锁文件，不将本机可选的 Azure 身份依赖强加到所有 Windows ARM64 环境。
