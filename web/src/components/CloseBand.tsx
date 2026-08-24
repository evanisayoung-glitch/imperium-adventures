import Link from "next/link";

export function CloseBand() {
  return (
    <section className="bg-atelier-void px-6 py-32 text-atelier-ivory md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[15px] text-atelier-ivory/45">By appointment</p>
        <h2 className="display mt-6 max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)] italic leading-[0.95] tracking-tight">
          <Link href="/inquire" className="link-quiet">
            Begin a commission
          </Link>
        </h2>
        <p className="mt-10 max-w-md text-[16px] leading-relaxed text-atelier-ivory/50">
          Tell us the house, the launch, and the band. We reply with a path from first draft
          to live.
        </p>
      </div>
    </section>
  );
}
