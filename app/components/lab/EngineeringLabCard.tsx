import type { EngineeringLab } from "~/content/types";
import { AudioAnchor } from "~/components/AudioAnchor";

import { ObjectModelPreview } from "./ObjectModelPreview";
import { SystemTopologyPreview } from "./SystemTopologyPreview";

export function EngineeringLabCard({ lab }: { lab: EngineeringLab }) {
  return (
    <article className={`lab-card lab-card--${lab.accent}`}>
      <AudioAnchor
        aria-label={`Enter ${lab.title}`}
        className="lab-card-link"
        eventName="navigation:enter"
        href={lab.liveUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <header className="lab-card-header">
          <span>Lab / {lab.index}</span>
          <span className="lab-status"><i aria-hidden="true" />{lab.status}</span>
        </header>

        <div className="lab-card-title">
          <p>{lab.subtitle}</p>
          <h3>{lab.title}</h3>
          <span>{lab.description}</span>
        </div>

        <div className="lab-visual" aria-label={`${lab.title} technical preview`}>
          {lab.slug === "system-design" ? <SystemTopologyPreview /> : <ObjectModelPreview />}
          <span className="lab-trace-label">System trace // nominal</span>
        </div>

        <ul className="lab-topics" aria-label={`${lab.title} topics`}>
          {lab.topics.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>

        <footer className="lab-card-footer">
          <ul className="lab-signals" aria-label={`${lab.title} signals`}>
            {lab.signals.map((signal) => <li key={signal}>{signal}</li>)}
          </ul>
          <span className="lab-enter">Enter lab <b aria-hidden="true">→</b></span>
        </footer>
      </AudioAnchor>

      <a
        aria-label={`Open ${lab.title} source repository on GitHub`}
        className="lab-source-link"
        href={lab.repositoryUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        Source ↗
      </a>
    </article>
  );
}
