'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ModalBackdrop from './ModalBackdrop';
import ChatBot from './ChatBot';
import { PERSONAL, QUESTIONS } from './data';
import { Sound } from './sound';

export default function WhoAmIModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'who-am-i') || {};
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  // Simulated biometric scan entrance
  useEffect(() => {
    if (isOpen) {
      setScanComplete(false);
      const timer = setTimeout(() => {
        setScanComplete(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Simulated 15-second voice intro with audio synthesizers
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          // Subtle audio ticks as voice note plays
          if (Math.random() > 0.6) {
            Sound.tick();
          }
          return prev + 2;
        });
      }, 300);
    } else {
      setAudioProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const toggleAudio = () => {
    Sound.click();
    setIsPlayingAudio((prev) => !prev);
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="DOSSIER // IDENTITY RECORD #001"
      subtitle="BIOMETRIC SCAN VERIFIED • CLEARANCE LEVEL 5"
      accentColor="#00f0ff"
    >
      {/* Biometric HUD Scanning Overlay */}
      {!scanComplete && (
        <div className="relative py-12 flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-cyan-400/20 animate-ping" />
          </div>
          <p className="font-mono text-cyan-300 text-sm tracking-widest uppercase animate-pulse">
            [ SCANNING BIOMETRICS & CODE REPOSITORY... ]
          </p>
        </div>
      )}

      {scanComplete && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Top Dossier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Holographic Avatar Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-cyan-400/50 p-1 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 shadow-[0_0_40px_rgba(0,240,255,0.25)]">
                {/* Hologram scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none z-10" />

                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/60">
                  <Image
                    src={PERSONAL.profileImage}
                    alt={PERSONAL.name}
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md rounded-xl p-2 border border-cyan-400/30 text-center z-10">
                  <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block">
                    STATUS: ACTIVE & SHIPPING
                  </span>
                </div>
              </div>

              {/* 15-Second Voice Intro Player */}
              <div className="w-full max-w-xs mt-4 rounded-2xl p-3 border border-cyan-400/25 bg-cyan-950/20 backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={toggleAudio}
                    className="w-10 h-10 rounded-xl bg-cyan-400 text-black flex items-center justify-center font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer shrink-0"
                  >
                    {isPlayingAudio ? '❚❚' : '▶'}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 mb-1">
                      <span>15s Voice Memo</span>
                      <span>{isPlayingAudio ? `${Math.round(audioProgress * 0.15)}s` : '0:15'}</span>
                    </div>
                    {/* Progress bar / animated waveform */}
                    <div className="h-2 w-full bg-cyan-950 rounded-full overflow-hidden border border-cyan-500/30">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-2 text-center">
                  &quot;Hey, glad you pulled this string—here&apos;s the quick version of who I am...&quot;
                </p>
              </div>
            </div>

            {/* Profile Content Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  [ CANDIDATE OVERVIEW ]
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                  {PERSONAL.name}
                </h2>
                <p className="text-sm sm:text-base text-cyan-200/90 font-mono mt-1">
                  {PERSONAL.currentRole}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {PERSONAL.tagline} I bridge the gap between heavy technical systems and crisp, high-personality user interfaces. From AI video synthesis engines to HIPAA-adjacent health portals, I write code that doesn&apos;t just work—it scales under load.
              </p>

              {/* Identity Pillar Badges */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-400/20">
                  <div className="text-cyan-400 font-mono text-xs font-semibold">⚡ Full-Stack Builder</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">End-to-end architectures from database to pixel</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-400/20">
                  <div className="text-cyan-400 font-mono text-xs font-semibold">🧩 Problem Solver</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Slashing API bills by 68% and squashing race conditions</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-400/20">
                  <div className="text-cyan-400 font-mono text-xs font-semibold">📐 Systems Thinker</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Type-safe APIs, RBAC rules, and edge caching</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-400/20">
                  <div className="text-cyan-400 font-mono text-xs font-semibold">🤝 Tech Mentor</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Tutored 10+ devs in modern web development</div>
                </div>
              </div>

              {/* Vitals Footer */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-white/10">
                <div>📍 {PERSONAL.location}</div>
                <div>⏱️ {PERSONAL.timezone}</div>
                <div>⚡ Response: {PERSONAL.responseTime}</div>
              </div>
            </div>
          </div>

          {/* In-Modal Chatbot */}
          <ChatBot
            nodeId="who-am-i"
            initialFollowUps={nodeConfig.followUps || []}
            responsesMap={nodeConfig.responses || {}}
            accentColor="#00f0ff"
          />
        </div>
      )}
    </ModalBackdrop>
  );
}
