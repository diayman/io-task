// Footer link types
export interface FooterLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

// Social media types
export interface SocialMedia {
  id: string;
  name: string;
  icon: string;
  href: string;
  color?: string;
}

// Footer component props
export interface FooterProps {
  sections?: FooterSection[];
  socialMedia?: SocialMedia[];
  copyright?: string;
  className?: string;
}

// Subscription form types
export interface SubscriptionFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading?: boolean;
  success?: string;
  error?: string;
  className?: string;
}

export interface SubscriptionFormData {
  email: string;
}

