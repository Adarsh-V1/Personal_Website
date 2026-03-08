"use client";

import { Float, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const fallbackThreads = [
  { label: "React", color: "#06b6d4" },
  { label: "Next.js", color: "#0f172a" },
  { label: "Node.js", color: "#0f766e" },
  { label: "TypeScript", color: "#2563eb" },
  { label: "DevOps", color: "#ea580c" },
  { label: "NLP", color: "#0891b2" },
  { label: "Deep Learning", color: "#1d4ed8" },
  { label: "React Native", color: "#0f766e" },
];

function ArcaneCore({ lotmMode = false, motionFactor = 1 }) {
  const coreRef = useRef(null);
  const knotRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.x += 0.004 * motionFactor;
      coreRef.current.rotation.y += 0.008 * motionFactor;
      const scale = 1 + Math.sin(t * (1.3 * motionFactor || 0.001)) * 0.04;
      coreRef.current.scale.setScalar(scale);
    }

    if (knotRef.current) {
      knotRef.current.rotation.y -= 0.006 * motionFactor;
      knotRef.current.rotation.z += 0.003 * motionFactor;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * (0.45 * motionFactor || 0.001)) * 0.22;
      ringRef.current.rotation.z -= 0.004 * motionFactor;
    }
  });

  return (
    <group>
      <mesh ref={coreRef} castShadow>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshPhysicalMaterial
          color={lotmMode ? "#eef6ff" : "#e2e8f0"}
          metalness={0.35}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
          emissive={lotmMode ? "#f0b85b" : "#38bdf8"}
          emissiveIntensity={lotmMode ? 0.35 : 0.2}
        />
      </mesh>

      <mesh ref={knotRef} rotation={[0.3, 0.1, 0.1]}>
        <torusKnotGeometry args={[1.02, 0.08, 220, 30, 2, 5]} />
        <meshStandardMaterial
          color={lotmMode ? "#0d3b66" : "#fb923c"}
          transparent
          opacity={0.62}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.45, 0.03, 30, 200]} />
        <meshStandardMaterial
          color={lotmMode ? "#f0b85b" : "#93c5fd"}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function OrbitalGlyph({
  thread,
  index,
  total,
  lotmMode = false,
  activeName,
  motionFactor = 1,
  onHover,
  onLeave,
  onSelect,
}) {
  const groupRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const baseAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);

  const isActive = activeName === thread.name;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const radius = 2.35 + (index % 2 === 0 ? 0.2 : -0.15);
    const speed = (0.18 + index * 0.01) * motionFactor;

    if (groupRef.current) {
      const x = Math.cos(baseAngle + t * speed) * radius;
      const z = Math.sin(baseAngle + t * speed) * radius;
      const y = Math.sin(baseAngle * 1.6 + t * 0.9) * 0.55;
      groupRef.current.position.set(x, y, z);

      const targetScale = isActive ? 1.35 : 1;
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.12);
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.12);
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.12);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02 * motionFactor;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 3 + index) * 0.12;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial
          color={thread.color}
          transparent
          opacity={isActive ? 0.2 : 0.1}
        />
      </mesh>

      <mesh castShadow>
        <octahedronGeometry args={[0.14, 1]} />
        <meshStandardMaterial
          color={thread.color}
          emissive={thread.color}
          emissiveIntensity={isActive ? 0.85 : 0.45}
          roughness={0.28}
          metalness={0.2}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.02, 18, 64]} />
        <meshBasicMaterial
          color={lotmMode ? "#f0b85b" : "#e2e8f0"}
          transparent
          opacity={isActive ? 0.9 : 0.55}
        />
      </mesh>

      <mesh
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(thread);
        }}
        onPointerOut={() => {
          onLeave();
        }}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(thread);
        }}
      >
        <sphereGeometry args={[0.38, 20, 20]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ArcaneOrrery({
  threads,
  activeSkill,
  onActiveChange,
  lotmMode = false,
  motionFactor = 1,
  sparklesCount = 80,
}) {
  const clusterRef = useRef(null);
  const [hoveredThread, setHoveredThread] = useState(null);

  const normalizedThreads = useMemo(
    () =>
      threads.map((thread) => ({
        ...thread,
        name: thread.name ?? thread.label,
        color: thread.color ?? "#2563eb",
      })),
    [threads]
  );

  const activeName = hoveredThread?.name ?? activeSkill;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (clusterRef.current) {
      clusterRef.current.rotation.y = THREE.MathUtils.lerp(
        clusterRef.current.rotation.y,
        t * (0.06 * motionFactor || 0.001) + state.pointer.x * 0.18,
        0.03 * motionFactor
      );
      clusterRef.current.rotation.x = THREE.MathUtils.lerp(
        clusterRef.current.rotation.x,
        Math.sin(t * (0.4 * motionFactor || 0.001)) * 0.05 - state.pointer.y * 0.1,
        0.04 * motionFactor
      );
    }
  });

  return (
    <group
      ref={clusterRef}
      onPointerMissed={() => {
        setHoveredThread(null);
      }}
    >
      <Float
        speed={1.05 * motionFactor}
        floatIntensity={0.4 * motionFactor}
        rotationIntensity={0.2 * motionFactor}
      >
        <ArcaneCore lotmMode={lotmMode} motionFactor={motionFactor} />

        {normalizedThreads.map((thread, index) => (
          <OrbitalGlyph
            key={`${thread.name}-${index}`}
            thread={thread}
            index={index}
            total={normalizedThreads.length}
            lotmMode={lotmMode}
            activeName={activeName}
            motionFactor={motionFactor}
            onHover={(value) => {
              setHoveredThread(value);
              onActiveChange(value);
            }}
            onLeave={() => {
              setHoveredThread(null);
            }}
            onSelect={onActiveChange}
          />
        ))}

        <Sparkles
          count={sparklesCount}
          scale={[8, 5.5, 6.2]}
          size={2.4}
          speed={0.2 * motionFactor}
          color={lotmMode ? "#f0b85b" : "#94a3b8"}
        />
      </Float>
    </group>
  );
}

export default function HeroScene({
  threads = fallbackThreads.map((thread) => ({
    name: thread.label,
    color: thread.color,
  })),
  activeSkill,
  onActiveChange = () => {},
  lotmMode = false,
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const normalizedThreads = threads.length ? threads : fallbackThreads;
  const motionFactor = reducedMotion ? 0.45 : compactMode ? 0.7 : 1;
  const starCount = reducedMotion ? 0 : compactMode ? 84 : 160;
  const sparklesCount = reducedMotion ? 28 : compactMode ? 44 : 80;

  useEffect(() => {
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactModeMedia = window.matchMedia("(max-width: 1024px)");

    const updateMode = () => {
      setReducedMotion(reducedMotionMedia.matches);
      setCompactMode(compactModeMedia.matches);
    };

    updateMode();

    reducedMotionMedia.addEventListener?.("change", updateMode);
    compactModeMedia.addEventListener?.("change", updateMode);

    return () => {
      reducedMotionMedia.removeEventListener?.("change", updateMode);
      compactModeMedia.removeEventListener?.("change", updateMode);
    };
  }, []);

  return (
    <Canvas
      dpr={compactMode ? [1, 1.1] : [1, 1.4]}
      camera={{ position: [0.2, 0.25, 7.3], fov: 36 }}
      gl={{ alpha: true, antialias: !compactMode, powerPreference: "high-performance" }}
      shadows={!compactMode && !reducedMotion}
      className="h-full w-full"
    >
      <fog attach="fog" args={[lotmMode ? "#060a12" : "#f8fafc", 7.5, 14]} />

      <ambientLight intensity={lotmMode ? 0.58 : 0.82} />
      <hemisphereLight
        intensity={lotmMode ? 0.5 : 0.72}
        color={lotmMode ? "#d49a3f" : "#fef9c3"}
        groundColor={lotmMode ? "#081322" : "#bfdbfe"}
      />
      <directionalLight
        castShadow={!compactMode && !reducedMotion}
        position={[3.8, 5.5, 3.2]}
        intensity={lotmMode ? 1.0 : 1.3}
        color={lotmMode ? "#ffd089" : "#fff7ed"}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-4.2, -2.6, 2.4]}
        intensity={lotmMode ? 0.45 : 0.76}
        color={lotmMode ? "#0d3b66" : "#67e8f9"}
      />
      <pointLight
        position={[0, 2.4, 2.2]}
        intensity={lotmMode ? 0.48 : 0.9}
        color={lotmMode ? "#f0b85b" : "#a5f3fc"}
      />

      {starCount > 0 ? (
        <Stars
          radius={24}
          depth={10}
          count={starCount}
          factor={compactMode ? 1.2 : 1.7}
          fade
          speed={0.16 * motionFactor}
          saturation={lotmMode ? 0.3 : 1}
        />
      ) : null}

      <ArcaneOrrery
        threads={normalizedThreads}
        activeSkill={activeSkill}
        onActiveChange={onActiveChange}
        lotmMode={lotmMode}
        motionFactor={motionFactor}
        sparklesCount={sparklesCount}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={!compactMode && !reducedMotion}
        minDistance={5.8}
        maxDistance={9.2}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.26 * motionFactor}
        enableDamping
        dampingFactor={compactMode ? 0.1 : 0.08}
        maxPolarAngle={Math.PI * 0.68}
        minPolarAngle={Math.PI * 0.22}
      />
    </Canvas>
  );
}
