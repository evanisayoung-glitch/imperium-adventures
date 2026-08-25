import type { Metadata } from "next";
import { LetterPage } from "@/components/commission/LetterPage";
import { InquireForm } from "@/components/possible/InquireForm";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Begin a website with Imperium Adventures — who you are, what it should cost, and what people see first.",
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
      lede="Who you are, what you are launching, what it should cost. We write back — usually within a day."
    >
      <InquireForm prefill={prefill} />
    </LetterPage>
  );
}
