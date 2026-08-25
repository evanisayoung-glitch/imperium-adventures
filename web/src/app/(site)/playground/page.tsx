import type { Metadata } from "next";
import Link from "next/link";
import { LetterPage } from "@/components/commission/LetterPage";
import { experiments } from "@/lib/experiments";

export const metadata: Metadata = {
  title: "Lab",
  description: "Private floor — the trials behind the openings we put on a house.",
};

export default function PlaygroundIndexPage() {
  return (
    <LetterPage
      kicker="Lab"
      title="Private floor."
      lede="Private trials. The path for a new house is Yours, Engage, and Inquire."
    >
      <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
        {experiments.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/playground/${item.slug}`}
              className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div>
                <p className="display text-3xl tracking-tight">{item.title}</p>
                <p className="mt-2 text-[15px] text-ivory/50">{item.tagline}</p>
              </div>
              <span className="link-gold text-[14px]">Open</span>
            </Link>
          </li>
        ))}
      </ul>
    </LetterPage>
  );
}
