export const AUTO_BRANDS = [
  { slug: "chevrolet", label: "Chevrolet", keys: ["chevrolet"], ids: ["d3"] },
  { slug: "changan", label: "Changan", keys: ["changan"], ids: ["d2"] },
  { slug: "cherry", label: "Cherry", keys: ["cherry", "chery"], ids: ["d1"] },
  { slug: "haval", label: "HAVAL", keys: ["haval"], ids: ["d5"] },
  { slug: "kia", label: "KIA", keys: ["kia"], ids: ["d4"] },
] as const;

export type AutoBrandSlug = (typeof AUTO_BRANDS)[number]["slug"];

export function brandByName(name: string, id?: string) {
  return AUTO_BRANDS.find(
    (brand) =>
      (id != null && (brand.ids as readonly string[]).includes(id)) ||
      brand.keys.some((key) => name.toLowerCase().includes(key)),
  );
}

export function brandHref(name: string, id?: string) {
  const brand = brandByName(name, id);
  return brand ? `/kredity/${brand.slug}` : "#calculator";
}
