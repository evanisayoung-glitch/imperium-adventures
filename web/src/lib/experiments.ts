export type Experiment = {
  slug: string;
  title: string;
  tagline: string;
  status: "live" | "lab";
};

export const experiments: Experiment[] = [
  {
    slug: "wordmark",
    title: "Your name, earned",
    tagline: "Gold dust that only becomes a word when a guest works for it.",
    status: "live",
  },
  {
    slug: "pomodoro",
    title: "A painting that waits",
    tagline: "A masterpiece from The Met lifts as someone stays with you.",
    status: "live",
  },
  {
    slug: "compass",
    title: "Living compass",
    tagline: "The needle follows the hand.",
    status: "live",
  },
  {
    slug: "mist",
    title: "Mountain mist",
    tagline: "Ridges hold. Weather moves. Drag the mist.",
    status: "live",
  },
  {
    slug: "typeforge",
    title: "Typeforge",
    tagline: "Headlines that feel like the house.",
    status: "live",
  },
];

export function getExperiment(slug: string) {
  return experiments.find((item) => item.slug === slug);
}
