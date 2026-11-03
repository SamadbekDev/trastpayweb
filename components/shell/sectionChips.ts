import { HeaderChip } from "@/types/pageConfig";

export type SiteSection = "products" | "tariffs";

export function resolveChipSection(chip: HeaderChip): SiteSection | null {
  if (/продукт/i.test(chip.label) || chip.id.includes("product")) {
    return "products";
  }
  if (/тариф/i.test(chip.label) || chip.id.includes("tarif")) {
    return "tariffs";
  }
  return null;
}

export function findChipIdForSection(
  chips: HeaderChip[] | undefined,
  section: SiteSection
): string | undefined {
  return chips?.find((chip) => resolveChipSection(chip) === section)?.id;
}

export function sectionPath(section: SiteSection): string {
  return section === "tariffs" ? "/tarify" : "/";
}
