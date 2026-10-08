import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EngineeringLabsSection } from "~/components/EngineeringLabsSection";
import { TelemetryStrip } from "~/components/TelemetryStrip";

describe("EngineeringLabsSection", () => {
  it("exposes both engineering environments and their public source links", () => {
    render(<EngineeringLabsSection />);

    expect(screen.getByRole("heading", { name: "Engineering Labs" })).toBeInTheDocument();

    const hld = screen.getByRole("link", { name: "Enter System Design Lab" });
    const lld = screen.getByRole("link", { name: "Enter Low Level Design Lab" });
    expect(hld).toHaveAttribute(
      "href",
      "https://chetanamritanshu.github.io/System-Design-Lab/",
    );
    expect(lld).toHaveAttribute(
      "href",
      "https://chetanamritanshu.github.io/Low-Level-Design-Lab/",
    );

    for (const link of [hld, lld]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(screen.getAllByText("50 / 50 chapters complete")).toHaveLength(2);
    expect(screen.getByText("Failure Simulation")).toBeInTheDocument();
  });

  it("renders the compact engineering telemetry strip", () => {
    render(<TelemetryStrip />);

    expect(screen.getByText("Distributed Systems")).toBeInTheDocument();
    expect(screen.getByText("50/50")).toBeInTheDocument();
    expect(screen.getByText("Expert")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
  });
});
