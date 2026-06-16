import type { BlogPost } from "@/types";

/**
 * Blog posts — reserved for future use.
 *
 * `/blog` and `/blog/:slug` routes exist (see src/router/index.tsx) and
 * render a minimal "coming soon" page while this is empty. No nav link is
 * added until you decide to launch the blog. Adding posts here does not
 * automatically surface a nav link — that's a deliberate manual step when
 * you're ready.
 */
export const blogPosts: BlogPost[] = [];

/** Look up a post by its slug — used by the BlogPost page. */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
