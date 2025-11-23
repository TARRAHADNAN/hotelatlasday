import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getStrapiMedia } from '@/lib/strapi';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const t = useTranslations('blog');
  const { attributes } = post;

  const imageUrl = attributes.coverImage.data
    ? getStrapiMedia(attributes.coverImage.data.attributes.url)
    : '/placeholder-blog.jpg';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={attributes.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {attributes.featured && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-center gap-4 text-xs text-neutral-500 mb-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(attributes.publishedAt || attributes.createdAt, locale)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{attributes.readingTime} min</span>
          </div>
        </div>

        <CardTitle className="font-heading text-xl line-clamp-2">
          {attributes.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {attributes.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4">
          {attributes.author && (
            <div className="flex items-center gap-2 text-sm">
              <User size={16} />
              <span>{attributes.author.name}</span>
            </div>
          )}

          {attributes.categories?.data && attributes.categories.data.length > 0 && (
            <div className="flex gap-2">
              {attributes.categories.data.slice(0, 2).map((category) => (
                <span
                  key={category.id}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                >
                  {category.attributes.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/${locale}/blog/${attributes.slug}`} className="w-full">
          <Button variant="outline" className="w-full">{t('read_more')}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
