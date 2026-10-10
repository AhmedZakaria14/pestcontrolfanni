'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import BookingModal from '@/components/BookingModal';
import { FAQS_DATA, SITE_INFO } from '@/lib/siteData';
import { Plus, Minus, Search, PhoneCall } from 'lucide-react';

const CATEGORIES = [
  { key: 'All', label: 'الكل' },
  { key: 'Safety', label: 'الأمان والسلامة' },
  { key: 'Service', label: 'الخدمات والتنفيذ' },
  { key: 'Preparation', label: 'التحضير والوقاية' },
  { key: 'Warranty', label: 'الضمان والمتابعة' },
  { key: 'Emergency', label: 'حالات الطوارئ' },
];

export default function FaqsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="الأسئلة الشائعة"
          breadcrumbs={[{ label: 'الأسئلة الشائعة' }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Input */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="ابحث في الأسئلة (مثال: أمان الأطفال، الضمان، النمل الأبيض، الرائحة)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-4 pr-12 rounded-2xl bg-[#F6F8F5] border border-gray-200 text-sm focus:outline-none focus:border-[#033F2D] shadow-sm text-right"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-[#033F2D] text-[#C7F268]'
                      : 'bg-[#F6F8F5] text-[#033F2D] hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQs List */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  لم يتم العثور على أي أسئلة مطابقة لبحثك.
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;

                  return (
                    <div
                      key={faq.id}
                      className="bg-[#F6F8F5] rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#033F2D] hover:text-[#022a1e] transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-[#033F2D] text-[#C7F268]'
                              : 'bg-white text-[#033F2D]'
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <Plus className="w-4 h-4 stroke-[3]" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 text-sm text-[#484C44] leading-relaxed border-t border-gray-200/50 pt-4 text-right">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Still Have Questions Box */}
            <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#033F2D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-right">
                <span className="text-xs uppercase font-bold text-[#C7F268] tracking-wider block">
                  هل تحتاج لمزيد من المساعدة؟
                </span>
                <h4 className="text-2xl font-bold text-white">لديك استفسار خاص بنوع حشرة أو إصابة معينة؟</h4>
                <p className="text-xs text-white/80">
                  اتصل بفريق خدمة العملاء أو احجز موعد معاينة ميدانية لعقارك اليوم.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${SITE_INFO.phoneRaw}`}
                  dir="ltr"
                  className="btn-default py-3 px-5 text-sm font-bold"
                >
                  <PhoneCall className="w-4 h-4 ml-2" />
                  <span>{SITE_INFO.phone}</span>
                </a>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="btn-outline-white py-3 px-5 text-sm font-bold cursor-pointer"
                >
                  حجز معاينة فورية
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
