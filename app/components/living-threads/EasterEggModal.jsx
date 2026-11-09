'use client';

import React, { useState, useEffect } from 'react';
import ModalBackdrop, { HudWindow } from './ModalBackdrop';
import { Sound } from './sound';
import { PERSONAL } from './data';

export default function EasterEggModal({
  isOpen,
  onClose,
  zeroGravity,
  setZeroGravity,
}) {
  const [terminalLines, setTerminalLines] = useState([
    'KERNEL PANIC: TETHER_OVERLOAD_EXCEPTION (0xDEADBEEF)',
    'Warning: You pulled the forbidden red thread.',
    'System integrity compromised. Zero-G physics protocol engaged.',
    'Type "help" to see available commands or "restore" to stabilize.',
  ]);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    if (isOpen) {
      Sound.glitch();
    }
  }, [isOpen]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    Sound.tick();

    const cmd = inputVal.trim().toLowerCase();
    const newLines = [...terminalLines, `$ ${inputVal}`];

    if (cmd === 'help') {
      newLines.push(
        'Available commands:',
        '  zero-g on   - Snap tethers into zero-gravity arcade mode',
        '  zero-g off  - Re-anchor all threads back to ceiling',
        '  whoami      - Print Adarsh\'s root clearance info',
        '  matrix      - Stream green matrix hex tokens',
        '  clear       - Clear terminal history',
        '  exit        - Close this emergency terminal'
      );
    } else if (cmd === 'zero-g on' || cmd === 'zerog on' || cmd === 'chaos') {
      Sound.glitch();
      setZeroGravity(true);
      newLines.push('⚡ [ZERO-GRAVITY ENGAGED] All question nodes floating freely in zero-g.');
    } else if (cmd === 'zero-g off' || cmd === 'zerog off' || cmd === 'restore') {
      Sound.themeSwitch();
      setZeroGravity(false);
      newLines.push('✓ [GRAVITY RESTORED] Elastic tethers re-anchored to ceiling.');
    } else if (cmd === 'whoami') {
      newLines.push(`Root: ${PERSONAL.name} (${PERSONAL.currentRole})`);
      newLines.push(`Location: ${PERSONAL.location} | Chess Rating: 2000 Rapid.`);
    } else if (cmd === 'matrix') {
      newLines.push(
        '01000001 01100100 01100001 01110010 01110011 01101000',
        '41 64 61 72 73 68 20 50 61 74 68 61 6e 69 61',
        'WAKE UP, NEO... THE MATRIX HAS YOU.'
      );
    } else if (cmd === 'clear') {
      setTerminalLines([]);
      setInputVal('');
      return;
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else {
      newLines.push(`zsh: command not found: ${cmd}. Type "help" for valid commands.`);
    }

    setTerminalLines(newLines);
    setInputVal('');
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="⚠️ EMERGENCY OVERRIDE // SUB-SYSTEM BREACH"
      subtitle="GRAVITY ANOMALY DETECTED • 3 HOLOGRAPHIC WINDOWS MATERIALIZED"
      accentColor="#ef4444"
      maxWidth="max-w-6xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Window 1: Emergency Breach Status & Zero-G Chaos Trigger */}
        <HudWindow
          title="BREACH CONTROL // ZERO-G PROTOCOL"
          tag="EMERGENCY STATUS"
          accentColor="#ef4444"
          animationType="glitch"
          delay={0.04}
          className="lg:col-span-5"
        >
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">🚨</span>
                <div>
                  <h4 className="font-bold text-red-400 uppercase text-[11px]">
                    PHYSICS BREACH SIMULATOR
                  </h4>
                  <p className="text-[10px] text-red-200/80">
                    Status: {zeroGravity ? 'ZERO-GRAVITY CHAOS ENGAGED' : 'TETHERS ANCHORED'}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-[11px]">
              You pulled the forbidden thread. This triggered the emergency microgravity simulator, cutting the Verlet ceiling anchors and letting all 11 knowledge nodes drift in zero-gravity space.
            </p>

            <button
              onClick={() => {
                if (!zeroGravity) {
                  Sound.glitch();
                  setZeroGravity(true);
                } else {
                  Sound.themeSwitch();
                  setZeroGravity(false);
                }
              }}
              className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                zeroGravity
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_#fbbf24]'
                  : 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:bg-red-600'
              }`}
            >
              <span>{zeroGravity ? '⭯ RESTORE CEILING GRAVITY' : '⚡ ENGAGE ZERO-GRAVITY CHAOS'}</span>
            </button>
          </div>
        </HudWindow>

        {/* Window 2: Interactive Root Shell Terminal */}
        <HudWindow
          title="ROOT_SHELL // DEV_CONSOLE (tty1)"
          tag="INTERACTIVE UNIX CLI"
          accentColor="#ef4444"
          animationType="scale"
          delay={0.1}
          className="lg:col-span-7"
        >
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-red-900/40 text-[10px] text-red-400">
              <span>HOST: adarsh-mainframe-zero-g</span>
              <span>TYPE &quot;help&quot; FOR COMMANDS</span>
            </div>

            <div className="h-44 overflow-y-auto space-y-1 text-emerald-400 scrollbar-thin bg-black/60 p-2.5 rounded-xl border border-red-500/20 text-[11px]">
              {terminalLines.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith('KERNEL') || line.startsWith('Warning')
                      ? 'text-red-400 font-bold'
                      : line.startsWith('$')
                      ? 'text-cyan-300 font-bold'
                      : line.startsWith('⚡')
                      ? 'text-amber-300'
                      : 'text-emerald-400'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1 border-t border-red-900/40">
              <span className="text-red-400 font-bold text-[10px] sm:text-xs">root@zero-g:~#</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type command (help, zero-g on, matrix, whoami)..."
                className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono text-xs"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/40 text-red-300 text-[10px] font-mono border border-red-500/30 transition-all cursor-pointer"
              >
                EXEC ↵
              </button>
            </form>
          </div>
        </HudWindow>

        {/* Window 3: Physical Telemetry Pod */}
        <HudWindow
          title="TELEMETRY // VERLET RIG RIGOR"
          tag="SIMULATION METRICS"
          accentColor="#ef4444"
          animationType="slideLeft"
          delay={0.16}
          className="lg:col-span-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-red-500/20">
              <span className="text-[10px] text-slate-400 block">Active Chains</span>
              <span className="text-white font-bold text-sm">11 Top Tethers</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-red-500/20">
              <span className="text-[10px] text-slate-400 block">Constraint Passes</span>
              <span className="text-cyan-300 font-bold text-sm">6 Iterations/Frame</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-red-500/20">
              <span className="text-[10px] text-slate-400 block">Target Framerate</span>
              <span className="text-emerald-400 font-bold text-sm">60 / 120 FPS</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-red-500/20">
              <span className="text-[10px] text-slate-400 block">Sway Amplitude</span>
              <span className="text-amber-400 font-bold text-sm">~1 cm Kinematic</span>
            </div>
          </div>
        </HudWindow>
      </div>
    </ModalBackdrop>
  );
}
