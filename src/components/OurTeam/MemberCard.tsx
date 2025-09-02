"use client";

import { useTranslations } from "next-intl";
import { SimplifiedTeamMember } from "./types";
import WhatsappIcon from "../icons/WhatsappIcon";
import PhoneIcon from "../icons/PhoneIcon";
import MailIcon from "../icons/MailIcon";

interface MemberCardProps {
  member: SimplifiedTeamMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  const t = useTranslations();

  return (
    <div className="">
      {/* Member Image */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={member.photoUrl}
          alt={member.photoAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Member Info */}
      <div className="p-6 text-center">
        <h3 className="text-[22px] font-medium text-primary mb-2">
          {member.name}
        </h3>
        <p className="text-[#15143966] uppercase text-sm font-bold mb-4">
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
              <WhatsappIcon className="w-5 h-5 text-black" />
            </a>
          )}
          {member.socialLinks.phone && (
            <a
              href={`tel:${member.socialLinks.phone}`}
              className="text-secondary hover:text-amber-600 transition-colors"
              aria-label={t("team.social.phone")}
            >
              <PhoneIcon className="w-6 h-6 text-black" />
            </a>
          )}
          {member.socialLinks.email && (
            <a
              href={`mailto:${member.socialLinks.email}`}
              className="text-secondary hover:text-amber-600 transition-colors"
              aria-label={t("team.social.email")}
            >
              <MailIcon className="w-6 h-6 text-black" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
