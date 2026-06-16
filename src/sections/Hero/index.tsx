import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import HeroCanvas3D from "@/components/three/HeroCanvas3D";
import ResumeButton from "@/components/common/ResumeButton";
import MagneticButton from "@/components/animations/MagneticButton";
import RevealText from "@/components/animations/RevealText";
import RoleTicker from "./RoleTicker";
import HeroStats from "./HeroStats";
import { site } from "@/data/site";
import { socials } from "@/data/socials";

/**
 * Hero section — first thing a visitor sees. Optimized so a recruiter can
 * understand who Parth is, see the rotating focus areas, and reach
 * Projects / Contact / Resume within a couple of seconds.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 py-32 lg:px-10"
    >
      <div className="hero-glow absolute inset-0" aria-hidden="true" />
      <HeroCanvas3D />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground/70" />
          </span>
          {site.availability}
        </motion.div>

        <div className="flex flex-col gap-6">
          <h1 className="hero-name text-balance text-[clamp(3rem,12vw,9rem)]">
            <RevealText as="span">{site.name}</RevealText>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            {site.role} from {site.shortLocation} — currently focused on <RoleTicker />.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {site.tagline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3"
        >
          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
            >
              Get in touch
            </a>
          </MagneticButton>
          <ResumeButton variant="outline" />
        </motion.div>

        <HeroStats />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-3"
        >
          {socials.slice(0, 4).map((social) => (
            <a
              key={social.id}
              href={social.href}
              target={social.id === "email" ? undefined : "_blank"}
              rel={social.id === "email" ? undefined : "noopener noreferrer"}
              aria-label={social.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              <social.icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
