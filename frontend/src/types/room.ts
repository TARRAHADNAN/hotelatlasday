import { StrapiImage, LocalizedContent, SEO } from './strapi';

export type RoomCategory = 'standard' | 'deluxe' | 'suite';

export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export interface RoomAttributes extends LocalizedContent {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: RoomCategory;
  surface: number;
  priceFrom: number;
  ezeeRoomCode: string;
  featured: boolean;
  order: number;
  image: {
    data: StrapiImage | null;
  };
  gallery: {
    data: StrapiImage[] | null;
  };
  amenities: Amenity[];
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Room {
  id: number;
  attributes: RoomAttributes;
}
