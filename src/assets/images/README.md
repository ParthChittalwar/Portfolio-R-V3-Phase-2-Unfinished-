# Project Images

Drop project screenshots/covers here (e.g. `personal-portfolio-website.png`,
`student-management-system.png`).

To use an image on a project card and its detail page, reference it from
`src/data/projects.ts`:

```ts
import portfolioImage from "@/assets/images/personal-portfolio-website.png";

{
  // ...
  image: portfolioImage,
}
```

If `project.image` is left `undefined`, the project card falls back to a
decorative number/category panel — no code changes needed either way.

Recommended size: 1600×900 (16:9), optimized (WebP or compressed PNG/JPG)
to keep bundle size and Lighthouse scores healthy.
