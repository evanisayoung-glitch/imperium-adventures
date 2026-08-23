"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Group, Mesh } from "three";
import { MaisonLights, SlowOrbit, gold } from "./rig";
import { seed } from "./seed";

export function HaloScene({ variant, paused }: { variant: string; paused: boolean }) {
  const ring = useRef<Group>(null);
  const inner = useRef<Mesh>(null);
  const starGeo = useMemo(() => {
    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 4 + seed(i, 1) * 8;
      const theta = seed(i, 2) * Math.PI * 2;
      const phi = Math.acos(2 * seed(i, 3) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, []);

  const ringColor = variant === "dawn" ? gold.ivory : gold.champagne;
  const voidColor = variant === "eclipse" ? "#030303" : variant === "dawn" ? "#16110c" : "#07080d";

  useFrame(({ clock }) => {
    if (ring.current && !paused) {
      ring.current.rotation.z = clock.elapsedTime * 0.12;
      ring.current.rotation.x = 0.35 + Math.sin(clock.elapsedTime * 0.2) * 0.05;
    }
    if (inner.current && !paused) {
      const pulse = 0.92 + Math.sin(clock.elapsedTime * 0.9) * 0.08;
      inner.current.scale.setScalar(pulse);
    }
  });

  return (
    <>
      <color attach="background" args={[voidColor]} />
      <MaisonLights intensity={0.85} />
      <points geometry={starGeo}>
        <pointsMaterial color={gold.ivory} size={0.02} transparent opacity={0.65} depthWrite={false} />
      </points>
      <SlowOrbit speed={0.05} paused={paused}>
        <group ref={ring}>
          <mesh>
            <torusGeometry args={[1.35, 0.055, 24, 120]} />
            <meshPhysicalMaterial
              color={ringColor}
              metalness={1}
              roughness={0.12}
              emissive={ringColor}
              emissiveIntensity={0.35}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[1.35, 0.018, 12, 80]} />
            <meshBasicMaterial color={gold.bright} />
          </mesh>
        </group>
        <mesh ref={inner}>
          <circleGeometry args={[1.12, 64]} />
          <meshBasicMaterial
            color={variant === "eclipse" ? "#0b0b0b" : "#1b4332"}
            transparent
            opacity={variant === "eclipse" ? 0.92 : 0.28}
          />
        </mesh>
      </SlowOrbit>
    </>
  );
}
