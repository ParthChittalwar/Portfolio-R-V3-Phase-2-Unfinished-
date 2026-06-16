import Section from "@/components/layout/Section";
import Stagger from "@/components/animations/Stagger";
import SkillCard from "./SkillCard";
import TechCounter from "./TechCounter";
import { skillGroups } from "@/data/skills";

/**
 * Skills / Tech Stack section. Doc 2 listed "Skills" and "Tech Stack" as
 * separate sections, but both would render the same data — merged here
 * into a single interactive tech-stack grid to avoid duplication.
 */
export default function Skills() {
  return (
    <Section id="skills" index="02" label="Tech Stack" title="Tools I reach for when building.">
      <div className="mb-10">
        <TechCounter />
      </div>
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Stagger.Item key={group.id}>
            <SkillCard group={group} />
          </Stagger.Item>
        ))}
      </Stagger>
    </Section>
  );
}
