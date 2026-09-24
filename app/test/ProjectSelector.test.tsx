import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AUDIO_EVENT, type SemanticAudioEvent } from "~/audio/events";
import { ProjectSelector } from "~/components/ProjectSelector";

describe("ProjectSelector", () => {
  it("keeps hover separate from selection and updates only after a click", () => {
    render(<ProjectSelector />);
    const jarvis = screen.getByRole("tab", { name: /jarvis/i });
    const ticketforge = screen.getByRole("tab", { name: /ticketforge/i });
    const squareOff = screen.getByRole("tab", { name: /square-off/i });
    const salesAdvisor = screen.getByRole("tab", { name: /sales advisor/i });

    expect(jarvis).toHaveAttribute("aria-selected", "true");
    expect(within(screen.getByRole("tabpanel")).getByRole("heading", { name: "JARVIS" })).toBeInTheDocument();

    for (const tab of [ticketforge, squareOff, salesAdvisor]) {
      fireEvent.pointerEnter(tab);
      expect(jarvis).toHaveAttribute("aria-selected", "true");
      expect(tab).toHaveAttribute("aria-selected", "false");
      expect(within(screen.getByRole("tabpanel")).getByRole("heading", { name: "JARVIS" })).toBeInTheDocument();
    }

    fireEvent.click(ticketforge);

    expect(ticketforge).toHaveAttribute("aria-selected", "true");
    expect(jarvis).toHaveAttribute("aria-selected", "false");
    expect(within(screen.getByRole("tabpanel")).getByRole("heading", { name: "TicketForge" })).toBeInTheDocument();
    expect(screen.getByText("50,000")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open case file/i })).toHaveAttribute(
      "href",
      "/systems/ticketforge/",
    );

    fireEvent.pointerEnter(salesAdvisor);
    expect(ticketforge).toHaveAttribute("aria-selected", "true");
    expect(within(screen.getByRole("tabpanel")).getByRole("heading", { name: "TicketForge" })).toBeInTheDocument();
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

  it("emits hover audio without selection and selection audio only on activation", () => {
    const events: SemanticAudioEvent[] = [];
    const recordAudio = (event: Event) => {
      events.push((event as CustomEvent<SemanticAudioEvent>).detail);
    };
    window.addEventListener(AUDIO_EVENT, recordAudio);

    try {
      render(<ProjectSelector />);
      const jarvis = screen.getByRole("tab", { name: /jarvis/i });
      const ticketforge = screen.getByRole("tab", { name: /ticketforge/i });

      fireEvent.pointerEnter(ticketforge);

      expect(events).toEqual([{ name: "system:hover", projectSlug: "ticketforge" }]);
      expect(jarvis).toHaveAttribute("aria-selected", "true");

      fireEvent.click(ticketforge);

      expect(events).toEqual([
        { name: "system:hover", projectSlug: "ticketforge" },
        { name: "system:select", projectSlug: "ticketforge" },
      ]);
      expect(ticketforge).toHaveAttribute("aria-selected", "true");
    } finally {
      window.removeEventListener(AUDIO_EVENT, recordAudio);
    }
  });
});
