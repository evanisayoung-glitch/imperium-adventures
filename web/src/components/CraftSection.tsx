import Link from "next/link";

const crafts: Array<{ title: string; body: string; href?: string }> = [
  {
    title: "Brand-led interfaces",
    body: "Sites that feel like your company — not a template with a logo swapped in.",
  },
  {
    title: "Custom CRM builds",
    body: "Sales operating systems like Finti — Find, Close, Grow, Win — shaped to your process.",
    href: "/crm",
  },
  {
    title: "Particle wordmarks",
    body: "A page-wide field of dots that only forms your brand when a visitor earns it — then ships on your site.",
    href: "/playground/wordmark",
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
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {crafts.map((craft) => {
            const content = (
              <>
                <h3 className="display text-2xl text-forest transition group-hover:text-forest-mid group-active:text-forest-mid">
                  {craft.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{craft.body}</p>
                {craft.href ? (
                  <span className="text-xs tracking-[0.16em] uppercase text-gold">
                    Explore →
                  </span>
                ) : null}
              </>
            );

            return craft.href ? (
              <Link
                key={craft.title}
                href={craft.href}
                className="group space-y-3 active:opacity-80"
              >
                {content}
              </Link>
            ) : (
              <article key={craft.title} className="space-y-3">
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
