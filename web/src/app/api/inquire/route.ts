import { NextResponse } from "next/server";
import { getAtmosphere, getBand } from "@/lib/possibility";
import { STUDIO_EMAIL, studioNeedOptions, type StudioNeed } from "@/lib/studio";

type Body = {
  name?: string;
  company?: string;
  url?: string;
  need?: string;
  band?: string;
  study?: string;
  word?: string;
  note?: string;
};

function isNeed(value: string | undefined): value is StudioNeed {
  return studioNeedOptions.some((item) => item.id === value);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid brief." }, { status: 400 });
  }

  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: "A name is required." }, { status: 400 });
  }

  const need = isNeed(body.need) ? body.need : "site";
  const needLabel = studioNeedOptions.find((item) => item.id === need)?.label ?? "A brand-led website";
  const band = getBand(body.band);
  const atmosphere = getAtmosphere(body.study);
  const word = body.word?.trim().toUpperCase() ?? "";

  const subject = [
    "Commission inquiry",
    atmosphere ? `— ${atmosphere.title}` : "",
    band ? `— ${band.name}` : "",
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const lines = [
    `Name: ${name}`,
    `Company: ${body.company?.trim() || "—"}`,
    `Site: ${body.url?.trim() || "—"}`,
    `Need: ${needLabel}`,
    `Band: ${band ? `${band.price} — ${band.name}` : "Not sure yet"}`,
    `Atmosphere: ${atmosphere ? `${atmosphere.title} (${atmosphere.job})` : "Not sure"}`,
    `Brand word: ${word || "—"}`,
    "",
    body.note?.trim() || "(no note)",
  ];

  const mailto = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

  return NextResponse.json({ mailto });
}
