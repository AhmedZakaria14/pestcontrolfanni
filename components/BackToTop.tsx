'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="الرجوع لأعلى الصفحة"
      className="fixed bottom-7 left-7 z-[999] w-12 h-12 rounded-full bg-[#033F2D] text-[#C7F268] border-2 border-[#C7F268] shadow-xl flex items-center justify-center hover:bg-[#C7F268] hover:text-[#033F2D] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
