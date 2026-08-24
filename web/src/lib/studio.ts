export const STUDIO_EMAIL = "Imperiumadventures99@gmail.com";

export const studioNeedOptions = [
  { id: "site", label: "A brand-led website" },
  { id: "first-screen", label: "A living first screen" },
  { id: "product", label: "A custom product or CRM" },
] as const;

export type StudioNeed = (typeof studioNeedOptions)[number]["id"];
