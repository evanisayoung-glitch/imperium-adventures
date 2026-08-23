export type MetPainting = {
  objectId: number;
  title: string;
  artist: string;
  year?: string;
};

export type MetObjectResponse = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate?: string;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  objectURL: string;
};

/** Curated public-domain highlights — offline fallbacks if the API is slow. */
export const curatedPaintings: MetPainting[] = [
  {
    objectId: 436535,
    title: "Wheat Field with Cypresses",
    artist: "Vincent van Gogh",
    year: "1889",
  },
  {
    objectId: 437430,
    title: "By the Seashore",
    artist: "Pierre-Auguste Renoir",
    year: "1883",
  },
  {
    objectId: 437394,
    title: "Aristotle with a Bust of Homer",
    artist: "Rembrandt",
    year: "1653",
  },
  {
    objectId: 437881,
    title: "Young Woman with a Water Pitcher",
    artist: "Johannes Vermeer",
    year: "ca. 1662",
  },
  {
    objectId: 436105,
    title: "The Dance Class",
    artist: "Edgar Degas",
    year: "1874",
  },
  {
    objectId: 436965,
    title: "Washington Crossing the Delaware",
    artist: "Emanuel Leutze",
    year: "1851",
  },
  {
    objectId: 437984,
    title: "The Harvesters",
    artist: "Pieter Bruegel the Elder",
    year: "1565",
  },
  {
    objectId: 436121,
    title: "The Love Song",
    artist: "Edward Burne-Jones",
    year: "1868–77",
  },
];

const MET_API = "https://collectionapi.metmuseum.org/public/collection/v1";

export function pickPaintingForDay(date = new Date()): MetPainting {
  const dayIndex = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
  return curatedPaintings[dayIndex % curatedPaintings.length]!;
}

export async function fetchMetObject(objectId: number): Promise<MetObjectResponse | null> {
  try {
    const response = await fetch(`${MET_API}/objects/${objectId}`);
    if (!response.ok) return null;
    const data = (await response.json()) as MetObjectResponse;
    if (!data.isPublicDomain || !data.primaryImage) return null;
    return data;
  } catch {
    return null;
  }
}

export function imageProxyUrl(objectId: number) {
  return `/api/met-image?objectId=${objectId}`;
}

export async function preloadPaintingImage(objectId: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load painting ${objectId}`));
    image.src = imageProxyUrl(objectId);
  });
}

export async function preloadAllPaintings() {
  const results = await Promise.allSettled(
    curatedPaintings.map(async (item) => {
      const [meta, image] = await Promise.all([
        fetchMetObject(item.objectId),
        preloadPaintingImage(item.objectId),
      ]);
      return { objectId: item.objectId, meta, image };
    }),
  );

  const loaded: { objectId: number; meta: MetObjectResponse | null; image: HTMLImageElement }[] = [];
  const failed: number[] = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i]!;
    const objectId = curatedPaintings[i]!.objectId;
    if (result.status === "fulfilled") {
      loaded.push(result.value);
    } else {
      failed.push(objectId);
    }
  }

  return { loaded, failed };
}
