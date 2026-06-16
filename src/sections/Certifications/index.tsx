import Section from "@/components/layout/Section";
import Stagger from "@/components/animations/Stagger";
import CertificationCard from "./CertificationCard";
import { certifications } from "@/data/certifications";

/**
 * Certifications section. Renders nothing if `data/certifications.ts` is
 * empty — same convention as the Achievements section — so the nav link
 * (see `src/constants/navigation.ts`) and this section stay in sync.
 */
export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section
      id="certifications"
      index="05"
      label="Certifications"
      title="Credentials along the way."
    >
      <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => (
          <Stagger.Item key={cert.id}>
            <CertificationCard certification={cert} />
          </Stagger.Item>
        ))}
      </Stagger>
    </Section>
  );
}
