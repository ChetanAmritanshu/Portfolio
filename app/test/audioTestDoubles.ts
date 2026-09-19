import { vi } from "vitest";

class FakeAudioParam {
  value = 0;
  setValueAtTime = vi.fn();
  exponentialRampToValueAtTime = vi.fn();
  setTargetAtTime = vi.fn();
}

class FakeGain {
  gain = new FakeAudioParam();
  connect = vi.fn((node: unknown) => node);
  disconnect = vi.fn();
}

class FakeOscillator {
  type: OscillatorType = "sine";
  frequency = new FakeAudioParam();
  connect = vi.fn((node: unknown) => node);
  disconnect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
}

export class FakeAudioContext {
  currentTime = 0;
  destination = {} as AudioDestinationNode;
  state: AudioContextState = "running";
  gains: FakeGain[] = [];
  oscillators: FakeOscillator[] = [];
  resume = vi.fn(async () => { this.state = "running"; });
  suspend = vi.fn(async () => { this.state = "suspended"; });
  close = vi.fn(async () => { this.state = "closed"; });

  createGain = vi.fn(() => {
    const gain = new FakeGain();
    this.gains.push(gain);
    return gain as unknown as GainNode;
  });

  createOscillator = vi.fn(() => {
    const oscillator = new FakeOscillator();
    this.oscillators.push(oscillator);
    return oscillator as unknown as OscillatorNode;
  });
}
