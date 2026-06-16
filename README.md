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






**Phase 2 (planned, not yet built):**

- React Three Fiber 3D hero (particle field / tech sphere, mouse parallax,
  scroll-driven camera via GSAP), with mobile/reduced-motion fallback to the
  current canvas.
- Command palette (Ctrl+K).
- Custom cursor (desktop only, auto-disabled on touch devices).
- Optional GitHub stats widget (`VITE_GITHUB_USERNAME`), with graceful
  fallback on API rate limits.
- Project filtering and search.

