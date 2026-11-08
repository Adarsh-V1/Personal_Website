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
      "relative min-h-screen overflow-x-hidden px-6 pb-16 pt-28 lg:px-10 bg-[#050608] text-white",
      lotm && "bg-[#02050a]"
    )}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#00f5a0_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-400">
            Featured Engineering & Architecture
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl text-white">
            Production Systems, Generative AI & Architecture
          </h1>
          <p className="text-base leading-7 sm:text-lg text-slate-300">
            Real production architectures built with Next.js 15, WebRTC, PyTorch, tRPC, and multi-model AI workflows.
          </p>
        </section>

        <div>
          <Card />
        </div>
      </div>
    </main>
  );
}