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

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ais-pre-duhcdcf3ixhhk7ogy6voit-87479276453.europe-west2.run.app'),
  title: {
    default: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض | Technical Specialized Pest Control Egypt',
    template: '%s | المركز الفني المتخصص بمصر',
  },
  description:
    'المركز الفني المتخصص لمكافحة الحشرات والقوارض في مصر. حلول فنية متخصصة للمنازل والفلل والمنشآت بمبيدات آمنة وبدون روائح. Technical Specialized Center for Pest & Rodent Control in Egypt.',
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
    canonical: 'https://ais-pre-duhcdcf3ixhhk7ogy6voit-87479276453.europe-west2.run.app',
    languages: {
      'ar-EG': 'https://ais-pre-duhcdcf3ixhhk7ogy6voit-87479276453.europe-west2.run.app?lang=ar',
      'en': 'https://ais-pre-duhcdcf3ixhhk7ogy6voit-87479276453.europe-west2.run.app?lang=en',
      'x-default': 'https://ais-pre-duhcdcf3ixhhk7ogy6voit-87479276453.europe-west2.run.app',
    },
  },
  icons: {
    icon: COMPANY_IMAGES.logo,
    apple: COMPANY_IMAGES.logo,
  },
  openGraph: {
    title: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض | Technical Specialized Pest Control Egypt',
    description:
      'حلول متخصصة لمكافحة الحشرات والقوارض في المنازل والفلل والمنشآت داخل مصر. اتصل بنا: 01000989063. Specialized Pest & Rodent Control in Egypt.',
    type: 'website',
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
    title: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض | Technical Specialized Pest Control',
    description:
      'حلول متخصصة لمكافحة الحشرات والقوارض في المنازل والفلل والمنشآت داخل مصر. اتصل بنا: 01000989063 | +201000989063',
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
        </LanguageProvider>
      </body>
    </html>
  );
}
