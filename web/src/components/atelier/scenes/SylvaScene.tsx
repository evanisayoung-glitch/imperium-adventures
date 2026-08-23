"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, InstancedMesh, Object3D } from "three";
import { MaisonLights, SlowOrbit, gold } from "./rig";
import { seed } from "./seed";

const dummy = new Object3D();
const TREE_COUNT = 42;
const FIREFLY_COUNT = 80;

function palette(variant: string) {
  if (variant === "midnight") {
    return { canopy: "#0b2418", trunk: "#1a140c", fog: "#050806", fire: gold.gilt };
  }
  if (variant === "champagne") {
    return { canopy: "#3d4a2a", trunk: "#3a2c16", fog: "#16140e", fire: gold.bright };
  }
  return { canopy: "#1b4332", trunk: "#2a1d10", fog: "#0a100c", fire: gold.champagne };
}

function Trees({ canopy, trunk }: { canopy: string; trunk: string }) {
  const canopyRef = useRef<InstancedMesh>(null);
  const trunkRef = useRef<InstancedMesh>(null);
  const layout = useMemo(() => {
    return Array.from({ length: TREE_COUNT }, (_, index) => {
      const angle = (index / TREE_COUNT) * Math.PI * 2 + (index % 5) * 0.17;
      const radius = 1.15 + (index % 7) * 0.28 + (index % 3) * 0.08;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.78;
      const scale = 0.55 + (index % 6) * 0.09;
      return { x, z, scale, height: 1.15 + (index % 4) * 0.18 };
    });
  }, []);

  useFrame(() => {
    if (!canopyRef.current || !trunkRef.current) return;
    layout.forEach((tree, index) => {
      dummy.position.set(tree.x, tree.height * 0.55, tree.z);
      dummy.scale.set(tree.scale, tree.height, tree.scale);
      dummy.rotation.set(0, index * 0.3, 0);
      dummy.updateMatrix();
      canopyRef.current?.setMatrixAt(index, dummy.matrix);
      dummy.position.set(tree.x, 0.18, tree.z);
      dummy.scale.set(tree.scale * 0.18, tree.height * 0.42, tree.scale * 0.18);
      dummy.updateMatrix();
      trunkRef.current?.setMatrixAt(index, dummy.matrix);
    });
    canopyRef.current.instanceMatrix.needsUpdate = true;
    trunkRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, TREE_COUNT]}>
        <cylinderGeometry args={[0.12, 0.18, 1, 6]} />
        <meshStandardMaterial color={trunk} roughness={0.92} />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, TREE_COUNT]}>
        <coneGeometry args={[0.55, 1.4, 7]} />
        <meshStandardMaterial color={canopy} roughness={0.78} metalness={0.08} />
      </instancedMesh>
    </>
  );
}

function Fireflies({ color, paused }: { color: string; paused: boolean }) {
  const ref = useRef<InstancedMesh>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: FIREFLY_COUNT }, (_, index) => ({
        x: (seed(index, 1) - 0.5) * 6,
        y: 0.3 + seed(index, 2) * 2.2,
        z: (seed(index, 3) - 0.5) * 5,
        phase: seed(index, 4) * Math.PI * 2,
        speed: 0.35 + seed(index, 5) * 0.55,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    seeds.forEach((fly, index) => {
      dummy.position.set(
        fly.x + Math.sin(t * fly.speed + fly.phase) * 0.35,
        fly.y + Math.sin(t * fly.speed * 1.4 + fly.phase) * 0.22,
        fly.z + Math.cos(t * fly.speed * 0.8 + fly.phase) * 0.28,
      );
      const pulse = paused ? 0.7 : 0.45 + Math.sin(t * 3 + fly.phase) * 0.35;
      dummy.scale.setScalar(0.035 * pulse);
      dummy.updateMatrix();
      ref.current?.setMatrixAt(index, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, FIREFLY_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
}

export function SylvaScene({ variant, paused }: { variant: string; paused: boolean }) {
  const tones = palette(variant);
  const fog = useMemo(() => new Color(tones.fog), [tones.fog]);

  return (
    <>
      <color attach="background" args={[tones.fog]} />
      <fog attach="fog" args={[fog, 4.5, 12]} />
      <MaisonLights intensity={variant === "midnight" ? 0.7 : 1} />
      <SlowOrbit speed={0.08} paused={paused}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <circleGeometry args={[7, 48]} />
          <meshStandardMaterial color="#14110c" roughness={0.96} />
        </mesh>
        <Trees canopy={tones.canopy} trunk={tones.trunk} />
      </SlowOrbit>
      <Fireflies color={tones.fire} paused={paused} />
    </>
  );
}
