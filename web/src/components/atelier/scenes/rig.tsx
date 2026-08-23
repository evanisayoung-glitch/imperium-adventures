"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";

export function MaisonLights({
  intensity = 1,
  accent = "#c9a227",
}: {
  intensity?: number;
  accent?: string;
}) {
  return (
    <>
      <ambientLight intensity={0.16 * intensity} color="#f4efe3" />
      <directionalLight
        position={[4.2, 6.4, 2.4]}
        intensity={1.55 * intensity}
        color="#f6e7c4"
      />
      <spotLight
        position={[-3.2, 4.8, 3.4]}
        intensity={0.55 * intensity}
        color={accent}
        angle={0.55}
        penumbra={0.7}
      />
      <pointLight position={[0.2, -1.6, 2.2]} intensity={0.22 * intensity} color="#2d6a4f" />
    </>
  );
}

export function SlowOrbit({
  speed = 0.12,
  children,
  paused = false,
}: {
  speed?: number;
  children?: ReactNode;
  paused?: boolean;
}) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (paused || !ref.current) return;
    ref.current.rotation.y += delta * speed;
  });

  return <group ref={ref}>{children}</group>;
}

export const gold = {
  champagne: "#d8b56a",
  gilt: "#c9a227",
  bright: "#f0d78a",
  forest: "#1b4332",
  enamel: "#0f2a1f",
  ivory: "#f4efe3",
  ink: "#0b0a08",
};
