import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AgentOrchestrationPreview } from "~/components/lab/AgentOrchestrationPreview";

afterEach(() => vi.useRealTimers());

describe("AgentOrchestrationPreview", () => {
  it("runs a deterministic workflow through completion", () => {
    vi.useFakeTimers();
    render(<AgentOrchestrationPreview />);

    const run = screen.getByRole("button", { name: "Run workflow" });
    fireEvent.click(run);

    expect(screen.getByRole("button", { name: "Pause simulation" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Request received")).toBeInTheDocument();

    for (let index = 0; index < 7; index += 1) {
      act(() => vi.advanceTimersByTime(820));
    }

    expect(screen.getByRole("button", { name: "Replay workflow" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Response complete")).toBeInTheDocument();
    expect(screen.getByText(/grounded final response is ready/i)).toBeInTheDocument();
  });

  it("exposes the orchestration description and all workflow phases", () => {
    render(<AgentOrchestrationPreview />);

    expect(screen.getByRole("group", { name: "Interactive Agent Orchestration Network" })).toBeInTheDocument();
    for (const phase of ["planning", "execution", "observation", "complete"]) {
      expect(screen.getByText(phase)).toBeInTheDocument();
    }
  });
});
