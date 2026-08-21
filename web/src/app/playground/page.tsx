import type { Metadata } from "next";
import Link from "next/link";
import { experiments } from "@/lib/experiments";

export const metadata: Metadata = {
  title: "Playground",
  description: "Interactive experiments and prototypes from Imperium Adventures.",
};

export default function PlaygroundIndexPage() {
  return (
    <div className="bg-field px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Playground</p>
        <h1 className="display mt-3 text-5xl text-forest sm:text-6xl">Lab floor</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Interactive prototypes you can try right now. New ideas land here before they become client features.
        </p>
        <ul className="mt-14 space-y-4">
          {experiments.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/playground/${item.slug}`}
                className="group flex flex-col gap-2 border border-forest/15 bg-field-warm/40 px-5 py-6 transition hover:border-gold/60 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="display text-2xl text-forest">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.tagline}</p>
                </div>
                <span className="text-xs tracking-[0.18em] uppercase text-muted group-hover:text-gold">
                  {item.status} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
