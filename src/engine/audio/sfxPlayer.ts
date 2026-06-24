import { getAudioContext, unlockAudio } from './audioUnlock';

let sfxEnabled = true;

export function updateSfxSettings(enabled: boolean) {
  sfxEnabled = enabled;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  gain = 0.12,
) {
  if (!sfxEnabled) return;
  void unlockAudio().then(() => {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    amp.gain.setValueAtTime(gain, ctx.currentTime);
    amp.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(amp);
    amp.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  });
}

function playSequence(notes: Array<{ freq: number; at: number; len: number }>) {
  if (!sfxEnabled) return;
  void unlockAudio().then(() => {
    const ctx = getAudioContext();
    for (const note of notes) {
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = note.freq;
      const start = ctx.currentTime + note.at;
      amp.gain.setValueAtTime(0.11, start);
      amp.gain.exponentialRampToValueAtTime(0.001, start + note.len);
      osc.connect(amp);
      amp.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + note.len);
    }
  });
}

export function playFindSfx() {
  playSequence([
    { freq: 523.25, at: 0, len: 0.08 },
    { freq: 659.25, at: 0.07, len: 0.12 },
  ]);
}

export function playSpecialFindSfx() {
  playSequence([
    { freq: 440, at: 0, len: 0.1 },
    { freq: 554.37, at: 0.08, len: 0.1 },
    { freq: 659.25, at: 0.16, len: 0.14 },
  ]);
}

export function playBrakemanSfx() {
  playSequence([
    { freq: 392, at: 0, len: 0.12 },
    { freq: 523.25, at: 0.1, len: 0.18 },
  ]);
}

export function playMissSfx() {
  playTone(180, 0.1, 'triangle', 0.06);
}
