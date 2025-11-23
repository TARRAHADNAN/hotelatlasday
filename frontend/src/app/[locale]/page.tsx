import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedRooms from '@/components/sections/FeaturedRooms';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'homepage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <div className="flex flex-col">
      <HeroSection locale={locale} />
      <FeaturedRooms locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
    </div>
  );
}
