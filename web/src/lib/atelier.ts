export const atelierFamilies = ["worlds", "relics", "fields", "motion"] as const;

export type AtelierFamily = (typeof atelierFamilies)[number];

export type AtelierVariant = {
  id: string;
  label: string;
};

export type AtelierStudy = {
  slug: string;
  edition: string;
  title: string;
  subtitle: string;
  family: AtelierFamily;
  tags: string[];
  blurb: string;
  statement: string;
  variants: AtelierVariant[];
};

export const studies: AtelierStudy[] = [
  {
    slug: "sylva",
    edition: "01",
    title: "Sylva",
    subtitle: "Living Green",
    family: "worlds",
    tags: ["three.js", "world", "forest"],
    blurb: "A private grove. Gold pollen, deep canopy, a camera that never hurries.",
    statement:
      "Commissioned as a living threshold. The grove is procedural — no textures, no stock trees — only geometry, fog, and a measured orbit. Built for houses that want their first screen to feel like an estate, not a product.",
    variants: [
      { id: "dusk", label: "Dusk" },
      { id: "midnight", label: "Midnight" },
      { id: "champagne", label: "Champagne" },
    ],
  },
  {
    slug: "or",
    edition: "02",
    title: "Or",
    subtitle: "Champagne Sculpture",
    family: "relics",
    tags: ["three.js", "metal", "object"],
    blurb: "A gilt relic turning in a black room. Metal that reads as money.",
    statement:
      "A single object, lit as if it were in a vitrine. High metalness, restrained roughness, champagne rather than brass. The kind of hero that replaces photography when a brand cannot afford to look ordinary.",
    variants: [
      { id: "knot", label: "Knot" },
      { id: "star", label: "Star" },
      { id: "ring", label: "Ring" },
    ],
  },
  {
    slug: "nimbus",
    edition: "03",
    title: "Nimbus",
    subtitle: "Gold Mist",
    family: "fields",
    tags: ["three.js", "particles", "field"],
    blurb: "Motes of gold in a void. Atmosphere as architecture.",
    statement:
      "A field, not a scene. Thousands of points drift on a slow curl — champagne, never neon. Use it behind type, behind a booking form, behind anything that should feel reserved.",
    variants: [
      { id: "drift", label: "Drift" },
      { id: "constellation", label: "Constellation" },
      { id: "veil", label: "Veil" },
    ],
  },
  {
    slug: "rose",
    edition: "04",
    title: "Rose",
    subtitle: "Gilt Compass",
    family: "relics",
    tags: ["three.js", "instrument", "gold"],
    blurb: "A compass that follows the hand. Navigation as jewelry.",
    statement:
      "The house instrument. A gilt rose with a needle that tracks the pointer — the same magnetic ease as the living compass, recast as a three-dimensional object you could almost lift from the table.",
    variants: [
      { id: "gilt", label: "Gilt" },
      { id: "enamel", label: "Enamel" },
      { id: "ivory", label: "Ivory" },
    ],
  },
  {
    slug: "velours",
    edition: "05",
    title: "Velours",
    subtitle: "Draped Silk",
    family: "fields",
    tags: ["three.js", "cloth", "sheen"],
    blurb: "Cloth that behaves like evening wear. Sheen, weight, no fabric maps.",
    statement:
      "A plane of silk, displaced in the vertex shader and finished with physical sheen. No photographs of fabric — only light deciding what the cloth is worth.",
    variants: [
      { id: "champagne", label: "Champagne" },
      { id: "ink", label: "Ink" },
      { id: "forest", label: "Forest" },
    ],
  },
  {
    slug: "halo",
    edition: "06",
    title: "Halo",
    subtitle: "Portal Ring",
    family: "worlds",
    tags: ["three.js", "portal", "light"],
    blurb: "A ring of light held in a night sky. Arrival, not animation.",
    statement:
      "A ceremonial aperture. Gold torus, inner glow, a field of distant stars. Designed as an entrance — the moment before a collection, a booking, a private room.",
    variants: [
      { id: "night", label: "Night" },
      { id: "eclipse", label: "Eclipse" },
      { id: "dawn", label: "Dawn" },
    ],
  },
  {
    slug: "sablier",
    edition: "07",
    title: "Sablier",
    subtitle: "Hourglass",
    family: "motion",
    tags: ["three.js", "time", "gold"],
    blurb: "Time, poured in gold. A study in patience.",
    statement:
      "Two vessels, a throat of light, and a fall of gilt grains. Motion here is slow on purpose — luxury is the refusal to rush the visitor.",
    variants: [
      { id: "pour", label: "Pour" },
      { id: "still", label: "Still" },
      { id: "reverse", label: "Reverse" },
    ],
  },
  {
    slug: "blason",
    edition: "08",
    title: "Blason",
    subtitle: "House Crest",
    family: "relics",
    tags: ["three.js", "heraldry", "enamel"],
    blurb: "A shield in forest enamel and gold. Identity you can orbit.",
    statement:
      "The Imperium crest recast as a relief. Forest enamel, gold rim, a rose at the heart. For marques that still believe a house should have arms.",
    variants: [
      { id: "enamel", label: "Enamel" },
      { id: "gilt", label: "Full gilt" },
      { id: "nocturne", label: "Nocturne" },
    ],
  },
];

export const familyCopy: Record<AtelierFamily, { label: string; countHint: string }> = {
  worlds: { label: "Worlds", countHint: "estates" },
  relics: { label: "Relics", countHint: "objects" },
  fields: { label: "Fields", countHint: "atmospheres" },
  motion: { label: "Motion", countHint: "studies" },
};

export function getStudy(slug: string) {
  return studies.find((item) => item.slug === slug);
}

export function filterStudies(family?: string, query?: string) {
  const needle = query?.trim().toLowerCase() ?? "";
  return studies.filter((item) => {
    const familyOk = !family || family === "all" || item.family === family;
    if (!familyOk) return false;
    if (!needle) return true;
    const haystack = [item.title, item.subtitle, item.family, ...item.tags].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

export function familyCounts() {
  return atelierFamilies.map((family) => ({
    family,
    label: familyCopy[family].label,
    count: studies.filter((item) => item.family === family).length,
  }));
}
