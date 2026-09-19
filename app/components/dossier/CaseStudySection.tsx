import type { ReactNode } from "react";

export function CaseStudySection({ id, index, title, children }: { id: string; index: string; title: string; children: ReactNode }) {
  return <section className="dossier-section" id={id} aria-labelledby={`${id}-title`}>
    <header><span>SECTION // {index}</span><h2 id={`${id}-title`}>{title}</h2></header>
    <div className="dossier-section-body">{children}</div>
  </section>;
}
