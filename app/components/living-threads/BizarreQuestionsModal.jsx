'use client';

import React, { useState } from 'react';
import ModalBackdrop from './ModalBackdrop';
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

  const renderContent = () => {
    if (nodeId === 'why-hate-software') {
      return (
        <div className="space-y-6">
          {/* Manifesto Card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-pink-950/20 border border-pink-500/30 backdrop-blur-xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 block">
              [ THE ANTI-BLOAT MANIFESTO ]
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              &quot;Computers are 10,000x faster than 20 years ago, but software feels slower than ever.&quot;
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every day we open tools that consume 2GB of RAM just to render a login box. Why? Because teams stack 450 NPM packages, nest 8 layers of state wrappers, and ignore how the browser event loop actually operates.
            </p>
          </div>

          {/* 3 Engineering Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-pink-500/20 space-y-2">
              <div className="text-pink-400 font-mono text-sm font-bold">1. Zero-Jank Rule</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If an interaction cannot render at a locked 60fps on a budget laptop, it gets rewritten. No excuses.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-pink-500/20 space-y-2">
              <div className="text-pink-400 font-mono text-sm font-bold">2. Optimistic UI</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Update the DOM at 0ms. Never make a user stare at a spinner while waiting for a database round-trip.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-pink-500/20 space-y-2">
              <div className="text-pink-400 font-mono text-sm font-bold">3. Native APIs First</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                150 lines of pure Canvas 2D math beats an 800KB physics library every single time.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (nodeId === 'biggest-mistake') {
      return (
        <div className="space-y-6">
          <div className="p-5 sm:p-7 rounded-3xl bg-red-950/25 border border-red-500/40 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                [ POST-MORTEM INCIDENT LOG #041 ]
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                CRITICAL SEV-1
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The Night the Staging Script Hit Production
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              3:54 AM. Week 2 of a multi-tenant client build. I had two terminal splits open. Ran an SQL backfill migration meant for local staging... except the shell environment had an active production connection pool.
            </p>
          </div>

          {/* Timeline of Resolution */}
          <div className="space-y-3 p-5 rounded-3xl bg-black/40 border border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              The 22-Minute Resolution Cadence:
            </h4>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-3">
                <span className="text-red-400">03:54 AM:</span>
                <span>Incident detected via instant Sentry anomaly alert.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400">03:57 AM:</span>
                <span>Isolated DB traffic, rotated write keys, paused ingestion queues.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400">04:08 AM:</span>
                <span>Initiated point-in-time recovery on Neon Postgres from the 03:50 snapshot.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">04:16 AM:</span>
                <span>Verified table checksums, restored production traffic. 0 bytes of customer data lost.</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (nodeId === 'unknown-stack') {
      return (
        <div className="space-y-6">
          <div className="p-5 sm:p-7 rounded-3xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block">
              [ RAPID ADAPTATION FORMULA ]
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Give me 48 hours in any language or framework.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Syntax is trivial. Framework trends change every 18 months. What doesn&apos;t change is data structures, network protocols, memory lifecycles, and concurrency patterns.
            </p>
          </div>

          {/* 48 Hour Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-purple-500/20">
              <div className="text-purple-400 font-mono text-xs font-bold">Hours 0–6</div>
              <div className="text-xs text-white font-semibold mt-1">Trace the Pulse</div>
              <p className="text-[11px] text-slate-400 mt-1">Follow one user request from socket to database and back.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-purple-500/20">
              <div className="text-purple-400 font-mono text-xs font-bold">Hours 7–18</div>
              <div className="text-xs text-white font-semibold mt-1">First-Party Specs</div>
              <p className="text-[11px] text-slate-400 mt-1">Read the language spec and official architecture docs.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-purple-500/20">
              <div className="text-purple-400 font-mono text-xs font-bold">Hours 19–30</div>
              <div className="text-xs text-white font-semibold mt-1">Throwaway Clone</div>
              <p className="text-[11px] text-slate-400 mt-1">Build the hardest mechanical loop in isolation.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-purple-500/20">
              <div className="text-purple-400 font-mono text-xs font-bold">Hours 31–48</div>
              <div className="text-xs text-white font-semibold mt-1">Ship Tested PR</div>
              <p className="text-[11px] text-slate-400 mt-1">Fix a real open issue, add tests, and submit for review.</p>
            </div>
          </div>
        </div>
      );
    }

    if (nodeId === 'turing-test') {
      return (
        <div className="space-y-6">
          <div className="p-5 sm:p-7 rounded-3xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
              [ THE TURING TEST BENCH ]
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Is Adarsh an autonomous AI twin, or a real caffeine-powered human?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Modern agents can write boilerplate in 200ms. But can an AI explain the existential dread of watching a Docker container take 45 minutes to build on a Friday afternoon? Cast your vote below:
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  Sound.click();
                  setTuringVerdict('human');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs font-mono transition-all cursor-pointer"
              >
                100% Real Human (Verified) 👤
              </button>
              <button
                onClick={() => {
                  Sound.click();
                  setTuringVerdict('bot');
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all cursor-pointer"
              >
                Sentient AI Model in a Trenchcoat 🤖
              </button>
            </div>

            {turingVerdict && (
              <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-400/40 text-xs font-mono text-cyan-300 animate-in fade-in">
                {turingVerdict === 'human'
                  ? '✓ Correct! Proof: I require 2 pour-over coffees to function before 9 AM and I have opinions on mechanical keyboard switches.'
                  : '⚠️ Flattering, but nope! I write real code by hand, break things in staging, and care deeply about what I build.'}
              </div>
            )}
          </div>
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
      subtitle="UNFILTERED HUMAN PERSPECTIVE • CLEARANCE LEVEL 4"
      accentColor={nodeConfig.color}
    >
      <div className="space-y-6 animate-in fade-in duration-500">
        {renderContent()}

        {/* In-Modal Chatbot */}
        <ChatBot
          nodeId={nodeId}
          initialFollowUps={nodeConfig.followUps || []}
          responsesMap={nodeConfig.responses || {}}
          accentColor={nodeConfig.color}
        />
      </div>
    </ModalBackdrop>
  );
}
