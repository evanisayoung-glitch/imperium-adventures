"use client";

import { useEffect, useRef, useState } from "react";
import {
  curatedPaintings,
  preloadAllPaintings,
  type MetObjectResponse,
} from "@/lib/met-paintings";

export function usePaintingLibrary() {
  const imagesRef = useRef(new Map<number, HTMLImageElement>());
  const metadataRef = useRef(new Map<number, MetObjectResponse>());
  const [ready, setReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedIds, setFailedIds] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    preloadAllPaintings().then(({ loaded, failed }) => {
      if (cancelled) return;
      for (const item of loaded) {
        imagesRef.current.set(item.objectId, item.image);
        if (item.meta) metadataRef.current.set(item.objectId, item.meta);
      }
      setLoadedCount(loaded.length);
      setFailedIds(failed);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const getImage = (objectId: number) => imagesRef.current.get(objectId) ?? null;
  const getMetadata = (objectId: number) => metadataRef.current.get(objectId) ?? null;
  const isImageLoaded = (objectId: number) => imagesRef.current.has(objectId);

  return {
    ready,
    loadedCount,
    totalCount: curatedPaintings.length,
    failedIds,
    getImage,
    getMetadata,
    isImageLoaded,
  };
}
