# Enterprise Agentic Commerce Lab — 企业智能体商业参考架构与 AI 解决方案架构师决策库

🌐 **语言切换 / Language**: **中文主页 (当前)** | **[English (`README.en.md`)](README.en.md)** | **[📚 SA 决策指南总目录（178 篇双语 FAQ）](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/index.md)** | **[🚀 交互式架构工作台 (`live-demo.html`)](live-demo.html)** | **[📊 7-Card 基准测试报告 (`benchmark-cards.html`)](benchmark-cards.html)**

> **面向 AI Solution Architect（AI 解决方案架构师）的企业级智能体商业工程参考库**
> 聚焦**零售电商与多商户编排、智能体支付与加密授权协议（AP2 / Stripe SPT / Visa VIC & TAP / Mastercard / x402）、B2B 采购与 ERP 三单匹配、酒旅航司（OTA / IATA NDC）动态预订、SaaS 用量计费与 FinOps、跨境税务（MoR）/ 外汇清结算与 Visa CE 3.0 拒付抗辩**六大核心领域，提供**可复用的六平面参考架构、平台与协议选型对比矩阵、确定性受托控制面（Fiduciary Control Plane）Python 护栏模块及自包含交互式演示台**。

---

## 1. 核心价值与架构师视角（Executive Overview）

当企业从“对话式导购助手（Copilot）”迈向“可代客寻源、锁价、审批与结算的自主商业智能体（Transactional Agent）”时，传统三层 Web 架构（前端表单 + 无状态服务 + 数据库）面临三大根本挑战：

1. **非确定性推理与资金授权边界冲突**：大语言模型（LLM）易受网页隐藏提示词注入（DOM Poisoning）、陈旧目录缓存或长上下文幻觉影响。生产级架构必须将**资金批准、价格上限校验与令牌签发**移出模型提示词循环，沉降到**确定性受托控制面（Deterministic Fiduciary Control Plane）**。
2. **多方商业协议碎片化**：企业需同时评估并桥接工具层（`MCP`）、智能体协作层（`A2A`）、商业会话与目录层（`ACP`、`UCP`）、加密意图授权层（`Google AP2`、`Poppy`）、可信代理请求签名（`Visa TAP` / `RFC 9421`）以及受限支付凭证与微支付轨（`Stripe SPT`、`Visa VIC`、`Mastercard Agent Pay`、`x402`、`MPP Tempo`）。
3. **跨组织财务守恒与司法级不可抵赖证据**：跨商户拆单分账、B2B 采购三单匹配（`PO == GRN == Invoice`）、跨境完税价（`DDP`）锁汇以及友好欺诈拒付抗辩（`Visa CE 3.0`）无法依赖内部应用日志，必须具备美分守恒状态机与可独立验签的四柱加密证据包。

---

## 2. 交互式架构工作台与 7-Card 基准测试集（Live Workbenches & Benchmarks）

本仓库所有 HTML 演示台与 7-Card（`4:5` 竖版卡片流）评测报告均为零外部依赖的自包含产物（严格遵循 `Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'`）：

| 资产类型 | 中文版入口 | English Entry | 面向架构师的核心演示与评测内容 |
|---|---|---|---|
| **旗舰交互式架构工作台** | [`live-demo.html`](live-demo.html) | [`live-demo.en.html`](live-demo.en.html) | Microsoft Web IQ 实时网页接地 + Google AP2 熔断器 + Stripe SPT / x402 双轨结算 + **180 个企业业务场景策略沙盒（含实时搜索筛选）** |
| **Web IQ 接地与结算 7-Card 报告** | [`benchmark-cards.html`](benchmark-cards.html) | [`benchmark-cards.en.html`](benchmark-cards.en.html) | 覆盖并行 `passage` 接地（`2.75x` 加速、`7.1x` Token 削减）、DOM 提示词注入 `100%` 拦截与报价逆序一致性（`0.0 pt` 漂移） |
| **六平面 AI-Native 工作负载评测** | [`reports/agentic-commerce-6plane-bench/index.html`](reports/agentic-commerce-6plane-bench/index.html) | [`report.json`](reports/agentic-commerce-6plane-bench/report.json) | 6 平面确定性控制架构 vs 传统三层 Web 架构在授权越权、重放与目录篡改场景下的对比 |
| **B2B 企业采购与三单匹配评测** | [`reports/agentic-commerce-enterprise-procurement-bench/index.html`](reports/agentic-commerce-enterprise-procurement-bench/index.html) | [`report.json`](reports/agentic-commerce-enterprise-procurement-bench/report.json) | `PO == GRN == Invoice` 三单匹配、Vickrey 密封竞价 RFQ、BEC 篡改拦截与 `2/10 Net 30` 动态贴现 |
| **跨境清结算、外汇与隐私合规评测** | [`reports/agentic-commerce-global-clearing-privacy-bench/index.html`](reports/agentic-commerce-global-clearing-privacy-bench/index.html) | [`report.json`](reports/agentic-commerce-global-clearing-privacy-bench/report.json) | 多商户最大余数分账守恒、120s 锁汇走廊、HS6 DDP 报关防低报、PCI 脱敏与 GDPR 加密粉碎 |
| **订阅计费、忠诚度与嵌入式金融评测** | [`reports/agentic-commerce-lifecycle-finance-bench/index.html`](reports/agentic-commerce-lifecycle-finance-bench/index.html) | [`report.json`](reports/agentic-commerce-lifecycle-finance-bench/report.json) | 用量水位线幂等去重、FTC 一键退订、优惠券防叠加破底价与企业贸易信贷核保 |
| **高可用韧性与 Cloudflare 全栈简报** | [`reports/agentic-commerce-resilience-bench/index.html`](reports/agentic-commerce-resilience-bench/index.html) | [`Cloudflare Executive Summary`](reports/cloudflare-agentic-commerce-2026-11-14/Cloudflare-Agentic-Commerce-2026-Executive-Summary.en.html) | 7 门禁统一结账流水线韧性测试，以及 Cloudflare 边缘可信代理（Web Bot Auth）执行摘要 |

---

## 3. 企业智能体商业六平面参考架构（6-Plane Reference Architecture）

```mermaid
flowchart TB
    User["买方用户 / 企业采购审批人<br/>(Passkey / FIDO2 / 预算策略签发)"]

    subgraph AgentPlane["非确定性推理与交互层 (Model & Orchestration Zone)"]
        Planner["LLM 规划与多代理路由<br/>(仅发起提案，无直接扣款凭证)"]
        WebIQ["Plane 2: 实时检索接地与目录完整性<br/>(Microsoft Web IQ passage + Browse 复核 + RFC 9530 摘要)"]
    end

    subgraph ControlPlane["确定性受托控制面 (Deterministic Fiduciary Control Plane)"]
        EdgeID["Plane 1: 边缘代理身份与防重放<br/>(RFC 9421 签名 / Visa TAP / Web Bot Auth)"]
        Policy["Plane 3: 策略门禁与 UI 隔离<br/>(AP2 §7.4 受托熔断器 / A2UI 隔离 / 审批流)"]
        Mandate["Plane 4: 加密授权与受限令牌签发<br/>(AP2 SD-JWT+kb / Stripe SPT / Visa VIC / Link Wallet)"]
        Settlement["Plane 5: 多轨原子结算与商业 Saga<br/>(多商户拆单 / B2B 三单匹配 / OTA 双阶段锁仓 / x402 & MPP)"]
        Dispute["Plane 6: 拒付抗辩、税务锁汇与隐私合规<br/>(Visa CE 3.0 证据树 / HS6 DDP & FX 走廊 / PCI & GDPR 脱敏)"]
    end

    Merchant["商户商业接口与企业 ERP<br/>(ACP / UCP / Shopify / SAP / Ariba)"]
    Rails["支付网络与清结算基础设施<br/>(Stripe / VisaNet / Mastercard / ISO 20022 / USDC)"]

    User -->|签署预算上限与最终报价| Policy
    User --> Planner
    Planner <-->|低成本商品发现与实时价格复核| WebIQ
    Planner -->|结构化结账/采购提案| EdgeID
    EdgeID --> Policy
    Policy -->|校验摘要一致性与风控阈值| Mandate
    Mandate -->|签发单次限额受托凭证| Settlement
    Settlement <-->|幂等订单与履约事件| Merchant
    Settlement <-->|资金授权、分账与对账回读| Rails
    Settlement --> Dispute
```

| 架构平面 | 解决的核心架构风险 | 关键协议与标准 | 仓库参考实现模块 (`lab/`) |
|---|---|---|---|
| **Plane 1：边缘身份与可信代理鉴权** | 恶意爬虫伪装 AI 代理绕过 WAF、重放请求或抢购稀缺库存 | `RFC 9421 HTTP Message Signatures`、`Visa TAP`、`Cloudflare Web Bot Auth`、`Poppy v0.2 DPoP` | [`lab/agent_identity_attestation_guard.py`](lab/agent_identity_attestation_guard.py)、[`lab/poppy_guard.py`](lab/poppy_guard.py) |
| **Plane 2：实时网页接地与目录完整性** | 陈旧索引导致结账价格漂移、网页隐藏 DOM 提示词注入、残缺目录同步误删商品 | `Microsoft Web IQ (/v3/search/web & /v3/browse)`、`UCP Feed (RFC 9530)`、`ACP Catalog` | [`lab/webiq_commerce_demo.py`](lab/webiq_commerce_demo.py)、[`lab/ucp_preflight.py`](lab/ucp_preflight.py) |
| **Plane 3：受托策略门禁与交互隔离** | LLM 擅自确认不可逆扣款、商户下发富文本污染模型上下文、安全召回商品误购 | `Google AP2 §7.4 Fiduciary Circuit Breaker`、`UCP Declarative A2UI`、`WebMCP` | [`lab/payment_approvals.py`](lab/payment_approvals.py)、[`lab/protocol_readiness_auditor.py`](lab/protocol_readiness_auditor.py) |
| **Plane 4：加密授权令与受限支付令牌** | 原始卡号（PAN）或长效商户私钥暴露给模型、超预算扣款、跨商户令牌挪用 | `Google AP2 (SD-JWT+kb)`、`Stripe SPT`、`Visa VIC`、`Mastercard Agent Pay`、`FIDO2 SPC` | [`lab/checkout.py`](lab/checkout.py)、[`lab/mcp_migration.py`](lab/mcp_migration.py) |
| **Plane 5：多轨清结算与跨系统 Saga** | 跨商户部分缺货、B2B 收货与发票不一致、订阅超额计费、高频 API 亚美分尾差损耗 | `Stripe Connect Split`、`IATA NDC`、`ERP 3-Way Match`、`x402 (EIP-3009)`、`MPP Tempo` | [`lab/unified_checkout_pipeline.py`](lab/unified_checkout_pipeline.py)、[`lab/b2b_three_way_match_guard.py`](lab/b2b_three_way_match_guard.py)、[`lab/marketplace_split_settlement_guard.py`](lab/marketplace_split_settlement_guard.py) |
| **Plane 6：拒付抗辩、跨境财税与隐私保护** | 友好欺诈（Friendly Fraud）败诉、汇率剧烈滑点、报关低报罚没、日志泄露 PAN/PII | `Visa CE 3.0 / VAMP`、`ACP ATDRP`、`ISO 20022 pacs.008`、`PCI-DSS v4.0.1`、`GDPR Art. 17` | [`lab/dispute_evidence_replay.py`](lab/dispute_evidence_replay.py)、[`lab/fx_treasury_iso20022_guard.py`](lab/fx_treasury_iso20022_guard.py)、[`lab/zk_eligibility_privacy_redaction_guard.py`](lab/zk_eligibility_privacy_redaction_guard.py) |

---

## 4. 关键技术栈与协议选型速查矩阵（SA Selection Matrix）

### 4.1 企业智能体平台底座选型
| 评估维度 | Microsoft Copilot Studio | Azure AI Foundry + LangGraph / Agent Framework | Salesforce Agentforce / Shopify Sidekick |
|---|---|---|---|
| **最适业务场景** | M365 内部员工采购申请、审批流协同、低代码快速上线 | 复杂多商户比价、自定义确定性受托控制面、混合模型 FinOps 路由 | 已深度绑定 Salesforce CRM 或 Shopify 单一商户店内的导购与售后 |
| **权限与合规控制** | 原生 Entra ID + Power Platform DLP 连接器治理 | 完全可控的状态机、离线可验签 AP2/SPT 网关与私有 VNet 隔离 | 原生复用 CRM 对象权限或 Shopify Checkout 扩展沙盒 |
| **详细选型指南** | [中文指南](docs/agentic-commerce-platform-copilot-studio-vs-foundry-langgraph-vs-agentforce-shopify-selection-faq.md) · [English](docs/agentic-commerce-platform-copilot-studio-vs-foundry-langgraph-vs-agentforce-shopify-selection-faq.en.md) | [全栈参考蓝图](docs/research/2026-10-18-agentic-commerce-full-stack-architecture.md) · [English](docs/research/2026-10-18-agentic-commerce-full-stack-architecture.en.md) | [协议互操作选型](docs/agentic-commerce-protocol-stack-mcp-vs-a2a-acp-ucp-ap2-x402-interoperability-selection-faq.md) · [English](docs/agentic-commerce-protocol-stack-mcp-vs-a2a-acp-ucp-ap2-x402-interoperability-selection-faq.en.md) |

### 4.2 实时商品发现与网页接地（Web Grounding）选型
| 方案 | 核心架构定位 | 优势 | 局限与架构护栏要求 |
|---|---|---|---|
| **Microsoft Web IQ** (`/v3/search/web` + `/v3/browse`) | 原生双阶段商业接地（毫秒级 `passage` 召回 + 结算前实时 `/v3/browse` 落地页核验） | Token 消耗低、支持结构化切片与安全召回新闻筛查 | 结账前必须核对 `liveCrawlSucceeded == true` 并过滤隐藏 DOM 注入（[深度对比](docs/research/2026-11-12-webiq-search-competitive.md)） |
| **Perplexity Sonar / Tavily** | 聚合问答式检索摘要 | 接入极简，适合早期导购问答意图澄清 | 摘要易折叠实时库存/运费细节，**不可直接作为扣款最终报价依据** |
| **Exa / Firecrawl / Browser-Use** | 语义发现 / 整页 Markdown 提取 / 无头浏览器表单执行 | 覆盖无 API 长尾站点与受控 WebView 交接 | 整页抓取延迟与 Token 成本高；切换支付方式或点击不可逆按钮需强制人工确认 |

### 4.3 智能体支付与授权轨道选型
| 支付/授权机制 | 资金结算轨道 | 最适交易金额与场景 | 核心风控与对账要点 |
|---|---|---|---|
| **Stripe SPT + ACP / UCP** | 卡组织 / 钱包受限单次令牌 | 零售电商、酒旅预订（最长 180 天有效期）、平台拆单 | 严格绑定卖家 Profile、`max_amount` 与到期时间；外部 PSP 仅单次调用 `SPT Resolve` |
| **Visa VIC + TAP / Mastercard Agent Pay** | 卡网络级受托代理令牌 + Passkey 指令 | 跨商户个人购物代理、高客单价消费品 | 网关验签 `RFC 9421` 请求头防重放；由发卡/卡网执行商户与金额硬约束 |
| **Google AP2 (`SD-JWT+kb`)** | 跨协议加密意图与购物车授权证明 | 自主补货（Open Mandate）、B2B 预算委托与多跳代理链路 | 强制校验 `checkout_hash` 与 §7.4 受托熔断器，熔断后须人类签署恢复令 |
| **HTTP 402 (`x402` / `Stripe MPP Tempo`)** | 链上 USDC（`EIP-3009`）或流式微支付会话 | 高频 API / 数据采购、智能体间按调用或亚美分计量付费 | 校验区块确认深度与稳定币脱锚熔断；Tempo 流式会话按整美分步长对齐消除尾差 |

---

## 5. 六大企业业务域与精选 SA 决策指南（全库共 178 篇双语 FAQ）

> 📚 **完整索引入口**：[**中文总目录（178 篇双语 FAQ + 21 份架构蓝图）**](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/index.md) ｜ [**English Full Catalog (`docs/index.en.md`)**](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/index.en.md)

### 🔥 2026-11-19/20 新增 30 篇主流商业与企业智能体架构选型深潜（累计 178 篇双语指南）
- **零售电商、O2O 生活与出行票务（新增 18 篇）**：
  - [汽车租赁与商旅租车：3D 视觉战损比对、防柜台重卖 CDW 与 ETC 14 天定额子令牌](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/car-rental-mobility-damage-vision-toll-escrow-ev-fuel-agent-selection-faq.md) ｜ [二手车直卖与车商拍卖：OBD 多模块调表阻断、车贷直付解押与 NMVTIS 防泡水洗白](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/used-car-ecommerce-dealer-auction-odometer-title-lien-escrow-agent-selection-faq.md)
  - [智慧停车无感道闸与新能源超充：防跟车漏拍幽灵计费、防二维码钓鱼（Quishing）与占桩费门槛锁](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/smart-parking-ev-supercharger-lpr-idle-fee-fleet-escrow-agent-selection-faq.md) ｜ [出境游 eSIM 与企业差旅漫游：购前有锁机拦截、海事卫星 MCC 901 屏蔽与零字节秒退](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/travel-esim-roaming-carrier-lock-maritime-billshock-escrow-agent-selection-faq.md)
  - [家装厨卫定制与全屋整装：激光量房 CAD 防撞尺、<=5% 增项封顶与四阶质检托管](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/home-remodeling-custom-cabinetry-lidar-cad-milestone-escrow-agent-selection-faq.md) ｜ [跨城搬家与自助迷你仓：49 CFR 375 防半路加价扣货、迷你仓 12 个月锁价与 SCRA 军人禁拍](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/moving-relocation-self-storage-hostage-load-scra-escrow-agent-selection-faq.md)
  - [服装先试后买（TBYB）与多尺码试穿：签收触发 7 天预授权、防预付卡骗货与 NFC 防蹭穿封签](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/ecommerce-try-before-you-buy-tbyb-bracketing-preauth-wardrobing-agent-selection-faq.md) ｜ [预售众筹与 C2M 按需生产：FTC 30 天延期必经二次确权与 180 天 SPT 出库才实扣](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/ecommerce-preorder-made-to-order-ftc-shipping-delay-escrow-agent-selection-faq.md)
  - [全生命周期延保（AppleCare+ / Extend）与先行置换 RMA：投保前实时硬件自检与核心旧件序列号核销](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/warranty-extended-protection-advanced-rma-collateral-claim-audit-agent-selection-faq.md) ｜ [线上配镜与隐形眼镜订阅：验光单 OCR+AR 瞳距防报废、FTC 8 工作时验方与 VSP/FSA 拆账](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/optical-eyewear-contact-lens-rx-verification-vision-benefit-escrow-agent-selection-faq.md)
  - [新婚/母婴心愿单众筹与微信送礼：跨站原子认领锁防买重、盲地址隐私令牌与退礼静默转储值防洗钱](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/gift-registry-group-gifting-duplicate-lock-anti-cashout-agent-selection-faq.md) ｜ [鲜花礼盒与节日蛋糕定时达：出餐视觉数花验真、仪式时间窗 SLA 自动退与防猫咪百合中毒](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/floral-gifting-bakery-time-window-substitution-coldchain-agent-selection-faq.md)
  - [高定婚纱、西装定制与伴郎团租赁：出厂直裁防千元改衣费、伴娘团同缸染色锁与 T-14d 试穿死线](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/wedding-bridal-gown-bespoke-tailoring-alteration-cap-escrow-agent-selection-faq.md) ｜ [滑雪季卡与高尔夫球场订场：实名随机冷却池防黄牛抢果岭、大风封山自动退费与 ISO 11088 DIN 锁](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/ski-resort-pass-golf-tee-time-bot-scalper-weather-escrow-agent-selection-faq.md)
  - [到店团购代金券与储值次卡：30 秒动态 TOTP 核销码、防门店自买骗补与过期 100% 自动退](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/local-services-o2o-voucher-dynamic-qr-escrow-expired-refund-agent-selection-faq.md) ｜ [私教美发与专家预约：候补填满免收爽约金、迟到缩水按比例扣减与指定私教离职无损退](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/appointment-salon-coaching-noshow-preauth-trainer-churn-escrow-agent-selection-faq.md)
- **企业 B2B 采购、数据/SaaS 变现与金融合规（新增 12 篇）**：
  - [定制包装与大宗商业印刷：PDF/X-4 印前确定性预检、在库刀模复用锁与拼版色彩托管](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/b2b-custom-packaging-print-preflight-pantone-dieline-escrow-agent-selection-faq.md) ｜ [企业商业数据市场与金融 API 变现：洁净室空值率验真、防全表爆量账单与 SEC MNPI 隔离](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/b2b-data-marketplace-api-monetization-sample-gate-mnpi-escrow-agent-selection-faq.md)
  - [程序化广告采买与媒介代理审计：竞价前剔除 MFA 垃圾站、代理商隐形返点（AVB）穿透与 vCPM 结算](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/b2b-marketing-media-buying-mfa-block-agency-rebate-audit-agent-selection-faq.md) ｜ [医药学术会议与医械 GPO 返利：阳光法案 NPI 餐标锁、防串货骗返利与手术室 UDI 扫码结算](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/lifesciences-hcp-sunshine-act-medtech-gpo-rebate-consignment-agent-selection-faq.md)
  - [商业字体、图库与开源版权采购：防桌面字体打包进 App 侵权、SPDX AGPL 阻断与 C2PA 免责](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/b2b-creative-stock-font-licensing-agpl-c2pa-indemnity-agent-selection-faq.md) ｜ [跨境海空运订舱与滞箱费托管：防零运费拼箱目的港天价拆箱费（CISF）与 FMC OSRA-22 停钟审计](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/b2b-freight-forwarding-ocean-booking-cisf-demurrage-escrow-agent-selection-faq.md)
  - [企业法务律所账单（LEDES）审计与专利年费：防笼统记账（Block Billing）、防陪会多收钱与涉诉专利防断供](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/b2b-legal-spend-ledes-billing-audit-patent-annuity-escrow-agent-selection-faq.md) ｜ [共享办公与灵活工位：防退租天价还原费吞押金、T-105d 防静默续约与刷卡率转按次日卡](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/coworking-flexible-office-restoration-fee-auto-renewal-escrow-agent-selection-faq.md)
  - [企业团餐、会议茶歇与加班餐补：09:45 门禁实到人数防剩饭浪费、SKU 屏蔽烟酒购物卡与过敏原熔断](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/corporate-catering-office-meal-headcount-allergen-escrow-agent-selection-faq.md) ｜ [高校跨境学费、529 计划与退课反洗钱：防 8.5 折代缴盗刷诈骗、原路退回锁与 Title IV R2T4](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/highered-tuition-international-fx-529-refund-aml-escrow-agent-selection-faq.md)
  - [智能信贷审批与合规债务重组：ECOA 公平信贷、防合成身份养卡爆雷与 CFPB Reg F 7-in-7 频控](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/fintech-credit-underwriting-bustout-regf-hardship-restructure-agent-selection-faq.md) ｜ [付费会员（Prime/Costco/88VIP）、创作者专栏防扒库与居家养老 Cures Act BLE EVV 托管](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/creator-economy-patreon-substack-archive-scraping-iap-escrow-agent-selection-faq.md)

### 🔥 2026-11-18/19 最新行业能力突破与 29 篇企业商业智能体选型深潜
- **支付与入口协议能力突破**：
  - [企业司库与供应商门户 AP 自动化：Stripe Treasury/Issuing for Agents (MCP) vs Visa × BILL × Billtrust (VIC + TAP)](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/enterprise-treasury-supplier-portal-ap-payment-stripe-mcp-vs-visa-bill-tap-selection-faq.md) · [EN](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/enterprise-treasury-supplier-portal-ap-payment-stripe-mcp-vs-visa-bill-tap-selection-faq.en.md)
  - [社交与搜索原生直购协议：Google AI Mode UCP vs TikTok Buy Direct vs Shopify Fall '26 & Walmart Agent Gateway (MCP)](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/social-search-native-checkout-google-ucp-vs-tiktok-buy-direct-shopify-walmart-mcp-selection-faq.md) · [EN](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/social-search-native-checkout-google-ucp-vs-tiktok-buy-direct-shopify-walmart-mcp-selection-faq.en.md)
  - [电商结账前防买错验证（基于 Visa 22 模型基准 42.8% 失败率实证）：八维契约门禁 vs 盲目代买](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/ecommerce-pre-purchase-verification-anti-wrong-buy-visa-benchmark-gate-selection-faq.md) · [EN](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/ecommerce-pre-purchase-verification-anti-wrong-buy-visa-benchmark-gate-selection-faq.en.md)
  - [个人智能体跨会话持久意图：Sierra/Meta Poppy v0.1 + MCP Intent Services vs Google AP2](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/personal-agent-persistent-intent-services-poppy-vs-ap2-recurring-budget-selection-faq.md) · [EN](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/personal-agent-persistent-intent-services-poppy-vs-ap2-recurring-budget-selection-faq.en.md)
- **零售电商、O2O 生活服务与垂直商业落地方案**：
  - [新能源车直营下定锁单、以旧换新国补核验与车贷分轨](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/automotive-ev-d2c-deposit-lock-tradein-subsidy-financing-agent-selection-faq.md) ｜ [医美齿科预付存管、UDI 四验真与折后退费](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/consumer-healthcare-medspa-dental-prepaid-escrow-license-refund-agent-selection-faq.md)
  - [企业差旅 TMC 协议价（LRA）审计与未用机票积分（UTC）自动抵扣](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/corporate-tmc-travel-policy-lra-rate-audit-unused-ticket-credit-agent-selection-faq.md) ｜ [连锁餐饮加盟自动订货、FEFO 效期锁与特许权自动分账](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/franchise-qsr-foodservice-auto-ordering-fefo-royalty-split-agent-selection-faq.md)
  - [独立站弃购挽回 WhatsApp/RCS 编排、TCPA 安静时段锁与防骗神券](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/ecommerce-abandoned-cart-recovery-whatsapp-rcs-tcpa-coupon-guard-agent-selection-faq.md) ｜ [在线医药与配镜视光 eRx/瞳距核验、PBM 比价与冷链禁退](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/digital-pharmacy-optical-rx-verification-pbm-copay-coldchain-agent-selection-faq.md)
  - [宠物自动订购粮（Autoship）、跨物种毒性硬拦截与宠物医保秒级直付](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/pet-ecommerce-autoship-rx-vet-insurance-direct-pay-agent-selection-faq.md) ｜ [生鲜商超临期动态打折、GS1 AI(17) 效期死锁与盲盒/抵税捐赠](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/grocery-perishable-dynamic-markdown-gs1-expiry-lock-food-rescue-agent-selection-faq.md)
  - [上门维修一口价上限、防私单飞单与 80/20 质保托管](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/home-services-on-demand-repair-upfront-quote-escrow-agent-selection-faq.md) ｜ [婚庆多供应商档期 Saga、30/50/20 原片托管与场地隐形费锁](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/wedding-bespoke-event-multi-vendor-milestone-escrow-agent-selection-faq.md)
  - [网红寄样与带货分佣：防 Honey/Rakuten 插件截胡（Stand-Down）与 T+35d 托管](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/influencer-seeding-affiliate-coupon-poaching-escrow-agent-selection-faq.md) ｜ [高端腕表与裸钻寄售/B2B Memo：防拼装机芯、防套证培育钻与 NFC 防拆铅封](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/luxury-watch-jewelry-consignment-gia-authentication-b2b-memo-escrow-agent-selection-faq.md)
  - [共享充电宝与智能冷柜：加密槽位防空壳、手机 BLE 离线秒结防 $99 刺客](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/shared-powerbank-smart-vending-deposit-free-preauth-cap-agent-selection-faq.md) ｜ [O2O 洗护与奢品护理：ISO 3758 水洗标视觉拦截、洗前瑕疵确权与 UHF RFID](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/laundry-dry-cleaning-luxury-care-rfid-damage-escrow-agent-selection-faq.md)
- **企业 B2B 采购、不动产、司库金融与合规结算**：
  - [房屋与商业租赁押金专户、CAM 物业审计与防假房东电汇](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/proptech-residential-commercial-leasing-deposit-escrow-cam-ach-agent-selection-faq.md) ｜ [购物中心商铺 POS 抽成租金审计、跨店退货上限与装修补贴留置权豁免](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/commercial-cre-retail-mall-percentage-rent-pos-audit-lien-waiver-agent-selection-faq.md)
  - [企业商务礼赠与员工福利：未领取 100% 退回、FCPA 合规与 $75 免税锁](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/b2b-corporate-gifting-employee-rewards-unclaimed-clawback-tax-agent-selection-faq.md) ｜ [联合办公门禁遥测缩容、90 天退租锁与打印/会议室额度](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/coworking-flexible-office-badge-telemetry-desk-rightsizing-agent-selection-faq.md)
  - [企业 IT 设备租赁（DaaS）：退租前 ABM/MDM 解绑、NIST 800-88 擦除证与员工残值内购](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/b2b-it-device-as-a-service-daas-leasing-buyout-nist-wipe-agent-selection-faq.md) ｜ [智能投顾与企业现金司库：IRS §1091 61 天洗售硬拦截与多银行 FDIC 扫单](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/wealth-cash-sweep-treasury-wash-sale-fdic-routing-agent-selection-faq.md)
  - [数字出版付费墙与 AI 爬虫按次计费（HTTP 402 / TollBit / Cloudflare）](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/digital-media-paywall-per-article-micropayment-ai-crawler-licensing-agent-selection-faq.md) ｜ [全球名义雇主（EOR）与灵活用工：防 AB5/IR35 伪自雇、防幽灵工时与本币锁汇](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/global-eor-contractor-payroll-misclassification-fx-escrow-agent-selection-faq.md)
  - [临床试验受试者补贴与差旅：跨院洗脱期查重、eCOA 联动与 HIPAA 1099 税务盲墙](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/clinical-trial-patient-stipend-dtp-ecoa-privacy-tax-agent-selection-faq.md) ｜ [托育早教与夏令营：在岗师生比硬锁、3 个月预收费存管与 CCDF/FSA 拆账](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/childcare-preschool-camp-subsidy-copay-ratio-escrow-agent-selection-faq.md)
  - [生鲜产地直采（USDA PACA 信托）、24h 官方定损锁与秋收卖粮瀑布分账](https://github.com/turbo998/agentic-commerce-lab/blob/main/docs/agri-inputs-produce-paca-trust-crop-proceeds-escrow-agent-selection-faq.md)

1. **平台选型、实时网页接地（Web IQ）与入口治理**
   - [Copilot Studio vs Azure AI Foundry + LangGraph vs Agentforce/Shopify 平台选型](docs/agentic-commerce-platform-copilot-studio-vs-foundry-langgraph-vs-agentforce-shopify-selection-faq.md) · [EN](docs/agentic-commerce-platform-copilot-studio-vs-foundry-langgraph-vs-agentforce-shopify-selection-faq.en.md)
   - [Microsoft Web IQ vs Perplexity Sonar / Tavily / Exa / Firecrawl / Browser-Use 接地选型](docs/agentic-commerce-grounding-webiq-vs-perplexity-sonar-tavily-exa-firecrawl-browseruse-selection-faq.md) · [EN](docs/agentic-commerce-grounding-webiq-vs-perplexity-sonar-tavily-exa-firecrawl-browseruse-selection-faq.en.md)
   - [智能体身份鉴权：Cloudflare Web Bot Auth & Visa TAP vs 传统 WAF IP 封禁](docs/ecommerce-agent-identity-web-bot-auth-tap-vs-waf-faq.md) · [EN](docs/ecommerce-agent-identity-web-bot-auth-tap-vs-waf-faq.en.md)
2. **智能体支付协议、加密授权令牌（Mandates）与强核身**
   - [MCP vs A2A vs ACP / UCP / AP2 / x402 全栈协议分层与互操作选型](docs/agentic-commerce-protocol-stack-mcp-vs-a2a-acp-ucp-ap2-x402-interoperability-selection-faq.md) · [EN](docs/agentic-commerce-protocol-stack-mcp-vs-a2a-acp-ucp-ap2-x402-interoperability-selection-faq.en.md)
   - [Stripe SPT vs Visa VIC vs Mastercard Agent Pay vs PayPal 虚拟卡方案选型](docs/agentic-payment-toolkit-stripe-spt-vs-visa-vic-mastercard-paypal-virtual-card-selection-faq.md) · [EN](docs/agentic-payment-toolkit-stripe-spt-vs-visa-vic-mastercard-paypal-virtual-card-selection-faq.en.md)
   - [3DS2 解耦挑战与 FIDO2 / Passkey 生物核身 vs 短信 OTP 劫持防护](docs/agentic-3ds2-fido2-spc-biometric-stepup-mandate-vs-sms-otp-scraping-takeover-faq.md) · [EN](docs/agentic-3ds2-fido2-spc-biometric-stepup-mandate-vs-sms-otp-scraping-takeover-faq.en.md)
3. **多商户零售编排、平台分账与酒旅航司（OTA / NDC）**
   - [跨商户购物车两阶段锁仓 Saga vs 平台单一收单 Connect 分账选型](docs/multi-merchant-split-cart-saga-vs-connect-faq.md) · [EN](docs/multi-merchant-split-cart-saga-vs-connect-faq.en.md)
   - [OTA 机酒动态降价重订、IATA NDC ONE Order 与退改签 Saga 架构](docs/ota-travel-planning-price-drop-rebooking-ndc-saga-architecture-selection-faq.md) · [EN](docs/ota-travel-planning-price-drop-rebooking-ndc-saga-architecture-selection-faq.en.md)
   - [电商平台卖家 KYB 滚动保证金（Rolling Reserve）与签收托管防跑路架构](docs/marketplace-seller-kyb-rolling-reserve-delivery-escrow-agent-selection-faq.md) · [EN](docs/marketplace-seller-kyb-rolling-reserve-delivery-escrow-agent-selection-faq.en.md)
4. **B2B 企业采购寻源、ERP 三单匹配与供应链金融**
   - [B2B 寻源比价、合同红线审阅与 SAP / Ariba / Coupa 采购智能体集成](docs/b2b-rfq-sourcing-supplier-comparison-contract-redline-erp-copilot-selection-faq.md) · [EN](docs/b2b-rfq-sourcing-supplier-comparison-contract-redline-erp-copilot-selection-faq.en.md)
   - [企业应付账款（AP）三单匹配（PO-GRN-Invoice）与动态现金折扣自动化](docs/enterprise-ap-automation-three-way-match-dynamic-discounting-treasury-agent-selection-faq.md) · [EN](docs/enterprise-ap-automation-three-way-match-dynamic-discounting-treasury-agent-selection-faq.en.md)
   - [供应商准入银行账户变更防 BEC 邮件诈骗与制裁筛查护栏](docs/b2b-vendor-onboarding-bank-account-change-bec-fraud-sanctions-mandate-vs-email-iban-hijack-faq.md) · [EN](docs/b2b-vendor-onboarding-bank-account-change-bec-fraud-sanctions-mandate-vs-email-iban-hijack-faq.en.md)
5. **SaaS 订阅生命周期、用量计费与机器微支付**
   - [企业 SaaS 席位真实活跃度盘点（True-Up）与防僵尸续费授权](docs/saas-seat-trueup-telemetry-mandate-vs-shelfware-auto-renewal-faq.md) · [EN](docs/saas-seat-trueup-telemetry-mandate-vs-shelfware-auto-renewal-faq.en.md)
   - [HTTP 402（x402 / Stripe MPP）流式微支付通道轧差 vs 卡组织固定手续费侵蚀](docs/agentic-x402-mpp-streaming-micropayment-channel-netting-mandate-vs-card-fixed-fee-margin-wipeout-faq.md) · [EN](docs/agentic-x402-mpp-streaming-micropayment-channel-netting-mandate-vs-card-fixed-fee-margin-wipeout-faq.en.md)
   - [商业智能体 SLM vs 前沿大模型分级路由、语义缓存与 FinOps 成本治理](docs/commercial-agent-model-routing-slm-vs-frontier-llm-finops-cache-selection-faq.md) · [EN](docs/commercial-agent-model-routing-slm-vs-frontier-llm-finops-cache-selection-faq.en.md)
6. **跨境税务（MoR）、外汇资金池、隐私脱敏与拒付抗辩**
   - [跨境电商税务合规：Merchant of Record（MoR）vs 自建 PSP + Stripe Tax / DDP 选型](docs/cross-border-tax-compliance-mor-vs-sor-stripe-tax-ddp-duty-agent-selection-faq.md) · [EN](docs/cross-border-tax-compliance-mor-vs-sor-stripe-tax-ddp-duty-agent-selection-faq.en.md)
   - [Visa CE 3.0 强证据链与 Ethoca / RDR 预警 vs 友好欺诈（VAMP）拒付抗辩](docs/agentic-chargeback-ce30-compelling-evidence-ethoca-rdr-mandate-vs-friendly-fraud-vdmp-penalty-faq.md) · [EN](docs/agentic-chargeback-ce30-compelling-evidence-ethoca-rdr-mandate-vs-friendly-fraud-vdmp-penalty-faq.en.md)
   - [Stripe 总裁 John Collison 论智能体商业 7 大趋势与五级自主性架构映射](docs/research/2026-11-01-stripe-collison-7-agentic-commerce-trends.md) · [EN](docs/research/2026-11-01-stripe-collison-7-agentic-commerce-trends.en.md)

---

## 6. 仓库目录结构与本地验证（Repository Layout & Quickstart）

```text
agentic-commerce-lab/
├── README.md / README.en.md          # 中英双语架构师总览与选型入口
├── live-demo.html / live-demo.en.html # 自包含 H5 交互式智能体商业工作台（双语）
├── benchmark-cards.html / .en.html   # 7-Card 4:5 视觉基准评测卡片流（双语）
├── docs/
│   ├── index.md / index.en.md        # 178 篇双语 SA 决策指南（FAQ）分类总目录
│   ├── *-faq.md / *-faq.en.md        # 六大企业商业域架构选型、Mermaid 图与核查清单
│   ├── architecture/                 # 21 份确定性领域状态机与美分守恒规格说明
│   └── research/                     # 全栈六平面蓝图、Web IQ 竞品矩阵与行业趋势深度报告
├── research/                         # 个人智能体基础参考架构、协议分层、使用场景与来源注册表
├── lab/                              # 零第三方依赖的确定性受托控制面 Python 实现与基准生成器
├── src/agentic_commerce/             # Microsoft Web IQ × Agentic Commerce 核心评估引擎
├── reports/                          # 密封的基准评测报告包（JSON 数据源 + HTML 视觉卡片）
└── tests/                            # 覆盖全部协议门禁、美分守恒与幂等恢复的 1,056 项单元测试
```

### 快速运行与验证（仅依赖 Python 3.11+ 标准库）

```bash
# 1. 运行全量确定性单元测试套件（69 个测试模块 / 1,056 项断言）
python -m unittest discover -s tests

# 2. 运行离线受托结账与幂等重放基线演示（默认无外部网络调用、零真实扣款）
python -m lab.demo

# 3. 重新生成双语交互式工作台与 7-Card 基准测试报告
python -m lab.webiq_commerce_demo --output reports/2026-11-09-webiq-commerce-demo
```

> **数据溯源与边界说明（Provenance）**：本仓库默认采用零外部扣款的确定性离线仿真与架构验证（`status=simulated`），所有评测指标均明确标注数据来源类型（`measured` / `deterministic_offline_simulation` / `official_doc_snapshot`），未实测的供应商延迟均严格保留为 `not_measured`，绝不捏造基准坐标或替代支付机构生产合规认证。
