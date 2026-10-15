'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Leaf,
  MessageCircle,
  Phone,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Play,
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import { COMPANY_IMAGES } from '@/lib/media';
import { useLanguage } from '@/lib/i18n';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenVideo?: () => void;
}

const HERO_IMAGES_AR = [
  {
    src: COMPANY_IMAGES.fieldWorkerBackpack,
    title: 'الفريق الفني بجهة التطبيق الميداني',
    type: 'صورة رسمية موثقة',
  },
  {
    src: COMPANY_IMAGES.kitchenTreatment,
    title: 'معالجة صراصير المطابخ بالجل النقطي',
    type: 'صورة رسمية موثقة',
  },
  {
    src: COMPANY_IMAGES.residentialInspection,
    title: 'فحص مجهري ومعاينة الشقوق السكنية',
    type: 'صورة رسمية موثقة',
  },
  {
    src: COMPANY_IMAGES.fieldTeamAndCertificates,
    title: 'الفريق الفني واعتمادات الضمان',
    type: 'صورة رسمية موثقة',
  },
];

const HERO_IMAGES_EN = [
  {
    src: COMPANY_IMAGES.fieldWorkerBackpack,
    title: 'Certified Field Application Team',
    type: 'Official Field Work',
  },
  {
    src: COMPANY_IMAGES.kitchenTreatment,
    title: 'Odorless German Gel Treatment',
    type: 'Official Field Work',
  },
  {
    src: COMPANY_IMAGES.residentialInspection,
    title: 'Residential Diagnostic Inspection',
    type: 'Official Field Work',
  },
  {
    src: COMPANY_IMAGES.fieldTeamAndCertificates,
    title: 'Field Team & Certified Warranties',
    type: 'Official Field Work',
  },
];

export default function HeroSection({ onOpenBooking, onOpenVideo }: HeroSectionProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const { t, company, isRTL, locale } = useLanguage();

  const heroImages = locale === 'en' ? HERO_IMAGES_EN : HERO_IMAGES_AR;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const currentHeroImg = heroImages[currentImgIndex];

  return (
    <section
      className={`relative bg-[#033F2D] text-white pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      {/* Decorative corner background elements */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C7F268]/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#C7F268]/10 rounded-full blur-2xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7F268]/15 border border-[#C7F268]/30 text-[#C7F268] text-xs sm:text-sm font-bold tracking-wider"
            >
              <Leaf className="w-4 h-4 text-[#C7F268]" />
              <span>{t.heroTopBadge}</span>
            </motion.div>

            {/* Main H1 Headline with Text Reveal */}
            <div className="overflow-hidden">
              <TextReveal
                as="h1"
                text={t.heroHeadline}
                highlightWords={t.heroHighlightWords}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-[1.3] tracking-tight"
                delay={0.15}
              />
            </div>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
            >
              {t.heroDesc}
            </motion.p>

            {/* Value Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-white/90 font-medium pt-1"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C7F268] shrink-0" />
                <span>{t.heroBullet1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C7F268] shrink-0" />
                <span>{t.heroBullet2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C7F268] shrink-0" />
                <span>{t.heroBullet3}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C7F268] shrink-0" />
                <span>{t.heroBullet4}</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="pt-3 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              {/* Primary CTA */}
              <button
                onClick={onOpenBooking}
                className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] py-3.5 px-7 sm:py-4 sm:px-8 text-sm sm:text-base rounded-xl shadow-lg shadow-[#C7F268]/20 cursor-pointer font-bold inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{t.heroCtaOrder}</span>
                {isRTL ? <ArrowLeft className="w-5 h-5 mr-1" /> : <ArrowRight className="w-5 h-5 ml-1" />}
              </button>

              {/* Secondary CTA: WhatsApp */}
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 sm:py-4 sm:px-7 rounded-xl text-sm sm:text-base shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.heroCtaWhatsapp}</span>
              </a>

              {/* Video CTA */}
              {onOpenVideo && (
                <button
                  onClick={onOpenVideo}
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 sm:py-4 sm:px-7 rounded-xl text-sm sm:text-base border border-white/20 transition-all hover:border-[#C7F268] cursor-pointer group"
                >
                  <span className="w-6 h-6 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </span>
                  <span>{t.heroCtaVideo}</span>
                </button>
              )}
            </motion.div>

            {/* Quick Contact Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#C7F268]/20 flex items-center justify-center text-[#C7F268]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-white/60">{t.heroDirectLine}</span>
                  <a
                    href={company.phonePrimaryRaw}
                    dir="ltr"
                    className="font-black text-white hover:text-[#C7F268] text-base"
                  >
                    {company.phonePrimary}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#C7F268]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-white/60">{t.heroSecondaryLine}</span>
                  <a
                    href={company.phoneSecondaryRaw}
                    dir="ltr"
                    className="font-bold text-white/90 hover:text-[#C7F268]"
                  >
                    {company.phoneSecondary}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Image (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md lg:max-w-none aspect-[4/5] flex items-center justify-center"
            >
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-[#C7F268]/20 to-transparent border border-white/10 rotate-2" />

              {/* Main Displayed Image with Animation */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-emerald-950">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroImg.src}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="relative w-full h-full will-change-transform transform-gpu"
                  >
                    <Image
                      src={currentHeroImg.src}
                      alt={currentHeroImg.title}
                      fill
                      priority
                      className="object-cover z-10 hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Slider controls overlay */}
                <div
                  className={`absolute top-4 ${
                    isRTL ? 'left-4' : 'right-4'
                  } z-20 flex items-center gap-2`}
                >
                  <button
                    onClick={prevImage}
                    className="w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={nextImage}
                    className="w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Top Badge on image */}
                <div
                  className={`absolute top-4 ${
                    isRTL ? 'right-4' : 'left-4'
                  } z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C7F268] text-xs font-bold border border-white/20`}
                >
                  {currentHeroImg.type}
                </div>
              </div>

              {/* Floating Feature Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute bottom-4 ${
                  isRTL ? 'right-2 sm:-right-4 text-right' : 'left-2 sm:-left-4 text-left'
                } z-20 bg-white text-[#033F2D] p-3.5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3 max-w-[280px]`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#033F2D] text-[#C7F268] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#484C44] block">
                    {currentHeroImg.title}
                  </span>
                  <p className="text-xs font-black text-[#033F2D]">{t.heroVerifiedBadgeDesc}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Thumbnail Navigation Row */}
            <div className="flex items-center justify-center gap-2 mt-4 z-20">
              {heroImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentImgIndex === idx
                      ? 'border-[#C7F268] scale-110 shadow-lg'
                      : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt={img.title} fill className="object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
