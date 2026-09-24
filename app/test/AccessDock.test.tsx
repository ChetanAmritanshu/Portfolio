import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AccessDock } from "~/components/AccessDock";

describe("AccessDock", () => {
  it("renders verified public destinations with safe external-link behavior", () => {
    render(<AccessDock />);

    for (const accessibleName of [
      "Open Chetan Amritanshu on GitHub",
      "Open Chetan Amritanshu on LinkedIn",
      "Open Chetan Amritanshu on CodeChef",
      "Open Chetan Amritanshu on Codeforces",
    ]) {
      const link = screen.getByRole("link", { name: accessibleName });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(screen.getByRole("link", { name: /resume PDF/i })).toHaveAttribute(
      "href",
      "/Chetan-Amritanshu-Resume.pdf",
    );
    expect(screen.getByRole("link", { name: /email Chetan/i })).toHaveAttribute(
      "href",
      "mailto:chetan.amritanshu@gmail.com",
    );
    expect(screen.getByText("Codeforces Expert // CodeChef 4-Star")).toBeInTheDocument();
  });
});
