'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import WarrantyVerificationSection from '@/components/WarrantyVerificationSection';
import { useLanguage } from '@/lib/i18n';

export default function WarrantyVerificationPage() {
  const { t, isRTL, dir } = useLanguage();

  return (
    <div
      className={`min-h-screen flex flex-col bg-white ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={dir}
    >
      <Header />

      <main className="flex-1">
        <PageBanner
          title={t.navWarranty}
          breadcrumbs={[{ label: t.navWarranty }]}
        />

        <WarrantyVerificationSection isStandalonePage={true} />
      </main>

      <Footer />
    </div>
  );
}
