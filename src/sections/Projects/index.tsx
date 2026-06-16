import { useMemo, useState } from "react";
import Section from "@/components/layout/Section";
import Stagger from "@/components/animations/Stagger";
import ProjectCard from "./ProjectCard";
import ProjectFilters from "./ProjectFilters";
import { projects, getProjectTechFilters } from "@/data/projects";

const techFilters = getProjectTechFilters();

/** Search terms matched against these project fields (case-insensitive). */
function matchesQuery(project: (typeof projects)[number], query: string): boolean {
  const q = query.toLowerCase();
  return (
    project.name.toLowerCase().includes(q) ||
    project.category.toLowerCase().includes(q) ||
    project.tech.some((t) => t.toLowerCase().includes(q)) ||
    project.problem.toLowerCase().includes(q) ||
    project.solution.toLowerCase().includes(q)
  );
}

/**
 * Featured Projects section with live search and technology filter pills.
 * Both are driven by `src/data/projects.ts` — add a project and its tech
 * tags automatically appear as filters. No hardcoded categories.
 */
export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const visible = useMemo(() => {
    return projects.filter((p) => {
      const tagMatch = activeTag === null || p.tech.includes(activeTag);
      const queryMatch = query.trim() === "" || matchesQuery(p, query);
      return tagMatch && queryMatch;
    });
  }, [query, activeTag]);

  return (
    <Section id="projects" index="04" label="Projects" title="A few things I've built.">
      <ProjectFilters
        query={query}
        onQueryChange={setQuery}
        tags={techFilters}
        activeTag={activeTag}
        onTagChange={setActiveTag}
      />

      {visible.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No projects match your search.{" "}
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTag(null);
            }}
            className="underline hover:text-foreground"
          >
            Clear filters
          </button>
        </p>
      ) : (
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <Stagger.Item key={project.slug}>
              <ProjectCard project={project} />
            </Stagger.Item>
          ))}
        </Stagger>
      )}
    </Section>
  );
}
