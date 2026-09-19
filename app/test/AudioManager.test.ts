import { describe, expect, it, vi } from "vitest";

import { AudioManager } from "~/audio/AudioManager";
import { AUDIO_EVENT, dispatchAudioEvent } from "~/audio/events";
import { FakeAudioContext } from "./audioTestDoubles";

describe("AudioManager", () => {
  it("stays lazy and muted until explicitly enabled", async () => {
    const factory = vi.fn(() => new FakeAudioContext() as unknown as AudioContext);
    const manager = new AudioManager(factory);
    await manager.play({ name: "ui:hover" });
    expect(factory).not.toHaveBeenCalled();
    expect(manager.isEnabled).toBe(false);
  });

  it("protects hover cues from rapid repetition", async () => {
    const context = new FakeAudioContext();
    const manager = new AudioManager(() => context as unknown as AudioContext, () => 1000);
    await manager.enable();
    const baseline = context.oscillators.length;
    await manager.play({ name: "system:hover", projectSlug: "ticketforge" });
    await manager.play({ name: "system:hover", projectSlug: "ticketforge" });
    expect(context.oscillators).toHaveLength(baseline + 1);
  });

  it("isolates initialization failure and cleans up an active context", async () => {
    const failed = new AudioManager(() => { throw new Error("unavailable"); });
    await expect(failed.enable()).resolves.toBe(false);
    expect(failed.isEnabled).toBe(false);

    const context = new FakeAudioContext();
    const active = new AudioManager(() => context as unknown as AudioContext);
    await active.enable();
    await active.dispose();
    expect(context.close).toHaveBeenCalledOnce();
    expect(context.oscillators.some((oscillator) => oscillator.stop.mock.calls.length > 0)).toBe(true);
  });

  it("dispatches typed semantic events", () => {
    const listener = vi.fn();
    window.addEventListener(AUDIO_EVENT, listener, { once: true });
    dispatchAudioEvent({ name: "system:select", projectSlug: "jarvis" });
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({
      name: "system:select",
      projectSlug: "jarvis",
    });
  });
});
