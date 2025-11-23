import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Award, Heart, Leaf, Lightbulb, Users } from 'lucide-react';
import Image from 'next/image';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    {
      icon: Award,
      title: t('value_excellence_title'),
      description: t('value_excellence_desc'),
      color: 'text-primary'
    },
    {
      icon: Heart,
      title: t('value_authenticity_title'),
      description: t('value_authenticity_desc'),
      color: 'text-secondary'
    },
    {
      icon: Leaf,
      title: t('value_sustainability_title'),
      description: t('value_sustainability_desc'),
      color: 'text-accent'
    },
    {
      icon: Lightbulb,
      title: t('value_innovation_title'),
      description: t('value_innovation_desc'),
      color: 'text-primary'
    }
  ];

  const stats = [
    { value: '9+', label: t('stats_years') },
    { value: '45', label: t('stats_rooms') },
    { value: '10k+', label: t('stats_guests') },
    { value: '4.8/5', label: t('stats_rating') }
  ];

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

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">{t('our_story')}</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p className="text-lg font-medium text-neutral-900">
                  {t('story_intro')}
                </p>
                <p>{t('story_p1')}</p>
                <p>{t('story_p2')}</p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-full h-full flex items-center justify-center">
                <p className="text-neutral-500 text-center px-4">
                  Image: Hôtel Atlas Day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">{t('our_mission')}</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              {t('mission_text')}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">
            {t('our_values')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <IconComponent className={value.color} size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-6">
              <Users className="text-secondary" size={40} />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-6">{t('our_team')}</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              {t('team_text')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
