'use client';

import React from 'react';
import { QUESTIONS } from './data';
import { Sound } from './sound';

export default function ProgressTracker({
  exploredMap = {},
  onSelectNode,
}) {
  const total = QUESTIONS.length;
  const exploredCount = Object.keys(exploredMap).filter((k) => exploredMap[k]).length;
  const percentage = Math.round((exploredCount / total) * 100);

  return (
    <div className="fixed bottom-5 right-5 z-30 hidden md:flex items-center gap-3 p-3 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl shadow-2xl">
      {/* Skill tree constellation dots */}
      <div className="flex items-center gap-1.5">
        {QUESTIONS.map((q, idx) => {
          const isExplored = exploredMap[q.id];
          return (
            <button
              key={q.id}
              onClick={() => {
                Sound.click();
                if (onSelectNode) onSelectNode(q);
              }}
              className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer relative group flex items-center justify-center ${
                isExplored
                  ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24] scale-110'
                  : 'bg-white/10 border border-white/20 hover:border-white/50'
              }`}
              title={q.label}
            >
              {/* Tooltip */}
              <span className="absolute bottom-6 right-0 hidden group-hover:block px-2 py-1 rounded-md bg-black/90 border border-white/20 text-[10px] font-mono text-white whitespace-nowrap z-50">
                {q.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-4 w-px bg-white/20" />

      {/* Percentage badge */}
      <div className="font-mono text-xs">
        <span className="text-amber-400 font-bold">{percentage}%</span>
        <span className="text-slate-400 text-[10px] ml-1">UNLOCKED</span>
      </div>
    </div>
  );
}
