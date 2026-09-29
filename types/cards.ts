import {
  DepositFaqItem,
  DepositHighlight,
  DepositStep,
  OfficesMapConfig,
} from "@/types/deposits";
import { FooterConfig, I18nText } from "@/types/pageConfig";

/** Tab filter categories from Figma: Суммовые / Валютные / Кредитные */
export type CardCategory = "sum" | "fx" | "credit";

export interface CardTab {
  id: string;
  label: I18nText;
  filter: "all" | CardCategory;
}

export interface CardGroup {
  id: string;
  title: I18nText;
  badge: I18nText;
}

export interface CardProduct {
  id: string;
  /** Tab filter */
  category: CardCategory;
  /** Section group id (Дебетовые / UzCard-Humo) */
  groupId: string;
  title: I18nText;
  description: I18nText;
  rate: I18nText;
  rateLabel: I18nText;
  amount: I18nText;
  amountLabel: I18nText;
  term: I18nText;
  termLabel: I18nText;
  primaryCta: I18nText;
  primaryHref?: string;
  secondaryCta: I18nText;
  secondaryHref?: string;
  image: string;
}

export interface CardsPageHeader {
  logo?: string;
  logoText?: string;
  navItems: { id: string; label: string; href: string }[];
  becomeClientText: string;
  becomeClientHref?: string;
  loginButtonText: string;
  loginHref?: string;
}

export interface CardsPageConfig {
  header: CardsPageHeader;
  title: I18nText;
  tabs: CardTab[];
  groups: CardGroup[];
  products: CardProduct[];
  footer?: FooterConfig;
}

export interface CardBreadcrumb {
  label: I18nText;
  href?: string;
}

export interface CardVirtualOnlineConfig {
  title: I18nText;
  subtitle: I18nText;
  image: string;
  stepsTitle: I18nText;
  steps: DepositStep[];
  ctaText: I18nText;
  ctaHref?: string;
}

export interface CardDetailPageConfig extends OfficesMapConfig {
  header: CardsPageHeader;
  product: CardProduct;
  breadcrumbs: CardBreadcrumb[];
  heroTitle: I18nText;
  heroSubtitle: I18nText;
  heroBullets: I18nText[];
  heroPrimaryCta: I18nText;
  heroPrimaryHref?: string;
  heroImage: string;
  highlights: DepositHighlight[];
  stepsTitle: I18nText;
  steps: DepositStep[];
  suggestedTitle: I18nText;
  suggested: CardProduct[];
  virtualOnline: CardVirtualOnlineConfig;
  faqTitle: I18nText;
  faq: DepositFaqItem[];
  faqMoreText: I18nText;
  footer: FooterConfig;
}
