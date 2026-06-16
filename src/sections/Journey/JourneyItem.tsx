import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { JourneyMilestone } from "@/types";

interface JourneyItemProps {
  milestone: JourneyMilestone;
  align: "left" | "right";
}

/** Single milestone on the Journey timeline, alternating sides on desktop. */
export default function JourneyItem({ milestone, align }: JourneyItemProps) {
  const isRight = align === "right";

  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-0">
      {/* Timeline dot */}
      <span
        className={cn(
          "absolute left-[-1px] top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background md:block",
          milestone.active ? "bg-foreground" : "bg-muted-foreground",
          "md:left-1/2",
        )}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, x: isRight ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "card-hover rounded-2xl border border-border bg-surface/50 p-6",
          isRight ? "md:order-2 md:ml-10" : "md:order-1 md:col-start-1 md:mr-10",
          milestone.active && "border-foreground/20",
        )}
      >
        <div className="mb-2 flex items-center gap-3">
          <span className="font-display text-2xl font-bold tracking-tight">{milestone.year}</span>
          {milestone.active && (
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Current
            </span>
          )}
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold">{milestone.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>
      </motion.div>

      {/* Empty spacer for alternating layout on desktop */}
      <div className={cn("hidden md:block", isRight ? "md:order-1" : "md:order-2")} />
    </div>
  );
}
