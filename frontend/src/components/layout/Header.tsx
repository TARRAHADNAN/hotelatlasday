'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('navigation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/chambres`, label: t('rooms') },
    { href: `/${locale}/restaurant`, label: t('restaurant') },
    { href: `/${locale}/activites`, label: t('activities') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href={`/${locale}`} className="text-2xl font-bold font-heading text-primary">
          Atlas Day
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher locale={locale} />
          <Link href={`/${locale}/reserver`}>
            <Button className="hidden md:inline-flex">{t('book_now')}</Button>
          </Link>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t bg-white px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href={`/${locale}/reserver`} className="block pt-4">
            <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
              {t('book_now')}
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
