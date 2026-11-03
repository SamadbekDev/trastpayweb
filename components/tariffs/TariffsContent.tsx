"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TariffsHero from "@/components/tariffs/TariffsHero";
import TariffsGrid from "@/components/tariffs/TariffsGrid";
import { pageTransition } from "@/components/motion/pageTransition";
import { TrastbankError, TrastbankLoader } from "@/components/PageStatus";
import useTariffsPageConfig from "@/hooks/useTariffsPageConfig";
import {
  TariffAudience,
  TariffsAudienceContent,
  TariffsAudienceView,
} from "@/types/tariffs";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

function resolveAudience(
  data: TariffsAudienceContent,
  lang: Language
): TariffsAudienceView {
  return {
    title: getLocalizedText(data.title, lang),
    description: getLocalizedText(data.description, lang),
    quickLinksTitle: getLocalizedText(data.quickLinksTitle, lang),
    sectionTitle: getLocalizedText(data.sectionTitle, lang),
    sectionHint: getLocalizedText(data.sectionHint, lang),
    quickLinks: data.quickLinks.map((link) => ({
      id: link.id,
      label: getLocalizedText(link.label, lang),
      href: link.href,
    })),
    cards: data.cards.map((card) => ({
      id: card.id,
      title: getLocalizedText(card.title, lang),
      href: card.href,
    })),
  };
}

export default function TariffsContent({
  initialAudience = "individual",
}: {
  initialAudience?: TariffAudience;
}) {
  const { i18n } = useTranslation();
  const lang =
    (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const { config, loading, error, refetch } = useTariffsPageConfig();
  const [audience, setAudience] = useState<TariffAudience>(initialAudience);

  const content = useMemo(() => {
    if (!config) return null;
    return resolveAudience(config[audience], lang);
  }, [audience, config, lang]);

  const detailLinkLabel = useMemo(() => {
    if (!config) return "";
    return getLocalizedText(config.detailLinkLabel, lang);
  }, [config, lang]);

  if (loading && !config) {
    return <TrastbankLoader />;
  }

  if (!config || !content) {
    return (
      <div className="flex min-h-[40vh] w-full items-center justify-center p-4">
        <TrastbankError onRetry={refetch} />
      </div>
    );
  }

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
          key={`${audience}-${lang}`}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          <TariffsGrid content={content} detailLinkLabel={detailLinkLabel} />
        </motion.div>
      </AnimatePresence>
      {error ? (
        <p className="px-4 pb-4 text-center text-xs text-slate-400">
          Показан резервный контент (API тарифов недоступен)
        </p>
      ) : null}
    </div>
  );
}
