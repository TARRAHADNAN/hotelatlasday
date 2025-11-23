import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Utensils } from 'lucide-react';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'restaurant' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function RestaurantPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'restaurant' });

  // En attendant l'intégration Strapi, affichons une mise en page temporaire
  const menuCategories = [
    {
      id: 'breakfast',
      name: t('breakfast'),
      items: [],
    },
    {
      id: 'lunch',
      name: t('lunch'),
      items: [],
    },
    {
      id: 'dinner',
      name: t('dinner'),
      items: [],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-secondary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Utensils className="mx-auto mb-6" size={64} />
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('page_title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral-100">
            {t('page_subtitle')}
          </p>
        </div>
      </section>

      {/* Restaurant Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Opening Hours */}
            <div className="bg-neutral-50 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6 text-center">
                {t('opening_hours')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{t('breakfast')}</h3>
                  <p className="text-neutral-600">7h00 - 10h30</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{t('lunch')}</h3>
                  <p className="text-neutral-600">12h00 - 15h00</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{t('dinner')}</h3>
                  <p className="text-neutral-600">19h00 - 22h30</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-12">
              <p className="text-lg text-neutral-700 text-center">
                Découvrez notre restaurant gastronomique qui célèbre les saveurs authentiques de la cuisine marocaine
                et internationale. Notre chef propose des plats élaborés avec des produits frais et locaux dans un
                cadre élégant avec vue panoramique sur les montagnes de l&apos;Atlas.
              </p>
            </div>

            {/* Menu Placeholder */}
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <Utensils className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl font-heading font-bold mb-4">Notre Carte</h3>
              <p className="text-neutral-600 mb-6">
                Le menu détaillé sera bientôt disponible. En attendant, n&apos;hésitez pas à nous contacter pour
                toute information sur nos spécialités.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
