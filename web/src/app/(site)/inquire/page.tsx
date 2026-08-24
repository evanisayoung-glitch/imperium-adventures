import type { Metadata } from "next";
import { MaisonPage } from "@/components/MaisonPage";
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
    <MaisonPage
      kicker="Inquire"
      title="Write the studio."
      lede="The house, the launch, the band. We reply with next steps — usually within a day."
    >
      <InquireForm prefill={prefill} />
    </MaisonPage>
  );
}
