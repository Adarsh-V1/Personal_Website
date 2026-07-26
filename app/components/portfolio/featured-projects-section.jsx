"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import SectionHeading from "./section-heading";
import ProjectCard from "./project-card";
import { featuredProjects } from "../../data/featured-projects";
import { cn } from "../../utils/cn";

export default function FeaturedProjectsSection() {
  const { resolvedTheme } = useTheme();
  const isLotm = resolvedTheme === "lotm";

  return (
    <section
      id="featured-projects"
      className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="w-full">
        <div data-reveal>
          <SectionHeading
            eyebrow="Selected Work"
            title="Full-stack, AI-powered, and real-time applications built to solve practical problems."
            description=""
          />
        </div>

        {/* Premium project cards */}
        <div className="mt-12 space-y-10 lg:space-y-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-16 overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-white/90 to-teal-50/40 p-8 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-12"
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 opacity-[0.04]",
              isLotm && "opacity-[0.06]",
            )}
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, rgba(45,212,191,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(249,115,22,0.2) 0%, transparent 50%)",
            }}
          />
          <div className="relative z-10">
            <span
              className={cn(
                "mx-auto inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-700",
                isLotm &&
                  "border-[#f0b85b]/30 bg-[#f0b85b]/10 text-[#f0b85b]",
              )}
            >
              <Sparkles className="size-3" />
              Let&apos;s Build
            </span>
            <h3
              className={cn(
                "mx-auto mt-4 max-w-xl font-(family-name:--font-space-grotesk) text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl",
                isLotm &&
                  "font-(family-name:--font-lotm-heading) text-[#eef6ff]",
              )}
            >
              Have an idea worth building?
            </h3>
            <p
              className={cn(
                "mx-auto mt-3 max-w-lg text-base leading-relaxed text-slate-600",
                isLotm && "text-[#b9cff2]",
              )}
            >
              Let&apos;s turn it into a production-ready product.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                className={cn(
                  "group/btn h-12 rounded-full bg-slate-950 px-7 text-sm font-bold text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-[0_24px_60px_rgba(15,23,42,0.28)] active:scale-95",
                  isLotm &&
                    "border border-[#f0b85b]/45 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a] hover:shadow-[0_24px_60px_rgba(240,184,91,0.24)]",
                )}
              >
                <Link href="#contact">
                  Start a Project
                  <ArrowRight className="ml-1.5 size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className={cn(
                  "group/btn h-12 rounded-full border-slate-200 bg-white/70 px-6 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-md active:scale-95",
                  isLotm &&
                    "border-[#d49a3f]/40 bg-[#070b13]/70 text-[#deebff] hover:bg-[#101a2b] hover:border-[#f0b85b]/50",
                )}
              >
                <Link href="#projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
