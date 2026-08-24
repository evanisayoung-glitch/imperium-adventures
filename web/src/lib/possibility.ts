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
    title: "Your grove",
    line: "An opening that feels like an estate, not a product page.",
  },
  {
    slug: "or",
    variant: "knot",
    job: "Relic",
    title: "Your gilt object",
    line: "A single object, lit as if it were in a vitrine — photography you do not need.",
  },
  {
    slug: "nimbus",
    variant: "drift",
    job: "Atmosphere",
    title: "Your field",
    line: "Gold mist behind type, a booking form, anything that should feel reserved.",
  },
  {
    slug: "velours",
    variant: "champagne",
    job: "Evening",
    title: "Your cloth",
    line: "Sheen and weight for houses that dress the first screen.",
  },
];

export const homeAtmospheres = atmospheres.slice(0, 3);

export function getAtmosphere(slug?: string | null) {
  return atmospheres.find((item) => item.slug === slug) ?? null;
}

export type InvestmentBand = {
  id: "presence" | "signature" | "estate";
  price: string;
  name: string;
  summary: string;
  includes: string[];
  tone: "field" | "forest" | "void";
};

export const investmentBands: InvestmentBand[] = [
  {
    id: "presence",
    price: "$5,000",
    name: "Presence",
    summary: "A brand-led marketing site that looks like your company — not a template with a logo swapped in.",
    includes: [
      "5–8 pages, art-directed",
      "Motion with purpose",
      "Next.js on Vercel",
    ],
    tone: "field",
  },
  {
    id: "signature",
    price: "$18,000",
    name: "Signature",
    summary: "Presence, plus a commissioned first screen — particle identity or a live Three.js threshold.",
    includes: [
      "Everything in Presence",
      "Custom first screen",
      "Deeper art direction",
    ],
    tone: "forest",
  },
  {
    id: "estate",
    price: "$50,000",
    name: "Estate",
    summary: "A spatial identity and, when you need it, the operating system your team opens every morning.",
    includes: [
      "Everything in Signature",
      "Full 3D threshold or product surface",
      "Custom CRM / Sales OS as a scoped add-on",
    ],
    tone: "void",
  },
];

export function getBand(id?: string | null) {
  return investmentBands.find((item) => item.id === id) ?? null;
}

export const processSteps = [
  {
    title: "Discover",
    body: "Brand, launch goal, and the feeling the first screen must earn.",
  },
  {
    title: "Compose",
    body: "Atmosphere, type, and motion — a direction you can approve before we build.",
  },
  {
    title: "Build",
    body: "Next.js on Vercel. The live craft you tried here, installed on your domain.",
  },
  {
    title: "Launch",
    body: "Handoff, training if you need it, and room to grow the house later.",
  },
] as const;

export const shippedSurfaces = [
  {
    title: "A marketing site",
    body: "Pages that feel like your company. Quiet chrome, one idea per screen.",
  },
  {
    title: "A living identity",
    body: "Your word, type, and palette — earned in the field, then shipped behind your copy.",
  },
  {
    title: "An operating product",
    body: "When the site is not enough: a custom CRM or sales OS, scoped as its own commission.",
    href: "/crm",
  },
] as const;
