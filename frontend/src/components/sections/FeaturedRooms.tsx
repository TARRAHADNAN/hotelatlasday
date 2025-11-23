import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FeaturedRooms({ locale }: { locale: string }) {
  const t = useTranslations('homepage');
  const tRooms = useTranslations('rooms');

  // Placeholder data (will be replaced with actual Strapi data)
  const placeholderRooms = [
    {
      id: 1,
      name: 'Chambre Standard',
      description: 'Chambre confortable avec vue sur les montagnes',
      price: 500,
      category: 'standard',
    },
    {
      id: 2,
      name: 'Chambre Deluxe',
      description: 'Chambre spacieuse avec balcon privé',
      price: 750,
      category: 'deluxe',
    },
    {
      id: 3,
      name: 'Suite Atlas',
      description: 'Suite luxueuse avec salon et terrasse',
      price: 1200,
      category: 'suite',
    },
  ];

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
          {placeholderRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
              <CardHeader>
                <CardTitle className="font-heading">{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-neutral-500">{tRooms('from')}</p>
                    <p className="text-2xl font-bold text-primary">{room.price} MAD</p>
                    <p className="text-xs text-neutral-500">{tRooms('per_night')}</p>
                  </div>
                  <Link href={`/${locale}/chambres`}>
                    <Button size="sm">{tRooms('view_details')}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
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
