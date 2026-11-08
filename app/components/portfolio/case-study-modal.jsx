"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, CheckCircle2, Cpu, Sparkles, Terminal } from "lucide-react";
import { Button } from "../ui/button";
import { PexelsCardBg } from "./pexels-media";

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl font-body"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 15, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0e17] text-slate-200 shadow-[0_24px_80px_rgba(0,0,0,0.9)] scrollbar-thin scrollbar-thumb-white/10"
        >
          {/* Header Media */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950 border-b border-white/10">
            {project.image ? (
              <div className="relative h-full w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/50 to-transparent" />
              </div>
            ) : (
              <PexelsCardBg query={project.title || "technology application"} className="h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/60 to-transparent" />
              </PexelsCardBg>
            )}

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur mb-2 shadow-[0_0_12px_rgba(0,217,245,0.2)]">
                <Sparkles className="size-3 text-emerald-400" />
                {project.category || "Flagship Architecture"}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full border border-white/10 bg-black/60 p-2.5 text-slate-300 hover:text-white hover:bg-black/90 hover:border-cyan-400/40 transition shadow-lg"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400/80 mb-2 flex items-center gap-1.5">
                <Terminal className="size-3.5" /> Overview & Impact
              </h4>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Architecture Details if present */}
            {project.architecture && (
              <div className="rounded-2xl border border-white/10 bg-[#060910] p-4">
                <h5 className="text-xs uppercase font-bold tracking-wider text-emerald-400 mb-1">
                  Core Architecture
                </h5>
                <p className="text-sm text-slate-300 font-mono">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Metrics & Highlights */}
            {project.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(project.stats).map(([key, val]) => (
                  <div key={key} className="rounded-2xl border border-white/10 bg-[#060910] p-4 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold font-heading bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {val}
                    </div>
                    <div className="text-xs text-slate-400 capitalize mt-0.5">
                      {key.replace(/_/g, " ")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400/80 mb-3 flex items-center gap-1.5">
                <Cpu className="size-4 text-cyan-400" /> Technical Architecture & Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-400/40 transition"
                  >
                    <CheckCircle2 className="size-3 text-emerald-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(0,245,160,0.3)] transition"
                  >
                    <ExternalLink className="size-4" /> Live Application
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:border-white/25 transition"
                  >
                    <Github className="size-4" /> Repository
                  </a>
                )}
              </div>

              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
