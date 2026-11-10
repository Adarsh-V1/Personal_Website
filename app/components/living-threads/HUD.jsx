'use client';

import React, { useState, useEffect } from 'react';
import { Sound, LoFiRadio } from './sound';

export default function HUD({
  theme = 'dark',
  lightingMode = 'cyber-void',
  exploredCount = 0,
  totalCount = 11,
  onRecruiterClick,
}) {
  const [timeStr, setTimeStr] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(LoFiRadio.tracks[0]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync with LoFiRadio background status
  useEffect(() => {
    const checkRadio = setInterval(() => {
      if (LoFiRadio.isPlaying !== radioPlaying) {
        setRadioPlaying(LoFiRadio.isPlaying);
      }
    }, 350);
    return () => clearInterval(checkRadio);
  }, [radioPlaying]);

  const handleToggleRadio = () => {
    Sound.init();
    const active = LoFiRadio.toggle();
    setRadioPlaying(active);
  };

  const handleNextTrack = () => {
    Sound.init();
    const next = LoFiRadio.nextTrack();
    setCurrentTrack(next);
    setRadioPlaying(true);
  };

  const handleToggleMute = () => {
    const muted = Sound.toggleMute();
    setIsMuted(muted);
    if (muted && radioPlaying) {
      LoFiRadio.stop();
      setRadioPlaying(false);
    }
  };

  return (
    <>
      {/* Top-Left: Recruiter Fast-Track Button (Mobile-Aware Compact) */}
      <div className="fixed top-3 sm:top-5 left-3 sm:left-5 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            Sound.click();
            onRecruiterClick();
          }}
          className="group relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/40 text-amber-300 hover:text-white font-mono text-[10px] sm:text-xs font-semibold backdrop-blur-xl shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:shadow-[0_0_25px_rgba(251,191,36,0.35)] transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-ping" />
          <span>⚡ <span className="hidden sm:inline">Fast / </span>Recruiter<span className="hidden sm:inline"> View</span></span>
          <span className="opacity-60 group-hover:translate-x-0.5 transition-transform hidden sm:inline">→</span>
        </button>
      </div>

      {/* Top-Right: Sound Mute & Lighting Mode indicator */}
      <div className="fixed top-3 sm:top-5 right-40 sm:right-48 z-40 hidden md:flex items-center gap-2 font-mono text-[11px] text-slate-400">
        <button
          onClick={handleToggleMute}
          className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 backdrop-blur-md text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          title="Toggle Synthesizer Sound Design"
        >
          <span>{isMuted ? '🔇 Audio Muted' : '🔊 Audio Active'}</span>
        </button>

        <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
          <span className="text-cyan-400 uppercase font-semibold">Mode: </span>
          <span>{lightingMode}</span>
        </div>
      </div>

      {/* Bottom Telemetry & Built-In Lo-Fi Ambient Radio Bar (Streamlined Horizontal Row on Mobile) */}
      <div className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-5 z-30 pointer-events-none flex items-center justify-between gap-2 font-mono text-[11px] text-slate-400/80">
        {/* Left: Telemetry Data */}
        <div className="pointer-events-auto flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-slate-200 font-semibold hidden sm:inline">Status: Online</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="text-[10px] sm:text-[11px] text-slate-300">
            <span className="hidden sm:inline">Mohali (IST): </span>{timeStr || '18:40'}
          </div>
          <span className="hidden lg:inline text-white/20">•</span>
          <div className="hidden lg:block text-slate-400">Tether: 11 Verlet Chains</div>
        </div>

        {/* Center: Built-in Lo-Fi Ambient Radio Cassette Player */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-black/75 border border-amber-500/30 backdrop-blur-2xl shadow-[0_0_25px_rgba(251,191,36,0.15)] text-slate-200">
          {/* Animated Cassette Tape Reel */}
          <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
            <span className={`inline-block ${radioPlaying ? 'animate-spin' : ''}`}>◓</span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-300">LO-FI</span>
            <span className={`inline-block hidden sm:inline ${radioPlaying ? 'animate-spin' : ''}`}>◓</span>
          </div>

          <div className="hidden md:block text-left border-l border-white/15 pl-2.5">
            <div className="text-[11px] font-semibold text-white leading-tight">
              {currentTrack.title}
            </div>
            <div className="text-[9px] text-amber-400/90 font-mono">
              {currentTrack.tag}
            </div>
          </div>

          {/* Radio Controls */}
          <div className="flex items-center gap-1 ml-0.5 sm:ml-1">
            <button
              onClick={handleToggleRadio}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all cursor-pointer ${
                radioPlaying
                  ? 'bg-amber-400 text-black shadow-[0_0_12px_#fbbf24]'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={radioPlaying ? 'Pause Ambient Radio' : 'Play Ambient Radio'}
            >
              {radioPlaying ? '❚❚' : '▶'}
            </button>
            <button
              onClick={handleNextTrack}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-[10px] sm:text-xs transition-all cursor-pointer"
              title="Next Track"
            >
              ⏭
            </button>
          </div>
        </div>

        {/* Right: Constellation Explorer Count */}
        <div className="pointer-events-auto p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-black/60 border border-amber-400/30 backdrop-blur-xl text-amber-300 flex items-center gap-1.5 sm:gap-2 shadow-lg text-[10px] sm:text-xs">
          <span>✨</span>
          <span className="font-semibold"><span className="hidden sm:inline">Explored: </span>{exploredCount}/{totalCount}</span>
        </div>
      </div>
    </>
  );
}
