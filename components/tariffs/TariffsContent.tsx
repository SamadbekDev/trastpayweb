"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TariffsHero from "@/components/tariffs/TariffsHero";
import TariffsGrid from "@/components/tariffs/TariffsGrid";
import { pageTransition } from "@/components/motion/pageTransition";
import { tariffsPageConfig } from "@/mock/tariffsPage";
import { TariffAudience } from "@/types/tariffs";

export default function TariffsContent({
  initialAudience = "individual",
}: {
  initialAudience?: TariffAudience;
}) {
  const [audience, setAudience] = useState<TariffAudience>(initialAudience);
  const content = tariffsPageConfig[audience];

  return (
    <div className="bg-[#FAFAFA]">
      <div className="h-7 w-full bg-[#FAFAFA]" aria-hidden />
      <TariffsHero
        audience={audience}
        content={content}
        onAudienceChange={setAudience}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={audience}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          <TariffsGrid
            content={content}
            detailLinkLabel={tariffsPageConfig.detailLinkLabel}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
