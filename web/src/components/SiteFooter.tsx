import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-forest/15 bg-forest-deep text-field">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="display text-lg tracking-[0.18em]">IMPERIUM ADVENTURES</p>
          <p className="mt-2 max-w-md text-sm text-field/70">
            Commissioned websites and living first screens for houses that refuse to look ordinary.
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-field/75 sm:items-end">
          <Link
            href="/yours"
            className="inline-flex min-h-11 items-center transition-colors hover:text-gold-soft active:text-gold-soft"
          >
            See what’s possible
          </Link>
          <Link
            href="/inquire"
            className="inline-flex min-h-11 items-center transition-colors hover:text-gold-soft active:text-gold-soft"
          >
            Begin a commission
          </Link>
          <Link
            href="/atelier"
            className="inline-flex min-h-11 items-center transition-colors hover:text-gold-soft active:text-gold-soft"
          >
            Atelier
          </Link>
          <Link
            href="/playground"
            className="inline-flex min-h-11 items-center transition-colors hover:text-gold-soft active:text-gold-soft"
          >
            Lab
          </Link>
          <Link
            href="/crm"
            className="inline-flex min-h-11 items-center transition-colors hover:text-gold-soft active:text-gold-soft"
          >
            Custom CRM
          </Link>
          <p className="text-xs text-field/50">
            © {new Date().getFullYear()} Imperium Adventures LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
