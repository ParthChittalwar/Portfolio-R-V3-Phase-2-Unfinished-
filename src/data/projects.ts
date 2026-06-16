import type { Project } from "@/types";

/**
 * Featured projects, rendered by the Projects section and individual
 * /projects/:slug detail pages.
 *
 * To add a project: append an object with a unique `slug` (used in the
 * URL), `number` (display index), and the fields below.
 *
 * Optional fields (omit/leave empty and the related UI hides itself):
 *  - `features` / `challenges` — string arrays for the detail page.
 *  - `image` — card/detail hero image (import from src/assets/images).
 *  - `images` — additional screenshots for a gallery on the detail page.
 *  - `status` — "completed" | "in-progress" | "planned" (defaults to "completed").
 *  - `timeline` — free-form date range, e.g. "Jan 2026 – Mar 2026".
 *  - `ogImage` — per-project Open Graph / Twitter card image; falls back
 *    to /og-image.png if omitted.
 *
 * Project search (Projects section) matches against `name`, `tech`, and
 * `category`/`problem`/`solution` keywords. Filters are generated from the
 * union of every project's `tech` array — add a new technology here and it
 * automatically becomes a filter option, no UI changes needed.
 */
export const projects: Project[] = [
  {
    slug: "personal-portfolio-website",
    number: "01",
    name: "Personal Portfolio Website",
    category: "Web Development",
    problem:
      "Needed a professional platform to showcase my skills, projects, and learning journey.",
    solution:
      "Built a modern portfolio website using React and modern frontend technologies with a focus on responsiveness, clean design, and user experience.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/ParthChittalwar",
    status: "in-progress",
    timeline: "2026 – Present",
    // features: [],
    // challenges: [],
    // image: "portfolio.png",
    // images: [],
    // ogImage: "portfolio-og.png",
  },
  {
    slug: "student-management-system",
    number: "02",
    name: "Student Management System",
    category: "C++ / OOP",
    problem: "Managing student records manually becomes difficult and error-prone as data grows.",
    solution:
      "Developed a C++ application using Object-Oriented Programming concepts and file handling to store, update, and manage student information.",
    tech: ["C++", "OOP", "File Handling"],
    github: "https://github.com/ParthChittalwar",
    status: "completed",
    // timeline: "",
    // features: [],
    // challenges: [],
    // image: "student-management.png",
    // images: [],
  },
  {
    slug: "responsive-web-interfaces",
    number: "03",
    name: "Responsive Web Interfaces",
    category: "Frontend",
    problem: "Web applications should work consistently across devices and screen sizes.",
    solution:
      "Created responsive frontend interfaces using HTML, CSS, and JavaScript while focusing on usability, accessibility, and clean layouts.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/ParthChittalwar",
    status: "completed",
    // timeline: "",
    // features: [],
    // challenges: [],
    // image: "responsive-ui.png",
    // images: [],
  },
];

/** Look up a project by its slug — used by the ProjectDetail page. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Unique technologies across all projects, in first-seen order — powers
 * the Projects section filter pills. Add a new `tech` entry to any project
 * above and it appears as a filter automatically.
 */
export function getProjectTechFilters(): string[] {
  const seen = new Set<string>();
  for (const project of projects) {
    for (const tech of project.tech) seen.add(tech);
  }
  return Array.from(seen);
}
