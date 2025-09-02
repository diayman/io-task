import Hero from "@/components/HeroSection/Hero";
import Team from "@/components/OurTeam/Team";
import Clients from "@/components/Clients/Clients";
import { getMediaUrl } from "@/utils/getMediaUrl";

export const revalidate = 10; // 10s revalidation for now

async function fetchHero(locale: string) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const res = await fetch(
    `${API_BASE_URL}/api/hero-section?populate[slides][populate]=*&locale=${locale}`,
    { next: { revalidate } }
  );
  if (!res.ok) return [] as any[];
  const data = await res.json();
  const slides = Array.isArray(data?.data?.slides) ? data.data.slides : [];
  return slides.map((slide: any) => ({
    id: String(slide.id),
    title: slide.headline,
    subtitle: slide.subheadline,
    ctaText: slide.cta?.[0]?.text || "Learn More",
    ctaLink: slide.cta?.[0]?.url || "#",
    src: getMediaUrl(slide.background_media) || "/images/service-image.jpg",
    alt: slide.background_media?.alternativeText || slide.headline,
    type: slide.media_type,
    portraitImage: getMediaUrl(slide.image),
    portraitAlt: slide.image?.alternativeText || slide.headline,
  }));
}

async function fetchClients(locale: string) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const res = await fetch(
    `${API_BASE_URL}/api/clients?populate=logo&locale=${locale}`,
    { next: { revalidate } }
  );
  if (!res.ok) return [] as any[];
  const data = await res.json();
  const arr = Array.isArray(data?.data) ? data.data : [];
  return arr.map((client: any) => ({
    id: client.id,
    name: client.name,
    position: client.position,
    logoUrl: getMediaUrl(client.logo),
    logoAlt: client.logo?.alternativeText || client.name,
    testimonial: client.testimonial,
  }));
}

async function fetchTeam(locale: string) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const res = await fetch(
    `${API_BASE_URL}/api/team-members?populate=*&locale=${locale}`,
    { next: { revalidate } }
  );
  if (!res.ok) return [] as any[];
  const data = await res.json();
  const arr = Array.isArray(data?.data) ? data.data : [];
  return arr.map((member: any) => ({
    id: String(member.id),
    name: member.name,
    role: member.role,
    photoUrl: getMediaUrl(member.photo),
    photoAlt: member.photo?.alternativeText || member.name,
    socialLinks: {
      email:
        member.social_links?.find((l: any) => l.type === "email")?.value || "",
      phone:
        member.social_links?.find((l: any) => l.type === "phone")?.value || "",
      whatsapp:
        member.social_links?.find((l: any) => l.type === "whatsapp")?.value ||
        "",
      linkedin:
        member.social_links?.find((l: any) => l.type === "linkedin")?.value ||
        "",
      twitter:
        member.social_links?.find((l: any) => l.type === "twitter")?.value ||
        "",
      instagram:
        member.social_links?.find((l: any) => l.type === "instagram")?.value ||
        "",
    },
  }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const [slides, clients, team] = await Promise.all([
    fetchHero(locale),
    fetchClients(locale),
    fetchTeam(locale),
  ]);
  return (
    <main>
      <Hero initialSlides={slides} />
      <Team initialMembers={team} />
      <Clients initialClients={clients} />
    </main>
  );
}
