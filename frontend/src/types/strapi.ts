export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: StrapiData<T> | StrapiData<T>[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: StrapiData<T>;
  meta?: any;
}

export interface StrapiCollectionResponse<T> {
  data: StrapiData<T>[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface LocalizedContent {
  locale: string;
  localizations?: {
    data: Array<{
      id: number;
      attributes: {
        locale: string;
      };
    }>;
  };
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalURL?: string;
  metaImage?: {
    data: StrapiImage | null;
  };
}
