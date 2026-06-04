// One-shot generator: writes a stub MDX file for every topic that does not
// already exist on disk. Safe to re-run — never overwrites existing content.
//
// Usage: node scripts/generate-stubs.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'topics');

// Mirror of src/data/domains.ts — keep them aligned by hand when adding topics.
const DOMAINS = [
  ['foundations', [
    ['advanced-sql', 'Advanced SQL', 'Window functions, CTEs, recursive queries, set operations, query plans.'],
    ['query-optimization', 'Query Optimization', 'Indexing strategies, EXPLAIN plans, statistics, join algorithms, cost-based optimizers.'],
    ['cs-fundamentals', 'CS Fundamentals for DE', 'Data structures, complexity, hashing, sorting, partitioning, serialization formats.'],
    ['distributed-systems', 'Distributed Systems', 'CAP, consistency models, partitioning, replication, consensus, failure modes.'],
    ['file-formats', 'File Formats & Serialization', 'Parquet, ORC, Avro, JSON, columnar vs row, compression, schema evolution.'],
  ]],
  ['python', [
    ['typing-and-generics', 'Typing & Generics', 'PEP 484/612/695, Protocols, TypeVars, ParamSpec, mypy strict mode.'],
    ['dataclasses-and-pydantic', 'Dataclasses & Pydantic', 'When to reach for each, validation, serialization, settings management.'],
    ['async-and-concurrency', 'Async & Concurrency', 'asyncio, threads vs processes, GIL, when each makes sense in DE workloads.'],
    ['generators-and-iterators', 'Generators & Iterators', 'Lazy evaluation, itertools, streaming large datasets without OOM.'],
    ['performance', 'Performance & Profiling', 'cProfile, py-spy, memory_profiler, vectorization, when to drop to Polars/numpy.'],
    ['packaging-and-tooling', 'Packaging & Tooling', 'uv, pyproject.toml, lock files, ruff, mypy — the modern stack.'],
    ['testing', 'Testing', 'pytest fixtures, parametrize, property-based testing with Hypothesis, mocking external services.'],
  ]],
  ['data-modeling', [
    ['dimensional-modeling', 'Dimensional Modeling', 'Kimball method, star vs snowflake, fact and dimension tables, SCD types 1–6, factless facts.'],
    ['data-vault', 'Data Vault 2.0', 'Hubs, links, satellites, business keys, when DV is worth the overhead.'],
    ['one-big-table', 'One Big Table (OBT)', 'Denormalized analytics tables, when OBT beats stars on cloud warehouses.'],
    ['normalization', 'Normalization', '1NF through BCNF, when to normalize vs denormalize, OLTP vs OLAP shapes.'],
    ['lakehouse-architecture', 'Lakehouse Architecture', 'Storage + table format + compute separation, Delta/Iceberg/Hudi, Medallion pattern.'],
    ['data-mesh-and-fabric', 'Data Mesh & Fabric', 'Domain ownership, data-as-a-product, federated governance, when mesh fails.'],
    ['lambda-and-kappa', 'Lambda & Kappa Architectures', 'Batch + speed layer trade-offs, the case for a single streaming pipeline.'],
    ['architecture-trade-offs', 'Trade-off Analysis & ADRs', 'How to frame, document, and defend architecture decisions.'],
  ]],
  ['spark', [
    ['pyspark-api', 'PySpark API', 'DataFrames, Datasets, RDDs — when each fits, idiomatic transformations.'],
    ['spark-sql', 'Spark SQL', 'Catalyst optimizer, predicate pushdown, the SQL ↔ DataFrame equivalence.'],
    ['partitioning', 'Partitioning & Bucketing', 'Repartition vs coalesce, partition pruning, bucketing for join performance.'],
    ['joins-and-shuffles', 'Joins & Shuffles', 'Broadcast vs shuffle joins, sort-merge, skew detection and mitigation.'],
    ['aqe-and-tungsten', 'AQE, Catalyst & Tungsten', 'Adaptive Query Execution, whole-stage codegen, memory management.'],
    ['caching-and-persistence', 'Caching & Persistence', 'Storage levels, when caching helps vs hurts, broadcast variables.'],
    ['spark-ui-debugging', 'Spark UI & Debugging', 'Reading the DAG, stage breakdown, identifying skew and shuffle problems.'],
    ['performance-tuning', 'Performance Tuning Playbook', 'A practical checklist from config to code for taming slow jobs.'],
  ]],
  ['streaming', [
    ['kafka-fundamentals', 'Kafka Fundamentals', 'Topics, partitions, brokers, producers, consumers, consumer groups.'],
    ['kafka-semantics', 'Delivery Semantics', 'At-most-once, at-least-once, exactly-once, idempotent producers, transactions.'],
    ['structured-streaming', 'Spark Structured Streaming', 'Micro-batch and continuous modes, sources, sinks, checkpointing.'],
    ['flink', 'Apache Flink', 'True streaming engine, state, savepoints, when Flink beats Spark.'],
    ['windowing', 'Windowing & Watermarks', 'Tumbling, sliding, session windows, late data, event time vs processing time.'],
    ['stateful-processing', 'Stateful Processing', 'Keyed state, state backends, TTL, exactly-once with state.'],
    ['cdc-patterns', 'Change Data Capture', 'Debezium, Delta CDF, log-based CDC vs query-based, common pitfalls.'],
  ]],
  ['orchestration', [
    ['airflow-core', 'Airflow Core Concepts', 'DAGs, operators, executors, schedulers, XComs.'],
    ['airflow-advanced', 'Airflow Advanced', 'Deferrable operators, sensors, dynamic task mapping, the TaskFlow API.'],
    ['dagster', 'Dagster', 'Asset-centric model, ops vs jobs, IO managers, software-defined assets.'],
    ['scheduling-patterns', 'Scheduling Patterns', 'Cron expressions, data intervals, sensor patterns, event-driven triggers.'],
    ['idempotency-and-retries', 'Idempotency & Retries', 'Why every task must be idempotent, designing retries that do not duplicate.'],
    ['backfills-and-replays', 'Backfills & Replays', 'Catchup, designing pipelines that can be safely re-run, partitioned execution.'],
  ]],
  ['data-quality', [
    ['dbt-core', 'dbt Core Concepts', 'Models, materializations, sources, refs, the DAG of SQL.'],
    ['dbt-testing', 'dbt Tests & Macros', 'Built-in tests, custom generic tests, macros, packages, snapshots.'],
    ['data-contracts', 'Data Contracts', 'Producer-consumer contracts, schema enforcement, contract testing.'],
    ['expectations-and-soda', 'Great Expectations & Soda', 'Expectation suites, data docs, Soda checks, comparing the two.'],
    ['observability', 'Data Observability', 'Freshness, volume, schema, distribution, lineage — the five pillars.'],
    ['openlineage', 'OpenLineage & Lineage Tooling', 'OpenLineage spec, Marquez, integrations with Airflow/Spark/dbt.'],
  ]],
  ['cloud', [
    ['aws-s3', 'AWS — S3', 'Storage classes, lifecycle, request patterns, performance, security, costs.'],
    ['aws-glue', 'AWS — Glue', 'Data Catalog, Glue Jobs, Crawlers, Glue Studio, DynamicFrames vs DataFrames.'],
    ['aws-lake-formation', 'AWS — Lake Formation', 'Fine-grained access, LF-Tags, integration with Glue and Athena.'],
    ['aws-athena', 'AWS — Athena', 'Serverless SQL on S3, partitioning, workgroups, federated queries.'],
    ['aws-redshift', 'AWS — Redshift', 'RA3 nodes, distribution/sort keys, materialized views, Spectrum, Serverless.'],
    ['aws-emr', 'AWS — EMR', 'Managed Spark/Hadoop, EMR on EKS, EMR Serverless, when to choose each.'],
    ['aws-lambda-and-step-functions', 'AWS — Lambda & Step Functions', 'Event-driven ingestion, orchestration without a server, design patterns.'],
    ['aws-mwaa', 'AWS — MWAA (Managed Airflow)', 'Configuration, scaling, comparing to self-hosted Airflow.'],
    ['aws-kinesis-and-msk', 'AWS — Kinesis & MSK', 'Data Streams, Firehose, MSK Connect, when to pick Kinesis vs managed Kafka.'],
    ['aws-iam-for-data', 'AWS — IAM Patterns for Data', 'Roles, policies, KMS, VPC endpoints, common security mistakes.'],
    ['azure-overview', 'Azure — Comparative Overview', 'ADLS Gen2, Synapse, Data Factory, Event Hubs, Purview, Azure Databricks.'],
    ['gcp-overview', 'GCP — Comparative Overview', 'BigQuery, Dataflow, Pub/Sub, Dataproc, Cloud Composer.'],
    ['cross-cloud-cheatsheet', 'Cross-Cloud Cheat Sheet', 'Service-by-service mapping: storage, warehouse, streaming, orchestration.'],
  ]],
  ['databricks', [
    ['delta-lake-fundamentals', 'Delta Lake Fundamentals', 'ACID transactions, transaction log, parquet + JSON foundation.'],
    ['delta-features', 'Delta Advanced Features', 'Time travel, schema evolution, column mapping, table constraints, CLONE.'],
    ['delta-optimization', 'Delta Optimization', 'OPTIMIZE, Z-Ordering, liquid clustering, VACUUM, file sizing.'],
    ['delta-cdc-and-cdf', 'Delta CDC & Change Data Feed', 'CDF semantics, downstream consumers, CDC ingestion patterns.'],
    ['unity-catalog', 'Unity Catalog', 'Metastore, catalog/schema/table hierarchy, lineage, volumes, governance.'],
    ['lakeflow-and-dlt', 'Lakeflow Jobs & DLT', 'Declarative pipelines, expectations, streaming tables, materialized views.'],
    ['photon', 'Photon Engine', 'Native vectorized engine, when Photon wins, when it does not.'],
    ['databricks-sql', 'Databricks SQL', 'SQL Warehouses, dashboards, Genie, serverless vs classic.'],
    ['cost-and-performance', 'Cost & Performance', 'Cluster sizing, autoscaling, spot, photon trade-offs, DBU economics.'],
    ['mlflow-basics', 'MLflow Basics', 'Tracking, models, registry — the minimum a DE should know.'],
  ]],
  ['devops', [
    ['git-workflows', 'Git Workflows for Data', 'Trunk-based vs Git Flow, env branching, monorepos vs polyrepos for DE.'],
    ['cicd-for-data', 'CI/CD for Data', 'GitHub Actions and Azure DevOps patterns, dbt CI, Databricks asset bundles.'],
    ['terraform-for-data', 'Terraform for Data', 'IaC for S3, Glue, Redshift, Databricks workspaces, state management.'],
    ['docker-fundamentals', 'Docker for DE', 'Dockerfile patterns, multi-stage builds, image scanning, registry workflows.'],
    ['kubernetes-basics', 'Kubernetes Basics', 'What a DE needs to know about K8s, Spark on K8s, KEDA for scaling.'],
    ['secrets-and-env', 'Secrets & Environment Management', 'AWS Secrets Manager, env promotion, never commit credentials.'],
  ]],
  ['governance', [
    ['gdpr-and-ccpa', 'GDPR, CCPA & Friends', 'Data subject rights, lawful bases, deletion, the engineering implications.'],
    ['pii-and-classification', 'PII Handling & Classification', 'Tagging, masking, tokenization, pseudonymization, when to encrypt at field level.'],
    ['rbac-and-abac', 'Access Control: RBAC vs ABAC', 'Roles, attributes, when each scales, integrating with Unity Catalog / Lake Formation.'],
    ['encryption', 'Encryption At Rest & In Transit', 'KMS patterns, customer-managed keys, TLS everywhere, key rotation.'],
    ['audit-and-retention', 'Audit, Retention & Lineage', 'CloudTrail / activity logs, retention policies, lineage as compliance evidence.'],
    ['compliance-frameworks', 'Compliance Frameworks', 'SOC 2, HIPAA, PCI-DSS — what each demands of a data platform.'],
  ]],
  ['system-design', [
    ['interview-framework', 'The Interview Framework', 'A repeatable structure: requirements → estimate → API → storage → compute → scale.'],
    ['trade-off-thinking', 'Trade-off Thinking', 'Consistency vs availability, cost vs latency, batch vs stream — articulating the choice.'],
    ['capacity-planning', 'Capacity Planning', 'Back-of-envelope: rows, bytes, RPS, storage growth, cluster sizing.'],
    ['fault-tolerance', 'Fault Tolerance Patterns', 'Idempotency, dead-letter queues, circuit breakers, retry with backoff, DR.'],
    ['slas-and-slos', 'SLAs, SLOs & Error Budgets', 'Defining freshness, accuracy, availability, and how to negotiate them.'],
    ['case-clickstream', 'Case Study — Clickstream Pipeline', 'A web-scale event ingestion + analytics design, end to end.'],
    ['case-cdc-ingestion', 'Case Study — CDC Ingestion', 'Operational DB → lakehouse with exactly-once semantics.'],
    ['case-real-time-fraud', 'Case Study — Real-Time Fraud Detection', 'Streaming feature store, model serving, low-latency decisioning.'],
  ]],
  ['soft-skills', [
    ['stakeholder-management', 'Stakeholder Management', 'Mapping stakeholders, managing up, translating tech to business outcomes.'],
    ['technical-writing', 'Technical Writing', 'ADRs, RFCs, design docs, runbooks — writing that scales decisions.'],
    ['estimation-and-scoping', 'Estimation & Scoping', 'Breaking down work, three-point estimates, communicating uncertainty.'],
    ['mentoring-juniors', 'Mentoring & Coaching Juniors', 'Code review as teaching, pairing, growth conversations.'],
    ['leading-design-reviews', 'Leading Design Reviews', 'Running the room, surfacing dissent, driving to decisions.'],
    ['presenting-to-non-tech', 'Presenting to Non-Technical Audiences', 'Executive summaries, the pyramid principle, telling the story of the data.'],
    ['consulting-playbook', 'The Consulting Playbook', 'Discovery, scoping, delivery, handover — the engagement lifecycle.'],
    ['async-communication', 'Async Communication', 'Writing for distributed teams, the rule of three, when to call a meeting.'],
  ]],
];

const yamlEscape = (s) => s.replace(/"/g, '\\"');

const template = (title, summary, domain) => `---
title: "${yamlEscape(title)}"
domain: "${domain}"
summary: "${yamlEscape(summary)}"
status: stub
---

## Overview

> _Stub. Notes will accumulate here as I study._

A short orientation goes here: what this topic is, why it matters for a
senior data engineer, and where it sits in the bigger picture.

## Core concepts

- Concept 1 — _to be filled in_
- Concept 2 — _to be filled in_
- Concept 3 — _to be filled in_

## Practical patterns

How this shows up in real systems. Common idioms, mistakes I have seen,
and the rules of thumb worth memorizing.

## Case studies

Worked examples — small enough to read in one sitting, real enough to
remember. _(Cases live alongside the topic they teach.)_

## References

- Primary source 1
- Primary source 2
- Primary source 3
`;

let created = 0;
let skipped = 0;

for (const [domain, topics] of DOMAINS) {
  const dir = path.join(CONTENT_DIR, domain);
  fs.mkdirSync(dir, { recursive: true });
  for (const [slug, title, summary] of topics) {
    const file = path.join(dir, `${slug}.mdx`);
    if (fs.existsSync(file)) {
      skipped += 1;
      continue;
    }
    fs.writeFileSync(file, template(title, summary, domain), 'utf8');
    created += 1;
  }
}

console.log(`Generated ${created} stubs · skipped ${skipped} existing files`);
