"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/components/motion/pageTransition";

/** Smooth enter when content appears (e.g. after data load / opening a page). */
export default function ContentReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
