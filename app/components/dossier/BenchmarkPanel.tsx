import type { Benchmark } from "~/content/types";
import { EvidenceStrip } from "./EvidenceStrip";

export function BenchmarkPanel({ benchmark, limitedDisclosure = false }: { benchmark: Benchmark; limitedDisclosure?: boolean }) {
  return <div className="benchmark-panel"><span>{benchmark.label}</span><EvidenceStrip metrics={benchmark.metrics} />
    {benchmark.methodology ? <p>{benchmark.methodology}</p> : limitedDisclosure ? <p className="evidence-scope">Evidence scope // approved public figures</p> : <p className="content-pending">Measurement methodology // pending verified detail</p>}
  </div>;
}
