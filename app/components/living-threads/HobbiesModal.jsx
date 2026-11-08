'use client';

import React, { useState } from 'react';
import ModalBackdrop from './ModalBackdrop';
import ChatBot from './ChatBot';
import { QUESTIONS, CHESS_PUZZLE } from './data';
import { Sound } from './sound';

export default function HobbiesModal({ isOpen, onClose }) {
  const nodeConfig = QUESTIONS.find((q) => q.id === 'hobbies') || {};

  // Interactive Chess Board State (Mate in 1/2 tactical puzzle)
  // White: Queen on h5, Bishop on c4, King on e1, pawns on a2,b2,c2,d2,f2,g2,h2
  // Black: King on e8, Queen on d8, Bishop on f8, Knights on c6, f6, pawns on a7,b7,c7,d7,f7,g7,h7
  // Correct move: Queen on h5 moves to f7 taking the pawn = Qxf7# (Checkmate!)
  const [boardState, setBoardState] = useState({
    selectedSquare: null,
    whiteQueenSquare: 'h5',
    f7Occupant: '♟', // black pawn initially
    isCheckmate: false,
    feedback: 'White to move: find the killer blow!',
  });

  const handleSquareClick = (square) => {
    Sound.click();
    if (boardState.isCheckmate) return;

    if (square === 'h5') {
      // Select Queen
      setBoardState((prev) => ({
        ...prev,
        selectedSquare: 'h5',
        feedback: 'Queen selected! Where does she strike?',
      }));
    } else if (boardState.selectedSquare === 'h5' && square === 'f7') {
      // Winning move Qxf7#!
      Sound.explore();
      setBoardState({
        selectedSquare: null,
        whiteQueenSquare: 'f7',
        f7Occupant: '♕',
        isCheckmate: true,
        feedback: '🎉 CHECKMATE! Qxf7# — Scholar\'s execution. Flawless tactical vision!',
      });
    } else if (boardState.selectedSquare) {
      // Wrong square
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

  // Mini 8x8 Chess Board Grid Coordinates
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
      title="BENTO BOX // BEYOND THE TERMINAL"
      subtitle="TACTICAL CHESS • AUDIO ROTATION • OFF-GRID PURSUITS"
      accentColor="#10b981"
    >
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento Item 1: Interactive Chess Puzzle (7 Cols) */}
          <div className="md:col-span-7 rounded-3xl p-5 border border-emerald-500/30 bg-emerald-950/15 backdrop-blur-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                    [ TACTICAL ARENA ]
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    2000 Rapid Rating
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  {CHESS_PUZZLE.title}
                </h4>
              </div>
              <button
                onClick={resetPuzzle}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
              >
                Reset ↻
              </button>
            </div>

            {/* Chess Board */}
            <div className="flex flex-col items-center my-2">
              <div className="border-2 border-emerald-500/40 rounded-xl overflow-hidden shadow-2xl bg-black">
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
                          className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-lg sm:text-2xl select-none cursor-pointer transition-colors relative
                            ${isDark ? 'bg-emerald-900/40' : 'bg-emerald-100/10'}
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

              {/* Puzzle status feedback banner */}
              <div
                className={`mt-3 px-3 py-1.5 rounded-xl text-xs font-mono text-center w-full max-w-sm border ${
                  boardState.isCheckmate
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20'
                }`}
              >
                {boardState.feedback}
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-400 text-center">
              Hint: White Queen on h5 has Black&apos;s uncastled King in her crosshairs.
            </p>
          </div>

          {/* Bento Item 2: Music Rotation & Audio Vitals (5 Cols) */}
          <div className="md:col-span-5 rounded-3xl p-5 border border-emerald-500/25 bg-black/40 backdrop-blur-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                [ CURRENT AUDIO ROTATION ]
              </span>
              <h4 className="text-base font-bold text-white">
                Deep Focus Soundscapes
              </h4>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span className="text-2xl">🎧</span>
                <div>
                  <div className="text-xs font-bold text-white">Lofi Beats & Synthwave</div>
                  <div className="text-[11px] text-slate-400 font-mono">For uninterrupted 6-hour flow states</div>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span className="text-2xl">🎸</span>
                <div>
                  <div className="text-xs font-bold text-white">Progressive Metal & Math Rock</div>
                  <div className="text-[11px] text-slate-400 font-mono">Tool, Polyphia, Animals as Leaders</div>
                </div>
              </div>
            </div>

            {/* Reading list */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Current Nightstand Books:
              </span>
              <ul className="text-xs text-slate-300 space-y-1 font-mono">
                <li>📖 Designing Data-Intensive Applications</li>
                <li>📖 Thinking in Systems — Donella Meadows</li>
              </ul>
            </div>
          </div>

          {/* Bento Item 3: Cybersecurity Tinkering (6 Cols) */}
          <div className="md:col-span-6 rounded-3xl p-5 border border-emerald-500/25 bg-black/40 backdrop-blur-xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
              [ OFF-CLOCK TINKERING ]
            </span>
            <h4 className="text-base font-bold text-white">
              CTFs & Security Research
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When I&apos;m not building user products, I participate in Web & Binary CTF challenges, reverse-engineer obscure network protocols, and audit smart contracts. Understanding how systems break makes you a 10x better builder.
            </p>
          </div>

          {/* Bento Item 4: Life Outside IDE (6 Cols) */}
          <div className="md:col-span-6 rounded-3xl p-5 border border-emerald-500/25 bg-black/40 backdrop-blur-xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
              [ PHYSICAL RECHARGE ]
            </span>
            <h4 className="text-base font-bold text-white">
              Cooking & Long Walks
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The best debugging tool is stepping away from the screen. Long 10k evening walks through Mohali with a podcast or lo-fi tape, followed by cooking elaborate pasta or Indian curries from scratch.
            </p>
          </div>
        </div>

        {/* In-Modal Chatbot */}
        <ChatBot
          nodeId="hobbies"
          initialFollowUps={nodeConfig.followUps || []}
          responsesMap={nodeConfig.responses || {}}
          accentColor="#10b981"
        />
      </div>
    </ModalBackdrop>
  );
}
