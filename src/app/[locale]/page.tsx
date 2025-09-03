import Hero from "@/components/HeroSection/Hero";
import Team from "@/components/OurTeam/Team";
import Clients from "@/components/Clients/Clients";
import { getMediaUrl } from "@/lib/media";
import {
  SimplifiedTeamMember,
  TeamMembersResponse,
} from "@/components/OurTeam/types";
import { HeroSectionResponse } from "@/components/HeroSection/types";
import {
  SimplifiedClient,
  StrapiClientResponse,
} from "@/components/Clients/types";
import { apiFetchWithRevalidation, API_ENDPOINTS } from "@/lib/api";

export const revalidate = 10; // 10s revalidation for now

async function fetchHero(locale: string) {
  try {
    const data: HeroSectionResponse = await apiFetchWithRevalidation(
      `${API_ENDPOINTS.HERO_SECTION}?populate[slides][populate]=*&locale=${locale}`,
      revalidate
    );
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
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return [];
  }
}

async function fetchClients(locale: string): Promise<SimplifiedClient[]> {
  try {
    const data: StrapiClientResponse = await apiFetchWithRevalidation(
      `${API_ENDPOINTS.CLIENTS}?populate=logo&locale=${locale}`,
      revalidate
    );
    const clientsArray = Array.isArray(data?.data) ? data.data : [];
    return clientsArray.map((client) => ({
      id: client.id,
      name: client.name,
      position: client.position,
      logoUrl: getMediaUrl(client.logo),
      logoAlt: client.logo?.alternativeText || client.name,
      testimonial: client.testimonial,
    }));
  } catch (error) {
    console.error("Error fetching clients data:", error);
    return [];
  }
}

async function fetchTeam(locale: string): Promise<SimplifiedTeamMember[]> {
  try {
    const data: TeamMembersResponse = await apiFetchWithRevalidation(
      `${API_ENDPOINTS.TEAM_MEMBERS}?populate=*&locale=${locale}`,
      revalidate
    );
    const teamMembersArray = Array.isArray(data?.data) ? data.data : [];
    return teamMembersArray.map((member) => ({
      id: String(member.id),
      name: member.name,
      role: member.role,
      photoUrl: getMediaUrl(member.photo),
      photoAlt: member.photo?.alternativeText || member.name,
      socialLinks: {
        email:
          member.social_links?.find((link) => link.type === "email")?.value ||
          "",
        phone:
          member.social_links?.find((link) => link.type === "phone")?.value ||
          "",
        whatsapp:
          member.social_links?.find((link) => link.type === "whatsapp")
            ?.value || "",
      },
    }));
  } catch (error) {
    console.error("Error fetching team data:", error);
    return [];
  }
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
