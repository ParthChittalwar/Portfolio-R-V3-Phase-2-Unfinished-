import { lazy, Suspense } from "react";
import HeroCanvas from "@/components/common/HeroCanvas";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Lazily loaded 3D Tech Sphere (React Three Fiber).
 * The dynamic import creates a separate Vite chunk — three.js + fiber + drei
 * never land in the main bundle.
 */
const TechSphere = lazy(() => import("./TechSphere"));

/**
 * Decides which hero background to render:
 *
 *  - 3D TechSphere (R3F) on capable desktop browsers without reduced motion.
 *  - Lightweight 2D canvas particle field on mobile / touch / reduced motion.
 *
 * This is the component imported by the Hero section. Swapping strategies
 * here never requires changes to the Hero layout.
 */
export default function HeroCanvas3D() {
  const isMobile = useIsMobile();
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();

  const use3D = !isMobile && !isTouch && !reducedMotion;

  if (!use3D) {
    return <HeroCanvas />;
  }

  return (
    <Suspense fallback={<HeroCanvas />}>
      <div className="absolute inset-0" aria-hidden="true">
        <TechSphere />
      </div>
    </Suspense>
  );
}
