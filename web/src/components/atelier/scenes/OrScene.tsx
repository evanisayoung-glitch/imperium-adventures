"use client";

import { Mesh } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MaisonLights, SlowOrbit, gold } from "./rig";

function metal(color: string) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={1}
      roughness={0.12}
      clearcoat={0.8}
      clearcoatRoughness={0.08}
      reflectivity={1}
      envMapIntensity={1.4}
    />
  );
}

function Sculpture({ variant }: { variant: string }) {
  if (variant === "star") {
    return (
      <mesh>
        <icosahedronGeometry args={[1.15, 0]} />
        {metal(gold.champagne)}
      </mesh>
    );
  }
  if (variant === "ring") {
    return (
      <group>
        <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
          <torusGeometry args={[1.05, 0.18, 48, 96]} />
          {metal(gold.gilt)}
        </mesh>
        <mesh>
          <sphereGeometry args={[0.38, 48, 48]} />
          {metal(gold.bright)}
        </mesh>
      </group>
    );
  }
  return (
    <mesh rotation={[0.4, 0.2, 0.15]}>
      <torusKnotGeometry args={[0.72, 0.22, 180, 24]} />
      {metal(gold.champagne)}
    </mesh>
  );
}

export function OrScene({ variant, paused }: { variant: string; paused: boolean }) {
  const glow = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!glow.current) return;
    const pulse = 0.92 + Math.sin(clock.elapsedTime * 0.7) * 0.06;
    glow.current.scale.setScalar(paused ? 1 : pulse);
  });

  return (
    <>
      <color attach="background" args={["#080806"]} />
      <MaisonLights intensity={1.45} />
      <pointLight position={[1.6, 1.2, 2.2]} intensity={1.1} color="#fff1c8" />
      <SlowOrbit speed={0.22} paused={paused}>
        <Sculpture variant={variant} />
      </SlowOrbit>
      <mesh ref={glow} position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 1.55, 64]} />
        <meshBasicMaterial color={gold.gilt} transparent opacity={0.16} />
      </mesh>
    </>
  );
}
