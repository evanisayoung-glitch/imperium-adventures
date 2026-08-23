"use client";

import dynamic from "next/dynamic";

const scenes = {
  sylva: dynamic(() => import("./scenes/SylvaScene").then((mod) => mod.SylvaScene)),
  or: dynamic(() => import("./scenes/OrScene").then((mod) => mod.OrScene)),
  nimbus: dynamic(() => import("./scenes/NimbusScene").then((mod) => mod.NimbusScene)),
  rose: dynamic(() => import("./scenes/RoseScene").then((mod) => mod.RoseScene)),
  velours: dynamic(() => import("./scenes/VeloursScene").then((mod) => mod.VeloursScene)),
  halo: dynamic(() => import("./scenes/HaloScene").then((mod) => mod.HaloScene)),
  sablier: dynamic(() => import("./scenes/SablierScene").then((mod) => mod.SablierScene)),
  blason: dynamic(() => import("./scenes/BlasonScene").then((mod) => mod.BlasonScene)),
} as const;

export function StudyStage({
  slug,
  variant,
  paused,
}: {
  slug: string;
  variant: string;
  paused: boolean;
}) {
  const Scene = scenes[slug as keyof typeof scenes];
  if (!Scene) return null;
  return <Scene variant={variant} paused={paused} />;
}
