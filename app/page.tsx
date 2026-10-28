"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CurrencyConverter from "@/components/CurrencyConverter";
import OffersCarousel from "@/components/OffersCarousel";
import NewsGrid from "@/components/NewsGrid";
import LoanCalculator from "@/components/LoanCalculator";
import Trastpay from "@/components/Trastpay";
import Footer from "@/components/layout/Footer";
import SectionSpacer from "@/components/SectionSpacer";
import useHomePageConfig from "@/hooks/useHomePageConfig";
import { TrastbankLoader, TrastbankError } from "@/components/PageStatus";

export default function Home() {
  const { config, loading, error, refetch } = useHomePageConfig();

  if (loading) {
    return <TrastbankLoader />;
  }

  if (error || !config) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50/50 p-4">
        <TrastbankError onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header config={config.header} />

      <main className="flex-grow bg-[#FAFAFA]">
        <Hero config={config.hero} />
        <SectionSpacer />
        <ProductGrid config={config.products} />
        <SectionSpacer />
        <CurrencyConverter config={config.currency} />
        <SectionSpacer />
        <LoanCalculator config={config.calculator} />
        <SectionSpacer />
        <NewsGrid config={config.news} />
        <SectionSpacer />
        <OffersCarousel config={config.offers} />
        <SectionSpacer />
        <Trastpay config={config.trastpay} />
        <SectionSpacer />
      </main>

      <Footer config={config.footer} />
    </div>
  );
}
