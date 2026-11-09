'use client';

import React, { useState } from 'react';
import ModalBackdrop, { HudWindow } from './ModalBackdrop';
import ChatBot from './ChatBot';
import { EXPLAIN_TOPICS, QUESTIONS } from './data';
import { Sound } from './sound';

export default function ExplainModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'explain') || {};
  const [selectedTopicId, setSelectedTopicId] = useState(EXPLAIN_TOPICS[0].id);
  const [level, setLevel] = useState(1);

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
    3: 'LEVEL 3: PRINCIPAL ARCHITECT 🏛️',
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="PEDAGOGY TERMINAL // COMPLEXITY TRANSLATOR"
      subtitle="3 HOLOGRAPHIC TRANSLATOR PODS • 5YO TO PRINCIPAL ARCHITECT"
      accentColor="#eab308"
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* POD 1: Topic & Depth Selector (5 Cols) */}
        <HudWindow
          title="CONTROL MATRIX"
          tag="TOPICS & DEPTH"
          accentColor="#eab308"
          delay={0.04}
          animationType="slideRight"
          className="md:col-span-5"
        >
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-yellow-400 block mb-1.5">
                Select Engineering Concept:
              </span>
              <div className="space-y-1.5">
                {EXPLAIN_TOPICS.map((t) => {
                  const isSelected = t.id === selectedTopicId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTopicChange(t.id)}
                      className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-yellow-500/20 border-yellow-400 text-white font-semibold shadow-[0_0_12px_rgba(234,179,8,0.25)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase text-yellow-400 block mb-1.5">
                Select Audience Depth:
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/60 border border-yellow-500/25">
                {[1, 2, 3].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => handleLevelChange(lvl)}
                    className={`py-1.5 px-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer text-center ${
                      level === lvl
                        ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.4)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Lvl {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-1.5 text-center">
                {levelLabels[level]}
              </p>
            </div>
          </div>
        </HudWindow>

        {/* POD 2: Holographic Output Terminal (7 Cols) */}
        <HudWindow
          title="SYNTHESIS CLI"
          tag={`LVL_${level} // 200 OK`}
          accentColor="#facc15"
          delay={0.12}
          animationType="scale"
          className="md:col-span-7"
        >
          <div className="space-y-3 font-mono">
            <div className="text-[11px] text-yellow-400/80">
              $ translate({`{ concept: "${currentTopic.label}", depth: ${level} }`})
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-yellow-500/30 text-slate-200 text-xs sm:text-sm leading-relaxed">
              {currentTopic.levels[level]}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span>Proof: Mentored 10+ junior developers</span>
              <span className="text-yellow-400 font-semibold">Latency: 0ms</span>
            </div>
          </div>
        </HudWindow>

        {/* POD 3: Pedagogical AI Assistant (12 Cols) */}
        <HudWindow
          title="AI PEDAGOGY TRANSCEIVER"
          tag="INTERACTIVE"
          accentColor="#eab308"
          delay={0.18}
          animationType="slideUp"
          className="md:col-span-12"
        >
          <ChatBot
            nodeId="explain"
            initialFollowUps={nodeConfig.followUps || []}
            responsesMap={nodeConfig.responses || {}}
            accentColor="#eab308"
          />
        </HudWindow>
      </div>
    </ModalBackdrop>
  );
}
