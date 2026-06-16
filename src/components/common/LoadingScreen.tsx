import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";

interface LoadingScreenProps {
  visible: boolean;
}

/**
 * Minimal first-visit loading screen (~650ms, see `useLoadingScreen`).
 * Skipped automatically on repeat visits and for reduced-motion users.
 */
export default function LoadingScreen({ visible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl font-bold tracking-tight"
          >
            {site.initials}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
