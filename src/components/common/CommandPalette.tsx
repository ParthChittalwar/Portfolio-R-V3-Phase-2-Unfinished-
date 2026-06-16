import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  User,
  LayoutGrid,
  Route as RouteIcon,
  FolderGit2,
  Award,
  Mail,
  Download,
  Sun,
  Moon,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { socials, emailLink } from "@/data/socials";
import { certifications } from "@/data/certifications";
import resumeUrl from "@/assets/documents/resume.pdf";
import { site } from "@/data/site";

const RESUME_FILENAME = `${site.name.replace(/\s+/g, "-")}-Resume.pdf`;

/**
 * Global command palette (Ctrl+K / Cmd+K). Provides quick navigation to
 * every section, common actions (resume download, theme toggle, contact),
 * and links to every social profile in `src/data/socials.ts`.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onToggleEvent = () => setOpen((prev) => !prev);

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("toggle-command-palette", onToggleEvent);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("toggle-command-palette", onToggleEvent);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  /** Scroll to a section on the home page, navigating there first if needed. */
  const goToSection = useCallback(
    (id: string) => {
      close();
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate(`/#${id}`);
      }
    },
    [close, location.pathname, navigate],
  );

  const downloadResume = useCallback(() => {
    close();
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = RESUME_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [close]);

  const openExternal = useCallback(
    (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [close],
  );

  const contactMe = useCallback(() => {
    close();
    window.location.href = emailLink.href;
  }, [close]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      shouldFilter
      loop
      overlayClassName="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[18vh] z-[70] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      className="flex max-h-[60vh] flex-col"
    >
      <div className="border-b border-border px-4 py-3">
        <Command.Input
          placeholder="Type a command or search..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <Command.List className="flex-1 overflow-y-auto p-2">
        <Command.Empty className="px-4 py-6 text-center text-sm text-muted-foreground">
          No results found.
        </Command.Empty>

        <Command.Group
          heading="Navigate"
          className="px-2 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
        >
          <PaletteItem icon={Home} label="Go to Hero" onSelect={() => goToSection("hero")} />
          <PaletteItem icon={User} label="Go to About" onSelect={() => goToSection("about")} />
          <PaletteItem
            icon={LayoutGrid}
            label="Go to Tech Stack"
            onSelect={() => goToSection("skills")}
          />
          <PaletteItem
            icon={RouteIcon}
            label="Go to Journey"
            onSelect={() => goToSection("journey")}
          />
          <PaletteItem
            icon={FolderGit2}
            label="Go to Projects"
            onSelect={() => goToSection("projects")}
          />
          {certifications.length > 0 && (
            <PaletteItem
              icon={Award}
              label="Go to Certifications"
              onSelect={() => goToSection("certifications")}
            />
          )}
          <PaletteItem icon={Mail} label="Go to Contact" onSelect={() => goToSection("contact")} />
        </Command.Group>

        <Command.Group
          heading="Actions"
          className="px-2 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
        >
          <PaletteItem icon={Mail} label="Contact Me" onSelect={contactMe} />
          <PaletteItem icon={Download} label="Download Resume" onSelect={downloadResume} />
          <PaletteItem
            icon={theme === "dark" ? Sun : Moon}
            label={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            onSelect={() => {
              close();
              toggleTheme();
            }}
          />
        </Command.Group>

        <Command.Group
          heading="Connect"
          className="px-2 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
        >
          {socials.map((social) => (
            <PaletteItem
              key={social.id}
              icon={social.id === "email" ? Mail : ExternalLink}
              label={`Open ${social.label}`}
              onSelect={() => (social.id === "email" ? contactMe() : openExternal(social.href))}
            />
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

interface PaletteItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onSelect: () => void;
}

function PaletteItem({ icon: Icon, label, onSelect }: PaletteItemProps) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none aria-selected:bg-elevated"
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      {label}
    </Command.Item>
  );
}
