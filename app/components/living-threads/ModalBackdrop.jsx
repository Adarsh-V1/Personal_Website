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
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      Sound.whoosh();
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto">
        {/* Backdrop blur with radial glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            Sound.click();
            onClose();
          }}
          className="fixed inset-0 bg-[#020408]/90 backdrop-blur-2xl"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, ${accentColor}10 0%, transparent 70%)`,
          }}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.90, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden z-10 border shadow-2xl bg-[#090d16]/95 backdrop-blur-3xl text-slate-100"
          style={{
            borderColor: `${accentColor}35`,
            boxShadow: `0 0 60px ${accentColor}18, 0 30px 70px rgba(0,0,0,0.92)`,
          }}
        >
          {/* Subtle Top Scanner Bar Line */}
          <div
            className="h-0.5 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-75"
            style={{ color: accentColor }}
          />

          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full animate-ping opacity-75"
                style={{ backgroundColor: accentColor }}
              />
              <div>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group"
            >
              <span className="group-hover:rotate-90 transition-transform duration-200">✕</span>
              <span className="hidden sm:inline text-[10px] text-slate-400">ESC</span>
            </button>
          </div>

          {/* Modal Scrollable Body with slow-appearing text effect */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-9 space-y-7 scrollbar-thin">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
