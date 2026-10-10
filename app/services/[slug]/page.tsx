'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import BookingModal from '@/components/BookingModal';
import { SERVICES_DATA, SITE_INFO } from '@/lib/siteData';
import { company } from '@/lib/company';
import {
  CheckCircle2,
  PhoneCall,
  ArrowLeft,
  ChevronLeft,
  Clock,
  MessageCircle,
} from 'lucide-react';

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [bookingOpen, setBookingOpen] = useState(false);

  const service = SERVICES_DATA.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-right">
      <Header />

      <main className="flex-1">
        <PageBanner
          title={service.title}
          breadcrumbs={[
            { label: 'الخدمات', href: '/services' },
            { label: service.title },
          ]}
        />

        <div className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main Content (8 cols) */}
              <div className="lg:col-span-8 space-y-10">
                {/* Hero Service Image */}
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 bg-[#033F2D] text-[#C7F268] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    {service.subtitle}
                  </div>
                </div>

                {/* Introduction */}
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-black text-[#033F2D]">
                    حلول احترافية متكاملة لـ {service.title}
                  </h2>
                  <p className="text-[#484C44] text-base leading-relaxed">
                    {service.longDescription}
                  </p>
                </div>

                {/* Inclusions & Features */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-2xl font-bold text-[#033F2D]">
                    ما تشمله خدمة {service.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#F6F8F5] border border-gray-100 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#033F2D] shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-[#033F2D]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-2xl font-bold text-[#033F2D]">
                    أهم المزايا والفوائد لعقارك
                  </h3>
                  <div className="space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#C7F268] text-[#033F2D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                          ✓
                        </div>
                        <p className="text-sm text-[#484C44] leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treatment Process Steps */}
                <div className="space-y-6 pt-4 border-t border-gray-100">
                  <h3 className="text-2xl font-bold text-[#033F2D]">
                    مراحل خطة المعالجة (4 خطوات علمية)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.process.map((p) => (
                      <div
                        key={p.step}
                        className="p-6 rounded-2xl bg-[#F6F8F5] border border-gray-100 space-y-2 relative text-right"
                      >
                        <span className="text-2xl font-black text-[#033F2D]/20 block" dir="ltr">
                          {p.step}
                        </span>
                        <h4 className="text-base font-bold text-[#033F2D]">{p.title}</h4>
                        <p className="text-xs text-[#484C44] leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Box */}
                <div className="p-8 rounded-3xl bg-[#033F2D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-1 text-center sm:text-right">
                    <span className="text-xs uppercase font-bold text-[#C7F268] tracking-wider block">
                      ضمان معتمد مشمول في الخدمة
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      احجز خدمة {service.title} لعقارك اليوم
                    </h4>
                  </div>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="btn-default py-3.5 px-6 font-bold shrink-0 cursor-pointer"
                  >
                    <span>طلب معاينة وفحص</span>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </button>
                </div>
              </div>

              {/* Right Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                {/* Services Navigation Widget */}
                <div className="p-6 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-4">
                  <h4 className="text-lg font-bold text-[#033F2D] border-b border-gray-200 pb-3">
                    كافة خدمات مكافحة الآفات
                  </h4>
                  <ul className="space-y-2">
                    {SERVICES_DATA.map((s) => {
                      const isActive = s.slug === service.slug;
                      return (
                        <li key={s.id}>
                          <Link
                            href={`/services/${s.slug}`}
                            className={`flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors ${
                              isActive
                                ? 'bg-[#033F2D] text-[#C7F268]'
                                : 'bg-white text-[#033F2D] hover:bg-[#C7F268]/20'
                            }`}
                          >
                            <span>{s.title}</span>
                            <ChevronLeft className="w-4 h-4" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Emergency Contact Box */}
                <div className="p-8 rounded-3xl bg-[#033F2D] text-white text-center space-y-4 relative overflow-hidden shadow-xl">
                  <div className="w-14 h-14 rounded-2xl bg-[#C7F268] text-[#033F2D] flex items-center justify-center mx-auto shadow-md">
                    <PhoneCall className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white">طلب خدمة ومعاينة فورية</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    تواصل مباشرة مع المهندس الفني المختص بهذه الخدمة.
                  </p>
                  <a
                    href={company.phonePrimaryRaw}
                    dir="ltr"
                    className="block text-xl font-black text-[#C7F268] hover:underline"
                  >
                    {company.phonePrimary}
                  </a>
                  <a
                    href={`${company.whatsappUrl}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن خدمة ${service.title}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-4 rounded-xl font-bold text-xs hover:bg-[#20ba59] transition-colors w-full"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>تواصل عبر واتساب</span>
                  </a>
                </div>

                {/* Service Hours */}
                <div className="p-6 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-3">
                  <h4 className="text-sm font-bold text-[#033F2D] uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#033F2D]" /> أوقات العمل والتغطية
                  </h4>
                  <div className="text-xs text-[#484C44] space-y-2 leading-relaxed">
                    <p className="font-bold text-[#033F2D]">{company.workingHours}</p>
                    <p className="text-gray-500">{company.coverage}</p>
                  </div>
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
        defaultService={service.title}
      />
    </div>
  );
}
