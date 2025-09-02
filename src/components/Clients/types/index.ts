export interface SimplifiedClient {
  id: number;
  name: string;
  logoUrl: string;
  logoAlt?: string;
  position?: string;
  testimonial?: string;
}

export interface StrapiClient {
  id: number;
  name: string;
  logo: {
    url: string;
    alternativeText?: string;
  };
  position?: string;
  testimonial?: string;
}

export interface StrapiClientResponse {
  data: StrapiClient[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface TestimonialCarouselControls {
  currentIndex: number;
  totalTestimonials: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoToTestimonial: (index: number) => void;
}
