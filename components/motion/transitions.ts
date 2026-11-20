/** Shared enter/exit — smooth opacity & subtle lift without layout jump. */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: {
    duration: 0.34,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};
