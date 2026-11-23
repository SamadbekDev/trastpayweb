"use client";

import { CardDetailPageConfig } from "@/types/cards";
import CardsHeader from "./CardsHeader";
import CardDetailHero from "./CardDetailHero";
import CardSuggested from "./CardSuggested";
import CardVirtualOnline from "./CardVirtualOnline";
import DepositHighlights from "@/components/deposits/DepositHighlights";
import DepositSteps from "@/components/deposits/DepositSteps";
import DepositOffices from "@/components/deposits/DepositOffices";
import DepositFaq from "@/components/deposits/DepositFaq";
import Footer from "@/components/layout/Footer";
import ContentReveal from "@/components/motion/ContentReveal";
import { SiteBrandingProvider } from "@/components/SiteBranding";
import "@/i18n";

interface CardDetailViewProps {
  config: CardDetailPageConfig;
}

export default function CardDetailView({ config }: CardDetailViewProps) {
  return (
    <SiteBrandingProvider
      logo={config.header?.logo}
      logoText={config.header?.logoText}
    >
      <ContentReveal className="flex min-h-screen flex-col bg-[#FFFAFA]">
        <CardsHeader config={config.header} />
        <main className="flex-grow">
          <CardDetailHero config={config} />
          <DepositHighlights config={config} />
          <DepositSteps config={config} />
          <DepositOffices config={config} />
          <CardSuggested title={config.suggestedTitle} products={config.suggested} />
          <CardVirtualOnline config={config.virtualOnline} />
          <DepositFaq config={config} />
        </main>
        <Footer config={config.footer} />
      </ContentReveal>
    </SiteBrandingProvider>
  );
}
