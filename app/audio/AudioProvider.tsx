"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { AudioManager } from "./AudioManager";
import { AudioControlsContext } from "./AudioControls";
import { AUDIO_EVENT, type SemanticAudioEvent } from "./events";

const STORAGE_KEY = "portfolio:sound-enabled";

export function AudioProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [manager] = useState(() => new AudioManager());
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let storedPreference: boolean;
    try {
      storedPreference = window.localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      storedPreference = false;
    }
    manager.restorePreference(storedPreference);
    const preferenceFrame = window.requestAnimationFrame(() => setEnabled(manager.isEnabled));

    const onAudioEvent = (event: Event) => {
      void manager.play((event as CustomEvent<SemanticAudioEvent>).detail);
    };
    const onVisibilityChange = () => {
      void manager.setVisible(document.visibilityState === "visible");
    };
    window.addEventListener(AUDIO_EVENT, onAudioEvent);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener(AUDIO_EVENT, onAudioEvent);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.cancelAnimationFrame(preferenceFrame);
      void manager.dispose();
    };
  }, [manager]);

  const toggle = useCallback(async () => {
    const requestedEnabled = !manager.isEnabled;
    const nextEnabled = requestedEnabled ? await manager.enable() : false;
    if (!requestedEnabled) manager.disable();
    setEnabled(nextEnabled);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(nextEnabled));
    } catch {
      if (requestedEnabled) {
        manager.disable();
        setEnabled(false);
      }
    }
  }, [manager]);

  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle]);
  return <AudioControlsContext.Provider value={value}>{children}</AudioControlsContext.Provider>;
}
