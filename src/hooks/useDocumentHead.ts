import { useEffect } from "react";
import { site } from "@/data/site";

interface DocumentHeadOptions {
  title?: string;
  description?: string;
}

/**
 * Sets `document.title` and the `<meta name="description">` tag for the
 * current page, restoring the site defaults on unmount. Used by routed
 * pages (e.g. project detail pages) for lightweight per-page SEO without
 * pulling in a head-management library.
 */
export function useDocumentHead({ title, description }: DocumentHeadOptions = {}) {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";

    document.title = title ? `${title} — ${site.name}` : site.seo.title;
    if (meta) {
      meta.setAttribute("content", description ?? site.seo.description);
    }

    return () => {
      document.title = previousTitle;
      if (meta) meta.setAttribute("content", previousDescription);
    };
  }, [title, description]);
}
