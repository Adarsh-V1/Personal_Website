'use client';

import React, { useState } from 'react';
import ModalBackdrop from './ModalBackdrop';
import ChatBot from './ChatBot';
import { MILESTONES, QUESTIONS, PERSONAL } from './data';
import { Sound } from './sound';

export default function JourneyModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'journey') || {};
  const [activeMilestone, setActiveMilestone] = useState(MILESTONES[MILESTONES.length - 1]);
  const [hoveredPolaroid, setHoveredPolaroid] = useState(null);

  // Audio Polaroid notes & voice clips
  const polaroids = [
    {
      id: 'p1',
      title: '3 AM Breakthrough',
      year: '2023',
      caption: 'The night my custom WebSocket server finally routed 100 concurrent messages without dropping packets.',
      audioNote: 'Voice note: "I literally screamed at 3:14 AM and woke up my roommate."',
      color: '#a855f7',
    },
    {
      id: 'p2',
      title: 'First Paid Client',
      year: '2024',
      caption: 'Shipped a multi-tenant booking portal in 9 days. First real money made strictly writing code.',
      audioNote: 'Voice note: "Spent the first $100 on a mechanical keyboard."',
      color: '#ec4899',
    },
    {
      id: 'p3',
      title: 'Enterprise RBAC Hell',
      year: '2025',
      caption: 'Designing 5 interconnected healthcare portals with 40+ screens. Learned how real software breaks.',
      audioNote: 'Voice note: "Never underestimate edge-case permission trees."',
      color: '#8b5cf6',
    },
    {
      id: 'p4',
      title: 'IT Company Full-Time',
      year: 'Jan 2026',
      caption: 'Joined as full-stack engineer. Shipping production features at scale every single week.',
      audioNote: 'Voice note: "Now we play in the big leagues."',
      color: '#38bdf8',
    },
  ];

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="CHRONICLES // THE TIMELINE & POLAROIDS"
      subtitle="CINEMATIC FILM STRIP • 2022 TO 2026 EXPEDITION"
      accentColor="#a855f7"
    >
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Film Strip Header Quote */}
        <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/25 backdrop-blur-md">
          <p className="text-sm text-purple-200 italic font-mono leading-relaxed">
            &quot;I didn&apos;t take the clean corporate pipeline. I taught myself, got stuck in tutorial hell, broke things at 3 AM, built client MVPs with no safety net, and ground my way to shipping production software daily.&quot;
          </p>
        </div>

        {/* Interactive Audio Polaroids Row */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-3">
            [ INTERACTIVE AUDIO POLAROIDS — HOVER TO HEAR THE REAL STORY ]
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {polaroids.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => {
                  setHoveredPolaroid(p.id);
                  Sound.click();
                  Sound.pluck(0.4);
                }}
                onMouseLeave={() => setHoveredPolaroid(null)}
                className="group relative p-4 rounded-2xl bg-[#0f1424] border border-white/10 hover:border-purple-400/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(168,85,247,0.25)] flex flex-col justify-between cursor-pointer"
              >
                {/* Polaroid Photo Simulation Box */}
                <div
                  className="aspect-square w-full rounded-xl p-3 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: hoveredPolaroid === p.id ? `${p.color}15` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${hoveredPolaroid === p.id ? p.color : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-purple-300">
                    <span>{p.year}</span>
                    <span>MEMO // {p.id.toUpperCase()}</span>
                  </div>

                  <div className="text-center my-auto">
                    <span className="text-3xl block mb-1">📷</span>
                    <span className="text-xs font-bold text-white tracking-wide">
                      {p.title}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-purple-400 text-center flex items-center justify-center gap-1">
                    <span>{hoveredPolaroid === p.id ? '🔊 PLAYING AUDIO' : '▶ HOVER FOR VOICE'}</span>
                  </div>
                </div>

                {/* Handwritten-style Story Note */}
                <div className="mt-3">
                  <p className="text-xs text-slate-300 leading-snug">
                    {p.caption}
                  </p>
                  {hoveredPolaroid === p.id && (
                    <p className="text-[11px] font-mono text-purple-300 mt-2 p-2 rounded-lg bg-purple-950/40 border border-purple-500/30 animate-in fade-in">
                      {p.audioNote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Timeline Film Strip */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-3">
            [ HORIZONTAL EVOLUTION SCRUBBER ]
          </span>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin">
            {MILESTONES.map((m) => {
              const isSelected = activeMilestone.year === m.year;
              return (
                <button
                  key={m.year}
                  onClick={() => {
                    Sound.click();
                    setActiveMilestone(m);
                  }}
                  className={`shrink-0 px-5 py-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/50 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs font-mono text-purple-400 block font-semibold">
                    {m.year}
                  </span>
                  <span className="text-sm font-bold text-white block mt-0.5">
                    {m.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-purple-500/25 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold text-white">
                {activeMilestone.year}: {activeMilestone.title}
              </h4>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Phase: {activeMilestone.type.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeMilestone.desc}
            </p>
          </div>
        </div>

        {/* In-Modal Chatbot */}
        <ChatBot
          nodeId="journey"
          initialFollowUps={nodeConfig.followUps || []}
          responsesMap={nodeConfig.responses || {}}
          accentColor="#a855f7"
        />
      </div>
    </ModalBackdrop>
  );
}
