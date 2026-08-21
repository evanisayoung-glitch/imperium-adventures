import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LivingCompass } from "@/components/LivingCompass";
import { MistCanvas } from "@/components/MistCanvas";
import { Typeforge } from "@/components/Typeforge";
import { experiments, getExperiment } from "@/lib/experiments";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return experiments.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return { title: "Experiment" };
  return {
    title: experiment.title,
    description: experiment.tagline,
  };
}

export default async function ExperimentPage({ params }: Props) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) notFound();

  return (
    <div className="bg-field px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/playground"
          className="text-xs tracking-[0.18em] uppercase text-muted transition hover:text-gold"
        >
          ← Playground
        </Link>
        <h1 className="display mt-6 text-5xl text-forest sm:text-6xl">{experiment.title}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted">{experiment.tagline}</p>

        <div className="mt-12">
          {slug === "compass" && (
            <div className="flex flex-col items-center gap-8 border border-forest/15 bg-field-warm/50 px-6 py-12 sm:py-16">
              <LivingCompass size={280} />
              <p className="max-w-md text-center text-sm text-muted">
                Press and drag on the compass with your finger, or move your pointer on desktop — the needle follows with soft magnetic ease.
              </p>
            </div>
          )}
          {slug === "mist" && <MistCanvas />}
          {slug === "typeforge" && (
            <div className="border border-forest/15 bg-field-warm/40 px-5 py-10 sm:px-8">
              <Typeforge />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
