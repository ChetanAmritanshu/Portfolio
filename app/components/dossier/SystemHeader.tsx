import type { Project } from "~/content/types";

export function SystemHeader({ project }: { project: Project }) {
  return <header className="dossier-header">
    <div className="dossier-kicker"><span>System // {project.index}</span><span>{project.status}</span></div>
    <h1>{project.title}</h1>
    <p className="dossier-category">{project.category}</p>
    <div className="dossier-mission"><span>Mission</span><p>{project.dossier.mission}</p></div>
    {project.dossier.disclosure ? <aside className="limited-disclosure"><span>Production system // limited disclosure</span><p>{project.dossier.disclosure}</p></aside> : null}
    {project.dossier.links?.length ? <div className="dossier-links">{project.dossier.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div> : null}
    <dl className="dossier-meta">
      <div><dt>Role</dt><dd>{project.dossier.role}</dd></div>
      <div><dt>Status</dt><dd>{project.status}</dd></div>
      <div><dt>Technology</dt><dd>{project.dossier.technology.join(" / ")}</dd></div>
    </dl>
  </header>;
}
