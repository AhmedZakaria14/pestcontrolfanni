'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Phone, Clock, MapPin, ChevronDown, ChevronLeft, ArrowLeft, MessageCircle } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/siteData';
import { company } from '@/lib/company';
import Logo from '@/components/Logo';

interface OffcanvasDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export default function OffcanvasDrawer({
  isOpen,
  onClose,
  onOpenBooking,
}: OffcanvasDrawerProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-start bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#022A1E] text-white h-full overflow-y-auto shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-left duration-300 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside drawer */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link href="/" onClick={onClose} className="inline-block" aria-label={company.name}>
              <Logo variant="light" />
            </Link>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C7F268] hover:text-[#033F2D] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="إغلاق القائمة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* About teaser */}
          <div className="mt-5 text-white/80 text-xs sm:text-sm leading-relaxed">
            <p>
              {company.description}
            </p>
          </div>

          {/* Mobile Navigation List */}
          <nav className="mt-6 space-y-2 border-t border-b border-white/10 py-5">
            <Link
              href="/"
              onClick={onClose}
              className="block py-2 text-base font-bold hover:text-[#C7F268] transition-colors"
            >
              الرئيسية
            </Link>

            <Link
              href="/about-us"
              onClick={onClose}
              className="block py-2 text-base font-bold hover:text-[#C7F268] transition-colors"
            >
              عن المركز
            </Link>

            {/* Services item */}
            <div>
              <button
                onClick={() => toggleSubmenu('services')}
                className="w-full flex items-center justify-between py-2 text-base font-bold hover:text-[#C7F268] transition-colors cursor-pointer"
              >
                <span>خدمات المكافحة</span>
                {openSubmenu === 'services' ? (
                  <ChevronDown className="w-4 h-4 text-[#C7F268]" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-white/50" />
                )}
              </button>
              {openSubmenu === 'services' && (
                <div className="pr-4 pb-2 space-y-2 text-sm text-white/70">
                  <Link
                    href="/services"
                    onClick={onClose}
                    className="block font-bold text-[#C7F268] hover:underline"
                  >
                    عرض كل الخدمات
                  </Link>
                  {SERVICES_DATA.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      onClick={onClose}
                      className="block hover:text-[#C7F268]"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pest Identifier item */}
            <Link
              href="/pest-identifier"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base font-bold text-[#C7F268] hover:text-white transition-colors"
            >
              <span>أداة تشخيص الحشرات</span>
              <span className="px-2 py-0.5 rounded-full bg-[#C7F268] text-[#033F2D] text-[10px] font-black">
                أداة ذكية
              </span>
            </Link>

            {/* Electronic Warranty Verification item */}
            <Link
              href="/warranty-verification"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-base font-bold text-[#C7F268] hover:text-white transition-colors"
            >
              <span>التحقق من الضمان الإلكتروني</span>
              <span className="px-2 py-0.5 rounded-full bg-[#C7F268] text-[#033F2D] text-[10px] font-black">
                معتمد
              </span>
            </Link>

            <Link
              href="/projects"
              onClick={onClose}
              className="block py-2 text-base font-bold hover:text-[#C7F268] transition-colors"
            >
              أعمال ميدانية
            </Link>

            <Link
              href="/faqs"
              onClick={onClose}
              className="block py-2 text-base font-bold hover:text-[#C7F268] transition-colors"
            >
              الأسئلة الشائعة
            </Link>

            <Link
              href="/blog"
              onClick={onClose}
              className="block py-2 text-base font-bold hover:text-[#C7F268] transition-colors"
            >
              إرشادات تهمك
            </Link>

            <Link
              href="/contact-us"
              onClick={onClose}
              className="block py-2 text-base font-bold hover:text-[#C7F268] transition-colors"
            >
              تواصل معنا
            </Link>
          </nav>

          {/* Quick Contact Info */}
          <div className="mt-5 space-y-3 text-xs text-white/80">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#C7F268] shrink-0" />
              <a href={company.phonePrimaryRaw} dir="ltr" className="hover:text-[#C7F268] font-bold">
                {company.phonePrimary}
              </a>
              <span className="text-white/40">|</span>
              <a href={company.phoneSecondaryRaw} dir="ltr" className="hover:text-[#C7F268]">
                {company.phoneSecondary}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="hover:text-[#25D366] font-bold text-[#25D366]"
              >
                واتساب: {company.whatsapp}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C7F268] shrink-0 mt-0.5" />
              <span>{company.coverage}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#C7F268] shrink-0" />
              <span>{company.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
          <a
            href={company.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تواصل عبر واتساب الآن</span>
          </a>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full btn-default py-3 text-center justify-center font-bold text-sm"
          >
            <span>طلب معاينة وخدمة مكافحة</span>
            <ArrowLeft className="w-4 h-4 mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
