"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { SimplifiedClient, StrapiClientResponse } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Helper function to get media URL
const getMediaUrl = (media: any): string => {
  if (!media) return "";
  if (media.url) return `${API_BASE_URL}${media.url}`;
  if (media.data?.attributes?.url) {
    return `${API_BASE_URL}${media.data.attributes.url}`;
  }
  return "";
};
export function useClients() {
  const [clients, setClients] = useState<SimplifiedClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/clients?populate=logo&locale=${locale}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: StrapiClientResponse = await response.json();

        if (data.data && Array.isArray(data.data)) {
          const transformedClients = data.data.map((client) => ({
            id: client.id,
            name: client.name,
            position: client.position,
            logoUrl: getMediaUrl(client.logo),
            logoAlt: client.logo?.alternativeText || client.name,
            testimonial: client.testimonial,
          }));
          setClients(transformedClients);
        } else {
          setClients([]);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch clients"
        );
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [locale]);

  return { clients, isLoading, error };
}
