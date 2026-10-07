import Link from "next/link";

import type { ResumeAnnotation as ResumeAnnotationData, ResumeMode } from "~/content/types";
import { ResumeDiagram } from "./ResumeDiagram";

export function ResumeAnnotation({ annotation, instance = "desktop", mode }: { annotation: ResumeAnnotationData; instance?: "desktop" | "mobile"; mode: ResumeMode }) {
  const explanation = mode === "recruiter" ? annotation.recruiterExplanation : annotation.engineerExplanation;

  return (
    <article className="resume-annotation" id={instance === "desktop" ? `resume-annotation-${annotation.id}` : undefined} aria-live="polite">
      <div className="resume-annotation-cap">
        <span>{annotation.label}</span>
        <small>{mode} layer</small>
      </div>
      <svg className="resume-sketch-arrow" aria-hidden="true" viewBox="0 0 180 52">
        <path d="M176 8 C128 5 124 42 69 33 C39 28 25 39 8 43" />
        <path d="M18 34 L8 43 L21 47" />
      </svg>
      <blockquote>{annotation.resumeText}</blockquote>
      <div className="resume-annotation-copy">
        {explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {annotation.metrics?.length ? (
        <ul className="resume-annotation-metrics" aria-label="Verified impact metrics">
          {annotation.metrics.map((metric) => <li key={metric}>{metric}</li>)}
        </ul>
      ) : null}
      {annotation.diagram ? <ResumeDiagram kind={annotation.diagram} /> : null}
      {annotation.projectSlug && annotation.projectLabel ? (
        <Link className="resume-project-bridge" href={`/systems/${annotation.projectSlug}/`}>
          {annotation.projectLabel} <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  );
}
