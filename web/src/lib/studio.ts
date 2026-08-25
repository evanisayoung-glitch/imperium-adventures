export const STUDIO_EMAIL = "Imperiumadventures99@gmail.com";

export const studioNeedOptions = [
  { id: "site", label: "A website for my business" },
  { id: "first-screen", label: "The first thing people see" },
  { id: "product", label: "A book for the team" },
] as const;

export type StudioNeed = (typeof studioNeedOptions)[number]["id"];
