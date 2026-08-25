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
    job: "Grove",
    title: "Grove",
    line: "A first page that feels like land — not a shop window.",
  },
  {
    slug: "or",
    variant: "knot",
    job: "Gilt",
    title: "Gilt",
    line: "One object, lit as if it were in a glass case.",
  },
  {
    slug: "nimbus",
    variant: "drift",
    job: "Field",
    title: "Field",
    line: "Soft gold weather behind the words.",
  },
  {
    slug: "velours",
    variant: "champagne",
    job: "Cloth",
    title: "Cloth",
    line: "Sheen and weight for brands that dress the first page.",
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
      "A website that looks like your brand — not a ready-made page with your logo dropped in.",
    includes: ["Five to eight pages, carefully made", "Motion with a reason", "Ready on your own address"],
  },
  {
    id: "signature",
    price: "$18,000",
    name: "Signature",
    summary:
      "Presence, plus one living first page: your name in gold dust, a painting that waits, every color you own, or cloth of light.",
    includes: [
      "Everything in Presence",
      "One living first page of your choosing",
      "Deeper art direction",
    ],
  },
  {
    id: "estate",
    price: "$50,000",
    name: "Estate",
    summary:
      "The full site: a living object on the first page, more than one of these features, and — if the team needs it — the morning book they work from.",
    includes: [
      "Everything in Signature",
      "A living object on the first page",
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
    body: "Who you are, what you are launching, and how the first page should feel.",
  },
  {
    title: "Choose",
    body: "What people see first — name, painting, color, cloth, object. You approve before we make it.",
  },
  {
    title: "Make",
    body: "The same living work you tried here, placed on your own address.",
  },
  {
    title: "Launch",
    body: "We hand it over, show you how it works, and leave room to grow later.",
  },
] as const;
