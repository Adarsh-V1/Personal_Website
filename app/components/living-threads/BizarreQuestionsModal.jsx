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
        <>
          {/* Corner 1: Top-Left (Manifesto) */}
          <HudWindow
            title="MANIFESTO // ANTI-BLOAT"
            tag="OPINION // LVL 4"
            accentColor="#ec4899"
            animationType="pixelate"
            delay={0.02}
            floatIndex={0}
            pos={{ top: '6%', left: '3%', width: '38%' }}
          >
            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 text-pink-200">
                <span className="text-[9px] uppercase font-bold text-pink-400 block pb-1">[ PRIMARY THESIS ]</span>
                <p className="text-xs sm:text-sm font-sans font-bold text-white leading-snug">
                  &quot;Computers are 10,000x faster than 20 years ago, but software feels slower than ever.&quot;
                </p>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                450 NPM packages just to render a login box. We need zero layout shift, sub-50ms TTFB, and native APIs first.
              </p>
            </div>
          </HudWindow>

          {/* Corner 2: Top-Right (Axioms) */}
          <HudWindow
            title="SYSTEM AXIOMS"
            tag="STANDARD LAWS"
            accentColor="#ec4899"
            animationType="slideLeft"
            delay={0.08}
            floatIndex={1}
            pos={{ top: '6%', right: '3%', width: '34%' }}
          >
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-pink-500/20">
                <div className="text-pink-400 text-[10px] font-bold">1. Zero-Jank Rule</div>
                <p className="text-[10px] text-slate-300">Locked 60/120fps on budget hardware or rewrite.</p>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-pink-500/20">
                <div className="text-pink-400 text-[10px] font-bold">2. Optimistic UI</div>
                <p className="text-[10px] text-slate-300">Update DOM at 0ms. Never stall for roundtrips.</p>
              </div>
            </div>
          </HudWindow>

          {/* Corner 3: Bottom-Right (Metrics) */}
          <HudWindow
            title="BLOAT TELEMETRY"
            tag="METRICS"
            accentColor="#ec4899"
            animationType="glitch"
            delay={0.14}
            floatIndex={2}
            pos={{ bottom: '10%', right: '4%', width: '28%' }}
          >
            <div className="space-y-2 text-center font-mono">
              <div className="text-2xl font-bold text-pink-400">98.4%</div>
              <div className="text-[9px] text-slate-400">Unnecessary packages eliminated</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1">✓ Canvas 2D & Native Web APIs</div>
            </div>
          </HudWindow>

          {/* Corner 4: Bottom-Left (Chatbot) */}
          <HudWindow
            title="NEURAL AI TRANSCEIVER"
            tag="DISCUSS SOFTWARE"
            accentColor="#ec4899"
            animationType="slideUp"
            delay={0.2}
            floatIndex={3}
            pos={{ bottom: '8%', left: '3%', width: '46%' }}
          >
            <ChatBot
              nodeId={nodeId}
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#ec4899"
            />
          </HudWindow>
        </>
      );
    }

    if (nodeId === 'biggest-mistake') {
      return (
        <>
          {/* Corner 1: Top-Left */}
          <HudWindow
            title="INCIDENT #041 // SEV-1"
            tag="CRITICAL CRASH"
            accentColor="#f43f5e"
            animationType="pixelate"
            delay={0.02}
            floatIndex={0}
            pos={{ top: '6%', left: '3%', width: '38%' }}
          >
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200">
                <span className="text-[9px] font-bold text-red-400 block">[ 03:54 AM PRODUCTION HIT ]</span>
                <p className="text-xs sm:text-sm font-sans font-bold text-white mt-0.5">
                  The Night the Staging Script Ran on Production
                </p>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Local shell had production connection pool. Detected within 30s via Sentry. Point-in-time recovery on Neon Postgres restored all data.
              </p>
            </div>
          </HudWindow>

          {/* Corner 2: Top-Right */}
          <HudWindow
            title="22-MIN RESOLUTION"
            tag="TIMELINE"
            accentColor="#f43f5e"
            animationType="slideLeft"
            delay={0.08}
            floatIndex={1}
            pos={{ top: '6%', right: '3%', width: '34%' }}
          >
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex gap-2 text-slate-300"><span className="text-red-400 font-bold">03:54</span> Sentry alert fires.</div>
              <div className="flex gap-2 text-slate-300"><span className="text-amber-400 font-bold">03:57</span> DB traffic isolated, keys rotated.</div>
              <div className="flex gap-2 text-slate-300"><span className="text-cyan-400 font-bold">04:08</span> PITR snapshot restore begun.</div>
              <div className="flex gap-2 text-emerald-300 font-bold"><span>04:16</span> 0 bytes customer data lost. Restored.</div>
            </div>
          </HudWindow>

          {/* Corner 3: Bottom-Right */}
          <HudWindow
            title="SAFEGUARDS CODIFIED"
            tag="LESSONS"
            accentColor="#f43f5e"
            animationType="glitch"
            delay={0.14}
            floatIndex={2}
            pos={{ bottom: '10%', right: '4%', width: '28%' }}
          >
            <div className="space-y-1.5 font-mono text-[10px] text-slate-300">
              <div className="p-1.5 rounded bg-white/5 border border-red-500/20">● Dry-run transactions required</div>
              <div className="p-1.5 rounded bg-white/5 border border-red-500/20">● 30-min automated snapshots</div>
              <div className="p-1.5 rounded bg-white/5 border border-red-500/20">● Zero local write keys</div>
            </div>
          </HudWindow>

          {/* Corner 4: Bottom-Left */}
          <HudWindow
            title="NEURAL POST-MORTEM"
            tag="DEBRIEF CHAT"
            accentColor="#f43f5e"
            animationType="slideUp"
            delay={0.2}
            floatIndex={3}
            pos={{ bottom: '8%', left: '3%', width: '46%' }}
          >
            <ChatBot
              nodeId={nodeId}
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#f43f5e"
            />
          </HudWindow>
        </>
      );
    }

    if (nodeId === 'unknown-stack') {
      return (
        <>
          {/* Corner 1: Top-Left */}
          <HudWindow
            title="CORE THESIS // 48-HR ADAPTATION"
            tag="GENERALIST"
            accentColor="#8b5cf6"
            animationType="pixelate"
            delay={0.02}
            floatIndex={0}
            pos={{ top: '6%', left: '3%', width: '38%' }}
          >
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200">
                <span className="text-[9px] font-bold text-purple-400 block">[ PHILOSOPHY ]</span>
                <p className="text-xs sm:text-sm font-sans font-bold text-white mt-0.5">
                  Give me 48 hours in any language or framework.
                </p>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Syntax is trivial. Data structures, memory lifecycles, and concurrency models are universal.
              </p>
            </div>
          </HudWindow>

          {/* Corner 2: Top-Right */}
          <HudWindow
            title="EXECUTION MATRIX"
            tag="48-HR PROTOCOL"
            accentColor="#8b5cf6"
            animationType="slideLeft"
            delay={0.08}
            floatIndex={1}
            pos={{ top: '6%', right: '3%', width: '34%' }}
          >
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
              <div className="p-1.5 rounded bg-white/5 border border-purple-500/20">
                <div className="text-purple-400 font-bold">0–6h</div>
                <div className="text-white">Trace Pulse</div>
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-purple-500/20">
                <div className="text-purple-400 font-bold">7–18h</div>
                <div className="text-white">Read Specs</div>
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-purple-500/20">
                <div className="text-purple-400 font-bold">19–30h</div>
                <div className="text-white">Micro-Prototype</div>
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-purple-500/20">
                <div className="text-purple-400 font-bold">31–48h</div>
                <div className="text-white">Ship PR</div>
              </div>
            </div>
          </HudWindow>

          {/* Corner 3: Bottom-Right */}
          <HudWindow
            title="VERIFIED STACKS"
            tag="PRODUCTION"
            accentColor="#8b5cf6"
            animationType="glitch"
            delay={0.14}
            floatIndex={2}
            pos={{ bottom: '10%', right: '4%', width: '28%' }}
          >
            <div className="flex flex-wrap gap-1 font-mono text-[9px] text-purple-200">
              <span className="px-2 py-1 rounded bg-purple-500/20 border border-purple-500/30">Next.js 15</span>
              <span className="px-2 py-1 rounded bg-purple-500/20 border border-purple-500/30">Hono.js</span>
              <span className="px-2 py-1 rounded bg-purple-500/20 border border-purple-500/30">Go</span>
              <span className="px-2 py-1 rounded bg-purple-500/20 border border-purple-500/30">Python</span>
              <span className="px-2 py-1 rounded bg-purple-500/20 border border-purple-500/30">Rust/WASM</span>
            </div>
          </HudWindow>

          {/* Corner 4: Bottom-Left */}
          <HudWindow
            title="NEURAL ADAPTATION TRANSCEIVER"
            tag="CHALLENGE ME"
            accentColor="#8b5cf6"
            animationType="slideUp"
            delay={0.2}
            floatIndex={3}
            pos={{ bottom: '8%', left: '3%', width: '46%' }}
          >
            <ChatBot
              nodeId={nodeId}
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#8b5cf6"
            />
          </HudWindow>
        </>
      );
    }

    if (nodeId === 'turing-test') {
      return (
        <>
          {/* Corner 1: Top-Left */}
          <HudWindow
            title="TURING PROTOCOL"
            tag="HUMAN OR SYNTHETIC"
            accentColor="#06b6d4"
            animationType="pixelate"
            delay={0.02}
            floatIndex={0}
            pos={{ top: '6%', left: '3%', width: '38%' }}
          >
            <div className="space-y-2 font-mono text-xs">
              <p className="text-white font-bold text-xs sm:text-sm">
                Is Adarsh an AI twin or a real caffeine-powered human?
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { Sound.click(); setTuringVerdict('human'); }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold cursor-pointer transition-all ${
                    turingVerdict === 'human' ? 'bg-cyan-400 text-black shadow-[0_0_15px_#06b6d4]' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  100% Real Human 👤
                </button>
                <button
                  onClick={() => { Sound.click(); setTuringVerdict('bot'); }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] cursor-pointer transition-all ${
                    turingVerdict === 'bot' ? 'bg-purple-500 text-white shadow-[0_0_15px_#a855f7]' : 'bg-white/10 text-slate-300 border border-white/20'
                  }`}
                >
                  AI in a Trenchcoat 🤖
                </button>
              </div>
              {turingVerdict && (
                <div className="p-2 rounded bg-black/60 border border-cyan-400/40 text-[10px] text-cyan-300">
                  {turingVerdict === 'human' ? '✓ Verified: 2000 Elo chess player, runs on pour-over coffee!' : '⚠️ Nope! Real human engineer shipping production code.'}
                </div>
              )}
            </div>
          </HudWindow>

          {/* Corner 2: Top-Right */}
          <HudWindow
            title="BIOMETRIC PROOF"
            tag="ATTRIBUTES"
            accentColor="#06b6d4"
            animationType="slideLeft"
            delay={0.08}
            floatIndex={1}
            pos={{ top: '6%', right: '3%', width: '32%' }}
          >
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="p-1.5 rounded bg-white/5 flex justify-between">
                <span className="text-slate-400">Chess Rating:</span>
                <span className="text-cyan-300 font-bold">2000 Rapid</span>
              </div>
              <div className="p-1.5 rounded bg-white/5 flex justify-between">
                <span className="text-slate-400">Fuel:</span>
                <span className="text-amber-300 font-bold">Pour-Over Coffee</span>
              </div>
              <div className="p-1.5 rounded bg-white/5 flex justify-between">
                <span className="text-slate-400">Editor:</span>
                <span className="text-emerald-300 font-bold">Neovim + VS Code</span>
              </div>
            </div>
          </HudWindow>

          {/* Corner 3: Bottom-Left */}
          <HudWindow
            title="TURING TRANSCEIVER"
            tag="TEST ME"
            accentColor="#06b6d4"
            animationType="slideUp"
            delay={0.16}
            floatIndex={2}
            pos={{ bottom: '8%', left: '3%', width: '48%' }}
          >
            <ChatBot
              nodeId={nodeId}
              initialFollowUps={nodeConfig.followUps || []}
              responsesMap={nodeConfig.responses || {}}
              accentColor="#06b6d4"
            />
          </HudWindow>
        </>
      );
    }

    return null;
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title={nodeConfig.label}
      subtitle="SCATTERED HOLOGRAPHIC DRAGGABLE PODS"
      accentColor={nodeConfig.color}
    >
      {renderWindows()}
    </ModalBackdrop>
  );
}
