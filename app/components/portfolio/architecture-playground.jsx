"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  Play,
  CheckCircle2,
  Database,
  Server,
  Cloud,
  Layers,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Sliders,
  Radio,
  FileCheck2,
  Users,
  Compass,
  Coins,
} from "lucide-react";
import { cn } from "../../utils/cn";

export default function ArchitecturePlayground() {
  const { resolvedTheme } = useTheme();
  const isLotm = resolvedTheme === "lotm";

  const [activeTab, setActiveTab] = useState("chatx2");

  // Chatx2 state
  const [videoPrompt, setVideoPrompt] = useState("Cyberpunk Neo-Tokyo drone shot in rain");
  const [videoModel, setVideoModel] = useState("kling-4");
  const [pipelineState, setPipelineState] = useState("idle"); // idle, running, done
  const [activeNode, setActiveNode] = useState(0);

  // Atella state
  const [selectedRole, setSelectedRole] = useState("clinic-owner");

  // JetPlus state
  const [simulatedPings, setSimulatedPings] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);
  const [isSimulatingFleet, setIsSimulatingFleet] = useState(false);

  // ConvoLink state
  const [pingMs, setPingMs] = useState(42);
  const [isPinging, setIsPinging] = useState(false);

  // Auto-simulate GPU pipeline on scroll
  const sectionRef = useRef(null);
  const hasAutoRunRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoRunRef.current) {
            hasAutoRunRef.current = true;
            handleRunPipeline();
          }
        });
      },
      { threshold: 0.22 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run Chatx2 Pipeline simulation
  const handleRunPipeline = () => {
    if (pipelineState === "running") return;
    setPipelineState("running");
    setActiveNode(1);

    setTimeout(() => setActiveNode(2), 500);
    setTimeout(() => setActiveNode(3), 1100);
    setTimeout(() => setActiveNode(4), 1700);
    setTimeout(() => setActiveNode(5), 2300);
    setTimeout(() => {
      setPipelineState("done");
      setActiveNode(5);
    }, 2800);
  };

  // Run JetPlus Fleet simulation
  const handleSimulateFleet = () => {
    if (isSimulatingFleet) return;
    setIsSimulatingFleet(true);
    let pings = 0;
    let hits = 0;
    const interval = setInterval(() => {
      pings += 5;
      hits += Math.random() > 0.12 ? 4 : 3;
      setSimulatedPings(pings);
      setCacheHits(hits);
      if (pings >= 50) {
        clearInterval(interval);
        setIsSimulatingFleet(false);
      }
    }, 120);
  };

  // Run ConvoLink Ping test
  const handlePingTest = () => {
    setIsPinging(true);
    setTimeout(() => {
      setPingMs(Math.floor(28 + Math.random() * 24));
      setIsPinging(false);
    }, 400);
  };

  return (
    <section
      ref={sectionRef}
      id="architecture-playground"
      className="relative mx-auto my-16 w-full max-w-7xl scroll-mt-24 px-5 sm:px-8 lg:px-10"
    >
      {/* Background cyber ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-purple-500/10 blur-[120px]"
      />

      {/* Container Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400 backdrop-blur-md">
          <Activity className="size-3.5 animate-pulse text-cyan-400" />
          Interactive Production Playground
        </div>
        <h2 className="mt-4 font-(family-name:--font-space-grotesk) text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Test My Architecture In <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Real-Time</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-400 sm:text-lg">
          Don&apos;t just read about code. Interact with live architecture simulations of the multi-model AI pipelines, enterprise RBAC matrices, and telemetry caches I built in production.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {[
          { id: "chatx2", label: "Chatx2.ai Video Pipeline", icon: Zap, highlight: "AI Multi-Model" },
          { id: "atella", label: "Atella 5-Portal RBAC", icon: ShieldCheck, highlight: "Healthcare 40+ Screens" },
          { id: "jetplus", label: "JetPlus Telemetry Cache", icon: Compass, highlight: "92% Quota Saved" },
          { id: "convolink", label: "ConvoLink WebRTC Mesh", icon: Radio, highlight: "Sub-50ms Sync" },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-2xl border px-5 py-3 text-xs font-bold transition-all duration-300 sm:text-sm",
                isActive
                  ? "border-cyan-500/60 bg-cyan-950/40 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                  : "border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/70 hover:text-zinc-200"
              )}
            >
              <Icon className={cn("size-4 transition-colors", isActive ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300")} />
              <span>{tab.label}</span>
              <span className={cn(
                "hidden rounded-md px-1.5 py-0.5 text-[10px] uppercase tracking-wider sm:inline-block",
                isActive ? "bg-cyan-400/20 text-cyan-200" : "bg-zinc-800 text-zinc-500"
              )}>
                {tab.highlight}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Box */}
      <div className="mt-8 overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10">
        <AnimatePresence mode="wait">
          {/* TAB 1: CHATX2 AI PIPELINE */}
          {activeTab === "chatx2" && (
            <motion.div
              key="chatx2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header Info */}
              <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <span className="text-xs font-mono font-medium text-emerald-400">SYSTEM READY: FAL.AI & S3 PRESIGNED ORCHESTRATOR</span>
                  </div>
                  <h3 className="mt-1 font-(family-name:--font-space-grotesk) text-xl font-bold text-white sm:text-2xl">
                    Multi-Model Video Studio & Credit Settlement
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">Preset Prompts:</span>
                  <button
                    onClick={() => setVideoPrompt("Cyberpunk Neo-Tokyo drone shot in rain")}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-300 hover:border-cyan-500/50"
                  >
                    Cyberpunk
                  </button>
                  <button
                    onClick={() => setVideoPrompt("Hyper-realistic product orbit 4k 60fps")}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-300 hover:border-cyan-500/50"
                  >
                    Product
                  </button>
                </div>
              </div>

              {/* Controls bar */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Prompt / Generation Parameter</label>
                  <input
                    type="text"
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-3 font-mono text-sm text-zinc-100 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    placeholder="Enter prompt..."
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">Engine / Provider Model</label>
                  <select
                    value={videoModel}
                    onChange={(e) => setVideoModel(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-3 font-mono text-sm text-zinc-100 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="kling-4">Kling 4.0 Edit (Native 60fps)</option>
                    <option value="minimax-h3">MiniMax H3 Max (fal.ai)</option>
                    <option value="seedance-2">Seedance 2.5 (WaveSpeed)</option>
                    <option value="wan-3">Wan 3.0 Video-to-Video</option>
                  </select>
                </div>
              </div>

              {/* Node Flow Visualizer */}
              <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">Live Architecture Flow</div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-5">
                  {[
                    { step: 1, title: "1. Client UI", subtitle: "Next.js App Router", icon: Server },
                    { step: 2, title: "2. Edge API", subtitle: "Hono.js Gateway", icon: Cpu },
                    { step: 3, title: "3. Wallet Hold", subtitle: "PHP / DB Settlement", icon: Coins },
                    { step: 4, title: "4. Worker GPU", subtitle: "Fal.ai / Kling O3", icon: Cloud },
                    { step: 5, title: "5. S3 Presigned", subtitle: "1-hr Encrypted Stream", icon: Database },
                  ].map((node) => {
                    const isPassed = activeNode >= node.step;
                    const isCurrent = activeNode === node.step && pipelineState === "running";
                    const Icon = node.icon;
                    return (
                      <div
                        key={node.step}
                        className={cn(
                          "relative flex flex-col items-center rounded-xl border p-4 text-center transition-all duration-300",
                          isCurrent
                            ? "border-cyan-400 bg-cyan-950/50 shadow-[0_0_20px_rgba(34,211,238,0.35)] scale-105"
                            : isPassed
                            ? "border-emerald-500/50 bg-emerald-950/20 text-zinc-200"
                            : "border-zinc-800 bg-zinc-900/50 text-zinc-500"
                        )}
                      >
                        <div className={cn(
                          "flex size-10 items-center justify-center rounded-full border",
                          isCurrent
                            ? "border-cyan-400 bg-cyan-500/20 text-cyan-300 animate-spin"
                            : isPassed
                            ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                            : "border-zinc-700 bg-zinc-800 text-zinc-500"
                        )}>
                          <Icon className="size-5" />
                        </div>
                        <span className="mt-3 text-xs font-bold font-mono">{node.title}</span>
                        <span className="text-[11px] text-zinc-400">{node.subtitle}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Simulation Trigger Button */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800/80 pt-4">
                  <div className="flex items-center gap-4 font-mono text-xs text-zinc-400">
                    <div>Status: <span className={cn(
                      "font-bold",
                      pipelineState === "running" ? "text-cyan-400 animate-pulse" : pipelineState === "done" ? "text-emerald-400" : "text-zinc-500"
                    )}>{pipelineState.toUpperCase()}</span></div>
                    {pipelineState === "done" && (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="size-3.5" />
                        <span>Presigned S3 playback ready (Latency: 2.1s)</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleRunPipeline}
                    disabled={pipelineState === "running"}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <Play className="size-3.5 fill-black" />
                    {pipelineState === "running" ? "Dispatching GPU Job..." : "Simulate GPU Pipeline"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ATELLA HEALTHCARE RBAC */}
          {activeTab === "atella" && (
            <motion.div
              key="atella"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="border-b border-zinc-800/80 pb-6">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  <span className="text-xs font-mono font-medium text-cyan-400">ATELLA HEALTH: 5 DISTINCT ENTERPRISE PORTALS (40+ SCREENS)</span>
                </div>
                <h3 className="mt-1 font-(family-name:--font-space-grotesk) text-xl font-bold text-white sm:text-2xl">
                  Multi-Tenant Role-Based Access Control Matrix
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Switch between user roles below to observe how access controls, HIPAA data masking, and dashboard schemas adapt in real time.
                </p>
              </div>

              {/* Role Toggle Selector */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {[
                  { id: "clinic-owner", label: "Clinic Owner", tag: "Full Financials & Ops" },
                  { id: "bcba", label: "Provider / BCBA", tag: "Clinical Trials & Notes" },
                  { id: "hr-manager", label: "Office HR", tag: "Staff & Compliance" },
                  { id: "kiosk", label: "Kiosk Terminal", tag: "Parent & Check-In" },
                  { id: "superadmin", label: "Super Admin", tag: "Multi-Clinic Tenancy" },
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "flex flex-col items-start rounded-xl border p-3 text-left transition-all",
                      selectedRole === role.id
                        ? "border-emerald-400 bg-emerald-950/40 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/40"
                    )}
                  >
                    <span className="text-xs font-bold">{role.label}</span>
                    <span className="text-[10px] text-zinc-500">{role.tag}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic View Mockup */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
                {selectedRole === "clinic-owner" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">Active View: Clinic Owner Dashboard</span>
                      <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">HIPAA TIER 1 ACCESS</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">Monthly Billed Claims</div>
                        <div className="mt-1 font-mono text-2xl font-black text-white">$142,850</div>
                        <div className="mt-1 text-[11px] text-emerald-400">+18.4% from last quarter</div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">Active Patient Caseload</div>
                        <div className="mt-1 font-mono text-2xl font-black text-white">48 Patients</div>
                        <div className="mt-1 text-[11px] text-zinc-400">98% utilization rate</div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">BCBA Session Audits</div>
                        <div className="mt-1 font-mono text-2xl font-black text-white">100% Compliant</div>
                        <div className="mt-1 text-[11px] text-cyan-400">0 unbilled authorizations</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === "bcba" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">Active View: BCBA Behavior Analyst Terminal</span>
                      <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-[11px] text-cyan-400">CLINICAL TRIALS ONLY</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">Today&apos;s Therapy Sessions</div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between rounded-lg bg-zinc-900 p-2 text-xs">
                            <span className="text-white">Patient #ABA-8402 (Receptive ID)</span>
                            <span className="text-emerald-400">Completed (88% mastery)</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-zinc-900 p-2 text-xs">
                            <span className="text-white">Patient #ABA-9114 (Manding trials)</span>
                            <span className="text-yellow-400">In Progress</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">Session Note Validator</div>
                        <div className="mt-2 text-xs text-zinc-300">
                          Automated SOAP note verification: checks start/end time stamps, parent signature capture, and CPT billing codes (97151, 97153).
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === "hr-manager" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-purple-400">Active View: Office & HR Manager Panel</span>
                      <span className="rounded-md bg-purple-500/10 px-2 py-0.5 font-mono text-[11px] text-purple-400">STAFF & CREDENTIALING</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">RBT Therapists On-Shift</div>
                        <div className="mt-1 font-mono text-2xl font-black text-white">24 Active</div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">CPR / BACB Renewals</div>
                        <div className="mt-1 font-mono text-2xl font-black text-emerald-400">0 Overdue</div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">Bi-Weekly Timesheet Approvals</div>
                        <div className="mt-1 font-mono text-2xl font-black text-white">96% Approved</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === "kiosk" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-amber-400">Active View: On-Site Reception Kiosk Terminal</span>
                      <span className="rounded-md bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] text-amber-400">PUBLIC TOUCH INTERFACE</span>
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-6 text-center">
                      <div className="text-lg font-bold text-white">Welcome to Atella Clinic Center</div>
                      <p className="mt-1 text-xs text-zinc-400">Scan Guardian QR Code or Enter 4-Digit PIN to Check In Child</p>
                      <div className="mx-auto mt-4 max-w-xs rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 p-4 text-xs font-mono text-amber-300">
                        [ Camera QR Scanner Active ] — Late Arrival & Parent Sign-Off Captured
                      </div>
                    </div>
                  </div>
                )}

                {selectedRole === "superadmin" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-rose-400">Active View: Multi-Clinic SuperAdmin Console</span>
                      <span className="rounded-md bg-rose-500/10 px-2 py-0.5 font-mono text-[11px] text-rose-400">GLOBAL PLATFORM ROOT</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">Licensed Clinics</div>
                        <div className="mt-1 font-mono text-2xl font-black text-white">12 Facilities</div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">Database Tenant Isolation</div>
                        <div className="mt-1 font-mono text-2xl font-black text-emerald-400">100% Encrypted</div>
                      </div>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                        <div className="text-xs text-zinc-400">Total System Users</div>
                        <div className="mt-1 font-mono text-2xl font-black text-white">1,420 Active</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: JETPLUS TELEMETRY */}
          {activeTab === "jetplus" && (
            <motion.div
              key="jetplus"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <span className="text-xs font-mono font-medium text-emerald-400">DIRECTIONS API & EVENT-LOG CACHE ACTIVE</span>
                  </div>
                  <h3 className="mt-1 font-(family-name:--font-space-grotesk) text-xl font-bold text-white sm:text-2xl">
                    JetPlus Telemetry & Smart Directions Cache
                  </h3>
                </div>
                <button
                  onClick={handleSimulateFleet}
                  disabled={isSimulatingFleet}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={cn("size-3.5", isSimulatingFleet && "animate-spin")} />
                  {isSimulatingFleet ? "Simulating GPS Pings..." : "Trigger 50 Driver Pings"}
                </button>
              </div>

              {/* Cache Stats Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <div className="text-xs text-zinc-400">Total Route Queries</div>
                  <div className="mt-1 font-mono text-3xl font-black text-white">{simulatedPings}</div>
                  <div className="mt-1 text-[11px] text-zinc-500">Live GPS Coordinate Batches</div>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="text-xs text-emerald-400">Cache Hits (Zero-Cost)</div>
                  <div className="mt-1 font-mono text-3xl font-black text-emerald-300">{cacheHits}</div>
                  <div className="mt-1 text-[11px] text-emerald-400">
                    {simulatedPings > 0 ? `${Math.round((cacheHits / simulatedPings) * 100)}% Hit Ratio` : "Memory + LocalStorage"}
                  </div>
                </div>
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                  <div className="text-xs text-cyan-400">Estimated Cost Saved</div>
                  <div className="mt-1 font-mono text-3xl font-black text-cyan-300">
                    ${(cacheHits * 0.005).toFixed(2)}
                  </div>
                  <div className="mt-1 text-[11px] text-cyan-400">Saved on Google Directions API</div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <div className="text-xs text-zinc-400">Response Latency</div>
                  <div className="mt-1 font-mono text-3xl font-black text-white">
                    {cacheHits > 0 ? "3ms" : "280ms"}
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-400">Cache vs Network roundtrip</div>
                </div>
              </div>

              {/* Technical Implementation Note */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 font-mono text-xs text-zinc-400">
                <span className="text-emerald-400 font-bold">Engineering Breakdown:</span> Caches route endpoints with stable origin-waypoint-destination hashing in browser memory and localStorage with bounded TTL and miss-caching (`ZERO_RESULTS` / `NOT_FOUND`) to prevent repeated billing spikes.
              </div>
            </motion.div>
          )}

          {/* TAB 4: CONVOLINK WEBRTC */}
          {activeTab === "convolink" && (
            <motion.div
              key="convolink"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    <span className="text-xs font-mono font-medium text-cyan-400">CONVEX REACTIVITY & WEBRTC P2P SIGNALING</span>
                  </div>
                  <h3 className="mt-1 font-(family-name:--font-space-grotesk) text-xl font-bold text-white sm:text-2xl">
                    Sub-100ms Real-Time Communication Mesh
                  </h3>
                </div>
                <button
                  onClick={handlePingTest}
                  disabled={isPinging}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <Activity className="size-3.5" />
                  {isPinging ? "Measuring Latency..." : "Measure WebSocket Ping"}
                </button>
              </div>

              {/* Reactive Metrics */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 text-center">
                  <div className="text-xs text-cyan-300">Convex Mutation Latency</div>
                  <div className="mt-2 font-mono text-4xl font-black text-cyan-400">{pingMs} ms</div>
                  <div className="mt-1 text-[11px] text-cyan-300/80">Global edge sync</div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
                  <div className="text-xs text-zinc-400">WebRTC Audio/Video Jitter</div>
                  <div className="mt-2 font-mono text-4xl font-black text-white">&lt; 12 ms</div>
                  <div className="mt-1 text-[11px] text-zinc-400">Peer-to-peer browser calling</div>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center">
                  <div className="text-xs text-emerald-300">Presence & Typing Status</div>
                  <div className="mt-2 font-mono text-4xl font-black text-emerald-400">Instant</div>
                  <div className="mt-1 text-[11px] text-emerald-300/80">Real-time user state tracking</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
