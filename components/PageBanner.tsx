'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import { motion } from 'motion/react';
import { useLanguage } from '@/lib/i18n';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageBanner({ title, breadcrumbs }: PageBannerProps) {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative bg-[#033F2D] text-white py-16 sm:py-24 overflow-hidden border-b border-white/10 text-center">
      {/* Decorative background glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#C7F268]/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-[#C7F268]/10 rounded-full blur-2xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="mb-4">
          <TextReveal
            as="h1"
            text={title}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
            delay={0.1}
          />
        </div>

        {/* Breadcrumb nav */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 text-sm text-white/80 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm"
        >
          <Link href="/" className="hover:text-[#C7F268] transition-colors font-medium">
            {t.breadcrumbHome}
          </Link>
          {breadcrumbs.map((bc, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {isRTL ? (
                <ChevronLeft className="w-3.5 h-3.5 text-[#C7F268]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#C7F268]" />
              )}
              {bc.href ? (
                <Link href={bc.href} className="hover:text-[#C7F268] transition-colors font-medium">
                  {bc.label}
                </Link>
              ) : (
                <span className="text-[#C7F268] font-bold">{bc.label}</span>
              )}
            </div>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
