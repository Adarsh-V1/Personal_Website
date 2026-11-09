'use client';

import React, { useState } from 'react';
import ModalBackdrop, { HudWindow } from './ModalBackdrop';
import ChatBot from './ChatBot';
import { QUESTIONS } from './data';
import { Sound } from './sound';

export default function GoalsModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'goals') || {};
  const [selectedTarget, setSelectedTarget] = useState(0);

  const targets = [
    {
      id: 'dist-sys',
      title: 'Scalable Distributed Systems',
      horizon: '1–2 Years',
      icon: '🌐',
      description: 'Consensus protocols (Raft/Paxos), event-driven pipelines in Go with Kafka/NATS, handling 100k+ req/sec with single-digit ms latency.',
      tech: ['Go', 'Kafka', 'Redis Clusters', 'Event Sourcing', 'gRPC'],
    },
    {
      id: 'ai-native',
      title: 'AI-Native Applications & Agents',
      horizon: 'Current Focus',
      icon: '🧠',
      description: 'Moving beyond simple prompt wrappers to deterministic tool-calling pipelines, agent swarms, and sub-second multi-modal video/audio generation.',
      tech: ['LangChain', 'OpenAI SDK', 'fal.ai', 'Vector DBs', 'RAG Pipelines'],
    },
    {
      id: 'high-impact',
      title: 'High-Impact Engineering Teams',
      horizon: 'Immediate Goal',
      icon: '🚀',
      description: 'Joining an ambitious product engineering team where ownership is high, deployment cycles are measured in hours, and code drives direct revenue.',
      tech: ['Full-Ownership', 'Rapid Shipping', 'Architecture Reviews', 'Mentorship'],
    },
    {
      id: 'mass-scale',
      title: 'Products Used by 100,000+ Daily',
      horizon: '2–3 Years',
      icon: '📈',
      description: 'Building and scaling consumer or developer software that becomes a daily habit for hundreds of thousands of users globally.',
      tech: ['Edge Compute', 'Multi-Region DBs', 'Global CDN', 'Resilience Testing'],
    },
  ];

  const handleFollowUpSync = (question) => {
    if (question.includes('role') || question.includes('team')) {
      setSelectedTarget(2);
    } else if (question.includes('learning') || question.includes('technologies')) {
      setSelectedTarget(0);
    } else if (question.includes('bet on you') || question.includes('founder')) {
      setSelectedTarget(1);
    }
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="RADAR PROJECTION // 1-3 YEAR HORIZON"
      subtitle="3 HOLOGRAPHIC TARGETING PODS • DISTRIBUTED SYSTEMS & AI-NATIVE HORIZONS"
      accentColor="#22d3ee"
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* POD 1: Radar Visualizer (5 Cols) */}
        <HudWindow
          title="RADAR ACQUISITION"
          tag="SWEEP ACTIVE"
          accentColor="#22d3ee"
          delay={0.04}
          animationType="scale"
          className="md:col-span-5"
        >
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-10 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/30" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/30" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 to-transparent animate-spin duration-3000 pointer-events-none" />

              {targets.map((t, idx) => {
                const isSelected = selectedTarget === idx;
                const angle = (idx * Math.PI) / 2 + Math.PI / 4;
                const radius = 55;
                const tx = Math.cos(angle) * radius;
                const ty = Math.sin(angle) * radius;

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      Sound.click();
                      setSelectedTarget(idx);
                    }}
                    style={{
                      transform: `translate(${tx}px, ${ty}px)`,
                    }}
                    className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_#22d3ee] scale-125 z-10'
                        : 'bg-black/80 text-cyan-300 border border-cyan-400/50 hover:scale-110'
                    }`}
                  >
                    T{idx + 1}
                  </button>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-cyan-300 mt-2 tracking-widest uppercase">
              [ TARGET {selectedTarget + 1} LOCKED ]
            </p>
          </div>
        </HudWindow>

        {/* POD 2: Target Vector Sheet (7 Cols) */}
        <HudWindow
          title="TARGET VECTOR SHEET"
          tag={targets[selectedTarget].horizon}
          accentColor="#06b6d4"
          delay={0.12}
          animationType="slideLeft"
          className="md:col-span-7"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                TARGET SPEC // {targets[selectedTarget].id.toUpperCase()}
              </span>
              <span className="text-xl">{targets[selectedTarget].icon}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white">
              {targets[selectedTarget].title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {targets[selectedTarget].description}
            </p>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Required Core Tooling:
              </span>
              <div className="flex flex-wrap gap-1">
                {targets[selectedTarget].tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-cyan-400/25 text-cyan-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </HudWindow>

        {/* POD 3: Neural AI Assistant Transceiver (12 Cols) */}
        <HudWindow
          title="AI AMBITION TRANSCEIVER"
          tag="INTERACTIVE"
          accentColor="#22d3ee"
          delay={0.18}
          animationType="slideUp"
          className="md:col-span-12"
        >
          <ChatBot
            nodeId="goals"
            initialFollowUps={nodeConfig.followUps || []}
            responsesMap={nodeConfig.responses || {}}
            accentColor="#22d3ee"
            onFollowUpClick={handleFollowUpSync}
          />
        </HudWindow>
      </div>
    </ModalBackdrop>
  );
}