import qs from 'qs';
import type { Room } from '@/types/room';
import type { BlogPost } from '@/types/blog';
import type { Activity } from '@/types/activity';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  endpoint: string;
  query?: Record<string, any>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  cache?: RequestCache;
  tags?: string[];
}

/**
 * Fetch data from Strapi API
 */
export async function fetchAPI<T>(options: FetchOptions): Promise<T> {
  const { endpoint, query = {}, wrappedByKey, wrappedByList, cache = 'default', tags = [] } = options;

  const mergedOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    cache,
    ...(tags.length > 0 && { next: { tags, revalidate: 60 } }),
  };

  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  const requestUrl = `${STRAPI_URL}/api${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      throw new Error(`Strapi fetch failed: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();

    if (wrappedByKey) {
      data = data[wrappedByKey];
    }

    if (wrappedByList && Array.isArray(data)) {
      data = data[0] || null;
    }

    return data as T;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Get all rooms
 */
export async function getRooms(locale: string): Promise<Room[]> {
  return fetchAPI<Room[]>({
    endpoint: '/rooms',
    query: {
      locale,
      populate: ['image', 'gallery', 'amenities'],
      sort: ['order:asc', 'createdAt:desc'],
      pagination: {
        limit: 100,
      },
    },
    wrappedByKey: 'data',
    tags: ['rooms'],
  });
}

/**
 * Get room by slug
 */
export async function getRoomBySlug(slug: string, locale: string): Promise<Room | null> {
  const rooms = await fetchAPI<Room[]>({
    endpoint: '/rooms',
    query: {
      locale,
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['image', 'gallery', 'amenities', 'seo', 'seo.metaImage'],
    },
    wrappedByKey: 'data',
    tags: ['rooms', `room-${slug}`],
  });

  return rooms.length > 0 ? rooms[0] : null;
}

/**
 * Get featured rooms
 */
export async function getFeaturedRooms(locale: string): Promise<Room[]> {
  return fetchAPI<Room[]>({
    endpoint: '/rooms',
    query: {
      locale,
      filters: {
        featured: {
          $eq: true,
        },
      },
      populate: ['image', 'amenities'],
      sort: ['order:asc'],
      pagination: {
        limit: 3,
      },
    },
    wrappedByKey: 'data',
    tags: ['rooms', 'featured-rooms'],
  });
}

/**
 * Get all blog posts
 */
export async function getBlogPosts(locale: string, page: number = 1, pageSize: number = 10): Promise<{ posts: BlogPost[], pagination: any }> {
  const data = await fetchAPI<{ data: BlogPost[], meta: any }>({
    endpoint: '/blog-posts',
    query: {
      locale,
      populate: ['coverImage', 'category', 'author', 'author.avatar'],
      sort: ['publishedDate:desc'],
      pagination: {
        page,
        pageSize,
      },
    },
    tags: ['blog'],
  });

  return {
    posts: data.data || [],
    pagination: data.meta?.pagination || {},
  };
}

/**
 * Get blog post by slug
 */
export async function getBlogPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
  const posts = await fetchAPI<BlogPost[]>({
    endpoint: '/blog-posts',
    query: {
      locale,
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['coverImage', 'category', 'author', 'author.avatar', 'seo', 'seo.metaImage'],
    },
    wrappedByKey: 'data',
    tags: ['blog', `blog-${slug}`],
  });

  return posts.length > 0 ? posts[0] : null;
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(locale: string): Promise<BlogPost[]> {
  return fetchAPI<BlogPost[]>({
    endpoint: '/blog-posts',
    query: {
      locale,
      filters: {
        featured: {
          $eq: true,
        },
      },
      populate: ['coverImage', 'category', 'author'],
      sort: ['publishedDate:desc'],
      pagination: {
        limit: 3,
      },
    },
    wrappedByKey: 'data',
    tags: ['blog', 'featured-blog'],
  });
}

/**
 * Get all activities
 */
export async function getActivities(locale: string): Promise<Activity[]> {
  return fetchAPI<Activity[]>({
    endpoint: '/activities',
    query: {
      locale,
      populate: ['image', 'gallery'],
      sort: ['createdAt:desc'],
      pagination: {
        limit: 100,
      },
    },
    wrappedByKey: 'data',
    tags: ['activities'],
  });
}

/**
 * Get activity by slug
 */
export async function getActivityBySlug(slug: string, locale: string): Promise<Activity | null> {
  const activities = await fetchAPI<Activity[]>({
    endpoint: '/activities',
    query: {
      locale,
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['image', 'gallery', 'seo', 'seo.metaImage'],
    },
    wrappedByKey: 'data',
    tags: ['activities', `activity-${slug}`],
  });

  return activities.length > 0 ? activities[0] : null;
}

/**
 * Get global config
 */
export async function getGlobalConfig(locale: string): Promise<any> {
  return fetchAPI<any>({
    endpoint: '/global-config',
    query: {
      locale,
      populate: ['logo', 'socialMedia'],
    },
    wrappedByKey: 'data',
    tags: ['global-config'],
  });
}

/**
 * Get eZee config
 */
export async function getEzeeConfig(): Promise<any> {
  return fetchAPI<any>({
    endpoint: '/ezee-config',
    query: {
      populate: '*',
    },
    wrappedByKey: 'data',
    tags: ['ezee-config'],
  });
}

/**
 * Helper function to get full URL for Strapi media
 */
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
