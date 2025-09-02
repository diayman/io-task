import { useState, useEffect } from "react";
import {
  TeamMembersResponse,
  SimplifiedTeamMember,
  StrapiTeamMember,
} from "./types";
import { useLocale } from "next-intl";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Helper function to get media URL
const getMediaUrl = (media: any): string => {
  if (!media) return "";
  if (media.url?.startsWith("http")) return media.url;
  return media.url ? `${API_BASE_URL}${media.url}` : "";
};

// Transform raw Strapi data to simplified format
const transformTeamData = (
  data: TeamMembersResponse
): SimplifiedTeamMember[] => {
  if (!data.data) return [];

  return data.data.map((member: StrapiTeamMember) => ({
    id: member.id.toString(),
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
      linkedin:
        member.social_links?.find((link) => link.type === "linkedin")?.value ||
        "",
      twitter:
        member.social_links?.find((link) => link.type === "twitter")?.value ||
        "",
      instagram:
        member.social_links?.find((link) => link.type === "instagram")?.value ||
        "",
    },
  }));
};

export function useTeamMembers() {
  const [members, setMembers] = useState<SimplifiedTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/team-members?populate=*&locale=${locale}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const data: TeamMembersResponse = await response.json();
        const transformedMembers = transformTeamData(data);
        setMembers(transformedMembers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [locale]);

  return { members, isLoading, error };
}
