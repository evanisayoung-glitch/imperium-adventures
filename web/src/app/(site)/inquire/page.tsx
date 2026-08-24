import type { Metadata } from "next";
import { LetterPage } from "@/components/commission/LetterPage";
import { InquireForm } from "@/components/possible/InquireForm";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Begin a website commission with Imperium Adventures — brief, budget, and the engine for the first screen.",
};

type PageProps = {
  searchParams: Promise<{
    study?: string;
    band?: string;
    word?: string;
    need?: string;
    craft?: string;
  }>;
};

export default async function InquirePage({ searchParams }: PageProps) {
  const prefill = await searchParams;

  return (
    <LetterPage
      kicker="Inquire"
      title="Write the studio."
      lede="The house, the launch, the band, the engine. We reply with next steps — usually within a day."
    >
      <InquireForm prefill={prefill} />
    </LetterPage>
  );
}
