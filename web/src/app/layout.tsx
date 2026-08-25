import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Imperium Adventures — Commissioned websites",
    template: "%s · Imperium Adventures",
  },
  description:
    "Imperium Adventures makes websites for houses that refuse to look ordinary — from $5,000 to $50,000.",
  openGraph: {
    title: "Imperium Adventures — Commissioned websites",
    description:
      "Websites that refuse to look ordinary. Living openings. Five to fifty thousand.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void text-ivory">{children}</body>
    </html>
  );
}
