// src/types.ts

export type Language = 'en' | 'ar';

export interface NavItem {
  about: string;
  services: string;
  achievements: string;
  deals: string;
  gallery: string;
  documents: string;
  contact: string;
}

export interface HeaderContent {
  nav: NavItem;
  lang_toggle: string;
}

export interface HeroContent {
  title: string;
  tagline: string;
  cta1: string;
  cta2: string;
}

export interface Founder {
  name: string;
  role: string;
  photo: string;
  credentials: string[];
}

export interface AboutContent {
  title_part1: string;
  title_part2: string;
  p1: string;
  p2: string;
  p3: string;
  founder: Founder;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesContent {
  list: ServiceItem[];
}

export interface AchievementItem {
  icon: string;
  title: string;
  description: string;
}

export interface AchievementsContent {
  list: AchievementItem[];
}

export interface DealItem {
  img: string;
  title: string;
  description: string;
}

export interface DealsContent {
  list: DealItem[];
}

export interface GalleryTabs {
  photos: string;
  videos: string;
}

export interface GalleryItem {
  title: string;
  src: string;
  thumbnail?: string;
}

export interface GalleryContent {
  tabs: GalleryTabs;
  photos: GalleryItem[];
  videos: GalleryItem[];
}

export interface DocumentItem {
  icon: string;
  title: string;
  fileUrl: string;
}

export interface DocumentsContent {
  list: DocumentItem[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  submit: string;
}

export interface ContactContent {
  title_part1: string;
  title_part2: string;
  info: ContactInfo;
  form: ContactForm;
  mapEmbedUrl: string;
}

export interface SocialMediaItem {
  platform: string;
  icon: string;
  url: string;
}

export interface FooterContent {
  copyright: string;
  quickLinks: string;
  socialMedia?: SocialMediaItem[];
}

export interface LanguageContent {
  header: HeaderContent;
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  achievements: AchievementsContent;
  deals: DealsContent;
  gallery: GalleryContent;
  documents: DocumentsContent;
  contact: ContactContent;
  footer: FooterContent;
  playerSigning: PlayerSigningContent;
  agentBenefits: AgentBenefitsContent;
  transferMarket: TransferMarketContent;
}

export interface AppContent {
  en: LanguageContent;
  ar: LanguageContent;
}


export interface PlayerGallery {
  title: string;
  images: string[];
}

export interface PlayerSigningType {
  title: string;
  description: string;
  steps: string[];
  icon: string;
  videoUrl: string;
  gallery: PlayerGallery;
}

export interface PlayerSigningContent {
  title: string;
  highlight: string;
  videoTitle: string;
  professional: PlayerSigningType;
  amateur: PlayerSigningType;
  individual: PlayerSigningType;
  cta: {
    title: string;
    description: string;
    whatsappNumber: string;
    whatsappText: string;
    contactText: string;
  };
}
export interface AgentBenefitsContent {
  title: string;
  highlight: string;
  description: string;
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface TransferMarketContent {
  title: string;
  highlight: string;
  description: string;
  logoUrl: string;
  profileUrl: string;
  buttonText: string;
}


