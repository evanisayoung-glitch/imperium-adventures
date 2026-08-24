import type { Metadata } from "next";
import { InquireForm } from "@/components/possible/InquireForm";

export const metadata: Metadata = {
  title: "Inquire",
  description: "Begin a website commission with Imperium Adventures — brief, budget band, and atmosphere.",
};

type PageProps = {
  searchParams: Promise<{ study?: string; band?: string; word?: string; need?: string }>;
};

export default async function InquirePage({ searchParams }: PageProps) {
  const prefill = await searchParams;

  return (
    <section className="bg-field px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Inquire</p>
        <h1 className="display mt-3 text-5xl text-forest sm:text-6xl">Begin a commission.</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Tell us the house, the launch, and the band. The brief lands in the studio inbox —
          we reply with a path from first draft to live on Vercel.
        </p>
        <InquireForm prefill={prefill} />
      </div>
    </section>
  );
}
