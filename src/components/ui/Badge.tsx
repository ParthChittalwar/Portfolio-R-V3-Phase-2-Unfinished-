import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Small pill used for tech stack tags, category labels, etc. */
export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
