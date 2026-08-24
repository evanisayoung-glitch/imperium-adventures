import type { Metadata } from "next";
import Link from "next/link";
import { CrmCommandPreview } from "@/components/crm/CrmCommandPreview";
import { investmentBands, processSteps } from "@/lib/possibility";

export const metadata: Metadata = {
  title: "Engage",
  description:
    "How Imperium Adventures commissions websites — process, typical investment from $5,000 to $50,000, and when a custom CRM belongs in the build.",
};

const bandClasses = {
  field: "border-forest/15 bg-field",
  forest: "border-forest/20 bg-forest text-field",
  void: "border-atelier-line bg-atelier-void text-atelier-ivory",
} as const;

const muted = {
  field: "text-muted",
  forest: "text-field/75",
  void: "text-atelier-ivory/65",
} as const;

const price = {
  field: "text-gold",
  forest: "text-gold-soft",
  void: "text-atelier-champagne",
} as const;

type PageProps = {
  searchParams: Promise<{ study?: string }>;
};

export default async function EngagePage({ searchParams }: PageProps) {
  const { study } = await searchParams;
  const studyQuery = study ? `&study=${study}` : "";

  return (
    <section className="bg-field px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-24">
        <div>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">Engage</p>
          <h1 className="display mt-3 text-5xl text-forest sm:text-6xl">How a commission runs.</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Website commissions typically run $5,000–$50,000. The band is about the first screen
            and the system underneath — not hours on a spreadsheet.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">Process</p>
          <h2 className="display mt-3 text-3xl text-forest sm:text-4xl">Discover → Compose → Build → Launch</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="border-t border-forest/15 pt-6">
                <p className="display text-sm text-gold">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="display mt-2 text-2xl text-forest">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p className="text-xs tracking-[0.24em] uppercase text-gold">Investment</p>
          <h2 className="display mt-3 text-3xl text-forest sm:text-4xl">Three materials. Three bands.</h2>
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {investmentBands.map((band) => (
              <li key={band.id} className={`flex flex-col border p-6 ${bandClasses[band.tone]}`}>
                <p className={`text-xs tracking-[0.2em] uppercase ${price[band.tone]}`}>{band.price}</p>
                <h3 className="display mt-2 text-3xl">{band.name}</h3>
                <p className={`mt-4 text-sm leading-relaxed ${muted[band.tone]}`}>{band.summary}</p>
                <ul className={`mt-6 space-y-2 text-sm ${muted[band.tone]}`}>
                  {band.includes.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
                <Link
                  href={`/inquire?band=${band.id}${studyQuery}`}
                  className={`mt-8 inline-flex min-h-11 items-center justify-center px-5 text-xs tracking-[0.16em] uppercase ${
                    band.tone === "field"
                      ? "bg-gold text-forest-deep hover:bg-gold-soft"
                      : "bg-atelier-ivory text-atelier-void hover:bg-atelier-champagne"
                  }`}
                >
                  Begin {band.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="os" className="grid items-center gap-12 border-t border-forest/15 pt-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs tracking-[0.24em] uppercase text-gold">Optional · Estate</p>
            <h2 className="display mt-3 text-3xl text-forest sm:text-4xl">
              If your team needs a morning OS.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              We built Finti — a Sales OS on top of the CRM. Find, Close, Grow, Win.
              It is a scoped add-on to an Estate commission, not a second storefront.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/inquire?need=product&band=estate"
                className="inline-flex min-h-11 items-center bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft"
              >
                Include a Sales OS
              </Link>
              <Link
                href="/crm"
                className="inline-flex min-h-11 items-center border border-forest/20 px-6 py-3 text-sm tracking-[0.12em] uppercase text-forest transition hover:border-gold"
              >
                See Finti
              </Link>
            </div>
          </div>
          <div className="justify-self-center lg:justify-self-end">
            <CrmCommandPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
