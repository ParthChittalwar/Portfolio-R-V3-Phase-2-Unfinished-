/**
 * Analytics loader — injected into <head> only when the corresponding
 * environment variable is set. Tracking is completely absent from builds
 * without the variables.
 *
 * Call `initAnalytics()` once at app startup (in main.tsx).
 *
 * Environment variables (set in .env or deployment platform):
 *   VITE_GA_MEASUREMENT_ID     — Google Analytics 4 (e.g. G-XXXXXXXXXX)
 *   VITE_CLARITY_PROJECT_ID    — Microsoft Clarity project ID
 *   VITE_PLAUSIBLE_DOMAIN      — Plausible domain (e.g. parthchittalwar.dev)
 */

function loadScript(src: string, id: string, attrs: Record<string, string> = {}): void {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.src = src;
  s.async = true;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

export function initAnalytics(): void {
  const ga = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  const clarity = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;
  const plausible = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

  // Google Analytics 4
  if (ga) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${ga}`, "ga-script");
    window.dataLayer = window.dataLayer ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", ga, { send_page_view: true });
  }

  // Microsoft Clarity
  if (clarity) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = window as any;
    c.clarity =
      c.clarity ||
      function (...a: unknown[]) {
        (c.clarity.q = c.clarity.q || []).push(a);
      };
    loadScript(`https://www.clarity.ms/tag/${clarity}`, "clarity-script");
  }

  // Plausible
  if (plausible) {
    loadScript("https://plausible.io/js/script.js", "plausible-script", {
      "data-domain": plausible,
      defer: "",
    });
  }
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
