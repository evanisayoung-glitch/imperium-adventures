import type { Metadata } from "next";
import Link from "next/link";
import { MaisonPage } from "@/components/MaisonPage";
import { investmentBands, processSteps } from "@/lib/possibility";

export const metadata: Metadata = {
  title: "Engage",
  description:
    "How Imperium Adventures commissions websites — process, typical investment from $5,000 to $50,000, and when a custom CRM belongs in the build.",
};

type PageProps = {
  searchParams: Promise<{ study?: string }>;
};

export default async function EngagePage({ searchParams }: PageProps) {
  const { study } = await searchParams;
  const studyQuery = study ? `&study=${study}` : "";

  return (
    <MaisonPage
      kicker="Engage"
      title="How a commission runs."
      lede="The band is about the first screen and the system underneath — not hours on a spreadsheet."
    >
      <ol className="divide-y divide-ink/10 border-y border-ink/10">
        {processSteps.map((step, index) => (
          <li key={step.title} className="grid gap-3 py-10 md:grid-cols-[7rem_12rem_1fr] md:items-baseline">
            <p className="text-[15px] text-muted">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="display text-3xl italic tracking-tight">{step.title}</h2>
            <p className="max-w-md text-[16px] leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-28">
        <p className="text-[15px] text-muted">Investment</p>
        <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)] italic leading-tight tracking-tight">
          Five to fifty thousand.
        </h2>
        <ul className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
          {investmentBands.map((band) => (
            <li key={band.id} className="grid gap-6 py-12 lg:grid-cols-[0.7fr_1.1fr_auto] lg:items-end">
              <div>
                <p className="display text-[clamp(2.6rem,5vw,4.4rem)] leading-none tracking-tight">
                  {band.price}
                </p>
                <p className="display mt-2 text-2xl italic">{band.name}</p>
              </div>
              <div>
                <p className="max-w-md text-[16px] leading-relaxed text-muted">{band.summary}</p>
                <p className="mt-4 text-[15px] text-muted">{band.includes.join(" · ")}</p>
              </div>
              <Link href={`/inquire?band=${band.id}${studyQuery}`} className="link-quiet text-[16px]">
                Begin {band.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div id="os" className="mt-28 max-w-xl">
        <p className="text-[15px] text-muted">Optional · Estate</p>
        <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.4rem)] italic leading-tight tracking-tight">
          If the team needs a morning OS.
        </h2>
        <p className="mt-6 text-[16px] leading-relaxed text-muted">
          We built Finti — a Sales OS on top of the CRM. It is a scoped add-on to an Estate
          commission, not a second storefront.
        </p>
        <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
          <Link href="/inquire?need=product&band=estate" className="link-quiet">
            Include a Sales OS
          </Link>
          <Link href="/crm" className="link-quiet">
            See Finti
          </Link>
        </p>
      </div>
    </MaisonPage>
  );
}
