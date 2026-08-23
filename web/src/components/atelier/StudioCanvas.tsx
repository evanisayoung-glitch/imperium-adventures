"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

export function StudioCanvas({
  children,
  className,
  dpr = 1.35,
}: {
  children: ReactNode;
  className?: string;
  dpr?: number | [number, number];
}) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      camera={{ position: [0, 0.55, 4.6], fov: 32, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
