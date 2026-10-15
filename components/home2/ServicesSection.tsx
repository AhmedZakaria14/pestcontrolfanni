'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Building2,
  Sparkles,
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { useLanguage } from '@/lib/i18n';

const ICONS_MAP: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
};

export default function ServicesSection() {
  const { t, siteData, isRTL } = useLanguage();

  return (
    <section
      className={`py-20 lg:py-28 bg-[#F6F8F5] relative overflow-hidden ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <ScrollReveal direction="down" duration={0.6}>
              <div className="section-subtitle">
                <span>{t.servicesSubtitle}</span>
              </div>
            </ScrollReveal>
            <div>
              <TextReveal
                as="h2"
                text={t.servicesHeadline}
                highlightWords={t.servicesHighlightWords}
                highlightClass="text-[#033F2D] underline decoration-[#C7F268] decoration-4 underline-offset-4"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#033F2D] leading-[1.25]"
              />
            </div>
          </div>

          <ScrollReveal direction={isRTL ? 'right' : 'left'} delay={0.2} duration={0.6}>
            <Link
              href="/services"
              className="btn-default py-3.5 px-7 inline-flex items-center gap-2"
            >
              <span>{t.servicesViewAll}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
            </Link>
          </ScrollReveal>
        </div>

        {/* Services Staggered Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {siteData.services.map((srv) => (
            <StaggerItem key={srv.id} yOffset={35}>
              <div
                className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between h-full ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {/* Image Container with Zoom effect */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating Icon */}
                  <div
                    className={`absolute top-4 ${
                      isRTL ? 'left-4' : 'right-4'
                    } w-12 h-12 rounded-xl bg-[#033F2D] text-[#C7F268] group-hover:bg-[#C7F268] group-hover:text-[#033F2D] flex items-center justify-center transition-colors shadow-lg`}
                  >
                    {ICONS_MAP[srv.iconName] || <ShieldCheck className="w-6 h-6" />}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#033F2D] group-hover:text-[#033F2D] transition-colors">
                      <Link href={`/services/${srv.slug}`}>{srv.title}</Link>
                    </h3>
                    <p className="text-sm text-[#484C44] leading-relaxed line-clamp-3">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      href={`/services/${srv.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#033F2D] hover:text-[#02271c] group/link"
                    >
                      <span>{t.serviceDetailsBtn}</span>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
