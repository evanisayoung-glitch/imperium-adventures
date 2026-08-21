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
    tagline: "Dots that only form your brand when a visitor earns it — a client-ready field.",
    status: "live",
  },
  {
    slug: "compass",
    title: "Living Compass",
    tagline: "Pointer tracking with soft magnetic ease — brand motion in the wild.",
    status: "live",
  },
  {
    slug: "mist",
    title: "Mountain Mist",
    tagline: "Fixed mountain ridgelines with mist you can grab and drag.",
    status: "live",
  },
  {
    slug: "typeforge",
    title: "Typeforge",
    tagline: "Live display type playground for headlines that feel like Imperium.",
    status: "live",
  },
];

export function getExperiment(slug: string) {
  return experiments.find((item) => item.slug === slug);
}
