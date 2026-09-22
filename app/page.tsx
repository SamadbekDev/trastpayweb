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
        <ProductGrid config={config.products} />
        <CurrencyConverter config={config.currency} />
        <OffersCarousel config={config.offers} />
        <NewsGrid config={config.news} />
        <LoanCalculator config={config.calculator} />
        <Trastpay config={config.trastpay} />
      </main>

      <Footer config={config.footer} />
    </div>
  );
}
