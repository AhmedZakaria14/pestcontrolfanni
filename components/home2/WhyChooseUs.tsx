'use client';

import Image from 'next/image';
import { Leaf, Search, ShieldCheck } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { COMPANY_IMAGES } from '@/lib/media';
import { useLanguage } from '@/lib/i18n';

export default function WhyChooseUs() {
  const { t, isRTL, locale } = useLanguage();

  return (
    <section
      className={`py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text & Features (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle">
                <span>{t.whySubtitle}</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text={t.whyHeadline}
                highlightWords={t.whyHighlightWords}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>

            <ScrollReveal direction="up" delay={0.2} duration={0.6}>
              <p className="text-[#484C44] text-base leading-relaxed">
                {t.whyDesc}
              </p>
            </ScrollReveal>

            {/* 3 Pillars */}
            <StaggerContainer staggerDelay={0.15} className="space-y-4 pt-2">
              {/* Item 1 */}
              <StaggerItem yOffset={25}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#033F2D]">{t.whyPillar1Title}</h4>
                    <p className="text-sm text-[#484C44] mt-1 leading-relaxed">
                      {t.whyPillar1Desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Item 2 */}
              <StaggerItem yOffset={25}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#033F2D]">{t.whyPillar2Title}</h4>
                    <p className="text-sm text-[#484C44] mt-1 leading-relaxed">
                      {t.whyPillar2Desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Item 3 */}
              <StaggerItem yOffset={25}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#033F2D]">{t.whyPillar3Title}</h4>
                    <p className="text-sm text-[#484C44] mt-1 leading-relaxed">
                      {t.whyPillar3Desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right Image Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction={isRTL ? 'right' : 'left'} duration={0.8}>
              <div className="relative mx-auto max-w-lg lg:max-w-none grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl group">
                    <Image
                      src={COMPANY_IMAGES.precisionGelInjection}
                      alt={locale === 'en' ? 'Precision gel application' : 'فحص ونشر الجل النقطي'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Verified Pillar Card 1 */}
                  <div className="bg-[#033F2D] text-white p-6 rounded-3xl text-center transform transition-transform hover:scale-105 duration-300">
                    <ShieldCheck className="w-8 h-8 text-[#C7F268] mx-auto mb-2" />
                    <span className="text-base font-bold text-white block">
                      {locale === 'en' ? 'Odorless Formulations' : 'مبيدات بدون روائح'}
                    </span>
                    <span className="text-xs text-white/80 mt-1 block">
                      {locale === 'en' ? 'Safe for children & pets' : 'آمنة للأطفال والحيوانات الأليفة'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  {/* Verified Pillar Card 2 */}
                  <div className="bg-[#C7F268] text-[#033F2D] p-6 rounded-3xl text-center transform transition-transform hover:scale-105 duration-300">
                    <Search className="w-8 h-8 text-[#033F2D] mx-auto mb-2" />
                    <span className="text-base font-black text-[#033F2D] block">
                      {locale === 'en' ? 'Specialized Inspection' : 'معاينة فنية متخصصة'}
                    </span>
                    <span className="text-xs font-bold text-[#033F2D]/80 mt-1 block">
                      {locale === 'en' ? 'Accurate species identification' : 'تحديد دقيق لنوع الآفة'}
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl group">
                    <Image
                      src={COMPANY_IMAGES.outdoorSpraying}
                      alt={locale === 'en' ? 'Field treatment equipment' : 'معدات المعاملة الخارجية'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
