/**
 * Structured page content. Produced by scripts/legacy/convert.mjs from the old trustbank.uz
 * and also written by hand (data/aboutSection.ts). Inline links use markdown: [text](href).
 */
export interface Person {
  name: string;
  position: string;
  phone?: string;
  duties?: string[];
  bio?: string[][];
  schedule?: string[][];
  bookingHref?: string;
}

export type ContentBlock =
  | { type: "heading"; text: string; href?: string; level?: 2 | 3 }
  | { type: "text"; title?: string; paragraphs: string[] }
  | { type: "list"; title?: string; items: string[] }
  | { type: "table"; title?: string; rows: string[][] }
  | { type: "docs"; title?: string; items: { label: string; href: string; meta?: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "links"; title?: string; items: { label: string; href: string; meta?: string }[] }
  | { type: "people"; items: Person[] }
  | { type: "gallery"; title?: string; images: { src: string; alt: string }[] }
  | { type: "pending"; text?: string };

export interface LegacyPage {
  title: string;
  /** Original URL on the old site */
  source: string;
  /** Route on the new site */
  path: string | null;
  /** Third-level page (news item, law text, unit…): routed, but not listed in section menus */
  detail?: boolean;
  blocks: ContentBlock[];
}
