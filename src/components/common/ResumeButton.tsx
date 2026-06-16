import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import resumeUrl from "@/assets/documents/resume.pdf";
import { site } from "@/data/site";

const RESUME_FILENAME = `${site.name.replace(/\s+/g, "-")}-Resume.pdf`;

interface ResumeButtonProps {
  /** "solid" for the primary filled style, "outline" for a bordered ghost style. */
  variant?: "solid" | "outline";
  className?: string;
}

/**
 * Resume button. Clicking opens a lightweight preview modal with options to
 * open the PDF in a new tab or download it directly.
 *
 * To update the resume, replace `src/assets/documents/resume.pdf` — no code
 * changes needed.
 */
export default function ResumeButton({ variant = "solid", className }: ResumeButtonProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
          variant === "solid"
            ? "bg-foreground text-background hover:opacity-90"
            : "border border-border text-foreground hover:bg-elevated",
          className,
        )}
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Resume
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Resume preview"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
                <h2 className="font-display text-sm font-semibold sm:text-base">Resume Preview</h2>
                <div className="flex items-center gap-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-elevated sm:text-sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    Open
                  </a>
                  <a
                    href={resumeUrl}
                    download={RESUME_FILENAME}
                    className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:text-sm"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close resume preview"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-elevated"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-elevated">
                <object data={resumeUrl} type="application/pdf" className="h-full w-full">
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-sm text-muted-foreground">
                    <p>Preview isn&apos;t available in this browser.</p>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 font-medium text-foreground transition-colors hover:bg-elevated"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      Open resume in a new tab
                    </a>
                  </div>
                </object>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
