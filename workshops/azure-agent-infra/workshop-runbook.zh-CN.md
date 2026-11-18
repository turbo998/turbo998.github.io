# Azure AI Agent Infrastructure — 第 04 步验证（Validate）：客户现场动手工作坊与目标架构白板手册

> 🌐 **Language / 语言切换**: **中文版（当前）** | **[🇬🇧 English Edition (`workshop-runbook.md`)](workshop-runbook.md)** | **[📘 Playbook 中文版 (`README.md`)](README.md)** | **[📘 Playbook English (`README.en.md`)](README.en.md)**

> **用途说明**：面向 Cloud & AI Solution Architect 的客户现场交付指南，对应 Azure Agent Infra 五步落地法（`Initial Screening → Discovery → Define → Validate → Implement`）中的核心转化节点 **Step 04 Validate（半天 / 全天动手实验 + 目标生产架构白板共创）**。

---

## 1. Step 04 Validate 核心交付目标

- **上午场（Hands-On Lab，2.5 小时）**：客户平台工程与 AI 研发团队基于真实业务场景，部署目标运行时最小闭环切片（`ACA Dynamic Sessions / Sandboxes`、`AKSClaw Kata Pod VM` 或 `E2B on Azure VMSS`），并打通持久化状态库（`Azure HorizonDB` 或 `Azure Cosmos DB`）。
- **下午场（目标架构白板共创，2.0 小时）**：联合敲定客户专属的 **生产目标参考架构图**、**5 道平台级零信任硬边界核查表**、**容量与月度 TCO 测算表** 以及 **4 周生产割接里程碑**。

---

## 2. 半天 / 全天工作坊标准议程（Agenda）

| 时间段 | 时长 | 模块主题 | 现场交付物 |
|---|---:|---|---|
| **09:30 – 10:00** | 30 分钟 | **模块 1：四层全栈全景与六级运行时光谱对齐** | 结合 [图 01](assets/01-azure-agent-infra-4layer-panorama.svg) 与 [图 02](assets/02-runtime-spectrum-6tier-matrix.svg)，对齐“计算与状态解耦 + 硬件级沙箱隔离”核心原则 |
| **10:00 – 10:45** | 45 分钟 | **模块 2：双阶段选型决策树与研发承接门禁核验** | 使用 [交互式选型决策器 (`h5/selector.html`)](h5/selector.html) 输入客户真实并发规模、隔离诉求与平台团队准备度 |
| **10:45 – 12:00** | 75 分钟 | **模块 3：分赛道动手实验（任选下方 Track A / B / C）** | 运行 `python demo/run_live_demo.py --self-test` 并演练 [`blueprints/`](blueprints) 对应生产级 IaC 蓝图 |
| **13:30 – 14:30** | 60 分钟 | **模块 4：零信任控制面与 5 道平台硬边界红蓝演练** | 在 [`h5/demo.html`](h5/demo.html) 复现越权攻击拦截：验证 IMDS 封禁（`169.254.169.254/32`）、零外网围栏、容器零密钥与 APIM 令牌预算熔断 |
| **14:30 – 15:30** | 60 分钟 | **模块 5：状态持久化、容量测算与 FinOps 建模** | 使用 [`h5/selector.html`](h5/selector.html) 测算 VMSS / AKS 节点规模、`HorizonDB + PgBouncer` 连接复用与 TCO |
| **15:30 – 16:00** | 30 分钟 | **模块 6：目标生产架构签字确认与 Step 05 排期** | 明确 PoC 验收红线、CSU / 认证合作伙伴分工及生产上线时间表 |

---

## 3. 三大可选动手实验赛道（Hands-On Lab Tracks）

### 赛道 A：全托管 PaaS 沙箱赛道（`ACA + ACA Dynamic Sessions / ACA Sandboxes`）
- **适用团队**：希望以零 K8s/微虚机运维负担获得亚秒级（`~210 ms` Hyper-V 预热池）代码隔离执行或有状态工作区的企业业务团队。
- **核心蓝图**：[`blueprints/aca-dynamic-sessions-pool.bicep`](blueprints/aca-dynamic-sessions-pool.bicep) + [`blueprints/horizondb-langgraph-checkpointer.py`](blueprints/horizondb-langgraph-checkpointer.py)
- **现场验收标准**：
  1. 确认 `sessionNetworkConfiguration.status == 'EgressDisabled'` 生效；
  2. 不可信 Python 代码从预热池分配并完成执行延迟 `< 250 ms`；
  3. 会话检查点通过 PgBouncer (`:6432`) 落盘至 HorizonDB 延迟 `< 15 ms`。

### 赛道 B：企业多租户 Kubernetes 智能体舰队赛道（`AKS + Kata Pod VM / AKSClaw`）
- **适用团队**：拥有平台工程团队、需统一托管 50–1,000+ 研发/SRE/分析智能体（共享只读 `/skills` 技能卷 + 实例独占 `/workspace` 状态卷）的中大型企业。
- **核心蓝图**：[`blueprints/aksclaw-kata-fleet.yaml`](blueprints/aksclaw-kata-fleet.yaml) + [`blueprints/entra-agent-id-ai-gateway-policy.xml`](blueprints/entra-agent-id-ai-gateway-policy.xml)
- **现场验收标准**：
  1. Pod 强制绑定 `runtimeClassName: kata-vm-isolation`（单台 `Standard_D64s_v6` 稳态承载 `109` 个沙箱，内存效率 `85.16%`）；
  2. 沙箱内访问 `http://169.254.169.254/metadata/identity/oauth2/token` 被 NetworkPolicy `100%` 丢包阻断；
  3. 容器环境变量零明文 LLM API Key，所有模型调用经由 APIM AI Gateway 并携带 `x-ms-audit-dual-attribution` 双重身份审计头。

### 赛道 C：十万级并发 Firecracker 云端虚拟电脑赛道（`E2B on Azure VMSS Flexible`）
- **适用团队**：构建 `Manus` 式自主云端电脑或超高并发 Coding Agent、要求 `10,000–100,000+` 并发沙箱与 `108 ms` 级恢复延迟的 AI 原生产品团队。
- **核心蓝图**：[`blueprints/e2b-vmss-d96as-v7.bicep`](blueprints/e2b-vmss-d96as-v7.bicep) + [`blueprints/e2b-apim-per-host-policy.xml`](blueprints/e2b-apim-per-host-policy.xml)
- **现场验收标准**：
  1. `Standard_D96as_v7` VMSS Flexible 开启 `enableAcceleration: true` 与 `nr_hugepages=174080`（预留 `340 GiB` 大页内存）；
  2. 双跳入口（`AppGW WAF v2` 公私双前端 IP → `APIM` 按动态 Host 限流 → `Nomad Client Pool`）验证通配符 TLS 与 WebSocket 流式透传；
  3. Firecracker `UFFD + NBD` 快照在并发突增下 P50 恢复延迟稳定 `< 150 ms`。

---

## 4. 生产割接准入核查表（Step 04 → Step 05 Exit Gate）

| 治理维度 | 核查项 | 目标红线 / 架构不变量 | 状态 |
|---|---|---|---|
| **交付承接治理** | 具备客户自有平台工程团队，或已签署 CSU / 合作伙伴交付计划 | 当 `needs_infra_control_beyond_managed == true` 时强制门禁 | `[ ]` |
| **计算内核隔离** | 所有不可信代码生成与自主工具循环均运行在硬件虚拟化边界内 | Hyper-V (`ACA`)、Kata Pod VM (`AKS`) 或 KVM/Firecracker (`E2B`) | `[ ]` |
| **IMDS 防护** | 所有沙箱强制阻断宿主机元数据地址 `169.254.169.254/32` | NetworkPolicy / iptables `100%` 丢弃 | `[ ]` |
| **凭据零落地** | 沙箱容器环境变量零明文 LLM API Key 或数据库连接串 | `OPENAI_BASE_URL` 统一指向内网 AI Gateway（`Keyless Pod`） | `[ ]` |
| **令牌预算硬熔断** | AI 网关按实例 / 团队 / 租户启用 TPM 与日度预算熔断 | 死循环 Agent 自动触发 `HTTP 429`，绝不击穿全局 PTU 配额 | `[ ]` |
| **状态持久化与留存** | 启用持久化检查点（`HorizonDB + PgBouncer` 或 `Cosmos DB`）+ 30 天 TTL | PgBouncer 连接切换 `~5 ms`；热快照 ZSTD 压缩生命周期完备 | `[ ]` |
