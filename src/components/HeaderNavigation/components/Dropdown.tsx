"use client";

import { useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { DropdownProps } from "../types";
import { useServices } from "../useServices";

export default function Dropdown({
  isOpen,
  onClose,
  onDropdownChange,
}: DropdownProps) {
  const router = useRouter();
  const params = useParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { services, isLoading } = useServices();
  const t = useTranslations();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
        onDropdownChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, onDropdownChange]);

  const handleServiceClick = (slug: string) => {
    const locale = params.locale as string;
    router.push(`/${locale}/services/${slug}`);
    onDropdownChange(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 w-64 bg-[#4B2615] z-50"
    >
      <div className="py-2">
        {isLoading ? (
          <div className="px-4 py-2 text-gray-300">
            {t("navbar.loadingServices")}
          </div>
        ) : (
          services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.slug)}
              className="w-full text-left px-4 py-2 text-white cursor-pointer hover:bg-[#6B4B3D] hover:text-amber-400 transition-colors duration-200"
            >
              {service.title}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
