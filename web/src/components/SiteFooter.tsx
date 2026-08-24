import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory/10 bg-void text-ivory">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="display text-2xl tracking-tight">Imperium Adventures</p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ivory/45">
            Websites for houses that refuse to look ordinary. Five to fifty thousand.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ivory/45">
          <Link href="/yours" className="hover:text-ivory">
            Yours
          </Link>
          <Link href="/inquire" className="hover:text-ivory">
            Inquire
          </Link>
          <Link href="/atelier" className="hover:text-ivory">
            Atelier
          </Link>
          <Link href="/playground" className="hover:text-ivory">
            Lab
          </Link>
          <Link href="/crm" className="hover:text-ivory">
            Finti
          </Link>
        </nav>
        <p className="text-[12px] text-ivory/35">
          © {new Date().getFullYear()} Imperium Adventures LLC
        </p>
      </div>
    </footer>
  );
}
