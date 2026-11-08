'use client';

import React, { useState } from 'react';
import ModalBackdrop from './ModalBackdrop';
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
      description: 'Diving deep into consensus protocols (Raft/Paxos), event-driven architectures with Kafka/NATS, and building backends in Go that handle 100k+ req/sec with single-digit millisecond latency.',
      tech: ['Go', 'Kafka', 'Redis Clusters', 'Event Sourcing', 'gRPC'],
    },
    {
      id: 'ai-native',
      title: 'AI-Native Applications & Agents',
      horizon: 'Current & Ongoing',
      icon: '🧠',
      description: 'Moving beyond simple prompt wrappers to autonomous agent swarms, deterministic tool-calling pipelines, local LLM evaluation harnesses, and sub-second multi-modal video/audio generation.',
      tech: ['LangChain', 'OpenAI SDK', 'fal.ai', 'Vector DBs', 'RAG Pipelines'],
    },
    {
      id: 'high-impact',
      title: 'High-Impact Engineering Teams',
      horizon: 'Immediate Goal',
      icon: '🚀',
      description: 'Joining an ambitious startup or product engineering team where ownership is high, deployment cycles are measured in hours, and code quality directly drives business revenue.',
      tech: ['Full-Ownership', 'Rapid Shipping', 'Architecture Reviews', 'Mentorship'],
    },
    {
      id: 'mass-scale',
      title: 'Products Used by 100,000+ Daily',
      horizon: '2–3 Years',
      icon: '📈',
      description: 'Building and scaling consumer or developer software that becomes a daily habit for hundreds of thousands of active users globally. High availability, zero downtime, delightful UX.',
      tech: ['Edge Compute', 'Multi-Region DBs', 'Global CDN', 'Resilience Testing'],
    },
  ];

  // Dynamic Media Morphing on Chatbot Follow-Up Click
  const handleFollowUpSync = (question) => {
    if (question.includes('role') || question.includes('team')) {
      setSelectedTarget(2); // High-Impact Engineering Teams
    } else if (question.includes('learning') || question.includes('technologies')) {
      setSelectedTarget(0); // Scalable Distributed Systems
    } else if (question.includes('bet on you') || question.includes('founder')) {
      setSelectedTarget(1); // AI-Native Applications & Agents
    }
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="RADAR PROJECTION // 1-3 YEAR HORIZON"
      subtitle="VECTOR TARGETING • DISTRIBUTED SYSTEMS & AI-NATIVE HORIZONS"
      accentColor="#22d3ee"
    >
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Radar HUD View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Radar Visualizer (Left) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-cyan-950/20 border border-cyan-500/25 relative overflow-hidden">
            {/* Spinning Radar Beam */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-10 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-16 rounded-full border border-cyan-500/20" />

              {/* Crosshair lines */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/30" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/30" />

              {/* Sweep line */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-transparent animate-spin duration-3000 pointer-events-none" />

              {/* Glowing Vector Targets on Radar */}
              {targets.map((t, idx) => {
                const isSelected = selectedTarget === idx;
                const angle = (idx * Math.PI) / 2 + Math.PI / 4;
                const radius = 65;
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
                    className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all cursor-pointer ${
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

            <p className="font-mono text-xs text-cyan-300 mt-4 tracking-widest uppercase">
              [ TARGET {selectedTarget + 1} LOCKED ]
            </p>
          </div>

          {/* Target Spec Sheet (Right) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                TARGET VECTOR // {targets[selectedTarget].horizon}
              </span>
              <span className="text-2xl">{targets[selectedTarget].icon}</span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {targets[selectedTarget].title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {targets[selectedTarget].description}
            </p>

            {/* Target Tech Stack */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Focus Stack & Competencies:
              </span>
              <div className="flex flex-wrap gap-2">
                {targets[selectedTarget].tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl text-xs font-mono bg-cyan-950/40 border border-cyan-500/30 text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {targets.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    Sound.click();
                    setSelectedTarget(idx);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                    selectedTarget === idx
                      ? 'bg-cyan-500/20 border-cyan-400 text-white'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold text-cyan-300">T{idx + 1}</div>
                  <div className="truncate mt-0.5">{t.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* In-Modal Chatbot with Dynamic Media Sync */}
        <ChatBot
          nodeId="goals"
          initialFollowUps={nodeConfig.followUps || []}
          responsesMap={nodeConfig.responses || {}}
          accentColor="#22d3ee"
          onFollowUpClick={handleFollowUpSync}
        />
      </div>
    </ModalBackdrop>
  );
}
