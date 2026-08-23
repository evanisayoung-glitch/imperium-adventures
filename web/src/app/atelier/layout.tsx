import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AtelierFrame } from "@/components/atelier/AtelierFrame";

export const metadata: Metadata = {
  title: "Atelier",
  description:
    "The Imperium Adventures cabinet — live Three.js studies finished like jewelry.",
};

export default function AtelierLayout({ children }: { children: ReactNode }) {
  return <AtelierFrame>{children}</AtelierFrame>;
}
