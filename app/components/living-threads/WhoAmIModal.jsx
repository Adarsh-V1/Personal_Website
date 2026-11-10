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

  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) { setIsPlayingAudio(false); return 0; }
          if (Math.random() > 0.6) Sound.tick();
          return prev + 2;
        });
      }, 300);
    } else { setAudioProgress(0); }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="IDENTITY DOSSIER #001"
      subtitle="6 SCATTERED WINDOWS • CLEARANCE LEVEL 5"
      accentColor="#00f0ff"
    >
      {/* ── Window 1: Avatar + Name — Top Left ──────── */}
      <HudWindow
        title="BIOMETRIC ID"
        tag="PRIMARY"
        accentColor="#00f0ff"
        animationType="scale"
        delay={0.03}
        pos={{ top: '8%', left: '3%', width: '28%' }}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-cyan-500/40 shrink-0 shadow-lg">
            <Image
              src={PERSONAL.profileImage}
              alt={PERSONAL.name}
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">{PERSONAL.name}</h3>
            <p className="text-[10px] font-mono text-cyan-300">{PERSONAL.currentRole}</p>
            <p className="text-[10px] font-mono text-slate-400">{PERSONAL.location}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-300">ONLINE & AVAILABLE</span>
            </div>
          </div>
        </div>
      </HudWindow>

      {/* ── Window 2: Quick Stats — Top Right ──────── */}
      <HudWindow
        title="TELEMETRY METRICS"
        tag="LIVE"
        accentColor="#fbbf24"
        animationType="slideLeft"
        delay={0.08}
        pos={{ top: '6%', right: '3%', width: '32%' }}
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded-xl bg-white/[0.03] border border-amber-500/20">
            <div className="text-lg font-bold text-amber-400 font-mono">2000</div>
            <div className="text-[9px] text-slate-400 font-mono">Rapid Chess Elo</div>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03] border border-cyan-500/20">
            <div className="text-lg font-bold text-cyan-400 font-mono">&lt;12h</div>
            <div className="text-[9px] text-slate-400 font-mono">Response SLA</div>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03] border border-emerald-500/20">
            <div className="text-lg font-bold text-emerald-400 font-mono">6+</div>
            <div className="text-[9px] text-slate-400 font-mono">Shipped Apps</div>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.03] border border-purple-500/20">
            <div className="text-lg font-bold text-purple-400 font-mono">IST</div>
            <div className="text-[9px] text-slate-400 font-mono">Mohali, India</div>
          </div>
        </div>
      </HudWindow>

      {/* ── Window 3: Voice Memo — Middle Left ──────── */}
      <HudWindow
        title="AUDIO WAVEFORM MEMO"
        tag="15s VOICE NOTE"
        accentColor="#10b981"
        animationType="slideRight"
        delay={0.13}
        pos={{ top: '42%', left: '2%', width: '24%' }}
      >
        <div className="space-y-2.5">
          <button
            onClick={() => { Sound.click(); setIsPlayingAudio(!isPlayingAudio); }}
            className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isPlayingAudio
                ? 'bg-emerald-500 text-black shadow-[0_0_20px_#10b981]'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {isPlayingAudio ? '❚❚ PLAYING...' : '▶ PLAY INTRO'}
          </button>
          {/* Waveform bars */}
          <div className="flex items-end justify-center gap-[2px] h-8">
            {Array.from({ length: 24 }).map((_, i) => {
              const h = isPlayingAudio
                ? 8 + Math.sin(Date.now() / 150 + i * 0.7) * 14 + Math.random() * 6
                : 4 + Math.sin(i * 0.6) * 3;
              return (
                <div
                  key={i}
                  className="w-1 rounded-full transition-all duration-100"
                  style={{
                    height: `${h}px`,
                    backgroundColor: i / 24 * 100 < audioProgress ? '#10b981' : '#334155',
                  }}
                />
              );
            })}
          </div>
          <div className="text-[9px] font-mono text-slate-500 text-center">
            {isPlayingAudio ? `${Math.floor(audioProgress * 0.15)}s / 15s` : 'TAP TO HEAR MY INTRO'}
          </div>
        </div>
      </HudWindow>

      {/* ── Window 4: Engineering Stack — Center ──────── */}
      <HudWindow
        title="ENGINEERING PILLARS"
        tag="CORE ARCHITECTURE"
        accentColor="#a855f7"
        animationType="slideUp"
        delay={0.18}
        pos={{ top: '36%', left: '30%', width: '38%' }}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-purple-500/8 border border-purple-500/20 text-center">
            <div className="text-lg">⚡</div>
            <div className="text-[11px] font-bold text-white mt-0.5">Systems Design</div>
            <div className="text-[9px] text-slate-400">Distributed, event-driven</div>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/8 border border-cyan-500/20 text-center">
            <div className="text-lg">🧠</div>
            <div className="text-[11px] font-bold text-white mt-0.5">AI Pipelines</div>
            <div className="text-[9px] text-slate-400">RAG, agents, fine-tune</div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-center">
            <div className="text-lg">🔧</div>
            <div className="text-[11px] font-bold text-white mt-0.5">Full-Stack Web</div>
            <div className="text-[9px] text-slate-400">Next.js, Node, Postgres</div>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/8 border border-amber-500/20 text-center">
            <div className="text-lg">📱</div>
            <div className="text-[11px] font-bold text-white mt-0.5">Cross-Platform</div>
            <div className="text-[9px] text-slate-400">React Native, Flutter</div>
          </div>
        </div>
      </HudWindow>

      {/* ── Window 5: Links & Contact — Bottom Right ──────── */}
      <HudWindow
        title="NETWORK ENDPOINTS"
        tag="DIRECT LINKS"
        accentColor="#00f0ff"
        animationType="slideLeft"
        delay={0.22}
        pos={{ bottom: '12%', right: '3%', width: '28%' }}
      >
        <div className="space-y-2">
          <a href={PERSONAL.github} target="_blank" rel="noreferrer" onClick={() => Sound.click()}
            className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-all text-xs font-mono text-slate-300 hover:text-white">
            <span>⟁</span> <span>GitHub Repositories ↗</span>
          </a>
          <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" onClick={() => Sound.click()}
            className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-all text-xs font-mono text-slate-300 hover:text-white">
            <span>◉</span> <span>LinkedIn Profile ↗</span>
          </a>
          <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-400">
            ✉ {PERSONAL.email}
          </div>
        </div>
      </HudWindow>

      {/* ── Window 6: AI Chat — Bottom Left ──────── */}
      <HudWindow
        title="NEURAL AI TWIN"
        tag="ASK ANYTHING"
        accentColor="#00f0ff"
        animationType="glitch"
        delay={0.26}
        pos={{ bottom: '8%', left: '2%', width: '42%' }}
      >
        <ChatBot
          nodeId="who-am-i"
          initialFollowUps={nodeConfig.followUps || []}
          responsesMap={nodeConfig.responses || {}}
          accentColor="#00f0ff"
        />
      </HudWindow>
    </ModalBackdrop>
  );
}
