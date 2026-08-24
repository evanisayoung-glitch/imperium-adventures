import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LivingCompass } from "@/components/LivingCompass";
import { MistCanvas } from "@/components/MistCanvas";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { Typeforge } from "@/components/Typeforge";
import { WordmarkLab } from "@/components/WordmarkLab";
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
    <section className="bg-field px-6 pb-32 pt-36 text-ink md:px-12">
      <div className="mx-auto max-w-[1100px]">
        <Link href="/playground" className="link-quiet text-[15px] text-muted">
          Lab
        </Link>
        <h1 className="display mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] tracking-tight">
          {experiment.title}
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">{experiment.tagline}</p>

        <div className="mt-16">
          {slug === "wordmark" && <WordmarkLab />}
          {slug === "compass" && (
            <div className="flex flex-col items-center gap-8 py-10">
              <LivingCompass size={280} />
              <p className="max-w-md text-center text-[15px] text-muted">
                Drag the needle. It follows with magnetic ease.
              </p>
            </div>
          )}
          {slug === "mist" && <MistCanvas />}
          {slug === "typeforge" && <Typeforge />}
          {slug === "pomodoro" && <PomodoroTimer />}
        </div>
      </div>
    </section>
  );
}
