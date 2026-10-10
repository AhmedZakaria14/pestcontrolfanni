'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { FAQS_DATA } from '@/lib/siteData';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { company } from '@/lib/company';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8F5] relative overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Visual Card with Image & Contact Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left" duration={0.8}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] group">
                <Image
                  src="/assets/company/img7_1_19_22.jpg"
                  alt="الأسئلة الشائعة وإرشادات المكافحة"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Contact Box */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-6 left-6 right-6 bg-[#033F2D] text-white p-5 rounded-2xl shadow-2xl border border-white/10 space-y-2.5 text-right"
                >
                  <span className="text-xs font-bold text-[#C7F268] block">هل لديك استفسار محدد؟</span>
                  <p className="text-sm font-black text-white leading-snug">
                    تواصل مباشرة مع المهندس الفني للحصول على إجابة وافية لحالتك.
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={company.phonePrimaryRaw}
                      className="inline-flex items-center gap-1.5 bg-[#C7F268] text-[#033F2D] px-3 py-1.5 rounded-lg text-xs font-bold"
                      dir="ltr"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{company.phonePrimary}</span>
                    </a>
                    <a
                      href={company.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>واتساب</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} duration={0.6} className="pt-2">
              <Link href="/faqs" className="btn-default py-3 px-6 text-sm">
                <span>عرض كافة الأسئلة</span>
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle">
                <span>الأسئلة الشائعة وإجاباتها</span>
              </div>
            </ScrollReveal>

            <div>
              <TextReveal
                as="h2"
                text="إجابات واضحة وموثوقة حول خدمات المكافحة والسلامة"
                highlightWords={['واضحة', 'وموثوقة']}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>

            {/* Accordion Items */}
            <div className="space-y-4 pt-4">
              {FAQS_DATA.slice(0, 5).map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <ScrollReveal key={faq.id} direction="up" delay={idx * 0.08} duration={0.5}>
                    <div
                      className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-200 shadow-sm"
                    >
                      <button
                        onClick={() => toggle(idx)}
                        className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#033F2D] hover:text-[#022a1e] transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-[#033F2D] text-[#C7F268]'
                              : 'bg-[#F6F8F5] text-[#033F2D]'
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <Plus className="w-4 h-4 stroke-[3]" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-6 sm:px-6 text-sm text-[#484C44] leading-relaxed border-t border-gray-100 pt-3">
                              <p>{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
