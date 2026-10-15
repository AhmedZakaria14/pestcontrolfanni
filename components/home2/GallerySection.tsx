'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ZoomIn, ArrowLeft, ArrowRight, X, Sparkles, Play, Share2 } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { GalleryItem } from '@/lib/siteData';
import { useLanguage } from '@/lib/i18n';

interface GallerySectionProps {
  onOpenVideo?: () => void;
}

export default function GallerySection({ onOpenVideo }: GallerySectionProps) {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const { t, siteData, isRTL, locale } = useLanguage();

  const homepageGallery = siteData.gallery.slice(6, 12);

  return (
    <section
      className={`py-20 lg:py-28 bg-[#F6F8F5] overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-2 bg-[#033F2D]/10 text-[#033F2D] px-4 py-1.5 rounded-full text-xs font-bold">
                <Sparkles className="w-4 h-4 text-[#059669]" />
                <span>{t.gallerySubtitle}</span>
              </div>
            </ScrollReveal>

            <TextReveal
              as="h2"
              text={t.galleryHeadline}
              highlightWords={t.galleryHighlightWords}
              highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
            />

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-[#484C44] text-base leading-relaxed">
                {t.galleryDesc}
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction={isRTL ? 'left' : 'right'}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/video-gallery"
                className="inline-flex items-center gap-2 bg-[#033F2D] text-[#C7F268] font-bold py-3.5 px-6 rounded-xl text-sm shadow-md hover:bg-[#022A1E] transition-colors"
              >
                <Play className="w-4 h-4 fill-current mr-0.5" />
                <span>{t.galleryFullVideos}</span>
              </Link>
              <Link
                href="/image-gallery"
                className="btn-default py-3.5 px-6 text-sm font-bold inline-flex items-center gap-2 shrink-0"
              >
                <span>{t.galleryViewAll}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Facebook Reel Featured Banner */}
        <div className="bg-[#033F2D] rounded-3xl p-6 sm:p-8 text-white border border-[#C7F268]/30 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7F268]/20 text-[#C7F268] text-xs font-bold border border-[#C7F268]/30">
              <Share2 className="w-3.5 h-3.5" />
              <span>
                {locale === 'en'
                  ? 'Official Video via Facebook Reel'
                  : 'فيديو موثق عبر فيسبوك (Facebook Reel)'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {locale === 'en'
                ? 'Live Field Coverage of Extermination & Treatment'
                : 'تغطية ميدانية مباشرة لعمليات رش وإبادة الحشرات'}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              {locale === 'en'
                ? 'Watch how our certified team executes targeted pest extermination with maximum safety and verified formulations.'
                : 'شاهد كيف ينفذ مهندسونا خطط الرش والتحصين المباشر بأعلى درجات الأمان باستخدام المعدات والتركيبات المعتمدة.'}
            </p>
          </div>
          <div className={`md:col-span-4 flex items-center ${isRTL ? 'md:justify-end' : 'md:justify-end'}`}>
            <button
              onClick={() => {
                if (onOpenVideo) onOpenVideo();
                else window.open('https://www.facebook.com/share/r/1ESucCbJEJ/', '_blank');
              }}
              className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] py-3.5 px-6 text-sm font-bold rounded-xl inline-flex items-center gap-2.5 shadow-lg shadow-[#C7F268]/20 cursor-pointer w-full sm:w-auto justify-center transition-transform hover:scale-[1.02]"
            >
              <span className="w-7 h-7 rounded-full bg-[#033F2D] text-[#C7F268] flex items-center justify-center">
                <Play className="w-4 h-4 fill-current mr-0.5" />
              </span>
              <span>{t.galleryWatchLiveVideo}</span>
            </button>
          </div>
        </div>

        {/* Well-proportioned Harmonious Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homepageGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setLightboxItem(item)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-white border border-gray-100"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-[#033F2D]/90 via-[#033F2D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                <span className="text-xs uppercase font-bold text-[#C7F268] mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold leading-snug">{item.title}</h3>
                <div
                  className={`absolute top-6 ${
                    isRTL ? 'left-6' : 'right-6'
                  } w-10 h-10 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center shadow-md`}
                >
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className={`absolute top-4 ${
                isRTL ? 'left-4' : 'right-4'
              } z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer`}
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={lightboxItem.image}
                alt={lightboxItem.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div
              className={`p-6 bg-[#033F2D] text-white flex items-center justify-between ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-[#C7F268] uppercase">
                  {lightboxItem.category}
                </span>
                <h3 className="text-lg font-bold">{lightboxItem.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
