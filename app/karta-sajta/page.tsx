"use client";

import Link from "next/link";
import StaticPageShell from "@/components/layout/StaticPageShell";
import { Breadcrumbs, PageHero } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { SITEMAP_GROUPS as SITEMAP_GROUPS_RU } from "@/data/extraSections";

export default function SitemapPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const SITEMAP_GROUPS = trDeep(lang, SITEMAP_GROUPS_RU, PAGES_DICT, UI_DICT);
  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Карта сайта ЧАБ «Трастбанк»") }]} />
        <PageHero eyebrow={t("Навигация")} title={t("Карта сайта ЧАБ «Трастбанк»")} subtitle={t("Полная структура разделов для частных клиентов, бизнеса, акционеров, финансовых институтов и справочной информации.")} />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SITEMAP_GROUPS.map((group) => (
            <div
              key={group.title}
              className="flex flex-col gap-4 rounded-panel border border-line bg-white p-6 lg:p-8"
            >
              <h2 className="text-[19px] font-bold text-ink">
                {group.title}
              </h2>
              <ul className="flex flex-col divide-y divide-line">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-2.5 text-[14px] font-medium text-ink-soft hover:text-primary"
                    >
                      <span>{link.label}</span>
                      <span>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </StaticPageShell>
  );
}
