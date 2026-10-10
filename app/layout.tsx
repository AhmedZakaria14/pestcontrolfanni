import type { Metadata } from 'next';
import './globals.css';
import Preloader from '@/components/Preloader';
import MagicCursor from '@/components/MagicCursor';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/animations/ScrollProgress';
import { COMPANY_IMAGES } from '@/lib/media';

export const metadata: Metadata = {
  title: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض | مصر',
  description: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض في مصر. حلول فنية متخصصة للمنازل والفلل والمنشآت بمبيدات آمنة وبدون روائح.',
  icons: {
    icon: COMPANY_IMAGES.logo,
    apple: COMPANY_IMAGES.logo,
  },
  openGraph: {
    title: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض | مصر',
    description: 'حلول متخصصة لمكافحة الحشرات والقوارض في المنازل والفلل والمنشآت داخل مصر. اتصل بنا: 01000989063',
    type: 'website',
    locale: 'ar_EG',
    images: [
      {
        url: COMPANY_IMAGES.logo,
        width: 800,
        height: 800,
        alt: 'شعار المركز الفني المتخصص لمكافحة الحشرات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المركز الفني المتخصص لمكافحة الحشرات والقوارض | مصر',
    description: 'حلول متخصصة لمكافحة الحشرات والقوارض في المنازل والفلل والمنشآت داخل مصر. اتصل بنا: 01000989063',
    images: [COMPANY_IMAGES.logo],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body suppressHydrationWarning className="font-sans antialiased text-[#484C44] bg-white selection:bg-[#C7F268] selection:text-[#033F2D]">
        <ScrollProgress />
        <Preloader />
        <MagicCursor />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
