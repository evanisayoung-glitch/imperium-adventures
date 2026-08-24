import Link from "next/link";
import { CrmCommandPreview } from "@/components/crm/CrmCommandPreview";

export function CrmHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-forest-deep text-field">
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-16 pt-28 md:px-12 md:pb-24">
        <div className="grid items-end gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="display text-[clamp(2.8rem,6vw,5.5rem)] italic leading-[0.92] tracking-tight">
              A sales OS that tells the team what to do next.
            </h1>
            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-field/60">
              Purpose-built operating systems — not another contact database. An Estate add-on,
              when the site is not enough.
            </p>
            <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
              <Link href="/inquire?need=product&band=estate" className="link-quiet text-gold-soft">
                Start a CRM build
              </Link>
              <Link href="#finti" className="link-quiet text-field/70">
                See Finti
              </Link>
            </p>
            <nav aria-label="CRM pillars" className="mt-8 flex flex-wrap gap-x-6 text-[15px] text-field/45">
              {(
                [
                  ["find", "Find"],
                  ["close", "Close"],
                  ["grow", "Grow"],
                  ["win", "Win"],
                ] as const
              ).map(([slug, label]) => (
                <Link key={slug} href={`/crm/${slug}`} className="hover:text-field">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden justify-self-end lg:block">
            <CrmCommandPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
