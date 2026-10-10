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
import { PhoneCall } from 'lucide-react';
import { company } from '@/lib/company';

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-right" dir="rtl">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="خدمات المكافحة المتخصصة"
          breadcrumbs={[{ label: 'خدمات المكافحة' }]}
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
              <div className="space-y-2 text-center md:text-right">
                <span className="text-xs font-bold text-[#C7F268] uppercase tracking-wider block">
                  تواصل فوري ومباشر مع الفنيين
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  هل تواجه مشكلة حشرات مفاجئة في منزلك أو منشأتك؟
                </h3>
                <p className="text-sm text-white/80 max-w-xl">
                  تواصل معنا الآن لتحديد خطة المعاينة والمكافحة الفورية المناسبة لنوع الإصابة.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <a
                  href={company.phonePrimaryRaw}
                  dir="ltr"
                  className="btn-default py-3.5 px-6 font-bold"
                >
                  <PhoneCall className="w-4 h-4 ml-2" />
                  <span>{company.phonePrimary}</span>
                </a>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="btn-outline-white py-3.5 px-6 font-bold text-sm cursor-pointer"
                >
                  طلب معاينة فورية
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
