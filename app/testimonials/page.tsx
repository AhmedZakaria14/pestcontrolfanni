'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { useLanguage } from '@/lib/i18n';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsPage() {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const { t, siteData, isRTL } = useLanguage();

  const testimonials = siteData.testimonials;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => setFeedbackSent(false), 5000);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
      <Header />

      <main className="flex-1">
        <PageBanner
          title={isRTL ? 'آراء وتجارب العملاء' : 'Customer Reviews & Feedback'}
          breadcrumbs={[{ label: isRTL ? 'التقييمات' : 'Testimonials' }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="section-subtitle mx-auto">
                <span>{isRTL ? 'تجارب وآراء عملائنا' : 'Client Stories & Feedback'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]">
                {isRTL
                  ? 'ما يقوله عملاؤنا الكرام عن خدماتنا وجودة عملنا'
                  : 'What Our Valued Clients Say About Our Service & Quality'}
              </h2>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="p-8 rounded-3xl bg-[#F6F8F5] border border-gray-100 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all relative text-right"
                >
                  <Quote className="w-10 h-10 text-[#C7F268] absolute top-6 left-6 opacity-60 scale-x-[-1]" />

                  <div className="space-y-4">
                    <div className="flex text-[#033F2D]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#033F2D]" />
                      ))}
                    </div>

                    <p className="text-sm text-[#484C44] leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#033F2D] shrink-0">
                      <Image
                        src={item.image || 'https://demo.awaikenthemes.com/bugfree/wp-content/uploads/2026/01/team-5.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#033F2D]">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        {item.role} {item.company ? `• ${item.company}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Your Feedback Box */}
            <div className={`mt-20 max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#033F2D] text-white space-y-6 shadow-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-white">
                  {isRTL ? 'شاركنا تجربتك ورأيك' : 'Share Your Experience & Feedback'}
                </h3>
                <p className="text-xs text-white/80">
                  {isRTL
                    ? 'هل استفدت من خدمات المركز الفني المتخصص؟ شاركنا انطباعك لمساعدة الآخرين في الحفاظ على بيئة آمنة ونظيفة.'
                    : 'Have you used our pest control services? Share your honest feedback to help others keep a clean and pest-free home.'}
                </p>
              </div>

              {feedbackSent ? (
                <div className="p-4 rounded-xl bg-[#C7F268]/20 border border-[#C7F268] text-[#C7F268] flex items-center justify-center gap-2 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {isRTL
                      ? 'شكراً لك! تم استلام تقييمك وسينشر بعد التحقق.'
                      : 'Thank you! Your review has been submitted and will appear shortly.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder={isRTL ? 'اسمك الكامل' : 'Your Full Name'}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#C7F268] ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                    <input
                      type="text"
                      placeholder={isRTL ? 'المدينة أو الحي' : 'City or District'}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#C7F268] ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      isRTL
                        ? 'اكتب تفاصيل تجربتك مع الفريق وسرعة الاستجابة والنتيجة...'
                        : 'Describe your experience with our team, promptness, and eradication result...'
                    }
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#C7F268] resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                  />
                  <button type="submit" className="w-full btn-default py-3.5 font-bold text-sm cursor-pointer">
                    {isRTL ? 'إرسال التقييم' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
