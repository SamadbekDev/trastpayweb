import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Вклады в сумах и долларах США",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Срочные, сберегательные и онлайн-вклады ЧАБ «Трастбанк» до 16% в сумах и до 7,5% в USD. Калькулятор доходности вклада.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
