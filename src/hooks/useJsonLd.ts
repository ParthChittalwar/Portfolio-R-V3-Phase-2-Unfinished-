import { useEffect } from "react";

/**
 * Injects a `<script type="application/ld+json">` tag into <head> with the
 * given structured-data object, removing it on unmount. Used for per-page
 * JSON-LD (e.g. project detail pages) alongside the site-wide Person schema
 * already present in index.html.
 */
export function useJsonLd(data: Record<string, unknown> | null) {
  useEffect(() => {
    if (!data) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
}
