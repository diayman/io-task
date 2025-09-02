"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { ServiceItem } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/services?fields[0]=id&fields[1]=title&fields[2]=slug&locale=${locale}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          const transformedServices = data.data.map((service: any) => ({
            id: service.id,
            title: service.title,
            slug: service.slug,
          }));
          setServices(transformedServices);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch services"
        );
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [locale]);

  return { services, isLoading, error };
}
