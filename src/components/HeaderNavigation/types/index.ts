export interface NavLink {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: ServiceItem[];
}

export interface LanguageOption {
  code: string;
  name: string;
  flag?: string;
}

export interface NavbarProps {
  className?: string;
}

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onDropdownChange: (isOpen: boolean) => void;
}

export interface LanguageToggleProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}
