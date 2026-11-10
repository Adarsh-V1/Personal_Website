'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sound } from './sound';

const floatVariants = [
  { y: [0, -5, 0, 4, 0], x: [0, 3, 0, -3, 0] },
  { y: [0, 4, 0, -4, 0], x: [0, -4, 0, 3, 0] },
  { y: [0, -4, 0, 5, 0], x: [0, 4, 0, -2, 0] },
  { y: [0, 3, 0, -5, 0], x: [0, -3, 0, 4, 0] },
  { y: [0, -6, 0, 3, 0], x: [0, 2, 0, -4, 0] },
  { y: [0, 5, 0, -3, 0], x: [0, -2, 0, 3, 0] },
];

export function HudWindow({
  title,
  tag,
  accentColor = '#00f0ff',
  delay = 0,
  animationType = 'scale',
  pos = {},
  floatIndex = 0,
  className = '',
  children,
}) {
  const getInitialVariant = () => {
    switch (animationType) {
      case 'slideRight': return { opacity: 0, x: -70, scale: 0.88 };
      case 'slideLeft': return { opacity: 0, x: 70, scale: 0.88 };
      case 'slideUp': return { opacity: 0, y: 60, scale: 0.88 };
      case 'slideDown': return { opacity: 0, y: -60, scale: 0.88 };
      case 'glitch': return { opacity: 0, scale: 0.7, filter: 'blur(12px) brightness(2)' };
      case 'pixelate': return { opacity: 0, scale: 0.5, filter: 'blur(20px)' };
      default: return { opacity: 0, scale: 0.75, y: 30 };
    }
  };

  const posStyle = {};
  if (pos.top) posStyle.top = pos.top;
  if (pos.left) posStyle.left = pos.left;
  if (pos.right) posStyle.right = pos.right;
  if (pos.bottom) posStyle.bottom = pos.bottom;
  if (pos.width) posStyle.width = pos.width;
  if (pos.height) posStyle.height = pos.height;
  const isAbsolute = Object.keys(posStyle).length > 0;
  const fv = floatVariants[floatIndex % floatVariants.length];

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={getInitialVariant()}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px) brightness(1)' }}
      exit={{ opacity: 0, scale: 0.82, y: 20 }}
      transition={{ type: 'spring', damping: 22, stiffness: 200, delay }}
      whileDrag={{ scale: 1.02, zIndex: 60, cursor: 'grabbing' }}
      className={`${isAbsolute ? 'absolute' : 'relative'} flex flex-col rounded-2xl overflow-hidden border bg-[#080d19]/95 backdrop-blur-2xl shadow-2xl text-slate-100 cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{
        ...posStyle,
        borderColor: `${accentColor}40`,
        boxShadow: `0 0 45px ${accentColor}18, 0 25px 65px rgba(0,0,0,0.92), inset 0 1px 0 ${accentColor}15`,
      }}
    >
      <motion.div
        animate={fv}
        transition={{ duration: 7 + floatIndex * 0.8, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col flex-1 overflow-hidden pointer-events-auto"
      >
        {/* Futuristic Glowing Brackets */}
        <span className="absolute top-1.5 left-2 text-[9px] font-mono select-none pointer-events-none opacity-50" style={{ color: accentColor }}>{'┌'}</span>
        <span className="absolute top-1.5 right-2 text-[9px] font-mono select-none pointer-events-none opacity-50" style={{ color: accentColor }}>{'┐'}</span>
        <span className="absolute bottom-1.5 left-2 text-[9px] font-mono select-none pointer-events-none opacity-50" style={{ color: accentColor }}>{'└'}</span>
        <span className="absolute bottom-1.5 right-2 text-[9px] font-mono select-none pointer-events-none opacity-50" style={{ color: accentColor }}>{'┘'}</span>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-75 shrink-0" style={{ color: accentColor }} />

        {/* Pod Header Bar with Drag Handle Notice */}
        <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-white/10 bg-white/[0.03] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            <h4 className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-slate-200">
              {title}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            {tag && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-white/5 opacity-80" style={{ color: accentColor }}>
                {tag}
              </span>
            )}
            <span className="text-[9px] font-mono text-slate-500 opacity-60">⋮⋮ DRAG</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto scrollbar-thin">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ModalBackdrop({
  isOpen,
  onClose,
  title,
  subtitle,
  accentColor = '#00f0ff',
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      Sound.matrixDeploy();
      document.body.classList.add('modal-open');
      const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-hidden select-none">
        {/* Full-screen Darkened Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => { Sound.click(); onClose(); }}
          className="absolute inset-0 bg-[#020409]/95 backdrop-blur-2xl"
          style={{ backgroundImage: `radial-gradient(circle at 50% 25%, ${accentColor}14 0%, transparent 75%)` }}
        >
          {/* Cyber Grid */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, ${accentColor} 1px, transparent 1px), linear-gradient(to bottom, ${accentColor} 1px, transparent 1px)`,
              backgroundSize: '45px 45px',
            }}
          />
        </motion.div>

        {/* Top-Right Dedicated Exit / Escape Button */}
        <motion.button
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.05 }}
          onClick={() => { Sound.click(); onClose(); }}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-black/85 border border-white/20 hover:border-white/50 backdrop-blur-2xl text-xs sm:text-sm font-mono font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95"
          style={{ borderColor: `${accentColor}50` }}
        >
          <span className="w-2.5 h-2.5 rounded-full animate-ping opacity-80" style={{ backgroundColor: accentColor }} />
          <span>✕ DISMISS PODS</span>
          <span className="text-[10px] text-slate-400 font-normal">[ESC]</span>
        </motion.button>

        {/* Full-screen Scattered Draggable Canvas */}
        <div className="absolute inset-0 z-10 p-2 sm:p-4 overflow-hidden pointer-events-auto">
          {children}
        </div>
      </div>
    </AnimatePresence>
  );
}
