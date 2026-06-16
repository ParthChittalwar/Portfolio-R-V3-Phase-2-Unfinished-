import type { SiteConfig } from "@/types";

/**
 * Core site configuration — identity, bio copy, stats, and SEO defaults.
 *
 * Edit this file to change:
 *  - Your name, role, location, and tagline
 *  - The rotating role ticker shown in the Hero
 *  - About section bio paragraphs and "approach" traits
 *  - The stat tiles shown in Hero / About (CGPA, graduation year, etc.)
 *  - Default SEO title/description fallbacks
 */
export const site: SiteConfig = {
  name: "Parth Chittalwar",
  initials: "PC",
  role: "Computer Technology Student",
  location: "Nagpur, Maharashtra — India",
  shortLocation: "Nagpur, India",
  tagline: "Building software through C++, DSA, and modern web technologies.",
  availability: "Available for opportunities",

  roles: ["C++ Engineer", "DSA Practitioner", "React Developer", "CS Undergraduate"],

  bio: [
    "I'm Parth, a Computer Technology undergraduate at Priyadarshini College of Engineering, Nagpur. My work centers on the fundamentals — data structures, object-oriented design, and systems — paired with the craft of shipping real interfaces.",
    "I'm currently going deep on C++ and DSA, and broadening into the MERN stack. Every project I take on is self-initiated and owned end to end, from architecture to deployment.",
    "My goal is simple: become the kind of software engineer who builds things people remember.",
  ],

  traits: [
    "Self-initiated projects",
    "DSA daily practice",
    "Full-stack curiosity",
    "Clean code obsession",
  ],

  stats: [
    { value: "9.17", label: "CGPA", description: "Priyadarshini College" },
    { value: "2028", label: "B.Tech", description: "Expected graduation" },
    { value: "4+", label: "Core CS", description: "Subjects mastered" },
    { value: "3+", label: "Languages", description: "C · C++ · JavaScript" },
  ],

  seo: {
    title: "Parth Chittalwar — Software Engineer & Builder",
    description:
      "Parth Chittalwar — Computer Technology undergraduate building software through C++, DSA, and the MERN stack. Explore projects, skills, and engineering journey.",
  },
};
