import type { Benchmark } from "~/content/types";
import { EvidenceStrip } from "./EvidenceStrip";

export function BenchmarkPanel({ benchmark }: { benchmark: Benchmark }) {
  return <div className="benchmark-panel"><span>{benchmark.label}</span><EvidenceStrip metrics={benchmark.metrics} />
    {benchmark.methodology ? <p>{benchmark.methodology}</p> : <p className="content-pending">Measurement methodology // pending verified detail</p>}
  </div>;
}
