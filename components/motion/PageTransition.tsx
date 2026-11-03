"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/components/motion/pageTransition";

/** Enter animation for App Router `template.tsx` (remounts on navigation). */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="min-h-screen"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
