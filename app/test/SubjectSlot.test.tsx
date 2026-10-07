import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SubjectSlot } from "~/components/SubjectSlot";

describe("SubjectSlot", () => {
  it("renders the verified portrait without legacy placeholder copy", () => {
    render(<SubjectSlot />);

    const portrait = screen.getByRole("img", {
      name: /Chetan Amritanshu, backend and distributed systems engineer/i,
    });

    expect(decodeURIComponent(portrait.getAttribute("src") ?? "")).toContain(
      "/images/chetan-hero-portrait.webp",
    );
    expect(screen.queryByText(/portrait asset 00/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/original artwork slot/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/replaceable/i)).not.toBeInTheDocument();
  });
});
