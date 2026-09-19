import type { SemanticAudioEventName } from "~/audio/events";

export const INTRO_STORAGE_KEY = "portfolio:intro-seen";
export const INTRO_REPLAY_PARAM = "intro";
export const INTRO_REPLAY_VALUE = "replay";

export type BootState =
  | "dormant"
  | "signal"
  | "initializing"
  | "checks"
  | "ready"
  | "revealing"
  | "complete";

export type BootMode = "full" | "micro" | "reduced";

interface BootStep {
  duration: number;
  event?: SemanticAudioEventName;
  next: BootState;
}

export const bootSequences: Readonly<Record<BootMode, Partial<Record<BootState, BootStep>>>> = {
  full: {
    signal: { duration: 350, event: "boot:signal", next: "initializing" },
    initializing: { duration: 600, event: "boot:initialize", next: "checks" },
    checks: { duration: 750, next: "ready" },
    ready: { duration: 450, event: "boot:ready", next: "revealing" },
    revealing: { duration: 650, event: "boot:reveal", next: "complete" },
  },
  micro: {
    signal: { duration: 180, event: "boot:signal", next: "revealing" },
    revealing: { duration: 240, event: "boot:reveal", next: "complete" },
  },
  reduced: {
    revealing: { duration: 180, next: "complete" },
  },
};

export const bootInitialState: Readonly<Record<BootMode, BootState>> = {
  full: "signal",
  micro: "signal",
  reduced: "revealing",
};
