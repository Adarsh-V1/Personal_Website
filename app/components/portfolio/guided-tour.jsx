"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CornerDownLeft, X } from "lucide-react";
import { Button } from "../ui/button";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function GuidedTour({
  promptOpen,
  steps,
  activeStep,
  onStart,
  onSkip,
  onClose,
  onNext,
  onPrevious,
}) {
  const [targetRect, setTargetRect] = useState(null);
  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
  const [tooltipHeight, setTooltipHeight] = useState(248);
  const tooltipRef = useRef(null);
  const currentStep = activeStep >= 0 ? steps[activeStep] : null;

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (promptOpen) {
        if (event.key === "Enter") {
          event.preventDefault();
          onStart();
        }

        if (event.key === "Escape") {
          event.preventDefault();
          onSkip();
        }

        return;
      }

      if (!currentStep) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        onNext();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        onPrevious();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentStep, onClose, onNext, onPrevious, onSkip, onStart, promptOpen]);

  useEffect(() => {
    if (!currentStep) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const target = document.getElementById(currentStep.id);

      if (!target) {
        setTargetRect(null);
        return;
      }

      setTargetRect(target.getBoundingClientRect());
    };

    const scrollToTarget = () => {
      const target = document.getElementById(currentStep.id);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    scrollToTarget();
    const measureTimer = window.setTimeout(updateRect, 420);

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      window.clearTimeout(measureTimer);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [currentStep]);

  useLayoutEffect(() => {
    if (!currentStep || !tooltipRef.current) {
      return;
    }

    const measureTooltip = () => {
      const nextHeight = tooltipRef.current?.getBoundingClientRect().height;

      if (nextHeight) {
        setTooltipHeight(nextHeight);
      }
    };

    measureTooltip();

    const frameId = window.requestAnimationFrame(measureTooltip);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [currentStep, targetRect, viewport.width, viewport.height]);

  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const screenPadding = 16;
  const tooltipGap = 18;
  const tooltipWidth = Math.min(360, viewportWidth - screenPadding * 2);
  const safeTooltipHeight = Math.min(tooltipHeight, viewportHeight - screenPadding * 2);
  const tooltipLeft = targetRect
    ? clamp(
        targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
        screenPadding,
        viewportWidth - tooltipWidth - screenPadding
      )
    : clamp((viewportWidth - tooltipWidth) / 2, screenPadding, viewportWidth - tooltipWidth - screenPadding);
  const spaceAbove = targetRect ? targetRect.top - screenPadding : 0;
  const spaceBelow = targetRect ? viewportHeight - targetRect.bottom - screenPadding : 0;
  const shouldPlaceBelow = !targetRect
    ? true
    : spaceBelow >= safeTooltipHeight + tooltipGap || spaceBelow >= spaceAbove;
  const tooltipTop = targetRect
    ? shouldPlaceBelow
      ? clamp(
          targetRect.bottom + tooltipGap,
          screenPadding,
          viewportHeight - safeTooltipHeight - screenPadding
        )
      : clamp(
          targetRect.top - safeTooltipHeight - tooltipGap,
          screenPadding,
          viewportHeight - safeTooltipHeight - screenPadding
        )
    : screenPadding * 2;
  const overlayTopHeight = targetRect ? Math.max(targetRect.top - 12, 0) : 0;
  const overlayBottomTop = targetRect ? targetRect.bottom + 12 : 0;
  const overlaySideTop = targetRect ? Math.max(targetRect.top - 12, 0) : 0;
  const overlaySideHeight = targetRect ? targetRect.height + 24 : 0;

  return (
    <>
      <AnimatePresence>
        {promptOpen ? (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="w-full max-w-md rounded-[30px] border border-white/70 bg-white/92 p-7 shadow-[0_24px_120px_rgba(15,23,42,0.18)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
                Guided Tour
              </p>
              <h3 className="mt-4 font-(family-name:--font-space-grotesk) text-2xl text-slate-900">
                Would you like a quick tour of the portfolio?
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                I&apos;ll walk through the main sections with a highlight overlay so the structure is easy to scan.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-slate-200 px-3 py-1.5">
                  <CornerDownLeft className="mr-1 inline size-3" />
                  Enter to start
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1.5">
                  Esc to skip
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={onStart}
                  className="h-11 flex-1 rounded-full bg-slate-900 px-6 text-sm text-white hover:bg-slate-800"
                >
                  Start Tour
                </Button>
                <Button
                  variant="outline"
                  onClick={onSkip}
                  className="h-11 flex-1 rounded-full border-slate-300 bg-transparent px-6 text-sm text-slate-700"
                >
                  Skip
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep && targetRect ? (
          <>
            <motion.div
              className="fixed left-0 right-0 top-0 z-82 bg-slate-950/18 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, height: overlayTopHeight }}
              style={{ height: overlayTopHeight }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-82 bg-slate-950/18 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, top: overlayBottomTop }}
              style={{ top: overlayBottomTop }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed left-0 z-82 bg-slate-950/18 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, top: overlaySideTop, width: Math.max(targetRect.left - 12, 0), height: overlaySideHeight }}
              style={{
                top: overlaySideTop,
                width: Math.max(targetRect.left - 12, 0),
                height: overlaySideHeight,
              }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed right-0 z-82 bg-slate-950/18 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                top: overlaySideTop,
                left: targetRect.right + 12,
                height: overlaySideHeight,
              }}
              style={{
                top: overlaySideTop,
                left: targetRect.right + 12,
                height: overlaySideHeight,
              }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="pointer-events-none fixed z-83 rounded-[34px] border border-white/90 bg-white/5 ring-10 ring-white/35 shadow-[0_24px_90px_rgba(15,23,42,0.18)]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{
                opacity: 1,
                scale: 1,
                top: targetRect.top - 8,
                left: targetRect.left - 8,
                width: targetRect.width + 16,
                height: targetRect.height + 16,
              }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
            />

            <motion.div
              ref={tooltipRef}
              className="fixed z-84 overflow-y-auto rounded-[28px] border border-white/90 bg-white/97 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, left: tooltipLeft, top: tooltipTop, width: tooltipWidth }}
              style={{ maxHeight: viewportHeight - screenPadding * 2 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
                    Step {activeStep + 1} / {steps.length}
                  </p>
                  <h4 className="mt-2 font-(family-name:--font-space-grotesk) text-lg text-slate-900">
                    {currentStep.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900"
                  aria-label="Close tour"
                >
                  <X className="size-4" />
                </button>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {currentStep.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-slate-200 px-3 py-1.5">
                  <ArrowLeft className="mr-1 inline size-3" />
                  Previous
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1.5">
                  <ArrowRight className="mr-1 inline size-3" />
                  Next
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1.5">
                  Esc close
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={onPrevious}
                  disabled={activeStep === 0}
                  className="rounded-full border-slate-300 bg-transparent px-4 text-slate-700"
                >
                  Previous
                </Button>
                <Button
                  onClick={onNext}
                  className="rounded-full bg-slate-900 px-5 text-white hover:bg-slate-800"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
