import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Курсы валют и конвертер",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Актуальные курсы валют ЧАБ «Трастбанк» (USD, EUR, GBP, CHF, CNY, RUB, JPY): покупка, продажа, курс ЦБ РУз и онлайн-конвертер.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
