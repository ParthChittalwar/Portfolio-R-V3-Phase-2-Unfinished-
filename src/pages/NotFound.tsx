import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDocumentHead } from "@/hooks/useDocumentHead";

/** 404 page for unmatched routes. */
export default function NotFound() {
  useDocumentHead({ title: "Page not found" });

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">404</p>
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
    </div>
  );
}
