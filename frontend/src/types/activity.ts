import { StrapiImage, LocalizedContent, SEO } from './strapi';

export type DifficultyLevel = 'easy' | 'moderate' | 'hard';

export interface ActivityAttributes extends LocalizedContent {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: string;
  difficulty: DifficultyLevel;
  price: number;
  featured: boolean;
  included: string[];
  notIncluded?: string[];
  image: {
    data: StrapiImage | null;
  };
  gallery: {
    data: StrapiImage[] | null;
  };
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Activity {
  id: number;
  attributes: ActivityAttributes;
}
