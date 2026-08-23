import { NextRequest, NextResponse } from "next/server";

const MET_API = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function GET(request: NextRequest) {
  const objectId = request.nextUrl.searchParams.get("objectId");
  if (!objectId || !/^\d+$/.test(objectId)) {
    return NextResponse.json({ error: "Invalid objectId" }, { status: 400 });
  }

  try {
    const metaResponse = await fetch(`${MET_API}/objects/${objectId}`, {
      next: { revalidate: 86_400 },
    });
    if (!metaResponse.ok) {
      return NextResponse.json({ error: "Object not found" }, { status: 404 });
    }

    const meta = (await metaResponse.json()) as {
      isPublicDomain: boolean;
      primaryImage: string;
      primaryImageSmall: string;
    };

    if (!meta.isPublicDomain) {
      return NextResponse.json({ error: "Not public domain" }, { status: 403 });
    }

    const imageUrl = meta.primaryImageSmall || meta.primaryImage;
    if (!imageUrl) {
      return NextResponse.json({ error: "No image" }, { status: 404 });
    }

    const imageResponse = await fetch(imageUrl, {
      next: { revalidate: 86_400 },
    });
    if (!imageResponse.ok) {
      return NextResponse.json({ error: "Image fetch failed" }, { status: 502 });
    }

    const buffer = await imageResponse.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": imageResponse.headers.get("Content-Type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
