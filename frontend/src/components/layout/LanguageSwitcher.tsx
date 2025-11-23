'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Replace the locale in the pathname
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="relative group">
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <Globe size={18} />
        <span className="uppercase font-medium">{locale}</span>
      </Button>

      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-2">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full text-left px-4 py-2 hover:bg-neutral-100 transition-colors ${
                loc === locale ? 'bg-neutral-50 font-semibold text-primary' : ''
              }`}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
