import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skillGroups } from "@/data/skills";

const totalTechnologies = new Set(skillGroups.flatMap((g) => g.items)).size;
const totalGroups = skillGroups.length;

/** Animated count-up stats for the Skills/Tech Stack section header. */
export default function TechCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 800;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * totalTechnologies));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
    >
      <span>
        <span className="text-foreground">{count}</span> Technologies
      </span>
      <span className="h-px w-8 bg-border" />
      <span>
        <span className="text-foreground">{totalGroups}</span> Categories
      </span>
    </motion.div>
  );
}
