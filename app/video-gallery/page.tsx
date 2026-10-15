'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import VideoModal from '@/components/VideoModal';
import { Play, Share2, Sparkles, ExternalLink } from 'lucide-react';

import { COMPANY_IMAGES } from '@/lib/media';

const FEATURED_FACEBOOK_VIDEO = {
  id: 'fb-main-reel',
  title: 'تغطية ميدانية حصرية لعمليات مكافحة وإبادة الآفات في الموقع',
  description: 'شاهد بالفيديو الميداني المباشر جانب من تطبيق عمليات الرش والمعالجة الفنية الميدانية التي ينفذها مهندسو المركز بكفاءة وأمان.',
  duration: 'تغطية فيديو ميدانية',
  thumbnail: COMPANY_IMAGES.outdoorSpraying,
  videoUrl: COMPANY_IMAGES.fieldCoverageVideo,
  badge: 'فيديو حصري • تغطية ميدانية',
};

const VIDEOS = [
  {
    id: 'fb-reel-1',
    title: 'تغطية تطبيقية ميدانية لرش وتحصين المباني ضد الآفات',
    duration: 'فيديو ميداني',
    thumbnail: COMPANY_IMAGES.outdoorSpraying,
    videoUrl: COMPANY_IMAGES.fieldCoverageVideo,
    isFacebook: false,
  },
  {
    id: '1',
    title: 'معالجة فنية متطورة لبق الفراش بأجهزة الفوجينج الحديثة',
    duration: '3:45',
    thumbnail: '/assets/company/img6_1_16_21.jpg',
    videoUrl: 'https://www.facebook.com/share/r/1ESucCbJEJ/',
  },
  {
    id: '2',
    title: 'برنامج وقاية وتحصين دوري متكامل لمطاعم ومنشآت الأغذية',
    duration: '4:20',
    thumbnail: '/assets/company/img7_1_19_22.jpg',
    videoUrl: 'https://www.facebook.com/share/r/1ESucCbJEJ/',
  },
  {
    id: '3',
    title: 'كشف ومعالجة مستعمرات النمل في الشقوق والأرضيات',
    duration: '2:50',
    thumbnail: '/assets/company/img3_1_16_20_1.jpg',
    videoUrl: 'https://www.facebook.com/share/r/1ESucCbJEJ/',
  },
  {
    id: '4',
    title: 'رش بيولوجي لحدائق الفلل ومحيط المسابح ضد البعوض والآفات',
    duration: '5:10',
    thumbnail: '/assets/company/img4_1_16_21_1.jpg',
    videoUrl: 'https://www.facebook.com/share/r/1ESucCbJEJ/',
  },
  {
    id: '5',
    title: 'تطبيق الجل النقطي الألماني في زوايا المطابخ بدون روائح',
    duration: '3:15',
    thumbnail: '/assets/company/img5_1_16_20.jpg',
    videoUrl: 'https://www.facebook.com/share/r/1ESucCbJEJ/',
  },
  {
    id: '6',
    title: 'جولة فحص ومعاينة استباقية شاملة لفيلا سكنية قبل الصيف',
    duration: '4:05',
    thumbnail: '/assets/company/img2_1_16_21_2.jpg',
    videoUrl: 'https://www.facebook.com/share/r/1ESucCbJEJ/',
  },
];

export default function VideoGalleryPage() {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoUrl?: string } | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-right" dir="rtl">
      <Header />

      <main className="flex-1">
        <PageBanner
          title="معرض الفيديو والتغطيات الميدانية"
          breadcrumbs={[{ label: 'معرض الفيديو' }]}
        />

        <div className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Header Title */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#033F2D]/10 text-[#033F2D] px-4 py-1.5 rounded-full text-xs font-bold">
                <Sparkles className="w-4 h-4 text-[#059669]" />
                <span>العمليات الميدانية مباشرة</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]">
                شاهد كيف ينفذ خبراؤنا عمليات إبادة وتحصين الآفات بدقة
              </h2>
            </div>

            {/* Featured Facebook Reel Showcase Card */}
            <div className="relative bg-gradient-to-br from-[#033F2D] to-[#022A1E] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 lg:p-10">
              <div className="lg:col-span-7 space-y-4 text-right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C7F268]/20 border border-[#C7F268]/40 text-[#C7F268] text-xs font-bold">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{FEATURED_FACEBOOK_VIDEO.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black leading-snug text-white">
                  {FEATURED_FACEBOOK_VIDEO.title}
                </h3>

                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  {FEATURED_FACEBOOK_VIDEO.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setSelectedVideo({ title: FEATURED_FACEBOOK_VIDEO.title, videoUrl: FEATURED_FACEBOOK_VIDEO.videoUrl })}
                    className="btn-default py-3.5 px-7 text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-[#C7F268]/20 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-current mr-0.5" />
                    <span>تشغيل الفيديو المباشر</span>
                  </button>

                  <a
                    href={FEATURED_FACEBOOK_VIDEO.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
                  >
                    <span>فتح في فيسبوك</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Thumbnail Container */}
              <div
                onClick={() => setSelectedVideo({ title: FEATURED_FACEBOOK_VIDEO.title, videoUrl: FEATURED_FACEBOOK_VIDEO.videoUrl })}
                className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 shadow-xl bg-black"
              >
                <Image
                  src={FEATURED_FACEBOOK_VIDEO.thumbnail}
                  alt={FEATURED_FACEBOOK_VIDEO.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current mr-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                  <Share2 className="w-3 h-3" />
                  <span>Facebook Reel</span>
                </div>
              </div>
            </div>

            {/* Video List Grid */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#033F2D] border-r-4 border-[#C7F268] pr-3">
                جميع فيديوهات المعاينة والتغطية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {VIDEOS.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo({ title: vid.title, videoUrl: vid.videoUrl })}
                    className="group bg-[#F6F8F5] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer text-right flex flex-col"
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
                      <span className="absolute bottom-3 left-3 bg-black/75 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1" dir="ltr">
                        {vid.duration}
                      </span>
                      {vid.isFacebook && (
                        <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                          فيسبوك ريلز
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <h3 className="text-base font-bold text-[#033F2D] group-hover:text-[#022a1e] leading-snug">
                        {vid.title}
                      </h3>
                      <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs text-[#059669] font-bold">
                        <span>مشاهدة الفيديو الميداني</span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title}
        videoUrl={selectedVideo?.videoUrl || 'https://www.facebook.com/share/r/1ESucCbJEJ/'}
      />
    </div>
  );
}
