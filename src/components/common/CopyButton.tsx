import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

/** Small icon button that copies `value` to the clipboard with brief feedback. */
export default function CopyButton({ value, label = "Copy", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable — silently ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-elevated",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      )}
    </button>
  );
}
