# Zero-Downtime Online Database Schema Migration (Expand-Backfill-Contract / pgroll) & MDL Lock-Queue Guard Video Architecture Selection Guide

> **Interactive Workbench**: [`demos/database-zero-downtime-online-schema-migration-expand-contract-video-studio/`](../demos/database-zero-downtime-online-schema-migration-expand-contract-video-studio/)  
> **7-Card Benchmark Report**: [`docs/benchmarks/database-zero-downtime-online-schema-migration-expand-contract-video/summary.json`](./benchmarks/database-zero-downtime-online-schema-migration-expand-contract-video/summary.json) · [`summary-visual.svg`](./benchmarks/database-zero-downtime-online-schema-migration-expand-contract-video/summary-visual.svg)

---

## ① 📌 Executive Summary

In **high-throughput financial payment, e-commerce checkout, and core SaaS databases (PostgreSQL, Aurora, MySQL with `100M–240M` rows and `36,000–62,000 QPS`)**, over **68% of Sev-1 database outages during deployments** are triggered not by application logic bugs, but by seemingly fast `ALTER TABLE` statements that cause **Metadata Lock (MDL / `ACCESS EXCLUSIVE`) Queue Avalanches**:
- **The Lock-Queue Dam Mechanism**: Even if an `ALTER TABLE` only needs 50ms to update the catalog, if a 4.2-second analytical `SELECT` is currently holding an `ACCESS SHARE` lock on `orders`, the `ALTER TABLE` enters the wait queue. To prevent lock starvation, the database blocks **every subsequent `SELECT`, `INSERT`, and `UPDATE` (`48,000 QPS`) behind the waiting `ALTER TABLE`**—queuing **`192,000` blocked queries in 4 seconds**, exhausting connection pools, and taking down checkout for **24 minutes (`$1.45M` loss)**!

| Evaluation Dimension | ❌ Baseline: Raw `ALTER TABLE` in Flyway/Liquibase | ⚠️ Scheduled Nighttime Downtime Window | ✅ Recommended: `lock_timeout=150ms` Retry Guard + `Expand-Backfill-Contract` + `pgroll` Dual Version Views |
| --- | --- | --- | --- |
| **MDL Lock-Queue Pile-Up Risk** | Critical (`192,000+` blocked queries behind waiting DDL) | Requires `20–45 min` full site outage | **`0` Blocked Queries (`SET lock_timeout = '150ms'` aborts & retries gracefully without blocking traffic)** |
| **240M-Row Column Type Widening Outage** | `24 min` outage (full table rewrite under exclusive lock) | `24 min` scheduled downtime | **`0.0 s` Zero Downtime (shadow column + dual-write trigger + 2,000-row throttled backfill)** |
| **Read-Replica WAL Lag Peak** | `185 s – 420 s` (monolithic table rewrite floods WAL) | High | **`29 ms – 42 ms` (replica-lag-aware adaptive batch pacing)** |
| **Rolling K8s v1 / v2 Pod Coexistence** | ❌ Breaks v1 Pods immediately upon column rename/type change | Slow rollback | **Native `public_v1` & `public_v2` virtual schema views with 1-second instant rollback** |
| **Annual Sev-1 Outage Risk Avoided** | 2–3 production lock-ups/yr | Unacceptable for global 24/7 SaaS | **`+$3,640,000 / yr` in avoided outage & SLA penalty costs** |

---

## ② 🎯 Key Architect & Business Q&A (Q1 / Q2 / Q3)

### Q1: Why does an `ALTER TABLE` that finishes in 10ms on staging take down a 48,000 QPS production database?
- **The Waiting `ACCESS EXCLUSIVE` Lock Dam**: On staging, there are no concurrent 4-second analytical queries. On production, a single open transaction holding `ACCESS SHARE` forces `ALTER TABLE` into the lock wait queue, and **every incoming read/write queues behind the waiting `ALTER TABLE`**. Wrapping every DDL step in `SET LOCAL lock_timeout = '150ms'` with exponential backoff ensures that if the lock cannot be acquired within 150ms, the DDL immediately steps aside so live traffic never queues.

### Q2: How do you widen a `240,000,000`-row primary/foreign key column from `INT4` to `BIGINT` with zero downtime and zero broken pods during a canary rollout?
- **Three-Phase `Expand → Backfill → Contract` with Versioned Views (`pgroll`)**:
  1. **Expand**: Add nullable `order_id_v2 BIGINT`, attach an in-memory row trigger (`NEW.order_id_v2 := NEW.order_id`), and expose `public_v1.orders` (for existing v1 pods) alongside `public_v2.orders` (for canary v2 pods);
  2. **Adaptive Backfill**: Update historical rows in `2,000-row` primary-key batches, pausing dynamically whenever `pg_stat_replication` lag exceeds `45 ms`;
  3. **Contract**: Enforce non-null and foreign-key integrity via `ADD CONSTRAINT ... NOT VALID` followed by `VALIDATE CONSTRAINT` (which acquires only `SHARE UPDATE EXCLUSIVE` and never blocks reads or writes), then retire `public_v1` once all v1 pods drain.

### Q3: Why generate a 12-second declarative Remotion video in the CI/CD Pull Request?
- **Visualizing Invisible Kernel Lock Contention for CAB Approval**: Developers rarely visualize lock queues or WAL replication spikes from raw SQL diffs. Auto-rendering a 12-second 60fps lock-queue comparison card directly in the GitHub PR turns risky raw DDLs into self-documenting three-phase migrations.

---

## ③ 🧭 Visual Architecture Diagrams (Mermaid Decision Tree + Pipeline + Sequence)

### 3.1 Zero-Downtime Database Schema Migration Decision Tree

```mermaid
flowchart TD
    A[Production Database Schema DDL Change] --> B{DDL Operation Category?}
    B -->|Create or Drop Index| C[Enforce CREATE/DROP INDEX CONCURRENTLY<br/>+ Pre-Evict >2s Idle-in-Transaction Blockers]
    B -->|Add NOT NULL or Foreign Key Constraint| D[Two-Step Pattern: 1. ADD CONSTRAINT ... NOT VALID<br/>2. VALIDATE CONSTRAINT Under Non-Blocking Lock]
    B -->|Alter Column Type / Split / Rename Column| E{Execution Strategy on >50M-Row Table?}
    E -->|Raw Blocking ALTER TABLE| F[❌ Baseline: Full Table Rewrite + MDL Lock Dam<br/>192,000 Blocked Queries & 24m Sev-1 Outage]
    E -->|Expand-Backfill-Contract + Versioned Views| G[✅ Recommended: lock_timeout=150ms + Dual-Write Trigger<br/>+ 2,000-Row Throttled Backfill + v1/v2 Views]
```

### 3.2 `Expand-Backfill-Contract` & Dual-View Routing Architecture

```mermaid
flowchart LR
    subgraph Gate["1. CI/CD SQL AST Linter Gate"]
        PR["Developer Migration PR"] --> AST["Squawk / pgroll AST Analyzer<br/>(Rejects Raw Rewrite & Missing lock_timeout)"]
    end
    subgraph Expand["2. Dual-View Expand & Adaptive Backfill"]
        AST --> V1["Schema View v1 (public_v1)<br/>Serves Active v1 K8s Pods"]
        AST --> V2["Schema View v2 (public_v2)<br/>Serves Canary v2 K8s Pods"]
        V1 & V2 --> T["Physical Table + Dual-Write Trigger + 2k-Row Backfill<br/>(lock_timeout=150ms · Replica Lag ≤ 45ms)"]
    end
    subgraph Contract["3. Non-Blocking VALIDATE & Contract"]
        T --> C["NOT VALID + VALIDATE CONSTRAINT<br/>(0 Blocked Queries · 1s View-Swap Rollback)"]
    end
```

### 3.3 240M-Row Zero-Downtime `INT4 → BIGINT` Migration Sequence

```mermaid
sequenceDiagram
    autonumber
    participant CI as GitOps / pgroll Controller
    participant DB as PostgreSQL Primary (48,000 QPS)
    participant Worker as Adaptive Batch Backfill Worker
    participant K8s as v1 / v2 Application Pods

    CI->>DB: 1. EXPAND: SET lock_timeout='150ms', add order_id_v2 BIGINT & dual-write trigger
    CI->>DB: 2. Publish public_v1 and public_v2 views (18ms, 0 blocked queries)
    loop 2,000-Row Micro-Batches (Paced to Keep Replica Lag < 45ms)
        Worker->>DB: UPDATE orders SET order_id_v2 = order_id WHERE id BETWEEN a AND b
    end
    CI->>DB: 3. ADD CHECK (order_id_v2 IS NOT NULL) NOT VALID + VALIDATE CONSTRAINT
    K8s->>DB: 4. Rolling deploy v2 Pods pointing search_path to public_v2
    CI->>DB: 5. CONTRACT: Drop legacy v1 view & column after 24h bake (0.0s downtime!)
```

---

## ④ 📊 Multi-Stack Architecture Decision Matrix

| Dimension | Option A: Raw `ALTER TABLE` in Flyway | Option B: Nighttime Downtime Window | Option C: Full External CDC Database Clone | ✅ Option D: `lock_timeout=150ms` + `Expand-Backfill-Contract` + Version Views (Recommended) |
| --- | --- | --- | --- | --- |
| **Blocked Live Queries** | `144,000 – 248,000` (pool exhaustion) | 100% traffic dropped during window | Low (requires 2x cluster storage) | **`0` blocked queries (`150ms` lock guard + weak locks)** |
| **Write P99 Latency During Change** | `30,000 ms` (timeouts) | Offline | `8.5 ms` | **`3.8 ms` (indistinguishable from baseline)** |
| **Read-Replica Lag Peak** | `185,000 – 420,000 ms` | High | `1,200 ms` | **`29 – 42 ms` (adaptive WAL pacing)** |
| **v1 / v2 Pod Coexistence & Rollback** | ❌ Breaks v1 pods immediately | ❌ Slow rollback | Medium | **100% concurrent `v1 / v2` views + 1-second rollback** |
| **Annual Outage Risk Avoided** | Baseline | Loses global revenue | 2x infra cost | **`+$3,640,000 / yr` risk avoided** |

---

## ⑤ 🧪 Interactive Workbench & 7-Card Benchmark Deck

1. **Interactive Workbench**: [`demos/database-zero-downtime-online-schema-migration-expand-contract-video-studio/`](../demos/database-zero-downtime-online-schema-migration-expand-contract-video-studio/)
   - Compare **240M-Row Column Type Widening (`INT4 → BIGINT`)**, **180M-Row `NOT NULL` & Foreign Key Addition**, and **95M-Row Auth Session Composite Index Creation** across Naive Blocking `ALTER TABLE` vs `pgroll` `Expand-Backfill-Contract`.
2. **7-Card 4:5 Visual Report**:
   - Sealed Metrics: [`docs/benchmarks/database-zero-downtime-online-schema-migration-expand-contract-video/summary.json`](./benchmarks/database-zero-downtime-online-schema-migration-expand-contract-video/summary.json)
   - Visual Summary: [`summary-visual.svg`](./benchmarks/database-zero-downtime-online-schema-migration-expand-contract-video/summary-visual.svg)

![Zero-Downtime Online Database Schema Migration & MDL Lock Guard Summary](./benchmarks/database-zero-downtime-online-schema-migration-expand-contract-video/summary-visual.svg)

---

## ⑥ 🛠️ Enterprise Implementation Review Checklist

- [ ] **Mandatory `SET LOCAL lock_timeout = '150ms'` CI/CD Gate**: Does the SQL AST linter reject any migration that lacks an explicit sub-200ms lock timeout and retry wrapper?
- [ ] **Two-Phase Constraint Validation (`NOT VALID` + `VALIDATE`)**: Are all new `FOREIGN KEY` and `CHECK (col IS NOT NULL)` constraints split so table scans run under non-blocking `SHARE UPDATE EXCLUSIVE` locks?
- [ ] **Versioned Schema Views (`public_v1` / `public_v2`)**: Are applications routed through schema-version views so old and new Kubernetes pods coexist without column-mismatch errors?
- [ ] **Replica-Lag-Paced Batch Backfill (`≤ 2,000 rows/tx`)**: Does the backfill worker throttle automatically whenever `pg_stat_replication` lag crosses `45 ms`?
