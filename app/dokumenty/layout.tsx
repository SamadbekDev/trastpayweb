import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Банковское законодательство и открытые данные",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description: "Правовая база банковской деятельности в Узбекистане, внутренние документы ЧАБ «Трастбанк» и наборы открытых данных.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
