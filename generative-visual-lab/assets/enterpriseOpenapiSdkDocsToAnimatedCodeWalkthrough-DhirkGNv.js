import"./modulepreload-polyfill-B5Qt9EMX.js";const v={"ai-foundry-agent-sdk-3step-quickstart":{id:"ai-foundry-agent-sdk-3step-quickstart",title:"AI Agent SDK 60-Second Quickstart (Init Client -> Bind MCP Tool -> Stream Structured Output)",titleZh:"AI Agent SDK 60秒快速上手视频（初始化客户端 -> 挂载 MCP 工具 -> 流式结构化输出三步演进）",sdkLanguageCount:4,stepTransitions:3,snippetLines:["const client = new FoundryClient({ credential });",'const agent = await client.agents.create({ model: "gpt-6.1-sol", tools: [mcpTool] });',"for await (const chunk of agent.stream({ input: prompt })) { render(chunk); }"]},"stripe-webhook-idempotency-migration":{id:"stripe-webhook-idempotency-migration",title:"Payment API v2 -> v3 Breaking-Change Migration Guide (Red/Green AST Diff + Signature Verify)",titleZh:"支付网关 API v2 升 v3 破坏性变更迁移视频（红绿 AST 逐Token平滑移动 + 幂等签名校验）",sdkLanguageCount:6,stepTransitions:4,snippetLines:['const sig = req.headers["x-webhook-signature-v3"];',"const event = webhooks.constructEvent(req.rawBody, sig, endpointSecret);","await ledger.commitIdempotent(event.idempotencyKey, event.data);"]},"graphql-federation-schema-diff-tutorial":{id:"graphql-federation-schema-diff-tutorial",title:"OpenAPI 3.1 & GraphQL Subgraph Federation Walkthrough (Code Left + Live Payload Diagram Right)",titleZh:"OpenAPI 3.1 与微服务网关接入教程（左侧 Shiki 代码高亮推镜 + 右侧请求报文流向同步点亮）",sdkLanguageCount:3,stepTransitions:5,snippetLines:['type Order @key(fields: "orderId") {',"  orderId: ID! @external",'  fulfillmentEta: DateTime! @requires(fields: "warehouseZone")']}};function y(i,e,o){const t=Math.max(0,(1-Math.abs(o-2.2))*.1);return e==="ci-tested-ast-shiki-magicmove-remotion"?{scenarioId:i,compilerMode:e,codeCompilabilityPct:100,tokenLegibilitySharpnessPct:Number(Math.min(100,99.8+t).toFixed(1)),ciRecompileSec:3.1,costPerVideoUsd:.011,annualSavingsUsdM:2.18,verdict:"Act automatically"}:e==="manual-obs-screen-recording-mp4"?{scenarioId:i,compilerMode:e,codeCompilabilityPct:74.6,tokenLegibilitySharpnessPct:82.4,ciRecompileSec:12600,costPerVideoUsd:280,annualSavingsUsdM:.22,verdict:"Confirm"}:{scenarioId:i,compilerMode:e,codeCompilabilityPct:18.5,tokenLegibilitySharpnessPct:54.2,ciRecompileSec:34,costPerVideoUsd:.45,annualSavingsUsdM:.04,verdict:"Send to a human"}}const C=document.querySelector("#app");if(!C)throw new Error("Missing #app root");let d="ai-foundry-agent-sdk-3step-quickstart",s="ci-tested-ast-shiki-magicmove-remotion",a=2.2;function P(i){const e=i.getContext("2d");if(!e)return;const o=i.width,t=i.height;e.clearRect(0,0,o,t);const k=v[d],p=y(d,s,a),g=s==="pixel-i2v-terminal-animation",h=e.createLinearGradient(0,0,o,t);h.addColorStop(0,"#070b14"),h.addColorStop(1,"#111827"),e.fillStyle=h,e.fillRect(0,0,o,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,o-32,46),e.strokeStyle=s==="ci-tested-ast-shiki-magicmove-remotion"?"#10b981":"#ef4444",e.strokeRect(16,14,o-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`254th Workbench · CI-Tested AST + Shiki Magic-Move (${k.sdkLanguageCount} SDK Languages · ${a.toFixed(1)}× Focus Zoom)`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Code Compilability: ${p.codeCompilabilityPct}% | 4K Token Sharpness: ${p.tokenLegibilitySharpnessPct}% | CI Re-Compile: ${p.ciRecompileSec}s ($${p.costPerVideoUsd})`,28,51);const l=24,n=78;e.save(),e.fillStyle="#090d16",e.strokeStyle=g?"#ef4444":"#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(l,n,445,290,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText(g?"⛔ Pixel I2V Terminal: Melted Brackets & Un-Compilable Code!":`✅ Shiki Magic-Move AST Stage (${a.toFixed(1)}× Active Line Spotlight)`,l+16,n+26),k.snippetLines.forEach((f,r)=>{const c=n+56+r*66,S=r===1;e.fillStyle=S?"rgba(16, 185, 129, 0.16)":"rgba(30, 41, 59, 0.45)",e.strokeStyle=S?"#10b981":"#1e293b",e.beginPath(),e.roundRect(l+14,c,417,52,8),e.fill(),e.stroke(),e.fillStyle=S?"#34d399":"#64748b",e.font="bold 10px JetBrains Mono, monospace",e.fillText(`Step ${r+1} · Vitest Verified`,l+24,c+18),e.fillStyle=g?"#fca5a5":"#f8fafc",e.font="11px JetBrains Mono, monospace",e.fillText(g?"c0nst ag#nt = aw@it cli?nt..cr3ate({":f.slice(0,52),l+24,c+38)}),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText("✓ Auto-triggered on git push to OpenAPI / SDK repo (Zero stale docs!)",l+18,n+268),e.restore();const u=486,b=250;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle="#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(u,n,b,290,12),e.fill(),e.stroke(),e.fillStyle="#34d399",e.font="bold 12px Inter, sans-serif",e.fillText("2. Live API Trace Split-Screen",u+14,n+26),["SDK Client (TS / Python / C#)","API Gateway (200 OK · 38ms)","MCP Tool / Webhook Handler","Streaming SSE JSON Chunks"].forEach((f,r)=>{const c=n+48+r*56;e.fillStyle="#090d16",e.strokeStyle=r===1?"#fbbf24":"#38bdf8",e.beginPath(),e.roundRect(u+16,c,b-32,42,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.fillText(f,u+28,c+25)}),e.restore()}function m(){const i=v[d],e=y(d,s,a);C.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">254th Interactive Architecture Workbench · Domain 5 (Developer Docs & OpenAPI to Code Walkthrough Video)</span>
        <h1>企业 OpenAPI / SDK 开发者文档自动编译 60fps 代码演进（Shiki Magic-Move）教程视频工作台</h1>
        <p class="subtitle">CI 单元测试实跑代码片段提取 (100% 可编译零过期) + Shiki Magic-Move 逐 Token 丝滑形变推镜 + 右侧 API 报文流向同屏联动 vs 手工 OBS 录屏发版即过期</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.codeCompilabilityPct}% Compilable</span>
        <span class="metric-pill">${e.ciRecompileSec}s CI Build</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 开发者文档/SDK 教程场景 (DevRel Tutorial Scenario)</label>
        <select id="scenario-select">
          ${Object.values(v).map(t=>`<option value="${t.id}" ${t.id===d?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 代码视频编译技术栈 (Code Video Stack)</label>
        <select id="mode-select">
          <option value="ci-tested-ast-shiki-magicmove-remotion" ${s==="ci-tested-ast-shiki-magicmove-remotion"?"selected":""}>✅ CI 实测 AST + Shiki Magic-Move 丝滑演进 + Remotion 分屏 (推荐)</option>
          <option value="manual-obs-screen-recording-mp4" ${s==="manual-obs-screen-recording-mp4"?"selected":""}>⚠️ 传统人工 OBS 录终端屏幕 (SDK 改 1 个参数名即导致 25.4% 视频代码跑不通)</option>
          <option value="pixel-i2v-terminal-animation" ${s==="pixel-i2v-terminal-animation"?"selected":""}>⛔ 代码截图喂入像素 I2V 视频模型 (81.5% 括号与函数名融化成语法错误)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="zoom-slider">3. 焦点代码行聚光灯放大倍率 (Active Line Zoom: <strong>${a.toFixed(1)}×</strong>)</label>
        <input id="zoom-slider" type="range" min="1.4" max="2.8" step="0.2" value="${a}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>Shiki Magic-Move 语法树 Token 动画与右侧 API 网关流向同屏舞台 (Code-Walkthrough Stage)</h2>
          <span class="tag">${i.sdkLanguageCount} Languages · ${i.stepTransitions} AST Steps</span>
        </div>
        <canvas id="walkthrough-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>开发者文档保鲜度与 DevRel 遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">视频内代码 100% 可编译保鲜率</span>
            <strong class="kpi-value">${e.codeCompilabilityPct}%</strong>
            <span class="kpi-note">直接绑定 CI 通过的集成测试源码，永不过期</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">移动端代码语法高亮锐度</span>
            <strong class="kpi-value">${e.tokenLegibilitySharpnessPct}%</strong>
            <span class="kpi-note">原生矢量字体 + ${a.toFixed(1)}× 当前焦点行自动放大</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">SDK 发版触发全量视频重编译耗时</span>
            <strong class="kpi-value">${e.ciRecompileSec}s</strong>
            <span class="kpi-note">GitHub Actions 自动重出 TS/Python/C# 多语种版</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单支教程成本 / DevRel 工时年省</span>
            <strong class="kpi-value">$${e.costPerVideoUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">终结每次 API 升级人工重录 3.5 小时的噩梦</span>
          </div>
        </div>
      </aside>
    </main>
  `;const o=document.querySelector("#walkthrough-canvas");o&&P(o),document.querySelector("#scenario-select")?.addEventListener("change",t=>{d=t.target.value,m()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{s=t.target.value,m()}),document.querySelector("#zoom-slider")?.addEventListener("input",t=>{a=Number(t.target.value),m()})}m();
