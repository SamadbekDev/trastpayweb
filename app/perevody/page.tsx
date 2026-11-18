"use client";

import TransfersPageView from "@/components/transfers/TransfersPageView";
import { SiteBrandingProvider } from "@/components/SiteBranding";
import ContentReveal from "@/components/motion/ContentReveal";
import { TrastbankError, TrastbankLoader } from "@/components/PageStatus";
import useHomePageConfig from "@/hooks/useHomePageConfig";
import useTransfersPageConfig from "@/hooks/useTransfersPageConfig";
import "@/i18n";

export default function TransfersPage() {
  const { config: home, loading: homeLoading, refetch: refetchHome } = useHomePageConfig();
  const {
    config: transfers,
    loading: transfersLoading,
    refetch: refetchTransfers,
  } = useTransfersPageConfig();

  if (homeLoading || transfersLoading) {
    return <TrastbankLoader />;
  }

  if (!home || !transfers) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#FAFAFA] p-4">
        <TrastbankError
          onRetry={() => {
            void refetchHome();
            void refetchTransfers();
          }}
        />
      </div>
    );
  }

  return (
    <SiteBrandingProvider
      logo={home.header?.logo}
      logoText={home.header?.logoText}
    >
      <ContentReveal className="flex min-h-screen flex-col bg-[#FAFAFA]">
        <TransfersPageView
          config={transfers}
          header={home.header}
          footer={home.footer}
        />
      </ContentReveal>
    </SiteBrandingProvider>
  );
}
