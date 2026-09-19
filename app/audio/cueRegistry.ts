import type { SemanticAudioEventName } from "./events";

export type AudioChannel = "ambient" | "ui" | "transition" | "system";

export interface CueDefinition {
  channel: Exclude<AudioChannel, "ambient">;
  duration: number;
  frequency: number;
  gain: number;
  sweep?: number;
  throttleMs: number;
  wave: OscillatorType;
}

export const cueRegistry: Readonly<Record<SemanticAudioEventName, CueDefinition>> = {
  "ui:hover": { channel: "ui", duration: 0.025, frequency: 1320, gain: 0.025, throttleMs: 90, wave: "square" },
  "ui:focus": { channel: "ui", duration: 0.035, frequency: 980, gain: 0.025, throttleMs: 90, wave: "sine" },
  "ui:select": { channel: "ui", duration: 0.07, frequency: 620, gain: 0.05, sweep: 180, throttleMs: 80, wave: "triangle" },
  "navigation:enter": { channel: "transition", duration: 0.22, frequency: 150, gain: 0.09, sweep: 90, throttleMs: 250, wave: "sine" },
  "navigation:back": { channel: "transition", duration: 0.16, frequency: 430, gain: 0.055, sweep: -250, throttleMs: 200, wave: "triangle" },
  "system:hover": { channel: "system", duration: 0.055, frequency: 760, gain: 0.032, sweep: 65, throttleMs: 140, wave: "sine" },
  "system:select": { channel: "system", duration: 0.13, frequency: 190, gain: 0.075, sweep: 80, throttleMs: 160, wave: "triangle" },
  "system:enter": { channel: "transition", duration: 0.28, frequency: 105, gain: 0.1, sweep: 95, throttleMs: 300, wave: "sine" },
  "system:exit": { channel: "transition", duration: 0.18, frequency: 360, gain: 0.055, sweep: -210, throttleMs: 220, wave: "triangle" },
  "sound:enable": { channel: "system", duration: 0.18, frequency: 440, gain: 0.05, sweep: 440, throttleMs: 300, wave: "sine" },
  "sound:disable": { channel: "system", duration: 0.12, frequency: 520, gain: 0.045, sweep: -360, throttleMs: 300, wave: "sine" },
  "boot:signal": { channel: "system", duration: 0.05, frequency: 880, gain: 0.025, throttleMs: 300, wave: "sine" },
  "boot:initialize": { channel: "system", duration: 0.12, frequency: 220, gain: 0.035, sweep: 110, throttleMs: 500, wave: "triangle" },
  "boot:ready": { channel: "system", duration: 0.18, frequency: 330, gain: 0.05, sweep: 330, throttleMs: 500, wave: "sine" },
  "boot:reveal": { channel: "transition", duration: 0.22, frequency: 120, gain: 0.065, sweep: 150, throttleMs: 500, wave: "sine" },
};

export const projectAmbientProfiles: Readonly<Record<string, { frequency: number; pulse: number }>> = {
  jarvis: { frequency: 58, pulse: 0.018 },
  ticketforge: { frequency: 46, pulse: 0.024 },
  "trading-square-off": { frequency: 72, pulse: 0.021 },
  "ai-sales-advisor": { frequency: 64, pulse: 0.016 },
};
