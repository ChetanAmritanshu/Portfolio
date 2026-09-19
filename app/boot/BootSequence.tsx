"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useAudioControls } from "~/audio/AudioControls";
import { dispatchAudioEvent } from "~/audio/events";
import {
  bootInitialState,
  bootSequences,
  INTRO_REPLAY_PARAM,
  INTRO_REPLAY_VALUE,
  INTRO_STORAGE_KEY,
  type BootMode,
  type BootState,
} from "./bootModel";

interface BootRun {
  mode: BootMode;
  state: BootState;
}

const completeRun: BootRun = { mode: "full", state: "complete" };

export function BootSequence() {
  const { enabled: soundEnabled } = useAudioControls();
  const [run, setRun] = useState<BootRun>({ mode: "full", state: "dormant" });
  const initializationFrame = useRef<number | null>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipped = useRef(false);
  const active = run.state !== "dormant" && run.state !== "complete";

  const finish = useCallback((wasSkipped = false) => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    skipped.current = wasSkipped;
    try {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // Persistence is optional; reveal must always succeed.
    }
    setRun(completeRun);
    if (wasSkipped) {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>("#main-content")?.focus({ preventScroll: true });
      });
    }
  }, []);

  useEffect(() => {
    initializationFrame.current = window.requestAnimationFrame(() => {
      try {
        const replayRequested =
          new URLSearchParams(window.location.search).get(INTRO_REPLAY_PARAM) === INTRO_REPLAY_VALUE;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const seen = window.localStorage.getItem(INTRO_STORAGE_KEY) === "true";
        const mode: BootMode = reducedMotion ? "reduced" : replayRequested || !seen ? "full" : "micro";
        setRun({ mode, state: bootInitialState[mode] });
      } catch {
        setRun(completeRun);
      }
    });
    return () => {
      if (initializationFrame.current !== null) window.cancelAnimationFrame(initializationFrame.current);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  useEffect(() => {
    if (run.state === "dormant" || run.state === "complete") return;
    const step = bootSequences[run.mode][run.state];
    if (!step) {
      transitionTimer.current = setTimeout(() => finish(), 0);
      return () => clearTimeout(transitionTimer.current!);
    }
    if (step.event) dispatchAudioEvent({ name: step.event });
    transitionTimer.current = setTimeout(() => {
      if (step.next === "complete") finish();
      else setRun((current) => ({ ...current, state: step.next }));
    }, step.duration);
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, [finish, run.mode, run.state]);

  useEffect(() => {
    if (run.state === "dormant" || run.state === "complete") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finish, run.state]);

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [active]);

  if (run.state === "complete") return null;

  return (
    <div className="boot-overlay" data-mode={run.mode} data-state={run.state}>
      <div className="boot-curtain" aria-hidden="true" />
      <div className="boot-visual" aria-hidden="true">
        <span className="boot-corner boot-corner-nw">CA // 001</span>
        <span className="boot-corner boot-corner-se">COMMAND INTERFACE</span>
        <div className="boot-signal"><i /></div>
        <div className="boot-identity">
          <small>CA // COMMAND INTERFACE</small>
          <p>INITIALIZING</p>
          <h2>CHETAN<span>.</span>AMRITANSHU</h2>
        </div>
        <div className="boot-checks">
          <span>VISUAL LAYER <b>READY</b></span>
          <span>INTERACTION LAYER <b>READY</b></span>
          <span>AUDIO LAYER <b>{soundEnabled ? "AVAILABLE" : "MUTED"}</b></span>
        </div>
        <div className="boot-ready">
          <small>IDENTITY // RECOGNIZED</small>
          <strong>INTERFACE READY</strong>
        </div>
        <div className="boot-sweep boot-sweep-cyan" />
        <div className="boot-sweep boot-sweep-crimson" />
      </div>
      {run.state !== "dormant" && run.mode === "full" ? (
        <button className="boot-skip" onClick={() => finish(true)} type="button">
          Skip <span>// Esc</span>
        </button>
      ) : null}
    </div>
  );
}
