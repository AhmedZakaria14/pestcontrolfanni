'use client';

import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface LanguageSwitcherProps {
  variant?: 'pill' | 'compact' | 'header' | 'drawer' | 'floating';
  className?: string;
}

export default function LanguageSwitcher({
  variant = 'header',
  className = '',
}: LanguageSwitcherProps) {
  const { locale, toggleLocale, setLocale, isRTL } = useLanguage();

  if (variant === 'floating') {
    return (
      <div
        className={`fixed z-40 bottom-6 ${
          isRTL ? 'left-6' : 'right-6'
        } transition-all duration-300 ${className}`}
      >
        <button
          onClick={toggleLocale}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#033F2D] text-white border-2 border-[#C7F268] hover:bg-[#022c20] hover:scale-105 active:scale-95 transition-all shadow-xl font-black text-xs cursor-pointer group"
          aria-label={locale === 'ar' ? 'Switch site to English (LTR)' : 'تحويل الموقع للعربية (RTL)'}
          title={locale === 'ar' ? 'Switch to English' : 'تحويل إلى العربية'}
        >
          <Globe className="w-4 h-4 text-[#C7F268] group-hover:rotate-45 transition-transform" />
          <span className="tracking-wide">
            {locale === 'ar' ? 'English (LTR)' : 'عربي (RTL)'}
          </span>
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLocale}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
          locale === 'ar'
            ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            : 'bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] border-transparent'
        } ${className}`}
        aria-label={locale === 'ar' ? 'Switch to English (LTR)' : 'التحويل للعربية (RTL)'}
        title={locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="tracking-wide uppercase">{locale === 'ar' ? 'English' : 'عربي'}</span>
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className={`p-4 bg-gray-50 rounded-2xl border border-gray-200 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <Globe className="w-4 h-4 text-[#033F2D]" />
            <span>{locale === 'ar' ? 'لغة الموقع / Language' : 'Site Language / اللغة'}</span>
          </div>
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            {locale === 'ar' ? 'RTL عربي' : 'LTR English'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setLocale('ar')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              locale === 'ar'
                ? 'bg-[#033F2D] text-white border-[#033F2D] shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <span>العربية (RTL)</span>
            {locale === 'ar' && <Check className="w-3.5 h-3.5 text-[#C7F268]" />}
          </button>
          <button
            onClick={() => setLocale('en')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              locale === 'en'
                ? 'bg-[#033F2D] text-white border-[#033F2D] shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <span>English (LTR)</span>
            {locale === 'en' && <Check className="w-3.5 h-3.5 text-[#C7F268]" />}
          </button>
        </div>
      </div>
    );
  }

  // Default 'header' or 'pill'
  return (
    <div
      className={`relative inline-flex items-center p-0.5 rounded-xl bg-black/25 backdrop-blur-md border border-white/15 select-none ${className}`}
      dir="ltr"
    >
      <button
        onClick={() => setLocale('ar')}
        className={`flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
          locale === 'ar'
            ? 'bg-[#C7F268] text-[#033F2D] shadow-sm'
            : 'text-white/80 hover:text-white'
        }`}
        aria-pressed={locale === 'ar'}
        aria-label="التبديل إلى العربية"
      >
        <span className="text-xs">عربي</span>
      </button>

      <button
        onClick={() => setLocale('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
          locale === 'en'
            ? 'bg-[#C7F268] text-[#033F2D] shadow-sm'
            : 'text-white/80 hover:text-white'
        }`}
        aria-pressed={locale === 'en'}
        aria-label="Switch to English"
      >
        <Globe className="w-3 h-3" />
        <span className="text-xs">EN</span>
      </button>
    </div>
  );
}
