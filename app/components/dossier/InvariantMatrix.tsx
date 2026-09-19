import type { CorrectnessInvariant } from "~/content/types";

export function InvariantMatrix({ invariants }: { invariants: readonly CorrectnessInvariant[] }) {
  return <div className="invariant-matrix"><table><caption>Database and application correctness boundaries</caption>
    <thead><tr><th>Invariant</th><th>Database enforcement</th><th>Application enforcement</th><th>Evidence</th></tr></thead>
    <tbody>{invariants.map((invariant) => <tr key={invariant.invariant}>
      <th scope="row" data-label="Invariant">{invariant.invariant}</th><td data-label="Database enforcement">{invariant.database}</td>
      <td data-label="Application enforcement">{invariant.application}</td><td data-label="Evidence">{invariant.evidence}</td>
    </tr>)}</tbody>
  </table></div>;
}
