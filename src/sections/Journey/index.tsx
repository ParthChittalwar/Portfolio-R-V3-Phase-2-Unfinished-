import Section from "@/components/layout/Section";
import JourneyItem from "./JourneyItem";
import { journey } from "@/data/journey";

/** Engineering journey timeline, alternating left/right on desktop. */
export default function Journey() {
  return (
    <Section id="journey" index="03" label="Journey" title="The road so far — and what's next.">
      <div className="relative space-y-10 md:space-y-16">
        {/* Vertical timeline line (desktop only) */}
        <div
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block"
          aria-hidden="true"
        />
        {journey.map((milestone, i) => (
          <JourneyItem
            key={milestone.year}
            milestone={milestone}
            align={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </Section>
  );
}
