'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sound } from './sound';

// ── Independent Floating Futuristic HUD Window Pod ──────────────────────────
export function HudWindow({
  title,
  tag,
  accentColor = '#00f0ff',
  delay = 0,
  animationType = 'scale',
  className = '',
  children,
}) {
  const getInitialVariant = () => {
    switch (animationType) {
      case 'slideRight':
        return { opacity: 0, x: -40, scale: 0.95 };
      case 'slideLeft':
        return { opacity: 0, x: 40, scale: 0.95 };
      case 'slideUp':
        return { opacity: 0, y: 35, scale: 0.95 };
      case 'glitch':
        return { opacity: 0, scale: 0.88, filter: 'blur(8px)' };
      default:
        return { opacity: 0, scale: 0.88, y: 20 };
    }
  };

  return (
    <motion.div
      initial={getInitialVariant()}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.92, y: 15 }}
      transition={{
        type: 'spring',
        damping: 24,
        stiffness: 280,
        delay: delay,
      }}
      className={`relative flex flex-col rounded-2xl overflow-hidden border bg-[#080d19]/90 backdrop-blur-2xl shadow-2xl text-slate-100 ${className}`}
      style={{
        borderColor: `${accentColor}35`,
        boxShadow: `0 0 35px ${accentColor}12, 0 16px 45px rgba(0,0,0,0.85)`,
      }}
    >
      {/* High-Tech Glowing Corner Brackets */}
      <span className="absolute top-1.5 left-2 text-[9px] font-mono select-none pointer-events-none opacity-50" style={{ color: accentColor }}>┌</span>
      <span className="absolute top-1.5 right-2 text-[9px] font-mono select-none pointer-events-none opacity-50" style={{ color: accentColor }}>┐</span>
      <span className="absolute bottom-1.5 left-2 text-[9px] font-mono select-none pointer-events-none opacity-50" style={{ color: accentColor }}>└</span>
      <span className="absolute bottom-1.5 right-2 text-[9px] font-mono select-none pointer-events-none opacity-50" style={{ color: accentColor }}>┘</span>

      {/* Top Scanner Line */}
      <div
        className="h-[2px] w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-75 shrink-0"
        style={{ color: accentColor }}
      />

      {/* Pod Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <h4 className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-slate-200">
            {title}
          </h4>
        </div>
        {tag && (
          <span
            className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-white/5 opacity-80"
            style={{ color: accentColor }}
          >
            {tag}
          </span>
        )}
      </div>

      {/* Window Body */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto scrollbar-thin">
        {children}
      </div>
    </motion.div>
  );
}

// ── Master Multi-Window Holographic Matrix Backdrop ─────────────────────────
export default function ModalBackdrop({
  isOpen,
  onClose,
  title,
  subtitle,
  accentColor = '#00f0ff',
  maxWidth = 'max-w-6xl',
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      Sound.matrixDeploy();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Full-Screen Cyber Hologram Grid Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            Sound.click();
            onClose();
          }}
          className="fixed inset-0 bg-[#020409]/94 backdrop-blur-2xl"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 20%, ${accentColor}15 0%, transparent 75%)`,
          }}
        >
          {/* Subtle Cyber Grid Matrix overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, ${accentColor} 1px, transparent 1px), linear-gradient(to bottom, ${accentColor} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </motion.div>

        {/* Master Control Deck Container */}
        <div className={`relative w-full ${maxWidth} max-h-[95vh] flex flex-col z-10 space-y-3`}>
          {/* Floating Master Header Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-xl shadow-xl shrink-0"
            style={{ borderColor: `${accentColor}40` }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping opacity-90"
                style={{ backgroundColor: accentColor }}
              />
              <div>
                <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider text-white flex items-center gap-2">
                  <span>✦ {title}</span>
                </h3>
                {subtitle && (
                  <p className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                Sound.click();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer group"
            >
              <span>✕ DISMISS ALL</span>
              <span className="hidden sm:inline text-[9px] text-slate-400">[ESC]</span>
            </button>
          </motion.div>

          {/* Multi-Window Deck Content */}
          <div className="flex-1 overflow-y-auto pr-0.5 scrollbar-thin">
            {children}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
