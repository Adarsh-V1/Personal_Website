"use client";

import { useEffect, useRef, useState } from "react";
import { MoonStar, SunMedium, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../utils/cn";

const SOUND_STORAGE_KEY = "portfolio-ambient-sound";

const isAudioSupported = () =>
  typeof window !== "undefined" &&
  ("AudioContext" in window || "webkitAudioContext" in window);

const createNoiseBuffer = (ctx) => {
  const length = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.25;
  }

  return buffer;
};

export default function ThemeControls({ mobile = false }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const audioContextRef = useRef(null);
  const audioNodesRef = useRef(null);

  const stopAmbient = () => {
    const context = audioContextRef.current;
    const nodes = audioNodesRef.current;

    if (!context || !nodes) {
      return;
    }

    const now = context.currentTime;
    nodes.masterGain.gain.cancelScheduledValues(now);
    nodes.masterGain.gain.setValueAtTime(nodes.masterGain.gain.value, now);
    nodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    window.setTimeout(() => {
      nodes.oscillatorA.stop();
      nodes.oscillatorB.stop();
      nodes.noiseSource.stop();
      nodes.lfo.stop();
      context.close();
      audioContextRef.current = null;
      audioNodesRef.current = null;
    }, 240);
  };

  const startAmbient = async () => {
    if (!isAudioSupported()) {
      return false;
    }

    if (audioContextRef.current) {
      return true;
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    audioContextRef.current = ctx;

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.0001;

    const lowPass = ctx.createBiquadFilter();
    lowPass.type = "lowpass";
    lowPass.frequency.value = 360;
    lowPass.Q.value = 0.7;

    const oscillatorA = ctx.createOscillator();
    oscillatorA.type = "triangle";
    oscillatorA.frequency.value = 46;

    const oscillatorAGain = ctx.createGain();
    oscillatorAGain.gain.value = 0.015;

    const oscillatorB = ctx.createOscillator();
    oscillatorB.type = "sine";
    oscillatorB.frequency.value = 79;

    const oscillatorBGain = ctx.createGain();
    oscillatorBGain.gain.value = 0.008;

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.09;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.0035;

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = createNoiseBuffer(ctx);
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 900;
    noiseFilter.Q.value = 0.4;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.0022;

    oscillatorA.connect(oscillatorAGain);
    oscillatorAGain.connect(lowPass);
    oscillatorB.connect(oscillatorBGain);
    oscillatorBGain.connect(lowPass);
    lowPass.connect(masterGain);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);

    masterGain.connect(ctx.destination);

    oscillatorA.start();
    oscillatorB.start();
    noiseSource.start();
    lfo.start();

    const now = ctx.currentTime;
    masterGain.gain.exponentialRampToValueAtTime(0.024, now + 0.9);

    audioNodesRef.current = {
      masterGain,
      oscillatorA,
      oscillatorB,
      noiseSource,
      lfo,
    };

    return true;
  };

  const toggleAmbient = async () => {
    const next = !ambientEnabled;

    if (next) {
      const started = await startAmbient();
      if (!started) {
        return;
      }
    } else {
      stopAmbient();
    }

    setAmbientEnabled(next);
    window.localStorage.setItem(SOUND_STORAGE_KEY, next ? "on" : "off");
  };

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "lotm" ? "light" : "lotm";
    setTheme(nextTheme);
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(SOUND_STORAGE_KEY);
    if (stored === "on") {
      setAmbientEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!ambientEnabled || !isAudioSupported()) {
      return undefined;
    }

    startAmbient().catch(() => {
      setAmbientEnabled(false);
      window.localStorage.setItem(SOUND_STORAGE_KEY, "off");
    });

    return undefined;
  }, [ambientEnabled]);

  useEffect(
    () => () => {
      stopAmbient();
    },
    []
  );

  const isLotm = resolvedTheme === "lotm";
  const nextThemeLabel = isLotm ? "Switch to light theme" : "Switch to LOTM theme";
  const soundLabel = ambientEnabled ? "Mute ambient sound" : "Enable ambient sound";

  return (
    <div className={cn("flex items-center gap-1.5", mobile && "w-full justify-end")}>
      <button
        type="button"
        data-ui-feedback
        onClick={toggleTheme}
        className={cn(
          "theme-control-btn inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
          mobile ? "h-9 w-9" : "",
          isLotm
            ? "border-[#d49a3f]/60 bg-[#0b1220]/88 text-[#f2f8ff] hover:bg-[#121d2f]"
            : "border-white/70 bg-white/80 text-slate-700 hover:bg-white"
        )}
        aria-label={nextThemeLabel}
      >
        {isLotm ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
        <span className="sr-only">{nextThemeLabel}</span>
      </button>

      <button
        type="button"
        data-ui-feedback
        onClick={toggleAmbient}
        className={cn(
          "theme-control-btn inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
          mobile ? "h-9 w-9" : "",
          isLotm
            ? "border-[#d49a3f]/50 bg-[#070b13]/88 text-[#c1d6f7] hover:bg-[#101a2a]"
            : "border-white/70 bg-white/78 text-slate-700 hover:bg-white"
        )}
        aria-label={soundLabel}
      >
        {ambientEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
        <span className="sr-only">{soundLabel}</span>
      </button>
    </div>
  );
}
