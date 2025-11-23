import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, TrendingUp } from 'lucide-react';
import { getStrapiMedia } from '@/lib/strapi';
import type { Activity } from '@/types/activity';

interface ActivityCardProps {
  activity: Activity;
  locale: string;
}

export default function ActivityCard({ activity, locale }: ActivityCardProps) {
  const t = useTranslations('activities');
  const { attributes } = activity;

  const imageUrl = attributes.image.data
    ? getStrapiMedia(attributes.image.data.attributes.url)
    : '/placeholder-activity.jpg';

  const difficultyColors: Record<string, string> = {
    facile: 'bg-green-100 text-green-700',
    moyen: 'bg-yellow-100 text-yellow-700',
    difficile: 'bg-red-100 text-red-700',
    easy: 'bg-green-100 text-green-700',
    moderate: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={attributes.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {attributes.featured && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        {attributes.type && (
          <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
            {attributes.type}
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="font-heading text-xl">{attributes.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {attributes.shortDescription || attributes.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 mb-4">
          {attributes.duration && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Clock size={16} />
              <span>{attributes.duration}</span>
            </div>
          )}

          {attributes.distance && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <MapPin size={16} />
              <span>{attributes.distance} km</span>
            </div>
          )}

          {attributes.difficulty && (
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp size={16} />
              <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[attributes.difficulty]}`}>
                {attributes.difficulty}
              </span>
            </div>
          )}
        </div>

        {attributes.priceRange && (
          <div className="text-lg font-semibold text-primary">
            {attributes.priceRange}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link href={`/${locale}/activites/${attributes.slug}`} className="w-full">
          <Button className="w-full">{t('learn_more')}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
