import type { Metadata } from "next";
import { YoursComposer } from "@/components/commission/YoursComposer";

export const metadata: Metadata = {
  title: "Yours",
  description:
    "Try your name in gold dust, a painting that waits, and every color you own — then ask us to put it on your site.",
};

type PageProps = {
  searchParams: Promise<{ study?: string }>;
};

export default async function YoursPage({ searchParams }: PageProps) {
  const { study } = await searchParams;
  return <YoursComposer key={study ?? "default"} initialStudy={study} />;
}
