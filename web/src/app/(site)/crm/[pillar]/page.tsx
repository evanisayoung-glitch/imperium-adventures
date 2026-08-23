import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CrmFeatureCta,
  CrmFeatureDetails,
  CrmFeatureHero,
  CrmFeatureSteps,
  CrmSiblingPillars,
} from "@/components/crm/CrmFeaturePage";
import { getPillar, pillarKeys } from "@/lib/crm-features";

type Props = {
  params: Promise<{ pillar: string }>;
};

export function generateStaticParams() {
  return pillarKeys.map((pillar) => ({ pillar }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar: key } = await params;
  const pillar = getPillar(key);
  if (!pillar) return { title: "CRM feature" };

  return {
    title: `${pillar.title} · Custom CRM`,
    description: pillar.lede,
    openGraph: {
      title: `${pillar.title} · Imperium Adventures CRM`,
      description: pillar.lede,
      type: "website",
    },
  };
}

export default async function CrmPillarPage({ params }: Props) {
  const { pillar: key } = await params;
  const pillar = getPillar(key);
  if (!pillar) notFound();

  return (
    <>
      <CrmFeatureHero pillar={pillar} />
      <CrmFeatureDetails pillar={pillar} />
      <CrmFeatureSteps pillar={pillar} />
      <CrmSiblingPillars current={pillar.key} />
      <CrmFeatureCta pillar={pillar} />
    </>
  );
}
