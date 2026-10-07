import type { ResumeAnnotation, ResumeExperienceEntry } from "./types";

export const resumeSummary =
  "Backend Engineer with 2.5+ years of experience building high-throughput Go services, distributed systems, and GenAI applications across trading and retail. Experienced in concurrency, event-driven architectures, Kafka/RabbitMQ, Redis coordination, fault-tolerant workflows, and low-latency backend systems.";

export const resumeExperience: readonly ResumeExperienceEntry[] = [
  {
    organization: "Oneture Technologies",
    location: "Navi Mumbai",
    role: "Associate Software Development Engineer | Backend / GenAI",
    period: "Mar 2025 - Present",
    tracks: [
      {
        title: "Trading Square-Off System",
        technology: "Go",
        bullets: [
          {
            id: "square-off-throughput",
            resumeText: "Engineered a high-throughput Go backend processing 5K+ trades/min with sub-120 ms P95 latency.",
            label: "Impact trace",
            recruiterExplanation: [
              "Owned backend work on a production trading path measured for both sustained volume and tail latency.",
              "The signal is not only speed: it is predictable processing under operational pressure.",
            ],
            engineerExplanation: [
              "The public engineering boundary is a Go backend processing more than 5,000 trades per minute while maintaining sub-120 ms P95 latency.",
              "The surrounding design uses asynchronous workflows, bounded failure handling, idempotency, and explicit dependency protection. Confidential trading logic and internal topology remain intentionally omitted.",
            ],
            metrics: ["5K+ trades/min", "P95 < 120 ms"],
            diagram: "event-flow",
            projectSlug: "trading-square-off",
            projectLabel: "Open Trading Square-Off dossier",
          },
          {
            id: "square-off-events",
            resumeText: "Architected RabbitMQ-driven event workflows with idempotent consumers, retries, and DLQs for failure-safe trade execution.",
            label: "Failure mode",
            recruiterExplanation: [
              "Designed the workflow so transient failure did not silently lose work or turn one logical action into duplicate execution.",
            ],
            engineerExplanation: [
              "RabbitMQ decouples intake from processing. Idempotent consumers protect replay, retries handle recoverable faults, and dead-letter queues isolate work that cannot safely continue.",
              "Those mechanisms define how the system fails; they are more important than merely publishing a message.",
            ],
            diagram: "event-flow",
            projectSlug: "trading-square-off",
            projectLabel: "Open Trading Square-Off dossier",
          },
          {
            id: "square-off-locking",
            resumeText: "Implemented Redis-based distributed coordination and locking, reducing database writes by 40%.",
            label: "Coordination note",
            recruiterExplanation: [
              "Reduced repeated database work while coordinating operations across concurrent backend workers.",
            ],
            engineerExplanation: [
              "Distributed coordination matters when independent workers can touch the same logical operation. Lock scope, ownership, expiry, and duplicate safety are the real design concerns around the Redis primitive.",
              "The verified resume outcome is a 40% reduction in database writes.",
            ],
            metrics: ["DB writes -40%"],
            diagram: "coordination",
            projectSlug: "trading-square-off",
            projectLabel: "Open Trading Square-Off dossier",
          },
          {
            id: "square-off-resilience",
            resumeText: "Built circuit breakers, timeouts, and fault-isolation strategies, contributing to 99.9%+ availability.",
            label: "Reliability trace",
            recruiterExplanation: [
              "Added concrete dependency-failure controls that contributed to a 99.9%+ availability result.",
            ],
            engineerExplanation: [
              "Timeouts bound waiting, circuit breakers stop repeatedly stressing a failing dependency, and fault isolation keeps one degraded path from consuming the entire system.",
              "The techniques work together: none of them alone establishes availability.",
            ],
            metrics: ["99.9%+ availability"],
            diagram: "recovery",
            projectSlug: "trading-square-off",
            projectLabel: "Open Trading Square-Off dossier",
          },
        ],
      },
      {
        title: "AI-Powered Sales Advisor",
        technology: "Python / GenAI",
        bullets: [
          {
            id: "sales-advisor-catalog",
            resumeText: "Built a microservice-based AI product discovery backend serving a catalog of 50K+ products.",
            label: "Not just a chatbot",
            recruiterExplanation: [
              "Built the backend serving AI-assisted product discovery at catalog scale, not a standalone chat interface.",
            ],
            engineerExplanation: [
              "The verified public scope is a Python and GenAI product-discovery backend organized as microservices and serving more than 50,000 products.",
              "Provider, prompt, model-routing, ranking, and evaluation details are intentionally not claimed because they are not present in the public evidence.",
            ],
            metrics: ["50K+ products"],
            diagram: "retrieval",
            projectSlug: "ai-sales-advisor",
            projectLabel: "Open AI Sales Advisor dossier",
          },
          {
            id: "sales-advisor-search",
            resumeText: "Optimized OpenSearch indexing and retrieval for the 50K+ product catalog, reducing search latency by 30%.",
            label: "Retrieval trace",
            recruiterExplanation: [
              "Improved the product-search path and reduced measured search latency by 30%.",
            ],
            engineerExplanation: [
              "Indexing and retrieval were treated as backend system concerns around a 50K+ item catalog. The verified result is a 30% search-latency reduction.",
              "Private index design, ranking logic, and customer data are not exposed here.",
            ],
            metrics: ["Search latency -30%", "50K+ products"],
            diagram: "retrieval",
            projectSlug: "ai-sales-advisor",
            projectLabel: "Open AI Sales Advisor dossier",
          },
        ],
      },
    ],
  },
  {
    organization: "Newton School",
    location: "Pune",
    role: "Software Development Engineer + Instructor",
    period: "Feb 2024 - Feb 2025",
    tracks: [
      {
        title: "Backend Engineering & Instruction",
        bullets: [
          {
            id: "newton-backend",
            resumeText: "Developed production backend services using Spring Boot and Django; optimized SQL queries and indexing, reducing API latency by 40%.",
            label: "Performance trace",
            recruiterExplanation: [
              "Combined production service delivery with database-level performance work, producing a 40% API-latency reduction.",
            ],
            engineerExplanation: [
              "The optimization scope covered SQL queries and indexing behind Spring Boot and Django services. The verified outcome is a 40% reduction in API latency.",
              "No private schema, workload shape, or customer data is reproduced.",
            ],
            metrics: ["API latency -40%"],
          },
          {
            id: "newton-mentoring",
            resumeText: "Mentored 100+ students in Data Structures, Algorithms, and System Design.",
            label: "Leverage",
            recruiterExplanation: [
              "Translated technical material into repeatable guidance for more than 100 learners.",
            ],
            engineerExplanation: [
              "Teaching Data Structures, Algorithms, and System Design requires making trade-offs explicit and reviewing reasoning, not only final answers.",
            ],
            metrics: ["100+ students"],
          },
        ],
      },
    ],
  },
] as const;

export const resumeProject: {
  title: string;
  subtitle: string;
  repositoryUrl: string;
  bullets: readonly ResumeAnnotation[];
} = {
  title: "TicketForge",
  subtitle: "Failure-Driven High-Concurrency Ticketing System",
  repositoryUrl: "https://github.com/ChetanAmritanshu/TicketForge",
  bullets: [
    {
      id: "ticketforge-correctness",
      resumeText: "Engineered a high-concurrency ticket allocation system handling 50,000 competing purchase attempts for 100 tickets with zero overselling, durable ownership, and idempotent retries.",
      label: "Correctness first",
      recruiterExplanation: [
        "Built and validated a finite-inventory system where demand greatly exceeded supply without producing an extra owner.",
      ],
      engineerExplanation: [
        "PostgreSQL is the shared correctness boundary. Transactions, row locking, uniqueness constraints, and a durable request ledger coordinate multiple service instances.",
        "Idempotent retry returns the recorded result instead of consuming another ticket.",
      ],
      metrics: ["50,000 attempts", "100 tickets", "0 oversold"],
      diagram: "allocation",
      projectSlug: "ticketforge",
      projectLabel: "Open TicketForge dossier",
    },
    {
      id: "ticketforge-overload",
      resumeText: "Designed PostgreSQL-backed transactional allocation, durable request-ID idempotency, admission control, and bounded overload shedding while preserving correctness across multiple service instances.",
      label: "Bounded overload",
      recruiterExplanation: [
        "Designed overload behavior explicitly so pressure was rejected safely instead of silently corrupting inventory.",
      ],
      engineerExplanation: [
        "Transactional allocation protects ownership, durable request IDs make retries converge, and admission control limits concurrent database pressure.",
        "Bounded shedding makes overload visible. It trades universal acceptance for protected correctness and database headroom.",
      ],
      diagram: "allocation",
      projectSlug: "ticketforge",
      projectLabel: "Open TicketForge dossier",
    },
    {
      id: "ticketforge-benchmark",
      resumeText: "Achieved 3,066 req/s with 427.9 ms P99 across three seller instances on a 50K-request validation, completing with 0 correctness violations and exactly 100 unique ticket owners.",
      label: "Measured evidence",
      recruiterExplanation: [
        "Validated throughput, tail latency, and the final ownership invariant together instead of reporting speed in isolation.",
      ],
      engineerExplanation: [
        "This is a preserved local experimental run, not a production-capacity claim. The rate covers all attempts, while the invariant audit confirms exactly 100 durable owners and zero detected overselling.",
      ],
      metrics: ["3,066 req/s", "427.9 ms P99", "3 instances", "0 violations"],
      diagram: "allocation",
      projectSlug: "ticketforge",
      projectLabel: "Open TicketForge dossier",
    },
    {
      id: "ticketforge-recovery",
      resumeText: "Engineered recovery for process restarts, PostgreSQL outages, slow-database degradation, connection-pool starvation, and post-commit response-loss ambiguity.",
      label: "Failure laboratory",
      recruiterExplanation: [
        "Tested recovery against concrete infrastructure and ambiguity failures rather than only the happy path.",
      ],
      engineerExplanation: [
        "The failure suite covers restart recovery, database unavailability, slow queries, pool starvation, and the case where a commit may succeed even though the client never receives the response.",
        "Durable state and same-request replay resolve what process memory cannot.",
      ],
      diagram: "recovery",
      projectSlug: "ticketforge",
      projectLabel: "Open TicketForge dossier",
    },
  ],
};

export const resumeSkills = [
  { label: "Languages", value: "Go, C++, Java, Python, JavaScript/TypeScript, SQL" },
  { label: "Backend", value: "Gin, GORM, Spring Boot, Django, REST APIs, gRPC" },
  { label: "Distributed Systems", value: "Kafka, RabbitMQ, Redis, Concurrency, Event-Driven Architecture, Idempotency, Rate Limiting, Fault Isolation" },
  { label: "Databases / Infra", value: "PostgreSQL, MySQL, MongoDB, AWS EC2/S3, Docker, Linux, Git, Jenkins" },
] as const;

export const resumeAchievements = [
  "Codeforces Expert (Max Rating: 1704)",
  "CodeChef 4-Star",
  "Smart India Hackathon 2022 Winner",
  "CodeChef Starters 255 - Rank 97 / 22K+ contestants",
  "Educational Codeforces Round 188 - Rank 342 / 30K+ contestants",
  "CodeChef Starters 253 - Rank 155 / 22K+ contestants",
] as const;

export const resumeEducation = {
  institution: "Indian Institute of Information Technology, Nagpur",
  period: "2020 - 2024",
  degree: "B.Tech in Computer Science and Engineering",
  result: "GPA: 7.84 / 10",
} as const;
