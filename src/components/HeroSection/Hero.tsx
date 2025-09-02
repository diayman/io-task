"use client";

import { useState } from "react";
import { useHeroSlides } from "./useHeroSlides";
import ChevronIcon from "../icons/ChevronIcon";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { slides, isLoading, error } = useHeroSlides();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevious = () => {
    if (isAnimating || currentSlide === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating || currentSlide === slides.length - 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="relative h-screen overflow-hidden bg-[#4A2F24] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  // No slides state
  if (slides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-[#4A2F24] flex items-center justify-center">
        <div className="text-white text-center">
          <p>No hero slides available</p>
        </div>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden pt-20">
      {/* Background Image/Video with Animation */}
      <div className="absolute inset-0">
        {currentSlideData.type === "video" ? (
          <video
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isAnimating ? "scale-110" : "scale-100"
            }`}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={currentSlideData.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={currentSlideData.src}
            alt={currentSlideData.alt || currentSlideData.title}
            fill
            className={`object-cover transition-all duration-700 ease-out ${
              isAnimating ? "scale-110" : "scale-100"
            }`}
            sizes="100vw"
            priority={currentSlide === 0}
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div>
      </div>

      {/* Content - Centered with Animation */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="flex flex-col-reverse gap-8 lg:gap-0 lg:flex-row justify-between items-center w-[100%] lg:w-[80%]  mx-auto">
          {/* Left Content */}
          <div
            className={`flex flex-col items-center lg:items-start text-white text-center lg:text-left transition-all duration-500 ease-out ${
              isAnimating
                ? "opacity-0 transform translate-y-8"
                : "opacity-100 transform translate-y-0"
            }`}
          >
            <h1 className="text-lg md:text-3xl lg:text-[40px] font-bold mb-4 leading-tight transition-all duration-500">
              {currentSlideData.title}
            </h1>
            <p className="text-[12px] w-[70%] lg:w-auto lg:text-lg font-medium mb-8 lg:mb-16 leading-relaxed max-w-2xl mx-auto lg:mx-0 transition-all duration-500 delay-100">
              {currentSlideData.subtitle}
            </p>
            <a
              href={currentSlideData.ctaLink}
              className="inline-block w-fit bg-white hover:bg-gray-100 text-[#4A2F24] font-medium py-3 px-8 rounded-lg text-base lg:text-lg transition-all duration-500 delay-200 hover:scale-105"
            >
              {currentSlideData.ctaText}
            </a>
          </div>

          {/* Right Portrait Image */}
          {currentSlideData.portraitImage && (
            <div
              className={`flex items-center justify-end transition-all duration-500 ease-out ${
                isAnimating
                  ? "opacity-0 transform translate-x-8"
                  : "opacity-100 transform translate-x-0"
              }`}
            >
              <div className="bg-[#4A2F24] rounded-lg h-[250px] lg:h-[370px] w-[250px] lg:w-[370px] flex items-center justify-center transition-all duration-500 hover:scale-105 relative overflow-hidden">
                <Image
                  src={currentSlideData.portraitImage}
                  alt={currentSlideData.portraitAlt || currentSlideData.title}
                  fill
                  className="object-cover rounded"
                  sizes="(min-width: 1024px) 370px, 250px"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows - Only show when needed */}
      {currentSlide > 0 && (
        <button
          onClick={goToPrevious}
          className="absolute left-2 lg:left-8 top-[44%] transform -translate-y-1/2 z-20 text-white p-3 rounded-full transition-all hover:bg-[rgba(0,0,0,0.5)] hover:cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronIcon className="w-7 h-7" />
        </button>
      )}

      {currentSlide < slides.length - 1 && (
        <button
          onClick={goToNext}
          className="absolute right-2 lg:right-8 top-[44%] transform -translate-y-1/2 z-20 text-white p-3 rounded-full transition-all hover:bg-[rgba(0,0,0,0.5)] hover:cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronIcon className="w-7 h-7 rotate-180" />
        </button>
      )}

      {/* Navigation Dots - Vertical on left side */}
      <div
        className={`absolute ${
          isRTL ? "lg:right-12 right-8" : "lg:left-12 left-8"
        } bottom-24 md:bottom-[35%] z-20 flex flex-col space-y-3`}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ease-out hover:scale-125 ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg"
                : "border-2 border-white bg-transparent hover:bg-white hover:bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
