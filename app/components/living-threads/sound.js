// ============================================================
// WEB AUDIO SOUND & LO-FI BACKGROUND RADIO SYNTHESIZER
// 100% Procedural synthesis (zero audio files needed!)
// Features: Plucks, Whooshes, Ticks, Chimes, and Chill Lo-Fi Beats!
// ============================================================

let ctx = null;
let _muted = false;

function getCtx() {
  if (!ctx && typeof window !== 'undefined') {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, dur, type = 'sine', vol = 0.12, detune = 0) {
  if (_muted) return;
  try {
    const c = getCtx();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    gain.gain.setValueAtTime(vol, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + dur);
  } catch (_) { /* swallow */ }
}

// ── PROCEDURAL LO-FI CHILL RADIO ENGINE ────────────────────
class LoFiRadioEngine {
  constructor() {
    this.currentTrack = 0;
    this.isPlaying = false;
    this.hasAutoStarted = false;
    this.nodes = [];
    this.timers = [];
    this.tracks = [
      { id: 0, title: 'Midnight Terminal', tag: 'Chill Lo-Fi Rhodes & Vinyl' },
      { id: 1, title: 'Deep Space Frequency', tag: '432Hz Binaural Drone' },
      { id: 2, title: 'Cyberpunk Pulse', tag: 'Neon Arpeggio' },
    ];
  }

  autoStartOnGesture() {
    if (this.hasAutoStarted || this.isPlaying || _muted) return;
    this.hasAutoStarted = true;
    this.start();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    if (this.isPlaying) return;
    const c = getCtx();
    if (!c) return;
    this.isPlaying = true;
    this.playTrack(this.currentTrack);
  }

  stop() {
    this.isPlaying = false;
    this.timers.forEach((t) => clearInterval(t));
    this.timers = [];
    this.nodes.forEach((n) => {
      try {
        if (n.stop) n.stop();
        n.disconnect();
      } catch (_) {}
    });
    this.nodes = [];
  }

  nextTrack() {
    this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    if (this.isPlaying) {
      this.stop();
      this.isPlaying = true;
      this.playTrack(this.currentTrack);
    }
    return this.tracks[this.currentTrack];
  }

  playTrack(trackIdx) {
    const c = getCtx();
    if (!c) return;
    this.stop();
    this.isPlaying = true;
    this.currentTrack = trackIdx;

    if (trackIdx === 0) {
      // ── TRACK 0: Midnight Terminal (Lush Lo-Fi Rhodes Chords + Soft Vinyl + Sub Kick) ──
      // 1. Vinyl Crackle Filtered Noise
      const bufferSize = c.sampleRate * 2.5;
      const noiseBuffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() > 0.982 ? (Math.random() * 2 - 1) * 0.12 : (Math.random() * 2 - 1) * 0.012;
      }
      const whiteNoise = c.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = c.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1400;
      filter.Q.value = 2.2;

      const crackleGain = c.createGain();
      crackleGain.gain.value = 0.03;

      whiteNoise.connect(filter).connect(crackleGain).connect(c.destination);
      whiteNoise.start();
      this.nodes.push(whiteNoise, filter, crackleGain);

      // 2. Chill Jazz Chords: Dm9 -> G13 -> Cmaj9 -> Am7
      const chordNotes = [
        [146.83, 174.61, 220.0, 261.63, 329.63], // Dm9
        [196.0, 246.94, 293.66, 329.63, 392.0],  // G13
        [130.81, 164.81, 196.0, 246.94, 293.66], // Cmaj9
        [110.0, 130.81, 164.81, 196.0, 246.94],  // Am7
      ];
      let chordStep = 0;

      const playRhodesChord = () => {
        if (!this.isPlaying) return;
        const notes = chordNotes[chordStep % chordNotes.length];
        chordStep++;

        notes.forEach((freq, idx) => {
          if (_muted) return;
          const osc = c.createOscillator();
          const g = c.createGain();
          const lp = c.createBiquadFilter();

          osc.type = 'triangle';
          osc.frequency.value = freq + (Math.random() - 0.5) * 1.5; // subtle detune warmth

          // Tape warmth filter
          lp.type = 'lowpass';
          lp.frequency.value = 750 + idx * 80;

          // Staggered arpeggiated strum (lo-fi human timing)
          const strumOffset = idx * 0.045;
          const startTime = c.currentTime + strumOffset;

          g.gain.setValueAtTime(0.0001, startTime);
          g.gain.exponentialRampToValueAtTime(0.022, startTime + 0.08);
          g.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.4);

          osc.connect(lp).connect(g).connect(c.destination);
          osc.start(startTime);
          osc.stop(startTime + 3.6);
          this.nodes.push(osc, lp, g);
        });

        // 3. Soft Lo-Fi Sub Kick (Heartbeat pulse)
        if (!_muted) {
          const kickOsc = c.createOscillator();
          const kickGain = c.createGain();
          kickOsc.type = 'sine';
          kickOsc.frequency.setValueAtTime(85, c.currentTime);
          kickOsc.frequency.exponentialRampToValueAtTime(38, c.currentTime + 0.25);

          kickGain.gain.setValueAtTime(0.04, c.currentTime);
          kickGain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.4);

          kickOsc.connect(kickGain).connect(c.destination);
          kickOsc.start(c.currentTime);
          kickOsc.stop(c.currentTime + 0.45);
          this.nodes.push(kickOsc, kickGain);
        }
      };

      playRhodesChord();
      const chordTimer = setInterval(playRhodesChord, 3600);
      this.timers.push(chordTimer);

    } else if (trackIdx === 1) {
      // ── TRACK 1: 432Hz Binaural Deep Space Drone ──
      const osc1 = c.createOscillator();
      const osc2 = c.createOscillator();
      const sub = c.createOscillator();
      const gain = c.createGain();

      osc1.frequency.value = 216; // 432 / 2
      osc2.frequency.value = 220; // 4Hz calm binaural pulse
      sub.frequency.value = 54;

      osc1.type = 'sine';
      osc2.type = 'triangle';
      sub.type = 'sine';

      gain.gain.setValueAtTime(0.045, c.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      sub.connect(gain);
      gain.connect(c.destination);

      osc1.start();
      osc2.start();
      sub.start();

      this.nodes.push(osc1, osc2, sub, gain);

    } else {
      // ── TRACK 2: Cyberpunk Pulse — 16th note synth arpeggios ──
      const scale = [146.83, 174.61, 220.0, 261.63, 293.66, 349.23, 440.0];
      let arpStep = 0;

      const tickArp = () => {
        if (!this.isPlaying || _muted) return;
        const freq = scale[arpStep % scale.length];
        arpStep++;

        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;

        const bp = c.createBiquadFilter();
        bp.type = 'lowpass';
        bp.frequency.value = 650 + Math.sin(arpStep * 0.25) * 400;

        g.gain.setValueAtTime(0.016, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.25);

        osc.connect(bp).connect(g).connect(c.destination);
        osc.start();
        osc.stop(c.currentTime + 0.26);
        this.nodes.push(osc, bp, g);
      };

      tickArp();
      const arpTimer = setInterval(tickArp, 220);
      this.timers.push(arpTimer);
    }
  }
}

export const LoFiRadio = new LoFiRadioEngine();

export const Sound = {
  init() { getCtx(); },

  pluck(tension = 0.5) {
    const f = 180 + tension * 600;
    tone(f, 0.35, 'triangle', 0.06 + tension * 0.06);
    tone(f * 1.5, 0.2, 'sine', 0.03 + tension * 0.03, 7);
  },

  whoosh() {
    if (_muted) return;
    try {
      const c = getCtx();
      if (!c) return;
      const len = c.sampleRate * 0.35;
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = c.createBufferSource();
      src.buffer = buf;
      const bp = c.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(900, c.currentTime);
      bp.frequency.exponentialRampToValueAtTime(180, c.currentTime + 0.3);
      bp.Q.value = 1.8;
      const g = c.createGain();
      g.gain.setValueAtTime(0.1, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.35);
      src.connect(bp).connect(g).connect(c.destination);
      src.start();
    } catch (_) { /* swallow */ }
  },

  click() {
    tone(520, 0.07, 'sine', 0.05);
    tone(780, 0.05, 'sine', 0.03);
  },

  themeSwitch() {
    tone(440, 0.14, 'triangle', 0.07);
    setTimeout(() => tone(554, 0.14, 'triangle', 0.07), 80);
    setTimeout(() => tone(659, 0.18, 'triangle', 0.09), 160);
  },

  glitch() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => tone(60 + Math.random() * 2200, 0.04, 'sawtooth', 0.05), i * 35);
    }
  },

  explore() {
    tone(523, 0.1, 'sine', 0.06);
    setTimeout(() => tone(659, 0.1, 'sine', 0.06), 90);
    setTimeout(() => tone(784, 0.18, 'sine', 0.08), 180);
  },

  aiInterface() {
    tone(740, 0.04, 'sine', 0.06);
    setTimeout(() => tone(980, 0.05, 'sine', 0.05), 40);
    setTimeout(() => tone(1320, 0.07, 'sine', 0.04), 85);
  },

  matrixDeploy() {
    tone(440, 0.03, 'sine', 0.05);
    setTimeout(() => tone(660, 0.04, 'sine', 0.04), 50);
    setTimeout(() => tone(880, 0.04, 'triangle', 0.05), 110);
    setTimeout(() => tone(1175, 0.05, 'sine', 0.04), 170);
    setTimeout(() => tone(1568, 0.07, 'sine', 0.03), 230);
  },

  tick() {
    tone(1800, 0.015, 'square', 0.02);
  },

  get muted() { return _muted; },
  setMuted(v) { _muted = v; },
  toggleMute() { _muted = !_muted; return _muted; },
};
