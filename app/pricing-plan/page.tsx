'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import PricingSection from '@/components/home2/PricingSection';
import FaqSection from '@/components/home2/FaqSection';
import BookingModal from '@/components/BookingModal';
import { Check, X } from 'lucide-react';

export default function PricingPlanPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="باقات الأسعار"
          breadcrumbs={[{ label: 'خطط الأسعار' }]}
        />

        {/* Pricing Cards with monthly/annual toggle */}
        <PricingSection onOpenBooking={() => setBookingOpen(true)} />

        {/* Plan Comparison Matrix */}
        <section className="py-20 bg-[#F6F8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-[#033F2D]">
                مقارنة تفصيلية لمزايا كل باقة
              </h2>
              <p className="text-sm text-[#484C44] mt-2">
                جدول شفاف يوضح كافة المزايا المشمولة في كل خطة من خططنا.
              </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-gray-100">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#033F2D] text-white">
                    <th className="p-5 font-bold">مزايا وخدمات الحماية</th>
                    <th className="p-5 font-bold text-center">الباقة الأساسية</th>
                    <th className="p-5 font-bold text-center text-[#C7F268]">الباقة القياسية (الأكثر طلباً)</th>
                    <th className="p-5 font-bold text-center">الباقة الممتازة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#484C44]">
                  <tr>
                    <td className="p-5 font-bold text-[#033F2D]">حماية الجدران والزوايا الداخلية</td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-[#033F2D]">رش نباتي عضوي آمن وصديق للبيئة</td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-[#033F2D]">حزام حماية خارجي لمحيط الفناء والحديقة</td>
                    <td className="p-5 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-[#033F2D]">مكافحة القوارض وسد منافذ التسلل</td>
                    <td className="p-5 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-[#033F2D]">محطات طعوم ذكية للنمل الأبيض الأرضي</td>
                    <td className="p-5 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="p-5 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold text-[#033F2D]">معاودة المعالجة مجاناً في حال ظهور أي حشرة</td>
                    <td className="p-5 text-center"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                    <td className="p-5 text-center"><Check className="w-5 h-5 text-[#033F2D] mx-auto" /></td>
                  </tr>
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
