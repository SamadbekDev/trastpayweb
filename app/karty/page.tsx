"use client";

import CardsHeader from "@/components/cards/CardsHeader";
import CardsCatalog from "@/components/cards/CardsCatalog";
import Footer from "@/components/layout/Footer";
import useCardsPageConfig from "@/hooks/useCardsPageConfig";
import { TrastbankLoader, TrastbankError } from "@/components/PageStatus";
import "@/i18n";

export default function CardsPage() {
  const { config, loading, refetch } = useCardsPageConfig();

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
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <CardsHeader config={config.header} />
      <main className="flex-grow">
        <CardsCatalog config={config} />
      </main>
      <Footer />
    </div>
  );
}
