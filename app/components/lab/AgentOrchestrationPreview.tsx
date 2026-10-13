"use client";

import { useEffect, useMemo, useState } from "react";

import { dispatchAudioEvent } from "~/audio/events";

type WorkflowPhase = "idle" | "planning" | "execution" | "observation" | "complete";

const workflow = [
  { phase: "planning", label: "Request received", detail: "Audit an agent answer against evidence and system constraints." },
  { phase: "planning", label: "Plan created", detail: "Agent brain decomposes the goal into three bounded tool checks." },
  { phase: "planning", label: "Tools selected", detail: "Search, Code and Memory are selected for this deterministic run." },
  { phase: "execution", label: "Search executed", detail: "Public facts are retrieved and returned to the agent." },
  { phase: "execution", label: "Code executed", detail: "Implementation behavior is checked against the request." },
  { phase: "execution", label: "Memory executed", detail: "Known constraints are recalled without inventing new facts." },
  { phase: "observation", label: "Observations merged", detail: "Tool results are compared and conflicts are surfaced." },
  { phase: "complete", label: "Response complete", detail: "A grounded final response is ready for the user." },
] as const satisfies readonly { phase: Exclude<WorkflowPhase, "idle">; label: string; detail: string }[];

const phases = ["planning", "execution", "observation", "complete"] as const;

function phaseIndex(phase: WorkflowPhase) {
  return phase === "idle" ? -1 : phases.indexOf(phase);
}

export function AgentOrchestrationPreview() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const state = step >= 0 ? workflow[step] : null;
  const phase: WorkflowPhase = state?.phase ?? "idle";

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(query.matches);
    syncPreference();
    query.addEventListener?.("change", syncPreference);
    return () => query.removeEventListener?.("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!running || reducedMotion) return;
    const timer = window.setTimeout(() => {
      setStep((current) => {
        const next = current + 1;
        if (next >= workflow.length - 1) setRunning(false);
        return Math.min(next, workflow.length - 1);
      });
    }, 820);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, running, step]);

  const activeTool = useMemo(() => {
    if (step === 3) return "search";
    if (step === 4) return "code";
    if (step === 5) return "memory";
    return null;
  }, [step]);

  const toggleSimulation = () => {
    dispatchAudioEvent({ name: "ui:select" });
    if (reducedMotion) {
      setStep(workflow.length - 1);
      setRunning(false);
      return;
    }
    if (step >= workflow.length - 1) {
      setStep(0);
      setRunning(true);
      return;
    }
    if (step < 0) setStep(0);
    setRunning((current) => !current);
  };

  const packetPaths = (() => {
    if (!running || reducedMotion) return [];
    if (step <= 1) return ["M180 150H315"];
    if (step === 2 || step === 3) return ["M420 126C465 75 490 48 510 48"];
    if (step === 4) return ["M420 174C465 225 490 252 510 252"];
    if (step === 5) return ["M370 205V230"];
    if (step === 6) return [
      "M510 48C490 48 465 75 420 126",
      "M510 252C490 252 465 225 420 174",
      "M370 230V205",
    ];
    return ["M425 150H580"];
  })();

  return (
    <div
      aria-describedby="agent-network-description agent-network-status"
      aria-label="Interactive Agent Orchestration Network"
      className={`agent-orchestration agent-orchestration--${phase}`}
      role="group"
    >
      <p className="agent-network-description" id="agent-network-description">
        A deterministic workflow routes one user request through an agent brain, Search, Code and Memory tools, then merges observations into a final response.
      </p>

      <div className="agent-orchestration-toolbar">
        <div>
          <span>Orchestration trace // 001</span>
          <strong>{state?.label ?? "Awaiting request"}</strong>
        </div>
        <button aria-pressed={running} onClick={toggleSimulation} type="button">
          <i aria-hidden="true" />
          {running ? "Pause simulation" : step >= workflow.length - 1 ? "Replay workflow" : step >= 0 ? "Resume simulation" : "Run workflow"}
        </button>
      </div>

      <div className="agent-network-canvas">
        <svg aria-hidden="true" className="agent-network" viewBox="0 0 760 300">
          <defs>
            <filter id="agent-network-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <path className={`agent-network-path ${step >= 0 ? "is-active" : ""}`} d="M180 150H315" />
          <path className={`agent-network-path ${step >= 2 ? "is-active" : ""}`} d="M420 126C465 75 490 48 510 48" />
          <path className={`agent-network-path ${step >= 2 ? "is-active" : ""}`} d="M420 174C465 225 490 252 510 252" />
          <path className={`agent-network-path ${step >= 2 ? "is-active" : ""}`} d="M370 205V230" />
          <path className={`agent-network-path ${step >= 7 ? "is-complete" : ""}`} d="M425 150H580" />

          <g className={`agent-network-node agent-network-node--request ${step >= 0 ? "is-active" : ""}`} transform="translate(28 121)">
            <rect height="58" rx="3" width="152" />
            <text x="76" y="25">USER REQUEST</text>
            <text className="agent-network-node-detail" x="76" y="42">GOAL // EVIDENCE AUDIT</text>
          </g>

          <g className={`agent-network-node agent-network-node--brain ${step >= 1 ? "is-active" : ""}`} transform="translate(315 95)">
            <circle className="agent-core-ring" cx="55" cy="55" r="51" />
            <circle cx="55" cy="55" r="42" />
            <text x="55" y="51">AGENT</text>
            <text className="agent-network-node-detail" x="55" y="69">BRAIN // PLAN</text>
          </g>

          <g className={`agent-network-node agent-network-node--tool ${activeTool === "search" ? "is-active" : ""}`} transform="translate(510 24)">
            <rect height="48" rx="24" width="110" />
            <text x="55" y="30">SEARCH</text>
          </g>
          <g className={`agent-network-node agent-network-node--tool ${activeTool === "code" ? "is-active" : ""}`} transform="translate(510 228)">
            <rect height="48" rx="24" width="110" />
            <text x="55" y="30">CODE</text>
          </g>
          <g className={`agent-network-node agent-network-node--tool ${activeTool === "memory" ? "is-active" : ""}`} transform="translate(315 230)">
            <rect height="48" rx="24" width="110" />
            <text x="55" y="30">MEMORY</text>
          </g>

          <g className={`agent-network-node agent-network-node--response ${step >= 7 ? "is-complete" : ""}`} transform="translate(580 121)">
            <rect height="58" rx="3" width="152" />
            <text x="76" y="25">FINAL RESPONSE</text>
            <text className="agent-network-node-detail" x="76" y="42">GROUNDED // COMPLETE</text>
          </g>

          {packetPaths.map((path, index) => (
            <circle className="agent-network-packet" key={`${step}-${path}`} r="4">
              <animateMotion begin={`${index * 0.12}s`} dur=".78s" fill="freeze" path={path} />
            </circle>
          ))}
        </svg>
      </div>

      <ol aria-label="Workflow states" className="agent-phase-rail">
        {phases.map((item, index) => {
          const current = phaseIndex(phase);
          return <li className={index === current ? "is-current" : index < current ? "is-done" : undefined} key={item}><i aria-hidden="true" />{item}</li>;
        })}
      </ol>

      <p aria-live="polite" className="agent-network-status" id="agent-network-status">
        <span>{String(Math.max(step + 1, 0)).padStart(2, "0")} / {String(workflow.length).padStart(2, "0")}</span>
        {state?.detail ?? "Run the deterministic workflow to inspect planning, execution, observation and completion."}
        {reducedMotion ? " Reduced-motion mode shows the completed trace without animated packets." : ""}
      </p>
    </div>
  );
}
