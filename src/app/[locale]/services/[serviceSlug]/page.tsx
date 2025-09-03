import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { ServiceResponse } from "./types";

export const revalidate = 10; // 10s revalidation for now

type PageProps = {
  params: Promise<{ locale: string; serviceSlug: string }>;
};

async function fetchService(locale: string, slug: string) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const response = await fetch(
    `${API_BASE_URL}/api/services?filters[slug][$eq]=${slug}&locale=${locale}`,
    { next: { revalidate } }
  );
  if (!response.ok) return null;
  const json = await response.json();
  return json?.data?.[0] ?? null;
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, serviceSlug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const service = await fetchService(locale, serviceSlug);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="relative w-full h-[100vh]">
        <Image
          src="/images/service-image.jpg"
          alt={`${service.title} - Service Image`}
          fill
          className="object-cover h-full grayscale"
          priority
          sizes="100vw"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <h1 className="lg:text-[42px] md:text-[32px] text-[24px] font-medium text-primary leading-tight">
          {service.title}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  // Generate for all locales
  const locales = ["en", "ar"]; // keep in sync with routing.locales
  const allParams: Array<{ locale: string; serviceSlug: string }> = [];
  for (const locale of locales) {
    const res = await fetch(
      `${API_BASE_URL}/api/services?locale=${locale}&fields=slug`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) continue;
    const services: ServiceResponse = await res.json();
    const slugs: string[] = (services?.data || [])
      .map((s) => s.slug)
      .filter(Boolean);
    slugs.forEach((slug) => allParams.push({ locale, serviceSlug: slug }));
  }
  return allParams.map(({ locale, serviceSlug }) => ({ locale, serviceSlug }));
}
