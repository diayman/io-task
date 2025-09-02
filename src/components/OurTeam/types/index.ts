// Strapi Media Types
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Social Link from Strapi
export interface StrapiSocialLink {
  id: number;
  type: "email" | "phone" | "whatsapp" | "linkedin" | "twitter" | "instagram";
  value: string;
}

// Team Member from Strapi
export interface StrapiTeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  photo: StrapiMedia;
  social_links: StrapiSocialLink[];
  localizations: any[];
}

// Team Members Response from Strapi
export interface TeamMembersResponse {
  data: StrapiTeamMember[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Simplified Team Member for component usage
export interface SimplifiedTeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  photoAlt: string;
  socialLinks: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Team carousel controls
export interface TeamCarouselControls {
  currentIndex: number;
  totalMembers: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoToMember: (index: number) => void;
}
