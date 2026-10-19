import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/Preloader';
import MagicCursor from '@/components/MagicCursor';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/animations/ScrollProgress';
import JsonLd from '@/components/JsonLd';
import { COMPANY_IMAGES } from '@/lib/media';
import { getLocalBusinessObject } from '@/lib/schema';
import { LanguageProvider } from '@/lib/i18n';
import FloatingContactDock from '@/components/FloatingContactDock';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://centerpestcontrol.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'المركز الفني المتخصص | مكافحة الحشرات والقوارض بمصر',
    template: '%s | المركز الفني المتخصص',
  },
  description:
    'المركز الفني المتخصص لمكافحة الحشرات والقوارض في مصر. خدمات إبادة فنية آمنة بدون روائح للمنازل والشركات بضمان رسمي ومعاينة هندسية.',
  keywords: [
    'المركز الفني المتخصص',
    'مكافحة حشرات مصر',
    'شركة مكافحة حشرات',
    'إبادة الحشرات والقوارض',
    'مكافحة الصراصير وبق الفراش',
    'مكافحة النمل الأبيض',
    'Pest Control Egypt',
    'Technical Specialized Center',
    'Exterminator Cairo Egypt',
    'Bed bugs extermination Egypt',
    'Termite control Cairo',
    'Commercial pest management',
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      'ar-EG': `${siteUrl}?lang=ar`,
      'en': `${siteUrl}?lang=en`,
      'x-default': siteUrl,
    },
  },
  icons: {
    icon: COMPANY_IMAGES.logo,
    apple: COMPANY_IMAGES.logo,
  },
  openGraph: {
    title: 'المركز الفني المتخصص | مكافحة الحشرات والقوارض بمصر',
    description:
      'المركز الفني المتخصص لمكافحة الحشرات والقوارض في مصر. خدمات إبادة فنية آمنة بدون روائح للمنازل والشركات بضمان رسمي ومعاينة هندسية.',
    type: 'website',
    url: siteUrl,
    siteName: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض',
    locale: 'ar_EG',
    alternateLocale: ['en_US'],
    images: [
      {
        url: COMPANY_IMAGES.logo,
        width: 800,
        height: 800,
        alt: 'شعار المركز الفني المتخصص لمكافحة الحشرات - Technical Specialized Pest Control Egypt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المركز الفني المتخصص | مكافحة الحشرات والقوارض بمصر',
    description:
      'المركز الفني المتخصص لمكافحة الحشرات والقوارض في مصر. خدمات إبادة فنية آمنة بدون روائح للمنازل والشركات بضمان رسمي ومعاينة هندسية.',
    images: [COMPANY_IMAGES.logo],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    ...getLocalBusinessObject('ar'),
  };

  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cairo.className} font-sans antialiased text-[#484C44] bg-white selection:bg-[#C7F268] selection:text-[#033F2D] dir-rtl`}
      >
        <JsonLd id="schema-local-business-global" data={localBusinessSchema} />
        <LanguageProvider>
          <ScrollProgress />
          <Preloader />
          <MagicCursor />
          {children}
          <BackToTop />
          <FloatingContactDock />
        </LanguageProvider>
      </body>
    </html>
  );
}
