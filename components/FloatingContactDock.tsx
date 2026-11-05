'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  PhoneCall,
  Instagram,
  ChevronDown,
  X,
  Phone,
  Copy,
  Check,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { COMPANY_IMAGES } from '@/lib/media';

// Official WhatsApp Vector Logo
function OfficialWhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.14 12.39 9.74 14.88 12.19 15.93C12.77 16.18 13.23 16.33 13.58 16.44C14.17 16.63 14.71 16.6 15.14 16.54C15.62 16.47 16.61 15.94 16.82 15.36C17.02 14.77 17.02 14.27 16.96 14.17C16.9 14.07 16.74 14.01 16.5 13.89C16.26 13.77 15.08 13.19 14.86 13.11C14.64 13.03 14.48 12.99 14.32 13.23C14.16 13.47 13.7 14.01 13.56 14.17C13.42 14.33 13.28 14.35 13.04 14.23C12.8 14.11 11.79 13.78 10.59 12.71C9.66 11.88 9.03 10.85 8.91 10.65C8.79 10.45 8.9 10.34 9.02 10.22C9.13 10.11 9.26 9.94 9.38 9.8C9.5 9.66 9.54 9.56 9.62 9.4C9.7 9.24 9.66 9.1 9.6 8.98C9.54 8.86 9.08 7.73 8.89 7.27C8.7 6.82 8.51 6.88 8.37 6.87C8.24 6.86 8.08 6.86 7.92 6.86L8.53 7.33Z" />
    </svg>
  );
}

export default function FloatingContactDock() {
  // Collapsed by default as requested
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallMenu, setShowCallMenu] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { company, isRTL, locale } = useLanguage();

  // Close call popup on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest('#contact-dock-call-wrapper')) {
        setShowCallMenu(false);
      }
    };
    if (showCallMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCallMenu]);

  const copyPhoneNumber = (phone: string, index: number) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  const whatsappMessage =
    locale === 'en'
      ? encodeURIComponent(
          'Hello Specialized Technical Center, I would like to book a pest & rodent control appointment or inquire about available services.'
        )
      : encodeURIComponent(
          'مرحباً بالمركز الفني المتخصص، أود حجز موعد خدمة مكافحة أو الاستفسار عن الخدمات المتاحة.'
        );

  const instagramUrl = 'https://www.instagram.com/pestcontrol_egypt';

  return (
    <aside
      aria-label={locale === 'en' ? 'Quick Contact Bar' : 'شريط التواصل السريع'}
      className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-[995] select-none pointer-events-auto"
    >
      <div className="relative flex flex-col items-start">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            /* الوضع الموسّع: يسار الشاشة - بدون ماسنجر - باللوجو الحقيقي للواتساب */
            <motion.div
              key="expanded-dock-left"
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="relative flex flex-col items-center gap-2 p-2 rounded-3xl backdrop-blur-xl bg-white/95 dark:bg-[#022A1E]/95 border border-[#033F2D]/15 dark:border-[#C7F268]/25 shadow-[0_12px_36px_rgba(2,42,30,0.25)]"
            >
              {/* اللوجو في أعلى القائمة المصغرة */}
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem('logo')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  setIsExpanded(false);
                  setShowCallMenu(false);
                }}
                title={locale === 'en' ? 'Click to minimize' : 'اضغط لتصغير القائمة'}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#033F2D] via-[#055c42] to-[#C7F268] shadow-sm hover:scale-105 transition-transform flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center relative">
                    <Image
                      src={COMPANY_IMAGES.logo}
                      alt={company.name}
                      width={38}
                      height={38}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                {/* نقطة التواجد المباشر */}
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366] border-2 border-white" />
                </span>

                {/* تلميح الشعار */}
                {hoveredItem === 'logo' && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ms-3 whitespace-nowrap px-2.5 py-1 rounded-xl bg-[#033F2D] text-white text-[11px] font-bold shadow-xl border border-[#C7F268]/30 pointer-events-none flex items-center gap-1.5 z-50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span>{locale === 'en' ? 'Online • Click to minimize' : 'متاح 24/7 • اضغط للتصغير'}</span>
                  </motion.div>
                )}
              </div>

              {/* 1. الاتصال الهاتفي المباشر */}
              <div
                id="contact-dock-call-wrapper"
                className="relative"
                onMouseEnter={() => setHoveredItem('call')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  type="button"
                  onClick={() => setShowCallMenu(!showCallMenu)}
                  aria-expanded={showCallMenu}
                  aria-label={locale === 'en' ? 'Call Us' : 'اتصل بنا'}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#10b981] via-[#059669] to-[#047857] text-white flex items-center justify-center shadow-md shadow-emerald-500/25 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group"
                >
                  <PhoneCall className="w-4 h-4 stroke-[2.2] group-hover:rotate-12 transition-transform" />
                </button>

                {hoveredItem === 'call' && !showCallMenu && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ms-3 whitespace-nowrap px-2.5 py-1 rounded-xl bg-[#022A1E] text-white text-[11px] font-bold shadow-xl border border-emerald-400/30 pointer-events-none flex items-center gap-1.5 z-50"
                  >
                    <span>{locale === 'en' ? 'Call Directly' : 'اتصال هاتفي مباشر'}</span>
                    <span className="text-[#C7F268]" dir="ltr">
                      {company.phonePrimary}
                    </span>
                  </motion.div>
                )}

                {/* نافذة اختيار خطوط الهاتف */}
                <AnimatePresence>
                  {showCallMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-full bottom-0 ms-3 w-60 p-3 rounded-2xl bg-[#022A1E] text-white shadow-2xl border border-emerald-400/30 z-[1000] text-start"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
                        <span className="font-bold text-[#C7F268] flex items-center gap-1.5 text-[11px]">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{locale === 'en' ? 'Direct Phone Lines' : 'خطوط الاتصال المباشر'}</span>
                        </span>
                        <button
                          onClick={() => setShowCallMenu(false)}
                          className="w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {/* الخط الأول */}
                        <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                          <div>
                            <span className="text-[10px] text-[#C7F268] block font-bold">
                              {locale === 'en' ? 'Line 1 (Primary)' : 'الخط الرئيسي الأول'}
                            </span>
                            <a
                              href={company.phonePrimaryRaw}
                              className="text-xs font-black text-white hover:text-[#C7F268] transition-colors"
                              dir="ltr"
                            >
                              {company.phonePrimary}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => copyPhoneNumber(company.phonePrimary, 1)}
                              title={locale === 'en' ? 'Copy' : 'نسخ'}
                              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs transition-colors"
                            >
                              {copiedIndex === 1 ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                            <a
                              href={company.phonePrimaryRaw}
                              className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                              title={locale === 'en' ? 'Call now' : 'اتصال الآن'}
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                        {/* الخط الثاني */}
                        <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                          <div>
                            <span className="text-[10px] text-white/60 block font-bold">
                              {locale === 'en' ? 'Line 2 (Secondary)' : 'الخط البديل الثاني'}
                            </span>
                            <a
                              href={company.phoneSecondaryRaw}
                              className="text-xs font-black text-white hover:text-[#C7F268] transition-colors"
                              dir="ltr"
                            >
                              {company.phoneSecondary}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => copyPhoneNumber(company.phoneSecondary, 2)}
                              title={locale === 'en' ? 'Copy' : 'نسخ'}
                              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs transition-colors"
                            >
                              {copiedIndex === 2 ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                            <a
                              href={company.phoneSecondaryRaw}
                              className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                              title={locale === 'en' ? 'Call now' : 'اتصال الآن'}
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. الواتساب باللوجو الحقيقي والمعتمد */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredItem('whatsapp')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={`${company.whatsappUrl}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={locale === 'en' ? 'Chat on WhatsApp' : 'محادثة عبر واتساب'}
                  className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-md shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-200 group"
                >
                  <OfficialWhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                {hoveredItem === 'whatsapp' && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ms-3 whitespace-nowrap px-2.5 py-1 rounded-xl bg-[#022A1E] text-white text-[11px] font-bold shadow-xl border border-[#25D366]/40 pointer-events-none flex items-center gap-1.5 z-50"
                  >
                    <span>{locale === 'en' ? 'Official WhatsApp' : 'محادثة واتساب الرسمية'}</span>
                    <span className="text-[#25D366]" dir="ltr">
                      {company.whatsapp}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* 3. إنستغرام */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredItem('instagram')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={locale === 'en' ? 'Instagram Profile' : 'حساب إنستغرام'}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] hover:brightness-110 text-white flex items-center justify-center shadow-md shadow-rose-500/25 hover:scale-110 active:scale-95 transition-all duration-200 group"
                >
                  <Instagram className="w-4 h-4 stroke-[2.2] group-hover:scale-110 transition-transform" />
                </a>

                {hoveredItem === 'instagram' && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ms-3 whitespace-nowrap px-2.5 py-1 rounded-xl bg-[#022A1E] text-white text-[11px] font-bold shadow-xl border border-rose-400/40 pointer-events-none flex items-center gap-1.5 z-50"
                  >
                    <span>{locale === 'en' ? 'Instagram' : 'إنستغرام'}</span>
                  </motion.div>
                )}
              </div>

              {/* زر التصغير */}
              <div
                className="relative pt-1 border-t border-slate-200/60 dark:border-white/10"
                onMouseEnter={() => setHoveredItem('toggle')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setShowCallMenu(false);
                  }}
                  aria-label={locale === 'en' ? 'Collapse contact bar' : 'تصغير شريط التواصل'}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#C7F268] text-slate-600 hover:text-[#033F2D] dark:bg-white/10 dark:text-white dark:hover:bg-[#C7F268] dark:hover:text-[#033F2D] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:scale-110 active:scale-95"
                >
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                {hoveredItem === 'toggle' && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ms-3 whitespace-nowrap px-2 py-0.5 rounded-lg bg-black/80 text-white text-[10px] font-semibold shadow-lg pointer-events-none z-50"
                  >
                    <span>{locale === 'en' ? 'Minimize' : 'تصغير'}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            /* الوضع الافتراضي المصغّر: كبسولة مدمجة على يسار الشاشة قابلة للنقر للتكبير */
            <motion.div
              key="collapsed-dock-left"
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                aria-label={locale === 'en' ? 'Open contact menu' : 'فتح قائمة التواصل'}
                className="group relative flex items-center gap-2.5 px-3 py-2 rounded-full backdrop-blur-xl bg-[#033F2D]/95 hover:bg-[#022A1E] text-white border-2 border-[#C7F268] shadow-[0_8px_24px_rgba(3,63,45,0.3)] hover:shadow-[0_10px_28px_rgba(199,242,104,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {/* شعار المركز في دائرة مصغرة مع نقطة التواجد */}
                <div className="relative w-7 h-7 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#C7F268] to-emerald-400 shadow-xs shrink-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <Image
                      src={COMPANY_IMAGES.logo}
                      alt={company.name}
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
                  </span>
                </div>

                {/* نص "تواصل معنا" */}
                <span className="text-xs font-black text-[#C7F268] tracking-wide whitespace-nowrap">
                  {locale === 'en' ? 'Contact Us' : 'تواصل معنا'}
                </span>

                {/* لوجو الواتساب الحقيقي المصغر داخل الكبسولة */}
                <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                  <OfficialWhatsAppIcon className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* توهج خفيف أنيق في الخلفية */}
              <div className="absolute inset-0 -z-10 rounded-full bg-[#C7F268]/20 blur-md pointer-events-none animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
