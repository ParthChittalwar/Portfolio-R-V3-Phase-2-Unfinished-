import { ArrowUpRight } from "lucide-react";
import type { SocialLink } from "@/types";

interface ContactCardProps {
  social: SocialLink;
}

/** Single social/contact link card for the Contact section grid. */
export default function ContactCard({ social }: ContactCardProps) {
  const isEmail = social.id === "email";

  return (
    <a
      href={social.href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="card-hover group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface/50 p-5"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:text-foreground">
          <social.icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="flex flex-col">
          <span className="font-display text-sm font-semibold">{social.label}</span>
          <span className="font-mono text-xs text-muted-foreground">{social.value}</span>
        </div>
      </div>
      <ArrowUpRight
        className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        aria-hidden="true"
      />
    </a>
  );
}
