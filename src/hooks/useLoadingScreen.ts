import { useEffect, useState } from "react";

const SESSION_KEY = "hasLoadedOnce";
/** Loading screen duration, kept short on purpose (500–800ms). */
const MIN_DURATION_MS = 650;

/**
 * Controls the initial loading screen.
 *
 * - Shows for a short, fixed duration (650ms) on a visitor's first page
 *   load this session.
 * - Skipped entirely on repeat visits within the same session
 *   (sessionStorage flag), since long loaders on every visit are
 *   annoying rather than premium.
 * - Skipped entirely if the user prefers reduced motion.
 */
export function useLoadingScreen(): boolean {
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return false;
    } catch {
      /* sessionStorage unavailable — show loader once, fail open */
    }
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (!isLoading) return;

    const timer = window.setTimeout(() => {
      setIsLoading(false);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        /* ignore */
      }
    }, MIN_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [isLoading]);

  return isLoading;
}
