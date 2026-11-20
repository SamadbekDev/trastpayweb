"use client";

import Link from "next/link";
import StaticPageShell from "@/components/layout/StaticPageShell";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";

export default function NotFoundPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);

  return (
    <StaticPageShell>
      <section className="mx-auto flex w-full max-w-[720px] flex-col items-center px-4 py-24 text-center">
        <span className="rounded-full bg-primary-soft px-4 py-1.5 text-[14px] font-bold text-primary">
          404
        </span>
        <h1 className="mt-5 text-[32px] font-bold leading-tight text-ink sm:text-[40px]">
          {t("Страница не найдена")}
        </h1>
        <p className="mt-3 max-w-[520px] text-[16px] text-text-muted">
          {t("Возможно, ссылка устарела или раздел был перемещён. Воспользуйтесь главной страницей или картой сайта.")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-tile bg-primary px-6 text-[15px] font-semibold text-white hover:bg-primary-deep"
          >
            {t("На главную")}
          </Link>
          <Link
            href="/karta-sajta"
            className="inline-flex h-12 items-center rounded-tile bg-surface px-6 text-[15px] font-semibold text-ink hover:bg-line"
          >
            {t("Карта сайта")}
          </Link>
        </div>
      </section>
    </StaticPageShell>
  );
}
