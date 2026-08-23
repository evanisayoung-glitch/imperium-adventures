"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Points } from "three";
import { MaisonLights, gold } from "./rig";
import { seed } from "./seed";

function countFor(variant: string) {
  if (variant === "veil") return 2400;
  if (variant === "constellation") return 900;
  return 1600;
}

export function NimbusScene({ variant, paused }: { variant: string; paused: boolean }) {
  const points = useRef<Points>(null);
  const count = countFor(variant);
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const radius = variant === "veil" ? 1.1 + seed(i, 1) * 2.4 : seed(i, 2) * 3.4;
      const theta = seed(i, 3) * Math.PI * 2;
      const phi = Math.acos(2 * seed(i, 4) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.7;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      seeds[i] = seed(i, 5) * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count, variant]);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (paused || !points.current) return;
    const attr = points.current.geometry.getAttribute("position");
    const t = clock.elapsedTime;
    const speed = variant === "constellation" ? 0.12 : 0.22;
    for (let i = 0; i < count; i += 1) {
      const ix = i * 3;
      const phase = seeds[i];
      attr.setY(i, (positions[ix + 1] ?? 0) + Math.sin(t * speed + phase) * 0.18);
      attr.setX(i, (positions[ix] ?? 0) + Math.cos(t * speed * 0.7 + phase) * 0.08);
    }
    attr.needsUpdate = true;
    points.current.rotation.y = t * 0.04;
  });

  return (
    <>
      <color attach="background" args={["#070705"]} />
      <MaisonLights intensity={0.55} />
      <points ref={points} geometry={geometry}>
        <pointsMaterial
          color={variant === "constellation" ? gold.ivory : gold.champagne}
          size={variant === "veil" ? 0.018 : 0.028}
          sizeAttenuation
          transparent
          opacity={0.82}
          depthWrite={false}
        />
      </points>
    </>
  );
}
