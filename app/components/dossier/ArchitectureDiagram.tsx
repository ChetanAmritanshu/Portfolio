import type { ProjectDossier } from "~/content/types";

export function ArchitectureDiagram({ architecture }: { architecture: NonNullable<ProjectDossier["architecture"]> }) {
  const isFanIn = architecture.layout === "fan-in";
  return <figure className={`architecture-diagram${isFanIn ? " architecture-diagram--fan-in" : ""}`} aria-labelledby="architecture-caption">
    <figcaption id="architecture-caption">{architecture.description}</figcaption>
    <ol>
      {architecture.nodes.map((node, index) => <li key={node.id}>
        <span>{String(index + 1).padStart(2, "0")}</span><strong>{node.label}</strong>{node.detail ? <small>{node.detail}</small> : null}
        {!isFanIn && index < architecture.nodes.length - 1 ? <svg aria-hidden="true" viewBox="0 0 20 48"><path d="M10 0v38m-5-6 5 6 5-6" /></svg> : null}
      </li>)}
    </ol>
  </figure>;
}
