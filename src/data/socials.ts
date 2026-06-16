import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterXIcon,
  InstagramIcon,
} from "@/components/icons/BrandIcons";
import type { SocialLink } from "@/types";

/**
 * Social / contact links — single source of truth.
 *
 * The Nav, Contact section, mobile menu, and Footer all read from this
 * array. Add, remove, or reorder entries here; nothing else needs to change.
 *
 *  - `primary: true` marks links featured in the Contact section's main grid.
 *  - `value` is the human-readable label shown next to the icon/link.
 */
export const socials: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    value: "chittalwarparth@gmail.com",
    href: "mailto:chittalwarparth@gmail.com",
    icon: Mail,
    primary: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "ParthChittalwar",
    href: "https://github.com/ParthChittalwar",
    icon: GithubIcon,
    primary: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "parthchittalwar",
    href: "https://www.linkedin.com/in/parthchittalwar/",
    icon: LinkedinIcon,
    primary: true,
  },
  {
    id: "twitter",
    label: "Twitter / X",
    value: "@itzz_me_parth",
    href: "https://x.com/itzz_me_parth",
    icon: TwitterXIcon,
    primary: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    value: "@parth_chittalwar",
    href: "https://www.youtube.com/@parth_chittalwar",
    icon: YoutubeIcon,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@parth_chittalwar",
    href: "https://www.instagram.com/parth_chittalwar/",
    icon: InstagramIcon,
  },
];

/** Convenience getters used by components that only need specific links. */
export const emailLink = socials.find((s) => s.id === "email")!;
export const githubLink = socials.find((s) => s.id === "github")!;

/** Links shown in the Contact section's primary grid. */
export const primarySocials = socials.filter((s) => s.primary);
