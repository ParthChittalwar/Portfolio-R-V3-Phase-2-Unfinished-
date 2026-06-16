import type { Project } from "@/types";
import { site } from "@/data/site";

/**
 * Builds a JSON-LD "CreativeWork" object for a project detail page,
 * giving each /projects/:slug route its own structured data alongside
 * the site-wide Person schema in index.html.
 */
export function buildProjectJsonLd(project: Project, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.solution,
    url: `${siteUrl}/projects/${project.slug}`,
    keywords: project.tech.join(", "),
    creator: {
      "@type": "Person",
      name: site.name,
    },
    ...(project.github ? { codeRepository: project.github } : {}),
  };
}
