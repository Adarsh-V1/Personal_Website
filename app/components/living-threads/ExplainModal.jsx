'use client';

import React, { useState } from 'react';
import ModalBackdrop from './ModalBackdrop';
import ChatBot from './ChatBot';
import { EXPLAIN_TOPICS, QUESTIONS } from './data';
import { Sound } from './sound';

export default function ExplainModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'explain') || {};
  const [selectedTopicId, setSelectedTopicId] = useState(EXPLAIN_TOPICS[0].id);
  const [level, setLevel] = useState(1); // 1, 2, or 3

  const currentTopic = EXPLAIN_TOPICS.find((t) => t.id === selectedTopicId) || EXPLAIN_TOPICS[0];

  const handleLevelChange = (lvl) => {
    Sound.click();
    setLevel(lvl);
  };

  const handleTopicChange = (id) => {
    Sound.click();
    setSelectedTopicId(id);
  };

  const levelLabels = {
    1: 'LEVEL 1: 5-YEAR-OLD ANALOGY 🧸',
    2: 'LEVEL 2: JUNIOR DEV PLAYBOOK 💻',
    3: 'LEVEL 3: SENIOR SYSTEM ARCHITECT 🏛️',
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="PEDAGOGY TERMINAL // COMPLEXITY TRANSLATOR"
      subtitle="MULTI-TIER EXPLANATION ENGINE • 5YO TO PRINCIPAL ARCHITECT"
      accentColor="#eab308"
    >
      <div className="space-y-7 animate-in fade-in duration-500">
        {/* Split-Screen Terminal Morph Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Topic Selector & Level Slider */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-yellow-400 block mb-2">
                1. SELECT ENGINEERING TOPIC:
              </span>
              <div className="space-y-2">
                {EXPLAIN_TOPICS.map((t) => {
                  const isSelected = t.id === selectedTopicId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTopicChange(t.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left font-mono text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-yellow-500/20 border-yellow-400 text-white font-semibold shadow-[0_0_15px_rgba(234,179,8,0.25)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xl">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Depth Level Switcher */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-yellow-400 block mb-2">
                2. SELECT AUDIENCE DEPTH:
              </span>
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-black/60 border border-yellow-500/25">
                {[1, 2, 3].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => handleLevelChange(lvl)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer text-center ${
                      level === lvl
                        ? 'bg-yellow-500 text-black shadow-[0_0_12px_rgba(234,179,8,0.4)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Level {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-2 text-center">
                {levelLabels[level]}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Screen */}
          <div className="lg:col-span-7 rounded-3xl border border-yellow-500/30 bg-[#080c16] overflow-hidden flex flex-col shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 font-mono text-xs text-yellow-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                <span className="ml-2 text-slate-400">explain_cli --topic={currentTopic.id} --depth={level}</span>
              </div>
              <span className="text-[10px] text-slate-500">UTF-8 / Node.js</span>
            </div>

            {/* Terminal Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4 font-mono">
              <div className="space-y-3">
                <div className="text-xs text-yellow-400/80">
                  $ translation_engine.synthesize({`{ topic: "${currentTopic.label}", level: ${level} }`})
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-200 text-sm leading-relaxed">
                  {currentTopic.levels[level]}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Proof: Mentored 10+ junior developers</span>
                <span className="text-yellow-400">Status: 200 OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* In-Modal Chatbot */}
        <ChatBot
          nodeId="explain"
          initialFollowUps={nodeConfig.followUps || []}
          responsesMap={nodeConfig.responses || {}}
          accentColor="#eab308"
        />
      </div>
    </ModalBackdrop>
  );
}
