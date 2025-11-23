import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Award, Users, MapPin, Star } from 'lucide-react';

export default function AboutSection({ locale }: { locale: string }) {
  const t = useTranslations('homepage');

  const features = [
    {
      icon: Award,
      title: 'Hôtel 4 Étoiles',
      description: 'Service premium et installations de qualité',
    },
    {
      icon: MapPin,
      title: 'Emplacement Idéal',
      description: 'Au cœur du Haut Atlas, près des cascades d\'Ouzoud',
    },
    {
      icon: Users,
      title: 'Hospitalité Marocaine',
      description: 'Accueil chaleureux et service personnalisé',
    },
    {
      icon: Star,
      title: 'Excellence Garantie',
      description: 'Noté 4.5/5 par nos clients',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/30 to-secondary/30">
            {/* Placeholder - will be replaced with actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-heading">
              Hotel Image
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">
              {t('about_subtitle')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-secondary mb-6">
              {t('about_title')}
            </h2>
            <p className="text-neutral-700 mb-8 leading-relaxed">
              {t('about_description')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-1">{feature.title}</h3>
                      <p className="text-sm text-neutral-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href={`/${locale}/a-propos`}>
              <Button size="lg">{t('about_cta')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
