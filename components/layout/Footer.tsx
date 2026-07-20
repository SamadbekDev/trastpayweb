import React from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Send
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Top footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Logo and License Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg shadow-md">
                <svg viewBox="0 0 100 100" className="w-5 h-5 fill-white">
                  <path d="M50,10 L85,25 L85,55 C85,75 70,90 50,95 C30,90 15,75 15,55 L15,25 L50,10 Z M50,22 C37.8,22 28,31.8 28,44 L38,44 C38,37.4 43.4,32 50,32 C56.6,32 62,37.4 62,44 L72,44 C72,31.8 62.2,22 50,22 Z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">TRASTBANK</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Private Joint-Stock Bank &quot;Trustbank&quot; provides a full spectrum of high-fidelity banking services for private individuals and corporate entities throughout the Republic of Uzbekistan.
            </p>

            <div className="flex items-start space-x-2.5 text-xs text-slate-400">
              <ShieldCheck className="text-primary h-4 w-4 shrink-0 mt-0.5" />
              <span>Licensed by the Central Bank of the Republic of Uzbekistan No. 44. First issued on June 21, 1994.</span>
            </div>
          </div>

          {/* Links Column 1: Services (2.5 cols) */}
          <div className="lg:col-span-2 lg:col-start-6 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">
              Banking Services
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="#loans" className="hover:text-primary transition-colors">Auto Loans</Link>
              </li>
              <li>
                <Link href="#loans" className="hover:text-primary transition-colors">Microloans</Link>
              </li>
              <li>
                <Link href="#loans" className="hover:text-primary transition-colors">Consumer Credits</Link>
              </li>
              <li>
                <Link href="#cards" className="hover:text-primary transition-colors">Visa & Mastercard</Link>
              </li>
              <li>
                <Link href="#cards" className="hover:text-primary transition-colors">Humo & Uzcard</Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Tools & Tech (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">
              Interactive Services
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="#calculator" className="hover:text-primary transition-colors">Loan Calculator</Link>
              </li>
              <li>
                <Link href="#calculator" className="hover:text-primary transition-colors">Exchange Rates</Link>
              </li>
              <li>
                <Link href="#mobile-app" className="hover:text-primary transition-colors">Trastpay Mobile App</Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">Card Applications</Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">Branch Locations</Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Contact details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">
              Support & Contacts
            </h4>
            <ul className="space-y-3.5 text-xs font-medium text-slate-400">
              <li className="flex items-start space-x-2.5">
                <Phone className="text-primary h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:1287" className="font-bold text-white hover:text-primary block">1287</a>
                  <span className="text-[10px] block">Single support hotline</span>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Phone className="text-primary h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+998712076200" className="text-white hover:text-primary font-bold block">+998 71 207-62-00</a>
                  <span className="text-[10px] block">Headquarters Tashkent</span>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="text-primary h-4 w-4 shrink-0 mt-0.5" />
                <a href="mailto:info@trustbank.uz" className="text-white hover:text-primary block font-semibold">info@trustbank.uz</a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="text-primary h-4 w-4 shrink-0 mt-0.5" />
                <span>7 Navoiy Street, Tashkent, 100011, Republic of Uzbekistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar (Copyright & Socials) */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <div className="text-center md:text-left mb-4 md:mb-0 leading-relaxed font-semibold">
            <span>© 1994-2026 PJSB &quot;Trustbank&quot;. All rights reserved.</span>
            <span className="block mt-1 text-[10px] text-slate-600 font-medium">Any use of website materials is subject to mandatory reference to trustbank.uz source.</span>
          </div>

          {/* Social icons */}
          <div className="flex space-x-4">
            <a 
              href="#facebook"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              aria-label="Follow us on Facebook"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="#telegram"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              aria-label="Follow us on Telegram"
            >
              <Send size={15} />
            </a>
            <a 
              href="#instagram"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              aria-label="Follow us on Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="#linkedin"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
              aria-label="Follow us on LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
