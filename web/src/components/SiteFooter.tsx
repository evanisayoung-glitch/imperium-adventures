import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-field text-ink">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="display text-2xl tracking-tight">Imperium Adventures</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
            Commissioned websites. Five to fifty thousand.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted">
          <Link href="/yours" className="hover:text-ink">
            Yours
          </Link>
          <Link href="/inquire" className="hover:text-ink">
            Inquire
          </Link>
          <Link href="/atelier" className="hover:text-ink">
            Atelier
          </Link>
          <Link href="/playground" className="hover:text-ink">
            Lab
          </Link>
          <Link href="/crm" className="hover:text-ink">
            Finti
          </Link>
        </nav>
        <p className="text-[13px] text-muted">
          © {new Date().getFullYear()} Imperium Adventures LLC
        </p>
      </div>
    </footer>
  );
}
