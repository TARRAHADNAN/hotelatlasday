import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('homepage');

  return (
    <section className="relative h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-secondary-700">
      {/* Background Image (placeholder - will be replaced with actual image) */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 animate-fade-in">
          {t('hero_title')}
        </h1>
        <p className="text-xl md:text-2xl font-light mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {t('hero_subtitle')}
        </p>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-neutral-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {t('hero_description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link href={`/${locale}/chambres`}>
            <Button size="lg" variant="default" className="gap-2">
              {t('hero_cta')}
              <ChevronRight size={18} />
            </Button>
          </Link>
          <Link href={`/${locale}/reserver`}>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              {t('hero_cta_secondary')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
