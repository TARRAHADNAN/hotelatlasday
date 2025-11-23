import { MetadataRoute } from 'next';
import { getRooms, getBlogPosts, getActivities } from '@/lib/strapi';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hotelatlasday.com';
const LOCALES = ['fr', 'en', 'ar'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  const staticPages = [
    '',
    'chambres',
    'restaurant',
    'activites',
    'blog',
    'a-propos',
    'contact',
    'reserver',
  ];

  // Add static pages for each locale
  for (const locale of LOCALES) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${BASE_URL}/${locale}${page ? `/${page}` : ''}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  // Add dynamic room pages
  try {
    for (const locale of LOCALES) {
      const rooms = await getRooms(locale);
      rooms.forEach((room: any) => {
        sitemap.push({
          url: `${BASE_URL}/${locale}/chambres/${room.attributes.slug}`,
          lastModified: new Date(room.attributes.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error('Error fetching rooms for sitemap:', error);
  }

  // Add dynamic blog post pages
  try {
    for (const locale of LOCALES) {
      const { posts } = await getBlogPosts(locale, 1, 100);
      posts.forEach((post: any) => {
        sitemap.push({
          url: `${BASE_URL}/${locale}/blog/${post.attributes.slug}`,
          lastModified: new Date(post.attributes.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Add dynamic activity pages
  try {
    for (const locale of LOCALES) {
      const activities = await getActivities(locale);
      activities.forEach((activity: any) => {
        sitemap.push({
          url: `${BASE_URL}/${locale}/activites/${activity.attributes.slug}`,
          lastModified: new Date(activity.attributes.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }
  } catch (error) {
    console.error('Error fetching activities for sitemap:', error);
  }

  return sitemap;
}
