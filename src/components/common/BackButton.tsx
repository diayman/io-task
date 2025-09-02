import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { useLocale } from "next-intl";
import ChevronIcon from "../icons/ChevronIcon";

function BackButton() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const handleBackClick = () => {
    router.back();
  };
  return (
    <button
      onClick={handleBackClick}
      className="text-[#4B2615] hover:text-[#69483a] font-medium transition-colors inline-flex items-center hover:scale-105 cursor-pointer duration-300"
    >
      <ChevronIcon
        className={`w-5 h-5 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`}
      />
      {t("back")}
    </button>
  );
}

export default BackButton;
