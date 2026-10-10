'use client';

import { useEffect, useRef, useState } from 'react';

export default function MagicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        }
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('.clickable') ||
        target?.closest('input') ||
        target?.closest('select')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform hidden md:block"
    >
      <div
        className={`rounded-full transition-all duration-200 border ${
          isHovered
            ? 'w-10 h-10 bg-[#C7F268]/20 border-[#C7F268] scale-125'
            : 'w-5 h-5 bg-[#C7F268]/40 border-[#033F2D]/50'
        }`}
      />
    </div>
  );
}
