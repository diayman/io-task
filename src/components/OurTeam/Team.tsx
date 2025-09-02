"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooks";
import { useTeamMembers } from "./useTeamMembers";
import MemberCard from "./MemberCard";
import ChevronIcon from "../icons/ChevronIcon";

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { members, isLoading, error } = useTeamMembers();
  const t = useTranslations();
  const { isRTL } = useAppSelector((state) => state.language);

  const goToNext = () => {
    const maxStartIndex = Math.max(0, members.length - 3);
    const nextIndex = Math.min(currentIndex + 1, maxStartIndex);
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
    }
  };

  const goToPrevious = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    if (prevIndex !== currentIndex) {
      setCurrentIndex(prevIndex);
    }
  };

  const visibleMembers = members.slice(currentIndex, currentIndex + 3);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex + 1 < Math.max(0, members.length - 2);

  const getGridClasses = () => {
    const count = visibleMembers.length;
    if (count === 1) return "grid-cols-1 justify-items-center";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 justify-items-center";
    return "grid-cols-1 md:grid-cols-3";
  };

  if (isLoading) {
    return (
      <section id="team" className={`py-36 bg-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="team" className={`py-36 bg-gray-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{t("team.error")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) {
    return (
      <section className={`py-36 bg-gray-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">{t("team.noMembers")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className={`py-36 bg-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-primary mb-4">
            {t("team.title")}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#1E1E1E] font-medium max-w-3xl mx-auto">
            {t("team.subtitle")}
          </p>
        </div>

        {/* Team Members Carousel */}
        <div className="relative">
          {/* Navigation Arrows - Always shown, disabled when needed */}
          <button
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className={`absolute -left-[50px] top-1/2 transform -translate-y-1/2 z-10 ${
              canGoPrevious
                ? "bg-white/30 hover:bg-white/50 cursor-pointer"
                : "bg-white/10 cursor-not-allowed opacity-50"
            }`}
            aria-label={t("team.previous")}
          >
            <ChevronIcon className="w-7 h-7 text-black" />
          </button>

          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`absolute -right-[50px] top-1/2 transform -translate-y-1/2 z-10  ${
              canGoNext
                ? "bg-white/30 hover:bg-white/50 cursor-pointer"
                : "bg-white/10 cursor-not-allowed opacity-50"
            }`}
            aria-label={t("team.next")}
          >
            <ChevronIcon className="w-7 h-7 text-black rotate-180" />
          </button>

          {/* Team Members Grid */}
          <div className="overflow-hidden">
            <div
              className={`grid gap-8 px-4 md:px-12 transition-all duration-900 ease-linear ${getGridClasses()}`}
            >
              {visibleMembers.map((member, index) => (
                <div
                  key={`${member.id}-${currentIndex}`}
                  className="duration-200 ease-linear"
                >
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
