"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import { MaisonLights, SlowOrbit, gold } from "./rig";
import { seed } from "./seed";

const GRAINS = 160;
const dummy = new Object3D();

export function SablierScene({ variant, paused }: { variant: string; paused: boolean }) {
  const grains = useRef<InstancedMesh>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: GRAINS }, (_, index) => ({
        delay: (index / GRAINS) * 4.8,
        x: (seed(index, 1) - 0.5) * 0.12,
        z: (seed(index, 2) - 0.5) * 0.12,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!grains.current) return;
    const t = paused || variant === "still" ? 1.6 : clock.elapsedTime;
    const direction = variant === "reverse" ? -1 : 1;
    seeds.forEach((grain, index) => {
      const cycle = 4.8;
      let progress = ((t * direction + grain.delay) % cycle) / cycle;
      if (progress < 0) progress += 1;
      const y = 1.15 - progress * 2.3;
      const spread = progress < 0.15 || progress > 0.85 ? 0.32 : 0.04 + Math.abs(progress - 0.5) * 0.2;
      dummy.position.set(grain.x * (1 + spread * 4), y, grain.z * (1 + spread * 4));
      dummy.scale.setScalar(0.035);
      dummy.updateMatrix();
      grains.current?.setMatrixAt(index, dummy.matrix);
    });
    grains.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <color attach="background" args={["#080806"]} />
      <MaisonLights intensity={1.05} />
      <SlowOrbit speed={0.1} paused={paused}>
        <mesh position={[0, 1.05, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.72, 1.35, 6]} />
          <meshPhysicalMaterial
            color="#d8c89a"
            metalness={0.15}
            roughness={0.12}
            transmission={0.72}
            thickness={0.4}
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <coneGeometry args={[0.72, 1.35, 6]} />
          <meshPhysicalMaterial
            color="#d8c89a"
            metalness={0.15}
            roughness={0.12}
            transmission={0.72}
            thickness={0.4}
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[0.16, 0.035, 12, 32]} />
          <meshPhysicalMaterial color={gold.gilt} metalness={1} roughness={0.16} />
        </mesh>
        <mesh position={[0, 1.72, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.08, 6]} />
          <meshPhysicalMaterial color={gold.gilt} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.72, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.08, 6]} />
          <meshPhysicalMaterial color={gold.gilt} metalness={1} roughness={0.2} />
        </mesh>
        <instancedMesh ref={grains} args={[undefined, undefined, GRAINS]}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial color={gold.champagne} metalness={0.85} roughness={0.3} />
        </instancedMesh>
      </SlowOrbit>
    </>
  );
}
