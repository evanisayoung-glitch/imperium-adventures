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
  return (
    <section className="bg-field px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <YoursWalk key={study ?? "default"} initialStudy={study} />
      </div>
    </section>
  );
}
