import { Award, ExternalLink } from "lucide-react";
import type { Certification } from "@/types";

interface CertificationCardProps {
  certification: Certification;
}

/** Single certification card. */
export default function CertificationCard({ certification }: CertificationCardProps) {
  const content = (
    <div className="card-hover flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface/50 p-6">
      <div className="flex items-start justify-between">
        <Award className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        {certification.credentialUrl && (
          <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        )}
      </div>
      <h3 className="font-display text-lg font-semibold leading-snug">{certification.name}</h3>
      <div className="mt-auto flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>{certification.issuer}</span>
        {certification.date && <span>{certification.date}</span>}
      </div>
    </div>
  );

  if (certification.credentialUrl) {
    return (
      <a
        href={certification.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    );
  }

  return content;
}
