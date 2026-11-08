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
      const anchorX = q.anchorRatio.x * w;
      const anchorY = q.anchorRatio.y * h;
      const nodeX = q.nodeRatio.x * w;
      const nodeY = q.nodeRatio.y * h;
      return createThread(world, anchorX, anchorY, nodeX, nodeY, q.segments, q.id, idx);
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
