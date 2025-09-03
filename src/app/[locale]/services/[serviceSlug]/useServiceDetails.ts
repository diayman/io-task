"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { ServiceResponse, ServiceData } from "./types";
import { config } from "@/lib/config";
import { API_ENDPOINTS } from "@/lib/api";

export const useServiceDetails = (slug: string) => {
  const [service, setService] = useState<ServiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${config.api.baseUrl}${API_ENDPOINTS.SERVICES}?filters[slug][$eq]=${slug}&locale=${locale}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ServiceResponse = await response.json();

        if (data.data) {
          setService(data.data[0]);
        } else {
          setError("Service not found");
        }
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch service details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug, locale]);

  return { service, isLoading, error };
};
