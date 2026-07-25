"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { cn } from "@/lib/utils";

const techIcons = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/0f766e" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178c6" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169e1" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5fa04e" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776ab" },
  { name: "Django", icon: "https://cdn.simpleicons.org/django/092e20" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06b6d4" },
  { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe/635bff" },
  { name: "OpenAI", icon: "https://cdn.simpleicons.org/openai/412991" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ed" },
];

export default function TechMarquee({ items, isLotm }) {
  const midpoint = Math.ceil(items.length / 2);
  const firstRow = items.slice(0, midpoint);
  const secondRow = items.slice(midpoint);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-full border border-white/70 bg-white/60 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:bg-slate-900/60 dark:border-slate-800">
        <InfiniteSlider duration={35} durationOnHover={60} gap={16}>
          {firstRow.map((item, index) => (
            <div
              key={`row1-${item.name}-${index}`}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-400",
                isLotm && "border-[#d49a3f]/40 bg-[#0a101b]/90 text-[#c8dcff]"
              )}
            >
              <span className="font-semibold">{item.name}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {item.type}
              </span>
            </div>
          ))}
        </InfiniteSlider>
        <ProgressiveBlur
          className="pointer-events-none absolute left-0 top-0 h-full w-16"
          direction="left"
          blurIntensity={0.8}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute right-0 top-0 h-full w-16"
          direction="right"
          blurIntensity={0.8}
        />
      </div>

      <div className="relative overflow-hidden rounded-full border border-white/70 bg-white/60 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:bg-slate-900/60 dark:border-slate-800">
        <InfiniteSlider duration={40} durationOnHover={60} gap={16} reverse>
          {secondRow.map((item, index) => (
            <div
              key={`row2-${item.name}-${index}`}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-400",
                isLotm && "border-[#d49a3f]/40 bg-[#0a101b]/90 text-[#c8dcff]"
              )}
            >
              <span className="font-semibold">{item.name}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {item.type}
              </span>
            </div>
          ))}
        </InfiniteSlider>
        <ProgressiveBlur
          className="pointer-events-none absolute left-0 top-0 h-full w-16"
          direction="left"
          blurIntensity={0.8}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute right-0 top-0 h-full w-16"
          direction="right"
          blurIntensity={0.8}
        />
      </div>
    </div>
  );
}
