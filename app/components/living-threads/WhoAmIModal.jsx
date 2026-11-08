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
      subtitle="BIOMETRIC SCAN VERIFIED • 2000 RAPID CHESS • IT COMPANY"
      accentColor="#00f0ff"
      maxWidth="max-w-6xl"
    >
      {/* 2-Column High-Tech Command Cockpit (Zero Overflow / No Scroll on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column (5 cols): Compact Holographic Bio & Voice Memo */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-black/40 border border-cyan-400/20 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-4">
            {/* Holographic Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-cyan-400/50 p-0.5 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 shrink-0 shadow-[0_0_25px_rgba(0,240,255,0.25)]">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/70">
                <Image
                  src={PERSONAL.profileImage}
                  alt={PERSONAL.name}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                [ CANDIDATE RECORD ]
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {PERSONAL.name}
              </h2>
              <p className="text-xs text-cyan-300 font-mono">
                {PERSONAL.currentRole}
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-mono text-amber-300">
                <span>♟️ 2000 Rapid Chess</span>
                <span className="text-white/20">•</span>
                <span className="text-emerald-400">Online</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {PERSONAL.tagline} I bridge the gap between heavy technical systems and crisp user interfaces. 6+ production apps across AI video studios, HIPAA health suites, and real-time fleet telemetry.
          </p>

          {/* 15-Second Voice Intro Player */}
          <div className="rounded-xl p-3 border border-cyan-400/20 bg-cyan-950/30 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAudio}
                className="w-8 h-8 rounded-lg bg-cyan-400 text-black flex items-center justify-center font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_12px_rgba(0,240,255,0.4)] cursor-pointer shrink-0"
              >
                {isPlayingAudio ? '❚❚' : '▶'}
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 mb-1">
                  <span>15s Voice Memo</span>
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
          </div>

          {/* Vitals Footer */}
          <div className="pt-2 flex flex-wrap gap-3 text-[11px] font-mono text-slate-400 border-t border-white/10">
            <div>📍 {PERSONAL.location}</div>
            <div>⏱️ {PERSONAL.timezone}</div>
            <div>⚡ Response: &lt;12h</div>
          </div>
        </div>

        {/* Right Column (7 cols): Micro-Pillars + Instant Neural Assistant */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Top 4 Engineering Pillars */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/20 hover:border-cyan-400/40 transition-colors">
              <div className="text-cyan-400 font-mono text-xs font-semibold">⚡ Full-Stack Core</div>
              <div className="text-slate-400 text-[10px] mt-0.5">End-to-end architectures from database to pixel</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/20 hover:border-cyan-400/40 transition-colors">
              <div className="text-cyan-400 font-mono text-xs font-semibold">🧩 68% Cost Cuts</div>
              <div className="text-slate-400 text-[10px] mt-0.5">Smart API caching & zero-redundant queries</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/20 hover:border-cyan-400/40 transition-colors">
              <div className="text-cyan-400 font-mono text-xs font-semibold">📐 Type-Safe Edge</div>
              <div className="text-slate-400 text-[10px] mt-0.5">Hono.js, Prisma, RBAC, and Next.js 15</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/20 hover:border-cyan-400/40 transition-colors">
              <div className="text-cyan-400 font-mono text-xs font-semibold">🤝 Engineering Multiplier</div>
              <div className="text-slate-400 text-[10px] mt-0.5">Tutored 10+ devs in modern full-stack dev</div>
            </div>
          </div>

          {/* Neural Assistant with Curated Questions */}
          <ChatBot
            nodeId="who-am-i"
            initialFollowUps={nodeConfig.followUps || []}
            responsesMap={nodeConfig.responses || {}}
            accentColor="#00f0ff"
          />
        </div>
      </div>
    </ModalBackdrop>
  );
}
