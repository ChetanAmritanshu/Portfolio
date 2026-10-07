import type { Metadata } from "next";

import { CommandEnvironment } from "~/components/CommandEnvironment";
import { ResumeDossier } from "~/components/resume/ResumeDossier";

export const metadata: Metadata = {
  title: "Resume, Decoded",
  description: "An annotated engineering resume for Chetan Amritanshu, connecting verified impact to system design and failure handling.",
  alternates: { canonical: "/Portfolio/resume/" },
};

export default function ResumePage() {
  return (
    <div className="resume-shell">
      <CommandEnvironment />
      <ResumeDossier />
    </div>
  );
}
