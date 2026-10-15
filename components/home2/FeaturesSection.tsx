'use client';

import Image from 'next/image';
import { Leaf, Award, Crosshair } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { useLanguage } from '@/lib/i18n';

export default function FeaturesSection() {
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
                <span>{t.featuresSubtitle}</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text={t.featuresHeadline}
                highlightWords={t.featuresHighlightWords}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>

            <ScrollReveal direction="up" delay={0.2} duration={0.6}>
              <p className="text-[#484C44] text-base leading-relaxed">
                {t.featuresDesc}
              </p>
            </ScrollReveal>

            <StaggerContainer staggerDelay={0.12} className="space-y-4 pt-2">
              <StaggerItem yOffset={20}>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#033F2D]">{t.feature1Title}</h3>
                    <p className="text-xs text-[#484C44] mt-0.5">{t.feature1Desc}</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem yOffset={20}>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#033F2D]">{t.feature2Title}</h3>
                    <p className="text-xs text-[#484C44] mt-0.5">{t.feature2Desc}</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem yOffset={20}>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F8F5] border border-gray-100 hover:border-[#033F2D]/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                    <Crosshair className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#033F2D]">{t.feature3Title}</h3>
                    <p className="text-xs text-[#484C44] mt-0.5">{t.feature3Desc}</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right Image (6 cols) */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction={isRTL ? 'right' : 'left'} duration={0.8}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/assets/company/img3_1_16_20_1.jpg"
                  alt={locale === 'en' ? 'Smart pest management features' : 'مزايا إدارة الآفات الذكية'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
