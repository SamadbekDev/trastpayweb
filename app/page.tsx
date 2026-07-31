"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";
import QuickTools from "@/components/QuickTools";
import CardProducts from "@/components/CardProducts";
import Features from "@/components/Services";
import GetMore from "@/components/GetMore";
import Trastpay from "@/components/Trastpay";
import LinksFooter from "@/components/LinksFooter";
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
    <div className="min-h-screen flex flex-col">
      <Header config={config?.header} />
      
      <main className="flex-grow">
        <Hero config={config?.hero} />
        
        <CardProducts config={config?.productTabs} />

        <GetMore config={config?.promoCarousel} />

        <QuickTools
          calcTabsConfig={config?.calculatorTabs}
          stepsConfig={config?.depositSteps}
          calculatorConfig={config?.depositCalculator}
        />
        
        <Features config={config?.services} />
        
        <Trastpay
          instantCardConfig={config?.instantCard}
          mobileAppConfig={config?.mobileApp}
        />
        
        <LinksFooter />
      </main>

      <Footer />
    </div>
  );
}
