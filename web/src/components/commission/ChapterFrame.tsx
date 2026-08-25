import type { ReactNode } from "react";
import Link from "next/link";

export function ChapterFrame({
  index,
  kicker,
  title,
  body,
  href,
  hrefLabel,
  align = "start",
  ink = "ivory",
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  body: string;
  href?: string;
  hrefLabel?: string;
  align?: "start" | "end";
  ink?: "ivory" | "void";
  children?: ReactNode;
}) {
  const light = ink === "ivory";
  return (
    <div
      className={`pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-between px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-32 ${
        align === "end" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <div className={align === "end" ? "max-w-xl" : "max-w-lg"}>
        <p
          className={`mono text-[11px] tracking-[0.32em] uppercase ${
            light ? "text-gold" : "text-forest"
          }`}
        >
          {index} — {kicker}
        </p>
        <h2
          className={`display mt-5 text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.86] tracking-tight ${
            light ? "text-ivory" : "text-void"
          }`}
        >
          {title}
        </h2>
      </div>
      <div className={`pointer-events-auto max-w-sm ${align === "end" ? "ml-auto" : ""}`}>
        <p className={`text-[15px] leading-relaxed ${light ? "text-ivory/62" : "text-void/70"}`}>
          {body}
        </p>
        {href && hrefLabel ? (
          <p className="mt-6">
            <Link href={href} className={light ? "link-gold" : "link-quiet"}>
              {hrefLabel}
            </Link>
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
