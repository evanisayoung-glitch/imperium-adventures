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
    line: "An opening that feels like land, not a product page.",
  },
  {
    slug: "or",
    variant: "knot",
    job: "Relic",
    title: "Gilt",
    line: "One object, lit as if it were in a vitrine.",
  },
  {
    slug: "nimbus",
    variant: "drift",
    job: "Weather",
    title: "Field",
    line: "Gold mist behind type — reserved, not decorative.",
  },
  {
    slug: "velours",
    variant: "champagne",
    job: "Evening",
    title: "Cloth",
    line: "Sheen and weight for houses that dress the first screen.",
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
      "A brand-led marketing site. Art-directed pages, considered type, motion with a job — not a template with your logo swapped in.",
    includes: ["5–8 pages, art-directed", "Purposeful motion", "Next.js on Vercel"],
  },
  {
    id: "signature",
    price: "$18,000",
    name: "Signature",
    summary:
      "Presence, plus one commissioned engine on the first screen: particle identity, a painting reveal, or living atmosphere.",
    includes: [
      "Everything in Presence",
      "Particle identity, painting reveal, or atmosphere",
      "Deeper art direction",
    ],
  },
  {
    id: "estate",
    price: "$50,000",
    name: "Estate",
    summary:
      "A spatial identity — Three.js threshold, multiple engines, and, when the team needs it, the operating system they open every morning.",
    includes: [
      "Everything in Signature",
      "Live 3D threshold",
      "Custom CRM / Sales OS as a scoped add-on",
    ],
  },
];

export function getBand(id?: string | null) {
  return investmentBands.find((item) => item.id === id) ?? null;
}

export const processSteps = [
  {
    title: "Discover",
    body: "The house, the launch, and the feeling the first screen must earn.",
  },
  {
    title: "Compose",
    body: "Type, atmosphere, and which engines live on the opening — approved before we build.",
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
