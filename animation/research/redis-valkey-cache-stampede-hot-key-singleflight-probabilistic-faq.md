# 大规模分布式缓存（Redis / Valkey / Dragonfly 120万 QPS）防击穿雪崩：XFetch 概率早期重算、Singleflight 合并与 HeavyKeeper L1 热点广播选型指南

> **关联隐藏级交互工作台**：[`demos/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic-video-studio/`](../demos/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic-video-studio/)  
> **配套 7-Card 评测报告**：[`docs/benchmarks/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic/summary.json`](./benchmarks/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic/summary.json) · [`summary-visual.svg`](./benchmarks/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic/summary-visual.svg)

---

## ① 📌 核心选型结论速览（Executive Summary）

在 **百万级 QPS 的高并发交易、社交热搜与电商秒杀系统（Redis Cluster / Valkey / Dragonfly）** 中，传统的 **`Cache-Aside`（先查缓存，未命中则查 DB 并回写 `SET key val EX 60`）** 在面对极端流量时存在两大足以在 2 秒内摧毁全站的致命漏洞：
1. **缓存击穿（Cache Stampede / Thundering Herd）**：当一个承载 `85,000 QPS`、底层 SQL 聚合重算耗时 $\Delta = 180\text{ ms}$ 的热点商品 Key 在第 `60.000 秒` TTL 归零失效的瞬间，在第一个线程算完回写之前的 `180 ms` 空窗期内，会有 **`85,000 × 0.18s = 15,300` 个并发请求同时读到 `nil` 并全部冲向主数据库执行相同的慢 SQL**，瞬间将数据库 CPU 打死至 `100%`！
2. **单分片热点倾斜（Single-Shard Hot-Key Saturation）**：即便缓存没有过期，由于 `CRC16(key) mod 16384` 将同一个突发头条 Key 永远路由到 64 分片集群中的 **同一个主分片（如 Shard #14）**，当单 Key 流量达到 `420,000 QPS` 时，单核 Redis 线程 `100%` 饱和（P99 延迟飙升至 `680 ms`），而其余 63 台机器却在空转！

| 选型维度 | ❌ 传统基线：硬 TTL `Cache-Aside` + 裸查 Redis | ⚠️ 仅加分布式 `SETNX` 互斥锁阻塞等待 | ✅ 推荐架构：`XFetch` 概率早期异步刷新 + `Singleflight` 协程/租约合并 + `HeavyKeeper` Top-K 探测 + `RESP3` 客户端 L1 缓存 |
| --- | --- | --- | --- |
| **TTL 到期瞬间穿透 DB 的查询数** | `15,300 次/秒`（180ms 空窗期内万箭齐发打死 DB） | `1 次/秒`（但其余 `15,299` 个前端线程全部阻塞挂起等待） | **`1 次/秒`（`XFetch` 在过期前后台异步单飞重算，前端 100% 零阻塞读旧值，削减 `-99.993%` DB 穿透）** |
| **42万 QPS 超级热点 Key 分片 CPU** | Shard #14 `100.0%` 满载卡死（其余 63 分片闲置） | 同样打死单分片 | **`22.4% – 24.6%`（`HeavyKeeper` 10ms 捕获热点并自动激活 `RESP3 BCAST` 本地进程 L1 缓存拦截 94% 读流量）** |
| **大促整点 50万预热 Key 雪崩防御** | 固定 `EX 3600` 导致整点集体失效雪崩 | 高锁竞争抖动 | **强制注入随机抖动 `TTL * U(0.85, 1.15)` + 软逻辑过期（Soft-TTL）** |
| **缓存读取端到端 P99 尾延迟** | `680 ms – 2,450 ms`（穿透超时与分片排队） | `185 ms`（锁等待毛刺） | **`0.42 ms – 0.85 ms`（全程无锁等待毛刺）** |
| **年化规避大促停机与过度扩容成本** | 基线（被迫按峰值盲目扩 10倍分片） | 偶发死锁与超时 | **年化净省与规避停机损失 `+$3,460,000 / yr`** |

---

## ② 🎯 业务方与架构师灵魂拷问 Q&A（Q1 / Q2 / Q3）

### Q1：为什么用 `SETNX` 分布式互斥锁防缓存击穿会产生“每 60 秒一次的 180ms P99 延迟尖刺”，而 `XFetch` 概率早期异步重算能做到 0 尖刺？
- **`SETNX` 事后阻塞的局限**：等到 TTL 已经归零（物理删除）再去抢锁，没抢到锁的 `15,299` 个请求只能 `sleep(50ms)` 轮询等待那唯一一个查 DB 的线程算完，导致每逢过期点全站 P99 延迟必定跳变到 `180 ms+`。
- **VLDB `XFetch` 最优概率早期重算（Optimal Probabilistic Early Expiration）**：在缓存值中额外写入上次重算耗时 $\Delta$（如 `180 ms`）与逻辑软过期时间 `expiry`。每次读取时验证不等式：
  $$\text{now} - \Delta \cdot \beta \cdot \ln(\text{rand}(0, 1)) \ge \text{expiry}$$
  当距离真正过期还剩大约 $2\Delta \sim 3\Delta$（即最后 `360–540 ms`）时，天然会有 1 个请求率先满足该指数分布不等式，在 **后台异步协程（結合 `Singleflight` + Redis 租约 Token）** 提前去 DB 刷新缓存，而此时缓存尚未物理过期，其余所有并发请求继续以 `0.85 ms` 读取当前有效值，实现 **零 DB 穿透 + 零延迟毛刺**！

### Q2：如何在不重启应用、不改业务 Key 命名的前提下，自动顶住突发 42万 QPS 的单 Key 热搜洪峰？
- **内核/代理层 `HeavyKeeper` 指数衰减草图 + `RESP3 CLIENT TRACKING` 本地 L1 Near-Cache**：
  1. 在客户端 SDK 或代理层维护仅占 `64 KB` 内存的 **HeavyKeeper Top-K 流式频率草图**，在 **`10 ms`** 内精准识别出 QPS 突破 `10,000` 的极热 Key；
  2. 自动将该极热 Key 提升至各 K8s 应用 Pod 本地堆内 **L1 缓存（Caffeine / Ristretto，`0.04 ms` 内存直读）**，并开启 Redis 6/7/Valkey 原生 **`CLIENT TRACKING ON BCAST`** 订阅：一旦该 Key 发生写入修改，Redis 主节点在 `0.3 ms` 内主动向所有订阅 Pod 广播 `INVALIDATE` 帧，兼顾 **百万级横向读扩展与强最终一致性**！

---

## ③ 🧭 直观可视化图解（Mermaid 决策树 + 生产管线架构图 + 时序图）

### 3.1 分布式缓存防击穿、防雪崩与防热点架构选型决策树

```mermaid
flowchart TD
    A[分布式缓存 Redis/Valkey 高可用防护场景] --> B{核心流量风险形态?}
    B -->|大促预热 50万 Key 在同一整点集中过期| C[强制注入随机 TTL 抖动 TTL × U 0.85,1.15<br/>+ 软过期 Stale-While-Revalidate]
    B -->|单 Key 聚合 SQL 耗时高 Δ>50ms, 过期瞬间万级并发击穿| D[✅ 启用 XFetch 概率早期异步重算 +<br/>进程内 Singleflight + 跨实例 Lease Token]
    B -->|突发事件单 Key 流量 >100k QPS 打满单分片 CPU| E[✅ 启用 HeavyKeeper 10ms 热点探测 +<br/>RESP3 CLIENT TRACKING 本地 L1 Near-Cache]
```

### 3.2 `XFetch` + `Singleflight` + `RESP3` 本地 L1 三级防护管线架构图

```mermaid
flowchart LR
    subgraph AppPod["1. 应用 Pod 本地 L1 与 Singleflight 层"]
        R["420,000 QPS 读请求"] --> HK["HeavyKeeper Top-K 热点探测器<br/>(>10k QPS 自动升格本地 L1 缓存, 拦截 94% 流量)"]
        HK --> XF["XFetch 概率早期重算判定器<br/>now - Δ·β·ln(rand) ≥ expiry"]
        XF --> SF["进程内 Singleflight 协程合并器<br/>(单 Pod 千级并发合并为 1 次出站请求)"]
    end
    subgraph RedisCluster["2. Valkey / Redis 64分片集群"]
        SF --> L["Redis 租约锁 (SET lock EX 2 NX)<br/>(多 Pod 进一步收敛为全局唯一 1 次回源)"]
        L <-->|"RESP3 BCAST 毫秒级写入失效广播"| HK
    end
    subgraph PrimaryDB["3. 底层主数据库 (零击穿保护)"]
        L --> DB["PostgreSQL / MySQL 主库<br/>(15,300 QPS 洪峰被削平为 1 Query/s!)"]
    end
```

### 3.3 热点 Key 过期前 300ms 零阻塞平滑换血时序图

```mermaid
sequenceDiagram
    autonumber
    participant Traffic as 85,000 QPS 前端请求流
    participant Pod as 应用 Pod (XFetch + Singleflight)
    participant Valkey as Valkey / Redis 分片
    participant DB as 主数据库 (180ms 聚合查询)

    Traffic->>Pod: T = 59.72s (距软过期还剩 280ms), 某请求摇中 XFetch 早期刷新概率
    Pod-->>Traffic: 立即向该请求及后续全部 85,000 QPS 请求返回当前缓存旧值 (耗时 0.85ms, 零等待!)
    Pod->>Valkey: 后台协程经 Singleflight 申请全局刷新租约锁 (SET key:lease NX EX 2)
    Valkey-->>Pod: 获批全局唯一刷新租约
    Pod->>DB: 执行全局唯一 1 次 180ms SQL 聚合查询 (屏蔽其余 15,299 次冗余穿透!)
    DB-->>Valkey: T = 59.90s 写回新缓存值与新 Δ=180ms, 并经 RESP3 广播刷新各 Pod L1 缓存
```

---

## ④ 📊 多模型/多技术栈横向选型决策矩阵

| 评估维度 | 方案 A：传统硬过期 `Cache-Aside` | 方案 B：`SETNX` 互斥锁 + 轮询 Sleep 等待 | 方案 C：后台定时 Cron 全量永不过期轮询刷新 | ✅ 方案 D：`XFetch` 概率早刷 + `Singleflight` + `RESP3` L1 缓存（推荐） |
| --- | --- | --- | --- | --- |
| **TTL 到期窗口 DB 穿透查询数** | `15,300 次/秒`（打死 DB） | `1 次/秒` | `0 次`（但浪费大量冷 Key 刷新算力） | **`1 次/秒`（仅按需提前刷新真正有人访问的热 Key）** |
| **过期瞬间前端 P99 延迟毛刺** | `2,450 ms`（连接池耗尽超时） | `185 ms`（所有线程被锁挂起等待 DB） | `0.90 ms` | **`0.85 ms`（旧值兜底 + 后台异步单飞换血，零毛刺）** |
| **42万 QPS 单热点 Key 分片 CPU** | `100.0%`（单核打爆） | `100.0%` | `100.0%` | **`22.4% – 24.6%`（RESP3 本地 L1 拦截 94% 读请求）** |
| **数据一致性延迟（更新可见性）** | TTL 周期内不一致 | TTL 周期内不一致 | Cron 周期内不一致 | **`< 1.0 ms`（RESP3 `CLIENT TRACKING` 主动推送失效）** |
| **年化规避大促停机与扩容净省** | 基线 | 偶发锁超时雪崩 | DB 后台常年高负载 | **年化净省 `+$3,460,000 / yr`** |

---

## ⑤ 🧪 交互式应用工作台 Demo 与 7-Card 报告

1. **交互式工作台路径**：[`demos/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic-video-studio/`](../demos/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic-video-studio/)
   - 支持切换 **3 大分布式缓存高压故障场景**（`8.5万 QPS` 热点商品 Key 到期击穿、`42万 QPS` 突发头条单分片 100% CPU 饱和、大促整点 `50万 Key` 同步过期雪崩）；
   - 同屏可视化 **左视窗：XFetch + Singleflight 将 15,300 次 DB 穿透收敛为 1 次的三级漏斗** 与 **右视窗：Redis 分片 #11–#18 单核 CPU 负载从 100% 热点尖刺削平至 22.4% 的柱状图**。
2. **7-Card 4:5 视觉评测报告**：
   - 密封评测数据：[`docs/benchmarks/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic/summary.json`](./benchmarks/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic/summary.json)
   - 7-Card 高清图集：`card-1.png` 至 `card-7.png` 及矢量总览 [`summary-visual.svg`](./benchmarks/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic/summary-visual.svg)。

![分布式缓存防击穿雪崩 XFetch、Singleflight 与 L1 热点广播选型总览](./benchmarks/redis-valkey-cache-stampede-hot-key-singleflight-probabilistic/summary-visual.svg)

---

## ⑥ 🛠️ 企业视觉项目落地评审 Checklist

- [ ] **缓存结构体内置重算耗时 $\Delta$ 与软逻辑过期戳**：序列化进 Redis/Valkey 的 JSON/Protobuf 载荷是否包含 `recompute_ms` 与 `soft_expiry_ts` 字段以支持 `XFetch` 概率判定，同时将物理硬 TTL 设为软 TTL 的 `1.5×` 作为兜底？
- [ ] **进程内 `Singleflight` + 跨实例租约 Token 双重合并**：是否先在每个 K8s Pod 内部通过 `Singleflight` 合并同进程并发，再通过 Redis 短租约锁合并跨 Pod 并发，确保穿透至 DB 的并发数严格等于 `1`？
- [ ] **本地 L1 缓存内存上限（`Max-Size`）与 `RESP3` 断线全量清空保护**：应用进程内 L1 Near-Cache 是否严格限制最大条目数（如 Top `2,000` 热 Key），并在与 Redis 的 RESP3 连接闪断重连时立即清空本地 L1 防止脏读？
- [ ] **恶意不存在 Key 穿透防护（Null-Tombstone / Cuckoo Filter）**：针对恶意随机构造不存在商品 ID 的穿透攻击，是否配置短 TTL（`30s`）空值墓碑缓存或前置布谷鸟过滤器？
