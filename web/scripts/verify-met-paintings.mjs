#!/usr/bin/env node

const MET_API = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

const paintings = [
  { objectId: 436535, title: "Wheat Field with Cypresses" },
  { objectId: 437430, title: "By the Seashore" },
  { objectId: 437394, title: "Aristotle with a Bust of Homer" },
  { objectId: 437881, title: "Young Woman with a Water Pitcher" },
  { objectId: 436105, title: "The Dance Class" },
  { objectId: 436965, title: "Washington Crossing the Delaware" },
  { objectId: 437984, title: "The Harvesters" },
  { objectId: 436121, title: "The Love Song" },
];

async function verify(objectId, title) {
  const response = await fetch(`${MET_API}/${objectId}`);
  if (!response.ok) {
    throw new Error(`${title} (${objectId}): Met API ${response.status}`);
  }
  const data = await response.json();
  if (!data.isPublicDomain) {
    throw new Error(`${title} (${objectId}): not public domain`);
  }
  if (!data.primaryImage && !data.primaryImageSmall) {
    throw new Error(`${title} (${objectId}): no image URL`);
  }
  const imageUrl = data.primaryImageSmall || data.primaryImage;
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`${title} (${objectId}): image fetch ${imageResponse.status}`);
  }
  return { objectId, title, bytes: Number(imageResponse.headers.get("content-length") ?? 0) };
}

async function main() {
  console.log(`Verifying ${paintings.length} Met paintings…`);
  const results = await Promise.all(paintings.map((p) => verify(p.objectId, p.title)));
  for (const item of results) {
    const size = item.bytes ? `${Math.round(item.bytes / 1024)} KB` : "ok";
    console.log(`  ✓ ${item.title} (${item.objectId}) — ${size}`);
  }
  console.log(`All ${results.length} paintings verified.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
