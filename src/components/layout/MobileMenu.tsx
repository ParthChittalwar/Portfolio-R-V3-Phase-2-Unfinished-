import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import ResumeButton from "@/components/common/ResumeButton";
import ThemeToggle from "@/components/common/ThemeToggle";
import { socials } from "@/data/socials";
import type { NavLink } from "@/types";

interface MobileMenuProps {
  open: boolean;
  links: NavLink[];
  activeId: string;
  onClose: () => void;
}

/** Full-screen mobile navigation overlay. */
export default function MobileMenu({ open, links, activeId, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-lg md:hidden"
        >
          <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
            {links.map((link, i) => {
              const id = link.href.replace("/#", "");
              const isActive = activeId === id;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className={
                      "font-display text-4xl font-semibold tracking-tight transition-colors " +
                      (isActive ? "text-foreground" : "text-muted-foreground")
                    }
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex items-center justify-between gap-4 border-t border-border px-8 py-6">
            <div className="flex items-center gap-3">
              {socials.slice(0, 4).map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel={social.id === "email" ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <ResumeButton variant="outline" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
