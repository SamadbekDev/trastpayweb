/** Shared enter/exit — opacity only to avoid vertical layout jump. */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};
