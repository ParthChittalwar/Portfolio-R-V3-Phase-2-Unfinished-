import { socials } from "@/data/socials";
import { site } from "@/data/site";

/** Site footer — identity, social links, and copyright. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <p className="font-display text-sm font-semibold">{site.name}</p>
          <p className="text-xs text-muted-foreground">{site.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target={social.id === "email" ? undefined : "_blank"}
              rel={social.id === "email" ? undefined : "noopener noreferrer"}
              aria-label={social.label}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <social.icon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
