"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import { MaisonLights, gold } from "./rig";

function faceColor(variant: string) {
  if (variant === "enamel") return gold.enamel;
  if (variant === "ivory") return gold.ivory;
  return "#2a2418";
}

export function RoseScene({ variant, paused }: { variant: string; paused: boolean }) {
  const needle = useRef<Group>(null);
  const ring = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (ring.current && !paused) {
      ring.current.rotation.z += delta * 0.08;
    }
    if (!needle.current) return;
    const target = Math.atan2(pointer.x, pointer.y);
    const current = needle.current.rotation.z;
    let diff = target - current;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    needle.current.rotation.z += paused ? 0 : diff * 0.08;
  });

  const metal = variant === "ivory" ? gold.gilt : gold.champagne;

  return (
    <>
      <color attach="background" args={["#080806"]} />
      <MaisonLights intensity={1.05} />
      <group rotation={[0.55, 0, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.08, 64]} />
          <meshPhysicalMaterial color={faceColor(variant)} metalness={0.35} roughness={0.35} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <torusGeometry args={[1.32, 0.055, 16, 80]} />
          <meshPhysicalMaterial color={metal} metalness={1} roughness={0.18} />
        </mesh>
        <group ref={ring}>
          {Array.from({ length: 16 }, (_, index) => {
            const angle = (index / 16) * Math.PI * 2;
            return (
              <mesh
                key={index}
                position={[Math.cos(angle) * 1.12, 0.08, Math.sin(angle) * 1.12]}
                rotation={[0, -angle, 0]}
              >
                <boxGeometry args={[0.04, 0.03, index % 4 === 0 ? 0.22 : 0.12]} />
                <meshStandardMaterial color={metal} metalness={0.9} roughness={0.22} />
              </mesh>
            );
          })}
        </group>
        <group ref={needle} position={[0, 0.12, 0]}>
          <mesh position={[0, 0, 0.42]}>
            <coneGeometry args={[0.07, 0.85, 8]} />
            <meshPhysicalMaterial color={gold.bright} metalness={1} roughness={0.12} />
          </mesh>
          <mesh position={[0, 0, -0.28]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.06, 0.55, 8]} />
            <meshStandardMaterial color="#4a2a16" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
        <mesh position={[0, 0.16, 0]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshPhysicalMaterial color={gold.bright} metalness={1} roughness={0.1} />
        </mesh>
      </group>
    </>
  );
}
