"use client";

import Header from "@/components/layout/Header";
import CreditsCatalog from "@/components/credits/CreditsCatalog";
import ContentReveal from "@/components/motion/ContentReveal";
import { SiteBrandingProvider } from "@/components/SiteBranding";
import { TrastbankError, TrastbankLoader } from "@/components/PageStatus";
import useCreditsPageConfig from "@/hooks/useCreditsPageConfig";
import useHomePageConfig from "@/hooks/useHomePageConfig";
import "@/i18n";

export default function CreditsPage() {
  const { config: home } = useHomePageConfig();
  const { config, loading, refetch } = useCreditsPageConfig();

  if (loading) {
    return <TrastbankLoader />;
  }

  if (!config) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#FAFAFA] p-4">
        <TrastbankError onRetry={refetch} />
      </div>
    );
  }

  return (
    <SiteBrandingProvider
      logo={home?.header?.logo}
      logoText={home?.header?.logoText}
    >
      <ContentReveal className="flex min-h-screen flex-col bg-[#FAFAFA]">
        {home?.header ? <Header config={home.header} showProductNav={false} /> : null}
        <main className="flex-grow bg-[#FAFAFA]">
          <CreditsCatalog config={config} />
        </main>
      </ContentReveal>
    </SiteBrandingProvider>
  );
}
