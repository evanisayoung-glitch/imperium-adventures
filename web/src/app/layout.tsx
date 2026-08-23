import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Imperium Adventures — Playground & Studio",
    template: "%s · Imperium Adventures",
  },
  description:
    "Imperium Adventures LLC playground for new web features — and a showcase for client website work.",
  openGraph: {
    title: "Imperium Adventures — Playground & Studio",
    description:
      "A living studio for experiments, prototypes, and client-ready web craft.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
