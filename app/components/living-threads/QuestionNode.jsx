'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Sound } from './sound';

export default function QuestionNode({
  nodeData,
  physicsPoint,
  isExplored = false,
  isActive = false,
  onOpenModal,
  onDragStart,
  onDragMove,
  onDragEnd,
  zeroGravity = false,
  lightingMode = 'cyber-void',
  registerNodeRef,
}) {
  const cardRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Register card element for direct 60/120fps DOM transforms
  useEffect(() => {
    if (cardRef.current && registerNodeRef) {
      registerNodeRef(nodeData.id, cardRef.current);
    }
  }, [nodeData.id, registerNodeRef]);

  if (!physicsPoint) return null;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    Sound.init();

    // Lock pointer capture to this card so cursor NEVER slips off during fast drag
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}

    const clientX = e.clientX;
    const clientY = e.clientY;
    dragStartPos.current = { x: clientX, y: clientY };
    setIsDragging(true);

    if (onDragStart) {
      onDragStart(physicsPoint, clientX, clientY);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    if (onDragMove) {
      onDragMove(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    const distMoved = Math.hypot(
      e.clientX - dragStartPos.current.x,
      e.clientY - dragStartPos.current.y
    );

    if (distMoved < 7) {
      // Intentional click -> open modal
      Sound.click();
      if (onOpenModal) onOpenModal(nodeData, physicsPoint);
    } else {
      // Elastic slingshot release
      Sound.pluck(0.75);
    }

    if (onDragEnd) {
      onDragEnd();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      Sound.click();
      if (onOpenModal) onOpenModal(nodeData, physicsPoint);
    }
  };

  const isDanger = nodeData.id === 'easter-egg';
  const isLight = lightingMode === 'light';

  const nodeColor = isExplored
    ? (isLight ? '#b45309' : lightingMode === 'synthwave' ? '#f472b6' : '#fbbf24')
    : isDanger
    ? '#ef4444'
    : isLight
    ? '#9c7953'
    : nodeData.color || '#00f0ff';

  // Dynamic Theme Styling
  let themeCardStyle = 'bg-[#080d1a]/90 border-white/15 text-slate-100';
  let titleColor = 'text-slate-100 group-hover:text-white';
  let subtextColor = 'text-slate-400/80';
  let arrowColor = nodeColor;

  if (isDanger) {
    themeCardStyle = isLight
      ? 'bg-rose-50/95 border-rose-300 text-rose-900 shadow-md'
      : 'bg-red-950/50 border-red-500/60 text-red-200';
    titleColor = isLight ? 'text-rose-800 font-bold' : 'text-red-300 font-bold tracking-wider';
  } else if (isLight) {
    // Warm Luxury Beige / Cream Editorial Card
    themeCardStyle = 'bg-[#fffefb]/95 border-[#e0d6c5] text-[#28211a] shadow-[0_12px_32px_rgba(70,50,30,0.08)] hover:border-[#b89f7a] hover:shadow-[0_16px_40px_rgba(70,50,30,0.14)]';
    titleColor = 'text-[#28211a] font-semibold group-hover:text-[#9a3412]';
    subtextColor = 'text-[#7d7060] font-mono font-medium';
    arrowColor = '#b45309';
  } else if (lightingMode === 'lo-fi-lamp') {
    themeCardStyle = 'bg-[#231b14]/95 border-amber-500/40 text-amber-100 shadow-[0_15px_35px_rgba(0,0,0,0.6)]';
    titleColor = 'text-amber-100 group-hover:text-amber-300 font-serif';
    subtextColor = 'text-amber-400/70 font-mono';
    arrowColor = '#ffb347';
  } else if (lightingMode === 'blueprint') {
    themeCardStyle = 'bg-[#041525]/95 border-cyan-400/50 text-cyan-200 font-mono shadow-[0_15px_35px_rgba(0,0,0,0.6)]';
    titleColor = 'text-cyan-200 group-hover:text-cyan-100';
    subtextColor = 'text-cyan-400/70';
    arrowColor = '#00f0ff';
  } else if (lightingMode === 'synthwave') {
    themeCardStyle = 'bg-[#18042c]/95 border-pink-500/50 text-pink-100 shadow-[0_15px_35px_rgba(0,0,0,0.6)]';
    titleColor = 'text-pink-100 group-hover:text-pink-300';
    subtextColor = 'text-pink-400/70 font-mono';
    arrowColor = '#ec4899';
  } else if (lightingMode === 'matrix') {
    themeCardStyle = 'bg-[#02180a]/95 border-emerald-500/50 text-emerald-300 font-mono shadow-[0_15px_35px_rgba(0,0,0,0.6)]';
    titleColor = 'text-emerald-300 group-hover:text-emerald-100';
    subtextColor = 'text-emerald-400/70';
    arrowColor = '#10b981';
  } else if (lightingMode === 'lotm') {
    themeCardStyle = 'bg-[#0a0f1d]/95 border-[#f0b85b]/40 text-[#f0b85b] font-serif shadow-[0_15px_35px_rgba(0,0,0,0.6)]';
    titleColor = 'text-[#f0b85b] group-hover:text-[#ffd68a]';
    subtextColor = 'text-[#d49a3f]/70 font-mono';
    arrowColor = '#f0b85b';
  }

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={`Question: ${nodeData.label}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        setIsFocused(true);
        Sound.pluck(0.3);
      }}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => {
        setIsHovered(true);
        Sound.pluck(0.2);
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translate3d(${physicsPoint.x}px, ${physicsPoint.y}px, 0) translate(-50%, -50%)`,
        borderColor: isDragging || isFocused ? (isLight ? '#0f172a' : '#ffffff') : nodeColor,
        boxShadow: isDragging || isFocused
          ? `0 0 35px ${nodeColor}, 0 10px 35px rgba(0,0,0,0.85)`
          : isHovered
          ? `0 0 20px ${nodeData.glow || 'rgba(0,240,255,0.4)'}, 0 6px 25px rgba(0,0,0,0.6)`
          : isLight
          ? `0 4px 15px rgba(0,0,0,0.06), 0 0 8px ${nodeColor}25`
          : `0 0 12px ${nodeData.glow ? nodeData.glow.replace('0.35', '0.15') : 'rgba(0,240,255,0.12)'}, 0 4px 15px rgba(0,0,0,0.5)`,
        touchAction: 'none',
      }}
      className={`
        absolute select-none cursor-grab active:cursor-grabbing z-20 outline-none
        group rounded-xl sm:rounded-2xl p-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5
        backdrop-blur-xl border transition-shadow duration-150 will-change-transform
        flex items-center gap-2 sm:gap-3 max-w-[155px] sm:max-w-[260px] md:max-w-[340px]
        ${themeCardStyle}
        ${isExplored ? (isLight ? 'ring-1 ring-amber-500/50' : 'ring-1 ring-amber-400/40') : ''}
        ${isFocused ? (isLight ? 'ring-2 ring-blue-600 scale-105 z-30' : 'ring-2 ring-white scale-105 z-30') : ''}
      `}
    >
      {/* Tether Socket Indicator (hidden in zero-g) */}
      {!zeroGravity && (
        <div
          className={`absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border-2 flex items-center justify-center ${
            isLight ? 'bg-[#fffdfa]' : 'bg-[#050608]'
          }`}
          style={{ borderColor: nodeColor }}
        >
          <div
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: nodeColor }}
          />
        </div>
      )}

      {/* Icon Beacon */}
      <div
        className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-semibold transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: isExplored
            ? (isLight ? 'rgba(180, 83, 9, 0.12)' : 'rgba(251, 191, 36, 0.15)')
            : `${nodeColor}18`,
          color: nodeColor,
          border: `1px solid ${nodeColor}40`,
        }}
      >
        {isExplored ? (
          <span className={isLight ? 'text-amber-800 font-bold' : 'text-amber-400'}>✓</span>
        ) : isDanger ? (
          <span className="text-red-400 animate-pulse text-[10px] sm:text-xs">⚠️</span>
        ) : (
          <span>✦</span>
        )}
      </div>

      {/* Question Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[11px] sm:text-xs md:text-sm font-medium leading-tight sm:leading-snug tracking-tight line-clamp-2 sm:line-clamp-none transition-colors duration-200 ${titleColor}`}
        >
          {nodeData.label}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
          <span className={`text-[8px] sm:text-[10px] uppercase font-mono tracking-wider ${subtextColor}`}>
            {isExplored ? 'Explored' : isFocused ? '[Enter]' : 'Tap / Drag'}
          </span>
          {isExplored && (
            <span
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
                isLight ? 'bg-amber-700 shadow-[0_0_8px_#b45309]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
              }`}
            />
          )}
        </div>
      </div>

      <div
        className="shrink-0 text-xs font-mono opacity-40 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 hidden sm:block"
        style={{ color: arrowColor }}
      >
        →
      </div>
    </div>
  );
}
