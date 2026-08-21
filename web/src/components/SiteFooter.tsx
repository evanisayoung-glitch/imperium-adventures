import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-forest/15 bg-forest-deep text-field">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="display text-lg tracking-[0.18em]">IMPERIUM ADVENTURES</p>
          <p className="mt-2 max-w-md text-sm text-field/70">
            A living studio for experiments, prototypes, and client-ready web craft.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-field/75 sm:items-end">
          <Link href="/playground" className="transition-colors hover:text-gold-soft">
            Open playground
          </Link>
          <a
            href="mailto:Imperiumadventures99@gmail.com?subject=Website%20project%20inquiry"
            className="transition-colors hover:text-gold-soft"
          >
            Imperiumadventures99@gmail.com
          </a>
          <p className="text-xs text-field/50">
            © {new Date().getFullYear()} Imperium Adventures LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
