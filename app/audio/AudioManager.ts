import { cueRegistry, projectAmbientProfiles, type AudioChannel } from "./cueRegistry";
import type { SemanticAudioEvent } from "./events";

export type AudioContextFactory = () => AudioContext;

const channelLevels: Readonly<Record<AudioChannel | "master", number>> = {
  master: 0.42,
  ambient: 0.035,
  ui: 0.55,
  transition: 0.62,
  system: 0.58,
};

export class AudioManager {
  private context: AudioContext | null = null;
  private channels: Partial<Record<AudioChannel | "master", GainNode>> = {};
  private ambientNodes: OscillatorNode[] = [];
  private ambientGains: GainNode[] = [];
  private enabled = false;
  private disposed = false;
  private lastPlayed = new Map<string, number>();
  private suspendTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly createContext: AudioContextFactory = () => {
      const Context = window.AudioContext;
      return new Context();
    },
    private readonly now: () => number = () => performance.now(),
  ) {}

  get isEnabled(): boolean {
    return this.enabled;
  }

  restorePreference(enabled: boolean): void {
    this.enabled = enabled;
  }

  async enable(): Promise<boolean> {
    if (this.disposed) return false;
    this.enabled = true;
    const ready = await this.ensureReady();
    if (!ready) {
      this.enabled = false;
      return false;
    }
    this.startAmbient();
    this.play({ name: "sound:enable" });
    return true;
  }

  disable(): void {
    if (!this.enabled) return;
    this.play({ name: "sound:disable" });
    this.enabled = false;
    this.stopAmbient();
    this.suspendTimer = setTimeout(() => {
      void this.context?.suspend().catch(() => undefined);
    }, 180);
  }

  async play(event: SemanticAudioEvent): Promise<void> {
    if (!this.enabled || this.disposed) return;
    const cue = cueRegistry[event.name];
    const lastPlayed = this.lastPlayed.get(event.name) ?? -Infinity;
    const timestamp = this.now();
    if (timestamp - lastPlayed < cue.throttleMs) return;
    this.lastPlayed.set(event.name, timestamp);

    if (!(await this.ensureReady()) || !this.context) return;
    this.startAmbient();
    if (event.projectSlug && (event.name === "system:hover" || event.name === "system:select")) {
      this.setAmbientProfile(event.projectSlug);
    }

    const output = this.channels[cue.channel];
    if (!output) return;
    try {
      const oscillator = this.context.createOscillator();
      const envelope = this.context.createGain();
      const startsAt = this.context.currentTime;
      oscillator.type = cue.wave;
      oscillator.frequency.setValueAtTime(cue.frequency, startsAt);
      if (cue.sweep) {
        oscillator.frequency.exponentialRampToValueAtTime(
          Math.max(20, cue.frequency + cue.sweep),
          startsAt + cue.duration,
        );
      }
      envelope.gain.setValueAtTime(0.0001, startsAt);
      envelope.gain.exponentialRampToValueAtTime(cue.gain, startsAt + 0.008);
      envelope.gain.exponentialRampToValueAtTime(0.0001, startsAt + cue.duration);
      oscillator.connect(envelope).connect(output);
      oscillator.start(startsAt);
      oscillator.stop(startsAt + cue.duration + 0.01);
    } catch {
      // Audio is enhancement-only. A failed cue must never affect the interface.
    }
  }

  async setVisible(visible: boolean): Promise<void> {
    if (!this.context || !this.enabled) return;
    try {
      if (visible) await this.context.resume();
      else await this.context.suspend();
    } catch {
      // Visibility-related audio failures are intentionally non-fatal.
    }
  }

  async dispose(): Promise<void> {
    this.disposed = true;
    this.enabled = false;
    if (this.suspendTimer) clearTimeout(this.suspendTimer);
    this.stopAmbient();
    const context = this.context;
    this.context = null;
    this.channels = {};
    this.lastPlayed.clear();
    if (context) await context.close().catch(() => undefined);
  }

  private async ensureReady(): Promise<boolean> {
    try {
      if (!this.context) {
        this.context = this.createContext();
        const master = this.context.createGain();
        master.gain.value = channelLevels.master;
        master.connect(this.context.destination);
        this.channels.master = master;
        for (const name of ["ambient", "ui", "transition", "system"] as const) {
          const channel = this.context.createGain();
          channel.gain.value = channelLevels[name];
          channel.connect(master);
          this.channels[name] = channel;
        }
      }
      if (this.context.state === "suspended") await this.context.resume();
      return true;
    } catch {
      return false;
    }
  }

  private startAmbient(): void {
    if (!this.context || this.ambientNodes.length || !this.channels.ambient) return;
    try {
      const profile = projectAmbientProfiles.jarvis;
      for (const [ratio, level] of [[1, profile.pulse], [1.503, profile.pulse * 0.55]] as const) {
        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = profile.frequency * ratio;
        gain.gain.value = level;
        oscillator.connect(gain).connect(this.channels.ambient);
        oscillator.start();
        this.ambientNodes.push(oscillator);
        this.ambientGains.push(gain);
      }
    } catch {
      this.stopAmbient();
    }
  }

  private setAmbientProfile(projectSlug: string): void {
    if (!this.context) return;
    const profile = projectAmbientProfiles[projectSlug];
    if (!profile) return;
    this.ambientNodes.forEach((oscillator, index) => {
      oscillator.frequency.setTargetAtTime(
        profile.frequency * (index === 0 ? 1 : 1.503),
        this.context!.currentTime,
        0.45,
      );
      this.ambientGains[index]?.gain.setTargetAtTime(
        profile.pulse * (index === 0 ? 1 : 0.55),
        this.context!.currentTime,
        0.55,
      );
    });
  }

  private stopAmbient(): void {
    for (const oscillator of this.ambientNodes) {
      try { oscillator.stop(); } catch { /* already stopped */ }
      oscillator.disconnect();
    }
    this.ambientNodes = [];
    this.ambientGains.forEach((gain) => {
      try { gain.disconnect(); } catch { /* already disconnected */ }
    });
    this.ambientGains = [];
  }
}
