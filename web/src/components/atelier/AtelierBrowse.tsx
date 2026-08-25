"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { atelierFamilies, familyCopy, filterStudies, type AtelierStudy } from "@/lib/atelier";
import { StudyPreview } from "./StudyPreview";

export function AtelierBrowse({
  studies,
  family,
}: {
  studies: AtelierStudy[];
  family: string;
}) {
  const [query, setQuery] = useState("");
  const activeFamily = family || "all";
  const visible = useMemo(
    () => filterStudies(activeFamily, query).filter((item) => studies.some((study) => study.slug === item.slug)),
    [activeFamily, query, studies],
  );

  return (
    <div className="px-4 py-6 sm:px-7 sm:py-8">
      <div className="flex flex-col gap-4 border-b border-atelier-line pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mono text-[10px] tracking-[0.28em] text-atelier-muted">PRIVATE COLLECTION</p>
          <h1 className="display mt-2 text-4xl text-atelier-ivory sm:text-5xl">The cabinet</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-atelier-ivory/65">
            Private studies, finished like jewelry. No stock pictures. No rush.
          </p>
        </div>
        <label className="block w-full max-w-sm">
          <span className="mono sr-only">Search studies</span>
          <input
            type="search"
            value={query}
            placeholder="Search the cabinet"
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full border border-atelier-line bg-atelier-panel px-3 text-sm text-atelier-ivory outline-none placeholder:text-atelier-muted focus:border-atelier-champagne"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <FilterChip href="/atelier" active={activeFamily === "all"} label="All" />
        {atelierFamilies.map((item) => (
          <FilterChip
            key={item}
            href={`/atelier?family=${item}`}
            active={activeFamily === item}
            label={familyCopy[item].label}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-sm text-atelier-muted">No studies in this drawer.</p>
      ) : (
        <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {visible.map((study) => (
            <li key={study.slug}>
              <Link href={`/atelier/${study.slug}`} className="group block">
                <StudyPreview
                  slug={study.slug}
                  variant={study.variants[0]?.id ?? "default"}
                  className="aspect-[5/4] ring-1 ring-atelier-line transition group-hover:ring-atelier-champagne/70"
                  dpr={1}
                />
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="display text-2xl text-atelier-ivory group-hover:text-atelier-champagne">
                      {study.title}
                      <span className="text-atelier-muted"> — {study.subtitle}</span>
                    </h2>
                    <p className="mono mt-1 text-[10px] tracking-[0.16em] text-atelier-muted">
                      {study.tags.join("  ·  ")}
                    </p>
                  </div>
                  <span className="mono mt-1 text-[10px] tracking-[0.18em] text-atelier-champagne">
                    {study.edition}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({ href, active, label }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`mono inline-flex min-h-9 items-center px-3 text-[10px] tracking-[0.18em] uppercase transition ${
        active
          ? "bg-atelier-ivory text-atelier-void"
          : "border border-atelier-line text-atelier-ivory/70 hover:border-atelier-champagne hover:text-atelier-champagne"
      }`}
    >
      {label}
    </Link>
  );
}
