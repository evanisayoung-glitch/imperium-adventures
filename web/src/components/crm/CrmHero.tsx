import Link from "next/link";
import { MountainBackdrop } from "@/components/MountainBackdrop";
import { CrmCommandPreview } from "@/components/crm/CrmCommandPreview";

export function CrmHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden text-field">
      <MountainBackdrop />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="animate-rise display text-4xl leading-none tracking-[0.14em] text-gold-soft sm:text-6xl md:text-7xl">
              IMPERIUM
              <span className="mt-2 block text-2xl tracking-[0.28em] text-field sm:text-3xl">
                ADVENTURES
              </span>
            </p>
            <div className="animate-rise-delay-1 rule-gold my-6 max-w-md" />
            <h1 className="animate-rise-delay-1 max-w-xl text-xl leading-relaxed text-field/90 sm:text-2xl">
              Custom CRM builds that tell your team what to do next.
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-lg text-sm leading-relaxed text-field/70 sm:text-base">
              Purpose-built sales operating systems — not another generic contact database.
            </p>
            <div className="animate-rise-delay-3 mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:Imperiumadventures99@gmail.com?subject=Custom%20CRM%20build%20inquiry"
                className="bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft"
              >
                Start a CRM build
              </a>
              <Link
                href="#finti"
                className="border border-field/40 px-6 py-3 text-sm tracking-[0.12em] uppercase text-field transition hover:border-gold hover:text-gold-soft"
              >
                See Finti features
              </Link>
            </div>
          </div>
          <div className="animate-rise-delay-2 hidden justify-self-end lg:block">
            <CrmCommandPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
