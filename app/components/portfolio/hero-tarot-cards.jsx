"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const tarotCapabilities = [
  {
    title: "SaaS Systems",
    code: "01",
    subtitle: "Production Web Apps",
    desc: "Built 25+ screens, multi-tenant dashboards, role auth, & fast PostgreSQL queries.",
    color: "#c8861f",
  },
  {
    title: "React Native",
    code: "02",
    subtitle: "Cross-Platform Mobile",
    desc: "Native performance iOS/Android apps with offline caching & seamless APIs.",
    color: "#38bdf8",
  },
  {
    title: "AI Integration",
    code: "03",
    subtitle: "LLMs & Automation",
    desc: "Embed OpenAI, Claude, vector DBs & automated analytical pipelines.",
    color: "#a855f7",
  },
  {
    title: "Auth & Payments",
    code: "04",
    subtitle: "Security & Subscriptions",
    desc: "Stripe integration, OAuth, JWT, Better Auth & role-based access control.",
    color: "#22c55e",
  },
  {
    title: "Type-Safe APIs",
    code: "05",
    subtitle: "Hono, tRPC & Node",
    desc: "Ultra-fast REST & RPC routes with schema validation & 99.9% uptime.",
    color: "#f97316",
  },
];

function TarotCard3D({ card, index, total, activeIndex, onSelect, lotmMode }) {
  const meshRef = useRef(null);
  const isSelected = activeIndex === index;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Calculate arc arrangement for the deck
    const angleStep = 0.28;
    const centerOffset = (total - 1) / 2;
    const relativePos = index - centerOffset;
    
    let targetX = relativePos * 1.15;
    let targetY = -Math.abs(relativePos) * 0.18;
    let targetZ = -Math.abs(relativePos) * 0.25;
    let targetRotZ = -relativePos * 0.12;
    let targetRotY = relativePos * 0.08;
    let targetScale = 1;

    if (isSelected) {
      targetX = 0;
      targetY = 0.4;
      targetZ = 1.4;
      targetRotZ = 0;
      targetRotY = Math.sin(t * 1.5) * 0.1;
      targetScale = 1.25;
    }

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
  });

  return (
    <group
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* Outer Ornate Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.4, 0.05]} />
        <meshPhysicalMaterial
          color={isSelected ? card.color : lotmMode ? "#0d1829" : "#1e293b"}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          emissive={isSelected ? card.color : "#000000"}
          emissiveIntensity={isSelected ? 0.35 : 0}
        />
      </mesh>

      {/* Ornate Gold Border Inner Mesh */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1.38, 2.28]} />
        <meshStandardMaterial
          color={lotmMode ? "#f0b85b" : "#e2e8f0"}
          metalness={0.9}
          roughness={0.3}
          wireframe={!isSelected}
        />
      </mesh>

      {/* Card Title 3D Text */}
      <Text
        position={[0, 0.7, 0.04]}
        fontSize={0.16}
        color={isSelected ? "#ffffff" : lotmMode ? "#f0b85b" : "#f8fafc"}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/cinzel/v19/8vIJ7ww63mVu7gt79H7L.woff"
      >
        {card.code} • {card.title}
      </Text>

      <Text
        position={[0, 0.45, 0.04]}
        fontSize={0.1}
        color={isSelected ? "#e2e8f0" : "#94a3b8"}
        anchorX="center"
        anchorY="middle"
      >
        {card.subtitle}
      </Text>

      {/* Sigil / Symbol */}
      <mesh position={[0, -0.15, 0.04]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={card.color}
          emissive={card.color}
          emissiveIntensity={isSelected ? 0.8 : 0.2}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function HeroTarotCards({ lotmMode = false, onActiveCardChange }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (idx) => {
    setActiveIndex(idx);
    if (onActiveCardChange) {
      onActiveCardChange(tarotCapabilities[idx]);
    }
  };

  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={lotmMode ? 0.7 : 0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-3, -3, 2]} color="#f0b85b" intensity={0.8} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, -0.2, 0]}>
            {tarotCapabilities.map((card, idx) => (
              <TarotCard3D
                key={card.title}
                card={card}
                index={idx}
                total={tarotCapabilities.length}
                activeIndex={activeIndex}
                onSelect={handleSelect}
                lotmMode={lotmMode}
              />
            ))}
          </group>

          <Sparkles
            count={60}
            scale={[6, 4, 4]}
            size={2}
            speed={0.3}
            color={lotmMode ? "#f0b85b" : "#38bdf8"}
          />
        </Float>
      </Canvas>
    </div>
  );
}
