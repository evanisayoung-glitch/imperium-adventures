"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { MaisonLights, gold } from "./rig";

function clothColor(variant: string) {
  if (variant === "ink") return "#1a1712";
  if (variant === "forest") return gold.forest;
  return gold.champagne;
}

export function VeloursScene({ variant, paused }: { variant: string; paused: boolean }) {
  const mesh = useRef<Mesh>(null);
  const color = clothColor(variant);

  useFrame(({ clock }) => {
    const geometry = mesh.current?.geometry;
    if (!geometry) return;
    const position = geometry.getAttribute("position");
    const t = paused ? 0.8 : clock.elapsedTime;
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const y = position.getY(i);
      const wave =
        Math.sin(x * 1.6 + t * 0.7) * 0.18 +
        Math.cos(y * 1.9 - t * 0.45) * 0.14 +
        Math.sin((x + y) * 0.8 + t * 0.25) * 0.08;
      position.setZ(i, wave);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <>
      <color attach="background" args={["#080806"]} />
      <MaisonLights intensity={1.2} accent={color} />
      <mesh ref={mesh} rotation={[-0.95, 0.15, 0.08]} position={[0, -0.15, 0]}>
        <planeGeometry args={[6.4, 4.4, 70, 48]} />
        <meshPhysicalMaterial
          color={color}
          metalness={variant === "champagne" ? 0.55 : 0.18}
          roughness={0.28}
          sheen={1}
          sheenRoughness={0.22}
          sheenColor={gold.bright}
          clearcoat={0.35}
        />
      </mesh>
    </>
  );
}
