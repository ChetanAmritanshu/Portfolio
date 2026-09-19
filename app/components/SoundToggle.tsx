"use client";

import { useAudioControls } from "~/audio/AudioControls";

export function SoundToggle() {
  const { enabled, toggle } = useAudioControls();
  return (
    <button
      aria-label={enabled ? "Disable interface sound" : "Enable interface sound"}
      aria-pressed={enabled}
      className="sound-toggle"
      onClick={() => void toggle()}
      type="button"
    >
      <span className="status-dot" /> Sound: {enabled ? "On" : "Off"}
    </button>
  );
}
