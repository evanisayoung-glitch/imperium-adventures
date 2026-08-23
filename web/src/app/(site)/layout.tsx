import type { ReactNode } from "react";
import { ParticleField } from "@/components/ParticleField";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-field text-ink">
      <ParticleField>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </ParticleField>
    </div>
  );
}
