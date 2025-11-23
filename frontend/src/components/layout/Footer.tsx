import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_MEDIA } from '@/lib/constants';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');

  const quickLinks = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/chambres`, label: tNav('rooms') },
    { href: `/${locale}/restaurant`, label: tNav('restaurant') },
    { href: `/${locale}/activites`, label: tNav('activities') },
    { href: `/${locale}/blog`, label: tNav('blog') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              Atlas Day
            </h3>
            <p className="text-neutral-200 mb-4">
              {t('about_text')}
            </p>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_MEDIA.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SOCIAL_MEDIA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_MEDIA.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('quick_links')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-200 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('contact_info')}</h4>
            <ul className="space-y-3 text-neutral-200">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-primary transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('newsletter')}</h4>
            <p className="text-neutral-200 mb-4 text-sm">
              {t('newsletter_text')}
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder={t('email_placeholder')}
                className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md font-medium transition-colors"
              >
                {t('subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-300">
          <p>{t('copyright')}</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/legal`} className="hover:text-primary transition-colors">
              {t('legal')}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-primary transition-colors">
              {t('privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-primary transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
