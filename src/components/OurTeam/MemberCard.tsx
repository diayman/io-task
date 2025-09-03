"use client";

import { useTranslations } from "next-intl";
import { SimplifiedTeamMember } from "./types";
import WhatsappIcon from "../icons/WhatsappIcon";
import PhoneIcon from "../icons/PhoneIcon";
import MailIcon from "../icons/MailIcon";
import Image from "next/image";

interface MemberCardProps {
  member: SimplifiedTeamMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Member Image */}
      <div className="relative h-64  w-[80%] md:w-full bg-gray-200">
        <Image
          src={member.photoUrl}
          alt={member.photoAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 16rem, 100vw"
        />
      </div>

      {/* Member Info */}
      <div className="p-6 text-center">
        <h3 className="md:text-[22px] text-base font-medium text-primary mb-2">
          {member.name}
        </h3>
        <p className="text-[#15143966] uppercase md:text-sm text-xs font-bold mb-4">
          {member.role}
        </p>

        {/* Contact Icons */}

        <div className="flex justify-center space-x-4">
          {member.socialLinks.whatsapp && (
            <a
              href={`https://wa.me/${member.socialLinks.whatsapp}`}
              className="text-secondary hover:text-amber-600 transition-colors"
              aria-label={t("team.social.whatsapp")}
            >
              <WhatsappIcon className="md:w-5 md:h-5 w-4 h-4 text-black" />
            </a>
          )}
          {member.socialLinks.phone && (
            <a
              href={`tel:${member.socialLinks.phone}`}
              className="text-secondary hover:text-amber-600 transition-colors"
              aria-label={t("team.social.phone")}
            >
              <PhoneIcon className="md:w-6 md:h-6 w-4 h-4 text-black" />
            </a>
          )}
          {member.socialLinks.email && (
            <a
              href={`mailto:${member.socialLinks.email}`}
              className="text-secondary hover:text-amber-600 transition-colors"
              aria-label={t("team.social.email")}
            >
              <MailIcon className="md:w-6 md:h-6 w-4 h-4 text-black" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
