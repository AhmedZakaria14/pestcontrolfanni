'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import PricingSection from '@/components/home2/PricingSection';
import FaqSection from '@/components/home2/FaqSection';
import BookingModal from '@/components/BookingModal';
import JsonLd from '@/components/JsonLd';
import { Check, X } from 'lucide-react';
import { getPricingPageSchema } from '@/lib/schema';
import { useLanguage } from '@/lib/i18n';

export default function PricingPlanPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { t, isRTL, locale, dir } = useLanguage();
  const pricingSchema = getPricingPageSchema(locale);

  const comparisonRows =
    locale === 'en'
      ? [
          {
            feature: 'Internal wall, baseboard & corner treatment',
            basic: true,
            standard: true,
            premium: true,
          },
          {
            feature: 'Odorless German/US biological gel & spray',
            basic: true,
            standard: true,
            premium: true,
          },
          {
            feature: 'Exterior perimeter barrier shield for gardens/balconies',
            basic: false,
            standard: true,
            premium: true,
          },
          {
            feature: 'Rodent inspection, baiting & structural sealing',
            basic: false,
            standard: true,
            premium: true,
          },
          {
            feature: 'Sub-slab termite detection & specialized bait stations',
            basic: false,
            standard: false,
            premium: true,
          },
          {
            feature: 'Free re-treatment warranty coverage & follow-up visits',
            basic: false,
            standard: true,
            premium: true,
          },
        ]
      : [
          {
            feature: 'حماية الجدران والزوايا الداخلية',
            basic: true,
            standard: true,
            premium: true,
          },
          {
            feature: 'رش نباتي عضوي آمن وصديق للبيئة',
            basic: true,
            standard: true,
            premium: true,
          },
          {
            feature: 'حزام حماية خارجي لمحيط الفناء والحديقة',
            basic: false,
            standard: true,
            premium: true,
          },
          {
            feature: 'مكافحة القوارض وسد منافذ التسلل',
            basic: false,
            standard: true,
            premium: true,
          },
          {
            feature: 'محطات طعوم ذكية للنمل الأبيض الأرضي',
            basic: false,
            standard: false,
            premium: true,
          },
          {
            feature: 'معاودة المعالجة مجاناً في حال ظهور أي حشرة',
            basic: false,
            standard: true,
            premium: true,
          },
        ];

  return (
    <div
      className={`min-h-screen flex flex-col bg-white ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={dir}
    >
      <JsonLd id="schema-pricing-services" data={pricingSchema} />
      <Header />

      <main className="flex-1">
        <PageBanner
          title={t.navPricing}
          breadcrumbs={[{ label: t.navPricing }]}
        />

        {/* Pricing Cards */}
        <PricingSection onOpenBooking={() => setBookingOpen(true)} />

        {/* Plan Comparison Matrix */}
        <section className="py-20 bg-[#F6F8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-[#033F2D]">
                {locale === 'en'
                  ? 'Detailed Plan Comparison Matrix'
                  : 'مقارنة تفصيلية لمزايا كل باقة'}
              </h2>
              <p className="text-sm text-[#484C44] mt-2">
                {locale === 'en'
                  ? 'A transparent overview of the features included in each plan.'
                  : 'جدول شفاف يوضح كافة المزايا المشمولة في كل خطة من خططنا.'}
              </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-gray-100">
              <table
                className={`w-full text-sm ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <thead>
                  <tr className="border-b border-gray-100 bg-[#033F2D] text-white">
                    <th className="p-5 font-bold">
                      {locale === 'en' ? 'Pest Protection Features' : 'مزايا وخدمات الحماية'}
                    </th>
                    <th className="p-5 font-bold text-center">
                      {locale === 'en' ? 'Basic' : 'الباقة الأساسية'}
                    </th>
                    <th className="p-5 font-bold text-center text-[#C7F268]">
                      {locale === 'en'
                        ? 'Standard (Most Popular)'
                        : 'الباقة القياسية (الأكثر طلباً)'}
                    </th>
                    <th className="p-5 font-bold text-center">
                      {locale === 'en' ? 'Premium Comprehensive' : 'الباقة الممتازة'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#484C44]">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-5 font-bold text-[#033F2D]">{row.feature}</td>
                      <td className="p-5 text-center">
                        {row.basic ? (
                          <Check className="w-5 h-5 text-[#033F2D] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="p-5 text-center">
                        {row.standard ? (
                          <Check className="w-5 h-5 text-[#033F2D] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="p-5 text-center">
                        {row.premium ? (
                          <Check className="w-5 h-5 text-[#033F2D] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FaqSection />
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
