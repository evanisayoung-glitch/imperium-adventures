import Link from "next/link";
import { LivingCompass } from "./LivingCompass";
import { MountainBackdrop } from "./MountainBackdrop";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden text-field">
      <MountainBackdrop />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div>
            <p className="animate-rise display text-4xl leading-none tracking-[0.14em] text-gold-soft sm:text-6xl md:text-7xl">
              IMPERIUM
              <span className="mt-2 block text-2xl tracking-[0.28em] text-field sm:text-3xl">
                ADVENTURES
              </span>
            </p>
            <div className="animate-rise-delay-1 rule-gold my-6 max-w-md" />
            <h1 className="animate-rise-delay-1 max-w-xl text-xl leading-relaxed text-field/90 sm:text-2xl">
              A playground for new ideas — and a showcase of the websites I build for clients.
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-lg text-sm leading-relaxed text-field/70 sm:text-base">
              Test features in the open. See the craft. Hire Imperium Adventures to bring your next site to life.
            </p>
            <div className="animate-rise-delay-3 mt-8 flex flex-wrap gap-3">
              <Link
                href="/playground"
                className="inline-flex min-h-11 items-center bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft active:bg-gold-soft"
              >
                Enter playground
              </Link>
              <Link
                href="/crm"
                className="inline-flex min-h-11 items-center border border-field/40 px-6 py-3 text-sm tracking-[0.12em] uppercase text-field transition hover:border-gold hover:text-gold-soft active:border-gold active:text-gold-soft"
              >
                Custom CRMs
              </Link>
            </div>
          </div>
          <div className="animate-rise-delay-2 flex justify-center lg:justify-self-end">
            <LivingCompass size={240} />
          </div>
        </div>
      </div>
    </section>
  );
}
