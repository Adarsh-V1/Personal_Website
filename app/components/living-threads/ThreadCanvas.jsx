'use client';

import React, { useEffect, useRef } from 'react';
import { QUESTIONS } from './data';

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
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const count = isMobile ? 26 : 70;
    const particles = [];
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.25,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
        ctx.fillStyle = '#f7f4ee';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(90, 70, 45, 0.055)';
        const dotStep = 32;
        for (let x = 16; x < w; x += dotStep) {
          for (let y = 16; y < h; y += dotStep) {
            ctx.beginPath();
            ctx.arc(x, y, 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

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
      } else if (lightingMode === 'synthwave') {
        ctx.fillStyle = '#0a0118';
        ctx.fillRect(0, 0, w, h);

        const radGrad = ctx.createRadialGradient(w * 0.5, h * 0.65, 50, w * 0.5, h * 0.65, w * 0.7);
        radGrad.addColorStop(0, 'rgba(236, 72, 153, 0.18)');
        radGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
        radGrad.addColorStop(1, 'rgba(10, 1, 24, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);
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
        radGrad.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
        radGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.05)');
        radGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.03)');
        radGrad.addColorStop(1, 'rgba(5, 6, 8, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // ── 2. MOLECULES & PARTICLES THAT REACT TO FLOATING BOXES & ROPES ──
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
          ctx.strokeStyle = '#00f0ff';
          ctx.shadowColor = '#00f0ff';
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
          // Reactive molecular repulsion from floating question nodes & ropes!
          if (threads && threads.length > 0) {
            for (let t = 0; t < threads.length; t++) {
              const th = threads[t];
              const nodePt = th.node;
              if (nodePt) {
                const ndx = p.x - nodePt.x;
                const ndy = p.y - nodePt.y;
                const ndist = Math.hypot(ndx, ndy) || 1;
                if (ndist < 140) {
                  const repulseForce = (140 - ndist) / 140 * 1.5;
                  p.vx += (ndx / ndist) * repulseForce * 0.3;
                  p.vy += (ndy / ndist) * repulseForce * 0.3;
                }
              }

              // Also react to ropes when not in zero-g
              if (!zeroGravity && th.points) {
                const mid = th.points[Math.floor(th.points.length / 2)];
                if (mid) {
                  const rdx = p.x - mid.x;
                  const rdy = p.y - mid.y;
                  const rdist = Math.hypot(rdx, rdy) || 1;
                  if (rdist < 70) {
                    const rForce = (70 - rdist) / 70 * 0.8;
                    p.vx += (rdx / rdist) * rForce * 0.2;
                    p.vy += (rdy / rdist) * rForce * 0.2;
                  }
                }
              }
            }
          }

          // Damping & drift update
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.2;
          p.y += p.vy + Math.cos(time + p.pulseOffset) * 0.2;

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
              : `rgba(0, 240, 255, ${currentAlpha * 0.65})`;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── 3. RENDER VERLET TOP STRINGS — ROPE & BOX COLOR MATCH 100%! ──────
      if (!zeroGravity && threads && threads.length > 0) {
        for (const thread of threads) {
          const { anchor, node, points, sticks } = thread;
          if (!points || points.length < 2) continue;

          // Find specific question color to match the box color exactly!
          const qConfig = QUESTIONS.find((q) => q.id === node?.id);
          const baseColor = qConfig?.color || '#00f0ff';
          const isActive = node?.id === activeNodeId;
          const isExplored = node?.id && exploredMap[node.id];
          const tension = world ? world.getThreadTension(sticks) : 0;

          let strokeColor = baseColor;
          let glowColor = qConfig?.glow || `${baseColor}60`;
          let lineWidth = 2.2 + tension * 2.5;

          if (isActive) {
            strokeColor = '#ffffff';
            glowColor = baseColor;
            lineWidth += 1.5;
          } else if (isExplored) {
            lineWidth += 0.8;
            glowColor = baseColor;
          }

          const blurAmount = 8 + tension * 18;

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

          const last = points[points.length - 1];
          ctx.lineTo(last.x, last.y);
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
