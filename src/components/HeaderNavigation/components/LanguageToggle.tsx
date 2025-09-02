"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const router = useRouter();
  const params = useParams();
  const currentLocale = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);

  // Update selected language when locale changes
  useEffect(() => {
    setSelectedLanguage(currentLocale);
  }, [currentLocale]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLocale = event.target.value;
    setSelectedLanguage(newLocale);

    // Get current path and replace locale
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`);

    router.push(newPath);
  };

  return (
    <div className="relative">
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="appearance-none bg-transparent text-white  rounded-md px-3 py-2 pr-8 text-sm font-medium cursor-pointer hover:border-white/50 transition-colors focus:outline-none focus:border-amber-300"
        aria-label="Select language"
      >
        <option value="en" className="bg-primary text-white rounded-md">
          EN
        </option>
        <option value="ar" className="bg-primary text-white rounded-md">
          عربي
        </option>
      </select>

      {/* Custom dropdown arrow */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
