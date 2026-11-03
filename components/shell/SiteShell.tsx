"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeContent from "@/components/shell/HomeContent";
import TariffsContent from "@/components/tariffs/TariffsContent";
import {
  findChipIdForSection,
  resolveChipSection,
  sectionPath,
  SiteSection,
} from "@/components/shell/sectionChips";
import { pageTransition } from "@/components/motion/pageTransition";
import useHomePageConfig from "@/hooks/useHomePageConfig";
import { TrastbankError, TrastbankLoader } from "@/components/PageStatus";
import { HeaderChip } from "@/types/pageConfig";
import "@/i18n";

function sectionFromPath(pathname: string): SiteSection {
  return pathname.startsWith("/tarify") ? "tariffs" : "products";
}

export default function SiteShell({
  initialSection,
}: {
  initialSection?: SiteSection;
}) {
  const { config, loading, error, refetch } = useHomePageConfig();
  const [section, setSection] = useState<SiteSection>(() => {
    if (initialSection) return initialSection;
    if (typeof window !== "undefined") {
      return sectionFromPath(window.location.pathname);
    }
    return "products";
  });

  useEffect(() => {
    const onPopState = () => {
      setSection(sectionFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleChipSelect = useCallback((chip: HeaderChip) => {
    const next = resolveChipSection(chip);
    if (!next) return false;

    setSection(next);
    const path = sectionPath(next);
    if (window.location.pathname !== path) {
      window.history.replaceState(null, "", path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }, []);

  if (loading) {
    return <TrastbankLoader />;
  }

  if (error || !config) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50/50 p-4">
        <TrastbankError onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <Header
        config={config.header}
        activeChipId={findChipIdForSection(config.header?.chips, section)}
        onChipSelect={handleChipSelect}
      />

      <div className="relative flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={section}
            className="flex-grow will-change-transform"
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
          >
            {section === "products" ? (
              <HomeContent config={config} />
            ) : (
              <TariffsContent />
            )}
          </motion.main>
        </AnimatePresence>
      </div>

      <Footer config={config.footer} />
    </div>
  );
}
