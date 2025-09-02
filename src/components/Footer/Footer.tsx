"use client";

import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux/hooks";
import { FooterProps, FooterSection, SocialMedia } from "./types";
import SubscriptionForm from "./SubscriptionForm";
import FacebookIcon from "../icons/FacebookIcon";
import TwitterIcon from "../icons/TwitterIcon";
import GoogleIcon from "../icons/GoogleIcon";

export default function Footer({
  sections = [],
  socialMedia = [],
  copyright = "© 2024. All rights reserved.",
  className = "",
}: FooterProps) {
  const t = useTranslations();
  const { isRTL } = useAppSelector((state) => state.language);

  // Default footer sections if none provided
  const defaultSections: FooterSection[] = [
    {
      id: "about",
      title: t("footer.aboutUs"),
      links: [
        { id: "about", label: t("footer.aboutUs"), href: "/about" },
        { id: "strategy", label: t("footer.strategy"), href: "/strategy" },
        {
          id: "advantages",
          label: t("footer.advantages"),
          href: "/advantages",
        },
        {
          id: "responsibility",
          label: t("footer.socialResponsibility"),
          href: "/responsibility",
        },
        { id: "services", label: t("footer.services"), href: "/services" },
      ],
    },
  ];

  // Default social media if none provided
  const defaultSocialMedia: SocialMedia[] = [
    {
      id: "twitter",
      name: "Twitter",
      icon: "twitter",
      href: "https://twitter.com",
      color: "#1DA1F2",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "facebook",
      href: "https://facebook.com",
      color: "#1877F2",
    },
    {
      id: "google",
      name: "Google+",
      icon: "google",
      href: "https://plus.google.com",
      color: "#DB4437",
    },
  ];

  const footerSections = sections.length > 0 ? sections : defaultSections;
  const footerSocialMedia =
    socialMedia.length > 0 ? socialMedia : defaultSocialMedia;

  return (
    <footer className={`bg-primary text-white ${className}`}>
      <div className="bg-gray-50 h-[25px]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section - Email Subscription and Social Media */}
        <div className="flex flex-col md:flex-row justify-end gap-8 mb-12">
          {/* Email Subscription */}
          <SubscriptionForm />

          {/* Social Media */}
          <div className="flex items-center justify-end space-x-4">
            <span className="text-base font-normal text-white">
              {t("footer.contactInfo")}
            </span>
            {footerSocialMedia.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300 transition-colors"
                aria-label={social.name}
              >
                {social.icon === "twitter" && (
                  <TwitterIcon className="w-5 h-5 text-white hover:text-amber-300 transition-colors" />
                )}
                {social.icon === "facebook" && (
                  <FacebookIcon className="w-5 h-5 text-white hover:text-amber-300 transition-colors" />
                )}
                {social.icon === "google" && (
                  <GoogleIcon className="w-6 h-6 text-white hover:text-amber-300 transition-colors" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-600 mb-8"></div>

        {/* Bottom Section - Navigation Links and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6">
            {footerSections.map((section) =>
              section.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-white hover:text-amber-300 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))
            )}
          </div>

          {/* Copyright */}
          <div className="text-white text-sm">
            {t("footer.allRightsReserved")}
          </div>
        </div>
      </div>
    </footer>
  );
}
