'use client';

import React, { useState } from 'react';
import ModalBackdrop, { HudWindow } from './ModalBackdrop';
import ChatBot from './ChatBot';
import { QUESTIONS, CHESS_PUZZLE } from './data';
import { Sound } from './sound';

export default function HobbiesModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'hobbies') || {};

  const [boardState, setBoardState] = useState({
    selectedSquare: null,
    whiteQueenSquare: 'h5',
    f7Occupant: '♟',
    isCheckmate: false,
    feedback: 'White to move: find the killer blow!',
  });

  const handleSquareClick = (square) => {
    Sound.click();
    if (boardState.isCheckmate) return;

    if (square === 'h5') {
      setBoardState((prev) => ({
        ...prev,
        selectedSquare: 'h5',
        feedback: 'Queen selected! Where does she strike?',
      }));
    } else if (boardState.selectedSquare === 'h5' && square === 'f7') {
      Sound.explore();
      setBoardState({
        selectedSquare: null,
        whiteQueenSquare: 'f7',
        f7Occupant: '♕',
        isCheckmate: true,
        feedback: '🎉 CHECKMATE! Qxf7# — Scholar\'s execution. Flawless tactical vision!',
      });
    } else if (boardState.selectedSquare) {
      Sound.pluck(0.8);
      setBoardState((prev) => ({
        ...prev,
        selectedSquare: null,
        feedback: 'That move does not deliver mate. Try again!',
      }));
    }
  };

  const resetPuzzle = () => {
    Sound.click();
    setBoardState({
      selectedSquare: null,
      whiteQueenSquare: 'h5',
      f7Occupant: '♟',
      isCheckmate: false,
      feedback: 'White to move: find the killer blow!',
    });
  };

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const getPieceAt = (square) => {
    if (square === boardState.whiteQueenSquare) return '♕';
    if (square === 'c4') return '♗';
    if (square === 'e1') return '♔';
    if (square === 'e8') return '♚';
    if (square === 'd8') return '♛';
    if (square === 'c6') return '♞';
    if (square === 'f6') return '♞';
    if (square === 'f7') return boardState.f7Occupant;
    if (square === 'e5') return '♟';
    if (square === 'e4') return '♙';
    return null;
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="THE SANCTUARY // RECREATION & INTELLECT"
      subtitle="4 HOLOGRAPHIC RECREATION PODS • 2000 RAPID CHESS • TACTICAL ENGINE"
      accentColor="#10b981"
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* POD 1: Chess Tactical Arena (7 Cols) */}
        <HudWindow
          title="CHESS ENGINE // 2000 RAPID"
          tag="TACTICAL PUZZLE"
          accentColor="#10b981"
          delay={0.04}
          animationType="scale"
          className="md:col-span-7"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                Rating: 2000 Rapid (Chess.com & Lichess)
              </span>
              <p className="text-xs text-white font-semibold">Scholar&apos;s Execution — Mate in 1</p>
            </div>
            <button
              onClick={resetPuzzle}
              className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 hover:border-white/20 text-slate-300"
            >
              Reset ↻
            </button>
          </div>

          {/* 8x8 Board */}
          <div className="flex flex-col items-center my-1">
            <div className="border border-emerald-500/40 rounded-lg overflow-hidden shadow-xl bg-black">
              {ranks.map((rank, rIdx) => (
                <div key={rank} className="flex">
                  {files.map((file, fIdx) => {
                    const square = `${file}${rank}`;
                    const isDark = (rIdx + fIdx) % 2 === 1;
                    const isSelected = boardState.selectedSquare === square;
                    const isQueen = square === boardState.whiteQueenSquare;
                    const piece = getPieceAt(square);

                    return (
                      <div
                        key={square}
                        onClick={() => handleSquareClick(square)}
                        className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base select-none cursor-pointer transition-colors relative
                          ${isDark ? 'bg-emerald-950/40' : 'bg-emerald-100/10'}
                          ${isSelected ? 'ring-2 ring-amber-400 bg-amber-400/30' : ''}
                          ${isQueen && !boardState.isCheckmate ? 'hover:bg-cyan-400/30 animate-pulse' : ''}
                          ${square === 'f7' && boardState.selectedSquare === 'h5' ? 'ring-2 ring-red-400/80 bg-red-500/30' : ''}
                        `}
                      >
                        <span
                          className={`
                            ${piece === '♕' ? 'text-amber-300 font-bold scale-110' : ''}
                            ${piece === '♗' || piece === '♔' || piece === '♙' ? 'text-slate-100' : ''}
                            ${piece === '♚' || piece === '♛' || piece === '♞' || piece === '♟' ? 'text-emerald-400' : ''}
                          `}
                        >
                          {piece}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div
              className={`mt-2 px-3 py-1 rounded text-[11px] font-mono text-center w-full max-w-sm border ${
                boardState.isCheckmate
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold shadow-[0_0_12px_#fbbf24]'
                  : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20'
              }`}
            >
              {boardState.feedback}
            </div>
          </div>
        </HudWindow>

        {/* POD 2: Hyperfocus Audio & Nightstand (5 Cols) */}
        <HudWindow
          title="AUDIO ROTATION & BOOKS"
          tag="FLOW STATE"
          accentColor="#34d399"
          delay={0.12}
          animationType="slideLeft"
          className="md:col-span-5"
        >
          <div className="space-y-2.5">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
              <span className="text-xl">🎧</span>
              <div>
                <div className="text-xs font-bold text-white">Lofi Beats & Synthwave</div>
                <div className="text-[10px] text-slate-400 font-mono">For uninterrupted 6-hour deep flow</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
              <span className="text-xl">🎸</span>
              <div>
                <div className="text-xs font-bold text-white">Math Rock & Progressive Metal</div>
                <div className="text-[10px] text-slate-400 font-mono">Polyphia, Tool, Animals as Leaders</div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Nightstand Reading List:
              </span>
              <p className="text-[11px] font-mono text-emerald-300">
                📖 Designing Data-Intensive Applications
              </p>
              <p className="text-[11px] font-mono text-slate-300">
                📖 Thinking in Systems — Donella Meadows
              </p>
            </div>
          </div>
        </HudWindow>

        {/* POD 3: Cybersecurity Tinkering & Long Walks (4 Cols) */}
        <HudWindow
          title="OFF-CLOCK PURSUITS"
          tag="CTF & LORE"
          accentColor="#059669"
          delay={0.18}
          animationType="slideRight"
          className="md:col-span-4"
        >
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-emerald-400 font-mono text-[11px] font-bold">CTFs & Reverse Engineering</div>
              <p className="text-[10px] text-slate-300 mt-0.5">Dissecting WebAssembly binaries & auditing auth vectors</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-emerald-400 font-mono text-[11px] font-bold">10k Evening Walks</div>
              <p className="text-[10px] text-slate-300 mt-0.5">Mohali evenings with binaural drones & podcasts</p>
            </div>
          </div>
        </HudWindow>

        {/* POD 4: Neural AI Twin & Chatbot (8 Cols) */}
        <HudWindow
          title="AI CHAT TRANSCEIVER"
          tag="INTERACTIVE"
          accentColor="#10b981"
          delay={0.24}
          animationType="slideUp"
          className="md:col-span-8"
        >
          <ChatBot
            nodeId="hobbies"
            initialFollowUps={nodeConfig.followUps || []}
            responsesMap={nodeConfig.responses || {}}
            accentColor="#10b981"
          />
        </HudWindow>
      </div>
    </ModalBackdrop>
  );
}
