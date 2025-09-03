import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { config } from "@/lib/config";
import { API_ENDPOINTS } from "@/lib/api";
import {
  closeSearch,
  openSearch,
  setSearchQuery,
  setSearchLoading,
  setSearchResults,
} from "@/redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import SearchIcon from "@/components/icons/SearchIcon";

function SearchInput() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();
  const { isSearchOpen, query } = useAppSelector((state) => state.search);
  const t = useTranslations();
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        dispatch(closeSearch());
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, dispatch]);

  const handleSearchClick = () => {
    dispatch(openSearch());
  };

  const handleCloseSearch = () => {
    dispatch(closeSearch());
    dispatch(setSearchQuery(""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      dispatch(setSearchLoading(true));

      // Perform search across team and services
      const searchResults = await performSearch(query);

      // Store results in Redux
      dispatch(setSearchResults(searchResults));

      // Close search input
      dispatch(closeSearch());

      // Redirect to search results page with locale
      router.push(`/${locale}/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error("Search error:", error);
      // Handle error (could show toast notification)
    } finally {
      dispatch(setSearchLoading(false));
    }
  };

  // Search function that queries both team and services
  const performSearch = async (searchQuery: string) => {
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

    return {
      team: teamData.data || [],
      services: servicesData.data || [],
    };
  };

  return (
    <div ref={searchRef}>
      {isSearchOpen ? (
        <div className="flex items-center gap-2">
          <form onSubmit={handleSubmit} className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none">
              <SearchIcon className="h-4 w-4 cursor-pointer" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder={t("navbar.search")}
              className="text-white border border-white/30 w-[230px] md:w-[350px] h-[40px] rounded-md pl-10 pr-4 bg-transparent placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
              autoFocus
            />
          </form>
        </div>
      ) : (
        <button
          onClick={handleSearchClick}
          className="text-white hover:text-amber-300 p-2 transition-colors"
          aria-label={t("navbar.search")}
        >
          <SearchIcon className="h-4 w-4 cursor-pointer" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
