"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  setSearchQuery,
  setSearchLoading,
  setSearchResults,
} from "@/redux/slices/searchSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/common/BackButton";
import SearchIcon from "@/components/icons/SearchIcon";
import { config } from "@/lib/config";
import { API_ENDPOINTS } from "@/lib/api";

type FilterType = "team" | "services";

export default function SearchPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { results, isLoading } = useAppSelector((state) => state.search);
  const [searchQuery, setSearchQueryLocal] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("team");
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam && queryParam !== searchQuery) {
      setSearchQueryLocal(queryParam);
      performSearch(queryParam);
    }
  }, [searchParams, searchQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    try {
      dispatch(setSearchLoading(true));

      const API_BASE_URL = config.api.baseUrl;

      // Search in team members
      const teamResponse = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.TEAM_MEMBERS}?locale=${locale}&filters[name][$containsi]=${searchQuery}&populate=*`
      );

      // Search in services
      const servicesResponse = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.SERVICES}?locale=${locale}&filters[title][$containsi]=${searchQuery}&populate=*`
      );

      const teamData = await teamResponse.json();
      const servicesData = await servicesResponse.json();

      dispatch(
        setSearchResults({
          team: teamData.data || [],
          services: servicesData.data || [],
        })
      );
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      dispatch(setSearchLoading(false));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative w-full h-[100vh]">
          <Image
            src="/images/service-image.jpg"
            alt={`${searchQuery} - Service Image`}
            fill
            className="object-cover h-full grayscale"
            priority
            sizes="100vw"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B2615] mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-[100vh]">
        <Image
          src="/images/service-image.jpg"
          alt={`${searchQuery} - Service Image`}
          fill
          className="object-cover h-full grayscale"
          priority
          sizes="100vw"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`mb-12 ${isRTL ? "mr-[230px]" : "ml-[230px]"}`}>
          <BackButton />
        </div>
        <div className="flex gap-8">
          {/* Filter Tabs - Left Side */}
          <div className="w-48 flex-shrink-0">
            <div className="bg-gray-100 p-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setActiveFilter("team")}
                  className={`whitespace-nowrap px-4 py-3 cursor-pointer font-medium text-left transition-all duration-200 ${
                    activeFilter === "team"
                      ? "font-extrabold text-primary"
                      : "text-secondary"
                  }`}
                >
                  {t("search.teamMembers")} ({results.team.length})
                </button>
                <button
                  onClick={() => setActiveFilter("services")}
                  className={`whitespace-nowrap px-4 py-3 cursor-pointer font-medium text-left transition-all duration-200 ${
                    activeFilter === "services"
                      ? "font-extrabold text-primary"
                      : "text-secondary"
                  }`}
                >
                  {t("search.services")} ({results.services.length})
                </button>
              </div>
            </div>
          </div>

          {/* Search Results - Right Side */}

          <div className="flex-1">
            {activeFilter === "team" && results.team.length > 0 && (
              <div className="space-y-4">
                {results.team.map((member: any, index: number) => (
                  <div key={member.id}>
                    <div className="p-6">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="text-lg font-semibold text-primary">
                              {member.name}
                            </h3>
                            <p className="text-gray-600">
                              {member.role || "Team Member"}
                            </p>
                          </div>
                        </div>
                        <button className="self-start cursor-pointer text-primary hover:text-secondary font-medium transition-colors">
                          {t("search.readMore")}
                        </button>
                      </div>
                    </div>
                    {index < results.team.length - 1 && (
                      <hr className="my-4 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeFilter === "services" && results.services.length > 0 && (
              <div className="space-y-4">
                {results.services.map((service: any, index: number) => (
                  <div key={service.id}>
                    <div className="p-6">
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-2">
                            {service.title}
                          </h3>
                        </div>
                        <Link
                          href={`/${locale}/services/${service.slug}`}
                          className="self-start cursor-pointer text-primary hover:text-secondary font-medium transition-colors"
                        >
                          {t("search.readMore")}
                        </Link>
                      </div>
                    </div>
                    {index < results.services.length - 1 && (
                      <hr className="my-4 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {((activeFilter === "team" && results.team.length === 0) ||
              (activeFilter === "services" &&
                results.services.length === 0)) && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4 flex items-center justify-center">
                  <SearchIcon className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("search.noResults")}
                </h3>
                <p className="text-gray-600">
                  {activeFilter === "team"
                    ? t("search.noTeamFound")
                    : t("search.noServicesFound")}{" "}
                  "{searchQuery}". {t("search.tryOtherCategory")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
