export type Atmosphere = {
  slug: "sylva" | "or" | "nimbus" | "velours";
  variant: string;
  job: string;
  title: string;
  line: string;
};

export const atmospheres: Atmosphere[] = [
  {
    slug: "sylva",
    variant: "dusk",
    job: "Estate",
    title: "Grove",
    line: "An opening that feels like land — not a shop window.",
  },
  {
    slug: "or",
    variant: "knot",
    job: "Relic",
    title: "Gilt",
    line: "One object, lit as if it were in a glass case.",
  },
  {
    slug: "nimbus",
    variant: "drift",
    job: "Weather",
    title: "Field",
    line: "Soft gold weather behind the words.",
  },
  {
    slug: "velours",
    variant: "champagne",
    job: "Evening",
    title: "Cloth",
    line: "Sheen and weight for houses that dress the opening.",
  },
];

export function getAtmosphere(slug?: string | null) {
  return atmospheres.find((item) => item.slug === slug) ?? null;
}

export type InvestmentBand = {
  id: "presence" | "signature" | "estate";
  price: string;
  name: string;
  summary: string;
  includes: string[];
};

export const investmentBands: InvestmentBand[] = [
  {
    id: "presence",
    price: "$5,000",
    name: "Presence",
    summary:
      "A website that looks like your house — not a ready-made page with your logo dropped in.",
    includes: ["Five to eight pages, carefully made", "Motion with a reason", "Ready on your own address"],
  },
  {
    id: "signature",
    price: "$18,000",
    name: "Signature",
    summary:
      "Presence, plus one living opening: your name in gold dust, a painting that waits, every color you own, or cloth of light.",
    includes: [
      "Everything in Presence",
      "One living opening of your choosing",
      "Deeper art direction",
    ],
  },
  {
    id: "estate",
    price: "$50,000",
    name: "Estate",
    summary:
      "A full house: a living doorway, more than one opening, and — if the team needs it — the morning book they work from.",
    includes: [
      "Everything in Signature",
      "A living doorway",
      "The morning book, if you need it",
    ],
  },
];

export function getBand(id?: string | null) {
  return investmentBands.find((item) => item.id === id) ?? null;
}

export const processSteps = [
  {
    title: "Meet",
    body: "Who you are, what you are launching, and how the first moment should feel.",
  },
  {
    title: "Choose",
    body: "The opening guests see — name, painting, color, cloth, doorway. You approve before we make it.",
  },
  {
    title: "Make",
    body: "The same living work you tried here, placed on your own address.",
  },
  {
    title: "Open",
    body: "We hand it over, show you how it lives, and leave room to grow later.",
  },
] as const;
