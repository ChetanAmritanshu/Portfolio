"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { dispatchAudioEvent } from "~/audio/events";
import { projects } from "~/content/projects";
import { assetUrl } from "~/lib/deployment";
import { dispatchProjectPreview } from "~/lib/interactions";
import { AudioAnchor } from "./AudioAnchor";

export function ProjectSelector() {
  const [selectedSlug, setSelectedSlug] = useState<string>(projects[0].slug);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedProject = projects.find((project) => project.slug === selectedSlug) ?? projects[0];

  const previewProject = (project: (typeof projects)[number], selected = false) => {
    setSelectedSlug(project.slug);
    dispatchProjectPreview({ slug: project.slug, accent: project.accent });
    dispatchAudioEvent({
      name: selected ? "system:select" : "system:hover",
      projectSlug: project.slug,
    });
  };

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % projects.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + projects.length) % projects.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = projects.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    previewProject(projects[nextIndex], true);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="mission-deck" id="systems" aria-labelledby="mission-title">
      <div className="mission-heading">
        <div>
          <p className="eyebrow">Featured operations</p>
          <h2 id="mission-title">Select a system</h2>
        </div>
        <div className="mission-count"><span>{selectedProject.index}</span> / 04</div>
      </div>

      <div className="mission-layout">
        <div className="mission-tabs" role="tablist" aria-label="Featured systems">
          {projects.map((project, index) => (
            <button
              aria-controls={`project-panel-${project.slug}`}
              aria-selected={project.slug === selectedSlug}
              className={project.slug === selectedSlug ? "is-selected" : ""}
              id={`project-tab-${project.slug}`}
              key={project.slug}
              onClick={() => previewProject(project, true)}
              onFocus={() => previewProject(project)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              onPointerEnter={() => previewProject(project)}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              tabIndex={project.slug === selectedSlug ? 0 : -1}
              type="button"
            >
              <span>{project.index}</span>
              <b>{project.shortTitle}</b>
              <small>{project.category}</small>
            </button>
          ))}
        </div>

        <article
          className={`mission-brief accent-${selectedProject.accent}`}
          id={`project-panel-${selectedProject.slug}`}
          key={selectedProject.slug}
          role="tabpanel"
          aria-labelledby={`project-tab-${selectedProject.slug}`}
        >
          <div className="mission-brief-copy">
            <p>{selectedProject.category}</p>
            <h3>{selectedProject.title}</h3>
            <span>{selectedProject.summary}</span>
          </div>
          <dl className="mission-metrics">
            {selectedProject.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
          <AudioAnchor
            className="mission-enter"
            eventName="system:enter"
            href={assetUrl(`systems/${selectedProject.slug}/`)}
            projectSlug={selectedProject.slug}
          >
            Open case file <span aria-hidden="true">↗</span>
          </AudioAnchor>
        </article>
      </div>
    </section>
  );
}
