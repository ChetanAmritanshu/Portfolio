import { describe, expect, it } from "vitest";

import { projects } from "~/content/projects";
import { assetUrl } from "~/lib/deployment";

describe("portfolio content", () => {
  it("keeps featured project slugs unique", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("contains only the four approved featured systems", () => {
    expect(projects.map((project) => project.title)).toEqual([
      "JARVIS",
      "TicketForge",
      "Trading Square-Off System",
      "AI-Powered Sales Advisor",
    ]);
  });

  it("resolves static assets without root-relative assumptions", () => {
    expect(assetUrl("images/example.svg")).toMatch(/images\/example\.svg$/);
  });

  it("records the forensic JARVIS validation scope without overstating it", () => {
    const jarvis = projects.find((project) => project.slug === "jarvis")!;
    expect(jarvis.dossier.authorityStudy?.validation).toEqual([
      { label: "Python tests collected", value: "892" },
      { label: "Passed", value: "889", emphasis: true },
      { label: "Skipped", value: "3" },
    ]);
    expect("links" in jarvis.dossier).toBe(false);
    expect(jarvis.dossier.authorityStudy?.limitations.join(" ")).toContain("do not pass through the local ToolBroker");
  });
});
