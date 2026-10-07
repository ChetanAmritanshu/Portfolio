import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";

import { AudioProvider } from "~/audio/AudioProvider";
import { BootSequence } from "~/boot/BootSequence";

import "./styles/global.css";

const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chetanamritanshu.github.io"),
  title: {
    default: "Chetan Amritanshu — Backend & Distributed Systems Engineer",
    template: "%s — Chetan Amritanshu",
  },
  description:
    "Engineering portfolio of Chetan Amritanshu: backend systems, distributed systems, Golang, GenAI, and system-design labs.",
  alternates: {
    canonical: "/Portfolio/",
  },
  openGraph: {
    title: "Chetan Amritanshu — Engineering Command Interface",
    description:
      "Backend engineering, distributed systems, Golang, GenAI, and hands-on system-design labs.",
    siteName: "Chetan Amritanshu — Engineering Portfolio",
    type: "website",
    url: "/Portfolio/",
  },
  twitter: {
    card: "summary",
    title: "Chetan Amritanshu — Backend & Distributed Systems Engineer",
    description:
      "Production systems, distributed systems, Golang, GenAI, and engineering design labs.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      lang="en"
    >
      <body>
        <AudioProvider>
          <BootSequence />
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
