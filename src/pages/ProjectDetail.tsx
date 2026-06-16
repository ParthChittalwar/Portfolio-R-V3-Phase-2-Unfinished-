import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import Badge from "@/components/ui/Badge";
import { getProjectBySlug, projects } from "@/data/projects";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { useJsonLd } from "@/hooks/useJsonLd";
import { buildProjectJsonLd } from "@/utils/seo";
import type { ProjectStatus } from "@/types";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

/**
 * Project detail page at /projects/:slug.
 * Features: status badge, timeline, features/challenges (hidden when empty),
 * image gallery (hidden when empty), prev/next project navigation.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug ?? "");

  useDocumentHead(
    project
      ? { title: project.name, description: project.solution }
      : { title: "Project not found" },
  );

  useJsonLd(project ? buildProjectJsonLd(project, import.meta.env.VITE_SITE_URL ?? "") : null);

  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">404</p>
        <h1 className="font-display text-3xl font-semibold">Project not found</h1>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to projects
        </Link>
      </div>
    );
  }

  const hasFeatures = (project.features?.length ?? 0) > 0;
  const hasChallenges = (project.challenges?.length ?? 0) > 0;
  const hasGallery = (project.images?.length ?? 0) > 0;
  const status = project.status ?? "completed";

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="px-6 pb-24 pt-28 lg:px-10 lg:pt-36">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Back link */}
          <Link
            to="/#projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All projects
          </Link>

          {/* Eyebrow */}
          <div className="mb-4 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span>{project.number}</span>
            <span className="h-px w-8 bg-border" />
            <span>{project.category}</span>

            {/* Status badge */}
            <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground">
              {STATUS_LABELS[status]}
            </span>

            {/* Timeline */}
            {project.timeline && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {project.timeline}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
            {project.name}
          </h1>

          {/* Tech badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {/* CTA links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
                View Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero image */}
        {project.image && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-border">
            <img
              src={project.image}
              alt={`${project.name} screenshot`}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Problem / Solution */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              The Problem
            </h2>
            <p className="text-balance leading-relaxed text-muted-foreground">{project.problem}</p>
          </section>
          <section>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              The Solution
            </h2>
            <p className="text-balance leading-relaxed text-muted-foreground">{project.solution}</p>
          </section>
        </div>

        {/* Features */}
        {hasFeatures && (
          <section className="mt-16">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features!.map((feature, i) => (
                <li
                  key={i}
                  className="card-hover rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Challenges */}
        {hasChallenges && (
          <section className="mt-16">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Challenges &amp; Learnings
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.challenges!.map((challenge, i) => (
                <li
                  key={i}
                  className="card-hover rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm"
                >
                  {challenge}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Image gallery */}
        {hasGallery && (
          <section className="mt-16">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Screenshots
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.images!.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-border">
                  <img
                    src={src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prev / Next navigation */}
        <div className="mt-20 border-t border-border pt-8">
          <div className="flex items-center justify-between gap-4">
            {prevProject ? (
              <Link to={`/projects/${prevProject.slug}`} className="group flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <ArrowLeft className="mr-1 inline h-3 w-3" aria-hidden="true" />
                  Previous
                </span>
                <span className="font-display text-lg font-semibold transition-colors group-hover:text-muted-foreground">
                  {prevProject.name}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-end gap-1"
              >
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Next
                  <ArrowRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
                </span>
                <span className="font-display text-lg font-semibold transition-colors group-hover:text-muted-foreground">
                  {nextProject.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
