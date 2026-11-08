'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PERSONAL, SHOWCASE_PROJECTS } from './data';
import { Sound } from './sound';

export default function RecruiterView({ isOpen, onClose }) {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    Sound.click();
    setFormStatus('sending');
    setTimeout(() => {
      Sound.explore();
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#04060a]/95 backdrop-blur-2xl text-slate-100 p-4 sm:p-7 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shadow-[0_0_12px_#fbbf24]" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
              ⚡ RECRUITER & EXECUTIVE FAST-TRACK
            </h2>
          </div>

          <button
            onClick={() => {
              Sound.whoosh();
              onClose();
            }}
            className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-mono text-slate-200 hover:text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <span>🕸️ Return to Physics Canvas</span>
            <span>✕</span>
          </button>
        </div>

        {/* Executive Snapshot Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/15 flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-xl shrink-0">
            <Image
              src={PERSONAL.profileImage}
              alt={PERSONAL.name}
              fill
              sizes="(max-width: 768px) 112px, 128px"
              className="object-cover object-top"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {PERSONAL.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ● Ready for Hire
              </span>
            </div>
            <p className="text-sm font-mono text-amber-300">
              {PERSONAL.currentRole} • {PERSONAL.location}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Full-stack software engineer specializing in high-performance web systems, real-time collaboration engines, and production AI application pipelines. 6+ shipped production applications.
            </p>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => Sound.click()}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono text-center shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all cursor-pointer"
            >
              LinkedIn Profile ↗
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => Sound.click()}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs text-center transition-all cursor-pointer"
            >
              GitHub Repositories ↗
            </a>
          </div>
        </div>

        {/* Core Competencies & Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">6+</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Shipped Apps</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono">68%</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">API Cost Reduction</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">&lt; 12h</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Response Time</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-mono">2026</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Full-Time Pro</div>
          </div>
        </div>

        {/* Flagship Production Projects Table */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.02] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              Flagship Engineered Systems
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Verified Production Code
            </span>
          </div>

          <div className="divide-y divide-white/10">
            {SHOWCASE_PROJECTS.slice(0, 4).map((p) => (
              <div key={p.title} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">{p.title}</h4>
                  <p className="text-xs text-slate-300">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tech.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-amber-200/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold"
                >
                  Inspect Code →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Instant Contact Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/15 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white font-mono">
              Schedule an Interview or Request Full Resume PDF
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Direct message dispatched to {PERSONAL.email}
            </p>
          </div>

          {formStatus === 'sent' ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-sm text-center">
              ✓ Message dispatched successfully! Adarsh will respond within 12 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Company"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Job description, project inquiry, or interview invite..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/50 border border-white/15 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Direct email: {PERSONAL.email}
                </span>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono transition-all cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.25)]"
                >
                  {formStatus === 'sending' ? 'Dispatching...' : 'Send Direct Message →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
