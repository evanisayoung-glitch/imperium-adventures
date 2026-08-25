export type CraftId =
  | "identity"
  | "reveal"
  | "spectrum"
  | "silk"
  | "threshold"
  | "atmosphere"
  | "os";

export type Craft = {
  id: CraftId;
  index: string;
  name: string;
  line: string;
  band: "signature" | "estate";
  need: "first-screen" | "product";
};

export const crafts: Craft[] = [
  {
    id: "identity",
    index: "01",
    name: "Your name, earned",
    line: "Gold dust. People have to work a little before your word appears.",
    band: "signature",
    need: "first-screen",
  },
  {
    id: "reveal",
    index: "02",
    name: "A painting that waits",
    line: "A masterpiece from The Met lifts, slowly, while someone stays with you.",
    band: "signature",
    need: "first-screen",
  },
  {
    id: "spectrum",
    index: "03",
    name: "Every color you own",
    line: "A living rainbow. Move a hand and your brand finds its color — rose, saffron, jade, indigo.",
    band: "signature",
    need: "first-screen",
  },
  {
    id: "silk",
    index: "04",
    name: "Cloth of light",
    line: "Shot silk that shifts as they pass — evening rose, morning gold, deep teal.",
    band: "signature",
    need: "first-screen",
  },
  {
    id: "threshold",
    index: "05",
    name: "A living object",
    line: "One object on the first page, lit like jewelry. No stock photograph.",
    band: "estate",
    need: "first-screen",
  },
  {
    id: "atmosphere",
    index: "06",
    name: "Weather that answers",
    line: "A compass that follows. Mist you can pull. The page feels the hand.",
    band: "signature",
    need: "first-screen",
  },
  {
    id: "os",
    index: "07",
    name: "The morning book",
    line: "When the website is not enough: the desk your people open first.",
    band: "estate",
    need: "product",
  },
];

export function getCraft(id?: string | null) {
  return crafts.find((item) => item.id === id) ?? null;
}

export function inquireHref(craft: Craft, extras?: { word?: string; study?: string }) {
  const params = new URLSearchParams({
    craft: craft.id,
    need: craft.need,
    band: craft.band,
  });
  if (extras?.word) params.set("word", extras.word);
  if (extras?.study) params.set("study", extras.study);
  return `/inquire?${params.toString()}`;
}
