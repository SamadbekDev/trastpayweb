import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Филиалы, офисы и банкоматы",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Интерактивная карта филиалов, офисов банковских услуг (ОБУ), обменных пунктов и банкоматов ЧАБ «Трастбанк» по всему Узбекистану.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
