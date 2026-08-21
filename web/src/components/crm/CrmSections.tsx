import Link from "next/link";
import { pillars, showcaseHighlights } from "@/lib/crm-features";

export function CrmFintiShowcase() {
  return (
    <section id="finti" className="bg-field px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Proof of craft</p>
        <h2 className="display mt-3 max-w-3xl text-4xl text-forest sm:text-5xl">
          Built for Finti — a Sales OS on top of the CRM.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          Finti Sales OS is the intelligence layer Imperium engineered for merchant acquisition and
          lifecycle: find better merchants, close more of them, grow production, and win recurring
          commission. The features below shipped as Release Candidate 1.
        </p>

        <div className="mt-14 divide-y divide-forest/15 border-y border-forest/15">
          {showcaseHighlights.map((item, index) => (
            <article key={item.title} className="grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
              <span className="display text-sm text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-2xl text-forest">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrmPillars() {
  return (
    <section id="pillars" className="bg-field-warm px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Four pillars</p>
        <h2 className="display mt-3 max-w-2xl text-4xl text-forest sm:text-5xl">
          Every screen answers one of four questions.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Custom CRMs from Imperium follow the same spine that powers Finti: Find · Close · Grow · Win.
        </p>

        <div className="mt-16 space-y-16">
          {pillars.map((pillar) => (
            <article key={pillar.key} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <p className="display text-5xl text-forest/20 sm:text-6xl">{pillar.title}</p>
                <h3 className="display mt-2 text-2xl text-forest sm:text-3xl">{pillar.question}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{pillar.body}</p>
              </div>
              <ul className="space-y-0 border-t border-forest/15">
                {pillar.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="border-b border-forest/15 py-4 text-sm leading-relaxed text-ink"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrmOffer() {
  return (
    <section id="build" className="bg-forest px-5 py-24 text-field sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold-soft">Custom builds</p>
        <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
          Your process. Your scoring. Your operating system.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-field/75">
          Whether you need merchant acquisition, pipeline discipline, production intelligence, or a
          full sales OS like Finti — Imperium designs and ships the product your reps open first
          every morning.
        </p>
        <ul className="mt-10 max-w-xl space-y-3 text-sm text-field/80">
          <li className="flex gap-3">
            <span className="text-gold-soft">—</span>
            Domain-shaped pipelines, scores, and dashboards
          </li>
          <li className="flex gap-3">
            <span className="text-gold-soft">—</span>
            AI research &amp; call prep wired to your playbook
          </li>
          <li className="flex gap-3">
            <span className="text-gold-soft">—</span>
            Honest numbers with provenance — never fabricated filler
          </li>
          <li className="flex gap-3">
            <span className="text-gold-soft">—</span>
            Next.js + modern backends, ready for multi-user scale
          </li>
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="mailto:Imperiumadventures99@gmail.com?subject=Custom%20CRM%20build%20inquiry"
            className="bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft"
          >
            Talk about your CRM
          </a>
          <Link
            href="/#hire"
            className="border border-field/35 px-6 py-3 text-sm tracking-[0.12em] uppercase text-field transition hover:border-gold hover:text-gold-soft"
          >
            General hire inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
