import type { Achievement } from "@/types";

/**
 * Achievements / awards / recognitions — rendered by the Achievements
 * section.
 *
 * This list is intentionally empty. As long as it stays empty, the
 * Achievements section AND its navbar link are automatically hidden
 * (see `src/pages/Home.tsx` and `src/components/layout/Nav.tsx`).
 *
 * To add your first achievement, append an object like:
 *
 *   {
 *     id: "smart-india-hackathon",
 *     title: "Smart India Hackathon — Finalist",
 *     description: "Built a working prototype for ... as part of a 4-member team.",
 *     date: "2026",
 *     link: "https://...",
 *   }
 *
 * The section will appear automatically once this array is non-empty.
 */
export const achievements: Achievement[] = [];
