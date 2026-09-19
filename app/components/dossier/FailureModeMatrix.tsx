import type { FailureMode } from "~/content/types";

const fallback = "Not supplied in verified content.";
export function FailureModeMatrix({ failures }: { failures: readonly FailureMode[] }) {
  const isInvestigationLog = failures.every((failure) => failure.fault && failure.observation && failure.mitigation && failure.retest && failure.result);
  if (isInvestigationLog) return <div className="investigation-log" aria-label="Verified failure investigation log">{failures.map((failure, index) => <article key={failure.mode}>
    <header><span>Experiment // {String(index + 1).padStart(2, "0")}</span><h3>{failure.mode}</h3></header>
    <dl>
      <div><dt>Fault</dt><dd>{failure.fault}</dd></div><div><dt>Observation</dt><dd>{failure.observation}</dd></div>
      <div><dt>Mitigation</dt><dd>{failure.mitigation}</dd></div><div><dt>Retest</dt><dd>{failure.retest}</dd></div>
      <div><dt>Result</dt><dd>{failure.result}</dd></div>
    </dl>
  </article>)}</div>;
  return <div className="failure-matrix"><table><caption>Verified failure and recovery scope</caption>
    <thead><tr><th>Failure mode</th><th>System response</th><th>Correctness property</th><th>Recovery</th></tr></thead>
    <tbody>{failures.map((failure) => <tr key={failure.mode}>
      <th scope="row" data-label="Failure mode">{failure.mode}</th><td data-label="System response">{failure.response ?? fallback}</td>
      <td data-label="Correctness property">{failure.correctness ?? fallback}</td><td data-label="Recovery">{failure.recovery ?? fallback}</td>
    </tr>)}</tbody>
  </table></div>;
}
