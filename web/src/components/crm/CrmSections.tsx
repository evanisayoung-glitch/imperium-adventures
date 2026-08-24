import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  ClosePipelineDemo,
  FindScoreDemo,
  GrowHealthDemo,
  WinForecastDemo,
} from "@/components/crm/CrmFeatureDemos";
import { pillars, platformCapabilities, showcaseHighlights } from "@/lib/crm-features";

export function CrmFintiShowcase() {
  return (
    <section id="finti" className="bg-field px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">Proof of craft</p>
          <h2 className="display mt-3 max-w-3xl text-4xl text-forest sm:text-5xl">
            Built for Finti — a Sales OS on top of the CRM.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Finti Sales OS is the intelligence layer Imperium engineered for merchant acquisition and
            lifecycle: find better merchants, close more of them, grow production, and win recurring
            commission. The features below shipped as Release Candidate 1.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-forest/15 border-y border-forest/15">
          {showcaseHighlights.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delayMs={index * 50}
              className="grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8"
            >
              <span className="display text-sm text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-2xl text-forest">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
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
        <Reveal>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">Four pillars</p>
          <h2 className="display mt-3 max-w-2xl text-4xl text-forest sm:text-5xl">
            Every screen answers one of four questions.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Custom CRMs from Imperium follow the same spine that powers Finti: Find · Close · Grow ·
            Win. Open a pillar for the full feature set and live motion demos.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.key} as="article" delayMs={index * 40}>
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <p className="display text-5xl text-forest/20 sm:text-6xl">{pillar.title}</p>
                  <h3 className="display mt-2 text-2xl text-forest sm:text-3xl">
                    {pillar.question}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{pillar.body}</p>
                  <Link
                    href={`/crm/${pillar.key}`}
                    className="mt-5 inline-flex text-xs tracking-[0.16em] uppercase text-gold transition hover:text-forest"
                  >
                    Full {pillar.title} features →
                  </Link>
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrmMotionGallery() {
  const demos = [
    { key: "find", title: "Find", blurb: "Explainable scoring that ranks the book.", Demo: FindScoreDemo },
    { key: "close", title: "Close", blurb: "Pipeline cards that keep deals moving.", Demo: ClosePipelineDemo },
    { key: "grow", title: "Grow", blurb: "Health pulse after the ink dries.", Demo: GrowHealthDemo },
    { key: "win", title: "Win", blurb: "Commission layers with provenance.", Demo: WinForecastDemo },
  ] as const;

  return (
    <section id="motion" className="bg-field px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">In motion</p>
          <h2 className="display mt-3 max-w-2xl text-4xl text-forest sm:text-5xl">
            Features you can feel before the first call.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Each pillar ships with interfaces that animate the job — scoring, staging, health, and
            forecast — so the product feels alive on day one.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {demos.map((item, index) => (
            <Reveal key={item.key} delayMs={index * 70} className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="display text-2xl text-forest">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.blurb}</p>
                </div>
                <Link
                  href={`/crm/${item.key}`}
                  className="shrink-0 text-xs tracking-[0.16em] uppercase text-gold"
                >
                  Details →
                </Link>
              </div>
              <item.Demo />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrmPlatformFeatures() {
  return (
    <section id="platform" className="bg-field-warm px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">Platform</p>
          <h2 className="display mt-3 max-w-2xl text-4xl text-forest sm:text-5xl">
            More than pillars — the operating layer underneath.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {platformCapabilities.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 50} className="space-y-3 border-t border-forest/15 pt-6">
              <h3 className="display text-xl text-forest">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </Reveal>
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
        <Reveal>
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
              Built to last as the team grows
            </li>
          </ul>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
            <Link href="/inquire?need=product&band=estate" className="link-quiet text-gold-soft">
              Talk about your CRM
            </Link>
            <Link href="/inquire" className="link-quiet text-field/70">
              Website commission
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
