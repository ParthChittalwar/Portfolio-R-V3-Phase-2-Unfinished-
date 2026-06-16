# Parth Chittalwar — Portfolio (V3)

A premium, content-driven portfolio built with React 18, TypeScript, Vite,
and Tailwind CSS. Every piece of content — skills, projects, journey,
certifications, achievements, resume, and social links — lives in
`src/data/` and can be edited without touching any component.

---

## Tech stack

| Layer     | Choice                                      |
| --------- | ------------------------------------------- |
| Framework | React 18.3 + TypeScript + Vite 5            |
| Styling   | Tailwind CSS 3 (CSS-variable design tokens) |
| Animation | Framer Motion                               |
| Routing   | React Router 6                              |
| Icons     | lucide-react + custom brand SVGs            |

React is pinned to 18.3 (not 19) for ecosystem stability — see
[Decisions & roadmap](#decisions--roadmap).

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint       # ESLint
npm run format     # Prettier --write
```

The project builds and deploys with **zero additional configuration**.
Copy `.env.example` to `.env` if you want to set your real site URL (used
for SEO tags) — see [Environment variables](#environment-variables).

---

## Project structure

```
src/
├── assets/
│   ├── images/        # project screenshots (optional, see README inside)
│   ├── icons/          # reserved for custom icon assets
│   ├── documents/
│   │   └── resume.pdf  # replace this file to update your resume
│   └── models/         # reserved for Phase 2 3D assets
├── components/
│   ├── common/         # ScrollProgress, BackToTop, ThemeToggle,
│   │                    # ResumeButton, CopyButton, LoadingScreen, HeroCanvas
│   ├── layout/          # Nav, MobileMenu, Footer, Section, Layout, PageTransition
│   ├── ui/               # Badge
│   ├── animations/       # RevealText, Stagger, MagneticButton
│   ├── icons/             # Custom brand icon SVGs (GitHub, LinkedIn, etc.)
│   └── three/            # reserved for Phase 2 R3F scene
├── sections/
│   ├── Hero/  About/  Skills/  Journey/  Projects/
│   └── Certifications/  Achievements/  Contact/
├── pages/                # Home, ProjectDetail, NotFound
├── router/                # route definitions
├── hooks/                 # useTheme, useScrollSpy, useLoadingScreen, etc.
├── lib/                    # cn() class-merge utility
├── data/                   # <- EDIT CONTENT HERE (see below)
├── types/                  # shared TypeScript interfaces
├── styles/                 # globals.css (design tokens, dark + light)
├── constants/              # nav links, route paths
└── utils/                  # SEO helpers (per-page JSON-LD)
```

---

## The admin-friendly content system

**Every editable thing lives in `src/data/`.** Components only read from
these files — to update the site, edit a data file and save. No component
code needs to change.

### Skills / Tech Stack — `src/data/skills.ts`

An array of `SkillGroup` objects (`{ id, label, items }`). Add, remove, or
reorder groups and items freely; the Tech Stack section and its
"X Technologies / Y Categories" counter update automatically.

### Projects — `src/data/projects.ts`

An array of `Project` objects. Each needs a unique `slug` (used for the
`/projects/:slug` detail page), a `number`, `name`, `category`, `problem`,
`solution`, and `tech` array.

Optional fields:

- `features` / `challenges` — string arrays. If omitted or empty, those
  sections are hidden on the detail page.
- `image` — import a screenshot from `src/assets/images/` (see the README
  in that folder) and assign it here. If omitted, the card shows a
  decorative number/category panel instead.
- `github` / `live` — shown as buttons when present.

### Journey — `src/data/journey.ts`

An array of `JourneyMilestone` objects (`{ year, title, description, active? }`).
Set `active: true` on the milestone representing "right now" — only one
should be active. The timeline alternates left/right automatically based on
array order.

### Certifications — `src/data/certifications.ts`

An array of `Certification` objects. **Set this to `[]` to hide the entire
Certifications section** — its nav link disappears automatically too
(see `src/constants/navigation.ts`). The current entries are placeholders
carried over from the V2 remaster; replace them with your real
certifications (add `date` and `credentialUrl` for a verification link).

### Achievements — `src/data/achievements.ts`

Same convention as Certifications: starts as `[]`, which hides the section
and its nav link. Add an `Achievement` object (`{ id, title, description,
date?, link? }`) and the section appears automatically.

### Resume — `src/assets/documents/resume.pdf`

Replace this file with your updated resume — same filename, no code
changes needed. The `ResumeButton` component (in the nav, hero, and contact
section) automatically links to whatever is in this file, with "Open in new
tab" and "Download" actions plus a preview modal.

### Social / Contact Links — `src/data/socials.ts`

A single array of `SocialLink` objects used by the Nav, mobile menu,
Contact section, and Footer. Each entry has `id`, `label`, `value`
(display text), `href`, an `icon` component, and an optional
`primary: true` flag (controls which links appear in the Contact section's
featured grid). Reorder, add, or remove entries here — nothing else needs
to change.

### Identity, bio, and stats — `src/data/site.ts`

Your name, role, location, tagline, the Hero's rotating role ticker
(`roles`), About section bio paragraphs (`bio`), the "How I work" trait list
(`traits`), and the stat tiles (`stats`, e.g. CGPA / graduation year) all
live here, along with default SEO title/description.

### Theme

Dark mode is the default. The toggle (sun/moon icon in the nav) switches to
light mode by adding a `.light` class to `<html>`, which overrides the CSS
variables defined in `src/styles/globals.css`. To adjust the palette, edit
the variables under `:root` (dark) and `.light` in that file — every
component reads from Tailwind color utilities (`bg-background`,
`text-foreground`, `border-border`, etc.) that map to these variables, so a
single edit re-themes the whole site.

---

## Deployment

The app builds to a static `dist/` folder and is pre-configured for:

### Vercel

1. Import the repo in Vercel.
2. Framework preset: **Vite**. Build command `npm run build`, output
   directory `dist` (Vercel detects these automatically).
3. `vercel.json` already includes a rewrite so deep links like
   `/projects/personal-portfolio-website` work on refresh.
4. Add `VITE_SITE_URL` as an environment variable set to your Vercel URL
   (or custom domain) for correct SEO/OG tags.

### Netlify

1. New site from Git. `netlify.toml` already sets the build command
   (`npm run build`) and publish directory (`dist`), plus a SPA redirect.
2. Add `VITE_SITE_URL` under Site settings → Environment variables.

### Cloudflare Pages

1. Build command `npm run build`, output directory `dist`.
2. `public/_redirects` (copied into `dist/` at build time) handles SPA
   fallback automatically.
3. Add `VITE_SITE_URL` under Settings → Environment variables.

### GitHub Pages

GitHub Pages has two cases:

- **User/org site** (`username.github.io`, served from `/`): no extra
  config needed. The `postbuild` script copies `dist/index.html` to
  `dist/404.html`, so client-side routes (e.g. `/projects/...`) work on
  direct load/refresh.
- **Project site** (`username.github.io/repo-name`, served from a
  sub-path): set the `VITE_BASE_PATH` environment variable to
  `/repo-name/` when building. Both Vite's asset paths and the React
  Router `basename` derive from this automatically — no source changes.

  ```bash
  VITE_BASE_PATH=/repo-name/ npm run build
  ```

Deploy the contents of `dist/` (e.g. via the `gh-pages` branch or GitHub
Actions).

---

## Environment variables

Copy `.env.example` to `.env` and adjust:

| Variable               | Purpose                                                                                                                                           | Default                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `VITE_SITE_URL`        | Canonical URL used in `<link rel="canonical">`, Open Graph, Twitter cards, and JSON-LD.                                                           | `https://parthchittalwar.dev` |
| `VITE_GITHUB_USERNAME` | Used by the optional GitHub stats widget (Phase 2).                                                                                               | `ParthChittalwar`             |
| `VITE_BASE_PATH`       | Deployment sub-path (GitHub Pages project sites only). Read directly by `vite.config.ts` — not via `.env` for builds, pass it inline (see above). | `/`                           |

No URLs are hardcoded to `localhost` anywhere in the app.

---

## Production checklist

- [x] `npm install && npm run build` succeeds with **zero TypeScript and ESLint errors**.
- [x] No hardcoded localhost URLs; canonical/OG/Twitter/JSON-LD driven by `VITE_SITE_URL`.
- [x] SPA routing configured for Vercel, Netlify, Cloudflare Pages, and GitHub Pages.
- [x] Dark mode default, light mode toggle with persisted preference.
- [x] Reduced-motion and mobile-aware animations (Hero canvas, page transitions).
- [x] Loading screen capped at ~650ms and skipped on repeat visits / reduced motion.
- [x] Certifications and Achievements sections (and their nav links) hide automatically when their data arrays are empty.
- [ ] Replace placeholder certifications in `src/data/certifications.ts` with real credentials.
- [ ] Update `VITE_SITE_URL` to your real deployed domain.
- [ ] Optionally add project screenshots via `src/assets/images/` + `project.image`.
- [ ] Optionally add an `public/og-image.png` (1200×630) for social share previews — referenced in `index.html`.

---

## Decisions & roadmap

This is **Phase 1** of the Remaster V3 plan. Decisions made for this phase:

- **React 18.3 (not 19)**, Vite 5, Tailwind 3 — broader library compatibility
  and simpler deployment over bleeding-edge versions.
- **Skills + Tech Stack merged** into one interactive section (both would
  have shown the same data).
- **Hero ships with a lightweight 2D canvas particle field** as a
  performance-friendly placeholder for the planned React Three Fiber scene.

**Phase 2 (planned, not yet built):**

- React Three Fiber 3D hero (particle field / tech sphere, mouse parallax,
  scroll-driven camera via GSAP), with mobile/reduced-motion fallback to the
  current canvas.
- Command palette (Ctrl+K).
- Custom cursor (desktop only, auto-disabled on touch devices).
- Optional GitHub stats widget (`VITE_GITHUB_USERNAME`), with graceful
  fallback on API rate limits.
- Project filtering and search.

### Known dev-only advisory

`npm audit` reports a vulnerability in `esbuild` (via Vite 5's dependency
chain) that only affects the **local dev server** accepting requests from
other origins — it does not affect production builds. Fixing it requires
upgrading to Vite 6+/7+, which currently has broader peer-dependency churn
with the React 18 toolchain. Revisit when upgrading the stack.

---

## Phase 2 additions

All Phase 2 features are live in this build.

**Command Palette (Ctrl+K / Cmd+K)** — navigate sections, toggle theme, download resume, open social links. A trigger button sits in the desktop nav. Uses `cmdk` (~11KB gzip added to main chunk).

**Project Search + Filters** — instant client-side search across project name, tech stack, category, problem/solution text. Filter pills auto-generated from the union of every project's `tech` array in `data/projects.ts` — add a new technology to any project and a filter pill appears automatically.

**Enhanced Project Detail** (`/projects/:slug`) — status badge (completed / in-progress / planned), timeline string, previous/next project navigation, optional image gallery (renders only when `project.images` is non-empty). Set these fields in `data/projects.ts`.

**3D Hero (React Three Fiber)** — wireframe icosahedron sphere with tech-stack label cloud (pulled from `data/skills.ts`) + ambient particle field + mouse parallax. Loaded exclusively via `React.lazy()` so three.js (~888KB raw / ~247KB gzip) ships in an isolated chunk never fetched by mobile, touch, or reduced-motion users. The 2D canvas particle field is the immediate fallback. `PerformanceMonitor` drops pixel ratio under GPU load.

**Custom Cursor** — desktop-only dot + ring that grows on interactive elements. Auto-disabled via `(pointer: coarse)` / `(hover: none)` media queries and `prefers-reduced-motion`.

**Error Boundaries** — every section wrapped so a crash in one section can't take down the rest of the page.

**Skip-to-content link** — keyboard accessible, visually hidden until focused.

**Analytics** — Google Analytics 4, Microsoft Clarity, and Plausible supported via environment variables. Zero tracking injected when variables are absent.

**Blog scaffold** — `/blog` and `/blog/:slug` routes render a "coming soon" page while `data/blog.ts` is empty. Add `BlogPost` entries there to activate.

**Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Content-Security-Policy` set for Vercel (`vercel.json`), Netlify (`netlify.toml`), and Cloudflare Pages (`public/_headers`).

### Phase 2 environment variables

Add these to `.env` (or your deployment platform's env settings):

| Variable | Purpose |
|---|---|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 (e.g. `G-XXXXXXXXXX`) |
| `VITE_CLARITY_PROJECT_ID` | Microsoft Clarity project ID |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible domain (e.g. `parthchittalwar.dev`) |

### Bundle summary (Phase 2)

| Chunk | Size (gzip) | When loaded |
|---|---|---|
| `index.js` (main) | ~68KB | Always |
| `vendor.js` (React + FM + router) | ~88KB | Always |
| `ui-libs.js` (cmdk + radix) | ~12KB | Always |
| `three.js` (three.js + R3F + Drei) | ~248KB | Desktop, no reduced motion only |
| `TechSphere.js` (lazy entry) | ~1.3KB | Desktop, no reduced motion only |

Mobile initial load: ~168KB gzip (main + vendor + ui-libs chunks only).
