import { certifications } from "@/data/certifications";
import { achievements } from "@/data/achievements";
import type { NavLink } from "@/types";

/**
 * Navigation links shown in the Nav and mobile menu.
 *
 * Sections that are driven by potentially-empty data arrays
 * (Certifications, Achievements) only get a nav link if that data
 * array is non-empty — keeping the navbar in sync with `src/data/`
 * automatically. Nothing here needs to change when you add/remove
 * certifications or achievements.
 */
export function getNavLinks(): NavLink[] {
  const links: NavLink[] = [
    { label: "About", href: "/#about" },
    { label: "Journey", href: "/#journey" },
    { label: "Tech Stack", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
  ];

  if (certifications.length > 0) {
    links.push({ label: "Certifications", href: "/#certifications" });
  }

  if (achievements.length > 0) {
    links.push({ label: "Achievements", href: "/#achievements" });
  }

  links.push({ label: "Contact", href: "/#contact" });

  return links;
}
