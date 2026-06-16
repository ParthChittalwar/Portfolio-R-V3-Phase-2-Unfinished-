import type { Certification } from "@/types";

/**
 * Certifications — rendered by the Certifications section.
 *
 * ⚠️ PLACEHOLDER DATA — carried over from the V2 remaster as a starting
 * point. Replace these with your real certifications (name, issuer, date,
 * and optionally a `credentialUrl` to the verification page / badge).
 *
 * To hide the Certifications section entirely (and its nav link), set
 * this array to `[]` — same behavior as `achievements.ts`.
 */
export const certifications: Certification[] = [
  {
    id: "cpp-programming",
    name: "C++ Programming",
    issuer: "Udemy",
    // date: "2024",
    // credentialUrl: "https://...",
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    issuer: "GeeksforGeeks",
    // date: "2024",
    // credentialUrl: "https://...",
  },
  {
    id: "web-dev-bootcamp",
    name: "Web Development Bootcamp",
    issuer: "The Odin Project",
    // date: "2025",
    // credentialUrl: "https://...",
  },
  {
    id: "git-github",
    name: "Git & GitHub Essentials",
    issuer: "LinkedIn Learning",
    // date: "2025",
    // credentialUrl: "https://...",
  },
];
