import Link from "next/link";

export function SignatureTeaser() {
  return (
    <section className="bg-field-warm px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Signature</p>
        <h2 className="display mt-3 max-w-2xl text-4xl text-forest sm:text-5xl">
          Type a word. Earn the mark.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          A field of gold that only forms your brand when a visitor works for it.
          Not a screensaver — a commissioned identity, shipped on your domain.
        </p>
        <Link
          href="/yours"
          className="mt-8 inline-flex min-h-11 items-center bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft"
        >
          Try your word
        </Link>
      </div>
    </section>
  );
}
