'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import VideoModal from '@/components/VideoModal';
import { Play } from 'lucide-react';

const VIDEOS = [
  {
    id: '1',
    title: 'معالجة فنية متطورة لبق الفراش بأجهزة الفوجينج الحديثة',
    duration: '3:45',
    thumbnail: '/assets/company/img6_1_16_21.jpg',
  },
  {
    id: '2',
    title: 'برنامج وقاية وتحصين دوري متكامل لمطاعم ومنشآت الأغذية',
    duration: '4:20',
    thumbnail: '/assets/company/img7_1_19_22.jpg',
  },
  {
    id: '3',
    title: 'كشف ومعالجة مستعمرات النمل في الشقوق والأرضيات',
    duration: '2:50',
    thumbnail: '/assets/company/img3_1_16_20_1.jpg',
  },
  {
    id: '4',
    title: 'رش بيولوجي لحدائق الفلل ومحيط المسابح ضد البعوض والآفات',
    duration: '5:10',
    thumbnail: '/assets/company/img4_1_16_21_1.jpg',
  },
  {
    id: '5',
    title: 'تطبيق الجل النقطي الألماني في زوايا المطابخ بدون روائح',
    duration: '3:15',
    thumbnail: '/assets/company/img5_1_16_20.jpg',
  },
  {
    id: '6',
    title: 'جولة فحص ومعاينة استباقية شاملة لفيلا سكنية قبل الصيف',
    duration: '4:05',
    thumbnail: '/assets/company/img2_1_16_21_2.jpg',
  },
];

export default function VideoGalleryPage() {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string } | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="معرض الفيديو التوضيحي"
          breadcrumbs={[{ label: 'معرض الفيديو' }]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="section-subtitle mx-auto">
                <span>العمليات الميدانية مباشرة</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]">
                شاهد كيف ينفذ خبراؤنا عمليات إبادة وتحصين الآفات بدقة
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VIDEOS.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setSelectedVideo({ title: vid.title })}
                  className="group bg-[#F6F8F5] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer text-right"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                    <Image
                      src={vid.thumbnail}
                      alt={vid.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current mr-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded" dir="ltr">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-[#033F2D] group-hover:text-[#022a1e] leading-snug">
                      {vid.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title}
      />
    </div>
  );
}
