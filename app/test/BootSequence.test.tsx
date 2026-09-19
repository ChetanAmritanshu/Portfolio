import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AudioControlsContext } from "~/audio/AudioControls";
import { BootSequence } from "~/boot/BootSequence";
import { INTRO_STORAGE_KEY } from "~/boot/bootModel";

function renderBoot(soundEnabled = false) {
  return render(
    <AudioControlsContext.Provider value={{ enabled: soundEnabled, toggle: async () => undefined }}>
      <main id="main-content" tabIndex={-1}>Portfolio</main>
      <BootSequence />
    </AudioControlsContext.Provider>,
  );
}

function initialize() {
  act(() => vi.advanceTimersByTime(20));
}

function finishAllStates() {
  for (let index = 0; index < 6; index += 1) {
    act(() => vi.advanceTimersByTime(1000));
  }
}

describe("BootSequence", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => ({ matches: false })),
    });
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("plays the full state sequence on first visit and persists completion", () => {
    renderBoot();
    initialize();
    expect(document.querySelector(".boot-overlay")).toHaveAttribute("data-mode", "full");
    expect(document.querySelector(".boot-overlay")).toHaveAttribute("data-state", "signal");

    finishAllStates();
    expect(document.querySelector(".boot-overlay")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(INTRO_STORAGE_KEY)).toBe("true");
  });

  it("uses the micro boot for returning visits", () => {
    window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
    renderBoot();
    initialize();
    expect(document.querySelector(".boot-overlay")).toHaveAttribute("data-mode", "micro");
    finishAllStates();
    expect(document.querySelector(".boot-overlay")).not.toBeInTheDocument();
  });

  it("skips immediately through the button and restores main focus", () => {
    renderBoot();
    initialize();
    fireEvent.click(screen.getByRole("button", { name: /skip/i }));
    act(() => vi.advanceTimersByTime(20));
    expect(document.querySelector(".boot-overlay")).not.toBeInTheDocument();
    expect(document.querySelector("#main-content")).toHaveFocus();
    expect(document.documentElement.style.overflow).toBe("");
    expect(window.localStorage.getItem(INTRO_STORAGE_KEY)).toBe("true");
  });

  it("skips from any active state with Escape", () => {
    renderBoot();
    initialize();
    act(() => vi.advanceTimersByTime(1200));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(document.querySelector(".boot-overlay")).not.toBeInTheDocument();
  });

  it("uses a short reveal instead of the cinematic sequence for reduced motion", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => ({ matches: true })),
    });
    renderBoot();
    initialize();
    expect(document.querySelector(".boot-overlay")).toHaveAttribute("data-mode", "reduced");
    expect(screen.queryByRole("button", { name: /skip/i })).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(300));
    expect(document.querySelector(".boot-overlay")).not.toBeInTheDocument();
  });

  it("reveals the portfolio when storage or initialization state fails", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    renderBoot();
    initialize();
    expect(document.querySelector(".boot-overlay")).not.toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeVisible();
  });

  it("does not depend on audio availability", () => {
    Object.defineProperty(window, "AudioContext", { configurable: true, value: undefined });
    renderBoot(true);
    initialize();
    finishAllStates();
    expect(document.querySelector(".boot-overlay")).not.toBeInTheDocument();
  });

  it("cleans pending work when unmounted during the sequence", () => {
    const view = renderBoot();
    initialize();
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    view.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("falls back to the homepage if intro initialization throws", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => { throw new Error("unavailable"); }),
    });
    renderBoot();
    initialize();
    expect(document.querySelector(".boot-overlay")).not.toBeInTheDocument();
  });
});
