"use client";

import DepositsHeader from "@/components/deposits/DepositsHeader";
import DepositsCatalog from "@/components/deposits/DepositsCatalog";
import Footer from "@/components/layout/Footer";
import ContentReveal from "@/components/motion/ContentReveal";
import useDepositsPageConfig from "@/hooks/useDepositsPageConfig";
import { TrastbankLoader, TrastbankError } from "@/components/PageStatus";
import "@/i18n";

export default function DepositsPage() {
  const { config, loading, refetch } = useDepositsPageConfig();

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
    <ContentReveal className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <DepositsHeader config={config.header} />
      <main className="flex-grow">
        <DepositsCatalog config={config} />
      </main>
      <Footer config={config.footer} />
    </ContentReveal>
  );
}
