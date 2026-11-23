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
import ContentReveal from "@/components/motion/ContentReveal";
import { SiteBrandingProvider } from "@/components/SiteBranding";
import "@/i18n";

interface DepositDetailViewProps {
  config: DepositDetailPageConfig;
}

export default function DepositDetailView({ config }: DepositDetailViewProps) {
  return (
    <SiteBrandingProvider
      logo={config.header?.logo}
      logoText={config.header?.logoText}
    >
      <ContentReveal className="flex min-h-screen flex-col bg-white">
        <DepositProductHeader header={config.header} />
        <main className="flex-grow">
          <DepositDetailHero config={config} />
          <DepositHighlights config={config} />
          <DepositBenefits config={config} />
          <DepositSteps config={config} />
          <DepositCalculator config={config} />
          <div id="info">
            <DepositConditions config={config} />
          </div>
          <DepositDocuments config={config} />
          <DepositOffices
            config={{
              officesTitle: config.officesTitle,
              city: config.city,
              offices: config.offices ?? [],
              atms: config.atms ?? [],
              mapEmbedUrl: config.mapEmbedUrl || "",
            }}
          />
          {config.offers ? <OffersCarousel config={config.offers} /> : null}
          <DepositFaq config={config} />
        </main>
        {config.footer ? <Footer config={config.footer} /> : null}
      </ContentReveal>
    </SiteBrandingProvider>
  );
}
