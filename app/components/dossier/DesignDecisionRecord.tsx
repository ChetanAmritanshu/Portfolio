import type { DesignDecision } from "~/content/types";

export function DesignDecisionRecords({ decisions }: { decisions: readonly DesignDecision[] }) {
  return <div className="decision-list">{decisions.map((item, index) => <article className="decision-record" key={item.title}>
    <span>Decision // {String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3>
    {item.pressure ? <div><b>Pressure</b><p>{item.pressure}</p></div> : null}
    <div><b>Decision</b><p>{item.decision}</p></div>
    {item.why ? <div><b>Why</b><p>{item.why}</p></div> : null}
    {item.tradeoff ? <div><b>Tradeoff</b><p>{item.tradeoff}</p></div> : null}
  </article>)}</div>;
}
