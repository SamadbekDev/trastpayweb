import React from "react";
import { Award, MapPin, Clock, ShieldCheck, Sparkles, Smartphone } from "lucide-react";

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  colorClass: string;
}

const features: FeatureItem[] = [
  {
    icon: Award,
    title: "25+ Years of Trust",
    description: "Operating since 1994, Trastbank is one of the most stable and reliable financial institutions in Uzbekistan, trusted by over 1 million clients.",
    colorClass: "bg-blue-50 text-primary border-blue-100"
  },
  {
    icon: MapPin,
    title: "Wide Branch Network",
    description: "Over 30 branches and specialized banking service centers across Tashkent and all regions of the republic to serve you closer to home.",
    colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100"
  },
  {
    icon: Clock,
    title: "24/7 Online Support",
    description: "Get prompt financial assistance anytime. Our specialized call center 1287 and chat support are online around the clock.",
    colorClass: "bg-amber-50 text-amber-600 border-amber-100"
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed Deposits",
    description: "All deposits are protected by the State Fund for Guaranteeing Citizens' Deposits in Banks of the Republic of Uzbekistan.",
    colorClass: "bg-indigo-50 text-indigo-600 border-indigo-100"
  },
  {
    icon: Sparkles,
    title: "VIP Card Privileges",
    description: "Access premium Visa/Mastercard airport lounges worldwide, and enjoy concierge assistance and purchase insurance policies.",
    colorClass: "bg-purple-50 text-purple-600 border-purple-100"
  },
  {
    icon: Smartphone,
    title: "Modern Trastpay App",
    description: "Manage accounts, make QR utility bill payments, and transfer money instantly with zero fees through our custom mobile application.",
    colorClass: "bg-rose-50 text-rose-600 border-rose-100"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-blue-100/50 border border-blue-100 px-3 py-1 rounded-full">
            Our Advantages
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Why Uzbekistan Chooses Trastbank
          </h2>
          <p className="text-text-muted mt-3 text-sm md:text-base">
            We combine decades of traditional banking safety with state-of-the-art digital payment infrastructure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-100 hover:border-primary/20 shadow-sm rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div>
                  {/* Icon Circle */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.colorClass} mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-800 mb-2.5 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
