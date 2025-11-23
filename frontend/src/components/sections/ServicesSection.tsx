import { useTranslations } from 'next-intl';
import { Wifi, Coffee, Car, Utensils, Waves, Dumbbell } from 'lucide-react';

export default function ServicesSection({ locale }: { locale: string }) {
  const t = useTranslations('homepage');

  const services = [
    {
      icon: Wifi,
      title: 'WiFi Gratuit',
      description: 'Connexion haut débit dans tout l\'hôtel',
    },
    {
      icon: Utensils,
      title: 'Restaurant',
      description: 'Cuisine marocaine et internationale',
    },
    {
      icon: Car,
      title: 'Parking',
      description: 'Parking gratuit et sécurisé',
    },
    {
      icon: Coffee,
      title: 'Bar Lounge',
      description: 'Détente et rafraîchissements',
    },
    {
      icon: Waves,
      title: 'Piscine',
      description: 'Piscine extérieure avec vue panoramique',
    },
    {
      icon: Dumbbell,
      title: 'Salle de Sport',
      description: 'Équipements modernes',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-wider mb-2">
            {t('services_subtitle')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-secondary mb-4">
            {t('services_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">{service.title}</h3>
                <p className="text-neutral-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
