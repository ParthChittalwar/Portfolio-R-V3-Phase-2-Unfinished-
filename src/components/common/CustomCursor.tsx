import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary';

/**
 * Subtle custom cursor: a small dot tracks the pointer exactly, and a
 * larger ring follows with a soft spring lag, growing slightly over
 * interactive elements.
 *
 * Renders nothing (and the native cursor stays visible) on touch/coarse
 * pointer devices or when the user prefers reduced motion — see
 * `useIsTouchDevice` / `useReducedMotion`.
 */
export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const enabled = !isTouch && !reducedMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });

  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setIsHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const onLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onLeaveWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onLeaveWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <motion.div
        style={{ x, y, opacity: visible ? 1 : 0 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        animate={{ width: isHovering ? 6 : 4, height: isHovering ? 6 : 4 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30"
        animate={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
