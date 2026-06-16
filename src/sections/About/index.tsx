import Section from "@/components/layout/Section";
import Stagger from "@/components/animations/Stagger";
import { site } from "@/data/site";

/** About section — bio copy plus a quick "how I work" trait list. */
export default function About() {
  return (
    <Section id="about" index="01" label="About" title="Building with intent, learning in public.">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="space-y-6 md:col-span-7 lg:col-span-8">
          {site.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="md:col-span-5 lg:col-span-4">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            How I work
          </h3>
          <Stagger className="space-y-3">
            {site.traits.map((trait) => (
              <Stagger.Item key={trait}>
                <div className="card-hover flex items-center gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground/50" />
                  <span className="text-sm text-foreground">{trait}</span>
                </div>
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
