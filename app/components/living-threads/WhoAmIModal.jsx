'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ModalBackdrop, { HudWindow } from './ModalBackdrop';
import ChatBot from './ChatBot';
import { PERSONAL, QUESTIONS } from './data';
import { Sound } from './sound';

export default function WhoAmIModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'who-am-i') || {};
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

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
      subtitle="5 HOLOGRAPHIC WINDOWS MATERIALIZED • CLEARANCE LEVEL 5"
      accentColor="#00f0ff"
      maxWidth="max-w-7xl"
    >
      {/* 5-Window Futuristic Matrix Array (Different Sizes & Staggered Animations) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* WINDOW 1: Biometric Identity & Holographic Avatar (4 Cols) */}
        <HudWindow
          title="BIOMETRIC DOSSIER"
          tag="ID // 0x4A"
          accentColor="#00f0ff"
          delay={0.04}
          animationType="scale"
          className="md:col-span-4"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/50 p-0.5 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/80">
                <Image
                  src={PERSONAL.profileImage}
                  alt={PERSONAL.name}
                  fill
                  sizes="112px"
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute bottom-1.5 inset-x-1.5 bg-black/80 backdrop-blur-md rounded-md py-0.5 border border-cyan-400/30 text-[9px] font-mono text-cyan-300">
                ● ACTIVE & SHIPPING
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white font-mono">
                {PERSONAL.name}
              </h2>
              <p className="text-xs text-cyan-300 font-mono mt-0.5">
                {PERSONAL.currentRole}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed text-left">
              {PERSONAL.tagline} Shipped 6+ production apps from AI video synthesis to HIPAA health suites.
            </p>
          </div>
        </HudWindow>

        {/* WINDOW 2: Live Telemetry & Vitals Pod (3 Cols) */}
        <HudWindow
          title="TELEMETRY POD"
          tag="VITALS"
          accentColor="#22d3ee"
          delay={0.10}
          animationType="slideLeft"
          className="md:col-span-3"
        >
          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">♟️ Chess Elo:</span>
              <span className="text-amber-300 font-bold">2000 Rapid</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">📍 Geo Base:</span>
              <span className="text-slate-200">Mohali, India</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">⏱️ Timezone:</span>
              <span className="text-slate-200">IST (UTC+5:30)</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">⚡ Response SLA:</span>
              <span className="text-emerald-400 font-semibold">&lt; 12 Hours</span>
            </div>
          </div>
        </HudWindow>

        {/* WINDOW 3: 15s Voice Memo Synthesizer (5 Cols) */}
        <HudWindow
          title="AUDIO WAVE MEMO"
          tag="PROCEDURAL"
          accentColor="#00f0ff"
          delay={0.16}
          animationType="slideRight"
          className="md:col-span-5"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2.5 rounded-xl border border-cyan-400/25 bg-cyan-950/30 backdrop-blur-md">
              <button
                onClick={toggleAudio}
                className="w-9 h-9 rounded-xl bg-cyan-400 text-black flex items-center justify-center font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer shrink-0"
              >
                {isPlayingAudio ? '❚❚' : '▶'}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 mb-1">
                  <span>Voice Memo Transceiver</span>
                  <span>{isPlayingAudio ? `${Math.round(audioProgress * 0.15)}s` : '0:15'}</span>
                </div>
                <div className="h-1.5 w-full bg-cyan-950 rounded-full overflow-hidden border border-cyan-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-mono text-center">
              &quot;Hey, glad you pulled this string—here&apos;s who I am in 15 seconds.&quot;
            </p>
          </div>
        </HudWindow>

        {/* WINDOW 4: Engineering Core Matrix - 4 Architecture Pillars (5 Cols) */}
        <HudWindow
          title="ENGINEERING PILLARS"
          tag="STACK // 4X"
          accentColor="#38bdf8"
          delay={0.22}
          animationType="slideUp"
          className="md:col-span-5"
        >
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/20">
              <div className="text-cyan-400 font-mono text-[11px] font-semibold">⚡ Full-Stack Core</div>
              <div className="text-slate-400 text-[10px] mt-0.5">Database to pixel, edge runtime APIs</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/20">
              <div className="text-cyan-400 font-mono text-[11px] font-semibold">🧩 68% Cost Cuts</div>
              <div className="text-slate-400 text-[10px] mt-0.5">Smart polyline & directions cache</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/20">
              <div className="text-cyan-400 font-mono text-[11px] font-semibold">📐 Type-Safe Edge</div>
              <div className="text-slate-400 text-[10px] mt-0.5">Next.js 15, Hono, Prisma, RBAC</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/20">
              <div className="text-cyan-400 font-mono text-[11px] font-semibold">🤝 Dev Multiplier</div>
              <div className="text-slate-400 text-[10px] mt-0.5">Mentored 10+ junior developers</div>
            </div>
          </div>
        </HudWindow>

        {/* WINDOW 5: Neural AI Assistant Pod (7 Cols) */}
        <HudWindow
          title="NEURAL AI TWIN"
          tag="INTERACTIVE"
          accentColor="#00f0ff"
          delay={0.28}
          animationType="glitch"
          className="md:col-span-7"
        >
          <ChatBot
            nodeId="who-am-i"
            initialFollowUps={nodeConfig.followUps || []}
            responsesMap={nodeConfig.responses || {}}
            accentColor="#00f0ff"
          />
        </HudWindow>
      </div>
    </ModalBackdrop>
  );
}
  );
}
