import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trastbank | Private Joint-Stock Bank in Uzbekistan",
  description:
    "Trastbank provides a wide range of premium banking services in Uzbekistan. Apply for auto loans, consumer credit, order international Visa/Mastercard cards, and utilize online currency converter and loan calculators.",
  keywords: [
    "Trastbank",
    "Uzbekistan banking",
    "loans Uzbekistan",
    "credit cards Tashkent",
    "currency exchange UZS",
    "loan calculator",
    "trust bank uz",
  ],
  authors: [{ name: "Trastbank Dev Team" }],
  openGraph: {
    title: "Trastbank | Private Joint-Stock Bank in Uzbekistan",
    description:
      "Premium banking services for individuals and corporate clients. Fast loans, high-interest deposits, and digital transfers.",
    type: "website",
    locale: "en_US",
    url: "https://trustbank.uz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${roboto.variable}`}>
      <body className="antialiased overflow-x-hidden text-[#08243f]">
        {children}
      </body>
    </html>
  );
}
