"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

export function StudioCanvas({
  children,
  className,
  dpr = 1.35,
  camera = { position: [0, 0.4, 3.8], fov: 34 },
}: {
  children: ReactNode;
  className?: string;
  dpr?: number | [number, number];
  camera?: { position: [number, number, number]; fov: number };
}) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      camera={{ ...camera, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
