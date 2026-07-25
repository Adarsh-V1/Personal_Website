"use client";

import { useState, useEffect } from "react";
import Card from "../components/workCom/Card";
import { cn } from "../utils/cn";

export default function SamplesClient() {
  const [lotm, setLotm] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    setLotm(html.classList.contains("lotm") || html.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setLotm(html.classList.contains("lotm") || html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <main className={cn(
      "relative min-h-screen overflow-x-hidden px-6 pb-16 pt-28 lg:px-10",
      lotm
        ? "bg-[#02050a] text-white"
        : "bg-[#fcfaf5] text-slate-900"
    )}>
      <div aria-hidden="true" className={cn(
        "pointer-events-none fixed inset-0",
        lotm ? "opacity-30" : "opacity-100"
      )}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="max-w-3xl space-y-4">
          <p className={cn(
            "text-xs font-semibold uppercase tracking-[0.32em]",
            lotm ? "text-[#f0b85b]" : "text-teal-700"
          )}>
            Featured Work
          </p>
          <h1 className={cn(
            "text-4xl font-bold leading-tight sm:text-5xl",
            lotm ? "text-[#eef6ff]" : "text-slate-950"
          )}>
            Projects, product experiments, and development samples.
          </h1>
          <p className={cn(
            "text-base leading-7 sm:text-lg",
            lotm ? "text-slate-300" : "text-slate-600"
          )}>
            Explore selected work across React, Next.js, JavaScript, Python, APIs, and
            interactive frontends built to demonstrate real product thinking.
          </p>
        </section>

        <div>
          <Card />
        </div>
      </div>
    </main>
  );
}