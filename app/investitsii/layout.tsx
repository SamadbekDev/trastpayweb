import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Инвестиции",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description: "Инвестиционные программы и проекты ЧАБ «Трастбанк».",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
