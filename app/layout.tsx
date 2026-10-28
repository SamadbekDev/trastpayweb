import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased overflow-x-hidden text-[#08243f] [padding:env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)]">
        {children}
      </body>
    </html>
  );
}
