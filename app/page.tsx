import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";
import QuickTools from "@/components/QuickTools";
import CardProducts from "@/components/CardProducts";
import Features from "@/components/Services";
import GetMore from "@/components/GetMore"
import Trastpay from "@/components/Trastpay";
import LinksFooter from "@/components/LinksFooter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Dynamic Main Header */}
      <Header />
      
      {/* Home Page Content */}
      <main className="flex-grow">
        {/* Hero Slider with promotions */}
        <Hero />
        
        <CardProducts />

        <GetMore />

        {/* Quick calculators and Currency rates */}
        <QuickTools />
        
        {/* Cards Catalog */}
        
        {/* Features / Benefits Grid */}
        <Features />
        
        {/* Mobile App Section */}
        <Trastpay />
        
        {/* News & Tenders Panel */}
        <LinksFooter />
      </main>

      {/* Main Bank Footer */}
      <Footer />
    </div>
  );
}
