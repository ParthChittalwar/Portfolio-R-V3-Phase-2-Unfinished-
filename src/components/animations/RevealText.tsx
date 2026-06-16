import { motion } from "framer-motion";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  /** Delay (seconds) before the first word starts animating. */
  delay?: number;
  /** Animate on scroll into view instead of immediately on mount. */
  whileInView?: boolean;
}

/**
 * Splits `children` into words and reveals them with a staggered
 * upward fade — used for hero/section headlines. Pass `as` to render
 * a different element (defaults to a <span>).
 */
export default function RevealText({
  children,
  as: Component = "span",
  className,
  delay = 0,
  whileInView = false,
}: RevealTextProps) {
  const words = children.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: delay },
    },
  };

  const word = {
    hidden: { opacity: 0, y: "0.5em" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionComponent = motion(Component) as ElementType;

  const animationProps = whileInView
    ? { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } }
    : { initial: "hidden", animate: "visible" };

  return (
    <MotionComponent
      className={cn("inline-block", className)}
      variants={container}
      {...animationProps}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
}
