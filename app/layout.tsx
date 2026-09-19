import type { Metadata } from "next";

import { AudioProvider } from "~/audio/AudioProvider";
import { BootSequence } from "~/boot/BootSequence";

import "./styles/global.css";

export const metadata: Metadata = {
  title: {
    default: "Chetan Amritanshu — Backend & Distributed Systems Engineer",
    template: "%s — Chetan Amritanshu",
  },
  description:
    "Portfolio of Chetan Amritanshu, a backend engineer working across distributed systems, GenAI, and high-concurrency platforms.",
  openGraph: {
    title: "Chetan Amritanshu — Engineering Command Interface",
    description:
      "Backend engineering, distributed systems, GenAI, and failure-driven system design.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
