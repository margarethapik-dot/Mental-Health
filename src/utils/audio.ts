/**
 * Procedural ambient sound synthesizer using Web Audio API.
 * 100% client-side, zero external assets, resilient to school network filters.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private currentSource: {
    stop: () => void;
  } | null = null;
  private activeSoundName: string | null = null;
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume() {
    return this.volume;
  }

  public getActiveSound() {
    return this.activeSoundName;
  }

  public playGentleChime(freq = 528, duration = 2.5) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      // Gentle harmonic overtone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 1.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.25 * this.volume, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.exponentialRampToValueAtTime(0.08 * this.volume, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration);
      osc2.stop(now + duration);
    } catch {
      // AudioContext might be blocked until user gesture
    }
  }

  public playSoundscape(type: 'rain' | 'waves' | 'bowl' | 'forest') {
    this.stopSoundscape();
    this.initContext();
    if (!this.ctx) return;

    this.activeSoundName = type;

    if (type === 'rain') {
      this.currentSource = this.createRainSound();
    } else if (type === 'waves') {
      this.currentSource = this.createWavesSound();
    } else if (type === 'bowl') {
      this.currentSource = this.createBowlSound();
    } else if (type === 'forest') {
      this.currentSource = this.createForestSound();
    }
  }

  public stopSoundscape() {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch {
        // already stopped
      }
      this.currentSource = null;
    }
    this.activeSoundName = null;
  }

  private createRainSound() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink noise approximation for rain
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.2 * this.volume, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    noiseSource.start();

    return {
      stop: () => {
        try {
          noiseSource.stop();
          noiseSource.disconnect();
        } catch {
          // ignore
        }
      },
    };
  }

  private createWavesSound() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 450;
    filter.Q.value = 1.2;

    const waveLfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    waveLfo.type = 'sine';
    waveLfo.frequency.value = 0.12; // slow rolling wave ~8 seconds cycle
    lfoGain.gain.value = 350;

    waveLfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gainNode = this.ctx.createGain();
    gainNode.gain.value = 0.25 * this.volume;

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    noiseSource.start();
    waveLfo.start();

    return {
      stop: () => {
        try {
          noiseSource.stop();
          waveLfo.stop();
          noiseSource.disconnect();
          waveLfo.disconnect();
        } catch {
          // ignore
        }
      },
    };
  }

  private createBowlSound() {
    if (!this.ctx) return null;
    let isRunning = true;

    const triggerTones = () => {
      if (!isRunning || !this.ctx) return;
      const notes = [432, 528, 639, 396];
      const note = notes[Math.floor(Math.random() * notes.length)];
      this.playGentleChime(note, 4.0);
    };

    triggerTones();
    const interval = window.setInterval(triggerTones, 4500);

    return {
      stop: () => {
        isRunning = false;
        clearInterval(interval);
      },
    };
  }

  private createForestSound() {
    if (!this.ctx) return null;
    const rain = this.createRainSound();
    let isRunning = true;

    const triggerBird = () => {
      if (!isRunning || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const baseFreq = 2200 + Math.random() * 800;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, now + 0.18);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04 * this.volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    };

    const interval = window.setInterval(() => {
      if (Math.random() > 0.4) triggerBird();
    }, 3200);

    return {
      stop: () => {
        isRunning = false;
        clearInterval(interval);
        if (rain) rain.stop();
      },
    };
  }
}

export const soundEngine = new SoundEngine();
