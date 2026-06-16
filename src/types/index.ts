import type { ComponentType, SVGProps } from "react";

/**
 * Shared type definitions for the admin-friendly content system.
 *
 * Every shape here corresponds to a data file in `src/data/`. UI components
 * import data, not the other way around — to update the site's content,
 * edit the relevant file in `src/data/` and these types will keep you honest.
 */

/** Any icon component (lucide-react icons or the custom brand icons both fit this). */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** A single quick-stat shown in the Hero / About sections (e.g. "9.17 CGPA"). */
export interface SiteStat {
  value: string;
  label: string;
  description?: string;
}

/** Top-level site configuration: identity, copy, SEO defaults. */
export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  location: string;
  shortLocation: string;
  tagline: string;
  availability: string;
  /** Rotating roles shown in the hero ticker. */
  roles: string[];
  /** Bio paragraphs rendered in the About section, in order. */
  bio: string[];
  /** Short "what defines my approach" trait list shown in About. */
  traits: string[];
  stats: SiteStat[];
  seo: {
    title: string;
    description: string;
  };
}

/** A social / contact link rendered in the Nav, Contact section, and Footer. */
export interface SocialLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: IconComponent;
  /** Set true for links that should be featured prominently (e.g. primary CTA row). */
  primary?: boolean;
}

/** A group of related skills/technologies (e.g. "Frontend"). */
export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

/** A single milestone on the Engineering Journey timeline. */
export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  /** Marks the current/in-progress milestone. */
  active?: boolean;
}

/** Lifecycle status shown as a badge on project cards and detail pages. */
export type ProjectStatus = "completed" | "in-progress" | "planned";

/** A featured project, shown in the Projects section and its detail page. */
export interface Project {
  /** URL-safe identifier used for the /projects/:slug route. */
  slug: string;
  number: string;
  name: string;
  category: string;
  problem: string;
  solution: string;
  tech: string[];
  /** Optional bullet list of standout features — section is hidden if empty. */
  features?: string[];
  /** Optional bullet list of challenges/learnings — section is hidden if empty. */
  challenges?: string[];
  github?: string;
  live?: string;
  /** Optional path under src/assets/images — card/detail hero image. */
  image?: string;
  /** Optional gallery of additional screenshots — rendered if non-empty. */
  images?: string[];
  /** Lifecycle status badge. Defaults to "completed" if omitted. */
  status?: ProjectStatus;
  /** Free-form timeline string, e.g. "Jan 2026 – Mar 2026". */
  timeline?: string;
  /**
   * Open Graph / Twitter card image for this project's detail page.
   * Falls back to the site default OG image (public/og-image.png) if omitted.
   */
  ogImage?: string;
}

/** A certification or course credential. */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

/** A notable achievement, award, or recognition. */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  link?: string;
}

/**
 * A blog post. Architecture is reserved for future use — `data/blog.ts`
 * starts empty, and `/blog` + `/blog/:slug` routes render a minimal
 * "coming soon" page until posts are added. No nav link is added yet.
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
}

/** A navigation link, optionally tied to a data source that can hide it. */
export interface NavLink {
  label: string;
  href: string;
}
