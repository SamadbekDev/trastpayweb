import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Акционерам и инвесторам",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Наблюдательный Совет, структура акционерного капитала, финансовая отчётность, собрания акционеров и дивиденды ЧАБ «Трастбанк» (TRSB).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
