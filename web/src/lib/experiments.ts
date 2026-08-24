export type Experiment = {
  slug: string;
  title: string;
  tagline: string;
  status: "live" | "lab";
};

export const experiments: Experiment[] = [
  {
    slug: "wordmark",
    title: "Particle Wordmark",
    tagline: "The identity engine — dots that only form a brand when a visitor earns it.",
    status: "live",
  },
  {
    slug: "pomodoro",
    title: "Painting Reveal",
    tagline: "The patience engine — a Met masterpiece lifts as someone waits or focuses.",
    status: "live",
  },
  {
    slug: "compass",
    title: "Living Compass",
    tagline: "Pointer tracking with magnetic ease — atmosphere that answers the hand.",
    status: "live",
  },
  {
    slug: "mist",
    title: "Mountain Mist",
    tagline: "Ridgelines hold. Weather moves. Drag the mist.",
    status: "live",
  },
  {
    slug: "typeforge",
    title: "Typeforge",
    tagline: "Live display type for headlines that feel like the house.",
    status: "live",
  },
];

export function getExperiment(slug: string) {
  return experiments.find((item) => item.slug === slug);
}
