import { useEffect, useState } from "react";

/**
 * True for touch/coarse-pointer devices (phones, tablets, touchscreens) —
 * used to disable desktop-only affordances like the custom cursor.
 * Checks `(pointer: coarse)` and `(hover: none)`; either matching means
 * "no custom cursor".
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return (
      window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches
    );
  });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const noHover = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(coarse.matches || noHover.matches);
    update();
    coarse.addEventListener("change", update);
    noHover.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      noHover.removeEventListener("change", update);
    };
  }, []);

  return isTouch;
}
