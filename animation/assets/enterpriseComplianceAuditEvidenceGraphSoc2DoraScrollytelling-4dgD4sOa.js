import"./modulepreload-polyfill-B5Qt9EMX.js";const S={"eu-ai-act-art50-model-risk-oscal-graph":{id:"eu-ai-act-art50-model-risk-oscal-graph",title:"EU AI Act (Articles 15 & 50) & ISO/IEC 42001 AI Management System OSCAL Graph",titleZh:"欧盟 AI 法案（Art. 15/50）与 ISO 42001：法条 → 护栏策略 → 生产网关 C2PA 证据三层溯源图",frameworkStandard:"EU AI Act + ISO/IEC 42001 OSCAL v1.1",mappedControls:148,liveResources:640},"soc2-type2-zero-trust-encryption-trace":{id:"soc2-type2-zero-trust-encryption-trace",title:"SOC 2 Type II & ISO 27001 Continuous Control-to-Azure-Policy Evidence DAG",titleZh:"SOC 2 Type II 与 ISO 27001：控制项 → Azure Policy / OPA Rego → CMK 密钥轮换签名证据链",frameworkStandard:"AICPA SOC 2 Trust Services Criteria",mappedControls:216,liveResources:1280},"dora-financial-ict-resilience-evidence":{id:"dora-financial-ict-resilience-evidence",title:"EU DORA Financial ICT Third-Party Risk & Multi-Region DR Drill Attestation",titleZh:"金融监管 DORA 数字化运营韧性：监管条款 → 混沌演练 RTO/RPO → 不可变 WORM 审计账本",frameworkStandard:"EU DORA (Regulation 2022/2554)",mappedControls:184,liveResources:920}};function m(i,e,a){const t=Number(((a-1)*1.2).toFixed(1));return e==="oscal-policy-ast-bipartite-dag-signed-scrollytelling"?{scenarioId:i,pipelineMode:e,evidenceTraceabilityLockPct:100,auditPrepTimeReductionPct:88.6,auditorSignoffSpeedupPct:Number((62.1+t).toFixed(1)),compileTimeSec:1.5,annualSavingsUsdM:2.84,verdict:"Act automatically"}:e==="manual-excel-screenshot-spreadsheet-binder"?{scenarioId:i,pipelineMode:e,evidenceTraceabilityLockPct:47.6,auditPrepTimeReductionPct:0,auditorSignoffSpeedupPct:5,compileTimeSec:1800,annualSavingsUsdM:.14,verdict:"Confirm"}:{scenarioId:i,pipelineMode:e,evidenceTraceabilityLockPct:60.4,auditPrepTimeReductionPct:35,auditorSignoffSpeedupPct:-18.5,compileTimeSec:14.2,annualSavingsUsdM:.02,verdict:"Send to a human"}}const v=document.querySelector("#app");if(!v)throw new Error("Missing #app root");let c="eu-ai-act-art50-model-risk-oscal-graph",s="oscal-policy-ast-bipartite-dag-signed-scrollytelling",d=3;function f(i){const e=i.getContext("2d");if(!e)return;const a=i.width,t=i.height;e.clearRect(0,0,a,t);const n=S[c],r=m(c,s,d),o=s==="unconstrained-llm-compliance-prose-hallucination",u=e.createLinearGradient(0,0,a,t);u.addColorStop(0,"#070b14"),u.addColorStop(1,"#1e1b4b"),e.fillStyle=u,e.fillRect(0,0,a,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,a-32,46),e.strokeStyle=s==="oscal-policy-ast-bipartite-dag-signed-scrollytelling"?"#10b981":"#ef4444",e.strokeRect(16,14,a-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`269th Workbench (52nd in Domain 5) · ${n.frameworkStandard} · ${n.mappedControls} Controls → ${n.liveResources} Resources`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Cryptographic Evidence Traceability: ${r.evidenceTraceabilityLockPct}% | Audit Prep Saved: -${r.auditPrepTimeReductionPct}% | Auditor Speedup: +${r.auditorSignoffSpeedupPct}%`,28,51);const g=[{title:"1. Tier-1 Regulatory Clause AST (OSCAL JSON)",detail:o?"⛔ Hallucinated Clause Mapping (39.6% False Attestation)":`✓ 100.0% Pinned ${n.frameworkStandard} Clauses`,color:o?"#ef4444":"#10b981",x:36,y:84},{title:"2. Tier-2 Policy-as-Code Control Gate (Rego/Azure)",detail:o?"⛔ Disconnected Prose Without Rego / Policy Evaluation":`✓ ${n.mappedControls} Automated Policy-as-Code Gates`,color:o?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. Tier-3 Live Resource SHA-256 Attestation Proof",detail:o?"⛔ Unverified Claims Rejected by External Auditors":`✓ ${n.liveResources} Resources Signed with SHA-256 Digest`,color:o?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Interactive Auditor Scrollytelling & Signed Pack",detail:o?"⛔ -18.5% Slower Audit Due to Manual Fact-Checking":`✓ Compiled in ${r.compileTimeSec}s (+$${r.annualSavingsUsdM}M/yr Saved)`,color:o?"#ef4444":"#f59e0b",x:396,y:178}];for(const l of g)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=l.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(l.x,l.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(l.title,l.x+14,l.y+28),e.fillStyle=l.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(l.detail,l.x+14,l.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Compliance Evidence Graph: ${n.title} (Drill-Down Tier L${d})`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(o?"⛔ Freeform LLM Audit Report: Invents Unverified Control Coverage & Triggers Regulatory Findings!":`✓ NIST OSCAL 3-Tier Bipartite DAG (Clause → Rego Policy → SHA-256 Resource Proof) (${r.compileTimeSec}s Compile)`,54,336),e.restore()}function p(){const i=S[c],e=m(c,s,d);v.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">269th Workbench (52nd in Domain 5) · OSCAL Compliance Evidence Graph &amp; Auditor Scrollytelling</span>
        <h1>企业合规审计与安全治理证据图谱（SOC2 / ISO 27001 / EU AI Act / DORA）：策略到控制点实时溯源与审计叙事沙盘</h1>
        <p class="subtitle">NIST OSCAL 强类型证据 AST + “监管法条→OPA/Azure 策略门禁→云资源 SHA-256 快照”三层二分图 + 60fps 审计官下钻叙事 vs 手工截图 Excel 台账</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.evidenceTraceabilityLockPct}% Proof Lock</span>
        <span class="metric-pill">-${e.auditPrepTimeReductionPct}% Prep Time</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 国际监管与安全合规审计框架 (Regulatory Framework Scenario)</label>
        <select id="scenario-select">
          ${Object.values(S).map(t=>`<option value="${t.id}" ${t.id===c?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 审计证据图谱与汇报编译管线 (Compliance Visualization Stack)</label>
        <select id="mode-select">
          <option value="oscal-policy-ast-bipartite-dag-signed-scrollytelling" ${s==="oscal-policy-ast-bipartite-dag-signed-scrollytelling"?"selected":""}>✅ NIST OSCAL 策略 AST + 三层二分图溯源 + 签名证据包交互沙盘 (推荐)</option>
          <option value="unconstrained-llm-compliance-prose-hallucination" ${s==="unconstrained-llm-compliance-prose-hallucination"?"selected":""}>⛔ 让 LLM 直接自由撰写合规自评报告與架构图 (39.6% 幻觉虚报控制点覆盖率)</option>
          <option value="manual-excel-screenshot-spreadsheet-binder" ${s==="manual-excel-screenshot-spreadsheet-binder"?"selected":""}>⚠️ 传统人工拼贴控制台截图 + Excel 台账 (52.4% 截图在迎审前已过期失效)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="tier-slider">3. 审计官证据下钻层级 (Auditor Drill-Down Tier: <strong>Tier ${d} / 3</strong>)</label>
        <input id="tier-slider" type="range" min="1" max="3" step="1" value="${d}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>监管法条→策略代码→云资源 SHA-256 证据三层溯源舞台 (Compliance Evidence Stage)</h2>
          <span class="tag">${i.mappedControls} Controls · ${i.liveResources} Resources</span>
        </div>
        <canvas id="compliance-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>CISO 合规迎审与外部审计遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">法条到云资源签名证据链完整率</span>
            <strong class="kpi-value">${e.evidenceTraceabilityLockPct}%</strong>
            <span class="kpi-note">每个架构节点硬绑定 SHA-256 策略评估快照</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">迎审材料准备与截图工时削减率</span>
            <strong class="kpi-value">-${e.auditPrepTimeReductionPct}%</strong>
            <span class="kpi-note">告别每季度人工截取 600 张云控制台截图</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">外部审计官核验签字效率提升</span>
            <strong class="kpi-value">${e.auditorSignoffSpeedupPct>=0?"+":""}${e.auditorSignoffSpeedupPct}%</strong>
            <span class="kpi-note">点击法条一键点亮底层技术控制点与日志</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">编译耗时 / 年化迎审与合规净省</span>
            <strong class="kpi-value">${e.compileTimeSec.toFixed(1)}s · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">同步导出交互式审计微站、视频与 OSCAL 包</span>
          </div>
        </div>
      </aside>
    </main>
  `;const a=document.querySelector("#compliance-canvas");a&&f(a),document.querySelector("#scenario-select")?.addEventListener("change",t=>{c=t.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{s=t.target.value,p()}),document.querySelector("#tier-slider")?.addEventListener("input",t=>{d=Number(t.target.value),p()})}p();
