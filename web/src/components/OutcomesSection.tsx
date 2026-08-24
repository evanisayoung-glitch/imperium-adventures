import Link from "next/link";

const outcomes = [
  {
    title: "Brand-led marketing sites",
    body: "Pages that feel like your company. Quiet chrome, one idea per screen, live on Vercel.",
  },
  {
    title: "Living first screens",
    body: "Particle identity or a Three.js threshold — the opening your client remembers.",
    href: "/yours",
  },
  {
    title: "Custom product surfaces",
    body: "When the site is not enough: a Sales OS like Finti, scoped as its own commission.",
    href: "/engage#os",
  },
];

export function OutcomesSection() {
  return (
    <section id="outcomes" className="bg-field px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">What ships</p>
        <h2 className="display mt-3 max-w-xl text-4xl text-forest sm:text-5xl">
          Three outcomes. One studio.
        </h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {outcomes.map((item) => {
            const inner = (
              <>
                <h3 className="display text-2xl text-forest transition group-hover:text-forest-mid">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                {item.href ? (
                  <span className="text-xs tracking-[0.16em] uppercase text-gold">Explore →</span>
                ) : null}
              </>
            );

            return item.href ? (
              <Link key={item.title} href={item.href} className="group space-y-3">
                {inner}
              </Link>
            ) : (
              <article key={item.title} className="space-y-3">
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
