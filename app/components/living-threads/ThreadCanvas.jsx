'use client';

import React, { useEffect, useRef } from 'react';
import { THEME_COLORS } from './data';

export default function ThreadCanvas({
  world,
  threads,
  exploredMap = {},
  activeNodeId = null,
  lightingMode = 'cyber-void',
  theme = 'dark',
  zeroGravity = false,
  mousePos = { x: 0, y: 0 },
  warpTarget = null,
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const count = 65;
    const particles = [];
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.1,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.6 + 0.25,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (world) world.resize(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.016;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // ── 1. ATMOSPHERIC LIGHTING & NEBULA BACKGROUND ──────
      if (lightingMode === 'light') {
        // Luxury Editorial Beige / Warm Architectural Paper
        ctx.fillStyle = '#f7f4ee';
        ctx.fillRect(0, 0, w, h);

        // Subtle tactile paper micro-dots
        ctx.fillStyle = 'rgba(90, 70, 45, 0.055)';
        const dotStep = 32;
        for (let x = 16; x < w; x += dotStep) {
          for (let y = 16; y < h; y += dotStep) {
            ctx.beginPath();
            ctx.arc(x, y, 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Warm ambient sunlit gradient (golden ivory warmth)
        const sunGrad = ctx.createRadialGradient(w * 0.25, 80, 40, w * 0.35, 120, Math.max(w, h) * 0.9);
        sunGrad.addColorStop(0, 'rgba(255, 238, 205, 0.45)');
        sunGrad.addColorStop(0.5, 'rgba(245, 230, 210, 0.20)');
        sunGrad.addColorStop(1, 'rgba(247, 244, 238, 0)');
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, w, h);
      } else if (lightingMode === 'blueprint') {
        ctx.fillStyle = '#04111d';
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        ctx.beginPath();
        for (let x = 0; x < w; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let y = 0; y < h; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
        ctx.strokeRect(20, 20, 30, 30);
        ctx.strokeRect(w - 50, 20, 30, 30);
        ctx.strokeRect(20, h - 50, 30, 30);
        ctx.strokeRect(w - 50, h - 50, 30, 30);
      } else if (lightingMode === 'synthwave') {
        ctx.fillStyle = '#0a0118';
        ctx.fillRect(0, 0, w, h);

        const radGrad = ctx.createRadialGradient(w * 0.5, h * 0.65, 50, w * 0.5, h * 0.65, w * 0.7);
        radGrad.addColorStop(0, 'rgba(236, 72, 153, 0.18)');
        radGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
        radGrad.addColorStop(1, 'rgba(10, 1, 24, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const horizon = h * 0.68;
        for (let y = horizon; y < h; y += (y - horizon) * 0.35 + 8) {
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        for (let x = -w * 0.2; x <= w * 1.2; x += 70) {
          ctx.moveTo(w * 0.5, horizon);
          ctx.lineTo(x, h);
        }
        ctx.stroke();
        ctx.restore();
      } else if (lightingMode === 'matrix') {
        ctx.fillStyle = '#021208';
        ctx.fillRect(0, 0, w, h);

        const radGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 40, w * 0.5, h * 0.5, Math.max(w, h) * 0.6);
        radGrad.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
        radGrad.addColorStop(0.7, 'rgba(5, 46, 22, 0.04)');
        radGrad.addColorStop(1, 'rgba(2, 18, 8, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(16, 185, 129, 0.025)';
        for (let y = 0; y < h; y += 4) {
          ctx.fillRect(0, y, w, 1);
        }
      } else if (lightingMode === 'lo-fi-lamp') {
        const lampX = w * 0.82;
        const lampY = 60;
        const lampGrad = ctx.createRadialGradient(lampX, lampY, 20, lampX, lampY, Math.max(w, h));
        lampGrad.addColorStop(0, 'rgba(255, 214, 150, 0.22)');
        lampGrad.addColorStop(0.3, 'rgba(210, 140, 70, 0.10)');
        lampGrad.addColorStop(0.8, 'rgba(20, 16, 14, 0.0)');
        ctx.fillStyle = lampGrad;
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.fillStyle = '#ffdfa0';
        ctx.shadowColor = '#ffb347';
        ctx.shadowBlur = 40;
        ctx.beginPath();
        ctx.arc(lampX, 10, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        // Cyber-Void
        const radGrad = ctx.createRadialGradient(
          w * 0.5 + (mousePos.x - w * 0.5) * 0.08,
          h * 0.45 + (mousePos.y - h * 0.5) * 0.08,
          40,
          w * 0.5,
          h * 0.5,
          Math.max(w, h) * 0.8
        );
        if (theme === 'lotm' || lightingMode === 'lotm') {
          radGrad.addColorStop(0, 'rgba(240, 184, 91, 0.11)');
          radGrad.addColorStop(0.4, 'rgba(120, 70, 20, 0.06)');
          radGrad.addColorStop(1, 'rgba(2, 5, 10, 0)');
        } else {
          radGrad.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
          radGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.05)');
          radGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.03)');
          radGrad.addColorStop(1, 'rgba(5, 6, 8, 0)');
        }
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // ── 2. PARTICLES & HYPERSPACE WARP STREAKS ──────────
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (warpTarget) {
          const dx = warpTarget.x - p.x;
          const dy = warpTarget.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          const speed = Math.min(18, 1200 / dist);
          const nx = (dx / dist) * speed;
          const ny = (dy / dist) * speed;

          ctx.save();
          ctx.strokeStyle =
            lightingMode === 'light'
              ? '#2563eb'
              : lightingMode === 'synthwave'
              ? '#ec4899'
              : '#00f0ff';
          ctx.shadowColor = lightingMode === 'light' ? '#2563eb' : '#00f0ff';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + nx * 3.5, p.y + ny * 3.5);
          ctx.stroke();
          ctx.restore();

          p.x += nx;
          p.y += ny;
        } else {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          const pulse = Math.sin(time * 3 + p.pulseOffset) * 0.35 + 0.65;
          const currentAlpha = p.alpha * pulse;

          ctx.save();
          ctx.fillStyle =
            lightingMode === 'light'
              ? `rgba(90, 70, 45, ${currentAlpha * 0.45})`
              : lightingMode === 'synthwave'
              ? `rgba(244, 114, 182, ${currentAlpha * 0.7})`
              : lightingMode === 'matrix'
              ? `rgba(52, 211, 153, ${currentAlpha * 0.7})`
              : lightingMode === 'lo-fi-lamp'
              ? `rgba(255, 210, 150, ${currentAlpha * 0.65})`
              : lightingMode === 'lotm' || theme === 'lotm'
              ? `rgba(240, 184, 91, ${currentAlpha * 0.75})`
              : `rgba(255, 255, 255, ${currentAlpha * 0.55})`;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // (Box-to-box cross-lines removed entirely per user request: "there shall only be top string okay .. not one box connecting to another box")

      // ── 3. RENDER VERLET TOP STRINGS ONLY ─────────────────
      // If zeroGravity is enabled: DO NOT DRAW ANY STRINGS AT ALL per user request!
      if (!zeroGravity && threads && threads.length > 0) {
        for (const thread of threads) {
          const { anchor, node, points, sticks } = thread;
          if (!points || points.length < 2) continue;

          const isExplored = node?.id && exploredMap[node.id];
          const isActive = node?.id === activeNodeId;
          const tension = world ? world.getThreadTension(sticks) : 0;

          let strokeColor;
          let glowColor;
          let lineWidth = 2 + tension * 2.5;

          if (isExplored) {
            strokeColor =
              lightingMode === 'light'
                ? '#b45309'
                : lightingMode === 'synthwave'
                ? '#f472b6'
                : '#fbbf24';
            glowColor =
              lightingMode === 'light'
                ? 'rgba(180, 83, 9, 0.45)'
                : lightingMode === 'synthwave'
                ? 'rgba(244,114,182,0.8)'
                : 'rgba(251,191,36,0.85)';
            lineWidth += 0.8;
          } else if (isActive) {
            strokeColor = lightingMode === 'light' ? '#3d2f21' : '#ffffff';
            glowColor = lightingMode === 'light' ? 'rgba(61,47,33,0.5)' : 'rgba(255,255,255,0.95)';
            lineWidth += 1.2;
          } else if (lightingMode === 'light') {
            strokeColor = '#9c7953';
            glowColor = 'rgba(156, 121, 83, 0.35)';
          } else if (lightingMode === 'synthwave') {
            strokeColor = '#ec4899';
            glowColor = 'rgba(236, 72, 153, 0.45)';
          } else if (lightingMode === 'matrix') {
            strokeColor = '#10b981';
            glowColor = 'rgba(16, 185, 129, 0.45)';
          } else if (lightingMode === 'blueprint') {
            strokeColor = '#00f0ff';
            glowColor = 'rgba(0, 240, 255, 0.4)';
          } else if (lightingMode === 'lo-fi-lamp') {
            strokeColor = '#ffb347';
            glowColor = 'rgba(255, 179, 71, 0.35)';
          } else if (lightingMode === 'lotm' || theme === 'lotm') {
            strokeColor = '#d49a3f';
            glowColor = 'rgba(212, 154, 63, 0.4)';
          } else {
            strokeColor = 'rgba(0, 240, 255, 0.75)';
            glowColor = 'rgba(0, 240, 255, 0.4)';
          }

          const blurAmount = 8 + tension * 20;

          // Anchor Socket on the ceiling
          ctx.save();
          ctx.fillStyle = strokeColor;
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = blurAmount;
          ctx.beginPath();
          ctx.arc(anchor.x, anchor.y, 4.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = glowColor;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(anchor.x, anchor.y, 9, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Single top smooth Bezier curve from ceiling to box
          ctx.save();
          ctx.strokeStyle = strokeColor;
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = blurAmount;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
          const lastPoint = points[points.length - 1];
          ctx.lineTo(lastPoint.x, lastPoint.y);
          ctx.stroke();

          // Luminous core line
          ctx.strokeStyle = lightingMode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.65)';
          ctx.lineWidth = Math.max(1, lineWidth * 0.35);
          ctx.shadowBlur = 4;
          ctx.stroke();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [world, threads, exploredMap, activeNodeId, lightingMode, theme, zeroGravity, mousePos, warpTarget]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 block"
    />
  );
}
