import type { Metadata } from "next";
import { YoursComposer } from "@/components/commission/YoursComposer";

export const metadata: Metadata = {
  title: "Yours",
  description:
    "Try a particle identity, a painting reveal, and a Three.js threshold — then commission the opening for your site.",
};

type PageProps = {
  searchParams: Promise<{ study?: string }>;
};

export default async function YoursPage({ searchParams }: PageProps) {
  const { study } = await searchParams;
  return <YoursComposer key={study ?? "default"} initialStudy={study} />;
}
