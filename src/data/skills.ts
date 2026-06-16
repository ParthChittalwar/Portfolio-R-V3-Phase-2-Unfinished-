import type { SkillGroup } from "@/types";

/**
 * Skills / tech stack groups, rendered by the Skills section's
 * interactive tech-stack visualization.
 *
 * Add a new group by appending an object with a unique `id`, a `label`,
 * and an `items` array. Order here controls render order.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "01",
    label: "Languages",
    items: ["C", "C++", "JavaScript"],
  },
  {
    id: "02",
    label: "Frontend",
    items: ["HTML", "CSS", "React", "Tailwind CSS"],
  },
  {
    id: "03",
    label: "Backend",
    items: ["Node.js", "Express.js"],
  },
  {
    id: "04",
    label: "Database",
    items: ["MongoDB", "SQL"],
  },
  {
    id: "05",
    label: "Core CS",
    items: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  },
  {
    id: "06",
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "Docker", "AWS"],
  },
];
