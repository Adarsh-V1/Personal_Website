'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Sound } from './sound';

export default function PullCord({
  lightingMode = 'cyber-void',
  onCycleLightingMode,
}) {
  const [pullY, setPullY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const startYRef = useRef(0);
  const currentPullRef = useRef(0);
  const animFrameRef = useRef(null);

  const modeLabels = {
    'cyber-void': 'Cyber-Void',
    'light': 'Clean Light',
    'lo-fi-lamp': 'Warm Lo-Fi Lamp',
    'blueprint': 'Blueprint Wireframe',
    'synthwave': 'Synthwave 1984',
    'matrix': 'Emerald Terminal',
    'lotm': 'LOTM Celestial Gold',
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    Sound.init();
    setIsPulling(true);
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    startYRef.current = clientY;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isPulling) return;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      const delta = Math.max(0, clientY - startYRef.current);
      const clamped = Math.min(130, delta);
      currentPullRef.current = clamped;
      setPullY(clamped);

      if (clamped > 60 && Math.random() > 0.8) {
        Sound.pluck(clamped / 130);
      }
    };

    const handlePointerUp = () => {
      if (!isPulling) return;
      setIsPulling(false);

      if (currentPullRef.current > 45) {
        Sound.themeSwitch();
        if (onCycleLightingMode) {
          onCycleLightingMode();
        }
      } else {
        Sound.pluck(0.3);
      }

      let val = currentPullRef.current;
      let velocity = -val * 0.35;
      const spring = () => {
        velocity += -val * 0.25;
        velocity *= 0.72;
        val += velocity;
        setPullY(Math.max(0, val));
        if (Math.abs(val) > 0.5 || Math.abs(velocity) > 0.5) {
          animFrameRef.current = requestAnimationFrame(spring);
        } else {
          setPullY(0);
          currentPullRef.current = 0;
        }
      };
      animFrameRef.current = requestAnimationFrame(spring);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPulling, onCycleLightingMode]);

  const cordRestLength = typeof window !== 'undefined' && window.innerWidth < 640 ? 75 : 135;
  const totalLength = cordRestLength + pullY;

  return (
    <div className="fixed top-0 right-3 sm:right-8 z-40 flex flex-col items-center select-none pointer-events-auto">
      {/* Ceiling Mount Socket */}
      <div className="w-4 sm:w-5 h-2 rounded-b-md bg-amber-400/80 shadow-[0_0_12px_#fbbf24] border border-amber-300" />

      {/* Physics Bead Chain */}
      <svg
        width="14"
        height={totalLength}
        className="overflow-visible pointer-events-none"
      >
        <line
          x1="7"
          y1="0"
          x2="7"
          y2={totalLength}
          stroke={
            lightingMode === 'light'
              ? '#b45309'
              : lightingMode === 'synthwave'
              ? '#ec4899'
              : lightingMode === 'matrix'
              ? '#10b981'
              : lightingMode === 'lo-fi-lamp'
              ? '#ffdfa0'
              : '#fbbf24'
          }
          strokeWidth="2.5"
          strokeDasharray="2, 4"
          strokeLinecap="round"
        />
      </svg>

      {/* Pull Handle / Brass Fob */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          transform: `translateY(${pullY}px)`,
        }}
        className={`w-6 h-10 sm:w-7 sm:h-12 rounded-full cursor-grab active:cursor-grabbing flex flex-col items-center justify-between p-1 sm:p-1.5 transition-shadow duration-200 border shadow-2xl ${
          lightingMode === 'light'
            ? 'bg-amber-600 text-amber-50 border-amber-300 shadow-[0_0_20px_rgba(217,119,6,0.4)]'
            : lightingMode === 'synthwave'
            ? 'bg-pink-500 text-white border-pink-200 shadow-[0_0_20px_#ec4899]'
            : lightingMode === 'matrix'
            ? 'bg-emerald-400 text-black border-emerald-200 shadow-[0_0_20px_#10b981]'
            : lightingMode === 'blueprint'
            ? 'bg-cyan-400 text-black border-cyan-200 shadow-[0_0_20px_#00f0ff]'
            : 'bg-amber-400 text-amber-950 border-amber-200 shadow-[0_0_20px_#fbbf24]'
        }`}
      >
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/70 shadow-sm" />
        <div className="text-[8px] sm:text-[9px] font-mono font-bold leading-none select-none">
          PULL
        </div>
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40" />
      </div>

      {/* Mode Tag (hidden on tiny screens unless pulling) */}
      <div
        style={{ transform: `translateY(${pullY}px)` }}
        className={`mt-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-mono text-amber-300 whitespace-nowrap shadow-lg ${
          isPulling ? 'block' : 'hidden sm:block'
        }`}
      >
        {isPulling ? 'Release to Switch!' : `Mode: ${modeLabels[lightingMode] || lightingMode}`}
      </div>
    </div>
  );
}
