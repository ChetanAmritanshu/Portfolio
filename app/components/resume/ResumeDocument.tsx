import {
  resumeAchievements,
  resumeEducation,
  resumeExperience,
  resumeProject,
  resumeSkills,
  resumeSummary,
} from "~/content/resume";
import type { ResumeAnnotation as ResumeAnnotationData, ResumeMode } from "~/content/types";
import { ResumeAnnotation } from "./ResumeAnnotation";

type ResumeDocumentProps = {
  activeId: string;
  impactMode: boolean;
  mode: ResumeMode;
  onPreview: (id: string | null) => void;
  onSelect: (id: string) => void;
  pinnedId: string | null;
};

function AnnotatedBullet({ annotation, ...props }: { annotation: ResumeAnnotationData } & ResumeDocumentProps) {
  const active = props.activeId === annotation.id;
  const pinned = props.pinnedId === annotation.id;
  const impactful = props.impactMode && Boolean(annotation.metrics?.length);

  return (
    <li className={active ? "is-active" : undefined}>
      <button
        aria-controls={`resume-annotation-${annotation.id}`}
        aria-expanded={active}
        aria-pressed={pinned}
        className={impactful ? "is-impact" : undefined}
        onBlur={() => props.onPreview(null)}
        onClick={() => props.onSelect(annotation.id)}
        onFocus={() => props.onPreview(annotation.id)}
        onPointerEnter={() => props.onPreview(annotation.id)}
        onPointerLeave={() => props.onPreview(null)}
        type="button"
      >
        <span>{annotation.resumeText}</span>
        {annotation.metrics?.length ? <small>{annotation.metrics[0]}</small> : null}
      </button>
      <div className="resume-mobile-annotation">
        {active ? <ResumeAnnotation annotation={annotation} instance="mobile" mode={props.mode} /> : null}
      </div>
    </li>
  );
}

export function ResumeDocument(props: ResumeDocumentProps) {
  return (
    <article className="resume-paper" aria-label="Chetan Amritanshu resume">
      <header className="resume-paper-header">
        <p>Resume // source document</p>
        <h2>Chetan Amritanshu</h2>
        <strong>Backend Engineer | Distributed Systems | GenAI | Codeforces Expert</strong>
        <span>chetan.amritanshu@gmail.com | Navi Mumbai, India</span>
        <span>github.com/ChetanAmritanshu | linkedin.com/in/chetan-amritanshu</span>
      </header>

      <section className="resume-paper-section">
        <h3>Summary</h3>
        <p>{resumeSummary}</p>
      </section>

      <section className="resume-paper-section">
        <h3>Experience</h3>
        {resumeExperience.map((entry) => (
          <div className="resume-entry" key={entry.organization}>
            <header>
              <div><h4>{entry.organization}</h4><em>{entry.role}</em></div>
              <div><strong>{entry.location}</strong><em>{entry.period}</em></div>
            </header>
            {entry.tracks.map((track) => (
              <div className="resume-track" key={track.title}>
                <h5>{track.title}{track.technology ? ` - ${track.technology}` : ""}</h5>
                <ul>
                  {track.bullets.map((annotation) => <AnnotatedBullet {...props} annotation={annotation} key={annotation.id} />)}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="resume-paper-section">
        <h3>Projects</h3>
        <div className="resume-entry">
          <header><div><h4>{resumeProject.title} - {resumeProject.subtitle}</h4><em>{resumeProject.repositoryUrl}</em></div></header>
          <ul>
            {resumeProject.bullets.map((annotation) => <AnnotatedBullet {...props} annotation={annotation} key={annotation.id} />)}
          </ul>
        </div>
      </section>

      <section className="resume-paper-section resume-paper-section--compact">
        <h3>Skills</h3>
        {resumeSkills.map((skill) => <p key={skill.label}><strong>{skill.label}:</strong> {skill.value}</p>)}
      </section>

      <section className="resume-paper-section resume-paper-section--compact">
        <h3>Education</h3>
        <div className="resume-paper-row"><strong>{resumeEducation.institution}</strong><span>{resumeEducation.period}</span></div>
        <div className="resume-paper-row"><span>{resumeEducation.degree}</span><span>{resumeEducation.result}</span></div>
      </section>

      <section className="resume-paper-section resume-paper-section--compact">
        <h3>Achievements</h3>
        <ul className="resume-achievements">{resumeAchievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
      </section>
    </article>
  );
}
