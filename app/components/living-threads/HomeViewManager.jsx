'use client';

import React, { useState, useEffect } from 'react';
import LivingThreadsCanvas from './LivingThreadsCanvas';
import PortfolioShell from '../portfolio/portfolio-shell';
import { Sound } from './sound';

export default function HomeViewManager() {
  const [viewMode, setViewMode] = useState('threads'); // 'threads' | 'classic'

  useEffect(() => {
    if (viewMode === 'threads') {
      document.body.classList.add('living-threads-active');
    } else {
      document.body.classList.remove('living-threads-active');
    }
    return () => {
      document.body.classList.remove('living-threads-active');
    };
  }, [viewMode]);

  return (
    <div className="relative min-h-screen">
      {/* Top Center Master View Switcher Pill (Responsive & Compact for Mobile & Desktop) */}
      <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#0a0f1d]/90 border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-[92vw]">
        <button
          onClick={() => {
            Sound.themeSwitch();
            setViewMode('threads');
          }}
          className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
            viewMode === 'threads'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🕸️</span>
          <span className="hidden sm:inline">Living Threads (Zero-G)</span>
          <span className="sm:hidden">Zero-G</span>
        </button>

        <button
          onClick={() => {
            Sound.themeSwitch();
            setViewMode('classic');
          }}
          className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
            viewMode === 'classic'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>📜</span>
          <span className="hidden sm:inline">Classic Portfolio</span>
          <span className="sm:hidden">Classic</span>
        </button>
      </div>

      {/* Render selected view */}
      {viewMode === 'threads' ? (
        <LivingThreadsCanvas />
      ) : (
        <div className="pt-20">
          <PortfolioShell />
        </div>
      )}
    </div>
  );
}
