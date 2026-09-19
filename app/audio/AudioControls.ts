"use client";

import { createContext, useContext } from "react";

export interface AudioControlsValue {
  enabled: boolean;
  toggle: () => Promise<void>;
}

export const AudioControlsContext = createContext<AudioControlsValue | null>(null);

export function useAudioControls(): AudioControlsValue {
  const value = useContext(AudioControlsContext);
  if (!value) throw new Error("useAudioControls must be used within AudioProvider");
  return value;
}
