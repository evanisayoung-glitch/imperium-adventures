import type { Metadata } from "next";
import Link from "next/link";
import { LetterPage } from "@/components/commission/LetterPage";
import { crafts, inquireHref } from "@/lib/crafts";
import { investmentBands, processSteps } from "@/lib/possibility";

export const metadata: Metadata = {
  title: "Engage",
  description:
    "How a website commission with Imperium Adventures works — from first meeting to launch, $5,000 to $50,000.",
};

type PageProps = {
  searchParams: Promise<{ study?: string }>;
};

export default async function EngagePage({ searchParams }: PageProps) {
  const { study } = await searchParams;
  const studyQuery = study ? `&study=${study}` : "";

  return (
    <LetterPage
      kicker="Engage"
      title="How we work together."
      lede="The price is about the first thing people see — and the site underneath. Not hours on a sheet."
    >
      <ol className="divide-y divide-ivory/10 border-y border-ivory/10">
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            className="grid gap-3 py-10 md:grid-cols-[7rem_12rem_1fr] md:items-baseline"
          >
            <p className="mono text-[12px] text-gold">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="display text-3xl tracking-tight">{step.title}</h2>
            <p className="max-w-md text-[15px] leading-relaxed text-ivory/55">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-28">
        <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">On your site</p>
        <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)] leading-tight tracking-tight">
          What we can put there.
        </h2>
        <ul className="mt-12 divide-y divide-ivory/10 border-y border-ivory/10">
          {crafts.map((craft) => (
            <li
              key={craft.id}
              className="grid gap-4 py-8 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-end"
            >
              <p className="mono text-[12px] text-gold">{craft.index}</p>
              <div>
                <p className="display text-[1.7rem] leading-none">{craft.name}</p>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory/50">{craft.line}</p>
              </div>
              <Link href={inquireHref(craft)} className="link-gold text-[15px]">
                I want this
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-28">
        <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">What it costs</p>
        <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-tight tracking-tight">
          Five to fifty thousand.
        </h2>
        <ul className="mt-16 divide-y divide-ivory/10 border-y border-ivory/10">
          {investmentBands.map((band) => (
            <li
              key={band.id}
              className="grid gap-6 py-12 lg:grid-cols-[0.7fr_1.1fr_auto] lg:items-end"
            >
              <div>
                <p className="display text-[clamp(2.6rem,5vw,4.4rem)] leading-none tracking-tight">
                  {band.price}
                </p>
                <p className="mt-3 mono text-[12px] tracking-[0.2em] uppercase text-gold">{band.name}</p>
              </div>
              <div>
                <p className="max-w-md text-[15px] leading-relaxed text-ivory/55">{band.summary}</p>
                <p className="mt-4 text-[13px] text-ivory/38">{band.includes.join(" · ")}</p>
              </div>
              <Link href={`/inquire?band=${band.id}${studyQuery}`} className="link-gold text-[15px]">
                Begin {band.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div id="os" className="mt-28 max-w-xl">
        <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">If you need more</p>
        <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-tight tracking-tight">
          A morning book for the team.
        </h2>
        <p className="mt-6 text-[15px] leading-relaxed text-ivory/55">
          We made Finti — the desk a sales team opens first. It belongs with an Estate
          commission, not as a second website.
        </p>
        <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
          <Link href="/inquire?need=product&band=estate&craft=os" className="link-gold">
            Include the morning book
          </Link>
          <Link href="/crm" className="link-gold">
            See Finti
          </Link>
        </p>
      </div>
    </LetterPage>
  );
}
