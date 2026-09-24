import type { ExternalLink, Profile } from "./types";
import { assetUrl } from "~/lib/deployment";

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
  codechef: {
    rank: "4-Star",
  },
  competitiveAchievements: [
    "CodeChef Starters 255 // Rank 97 / 22K+",
    "Educational Codeforces Round 188 // Rank 342 / 30K+",
    "CodeChef Starters 253 // Rank 155 / 22K+",
    "Smart India Hackathon 2022 // Winner",
  ],
  currentMode: "Building JARVIS",
};

export const externalLinks: readonly ExternalLink[] = [
  { label: "Resume", href: assetUrl("Chetan-Amritanshu-Resume.pdf"), kind: "resume", detail: "PDF", newTab: true, ariaLabel: "Open Chetan Amritanshu resume PDF in a new tab" },
  { label: "GitHub", href: "https://github.com/ChetanAmritanshu", kind: "github", detail: "Public code", newTab: true, ariaLabel: "Open Chetan Amritanshu on GitHub" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chetan-amritanshu-1b5b2a205/", kind: "linkedin", detail: "Professional profile", newTab: true, ariaLabel: "Open Chetan Amritanshu on LinkedIn" },
  { label: "Contact", href: "mailto:chetan.amritanshu@gmail.com", kind: "email", detail: "Email", ariaLabel: "Email Chetan Amritanshu" },
  { label: "CodeChef", href: "https://www.codechef.com/users/chet1771", kind: "codechef", detail: "4-Star", newTab: true, ariaLabel: "Open Chetan Amritanshu on CodeChef" },
  { label: "Codeforces", href: "https://codeforces.com/profile/trojan1771", kind: "codeforces", detail: "Expert // 1704", newTab: true, ariaLabel: "Open Chetan Amritanshu on Codeforces" },
];
