export type Experiment = {
  slug: string;
  title: string;
  tagline: string;
  status: "live" | "lab";
};

export const experiments: Experiment[] = [
  {
    slug: "compass",
    title: "Living Compass",
    tagline: "Pointer tracking with soft magnetic ease — brand motion in the wild.",
    status: "live",
  },
  {
    slug: "mist",
    title: "Mountain Mist",
    tagline: "Layered peaks and mist you can grab and drag — clear parallax on touch and mouse.",
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
