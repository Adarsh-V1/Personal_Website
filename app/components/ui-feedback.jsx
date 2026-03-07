"use client";

import { useEffect } from "react";

const canUseAudio =
  typeof window !== "undefined" &&
  ("AudioContext" in window || "webkitAudioContext" in window);

export default function UiFeedback() {
  useEffect(() => {
    let audioContext = null;

    const playClickSound = () => {
      if (!canUseAudio) {
        return;
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;

      if (!audioContext) {
        audioContext = new AudioCtx();
      }

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        780,
        audioContext.currentTime + 0.06
      );

      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.14);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
    };

    const spawnPulse = (x, y) => {
      const pulse = document.createElement("span");

      pulse.style.position = "fixed";
      pulse.style.left = `${x}px`;
      pulse.style.top = `${y}px`;
      pulse.style.width = "12px";
      pulse.style.height = "12px";
      pulse.style.borderRadius = "999px";
      pulse.style.pointerEvents = "none";
      pulse.style.zIndex = "999";
      pulse.style.transform = "translate(-50%, -50%) scale(0.6)";
      pulse.style.background =
        "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(45,212,191,0.7) 45%, rgba(45,212,191,0) 72%)";
      pulse.style.boxShadow = "0 0 0 1px rgba(45,212,191,0.22)";
      pulse.style.transition =
        "transform 360ms cubic-bezier(0.22, 1, 0.36, 1), opacity 360ms ease";
      pulse.style.opacity = "0.9";

      document.body.appendChild(pulse);

      requestAnimationFrame(() => {
        pulse.style.transform = "translate(-50%, -50%) scale(7)";
        pulse.style.opacity = "0";
      });

      window.setTimeout(() => {
        pulse.remove();
      }, 380);
    };

    const handleClick = (event) => {
      const clickable = event.target.closest("[data-ui-feedback]");

      if (!clickable || clickable.hasAttribute("disabled")) {
        return;
      }

      spawnPulse(event.clientX, event.clientY);
      playClickSound();
    };

    document.addEventListener("click", handleClick, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick);
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
      }
    };
  }, []);

  return null;
}
