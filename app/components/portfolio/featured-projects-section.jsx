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
            eyebrow="Flagship Systems"
            title="Enterprise suites, generative AI video engines, and real-time telemetry built for mission-critical scale."
            description="Deep architectural dive into production applications handling real user traffic, credit settlements, and complex data flows."
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
          className="relative mt-16 overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950/80 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12"
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 opacity-[0.06]",
              isLotm && "opacity-[0.06]",
            )}
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, rgba(6,182,212,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(16,185,129,0.2) 0%, transparent 50%)",
            }}
          />
          <div className="relative z-10">
            <span
              className={cn(
                "mx-auto inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300",
                isLotm &&
                  "border-[#f0b85b]/30 bg-[#f0b85b]/10 text-[#f0b85b]",
              )}
            >
              <Sparkles className="size-3 text-cyan-400" />
              Let&apos;s Build Together
            </span>
            <h3
              className={cn(
                "mx-auto mt-4 max-w-xl font-(family-name:--font-space-grotesk) text-2xl font-extrabold tracking-tight text-white sm:text-3xl",
                isLotm &&
                  "font-(family-name:--font-lotm-heading) text-[#eef6ff]",
              )}
            >
              Have a high-scale product worth engineering?
            </h3>
            <p
              className={cn(
                "mx-auto mt-3 max-w-lg text-base leading-relaxed text-zinc-400",
                isLotm && "text-[#b9cff2]",
              )}
            >
              From complex multi-tenant dashboards to generative AI video pipelines, I deliver production systems ready for real users.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                className={cn(
                  "group/btn h-12 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-7 text-sm font-bold text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 hover:scale-105 active:scale-95",
                  isLotm &&
                    "border border-[#f0b85b]/45 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a]",
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
                  "group/btn h-12 rounded-full border border-zinc-800 bg-zinc-900/80 px-6 text-sm font-semibold text-zinc-200 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-95",
                  isLotm &&
                    "border-[#d49a3f]/40 bg-[#070b13]/70 text-[#deebff] hover:bg-[#101a2b] hover:border-[#f0b85b]/50",
                )}
              >
                <Link href="#projects">View All Case Studies</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
