import type { Project } from "~/content/types";

export const PROJECT_PREVIEW_EVENT = "portfolio:project-preview";

export type ProjectPreviewDetail = Pick<Project, "slug" | "accent">;

export function dispatchProjectPreview(detail: ProjectPreviewDetail): void {
  window.dispatchEvent(
    new CustomEvent<ProjectPreviewDetail>(PROJECT_PREVIEW_EVENT, { detail }),
  );
}
