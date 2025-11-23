import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import EzeeWidget from '@/components/booking/EzeeWidget';
import { getEzeeConfig } from '@/lib/strapi';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'booking' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function BookingPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'booking' });

  // Fetch eZee configuration from Strapi
  let ezeeConfig = null;
  try {
    const config = await getEzeeConfig();
    ezeeConfig = config?.attributes;
  } catch (error) {
    console.error('Error fetching eZee config:', error);
  }

  // Features/benefits of booking
  const features = [
    {
      icon: CheckCircle,
      title: t('best_rate'),
      color: 'text-primary'
    },
    {
      icon: XCircle,
      title: t('free_cancellation'),
      color: 'text-secondary'
    },
    {
      icon: Clock,
      title: t('instant_confirmation'),
      color: 'text-accent'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('page_title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral-100">
            {t('page_subtitle')}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <IconComponent className={feature.color} size={24} />
                  <span className="font-medium text-neutral-700">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Widget Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              {ezeeConfig && ezeeConfig.hotelCode && ezeeConfig.bookingUrl ? (
                <EzeeWidget
                  hotelCode={ezeeConfig.hotelCode}
                  bookingUrl={ezeeConfig.bookingUrl}
                  theme={ezeeConfig.widgetTheme || {
                    primaryColor: '#C9A55C',
                    secondaryColor: '#2C5F7F'
                  }}
                />
              ) : (
                <div className="py-16 text-center">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-2xl font-heading font-bold mb-4">
                      Système de réservation temporairement indisponible
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      Veuillez nous contacter directement pour effectuer votre réservation.
                    </p>
                    <div className="space-y-2 text-neutral-700">
                      <p>
                        <strong>Téléphone:</strong>{' '}
                        <a href="tel:+212523456789" className="text-primary hover:underline">
                          +212 5 23 45 67 89
                        </a>
                      </p>
                      <p>
                        <strong>Email:</strong>{' '}
                        <a href="mailto:reservation@hotelatlasday.com" className="text-primary hover:underline">
                          reservation@hotelatlasday.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-heading font-bold text-lg mb-3">
                  Politique d&apos;annulation
                </h3>
                <p className="text-neutral-600 text-sm">
                  Annulation gratuite jusqu&apos;à 48h avant l&apos;arrivée.
                  Consultez les conditions détaillées lors de votre réservation.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-heading font-bold text-lg mb-3">
                  Besoin d&apos;aide ?
                </h3>
                <p className="text-neutral-600 text-sm">
                  Notre équipe est disponible 24h/24 pour vous assister.
                  Contactez-nous au +212 5 23 45 67 89.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
