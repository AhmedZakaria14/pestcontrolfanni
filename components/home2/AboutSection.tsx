'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, MessageCircle } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { COMPANY_IMAGES } from '@/lib/media';
import { useLanguage } from '@/lib/i18n';

export default function AboutSection() {
  const { t, company, isRTL, locale } = useLanguage();

  return (
    <section
      className={`py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Images Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal
              direction={isRTL ? 'right' : 'left'}
              duration={0.8}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Primary Image */}
              <div
                className={`relative w-4/5 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group ${
                  isRTL ? 'mr-auto' : 'ml-auto'
                }`}
              >
                <Image
                  src={COMPANY_IMAGES.kitchenTreatment}
                  alt={
                    locale === 'en'
                      ? 'Technical Specialized Center field technician'
                      : 'فني المركز الفني المتخصص أثناء المعاينة'
                  }
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Secondary Overlapping Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`absolute -bottom-8 ${
                  isRTL ? 'left-0' : 'right-0'
                } w-3/5 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white group`}
              >
                <Image
                  src={COMPANY_IMAGES.residentialInspection}
                  alt={
                    locale === 'en'
                      ? 'Safe odorless pest control'
                      : 'مكافحة آمنة بدون روائح'
                  }
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Verified Identity Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute top-8 ${
                  isRTL ? 'left-2 sm:left-6 text-right' : 'right-2 sm:right-6 text-left'
                } bg-[#033F2D] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20`}
              >
                <span className="text-[11px] font-bold text-[#C7F268] tracking-wider block mb-1">
                  {company.shortName}
                </span>
                <p className="text-sm font-black text-white">
                  {locale === 'en' ? 'Certified Pest Control' : 'حلول موثوقة لمكافحة الآفات'}
                </p>
                <span className="text-xs text-white/70 block mt-1">
                  {locale === 'en'
                    ? 'Licensed odorless formulations'
                    : 'مبيدات مرخصة ومطابقة للمواصفات'}
                </span>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Text Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle">
                <span>{t.aboutSubtitle}</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text={t.aboutHeadline}
                highlightWords={t.aboutHighlightWords}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>

            <ScrollReveal direction="up" delay={0.2} duration={0.7}>
              <p className="text-[#484C44] text-base leading-relaxed">
                {t.aboutParagraph1}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} duration={0.7}>
              <p className="text-[#484C44] text-base leading-relaxed">
                {t.aboutParagraph2}
              </p>
            </ScrollReveal>

            {/* Feature Points Grid */}
            <ScrollReveal direction="up" delay={0.4} duration={0.7}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#C7F268] text-[#033F2D] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#033F2D] text-sm">{t.aboutCard1Title}</h3>
                    <p className="text-xs text-[#484C44] mt-1 leading-relaxed">
                      {t.aboutCard1Desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#C7F268] text-[#033F2D] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#033F2D] text-sm">{t.aboutCard2Title}</h3>
                    <p className="text-xs text-[#484C44] mt-1 leading-relaxed">
                      {t.aboutCard2Desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal
              direction="up"
              delay={0.5}
              duration={0.7}
              className="pt-3 flex flex-wrap gap-3"
            >
              <Link
                href="/contact-us"
                className="btn-default py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2"
              >
                <span>{t.aboutCtaContact}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
              </Link>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.whatsappNow}</span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
