import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import RoomCard from '@/components/cards/RoomCard';
import { getFeaturedRooms } from '@/lib/strapi';
import { Room } from '@/types/room';

export default async function FeaturedRooms({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage' });

  // Fetch featured rooms from Strapi
  let rooms: Room[] = [];
  try {
    rooms = await getFeaturedRooms(locale);
  } catch (error) {
    console.error('Error fetching featured rooms:', error);
  }

  // If no rooms available, don't render the section
  if (rooms.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-wider mb-2">
            {t('featured_rooms_subtitle')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-secondary mb-4">
            {t('featured_rooms_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} locale={locale} />
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/chambres`}>
            <Button size="lg" variant="outline">
              {t('view_all_rooms')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
