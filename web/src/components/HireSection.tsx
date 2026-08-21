export function HireSection() {
  return (
    <section id="hire" className="bg-forest px-5 py-24 text-field sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold-soft">Hire</p>
        <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
          Ready for a site that looks this intentional?
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-field/75">
          Tell me about your brand, your launch goal, and the feeling you want visitors to walk away with.
          I&apos;ll map a clear path from first draft to live on Vercel.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="mailto:Imperiumadventures99@gmail.com?subject=Website%20project%20inquiry"
            className="bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft"
          >
            Start a project
          </a>
          <a
            href="/playground"
            className="border border-field/35 px-6 py-3 text-sm tracking-[0.12em] uppercase text-field transition hover:border-gold hover:text-gold-soft"
          >
            See the lab first
          </a>
        </div>
      </div>
    </section>
  );
}
