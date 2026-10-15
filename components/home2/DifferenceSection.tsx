'use client';

import Image from 'next/image';
import { Clock, Zap, Phone } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { motion } from 'motion/react';
import { COMPANY_IMAGES } from '@/lib/media';
import { useLanguage } from '@/lib/i18n';

export default function DifferenceSection() {
  const { t, company, isRTL, locale } = useLanguage();

  return (
    <section
      className={`py-20 lg:py-28 bg-[#033F2D] text-white relative overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#C7F268]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual with Expert Image (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <ScrollReveal
              direction={isRTL ? 'left' : 'right'}
              duration={0.8}
              className="w-full flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent border-2 border-white/20 shadow-2xl p-2">
                <Image
                  src={COMPANY_IMAGES.fieldTeamAndCertificates}
                  alt={
                    locale === 'en'
                      ? 'Specialized technical team & warranty certifications'
                      : 'فنيو وشهادات المركز الفني المتخصص'
                  }
                  fill
                  className="object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Contact/Service Badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute bottom-6 left-6 right-6 bg-white text-[#033F2D] p-4 rounded-2xl shadow-2xl flex items-center justify-between ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#484C44] block">
                      {company.shortName}
                    </span>
                    <span className="text-sm font-black text-[#033F2D] block mt-0.5">
                      {locale === 'en' ? 'Certified Control in Egypt' : 'مكافحة معتمدة بمصر'}
                    </span>
                  </div>
                  <a
                    href={company.phonePrimaryRaw}
                    className="inline-flex items-center gap-1.5 bg-[#033F2D] text-[#C7F268] px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#022a1e] transition-colors"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{company.phonePrimary}</span>
                  </a>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          {/* Text & Points (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle-dark">
                <span>{t.diffSubtitle}</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text={t.diffHeadline}
                highlightWords={t.diffHighlightWords}
                highlightClass="text-[#C7F268]"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25]"
              />
            </div>

            <ScrollReveal direction="up" delay={0.2} duration={0.6}>
              <p className="text-white/80 text-base leading-relaxed">
                {t.diffDesc}
              </p>
            </ScrollReveal>

            <StaggerContainer
              staggerDelay={0.15}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4"
            >
              {/* Item 01 */}
              <StaggerItem yOffset={30}>
                <div
                  className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C7F268]/40 hover:-translate-y-1 transition-all duration-300 space-y-3 h-full ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#C7F268] text-[#033F2D] flex items-center justify-center font-bold">
                      <Clock className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-2xl font-black text-[#C7F268]/50">01</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{t.diffCard1Title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t.diffCard1Desc}
                  </p>
                </div>
              </StaggerItem>

              {/* Item 02 */}
              <StaggerItem yOffset={30}>
                <div
                  className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C7F268]/40 hover:-translate-y-1 transition-all duration-300 space-y-3 h-full ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#C7F268] text-[#033F2D] flex items-center justify-center font-bold">
                      <Zap className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-2xl font-black text-[#C7F268]/50">02</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{t.diffCard2Title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t.diffCard2Desc}
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
