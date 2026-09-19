import type { ExternalLink, Profile } from "./types";

export const profile: Profile = {
  name: "Chetan Amritanshu",
  roles: [
    "Backend Engineer",
    "Distributed Systems",
    "GenAI",
    "Competitive Programmer",
  ],
  heroStatement: ["Build for a", "larger playground."],
  experience: "2.5+ years",
  location: "India",
  codeforces: {
    rank: "Expert",
    maxRating: 1704,
  },
  currentMode: "Building JARVIS",
};

// Missing destinations remain intentionally unavailable until verified links are supplied.
export const externalLinks: readonly ExternalLink[] = [
  { label: "Resume", href: null, kind: "resume" },
  { label: "GitHub", href: null, kind: "github" },
  { label: "LinkedIn", href: null, kind: "linkedin" },
  { label: "Contact", href: null, kind: "email" },
];
