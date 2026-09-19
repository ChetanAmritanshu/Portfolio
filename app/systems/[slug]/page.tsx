import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDossier } from "~/components/dossier/ProjectDossier";
import { findProject, projects } from "~/content/projects";

type SystemPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project
    ? {
        title: project.title,
        description: project.summary,
        openGraph: { title: `${project.title} — Engineering System Dossier`, description: project.summary, type: "article" },
      }
    : { title: "System not found" };
}

export default async function SystemFoundation({ params }: SystemPageProps) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  return <ProjectDossier project={project} />;
}
