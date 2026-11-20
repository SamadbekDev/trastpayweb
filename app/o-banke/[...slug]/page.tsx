import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutDetail, AboutSubpage, aboutDetailParams, resolveAboutDetail } from "@/components/about/AboutViews";
import { ABOUT_LOCAL_PAGES, findAboutPage } from "@/data/aboutSection";

type Params = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...ABOUT_LOCAL_PAGES.map((p) => ({ slug: [p.slug] })), ...aboutDetailParams()];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length === 1) {
    const found = findAboutPage(slug[0]);
    return found ? { title: `${found.page.title} — О банке`, description: found.page.description } : {};
  }
  const detail = resolveAboutDetail(slug);
  return detail ? { title: `${detail.page.title} — О банке`, description: `${detail.page.title} — ЧАБ «Трастбанк».` } : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (slug.length === 1) {
    if (!findAboutPage(slug[0])) notFound();
    return <AboutSubpage slug={slug[0]} />;
  }
  if (!resolveAboutDetail(slug)) notFound();
  return <AboutDetail slug={slug} />;
}
