/**
 * «О банке» section — structure mirrors Figma "Ultimate Design" → «О банке — страницы (23)»:
 * 00 Обзор + 8 groups (О банке, Стратегия, Управление, Репутация, Документы, Комплаенс, Карьера, Реквизиты).
 *
 * Page content comes from the old trustbank.uz (`legacyKey` → data/legacy/pages.json).
 * `blocks` is used only where the old site has no content.
 */
import {
  Award,
  BarChart3,
  Briefcase,
  Building2,
  CircleSlash,
  ClipboardList,
  CreditCard,
  Eye,
  FileCheck2,
  FileText,
  FolderOpen,
  GraduationCap,
  History,
  MapPin,
  Network,
  Scale,
  SearchCheck,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ContentBlock } from "@/types/content";

export interface AboutPage {
  slug: string;
  /** Overrides /o-banke/{slug} when the page lives elsewhere (e.g. /vakansii). */
  href?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  heroSubtitle?: string;
  /** Key of the migrated page in data/legacy/pages.json */
  legacyKey?: string;
  /** Hand-written content, used when there is no migrated content */
  blocks?: ContentBlock[];
}

export interface AboutGroup {
  id: string;
  title: string;
  pages: AboutPage[];
}

export const ABOUT_BASE = "/o-banke";

export const ABOUT_OVERVIEW = {
  eyebrow: "ЧАБ «Трастбанк» · с 1994 года",
  title: "О банке",
  text: "Частный акционерный банк «Трастбанк» создан в 1994 году как акционерный биржевой банк и является одним из ведущих банков Республики Узбекистан. Банк предоставляет весь спектр банковских продуктов и услуг частным и корпоративным клиентам.",
  stats: [
    { value: "1994", label: "год основания" },
    { value: "№ 44", label: "лицензия ЦБ РУз от 21.10.2017" },
    { value: "B+ / B", label: "рейтинг S&P, прогноз «Стабильный»" },
    { value: "uz A+", label: "национальный рейтинг Ahbor-Reyting" },
    { value: "ISO 9001 · 37001", label: "качество и антикоррупция" },
    { value: "19", label: "офисов и центров банковских услуг" },
  ],
};

export const ABOUT_GROUPS: AboutGroup[] = [
  {
    id: "about",
    title: "О банке",
    pages: [
      { slug: "missiya", legacyKey: "about/mission", title: "Миссия и ценности", description: "Цель, задачи и 4 принципа работы банка", icon: Target },
      { slug: "istoriya", legacyKey: "about/history", title: "История", description: "Хроника событий с 1994 года", icon: History },
    ],
  },
  {
    id: "strategy",
    title: "Стратегия",
    pages: [
      { slug: "strategiya", legacyKey: "about/strategy", title: "Стратегия развития 2022–2026", description: "18 стратегических целей и приоритеты", icon: TrendingUp },
      { slug: "biznes-plan", legacyKey: "about/business-plan", title: "Бизнес-план 2026", description: "Задачи на 2026 год и архив планов", icon: ClipboardList },
      { slug: "politika-kachestva", legacyKey: "about/policy-quality", title: "Политика качества", description: "Цели качества и обязательства руководства", icon: ShieldCheck },
    ],
  },
  {
    id: "governance",
    title: "Управление",
    pages: [
      { slug: "pravlenie", legacyKey: "about/management", title: "Правление", description: "10 членов Правления и запись на приём", icon: Users },
      { slug: "komitety", legacyKey: "about/commission", title: "Комитеты и комиссии", description: "4 комитета и их состав", icon: Scale },
      { slug: "struktura", legacyKey: "about/central-office", title: "Структурные подразделения", description: "Подразделения головного офиса и их руководители", icon: Network },
      { slug: "vnutrenniy-audit", legacyKey: "about/internal-audit", title: "Внутренний аудит", description: "Состав департамента внутреннего аудита", icon: SearchCheck },
      {
        slug: "revizor",
        title: "Ревизор банка",
        description: "Раздел в подготовке",
        icon: Eye,
        blocks: [{ type: "pending", text: "Раздел в подготовке." }],
      },
      {
        slug: "dochernie",
        title: "Дочерние предприятия",
        description: "Trast Leasing и Траст Муамалат",
        icon: Building2,
        blocks: [
          { type: "list", title: "Дочерние предприятия банка", items: ["Trast Leasing", "Траст Муамалат"] },
          { type: "pending", text: "Подробная информация о дочерних предприятиях готовится к публикации." },
        ],
      },
    ],
  },
  {
    id: "reputation",
    title: "Репутация",
    pages: [
      { slug: "reytingi", legacyKey: "about/ratings", title: "Рейтинги", description: "S&P B+/B, история рейтингов", icon: BarChart3 },
      { slug: "nagrady", legacyKey: "about/awards", title: "Награды и достижения", description: "Награды и номинации банка", icon: Award },
    ],
  },
  {
    id: "documents",
    title: "Документы",
    pages: [
      { slug: "ustav", legacyKey: "about/charter", title: "Устав банка", description: "Устав и 6 редакций изменений", icon: FileText },
      {
        slug: "litsenzii",
        title: "Лицензии",
        description: "Лицензия ЦБ РУз № 44",
        icon: FileCheck2,
        blocks: [
          {
            type: "table",
            rows: [
              ["Вид", "Лицензия на проведение банковских операций"],
              ["Выдана", "Центральный банк Республики Узбекистан"],
              ["Номер", "№ 44"],
              ["Дата", "21 октября 2017 года"],
            ],
          },
        ],
      },
      {
        slug: "pravoustanavlivayushchie-dokumenty",
        legacyKey: "about/documents",
        title: "Правоустанавливающие документы",
        description: "Выписки и сведения о банке",
        icon: FolderOpen,
      },
    ],
  },
  {
    id: "compliance",
    title: "Комплаенс",
    pages: [
      { slug: "antikorruptsiya", legacyKey: "about/fighting-against-corruption", title: "Противодействие коррупции", description: "Политика и горячая линия", icon: CircleSlash },
      {
        slug: "gendernaya-politika",
        title: "Гендерная политика",
        description: "Раздел в подготовке",
        icon: Scale,
        blocks: [{ type: "pending", text: "Раздел в подготовке." }],
      },
    ],
  },
  {
    id: "career",
    title: "Карьера",
    pages: [
      { slug: "kadrovaya-politika", legacyKey: "about/vacancies/personnel-policy", title: "Кадровая политика", description: "Принципы работы с персоналом", icon: GraduationCap },
      { slug: "vakansii", href: "/vakansii", title: "Вакансии", description: "Анкета и отправка резюме", icon: Briefcase },
    ],
  },
  {
    id: "requisites",
    title: "Реквизиты",
    pages: [
      {
        slug: "rekvizity",
        legacyKey: "about/requisites",
        title: "Реквизиты банка",
        description: "МФО, ИНН, адрес и контакты",
        icon: CreditCard,
        heroSubtitle: "Банковские реквизиты головного офиса и офисов банковских услуг.",
      },
      { slug: "filialy", href: "/filialy", title: "Офисы и филиалы", description: "Адреса и телефоны всех офисов", icon: MapPin },
    ],
  },
];

export const aboutHref = (p: AboutPage) => p.href ?? `${ABOUT_BASE}/${p.slug}`;

/** Flat, ordered list of pages — drives prev/next pager. */
export const ABOUT_PAGES_FLAT: AboutPage[] = ABOUT_GROUPS.flatMap((g) => g.pages);

/** Pages rendered by /o-banke/[slug] (excludes those living on their own routes). */
export const ABOUT_LOCAL_PAGES = ABOUT_PAGES_FLAT.filter((p) => !p.href);

export function findAboutPage(slug: string) {
  const group = ABOUT_GROUPS.find((g) => g.pages.some((p) => p.slug === slug && !p.href));
  const page = group?.pages.find((p) => p.slug === slug);
  if (!group || !page) return null;
  const idx = ABOUT_PAGES_FLAT.indexOf(page);
  return {
    group,
    page,
    prev: idx > 0 ? ABOUT_PAGES_FLAT[idx - 1] : undefined,
    next: idx < ABOUT_PAGES_FLAT.length - 1 ? ABOUT_PAGES_FLAT[idx + 1] : undefined,
  };
}

/** Sidebar model: each group links to its first page and expands to its pages. */
export const ABOUT_SIDENAV = ABOUT_GROUPS.map((g) => ({
  label: g.title,
  href: aboutHref(g.pages[0]),
  children: g.pages.map((p) => ({ label: p.title, href: aboutHref(p) })),
}));
