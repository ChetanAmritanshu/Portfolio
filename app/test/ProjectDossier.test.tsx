import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectDossier } from "~/components/dossier/ProjectDossier";
import { FailureModeMatrix } from "~/components/dossier/FailureModeMatrix";
import { findProject, projects } from "~/content/projects";

describe("project dossiers", () => {
  it("defines exactly the four approved static slugs and rejects unsupported slugs", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "jarvis", "ticketforge", "trading-square-off", "ai-sales-advisor",
    ]);
    expect(findProject("product-synchronization")).toBeUndefined();
    expect(findProject("unknown-system")).toBeUndefined();
  });

  it("renders TicketForge verified evidence and stable section anchors", () => {
    render(<ProjectDossier project={findProject("ticketforge")!} />);
    expect(screen.getAllByText("50,000").length).toBeGreaterThan(0);
    expect(screen.getAllByText("3,066.3/s").length).toBeGreaterThan(0);
    expect(screen.getAllByText("427.938 ms").length).toBeGreaterThan(0);
    expect(document.querySelector("#architecture")).toBeInTheDocument();
    expect(document.querySelector("#decisions")).toBeInTheDocument();
    expect(document.querySelector("#failure-modes")).toBeInTheDocument();
    expect(document.querySelector("#performance")).toBeInTheDocument();
    expect(document.querySelector("#results")).toBeInTheDocument();
    expect(document.querySelector("#invariants")).toBeInTheDocument();
    expect(document.querySelector("#limitations")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view source/i })).toHaveAttribute("href", "https://github.com/ChetanAmritanshu/TicketForge");
  });

  it("keeps the active and foundational JARVIS authority paths visibly distinct", () => {
    render(<ProjectDossier project={findProject("jarvis")!} />);
    expect(screen.getByRole("heading", { name: "Text is not authorization" })).toBeInTheDocument();
    expect(screen.getByText("Active Codex-backed path")).toBeInTheDocument();
    expect(screen.getAllByText("Foundational local runtime")).toHaveLength(2);
    expect(screen.getByText("Primary active path")).toBeInTheDocument();
    expect(screen.getByText("Implemented + tested // not primary")).toBeInTheDocument();
    expect(screen.getByText("JARVIS-enforced")).toBeInTheDocument();
    expect(screen.getByText("External Codex-enforced")).toBeInTheDocument();
    expect(screen.getByText("Authorization is structural, not linguistic.")).toBeInTheDocument();
    expect(document.querySelector("#technology > header")).toHaveTextContent("SECTION // 17");
    expect(document.querySelector("#limitations")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /view source/i })).not.toBeInTheDocument();
  });

  it("omits unsupported optional sections instead of fabricating them", () => {
    render(<ProjectDossier project={findProject("ai-sales-advisor")!} />);
    expect(document.querySelector("#architecture")).not.toBeInTheDocument();
    expect(document.querySelector("#failure-modes")).not.toBeInTheDocument();
    expect(screen.getAllByText("30% reduction").length).toBeGreaterThan(0);
    expect(screen.getByText("Production system // limited disclosure")).toBeInTheDocument();
    expect(screen.getByText(/intentionally omitted due to client confidentiality/i)).toBeInTheDocument();
    expect(screen.queryByText(/methodology.*pending/i)).not.toBeInTheDocument();
  });

  it("renders a semantic failure matrix with mobile labels", () => {
    render(<FailureModeMatrix failures={[{ mode: "Example failure", response: "Detailed response behavior pending." }]} />);
    const table = screen.getByRole("table", { name: /verified failure/i });
    expect(within(table).getByRole("rowheader", { name: "Example failure" })).toBeInTheDocument();
    expect(within(table).getAllByRole("columnheader")).toHaveLength(4);
    expect(within(table).getByText("Detailed response behavior pending.")).toHaveAttribute("data-label", "System response");
  });

  it("provides previous, next, and return navigation without horizontal-only semantics", () => {
    render(<ProjectDossier project={findProject("trading-square-off")!} />);
    const navigation = screen.getByRole("navigation", { name: "System dossiers" });
    expect(within(navigation).getByRole("link", { name: /ticketforge/i })).toHaveAttribute("href", "/systems/ticketforge/");
    expect(within(navigation).getByRole("link", { name: /sales advisor/i })).toHaveAttribute("href", "/systems/ai-sales-advisor/");
    expect(within(navigation).getByRole("link", { name: /return to systems/i })).toHaveAttribute("href", "/#systems");
  });
});
