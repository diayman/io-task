"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { HeroSectionResponse, SimplifiedHeroSlide } from "./types";

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

export function useHeroSlides() {
  const [slides, setSlides] = useState<SimplifiedHeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/hero-section?populate[slides][populate]=*&locale=${locale}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: HeroSectionResponse = await response.json();

        if (data.data?.slides && Array.isArray(data.data.slides)) {
          const transformedSlides = data.data.slides.map((slide) => ({
            id: slide.id.toString(),
            title: slide.headline,
            subtitle: slide.subheadline,
            ctaText: slide.cta?.[0]?.text || "Learn More",
            ctaLink: slide.cta?.[0]?.url || "#",
            src: getMediaUrl(slide.background_media),
            alt: slide.background_media?.alternativeText || slide.headline,
            type: slide.media_type,
            portraitImage: getMediaUrl(slide.image),
            portraitAlt: slide.image?.alternativeText || slide.headline,
          }));
          setSlides(transformedSlides);
        } else {
          setSlides([]);
        }
      } catch (err) {
        console.error("Error fetching hero slides:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch hero slides"
        );
        setSlides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, [locale]);

  return { slides, isLoading, error };
}
