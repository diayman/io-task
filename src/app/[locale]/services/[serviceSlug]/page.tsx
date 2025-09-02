"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useServiceDetails } from "./useServiceDetails";
import BackButton from "@/components/common/BackButton";

export default function ServicePage() {
  const router = useRouter();
  const { serviceSlug } = useParams();
  const locale = useLocale();
  const { service, isLoading, error } = useServiceDetails(
    serviceSlug as string
  );

  const isRTL = locale === "ar";

  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Image Skeleton */}
        <div className="w-full h-64 bg-gray-300 animate-pulse"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-16 mb-8"></div>
            <div className="h-8 bg-gray-300 rounded w-96 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Service Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              {error || "The requested service could not be found."}
            </p>
            <button
              onClick={handleBackClick}
              className="text-[#4B2615] hover:text-[#69483a] font-medium transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="relative w-full h-[100vh]">
        <Image
          src="/images/service-image.jpg"
          alt={`${service.title} - Service Image`}
          fill
          className="object-cover h-full grayscale"
          priority
          sizes="100vw"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <h1 className="text-[42px] font-medium text-primary leading-tight">
          {service.title}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        </div>

        {/* Custom styling for the content */}
        <style jsx global>{`
          .prose h2 {
            color: var(--color-primary);
            font-size: 1rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }

          .prose .service-section {
            border-left: 3px solid rgba(0, 0, 0, 0.05);
            padding-left: 2rem;
            margin-bottom: 2rem;
          }

          .prose .service-section:last-of-type {
            margin-bottom: 4rem;
          }

          .prose .service-section > p:first-child {
            position: relative;
            ${isRTL ? "padding-right: 1rem;" : "padding-left: 1rem;"}
            font-size: 17px;
            font-weight: 700;
            opacity: 0.8;
          }

          .prose .service-section > p:first-child::before {
            content: "";
            position: absolute;
            ${isRTL ? "right: 0;" : "left: 0;"}
            top: 0.5rem;
            width: 8px;
            height: 8px;
            border-radius: 2px;
            background-color: var(--color-primary);
          }

          .prose p {
            margin-bottom: 1rem;
            line-height: 1.7;
          }

          .prose ul {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }

          .prose li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
            list-style-type: "- ";
          }

          .prose strong {
            color: var(--color-primary);
            font-weight: 600;
          }

          .prose hr {
            border-color: #e5e7eb;
            margin: 2rem 0;
          }
        `}</style>
      </div>
    </div>
  );
}
