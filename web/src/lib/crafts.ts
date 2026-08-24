export type CraftId = "identity" | "reveal" | "threshold" | "atmosphere" | "os";

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
    name: "Particle identity",
    line: "Your word exists only when a visitor earns it — gold dust, then a name.",
    band: "signature",
    need: "first-screen",
  },
  {
    id: "reveal",
    index: "02",
    name: "Painting reveal",
    line: "A Met masterpiece lifts through cotton dabs as they wait, focus, or return.",
    band: "signature",
    need: "first-screen",
  },
  {
    id: "threshold",
    index: "03",
    name: "Three.js threshold",
    line: "A spatial door — gilt, grove, cloth, weather — not a stock render.",
    band: "estate",
    need: "first-screen",
  },
  {
    id: "atmosphere",
    index: "04",
    name: "Living atmosphere",
    line: "Compass, mist, and type that answer the hand. Motion with weight.",
    band: "signature",
    need: "first-screen",
  },
  {
    id: "os",
    index: "05",
    name: "Sales OS",
    line: "When the site is not enough: the morning system your team opens first.",
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
