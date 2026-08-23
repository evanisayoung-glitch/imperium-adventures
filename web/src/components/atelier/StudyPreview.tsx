"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { getStudy } from "@/lib/atelier";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const StudioCanvas = dynamic(() => import("./StudioCanvas").then((mod) => mod.StudioCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-atelier-void" />,
});

const StudyStage = dynamic(() => import("./StudyStage").then((mod) => mod.StudyStage), {
  ssr: false,
});

export function StudyPreview({
  slug,
  variant,
  className,
  paused,
  dpr,
}: {
  slug: string;
  variant: string;
  className?: string;
  paused?: boolean;
  dpr?: number | [number, number];
}) {
  const reduced = usePrefersReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "80px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className={`relative overflow-hidden bg-atelier-void ${className ?? ""}`}>
      {visible ? (
        <StudioCanvas
          dpr={dpr ?? 1.1}
          className="h-full w-full"
          camera={getStudy(slug)?.camera}
        >
          <StudyStage slug={slug} variant={variant} paused={paused ?? reduced} />
        </StudioCanvas>
      ) : (
        <div className="h-full w-full bg-atelier-void" />
      )}
    </div>
  );
}
