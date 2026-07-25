"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App Error Boundary caught:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-24 text-white font-body">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center gap-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 border border-rose-500/30 px-3.5 py-1 text-xs font-semibold text-rose-400">
          500 Internal Error Caught
        </div>

        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-100">
          Something went wrong
        </h1>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
          {error?.message || "An unexpected error occurred while loading this page. The server has logged this issue."}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition shadow-lg"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-700 hover:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
