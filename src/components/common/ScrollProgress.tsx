import { motion, useScroll, useSpring } from "framer-motion";

/** Thin progress bar fixed to the top of the viewport, tracking scroll depth. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-foreground/40"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
