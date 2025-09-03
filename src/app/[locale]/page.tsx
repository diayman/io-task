import Hero from "@/components/HeroSection/Hero";
import Team from "@/components/OurTeam/Team";
import Clients from "@/components/Clients/Clients";
import { getMediaUrl } from "@/utils/getMediaUrl";
import {
  SimplifiedTeamMember,
  StrapiTeamMember,
  TeamMembersResponse,
} from "@/components/OurTeam/types";
import { HeroSectionResponse } from "@/components/HeroSection/types";
import {
  SimplifiedClient,
  StrapiClient,
  StrapiClientResponse,
} from "@/components/Clients/types";

export const revalidate = 10; // 10s revalidation for now

async function fetchHero(locale: string) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const res = await fetch(
    `${API_BASE_URL}/api/hero-section?populate[slides][populate]=*&locale=${locale}`,
    { next: { revalidate } }
  );
  if (!res.ok) return [];
  const data: HeroSectionResponse = await res.json();
  const slides = Array.isArray(data?.data?.slides) ? data.data.slides : [];
  return slides.map((slide) => ({
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

async function fetchClients(locale: string): Promise<SimplifiedClient[]> {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const res = await fetch(
    `${API_BASE_URL}/api/clients?populate=logo&locale=${locale}`,
    { next: { revalidate } }
  );
  if (!res.ok) return [] as SimplifiedClient[];
  const data: StrapiClientResponse = await res.json();
  const clientsArray = Array.isArray(data?.data) ? data.data : [];
  return clientsArray.map((client) => ({
    id: client.id,
    name: client.name,
    position: client.position,
    logoUrl: getMediaUrl(client.logo),
    logoAlt: client.logo?.alternativeText || client.name,
    testimonial: client.testimonial,
  }));
}

async function fetchTeam(locale: string): Promise<SimplifiedTeamMember[]> {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const res = await fetch(
    `${API_BASE_URL}/api/team-members?populate=*&locale=${locale}`,
    { next: { revalidate } }
  );
  if (!res.ok) return [] as SimplifiedTeamMember[];
  const data: TeamMembersResponse = await res.json();
  const teamMembersArray = Array.isArray(data?.data) ? data.data : [];
  return teamMembersArray.map((member) => ({
    id: String(member.id),
    name: member.name,
    role: member.role,
    photoUrl: getMediaUrl(member.photo),
    photoAlt: member.photo?.alternativeText || member.name,
    socialLinks: {
      email:
        member.social_links?.find((link) => link.type === "email")?.value || "",
      phone:
        member.social_links?.find((link) => link.type === "phone")?.value || "",
      whatsapp:
        member.social_links?.find((link) => link.type === "whatsapp")?.value ||
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
