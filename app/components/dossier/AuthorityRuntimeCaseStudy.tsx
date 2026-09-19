import type { AuthorityRuntimeStudy } from "~/content/types";
import { BenchmarkPanel } from "./BenchmarkPanel";
import { CaseStudySection } from "./CaseStudySection";
import { DesignDecisionRecords } from "./DesignDecisionRecord";
import { FailureModeMatrix } from "./FailureModeMatrix";

function List({ items }: { items: readonly string[] }) {
  return <ul className="technical-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Flow({ steps, label }: { steps: readonly string[]; label: string }) {
  return <ol className="authority-flow" aria-label={label}>{steps.map((step, index) => <li key={`${step}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>;
}

export function AuthorityRuntimeCaseStudy({ study }: { study: AuthorityRuntimeStudy }) {
  let section = 1;
  const index = () => String(section++).padStart(2, "0");
  return <>
    <CaseStudySection id="mission" index={index()} title="Mission">
      <div className="authority-question"><span>Primary question</span><strong>{study.primaryQuestion}</strong><p>Intent is not authority.</p></div>
      <List items={study.overview} />
    </CaseStudySection>

    <CaseStudySection id="system-status" index={index()} title="System status">
      <div className="status-panel"><span>Current classification</span><strong>{study.statusStatement}</strong><p>Verified architectural boundaries with explicitly documented gaps.</p></div>
    </CaseStudySection>

    <CaseStudySection id="active-architecture" index={index()} title="Active architecture">
      <p className="dossier-prose">The production composition routes authenticated remote tasks into one persistent, serialized Codex thread.</p>
      <Flow steps={study.activeFlow} label="Active Codex-backed execution flow" />
    </CaseStudySection>

    <CaseStudySection id="trust-boundaries" index={index()} title="Trust boundaries">
      <div className="boundary-legend"><span className="is-jarvis">JARVIS-enforced</span><span className="is-external">External Codex-enforced</span><span className="is-effect">Sensitive side effect</span></div>
      <ol className="trust-stack">{study.trustLayers.map((layer) => <li className={`trust-layer trust-layer--${layer.scope}`} key={layer.label}><span>{layer.scope === "jarvis" ? "JARVIS BOUNDARY" : layer.scope === "external" ? "EXTERNAL BOUNDARY" : "EFFECT DOMAIN"}</span><strong>{layer.label}</strong><p>{layer.detail}</p></li>)}</ol>
      <aside className="truth-note"><strong>Critical distinction</strong><p>The active external tool path and the foundational local policy path are not one universal authority layer.</p></aside>
    </CaseStudySection>

    <CaseStudySection id="text-is-not-authorization" index={index()} title="Text is not authorization">
      <div className="authorization-contrast">
        <article className="authorization-denied"><span>Model / user text</span><blockquote>“yes, approve it”</blockquote><strong>Ordinary task text</strong><b aria-label="Does not resolve approval">×</b><p>Does not resolve the pending approval.</p></article>
        <article className="authorization-granted"><span>Authenticated authorize operation</span><ol>{study.authorizationChecks.map((check) => <li key={check}>{check}</li>)}</ol></article>
      </div>
      <p className="authorization-thesis">Authorization is structural, not linguistic.</p>
      <p className="dossier-prose">This is a verified authority separation. It is not a claim that JARVIS solves prompt injection.</p>
    </CaseStudySection>

    <CaseStudySection id="bridge-state-machine" index={index()} title="Codex bridge state machine">
      <div className="state-machine" aria-label="Codex bridge states">{study.bridgeStates.map((state, stateIndex) => <div className={state === "WAITING_FOR_APPROVAL" || state === "CANCELLING" ? "state-sensitive" : ""} key={`${state}-${stateIndex}`}><span>{state}</span></div>)}</div>
      <p className="dossier-prose">{study.bridgeRecovery}</p>
      <div className="tradeoff-callout"><div><span>Benefit</span><strong>Simpler thread / approval / state correctness</strong></div><div><span>Cost</span><strong>Head-of-line blocking / limited throughput</strong></div></div>
    </CaseStudySection>

    <CaseStudySection id="foundational-runtime" index={index()} title="Foundational local runtime">
      <div className="runtime-comparison">{study.runtimes.map((runtime) => <article key={runtime.label}><header><span>{runtime.status}</span><h3>{runtime.label}</h3></header><p>{runtime.description}</p><Flow steps={runtime.steps} label={`${runtime.label} flow`} />{runtime.limitation ? <aside><strong>Known limitation</strong><p>{runtime.limitation}</p></aside> : null}</article>)}</div>
    </CaseStudySection>

    <CaseStudySection id="tool-boundary" index={index()} title="Tool execution boundary">
      <div className="tool-policy-grid"><article><span>Allowed by default</span><strong>filesystem.list<br />filesystem.read</strong></article><article><span>Require approval</span><strong>filesystem.write<br />filesystem.delete<br />shell.execute</strong><p>No local approval-resumption mechanism exists, so these stop rather than execute under the default foundational path.</p></article><article><span>Read-only broker Git</span><strong>git.status<br />git.diff<br />git.log</strong></article></div>
    </CaseStudySection>

    <CaseStudySection id="os-boundaries" index={index()} title="Workspace / shell / Git boundaries">
      <div className="boundary-cards">{study.boundaries.map((boundary) => <article key={boundary.label}><header><span>{boundary.status}</span><h3>{boundary.label}</h3></header><List items={boundary.items} /><div className="boundary-columns"><div><b>Verified safeguards</b><List items={boundary.safeguards} /></div><div><b>Known limits</b><List items={boundary.limitations} /></div></div></article>)}</div>
    </CaseStudySection>

    <CaseStudySection id="identity" index={index()} title="Identity model">
      <div className="identity-grid">{study.identity.map((identity) => <article key={identity.label}><span>Identity primitive</span><h3>{identity.label}</h3><p>{identity.purpose}</p><aside><b>It is not</b><p>{identity.isNot}</p></aside></article>)}</div>
    </CaseStudySection>

    <CaseStudySection id="deterministic-testing" index={index()} title="Deterministic testing">
      <h3 className="section-question">How do you test an agent without trusting the agent to be deterministic?</h3>
      <div className="evidence-groups">{study.testing.map((group) => <article key={group.label}><span>{group.label}</span><List items={group.items} /></article>)}</div>
      <BenchmarkPanel benchmark={{ label: "Forensic validation", metrics: study.validation, methodology: study.validationNotes.join(" ") }} />
    </CaseStudySection>

    <CaseStudySection id="failure-modes" index={index()} title="Failure matrix"><FailureModeMatrix failures={study.failureModes} /></CaseStudySection>

    <CaseStudySection id="persistence-audit" index={index()} title="Persistence + audit">
      <div className="persistence-grid">{study.persistence.map((group) => <article key={group.label}><span>{group.label}</span><List items={group.items} /></article>)}</div>
      <div className="audit-gap"><span>Consistency limitation</span><div><strong>OS side effect</strong><b>≠ atomic transaction ≠</b><strong>Audit storage</strong></div><List items={study.auditLimitation} /></div>
    </CaseStudySection>

    <CaseStudySection id="tradeoffs" index={index()} title="Tradeoffs"><DesignDecisionRecords decisions={study.tradeoffs} /></CaseStudySection>
    <CaseStudySection id="limitations" index={index()} title="Current engineering boundaries"><List items={study.limitations} /></CaseStudySection>
    <CaseStudySection id="retrospective" index={index()} title="Retrospective"><div className="retrospective-statement"><List items={study.retrospective} /></div></CaseStudySection>
  </>;
}
