import type { Metadata } from "next";
import { YoursWalk } from "@/components/possible/YoursWalk";

export const metadata: Metadata = {
  title: "Yours",
  description:
    "Type your brand word, pick a first-screen atmosphere, and see what Imperium can commission for your site.",
};

type PageProps = {
  searchParams: Promise<{ study?: string }>;
};

export default async function YoursPage({ searchParams }: PageProps) {
  const { study } = await searchParams;
  return <YoursWalk key={study ?? "default"} initialStudy={study} />;
}
