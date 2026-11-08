'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sound } from './sound';

export default function ModalBackdrop({
  isOpen,
  onClose,
  title,
  subtitle,
  accentColor = '#00f0ff',
  maxWidth = 'max-w-5xl',
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      Sound.aiInterface();
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        {/* Backdrop blur with radial glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            Sound.click();
            onClose();
          }}
          className="fixed inset-0 bg-[#020408]/92 backdrop-blur-2xl"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 25%, ${accentColor}14 0%, transparent 70%)`,
          }}
        />

        {/* Modal Window Container - Modern AI Glassy Command Deck */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className={`relative w-full ${maxWidth} max-h-[88vh] flex flex-col rounded-3xl overflow-hidden z-10 border shadow-2xl bg-[#090d16]/95 backdrop-blur-3xl text-slate-100`}
          style={{
            borderColor: `${accentColor}35`,
            boxShadow: `0 0 50px ${accentColor}18, 0 30px 80px rgba(0,0,0,0.95)`,
          }}
        >
          {/* High-Tech Glowing Corner Brackets */}
          <span className="absolute top-2 left-2 text-[10px] font-mono select-none pointer-events-none opacity-60" style={{ color: accentColor }}>┌</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono select-none pointer-events-none opacity-60" style={{ color: accentColor }}>┐</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono select-none pointer-events-none opacity-60" style={{ color: accentColor }}>└</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono select-none pointer-events-none opacity-60" style={{ color: accentColor }}>┘</span>

          {/* Top Scanner Bar Line with subtle sweep */}
          <div
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-80"
            style={{ color: accentColor }}
          />

          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full animate-ping opacity-80"
                style={{ backgroundColor: accentColor }}
              />
              <div>
                <h3 className="text-sm sm:text-base font-semibold tracking-tight text-white flex items-center gap-2">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-[10px] sm:text-xs font-mono text-slate-400 mt-0.5">
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
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group"
            >
              <span className="group-hover:rotate-90 transition-transform duration-200">✕</span>
              <span className="hidden sm:inline text-[10px] text-slate-400">ESC</span>
            </button>
          </div>

          {/* Modal Body Container with non-overflowing layout on standard screens */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7 scrollbar-thin">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
