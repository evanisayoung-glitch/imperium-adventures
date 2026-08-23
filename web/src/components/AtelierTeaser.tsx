import Link from "next/link";
import { StudyPreview } from "@/components/atelier/StudyPreview";

export function AtelierTeaser() {
  return (
    <section className="bg-atelier-void px-5 py-24 text-atelier-ivory sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mono text-[10px] tracking-[0.28em] text-atelier-champagne">ATELIER</p>
          <h2 className="display mt-3 max-w-xl text-4xl sm:text-5xl">
            A cabinet of live Three.js, finished like jewelry.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-atelier-ivory/68 sm:text-base">
            Eight private studies — grove, gilt, mist, silk — turning in a black room.
            Built for houses that want their first screen to feel expensive.
          </p>
          <Link
            href="/atelier"
            className="mt-8 inline-flex min-h-11 items-center bg-atelier-ivory px-6 text-sm tracking-[0.16em] uppercase text-atelier-void transition hover:bg-atelier-champagne"
          >
            Enter the cabinet
          </Link>
        </div>
        <Link href="/atelier/or" className="block ring-1 ring-atelier-line transition hover:ring-atelier-champagne/70">
          <StudyPreview slug="or" variant="knot" className="aspect-[4/3]" dpr={1.2} />
        </Link>
      </div>
    </section>
  );
}
