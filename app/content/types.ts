export type ExternalLink = {
  label: string;
  href: string | null;
  kind: "resume" | "github" | "linkedin" | "email" | "codechef" | "codeforces";
  detail: string;
  newTab?: boolean;
  ariaLabel?: string;
};

export type Metric = {
  label: string;
  value: string;
  emphasis?: boolean;
};

export type ProjectStatus = "active" | "production" | "case-study";
export type ArchitectureNode = { id: string; label: string; detail?: string };
export type ArchitectureEdge = { from: string; to: string; label?: string };
export type DesignDecision = { title: string; pressure?: string; decision: string; why?: string; tradeoff?: string };
export type FailureMode = {
  mode: string; response?: string; correctness?: string; recovery?: string;
  fault?: string; observation?: string; mitigation?: string; retest?: string; result?: string;
};
export type CorrectnessInvariant = { invariant: string; database: string; application: string; evidence: string };
export type Benchmark = { label: string; metrics: readonly Metric[]; methodology?: string };
export type ProjectLink = { label: string; href: string };
export type AuthorityLayer = { label: string; detail: string; scope: "jarvis" | "external" | "effect" };
export type RuntimeTrack = { label: string; status: string; description: string; steps: readonly string[]; limitation?: string };
export type BoundaryGroup = { label: string; status: string; items: readonly string[]; safeguards: readonly string[]; limitations: readonly string[] };
export type EvidenceGroup = { label: string; items: readonly string[] };
export type AuthorityRuntimeStudy = {
  primaryQuestion: string;
  statusStatement: string;
  overview: readonly string[];
  activeFlow: readonly string[];
  trustLayers: readonly AuthorityLayer[];
  authorizationChecks: readonly string[];
  bridgeStates: readonly string[];
  bridgeRecovery: string;
  runtimes: readonly RuntimeTrack[];
  boundaries: readonly BoundaryGroup[];
  identity: readonly { label: string; purpose: string; isNot: string }[];
  testing: readonly EvidenceGroup[];
  validation: readonly Metric[];
  validationNotes: readonly string[];
  failureModes: readonly FailureMode[];
  persistence: readonly { label: string; items: readonly string[] }[];
  auditLimitation: readonly string[];
  tradeoffs: readonly DesignDecision[];
  limitations: readonly string[];
  retrospective: readonly string[];
};
export type ProjectDossier = {
  role: string; mission: string; context?: string; constraints?: readonly string[];
  architecture?: { description: string; nodes: readonly ArchitectureNode[]; edges: readonly ArchitectureEdge[]; layout?: "linear" | "fan-in" };
  executionFlow?: readonly string[]; decisions?: readonly DesignDecision[]; failureModes?: readonly FailureMode[];
  invariants?: readonly CorrectnessInvariant[]; reliability?: readonly string[]; reliabilityTitle?: string; performance?: Benchmark; tradeoffs?: readonly string[]; results?: readonly string[];
  retrospective?: readonly string[]; limitations?: readonly string[]; technology: readonly string[]; links?: readonly ProjectLink[];
  disclosure?: string;
  authorityStudy?: AuthorityRuntimeStudy;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  status: ProjectStatus;
  accent: "cyan" | "crimson" | "split";
  metrics: readonly Metric[];
  themes: readonly string[];
  dossier: ProjectDossier;
};

export type Profile = {
  name: string;
  roles: readonly string[];
  heroStatement: readonly [string, string];
  experience: string;
  location: string;
  codeforces: {
    rank: string;
    maxRating: number;
  };
  codechef: {
    rank: string;
  };
  competitiveAchievements: readonly string[];
  currentMode: string;
};
