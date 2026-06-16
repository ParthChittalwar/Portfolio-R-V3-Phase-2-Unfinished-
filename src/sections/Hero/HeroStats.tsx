import { motion } from "framer-motion";
import { site } from "@/data/site";

/** Stat tiles (CGPA, graduation year, etc.) shown beneath the Hero copy. */
export default function HeroStats() {
  return (
    <motion.dl
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border sm:grid-cols-4"
    >
      {site.stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1 bg-surface/60 p-4 sm:p-5">
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {stat.value}
          </dd>
          {stat.description && (
            <span className="text-xs text-muted-foreground">{stat.description}</span>
          )}
        </div>
      ))}
    </motion.dl>
  );
}
