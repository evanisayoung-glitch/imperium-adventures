import type { ReactNode } from "react";

export function LetterPage({
  kicker,
  title,
  lede,
  children,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-void px-6 pb-32 pt-36 text-ivory md:px-12">
      <div className="mx-auto max-w-[1100px]">
        {kicker ? (
          <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">{kicker}</p>
        ) : null}
        <h1 className="display mt-5 text-[clamp(3rem,8vw,6.2rem)] leading-[0.88] tracking-tight">
          {title}
        </h1>
        {lede ? (
          <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-ivory/55">{lede}</p>
        ) : null}
        <div className="mt-20">{children}</div>
      </div>
    </section>
  );
}
