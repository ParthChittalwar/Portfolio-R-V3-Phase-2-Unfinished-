import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ResumeButton from "@/components/common/ResumeButton";
import ThemeToggle from "@/components/common/ThemeToggle";
import CommandPaletteTrigger from "@/components/common/CommandPaletteTrigger";
import MobileMenu from "./MobileMenu";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { getNavLinks } from "@/constants/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Sticky top navigation with scroll-spy highlighting and a mobile menu. */
export default function Nav() {
  const links = getNavLinks();
  const sectionIds = links.map((link) => link.href.replace("/#", ""));
  const activeId = useScrollSpy(sectionIds);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          {site.initials}
          <span className="text-muted-foreground">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const id = link.href.replace("/#", "");
            const isActive = pathname === "/" && activeId === id;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <CommandPaletteTrigger />
            <ThemeToggle />
            <ResumeButton />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        links={links}
        activeId={activeId}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
