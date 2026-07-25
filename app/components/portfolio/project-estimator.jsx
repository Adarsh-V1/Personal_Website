"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator,
  Check,
  Calendar,
  Send,
  Zap,
  Clock,
  Sparkles,
  HelpCircle,
  X,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Button } from "../ui/button";

const PROJECT_TYPES = [
  {
    id: "saas",
    name: "Full-Stack SaaS Platform",
    basePrice: 4800,
    baseWeeks: 4,
    description: "End-to-end web app with auth, database, state management, API routes, and subscription billing.",
    icon: "🚀"
  },
  {
    id: "dashboard",
    name: "Admin Dashboard & Portal",
    basePrice: 3200,
    baseWeeks: 3,
    description: "Data-dense control panel with real-time charts, table filters, role management, and analytics.",
    icon: "📊"
  },
  {
    id: "ai",
    name: "AI Agent & LLM Integration",
    basePrice: 2900,
    baseWeeks: 2,
    description: "Custom AI workflows, RAG pipelines, OpenAI/Anthropic/Gemini integrations, and interactive chat UIs.",
    icon: "🤖"
  },
  {
    id: "landing",
    name: "High-Converting Landing Page",
    basePrice: 1800,
    baseWeeks: 1.5,
    description: "Ultra-fast, responsive Next.js landing page with GSAP micro-animations and SEO optimization.",
    icon: "⚡"
  },
  {
    id: "mobile",
    name: "Cross-Platform Mobile App",
    basePrice: 4200,
    baseWeeks: 4,
    description: "iOS & Android mobile app built with React Native / PWA for seamless phone performance.",
    icon: "📱"
  }
];

const FEATURE_ADDONS = [
  { id: "auth", name: "User Authentication & Roles (Clerk / NextAuth)", price: 450, timeDays: 2 },
  { id: "payments", name: "Stripe Subscriptions & Webhooks", price: 650, timeDays: 3 },
  { id: "cms", name: "Headless CMS (Sanity / Strapi / Payload)", price: 500, timeDays: 3 },
  { id: "realtime", name: "Realtime WebSockets & Live Sync", price: 700, timeDays: 4 },
  { id: "analytics", name: "Custom Analytics & Export Tools", price: 400, timeDays: 2 },
  { id: "seo_pwa", name: "Advanced SEO & PWA Offline Setup", price: 350, timeDays: 2 }
];

const TIMELINE_SPEEDS = [
  { id: "standard", name: "Standard Delivery", multiplier: 1, text: "Optimal pacing & thorough testing" },
  { id: "fast", name: "Fast-Track (+20%)", multiplier: 1.2, text: "Accelerated development cycles" },
  { id: "rush", name: "Priority Rush (+40%)", multiplier: 1.4, text: "Dedicated full-focus execution" }
];

export default function ProjectEstimator({ onBookCall, onRequestQuote }) {
  const [selectedType, setSelectedType] = useState("saas");
  const [selectedFeatures, setSelectedFeatures] = useState(["auth", "payments"]);
  const [selectedSpeed, setSelectedSpeed] = useState("standard");
  const [isCalOpen, setIsCalOpen] = useState(false);

  const activeProjectType = useMemo(
    () => PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0],
    [selectedType]
  );

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const featureSum = selectedFeatures.reduce((acc, fId) => {
      const feat = FEATURE_ADDONS.find((f) => f.id === fId);
      return acc + (feat ? feat.price : 0);
    }, 0);

    const featureDays = selectedFeatures.reduce((acc, fId) => {
      const feat = FEATURE_ADDONS.find((f) => f.id === fId);
      return acc + (feat ? feat.timeDays : 0);
    }, 0);

    const speed = TIMELINE_SPEEDS.find((s) => s.id === selectedSpeed) || TIMELINE_SPEEDS[0];

    const subtotal = activeProjectType.basePrice + featureSum;
    const finalPrice = Math.round(subtotal * speed.multiplier);
    const baseDays = activeProjectType.baseWeeks * 7;
    const totalDays = Math.ceil((baseDays + featureDays) / (speed.multiplier === 1.4 ? 1.3 : speed.multiplier === 1.2 ? 1.15 : 1));
    const weeks = (totalDays / 7).toFixed(1);

    return { finalPrice, weeks, totalDays };
  }, [activeProjectType, selectedFeatures, selectedSpeed]);

  const handleShareQuote = () => {
    const featNames = selectedFeatures
      .map((fId) => FEATURE_ADDONS.find((f) => f.id === fId)?.name)
      .filter(Boolean)
      .join(", ");

    const quoteSummary = `Hi Adarsh,\n\nI used your interactive project calculator and got an estimated quote:\n- Scope: ${activeProjectType.name}\n- Features: ${featNames || "None selected"}\n- Speed: ${selectedSpeed.toUpperCase()}\n- Estimated Budget: ~$${calculation.finalPrice.toLocaleString()} USD (${calculation.weeks} weeks)\n\nLet's discuss further!`;

    if (onRequestQuote) {
      onRequestQuote(quoteSummary);
    } else {
      navigator.clipboard.writeText(quoteSummary);
      alert("Quote details copied to clipboard! Paste them into the contact form.");
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 font-body">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-600 dark:text-teal-400 mb-2">
            <Sparkles className="size-3.5" />
            Interactive Scope & Budget Calculator
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-950 dark:text-white">
            Estimate Your Project Scope
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tailor your requirements for an instant transparent price & timeline breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCalOpen(true)}
            variant="outline"
            className="rounded-full gap-2 border-slate-300 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-800 dark:text-slate-200"
          >
            <Calendar className="size-4 text-teal-500" />
            Book 15-min Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scope Selectors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              1. Select Project Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex flex-col justify-between text-left p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? "border-teal-500 bg-teal-500/5 ring-2 ring-teal-500/20 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xl">{type.icon}</span>
                      {isSelected && <Check className="size-4 text-teal-600 dark:text-teal-400" />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {type.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {type.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Feature Add-ons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              2. Add Technical Modules
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FEATURE_ADDONS.map((feat) => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                      isChecked
                        ? "border-teal-500/80 bg-teal-500/10 text-slate-900 dark:text-slate-100 font-medium"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-4 rounded flex items-center justify-center border transition-all ${
                          isChecked
                            ? "bg-teal-600 border-teal-600 text-white"
                            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        }`}
                      >
                        {isChecked && <Check className="size-3" />}
                      </div>
                      <span>{feat.name}</span>
                    </div>
                    <span className="text-slate-400 dark:text-slate-500 text-[11px] font-mono">
                      +${feat.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Speed/Urgency */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              3. Delivery Pace
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {TIMELINE_SPEEDS.map((speed) => {
                const isSelected = selectedSpeed === speed.id;
                return (
                  <button
                    key={speed.id}
                    onClick={() => setSelectedSpeed(speed.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300 font-semibold"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-xs font-bold">{speed.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {speed.text}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Estimated Summary Card */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-teal-500/20 bg-gradient-to-b from-teal-500/5 via-slate-900/5 to-teal-500/10 dark:from-teal-950/20 dark:to-slate-900/40 p-6 shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Calculated Estimate
              </span>
              <span className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 font-medium">
                <ShieldCheck className="size-4" /> Fixed Rate Guarantee
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Selected Scope</div>
                <div className="text-lg font-bold font-heading text-slate-900 dark:text-slate-100 mt-0.5">
                  {activeProjectType.name}
                </div>
              </div>

              <div className="flex items-baseline justify-between py-3 border-t border-b border-slate-200/60 dark:border-slate-800/80">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="size-3.5" /> Estimated Timeline
                  </div>
                  <div className="text-xl font-bold font-heading text-slate-900 dark:text-slate-100 mt-1">
                    ~{calculation.weeks} Weeks
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-end gap-1">
                    <Zap className="size-3.5 text-amber-500" /> Total Investment
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-teal-600 dark:text-teal-400 mt-1">
                    ${calculation.finalPrice.toLocaleString()}
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> USD</span>
                  </div>
                </div>
              </div>

              {selectedFeatures.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Included Modules ({selectedFeatures.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFeatures.map((fId) => {
                      const feat = FEATURE_ADDONS.find((f) => f.id === fId);
                      return (
                        <span
                          key={fId}
                          className="inline-flex items-center gap-1 rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-2 py-1 text-[11px] text-slate-700 dark:text-slate-300"
                        >
                          <Check className="size-3 text-teal-500" />
                          {feat?.name.split(" ")[0]}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <Button
              onClick={handleShareQuote}
              className="w-full rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 gap-2 shadow-md shadow-teal-500/20"
            >
              <Send className="size-4" /> Copy / Attach to Inquiry
            </Button>

            <Button
              onClick={() => setIsCalOpen(true)}
              variant="ghost"
              className="w-full rounded-xl gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Prefer a direct consultation call?
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Booking Modal Overlay */}
      <AnimatePresence>
        {isCalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
            onClick={() => setIsCalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsCalOpen(false)}
                className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Calendar className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-heading text-slate-950 dark:text-white">
                    Schedule a 15-Minute Discovery Call
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Discuss your project scope, timeline, and tech architecture directly with Adarsh.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-6 text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Slot Availability: Q3 2026
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Click below to open the interactive scheduling calendar or send a direct email booking request.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 dark:bg-teal-500 px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 hover:opacity-95 transition shadow-lg"
                  >
                    Open Cal.com Calendar <ChevronRight className="size-4" />
                  </a>

                  <a
                    href="mailto:adarshpathania@example.com?subject=Discovery Call Request"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Send Email Request
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
