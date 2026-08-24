import Link from "next/link";

export function HireSection() {
  return (
    <section id="inquire" className="bg-forest px-5 py-24 text-field sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold-soft">Appointment</p>
        <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
          Ready for a site that looks this intentional?
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-field/75">
          Tell us about the house, the launch, and the budget band. We reply with a clear path
          from first draft to live on Vercel.
        </p>
        <div className="mt-10">
          <Link
            href="/inquire"
            className="inline-flex min-h-11 items-center bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft active:bg-gold-soft"
          >
            Begin a commission
          </Link>
        </div>
      </div>
    </section>
  );
}
