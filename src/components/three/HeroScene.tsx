/**
 * HeroScene — selects the right background for the hero section.
 *
 * Decision logic (in priority order):
 *  1. `prefers-reduced-motion`  → always use lightweight 2D canvas.
 *  2. Touch / coarse-pointer device → 2D canvas (no need for 3D).
 *  3. Otherwise → lazy-load `TechSphereScene` (three.js / R3F in its own
 *     Vite chunk). While loading, the 2D canvas stays visible as a fallback.
 *
 * This module re-exports `HeroScene` as the default export — Hero/index.tsx
 * replaces its direct import of `HeroCanvas` with this component.
 */
import { lazy, Suspense } from "react";
import HeroCanvas from "@/components/common/HeroCanvas";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

// The R3F scene is loaded lazily — three.js stays out of the main bundle.
const TechSphereScene = lazy(() => import("./TechSphereScene"));

export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const use3D = !reducedMotion && !isTouch;

  if (!use3D) return <HeroCanvas />;

  return (
    <>
      {/* 2D canvas visible immediately while 3D loads */}
      <HeroCanvas />
      <Suspense fallback={null}>
        {/* 3D scene mounts on top; both use position: absolute inset-0 */}
        <TechSphereScene />
      </Suspense>
    </>
  );
}
