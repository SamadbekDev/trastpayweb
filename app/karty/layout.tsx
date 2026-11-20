import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Пластиковые карты (Uzcard, Humo, Visa, Mastercard)",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Дебетовые, международные, кобейджинговые и детские карты ЧАБ «Трастбанк»: Uzcard, Humo, Uzcard Kids, Visa Classic/Infinite, MasterCard Standard/Gold/World Elite.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
