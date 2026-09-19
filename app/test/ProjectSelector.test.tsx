import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectSelector } from "~/components/ProjectSelector";

describe("ProjectSelector", () => {
  it("updates the evidence panel when a system is selected", () => {
    render(<ProjectSelector />);

    fireEvent.click(screen.getByRole("tab", { name: /ticketforge/i }));

    expect(screen.getByRole("heading", { name: "TicketForge" })).toBeInTheDocument();
    expect(screen.getByText("50,000")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open case file/i })).toHaveAttribute(
      "href",
      "/systems/ticketforge/",
    );
  });

  it("supports roving keyboard navigation between systems", () => {
    render(<ProjectSelector />);
    const jarvis = screen.getByRole("tab", { name: /jarvis/i });
    jarvis.focus();

    fireEvent.keyDown(jarvis, { key: "ArrowRight" });

    const ticketforge = screen.getByRole("tab", { name: /ticketforge/i });
    expect(ticketforge).toHaveFocus();
    expect(ticketforge).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("50,000")).toBeInTheDocument();
  });
});
