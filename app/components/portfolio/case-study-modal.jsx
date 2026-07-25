"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Trophy, Sparkles } from "lucide-react";
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md font-body"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 15, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl"
        >
          {/* Header Media */}
          <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-slate-950">
            <PexelsCardBg query={project.title || "technology application"} className="h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-6 flex flex-col justify-end">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur mb-2">
                  <Sparkles className="size-3" />
                  {project.category || "Case Study"}
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                  {project.title}
                </h3>
              </div>
            </PexelsCardBg>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-slate-950/60 p-2 text-white hover:bg-slate-950 transition"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-700 dark:text-slate-300">
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                Overview & Impact
              </h4>
              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

            {/* Metrics & Highlights */}
            {project.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(project.stats).map(([key, val]) => (
                  <div key={key} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold font-heading text-teal-600 dark:text-teal-400">
                      {val}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-0.5">
                      {key.replace(/_/g, " ")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture & Tech Stack */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Cpu className="size-4 text-teal-500" /> Technical Architecture & Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    <CheckCircle2 className="size-3 text-teal-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/20 transition"
                  >
                    <ExternalLink className="size-4" /> Live Application
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Github className="size-4" /> Repository
                  </a>
                )}
              </div>

              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
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
