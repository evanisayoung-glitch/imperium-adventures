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
  title: "Custom CRM Builds",
  description:
    "Imperium Adventures builds custom CRMs and sales operating systems. Explore detailed Find, Close, Grow, and Win features from Finti Sales OS.",
  openGraph: {
    title: "Custom CRM Builds · Imperium Adventures",
    description:
      "Purpose-built sales operating systems. Detailed feature pages for Find, Close, Grow, and Win — engineered by Imperium Adventures.",
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
