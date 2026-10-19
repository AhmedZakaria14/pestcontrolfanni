'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  PhoneCall,
  MessageCircle,
  MessageSquare,
  Instagram,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  X,
  Phone,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { COMPANY_IMAGES } from '@/lib/media';

export default function FloatingContactDock() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showCallMenu, setShowCallMenu] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { t, company, isRTL, locale } = useLanguage();

  // Close call menu when clicking outside
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
          'Hello Specialized Technical Center, I would like to inquire about pest & rodent control services or request an inspection.'
        )
      : encodeURIComponent(
          'مرحباً بالمركز الفني المتخصص، أود طلب معاينة أو استفسار عن خدمات مكافحة الحشرات والقوارض.'
        );

  const messengerUrl = 'https://m.me/SpecializedPestControlEgypt';
  const instagramUrl = 'https://www.instagram.com/pestcontrol_egypt';

  return (
    <aside
      aria-label={locale === 'en' ? 'Quick Contact Bar' : 'شريط التواصل السريع'}
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-[990] select-none"
    >
      <div className="relative flex items-center">
        {/* The Main Expandable Dock Container */}
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded-dock"
              initial={{ opacity: 0, scale: 0.85, x: 25 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 25 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="relative flex flex-col items-center gap-2.5 p-2 rounded-full backdrop-blur-xl bg-white/90 dark:bg-[#022A1E]/95 border border-white/60 dark:border-[#C7F268]/20 shadow-[0_16px_45px_rgba(2,42,30,0.22)]"
            >
              {/* Top Item: Company Logo & Online Pulse */}
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem('logo')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setIsExpanded(false)}
                title={locale === 'en' ? 'Click to minimize' : 'اضغط لتصغير القائمة'}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#033F2D] via-[#055c42] to-[#C7F268] shadow-md hover:scale-105 transition-transform flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center relative">
                    <Image
                      src={COMPANY_IMAGES.logo}
                      alt={company.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                {/* Active Pulse Dot (Online 24/7) */}
                <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border-2 border-white" />
                </span>

                {/* Logo Tooltip */}
                {hoveredItem === 'logo' && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 me-3 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#033F2D] text-white text-xs font-bold shadow-xl border border-[#C7F268]/30 pointer-events-none flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span>{locale === 'en' ? 'Online 24/7 • Click to collapse' : 'متاح 24/7 • اضغط للتصغير'}</span>
                  </motion.div>
                )}
              </div>

              {/* Item 1: Direct Phone Call */}
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
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#10b981] via-[#059669] to-[#047857] text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group"
                >
                  <PhoneCall className="w-5 h-5 stroke-[2.2] group-hover:rotate-12 transition-transform" />
                </button>

                {/* Call Tooltip */}
                {hoveredItem === 'call' && !showCallMenu && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 me-3 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#022A1E] text-white text-xs font-bold shadow-xl border border-emerald-400/30 pointer-events-none flex items-center gap-2"
                  >
                    <span>{locale === 'en' ? 'Direct Phone Call' : 'اتصال هاتفي مباشر'}</span>
                    <span className="text-[#C7F268]" dir="ltr">
                      {company.phonePrimary}
                    </span>
                  </motion.div>
                )}

                {/* Interactive Phone Numbers Popover */}
                <AnimatePresence>
                  {showCallMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-full top-1/2 -translate-y-1/2 me-3 w-64 p-3 rounded-2xl bg-[#022A1E] text-white shadow-2xl border border-emerald-400/30 z-[1000] text-start"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
                        <span className="font-bold text-[#C7F268] flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{locale === 'en' ? 'Direct Phone Lines' : 'خطوط الاتصال المباشر'}</span>
                        </span>
                        <button
                          onClick={() => setShowCallMenu(false)}
                          className="w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        {/* Primary Phone */}
                        <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                          <div>
                            <span className="text-[10px] text-[#C7F268] block font-bold">
                              {locale === 'en' ? 'Line 1 (Primary)' : 'الخط الرئيسي الأول'}
                            </span>
                            <a
                              href={company.phonePrimaryRaw}
                              className="text-sm font-extrabold text-white hover:text-[#C7F268] transition-colors"
                              dir="ltr"
                            >
                              {company.phonePrimary}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => copyPhoneNumber(company.phonePrimary, 1)}
                              title={locale === 'en' ? 'Copy' : 'نسخ'}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs transition-colors"
                            >
                              {copiedIndex === 1 ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <a
                              href={company.phonePrimaryRaw}
                              className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                              title={locale === 'en' ? 'Call now' : 'اتصال الآن'}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>

                        {/* Secondary Phone */}
                        <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                          <div>
                            <span className="text-[10px] text-white/60 block font-bold">
                              {locale === 'en' ? 'Line 2 (Secondary)' : 'الخط البديل الثاني'}
                            </span>
                            <a
                              href={company.phoneSecondaryRaw}
                              className="text-sm font-extrabold text-white hover:text-[#C7F268] transition-colors"
                              dir="ltr"
                            >
                              {company.phoneSecondary}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => copyPhoneNumber(company.phoneSecondary, 2)}
                              title={locale === 'en' ? 'Copy' : 'نسخ'}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs transition-colors"
                            >
                              {copiedIndex === 2 ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <a
                              href={company.phoneSecondaryRaw}
                              className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                              title={locale === 'en' ? 'Call now' : 'اتصال الآن'}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Item 2: WhatsApp */}
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
                  className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-200 group"
                >
                  <MessageCircle className="w-5 h-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
                </a>

                {/* WhatsApp Tooltip */}
                {hoveredItem === 'whatsapp' && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 me-3 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#022A1E] text-white text-xs font-bold shadow-xl border border-[#25D366]/40 pointer-events-none flex items-center gap-2"
                  >
                    <span>{locale === 'en' ? 'Instant WhatsApp Chat' : 'محادثة فورية على واتساب'}</span>
                    <span className="text-[#25D366]" dir="ltr">
                      {company.whatsapp}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Item 3: Messenger */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredItem('messenger')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={locale === 'en' ? 'Facebook Messenger' : 'ماسنجر فيسبوك'}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#006AFF] to-[#00C6FF] hover:brightness-110 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-200 group"
                >
                  <MessageSquare className="w-5 h-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
                </a>

                {/* Messenger Tooltip */}
                {hoveredItem === 'messenger' && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 me-3 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#022A1E] text-white text-xs font-bold shadow-xl border border-blue-400/40 pointer-events-none flex items-center gap-1.5"
                  >
                    <span>{locale === 'en' ? 'Facebook Messenger' : 'رسائل فيسبوك ماسنجر'}</span>
                  </motion.div>
                )}
              </div>

              {/* Item 4: Instagram */}
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
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] hover:brightness-110 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 hover:scale-110 active:scale-95 transition-all duration-200 group"
                >
                  <Instagram className="w-5 h-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
                </a>

                {/* Instagram Tooltip */}
                {hoveredItem === 'instagram' && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 me-3 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#022A1E] text-white text-xs font-bold shadow-xl border border-rose-400/40 pointer-events-none flex items-center gap-1.5"
                  >
                    <span>{locale === 'en' ? 'Follow on Instagram' : 'تابعنا على إنستغرام'}</span>
                  </motion.div>
                )}
              </div>

              {/* Bottom Toggle: Smooth Collapse Action */}
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
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#C7F268] text-slate-600 hover:text-[#033F2D] dark:bg-white/10 dark:text-white dark:hover:bg-[#C7F268] dark:hover:text-[#033F2D] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                {hoveredItem === 'toggle' && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 me-3 whitespace-nowrap px-2.5 py-1 rounded-lg bg-black/80 text-white text-[11px] font-semibold shadow-lg pointer-events-none"
                  >
                    <span>{locale === 'en' ? 'Minimize' : 'تصغير'}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Collapsed State: Elegant Floating Launcher Badge */
            <motion.div
              key="collapsed-dock"
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                aria-label={locale === 'en' ? 'Expand contact channels' : 'فتح قنوات التواصل'}
                className="group relative flex flex-col items-center gap-1.5 p-2 rounded-2xl backdrop-blur-xl bg-[#033F2D]/95 text-white border-2 border-[#C7F268] shadow-[0_12px_35px_rgba(3,63,45,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {/* Brand Logo in Mini Circle */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#C7F268] to-emerald-400 shadow-sm flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <Image
                      src={COMPANY_IMAGES.logo}
                      alt={company.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Pulse Dot */}
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
                  </span>
                </div>

                {/* Vertical Text Label */}
                <div className="flex flex-col items-center gap-1 py-1 text-[11px] font-black text-[#C7F268]">
                  <span className="writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
                    {locale === 'en' ? 'CONNECT' : 'تواصل معنا'}
                  </span>
                </div>

                {/* Expand Indicator Arrow */}
                <div className="w-7 h-7 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <ChevronLeft className="w-4 h-4 stroke-[3]" />
                </div>
              </button>

              {/* Floating Pulse Rings Behind Mini Launcher */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-[#C7F268]/20 blur-md pointer-events-none animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
