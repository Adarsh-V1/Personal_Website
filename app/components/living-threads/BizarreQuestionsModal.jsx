'use client';

import React, { useState } from 'react';
import ModalBackdrop, { HudWindow } from './ModalBackdrop';
import ChatBot from './ChatBot';
import { QUESTIONS } from './data';
import { Sound } from './sound';

export default function BizarreQuestionsModal({
  nodeId,
  isOpen,
  onClose,
}) {
  const nodeConfig = QUESTIONS.find((q) => q.id === nodeId);
  const [turingVerdict, setTuringVerdict] = useState(null);

  if (!nodeConfig) return null;

  const renderWindows = () => {
    if (nodeId === 'why-hate-software') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Window 1: Anti-Bloat Manifesto Pod */}
          <HudWindow
            title="MANIFESTO // ANTI-BLOAT DISPATCH"
            tag="OPINION // LEVEL 4"
            accentColor="#ec4899"
            animationType="scale"
            delay={0.04}
            className="lg:col-span-7"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-pink-950/30 border border-pink-500/30 text-pink-200">
                <span className="text-[10px] uppercase font-bold text-pink-400 block pb-1">
                  [ PRIMARY THESIS ]
                </span>
                <p className="text-sm font-sans font-bold text-white leading-snug">
                  &quot;Computers are 10,000x faster than 20 years ago, but software feels slower than ever.&quot;
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                Every day we open applications that consume 2GB of RAM just to render a login box. Why? Because teams stack 450 NPM packages, nest 8 layers of state wrappers, and ignore how the browser event loop actually operates.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[10px] text-pink-300">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span>Bloat Index: 98.4% unnecessary dependencies in modern web tooling.</span>
              </div>
            </div>
          </HudWindow>

          {/* Window 2: Engineering Axioms Pod */}
          <HudWindow
            title="SYSTEM AXIOMS // PERFORMANCE LAWS"
            tag="STANDARD OPERATING RULES"
            accentColor="#ec4899"
            animationType="slideRight"
            delay={0.1}
            className="lg:col-span-5"
          >
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-pink-500/20">
                <div className="font-mono text-pink-400 text-[11px] font-bold">1. Zero-Jank Rule</div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  If an interaction cannot render at a locked 60fps on a budget laptop, it gets rewritten.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-pink-500/20">
                <div className="font-mono text-pink-400 text-[11px] font-bold">2. Optimistic UI</div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Update the DOM at 0ms. Never make a user stare at a spinner while waiting for a database round-trip.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-pink-500/20">
                <div className="font-mono text-pink-400 text-[11px] font-bold">3. Native APIs First</div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  150 lines of pure Canvas 2D math beats an 800KB physics library every single time.
                </p>
              </div>
            </div>
          </HudWindow>

          {/* Window 3: Neural AI Debrief Pod */}
          <HudWindow
            title="NEURAL AI TRANSCEIVER // SOFTWARE CLINIC"
            tag="INTERACTIVE PHILOSOPHY"
            accentColor="#ec4899"
            animationType="glitch"
            delay={0.16}
            className="lg:col-span-12"
          >
            <ChatBot
              nodeId={nodeId}
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#ec4899"
            />
          </HudWindow>
        </div>
      );
    }

    if (nodeId === 'biggest-mistake') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Window 1: Incident Dossier Pod */}
          <HudWindow
            title="INCIDENT LOG #041 // SEV-1 SUMMARY"
            tag="CRITICAL OUTAGE DEBRIEF"
            accentColor="#ef4444"
            animationType="glitch"
            delay={0.04}
            className="lg:col-span-6"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[10px] font-bold text-red-400">[ CLASSIFICATION ]</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/30 text-red-200 border border-red-500/40">
                    SEV-1 PRODUCTION
                  </span>
                </div>
                <h4 className="text-sm font-sans font-bold text-white mt-1">
                  The Night the Staging Script Hit Production
                </h4>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                3:54 AM. Week 2 of a multi-tenant client build. I had two terminal splits open. Ran an SQL backfill migration meant for local staging... except the shell environment had an active production connection pool.
              </p>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-red-500/20 text-[10px] text-slate-300 space-y-1">
                <div className="text-red-400 font-bold">Hard Lesson Learned:</div>
                <p>Never rely on mental discipline for environment separation. Production writes require cryptographic branch protection & locked DB read-only proxies.</p>
              </div>
            </div>
          </HudWindow>

          {/* Window 2: Resolution Timeline Pod */}
          <HudWindow
            title="CADENCE // 22-MINUTE RESOLUTION"
            tag="TIMELINE TELEMETRY"
            accentColor="#ef4444"
            animationType="slideRight"
            delay={0.1}
            className="lg:col-span-6"
          >
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-black/40 border border-red-500/20">
                <span className="text-red-400 font-bold shrink-0">03:54 AM</span>
                <span className="text-slate-300 text-[11px]">Incident detected via instant Sentry anomaly alert.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-black/40 border border-amber-500/20">
                <span className="text-amber-400 font-bold shrink-0">03:57 AM</span>
                <span className="text-slate-300 text-[11px]">Isolated DB traffic, rotated write keys, paused ingestion queues.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-black/40 border border-cyan-500/20">
                <span className="text-cyan-400 font-bold shrink-0">04:08 AM</span>
                <span className="text-slate-300 text-[11px]">Initiated point-in-time recovery on Neon Postgres from 03:50 snapshot.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-black/40 border border-emerald-500/20">
                <span className="text-emerald-400 font-bold shrink-0">04:16 AM</span>
                <span className="text-emerald-300 font-semibold text-[11px]">Verified table checksums, restored traffic. 0 bytes customer data lost.</span>
              </div>
            </div>
          </HudWindow>

          {/* Window 3: Neural Incident Debrief Pod */}
          <HudWindow
            title="NEURAL AI TRANSCEIVER // POST-MORTEM CLINIC"
            tag="ASK ABOUT BACKUPS & PROTOCOLS"
            accentColor="#ef4444"
            animationType="slideUp"
            delay={0.16}
            className="lg:col-span-12"
          >
            <ChatBot
              nodeId={nodeId}
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#ef4444"
            />
          </HudWindow>
        </div>
      );
    }

    if (nodeId === 'unknown-stack') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Window 1: Adaptation Thesis Pod */}
          <HudWindow
            title="CORE FORMULA // 48-HOUR ADAPTATION"
            tag="SYSTEMS GENERALIST"
            accentColor="#a855f7"
            animationType="scale"
            delay={0.04}
            className="lg:col-span-5"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-200">
                <span className="text-[10px] uppercase font-bold text-purple-400 block pb-1">
                  [ PRIMARY PRINCIPLE ]
                </span>
                <h4 className="text-sm font-sans font-bold text-white">
                  Give me 48 hours in any language or framework.
                </h4>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                Syntax is trivial. Framework trends change every 18 months. What doesn&apos;t change is data structures, network protocols, memory lifecycles, and concurrency patterns.
              </p>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-purple-500/20 text-[10px] text-purple-300">
                <span>Verified in production: Rust, Go, TypeScript, Python, Dart/Flutter, Elixir.</span>
              </div>
            </div>
          </HudWindow>

          {/* Window 2: 48-Hour Protocol Grid Pod */}
          <HudWindow
            title="EXECUTION MATRIX // 4-STAGE RAMP-UP"
            tag="SYSTEMATIC PROTOCOL"
            accentColor="#a855f7"
            animationType="slideRight"
            delay={0.1}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-purple-500/20">
                <div className="text-purple-400 font-mono text-[10px] font-bold">Hours 0–6</div>
                <div className="text-white font-semibold text-[11px] mt-0.5">Trace the Pulse</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Follow one user request from socket to database and back.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-purple-500/20">
                <div className="text-purple-400 font-mono text-[10px] font-bold">Hours 7–18</div>
                <div className="text-white font-semibold text-[11px] mt-0.5">First-Party Specs</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Read language spec & official architecture internals.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-purple-500/20">
                <div className="text-purple-400 font-mono text-[10px] font-bold">Hours 19–30</div>
                <div className="text-white font-semibold text-[11px] mt-0.5">Throwaway Prototype</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Build the hardest mechanical loop in complete isolation.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-purple-500/20">
                <div className="text-purple-400 font-mono text-[10px] font-bold">Hours 31–48</div>
                <div className="text-white font-semibold text-[11px] mt-0.5">Ship Tested PR</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Fix an open issue, write tests, submit production PR.</p>
              </div>
            </div>
          </HudWindow>

          {/* Window 3: Neural Adaptation Engine Pod */}
          <HudWindow
            title="NEURAL AI TRANSCEIVER // ADAPTATION CONSULTANT"
            tag="CHALLENGE MY STACK"
            accentColor="#a855f7"
            animationType="slideUp"
            delay={0.16}
            className="lg:col-span-12"
          >
            <ChatBot
              nodeId={nodeId}
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#a855f7"
            />
          </HudWindow>
        </div>
      );
    }

    if (nodeId === 'turing-test') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Window 1: Turing Benchmark Pod */}
          <HudWindow
            title="BENCHMARK PROTOCOL // HUMAN VS SYNTHETIC"
            tag="TURING TEST SUITE"
            accentColor="#00f0ff"
            animationType="scale"
            delay={0.04}
            className="lg:col-span-6"
          >
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block pb-1">
                  [ INQUIRY SPECIFICATION ]
                </span>
                <h4 className="text-sm font-sans font-bold text-white">
                  Is Adarsh an autonomous AI twin, or a real caffeine-powered human?
                </h4>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                Modern agents can write boilerplate in 200ms. But can an AI explain the existential dread of watching a Docker container take 45 minutes to build on a Friday afternoon? Cast your vote:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => {
                    Sound.click();
                    setTuringVerdict('human');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer font-semibold ${
                    turingVerdict === 'human'
                      ? 'bg-cyan-400 text-black shadow-[0_0_15px_#00f0ff]'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                  }`}
                >
                  100% Real Human (Verified) 👤
                </button>
                <button
                  onClick={() => {
                    Sound.click();
                    setTuringVerdict('bot');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                    turingVerdict === 'bot'
                      ? 'bg-purple-500 text-white shadow-[0_0_15px_#a855f7]'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
                  }`}
                >
                  Sentient AI Model in a Trenchcoat 🤖
                </button>
              </div>

              {turingVerdict && (
                <div className="p-3 rounded-xl bg-black/60 border border-cyan-400/40 text-xs text-cyan-300 animate-in fade-in">
                  {turingVerdict === 'human'
                    ? '✓ Correct! Proof: I require 2 pour-over coffees before 9 AM and I have 2000 Rapid Chess rating.'
                    : '⚠️ Flattering! But I write real code by hand, break things in staging, and care deeply about latency.'}
                </div>
              )}
            </div>
          </HudWindow>

          {/* Window 2: Telemetry Metrics Pod */}
          <HudWindow
            title="BIOMETRIC PROOF // HUMAN TELEMETRY"
            tag="VERIFIABLE ATTRIBUTES"
            accentColor="#00f0ff"
            animationType="slideRight"
            delay={0.1}
            className="lg:col-span-6"
          >
            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-500/20 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Chess.com / Lichess:</span>
                <span className="text-cyan-300 font-bold">2000 Rapid Elo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-500/20 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Primary Fuel:</span>
                <span className="text-amber-300 font-bold">Medium Roast Pour-Over</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-500/20 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Keyboard Switch Preference:</span>
                <span className="text-purple-300 font-bold">Gateron Oil Kings (Linear)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-500/20 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Preferred Editor:</span>
                <span className="text-emerald-300 font-bold">Neovim + LazyVim / VS Code</span>
              </div>
            </div>
          </HudWindow>

          {/* Window 3: Neural Turing Interrogator Pod */}
          <HudWindow
            title="NEURAL AI TRANSCEIVER // TURING INTERROGATION"
            tag="TEST MY INTELLIGENCE"
            accentColor="#00f0ff"
            animationType="glitch"
            delay={0.16}
            className="lg:col-span-12"
          >
            <ChatBot
              nodeId={nodeId}
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#00f0ff"
            />
          </HudWindow>
        </div>
      );
    }

    return null;
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title={nodeConfig.label}
      subtitle="UNFILTERED HUMAN PERSPECTIVE • 3 HOLOGRAPHIC WINDOWS MATERIALIZED"
      accentColor={nodeConfig.color}
      maxWidth="max-w-6xl"
    >
      {renderWindows()}
    </ModalBackdrop>
  );
}
