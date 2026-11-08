'use client';

import React, { useState, useEffect } from 'react';
import ModalBackdrop from './ModalBackdrop';
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
    'Warning: You pulled the forbidden thread.',
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
      newLines.push('⚡ [ZERO-GRAVITY ENGAGED] All question nodes floating freely.');
    } else if (cmd === 'zero-g off' || cmd === 'zerog off' || cmd === 'restore') {
      Sound.themeSwitch();
      setZeroGravity(false);
      newLines.push('✓ [GRAVITY RESTORED] Elastic tethers re-anchored.');
    } else if (cmd === 'whoami') {
      newLines.push(`Root: ${PERSONAL.name} (${PERSONAL.currentRole})`);
      newLines.push(`Location: ${PERSONAL.location} | Open to select opportunities.`);
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
      title="⚠️ EMERGENCY OVERRIDE // CLASSIFIED SUB-SYSTEM"
      subtitle="GRAVITY FAILURE DETECTED • ZERO-G ARCADE TERMINAL"
      accentColor="#ef4444"
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Warning Glitch Header Banner */}
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">🚨</span>
            <div>
              <h4 className="font-mono text-sm font-bold text-red-400 uppercase tracking-wider">
                GRAVITY BREACH SIMULATOR
              </h4>
              <p className="text-xs text-red-200/80">
                Current status: {zeroGravity ? 'ZERO-GRAVITY CHAOS ACTIVE' : 'TETHERS ANCHORED'}
              </p>
            </div>
          </div>

          {/* Toggle Zero Gravity arcade button */}
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
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              zeroGravity
                ? 'bg-amber-400 text-black shadow-[0_0_15px_#fbbf24]'
                : 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:bg-red-600'
            }`}
          >
            {zeroGravity ? 'RESTORE GRAVITY ⭯' : 'TRIGGER ZERO-G CHAOS ⚡'}
          </button>
        </div>

        {/* Retro Green CLI Terminal */}
        <div className="rounded-3xl border border-red-500/40 bg-black p-5 font-mono text-xs space-y-3 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-red-900/50 text-red-400 text-[11px]">
            <span>ROOT_SHELL // DEV_CONSOLE</span>
            <span>tty1 (secured)</span>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1.5 text-emerald-400 scrollbar-thin">
            {terminalLines.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('KERNEL') || line.startsWith('Warning')
                    ? 'text-red-400 font-bold'
                    : line.startsWith('$')
                    ? 'text-cyan-300'
                    : 'text-emerald-400'
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* CLI input */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-red-900/40">
            <span className="text-red-500 font-bold">root@adarsh-system:~#</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'zero-g on', or 'restore'..."
              className="flex-1 bg-transparent text-emerald-300 focus:outline-none placeholder-emerald-800"
            />
          </form>
        </div>
      </div>
    </ModalBackdrop>
  );
}
