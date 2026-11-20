"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Panel, SectionHeading } from "@/components/ui/PageKit";
import OFFICES from "@/data/legacy/offices.json";
import OFFICES_UZ from "@/data/legacy/offices.uz.json";
import OFFICES_EN from "@/data/legacy/offices.en.json";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/i18n/tr";
import { UI_DICT } from "@/i18n/dict/ui";

interface Office {
  name: string;
  slug: string;
  address: string;
  phone: string;
  fax: string;
  inn?: string;
  helpline?: string;
}

const quotes = (s: string) => s.replace(/"([^"]+)"/g, "«$1»");
const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;

/** Offices list from the old trustbank.uz («Контакты филиалов»), Figma «Офисы и филиалы» table. */
export default function OfficesDirectory({ title = "Офисы банковских услуг" }: { title?: string }) {
  const lang = useLang();
  const t = (s: string) => tr(lang, s, UI_DICT);
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    // Uzbek / English names and addresses from the old site, matched by office slug; Russian otherwise
    const local = ((lang === "uz" ? OFFICES_UZ : lang === "en" ? OFFICES_EN : []) as Office[]);
    const all = (OFFICES as Office[]).map((o) => {
      const l = local.find((x) => x.slug === o.slug);
      return { ...o, name: quotes(l?.name || o.name), address: l?.address || o.address };
    });
    return needle ? all.filter((o) => `${o.name} ${o.address}`.toLowerCase().includes(needle)) : all;
  }, [q, lang]);

  return (
    <Panel id="ofisy" className="flex flex-col gap-5">
      <SectionHeading title={t(title)} description={t("Адреса, телефоны и ИНН всех офисов и центров банковских услуг.")} />
      <label className="relative block">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Поиск по городу или названию офиса")}
          className="h-12 w-full rounded-tile border border-line bg-page pl-11 pr-4 text-[14px] text-ink outline-none transition-colors focus:border-primary"
        />
      </label>
      <div className="-mx-2 overflow-x-auto px-2">
        <table className="w-full min-w-[720px] text-left text-[13px] leading-5">
          <thead>
            <tr className="border-b border-line text-[12px] font-semibold uppercase tracking-[0.04em] text-text-muted">
              <th className="px-3 py-2.5">{t("Офис")}</th>
              <th className="px-3 py-2.5">{t("Адрес")}</th>
              <th className="px-3 py-2.5">{t("Телефон")}</th>
              <th className="px-3 py-2.5">{t("Телефон доверия")}</th>
              <th className="px-3 py-2.5">{t("ИНН")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {list.map((o) => (
              <tr key={o.slug} className="align-top">
                <td className="px-3 py-3 font-semibold text-ink">{o.name}</td>
                <td className="px-3 py-3 text-ink-soft">{o.address || "—"}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  {o.phone ? (
                    <a href={tel(o.phone)} className="text-primary hover:underline">
                      {o.phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-ink-soft">{o.helpline || "—"}</td>
                <td className="px-3 py-3 text-ink-soft">{o.inn || "—"}</td>
              </tr>
            ))}
            {!list.length ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-text-muted">
                  {t("Ничего не найдено")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
