import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AudioProvider } from "~/audio/AudioProvider";
import { SoundToggle } from "~/components/SoundToggle";
import { FakeAudioContext } from "./audioTestDoubles";

function renderToggle() {
  return render(<AudioProvider><SoundToggle /></AudioProvider>);
}

describe("AudioProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: FakeAudioContext,
    });
  });

  afterEach(() => vi.restoreAllMocks());

  it("defaults to sound off, enables, persists, and disables", async () => {
    renderToggle();
    const toggle = screen.getByRole("button", { name: "Enable interface sound" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggle);
    await waitFor(() => expect(screen.getByRole("button", { name: "Disable interface sound" })).toHaveAttribute("aria-pressed", "true"));
    expect(window.localStorage.getItem("portfolio:sound-enabled")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "Disable interface sound" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Enable interface sound" })).toHaveAttribute("aria-pressed", "false"));
    expect(window.localStorage.getItem("portfolio:sound-enabled")).toBe("false");
  });

  it("restores a persisted preference without eagerly creating audio", async () => {
    window.localStorage.setItem("portfolio:sound-enabled", "true");
    const contextSpy = vi.fn(FakeAudioContext);
    Object.defineProperty(window, "AudioContext", { configurable: true, value: contextSpy });
    renderToggle();
    await waitFor(() => expect(screen.getByRole("button", { name: "Disable interface sound" })).toBeInTheDocument());
    expect(contextSpy).not.toHaveBeenCalled();
  });

  it("fails safely to off when storage cannot persist consent", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    renderToggle();
    fireEvent.click(screen.getByRole("button", { name: "Enable interface sound" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Enable interface sound" })).toHaveAttribute("aria-pressed", "false"));
  });

  it("keeps the interface usable when AudioContext initialization fails", async () => {
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: class { constructor() { throw new Error("unsupported"); } },
    });
    renderToggle();
    fireEvent.click(screen.getByRole("button", { name: "Enable interface sound" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Enable interface sound" })).toHaveAttribute("aria-pressed", "false"));
  });
});
