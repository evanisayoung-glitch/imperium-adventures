import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PillarDemo } from "@/components/crm/CrmFeatureDemos";
import { pillars, type PillarPage } from "@/lib/crm-features";

export function CrmFeatureHero({ pillar }: { pillar: PillarPage }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-field">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 15% 20%, rgba(201,162,39,0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 85% 80%, rgba(45,106,79,0.45), transparent 60%), linear-gradient(160deg, #0f2a1f 0%, #1b4332 55%, #0f2a1f 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mist-layer opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 18px, rgba(247,244,236,0.03) 18px 19px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
        <Link
          href="/crm"
          className="animate-rise text-xs tracking-[0.18em] uppercase text-field/65 transition hover:text-gold-soft"
        >
          ← Custom CRM builds
        </Link>

        <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="animate-rise display text-4xl leading-none tracking-[0.14em] text-gold-soft sm:text-5xl">
              IMPERIUM
              <span className="mt-2 block text-xl tracking-[0.28em] text-field sm:text-2xl">
                ADVENTURES
              </span>
            </p>
            <div className="animate-rise-delay-1 rule-gold my-6 max-w-sm" />
            <p className="animate-rise-delay-1 text-xs tracking-[0.24em] uppercase text-gold-soft/90">
              {pillar.eyebrow}
            </p>
            <h1 className="animate-rise-delay-1 mt-3 max-w-xl text-2xl leading-snug text-field sm:text-3xl">
              {pillar.headline}
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-lg text-sm leading-relaxed text-field/70 sm:text-base">
              {pillar.lede}
            </p>
            <div className="animate-rise-delay-3 mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
              <Link href="/inquire?need=product&band=estate" className="link-quiet text-gold-soft">
                Start a CRM build
              </Link>
              <a href="#features" className="link-quiet text-field/70">
                Explore features
              </a>
            </div>
          </div>

          <div className="animate-rise-delay-2">
            <p className="mb-3 text-[10px] tracking-[0.2em] uppercase text-field/55">
              {pillar.demoLabel}
            </p>
            <PillarDemo pillar={pillar.key} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CrmFeatureDetails({ pillar }: { pillar: PillarPage }) {
  return (
    <section id="features" className="bg-field px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">Feature depth</p>
          <h2 className="display mt-3 max-w-2xl text-4xl text-forest sm:text-5xl">
            {pillar.title} — what ships in the OS.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{pillar.body}</p>
        </Reveal>

        <div className="mt-14 divide-y divide-forest/15 border-y border-forest/15">
          {pillar.features.map((feature, index) => (
            <Reveal key={feature.title} as="article" delayMs={index * 60} className="py-8">
              <div className="grid gap-3 sm:grid-cols-[7rem_1fr_10rem] sm:gap-8 sm:items-start">
                <span className="display text-sm text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-2xl text-forest">{feature.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {feature.body}
                  </p>
                </div>
                <p className="text-xs tracking-[0.16em] uppercase text-forest/45 sm:text-right">
                  {feature.beat}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrmFeatureSteps({ pillar }: { pillar: PillarPage }) {
  return (
    <section className="bg-field-warm px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">How it moves</p>
          <h2 className="display mt-3 max-w-xl text-4xl text-forest sm:text-5xl">
            Three beats from intent to action.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {pillar.steps.map((step, index) => (
            <Reveal key={step.title} as="li" delayMs={index * 100} className="space-y-3">
              <span className="display text-5xl text-forest/15">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="display text-2xl text-forest">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CrmSiblingPillars({ current }: { current: PillarPage["key"] }) {
  const others = pillars.filter((pillar) => pillar.key !== current);

  return (
    <section className="bg-field px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">Continue the spine</p>
          <h2 className="display mt-3 max-w-xl text-4xl text-forest sm:text-5xl">
            The other three questions.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {others.map((pillar, index) => (
            <Reveal key={pillar.key} delayMs={index * 80}>
              <Link
                href={`/crm/${pillar.key}`}
                className="group block space-y-3 border-t border-forest/15 pt-6 transition active:opacity-80"
              >
                <p className="display text-4xl text-forest/20 transition group-hover:text-gold">
                  {pillar.title}
                </p>
                <h3 className="display text-xl text-forest">{pillar.question}</h3>
                <p className="text-sm leading-relaxed text-muted">{pillar.body}</p>
                <span className="text-xs tracking-[0.16em] uppercase text-gold">
                  Open {pillar.title} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrmFeatureCta({ pillar }: { pillar: PillarPage }) {
  return (
    <section className="bg-forest px-5 py-24 text-field sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs tracking-[0.24em] uppercase text-gold-soft">Custom builds</p>
          <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
            Want {pillar.title} shaped to your process?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-field/75">
            Imperium designs and ships sales operating systems with the same spine — Find · Close ·
            Grow · Win — tuned to your scoring, stages, and commission reality.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
            <Link href="/inquire?need=product&band=estate" className="link-quiet text-gold-soft">
              Talk about your CRM
            </Link>
            <Link href="/crm" className="link-quiet text-field/70">
              All CRM features
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
