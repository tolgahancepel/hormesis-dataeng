// Single source of truth for the site's information architecture.
// Each domain belongs to a tier (1 = foundations → 4 = senior craft) and
// owns an ordered list of topic stubs (each maps to an MDX file in
// src/content/topics/<domain>/<topic>.mdx).

export type Topic = {
  slug: string;
  title: string;
  summary: string;
};

export type Domain = {
  slug: string;
  title: string;
  tier: 1 | 2 | 3 | 4;
  order: number;
  tagline: string;
  description: string;
  topics: Topic[];
};

export const tiers: Record<1 | 2 | 3 | 4, { label: string; blurb: string }> = {
  1: {
    label: 'Foundations',
    blurb: 'The bedrock — SQL, Python, modeling, distributed systems.',
  },
  2: {
    label: 'Core Engineering',
    blurb: 'Building and operating production data systems.',
  },
  3: {
    label: 'Platforms',
    blurb: 'The clouds and the lakehouse where everything runs.',
  },
  4: {
    label: 'Production & Senior Craft',
    blurb: 'What separates a senior engineer from a strong mid-level one.',
  },
};

export const domains: Domain[] = [
  // ── Tier 1 ────────────────────────────────────────────────
  {
    slug: 'foundations',
    title: 'Foundations',
    tier: 1,
    order: 1,
    tagline: 'SQL, computer science, and distributed systems fundamentals.',
    description:
      'The non-negotiable base layer. Advanced SQL, the CS concepts that show up in data work daily, and the distributed-systems mental models you will reach for in every architecture discussion.',
    topics: [
      { slug: 'advanced-sql', title: 'Advanced SQL', summary: 'Window functions, CTEs, recursive queries, set operations, query plans.' },
      { slug: 'query-optimization', title: 'Query Optimization', summary: 'Indexing strategies, EXPLAIN plans, statistics, join algorithms, cost-based optimizers.' },
      { slug: 'cs-fundamentals', title: 'CS Fundamentals for DE', summary: 'Data structures, complexity, hashing, sorting, partitioning, serialization formats.' },
      { slug: 'distributed-systems', title: 'Distributed Systems', summary: 'CAP, consistency models, partitioning, replication, consensus, failure modes.' },
      { slug: 'file-formats', title: 'File Formats & Serialization', summary: 'Parquet, ORC, Avro, JSON, columnar vs row, compression, schema evolution.' },
    ],
  },
  {
    slug: 'python',
    title: 'Python for Data Engineering',
    tier: 1,
    order: 2,
    tagline: 'Senior-level Python idioms beyond pandas-and-print().',
    description:
      'Python the way a senior engineer writes it — typed, tested, profiled, packaged. The bar is higher than "the script runs."',
    topics: [
      { slug: 'typing-and-generics', title: 'Typing & Generics', summary: 'PEP 484/612/695, Protocols, TypeVars, ParamSpec, mypy strict mode.' },
      { slug: 'dataclasses-and-pydantic', title: 'Dataclasses & Pydantic', summary: 'When to reach for each, validation, serialization, settings management.' },
      { slug: 'async-and-concurrency', title: 'Async & Concurrency', summary: 'asyncio, threads vs processes, GIL, when each makes sense in DE workloads.' },
      { slug: 'generators-and-iterators', title: 'Generators & Iterators', summary: 'Lazy evaluation, itertools, streaming large datasets without OOM.' },
      { slug: 'performance', title: 'Performance & Profiling', summary: 'cProfile, py-spy, memory_profiler, vectorization, when to drop to Polars/numpy.' },
      { slug: 'packaging-and-tooling', title: 'Packaging & Tooling', summary: 'uv, pyproject.toml, lock files, ruff, mypy — the modern stack.' },
      { slug: 'testing', title: 'Testing', summary: 'pytest fixtures, parametrize, property-based testing with Hypothesis, mocking external services.' },
    ],
  },
  {
    slug: 'data-modeling',
    title: 'Data Modeling & Architecture',
    tier: 1,
    order: 3,
    tagline: 'How data is shaped, where it lives, and why.',
    description:
      'The deepest mid→senior gap. Modeling techniques (Kimball, Data Vault, OBT), architectural patterns (Lakehouse, Mesh, Lambda/Kappa), and the trade-off thinking that produces defensible decisions.',
    topics: [
      { slug: 'dimensional-modeling', title: 'Dimensional Modeling', summary: 'Kimball method, star vs snowflake, fact and dimension tables, SCD types 1–6, factless facts.' },
      { slug: 'data-vault', title: 'Data Vault 2.0', summary: 'Hubs, links, satellites, business keys, when DV is worth the overhead.' },
      { slug: 'one-big-table', title: 'One Big Table (OBT)', summary: 'Denormalized analytics tables, when OBT beats stars on cloud warehouses.' },
      { slug: 'normalization', title: 'Normalization', summary: '1NF through BCNF, when to normalize vs denormalize, OLTP vs OLAP shapes.' },
      { slug: 'lakehouse-architecture', title: 'Lakehouse Architecture', summary: 'Storage + table format + compute separation, Delta/Iceberg/Hudi, Medallion pattern.' },
      { slug: 'data-mesh-and-fabric', title: 'Data Mesh & Fabric', summary: 'Domain ownership, data-as-a-product, federated governance, when mesh fails.' },
      { slug: 'lambda-and-kappa', title: 'Lambda & Kappa Architectures', summary: 'Batch + speed layer trade-offs, the case for a single streaming pipeline.' },
      { slug: 'architecture-trade-offs', title: 'Trade-off Analysis & ADRs', summary: 'How to frame, document, and defend architecture decisions.' },
    ],
  },

  // ── Tier 2 ────────────────────────────────────────────────
  {
    slug: 'spark',
    title: 'Apache Spark & Distributed Compute',
    tier: 2,
    order: 1,
    tagline: 'PySpark deep-dive, internals, and the performance playbook.',
    description:
      'Spark from the API down to Catalyst and Tungsten. Knowing the engine is the difference between a 6-hour job and a 45-minute one.',
    topics: [
      { slug: 'pyspark-api', title: 'PySpark API', summary: 'DataFrames, Datasets, RDDs — when each fits, idiomatic transformations.' },
      { slug: 'spark-sql', title: 'Spark SQL', summary: 'Catalyst optimizer, predicate pushdown, the SQL ↔ DataFrame equivalence.' },
      { slug: 'partitioning', title: 'Partitioning & Bucketing', summary: 'Repartition vs coalesce, partition pruning, bucketing for join performance.' },
      { slug: 'joins-and-shuffles', title: 'Joins & Shuffles', summary: 'Broadcast vs shuffle joins, sort-merge, skew detection and mitigation.' },
      { slug: 'aqe-and-tungsten', title: 'AQE, Catalyst & Tungsten', summary: 'Adaptive Query Execution, whole-stage codegen, memory management.' },
      { slug: 'caching-and-persistence', title: 'Caching & Persistence', summary: 'Storage levels, when caching helps vs hurts, broadcast variables.' },
      { slug: 'spark-ui-debugging', title: 'Spark UI & Debugging', summary: 'Reading the DAG, stage breakdown, identifying skew and shuffle problems.' },
      { slug: 'performance-tuning', title: 'Performance Tuning Playbook', summary: 'A practical checklist from config to code for taming slow jobs.' },
    ],
  },
  {
    slug: 'streaming',
    title: 'Streaming & Real-Time Data',
    tier: 2,
    order: 2,
    tagline: 'Kafka, Structured Streaming, Flink, and the semantics that bite.',
    description:
      'Streaming is now table stakes for mid-to-senior data engineers. Cover the messaging layer, the processing layer, and the semantics that separate "it usually works" from "exactly-once."',
    topics: [
      { slug: 'kafka-fundamentals', title: 'Kafka Fundamentals', summary: 'Topics, partitions, brokers, producers, consumers, consumer groups.' },
      { slug: 'kafka-semantics', title: 'Delivery Semantics', summary: 'At-most-once, at-least-once, exactly-once, idempotent producers, transactions.' },
      { slug: 'structured-streaming', title: 'Spark Structured Streaming', summary: 'Micro-batch and continuous modes, sources, sinks, checkpointing.' },
      { slug: 'flink', title: 'Apache Flink', summary: 'True streaming engine, state, savepoints, when Flink beats Spark.' },
      { slug: 'windowing', title: 'Windowing & Watermarks', summary: 'Tumbling, sliding, session windows, late data, event time vs processing time.' },
      { slug: 'stateful-processing', title: 'Stateful Processing', summary: 'Keyed state, state backends, TTL, exactly-once with state.' },
      { slug: 'cdc-patterns', title: 'Change Data Capture', summary: 'Debezium, Delta CDF, log-based CDC vs query-based, common pitfalls.' },
    ],
  },
  {
    slug: 'orchestration',
    title: 'Orchestration & Workflow',
    tier: 2,
    order: 3,
    tagline: 'Airflow, Dagster, and the discipline of reliable pipelines.',
    description:
      'Orchestration is where data engineering becomes operations. Idempotency, retries, backfills, and dependency design make or break a platform.',
    topics: [
      { slug: 'airflow-core', title: 'Airflow Core Concepts', summary: 'DAGs, operators, executors, schedulers, XComs.' },
      { slug: 'airflow-advanced', title: 'Airflow Advanced', summary: 'Deferrable operators, sensors, dynamic task mapping, the TaskFlow API.' },
      { slug: 'dagster', title: 'Dagster', summary: 'Asset-centric model, ops vs jobs, IO managers, software-defined assets.' },
      { slug: 'scheduling-patterns', title: 'Scheduling Patterns', summary: 'Cron expressions, data intervals, sensor patterns, event-driven triggers.' },
      { slug: 'idempotency-and-retries', title: 'Idempotency & Retries', summary: 'Why every task must be idempotent, designing retries that do not duplicate.' },
      { slug: 'backfills-and-replays', title: 'Backfills & Replays', summary: 'Catchup, designing pipelines that can be safely re-run, partitioned execution.' },
    ],
  },
  {
    slug: 'data-quality',
    title: 'Data Quality, Testing & Observability',
    tier: 2,
    order: 4,
    tagline: 'dbt tests, contracts, lineage, and how you know it broke.',
    description:
      'Senior engineers build feedback loops. Tests that fail loudly, contracts that prevent breakage, observability that surfaces silent drift.',
    topics: [
      { slug: 'dbt-core', title: 'dbt Core Concepts', summary: 'Models, materializations, sources, refs, the DAG of SQL.' },
      { slug: 'dbt-testing', title: 'dbt Tests & Macros', summary: 'Built-in tests, custom generic tests, macros, packages, snapshots.' },
      { slug: 'data-contracts', title: 'Data Contracts', summary: 'Producer-consumer contracts, schema enforcement, contract testing.' },
      { slug: 'expectations-and-soda', title: 'Great Expectations & Soda', summary: 'Expectation suites, data docs, Soda checks, comparing the two.' },
      { slug: 'observability', title: 'Data Observability', summary: 'Freshness, volume, schema, distribution, lineage — the five pillars.' },
      { slug: 'openlineage', title: 'OpenLineage & Lineage Tooling', summary: 'OpenLineage spec, Marquez, integrations with Airflow/Spark/dbt.' },
    ],
  },

  // ── Tier 3 ────────────────────────────────────────────────
  {
    slug: 'cloud',
    title: 'Cloud Platforms',
    tier: 3,
    order: 1,
    tagline: 'AWS deep-dive with comparative Azure and GCP coverage.',
    description:
      'Cloud is where data engineering happens in 2026. Go deep on AWS (largest market share, primary focus) and keep working knowledge of Azure and GCP for cross-cloud conversations.',
    topics: [
      // AWS deep
      { slug: 'aws-s3', title: 'AWS — S3', summary: 'Storage classes, lifecycle, request patterns, performance, security, costs.' },
      { slug: 'aws-glue', title: 'AWS — Glue', summary: 'Data Catalog, Glue Jobs, Crawlers, Glue Studio, DynamicFrames vs DataFrames.' },
      { slug: 'aws-lake-formation', title: 'AWS — Lake Formation', summary: 'Fine-grained access, LF-Tags, integration with Glue and Athena.' },
      { slug: 'aws-athena', title: 'AWS — Athena', summary: 'Serverless SQL on S3, partitioning, workgroups, federated queries.' },
      { slug: 'aws-redshift', title: 'AWS — Redshift', summary: 'RA3 nodes, distribution/sort keys, materialized views, Spectrum, Serverless.' },
      { slug: 'aws-emr', title: 'AWS — EMR', summary: 'Managed Spark/Hadoop, EMR on EKS, EMR Serverless, when to choose each.' },
      { slug: 'aws-lambda-and-step-functions', title: 'AWS — Lambda & Step Functions', summary: 'Event-driven ingestion, orchestration without a server, design patterns.' },
      { slug: 'aws-mwaa', title: 'AWS — MWAA (Managed Airflow)', summary: 'Configuration, scaling, comparing to self-hosted Airflow.' },
      { slug: 'aws-kinesis-and-msk', title: 'AWS — Kinesis & MSK', summary: 'Data Streams, Firehose, MSK Connect, when to pick Kinesis vs managed Kafka.' },
      { slug: 'aws-iam-for-data', title: 'AWS — IAM Patterns for Data', summary: 'Roles, policies, KMS, VPC endpoints, common security mistakes.' },
      // Azure overview
      { slug: 'azure-overview', title: 'Azure — Comparative Overview', summary: 'ADLS Gen2, Synapse, Data Factory, Event Hubs, Purview, Azure Databricks.' },
      // GCP overview
      { slug: 'gcp-overview', title: 'GCP — Comparative Overview', summary: 'BigQuery, Dataflow, Pub/Sub, Dataproc, Cloud Composer.' },
      { slug: 'cross-cloud-cheatsheet', title: 'Cross-Cloud Cheat Sheet', summary: 'Service-by-service mapping: storage, warehouse, streaming, orchestration.' },
    ],
  },
  {
    slug: 'databricks',
    title: 'Databricks Platform',
    tier: 3,
    order: 2,
    tagline: 'Delta Lake, Unity Catalog, and the lakehouse in practice.',
    description:
      'Databricks is the platform you will most likely build on. Delta Lake internals, Unity Catalog governance, and the performance levers that matter.',
    topics: [
      { slug: 'delta-lake-fundamentals', title: 'Delta Lake Fundamentals', summary: 'ACID transactions, transaction log, parquet + JSON foundation.' },
      { slug: 'delta-features', title: 'Delta Advanced Features', summary: 'Time travel, schema evolution, column mapping, table constraints, CLONE.' },
      { slug: 'delta-optimization', title: 'Delta Optimization', summary: 'OPTIMIZE, Z-Ordering, liquid clustering, VACUUM, file sizing.' },
      { slug: 'delta-cdc-and-cdf', title: 'Delta CDC & Change Data Feed', summary: 'CDF semantics, downstream consumers, CDC ingestion patterns.' },
      { slug: 'unity-catalog', title: 'Unity Catalog', summary: 'Metastore, catalog/schema/table hierarchy, lineage, volumes, governance.' },
      { slug: 'lakeflow-and-dlt', title: 'Lakeflow Jobs & DLT', summary: 'Declarative pipelines, expectations, streaming tables, materialized views.' },
      { slug: 'photon', title: 'Photon Engine', summary: 'Native vectorized engine, when Photon wins, when it does not.' },
      { slug: 'databricks-sql', title: 'Databricks SQL', summary: 'SQL Warehouses, dashboards, Genie, serverless vs classic.' },
      { slug: 'cost-and-performance', title: 'Cost & Performance', summary: 'Cluster sizing, autoscaling, spot, photon trade-offs, DBU economics.' },
      { slug: 'mlflow-basics', title: 'MLflow Basics', summary: 'Tracking, models, registry — the minimum a DE should know.' },
    ],
  },

  // ── Tier 4 ────────────────────────────────────────────────
  {
    slug: 'devops',
    title: 'DevOps, IaC & Platform Engineering',
    tier: 4,
    order: 1,
    tagline: 'Git, CI/CD, Terraform, containers — DE that ships.',
    description:
      'Senior engineers own the path from laptop to production. Git discipline, repeatable CI/CD for data, infrastructure as code, and the container basics.',
    topics: [
      { slug: 'git-workflows', title: 'Git Workflows for Data', summary: 'Trunk-based vs Git Flow, env branching, monorepos vs polyrepos for DE.' },
      { slug: 'cicd-for-data', title: 'CI/CD for Data', summary: 'GitHub Actions and Azure DevOps patterns, dbt CI, Databricks asset bundles.' },
      { slug: 'terraform-for-data', title: 'Terraform for Data', summary: 'IaC for S3, Glue, Redshift, Databricks workspaces, state management.' },
      { slug: 'docker-fundamentals', title: 'Docker for DE', summary: 'Dockerfile patterns, multi-stage builds, image scanning, registry workflows.' },
      { slug: 'kubernetes-basics', title: 'Kubernetes Basics', summary: 'What a DE needs to know about K8s, Spark on K8s, KEDA for scaling.' },
      { slug: 'secrets-and-env', title: 'Secrets & Environment Management', summary: 'AWS Secrets Manager, env promotion, never commit credentials.' },
    ],
  },
  {
    slug: 'governance',
    title: 'Data Governance & Security',
    tier: 4,
    order: 2,
    tagline: 'Compliance, access control, lineage, and the audit trail.',
    description:
      'Governance is the unsexy work that keeps companies out of court. PII, GDPR, classification, RBAC/ABAC, encryption, and lineage as the connective tissue.',
    topics: [
      { slug: 'gdpr-and-ccpa', title: 'GDPR, CCPA & Friends', summary: 'Data subject rights, lawful bases, deletion, the engineering implications.' },
      { slug: 'pii-and-classification', title: 'PII Handling & Classification', summary: 'Tagging, masking, tokenization, pseudonymization, when to encrypt at field level.' },
      { slug: 'rbac-and-abac', title: 'Access Control: RBAC vs ABAC', summary: 'Roles, attributes, when each scales, integrating with Unity Catalog / Lake Formation.' },
      { slug: 'encryption', title: 'Encryption At Rest & In Transit', summary: 'KMS patterns, customer-managed keys, TLS everywhere, key rotation.' },
      { slug: 'audit-and-retention', title: 'Audit, Retention & Lineage', summary: 'CloudTrail / activity logs, retention policies, lineage as compliance evidence.' },
      { slug: 'compliance-frameworks', title: 'Compliance Frameworks', summary: 'SOC 2, HIPAA, PCI-DSS — what each demands of a data platform.' },
    ],
  },
  {
    slug: 'system-design',
    title: 'System Design for Data',
    tier: 4,
    order: 3,
    tagline: 'Designing pipelines, lakehouses, and streaming systems at interview scale.',
    description:
      'The interview that decides senior vs mid-level. Frame requirements, choose components, articulate trade-offs, defend the design under pressure.',
    topics: [
      { slug: 'interview-framework', title: 'The Interview Framework', summary: 'A repeatable structure: requirements → estimate → API → storage → compute → scale.' },
      { slug: 'trade-off-thinking', title: 'Trade-off Thinking', summary: 'Consistency vs availability, cost vs latency, batch vs stream — articulating the choice.' },
      { slug: 'capacity-planning', title: 'Capacity Planning', summary: 'Back-of-envelope: rows, bytes, RPS, storage growth, cluster sizing.' },
      { slug: 'fault-tolerance', title: 'Fault Tolerance Patterns', summary: 'Idempotency, dead-letter queues, circuit breakers, retry with backoff, DR.' },
      { slug: 'slas-and-slos', title: 'SLAs, SLOs & Error Budgets', summary: 'Defining freshness, accuracy, availability, and how to negotiate them.' },
      { slug: 'case-clickstream', title: 'Case Study — Clickstream Pipeline', summary: 'A web-scale event ingestion + analytics design, end to end.' },
      { slug: 'case-cdc-ingestion', title: 'Case Study — CDC Ingestion', summary: 'Operational DB → lakehouse with exactly-once semantics.' },
      { slug: 'case-real-time-fraud', title: 'Case Study — Real-Time Fraud Detection', summary: 'Streaming feature store, model serving, low-latency decisioning.' },
    ],
  },
  {
    slug: 'soft-skills',
    title: 'Soft Skills & Consulting Craft',
    tier: 4,
    order: 4,
    tagline: 'Stakeholders, writing, mentoring, and the consulting playbook.',
    description:
      'What actually gets you promoted at a consultancy. Translating tech to business, writing that scales your thinking, mentoring, and delivering engagements that clients want to renew.',
    topics: [
      { slug: 'stakeholder-management', title: 'Stakeholder Management', summary: 'Mapping stakeholders, managing up, translating tech to business outcomes.' },
      { slug: 'technical-writing', title: 'Technical Writing', summary: 'ADRs, RFCs, design docs, runbooks — writing that scales decisions.' },
      { slug: 'estimation-and-scoping', title: 'Estimation & Scoping', summary: 'Breaking down work, three-point estimates, communicating uncertainty.' },
      { slug: 'mentoring-juniors', title: 'Mentoring & Coaching Juniors', summary: 'Code review as teaching, pairing, growth conversations.' },
      { slug: 'leading-design-reviews', title: 'Leading Design Reviews', summary: 'Running the room, surfacing dissent, driving to decisions.' },
      { slug: 'presenting-to-non-tech', title: 'Presenting to Non-Technical Audiences', summary: 'Executive summaries, the pyramid principle, telling the story of the data.' },
      { slug: 'consulting-playbook', title: 'The Consulting Playbook', summary: 'Discovery, scoping, delivery, handover — the engagement lifecycle.' },
      { slug: 'async-communication', title: 'Async Communication', summary: 'Writing for distributed teams, the rule of three, when to call a meeting.' },
    ],
  },
];

// ──────────────────────────────────────────────────────────────
// helpers
// ──────────────────────────────────────────────────────────────

export const domainsByTier = (): Record<1 | 2 | 3 | 4, Domain[]> => {
  const out: Record<1 | 2 | 3 | 4, Domain[]> = { 1: [], 2: [], 3: [], 4: [] };
  for (const d of domains) out[d.tier].push(d);
  for (const k of Object.keys(out) as unknown as (1 | 2 | 3 | 4)[]) {
    out[k].sort((a, b) => a.order - b.order);
  }
  return out;
};

export const findDomain = (slug: string): Domain | undefined =>
  domains.find((d) => d.slug === slug);

export const findTopic = (
  domainSlug: string,
  topicSlug: string
): { domain: Domain; topic: Topic; index: number } | undefined => {
  const domain = findDomain(domainSlug);
  if (!domain) return undefined;
  const index = domain.topics.findIndex((t) => t.slug === topicSlug);
  if (index === -1) return undefined;
  return { domain, topic: domain.topics[index]!, index };
};

export const topicNeighbors = (
  domainSlug: string,
  topicSlug: string
): { prev?: { domain: Domain; topic: Topic }; next?: { domain: Domain; topic: Topic } } => {
  const found = findTopic(domainSlug, topicSlug);
  if (!found) return {};
  const { domain, index } = found;
  const prev = index > 0
    ? { domain, topic: domain.topics[index - 1]! }
    : undefined;
  const next = index < domain.topics.length - 1
    ? { domain, topic: domain.topics[index + 1]! }
    : undefined;
  return { prev, next };
};

export const totalTopics = (): number =>
  domains.reduce((acc, d) => acc + d.topics.length, 0);
