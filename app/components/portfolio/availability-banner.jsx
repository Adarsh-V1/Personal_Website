"use client";

import { useEffect, useState } from "react";
import { Clock, Globe, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function AvailabilityBanner({ onOpenEstimator }) {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900/90 border-y border-teal-500/20 py-2.5 px-4 backdrop-blur-md text-white text-xs sm:text-sm font-body">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-center sm:text-left">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-emerald-400 font-semibold">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for Q3 Contract Work
          </div>

          {/* Timezone Badge */}
          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs">
            <Clock className="size-3.5 text-teal-400" />
            <span>IST (UTC+5:30):</span>
            <span className="font-bold text-white min-w-[75px]">
              {timeString || "08:35 AM"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenEstimator && (
            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 px-3.5 py-1 text-xs font-medium text-teal-300 transition"
            >
              <Sparkles className="size-3.5" />
              Estimate Project Budget
              <ArrowRight className="size-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
