import type { EngineeringLab } from "./types";

export const engineeringLabs: readonly EngineeringLab[] = [
  {
    slug: "system-design",
    index: "01",
    title: "System Design Lab",
    subtitle: "High Level Design",
    status: "Architecture online",
    description:
      "Architecture studies across scale, reliability, failure simulation, and explicit production trade-offs.",
    accent: "cyan",
    topics: [
      "Distributed Systems",
      "Scaling",
      "Caching",
      "Messaging",
      "Reliability",
      "Failure Simulation",
      "Architecture Trade-offs",
    ],
    signals: [
      "Interactive architecture labs",
      "Failure simulators",
      "Design challenges",
      "Production trade-offs",
    ],
    repositoryUrl: "https://github.com/ChetanAmritanshu/High-Level-Design",
    liveUrl: "https://chetanamritanshu.github.io/System-Design-Lab/",
  },
  {
    slug: "low-level-design",
    index: "02",
    title: "Low Level Design Lab",
    subtitle: "Object Modeling / Design Systems",
    status: "50 / 50 chapters complete",
    description:
      "Object-modeling practice across maintainable abstractions, behavior, concurrency, and machine-coding constraints.",
    accent: "violet",
    topics: [
      "SOLID",
      "Design Patterns",
      "Concurrency",
      "Domain Modeling",
      "Machine Coding",
      "C++",
      "Go",
      "Java",
      "TypeScript",
    ],
    signals: [
      "50 / 50 chapters complete",
      "Object design exercises",
      "Pattern trade-offs",
      "Lifecycle modeling",
    ],
    repositoryUrl: "https://github.com/ChetanAmritanshu/Low-Level-Design-Lab",
    liveUrl: "https://chetanamritanshu.github.io/Low-Level-Design-Lab/",
  },
] as const;
