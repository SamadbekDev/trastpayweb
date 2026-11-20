import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "О банке «Трастбанк»",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "История ЧАБ «Трастбанк» с 1994 года, корпоративное управление, рейтинги S&P B+/B, миссия, комплаенс и лицензия ЦБ РУз № 44.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
