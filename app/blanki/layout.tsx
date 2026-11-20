import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Образцы бланков и договоров",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Типовые формы заявлений и договоров ЧАБ «Трастбанк» для юридических и физических лиц.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
