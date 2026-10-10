'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ZoomIn, ArrowLeft, X, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { GALLERY_ITEMS, GalleryItem } from '@/lib/siteData';

export default function GallerySection() {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Take the newly added gallery items (items 7 to 12) or a well-curated selection
  const homepageGallery = GALLERY_ITEMS.slice(6, 12);

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8F5] overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-2 bg-[#033F2D]/10 text-[#033F2D] px-4 py-1.5 rounded-full text-xs font-bold">
                <Sparkles className="w-4 h-4 text-[#059669]" />
                <span>معرض الصور الميدانية</span>
              </div>
            </ScrollReveal>

            <TextReveal
              as="h2"
              text="لقطات حصرية من أعمال المعالجة والمكافحة الميدانية"
              highlightWords={['المعالجة', 'الميدانية']}
              highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
            />

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-[#484C44] text-base leading-relaxed">
                نستعرض في هذا المعرض أحدث لقطات الفحص والمعالجة التطبيقية التي ينفذها فريقنا الفني المتخصص بكل دقة وأمان في المنازل والمنشآت.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left">
            <Link
              href="/image-gallery"
              className="btn-default py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2 shrink-0"
            >
              <span>عرض كل الصور</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </ScrollReveal>
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#033F2D]/90 via-[#033F2D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white text-right">
                <span className="text-xs uppercase font-bold text-[#C7F268] mb-1">
                  {item.category}
                </span>
                <h4 className="text-base font-bold leading-snug">{item.title}</h4>
                <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center shadow-md">
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
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 text-right"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer"
              aria-label="إغلاق المعاينة"
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
            <div className="p-6 bg-[#033F2D] text-white flex items-center justify-between text-right">
              <div>
                <span className="text-xs font-bold text-[#C7F268] uppercase">
                  {lightboxItem.category}
                </span>
                <h4 className="text-lg font-bold">{lightboxItem.title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
