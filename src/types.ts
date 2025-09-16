// types.ts
export interface GalleryItem {
  title: string;
  src: string;
  thumbnail?: string;
}

export interface SheetData {
  type: string;
  title_ar: string;
  title_en: string;
  src: string;
  thumbnail?: string;
}

export interface ModalState {
  isOpen: boolean;
  type: 'photos' | 'videos' | null;
  index: number;
}