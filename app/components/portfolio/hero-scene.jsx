"use client";

import React, { useEffect, useRef, useState } from "react";

// Precomputed 12 vertices of an icosahedron (normalized)
const PHI = (1 + Math.sqrt(5)) / 2;
const ICO_VERTICES = [
  [-1,  PHI, 0], [ 1,  PHI, 0], [-1, -PHI, 0], [ 1, -PHI, 0],
  [ 0, -1,  PHI], [ 0,  1,  PHI], [ 0, -1, -PHI], [ 0,  1, -PHI],
  [ PHI, 0, -1], [ PHI, 0,  1], [-PHI, 0, -1], [-PHI, 0,  1],
].map(([x, y, z]) => {
  const len = Math.hypot(x, y, z);
  return [x / len, y / len, z / len];
});

// 30 edges connecting adjacent vertices (distance ~ 1.0515)
const ICO_EDGES = [];
for (let i = 0; i < ICO_VERTICES.length; i++) {
  for (let j = i + 1; j < ICO_VERTICES.length; j++) {
    const dx = ICO_VERTICES[i][0] - ICO_VERTICES[j][0];
    const dy = ICO_VERTICES[i][1] - ICO_VERTICES[j][1];
    const dz = ICO_VERTICES[i][2] - ICO_VERTICES[j][2];
    const dist = Math.hypot(dx, dy, dz);
    if (dist < 1.15) {
      ICO_EDGES.push([i, j]);
    }
  }
}

// Generate background star particles
const PARTICLES = Array.from({ length: 65 }, () => ({
  x: (Math.random() - 0.5) * 450,
  y: (Math.random() - 0.5) * 450,
  z: (Math.random() - 0.5) * 350,
  size: Math.random() * 1.8 + 0.6,
  speed: Math.random() * 0.008 + 0.004,
  pulse: Math.random() * Math.PI * 2,
}));

export default function HeroScene({ activeSkill, onActiveChange, lotmMode = false }) {
  const canvasRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const rotRef = useRef({ x: 0.35, y: 0.45, vx: 0.003, vy: 0.006 });
  const mouseRef = useRef({ x: 0, y: 0, down: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const onMouseDown = (e) => {
      mouseRef.current.down = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
      setIsInteracting(true);
    };

    const onMouseMove = (e) => {
      if (!mouseRef.current.down) return;
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x += dy * 0.008;
      rotRef.current.vx = dy * 0.001;
      rotRef.current.vy = dx * 0.001;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const onMouseUp = () => {
      mouseRef.current.down = false;
      setIsInteracting(false);
    };

    const targetEl = canvas.parentElement || canvas;
    targetEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support
    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.down = true;
        mouseRef.current.lastX = e.touches[0].clientX;
        mouseRef.current.lastY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!mouseRef.current.down || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - mouseRef.current.lastX;
      const dy = e.touches[0].clientY - mouseRef.current.lastY;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x += dy * 0.008;
      mouseRef.current.lastX = e.touches[0].clientX;
      mouseRef.current.lastY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      mouseRef.current.down = false;
    };

    targetEl.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Animation loop: runs immediately on frame 0
    let t = 0;
    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.32;

      // Natural damping & rotation
      if (!mouseRef.current.down) {
        rotRef.current.x += rotRef.current.vx;
        rotRef.current.y += rotRef.current.vy;
        rotRef.current.vx *= 0.98;
        rotRef.current.vy *= 0.98;
        rotRef.current.x += 0.002;
        rotRef.current.y += 0.005;
      }

      const rx = rotRef.current.x;
      const ry = rotRef.current.y;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // Rotate 3D vector helper
      const project = (x, y, z) => {
        // Rotate Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective
        const fov = 480;
        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
        };
      };

      // 1. Draw Starfield Particles
      for (let p of PARTICLES) {
        p.pulse += p.speed;
        const pp = project(p.x, p.y, p.z);
        if (pp.z > -400) {
          const alpha = (0.25 + 0.25 * Math.sin(p.pulse)) * pp.scale;
          ctx.fillStyle = lotmMode ? `rgba(240, 184, 91, ${alpha})` : `rgba(0, 245, 160, ${alpha})`;
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, p.size * pp.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Dynamic Pulsing Core
      const pulseScale = 1 + Math.sin(t * 2.2) * 0.04;
      const currentRadius = baseRadius * pulseScale;

      // Transform Icosahedron Vertices
      const projectedVertices = ICO_VERTICES.map(([vx, vy, vz]) =>
        project(vx * currentRadius, vy * currentRadius, vz * currentRadius)
      );

      // 3. Draw Icosahedron Edges with Glowing Shader Effect
      ctx.lineWidth = 1.35;
      for (const [i, j] of ICO_EDGES) {
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.85, 0.45 + (avgZ / currentRadius) * 0.35));

        const edgeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        if (lotmMode) {
          edgeGrad.addColorStop(0, `rgba(212, 154, 63, ${alpha})`);
          edgeGrad.addColorStop(1, `rgba(240, 184, 91, ${alpha * 1.2})`);
        } else {
          edgeGrad.addColorStop(0, `rgba(0, 217, 245, ${alpha})`);
          edgeGrad.addColorStop(1, `rgba(0, 245, 160, ${alpha * 1.2})`);
        }

        ctx.strokeStyle = edgeGrad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // 4. Draw Core Glow & Nodes
      for (const p of projectedVertices) {
        const nodeAlpha = Math.max(0.2, Math.min(1, 0.5 + (p.z / currentRadius) * 0.45));
        ctx.fillStyle = lotmMode
          ? `rgba(240, 184, 91, ${nodeAlpha})`
          : `rgba(0, 245, 160, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw Orbital Rings
      const ringSteps = 64;
      const drawRing = (radiusX, radiusZ, tilt, color, widthLine = 1) => {
        ctx.beginPath();
        ctx.lineWidth = widthLine;
        ctx.strokeStyle = color;
        for (let i = 0; i <= ringSteps; i++) {
          const theta = (i / ringSteps) * Math.PI * 2;
          const rx0 = Math.cos(theta) * radiusX;
          const rz0 = Math.sin(theta) * radiusZ;
          // Tilt along X/Z
          const rx = rx0;
          const ry = rz0 * Math.sin(tilt);
          const rz = rz0 * Math.cos(tilt);
          const pt = project(rx, ry, rz);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      };

      const ringColor1 = lotmMode ? "rgba(212, 154, 63, 0.35)" : "rgba(0, 217, 245, 0.35)";
      const ringColor2 = lotmMode ? "rgba(240, 184, 91, 0.25)" : "rgba(0, 245, 160, 0.25)";

      drawRing(currentRadius * 1.45, currentRadius * 1.45, 0.45, ringColor1, 1.2);
      drawRing(currentRadius * 1.25, currentRadius * 1.25, -0.65, ringColor2, 0.9);

      // Central Quantum Core Node
      const centerGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, currentRadius * 0.4);
      centerGrad.addColorStop(0, lotmMode ? "rgba(240, 184, 91, 0.35)" : "rgba(0, 245, 160, 0.35)");
      centerGrad.addColorStop(0.5, lotmMode ? "rgba(212, 154, 63, 0.12)" : "rgba(0, 217, 245, 0.12)");
      centerGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      targetEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      targetEl.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [lotmMode]);

  return (
    <div className="relative h-full w-full cursor-grab active:cursor-grabbing select-none overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full block" />
      {activeSkill && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-cyan-400/30 bg-[#050608]/90 px-3.5 py-1 text-center font-mono text-xs text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,217,245,0.2)]">
          Focused: {activeSkill}
        </div>
      )}
    </div>
  );
}
