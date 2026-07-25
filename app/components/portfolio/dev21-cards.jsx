"use client";

import React, { useState } from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { cn } from "../../utils/cn";
import { PexelsCardBg } from "./pexels-media";
import {
  Layers,
  Zap,
  MessageSquareCode,
  Smartphone,
  ShieldCheck,
  LayoutDashboard,
  Sparkles,
  BrainCircuit,
  CreditCard,
  Database,
  CloudUpload,
  Video,
  Lock,
  Terminal,
  CheckCircle2,
  Compass,
  Boxes,
  Code2,
  Rocket,
  Headphones,
  ArrowRight,
  Gauge,
  Check,
  FileCode2,
} from "lucide-react";

// Why Work With Me Card (21st.dev style)
export function Dev21WhyMeCard({ title, description, isLotm }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const config = {
    "Production Experience": {
      icon: Layers,
      color: "from-teal-500/20 to-emerald-500/10",
      accent: "text-teal-600 dark:text-teal-400",
      badge: "40+ Admin Screens",
      badgeBg: "bg-teal-500/10 text-teal-700 border-teal-500/20 dark:text-teal-300",
      spotlight: "rgba(45, 212, 191, 0.15)",
    },
    "Faster Performance": {
      icon: Zap,
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-600 dark:text-amber-400",
      badge: "40% Load Speedup",
      badgeBg: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300",
      spotlight: "rgba(245, 158, 11, 0.15)",
    },
    "Clear Communication": {
      icon: MessageSquareCode,
      color: "from-indigo-500/20 to-blue-500/10",
      accent: "text-indigo-600 dark:text-indigo-400",
      badge: "< 12h Response SLA",
      badgeBg: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20 dark:text-indigo-300",
      spotlight: "rgba(99, 102, 241, 0.15)",
    },
    "Web + Mobile": {
      icon: Smartphone,
      color: "from-cyan-500/20 to-teal-500/10",
      accent: "text-cyan-600 dark:text-cyan-400",
      badge: "iOS + Android",
      badgeBg: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20 dark:text-cyan-300",
      spotlight: "rgba(6, 182, 212, 0.15)",
    },
  }[title] || {
    icon: Layers,
    color: "from-teal-500/20 to-emerald-500/10",
    accent: "text-teal-600",
    badge: "Delivered",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
    spotlight: "rgba(45, 212, 191, 0.15)",
  };

  const IconComponent = config.icon;
  const pexelsQuery = title === "Production Experience" ? "professional workspace" :
    title === "Faster Performance" ? "speed technology" :
    title === "Clear Communication" ? "team communication" :
    title === "Web + Mobile" ? "web mobile development" : "abstract technology";

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.14)] dark:bg-slate-900/80 dark:border-slate-800",
        isLotm && "border-[#d49a3f]/38 bg-[#090f18]/90 shadow-[0_18px_60px_rgba(0,0,0,0.4)]"
      )}
    >
      <PexelsCardBg query={pexelsQuery} className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03]" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${config.spotlight}, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between">
            <div className={cn("flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-inner border border-white/60 dark:border-white/10", config.color)}>
              <IconComponent className={cn("size-6", config.accent, isLotm && "text-[#f0b85b]")} />
            </div>

            <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide", config.badgeBg, isLotm && "border-[#d49a3f]/40 bg-[#161220] text-[#f0b85b]")}>
              {config.badge}
            </span>
          </div>

          <h3 className={cn("mt-5 font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950 dark:text-white", isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]")}>
            {title}
          </h3>

          <p className={cn("mt-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300", isLotm && "font-(family-name:--font-lotm-body) text-[#b8cdee]")}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// What I Can Deliver Grid Item (21st.dev style)
export function Dev21DeliveryItem({ text, isLotm }) {
  const iconMap = {
    "Authentication & Authorization": Lock,
    "Admin Dashboards & Panels": LayoutDashboard,
    "AI & LLM Integration": Sparkles,
    "ML/DL Model Deployment": BrainCircuit,
    "NLP & Text Analytics": FileCode2,
    "Payment Gateways": CreditCard,
    "CRUD Systems & APIs": Terminal,
    "Database Design & Schemas": Database,
    "Deployment & CI/CD": CloudUpload,
    "Responsive Landing Pages": Layers,
    "Real-Time Features (WebRTC)": Video,
    "Role-Based Access Control": ShieldCheck,
  };

  const IconComp = iconMap[text] || CheckCircle2;

  return (
    <div
      className={cn(
        "group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white/70 p-3.5 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-teal-500/40 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900",
        isLotm && "border-[#d49a3f]/25 bg-[#080d16]/80 text-[#e4efff] hover:border-[#d49a3f]/60 hover:bg-[#0c1524]"
      )}
    >
      <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-200 dark:bg-teal-400/20 dark:text-teal-300", isLotm && "bg-[#d49a3f]/15 text-[#f0b85b] group-hover:bg-[#c8861f] group-hover:text-white")}>
        <IconComp className="size-4.5" />
      </div>
      <span className={cn("text-sm font-medium text-slate-800 dark:text-slate-200", isLotm && "text-[#dce9ff]")}>
        {text}
      </span>
    </div>
  );
}

// Process Card (21st.dev style step card)
export function Dev21ProcessCard({ step, isLotm }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const stepMeta = {
    "01": {
      icon: Compass,
      gradient: "from-teal-500 to-emerald-500",
      accent: "text-teal-600 dark:text-teal-400",
      deliverable: "Scope & Deliverables defined",
      bgGlow: "rgba(45, 212, 191, 0.12)",
    },
    "02": {
      icon: Boxes,
      gradient: "from-blue-500 to-indigo-500",
      accent: "text-blue-600 dark:text-blue-400",
      deliverable: "DB Schemas & API Architecture",
      bgGlow: "rgba(59, 130, 246, 0.12)",
    },
    "03": {
      icon: Code2,
      gradient: "from-violet-500 to-purple-500",
      accent: "text-violet-600 dark:text-violet-400",
      deliverable: "Type-safe code & Weekly Demos",
      bgGlow: "rgba(139, 92, 246, 0.12)",
    },
    "04": {
      icon: ShieldCheck,
      gradient: "from-emerald-500 to-teal-500",
      accent: "text-emerald-600 dark:text-emerald-400",
      deliverable: "QA, Auth & Performance audit",
      bgGlow: "rgba(16, 185, 129, 0.12)",
    },
    "05": {
      icon: Rocket,
      gradient: "from-orange-500 to-amber-500",
      accent: "text-orange-600 dark:text-orange-400",
      deliverable: "Vercel / AWS CI/CD live launch",
      bgGlow: "rgba(249, 115, 22, 0.12)",
    },
    "06": {
      icon: Headphones,
      gradient: "from-rose-500 to-pink-500",
      accent: "text-rose-600 dark:text-rose-400",
      deliverable: "Post-launch fixes & monitoring",
      bgGlow: "rgba(244, 63, 94, 0.12)",
    },
  }[step.number] || {
    icon: Compass,
    gradient: "from-teal-500 to-emerald-500",
    accent: "text-teal-600",
    deliverable: "Completed Milestone",
    bgGlow: "rgba(45, 212, 191, 0.12)",
  };

  const IconComp = stepMeta.icon;
  const pexelsQuery = step.number === "01" ? "discovery planning" :
    step.number === "02" ? "architecture blueprints" :
    step.number === "03" ? "coding development" :
    step.number === "04" ? "quality testing" :
    step.number === "05" ? "deployment launch" :
    step.number === "06" ? "customer support" : "abstract";

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_90px_rgba(15,23,42,0.14)] dark:bg-slate-900/80 dark:border-slate-800",
        isLotm && "border-[#d49a3f]/38 bg-[#090f18]/90"
      )}
    >
      <PexelsCardBg query={pexelsQuery} className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03]" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${stepMeta.bgGlow}, transparent 80%)`,
        }}
      />

      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80 group-hover:opacity-100 transition-opacity", stepMeta.gradient)} />

      <div>
        <div className="flex items-center justify-between">
          <span className={cn("font-(family-name:--font-space-grotesk) text-3xl font-extrabold tracking-tight text-slate-300 dark:text-slate-700 group-hover:text-slate-900 dark:group-hover:text-white transition-colors", isLotm && "text-[#f0b85b]/40 font-(family-name:--font-lotm-heading)")}>
            {step.number}
          </span>

          <div className={cn("flex size-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-slate-950 group-hover:text-white transition-all duration-200", isLotm && "border-[#d49a3f]/30 bg-[#161220] text-[#f0b85b] group-hover:bg-[#c8861f] group-hover:text-white")}>
            <IconComp className="size-5" />
          </div>
        </div>

        <h3 className={cn("mt-4 font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950 dark:text-white", isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]")}>
          {step.title}
        </h3>

        <p className={cn("mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300", isLotm && "font-(family-name:--font-lotm-body) text-[#b8cdee]")}>
          {step.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <CheckCircle2 className={cn("size-3.5", stepMeta.accent, isLotm && "text-[#f0b85b]")} />
          <span>{stepMeta.deliverable}</span>
        </div>
      </div>
    </div>
  );
}

// 21st.dev Service Card with glowing icon header
export function Dev21ServiceCard({ service, isLotm }) {
  const iconMap = {
    "saas-dev": { icon: LayoutDashboard, gradient: "from-teal-500 to-cyan-500" },
    "mobile-dev": { icon: Smartphone, gradient: "from-blue-500 to-indigo-500" },
    "dashboards": { icon: Terminal, gradient: "from-violet-500 to-purple-500" },
    "ml-ai": { icon: BrainCircuit, gradient: "from-amber-500 to-orange-500" },
    "backend": { icon: Database, gradient: "from-emerald-500 to-teal-500" },
    "mvp": { icon: Rocket, gradient: "from-rose-500 to-pink-500" },
  };

  const meta = iconMap[service.id] || { icon: Sparkles, gradient: "from-teal-500 to-cyan-500" };
  const IconComp = meta.icon;
  const pexelsQuery = service.serviceName === "SaaS Build" ? "SaaS dashboard technology" :
    service.serviceName === "Mobile Apps" ? "mobile app development" :
    service.serviceName === "Admin Tools" ? "data analytics dashboard" :
    service.serviceName === "ML & AI" ? "artificial intelligence" :
    service.serviceName === "Backend & APIs" ? "server room code" :
    service.serviceName === "MVPs & Prototypes" ? "startup business" : "abstract technology";

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_80px_rgba(15,23,42,0.14)] dark:bg-slate-900/80 dark:border-slate-800",
        isLotm && "border-[#d49a3f]/38 bg-[#090f18]/90"
      )}
    >
      <PexelsCardBg query={pexelsQuery} className="absolute inset-0 opacity-[0.08] dark:opacity-[0.04]" />
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity", meta.gradient)} />

      <div>
        <div className="flex items-center justify-between">
          <div className={cn("flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md", meta.gradient)}>
            <IconComp className="size-6" />
          </div>

          <span className={cn("rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300", isLotm && "border-[#d49a3f]/35 bg-[#141d2b] text-[#f0b85b]")}>
            {service.serviceName}
          </span>
        </div>

        <h3 className={cn("mt-5 font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950 dark:text-white", isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]")}>
          {service.title}
        </h3>

        <p className={cn("mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300", isLotm && "font-(family-name:--font-lotm-body) text-[#b8cdee]")}>
          {service.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {service.capabilities.map((cap) => (
            <span
              key={cap}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300",
                isLotm && "border-[#6f6148]/60 bg-[#161220] text-[#c9bead]"
              )}
            >
              <Check className="size-3 text-teal-600 dark:text-teal-400" />
              {cap}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 21st.dev About Card
export function Dev21AboutCard({ card, isLotm }) {
  const iconMap = {
    "Outcome-Focused": { icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
    "Full Ownership": { icon: ShieldCheck, color: "text-teal-500", bg: "bg-teal-500/10 border-teal-500/20" },
    "Production Stack": { icon: Code2, color: "text-indigo-500", bg: "bg-indigo-500/10 border-indigo-500/20" },
  };

  const meta = iconMap[card.title] || { icon: Sparkles, color: "text-teal-500", bg: "bg-teal-500/10 border-teal-500/20" };
  const IconComp = meta.icon;
  const pexelsQuery = card.title === "Outcome-Focused" ? "results business" :
    card.title === "Full Ownership" ? "ownership leadership" :
    card.title === "Production Stack" ? "technology stack" : "abstract";

  return (
    <div
      className={cn(
        "group relative flex items-start gap-4 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-900/80 dark:border-slate-800",
        isLotm && "border-[#d49a3f]/38 bg-[#090f18]/90"
      )}
    >
      <PexelsCardBg query={pexelsQuery} className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03]" />
      <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-2xl border shadow-sm", meta.bg, meta.color)}>
        <IconComp className="size-6" />
      </div>

      <div>
        <h3 className={cn("font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950 dark:text-white", isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]")}>
          {card.title}
        </h3>
        <p className={cn("mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300", isLotm && "font-(family-name:--font-lotm-body) text-[#b8cdee]")}>
          {card.description}
        </p>
      </div>
    </div>
  );
}
