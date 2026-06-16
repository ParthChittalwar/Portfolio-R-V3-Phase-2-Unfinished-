import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";

const ROTATE_MS = 2600;

/** Rotates through `site.roles` with a vertical fade/slide transition. */
export default function RoleTicker() {
  const [index, setIndex] = useState(0);
  const roles = site.roles;

  useEffect(() => {
    if (roles.length <= 1) return;
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, ROTATE_MS);
    return () => window.clearInterval(interval);
  }, [roles.length]);

  return (
    <span className="relative inline-flex h-[1.4em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block font-mono text-foreground"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
