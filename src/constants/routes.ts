/**
 * Centralized route paths. Import these instead of hardcoding strings
 * so route changes only need to happen in one place.
 */
export const ROUTES = {
  home: "/",
  project: (slug: string) => `/projects/${slug}`,
  projectPattern: "/projects/:slug",
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  blogPostPattern: "/blog/:slug",
} as const;
