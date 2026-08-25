import Link from "next/link";
import { investmentBands } from "@/lib/possibility";

export function HouseClose() {
  return (
    <section className="border-t border-ivory/10 bg-void px-6 py-28 text-ivory md:px-12 md:py-36">
      <div className="mx-auto max-w-[1180px]">
        <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">08 — What it costs</p>
        <h2 className="display mt-5 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] tracking-tight">
          Five to fifty thousand.
        </h2>
        <ul className="mt-16 divide-y divide-ivory/10 border-y border-ivory/10">
          {investmentBands.map((band) => (
            <li
              key={band.id}
              className="grid gap-6 py-12 lg:grid-cols-[0.7fr_1.2fr_auto] lg:items-end"
            >
              <div>
                <p className="display text-[clamp(2.6rem,5vw,4.2rem)] leading-none tracking-tight">
                  {band.price}
                </p>
                <p className="mt-3 mono text-[12px] tracking-[0.22em] uppercase text-gold">
                  {band.name}
                </p>
              </div>
              <div>
                <p className="max-w-md text-[15px] leading-relaxed text-ivory/58">{band.summary}</p>
                <p className="mt-4 text-[13px] leading-relaxed text-ivory/38">
                  {band.includes.join(" · ")}
                </p>
              </div>
              <Link href={`/inquire?band=${band.id}`} className="link-gold text-[15px]">
                Begin {band.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-28 flex flex-col gap-8 border-t border-ivory/10 pt-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">Inquire</p>
            <p className="display mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[0.94] tracking-tight">
              The first page is the work.
            </p>
          </div>
          <Link href="/inquire" className="cta-ink text-[15px]">
            Write the studio
          </Link>
        </div>
      </div>
    </section>
  );
}
