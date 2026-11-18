import type { I18nText } from "@/types/pageConfig";

export type TransferSystemFilter = "all" | "cis" | "world";
export type TransferInfoTab = "receive" | "fees" | "status" | "docs";

export type TransferSystemConfig = {
  id: string;
  name: string;
  initials: string;
  logoBg: string;
  logoColor: string;
  tag: I18nText;
  tagTone: "muted" | "blue";
  filter: TransferSystemFilter[];
  speed: I18nText;
  currency: I18nText;
  geography: I18nText;
  commission: I18nText;
  href: string;
};

export type TransfersPageConfig = {
  hero: {
    title: I18nText;
    subtitle: I18nText;
    cta: I18nText;
    ctaHref: string;
    visualImage?: string;
  };
  conditions: {
    title: I18nText;
    facts: Array<{
      id?: string;
      value: I18nText;
      label: I18nText;
    }>;
  };
  benefits: {
    title: I18nText;
    items: Array<{
      id?: string;
      title: I18nText;
      text: I18nText;
    }>;
  };
  note: I18nText;
  where: {
    title: I18nText;
    items: I18nText[];
  };
  choose: {
    title: I18nText;
    items: I18nText[];
  };
  howToSend: {
    title: I18nText;
    subtitle: I18nText;
    cta: I18nText;
    ctaHref: string;
    image?: string;
    steps: Array<{
      id?: string;
      number: string;
      title: I18nText;
      text: I18nText;
      link: I18nText;
      href: string;
    }>;
  };
  systemsBgImage?: string;
  systemsTitle: I18nText;
  systemsSubtitle: I18nText;
  systems: TransferSystemConfig[];
  info: {
    title: I18nText;
    tabs: Array<{
      id: TransferInfoTab;
      label: I18nText;
    }>;
    panels: Record<
      TransferInfoTab,
      {
        title: I18nText;
        items: I18nText[];
      }
    >;
  };
  tariffs: {
    title: I18nText;
    subtitle: I18nText;
    cardTitle: I18nText;
    cardSubtitle: I18nText;
    columns: I18nText[];
    rows: Array<
      | string[]
      | {
          id?: string;
          cells: string[];
        }
    >;
    footnote: I18nText;
    warning: I18nText;
    docTitle: I18nText;
    docMeta: I18nText;
    docHref: string;
  };
  faq: {
    title: I18nText;
    more: I18nText;
    items: Array<{
      id: string;
      q: I18nText;
      a: I18nText;
    }>;
  };
  appBanner: {
    title: I18nText;
    text: I18nText;
    primary: I18nText;
    primaryHref: string;
    secondary: I18nText;
    secondaryHref: string;
  };
};
