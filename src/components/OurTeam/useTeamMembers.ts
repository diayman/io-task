import { useState, useEffect } from "react";
import {
  TeamMembersResponse,
  SimplifiedTeamMember,
  StrapiTeamMember,
} from "./types";
import { useLocale } from "next-intl";
import { getMediaUrl } from "@/lib/media";
import { config } from "@/lib/config";
import { API_ENDPOINTS } from "@/lib/api";

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

export function useTeamMembers(prefetched?: SimplifiedTeamMember[]) {
  const [members, setMembers] = useState<SimplifiedTeamMember[]>(
    prefetched || []
  );
  const [isLoading, setIsLoading] = useState(!prefetched);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    if (prefetched && prefetched.length > 0) {
      setMembers(prefetched);
      setIsLoading(false);
      return;
    }
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${config.api.baseUrl}${API_ENDPOINTS.TEAM_MEMBERS}?populate=*&locale=${locale}`
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
  }, [locale, prefetched]);

  return { members, isLoading, error };
}
