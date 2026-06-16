/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_GITHUB_USERNAME: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_CLARITY_PROJECT_ID: string;
  readonly VITE_PLAUSIBLE_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Vite handles PDFs as static assets and returns a resolved URL string
declare module "*.pdf" {
  const src: string;
  export default src;
}
