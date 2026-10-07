"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { dispatchAudioEvent } from "~/audio/events";
import { resumeExperience, resumeProject } from "~/content/resume";
import type { ResumeAnnotation as ResumeAnnotationData, ResumeMode } from "~/content/types";
import { assetUrl } from "~/lib/deployment";
import { ResumeAnnotation } from "./ResumeAnnotation";
import { ResumeDocument } from "./ResumeDocument";

const annotations = [
  ...resumeExperience.flatMap((entry) => entry.tracks.flatMap((track) => track.bullets)),
  ...resumeProject.bullets,
] as readonly ResumeAnnotationData[];

export function ResumeDossier() {
  const [mode, setMode] = useState<ResumeMode>("recruiter");
  const [impactMode, setImpactMode] = useState(false);
  const [pinnedId, setPinnedId] = useState<string | null>(annotations[0]?.id ?? null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const activeId = previewId ?? pinnedId ?? annotations[0].id;
  const activeAnnotation = useMemo(
    () => annotations.find((annotation) => annotation.id === activeId) ?? annotations[0],
    [activeId],
  );
  const pdfUrl = assetUrl("Chetan-Amritanshu-Resume.pdf");

  const selectMode = (nextMode: ResumeMode) => {
    setMode(nextMode);
    dispatchAudioEvent({ name: "ui:select" });
  };

  return (
    <div className="resume-dossier">
      <header className="resume-topbar">
        <Link href="/" onClick={() => dispatchAudioEvent({ name: "navigation:enter" })}>← Back to portfolio</Link>
        <span>Resume dossier // decoded</span>
        <nav aria-label="Resume document actions">
          <a href={pdfUrl} rel="noopener noreferrer" target="_blank">View original PDF</a>
          <a download="Chetan-Amritanshu-Resume.pdf" href={pdfUrl}>Download</a>
        </nav>
      </header>

      <main className="resume-main">
        <header className="resume-intro">
          <div>
            <p className="eyebrow">Annotation layer // active</p>
            <h1>The resume,<br /><span>decoded.</span></h1>
          </div>
          <p>The one-page version tells you what I built. This page tells you what those bullets actually mean.</p>
          <div className="resume-mode-controls">
            <div aria-label="Annotation depth" className="resume-mode-toggle" role="group">
              <button aria-pressed={mode === "recruiter"} onClick={() => selectMode("recruiter")} type="button">Recruiter mode</button>
              <button aria-pressed={mode === "engineer"} onClick={() => selectMode("engineer")} type="button">Engineer mode</button>
            </div>
            <button
              aria-pressed={impactMode}
              className="resume-impact-toggle"
              onClick={() => setImpactMode((value) => !value)}
              type="button"
            >
              Impact {impactMode ? "on" : "off"}
            </button>
          </div>
        </header>

        <p className="resume-instruction">Select a marked bullet to pin its engineering context. Hover or focus previews another annotation.</p>

        <div className="resume-workspace">
          <ResumeDocument
            activeId={activeId}
            impactMode={impactMode}
            mode={mode}
            onPreview={setPreviewId}
            onSelect={(id) => setPinnedId((current) => current === id ? null : id)}
            pinnedId={pinnedId}
          />
          <aside className="resume-annotation-rail" aria-label="Selected resume annotation">
            <div className="resume-annotation-sticky">
              <p>Engineering context // {String(annotations.findIndex((item) => item.id === activeAnnotation.id) + 1).padStart(2, "0")}</p>
              <ResumeAnnotation annotation={activeAnnotation} mode={mode} />
            </div>
          </aside>
        </div>

        <footer className="resume-endcap">
          <p>You&apos;ve seen the one-page version.</p>
          <h2>Now explore the systems.</h2>
          <div>
            <Link href="/#systems">View projects <span aria-hidden="true">→</span></Link>
            <Link href="/#labs">View engineering labs <span aria-hidden="true">→</span></Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
