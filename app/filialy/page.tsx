"use client";

import DepositProductHeader from "@/components/deposits/DepositProductHeader";
import BranchesMapSection from "@/components/branches/BranchesMapSection";
import OfficesDirectory from "@/components/content/OfficesDirectory";
import Footer from "@/components/layout/Footer";
import { SiteBrandingProvider } from "@/components/SiteBranding";
import useOfficesPageConfig from "@/hooks/useOfficesPageConfig";
import { TrastbankLoader, TrastbankError } from "@/components/PageStatus";
import "@/i18n";

export default function BranchesPage() {
  const { config, loading, refetch } = useOfficesPageConfig();

  if (loading) {
    return <TrastbankLoader />;
  }

  if (!config) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50/50 p-4">
        <TrastbankError onRetry={refetch} />
      </div>
    );
  }

  return (
    <SiteBrandingProvider
      logo={config.header?.logo}
      logoText={config.header?.logoText}
    >
      <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
        <DepositProductHeader header={config.header} />
        <main className="flex-grow">
          <BranchesMapSection config={config} />
          <div className="container-page py-10">
            <OfficesDirectory />
          </div>
        </main>
        <Footer config={config.footer} />
      </div>
    </SiteBrandingProvider>
  );
}
