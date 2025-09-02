"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { HeroSectionResponse, SimplifiedHeroSlide } from "./types";
import { getMediaUrl } from "@/utils/getMediaUrl";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function useHeroSlides(prefetchedSlides?: SimplifiedHeroSlide[]) {
  const [slides, setSlides] = useState<SimplifiedHeroSlide[]>(
    prefetchedSlides || []
  );
  const [isLoading, setIsLoading] = useState(!prefetchedSlides);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    if (prefetchedSlides && prefetchedSlides.length > 0) {
      setSlides(prefetchedSlides);
      setIsLoading(false);
      return;
    }
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
            src:
              getMediaUrl(slide.background_media) ||
              "/images/service-image.jpg",
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
  }, [locale, prefetchedSlides]);

  return { slides, isLoading, error };
}
