'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import BookingModal from '@/components/BookingModal';
import { PROJECTS_DATA } from '@/lib/siteData';
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [bookingOpen, setBookingOpen] = useState(false);

  const project =
    PROJECTS_DATA.find((p) => p.slug === resolvedParams.slug) || PROJECTS_DATA[0];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title={project.title}
          breadcrumbs={[
            { label: 'المشاريع', href: '/projects' },
            { label: project.title },
          ]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main Content (8 cols) */}
              <div className="lg:col-span-8 space-y-10">
                {/* Project Image */}
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 bg-[#033F2D] text-[#C7F268] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    إبادة وتحصين {project.category}
                  </div>
                </div>

                {/* Overview */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-[#033F2D]">نظرة عامة على المشروع</h2>
                  <p className="text-base text-[#484C44] leading-relaxed">{project.overview}</p>
                </div>

                {/* The Challenge */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-3">
                  <div className="flex items-center gap-2 text-[#033F2D]">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <h3 className="text-xl font-bold">التحدي الميداني</h3>
                  </div>
                  <p className="text-sm text-[#484C44] leading-relaxed">{project.challenge}</p>
                </div>

                {/* The Solution */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#033F2D] text-white space-y-3 shadow-xl">
                  <div className="flex items-center gap-2 text-[#C7F268]">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <h3 className="text-xl font-bold text-white">حلنا الاستراتيجي المنفذ</h3>
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed">{project.solution}</p>
                </div>

                {/* Measurable Results */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#033F2D]">النتائج الرئيسية المحققة</h3>
                  <div className="space-y-3">
                    {project.results.map((res, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#033F2D] shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-[#033F2D]">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                {/* Project Metadata Card */}
                <div className="p-6 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-4">
                  <h4 className="text-lg font-bold text-[#033F2D] border-b border-gray-200 pb-3">
                    ملخص دراسة الحالة
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-xs uppercase text-gray-400 font-bold block">
                        التصنيف
                      </span>
                      <span className="font-bold text-[#033F2D]">{project.category}</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-gray-400 font-bold block">
                        الموقع
                      </span>
                      <span className="font-bold text-[#033F2D]">{project.location}</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-gray-400 font-bold block">
                        مدة التنفيذ
                      </span>
                      <span className="font-bold text-[#033F2D]">{project.duration}</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase text-gray-400 font-bold block">
                        حالة المشروع
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C7F268] text-[#033F2D]">
                        تم الحل والتطهير 100% مع الضمان
                      </span>
                    </div>
                  </div>
                </div>

                {/* Callout */}
                <div className="p-8 rounded-3xl bg-[#033F2D] text-white text-center space-y-4 shadow-xl">
                  <div className="w-14 h-14 rounded-2xl bg-[#C7F268] text-[#033F2D] flex items-center justify-center mx-auto">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">هل تواجه مشكلة آفات مماثلة؟</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    فريقنا الخبير جاهز لمعاينة موقعك ووضع استراتيجية إبادة وحماية مضمونة.
                  </p>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full btn-default py-3 text-center justify-center font-bold text-sm cursor-pointer"
                  >
                    حجز موعد فحص فوري
                  </button>
                </div>
              </div>
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
