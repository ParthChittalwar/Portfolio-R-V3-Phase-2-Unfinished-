import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

/**
 * Search input + technology filter pills for the Projects section.
 * `tags` comes from `getProjectTechFilters()` (derived from `data/projects.ts`
 * — no hardcoded categories).
 */
export default function ProjectFilters({
  query,
  onQueryChange,
  tags,
  activeTag,
  onTagChange,
}: ProjectFiltersProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search projects..."
          aria-label="Search projects by name, technology, or keyword"
          className="w-full rounded-full border border-border bg-surface/50 py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
        <FilterPill label="All" active={activeTag === null} onClick={() => onTagChange(null)} />
        {tags.map((tag) => (
          <FilterPill
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => onTagChange(tag)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
        active
          ? "border-foreground/30 bg-foreground text-background"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
