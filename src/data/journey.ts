import type { JourneyMilestone } from "@/types";

/**
 * Engineering journey timeline, rendered by the Journey section.
 *
 * Add a new milestone by appending an object below. Set `active: true`
 * on the milestone representing "right now" — only one should be active
 * at a time.
 */
export const journey: JourneyMilestone[] = [
  {
    year: "2024",
    title: "Started Engineering",
    description:
      "Started B.Tech in Computer Technology at Priyadarshini College of Engineering, Nagpur and began building a foundation in core computer science.",
  },
  {
    year: "2025",
    title: "Strengthening Fundamentals",
    description:
      "Focused on C++, Data Structures & Algorithms, and Object-Oriented Programming while strengthening problem-solving skills.",
  },
  {
    year: "2026",
    title: "Building in the Open",
    description:
      "Expanding into full-stack web development through the MERN stack while learning modern development tools and practices.",
  },
  {
    year: "Future",
    title: "Looking Ahead",
    description:
      "Continuing to build projects, contribute to open source, gain internship experience, and prepare for a career in software engineering.",
    active: true,
  },
];
