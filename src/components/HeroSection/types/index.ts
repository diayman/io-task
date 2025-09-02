// Hero slide types
// Strapi Media Types
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    thumbnail?: {
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
    small?: {
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
    medium?: {
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
  } | null;
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

// CTA Button Type
export interface CTAButton {
  id: number;
  text: string;
  url: string;
}

// Hero Slide from Strapi
export interface HeroSlide {
  order: number;
  id: number;
  headline: string;
  subheadline: string;
  media_type: "image" | "video";
  background_media: StrapiMedia;
  image: StrapiMedia;
  cta: CTAButton[];
}

// Hero Section Response from Strapi
export interface HeroSectionResponse {
  data: {
    id: number;
    documentId: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    slides: HeroSlide[];
  };
  meta: any;
}

// Simplified Hero Slide for component usage
export interface SimplifiedHeroSlide {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  overlay?: boolean;
  portraitImage?: string; // URL for the portrait image
  portraitAlt?: string; // Alt text for portrait image
}

// Hero component props
export interface HeroProps {
  slides?: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  className?: string;
}

// Hero controls
export interface HeroControls {
  currentSlide: number;
  totalSlides: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onGoToSlide: (index: number) => void;
}
