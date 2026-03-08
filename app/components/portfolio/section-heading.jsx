"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "../../utils/cn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const { resolvedTheme } = useTheme();
  const isLotm = resolvedTheme === "lotm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p
        className={cn(
          "mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-teal-700",
          isLotm && "text-[#f0b85b]"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-hover-float text-pretty font-(family-name:--font-space-grotesk) text-3xl text-slate-900 sm:text-4xl md:text-5xl",
          isLotm && "font-(family-name:--font-lotm-heading) text-[#eef6ff]"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-5 text-base leading-7 text-slate-600 sm:text-lg",
          isLotm && "font-(family-name:--font-lotm-body) text-[#b9cff2]"
        )}
      >
        {description}
      </p>
    </motion.div>
  );
}
