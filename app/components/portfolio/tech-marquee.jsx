"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function MarqueeTrack({ items, reverse = false }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!trackRef.current || !wrapperRef.current) {
      return;
    }

    const animation = gsap.to(trackRef.current, {
      xPercent: reverse ? 50 : -50,
      ease: "none",
      duration: reverse ? 28 : 24,
      repeat: -1,
    });

    const wrapper = wrapperRef.current;
    const pause = () => animation.pause();
    const play = () => animation.resume();

    wrapper.addEventListener("mouseenter", pause);
    wrapper.addEventListener("mouseleave", play);

    return () => {
      wrapper.removeEventListener("mouseenter", pause);
      wrapper.removeEventListener("mouseleave", play);
      animation.kill();
    };
  }, [reverse]);

  const repeated = [...items, ...items];

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden rounded-full border border-white/70 bg-white/60 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur"
    >
      <div ref={trackRef} className="flex w-max min-w-full shrink-0 gap-3">
        {repeated.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm text-slate-700"
          >
            <span className="font-medium">{item.name}</span>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee({ items }) {
  const midpoint = Math.ceil(items.length / 2);
  const firstRow = items.slice(0, midpoint);
  const secondRow = items.slice(midpoint);

  return (
    <div className="space-y-3">
      <MarqueeTrack items={firstRow} />
      <MarqueeTrack items={secondRow} reverse />
    </div>
  );
}
