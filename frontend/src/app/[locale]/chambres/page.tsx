import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRooms } from '@/lib/strapi';
import RoomCard from '@/components/cards/RoomCard';
import { Room } from '@/types/room';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'rooms' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function RoomsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'rooms' });

  // Fetch rooms from Strapi
  let rooms: Room[] = [];
  try {
    rooms = await getRooms(locale);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-secondary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('page_title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral-100">
            {t('page_subtitle')}
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {rooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">
                Aucune chambre disponible pour le moment. Veuillez réessayer plus tard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
