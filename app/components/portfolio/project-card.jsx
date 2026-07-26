"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Lightbulb,
  Target,
  Zap,
  Trophy,
} from "lucide-react";
import TechBadge from "./tech-badge";
import { cn } from "../../utils/cn";

export default function ProjectCard({ project, index }) {
  const { resolvedTheme } = useTheme();
  const isLotm = resolvedTheme === "lotm";
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]);

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const isReversed = index % 2 === 1;
  const { detail } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="relative"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: "1200px",
        }}
        className="group relative"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className={cn(
            "relative overflow-hidden rounded-[28px] border border-white/70 bg-white/75 shadow-[0_22px_90px_rgba(15,23,42,0.08)] backdrop-blur transition-shadow duration-500 hover:shadow-[0_32px_120px_rgba(15,23,42,0.14)]",
            isLotm &&
              "border-[#d49a3f]/30 bg-[#0a101b]/85 shadow-[0_22px_90px_rgba(0,0,0,0.4)] hover:shadow-[0_32px_120px_rgba(0,0,0,0.6)]",
          )}
        >
          {/* Hover border glow */}
          <div
            className={cn(
              "pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
              isLotm
                ? "shadow-[inset_0_0_40px_rgba(240,184,91,0.08)]"
                : "shadow-[inset_0_0_40px_rgba(15,118,110,0.08)]",
            )}
          />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute left-5 top-5 z-20">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-50/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 shadow-sm backdrop-blur-sm",
                  isLotm &&
                    "border-[#f0b85b]/40 bg-[#1a180e]/90 text-[#f0b85b]",
                )}
              >
                <Sparkles className="size-3" />
                Featured Project
              </span>
            </div>
          )}

          <div className={cn(
            "flex flex-col lg:flex-row",
            isReversed && "lg:flex-row-reverse",
          )}>
            {/* Image side */}
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-[42%]">
              <div
                className={cn(
                  "absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105",
                )}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority={index === 0}
                />
              </div>
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent",
                  isReversed
                    ? "lg:bg-gradient-to-r lg:from-black/25 lg:via-transparent lg:to-transparent"
                    : "lg:bg-gradient-to-l lg:from-black/25 lg:via-transparent lg:to-transparent",
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Content side */}
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
              {/* Category label */}
              <span
                className={cn(
                  "inline-flex w-fit rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-700",
                  isLotm && "border-[#f0b85b]/30 bg-[#f0b85b]/10 text-[#f0b85b]",
                )}
              >
                {project.subtitle}
              </span>

              {/* Title */}
              <h3
                className={cn(
                  "mt-3 font-(family-name:--font-space-grotesk) text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl",
                  isLotm && "font-(family-name:--font-lotm-heading) text-[#eef6ff]",
                )}
              >
                {project.title}
              </h3>

              {/* Hook */}
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed text-teal-700/80 font-medium italic",
                  isLotm && "text-[#f0b85b]/80",
                )}
              >
                &ldquo;{project.hook}&rdquo;
              </p>

              {/* Description */}
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed text-slate-600",
                  isLotm && "text-[#b9cff2]",
                )}
              >
                {project.description}
              </p>

              {/* Feature list */}
              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {project.features.slice(0, 4).map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-start gap-2 text-xs leading-relaxed text-slate-600",
                      isLotm && "text-[#b9cff2]",
                    )}
                  >
                    <CheckCircle2
                      className={cn(
                        "mt-0.5 size-3.5 shrink-0 text-teal-600",
                        isLotm && "text-[#f0b85b]",
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
                {project.features.length > 4 && (
                  <li className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="ml-5">+{project.features.length - 4} more</span>
                  </li>
                )}
              </ul>

              {/* Tech stack */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 5).map((tech) => (
                  <TechBadge key={tech} label={tech} isLotm={isLotm} />
                ))}
                {project.techStack.length > 5 && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium text-slate-400",
                      isLotm && "text-[#8899bb]",
                    )}
                  >
                    +{project.techStack.length - 5}
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  href={project.caseStudyUrl}
                  className={cn(
                    "group/btn inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-bold text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_16px_40px_rgba(15,23,42,0.2)] active:scale-95",
                    isLotm &&
                      "border border-[#f0b85b]/40 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a]",
                  )}
                >
                  View Case Study
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur transition-all duration-300 hover:border-teal-500/40 hover:bg-white hover:text-teal-700 hover:shadow-md active:scale-95",
                    isLotm &&
                      "border-[#d49a3f]/40 bg-[#070b13]/70 text-[#deebff] hover:border-[#f0b85b]/50 hover:bg-[#101a2b] hover:text-[#f0b85b]",
                  )}
                >
                  <ExternalLink className="size-3.5" />
                  Live Preview
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur transition-all duration-300 hover:border-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-md active:scale-95",
                      isLotm &&
                        "border-[#d49a3f]/40 bg-[#070b13]/70 text-[#deebff] hover:border-[#f0b85b]/50 hover:bg-[#101a2b] hover:text-[#f0b85b]",
                    )}
                  >
                    <Github className="size-3.5" />
                    Source Code
                  </a>
                )}
              </div>

              {/* Expand detail toggle */}
              <button
                onClick={() => setExpanded(!expanded)}
                className={cn(
                  "mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-teal-600",
                  isLotm && "hover:text-[#f0b85b]",
                )}
              >
                {expanded ? "Hide Details" : "Show Details"}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-300",
                    expanded && "rotate-180",
                  )}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expandable detail section */}
      <AnimatePresence>
        {expanded && detail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "mt-3 rounded-2xl border border-white/70 bg-white/65 p-6 shadow-sm backdrop-blur sm:p-8",
                isLotm &&
                  "border-[#d49a3f]/25 bg-[#0a101b]/75",
              )}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Target
                      className={cn(
                        "size-4 text-teal-600",
                        isLotm && "text-[#f0b85b]",
                      )}
                    />
                    <h4
                      className={cn(
                        "text-xs font-bold uppercase tracking-wider text-slate-500",
                        isLotm && "text-[#b4c8e3]",
                      )}
                    >
                      The Problem
                    </h4>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed text-slate-600",
                      isLotm && "text-[#b9cff2]",
                    )}
                  >
                    {detail.problem}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Lightbulb
                      className={cn(
                        "size-4 text-amber-600",
                        isLotm && "text-[#f0b85b]",
                      )}
                    />
                    <h4
                      className={cn(
                        "text-xs font-bold uppercase tracking-wider text-slate-500",
                        isLotm && "text-[#b4c8e3]",
                      )}
                    >
                      The Solution
                    </h4>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed text-slate-600",
                      isLotm && "text-[#b9cff2]",
                    )}
                  >
                    {detail.solution}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Zap
                      className={cn(
                        "size-4 text-teal-600",
                        isLotm && "text-[#f0b85b]",
                      )}
                    />
                    <h4
                      className={cn(
                        "text-xs font-bold uppercase tracking-wider text-slate-500",
                        isLotm && "text-[#b4c8e3]",
                      )}
                    >
                      Challenges Solved
                    </h4>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {detail.challenges.map((c) => (
                      <li
                        key={c}
                        className={cn(
                          "flex items-start gap-2 text-sm leading-relaxed text-slate-600",
                          isLotm && "text-[#b9cff2]",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-500",
                            isLotm && "bg-[#f0b85b]",
                          )}
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy
                      className={cn(
                        "size-4 text-amber-600",
                        isLotm && "text-[#f0b85b]",
                      )}
                    />
                    <h4
                      className={cn(
                        "text-xs font-bold uppercase tracking-wider text-slate-500",
                        isLotm && "text-[#b4c8e3]",
                      )}
                    >
                      Outcome
                    </h4>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed text-slate-600",
                      isLotm && "text-[#b9cff2]",
                    )}
                  >
                    {detail.outcome}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
