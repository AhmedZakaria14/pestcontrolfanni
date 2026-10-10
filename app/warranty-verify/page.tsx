'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import WarrantyVerificationSection from '@/components/WarrantyVerificationSection';

export default function WarrantyVerifyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-right" dir="rtl">
      <Header />
      <main className="flex-1">
        <PageBanner
          title="التحقق من شهادة الضمان الإلكتروني"
          breadcrumbs={[{ label: 'التحقق من الضمان' }]}
        />
        <WarrantyVerificationSection />
      </main>
      <Footer />
    </div>
  );
}
