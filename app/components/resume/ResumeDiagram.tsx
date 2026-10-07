import type { ResumeDiagramKind } from "~/content/types";

const diagrams: Record<ResumeDiagramKind, { label: string; nodes: readonly string[] }> = {
  "event-flow": { label: "Message workflow", nodes: ["Ingress", "RabbitMQ", "Idempotent consumer", "Retry / DLQ"] },
  coordination: { label: "Distributed coordination", nodes: ["Worker A + B", "Redis coordination", "One conflict scope", "Database"] },
  retrieval: { label: "Product retrieval", nodes: ["50K+ catalog", "OpenSearch index", "Retrieval", "Product result"] },
  allocation: { label: "Ticket allocation", nodes: ["Competing requests", "Admission control", "PostgreSQL transaction", "Durable owner"] },
  recovery: { label: "Failure recovery", nodes: ["Fault detected", "Bounded failure", "Durable state", "Safe retry"] },
};

export function ResumeDiagram({ kind }: { kind: ResumeDiagramKind }) {
  const diagram = diagrams[kind];

  return (
    <figure className={`resume-mini-diagram resume-mini-diagram--${kind}`} aria-label={diagram.label}>
      <svg aria-hidden="true" viewBox="0 0 440 126">
        <path className="resume-diagram-path" d="M84 62 C112 38 128 86 156 62 S200 38 228 62 S272 86 300 62 S344 38 372 62" />
        {diagram.nodes.map((node, index) => (
          <g key={node} transform={`translate(${index * 108 + 4} 38)`}>
            <rect width="94" height="48" rx="3" />
            <text x="47" y="27">{node}</text>
          </g>
        ))}
      </svg>
      <figcaption>{diagram.label}</figcaption>
    </figure>
  );
}
