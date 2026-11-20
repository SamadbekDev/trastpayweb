import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Тарифы для частных и корпоративных клиентов",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Актуальные тарифы ЧАБ «Трастбанк» по картам, РКО, депозитарным ячейкам и тарифным планам Standart, Exclusive, Валютный, UzEX и Цифровой филиал.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
