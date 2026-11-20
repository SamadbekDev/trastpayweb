import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Денежные переводы",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Международные денежные переводы в ЧАБ «Трастбанк»: Western Union, Золотая Корона, MoneyGram, Азия Экспресс, UPT, AstraSend и SWIFT GPI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
