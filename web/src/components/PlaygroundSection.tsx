import Link from "next/link";
import { experiments } from "@/lib/experiments";

export function PlaygroundSection() {
  return (
    <section id="playground" className="bg-field px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Playground</p>
        <h2 className="display mt-3 max-w-2xl text-4xl text-forest sm:text-5xl">
          Experiments that ship into products.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          This is where new interactions, layouts, and prototypes land first — then graduate into client work.
        </p>
        <ul className="mt-14 divide-y divide-forest/15 border-y border-forest/15">
          {experiments.map((item, index) => (
            <li key={item.slug}>
              <Link
                href={`/playground/${item.slug}`}
                className="group flex flex-col gap-2 py-7 transition active:opacity-80 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div className="flex items-baseline gap-4">
                  <span className="display text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="display text-2xl text-forest transition group-hover:text-forest-mid group-active:text-forest-mid">
                      {item.title}
                    </p>
                    <p className="mt-1 max-w-xl text-sm text-muted">{item.tagline}</p>
                  </div>
                </div>
                <span className="text-xs tracking-[0.18em] uppercase text-muted transition group-hover:text-gold group-active:text-gold">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link
            href="/playground"
            className="text-sm tracking-[0.14em] uppercase text-forest underline decoration-gold/60 underline-offset-4 transition hover:decoration-gold"
          >
            View all experiments
          </Link>
        </div>
      </div>
    </section>
  );
}
