/**
 * "Skip to content" link — visually hidden until focused (keyboard
 * navigation), then jumps past the nav directly to <main id="main-content">.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground"
    >
      Skip to content
    </a>
  );
}
