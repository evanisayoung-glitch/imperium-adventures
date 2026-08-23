import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AtelierStudyView } from "@/components/atelier/AtelierStudyView";
import { getStudy, studies } from "@/lib/atelier";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return { title: "Study" };
  return {
    title: `${study.title} — ${study.subtitle}`,
    description: study.blurb,
  };
}

export default async function AtelierStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();
  return <AtelierStudyView study={study} />;
}
