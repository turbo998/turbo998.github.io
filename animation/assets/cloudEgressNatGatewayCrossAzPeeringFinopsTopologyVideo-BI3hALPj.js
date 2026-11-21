import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"nat-gateway-s3-ecr-pull":{id:"nat-gateway-s3-ecr-pull",titleZh:"GPU 节点经 NAT Gateway ($0.045/GB) 拉取 S3/ECR 权重（注入免费 Gateway VPC Endpoint 旁路）",titleEn:"GPU Nodes Pulling S3/ECR Weights via Managed NAT Gateway ($0.045/GB → $0.00 Free Gateway VPC Endpoint)",trafficVolumeTbPerMonth:2480,naiveTariffPerGbUsd:.045,optimizedTariffPerGbUsd:.0018,naiveMonthlyBillUsd:112e3,optimizedMonthlyBillUsd:4460,naiveP99NetworkLatencyMs:6.4,optimizedP99NetworkLatencyMs:1.4,remediationRule:"aws_vpc_endpoint.s3_gateway (Free Route-Table Prefix List pl-63a5400a Bypass)",annualNetSavingsUsd:129e4},"k8s-kafka-cross-az-mesh":{id:"k8s-kafka-cross-az-mesh",titleZh:"K8s 微服务与 Kafka 跨可用区 (az-a↔az-b↔az-c $0.02/GB) 乱调（PreferClose + Rack-ID 同区亲和）",titleEn:"K8s & Kafka Cross-AZ ($0.02/GB Round-Trip) Hairpinning (trafficDistribution: PreferClose + broker.rack Lock)",trafficVolumeTbPerMonth:4200,naiveTariffPerGbUsd:.02,optimizedTariffPerGbUsd:.0022,naiveMonthlyBillUsd:84e3,optimizedMonthlyBillUsd:9240,naiveP99NetworkLatencyMs:4.8,optimizedP99NetworkLatencyMs:1.1,remediationRule:"K8s Service trafficDistribution: PreferClose + Kafka client.rack=az-id (89% Same-AZ Locality)",annualNetSavingsUsd:897e3},"multi-cloud-cdn-origin-egress":{id:"multi-cloud-cdn-origin-egress",titleZh:"AIGC 视频桶公网 CDN 回源流量税 ($0.085/GB)（切换 R2 零出口源站 + Private Connect 互联）",titleEn:"AIGC Video Bucket Public CDN Origin Egress ($0.085/GB → Zero-Egress R2 / Direct Connect Shield)",trafficVolumeTbPerMonth:1850,naiveTariffPerGbUsd:.085,optimizedTariffPerGbUsd:.0045,naiveMonthlyBillUsd:157250,optimizedMonthlyBillUsd:8325,naiveP99NetworkLatencyMs:18.2,optimizedP99NetworkLatencyMs:5.6,remediationRule:"Cloudflare R2 Zero-Egress Object Tier + Private Network Interconnect (PNI)",annualNetSavingsUsd:1787e3}};function v(t,i){const e=c[t],s=i==="ebpf-az-affinity-vpc-endpoint-finops",d=s?e.optimizedMonthlyBillUsd:e.naiveMonthlyBillUsd,l=s?e.optimizedTariffPerGbUsd:e.naiveTariffPerGbUsd,a=s?e.optimizedP99NetworkLatencyMs:e.naiveP99NetworkLatencyMs,r=s?Number(((e.naiveMonthlyBillUsd-e.optimizedMonthlyBillUsd)/e.naiveMonthlyBillUsd*100).toFixed(1)):0;return{scenario:e,mode:i,effectiveMonthlyBillUsd:d,effectiveTariffPerGbUsd:l,effectiveP99LatencyMs:a,billReductionPct:r,zeroTaxLeakagePass:s&&r>=85,verdictBadge:s?`EBPF TOPOLOGY LOCKED (-${r}% Bandwidth Tax · ${a.toFixed(1)}ms Same-AZ p99)`:`BANDWIDTH TAX HEMORRHAGE ($${e.naiveMonthlyBillUsd.toLocaleString("en-US")}/mo · ${e.naiveP99NetworkLatencyMs.toFixed(1)}ms Cross-AZ Hairpin)`}}const g=document.querySelector("#app");let f="nat-gateway-s3-ecr-pull",p="ebpf-az-affinity-vpc-endpoint-finops";function y(){const t=v(f,p),i=t.scenario,e=p==="ebpf-az-affinity-vpc-endpoint-finops";g.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 380 · 169th Curated Workbench · Domain 5 (Cloud Cross-AZ, NAT Gateway & Egress FinOps Topology Video Studio)</span>
        <h1>云原生跨可用区 (Cross-AZ)、NAT Gateway 与 Egress 隐性流量税 eBPF 拓扑自愈工作台</h1>
        <p class="wb-subtitle">免开启高价 VPC Flow Logs（$0.50/GB 摄入税），通过内核 eBPF 套接字 AZ 拓扑探针实时定位 $0.045/GB NAT Gateway S3 拉取与 $0.02/GB K8s/Kafka 跨可用区乱调，自动生成 Gateway VPC Endpoint 路由旁路与 PreferClose 同区亲和策略，削减 88.6%+ 网络流量账单（组合年省 +$2.89M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Network Tax Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择云网络隐性流量税场景 (Cloud Bandwidth Tax Scenario):</span>
        <div class="btn-row">
          ${Object.keys(c).map(s=>`
            <button type="button" class="scenario-btn ${f===s?"active":""}" data-scenario="${s}">
              ${c[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换云网络拓扑路由与 FinOps 治理模式 (Network Routing & FinOps Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-unaware-nat-cross-az">
            ❌ 传统基线：无拓扑感知跨 AZ 乱调 + 默认走 NAT Gateway ($0.045/GB 雁过拔毛)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="ebpf-az-affinity-vpc-endpoint-finops">
            ✅ 推荐架构：eBPF 套接字 AZ 归因 + Gateway VPC Endpoint 免费旁路 + PreferClose 同区亲和
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Cloud Network FinOps KPIs">
      <div class="kpi-card">
        <span class="kpi-title">月度数据传输与网关账单 (Monthly Network Bill)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-bill">$${t.effectiveMonthlyBillUsd.toLocaleString("en-US")} / mo</strong>
        <span class="kpi-sub">流量规模 ${i.trafficVolumeTbPerMonth.toLocaleString("en-US")} TB/月 · 降幅 -${t.billReductionPct.toFixed(1)}%</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">等效单 GB 传输综合单价 (Effective Tariff / GB)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-tariff">$${t.effectiveTariffPerGbUsd.toFixed(4)} / GB</strong>
        <span class="kpi-sub">对比传统未治理基线 $${i.naiveTariffPerGbUsd.toFixed(3)} / GB</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">跨节点网络传输 P99 延迟 (Network P99 Latency)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-latency">${t.effectiveP99LatencyMs.toFixed(1)} ms</strong>
        <span class="kpi-sub">${e?"同 AZ 本地光纤直连 / VPC 内网直通":"跨可用区往返绕行 + NAT 状态表瓶颈"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单项场景年化节省净额 (Annual Net Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-savings">+$${(i.annualNetSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">三大流量税场景合计年省 +$2.89M+</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>eBPF 跨可用区 (az-a / az-b / az-c) 流量桑基拓扑与 Gateway VPC Endpoint 旁路画布</h2>
          <span class="tag">${i.trafficVolumeTbPerMonth} TB/mo · ${i.remediationRule.split(" (")[0]}</span>
        </div>
        <canvas id="egress-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>eBPF 套接字五元组归因与 Terraform 自愈审计 (eBPF & IaC Audit)</h2>
        <ul class="audit-list">
          <li><span>月度监控传输总吞吐:</span> <strong>${i.trafficVolumeTbPerMonth.toLocaleString("en-US")} TB / 月</strong></li>
          <li><span>未治理基线单价与月耗:</span> <strong>$${i.naiveTariffPerGbUsd.toFixed(3)}/GB ($${i.naiveMonthlyBillUsd.toLocaleString("en-US")}/月)</strong></li>
          <li><span>自愈后等效单价与月耗:</span> <strong>$${t.effectiveTariffPerGbUsd.toFixed(4)}/GB ($${t.effectiveMonthlyBillUsd.toLocaleString("en-US")}/月)</strong></li>
          <li><span>自动化路由/拓扑修复规则:</span> <strong>${i.remediationRule}</strong></li>
          <li><span>探针观测开销对比:</span> <strong>eBPF 套接字探针 (&lt;0.6% CPU, $0) vs VPC Flow Logs ($0.50/GB)</strong></li>
          <li><span>网络 P99 往返延迟优化:</span> <strong>${i.naiveP99NetworkLatencyMs.toFixed(1)} ms → ${t.effectiveP99LatencyMs.toFixed(1)} ms</strong></li>
          <li><span>当前场景年化净省云账单:</span> <strong>+$${i.annualNetSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,P(),h(t)}function P(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{f=t.dataset.scenario,y()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{p=t.dataset.mode,y()})})}function h(t){const i=document.querySelector("#egress-canvas");if(!i)return;const e=i.getContext("2d"),s=i.width,d=i.height,l=t.scenario,a=t.mode==="ebpf-az-affinity-vpc-endpoint-finops";e.fillStyle="#070b14",e.fillRect(0,0,s,d),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Multi-AZ (us-east-1a / 1b / 1c) & NAT Gateway / VPC Endpoint Flow Topology",22,26),["us-east-1a (AZ-A)","us-east-1b (AZ-B)","us-east-1c (AZ-C)"].forEach((b,u)=>{const o=48+u*102;e.fillStyle="#0f172a",e.strokeStyle=a?"rgba(16, 185, 129, 0.45)":"rgba(239, 68, 68, 0.45)",e.lineWidth=1.8,e.beginPath(),e.roundRect(24,o,320,86,10),e.fill(),e.stroke(),e.fillStyle="#94a3b8",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(b,38,o+22),e.fillStyle="#1e293b",e.strokeStyle="#38bdf8",e.beginPath(),e.roundRect(38,o+32,118,40,6),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="11px Inter, system-ui, sans-serif",e.fillText(`GPU / App Pod ${u+1}`,48,o+56),e.fillStyle="#1e293b",e.strokeStyle="#10b981",e.beginPath(),e.roundRect(206,o+32,122,40,6),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.fillText("Local Broker / Cache",214,o+56),a&&(e.strokeStyle="#10b981",e.lineWidth=3,e.beginPath(),e.moveTo(156,o+52),e.lineTo(206,o+52),e.stroke(),e.fillStyle="#34d399",e.font="bold 10px Inter, system-ui, sans-serif",e.fillText("$0/GB",165,o+44))}),a||(e.strokeStyle="rgba(239, 68, 68, 0.85)",e.lineWidth=2.6,e.beginPath(),e.moveTo(156,100),e.lineTo(206,202),e.moveTo(156,202),e.lineTo(206,304),e.moveTo(156,304),e.lineTo(206,100),e.stroke(),e.fillStyle="#f87171",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText("✕ Cross-AZ Hairpin ($0.02/GB)",124,152));const n=390;e.fillStyle=a?"rgba(15, 23, 42, 0.55)":"rgba(239, 68, 68, 0.22)",e.strokeStyle=a?"#475569":"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(n,48,404,128,10),e.fill(),e.stroke(),e.fillStyle=a?"#94a3b8":"#fca5a5",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(a?"Managed NAT Gateway ($0.045/GB) — BYPASSED FOR S3/ECR!":"✕ Managed NAT Gateway Toll Booth ($0.045/GB Processing Fee)",n+16,76),e.fillStyle="#cbd5e1",e.font="12px Inter, system-ui, sans-serif",e.fillText(a?"Only residual external webhook traffic (2.4%) traverses NAT":"2,480 TB/mo S3 & ECR container pulls billed at $0.045/GB = $112,000/mo!",n+16,104),e.fillStyle=a?"#34d399":"#f87171",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(a?"✓ Route Table pl-63a5400a diverted to Free Gateway Endpoint":"✕ Missing aws_vpc_endpoint.s3_gateway route entry!",n+16,136),e.fillStyle=a?"rgba(16, 185, 129, 0.16)":"rgba(15, 23, 42, 0.75)",e.strokeStyle=a?"#10b981":"#475569",e.lineWidth=2.2,e.beginPath(),e.roundRect(n,196,404,150,10),e.fill(),e.stroke(),e.fillStyle=a?"#34d399":"#94a3b8",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("✓ Zero-Tax Path: Gateway VPC Endpoint ($0/GB) + R2 Zero-Egress",n+16,224),e.fillStyle="#e2e8f0",e.font="12px Inter, system-ui, sans-serif",e.fillText(`• Active Rule: ${l.remediationRule.slice(0,56)}`,n+16,254),e.fillText(`• Monthly Spend: $${l.naiveMonthlyBillUsd.toLocaleString("en-US")} → $${t.effectiveMonthlyBillUsd.toLocaleString("en-US")} (-${t.billReductionPct.toFixed(1)}%)`,n+16,282),e.fillText(`• Network P99 Latency: ${l.naiveP99NetworkLatencyMs.toFixed(1)} ms → ${t.effectiveP99LatencyMs.toFixed(1)} ms`,n+16,310),e.fillStyle=a?"#38bdf8":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(a?`✓ eBPF Socket-to-AZ Sankey + Auto-PR saves +$${l.annualNetSavingsUsd.toLocaleString("en-US")}/yr on this path`:`✕ Blind CSV billing hides which K8s workload caused $${l.naiveMonthlyBillUsd.toLocaleString("en-US")}/mo tax`,24,378)}y();
