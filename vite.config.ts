import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (!env.VITE_SITE_URL) {
    process.env.VITE_SITE_URL = "https://parthchittalwar.dev";
  }

  return {
    plugins: [react(), tsconfigPaths()],
    base: process.env.VITE_BASE_PATH || "/",
    build: {
      outDir: "dist",
      sourcemap: false,
      // Suppress warning for the three.js chunk — it's intentionally large
      // and loaded lazily (never hits the main bundle).
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Isolate three.js + R3F + Drei into a separate chunk.
            // This chunk is only fetched when TechSphereScene is lazy-loaded
            // (desktop, non-touch, motion-ok users). Mobile users never pay
            // for it.
            if (id.includes("node_modules/three") || id.includes("node_modules/@react-three")) {
              return "three";
            }
            // Separate the main React/routing vendor chunk from app code.
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom") ||
              id.includes("node_modules/react-router") ||
              id.includes("node_modules/scheduler")
            ) {
              return "vendor";
            }
            // cmdk + radix get their own small chunk.
            if (id.includes("node_modules/cmdk") || id.includes("node_modules/@radix-ui")) {
              return "ui-libs";
            }
          },
        },
      },
    },
    server: {
      port: 5173,
    },
    preview: {
      port: 4173,
    },
  };
});
