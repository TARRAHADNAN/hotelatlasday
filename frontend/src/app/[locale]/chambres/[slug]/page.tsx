import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getRoomBySlug } from '@/lib/strapi';
import { getStrapiMedia } from '@/lib/strapi';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, Maximize, Check } from 'lucide-react';

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const room = await getRoomBySlug(slug, locale);

  if (!room) {
    return {
      title: 'Chambre non trouvée',
    };
  }

  const { attributes } = room;
  const seo = attributes.seo;

  return {
    title: seo?.metaTitle || attributes.name,
    description: seo?.metaDescription || attributes.shortDescription,
    keywords: seo?.keywords,
  };
}

export default async function RoomDetailPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const t = await getTranslations({ locale, namespace: 'rooms' });

  const room = await getRoomBySlug(slug, locale);

  if (!room) {
    notFound();
  }

  const { attributes } = room;

  const mainImageUrl = attributes.image.data
    ? getStrapiMedia(attributes.image.data.attributes.url)
    : '/placeholder-room.jpg';

  const galleryImages = attributes.gallery?.data || [];
  const capacity = attributes.capacity;
  const totalGuests = capacity ? capacity.adults + capacity.children : 2;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src={mainImageUrl}
          alt={attributes.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
              {attributes.name}
            </h1>
            <p className="text-xl text-neutral-200">{attributes.shortDescription}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">{t('description')}</h2>
              <div
                className="prose max-w-none text-neutral-700"
                dangerouslySetInnerHTML={{ __html: attributes.description }}
              />
            </div>

            {/* Amenities */}
            {attributes.amenities?.data && attributes.amenities.data.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold mb-4">{t('amenities')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {attributes.amenities.data.map((amenity) => (
                    <div key={amenity.id} className="flex items-center gap-2">
                      <Check className="text-primary" size={20} />
                      <span>{amenity.attributes.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold mb-4">{t('gallery')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={getStrapiMedia(image.attributes.url)}
                        alt={image.attributes.alternativeText || attributes.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-neutral-50 p-6 rounded-lg shadow-md">
              {/* Price */}
              <div className="mb-6">
                <p className="text-sm text-neutral-500 mb-1">{t('from')}</p>
                <p className="text-3xl font-bold text-primary">
                  {attributes.priceFrom ? formatPrice(Number(attributes.priceFrom)) : 'N/A'}
                </p>
                <p className="text-sm text-neutral-500">{t('per_night')}</p>
              </div>

              {/* Room Info */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">{t('surface')}</span>
                  <div className="flex items-center gap-1">
                    <Maximize size={18} />
                    <span className="font-semibold">{attributes.surface}m²</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Capacité</span>
                  <div className="flex items-center gap-1">
                    <Users size={18} />
                    <span className="font-semibold">{totalGuests} personnes</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link href={`/${locale}/reserver`}>
                <Button className="w-full" size="lg">
                  {t('book_this_room')}
                </Button>
              </Link>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Annulation gratuite • Confirmation immédiate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
