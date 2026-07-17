import React from "react";
import Image from "next/image";
import { CheckCircle2, Smartphone } from "lucide-react";

const appFeatures = [
  {
    title: "Instant P2P Transfers",
    description: "Transfer money between Humo and Uzcard at the lowest rates.",
  },
  {
    title: "Utility & QR Payments",
    description: "Pay for utilities, internet, state fees, and scan QR codes at checkout.",
  },
  {
    title: "Card Lock & Security",
    description: "Change card pin codes, block lost cards, or change transaction limits.",
  },
  {
    title: "Online Microloan",
    description: "Submit credit applications and get funds within 5 minutes online.",
  },
];

export default function MobileApp() {
  return (
    <section id="mobile-app" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── Text column ── */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Smartphone size={12} />
              <span>Mobile Banking</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Manage Your Finances on the Go with{" "}
              <span className="text-primary">Trastpay</span>
            </h2>

            <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-xl">
              Download the free Trastpay mobile application to perform transfers, pay bills,
              track loan payments, and open accounts instantly without visiting a bank branch.
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {appFeatures.map((feat) => (
                <div key={feat.title} className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{feat.title}</h4>
                    <p className="text-xs text-text-muted mt-0.5">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Store badges */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100 mt-6">
              <a
                href="#app-store"
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95 border border-slate-800"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M18.7,19.5C17.9,20.7,17,21.9,15.6,21.9c-1.3,0-1.8-0.8-3.3-0.8c-1.5,0-2,0.8-3.3,0.8c-1.3,0-2.3-1.2-3.1-2.4C4.3,17.1,3,12.4,4.6,9.7C5.4,8.3,6.8,7.5,8.3,7.5c1.1,0,2.1,0.8,2.8,0.8c0.7,0,2-1,3.3-0.8c0.6,0,2.2,0.2,3.2,1.7c-0.1,0.1-1.9,1.1-1.9,3.2c0,2.5,2.1,3.4,2.2,3.4C17.9,16.5,18.7,19.5,18.7,19.5z M15.8,5.1c0.6-0.7,1-1.7,0.9-2.7c-0.8,0-1.9,0.5-2.4,1.2c-0.4,0.5-0.8,1.5-0.7,2.5C14.4,6.2,15.3,5.7,15.8,5.1z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-none">Download on the</span>
                  <span className="block text-sm font-bold leading-none mt-1">App Store</span>
                </div>
              </a>

              <a
                href="#google-play"
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95 border border-slate-800"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M5.3,20.8c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.7,0.6,1.2,1.3,1.2c0.2,0,0.4-0.1,0.6-0.2l12.4-7.2L15,11L5.3,20.8z M20.3,13.9l-2.6-1.5L14,15.2l3.7,2.2L20.3,16c0.4-0.2,0.7-0.7,0.7-1.1C21,14.5,20.7,14.1,20.3,13.9z M4.3,3.2c-0.3,0.3-0.3,0.7-0.3,1.1v15.3c0,0.4,0.1,0.8,0.4,1.1l9.6-9.6L4.3,3.2z M17.7,6.6L5.3,13.8L15,13l4.3,4.3L17.7,6.6z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-none">Get it on</span>
                  <span className="block text-sm font-bold leading-none mt-1">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* ── Image column ── */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Decorative rings — now uses CSS animation */}
            <div className="anim-float absolute w-80 h-80 rounded-full border border-slate-200/50 opacity-70 pointer-events-none" />
            <div
              className="anim-float absolute w-[360px] h-[360px] rounded-full border border-slate-100 opacity-50 pointer-events-none"
              style={{ animationDelay: "2.5s" }}
            />

            <div className="relative w-full max-w-sm aspect-square hover:scale-105 transition-transform duration-500 z-10">
              <Image
                src="/images/mobile_app_mockup.png"
                alt="Trastpay Mobile App Interface Mockup"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
