'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { PhysicsWorld, createThread } from './physics';
import { QUESTIONS, THEME_MODES } from './data';
import { Sound, LoFiRadio } from './sound';
import ThreadCanvas from './ThreadCanvas';
import QuestionNode from './QuestionNode';
import WhoAmIModal from './WhoAmIModal';
import ProjectsModal from './ProjectsModal';
import JourneyModal from './JourneyModal';
import GoalsModal from './GoalsModal';
import HobbiesModal from './HobbiesModal';
import ExplainModal from './ExplainModal';
import EasterEggModal from './EasterEggModal';
import BizarreQuestionsModal from './BizarreQuestionsModal';
import HUD from './HUD';
import PullCord from './PullCord';
import RecruiterView from './RecruiterView';
import ProgressTracker from './ProgressTracker';

function computeNodePlacement(q, idx, w, h) {
  if (w < 640) {
    // 2 Staggered Alternating Columns on Mobile (Zero collision, zero card bunching!)
    const col = idx % 2; // 0 (left) or 1 (right)
    const row = Math.floor(idx / 2); // 0, 1, 2, 3, 4, 5
    const totalRows = Math.ceil(QUESTIONS.length / 2);
    const anchorX = col === 0 ? w * 0.27 : w * 0.73;
    const anchorY = -8;
    const nodeX = col === 0 ? w * 0.27 : w * 0.73;
    const rowProgress = (row + (col === 1 ? 0.45 : 0)) / (totalRows + 0.2);
    const nodeY = h * 0.13 + rowProgress * (h * 0.70);
    const segments = 4 + (idx % 2);
    return { anchorX, anchorY, nodeX, nodeY, segments };
  } else if (w < 1024) {
    // 3 Columns on Tablet
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const totalRows = Math.ceil(QUESTIONS.length / 3);
    const anchorX = ((col + 0.5) / 3) * w;
    const anchorY = -8;
    const nodeX = anchorX;
    const nodeY = h * 0.16 + ((row + (col % 2) * 0.25) / (totalRows + 0.2)) * (h * 0.65);
    return { anchorX, anchorY, nodeX, nodeY, segments: 6 };
  } else {
    // Desktop Constellation
    return {
      anchorX: q.anchorRatio.x * w,
      anchorY: q.anchorRatio.y * h,
      nodeX: q.nodeRatio.x * w,
      nodeY: q.nodeRatio.y * h,
      segments: q.segments,
    };
  }
}

export default function LivingThreadsCanvas() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 7 Themes: 'cyber-void', 'light', 'lo-fi-lamp', 'blueprint', 'synthwave', 'matrix', 'lotm'
  const [lightingMode, setLightingMode] = useState('cyber-void');
  const [zeroGravity, setZeroGravity] = useState(false);

  // Active open modal
  const [activeModalId, setActiveModalId] = useState(null);

  // Warp streak target coordinates for hyperspace warp effect
  const [warpTarget, setWarpTarget] = useState(null);

  // Recruiter view overlay
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  // Explored question map
  const [exploredMap, setExploredMap] = useState({});

  // Mouse coordinates for parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Physics engine & DOM node refs for direct 60/120fps transforms
  const worldRef = useRef(null);
  const threadsRef = useRef([]);
  const nodeElementsRef = useRef({});

  const registerNodeRef = useCallback((id, el) => {
    nodeElementsRef.current[id] = el;
  }, []);

  // Initialize physics world & threads on mount
  useEffect(() => {
    setMounted(true);
    const w = window.innerWidth || 1200;
    const h = window.innerHeight || 800;

    const world = new PhysicsWorld({
      width: w,
      height: h,
      gravity: 0.18,
      damping: 0.988,
    });
    worldRef.current = world;

    const threads = QUESTIONS.map((q, idx) => {
      const coords = computeNodePlacement(q, idx, w, h);
      return createThread(world, coords.anchorX, coords.anchorY, coords.nodeX, coords.nodeY, coords.segments, q.id, idx);
    });
    threadsRef.current = threads;

    // Direct 60/120fps Animation Loop with infinite gentle harmonic sway
    let animId;
    let simTime = 0;
    const updatePhysics = () => {
      simTime += 0.016;
      world.zeroGravity = zeroGravity;
      world.update(simTime);

      // Direct DOM transformation with natural pendulum tilt
      for (let i = 0; i < threads.length; i++) {
        const thread = threads[i];
        const nodeId = thread.node?.id;
        const el = nodeElementsRef.current[nodeId];
        if (el && thread.node) {
          const vx = thread.node.x - thread.node.oldX;
          const tilt = Math.max(-8, Math.min(8, vx * 2.2));
          el.style.transform = `translate3d(${thread.node.x}px, ${thread.node.y}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
        }
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      world.resize(newW, newH);

      // Smoothly update anchor points on screen orientation/size change
      for (let i = 0; i < threads.length; i++) {
        const thread = threads[i];
        const q = QUESTIONS[i];
        if (thread && thread.anchor && q) {
          const coords = computeNodePlacement(q, i, newW, newH);
          thread.anchor.baseX = coords.anchorX;
          thread.anchor.baseY = coords.anchorY;
          thread.anchor.x = coords.anchorX;
          thread.anchor.y = coords.anchorY;
          thread.anchor.oldX = coords.anchorX;
          thread.anchor.oldY = coords.anchorY;
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [zeroGravity]);

  // Pointer drag listeners with zero latency
  const handleNodeDragStart = useCallback((point, clientX, clientY) => {
    if (!worldRef.current) return;
    worldRef.current.startDrag(point, clientX, clientY);
  }, []);

  const handleNodeDragMove = useCallback((clientX, clientY) => {
    if (!worldRef.current) return;
    worldRef.current.moveDrag(clientX, clientY);
  }, []);

  const handleNodeDragEnd = useCallback(() => {
    if (!worldRef.current) return;
    worldRef.current.endDrag();
  }, []);

  const handlePointerMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerDown = useCallback(() => {
    Sound.init();
    LoFiRadio.autoStartOnGesture();
  }, []);

  // Cycle through 7 lighting modes
  const handleCycleLightingMode = useCallback(() => {
    setLightingMode((prev) => {
      const modes = ['cyber-void', 'light', 'lo-fi-lamp', 'blueprint', 'synthwave', 'matrix', 'lotm'];
      const currentIdx = modes.indexOf(prev);
      const nextIdx = (currentIdx + 1) % modes.length;
      return modes[nextIdx];
    });
  }, []);

  // Open modal with particle hyperspace warp effect
  const handleOpenModal = useCallback((nodeData, physicsPoint) => {
    if (physicsPoint) {
      setWarpTarget({ x: physicsPoint.x, y: physicsPoint.y });
    }

    setExploredMap((prev) => {
      if (!prev[nodeData.id]) {
        Sound.explore();
        return { ...prev, [nodeData.id]: true };
      }
      return prev;
    });

    setTimeout(() => {
      setActiveModalId(nodeData.id);
      setWarpTarget(null);
    }, 220);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModalId(null);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#050608] flex items-center justify-center font-mono text-cyan-400">
        INITIALIZING LIVING THREADS...
      </div>
    );
  }

  const exploredCount = Object.keys(exploredMap).filter((k) => exploredMap[k]).length;
  const isBizarreQuestion = ['why-hate-software', 'biggest-mistake', 'unknown-stack', 'turing-test'].includes(activeModalId);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`fixed inset-0 w-screen h-screen overflow-hidden select-none transition-colors duration-700
        ${lightingMode === 'light' ? 'bg-[#f7f4ee]' : ''}
        ${lightingMode === 'blueprint' ? 'bg-[#04111d]' : ''}
        ${lightingMode === 'lo-fi-lamp' ? 'bg-[#16120e]' : ''}
        ${lightingMode === 'synthwave' ? 'bg-[#0a0118]' : ''}
        ${lightingMode === 'matrix' ? 'bg-[#021208]' : ''}
        ${lightingMode === 'lotm' ? 'bg-[#02050a]' : ''}
        ${lightingMode === 'cyber-void' ? 'bg-[#050608]' : ''}
      `}
    >
      {/* 1. Canvas Layer: Verlet Threads & Drifting Particles */}
      <ThreadCanvas
        world={worldRef.current}
        threads={threadsRef.current}
        exploredMap={exploredMap}
        activeNodeId={activeModalId}
        lightingMode={lightingMode}
        theme={theme}
        zeroGravity={zeroGravity}
        mousePos={mousePos}
        warpTarget={warpTarget}
      />

      {/* 2. Floating Draggable Question Nodes (Direct 60/120fps Transform Sync) */}
      <div className="absolute inset-0 pointer-events-auto">
        {threadsRef.current.map((thread) => {
          const qData = QUESTIONS.find((q) => q.id === thread.node?.id);
          if (!qData) return null;

          return (
            <QuestionNode
              key={qData.id}
              nodeData={qData}
              physicsPoint={thread.node}
              isExplored={!!exploredMap[qData.id]}
              isActive={activeModalId === qData.id}
              onOpenModal={handleOpenModal}
              onDragStart={handleNodeDragStart}
              onDragMove={handleNodeDragMove}
              onDragEnd={handleNodeDragEnd}
              zeroGravity={zeroGravity}
              lightingMode={lightingMode}
              registerNodeRef={registerNodeRef}
            />
          );
        })}
      </div>

      {/* 2.5 Dedicated Top-Right Zero-G vs Hanging Mode Switch Button */}
      <div className="fixed top-3 sm:top-5 right-3 sm:right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            if (!zeroGravity) {
              Sound.glitch();
              setZeroGravity(true);
            } else {
              Sound.themeSwitch();
              setZeroGravity(false);
            }
          }}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer shadow-lg flex items-center gap-2 border ${
            zeroGravity
              ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_20px_#fbbf24] hover:bg-amber-300'
              : 'bg-[#080d19]/90 text-cyan-300 border-cyan-500/40 hover:border-cyan-400 backdrop-blur-xl hover:text-white'
          }`}
          title="Toggle between Hanging Verlet Threads and Zero-Gravity Cosmic Drift"
        >
          <span>{zeroGravity ? '⚡' : '⚓'}</span>
          <span>{zeroGravity ? 'Zero-G Mode' : 'Hanging Mode'}</span>
        </button>
      </div>

      {/* 3. Pull-Cord Physical Theme Switcher on the far right */}
      <PullCord
        lightingMode={lightingMode}
        onCycleLightingMode={handleCycleLightingMode}
      />

      {/* 4. Live Telemetry HUD & Built-In Lo-Fi Ambient Radio */}
      <HUD
        theme={theme}
        lightingMode={lightingMode}
        exploredCount={exploredCount}
        totalCount={QUESTIONS.length}
        onRecruiterClick={() => setRecruiterOpen(true)}
      />

      {/* 5. Constellation Progress Tracker */}
      <ProgressTracker
        exploredMap={exploredMap}
        onSelectNode={handleOpenModal}
      />

      {/* 6. Recruiter Fast-Track Executive Modal */}
      <RecruiterView
        isOpen={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
      />

      {/* 7. Unique Signature Modals */}
      <WhoAmIModal
        isOpen={activeModalId === 'who-am-i'}
        onClose={handleCloseModal}
      />

      <ProjectsModal
        isOpen={activeModalId === 'projects'}
        onClose={handleCloseModal}
      />

      <JourneyModal
        isOpen={activeModalId === 'journey'}
        onClose={handleCloseModal}
      />

      <GoalsModal
        isOpen={activeModalId === 'goals'}
        onClose={handleCloseModal}
      />

      <HobbiesModal
        isOpen={activeModalId === 'hobbies'}
        onClose={handleCloseModal}
      />

      <ExplainModal
        isOpen={activeModalId === 'explain'}
        onClose={handleCloseModal}
      />

      <EasterEggModal
        isOpen={activeModalId === 'easter-egg'}
        onClose={handleCloseModal}
        zeroGravity={zeroGravity}
        setZeroGravity={setZeroGravity}
      />

      <BizarreQuestionsModal
        nodeId={activeModalId}
        isOpen={isBizarreQuestion}
        onClose={handleCloseModal}
      />
    </div>
  );
}
