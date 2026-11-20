import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Вакансии",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description: "Вакансии и кадровая политика ЧАБ «Трастбанк». Отправьте резюме онлайн.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
