export const AUDIO_EVENT = "portfolio:audio";

export const semanticAudioEvents = [
  "ui:hover",
  "ui:focus",
  "ui:select",
  "navigation:enter",
  "navigation:back",
  "system:hover",
  "system:select",
  "system:enter",
  "system:exit",
  "sound:enable",
  "sound:disable",
  "boot:signal",
  "boot:initialize",
  "boot:ready",
  "boot:reveal",
] as const;

export type SemanticAudioEventName = (typeof semanticAudioEvents)[number];

export interface SemanticAudioEvent {
  name: SemanticAudioEventName;
  projectSlug?: string;
}

export function dispatchAudioEvent(detail: SemanticAudioEvent): void {
  window.dispatchEvent(new CustomEvent<SemanticAudioEvent>(AUDIO_EVENT, { detail }));
}
