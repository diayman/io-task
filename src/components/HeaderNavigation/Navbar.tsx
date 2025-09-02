"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openSearch } from "@/redux/slices/searchSlice";
import Dropdown from "./components/Dropdown";
import LanguageToggle from "./components/LanguageToggle";
import SearchInput from "./components/SearchInput";
import ChevronIcon from "../icons/ChevronIcon";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const { isSearchOpen } = useAppSelector((state) => state.search);

  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    checkScrollPosition();

    window.addEventListener("scroll", checkScrollPosition);

    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownChange = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleSearchClick = () => {
    dispatch(openSearch());
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDropdownOpen || isMobileMenuOpen || isScrolled
          ? "bg-primary border-b border-secondary"
          : "bg-transparent"
      }`}
    >
      <div className="max-w- mx-auto px-4 lg:px-[40px]">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className={`flex-shrink-0 ${isSearchOpen ? "hidden" : ""}`}>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Mohammed Bin Hindi Al-Otaibi Logo"
                width={120}
                height={40}
                className="h-14 w-auto object-cover"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div
              className={`ml-10 flex items-baseline space-x-6 ${
                isSearchOpen ? "hidden" : ""
              }`}
            >
              <Link
                href="#about"
                className="text-white hover:text-amber-300 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("navbar.aboutUs")}
              </Link>

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownChange(!isDropdownOpen)}
                  className="cursor-pointer space-x-1.5 text-white hover:text-amber-300 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  <span>{t("services")}</span>
                  <ChevronIcon
                    className={`h-4 w-4 ${
                      isDropdownOpen ? "rotate-90" : "-rotate-90"
                    }`}
                  />
                </button>

                <Dropdown
                  isOpen={isDropdownOpen}
                  onClose={handleDropdownClose}
                  onDropdownChange={handleDropdownChange}
                />
              </div>

              <Link
                href="#team"
                className="text-white hover:text-amber-300 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("navbar.ourTeam")}
              </Link>
              <Link
                href="#blog"
                className="text-white hover:text-amber-300 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("navbar.blogs")}
              </Link>
              <Link
                href="#contact"
                className="text-white hover:text-amber-300 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("navbar.contactUs")}
              </Link>
            </div>
          </div>

          {isSearchOpen && (
            <div className="lg:hidden px-4 py-3">
              <SearchInput />
            </div>
          )}

          {/* Right side - Search, Language, and Book Appointment */}
          <div className="hidden lg:flex items-center space-x-4">
            <SearchInput />

            <div className={`${isSearchOpen ? "hidden" : ""}`}>
              <LanguageToggle />
            </div>
            <Link
              href="#appointment"
              className="bg-transparent text-white px-4 py-2 rounded-md text-sm font-medium transition-colors border border-white hover:bg-white hover:text-primary hover:border-primary"
            >
              {t("navbar.bookAppointment")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div
            className={`lg:hidden flex items-center space-x-2 ${
              isSearchOpen ? "hidden" : ""
            }`}
          >
            <button
              onClick={handleSearchClick}
              className="text-gray-300 hover:text-white p-2 rounded-md transition-colors"
              aria-label={t("navbar.search")}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <LanguageToggle />

            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white p-2 rounded-md transition-colors"
              aria-label={t("navbar.toggleMenu")}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary border-t border-secondary">
            <Link
              href="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("about")}
            </Link>
            <div className="relative">
              <button
                onClick={() => handleDropdownChange(!isDropdownOpen)}
                className="cursor-pointer space-x-1.5 text-white hover:text-amber-300 px-3 py-2 text-sm font-medium transition-colors flex items-center"
              >
                <span>{t("services")}</span>
                <ChevronIcon
                  className={`h-4 w-4 ${
                    isDropdownOpen ? "rotate-90" : "-rotate-90"
                  }`}
                />
              </button>

              <Dropdown
                isOpen={isDropdownOpen}
                onClose={handleDropdownClose}
                onDropdownChange={handleDropdownChange}
              />
            </div>
            <Link
              href="#blog"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("blog")}
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("contact")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
