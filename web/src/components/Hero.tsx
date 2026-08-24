import Link from "next/link";
import { StudyPreview } from "@/components/atelier/StudyPreview";

export function Hero() {
  return (
    <section className="min-h-[100svh] bg-atelier-void text-atelier-ivory lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <div className="relative h-[52vh] lg:order-2 lg:h-auto lg:min-h-[100svh]">
        <StudyPreview slug="or" variant="knot" className="absolute inset-0 h-full w-full" dpr={[1, 1.5]} />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-atelier-void/75 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-[40rem] flex-1 flex-col justify-end px-6 pb-14 pt-8 lg:max-w-none lg:justify-end lg:px-12 lg:pb-24 lg:pt-28">
        <p className="display text-[clamp(3.6rem,11vw,8.5rem)] leading-[0.82] tracking-tight">
          Imperium
        </p>
        <h1 className="display mt-8 max-w-md text-[clamp(1.55rem,2.6vw,2.15rem)] italic leading-[1.2] text-atelier-ivory/88">
          Websites for houses that refuse to look ordinary.
        </h1>
        <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-atelier-ivory/50">
          The first screen is the work. Commissions from $5,000 to $50,000.
        </p>
        <p className="mt-10 text-[16px]">
          <Link href="/yours" className="link-quiet text-atelier-champagne">
            See what is possible
          </Link>
        </p>
      </div>
    </section>
  );
}
