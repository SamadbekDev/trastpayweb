"use client";

import { DepositDetailPageConfig } from "@/types/deposits";
import DepositProductHeader from "./DepositProductHeader";
import DepositDetailHero from "./DepositDetailHero";
import DepositHighlights from "./DepositHighlights";
import DepositBenefits from "./DepositBenefits";
import DepositSteps from "./DepositSteps";
import DepositCalculator from "./DepositCalculator";
import DepositConditions from "./DepositConditions";
import DepositDocuments from "./DepositDocuments";
import DepositOffices from "./DepositOffices";
import DepositFaq from "./DepositFaq";
import OffersCarousel from "@/components/OffersCarousel";
import Footer from "@/components/layout/Footer";
import "@/i18n";

interface DepositDetailViewProps {
  config: DepositDetailPageConfig;
}

export default function DepositDetailView({ config }: DepositDetailViewProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <DepositProductHeader />
      <main className="flex-grow">
        <DepositDetailHero config={config} />
        <DepositHighlights config={config} />
        <DepositBenefits config={config} />
        <DepositSteps config={config} />
        <DepositCalculator config={config} />
        <DepositConditions config={config} />
        <DepositDocuments config={config} />
        <DepositOffices config={config} />
        <OffersCarousel config={config.offers} />
        <DepositFaq config={config} />
      </main>
      <Footer config={config.footer} />
    </div>
  );
}
