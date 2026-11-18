# Enterprise AI & Agent Security Lab (`turbo998/ai-security-lab`)

> 🌐 **Language / 语言切换**: **中文 (当前)** | **[English (`README.en.md`)](README.en.md)**
> 🎮 **交互式安全演练场与评测报告**: **[AI 攻防交互演练场 (`playground/index.html`)](playground/index.html)** · **[7-Card 4:5 基准测试视觉卡片 (`playground/benchmark-cards.html`)](playground/benchmark-cards.html)**

面向 **Enterprise Cloud & AI Solution Architect（企业云与 AI 解决方案架构师）** 的全栈智能体安全工程实验台与零信任参考架构知识库。本仓库将**可本地复现的多智能体红蓝对抗工作台（`apps/api` + `apps/web`）**、**亚毫秒级零信任能力网关（Zero-Trust Capability Broker）**、**重大金库攻击链仿真器**与 **138 篇中英双语企业级 AI 安全架构与主流云安全产品横向选型指南（累计 Round 320 · 320-FAQ 里程碑）**融为一体。

---

## 核心架构主张 (Architectural Thesis)

企业落地大模型与多智能体（Multi-Agent / MCP / A2A）时最常见的架构误区，是**把权限边界寄托在概率性的提示词约束或单一输入输出文本护栏上**。公开基准显示，面对伪装成正常商务单据的间接提示词注入（Indirect Prompt Injection）与混淆代理人（Confused Deputy）跨主体调用，单纯依赖语义护栏仍存在显著漏报；而一旦将工具副作用收归服务端确定性 **Zero-Trust Capability Broker**（强制校验主体委托链、数据污点标签、资产所有权、五元组 `Action-Hash` 人工审批与 Canary 出站防泄漏）：

| 核心验证维度 | 实测 / 验证结果 | 数据来源与口径声明 (`Provenance`) |
|---|---|---|
| **确定性红蓝对抗与合规基准** | Baseline `75.0% ASR` $\rightarrow$ Hardened **`0.0% ASR` (`-75.0 pts`)** | `synthetic` (`668` 个企业场景：`665` 攻击夹具 + `3` 正常基线，离线状态机验证) |
| **正常业务完成率 / 误阻断率** | **`100.0%` 正常完成 / `0.0%` 误报阻断** | `synthetic` (`666 / 666` 项 Pytest 自动化测试全部通过 · 累计 `1,402` 项确定性断言) |
| **纯内存策略门控延迟 (`Broker.evaluate`)** | **`P50 = 0.0248 ms` / `P95 = 0.0409 ms`** (`33,493 ops/s`) | `measured` (`n=200` 本地实测样本封存于 `research/latency-samples-2026-11-08.json`) |
| **单步含 SQLite WAL 审计收据落盘** | **`P50 = 7.21 ms` / `P95 = 8.19 ms`** | `measured` (`n=50` 本地实测样本，`scripts/measure_broker_latencies.py`) |
| **$6B 级多签金库与跨链桥攻击链压力推演** | Baseline 模拟流失 `$1.42B` $\rightarrow$ Hardened **`$0` 流失 (`14 ms` 流速熔断)** | `synthetic` ([币安级攻击链深度复盘](research/incidents/binance-6b-incident-deep-dive.md) + `playground/index.html`) |

---

## 企业 AI 安全六层零信任参考架构总览 (Executive Visual Blueprints)

![首席 AI 架构师六层零信任参考架构总览](docs/screenshots/chief-architect-enterprise-ai-security-blueprint-faq-2026-11-18.svg)

![CISO 董事会 AI 治理、全球合规与投资回报量化蓝图](docs/screenshots/ciso-ai-governance-eu-ai-act-roi-faq-2026-11-18.svg)

---

## 仓库核心模块导航 (Repository Structure)

| 模块路径 | 架构师用途与核心交付物 |
|---|---|
| [`apps/api/`](apps/api/) & [`apps/web/`](apps/web/) | **多 Agent 红队安全演练工作台**：FastAPI 确定性状态机、零信任 `Capability Broker` (`apps/api/redteam/broker.py`)、Canary 防泄漏检测器与 React + TypeScript 六页交互式取证控制台。 |
| [`playground/`](playground/) | **零外部依赖自包含 H5 演练台** (`CSP: default-src 'none'`)：[交互式攻防演练场 (中文)](playground/index.html) / [EN](playground/index.en.html)（含 `$6B` 金库 6 阶段推演、`654` 大企业级红蓝对抗向量开关、OWASP 四层防御矩阵、ALE 风险 ROI 计算器）与 [7-Card 4:5 评测卡片 (中文)](playground/benchmark-cards.html) / [EN](playground/benchmark-cards.en.html)。 |
| [`research/offensive-defensive/`](research/offensive-defensive/) | **138 篇中英双语企业 AI 安全架构与产品横向选型指南（Round 320）**（每篇均含高管速览、灵魂拷问 Q&A、Mermaid 架构图、主流云与开源方案选型矩阵、确定性代码映射与上线 Checklist）。 |
| [`research/trends/`](research/trends/) & [`research/incidents/`](research/incidents/) | [2026 企业 AI 与智能体安全趋势全景 (中文)](research/trends/2026-ai-security-landscape.md) / [EN](research/trends/2026-ai-security-landscape.en.md)，以及 [$6B 级多签金库与跨链桥攻击链深度复盘 (中文)](research/incidents/binance-6b-incident-deep-dive.md) / [EN](research/incidents/binance-6b-incident-deep-dive.en.md)。 |
| [`research/daily/`](research/daily/) & [`research/evidence.json`](research/evidence.json) | 架构演进专题研报（[2026-11-18](research/daily/2026-11-18.md) · [2026-11-09](research/daily/2026-11-09.md) · [2026-11-08](research/daily/2026-11-08.md) · [2026-11-05](research/daily/2026-11-05.md) · [2026-11-04](research/daily/2026-11-04.md) · [2026-11-03](research/daily/2026-11-03.md) · [2026-11-02](research/daily/2026-11-02.md) · [2026-11-01](research/daily/2026-11-01.md)）与封存评测证据链。 |
| [`tests/`](tests/) & [`scripts/`](scripts/) | `666` 项自动化回归检查（累计 `1,402` 项确定性断言，`tests/test_backend.py` + `tests/test_regressions.py`）、本地微基准测试脚本 (`scripts/measure_broker_latencies.py`) 与发布合规审计脚本 (`scripts/audit-publication.py`)。 |

---

## 企业 AI 安全架构与产品选型双语知识库 (138 Bilingual SA Selection Guides · Round 320)

所有指南均从 **AI Solution Architect 架构评审与选型视角** 撰写，覆盖 Azure、AWS、GCP、Databricks、Snowflake 与主流开源方案对比，保持 100% 中英双语同步：

### 1. 顶层参考蓝图、CISO 治理合规与 AI 红队自动化评测

| 核心架构议题与产品对比焦点 | 中文指南 | English Guide |
|---|---|---|
| **企业 AI 安全六层零信任参考架构与产品选型全景蓝图** | [中文全文](research/offensive-defensive/chief-architect-enterprise-ai-security-6layer-reference-blueprint-faq.md) | [English](research/offensive-defensive/chief-architect-enterprise-ai-security-6layer-reference-blueprint-faq.en.md) |
| **CISO 董事会 AI 治理、全球合规 (EU AI Act / ISO 42001 / NIST AI RMF) 与 ROI 量化** | [中文全文](research/offensive-defensive/ciso-ai-governance-eu-ai-act-iso42001-roi-selection-faq.md) | [English](research/offensive-defensive/ciso-ai-governance-eu-ai-act-iso42001-roi-selection-faq.en.md) |
| **企业 AI 责任险与网络安全核保 (Munich Re aiSure / 劳合社)：密码学收据降保费** | [中文全文](research/offensive-defensive/enterprise-ai-cyber-insurance-underwriting-liability-selection-faq.md) | [English](research/offensive-defensive/enterprise-ai-cyber-insurance-underwriting-liability-selection-faq.en.md) |
| **八大高价值企业业务场景安全架构选型决策树与 Playbook** | [中文全文](research/offensive-defensive/business-scenario-playbook.md) | [English](research/offensive-defensive/business-scenario-playbook.en.md) |
| **多智能体渗透测试方法论、攻击向量分类与纵深防御体系** | [中文全文](research/offensive-defensive/agentic-pentesting-and-guardrails.md) | [English](research/offensive-defensive/agentic-pentesting-and-guardrails.en.md) |
| **AI 红队工具横向选型与 CI/CD 门禁：Azure PyRIT vs. Promptfoo vs. Garak vs. Inspect AI** | [中文全文](research/offensive-defensive/pyrit-foundry-vs-promptfoo-garak-inspect-ai-redteam-cicd-faq.md) | [English](research/offensive-defensive/pyrit-foundry-vs-promptfoo-garak-inspect-ai-redteam-cicd-faq.en.md) |
| **防 LLM-as-a-Judge 评测被劫持 (Reward Hacking) vs. 确定性状态收据校验器** | [中文全文](research/offensive-defensive/agent-evaluation-benchmark-gaming-and-reward-hacking-defense-faq.md) | [English](research/offensive-defensive/agent-evaluation-benchmark-gaming-and-reward-hacking-defense-faq.en.md) |
| **失陷智能体应急熔断 (Kill-Switch)：Microsoft Sentinel + Entra CAE + Epoch Fencing** | [中文全文](research/offensive-defensive/ai-incident-response-killswitch-sentinel-epoch-fencing-faq.md) | [English](research/offensive-defensive/ai-incident-response-killswitch-sentinel-epoch-fencing-faq.en.md) |

### 2. 大模型安全护栏、AI 网关、算力成本防刷与结构化输出校验

| 核心架构议题与产品对比焦点 | 中文指南 | English Guide |
|---|---|---|
| **大模型安全护栏横向选型：Azure Prompt Shields vs. Bedrock vs. NeMo vs. Lakera vs. Llama Guard** | [中文全文](research/offensive-defensive/llm-guardrails-azure-bedrock-nemo-lakera-llamaguard-selection-faq.md) | [English](research/offensive-defensive/llm-guardrails-azure-bedrock-nemo-lakera-llamaguard-selection-faq.en.md) |
| **概率性输入输出护栏 vs. 服务端零信任能力网关 (Capability Broker) 架构边界** | [中文全文](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.md) | [English](research/offensive-defensive/guardrails-vs-zero-trust-broker-selection-faq.en.md) |
| **企业级 AI 网关选型：Azure APIM GenAI Gateway vs. Kong AI vs. LiteLLM vs. Portkey** | [中文全文](research/offensive-defensive/enterprise-ai-gateway-apim-kong-litellm-portkey-selection-faq.md) | [English](research/offensive-defensive/enterprise-ai-gateway-apim-kong-litellm-portkey-selection-faq.en.md) |
| **AI 网关跨租户 Prompt Cache HMAC 隔离与防恶意触发路由降级** | [中文全文](research/offensive-defensive/ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.md) | [English](research/offensive-defensive/ai-gateway-prompt-cache-isolation-and-fallback-selection-faq.en.md) |
| **AI 算力成本防刷 (Anti-DoW)：Azure OpenAI PTU + PayGo 溢出限流与推理 Token 预算锁** | [中文全文](research/offensive-defensive/ai-finops-denial-of-wallet-ptu-paygo-token-breaker-faq.md) | [English](research/offensive-defensive/ai-finops-denial-of-wallet-ptu-paygo-token-breaker-faq.en.md) |
| **企业云成本治理 (Cloud FinOps)：只读 FOCUS 账单 + `CanNotDelete` 灾备锁 + RI 审批门禁** | [中文全文](research/offensive-defensive/cloud-finops-cost-optimization-ri-purchasing-agent-security-selection-faq.md) | [English](research/offensive-defensive/cloud-finops-cost-optimization-ri-purchasing-agent-security-selection-faq.en.md) |
| **多智能体递归扇出风暴防御与状态转移哈希熔断器** | [中文全文](research/offensive-defensive/agent-denial-of-wallet-and-recursive-fanout-breaker-faq.md) | [English](research/offensive-defensive/agent-denial-of-wallet-and-recursive-fanout-breaker-faq.en.md) |
| **结构化输出安全选型：`strict: true` 受限解码 + Pydantic v2 防重复键走私** | [中文全文](research/offensive-defensive/structured-outputs-json-schema-pydantic-security-selection-faq.md) | [English](research/offensive-defensive/structured-outputs-json-schema-pydantic-security-selection-faq.en.md) |
| **多态 `anyOf` 分支劫持防御与入模前动态最小 Schema 裁剪** | [中文全文](research/offensive-defensive/structured-output-json-schema-smuggling-and-ast-validation-faq.md) | [English](research/offensive-defensive/structured-output-json-schema-smuggling-and-ast-validation-faq.en.md) |
| **推理模型思维链 (CoT) 敏感信息剥离与入模前格式保留脱敏** | [中文全文](research/offensive-defensive/agent-reasoning-trace-cot-leakage-and-redaction-faq.md) | [English](research/offensive-defensive/agent-reasoning-trace-cot-leakage-and-redaction-faq.en.md) |
| **多智能体框架安全选型：Microsoft Agent Framework (AutoGen+SK) vs. LangGraph vs. CrewAI** | [中文全文](research/offensive-defensive/multi-agent-framework-autogen-sk-langgraph-crewai-security-selection-faq.md) | [English](research/offensive-defensive/multi-agent-framework-autogen-sk-langgraph-crewai-security-selection-faq.en.md) |

### 3. 智能体身份治理 (Entra Agent ID / NHI)、A2A 委托与 MCP 协议安全

| 核心架构议题与产品对比焦点 | 中文指南 | English Guide |
|---|---|---|
| **智能体身份与委托选型：Microsoft Entra Agent ID + OBO vs. Managed Identity + 五元组 HITL** | [中文全文](research/offensive-defensive/entra-agent-id-obo-vs-managed-identity-hitl-selection-faq.md) | [English](research/offensive-defensive/entra-agent-id-obo-vs-managed-identity-hitl-selection-faq.en.md) |
| **跨智能体 A2A 调用链 OBO 权限缩权 vs. 共享凭据防混淆代理人 (Confused Deputy)** | [中文全文](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.md) | [English](research/offensive-defensive/a2a-obo-token-downscoping-vs-shared-credentials-faq.en.md) |
| **非人类身份 (NHI) 治理：Entra Workload ID + DPoP/mTLS 绑定 + 僵尸 Agent 自动回收** | [中文全文](research/offensive-defensive/agent-nhi-workload-id-dpop-mtls-zombie-governance-faq.md) | [English](research/offensive-defensive/agent-nhi-workload-id-dpop-mtls-zombie-governance-faq.en.md) |
| **智能体凭据防窃取重放：发送方约束令牌 (DPoP / mTLS) 密码学选型** | [中文全文](research/offensive-defensive/agent-nhi-identity-dpop-mtls-token-binding-selection-faq.md) | [English](research/offensive-defensive/agent-nhi-identity-dpop-mtls-token-binding-selection-faq.en.md) |
| **远程 MCP 网关与沙盒选型：Azure APIM MCP Proxy vs. 本地直连 & ACA / Kata / E2B** | [中文全文](research/offensive-defensive/apim-mcp-gateway-vs-aca-dynamic-sessions-kata-e2b-sandbox-faq.md) | [English](research/offensive-defensive/apim-mcp-gateway-vs-aca-dynamic-sessions-kata-e2b-sandbox-faq.en.md) |
| **MCP 工具描述投毒、跨服工具遮蔽 (Tool Shadowing) 与 Manifest 哈希钉扎** | [中文全文](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.md) | [English](research/offensive-defensive/mcp-tool-poisoning-and-pinning-selection-faq.en.md) |
| **企业影子 MCP Server 与研发 IDE 扩展供应链准入治理** | [中文全文](research/offensive-defensive/shadow-mcp-ide-plugin-extension-governance-and-broker-faq.md) | [English](research/offensive-defensive/shadow-mcp-ide-plugin-extension-governance-and-broker-faq.en.md) |
| **影子 AI 与恶意浏览器插件治理：Defender CASB + Purview 浏览器 DLP + OAuth 管理员同意流** | [中文全文](research/offensive-defensive/shadow-ai-casb-browser-extension-oauth-consent-governance-faq.md) | [English](research/offensive-defensive/shadow-ai-casb-browser-extension-oauth-consent-governance-faq.en.md) |
| **跨企业 B2B 智能体联邦：Entra 跨租户身份 + JWS 签名 Agent Card + 数据净室** | [中文全文](research/offensive-defensive/b2b-cross-org-a2a-agent-federation-entra-cleanroom-selection-faq.md) | [English](research/offensive-defensive/b2b-cross-org-a2a-agent-federation-entra-cleanroom-selection-faq.en.md) |
| **跨组织多智能体协同边界隔离与双向零信任能力网关** | [中文全文](research/offensive-defensive/cross-org-b2b-agent-cleanroom-and-federated-broker-faq.md) | [English](research/offensive-defensive/cross-org-b2b-agent-cleanroom-and-federated-broker-faq.en.md) |
| **多租户 B2B SaaS AI 应用 (ISV) 租户隔离：Pool/Bridge/Silo + JWT 强绑定 + BYOK** | [中文全文](research/offensive-defensive/multi-tenant-b2b-saas-isv-agent-isolation-architecture-selection-faq.md) | [English](research/offensive-defensive/multi-tenant-b2b-saas-isv-agent-isolation-architecture-selection-faq.en.md) |

### 4. 企业 RAG 权限修剪、Purview DLP、湖仓数据智能体、记忆与隐私合规

| 核心架构议题与产品对比焦点 | 中文指南 | English Guide |
|---|---|---|
| **企业 RAG 数据防泄漏选型：Microsoft Purview 敏感度标签继承 vs. AI Search 安全筛选器** | [中文全文](research/offensive-defensive/purview-sensitivity-labels-vs-ai-search-security-trimming-rag-faq.md) | [English](research/offensive-defensive/purview-sensitivity-labels-vs-ai-search-security-trimming-rag-faq.en.md) |
| **Microsoft 365 Copilot 内部知识库“过度共享”治理：SharePoint SAM + Purview 自动打标** | [中文全文](research/offensive-defensive/sharepoint-copilot-oversharing-sam-purview-governance-selection-faq.md) | [English](research/offensive-defensive/sharepoint-copilot-oversharing-sam-purview-governance-selection-faq.en.md) |
| **RAG / GraphRAG 间接提示词注入防御与向量检索前置 ACL 强过滤** | [中文全文](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.md) | [English](research/offensive-defensive/rag-indirect-injection-and-vector-acl-selection-faq.en.md) |
| **企业知识图谱 (GraphRAG / Neo4j / Fabric Graph)：高水位社区 ACL + 只读 Cypher AST** | [中文全文](research/offensive-defensive/enterprise-graphrag-knowledge-graph-cypher-acl-security-selection-faq.md) | [English](research/offensive-defensive/enterprise-graphrag-knowledge-graph-cypher-acl-security-selection-faq.en.md) |
| **向量数据库安全选型：Azure AI Search vs. pgvector 原生 RLS vs. Cosmos DiskANN vs. Milvus** | [中文全文](research/offensive-defensive/vector-database-security-ai-search-pgvector-cosmos-milvus-selection-faq.md) | [English](research/offensive-defensive/vector-database-security-ai-search-pgvector-cosmos-milvus-selection-faq.en.md) |
| **湖仓数据智能体选型：Microsoft Fabric Data Agent vs. Databricks Genie vs. Snowflake Cortex** | [中文全文](research/offensive-defensive/data-agent-fabric-databricks-unity-catalog-snowflake-cortex-security-faq.md) | [English](research/offensive-defensive/data-agent-fabric-databricks-unity-catalog-snowflake-cortex-security-faq.en.md) |
| **Text-to-SQL / ChatBI 安全架构：数据库原生行级安全 (RLS) + 只读 AST 语法树门禁** | [中文全文](research/offensive-defensive/text-to-sql-bi-agent-rls-and-ast-gate-selection-faq.md) | [English](research/offensive-defensive/text-to-sql-bi-agent-rls-and-ast-gate-selection-faq.en.md) |
| **多模态文档解析选型：Azure Document Intelligence vs. 视觉直读 + 像素级 CDR 重建** | [中文全文](research/offensive-defensive/rag-document-parsing-cdr-document-intelligence-ocr-security-faq.md) | [English](research/offensive-defensive/rag-document-parsing-cdr-document-intelligence-ocr-security-faq.en.md) |
| **PDF / Office 隐写提示词注入防御、CMap 字体剥离与解析器沙盒隔离** | [中文全文](research/offensive-defensive/multimodal-document-ocr-pdf-polyglot-injection-and-parser-isolation-faq.md) | [English](research/offensive-defensive/multimodal-document-ocr-pdf-polyglot-injection-and-parser-isolation-faq.en.md) |
| **智能体长期记忆存储选型：Cosmos DB / Redis Enterprise vs. Mem0 / Zep / LangMem** | [中文全文](research/offensive-defensive/agent-long-term-memory-cosmos-redis-mem0-zep-security-faq.md) | [English](research/offensive-defensive/agent-long-term-memory-cosmos-redis-mem0-zep-security-faq.en.md) |
| **防 MemoryGraft 跨会话记忆投毒、污点标签隔离与写入门禁** | [中文全文](research/offensive-defensive/agent-memory-poisoning-and-isolation-selection-faq.md) | [English](research/offensive-defensive/agent-memory-poisoning-and-isolation-selection-faq.en.md) |
| **GDPR / 个保法“被遗忘权 (DSAR)”选型：墓碑过滤 + 信封加密密码学粉碎 vs. 机器遗忘** | [中文全文](research/offensive-defensive/ai-privacy-gdpr-dsar-crypto-shredding-unlearning-selection-faq.md) | [English](research/offensive-defensive/ai-privacy-gdpr-dsar-crypto-shredding-unlearning-selection-faq.en.md) |
| **防伪造 DSAR 数据导出窃密与按数据主体独立密钥销毁架构** | [中文全文](research/offensive-defensive/agent-privacy-dsar-crypto-shredding-and-unlearning-faq.md) | [English](research/offensive-defensive/agent-privacy-dsar-crypto-shredding-and-unlearning-faq.en.md) |
| **企业合成数据飞轮防投毒坍塌与 C2PA 内容来源密码学验签** | [中文全文](research/offensive-defensive/synthetic-data-poisoning-c2pa-provenance-and-broker-faq.md) | [English](research/offensive-defensive/synthetic-data-poisoning-c2pa-provenance-and-broker-faq.en.md) |

### 5. 执行沙盒、浏览器/语音/端侧 Agent、机密计算 TEE 与云原生 DevSecOps

| 核心架构议题与产品对比焦点 | 中文指南 | English Guide |
|---|---|---|
| **代码执行沙盒选型：普通 Docker 容器 vs. gVisor vs. Firecracker / Kata MicroVM** | [中文全文](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.md) | [English](research/offensive-defensive/agent-sandbox-docker-gvisor-microvm-selection-faq.en.md) |
| **Browser / Computer-Use 沙盒选型：Azure Virtual Desktop vs. 一次性容器浏览器 vs. 本地插件** | [中文全文](research/offensive-defensive/browser-computer-use-agent-avd-playwright-sandbox-selection-faq.md) | [English](research/offensive-defensive/browser-computer-use-agent-avd-playwright-sandbox-selection-faq.en.md) |
| **浏览器智能体防 DOM 隐身指令、视觉伪弹窗欺骗与跨源状态隔离** | [中文全文](research/offensive-defensive/cua-browser-agent-visual-injection-selection-faq.md) | [English](research/offensive-defensive/cua-browser-agent-visual-injection-selection-faq.en.md) |
| **端侧 AI PC 与混合智能体：Windows Copilot+ NPU / Foundry Local + Intune 防截屏 DRM** | [中文全文](research/offensive-defensive/edge-ai-pc-on-device-slm-intune-hybrid-broker-selection-faq.md) | [English](research/offensive-defensive/edge-ai-pc-on-device-slm-intune-hybrid-broker-selection-faq.en.md) |
| **端侧本地小模型防跨窗口剪贴板嗅探与云端确定性能力网关协同** | [中文全文](research/offensive-defensive/edge-local-agent-npu-on-device-slm-security-and-hybrid-cloud-broker-faq.md) | [English](research/offensive-defensive/edge-local-agent-npu-on-device-slm-security-and-hybrid-cloud-broker-faq.en.md) |
| **智能网联汽车 (SDV 座舱大模型) 与智能制造 IoT：QM/ASIL 硬件分域 + 轨迹锁** | [中文全文](research/offensive-defensive/automotive-cockpit-iot-manufacturing-agent-security-selection-faq.md) | [English](research/offensive-defensive/automotive-cockpit-iot-manufacturing-agent-security-selection-faq.en.md) |
| **航空航天与出口管制工业 (CMMC 2.0 / ITAR / EAR / PLM)：CUI 飞地 + 国籍 ABAC 裁剪** | [中文全文](research/offensive-defensive/aerospace-defense-cmmc-itar-ear-export-control-agent-security-faq.md) | [English](research/offensive-defensive/aerospace-defense-cmmc-itar-ear-export-control-agent-security-faq.en.md) |
| **电力电网、虚拟电厂 (VPP) 与电力现货交易：安全 I/II 区单向网闸 + 报价硬熔断** | [中文全文](research/offensive-defensive/smart-grid-virtual-power-plant-energy-trading-agent-security-faq.md) | [English](research/offensive-defensive/smart-grid-virtual-power-plant-energy-trading-agent-security-faq.en.md) |
| **城市公用事业营销 (Oracle CC&B / SAP IS-U) 与智能表计 (AMI)：剥离远程拉闸 + GIS 气隙** | [中文全文](research/offensive-defensive/municipal-utility-cis-ami-smart-meter-billing-agent-security-faq.md) | [English](research/offensive-defensive/municipal-utility-cis-ami-smart-meter-billing-agent-security-faq.en.md) |
| **企业 ESG 披露 (CSRD)、碳排放核算 (Scope 1/2/3) 与碳信用：确定性算碳 + CBAM 气隙** | [中文全文](research/offensive-defensive/enterprise-esg-csrd-carbon-accounting-credit-registry-agent-security-faq.md) | [English](research/offensive-defensive/enterprise-esg-csrd-carbon-accounting-credit-registry-agent-security-faq.en.md) |
| **智慧农业 (John Deere) 与大宗粮油贸易 (CBOT 套保 / 粮仓 ERP)：底仓气隙 + 处方限幅** | [中文全文](research/offensive-defensive/agritech-precision-farming-grain-trading-warehouse-agent-security-faq.md) | [English](research/offensive-defensive/agritech-precision-farming-grain-trading-warehouse-agent-security-faq.en.md) |
| **智慧园区 (BMS)、数据中心 (DCIM) 与商业地产：物理门禁 PACS 断联 + 热包络锁** | [中文全文](research/offensive-defensive/smart-building-bms-datacenter-dcim-access-control-agent-security-faq.md) | [English](research/offensive-defensive/smart-building-bms-datacenter-dcim-access-control-agent-security-faq.en.md) |
| **流媒体广电播控 (OTT)、程序化广告 (AdTech) 与版权 DRM：母片气隙 + 净室隔离** | [中文全文](research/offensive-defensive/media-ott-streaming-programmatic-adtech-drm-agent-security-faq.md) | [English](research/offensive-defensive/media-ott-streaming-programmatic-adtech-drm-agent-security-faq.en.md) |
| **体育赛事联盟、大型演出票务 (Ticketmaster) 与场馆运营：伤病气隙 + 锁座硬锁** | [中文全文](research/offensive-defensive/sports-league-live-ticketing-venue-integrity-agent-security-faq.md) | [English](research/offensive-defensive/sports-league-live-ticketing-venue-integrity-agent-security-faq.en.md) |
| **豪华邮轮 (Fidelio SPMS)、主题乐园游乐安全与穿戴支付：单向光闸 + 预授权硬互锁** | [中文全文](research/offensive-defensive/cruise-line-theme-park-resort-wearable-solas-agent-security-faq.md) | [English](research/offensive-defensive/cruise-line-theme-park-resort-wearable-solas-agent-security-faq.en.md) |
| **跨国运营商网间互联 (BGP RPKI / SIP 中继) 与漫游清算 (BCE)：CALEA 气隙 + IRSF 硬锁** | [中文全文](research/offensive-defensive/wholesale-telecom-interconnect-bgp-sip-roaming-bce-agent-security-faq.md) | [English](research/offensive-defensive/wholesale-telecom-interconnect-bgp-sip-roaming-bce-agent-security-faq.en.md) |
| **音乐唱片与词曲版权 (DDEX/音著协)、未发干声母带与版税：干声气隙 + 分成硬锁 [660 场景]** | [中文全文](research/offensive-defensive/music-publishing-record-label-ddex-stem-royalty-agent-security-faq.md) | [English](research/offensive-defensive/music-publishing-record-label-ddex-stem-royalty-agent-security-faq.en.md) |
| **跨国企业税务 (ONESOURCE/支柱二)、转让定价与研发退税：FIN 48 气隙 + 报税锁 [1390 断言]** | [中文全文](research/offensive-defensive/corporate-tax-transfer-pricing-beps-pillar-two-rd-credit-agent-security-faq.md) | [English](research/offensive-defensive/corporate-tax-transfer-pricing-beps-pillar-two-rd-credit-agent-security-faq.en.md) |
| **商业地产资管 (REITs/Yardi)、长租约解析与装修补贴 (TIA)：主力店底表气隙 [650 向量]** | [中文全文](research/offensive-defensive/commercial-real-estate-reit-yardi-lease-abstraction-tia-agent-security-faq.md) | [English](research/offensive-defensive/commercial-real-estate-reit-yardi-lease-abstraction-tia-agent-security-faq.en.md) |
| **管理咨询与战略顾问所、客户隔离墙 (Chinese Wall) 与专家网 (GLG)：项目气隙 + MNPI 硬锁** | [中文全文](research/offensive-defensive/management-consulting-client-chinese-wall-expert-network-agent-security-faq.md) | [English](research/offensive-defensive/management-consulting-client-chinese-wall-expert-network-agent-security-faq.en.md) |
| **跨国并购虚拟数据室 (VDR)、反垄断清洁室与交割托管：竞标底价气隙 [320 篇 FAQ & 1402 断言]** | [中文全文](research/offensive-defensive/ma-virtual-data-room-vdr-clean-team-closing-escrow-agent-security-faq.md) | [English](research/offensive-defensive/ma-virtual-data-room-vdr-clean-team-closing-escrow-agent-security-faq.en.md) |
| **呼叫中心实时语音选型：Realtime API vs. 级联管道防 Deepfake 声纹伪造与 PCI-DSS 合规** | [中文全文](research/offensive-defensive/call-center-voice-agent-realtime-api-deepfake-pci-dss-selection-faq.md) | [English](research/offensive-defensive/call-center-voice-agent-realtime-api-deepfake-pci-dss-selection-faq.en.md) |
| **多模态语音智能体防声学超声波注入与高危交易带外 FIDO2 强认证** | [中文全文](research/offensive-defensive/voice-realtime-agent-acoustic-injection-selection-faq.md) | [English](research/offensive-defensive/voice-realtime-agent-acoustic-injection-selection-faq.en.md) |
| **主权密钥与机密计算选型：Managed HSM (BYOK/HYOK) + Purview DKE + H100 GPU TEE** | [中文全文](research/offensive-defensive/sovereign-ai-byok-hsm-confidential-gpu-tee-selection-faq.md) | [English](research/offensive-defensive/sovereign-ai-byok-hsm-confidential-gpu-tee-selection-faq.en.md) |
| **CPU+GPU 双重硬件远程证明 (Remote Attestation) 与飞地内能力网关** | [中文全文](research/offensive-defensive/confidential-computing-tee-gpu-attestation-vs-standard-cloud-inference-faq.md) | [English](research/offensive-defensive/confidential-computing-tee-gpu-attestation-vs-standard-cloud-inference-faq.en.md) |
| **企业 AI 密钥主权分级 (PMK / BYOK / HYOK) 与防智能体充当解密预言机** | [中文全文](research/offensive-defensive/enterprise-ai-byok-hyok-hsm-key-custody-and-broker-faq.md) | [English](research/offensive-defensive/enterprise-ai-byok-hyok-hsm-key-custody-and-broker-faq.en.md) |
| **企业跨国出海与数据驻留合规：Regional / Data Zone PTU 锁定 + APIM 同法域围栏** | [中文全文](research/offensive-defensive/cross-border-ai-data-residency-ptus-regional-routing-selection-faq.md) | [English](research/offensive-defensive/cross-border-ai-data-residency-ptus-regional-routing-selection-faq.en.md) |
| **政务与公共事业 AI (12345 热线 / 社保审批 / 政务云)：内外网分域 + 预审草稿锁** | [中文全文](research/offensive-defensive/public-sector-gov-cloud-citizen-service-agent-security-selection-faq.md) | [English](research/offensive-defensive/public-sector-gov-cloud-citizen-service-agent-security-selection-faq.en.md) |
| **零信任 AI Landing Zone：Hub-Spoke VNet + Private Endpoint + Azure Firewall 出站白名单** | [中文全文](research/offensive-defensive/azure-ai-landing-zone-hub-spoke-private-endpoint-firewall-egress-faq.md) | [English](research/offensive-defensive/azure-ai-landing-zone-hub-spoke-private-endpoint-firewall-egress-faq.en.md) |
| **AI 态势管理与审计溯源：Defender for Cloud (AI-SPM) + Sentinel + Purview Audit** | [中文全文](research/offensive-defensive/defender-ai-spm-sentinel-purview-compliance-audit-architecture-faq.md) | [English](research/offensive-defensive/defender-ai-spm-sentinel-purview-compliance-audit-architecture-faq.en.md) |
| **研发 Coding Agent 治理：GitHub Copilot Enterprise + GHAS vs. Cursor / Continue 防规则后门** | [中文全文](research/offensive-defensive/enterprise-coding-agent-copilot-cursor-security-governance-faq.md) | [English](research/offensive-defensive/enterprise-coding-agent-copilot-cursor-security-governance-faq.en.md) |
| **老旧核心系统现代化 (COBOL / PL-SQL / Java 8)：OpenRewrite + 黄金主数据差分对账** | [中文全文](research/offensive-defensive/legacy-code-migration-modernization-agent-security-selection-faq.md) | [English](research/offensive-defensive/legacy-code-migration-modernization-agent-security-selection-faq.en.md) |
| **CI/CD 研发流水线 Agent：双阶段只读隔离 + OIDC Subject 钉扎防 `pull_request_target` 注入** | [中文全文](research/offensive-defensive/cicd-devsecops-github-actions-agent-oidc-security-selection-faq.md) | [English](research/offensive-defensive/cicd-devsecops-github-actions-agent-oidc-security-selection-faq.en.md) |
| **自主代码评审与自动修复智能体构建环境隔离与最小令牌权限** | [中文全文](research/offensive-defensive/cicd-devsecops-agent-pr-injection-and-oidc-isolation-faq.md) | [English](research/offensive-defensive/cicd-devsecops-agent-pr-injection-and-oidc-isolation-faq.en.md) |
| **云 IaC (Terraform / Bicep) 与自主 SRE：State 密钥隔离 + Policy 门禁 + Plan-Hash 签名** | [中文全文](research/offensive-defensive/cloud-iac-terraform-bicep-sre-agent-plan-hash-selection-faq.md) | [English](research/offensive-defensive/cloud-iac-terraform-bicep-sre-agent-plan-hash-selection-faq.en.md) |
| **防崩溃日志注入窃取 Terraform State 与二进制变更计划哈希锁** | [中文全文](research/offensive-defensive/autonomous-iac-terraform-state-leak-and-plan-hash-broker-faq.md) | [English](research/offensive-defensive/autonomous-iac-terraform-state-leak-and-plan-hash-broker-faq.en.md) |
| **Kubernetes AIOps 运维智能体：只读诊断与 GitOps 变更双平面隔离 + Admission 准入控制** | [中文全文](research/offensive-defensive/k8s-aiops-agent-operator-rbac-and-admission-gate-faq.md) | [English](research/offensive-defensive/k8s-aiops-agent-operator-rbac-and-admission-gate-faq.en.md) |
| **多云多活智能体容灾切换防脑裂双花与全局世代号围栏 (Epoch Fencing)** | [中文全文](research/offensive-defensive/multi-cloud-agent-dr-split-brain-and-epoch-fencing-faq.md) | [English](research/offensive-defensive/multi-cloud-agent-dr-split-brain-and-epoch-fencing-faq.en.md) |
| **异步任务 Webhook 验签防重放与出站连接 Socket IP 钉扎防 DNS 重绑定 SSRF** | [中文全文](research/offensive-defensive/agent-webhook-callback-forgery-and-egress-ssrf-faq.md) | [English](research/offensive-defensive/agent-webhook-callback-forgery-and-egress-ssrf-faq.en.md) |
| **企业微调与模型供应链选型：Foundry vs. Bedrock vs. Mosaic AI + Safetensors 签名校验** | [中文全文](research/offensive-defensive/model-supply-chain-finetuning-foundry-bedrock-safetensors-faq.md) | [English](research/offensive-defensive/model-supply-chain-finetuning-foundry-bedrock-safetensors-faq.en.md) |
| **LoRA / DPO 微调数据投毒、潜伏后门扫描与模型血统清单锁定** | [中文全文](research/offensive-defensive/lora-dpo-finetuning-backdoor-and-model-provenance-faq.md) | [English](research/offensive-defensive/lora-dpo-finetuning-backdoor-and-model-provenance-faq.en.md) |
| **后量子密码迁移 (PQC Hybrid KEM) 与企业 PKI 证书自动化防降级攻击** | [中文全文](research/offensive-defensive/pqc-post-quantum-crypto-agility-and-hybrid-kem-broker-faq.md) | [English](research/offensive-defensive/pqc-post-quantum-crypto-agility-and-hybrid-kem-broker-faq.en.md) |

### 6. 重点受监管行业落地架构：金融、医疗、零售电商、智能办公与 ERP/法务/人事

| 核心架构议题与产品对比焦点 | 中文指南 | English Guide |
|---|---|---|
| **商业银行信贷审批与财富投顾：神经符号混合架构 + 美联储 SR 11-7 模型风险合规** | [中文全文](research/offensive-defensive/financial-credit-underwriting-wealth-agent-sr11-7-broker-faq.md) | [English](research/offensive-defensive/financial-credit-underwriting-wealth-agent-sr11-7-broker-faq.en.md) |
| **房地产产权交割 (Title & Escrow: Qualia/SoftPro) 与按揭解押：MERS 直连 + 电汇核身锁** | [中文全文](research/offensive-defensive/real-estate-title-escrow-mortgage-closing-wire-agent-security-faq.md) | [English](research/offensive-defensive/real-estate-title-escrow-mortgage-closing-wire-agent-security-faq.en.md) |
| **私人银行、家族办公室 (Addepar/Avaloq) 与家族信托：单家族 Silo + 意愿书气隙** | [中文全文](research/offensive-defensive/private-banking-family-office-trust-wealth-agent-security-faq.md) | [English](research/offensive-defensive/private-banking-family-office-trust-wealth-agent-security-faq.en.md) |
| **顶级艺术品拍卖行 (苏富比/佳士得架构) 与奢侈品溯源：拍品保密保留价气隙 + 5AMLD 锁** | [中文全文](research/offensive-defensive/fine-art-luxury-auction-reserve-price-provenance-agent-security-faq.md) | [English](research/offensive-defensive/fine-art-luxury-auction-reserve-price-provenance-agent-security-faq.en.md) |
| **连锁专科医疗 (齿科 DSO / 肿瘤特药)、精麻处方 (EPCS) 与医保结算：医师令牌硬锁** | [中文全文](research/offensive-defensive/specialty-healthcare-dso-pharmacy-epcs-prior-auth-agent-security-faq.md) | [English](research/offensive-defensive/specialty-healthcare-dso-pharmacy-epcs-prior-auth-agent-security-faq.en.md) |
| **投行并购尽调 (M&A VDR) 与私募投研：Chinese Wall 信息屏障 + 单 Deal 独立沙盒** | [中文全文](research/offensive-defensive/ma-virtual-data-room-investment-research-agent-security-selection-faq.md) | [English](research/offensive-defensive/ma-virtual-data-room-investment-research-agent-security-selection-faq.en.md) |
| **上市公司投资者关系 (IR: Workiva/Diligent) 与财报披露：MNPI 气隙 + XBRL 锚定** | [中文全文](research/offensive-defensive/public-company-investor-relations-sec-reg-fd-agent-security-faq.md) | [English](research/offensive-defensive/public-company-investor-relations-sec-reg-fd-agent-security-faq.en.md) |
| **主权财富基金与公共养老金、股东代理投票 (ISS) 与融券：调仓篮子气隙 + 选票受托锁** | [中文全文](research/offensive-defensive/sovereign-wealth-pension-fund-proxy-voting-sec-lending-agent-security-faq.md) | [English](research/offensive-defensive/sovereign-wealth-pension-fund-proxy-voting-sec-lending-agent-security-faq.en.md) |
| **量化交易与机构风控智能体：确定性盘前风控硬熔断与敞口限额网关** | [中文全文](research/offensive-defensive/financial-trading-underwriting-agent-killswitch-and-broker-faq.md) | [English](research/offensive-defensive/financial-trading-underwriting-agent-killswitch-and-broker-faq.en.md) |
| **支付机构商户收单 (PayFac KYB)、先买后付 (BNPL) 与拒付争议：准备金硬锁 + 规则气隙** | [中文全文](research/offensive-defensive/fintech-payfac-merchant-underwriting-bnpl-chargeback-agent-security-faq.md) | [English](research/offensive-defensive/fintech-payfac-merchant-underwriting-bnpl-chargeback-agent-security-faq.en.md) |
| **民航飞机维修工程 (MRO: AMOS)、适航挂签 (8130-3) 与飞机租赁：原厂溯源 + 持照签名锁** | [中文全文](research/offensive-defensive/commercial-aviation-mro-airworthiness-aircraft-leasing-agent-security-faq.md) | [English](research/offensive-defensive/commercial-aviation-mro-airworthiness-aircraft-leasing-agent-security-faq.en.md) |
| **跨境支付清结算 (SWIFT ISO 20022 `pacs.008`) 防报文注入与制裁名单确定性筛查** | [中文全文](research/offensive-defensive/cbdc-cross-border-iso20022-pacs008-and-liquidity-broker-faq.md) | [English](research/offensive-defensive/cbdc-cross-border-iso20022-pacs008-and-liquidity-broker-faq.en.md) |
| **资本市场证券中央对手方清算：T+1 原子券款对付 (DvP) 与保证金防挤兑网关** | [中文全文](research/offensive-defensive/securities-clearing-ccp-csd-dvp-settlement-and-margin-broker-faq.md) | [English](research/offensive-defensive/securities-clearing-ccp-csd-dvp-settlement-and-margin-broker-faq.en.md) |
| **机构数字资产 MPC 托管与金库多签：EIP-712 透明解码验签防 UI 盲签劫持** | [中文全文](research/offensive-defensive/mpc-institutional-custody-eip712-clear-signing-and-broker-faq.md) | [English](research/offensive-defensive/mpc-institutional-custody-eip712-clear-signing-and-broker-faq.en.md) |
| **保险智能核保与理赔定损：防理赔单据提示词注入骗保与收款主数据锁定** | [中文全文](research/offensive-defensive/insurance-underwriting-claims-adjuster-and-subrogation-broker-faq.md) | [English](research/offensive-defensive/insurance-underwriting-claims-adjuster-and-subrogation-broker-faq.en.md) |
| **医疗临床病历智能体：SMART on FHIR 细粒度授权 + HIPAA 18 项脱敏 + 医嘱草稿隔离** | [中文全文](research/offensive-defensive/healthcare-clinical-fhir-hipaa-deid-agent-security-selection-faq.md) | [English](research/offensive-defensive/healthcare-clinical-fhir-hipaa-deid-agent-security-selection-faq.en.md) |
| **医院辅助诊疗与商保核赔防外部转诊单注入与最小必要原则能力网关** | [中文全文](research/offensive-defensive/healthcare-clinical-ai-hipaa-fhir-deid-and-broker-faq.md) | [English](research/offensive-defensive/healthcare-clinical-ai-hipaa-fhir-deid-and-broker-faq.en.md) |
| **生物医药新药临床试验 (Veeva eTMF / EDC) 与药物警戒：双盲随机表气隙 + Part 11** | [中文全文](research/offensive-defensive/biopharma-clinical-trial-etmf-pharmacovigilance-agent-security-faq.md) | [English](research/offensive-defensive/biopharma-clinical-trial-etmf-pharmacovigilance-agent-security-faq.en.md) |
| **对外电商与客服防越狱薅羊毛：JWT 会话身份强绑定 + 事实核查护栏 + 退费状态机** | [中文全文](research/offensive-defensive/ecommerce-support-agent-anti-jailbreak-refund-abuse-architecture-faq.md) | [English](research/offensive-defensive/ecommerce-support-agent-anti-jailbreak-refund-abuse-architecture-faq.en.md) |
| **智能客服“工单自学习飞轮 (Ticket-to-KB)”防二阶投毒：Draft 暂存隔离 + 污点禁写** | [中文全文](research/offensive-defensive/customer-support-self-learning-kb-flywheel-poisoning-defense-faq.md) | [English](research/offensive-defensive/customer-support-self-learning-kb-flywheel-poisoning-defense-faq.en.md) |
| **银行与电信客服防社会工程学账户接管 (Anti-ATO / SIM Swap) 与分级审批网关** | [中文全文](research/offensive-defensive/customer-service-agent-ato-simswap-and-refund-broker-faq.md) | [English](research/offensive-defensive/customer-service-agent-ato-simswap-and-refund-broker-faq.en.md) |
| **电信运营商 (Telco OSS/BSS)：通话详单 CDR/CPNI 物理隔离 + eSIM 换卡活体门禁** | [中文全文](research/offensive-defensive/telecom-oss-bss-simswap-cdr-privacy-agent-security-selection-faq.md) | [English](research/offensive-defensive/telecom-oss-bss-simswap-cdr-privacy-agent-security-selection-faq.en.md) |
| **零售全渠道动态定价与促销返佣：毛利红线硬熔断防“一分钱破价资损”** | [中文全文](research/offensive-defensive/retail-ecommerce-dynamic-pricing-penny-drop-and-rebate-broker-faq.md) | [English](research/offensive-defensive/retail-ecommerce-dynamic-pricing-penny-drop-and-rebate-broker-faq.en.md) |
| **民航客运、酒店与 OTA 旅游 (GDS / PNR / 常旅客里程)：实名 PNR 绑定 + ATPCO 锁** | [中文全文](research/offensive-defensive/airline-hospitality-gds-pnr-loyalty-miles-agent-security-faq.md) | [English](research/offensive-defensive/airline-hospitality-gds-pnr-loyalty-miles-agent-security-faq.en.md) |
| **智能写标书 (RFP 售前投标) 与对外营销 GenAI：脱敏金牌库 + 出站 DLP + C2PA** | [中文全文](research/offensive-defensive/outbound-marketing-rfp-proposal-agent-dlp-c2pa-selection-faq.md) | [English](research/offensive-defensive/outbound-marketing-rfp-proposal-agent-dlp-c2pa-selection-faq.en.md) |
| **游戏智能 NPC、直播 UGC 审核与反外挂客服：叙事/经济断联 + 反外挂特征隔离** | [中文全文](research/offensive-defensive/gaming-npc-livestream-ugc-moderation-agent-security-selection-faq.md) | [English](research/offensive-defensive/gaming-npc-livestream-ugc-moderation-agent-security-selection-faq.en.md) |
| **智能体自动支付协议选型：Google AP2 / Stripe SPT / Visa & Mastercard Agent Pay** | [中文全文](research/offensive-defensive/agentic-commerce-ap2-stripe-visa-payment-security-selection-faq.md) | [English](research/offensive-defensive/agentic-commerce-ap2-stripe-visa-payment-security-selection-faq.en.md) |
| **防智能体购物车授权篡改与高频小额切片盗刷 (Salami-Slicing) 五元组门禁** | [中文全文](research/offensive-defensive/agentic-commerce-ap2-tap-payment-mandate-forgery-and-stepup-quorum-faq.md) | [English](research/offensive-defensive/agentic-commerce-ap2-tap-payment-mandate-forgery-and-stepup-quorum-faq.en.md) |
| **智能办公连接邮件/日历/CRM：Copilot Studio 连接器 DLP + 草稿隔离模式 (Draft-Only)** | [中文全文](research/offensive-defensive/workplace-agent-email-crm-indirect-injection-dlp-broker-faq.md) | [English](research/offensive-defensive/workplace-agent-email-crm-indirect-injection-dlp-broker-faq.en.md) |
| **企业会议纪要与智能协作 (Teams / Zoom vs. 影子录音 Bot)：大厅拦截 + 单场隔离** | [中文全文](research/offensive-defensive/enterprise-meeting-notetaker-teams-zoom-shadow-bot-security-faq.md) | [English](research/offensive-defensive/enterprise-meeting-notetaker-teams-zoom-shadow-bot-security-faq.en.md) |
| **防零点击邮件与日历提示词蠕虫 (Zero-Click AI Worm) 跨部门自动横向传播** | [中文全文](research/offensive-defensive/email-calendar-zero-click-agent-worm-and-taint-broker-faq.md) | [English](research/offensive-defensive/email-calendar-zero-click-agent-worm-and-taint-broker-faq.en.md) |
| **高管猎头 (CEO 继任)、雇前背景调查 (FCRA) 与跨国派遣：董事会气隙 + 背调只读锁** | [中文全文](research/offensive-defensive/executive-search-fcra-background-check-global-mobility-agent-security-faq.md) | [English](research/offensive-defensive/executive-search-fcra-background-check-global-mobility-agent-security-faq.en.md) |
| **全球再保险核保 (Lloyd's)、巨灾建模 (RMS) 与巨灾债券：转分保 PML 气隙 + SWIFT 验真** | [中文全文](research/offensive-defensive/reinsurance-treaty-catastrophe-modeling-cat-bond-agent-security-faq.md) | [English](research/offensive-defensive/reinsurance-treaty-catastrophe-modeling-cat-bond-agent-security-faq.en.md) |
| **企业 ITSM (ServiceNow / Jira) 与 IT Helpdesk：Verified ID 活体核身 + PIM 审批** | [中文全文](research/offensive-defensive/itsm-servicenow-jira-helpdesk-agent-zero-trust-selection-faq.md) | [English](research/offensive-defensive/itsm-servicenow-jira-helpdesk-agent-zero-trust-selection-faq.en.md) |
| **企业 ERP (SAP S/4HANA / Dynamics 365) 采购付款：确定性三单匹配 + 供应商 IBAN 硬锁** | [中文全文](research/offensive-defensive/erp-sap-dynamics-procure-to-pay-three-way-match-selection-faq.md) | [English](research/offensive-defensive/erp-sap-dynamics-procure-to-pay-three-way-match-selection-faq.en.md) |
| **企业研发专利撰写 (Patent AI)、现有技术查新与商业秘密：本地镜像库 + FTO 气隙** | [中文全文](research/offensive-defensive/enterprise-patent-drafting-prior-art-trade-secret-agent-security-faq.md) | [English](research/offensive-defensive/enterprise-patent-drafting-prior-art-trade-secret-agent-security-faq.en.md) |
| **汽车经销商管理 (DMS: CDK/Tekion)、汽车金融与原厂延保理赔：底价气隙 + 售价底线锁** | [中文全文](research/offensive-defensive/automotive-dealership-dms-auto-finance-warranty-agent-security-faq.md) | [English](research/offensive-defensive/automotive-dealership-dms-auto-finance-warranty-agent-security-faq.en.md) |
| **连锁餐饮快餐 (QSR Drive-Thru POS)、冷链食安与加盟运营：菜单语法锁 + 食安硬熔断** | [中文全文](research/offensive-defensive/qsr-drive-thru-pos-cold-chain-food-safety-agent-security-faq.md) | [English](research/offensive-defensive/qsr-drive-thru-pos-cold-chain-food-safety-agent-security-faq.en.md) |
| **大型工程总承包 (EPC: Procore / Autodesk BIM) 与进度款：业主标底气隙 + G702 核验** | [中文全文](research/offensive-defensive/construction-epc-procore-bim-subcontractor-payapp-agent-security-faq.md) | [English](research/offensive-defensive/construction-epc-procore-bim-subcontractor-payapp-agent-security-faq.en.md) |
| **全渠道商超零售、预付礼品卡与快消渠道核销 (TPM)：禁发礼品卡 + EDI 852 实销核验** | [中文全文](research/offensive-defensive/omnichannel-retail-giftcard-cpg-trade-promotion-agent-security-faq.md) | [English](research/offensive-defensive/omnichannel-retail-giftcard-cpg-trade-promotion-agent-security-faq.en.md) |
| **会计师事务所与外部独立审计 (PCAOB 工作底稿 / 询证函)：项目飞地 + 重要性气隙 [300 篇里程碑]** | [中文全文](research/offensive-defensive/external-audit-firm-pcaob-workpaper-independence-agent-security-faq.md) | [English](research/offensive-defensive/external-audit-firm-pcaob-workpaper-independence-agent-security-faq.en.md) |
| **企业税务合规、转让定价 (BEPS 2.0) 与 SOX 404 审计：ASC 740 气隙 + 确定性算税** | [中文全文](research/offensive-defensive/corporate-tax-transfer-pricing-sox-audit-agent-security-selection-faq.md) | [English](research/offensive-defensive/corporate-tax-transfer-pricing-sox-audit-agent-security-selection-faq.en.md) |
| **跨国供应链 EDI 报文防提单隐写注入、招标底价防窃密与收货对账门禁** | [中文全文](research/offensive-defensive/erp-supply-chain-edi-customs-and-three-way-match-broker-faq.md) | [English](research/offensive-defensive/erp-supply-chain-edi-customs-and-three-way-match-broker-faq.en.md) |
| **第三方合同物流 (3PL: Blue Yonder)、海关保税仓与运费审计：多货主气隙 + CBP 7501 锁** | [中文全文](research/offensive-defensive/third-party-logistics-3pl-bonded-warehouse-freight-audit-agent-security-faq.md) | [English](research/offensive-defensive/third-party-logistics-3pl-bonded-warehouse-freight-audit-agent-security-faq.en.md) |
| **干线铁路货运与多式联运 (EDI 404)、列控安全 (PTC) 与场站调度：单向网闸 + 编组气隙** | [中文全文](research/offensive-defensive/freight-rail-intermodal-ptc-waybill-yard-dispatch-agent-security-faq.md) | [English](research/offensive-defensive/freight-rail-intermodal-ptc-waybill-yard-dispatch-agent-security-faq.en.md) |
| **全球海运港口 (TOS: Navis N4 / CargoWise) 与电子提单 (eBL)：密码学验签防无单放货** | [中文全文](research/offensive-defensive/maritime-port-tos-cargo-customs-ebl-agent-security-selection-faq.md) | [English](research/offensive-defensive/maritime-port-tos-cargo-customs-ebl-agent-security-selection-faq.en.md) |
| **法务科技 (CLM 合同审阅 / eDiscovery)：案件级伦理墙 (Ethical Wall) + 律师特权保护** | [中文全文](research/offensive-defensive/legaltech-clm-ediscovery-privilege-ethical-wall-selection-faq.md) | [English](research/offensive-defensive/legaltech-clm-ediscovery-privilege-ethical-wall-selection-faq.en.md) |
| **对手方合同修订红线隐写注入防御与 OpenXML 结构清洗网关** | [中文全文](research/offensive-defensive/legal-ediscovery-privilege-waiver-and-redline-broker-faq.md) | [English](research/offensive-defensive/legal-ediscovery-privilege-waiver-and-redline-broker-faq.en.md) |
| **HRTech 智能招聘与薪酬 (Workday / SuccessFactors)：防白字简历注入 + k-匿名行级隔离** | [中文全文](research/offensive-defensive/hrtech-ats-recruiting-payroll-agent-security-selection-faq.md) | [English](research/offensive-defensive/hrtech-ats-recruiting-payroll-agent-security-selection-faq.en.md) |
| **招聘筛选与猎头返佣防越权调薪、高管薪资防刺探与 OBO 委托网关** | [中文全文](research/offensive-defensive/hr-recruiting-payroll-agent-resume-injection-and-broker-faq.md) | [English](research/offensive-defensive/hr-recruiting-payroll-agent-resume-injection-and-broker-faq.en.md) |
| **高等教育、智慧校园 (LMS 阅卷) 与科研经费：像素 OCR 反白字 + FERPA 行级隔离** | [中文全文](research/offensive-defensive/higher-ed-edtech-lms-ferpa-grading-agent-security-selection-faq.md) | [English](research/offensive-defensive/higher-ed-edtech-lms-ferpa-grading-agent-security-selection-faq.en.md) |
| **自主安全运营中心 (Autonomous SOC / SOAR)：防恶意日志注入诱导误封核心网 (Self-DoS)** | [中文全文](research/offensive-defensive/autonomous-soc-siem-soar-log-injection-and-broker-faq.md) | [English](research/offensive-defensive/autonomous-soc-siem-soar-log-injection-and-broker-faq.en.md) |
---

## 多 Agent 红队安全演练工作台 (Multi-Agent Red Team Workbench)

研究重点不仅在于“单个模型能否拒绝恶意提问”，更在于**多个代表不同业务主体的智能体在协同工作时，能否在提示词注入、MCP 工具投毒与混淆代理人诱导下守住身份边界、数据边界与资金审批边界**。

| 场景包 | 业务角色与受保护边界 |
|---|---|
| **A. 企业跨部门协同 (`enterprise-*`)** | 日程、行政、采购、财务、知识库与外部供应商助手协同，验证跨主体间接注入下的 `restricted-budget` 隔离、Canary 防外泄与 `update_trust` 强审批。 |
| **B. 多主体研究与交易网络 (`network-*`)** | 多 Principal 智能体使用目录、私信、论坛、模拟钱包与市场工具，验证伪共识信任劫持与多跳代理链（Forum $\rightarrow$ Coordinator $\rightarrow$ Wallet）支付拦截。 |
| **C. 金库多签与 654 向量演练台 (`playground/`)** | `$6B` 级多签盲签与跨链桥攻击链 6 阶段回放，以及覆盖 MCP、OBO、RAG ACL、Text-to-SQL、CUA、TEE、金融/医疗/电商/ERP/并购的 `654` 个红蓝对抗开关。 |

### 快速开始（Windows 本地运行）

环境要求：**Node.js 22+、Python 3.12、uv**（无需 Docker 或云端密钥即可运行完整 Fixture 模式与 `playground/`）。

```powershell
git clone https://github.com/turbo998/ai-security-lab.git
Set-Location ai-security-lab
.\scripts\bootstrap.ps1
.\scripts\start-demo.ps1
```

浏览器打开 **http://127.0.0.1:8000**（或直接双击打开 `playground/index.html` 体验零依赖交互演练台）。端口占用时可使用 `.\scripts\start-demo.ps1 -Port 8001`。

### 三种运行模式与证据边界声明

| 模式 | 执行机制 | 成本与证据边界说明 |
|---|---|---|
| **Fixture（默认）** | 确定性合成决策驱动真实后端状态机、策略引擎与模拟工具 | 零云端调用成本；用于验证服务端授权与数据流不变量，不代表商用大模型原生拒答率（`live_llm_refusal_rate: not_measured`） |
| **Live** | 连接已授权配置的 Azure OpenAI 部署产生实时模型决策 | 需单独配置 `.env` 并显式执行 `.\scripts\start-demo.ps1 -LoadEnv`；缺失配置时明确禁用，绝不暗中降级为 Fixture |
| **Replay** | 按原始时间戳与来源标签回放已落盘审计事件流 | 不重新执行工具副作用，完整保留原始 Fixture / Live 证据血统 |

### 工作台实机截图与三分钟实操录像

![企业协作：沙箱执行、Agent 拓扑与工具审计事件](docs/screenshots/03-enterprise-lab.png)

![相同快照下的 Baseline vs. Hardened 确定性防护对比](docs/screenshots/07-comparison.png)

- 🎬 **实操演示录像（3 分 03 秒）**：[观看或下载本地 Fixture 实操录像 (`local-fixture-walkthrough.webm`)](docs/videos/local-fixture-walkthrough.webm) · [章节与复录说明](docs/videos/README.md)
- 📚 **工程与架构文档**：[客户演示指南](docs/demo-guide.zh-CN.md) · [代码级讲解路线](docs/code-walkthrough.md) · [架构与可信边界](docs/architecture.md) · [Azure 部署准备与边界](docs/azure-deployment.md) · [本地与云端能力对照](docs/azure-capabilities.md) · [API 与事件契约](docs/implementation-contract.md)

---

## 开发测试与发布合规核验

```powershell
# 运行全量后端与确定性策略回归测试 (666 passed / 1,402 assertions)
.\.venv\Scripts\pytest.exe -q

# 复现纯内存与 SQLite WAL 审计门控微基准延迟测量
.\.venv\Scripts\python.exe scripts/measure_broker_latencies.py

# 执行发布前敏感信息、外部依赖与双语完整性核验
.\.venv\Scripts\python.exe scripts/audit-publication.py
```

> **安全与合规边界声明**：本仓库所有攻防演练均在本地闭合合成数据与模拟工具上执行，不包含任何未授权外部扫描器、真实支付连接器、客户生产数据或云端凭据。研究背景参考 [Microsoft Research: Red-Teaming a Network of Agents](https://www.microsoft.com/en-us/research/blog/red-teaming-a-network-of-agents-understanding-what-breaks-when-ai-agents-interact-at-scale/) 及 OWASP Top 10 for Agentic Applications。
