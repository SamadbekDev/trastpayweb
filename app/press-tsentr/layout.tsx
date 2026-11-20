import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Пресс-центр, новости и продажа имущества",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Новости ЧАБ «Трастбанк», конкурсы, тендеры, продажа недвижимости и ответы на частые вопросы (FAQ).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
