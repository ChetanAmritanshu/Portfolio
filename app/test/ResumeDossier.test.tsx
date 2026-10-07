import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResumeDossier } from "~/components/resume/ResumeDossier";

describe("ResumeDossier", () => {
  it("defaults to recruiter mode and preserves direct PDF access", () => {
    render(<ResumeDossier />);

    expect(screen.getByRole("button", { name: "Recruiter mode" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "View original PDF" })).toHaveAttribute(
      "href",
      "/Chetan-Amritanshu-Resume.pdf",
    );
    expect(screen.getByRole("link", { name: "Download" })).toHaveAttribute(
      "download",
      "Chetan-Amritanshu-Resume.pdf",
    );
  });

  it("switches annotation depth and pins a selected resume bullet", () => {
    render(<ResumeDossier />);

    fireEvent.click(screen.getByRole("button", { name: "Engineer mode" }));
    expect(screen.getByRole("button", { name: "Engineer mode" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryAllByText(/RabbitMQ decouples intake from processing/i)).toHaveLength(0);

    const eventBullet = screen.getByRole("button", { name: /Architected RabbitMQ-driven event workflows/i });
    fireEvent.click(eventBullet);

    expect(eventBullet).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText(/RabbitMQ decouples intake from processing/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Open Trading Square-Off dossier/i })[0]).toHaveAttribute(
      "href",
      "/systems/trading-square-off",
    );
  });

  it("surfaces verified metrics when impact mode is enabled", () => {
    render(<ResumeDossier />);

    const impactToggle = screen.getByRole("button", { name: "Impact off" });
    fireEvent.click(impactToggle);

    expect(screen.getByRole("button", { name: "Impact on" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText("5K+ trades/min").length).toBeGreaterThan(0);
  });
});
