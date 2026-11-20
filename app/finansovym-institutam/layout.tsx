import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Финансовым институтам",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description: "Корреспондентские отношения, операции на межбанковском рынке, аккредитивы и торговое финансирование ЧАБ «Трастбанк».",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
