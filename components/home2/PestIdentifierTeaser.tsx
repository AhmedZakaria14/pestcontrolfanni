'use client';

import Link from 'next/link';
import { Bug, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function PestIdentifierTeaser() {
  const { t, isRTL, locale } = useLanguage();

  return (
    <section
      className={`py-20 bg-[#033F2D] text-white relative overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      {/* Background glow & accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C7F268]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C7F268]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          {/* Content & CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7F268]/20 text-[#C7F268] text-xs font-black">
              <Bug className="w-4 h-4" />
              <span>{t.pestTeaserBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {locale === 'en' ? (
                <>
                  Spotted an unknown insect or pest?{' '}
                  <span className="text-[#C7F268] underline decoration-wavy decoration-[#C7F268]/40">
                    Identify it in 60 seconds
                  </span>
                </>
              ) : (
                <>
                  هل رصدت حشرة مجهولة في منزلك؟{' '}
                  <span className="text-[#C7F268] underline decoration-wavy decoration-[#C7F268]/40">
                    تعرف عليها في 60 ثانية
                  </span>
                </>
              )}
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {t.pestTeaserDesc}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#C7F268] shrink-0" />
                <span>
                  {locale === 'en'
                    ? 'Instant diagnosis with >95% accuracy'
                    : 'تشخيص فوري بدقة تفوق 95%'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#C7F268] shrink-0" />
                <span>
                  {locale === 'en'
                    ? 'Free immediate preventive guidelines'
                    : 'إرشادات وقائية أولية مجانية'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#C7F268] shrink-0" />
                <span>
                  {locale === 'en'
                    ? 'Direct WhatsApp photo consultation'
                    : 'إمكانية إرسال صورة لخبير الحشرات'}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#C7F268] shrink-0" />
                <span>
                  {locale === 'en'
                    ? 'Direct booking for field inspection'
                    : 'حجز مباشر للمعاينة الميدانية'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/pest-identifier"
                className="btn-default py-3.5 px-8 text-sm font-bold shadow-xl inline-flex items-center gap-2"
              >
                <span>{t.pestTeaserBtn}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
              <Link
                href="/pest-identifier"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>
                  {locale === 'en' ? 'Browse Pest Encyclopedia' : 'تصفح موسوعة الآفات'}
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column (Sample Question Card) */}
          <div className="lg:col-span-5 relative">
            <div
              className={`relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white text-[#033F2D] p-6 space-y-4 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#033F2D] text-[#C7F268] flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-xs text-[#033F2D]">
                    {locale === 'en' ? 'Interactive Diagnostic Tool' : 'نموذج فحص سريع مباشر'}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C7F268] text-[#033F2D] font-black">
                  {locale === 'en' ? '100% Free' : 'مجاني 100%'}
                </span>
              </div>

              {/* Sample question preview */}
              <div className="space-y-2">
                <span className="text-xs text-gray-500 font-bold block">
                  {locale === 'en'
                    ? 'Question: Where did you spot the insect?'
                    : 'السؤال: أين شاهدت الحشرة؟'}
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <Link
                    href="/pest-identifier"
                    className="p-2.5 rounded-xl bg-[#F4F6F4] hover:bg-[#C7F268]/30 hover:border-[#C7F268] border border-gray-100 transition-colors block text-center"
                  >
                    {locale === 'en' ? '🍽️ In the Kitchen' : '🍽️ في المطبخ'}
                  </Link>
                  <Link
                    href="/pest-identifier"
                    className="p-2.5 rounded-xl bg-[#F4F6F4] hover:bg-[#C7F268]/30 hover:border-[#C7F268] border border-gray-100 transition-colors block text-center"
                  >
                    {locale === 'en' ? '🛏️ In the Bedroom' : '🛏️ في غرفة النوم'}
                  </Link>
                  <Link
                    href="/pest-identifier"
                    className="p-2.5 rounded-xl bg-[#F4F6F4] hover:bg-[#C7F268]/30 hover:border-[#C7F268] border border-gray-100 transition-colors block text-center"
                  >
                    {locale === 'en' ? '🚪 In Wood & Doors' : '🚪 في الخشب والأبواب'}
                  </Link>
                  <Link
                    href="/pest-identifier"
                    className="p-2.5 rounded-xl bg-[#F4F6F4] hover:bg-[#C7F268]/30 hover:border-[#C7F268] border border-gray-100 transition-colors block text-center"
                  >
                    {locale === 'en' ? '🌿 In the Garden' : '🌿 في الحديقة'}
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/pest-identifier"
                  className="w-full block py-2.5 rounded-xl bg-[#033F2D] text-white text-center text-xs font-bold hover:bg-[#04523B] transition-colors"
                >
                  {locale === 'en'
                    ? 'Click to start diagnosis now →'
                    : 'انقر للإجابة ومعرفة النتيجة فوراً ←'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
