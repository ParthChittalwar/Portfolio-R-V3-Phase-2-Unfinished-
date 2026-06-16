import Section from "@/components/layout/Section";
import Stagger from "@/components/animations/Stagger";
import { Trophy } from "lucide-react";
import { achievements } from "@/data/achievements";

/**
 * Achievements section. Renders nothing if `data/achievements.ts` is
 * empty — same convention as the Certifications section. Add an entry
 * to that file and this section (plus its nav link) appear automatically.
 */
export default function Achievements() {
  if (achievements.length === 0) return null;

  return (
    <Section id="achievements" index="06" label="Achievements" title="Recognition & milestones.">
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <Stagger.Item key={achievement.id}>
            <div className="card-hover flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface/50 p-6">
              <Trophy className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold leading-snug">
                {achievement.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {achievement.description}
              </p>
              <div className="mt-auto flex items-center justify-between font-mono text-xs text-muted-foreground">
                {achievement.date && <span>{achievement.date}</span>}
                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    Learn more
                  </a>
                )}
              </div>
            </div>
          </Stagger.Item>
        ))}
      </Stagger>
    </Section>
  );
}
