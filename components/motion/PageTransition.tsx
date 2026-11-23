"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Enter animation for App Router `template.tsx` (remounts on navigation).
 * Only the content after the site header ([data-site-header]) fades in (see `.page-enter` in globals.css): the header looks
 * the same on every page, so fading it too made the whole screen blink when switching sections.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash) return;
    const scrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollTop();
    const raf = requestAnimationFrame(scrollTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <div className="page-enter min-h-screen">{children}</div>;
}
