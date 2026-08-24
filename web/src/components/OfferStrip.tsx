import Link from "next/link";

const offers = [
  {
    title: "A site",
    body: "Pages that feel like the company — not a template with a mark dropped in.",
    href: "/engage",
  },
  {
    title: "A first screen",
    body: "Particle identity or a live threshold. The opening a visitor remembers.",
    href: "/yours",
  },
  {
    title: "A system",
    body: "When the site is not enough: a Sales OS, scoped as its own commission.",
    href: "/engage#os",
  },
];

export function OfferStrip() {
  return (
    <section className="bg-field px-6 py-28 text-ink md:px-12 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="max-w-2xl text-[15px] text-muted">What we make</p>
        <ul className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
          {offers.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group grid gap-4 py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-end"
              >
                <h2 className="display text-[clamp(2.4rem,5vw,4.2rem)] italic leading-none tracking-tight">
                  {item.title}
                </h2>
                <p className="max-w-md text-[16px] leading-relaxed text-muted">{item.body}</p>
                <span className="link-quiet justify-self-start text-[15px] md:justify-self-end">
                  Look
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
