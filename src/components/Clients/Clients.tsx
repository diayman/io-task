"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useClients } from "./useClients";
import ArrowIcon from "../icons/ArrowIcon";
import Image from "next/image";

import { SimplifiedClient } from "./types";

type Props = { initialClients?: SimplifiedClient[] };

export default function Clients({ initialClients }: Props) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { clients, isLoading, error } = useClients(initialClients);
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const goToNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % clients.length);
  };

  const goToPreviousTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + clients.length) % clients.length
    );
  };

  if (isLoading) {
    return (
      <section id="clients" className={`py-16 bg-[#4A2F24]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-600 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-600 rounded w-96 mb-12"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="clients" className={`py-16 bg-[#4A2F24]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-300">
              {t("clients.error")}: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className={`py-16 bg-[#4B2615]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-xl md:text-3xl lg:text-[40px] font-bold text-white mb-4">
            {t("clients.title")}
          </h2>
          <p className="text-white opacity-60 text-sm md:text-base lg:text-lg font-normal max-w-2xl">
            {t("clients.subtitle")}
          </p>
        </div>

        {/* Testimonials Section */}
        {clients.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Client Image */}
              <div className="flex justify-center">
                <div className="relative w-80 h-80 bg-[#6B4B3D] rounded-lg overflow-hidden">
                  <Image
                    src={
                      clients[currentTestimonial]?.logoUrl ||
                      "/images/service-image.jpg"
                    }
                    alt={clients[currentTestimonial]?.logoAlt || "Client logo"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 20rem, 20rem"
                  />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="space-y-6 flex flex-col justify-between">
                <div className="text-white opacity-60 text-lg font-normal leading-[40px] max-w-[90%]">
                  "{clients[currentTestimonial]?.testimonial}"
                </div>

                <div className="space-y-4">
                  <h3 className="text-white text-2xl font-semibold">
                    {clients[currentTestimonial]?.name}
                  </h3>
                  <p className="text-white opacity-60 text-base font-normal">
                    {clients[currentTestimonial]?.position}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Navigation Controls */}
        <div className="flex space-x-4 justify-end">
          <button
            onClick={goToPreviousTestimonial}
            className="w-12 h-12 bg-[#4A2F24] cursor-pointer text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#4A2F24] transition-colors"
            aria-label="Previous testimonial"
          >
            <ArrowIcon className={`w-5 h-5 ${isRTL ? "" : "rotate-180"}`} />
          </button>

          <button
            onClick={goToNextTestimonial}
            className="w-12 h-12 bg-white cursor-pointer text-[#4A2F24] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ArrowIcon className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            {/* <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg> */}
          </button>
        </div>
      </div>
    </section>
  );
}
