import type { Metadata } from "next";
import Link from "next/link";
import { MaisonPage } from "@/components/MaisonPage";
import { experiments } from "@/lib/experiments";

export const metadata: Metadata = {
  title: "Lab",
  description: "Interactive experiments and prototypes from Imperium Adventures.",
};

export default function PlaygroundIndexPage() {
  return (
    <MaisonPage
      kicker="Lab"
      title="Private floor."
      lede="Prototypes stay here. The commission path is Yours, Engage, and Inquire."
    >
      <ul className="divide-y divide-ink/10 border-y border-ink/10">
        {experiments.map((item) => (
          <li key={item.slug}>
            <Link href={`/playground/${item.slug}`} className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="display text-3xl italic tracking-tight">{item.title}</p>
                <p className="mt-2 text-[16px] text-muted">{item.tagline}</p>
              </div>
              <span className="link-quiet text-[15px]">Open</span>
            </Link>
          </li>
        ))}
      </ul>
    </MaisonPage>
  );
}
