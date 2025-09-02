"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DropdownProps } from "../types";
import { useServices } from "../useServices";

export default function Dropdown({
  isOpen,
  onClose,
  onDropdownChange,
}: DropdownProps) {
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

  if (!isOpen) return null;

  const locale = (params.locale as string) || "en";

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-2 w-64 bg-primary z-50"
    >
      <div className="py-2">
        {isLoading ? (
          <div className="px-4 py-2 text-gray-300">
            {t("navbar.loadingServices")}
          </div>
        ) : (
          services.map((service) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.slug}`}
              onClick={() => onDropdownChange(false)}
              className="block px-4 py-2 text-white cursor-pointer hover:bg-[#6B4B3D] hover:text-amber-400 transition-colors duration-200"
            >
              {service.title}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
