import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Maximize } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getStrapiMedia } from '@/lib/strapi';
import type { Room } from '@/types/room';

interface RoomCardProps {
  room: Room;
  locale: string;
}

export default function RoomCard({ room, locale }: RoomCardProps) {
  const t = useTranslations('rooms');
  const { attributes } = room;

  const imageUrl = attributes.image.data
    ? getStrapiMedia(attributes.image.data.attributes.url)
    : '/placeholder-room.jpg';

  const capacity = attributes.capacity;
  const totalGuests = capacity ? capacity.adults + capacity.children : 2;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-64 overflow-hidden">
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
      </div>

      <CardHeader>
        <CardTitle className="font-heading text-xl">{attributes.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {attributes.shortDescription}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
          <div className="flex items-center gap-1">
            <Maximize size={16} />
            <span>{attributes.surface}m²</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{totalGuests} {totalGuests > 1 ? 'personnes' : 'personne'}</span>
          </div>
        </div>

        {attributes.amenities?.data && attributes.amenities.data.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {attributes.amenities.data.slice(0, 3).map((amenity) => (
              <span
                key={amenity.id}
                className="text-xs bg-neutral-100 px-2 py-1 rounded"
              >
                {amenity.attributes.name}
              </span>
            ))}
            {attributes.amenities.data.length > 3 && (
              <span className="text-xs text-neutral-500">
                +{attributes.amenities.data.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <p className="text-sm text-neutral-500">{t('from')}</p>
          <p className="text-2xl font-bold text-primary">
            {attributes.priceFrom ? formatPrice(Number(attributes.priceFrom)) : 'N/A'}
          </p>
          <p className="text-sm text-neutral-500">{t('per_night')}</p>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/${locale}/chambres/${attributes.slug}`} className="w-full">
          <Button className="w-full">{t('view_details')}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
