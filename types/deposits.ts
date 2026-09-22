import { I18nText, NavItem, FooterConfig, OffersConfig } from "@/types/pageConfig";

export type DepositCategory = "sum" | "fx" | "online";

export interface DepositTab {
  id: string;
  label: I18nText;
  /** Filter: "all" or a DepositCategory */
  filter: "all" | DepositCategory;
}

export interface DepositProduct {
  id: string;
  category: DepositCategory;
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

export interface DepositGroup {
  id: string;
  category: DepositCategory;
  title: I18nText;
  badge: I18nText;
}

export interface DepositsPageConfig {
  header: {
    logo?: string;
    logoText?: string;
    navItems: NavItem[];
    becomeClientText: string;
    becomeClientHref?: string;
    loginButtonText: string;
    loginHref?: string;
  };
  title: I18nText;
  tabs: DepositTab[];
  groups: DepositGroup[];
  products: DepositProduct[];
  footer: FooterConfig;
}

export interface DepositBreadcrumb {
  label: I18nText;
  href?: string;
}

export interface DepositHighlight {
  id: string;
  icon: string;
  value: I18nText;
  label: I18nText;
}

export interface DepositBenefitCard {
  id: string;
  title: I18nText;
  description: I18nText;
  extra?: I18nText;
  extraHref?: string;
  image?: string;
  variant: "blue" | "white";
}

export interface DepositStep {
  id: string;
  number: string;
  title: I18nText;
  description: I18nText;
  linkText: I18nText;
  href?: string;
}

export interface DepositCalculatorTerm {
  id: string;
  months: number;
  rate: number;
}

export interface DepositSuggestedProduct {
  id: string;
  title: I18nText;
  rate: I18nText;
  amount: I18nText;
  term: I18nText;
  badge?: I18nText;
  badgeColor?: string;
  href: string;
  image: string;
}

export interface DepositConditionRow {
  id: string;
  label: I18nText;
  value: I18nText;
  hint?: I18nText;
}

export interface DepositDocument {
  id: string;
  title: I18nText;
  date: I18nText;
  href?: string;
}

export interface DepositOffice {
  id: string;
  name: I18nText;
  address: I18nText;
  hours: I18nText;
}

export interface OfficesMapConfig {
  officesTitle: I18nText;
  city: I18nText;
  offices: DepositOffice[];
  atms: DepositOffice[];
  mapEmbedUrl: string;
}

export interface OfficesPageConfig extends OfficesMapConfig {
  header: DepositsPageConfig["header"];
  footer: FooterConfig;
}

export interface DepositFaqItem {
  id: string;
  question: I18nText;
  answer: I18nText;
}

export interface DepositDetailPageConfig {
  product: DepositProduct;
  breadcrumbs: DepositBreadcrumb[];
  heroTitle: I18nText;
  heroSubtitle: I18nText;
  heroBullets: I18nText[];
  heroPrimaryCta: I18nText;
  heroPrimaryHref?: string;
  heroSecondaryCta: I18nText;
  heroSecondaryHref?: string;
  heroImage: string;
  highlights: DepositHighlight[];
  benefits: DepositBenefitCard[];
  stepsTitle: I18nText;
  steps: DepositStep[];
  calculatorTitle: I18nText;
  calculatorRate: number;
  calculatorRateCaption: I18nText;
  calculatorImage: string;
  calculatorChannels: { id: "online" | "office"; label: I18nText }[];
  calculatorTerms: DepositCalculatorTerm[];
  calculatorMin: number;
  calculatorMax: number;
  calculatorDefault: number;
  calculatorCurrency: "UZS" | "USD";
  suggested: DepositSuggestedProduct[];
  conditionsTitle: I18nText;
  conditions: DepositConditionRow[];
  documentsTitle: I18nText;
  documents: DepositDocument[];
  documentLinks: { id: string; label: I18nText; href: string }[];
  officesTitle: I18nText;
  city: I18nText;
  offices: DepositOffice[];
  atms: DepositOffice[];
  mapEmbedUrl: string;
  offers: OffersConfig;
  faqTitle: I18nText;
  faq: DepositFaqItem[];
  faqMoreText: I18nText;
  footer: FooterConfig;
}

export type DepositCmsDetails = Omit<
  DepositDetailPageConfig,
  | "product"
  | "breadcrumbs"
  | "suggested"
  | "offers"
  | "footer"
  | "calculatorChannels"
>;

/** Optional CMS-provided detail payload for /vklady/[id] */
export interface DepositProduct {
  details?: DepositCmsDetails;
}