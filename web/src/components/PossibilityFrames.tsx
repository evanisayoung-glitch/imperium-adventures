import Link from "next/link";
import { StudyPreview } from "@/components/atelier/StudyPreview";
import { homeAtmospheres } from "@/lib/possibility";

export function PossibilityFrames() {
  return (
    <section className="bg-field px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Possibility</p>
        <h2 className="display mt-3 max-w-2xl text-4xl text-forest sm:text-5xl">
          Your grove. Your relic. Your field.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Three first screens, already live. Pick a mood — then see it with your name on it.
        </p>
        <ul className="mt-14 grid gap-8 lg:grid-cols-3">
          {homeAtmospheres.map((item) => (
            <li key={item.slug}>
              <Link href={`/yours?study=${item.slug}`} className="group block">
                <StudyPreview
                  slug={item.slug}
                  variant={item.variant}
                  className="aspect-[5/4] ring-1 ring-forest/10 transition group-hover:ring-gold/50"
                  dpr={1}
                />
                <p className="mt-4 text-xs tracking-[0.2em] uppercase text-gold">{item.job}</p>
                <h3 className="display mt-1 text-2xl text-forest transition group-hover:text-forest-mid">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.line}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link
            href="/yours"
            className="text-sm tracking-[0.14em] uppercase text-forest underline decoration-gold/60 underline-offset-4 transition hover:decoration-gold"
          >
            See what’s possible for your site
          </Link>
        </div>
      </div>
    </section>
  );
}
