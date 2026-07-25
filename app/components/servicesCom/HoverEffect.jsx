"use client";
import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const HoverEffect = ({ items, className, onItemClick }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid bg-transparent w-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-28  lg:py-52 md:py-32 px-10 lg:px-44  ", className)}>
      {items.map((item, idx) => (
        <button
          key={item?.title ?? idx}
          onClick={() => onItemClick(item.title)}
          className="relative group block p-[4px] h-full w-full text-left"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-200/50 dark:bg-[#c8861f]/15 border border-slate-300/40 dark:border-[#f0b85b]/30 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </button>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "  item-card theme-card theme-text  rounded-3xl h-full p-4 overflow-hidden dark:bg-black  border border-neutral-700 dark:border-white/[0.3] dark:group-hover:border-slate-700 relative z-20 hover:scale-[1.01] transition-transform duration-500 ease-out cursor-pointer" ,
        className
      )}
    >
      <div className="relative z-0">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("dark:text-zinc-100 theme-text font-bold text-lg tracking-wide mt-3", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p className={cn("mt-5 dark:text-zinc-400 tracking-wide leading-relaxed text-md", className)}>
      {children}
    </p>
  );
};
