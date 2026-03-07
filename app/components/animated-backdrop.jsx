"use client";

import React from "react";

const variantMap = {
  contactPage: {
    primary: "rgba(34, 211, 238, 0.22)",
    secondary: "rgba(168, 85, 247, 0.18)",
    tertiary: "rgba(14, 165, 233, 0.12)",
  },
  servicesPage: {
    primary: "rgba(34, 197, 94, 0.16)",
    secondary: "rgba(6, 182, 212, 0.2)",
    tertiary: "rgba(245, 158, 11, 0.12)",
  },
  default: {
    primary: "rgba(45, 212, 191, 0.18)",
    secondary: "rgba(59, 130, 246, 0.16)",
    tertiary: "rgba(249, 115, 22, 0.1)",
  },
};

export default function AnimatedBackdrop({ variant = "default" }) {
  const palette = variantMap[variant] ?? variantMap.default;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background: `
            radial-gradient(circle at 16% 18%, ${palette.primary}, transparent 24%),
            radial-gradient(circle at 84% 16%, ${palette.secondary}, transparent 22%),
            radial-gradient(circle at 52% 78%, ${palette.tertiary}, transparent 24%),
            linear-gradient(180deg, rgba(2, 6, 23, 0.94) 0%, rgba(2, 6, 23, 1) 100%)
          `,
        }}
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] opacity-[0.14]"
        style={{ backgroundSize: "72px 72px" }}
      />

      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="absolute -right-16 top-1/4 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />
    </div>
  );
}