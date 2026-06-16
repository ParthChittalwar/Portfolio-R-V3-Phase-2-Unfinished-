import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Shared section shell: a numbered/labelled eyebrow + large heading,
 * followed by section content. Reused by every section so the rhythm
 * (spacing, heading scale, reveal animation) stays consistent.
 */
export default function Section({ id, index, label, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative px-6 py-24 lg:px-10 lg:py-36", className)}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid grid-cols-1 items-end gap-6 md:mb-20 md:grid-cols-12 md:gap-8"
        >
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground md:col-span-3">
            <span>{index}</span>
            <span className="h-px w-8 bg-border" />
            <span>{label}</span>
          </div>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:col-span-9 md:text-6xl lg:text-7xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
