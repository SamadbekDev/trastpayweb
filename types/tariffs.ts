import { I18nText } from "@/types/pageConfig";

export type TariffAudience = "individual" | "corporate";

export type TariffText = I18nText | string;

export interface TariffLink {
  id: string;
  label: TariffText;
  href: string;
}

export interface TariffCard {
  id: string;
  title: TariffText;
  href: string;
}

export interface TariffsAudienceContent {
  title: TariffText;
  description: TariffText;
  quickLinksTitle: TariffText;
  quickLinks: TariffLink[];
  sectionTitle: TariffText;
  sectionHint: TariffText;
  cards: TariffCard[];
}

export interface TariffsPageConfig {
  individual: TariffsAudienceContent;
  corporate: TariffsAudienceContent;
  detailLinkLabel: TariffText;
}

/** Resolved plain-string view model for rendering. */
export interface TariffsAudienceView {
  title: string;
  description: string;
  quickLinksTitle: string;
  quickLinks: { id: string; label: string; href: string }[];
  sectionTitle: string;
  sectionHint: string;
  cards: { id: string; title: string; href: string }[];
}
