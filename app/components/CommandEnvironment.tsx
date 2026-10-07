"use client";

import { useEffect, useState, type CSSProperties } from "react";

import {
  PROJECT_PREVIEW_EVENT,
  type ProjectPreviewDetail,
} from "~/lib/interactions";

const particles = [
  [14, 22, 0.28, 42],
  [29, 66, 0.18, 50],
  [45, 36, 0.22, 46],
  [62, 58, 0.26, 39],
  [77, 18, 0.16, 52],
  [89, 49, 0.24, 44],
] as const;

type ParticleStyle = CSSProperties & {
  "--particle-x": string;
  "--particle-y": string;
  "--particle-opacity": number;
  "--particle-duration": string;
};

export function CommandEnvironment() {
  const [accent, setAccent] = useState<ProjectPreviewDetail["accent"]>("cyan");

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const resetDepth = () => {
      root.style.setProperty("--motion-x", "0px");
      root.style.setProperty("--motion-y", "0px");
      root.style.setProperty("--motion-x-soft", "0px");
      root.style.setProperty("--motion-y-soft", "0px");
      root.style.setProperty("--motion-x-reverse", "0px");
      root.style.setProperty("--motion-y-reverse", "0px");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 7;
        const y = (event.clientY / window.innerHeight - 0.5) * 5;
        root.style.setProperty("--motion-x", `${x.toFixed(2)}px`);
        root.style.setProperty("--motion-y", `${y.toFixed(2)}px`);
        root.style.setProperty("--motion-x-soft", `${(x * 0.3).toFixed(2)}px`);
        root.style.setProperty("--motion-y-soft", `${(y * 0.3).toFixed(2)}px`);
        root.style.setProperty("--motion-x-reverse", `${(x * -0.55).toFixed(2)}px`);
        root.style.setProperty("--motion-y-reverse", `${(y * -0.55).toFixed(2)}px`);
      });
    };

    const onPreview = (event: Event) => {
      setAccent((event as CustomEvent<ProjectPreviewDetail>).detail.accent);
    };

    const onMotionPreference = () => {
      if (reducedMotion.matches) resetDepth();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener(PROJECT_PREVIEW_EVENT, onPreview);
    reducedMotion.addEventListener("change", onMotionPreference);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener(PROJECT_PREVIEW_EVENT, onPreview);
      reducedMotion.removeEventListener("change", onMotionPreference);
      resetDepth();
    };
  }, []);

  return (
    <div className="environment-layer" data-accent={accent} aria-hidden="true">
      <div className="environment-grid" />
      <div className="environment-light light-cyan" />
      <div className="environment-light light-crimson" />
      <div className="ambient-particles">
        {particles.map(([x, y, opacity, duration]) => (
          <i
            key={`${x}-${y}`}
            style={
              {
                "--particle-x": `${x}%`,
                "--particle-y": `${y}%`,
                "--particle-opacity": opacity,
                "--particle-duration": `${duration}s`,
              } as ParticleStyle
            }
          />
        ))}
      </div>
      <div className="scanlines" />
    </div>
  );
}
