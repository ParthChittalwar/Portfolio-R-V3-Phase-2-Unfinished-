import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Copies dist/index.html to dist/404.html.
 *
 * GitHub Pages serves `404.html` for any unmatched route. Since this is a
 * client-side-routed SPA, serving a copy of `index.html` lets React Router
 * take over and render the correct page — fixing "404 on refresh" for deep
 * links like /projects/some-project on GitHub Pages.
 *
 * This is harmless on Vercel / Netlify / Cloudflare Pages, which already
 * have their own rewrite rules (vercel.json, netlify.toml, public/_redirects).
 */
const dist = resolve(process.cwd(), "dist");
const indexHtml = resolve(dist, "index.html");
const notFoundHtml = resolve(dist, "404.html");

if (existsSync(indexHtml)) {
  copyFileSync(indexHtml, notFoundHtml);
  console.log("[postbuild] Copied dist/index.html -> dist/404.html for GitHub Pages SPA fallback.");
} else {
  console.warn("[postbuild] dist/index.html not found — skipping 404.html copy.");
}
