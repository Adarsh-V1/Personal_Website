"use client";

import { motion } from "motion/react";
import { cn } from "../../utils/cn";

export default function InteractivePanel({
  children,
  className,
  intensity = 320,
  glow = "rgba(45, 212, 191, 0.16)",
  ...props
}) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn("group relative overflow-hidden", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--panel-glow),transparent_62%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ "--panel-glow": glow, "--panel-intensity": `${intensity}px` }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
