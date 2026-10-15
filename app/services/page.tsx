'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import ServicesSection from '@/components/home2/ServicesSection';
import FeaturesSection from '@/components/home2/FeaturesSection';
import HowItWorks from '@/components/home2/HowItWorks';
import PestIdentifierTeaser from '@/components/home2/PestIdentifierTeaser';
import BookingModal from '@/components/BookingModal';
import JsonLd from '@/components/JsonLd';
import { PhoneCall } from 'lucide-react';
import { getLocalBusinessWithServicesSchema } from '@/lib/schema';
import { useLanguage } from '@/lib/i18n';

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { t, company, isRTL, locale, dir } = useLanguage();
  const servicesSchema = getLocalBusinessWithServicesSchema(locale);

  return (
    <div className={`min-h-screen flex flex-col bg-white ${isRTL ? 'text-right' : 'text-left'}`} dir={dir}>
      <JsonLd id="schema-services-page" data={servicesSchema} />
      <Header />

      <main className="flex-1">
        <PageBanner
          title={t.navServices}
          breadcrumbs={[{ label: t.navServices }]}
        />

        {/* Services Grid */}
        <ServicesSection />

        {/* Pest Identifier Tool Teaser */}
        <PestIdentifierTeaser />

        {/* Smart Features */}
        <FeaturesSection />

        {/* How It Works */}
        <HowItWorks />

        {/* Emergency Callout */}
        <section className="py-16 bg-[#033F2D] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12">
              <div className={`space-y-2 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-xs font-bold text-[#C7F268] uppercase tracking-wider block">
                  {t.emergencyTitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {locale === 'en'
                    ? 'Facing sudden pests in your home or facility?'
                    : 'هل تواجه مشكلة حشرات مفاجئة في منزلك أو منشأتك؟'}
                </h3>
                <p className="text-sm text-white/80 max-w-xl">
                  {t.emergencyDesc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <a
                  href={company.phonePrimaryRaw}
                  dir="ltr"
                  className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] py-3.5 px-6 font-bold rounded-xl text-sm inline-flex items-center gap-2 shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{company.phonePrimary}</span>
                </a>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-6 font-bold text-sm rounded-xl cursor-pointer transition-colors"
                >
                  {t.requestInspectionBtn}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
