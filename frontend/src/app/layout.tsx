import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n/config';
import './globals.css';

// Note: Google Fonts temporarily disabled due to network restrictions in sandboxed environment
// In production, uncomment these imports:
// import { Inter, Playfair_Display, Noto_Sans_Arabic } from 'next/font/google';
// and configure them as needed

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Hôtel Atlas Day | Hôtel 4 Étoiles à Azilal - Haut Atlas Maroc',
    template: '%s | Hôtel Atlas Day',
  },
  description: 'Découvrez l\'Hôtel Atlas Day, votre refuge 4 étoiles au cœur du Haut Atlas à Azilal. Proche du Géoparc M\'Goun et des Cascades d\'Ouzoud.',
  keywords: ['hôtel azilal', 'hôtel atlas', 'hôtel maroc', 'cascade ouzoud', 'géoparc mgoun', 'haut atlas'],
  authors: [{ name: 'SESNOV' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Hôtel Atlas Day',
    title: 'Hôtel Atlas Day | Hôtel 4 Étoiles à Azilal',
    description: 'Votre refuge 4 étoiles au cœur du Haut Atlas marocain',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hôtel Atlas Day',
    description: 'Votre refuge 4 étoiles au cœur du Haut Atlas marocain',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
