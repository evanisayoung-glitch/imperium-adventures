const crafts = [
  {
    title: "Brand-led interfaces",
    body: "Sites that feel like your company — not a template with a logo swapped in.",
  },
  {
    title: "Motion with purpose",
    body: "Subtle animation that guides attention and makes the product feel alive.",
  },
  {
    title: "Fast, modern stacks",
    body: "Next.js on Vercel, clean architecture, and room to grow as your ideas do.",
  },
];

export function CraftSection() {
  return (
    <section id="craft" className="bg-field-warm px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Craft</p>
        <h2 className="display mt-3 max-w-xl text-4xl text-forest sm:text-5xl">
          What customers hire Imperium for.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {crafts.map((craft) => (
            <article key={craft.title} className="space-y-3">
              <h3 className="display text-2xl text-forest">{craft.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{craft.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
