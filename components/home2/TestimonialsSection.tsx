'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight, Quote, ArrowLeft, ArrowRight, User } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/lib/i18n';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { t, siteData, isRTL } = useLanguage();

  const testimonials = siteData.testimonials;

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((p) => (p === testimonials.length - 1 ? 0 : p + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section
      className={`py-20 lg:py-28 bg-[#F6F8F5] relative overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle">
                <span>{t.testimonialsSubtitle}</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text={t.testimonialsHeadline}
                highlightWords={t.testimonialsHighlightWords}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>
          </div>

          <ScrollReveal direction={isRTL ? 'right' : 'left'} delay={0.2} duration={0.6}>
            <Link
              href="/testimonials"
              className="btn-default py-3.5 px-7 inline-flex items-center gap-2"
            >
              <span>{t.testimonialsViewAll}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
            </Link>
          </ScrollReveal>
        </div>

        {/* Testimonials Carousel Card */}
        <ScrollReveal direction="up" duration={0.8} distance={30}>
          <div
            className={`bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto relative overflow-hidden ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            <Quote
              className={`w-16 h-16 text-[#C7F268] absolute top-8 ${
                isRTL ? 'left-8 scale-x-[-1]' : 'right-8'
              } opacity-40 pointer-events-none`}
            />

            <div className="relative z-10 min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  {/* Rating Stars */}
                  <div className="flex text-[#033F2D]">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#033F2D]" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-lg sm:text-xl text-[#033F2D] font-medium leading-relaxed">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  {/* Author info */}
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#033F2D] text-[#C7F268] flex items-center justify-center font-bold shrink-0">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#033F2D]">{current.name}</h4>
                        <p className="text-xs text-[#484C44]">
                          {current.role} {current.location ? `• ${current.location}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Prev / Next controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={isRTL ? prev : prev}
                        className="w-10 h-10 rounded-full border border-gray-200 hover:bg-[#033F2D] hover:text-[#C7F268] hover:border-[#033F2D] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Previous review"
                      >
                        {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                      </button>
                      <span className="text-xs font-bold text-gray-400" dir="ltr">
                        {currentIndex + 1} / {testimonials.length}
                      </span>
                      <button
                        onClick={isRTL ? next : next}
                        className="w-10 h-10 rounded-full border border-gray-200 hover:bg-[#033F2D] hover:text-[#C7F268] hover:border-[#033F2D] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Next review"
                      >
                        {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
