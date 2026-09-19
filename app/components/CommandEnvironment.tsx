"use client";

import { useEffect, useState, type CSSProperties } from "react";

import {
  PROJECT_PREVIEW_EVENT,
  type ProjectPreviewDetail,
} from "~/lib/interactions";

const particles = [
  [12, 18, 0.7, 18],
  [20, 62, 0.45, 24],
  [31, 34, 0.6, 20],
  [42, 72, 0.38, 28],
  [53, 21, 0.52, 22],
  [61, 55, 0.7, 17],
  [70, 14, 0.42, 26],
  [78, 68, 0.55, 21],
  [86, 29, 0.68, 19],
  [92, 51, 0.38, 29],
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
        const x = (event.clientX / window.innerWidth - 0.5) * 12;
        const y = (event.clientY / window.innerHeight - 0.5) * 8;
        root.style.setProperty("--motion-x", `${x.toFixed(2)}px`);
        root.style.setProperty("--motion-y", `${y.toFixed(2)}px`);
        root.style.setProperty("--motion-x-soft", `${(x * 0.35).toFixed(2)}px`);
        root.style.setProperty("--motion-y-soft", `${(y * 0.35).toFixed(2)}px`);
        root.style.setProperty("--motion-x-reverse", `${(x * -0.7).toFixed(2)}px`);
        root.style.setProperty("--motion-y-reverse", `${(y * -0.7).toFixed(2)}px`);
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
