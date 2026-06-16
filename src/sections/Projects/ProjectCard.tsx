import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import Badge from "@/components/ui/Badge";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const STATUS_LABELS: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

const STATUS_CLASSES: Record<string, string> = {
  completed: "text-foreground/60",
  "in-progress": "text-foreground",
  planned: "text-muted-foreground",
};

/**
 * Project card: shows `project.image` when provided, otherwise falls back
 * to a decorative number/category panel. Tech badges, status, and links
 * to the repo / live demo / detail page below.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const status = project.status ?? "completed";

  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/50">
      <Link to={ROUTES.project(project.slug)} className="block">
        <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-border bg-elevated/60">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.name} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="font-display text-7xl font-bold tracking-tighter text-foreground/10 transition-transform duration-500 group-hover:scale-110 sm:text-8xl">
              {project.number}
            </span>
          )}
          <span className="absolute left-4 top-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {project.category}
          </span>
          {status !== "completed" && (
            <span
              className={cn(
                "absolute right-4 top-4 rounded-full border border-border bg-background/70 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] backdrop-blur-sm",
                STATUS_CLASSES[status],
              )}
            >
              {STATUS_LABELS[status]}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <Link
            to={ROUTES.project(project.slug)}
            className="group/title inline-flex items-start gap-2"
          >
            <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover/title:text-muted-foreground">
              {project.name}
            </h3>
            <ArrowUpRight
              className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-elevated"
            >
              <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-elevated"
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              Live
            </a>
          )}
          <Link
            to={ROUTES.project(project.slug)}
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Details
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
