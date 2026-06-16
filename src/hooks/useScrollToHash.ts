import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Smooth-scrolls to the element matching `location.hash` whenever it
 * changes — including after navigating from a different route (e.g.
 * clicking "Contact" while on a /projects/:slug page navigates home
 * and then scrolls to #contact).
 */
export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Navigating to a plain route (no hash): scroll to top.
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = hash.replace("#", "");
    // Wait a tick for the target route's content to render.
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [hash, pathname]);
}
