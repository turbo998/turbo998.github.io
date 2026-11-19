'use strict';
const ui = require('./hub-layout.cjs');
const {knowledgeFigure} = require('./knowledge-atlas.cjs');
const node = (title, detail, relation) => ({title, detail, relation});

const t = (zh, en, cn) => (zh ? cn : en);

function profileSubnav(file, zh, current) {
  const tabs = [
    ['about', 'about.html', 'zh-about.html', 'Profile & Executive Bio', '个人简介与核心定位'],
    ['career', 'career.html', 'zh-career.html', 'Career (Microsoft · AWS · ECCOM · Cisco)', '职业履历（微软 · AWS · 华讯 · 思科）'],
    ['skills', 'skills.html', 'zh-skills.html', 'Certifications (AB-100 · AI-103 · GH-300)', '技术认证与著作（AB-100 · AI-103 · GH-300）'],
    ['fte', 'fte.html', 'zh-fte.html', 'What is FTE · Learning Path & Registration', 'FTE 全景介绍 · 学习路径与注册入口']
  ];
  return `<nav class="section-nav" aria-label="${t(zh, 'Frontier Transformation Engineer sections', 'Frontier Transformation Engineer 栏目导航')}">${tabs
    .map(
      ([id, enUrl, zhUrl, enLabel, cnLabel], idx) =>
        `<a href="${ui.href(file, zh ? zhUrl : enUrl)}"${id === current ? ' aria-current="page"' : ''}><span>0${idx + 1}</span>${ui.esc(
          zh ? cnLabel : enLabel
        )}</a>`
    )
    .join('')}</nav>`;
}

const CAREER_ERAS = [
  {
    id: 'era-microsoft',
    featured: true,
    company: ['Microsoft', '微软 (Microsoft)'],
    role: [
      'Frontier Transformation Engineer · Sr. AI Solution Architect · Strategic Solution Partnership (GCPS)',
      'Frontier Transformation Engineer · 资深 AI 解决方案架构师 · 大中华区战略解决方案合作伙伴 (GCPS)'
    ],
    period: ['2025.11 — Present · Shanghai / Singapore (25%)', '2025.11 — 至今 · 上海 / 新加坡 (25%)'],
    summary: [
      'Leading full-stack Agentic AI architecture, Harness Engineering (HVE-Core & GitHub Copilot), and Frontier Transformation Engineer (FTE) partner enablement across Greater China & regional strategic ecosystems.',
      '负责大中华区及区域战略合作伙伴的全栈 Agentic AI 解决方案架构设计、Harness Engineering（GitHub Copilot & HVE-Core）工程落地，以及合作伙伴向 Frontier Transformation Engineer (FTE) 模式的规模化转型。'
    ],
    pillars: [
      {
        title: ['30+ Agentic Offerings & 10+ Production Agent Wins', '30+ 智能体联合方案与 10+ 生产级 Agent 标杆落地'],
        body: [
          'Architected 30+ partner offerings and 10+ production Agentic AI deployments across M365 Copilot, Copilot Studio, GitHub Copilot, Azure AI Foundry, and private vLLM on AKS: (1) regulated enterprise AI Audit & Inspection Multi-Agent Platform on Azure China Landing Zone + vLLM on AKS (audit cycles cut from weeks to days); (2) leading Chinese automotive OEM 24x7 multi-language overseas CX agent + RFQ workflow (75% service cost reduction, 60% less manual workload, 300% lead-conversion uplift); (3) Pro-Code Enterprise Knowledge & Autonomous Browser-Use Lead-Discovery Agent won in 3 weeks (research compressed from days to minutes).',
          '基于 M365 Copilot、Copilot Studio、GitHub Copilot、Azure AI Foundry 与 AKS 私有化 vLLM 构建 30+ 联合方案与 10+ 生产级案例：① 强监管大型政企「AI 审计与巡检多智能体平台」（Azure 中国区 Landing Zone + AKS vLLM，报告出具从数周缩短至数天）；② 头部出海车企「7×24 多语种智能客服与询报价审批 Agent」（客服成本降低 75%、人工工单减少 60%、潜客转化率提升 300%）；③ Pro-Code 企业知识库与 Browser-use 自主拓客智能体（3 周赢单，尽调从数天缩至分钟级）。'
        ]
      },
      {
        title: ['GCR AI Agentic Frontier Hackathon (45+ Agents Coached)', '大中华区 AI Agentic Frontier 黑客松（辅导 45+ 伙伴方案）'],
        body: [
          'Organized and tech-coached 45+ partner-built Agent solutions across Pro-Code and Low-Code tracks, standardizing Model Context Protocol (MCP) tool servers, Foundry IQ / multimodal RAG grounding, OpenTelemetry distributed tracing, and dual-LLM evaluation guardrails.',
          '组织并深度技术辅导大中华区战略伙伴 45+ 个 Pro-Code 与 Low-Code 智能体参赛方案，沉淀 MCP 工具协议、Foundry IQ / 多模态 RAG 接地、OpenTelemetry 链路追踪与双模型评测护栏标准。'
        ]
      },
      {
        title: ['Harness Engineering on Azure & FTE Bootcamp Instructor', 'Azure Harness Engineering 开源套件与 FTE 训练营讲师'],
        body: [
          'Open-sourced enterprise agent-runtime deployment kits (GitHub Copilot, HVE-Core, OpenClaw, Hermes) and authored an 8-hour, 9-module hands-on workshop: 10+ deliveries, 1,000+ attendees, and 500+ GitHub Copilot seats unlocked. Served as GCR Partner Frontier Transformation Bootcamp instructor on "Accelerating Agent Development with GitHub Copilot & HVE-Core".',
          '开源企业级智能体运行时部署套件（GitHub Copilot、HVE-Core、OpenClaw、Hermes），原创 8 小时 9 模块实战工作坊（累计交付 10+ 场、覆盖 1,000+ 技术人员、激活 500+ GitHub Copilot 席位），并担任微软大中华区合作伙伴 Frontier Transformation Bootcamp《GitHub Copilot & HVE-Core 加速智能体研发》主讲导师。'
        ]
      },
      {
        title: ['153 Vertical Designs · $10M+ ACR & 60+ Customer Wins', '13 大行业 153 套场景蓝图 · $10M+ ACR 与 60+ 客户赢单'],
        body: [
          'Authored 153 industry Agentic AI solution designs across 13 verticals, co-developed the Agentic AI Discovery Workshop with strategic GSI partners, transformed partner teams toward the FDE / Frontier Transformation Engineer (FTE) delivery model, and drove 20+ co-sell offerings, 60+ customer wins, $5M+ Azure consumption, and $10M+ ACR across PRC/HK.',
          '编写覆盖 13 大行业的 153 个企业级 Agentic AI 场景方案，联合战略 GSI 共创 Agentic AI Discovery Workshop，推动伙伴技术团队向 FDE / Frontier Transformation Engineer (FTE) 转型，在大中华区驱动 20+ 联合上架方案、60+ 客户赢单、$5M+ Azure 消耗与 $10M+ ACR。'
        ]
      }
    ]
  },
  {
    id: 'era-aws',
    featured: true,
    company: ['Amazon Web Services (AWS)', '亚马逊云科技 (AWS)'],
    role: [
      'Sr. Solutions Architect · Lead of Strategic Partner Solutions (GCR Strategic Partnership)',
      '资深解决方案架构师 · 战略合作伙伴解决方案负责人 (Lead of Strategic Partner Solutions)'
    ],
    period: ['2020 — 2025.11 · Shanghai', '2020 — 2025.11 · 上海'],
    summary: [
      'Served as Lead of Strategic Partner Solutions across G2C, C2G (China-to-Global Going-Global), and C2C motions, transforming top GSI/SI/ISV partners from Buyer to Builder across GenAI, Financial Services (FSI), mass migration, and cross-border cloud security.',
      '担任战略合作伙伴解决方案负责人（Lead of Strategic Partner Solutions），全面统筹 G2C、C2G（中企出海）与 C2C 战略伙伴从 Buyer 向 Builder 转型，覆盖生成式 AI、金融行业（FSI）、大规模迁移与跨境合规安全。'
    ],
    pillars: [
      {
        title: ['Strategic Partner Solutions Lead (G2C · C2G · C2C)', '战略伙伴联合方案领军（G2C · 中企出海 C2G · C2C）'],
        body: [
          'Architected flagship partner GenAI platforms: (1) custom LangGraph + Amazon Bedrock multi-agent MBR & global marketing platform serving cross-border e-commerce sellers at 1,000 concurrency, 99.9% SLA across 7 languages; (2) China-region compliant enterprise AI seller-support & audit assistant on SageMaker (Qwen2.5-32B) + OpenSearch Hybrid RAG + KMS/PII gating handling 14K+ messages/day with 3-year audit retention.',
          '主导多项战略伙伴旗舰平台落地：① 基于 LangGraph 与 Amazon Bedrock 构建跨境电商多智能体内容与经营分析平台（支撑 1,000 并发、99.9% SLA、7 国语言）；② 构建符合中国区合规要求的企业级智能客服与审计助手（SageMaker Qwen2.5-32B + OpenSearch 混合检索 + KMS/PII 脱敏门禁，日处理 1.4 万+ 消息并满足 3 年审计留存）。'
        ]
      },
      {
        title: ['Greater China FSI & FinTech Ecosystem Lead ($16M+ ARR / $28M SPP)', '大中华区金融行业 (FSI) 与金融科技生态负责人（$16M+ ARR / $28M SPP）'],
        body: [
          'Owned the GCR FSI partner portfolio and 5-pillar bridge plan targeting $16M+ FY25 ARR ($5.7M YTD, +15% YoY). Curated the FinTech, quantitative trading & payment ecosystem (screened 15 to 4 core partners, winning 9+ consumer-finance deals) and oversaw a strategic SI partner’s $28M SPP digital-native FSI segment across digital-asset exchanges, payment rails, and Bedrock + Amazon Connect AI contact centers.',
          '统筹大中华区金融行业伙伴组合与五大支柱增长计划（目标 FY25 $16M+ ARR，YTD 达成 $5.7M、同比增长 15%）；精选孵化量化、支付与消费金融核心 ISV/SI 生态（15 选 4 攻克 9+ 消金标杆），并负责头部战略 SI 伙伴 $28M SPP 数字原生金融业务（数字资产交易、跨境支付与 Bedrock + Connect 智能联络中心）。'
        ]
      },
      {
        title: ['GenAI "Last 3 Miles" & 6 Official AWS Blog Solutions', '生成式 AI「最后三公里」工程化与 6 篇官方博客方案'],
        body: [
          'Built repeatable partner LLMOps, RAG, LangGraph, and Bedrock AgentCore / Strands solutions—including a life-science AI medical-writing assistant achieving 90% retrieval recall—and published 6 official partner architecture posts on the AWS China Official Blog.',
          '聚焦企业级 GenAI 落地「最后三公里」，携手伙伴打造 LLMOps、高召回 RAG、LangGraph 与 Bedrock AgentCore / Strands 工程方案（含召回率达 90% 的生命科学 AI 医学撰写助手），累计在亚马逊云科技官方博客发表 6 篇伙伴联合架构实践。'
        ]
      },
      {
        title: ['Cross-Border Security Matrix & 1,000+ Partner SA Launch', '跨境数据合规安全矩阵与 1,000+ 伙伴架构师赋能'],
        body: [
          'Guided C2G/G2C enterprises through CBDT, US EO 14117, and China MLPS 2.0 compliance; co-authored the GCR Partner Security Matrix; standardized Landing Zone, MSP & MSSP offerings; and led the 3-month "Partner SA Launch" bootcamp enabling 1,000+ partner Solutions Architects (AWS Solution Builder of the Year 2022 · SA of the Quarter 2023).',
          '护航跨国与出海企业应对数据跨境流动（CBDT）、14117 法案与等保 2.0 合规，联合编写大中华区《合作伙伴安全能力矩阵》，标准化 Landing Zone / MSP / MSSP 交付包；主导为期 3 个月的「Partner SA Launch」赋能超 1,000 名伙伴架构师（获 2022 年度 Solution Builder 与 2023 季度最佳 SA）。'
        ]
      }
    ]
  },
  {
    id: 'era-eccom',
    featured: true,
    company: ['ECCOM Network System', '华讯网络系统股份有限公司 (ECCOM)'],
    role: [
      '0-to-1 Team & Cloud CoE Builder · Principal Solutions Architect (Solution Architecture Lead)',
      '从 0 到 1 组建团队与 Cloud CoE 负责人 · 解决方案架构负责人 (Principal Solutions Architect)'
    ],
    period: ['2015 — 2020 · Shanghai', '2015 — 2020 · 上海'],
    summary: [
      'Founded ECCOM’s Cloud Center of Excellence (Cloud CoE) from scratch, building a 30-engineer cloud & solution architecture team from 0 to 1 and scaling the managed cloud services business from $0 to $2M ARR.',
      '在传统顶级系统集成商内部从零到一创立云计算卓越中心（Cloud CoE），从 0 到 30 人组建云架构与研发交付团队，并将云管理服务（MSP）业务从 0 规模化打造至 $2M ARR。'
    ],
    pillars: [
      {
        title: ['0-to-1 Cloud CoE Organization Builder (0 → 30 Engineers)', '从 0 到 1 创立 Cloud CoE 并组建 30 人精英团队'],
        body: [
          'Recruited, mentored, and structured a full-lifecycle Cloud Center of Excellence (0 → 30 cloud architects, DevOps engineers, and platform developers), establishing standardized architecture review boards, IaC automation pipelines, and hybrid-cloud delivery playbooks.',
          '从零招募、培养并搭建覆盖售前咨询、云原生架构、DevOps 自动化与平台研发的 30 人 Cloud CoE 团队，建立标准化架构评审（ARB）、IaC 自动化交付管线与混合云实施方法论。'
        ]
      },
      {
        title: ['Hyperscaler Competency Trailblazer (Foundation for 1st GenAI & MSSP)', '大中华区核心能力认证破局者（奠定首个 GenAI 与 MSSP 基石）'],
        body: [
          'Led the technical audits and customer case validations to earn AWS Security, MSP, Data Analytics, and SAP Competencies—laying the engineering and operational foundation for achieving Greater China’s 1st GenAI Competency and MSSP Competency.',
          '带队通过严苛的国际第三方技术审计与生产案例核验，斩获 AWS Security、MSP、Data Analytics、SAP 等核心能力认证，为团队后续率先拿下大中华区首个 GenAI 能力认证与 MSSP 安全托管认证奠定坚实技术底座。'
        ]
      },
      {
        title: ['0-to-1 Managed Cloud Business ($0 → $2M ARR) & Multi-Cloud Platform', '从 0 到 $2M ARR 云管业务破局与自研多云管理平台'],
        body: [
          'Built and scaled ECCOM’s MSP managed cloud business from $0 to $2M ARR with differentiated enterprise GTM, a 3-tier 24x7 SLA operating model, and an in-house Multi-Cloud Unified Management Platform honored with ECCOM Solution of the Year 2018 (and Staff of the Year 2019).',
          '通过差异化企业级 GTM 策略、三线 7×24 SLA 运维体系及自主研发的「多云统一管理平台」，将 MSP 云托管业务从 0 增长至 $2M ARR；自研平台荣获公司 2018 年度最佳解决方案奖，个人获评 2019 年度优秀员工。'
        ]
      }
    ]
  },
  {
    id: 'era-cisco',
    featured: false,
    company: ['Cisco Systems R&D Center', '思科中国研发中心 (Cisco Systems R&D)'],
    role: [
      'System Engineer · Tech Lead (Cable on SD-WAN)',
      '系统工程师 · 技术负责人 (Tech Lead — Cable on SD-WAN)'
    ],
    period: ['2012 — 2015 · Shanghai', '2012 — 2015 · 上海'],
    summary: [
      'Tech Lead for Cable on SD-WAN at Cisco China R&D Center, leading cross-region Agile engineering teams on carrier-grade edge routing and Tier-3 global customer escalations.',
      '担任思科中国研发中心 Cable on SD-WAN 技术负责人（Tech Lead），带领跨国敏捷研发团队攻关电信级边缘路由协议与全球顶级运营商/跨国企业三线疑难排障。'
    ],
    pillars: [
      {
        title: ['Tech Lead for Cable on SD-WAN & Cross-Region Agile R&D', 'Cable on SD-WAN 技术负责人与跨区域敏捷研发'],
        body: [
          'Led architecture, feature integration, and automated system verification for Cable on SD-WAN across Shanghai and US engineering teams, ensuring carrier-grade high availability and deterministic QoS under high-scale WAN topologies.',
          '主导思科 Cable on SD-WAN 核心特性的系统架构设计、跨国研发联调与自动化系统测试验证，保障大规模广域网拓扑下的电信级高可用与确定性服务质量（QoS）。'
        ]
      },
      {
        title: ['Global Tier-3 Escalations & 3x Cisco Achievement Program Award', '全球顶级客户三线攻坚与 3 次思科成就奖'],
        body: [
          'Resolved mission-critical Tier-3 production network escalations for global Tier-1 service providers and Fortune 500 enterprises; recognized three times with the Cisco Achievement Program (CAP) Award while earning triple CCIE certifications (R&S, Service Provider, Data Center).',
          '深度参与全球 Tier-1 运营商与世界 500 强客户生产网核心故障三线攻坚（Tier-3 Escalation），连续三次荣获思科成就奖（Cisco Achievement Program Award），并在此期间考取路由交换、运营商与数据中心三项 CCIE 专家认证。'
        ]
      }
    ]
  }
];

const MS_CERTS = [
  {
    code: 'AB-100',
    title: [
      'Microsoft Certified: Agentic AI Business Solutions Architect Expert',
      'Microsoft Certified: Agentic AI Business Solutions Architect Expert（Agentic AI 业务解决方案架构师专家）'
    ],
    domain: ['FTE Milestone 1 · Expert Architecture', 'FTE 里程碑 1 · 专家级业务与智能体架构'],
    desc: [
      'Validates CxO-level AI transformation value framing, multi-agent business process redesign, Microsoft IQ (Work IQ / Fabric IQ / Foundry IQ) grounding, ROI governance, and MCEM enterprise adoption.',
      '验证面向企业高管的 AI 业务价值重构、跨系统多智能体流程设计、Microsoft IQ（Work IQ / Fabric IQ / Foundry IQ）知识接地、ROI 治理与 MCEM 全生命周期落地能力。'
    ],
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect-expert/'
  },
  {
    code: 'AI-103',
    title: [
      'Microsoft Certified: Azure AI Apps and Agents Developer Associate',
      'Microsoft Certified: Azure AI Apps and Agents Developer Associate（Azure AI 应用与智能体开发工程师）'
    ],
    domain: ['FTE Milestone 1 · Pro-Code Agent Engineering', 'FTE 里程碑 1 · Pro-Code 智能体应用研发'],
    desc: [
      'Validates building, evaluating, and securing production AI apps and autonomous multi-agent workflows with Azure AI Foundry, Microsoft Agent Framework, MCP tools, multimodal RAG, and OpenTelemetry tracing.',
      '验证基于 Azure AI Foundry、Microsoft Agent Framework、MCP 工具协议、多模态 RAG 与 OpenTelemetry 可观测性构建、评测和加固生产级 AI 应用与多智能体系统的工程能力。'
    ],
    url: 'https://learn.microsoft.com/en-us/credentials/browse/?credential_types=certification'
  },
  {
    code: 'GH-300',
    title: [
      'Microsoft Certified: GitHub Copilot',
      'Microsoft Certified: GitHub Copilot（GitHub Copilot 权威认证）'
    ],
    domain: ['FTE Milestone 1 · Hypervelocity Engineering (HVE)', 'FTE 里程碑 1 · 超高速工程 (HVE) 与 AI 辅助研发'],
    desc: [
      'Validates AI-native software engineering, custom instructions/skills, coding agents, spec-driven RPI (Research-Plan-Implement) workflows, and enterprise GitHub Copilot governance.',
      '验证 AI 原生软件工程方法、自定义指令与 Skill 编排、Coding Agent 协同开发、规格驱动 RPI（研究-规划-实现）闭环以及企业级 GitHub Copilot 安全治理。'
    ],
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/'
  }
];

function renderCareerCard(era, zh, compact = false) {
  const pillars = compact ? era.pillars.slice(0, 2) : era.pillars;
  return `<article class="career-card${era.featured ? ' career-featured' : ''}" id="${era.id}">
    <div class="career-head">
      <div>
        <div class="career-company">${ui.esc(ui.text(era.company, zh))}</div>
        <div class="career-role">${ui.esc(ui.text(era.role, zh))}</div>
      </div>
      <span class="career-period">${ui.esc(ui.text(era.period, zh))}</span>
    </div>
    <p class="wb-desc" style="margin-top:14px;margin-bottom:0">${ui.esc(ui.text(era.summary, zh))}</p>
    <div class="career-pillars">
      ${pillars
        .map(
          p => `<div class="career-pillar">
        <h4>${ui.esc(ui.text(p.title, zh))}</h4>
        <p>${ui.esc(ui.text(p.body, zh))}</p>
      </div>`
        )
        .join('')}
    </div>
  </article>`;
}

function renderMsCertBanner(file, zh) {
  return `<div class="cert-banner">
    ${MS_CERTS.map(
      c => `<article class="cert-hero-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
        <span class="cert-code">${ui.esc(c.code)}</span>
        <span class="wb-id">${ui.esc(ui.text(c.domain, zh))}</span>
      </div>
      <h3>${ui.esc(ui.text(c.title, zh))}</h3>
      <p>${ui.esc(ui.text(c.desc, zh))}</p>
      <div class="wb-links" style="margin-top:auto">
        <a class="wb-action" href="${ui.esc(c.url)}">${t(zh, 'Official Microsoft Credential', '查看微软官方认证说明')}<span aria-hidden="true"> ↗</span></a>
        <a href="${ui.href(file, zh ? 'zh-fte.html#learning-path' : 'fte.html#learning-path')}">${t(zh, 'FTE Path Milestone 1', '对应 FTE 学习路径')}<span aria-hidden="true"> ↗</span></a>
      </div>
    </article>`
    ).join('')}
  </div>`;
}

function renderAboutPage(file, zh) {
  const fteUrl = zh ? 'zh-fte.html' : 'fte.html';
  const careerUrl = zh ? 'zh-career.html' : 'career.html';
  const skillsUrl = zh ? 'zh-skills.html' : 'skills.html';
  const studioUrl = `studio/${zh ? 'zh-' : ''}index.html`;
  const diamondUrl = zh ? 'zh-diamond.html' : 'diamond.html';

  let body = ui.crumb(file, zh, 'Frontier Transformation Engineer');
  body += `<span id="about"></span><section class="page-hero">
    <div>
      <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${t(
        zh,
        'FRONTIER TRANSFORMATION ENGINEER · SR. AI SOLUTION ARCHITECT · MICROSOFT GCPS',
        'FRONTIER TRANSFORMATION ENGINEER · 资深 AI 解决方案架构师 · 微软大中华区战略解决方案合作伙伴 (GCPS)'
      )}</p>
      <h1>${t(
        zh,
        'Qi Chen — Frontier Transformation Engineer & Production Agentic AI Builder',
        '陈琪 (Qi Chen) — Frontier Transformation Engineer 与生产级智能体架构师'
      )}</h1>
      <p class="lead">${t(
        zh,
        '14+ years architecting and scaling enterprise cloud, network, security, and Agentic AI systems across Microsoft, AWS (Lead of Strategic Partner Solutions), ECCOM (0-to-1 Team & Cloud CoE Builder), and Cisco Systems R&D Center.',
        '拥有 14+ 年跨国云厂商、核心研发中心与头部系统集成商实战经验：横跨微软（Microsoft GCPS）、亚马逊云科技（AWS 战略合作伙伴解决方案负责人）、华讯网络（从 0 到 1 组建 30 人团队与 Cloud CoE）及思科中国研发中心（SD-WAN Tech Lead）。'
      )}</p>
      <blockquote class="profile-quote">
        “${t(
          zh,
          'Build and scale production-grade AI agent systems that work in real-world scenarios.',
          '构建并规模化可在真实场景中跑通的生产级 AI 智能体（Agent）系统。'
        )}”
        <small>${t(
          zh,
          'Core Engineering Mission · Business Consulting × Cross-Stack Agentic Engineering × Governed Production Scale',
          '核心工程理念 · 业务价值咨询 × 跨栈智能体工程 × 可信合规规模化落地'
        )}</small>
      </blockquote>
      <div class="actions">
        <a class="button primary" href="${ui.href(file, fteUrl)}">${t(
    zh,
    'What is FTE · Learning Path & Registration',
    '什么是 FTE · 官方学习路径与注册入口'
  )} ↗</a>
        <a class="button diamond-cta" href="#career">${t(
          zh,
          'Career Trajectory (Microsoft · AWS · ECCOM · Cisco)',
          '四大核心履历（微软 · AWS · 华讯 · 思科）'
        )} ↓</a>
        <a class="button" href="#skills">${t(
          zh,
          'Certifications (AB-100 · AI-103 · GH-300)',
          '微软新认证（AB-100 · AI-103 · GH-300）'
        )} ↓</a>
        <a class="button" href="https://github.com/turbo998">GitHub @turbo998 ↗</a>
      </div>
    </div>
    <aside class="hero-callout profile-hero-aside">
      <div class="profile-identity-row">
        <img class="profile-avatar" src="${ui.href(file, 'assets/photo.jpg')}" width="76" height="76" alt="${t(
    zh,
    'Portrait of Qi Chen',
    '陈琪 (Qi Chen) 头像'
  )}">
        <div>
          <div class="profile-meta-name">${t(zh, 'Qi Chen (@turbo998)', '陈琪 · Qi Chen')}</div>
          <div class="profile-meta-role">Frontier Transformation Engineer<br>${t(
            zh,
            'Shanghai · 25% Singapore · Tongji M.Eng.',
            '上海（25% 新加坡）· 同济大学工学硕士'
          )}</div>
        </div>
      </div>
      <p>${t(
        zh,
        'Certified across Microsoft Frontier AI (AB-100, AI-103, GH-300), AWS ×5, CISSP, PMP, and CCIE ×3. Author of 2 cloud/big-data books and 6 official cloud architecture blogs.',
        '持有微软 Frontier AI 三大核心认证（AB-100、AI-103、GH-300）、AWS 5 项专家/专项认证、CISSP、PMP 及思科 CCIE 三认证；出版云计算与大数据专著 2 部。'
      )}</p>
      <a class="text-link" href="${ui.href(file, studioUrl)}">${t(
    zh,
    'Explore 8-Track Engineering Hub',
    '进入八大工程赛道工作台'
  )} →</a>
    </aside>
  </section>`;

  body += profileSubnav(file, zh, 'about');

  const kpis = [
    ['14+ yrs', ['Microsoft · AWS · ECCOM · Cisco', '微软 · AWS · 华讯 · 思科'], ['R&D + Cloud CoE + Strategic Partner GTM', '核心研发 + 0到1建团队 + 战略生态']],
    ['30+ / 10+', ['Agentic Offerings / Prod Wins', '智能体联合方案 / 生产标杆'], ['153 designs across 13 industries · $10M+ ACR', '13 大行业 153 套设计 · $10M+ ACR']],
    ['$28M+', ['AWS Partner Portfolio Scope', 'AWS 战略伙伴与金融生态规模'], ['Lead of Strategic Partner Solutions · 1,000+ SAs', '战略伙伴方案负责人 · 赋能千名 SA']],
    ['0 → 30', ['ECCOM Cloud CoE Built from Scratch', '华讯 Cloud CoE 从零到一组建'], ['$0 → $2M MSP ARR · GCR Competency Base', '0 到 $2M 云管 ARR · 多项能力认证']],
    ['15+', ['Global Technical Certifications', '全球权威架构与安全认证'], ['AB-100 · AI-103 · GH-300 · AWS×5 · CISSP · CCIE×3', 'AB-100 · AI-103 · GH-300 · AWS×5 · CISSP · CCIE×3']]
  ];
  body += `<section class="telemetry-strip" aria-label="${t(zh, 'Career impact metrics', '核心履历量化指标')}">${kpis
    .map(
      ([val, label, scope]) =>
        `<div class="telemetry-cell"><strong>${ui.esc(val)}</strong><span>${ui.esc(ui.text(label, zh))}</span><small>${ui.esc(
          ui.text(scope, zh)
        )}</small></div>`
    )
    .join('')}</section>`;

  body += knowledgeFigure(file, zh, {
    topic: 'general',
    title: [
      'Qi Chen · 14-Year Frontier Transformation & Full-Stack Engineering Trajectory',
      '陈琪 (Qi Chen) · 14 年全栈云网安全与 Frontier Transformation 演进图谱'
    ],
    concepts: [
      node(
        ['Cisco R&D Core (2012–2015)', '思科中国研发中心 (2012–2015)'],
        ['Cable on SD-WAN Tech Lead · Global Tier-3 · CCIE ×3', 'Cable on SD-WAN 负责人 · 全球三线攻坚 · CCIE ×3'],
        ['builds 0-to-1 Cloud CoE', '沉淀系统工程底座']
      ),
      node(
        ['ECCOM 0-to-1 Cloud CoE (2015–2020)', '华讯网络从 0 到 1 建团队 (2015–2020)'],
        ['0 → 30 engineers · $0 → $2M MSP ARR · AWS Competencies', '0→30 人 Cloud CoE · $2M ARR · 核心能力认证'],
        ['scales hyperscaler ecosystem', '升级云厂商战略生态']
      ),
      node(
        ['AWS Strategic Partner Lead (2020–2025)', 'AWS 战略伙伴方案负责人 (2020–2025)'],
        ['G2C / C2G / C2C · $16M+ FSI ARR · $28M SPP · GenAI', 'G2C / 出海 C2G · 金融行业负责人 · 千名 SA 赋能'],
        ['drives Frontier AI transformation', '迈入智能体前沿转型']
      ),
      node(
        ['Microsoft FTE & GCPS AI SA (2025–Now)', '微软 FTE 与资深 AI 架构师 (2025–至今)'],
        ['30+ Offerings · 45+ Hackathon Agents · HVE · $10M+ ACR', '30+ 智能体方案 · 45+ 黑客松辅导 · HVE · $10M+ ACR'],
        ['validated by credentials & code', '权威认证与开源闭环']
      ),
      node(
        ['Verified Credentials & Live Assets', '微软三大新认证与开源资产'],
        ['AB-100 · AI-103 · GH-300 · CISSP · 8 Live Labs', 'AB-100 · AI-103 · GH-300 · CISSP · 八大实证工作台'],
        null
      )
    ]
  });

  body += `<section id="fte" class="section">
    <div class="fte-spotlight">
      <div>
        <p class="eyebrow">01 / ROLE EVOLUTION · FRONTIER TRANSFORMATION ENGINEER (FTE)</p>
        <h3>${t(
          zh,
          'Why "Frontier Transformation Engineer" Replaces Traditional Single-Stack Architecture',
          '为什么将角色定位升级为「Frontier Transformation Engineer」？'
        )}</h3>
        <p>${t(
          zh,
          'In the Agentic AI era, enterprises no longer need isolated slide-deck advisories or single-product PoCs. A Frontier Transformation Engineer (FTE) fuses Business Consulting, Cross-Stack Agentic Engineering (Work IQ · Fabric IQ · Foundry IQ · GitHub Copilot & HVE), and Zero-Trust Governance (Entra Agent ID · Agent 365) to take 3 production agents live in a 4–6 week sprint.',
          '在智能体（Agentic AI）时代，企业需要的不再是单一产品的拼装或停留在 PPT 上的顶层规划。Frontier Transformation Engineer（前沿转型工程师，FTE）将「业务价值咨询 + 跨栈智能体工程（Microsoft IQ · GitHub Copilot & HVE）+ 零信任治理（Entra Agent ID · Agent 365）」融为一体，在 4–6 周敏捷冲刺内交付可度量的生产级智能体闭环。'
        )}</p>
      </div>
      <div class="actions" style="margin-top:0">
        <a class="button primary" href="${ui.href(file, fteUrl)}">${t(
    zh,
    'Open Full FTE Panorama & ~86h Path',
    '查看 FTE 一页式全景说明与 ~86 小时学习路径'
  )} ↗</a>
        <a class="button diamond-cta" href="https://skillupwithlevelup.com/enroll-journey/35">${t(
          zh,
          'Enroll in Official FTE Journey #35',
          '直达官方 FTE 学习旅程注册 (#35)'
        )} ↗</a>
        <a class="button" href="https://skillupwithlevelup.com/frontier">${t(
          zh,
          'Official LevelUp FTE Portal',
          '访问微软 LevelUp FTE 官方门户'
        )} ↗</a>
      </div>
    </div>
  </section>`;

  body += ui.section(
    'career',
    '02 / FOUR-COMPANY CAREER TRAJECTORY',
    t(
      zh,
      'Microsoft · AWS Lead of Strategic Partner Solutions · ECCOM 0-to-1 Cloud CoE · Cisco R&D',
      '四大阶段核心履历：微软 GCPS · AWS 战略伙伴方案负责人 · 华讯 0 到 1 组建 Cloud CoE · 思科研发中心'
    ),
    t(
      zh,
      'Combining hyperscaler strategic partner leadership with hands-on 0-to-1 engineering team building, R&D systems depth, and quantified enterprise GTM execution.',
      '兼具国际顶级云厂商战略伙伴生态领军视野、从零到一组建 30 人技术团队与 Cloud CoE 的实战管理经验，以及底层核心网络研发功底。'
    ),
    `<div class="career-stack">${CAREER_ERAS.map(era => renderCareerCard(era, zh, false)).join('')}</div>
     <div class="actions"><a class="button primary" href="${ui.href(file, careerUrl)}">${t(
      zh,
      'Open Dedicated Career & Awards Ledger',
      '打开独立完整版职业履历、教育背景与荣誉页'
    )} ↗</a></div>`
  );

  const certGroupCards = [
    ui.card(file, zh, {
      id: 'cert-aws',
      number: 'AWS × 5',
      badge: ['MULTI-CLOUD ARCHITECTURE & ML', '多云架构与机器学习认证'],
      title: ['AWS Certified × 5 (Professional & Specialty)', '亚马逊云科技 5 项专业级与专项认证'],
      finding: [
        'SA Pro · DevOps Pro · ML Specialty · Security Specialty · Big Data Specialty',
        '架构师专业级 · DevOps 专业级 · 机器学习 · 安全专项 · 大数据专项'
      ],
      description: [
        'Full-spectrum hyperscaler architecture validation spanning distributed cloud design, MLOps/GenAI model serving, cloud security compliance, petabyte-scale analytics, and CI/CD automation.',
        '全面覆盖大型分布式云架构设计、机器学习与大模型工程化、云安全治理、PB 级数据分析与 DevOps 持续交付管线。'
      ],
      links: [
        {label: ['All Certifications & Stack', '查看完整认证与技能栈'], url: skillsUrl}
      ]
    }),
    ui.card(file, zh, {
      id: 'cert-sec-net',
      number: 'CISSP · PMP · CCIE×3',
      badge: ['SECURITY · GOVERNANCE · CORE INFRA', '安全治理 · 项目管理 · 核心网络'],
      title: ['CISSP · PMP · Triple CCIE · Red Hat OpenStack', 'CISSP · PMP · 思科三料 CCIE · 红帽 OpenStack'],
      finding: [
        'CCIE (R&S · Service Provider · Data Center) + CISSP Zero-Trust + PMP',
        'CCIE（路由交换 · 运营商 · 数据中心）+ CISSP 安全专家 + PMP'
      ],
      description: [
        'Rare cross-layer depth from carrier-grade WAN/data-center fabrics and private OpenStack clouds up to CISSP enterprise security governance and complex multi-partner program delivery.',
        '打通从运营商广域网、超大规模数据中心网络、OpenStack 私有云底座到 CISSP 企业信息安全架构与 PMP 大型复杂项目群治理的全栈纵深。'
      ],
      links: [
        {label: ['Security Landing Zone Track', '访问 AI 安全着陆区专栏'], url: `studio/${zh ? 'zh-' : ''}security.html`}
      ]
    }),
    ui.card(file, zh, {
      id: 'cert-books-blogs',
      number: '2 BOOKS · 6 BLOGS',
      badge: ['PUBLISHED AUTHOR & THOUGHT LEADERSHIP', '出版专著与官方技术博客'],
      title: ['2 Published Technical Books & 6 Official Cloud Architecture Blogs', '出版 2 部云计算/大数据技术专著 · 发表 6 篇官方架构博客'],
      finding: [
        'Cloud Computing (ISBN 978-7-121-27576-0) · Big Data (ISBN 978-7-121-33952-3)',
        '《云计算：规划、部署与运维》·《大数据：规划、部署与运维》（电子工业出版社）'
      ],
      description: [
        'Co-authored two enterprise infrastructure books published by Publishing House of Electronics Industry, plus 6 production GenAI & partner architecture articles on the AWS China Official Blog; M.Eng. & B.E. from Tongji University.',
        '合著出版两部企业级规划部署专著（电子工业出版社），在云厂商官方博客发表 6 篇生成式 AI 与行业伙伴落地实践；本科及硕士均毕业于同济大学。'
      ],
      links: [
        {label: ['Publications & Credentials Detail', '查看专著 ISBN 与完整证书清单'], url: skillsUrl}
      ]
    })
  ];

  body += `<span id="certifications"></span>` + ui.section(
    'skills',
    '03 / MICROSOFT FRONTIER AI CERTIFICATIONS & MULTI-CLOUD CREDENTIALS',
    t(
      zh,
      'Featured Microsoft Certifications (AB-100 · AI-103 · GH-300) & 15+ Industry Credentials',
      '新增微软三大 Frontier AI 权威认证（AB-100 · AI-103 · GH-300）与全栈资质体系'
    ),
    t(
      zh,
      'Aligned directly with Milestone 1 of the official Microsoft Frontier Transformation Engineer (FTE) credential framework, backed by multi-cloud, security, and triple-CCIE engineering depth.',
      '完整覆盖微软官方 Frontier Transformation Engineer (FTE) 认证体系三大必修科目（AB-100、AI-103、GH-300），并与 AWS 五证、CISSP、PMP、三料 CCIE 形成跨代际技术闭环。'
    ),
    renderMsCertBanner(file, zh) + ui.grid(certGroupCards)
  );

  const projectCards = [
    ui.card(file, zh, {
      id: 'proj-fte',
      featured: true,
      number: 'FTE-01',
      badge: ['FTE PANORAMA & REGISTRATION', 'FTE 全景说明与注册'],
      title: ['Frontier Transformation Engineer (FTE) Guide, ~86h Learning Path & Registration', 'Frontier Transformation Engineer (FTE) 全景解读、86 小时学习路径与注册入口'],
      finding: ['6 Capability Domains · 3 MS Exams · 6+2 LevelUp Courses · 6-Week FTE Offer Sprint', '六大跨栈能力域 · 三门认证 · 6+2 门实战课 · 6 周标准交付冲刺'],
      description: ['One-page executive and practitioner guide to the Microsoft Frontier Transformation program, Partner Center attribution steps, course/assessment links, and FDE vs. FTE model comparison.', '一页式梳理 Frontier Transformation 转型飞轮、Partner Center 账号绑定四步法、全部课程与测评直达链接，以及微软 FDE 与伙伴 FTE 协同对比。'],
      url: fteUrl,
      links: [
        {label: ['Open FTE Guide', '打开 FTE 介绍专页'], url: fteUrl},
        {label: ['Enroll Journey #35', '直达官方注册 (#35)'], url: 'https://skillupwithlevelup.com/enroll-journey/35'}
      ]
    }),
    ui.card(file, zh, {
      id: 'proj-diamond',
      featured: true,
      number: 'POC-02',
      badge: ['DIAMOND ENTERPRISE POCS', 'DIAMOND 企业级全真沙盘'],
      title: ['Diamond Live Demos: TCL × Microsoft Fabric & Zava × Azure Databricks', 'Diamond 实战演示：TCL × Microsoft Fabric 与 Zava × Databricks 双湖仓驾驶舱'],
      finding: ['Entra ID OBO · OneLake Zero-Copy Mirroring · Copilot Closed-Loop Write-Back', '单租户身份传递 · OneLake 零拷贝共生 · Copilot 业务决策回写'],
      description: ['Production-style Solution Architect PoC cockpits demonstrating multi-agent analytics, DAX/KQL/SQL verification, and cross-platform lakehouse coexistence.', '面向企业架构选型与高管汇报的两套全真交互沙盘，完整呈现从实时流摄取、双湖仓零拷贝到一线业务止损闭环。'],
      url: diamondUrl,
      links: [
        {label: ['Open Diamond Center', '进入 Diamond 演示中心'], url: diamondUrl},
        {label: ['Engineering Hub', '工程枢纽总览'], url: studioUrl}
      ]
    }),
    ui.card(file, zh, {
      id: 'proj-hve',
      number: 'HVE-03',
      badge: ['HARNESS ENGINEERING & BOOTCAMP', 'HARNESS 工程与训练营'],
      title: ['Copilot & HVE-Core Engineering Workshop + Agent Harness Co-Evolution', 'GitHub Copilot & HVE-Core 实战工作坊与 Agent Harness 协同演进'],
      finding: ['8-Hour / 9-Module Curriculum · 10+ Workshops · 1,000+ Engineers Enabled', '8 小时 9 模块实战课程 · 10+ 场交付 · 赋能 1,000+ 开发者'],
      description: ['Open-source runbooks, RPI specification workflows, and multi-framework harness benchmarks used in the GCR Partner Frontier Transformation Bootcamp.', '配套微软大中华区合作伙伴 Frontier Transformation Bootcamp 实战讲义、可复现实验手册与主流 Harness 框架实测对比。'],
      url: `workshops/agent-harness-coevolution/index${zh ? '' : '.en'}.html`,
      links: [
        {label: ['Co-Evolution Workbench', '打开协同演进工作台'], url: `workshops/agent-harness-coevolution/index${zh ? '' : '.en'}.html`},
        {label: ['GitHub Workshop Repo', '访问 GitHub 课程仓库'], url: 'https://github.com/turbo998/Copilot-HVE-Engineering-Workshop'}
      ]
    })
  ];

  body += ui.section(
    'projects',
    '04 / REPRESENTATIVE ENGINEERING WORKBENCHES',
    t(zh, 'From Executive Architecture to Running Code', '从前沿转型方法论到可交互验证的工程资产'),
    t(
      zh,
      'Explore live workbenches, 7-Card benchmark decks, and open-source partner enablement kits directly in the browser.',
      '所有架构指南、7-Card 定量基准报告与企业级 PoC 沙盘均可直接在浏览器中交互核验。'
    ),
    ui.grid(projectCards)
  );

  return ui.shell(
    file,
    zh,
    t(
      zh,
      'Frontier Transformation Engineer · About Qi Chen',
      'Frontier Transformation Engineer · 关于陈琪 (Qi Chen)'
    ),
    body,
    {active: 5, context: false}
  );
}

function renderCareerPage(file, zh) {
  const aboutUrl = zh ? 'zh-about.html' : 'about.html';
  const skillsUrl = zh ? 'zh-skills.html' : 'skills.html';
  const fteUrl = zh ? 'zh-fte.html' : 'fte.html';

  let body = ui.crumb(file, zh, t(zh, 'Career Trajectory', '职业履历'));
  body += `<section class="page-hero">
    <div>
      <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${t(
        zh,
        'CAREER LEDGER (2012 — PRESENT) · MICROSOFT · AWS · ECCOM · CISCO R&D',
        '职业履历全览 (2012 — 至今) · 微软 · 亚马逊云科技 · 华讯网络 · 思科研发中心'
      )}</p>
      <h1>${t(
        zh,
        '14+ Years Building Cloud CoEs, Strategic Partner Ecosystems & Production AI Agents',
        '十四年跨栈演进：从核心网研发、0 到 1 组建 Cloud CoE 到微软与 AWS 战略生态领军'
      )}</h1>
      <p class="lead">${t(
        zh,
        'Every role anchored on measurable engineering & commercial outcomes: carrier-grade SD-WAN R&D at Cisco, building a 30-person Cloud CoE and $2M MSP business from 0 to 1 at ECCOM, leading Strategic Partner Solutions & $16M+/$28M FSI ecosystems at AWS, and driving Agentic AI & Frontier Transformation at Microsoft.',
        '每一段履历均以可验证的技术突破与商业结果为锚点：在思科研发中心锤炼电信级 SD-WAN 系统工程，在华讯网络从零组建 30 人 Cloud CoE 团队并跑通 $2M ARR 云管业务，在 AWS 统领战略合作伙伴解决方案与大中华区金融生态，在微软引领 Agentic AI 与 Frontier Transformation 规模化落地。'
      )}</p>
      <div class="actions">
        <a class="button primary" href="${ui.href(file, fteUrl)}">${t(
    zh,
    'What is a Frontier Transformation Engineer (FTE)?',
    '了解 Frontier Transformation Engineer (FTE) 体系'
  )} ↗</a>
        <a class="button diamond-cta" href="${ui.href(file, skillsUrl)}">${t(
          zh,
          'View Certifications (AB-100 · AI-103 · GH-300)',
          '查看权威认证（AB-100 · AI-103 · GH-300）'
        )} ↗</a>
        <a class="button" href="${ui.href(file, aboutUrl)}">${t(zh, 'Back to Executive Bio', '返回个人简介总览')}</a>
      </div>
    </div>
    <aside class="hero-callout">
      <p class="eyebrow">${t(zh, 'FOUR DEFINING PILLARS', '四大标志性职业标签')}</p>
      <strong>Microsoft FTE.<br>AWS Partner Lead.<br>0→1 Cloud CoE.<br>Cisco R&amp;D.</strong>
      <p>${t(
        zh,
        'Bridging CxO business value discovery, hands-on multi-agent harness engineering, zero-trust compliance, and partner GTM scale.',
        '贯通高管业务咨询、Pro-Code 智能体研发、跨境安全合规与合作伙伴 GTM 商业变现闭环。'
      )}</p>
      <a class="text-link" href="#awards">${t(zh, 'Jump to Education & Industry Awards', '查看同济本硕学历与历年荣誉奖项')} ↓</a>
    </aside>
  </section>`;

  body += profileSubnav(file, zh, 'career');

  body += knowledgeFigure(file, zh, {
    topic: 'general',
    title: [
      'Four-Stage Architectural & Leadership Progression (2012 – 2026+)',
      '四阶段架构视野与团队/生态领导力演进图谱（2012 – 2026+）'
    ],
    concepts: [
      node(
        ['2012–2015 · Cisco Systems R&D', '2012–2015 · 思科中国研发中心'],
        ['Cable on SD-WAN Tech Lead · Agile R&D · 3x CAP Award', 'Cable on SD-WAN 负责人 · 跨国研发 · 3次成就奖'],
        ['evolves from R&D to 0→1 builder', '从核心研发走向团队创业']
      ),
      node(
        ['2015–2020 · ECCOM Cloud CoE', '2015–2020 · 华讯网络 Cloud CoE'],
        ['Built 0 → 30 team · $0 → $2M ARR · 4 AWS Competencies', '从0到1建30人团队 · $2M ARR · 多项能力认证'],
        ['scales to GCR strategic partners', '跃升云厂商战略生态']
      ),
      node(
        ['2020–2025.11 · AWS GCR Lead', '2020–2025.11 · AWS 战略伙伴方案负责人'],
        ['Lead of Strategic Partner Solutions · $16M+ FSI · 1,000+ SAs', 'G2C/出海C2G方案负责人 · 金融生态 · 赋能千名SA'],
        ['pioneers Agentic AI & FTE', '全面引领智能体前沿转型']
      ),
      node(
        ['2025.11–Now · Microsoft GCPS', '2025.11–至今 · 微软 GCPS 资深架构师'],
        ['Frontier Transformation Engineer · 30+ Offerings · $10M+ ACR', 'FTE 导师 · 30+智能体方案 · 153行业设计 · $10M+ ACR'],
        null
      )
    ]
  });

  body += ui.section(
    'career',
    '01 / DETAILED EXPERIENCE & QUANTIFIED OUTCOMES',
    t(zh, 'Experience Across Microsoft, AWS, ECCOM & Cisco Systems', '微软 · 亚马逊云科技 · 华讯网络 · 思科中国研发中心 履历详述'),
    t(
      zh,
      'Detailed responsibilities, production architectures, and business outcomes across 14+ years of technology leadership.',
      '完整呈现各阶段的核心职责、代表性生产级架构项目、合作伙伴转型成果与量化业务指标。'
    ),
    `<div class="career-stack">${CAREER_ERAS.map(era => renderCareerCard(era, zh, false)).join('')}</div>`
  );

  const eduAwardCards = [
    ui.card(file, zh, {
      id: 'education-tongji',
      featured: true,
      number: '2005 — 2012',
      badge: ['ACADEMIC FOUNDATION', '本硕科班学术背景'],
      title: ['Tongji University — M.Eng. (2009–2012) & B.E. (2005–2009)', '同济大学 — 工学硕士（2009–2012）与工学学士（2005–2009）'],
      finding: ['7 Years of Engineering Training at Tongji University, Shanghai', '同济大学七年本硕连贯系统工程与通信/计算机学术训练'],
      description: [
        'Master of Engineering (2009–2012) and Bachelor of Engineering (2005–2009) from Tongji University, establishing a rigorous foundation in distributed systems, networking protocols, and quantitative modeling.',
        '2009–2012 获同济大学工学硕士学位，2005–2009 获同济大学工学学士学位，奠定扎实的分布式系统、网络通信协议与工程建模功底。'
      ],
      links: [{label: ['Certifications & Books', '查看技术认证与出版专著'], url: skillsUrl}]
    }),
    ui.card(file, zh, {
      id: 'awards-honors',
      featured: true,
      number: '7+ AWARDS',
      badge: ['RECOGNITION & HONORS', '历年核心荣誉奖项'],
      title: ['Hyperscaler, Integrator & R&D Excellence Awards (2013–2026)', '横跨云厂商、集成商与研发中心的卓越工程荣誉'],
      finding: [
        'AWS Solution Builder of the Year · AWS SA of the Quarter · ECCOM Solution/Staff of the Year · Cisco CAP ×3',
        'AWS 年度最佳方案构建者 · 季度最佳 SA · 华讯年度最佳方案/优秀员工 · 思科成就奖 ×3'
      ],
      description: [
        'Recognized consistently across every organization: GCR Partner Frontier Transformation Bootcamp Instructor (Microsoft, 2026); AWS SA of the Quarter (2023) & AWS Solution Builder of the Year (2022); ECCOM Staff of the Year (2019) & Solution of the Year (2018); 3× Cisco Achievement Program Award (2013–2015).',
        '在每一家任职机构均获核心表彰：微软大中华区 Frontier Transformation Bootcamp 实战导师（2026）；AWS 季度最佳架构师（2023）与年度 Solution Builder（2022）；华讯网络年度优秀员工（2019）与年度最佳解决方案奖（2018）；连续三次荣获思科成就奖（2013–2015）。'
      ],
      links: [{label: ['Explore FTE Bootcamp Path', '查看 FTE 训练营与学习路径'], url: fteUrl}]
    })
  ];

  body += ui.section(
    'awards',
    '02 / EDUCATION & INDUSTRY RECOGNITION',
    t(zh, 'Education & Honors', '教育背景与历年荣誉表彰'),
    t(zh, 'Academic credentials and engineering awards across R&D, Cloud CoE building, and strategic partner leadership.', '同济大学本硕学术背景及在思科、华讯网络、AWS 与微软期间获得的核心奖项与导师荣誉。'),
    ui.grid(eduAwardCards)
  );

  return ui.shell(
    file,
    zh,
    t(zh, 'Career Trajectory · Microsoft · AWS · ECCOM · Cisco', '职业履历 · 微软 · AWS · 华讯 · 思科'),
    body,
    {active: 5, context: false}
  );
}

function renderSkillsPage(file, zh) {
  const fteUrl = zh ? 'zh-fte.html' : 'fte.html';
  const careerUrl = zh ? 'zh-career.html' : 'career.html';

  let body = ui.crumb(file, zh, t(zh, 'Certifications & Publications', '技术认证与出版著作'));
  body += `<section class="page-hero">
    <div>
      <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${t(
        zh,
        'CREDENTIALS & PUBLICATIONS · AB-100 · AI-103 · GH-300 · AWS ×5 · CISSP · PMP · CCIE ×3',
        '权威技术认证与著作 · AB-100 · AI-103 · GH-300 · AWS ×5 · CISSP · PMP · CCIE ×3'
      )}</p>
      <h1>${t(
        zh,
        'Microsoft Frontier AI Certifications (AB-100 · AI-103 · GH-300), Multi-Cloud Credentials & Books',
        '微软三大 Frontier AI 认证（AB-100 · AI-103 · GH-300）、多云安全资质与技术专著'
      )}</h1>
      <p class="lead">${t(
        zh,
        'Verified across all 3 Microsoft Frontier Transformation Engineer (FTE) certifications—Agentic AI Business Solutions Architect Expert (AB-100), Azure AI Apps & Agents Developer (AI-103), and GitHub Copilot (GH-300)—complemented by 5 AWS certifications, CISSP, PMP, triple CCIE, Red Hat OpenStack, 2 published books, and 6 official cloud architecture blogs.',
        '完整持有微软 Frontier Transformation Engineer (FTE) 全部三项核心认证——AB-100（Agentic AI 业务解决方案架构师专家）、AI-103（Azure AI 应用与智能体开发）与 GH-300（GitHub Copilot），并叠加 AWS 5 项专业/专项认证、CISSP、PMP、思科三料 CCIE、红帽 OpenStack、2 部出版专著与 6 篇官方技术博客。'
      )}</p>
      <div class="actions">
        <a class="button primary" href="${ui.href(file, fteUrl)}#learning-path">${t(
    zh,
    'See How AB-100 / AI-103 / GH-300 Map to FTE Badge',
    '查看 AB-100 / AI-103 / GH-300 对应的 FTE 认证路径'
  )} ↗</a>
        <a class="button diamond-cta" href="${ui.href(file, careerUrl)}">${t(
          zh,
          'View 14-Year Career Ledger',
          '查看 14 年四大阶段履历'
        )} ↗</a>
      </div>
    </div>
    <aside class="hero-callout">
      <p class="eyebrow">${t(zh, 'CREDENTIAL PORTFOLIO', '认证矩阵总览')}</p>
      <strong>3× Microsoft AI.<br>5× AWS Cloud.<br>CISSP · PMP.<br>3× Cisco CCIE.</strong>
      <p>${t(
        zh,
        'End-to-end verification from AI agent architecture and hypervelocity coding down to zero-trust security and carrier-grade infrastructure.',
        '从顶层 Agentic 业务架构、超高速 AI 研发到零信任安全治理与底层云网基础设施的全栈权威背书。'
      )}</p>
    </aside>
  </section>`;

  body += profileSubnav(file, zh, 'skills');

  body += knowledgeFigure(file, zh, {
    topic: 'general',
    title: [
      'Cross-Stack Credential & Capability Architecture',
      '跨栈技术认证与全生命周期工程能力矩阵'
    ],
    concepts: [
      node(
        ['Agentic Business Architecture', 'Agentic 业务架构设计'],
        ['Microsoft AB-100 Expert · Industry Playbooks · PMP', '微软 AB-100 专家认证 · 13行业蓝图 · PMP'],
        ['specifies pro-code agents', '定义智能体工程契约']
      ),
      node(
        ['AI Apps, Agents & RAG', '智能体研发与多模态知识'],
        ['Microsoft AI-103 · Foundry · LangGraph · AWS ML', '微软 AI-103 · Foundry · LangGraph · AWS ML'],
        ['accelerated via HVE harness', '通过 HVE 超高速交付']
      ),
      node(
        ['Hypervelocity Coding & Harness', 'AI 原生编码与 Harness'],
        ['Microsoft GH-300 GitHub Copilot · HVE-Core · AWS DevOps', '微软 GH-300 · HVE-Core · AWS DevOps Pro'],
        ['secured by zero-trust gates', '纳入零信任合规治理']
      ),
      node(
        ['Security, Identity & Compliance', '零信任安全与跨境合规'],
        ['CISSP · AWS Security · Entra Agent ID · Agent 365', 'CISSP · AWS 安全专项 · Entra Agent ID · 等保/CBDT'],
        ['runs on resilient cloud infra', '承载于高可靠云网底座']
      ),
      node(
        ['Multi-Cloud, Data & Network Core', '多云湖仓与核心网络底座'],
        ['AWS SA Pro & Big Data · CCIE ×3 (R&S/SP/DC) · OpenStack', 'AWS 架构/大数据 · 三料 CCIE · 红帽 OpenStack'],
        null
      )
    ]
  });

  body += ui.section(
    'microsoft-certs',
    '01 / MICROSOFT FRONTIER AI & FTE CERTIFICATIONS',
    t(
      zh,
      'Microsoft Certified: AB-100 · AI-103 · GH-300 (FTE Milestone 1 Complete)',
      '微软 Frontier AI 核心认证组合：AB-100 · AI-103 · GH-300'
    ),
    t(
      zh,
      'The three foundational credentials powering the Microsoft Frontier Transformation Engineer (FTE) role across business architecture, pro-code agent building, and AI-assisted software engineering.',
      '构成微软 Frontier Transformation Engineer (FTE) 角色基石的三大核心认证，分别对应业务解决方案架构、Azure AI 智能体应用研发与 GitHub Copilot 超高速工程。'
    ),
    renderMsCertBanner(file, zh)
  );

  const matrixHtml = `<div class="diamond-matrix-wrap">
    <table class="diamond-matrix">
      <thead>
        <tr>
          <th>${t(zh, 'CATEGORY / VENDOR', '认证类别 / 颁发机构')}</th>
          <th>${t(zh, 'CREDENTIAL CODE & OFFICIAL TITLE', '证书代码与官方名称')}</th>
          <th>${t(zh, 'ARCHITECTURAL DOMAIN & PRODUCTION APPLICATION', '对应架构领域与生产实战应用')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Microsoft Frontier AI (×3)</strong></td>
          <td><strong>AB-100</strong> · Agentic AI Business Solutions Architect Expert<br><strong>AI-103</strong> · Azure AI Apps and Agents Developer Associate<br><strong>GH-300</strong> · Microsoft Certified: GitHub Copilot</td>
          <td>${t(
            zh,
            'CxO value discovery, Microsoft IQ (Work/Fabric/Foundry IQ), multi-agent orchestration, MCP tool integration, and HVE-Core / GitHub Copilot enterprise delivery.',
            '高管业务价值咨询、Microsoft IQ 全栈知识接地、多智能体编排、MCP 工具集成及 GitHub Copilot + HVE-Core 超高速研发落地。'
          )}</td>
        </tr>
        <tr>
          <td><strong>Amazon Web Services (×5)</strong></td>
          <td><strong>AWS Certified Solutions Architect – Professional</strong><br><strong>AWS Certified DevOps Engineer – Professional</strong><br><strong>AWS Certified Machine Learning – Specialty</strong><br><strong>AWS Certified Security – Specialty</strong><br><strong>AWS Certified Big Data – Specialty</strong></td>
          <td>${t(
            zh,
            'Multi-region Landing Zones, SageMaker / Bedrock GenAI serving, lakehouse & streaming pipelines, KMS/IAM zero-trust security, and automated IaC/CI-CD operations.',
            '跨区域企业级 Landing Zone、SageMaker / Bedrock 大模型推理与微调、湖仓流批一体数据平台、KMS/IAM 零信任安全与自动化运维。'
          )}</td>
        </tr>
        <tr>
          <td><strong>Security &amp; Governance (×2)</strong></td>
          <td><strong>CISSP</strong> · Certified Information Systems Security Professional (ISC2)<br><strong>PMP</strong> · Project Management Professional (PMI)</td>
          <td>${t(
            zh,
            'Enterprise threat modeling, cross-border data compliance (CBDT, EO 14117, MLPS 2.0), MSSP governance, and executive multi-stream transformation management.',
            '企业级威胁建模、跨国数据合规（CBDT、14117 法案、等保 2.0）、安全托管服务（MSSP）治理及大型战略转型项目群交付。'
          )}</td>
        </tr>
        <tr>
          <td><strong>Cisco &amp; Open Infrastructure (×4)</strong></td>
          <td><strong>CCIE ×3</strong> · Routing &amp; Switching, Service Provider, Data Center<br><strong>Red Hat Certified</strong> · OpenStack System Administrator</td>
          <td>${t(
            zh,
            'Carrier-grade SD-WAN, spine-leaf data-center fabrics, hybrid cloud direct-connect topologies, and private IaaS / Kubernetes cluster infrastructure.',
            '电信级广域网（SD-WAN）、数据中心 Spine-Leaf 无损网络、混合云专线互连架构与私有云 / Kubernetes 容器基础设施。'
          )}</td>
        </tr>
      </tbody>
    </table>
  </div>`;

  body += ui.section(
    'full-matrix',
    '02 / COMPLETE 14-CREDENTIAL MATRIX & FULL-STACK CAPABILITIES',
    t(zh, 'Complete Global Certification Ledger', '14+ 项全球权威认证完整台账'),
    t(zh, 'Spanning Agentic AI, hyperscaler cloud architecture, cybersecurity governance, and core network/data-center systems.', '横跨智能体与生成式 AI、双云架构与大数据、信息安全治理及核心路由/运营商/数据中心网络。'),
    matrixHtml
  );

  const pubCards = [
    ui.card(file, zh, {
      id: 'book-cloud',
      featured: true,
      number: 'ISBN 978-7-121-27576-0',
      badge: ['PUBLISHED BOOK · CLOUD', '出版专著 · 云计算'],
      title: ['Cloud Computing: Plan, Deploy and Operation', '《云计算：规划、部署与运维》'],
      finding: ['Publishing House of Electronics Industry (电子工业出版社 in CN catalog)', '电子工业出版社正式出版 · 企业级云平台全生命周期实战指南'],
      description: [
        'Enterprise practitioner book covering private/hybrid cloud architecture planning, compute/storage/network virtualization deployment, and 24x7 SLA production operations.',
        '系统阐述企业级私有云与混合云从顶层容量规划、计算存储网络虚拟化部署到生产环境 7×24 运维治理的实战方法论。'
      ],
      links: [{label: ['Career Context (ECCOM Cloud CoE)', '查看成书背景（华讯 Cloud CoE）'], url: `${careerUrl}#era-eccom`}]
    }),
    ui.card(file, zh, {
      id: 'book-bigdata',
      featured: true,
      number: 'ISBN 978-7-121-33952-3',
      badge: ['PUBLISHED BOOK · BIG DATA', '出版专著 · 大数据'],
      title: ['Big Data: Plan, Deploy and Operation', '《大数据：规划、部署与运维》'],
      finding: ['Publishing House of Electronics Industry · Enterprise Data Platform Engineering', '电子工业出版社正式出版 · 企业级大数据平台工程专著'],
      description: [
        'Comprehensive guide to distributed data lake/warehouse topology sizing, batch & real-time stream processing pipelines, security governance, and cluster tuning.',
        '深入拆解企业级分布式数据平台规划定容、批流一体计算引擎部署、数据安全治理与生产集群性能调优。'
      ],
      links: [{label: ['Data & Infra Lab', '进入数据与基础设施实验室'], url: `studio/${zh ? 'zh-' : ''}data-infra.html`}]
    }),
    ui.card(file, zh, {
      id: 'official-blogs',
      number: '6 OFFICIAL BLOGS',
      badge: ['THOUGHT LEADERSHIP & PLAYBOOKS', '官方技术博客与行业白皮书'],
      title: ['6 Official Cloud Partner GenAI & Architecture Blog Solutions + 153 AI Designs', '6 篇官方合作伙伴生成式 AI 架构博客 + 13 行业 153 套智能体方案'],
      finding: ['Published across Life Sciences RAG, Cross-Border Multi-Agent & Enterprise Security', '覆盖生命科学高召回 RAG、跨境多智能体编排与安全合规矩阵'],
      description: [
        'Authored 6 production partner architecture case studies on the AWS China Official Blog (2022–2025) and 153 industry Agentic AI blueprints across 13 verticals at Microsoft.',
        '2022–2025 年间在云厂商官方技术博客发表 6 篇合作伙伴生成式 AI 与行业架构标杆实践，并在微软编写覆盖 13 大行业的 153 套企业智能体落地方案。'
      ],
      links: [{label: ['Benchmark & Eval Foundry', '访问 7-Card 基准评测中心'], url: zh ? 'zh-benchmarks.html' : 'benchmarks.html'}]
    })
  ];
  // Fix book-cloud finding in EN so ZERO CJK characters appear in English <main>!
  if (!zh) {
    pubCards[0] = ui.card(file, false, {
      id: 'book-cloud',
      featured: true,
      number: 'ISBN 978-7-121-27576-0',
      badge: ['PUBLISHED BOOK · CLOUD', ''],
      title: ['Cloud Computing: Plan, Deploy and Operation', ''],
      finding: ['Publishing House of Electronics Industry · Enterprise Cloud Lifecycle Guide', ''],
      description: [
        'Enterprise practitioner book covering private/hybrid cloud architecture planning, compute/storage/network virtualization deployment, and 24x7 SLA production operations.',
        ''
      ],
      links: [{label: ['Career Context (ECCOM Cloud CoE)', ''], url: `${careerUrl}#era-eccom`}]
    });
  }

  body += ui.section(
    'publications',
    '03 / PUBLISHED BOOKS & INDUSTRY PLAYBOOKS',
    t(zh, 'Published Books (×2) & Official Architecture Publications', '出版技术专著（2 部）与官方架构实践发表'),
    t(zh, 'Distilling field-tested cloud, data, and AI engineering lessons into reusable industry references.', '将一线云平台、大数据与智能体工程实战持续沉淀为公开出版专著与行业参考蓝图。'),
    ui.grid(pubCards)
  );

  return ui.shell(
    file,
    zh,
    t(zh, 'Certifications (AB-100 · AI-103 · GH-300) & Publications', '权威认证（AB-100 · AI-103 · GH-300）与技术著作'),
    body,
    {active: 5, context: false}
  );
}

function renderFtePage(file, zh) {
  const aboutUrl = zh ? 'zh-about.html' : 'about.html';
  const skillsUrl = zh ? 'zh-skills.html' : 'skills.html';
  const hveWorkbench = `workshops/agent-harness-coevolution/index${zh ? '' : '.en'}.html`;

  let body = ui.crumb(file, zh, t(zh, 'Frontier Transformation Engineer (FTE)', 'Frontier Transformation Engineer (FTE) 全景说明'));

  body += `<section class="page-hero">
    <div>
      <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${t(
        zh,
        'MICROSOFT FRONTIER TRANSFORMATION PANORAMA · OFFICIAL LEARNING PATH & REGISTRATION',
        '微软 FRONTIER TRANSFORMATION 全景指南 · 官方学习路径与注册直达入口'
      )}</p>
      <h1>${t(
        zh,
        'Frontier Transformation Engineer (FTE) — Panorama, ~86h Learning Path & Registration',
        '什么是 Frontier Transformation Engineer (FTE)？全景解读、学习路径与注册指南'
      )}</h1>
      <p class="lead">${t(
        zh,
        'A Frontier Transformation Engineer (FTE) moves organizations beyond isolated AI pilots into continuous, governed production impact—combining CxO Business Consulting, Cross-Stack Agentic Engineering (Microsoft IQ, Foundry, Fabric, GitHub Copilot & HVE), and Zero-Trust Security (Entra Agent ID & Agent 365) to ship working enterprise agents in 4–6 weeks.',
        'Frontier Transformation Engineer（前沿转型工程师，简称 FTE）打破传统单一产品技术专家的边界，集「懂业务咨询（Business Consulting）× 跨栈智能体工程（Microsoft IQ · Foundry · Fabric · GitHub Copilot & HVE）× 可信安全治理（Entra Agent ID · Agent 365）」于一身，帮助客户与合作伙伴跨越 AI 试点陷阱，在 4–6 周内实现可度量的生产级智能体业务闭环。'
      )}</p>
      <div class="actions">
        <a class="button primary" href="https://skillupwithlevelup.com/enroll-journey/35">${t(
          zh,
          'Enroll Directly in FTE Journey (#35)',
          '立即注册官方 FTE 学习旅程 (#35)'
        )} ↗</a>
        <a class="button diamond-cta" href="https://skillupwithlevelup.com/frontier">${t(
          zh,
          'Official FTE Portal (LevelUp)',
          '访问微软 FTE 官方门户 (LevelUp)'
        )} ↗</a>
        <a class="button" href="https://skilling-hub.com/en-US/listing/on::02091::112026::pr::en::frontier-transforma">${t(
          zh,
          'Register Live Fastrack Accelerator',
          '报名 FTE 线上加速训练营 (Fastrack)'
        )} ↗</a>
        <a class="button" href="#registration-setup">${t(
          zh,
          '4-Step Account & Partner Center Linking',
          '必看：四步完成账号注册与伙伴归属绑定'
        )} ↓</a>
      </div>
    </div>
    <aside class="hero-callout">
      <p class="eyebrow">${t(zh, 'FRONTIER PARTNER EQUATION', '前沿合作伙伴核心公式')}</p>
      <strong>Vision × Engineering<br>× Offer × Scale</strong>
      <p>${t(
        zh,
        'FTE Badge proves talent capability · #FrontierFTEOffer proves repeatable 4–6 week GTM delivery · Specialization proves organizational maturity.',
        'FTE Badge 证明个体实战能力 · #FrontierFTEOffer 证明 4–6 周可复制商业交付 · Specialization 证明组织级规模化成熟度。'
      )}</p>
      <a class="text-link" href="#learning-path">${t(zh, 'Jump to ~86h / 11-Course Curriculum', '直达 ~86 小时 / 11 门课程完整清单')} ↓</a>
    </aside>
  </section>`;

  body += profileSubnav(file, zh, 'fte');

  const fteTelemetry = [
    ['~86 hrs', ['Total FTE Badge Journey', 'FTE 徽章完整学习时长'], ['~30h Cert Prep + ~57h Hands-On Labs', '~30h 认证备考 + ~57h 动手实验课']],
    ['3 Exams', ['Required MS Certifications', '三门必修微软官方认证'], ['GH-300 · AI-103 · AB-100', 'GH-300 · AI-103 · AB-100']],
    ['6 + 2', ['LevelUp Courses & Labs', 'LevelUp 实战课程与选修'], ['≥80% Assessment Score Required', '全部必修课需通过 ≥80% 测评']],
    ['6 Domains', ['Cross-Stack FTE Capabilities', '六大跨栈核心能力域'], ['Business · Agentic · App · Data/IQ · Cloud · Security', '业务 · 智能体 · 应用 · 数据IQ · 云平台 · 安全']],
    ['4–6 Wks', ['Repeatable FTE Offer Sprint', '标准化 #FrontierFTEOffer 冲刺'], ['First 3 Production Agents Live + Roadmap', '首期 3 个生产 Agent 上线 + 转型路线图']]
  ];
  body += `<section class="telemetry-strip" aria-label="${t(zh, 'FTE program metrics', 'FTE 体系核心指标')}">${fteTelemetry
    .map(
      ([val, label, scope]) =>
        `<div class="telemetry-cell"><strong>${ui.esc(val)}</strong><span>${ui.esc(ui.text(label, zh))}</span><small>${ui.esc(
          ui.text(scope, zh)
        )}</small></div>`
    )
    .join('')}</section>`;

  body += knowledgeFigure(file, zh, {
    topic: 'general',
    title: [
      'Frontier Transformation 5-Stage Value Flywheel & Partner Progression',
      'Frontier Transformation 五阶段业务价值闭环与伙伴能力演进图谱'
    ],
    concepts: [
      node(
        ['01 Business Vision · ALIGN', '01 业务愿景 · ALIGN 对齐'],
        ['Anchor CxO KPIs · 5–10 quantifiable AI outcomes', '锚定高管业务战略 · 识别 5–10 个可量化结果'],
        ['shapes cross-stack blueprint', '驱动跨栈方案设计']
      ),
      node(
        ['02 Solution Design · SKILL', '02 方案设计 · SKILL 赋能'],
        ['FTE 6 Domains · AB-100 / AI-103 / GH-300 + LevelUp', 'FTE 六大能力域 · 三大认证 + LevelUp 实训'],
        ['builds working agents fast', '超高速工程构建原型']
      ),
      node(
        ['03 Agentic Engineering · PROVE', '03 智能体工程 · PROVE 验证'],
        ['Microsoft IQ · Foundry · GitHub Copilot & HVE-Core', 'Microsoft IQ · Foundry · Copilot & HVE 敏捷交付'],
        ['enforces zero-trust landing', '通过零信任安全门禁']
      ),
      node(
        ['04 Governed Scale · PACKAGE', '04 可信规模化 · PACKAGE 封装'],
        ['Entra Agent ID · Agent 365 · 6-Wk #FrontierFTEOffer', 'Entra Agent ID · Agent 365 · 6周标准商业包'],
        ['compounds enterprise value', '沉淀持续复利飞轮']
      ),
      node(
        ['05 Value Expansion · SCALE', '05 价值扩展 · SCALE 扩张'],
        ['Frontier CoE · Managed Services · Specialization', 'Frontier CoE · 托管运营服务 · 高阶专项认证'],
        null
      )
    ]
  });

  // Section 01: Why Frontier Transformation & Frontier Partner Flywheel
  const flywheelSteps = [
    ['01 · ALIGN', ['Anchor Vision & Leadership', '高层共识与战略对齐'], ['Commit executive sponsorship, select target industries, and move from scattered tool PoCs to outcome-driven AI transformation.', '锁定管理层投入与重点行业赛道，告别碎片化工具试用，确立以可量化业务结果为核心的转型目标。']],
    ['02 · SKILL', ['Certify FTE Core Talent', '锻造 FTE 核心人才梯队'], ['Complete GH-300, AI-103, AB-100 and the 6 required LevelUp hands-on courses (≥80% assessment) to earn the official FTE Badge.', '通过 GH-300、AI-103、AB-100 三大认证及 6 门 LevelUp 必修实战课（测评 ≥80%），获取官方 FTE Badge 人才徽章。']],
    ['03 · PROVE', ['Deliver Customer Lighthouse Wins', '打赢客户灯塔实战项目'], ['Deploy cross-stack agents in real customer environments with Secure AI Landing Zones, Microsoft IQ grounding, and HVE delivery.', '在真实客户场景中基于安全 AI 着陆区、Microsoft IQ 与 HVE 方法论快速交付首批生产级智能体标杆。']],
    ['04 · PACKAGE', ['Publish #FrontierFTEOffer', '上架标准化 #FrontierFTEOffer'], ['Productize repeatable 4–6 week customer-paid discovery & 3-agent go-live sprints in Microsoft Commercial Marketplace.', '将成功经验封装为 4–6 周客户付费的标准化敏捷冲刺包，发布至微软商业市场（#FrontierFTEOffer）。']],
    ['05 · SCALE', ['Frontier CoE & Specialization', '建立 Frontier CoE 与规模复制'], ['Institutionalize an internal Frontier Center of Excellence, expand into Managed AI Services, and earn Microsoft AI Specializations.', '组建组织级 Frontier 卓越中心（CoE），延展至长周期交付与托管服务，冲刺微软高阶 Specialization 专项认证。']]
  ];

  body += ui.section(
    'why-fte',
    '01 / WHY FRONTIER TRANSFORMATION & FRONTIER PARTNER',
    t(
      zh,
      'From Isolated AI Pilots to Continuous Enterprise Value Realization',
      '为什么需要 Frontier Transformation？从孤立 AI 试点走向持续价值闭环'
    ),
    t(
      zh,
      'Most enterprise AI initiatives stall between impressive demos and governed production rollout. Frontier Transformation closes that gap across five connected stages (01 Business Vision → 02 Solution Design → 03 Agentic Engineering → 04 Governed Scale → 05 Value Expansion) and a 5-step Partner Flywheel.',
      '大量企业的 AI 探索卡在「Demo 很惊艳、投产难闭环」的断层。Frontier Transformation 通过「01 业务愿景 → 02 方案设计 → 03 智能体工程 → 04 可信规模化 → 05 价值持续扩展」五步闭环，配合合作伙伴五阶飞轮（ALIGN → SKILL → PROVE → PACKAGE → SCALE），将技术潜力转化为可持续复用的商业成果。'
    ),
    `<div class="fte-flywheel">${flywheelSteps
      .map(
        ([num, title, desc]) =>
          `<article class="fte-step"><span class="step-num">${ui.esc(num)}</span><h3>${ui.esc(ui.text(title, zh))}</h3><p>${ui.esc(
            ui.text(desc, zh)
          )}</p></article>`
      )
      .join('')}</div>`
  );

  // Section 02: Who is an FTE & 6 Cross-Stack Capability Domains
  const domainCards = [
    ui.card(file, zh, {
      id: 'fte-domain-1',
      number: 'DOMAIN 01',
      badge: ['UNDERSTAND BUSINESS', '懂业务与高管对话'],
      title: ['Industry & Business Consulting', '行业洞察与业务价值咨询'],
      finding: ['Industry Economics · Value-Chain Bottlenecks · CxO ROI Framing', '行业经济模型 · 价值链痛点诊断 · 高管级 ROI 定量拆解'],
      description: [
        'Translate boardroom priorities into 5–10 prioritized, measurable AI outcomes with clear baseline KPIs before writing a single line of prompt or orchestration code.',
        '深入理解行业业务逻辑与财务指标，与 CxO 及业务负责人同频对话，在写代码前精准锁定 5–10 个可量化的高价值业务结果。'
      ],
      links: [{label: ['AB-100 Exam Prep', '对应 AB-100 架构认证'], url: 'https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect-expert/'}]
    }),
    ui.card(file, zh, {
      id: 'fte-domain-2',
      number: 'DOMAIN 02',
      badge: ['ARCHITECT ACROSS STACK', '跨栈智能体设计'],
      title: ['Agentic Solution Design', '多智能体解决方案架构设计'],
      finding: ['Multi-Agent Topologies · Workflow Orchestration · Human-in-the-Loop', '多智能体分工编排 · 状态机流转 · 人机协同审批门禁'],
      description: [
        'Architect end-to-end agent systems spanning M365 Copilot, Copilot Studio, and pro-code Microsoft Agent Framework with explicit autonomy levels and fallback handoffs.',
        '统筹设计横跨 M365 Copilot、Copilot Studio 与 Pro-Code 智能体框架的混合编排架构，明确自主决策边界与人工接管机制。'
      ],
      links: [{label: ['Accelerate Agentic AI Course', '进入 Foundry 智能体课程'], url: 'https://skillupwithlevelup.com/enrollCourse/2307124?from=journey&journey_id=35'}]
    }),
    ui.card(file, zh, {
      id: 'fte-domain-3',
      number: 'DOMAIN 03',
      badge: ['BUILD FAST WITH HVE', '超高速工程实现'],
      title: ['Application & Hypervelocity Development', '应用现代化与超高速研发 (HVE)'],
      finding: ['GitHub Copilot · HVE-Core RPI Loop · MCP & Enterprise System Integration', 'GitHub Copilot · HVE-Core 规格驱动 · MCP 与核心系统集成'],
      description: [
        'Compress multi-month builds into days using GitHub Copilot Coding Agents, Hypervelocity Engineering (HVE) Research-Plan-Implement loops, and standardized API/MCP connectors.',
        '运用 GitHub Copilot 与 Hypervelocity Engineering（HVE）方法论重塑软件工程管线，高效完成遗留应用现代化及 ERP/CRM 核心系统集成。'
      ],
      links: [
        {label: ['HVE Framework Course', '官方 HVE 框架课程'], url: 'https://skillupwithlevelup.com/enrollCourse/2460949?from=journey&journey_id=35'},
        {label: ['Open-Source HVE Lab', '本站 HVE 协同工作台'], url: hveWorkbench}
      ]
    }),
    ui.card(file, zh, {
      id: 'fte-domain-4',
      number: 'DOMAIN 04',
      badge: ['GROUND ORGANIZATIONAL IQ', '激活企业全域知识'],
      title: ['Data & AI (Microsoft IQ Stack)', '数据与 AI 底座（Microsoft IQ 全栈）'],
      finding: ['Work IQ · Fabric IQ · Foundry IQ · WebIQ · Multimodal RAG & Evals', 'Work IQ · Fabric IQ · Foundry IQ · WebIQ · 多模态接地与评测'],
      description: [
        'Unify M365 collaboration context (Work IQ), OneLake/Lakehouse ontologies & Data Agents (Fabric IQ), model routing & RAG indexing (Foundry IQ), and deterministic quality evaluations.',
        '贯通协同办公上下文（Work IQ）、湖仓业务语义本体与数据智能体（Fabric IQ）及模型路由与多模态检索评测（Foundry IQ），消除幻觉与数据孤岛。'
      ],
      links: [
        {label: ['Microsoft IQ Course', 'Microsoft IQ 导论课'], url: 'https://skillupwithlevelup.com/enrollCourse/2435386?from=journey&journey_id=35'},
        {label: ['Fabric IQ & Data Agents', 'Fabric IQ 实战课'], url: 'https://skillupwithlevelup.com/enrollCourse/2430362?from=journey&journey_id=35'}
      ]
    }),
    ui.card(file, zh, {
      id: 'fte-domain-5',
      number: 'DOMAIN 05',
      badge: ['RELIABLE PLATFORM & FINOPS', '云底座与单元经济'],
      title: ['Cloud Platform & Operations', '云平台工程、高可用与 FinOps'],
      finding: ['Azure AI Landing Zone · Isolated Sandboxes · Latency, SLA & Token FinOps', 'Azure AI 着陆区 · 隔离执行沙箱 · 高可用容灾与 Token 成本治理'],
      description: [
        'Deploy resilient, IaC-repeatable Azure AI Landing Zones, container/sandbox runtimes (ACA, AKS, Functions), OpenTelemetry observability, and predictable token/compute unit economics.',
        '构建基于 IaC 可一键复用的 Azure AI 着陆区与弹性容器/沙箱底座，建立全链路可观测性、跨区容灾与清晰的 Token/算力 FinOps 账本。'
      ],
      links: [{label: ['Azure Agent Infra Playbook', '查看本站 Agent Infra 指南'], url: `workshops/azure-agent-infra/index${zh ? '' : '.en'}.html`}]
    }),
    ui.card(file, zh, {
      id: 'fte-domain-6',
      number: 'DOMAIN 06',
      badge: ['LAND WITH ZERO TRUST', '可信安全与治理'],
      title: ['Security, Identity & Agent Governance', '智能体身份、安全与合规治理'],
      finding: ['Microsoft Entra Agent ID · Agent 365 · Purview DLP · Responsible AI', 'Entra Agent ID 专属身份 · Agent 365 全景管控 · Purview 数据防泄漏'],
      description: [
        'Prevent shadow agents and over-privileged tool execution via Microsoft Entra Agent ID least-privilege scoping, Agent 365 lifecycle observability, Purview data sensitivity controls, and Responsible AI gates.',
        '利用 Microsoft Entra Agent ID 赋予智能体受控最小权限身份，结合 Agent 365 全生命周期治理、Purview 敏感数据分级保护与负责任 AI 护栏确保合规投产。'
      ],
      links: [{label: ['Agent 365 Governance Course', '进入 Agent 365 治理课程'], url: 'https://skillupwithlevelup.com/enrollCourse/2261257?from=journey&journey_id=35'}]
    })
  ];

  body += ui.section(
    'capabilities',
    '02 / WHO IS AN FTE? 5 BEHAVIORS & 6 CROSS-STACK CAPABILITY DOMAINS',
    t(
      zh,
      'Six Cross-Stack Capability Domains Anchored on Business Outcomes',
      'FTE 的五大核心行为准则与六大跨栈能力域'
    ),
    t(
      zh,
      'An FTE embodies five practitioner behaviors—Understand Business, Architect Across the Stack, Build Working Agents Fast, Land with Trust, and Scale Value—across six integrated technical and consulting domains.',
      '区别于单一产品售前或纯后端开发，FTE 围绕五大行为准则（洞察业务、跨栈架构、快速构建可用 Agent、可信合规落地、规模化扩展价值），横跨以下六大核心能力域。'
    ),
    ui.grid(domainCards)
  );

  // Section 03: Stage 0 — 4-Step Account Registration & Partner Center Linking
  const setupCards = [
    ui.card(file, zh, {
      id: 'setup-step-1',
      number: 'STEP 01',
      badge: ['WORK EMAIL SIGN-UP', '企业工作邮箱注册'],
      title: ['Register on Partner Skilling Hub', '使用公司工作邮箱注册 Partner Skilling Hub'],
      finding: ['Required gateway for LevelUp FTE Journey #35 & live Fastrack cohorts', '进入 LevelUp FTE 学习旅程 (#35) 与线上训练营的统一通行证'],
      description: [
        'Create and verify your Microsoft Partner Skilling Hub profile using your corporate partner email address so all LevelUp courses and ≥80% assessments are recorded.',
        '请务必使用您所在合作伙伴公司的企业工作邮箱注册并登录 Partner Skilling Hub，确保后续 LevelUp 课程进度与 ≥80% 测评成绩准确记录。'
      ],
      url: 'https://skilling-hub.com/',
      links: [
        {label: ['Open Partner Skilling Hub', '打开 Partner Skilling Hub 注册'], url: 'https://skilling-hub.com/'},
        {label: ['Direct FTE Journey #35', '直达 FTE 旅程 #35'], url: 'https://skillupwithlevelup.com/enroll-journey/35'}
      ]
    }),
    ui.card(file, zh, {
      id: 'setup-step-2',
      number: 'STEP 02',
      badge: ['MICROSOFT LEARN PROFILE', '微软 Learn 档案配置'],
      title: ['Sign In to Microsoft Learn & Link Work Email', '登录 Microsoft Learn 个人账号并关联工作邮箱'],
      finding: ['Keeps GH-300, AI-103, and AB-100 certifications portable & verifiable', '确保 GH-300、AI-103、AB-100 官方认证永久保存在个人档案并支持企业关联'],
      description: [
        'Log in to Microsoft Learn with your personal Microsoft account (MSA) and link your corporate work email under Account Management so exam transcripts sync cleanly.',
        '使用个人微软账号登录 Microsoft Learn，并在账户管理（Account Management）中绑定公司工作邮箱，用于承接三门官方认证考试成绩。'
      ],
      url: 'https://learn.microsoft.com/',
      links: [{label: ['Open Microsoft Learn', '打开 Microsoft Learn'], url: 'https://learn.microsoft.com/'}]
    }),
    ui.card(file, zh, {
      id: 'setup-step-3',
      number: 'STEP 03',
      badge: ['MAICPP EXAM ATTRIBUTION', '伙伴中心认证归属绑定'],
      title: ['Link Microsoft Learn in Microsoft Partner Center', '在 Partner Center 中绑定 Microsoft Learn 账号'],
      finding: ['Credits GH-300, AI-103, and AB-100 toward your company’s MAICPP metrics', '使您考取的微软官方认证自动计入所在企业的合作伙伴能力积分'],
      description: [
        'Open your Microsoft Partner Center Membership / My Profile workspace and link your Microsoft Learn profile so passed exams automatically count toward partner designations.',
        '进入 Microsoft Partner Center（合作伙伴中心）个人资料页，关联您的 Microsoft Learn 账号，使认证成绩自动归属至公司名下。'
      ],
      url: 'https://partner.microsoft.com/dashboard/v2/membership/workspace',
      links: [{label: ['Open Partner Center Workspace', '打开 Partner Center 绑定'], url: 'https://partner.microsoft.com/dashboard/v2/membership/workspace'}]
    }),
    ui.card(file, zh, {
      id: 'setup-step-4',
      number: 'STEP 04',
      badge: ['FTE BADGE ATTRIBUTION', 'FTE 徽章企业归属绑定'],
      title: ['Link Partner Skilling Hub in Partner Center', '在 Partner Center 中绑定 Skilling Hub 账号'],
      finding: ['Ensures your earned FTE Badge counts toward your organization’s Frontier Partner status', '确保最终获得的 FTE Badge 正式计入贵司 Frontier Partner 组织资质'],
      description: [
        'In the same Partner Center profile workspace, link your Partner Skilling Hub / LevelUp learning account so completed courses and your FTE Badge attribute to your organization.',
        '在同一 Partner Center 页面完成 Partner Skilling Hub 学习账号绑定——四步全部完成后，认证与 FTE 徽章即可自动双向同步归属！'
      ],
      url: 'https://partner.microsoft.com/dashboard/v2/membership/workspace',
      links: [{label: ['Link in Partner Center', '前往 Partner Center 完成关联'], url: 'https://partner.microsoft.com/dashboard/v2/membership/workspace'}]
    })
  ];

  body += ui.section(
    'registration-setup',
    '03 / STAGE 0 · 4-STEP REGISTRATION & PARTNER CENTER ATTRIBUTION',
    t(
      zh,
      'Do This First: 4-Step Account Registration & Partner Attribution Checklist',
      '第一步必做：账号注册与 Partner Center 企业归属绑定四步指引'
    ),
    t(
      zh,
      'Before taking exams or LevelUp assessments, complete these four account-linking steps so both your Microsoft Certifications and your FTE Badge are properly credited to you and your partner organization.',
      '在开始课程学习与考试前，请先按顺序完成以下 4 步账号注册与绑定，避免出现「考过认证或刷完课程但无法计入公司 Frontier Partner 资质」的问题。'
    ),
    ui.grid(setupCards)
  );

  // Section 04: Official ~86-Hour / 11-Course FTE Learning Path
  const levelUpRows = [
    {
      stage: ['Milestone 2 · Course 1', '里程碑 2 · 必修课 1'],
      title: [
        'Activate organizational intelligence with Microsoft IQ',
        'Activate organizational intelligence with Microsoft IQ（激活组织级智能：Work IQ / Fabric IQ / Foundry IQ / WebIQ）'
      ],
      meta: ['1 hr · Required Assessment ≥80%', '1 小时 · 必修测评 ≥80%'],
      courseUrl: 'https://skillupwithlevelup.com/enrollCourse/2435386?from=journey&journey_id=35',
      assessUrl: 'https://skillupwithlevelup.com/enrollCourse/2421493?from=journey&journey_id=35'
    },
    {
      stage: ['Milestone 2 · Course 2', '里程碑 2 · 必修课 2'],
      title: [
        'Build Frontier Firm productivity with Work IQ, Copilot, & agents',
        'Build Frontier Firm productivity with Work IQ, Copilot, & agents（基于 Work IQ、Copilot 与智能体构建前沿企业生产力）'
      ],
      meta: ['16 hrs (with Hands-On Labs) · Required Assessment ≥80%', '16 小时（含动手实验 Labs）· 必修测评 ≥80%'],
      courseUrl: 'https://skillupwithlevelup.com/enrollCourse/2437897?from=journey&journey_id=35',
      assessUrl: 'https://skillupwithlevelup.com/enrollCourse/2431760?from=journey&journey_id=35'
    },
    {
      stage: ['Milestone 2 · Course 3', '里程碑 2 · 必修课 3'],
      title: [
        'Accelerate Agentic AI (Microsoft Foundry)',
        'Accelerate Agentic AI（基于 Microsoft Foundry 加速企业级多智能体研发）'
      ],
      meta: ['20 hrs (with Hands-On Labs) · Required Assessment ≥80%', '20 小时（含动手实验 Labs）· 必修测评 ≥80%'],
      courseUrl: 'https://skillupwithlevelup.com/enrollCourse/2307124?from=journey&journey_id=35',
      assessUrl: 'https://skillupwithlevelup.com/enrollCourse/2431478?from=journey&journey_id=35'
    },
    {
      stage: ['Milestone 2 · Course 4', '里程碑 2 · 必修课 4'],
      title: [
        'Microsoft Fabric IQ & Data Agents',
        'Microsoft Fabric IQ & Data Agents（湖仓语义本体与企业数据智能体实战）'
      ],
      meta: ['8 hrs (with Hands-On Labs) · Required Assessment ≥80%', '8 小时（含动手实验 Labs）· 必修测评 ≥80%'],
      courseUrl: 'https://skillupwithlevelup.com/enrollCourse/2430362?from=journey&journey_id=35',
      assessUrl: 'https://skillupwithlevelup.com/enrollCourse/2431757?from=journey&journey_id=35'
    },
    {
      stage: ['Milestone 2 · Course 5', '里程碑 2 · 必修课 5'],
      title: [
        'Implement Agent 365 to observe, govern, and secure AI apps, Copilot & Agents',
        'Implement Agent 365 to observe, govern, and secure AI apps, Copilot & Agents（智能体全生命周期观测、治理与安全加固）'
      ],
      meta: ['12 hrs (with Hands-On Labs) · Required Assessment ≥80%', '12 小时（含动手实验 Labs）· 必修测评 ≥80%'],
      courseUrl: 'https://skillupwithlevelup.com/enrollCourse/2261257?from=journey&journey_id=35',
      assessUrl: 'https://skillupwithlevelup.com/enrollCourse/2431791?from=journey&journey_id=35'
    },
    {
      stage: ['Milestone 3 · Required HVE', '里程碑 3 · HVE 必修课'],
      title: [
        'Hypervelocity Engineering (HVE) Framework',
        'Hypervelocity Engineering (HVE) Framework（超高速工程框架方法论与智能体协同开发）'
      ],
      meta: ['1.5 hrs · Required Assessment ≥80%', '1.5 小时 · 必修测评 ≥80%'],
      courseUrl: 'https://skillupwithlevelup.com/enrollCourse/2460949?from=journey&journey_id=35',
      assessUrl: 'https://skillupwithlevelup.com/enrollCourse/2435369?from=journey&journey_id=35'
    },
    {
      stage: ['Milestone 3 · Optional CoE 1', '里程碑 3 · CoE 选修课 1'],
      title: [
        'Create AI Center of Excellence (Frontier CoE)',
        'Create AI Center of Excellence（从 0 到 1 建设组织级 AI / Frontier 卓越中心）'
      ],
      meta: ['2 hrs · Optional CoE Extension', '2 小时 · Frontier CoE 拓展选修'],
      courseUrl: 'https://skillupwithlevelup.com/enrollCourse/2488415?from=journey&journey_id=35',
      assessUrl: null
    },
    {
      stage: ['Milestone 3 · Optional CoE 2', '里程碑 3 · CoE 选修课 2'],
      title: [
        'Industry Expertise for building AI agents',
        'Industry Expertise for building AI agents（面向垂直行业的智能体场景设计与落地）'
      ],
      meta: ['1 hr · Optional Industry Extension', '1 小时 · 行业场景拓展选修'],
      courseUrl: 'https://skillupwithlevelup.com/enrollCourse/2488416?from=journey&journey_id=35',
      assessUrl: null
    }
  ];

  const learningPathHtml = `
    <div style="margin-bottom:18px">
      <p class="eyebrow" style="margin-bottom:10px">${t(
        zh,
        'MILESTONE 1 · CERTIFY (~30 HRS PREP + 3 OFFICIAL MICROSOFT EXAMS)',
        '里程碑 1 · CERTIFY 权威认证（约 30 小时备考 + 通过 3 门微软官方考试：GH-300 · AI-103 · AB-100）'
      )}</p>
      <p class="wb-desc" style="margin-bottom:16px">${t(
        zh,
        'Pass GH-300 (~10h prep), AI-103 (~10h prep; active AI-102 certification is also accepted during the official transition window), and AB-100 (~10h prep). Qi Chen holds all three certifications.',
        '需通过 GH-300（约 10h 备考）、AI-103（约 10h 备考；过渡期内持有有效 AI-102 认证亦可认可）及 AB-100（约 10h 备考）。站长陈琪已全部考取此三项认证。'
      )}</p>
      ${renderMsCertBanner(file, zh)}
    </div>

    <div class="diamond-matrix-wrap">
      <p class="eyebrow">${t(
        zh,
        'MILESTONES 2 & 3 · PROJECT READY + HYPERVELOCITY ENGINEERING & FRONTIER COE (LEVELUP JOURNEY #35)',
        '里程碑 2 & 3 · PROJECT READY 五门动手大课 + HVE 超高速工程与 CoE 课程（附全部直达注册/测评链接）'
      )}</p>
      <table class="diamond-matrix">
        <thead>
          <tr>
            <th>${t(zh, 'MILESTONE', '所属阶段')}</th>
            <th>${t(zh, 'OFFICIAL COURSE MODULE', '官方课程名称与核心内容')}</th>
            <th>${t(zh, 'DURATION & GATE', '学时与通关要求')}</th>
            <th>${t(zh, 'DIRECT ENROLLMENT & ASSESSMENT LINKS', '课程直达链接 & 在线测评链接')}</th>
          </tr>
        </thead>
        <tbody>
          ${levelUpRows
            .map(
              row => `<tr>
            <td><strong>${ui.esc(ui.text(row.stage, zh))}</strong></td>
            <td>${ui.esc(ui.text(row.title, zh))}</td>
            <td>${ui.esc(ui.text(row.meta, zh))}</td>
            <td>
              <a class="text-link" style="min-height:30px;margin-right:12px" href="${ui.esc(row.courseUrl)}">${t(
                zh,
                'Enroll Course ↗',
                '进入课程学习 ↗'
              )}</a>
              ${
                row.assessUrl
                  ? `<a class="text-link" style="min-height:30px;color:var(--secondary)" href="${ui.esc(row.assessUrl)}">${t(
                      zh,
                      'Take Assessment (≥80%) ↗',
                      '参加通关测评 (≥80%) ↗'
                    )}</a>`
                  : `<span class="wb-id">${t(zh, 'Optional (No Exam)', '选修拓展（免测评）')}</span>`
              }
            </td>
          </tr>`
            )
            .join('')}
        </tbody>
      </table>
      <div class="diamond-pill-row">
        <a class="diamond-pill" href="${ui.href(file, hveWorkbench)}">${t(
    zh,
    'Companion Asset: Agent Harness × Model Co-Evolution Workbench ↗',
    '配套实战资产：本站 Agent Harness × 模型协同演进工作台 ↗'
  )}</a>
        <a class="diamond-pill" href="https://github.com/turbo998/Copilot-HVE-Engineering-Workshop">${t(
          zh,
          'Companion Repo: Copilot-HVE-Engineering-Workshop (Bootcamp Labs) ↗',
          '配套开源库：Copilot-HVE-Engineering-Workshop（训练营实验手册）↗'
        )}</a>
      </div>
    </div>`;

  body += ui.section(
    'learning-path',
    '04 / OFFICIAL ~86-HOUR FTE LEARNING PATH & BADGE JOURNEY',
    t(
      zh,
      'Complete 11-Item Curriculum: 3 Certifications + 6 Required LevelUp Courses + 2 CoE Extensions',
      '官方 ~86 小时完整学习路径：3 门认证 + 6 门必修实战课 + 2 门 CoE 选修课'
    ),
    t(
      zh,
      'Earn the official Frontier Transformation Engineer Badge by completing Milestone 1 (3 Microsoft Certifications), Milestone 2 (5 Project-Ready LevelUp lab courses with ≥80% assessment scores), and Milestone 3 (Hypervelocity Engineering Framework ≥80%), then advance to Stage 4 (#FrontierFTEOffer & Specialization).',
      '依次完成里程碑 1（三门微软认证）、里程碑 2（五门带实验的 Project Ready 核心课并通过 ≥80% 测评）与里程碑 3（HVE 超高速工程框架必修课 ≥80%），即可解锁官方 FTE Badge，并进入阶段 4 实战验证与 #FrontierFTEOffer 商业化复制。'
    ),
    learningPathHtml
  );

  // Section 05: 6-Week FTE Offer Sprint Blueprint & Microsoft FDE vs Partner FTE Comparison
  const sprintAndFdeHtml = `
    <div class="diamond-matrix-wrap">
      <p class="eyebrow">${t(
        zh,
        'PART A · 6-WEEK #FRONTIERFTEOFFER SPRINT BLUEPRINT (MCEM STAGES 01–05 ALIGNED)',
        '模块 A · 4–6 周标准化 #FrontierFTEOffer 敏捷冲刺交付蓝图（对齐微软 MCEM 01–05 阶段）'
      )}</p>
      <table class="diamond-matrix">
        <thead>
          <tr>
            <th>${t(zh, 'TIMELINE & MCEM STAGE', '冲刺周次与 MCEM 阶段')}</th>
            <th>${t(zh, 'SPRINT FOCUS & ENGINEERING ACTIVITIES', '核心工作流与跨栈工程动作')}</th>
            <th>${t(zh, 'DELIVERABLE & DECISION GATE', '交付产物与里程碑门禁 (Gate)')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>WK 1–2</strong> · Stage 01–02<br>(Listen &amp; Consult / Inspire &amp; Design)</td>
            <td>${t(
              zh,
              'Executive value discovery workshop, business process bottleneck mapping, data/API readiness check, and Microsoft IQ + security boundary design.',
              '高管业务价值探索工作坊（Discovery Workshop）、核心流程痛点拆解、数据源/API 就绪度盘点，以及 Microsoft IQ 与安全合规边界设计。'
            )}</td>
            <td><strong>Gate 1 Signed</strong> · ${t(
              zh,
              '5–10 quantifiable outcomes defined + top 3 priority agent specs frozen.',
              '锁定 5–10 个可量化业务结果，冻结首批 3 个高优先级 Agent 契约。'
            )}</td>
          </tr>
          <tr>
            <td><strong>WK 3</strong> · Stage 03<br>(Empower &amp; Achieve — Foundation)</td>
            <td>${t(
              zh,
              'Provision IaC-based Secure Azure AI Landing Zone, Entra Agent ID & Purview guardrails, Microsoft IQ grounding connections, and Copilot / Agent UI scaffolding.',
              '基于 IaC 快速部署安全 AI 着陆区（Secure AI Landing Zone）、配置 Entra Agent ID 与 Purview 护栏、打通 Microsoft IQ 知识源与 Copilot 交互界面。'
            )}</td>
            <td>${t(
              zh,
              'Production-ready AI Landing Zone + authenticated Copilot/Foundry harness live.',
              '安全合规底座就绪 + 具备真实权限链路的智能体脚手架跑通。'
            )}</td>
          </tr>
          <tr>
            <td><strong>WK 4–5</strong> · Stage 03<br>(Hypervelocity Agent Build)</td>
            <td>${t(
              zh,
              'Build, integrate, and red-team the first 3 production agents using GitHub Copilot, HVE-Core RPI workflows, MCP enterprise connectors, and automated evaluation suites.',
              '运用 GitHub Copilot + HVE-Core 超高速研发闭环，完成首批 3 个生产级智能体的工具编排、系统联调、离线评测与红蓝对抗校准。'
            )}</td>
            <td>${t(
              zh,
              '3 working agents passing deterministic accuracy, latency, and safety gates.',
              '3 个智能体全部通过准确率、时延与安全策略门禁核验。'
            )}</td>
          </tr>
          <tr>
            <td><strong>WK 6</strong> · Stage 04<br>(Realize Value &amp; Handoff)</td>
            <td>${t(
              zh,
              'Take the first 3 agents live with pilot business users, instrument Agent 365 telemetry dashboards, and present the multi-quarter Enterprise AI Transformation Roadmap.',
              '首批 3 个智能体正式投产上线，交付 Agent 365 运行遥测看板，并向客户高管汇报中长期企业级 AI 转型路线图。'
            )}</td>
            <td><strong>Gate 2 Handoff</strong> · ${t(
              zh,
              '3 Agents Live + Roadmap approved → transition to Delivery & Managed Services.',
              '首期 3 个 Agent 投产验收 + 路线图签字 → 无缝转入二期规模交付与托管运营。'
            )}</td>
          </tr>
          <tr>
            <td><strong>Month 2–4+</strong> · Stage 05<br>(Manage &amp; Optimize — Scale)</td>
            <td>${t(
              zh,
              'Partner Delivery & Managed Services teams scale wave-2/wave-3 agents across business units, run continuous FinOps/eval optimization, and establish the customer’s Frontier CoE.',
              '由合作伙伴大规模交付团队与 MSP/MSSP 托管团队接棒，跨部门推广二期/三期智能体矩阵，持续优化 ROI 并协助客户建立内部 AI CoE。'
            )}</td>
            <td><strong>Gate 3 Scale</strong> · ${t(
              zh,
              'Multi-BU recurring ACR/ARR expansion & customer CoE maturity.',
              '多业务线规模化复利增长与长周期托管服务续约。'
            )}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="diamond-matrix-wrap">
      <p class="eyebrow">${t(
        zh,
        'PART B · MICROSOFT FDE (FORWARD DEPLOYED ENGINEER) VS. PARTNER FTE COMPARISON',
        '模块 B · 微软内部 FDE（前线部署工程师）与合作伙伴 FTE 定位对比与协同'
      )}</p>
      <table class="diamond-matrix">
        <thead>
          <tr>
            <th>${t(zh, 'DIMENSION', '对比维度')}</th>
            <th>${t(zh, 'MICROSOFT FDE (FORWARD DEPLOYED ENGINEER)', '微软 FDE（Forward Deployed Engineer）')}</th>
            <th>${t(zh, 'PARTNER FTE (FRONTIER TRANSFORMATION ENGINEER)', '合作伙伴 FTE（Frontier Transformation Engineer）')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${t(zh, 'Platform & Code Access', '技术栈与访问权限边界')}</strong></td>
            <td>${t(
              zh,
              'Internal Microsoft product-group co-engineering access, early private previews, and direct core-platform feedback loops.',
              '深入连接微软核心产品研发组（PG），可调动内部源码级排障、早期未公开预览特性并直接反哺产品演进。'
            )}</td>
            <td>${t(
              zh,
              'Standard GA/Public Preview Microsoft AI stack (M365 Copilot, Foundry, Fabric IQ, Agent 365) + customer domain systems, APIs, and MCP servers.',
              '基于标准公开的微软全栈 AI 平台（Copilot、Foundry、Fabric IQ、Agent 365）+ 深耕客户行业核心业务系统、私有数据与 MCP 接口。'
            )}</td>
          </tr>
          <tr>
            <td><strong>${t(zh, 'Engagement Cycle & Deal Size', '项目周期与商业体量')}</strong></td>
            <td>${t(
              zh,
              '3–12 month strategic flagship engagements (~$1M–$8M+ scope) proving category-defining architectures.',
              '通常为 3–12 个月的超大型战略灯塔攻坚项目（体量约 $1M–$8M+），攻克行业首创难题。'
            )}</td>
            <td>${t(
              zh,
              'Repeatable 4–6 week customer-paid #FrontierFTEOffer sprints that rapidly land 3 production agents and unlock multi-phase delivery & MSP annuities.',
              '高周转、可复制的 4–6 周客户付费标准冲刺包（#FrontierFTEOffer），快速跑通首批 3 个生产 Agent 并撬动后续规模交付与托管长尾收入。'
            )}</td>
          </tr>
          <tr>
            <td><strong>${t(zh, 'HVE Methodology', 'HVE 超高速工程实践')}</strong></td>
            <td>${t(
              zh,
              'Bespoke HVE patterns forged inside frontier flagship accounts and distilled into open frameworks.',
              '在超大型前沿客户现场淬炼原生 HVE（Hypervelocity Engineering）极速交付范式并沉淀工具链。'
            )}</td>
            <td>${t(
              zh,
              'Standardized, multi-customer HVE + GitHub Copilot delivery factories reusable across dozens of enterprise accounts per quarter.',
              '将 HVE 与 GitHub Copilot 转化为合作伙伴内部标准化、可跨数十家客户复用的高效智能体交付工厂。'
            )}</td>
          </tr>
          <tr>
            <td><strong>${t(zh, 'Ecosystem Scale & Synergy', '生态规模与协同模式')}</strong></td>
            <td>${t(
              zh,
              'High-touch catalyst team setting technical north stars and unblocking frontier product boundaries.',
              '精锐特种部队，树立行业技术北极星并打通底层产品能力边界。'
            )}</td>
            <td>${t(
              zh,
              'Primary global scale engine—thousands of certified Partner FTEs bringing Frontier Transformation to every enterprise and mid-market customer.',
              '全球规模化落地的主力军——通过数以千计持证 Partner FTE 将前沿智能体转型覆盖至千行百业。'
            )}</td>
          </tr>
        </tbody>
      </table>
    </div>`;

  body += ui.section(
    'sprint-and-fde',
    '05 / 6-WEEK FTE OFFER SPRINT & MICROSOFT FDE VS. PARTNER FTE',
    t(
      zh,
      'How FTE Operates in the Field: 6-Week Sprint Blueprint & FDE vs. FTE Positioning',
      'FTE 实战作业模型：6 周敏捷冲刺蓝图与 FDE / FTE 角色对照'
    ),
    t(
      zh,
      'Turn individual FTE skills into a repeatable commercial engine aligned with the Microsoft Customer Engagement Methodology (MCEM), and understand how Partner FTEs complement Microsoft FDEs.',
      '将个体 FTE 技术能力转化为对齐微软 MCEM 标准流程的可复制商业交付引擎，并厘清微软内部 FDE 与合作伙伴 FTE 的互补协同定位。'
    ),
    sprintAndFdeHtml
  );

  // Section 06: Prominent Registration & Quick-Launch Hub + 30-60-90 Day Partner Plan
  const ctaCards = [
    ui.card(file, zh, {
      id: 'cta-journey-35',
      featured: true,
      number: 'CTA-01',
      badge: ['PRIMARY REGISTRATION', '官方主修路径注册'],
      title: ['Enroll in FTE Learning Journey (#35)', '一键注册 FTE 官方完整学习旅程 (Journey #35)'],
      finding: ['Direct access to all 6 required + 2 optional LevelUp courses & assessments', '直达全部必修/选修课程与 ≥80% 在线测评入口'],
      description: [
        'Launch the official Frontier Transformation Engineer learning path on LevelUp after signing in via Partner Skilling Hub.',
        '登录 Partner Skilling Hub 后点击即可加入第 35 号官方学习旅程，一站式追踪全部课程实验与徽章进度。'
      ],
      url: 'https://skillupwithlevelup.com/enroll-journey/35',
      links: [{label: ['Enroll Journey #35 Now', '立即加入 Journey #35'], url: 'https://skillupwithlevelup.com/enroll-journey/35'}]
    }),
    ui.card(file, zh, {
      id: 'cta-frontier-portal',
      featured: true,
      number: 'CTA-02',
      badge: ['OFFICIAL PROGRAM HUB', '官方计划总门户'],
      title: ['Microsoft Frontier Transformation Portal (LevelUp)', '微软 Frontier Transformation 官方门户'],
      finding: ['Program overview, badge rules, FAQ, and #FrontierFTEOffer guidance', '查阅最新徽章规则、合作伙伴指南与 #FrontierFTEOffer 规范'],
      description: [
        'Explore Microsoft’s central Frontier Transformation destination covering individual FTE badges, partner offers, and Frontier CoE resources.',
        '微软官方维护的 Frontier Transformation 权威门户，汇总角色说明、能力模型与商业市场联合上架指引。'
      ],
      url: 'https://skillupwithlevelup.com/frontier',
      links: [{label: ['Open Frontier Portal', '访问 Frontier 官方门户'], url: 'https://skillupwithlevelup.com/frontier'}]
    }),
    ui.card(file, zh, {
      id: 'cta-fastrack',
      featured: true,
      number: 'CTA-03',
      badge: ['LIVE ACCELERATOR COHORT', '直播加速训练营'],
      title: ['Frontier Transformation Live Fastrack Registration', '报名 Frontier Transformation 线上加速训练营'],
      finding: ['Instructor-led cohorts, Q&A, and guided lab walkthroughs on Skilling Hub', '官方讲师带队串讲、答疑与动手实验加速通关'],
      description: [
        'Register for live Microsoft Partner Skilling Hub Fastrack sessions to accelerate your team’s certification and project-ready milestones.',
        '通过 Partner Skilling Hub 报名参加官方直播加速营，帮助团队架构师与工程师集中攻克认证与实验难点。'
      ],
      url: 'https://skilling-hub.com/en-US/listing/on::02091::112026::pr::en::frontier-transforma',
      links: [{label: ['Register Live Fastrack', '报名线上 Fastrack 训练营'], url: 'https://skilling-hub.com/en-US/listing/on::02091::112026::pr::en::frontier-transforma'}]
    }),
    ui.card(file, zh, {
      id: 'cta-skilling-hub',
      number: 'CTA-04',
      badge: ['PARTNER SKILLING HUB', '伙伴赋能平台账号'],
      title: ['Partner Skilling Hub Sign-Up & Catalog', 'Partner Skilling Hub 账号注册与课程大厅'],
      finding: ['Use your company work email so learning records sync to Partner Center', '请使用企业工作邮箱注册以确保学习记录可归属公司'],
      description: [
        'Create your partner learning account and browse live bootcamps, sales/presales enablement, and technical workshops.',
        '注册合作伙伴专属学习账号，获取微软最新 AI 售前、架构与交付实战培训资源。'
      ],
      url: 'https://skilling-hub.com/',
      links: [{label: ['Sign Up on Skilling Hub', '前往 Skilling Hub'], url: 'https://skilling-hub.com/'}]
    }),
    ui.card(file, zh, {
      id: 'cta-partner-center',
      number: 'CTA-05',
      badge: ['ACCOUNT LINKING', '伙伴中心归属关联'],
      title: ['Microsoft Partner Center Profile Linking', 'Microsoft Partner Center 账号双向关联入口'],
      finding: ['Link both Microsoft Learn & Partner Skilling Hub in Membership Workspace', '同时关联 Microsoft Learn 与 Skilling Hub 账号'],
      description: [
        'Ensure passed GH-300, AI-103, AB-100 certifications and earned FTE Badges count toward your organization’s partner capability score.',
        '完成个人学习档案与所在企业 Partner Center 工作区的绑定，确保认证与 FTE 徽章实时生效。'
      ],
      url: 'https://partner.microsoft.com/dashboard/v2/membership/workspace',
      links: [{label: ['Open Partner Center', '打开 Partner Center 工作区'], url: 'https://partner.microsoft.com/dashboard/v2/membership/workspace'}]
    }),
    ui.card(file, zh, {
      id: 'cta-ms-learn',
      number: 'CTA-06',
      badge: ['OFFICIAL EXAMS', '微软官方认证考试'],
      title: ['Microsoft Learn Credentials (GH-300 · AI-103 · AB-100)', 'Microsoft Learn 官方认证中心（GH-300 · AI-103 · AB-100）'],
      finding: ['Self-paced study guides, sandbox modules, and Pearson VUE exam scheduling', '官方免费备考模块、考纲解读与考试预约'],
      description: [
        'Access official study guides and schedule your GH-300, AI-103, and AB-100 certification exams on Microsoft Learn.',
        '浏览微软官方认证目录，查阅三门 FTE 必修考试最新大纲并预约在线或考场考试。'
      ],
      url: 'https://learn.microsoft.com/en-us/credentials/browse/?credential_types=certification',
      links: [
        {label: ['Browse MS Certifications', '浏览微软官方认证目录'], url: 'https://learn.microsoft.com/en-us/credentials/browse/?credential_types=certification'},
        {label: ['Qi Chen’s Cert Stack', '查看陈琪的认证矩阵'], url: skillsUrl}
      ]
    })
  ];

  body += ui.section(
    'register',
    '06 / OFFICIAL REGISTRATION & ENROLLMENT HUB',
    t(
      zh,
      'Quick-Launch Registration Directory & 30-60-90 Day Action Plan',
      'FTE 官方注册报名直达矩阵与 30-60-90 天行动建议'
    ),
    t(
      zh,
      'Recommended partner rollout: Days 1–30 nominate seed architects, link Partner Center accounts, and pass GH-300 / AI-103 / AB-100; Days 31–60 complete LevelUp labs (≥80%) to earn FTE Badges and build internal HVE templates; Days 61–90 launch your #FrontierFTEOffer in Marketplace and close lighthouse 6-week sprints.',
      '合作伙伴 90 天落地节奏建议：第 1–30 天选拔种子架构师与研发骨干、完成账号绑定并攻克三门认证；第 31–60 天通关 LevelUp 实战实验获取 FTE Badge 并沉淀内部 HVE 模板；第 61–90 天发布商业市场 #FrontierFTEOffer 并打赢灯塔客户 6 周敏捷冲刺。'
    ),
    ui.grid(ctaCards) +
      `<p class="source-note">${t(
        zh,
        'Program references synthesized from the Microsoft Partner Frontier Transformation Panorama briefing and official LevelUp / Microsoft Learn portals. Exam availability, transition rules (such as AI-102 acceptance), and partner program terms are governed by official Microsoft Partner Center & Microsoft Learn documentation.',
        '本页内容提炼自《微软 Frontier Transformation 全景》伙伴赋能简报及 LevelUp / Microsoft Learn 官方门户；具体考试过渡期规则（如 AI-102 衔接政策）与合作伙伴项目条款以 Microsoft Partner Center 及 Microsoft Learn 最新官方说明为准。'
      )} · <a href="${ui.href(file, aboutUrl)}">${t(zh, 'Return to Qi Chen’s FTE Profile', '返回陈琪个人主页简介')}</a></p>`
  );

  return ui.shell(
    file,
    zh,
    t(
      zh,
      'Frontier Transformation Engineer (FTE) · Learning Path & Registration',
      'Frontier Transformation Engineer (FTE) 全景介绍 · 学习路径与注册入口'
    ),
    body,
    {active: 5, context: false}
  );
}

function buildProfilePages({write}) {
  const specs = [
    ['about.html', false, renderAboutPage],
    ['zh-about.html', true, renderAboutPage],
    ['career.html', false, renderCareerPage],
    ['zh-career.html', true, renderCareerPage],
    ['skills.html', false, renderSkillsPage],
    ['zh-skills.html', true, renderSkillsPage],
    ['fte.html', false, renderFtePage],
    ['zh-fte.html', true, renderFtePage]
  ];
  for (const [file, zh, render] of specs) {
    const html = render(file, zh);
    if (!zh) {
      const mainMatch = html.match(/<main\b[\s\S]*?<\/main>/);
      if (mainMatch && /[\u3400-\u9fff]/.test(mainMatch[0])) {
        const leak = mainMatch[0].match(/.{0,30}[\u3400-\u9fff]+.{0,30}/)?.[0];
        throw new Error(`Untranslated CJK character found in English <main> of ${file}: ${leak}`);
      }
    }
    write(file, html);
  }
}

module.exports = buildProfilePages;
if (require.main === module) {
  const fs = require('node:fs');
  const path = require('node:path');
  const root = path.resolve(__dirname, '..');
  buildProfilePages({
    write: (file, text) => {
      fs.mkdirSync(path.dirname(path.join(root, file)), {recursive: true});
      fs.writeFileSync(path.join(root, file), text);
    }
  });
  console.log('Generated 8 bilingual Frontier Transformation Engineer & Profile pages.');
}
