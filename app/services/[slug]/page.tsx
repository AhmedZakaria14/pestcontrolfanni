'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import BookingModal from '@/components/BookingModal';
import JsonLd from '@/components/JsonLd';
import { getSingleServicePageSchema } from '@/lib/schema';
import {
  CheckCircle2,
  PhoneCall,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { t, company, siteData, isRTL, locale, dir } = useLanguage();

  const service = siteData.services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = getSingleServicePageSchema(service, locale);

  return (
    <div
      className={`min-h-screen flex flex-col bg-white ${
        isRTL ? 'text-right' : 'text-left'
      }`}
      dir={dir}
    >
      <JsonLd id={`schema-service-${service.slug}`} data={serviceSchema} />
      <Header />

      <main className="flex-1">
        <PageBanner
          title={service.title}
          breadcrumbs={[
            { label: t.navServices, href: '/services' },
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
                  <div
                    className={`absolute top-6 ${
                      isRTL ? 'right-6' : 'left-6'
                    } bg-[#033F2D] text-[#C7F268] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg`}
                  >
                    {service.subtitle}
                  </div>
                </div>

                {/* Introduction */}
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-black text-[#033F2D]">
                    {locale === 'en'
                      ? `Integrated Professional Solutions for ${service.title}`
                      : `حلول احترافية متكاملة لـ ${service.title}`}
                  </h2>
                  <p className="text-[#484C44] text-base leading-relaxed">
                    {service.longDescription}
                  </p>
                </div>

                {/* Inclusions & Features */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-2xl font-bold text-[#033F2D]">
                    {locale === 'en'
                      ? `What is included in ${service.title}`
                      : `ما تشمله خدمة ${service.title}`}
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
                    {locale === 'en'
                      ? 'Key Property Benefits & Highlights'
                      : 'أهم المزايا والفوائد لعقارك'}
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
                    {locale === 'en'
                      ? 'Treatment Plan Phases (4 Scientific Steps)'
                      : 'مراحل خطة المعالجة (4 خطوات علمية)'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {service.process.map((p) => (
                      <div
                        key={p.step}
                        className={`p-6 rounded-2xl bg-[#F6F8F5] border border-gray-100 space-y-2 relative ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
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
                <div className="bg-[#033F2D] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden space-y-4">
                  <span className="text-xs font-bold text-[#C7F268] uppercase tracking-wider block">
                    {t.emergencyTitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black">
                    {locale === 'en'
                      ? `Book an inspection for ${service.title} today`
                      : `احجز موعد معاينة لخدمة ${service.title} اليوم`}
                  </h3>
                  <p className="text-sm text-white/80 max-w-xl leading-relaxed">
                    {t.emergencyDesc}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="bg-[#C7F268] hover:bg-[#b5e050] text-[#033F2D] py-3.5 px-7 font-bold text-sm rounded-xl cursor-pointer transition-transform hover:scale-[1.02] shadow-md inline-flex items-center gap-2"
                    >
                      <span>{t.requestInspectionBtn}</span>
                      {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                    <a
                      href={company.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 font-bold text-sm rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.whatsappNow}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                {/* All Services Nav */}
                <div className="p-6 rounded-3xl bg-[#F6F8F5] border border-gray-100 space-y-4">
                  <h4 className="text-lg font-bold text-[#033F2D] border-b border-gray-200 pb-3">
                    {t.navAllServices}
                  </h4>
                  <ul className="space-y-2">
                    {siteData.services.map((s) => {
                      const isActive = s.slug === service.slug;
                      return (
                        <li key={s.id}>
                          <Link
                            href={`/services/${s.slug}`}
                            className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${
                              isActive
                                ? 'bg-[#033F2D] text-[#C7F268] shadow-md'
                                : 'text-gray-700 hover:bg-white hover:text-[#033F2D]'
                            }`}
                          >
                            <span>{s.title}</span>
                            {isRTL ? (
                              <ChevronLeft
                                className={`w-4 h-4 ${
                                  isActive ? 'text-[#C7F268]' : 'text-gray-400'
                                }`}
                              />
                            ) : (
                              <ChevronRight
                                className={`w-4 h-4 ${
                                  isActive ? 'text-[#C7F268]' : 'text-gray-400'
                                }`}
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Direct Contact Card */}
                <div className="p-8 rounded-3xl bg-[#033F2D] text-white space-y-5 text-center shadow-xl border border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-[#C7F268] text-[#033F2D] flex items-center justify-center mx-auto shadow-md">
                    <PhoneCall className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#C7F268] font-bold block mb-1">
                      {t.phoneLabel}
                    </span>
                    <h4 className="text-xl font-black text-white">{company.name}</h4>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {company.coverage} • {company.workingHours}
                  </p>
                  <div className="space-y-2 pt-2">
                    <a
                      href={company.phonePrimaryRaw}
                      dir="ltr"
                      className="block w-full py-3 px-4 rounded-xl bg-white text-[#033F2D] font-black text-base hover:bg-[#C7F268] transition-colors"
                    >
                      {company.phonePrimary}
                    </a>
                    <a
                      href={company.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20ba59] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.whatsappNow}</span>
                    </a>
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
