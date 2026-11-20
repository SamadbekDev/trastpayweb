import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Карта сайта",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description: "Все разделы сайта ЧАБ «Трастбанк».",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
