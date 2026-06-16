import Section from "@/components/layout/Section";
import Stagger from "@/components/animations/Stagger";
import ContactCard from "./ContactCard";
import CopyButton from "@/components/common/CopyButton";
import ResumeButton from "@/components/common/ResumeButton";
import { emailLink, primarySocials } from "@/data/socials";
import { site } from "@/data/site";

/** Contact section — primary CTA email + social link grid. */
export default function Contact() {
  return (
    <Section id="contact" index="07" label="Contact" title="Let's build something together.">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 lg:col-span-8">
          <p className="mb-8 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I'm always open to conversations about software engineering, internships, or
            collaborative projects. The fastest way to reach me is email.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={emailLink.href}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {emailLink.value}
            </a>
            <CopyButton value={emailLink.value} label="Copy email address" />
            <ResumeButton variant="outline" />
          </div>

          <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground/70" />
            </span>
            {site.availability} · {site.location}
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-4">
          <Stagger className="grid grid-cols-1 gap-3">
            {primarySocials.map((social) => (
              <Stagger.Item key={social.id}>
                <ContactCard social={social} />
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
