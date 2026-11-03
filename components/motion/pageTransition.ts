export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
    opacity: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const },
  },
};
