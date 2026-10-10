'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import WarrantyVerificationSection from '@/components/WarrantyVerificationSection';

export default function WarrantyVerificationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="التحقق من شهادة الضمان الإلكترونية"
          breadcrumbs={[
            { label: 'الرئيسية', href: '/' },
            { label: 'التحقق من الضمان الإلكتروني' },
          ]}
        />

        <WarrantyVerificationSection isStandalonePage={true} />
      </main>

      <Footer />
    </div>
  );
}
