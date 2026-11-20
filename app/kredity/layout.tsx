import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Кредитование физических лиц",
    template: "%s | ЧАБ «Трастбанк»",
  },
  description:
    "Автокредиты (KIA, Chery, Haval, Changan), ипотека, микрозаймы, потребительский кредит «Универсал», овердрафт, «Зелёная энергия» и онлайн-скоринг.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
