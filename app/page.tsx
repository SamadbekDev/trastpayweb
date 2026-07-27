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

export default function Home() {
  const { config } = useHomePageConfig();

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
