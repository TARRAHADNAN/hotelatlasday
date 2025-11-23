import { StrapiImage, LocalizedContent, SEO } from './strapi';

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  avatar?: {
    data: StrapiImage | null;
  };
}

export interface BlogPostAttributes extends LocalizedContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured: boolean;
  publishedDate: string;
  readingTime: number;
  coverImage: {
    data: StrapiImage | null;
  };
  category?: BlogCategory;
  categories?: {
    data: Array<{
      id: number;
      attributes: BlogCategory;
    }>;
  };
  author?: Author;
  tags?: string[];
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogPost {
  id: number;
  attributes: BlogPostAttributes;
}
