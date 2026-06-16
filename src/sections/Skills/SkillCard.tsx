import { motion } from "framer-motion";
import type { SkillGroup } from "@/types";

interface SkillCardProps {
  group: SkillGroup;
}

/** Single tech-stack group card with hover-revealed item pills. */
export default function SkillCard({ group }: SkillCardProps) {
  return (
    <div className="card-hover group rounded-2xl border border-border bg-surface/50 p-6">
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="font-display text-xl font-semibold tracking-tight">{group.label}</h3>
        <span className="font-mono text-xs text-muted-foreground">{group.id}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-foreground/15 group-hover:text-foreground"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
