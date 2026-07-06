"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

function Orb() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 64, 64]}>
      <MeshDistortMaterial
        color="#6d5bd0"
        emissive="#22d3ee"
        emissiveIntensity={0.25}
        distort={0.4}
        speed={1.6}
        roughness={0.15}
        metalness={0.6}
      />
    </Sphere>
  );
}

export function HeroOrb() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#22d3ee" />
      <pointLight position={[-4, -2, -2]} intensity={30} color="#a855f7" />
      <Suspense fallback={null}>
        <Orb />
      </Suspense>
    </Canvas>
  );
}
