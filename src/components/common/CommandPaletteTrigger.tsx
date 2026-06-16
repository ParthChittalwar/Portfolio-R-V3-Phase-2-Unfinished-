import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandPaletteTriggerProps {
  className?: string;
}

/** Button that opens the command palette (dispatches a custom event CommandPalette listens for). */
export default function CommandPaletteTrigger({ className }: CommandPaletteTriggerProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/.test(window.navigator.platform || window.navigator.userAgent));
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
      aria-label="Open command palette"
      className={cn(
        "flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground",
        className,
      )}
    >
      <Search className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="rounded border border-border bg-elevated px-1.5 py-0.5 font-mono text-[0.65rem]">
        {isMac ? "\u2318K" : "Ctrl K"}
      </kbd>
    </button>
  );
}
