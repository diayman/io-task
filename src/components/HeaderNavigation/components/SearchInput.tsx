import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  closeSearch,
  openSearch,
  setSearchQuery,
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

    dispatch(closeSearch());

    router.push(`/${locale}/search?q=${encodeURIComponent(query)}`);
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
