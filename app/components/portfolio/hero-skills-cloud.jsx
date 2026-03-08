"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../utils/cn";

const fallbackThreads = [
  { name: "Next.js", color: "#0f172a", title: "Frontend system" },
  { name: "React", color: "#0f766e", title: "UI composition" },
  { name: "TypeScript", color: "#2563eb", title: "Type-safe foundation" },
  { name: "Node.js", color: "#f97316", title: "Backend runtime" },
  { name: "Prisma", color: "#7c3aed", title: "Data modeling" },
  { name: "MongoDB", color: "#0ea5e9", title: "Flexible persistence" },
];

const ringMotion = {
  repeat: Infinity,
  ease: "linear",
};

export default function HeroSkillsCloud({
  threads = fallbackThreads,
  activeSkill,
  onActiveChange = () => {},
  lotmMode = false,
}) {
  const normalizedThreads = useMemo(
    () =>
      (threads.length ? threads : fallbackThreads).map((thread, index) => ({
        ...thread,
        name: thread?.name ?? thread?.label ?? `Skill ${index + 1}`,
        color: thread?.color ?? "#2563eb",
      })),
    [threads]
  );
  const [pauseAutoCycle, setPauseAutoCycle] = useState(false);

  useEffect(() => {
    if (pauseAutoCycle || normalizedThreads.length < 2) {
      return;
    }

    const cycleId = window.setInterval(() => {
      const activeIndex = normalizedThreads.findIndex((item) => item.name === activeSkill);
      const nextIndex = activeIndex >= 0 ? (activeIndex + 1) % normalizedThreads.length : 0;
      onActiveChange(normalizedThreads[nextIndex]);
    }, 2600);

    return () => {
      window.clearInterval(cycleId);
    };
  }, [activeSkill, normalizedThreads, onActiveChange, pauseAutoCycle]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_32%_18%,rgba(15,118,110,0.16),transparent_42%),radial-gradient(circle_at_76%_74%,rgba(249,115,22,0.18),transparent_38%),linear-gradient(145deg,rgba(255,255,255,0.6),rgba(248,250,252,0.18))]",
          lotmMode &&
            "bg-[radial-gradient(circle_at_34%_20%,rgba(240,184,91,0.2),transparent_40%),radial-gradient(circle_at_76%_74%,rgba(13,59,102,0.28),transparent_38%),linear-gradient(145deg,rgba(8,16,26,0.72),rgba(5,9,15,0.24))]"
        )}
        animate={{ scale: [1, 1.03, 1], opacity: [0.86, 1, 0.86] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-[14%] rounded-full border border-cyan-500/22",
          lotmMode && "border-[#f0b85b]/30"
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, ...ringMotion }}
      />
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-[23%] rounded-full border border-orange-400/28",
          lotmMode && "border-[#0d3b66]/40"
        )}
        animate={{ rotate: -360 }}
        transition={{ duration: 24, ...ringMotion }}
      />
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-[32%] rounded-full border border-violet-400/20",
          lotmMode && "border-[#d49a3f]/38"
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, ...ringMotion }}
      />

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_90%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-size-[42px_42px]" />
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className={cn(
            "rounded-3xl border border-white/80 bg-white/80 px-5 py-3 text-center shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur",
            lotmMode && "border-[#d49a3f]/45 bg-[#0a111d]/85"
          )}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500",
              lotmMode && "font-(family-name:--font-lotm-body) text-[#f0b85b]"
            )}
          >
            Skill Matrix
          </p>
          <p
            className={cn(
              "mt-1 font-(family-name:--font-space-grotesk) text-lg text-slate-950",
              lotmMode && "font-(family-name:--font-lotm-heading) text-[#f5fbff]"
            )}
          >
            {activeSkill || normalizedThreads[0]?.name}
          </p>
        </motion.div>
      </div>

      {normalizedThreads.map((thread, index) => {
        const angle = (Math.PI * 2 * index) / normalizedThreads.length;
        const ringRadius = index % 2 === 0 ? 40 : 30;
        const left = 50 + Math.cos(angle) * ringRadius;
        const top = 50 + Math.sin(angle) * ringRadius;
        const isActive = (activeSkill || normalizedThreads[0]?.name) === thread.name;

        return (
          <motion.button
            key={`${thread.name}-${index}`}
            type="button"
            onMouseEnter={() => {
              setPauseAutoCycle(true);
              onActiveChange(thread);
            }}
            onMouseLeave={() => {
              setPauseAutoCycle(false);
            }}
            onFocus={() => {
              setPauseAutoCycle(true);
              onActiveChange(thread);
            }}
            onBlur={() => {
              setPauseAutoCycle(false);
            }}
            onClick={() => {
              onActiveChange(thread);
            }}
            className={cn(
              "absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur transition",
              "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900/30",
              isActive
                ? "border-white/90 bg-white text-slate-900 shadow-[0_14px_35px_rgba(15,23,42,0.2)]"
                : "border-white/70 bg-white/75 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.12)] hover:scale-105",
              lotmMode &&
                (isActive
                  ? "border-[#f0b85b]/70 bg-[#0f1828] text-[#f7fcff]"
                  : "border-[#d49a3f]/40 bg-[#09101a]/85 text-[#cae0ff]")
            )}
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{
              y: [0, -8 - (index % 3), 0],
              scale: isActive ? 1.07 : 1,
            }}
            transition={{
              duration: 3 + (index % 3) * 0.55,
              delay: index * 0.08,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="mr-2 inline-block size-2.5 rounded-full" style={{ backgroundColor: thread.color }} />
            {thread.name}
          </motion.button>
        );
      })}
    </div>
  );
}
