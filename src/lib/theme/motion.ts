/** Shared campaign motion tokens — use with `useReducedMotion()` for accessible fallbacks. */

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const MOTION_DURATION = {
  fast: 0.2,
  base: 0.55,
  slow: 0.7,
  marquee: 32,
} as const;

export const MOTION_TRANSITION = {
  default: { duration: MOTION_DURATION.base, ease: MOTION_EASE },
  fast: { duration: MOTION_DURATION.fast, ease: MOTION_EASE },
  spring: { type: "spring" as const, stiffness: 260, damping: 20 },
} as const;

export function motionTransition(reduced: boolean | null) {
  return reduced ? { duration: 0 } : MOTION_TRANSITION.default;
}

export function modalBackdropMotion(reduced: boolean | null) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: reduced ? { duration: 0 } : { duration: MOTION_DURATION.fast },
  };
}

export function modalPanelMotion(reduced: boolean | null) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: MOTION_TRANSITION.spring,
  };
}

export function modalSheetMotion(reduced: boolean | null) {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
    transition: { type: "spring" as const, damping: 28, stiffness: 320 },
  };
}
