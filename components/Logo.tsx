import React from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export default function Logo({
  variant = 'light',
  className = '',
  showText = true,
}: LogoProps) {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Emblem / Logo Photo */}
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#C7F268]/50 bg-[#033F2D]">
        <Image
          src="https://res.cloudinary.com/uo5au5jj/image/upload/v1791594638/WhatsApp_Image_2026-09-23_at_1.14.29_AM.jpg"
          alt="المركز الفني المتخصص"
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-right">
          <span
            className={`font-black tracking-tight leading-tight text-xs xs:text-sm sm:text-base ${
              isLight ? 'text-white' : 'text-[#033F2D]'
            }`}
          >
            المركز الفني المتخصص
          </span>
          <span
            className={`hidden sm:block text-[10px] sm:text-xs font-bold leading-tight ${
              isLight ? 'text-[#C7F268]' : 'text-[#059669]'
            }`}
          >
            لمكافحة الحشرات والقوارض
          </span>
        </div>
      )}
    </div>
  );
}
