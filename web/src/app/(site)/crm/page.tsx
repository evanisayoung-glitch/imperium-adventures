import type { Metadata } from "next";
import { CrmCommandPreview } from "@/components/crm/CrmCommandPreview";
import { CrmHero } from "@/components/crm/CrmHero";
import {
  CrmFintiShowcase,
  CrmMotionGallery,
  CrmOffer,
  CrmPillars,
  CrmPlatformFeatures,
} from "@/components/crm/CrmSections";

export const metadata: Metadata = {
  title: "The morning book",
  description:
    "Imperium Adventures makes the desk a sales team opens first. See Find, Close, Grow, and Win in Finti.",
  openGraph: {
    title: "The morning book · Imperium Adventures",
    description:
      "The desk a sales team opens first. Find, Close, Grow, and Win — made by Imperium Adventures.",
    type: "website",
  },
};

export default function CrmPage() {
  return (
    <>
      <CrmHero />
      <section className="bg-forest-deep px-5 py-10 sm:px-8 lg:hidden">
        <div className="relative z-[2] mx-auto flex max-w-lg justify-center">
          <CrmCommandPreview />
        </div>
      </section>
      <CrmFintiShowcase />
      <CrmPillars />
      <CrmMotionGallery />
      <CrmPlatformFeatures />
      <CrmOffer />
    </>
  );
}
