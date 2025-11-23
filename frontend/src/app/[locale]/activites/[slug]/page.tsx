import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getActivityBySlug } from '@/lib/strapi';
import { getStrapiMedia } from '@/lib/strapi';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, TrendingUp, Phone, Globe } from 'lucide-react';

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const activity = await getActivityBySlug(slug, locale);

  if (!activity) {
    return {
      title: 'Activité non trouvée',
    };
  }

  const { attributes } = activity;
  const seo = attributes.seo;

  return {
    title: seo?.metaTitle || attributes.name,
    description: seo?.metaDescription || attributes.shortDescription,
    keywords: seo?.keywords,
  };
}

export default async function ActivityDetailPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const t = await getTranslations({ locale, namespace: 'activities' });

  const activity = await getActivityBySlug(slug, locale);

  if (!activity) {
    notFound();
  }

  const { attributes } = activity;

  const mainImageUrl = attributes.image.data
    ? getStrapiMedia(attributes.image.data.attributes.url)
    : '/placeholder-activity.jpg';

  const galleryImages = attributes.gallery.data || [];

  const difficultyColors: Record<string, string> = {
    facile: 'bg-green-100 text-green-700',
    moyen: 'bg-yellow-100 text-yellow-700',
    difficile: 'bg-red-100 text-red-700',
    easy: 'bg-green-100 text-green-700',
    moderate: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

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
            <div className="mb-2">
              {attributes.type && (
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {attributes.type}
                </span>
              )}
            </div>
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
              <h2 className="text-2xl font-heading font-bold mb-4">Description</h2>
              <div
                className="prose max-w-none text-neutral-700"
                dangerouslySetInnerHTML={{ __html: attributes.description }}
              />
            </div>

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold mb-4">Photos</h2>
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
            <div className="sticky top-24 bg-neutral-50 p-6 rounded-lg shadow-md space-y-6">
              {/* Info */}
              <div className="space-y-4">
                {attributes.duration && (
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Durée</p>
                      <p className="text-neutral-600">{attributes.duration}</p>
                    </div>
                  </div>
                )}

                {attributes.distance && (
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Distance depuis l&apos;hôtel</p>
                      <p className="text-neutral-600">{attributes.distance} km</p>
                    </div>
                  </div>
                )}

                {attributes.difficulty && (
                  <div className="flex items-start gap-3">
                    <TrendingUp className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Difficulté</p>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${difficultyColors[attributes.difficulty]}`}>
                        {attributes.difficulty}
                      </span>
                    </div>
                  </div>
                )}

                {attributes.priceRange && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-neutral-500 mb-1">Tarif</p>
                    <p className="text-2xl font-bold text-primary">{attributes.priceRange}</p>
                  </div>
                )}
              </div>

              {/* Contact */}
              {(attributes.phone || attributes.website) && (
                <div className="pt-6 border-t space-y-3">
                  <h3 className="font-semibold">Contact</h3>
                  {attributes.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} />
                      <a href={`tel:${attributes.phone}`} className="hover:text-primary">
                        {attributes.phone}
                      </a>
                    </div>
                  )}
                  {attributes.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe size={16} />
                      <a
                        href={attributes.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        Site web
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <Link href={`/${locale}/contact`}>
                <Button className="w-full" size="lg">
                  Réserver cette activité
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
