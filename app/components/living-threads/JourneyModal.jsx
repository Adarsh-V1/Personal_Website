'use client';

import React, { useState } from 'react';
import ModalBackdrop, { HudWindow } from './ModalBackdrop';
import ChatBot from './ChatBot';
import { MILESTONES, QUESTIONS, PERSONAL } from './data';
import { Sound } from './sound';

export default function JourneyModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'journey') || {};
  const [activeMilestone, setActiveMilestone] = useState(MILESTONES[MILESTONES.length - 1]);
  const [hoveredPolaroid, setHoveredPolaroid] = useState(null);

  const polaroids = [
    {
      id: 'p1',
      title: '3 AM Breakthrough',
      year: '2023',
      caption: 'Custom WebSocket server routing 100 concurrent messages with 0 packet drops.',
      audioNote: 'Voice note: "Screamed at 3:14 AM and woke up my roommate."',
      color: '#a855f7',
    },
    {
      id: 'p2',
      title: 'First Paid Client',
      year: '2024',
      caption: 'Shipped multi-tenant booking portal in 9 days. First real money writing code.',
      audioNote: 'Voice note: "Spent the first $100 on a mechanical keyboard."',
      color: '#ec4899',
    },
    {
      id: 'p3',
      title: 'Enterprise RBAC Hell',
      year: '2025',
      caption: '5 interconnected healthcare portals with 40+ screens. True system design.',
      audioNote: 'Voice note: "Never underestimate complex permission trees."',
      color: '#8b5cf6',
    },
    {
      id: 'p4',
      title: 'IT Company Full-Time',
      year: 'Jan 2026',
      caption: 'Full-stack engineer shipping high-scale production apps every sprint.',
      audioNote: 'Voice note: "Now we play in the big leagues."',
      color: '#38bdf8',
    },
  ];

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="CHRONICLES // THE TIMELINE & EXPEDITION"
      subtitle="4 HOLOGRAPHIC CHRONICLE PODS • 2022 TO 2026 ARCHIVE"
      accentColor="#a855f7"
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* POD 1: Audio Polaroids Array (7 Cols) */}
        <HudWindow
          title="INTERACTIVE POLAROIDS"
          tag="HOVER FOR VOICE"
          accentColor="#a855f7"
          delay={0.04}
          animationType="slideRight"
          className="md:col-span-7"
        >
          <div className="grid grid-cols-2 gap-2.5">
            {polaroids.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => {
                  setHoveredPolaroid(p.id);
                  Sound.click();
                  Sound.pluck(0.4);
                }}
                onMouseLeave={() => setHoveredPolaroid(null)}
                className="p-2.5 rounded-xl bg-black/40 border border-white/10 hover:border-purple-400/50 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-purple-300 mb-1">
                  <span>{p.year}</span>
                  <span className="text-[9px] text-slate-400">MEMO // {p.id.toUpperCase()}</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">
                  📷 {p.title}
                </div>
                <p className="text-[11px] text-slate-300 leading-tight line-clamp-2">
                  {p.caption}
                </p>
                {hoveredPolaroid === p.id && (
                  <p className="text-[10px] font-mono text-purple-300 mt-1.5 p-1 rounded bg-purple-950/60 border border-purple-500/30">
                    {p.audioNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </HudWindow>

        {/* POD 2: Evolution Timeline Scrubber (5 Cols) */}
        <HudWindow
          title="TIMELINE SCRUBBER"
          tag={`${MILESTONES.length} PHASES`}
          accentColor="#ec4899"
          delay={0.12}
          animationType="slideLeft"
          className="md:col-span-5"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {MILESTONES.map((m) => {
              const isSelected = activeMilestone.year === m.year;
              return (
                <button
                  key={m.year}
                  onClick={() => {
                    Sound.click();
                    setActiveMilestone(m);
                  }}
                  className={`shrink-0 px-2.5 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-mono block font-semibold">{m.year}</span>
                  <span className="text-xs font-bold block">{m.title}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 p-3 rounded-xl bg-white/[0.02] border border-purple-500/20">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-white">{activeMilestone.year}: {activeMilestone.title}</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                {activeMilestone.type.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeMilestone.desc}
            </p>
          </div>
        </HudWindow>

        {/* POD 3: Neural AI Assistant Transceiver (12 Cols) */}
        <HudWindow
          title="AI CAREER TRANSCEIVER"
          tag="INTERACTIVE"
          accentColor="#a855f7"
          delay={0.18}
          animationType="slideUp"
          className="md:col-span-12"
        >
          <ChatBot
            nodeId="journey"
            initialFollowUps={nodeConfig.followUps || []}
            responsesMap={nodeConfig.responses || {}}
            accentColor="#a855f7"
          />
        </HudWindow>
      </div>
    </ModalBackdrop>
  );
}
