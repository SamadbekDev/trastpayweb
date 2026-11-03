"use client";

import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CurrencyConverter from "@/components/CurrencyConverter";
import OffersCarousel from "@/components/OffersCarousel";
import NewsGrid from "@/components/NewsGrid";
import LoanCalculator from "@/components/LoanCalculator";
import Trastpay from "@/components/Trastpay";
import SectionSpacer from "@/components/SectionSpacer";
import { HomePageConfig } from "@/types/pageConfig";

export default function HomeContent({ config }: { config: HomePageConfig }) {
  return (
    <div className="bg-[#FAFAFA]">
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
    </div>
  );
}
