"use client";

import { useMemo } from "react";
import { ExtrudeGeometry, Shape } from "three";
import { MaisonLights, SlowOrbit, gold } from "./rig";

function shieldGeometry() {
  const shape = new Shape();
  shape.moveTo(0, 1.15);
  shape.bezierCurveTo(0.85, 1.15, 1.05, 0.85, 1.05, 0.2);
  shape.bezierCurveTo(1.05, -0.45, 0.55, -0.95, 0, -1.25);
  shape.bezierCurveTo(-0.55, -0.95, -1.05, -0.45, -1.05, 0.2);
  shape.bezierCurveTo(-1.05, 0.85, -0.85, 1.15, 0, 1.15);
  return new ExtrudeGeometry(shape, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 4 });
}

export function BlasonScene({ variant, paused }: { variant: string; paused: boolean }) {
  const geometry = useMemo(() => shieldGeometry(), []);
  const face =
    variant === "gilt" ? gold.champagne : variant === "nocturne" ? "#0a0a0a" : gold.forest;
  const rim = variant === "nocturne" ? gold.gilt : gold.bright;

  return (
    <>
      <color attach="background" args={["#080806"]} />
      <MaisonLights intensity={1.1} />
      <SlowOrbit speed={0.16} paused={paused}>
        <mesh geometry={geometry} rotation={[0, 0, 0]} position={[0, 0.05, -0.09]}>
          <meshPhysicalMaterial
            color={face}
            metalness={variant === "gilt" ? 1 : 0.25}
            roughness={variant === "gilt" ? 0.18 : 0.42}
            clearcoat={0.55}
          />
        </mesh>
        <mesh position={[0, 0.18, 0.12]}>
          <circleGeometry args={[0.32, 32]} />
          <meshPhysicalMaterial color={rim} metalness={1} roughness={0.16} />
        </mesh>
        <mesh position={[0, 0.18, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.07, 0.34, 6]} />
          <meshStandardMaterial color={gold.enamel} metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.55, 0.12]}>
          <boxGeometry args={[0.55, 0.06, 0.04]} />
          <meshStandardMaterial color={rim} metalness={0.9} roughness={0.22} />
        </mesh>
      </SlowOrbit>
    </>
  );
}
