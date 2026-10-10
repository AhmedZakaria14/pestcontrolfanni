'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { GALLERY_ITEMS, GalleryItem } from '@/lib/siteData';
import { X, ZoomIn } from 'lucide-react';

const FILTERS = [
  { key: 'All', label: 'الكل' },
  { key: 'سكني', label: 'مكافحة سكنية' },
  { key: 'تجاري', label: 'منشآت تجارية' },
  { key: 'نمل أبيض', label: 'النمل الأبيض' },
  { key: 'صديق للبيئة', label: 'حلول بيئية' },
];

export default function ImageGalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="معرض الصور الميدانية"
          breadcrumbs={[{ label: 'معرض الصور' }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(f.key)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                    selectedFilter === f.key
                      ? 'bg-[#033F2D] text-[#C7F268] shadow-md'
                      : 'bg-[#F6F8F5] text-[#033F2D] hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-md bg-gray-100"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#033F2D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white text-right">
                    <span className="text-xs uppercase font-bold text-[#C7F268] mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold leading-snug">{item.title}</h4>
                    <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 text-right"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer"
              aria-label="إغلاق المعاينة"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={lightboxItem.image}
                alt={lightboxItem.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-[#033F2D] text-white flex items-center justify-between text-right">
              <div>
                <span className="text-xs font-bold text-[#C7F268] uppercase">
                  {lightboxItem.category}
                </span>
                <h4 className="text-lg font-bold">{lightboxItem.title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
