import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import LangBoot from "@/components/i18n/LangBoot";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://trustbank.uz"),
  title: {
    default: "ЧАБ «Трастбанк» — Частный акционерный банк Узбекистана",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Официальный сайт ЧАБ «Трастбанк» (Узбекистан): кредиты, вклады, пластиковые карты Uzcard/Humo/Visa/Mastercard, денежные переводы, курсы валют и решения для бизнеса.",
  keywords: [
    "Трастбанк",
    "Trastbank",
    "банк Узбекистан",
    "кредиты Ташкент",
    "вклады Узбекистан",
    "курсы валют UZS",
    "РКО для бизнеса",
    "trustbank.uz",
  ],
  authors: [{ name: "ЧАБ «Трастбанк»" }],
  openGraph: {
    title: "ЧАБ «Трастбанк» — Частный акционерный банк Узбекистана",
    description:
      "Банковские услуги для частных и корпоративных клиентов: кредиты, вклады, карты, переводы, ВЭД и дистанционный банкинг Trastpay.",
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["uz_UZ", "en_US"],
    url: "https://trustbank.uz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`scroll-smooth ${roboto.variable}`}>
      <body className="antialiased overflow-x-hidden text-[#08243f] [padding:env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]">
        <LangBoot />
        {children}
      </body>
    </html>
  );
}
