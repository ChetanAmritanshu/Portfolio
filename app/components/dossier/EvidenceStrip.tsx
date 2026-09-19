import type { Metric } from "~/content/types";

export function EvidenceStrip({ metrics }: { metrics: readonly Metric[] }) {
  return <dl className="evidence-strip" aria-label="Verified engineering evidence">
    {metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
  </dl>;
}
