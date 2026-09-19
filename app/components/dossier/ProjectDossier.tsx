import type { Project } from "~/content/types";
import { adjacentProjects } from "~/content/projects";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { AuthorityRuntimeCaseStudy } from "./AuthorityRuntimeCaseStudy";
import { BenchmarkPanel } from "./BenchmarkPanel";
import { CaseStudySection } from "./CaseStudySection";
import { DesignDecisionRecords } from "./DesignDecisionRecord";
import { EvidenceStrip } from "./EvidenceStrip";
import { FailureModeMatrix } from "./FailureModeMatrix";
import { InvariantMatrix } from "./InvariantMatrix";
import { SystemHeader } from "./SystemHeader";
import { SystemNavigation } from "./SystemNavigation";
import { TechnologyStrip } from "./TechnologyStrip";

function TextList({ items }: { items: readonly string[] }) { return <ul className="technical-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>; }

export function ProjectDossier({ project }: { project: Project }) {
  const dossier = project.dossier;
  const navigation = adjacentProjects(project.slug)!;
  let section = 1;
  const index = () => String(section++).padStart(2, "0");
  return <main className={`dossier-shell accent-${project.accent}`} id="main-content" tabIndex={-1}>
    <SystemHeader project={project} /><EvidenceStrip metrics={project.metrics} />
    {dossier.authorityStudy ? <AuthorityRuntimeCaseStudy study={dossier.authorityStudy} /> : <>
    {dossier.context ? <CaseStudySection id="context" index={index()} title="Context"><p className="dossier-prose">{dossier.context}</p></CaseStudySection> : null}
    {dossier.constraints ? <CaseStudySection id="constraints" index={index()} title="Constraints"><TextList items={dossier.constraints} /></CaseStudySection> : null}
    {dossier.architecture ? <CaseStudySection id="architecture" index={index()} title="Architecture"><ArchitectureDiagram architecture={dossier.architecture} />
      {dossier.executionFlow ? <ol className="execution-flow">{dossier.executionFlow.map((step) => <li key={step}>{step}</li>)}</ol> : null}</CaseStudySection> : null}
    {dossier.decisions ? <CaseStudySection id="decisions" index={index()} title="Design decisions"><DesignDecisionRecords decisions={dossier.decisions} /></CaseStudySection> : null}
    {dossier.failureModes ? <CaseStudySection id="failure-modes" index={index()} title="Failure modes"><FailureModeMatrix failures={dossier.failureModes} /></CaseStudySection> : null}
    {dossier.invariants ? <CaseStudySection id="invariants" index={index()} title="Correctness invariants"><InvariantMatrix invariants={dossier.invariants} /></CaseStudySection> : null}
    {dossier.reliability ? <CaseStudySection id="reliability" index={index()} title={dossier.reliabilityTitle ?? "Correctness and reliability"}><TextList items={dossier.reliability} /></CaseStudySection> : null}
    {dossier.performance ? <CaseStudySection id="performance" index={index()} title="Performance evidence"><BenchmarkPanel benchmark={dossier.performance} /></CaseStudySection> : null}
    {dossier.tradeoffs ? <CaseStudySection id="tradeoffs" index={index()} title="Tradeoffs"><TextList items={dossier.tradeoffs} /></CaseStudySection> : null}
    {dossier.results ? <CaseStudySection id="results" index={index()} title="Results"><TextList items={dossier.results} /></CaseStudySection> : null}
    {dossier.limitations ? <CaseStudySection id="limitations" index={index()} title="Not claimed / next engineering boundaries"><TextList items={dossier.limitations} /></CaseStudySection> : null}
    {dossier.retrospective ? <CaseStudySection id="retrospective" index={index()} title="Retrospective"><TextList items={dossier.retrospective} /></CaseStudySection> : null}
    </>}
    <CaseStudySection id="technology" index={dossier.authorityStudy ? "17" : index()} title="Technology"><TechnologyStrip technology={dossier.technology} /></CaseStudySection>
    <SystemNavigation previous={navigation.previous} next={navigation.next} />
  </main>;
}
