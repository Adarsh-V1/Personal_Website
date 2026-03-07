"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, RoundedBox, Torus, Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const barNodes = [
  { position: [-2.2, 0, 0.12], color: "#0f766e" },
  { position: [-1.05, 0.42, 0.18], color: "#0ea5e9" },
  { position: [0, 0, 0.18], color: "#7c3aed" },
  { position: [1.1, -0.38, 0.16], color: "#f97316" },
  { position: [2.2, 0, 0.12], color: "#0f172a" },
];

function ArcaneBar() {
  const groupRef = useRef(null);
  const shellRef = useRef(null);
  const rearShellRef = useRef(null);
  const innerRingRef = useRef(null);
  const outerRingRef = useRef(null);
  const glowRef = useRef(null);
  const coreRef = useRef(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => {
        const angle = (index / 20) * Math.PI * 2;
        const radius = 2.55 + (index % 4) * 0.16;

        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.54,
            -0.35 + (index % 3) * 0.12,
          ],
          color: index % 2 === 0 ? "#99f6e4" : "#f59e0b",
        };
      }),
    []
  );

  const threadLines = useMemo(
    () =>
      barNodes.map((node, index) => [
        [0, 0, 0.14],
        [node.position[0] * 0.56, node.position[1] * 0.56 + (index % 2 === 0 ? 0.18 : -0.16), 0.12],
        node.position,
      ]),
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(time * 0.24) * 0.08 + pointerX * 0.22,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.cos(time * 0.18) * 0.04 - pointerY * 0.16,
        0.06
      );
    }

    if (shellRef.current) {
      shellRef.current.position.y = THREE.MathUtils.lerp(
        shellRef.current.position.y,
        Math.sin(time * 1) * 0.03,
        0.08
      );
    }

    if (rearShellRef.current) {
      rearShellRef.current.position.y = THREE.MathUtils.lerp(
        rearShellRef.current.position.y,
        -0.18 + Math.cos(time * 0.75) * 0.02,
        0.08
      );
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 0.26;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -time * 0.18;
    }

    if (glowRef.current) {
      glowRef.current.scale.x = 1.02 + Math.sin(time * 1.6) * 0.08;
      glowRef.current.scale.y = 1.02 + Math.sin(time * 1.6) * 0.08;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.012;
      coreRef.current.rotation.x += 0.004;
      coreRef.current.position.z = 0.26 + Math.sin(time * 1.4) * 0.03;
    }

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      pointerX * 0.58,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      pointerY * 0.38,
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.18} floatIntensity={0.42}>
        <group ref={shellRef} position={[0, 0, 0.1]} rotation={[-0.09, -0.42, 0.04]}>
          <mesh ref={glowRef} position={[0, 0, -0.2]}>
            <circleGeometry args={[2.3, 64]} />
            <meshBasicMaterial color="#e9d5ff" transparent opacity={0.18} />
          </mesh>

          <group ref={rearShellRef} position={[0.14, -0.18, -0.26]}>
            <RoundedBox args={[5.35, 0.6, 0.18]} radius={0.22} smoothness={8}>
              <meshPhysicalMaterial
                color="#f3e8ff"
                transparent
                opacity={0.36}
                roughness={0.08}
                metalness={0.02}
                transmission={0.75}
                thickness={0.8}
              />
            </RoundedBox>
          </group>

          <RoundedBox args={[5.15, 0.56, 0.24]} radius={0.22} smoothness={8}>
            <meshPhysicalMaterial
              color="#fdf8f0"
              transparent
              opacity={0.92}
              roughness={0.08}
              metalness={0.02}
              transmission={0.84}
              thickness={1}
            />
          </RoundedBox>

          <RoundedBox args={[4.36, 0.12, 0.08]} radius={0.08} smoothness={6} position={[0, 0, 0.11]}>
            <meshStandardMaterial color="#f8fafc" transparent opacity={0.96} />
          </RoundedBox>
          <mesh position={[0, 0, 0.18]}>
            <planeGeometry args={[3.95, 0.028]} />
            <meshBasicMaterial color="#5eead4" transparent opacity={0.9} />
          </mesh>

          <mesh position={[-2.58, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.48, 18]} />
            <meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} />
          </mesh>
          <mesh position={[2.58, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.48, 18]} />
            <meshStandardMaterial color="#e2e8f0" transparent opacity={0.6} />
          </mesh>

          <group ref={innerRingRef} position={[0, 0, 0.28]}>
            <Torus args={[0.62, 0.018, 14, 72]}>
              <meshStandardMaterial color="#d8b4fe" transparent opacity={0.9} />
            </Torus>
            <Torus args={[0.92, 0.012, 12, 72]}>
              <meshStandardMaterial color="#93c5fd" transparent opacity={0.58} />
            </Torus>
          </group>

          <group ref={outerRingRef} position={[0, 0, -0.1]}>
            <Torus args={[1.38, 0.012, 12, 72]}>
              <meshStandardMaterial color="#f59e0b" transparent opacity={0.28} />
            </Torus>
          </group>

          <Text
            position={[0, -0.78, 0.16]}
            fontSize={0.18}
            letterSpacing={0.12}
            color="#475569"
            anchorX="center"
            anchorY="middle"
          >
            THE FOOL PATHWAY
          </Text>

          {threadLines.map((points, index) => (
            <Line
              key={index}
              points={points}
              color={index % 2 === 0 ? "#c084fc" : "#67e8f9"}
              transparent
              opacity={0.42}
              lineWidth={1}
            />
          ))}

          {barNodes.map((node, index) => (
            <group key={index} position={node.position}>
              <mesh>
                <sphereGeometry args={[0.11, 20, 20]} />
                <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.18} />
              </mesh>
              <mesh>
                <ringGeometry args={[0.15, 0.2, 28]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.7} side={2} />
              </mesh>
            </group>
          ))}

          <mesh ref={coreRef} position={[0, 0, 0.26]} rotation={[0.6, 0.5, 0.18]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#ede9fe" emissive="#a855f7" emissiveIntensity={0.22} />
          </mesh>
        </group>
      </Float>

      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[0.034, 12, 12]} />
          <meshBasicMaterial color={particle.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 7], fov: 30 }}
      gl={{ alpha: true, antialias: true }}
      className="h-full w-full"
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#f8fafc", 7, 11]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3.4, 4.2, 3]} intensity={1.45} color="#fff7ed" />
      <directionalLight position={[-3, -2, 3]} intensity={0.65} color="#bfdbfe" />
      <pointLight position={[0, 1.8, 2]} intensity={0.75} color="#99f6e4" />
      <ArcaneBar />
    </Canvas>
  );
}
