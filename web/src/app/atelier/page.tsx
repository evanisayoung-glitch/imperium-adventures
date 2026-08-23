import { AtelierBrowse } from "@/components/atelier/AtelierBrowse";
import { filterStudies, studies } from "@/lib/atelier";

type PageProps = {
  searchParams: Promise<{ family?: string }>;
};

export default async function AtelierPage({ searchParams }: PageProps) {
  const { family } = await searchParams;
  const collection = family ? filterStudies(family) : studies;

  return <AtelierBrowse studies={collection} family={family ?? "all"} />;
}
