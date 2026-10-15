'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import BookingModal from '@/components/BookingModal';
import { ArrowLeft, ArrowRight, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [bookingOpen, setBookingOpen] = useState(false);
  const { t, siteData, isRTL, locale, dir } = useLanguage();

  const categories =
    locale === 'en'
      ? [
          { key: 'All', label: 'All Projects' },
          { key: 'سكني', label: 'Residential' },
          { key: 'تجاري', label: 'Commercial' },
          { key: 'نمل أبيض', label: 'Termite' },
          { key: 'قوارض', label: 'Rodent' },
        ]
      : [
          { key: 'All', label: 'الكل' },
          { key: 'سكني', label: 'مشاريع سكنية' },
          { key: 'تجاري', label: 'منشآت تجارية' },
          { key: 'نمل أبيض', label: 'النمل الأبيض' },
          { key: 'قوارض', label: 'مكافحة القوارض' },
        ];

  const filteredProjects =
    activeCategory === 'All'
      ? siteData.projects
      : siteData.projects.filter(
          (p) =>
            p.category === activeCategory ||
            (activeCategory === 'سكني' && p.category.includes('Residential')) ||
            (activeCategory === 'تجاري' && p.category.includes('Commercial')) ||
            (activeCategory === 'نمل أبيض' && p.category.includes('Termite')) ||
            (activeCategory === 'قوارض' && p.category.includes('Rodent'))
        );

  return (
    <div
      className={`min-h-screen flex flex-col bg-white ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={dir}
    >
      <Header />

      <main className="flex-1">
        <PageBanner
          title={t.navProjects}
          breadcrumbs={[{ label: t.navProjects }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                    activeCategory === cat.key
                      ? 'bg-[#033F2D] text-[#C7F268] shadow-md'
                      : 'bg-[#F6F8F5] text-[#033F2D] hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className={`group bg-[#F6F8F5] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className={`absolute top-4 ${
                        isRTL ? 'right-4' : 'left-4'
                      } bg-[#033F2D] text-[#C7F268] text-xs font-bold px-3 py-1 rounded-full shadow-md`}
                    >
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#033F2D]" />
                          {proj.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#033F2D]" />
                          {proj.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#033F2D] group-hover:text-[#022a1e] leading-snug">
                        <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                      </h3>

                      <p className="text-sm text-[#484C44] leading-relaxed line-clamp-2">
                        {proj.overview}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#033F2D] group/link"
                      >
                        <span>{locale === 'en' ? 'View Full Case Study' : 'عرض دراسة الحالة كاملة'}</span>
                        <div
                          className={`w-7 h-7 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center transition-transform ${
                            isRTL
                              ? 'group-hover/link:-translate-x-1'
                              : 'group-hover/link:translate-x-1'
                          }`}
                        >
                          {isRTL ? (
                            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
